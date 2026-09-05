import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import {
  appliedMergePayload,
  applyOfferToPersonal,
  composeLohlotseReply,
  headingLabel,
  isMergeConfirm,
  parseLohlotsePayload,
  payloadToContent,
  resolveClinicMention,
  sanitizeLohlotsePayload,
  wantsPersonalSave,
  type LohlotseClinic,
  type LohlotseOffer,
  type LohlotsePayload,
  type PersonalDraft,
  type PersonalField,
} from "@/lib/domain/lohlotse";
import { STECKBRIEF_BLOCKS, indicationLabel, type KlaromatAnswers, type MatchSnapshot } from "@/lib/domain/types";
import { coerceWaitEstimate } from "@/lib/domain/wait-time";
import { loadClinics } from "./clinics";

export type LohlotseMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  payload: LohlotsePayload | null;
};

export type LohlotseMatch = {
  clinicId: string;
  name: string;
  score: number;
  waitLabel: string;
};

export type LohlotseMergeRecord = {
  id: string;
  field: PersonalField;
  beforeText: string;
  afterText: string;
  undone: boolean;
};

export type LohlotseWorkspace = {
  folderId: string;
  clientName: string;
  personal: PersonalDraft & { folderId: string; updatedAt: string };
  clinicId: string | null;
  messages: LohlotseMessage[];
  matches: LohlotseMatch[];
  lastMerge: LohlotseMergeRecord | null;
};

function asIso(value: string | Date): string {
  if (typeof value === "string") return value;
  return value.toISOString();
}

function parseJson<T>(value: T | string): T {
  if (typeof value === "string") return JSON.parse(value) as T;
  return value;
}

async function getOwnedFolder(folderId: string, userId: string) {
  const sql = await getSql();
  const folders = await sql<{ id: string; client_name: string }>`
    select id, client_name from case_folders
    where id = ${folderId} and user_id = ${userId}
  `;
  const folder = folders[0];
  if (!folder) throw new Error("Fallordner nicht gefunden.");
  const runs = await sql<{ id: string }>`
    select id from runs where folder_id = ${folderId} and user_id = ${userId} limit 1
  `;
  if (!runs[0]) {
    throw new Error("Kein Durchlauf in diesem Ordner. Bitte zuerst den Klar-o-Mat starten.");
  }
  return { id: folder.id, clientName: folder.client_name };
}

async function getOwnedThread(folderId: string, userId: string) {
  const folder = await getOwnedFolder(folderId, userId);
  const sql = await getSql();
  let threads = await sql<{ id: string; clinic_id: string | null }>`
    select id, clinic_id from lohlotse_threads
    where folder_id = ${folderId} and user_id = ${userId}
  `;
  if (!threads[0]) {
    const id = crypto.randomUUID();
    await sql.query(
      `insert into lohlotse_threads (id, folder_id, user_id, created_at, last_opened_at)
       values ($1,$2,$3,now(),now())`,
      [id, folderId, userId],
    );
    threads = [{ id, clinic_id: null }];
  } else {
    await sql.query(
      `update lohlotse_threads set last_opened_at = now()
       where id = $1 and user_id = $2`,
      [threads[0].id, userId],
    );
  }
  return {
    threadId: threads[0].id,
    clientName: folder.clientName,
    clinicId: threads[0].clinic_id,
  };
}

function mapMessage(row: {
  id: string;
  role: string;
  content: string;
  created_at: string;
  payload: unknown;
}): LohlotseMessage {
  const payload = parseLohlotsePayload(row.payload) ?? parseLohlotsePayload(row.content);
  return {
    id: row.id,
    role: row.role === "assistant" ? "assistant" : "user",
    content: row.content,
    createdAt: asIso(row.created_at),
    payload,
  };
}

async function loadPersonal(folderId: string, userId: string): Promise<PersonalDraft & { folderId: string; updatedAt: string }> {
  const sql = await getSql();
  const rows = await sql<{
    passt: string;
    passt_nicht: string;
    offene_fragen: string;
    rueckmeldungen: string;
    updated_at: string;
  }>`
    select passt, passt_nicht, offene_fragen, rueckmeldungen, updated_at
    from personal_steckbriefe
    where folder_id = ${folderId} and user_id = ${userId}
  `;
  const row = rows[0];
  return {
    folderId,
    passt: row?.passt ?? "",
    passtNicht: row?.passt_nicht ?? "",
    offeneFragen: row?.offene_fragen ?? "",
    rueckmeldungen: row?.rueckmeldungen ?? "",
    updatedAt: row ? asIso(row.updated_at) : new Date().toISOString(),
  };
}

