import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { emptyAnswers, normalizeAnswers, rankClinics } from "@/lib/domain/matching";
import { type KlaromatAnswers, type MatchSnapshot } from "@/lib/domain/types";
import { loadClinics } from "./clinics";
import { seedAntragswegForFolder } from "./antragsweg";
import {
  asIso,
  parseJson,
  parseStatus,
  mapDocument,
  requireName,
  seedFromName,
  prefillSteckbrief,
  clinicNameMap,
  topClinicName,
  type FolderSummary,
  type PersonalSteckbrief,
  type ResultDocument,
  type RunRecord,
  type FolderDetail,
  type RunDetail,
} from "./cases-shared";

export const listFolders = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const names = await clinicNameMap();
    const rows = await sql<{
      id: string;
      client_name: string;
      file_ref: string;
      internal_note: string;
      created_at: string;
      updated_at: string;
      run_count: number;
      last_indication: string | null;
      last_label: string | null;
      last_status: string | null;
      last_run_at: string | null;
      last_matches: MatchSnapshot[] | string | null;
    }>`
      select
        f.id,
        f.client_name,
        coalesce(f.file_ref, '') as file_ref,
        coalesce(f.internal_note, '') as internal_note,
        f.created_at,
        f.updated_at,
        (select count(*)::int from runs r where r.folder_id = f.id) as run_count,
        (
          select r.answers->>'indication'
          from runs r
          where r.folder_id = f.id
          order by r.run_number desc
          limit 1
        ) as last_indication,
        (
          select coalesce(r.label, '')
          from runs r
          where r.folder_id = f.id
          order by r.run_number desc
          limit 1
        ) as last_label,
        (
          select r.status
          from runs r
          where r.folder_id = f.id
          order by r.run_number desc
          limit 1
        ) as last_status,
        (
          select r.created_at
          from runs r
          where r.folder_id = f.id
          order by r.run_number desc
          limit 1
        ) as last_run_at,
        (
          select r.matches
          from runs r
          where r.folder_id = f.id
          order by r.run_number desc
          limit 1
        ) as last_matches
      from case_folders f
      where f.user_id = ${context.userId}
        and exists (select 1 from runs r where r.folder_id = f.id)
      order by f.updated_at desc
    `;
    return rows.map(
      (row): FolderSummary => ({
        id: row.id,
        clientName: row.client_name,
        fileRef: row.file_ref ?? "",
        internalNote: row.internal_note ?? "",
        createdAt: asIso(row.created_at),
        updatedAt: asIso(row.updated_at),
        runCount: Number(row.run_count),
        lastIndication: row.last_indication,
        lastLabel: row.last_label ?? "",
        lastStatus: row.last_status ? parseStatus(row.last_status) : null,
        lastRunAt: row.last_run_at ? asIso(row.last_run_at) : null,
        topClinicName: topClinicName(row.last_matches, names),
      }),
    );
  });

