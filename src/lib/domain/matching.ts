import { computeWaitEstimate } from "./wait-time.ts";
import {
  bedarfLabel,
  extraLabel,
  indicationLabel,
  stateName,
  type ChipStatus,
  type Clinic,
  type CriterionStatus,
  type KlaromatAnswers,
  type MatchReason,
  type MatchSnapshot,
} from "./types.ts";

const NEIGHBORS: Record<string, string[]> = {
  SH: ["HH", "NI", "MV"],
  HH: ["SH", "NI"],
  NI: ["SH", "HH", "HB", "NW", "ST", "TH", "HE"],
  HB: ["NI"],
  MV: ["SH", "NI", "BB", "ST"],
  BE: ["BB"],
  BB: ["BE", "MV", "ST", "SN"],
  ST: ["NI", "MV", "BB", "SN", "TH"],
  SN: ["BB", "ST", "TH", "BY"],
  TH: ["NI", "HE", "BY", "SN", "ST"],
  HE: ["NI", "NW", "RP", "BY", "TH", "BW"],
  NW: ["NI", "HE", "RP"],
  RP: ["NW", "HE", "SL", "BW"],
  SL: ["RP"],
  BW: ["RP", "HE", "BY"],
  BY: ["BW", "HE", "TH", "SN"],
};

type Scored = {
  criterion: string;
  status: CriterionStatus;
  detail: string;
  weight: number;
  blocking: boolean;
};

export type ListedNeed = {
  criterion: string;
  value: string;
};

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
    personGender: "egal",
    roomPref: "egal",
    substitutionNeed: "egal",
    waitPref: "egal",
    nearbyStatesOk: true,
    access: "egal",
    payer: "egal",
    childrenNeed: "egal",
    mobilityNeed: "egal",
    youngAdultNeed: "egal",
    familyWorkNeed: "egal",
    traumaNeed: "egal",
    distancePref: "egal",
  };
}

export function normalizeAnswers(
  input: Partial<KlaromatAnswers> & Pick<KlaromatAnswers, "indication">,
): KlaromatAnswers {
  const base = emptyAnswers();
  const extrasIn = input.extras ?? [];
  const access =
    input.access && input.access !== "egal"
      ? input.access
      : input.ahb
        ? "ahb"
        : (input.access ?? base.access);
  const substitutionNeed = resolveTri(
    input.substitutionNeed,
    extrasIn.includes("substitution") || Boolean(input.bedarfe?.includes("substitution")),
  );
  const traumaNeed = resolveFlag(
    input.traumaNeed,
    extrasIn.includes("trauma") || Boolean(input.bedarfe?.includes("trauma")),
  );
  const childrenNeed = resolveFlag(input.childrenNeed, extrasIn.includes("kinder"));
  const mobilityNeed = resolveFlag(input.mobilityNeed, extrasIn.includes("barrierefrei"));
  const youngAdultNeed = resolveFlag(input.youngAdultNeed, extrasIn.includes("junge"));
  const familyWorkNeed = resolveFlag(input.familyWorkNeed, extrasIn.includes("angehoerige"));

  const answers: KlaromatAnswers = {
    ...base,
    ...input,
    clientName: input.clientName ?? "",
    bedarfe: (input.bedarfe ?? []).filter((id) => id !== "substitution"),
    states: input.states ?? [],
    notes: input.notes ?? "",
    personGender: input.personGender ?? "egal",
    roomPref: input.roomPref ?? "egal",
    substitutionNeed,
    waitPref: input.waitPref ?? "egal",
    nearbyStatesOk: input.nearbyStatesOk ?? true,
    access,
    ahb: access === "ahb" || Boolean(input.ahb),
    payer: input.payer ?? "egal",
    childrenNeed,
    mobilityNeed,
    youngAdultNeed,
    familyWorkNeed,
    traumaNeed,
    distancePref: input.distancePref ?? "egal",
    extras: [],
  };
  answers.extras = deriveExtras(answers);
  return answers;
}

