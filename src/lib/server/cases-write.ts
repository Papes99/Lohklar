import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import {
  isDocumentBody,
  type DocumentBody,
  type DocumentVersionMeta,
} from "@/lib/domain/document";
import { emptyAnswers, normalizeAnswers } from "@/lib/domain/matching";
import { type KlaromatAnswers, type MatchSnapshot } from "@/lib/domain/types";
import { insertUsageEvent } from "./usage";
import { seedAntragswegForFolder } from "./antragsweg";
import {
  asIso,
  parseJson,
  matchesInDocumentOrder,
  insertResultDocument,
  requireName,
  prefillSteckbrief,
} from "./cases-shared";

export const createDraftDocument = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { runId: string; clinicIds?: string[] }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      folder_id: string;
      run_number: number;
      status: string;
      client_name: string;
      label: string;
      answers: KlaromatAnswers | string;
      matches: MatchSnapshot[] | string;
    }>`
      select r.id, r.folder_id, r.run_number, coalesce(r.status, 'entwurf') as status,
        f.client_name, coalesce(r.label, '') as label, r.answers, r.matches
      from runs r
      join case_folders f on f.id = r.folder_id
      where r.id = ${data.runId} and r.user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row) throw new Error("Lauf nicht gefunden.");

    const existing = await sql<{ id: string }>`
      select id from result_documents where run_id = ${data.runId} and user_id = ${context.userId}
    `;
    if (existing[0]) {
      return { folderId: row.folder_id, runId: data.runId, documentId: existing[0].id };
    }

    const answers = normalizeAnswers({ ...emptyAnswers(), ...parseJson(row.answers) });
    const allMatches = parseJson<MatchSnapshot[]>(row.matches ?? []);
    const selected = matchesInDocumentOrder(allMatches, data.clinicIds);
    const now = new Date().toISOString();
    await insertResultDocument(sql, {
      runId: data.runId,
      folderId: row.folder_id,
      userId: context.userId,
      clientName: row.client_name,
      runNumber: row.run_number,
      label: row.label ?? "",
      answers,
      matches: selected,
      now,
    });
    const created = await sql<{ id: string }>`
      select id from result_documents where run_id = ${data.runId} and user_id = ${context.userId}
    `;
    await sql.query(
      `update case_folders set updated_at = $1 where id = $2 and user_id = $3`,
      [now, row.folder_id, context.userId],
    );
    return {
      folderId: row.folder_id,
      runId: data.runId,
      documentId: created[0]?.id ?? "",
    };
  });

export const markRunFertig = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { runId: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{ id: string; folder_id: string }>`
      select r.id, r.folder_id from runs r
      join result_documents d on d.run_id = r.id
      where r.id = ${data.runId} and r.user_id = ${context.userId}
    `;
    if (!rows[0]) throw new Error("Bitte zuerst ein Dokument erzeugen.");
    await sql.query(
      `update runs set status = 'fertig'
       where id = $1 and user_id = $2 and status = 'entwurf'`,
      [data.runId, context.userId],
    );
    await sql.query(
      `update case_folders set updated_at = now() where id = $1 and user_id = $2`,
      [rows[0].folder_id, context.userId],
    );
    return { ok: true as const };
  });

export const claimGuestRun = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      clientName?: string;
      folderId?: string;
      fileRef?: string;
      internalNote?: string;
      label?: string;
      answers: KlaromatAnswers;
    }) => input,
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const now = new Date().toISOString();
    const clinics = await loadClinics();
    const matches = rankClinics(clinics, normalizeAnswers(data.answers));

    if (data.folderId) {
      const existing = await sql<{ id: string; client_name: string }>`
        select id, client_name from case_folders
        where id = ${data.folderId} and user_id = ${context.userId}
      `;
      const folder = existing[0];
      if (!folder) throw new Error("Fallordner nicht gefunden.");
      const last = await sql<{ n: number }>`
        select coalesce(max(run_number), 0)::int as n from runs
        where folder_id = ${data.folderId} and user_id = ${context.userId}
      `;
      const previous = Number(last[0]?.n ?? 0);
      if (previous < 1) {
        throw new Error("Dieser Fallordner hat keinen Durchlauf. Legen Sie eine neue Person an.");
      }
      const runNumber = previous + 1;
      const runId = crypto.randomUUID();
      const answers = normalizeAnswers({ ...data.answers, clientName: folder.client_name });
      await sql.query(
        `insert into runs (id, folder_id, user_id, run_number, answers, matches, created_at, label, status)
         values ($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7,$8,'entwurf')`,
        [
          runId,
          data.folderId,
          context.userId,
          runNumber,
          JSON.stringify(answers),
          JSON.stringify(matches),
          now,
          data.label?.trim() || "Gastlauf",
        ],
      );
      await insertResultDocument(sql, {
        runId,
        folderId: data.folderId,
        userId: context.userId,
        clientName: folder.client_name,
        runNumber,
        label: data.label?.trim() || "Gastlauf",
        answers,
        matches,
        now,
      });
      await sql.query(
        `update case_folders set updated_at = $1 where id = $2 and user_id = $3`,
        [now, data.folderId, context.userId],
      );
      return { folderId: data.folderId, runId, runNumber };
    }

    const clientName = requireName(data.clientName ?? "");
    const answers = normalizeAnswers({ ...data.answers, clientName });
    if (!["sucht", "psychosomatik", "dual"].includes(answers.indication)) {
      throw new Error("Unbekannter Indikationsbereich.");
    }
    const folderId = crypto.randomUUID();
    const runId = crypto.randomUUID();
    const prefill = prefillSteckbrief(answers);

    await sql.query(
      `insert into case_folders (id, user_id, client_name, file_ref, internal_note, created_at, updated_at)
       values ($1,$2,$3,$4,$5,$6,$6)`,
      [folderId, context.userId, clientName, data.fileRef?.trim() ?? "", data.internalNote?.trim() ?? "", now],
    );
    await sql.query(
      `insert into personal_steckbriefe (
        folder_id, user_id, passt, passt_nicht, offene_fragen, rueckmeldungen, updated_at
      ) values ($1,$2,$3,$4,$5,$6,$7)`,
      [folderId, context.userId, prefill.passt, prefill.passtNicht, prefill.offeneFragen, prefill.rueckmeldungen, now],
    );
    await sql.query(
      `insert into lohlotse_threads (id, folder_id, user_id, created_at) values ($1,$2,$3,$4)`,
      [crypto.randomUUID(), folderId, context.userId, now],
    );
    await seedAntragswegForFolder(sql, folderId, context.userId, now);
    await sql.query(
      `insert into runs (id, folder_id, user_id, run_number, answers, matches, created_at, label, status)
       values ($1,$2,$3,1,$4::jsonb,$5::jsonb,$6,'Gastlauf','entwurf')`,
      [runId, folderId, context.userId, JSON.stringify(answers), JSON.stringify(matches), now],
    );
    await insertResultDocument(sql, {
      runId,
      folderId,
      userId: context.userId,
      clientName,
      runNumber: 1,
      label: "Gastlauf",
      answers,
      matches,
      now,
    });
    return { folderId, runId, runNumber: 1 };
  });

export const renameFolder = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; clientName: string }) => input)
  .handler(async ({ context, data }) => {
    const clientName = requireName(data.clientName);
    const sql = await getSql();
    const result = await sql.query(
      `update case_folders set client_name = $1, updated_at = now()
       where id = $2 and user_id = $3`,
      [clientName, data.folderId, context.userId],
    );
    void result;
    const check = await sql<{ id: string }>`
      select id from case_folders where id = ${data.folderId} and user_id = ${context.userId}
    `;
    if (!check[0]) throw new Error("Fallordner nicht gefunden.");
    return { ok: true as const, clientName };
  });

export const updateSteckbrief = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      folderId: string;
      passt: string;
      passtNicht: string;
      offeneFragen: string;
      rueckmeldungen: string;
    }) => input,
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql.query(
      `update personal_steckbriefe
       set passt = $1, passt_nicht = $2, offene_fragen = $3, rueckmeldungen = $4, updated_at = now()
       where folder_id = $5 and user_id = $6`,
      [
        data.passt,
        data.passtNicht,
        data.offeneFragen,
        data.rueckmeldungen,
        data.folderId,
        context.userId,
      ],
    );
    await sql.query(
      `update case_folders set updated_at = now() where id = $1 and user_id = $2`,
      [data.folderId, context.userId],
    );
    return { ok: true as const };
  });

export const updateResultDocument = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      documentId: string;
      body: DocumentBody;
      snapshot?: boolean;
      exported?: boolean;
    }) => {
      if (!input.documentId || !isDocumentBody(input.body)) {
        throw new Error("Ungültiges Ergebnisdokument.");
      }
      return input;
    },
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      run_id: string;
      folder_id: string;
      version: number | string;
    }>`
      select id, run_id, folder_id, version
      from result_documents
      where id = ${data.documentId} and user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row) throw new Error("Ergebnisdokument nicht gefunden.");

    const selected = data.body.houses.map((house) => house.clinicId);
    const now = new Date().toISOString();
    await sql.query(
      `update result_documents
       set notes = $1, selected_clinic_ids = $2::text[], body = $3::jsonb, updated_at = $4
       where id = $5 and user_id = $6`,
      [
        data.body.needsText,
        `{${selected.join(",")}}`,
        JSON.stringify(data.body),
        now,
        data.documentId,
        context.userId,
      ],
    );

    const existing = await sql<{ n: number }>`
      select count(*)::int as n from result_document_versions
      where document_id = ${data.documentId} and user_id = ${context.userId}
    `;
    const count = Number(existing[0]?.n ?? 0);
    let version = Number(row.version ?? 1);
    if (data.snapshot || count === 0) {
      version = count === 0 ? 1 : count + 1;
      await sql.query(
        `insert into result_document_versions (
          id, document_id, folder_id, user_id, version, body, created_at
        ) values ($1,$2,$3,$4,$5,$6::jsonb,$7)
        on conflict (document_id, version) do nothing`,
        [
          crypto.randomUUID(),
          data.documentId,
          row.folder_id,
          context.userId,
          version,
          JSON.stringify(data.body),
          now,
        ],
      );
      await sql.query(
        `update result_documents set version = $1 where id = $2 and user_id = $3`,
        [version, data.documentId, context.userId],
      );
    }

    if (data.exported) {
      await sql.query(
        `update runs set status = 'exportiert'
         where id = $1 and user_id = $2 and status <> 'entwurf'`,
        [row.run_id, context.userId],
      );
      await insertUsageEvent(sql, {
        userId: context.userId,
        kind: "document_export",
      });
    }

    await sql.query(
      `update case_folders set updated_at = $1 where id = $2 and user_id = $3`,
      [now, row.folder_id, context.userId],
    );

    const versionRows = await sql<{ version: number; created_at: string }>`
      select version, created_at from result_document_versions
      where document_id = ${data.documentId} and user_id = ${context.userId}
      order by version desc
    `;
    return {
      ok: true as const,
      version,
      updatedAt: now,
      versions: versionRows.map(
        (item): DocumentVersionMeta => ({
          version: Number(item.version),
          createdAt: asIso(item.created_at),
        }),
      ),
    };
  });

