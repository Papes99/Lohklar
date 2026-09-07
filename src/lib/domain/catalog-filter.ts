import { normalizeName, scoreName } from "./folder-search.ts";
import { clinicHasLage, clinicLageTags, lageSearchLabels, type LageKind } from "./lage.ts";
import {
  PHOTO_SLOTS,
  STATES,
  STECKBRIEF_BLOCKS,
  bedarfLabel,
  indicationLabel,
  settingKindLabel,
  type Clinic,
  type GenderSetting,
  type Indication,
  type SteckbriefKey,
} from "./types.ts";

const MISSING = /^angabe liegt nicht vor\.?$/i;

export type CatalogFilter = {
  q: string;
  auftrag: "alle" | Indication;
  alkohol: boolean;
  drogenMedikamente: boolean;
  state: string;
  gender: "egal" | GenderSetting;
  setting: "egal" | "stationaer" | "tagesklinik" | "adaption";
  ahb: boolean;
  substitution: boolean;
  einzelzimmer: boolean;
  kinder: boolean;
  barriere: boolean;
  gluecksspiel: boolean;
  trauma: boolean;
  junge: boolean;
  mpu: boolean;
  klinikStattStrafe: boolean;
  lage: "egal" | LageKind;
  vollstaendig: boolean;
};

export function emptyCatalogFilter(): CatalogFilter {
  return {
    q: "",
    auftrag: "alle",
    alkohol: false,
    drogenMedikamente: false,
    state: "",
    gender: "egal",
    setting: "egal",
    ahb: false,
    substitution: false,
    einzelzimmer: false,
    kinder: false,
    barriere: false,
    gluecksspiel: false,
    trauma: false,
    junge: false,
    mpu: false,
    klinikStattStrafe: false,
    lage: "egal",
    vollstaendig: false,
  };
}

export function catalogFilterActive(filter: CatalogFilter): boolean {
  const empty = emptyCatalogFilter();
  return (Object.keys(empty) as (keyof CatalogFilter)[]).some((key) => filter[key] !== empty[key]);
}

export function chipVorhanden(clinic: Clinic, key: SteckbriefKey, label: string): boolean {
  return clinic.steckbrief[key].chips.some((chip) => chip.label === label && chip.status === "vorhanden");
}

export function isPresentContact(value: string): boolean {
  const text = value.trim();
  return text.length > 0 && !MISSING.test(text);
}

export function hasCoverPhoto(clinic: Pick<Clinic, "photos">): boolean {
  return clinic.photos.some((photo) => photo.slot === "aussen" && Boolean(photo.imagePath));
}

export function hasAllRequiredPhotos(clinic: Pick<Clinic, "photos">): boolean {
  return PHOTO_SLOTS.filter((slot) => slot.required).every((slot) =>
    clinic.photos.some((photo) => photo.slot === slot.id && Boolean(photo.imagePath)),
  );
}

export function roomIsKnown(clinic: Pick<Clinic, "steckbrief">): boolean {
  return clinic.steckbrief.wohnenAlltag.chips.some(
    (chip) =>
      (chip.label === "Einbettzimmer" || chip.label === "Zweibettzimmer") && chip.status !== "unbekannt",
  );
}

export function blocksFilled(clinic: Pick<Clinic, "steckbrief">): boolean {
  return STECKBRIEF_BLOCKS.filter((item) => item.countsForComplete).every(({ key }) => {
    const bullets = clinic.steckbrief[key].bullets.filter(
      (bullet) => bullet.trim().length > 0 && !MISSING.test(bullet.trim()),
    );
    return bullets.length > 0;
  });
}

/** Außenfoto, Telefon, Website, bekannte Zimmerart, Blöcke 01–10 mit Inhalt. Block 14 zählt nicht. */
export function isClinicComplete(clinic: Clinic): boolean {
  return (
    hasCoverPhoto(clinic) &&
    isPresentContact(clinic.phone) &&
    clinic.website.startsWith("https://") &&
    roomIsKnown(clinic) &&
    blocksFilled(clinic)
  );
}