function deriveExtras(answers: KlaromatAnswers): string[] {
  const extras: string[] = [];
  if (answers.familyWorkNeed === "ja") extras.push("angehoerige");
  if (answers.mobilityNeed === "ja") extras.push("barrierefrei");
  if (answers.childrenNeed === "ja") extras.push("kinder");
  if (answers.youngAdultNeed === "ja") extras.push("junge");
  if (answers.traumaNeed === "ja" || answers.bedarfe.includes("trauma")) extras.push("trauma");
  if (answers.substitutionNeed === "ja") extras.push("substitution");
  if (answers.bedarfe.includes("gluecksspiel")) extras.push("gluecksspiel");
  return extras;
}

function resolveFlag(value: "egal" | "ja" | undefined, fromLegacy: boolean): "egal" | "ja" {
  if (value === "ja") return "ja";
  if (fromLegacy) return "ja";
  return "egal";
}

function resolveTri(
  value: "egal" | "ja" | "nein" | undefined,
  fromLegacy: boolean,
): "egal" | "ja" | "nein" {
  if (value === "ja" || value === "nein") return value;
  if (fromLegacy) return "ja";
  return "egal";
}

export function listedNeeds(raw: KlaromatAnswers): ListedNeed[] {
  const answers = normalizeAnswers(raw);
  const items: ListedNeed[] = [];
  items.push({ criterion: "Indikation", value: indicationLabel(answers.indication) });
  if (answers.personGender === "frau") items.push({ criterion: "Aufnahme nach Geschlecht", value: "Frau" });
  if (answers.personGender === "mann") items.push({ criterion: "Aufnahme nach Geschlecht", value: "Mann" });
  for (const id of answers.bedarfe) {
    items.push({ criterion: bedarfLabel(id), value: "Aufnahme muss ausgewiesen sein" });
  }
  if (answers.substitutionNeed === "ja") {
    items.push({ criterion: "Substitution", value: "Weiterführung nötig" });
  }
  if (answers.traumaNeed === "ja" && !answers.bedarfe.includes("trauma")) {
    items.push({ criterion: "Traumafokus", value: "Muss ausgewiesen sein" });
  }
  if (answers.setting !== "egal") {
    items.push({
      criterion: "Behandlungssetting",
      value: answers.setting === "tagesklinik" ? "Tagesklinik" : "Stationär",
    });
  }
  if (answers.access === "ahb") items.push({ criterion: "Zugang", value: "AHB" });
  if (answers.access === "heilverfahren") items.push({ criterion: "Zugang", value: "Heilverfahren" });
  if (answers.payer === "drv") items.push({ criterion: "Kostenträger", value: "DRV" });
  if (answers.payer === "gkv") items.push({ criterion: "Kostenträger", value: "GKV" });
  if (answers.durationPref !== "egal") {
    items.push({
      criterion: "Dauer",
      value:
        answers.durationPref === "kurz"
          ? "eher kurz"
          : answers.durationPref === "lang"
            ? "länger"
            : "mittlere Dauer",
    });
  }
  if (answers.roomPref === "einbett") items.push({ criterion: "Zimmer", value: "Einbett bevorzugt" });
  if (answers.roomPref === "kein-mehrbett") items.push({ criterion: "Zimmer", value: "kein Mehrbett" });
  if (answers.mobilityNeed === "ja") items.push({ criterion: "Barrierefreiheit", value: "erforderlich" });
  if (answers.childrenNeed === "ja") items.push({ criterion: "Kinder / Eltern-Kind", value: "mit ins Haus" });
  if (answers.familyWorkNeed === "ja") items.push({ criterion: "Angehörigenarbeit", value: "erforderlich" });
  if (answers.youngAdultNeed === "ja") items.push({ criterion: "Junge Erwachsene", value: "eigene Gruppe" });
  if (answers.genderSetting !== "egal") {
    items.push({ criterion: "Haussetting Geschlecht", value: genderLabel(answers.genderSetting) });
  }
  if (answers.states.length > 0) {
    items.push({
      criterion: "Region",
      value: answers.states.map(stateName).join(", ") + (answers.nearbyStatesOk ? " (Nachbarländer offen)" : ""),
    });
  }
  if (answers.distancePref === "nah") items.push({ criterion: "Lage", value: "wohnortnah" });
  if (answers.distancePref === "distanz-ok") items.push({ criterion: "Lage", value: "Distanz zum Milieu gewollt" });
  if (answers.waitPref === "schnell") items.push({ criterion: "Wartezeit", value: "eher zeitnah" });
  if (answers.waitPref === "passgenau") items.push({ criterion: "Wartezeit", value: "Passung vor Tempo" });
  return items;
}

