import {
  WAIT_DISCLAIMER,
  WAIT_UNCERTAINTY_LABEL,
  type Indication,
  type WaitEstimate,
  type WaitFactor,
  type WaitUncertainty,
} from "./types.ts";

export type WaitClinic = {
  id: string;
  waitBaseDays: number;
  waitVarianceDays: number;
  occupancyIndex: number;
  genderSetting: string;
  placesEstimate?: number;
  aufnahmeModus?: string;
  kinderbetreuung?: boolean;
  stateCode?: string;
  indicationAreas?: Indication[];
  datenstand?: { geprueft: string; quellen: string };
};

export type WaitContext = {
  indication?: Indication;
  month?: number;
  asOf?: Date;
  peers?: WaitClinic[];
};

const MONTH_FACTOR: Record<number, { label: string; factor: number }> = {
  1: { label: "Januar — Andrang nach den Feiertagen", factor: 1.08 },
  2: { label: "Februar — gemäßigte Nachfrage", factor: 1.02 },
  3: { label: "März — Beginn des Frühjahrsanstiegs", factor: 1.05 },
  4: { label: "April — erhöhte Antragszahlen", factor: 1.07 },
  5: { label: "Mai — anhaltend hohe Nachfrage", factor: 1.06 },
  6: { label: "Juni — Übergang in die Sommerbelegung", factor: 1.0 },
  7: { label: "Juli — eher kürzere Listen in der Urlaubszeit", factor: 0.94 },
  8: { label: "August — weiterhin eher kürzere Listen", factor: 0.95 },
  9: { label: "September — Andrang nach der Urlaubszeit", factor: 1.08 },
  10: { label: "Oktober — hohe Herbstnachfrage", factor: 1.1 },
  11: { label: "November — anhaltend hohe Nachfrage", factor: 1.06 },
  12: { label: "Dezember — gemischte Belegung um die Feiertage", factor: 0.98 },
};

const INDICATION_FACTOR: Record<Indication, { label: string; factor: number }> = {
  sucht: { label: "Regionale Nachfrage Entwöhnung", factor: 1.16 },
  psychosomatik: { label: "Regionale Nachfrage Psychosomatik", factor: 1.1 },
  dual: { label: "Regionale Nachfrage Dualdiagnosen (weniger spezialisierte Plätze)", factor: 1.28 },
};

const DRV_FACTOR = 1.06;
const PRIOR_WEIGHT = 0.12;

export const WAIT_NOT_MEANING = [
  "keine Aufnahmezusage",
  "keine individuelle Vorfahrt vor anderen Antragstellenden",
  "keine Zusage eines Aufnahmezeitpunkts durch Klinik oder Kostenträger",
  "keine Diagnose und keine Therapieentscheidung",
];

function de(n: number, digits = 2): string {
  return n.toFixed(digits).replace(".", ",");
}

function caDays(n: number): string {
  const rounded = Math.max(5, Math.round(n / 5) * 5);
  return `ca. ${rounded} Tage`;
}

export function formatAsOf(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-");
  if (!y || !m || !d) return iso;
  return `${d}.${m}.${y}`;
}

export function formatWaitRange(weeksMin: number, weeksMax: number): string {
  if (weeksMin === weeksMax) return `ca. ${weeksMin} Wochen`;
  return `ca. ${weeksMin}–${weeksMax} Wochen`;
}

export function formatWaitLabel(
  weeksMin: number,
  weeksMax: number,
  asOfIso: string,
): string {
  return `${formatWaitRange(weeksMin, weeksMax)} (Schätzung, Stand ${formatAsOf(asOfIso)})`;
}

function weeksFromDays(days: number): number {
  return Math.max(2, Math.round(days / 7));
}

function median(values: number[]): number {
  const sorted = values.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const a = sorted[mid];
  const b = sorted[mid - 1];
  if (sorted.length % 2 === 1) return a ?? 0;
  return ((b ?? 0) + (a ?? 0)) / 2;
}

function parseStand(value: string | undefined): Date | null {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    const date = new Date(`${value.slice(0, 10)}T00:00:00Z`);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}