async function loadMatches(folderId: string, userId: string): Promise<{
  answers: KlaromatAnswers | null;
  matches: MatchSnapshot[];
  runNumber: number | null;
}> {
  const sql = await getSql();
  const lastRun = await sql<{
    answers: KlaromatAnswers | string;
    matches: MatchSnapshot[] | string;
    run_number: number;
  }>`
    select answers, matches, run_number from runs
    where folder_id = ${folderId} and user_id = ${userId}
    order by run_number desc
    limit 1
  `;
  const run = lastRun[0];
  if (!run) return { answers: null, matches: [], runNumber: null };
  return {
    answers: parseJson(run.answers),
    matches: parseJson(run.matches),
    runNumber: run.run_number,
  };
}

async function lastMerge(folderId: string, userId: string): Promise<LohlotseMergeRecord | null> {
  const sql = await getSql();
  const rows = await sql<{
    id: string;
    field: string;
    before_text: string;
    after_text: string;
    undone: boolean;
  }>`
    select id, field, before_text, after_text, undone
    from lohlotse_merges
    where folder_id = ${folderId} and user_id = ${userId}
    order by created_at desc
    limit 1
  `;
  const row = rows[0];
  if (!row) return null;
  if (
    row.field !== "passt" &&
    row.field !== "passtNicht" &&
    row.field !== "offeneFragen" &&
    row.field !== "rueckmeldungen"
  ) {
    return null;
  }
  return {
    id: row.id,
    field: row.field,
    beforeText: row.before_text,
    afterText: row.after_text,
    undone: Boolean(row.undone),
  };
}

function officialDump(clinic: LohlotseClinic): string {
  const blocks = STECKBRIEF_BLOCKS.map((block) => {
    const data = clinic.steckbrief[block.key];
    return `${block.nr} ${block.title}: ${data.bullets.join(" · ")}`;
  });
  return `${clinic.name} (${clinic.id}), ${clinic.city}, ${clinic.stateName}, Träger ${clinic.traeger}.\n${blocks.join("\n")}`;
}