export function clinicFitsIndication(clinic: Clinic, indication: KlaromatAnswers["indication"]): boolean {
  if (indication === "sucht") {
    return clinic.indicationAreas.includes("sucht") || clinic.indicationAreas.includes("dual");
  }
  if (indication === "psychosomatik") {
    return clinic.indicationAreas.includes("psychosomatik") || clinic.indicationAreas.includes("dual");
  }
  return true;
}

export function isBlocked(match: Pick<MatchSnapshot, "blocking">): boolean {
  return (match.blocking?.length ?? 0) > 0;
}

export function coverageLabel(match: Pick<MatchSnapshot, "covered" | "asked">): string {
  const asked = match.asked ?? 0;
  const covered = match.covered ?? 0;
  if (asked === 0) return "keine gesetzten Anforderungen";
  const coveredLabel = Number.isInteger(covered) ? String(covered) : String(covered).replace(".", ",");
  return `${coveredLabel} von ${asked} gesetzten Anforderungen`;
}

export function hydrateMatch(match: MatchSnapshot): MatchSnapshot {
  return {
    ...match,
    covered: match.covered ?? 0,
    asked: match.asked ?? match.reasons?.length ?? 0,
    blocking: match.blocking ?? [],
    rank: match.rank ?? 0,
    reasons: match.reasons ?? [],
  };
}

export function rankClinics(
  clinics: Clinic[],
  rawAnswers: KlaromatAnswers,
  asOf = new Date(),
): MatchSnapshot[] {
  const answers = normalizeAnswers(rawAnswers);
  const scored: MatchSnapshot[] = [];

  for (const clinic of clinics) {
    const wait = computeWaitEstimate(clinic, {
      indication: answers.indication,
      asOf,
      peers: clinics,
    });
    const rows = scoreClinic(clinic, answers, wait);
    const askedRows = rows.filter((row) => row.weight > 0);
    const asked = askedRows.length;
    const covered = askedRows.reduce((sum, row) => {
      if (row.status === "match") return sum + 1;
      if (row.status === "partial") return sum + 0.5;
      return sum;
    }, 0);
    const raw = askedRows.reduce((sum, row) => {
      if (row.status === "match") return sum + row.weight;
      if (row.status === "partial") return sum + row.weight * 0.45;
      return sum;
    }, 0);
    const max = askedRows.reduce((sum, row) => sum + row.weight, 0);
    const score = max === 0 ? 50 : Math.max(4, Math.min(99, Math.round((raw / max) * 100)));
    const blocking = rows.filter((row) => row.blocking && row.status === "miss").map((row) => row.detail);
    const reasons: MatchReason[] = askedRows.map((row) => ({
      criterion: row.criterion,
      status: row.status,
      detail: row.detail,
    }));

    scored.push({
      clinicId: clinic.id,
      score,
      reasons,
      wait,
      covered: Math.round(covered * 2) / 2,
      asked,
      blocking,
      rank: 0,
    });
  }

  scored.sort((a, b) => {
    const aBlock = a.blocking.length;
    const bBlock = b.blocking.length;
    if (Boolean(aBlock) !== Boolean(bBlock)) return aBlock ? 1 : -1;
    if (aBlock !== bBlock) return aBlock - bBlock;
    if (b.score !== a.score) return b.score - a.score;
    return a.wait.midDays - b.wait.midDays;
  });

  scored.forEach((item, index) => {
    item.rank = index + 1;
  });
  return scored;
}