export function clinicGaps(clinic: Clinic): string[] {
  const gaps: string[] = [];
  if (!hasCoverPhoto(clinic)) gaps.push("Außenfoto fehlt");
  if (!clinic.photos.some((photo) => photo.slot === "zimmer_bad" && photo.imagePath)) {
    gaps.push("Zimmerfoto fehlt");
  }
  if (!clinic.photos.some((photo) => photo.slot === "umgebung" && photo.imagePath)) {
    gaps.push("Umgebungsfoto fehlt");
  }
  if (!roomIsKnown(clinic)) gaps.push("Zimmerart unbekannt");
  if (!isPresentContact(clinic.phone)) gaps.push("Telefon fehlt");
  if (!isPresentContact(clinic.email)) gaps.push("E-Mail fehlt");
  if (!blocksFilled(clinic)) gaps.push("Steckbrief-Block leer");
  return gaps;
}

type SearchBucket = "identity" | "land" | "profil" | "text";

type SearchField = {
  text: string;
  bucket: SearchBucket;
};

const BUCKET_BONUS: Record<SearchBucket, number> = {
  identity: 28,
  land: 22,
  profil: 12,
  text: 4,
};

const STATE_ALIASES: Record<string, string[]> = {
  NW: ["NRW"],
  RP: ["RLP"],
  BW: ["BaWü", "Bawue"],
  NI: ["NDS"],
};

function clinicSearchIndex(clinic: Clinic): SearchField[] {
  const rows: SearchField[] = [];
  const add = (bucket: SearchBucket, ...values: string[]) => {
    for (const value of values) {
      const text = value.trim();
      if (!text || MISSING.test(text)) continue;
      rows.push({ text, bucket });
    }
  };

  add("identity", clinic.name, clinic.shortName, clinic.city, clinic.address);
  add("land", clinic.stateName, clinic.stateCode);
  add("land", ...(STATE_ALIASES[clinic.stateCode] ?? []));
  add("profil", clinic.traeger);

  add("profil", settingKindLabel(clinic.setting));
  if (clinic.setting === "adaption") add("profil", "Adaption", "Adaptionseinrichtung");
  if (clinic.setting === "tagesklinik" || clinic.setting === "beides") {
    add("profil", "Tagesklinik", "ganztägig ambulant", "TK");
  }
  if (clinic.setting === "stationaer" || clinic.setting === "beides") {
    add("profil", "Stationär", "vollstationär");
  }

  for (const area of clinic.indicationAreas) {
    add("profil", indicationLabel(area));
    if (area === "sucht") add("profil", "Suchtreha", "Entwöhnung", "Sucht");
    if (area === "dual") add("profil", "Dualdiagnose", "Doppeldiagnose");
    if (area === "psychosomatik") add("profil", "Psychosomatik");
  }

  if (chipVorhanden(clinic, "indikation", "Alkohol")) add("profil", "Alkohol");
  if (chipVorhanden(clinic, "indikation", "Drogen")) add("profil", "Drogen", "Illegale Drogen");
  if (chipVorhanden(clinic, "indikation", "Medikamente")) add("profil", "Medikamente");
  for (const substance of clinic.substances) {
    if (substance === "alkohol" || substance === "drogen" || substance === "medikamente") continue;
    if (substance === "gluecksspiel" && !clinic.gluecksspiel) continue;
    if (substance === "trauma" && !clinic.trauma) continue;
    add("profil", bedarfLabel(substance));
  }

  if (clinic.gluecksspiel) add("profil", "Glücksspiel", "Medien", "Spielsucht");
  if (clinic.trauma) add("profil", "Trauma", "Traumafokus", "PTBS", "Traumafolgen");
  if (clinic.substitution) add("profil", "Substitution", "Methadon");
  if (clinic.kinderbetreuung) add("profil", "Kinder", "Eltern-Kind", "Mutter-Kind");
  if (clinic.jungeErwachsene) add("profil", "Junge Erwachsene", "U27");
  if (clinic.mpu) add("profil", "MPU", "MPU-Vorbereitung", "Führerschein", "Fahreignung");
  if (clinic.klinikStattStrafe) {
    add(
      "profil",
      "Klinik statt Strafe",
      "Therapie statt Strafe",
      "BtMG",
      "§35",
      "§ 35 BtMG",
      "Zurückstellung",
    );
  }
  if (clinic.ahb) add("profil", "AHB", "Anschlussheilbehandlung");
  if (clinic.heilverfahren) add("profil", "Heilverfahren");
  if (clinic.genderSetting === "frauen") add("profil", "Frauen", "frauenspezifisch", "Frauenklinik");
  if (clinic.genderSetting === "maenner") add("profil", "Männer", "männerspezifisch", "Männerhaus");
  if (clinic.barrierefrei) add("profil", "Barrierefrei", "barrierearm");
  if (clinic.angehoerigenarbeit) add("profil", "Angehörigenarbeit", "Angehörige");
  if (chipVorhanden(clinic, "wohnenAlltag", "Einbettzimmer")) {
    add("profil", "Einzelzimmer", "Einbettzimmer", "Einbett");
  }
  for (const tag of clinicLageTags(clinic)) add("profil", ...lageSearchLabels(tag));

  const plz = clinic.address.match(/\b(\d{5})\b/);
  if (plz) add("identity", plz[1]);
  for (const form of clinic.therapyForms) add("profil", form);
  if (clinic.zulassung.drv === "vorhanden") add("profil", "DRV", "Rentenversicherung");
  if (clinic.zulassung.gkv === "vorhanden") add("profil", "GKV", "Krankenkasse");

  const fokus = clinic.steckbrief.indikation.bullets[0];
  if (fokus && !/nicht der Aufnahmeauftrag/i.test(fokus)) add("text", fokus);
  for (const bullet of clinic.steckbrief.besonderheiten.bullets) {
    if (bullet && !MISSING.test(bullet)) add("text", bullet);
  }

  return rows;
}

