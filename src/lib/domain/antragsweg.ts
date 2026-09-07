export const DOC_STATUSES = [
  "fehlt",
  "angefordert",
  "vorhanden",
  "nicht_noetig",
] as const;

export type DocStatus = (typeof DOC_STATUSES)[number];

export const DOC_STATUS_LABELS: Record<DocStatus, string> = {
  fehlt: "Fehlt",
  angefordert: "Angefordert",
  vorhanden: "Vorhanden",
  nicht_noetig: "Nicht nötig",
};

export const DEADLINE_KINDS = [
  "antrag_eingereicht",
  "entscheidung_erwartet",
  "entscheidung_eingegangen",
  "widerspruchsfrist",
] as const;

export type DeadlineKind = (typeof DEADLINE_KINDS)[number];

export const DEADLINE_LABELS: Record<DeadlineKind, string> = {
  antrag_eingereicht: "Antrag eingereicht",
  entscheidung_erwartet: "Entscheidung erwartet",
  entscheidung_eingegangen: "Entscheidung eingegangen",
  widerspruchsfrist: "Widerspruchsfrist",
};

export const KOSTENTRAEGER_PFADE = [
  "offen",
  "drv",
  "krankenkasse",
  "bg",
  "sonstige",
] as const;

export type KostentraegerPfad = (typeof KOSTENTRAEGER_PFADE)[number];

export const KOSTENTRAEGER_LABELS: Record<KostentraegerPfad, string> = {
  offen: "Noch offen",
  drv: "Deutsche Rentenversicherung",
  krankenkasse: "Krankenkasse",
  bg: "Berufsgenossenschaft",
  sonstige: "Sonstige / gemischt",
};

export const SEED_DOCUMENTS: { key: string; label: string }[] = [
  { key: "antrag_formular", label: "Antragsformular (DRV / KK / BG)" },
  { key: "aerztliche_unterlage", label: "Ärztliche Unterlage" },
  { key: "sozialbericht", label: "Sozialbericht / Stellungnahme" },
  { key: "kostenzusage", label: "Kostenzusage / Bewilligung" },
  { key: "einwilligungen", label: "Einwilligungen / Schweigepflichtentbindung" },
  {
    key: "ausweise_versicherungsnachweis",
    label: "Ausweis / Versicherungsnachweis",
  },
];

export const NOTE_MAX = 280;
export const LABEL_MIN = 2;
export const LABEL_MAX = 80;

export type AntragDocumentItem = {
  id: string;
  key: string | null;
  label: string;
  status: DocStatus;
  note: string;
  sortOrder: number;
};

export type AntragDeadline = {
  kind: DeadlineKind;
  date: string | null;
  note: string;
};

export type Antragsweg = {
  folderId: string;
  kostentraegerPfad: KostentraegerPfad;
  documents: AntragDocumentItem[];
  deadlines: AntragDeadline[];
  updatedAt: string;
};

export type AntragswegSummary = {
  missing: number;
  requested: number;
  ready: number;
  overdue: number;
};

export function isDocStatus(value: string): value is DocStatus {
  return (DOC_STATUSES as readonly string[]).includes(value);
}

export function isDeadlineKind(value: string): value is DeadlineKind {
  return (DEADLINE_KINDS as readonly string[]).includes(value);
}

export function isKostentraegerPfad(value: string): value is KostentraegerPfad {
  return (KOSTENTRAEGER_PFADE as readonly string[]).includes(value);
}

export function clampNote(raw: string): string {
  return raw.trim().slice(0, NOTE_MAX);
}

export function normalizeLabel(raw: string): string {
  return raw.trim().slice(0, LABEL_MAX);
}

export function assertLabel(raw: string): string {
  const label = normalizeLabel(raw);
  if (label.length < LABEL_MIN) {
    throw new Error("Bitte eine Bezeichnung mit mindestens zwei Zeichen vergeben.");
  }
  return label;
}

export function seedAntragDocuments(ids: string[]): AntragDocumentItem[] {
  if (ids.length < SEED_DOCUMENTS.length) {
    throw new Error("Seed benötigt für jede Standard-Unterlage eine ID.");
  }
  return SEED_DOCUMENTS.map((item, index) => ({
    id: ids[index]!,
    key: item.key,
    label: item.label,
    status: "fehlt" as const,
    note: "",
    sortOrder: index,
  }));
}

export function emptyDeadlines(): AntragDeadline[] {
  return DEADLINE_KINDS.map((kind) => ({ kind, date: null, note: "" }));
}

/** YYYY-MM-DD or null; rejects other shapes. */
export function normalizeDate(raw: string | null | undefined): string | null {
  if (raw == null) return null;
  const value = raw.trim();
  if (!value) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error("Datum bitte als JJJJ-MM-TT angeben.");
  }
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d || m < 1 || m > 12 || d < 1 || d > 31) {
    throw new Error("Ungültiges Datum.");
  }
  return value;
}

export function summarizeAntragsweg(
  antrag: Pick<Antragsweg, "documents" | "deadlines">,
  todayYmd: string,
): AntragswegSummary {
  let missing = 0;
  let requested = 0;
  let ready = 0;
  for (const doc of antrag.documents) {
    if (doc.status === "fehlt") missing += 1;
    else if (doc.status === "angefordert") requested += 1;
    else if (doc.status === "vorhanden") ready += 1;
  }
  let overdue = 0;
  for (const deadline of antrag.deadlines) {
    if (
      deadline.kind === "widerspruchsfrist" &&
      deadline.date &&
      deadline.date < todayYmd
    ) {
      overdue += 1;
    }
    if (
      deadline.kind === "entscheidung_erwartet" &&
      deadline.date &&
      deadline.date < todayYmd
    ) {
      overdue += 1;
    }
  }
  return { missing, requested, ready, overdue };
}