const GROK_SYSTEM = `Du bist der Lohlotse in Lohklar (founded by Kerlwerk). Sie-Form, Deutsch, knapp, scannbar. Du unterstützt Sozialarbeiter:innen bei der Orientierung in der medizinischen Rehabilitation (Sucht, Psychosomatik, Dualdiagnosen).

Antwort AUSSCHLIESSLICH als JSON-Objekt:
{
  "headingKey": "ueberblick" | "klinik" | "wartezeit" | "naechster" | "wichtig",
  "bullets": ["…"],
  "sources": ["…"],
  "clinicId": "ck-…" | null,
  "highlights": [{ "surface": "official"|"personal", "block": "kinderFamilie"|"wohnenAlltag"|"wartezeit"|…, "field": "passt"|…, "quote": "exaktes Zitat" }],
  "showWait": false,
  "offer": { "field": "passt"|"passtNicht"|"offeneFragen"|"rueckmeldungen", "text": "ein Satz im Ton des bestehenden persönlichen Blocks" } | null,
  "wait_time": "none" | "use_component_c",
  "action": "none" | "preview_merge" | "ask_name",
  "merge_preview": { "target_heading": "Passung, die wir prüfen" | null, "proposed_bullets": [], "style": "match_neighbors" }
}

START
- Ohne Arbeitsnamen: headingKey=ueberblick, action=ask_name, wait_time=none. Drei Kugeln: Für welche Person? Fallordner wählen oder Klar-o-Mat (immer Durchlauf 1). Ohne Namen kein Thread, kein persönlicher Steckbrief.

LEISTE
- Offiziellen und persönlichen Steckbrief immer mitdenken. highlights.quote muss im App-Steckbrief oder persönlichen Block stehen.
- block-Werte intern: kinderFamilie, wohnenAlltag, wartezeit, indikation, kontraindikation, settingDauer, therapie, medizin, sozialdienst, kostentraeger, besonderheiten.
- Persönlich: field passt = Wahlkriterien = „Passung, die wir prüfen“. Nie 6 erfundene H2.
- Leere Klinikleiste nicht im Fließtext beschreiben, außer sie ist leer: dann genau „Klinik wählen oder nennen“.

ANTWORTFORM
- Genau EINE Emoji-Überschrift (headingKey). Stichpunkte, keine Aufsätze.
- Kinderfrage + Wartezeit in EINER Frage: headingKey=klinik, showWait=true, wait_time=use_component_c. KEIN zweites ⏳.
- NUR Wartezeit: headingKey=wartezeit, showWait=true, wait_time=use_component_c.
- Letztes Bullet bei Wartezeit (kombiniert): „Wartezeit nicht selbst geschätzt. Es gilt die Anzeige der Wartezeit-Komponente inkl. ‚Rechenweg ansehen‘. Das ist keine Aufnahmezusage.“
- NUR Wartezeit-Bullets: Komponente, Rechenweg ansehen, keine Aufnahmezusage. KEINE Zahl im Fließtext, kein ca., keine Wochen/Tage-Spanne, kein wait.label.
- App-Steckbrief sticht Web. Quellen kurz.

INTERNETRECHERCHE
- Erlaubt für öffentlich belegte Zusatzinfos (Konzept, Kinderregel, Lage, Träger, Speisesaal).
- Fehlt die Angabe im App-Steckbrief: zuerst „Angabe liegt nicht vor.“ Extra nur als Chat-Bullet mit öffentlicher Quelle und Stand. Nie in den offiziellen Kliniktext schreiben.

PERSÖNLICHER STECKBRIEF
- offer nur bei sinnvoller Arbeitsnotiz oder fehlender offizieller Angabe plus Recherche. target_heading „Passung, die wir prüfen“ → field passt.
- action=preview_merge, merge_preview.proposed_bullets ein Satz, Ton der Nachbarzeilen.
- Nach Bestätigung (Ja/Übernehmen) schreibt die App 📋, nicht du.
- Offiziellen Kliniktext niemals überschreiben.

GRENZEN
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

async function askGrok(args: {
  clientName: string;
  catalog: string;
  folderContext: string;
  official: string;
  history: { role: string; content: string }[];
}): Promise<string | null> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return null;
  const system = `${GROK_SYSTEM}

Nur der Arbeitsname ${args.clientName}.

Klinikatalog (ohne Wartezeit-Zahlen — Zahlen gehören nie in den Fließtext):
${args.catalog}

Aktueller Fallordner:
${args.folderContext}