function scoreClinicField(token: string, field: SearchField): number {
  const q = normalizeName(token);
  const n = normalizeName(field.text);
  if (!q || !n) return 0;
  if (q.length <= 2) {
    return n === q || n.split(" ").includes(q) ? 100 : 0;
  }
  const parts = n.split(" ").filter(Boolean);
  if (field.bucket === "text") {
    if (q.length < 5) return 0;
    if (n === q) return 100;
    if (parts.includes(q)) return 80;
    if (parts.some((part) => part.startsWith(q))) return 50;
    return 0;
  }
  if (field.bucket === "land" || field.bucket === "profil") {
    if (n === q) return 100;
    if (q.length >= 4 && n.includes(q)) return 80;
    if (q.length >= 4 && parts.some((part) => part.startsWith(q) || (part.length >= 4 && q.startsWith(part)))) {
      return 70;
    }
    return 0;
  }
  return scoreName(token, field.text);
}

function bestTokenHit(
  token: string,
  index: SearchField[],
): { raw: number; bonus: number; field: SearchField } | null {
  const rank: Record<SearchBucket, number> = { identity: 4, land: 3, profil: 2, text: 1 };
  let bestRaw = 0;
  let bestBonus = 0;
  let bestField: SearchField | null = null;
  for (const field of index) {
    const raw = scoreClinicField(token, field);
    if (raw <= 0) continue;
    const bonus = BUCKET_BONUS[field.bucket];
    const better =
      !bestField ||
      raw > bestRaw ||
      (raw === bestRaw && bonus > bestBonus) ||
      (raw === bestRaw && bonus === bestBonus && rank[field.bucket] > rank[bestField.bucket]);
    if (better) {
      bestRaw = raw;
      bestBonus = bonus;
      bestField = field;
    }
  }
  return bestField ? { raw: bestRaw, bonus: bestBonus, field: bestField } : null;
}

