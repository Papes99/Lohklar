import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import {
  buildResultDocument,
  ensureDocumentBody,
  isDocumentBody,
  type DocumentBody,
  type DocumentVersionMeta,
} from "@/lib/domain/document";
import { emptyAnswers, rankClinics } from "@/lib/domain/matching";
import {
  indicationLabel,
  type KlaromatAnswers,
  type MatchSnapshot,
  type RunStatus,
} from "@/lib/domain/types";
import { loadClinics } from "./clinics";
import { insertUsageEvent } from "./usage";

export type FolderSummary = {
  id: string;
  clientName: string;
  fileRef: string;
  internalNote: string;
  createdAt: string;
  updatedAt: string;
  runCount: number;
  lastIndication: string | null;
  lastLabel: string;
  lastStatus: RunStatus | null;
  lastRunAt: string | null;
  topClinicName: string | null;
};

export type PersonalSteckbrief = {
  folderId: string;
  passt: string;
  passtNicht: string;
  offeneFragen: string;
  rueckmeldungen: string;
  updatedAt: string;
};

export type ResultDocument = {
  id: string;
  runId: string;
  folderId: string;
  title: string;
  notes: string;
  selectedClinicIds: string[];
  body: DocumentBody;
  version: number;
  updatedAt: string;
  versions: DocumentVersionMeta[];
};

export type RunRecord = {
  id: string;
  folderId: string;
  runNumber: number;
  label: string;
  status: RunStatus;
  answers: KlaromatAnswers;
  matches: MatchSnapshot[];
  createdAt: string;
  document: ResultDocument | null;
};

export type FolderDetail = {
  id: string;
  clientName: string;
  fileRef: string;
  internalNote: string;
  createdAt: string;
  updatedAt: string;
  steckbrief: PersonalSteckbrief;
  runs: RunRecord[];
};

export type RunDetail = {
  id: string;
  folderId: string;
  runNumber: number;
  label: string;
  status: RunStatus;
  answers: KlaromatAnswers;
  matches: MatchSnapshot[];
  createdAt: string;
  documentId: string | null;
  folder: { id: string; clientName: string; fileRef: string };
};

function asIso(value: string | Date): string {
  if (typeof value === "string") return value;
  return value.toISOString();
}

function parseJson<T>(value: T | string): T {
  if (typeof value === "string") return JSON.parse(value) as T;
  return value;
}

function parseStatus(value: string | null | undefined): RunStatus {
  if (value === "entwurf" || value === "exportiert" || value === "fertig") return value;
  return "fertig";
}

function mapDocument(
  doc: {
    id: string;
    run_id: string;
    folder_id: string;
    title: string;
    notes: string;
    selected_clinic_ids: string[] | string;
    body: unknown;
    version: number | string | null;
    updated_at: string;
  },
  run: { answers: KlaromatAnswers; matches: MatchSnapshot[] },
  clinics: Awaited<ReturnType<typeof loadClinics>>,
  versions: DocumentVersionMeta[],
): ResultDocument {
  const body = ensureDocumentBody(parseJson(doc.body), {
    clinics,
    answers: run.answers,
    matches: run.matches,
  });
  return {
    id: doc.id,
    runId: doc.run_id,
    folderId: doc.folder_id,
    title: doc.title,
    notes: doc.notes,
    selectedClinicIds: body.houses.map((house) => house.clinicId),
    body,
    version: Number(doc.version ?? 1),
    updatedAt: asIso(doc.updated_at),
    versions,
  };
}