Offizieller Steckbrief des besprochenen Hauses (Vorrang):
${args.official || "Noch kein Hausbezug. Hinweis: Klinik wählen oder nennen."}`;

  const body: Record<string, unknown> = {
    model: "grok-4.5",
    temperature: 0.2,
    max_tokens: 900,
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

async function insertAssistant(
  threadId: string,
  userId: string,
  payload: LohlotsePayload,
): Promise<{ id: string; createdAt: string }> {
  const sql = await getSql();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await sql.query(
    `insert into lohlotse_messages (id, thread_id, user_id, role, content, payload, created_at)
     values ($1,$2,$3,'assistant',$4,$5::jsonb,now())`,
    [id, threadId, userId, payloadToContent(payload), JSON.stringify(payload)],
  );
  return { id, createdAt: now };
}

async function persistMerge(args: {
  folderId: string;
  userId: string;
  messageId: string;
  payload: LohlotsePayload;
  offer: LohlotseOffer;
  personal: PersonalDraft;
  clientName: string;
}): Promise<LohlotsePayload> {
  const merged = applyOfferToPersonal(args.personal, args.offer);
  if (!merged.added) {
    throw new Error("Dieser Punkt steht bereits im persönlichen Steckbrief.");
  }
  const sql = await getSql();
  const mergeId = crypto.randomUUID();
  await sql.query(
    `insert into lohlotse_merges (id, folder_id, user_id, field, before_text, after_text, undone, created_at)
     values ($1,$2,$3,$4,$5,$6,false,now())`,
    [
      mergeId,
      args.folderId,
      args.userId,
      args.offer.field,
      args.personal[args.offer.field],
      merged.next[args.offer.field],
    ],
  );
  await sql.query(
    `update personal_steckbriefe
     set passt = $1, passt_nicht = $2, offene_fragen = $3, rueckmeldungen = $4, updated_at = now()
     where folder_id = $5 and user_id = $6`,
    [
      merged.next.passt,
      merged.next.passtNicht,
      merged.next.offeneFragen,
      merged.next.rueckmeldungen,
      args.folderId,
      args.userId,
    ],
  );
  const nextPayload: LohlotsePayload = {
    ...args.payload,
    offer: { ...args.offer, status: "applied" },
  };
  await sql.query(
    `update lohlotse_messages set payload = $1::jsonb where id = $2 and user_id = $3`,
    [JSON.stringify(nextPayload), args.messageId, args.userId],
  );
  await sql.query(
    `update case_folders set updated_at = now() where id = $1 and user_id = $2`,
    [args.folderId, args.userId],
  );
  return appliedMergePayload({
    clientName: args.clientName,
    offer: args.offer,
    clinicId: args.payload.clinicId,
  });
}

async function buildWorkspace(folderId: string, userId: string): Promise<LohlotseWorkspace> {
  const { threadId, clientName, clinicId } = await getOwnedThread(folderId, userId);
  const sql = await getSql();
  const rows = await sql<{
    id: string;
    role: string;
    content: string;
    created_at: string;
    payload: unknown;
  }>`
    select id, role, content, created_at, payload
    from lohlotse_messages
    where thread_id = ${threadId} and user_id = ${userId}
    order by created_at asc
  `;
  const personal = await loadPersonal(folderId, userId);
  const run = await loadMatches(folderId, userId);
  const clinics = await loadClinics();
  const matches: LohlotseMatch[] = run.matches.slice(0, 8).map((item) => {
    const clinic = clinics.find((row) => row.id === item.clinicId);
    const wait = coerceWaitEstimate(item.wait);
    return {
      clinicId: item.clinicId,
      name: clinic?.name ?? item.clinicId,
      score: item.score,
      waitLabel: wait?.label ?? "keine Schätzung",
    };
  });
  return {
    folderId,
    clientName,
    personal,
    clinicId,
    messages: rows.map(mapMessage),
    matches,
    lastMerge: await lastMerge(folderId, userId),
  };
}

export const getLastLohlotseFolder = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ id: string; client_name: string }>`
      select f.id, f.client_name
      from lohlotse_threads t
      join case_folders f on f.id = t.folder_id
      where t.user_id = ${context.userId}
        and f.user_id = ${context.userId}
        and exists (select 1 from runs r where r.folder_id = f.id)
      order by t.last_opened_at desc
      limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    return { folderId: row.id, clientName: row.client_name };
  });

export const getLohlotseWorkspace = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((folderId: string) => folderId)
  .handler(async ({ context, data: folderId }) => {
    return buildWorkspace(folderId, context.userId);
  });

export const listLohlotseMessages = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((folderId: string) => folderId)
  .handler(async ({ context, data: folderId }) => {
    const workspace = await buildWorkspace(folderId, context.userId);
    return {
      threadId: folderId,
      clientName: workspace.clientName,
      messages: workspace.messages,
    };
  });

export const setLohlotseClinic = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; clinicId: string | null }) => input)
  .handler(async ({ context, data }) => {
    const { threadId } = await getOwnedThread(data.folderId, context.userId);
    const sql = await getSql();
    await sql.query(
      `update lohlotse_threads set clinic_id = $1, last_opened_at = now()
       where id = $2 and user_id = $3`,
      [data.clinicId, threadId, context.userId],
    );
    return buildWorkspace(data.folderId, context.userId);
  });

