import { getSql } from "@/lib/db";
import {
  appliedMergePayload,
  applyOfferToPersonal,
  parseLohlotsePayload,
  payloadToContent,
  type LohlotseOffer,
  type LohlotsePayload,
  type PersonalDraft,
  type PersonalField,
} from "@/lib/domain/lohlotse";
import { type KlaromatAnswers, type MatchSnapshot } from "@/lib/domain/types";
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

export function asIso(value: string | Date): string {
  if (typeof value === "string") return value;
  return value.toISOString();
}

function parseJson<T>(value: T | string): T {
  if (typeof value === "string") return JSON.parse(value) as T;
  return value;
}

export async function getOwnedFolder(folderId: string, userId: string) {
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

export async function getOwnedThread(folderId: string, userId: string) {
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

export function mapMessage(row: {
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

export async function loadPersonal(folderId: string, userId: string): Promise<PersonalDraft & { folderId: string; updatedAt: string }> {
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

export async function loadMatches(folderId: string, userId: string): Promise<{
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

export async function lastMerge(folderId: string, userId: string): Promise<LohlotseMergeRecord | null> {
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

export async function insertAssistant(
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

export async function persistMerge(args: {
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

export async function buildWorkspace(folderId: string, userId: string): Promise<LohlotseWorkspace> {
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
