import { normalizeName } from "./folder-search.ts";
import {
  STECKBRIEF_BLOCKS,
  type Clinic,
  type OfficialSteckbrief,
  type SteckbriefKey,
  type WaitEstimate,
} from "./types.ts";

export const LOHLOTSE_HEADINGS = {
  ueberblick: "🧭 Überblick",
  klinik: "🏥 Klinik",
  wartezeit: "⏳ Wartezeit",
  naechster: "📋 Nächster Schritt",
  wichtig: "⚠️ Wichtig",
} as const;

export type LohlotseHeadingKey = keyof typeof LOHLOTSE_HEADINGS;

export type PersonalField = "passt" | "passtNicht" | "offeneFragen" | "rueckmeldungen";

export const PERSONAL_FIELD_LABEL: Record<PersonalField, string> = {
  passt: "Was passt",
  passtNicht: "Was nicht passt",
  offeneFragen: "Offene Fragen",
  rueckmeldungen: "Rückmeldungen der Klient:in",
};

/** Lohlotse-Mergeziel. Schema bleibt die 4 Felder; „Passung, die wir prüfen“ / Wahlkriterien → passt. */
export const PERSONAL_MERGE_HEADING: Record<PersonalField, string> = {
  passt: "Passung, die wir prüfen",
  passtNicht: "Was nicht passt",
  offeneFragen: "Offene Fragen",
  rueckmeldungen: "Rückmeldungen der Klient:in",
};

export const WAIT_COMPONENT_BULLET =
  "Wartezeit nicht selbst geschätzt. Es gilt die Anzeige der Wartezeit-Komponente inkl. „Rechenweg ansehen“. Das ist keine Aufnahmezusage.";

export const WAIT_ONLY_BULLETS = [
  "Es gilt die Schätzung der Wartezeit-Komponente, Stand laut Komponente.",
  "Rechenweg über „Rechenweg ansehen“.",
  "Das ist keine Aufnahmezusage und keine individuelle Vorfahrt.",
];

export type HighlightBlock = SteckbriefKey | "kontakt" | "datenstand" | "kopf" | "wartezeit";

export type LohlotseHighlight = {
  surface: "official" | "personal";
  block?: HighlightBlock;
  field?: PersonalField;
  quote: string;
};

export type LohlotseOffer = {
  field: PersonalField;
  text: string;
  status?: "open" | "applied" | "dismissed";
};

export type LohlotseMode = "free" | "guided";

export type LohlotsePayload = {
  /** Default for neue Antworten: free. Alte Messages ohne Feld gelten als guided. */
  mode?: LohlotseMode;
  /** Fließtext in Sie-Form (Pflicht bei free). */
  prose?: string;
  /** Optional/nullable bei free; bei guided gesetzt. */
  headingKey: LohlotseHeadingKey | null;
  heading: string;
  bullets: string[];
  sources: string[];
  clinicId: string | null;
  highlights: LohlotseHighlight[];
  showWait: boolean;
  offer: LohlotseOffer | null;
};

export type PersonalDraft = {
  passt: string;
  passtNicht: string;
  offeneFragen: string;
  rueckmeldungen: string;
};

export type LohlotseClinic = Pick<
  Clinic,
  "id" | "name" | "shortName" | "city" | "stateName" | "traeger" | "steckbrief"
> & { wait?: WaitEstimate };

export type ComposeInput = {
  clientName: string;
  message: string;
  personal: PersonalDraft;
  clinics: LohlotseClinic[];
  matches: { clinicId: string; score: number; wait: WaitEstimate }[];
  currentClinicId: string | null;
};

export const HEADING_KEYS = Object.keys(LOHLOTSE_HEADINGS) as LohlotseHeadingKey[];

export const WAIT_SPAN_RE =
  /(?:ca\.\s*)?\d+(?:\s*[–\-bis]+\s*\d+)?\s*(?:Wochen|Tage)/gi;