function capacityFactor(places: number | undefined): {
  factor: number;
  note: string;
  missing: boolean;
} {
  if (!places || places <= 0) {
    return {
      factor: 1,
      note: "Kapazität unbekannt — Faktor 1,00. Unsicherheit steigt. Keine Betten erfunden.",
      missing: true,
    };
  }
  if (places < 40) {
    return {
      factor: 1.18,
      note: "Muster-Kapazität unter 40 Plätzen (Bandbreite, keine gezählte Belegung)",
      missing: false,
    };
  }
  if (places < 80) {
    return {
      factor: 1.08,
      note: "Muster-Kapazität 40–80 Plätze (Bandbreite, keine gezählte Belegung)",
      missing: false,
    };
  }
  if (places <= 140) {
    return {
      factor: 1,
      note: "Muster-Kapazität 80–140 Plätze (Bandbreite, keine gezählte Belegung)",
      missing: false,
    };
  }
  return {
    factor: 0.94,
    note: "Muster-Kapazität über 140 Plätze (Bandbreite, keine gezählte Belegung)",
    missing: false,
  };
}

function placeTightness(clinic: WaitClinic): { factor: number; notes: string[] } {
  let factor = 1;
  const notes: string[] = [];
  const modus = (clinic.aufnahmeModus ?? "").toLowerCase();
  if (modus.includes("stopp") || modus.includes("geschlossen")) {
    factor *= 1.22;
    notes.push("Bekannter Aufnahmestopp im Profil — Faktor 1,22");
  }
  if (clinic.genderSetting === "frauen" || clinic.genderSetting === "maenner") {
    factor *= 1.08;
    notes.push("Geschlechtsspezifische Plätze — Faktor 1,08 (kleinere, getrennte Kapazität)");
  }
  if (clinic.kinderbetreuung) {
    factor *= 1.1;
    notes.push("Kinderhaus-Plätze — Faktor 1,10 (engere Spur, keine Platzzahl erfunden)");
  }
  if (notes.length === 0) {
    notes.push("Keine zusätzlichen Platzengpässe im Profil — Faktor 1,00");
  }
  return { factor, notes };
}

function regionalPrior(
  clinic: WaitClinic,
  peers: WaitClinic[] | undefined,
  indication: Indication | undefined,
): { days: number | null; n: number; note: string } {
  if (!peers || !clinic.stateCode) {
    return { days: null, n: 0, note: "Kein Regionalprior — Vergleichshäuser nicht übergeben." };
  }
  const comparable = peers.filter((peer) => {
    if (peer.id === clinic.id) return false;
    if (peer.stateCode !== clinic.stateCode) return false;
    if (!peer.waitBaseDays || peer.waitBaseDays <= 0) return false;
    if (indication && peer.indicationAreas?.length) {
      return peer.indicationAreas.includes(indication);
    }
    if (clinic.indicationAreas?.length && peer.indicationAreas?.length) {
      return clinic.indicationAreas.some((area) => peer.indicationAreas?.includes(area));
    }
    return true;
  });
  if (comparable.length < 2) {
    return {
      days: null,
      n: comparable.length,
      note: `Kein belastbarer Regionalprior in ${clinic.stateCode} (weniger als 2 Vergleichshäuser).`,
    };
  }
  const days = median(comparable.map((peer) => peer.waitBaseDays));
  return {
    days,
    n: comparable.length,
    note: `Median der Vergleichshäuser in ${clinic.stateCode} (n=${comparable.length}): ${caDays(days)}. Gewicht ${de(PRIOR_WEIGHT)}.`,
  };
}

function recency(asOf: Date, geprueft: string | undefined): {
  factor: number;
  ageDays: number | null;
  note: string;
  stale: boolean;
  missing: boolean;
} {
  const stand = parseStand(geprueft);
  if (!stand) {
    return {
      factor: 1.35,
      ageDays: null,
      note: "Stand der Klinikangabe unbekannt — Spanne × 1,35.",
      stale: true,
      missing: true,
    };
  }
  const ageDays = Math.max(0, Math.round((asOf.getTime() - stand.getTime()) / 86_400_000));
  if (ageDays > 180) {
    return {
      factor: 1.5,
      ageDays,
      note: `Quelle ${ageDays} Tage alt — Spanne × 1,50.`,
      stale: true,
      missing: false,
    };
  }
  if (ageDays > 90) {
    return {
      factor: 1.25,
      ageDays,
      note: `Quelle ${ageDays} Tage alt — Spanne × 1,25.`,
      stale: true,
      missing: false,
    };
  }
  return {
    factor: 1,
    ageDays,
    note: `Quelle aktuell (${ageDays} Tage alt) — keine Aufweitung.`,
    stale: false,
    missing: false,
  };
}