export const sendLohlotseMessage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; content: string; clinicId?: string | null }) => input)
  .handler(async ({ context, data }) => {
    const content = data.content.trim();
    if (content.length < 2) throw new Error("Bitte eine Frage oder einen Hinweis schreiben.");
    if (content.length > 4000) throw new Error("Die Nachricht ist zu lang (höchstens 4000 Zeichen).");

    const { threadId, clientName, clinicId: storedClinicId } = await getOwnedThread(
      data.folderId,
      context.userId,
    );
    const sql = await getSql();
    const userMsgId = crypto.randomUUID();
    await sql.query(
      `insert into lohlotse_messages (id, thread_id, user_id, role, content, created_at)
       values ($1,$2,$3,'user',$4,now())`,
      [userMsgId, threadId, context.userId, content],
    );

    const personal = await loadPersonal(data.folderId, context.userId);
    const openRows = await sql<{ id: string; payload: unknown }>`
      select id, payload from lohlotse_messages
      where thread_id = ${threadId} and user_id = ${context.userId} and role = 'assistant'
      order by created_at desc
      limit 8
    `;
    const openRow = openRows.find((row) => parseLohlotsePayload(row.payload)?.offer?.status === "open");
    const openPayload = openRow ? parseLohlotsePayload(openRow.payload) : null;
    if (isMergeConfirm(content) && openRow && openPayload?.offer) {
      const confirm = await persistMerge({
        folderId: data.folderId,
        userId: context.userId,
        messageId: openRow.id,
        payload: openPayload,
        offer: openPayload.offer,
        personal,
        clientName,
      });
      const saved = await insertAssistant(threadId, context.userId, confirm);
      const now = new Date().toISOString();
      return {
        userMessage: {
          id: userMsgId,
          role: "user" as const,
          content,
          createdAt: now,
          payload: null,
        },
        assistantMessage: {
          id: saved.id,
          role: "assistant" as const,
          content: payloadToContent(confirm),
          createdAt: saved.createdAt,
          payload: confirm,
        },
        workspace: await buildWorkspace(data.folderId, context.userId),
      };
    }

    const history = await sql<{ role: string; content: string }>`
      select role, content from lohlotse_messages
      where thread_id = ${threadId} and user_id = ${context.userId}
      order by created_at desc
      limit 16
    `;
    const chronological = [...history].reverse();
    const run = await loadMatches(data.folderId, context.userId);
    const clinics = await loadClinics();
    const currentClinicId = data.clinicId ?? storedClinicId;
    const mentioned = resolveClinicMention(content, clinics, currentClinicId);
    const clinic = mentioned ?? clinics.find((item) => item.id === currentClinicId) ?? null;
    if (clinic && clinic.id !== storedClinicId) {
      await sql.query(
        `update lohlotse_threads set clinic_id = $1 where id = $2 and user_id = $3`,
        [clinic.id, threadId, context.userId],
      );
    }

    const catalog = clinics
      .map((item) => `- ${item.id} ${item.name} (${item.city}, ${item.stateName}): ${item.indicationAreas.join("/")}`)
      .join("\n");

    const top = run.matches
      .slice(0, 5)
      .map((item) => {
        const house = clinics.find((c) => c.id === item.clinicId);
        return `${house?.name ?? item.clinicId} (Passung ${item.score})`;
      })
      .join("; ");

    const folderContext = [
      `Arbeitsname im Fallordner: ${clientName}`,
      `Persönlicher Steckbrief — Was passt / Passung, die wir prüfen: ${personal.passt}\nWas nicht passt: ${personal.passtNicht}\nOffene Fragen: ${personal.offeneFragen}\nRückmeldungen: ${personal.rueckmeldungen}`,
      run.answers
        ? `Letzter Klar-o-Mat-Lauf ${run.runNumber}: ${indicationLabel(run.answers.indication)}. Region ${run.answers.states.join(", ") || "offen"}. Setting ${run.answers.genderSetting}, ${run.answers.setting}. Bedarf: ${run.answers.bedarfe.join(", ") || "nicht näher"}. Hinweise: ${run.answers.notes || "—"}`
        : "Noch kein Lauf.",
      top ? `Aktuelle Arbeitsauswahl: ${top}` : "Keine Treffer gespeichert.",
      "Wartezeit nur über die Wartezeit-Komponente. Keine Zahlen, keine Wochen/Tage im Fließtext.",
    ].join("\n");

    const local = composeLohlotseReply({
      clientName,
      message: content,
      personal,
      clinics,
      matches: run.matches,
      currentClinicId: clinic?.id ?? currentClinicId,
    });

    const grokText = await askGrok({
      clientName,
      catalog,
      folderContext,
      official: clinic ? officialDump(clinic) : "",
      history: chronological,
    });
    const parsed = parseLohlotsePayload(grokText);
    const merged: LohlotsePayload = parsed
      ? {
          ...local,
          ...parsed,
          heading: headingLabel(parsed.headingKey),
          bullets: parsed.bullets.length ? parsed.bullets : local.bullets,
          highlights: parsed.highlights.length ? parsed.highlights : local.highlights,
          clinicId:
            parsed.clinicId && clinics.some((item) => item.id === parsed.clinicId)
              ? parsed.clinicId
              : clinic?.id ?? local.clinicId,
          offer: parsed.offer ?? (wantsPersonalSave(content) || local.offer ? local.offer : null),
          showWait: parsed.showWait || local.showWait,
        }
      : local;

    const payload = sanitizeLohlotsePayload(merged, content, local);

    const saved = await insertAssistant(threadId, context.userId, payload);
    await sql.query(
      `update case_folders set updated_at = now() where id = $1 and user_id = $2`,
      [data.folderId, context.userId],
    );

    return {
      userMessage: {
        id: userMsgId,
        role: "user" as const,
        content,
        createdAt: saved.createdAt,
        payload: null,
      },
      assistantMessage: {
        id: saved.id,
        role: "assistant" as const,
        content: payloadToContent(payload),
        createdAt: saved.createdAt,
        payload,
      },
      workspace: await buildWorkspace(data.folderId, context.userId),
    };
  });

