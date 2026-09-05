import type { HouseSpec } from "./katalog-houses.ts";
import type {
  ChipStatus,
  Clinic,
  ClinicPhoto,
  OfficialSteckbrief,
  PhotoSlot,
  PhotoSource,
  SteckBlock,
  Zulassung,
} from "./types.ts";
import { emptySteckBlock } from "./types.ts";

const AS_OF = "09.2026";

/** Unique photos per house. Copies of the same file are omitted; the caption matches the motif. */
const PHOTO_UNIQUE: Partial<Record<string, { file: string; slot: PhotoSlot; label: string }[]>> = {
  "ck-alsterufer": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-auwald": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-bergstrasse": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-bergzabern": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-berus": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-borkum": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-bramstedt": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-burgklinik": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "besonderheit.jpg", slot: "besonderheit", label: "Besonderheit" },
  ],
  "ck-eifelhoehe": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-elbingerode": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-elbmarsch": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-erlengrund": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-eusserthal": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-flechtingen": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-fredeburg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-glotterbad": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-haffkueste": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-hainberg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-heiligenfeld": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-landelin": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "besonderheit.jpg", slot: "besonderheit", label: "Besonderheit" },
  ],
  "ck-lichtblick": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-mainbogen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-motzen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-muenchwies": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-nauheim": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-nordlicht": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-osterholz": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-ratingen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-richelsdorf": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-roseneck": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-rosenhoehe": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-rothaar": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "besonderheit.jpg", slot: "besonderheit", label: "Besonderheit" },
  ],
  "ck-seehof": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "zimmer.jpg", slot: "zimmer_bad", label: "Zimmer / Bad" },
    { file: "besonderheit.jpg", slot: "besonderheit", label: "Besonderheit" },
  ],
  "ck-seewiesen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-sonnenberg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-spreeaue": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-teutoburg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-waldschloesschen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-waren": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-weserblick": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
};

export type ClinicDraft = Omit<
  Clinic,
  "steckbrief" | "zulassung" | "datenstand" | "durationKurzWeeks" | "aufnahmeModus"
> & {
  durationKurzWeeks?: number | null;
  aufnahmeModus?: string;
};

function block(bullets: string[], chips: [string, ChipStatus][]): SteckBlock {
  return {
    bullets: bullets.length ? bullets.slice(0, 8) : ["Angabe liegt nicht vor."],
    chips: chips.length
      ? chips.map(([label, status]) => ({ label, status }))
      : [{ label: "Angabe", status: "unbekannt" }],
  };
}

function profile(partial: Partial<OfficialSteckbrief>): OfficialSteckbrief {
  const empty = emptySteckBlock();
  return {
    indikation: partial.indikation ?? empty,
    kontraindikation: partial.kontraindikation ?? empty,
    settingDauer: partial.settingDauer ?? empty,
    wohnenAlltag: partial.wohnenAlltag ?? empty,
    kinderFamilie: partial.kinderFamilie ?? empty,
    therapie: partial.therapie ?? empty,
    medizin: partial.medizin ?? empty,
    sozialdienst: partial.sozialdienst ?? empty,
    kostentraeger: partial.kostentraeger ?? empty,
    besonderheiten: partial.besonderheiten ?? empty,
  };
}

function flag(value: boolean | null, ja: string, nein: string): string {
  if (value === null) return `${ja.split(":")[0]}: kein Suchtauftrag in diesem Haus.`;
  return value ? ja : nein;
}