export const restoreDocumentVersion = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { documentId: string; version: number }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{
      body: unknown;
      folder_id: string;
    }>`
      select v.body, v.folder_id
      from result_document_versions v
      join result_documents d on d.id = v.document_id
      where v.document_id = ${data.documentId}
        and v.version = ${data.version}
        and v.user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row || !isDocumentBody(parseJson(row.body as DocumentBody | string))) {
      throw new Error("Version nicht gefunden.");
    }
    const body = parseJson<DocumentBody>(row.body as DocumentBody | string);
    const selected = body.houses.map((house) => house.clinicId);
    const now = new Date().toISOString();
    await sql.query(
      `update result_documents
       set notes = $1, selected_clinic_ids = $2::text[], body = $3::jsonb, updated_at = $4
       where id = $5 and user_id = $6`,
      [
        body.needsText,
        `{${selected.join(",")}}`,
        JSON.stringify(body),
        now,
        data.documentId,
        context.userId,
      ],
    );
    await sql.query(
      `update case_folders set updated_at = $1 where id = $2 and user_id = $3`,
      [now, row.folder_id, context.userId],
    );
    return { ok: true as const, body, updatedAt: now };
  });

export const deleteFolder = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((folderId: string) => folderId)
  .handler(async ({ context, data: folderId }) => {
    const sql = await getSql();
    await sql.query(
      `delete from case_folders where id = $1 and user_id = $2`,
      [folderId, context.userId],
    );
    return { ok: true as const };
  });
