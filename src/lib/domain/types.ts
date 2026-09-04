export const APP_NAME = "Lohklar";
export const FOUNDED_BY = "founded by Kerlwerk";

export type Indication = "sucht" | "psychosomatik" | "dual";
export type GenderSetting = "gemischt" | "frauen" | "maenner";
export type SettingKind = "stationaer" | "tagesklinik" | "beides" | "adaption";
export type ChipStatus =
  | "vorhanden"
  | "eingeschraenkt"
  | "nicht_angeboten"
  | "unbekannt";
export type PhotoSource = "klinik" | "oeffentlich" | "fehlt";
export type PhotoSlot =
  | "aussen"
  | "zimmer_bad"
  | "umgebung"
  | "speiseraum"
  | "besonderheit";

export const PHOTO_SLOTS: {
  id: PhotoSlot;
  label: string;
  required: boolean;
  max: number;
}[] = [
  { id: "aussen", label: "Außenansicht", required: true, max: 1 },
  { id: "zimmer_bad", label: "Zimmer / Bad", required: true, max: 1 },
  { id: "umgebung", label: "Umgebung / Lage", required: true, max: 1 },
  { id: "speiseraum", label: "Speiseraum / Verpflegung", required: false, max: 1 },
  { id: "besonderheit", label: "Besonderheit", required: false, max: 3 },
];

export const INDICATIONS: {
  id: Indication;
  label: string;
  hint: string;
}[] = [
  {
    id: "sucht",
    label: "Sucht / Entwöhnung",
    hint: "Alkohol, Drogen, Medikamente, Glücksspiel und verwandte Bedarfe.",
  },
  {
    id: "psychosomatik",
    label: "Psychosomatik",
    hint: "AHB und Heilverfahren bei psychosomatischem Bedarf.",
  },
  {
    id: "dual",
    label: "Dualdiagnosen",
    hint: "Sucht und psychische Erkrankung im kombinierten Setting.",
  },
];

export const STATES: { code: string; name: string }[] = [
  { code: "BW", name: "Baden-Württemberg" },
  { code: "BY", name: "Bayern" },
  { code: "BE", name: "Berlin" },
  { code: "BB", name: "Brandenburg" },
  { code: "HB", name: "Bremen" },
  { code: "HH", name: "Hamburg" },
  { code: "HE", name: "Hessen" },
  { code: "MV", name: "Mecklenburg-Vorpommern" },
  { code: "NI", name: "Niedersachsen" },
  { code: "NW", name: "Nordrhein-Westfalen" },
  { code: "RP", name: "Rheinland-Pfalz" },
  { code: "SL", name: "Saarland" },
  { code: "SN", name: "Sachsen" },
  { code: "ST", name: "Sachsen-Anhalt" },
  { code: "SH", name: "Schleswig-Holstein" },
  { code: "TH", name: "Thüringen" },
];

export const BEDARFE: { id: string; label: string; areas: Indication[] }[] = [
  { id: "alkohol", label: "Alkohol", areas: ["sucht", "dual"] },
  { id: "drogen", label: "Illegale Drogen", areas: ["sucht", "dual"] },
  { id: "medikamente", label: "Medikamente", areas: ["sucht", "dual"] },
  { id: "gluecksspiel", label: "Glücksspiel / Medien", areas: ["sucht", "dual"] },
  { id: "substitution", label: "Substitution / Umstellung", areas: ["sucht", "dual"] },
  { id: "depression", label: "Depressive Symptomatik", areas: ["psychosomatik", "dual"] },
  { id: "angst", label: "Angst / Panik", areas: ["psychosomatik", "dual"] },
  { id: "trauma", label: "Trauma-Folgen", areas: ["psychosomatik", "dual"] },
  { id: "erschopfung", label: "Erschöpfung", areas: ["psychosomatik"] },
  { id: "schmerz", label: "Chronischer Schmerz", areas: ["psychosomatik"] },
  { id: "ess", label: "Essverhalten", areas: ["psychosomatik"] },
];

export const EXTRAS: { id: string; label: string }[] = [
  { id: "angehoerige", label: "Angehörigenarbeit" },
  { id: "barrierefrei", label: "Barrierefreiheit" },
  { id: "trauma", label: "Traumafokus" },
  { id: "gluecksspiel", label: "Glücksspielkompetenz" },
  { id: "substitution", label: "Substitutionsbegleitung" },
  { id: "kinder", label: "Kinderbetreuung" },
  { id: "junge", label: "Junge Erwachsene" },
];