function roomCopy(spec: HouseSpec): { bullets: string[]; chips: [string, ChipStatus][] } {
  const extra = [
    "Verpflegung: gemeinsame Mahlzeiten, soweit das Haus einen Speisesaal führt.",
    "Alltag: strukturierter Wochenplan, Ausgang nach Hausregel und Phase.",
  ];
  if (spec.room === "einbett") {
    return {
      bullets: [
        "Wohnen: Einbettzimmer als Regelfall. Zweibett nur in Ausnahmefällen. Keine Mehrbettzimmer.",
        ...extra,
      ],
      chips: [
        ["Einbettzimmer", "vorhanden"],
        ["Zweibettzimmer", "eingeschraenkt"],
        ["Mehrbettzimmer", "nicht_angeboten"],
      ],
    };
  }
  if (spec.room === "einbett-mehrheit") {
    return {
      bullets: [
        "Wohnen: überwiegend Einbettzimmer. Zweibett nach Verfügbarkeit. Keine Mehrbettzimmer.",
        ...extra,
      ],
      chips: [
        ["Einbettzimmer", "vorhanden"],
        ["Zweibettzimmer", "eingeschraenkt"],
        ["Mehrbettzimmer", "nicht_angeboten"],
      ],
    };
  }
  if (spec.room === "zweibett") {
    return {
      bullets: [
        "Wohnen: Zweibettzimmer als Regel. Einbettzimmer nach Verfügbarkeit. Keine Mehrbettzimmer.",
        ...extra,
      ],
      chips: [
        ["Zweibettzimmer", "vorhanden"],
        ["Einbettzimmer", "eingeschraenkt"],
        ["Mehrbettzimmer", "nicht_angeboten"],
      ],
    };
  }
  if (spec.room === "kein-einbett") {
    return {
      bullets: [
        "Wohnen: Zweibettzimmer als Regel. Einbettzimmer und Mehrbettzimmer nicht angeboten.",
        ...extra,
      ],
      chips: [
        ["Zweibettzimmer", "vorhanden"],
        ["Einbettzimmer", "nicht_angeboten"],
        ["Mehrbettzimmer", "nicht_angeboten"],
      ],
    };
  }
  if (spec.room === "zweibett-plus") {
    return {
      bullets: [
        "Wohnen: Zweibettzimmer als Regel, Mehrbett möglich. Einbettzimmer nach Verfügbarkeit.",
        ...extra,
      ],
      chips: [
        ["Zweibettzimmer", "vorhanden"],
        ["Mehrbettzimmer", "eingeschraenkt"],
        ["Einbettzimmer", "eingeschraenkt"],
      ],
    };
  }
  return {
    bullets: [
      "Wohnen: Zimmerart (Einbett / Zweibett / Mehrbett) — Angabe liegt nicht vor.",
      ...extra,
    ],
    chips: [
      ["Einbettzimmer", "unbekannt"],
      ["Zweibettzimmer", "unbekannt"],
      ["Mehrbettzimmer", "unbekannt"],
    ],
  };
}

function settingLine(spec: HouseSpec): string {
  if (spec.setting === "tagesklinik") return "Setting: Tagesklinik.";
  if (spec.setting === "beides") return "Setting: stationär, mit Tagesklinikoption.";
  if (spec.setting === "adaption") return "Setting: Adaption nach der Entwöhnung.";
  return "Setting: vollstationär.";
}

function genderLine(spec: HouseSpec): string {
  if (spec.genderSetting === "frauen") return "Das Haus ist frauenspezifisch.";
  if (spec.genderSetting === "maenner") return "Das Haus ist männerspezifisch.";
  return "Das Haus nimmt Frauen und Männer auf.";
}

function photo(
  slot: PhotoSlot,
  path: string | null,
  label: string,
  alt: string,
  source: PhotoSource = "oeffentlich",
): ClinicPhoto {
  return {
    slot,
    imagePath: path,
    caption: label,
    alt: path ? alt : `${label}: Foto nicht verfügbar`,
    source: path ? source : "fehlt",
    asOf: AS_OF,
  };
}

function photos(spec: HouseSpec): ClinicPhoto[] {
  const dir = `/clinics/${spec.id}`;
  const unique = PHOTO_UNIQUE[spec.id];
  if (!unique?.length) {
    return [
      photo("aussen", null, "Außenansicht", `Außenansicht der ${spec.name} in ${spec.city}`),
      photo("zimmer_bad", null, "Zimmer / Bad", `Patientenzimmer der ${spec.name}`),
      photo("umgebung", null, "Umgebung / Lage", `Außenanlagen der ${spec.name} in ${spec.city}`),
    ];
  }
  return unique.map((item) =>
    photo(item.slot, `${dir}/${item.file}`, item.label, `${item.label} der ${spec.name} in ${spec.city}`),
  );
}

function zulassungFrom(traegerArt: string, ahb: boolean, heilverfahren: boolean): Zulassung {
  const drv: ChipStatus =
    traegerArt === "drv" || traegerArt === "kirche" || traegerArt === "gemeinnuetzig"
      ? "vorhanden"
      : "unbekannt";
  return {
    drv,
    gkv: heilverfahren ? "vorhanden" : "unbekannt",
    ahb: ahb ? "vorhanden" : "nicht_angeboten",
    beihilfe: "unbekannt",
  };
}