function classifyUncertainty(
  dayRatio: number,
  missing: boolean,
  stale: boolean,
): WaitUncertainty {
  if (missing) return "breit";
  if (stale && dayRatio > 0.3) return "breit";
  if (stale) return "mittel";
  if (dayRatio > 0.55) return "breit";
  if (dayRatio > 0.28) return "mittel";
  return "schmal";
}

function factor(
  nr: string,
  label: string,
  weight: string,
  formula: string,
  effect: string,
): WaitFactor {
  return { nr, label, weight, formula, effect };
}

function fallbackEstimate(
  clinicId: string,
  asOfIso: string,
  reason: string,
): WaitEstimate {
  const weeksMin = 6;
  const weeksMax = 16;
  return {
    clinicId,
    label: formatWaitLabel(weeksMin, weeksMax, asOfIso),
    rangeLabel: formatWaitRange(weeksMin, weeksMax),
    midDays: 70,
    minDays: 42,
    maxDays: 112,
    weeksMin,
    weeksMax,
    asOf: asOfIso,
    asOfLabel: formatAsOf(asOfIso),
    uncertainty: "breit",
    disclaimer: WAIT_DISCLAIMER,
    factors: [
      factor(
        "8",
        "Fehlende Daten",
        "—",
        "keine Klinikangabe, kein Prior",
        reason,
      ),
    ],
    formula: "Keine Punktrechnung. Orientierungsspanne bei fehlender Klinikangabe.",
    formulaFilled: "ca. 6–16 Wochen, Unsicherheit breit",
    sources: ["Keine verwertbare Klinikangabe", `Stand der Schätzung ${formatAsOf(asOfIso)}`],
    uncertain: [reason, "Keine Live-Warteliste", "Keine Bettenzahl erfunden"],
    notMeaning: WAIT_NOT_MEANING,
  };
}

/**
 * Single source for every wait-time display in Lohklar.
 * Deterministic: same clinic + context always yields the same range.
 */