export const GENDER_FILTERS: { id: "egal" | GenderSetting; label: string }[] = [
  { id: "egal", label: "Keine Vorgabe" },
  { id: "gemischt", label: "Gemischt" },
  { id: "frauen", label: "Frauenspezifisch" },
  { id: "maenner", label: "Männerspezifisch" },
];

export const SETTING_FILTERS: {
  id: "egal" | "stationaer" | "tagesklinik";
  label: string;
}[] = [
  { id: "egal", label: "Keine Vorgabe" },
  { id: "stationaer", label: "Stationär" },
  { id: "tagesklinik", label: "Tagesklinik" },
];

export const DURATION_FILTERS: {
  id: "egal" | "kurz" | "mittel" | "lang";
  label: string;
}[] = [
  { id: "egal", label: "Keine Vorgabe" },
  { id: "kurz", label: "Eher kurz (bis ca. 6 Wochen)" },
  { id: "mittel", label: "Mittlere Dauer" },
  { id: "lang", label: "Länger (ab ca. 10 Wochen)" },
];

export type RunStatus = "entwurf" | "fertig" | "exportiert";

export const RUN_STATUS_LABEL: Record<RunStatus, string> = {
  entwurf: "Entwurf",
  fertig: "Fertig",
  exportiert: "Exportiert",
};

export type KlaromatAnswers = {
  clientName: string;
  indication: Indication;
  bedarfe: string[];
  states: string[];
  genderSetting: "egal" | GenderSetting;
  setting: "egal" | "stationaer" | "tagesklinik";
  ahb: boolean;
  durationPref: "egal" | "kurz" | "mittel" | "lang";
  extras: string[];
  notes: string;
};

export type CriterionStatus = "match" | "partial" | "miss";

export type MatchReason = {
  criterion: string;
  status: CriterionStatus;
  detail: string;
};

export type WaitUncertainty = "schmal" | "mittel" | "breit";

export const WAIT_UNCERTAINTY_LABEL: Record<WaitUncertainty, string> = {
  schmal: "schmal",
  mittel: "mittel",
  breit: "breit",
};

export type WaitFactor = {
  label: string;
  effect: string;
  nr?: string;
  weight?: string;
  formula?: string;
};

export type WaitEstimate = {
  clinicId: string;
  label: string;
  rangeLabel: string;
  midDays: number;
  minDays: number;
  maxDays: number;
  weeksMin: number;
  weeksMax: number;
  asOf: string;
  asOfLabel: string;
  uncertainty: WaitUncertainty;
  disclaimer: string;
  factors: WaitFactor[];
  formula: string;
  formulaFilled: string;
  sources: string[];
  uncertain: string[];
  notMeaning: string[];
};

export type MatchSnapshot = {
  clinicId: string;
  score: number;
  reasons: MatchReason[];
  wait: WaitEstimate;
};

export type ClinicPhoto = {
  slot: PhotoSlot;
  caption: string;
  alt: string;
  imagePath: string | null;
  source: PhotoSource;
  asOf: string;
};

export type StatusChip = {
  label: string;
  status: ChipStatus;
};

export type SteckBlock = {
  bullets: string[];
  chips: StatusChip[];
};

export type SteckbriefKey =
  | "indikation"
  | "kontraindikation"
  | "settingDauer"
  | "wohnenAlltag"
  | "kinderFamilie"
  | "therapie"
  | "medizin"
  | "sozialdienst"
  | "kostentraeger"
  | "besonderheiten";

export type OfficialSteckbrief = Record<SteckbriefKey, SteckBlock>;