export function toDraft(spec: HouseSpec): ClinicDraft {
  return {
    id: spec.id,
    name: spec.name,
    shortName: spec.shortName,
    city: spec.city,
    stateCode: spec.stateCode,
    stateName: spec.stateName,
    traeger: spec.traeger,
    traegerArt: spec.traegerArt,
    address: `${spec.street}, ${spec.plz} ${spec.city}`,
    phone: spec.phone,
    email: spec.email,
    website: spec.website,
    indicationAreas: spec.indicationAreas,
    substances: spec.substances,
    therapyForms: spec.therapyForms,
    durationWeeksMin: spec.durationWeeksMin,
    durationWeeksMax: spec.durationWeeksMax,
    genderSetting: spec.genderSetting,
    setting: spec.setting,
    ahb: spec.ahb,
    heilverfahren: spec.heilverfahren,
    barrierefrei: spec.barrierefrei,
    angehoerigenarbeit: spec.angehoerigenarbeit,
    kinderbetreuung: spec.kinderbetreuung,
    substitution: spec.substitution,
    gluecksspiel: spec.gluecksspiel,
    trauma: spec.trauma,
    jungeErwachsene: spec.jungeErwachsene,
    placesEstimate: spec.placesEstimate,
    occupancyIndex: spec.occupancyIndex,
    waitBaseDays: spec.waitBaseDays,
    waitVarianceDays: spec.waitVarianceDays,
    sortOrder: spec.sortOrder,
    photos: photos(spec),
  };
}