function hitLabel(field: SearchField): string | null {
  if (field.bucket === "text") return null;
  const text = field.text.trim();
  if (text.length < 2 || text.length > 36) return null;
  return text;
}

/** Katalogfakten, die die Suchwörter treffen — für die Karten-Passung. */
export function clinicSearchHits(query: string, clinic: Clinic): string[] {
  const q = normalizeName(query);
  if (!q) return [];
  const index = clinicSearchIndex(clinic);
  const tokens = q.split(" ").filter((token) => token.length >= 2);
  const seen = new Set<string>();
  const hits: string[] = [];
  for (const token of tokens) {
    const hit = bestTokenHit(token, index);
    if (!hit) continue;
    const label = hitLabel(hit.field);
    if (!label) continue;
    const key = normalizeName(label);
    if (seen.has(key)) continue;
    seen.add(key);
    hits.push(label);
    if (hits.length >= 5) break;
  }
  return hits;
}

function clinicSearchScore(query: string, clinic: Clinic): number {
  const q = normalizeName(query);
  if (!q) return 1;
  const index = clinicSearchIndex(clinic);
  const tokens = q.split(" ").filter((token) => token.length >= 2);
  if (!tokens.length) return 0;

  let phrase = 0;
  for (const field of index) {
    const raw = scoreClinicField(query, field);
    if (raw > 0) phrase = Math.max(phrase, raw + BUCKET_BONUS[field.bucket]);
  }

  if (tokens.length <= 1) return phrase;

  const found: number[] = [];
  for (const token of tokens) {
    const hit = bestTokenHit(token, index);
    if (hit) found.push(hit.raw + hit.bonus);
  }
  const minHits = tokens.length <= 2 ? tokens.length : tokens.length - 1;
  if (found.length < minHits) return 0;
  const coverage = found.reduce((sum, value) => sum + value, 0);
  const ratio = found.length / tokens.length;
  return Math.round(coverage * ratio + phrase / 2);
}

export function filterClinics<T extends Clinic>(clinics: T[], filter: CatalogFilter): T[] {
  const scored = clinics.map((clinic) => ({
    clinic,
    score: filter.q.trim() ? clinicSearchScore(filter.q, clinic) : 1,
  }));
  return scored
    .filter(({ clinic, score }) => {
      if (score <= 0) return false;
      if (filter.auftrag !== "alle" && !clinic.indicationAreas.includes(filter.auftrag)) return false;
      if (filter.alkohol && !chipVorhanden(clinic, "indikation", "Alkohol")) return false;
      if (
        filter.drogenMedikamente &&
        !chipVorhanden(clinic, "indikation", "Drogen") &&
        !chipVorhanden(clinic, "indikation", "Medikamente")
      ) {
        return false;
      }
      if (filter.state && clinic.stateCode !== filter.state) return false;
      if (filter.gender !== "egal" && clinic.genderSetting !== filter.gender) return false;
      if (filter.setting === "stationaer" && clinic.setting !== "stationaer" && clinic.setting !== "beides") {
        return false;
      }
      if (filter.setting === "tagesklinik" && clinic.setting !== "tagesklinik" && clinic.setting !== "beides") {
        return false;
      }
      if (filter.setting === "adaption" && clinic.setting !== "adaption") {
        return false;
      }
      if (filter.ahb && !clinic.ahb) return false;
      if (filter.substitution && !clinic.substitution) return false;
      if (filter.einzelzimmer && !chipVorhanden(clinic, "wohnenAlltag", "Einbettzimmer")) return false;
      if (filter.kinder && !clinic.kinderbetreuung) return false;
      if (filter.barriere && !clinic.barrierefrei) return false;
      if (filter.gluecksspiel && !clinic.gluecksspiel) return false;
      if (filter.trauma && !clinic.trauma) return false;
      if (filter.junge && !clinic.jungeErwachsene) return false;
      if (filter.mpu && !clinic.mpu) return false;
      if (filter.klinikStattStrafe && !clinic.klinikStattStrafe) return false;
      if (filter.lage !== "egal" && !clinicHasLage(clinic, filter.lage)) return false;
      if (filter.vollstaendig && !isClinicComplete(clinic)) return false;
      return true;
    })
    .sort((a, b) => b.score - a.score || a.clinic.sortOrder - b.clinic.sortOrder)
    .map((row) => row.clinic);
}