async function insertResultDocument(
  sql: Awaited<ReturnType<typeof getSql>>,
  args: {
    runId: string;
    folderId: string;
    userId: string;
    clientName: string;
    runNumber: number;
    label: string;
    answers: KlaromatAnswers;
    matches: MatchSnapshot[];
    now: string;
  },
) {
  const clinics = await loadClinics();
  const body = buildResultDocument({
    clinics,
    answers: args.answers,
    matches: args.matches,
    generatedAt: args.now,
  });
  const title = `Ergebnisdokument · ${args.clientName} · ${args.label.trim() || `Lauf ${args.runNumber}`}`;
  const id = crypto.randomUUID();
  const selected = body.houses.map((house) => house.clinicId);
  await sql.query(
    `insert into result_documents (
      id, run_id, folder_id, user_id, title, notes, selected_clinic_ids, updated_at, body, version
    ) values ($1,$2,$3,$4,$5,$6,$7::text[],$8,$9::jsonb,1)`,
    [
      id,
      args.runId,
      args.folderId,
      args.userId,
      title,
      body.needsText,
      `{${selected.join(",")}}`,
      args.now,
      JSON.stringify(body),
    ],
  );
  await sql.query(
    `insert into result_document_versions (
      id, document_id, folder_id, user_id, version, body, created_at
    ) values ($1,$2,$3,$4,1,$5::jsonb,$6)`,
    [crypto.randomUUID(), id, args.folderId, args.userId, JSON.stringify(body), args.now],
  );
}

function requireName(raw: string): string {
  const clientName = raw.trim();
  if (clientName.length < 2) {
    throw new Error("Bitte einen Namen vergeben. Der Name gehört zum Ordner.");
  }
  return clientName;
}


function seedFromName(name: string): Omit<PersonalSteckbrief, "folderId" | "updatedAt"> {
  return {
    passt: `Samen für ${name}. Wird mit Durchlauf 1 ergänzt.`,
    passtNicht: "",
    offeneFragen: "",
    rueckmeldungen: "",
  };
}

function prefillSteckbrief(answers: KlaromatAnswers): Omit<
  PersonalSteckbrief,
  "folderId" | "updatedAt"
> {
  const extras = answers.extras.length
    ? answers.extras.join(", ")
    : "keine weiteren Filter";
  const region = answers.states.length
    ? answers.states.join(", ")
    : "bundesweit offen";
  return {
    passt: `Arbeitsnotiz aus Lauf 1: ${indicationLabel(answers.indication)}. Region ${region}. Setting ${answers.genderSetting}, ${answers.setting}. Weitere Kriterien: ${extras}.`,
    passtNicht:
      "Noch offen — bitte nach Rücksprache mit der Klient:in ergänzen, was nicht in Frage kommt.",
    offeneFragen: answers.notes.trim()
      ? answers.notes.trim()
      : "Kostenträger, Mobilität, Mitnahme von Medikation, Besuchsmöglichkeiten.",
    rueckmeldungen:
      "Noch keine Rückmeldung der Klient:in dokumentiert. Lohklar stellt keine Diagnose und trifft keine Therapieentscheidung.",
  };
}

async function clinicNameMap() {
  const clinics = await loadClinics();
  return new Map(clinics.map((clinic) => [clinic.id, clinic.name]));
}

function topClinicName(
  matches: MatchSnapshot[] | string | null | undefined,
  names: Map<string, string>,
): string | null {
  if (!matches) return null;
  const list = parseJson<MatchSnapshot[]>(matches);
  const id = list[0]?.clinicId;
  return id ? (names.get(id) ?? null) : null;
}

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
        answers: parseJson(row.answers),
        matches: parseJson(row.matches),
        createdAt: asIso(row.created_at),
        document: doc
          ? mapDocument(
              doc,
              { answers: parseJson(row.answers), matches: parseJson(row.matches) },
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
      answers: parseJson(row.answers),
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
    const answers = { ...data.answers, clientName: row.client_name };
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

    const answers = { ...data.answers, clientName: row.client_name };
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

    const answers = parseJson(row.answers);
    const allMatches = parseJson<MatchSnapshot[]>(row.matches ?? []);
    const selected = data.clinicIds?.length
      ? allMatches.filter((item) => data.clinicIds!.includes(item.clinicId))
      : allMatches;
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
    const matches = rankClinics(clinics, data.answers);

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
      const answers = { ...data.answers, clientName: folder.client_name };
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
    const answers = { ...data.answers, clientName };
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