export const applyLohlotseMerge = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; messageId: string }) => input)
  .handler(async ({ context, data }) => {
    const { threadId, clientName } = await getOwnedThread(data.folderId, context.userId);
    const sql = await getSql();
    const messages = await sql<{ payload: unknown }>`
      select m.payload
      from lohlotse_messages m
      join lohlotse_threads t on t.id = m.thread_id
      where m.id = ${data.messageId}
        and m.user_id = ${context.userId}
        and t.folder_id = ${data.folderId}
    `;
    const payload = parseLohlotsePayload(messages[0]?.payload);
    const offer = payload?.offer;
    if (!offer || offer.status === "applied") {
      throw new Error("Kein übernahmefähiger Vorschlag.");
    }
    const personal = await loadPersonal(data.folderId, context.userId);
    const confirm = await persistMerge({
      folderId: data.folderId,
      userId: context.userId,
      messageId: data.messageId,
      payload: payload!,
      offer,
      personal,
      clientName,
    });
    await insertAssistant(threadId, context.userId, confirm);
    return buildWorkspace(data.folderId, context.userId);
  });

export const dismissLohlotseOffer = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; messageId: string }) => input)
  .handler(async ({ context, data }) => {
    await getOwnedFolder(data.folderId, context.userId);
    const sql = await getSql();
    const messages = await sql<{ payload: unknown }>`
      select m.payload
      from lohlotse_messages m
      join lohlotse_threads t on t.id = m.thread_id
      where m.id = ${data.messageId}
        and m.user_id = ${context.userId}
        and t.folder_id = ${data.folderId}
    `;
    const payload = parseLohlotsePayload(messages[0]?.payload);
    if (payload?.offer) {
      const next: LohlotsePayload = { ...payload, offer: { ...payload.offer, status: "dismissed" } };
      await sql.query(
        `update lohlotse_messages set payload = $1::jsonb where id = $2 and user_id = $3`,
        [JSON.stringify(next), data.messageId, context.userId],
      );
    }
    return buildWorkspace(data.folderId, context.userId);
  });

export const undoLohlotseMerge = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string }) => input)
  .handler(async ({ context, data }) => {
    await getOwnedFolder(data.folderId, context.userId);
    const merge = await lastMerge(data.folderId, context.userId);
    if (!merge || merge.undone) throw new Error("Nichts zum Rückgängigmachen.");
    const sql = await getSql();
    const personal = await loadPersonal(data.folderId, context.userId);
    const restored = { ...personal, [merge.field]: merge.beforeText };
    await sql.query(
      `update personal_steckbriefe
       set passt = $1, passt_nicht = $2, offene_fragen = $3, rueckmeldungen = $4, updated_at = now()
       where folder_id = $5 and user_id = $6`,
      [
        restored.passt,
        restored.passtNicht,
        restored.offeneFragen,
        restored.rueckmeldungen,
        data.folderId,
        context.userId,
      ],
    );
    await sql.query(
      `update lohlotse_merges set undone = true where id = $1 and user_id = $2`,
      [merge.id, context.userId],
    );
    return buildWorkspace(data.folderId, context.userId);
  });
