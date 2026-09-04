import { computeWaitEstimate } from "./wait-time";
import {
  indicationLabel,
  stateName,
  type Clinic,
  type KlaromatAnswers,
  type MatchReason,
  type MatchSnapshot,
} from "./types";

function push(
  reasons: MatchReason[],
  criterion: string,
  status: MatchReason["status"],
  detail: string,
  weight: { match: number; partial: number; miss: number },
): number {
  reasons.push({ criterion, status, detail });
  if (status === "match") return weight.match;
  if (status === "partial") return weight.partial;
  return weight.miss;
}

export function clinicFitsIndication(
  clinic: Clinic,
  indication: KlaromatAnswers["indication"],
): boolean {
  return clinic.indicationAreas.includes(indication);
}

export function rankClinics(
  clinics: Clinic[],
  answers: KlaromatAnswers,
  asOf = new Date(),
): MatchSnapshot[] {
  const scored: MatchSnapshot[] = [];

  for (const clinic of clinics) {
    if (!clinicFitsIndication(clinic, answers.indication)) continue;

    const reasons: MatchReason[] = [];
    let raw = 0;
    let max = 0;

    max += 24;
    raw += push(
      reasons,
      "Indikationsbereich",
      "match",
      `${indicationLabel(answers.indication)} ist im Profil vorgesehen.`,
      { match: 24, partial: 12, miss: 0 },
    );

    max += 16;
    if (answers.states.length === 0) {
      raw += push(
        reasons,
        "Region",
        "partial",
        `Keine regionale Eingrenzung. Klinik in ${clinic.city}, ${clinic.stateName}.`,
        { match: 16, partial: 10, miss: 0 },
      );
    } else if (answers.states.includes(clinic.stateCode)) {
      raw += push(
        reasons,
        "Region",
        "match",
        `${clinic.stateName} entspricht der Auswahl.`,
        { match: 16, partial: 10, miss: 0 },
      );
    } else {
      raw += push(
        reasons,
        "Region",
        "miss",
        `${clinic.stateName} liegt außerhalb der genannten Bundesländer.`,
        { match: 16, partial: 10, miss: 2 },
      );
    }

    max += 14;
    if (answers.genderSetting === "egal") {
      raw += push(
        reasons,
        "Setting nach Geschlecht",
        "partial",
        `Kein Filter. Klinik: ${genderLabel(clinic.genderSetting)}.`,
        { match: 14, partial: 8, miss: 0 },
      );
    } else if (answers.genderSetting === clinic.genderSetting) {
      raw += push(
        reasons,
        "Setting nach Geschlecht",
        "match",
        `${genderLabel(clinic.genderSetting)} entspricht dem Wahlkriterium.`,
        { match: 14, partial: 8, miss: 0 },
      );
    } else if (clinic.genderSetting === "gemischt") {
      raw += push(
        reasons,
        "Setting nach Geschlecht",
        "partial",
        "Gemischtes Haus — nicht geschlechtsspezifisch, aber grundsätzlich offen.",
        { match: 14, partial: 8, miss: 0 },
      );
    } else {
      raw += push(
        reasons,
        "Setting nach Geschlecht",
        "miss",
        `Klinik ist ${genderLabel(clinic.genderSetting)}, Anfrage war ${genderLabel(answers.genderSetting)}.`,
        { match: 14, partial: 8, miss: 0 },
      );
    }

    max += 10;
    if (answers.setting === "egal") {
      raw += push(
        reasons,
        "Behandlungssetting",
        "partial",
        `Kein Filter. Klinik: ${settingLabel(clinic.setting)}.`,
        { match: 10, partial: 6, miss: 0 },
      );
    } else if (
      clinic.setting === "beides" ||
      clinic.setting === answers.setting
    ) {
      raw += push(
        reasons,
        "Behandlungssetting",
        "match",
        `${settingLabel(clinic.setting)} deckt die Anfrage ab.`,
        { match: 10, partial: 6, miss: 0 },
      );
    } else {
      raw += push(
        reasons,
        "Behandlungssetting",
        "miss",
        `Klinik bietet ${settingLabel(clinic.setting)}.`,
        { match: 10, partial: 6, miss: 0 },
      );
    }

    max += 8;
    if (!answers.ahb) {
      raw += push(
        reasons,
        "AHB",
        "partial",
        "AHB war kein Filter.",
        { match: 8, partial: 5, miss: 0 },
      );
    } else if (clinic.ahb) {
      raw += push(
        reasons,
        "AHB",
        "match",
        "Anschlussheilbehandlung ist im Haus vorgesehen.",
        { match: 8, partial: 5, miss: 0 },
      );
    } else {
      raw += push(
        reasons,
        "AHB",
        "miss",
        "AHB ist im Profil nicht vorgesehen — eher Heilverfahren.",
        { match: 8, partial: 5, miss: 0 },
      );
    }

    max += 10;
    raw += durationScore(clinic, answers, reasons);

    const extraScore = extrasScore(clinic, answers, reasons);
    raw += extraScore.raw;
    max += extraScore.max;

    if (answers.bedarfe.length > 0) {
      max += 10;
      raw += bedarfeScore(clinic, answers, reasons);
    }

    const score = Math.max(8, Math.min(99, Math.round((raw / max) * 100)));
    const wait = computeWaitEstimate(clinic, {
      indication: answers.indication,
      asOf,
      peers: clinics,
    });

    scored.push({ clinicId: clinic.id, score, reasons, wait });
  }

  scored.sort((a, b) => b.score - a.score || a.wait.midDays - b.wait.midDays);
  return scored;
}