export function computeWaitEstimate(
  clinic: WaitClinic,
  ctx: WaitContext = {},
): WaitEstimate {
  const asOf = ctx.asOf ?? new Date();
  const asOfIso = asOf.toISOString().slice(0, 10);
  const month = ctx.month ?? asOf.getMonth() + 1;
  const seasonal = MONTH_FACTOR[month] ?? MONTH_FACTOR[9];
  const indicationId =
    ctx.indication ??
    (clinic.indicationAreas?.[0] as Indication | undefined);
  const indication = indicationId
    ? INDICATION_FACTOR[indicationId]
    : { label: "Ohne Indikationsgewicht (kein Fallbezug)", factor: 1 };
  const occupancyRaw = Number(clinic.occupancyIndex);
  const occupancyMissing = !Number.isFinite(occupancyRaw) || occupancyRaw <= 0;
  const occupancy = occupancyMissing ? 1 : occupancyRaw;
  const cap = capacityFactor(clinic.placesEstimate);
  const tight = placeTightness(clinic);
  const prior = regionalPrior(clinic, ctx.peers, indicationId);
  const fresh = recency(asOf, clinic.datenstand?.geprueft);

  const clinicBase = clinic.waitBaseDays;
  const baseMissing = !clinicBase || clinicBase <= 0;
  if (baseMissing && prior.days == null) {
    return fallbackEstimate(
      clinic.id,
      asOfIso,
      "Keine letzte bekannte Klinikangabe und kein Regionalprior — grobe Spanne, keine Punktzahl.",
    );
  }

  const tKlinik = baseMissing ? (prior.days as number) : clinicBase;
  const t0 =
    !baseMissing && prior.days != null
      ? (1 - PRIOR_WEIGHT) * tKlinik + PRIOR_WEIGHT * prior.days
      : tKlinik;

  const missing = occupancyMissing || cap.missing || fresh.missing || baseMissing;
  let span = Math.max(10, Number(clinic.waitVarianceDays) || 10);
  if (indicationId === "dual") span *= 1.15;
  if (missing) span *= 1.4;
  span *= fresh.factor;

  const sources = [
    baseMissing
      ? "Keine letzte bekannte Klinikangabe — Anker aus Regionalprior"
      : `Letzte bekannte Musterangabe der Klinik: ${clinicBase} Tage (Muster-Eintrag, kein Live-Abruf)`,
    clinic.datenstand?.quellen
      ? `Quelle Klinikprofil: ${clinic.datenstand.quellen}`
      : "Quelle: Orientierungsprofil Lohklar (Musterkatalog)",
    `Stand Klinikprofil: ${clinic.datenstand?.geprueft ? formatAsOf(clinic.datenstand.geprueft) : "unbekannt"}`,
    `Stand der Schätzung: ${formatAsOf(asOfIso)}`,
    prior.n >= 2
      ? `Vergleichbare Häuser in der Region: ${prior.n}`
      : "Kein Regionalprior verwendet",
  ];

  const uncertain = [
    "Keine Live-Warteliste, keine tagesaktuelle Bettenzahl",
    fresh.note,
    occupancyMissing
      ? "Regionale Auslastung fehlt — Faktor 1,00, Unsicherheit steigt"
      : "Auslastung ist eine Musterkennzahl, keine gemeldete Belegung",
    cap.missing
      ? "Kapazität fehlt — keine Betten erfunden"
      : "Platzzahl nur als Bandbreite, nicht als gezählte Betten",
    "DRV-/Kassenlaufzeit ist eine Pauschale, nicht der konkrete Bescheid",
  ];

  const factors: WaitFactor[] = [
    factor(
      "1",
      "Letzte bekannte Angabe der Klinik",
      baseMissing ? "ersetzt durch Prior" : "1,00 (Anker)",
      baseMissing ? `T0 ← Prior ${caDays(tKlinik)}` : `T_Klinik = ${clinicBase} Tage (Muster-Eintrag)`,
      baseMissing
        ? "Klinikangabe fehlt. Anker aus Vergleichshäusern, Unsicherheit steigt."
        : `Muster-Eintrag ${clinicBase} Tage, nicht live abgefragt.`,
    ),
    factor(
      "2",
      indication.label,
      `${de(occupancy)} × ${de(indication.factor)}`,
      `f_Nachfrage = ${de(occupancy)}; f_Indikation = ${de(indication.factor)}`,
      occupancyMissing
        ? `Auslastung unbekannt, Faktor 1,00. Indikationsgewicht ${de(indication.factor)}.`
        : `Auslastungskennzahl ${de(occupancy)} (Muster). Indikationsgewicht ${de(indication.factor)}.`,
    ),
    factor(
      "3",
      "Kapazität / Aufnahmemodus",
      de(cap.factor),
      `f_Kapazität = ${de(cap.factor)}`,
      `${cap.note} Aufnahmemodus: ${clinic.aufnahmeModus || "nicht belegt"}.`,
    ),
    factor(
      "4",
      "Saisonalität und typische DRV-/Kassenlaufzeiten",
      `${de(seasonal.factor)} × ${de(DRV_FACTOR)}`,
      `f_Saison = ${de(seasonal.factor)}; f_DRV = ${de(DRV_FACTOR)}`,
      `${seasonal.label}. DRV/Kasse: Pauschale ${de(DRV_FACTOR)} für typische Antrags- und Bewilligungslaufzeit, nicht fallbezogen.`,
    ),
    factor(
      "5",
      "Aufnahmestopps, Kinderhaus, Geschlechterplätze",
      de(tight.factor),
      `f_Plätze = ${de(tight.factor)}`,
      tight.notes.join(" "),
    ),
    factor(
      "6",
      "Vergleichbare Häuser in der Region (Prior)",
      prior.days != null ? de(PRIOR_WEIGHT) : "0,00",
      prior.days != null && !baseMissing
        ? `T0 = ${de(1 - PRIOR_WEIGHT)} × ${de(tKlinik, 0)} + ${de(PRIOR_WEIGHT)} × ${de(prior.days, 0)}`
        : "kein Prior",
      prior.note,
    ),
    factor(
      "7",
      "Aktualität der Quelle",
      de(fresh.factor),
      `Spanne × ${de(fresh.factor)}`,
      fresh.note,
    ),
    factor(
      "8",
      "Fehlende Daten",
      missing ? "Spanne × 1,40" : "1,00",
      missing ? "Unsicherheit mindestens mittel oder breit" : "alle Kernwerte belegt",
      missing
        ? "Mindestens ein Kernwert fehlt. Spanne aufgeweitet, keine Scheinpräzision."
        : "Kernwerte belegt. Trotzdem Schätzung, keine Live-Liste.",
    ),
  ];

  return finishEstimate({
    clinicId: clinic.id,
    asOfIso,
    t0,
    occupancy,
    capFactor: cap.factor,
    seasonal: seasonal.factor,
    drv: DRV_FACTOR,
    tight: tight.factor,
    indicationFactor: indication.factor,
    span,
    missing,
    stale: fresh.stale,
    factors,
    sources,
    uncertain,
  });
}