export type CatalogEdition = {
  ymd: string;
  kind: "aufnahme" | "pruefung";
  houses: number;
  note: string;
};

/** Editorial catalog history. No invented CMS edits — only documented catalog stands. */
export const CATALOG_EDITIONS: CatalogEdition[] = [
  {
    ymd: "2026-09-01",
    kind: "aufnahme",
    houses: 50,
    note: "Katalog mit 50 belegten Häusern eröffnet.",
  },
  {
    ymd: "2026-09-01",
    kind: "pruefung",
    houses: 50,
    note: "Erstprüfung der öffentlichen Steckbriefe.",
  },
  {
    ymd: "2026-09-05",
    kind: "aufnahme",
    houses: 200,
    note: "Katalog um 200 Reha-Häuser erweitert.",
  },
  {
    ymd: "2026-09-05",
    kind: "pruefung",
    houses: 200,
    note: "Erstprüfung der neu aufgenommenen Steckbriefe.",
  },
  {
    ymd: "2026-09-05",
    kind: "aufnahme",
    houses: 77,
    note: "Katalog um weitere belegte Reha-Häuser ergänzt.",
  },
  {
    ymd: "2026-09-05",
    kind: "pruefung",
    houses: 77,
    note: "Erstprüfung der dritten Katalogwelle.",
  },
  {
    ymd: "2026-09-06",
    kind: "aufnahme",
    houses: 114,
    note: "Katalog um weitere belegte Reha-Häuser ergänzt.",
  },
  {
    ymd: "2026-09-06",
    kind: "pruefung",
    houses: 114,
    note: "Erstprüfung der vierten Katalogwelle.",
  },
  {
    ymd: "2026-09-06",
    kind: "pruefung",
    houses: 441,
    note: "Vollprüfung aller Steckbriefe auf Echtheit. Geschlossene und fachfremde Häuser entfernt.",
  },
  {
    ymd: "2026-09-07",
    kind: "aufnahme",
    houses: 6,
    note: "Katalog um belegte Suchthäuser mit Anerkennung nach §§ 35/36 BtMG ergänzt.",
  },
  {
    ymd: "2026-09-07",
    kind: "pruefung",
    houses: 90,
    note: "Kennzeichnung MPU-Vorbereitung und Klinik statt Strafe nach öffentlichen Trägerangaben und Landeslisten.",
  },
  {
    ymd: "2026-09-07",
    kind: "pruefung",
    houses: 6,
    note: "Zimmerart der am 07.09. aufgenommenen Suchthäuser nach öffentlichen Trägerangaben.",
  },
  {
    ymd: "2026-09-07",
    kind: "pruefung",
    houses: 6,
    note: "Außenfotos der am 07.09. aufgenommenen Suchthäuser nach öffentlichen Trägerangaben.",
  },
];

export function editionsInRange(
  editions: CatalogEdition[],
  fromYmd: string,
  kind?: CatalogEdition["kind"],
): CatalogEdition[] {
  return editions.filter((item) => item.ymd >= fromYmd && (!kind || item.kind === kind));
}

export type StateCoverage = { code: string; name: string; houses: number; complete: number };

export type CatalogPulse = {
  houses: number;
  complete: number;
  incomplete: number;
  coverPhotos: number;
  requiredPhotosFilled: number;
  requiredPhotosMissing: number;
  alkohol: number;
  drogen: number;
  medikamente: number;
  sucht: number;
  psychosomatik: number;
  dual: number;
  statesCovered: number;
  statesTotal: number;
  frauen: number;
  maenner: number;
  substitution: number;
  kinder: number;
  einzelzimmer: number;
  ahb: number;
  tagesklinik: number;
  emailMissing: number;
  phoneMissing: number;
  roomUnknown: number;
  datenstandLabel: string;
  byState: StateCoverage[];
  topGaps: { label: string; count: number }[];
  addedInPeriod: number;
  pruefungenInPeriod: number;
};

