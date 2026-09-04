import {
  WAIT_DISCLAIMER,
  bedarfLabel,
  extraLabel,
  indicationLabel,
  stateName,
  type Clinic,
  type KlaromatAnswers,
  type MatchSnapshot,
  type SteckbriefKey,
  type WaitEstimate,
} from "./types";

export const DOCUMENT_DISCLAIMER =
  "Nur Orientierung für die Fachkraft. Keine Diagnose, keine Therapieentscheidung, keine Aufnahmezusage. Wartezeiten = Schätzung.";

export type DocumentPhoto = {
  path: string;
  alt: string;
};

export type DocumentHouse = {
  clinicId: string;
  clinicName: string;
  shortName: string;
  location: string;
  fitSentence: string;
  features: string[];
  wait: WaitEstimate;
  specials: string;
  hints: string;
  photo: DocumentPhoto | null;
  datenstand: string;
};

export type DocumentExtra = {
  id: string;
  kind: "absatz" | "todo";
  title: string;
  text: string;
  done: boolean;
};

export type DocumentBody = {
  needsText: string;
  staffNotes: string;
  houses: DocumentHouse[];
  parked: DocumentHouse[];
  extras: DocumentExtra[];
  disclaimer: string;
  waitNote: string;
  dataAsOf: string;
};

export type DocumentVersionMeta = {
  version: number;
  createdAt: string;
};

export type BuildDocumentInput = {
  clinics: Clinic[];
  answers: KlaromatAnswers;
  matches: MatchSnapshot[];
  generatedAt?: string;
};

const FEATURE_BLOCKS: SteckbriefKey[] = [
  "settingDauer",
  "wohnenAlltag",
  "kinderFamilie",
  "therapie",
  "besonderheiten",
];

export function isDocumentBody(value: unknown): value is DocumentBody {
  if (!value || typeof value !== "object") return false;
  const body = value as DocumentBody;
  return (
    typeof body.needsText === "string" &&
    typeof body.staffNotes === "string" &&
    Array.isArray(body.houses) &&
    Array.isArray(body.parked) &&
    Array.isArray(body.extras)
  );
}

export function formulateNeeds(answers: KlaromatAnswers): string {
  const parts: string[] = [];
  parts.push(`Die Orientierung gilt ${indicationPhrase(answers.indication)}.`);

  if (answers.bedarfe.length > 0) {
    parts.push(
      `Beschriebene Arbeitsschwerpunkte: ${answers.bedarfe.map(bedarfLabel).join(", ")}.`,
    );
  } else {
    parts.push(
      "Es wurden keine engeren Arbeitsschwerpunkte gesetzt; der Abgleich läuft über den Indikationsbereich.",
    );
  }

  if (answers.states.length > 0) {
    parts.push(`Regionale Eingrenzung: ${answers.states.map(stateName).join(", ")}.`);
  } else {
    parts.push("Keine regionale Eingrenzung — bundesweit offen.");
  }

  const settingBits: string[] = [];
  if (answers.genderSetting === "frauen") settingBits.push("frauenspezifisch");
  if (answers.genderSetting === "maenner") settingBits.push("männerspezifisch");
  if (answers.genderSetting === "gemischt") settingBits.push("gemischt");
  if (answers.setting === "stationaer") settingBits.push("stationär");
  if (answers.setting === "tagesklinik") settingBits.push("ganztägig ambulant");
  if (settingBits.length > 0) {
    parts.push(`Gewünschtes Setting: ${settingBits.join(", ")}.`);
  }

  if (answers.ahb) {
    parts.push("Anschlussheilbehandlung ist vorgesehen.");
  }

  if (answers.durationPref === "kurz") {
    parts.push("Die Fachkraft sucht eher eine kurze Behandlungsdauer.");
  } else if (answers.durationPref === "mittel") {
    parts.push("Die Fachkraft sucht eine mittlere Behandlungsdauer.");
  } else if (answers.durationPref === "lang") {
    parts.push("Die Fachkraft sucht eine längere Behandlungsdauer.");
  }

  if (answers.extras.length > 0) {
    parts.push(
      `Weitere Merkmale der Suche: ${answers.extras.map(extraLabel).join(", ")}.`,
    );
  }

  const note = answers.notes.trim();
  if (note) {
    parts.push(`Hinweis der Fachkraft: ${note}`);
  }

  parts.push(
    "Lohklar stellt keine Diagnose und trifft keine Therapieentscheidung.",
  );
  return parts.join(" ");
}

function indicationPhrase(indication: KlaromatAnswers["indication"]): string {
  if (indication === "sucht") {
    return "der medizinischen Rehabilitation bei Abhängigkeitserkrankungen";
  }
  if (indication === "dual") {
    return "einer kombinierten Behandlung bei Dualdiagnosen";
  }
  return "der psychosomatischen Rehabilitation";
}

export function formulateFit(
  clinic: Clinic,
  match: MatchSnapshot,
  answers: KlaromatAnswers,
): string {
  const place = `${clinic.city}, ${clinic.stateName}`;
  const hits = match.reasons.filter((reason) => reason.status === "match");
  const extra = hits.find((reason) => reason.criterion !== "Indikationsbereich");
  const detail = (extra ?? hits[0])?.detail.replace(/\.$/, "") ??
    `${indicationLabel(answers.indication)} ist im Profil vorgesehen`;
  return `${clinic.name} in ${place} liegt in dieser Rangfolge, weil ${lowerFirst(detail)}.`;
}

function lowerFirst(text: string): string {
  if (!text) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
}