export const getFolder = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }): Promise<FolderDetail | null> => {
    const sql = await getSql();
    const folders = await sql<{
      id: string;
      client_name: string;
      file_ref: string;
      internal_note: string;
      created_at: string;
      updated_at: string;
    }>`
      select
        id,
        client_name,
        coalesce(file_ref, '') as file_ref,
        coalesce(internal_note, '') as internal_note,
        created_at,
        updated_at
      from case_folders
      where id = ${id} and user_id = ${context.userId}
    `;
    const folder = folders[0];
    if (!folder) return null;

    const stecks = await sql<{
      folder_id: string;
      passt: string;
      passt_nicht: string;
      offene_fragen: string;
      rueckmeldungen: string;
      updated_at: string;
    }>`
      select folder_id, passt, passt_nicht, offene_fragen, rueckmeldungen, updated_at
      from personal_steckbriefe
      where folder_id = ${id} and user_id = ${context.userId}
    `;
    const steck = stecks[0];
    if (!steck) return null;

    const runRows = await sql<{
      id: string;
      folder_id: string;
      run_number: number;
      label: string;
      status: string;
      answers: KlaromatAnswers | string;
      matches: MatchSnapshot[] | string;
      created_at: string;
    }>`
      select
        id,
        folder_id,
        run_number,
        coalesce(label, '') as label,
        coalesce(status, 'fertig') as status,
        answers,
        matches,
        created_at
      from runs
      where folder_id = ${id} and user_id = ${context.userId}
      order by run_number asc
    `;

    const docs = await sql<{
      id: string;
      run_id: string;
      folder_id: string;
      title: string;
      notes: string;
      selected_clinic_ids: string[] | string;
      body: unknown;
      version: number | string | null;
      updated_at: string;
    }>`
      select id, run_id, folder_id, title, notes, selected_clinic_ids, body, version, updated_at
      from result_documents
      where folder_id = ${id} and user_id = ${context.userId}
    `;
    const versionRows = await sql<{
      document_id: string;
      version: number;
      created_at: string;
    }>`
      select document_id, version, created_at
      from result_document_versions
      where folder_id = ${id} and user_id = ${context.userId}
      order by version desc
    `;
    const versionsByDoc = new Map<string, DocumentVersionMeta[]>();
    for (const row of versionRows) {
      const list = versionsByDoc.get(row.document_id) ?? [];
      list.push({ version: Number(row.version), createdAt: asIso(row.created_at) });
      versionsByDoc.set(row.document_id, list);
    }
    const docByRun = new Map(docs.map((doc) => [doc.run_id, doc]));
    const clinics = await loadClinics();

    const runs: RunRecord[] = runRows.map((row) => {
      const doc = docByRun.get(row.id);
      return {
        id: row.id,
        folderId: row.folder_id,
        runNumber: row.run_number,
        label: row.label ?? "",
        status: parseStatus(row.status),
        answers: normalizeAnswers({ ...emptyAnswers(), ...parseJson(row.answers) }),
        matches: parseJson(row.matches),
        createdAt: asIso(row.created_at),
        document: doc
          ? mapDocument(
              doc,
              { answers: normalizeAnswers({ ...emptyAnswers(), ...parseJson(row.answers) }), matches: parseJson(row.matches) },
              clinics,
              versionsByDoc.get(doc.id) ?? [],
            )
          : null,
      };
    });

    return {
      id: folder.id,
      clientName: folder.client_name,
      fileRef: folder.file_ref ?? "",
      internalNote: folder.internal_note ?? "",
      createdAt: asIso(folder.created_at),
      updatedAt: asIso(folder.updated_at),
      steckbrief: {
        folderId: steck.folder_id,
        passt: steck.passt,
        passtNicht: steck.passt_nicht,
        offeneFragen: steck.offene_fragen,
        rueckmeldungen: steck.rueckmeldungen,
        updatedAt: asIso(steck.updated_at),
      },
      runs,
    };
  });

