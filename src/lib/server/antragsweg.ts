import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import {
  assertLabel,
  clampNote,
  emptyDeadlines,
  isDocStatus,
  isDeadlineKind,
  isKostentraegerPfad,
  normalizeDate,
  seedAntragDocuments,
  SEED_DOCUMENTS,
  type AntragDeadline,
  type AntragDocumentItem,
  type Antragsweg,
  type DeadlineKind,
  type DocStatus,
  type KostentraegerPfad,
} from "@/lib/domain/antragsweg";

function asIso(value: string | Date): string {
  if (typeof value === "string") return value;
  return value.toISOString();
}

function asDateYmd(value: string | Date | null | undefined): string | null {
  if (value == null) return null;
  if (typeof value === "string") {
    return value.slice(0, 10) || null;
  }
  return value.toISOString().slice(0, 10);
}

async function assertFolderOwned(
  sql: Awaited<ReturnType<typeof getSql>>,
  folderId: string,
  userId: string,
) {
  const rows = await sql<{ id: string }>`
    select id from case_folders
    where id = ${folderId} and user_id = ${userId}
  `;
  if (!rows[0]) throw new Error("Fallordner nicht gefunden.");
}

async function insertSeed(
  sql: Awaited<ReturnType<typeof getSql>>,
  folderId: string,
  userId: string,
  now: string,
) {
  await sql.query(
    `insert into antragsweg (folder_id, user_id, kostentraeger_pfad, updated_at)
     values ($1,$2,'offen',$3)
     on conflict (folder_id) do nothing`,
    [folderId, userId, now],
  );

  const existingDocs = await sql<{ n: number }>`
    select count(*)::int as n from antragsweg_documents
    where folder_id = ${folderId} and user_id = ${userId}
  `;
  if (Number(existingDocs[0]?.n ?? 0) === 0) {
    const ids = SEED_DOCUMENTS.map(() => crypto.randomUUID());
    const docs = seedAntragDocuments(ids);
    for (const doc of docs) {
      await sql.query(
        `insert into antragsweg_documents (
          id, folder_id, user_id, item_key, label, status, note, sort_order
        ) values ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          doc.id,
          folderId,
          userId,
          doc.key,
          doc.label,
          doc.status,
          doc.note,
          doc.sortOrder,
        ],
      );
    }
  }

  for (const deadline of emptyDeadlines()) {
    await sql.query(
      `insert into antragsweg_deadlines (folder_id, user_id, kind, due_date, note)
       values ($1,$2,$3,null,'')
       on conflict (folder_id, kind) do nothing`,
      [folderId, userId, deadline.kind],
    );
  }
}

/** Call when creating a new case folder so Antragsweg exists immediately. */
export async function seedAntragswegForFolder(
  sql: Awaited<ReturnType<typeof getSql>>,
  folderId: string,
  userId: string,
  now = new Date().toISOString(),
) {
  await insertSeed(sql, folderId, userId, now);
}

async function loadAntragsweg(
  sql: Awaited<ReturnType<typeof getSql>>,
  folderId: string,
  userId: string,
): Promise<Antragsweg> {
  const heads = await sql<{
    folder_id: string;
    kostentraeger_pfad: string;
    updated_at: string;
  }>`
    select folder_id, kostentraeger_pfad, updated_at
    from antragsweg
    where folder_id = ${folderId} and user_id = ${userId}
  `;
  const head = heads[0];
  if (!head) {
    throw new Error("Antragsweg nicht gefunden.");
  }

  const docRows = await sql<{
    id: string;
    item_key: string | null;
    label: string;
    status: string;
    note: string;
    sort_order: number;
  }>`
    select id, item_key, label, status, note, sort_order
    from antragsweg_documents
    where folder_id = ${folderId} and user_id = ${userId}
    order by sort_order asc, label asc
  `;

  const deadlineRows = await sql<{
    kind: string;
    due_date: string | Date | null;
    note: string;
  }>`
    select kind, due_date, note
    from antragsweg_deadlines
    where folder_id = ${folderId} and user_id = ${userId}
  `;

  const byKind = new Map(deadlineRows.map((row) => [row.kind, row]));
  const deadlines: AntragDeadline[] = emptyDeadlines().map((item) => {
    const row = byKind.get(item.kind);
    return {
      kind: item.kind,
      date: asDateYmd(row?.due_date ?? null),
      note: row?.note ?? "",
    };
  });

  const documents: AntragDocumentItem[] = docRows.map((row) => ({
    id: row.id,
    key: row.item_key,
    label: row.label,
    status: (isDocStatus(row.status) ? row.status : "fehlt") as DocStatus,
    note: row.note ?? "",
    sortOrder: Number(row.sort_order),
  }));

  return {
    folderId: head.folder_id,
    kostentraegerPfad: isKostentraegerPfad(head.kostentraeger_pfad)
      ? head.kostentraeger_pfad
      : "offen",
    documents,
    deadlines,
    updatedAt: asIso(head.updated_at),
  };
}

async function touchFolder(
  sql: Awaited<ReturnType<typeof getSql>>,
  folderId: string,
  userId: string,
  now: string,
) {
  await sql.query(
    `update antragsweg set updated_at = $1 where folder_id = $2 and user_id = $3`,
    [now, folderId, userId],
  );
  await sql.query(
    `update case_folders set updated_at = $1 where id = $2 and user_id = $3`,
    [now, folderId, userId],
  );
}

export const getAntragsweg = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((folderId: string) => folderId)
  .handler(async ({ context, data: folderId }): Promise<Antragsweg | null> => {
    const sql = await getSql();
    const folders = await sql<{ id: string }>`
      select id from case_folders
      where id = ${folderId} and user_id = ${context.userId}
    `;
    if (!folders[0]) return null;
    const now = new Date().toISOString();
    await insertSeed(sql, folderId, context.userId, now);
    return loadAntragsweg(sql, folderId, context.userId);
  });

export const updateAntragswegPfad = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; kostentraegerPfad: string }) => input)
  .handler(async ({ context, data }) => {
    if (!isKostentraegerPfad(data.kostentraegerPfad)) {
      throw new Error("Unbekannter Kostenträger-Pfad.");
    }
    const sql = await getSql();
    await assertFolderOwned(sql, data.folderId, context.userId);
    const now = new Date().toISOString();
    await insertSeed(sql, data.folderId, context.userId, now);
    await sql.query(
      `update antragsweg set kostentraeger_pfad = $1, updated_at = $2
       where folder_id = $3 and user_id = $4`,
      [data.kostentraegerPfad, now, data.folderId, context.userId],
    );
    await sql.query(
      `update case_folders set updated_at = $1 where id = $2 and user_id = $3`,
      [now, data.folderId, context.userId],
    );
    return loadAntragsweg(sql, data.folderId, context.userId);
  });

export const updateAntragDocument = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      folderId: string;
      documentId: string;
      status: string;
      note?: string;
      label?: string;
    }) => input,
  )
  .handler(async ({ context, data }) => {
    if (!isDocStatus(data.status)) throw new Error("Unbekannter Unterlagenstatus.");
    const sql = await getSql();
    await assertFolderOwned(sql, data.folderId, context.userId);
    const rows = await sql<{ id: string; item_key: string | null }>`
      select id, item_key from antragsweg_documents
      where id = ${data.documentId}
        and folder_id = ${data.folderId}
        and user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row) throw new Error("Unterlage nicht gefunden.");

    const note = clampNote(data.note ?? "");
    const now = new Date().toISOString();
    if (row.item_key == null && typeof data.label === "string") {
      const label = assertLabel(data.label);
      await sql.query(
        `update antragsweg_documents
         set status = $1, note = $2, label = $3
         where id = $4 and user_id = $5`,
        [data.status, note, label, data.documentId, context.userId],
      );
    } else {
      await sql.query(
        `update antragsweg_documents
         set status = $1, note = $2
         where id = $3 and user_id = $4`,
        [data.status, note, data.documentId, context.userId],
      );
    }
    await touchFolder(sql, data.folderId, context.userId, now);
    return loadAntragsweg(sql, data.folderId, context.userId);
  });

export const addAntragDocument = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; label: string }) => input)
  .handler(async ({ context, data }) => {
    const label = assertLabel(data.label);
    const sql = await getSql();
    await assertFolderOwned(sql, data.folderId, context.userId);
    const now = new Date().toISOString();
    await insertSeed(sql, data.folderId, context.userId, now);
    const max = await sql<{ n: number | null }>`
      select max(sort_order)::int as n from antragsweg_documents
      where folder_id = ${data.folderId} and user_id = ${context.userId}
    `;
    const sortOrder = Number(max[0]?.n ?? -1) + 1;
    const id = crypto.randomUUID();
    await sql.query(
      `insert into antragsweg_documents (
        id, folder_id, user_id, item_key, label, status, note, sort_order
      ) values ($1,$2,$3,null,$4,'fehlt','',$5)`,
      [id, data.folderId, context.userId, label, sortOrder],
    );
    await touchFolder(sql, data.folderId, context.userId, now);
    return loadAntragsweg(sql, data.folderId, context.userId);
  });