export function catalogPulse(clinics: Clinic[], fromYmd = "0000-01-01"): CatalogPulse {
  const complete = clinics.filter(isClinicComplete).length;
  const requiredSlots = PHOTO_SLOTS.filter((slot) => slot.required);
  let requiredPhotosFilled = 0;
  let requiredPhotosMissing = 0;
  const gapCounts = new Map<string, number>();
  for (const clinic of clinics) {
    for (const slot of requiredSlots) {
      if (clinic.photos.some((photo) => photo.slot === slot.id && photo.imagePath)) requiredPhotosFilled += 1;
      else requiredPhotosMissing += 1;
    }
    for (const gap of clinicGaps(clinic)) {
      gapCounts.set(gap, (gapCounts.get(gap) ?? 0) + 1);
    }
  }
  const dates = clinics.map((clinic) => clinic.datenstand.geprueft).filter(Boolean);
  const latest = dates.sort().at(-1) ?? "";
  const byState: StateCoverage[] = STATES.map((state) => {
    const rows = clinics.filter((clinic) => clinic.stateCode === state.code);
    return {
      code: state.code,
      name: state.name,
      houses: rows.length,
      complete: rows.filter(isClinicComplete).length,
    };
  }).filter((row) => row.houses > 0);
  const editions = editionsInRange(CATALOG_EDITIONS, fromYmd);
  return {
    houses: clinics.length,
    complete,
    incomplete: clinics.length - complete,
    coverPhotos: clinics.filter(hasCoverPhoto).length,
    requiredPhotosFilled,
    requiredPhotosMissing,
    alkohol: clinics.filter((clinic) => chipVorhanden(clinic, "indikation", "Alkohol")).length,
    drogen: clinics.filter((clinic) => chipVorhanden(clinic, "indikation", "Drogen")).length,
    medikamente: clinics.filter((clinic) => chipVorhanden(clinic, "indikation", "Medikamente")).length,
    sucht: clinics.filter((clinic) => clinic.indicationAreas.includes("sucht")).length,
    psychosomatik: clinics.filter((clinic) => clinic.indicationAreas.includes("psychosomatik")).length,
    dual: clinics.filter((clinic) => clinic.indicationAreas.includes("dual")).length,
    statesCovered: new Set(clinics.map((clinic) => clinic.stateCode)).size,
    statesTotal: STATES.length,
    frauen: clinics.filter((clinic) => clinic.genderSetting === "frauen").length,
    maenner: clinics.filter((clinic) => clinic.genderSetting === "maenner").length,
    substitution: clinics.filter((clinic) => clinic.substitution).length,
    kinder: clinics.filter((clinic) => clinic.kinderbetreuung).length,
    einzelzimmer: clinics.filter((clinic) => chipVorhanden(clinic, "wohnenAlltag", "Einbettzimmer")).length,
    ahb: clinics.filter((clinic) => clinic.ahb).length,
    tagesklinik: clinics.filter((clinic) => clinic.setting === "tagesklinik" || clinic.setting === "beides")
      .length,
    emailMissing: clinics.filter((clinic) => !isPresentContact(clinic.email)).length,
    phoneMissing: clinics.filter((clinic) => !isPresentContact(clinic.phone)).length,
    roomUnknown: clinics.filter((clinic) => !roomIsKnown(clinic)).length,
    datenstandLabel: latest,
    byState,
    topGaps: [...gapCounts.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "de")),
    addedInPeriod: editions.filter((item) => item.kind === "aufnahme").reduce((sum, item) => sum + item.houses, 0),
    pruefungenInPeriod: editions
      .filter((item) => item.kind === "pruefung")
      .reduce((sum, item) => sum + item.houses, 0),
  };
}