export function houseFeatures(clinic: Clinic): string[] {
  const seen = new Set<string>();
  const out: string[] = [];

  function push(raw: string) {
    const text = raw.replace(/\.$/, "").trim();
    if (!text || seen.has(text.toLowerCase())) return;
    seen.add(text.toLowerCase());
    out.push(text);
  }

  for (const key of FEATURE_BLOCKS) {
    for (const chip of clinic.steckbrief[key].chips) {
      if (chip.status === "vorhanden") push(chip.label);
    }
  }

  if (out.length < 3) {
    for (const key of ["settingDauer", "wohnenAlltag", "besonderheiten"] as SteckbriefKey[]) {
      for (const bullet of clinic.steckbrief[key].bullets) {
        if (out.length >= 5) break;
        if (bullet.includes("liegt nicht vor")) continue;
        push(bullet);
      }
    }
  }

  if (out.length < 3) {
    push(indicationLabel(clinic.indicationAreas[0] ?? "psychosomatik"));
    push(`${clinic.city}, ${clinic.stateName}`);
    push(clinic.setting === "tagesklinik" ? "Ganztägig ambulant" : "Stationär");
  }

  return out.slice(0, 5);
}

export function houseSpecials(clinic: Clinic): string {
  const bullets = clinic.steckbrief.besonderheiten.bullets.filter(
    (item) => !item.includes("liegt nicht vor"),
  );
  if (bullets.length === 0) return "Keine belegten Alleinsteller im offiziellen Steckbrief.";
  return bullets.slice(0, 3).join(" ");
}

export function houseHints(clinic: Clinic): string {
  const chunks: string[] = [];
  const contra = clinic.steckbrief.kontraindikation.bullets.filter(
    (item) => !item.includes("liegt nicht vor"),
  );
  if (contra[0]) chunks.push(contra[0]);
  if (contra[1]) chunks.push(contra[1]);
  const sozial = clinic.steckbrief.sozialdienst.bullets[0];
  if (sozial && !sozial.includes("liegt nicht vor")) chunks.push(sozial);
  const kosten = clinic.steckbrief.kostentraeger.bullets[0];
  if (kosten && !kosten.includes("liegt nicht vor")) chunks.push(kosten);
  if (chunks.length === 0) {
    return "Bitte Hinweise aus dem Gespräch mit der Klient:in ergänzen.";
  }
  return chunks.join(" ");
}

export function exteriorPhoto(clinic: Clinic): DocumentPhoto | null {
  const photo = clinic.photos.find((item) => item.slot === "aussen" && item.imagePath);
  if (!photo?.imagePath) return null;
  return { path: photo.imagePath, alt: photo.alt };
}

export function buildHouse(
  clinic: Clinic,
  match: MatchSnapshot,
  answers: KlaromatAnswers,
): DocumentHouse {
  return {
    clinicId: clinic.id,
    clinicName: clinic.name,
    shortName: clinic.shortName,
    location: `${clinic.city}, ${clinic.stateName}`,
    fitSentence: formulateFit(clinic, match, answers),
    features: houseFeatures(clinic),
    wait: match.wait,
    specials: houseSpecials(clinic),
    hints: houseHints(clinic),
    photo: exteriorPhoto(clinic),
    datenstand: clinic.datenstand.geprueft,
  };
}

export function buildResultDocument(input: BuildDocumentInput): DocumentBody {
  const map = new Map(input.clinics.map((clinic) => [clinic.id, clinic]));
  const houses: DocumentHouse[] = [];
  for (const match of input.matches) {
    const clinic = map.get(match.clinicId);
    if (!clinic) continue;
    houses.push(buildHouse(clinic, match, input.answers));
  }
  const dates = [...new Set(houses.map((house) => house.datenstand).filter(Boolean))];
  const generated = input.generatedAt ?? new Date().toISOString();
  const dataAsOf = dates[0] ?? generated.slice(0, 10);
  return {
    needsText: formulateNeeds(input.answers),
    staffNotes: "",
    houses,
    parked: [],
    extras: [],
    disclaimer: DOCUMENT_DISCLAIMER,
    waitNote: "Wartezeiten = Schätzung",
    dataAsOf,
  };
}

export function ensureDocumentBody(
  stored: unknown,
  input: BuildDocumentInput,
): DocumentBody {
  if (isDocumentBody(stored)) return stored;
  return buildResultDocument(input);
}

export function moveItem<T>(list: T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) {
    return list;
  }
  const next = list.slice();
  const [item] = next.splice(from, 1);
  if (item === undefined) return list;
  next.splice(to, 0, item);
  return next;
}

export function parkHouse(body: DocumentBody, clinicId: string): DocumentBody {
  const house = body.houses.find((item) => item.clinicId === clinicId);
  if (!house) return body;
  return {
    ...body,
    houses: body.houses.filter((item) => item.clinicId !== clinicId),
    parked: [...body.parked.filter((item) => item.clinicId !== clinicId), house],
  };
}

export function restoreHouse(body: DocumentBody, clinicId: string): DocumentBody {
  const house = body.parked.find((item) => item.clinicId === clinicId);
  if (!house) return body;
  return {
    ...body,
    parked: body.parked.filter((item) => item.clinicId !== clinicId),
    houses: [...body.houses, house],
  };
}

export function emptyExtra(kind: DocumentExtra["kind"]): DocumentExtra {
  return {
    id: crypto.randomUUID(),
    kind,
    title: kind === "todo" ? "To-do" : "Eigener Absatz",
    text: "",
    done: false,
  };
}

export function documentFooterLines(body: DocumentBody): string[] {
  return [
    body.disclaimer,
    `Datenstand der Klinikprofile: ${formatDataAsOf(body.dataAsOf)}.`,
    body.waitNote,
    WAIT_DISCLAIMER,
  ];
}

export function formatDataAsOf(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    const [y, m, d] = value.slice(0, 10).split("-");
    return `${d}.${m}.${y}`;
  }
  return value;
}

export { WAIT_DISCLAIMER };