function finishEstimate(input: {
  clinicId: string;
  asOfIso: string;
  t0: number;
  occupancy: number;
  capFactor: number;
  seasonal: number;
  drv: number;
  tight: number;
  indicationFactor: number;
  span: number;
  missing: boolean;
  stale: boolean;
  factors: WaitFactor[];
  sources: string[];
  uncertain: string[];
}): WaitEstimate {
  const t =
    input.t0 *
    input.occupancy *
    input.indicationFactor *
    input.capFactor *
    input.seasonal *
    input.drv *
    input.tight;
  const minDays = Math.max(14, t - input.span);
  const maxDays = t + input.span;
  const dayRatio = (maxDays - minDays) / Math.max(t, 1);
  const uncertainty = classifyUncertainty(dayRatio, input.missing, input.stale);
  const weeksMin = weeksFromDays(minDays);
  let weeksMax = Math.max(weeksMin, weeksFromDays(maxDays));
  if (weeksMin === weeksMax && uncertainty !== "schmal") {
    weeksMax += uncertainty === "breit" ? 2 : 1;
  }

  const formula =
    "T0 = Klinikangabe, ggf. 12 % Regionalprior; T = T0 × f_Nachfrage × f_Indikation × f_Kapazität × f_Saison × f_DRV × f_Plätze";
  const formulaFilled = `T = ${de(input.t0, 0)} × ${de(input.occupancy)} × ${de(input.indicationFactor)} × ${de(input.capFactor)} × ${de(input.seasonal)} × ${de(input.drv)} × ${de(input.tight)} = ${caDays(t)}. Spanne ${caDays(t)} ± ${caDays(input.span)} → ${formatWaitRange(weeksMin, weeksMax)}. Unsicherheit ${WAIT_UNCERTAINTY_LABEL[uncertainty]}.`;

  return {
    clinicId: input.clinicId,
    label: formatWaitLabel(weeksMin, weeksMax, input.asOfIso),
    rangeLabel: formatWaitRange(weeksMin, weeksMax),
    midDays: Math.round(t / 5) * 5,
    minDays: Math.round(minDays / 5) * 5,
    maxDays: Math.round(maxDays / 5) * 5,
    weeksMin,
    weeksMax,
    asOf: input.asOfIso,
    asOfLabel: formatAsOf(input.asOfIso),
    uncertainty,
    disclaimer: WAIT_DISCLAIMER,
    factors: input.factors,
    formula,
    formulaFilled,
    sources: input.sources,
    uncertain: input.uncertain,
    notMeaning: WAIT_NOT_MEANING,
  };
}

type LooseWait = Partial<WaitEstimate> & {
  clinicId?: string;
  weeksMin?: number;
  weeksMax?: number;
  asOf?: string;
  label?: string;
  factors?: WaitFactor[];
  midDays?: number;
};

