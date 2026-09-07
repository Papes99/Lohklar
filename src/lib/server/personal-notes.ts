import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { generateLotseVorschlaege } from "@/lib/domain/lotse-vorschlaege";
import { emptyAnswers, normalizeAnswers } from "@/lib/domain/matching";
import {
  isPersonalSection,
  LINES_MAX,
  linesFor,
  normalizeLineBody,
  pendingSuggestions,
  type PersonalCard,
  type PersonalLine,
  type PersonalSection,
  type PersonalSuggestion,
} from "@/lib/domain/personal-notes";
import type { KlaromatAnswers, MatchSnapshot } from "@/lib/domain/types";
import { loadClinics } from "./clinics";
import { asIso, parseJson } from "./cases-shared";

type LineRow = {
  id: string;
  section: string;
  body: string;
  sort_order: number;
  created_at: string;
};

type SuggestionRow = {
  id: string;
  section: string;
  body: string;
  source: string;
  status: string;
  accepted_line_id: string | null;
};

function mapLine(row: LineRow): PersonalLine | null {
  if (!isPersonalSection(row.section)) return null;
  return {
    id: row.id,
    section: row.section,
    body: row.body,
    sortOrder: Number(row.sort_order),
    createdAt: asIso(row.created_at),
  };
}

function mapSuggestion(row: SuggestionRow): PersonalSuggestion | null {
  if (!isPersonalSection(row.section)) return null;
  const status =
    row.status === "accepted" || row.status === "dismissed" ? row.status : "pending";
  return {
    id: row.id,
    section: row.section,
    body: row.body,
    source: "lohlotse",
    status,
    acceptedLineId: row.accepted_line_id,
  };
}

async function requireFolder(userId: string, folderId: string) {
  const sql = await getSql();
  const rows = await sql<{ id: string; client_name: string }>`
    select id, client_name from case_folders
    where id = ${folderId} and user_id = ${userId}
  `;
  const folder = rows[0];
  if (!folder) throw new Error("Fallordner nicht gefunden.");
  return folder;
}

async function loadLines(folderId: string, userId: string): Promise<PersonalLine[]> {
  const sql = await getSql();
  const rows = await sql<LineRow>`
    select id, section, body, sort_order, created_at
    from personal_note_lines
    where folder_id = ${folderId} and user_id = ${userId}
    order by section, sort_order, created_at
  `;
  return rows.map(mapLine).filter((item): item is PersonalLine => Boolean(item));
}

async function loadSuggestions(folderId: string, userId: string): Promise<PersonalSuggestion[]> {
  const sql = await getSql();
  const rows = await sql<SuggestionRow>`
    select id, section, body, source, status, accepted_line_id
    from personal_note_suggestions
    where folder_id = ${folderId} and user_id = ${userId}
    order by created_at asc
  `;
  return rows.map(mapSuggestion).filter((item): item is PersonalSuggestion => Boolean(item));
}

async function refreshLotse(folderId: string, userId: string): Promise<void> {
  const sql = await getSql();
  const runs = await sql<{
    id: string;
    answers: KlaromatAnswers | string;
    matches: MatchSnapshot[] | string;
  }>`
    select id, answers, matches from runs
    where folder_id = ${folderId} and user_id = ${userId}
    order by run_number desc
    limit 1
  `;
  const run = runs[0];
  if (!run) return;
  const clinics = await loadClinics();
  const names = Object.fromEntries(clinics.map((clinic) => [clinic.id, clinic.shortName]));
  const drafts = generateLotseVorschlaege({
    runId: run.id,
    answers: normalizeAnswers({ ...emptyAnswers(), ...parseJson(run.answers) }),
    matches: parseJson(run.matches ?? []),
    clinicNames: names,
  });
  for (const draft of drafts) {
    const existing = await sql<{ id: string }>`
      select id from personal_note_suggestions
      where folder_id = ${folderId} and source_key = ${draft.sourceKey}
    `;
    if (existing[0]) continue;
    await sql.query(
      `insert into personal_note_suggestions
        (id, folder_id, user_id, section, body, source, source_key, status, created_at)
       values ($1,$2,$3,$4,$5,'lohlotse',$6,'pending',now())`,
      [crypto.randomUUID(), folderId, userId, draft.section, draft.body, draft.sourceKey],
    );
  }
}

async function insertLine(
  userId: string,
  folderId: string,
  section: PersonalSection,
  body: string,
  restore?: { id: string; sortOrder: number; createdAt: string },
): Promise<PersonalLine> {
  const existing = await loadLines(folderId, userId);
  if (linesFor(existing, section).length >= LINES_MAX) {
    throw new Error("Dieser Abschnitt ist voll.");
  }
  const sql = await getSql();
  const maxRows = await sql<{ max: number | string | null }>`
    select max(sort_order) as max from personal_note_lines
    where folder_id = ${folderId} and user_id = ${userId} and section = ${section}
  `;
  const id = restore?.id ?? crypto.randomUUID();
  const sortOrder = restore?.sortOrder ?? Number(maxRows[0]?.max ?? 0) + 1;
  const createdAt = restore?.createdAt ?? new Date().toISOString();
  await sql.query(
    `insert into personal_note_lines
      (id, folder_id, user_id, section, body, sort_order, created_at, updated_at)
     values ($1,$2,$3,$4,$5,$6,$7,now())
     on conflict (id) do nothing`,
    [id, folderId, userId, section, body, sortOrder, createdAt],
  );
  await sql.query(
    `update case_folders set updated_at = $1 where id = $2 and user_id = $3`,
    [new Date().toISOString(), folderId, userId],
  );
  return { id, section, body, sortOrder, createdAt };
}