function scoreClinic(clinic: Clinic, answers: KlaromatAnswers, wait: MatchSnapshot["wait"]): Scored[] {
  const rows: Scored[] = [];

  rows.push(indicationRow(clinic, answers.indication));
  rows.push(personGenderRow(clinic, answers.personGender));

  for (const bedarf of answers.bedarfe) {
    rows.push(bedarfRow(clinic, bedarf));
  }

  rows.push(substitutionRow(clinic, answers.substitutionNeed));
  rows.push(traumaRow(clinic, answers));
  rows.push(settingRow(clinic, answers.setting));
  rows.push(accessRow(clinic, answers.access));
  rows.push(payerRow(clinic, answers.payer));
  rows.push(durationRow(clinic, answers.durationPref));
  rows.push(roomRow(clinic, answers.roomPref));
  rows.push(mobilityRow(clinic, answers.mobilityNeed));
  rows.push(childrenRow(clinic, answers.childrenNeed));
  rows.push(familyRow(clinic, answers.familyWorkNeed));
  rows.push(youngAdultRow(clinic, answers.youngAdultNeed));
  rows.push(houseGenderRow(clinic, answers.genderSetting));
  rows.push(regionRow(clinic, answers));
  rows.push(distanceRow(clinic, answers));
  rows.push(waitRow(wait, answers.waitPref));

  return rows.filter((row) => row.weight > 0);
}

function indicationRow(clinic: Clinic, wanted: KlaromatAnswers["indication"]): Scored {
  const hasSucht = clinic.indicationAreas.includes("sucht");
  const hasPsycho = clinic.indicationAreas.includes("psychosomatik");
  const hasDual = clinic.indicationAreas.includes("dual");
  const label = indicationLabel(wanted);

  if (wanted === "sucht") {
    if (hasSucht || hasDual) {
      return row("Indikation", "match", `${label} ist im Steckbrief vorgesehen.`, 24, false);
    }
    return row("Indikation", "miss", "Kein Suchtauftrag in diesem Haus — Aufnahme für Entwöhnung nicht vorgesehen.", 24, true);
  }
  if (wanted === "psychosomatik") {
    if (hasPsycho) return row("Indikation", "match", "Psychosomatik ist im Steckbrief vorgesehen.", 24, false);
    if (hasDual) {
      return row(
        "Indikation",
        "partial",
        "Dualdiagnosehaus — Psychosomatik nur im kombinierten Setting, nicht als reine Psychosomatik.",
        24,
        false,
      );
    }
    return row("Indikation", "miss", "Kein psychosomatischer Auftrag in diesem Haus.", 24, true);
  }
  if (hasDual) return row("Indikation", "match", "Dualdiagnose ist der Auftrag des Hauses.", 24, false);
  if (hasSucht) {
    return row(
      "Indikation",
      "partial",
      "Suchthaus — Begleiterkrankungen werden oft mitbehandelt, ein ausgewiesenes Dualsetting fehlt.",
      24,
      false,
    );
  }
  if (hasPsycho) {
    return row(
      "Indikation",
      "partial",
      "Psychosomatikhaus — Sucht-Entwöhnung ist nicht der Auftrag. Dualbedarf nur teilweise gedeckt.",
      24,
      false,
    );
  }
  return row("Indikation", "miss", "Dualdiagnose ist nicht ausgewiesen.", 24, false);
}

function personGenderRow(clinic: Clinic, person: KlaromatAnswers["personGender"]): Scored {
  if (person === "egal") return skip("Aufnahme nach Geschlecht");
  if (person === "frau" && clinic.genderSetting === "maenner") {
    return row("Aufnahme nach Geschlecht", "miss", "Männerspezifisches Haus. Frauen werden nicht aufgenommen.", 24, true);
  }
  if (person === "mann" && clinic.genderSetting === "frauen") {
    return row("Aufnahme nach Geschlecht", "miss", "Frauenspezifisches Haus. Männer werden nicht aufgenommen.", 24, true);
  }
  return row(
    "Aufnahme nach Geschlecht",
    "match",
    clinic.genderSetting === "gemischt"
      ? "Das Haus nimmt Frauen und Männer auf."
      : `Geschlechtsspezifisches Haus passt zur Person (${genderLabel(clinic.genderSetting)}).`,
    24,
    false,
  );
}

