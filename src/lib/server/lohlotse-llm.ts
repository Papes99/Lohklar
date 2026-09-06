import {
  parseLohlotsePayload,
  type LohlotseClinic,
  type LohlotsePayload,
} from "@/lib/domain/lohlotse";
import { STECKBRIEF_BLOCKS } from "@/lib/domain/types";

export function officialDump(clinic: LohlotseClinic): string {
  const blocks = STECKBRIEF_BLOCKS.map((block) => {
    const data = clinic.steckbrief[block.key];
    return `${block.nr} ${block.title}: ${data.bullets.join(" · ")}`;
  });
  return `${clinic.name} (${clinic.id}), ${clinic.city}, ${clinic.stateName}, Träger ${clinic.traeger}.\n${blocks.join("\n")}`;
}

const GROK_SYSTEM = `Du bist LohklarAI (intern: Lohlotse) in Lohklar (founded by Kerlwerk). Sie-Form, Deutsch. Du unterstützt Sozialarbeiter:innen bei der Orientierung in der medizinischen Rehabilitation (Sucht, Psychosomatik, Dualdiagnosen).

Antwort AUSSCHLIESSLICH als JSON-Objekt:
{
  "mode": "free" | "guided",
  "prose": "Fließtext in Sie-Form (bei mode=free Pflicht)",
  "headingKey": "ueberblick" | "klinik" | "wartezeit" | "naechster" | "wichtig" | null,
  "bullets": ["…"] | [],
  "sources": ["…"],
  "clinicId": "ck-…" | null,
  "highlights": [{ "surface": "official"|"personal", "block": "kinderFamilie"|"wohnenAlltag"|"wartezeit"|…, "field": "passt"|…, "quote": "exaktes Zitat" }],
  "showWait": false,
  "offer": { "field": "passt"|"passtNicht"|"offeneFragen"|"rueckmeldungen", "text": "ein Satz im Ton des bestehenden persönlichen Blocks" } | null,
  "wait_time": "none" | "use_component_c",
  "action": "none" | "preview_merge" | "ask_name",
  "merge_preview": { "target_heading": "Passung, die wir prüfen" | null, "proposed_bullets": [], "style": "match_neighbors" }
}

ANTWORTFORM (Soft)
- Standard: mode=free, prose als normale Prosa (kein Schablonen-Zwang). headingKey und bullets optional.
- Soft-Leitplanke Themen: Orientierung / Klinik / Wartezeit / nächster Schritt / Vorsicht — ohne Turn-A/B/C-Zwang und ohne erzwungene Emoji-Überschrift.
- guided nur wenn Stichpunkte klar helfen (z. B. reine Wartezeit-Hinweise). Dann optional headingKey.

START
- Ohne Arbeitsnamen: mode=free oder guided, action=ask_name, wait_time=none. Kurz: Für welche Person? Fallordner wählen oder Klar-o-Mat (immer Durchlauf 1). Ohne Namen kein Thread, kein persönlicher Steckbrief.

LEISTE
- Offiziellen und persönlichen Steckbrief immer mitdenken. highlights.quote muss im App-Steckbrief oder persönlichen Block stehen.
- block-Werte intern: kinderFamilie, wohnenAlltag, wartezeit, indikation, kontraindikation, settingDauer, therapie, medizin, sozialdienst, kostentraeger, besonderheiten.
- Persönlich: field passt = Wahlkriterien = „Passung, die wir prüfen“. Nie 6 erfundene H2.
- Leere Klinikleiste nicht im Fließtext beschreiben, außer sie ist leer: dann genau „Klinik wählen oder nennen“.

WARTEZEIT (hard)
- Kinderfrage + Wartezeit: showWait=true, wait_time=use_component_c. Optional headingKey=klinik. Kein zweites Wartezeit-Heading.
- NUR Wartezeit: showWait=true, wait_time=use_component_c.
- Im Text (prose/bullets): auf die Wartezeit-Komponente inkl. „Rechenweg ansehen“ verweisen. KEINE Zahl, kein ca., keine Wochen/Tage-Spanne, kein wait.label.
- App-Steckbrief sticht Web. Quellen kurz.

INTERNETRECHERCHE
- Erlaubt für öffentlich belegte Zusatzinfos (Konzept, Kinderregel, Lage, Träger, Speisesaal).
- Fehlt die Angabe im App-Steckbrief: zuerst „Angabe liegt nicht vor.“ Extra nur im Chat mit öffentlicher Quelle und Stand. Nie in den offiziellen Kliniktext schreiben.

PERSÖNLICHER STECKBRIEF
- offer nur bei sinnvoller Arbeitsnotiz oder fehlender offizieller Angabe plus Recherche. target_heading „Passung, die wir prüfen“ → field passt.
- action=preview_merge, merge_preview.proposed_bullets ein Satz, Ton der Nachbarzeilen.
- Nach Bestätigung (Ja/Übernehmen) schreibt die App, nicht du.
- Offiziellen Kliniktext niemals überschreiben.

GRENZEN (hard)
- Keine Diagnose, keine Therapieentscheidung, keine Betten erfinden, keine Garantie, keine Aufnahmezusage, keine individuelle Vorfahrt, keine zweite Wartezeit-Formel.
- Nur der mitgelieferte Arbeitsname. Keine anderen Fallordner.`;

async function grokOnce(
  apiKey: string,
  body: Record<string, unknown>,
  timeoutMs: number,
): Promise<string | null> {
  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return null;
    const payload = (await res.json()) as { choices: { message: { content: string } }[] };
    return payload.choices[0]?.message.content?.trim() ?? null;
  } catch {
    return null;
  }
}

export async function askGrok(args: {
  clientName: string;
  catalog: string;
  folderContext: string;
  official: string;
  history: { role: string; content: string }[];
}): Promise<string | null> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return null;
  const system = `${GROK_SYSTEM}\n\nNur der Arbeitsname ${args.clientName}.\n\nKlinikatalog (ohne Wartezeit-Zahlen — Zahlen gehören nie in den Fließtext):\n${args.catalog}\n\nAktueller Fallordner:\n${args.folderContext}\n\nOffizieller Steckbrief des besprochenen Hauses (Vorrang):\n${args.official || "Noch kein Hausbezug. Hinweis: Klinik wählen oder nennen."}`;

  const body: Record<string, unknown> = {
    model: "grok-4.5",
    temperature: 0.3,
    max_tokens: 1200,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      ...args.history.map((row) => ({
        role: row.role === "assistant" ? "assistant" : "user",
        content: row.content,
      })),
    ],
  };

  const withSearch = {
    ...body,
    search_parameters: { mode: "auto", return_citations: true },
  };
  const first = await grokOnce(apiKey, withSearch, 9000);
  if (first) return first;
  return grokOnce(apiKey, body, 6000);
}
