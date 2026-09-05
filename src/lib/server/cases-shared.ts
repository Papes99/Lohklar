import { getSql } from "@/lib/db";
import {
  buildResultDocument,
  ensureDocumentBody,
  isDocumentBody,
  type DocumentBody,
  type DocumentVersionMeta,
} from "@/lib/domain/document";
import { hydrateMatch, isBlocked, normalizeAnswers } from "@/lib/domain/matching";
import {
  indicationLabel,
  type KlaromatAnswers,
  type MatchSnapshot,
  type RunStatus,
} from "@/lib/domain/types";
import { loadClinics } from "./clinics";

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

export function asIso(value: string | Date): string {
  if (typeof value === "string") return value;
  return value.toISOString();
}

export function parseJson<T>(value: T | string): T {
  if (typeof value === "string") return JSON.parse(value) as T;
  return value;
}

export function matchesInDocumentOrder(all: MatchSnapshot[], clinicIds?: string[]): MatchSnapshot[] {
  if (clinicIds?.length) {
    const map = new Map(all.map((item) => [item.clinicId, item]));
    return clinicIds
      .map((id) => map.get(id))
      .filter((item): item is MatchSnapshot => Boolean(item));
  }
  return all.filter((item) => !isBlocked(hydrateMatch(item))).slice(0, 10);
}

export function parseStatus(value: string | null | undefined): RunStatus {
  if (value === "entwurf" || value === "exportiert" || value === "fertig") return value;
  return "fertig";
}

export function mapDocument(
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

export async function insertResultDocument(
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

export function requireName(raw: string): string {
  const clientName = raw.trim();
  if (clientName.length < 2) {
    throw new Error("Bitte einen Namen vergeben. Der Name gehört zum Ordner.");
  }
  return clientName;
}


export function seedFromName(name: string): Omit<PersonalSteckbrief, "folderId" | "updatedAt"> {
  return {
    passt: `Samen für ${name}. Wird mit Durchlauf 1 ergänzt.`,
    passtNicht: "",
    offeneFragen: "",
    rueckmeldungen: "",
  };
}

export function prefillSteckbrief(raw: KlaromatAnswers): Omit<
  PersonalSteckbrief,
  "folderId" | "updatedAt"
> {
  const answers = normalizeAnswers(raw);
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

export async function clinicNameMap() {
  const clinics = await loadClinics();
  return new Map(clinics.map((clinic) => [clinic.id, clinic.name]));
}

export function topClinicName(
  matches: MatchSnapshot[] | string | null | undefined,
  names: Map<string, string>,
): string | null {
  if (!matches) return null;
  const list = parseJson<MatchSnapshot[]>(matches);
  const id = list[0]?.clinicId;
  return id ? (names.get(id) ?? null) : null;
}