function bedarfRow(clinic: Clinic, bedarf: string): Scored {
  const label = bedarfLabel(bedarf);
  if (bedarf === "alkohol" || bedarf === "drogen" || bedarf === "medikamente") {
    const chipLabel = bedarf === "alkohol" ? "Alkohol" : bedarf === "drogen" ? "Drogen" : "Medikamente";
    const status = chip(clinic, "indikation", chipLabel);
    if (status === "vorhanden") {
      return row(label, "match", `${chipLabel}: Aufnahme im Steckbrief vorgesehen.`, 20, false);
    }
    if (status === "eingeschraenkt") {
      return row(label, "partial", `${chipLabel}: nur eingeschränkt ausgewiesen — vor Antrag beim Haus klären.`, 20, false);
    }
    return row(label, "miss", `${chipLabel}: nicht der Aufnahmeauftrag dieses Hauses.`, 20, true);
  }
  if (bedarf === "gluecksspiel") {
    return clinic.gluecksspiel
      ? row(label, "match", "Glücksspiel / nicht stoffgebundene Sucht ist im Konzept vorgesehen.", 14, false)
      : row(label, "miss", "Kein ausgewiesenes Glücksspielmodul im Steckbrief.", 14, false);
  }
  if (bedarf === "trauma") {
    return clinic.trauma
      ? row(label, "match", "Traumafokus ist im Steckbrief ausgewiesen (nach interner Einschätzung des Hauses).", 14, false)
      : row(label, "miss", "Kein ausgewiesener Traumaschwerpunkt.", 14, false);
  }
  if (bedarf === "ess") {
    if (clinic.substances.includes("ess")) {
      return row(label, "match", "Essverhalten / Essstörungen sind als Schwerpunkt ausgewiesen.", 16, false);
    }
    if (clinic.indicationAreas.includes("psychosomatik") || clinic.indicationAreas.includes("dual")) {
      return row(label, "partial", "Kein ausgewiesener Essstörungsschwerpunkt — nur allgemeiner psychosomatischer Auftrag.", 16, false);
    }
    return row(label, "miss", "Essverhalten ist im Steckbrief nicht ausgewiesen.", 16, false);
  }
  if (clinic.substances.includes(bedarf)) {
    return row(label, "match", `${label} ist im Profil vorgesehen.`, 12, false);
  }
  if (clinic.indicationAreas.includes("psychosomatik") || clinic.indicationAreas.includes("dual")) {
    return row(label, "partial", `${label} ist nicht extra ausgewiesen — Haus bleibt psychosomatisch bzw. dual.`, 12, false);
  }
  return row(label, "miss", `${label} ist im Steckbrief nicht ausgewiesen.`, 12, false);
}

function substitutionRow(clinic: Clinic, need: KlaromatAnswers["substitutionNeed"]): Scored {
  if (need !== "ja") return skip("Substitution");
  return clinic.substitution
    ? row("Substitution", "match", substitutionLine(clinic), 20, false)
    : row("Substitution", "miss", "Substitution muss weitergeführt werden, das Haus weist sie nicht aus.", 20, true);
}

function substitutionLine(clinic: Clinic): string {
  const bullet = clinic.steckbrief.medizin.bullets.find((item) => /Substitution/i.test(item));
  return bullet ?? "Substitution ist im Steckbrief vorgesehen.";
}

function traumaRow(clinic: Clinic, answers: KlaromatAnswers): Scored {
  if (answers.traumaNeed !== "ja") return skip("Traumafokus");
  if (answers.bedarfe.includes("trauma")) return skip("Traumafokus");
  return clinic.trauma
    ? row("Traumafokus", "match", "Traumafokus ist im Steckbrief ausgewiesen.", 14, false)
    : row("Traumafokus", "miss", "Kein ausgewiesener Traumaschwerpunkt.", 14, false);
}