export const removeAntragDocument = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; documentId: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await assertFolderOwned(sql, data.folderId, context.userId);
    const rows = await sql<{ id: string; item_key: string | null }>`
      select id, item_key from antragsweg_documents
      where id = ${data.documentId}
        and folder_id = ${data.folderId}
        and user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row) throw new Error("Unterlage nicht gefunden.");
    if (row.item_key != null) {
      throw new Error("Standard-Unterlagen können nicht gelöscht werden. Setzen Sie den Status auf „Nicht nötig“.");
    }
    const now = new Date().toISOString();
    await sql.query(
      `delete from antragsweg_documents where id = $1 and user_id = $2`,
      [data.documentId, context.userId],
    );
    await touchFolder(sql, data.folderId, context.userId, now);
    return loadAntragsweg(sql, data.folderId, context.userId);
  });

export const updateAntragDeadline = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      folderId: string;
      kind: string;
      date?: string | null;
      note?: string;
    }) => input,
  )
  .handler(async ({ context, data }) => {
    if (!isDeadlineKind(data.kind)) throw new Error("Unbekannte Frist.");
    const kind = data.kind as DeadlineKind;
    const date = normalizeDate(data.date ?? null);
    const note = clampNote(data.note ?? "");
    const sql = await getSql();
    await assertFolderOwned(sql, data.folderId, context.userId);
    const now = new Date().toISOString();
    await insertSeed(sql, data.folderId, context.userId, now);
    await sql.query(
      `update antragsweg_deadlines
       set due_date = $1, note = $2
       where folder_id = $3 and kind = $4 and user_id = $5`,
      [date, note, data.folderId, kind, context.userId],
    );
    await touchFolder(sql, data.folderId, context.userId, now);
    return loadAntragsweg(sql, data.folderId, context.userId);
  });
