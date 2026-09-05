import { scoreName } from "./folder-search.ts";
import {
  PHOTO_SLOTS,
  STATES,
  STECKBRIEF_BLOCKS,
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
  setting: "egal" | "stationaer" | "tagesklinik";
  ahb: boolean;
  substitution: boolean;
  einzelzimmer: boolean;
  kinder: boolean;
  barriere: boolean;
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
  return STECKBRIEF_BLOCKS.every(({ key }) => {
    const bullets = clinic.steckbrief[key].bullets.filter(
      (bullet) => bullet.trim().length > 0 && !MISSING.test(bullet.trim()),
    );
    return bullets.length > 0;
  });
}

/** Außenfoto, Telefon, Website, bekannte Zimmerart, alle 10 Blöcke mit Inhalt. */
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

function clinicSearchScore(query: string, clinic: Clinic): number {
  return Math.max(
    scoreName(query, clinic.name),
    scoreName(query, clinic.shortName),
    scoreName(query, clinic.city),
    scoreName(query, clinic.traeger),
    scoreName(query, clinic.stateName),
    scoreName(query, clinic.address),
  );
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
      if (filter.ahb && !clinic.ahb) return false;
      if (filter.substitution && !clinic.substitution) return false;
      if (filter.einzelzimmer && !chipVorhanden(clinic, "wohnenAlltag", "Einbettzimmer")) return false;
      if (filter.kinder && !clinic.kinderbetreuung) return false;
      if (filter.barriere && !clinic.barrierefrei) return false;
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