export const STECKBRIEF_BLOCKS: {
  key: SteckbriefKey;
  nr: string;
  title: string;
  lead: string;
}[] = [
  {
    key: "indikation",
    nr: "01",
    title: "Indikation",
    lead: "Für wen das Haus vorrangig arbeitet.",
  },
  {
    key: "kontraindikation",
    nr: "02",
    title: "Kontraindikation",
    lead: "Was die Aufnahme ausschließt oder verzögert.",
  },
  {
    key: "settingDauer",
    nr: "03",
    title: "Setting und Dauer",
    lead: "In welcher Form und wie lange behandelt wird.",
  },
  {
    key: "wohnenAlltag",
    nr: "04",
    title: "Wohnen und Alltag",
    lead: "Zimmer, Regeln und Tagesstruktur.",
  },
  {
    key: "kinderFamilie",
    nr: "05",
    title: "Kinder, Familie, Geschlecht",
    lead: "Für wen das Haus familiär und geschlechtsspezifisch ausgelegt ist.",
  },
  {
    key: "therapie",
    nr: "06",
    title: "Therapie und Konzept",
    lead: "Welche Verfahren das Haus vorhält. Lohklar wählt keine Therapie.",
  },
  {
    key: "medizin",
    nr: "07",
    title: "Medizin, Pflege, Mitbehandlung",
    lead: "Ärztliche Besetzung, Medikation und pflegerische Grenzen.",
  },
  {
    key: "sozialdienst",
    nr: "08",
    title: "Sozialdienst und Nachsorge",
    lead: "Was der Klinik-Sozialdienst konkret tut.",
  },
  {
    key: "kostentraeger",
    nr: "09",
    title: "Kostenträger und Zugang",
    lead: "Wer zahlt und welche Voraussetzungen belegt sind.",
  },
  {
    key: "besonderheiten",
    nr: "10",
    title: "Besonderheiten",
    lead: "Nur belegte Alleinsteller, ohne Superlative.",
  },
];

export type Zulassung = {
  drv: ChipStatus;
  gkv: ChipStatus;
  ahb: ChipStatus;
  beihilfe: ChipStatus;
};

export type Datenstand = {
  geprueft: string;
  quellen: string;
};

export type Clinic = {
  id: string;
  name: string;
  shortName: string;
  city: string;
  stateCode: string;
  stateName: string;
  traeger: string;
  traegerArt: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  indicationAreas: Indication[];
  substances: string[];
  therapyForms: string[];
  durationWeeksMin: number;
  durationWeeksMax: number;
  durationKurzWeeks: number | null;
  aufnahmeModus: string;
  genderSetting: GenderSetting;
  setting: SettingKind;
  ahb: boolean;
  heilverfahren: boolean;
  barrierefrei: boolean;
  angehoerigenarbeit: boolean;
  kinderbetreuung: boolean;
  substitution: boolean;
  gluecksspiel: boolean;
  trauma: boolean;
  jungeErwachsene: boolean;
  placesEstimate: number;
  occupancyIndex: number;
  waitBaseDays: number;
  waitVarianceDays: number;
  sortOrder: number;
  zulassung: Zulassung;
  datenstand: Datenstand;
  steckbrief: OfficialSteckbrief;
  photos: ClinicPhoto[];
};

export type ClinicWithWait = Clinic & { wait: WaitEstimate };

export const WAIT_DISCLAIMER =
  "Wartezeiten = Schätzung. Keine Garantie, keine Aufnahmezusage, keine individuelle Vorfahrt. Keine Live-Warteliste.";

export const CHIP_STATUS_LABEL: Record<ChipStatus, string> = {
  vorhanden: "vorhanden",
  eingeschraenkt: "eingeschränkt",
  nicht_angeboten: "nicht angeboten",
  unbekannt: "unbekannt",
};

export const PHOTO_SOURCE_LABEL: Record<PhotoSource, string> = {
  klinik: "Klinik",
  oeffentlich: "öffentlich",
  fehlt: "fehlt",
};

export function indicationLabel(id: Indication): string {
  return INDICATIONS.find((item) => item.id === id)?.label ?? id;
}

export function stateName(code: string): string {
  return STATES.find((item) => item.code === code)?.name ?? code;
}

export function extraLabel(id: string): string {
  return EXTRAS.find((item) => item.id === id)?.label ?? id;
}

export function bedarfLabel(id: string): string {
  return BEDARFE.find((item) => item.id === id)?.label ?? id;
}

export function genderSettingLabel(value: string): string {
  if (value === "frauen") return "Frauenspezifisch";
  if (value === "maenner") return "Männerspezifisch";
  if (value === "egal") return "Keine Vorgabe";
  return "Gemischt";
}

export function settingKindLabel(value: string): string {
  if (value === "tagesklinik") return "Ganztägig ambulant";
  if (value === "beides") return "Kombi";
  if (value === "adaption") return "Adaption";
  if (value === "egal") return "Keine Vorgabe";
  return "Stationär";
}

export function durationPrefLabel(value: string): string {
  if (value === "kurz") return "Eher kurz";
  if (value === "mittel") return "Mittlere Dauer";
  if (value === "lang") return "Länger";
  return "Keine Vorgabe";
}

export function emptySteckBlock(): SteckBlock {
  return {
    bullets: ["Angabe liegt nicht vor."],
    chips: [{ label: "Angabe", status: "unbekannt" }],
  };
}