export const getPersonalCard = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((folderId: string) => folderId)
  .handler(async ({ context, data: folderId }): Promise<PersonalCard> => {
    const folder = await requireFolder(context.userId, folderId);
    await refreshLotse(folderId, context.userId);
    const [lines, suggestions] = await Promise.all([
      loadLines(folderId, context.userId),
      loadSuggestions(folderId, context.userId),
    ]);
    return {
      folderId,
      clientName: folder.client_name,
      lines,
      suggestions: pendingSuggestions(suggestions),
    };
  });

export const addPersonalLine = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; section: string; body: string }) => input)
  .handler(async ({ context, data }): Promise<PersonalLine> => {
    if (!isPersonalSection(data.section)) throw new Error("Unbekannter Abschnitt.");
    const body = normalizeLineBody(data.body);
    if (!body) throw new Error("Leere Zeile.");
    await requireFolder(context.userId, data.folderId);
    return insertLine(context.userId, data.folderId, data.section, body);
  });

export const removePersonalLine = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; lineId: string }) => input)
  .handler(async ({ context, data }): Promise<{ ok: true; line: PersonalLine | null }> => {
    await requireFolder(context.userId, data.folderId);
    const sql = await getSql();
    const rows = await sql<LineRow>`
      select id, section, body, sort_order, created_at
      from personal_note_lines
      where id = ${data.lineId} and folder_id = ${data.folderId} and user_id = ${context.userId}
    `;
    const line = rows[0] ? mapLine(rows[0]) : null;
    await sql.query(
      `delete from personal_note_lines
       where id = $1 and folder_id = $2 and user_id = $3`,
      [data.lineId, data.folderId, context.userId],
    );
    return { ok: true, line };
  });

export const restorePersonalLine = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: PersonalLine & { folderId: string }) => input)
  .handler(async ({ context, data }): Promise<PersonalLine> => {
    if (!isPersonalSection(data.section)) throw new Error("Unbekannter Abschnitt.");
    await requireFolder(context.userId, data.folderId);
    return insertLine(context.userId, data.folderId, data.section, data.body, {
      id: data.id,
      sortOrder: data.sortOrder,
      createdAt: data.createdAt,
    });
  });

export const acceptPersonalSuggestion = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; suggestionId: string }) => input)
  .handler(async ({ context, data }): Promise<{ line: PersonalLine; suggestionId: string }> => {
    await requireFolder(context.userId, data.folderId);
    const sql = await getSql();
    const rows = await sql<SuggestionRow>`
      select id, section, body, source, status, accepted_line_id
      from personal_note_suggestions
      where id = ${data.suggestionId} and folder_id = ${data.folderId} and user_id = ${context.userId}
    `;
    const suggestion = rows[0] ? mapSuggestion(rows[0]) : null;
    if (!suggestion || suggestion.status !== "pending") {
      throw new Error("Vorschlag nicht mehr offen.");
    }
    const line = await insertLine(context.userId, data.folderId, suggestion.section, suggestion.body);
    await sql.query(
      `update personal_note_suggestions
       set status = 'accepted', accepted_line_id = $1
       where id = $2 and folder_id = $3 and user_id = $4`,
      [line.id, data.suggestionId, data.folderId, context.userId],
    );
    return { line, suggestionId: data.suggestionId };
  });

export const dismissPersonalSuggestion = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; suggestionId: string }) => input)
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await requireFolder(context.userId, data.folderId);
    const sql = await getSql();
    await sql.query(
      `update personal_note_suggestions
       set status = 'dismissed'
       where id = $1 and folder_id = $2 and user_id = $3 and status = 'pending'`,
      [data.suggestionId, data.folderId, context.userId],
    );
    return { ok: true };
  });

export const reopenPersonalSuggestion = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; suggestionId: string; removeLineId?: string }) => input)
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await requireFolder(context.userId, data.folderId);
    const sql = await getSql();
    if (data.removeLineId) {
      await sql.query(
        `delete from personal_note_lines
         where id = $1 and folder_id = $2 and user_id = $3`,
        [data.removeLineId, data.folderId, context.userId],
      );
    }
    await sql.query(
      `update personal_note_suggestions
       set status = 'pending', accepted_line_id = null
       where id = $1 and folder_id = $2 and user_id = $3`,
      [data.suggestionId, data.folderId, context.userId],
    );
    return { ok: true };
  });