export const getRun = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((runId: string) => runId)
  .handler(async ({ context, data: runId }): Promise<RunDetail | null> => {
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      folder_id: string;
      run_number: number;
      label: string;
      status: string;
      answers: KlaromatAnswers | string;
      matches: MatchSnapshot[] | string;
      created_at: string;
      client_name: string;
      file_ref: string;
      document_id: string | null;
    }>`
      select
        r.id,
        r.folder_id,
        r.run_number,
        coalesce(r.label, '') as label,
        coalesce(r.status, 'fertig') as status,
        r.answers,
        r.matches,
        r.created_at,
        f.client_name,
        coalesce(f.file_ref, '') as file_ref,
        (select d.id from result_documents d where d.run_id = r.id limit 1) as document_id
      from runs r
      join case_folders f on f.id = r.folder_id
      where r.id = ${runId} and r.user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row) return null;
    return {
      id: row.id,
      folderId: row.folder_id,
      runNumber: row.run_number,
      label: row.label ?? "",
      status: parseStatus(row.status),
      answers: normalizeAnswers({ ...emptyAnswers(), ...parseJson(row.answers) }),
      matches: parseJson(row.matches ?? []),
      createdAt: asIso(row.created_at),
      documentId: row.document_id,
      folder: {
        id: row.folder_id,
        clientName: row.client_name,
        fileRef: row.file_ref ?? "",
      },
    };
  });

export const startNewPerson = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { clientName: string; fileRef?: string; internalNote?: string }) => input)
  .handler(async ({ context, data }) => {
    const clientName = requireName(data.clientName);
    const sql = await getSql();
    const now = new Date().toISOString();
    const folderId = crypto.randomUUID();
    const runId = crypto.randomUUID();
    const seed = seedFromName(clientName);
    const answers = { ...emptyAnswers(), clientName };

    await sql.query(
      `insert into case_folders (id, user_id, client_name, file_ref, internal_note, created_at, updated_at)
       values ($1,$2,$3,$4,$5,$6,$6)`,
      [folderId, context.userId, clientName, data.fileRef?.trim() ?? "", data.internalNote?.trim() ?? "", now],
    );
    await sql.query(
      `insert into personal_steckbriefe (
        folder_id, user_id, passt, passt_nicht, offene_fragen, rueckmeldungen, updated_at
      ) values ($1,$2,$3,$4,$5,$6,$7)`,
      [folderId, context.userId, seed.passt, seed.passtNicht, seed.offeneFragen, seed.rueckmeldungen, now],
    );
    await sql.query(
      `insert into lohlotse_threads (id, folder_id, user_id, created_at) values ($1,$2,$3,$4)`,
      [crypto.randomUUID(), folderId, context.userId, now],
    );
    await seedAntragswegForFolder(sql, folderId, context.userId, now);
    await sql.query(
      `insert into runs (id, folder_id, user_id, run_number, answers, matches, created_at, label, status)
       values ($1,$2,$3,1,$4::jsonb,'[]'::jsonb,$5,'','entwurf')`,
      [runId, folderId, context.userId, JSON.stringify(answers), now],
    );
    return { folderId, runId, runNumber: 1 };
  });

export const startExistingPerson = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; label?: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
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
    const now = new Date().toISOString();
    const answers = { ...emptyAnswers(), clientName: folder.client_name };
    await sql.query(
      `insert into runs (id, folder_id, user_id, run_number, answers, matches, created_at, label, status)
       values ($1,$2,$3,$4,$5::jsonb,'[]'::jsonb,$6,$7,'entwurf')`,
      [runId, data.folderId, context.userId, runNumber, JSON.stringify(answers), now, data.label?.trim() ?? ""],
    );
    await sql.query(
      `update case_folders set updated_at = $1 where id = $2 and user_id = $3`,
      [now, data.folderId, context.userId],
    );
    return { folderId: data.folderId, runId, runNumber };
  });

export const saveDraft = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { runId: string; answers: KlaromatAnswers }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{ id: string; folder_id: string; status: string; client_name: string }>`
      select r.id, r.folder_id, coalesce(r.status, 'fertig') as status, f.client_name
      from runs r
      join case_folders f on f.id = r.folder_id
      where r.id = ${data.runId} and r.user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row) throw new Error("Lauf nicht gefunden.");
    if (parseStatus(row.status) !== "entwurf") {
      throw new Error("Nur Entwürfe können fortgesetzt werden.");
    }
    const answers = normalizeAnswers({ ...data.answers, clientName: row.client_name });
    await sql.query(
      `update runs set answers = $1::jsonb where id = $2 and user_id = $3`,
      [JSON.stringify(answers), data.runId, context.userId],
    );
    await sql.query(
      `update case_folders set updated_at = now() where id = $1 and user_id = $2`,
      [row.folder_id, context.userId],
    );
    return { ok: true as const };
  });

export const completeRun = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { runId: string; answers: KlaromatAnswers }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      folder_id: string;
      run_number: number;
      status: string;
      client_name: string;
      label: string;
    }>`
      select r.id, r.folder_id, r.run_number, coalesce(r.status, 'fertig') as status, f.client_name,
        coalesce(r.label, '') as label
      from runs r
      join case_folders f on f.id = r.folder_id
      where r.id = ${data.runId} and r.user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row) throw new Error("Lauf nicht gefunden.");
    if (parseStatus(row.status) !== "entwurf") {
      throw new Error("Dieser Durchlauf ist bereits abgeschlossen.");
    }

    const answers = normalizeAnswers({ ...data.answers, clientName: row.client_name });
    if (!["sucht", "psychosomatik", "dual"].includes(answers.indication)) {
      throw new Error("Unbekannter Indikationsbereich.");
    }

    const clinics = await loadClinics();
    const matches = rankClinics(clinics, answers);
    const now = new Date().toISOString();

    await sql.query(
      `update runs set answers = $1::jsonb, matches = $2::jsonb
       where id = $3 and user_id = $4`,
      [JSON.stringify(answers), JSON.stringify(matches), data.runId, context.userId],
    );

    if (row.run_number === 1) {
      const prefill = prefillSteckbrief(answers);
      await sql.query(
        `update personal_steckbriefe
         set passt = $1, passt_nicht = $2, offene_fragen = $3, rueckmeldungen = $4, updated_at = $5
         where folder_id = $6 and user_id = $7`,
        [
          prefill.passt,
          prefill.passtNicht,
          prefill.offeneFragen,
          prefill.rueckmeldungen,
          now,
          row.folder_id,
          context.userId,
        ],
      );
    }

    await sql.query(
      `update case_folders set updated_at = $1 where id = $2 and user_id = $3`,
      [now, row.folder_id, context.userId],
    );

    return {
      folderId: row.folder_id,
      runId: data.runId,
      runNumber: row.run_number,
      matchCount: matches.length,
    };
  });