export function headingLabel(key: LohlotseHeadingKey | null | undefined): string {
  if (!key) return "";
  return LOHLOTSE_HEADINGS[key];
}

export function splitUnits(text: string): string[] {
  return text
    .split(/\n+/)
    .map((line) => line.replace(/^[-•–]\s*/, "").trim())
    .filter(Boolean);
}

function similarUnit(a: string, b: string): boolean {
  const na = normalizeName(a);
  const nb = normalizeName(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  if (na.length >= 16 && nb.includes(na)) return true;
  if (nb.length >= 16 && na.includes(nb)) return true;
  return false;
}

export function matchTone(existing: string[], incoming: string): string {
  let line = incoming.replace(/^[-•–]\s*/, "").trim();
  if (!line) return "";
  const sample = existing[0];
  if (!sample) {
    if (!/[.!?]$/.test(line)) line += ".";
    return line;
  }
  const samplePeriod = /[.!?]$/.test(sample);
  if (samplePeriod && !/[.!?]$/.test(line)) line += ".";
  if (!samplePeriod && /\.$/.test(line)) line = line.slice(0, -1);
  return line;
}

export function mergePersonalField(
  existing: string,
  incoming: string,
): { next: string; added: boolean; line: string } {
  const units = splitUnits(existing);
  const line = matchTone(units, incoming);
  if (!line) return { next: existing, added: false, line: "" };
  if (units.some((unit) => similarUnit(unit, line))) {
    return { next: existing.trim(), added: false, line };
  }
  const next = [...units, line].join("\n");
  return { next, added: true, line };
}

export function applyOfferToPersonal(
  personal: PersonalDraft,
  offer: LohlotseOffer,
): { next: PersonalDraft; added: boolean; line: string } {
  const key = offer.field;
  const result = mergePersonalField(personal[key], offer.text);
  return {
    next: { ...personal, [key]: result.next },
    added: result.added,
    line: result.line,
  };
}

export function resolveClinicMention(
  text: string,
  clinics: LohlotseClinic[],
  currentId?: string | null,
): LohlotseClinic | null {
  const hay = normalizeName(text);
  if (!hay) {
    return clinics.find((clinic) => clinic.id === currentId) ?? null;
  }
  let best: { clinic: LohlotseClinic; score: number } | null = null;
  for (const clinic of clinics) {
    const name = normalizeName(clinic.name);
    const shortName = normalizeName(clinic.shortName);
    const city = normalizeName(clinic.city);
    let score = 0;
    if (hay.includes(name) || name && hay.includes(name.replace(/^fachklinik |^klinik |^reha-zentrum |^rehaklinik |^therapiezentrum |^therapiehaus |^haus /, ""))) {
      score = 80;
    }
    if (shortName && (hay.includes(shortName) || shortName.length >= 5 && hay.includes(shortName))) {
      score = Math.max(score, 70);
    }
    if (city && hay.includes(city) && score > 0) score += 8;
    if (score > (best?.score ?? 0)) best = { clinic, score };
  }
  if (best && best.score >= 60) return best.clinic;
  return clinics.find((clinic) => clinic.id === currentId) ?? null;
}

function keywordHits(text: string, words: string[]): boolean {
  const hay = normalizeName(text);
  return words.some((word) => hay.includes(normalizeName(word)));
}

export function asksWait(message: string): boolean {
  return keywordHits(message, [
    "wartezeit",
    "warte",
    "wie lange",
    "aufnahmezeit",
    "wann frei",
    "wartet man",
    "liste",
  ]);
}

export function wantsPersonalSave(message: string): boolean {
  return keywordHits(message, [
    "ubernehmen",
    "übernehmen",
    "stecken",
    "merken",
    "notieren",
    "festhalten",
    "arbeitsnotiz",
  ]);
}

export function isMergeConfirm(message: string): boolean {
  const n = normalizeName(message).replace(/\s+/g, " ").trim();
  return (
    n === "ja" ||
    n === "ja bitte" ||
    n === "ok" ||
    n === "okay" ||
    n === "uebernehmen" ||
    n === "bitte uebernehmen" ||
    n === "ja uebernehmen" ||
    n === "ja bitte uebernehmen" ||
    n === "uebernehmen bitte"
  );
}

export function asksClinicTopic(message: string): boolean {
  return keywordHits(message, [
    "klinik",
    "haus",
    "steckbrief",
    "kinder",
    "kind",
    "familie",
    "eltern",
    "lage",
    "traeger",
    "träger",
    "konzept",
    "zimmer",
    "speise",
    "tablett",
    "verpflegung",
    "mitnehmen",
    "mahlzeit",
    "alltag",
    "wohnen",
  ]);
}

function pickHeading(message: string): LohlotseHeadingKey {
  const wait = asksWait(message);
  const clinic = asksClinicTopic(message);
  if (wait && !clinic) return "wartezeit";
  if (keywordHits(message, ["nächster schritt", "naechster schritt", "was tun", "antrag", "drv", "kostentraeger", "wie weiter"])) {
    return "naechster";
  }
  if (keywordHits(message, ["kontraind", "nicht aufgenommen", "ausschluss", "stopp", "warnung", "darf nicht"])) {
    return "wichtig";
  }
  if (clinic) return "klinik";
  if (wait) return "wartezeit";
  return "ueberblick";
}

function officialQuotes(
  clinic: LohlotseClinic,
  message: string,
): LohlotseHighlight[] {
  const highlights: LohlotseHighlight[] = [];
  const hay = normalizeName(message);
  const prefer: SteckbriefKey[] = [];
  if (keywordHits(message, ["kinder", "kind", "familie", "eltern", "geschlecht", "mitnehmen"])) prefer.push("kinderFamilie");
  if (keywordHits(message, ["kontraind", "nicht aufgenommen", "ausschluss", "substitution"])) {
    prefer.push("kontraindikation");
  }
  if (keywordHits(message, ["konzept", "therapie", "verfahren"])) prefer.push("therapie");
  if (keywordHits(message, ["lage", "ort", "anreise", "zimmer", "alltag", "speise", "tablett", "verpflegung", "mahlzeit"])) {
    prefer.push("wohnenAlltag", "besonderheiten");
  }
  if (keywordHits(message, ["kasse", "drv", "antrag", "kostentraeger"])) prefer.push("kostentraeger");
  if (keywordHits(message, ["aufnahme"]) && !asksWait(message)) prefer.push("settingDauer");
  const keys = prefer.length ? prefer : (["indikation", "besonderheiten"] as SteckbriefKey[]);
  for (const key of keys) {
    const block = clinic.steckbrief[key];
    if (!block) continue;
    const quote =
      block.bullets.find((line) => {
        const n = normalizeName(line);
        return n && (hay.includes(n.slice(0, 18)) || n.split(" ").some((w) => w.length > 5 && hay.includes(w)));
      }) ?? block.bullets[0];
    if (quote) {
      highlights.push({ surface: "official", block: key, quote });
    }
  }
  return highlights.slice(0, 4);
}

function wantsSave(message: string): boolean {
  return wantsPersonalSave(message);
}

function missingOfficialTopic(clinic: LohlotseClinic, message: string): SteckbriefKey | null {
  const checks: { words: string[]; key: SteckbriefKey }[] = [
    { words: ["speise", "tablett", "verpflegung", "mahlzeit"], key: "wohnenAlltag" },
  ];
  for (const check of checks) {
    if (!keywordHits(message, check.words)) continue;
    const lines = clinic.steckbrief[check.key]?.bullets ?? [];
    const hasFact = lines.some((line) => {
      const n = normalizeName(line);
      if (!n || n.includes("angabe liegt nicht vor")) return false;
      return keywordHits(line, check.words);
    });
    if (!hasFact) return check.key;
  }
  return null;
}

function personalChoiceQuote(personal: PersonalDraft, message: string): string | null {
  const units = splitUnits(personal.passt);
  if (units.length === 0) return null;
  const topical = units.find((unit) => {
    const shared = ["kind", "eltern", "familie", "speise", "platz", "wahl"];
    return shared.some((word) => keywordHits(message, [word]) && keywordHits(unit, [word]));
  });
  if (topical) return topical;
  if (keywordHits(message, ["kind", "eltern", "familie", "mitnehmen", "wahl"])) return units[0] ?? null;
  return null;
}

export function composeLohlotseReply(input: ComposeInput): LohlotsePayload {
  const clinic =
    resolveClinicMention(input.message, input.clinics, input.currentClinicId) ??
    (input.currentClinicId
      ? input.clinics.find((item) => item.id === input.currentClinicId) ?? null
      : null);
  const headingKey = clinic ? pickHeading(input.message) : "ueberblick";
  const waitAsked = asksWait(input.message);
  const bullets: string[] = [];
  const sources: string[] = [];
  const highlights: LohlotseHighlight[] = [];
  const missing = clinic ? missingOfficialTopic(clinic, input.message) : null;

  if (!clinic) {
    bullets.push(
      `Der Faden bleibt bei ${input.clientName}. Keine Vermischung mit anderen Ordnern.`,
    );
    bullets.push("Klinik wählen oder nennen, dann öffnet die Leiste den offiziellen Steckbrief.");
    const top = input.matches.slice(0, 3);
    for (const match of top) {
      const house = input.clinics.find((item) => item.id === match.clinicId);
      bullets.push(`${house?.name ?? match.clinicId}: Passung ${match.score}. Keine Aufnahmezusage.`);
    }
    if (input.personal.passt) {
      bullets.push(`Persönlich notiert: ${splitUnits(input.personal.passt)[0]}`);
    }
    sources.push("App-Steckbrief und letzter Klar-o-Mat-Lauf");
  } else {
    sources.push(`App-Steckbrief ${clinic.name}`);
    if (headingKey === "wartezeit") {
      bullets.push(...WAIT_ONLY_BULLETS);
      highlights.push({
        surface: "official",
        block: "wartezeit",
        quote: "Wartezeit-Schätzung",
      });
    } else if (headingKey === "wichtig") {
      const contra = clinic.steckbrief.kontraindikation?.bullets ?? [];
      for (const line of contra.slice(0, 4)) bullets.push(line);
      if (bullets.length === 0) {
        bullets.push("Keine gesonderte Kontraindikation im Klinikprofil. Haus und Kostenträger entscheiden.");
      }
      bullets.push("Lohklar erfindet keine Diagnosen und sagt keine Aufnahme zu.");
    } else if (headingKey === "naechster") {
      bullets.push(`Arbeitsname bleibt ${input.clientName}.`);
      bullets.push("Offiziellen Steckbrief in der Leiste gegen die Wahlkriterien halten.");
      bullets.push("Offene Punkte im persönlichen Steckbrief ergänzen, nicht im Kliniktext.");
      bullets.push("Antrag und Aufnahme klären Haus und Kostenträger — nicht Lohklar.");
      const open = splitUnits(input.personal.offeneFragen)[0];
      if (open) bullets.push(`Offen im Ordner: ${open}`);
    } else if (missing) {
      const meta = STECKBRIEF_BLOCKS.find((item) => item.key === missing);
      bullets.push(
        `Im offiziellen Steckbrief unter ${meta?.title ?? "Wohnen und Alltag"}: Angabe fehlt („Angabe liegt nicht vor.“).`,
      );
      bullets.push("Das ist kein App-Bestand. Unsicher, ob aktuell.");
      highlights.push({
        surface: "official",
        block: missing,
        quote: "Angabe liegt nicht vor.",
      });
    } else {
      const marks = officialQuotes(clinic, input.message);
      highlights.push(...marks);
      const blockKey: SteckbriefKey =
        marks[0]?.block && marks[0].block in (clinic.steckbrief as OfficialSteckbrief)
          ? (marks[0].block as SteckbriefKey)
          : "indikation";
      const meta = STECKBRIEF_BLOCKS.find((item) => item.key === blockKey);
      const lines = clinic.steckbrief[blockKey]?.bullets ?? [];
      if (meta && lines[0]) {
        bullets.push(`Offizieller Steckbrief, Block ${meta.title}: ${lines[0]}`);
      } else if (meta) {
        bullets.push(`${meta.title}: ${meta.lead}`);
      }
      for (const line of lines.slice(1, 3)) bullets.push(line);
      const personalHit = personalChoiceQuote(input.personal, input.message);
      if (personalHit) {
        bullets.push(`Persönlich für ${input.clientName} steht bereits: ${personalHit}`);
      } else {
        bullets.push("Ergänzungen stehen im Chat, nicht im offiziellen Steckbrief.");
      }
    }

    if (waitAsked && headingKey !== "wartezeit") {
      highlights.push({
        surface: "official",
        block: "wartezeit",
        quote: "Wartezeit-Schätzung",
      });
      bullets.push(WAIT_COMPONENT_BULLET);
    }

    if (headingKey === "klinik") {
      const personalHit = personalChoiceQuote(input.personal, input.message);
      if (personalHit && !highlights.some((item) => item.surface === "personal" && item.field === "passt")) {
        highlights.push({ surface: "personal", field: "passt", quote: personalHit });
      }
    }
  }

  let offer: LohlotseOffer | null = null;
  if (clinic && (wantsSave(input.message) || missing || headingKey === "wichtig")) {
    const candidate =
      missing
        ? `Geprüft für ${clinic.shortName}: Speiseraum / Verpflegung im offiziellen Steckbrief nicht belegt (nicht im offiziellen Steckbrief).`
        : highlights[0]?.quote ??
          clinic.steckbrief.kinderFamilie?.bullets[0] ??
          bullets.find((item) => item.length > 24);
    if (candidate) {
      const field: PersonalField =
        headingKey === "wichtig" ? "passtNicht" : headingKey === "naechster" ? "offeneFragen" : "passt";
      const prefix = candidate.startsWith("Zu ") || candidate.startsWith("Geprüft ") ? "" : `Zu ${clinic.shortName}: `;
      offer = {
        field,
        text: `${prefix}${candidate}`,
        status: "open",
      };
    }
  }

  const cleanBullets = bullets.filter(Boolean).slice(0, 7);
  const showWait = Boolean(clinic) && waitAsked;
  // Allgemeine Fragen: free + kurze Prosa (nicht nur Keyword→Schablone).
  // Wartezeit-only und Merge-nahe Fälle bleiben guided mit Heading.
  const useFree =
    headingKey === "ueberblick" ||
    (headingKey === "klinik" && !waitAsked && !missing) ||
    (headingKey === "naechster" && !waitAsked);

  if (useFree) {
    const prose = cleanBullets.join(" ").replace(/\s{2,}/g, " ").trim();
    return {
      mode: "free",
      prose,
      headingKey: null,
      heading: "",
      bullets: [],
      sources: sources.length ? sources : ["App-Steckbrief hat Vorrang vor Web"],
      clinicId: clinic?.id ?? input.currentClinicId,
      highlights,
      showWait,
      offer,
    };
  }

  return {
    mode: "guided",
    headingKey,
    heading: headingLabel(headingKey),
    bullets: cleanBullets,
    sources: sources.length ? sources : ["App-Steckbrief hat Vorrang vor Web"],
    clinicId: clinic?.id ?? input.currentClinicId,
    highlights,
    showWait,
    offer,
  };
}