function genderLabel(value: string): string {
  if (value === "frauen") return "Frauenspezifisch";
  if (value === "maenner") return "Männerspezifisch";
  return "Gemischt";
}

function settingLabel(value: string): string {
  if (value === "tagesklinik") return "Tagesklinik";
  if (value === "beides") return "Stationär und Tagesklinik";
  return "Stationär";
}

function durationScore(
  clinic: Clinic,
  answers: KlaromatAnswers,
  reasons: MatchReason[],
): number {
  const mid = (clinic.durationWeeksMin + clinic.durationWeeksMax) / 2;
  const range = `${clinic.durationWeeksMin}–${clinic.durationWeeksMax} Wochen`;
  if (answers.durationPref === "egal") {
    return push(reasons, "Dauer", "partial", `Kein Filter. Üblich: ${range}.`, {
      match: 10,
      partial: 6,
      miss: 0,
    });
  }
  const wanted =
    answers.durationPref === "kurz"
      ? mid <= 6
      : answers.durationPref === "mittel"
        ? mid >= 5 && mid <= 12
        : mid >= 10;
  return push(
    reasons,
    "Dauer",
    wanted ? "match" : "partial",
    `Übliche Dauer ${range}.`,
    { match: 10, partial: 5, miss: 0 },
  );
}

function extrasScore(
  clinic: Clinic,
  answers: KlaromatAnswers,
  reasons: MatchReason[],
): { raw: number; max: number } {
  if (answers.extras.length === 0) {
    reasons.push({
      criterion: "Weitere Wahlkriterien",
      status: "partial",
      detail: "Keine zusätzlichen Filter gesetzt.",
    });
    return { raw: 6, max: 10 };
  }

  let raw = 0;
  const max = answers.extras.length * 6;
  for (const extra of answers.extras) {
    const has = hasExtra(clinic, extra);
    raw += push(
      reasons,
      extraLabel(extra),
      has ? "match" : "miss",
      has
        ? "Im offiziellen Steckbrief vorgesehen."
        : "Im offiziellen Steckbrief nicht als Schwerpunkt ausgewiesen.",
      { match: 6, partial: 3, miss: 0 },
    );
  }
  return { raw, max };
}

function bedarfeScore(
  clinic: Clinic,
  answers: KlaromatAnswers,
  reasons: MatchReason[],
): number {
  const overlap = answers.bedarfe.filter((item) =>
    clinic.substances.includes(item) ||
    (item === "trauma" && clinic.trauma) ||
    (item === "gluecksspiel" && clinic.gluecksspiel) ||
    (item === "substitution" && clinic.substitution),
  );
  if (overlap.length > 0) {
    return push(
      reasons,
      "Beschriebener Bedarf",
      "match",
      `Überschneidung mit: ${overlap.join(", ")}. Keine Diagnose, nur Abgleich.`,
      { match: 10, partial: 5, miss: 2 },
    );
  }
  return push(
    reasons,
    "Beschriebener Bedarf",
    "partial",
    "Kein enger Schlagwort-Treffer — Indikationsbereich passt dennoch.",
    { match: 10, partial: 5, miss: 2 },
  );
}

function hasExtra(clinic: Clinic, extra: string): boolean {
  switch (extra) {
    case "angehoerige":
      return clinic.angehoerigenarbeit;
    case "barrierefrei":
      return clinic.barrierefrei;
    case "trauma":
      return clinic.trauma;
    case "gluecksspiel":
      return clinic.gluecksspiel;
    case "substitution":
      return clinic.substitution;
    case "kinder":
      return clinic.kinderbetreuung;
    case "junge":
      return clinic.jungeErwachsene;
    default:
      return false;
  }
}

function extraLabel(extra: string): string {
  const map: Record<string, string> = {
    angehoerige: "Angehörigenarbeit",
    barrierefrei: "Barrierefreiheit",
    trauma: "Traumafokus",
    gluecksspiel: "Glücksspielkompetenz",
    substitution: "Substitutionsbegleitung",
    kinder: "Kinderbetreuung",
    junge: "Junge Erwachsene",
  };
  return map[extra] ?? extra;
}

export function emptyAnswers(): KlaromatAnswers {
  return {
    clientName: "",
    indication: "sucht",
    bedarfe: [],
    states: [],
    genderSetting: "egal",
    setting: "egal",
    ahb: false,
    durationPref: "egal",
    extras: [],
    notes: "",
  };
}

export { stateName };