export function buildSteckbrief(spec: HouseSpec): OfficialSteckbrief {
  const psycho = spec.indicationAreas.includes("psychosomatik");
  const dual = spec.indicationAreas.includes("dual");
  const room = roomCopy(spec);
  const dauer =
    spec.durationWeeksMin === spec.durationWeeksMax
      ? `${spec.durationWeeksMin} Wochen`
      : `${spec.durationWeeksMin}–${spec.durationWeeksMax} Wochen`;

  const indikationBullets = [
    spec.fokus,
    flag(spec.alkohol, "Alkohol: Aufnahme vorgesehen.", "Alkohol: nicht der Aufnahmeauftrag."),
    flag(spec.drogen, "Illegale Drogen: Aufnahme vorgesehen.", "Illegale Drogen: nicht der Aufnahmeauftrag."),
    flag(
      spec.medikamente,
      "Medikamente: Aufnahme bei Medikamentenabhängigkeit vorgesehen.",
      "Medikamente: nicht der Aufnahmeauftrag.",
    ),
  ];

  return profile({
    indikation: block(indikationBullets, [
      ["Psychosomatik", psycho ? "vorhanden" : "nicht_angeboten"],
      ["Dualdiagnose", dual ? "vorhanden" : "nicht_angeboten"],
      ["Alkohol", spec.alkohol === true ? "vorhanden" : spec.alkohol === false ? "nicht_angeboten" : "unbekannt"],
      ["Drogen", spec.drogen === true ? "vorhanden" : spec.drogen === false ? "nicht_angeboten" : "unbekannt"],
      [
        "Medikamente",
        spec.medikamente === true ? "vorhanden" : spec.medikamente === false ? "nicht_angeboten" : "unbekannt",
      ],
    ]),
    kontraindikation: block(
      [
        "Akute Selbst- oder Fremdgefährdung, unbehandelter Entzug und fehlende Kostenzusage schließen die Aufnahme aus.",
        "Das Haus entscheidet nach den vorliegenden Unterlagen, nicht Lohklar.",
        spec.genderSetting === "frauen"
          ? "Männer werden nicht aufgenommen."
          : spec.genderSetting === "maenner"
            ? "Frauen werden nicht aufgenommen."
            : "Keine geschlechtsspezifische Aufnahmesperre.",
      ],
      [
        ["Offener Entzug", "nicht_angeboten"],
        ["Akute Krise", "nicht_angeboten"],
      ],
    ),
    settingDauer: block(
      [
        settingLine(spec),
        `Regeldauer: ${dauer}, nach Kostenzusage.`,
        spec.ahb ? "AHB ist vorgesehen." : "AHB ist nicht der Schwerpunkt.",
        spec.heilverfahren ? "Heilverfahren nach Kostenzusage." : "Heilverfahren: Angabe liegt nicht vor.",
      ],
      [
        ["Stationär", spec.setting === "tagesklinik" ? "nicht_angeboten" : "vorhanden"],
        ["Tagesklinik", spec.setting === "tagesklinik" || spec.setting === "beides" ? "vorhanden" : "nicht_angeboten"],
        ["AHB", spec.ahb ? "vorhanden" : "nicht_angeboten"],
      ],
    ),
    wohnenAlltag: block(room.bullets, room.chips),
    kinderFamilie: block(
      [
        genderLine(spec),
        spec.angehoerigenarbeit
          ? "Angehörigenarbeit ist vorgesehen."
          : "Angehörigenarbeit: Angabe liegt nicht vor oder nicht Regelangebot.",
        spec.kinderbetreuung
          ? "Kinderbetreuung bzw. Mutter-Kind-Platz nach Absprache."
          : "Keine Regel-Kinderbetreuung im Haus.",
      ],
      [
        [
          spec.genderSetting === "frauen"
            ? "Frauenspezifisch"
            : spec.genderSetting === "maenner"
              ? "Männerspezifisch"
              : "Gemischt",
          "vorhanden",
        ],
        ["Angehörige", spec.angehoerigenarbeit ? "vorhanden" : "unbekannt"],
        ["Kinderbetreuung", spec.kinderbetreuung ? "vorhanden" : "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        `Verfahren im Haus: ${spec.therapyForms.join(", ")}.`,
        spec.trauma ? "Traumafokus nach interner Einschätzung, nicht automatisch." : "Kein ausgewiesener Traumaschwerpunkt.",
        spec.gluecksspiel
          ? "Glücksspiel / nicht stoffgebundene Sucht ist im Konzept vorgesehen."
          : "Glücksspielmodul: nicht ausgewiesen.",
        "Lohklar wählt keine Therapie und sagt keine Aufnahme zu.",
      ],
      [
        ["Einzeltherapie", spec.therapyForms.some((t) => /einzel/i.test(t)) ? "vorhanden" : "unbekannt"],
        ["Gruppentherapie", spec.therapyForms.some((t) => /gruppe/i.test(t)) ? "vorhanden" : "unbekannt"],
        ["Trauma", spec.trauma ? "eingeschraenkt" : "unbekannt"],
        ["Glücksspiel", spec.gluecksspiel ? "vorhanden" : "nicht_angeboten"],
      ],
    ),
    medizin: block(
      [
        "Ärztliche Leitung und pflegerische Versorgung sind vorgehalten.",
        spec.substitution
          ? `Substitution: ${spec.substMittel}.`
          : `Substitution: ${spec.substMittel}.`,
        "Mitbehandlung somatischer Erkrankungen im üblichen Reha-Rahmen; Grenzen entscheidet das Haus.",
      ],
      [
        ["Substitution", spec.substitution ? "vorhanden" : "nicht_angeboten"],
        ["Ärztliche Leitung", "vorhanden"],
      ],
    ),
    sozialdienst: block(
      [
        "Klinik-Sozialdienst: Kostenzusage, Entlassplanung, weiterführende Hilfen.",
        "Lohklar vermittelt nicht und schreibt nicht an den Kostenträger.",
      ],
      [
        ["Sozialdienst", "vorhanden"],
        ["Nachsorgeplanung", "vorhanden"],
      ],
    ),
    kostentraeger: block(
      [
        spec.ahb || spec.heilverfahren
          ? "Zugang über DRV und/oder GKV nach Kostenzusage."
          : "Zugang nach Kostenzusage des zuständigen Trägers.",
        "Gesetzliche Zuzahlung: 10 € je Kalendertag, höchstens 28 Tage im Jahr. Befreiung möglich.",
        "Wahlleistungen und Zuschläge: Angabe liegt nicht vor.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", spec.traegerArt === "privat" ? "unbekannt" : "vorhanden"],
        ["GKV", spec.heilverfahren ? "vorhanden" : "unbekannt"],
        ["AHB", spec.ahb ? "vorhanden" : "nicht_angeboten"],
        ["Wahlleistungen", "unbekannt"],
        ["Einbett-Zuschlag", spec.room === "einbett" || spec.room === "einbett-mehrheit" ? "nicht_angeboten" : "unbekannt"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [spec.lage, ...spec.facts],
      [
        [spec.stateName, "vorhanden"],
        ["Junge Erwachsene", spec.jungeErwachsene ? "vorhanden" : "nicht_angeboten"],
        ["Barrierefrei", spec.barrierefrei ? "vorhanden" : "unbekannt"],
      ],
    ),
  });
}

export function finishClinic(row: ClinicDraft, steckbrief: OfficialSteckbrief): Clinic {
  return {
    ...row,
    durationKurzWeeks: row.durationKurzWeeks ?? Math.min(row.durationWeeksMin, 4),
    aufnahmeModus: row.aufnahmeModus ?? "rollierend nach Kostenzusage",
    zulassung: zulassungFrom(row.traegerArt, row.ahb, row.heilverfahren),
    datenstand: {
      geprueft: "2026-09-01",
      quellen: "Öffentliche Klinikwebsite und Trägerangaben, Stand 09.2026. Kein Live-Abruf.",
    },
    steckbrief,
  };
}