function regionRow(clinic: Clinic, answers: KlaromatAnswers): Scored {
  if (answers.states.length === 0) return skip("Region");
  if (answers.states.includes(clinic.stateCode)) {
    return row("Region", "match", `${clinic.stateName} entspricht der Auswahl.`, 14, false);
  }
  const neighbor =
    answers.nearbyStatesOk !== false &&
    answers.states.some((code) => (NEIGHBORS[code] ?? []).includes(clinic.stateCode));
  if (neighbor) {
    return row("Region", "partial", `${clinic.stateName} grenzt an die gewählte Region — Nachsorgeweg prüfen.`, 14, false);
  }
  return row("Region", "miss", `${clinic.stateName} liegt außerhalb der genannten Bundesländer.`, 14, false);
}

function distanceRow(clinic: Clinic, answers: KlaromatAnswers): Scored {
  if (answers.distancePref === "egal") return skip("Lage");
  const remote = isRemoteClinic(clinic);
  if (answers.distancePref === "nah") {
    if (remote) {
      return row("Lage", "miss", "Insel- bzw. Reizklima — für wohnortnahe Nachsorge und Besuch ungeeignet.", 10, false);
    }
    if (answers.states.length > 0 && answers.states.includes(clinic.stateCode)) {
      return row("Lage", "match", "Wohnortnahes Bundesland, keine Insel- oder Extremlage.", 10, false);
    }
    return row("Lage", "partial", "Keine Insel-Lage, Anfahrt und Nachsorge trotzdem gegen den Wohnort halten.", 10, false);
  }
  if (remote) {
    return row("Lage", "match", "Insel- bzw. Reizklima — Distanz zum gewohnten Milieu ist hier gegeben.", 10, false);
  }
  return row("Lage", "partial", "Kein Inselsetting. Distanz zum Milieu hängt von der Entfernung zum Wohnort ab.", 10, false);
}

function isRemoteClinic(clinic: Clinic): boolean {
  const blob = `${clinic.city} ${clinic.steckbrief.besonderheiten.bullets.join(" ")}`;
  return /insel|borkum/i.test(blob);
}

function houseGenderRow(clinic: Clinic, wanted: KlaromatAnswers["genderSetting"]): Scored {
  if (wanted === "egal") return skip("Haussetting Geschlecht");
  if (wanted === clinic.genderSetting) {
    return row("Haussetting Geschlecht", "match", `${genderLabel(clinic.genderSetting)} entspricht dem Wahlkriterium.`, 10, false);
  }
  if (clinic.genderSetting === "gemischt") {
    return row("Haussetting Geschlecht", "partial", "Gemischtes Haus — nicht geschlechtsspezifisch, aber grundsätzlich offen.", 10, false);
  }
  return row(
    "Haussetting Geschlecht",
    "miss",
    `Klinik ist ${genderLabel(clinic.genderSetting)}, gewünscht war ${genderLabel(wanted)}.`,
    10,
    false,
  );
}

function settingRow(clinic: Clinic, wanted: KlaromatAnswers["setting"]): Scored {
  if (wanted === "egal") return skip("Behandlungssetting");
  if (clinic.setting === "beides" || clinic.setting === wanted) {
    return row("Behandlungssetting", "match", `${settingLabel(clinic.setting)} deckt die Anfrage ab.`, 16, false);
  }
  if (wanted === "tagesklinik") {
    return row(
      "Behandlungssetting",
      "miss",
      "Keine Tagesklinik ausgewiesen. Stationär bedeutet: die Person wohnt im Haus, nicht zu Hause.",
      16,
      true,
    );
  }
  return row(
    "Behandlungssetting",
    "miss",
    `Klinik bietet ${settingLabel(clinic.setting)} — nicht das gewünschte vollstationäre Setting.`,
    16,
    true,
  );
}

