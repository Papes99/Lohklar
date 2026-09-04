import {
  emptySteckBlock,
  type ChipStatus,
  type OfficialSteckbrief,
  type SteckBlock,
} from "./types";

function block(
  bullets: string[],
  chips: [string, ChipStatus][],
): SteckBlock {
  return {
    bullets: bullets.length ? bullets.slice(0, 6) : ["Angabe liegt nicht vor."],
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

export const STECKBRIEFE: Record<string, OfficialSteckbrief> = {
  "ck-seewiesen": profile({
    indikation: block(
      [
        "Aufgenommen werden Versicherte mit psychosomatischem Bedarf in AHB und Heilverfahren.",
        "Das Haus arbeitet vorrangig zu Depression, Angst, Erschöpfung und Schmerz.",
        "Aufgenommen werden Personen nach ärztlicher Verordnung und Kostenzusage.",
        "Das Haus führt ein Traumamodul nach interner Einschätzung, nicht automatisch.",
      ],
      [
        ["Psychosomatik", "vorhanden"],
        ["AHB", "vorhanden"],
        ["Trauma-Modul", "eingeschraenkt"],
        ["Sucht-Entwöhnung", "nicht_angeboten"],
        ["Dualdiagnose", "nicht_angeboten"],
      ],
    ),
    kontraindikation: block(
      [
        "Nicht aufgenommen werden Personen mit akutem Entzugsbedarf.",
        "Nicht aufgenommen werden Personen bei akuter Suizidalität, die eine Akutstation braucht.",
        "Aufnahme nur nach abgeschlossener akuter Krankenhausbehandlung, soweit AHB.",
        "Nicht aufgenommen werden Personen ohne Gehfähigkeit, wenn keine Rollstuhlversorgung geklärt ist.",
      ],
      [
        ["Akutpsychiatrie", "nicht_angeboten"],
        ["Entgiftung", "nicht_angeboten"],
        ["Gewichtsgrenze", "unbekannt"],
      ],
    ),
    settingDauer: block(
      [
        "Das Haus behandelt stationär.",
        "Regelbehandlung: 4–6 Wochen.",
        "Kurzzeit: 3–4 Wochen, soweit der Kostenträger zustimmt.",
        "Aufnahme rollierend nach Kostenzusage, keine feste Monatskohorte.",
      ],
      [
        ["Stationär", "vorhanden"],
        ["Ganztägig ambulant", "nicht_angeboten"],
        ["Adaption", "nicht_angeboten"],
        ["Warteliste", "vorhanden"],
      ],
    ),
    wohnenAlltag: block(
      [
        "Wohnen: Einbettzimmer mit Nasszelle als Regelfall.",
        "Verpflegung: gemeinsame Mahlzeiten im Speisesaal.",
        "Alltag: Gruppen am Vormittag, Ruhezeiten, Ausgang nach Absprache.",
        "Handy: Nutzung in geregelten Zeiten.",
        "Rauchen: ausgewiesene Außenplätze.",
      ],
      [
        ["Einbettzimmer", "vorhanden"],
        ["Barrierearm", "vorhanden"],
        ["Rauchen", "eingeschraenkt"],
      ],
    ),
    kinderFamilie: block(
      [
        "Das Haus ist gemischt.",
        "Angehörigenseminar einmal je Belegungszyklus.",
        "Kinderplätze werden nicht vorgehalten.",
        "Paare werden nicht gemeinsam aufgenommen.",
      ],
      [
        ["Gemischtes Haus", "vorhanden"],
        ["Angehörigenarbeit", "vorhanden"],
        ["Kinderplätze", "nicht_angeboten"],
        ["Eltern-Kind", "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        "Therapie: Einzel- und Gruppengespräche, körper- und kreativtherapeutische Verfahren.",
        "Das Haus arbeitet psychodynamisch und verhaltenstherapeutisch informiert.",
        "Bezugspflege und wöchentliche Teambesprechung sind vorgesehen.",
        "Lohklar legt kein Verfahren fest.",
      ],
      [
        ["Einzeltherapie", "vorhanden"],
        ["Gruppentherapie", "vorhanden"],
        ["Kreativtherapie", "vorhanden"],
        ["MBOR", "unbekannt"],
      ],
    ),
    medizin: block(
      [
        "Das Haus hält eine psychosomatisch-ärztliche Besetzung vor.",
        "Medikation wird hausärztlich-fachärztlich im Haus geführt, nicht durch Lohklar.",
        "Pflegebedarf jenseits der Reha-Pflege ist ein Aufnahmefilter.",
        "Somatische Mitbehandlung: Angabe zur Intensivpflege liegt nicht vor.",
      ],
      [
        ["Ärztliche Visite", "vorhanden"],
        ["Reha-Pflege", "vorhanden"],
        ["Entzug", "nicht_angeboten"],
      ],
    ),
    sozialdienst: block(
      [
        "Der Klinik-Sozialdienst klärt Kostenträgerfragen im Haus.",
        "Entlassbericht geht an Überweisende.",
        "Empfohlen werden ambulante Psychotherapie oder Reha-Nachsorge.",
        "Ein eigenes Wohnheim wird nicht betrieben.",
      ],
      [
        ["Entlassmanagement", "vorhanden"],
        ["IRENA / Nachsorge", "eingeschraenkt"],
        ["Wohnheim", "nicht_angeboten"],
      ],
    ),
    kostentraeger: block(
      [
        "Zugang über DRV und GKV nach Kostenzusage.",
        "AHB nach Krankenhaus ist vorgesehen.",
        "Voraussetzung: ärztliche Unterlagen, keine offene Entgiftung.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", "vorhanden"],
        ["GKV", "vorhanden"],
        ["AHB", "vorhanden"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [
        "Das Haus liegt in einem Park am Seeufer.",
        "Das Haus führt barrierearme Pavillons.",
        "Das Haus hat AHB-Erfahrung in der Psychosomatik.",
      ],
      [
        ["Seelage", "vorhanden"],
        ["Barrierearm", "vorhanden"],
      ],
    ),
  }),
  "ck-nordlicht": profile({
    indikation: block(
      [
        "Aufgenommen werden Personen in der Entwöhnung nach abgeschlossenem Entzug.",
        "Das Haus arbeitet zu Alkohol, Drogen, Medikamenten und Glücksspiel.",
        "Aufgenommen werden Versicherte mit Kostenzusage zur medizinischen Reha.",
        "Das Haus ist abstinenzorientiert.",
      ],
      [
        ["Sucht", "vorhanden"],
        ["Glücksspiel", "vorhanden"],
        ["Dualdiagnose", "nicht_angeboten"],
        ["Psychosomatik", "nicht_angeboten"],
      ],
    ),
    kontraindikation: block(
      [
        "Nicht aufgenommen werden Personen im akuten Entzug.",
        "Nicht aufgenommen werden Personen in offener Substitution.",
        "Nicht aufgenommen werden Personen bei unbehandelter schwerer Psychose.",
        "Aufnahme nur nach qualifiziertem Entzug.",
      ],
      [
        ["Entgiftung", "nicht_angeboten"],
        ["Substitution", "nicht_angeboten"],
        ["Akutpsychiatrie", "nicht_angeboten"],
      ],
    ),
    settingDauer: block(
      [
        "Das Haus behandelt stationär.",
        "Regelbehandlung: 12–16 Wochen.",
        "Kurzzeit als Regelangebot: Angabe liegt nicht vor.",
        "Aufnahme über Warteliste nach Kostenzusage.",
      ],
      [
        ["Stationär", "vorhanden"],
        ["Ganztägig ambulant", "nicht_angeboten"],
        ["Adaption", "nicht_angeboten"],
      ],
    ),
    wohnenAlltag: block(
      [
        "Wohnen: Zwei- und Einbettzimmer.",
        "Alltag: strukturierter Wochentagsplan, Ausgang nach Phase.",
        "Handy: in den ersten Wochen geregelt.",
        "Verpflegung: gemeinsamer Speisesaal.",
        "Rauchen: ausgewiesene Flächen.",
      ],
      [
        ["Einbettzimmer", "eingeschraenkt"],
        ["Barrierefreiheit", "nicht_angeboten"],
      ],
    ),
    kinderFamilie: block(
      [
        "Das Haus ist gemischt.",
        "Monatlicher Angehörigenabend.",
        "Kinderbetreuung wird nicht angeboten.",
        "Paare: getrennte Aufnahme, kein Paarsetting.",
      ],
      [
        ["Gemischtes Haus", "vorhanden"],
        ["Angehörigenarbeit", "vorhanden"],
        ["Kinderplätze", "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        "Therapie: Bezugsgruppe, Einzelgespräche, Rückfallanalyse, Arbeitstherapie.",
        "Das Haus führt ein Glücksspielmodul.",
        "Sport und Arbeitstherapie sind vorgesehen.",
        "Lohklar legt kein Verfahren fest.",
      ],
      [
        ["Bezugsgruppe", "vorhanden"],
        ["Arbeitstherapie", "vorhanden"],
        ["Glücksspielmodul", "vorhanden"],
      ],
    ),
    medizin: block(
      [
        "Das Haus hält suchtmedizinische Visite vor.",
        "Entzug findet nicht im Haus statt.",
        "Substitution wird nicht fortgeführt.",
        "Pflegegrad-Grenze: Angabe liegt nicht vor.",
      ],
      [
        ["Suchtmedizin", "vorhanden"],
        ["Substitution", "nicht_angeboten"],
        ["Entzug", "nicht_angeboten"],
      ],
    ),
    sozialdienst: block(
      [
        "Der Sozialdienst vermittelt in Suchtberatung.",
        "Adaption wird empfohlen, wo angezeigt — ohne Platzgarantie.",
        "Selbsthilfe wird benannt, nicht verordnet.",
      ],
      [
        ["Suchtberatung", "vorhanden"],
        ["Adaption", "eingeschraenkt"],
      ],
    ),
    kostentraeger: block(
      [
        "Zugang über DRV/GKV nach Kostenzusage zur Entwöhnung.",
        "Voraussetzung: abgeschlossener Entzug.",
        "AHB ist nicht der Schwerpunkt.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", "vorhanden"],
        ["GKV", "vorhanden"],
        ["AHB", "nicht_angeboten"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [
        "Das Haus führt Glücksspielkompetenz.",
        "Das Haus liegt im norddeutschen Einzugsgebiet.",
        "Das Haus arbeitet mit längerer Entwöhnungsdauer.",
      ],
      [
        ["Glücksspiel", "vorhanden"],
      ],
    ),
  }),
  "ck-auwald": profile({
    indikation: block(
      [
        "Aufgenommen werden Personen mit dualem Bedarf (Sucht plus psychische Erkrankung), soweit stabilisiert.",
        "Das Haus arbeitet zu Alkohol, Drogen, Depression, Angst und Traumafolgen.",
        "Aufgenommen werden Versicherte mit Kostenzusage, nicht in der Akutpsychiatrie.",
      ],
      [
        ["Dualdiagnose", "vorhanden"],
        ["Sucht", "vorhanden"],
        ["Trauma-Modul", "eingeschraenkt"],
        ["Eltern-Kind", "nicht_angeboten"],
      ],
    ),
    kontraindikation: block(
      [
        "Nicht aufgenommen werden Personen in akuter Psychose.",
        "Nicht aufgenommen werden Personen bei akuter Suizidalität mit Bedarf nach geschlossener Station.",
        "Nicht aufgenommen werden Personen im aktuellen Entzug.",
        "Aufnahme nur nach Stabilisierung.",
      ],
      [
        ["Akutpsychiatrie", "nicht_angeboten"],
        ["Entgiftung", "nicht_angeboten"],
        ["Geschlossene Station", "nicht_angeboten"],
      ],
    ),
    settingDauer: block(
      [
        "Das Haus behandelt stationär.",
        "Regelbehandlung: 8–14 Wochen.",
        "Aufnahme über Warteliste; Dualplätze sind eng.",
      ],
      [
        ["Stationär", "vorhanden"],
        ["Ganztägig ambulant", "nicht_angeboten"],
        ["Warteliste", "vorhanden"],
      ],
    ),
    wohnenAlltag: block(
      [
        "Wohnen: kleine Gruppen, begrenzte Reize.",
        "Alltag: viel Struktur, Ausgang stufenweise.",
        "Das Gelände ist hügelig.",
        "Rauchen: Angabe zur Hausregel liegt nicht detailliert vor.",
      ],
      [
        ["Reizarmut", "vorhanden"],
        ["Barrierefreiheit", "nicht_angeboten"],
      ],
    ),
    kinderFamilie: block(
      [
        "Das Haus ist gemischt.",
        "Familiengespräche nach Einschätzung des Teams.",
        "Kinderplätze werden nicht angeboten.",
      ],
      [
        ["Gemischtes Haus", "vorhanden"],
        ["Angehörigenarbeit", "eingeschraenkt"],
        ["Kinderplätze", "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        "Therapie: parallele Bearbeitung von Sucht und psychischer Belastung.",
        "Skills, Psychoedukation, behutsames Traumamodul.",
        "Medikamentöse Einstellung nur über die Ärzt:innen des Hauses.",
      ],
      [
        ["Dualbehandlung", "vorhanden"],
        ["Skills", "vorhanden"],
        ["Traumamodul", "eingeschraenkt"],
      ],
    ),
    medizin: block(
      [
        "Psychiatrisches Konsil im Haus.",
        "Keine Akutpsychiatrie.",
        "Entzug nicht im Haus.",
        "Pflegegrad-Grenze: Angabe liegt nicht vor.",
      ],
      [
        ["Psychiatriekonsil", "vorhanden"],
        ["Akutpsychiatrie", "nicht_angeboten"],
      ],
    ),
    sozialdienst: block(
      [
        "Empfehlung an Institutsambulanz, Suchtberatung und niedergelassene Psychiatrie.",
        "Keine eigene Wohnform.",
      ],
      [
        ["Entlassmanagement", "vorhanden"],
        ["Wohnform", "nicht_angeboten"],
      ],
    ),
    kostentraeger: block(
      [
        "Heilverfahren nach Kostenzusage.",
        "AHB ist nicht der Schwerpunkt.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", "vorhanden"],
        ["GKV", "vorhanden"],
        ["AHB", "nicht_angeboten"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [
        "Das Haus hat einen engen Dual-Fokus.",
        "Das Haus führt ein Traumamodul.",
        "Das Haus hat eine kleine Platzzahl.",
      ],
      [
        ["Dual-Fokus", "vorhanden"],
        ["Kleine Platzzahl", "vorhanden"],
      ],
    ),
  }),
  "ck-weserblick": profile({
    indikation: block(
      [
        "Aufgenommen werden Personen in AHB und Heilverfahren psychosomatischer Indikation.",
        "Das Haus arbeitet zu Depression, Angst, Erschöpfung und Schmerz.",
        "Aufgenommen werden Versicherte nach Kostenzusage und ärztlichen Unterlagen.",
      ],
      [
        ["Psychosomatik", "vorhanden"],
        ["AHB", "vorhanden"],
        ["Sucht-Entwöhnung", "nicht_angeboten"],
        ["Dualdiagnose", "nicht_angeboten"],
      ],
    ),
    kontraindikation: block(
      [
        "Nicht aufgenommen werden Personen zur Entwöhnung.",
        "Nicht aufgenommen werden Personen mit Bedarf nach Dualbehandlung als Schwerpunkt.",
        "Nicht aufgenommen werden Personen mit Pflegebedarf jenseits der Reha-Pflege.",
      ],
      [
        ["Entwöhnung", "nicht_angeboten"],
        ["Geschlossene Führung", "nicht_angeboten"],
      ],
    ),
    settingDauer: block(
      [
        "Das Haus behandelt stationär.",
        "Regelbehandlung: 3–5 Wochen.",
        "Kurzzeit entspricht der AHB-üblichen Spanne.",
        "Aufnahme rollierend.",
      ],
      [
        ["Stationär", "vorhanden"],
        ["AHB-Takt", "vorhanden"],
        ["Ganztägig ambulant", "nicht_angeboten"],
      ],
    ),
    wohnenAlltag: block(
      [
        "Wohnen: überwiegend Zwei-Bett-Zimmer, Einbettzimmer nach Verfügbarkeit.",
        "Verpflegung: Speisesaal.",
        "Alltag: standardisiertes AHB-Programm.",
      ],
      [
        ["Zwei-Bett-Zimmer", "vorhanden"],
        ["Barrierefrei", "vorhanden"],
      ],
    ),
    kinderFamilie: block(
      [
        "Das Haus ist gemischt.",
        "Keine eigene Angehörigenwoche.",
        "Besuche nach Hausregeln.",
        "Kinderplätze: nicht angeboten.",
      ],
      [
        ["Gemischtes Haus", "vorhanden"],
        ["Angehörigenarbeit", "nicht_angeboten"],
        ["Kinderplätze", "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        "Therapie: AHB-Standard, Gruppen, Physio, Psychoedukation.",
        "Vertiefte Traumatherapie ist nicht der Schwerpunkt.",
      ],
      [
        ["Gruppentherapie", "vorhanden"],
        ["Physiotherapie", "vorhanden"],
        ["Traumatherapie", "nicht_angeboten"],
      ],
    ),
    medizin: block(
      [
        "Ärztliche Reha-Visite im größeren Zentrum.",
        "Keine Entwöhnung, keine Dual-Intensivbehandlung.",
        "Pflege: Reha-Pflege, nicht Langzeitpflege.",
      ],
      [
        ["Reha-Medizin", "vorhanden"],
        ["Entzug", "nicht_angeboten"],
      ],
    ),
    sozialdienst: block(
      [
        "AHB-Nachsorgeempfehlung, IRENA wo möglich.",
        "Keine Wohnungslosenhilfe im Haus.",
      ],
      [
        ["IRENA", "eingeschraenkt"],
        ["Wohnungslosenhilfe", "nicht_angeboten"],
      ],
    ),
    kostentraeger: block(
      [
        "DRV-Zentrum, AHB und Heilverfahren.",
        "GKV nach Kostenzusage.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", "vorhanden"],
        ["GKV", "vorhanden"],
        ["AHB", "vorhanden"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [
        "Das Haus hat viele AHB-Plätze.",
        "Das Haus ist barrierefrei erschlossen.",
        "Das Haus liegt in einer Kurstadt.",
      ],
      [
        ["AHB-Kapazität", "vorhanden"],
        ["Barrierefrei", "vorhanden"],
      ],
    ),
  }),
  "ck-bergstrasse": profile({
    indikation: block(
      [
        "Aufgenommen werden Männer in der Entwöhnung nach Entzug.",
        "Das Haus arbeitet zu Alkohol, Drogen und Medikamenten.",
        "Aufgenommen werden Versicherte mit Kostenzusage.",
      ],
      [
        ["Sucht", "vorhanden"],
        ["Männerhaus", "vorhanden"],
        ["Dualdiagnose", "nicht_angeboten"],
      ],
    ),
    kontraindikation: block(
      [
        "Nicht aufgenommen werden Frauen.",
        "Nicht aufgenommen werden Personen in Substitution.",
        "Nicht aufgenommen werden Personen mit Rollstuhlbedarf ohne barrierefreien Zugang.",
        "Kein Dual-Schwerpunkt.",
      ],
      [
        ["Frauenplätze", "nicht_angeboten"],
        ["Substitution", "nicht_angeboten"],
        ["Barrierefreiheit", "nicht_angeboten"],
      ],
    ),
    settingDauer: block(
      [
        "Das Haus behandelt stationär.",
        "Regelbehandlung: 12–15 Wochen.",
        "Aufnahme nach Kostenzusage.",
      ],
      [
        ["Stationär", "vorhanden"],
        ["Ganztägig ambulant", "nicht_angeboten"],
      ],
    ),
    wohnenAlltag: block(
      [
        "Wohnen: Zwei-Bett-Zimmer.",
        "Alltag: Sport und Arbeitstherapie, Gemeinschaftsküche am Wochenende nach Phase.",
        "Hanglage mit Stufen.",
      ],
      [
        ["Zwei-Bett-Zimmer", "vorhanden"],
        ["Barrierefreiheit", "nicht_angeboten"],
      ],
    ),
    kinderFamilie: block(
      [
        "Das Haus ist männerspezifisch.",
        "Partnerinnentag einmal pro Zyklus.",
        "Kinderplätze werden nicht angeboten.",
      ],
      [
        ["Männerspezifisch", "vorhanden"],
        ["Angehörigenarbeit", "vorhanden"],
        ["Kinderplätze", "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        "Therapie: Bezugsgruppe, Einzel, Sport, Arbeitstherapie.",
        "Themen Gewalt, Vaterschaft, Arbeit in der Gruppe.",
      ],
      [
        ["Männerspezifische Gruppe", "vorhanden"],
        ["Sport", "vorhanden"],
      ],
    ),
    medizin: block(
      [
        "Suchtmedizinische Begleitung im Haus.",
        "Keine Substitution.",
        "Pflegegrad-Grenze: Angabe liegt nicht vor.",
      ],
      [
        ["Suchtmedizin", "vorhanden"],
        ["Substitution", "nicht_angeboten"],
      ],
    ),
    sozialdienst: block(
      [
        "Anbindung an Suchtberatung und Männergruppen.",
        "Adaption nach Verfügbarkeit Dritter.",
      ],
      [
        ["Suchtberatung", "vorhanden"],
        ["Adaption", "eingeschraenkt"],
      ],
    ),
    kostentraeger: block(
      [
        "Heilverfahren Entwöhnung nach Kostenzusage.",
        "AHB nicht vorgesehen.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", "vorhanden"],
        ["GKV", "vorhanden"],
        ["AHB", "nicht_angeboten"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [
        "Das Haus ist geschlechtsspezifisch für Männer.",
        "Das Haus liegt in Hanglage an der Bergstraße.",
        "Das Haus führt einen Sportfokus.",
      ],
      [
        ["Männerhaus", "vorhanden"],
        ["Sportfokus", "vorhanden"],
      ],
    ),
  }),
  "ck-elbmarsch": profile({
    indikation: block(
      [
        "Aufgenommen werden Frauen in der Entwöhnung nach Entzug.",
        "Das Haus arbeitet trauma-sensibel zu Alkohol, Drogen und Medikamenten.",
        "Kinderplätze nur nach vorheriger Absprache und Kapazität.",
      ],
      [
        ["Sucht", "vorhanden"],
        ["Frauenhaus", "vorhanden"],
        ["Kinderplätze", "eingeschraenkt"],
        ["Trauma-sensibel", "vorhanden"],
      ],
    ),
    kontraindikation: block(
      [
        "Nicht aufgenommen werden Männer.",
        "Nicht aufgenommen werden Personen in akuter Entgiftung.",
        "Nicht aufgenommen werden Personen in offener Substitution.",
        "Nicht aufgenommen werden Personen mit unbegleiteter schwerer Pflege.",
      ],
      [
        ["Männerplätze", "nicht_angeboten"],
        ["Entgiftung", "nicht_angeboten"],
        ["Substitution", "nicht_angeboten"],
      ],
    ),
    settingDauer: block(
      [
        "Das Haus behandelt stationär.",
        "Regelbehandlung: 12–16 Wochen.",
        "Kinderplätze nie als Selbstverständlichkeit planen.",
      ],
      [
        ["Stationär", "vorhanden"],
        ["Ganztägig ambulant", "nicht_angeboten"],
      ],
    ),
    wohnenAlltag: block(
      [
        "Wohnen: Einzelzimmer bevorzugt.",
        "Kinderbetreuung tagsüber, keine Schule im Haus.",
        "Ebene Wege, Innenhof mit Spielbereich.",
      ],
      [
        ["Einzelzimmer", "vorhanden"],
        ["Barrierearm", "vorhanden"],
      ],
    ),
    kinderFamilie: block(
      [
        "Das Haus ist frauenspezifisch.",
        "Kinderbetreuung in begrenzter Zahl.",
        "Angehörigenseminar, getrennte Formate für Partner und Herkunftsfamilie.",
        "Paaraufnahme: nicht angeboten.",
      ],
      [
        ["Frauenspezifisch", "vorhanden"],
        ["Kinderbetreuung", "eingeschraenkt"],
        ["Eltern-Kind", "eingeschraenkt"],
        ["Paare", "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        "Therapie: frauenspezifische Gruppen, trauma-sensible Stabilisierung, Körperarbeit, Elternmodul.",
        "Keine Konfrontationskultur.",
      ],
      [
        ["Frauenspezifische Therapie", "vorhanden"],
        ["Elternmodul", "vorhanden"],
      ],
    ),
    medizin: block(
      [
        "Suchtmedizinische Begleitung.",
        "Keine offene Substitution.",
        "Pflege: Reha-Rahmen, keine schwere unbegleitete Pflege.",
      ],
      [
        ["Suchtmedizin", "vorhanden"],
        ["Substitution", "nicht_angeboten"],
      ],
    ),
    sozialdienst: block(
      [
        "Vermittlung in frauenspezifische Beratung.",
        "Jugendhilfe, wo Kinder betroffen sind.",
        "Wohnformen nach Kapazität Dritter.",
      ],
      [
        ["Jugendhilfe-Kooperation", "eingeschraenkt"],
        ["Wohnform", "nicht_angeboten"],
      ],
    ),
    kostentraeger: block(
      [
        "Heilverfahren Entwöhnung nach Kostenzusage.",
        "AHB nicht vorgesehen.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", "vorhanden"],
        ["GKV", "vorhanden"],
        ["AHB", "nicht_angeboten"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [
        "Das Haus führt Kinderbetreuung in begrenzter Zahl.",
        "Das Haus ist barrierearm.",
        "Das Haus arbeitet als Frauenschutzraum in der Entwöhnung.",
      ],
      [
        ["Kinderbetreuung", "eingeschraenkt"],
        ["Frauenspezifisch", "vorhanden"],
      ],
    ),
  }),
  "ck-rosenhoehe": profile({
    indikation: block(
      [
        "Aufgenommen werden Personen in psychosomatischer AHB und Heilverfahren.",
        "Das Haus arbeitet zu Depression, Angst, Erschöpfung und Essverhalten als Modul.",
        "Konfession ist kein Aufnahmekriterium.",
      ],
      [
        ["Psychosomatik", "vorhanden"],
        ["AHB", "vorhanden"],
        ["Essverhalten", "eingeschraenkt"],
        ["Sucht-Entwöhnung", "nicht_angeboten"],
      ],
    ),
    kontraindikation: block(
      [
        "Nicht aufgenommen werden Personen zur Entgiftung.",
        "Nicht aufgenommen werden Personen mit Dual-Schwerpunkt.",
        "Nicht aufgenommen werden Personen, die einen durchgehend barrierefreien Trakt brauchen.",
      ],
      [
        ["Entgiftung", "nicht_angeboten"],
        ["Dual-Schwerpunkt", "nicht_angeboten"],
        ["Barrierefreiheit", "eingeschraenkt"],
      ],
    ),
    settingDauer: block(
      [
        "Das Haus behandelt stationär.",
        "Regelbehandlung: 5–6 Wochen.",
        "Aufnahme nach Kostenzusage.",
      ],
      [
        ["Stationär", "vorhanden"],
        ["Ganztägig ambulant", "nicht_angeboten"],
      ],
    ),
    wohnenAlltag: block(
      [
        "Wohnen: überwiegend Einzelzimmer.",
        "Verpflegung: gemeinsame Mahlzeiten, Achtsamkeit vor dem Essen ohne Zwang.",
        "Viele Stufen, nur teilweise Aufzug.",
      ],
      [
        ["Einzelzimmer", "vorhanden"],
        ["Aufzug", "eingeschraenkt"],
      ],
    ),
    kinderFamilie: block(
      [
        "Das Haus ist gemischt.",
        "Festes Angehörigenwochenende.",
        "Kinderplätze: nicht angeboten.",
      ],
      [
        ["Gemischtes Haus", "vorhanden"],
        ["Angehörigenarbeit", "vorhanden"],
        ["Kinderplätze", "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        "Therapie: tiefenpsychologisch fundierte Gruppen, Einzel, Kunst, Körper.",
        "Seelsorge ist Angebot, kein Muss.",
      ],
      [
        ["Gruppentherapie", "vorhanden"],
        ["Kreativtherapie", "vorhanden"],
        ["Seelsorge", "vorhanden"],
      ],
    ),
    medizin: block(
      [
        "Psychosomatisch-ärztliche Visite.",
        "Keine Entwöhnung.",
        "Pflegegrad-Grenze: Angabe liegt nicht vor.",
      ],
      [
        ["Reha-Medizin", "vorhanden"],
        ["Entzug", "nicht_angeboten"],
      ],
    ),
    sozialdienst: block(
      [
        "Empfehlung ambulanter Psychotherapie, ggf. Tagesklinik.",
        "Kein Wohnheim.",
      ],
      [
        ["Entlassmanagement", "vorhanden"],
        ["Wohnheim", "nicht_angeboten"],
      ],
    ),
    kostentraeger: block(
      [
        "AHB und Heilverfahren nach Kostenzusage.",
        "Kirchlicher Träger ohne Bekehrungsauftrag.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", "vorhanden"],
        ["GKV", "vorhanden"],
        ["AHB", "vorhanden"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [
        "Das Haus führt feste Angehörigenarbeit.",
        "Das Haus liegt städtisch in Stuttgart.",
        "Das Haus bietet optionale Seelsorge.",
      ],
      [
        ["Angehörigenwochenende", "vorhanden"],
        ["Seelsorge optional", "vorhanden"],
      ],
    ),
  }),
  "ck-eifelhoehe": profile({
    indikation: block(
      [
        "Aufgenommen werden Personen in der Entwöhnung bei Alkohol, Drogen und Glücksspiel.",
        "Das Haus nutzt Distanz zum Alltag.",
        "Digitale Endgeräte in Phase 1 stark begrenzt.",
      ],
      [
        ["Sucht", "vorhanden"],
        ["Glücksspiel", "vorhanden"],
        ["Dualdiagnose", "nicht_angeboten"],
      ],
    ),
    kontraindikation: block(
      [
        "Nicht aufgenommen werden Personen in Substitution.",
        "Nicht aufgenommen werden Personen mit Bedarf nach Akutpsychiatrie.",
        "Nicht aufgenommen werden Personen, die barrierefreien Zugang brauchen.",
        "Häufige Besuchsfahrten sind schlecht zu leisten.",
      ],
      [
        ["Substitution", "nicht_angeboten"],
        ["Akutpsychiatrie", "nicht_angeboten"],
        ["Barrierefreiheit", "nicht_angeboten"],
      ],
    ),
    settingDauer: block(
      [
        "Das Haus behandelt stationär.",
        "Regelbehandlung: 10–14 Wochen.",
        "Aufnahme nach Kostenzusage.",
      ],
      [
        ["Stationär", "vorhanden"],
        ["Ganztägig ambulant", "nicht_angeboten"],
      ],
    ),
    wohnenAlltag: block(
      [
        "Wohnen: einfache Zimmer.",
        "Verpflegung: gemeinsamer Speisesaal.",
        "Wochenendwanderungen, Höhenlage.",
      ],
      [
        ["Natursetting", "vorhanden"],
        ["Barrierefreiheit", "nicht_angeboten"],
      ],
    ),
    kinderFamilie: block(
      [
        "Das Haus ist gemischt.",
        "Ein Angehörigenwochenende, Online-Infoabend für weit entfernte Familien.",
        "Kinderplätze: nicht angeboten.",
      ],
      [
        ["Gemischtes Haus", "vorhanden"],
        ["Angehörigenarbeit", "vorhanden"],
        ["Kinderplätze", "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        "Therapie: klassische Entwöhnung plus Glücksspielgruppe.",
        "Schuldenberatung in Kooperation, Naturgruppe.",
      ],
      [
        ["Glücksspielmodul", "vorhanden"],
        ["Naturgruppe", "vorhanden"],
      ],
    ),
    medizin: block(
      [
        "Suchtmedizinische Begleitung.",
        "Keine Substitution.",
        "Pflegegrad-Grenze: Angabe liegt nicht vor.",
      ],
      [
        ["Suchtmedizin", "vorhanden"],
        ["Substitution", "nicht_angeboten"],
      ],
    ),
    sozialdienst: block(
      [
        "Anbindung an Suchtberatung und Spielersuchtberatung.",
        "Selbsthilfe wird benannt.",
      ],
      [
        ["Spielersuchtberatung", "vorhanden"],
      ],
    ),
    kostentraeger: block(
      [
        "Heilverfahren Entwöhnung nach Kostenzusage.",
        "AHB nicht vorgesehen.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", "vorhanden"],
        ["GKV", "vorhanden"],
        ["AHB", "nicht_angeboten"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [
        "Das Haus führt Glücksspiel als eigenen Behandlungsstrang.",
        "Das Haus liegt mit Distanz zum Ballungsraum.",
        "Das Haus arbeitet im Natursetting.",
      ],
      [
        ["Glücksspiel", "vorhanden"],
        ["Natursetting", "vorhanden"],
      ],
    ),
  }),
  "ck-lichtblick": profile({
    indikation: block(
      [
        "Aufgenommen werden Personen mit dualem Bedarf, soweit stabilisiert.",
        "Das Haus arbeitet städtisch alltagsnah.",
        "Kein Traumafokus als Hauptmodul.",
      ],
      [
        ["Dualdiagnose", "vorhanden"],
        ["Sucht", "vorhanden"],
        ["Traumafokus", "nicht_angeboten"],
      ],
    ),
    kontraindikation: block(
      [
        "Nicht aufgenommen werden Personen zur Entgiftung.",
        "Nicht aufgenommen werden Personen mit Bedarf nach geschlossener Unterbringung.",
        "Kein Glücksspielschwerpunkt, keine Kinder.",
      ],
      [
        ["Entgiftung", "nicht_angeboten"],
        ["Geschlossene Station", "nicht_angeboten"],
        ["Kinderplätze", "nicht_angeboten"],
      ],
    ),
    settingDauer: block(
      [
        "Das Haus behandelt stationär.",
        "Regelbehandlung: 8–12 Wochen.",
        "Ausgang in die Stadt ab Phase 2.",
      ],
      [
        ["Stationär", "vorhanden"],
        ["Ganztägig ambulant", "nicht_angeboten"],
      ],
    ),
    wohnenAlltag: block(
      [
        "Wohnen: barrierefreie Zimmer vorhanden.",
        "Alltag: städtisches Übungsfeld, nicht Kurpark.",
        "Verpflegung: Speisesaal.",
      ],
      [
        ["Barrierefrei", "vorhanden"],
        ["Stadtnähe", "vorhanden"],
      ],
    ),
    kinderFamilie: block(
      [
        "Das Haus ist gemischt.",
        "Keine eigene Angehörigenwoche.",
        "Einzelne Familiengespräche nach Kapazität.",
        "Kinderplätze: nicht angeboten.",
      ],
      [
        ["Gemischtes Haus", "vorhanden"],
        ["Angehörigenarbeit", "eingeschraenkt"],
        ["Kinderplätze", "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        "Therapie: Dualgruppe, Skills, Psychoedukation, Sozialberatung zu Wohnen und Jobcenter.",
      ],
      [
        ["Dualgruppe", "vorhanden"],
        ["Skills", "vorhanden"],
        ["Traumamodul", "nicht_angeboten"],
      ],
    ),
    medizin: block(
      [
        "Psychiatrische Visite im Haus.",
        "Keine Entgiftung.",
        "Pflegegrad-Grenze: Angabe liegt nicht vor.",
      ],
      [
        ["Psychiatrische Visite", "vorhanden"],
        ["Entgiftung", "nicht_angeboten"],
      ],
    ),
    sozialdienst: block(
      [
        "Anbindung an Sucht- und psychiatrische Versorgung vor Ort.",
        "Wohnungslosenhilfe wo nötig, nicht im Haus.",
      ],
      [
        ["Sozialberatung", "vorhanden"],
        ["Wohnungslosenhilfe", "eingeschraenkt"],
      ],
    ),
    kostentraeger: block(
      [
        "Heilverfahren nach Kostenzusage.",
        "AHB nicht Schwerpunkt.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", "vorhanden"],
        ["GKV", "vorhanden"],
        ["AHB", "nicht_angeboten"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [
        "Das Haus liegt städtisch in Dresden.",
        "Das Haus ist barrierefrei.",
        "Das Haus arbeitet dual ohne Traumafokus.",
      ],
      [
        ["Städtisch", "vorhanden"],
        ["Barrierefrei", "vorhanden"],
      ],
    ),
  }),
  "ck-haffkueste": profile({
    indikation: block(
      [
        "Aufgenommen werden Personen in psychosomatischer AHB und Heilverfahren.",
        "Das Haus verbindet Reha mit Küstenklima — ein Setting, keine Heilslehre.",
        "Reise- und Klimatauglichkeit sind nötig.",
      ],
      [
        ["Psychosomatik", "vorhanden"],
        ["AHB", "vorhanden"],
        ["Sucht-Entwöhnung", "nicht_angeboten"],
      ],
    ),
    kontraindikation: block(
      [
        "Nicht aufgenommen werden Personen zur Sucht-Entwöhnung.",
        "Nicht aufgenommen werden Personen mit Bedarf nach Akutpsychiatrie.",
        "Weite Anreise und touristische Unruhe im Hochsommer sind zu bedenken.",
      ],
      [
        ["Entwöhnung", "nicht_angeboten"],
        ["Akutpsychiatrie", "nicht_angeboten"],
      ],
    ),
    settingDauer: block(
      [
        "Das Haus behandelt stationär.",
        "Regelbehandlung: 4–6 Wochen.",
        "Aufnahme nach Kostenzusage.",
      ],
      [
        ["Stationär", "vorhanden"],
        ["Ganztägig ambulant", "nicht_angeboten"],
      ],
    ),
    wohnenAlltag: block(
      [
        "Wohnen: viele Einzelzimmer.",
        "Verpflegung: Speisesaal.",
        "Barrierearme Wege zum Promenadenbereich.",
      ],
      [
        ["Einzelzimmer", "vorhanden"],
        ["Barrierearm", "vorhanden"],
      ],
    ),
    kinderFamilie: block(
      [
        "Das Haus ist gemischt.",
        "Besuch möglich, kein Seminar.",
        "Anreise für Angehörige oft weit.",
        "Kinderplätze: nicht angeboten.",
      ],
      [
        ["Gemischtes Haus", "vorhanden"],
        ["Angehörigenarbeit", "nicht_angeboten"],
        ["Kinderplätze", "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        "Therapie: Gruppen, Einzelkontingent, Physio, Klimagänge.",
        "Keine Entwöhnung, kein Dual.",
      ],
      [
        ["Gruppentherapie", "vorhanden"],
        ["Klimatherapie", "vorhanden"],
      ],
    ),
    medizin: block(
      [
        "Reha-ärztliche Visite.",
        "Keine Entwöhnung.",
        "Pflegegrad-Grenze: Angabe liegt nicht vor.",
      ],
      [
        ["Reha-Medizin", "vorhanden"],
        ["Entzug", "nicht_angeboten"],
      ],
    ),
    sozialdienst: block(
      [
        "Klassische Reha-Nachsorge, IRENA wo möglich.",
      ],
      [
        ["IRENA", "eingeschraenkt"],
      ],
    ),
    kostentraeger: block(
      [
        "AHB und Heilverfahren nach Kostenzusage.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", "vorhanden"],
        ["GKV", "vorhanden"],
        ["AHB", "vorhanden"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [
        "Das Haus liegt an der Küste.",
        "Das Haus ist barrierefrei.",
        "Das Haus hat saisonal schwankende Belegung.",
      ],
      [
        ["Küste", "vorhanden"],
        ["Barrierefrei", "vorhanden"],
      ],
    ),
  }),
  "ck-isargrund": profile({
    indikation: block(
      [
        "Aufgenommen werden Personen in der Entwöhnung, vorrangig Medikamente und Alkohol.",
        "Das Haus arbeitet langsamer als manche Drogenhäuser.",
        "Kein offenes Substitutionsprogramm.",
      ],
      [
        ["Sucht", "vorhanden"],
        ["Medikamente", "vorhanden"],
        ["Substitution", "nicht_angeboten"],
      ],
    ),
    kontraindikation: block(
      [
        "Nicht aufgenommen werden Personen mit illegalen Drogen als Hauptfokus.",
        "Nicht aufgenommen werden Personen in Substitution.",
        "Keine Dual-Akutbehandlung.",
      ],
      [
        ["Drogen als Hauptfokus", "nicht_angeboten"],
        ["Substitution", "nicht_angeboten"],
      ],
    ),
    settingDauer: block(
      [
        "Das Haus behandelt stationär.",
        "Regelbehandlung: 10–13 Wochen.",
        "Aufnahme nach Kostenzusage.",
      ],
      [
        ["Stationär", "vorhanden"],
        ["Ganztägig ambulant", "nicht_angeboten"],
      ],
    ),
    wohnenAlltag: block(
      [
        "Wohnen: hoher Einzelzimmeranteil.",
        "Alltag: Ruhezeiten, wenig Reiz.",
        "Ebene Wege, barrierefrei.",
      ],
      [
        ["Einzelzimmer", "vorhanden"],
        ["Barrierefrei", "vorhanden"],
      ],
    ),
    kinderFamilie: block(
      [
        "Das Haus ist gemischt.",
        "Angehörigentag, Infos zu Medikamentenabhängigkeit für Familien.",
        "Kinderplätze: nicht angeboten.",
      ],
      [
        ["Gemischtes Haus", "vorhanden"],
        ["Angehörigenarbeit", "vorhanden"],
        ["Kinderplätze", "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        "Therapie: Medikamentengruppe, Schmerzbewältigung.",
        "Absetzen nur unter ärztlicher Verantwortung im Haus — nicht durch Lohklar.",
      ],
      [
        ["Medikamentenentwöhnung", "vorhanden"],
        ["Schmerzgruppe", "vorhanden"],
      ],
    ),
    medizin: block(
      [
        "Ärztlich geführte Medikamentenumstellung im Haus.",
        "Keine Substitution.",
        "Pflegegrad-Grenze: Angabe liegt nicht vor.",
      ],
      [
        ["Suchtmedizin", "vorhanden"],
        ["Substitution", "nicht_angeboten"],
      ],
    ),
    sozialdienst: block(
      [
        "Schmerzambulanz-Empfehlung, Suchtberatung.",
        "Hausärztliche Abstimmung über den Entlassbericht.",
      ],
      [
        ["Entlassbericht", "vorhanden"],
      ],
    ),
    kostentraeger: block(
      [
        "Heilverfahren Entwöhnung nach Kostenzusage.",
        "AHB nicht vorgesehen.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", "vorhanden"],
        ["GKV", "vorhanden"],
        ["AHB", "nicht_angeboten"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [
        "Das Haus führt einen Medikamentenschwerpunkt.",
        "Das Haus ist barrierefrei.",
        "Das Haus liegt im Alpenvorland.",
      ],
      [
        ["Medikamentenschwerpunkt", "vorhanden"],
        ["Barrierefrei", "vorhanden"],
      ],
    ),
  }),
  "ck-spreeaue": profile({
    indikation: block(
      [
        "Aufgenommen werden Personen in der Psychosomatik, auch mit Traumafolgen.",
        "AHB und Heilverfahren.",
        "Tagesklinik nur bei belastbarer Wohnsituation in Berlin/Umland.",
      ],
      [
        ["Psychosomatik", "vorhanden"],
        ["Trauma-Modul", "vorhanden"],
        ["AHB", "vorhanden"],
        ["Sucht-Entwöhnung", "nicht_angeboten"],
      ],
    ),
    kontraindikation: block(
      [
        "Nicht aufgenommen werden Personen zur Sucht-Entwöhnung als Hauptbedarf.",
        "Nicht aufgenommen werden Personen ohne Wohnsituation in die Tagesklinik.",
        "Kinderbetreuung: nicht angeboten.",
      ],
      [
        ["Entwöhnung", "nicht_angeboten"],
        ["Wohnungslosigkeit in TK", "nicht_angeboten"],
      ],
    ),
    settingDauer: block(
      [
        "Das Haus behandelt stationär und ganztägig ambulant.",
        "Regelbehandlung: 4–8 Wochen.",
        "Wer Alltag halten kann, kann tagesklinisch einsteigen.",
      ],
      [
        ["Stationär", "vorhanden"],
        ["Ganztägig ambulant", "vorhanden"],
        ["Kombi", "vorhanden"],
      ],
    ),
    wohnenAlltag: block(
      [
        "Wohnen: kleine Gruppen, stationär im Haus.",
        "Mahlzeiten im Haus für Stationäre.",
        "Stadt als Übungsfeld, barrierefrei.",
      ],
      [
        ["Kleine Gruppen", "vorhanden"],
        ["Barrierefrei", "vorhanden"],
      ],
    ),
    kinderFamilie: block(
      [
        "Das Haus ist gemischt.",
        "Abendtermine für Angehörige.",
        "Kinderplätze: nicht angeboten.",
      ],
      [
        ["Gemischtes Haus", "vorhanden"],
        ["Angehörigenarbeit", "vorhanden"],
        ["Kinderplätze", "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        "Therapie: Skills, traumainformierte Stabilisierung, stadtnahe Exposition wo sinnvoll.",
        "Keine Entwöhnung.",
      ],
      [
        ["Skills", "vorhanden"],
        ["Traumamodul", "vorhanden"],
      ],
    ),
    medizin: block(
      [
        "Psychosomatisch-ärztliche Begleitung.",
        "Keine Entwöhnung.",
        "Pflegegrad-Grenze: Angabe liegt nicht vor.",
      ],
      [
        ["Reha-Medizin", "vorhanden"],
        ["Entzug", "nicht_angeboten"],
      ],
    ),
    sozialdienst: block(
      [
        "Berliner Versorgung: Institutsambulanz, niedergelassen, Selbsthilfe.",
      ],
      [
        ["Entlassmanagement", "vorhanden"],
      ],
    ),
    kostentraeger: block(
      [
        "AHB und Heilverfahren nach Kostenzusage.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", "vorhanden"],
        ["GKV", "vorhanden"],
        ["AHB", "vorhanden"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [
        "Das Haus führt Tagesklinik plus Station.",
        "Das Haus hat ein Traumamodul.",
        "Das Haus hat eine kleine Platzzahl.",
      ],
      [
        ["Kombi-Setting", "vorhanden"],
        ["Traumamodul", "vorhanden"],
      ],
    ),
  }),
  "ck-teutoburg": profile({
    indikation: block(
      [
        "Aufgenommen werden Personen in der Entwöhnung, einschließlich geplanter Substitutionsumstellung.",
        "Aufgenommen werden Personen nach Abstimmung mit abgebender Stelle und Kostenträger.",
        "Keine Neueinstellung auf Substitution zum Selbstzweck.",
      ],
      [
        ["Sucht", "vorhanden"],
        ["Substitutionsumstellung", "eingeschraenkt"],
        ["Dualdiagnose", "nicht_angeboten"],
      ],
    ),
    kontraindikation: block(
      [
        "Nicht aufgenommen werden Personen zur unkoordinierten Beendigung.",
        "Nicht aufgenommen werden Personen mit Bedarf nach Akutpsychiatrie.",
        "Eingeschränkte Barrierefreiheit.",
      ],
      [
        ["Akutpsychiatrie", "nicht_angeboten"],
        ["Barrierefreiheit", "nicht_angeboten"],
      ],
    ),
    settingDauer: block(
      [
        "Das Haus behandelt stationär.",
        "Regelbehandlung: 12–16 Wochen.",
        "Aufnahme nach Kostenzusage und Abstimmungsprotokoll.",
      ],
      [
        ["Stationär", "vorhanden"],
        ["Ganztägig ambulant", "nicht_angeboten"],
      ],
    ),
    wohnenAlltag: block(
      [
        "Wohnen: stationär, gemischt.",
        "Klare Medikamentenausgabe.",
        "Ältere Bauten, nicht durchgängig barrierefrei.",
      ],
      [
        ["Medikamentenausgabe", "vorhanden"],
        ["Barrierefreiheit", "nicht_angeboten"],
      ],
    ),
    kinderFamilie: block(
      [
        "Das Haus ist gemischt.",
        "Infoabend, Einbezug der abgebenden Ambulanz.",
        "Kinderplätze: nicht angeboten.",
      ],
      [
        ["Gemischtes Haus", "vorhanden"],
        ["Angehörigenarbeit", "vorhanden"],
        ["Kinderplätze", "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        "Therapie: klassische Entwöhnung plus ärztlich geführte Umstellung.",
        "Bezugsgruppe, Arbeitstherapie.",
      ],
      [
        ["Bezugsgruppe", "vorhanden"],
        ["Substitutionsumstellung", "eingeschraenkt"],
      ],
    ),
    medizin: block(
      [
        "Ärztlich geführte Substitutionsumstellung.",
        "Keine Neueinstellung zum Selbstzweck.",
        "Pflegegrad-Grenze: Angabe liegt nicht vor.",
      ],
      [
        ["Suchtmedizin", "vorhanden"],
        ["Substitution", "eingeschraenkt"],
      ],
    ),
    sozialdienst: block(
      [
        "Rückbindung an Substitutionsambulanz oder abstinenzorientierte Nachsorge — je nach Verlauf, vom Haus empfohlen.",
      ],
      [
        ["Ambulanz-Kooperation", "vorhanden"],
      ],
    ),
    kostentraeger: block(
      [
        "Heilverfahren nach Kostenzusage und Abstimmung mit abgebender Stelle.",
        "AHB nicht vorgesehen.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", "vorhanden"],
        ["GKV", "vorhanden"],
        ["AHB", "nicht_angeboten"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [
        "Das Haus führt Substitutionsbegleitung in einem engen Fenster.",
        "Das Haus liegt in einem westfälischen Kurort.",
      ],
      [
        ["Substitutionsumstellung", "eingeschraenkt"],
      ],
    ),
  }),
  "ck-mainbogen": profile({
    indikation: block(
      [
        "Aufgenommen werden Personen mit dualem Bedarf und Stabilisierungsfähigkeit.",
        "Das Haus arbeitet zu Alkohol, Drogen, Depression und Traumafolgen.",
        "Keine Akuttraumatisierung der letzten Tage.",
      ],
      [
        ["Dualdiagnose", "vorhanden"],
        ["Trauma-Stabilisierung", "vorhanden"],
        ["Jugend", "nicht_angeboten"],
      ],
    ),
    kontraindikation: block(
      [
        "Nicht aufgenommen werden Personen, die barrierefreien Zugang brauchen.",
        "Nicht aufgenommen werden Personen zur Entgiftung.",
        "Nicht aufgenommen werden Personen mit Bedarf nach geschlossener Station.",
        "Keine Kinder.",
      ],
      [
        ["Barrierefreiheit", "nicht_angeboten"],
        ["Entgiftung", "nicht_angeboten"],
        ["Geschlossene Station", "nicht_angeboten"],
      ],
    ),
    settingDauer: block(
      [
        "Das Haus behandelt stationär.",
        "Regelbehandlung: 8–13 Wochen.",
        "Kleine Platzzahl, oft längere Schätzspannen.",
      ],
      [
        ["Stationär", "vorhanden"],
        ["Ganztägig ambulant", "nicht_angeboten"],
      ],
    ),
    wohnenAlltag: block(
      [
        "Wohnen: kleine Wohngruppen, Abendruhe.",
        "Altbau, Stockwerke ohne durchgehenden Aufzug.",
        "Stadt nah, Gelände klein.",
      ],
      [
        ["Kleine Wohngruppen", "vorhanden"],
        ["Aufzug", "nicht_angeboten"],
      ],
    ),
    kinderFamilie: block(
      [
        "Das Haus ist gemischt.",
        "Familiengespräche, Psychoedukation Dual und Trauma für Angehörige.",
        "Kinderplätze: nicht angeboten.",
      ],
      [
        ["Gemischtes Haus", "vorhanden"],
        ["Angehörigenarbeit", "vorhanden"],
        ["Kinderplätze", "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        "Therapie: Skills, Stabilisierung, suchtbezogene Gruppe, einzeltherapeutisches Kontingent.",
        "EMDR nur nach interner Indikation.",
      ],
      [
        ["Skills", "vorhanden"],
        ["Traumastabilisierung", "vorhanden"],
        ["EMDR", "eingeschraenkt"],
      ],
    ),
    medizin: block(
      [
        "Ärztlich-psychiatrische Begleitung im Dualsetting.",
        "Keine Entgiftung.",
        "Pflegegrad-Grenze: Angabe liegt nicht vor.",
      ],
      [
        ["Psychiatrische Begleitung", "vorhanden"],
        ["Entgiftung", "nicht_angeboten"],
      ],
    ),
    sozialdienst: block(
      [
        "Traumaambulanz und Suchtberatung, oft lange Wege — ehrlich im Entlassbericht benannt.",
      ],
      [
        ["Entlassbericht", "vorhanden"],
      ],
    ),
    kostentraeger: block(
      [
        "Heilverfahren nach Kostenzusage.",
        "AHB nicht Schwerpunkt.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", "vorhanden"],
        ["GKV", "vorhanden"],
        ["AHB", "nicht_angeboten"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [
        "Das Haus führt Dual plus Trauma.",
        "Das Haus hat eine kleine Platzzahl.",
        "Das Haus ist ein städtischer Altbau.",
      ],
      [
        ["Dual plus Trauma", "vorhanden"],
        ["Kleine Platzzahl", "vorhanden"],
      ],
    ),
  }),
  "ck-rothaar": profile({
    indikation: block(
      [
        "Aufgenommen werden junge Erwachsene (etwa 18–27) in der Entwöhnung nach Entzug.",
        "Das Haus arbeitet zu Alkohol, Drogen und Medien/Glücksspiel.",
        "Alter im Einzelfall das Haus fragen — nicht Lohklar.",
      ],
      [
        ["Sucht", "vorhanden"],
        ["Jugend / junge Erwachsene", "vorhanden"],
        ["Glücksspiel", "vorhanden"],
      ],
    ),
    kontraindikation: block(
      [
        "Kein Schwerpunkt älterer Versicherter.",
        "Keine Kinder, nicht barrierefrei, keine Akutpsychiatrie.",
      ],
      [
        ["Ältere Versicherte", "nicht_angeboten"],
        ["Kinderplätze", "nicht_angeboten"],
        ["Barrierefreiheit", "nicht_angeboten"],
        ["Akutpsychiatrie", "nicht_angeboten"],
      ],
    ),
    settingDauer: block(
      [
        "Das Haus behandelt stationär.",
        "Regelbehandlung: 12–16 Wochen.",
        "Weite Anreise, bewusst distanziert.",
      ],
      [
        ["Stationär", "vorhanden"],
        ["Ganztägig ambulant", "nicht_angeboten"],
      ],
    ),
    wohnenAlltag: block(
      [
        "Wohnen: Zweibettzimmer.",
        "Klare Handyregeln.",
        "Sportgelände, Schnee im Winter.",
      ],
      [
        ["Zweibettzimmer", "vorhanden"],
        ["Sportgelände", "vorhanden"],
      ],
    ),
    kinderFamilie: block(
      [
        "Das Haus ist gemischt in diesem Altersspektrum.",
        "Elternseminar, oft digital für weite Anreisen.",
        "Kinderplätze: nicht angeboten.",
      ],
      [
        ["Gemischtes Haus", "vorhanden"],
        ["Elternseminar", "vorhanden"],
        ["Kinderplätze", "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        "Therapie: Peer-Gruppe, Sport, Medien/Glücksspielmodul, Berufsorientierung.",
        "Wenig klassische Senioren-Reha-Atmosphäre.",
      ],
      [
        ["Peer-Gruppe", "vorhanden"],
        ["Sport", "vorhanden"],
        ["Glücksspielmodul", "vorhanden"],
      ],
    ),
    medizin: block(
      [
        "Suchtmedizinische Begleitung.",
        "Keine Akutpsychiatrie.",
        "Pflegegrad-Grenze: Angabe liegt nicht vor.",
      ],
      [
        ["Suchtmedizin", "vorhanden"],
        ["Akutpsychiatrie", "nicht_angeboten"],
      ],
    ),
    sozialdienst: block(
      [
        "Jugendhilfe, Suchtberatung, Ausbildungsamt — je nach Lebenslage.",
      ],
      [
        ["Jugendhilfe-Kooperation", "eingeschraenkt"],
      ],
    ),
    kostentraeger: block(
      [
        "Heilverfahren Entwöhnung nach Kostenzusage.",
        "AHB nicht vorgesehen.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", "vorhanden"],
        ["GKV", "vorhanden"],
        ["AHB", "nicht_angeboten"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [
        "Das Haus ist auf junge Erwachsene ausgerichtet.",
        "Das Haus führt Sport als festen Programmbestandteil.",
        "Das Haus liegt mit Distanz zum Heimatort.",
      ],
      [
        ["Junge Erwachsene", "vorhanden"],
        ["Sport", "vorhanden"],
      ],
    ),
  }),
  "ck-alsterufer": profile({
    indikation: block(
      [
        "Aufgenommen werden Personen in psychosomatischer AHB und Heilverfahren.",
        "Tagesklinik für Hamburg und Umland.",
        "Kein Dual-Schwerpunkt, keine Entwöhnung.",
      ],
      [
        ["Psychosomatik", "vorhanden"],
        ["AHB", "vorhanden"],
        ["Sucht-Entwöhnung", "nicht_angeboten"],
        ["Dualdiagnose", "nicht_angeboten"],
      ],
    ),
    kontraindikation: block(
      [
        "Nicht aufgenommen werden Personen zur Sucht-Entwöhnung.",
        "Nicht aufgenommen werden Personen zur Dual-Intensivbehandlung.",
        "Touristische Unruhe am Alsterufer im Sommer ist zu bedenken.",
      ],
      [
        ["Entwöhnung", "nicht_angeboten"],
        ["Dual-Intensiv", "nicht_angeboten"],
      ],
    ),
    settingDauer: block(
      [
        "Das Haus behandelt stationär und ganztägig ambulant.",
        "Regelbehandlung: 3–5 Wochen.",
        "Kurz, alltagsnah, AHB-erfahren.",
      ],
      [
        ["Stationär", "vorhanden"],
        ["Ganztägig ambulant", "vorhanden"],
        ["Kombi", "vorhanden"],
      ],
    ),
    wohnenAlltag: block(
      [
        "Wohnen: Einzelzimmer im Anbau, Altbau mit Alsterblick.",
        "Stadt und Lärm sind Teil des therapeutischen Feldes.",
        "Barrierefreier Anbau.",
      ],
      [
        ["Einzelzimmer", "vorhanden"],
        ["Barrierefrei", "vorhanden"],
      ],
    ),
    kinderFamilie: block(
      [
        "Das Haus ist gemischt.",
        "Abendtermine, gut erreichbar für Hamburger Familien.",
        "Kinderplätze: nicht angeboten.",
      ],
      [
        ["Gemischtes Haus", "vorhanden"],
        ["Angehörigenarbeit", "vorhanden"],
        ["Kinderplätze", "nicht_angeboten"],
      ],
    ),
    therapie: block(
      [
        "Therapie: Gruppen, stadtnahe Belastungserprobung, Physio.",
        "Keine Entwöhnung, kein Dual-Schwerpunkt.",
      ],
      [
        ["Gruppentherapie", "vorhanden"],
        ["Belastungserprobung", "vorhanden"],
      ],
    ),
    medizin: block(
      [
        "Psychosomatisch-ärztliche Visite.",
        "Keine Entwöhnung.",
        "Pflegegrad-Grenze: Angabe liegt nicht vor.",
      ],
      [
        ["Reha-Medizin", "vorhanden"],
        ["Entzug", "nicht_angeboten"],
      ],
    ),
    sozialdienst: block(
      [
        "Dichte Hamburger Versorgung: KV, Institutsambulanz, IRENA.",
      ],
      [
        ["IRENA", "eingeschraenkt"],
        ["Entlassmanagement", "vorhanden"],
      ],
    ),
    kostentraeger: block(
      [
        "AHB und Heilverfahren nach Kostenzusage.",
        "Beihilfe: Angabe liegt nicht vor.",
      ],
      [
        ["DRV", "vorhanden"],
        ["GKV", "vorhanden"],
        ["AHB", "vorhanden"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      [
        "Das Haus liegt in Hamburg am Alsterufer.",
        "Das Haus ist barrierefrei im Anbau.",
        "Das Haus führt eine Tagesklinikoption.",
      ],
      [
        ["Hamburg", "vorhanden"],
        ["Tagesklinik", "vorhanden"],
        ["Barrierefrei", "vorhanden"],
      ],
    ),
  }),
};