export function coerceWaitEstimate(raw: LooseWait | null | undefined): WaitEstimate | null {
  if (!raw || typeof raw !== "object") return null;
  const weeksMin = Number(raw.weeksMin);
  const weeksMax = Number(raw.weeksMax);
  if (!Number.isFinite(weeksMin) || !Number.isFinite(weeksMax) || weeksMin < 1) {
    return null;
  }
  const asOf = typeof raw.asOf === "string" && raw.asOf ? raw.asOf : "2026-09-01";
  const width = weeksMax - weeksMin;
  const uncertainty: WaitUncertainty =
    raw.uncertainty === "schmal" || raw.uncertainty === "mittel" || raw.uncertainty === "breit"
      ? raw.uncertainty
      : width <= 2
        ? "schmal"
        : width <= 4
          ? "mittel"
          : "breit";
  const label = formatWaitLabel(weeksMin, weeksMax, asOf);
  return {
    clinicId: raw.clinicId ?? "unbekannt",
    label,
    rangeLabel: formatWaitRange(weeksMin, weeksMax),
    midDays: Number(raw.midDays) || Math.round(((weeksMin + weeksMax) / 2) * 7),
    minDays: Number(raw.minDays) || weeksMin * 7,
    maxDays: Number(raw.maxDays) || weeksMax * 7,
    weeksMin,
    weeksMax,
    asOf,
    asOfLabel: formatAsOf(asOf),
    uncertainty,
    disclaimer: raw.disclaimer || WAIT_DISCLAIMER,
    factors: Array.isArray(raw.factors) ? raw.factors : [],
    formula: raw.formula || "Gespeicherte Schätzung — keine neue Rechnung.",
    formulaFilled:
      raw.formulaFilled ||
      `${label}. Unsicherheit ${WAIT_UNCERTAINTY_LABEL[uncertainty]}.`,
    sources: raw.sources?.length ? raw.sources : [`Stand ${formatAsOf(asOf)}`],
    uncertain: raw.uncertain?.length
      ? raw.uncertain
      : ["Gespeicherter Klar-o-Mat-Treffer, keine Live-Warteliste"],
    notMeaning: raw.notMeaning?.length ? raw.notMeaning : WAIT_NOT_MEANING,
  };
}

export function summarizeWaitEstimates(
  rawList: LooseWait[],
  asOf = new Date(),
): WaitEstimate | null {
  const estimates = rawList
    .map((item) => coerceWaitEstimate(item))
    .filter((item): item is WaitEstimate => Boolean(item));
  if (estimates.length === 0) return null;
  const weeksMin = Math.round(median(estimates.map((item) => item.weeksMin)));
  const weeksMax = Math.max(
    weeksMin,
    Math.round(median(estimates.map((item) => item.weeksMax))),
  );
  const rank: Record<WaitUncertainty, number> = { schmal: 0, mittel: 1, breit: 2 };
  const uncertainty = estimates.reduce<WaitUncertainty>(
    (best, item) => (rank[item.uncertainty] > rank[best] ? item.uncertainty : best),
    "schmal",
  );
  const asOfIso = asOf.toISOString().slice(0, 10);
  const label = formatWaitLabel(weeksMin, weeksMax, asOfIso);
  return {
    clinicId: "aggregate",
    label,
    rangeLabel: formatWaitRange(weeksMin, weeksMax),
    midDays: Math.round(((weeksMin + weeksMax) / 2) * 7 / 5) * 5,
    minDays: weeksMin * 7,
    maxDays: weeksMax * 7,
    weeksMin,
    weeksMax,
    asOf: asOfIso,
    asOfLabel: formatAsOf(asOfIso),
    uncertainty,
    disclaimer: WAIT_DISCLAIMER,
    factors: [
      factor(
        "1",
        "Median gespeicherter Treffer",
        "—",
        `n = ${estimates.length}`,
        "Keine neue Formel. Median der Wochen-Spannen aus Klar-o-Mat-Treffern, dieselbe Komponente.",
      ),
    ],
    formula: "Median(weeksMin), Median(weeksMax) über gespeicherte Schätzungen.",
    formulaFilled: `${label}. n=${estimates.length}. Unsicherheit ${WAIT_UNCERTAINTY_LABEL[uncertainty]} (weiteste unter den Treffern).`,
    sources: [
      `${estimates.length} gespeicherte Klar-o-Mat-Treffer`,
      `Stand der Zusammenfassung ${formatAsOf(asOfIso)}`,
    ],
    uncertain: [
      "Zusammenfassung über Fälle, kein Klinikabruf",
      "Weiteste Unsicherheit der Einzelwerte wird übernommen",
    ],
    notMeaning: WAIT_NOT_MEANING,
  };
}