function accessRow(clinic: Clinic, access: KlaromatAnswers["access"]): Scored {
  if (access === "egal") return skip("Zugang");
  if (access === "ahb") {
    return clinic.ahb
      ? row("Zugang", "match", "AHB ist im Steckbrief vorgesehen.", 16, false)
      : row(
          "Zugang",
          "miss",
          "AHB ist nicht der Schwerpunkt. Nach Krankenhausentlassung ist das der falsche Zugangsweg.",
          16,
          true,
        );
  }
  return clinic.heilverfahren
    ? row("Zugang", "match", "Heilverfahren nach Kostenzusage ist vorgesehen.", 12, false)
    : row("Zugang", "miss", "Heilverfahren ist im Steckbrief nicht klar ausgewiesen.", 12, false);
}

function payerRow(clinic: Clinic, payer: KlaromatAnswers["payer"]): Scored {
  if (payer === "egal") return skip("Kostenträger");
  if (payer === "drv") {
    const status = clinic.zulassung.drv;
    if (status === "vorhanden") return row("Kostenträger", "match", "DRV-Zugang ist im Steckbrief vorgesehen.", 10, false);
    if (status === "unbekannt") {
      return row("Kostenträger", "partial", "DRV: Angabe liegt nicht vor — vor Antrag beim Haus klären.", 10, false);
    }
    return row("Kostenträger", "miss", "DRV-Zugang ist nicht ausgewiesen.", 10, false);
  }
  const status = clinic.zulassung.gkv;
  if (status === "vorhanden") return row("Kostenträger", "match", "GKV-Zugang ist im Steckbrief vorgesehen.", 10, false);
  if (status === "unbekannt") {
    return row("Kostenträger", "partial", "GKV: Angabe liegt nicht vor — vor Antrag beim Haus klären.", 10, false);
  }
  return row("Kostenträger", "miss", "GKV-Zugang ist nicht ausgewiesen.", 10, false);
}

function durationRow(clinic: Clinic, pref: KlaromatAnswers["durationPref"]): Scored {
  if (pref === "egal") return skip("Dauer");
  const mid = (clinic.durationWeeksMin + clinic.durationWeeksMax) / 2;
  const range = `${clinic.durationWeeksMin}–${clinic.durationWeeksMax} Wochen`;
  const wanted = pref === "kurz" ? mid <= 6 : pref === "mittel" ? mid >= 5 && mid <= 12 : mid >= 10;
  return row(
    "Dauer",
    wanted ? "match" : "partial",
    `Übliche Dauer ${range}, nach Kostenzusage. Sucht oft 12–16 Wochen, Psychosomatik oft 4–6.`,
    6,
    false,
  );
}

function roomRow(clinic: Clinic, pref: KlaromatAnswers["roomPref"]): Scored {
  if (pref === "egal") return skip("Zimmer");
  if (pref === "einbett") {
    const status = chip(clinic, "wohnenAlltag", "Einbettzimmer");
    if (status === "vorhanden") {
      return row("Zimmer", "match", "Einbettzimmer ist im Steckbrief als Regel oder vorhanden ausgewiesen.", 12, false);
    }
    if (status === "eingeschraenkt") {
      return row("Zimmer", "partial", "Einbettzimmer nur eingeschränkt / nach Verfügbarkeit.", 12, false);
    }
    if (status === "unbekannt") {
      return row("Zimmer", "partial", "Zimmerart: Angabe liegt nicht vor — vor Antrag beim Haus klären.", 12, false);
    }
    return row("Zimmer", "miss", "Einbettzimmer ist nicht angeboten.", 12, false);
  }
  const mehr = chip(clinic, "wohnenAlltag", "Mehrbettzimmer");
  if (mehr === "nicht_angeboten") {
    return row("Zimmer", "match", "Kein Mehrbettzimmer als Regelangebot ausgewiesen.", 8, false);
  }
  if (mehr === "unbekannt") {
    return row("Zimmer", "partial", "Mehrbettzimmer: Angabe liegt nicht vor.", 8, false);
  }
  if (mehr === "eingeschraenkt") return row("Zimmer", "partial", "Mehrbettzimmer sind eingeschränkt möglich.", 8, false);
  return row("Zimmer", "miss", "Mehrbettzimmer sind im Steckbrief vorgesehen.", 8, false);
}

function mobilityRow(clinic: Clinic, need: KlaromatAnswers["mobilityNeed"]): Scored {
  if (need !== "ja") return skip("Barrierefreiheit");
  if (clinic.barrierefrei) {
    return row("Barrierefreiheit", "match", "Barrierefreiheit ist im Steckbrief ausgewiesen.", 12, false);
  }
  return row(
    "Barrierefreiheit",
    "partial",
    "Barrierefreiheit: Angabe liegt nicht vor. Bei Rollstuhl oder Gehhilfe vor Antrag beim Haus klären.",
    12,
    false,
  );
}

function childrenRow(clinic: Clinic, need: KlaromatAnswers["childrenNeed"]): Scored {
  if (need !== "ja") return skip("Kinder / Eltern-Kind");
  return clinic.kinderbetreuung
    ? row("Kinder / Eltern-Kind", "match", "Kinderbetreuung bzw. Mutter-Kind-Platz ist im Steckbrief vorgesehen.", 18, false)
    : row(
        "Kinder / Eltern-Kind",
        "miss",
        "Keine Regel-Kinderbetreuung im Haus. Kinder können nicht mit aufgenommen werden.",
        18,
        true,
      );
}

function familyRow(clinic: Clinic, need: KlaromatAnswers["familyWorkNeed"]): Scored {
  if (need !== "ja") return skip("Angehörigenarbeit");
  return clinic.angehoerigenarbeit
    ? row("Angehörigenarbeit", "match", "Angehörigenarbeit ist im Steckbrief vorgesehen.", 8, false)
    : row("Angehörigenarbeit", "miss", "Angehörigenarbeit ist nicht als Regelangebot ausgewiesen.", 8, false);
}

function youngAdultRow(clinic: Clinic, need: KlaromatAnswers["youngAdultNeed"]): Scored {
  if (need !== "ja") return skip("Junge Erwachsene");
  return clinic.jungeErwachsene
    ? row("Junge Erwachsene", "match", "Junge Erwachsene sind im Steckbrief als Gruppe ausgewiesen.", 10, false)
    : row("Junge Erwachsene", "miss", "Keine ausgewiesene Gruppe für junge Erwachsene.", 10, false);
}

function waitRow(wait: MatchSnapshot["wait"], pref: KlaromatAnswers["waitPref"]): Scored {
  if (pref !== "schnell") return skip("Wartezeit");
  if (wait.weeksMax <= 6) return row("Wartezeit", "match", `Schätzung ${wait.rangeLabel} — eher zeitnah.`, 8, false);
  if (wait.weeksMax <= 10) return row("Wartezeit", "partial", `Schätzung ${wait.rangeLabel}.`, 8, false);
  return row("Wartezeit", "partial", `Schätzung ${wait.rangeLabel} — nicht die kürzeste Spanne.`, 8, false);
}

function chip(clinic: Clinic, block: "indikation" | "wohnenAlltag", label: string): ChipStatus {
  return clinic.steckbrief[block].chips.find((item) => item.label === label)?.status ?? "unbekannt";
}

function genderLabel(value: string): string {
  if (value === "frauen") return "frauenspezifisch";
  if (value === "maenner") return "männerspezifisch";
  return "gemischt";
}

function settingLabel(value: string): string {
  if (value === "tagesklinik") return "Tagesklinik";
  if (value === "beides") return "Stationär und Tagesklinik";
  if (value === "adaption") return "Adaption";
  return "Stationär";
}

function row(criterion: string, status: CriterionStatus, detail: string, weight: number, blocking: boolean): Scored {
  return { criterion, status, detail, weight, blocking };
}

function skip(criterion: string): Scored {
  return { criterion, status: "partial", detail: "", weight: 0, blocking: false };
}

export { extraLabel, stateName };
