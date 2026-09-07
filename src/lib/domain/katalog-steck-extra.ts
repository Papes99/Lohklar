/**
 * Zusätzliche, öffentlich belegte Steckbrief-Stichpunkte (Blöcke 01–10).
 * Nur Klinik-/Trägerwebsite oder Merkblatt. Nie erfinden.
 * Der Builder liest Spec-Felder zuerst, dann diesen Overlay.
 */
export type SteckExtra = {
  kontraindikationen?: string[];
  alltag?: string[];
  sozialdienstLeistungen?: string[];
  therapieHinweise?: string[];
  wahlleistungenHinweis?: string;
  mitbehandlungHinweis?: string;
  factsExtra?: string[];
};

export const STECK_EXTRA_BY_ID: Record<string, SteckExtra> = {
  "ck-adaption-birkenwerder": {
    "alltag": [
      "Apartmenthaus (Bau 2005) mit 13 Einzelapartments und vier Zwei-Raum-Apartments, jeweils mit eigener Küche und eigenem Duschbad.",
      "Im Untergeschoss Zweckräume und ein Gruppenraum; Garten am Haus.",
      "Alltagsnahes Setting: eigenständige Lebensführung, Alltagsstrukturierung und Bewältigung von Risikosituationen."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei der beruflichen Perspektive (Bildungsmaßnahme, Finanzierung oder Anstellung).",
      "Klärung der Wohnraumfrage sowie nachgehender Angebote (ambulante Nachsorge, Psychotherapie, betreutes Wohnen).",
      "Einbindung in ein unterstützendes soziales Umfeld."
    ],
    "therapieHinweise": [
      "Adaptionsdauer indikationsbezogen 12 bis 16 Wochen.",
      "Aufnahme nach abgeschlossener Entwöhnungsbehandlung bei Abhängigkeit von Drogen, Alkohol oder Glücksspiel.",
      "Adaption nach stationärer Entwöhnung der Fachklinik Briese."
    ],
    "factsExtra": [
      "Lage in direkter Nähe des S-Bahnhofs Birkenwerder mit Anbindung nach Berlin.",
      "Gleicher Träger ADV Rehabilitation und Integration gGmbH.",
      "DRV- und GKV-Anerkennung laut Trägerseite."
    ]
  },
  "ck-adaption-bremen": {
    "alltag": [
      "Modern eingerichtete Einzelapartments mit eigener Küchenzeile und Bad.",
      "Gesamtes Adaptionshaus barrierefrei; separater Wohnbereich für Frauen.",
      "WLAN, Surfstation, Aufenthalts- und Funktionsräume sowie Tischtennis-, Kicker- und Fitnessraum.",
      "Jobcenter, Erwachsenen- und Volkshochschule fußläufig; Anbindung an den Bremer Nahverkehr."
    ],
    "sozialdienstLeistungen": [
      "Externe Arbeitserprobung als verpflichtendes Praktikum von mindestens vier Wochen, intern oder eigenständig gesucht.",
      "Sozialstunden können im Praktikum abgeleistet werden; Kooperation mit regionalen Firmen.",
      "Unterstützung beim Aufbau sozialer Kontakte und sinnvoller Freizeitgestaltung."
    ],
    "therapieHinweise": [
      "Fachärztliche Versorgung, wöchentliche Gruppenangebote und Einzelgespräche.",
      "Sport-, Entspannungs- und Akupunkturangebot als Bestandteile der Behandlung.",
      "Behandlungsdauer 8–16 Wochen im Anschluss an eine stationäre Entwöhnung.",
      "Externe Adaption nach stationärer Entwöhnung."
    ],
    "factsExtra": [
      "20 Plätze für alkohol- und drogenabhängige Frauen und Männer am Wall in Bremen-Mitte.",
      "Federführend DRV Oldenburg-Bremen; Anerkennung durch DRV Bund und regionale Rentenversicherungen.",
      "deQus-zertifiziert (BAR-anerkannt).",
      "Monatliche Infoveranstaltung (jeder zweite Dienstag, 15:00 Uhr) nach Anmeldung.",
      "Therapiehilfeverbund, Standort Bremen-Mitte am Wall.",
      "Getrennt vom RehaCentrum Alt-Osterholz."
    ]
  },
  "ck-adaption-cuxhaven": {
    "factsExtra": [
      "Die Einrichtung ist nicht barrierefrei laut Trägerkonzept.",
      "Federführend DRV Braunschweig-Hannover; stationäre Regeldauer 10 Wochen.",
      "Aufnahme auch aus psychiatrischen Kliniken und forensischer Psychiatrie laut Trägerflyer."
    ],
    "mitbehandlungHinweis": "Psychische Nebendiagnosen (affektive, neurotische, Belastungs- und somatoforme Störungen, Persönlichkeits- und Verhaltensstörungen) können mitbehandelt werden; konsiliarisch niedergelassene Fachärztinnen und Fachärzte vor Ort.",
    "alltag": [
      "Appartements mit Einzelzimmern, teils mit Südbalkon; Speise-, Gruppen- und Hauswirtschaftsraum im Erdgeschoss.",
      "Fahrräder werden gestellt; Bahnhofsabholung auf Wunsch.",
      "Bewerbungs-, Arbeits- und Selbstversorgungstraining sowie externe Betriebspraktika."
    ],
    "sozialdienstLeistungen": [
      "Schwerpunkt Wiedereingliederung ins Erwerbsleben (BORA) inkl. PC-Schulung und Arbeitgebergespräche.",
      "Hilfe bei Behördengängen, Wohnungssuche und Schuldenregulierung.",
      "Vermittlung in ambulante Nachsorge; nach der Adaption 4 Plätze in abstinenten Wohngemeinschaften."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutisch orientiert, Einzel- und Gruppengespräche.",
      "Neben Adaption auch Kombinationsbehandlung (Kombi-Nord) sowie Stützungs- und Auffangbehandlung ausgewiesen."
    ]
  },
  "ck-adaption-erfurt": {
    "alltag": [
      "Zwei Wohneinheiten im Neubau: Einzelzimmer, Gemeinschaftsräume und Gemeinschaftsküchen.",
      "Gemeinschaftsräume mit Computerarbeitsplätzen und Fernseher; Zimmer für Menschen mit Einschränkungen.",
      "Lage nahe dem Erfurter Zentrum, Einkauf und Behörden zu Fuß oder mit Nahverkehr; Steigerwald direkt anschließend."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung beim Übergang von der Langzeittherapie in den eigenen Wohnraum.",
      "Arbeitstraining in einem gewählten Praktikumsbetrieb.",
      "Begleitung in der Alltagsgestaltung und in Krisensituationen."
    ],
    "therapieHinweise": [
      "Regelbehandlungszeit drei Monate; Einzel- und Gruppengespräche.",
      "Aufnahme suchterkrankter Frauen und Männer ab 18 Jahren (Drogen, Alkohol, Medikamente).",
      "Stationäre Adaption als zweite Phase nach Langzeittherapie.",
      "BtMG §§ 35/36 möglich laut Trägerseite."
    ],
    "factsExtra": [
      "16 Plätze insgesamt; Vorstellungstermin vor Aufnahme.",
      "Zur Aufnahme Kostenzusage des zuständigen Kostenträgers (Rentenversicherung, Krankenkasse, Sozialamt).",
      "Neubau mit Einzelzimmern und Gemeinschaftsküchen.",
      "Federführend DRV Mitteldeutschland."
    ]
  },
  "ck-adaption-heppenheim": {
    "alltag": [
      "Einzelzimmer; je Etage Aufenthaltsraum, Sanitärbereiche mit Dusche/Wanne/WC und Küche.",
      "Hauswirtschaftsraum mit Waschmaschine, Trockner und Bügelstation; Fahrräder zur Nutzung.",
      "PC-Raum mit Internet sowie kostenfreies WLAN im gesamten Haus."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei Betriebspraktika, Arbeitssuche und Wohnungssuche.",
      "Therapie-, Beratungs- und Freizeitprogramm."
    ],
    "therapieHinweise": [
      "14 Plätze für Männer und Frauen.",
      "Dauer 12–14 Wochen nach Absprache mit Leistungsträgern und Fachkliniken."
    ],
    "factsExtra": [
      "Fachabteilung der Klinik Schloss Falkenhof, eigener Standort Heppenheim."
    ]
  },
  "ck-adaption-lahr": {
    "alltag": [
      "Vier Wohngemeinschaften mit je sieben Zimmern; Sie wohnen im Einzelzimmer, Paar- und Familienzimmer sind ausgewiesen.",
      "Je WG ein barrierefreies Zimmer; die WG-Zusammensetzung entscheiden Rehabilitierende und Team gemeinsam.",
      "Selbstversorgung: wöchentlicher Großeinkauf, gemeinsames Essen, abends kochen die Bewohnenden im Wechsel.",
      "Stufensystem: Stufe 1 mit Alleinausgang; ab Stufe 2 Heimfahrten und Essensbefreiungen.",
      "Bettwäsche stellt und wäscht das Haus; Handtücher mitbringen. Handy außerhalb der Therapiezeiten, während der Therapie im Zimmer lassen.",
      "Nicht vorgesehen: Haustiere, E-Zigaretten, CBD-Produkte, alkoholähnliche Getränke, Waffen und Elektrogroßgeräte (z. B. Fernseher, E-Scooter)."
    ],
    "therapieHinweise": [
      "Adaption als zweite Phase nach regulär abgeschlossener suchttherapeutischer Entwöhnung.",
      "Angebote u. a. Infogruppen für Neue, lebenspraktische Fähigkeiten, Gruppen- und Einzelpsychotherapie, berufliche Orientierung, Sporttherapie, Rückenschule und Rückfallprophylaxe.",
      "Familienorientiert: Angehörigen- und Familiengespräche; Einleitung von Weiterbetreuung und Selbsthilfegruppen vor Ort.",
      "Arbeitstherapeutinnen und -therapeuten unterstützen bei Praktikumssuche, Bewerbungsunterlagen und Problemen im Praktikum.",
      "Stationäre Adaption nach Entwöhnung, städtischer Standort der Rehaklinik Freiolsheim."
    ],
    "factsExtra": [
      "Vorab Bewerbungsgespräch mit Führung durch Haus und Wohngemeinschaften.",
      "Erwerbstätigkeit frühestens vier Wochen vor Ende der Adaption. Laptop, Handy und Musikbox sind erlaubt.",
      "Ärztliche Sprechstunde zweimal wöchentlich im Haus; Rezepte und Krankmeldungen über kooperierende Hausarztpraxis.",
      "Träger AGJ Freiburg."
    ]
  },
  "ck-adaption-leipzig-wermsdorf": {
    "factsExtra": [
      "Adaptionsdauer 12–16 Wochen laut Trägerseite.",
      "Kooperation mit Firmen für Ausbildungs- und Arbeitsstellen; Schulabschluss kann nach Vorbereitung in der Fachklinik Alte Flugschule fortgesetzt werden.",
      "Aufnahme ab 16 Jahren laut Trägerseite.",
      "Kostenträger u. a. DRV Bund, DRV Mitteldeutschland, Kommunaler Sozialverband Sachsen."
    ],
    "alltag": [
      "Aufnahme auch von Schwangeren und Menschen mit Kindern; Kinderbetreuung während der Therapieangebote.",
      "Freizeit- und Sportangebote auch mit ehemaligen Klienten (u. a. Kochkurs, Basketball, Floorball, Volleyball)."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung im Umgang mit Behörden und Ämtern.",
      "Schuldensanierung, Wohnungssuche, Vermittlung in nachsorgende Angebote."
    ],
    "therapieHinweise": [
      "Gruppentherapie an einem Tag pro Woche (offene Gruppen oder Indikationsgruppen wie Rückfallprophylaxe, soziales Kompetenztraining).",
      "Mindestens einmal wöchentlich Einzelgespräch; Fokus aktuelle Lebenssituation und Berufspraktikum.",
      "Interne Leitlinie: Psychopharmaka nur bei bestätigter psychiatrischer Komorbidität, Bedarfsmedikation nicht vorgesehen."
    ]
  },
  "ck-adaption-schwerin": {
    "factsExtra": [
      "Bewerbung mit Kind oder Partner im Fragebogen vorgesehen.",
      "Berufliche Erprobung (Praktikum) als Schwerpunkt der Adaption; Vorschläge im Bewerberfragebogen erbeten.",
      "Aufnahme in der Regel nach abgeschlossener Entwöhnung; im Einzelfall auch ohne vollständig abgeschlossene klinische Entwöhnung.",
      "Besonders für Menschen mit ungünstigem sozialem Umfeld.",
      "Leitung: Facharzt für Psychiatrie und Psychotherapie sowie leitende Sozialpädagogin/Sozialtherapeutin Sucht."
    ],
    "alltag": [
      "Training von Selbstversorgung, Tagesstruktur, Kochen und eigenverantwortlicher Freizeit.",
      "Vier Säulen: Sozialbetreuung, Soziotherapie, Psychotherapie, Arbeitstherapie / berufliche Orientierung."
    ],
    "sozialdienstLeistungen": [
      "Regulierung von Schulden und justiziellen Belastungen.",
      "Beschaffung von Wohnraum nach der Adaption.",
      "Vermittlung in ambulante Nachsorge, Betreutes Wohnen und Selbsthilfe."
    ],
    "therapieHinweise": [
      "Erprobung der in der Entwöhnung erlernten Strategien unter alltagsrealistischen Bedingungen.",
      "Bearbeitung noch bestehender psychischer Probleme im Adaptionsrahmen."
    ]
  },
  "ck-adaption-weimar": {
    "alltag": [
      "Villa mit acht Plätzen: sechs Einzel- und ein Doppelzimmer, Gemeinschaftsräume und Küche.",
      "Computerarbeitsplätze und Fernseher in den Gruppenräumen.",
      "Lage nahe Stadtzentrum und Stadtpark (Berkaer Straße 19); Einkauf und Behörden zu Fuß oder mit dem Nahverkehr.",
      "Regelbehandlungszeit drei Monate laut Trägerseite."
    ],
    "sozialdienstLeistungen": [
      "Arbeitstraining in einem von Ihnen gewählten Praktikumsbetrieb.",
      "Unterstützung bei Alltagsgestaltung, in Krisensituationen und bei der Wiedereingliederung ins Berufsleben."
    ],
    "therapieHinweise": [
      "Stationäre Adaption nach Entwöhnung im SiT-Verbund."
    ],
    "factsExtra": [
      "Ergänzt die Adaption Erfurt."
    ]
  },
  "ck-adv-f42": {
    "kontraindikationen": [
      "Psychose in der akuten Phase (nach Abklingen der Akutphase kein Ausschluss)."
    ],
    "alltag": [
      "32 Plätze in Wohngruppen; Frauen in einem eigenen Bereich.",
      "Adaption: bis zu 10 Einzelappartements (30–40 m²) mit Bad und Küche.",
      "Selbstversorgung; in den ersten vier Wochen vormittags Starterprogramm, danach Arbeits-Ergotherapie.",
      "Offene Informationsveranstaltung zur Entwöhnung dienstags 16 Uhr in der Ladenwohnung."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei Behörden, Schulden, Schulabschlüssen und Wohnungssuche.",
      "Berufscoaching und Hilfe bei Bewerbungsunterlagen; Zusammenarbeit mit Jobcentern.",
      "Nachsorgevermittlung, interne Selbsthilfegruppe und Angehörigengespräche."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutisches Konzept mit Bezugsgruppe; Dauer individuell bis zu sechs Monaten, Adaption vier Monate im Haus.",
      "Substitutionsgestützte Rehabilitation mit individuellem Abdosierungsschema, gemeinsam mit nicht substituierten Rehabilitandinnen und Rehabilitanden.",
      "Indikative Gruppen u. a. Trauma und Sucht sowie Selbstwert und Rückfallprophylaxe.",
      "Anerkannt nach §§ 35/36 BtMG; auch Aufnahme nach Entwöhnung in einem anderen Haus.",
      "Stationäre Rehabilitation, Adaption und Substitutionsbehandlung im ADV-Verbund.",
      "Interkulturelle Suchthilfe ADV Nokta."
    ],
    "factsExtra": [
      "Berliner Wohnhaus in Neukölln, Flughafenstraße 42; U8 Boddinstraße.",
      "QReha-zertifiziert; federführender Kostenträger DRV Berlin-Brandenburg.",
      "Angebote für Stimulanzienabhängigkeit (u. a. Crystal, Speed, Kokain) zu kognitiven Auswirkungen.",
      "Standort Berlin; anderes Haus als Fachklinik Briese."
    ],
    "mitbehandlungHinweis": "Weitere seelische und körperliche Erkrankungen werden mitbehandelt; eine bestehende Psychose ist kein Ausschluss, sofern die Akutphase abgeklungen ist."
  },
  "ck-aggerblick": {
    "therapieHinweise": [
      "Multiprofessionelles Team. Behandlungsdauer öffentlich in der Regel 22 Wochen.",
      "Stationäre medizinische Rehabilitation für Männer mit Abhängigkeit von illegalen Substanzen.",
      "Therapieziele werden gemeinsam erarbeitet; Abstinenzaufbau durch ein multiprofessionelles Team.",
      "Kurzzeittherapie (etwa drei Monate), z. B. bei erneuter Behandlung.",
      "Wöchentliche Einzelgespräche und wöchentliche Kleingruppe über den gesamten Therapieverlauf.",
      "Rückfallprophylaxe-Training mit 22 Modulen; eigene Partydrogengruppe."
    ],
    "factsExtra": [
      "28 vollstationäre und 4 ganztägig ambulante Plätze.",
      "Staatlich anerkannt nach §§ 35–37 BtMG.",
      "Auftrag: Entwöhnung bei Abhängigkeit von illegalen Substanzen, nur Männer.",
      "Träger: Drogenhilfe Köln; Aufnahmebüro Overath.",
      "Im Anschluss Adaption (10 Plätze für Männer und Frauen, An der Ringmauer 28); Konzept „Alles aus einer Hand“ inkl. betreutem Wohnen.",
      "In der Adaption kostenfreies Probewohnen nach telefonischer Absprache möglich."
    ],
    "alltag": [
      "28 vollstationäre und 4 ganztägig ambulante Plätze in persönlicher Atmosphäre.",
      "Behandlungsdauer in der Regel 22 Wochen."
    ],
    "sozialdienstLeistungen": [
      "Team mit Sozialarbeit; in der Adaption Unterstützung bei Behörden und juristischen Angelegenheiten, Schuldenregulierung, Bewerbungstraining und Begleitung im externen Praktikum."
    ]
  },
  "ck-agj-karlsruhe": {
    "alltag": [
      "Freizeitgestaltung wird von der Therapiegruppe geplant (u. a. Klettern, Museum, Schwimmbad).",
      "Selbsthilfegruppen (Kreuzbund, Narcotics Anonymous) stellen sich regelmäßig in der Tagesklinik vor.",
      "Vorgespräch für alle Interessierten; Angehörige willkommen; eintägige Hospitation möglich.",
      "Regeldauer 20 Wochen; tagesklinisch mit Wohnen zu Hause."
    ],
    "factsExtra": [
      "Nachweisliche Konsumfreiheit vor Therapieantritt; Screening auf Drogen und Alkohol am Aufnahmetag.",
      "Anerkennung nach § 35 BtMG; Aufnahme mit Justizauflage oder direkt aus der JVA möglich.",
      "Zertifiziert nach DIN EN ISO 9001:2015; Reha-Qualitätssicherung der DRV und deQus/BAR.",
      "Aus Justizvollzug: kein Vorgespräch und keine Entgiftung, dafür negatives Drogen- und Alkohol-Screening am Aufnahmetag.",
      "Wunsch- und Wahlrecht auf der Klinikseite erläutert.",
      "Bewerbungsbogen als Download."
    ],
    "sozialdienstLeistungen": [
      "Arbeit an suchtbezogenen und sozialen Schwierigkeiten im privaten und beruflichen Bereich; Angehörigenarbeit."
    ],
    "therapieHinweise": [
      "Psychotherapie zu Ursachen und Begleiterkrankungen, Gruppen- und Einzelgespräche, indikative Gruppen.",
      "Körpertherapie als Indikation.",
      "Traumafolgestörungen im Konzept (eigene Rubrik Trauma und Sucht).",
      "Kombinationsbehandlung mit vorangehender stationärer oder anschließender ambulanter Phase möglich."
    ],
    "mitbehandlungHinweis": "Ärzteteam zur physischen und psychischen Leistungsfähigkeit; Behandlung psychiatrischer Erkrankungen und Gesundheitsbildung."
  },
  "ck-alexianer-reha-koeln": {
    "alltag": [
      "Gebäude auf dem Gelände des Alexianer-Krankenhauses Köln-Porz neben der Klostergärtnerei.",
      "ÖPNV: Straßenbahn Linie 7, Haltestelle Ensen Kloster, rund fünf Minuten Fußweg.",
      "Ganztägig ambulant: Übernachtung und Wochenende zu Hause.",
      "Alltägliche Konflikte werden in die Behandlung eingebracht.",
      "Zwei Gruppen zu je maximal 9 Personen, 5 Tage/Woche ca. 8 Stunden."
    ],
    "sozialdienstLeistungen": [
      "Antrag über Suchtberatungsstelle oder Krankenhaus-Sozialdienst.",
      "Arbeitnehmer beantragen Übergangsgeld bei der Rentenversicherung."
    ],
    "therapieHinweise": [
      "Kreatives Gestalten mit Holzmaterial im Trägerflyer ausgewiesen.",
      "Entwöhnungstherapie bei Abhängigkeit von Alkohol, Medikamenten, Cannabis und/oder Amphetaminen.",
      "Psychotherapie, Arbeitstherapie, kreative Ergotherapie, Musiktherapie, Sport, Entspannung, integrative Tanz- und Bewegungstherapie.",
      "Dauer in der Regel 8–20 Wochen (Trägerflyer nennt auch 8–15 Wochen)."
    ],
    "factsExtra": [
      "Geeignet, wenn ein vergleichsweise stabiler sozialer Kontext besteht.",
      "Kostenträger in der Regel die Deutsche Rentenversicherung; in Einzelfällen Krankenkasse oder Beihilfe.",
      "Nahtlosanschluss an die Entzugsstation Alexius möglich; Schnellverfahren aus dem hauseigenen Entzug.",
      "Offene Tür mittwochs 11 Uhr ohne Voranmeldung.",
      "Zugang auch über Suchtberatung von außen."
    ]
  },
  "ck-alkure-mainkofen": {
    "alltag": [
      "Alkohol-Kurzzeitentwöhnung ALKURE in Haus C2 auf dem Gelände des Bezirksklinikums Mainkofen.",
      "13 Therapieplätze; Zugang über Zufahrt 2.",
      "Realitätstraining u. a. mit Ausflügen, Fahrradtouren, Wanderungen und Stadtbesuchen.",
      "Wochenberichte zur Selbstbeobachtung."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutisch strukturiertes, abstinenzorientiertes Acht-Wochen-Programm in drei Phasen: Motivationsförderung, Alternativstrategien, Stabilisierung und Rückfallprophylaxe.",
      "Mindestens ein Angehörigengespräch während der Therapiezeit; medizinische Gruppenstunden mit suchtspezifischer Psychoedukation.",
      "Soziales Kompetenztraining (Psychodrama); berufsbezogene Einzelgespräche, bei Einverständnis Kontakt zum Betrieb.",
      "Zusatzangebote u. a. Waldbaden in der Ergotherapie und Kooperation mit Erziehungsberatungsstellen.",
      "Individuelle ganzheitliche Behandlung aus Gruppen- und Einzeltherapien.",
      "Kontakt zu Angehörigen und ggf. Arbeitgeber auf Wunsch."
    ],
    "factsExtra": [
      "Abgeschlossene Entgiftungsbehandlung und Motivation zur Alkoholabstinenz als Aufnahmevoraussetzung.",
      "QMS-Reha der BAR; am Standort Entgiftung, qualifizierter Entzug und stationäre Reha mit ambulanter Nachbetreuung.",
      "Angebot seit 1985, seit 2017 unter dem Namen ALKURE.",
      "Kurzzeitentwöhnung vor allem für sozial und beruflich eingebundene alkoholabhängige Erwachsene.",
      "Auftrag ist medizinische Rehabilitation, nicht die Akutentzugsstationen."
    ],
    "mitbehandlungHinweis": "Begleitende somatische und psychiatrische Erkrankungen (u. a. Depression, Angst, Persönlichkeitsstörung) werden mitbehandelt; psychiatrisch-psychotherapeutische Einzelgespräche und Nachsorgegruppe für Doppeldiagnosen.",
    "sozialdienstLeistungen": [
      "Vermittlung der Nachsorge gegen Therapieende: Selbsthilfe, Beratungsstellen, ambulante Psychotherapie."
    ]
  },
  "ck-alpcura": {
    "kontraindikationen": [
      "Floride (akute) Psychosen, aktiv betriebene Sucht und akute Suizidalität sind für das Reha-Angebot nicht geeignet.",
      "Anorexia nervosa in der psychosomatischen Reha erst ab einem BMI von 19."
    ],
    "alltag": [
      "In der Rehabilitation größtenteils Einzelzimmer mit Dusche, WC, Fernseher, Telefon, Safe und Notruf; Mehrheit mit Balkon oder Terrasse.",
      "Handy bei Therapien auf dem Zimmer lassen oder in den Flugmodus; ab 22:30 Uhr aufs Zimmer, ab 23:00 Uhr laute Geräusche vermeiden.",
      "Waschmaschinen mit Münzautomat (2 × 1 Euro je Waschgang); Wasserkocher, Bügeleisen und Heizdecken nicht mitbringen.",
      "Rauchen nur im Raucherbereich auf dem Parkplatz; im Klinikgebäude Rauchverbot.",
      "Anreise Rehabilitation 13:00–16:30 Uhr; Zimmerreinigung 8:00–13:00 Uhr (nicht am An- und Abreisetag)."
    ],
    "sozialdienstLeistungen": [
      "Sozialmedizinische Beratung zu Wiedereingliederung, Umschulung und DRV-Schwaben-Reha-Fachberatung.",
      "Beratung zu Kranken- und Übergangsgeld sowie Existenzsicherung.",
      "Informationen zu Nachsorge (Selbsthilfe, Caritas/Diakonie, ambulante Psychotherapie).",
      "Beratung zu Pflegeversicherung, Schwerbehindertenrecht, Vorsorgevollmacht und gesetzlicher Betreuung."
    ],
    "factsExtra": [
      "Kostenloser Abholservice nach Voranmeldung bei Anreise mit Bahn oder Bus.",
      "IRENA, Curriculum Hannover und Reha-Sport als Nachsorge bei DRV-Kostenträgerschaft öffentlich genannt.",
      "Keine rein vegane Kost; vegetarisch und leichte Vollkost nach Absprache."
    ],
    "wahlleistungenHinweis": "Komfortzimmer Alpcura 25 Euro/Tag, Alpcura Komfort 63 Euro/Tag, Alpcura Suite Komfort 98 Euro/Tag (private Zuzahlung). WLAN-Voucher kostenpflichtig in der Cafeteria; Telefon-Tagesgrundgebühr 1,50 Euro.",
    "mitbehandlungHinweis": "Begleitperson nach Absprache im Doppelzimmer, Beistellbett oder separatem Einzelzimmer möglich; für Begleitpersonen kein Patientenstatus, Therapien nur privat gegen Rechnung.",
    "therapieHinweise": [
      "Psychosomatische Rehabilitation in der Regel 4–6 Wochen.",
      "Schwerpunkte u. a. somatoforme Störungen, Traumafolgestörungen, Essstörungen.",
      "Zusätzlich 32 Akutbetten Psychosomatik am Standort."
    ]
  },
  "ck-alpenblick": {
    "alltag": [
      "251 Einzelzimmer mit Dusche, WC, Telefon, überwiegend Balkon; Zweibett nur auf ausdrücklichen Wunsch bei Paaren.",
      "Kostenloses WLAN; Waschmaschine, Trockner und Bügeleisen vorhanden.",
      "Frühstücksbuffet, mittags Salat- und Suppenbar plus Servicemenü, abends Buffet; medizinisch indizierte Kostformen möglich.",
      "Behindertenfreundliche Zimmer auf Nachfrage.",
      "Keine Haustiere; elektrische Geräte wie Wasserkocher oder Heizkissen nicht mitbringen."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung zu persönlichen und sozialen Fragen im Zusammenhang mit der Erkrankung.",
      "Hilfe bei der Prüfung beruflicher Vorstellungen auf Realisierbarkeit.",
      "Einleitung der Rehabilitationsnachsorge Psy-RENA."
    ],
    "therapieHinweise": [
      "Psychotherapie psychodynamisch, verhaltenstherapeutisch und systemisch; Gruppen- und Einzelpsychotherapie.",
      "Berufsbezogene Therapie (BBT) und MBOR; kreative Ergotherapie und Musiktherapie.",
      "Fünf medizinisch-therapeutische Abteilungen; Medizinisches Leistungszentrum für Diagnostik."
    ],
    "factsExtra": [
      "Erste von der DRV belegte psychosomatische Klinik laut Patienteninfo.",
      "Therapeutisches Bewegungszentrum mit Schwimmbad für alle Neutrauchburger Kliniken.",
      "Fahrdienst ab Isny nach Ankunftsmitteilung; nächste Bahnhöfe Kempten und Leutkirch."
    ],
    "mitbehandlungHinweis": "Im Medizinischen Leistungszentrum können viele akute und chronische somatische Erkrankungen grundsätzlich mitbehandelt werden (u. a. Sonografie, EKG, Labor).",
    "wahlleistungenHinweis": "Optionale Zusatzleistungen, z. B. Telefongebühren. Für Privatversicherte und Selbstzahler Standard-Tagessatz sowie Komfort-Tarif mit privatärztlicher Chefarzt- oder Oberarztbehandlung und Komfortzimmer nach Verfügbarkeit."
  },
  "ck-alpenland": {
    "alltag": [
      "66 Einbett- und zehn Doppel- bzw. behindertengerechte Zimmer, jeweils mit Dusche und WC.",
      "Sporthalle, Werkstätten und Aufenthaltsbereiche im Klinikkomplex.",
      "Paten aus der Rehabilitandenschaft in der Aufnahmephase; Aufnahmepass zum Start.",
      "Aufnahme zunächst in Aufnahmezimmer, regelhaft Doppelzimmer; Umzug ins Einzelzimmer nach Eingewöhnung und Kapazität.",
      "Vorwiegend große Einzelzimmer mit eigener Dusche und WC.",
      "Besuch ab dem dritten Wochenende, wenn der Aufnahmepass erledigt ist."
    ],
    "sozialdienstLeistungen": [
      "Sozialtherapeutische Hilfen: Umgang mit Behörden, Finanzen, Schuldenklärung, Wohnsituation.",
      "Bewerbungstraining und Kontakt zu Arbeitgebern, Jobcentern und Arbeitsagenturen.",
      "Unterstützung bei der Schuldenregulierung anhand mitgebrachter Unterlagen.",
      "Besichtigungstermin und Aufnahmeberatung über das Aufnahmebüro."
    ],
    "therapieHinweise": [
      "Multimodales Programm: Psycho- und Suchttherapie, Arbeits- und Ergotherapie, Kreativ-, Musik- und Tanztherapie, Sport- und Freizeittherapie.",
      "Indikativgruppen u. a. Glücksspiel, Trauma, MPU, Delinquenz.",
      "Erlebnispädagogik (z. B. Raften, Canyoning, Bouldern) und tiergestützte Therapie genannt.",
      "Behandlung in drei Abschnitten: Aufnahmezeit mit Bezugstherapie und Patinnen bzw. Paten, anschließend Kernbehandlung in Phasen.",
      "Indikativgruppen u. a. Raucherentwöhnung, Glücksspiel, berufsbezogene Gruppen, Trauma, MPU und Delinquenz.",
      "Substitutionsgestützte Aufnahme nur nach Vorstellungsgespräch, Umstellung auf Buprenorphin und Ziel Suchtmittelfreiheit bei Entlassung."
    ],
    "factsExtra": [
      "Abholservice öffentlich genannt.",
      "Zielgruppen inkl. Therapieauflage und interner Adaptionsphase.",
      "Zertifiziert nach DO-QUA.R.",
      "Anerkennung nach §§ 35 und 36 BtMG; federführend DRV Bayern Süd, daneben DRV Bund, Krankenkassen und Sozialhilfeträger.",
      "Interne Adaptionsphase nach abgeschlossener Kerntherapie öffentlich genannt.",
      "Bei Aufnahme Kaution für Zimmerkarte und Mobiliar laut Hausordnung."
    ],
    "mitbehandlungHinweis": "Doppeldiagnosen und Begleiterkrankungen werden im Konzept genannt; substitutionsgestützte Behandlung nach Vorbesprechung möglich (Buprenorphin, schrittweise Reduktion)."
  },
  "ck-alpenland-reichenhall": {
    "alltag": [
      "Einzelzimmer mit Bad/Dusche, WC, TV und Telefon; Teppichboden oder PVC.",
      "Kostenfreies WLAN auf allen Etagen beider Gebäude; Zugangsdaten am Empfang.",
      "Besuch nur in Aufenthaltsräumen und Gartenanlagen; Zimmer und Speisesaal nur für aufgenommene Begleitpersonen.",
      "Waschmaschine, Trockner und Bügeleisen im Haus; Handtücher werden gestellt.",
      "Bushaltestelle gegenüber; Ortsverkehr mit Kurkarte ohne Fahrpreis."
    ],
    "sozialdienstLeistungen": [
      "Beratung zum Antrag auf Schwerbehinderung und Pflegestufe.",
      "Planung der beruflichen und privaten Perspektive; Einleitung einer stufenweisen Wiedereingliederung.",
      "Rentenberatung."
    ],
    "therapieHinweise": [
      "Gruppen u. a. Schmerz, Achtsamkeit, Genuss, Spielgruppe, offenes Atelier und freies Werken.",
      "Entspannung: progressive Muskelentspannung, Qi Gong, musikgestützte Tiefenentspannung.",
      "Aktivierende Angebote: Nordic Walking, Morgensport, Wanderungen, Pilates.",
      "Integrative Einzel- und Gruppenpsychotherapie, verhaltenstherapeutisch und tiefenpsychologisch fundiert.",
      "Schmerztherapeutisch-ärztliche und psychiatrisch-psychopharmakologische Angebote im Konzept."
    ],
    "factsExtra": [
      "Versorgungsvertrag nach § 111 SGB V einschließlich AHB; Privatkrankenanstalt nach § 30 GewO, beihilfefähig.",
      "Onkologie und Psychosomatik in getrennten Häusern, verbunden durch einen Wintergarten.",
      "Am Standort zusätzlich onkologische Nachsorge, Psychoonkologie, Gynäkologie und Innere Medizin.",
      "Im Zweifelsfall ärztliche Vorabklärung vor Aufnahme."
    ],
    "wahlleistungenHinweis": "Erwachsene Begleitpersonen gegen Entgelt im Doppelzimmer; vor Anreise anmelden, da die Zahl der Doppelzimmer begrenzt ist.",
    "kontraindikationen": [
      "Akute Suizidalität.",
      "Schwere Anorexia nervosa mit parenteraler Ernährung und/oder dauerhafter Aufsicht.",
      "Alkoholabhängigkeit, wenn Abstinenz nicht eingehalten oder nicht angestrebt wird.",
      "Unkontrollierbare Impulsivität; Impulskontrollstörungen, soweit die Gruppenteilnahme nicht möglich ist.",
      "Bipolare Störungen oder Psychosen aus dem schizophrenen Formenkreis, sofern nicht soweit teilremittiert, dass keine akute psychiatrische Behandlung nötig ist.",
      "Unkontrollierter Suchtmittelkonsum bzw. schwere Entzüge bis zum Delir; Reha-Zeit laut Klinik für erfolgreiche Suchtbehandlung nicht ausreichend."
    ],
    "mitbehandlungHinweis": "Aktive Teilnahme an Therapiegruppe und Outdooraktivitäten wird vorausgesetzt (Antrieb, Kognition, Gruppenfähigkeit). Schwere somatische Einschränkungen der Selbstversorgung sind nicht der Auftrag."
  },
  "ck-alte-flugschule": {
    "kontraindikationen": [
      "Aufnahmevoraussetzung laut Klinikseite: gültige Kostenzusage, Lebens- und Suchtverlauf sowie Cleanstatus."
    ],
    "therapieHinweise": [
      "Therapeutische Gemeinschaft: Hausversammlung/Plenum mit Therapeut und Klientenvertretung zu Konflikten, Rückfällen und Regelverstößen.",
      "Gruppen u. a. Frauen-/Männergruppe, Raucherentwöhnung, Spielsuchtgruppe, kognitives Training, Emotionsregulation und Impulskontrolle.",
      "Rittergut: schulische Qualifizierung, öffentlich 24 Plätze für etwa 16 bis 27 Jahre.",
      "Keine Bedarfsmedikation mit Psychopharmaka; Ziel unter geschützten Bedingungen Reduktion oder Absetzen, soweit indiziert.",
      "24-wöchige Drogentherapie plus schulische oder berufliche Qualifizierung.",
      "Aufnahme ab 16 Jahren, auch Schwangere und Menschen mit Kindern."
    ],
    "alltag": [
      "Zwei Klinikhäuser: Flugschule (Erwachsene, Arbeitstherapie, Arche-Hof) und Rittergut (Jugendliche und junge Erwachsene).",
      "Umfangreiches Sport- und Freizeitangebot für beide Häuser."
    ],
    "sozialdienstLeistungen": [
      "Hilfe bei der Kostenzusage über örtliche Suchtberatung oder Sozialdienst der Entgiftung.",
      "Fahrdienst zur Entgiftung und zur Entwöhnung."
    ],
    "factsExtra": [
      "Entgiftungsplätze über Kooperationspartner Klinikum Mittleres Erzgebirge und Erzgebirgsklinikum Annaberg reservierbar.",
      "Kinderrehabilitation über regionale Rentenversicherungsträger für Minderjährige ausgewiesen."
    ]
  },
  "ck-altenkirchen": {
    "kontraindikationen": [
      "Reine Fraueneinrichtung: Aufnahme nur für Frauen ab 18 Jahren."
    ],
    "alltag": [
      "Einzel- und Doppelzimmer mit eigenem Bad.",
      "Hauseigene Küche und Cafeteria; Sauna; Therapiepferde; Backhaus.",
      "Einzel- und Doppelzimmer mit eigenem Bad; hauseigene Küche und Cafeteria mit regionalen Produkten.",
      "Integrierter Kindergarten vom vollendeten ersten Lebensjahr bis zum Grundschulalter; Grundschulkinder besuchen die örtliche Schule.",
      "Sauna, Pferdekoppel mit Therapiepferden und Backhaus mit Brotbackofen.",
      "Kinderbetreuung durch pädagogische Fachkräfte während der Therapiezeiten der Mütter."
    ],
    "sozialdienstLeistungen": [
      "Psychosoziale und medizinische Betreuung auf der Klinikseite genannt.",
      "Angehörigenseminare und Partnergespräche.",
      "Soziale Rehabilitation und Selbstsicherheitstraining im Programm.",
      "Ergotherapie mit Bewerbungstraining, Holzwerkstatt und Gartenarbeit."
    ],
    "therapieHinweise": [
      "Einzel- und Gruppentherapie; medizinische Behandlung.",
      "Edukative Gruppen u. a. Drogen, Alkohol, Traumafolgestörung, Essstörung, Erziehungsfragen.",
      "Tabakentwöhnung öffentlich genannt.",
      "Frauenspezifische Entwöhnung ab 18 Jahren bei stoffgebundener Abhängigkeit, inkl. Traumafolgen, affektiven Störungen, Ess-, Zwangs-, Angst- und Persönlichkeitsstörungen.",
      "Edukative Gruppen zu Drogen, Alkohol, Traumafolgestörung, Essstörung und Erziehungsfragen.",
      "DBT-orientiertes Skillstraining, tiergestützte Therapie mit Pferden, Kunst- und Gestaltungstherapie."
    ],
    "factsExtra": [
      "Website stand zum Abruf im Wartungsmodus; Angaben aus der Klinik-Startseite.",
      "Bis 57 Frauenplätze, davon 15 für Mütter mit integriertem Kindergarten bzw. örtlicher Grundschule.",
      "Bis zu 57 Plätze für Frauen, davon 15 für Mütter mit Kind.",
      "Flyer der Klinik als PDF auf der Startseite; Aufnahmeberatung über Andrea Barthmann.",
      "Plätze für Mütter mit Kind im Haus; Kinderbetreuung durch hauseigene Erzieherinnen während der Therapiezeiten.",
      "Aufnahmeberatung über das Aufnahmeteam der Klinik."
    ]
  },
  "ck-ameos-luebeck-sucht": {
    "alltag": [
      "Unterbringung in Doppelzimmern mit Dusche, Waschbecken und WC; Einzelzimmer und behindertenfreundliche Zimmer in Einzelfällen.",
      "Lage im Lübecker Stadtzentrum mit Einkaufsmöglichkeiten im direkten Umfeld und ÖPNV-Anbindung; Altstadt zu Fuß rund 25 Minuten.",
      "Qualifizierter Entzug im Klinikum Tür an Tür; nahtloser Übergang in die Entwöhnung ohne Ortswechsel möglich."
    ],
    "therapieHinweise": [
      "Reha-Dauer öffentlich in der Regel sechs Wochen bis drei Monate.",
      "Diätassistenz mit gemeinsamem Kochen, Schulungen für Menschen mit Diabetes und kognitives Training im Reha-Angebot.",
      "Gruppen- und Einzelpsychotherapie, Achtsamkeit, Stressbewältigung, Sport, Ergo- und Kunsttherapie.",
      "Bausteine u. a. DBT-Sucht, soziales Kompetenztraining, metakognitives Training Depression, Angstbewältigung, Frauengruppe, Raucherentwöhnung, Lehrküche.",
      "Spezialkonzepte „Älter werden ohne Sucht“ und beruflicher (Wieder-)Einstieg mit 2- bis 3-wöchigen Betriebspraktika.",
      "Integrative Behandlung von Sucht und Depression (ISD)."
    ],
    "sozialdienstLeistungen": [
      "Suchtberatung im Haus zur Antragstellung; Kooperation mit DRV Nord zum Nahtlosverfahren.",
      "Sozialdienst-Kontakt laut Träger-PDF: Tel. 0451 5894-306."
    ],
    "factsExtra": [
      "Stationär, ganztägig ambulant und ambulante Nachsorge (Nachsorgegruppe einmal wöchentlich, bis 12 Teilnehmende).",
      "Angehörigenseminare und -gespräche.",
      "Merkblatt Entwöhnungsbehandlung 2023 auf der Trägerseite."
    ],
    "mitbehandlungHinweis": "Mitbehandlung der Depression im ISD-Konzept; Angebot vom Entzug über Entwöhnung bis Nachsorge und Adaption im AMEOS-Verbund."
  },
  "ck-ameos-ratzeburg": {
    "kontraindikationen": [
      "Unbehandeltes Karzinom (Erstdiagnose oder Rezidiv); Karnofsky-Index unter 60 %.",
      "Pflegestufe 2 oder 3; Körpergewicht über 130 kg.",
      "Hochgradige Sehbehinderung/Blindheit oder hochgradige Hörbehinderung/Taubheit.",
      "Manifeste Abhängigkeitssyndrome (außer Nikotin); Schizophrenie, schizotype und wahnhafte Störungen (F2).",
      "Organische psychische Störungen (F0), Intelligenzminderung (F7), tiefgreifende Entwicklungsstörungen (F84).",
      "Nicht ausreichend behandelte Infektion; nach multiresistenten Erregern negative Kulturen vor Aufnahme."
    ],
    "alltag": [
      "Einzelzimmer als Regel (FAQ); kein Kühlschrank im Zimmer, Teeküchen vorhanden; Fernseher im Zimmer gegen Miete.",
      "Therapie regulär Mo–Fr 08:00–17:00 Uhr, teilweise außerhalb oder am Wochenende laut Therapieplan.",
      "Bewegungsbad, Fitnessraum, Lichttherapie und Hydrojet nur nach Absprache und Aushangzeiten; Waschraum am ersten Tag, eigenes Waschmittel."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung zu sozialen, beruflichen und persönlichen Fragen; Beratung zu Alters- und Erwerbsminderungsrente.",
      "Nachsorge: weiterführende Beratungsstellen, Angehörigen- und Selbsthilfegruppen; Entlassmanagement.",
      "Ernährungsberatung."
    ],
    "therapieHinweise": [
      "Psychosomatik mit über 120 Einzelzimmern auf drei Stationen, Aufenthaltsbereiche, Küche und Bibliothek in eigenem Gebäude."
    ],
    "factsExtra": [
      "Kein eigener Wasserkocher im Zimmer (Brandschutz); Wasserkocher in den Teeküchen.",
      "Alternative Medikamente werden nicht gestellt und nicht verabreicht.",
      "Bei gesetzlicher Rentenversicherung Medikamente über die Klinik; frei verkäufliche Mittel für den gesamten Aufenthalt mitbringen."
    ],
    "wahlleistungenHinweis": "Fernseher gegen Miete; Telefongebühren laut Klinikaufnahmevertrag. Beihilfefähigkeit laut Klinikseite.",
    "mitbehandlungHinweis": "Reha mit Partner, Freundin, Kind, pflegebedürftigem Angehörigen oder Hund nach früher Absprache mit dem Belegungsmanagement; 13 Einzelzimmer im Angehörigenbegleitbereich mit Pflege."
  },
  "ck-annenhof": {
    "alltag": [
      "Unterbringung in der Regel im Zweibettzimmer; Einzelzimmer nach medizinischer Indikation, Paarzimmer möglich.",
      "In der Eingangsphase nur therapeutisch begleitete Ausflüge; Therapien bleiben auch in der Ausgangszeit verpflichtend.",
      "Arbeitstherapie in Küche, Hauswirtschaft, Garten und Tierpflege (Hasen, Hühner).",
      "Hauseigene Sauna, Sporthalle, Beachvolleyballfeld; Handy und Laptop erlaubt, kein Fernseher auf dem Zimmer.",
      "Kein Kraftfahrzeug während der Therapie; keine Tiere mitbringen.",
      "Badezimmer mit Wannenbad; großer Innenhof mit Gartenteich."
    ],
    "sozialdienstLeistungen": [
      "Hilfe bei der Klärung von Nebenkosten (Bürgergeld, Übergangsgeld, Sozialhilfe) und Reisekostenerstattung."
    ],
    "therapieHinweise": [
      "Einzel- und Gruppentherapie plus indikative Gruppen (Frauengruppe, soziale Kompetenz, Rückfallprävention, Suchtinformation).",
      "BORA mit berufsbezogenem Arbeits- und Belastungstraining, Bewerbungstraining und Arbeitserprobung.",
      "Ergotherapie, Kunsttherapie, Sporttherapie; therapeutisches Reiten außerhalb der Klinik.",
      "Lehrküche und Ernährungsberatung; Entspannungs- und kognitives Training."
    ],
    "factsExtra": [
      "Fachklinik für rehafähige Frauen und Männer mit Schwerpunkt illegale Drogen; Therapieplätze für Paare.",
      "Rund 50 Plätze in Steinheim (Kreis Höxter); Träger Medizinisches Zentrum für Gesundheit.",
      "Anerkennung nach BtMG; Abholung aus Entgiftung oder JVA nach Absprache.",
      "Gnadenhof mit Tieren (u. a. Pferde, Ziegen, Katzen, Minischweine); Therapiehund Jamie nach Bedarf.",
      "Kostenfreies WLAN; Behandlungsdauer 6–22 Wochen je nach Leistungszusage des Kostenträgers."
    ],
    "mitbehandlungHinweis": "Psychiatrische und internistische Betreuung im Haus, inkl. Untersuchung auf Hepatitis B/C und HIV; fachärztliche Konsile möglich."
  },
  "ck-ansbach-haus7": {
    "alltag": [
      "Kostenfreies WLAN; parkähnliches Gelände für Spaziergänge und Nordic Walking.",
      "Freizeit u. a. Ergometer, Kegelbahn, Tischtennis, Billard, Darts, Volleyball- und Badmintonplatz; Kreativ- und Bastelraum.",
      "Freizeitbad und Fitnessstudio in der Nähe.",
      "Einzel- und Doppelzimmer in Haus 7.",
      "Frühzeitiger Einzelausgang, Tagesbeurlaubungen am Wochenende, mehrtägiges Realitätstraining zu Hause.",
      "Besuchszeiten Mo–Fr 17:30–20:00 Uhr, Sa/So/Feiertag 8:30–20:00 Uhr."
    ],
    "therapieHinweise": [
      "Suchtakupunktur und Ressourcentraining im Programm.",
      "Indikative Gruppen, unter anderem zur Schlafhygiene.",
      "Einbeziehung des sozialen Umfelds, unter anderem durch Trialoggespräche.",
      "Achtwöchige Entwöhnung, Festigungs- und Auffangbehandlungen.",
      "Gruppen-, Einzel- und Familientherapie; Rückfallprävention S.T.A.R. (15 Einheiten à 90 Minuten).",
      "Arbeits- und Beschäftigungstherapie, Sporttherapie, PMR, Informationsgruppe Gesundheit."
    ],
    "sozialdienstLeistungen": [
      "Hilfe bei behördlichen Angelegenheiten.",
      "Kontakte zu Arbeitgeber und Agentur für Arbeit; Vermittlung in Adaption oder Betreutes Wohnen.",
      "Organisation der Nachsorge über Suchtberatungsstellen und Selbsthilfegruppen."
    ],
    "factsExtra": [
      "Auch Aufnahme nach kurzem Rückfall zur Wiedererlangung der Abstinenz.",
      "Nahtlosverfahren nach Qualifizierter Entzugsbehandlung; vereinfachter Antrag für DRV-Nordbayern-Versicherte aus dem eigenen Entzug.",
      "Informationsgespräche nach telefonischer Vereinbarung, vorzugsweise montags."
    ]
  },
  "ck-asklepios-bad-schwartau": {
    "kontraindikationen": [
      "In der psychosomatischen Abteilung keine gleichzeitige Reha von Paaren und keine Begleitpersonen für die Dauer der Reha.",
      "Bettenbelastbarkeit öffentlich maximal 150 kg."
    ],
    "alltag": [
      "Einzelzimmer mit Kühlschrank, Fernseher, Dusche, WC und Safe.",
      "WLAN und Telefonfreischaltung gebührenpflichtig.",
      "Anreise möglichst zwischen 10 und 12 Uhr.",
      "Nur Kartenzahlung, keine Barzahlung.",
      "Vorab per E-Mail mitteilen: Rollator oder Rollstuhl, Körpergröße über 1,90 m, Hausstauballergie, Fahrstuhlangst, Allergien oder Lebensmittelunverträglichkeiten."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung ist Teil des psychosomatischen Therapieangebots."
    ],
    "therapieHinweise": [
      "Multimodale psychosomatische Reha: Einzel- und Gruppenpsychotherapie, Physio-/Sporttherapie, Entspannung, Psychoedukation, Kreativtherapie/Arbeitsplatztraining.",
      "Stationäre und ambulante psychosomatische Rehabilitation.",
      "Berufsbezogene Behandlung möglich.",
      "Ernährungsberatung, Gesundheitstraining und Patientenschulung im psychosomatischen Programm."
    ],
    "factsExtra": [
      "282 Zimmer, davon 65 Doppelbettzimmer für Paare (nicht in der Psychosomatik).",
      "Saunalandschaft SAUNA PUR und Asklepios Medical Fitness am Standort."
    ],
    "wahlleistungenHinweis": "Optionale Zimmerausstattung gegen Aufpreis (u. a. Wasserflaschen, Kaffee, Yogamatte). Komfortzimmer vorhanden. Begleitpersonen nur außerhalb der Psychosomatik, Übernachtung mit Vollpension laut Klinikseite kostenpflichtig.",
    "mitbehandlungHinweis": "Orthopädische, internistische und gynäkologische Nebendiagnosen können im Reha-Team mitbehandelt werden."
  },
  "ck-asklepios-fuerstenhof": {
    "alltag": [
      "Anreise möglichst zwischen 10 und 12 Uhr; Anmeldung an der Rezeption.",
      "Einzelzimmer mit Bad und Fernseher; WLAN in den Zimmern kostenfrei laut medizinischem Konzept.",
      "Begrüßungsmappe und Einführung ins Notrufsystem am Aufnahmetag."
    ],
    "therapieHinweise": [
      "Psychosomatik tiefenpsychologisch fundiert und systemisch, ergänzt um humanistische Verfahren.",
      "Einzelgespräch in der Aufnahmewoche und Begrüßung in der Gruppe in den ersten zwei Tagen laut Klinikmeldung.",
      "Angebote u. a. Schmerz- und Stressbewältigung."
    ],
    "factsExtra": [
      "Kardiologische Reha-Abteilung geschlossen; Neurologie und Psychosomatik ausgebaut.",
      "Chefarzt Psychosomatik Dott. Konstantinos Kapetanios.",
      "Mind-RENA als digitale Nachsorge (Webbrowser oder App) zur Sicherung der Reha-Ergebnisse."
    ],
    "mitbehandlungHinweis": "Somatische Grundversorgung in Kooperation mit der Asklepios Stadtklinik. Kardiologische Mitbetreuung im Haus möglich, kardiologische Reha-Abteilung geschlossen.",
    "kontraindikationen": [
      "Aktuelle Drogen- und Alkoholabhängigkeit.",
      "Akute Psychosen bzw. psychotische Erregungszustände.",
      "Akute Suizidalität bzw. Eigen- oder Fremdgefährdung.",
      "Akute Behandlungs- oder Pflegebedürftigkeit; dauerhaft bettlägerig."
    ],
    "sozialdienstLeistungen": [
      "Sozialdienst zur beruflichen Integration, Nachsorgeplanung und stufenweisen Wiedereingliederung."
    ]
  },
  "ck-aukrug": {
    "kontraindikationen": [
      "Alter unter 18 Jahren.",
      "Gewicht über 150 kg.",
      "Aufwendige pflegerische Versorgung (z. B. Tracheostoma, Wechsel suprapubischer Blasenkatheter) nicht gewährleistet.",
      "Ausgeprägte hirnorganische Störungen mit begrenzter Selbstfürsorge; akute psychotische Erkrankungen.",
      "Drogen-, Alkohol- oder Medikamentenabhängigkeit; akute lebensbedrohliche Erkrankungen."
    ],
    "alltag": [
      "Haus C: Zimmer mit kostenfreiem WLAN, Telefon und Smart-TV.",
      "Großzügiges Bad mit ebener Dusche.",
      "Therapien werktags 7:00–17:00 Uhr, samstags 8:00–12:00 Uhr."
    ],
    "therapieHinweise": [
      "Tiefenpsychologisch fundiert, kognitiv-verhaltenstherapeutisch und körpertherapeutisch.",
      "Entspannung u. a. Autogenes Training, PMR, Qigong, Yoga; Schlafschule.",
      "DGSM-zertifiziertes Schlaflabor am Standort."
    ],
    "factsExtra": [
      "Klinik der DRV Nord.",
      "Außerhalb der Therapiezeiten Bewegungsbad, Aqua-Jogging und MTT für eingewiesene Patientinnen und Patienten.",
      "Psychosomatische Reha öffentlich mit Regeldauer von vier Wochen; ausschließlich stationär.",
      "Anerkennung als Versorgungseinrichtung nach § 111 SGB V.",
      "Zuweisung auch durch andere Rentenversicherer und Berufsgenossenschaften (BGSW)."
    ],
    "sozialdienstLeistungen": [
      "Nachsorgeplanung während der Reha; PSY-RENA im Gruppensetting.",
      "Organisation heimatnaher Weiterversorgung."
    ],
    "mitbehandlungHinweis": "Orthopädie und Psychosomatik am Standort. Schlafmedizinische Abklärung einschließlich CPAP bei Schlafapnoe."
  },
  "ck-auwald": {
    "alltag": [
      "Barrierefreie, vollausgestattete Zimmer laut Klinikseite.",
      "Barrierefreie, voll ausgestattete Zimmer; nach Umbau deutlich mehr Einzelzimmer.",
      "Glücksspiele jeglicher Art sind auch bei ausschließlich stoffgebundener Sucht nicht gestattet.",
      "Zu Beginn Zweibettzimmer mit Dusche und WC; Wechsel ins Einzelzimmer meist möglich. Kurzzeit- und Kombibereich: Einbettzimmer von Beginn an.",
      "Behindertengerechte Zimmer; Barrierefreiheit im Haus ausgewiesen.",
      "Glücksspiele jeglicher Art sind während der Behandlung nicht gestattet."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung bei amtlichen und rechtlichen Fragen.",
      "Berufliche Integrationsberatung in Einzel-, Gruppen- und Vortragsform.",
      "Arbeitsbelastungserprobung bzw. Betriebspraktikum von 2–3 Wochen in Partnerbetrieben der Umgebung.",
      "Anmeldung in der Regel über psychosoziale Beratungsstelle, Fachambulanz oder Krankenhaus-Sozialdienst.",
      "Sozialberatung zu Beruf, Wohnung, wirtschaftlicher Absicherung und Schuldnerfragen.",
      "Vorbereitung von Arbeitspraktika bzw. Arbeitsbelastungserprobung und stufenweiser Wiedereingliederung."
    ],
    "therapieHinweise": [
      "VR-Therapie zu suchtbezogenen Auslösern.",
      "Indikative Gruppen u. a. pathologisches Glücksspielen, Drogenkonsum, ADHS, Trauer, Depression.",
      "Frauenspezifische Gruppen Körperwahrnehmung und Selbstbehauptung.",
      "Keine standardisierte Werkstatt-Arbeitstherapie; berufliche Erprobung extern.",
      "Indikation: Alkohol- und Medikamentenabhängigkeit sowie pathologisches Glücksspiel.",
      "Spezifische Glücksspielgruppen und Einzelgespräche; Folgeerkrankungen und psychosomatische Störungen werden mitbehandelt."
    ],
    "factsExtra": [
      "Suchtmittelfreier Antritt; Entgiftung bei Bedarf im Akutkrankenhaus vorab zu planen.",
      "Beihilfe: Behandlung als beihilfefähig ausgewiesen, Abrechnung vor Ort.",
      "212 Behandlungsplätze, rund 820 Patientinnen und Patienten pro Jahr laut Klinikseite.",
      "Behandlung soll suchtmittelfrei angetreten werden.",
      "Programme laut Rehabilitationskonzept u. a. Seniorenbehandlung (AGIL-Gruppe), junge Erwachsene sowie Alkohol-/Medikamentenabhängigkeit plus Drogenabhängigkeit (A+).",
      "Anmeldung in der Regel über psychosoziale Beratungsstelle, Fachambulanz oder Krankenhaus-Sozialdienst."
    ],
    "kontraindikationen": [
      "Aufnahme nicht möglich bei Demenzen und anderen organischen psychischen Störungen, Schizophrenie, wahnhaften oder anderen psychotischen Störungen sowie akuter Suizidalität.",
      "Rehafähigkeit: Selbstversorgung bei Körperhygiene, Zimmerpflege, Gehfähigkeit und selbstständiger Teilnahme an den Mahlzeiten.",
      "Aufnahme nicht vorgesehen bei Demenzen und anderen organischen psychischen Störungen, Schizophrenie, wahnhaften oder psychotischen Störungen sowie akuter Suizidalität."
    ],
    "wahlleistungenHinweis": "Beihilfefähig. Belegung durch Rentenversicherung, Krankenkassen, private Krankenversicherungen und Sozialhilfeträger.",
    "mitbehandlungHinweis": "Folgeerkrankungen, psychosomatische Störungen sowie begleitende Depressionen und Ängste werden mitbehandelt."
  },
  "ck-bassum": {
    "kontraindikationen": [
      "Aufnahme von Patientinnen und Patienten mit Übergewicht öffentlich bis 130 kg; entsprechendes Mobiliar vorhanden.",
      "Zur Aufnahme entgiftet und suchtmittelfrei; intoxikierte Anreisende werden je nach Indikation zunächst im akutmedizinischen Bereich des Krankenhauses Bassum aufgenommen."
    ],
    "alltag": [
      "Alle Patientinnen und Patienten wohnen in Einzelzimmern mit eigenem Duschbad und Notrufanlage; Safe im Kleiderschrank.",
      "Keine generellen Ausgangsbeschränkungen: vom ersten Tag Spaziergänge und Besorgungen, sofern keine individuelle Einschränkung.",
      "Handy und Mailkontakt von Beginn an; WLAN-Login am Empfang, laut FAQ zwei Stunden pro Tag.",
      "Waschmaschinen und Trockner kostenfrei auf den Wohnetagen; Waschen nicht nach 22:00 Uhr.",
      "Klinik rauchfrei; Rauchen nur im Raucherpavillon. Auf dem Zimmer außer Obst oder kleinen Knabbereien keine Lebensmittel.",
      "Übernachtungsbesuch nach Absprache mit der Bezugstherapie, Anmeldung drei Tage vorher; Gästeliege möglich."
    ],
    "sozialdienstLeistungen": [
      "Beratung zu Übergangsgeld, Krankengeld und weiteren Sozialleistungen; vorbereitende Hilfe bei Entschuldung.",
      "Unterstützung zur Wiedereingliederung ins Erwerbsleben, inkl. begleiteter Termine bei Agentur für Arbeit, Jobcenter oder Arbeitgebern.",
      "Schulung „Perspektiven nach der Reha“ in der Aufnahmephase zu Adaption, Betreutem Wohnen, Eingliederungshilfe, Nachsorge und Selbsthilfe."
    ],
    "therapieHinweise": [
      "Lehrküche mit sechs Küchenzeilen; Ernährungsberatung und diätetische Einzelberatung nach ärztlicher Anordnung.",
      "Raucherentwöhnung nach dem Programm „Nichtraucher in 6 Wochen“ (Batra/Buchkremer), zu Beginn ergebnisoffen.",
      "BORA-orientierte Arbeitstherapie mit internen und externen Belastungserprobungen.",
      "EDV-Schulungsraum; Fahrräder über die Ergotherapie.",
      "Stationäre und ganztägig ambulante Rehabilitation; Kombinationsbehandlung (Kombi-Nord) öffentlich genannt.",
      "In besonderen Fällen Polnisch oder Russisch; Kompetenzen für Patientinnen und Patienten aus den Nachfolgestaaten der Sowjetunion."
    ],
    "factsExtra": [
      "Barrierefrei nach DIN 18025; rollstuhlgerechte Zimmer und Bad für ganztagsambulante Rehabilitandinnen und Rehabilitanden.",
      "Aufnahme dialysepflichtiger Patientinnen und Patienten durch gegenüberliegende Dialysepraxis möglich.",
      "Eigener Frauenflügel mit Aufenthaltsraum; Freizeitraum im Bettenhaus mit Billard, Kicker und Tischtennis.",
      "Qualifizierte Entzugsbehandlung im Klinikverbund: psychiatrisch in Bassum, internistisch in Diepholz."
    ],
    "mitbehandlungHinweis": "Psychiatrische Komorbidität (u. a. Angst, Depression, PTBS, Psychose, ADHS) kann mitbehandelt werden, soweit die Rehabilitationsfähigkeit gegeben ist. Bestehende psychiatrische Medikation ist laut Konzept keine Kontraindikation."
  },
  "ck-bavaria-kreischa": {
    "sozialdienstLeistungen": [
      "Belegung/Patientenmanagement berät zu Antragstellung und Voraussetzungen."
    ],
    "factsExtra": [
      "Anmeldung und Aufnahme über das Patientenmanagement der Klinik."
    ],
    "kontraindikationen": [
      "Keine Aufnahme bei Essstörungen mit Untergewicht."
    ],
    "alltag": [
      "Psychosomatik in Klinik IV im Altkomplex: renovierte Einzelzimmer, teilweise mit Balkon, Verdunklungsmöglichkeiten.",
      "In der Psychosomatik TV und WLAN kostenfrei; Speisesaal mit täglicher Auswahl aus Vollkost, Schonkost und Reduktionskost.",
      "Lage direkt am Kreischaer Kurpark, Ortskern wenige Gehminuten, zwei Bushaltestellen an der Klinik."
    ],
    "therapieHinweise": [
      "Kognitiv-verhaltenstherapeutisches Konzept mit integrativen Anteilen; Einzel- und Gruppenpsychotherapie.",
      "Bei Trauma: 3-Phasen-Modell nach Reddemann/Sachse (Stabilisierung, Konfrontation, Integration).",
      "Weitere Verfahren u. a. Biofeedback, Lichttherapie, Kunst- und Gestaltungstherapie, Terraintraining.",
      "Therapeutische Arbeitsversuche und berufsbezogene Module im MedZAB (MBO/MBOR, MBR Phase II)."
    ],
    "wahlleistungenHinweis": "In der Psychosomatik (Klinik IV) TV und WLAN kostenfrei. Zimmertelefon auf Wunsch kostenpflichtig an der Rezeption.",
    "mitbehandlungHinweis": "Medikamentöse Therapie als gleichberechtigter Ansatz im biopsychosozialen Konzept, im Einzelfall abgesprochen. Suchterkrankungen nur bei bestehender stabiler Abstinenz."
  },
  "ck-bergisch-land": {
    "alltag": [
      "Ambulante psychosomatische Reha: Therapien unter der Woche, Abende und Wochenenden zu Hause.",
      "Aufenthalts- und Ruheräume in der Klinik.",
      "Ambulante Psychosomatik: abschließbarer Garderobenschrank, Duschräume, Mahlzeiten im Patientenrestaurant.",
      "Keine Kartenzahlung im Haus; Bargeld für Gebühren und Cafeteria mitbringen."
    ],
    "sozialdienstLeistungen": [
      "Sozialdienst und Zuweiserberatung am Standort; Patientenaufnahme Tel. 0202 2463-2061 (8–14 Uhr)."
    ],
    "therapieHinweise": [
      "Ambulante Psychosomatik: Einzel- und Gruppentherapie, bei Bedarf Angehörigengespräche.",
      "Arbeitsdiagnostik und Arbeitstherapie; Pflegebegleitung.",
      "Zusätzlich multimodale Schmerztherapie in Kooperation mit dem Helios Universitätsklinikum Wuppertal."
    ],
    "factsExtra": [
      "Chefärztin Psychosomatik Bernadette Gregull.",
      "Teilstationäre onkologische Plätze am Standort laut Träger."
    ],
    "wahlleistungenHinweis": "Komfortstation als Wahlleistungsunterkunft mit Flachbildschirm-TV, Internetzugang, Tages- und Fernsehzeitung sowie Menü-Auswahl. Begleitpersonen: Zustellbett bzw. Komfortunterbringung laut Trägerflyer.",
    "mitbehandlungHinweis": "Psychoonkologische Betreuung am Standort. Aufnahme von MRSA-Patientinnen und -Patienten; palliative Beschwerdelinderung bei nicht heilbarer Erkrankung öffentlich genannt."
  },
  "ck-bergstrasse": {
    "alltag": [
      "Doppelzimmer mit Bad und abschließbaren Schränken; Einzelzimmer bei medizinischer Indikation.",
      "Hallenschwimmbad, Sauna, Sporthalle, Cafeteria und Bibliothek.",
      "Funktionsbereiche barrierefrei.",
      "Doppelzimmer mit Bad und abschließbaren Schränken.",
      "Einzelzimmer bei medizinischer Indikation.",
      "Alle Funktionsbereiche barrierefrei. Hallenschwimmbad, Sauna und Sporthalle im Haus."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei Finanzen, Beruf und Wohnung.",
      "Bestandsaufnahme bei Schulden und Vermittlung an eine Schuldnerberatung.",
      "Betriebsgespräche mit Arbeitgebern zur Wiedereingliederung.",
      "Sozialbericht und Antrag auf Kostengenehmigung werden mit der vermittelnden Stelle erarbeitet.",
      "Vorgespräch und Klinikbesichtigung über das Aufnahmesekretariat."
    ],
    "therapieHinweise": [
      "Feste Bezugsgruppe: wöchentlich vier Gruppensitzungen plus Einzelgespräch.",
      "Arbeitstherapie in Garten, Schreinerei, EDV, Haustechnik und Hauswirtschaft.",
      "Klinikseelsorge im Angebot.",
      "Kombinierte Reha mit Tagesrehabilitation Darmstadt und Adaption Heppenheim.",
      "Erstbehandlung Alkohol/Medikamente öffentlich mit 13 Wochen genannt, Drogenabhängigkeit bis 22 Wochen.",
      "Kombinierte Reha Sucht möglich: stationäre Phase plus anschließende ambulante Weiterbehandlung."
    ],
    "factsExtra": [
      "Suchtmittelfreiheit als Aufnahmevoraussetzung ausgewiesen.",
      "Cannabis und illegale Suchtmittel stehen im Behandlungsangebot.",
      "Vorgespräch und Klinikbesichtigung über das Aufnahmesekretariat möglich.",
      "Seit 1968 Männerhaus der Caritas Darmstadt in Bensheim.",
      "Suchtmittelfreiheit ist als Aufnahmebedingung ausgewiesen.",
      "Adaption in Heppenheim und teilstationäre Phase in der Fachklinik Am Birkenweg möglich."
    ],
    "mitbehandlungHinweis": "Körperliche Folgeerkrankungen werden neurologisch, orthopädisch und internistisch mitbehandelt; Facharzt für Innere Medizin und Diabetologie im Haus.",
    "kontraindikationen": [
      "Fachklinik für suchtkranke Männer; Aufnahme von Frauen in diesem Haus nicht vorgesehen."
    ],
    "wahlleistungenHinweis": "WLAN im Haus. Freizeit u. a. Billard, Dart, Tischkicker und Musikinstrumente (Schlagzeug, Keyboard). Umbau seit 2025; das Rehabilitationsprogramm bleibt laut Klinikseite während der Bauphase sichergestellt."
  },
  "ck-bergzabern": {
    "kontraindikationen": [
      "Kein Auftrag für Suchtrehabilitation (Alkohol, Drogen)",
      "Dauerhafte oder langdauernde Benzodiazepineinnahme erst nach Entgiftung bzw. stabiler Umstellung",
      "Cannabis rauchen oder verdampfen (auch bei ärztlicher Verordnung)",
      "Adipositas über 130 kg",
      "Essstörungen unter BMI 17"
    ],
    "alltag": [
      "Einzelzimmer überwiegend mit Balkon oder Terrasse, Dusche, WC, Telefon und Wertschließfach; kein TV im Zimmer, keine Kühlschränke.",
      "Therapieplan ist verpflichtend; Anreise 8:00–10:00 Uhr an der Rezeption.",
      "Besuch außerhalb der Therapiezeiten sowie an Wochenenden; keine Übernachtung im Patientenzimmer.",
      "Rauchfreie Klinik, Rauchen nur im gekennzeichneten Außenbereich. Keine geplanten Heimfahrten.",
      "Einzelzimmer überwiegend mit Balkon oder Terrasse, Dusche, WC, Telefon und Wertschließfach.",
      "Kein Fernseher im Zimmer aus therapeutischen Gründen; öffentliche Fernsehräume."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutische Psychosomatik mit störungsspezifischen Gruppen zu Angst, Depression und Tinnitus.",
      "Körperverhaltenstherapie inkl. Feldenkrais, Yoga, QiGong, Achtsamkeit und Sport.",
      "Tinnitus, Hyperakusis und M. Menière als ausgewiesener Schwerpunkt; HNO-Abklärung soll zuvor erfolgt sein.",
      "MBOR bei beruflichen Problemlagen; Psy-RENA-Nachsorge der DRV im Anschluss möglich.",
      "Eigenes Hyperakusis-Konzept, auch isoliert ohne Tinnitus.",
      "MBOR bei besonderen beruflichen Problemlagen ausgewiesen."
    ],
    "factsExtra": [
      "Hund oder Katze als Begleittier nach Klinikregel möglich.",
      "Regeldauer der medizinischen Reha 35 Tage, Verkürzung oder Verlängerung mit dem Leistungsträger.",
      "Kostenloser Bahnhofstransfer nach rechtzeitiger Anmeldung.",
      "Kostenloser Abholservice vom Bahnhof nach Voranmeldung.",
      "Haustier: Impf- und Haftpflichtnachweis sowie tierärztliche Gesundheitsbescheinigung vorab."
    ],
    "wahlleistungenHinweis": "Telefon im Zimmer gegen Gebühr (nur bei Freischaltung). Parken an der Klinik gegen Gebühr, kostenfrei am Waldrand. Beihilfefähigkeit nach § 30 GewO / BVO.",
    "mitbehandlungHinweis": "Hanglage im Mittelgebirge, Klinik nicht barrierefrei zugänglich. Begleitende körperliche Erkrankungen im psychosomatischen Rahmen; HNO-Behandlung bei Tinnitus nicht im Haus.",
    "sozialdienstLeistungen": [
      "Sozialtherapie als ausgewiesener Baustein des Behandlungsspektrums.",
      "Die Klinik berät bei der Antragstellung (Kontaktzeiten laut Klinikseite Montag bis Donnerstag 9:00–14:00 Uhr)."
    ]
  },
  "ck-berleburg": {
    "alltag": [
      "Aufnahme in der Psychosomatik dienstags oder mittwochs möglichst bis mittags (Rothaarklinik-Flyer).",
      "Wahlleistungszimmer: Ein- und Zweibett mit Bad, Safe, Minibar, WLAN, Zeitungsservice.",
      "Ruhezeiten 19:30–07:00 Uhr und 12:00–14:00 Uhr; Außentüren ab 22:30 Uhr verschlossen.",
      "Rauchen nur in ausgewiesenen Außenbereichen, nicht im Gebäude und nicht auf Balkonen.",
      "Private Elektrogeräte wie Wasserkocher, Fernseher oder Heizdecken nicht in Betrieb; Mobiltelefone, Tablets und Notebooks gestattet.",
      "Keine verderblichen Lebensmittel und kein Klinikgeschirr auf dem Zimmer; Waschen in den vorgesehenen Räumen."
    ],
    "sozialdienstLeistungen": [
      "Patientendisposition organisiert Aufnahme und Weiterbehandlung; Ansprechpartner Teamleitung Patientenaufnahme.",
      "Sozialdienst nimmt bei Bedarf Kontakt zu Behörden und Betriebsärzten auf und bereitet die Reha-Nachsorge vor."
    ],
    "factsExtra": [
      "Psychosomatik in der Rothaarklinik (Arnikaweg); weitere Häuser am Standort Bad Berleburg."
    ],
    "wahlleistungenHinweis": "Wahlleistungszimmer mit Komfortelementen (u. a. Bademantel, kostenfreie Minibar, Wäscheservice, WLAN). Unterbringung und Verpflegung einer Begleitperson auf Anfrage. Abklärung mit der Krankenversicherung empfohlen.",
    "therapieHinweise": [
      "Therapiekonzept verbindet tiefenpsychologische, systemische und verhaltenstherapeutische Elemente.",
      "Schwerpunkte u. a. Psychoseerkrankungen, Essstörungen und Adipositas; Borderline- und Essstörungsstation nimmt laut Trägerflyer nur Patientinnen auf."
    ]
  },
  "ck-berolina": {
    "kontraindikationen": [
      "Psychosomatische Reha laut Klinikinfo nicht geeignet bei akuten Psychosen, ausgeprägter psychischer Instabilität oder ernsten Selbstmordgedanken.",
      "Essstörungen sowie Alkohol- oder Spielsucht werden in anderen spezialisierten Kliniken behandelt."
    ],
    "alltag": [
      "Rauchverbot; Erklärung zum Rauchverbot und zu eigenen elektrischen Geräten vorab ausfüllen."
    ],
    "sozialdienstLeistungen": [
      "Einzelberatung MBOR u. a. zu Teilhabe am Arbeitsleben, stufenweiser Wiedereingliederung, Nachsorge, Renten- und Schwerbehindertenrecht.",
      "Kontaktaufnahme zum Sozialdienst für Nachsorge, IRENA und digitale Nachsorge (Psychosomatik/DE-RENA, VOR/EVOCARE)."
    ],
    "therapieHinweise": [
      "Tiefenpsychologisch fundierte und Verhaltenstherapie.",
      "Verhaltensmedizinische Orthopädie (VOR); Migräne- und Kopfschmerztherapie, Weiterbildungseinrichtung der MigräneLiga.",
      "Spezialangebote für pflegende Angehörige sowie Polizei, Feuerwehr und Rettungsdienst."
    ],
    "factsExtra": [
      "Beihilfefähig nach § 6 Abs. 3 BVO laut Qualitätsbericht.",
      "Hauptbeleger DRV Bund."
    ],
    "wahlleistungenHinweis": "Privatversicherte können Verträge mit Chefarztbehandlung in Psychosomatik bzw. Orthopädie wählen.",
    "mitbehandlungHinweis": "Psychosomatik, verhaltensmedizinische Orthopädie (VOR) sowie Migräne- und Kopfschmerztherapie am Standort."
  },
  "ck-berus": {
    "kontraindikationen": [
      "Primäre Suchterkrankungen.",
      "Akute schizophrene oder bipolare Psychosen.",
      "Demenz; akute Suizidalität.",
      "Jugendliche im Regelfall unter 17 Jahren.",
      "Tinnitus; pathologisches Glücksspiel."
    ],
    "sozialdienstLeistungen": [
      "Beratung zu Berufsklärung, Ausbildung und Umschulung.",
      "Organisation interner und externer Belastungserprobung.",
      "Wohnungs-, Schulden- und Rentenfragen; Nachsorgevermittlung."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutische Einzel-, Gruppen-, Paar- und Familientherapie.",
      "Schwerpunkte u. a. Depression, Angst, Mobbing, Traumafolgen und Essstörungen.",
      "Arbeitstherapie und Projektgruppen in der Ergotherapie.",
      "Dreiteilige Teamstruktur, ein Team mit französischsprachigem Schwerpunkt.",
      "Vollständiges psychosomatisches Behandlungsangebot in französischer Sprache (u. a. Luxemburg und Frankreich).",
      "Patenpatientin oder Patenpatient zur Orientierung nach der Aufnahme."
    ],
    "factsExtra": [
      "Gesamtes Behandlungsangebot auch auf Französisch.",
      "Beihilfe öffentlich als möglich genannt (anteilige Kostenübernahme vorab klären).",
      "Vorsorge- und Rehabilitationseinrichtung nach § 107 SGB V; Belegung DRV und Krankenkassen; als gemischte Krankenanstalt beihilfefähig.",
      "Fachkrankenhaus: Zugang über ärztliche Einweisung und Vorgespräch mit Fragebogen.",
      "Fachkrankenhaus: Anreise am Aufnahmetag bis 08:30 Uhr."
    ],
    "alltag": [
      "Drei Gebäudeteile: Haus Europa, Haus Lothringen, Haus Saarland.",
      "Zimmer mit Telefon, Dusche und WC, teilweise Balkon; allergenarme Zimmer ausgewiesen.",
      "Klinikgebäude nicht rollstuhlgerecht ausgestattet.",
      "Sauna, Fitnessraum, Sporthalle, Schwimmbad und Außenfeld für Ballsportarten.",
      "Handtücher werden gestellt; Waschmaschinen und Trockner gegen Waschmarken an der Rezeption.",
      "WLAN kostenpflichtig an der Rezeption; auf Zimmern kein Fernseher, Aufenthaltsräume vorhanden."
    ],
    "mitbehandlungHinweis": "Besucherinnen und Besucher können gegen Entgelt am Essen teilnehmen; Essensmarken in der Cafeteria. Zimmer und Stationsräume sind stationären Patientinnen und Patienten vorbehalten."
  },
  "ck-birkenbuck": {
    "kontraindikationen": [
      "Intravenöser Konsum illegaler Drogen wird in der Klinik nicht behandelt."
    ],
    "alltag": [
      "86 Einzel- und 12 Doppelzimmer mit Dusche, WC und Telefon, teils mit Balkon; Wohneinheiten mit 8–9 Mitpatientinnen und Mitpatienten, Gemeinschaftsräume mit TV, Teeküche und WLAN-Bereich.",
      "Pflege des Wohnbereichs in Eigenverantwortung; Betreuung durch Gruppentherapeutin bzw. Gruppentherapeut.",
      "Sporthalle, medizinische Trainingstherapie, Bewegungsbad mit Sauna, Lehrküche, Werkstätten für Arbeitstherapie und Belastungserprobung."
    ],
    "sozialdienstLeistungen": [
      "Berufsberatung, berufliche Diagnose und Arbeitstherapie.",
      "Schuldnerberatung; Angehörigenarbeit."
    ],
    "therapieHinweise": [
      "Stationäre Module zwischen 6 und 13 Wochen; Langzeitmodul bei geringer sozialer Integration; Kombibehandlung 8 Wochen stationär plus Weiterbehandlung in der Beratungsstelle.",
      "Medikamentenabhängigkeit insbesondere von Tranquilizern, anderen Psychopharmaka und Schmerzmitteln; Mehrfachabhängigkeit mit drogenbezogenen Störungen unterhalb der Abhängigkeitsschwelle.",
      "Fünftägige Belastungserprobung in einer eigenen Wohngruppe.",
      "Behandlung nach vorheriger Entgiftung.",
      "Schwerpunkte PTBS, komplexe Traumafolgestörungen und dissoziative Störungen.",
      "Pathologisches Glücksspiel; Therapie 55+; familienorientierte Suchtreha; MBOR."
    ],
    "factsExtra": [
      "Träger Kur + Reha GmbH; Kooperation mit der benachbarten psychosomatischen Rehaklinik Kandertal.",
      "Historisches Gebäude von 1902 (ehemaliges Lungensanatorium); seit 1981 Suchtrehabilitation.",
      "Seit 2011 auch pathologische Glücksspielabhängigkeit und Internetsucht.",
      "Frauen und Männer ab 18 Jahren.",
      "Jugendstil-Gebäude im Südschwarzwald.",
      "Bei vorliegender Kostenzusage Termin direkt mit der Klinik."
    ]
  },
  "ck-birkental": {
    "alltag": [
      "Freundlich ausgestattete Einzelzimmer mit Dusche/WC, TV, Kühlschrank, Wertfach, Telefon; teilweise Balkon.",
      "WLAN auf dem Zimmer gegen Gebühr; kostenfreies WLAN in Eingangsbereich und Cafés.",
      "Mittagsruhe 13.00–15.00 Uhr; Nachtruhe 22.30 Uhr, samstags 23.30 Uhr.",
      "Rauchfreie Zone einschließlich der Balkone.",
      "Besuch so legen, dass der Therapieablauf eingehalten wird; Empfang im Café oder in der Eingangshalle.",
      "Waschmaschinen, Trockner und Bügelzimmer vorhanden; Wäschewaschen auf dem Zimmer und mitgebrachte Bügeleisen nicht gestattet."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung zu Schwerbehindertenrecht, beruflicher Rehabilitation, Rente, Krankengeld, Arbeitslosengeld und Übergangsgeld.",
      "Offene Sprechzeit der Sozialberatung; Termin auch über die behandelnde Ärztin bzw. den behandelnden Arzt.",
      "Vorbereitung und Sicherung der Nachsorge sowie der beruflichen Wiedereingliederung im Einzelgespräch."
    ],
    "wahlleistungenHinweis": "WLAN auf dem Zimmer gegen Gebühr. Begrenzte Zahl Komfortzimmer für Selbstzahler. Telefon auf dem Zimmer gegen Gebühr.",
    "mitbehandlungHinweis": "Fachklinik für Orthopädie und Psychosomatik im selben Haus; kontinuierliche medizinische Betreuung mit Überprüfung der Medikation und zeitnahen fachärztlichen Untersuchungen.",
    "therapieHinweise": [
      "Eigene Fachabteilung Psychosomatik mit Post-Covid-Reha.",
      "Reha mit Partner und Reha für pflegende Angehörige auf der Trägerseite."
    ],
    "factsExtra": [
      "Katalog-Download und Informationen von A bis Z.",
      "Mehrere Häuser am Standort; Birkental ist die Psychosomatik, nicht Quellental oder Wildetal."
    ]
  },
  "ck-birkenweg": {
    "alltag": [
      "Behandlungszeiten Mo–Fr 8:15–16:30 Uhr (Morgenrunde 8:15), Samstag 8:30–12:30 Uhr.",
      "Rauchfreie Klinik; Rauchen nur am vorgesehenen Außenplatz, nicht während der Therapien.",
      "Handy während der Therapiezeit ausgeschaltet im Spind; in den Pausen in den vorgesehenen Räumen.",
      "Vollwertiges Mittagessen im Speiseraum mit Wintergarten; Teeküche und Kühlmöglichkeiten für mitgebrachte Getränke.",
      "Tagsüber Therapie, abends und am Wochenende zu Hause.",
      "Ehemalige Arztvilla mit Terrasse und Garten, 10 Gehminuten vom Hauptbahnhof."
    ],
    "sozialdienstLeistungen": [
      "Arbeitstherapie und Belastungserprobung; EDV-Plätze, Bewerbertraining, Internetzugang zur Stellensuche und Betriebsgespräche zum Arbeitsplatz.",
      "Im letzten Abschnitt Intensivierung des Kontakts zu wohnortnaher Fachambulanz bzw. Beratungsstelle und Selbsthilfegruppe.",
      "Mittwochs 18:00 Uhr Informationsgruppe des Kreuzbundes."
    ],
    "therapieHinweise": [
      "Intensives Programm an sechs Tagen die Woche; tägliche Anwesenheit.",
      "Täglich Facharzt für Psychiatrie und Psychotherapie; Kreativtherapie, Gesundheitstraining, Kochkurse und Sport zweimal wöchentlich.",
      "Ganztägig ambulante Entwöhnung für 14 Frauen und Männer mit Alkohol-, Medikamenten- und Drogenabhängigkeit.",
      "Infonachmittag jeden ersten und dritten Dienstag um 16 Uhr ohne Voranmeldung."
    ],
    "factsExtra": [
      "Prospekt, A–Z-Heft und Rehabilitationskonzept als PDF.",
      "Schwesterhaus der Klinik Schloss Falkenhof, Caritas Darmstadt."
    ]
  },
  "ck-blankenburg": {
    "kontraindikationen": [
      "Schizophrenie im akuten Stadium.",
      "Akute Suizidalität.",
      "Dementielle Störungen, die eine Teilnahme am Therapieablauf ausschließen.",
      "Schwere organische Erkrankungen mit intensivem Behandlungsbedarf.",
      "Ansteckende Erkrankungen, z. B. offene Lungentuberkulose."
    ],
    "alltag": [
      "Besuch erst nach der 3. Aufenthaltswoche am Wochenende, nach Anmeldung; nicht auf dem Patientenzimmer.",
      "Haustiere sind untersagt.",
      "Rauchen nur in gekennzeichneten Außenbereichen; im Haus Rauchverbot, auf dem Gelände Alkoholverbot.",
      "Kein Fernseher auf dem Zimmer; intern nutzbares Haustelefon.",
      "Frischküche im Haus, auch vegetarische Kost; Waschmaschinen und Trockner gegen Gebühr."
    ],
    "sozialdienstLeistungen": [
      "Beratung zu finanziellen Schwierigkeiten, juristischen Fragen sowie sozialer und beruflicher Wiedereingliederung."
    ],
    "therapieHinweise": [
      "Psychotherapie als zentraler Bereich, ergänzt durch Einzelgespräche und indikative Gruppen (u. a. TSK, Nichtrauchertraining, PMR).",
      "Ergo- und Arbeitstherapie inkl. Diagnostik MELBA und MOHO.",
      "Konzepte Mutter/Vater und Kind, kognitiv eingeschränkte Patienten sowie Borderline-Störung laut Klinikseite.",
      "Regelmäßige Angehörigenseminare."
    ],
    "factsExtra": [
      "Eltern-Kind: Kinder als Begleitpersonen ab 1 Jahr, höchstens 12 Jahre, bis zu zwei Kinder; eigene Kinderbetreuung während der Therapiezeiten.",
      "Patienten-App als Begleiter vor, während und nach der Reha.",
      "Teilweise Zimmer mit Balkon; kein TV-Gerät mitbringen.",
      "Anreise ohne Kfz; kein Patientenparkplatz laut FAQ."
    ],
    "wahlleistungenHinweis": "Waschmaschinen, Trockner und Bügeleisen stehen gegen Gebühr zur Verfügung. Keine Wunschzimmer-Reservierung.",
    "mitbehandlungHinweis": "Physio- und Bewegungstherapie zur Wiederherstellung der körperlichen Leistungsfähigkeit; Medikamente werden über den Pflegebereich ausgegeben."
  },
  "ck-blaukreuz-lippe": {
    "alltag": [
      "Einzelzimmer mit Dusche/WC; Leben im Wohngemeinschaftscharakter.",
      "Eigenständige Versorgung über Gemeinschaftsküche auf jeder Etage.",
      "Gruppen-, Hauswirtschafts- und Arbeitstherapieräume; Turnhalle einmal wöchentlich."
    ],
    "sozialdienstLeistungen": [
      "Hilfe bei Behördenangelegenheiten, Wohnungssuche und Arbeitsaufnahme.",
      "Vermittlung in Ambulant Betreutes Wohnen, ambulante Rehabilitation und Selbsthilfegruppen.",
      "Unterstützung und Nachsorge auf der Trägerseite."
    ],
    "therapieHinweise": [
      "Regelmäßige Einzel- und Gruppengespräche zu alltagsnahen Problemen.",
      "Arbeitserprobung intern sowie Praktikum in ortsansässigen Betrieben.",
      "Aufnahme von Frauen und Männern mit Alkohol-, Medikamenten- oder multiplem Substanzgebrauch sowie pathologischem Spielverhalten.",
      "Zweite Phase der stationären medizinischen Rehabilitation nach Entwöhnung.",
      "14 stationäre Plätze plus ganztägig ambulante Plätze."
    ],
    "factsExtra": [
      "Seit 1993 von der DRV Westfalen als Adaption anerkannt.",
      "Belegung durch andere RV-Träger und Krankenkassen möglich."
    ]
  },
  "ck-boeddiger": {
    "alltag": [
      "Unterbringung in Einzel- und Doppelzimmern.",
      "Telefon und Briefe ab dem ersten Tag; erster Besuch in der Regel im ersten Monat.",
      "Eltern-Kind-Haus: Alltag mit Kind unter einem Dach, Erziehungshilfe.",
      "Telefonieren und Briefe schreiben ab dem ersten Tag.",
      "Erster Besuch in der Regel im ersten Monat.",
      "Ausgänge anfangs in Begleitung, nach der Behandlungsplanung auch allein."
    ],
    "therapieHinweise": [
      "Einzel- und Gruppentherapie, Arbeits- und Sporttherapie, Freizeitmaßnahmen.",
      "Interne Beschulung bzw. nachträglicher Schulabschluss möglich.",
      "Integrierte Adaption mit Berufspraktika genannt.",
      "Hauptschulkurs in Kleingruppe am Vormittag plus zwei Nachmittage individuelle Lerngruppen; Vorbereitung auf die externe Prüfung durch das staatliche Schulamt.",
      "Zwei Abteilungen: Rehabilitationsbereich und Eltern-Kind-Haus.",
      "Gruppentherapie ausschließlich in Kleingruppen; Einzeltherapie bei Bezugstherapie und Fachärztinnen bzw. Fachärzten."
    ],
    "factsExtra": [
      "Suchttherapie für junge und ältere Erwachsene, Schwangere und Eltern/Alleinerziehende.",
      "Aufnahme ab 17 Jahren mit Kostenzusage (DRV, Krankenkasse oder Jugendamt).",
      "Kindesunterbringung über Jugendamt und Haushaltshilfe des Eltern-Kostenträgers.",
      "Team u. a. mit Heilpädagogik, Erzieherinnen und Erziehern sowie hauptamtlichen Lehrkräften.",
      "Beschulungskonzept für Volljährige seit 2005, evaluiert durch das Bundesgesundheitsministerium.",
      "Träger: Drogenhilfe Nordhessen e. V., Kassel."
    ],
    "sozialdienstLeistungen": [
      "Anschluss möglich: betreute Wohngemeinschaft und einzelbetreutes Wohnen in Rotenburg a. d. Fulda nach Therapieabschluss (Kostenzusage des überörtlichen Sozialhilfeträgers).",
      "Unterstützung bei der Beantragung der Kostenübernahme zusammen mit der Suchtberatung.",
      "Infogespräch vor Ort vor der Aufnahme."
    ]
  },
  "ck-boerstingen": {
    "alltag": [
      "Freizeit- und Sportprogramm, Sauna und Kraftraum auf dem Gelände.",
      "Hausordnung: Abstinenz und Verzicht auf jegliche Form von Gewalt.",
      "Motivations- und Behandlungsphase mit unterschiedlichen Ausgangs- und Besuchsregelungen."
    ],
    "sozialdienstLeistungen": [
      "Schuldensichtung und Einleitung erster Schritte einer Schuldenregulierung.",
      "Vorbereitung von Weiterbehandlung, Nachsorge und Anschluss an eine Selbsthilfegruppe.",
      "Informationen zur MPU durch Fachpersonal.",
      "Externe Adaption im mevesta-Adaptionszentrum Fellbach."
    ],
    "therapieHinweise": [
      "Therapiemodule: Kurzzeit und Kombinationsbehandlung 12 Wochen, Mittelzeit 16 Wochen, THC-Modul 20 Wochen, Langzeit 24 Wochen.",
      "Spezielle Konzepte zu ADHS, Legal Highs/Spice, THC und Partydrogen sowie Spiel- und Mediensucht.",
      "Einzel-, Gruppen- und Arbeitstherapie plus pädagogische Maßnahmen; Ernährungsberatung.",
      "Interdisziplinäres Team aus Ärztinnen und Ärzten, Psychotherapie, Ergo- und Sporttherapie, Pflege und Verwaltung.",
      "Stationäre medizinische Rehabilitation für junge Erwachsene mit Drogen- und Alkoholabhängigkeit."
    ],
    "factsExtra": [
      "Zielgruppe 17–30 Jahre, bei entsprechender Indikation Aufnahme bis 35 Jahre.",
      "Therapie ist vollständig entgiftet anzutreten; Entzug kann über die Kooperationsstation Time Out am Klinikum Nordschwarzwald geplant werden.",
      "Schriftliche Kostenzusage, Bewerbungsbogen und unterschriebener Behandlungsvertrag; Nahtlosverfahren möglich.",
      "Weitere genannte Unterlagen: Krankenversicherungsschutz, Zahnsanierungsbescheinigung, Bescheinigungen zu Übergangsgeld/Kranken-/Kindergeld bzw. Taschengeld oder Bürgergeld, möglichst Hepatitis-Serologie und HIV-Test.",
      "Schloss Börstingen; Zielgruppe ca. 17–30 Jahre laut Trägerseite.",
      "Anerkennung nach §§ 35/36 BtMG."
    ]
  },
  "ck-borkum": {
    "alltag": [
      "Einzelzimmer grundsätzlich ohne Zuschlag.",
      "Klinikbus vom Hafen nach Mitteilung der Ankunftszeit.",
      "WLAN kostenfrei; Freizeit u. a. Billard, Aquagymnastik, Bewegung am Strand.",
      "Grundsätzlich Einzelzimmer, daher kein Einzelzimmerzuschlag.",
      "WLAN kostenfrei; Fernseher im Zimmer und im Gemeinschaftsraum.",
      "Klinikbus holt vom Hafen ab; Ankunftszeit vorher mitteilen."
    ],
    "therapieHinweise": [
      "Duale Reha Haut und Psychosomatik (Psycho-Dermatologie) mit gemeinsamem Therapieplan.",
      "Klimatherapie im Hochseeklima.",
      "Fragebogen zu Reha-Zielen wird bereits im Vorfeld zugesandt.",
      "Psychosomatik unter anderem bei Depression, Angst, somatoformen Störungen, arbeitsplatzbezogenen Ängsten und Burn-out.",
      "Duale Reha: gleichwertige Behandlung von Dermatologie und Psychosomatik (Psycho-Dermatologie).",
      "Klimatherapie im schadstoff- und allergenarmen Hochseeklima."
    ],
    "factsExtra": [
      "72 Plätze Psychosomatik und 24 Plätze duale Reha Psycho-Dermatologie laut öffentlicher Angabe.",
      "AHB bei onkologischer Nachbehandlung von Melanomen (Stadium 1–3).",
      "Besuche auf den Zimmern laut Hausordnung nicht gestattet; Treffen in den Aufenthaltsbereichen der Eingangshalle. Ausgangszeiten: Sonntag bis Donnerstag bis 23 Uhr, Freitag und Samstag bis 24 Uhr; Übernachtung außer Haus nicht gestattet.",
      "Sprachkenntnisse im Haus: Arabisch, Französisch, Türkisch, Russisch, Englisch.",
      "Gepäck kann vorab per Hermes geschickt werden, wenn der Reisegutschein das vorsieht.",
      "Kostenträger: Rentenversicherung, gesetzliche und private Krankenkassen, Berufsgenossenschaften, Selbstzahler."
    ],
    "kontraindikationen": [
      "Aufnahmegrenze Körpergewicht 130 kg.",
      "Keine Aufnahme von Kindern."
    ],
    "mitbehandlungHinweis": "Begleitperson bei medizinischer Notwendigkeit. Begleiterkrankungen des allergischen Formenkreises, des Bewegungsapparates sowie Ernährungs- und Stoffwechselkrankheiten."
  },
  "ck-bramstedt": {
    "therapieHinweise": [
      "Vollstationäre psychosomatische Rehabilitation und vollstationäre psychosomatische Krankenhausbehandlung am Standort.",
      "Hochspezialisierte Behandlungsangebote nach Krankheitsbild; Programm CBASPersonalized für chronische Depression ist ausgewiesen.",
      "Reha erst bei Rehafähigkeit; akute Symptomatik über die Krankenhausbehandlung.",
      "Bezugstherapeutensystem: Bezugstherapeutin oder Bezugstherapeut bereits im Aufnahmegespräch, individuelles Störungsmodell und Therapieplan.",
      "Einzel- und Gruppenpsychotherapie, Achtsamkeit, Entspannung (Yoga, progressive Muskelentspannung, autogenes Training), Biofeedback, Kunst- und Gestaltungstherapie, Sport und Physiotherapie.",
      "Indikative Gruppen unter anderem berufsbezogen für Lehrkräfte sowie Trauerbewältigung."
    ],
    "factsExtra": [
      "Aufnahme unabhängig vom Versicherungsstatus (gesetzlich und privat).",
      "Wald- und Heidelandschaft Bad Bramstedt zwischen Hamburg und Kiel.",
      "Borderline-Trialog für Patientinnen und Patienten, Angehörige und Fachkräfte.",
      "Stationäre Psychosomatik und psychosomatische Reha am Standort; Akutaufnahme über Facharzteinweisung, Reha über den Kostenträger.",
      "Volljährige Versicherte aller Kassen, Beihilfe und Selbstzahlende; Begleitpersonen und Haustiere sind für die Krankenhausbehandlung nicht vorgesehen.",
      "Online-Anmeldung mit Anmeldebogen und persönlichem Bericht; postalisch an die Schön Klinik Beratung in Berlin, bitte keine Originale."
    ],
    "wahlleistungenHinweis": "Schön-Komfort-Pakete und wahlärztliche Behandlung. Privatklinik: Wahlleistung Einzelzimmer 200 €/Tag, Doppelzimmer 104 €/Tag; wahlärztliche Leistungen nach GOÄ (Richtwert der Klinik ca. 75 €/Behandlungstag). Kurzfristige Aufnahmen im akutstationären Wahlleistungs-/Privatbereich.",
    "alltag": [
      "Rehabilitation derzeit ausschließlich für volljährige Patientinnen und Patienten.",
      "Anreise in der Regel zwischen 09:00 und 11:00 Uhr; Meldung an der Rezeption neben dem Haupteingang.",
      "Zimmer mit TV-Anschluss und Festnetz; Fernseher auf Wunsch gegen Gebühr, sonst Gemeinschaftsfernseher auf Station und im Freizeitraum.",
      "Frühstück, Mittag und Abendessen als Buffet; Vollkost und vegetarisches Menü, kein veganes oder ethnisches Essensangebot.",
      "Mobilfunk in den öffentlichen Bereichen untersagt; WLAN-Netz und Internetcafé im Haus.",
      "Cannabiskonsum auf dem gesamten Gelände während des Aufenthalts untersagt, außer in individuell genehmigten medizinischen Ausnahmefällen."
    ],
    "sozialdienstLeistungen": [
      "Fallmanagement für Rehabilitandinnen und Rehabilitanden mit Hauptwohnsitz in Schleswig-Holstein, Hamburg oder Mecklenburg-Vorpommern, unabhängig vom DRV-Träger.",
      "Sozialdienst ist als Fachtherapie im Haus ausgewiesen."
    ],
    "mitbehandlungHinweis": "Bei somatoformen Beschwerden soll die organische Abklärung vor dem Aufenthalt abgeschlossen sein, damit die Stationszeit für die Therapie genutzt werden kann."
  },
  "ck-briese": {
    "alltag": [
      "Besuchszeiten für nicht konsumierende Angehörige und Freunde: wochentags 17–20 Uhr, Wochenende und Feiertage 12–20 Uhr.",
      "Kostenloses WLAN; Fahrradverleih; Garten, Volleyball, Tischtennis, Billard.",
      "Klinikbesichtigung im Rahmen eines Vorgesprächs nach Termin über die Aufnahmekoordination.",
      "43 Therapieplätze in Einzel- und Doppelzimmern, mehrere Gebäude, Volleyballplatz."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei Behördenangelegenheiten und Kontakt zu Schuldnerberatungen.",
      "Vermittlung in Adaption, Nachsorge und betreutes Wohnen.",
      "Soziotherapie und Arbeitstherapie.",
      "Anschlussadaption z. B. im Adaptionshaus Birkenwerder."
    ],
    "therapieHinweise": [
      "Traumafolgestörungen: traumaspezifische Einzeltherapie und traumasensibles Yoga.",
      "ADHS-Diagnostik im Erwachsenenalter; Skill-basierte Emotionsregulation bei Persönlichkeitsstörungen.",
      "Frauengruppe, Elterngruppe und Raucherentwöhnung öffentlich genannt.",
      "Ergo- und Arbeitstherapie u. a. Lehrküche, Garten, Büro-Organisation; externes Praktikum gegen Ende nach Absprache.",
      "Entwöhnung mindestens 22 Wochen.",
      "Feste Bezugstherapeutinnen/-therapeuten und Bezugsgruppen."
    ],
    "factsExtra": [
      "Frauen und Männer.",
      "Abstinenzbereitschaft von Alkohol und Drogen als Rahmenbedingung genannt."
    ],
    "mitbehandlungHinweis": "Medizinische Behandlung von Begleiterkrankungen; Diagnostik zum Ausschluss weiterer Erkrankungen."
  },
  "ck-brueckle": {
    "kontraindikationen": [
      "Aufnahme ab 18 Jahren.",
      "Ohne qualifizierten stationären Entzug oder aus der Haft: mindestens siebentägige Abstinenzphase; Aufnahme bei positivem Urin- oder Alkoholtest nicht vorgesehen."
    ],
    "mitbehandlungHinweis": "Allgemeinarzt und Facharzt für Psychiatrie besprechen bei Aufnahme körperliche und psychiatrische Belastungen. Ergänzende medikamentöse Behandlung in Absprache mit der Bezugstherapie. Nicht verordnete mitgebrachte Medikamente werden eingezogen.",
    "alltag": [
      "36 Plätze in altem Hofgut; 22 Einzel- und 14 Zweibettzimmer.",
      "Neue Zimmer mit Terrasse oder Balkon zum Innenhof; Lehrküche.",
      "Schreinerei, Metall- und Kreativwerkstatt, Sauna, Fitnessraum, Sporthalle, Nutzgarten."
    ],
    "sozialdienstLeistungen": [
      "Berufs- und Sozialberatung.",
      "Arbeitstherapie."
    ],
    "therapieHinweise": [
      "Schwerpunkte Opiate/Polytoxikomanie, THC/Partydrogen, schädliches Glücksspiel/PC- und Internetgebrauch.",
      "Abhängigkeit und PTBS sowie ADHS im Erwachsenenalter.",
      "Module Kombi/Kurzzeit, Mittelzeit, Langzeit; Paartherapie in Kooperation."
    ],
    "factsExtra": [
      "BtMG-Anerkennung, Träger Arbeitskreis Rauschmittel Lörrach e.V.",
      "Nur Männer in der Intensivphase Buggingen."
    ]
  },
  "ck-buching": {
    "kontraindikationen": [
      "Akute Psychosen; schwere depressive Störung mit oder ohne psychotische Symptome.",
      "Aktuelle Medikamenten-, Alkohol- und/oder Drogenabhängigkeit, bei der Entgiftung bzw. Entwöhnung im Vordergrund steht.",
      "Akute Selbst- oder Fremdgefährdung; ausgeprägte Persönlichkeitsstörungen mit selbst- oder fremdgefährdendem Verhalten oder starker Einschränkung der Gruppentherapie.",
      "Pflegebedürftigkeit; schwere Gehbehinderung (keine Aufzüge).",
      "Körpergewicht über 120 kg; Anorexie (BMI unter 17) bzw. schwere Essstörungen.",
      "Mangelnde deutsche Sprachkenntnisse (keine Dolmetscherinnen bzw. Dolmetscher im Haus)."
    ],
    "alltag": [
      "Zimmersafe für Bargeld; Handtücher stellt die Klinik.",
      "Waschmaschinen und Trockner als Münzgeräte.",
      "Hallenbad, Sauna und Rotlichtkabine in den Öffnungszeiten; Bibliothek, Klinikpark und Kliniksee.",
      "Fernseher kann mitgebracht werden, aus therapeutischen Gründen nicht empfohlen; Geschirr nicht aus dem Speisesaal aufs Zimmer.",
      "Klinikgelände nicht oder nur teilweise barrierefrei, keine Aufzüge.",
      "Abholung vom Bahnhof Füssen nach Voranmeldung mit klinikeigenem Bus."
    ],
    "sozialdienstLeistungen": [
      "Sozialdienst ist Bestandteil des multimodalen Behandlungsprogramms."
    ],
    "therapieHinweise": [
      "Bio-psycho-soziales Konzept mit verhaltenstherapeutischen, tiefenpsychologischen und systemischen Ansätzen.",
      "Ergotherapie mit arbeitsbezogenen Einschätzungen (u. a. Reha-Com, MELBA).",
      "Störungsspezifische Gruppentherapie und psychoedukative Vorträge zu Stress, Schlaf und Angst.",
      "Kunst- und Musiktherapie, körperzentrierte Therapie, Yoga und Qi Gong."
    ],
    "factsExtra": [
      "116 stationäre Behandlungsplätze und 5 ambulante Plätze laut Klinikbroschüre.",
      "Kur + Reha GmbH; Versorgungsvertrag nach § 111 SGB V.",
      "Lage in Halblech auf rund 800 m Höhe; klinikeigener Bus ab Füssen."
    ],
    "wahlleistungenHinweis": "Waschmaschinen und Trockner als Münzgeräte. E-Bike-, Trekking- und Mountainbike-Verleih gegen Gebühr, Reservierung vor Anreise möglich."
  },
  "ck-burgenlandklinik": {
    "kontraindikationen": [
      "Schwere körperliche Behinderung mit ständiger Hilfsbedürftigkeit; Klinik nur eingeschränkt für Rollstuhlfahrer geeignet.",
      "Demenzen oder andere schwere Psychosyndrome, akute Psychosen und aktuelle suizidale Gefährdung schließen die Aufnahme aus.",
      "Aufnahme ab dem vollendeten 17. Lebensjahr, sofern die Angebote ohne wesentliche fremde Hilfe wahrgenommen werden können."
    ],
    "wahlleistungenHinweis": "Waschgang inkl. Trockner und Bügeleisen gegen pauschale Gebühr von 4 €. Kein Fernseher auf Patientenzimmern; Wasserkocher, Heizgeräte und Bügeleisen auf Zimmern nicht gestattet.",
    "alltag": [
      "Sucht-Rehabilitandinnen und -Rehabilitanden sind im Haus verteilt in Einzelzimmern untergebracht.",
      "Am Aufnahmetag Begrüßung durch eine erfahrene Mitperson (Pate) nach dem Abendessen.",
      "Alkoholentwöhnung: in den ersten zwei Wochen Klinikgelände nicht verlassen; ab der dritten Woche Ausgang in Begleitung von zwei Mitpatientinnen/Mitpatienten."
    ],
    "sozialdienstLeistungen": [
      "Soziotherapie und Sozialarbeit sind Teil des Therapieprogramms."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutische Bezugsgruppe viermal wöchentlich à 90 Minuten, halboffen.",
      "Ergänzend Sport- und Bewegungstherapie inkl. therapeutischem Jonglieren, Physiotherapie, Entspannung, Tanztherapie, Ergotherapie.",
      "Primärindikation der Suchtbehandlung: Alkoholabhängigkeit."
    ],
    "factsExtra": [
      "93 Betten Psychosomatik, 24 Betten Suchtbehandlung laut Klinikseite.",
      "Stoffgebundene Abhängigkeiten anderer Art verweist die Klinik an die Schwesterklinik Alte Ölmühle.",
      "ADHS-Sprechstunde und Nachsorgeangebote am Standort; Kinder als Begleitpersonen ausgewiesen."
    ],
    "mitbehandlungHinweis": "Gemeinsame Unterbringung und Behandlung von Sucht- und psychosomatischen Patientinnen und Patienten; Teilnahme an themenbezogenen Gruppen nach Bedarf."
  },
  "ck-burgklinik": {
    "alltag": [
      "Alle Patientinnen und Patienten in Einzelzimmern mit Balkon und eigenem Duschbad/WC.",
      "Therapiezeiten in der Regel 7:30–18:00 Uhr; Besuch am Wochenende und außerhalb der Therapie.",
      "Übernachtungsgäste Fr nach Therapie bis Mo nach Frühstück im Zustellbett, 49 €/Nacht inkl. Frühstück; keine dauerhafte Begleitperson.",
      "Vegetarisches Mittagsmenü; vegane Linie nicht im Angebot. Medikamente für mindestens die ersten drei Tage mitbringen.",
      "Alle Patientinnen und Patienten in Einzelzimmern mit Balkon und eigenem Duschbad mit WC; Doppelzimmer stehen nicht zur Verfügung.",
      "Partnerin oder Partner auf Wunsch im Einzelzimmer mit unterbringbar; Klinik barrierefrei, nur einzelne Zimmer rollstuhlgerecht."
    ],
    "therapieHinweise": [
      "Psychotherapeutische, psychiatrische und psychosomatische Rehabilitation.",
      "Ausgewiesen u. a. MBOR, Post-Stroke-Depression, psychosomatische Post-Corona-Reha, Gruppe für junge Erwachsene.",
      "Reha mit Kind (Betreuung ab 2 Jahren, kein therapeutisches Kinderangebot) und Reha mit Hund nach Voranmeldung.",
      "Psychotherapeutische, psychiatrische und psychosomatische Rehabilitation; Therapieplan ohne Rücksicht auf Besuchertermine.",
      "MBOR im Spektrum; Modellprojekt psychosomatische Hybrid-Reha mit DRV Bund und Universität zu Lübeck.",
      "Reha mit Hund: Hund im Einzelzimmer, kein Zwinger, keine Klinikbetreuung; Hundehaltervertrag, Impf- und Haftpflichtnachweis."
    ],
    "factsExtra": [
      "228 Betten in Stadtlengsfeld (Dermbach), Rhönlage in einer historischen Burg.",
      "Hybrid-Reha als Modellprojekt ausgewiesen.",
      "RV-Fit stationär oder ganztägig ambulant am Standort.",
      "Hunde in separatem Trakt mit Parkzugang; Speisesäle und Therapieräume für Hunde nicht zugänglich.",
      "GiGS-Programm für Beschäftigte in Gesundheits- und Sozialberufen; Stärkungsangebot für Bundeswehr und Stressreduktion für Beamtinnen und Beamte.",
      "RV Fit stationär oder ganztägig ambulant am Standort, ohne Urlaubnahme, Kosten über DRV."
    ],
    "wahlleistungenHinweis": "Übernachtungsgast 49 €/Nacht inkl. Frühstück. Reha mit Hund laut Infoblatt 13 €/Tag (ein Hund), 22 €/Tag (zwei Hunde), 30 €/Tag (drei Hunde). Läufige Hündinnen werden nicht aufgenommen.",
    "mitbehandlungHinweis": "Klinik barrierefrei; nur einige Zimmer rollstuhlgerecht – vor Anreise mit der Patientenaufnahme abstimmen.",
    "sozialdienstLeistungen": [
      "Aufnahmegespräch durch den Sozialdienst im Diagnostikprogramm.",
      "Berufsbezogene Beratung; zusätzliche Sozialdienstberatung bei Bedarf.",
      "Klinische Sozialarbeit ist im Qualitätprofil als Leistungsbereich ausgewiesen."
    ]
  },
  "ck-bussmannshof": {
    "alltag": [
      "Unterbringung ausschließlich in Einzelzimmern; Paarzimmer zusätzlich möglich.",
      "Vier Patientenwohnhäuser um ein Rondell; Parkgelände mit Beachvolleyballfeld und Pferdestall.",
      "Wellnessbad, Kaminzimmer, Kraftsportraum und Proberaum für Musiker.",
      "Behandlungsdauer 22 Wochen."
    ],
    "sozialdienstLeistungen": [
      "Beratung zu Bürgergeld, Kranken- und Pflegeversicherung, Schulden und Wohngeld.",
      "Nachstationäre Unterstützung (u. a. Schuldnerberatung, gesetzliche Betreuung) und strafrechtliche Belange."
    ],
    "therapieHinweise": [
      "Bezugstherapie mit wöchentlicher Einzelpsychotherapie; Hausgruppen als Problemlösegruppen.",
      "Spezialkonzepte für komorbides AD(H)S und für Essstörungen bei Sucht.",
      "Indikative Gruppen u. a. Emotionsregulation, Depression, Ernährung, Nichtrauchertraining; Männergruppe Social Defense, Frauengruppe.",
      "BORA und Arbeitstherapie (Pferdestall, Handwerk, Garten, Empfang, Hauswirtschaft, Wäscherei, Näherei, Fahrdienst).",
      "Reitunterricht auf dem Klinikgelände; tierbegleitete Therapie mit dem eigenen Hund möglich (Größe/Gewicht begrenzt)."
    ],
    "factsExtra": [
      "Schwerpunkt Abhängigkeit von illegalen Drogen; 40 Behandlungsplätze in Bochum-Wattenscheid/Eppendorf.",
      "Paartherapie, wenn beide Partner drogenabhängig sind.",
      "Nahtlose Aufnahme nach JVA im Rahmen von § 35 BtMG möglich."
    ],
    "mitbehandlungHinweis": "Psychiatrisch-medizinische Diagnostik und ggf. Medikation im Haus; körperliche Begleiterkrankungen (u. a. Diabetes, Lunge) in Kooperation mit niedergelassenen Fachärzten.",
    "kontraindikationen": [
      "Körpergewicht über 130 kg: Versorgung wegen baulicher Gegebenheiten und Möblierung nicht adäquat möglich.",
      "Beim Spezialangebot Essstörung und Sucht: Mindest-BMI 16,5."
    ]
  },
  "ck-bwlv-tagesreha-freiburg": {
    "kontraindikationen": [
      "Schwerwiegende Folgen oder Begleiterkrankungen, die eine tagesklinische Form ungeeignet machen.",
      "Fehlende Abstinenzfähigkeit in der therapiefreien Zeit.",
      "Instabile Wohnsituation.",
      "Tägliche Fahrzeit in der Regel über 45 Minuten.",
      "Fehlende Abstinenzfähigkeit oder instabile Wohnsituation."
    ],
    "alltag": [
      "Therapie täglich ca. 8:45–16:00 Uhr; Abende und Sonntage zu Hause.",
      "Teilnahme laut Flyer Montag bis Samstag.",
      "Samstags wechselnde Aktivitäten wie Nordic Walking, Kegeln und Badminton.",
      "Sport auch in öffentlichen Einrichtungen der Umgebung zur Fortsetzung nach der Behandlung.",
      "Therapie täglich ca. 8:45–16:00 Uhr, Abende und Sonntage zu Hause.",
      "Fahrzeit in der Regel bis 45 Minuten."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung zu Rente, Versicherung, Schulden, Wohnen und Führerschein.",
      "Berufliche Beratung bei Arbeitsplatzerhalt oder Neuorientierung; Belastungserprobung am Arbeitsplatz im letzten Drittel möglich.",
      "Antragstellung über Suchtberatungsstelle, Arztpraxis oder Fachstelle Sucht Freiburg.",
      "Berufliche Beratung bei Arbeitsplatzerhalt oder Neuorientierung."
    ],
    "therapieHinweise": [
      "Einzel- und Gruppentherapie zur Suchtentwicklung und Rückfallprophylaxe; medizinische Sprechstunden und Informationsgruppen.",
      "Pflegerische Anwendungen zu Beginn (u. a. Einreibungen, Leberwickel, Fußbäder) mit Anleitung für zu Hause.",
      "Sporttherapie, PMR, Ergotherapie; freiwillige Suchtakupunktur nach NADA-Protokoll.",
      "Regeldauer 12–20 Wochen, Kombibehandlung 8 Wochen; Kriseninterventionsbehandlung 4 Wochen.",
      "Regelmäßige Einzelgespräche und Gruppentherapie zur Suchtentwicklung und Rückfallprophylaxe.",
      "Sporttherapie, Entspannung (PMR), Ergotherapie."
    ],
    "factsExtra": [
      "Schwerpunkte Alkohol, Medikamente, Nikotin, Cannabis und Partydrogen.",
      "Kriseninterventionsbehandlung für DRV-Baden-Württemberg-Versicherte nach abgeschlossener Suchtreha in krisenhafter Phase.",
      "Kombibehandlung 8 Wochen möglich; daneben Modellprojekt Kriseninterventionsbehandlung 4 Wochen für DRV-Baden-Württemberg-Versicherte nach abgeschlossener Suchtreha."
    ]
  },
  "ck-bwlv-tagesreha-karlsruhe": {
    "kontraindikationen": [
      "Schwerwiegende Begleiterkrankungen, die eine tagesklinische Form ungeeignet machen.",
      "Fehlende Abstinenzfähigkeit in der therapiefreien Zeit oder instabile Wohnsituation."
    ],
    "alltag": [
      "Teilnahme Montag bis Samstag; Abende, Nächte und Sonntag zu Hause.",
      "Fahrzeit in der Regel bis 45 Minuten.",
      "Wöchentlicher Informationstermin dienstags 15:00 Uhr ohne Voranmeldung."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei beruflicher Reintegration.",
      "Übergang in Nachsorge, Selbsthilfe und regionale Freizeitangebote."
    ],
    "therapieHinweise": [
      "Einzel- und Gruppenpsychotherapie (verhaltenstherapeutisch), Selbstsicherheits- und Kompetenztraining.",
      "Angehörigenarbeit, Sport/Fitness/Entspannung, aktive Freizeitgestaltung.",
      "Kombi-Therapie: häufig 6 Wochen stationär plus 8 Wochen TagesReha."
    ],
    "factsExtra": [
      "Für Alkohol-, Medikamentenabhängigkeit und nicht-stoffgebundene Süchte (z. B. Glücksspiel).",
      "Zusätzlich ambulante psychosomatische Nachsorge PSYRENA am Standort Karlsruhe."
    ],
    "wahlleistungenHinweis": "Selbstzahler möglich; Entwöhnungsbehandlung ist beihilfefähig. Kostenübernahme vor Aufnahme klären.",
    "mitbehandlungHinweis": "Mitbehandlung komorbider Störungsbilder im tagesklinischen Rahmen."
  },
  "ck-bwlv-tagesreha-pforzheim": {
    "alltag": [
      "Angehörigengruppe vierzehntägig donnerstags; Paargespräche auf Wunsch kostenfrei.",
      "Ernährungsberatung einmal monatlich durch die Diätassistenz, Praxis in der Lehrküche; bei Bedarf Einzeltermine (z. B. Diabetes).",
      "Freizeit im Wochenprogramm u. a. Ausflüge, Theater- und Kinobesuche, Ausstellungen, Minigolf, Tischtennis und Boule.",
      "12 Behandlungsplätze, Therapie Montag bis Samstag.",
      "Offene Sprechstunde Mo 13–15 Uhr und Do 16:30–18:00 Uhr."
    ],
    "sozialdienstLeistungen": [
      "Bonpas-Programm zur Berufsorientierung und Rückkehr an den Arbeitsplatz.",
      "Praktikum zur Belastungserprobung bei längerer Arbeitslosigkeit oder unklarem Leistungsvermögen.",
      "Ambulante Suchtnachsorge im Anschluss an die TagesReha (Rückfallprophylaxe und Stabilisierung).",
      "Klärung von Berufs-, Wohnungs-, Schulden-, Renten- und Versicherungsfragen.",
      "Sozialarbeiterin der Tagesklinik für kurzfristige Beratungstermine.",
      "Kontakt zu betrieblichem Sozialdienst, Betriebsarzt und Reha-Fachberatung der DRV."
    ],
    "therapieHinweise": [
      "Doppeldiagnosengruppe für Suchterkrankung und weitere psychische Erkrankungen.",
      "Arbeitstherapie mit Erlernen neuer praktischer Fähigkeiten; soziales Training zu Selbstsicherheit, Selbstakzeptanz und Selbstkontrolle.",
      "Einzel- und Gruppenpsychotherapie mit verhaltenstherapeutischem Schwerpunkt; wöchentliche Einzelgespräche bei Bezugstherapeutin.",
      "Sportprogramm und soziales Training.",
      "Wöchentliche ärztliche Einzelvisite."
    ],
    "factsExtra": [
      "Zielgruppe sozial integrierte Abhängigkeitserkrankte mit gefährdeter oder eingeschränkter Erwerbsfähigkeit.",
      "Regeldauer 12 Wochen (Alkohol/Medikamente) bzw. 16–20 Wochen (illegale Drogen)."
    ],
    "mitbehandlungHinweis": "Ärztliche Aufnahme- und Abschlussuntersuchung; Überwachung der Medikation und der körperlichen Belastbarkeit."
  },
  "ck-bwlv-tagesreha-reutlingen": {
    "alltag": [
      "Teilnahme Montag bis Samstag; Abende, Nächte und Sonntag zu Hause.",
      "Standort Innenstadt Reutlingen unmittelbar am Hauptbahnhof, Kaiserstraße 4."
    ],
    "sozialdienstLeistungen": [
      "Sozialtherapeutische Beratung und Unterstützung bei der Wiedereingliederung ins Erwerbsleben.",
      "Angehörige werden zu gemeinsamen Gesprächen eingeladen."
    ],
    "therapieHinweise": [
      "Einzel- und Gruppenpsychotherapie; Rückfallvorbeugung.",
      "Ergotherapie, Körperwahrnehmung, Entspannungstraining und Sport.",
      "Regeldauer in der Regel 12 Wochen; Schwerpunkte individuell."
    ],
    "factsExtra": [
      "Für Alkoholabhängigkeit sowie Abhängigkeit von Cannabis und/oder Partydrogen.",
      "Leistungsträger DRV Baden-Württemberg und Krankenkassen, soweit keine DRV-Voraussetzungen bestehen."
    ],
    "mitbehandlungHinweis": "Behandlung psychiatrischer Co-Morbidität und psychotherapeutische Behandlung von Grunderkrankungen im tagesklinischen Rahmen."
  },
  "ck-bwlv-tuebingen": {
    "kontraindikationen": [
      "Psychose und Sucht: akute psychotische Störung mit Krankenhausbedarf bzw. fehlender Rehafähigkeit; antipsychotische Medikation soll vor Aufnahme mindestens sechs Wochen stabil sein.",
      "Adaption: eigenständige Haushaltsführung und selbstständige Medikamenteneinnahme sollen möglich sein."
    ],
    "alltag": [
      "Vier Wohngruppen am Bläsiberg; Intensivphase mit Einzel- und Zweibettzimmern, jeweils eigene Nasszelle; ein behindertengerechtes Zimmer im Neubau.",
      "Sport- und Freizeitangebote u. a. Yoga, Bogenschießen, Stockkampf und Klettern; Lehrküche am Haus und in der Adaption.",
      "Adaptionshaus Westbahnhofstr. 2, 72070 Tübingen, 15 Plätze."
    ],
    "therapieHinweise": [
      "Psychose-und-Sucht-Konzept mit zusätzlicher Gruppe in der Kernphase; bis zu zehn Plätze laut Jahresbericht.",
      "SURE: substitutionsgestützte Reha nach Vorgespräch; BtMG-Aufnahme nach §§ 35, 36 möglich.",
      "Klassische Langzeittherapie über Eingangsphase, Intensivtherapie und Adaption (rund 10 Monate).",
      "Kombinationstherapie: 12 Wochen stationär plus teilstationär/ambulant.",
      "SURE substitutionsgestützte Reha; Psychose und Sucht; Aufnahme Alkoholabhängiger im Verbund mit Uniklinik oder Tagesreha Tübingen."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei Lebensunterhalt, Krankenversicherung, Recht, Schulden, Behörden.",
      "Nachsorgewohngruppen in Tübingen (11 Plätze) und Reutlingen (8); ambulante Nachsorge."
    ],
    "factsExtra": [
      "Schreinerei, PC-Kurse, Bewerbertraining.",
      "Lehrküche und Ernährungsberatung.",
      "BtMG-anerkannt."
    ],
    "mitbehandlungHinweis": "Mitbehandlung psychischer Begleiterkrankungen; Kooperation mit der Universitätspsychiatrie."
  },
  "ck-bwlv-wiesengrund": {
    "alltag": [
      "Unterbringung in Zweibettzimmern (25–40 m²) mit Dusche und WC; zwei Einzelzimmer nach Bedarf, zwei Zimmer hindernisgerecht.",
      "Ab Aufnahmetag Zuordnung zur Eingangsgruppe; in den ersten zwei Wochen Patenschaft durch eine erfahrene Mitpatientin oder einen erfahrenen Mitpatienten.",
      "Wöchentliche Kontrolle von Ordnung und Sauberkeit in Zimmern, Küche und Gemeinschaftsräumen; Hausschuhe in den Wohnräumen.",
      "Gemeinschaftsspeisesaal; Foyer bzw. Freizeitsaal, Fitnessraum, Turnhalle, Wintergarten und Sonnenterrasse."
    ],
    "sozialdienstLeistungen": [
      "In der ersten Woche Erfassung von Familien-, Wohn-, finanzieller und juristischer Situation durch den Sozialdienst.",
      "Ambulant betreutes Wohnen (12 Plätze) im Anschlussangebot des Hauses.",
      "Adaption und ambulante Nachsorge im bwlv-Verbund.",
      "Berufsorientierte Nachsorge."
    ],
    "therapieHinweise": [
      "Substitutionsgestützte Rehabilitation (SURE) in Absprache mit der DRV Baden-Württemberg; klinikinterne Substitutionspraxis mit individuellem Abdosierungsschema.",
      "Substituierte Rehabilitandinnen und Rehabilitanden werden in dasselbe Therapiesetting integriert.",
      "Aufnahme auch bei gerichtlicher Therapieauflage nach verpflichtendem Vorgespräch (online, telefonisch oder persönlich) gemeinsam mit der Suchtberatungsstelle.",
      "Paare mit den genannten Erkrankungen; pathologisches Spielen und hyperkinetische Störungen, wenn sie in Kombination mit einer Opioidabhängigkeit auftreten.",
      "Stationäre Entwöhnung bei Drogenabhängigkeit inkl. Adaption.",
      "BtMG-anerkannt."
    ],
    "factsExtra": [
      "54 Behandlungsplätze für Hauptphase und Adaption (43 Intensivphase, 11 Adaption) plus 12 Nachsorgeplätze.",
      "Schreinerei und Turnhalle am Standort; Zielgruppe vor allem Abhängigkeit von illegalen Drogen sowie Mehrfachabhängigkeit.",
      "Begleitkinder im Aufnahmeprofil der Klinikseite genannt.",
      "Standort Freudenstadt-Kniebis."
    ]
  },
  "ck-carolabad": {
    "kontraindikationen": [
      "Akute Suizidalität.",
      "Suchterkrankungen.",
      "Akute Psychosen.",
      "Neurokognitive Störungen inklusive Demenz."
    ],
    "mitbehandlungHinweis": "Psychosen und bipolare Störungen im Indikationsspektrum, sofern nicht akut. Psychische Erkrankungen in Schwangerschaft, Postpartalzeit oder bei Kinderwunsch; Begleitkinder max. 4 Jahre (Carola Plus AOK Plus: 1,5 Jahre), nächtliche Versorgung durch die Mutter.",
    "alltag": [
      "Mitaufnahme des Hundes im Patientenzimmer laut Klinik.",
      "Komfort-light-Pakete gegen Aufpreis."
    ],
    "sozialdienstLeistungen": [
      "Psy-RENA in Chemnitz und Dresden nach stationärer oder ganztägig ambulanter DRV-Reha.",
      "DE-RENA als digitale Nachsorge bei depressiven Störungen, DRV-Regelangebot, für Versicherte kostenfrei."
    ],
    "therapieHinweise": [
      "Ganzheitliches Konzept aus Psychotherapie, körperbezogenen und weiteren Verfahren.",
      "Rehabilitation nach Corona (Long-/Post-COVID); therapeutisches Bogenschießen als neues Angebot genannt."
    ],
    "factsExtra": [
      "Zentrum für Verhaltensmedizin, Psychosomatik, Psychotherapie und psychiatrische Rehabilitation; auch Schwangerschaft/Stillzeit im Auftrag.",
      "Wunsch- und Wahlrecht ab Antragstellung erläutert."
    ],
    "wahlleistungenHinweis": "Komfort-light-Pakete zusätzlich zur medizinischen Leistung."
  },
  "ck-celenus-carolabad": {
    "alltag": [
      "Mitaufnahme eines Hundes im Patientenzimmer möglich.",
      "Keine Fernseher in den Zimmern (medienfreier Rückzugsraum); WLAN in Eingang und Speisesaal."
    ],
    "sozialdienstLeistungen": [
      "Sozialtherapie/Sozialberatung zu beruflichen Themen (u. a. stufenweise Wiedereingliederung, LTA, Bewerbungstraining), finanziellen Fragen und weiterführenden Hilfen.",
      "MBOR-Elemente u. a. Belastungserprobung, Gruppe Arbeitsplatzkonflikte/Mobbing."
    ],
    "wahlleistungenHinweis": "Komfort-light-Pakete gegen Aufpreis buchbar.",
    "kontraindikationen": [
      "Akute Suizidalität.",
      "Suchterkrankungen.",
      "Akute Psychosen.",
      "Neurokognitive Störungen inklusive Demenz."
    ],
    "therapieHinweise": [
      "Einzel- und Gruppentherapie, Kreativ- und Ergotherapie, Sport-, Körper- und Physiotherapie.",
      "Gruppen u. a. zu Ängsten, Depression, Schmerzen, Schlafstörungen, Selbstsicherheit, Adipositas und Mobbing.",
      "Schwerpunkt psychische Erkrankungen in Schwangerschaft, Postpartalzeit oder bei Kinderwunsch.",
      "Psy-RENA und digitale Nachsorge DE-RENA."
    ],
    "factsExtra": [
      "130 Einzelzimmer; 8 Familienzimmer; rollstuhlgerechte Zimmer vorhanden.",
      "Anreise 9–11 Uhr; kostenlose Abholung vom Haltepunkt Grüna nach Voranmeldung.",
      "Aufnahmeuntersuchung und Therapieplan am Folgetag.",
      "Programm Carola Plus mit der AOK Plus für Begleitkinder bis 1,5 Jahre."
    ],
    "mitbehandlungHinweis": "Mitaufnahme von Begleitkindern bis 4 Jahre bei therapeutischer Indikation (8 Familienzimmer); Mütter versorgen das Kind auch nachts selbst. In 27 Zimmern Mitaufnahme eines Hundes nach Voranmeldung."
  },
  "ck-celenus-dekimed": {
    "alltag": [
      "Mitaufnahme von Haustieren in der DEKIMED laut emeis-Klinikverbund möglich.",
      "Wohnliche Einzelzimmer mit Sanitärzelle, Wertfach, Notruf, TV und Telefon; überwiegend Balkon oder Terrasse.",
      "Ein Teil der Zimmer barrierearm oder rollstuhlgerecht mit bodengleicher Dusche.",
      "Gymnastikhalle, Schwimmbad mit Kneipp-Bereich, Wassertretbecken, Lehrküchen.",
      "Begleitperson im Zweibettzimmer oder Zustellbett möglich; Verfügbarkeit vorab bei der Belegungsplanung klären.",
      "Begleittiere nur nach Anmeldung: maximal zwei kleine bzw. mittelgroße Hunde oder ein großer Hund bzw. bis zu zwei Katzen; Listenhunde und Assistenzhunde nicht vorgesehen."
    ],
    "wahlleistungenHinweis": "Komfortzimmer und Komfort-light-Pakete gegen Aufpreis dokumentiert.",
    "kontraindikationen": [
      "Geriatrische Reha: Barthel-Index nicht unter 75; selbstständige Teilnahme am strukturierten Tagesablauf.",
      "Ausschluss u. a. bei Stuhlinkontinenz, schwerer Demenz, Weglauftendenz, hochgradigem Seh- oder Hörverlust und akuter Wahnsymptomatik."
    ],
    "factsExtra": [
      "Klinik im Albertpark am Kurzentrum Bad Elster; allgemein zugängliche Bereiche behindertengerecht mit Aufzügen.",
      "Anerkennung durch gesetzliche Rentenversicherung, GKV und Beihilfe; auch Selbstzahler und Pauschalkurgäste.",
      "Mitaufnahme von Kindern (3–10 Jahre) mit einem Elternteil und Bindungstraining für Alleinerziehende öffentlich genannt."
    ]
  },
  "ck-celenus-freiburg": {
    "alltag": [
      "Keine Mitaufnahme von Tieren aus hygienischen Gründen.",
      "Einmalige Heimfahrt am Wochenende nach Absprache mit der Therapie.",
      "Waschmaschinen und Trockner gegen Gebühr; Safe im Zimmer.",
      "Medikamente für die ersten Tage und Hilfsmittel (z. B. Hörgerät) mitbringen.",
      "Ausschließlich Einzelzimmer, teilweise mit Balkon; Dusche, WC, Telefon und Wertschließfach.",
      "Kostenpflichtiges WLAN in Eingangsbereich, Cafeteria und Aufenthaltsräumen."
    ],
    "factsExtra": [
      "Alltagstransfer in Beruf und Privatleben wird bereits während des Aufenthalts thematisiert.",
      "119 Einzelzimmer laut Klinikseite; Klinik barrierefrei und für Rollstuhlnutzung geeignet.",
      "Vorsorge- und Rehabilitationseinrichtung gemäß § 107 Abs. 2 SGB V mit Versorgungsvertrag nach § 111 SGB V."
    ],
    "wahlleistungenHinweis": "Wahlleistung Chefarztbehandlung unter bestimmten Umständen für Privatversicherte oder Beihilfe; DRV davon ausgenommen.",
    "kontraindikationen": [
      "Akute oder latente Psychosen.",
      "Akute Selbst- oder Fremdgefährdung.",
      "Akute entwöhnungsbedürftige Abhängigkeitserkrankungen.",
      "Schwere Persönlichkeitsstörungen; starke kognitive Funktionsdefizite.",
      "Ansteckende Krankheiten; intensive pflegerische Betreuung.",
      "BMI unter 15 bzw. Körpergewicht über 150 kg."
    ],
    "sozialdienstLeistungen": [
      "Sozial-, Berufs- und Reha-Beratung in Vorträgen und Einzelgesprächen, insbesondere bei beruflicher Problemlage.",
      "Organisation der Nachsorge und der beruflichen Wiedereingliederung; sozialmedizinische Leistungsbeurteilung am Ende der Reha.",
      "MBOR: Aufnahme- und Beratungsgespräche durch den Sozialdienst, Belastungserprobung in der Ergotherapie."
    ],
    "therapieHinweise": [
      "Schulenübergreifend: psychodynamisches Verständnis mit verhaltenstherapeutischen, gesprächstherapeutischen und systemischen Ansätzen.",
      "Störungsorientierte Gruppen unter anderem für Depression, Schmerz, Essstörungen, Angst- und Stressbewältigung sowie Traumafolgestörungen.",
      "Kreativtherapien (Musik, kreative Leibtherapie, Körperpsychotherapie); therapeutisches Boxen; Biofeedback.",
      "Alterspsychosomatik für Menschen ab etwa 60 Jahren; MBOR diagnoseübergreifend."
    ],
    "mitbehandlungHinweis": "Ärztliche Mitbehandlung chronischer Erkrankungen wie Bluthochdruck, Diabetes sowie Fett- und Schilddrüsenstoffwechselstörungen."
  },
  "ck-celenus-kinzigtal": {
    "alltag": [
      "Bitte korrekte Kleidung für die Mahlzeiten im Speisesaal.",
      "WLAN gegen Gebühr im öffentlichen Bereich.",
      "Fernseher nicht in jedem Zimmer; ggf. mitbringen oder vor Ort ausleihen.",
      "Wäschewaschen gegen Entgelt im Haus.",
      "Ausschließlich Einzelzimmer (18 qm) mit Dusche/WC, Telefon und Wertschließfach; Kühlschrank nicht auf dem Zimmer.",
      "Klinik öffnet 06:00 Uhr und schließt 23:00 Uhr; Nachtruhe 22:00–06:00 Uhr im Zimmer."
    ],
    "wahlleistungenHinweis": "Komfort-light-Pakete gegen Aufpreis.",
    "sozialdienstLeistungen": [
      "MBOR mit Fokus auf berufsbezogene Herausforderungen.",
      "Gruppe für Berufsprobleme und berufsbezogene Ergotherapie.",
      "IRENA-Nachsorge: bis 25 Gruppeneinheiten und zwei Einzelgespräche innerhalb von zwölf Monaten nach der Reha."
    ],
    "therapieHinweise": [
      "Mechanismenbezogene psychosomatische Schmerztherapie nach diagnostischen Subgruppen.",
      "Biofeedback-Training bei chronischen Schmerzproblemen; Spiegeltherapie z. B. bei CRPS.",
      "Tinnitus-Bewältigungstherapie, Angstbewältigungs- und Stressbewältigungstraining.",
      "Musik- und Kunsttherapie, Sport- und Bewegungstherapie (u. a. Aquafit, Terraintraining, MTT)."
    ],
    "factsExtra": [
      "144 Einzelzimmer; Klinik und öffentliche Räume nicht barrierefrei ausgewiesen.",
      "Keine Mitaufnahme von Begleitpersonen oder Kindern; Verweis auf Schwesterkliniken Bromerhof und Schömberg.",
      "Schwerpunkte stressbedingte psychosomatische Erkrankungen und Schmerzstörungen; Chefarzt Roman Frank Jitten.",
      "Sauna zeitweise wegen Sanierung geschlossen (Hinweis auf der Klinikseite)."
    ],
    "mitbehandlungHinweis": "Aufnahmeuntersuchung durch somatischen Arzt und Bezugstherapie. Diagnostik u. a. Labor, Sonographie, EKG, Belastungs-EKG, Langzeit-RR und EEG."
  },
  "ck-celenus-ortenau-add": {
    "alltag": [
      "Gemeinsame Pack- und Aufnahmeliste mit Klinik Kinzigtal: Anamnesefragebogen, Behandlungsvertrag, Krankenkassenkarte.",
      "WLAN gegen Gebühr im öffentlichen Bereich; Wäschewaschen gegen Entgelt.",
      "88 Einzelzimmer ca. 18 m² mit Duschbad, Schreibtisch mit abschließbaren Fächern und Schwesternrufanlage; teils mit Balkon.",
      "Kliniköffnung 06:00–23:00 Uhr; Nachtruhe 22:00–06:00 Uhr im Zimmer; Beurlaubungen grundsätzlich nicht vorgesehen.",
      "Handy, Smartphone, Tablet und PC während der Therapie und im Speisesaal ausschalten.",
      "Rauchen nicht in der Klinik und nicht auf Balkonen; Toleranzbereich am unteren Parkdeck Berghaus."
    ],
    "factsExtra": [
      "Träger Psychosomatische Fachklinik Gengenbach GmbH, Wolfsweg 12."
    ],
    "wahlleistungenHinweis": "Komfort-light-Pakete gegen Aufpreis.",
    "kontraindikationen": [
      "Akute Schizophrenie.",
      "Akute Manie.",
      "Primäre Suchterkrankung.",
      "Demenz.",
      "Essstörungen.",
      "Bettlägerigkeit und schwerer Pflegebedarf."
    ],
    "therapieHinweise": [
      "Integratives Konzept mit verhaltenstherapeutischen, tiefenpsychologischen und systemischen Ansätzen.",
      "Einzel- und Gruppenpsychotherapie, Traumatherapie, Tanz- und Trommeltherapie, Kreativ- und Ergotherapie, Entspannungsverfahren.",
      "Sport-, Bewegungs-, Physio- und Bädertherapie; computergestütztes Hirnleistungstraining und Berufstraining."
    ],
    "mitbehandlungHinweis": "Vorbestehende Medikation wird weiterbetreut und bei Bedarf nach Wirkung und Verträglichkeit angepasst. Eingangsuntersuchung mit körperlicher Untersuchung, Labor und oft EKG; Vorbefunde zur Aufnahmeuntersuchung mitbringen."
  },
  "ck-celenus-schoemberg": {
    "alltag": [
      "Reha mit Begleittier (Hund oder Katze) möglich.",
      "Reha mit Begleitkind: Kinderbetreuung während der Therapiezeiten; keine medizinische Behandlung der Kinder.",
      "Mitnahme von Begleitkindern nur nach Anmeldung und genehmigtem Antrag Haushaltshilfe."
    ],
    "wahlleistungenHinweis": "Komfort-light-Pakete gegen Aufpreis.",
    "kontraindikationen": [
      "Psychosen.",
      "Suchterkrankungen, auch unter Substitutionstherapie; Medikamentenabhängigkeit insbesondere von Schmerzmitteln, Benzodiazepinen oder Z-Drugs.",
      "Essstörungen; Traumafolgestörungen.",
      "Akute Suizidalität.",
      "Konsum legaler und illegaler Drogen einschließlich medizinisch verordnetem Cannabis als Aufnahmeausschluss.",
      "Körpergewicht über 130 kg aus baulichen Gründen; Rollstuhl oder erhebliche Bewegungseinschränkung nur bedingt."
    ],
    "sozialdienstLeistungen": [
      "Sozialtherapeutische Einzelberatung und berufsbezogene Gruppen.",
      "Rehabilitationsberatung, Sozialrecht, Konflikte am Arbeitsplatz und Bewerbung."
    ],
    "therapieHinweise": [
      "Tiefenpsychologisch fundierte oder kognitiv-verhaltenstherapeutische Einzel- und Gruppentherapie.",
      "Störungsspezifische Gruppen u. a. Schmerz, soziales Kompetenztraining, Raucherentwöhnung, Arbeitsplatzkonflikt.",
      "Berufliche Belastungserprobung in Zusammenarbeit mit dem Berufsförderungswerk Schömberg.",
      "Nachsorge Psy-RENA; Teilnahme am Curriculum Hannover der DRV."
    ],
    "factsExtra": [
      "Ausschließlich Einzelzimmer mit Dusche, WC, Telefon und Wertschließfach; kein Kühlschrank auf dem Zimmer.",
      "Begleitkinder 3–10 Jahre: Betreuung montags bis freitags 7:45–16:00 Uhr, an Wochenenden und Feiertagen keine Kinderbetreuung.",
      "Begleittiere (Hunde und Katzen) in eigenem Gebäude; tägliche Pauschale; Impf- und Haftpflichtnachweis; keine Kampf- und Listenhunde.",
      "Familienheimfahrten während der bewilligten Reha nicht vorgesehen, Beurlaubung nur aus zwingenden Gründen nach Rücksprache.",
      "Wasserkocher und elektronische Haushaltsgeräte aus Brandschutzgründen nicht auf dem Zimmer."
    ],
    "mitbehandlungHinweis": "Angebote zu chronischem Schmerz, Tinnitus und Bruxismus. Medikamente außerhalb des Fachgebiets für den gesamten Aufenthalt mitbringen; fachbezogene Medikamente mindestens für die ersten Tage."
  },
  "ck-celenus-schweizerwiese": {
    "therapieHinweise": [
      "Chefärztin Dr. Martina Huck-Breiter mit Spezieller Psychotraumatherapie (DeGPT).",
      "Bilinguale Behandlung auf Türkisch möglich.",
      "Tiefenpsychologisch fundierte Psychotherapie, ergänzt durch systemische und verhaltenstherapeutische Elemente.",
      "Berufsorientierte Rehabilitation u. a. mit kognitivem Training am PC, Training arbeitsbezogener Fähigkeiten und Arbeitskonfliktgruppe.",
      "Entspannung u. a. Autogenes Training, progressive Muskelrelaxation, Yoga, Waldbaden und Qigong."
    ],
    "wahlleistungenHinweis": "Komfort-light-Pakete gegen Aufpreis.",
    "alltag": [
      "115 Einzelzimmer (ca. 21 m²) und 15 behindertengerechte Zimmer (ca. 25 m²), jeweils mit Bad, Balkon und Notrufanlage.",
      "Anreise an der Rezeption zwischen 09:00 und 10:00 Uhr; Zimmer am Abreisetag bis 08:00 Uhr räumen.",
      "Mahlzeiten: Frühstück 07:00–08:00 Uhr (Wochenende 08:00–09:00), Mittag 12:00–13:00 Uhr, Abend 17:00–18:00 Uhr.",
      "Ausgang ganzjährig bis 23:30 Uhr. Alkohol im gesamten Klinikgebäude nicht gestattet.",
      "Rauchen im Gebäude, auf dem Zimmer und auf dem Balkon nicht gestattet; ausgewiesener Außenbereich Richtung Therme.",
      "Waschmaschinen und Trockner gegen Waschmarken; keine Haustiere; elektrische Wärmegeräte (z. B. Wasserkocher) nicht gestattet."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung sowie Planung und Organisation der Nachsorge einschließlich Psy-RENA-Nachsorgegruppe."
    ],
    "factsExtra": [
      "130 stationäre und 20 ganztägig ambulante Behandlungsplätze laut Klinikflyer.",
      "Neubau 2017–2020 in Holzmodulbauweise; gesamte Fachklinik barrierefrei bzw. rollstuhlgerecht ausgewiesen.",
      "Klinik fußläufig in ca. 3 Minuten vom Bahnhof Bad Herrenalb; Gästekarte für den öffentlichen Nahverkehr genannt."
    ]
  },
  "ck-change-hamburg": {
    "alltag": [
      "Ganztägig ambulant: Sie kehren nach dem Programm in Ihren Alltag zurück.",
      "Substanzmittelfreie (cleane) Freizeitgestaltung ist Teil des Programms."
    ],
    "therapieHinweise": [
      "Ganztägig ambulante medizinische Rehabilitation: Gruppen- und Einzeltherapie, Psychoedukation, TEK (Training emotionaler Kompetenzen).",
      "Ärztliche Beratung und Behandlung, wöchentliche medizinische Gruppe, Rückfallprophylaxe und Achtsamkeitstraining.",
      "Regelmäßige Akupunktur und Entspannung (u. a. progressive Muskelrelaxation nach Jacobson).",
      "Ergotherapie mit Arbeitsdiagnostik, Notfallpass, Konzentrations- und kognitivem Training.",
      "Sport (Einzel- und Teamsport, Sporttheorie), Kreativtherapie, Klang- und Rhythmustherapie.",
      "Berufliche (Um-)Orientierung, individuelle Ernährungsberatung und Planung von Nachsorge oder ambulanter Weiterbehandlung."
    ],
    "factsExtra": [
      "Therapiehilfeverbund, Standort Hasselbrookstraße 94a in Hamburg-Eilbek; nicht Oldenfelder Tannen.",
      "Zeiten: Montag bis Donnerstag 09.15–14.00 Uhr, Freitag 09.15–12.00 Uhr.",
      "Zertifiziert nach DIN EN ISO 9001:2015 und deQus; Belegung durch alle Leistungsträger.",
      "Antrag in der Regel über SEEHAUS Suchtberatung oder die Suchtberatungsstelle Böckmannstraße.",
      "Therapiehilfeverbund, Hamburg-Eilbek.",
      "Tagesklinik, nicht Oldenfelder Tannen."
    ]
  },
  "ck-chiemgau": {
    "alltag": [
      "Zimmer am Anreisetag ab 10:00 Uhr; Anreise zwischen 10:00 und 14:00 Uhr.",
      "Abholung am Bahnhof Übersee nach Voranmeldung.",
      "Zimmer mit Föhn, Radio sowie Safe oder Wertschließfach.",
      "Kostenfreies WLAN; TV kostenfrei, Telefon gegen Gebühr.",
      "Waschmaschinen und Trockner gegen Gebühr; Hand-/Bade-/Saunatücher stellt die Klinik.",
      "Parkplatz gegen Gebühr; Fahrradgarage gegen Gebühr, Fahrradständer kostenfrei."
    ],
    "sozialdienstLeistungen": [
      "Medizinisch-beruflich orientierte Rehabilitation (MBOR) mit berufsbezogenen Therapieangeboten zur Wiederherstellung der Erwerbsfähigkeit.",
      "Verhaltensmedizinisch orientierte Rehabilitation (VOR): orthopädischer Behandlungspfad mit psychologischem Gruppenprogramm."
    ],
    "factsExtra": [
      "Unterbringung einer Begleitperson laut Klinikseite 86,00 € zuzüglich Kurtaxe inklusive Vollpension.",
      "Versorgungsverträge vorhanden; nach den Beihilfevorschriften anerkannt.",
      "Seit 2005 Qualitätsmanagement nach DEGEMED und DIN EN ISO 9001.",
      "RAL-Gütezeichen Kompetenz richtig Essen mit Partner Dorfner menü.",
      "Bei Körpergröße über 1,95 m vorab melden wegen passendem Bett."
    ],
    "kontraindikationen": [
      "Psychosen (Qualitätskompass: Belastungs- und Anpassungsstörungen ohne Psychosen)."
    ],
    "therapieHinweise": [
      "Psychotherapeutische Einzel- und Gruppengespräche, Gestaltungs- und Musiktherapie.",
      "Entspannung: Anti-Stress-Vorträge, Achtsamkeit, PMR nach Jacobson.",
      "Medizinisch beruflich orientierte Reha."
    ],
    "wahlleistungenHinweis": "Parkplatz und Fahrradgarage gegen Gebühr; Telefon im Zimmer gegen Gebühr.",
    "mitbehandlungHinweis": "179 Betten, davon 80 Psychosomatik und 99 Orthopädie; Klinik behindertenfreundlich ausgestattet."
  },
  "ck-curtius": {
    "mitbehandlungHinweis": "Grundlage der Reha ist die medizinische Aufnahme und Eingangsdiagnostik sowie das psychologische Aufnahmegespräch. Fragebögen zur stationären Aufnahme vorab zurücksenden, damit besondere Erfordernisse erkannt werden.",
    "kontraindikationen": [
      "Akute psychotische Störungen.",
      "Geriatrische Rehabilitation ist nicht der Auftrag (Empfehlung: geriatrische Reha)."
    ],
    "alltag": [
      "Therapien vor allem an Wochentagen, am Wochenende in geringerer Dichte."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei der Einleitung von PsyReNa, digitaler Nachsorge De-Rena und individuellem Fallmanagement."
    ],
    "therapieHinweise": [
      "50 stationäre Reha-Plätze in einer 180-Betten-Klinik mit Akutstationen.",
      "Nebenbefundlich Mitbehandlung von Persönlichkeitsstörungen und PTBS, nicht als Schwerpunkt.",
      "Essstörungen (Bulimie, Anorexie) und Adipositas mit psychischen Faktoren im Reha-Spektrum."
    ],
    "factsExtra": [
      "Versorgungsvertrag § 111 SGB V für die Reha.",
      "Akutaufnahme separat mit Einweisungsschein nach § 108/109 SGB V."
    ],
    "wahlleistungenHinweis": "Wahlleistungspatienten aus allen Regionen auf der Klinikseite genannt."
  },
  "ck-db-brunnen": {
    "kontraindikationen": [
      "Reha mit Begleitperson in der Brunnen-Klinik nicht möglich.",
      "Listenhunde nach NRW-Verordnung Kategorie 1 und 2 werden nicht aufgenommen; Hunde in der Regel bis 20 kg / 40 cm Widerristhöhe.",
      "Klinik und Zimmer nicht barrierefrei; keine Aufnahme im Rollstuhl.",
      "Kinder werden weder behandelt noch als Begleitkind aufgenommen."
    ],
    "alltag": [
      "Reha mit Hund nach Anmeldung bei der Patientenaufnahme möglich; Impfschutz, Gesundheitscheck und Hundehaftpflicht erforderlich.",
      "Unterbringung in Einzelzimmern mit eigenem Duschbad; fast alle Zimmer mit Balkon, Fernseher, Telefon und abschließbarer Schublade.",
      "Frühstück und Abendessen als Buffet, mittags zwei bis drei Gerichte plus Salatbuffet; ein vegetarisches Menü, keine vegane Linie.",
      "Therapien in der Regel montags bis freitags 7:30–18:00 Uhr.",
      "Waschmaschine inkl. Waschpulver 3,00 €, Trockner 1,50 €; Bügeln kostenfrei.",
      "Tiefgarage 2 € pro Tag; zusätzliche kostenfreie Parkplätze unweit der Klinik."
    ],
    "wahlleistungenHinweis": "Privatärztliche Akutbehandlung am Standort möglich; Reha mit Hund als Spezialangebot.",
    "therapieHinweise": [
      "Tiefenpsychologische und verhaltensmedizinische Psychotherapie; Schwerpunkte u. a. Depression, Angst, somatoforme und Schmerzstörungen.",
      "Spezialangebote: Homeoffice-Programm, Trauergruppe, Paar-Reha, Gerontopsychosomatik und Gruppe zu zwischenmenschlichen Konflikten.",
      "Körperorientierte Angebote u. a. Biofeedback, Feldenkrais, Konzentrative Bewegungstherapie, Bouldern, Nordic Walking und Kreativtherapie."
    ],
    "factsExtra": [
      "Psychosomatische, psychiatrische und psychotherapeutische Reha in Horn-Bad Meinberg; Chefarzt Dr. med. Milan Perkušić.",
      "Zwei Medienpakete mit TV, WLAN im ganzen Haus und Festnetztelefon auf dem Zimmer gegen Gebühr.",
      "Allergien, Unverträglichkeiten oder verordnete Diäten mit Attest einige Tage vor Anreise an die Patientenaufnahme."
    ]
  },
  "ck-db-juliana": {
    "kontraindikationen": [
      "Keine Behandlung aktiver Abhängigkeitserkrankung, schwerer hirnorganischer Symptomatik, akuter schizophrener Psychosen, akuter Suizidalität oder Fremdgefährdung.",
      "Kein hoher pflegerischer Überwachungsaufwand; keine Pflegebedürftigkeit ab Pflegestufe 2.",
      "Unzureichende Deutschkenntnisse, die die Gruppenkommunikation wesentlich beeinträchtigen.",
      "Klinik und Zimmer nicht barrierefrei; keine Aufnahme im Rollstuhl.",
      "An Taubheit grenzende Schwerhörigkeit ohne technische Hilfsmittel im Haus."
    ],
    "alltag": [
      "Reha mit einem Hund möglich; Mitnahme einer Begleitperson dann ausgeschlossen.",
      "Mittagessen mit vegetarischem Menü; vegane Linie nicht angeboten.",
      "Allergien und Unverträglichkeiten vor Anreise mit Attest an die Patientenaufnahme.",
      "Alle Zimmer Einzelzimmer mit eigenem Duschbad; Föhn und Handtücher gestellt.",
      "Kein Fernseher auf dem Zimmer; gemeinsames Fernsehen in TV-Ecken.",
      "Kostenfreies WLAN im Eingangsbereich, nicht auf den Zimmern."
    ],
    "factsExtra": [
      "Erwachsene ab 18 Jahren; Substanzmissbrauch nur, wenn er nicht im Fokus der Symptomatik steht.",
      "Seit Januar 2026 zusätzliche Zimmer für die Reha mit Hund."
    ],
    "sozialdienstLeistungen": [
      "Sozialdienst u. a. Off-Job-/On-Job-Beratung und Hilfestellung bei beruflichen oder privaten Problemlagen."
    ],
    "therapieHinweise": [
      "Bezugstherapeutin bzw. Bezugstherapeut legt am Anreisetag den Therapieplan fest.",
      "Schwerpunkte Depression, Angst- und Panikstörungen, Erschöpfung und Burn-out, somatoforme und chronische Schmerzstörungen."
    ],
    "mitbehandlungHinweis": "Nebendiagnosen nach Absprache mit dem Klinikteam."
  },
  "ck-db-moehnesee": {
    "alltag": [
      "230 komfortable Einzelzimmer mit Dusche/WC und Balkon.",
      "Reha mit einem Hund möglich; Mitnahme einer Begleitperson dann ausgeschlossen.",
      "Unterbringung in Einzelzimmern mit eigenem Bad (Dusche/WC); die Klinik ist barrierefrei, die meisten Zimmer rollstuhlgerecht.",
      "Handtücher stellt die Klinik; Shampoo, Fön und Rasierapparat sind selbst mitzubringen.",
      "Rauchverbot im Zimmer; ausgewiesener Raucherbereich auf dem Gelände.",
      "WLAN im Eingangsbereich und in der Cafeteria kostenlos; auf dem Zimmer kostenpflichtig."
    ],
    "therapieHinweise": [
      "Psychosomatik, Kardiologie und Psychokardiologie.",
      "GiGS-Programm für Beschäftigte in Gesundheits- und Sozialberufen.",
      "Psychosomatische Tagesklinik und privatärztliche Akutbehandlung."
    ],
    "factsExtra": [
      "Reha mit Hund für psychosomatische Rehabilitandinnen und Rehabilitanden: zunächst elf Zimmer, Hund bleibt während der Therapien auf dem Zimmer; Mitnahme einer Begleitperson dann ausgeschlossen.",
      "Ganztägig ambulante psychosomatische Reha seit 2024 im Haus ausgewiesen.",
      "Doppelzimmer für Paare nach Rücksprache mit der Chefärztin bzw. dem Chefarzt möglich, wenn therapeutisch nichts entgegensteht."
    ],
    "wahlleistungenHinweis": "Fernsehen und Radio 1,50 € pro Tag; WLAN auf dem Zimmer 5 € für 24 Online-Stunden; Telefon 1 € pro Tag plus Gesprächseinheiten; Parkplatz 2 € pro Tag; Waschmaschine und Trockner je 3 € pro Vorgang."
  },
  "ck-db-norddeich": {
    "alltag": [
      "Reha mit einem Hund möglich; Mitnahme einer Begleitperson (Kind oder Erwachsene) dann ausgeschlossen.",
      "Unterbringung in Einzelzimmern mit eigenem Duschbad und WC, eingerichtet nach Healing Architecture; einige Zimmer mit Meerblick.",
      "Zimmervergabe vorrangig nach medizinischen und organisatorischen Kriterien; Meerseite gegen Gebühr, soweit Kapazität besteht.",
      "Reha mit Hund nur in der Psychosomatik: maximal ein Hund im Patientenzimmer, nicht läufig, Stockmaß bis 70 cm, keine gelisteten Rassen laut Klinik-Infoblatt.",
      "Begleitperson im Zustellbett im Patientenzimmer oder – bei Kapazität – im Einzelzimmer; Kinder nicht als Mitaufnahme.",
      "WLAN in der Eingangshalle kostenfrei, in den übrigen Bereichen gebührenpflichtig; TV im Zimmer gegen Tagespauschale."
    ],
    "therapieHinweise": [
      "Eigene Abteilung Psychosomatik; Chefarzt Ralf Müller, Facharzt für Psychiatrie und Psychotherapie mit suchtmedizinischer Grundversorgung.",
      "Stationäre Reha und Prävention sowie privatärztliche Akutbehandlung.",
      "Daneben Orthopädie.",
      "Schwerpunkte Depression, Belastungs- und Angststörungen sowie Erschöpfung/Burn-out; somatoforme Störungen im Spektrum.",
      "MBOR und Zentrum für Arbeit und Gesundheit am Standort; Therapien u. a. Qi Gong im Watt und Drums Alive laut Qualitätsprofil.",
      "Privatärztliche Akutpsychosomatik am Haus möglich."
    ],
    "kontraindikationen": [
      "Manifeste Suchterkrankungen; nach erfolgreich behandelter Sucht wird strikte Abstinenz gefordert.",
      "Erkrankungen des psychotischen Formenkreises (F20), bipolare Störungen (F31), dissoziative Störungen (F44, F48.1).",
      "Essstörungen (F50), sexuelle Funktionsstörungen (F52), Störungen im Wochenbett (F53).",
      "Persönlichkeits- und Verhaltensstörungen (F6), Intelligenzminderung (F7), Entwicklungsstörungen (F8) sowie F9.",
      "Fortwährend intensiv behandlungsbedürftige somatische Erkrankung, z. B. intravenöse Chemo- oder Antibiotikatherapie, Risikoschwangerschaft."
    ],
    "factsExtra": [
      "Akademisches Lehrklinikum für Psychotherapie.",
      "Sanierung aller Patientenzimmer 2024 abgeschlossen.",
      "Präventivkur für Soldatinnen und Soldaten sowie privatärztliche Akutbehandlung am Standort genannt."
    ],
    "wahlleistungenHinweis": "Mit den Einladungsunterlagen kann ein Zimmer zur Meerseite bzw. ein Aufenthaltspaket Plus gegen Gebühr gebucht werden, soweit Kapazität besteht. Begleitperson: Zustellbett inkl. Vollpension oder Einzelzimmer gegen Tagessatz. TV, WLAN außerhalb der Eingangshalle, Tiefgarage und Waschsalon sind gebührenpflichtig.",
    "mitbehandlungHinweis": "Orthopädie im selben Haus. Bei erfolgreich vorbehandelter Sucht strikte Abstinenz. Fortlaufend intensiv behandlungsbedürftige somatische Erkrankungen sind nicht Auftrag der psychosomatischen Reha."
  },
  "ck-deignis": {
    "alltag": [
      "Kein Fernseher auf dem Zimmer; Gemeinschaftsfernseher in den Aufenthaltsräumen.",
      "Haartrockner im Zimmer, kein Kühlschrank; Handtücher und Bettwäsche stellt die Klinik.",
      "Besuch in der therapiefreien Zeit möglich; die Therapieplanung richtet sich nicht nach Besuchszeiten.",
      "WLAN gegen Gebühr an der Rezeption; Waschmaschine und Trockner gegen Gebühr, Waschpulver kostenfrei.",
      "Post und Pakete an der Rezeption abholen; Wasserspender mit Schwarzwaldquellwasser, Getränkeautomat zusätzlich.",
      "Hunde nur in begrenzter Zahl und nur in bestimmten Zimmern in Altensteig, bitte vorab anfragen; andere Tiere nicht vorgesehen."
    ],
    "sozialdienstLeistungen": [
      "Soziotherapie zur Förderung sozialer Fähigkeiten und zum Aufbau eines stabilen Umfelds.",
      "Psy-RENA im Gesundheitszentrum Egenhausen: wöchentliche Gruppe plus Aufnahme- und Abschlussgespräch.",
      "Arbeits- und Belastungstraining zur schrittweisen Wiederherstellung der Belastbarkeit.",
      "Hilfe beim Reha-Antrag über behandelnde Ärztin/Arzt oder Psychotherapie.",
      "Psy-RENA-Nachsorge im Gesundheitszentrum Egenhausen: 25 Gruppengespräche à 90 Minuten plus Aufnahme- und Abschlussgespräch."
    ],
    "therapieHinweise": [
      "Christlich-integratives Konzept; spirituelle Angebote nur, wenn Sie das wünschen.",
      "Traumatherapie zur Verarbeitung traumatischer Erlebnisse ist im Angebot ausgewiesen.",
      "Stationär, tagesklinisch und ambulant; Abteilungen in Egenhausen und Altensteig.",
      "Lehrküche und spezialisiertes Essstörungsangebot am Standort Egenhausen."
    ],
    "factsExtra": [
      "Anmeldeformular und Informationsbroschüre der Fachklinik als PDF-Download.",
      "Kostenübernahme an Walddorfer Straße 23, 72227 Egenhausen senden.",
      "DRV-Kennziffer A23492; IK stationär 26082 1877, ambulant 54082 0126.",
      "Christliche Basis; Abteilungen in Egenhausen und Altensteig."
    ]
  },
  "ck-dgd-tagesreha-ffm": {
    "therapieHinweise": [
      "Psychotherapeutische Einzel- und Gruppentherapie, medizinische und psychologische Diagnostik, ärztliche Begleitung, Einbeziehung von Angehörigen.",
      "Tagesklinische Suchtrehabilitation nach Entgiftung und Kostenzusage.",
      "Daneben suchtmedizinische Sprechstunde und alltagsbegleitende ambulante Suchttherapie (Gruppe montags 17:00–18:30 Uhr, Einzelgespräche 14-täglich)."
    ],
    "factsExtra": [
      "Ganztägig ambulante Rehabilitation mit 20 Plätzen; 12-wöchiges Programm.",
      "Verhaltenssucht (Glücksspiel, Computer, Kaufen) neben Alkohol- und Medikamentenabhängigkeit öffentlich genannt.",
      "Angebot für Alkohol- und Medikamentenabhängigkeit im Rhein-Main-Gebiet; andere Suchtformen nach Absprache in der Suchtsprechstunde.",
      "Telefonische Erreichbarkeit eingeschränkt; Kontakt auch per Mail sucht@tagesreha-ffm.de."
    ],
    "mitbehandlungHinweis": "Bestehende psychiatrische und psychische Erkrankungen werden mitbehandelt.",
    "alltag": [
      "Sechs Tage pro Woche: Mo–Fr 8:00–16:00 Uhr, Sa 9:00–12:00 Uhr.",
      "Offene Informationsgruppe dienstags 16:00 Uhr in der Borsigallee 19 ohne Anmeldung."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei der Beantragung von Hilfen bei den Kostenträgern über die Suchtambulanz."
    ]
  },
  "ck-diako-adaption-husum": {
    "alltag": [
      "Große Gemeinschaftsküche sowie Gemeinschafts- und Freizeiträume zusätzlich zu den Appartements.",
      "16 Plätze in Einzelappartements mit Bad, Küchenzeile, TV, Telefon und WLAN.",
      "Fahrradverleih für Wege zum Praktikum.",
      "Lage im Zentrum Husum am Schlosspark, Behörden und Einkauf fußläufig."
    ],
    "factsExtra": [
      "Zertifiziert nach BAR und DIN EN ISO 9001:2015.",
      "Auch nach Entwöhnung bei pathologischem Glücksspiel sowie pathologischem Computer- und Internetgebrauch.",
      "Aufnahme auch substituierter Rehabilitandinnen und Rehabilitanden sowie Paare.",
      "Federführend DRV Nord; Informationsgespräch vor Terminvergabe."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei der Suche eines externen Praktikumsplatzes und Arbeitserprobung.",
      "Vermittlung von Nachsorge und Selbsthilfe; beratende Wohnungssuche."
    ],
    "therapieHinweise": [
      "Übergang von Gruppen- und Einzeltherapie zu begleitenden therapeutischen Leistungen.",
      "Gesundheitsförderliche Freizeitgestaltung.",
      "Regeldauer 12–14 Wochen Alkohol/Medikamente, 14–16 Wochen Drogen; Glücksspiel/Medien nach Vorgabe des Leistungsträgers."
    ]
  },
  "ck-diako-breklum": {
    "alltag": [
      "Multifunktionshalle mit Sporthalle und Fitness; Lehrküche, Kiosk mit Cafeteria; Außenbereich u. a. Beach-Volleyball.",
      "Paarbehandlung nach Absprache: getrennte Bezugsgruppen, gemeinsame Unterbringung im Einzelfall.",
      "Besuchszeit laut Drogen-Flyer täglich 16–22 Uhr und nach Absprache.",
      "In der Regel großzügige helle Einzelzimmer mit Bad.",
      "Zwei Bezugsgruppen, gemischt für Frauen und Männer."
    ],
    "factsExtra": [
      "Nahtloser Wechsel von der Entzugsstation des eigenen Krankenhauses in die Reha möglich.",
      "Stationär, teilstationär und Kombitherapie; substitutionsgestützte Reha im Einzelfall.",
      "Kurze Wege von der Akutbehandlung zur Reha im DIAKO-Verbund."
    ],
    "sozialdienstLeistungen": [
      "Adaption als stationäre Nachsorge.",
      "Ambulante Reha und Nachsorge in den Suchthilfezentren Schleswig und Kiel."
    ],
    "therapieHinweise": [
      "Regelbehandlung Alkohol/Medikamente 13–15 Wochen, Kurzzeit 8–10 Wochen.",
      "Kombitherapie; substitutionsgestützte Reha; Paartherapie; Lehrküche.",
      "Spezialangebote Mehrfachsucht, Trauma, Psychose, 55+, Glücksspiel, Medien."
    ],
    "mitbehandlungHinweis": "Begleiterkrankungen wie Depression, Angst, Essstörungen oder Traumatisierungen werden mitbehandelt."
  },
  "ck-diana": {
    "kontraindikationen": [
      "Zeitweilig gegen Rehafähigkeit: akute Suizidalität, Manien und Psychosen, massive Selbstschädigungen oder aktive Suchterkrankungen."
    ],
    "alltag": [
      "Begleitpersonen in der Psychosomatik nur zu den Wochenenden und nach Rücksprache mit dem behandelnden Arzt.",
      "Eigene Heil-, Hilfs- oder Arzneimittel nur nach Rücksprache mit den Klinikärztinnen und -ärzten.",
      "Psychosomatik mit eigenen Patientenzimmern und Therapiezentrum; magnetische Leisten an den Wänden zum Austauschen von Naturfotografien.",
      "Zwei-Bett-Zimmer mit eigener Nasszelle im Qualitätsbericht ausgewiesen; rollstuhlgerechte Sanitäranlagen und Aufzüge genannt.",
      "Keine eigenen Lebensmittel auf Zimmern oder Balkonen; keine Kühlmöglichkeit auf dem Zimmer.",
      "Bei Nahrungsmittelunverträglichkeit vor Aufnahme die Ernährungstherapie kontaktieren; Allergiepass oder ärztliche Diagnose mitbringen."
    ],
    "factsExtra": [
      "Eigene Patientenzimmer und Therapiezentrum Psychosomatik im Haus.",
      "Komorbide psychische Erkrankungen nach behandelter Substanzabhängigkeit in stabiler Remission sowie Restzustände nach psychosenahen Störungen als Indikation genannt.",
      "Sozialdienst und psychologischer Dienst im Haus; Entlassmanagement mit Einwilligung."
    ],
    "wahlleistungenHinweis": "Für Selbstzahler Wahlleistung Chefarztbehandlung möglich. Privatversicherte legen Kostenübernahmeerklärung der PKV und/oder Beihilfe vor.",
    "mitbehandlungHinweis": "Komorbide psychische Erkrankungen nach behandelter Substanzabhängigkeit in stabiler Remission sowie Restzustände nach psychosenahen Störungen öffentlich als Indikation genannt.",
    "therapieHinweise": [
      "Indikationen u. a. Depression, Angst, Traumafolgestörungen, somatoforme und chronische Schmerzstörungen, psychovegetative Syndrome."
    ]
  },
  "ck-do-it": {
    "alltag": [
      "70 Behandlungsplätze in Lübeck-Travemünde auf der Halbinsel Priwall, strandnah am Naturschutzgebiet.",
      "Eigene Frauenetage (Ladies only) für Frauen, die ausschließlich unter Frauen wohnen möchten.",
      "Externe Adaption in Hamburg-Eilbek (19 Plätze) sowie Wohngruppe auf dem Priwall (5 Plätze) gehören zur Gesamteinrichtung."
    ],
    "sozialdienstLeistungen": [
      "Bewerbungstraining und berufliche Orientierung.",
      "Einleitung und Begleitung externer Arbeitspraktika.",
      "Ergotherapie und Arbeitstherapie inkl. Berufsgruppe."
    ],
    "therapieHinweise": [
      "Erstbehandlung, Kurzzeit und Kombi-Behandlung.",
      "Frauenspezifische Gruppen und traumatherapeutische Angebote durch Therapeutinnen; Gruppe Sicherheit finden.",
      "TEK – Training emotionaler Kompetenzen; Paartherapie möglich."
    ],
    "factsExtra": [
      "DIN EN ISO 9001; §§ 35, 36 BtMG.",
      "Ausstiegsorientierte Substitution laut Download.",
      "Online-Bewerbung mit Angaben zum Entgiftungsort."
    ],
    "mitbehandlungHinweis": "Nebendiagnosen u. a. Alkohol, Glücksspiel, Sexsucht, pathologischer PC-Gebrauch, Essstörungen, PTBS, ADHS und Persönlichkeitsstörungen."
  },
  "ck-do-it-adaption": {
    "alltag": [
      "Komplett ausgestattete Einzimmerappartements mit Selbstversorgung.",
      "Wochenplan; beruflichen und sozialen Alltag strukturieren Sie mit Unterstützung weitgehend selbst."
    ],
    "therapieHinweise": [
      "Abschließender Teil der Entwöhnung mit medizinischer und sozial- bzw. psychotherapeutischer Therapie.",
      "Externe Praktika zur Erprobung realer Arbeitssituationen; Freizeitaktivitäten mit Teamunterstützung.",
      "Behandlungsdauer öffentlich mit drei bis vier Monaten genannt.",
      "Abschließender Teil der Entwöhnung mit Schwerpunkt berufliche Reintegration.",
      "19 Behandlungsplätze."
    ],
    "factsExtra": [
      "19 Behandlungsplätze in Hamburg-Eilbek, Hasselbrookstraße 98; zugehörig zur Fachklinik DO IT! Lübeck-Travemünde.",
      "Zertifizierung DIN EN ISO 9001:2015 und deQus. Online-Bewerbung auf der Trägerseite.",
      "Anerkennung durch DRV Bund, weitere Rentenversicherungen, Krankenkassen und soziale Leistungsträger.",
      "Anerkennung DRV Bund, andere Rentenversicherungen und Krankenkassen.",
      "Standort Hamburg-Eilbek, zugehörig zu DO IT! Travemünde."
    ]
  },
  "ck-domiziel": {
    "alltag": [
      "Einzelzimmer in acht Wohneinheiten; Küche, Bad und Freizeiträume gemeinsam.",
      "TV und kostenfreier WLAN-Anschluss.",
      "Belastungserprobungen und Praktika in über 60 Arbeitsfeldern und ortsansässigen Betrieben.",
      "Acht Plätze in kleinen Wohneinheiten, überwiegend Einzelzimmer, zentrales Mehrfamilienhaus."
    ],
    "therapieHinweise": [
      "Bewerbungstraining und -coaching, internes Arbeitstraining sowie externe Praktika.",
      "Indikativgruppen, z. B. EDV-Kurs.",
      "Zweite Phase der stationären Reha unter Alltagsbedingungen.",
      "Frauen, Männer und Paare ab 18; Psychose und Sucht; übergangsweise abstinenzorientierte Substitution."
    ],
    "sozialdienstLeistungen": [
      "Hilfe bei Anträgen auf Sozialleistungen, juristischen Fragen und Organisation der Nachsorge."
    ],
    "factsExtra": [
      "Besichtigung vorab möglich."
    ]
  },
  "ck-donnersberg": {
    "alltag": [
      "Freies WLAN; nach Therapie und Abendessen Freizeit u. a. in Sauna, Sporthalle, Fitnessraum, Bibliothek, Musikraum, Fußballplatz, Beach-Volleyball und Boule.",
      "Aufnahmegruppe zum Einstieg in die Reha-Gemeinschaft.",
      "Fünf Wohnhäuser, 72 Plätze.",
      "Einzel- und Doppelzimmer mit eigenem Nassbereich."
    ],
    "sozialdienstLeistungen": [
      "Beratung zu sozialrechtlichen Fragen, finanzieller Absicherung und Krankenversicherungsstatus.",
      "Kooperation mit Suchtberatungsstellen und Selbsthilfe zur Nachsorge.",
      "MPU-Vorbereitung mit geprüfter Kraftfahreignungsberatung (DVPK).",
      "Berufliche Wiedereingliederung.",
      "Übergang in die Adaption DomiZIEL."
    ],
    "factsExtra": [
      "Beteiligung am Nahtlosverfahren Qualifizierter Entzug/Suchtrehabilitation.",
      "Übergangsweise abstinenzorientierte Substitution möglich.",
      "Arbeitstherapie in Holz/Kreativ, Hauswirtschaft, Garten und Haustechnik; PC-Schulungsraum mit 12 Arbeitsplätzen.",
      "Anerkennung nach §§ 35 und 36 BtMG.",
      "Ergo- und Arbeitstherapie, Sport, Qi Gong."
    ],
    "wahlleistungenHinweis": "Selbstzahlung möglich, wenn keine Zusage des Leistungsträgers vorliegt.",
    "therapieHinweise": [
      "Dauer je nach Indikation 10–22 Wochen.",
      "Doppeldiagnose Psychose und Sucht; nicht stoffgebundene Süchte inkl. Medien, Glücksspiel, Kaufsucht.",
      "Übergangsweise abstinenzorientierte Substitution."
    ],
    "mitbehandlungHinweis": "Medikamentöse und psychiatrische Mitbehandlung seelischer Begleitstörungen."
  },
  "ck-drv-frankenhausen": {
    "alltag": [
      "Anreise zwischen 09:00 und 12:00 Uhr; Zimmer am Abreisetag bis 08:00 Uhr räumen.",
      "Keine Begleitpersonen; keine Haustiere.",
      "Kostenfreies WLAN; Parkplatz 1,00 Euro am Tag, keine Wohnmobile.",
      "Kein Wasserkocher aus Brandschutzgründen; Heißwasserbereiter in den Teeküchen.",
      "196 Einzelzimmer mit Duschbad; fünf rollstuhlgerechte Zimmer, überwiegend barrierefrei, Nichtraucherzimmer ohne Balkon.",
      "Zimmer mit Bett, Schreibtisch, Garderobe, kostenfreiem Wertfach, Telefon und gebührenfreiem Fernseher."
    ],
    "therapieHinweise": [
      "Duale Reha Psycho-Orthopädie.",
      "Digitale Nachsorgeangebote."
    ],
    "sozialdienstLeistungen": [
      "Medizinisch-beruflich orientierte Rehabilitation (MBOR) mit Arbeitsplatz- und Berufsbezug."
    ],
    "factsExtra": [
      "Duale Reha Psycho-Orthopädie: Teams beider Fachrichtungen erstellen von Beginn an gemeinsame Behandlungspläne und die sozialmedizinische Leistungsbeurteilung."
    ],
    "mitbehandlungHinweis": "Am zweiten Tag Blutuntersuchung, EKG und Blutdruck. Aktuelle Befunde sowie Röntgen-, CT- oder MRT-Aufnahmen zur Anreise, um Doppeluntersuchungen zu vermeiden."
  },
  "ck-drv-friedrichshoehe": {
    "therapieHinweise": [
      "Psychosomatische Rehabilitation u. a. Depression, Burn-out, Angst, PTBS, Trauer, chronischer Kopfschmerz.",
      "Mitbehandlung co-morbider Suchtprobleme laut Klinikfokus."
    ],
    "kontraindikationen": [
      "Behandlungen auf ein maximales Körpergewicht von 130 kg ausgerichtet."
    ],
    "alltag": [
      "Zimmer mit Dusche/WC, Fernseher und Telefon; überwiegend Einzelzimmer, in Ausnahmefällen Doppelzimmer.",
      "WLAN in fast allen Bereichen gegen Medienpauschale.",
      "Klinikrestaurant: Frühstücksbüfett, abends kaltes Büfett mit Salatbar; mehrere Menüs einschließlich spezieller Diäten.",
      "Bewegungsbad und freies Schwimmen im Therapiezentrum Brunswiek (32 °C); Hallenschwimmbad auch zur Freizeit nutzbar.",
      "Nichtraucherklinik; Rauchen nur im ausgewiesenen Raucherbereich, nicht auf Balkonen und im Eingangsbereich.",
      "Abholung vom Bahnhof Bad Pyrmont mit klinikeigenem Transporter nach Voranmeldung; Parkraum begrenzt."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung nach Veranlassung durch die Stationsärztin bzw. den Stationsarzt."
    ],
    "factsExtra": [
      "Therapiezentrum für Psychosomatik der DRV Braunschweig-Hannover im Reha-Zentrum Bad Pyrmont, neben dem Therapiezentrum Brunswiek.",
      "177 stationäre Plätze laut Klinikseite; Zertifizierung QMS-Reha.",
      "Psychosomatische Reha in der Regel fünf Wochen laut Klinikseite.",
      "Stadtmitte zu Fuß erreichbar; am Wochenende Busausflüge in die Umgebung."
    ],
    "wahlleistungenHinweis": "WLAN gegen Medienpauschale. Begleitpersonen mit Vollverpflegung und Kurtaxe im Patientenzimmer möglich; aktueller Tagessatz auf der Klinikseite."
  },
  "ck-drv-hellbachtal": {
    "alltag": [
      "Zimmer mit Telefonanschluss; Durchwahl entspricht der Zimmernummer.",
      "Unverträglichkeiten im Speisesaal bzw. bei der Diätassistenz angeben.",
      "Wertgegenstände im Wertfach; Haftung sonst ausgeschlossen."
    ],
    "therapieHinweise": [
      "Fachabteilungen Psychosomatik und Orthopädie; u. a. chronische Schmerzstörung, Burn-out, ADHS bei Erwachsenen.",
      "Ernährungsmedizinische Schwerpunktklinik (nutriZert)."
    ],
    "kontraindikationen": [
      "Körpergewicht über 130 kg laut Kliniksteckbrief nicht vorgesehen.",
      "Keine Mitnahme von Haustieren."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung zu sozialrechtlichen Fragen.",
      "Einleitung von Leistungen zur Teilhabe am Arbeitsleben.",
      "Reha- und Rentenberatung laut Hausordnung."
    ],
    "factsExtra": [
      "Anerkannte Lehr- und Modellklinik der Deutschen Gesellschaft für Ernährungsmedizin.",
      "QMS-REHA-zertifiziert; 192 Zimmer, davon drei barrierefreie Einzelzimmer.",
      "Doppelzimmer für gemeinsam anreisende Paare; Zimmer mit Balkon nach Verfügbarkeit ohne Reservierung.",
      "Bewegungsbad und freie Trainingstherapie in therapiefreier Zeit nach Aushang."
    ],
    "mitbehandlungHinweis": "Mitbehandlung ADHS im Erwachsenenalter. Zusammenarbeit mit der Klinik Föhrenkamp (Onkologie, Gastroenterologie, Diabetologie). Begleitperson auf Anfrage im Doppelzimmer."
  },
  "ck-drv-kurhessen": {
    "kontraindikationen": [
      "Für die verhaltensmedizinisch-orthopädische Rehabilitation (VOR) im Haus Werra: schwere Persönlichkeitsstörungen, Suchterkrankung, akute Suizidalität und gravierende psychische Störungen."
    ],
    "therapieHinweise": [
      "Psychosomatische Rehabilitation und VOR im Haus Werra; Orthopädie im Haupthaus.",
      "Regeldauer öffentlich vier Wochen.",
      "Post-COVID-Angebot."
    ],
    "alltag": [
      "Einzelzimmer mit Dusche/WC und Telefon, zum Teil rollstuhlgerecht; begrenzte Doppelzimmer für Paare.",
      "Kostenloses WLAN in Patientenzimmern, Aufenthaltsräumen und Wartebereichen.",
      "Anreise aus der Umgebung möglichst bis 9.30 Uhr, weitere Anreise bis 10.30 Uhr; Abholung vom Bahnhof mit dem Hausbus.",
      "Begrüßung um 16.30 Uhr mit kurzem Klinikrundgang.",
      "Waschmaschine und Trockner vorhanden; Wäschepaket wird gestellt, Hand- und Badetücher sowie Bettwäsche wöchentlich gewechselt.",
      "Psychosomatik und verhaltensmedizinisch-orientierte Rehabilitation (VOR) im Haus Werra, Orthopädie im Haupthaus."
    ],
    "factsExtra": [
      "Zwei Häuser: Haupthaus Orthopädie, Haus Werra Psychosomatik/VOR und Post-COVID.",
      "E-Bike-Ladeboxen in beiden Häusern; Klinikpfarrerin für Seelsorge erreichbar.",
      "Zwei Badehandtücher für Anwendungen, Schwimmbad und Sauna empfohlen."
    ],
    "wahlleistungenHinweis": "Begleitpersonen nach Absprache mit der Patienten-Aufnahme. Parken in den umliegenden Straßen kostenlos.",
    "mitbehandlungHinweis": "Bei Aufnahme differenzierte ärztliche und psychologische Eingangsdiagnostik inkl. psychologischer Testverfahren; Standard u. a. Ruhe-EKG, Blutdruck und Labor. Bitte aktuelle Untersuchungsergebnisse sowie Röntgen-, CT- oder MRT-Aufnahmen mitbringen."
  },
  "ck-drv-lipperland": {
    "sozialdienstLeistungen": [
      "Intensivierte Reha-Nachsorge.",
      "Ambulantes Präventionsangebot GUSI (Gesundheitsförderung und Selbstregulation durch individuelle Zielanalyse) in der Villa GUSI neben der Klinik."
    ],
    "therapieHinweise": [
      "Psychodynamische Gruppenpsychotherapie, ergänzt durch Verhaltenstherapie und Systemik.",
      "Duale Reha Psycho-Orthopädie.",
      "Lichttherapie nach Verordnung der Bezugstherapie."
    ],
    "alltag": [
      "166 Einzelzimmer mit Duschbad; 45 mit Balkon, drei barrierefrei; alle Nichtraucherzimmer.",
      "Fernseher gebührenfrei; eingehende Anrufe ohne Telefongebühr; kostenfreies WLAN im gesamten Haus.",
      "Rauchen nur im Pavillon im Park; auf Zimmern, Balkonen und übrigem Gelände nicht gestattet.",
      "Waschmaschine, Trockner und Bügeleisen im 1. UG; Waschmarken gegen Entgelt am Empfang, Nutzungszeit 07:00–21:00 Uhr.",
      "Besuch in den Aufenthaltsräumen; Zimmer und übrige Räume sind nicht für Besuch bestimmt.",
      "Parkplätze auf dem Gelände begrenzt und gegen Entgelt (2 Euro/Tag am Empfang)."
    ],
    "factsExtra": [
      "QMS-REHA-zertifiziert; psychosomatische und duale Rehabilitation in der Regel fünf Wochen.",
      "DGE-zertifizierte Menülinie; Kostformen nach Verordnung, Buffet bzw. Ausgabe im Speisesaal.",
      "Kostenfreier Taxi-Transfer vom Bahnhof Bad Salzuflen bei vorher mitgeteilter Ankunftszeit (Taxigutschein)."
    ],
    "mitbehandlungHinweis": "Ärztliche Eingangsuntersuchung in der Regel am Ankunftstag. Spezialisten in Bad Salzuflen können in Ausnahmefällen einbezogen werden. Allergien und Unverträglichkeiten nur bei fachärztlichem Attest oder Allergiepass und nach Vorab-Absprache mit der Klinik."
  },
  "ck-drv-werra": {
    "alltag": [
      "Psychosomatik und VOR im Haus Werra; Orthopädie überwiegend im Haupthaus.",
      "Bewegungsbad, Außensportanlage und Gymnastikhalle; Kurpark, Gradierwerk und Werrataltherme fußläufig.",
      "Kostenfreies WLAN in Patientenzimmern, Aufenthaltsräumen und Wartebereichen.",
      "Einzelzimmer mit Dusche/WC und Telefon, teils mit Flachbildfernseher; begrenzte Doppelzimmer für Paare; TV und Telefonie ins deutsche Festnetz kostenfrei.",
      "Anreise aus der näheren Umgebung möglichst bis 9:30 Uhr, bei weiterer Anreise bis 10:30 Uhr, damit die Aufnahmeuntersuchung am Anreisetag erfolgen kann.",
      "Hausbus vom Bahnhof; kostenlose Parkmöglichkeiten in den umliegenden Straßen."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung als fester Bestandteil des Reha-Programms.",
      "Sozialtherapeutische Anteile im VOR-Konzept (Orthopädie plus psychische Belastung)."
    ],
    "therapieHinweise": [
      "Schwerpunkt Gruppentherapie; Einzelgespräche einmal wöchentlich fest im Programm.",
      "Verhaltensmedizinisch-orientierte Rehabilitation (VOR) und PsychMBOR im Haus Werra.",
      "Entspannung: progressive Muskelrelaxation, autogenes Training, Biofeedback, Yoga, Tai-Chi, Meditation.",
      "Kreative Ergotherapie, Physio- und Bewegungstherapie; Vorträge zu Depression, Angst, Schlaf, Schmerz, Stress und Burn-out.",
      "Eigenes Konzept für psychische Folgen einer COVID-19-Erkrankung."
    ],
    "factsExtra": [
      "Klinik der DRV Hessen in zwei Häusern: Haupthaus Orthopädie, Haus Werra Psychosomatik/VOR.",
      "Indikationen Psychosomatik laut Klinik: Depression, Angst, Stress, Burn-out, Schmerz, PsychMBOR, Post-COVID."
    ],
    "mitbehandlungHinweis": "Im Haus Werra neben Psychosomatik auch orthopädische Mitbehandlung; medikamentöse Therapie, Ergotherapie und medizinische Trainingstherapie im interdisziplinären Setting.",
    "wahlleistungenHinweis": "Begleitpersonen nach Absprache über die Patienten-Aufnahme (05652 953-603)."
  },
  "ck-drv-wingertsberg": {
    "sozialdienstLeistungen": [
      "Sozialrechtliche Vorträge und Beratung im Reha-Zentrum."
    ],
    "therapieHinweise": [
      "Onkologie und psychosomatische Krankheiten; Duale Reha Psycho-Onkologie.",
      "Psychosomatik-Abteilung für Depression, Angst, Erschöpfung, somatoforme Störungen."
    ],
    "alltag": [
      "209 Einzelzimmer und 10 Doppelzimmer mit Bad, Telefon, Safe und kostenfreiem TV; 51 Zimmer mit Balkon nach Verfügbarkeit, ohne Reservierung.",
      "Drei barrierefreie Einzelzimmer und ein barrierefreies Doppelzimmer; alle Zimmer sind Nichtraucherzimmer.",
      "Kostenfreies WLAN in der gesamten Klinik.",
      "Parkplätze nur begrenzt und ausschließlich für Rehabilitandinnen und Rehabilitanden mit Schwerbehinderung.",
      "Vom Bahnhof Bad Homburg mit Taxi (roter Punkt) und dem mit der Einladung zugesandten Taxigutschein.",
      "Waschmaschine und Trockner gegen Entgelt, Waschmittel selbst mitbringen. Handtücher im Zimmer; zwei Badehandtücher für Anwendungen und Schwimmbad empfohlen."
    ],
    "factsExtra": [
      "QMS-REHA-zertifiziert; eine Menülinie nach DGE-Qualitätsstandard für die Verpflegung in Kliniken.",
      "Schwimmbad, Bibliothek und Cafeteria am Standort.",
      "Duale Reha Psycho-Onkologie als Modellprojekt für Versicherte der Deutschen Rentenversicherung; Aufenthalt in der Regel fünf Wochen.",
      "Spezielles onkologisches Ernährungskonzept und Therapiekonzept nach autologer Stammzellentransplantation.",
      "Internistisch-onkologische Facharztberatung in türkischer Sprache."
    ],
    "wahlleistungenHinweis": "Waschmaschine und Trockner gegen Entgelt; Waschmittel selbst stellen. Begleitperson nach Absprache und Verfügbarkeit für die gesamte Reha im Doppelzimmer.",
    "mitbehandlungHinweis": "Begleiterkrankungen wie Bluthochdruck und Diabetes mellitus sind im Klinikprofil genannt. Stoma- und Diabetesberatung am Standort. Ärztliche Aufnahmeuntersuchung am Anreisetag, psychotherapeutisches Aufnahmegespräch am zweiten Behandlungstag."
  },
  "ck-ebel-bergfried": {
    "kontraindikationen": [
      "Akute Suchtproblematik; akute Intoxikationen.",
      "Akute Eigen- oder Fremdgefährdung.",
      "Psychosen, Schizophrenie, Wahnerkrankungen im Akutstadium; akute manische Zustände.",
      "Ausgeprägte Schwerhörigkeit oder Taubheit.",
      "Dementielle Erkrankungen; mittelschwere bis schwere Intelligenzminderung.",
      "Pflegebedürftigkeit oder Bettlägerigkeit; Erkrankungen, bei denen eine aktive Therapieteilnahme nicht möglich ist."
    ],
    "alltag": [
      "Parkplätze kostenpflichtig; Verleih von Bügeleisen und Föhn.",
      "185 Einzelzimmer, wenige Doppelzimmer; eigenes Bad, Balkon, TV (im Fachkrankenhaus kein TV im Zimmer), Telefon, Pflegenotruf.",
      "Etagenweise Teeküche; Waschautomaten und Trockner nutzbar.",
      "Zimmer für Begleitkind (Doppelzimmer/Verbindungstür) und für Reha mit Haustier (separater Flur, hygienische Anpassungen); einzelne Zimmer für Mobilitätseinschränkung und ausgeprägtes Übergewicht."
    ],
    "sozialdienstLeistungen": [
      "Psy-RENA-Nachsorge der DRV Bund für psychische und psychosomatische Störungen (außer stoffgebundene Abhängigkeitserkrankungen); bis 26 Termine, primär Gruppe, berufsbegleitend, ohne Zuzahlung.",
      "Entlassmanagement und Nachsorge laut Klinikseite.",
      "Sozialberatung im Therapiekonzept (u. a. soziales Kompetenztraining)."
    ],
    "therapieHinweise": [
      "Einzel- und Gruppenpsychotherapie, themenoffen oder indikationsbezogen (u. a. Depression, Angst, Burn-out).",
      "Verfahren: tiefenpsychologisch, verhaltenstherapeutisch, traumatherapeutisch, systemisch, positiv-psychotherapeutisch, hypnotherapeutisch; PMR, Genusstraining.",
      "Eigenes Programm Corona-Folgestörungen / Post-COVID."
    ],
    "factsExtra": [
      "Reha für pflegende Angehörige / Verhinderungspflege ausgewiesen.",
      "Anreise laut Klinik zwischen 10 und 12 Uhr; Zimmerschlüssel am Empfang.",
      "Schwerlast- und Begleitkind-Zimmer ausdrücklich genannt."
    ],
    "wahlleistungenHinweis": "Angebote für Selbstzahler; Begleitpersonen und Haustiere nach Klinikregel. RV Fit (Prävention) am Standort."
  },
  "ck-ebel-heinrich-heine": {
    "kontraindikationen": [
      "Akute Suchtproblematik; akute Suizidalität.",
      "Psychosen, Schizophrenie, Wahnerkrankungen im Akutstadium.",
      "Pflegebedürftigkeit oder Bettlägerigkeit; Erkrankungen, bei denen eine aktive Teilnahme an den Therapien nicht möglich ist.",
      "Vormedikation mit Spravato (Esketamin) kann in der Reha wegen fehlender Überwachungsmöglichkeiten nicht weitergeführt werden."
    ],
    "alltag": [
      "Waschmaschinen und Trockner gegen 3,20 bis 3,70 Euro je nach Uhrzeit; Wäscheständer im Zimmer.",
      "Besuch in Cafeteria, Empfang und Außenbereich; Zimmer, Speisesäle und Schwimmbad sind Rehabilitandinnen und Rehabilitanden vorbehalten.",
      "Schwimmbad, Sauna, Hydrojet, Badestrand, therapeutisches Bogenschießen, Turnhalle, Lehrküche, Bootssteg.",
      "Sonderkost bei Allergien oder Intoleranzen nur mit Nachweis; gluten- oder weizenfreie Ernährung mit DGVS-leitlinienkonformem Befund (Antikörper und Biopsie).",
      "315 Einzelzimmer, teilweise mit Balkon und Seeblick; eigenes Bad, TV mit Satellit, Telefon, Pflegenotruf, Wäscheständer.",
      "Waschmaschinen im Haus; Lage auf einer Halbinsel im Havelland bei Potsdam-Neu Fahrland."
    ],
    "therapieHinweise": [
      "Integratives Konzept auf verhaltenstherapeutischer Grundlage mit tiefenpsychologischen, psychodynamischen, achtsamkeitsbasierten und körperpsychotherapeutischen Anteilen.",
      "Überwiegend geschlossene Bezugsgruppen mit gemeinsamer An- und Abreise."
    ],
    "mitbehandlungHinweis": "Klinik stellt erforderliche wirkstoffgleiche Medikamente; besondere Präparate (z. B. BTM) für mindestens eine Woche mitbringen bzw. vorab abstimmen. Medizinisches Cannabis nur nach Vorabklärung mit der medizinischen Leitung.",
    "sozialdienstLeistungen": [
      "Entlassmanagement und Nachsorge laut Klinikmenü."
    ],
    "factsExtra": [
      "Größtes Fachzentrum für Psychosomatik und stationäre Psychotherapie Berlin-Brandenburgs laut Trägerseite.",
      "Akutbehandlung und Corona-Folgestörungen am Standort ausgewiesen.",
      "Allergien, Größe und Gewicht vor Anreise angeben, damit ein passendes Zimmer zugeordnet werden kann."
    ],
    "wahlleistungenHinweis": "Kostenpflichtige Wahlleistungszimmer im Rahmen einer Reha über Sozialversicherungsträger laut Klinik im Versorgungsvertrag ausgeschlossen. Zimmerwünsche und -wechsel werden öffentlich nicht bearbeitet."
  },
  "ck-ebel-vogelsberg": {
    "alltag": [
      "Mittags drei Gerichte plus Salatbuffet (Vollkost, angepasste Vollkost, ovo-lacto-vegetabil); vegetarische und vegane Kost ohne Voranmeldung.",
      "Gluten- oder weizenfreie Kost nur mit DGVS-gerechtem Befund (Antikörpertests und Biopsie); Atteste von Heilpraktikern sowie IgG/IgG4-Bestimmungen werden nicht anerkannt.",
      "Hydrojet, Solarium und Bogenschießen zusätzlich zu Schwimmbad, Sauna und MTT.",
      "WLAN in nahezu allen Bereichen gegen Gebühr; Zugangsdaten an der Rezeption.",
      "Haustiere nicht mitbringen; Zimmer am Anreisetag ab ca. 11:00 Uhr, am Abreisetag bis 8:30 Uhr.",
      "Aufnahmefragebogen und Fragebogen zur Sozial- und Arbeitsanamnese ausgefüllt am Anreisetag mitbringen."
    ],
    "wahlleistungenHinweis": "WLAN gegen Gebühr; Zimmertelefon gegen Bereitstellungsgebühr; vergünstigter Parkausweis 1,50 Euro/Tag (20 Euro Pfand); Solarium über Wert-Coins; Nordic-Walking-Stöcke gegen Gebühr.",
    "mitbehandlungHinweis": "Psychosomatische Institutsambulanz (PsIA): in der Regel ein bis zwei Vor- oder Nachmittage pro Woche, meist mindestens sechs Monate; für den türkischen Sprachraum Behandlung auf Türkisch möglich.",
    "sozialdienstLeistungen": [
      "IRENA-Nachsorge der DRV Bund (bei psychischen Störungen bis 26 Termine, primär Gruppe, berufsbegleitend); Vermittlung wohnortnaher Anbieter über die Sozialberatung.",
      "Webbasierte Adipositas-Nachsorge über drei Monate in geschlossener Gruppe."
    ],
    "therapieHinweise": [
      "Integrative verhaltenstherapeutische und tiefenpsychologisch fundierte Einzel- und Gruppentherapie; Schematherapie.",
      "Bezugsgruppe mit zehn bis zwölf Patientinnen/Patienten."
    ],
    "factsExtra": [
      "Klinikinterner Kindergarten und Kooperationsschulen für Mitreise von Kindern.",
      "RV Fit seit 2019 am Standort.",
      "Zusätzlich Akutpsychosomatik und psychosomatische Institutsambulanz (PsIA)."
    ]
  },
  "ck-ebhausen": {
    "kontraindikationen": [
      "Kontraindiziert bei schweren somatischen, insbesondere hirnorganischen Schädigungen sowie bei Pflegebedürftigkeit (Adaptionskonzeption).",
      "Ausschluss u. a. bei akuter Psychose, schwerer Depression, akuter Selbst- oder Fremdgefährdung sowie schwerer geistiger Behinderung."
    ],
    "alltag": [
      "24 Einzelzimmer mit Dusche/WC, Fernsehanschluss und WLAN, teils mit Küchenzeile (Neubau 2018).",
      "Drei Wohngruppen mit Gemeinschaftsküche, Aufenthaltsraum und Balkon bzw. Terrasse; gesonderte Wohneinheiten für Frauen und Männer.",
      "Separate Wohneinheit für Rehabilitandinnen und Rehabilitanden mit Haustieren (z. B. Hund oder Katze).",
      "Barrierearm mit Aufzug; Aufnahme mit Gehhilfen oder Rollstuhl, sofern der Alltag selbstständig bewältigt wird.",
      "Sport- und Fitnessräume, Computerraum, Holz- und Montagewerkstatt, Garten mit Grillstelle und Volleyballplatz.",
      "Am Aufnahmetag Empfang durch eine Patin bzw. einen Paten aus der Rehabilitandenschaft."
    ],
    "sozialdienstLeistungen": [
      "Geeignete Stelle der Schuldnerberatung nach § 305 InsO; Schuldenregulierung im Haus.",
      "Bewerbungstraining, internes Arbeitstraining, Unterstützung bei externen Praktika und Arbeitsplatzsuche.",
      "Sozialberatung zu Behörden, Recht, Wohnperspektive und Nachsorge; Zusammenarbeit mit Agentur für Arbeit und Jobcentern."
    ],
    "therapieHinweise": [
      "Regelbehandlungsdauer öffentlich 12 Wochen bei Alkoholabhängigkeit und pathologischem Spielen, 14 Wochen bei Drogenabhängigkeit und multiplem Substanzgebrauch.",
      "Einzeltherapie mit individueller Planung, Gruppentherapie, Indikationsgruppen, Krisenintervention und medizinische Betreuung.",
      "Aufnahme ab vollendetem 18. Lebensjahr nach regulär abgeschlossener Entwöhnungsbehandlung; schriftliche Bewerbung mit Sucht- und Lebenslauf sowie Vorstellungsgespräch."
    ],
    "factsExtra": [
      "Stationäre Adaption für suchtmittelabhängige Männer und Frauen, inkl. pathologisches Spielen.",
      "Freiwillige seelsorgerische Angebote und Fahrdienst zum Gottesdienst der Evangelisch-methodistischen Kirche in Nagold.",
      "Ambulant betreutes Wohnen (AWS) im Trägerverbund als mögliche Anschlusshilfe nach der Adaption."
    ]
  },
  "ck-eichelsdorf": {
    "alltag": [
      "Einzel- und Doppelzimmer; Paar- und Familienzimmer möglich.",
      "Vormittags Arbeitstherapie, nachmittags Gruppen- und Einzeltherapie; Freizeit in der Regel ab 16 Uhr.",
      "Selbstverwaltung durch Rehabilitanden-Teams (Ordnung, Sauberkeit, Dienste).",
      "Therapiedauer 24 Wochen; Auffrischungsbehandlung 12–16 Wochen nach Vereinbarung.",
      "Kostenloses WLAN in allen Zimmern.",
      "Haupthaus: Zimmer mit eigenem Bad; Bettenhaus für Männer mit Waschbecken und gemeinsamer Nasszelle."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung zu Schulden, Miete, Krankenversicherung und Strafverfahren.",
      "Externe Berufsberatung durch das Jobcenter; Angehörigen- und Familiengespräche.",
      "BORA-Analyse in der ersten Woche; bei Bedarf Fachberater des Jobcenters in Haßfurt.",
      "Prüfung stufenweiser Wiedereingliederung und Betriebspraktikum zur Vorbereitung des Wiedereinstiegs."
    ],
    "therapieHinweise": [
      "Psychotherapie in kleinen Bezugsgruppen; Self-Management-Ansatz nach Kanfer, Reinecker und Schmelzer.",
      "Arbeitstherapie in Garten, Hauswirtschaft, Küche, Service, Wäscherei, Töpferei, Hausmeisterei und Bau.",
      "Indikationsgruppen u. a. Achtsamkeit, Antigewalt, Selbstsicherheit, Psychosegruppe, Psychoedukation, MPU-Seminare, Eltern-Kind-Gruppe.",
      "Paartherapie und systemische Paargespräche; Aufnahme von Paaren und Schwangeren.",
      "MPU-Vorbereitung vom TÜV Thüringen anerkannt; Anerkennung nach §§ 35/36 BtMG.",
      "Ohrakupunktur nach NADA-Protokoll, Yoga und tiergestützte Therapie im Konzept genannt."
    ],
    "factsExtra": [
      "bwlv-Fachklinik im Schloss Eichelsdorf, Hofheim in Unterfranken; federführend DRV Nordbayern.",
      "Kinderhaus mit Betreuung durch Erzieherinnen und Heilpädagogik; schulpflichtige Kinder können die Schule in Hofheim besuchen.",
      "Spezialisierung auf Doppeldiagnosen (Psychose/Sucht, Depression/Sucht, Persönlichkeitsstörung/Sucht).",
      "Wohnerprobungsgruppen (Männer- und Frauen-WGs) im Haus."
    ],
    "kontraindikationen": [
      "Akute Suizidalität; akute oder nicht ausreichend medikamentös stabilisierte Psychosen.",
      "Schwere körperliche Erkrankungen; Anfallsleiden ohne ausreichende medikamentöse Einstellung.",
      "Starke Beeinträchtigung der Beweglichkeit (Schloss nur eingeschränkt barrierefrei).",
      "Beeinträchtigte Hirnleistung, z. B. Demenz oder schwere organische Psychosyndrome.",
      "Keine Aufnahme bei Gewalt-, Tötungs- und Sexualdelikten in der Vergangenheit.",
      "Reine Alkoholabhängigkeit als Hauptdiagnose in der Regel nicht."
    ]
  },
  "ck-eifelhoehe": {
    "alltag": [
      "Mahlzeiten im Speisesaal, nicht auf dem Zimmer.",
      "Therapien ab 8:00 Uhr über den Tag verteilt.",
      "Alkoholkontrollen; Klinik ist suchtmittelfreier Raum.",
      "Zimmer mit eigenem Bad, Dusche und WC; Einzel- oder Doppelzimmer.",
      "Kein Fernseher auf dem Zimmer; Aufenthaltsräume für Fernsehabende.",
      "Mahlzeiten im Speisesaal; vegetarische Speisen und Sonderkost nach Voranmeldung."
    ],
    "therapieHinweise": [
      "Spezielle Konzepte für Senioren, russischsprachige Rehabilitanden, Mehrfachrückfälle und Medikamentenabhängigkeit.",
      "VR-Therapie zu suchtbezogenen Auslösern.",
      "Nahtlosverfahren vom Entzug in die Entwöhnung.",
      "Eigene Bezugsgruppen für Medikamentenabhängigkeit, Seniorenbehandlung und russischsprachige Rehabilitanden.",
      "Nahtlosverfahren vom Entzug in die Entwöhnung öffentlich genannt.",
      "Psychische Begleiterkrankungen (unter anderem Depression, Angst, Traumafolgen) werden einbezogen."
    ],
    "factsExtra": [
      "Suchtmittelfreier Antritt; Entgiftung bei Bedarf im Akutkrankenhaus vorab zu planen.",
      "Russischsprachiges Behandlungsangebot öffentlich genannt.",
      "WLAN kostenfrei; kein Kühlschrank im Zimmer, Gemeinschaftskühlschränke nutzbar; abschließbares Fach im Zimmer.",
      "Haustiere sind aus hygienischen Gründen nicht gestattet.",
      "Patenschaftssystem: Rehabilitandinnen und Rehabilitanden helfen Neuankommenden bei der Orientierung.",
      "Deutsche Sprachkenntnisse werden in der russischsprachigen Bezugsgruppe nicht vorausgesetzt."
    ],
    "mitbehandlungHinweis": "Psychische Begleiterkrankungen (u. a. Depression, Angst, PTBS, chronischer Schmerz) psychotherapeutisch und ggf. psychopharmakologisch mitbehandelt. Dialysepflichtige Rehabilitanden mit Abhängigkeitserkrankung können aufgenommen werden.",
    "sozialdienstLeistungen": [
      "Antrag in der Regel gemeinsam mit Suchtberatungsstelle, Fachambulanz oder Kliniksozialdienst.",
      "Russischsprachige Bezugsgruppe mit migrationsspezifischer Sozialberatung und begleitendem Deutschkurs."
    ],
    "wahlleistungenHinweis": "Behandlung in der Regel beihilfefähig; Beihilfeabrechnung vor Ort. Privatversicherte nach Kostenzusage bzw. Anzahlung."
  },
  "ck-eifelklinik": {
    "kontraindikationen": [
      "Schwere Störungen im Sozialverhalten; dissoziale Persönlichkeitsstörungen.",
      "Manifeste Suizidalität, akute Psychosen.",
      "Abhängigkeitserkrankungen ohne stabile Abstinenz; Demenzen.",
      "BMI unter 16,5 kg/m², über 45 kg/m² oder Gewicht über 150 kg bei Aufnahme.",
      "Unzureichende Sprachkenntnisse, unter 18 Jahren, Rollstuhlpflicht oder Bettlägerigkeit."
    ],
    "alltag": [
      "Kostenloser WLAN-Hotspot.",
      "Telefon 1 Euro Grundgebühr pro Tag zuzüglich Gesprächseinheiten; 10 Euro Pfand für die Telefonkarte.",
      "Waschmaschine und Trockner kostenpflichtig.",
      "Aufnahme von Begleitpersonen nicht möglich.",
      "205 Einzelzimmer, teilweise mit Balkon oder Terrasse; kein Anspruch auf eine bestimmte Zimmerausstattung.",
      "Ganztägig ambulante Reha: Anwesenheit nur wochentags während der Therapiezeiten, mittags Speisesaal; Anreise mit eigenem PKW, Fahrzeit maximal eine Stunde."
    ],
    "therapieHinweise": [
      "Spezialbehandlungspfad Traumafolgestörungen für Frauen; Post-COVID.",
      "Basisprogramm: integrative Gruppenpsychotherapie, Einzelpsychotherapie, Abteilungsvollversammlung, Pflegegruppe, Entspannung, Gesundheitsschulung.",
      "Sport- und Bewegungstherapie mit MTT zweimal wöchentlich plus Wahl aus Rückfit, Aquafit, Spielen, Walking oder Nordic Walking.",
      "Achtsamkeitsbasierte Bewegung (Yoga, Feldenkrais, QiGong, Tai Chi, Atemtherapie); einmal wöchentlich Aquamassage.",
      "Behandlungspfade Depression, Angst und chronischer Schmerz zusätzlich zum Basisprogramm."
    ],
    "wahlleistungenHinweis": "Zusätzliche Leistungen (Telefon, Wäsche) selbst zu zahlen. Gesetzliche Zuzahlung nach DRV-Regeln.",
    "sozialdienstLeistungen": [
      "Sozialberatung zu beruflichen und sozialen Fragen; Schwerpunkt stufenweise Wiedereingliederung mit Einbezug des Arbeitgebers.",
      "Koordination WeB-Reha mit Betriebsärztinnen und Betriebsärzten sowie der DRV.",
      "MBOR: Informationsveranstaltungen, Einzelberatung, ergotherapeutische Angebote, ggf. psychotherapeutische Mobbing-Gruppe.",
      "Offene Sprechstunden der Sozialberatung; Anmeldung über die Bezugstherapie."
    ],
    "factsExtra": [
      "Stationäre und ganztägig ambulante Rehabilitation; ganztägig ambulant in der Regel 25 Behandlungseinheiten.",
      "Beihilfefähigkeit laut Klinikseite gegeben."
    ]
  },
  "ck-elbingerode": {
    "alltag": [
      "Zimmer mit Nasszelle, mehrheitlich Zweibett; rund 15 % Einzelzimmer, behindertengerecht konzipiert.",
      "Strukturierter Tages- und Wochenplan in überschaubaren Gruppen.",
      "Besuch sonntags (therapiefreier Tag); Telefonkontakt über das Zimmertelefon in der therapiefreien Zeit.",
      "Aufnahmestation in der ersten Woche mit Diagnostik und intensiverer Betreuung körperlich schwerer geschädigter Patientinnen und Patienten.",
      "Bei Ankunft Atemalkoholtest und ggf. Drogenscreening; Facharzt entscheidet über Reha-Aufnahme oder Vorbehandlung im Akutbereich.",
      "Erste Woche auf der Aufnahmestation mit Diagnostik, Information und Zuordnung zur Bezugsgruppe."
    ],
    "sozialdienstLeistungen": [
      "Beratung und Unterstützung bei sozialen Folgen der Abhängigkeit, auch für Angehörige",
      "Kontakt zu Rentenversicherung, Krankenkassen, Sozialämtern, Gerichten, Eingliederungshilfe, Beratungsstellen und Selbsthilfe",
      "Korrespondenz mit inhaftierten Rehabilitationsanwärtern und Unterstützung in juristischen Belangen",
      "Einleitung in die Schuldnerberatung bei Bedarf",
      "Vorbereitung der Nachsorge gemeinsam mit der Gruppentherapie",
      "Beratung zu Rentenversicherung, Krankenkassen, Sozialämtern, Gerichten, Eingliederungshilfe und Selbsthilfe."
    ],
    "therapieHinweise": [
      "Regeldauer Alkohol/Medikamente 13 Wochen, Drogen 22 Wochen; Kurzzeit 8 Wochen bei Indikation.",
      "Einzel- und Gruppengespräche, Ergo- und Kreativtherapie, Arbeitstherapie (Schlosserei, Schreinerei, Gärtnerei, PC, Cafeteria), Sport, Entspannung, Selbstsicherheitstraining.",
      "Psychotherapeutische Grundlage psychoanalytisch-interaktionell (Heigl-Evers) und Selbstmanagement (Kanfer).",
      "Qualifizierte Entgiftung in Innerer Medizin und Psychiatrie im selben Haus, nahtloser Übergang in die Reha möglich.",
      "Psychoanalytisch-interaktionell und Selbstmanagement; PMR im Konzept als verpflichtendes Entspannungsverfahren.",
      "Indikativ u. a. Drogengruppe, Tabakentwöhnung (Rauchfrei-Konzept), Medikamente, Glücksspiel, DBT-Skills, Trauma-Imagination."
    ],
    "factsExtra": [
      "140 stationäre Reha-Plätze; 120 Plätze in fünf Stationen zu je 24, plus Aufnahmestation und flexible Einheit.",
      "Qualifizierte Entgiftung in Innerer Medizin und Psychiatrie im selben Gebäudekomplex.",
      "Klinikseite fachklinik-elbingerode.de war nicht erreichbar; Angaben aus Trägerseite und Therapiekonzept 2026.",
      "140 stationäre Reha-Plätze; Bettenverhältnis Alkohol/Medikamente zu illegalen Drogen etwa 60 zu 40.",
      "Hundezwinger in Kliniknähe mit begrenzter Platzzahl ausgewiesen.",
      "Klinikseite fachklinik-elbingerode.de war nicht erreichbar; Angaben aus Träger-Therapiekonzept 2026 (Diako Harz)."
    ],
    "mitbehandlungHinweis": "Suchtfolgeerkrankungen und Komorbiditäten mit Innerer Medizin und Psychiatrie des Diakonie-Krankenhauses. Aufnahmestation kann körperlich schwerer geschädigte Patientinnen und Patienten intensiver betreuen, zum Teil pflegen.",
    "kontraindikationen": [
      "Akute Psychosen, akute Suizidalität bzw. Eigengefährdung sowie infektiöse Erkrankungen für die Entwöhnung zunächst Kontraindikationen.",
      "Aufnahme in die Reha in der Regel nach vorangegangener Entgiftung; das Aufnahmefacharztgespräch entscheidet über Vorbehandlung im Akutbereich.",
      "Akute Psychosen, akute Suizidalität und Eigengefährdung sowie infektiöse Erkrankungen sind für die Entwöhnung zunächst Kontraindikationen.",
      "Aufnahme in die Reha nur nach vorangegangener Entgiftung; bei Bedarf entscheidet das Aufnahmefacharztgespräch über Vorbehandlung im Akutbereich."
    ]
  },
  "ck-elbmarsch": {
    "kontraindikationen": [
      "Heroin i.v. nicht im Suchtangebot der Frauenklinik.",
      "Aufnahme nur im körperlich entgifteten Zustand bzw. nach mindestens zweiwöchiger Suchtmittelabstinenz."
    ],
    "alltag": [
      "33 Frauen ohne Begleitkind in Einzelzimmern.",
      "12 Mütter mit Kindern in 2-Raum-Appartements.",
      "Vegane Ernährung wird nicht angeboten.",
      "50 Einzelzimmer für Frauen ohne Begleitkind.",
      "21 Mutter-Kind-Plätze in Zwei-Raum-Appartements.",
      "Zimmer mit Duschbad, Minisafe, Kühlschrank, Telefon, TV und WLAN."
    ],
    "therapieHinweise": [
      "Frauenspezifische Entwöhnung bei Alkohol, Medikamenten und illegalen Drogen (außer Heroin i.v.).",
      "Pathologisches Glücksspielen und pathologischer Mediengebrauch im Suchtangebot.",
      "Schwangere Frauen im Aufnahmeangebot.",
      "Sucht: Medikamente, Alkohol und illegale Drogen außer Heroin i. v.; Psychosomatik im selben Haus.",
      "Indikationsgruppen u. a. Trauma und Sucht, DBT-S, Angst- und Depressionsbewältigung, mütterspezifisch Starke Mütter.",
      "Indikationsgruppen unter anderem Trauma und Sucht, DBT-S, Angst- und Depressionsbewältigung."
    ],
    "factsExtra": [
      "Kinderbetreuung ab der 9. Lebenswoche bis Ende Grundschule (max. 12 Jahre).",
      "Paartherapie in Kooperation der Fachkliniken Sucht und Psychosomatik ausgewiesen.",
      "Nur Frauen ab 18 Jahren. Begleitkinder vom Ende der Schutzfrist bis Ende Grundschulalter.",
      "Schwangere können in Kooperation mit gynäkologischen Praxen in Hürth aufgenommen werden.",
      "Zwei Drittel der Plätze Sucht, ein Drittel Psychosomatik.",
      "Kinderbetreuung ab der 9. Lebenswoche bis Ende Grundschule."
    ],
    "sozialdienstLeistungen": [
      "Kinderhaus mit Fachpersonal; interne Beschulung nach Aufgabenplan der entsendenden Schule.",
      "Offene Info-Abende: Sucht am 1., 3. und 5. Montag, Psychosomatik am 2. und 4. Montag, jeweils 18:00 Uhr (außer Feiertage), mit Klinikführung.",
      "Kontakt zu einer Suchtberatungsstelle vor Aufnahme wird empfohlen."
    ],
    "mitbehandlungHinweis": "Psychiatrische Komorbiditäten (u. a. Persönlichkeitsstörungen, affektive Störungen, Traumafolgestörungen, Essstörungen, Angststörungen, ADHS) werden im frauenspezifischen Konzept mitberücksichtigt. Paargespräche; Fortführung in einem Paarzimmer je nach therapeutischer Entwicklung möglich."
  },
  "ck-erlengrund": {
    "alltag": [
      "54 Einzel- und sechs Doppelzimmer, alle mit eigenem Bad; zwei rollstuhlgerechte Einzelzimmer; Klinik barrierefrei.",
      "Eigene Küche: max. dreimal pro Woche Fleisch, sonst Fisch oder vegetarisch/vegan.",
      "Cafeteria; Sport-, Freizeit- und Entspannungsangebote.",
      "54 Einzel- und sechs Doppelzimmer mit eigenem Bad; zwei rollstuhlgerecht; Klinik barrierefrei; Abholung vom nahen Bahnhof.",
      "Vollverpflegung aus der klinikeigenen Küche mit DGE-Siegel Station Ernährung; vegetarisch und vegan im Speiseplan.",
      "Eigene Frauengruppe mit getrenntem Wohn- und Therapiebereich."
    ],
    "sozialdienstLeistungen": [
      "Sozialdienst unter dem Gesichtspunkt Hilfe zur Selbsthilfe.",
      "Organisation nachfolgender Hilfen.",
      "Schuldnerberatung in Kooperation mit der Schuldnerberatung Uslar.",
      "Sozialdienst unter dem Aspekt Hilfe zur Selbsthilfe; Organisation der Anschlusshilfe.",
      "BORA: Gruppen Rückkehr an den Arbeitsplatz bzw. Arbeitsmarkt, Praktika, Bewerbungstraining, Arbeitgebergespräche.",
      "Kooperation mit Bildungswerk der Niedersächsischen Wirtschaft, regionalen Jobcentern und DRV-Rehabilitationsberatung."
    ],
    "therapieHinweise": [
      "NADA-Akupunktur; WorkPark-Therapie; BORA-Gruppen Rückkehr an den Arbeitsplatz bzw. Arbeitsmarkt.",
      "Frauengruppe, Kunst- und Ergotherapie, Seelsorge.",
      "Stoffungebundene Probleme (Glücksspiel, Medien) nur soweit die stoffgebundene Abhängigkeit im Vordergrund steht.",
      "Individueller Therapieplan nach medizinischer, psychiatrisch-psychologischer und sozialer Diagnostik.",
      "NADA-Akupunktur, Kunst- und Ergotherapie, therapeutisches Bogenschießen, barrierefreie Lehrküche, Raucherentwöhnung.",
      "WorkPark-Therapie; Physiotherapie inkl. Inhalation, Massage, Lymphdrainage und Lichttherapie."
    ],
    "factsExtra": [
      "DGE-Siegel Station Ernährung.",
      "Neuro-Enhancer im Indikationsspektrum, soweit stoffgebunden im Vordergrund.",
      "66 Behandlungsplätze.",
      "Entgiftung vorab nur, soweit notwendig; Aufnahmeweg über Beratungsstelle und Kostenzusage.",
      "Hauptbeleger Deutsche Rentenversicherung Braunschweig-Hannover; GSB-Siegel Reha.",
      "Illegale Drogen und polyvalenter Konsum im Angebot, Schwerpunkt bleibt Alkohol und Medikamente."
    ],
    "kontraindikationen": [
      "Akute Suizidalität und akute Psychose als Ausschlusskriterien ausgewiesen."
    ],
    "mitbehandlungHinweis": "Begleitende Depressionen, Angsterkrankungen, Erschöpfung, Persönlichkeitsstörungen und Traumafolgen werden mitbehandelt, sofern sie nicht eine andere Behandlungsform erfordern. Substanzungebundene Probleme (Glücksspiel, Medien), wenn die stoffgebundene Abhängigkeit im Vordergrund steht."
  },
  "ck-eschenberg": {
    "alltag": [
      "Zimmer mit Dusche, WC, Telefon und Balkon; Allergikerzimmer möglich.",
      "Eigene Klinikküche öffentlich beschrieben.",
      "Überwiegend Einzelzimmer; kein Klinik-Fernseher, eigene Geräte bis 32 Zoll möglich.",
      "Haustelefon intern kostenfrei, externe Nutzung gegen Entgelt; Handy und Laptop auf dem Zimmer gestattet.",
      "Kostenfreies WLAN in den Klinikräumen.",
      "Besuch nach Absprache ab der zweiten Behandlungswoche, nur am Wochenende und an Feiertagen."
    ],
    "sozialdienstLeistungen": [
      "Ergo- und Arbeitstherapie mit sozialer Beratung, Bewerbungsunterlagen und Bewerbungsmappen.",
      "Beratung zu Wohnungslosigkeit, beruflichen Angelegenheiten, Bewerbung und Vorstellungsgesprächen.",
      "Reha-Beratung zu beruflichen Fördermaßnahmen; Beratung durch eine ortsansässige Mitarbeiterin des Jobcenters.",
      "Schuldnerberatung und Hilfe bei finanziellen Fragen.",
      "Informationsveranstaltungen zur ambulanten und stationären Nachsorge; gemeinsame Antragstellung bei den Leistungsträgern."
    ],
    "therapieHinweise": [
      "Schwerpunktgruppen u. a. Sucht und Psychosomatik, 20+, Senioren, Frauen, berufliche Rehabilitation.",
      "Pathologisches Spielen und Medienabhängigkeit als Begleiterkrankungen mitbehandelt.",
      "Teilnahme an Informationsveranstaltungen verschiedener Selbsthilfegruppen ist Bestandteil der Behandlung.",
      "Küche: Vollkost, vegetarisch, leichte Vollkost, muslimische Kost; Diät nach ärztlicher Verordnung; vegane Kost nicht möglich.",
      "Behandlungsdauer je nach Kostenzusage und Vorbehandlung zwischen sechs und 26 Wochen.",
      "In der Regel abgeschlossene Entzugsbehandlung; bei Cannabiskonsum Nachweis sinkender Werte."
    ],
    "factsExtra": [
      "115 Therapieplätze laut Klinikseite.",
      "Entwöhnung idealerweise im Anschluss an körperliche Entzugsbehandlung.",
      "Anreise bis 11 Uhr erbeten.",
      "Handtücher und Bettwäsche werden gestellt; Waschmaschinen und Trockner mit Münzeinwurf.",
      "Klinikbesichtigung nur clean und trocken nach Voranmeldung.",
      "Patienten-App der Fuest-Kliniken mit Checkliste und Therapieplan."
    ],
    "mitbehandlungHinweis": "Psychosomatische Fachklinik für Abhängigkeitserkrankungen; psychische Begleiterkrankungen im Konzept.",
    "kontraindikationen": [
      "Vollständige soziale Desintegration, z. B. langjährige Obdachlosigkeit.",
      "Akut behandlungsbedürftige körperliche oder psychiatrische Erkrankungen, z. B. akute Suizidalität, floride Psychose oder akuter Herzinfarkt.",
      "Fortgeschrittenes hirnorganisches Psychosyndrom; körperliche Funktionseinschränkungen mit Pflegebedürftigkeit.",
      "Rollstuhlpflichtige Gehbehinderung; Klinik für Rollstuhlfahrende nicht geeignet.",
      "Ansteckende Krankheiten wie TBC.",
      "Fortbestehende Opiat-Substitution."
    ]
  },
  "ck-eschenburg": {
    "alltag": [
      "Barrierearme, vollausgestattete Zimmer.",
      "Besuche ab der dritten Therapiewoche außerhalb der Therapiezeiten und am Wochenende.",
      "WLAN kostenfrei; Cafeteria; Sauna nach ärztlicher Freigabe, nach Geschlechtern getrennt.",
      "Frühstück und Abendessen am Buffet, mittags Menüwahl.",
      "33 Zweibettzimmer und 18 Einzelzimmer; jede Therapiegruppe hat einen eigenen Gruppenraum (abends Aufenthalt).",
      "Kein Fernseher im Zimmer (Fernseher in den Gruppenräumen); keine eigenen Fernseher, Spielkonsolen oder DVD-Player."
    ],
    "therapieHinweise": [
      "Schwerpunkt Alkohol- und Medikamentenabhängigkeit; Adaption und ambulante Reha auf der Trägerseite genannt.",
      "Stationäre Entwöhnung, Adaption und ambulante Reha am Trägerverbund.",
      "Indikation öffentlich: Alkohol, Medikamente, Cannabis bei gleichzeitiger psychischer Störung sowie multiple Substanzen."
    ],
    "factsExtra": [
      "Abholung vom nächstgelegenen Bahnhof nach Absprache.",
      "Wassertretbecken und Sauna, kein eigenes Schwimmbad.",
      "Vor Therapiebeginn wird bei Alkohol eine stationäre Entgiftung dringend empfohlen.",
      "Fachambulanzen in Dillenburg, Wetzlar und Gießen für ambulante Therapie bzw. Nachsorge.",
      "Zusätzlich Adaptionseinrichtung und intensiv betreute Wohngemeinschaften am Trägerverbund.",
      "Aufnahme: stationäre Entgiftung oder hausärztliche Bescheinigung, dass sie derzeit nicht nötig ist; Entgiftungsbescheinigung mitbringen."
    ],
    "wahlleistungenHinweis": "Zimmergröße 12–33 m²; Unterbringung in Einzel- oder Mehrbettzimmer nach medizinischer oder psychologischer Indikation. Keine Kinderunterbringung im Haus.",
    "kontraindikationen": [
      "Keine Aufnahme bei akuten Erkrankungen, dauerhafter Bettlägerigkeit, Pflegebedürftigkeit oder Infektionskrankheit laut AVB."
    ],
    "sozialdienstLeistungen": [
      "Hilfe bei finanziellen Engpässen; abschließbares Post- und Wertfach.",
      "Unterstützung bei der Beantragung der Kostenzusage; nahtlose Übernahme aus kooperierenden Entgiftungskliniken."
    ]
  },
  "ck-eusserthal": {
    "alltag": [
      "Alle Rehabilitandinnen und Rehabilitanden haben Einzelzimmer in einer festen Wohngruppe, höchstens 12 Personen.",
      "Zimmer mit Dusche, Toilette, Telefon und Radio.",
      "Wohngruppe mit Aufenthaltsraum, Küchenzeile, Waschmaschine, Trockner und Gruppentherapieraum.",
      "Frauen können in einer beschützten Frauengruppe untergebracht werden.",
      "Klinikbereiche barrierefrei und über Aufzüge zugänglich. Freies WLAN im Café.",
      "Alle Patientenzimmer sind Einzelzimmer; Wohngruppen mit Aufenthaltsraum, Küche und Gruppentherapieraum."
    ],
    "sozialdienstLeistungen": [
      "Zusammenarbeit mit Suchtberatungsstellen; Sozialbericht der Beratungsstelle neben dem ärztlichen Befundbericht."
    ],
    "therapieHinweise": [
      "Lehrküche, Kreativräume, Sport- und Freizeitangebote im Haus.",
      "Arbeitstherapie unter anderem im Garten.",
      "DRV-eigene Fachklinik für Alkohol-, Medikamenten- und Drogenabhängigkeit.",
      "Stationäre Reha, kombinierte Reha sowie Reha mit Praktikum (integrierte Adaption).",
      "Arbeitstherapie u. a. in der Gärtnerei; Lehrküche mit gemeinsamem Kochen."
    ],
    "factsExtra": [
      "Kapelle und Pfälzerwald-Lage.",
      "Keine Kontaktsperre; Angehörigenbesuche sind vorgesehen.",
      "Klinik der DRV Rheinland-Pfalz in Klosterlage im Pfälzerwald.",
      "Kapelle mit Gottesdienstangebot; Minigolf am Klinikeingang.",
      "Abholung vom Bahnhof Annweiler nach Voranmeldung."
    ],
    "kontraindikationen": [
      "Organische psychische Störungen (F0), beispielsweise Demenz.",
      "Akute oder instabile Psychosen (F20 ff und F3); stabile psychopharmakologische Einstellung vor Reha-Beginn.",
      "Ausschließliche Drogenabhängigkeit (F11–F16, F18) oder Polytoxikomanie ohne Hauptdiagnose Alkohol- bzw. Medikamentenabhängigkeit.",
      "Intelligenzminderung wesentlichen Ausmaßes; aktuelle oder drohende Selbst- oder Fremdgefährdung.",
      "Adipositas oder Übergewicht wegen Stoffwechselstörung über 150 kg.",
      "Aufnahme über §§ 35/36 BtMG; somatische oder psychische Störungen, die die Rehabilitationsfähigkeit wesentlich beeinträchtigen."
    ],
    "mitbehandlungHinweis": "Körperliche und seelische Folge- und Begleiterkrankungen (u. a. affektive Störungen, neurotische und somatoforme Störungen, Persönlichkeitsstörungen, Adipositas bis 150 kg), sofern sie primär psychologisch-psychotherapeutisch behandelbar sind und keine engmaschige psychiatrische Betreuung erfordern."
  },
  "ck-eusserthal-landau": {
    "alltag": [
      "10 Therapieplätze in der Außenwohngruppe Landau, Xylanderstraße 3.",
      "Ziel der 12 Wochen: Wohnung und Alltag organisieren, arbeiten, Freizeit gestalten und unter Alltagsbedingungen abstinent bleiben.",
      "12 Wochen Außenwohngruppe Landau unter realen Alltagsbedingungen mit Selbstversorgung.",
      "Zehnwöchiges Pflichtpraktikum an vier Wochentagen; Freitage für Arztbesuche, Erledigungen oder Fahrten nach Eußerthal.",
      "Ähnlich eingerichtete Zimmer in der Wohngruppe Xylanderstraße."
    ],
    "sozialdienstLeistungen": [
      "Sozialrechtliche Beratung und Beratung zur Teilhabe am Arbeitsleben in der Adaptionsphase.",
      "Einleitung spezieller Nachsorgeangebote sowie Kontaktgespräche mit Vor- und Nachbehandlern.",
      "Bilanzierungsgespräche beim externen Praktikum; Computer-Training, Bewerbertraining und Internet-Recherche nach Stellenangeboten.",
      "Bewerbertraining und Beratung zu Praktikum in der Vorbereitungsgruppe in Eußerthal.",
      "Therapeutische Begleitung beim Aufbau von Wohnung, Alltag, Arbeit und sozialen Kontakten."
    ],
    "therapieHinweise": [
      "Besonders bei Arbeitslosigkeit, Wohnungslosigkeit, belastenden Schulden oder einem Umfeld, das die Abstinenz nicht stützt.",
      "In der Regel für BORA-Zielgruppe 4; in begründeten Einzelfällen auch Gruppen 2, 3 und 5.",
      "Integrierte Adaption nur im Anschluss an die stationäre Reha in der Fachklinik Eußerthal; Entscheidung über die Bezugstherapie.",
      "Vorbereitungsgruppe in der Klinik vor dem Wechsel nach Landau."
    ],
    "factsExtra": [
      "Kooperation mit über 80 Betrieben.",
      "Patientenaufnahme der Fachklinik Mo–Fr 8–16 Uhr unter 06345 20-0."
    ]
  },
  "ck-fachklinik-meckenheim": {
    "kontraindikationen": [
      "Männerklinik: Aufnahme für drogen-, alkohol- und medikamentenabhängige Männer.",
      "E-Zigaretten im Haus nicht erlaubt.",
      "Keine Aufnahme bei akuter Intoxikation oder akutem, medizinisch behandlungsbedürftigem Entzugssyndrom.",
      "Keine Aufnahme bei akuten psychiatrischen Krankheitsstadien, insbesondere bei Eigen- oder Fremdgefährdung.",
      "Hirnorganische Beeinträchtigungen sowie mittelgradige bis schwere Intelligenzminderung.",
      "Körperliche Erkrankungen mit akutmedizinischer Behandlungsbedürftigkeit oder längerfristiger Einschränkung der Therapeutenteilnahme, z. B. Blindheit oder Taubheit."
    ],
    "alltag": [
      "Einzel- und Doppelzimmer mit Dusche/WC, teils barrierefrei.",
      "Kostenfreier Internetzugang (WLAN).",
      "Pate aus der Rehabilitandenschaft zum Einleben.",
      "Laptop, Handy, Musikanlage und Fahrrad dürfen mitgebracht werden.",
      "Arbeits-, Sport- und wetterfeste Kleidung zur Aufnahme vorgesehen.",
      "Hauswirtschaftliche Versorgung unter Anleitung selbst durchgeführt."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung im Behandlungsprogramm genannt."
    ],
    "therapieHinweise": [
      "Arbeits-/Ergotherapie in Schreinerei sowie Garten- und Landschaftsbau.",
      "Schwerpunkte Cannabis/Amphetamin, Opioide, Alkohol/Medikamente, Traumafolgen, drogeninduzierte Psychose/Schizophrenie, ADHS im Erwachsenenalter.",
      "Behandlungsdauer öffentlich bis zu 26 Wochen bei Drogenabhängigkeit, bis zu 16 Wochen bei Alkohol- bzw. Medikamentenabhängigkeit.",
      "Rückfallbehandlung öffentlich bis zu 13 bzw. 8 Wochen.",
      "Nur Männer; stationär und ganztägig ambulant.",
      "Spezifische Module u. a. zu Cannabis/Amphetamin, Opioiden, Alkohol/Medikamenten, Traumafolgestörungen, drogeninduzierter Psychose und ADHS im Erwachsenenalter."
    ],
    "factsExtra": [
      "Teilqualifikationen und Lehrküche öffentlich genannt.",
      "Seite „Wen können wir nicht behandeln“ ist im Menü ausgewiesen.",
      "Federführend DRV Rheinland; Behandlungsvertrag nach § 21 SGB IX.",
      "Sport: klinikeigener Fitnessraum, Beachvolleyball, angrenzendes Sportzentrum mit Schwimmhalle, Wald Kottenforst."
    ]
  },
  "ck-fehmarn": {
    "alltag": [
      "Drei Häuser mit 19 Einzelzimmern und zwei Doppelzimmern, eigene Nasszelle; je Haus Gruppenraum mit Fernseher, ein Einzelzimmer barrierefrei.",
      "Grillplatz, Sportwiese mit Volleyballfeld und kleiner Gemüsegarten auf dem Gelände.",
      "Christlich geprägte stationäre Reha in Dänschendorf auf Fehmarn.",
      "Nüchtern und drogenfrei zur Aufnahme; keine Substanzen im Urin, kein Alkohol im Blut."
    ],
    "sozialdienstLeistungen": [
      "Begleitende Sozialarbeit zu Schulden, Lebensunterhalt, Gericht, Behörden, beruflichen Perspektiven, Wohnung und Nachsorge.",
      "Anerkennung nach §§ 35/36 BtMG (Therapie statt Strafe).",
      "Private Haftpflichtversicherung ist Aufnahmevoraussetzung."
    ],
    "mitbehandlungHinweis": "Komorbide schwere psychische Erkrankungen und psychotische Begleit- und Folgeleiden werden mitbehandelt; fachärztliche neurologisch-psychiatrische und hausärztliche Versorgung im Haus. Hepatitis C und HIV in Kooperation mit dem UKSH Lübeck; bei Doppeldiagnose regelmäßige Einzelgespräche mit der ärztlichen Leitung.",
    "kontraindikationen": [
      "Akute, vorübergehende Suizidalität.",
      "Schwere psychotische Zustände, die nicht auf Neuroleptika ansprechen.",
      "Schwere körperliche oder orthopädische Erkrankungen, die zuerst akutmedizinisch behandelt werden müssen.",
      "Aufnahme nur für drogenabhängige Männer ab 18 bis zum vollendeten 45. Lebensjahr laut Träger.",
      "Substitution vor Aufnahme beendet."
    ],
    "therapieHinweise": [
      "Bereits begonnene ADHS-Behandlung kann fortgeführt werden; Neueinstellung erfolgt nicht."
    ],
    "factsExtra": [
      "IK 510 100 966; 36 Plätze laut therapieplaetze.de.",
      "Stationäre Entgiftung unmittelbar vor Beginn wird empfohlen, öffentlich nicht als Pflichtnachweis formuliert."
    ]
  },
  "ck-fischer-haus": {
    "kontraindikationen": [
      "Akute unbehandelte psychotische Episoden; akute Selbst- oder Fremdgefährdung.",
      "Schwere körperliche oder kognitive Funktionseinschränkungen, die eine aktive Therapieteilnahme stark beeinträchtigen.",
      "Hanglage ohne vollständige Barrierefreiheit; Rollstuhlfahrende nur eingeschränkt versorgbar."
    ],
    "alltag": [
      "In der Regel Einzelzimmer; fünf von außen begehbare Zimmer mit eingezäuntem Außenbereich für den eigenen Hund.",
      "Bezugsgruppen mit höchstens 12 Rehabilitanden; Gruppentherapie im Co-System (zwei Suchttherapeutinnen bzw. -therapeuten).",
      "Pate am Aufnahmetag: ein therapieälterer Mitrehabilitand als erste Ansprechperson.",
      "Bei Aufnahme Atemalkoholwert 0,00 Promille; eigener Hund oder eigene Katze nach Konzept möglich."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung zu Finanzen, Wohnen, justiziellen Fragen und Schwerbehindertenrecht; Schuldenregulierung.",
      "Interne und externe Arbeitstherapie inkl. Arbeitserprobung in kooperierenden Betrieben.",
      "Anschluss: betreutes Wohnen in Rastatt sowie Step by Step und BEAS zur beruflichen Integration (BEAS für Versicherte der DRV Baden-Württemberg)."
    ],
    "therapieHinweise": [
      "Schwerpunkt: alkohol- und medikamentenabhängige Männer mit fortgeschrittenem Suchtverlauf; Glücksspiel als Begleitproblematik möglich.",
      "Regelbehandlung 13 Wochen; Kombibehandlung stationär-ambulant oder stationär-tagesklinisch mit 8 Wochen stationär; Kurzzeit 8 Wochen.",
      "Reittherapie und Walkinggruppe; tiergestützte Angebote.",
      "Doppeldiagnosen (u. a. Psychose, Lernbehinderung, körperliche Folgeerkrankungen) und kognitive Einschränkungen im Konzept genannt."
    ],
    "factsExtra": [
      "55 Behandlungsplätze in mehreren Gebäuden in Gaggenau-Michelbach.",
      "Zertifiziert nach DIN EN ISO 9001:2015 und deQus (Version 4.1), BAR-anerkannt.",
      "Vermittlung über Psychosoziale Beratungsstelle; Arzt- und Sozialbericht sowie Leistungsbescheid vor Aufnahme."
    ],
    "mitbehandlungHinweis": "Doppeldiagnosen und somatische Folgeerkrankungen sind konzeptionell vorgesehen; Medikamenteneinstellung bei der ärztlichen Aufnahme."
  },
  "ck-franziska": {
    "alltag": [
      "Einladende Einzelzimmer; Wohnzimmer der Stationen für Gespräche, Lesen und Spieleabende.",
      "Klinikpark rund 30.000 m² mit altem Baumbestand, Teich, Liegewiesen und Beachvolleyballfeld.",
      "Hallenbad, Sauna und große Gymnastikhalle; WLAN im Foyer.",
      "Ganztägige Betreuung mitreisender Kinder von einem halben Jahr bis 14 Jahre in der Kita „Sonnenschein“ (max. 20 Kinder).",
      "Besuche nur in therapiefreien Zeiten bis 22 Uhr; Übernachtung von Besuch nicht möglich.",
      "Kein eigenes Fernsehgerät im Zimmer; Fernseher in den Gruppenräumen."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung und Sozialtherapie im Reha-Programm.",
      "Psy-RENA-Nachsorge und Nachsorgegruppe im Haus; kurzzeitige ambulante Weiterbehandlung möglich."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutische und tiefenpsychologische Konzepte parallel.",
      "Gruppenpsychotherapie mit begleitenden Einzelgesprächen; Selbsthilfegruppen im Haus.",
      "Körper- und Bewegungstherapie, Gestaltungs-/Kunsttherapie, Ergotherapie und Arbeitserprobung.",
      "Konzentrationstraining, Entspannung, Ernährungsberatung, MTT, Krankengymnastik und balneophysikalische Therapie.",
      "Seelsorge und Gesundheitsbildung."
    ],
    "factsExtra": [
      "Selbsthilfefreundliche Rehabilitationsklinik in Rheinland-Pfalz laut Träger.",
      "Stationäre und ganztägig ambulante Reha sowie Reha-Nachsorge.",
      "Weiterbildungsstätte WePS, Lehrveranstaltungen von der Ärztekammer zertifiziert."
    ],
    "mitbehandlungHinweis": "Ärztliche Aufnahmeuntersuchung mit Anamnese, körperlicher Untersuchung, Labor und EKG; ggf. Langzeit-EKG, Langzeit-Blutdruck und Schlafapnoe-Diagnostik.",
    "wahlleistungenHinweis": "Waschmaschinen und Trockner gegen Entgelt (Marken an der Rezeption); Sauna gegen Gebühr; Fahrradverleih gegen Gebühr, Kinderfahrräder kostenlos. WLAN im Haus kostenlos."
  },
  "ck-fredeburg": {
    "alltag": [
      "Freundlich eingerichtete Einzelzimmer mit Dusche, WC, Telefon, oft Balkon; Fernseher mit Kabelanschluss mitzubringen.",
      "Eltern mit Kindern in Familienzimmern; Betreuung in der heilpädagogischen Kita während der Therapiezeiten.",
      "Mahlzeiten im Speisesaal; Cafeteria für Kleineinkäufe.",
      "Freizeit im Haus u. a. Fernsehräume, Kegelbahnen, Beachvolleyball, Grillplatz; Schwimmbad/Sauna in der Nachbarklinik.",
      "Überwiegend Einzelzimmer mit Dusche, WC, Telefon, oft Balkon; kostenfreies WLAN.",
      "Fernseher nicht gestellt; eigener Fernseher am Kabelanschluss möglich."
    ],
    "sozialdienstLeistungen": [
      "Klinische Sozialarbeit und Sozialtherapie mit beruflicher Beratung.",
      "Berufliche Belastungserprobung und EDV-Training / Projektarbeit zur Wiedereingliederung.",
      "Klinische Sozialarbeit und berufliche Beratung; Räume für Wiedereingliederung, EDV-Training und Projektarbeit.",
      "MBOR im Konzept, besondere Zielgruppe Pflegeberufe; Lehrküche für Ernährungs- und Kochkurse.",
      "Heilpädagogische Kindertagesstätte während der Therapiezeiten bei Begleitkindern.",
      "Räume für berufliche Wiedereingliederung, EDV-Training und Projektarbeit."
    ],
    "therapieHinweise": [
      "Interdisziplinär: Medizin, Psychotherapie, Kunst-/Ergotherapie, Soziotherapie, Ernährung, Physio- und Sporttherapie.",
      "Einzelpsychotherapie inkl. Traumatherapie (EMDR, psychodynamische Imaginationsverfahren) und verhaltenstherapeutische Einzeltherapie.",
      "Kinder bis 17 Jahre; Kita in Kleinkindergruppe 3–7 und Jugendgruppe 8–17, Kooperation mit örtlichen Schulen.",
      "Interdisziplinär Medizin, Psychotherapie, Kunst-/Ergotherapie, Soziotherapie, Ernährung, Physio- und Sporttherapie.",
      "Einzelpsychotherapie inkl. Traumatherapie (EMDR, psychodynamische Imagination) und verhaltenstherapeutische Einzeltherapie.",
      "Musiktherapie (u. a. Klangschalen) im Raum der Stille nach Absprache mit der Bezugstherapie."
    ],
    "factsExtra": [
      "Akademisches Lehrklinikum für Psychotherapie der Universität Münster.",
      "Cannabis-Konsum auf allen Betriebsgeländen der Johannesbad-Gruppe hausrechtlich untersagt.",
      "SauerlandCard zur Freizeitnutzung; Achtsamkeitspfad und E-Bike-Ladestation auf dem Gelände.",
      "SauerlandCard zur Freizeitnutzung; Achtsamkeitspfad und E-Bike-Stellplatz auf dem Gelände.",
      "Zimmerkontrollen in Einzelfällen durch Fachpersonal möglich.",
      "Nach Kostenzusage und Indikationsprüfung Aufnahmetermin und Unterlagen per Post."
    ],
    "wahlleistungenHinweis": "Belegung durch DRV, gesetzliche und private Krankenkassen, Beihilfe, gesetzliche Unfallversicherung und Selbstzahler. Versorgungsvertrag nach § 111 SGB V."
  },
  "ck-freiolsheim": {
    "alltag": [
      "Einzel- oder Doppelzimmer, größtenteils mit Dusche und WC; Ordnung im Zimmer in eigener Verantwortung.",
      "Verbindlicher monatlicher Vorgesprächstag mit Klinikrundgang (telefonisch bei JVA).",
      "Zimmerkaution 40 Euro bei Aufnahme genannt.",
      "Sechs Stationen für jeweils 9–12 Rehabilitandinnen und Rehabilitanden; je ein Wohnzimmer mit TV und Küchenzeile (Kühlschrank, Mikrowelle).",
      "Anreise bis 10:00 Uhr; private Fahrzeuge sind nicht gestattet; Tiere weder von Rehabilitandinnen/Rehabilitanden noch von Besuch.",
      "Mahlzeiten im Speisesaal mit Teilnahmepflicht; Trinkbrunnen im Speisesaal."
    ],
    "therapieHinweise": [
      "Kinderkontext-Station und Arbeit an psychischen Begleiterkrankungen (Depression, sozialbezogene Ängste, traumatische Erlebnisse) genannt.",
      "Regeldauer 16–26 Wochen, abhängig von Antrag, Leistungsträger und vereinbarter Behandlungsform.",
      "In der Regel drei bis vier Gruppengespräche pro Woche; indikative Gruppen u. a. Depression und Sucht, Impulskontrolltraining, Kriminalität und Sucht, emotionale Kompetenz, Tabakentwöhnung, Elterngruppe.",
      "Bei medikamentös behandeltem ADHS vor Aufnahme Kontakt mit den Fachärztinnen für Psychiatrie und Psychotherapie zur Klärung der Medikation.",
      "Anerkennung nach § 35 BtMG; direkte Aufnahme mit Justizauflage oder aus der JVA möglich.",
      "Psychische Begleiterkrankungen werden diagnostisch mitbehandelt."
    ],
    "factsExtra": [
      "Anerkennung nach § 35 BtMG; direkte Aufnahme mit Justizauflage oder aus der JVA möglich.",
      "Nahtloser Übergang nach qualifizierter Entgiftung als optimale Voraussetzung; Abweichung nach Rücksprache mit der Leitung.",
      "Keine Dolmetscherinnen oder Dolmetscher im Haus.",
      "Gehbehinderung und Rollstuhl nach vorheriger Absprache je nach Schwere ggf. möglich.",
      "Zertifizierung DIN EN ISO 9001:2015 und deQus; Reha-Qualitätssicherung der DRV.",
      "Physiotherapie im Rahmen der Suchtrehabilitation."
    ],
    "mitbehandlungHinweis": "Psychische Begleiterkrankungen und suchtbezogene soziale Schwierigkeiten werden im Konzept mitbearbeitet.",
    "sozialdienstLeistungen": [
      "Sozialdienst zur sozialen Wiedereingliederung; PC-Schulungsraum für Bewerbungstraining und Testdiagnostik.",
      "Regelmäßige Treffen mit Mitgliedern von Selbsthilfegruppen in der Klinik."
    ]
  },
  "ck-friedrichshof": {
    "alltag": [
      "Feste Tagespläne; Arbeitstherapie in Gärtnerei, Geländepflege, Schreinerei, Hauswirtschaft oder Küche.",
      "Sport u. a. Fitnessstudio, Volleyball, Tischtennis, Fußball, Klettern, Schwimmen.",
      "Haustiere, insbesondere Hunde, können unter genannten Voraussetzungen mitgebracht werden.",
      "Leben in Wohngruppen; Zimmer einzeln oder zu zweit, Sanitäranlagen in der Regel auf dem Stockwerk.",
      "Haus für Patientinnen und Patienten bis maximal 130 kg eingerichtet.",
      "Haustiere, insbesondere Hunde, unter bestimmten Voraussetzungen nach Rücksprache mit der Aufnahme möglich."
    ],
    "therapieHinweise": [
      "Behandlung bei Mehrfachdiagnosen (Depression, Glücksspiel, ADHS, Trauma, ggf. Psychose) genannt.",
      "Spezielle Gruppe für junge Erwachsene; ärztliche Sprechstunde, Rückenschule, Nichtrauchertraining, Qigong.",
      "Aufnahme von Paaren und Schwangeren; Begleitkinder im integrierten Eltern-Kind-Konzept.",
      "Anerkannte Behandlung nach §§ 35 und 36 BtMG.",
      "Nahtlosverfahren Qualifizierter Entzug/Suchtrehabilitation; kurzfristig verfügbare Plätze aus dem qualifizierten Entzug.",
      "Spezialgruppe pathologisches Glücksspiel; Gruppe für junge Erwachsene."
    ],
    "factsExtra": [
      "5 Wohngruppen, 60 stationäre Plätze, 3 Standorte betreutes Wohnen laut Trägerseite.",
      "Bewerbungsbogen und Therapiekonzept als Download.",
      "Paaraufnahme in Erfahrungsberichten der Klinikseite genannt.",
      "Umzug in die bwlv Fachklinik Rhein-Neckar in Wiesloch zum 20.10.2026 geplant; bis dahin Betrieb in Obersulm wie gewohnt.",
      "Drei Phasen: stationäre Reha, Adaption, betreutes Wohnen als Nachsorge (auch für Bewerberinnen und Bewerber anderer Kliniken).",
      "Nachsorgehäuser in Weinsberg und Heilbronn-Neckargartach."
    ],
    "mitbehandlungHinweis": "Körperliche und seelische Begleiterkrankungen werden mitbehandelt.",
    "kontraindikationen": [
      "Keine Aufnahme bei andauernder akuter psychotischer Symptomatik oder akuter Suizidalität.",
      "Keine Aufnahme von Rollstuhlfahrenden oder erheblich Gehbehinderten; Haus nicht barrierefrei und nicht rollstuhlgeeignet.",
      "Keine Aufnahme bei Blindheit oder Intelligenzminderung ohne Therapiefähigkeit.",
      "Keine Aufnahme nach Verurteilung wegen Mordes oder Gewalt gegenüber Frauen oder Kindern (Kindeswohl bei Begleitkindern)."
    ],
    "sozialdienstLeistungen": [
      "Beratung zu Schulden, Behördenangelegenheiten und Wohnungssuche.",
      "Beratung bei MPU."
    ]
  },
  "ck-friedrichshof-adaption": {
    "sozialdienstLeistungen": [
      "Praktika, Bewerbungshilfe und Begleitung erster beruflicher Erfahrungen in der Adaptionsphase.",
      "Maßnahmen zur konkreten beruflichen und sozialen Integration.",
      "Bewerbung und Beantragung der Adaption werden im Verlauf der Intensivphase eingeleitet."
    ],
    "factsExtra": [
      "Besichtigung der Einrichtung im Vorfeld nach Terminvereinbarung mit dem Aufnahmesekretariat möglich.",
      "Eigener Standort im Ortsteil Affaltrach, getrennt von der Fachklinik am Sommerrainweg.",
      "Anschluss an die Intensivtherapie Friedrichshof; drei Phasen inkl. Betreutes Wohnen/Nachsorge in der Region."
    ],
    "alltag": [
      "13 Adaptionsplätze mit eigenständigen Wohn- und Funktionsräumen in Obersulm-Affaltrach.",
      "Phase der Öffnung nach außen: Alltag, Freizeit, Tagesorganisation und Kontaktpflege unter realen Bedingungen."
    ],
    "therapieHinweise": [
      "Regelbehandlungszeit 12 Wochen (Kurzzeit/Wiederholung) bzw. 16 Wochen (Mittel-/Langzeit) laut Trägerkonzept.",
      "Interne Adaption; Aufnahme auch nach Entwöhnung in anderen Kliniken möglich.",
      "Nachtklinik im Einzelfall an die Struktur der Adaptionsphase angebunden."
    ]
  },
  "ck-fuerstenwald": {
    "alltag": [
      "Administrative Aufnahme an der Information, anschließend Zimmerübergabe durch die Pflege; ärztliches Aufnahmegespräch am ersten Tag.",
      "Behandlungsältere Person als Patin bzw. Pate in den ersten Tagen.",
      "Individuelle Wochenpläne; Teilnahme an Therapien und Mahlzeiten ist verbindlich.",
      "Freizeit u. a. Sport, Lesen, Spazierengehen; Entspannungsräume zur Selbstanwendung."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei Wohnsituation, beruflicher Neuorientierung und Schuldenregulierung.",
      "Stufenweise Wiedereingliederung; Bewerbungstraining und Konfliktlösung am Arbeitsplatz.",
      "Regelmäßige Angehörigenseminare."
    ],
    "therapieHinweise": [
      "Ergotherapie und Arbeitstherapie als besonderer Schwerpunkt.",
      "Kombitherapie: stationär, anschließend ambulante medizinische Rehabilitation in der Suchtberatungsstelle.",
      "Indikationsgruppen u. a. Selbstsicherheit, Depression, Hirnleistung, Glücksspiel, Entspannung, Raucherentwöhnung, Bewerbung sowie Finanz- und Haushaltstraining.",
      "Therapie bei Drogenabhängigkeit nur, wenn der Schwerpunkt auf Alkohol- oder Medikamentenentzug liegt.",
      "Depressionsgruppe tiefenpsychologisch bei Doppeldiagnose Sucht und Depression; eigene Glücksspielgruppe.",
      "Stationäre Langzeitentwöhnung bei Alkohol-, Medikamenten- und Mehrfachabhängigkeit."
    ],
    "factsExtra": [
      "Hephata Diakonie, DeQus.",
      "Kita auf dem Gelände laut Trägerseite."
    ]
  },
  "ck-furth": {
    "kontraindikationen": [
      "Akute und chronische psychotische Prozesse; manifeste Suizidalität; fremdgefährdendes Verhalten.",
      "Schwere Adipositas (Körpergewicht über 150 kg).",
      "Einmalige oder wiederholte Auffälligkeiten bei Gewaltdelikten.",
      "Illegale Drogen (Opium, Morphium, Heroin, Amphetamine/Ecstasy, Kokain) ohne die genannten Cannabis-Ausnahmen.",
      "Haus ungeeignet für Betroffene aus dem Drogenmilieu; nur Erwachsene.",
      "Akute und chronische psychotische Prozesse, manifeste Suizidalität, fremdgefährdendes Verhalten."
    ],
    "alltag": [
      "Kraftfahrzeuge während des Aufenthalts nicht mitbringen; keine Klinikparkplätze.",
      "Medikamente bei Aufnahme auf Station abgeben.",
      "Drei Wohnhäuser mit Wohngruppenkonzept: jede Gruppe eigener Flur mit Büro der Bezugstherapie sowie Gruppen- und Aufenthaltsraum.",
      "Einzel- und Doppelzimmer mit Dusche, WC und Telefon; zwei rollstuhlgerechte Zimmer, Rollstuhllift im Schwimmbad. Medizinische Aufnahmestation mit 12 Plätzen.",
      "Eigene Wohnbereiche für Frauen- und Männertherapie. Kraftfahrzeuge während des Aufenthalts nicht mitbringen; Klinik stellt keine Parkplätze.",
      "Ausgang in der Regel ab der dritten Behandlungswoche. Besuchszeiten Fr 15:30–22:00 Uhr, Sa/So und Feiertage 8:45–22:00 Uhr; Erstbesucherinnen und Erstbesucher besuchen die 60-minütige Infoveranstaltung."
    ],
    "therapieHinweise": [
      "Cannabis als Haupt- oder Nebendiagnose möglich.",
      "Glücksspiel der Gruppen A bis D, mit oder ohne stoffgebundene Abhängigkeit.",
      "Frauenspezifische Behandlung mit Traumakonzept; Abteilung Doppeldiagnosen.",
      "Langzeitkonzept 15 Wochen, Auffang- und Festigung 8 Wochen; pathologisches Glücksspiel in der Regel 12 Wochen.",
      "Kombibehandlung: 8 Wochen stationär plus anschließende ambulante Versorgung in Absprache mit einer Ambulanz.",
      "Frauenspezifische Behandlung mit Traumakonzept; eigene Abteilung Doppeldiagnosen in gemischtgeschlechtlichen Gruppen."
    ],
    "factsExtra": [
      "Stationäre Entgiftung meist nicht nötig; Aufnahme ohne Abstinenz nach Rücksprache möglich.",
      "Fahrdienst aus dem Krankenhaus Bad Kötzting nach abgeschlossener Entgiftung.",
      "Behandlung beihilfefähig; Selbstzahler möglich.",
      "Qualifizierte Entzugsbehandlung bei Alkohol etwa ein bis eineinhalb Wochen vor Aufnahme empfohlen; Fahrdienst vom Krankenhaus Bad Kötzting nach der Entgiftung.",
      "Stationäre Entgiftung bei Cannabis meist nicht nötig; Aufnahme nach Rücksprache auch ohne vollständige Abstinenz möglich.",
      "Alkohol, nicht verordnete Medikamente, Cannabis und Cannabinoide während des Aufenthalts untersagt. Beihilfefähig; Selbstzahler möglich."
    ],
    "wahlleistungenHinweis": "Beihilfefähig nach den Beihilfevorschriften des Bundes und der Länder. Selbstzahlerinnen und Selbstzahler werden aufgenommen. Federführender Kostenträger: DRV Bayern-Süd.",
    "mitbehandlungHinweis": "Substitutionsbehandlung nur, wenn sie langfristig etabliert ist und eine weitere Abhängigkeit (Alkohol, Medikamente oder Cannabis) die Indikation trägt."
  },
  "ck-gelderland": {
    "alltag": [
      "Beurlaubung während der Rehabilitation in der Regel nicht möglich.",
      "Parkplätze auf dem Gesundheitscampus gegen Gebühr; Rehabilitanden 1 €/Tag.",
      "Patin bzw. Pate aus der Rehabilitandenschaft zum Ankommen.",
      "Handtücher (ein Handtuch und ein Badelaken) werden gestellt; Wechsel dienstags und freitags bei Ablage im Waschbecken bis 08:00 Uhr.",
      "Bettwäsche 14-tägig dienstags; Waschmaschinen gegen Gebühr.",
      "Am Abreisetag Zimmer bis 08:00 Uhr räumen; Zimmerschlüssel, Cafeteria-Ausweis und TV-Fernbedienung bis 08:15 Uhr in der Verwaltung."
    ],
    "sozialdienstLeistungen": [
      "MBOR bei besonderer beruflicher Problemlage; Zuordnung über Fragebogen Schule und Beruf bzw. Anmeldung der Rentenversicherung.",
      "Reisekostenerstattung nach Regeln des Kostenträgers, Auszahlung zu den Kassenzeiten in der Verwaltung."
    ],
    "therapieHinweise": [
      "Basis-Module: Einzel- und Gruppenpsychotherapie, Körper- und Bewegungstherapie, Kreativtherapie, Sozialberatung, Gesundheitswissen, sportliche Aktivierung, naturheilkundliche Anwendungen und Entspannungsverfahren.",
      "Therapiebegleithund Frida in Einzelgesprächen, Gruppenpsychotherapie und Skillsgruppe, sofern keine Kontraindikation (z. B. Hundephobie, Infektion, Tierhaarallergie).",
      "Reha-Ziele in den ersten Tagen anhand des Fragebogens „Meine Reha-Ziele in der psychosomatischen Rehabilitation“ mit Bezugsärztin bzw. Bezugsarzt und Bezugstherapie konkretisieren."
    ],
    "factsExtra": [
      "Einrichtung der cusanus trägergesellschaft trier mbH.",
      "Nachsorge Psy-RENA als ambulante Gruppentherapie (auch als Online-Angebot LIVI-Rena) über die Rentenversicherung."
    ]
  },
  "ck-germerode": {
    "alltag": [
      "Wochentherapieplan, Hausordnung und Checkliste zur Aufnahme als Download.",
      "Eigene Küche und Ernährungsberatung im Team.",
      "Zimmer inkl. Nasszelle mit Notrufanlage; Zimmer werden nicht abgeschlossen.",
      "Eigener Fernseher bis 24 Zoll möglich.",
      "E-Zigaretten bzw. Verdampfer, Wasserkocher, Energydrinks und Mate-Tee laut Checkliste nicht mitbringen.",
      "Patin bzw. Pate aus der Therapiegruppe am Aufnahmetag."
    ],
    "therapieHinweise": [
      "Mitbehandlung u. a. Persönlichkeitsstörungen, psychotische, posttraumatische und neurotisch-psychosomatische Störungen, Borderline- und Essstörungen.",
      "Kurzzeittherapie und individuelle Lösungen bis 24 Wochen im Einzelfall genannt.",
      "Aufnahme von Paaren; gemeinsames Zimmer oder getrennte Zimmer nach Absprache.",
      "Begleitkinder bis zum 12. Lebensjahr; kindgerechte Zimmer, Spielzimmer und Außenspielbereich.",
      "Tiefenpsychologisch und systemisch ausgerichtete Gruppen; indikative Gruppen u. a. Frauen, Männer, Eltern, Paare, Psychose und Raucherentwöhnung.",
      "Adaption in Großburschla (Therapiephase II); kostenfreies Probewohnen dort möglich."
    ],
    "factsExtra": [
      "Aufnahme von Frauen und Männern (auch Paare) ab 18 sowie Begleitkinder bis 12 Jahre.",
      "Zugehörige Adaption Großburschla ist ein anderes Haus.",
      "Zertifizierung deQus genannt.",
      "Aufnahme mit gerichtlicher Auflage nach §§ 35, 36 BtMG öffentlich genannt.",
      "Hauptbeleger DRV Bund; auch regionale Rentenversicherer, Krankenkassen und Sozialhilfeträger.",
      "Zertifizierung nach deQus."
    ],
    "kontraindikationen": [
      "Aufnahmevoraussetzung laut Konzept: persönliche Therapiebereitschaft, abgeschlossene körperliche Entzugsbehandlung und gültige Kostenzusage.",
      "Aufnahme ab Volljährigkeit."
    ],
    "sozialdienstLeistungen": [
      "BORA-Eingruppierung vor Aufnahme anhand der Bewerbungsunterlagen (i. d. R. Lebenslauf, beruflicher Werdegang, Sozialbericht und ärztliche Befunde).",
      "Unterstützung bei Ämtern, Krankenkassen, Gerichten, Jugendämtern und Schuldenregulierung.",
      "Bewerbungstraining und Vorbereitung der nachstationären Zeit."
    ],
    "mitbehandlungHinweis": "Doppeldiagnosen nach abgeschlossener akuter Phase, u. a. Psychose, Persönlichkeitsstörungen und Essstörungen, werden mitbehandelt."
  },
  "ck-glotterbad": {
    "kontraindikationen": [
      "Bei Traumafolgestörungen: Abhängigkeitserkrankung, akute Suizidalität oder akute Psychose im Vordergrund (laut Klinikkonzept)."
    ],
    "alltag": [
      "Belegung in Einzelzimmern mit Dusche/WC, teilweise mit Balkon; Doppelzimmer für Paare nach Absprache.",
      "Rund 170 Zimmer; Schwimmbad, Saunalandschaft und Sportangebote auch bei schlechtem Wetter im Freien.",
      "WLAN nur in der Lounge (kostenpflichtig), nicht auf den Zimmern.",
      "Waschmaschine und Trockner gegen Gebühr; Haustiere nicht möglich, Assistenzhund grundsätzlich nach Voranmeldung.",
      "Konus-Karte für den ÖPNV im Großraum Südbaden über die Rezeption.",
      "Frühstück und Abendessen als Buffet, Mittagessen wählbar; Unverträglichkeiten per Formular vorab mitteilen."
    ],
    "therapieHinweise": [
      "Multimodale integrative Gruppen- und Einzelpsychotherapie.",
      "Körperpsychotherapie, Musiktherapie, Kunst-/Gestaltungstherapie und Ergotherapie.",
      "DBT-zertifizierte Behandlungseinheit für Borderline-Störungen (Dachverband DBT).",
      "Anerkannte Behandlungsstätte für Psychotraumafolgestörungen (DABT).",
      "Modellklinik der Thure-von-Uexküll-Akademie für Integrierte Medizin; Standort der Konflikthotline Baden-Württemberg."
    ],
    "factsExtra": [
      "Versorgungsvertrag nach § 111 SGB V; Vorsorge- und Rehabilitationseinrichtung nach § 107 Abs. 2 SGB V.",
      "DGE-Zertifizierung Station Ernährung; Mitglied im Netzwerk Rehabilitation bei Fibromyalgie."
    ],
    "wahlleistungenHinweis": "Parkplatz in der Tiefgarage gegen Gebühr (nach Verfügbarkeit); Internetzugang in der Lounge kostenpflichtig.",
    "mitbehandlungHinweis": "Fachklinik für Psychosomatik, psychotherapeutische und innere Medizin; Nahrungsergänzungsmittel und bestimmte Vitaminpräparate werden nicht über die Klinik verordnet.",
    "sozialdienstLeistungen": [
      "Sozialrechtliche Beratung zu Krankengeld, Übergangsgeld, ALG, Rente und Schwerbehindertenrecht.",
      "Gruppe Sozialrecht und Beruf sowie Gruppe berufliche Neuorientierung bzw. Bewerbungstraining.",
      "MBOR, Berufscoaching, Belastungserprobung und stufenweise Wiedereingliederung.",
      "Vermittlung von Selbsthilfe, ambulanter Nachsorge und häuslicher Versorgung."
    ]
  },
  "ck-goehren": {
    "alltag": [
      "Ausschließlich Einzelzimmer (16–20 m²) mit Bad (Dusche/WC), Balkon oder Terrasse, Telefon, Fernseher und Notrufanlage.",
      "Kostenfreies WLAN im gesamten Haus; Waschmaschinen und Trockner gegen Entgelt.",
      "Meerwasser-Schwimmbad und Sauna; Strandzugang wenige Gehminuten entfernt.",
      "Haustiere nicht möglich; Rauchen nur am ausgewiesenen Platz am Patientenparkplatz.",
      "Medizinisch notwendige Begleitpersonen nach Absprache in Zimmern mit Verbindungstür; Kinder als Begleitung nicht vorgesehen.",
      "Aufnahmeuntersuchung am Anreisetag, Therapien in der Regel ab dem Folgetag."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung zu Wiedereingliederung, sozialrechtlichen Fragen, Verschuldung und familiärem Umfeld."
    ],
    "therapieHinweise": [
      "Fachabteilungen Orthopädie, verhaltensmedizinisch orientierte Rehabilitation und Psychosomatik.",
      "Psychosomatik: Psychoedukation, Einzel- und Gesprächsgruppenpsychotherapie, indikative Gruppen, Training sozialer Kompetenz.",
      "Entspannung: progressive Muskelentspannung, Qigong, autogenes Training; dazu Ergo-, Bewegungs- und Sporttherapie.",
      "Lehrküche und Ernährungsberatung im Programm."
    ],
    "factsExtra": [
      "Träger Deutsche Rentenversicherung Mitteldeutschland; Lage Südstrand 6 im Ostseebad Göhren auf Rügen.",
      "78 Einzelzimmer in der psychosomatischen Abteilung; rollstuhlgerechte und allergenarme Zimmer genannt.",
      "Bustransfer ins Ostseebad Göhren mit Kurkarte kostenlos."
    ],
    "wahlleistungenHinweis": "Fahrradverleih laut Klinikseite 4 Euro für einen halben Tag, 6 Euro für einen ganzen Tag; Waschmaschinen und Trockner gegen Entgelt."
  },
  "ck-grafrath": {
    "kontraindikationen": [
      "Geeignet für Männer im Alter von 18 bis 50 Jahren.",
      "Keine Aufnahme bei akuter Psychose, akuter Suizidalität oder Pflegebedürftigkeit."
    ],
    "sozialdienstLeistungen": [
      "Schuldenregulierung anhand mitgebrachter Unterlagen (Mahnbescheide, Verträge, Kontoauszüge, SCHUFA).",
      "Berufliche Integration und Bewerbungstraining.",
      "Schuldnerberatung.",
      "Wiederherstellung des Krankenversicherungsschutzes; Regelung von Finanzen und Schriftverkehr mit Behörden."
    ],
    "therapieHinweise": [
      "Regeldauer etwa 22 Wochen bei Drogen, 13–15 Wochen bei Alkohol oder Medikamenten; Verlängerung oder Verkürzung nach Absprache.",
      "Männer im Alter von 18 bis 50 Jahren.",
      "Schwerpunkt Doppeldiagnosen bei ausreichender Stabilität und Therapiefähigkeit.",
      "Verstärkte Ausrichtung auf Sport, Erlebnispädagogik und kreative Entfaltung.",
      "Aufnahme mit Therapieauflage nach § 35 BtMG möglich."
    ],
    "factsExtra": [
      "Anerkennung nach § 35 BtMG.",
      "Regelmäßiger Kontakt mit dem Aufnahmebüro zur Planung erwünscht.",
      "Besichtigungstermin möglich.",
      "Abholservice nach Absprache; Anreise ohne Auto möglich (S-Bahn aus München).",
      "Auffang- bzw. Festigungsbehandlung für ehemalige Rehabilitanden bei erneuter Gefährdung oder kurzem Rückfall.",
      "Fitnessraum und großzügiges Gelände mit Garten."
    ],
    "mitbehandlungHinweis": "Bei ausreichender Stabilität Mitbehandlung von Depression, Angst/Zwang, Persönlichkeitsstörungen, Essstörungen, Traumafolgen, Psychosen und pathologischem Glücksspiel.",
    "alltag": [
      "Helle Zweibettzimmer mit Bett, Schrank, Schreibtisch und eigenem Bad; Einzelzimmer bei entsprechender Indikation.",
      "Kostenloses WLAN; Smartphone, Laptop und Tablet außerhalb der Behandlungszeiten.",
      "Keine Haustiere; keine Anreise mit eigenem Auto.",
      "Keine Besuche in der Klinik; Treffen außerhalb in den Ausgangszeiten möglich.",
      "In den ersten Tagen Ausgang nur in Begleitung."
    ]
  },
  "ck-greifswald": {
    "alltag": [
      "40 Einzelzimmer, davon zwei rollstuhlgerecht; Dusche, WC, TV, Telefon, WLAN und Notruf.",
      "Lehrküche, Fitnessraum, Cafeteria, PC-Raum, Kreativraum; Gemeinschaftsräume mit Pantryküche.",
      "Gelände mit Volleyballfeld, Tischtennis, Kneipp-Garten; Besichtigung vorab nach Terminvereinbarung.",
      "Haustiere nicht möglich."
    ],
    "sozialdienstLeistungen": [
      "Sozialarbeit im therapeutischen Angebot; Beratung zur Berufsklärung und Einleitung berufsfördernder Maßnahmen.",
      "Antragstellung in der Regel über die Suchtberatungsstelle; Nachsorge in den Beratungsstellen der Stiftung möglich."
    ],
    "therapieHinweise": [
      "Pragmatisch verhaltenstherapeutisch: Problemlösetherapie und kognitive Umstrukturierung; Selbstmanagementtherapie.",
      "Auffang- und Festigungsbehandlungen; Familien- und Paargespräche, Angehörigenseminar, Vorstellung regionaler Selbsthilfegruppen.",
      "Stationäre medizinische Rehabilitation bei Alkohol- und Medikamentenabhängigkeit."
    ],
    "factsExtra": [
      "Neubau am Hauptstandort Gützkower Landstraße seit Herbst 2024, zuvor Fachklinik Gristower Wiek.",
      "Qualifizierter Entzug bei medizinischer Notwendigkeit im Evangelischen Krankenhaus Bethanien am selben Träger.",
      "Neubau 2024, zuvor Fachklinik Gristower Wiek.",
      "Hauptbeleger DRV Nord; QMS Reha."
    ]
  },
  "ck-groenenbach": {
    "kontraindikationen": [
      "Akute psychische Krisen mit Selbst- oder Fremdgefährdung",
      "Suchterkrankungen ohne ausreichende Abstinenzfähigkeit",
      "Psychotische und manische Störungen",
      "Klinisch manifeste Anorexia nervosa sowie BMI unter 17,5",
      "Körpergewicht ab 150 kg",
      "Orientierungsstörungen (z. B. Demenz) und ausgeprägte körperliche Erkrankungen ohne Therapiefähigkeit"
    ],
    "alltag": [
      "Standardmäßig Einzelzimmer; wenige Doppelzimmer für Partner oder Begleitperson nach Verfügbarkeit.",
      "Heimfahrten und Außenübernachtungen nur in Notfällen nach Rücksprache mit dem Arzt.",
      "Bewegungsbad vorhanden; WLAN kostenfrei; Haustiere nicht möglich.",
      "Begleitperson in der Psychosomatik erst vor Ort mit dem Arzt klärbar; Übernachtung einmalig außerhalb der Therapiezeiten.",
      "Während der psychosomatischen Reha gilt eine Auflage zur Alkoholabstinenz.",
      "Rauchen nicht in Zimmern, auf Balkonen oder auf dem Klinikgelände; ausgewiesene Raucherpavillons im Außenbereich."
    ],
    "sozialdienstLeistungen": [
      "Sozialrechtliche Beratung im psychosomatischen Therapieangebot.",
      "Arbeits- und berufsbezogene Angebote."
    ],
    "therapieHinweise": [
      "Einzel- und Gruppenpsychotherapie; Skills-Training; Angstbewältigungsgruppe.",
      "Entspannung vor allem progressive Muskelrelaxation; achtsamkeits- und körpertherapeutische Verfahren.",
      "Ergotherapie, Sport- und Bewegungstherapie, Nordic Walking, medizinisches Gerätetraining.",
      "Ernährungsberatung, Lehrküche und Diabetesberatung; Gesundheitsseminare."
    ],
    "factsExtra": [
      "174 Plätze Somatik und 104 Plätze Psychosomatik am Standort Bad Grönenbach.",
      "Neben Psychosomatik Abteilungen für Hören/Tinnitus/Schwindel, Orthopädie und Kardiologie.",
      "Psychosomatik in Haus B (Speisesaal und Therapieräume) und Haus C; MBOR-Bereich in Haus Z.",
      "Bademäntel gegen Gebühr an der Rezeption; Waschmaschinen, Trockner und Bügeleisen im Untergeschoss gegen Gebühr."
    ],
    "wahlleistungenHinweis": "Medienpaket mit Fernseh- und Telefonnutzung; Parkplatz kostenpflichtig, WLAN kostenfrei.",
    "mitbehandlungHinweis": "Keine medikamentöse Erst- oder Neueinstellung bei ADHS; schwere Symptomatik ggf. zuerst in Akutpsychosomatik oder Psychiatrie."
  },
  "ck-grossburschla": {
    "mitbehandlungHinweis": "Abhängigkeitserkrankte mit Doppeldiagnose (nicht akute Psychose) sowie Paare; Begleitkinder von 1 bis 12 Jahren, Kindergarten oder Schule vor Ort.",
    "kontraindikationen": [
      "Akute Psychose oder anzunehmende Selbst- oder Fremdgefährdung.",
      "Pflegebedürftigkeit bzw. vorrangig akutmedizinische Behandlung.",
      "Fortgeschrittene Leistungsminderung (Demenz, hirnorganisches Psychosyndrom).",
      "Mittelschwere und schwere körperliche sowie geistige Behinderungen."
    ],
    "alltag": [
      "Appartements mit Küche und Bad (1- bis 3-Zimmer); barrierefreies Bad im Erdgeschoss.",
      "Waschküche mit Waschmaschine und Trockner; Hausschluss in Selbstorganisation.",
      "Haushaltsgeld wöchentlich zur eigenständigen Haushaltsführung."
    ],
    "sozialdienstLeistungen": [
      "Vorbereitung von Ämtergängen, Agentur für Arbeit, Sozialamt und Schuldnerberatung.",
      "Unterstützung bei Bewerbungsunterlagen und Maßnahmen zur Teilhabe.",
      "Begleitete Praktika; Ergotherapie sucht den Praktikumsplatz auf."
    ],
    "therapieHinweise": [
      "Anschluss an Fachklinik Haus Germerode; Gruppen- und Einzelgespräche verbindlich.",
      "Paargespräche möglich; Paare können gemeinsames oder getrenntes Apartment wählen.",
      "Doppeldiagnose (nicht akute Psychose) im Adaptionsrahmen möglich."
    ],
    "factsExtra": [
      "Maximal 7 Plätze; 2–3 Tage kostenfreies Probewohnen laut Konzept.",
      "Aufnahme von Frauen und Männern, auch Paaren, sowie Begleitkindern bis 12 Jahre.",
      "Anerkennung nach §§ 35/36 BtMG."
    ]
  },
  "ck-haffkueste": {
    "alltag": [
      "Unterbringung in Einzelzimmern mit Nasszelle, TV und Telefon.",
      "Doppelzimmer für Begleitperson in begrenzter Zahl.",
      "Zimmergröße 14,5–25 m²; Wertschließfach im Zimmer.",
      "245 Einzelzimmer und zehn Doppelzimmer, darunter zwei Appartements.",
      "Unterbringung in Einzelzimmern mit WC, Dusche, Telefon, TV und Wertschließfach.",
      "Doppelzimmer bzw. Zustellbett für eine Begleitperson nach Verfügbarkeit."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung zu Nachsorge und Teilhabe am Arbeitsleben.",
      "Beratung zu beruflicher Belastungserprobung und Rückkehr an den Arbeitsplatz.",
      "Sozialpädagogische Beratung zu Krankheitsverarbeitung, Stressbewältigung und Rückkehr in Alltag und Beruf.",
      "AHB-Formalitäten übernimmt in der Regel der Sozialdienst des vorbehandelnden Krankenhauses."
    ],
    "therapieHinweise": [
      "PTBS nur Typ-I-Trauma; Persönlichkeitsstörungen nur wenn rehafähig.",
      "Klimatherapie und Bewegungstherapie fest im Therapieplan.",
      "Indikativgruppen u. a. Long-Covid, Trauer, PTBS, Arbeitsplatzkonflikte; Gartentherapie.",
      "Medizinisch-beruflich orientierte Rehabilitation (MBOR, Stufe B) mit Computerarbeitsplätzen möglich.",
      "Gartentherapie, Brandungsinhalation und digitale Nachsorge MyMEDIAN@Home ausgewiesen."
    ],
    "factsExtra": [
      "Post-Covid-Reha in Pulmologie und Psychosomatik.",
      "WLAN im ganzen Haus.",
      "Aufnahme von Kindern als Begleitung nicht möglich.",
      "Kinder als Patientinnen und Patienten ab 6 Jahren im Einzelfall nach Abstimmung mit dem Kostenträger ausgewiesen."
    ],
    "wahlleistungenHinweis": "Chefarztbehandlung sowie vier höherwertige Wahlleistungszimmer mit Meerblick — nicht für Rehabilitanden der Deutschen Rentenversicherung.",
    "mitbehandlungHinweis": "Zusätzliche Atemwegserkrankungen werden von der Abteilung Pulmologie konsiliarisch mitbehandelt."
  },
  "ck-hainberg": {
    "alltag": [
      "Einzelzimmer modern eingerichtet, standardmäßig mit Telefon.",
      "Foyer mit Empfang und angrenzender Cafeteria als Treffpunkt.",
      "Klinikseelsorge ist ausgewiesen.",
      "Einzelzimmer, modern eingerichtet, standardmäßig mit Telefon.",
      "Schwimmbad, Sauna, Billard- und Tischtennisraum, Kreativwerkstatt, Liegewiese sowie Lese- und Ruheraum.",
      "Cafeteria am Foyer; Speisen auf individuelle Bedürfnisse abgestimmt."
    ],
    "sozialdienstLeistungen": [
      "Sozialtherapeutische Beratung bei schwierigen Arbeitsplatzbedingungen, ggf. Kontakt zum Arbeitgeber",
      "Vermittlung von Leistungen zur Teilhabe am Arbeitsleben mit dem Reha-Fachberater der DRV Bund",
      "Organisation externer Belastungserprobung in Bad Hersfelder Betrieben",
      "Beratung zur wirtschaftlichen Absicherung und Vermittlung professioneller Schuldnerberatung",
      "Nachsorgeplanung (stufenweise Wiedereingliederung, IRENA/Curriculum Hannover, Selbsthilfe, ambulante Richtlinien-Psychotherapie), Schwerbehindertenrecht und Agentur für Arbeit",
      "Externe berufsorientierte Belastungserprobung in Abstimmung mit dem Sozialdienst, in Kooperation mit ortsansässigen Betrieben."
    ],
    "therapieHinweise": [
      "Schwerpunkte neurologische und internistische Psychosomatik sowie klinische Psychotherapie.",
      "Verfahren u. a. psychodynamische Psychotherapie und Verhaltenstherapie; Abteilungen auch für höheres Lebensalter.",
      "Künstlerische Therapien, Ergotherapie, Sport, Physio, Entspannung und Körperwahrnehmung, Rehabilitationspflege.",
      "Abteilung Verhaltenstherapie: integratives kognitiv-behaviorales Konzept mit verhaltensanalytischem Therapieplan.",
      "Angebote unter anderem Angstbewältigung mit Exposition, Depressionsgruppe, Biofeedback, Kunsttherapie, arbeitsweltbezogene Problemlösegruppe.",
      "EDV-Arbeitstherapie als Übungsbüro, Belastungstraining in Blöcken; Arbeitstherapie Handwerk."
    ],
    "factsExtra": [
      "Akademisches Lehrkrankenhaus der Justus-Liebig-Universität Gießen.",
      "Träger Klinikum Bad Hersfeld-Gruppe.",
      "Am Standort zusätzlich Akutpsychosomatik (Klinik für Psychosomatische Medizin und Psychotherapie) per Krankenhauseinweisung.",
      "Psychosomatische Institutsambulanz (PSIA) seit 1. Juli 2026.",
      "Versorgungsvertrag nach § 111 SGB V; Belegung durch Rentenversicherung, gesetzliche und private Kassen, Unfallversicherung, Beihilfe und Selbstzahlende.",
      "Akademisches Lehrkrankenhaus der Justus-Liebig-Universität Gießen; Träger Klinikum Bad Hersfeld-Gruppe."
    ],
    "wahlleistungenHinweis": "Belegung durch Rentenversicherungen, gesetzliche und private Krankenkassen, Unfallversicherungen und Beihilfen. Versorgungsvertrag nach § 111 SGB V.",
    "mitbehandlungHinweis": "Weitergehende Funktionsdiagnostik in Kooperation mit dem Klinikum Bad Hersfeld. Rehabilitationspflege übernimmt Mitbehandlung somatischer Begleiterkrankungen (Wund- und Stomaversorgung, Schmerzmanagement, Medikamentenausgabe)."
  },
  "ck-hambuehren": {
    "kontraindikationen": [
      "Akute psychiatrische Krisen (u. a. Störungen aus dem schizophrenen Formenkreis, akute Suizidalität, schwere hirnorganische Störungen, Pflegebedürftigkeit).",
      "Unter 18 Jahren; Hauptdiagnose Drogenabhängigkeit; aktuelle Substitutionsbehandlung.",
      "Unbefristete Erwerbsunfähigkeitsrente ohne berufliche Perspektive; Altersruhegeldempfängerinnen und -empfänger.",
      "Im Vordergrund stehender akutmedizinischer Behandlungsbedarf.",
      "Massiv eingeschränkte Mobilität mit erheblicher Pflegebedürftigkeit (z. B. Polyneuropathie, Ataxie).",
      "Dauerhafte Beeinträchtigungen, die eine komplette Teilnahme an BORA-Maßnahmen unmöglich machen."
    ],
    "alltag": [
      "Sieben Einzelzimmer mit eigener Nasszelle, 15–20 m², mit Bett, Schrank, Schreibplatz und Sessel.",
      "Große Küche sowie Aufenthalts- und Essraum; zusätzliche Räume für Fernsehen und PC-Nutzung.",
      "Sieben Plätze, gemeinsames Wohnen, Kochen und Essen.",
      "Tagesrhythmus mit interner/externer Arbeit, Gesundheitstraining, Gruppen- und Einzelgesprächen.",
      "Heimfahrten nur im Rahmen von Belastungserprobungen.",
      "Aufnahme mit Begleittier möglich; 3 Zimmer dafür, Einzelfallprüfung (u. a. Hunde ab 62 cm Schulterhöhe bzw. gelistete Rassen ungeeignet)."
    ],
    "factsExtra": [
      "Federführender Leistungsträger: DRV Braunschweig-Hannover.",
      "Ambulantes Vorgespräch mit Hausbesichtigung vor Adaptionsbeginn vorgesehen.",
      "Aufnahme nach internem interdisziplinärem Fallgespräch anhand Arztbericht, Sozialbericht und Reha-Bericht der Fachklinik.",
      "Nahtloser Anschluss an Entwöhnung in anerkannter Fachklinik.",
      "Zertifizierung im QM der Haus Niedersachsen gGmbH, Teilnahme am externen Qualitätsprogramm der DRV.",
      "Bewerbungsbogen Adaption und Fragebogen Begleittiere als PDF."
    ],
    "sozialdienstLeistungen": [
      "Berufliche Inventur, Praktikumsanbahnung, soziale Wiedereingliederung.",
      "Alltagstraining: Haushaltsführung, Schulden, Behördengänge.",
      "Vermittlung an Reha-Fachberater:innen in der Region Celle/Wolfsburg."
    ],
    "therapieHinweise": [
      "Arbeitstherapie in Metall-, Holz- und Fahrradwerkstatt, Haustechnik, Garten, Küche.",
      "Teilhabebezogene Ergo- und Arbeitstherapie, BORA-Ausrichtung.",
      "Systemische und familientherapeutische Zusatzqualifikation im Team."
    ]
  },
  "ck-hamburg-mitte": {
    "alltag": [
      "Persönliche Musik- und Fernsehgeräte nicht auf dem Zimmer; Fernseher in den Aufenthaltsräumen.",
      "Mitgebrachte Geräte u. a. Haartrockner, elektrische Zahnbürste, Handy-Netzteil, Rasierer und Notebooks erlaubt.",
      "Zwei Besucherzimmer für Angehörige in Haus B.",
      "Mahlzeiten der Entwöhnungsphase I in der Großküche unter Anleitung selbst zubereitet.",
      "Stammphase: voll möblierte Einzelzimmer mit Flur und Nasszelle.",
      "Erprobungs- und Adaptionsphase: Einzelzimmer mit Nasszelle und Pantryküche."
    ],
    "therapieHinweise": [
      "Tandem-Bezugstherapeutensystem aus Psychotherapie und sozialpädagogischer Beratung.",
      "Aufnahmephase von etwa zwei Wochen, anschließend Entwöhnungsphase I und II.",
      "Verhaltenstherapeutische Gruppenpsychotherapie im Co-Therapeuten-Setting, wöchentliche Einzelgespräche.",
      "Indikative Problemlösegruppen zu Impulskontrolle und Selbstbewusstsein; Tabakentwöhnung; Paartherapie.",
      "NADA-Akupunktur, Progressive Muskelentspannung, Sport-/Physiotherapie, Lehrküche."
    ],
    "factsExtra": [
      "Gebäudekomplex barrierefrei, Personenaufzüge.",
      "Ambulante Reha-Nachsorge der Fachklinik; für Hamburger Rehabilitandinnen und Rehabilitanden Betreutes Wohnen im eigenen Wohnraum.",
      "33 Plätze Entwöhnung, 11 Appartements Adaption, 18 Plätze Vor- und Nachsorge auf dem Gelände.",
      "Anerkennung nach §§ 35/36 BtMG.",
      "Substitutionsmittel können in der Entwöhnung ausgeschlichen werden; Abstinenzziel gilt auch für das Substitutionsmittel.",
      "Aufnahme auch als Paare und mit nicht schulpflichtigen Kindern."
    ],
    "kontraindikationen": [
      "Akute Suizidalität.",
      "Floride Psychose.",
      "Gravierende hirnorganische Schädigung.",
      "Intelligenzminderung mit gravierender Beeinträchtigung der Einsicht in die Abhängigkeit.",
      "Vorrangig akutmedizinischer Behandlungsbedarf."
    ],
    "sozialdienstLeistungen": [
      "Klinische Sozialarbeit zur beruflichen Wiedereingliederung.",
      "Vermittlung in Schuldnerberatung und Unterstützung bei eigenem Wohnraum.",
      "Nachbehandlungen und Anbindung an weiterführende Hilfen."
    ],
    "mitbehandlungHinweis": "Mitbehandlung psychischer Begleiterkrankungen (u. a. Persönlichkeitsstörungen, Angst, PTBS, Depression, Essstörungen, adulte ADHS) sowie körperlicher Folgeerkrankungen im Reha-Rahmen."
  },
  "ck-hardtwald-i": {
    "alltag": [
      "Besuchszeiten stationsabhängig (u. a. Station 3: 14:00–17:00 Uhr, Station 8: 15:00–17:00 Uhr).",
      "Besuchsverbot für Kinder bis 12 Jahre und Personen mit Infektsymptomen in der neurologischen Akutklinik und Phase B.",
      "Ausschließlich Einzelzimmer mit Dusche, WC, Fernseher, Radio und kleinem Tresor; einzelne Zimmer rollstuhlgerecht.",
      "Hauseigene Küche mit zwei Menüs, eines vegetarisch; medizinisch notwendige Kostformen nach ärztlicher Verordnung.",
      "WLAN kostenfrei im großen Aufenthaltsraum; kostenfreie Festnetztelefone; Waschmaschinen und Trockner zentral.",
      "Anreise: Anmeldung an der Rezeption, Therapieplan am Anreisetag oder Folgetag; Begrüßung dienstags abends auf Station, allgemeine Begrüßung mittwochs."
    ],
    "therapieHinweise": [
      "Abteilung für Psychiatrie und Psychosomatik: u. a. unipolare Depressionen, Persönlichkeitsstörungen, stabilisierende Traumafolgenbehandlung, Psychoseerfahrungen bei bipolaren Störungen und Störungen des schizophrenen Formenkreises.",
      "Neurologie mit neurologischer Psychosomatik und Schmerztherapie; Post-COVID.",
      "Parkinson-Reha für medizinisch stabile, ausreichend belastbare Patientinnen und Patienten, auch nach tiefer Hirnstimulation.",
      "Clusterkopfschmerz im neurologischen Spektrum der Klinik.",
      "Therapiegeräte u. a. MindMotion, CUREO und LYRA-Gangtrainer."
    ],
    "factsExtra": [
      "Fach- und Rehaklinik für Neurologie sowie Psychiatrie und Psychosomatik (VAMED/Wicker).",
      "Hauseigenes Schwimmbad nach ärztlicher Freigabe; Cafeteria und Kiosk mit alkoholfreien Getränken.",
      "Hauseigene Sternwarte; Parkanlage mit Minigolf, Boule und Liegewiese am Kurpark Bad Zwesten.",
      "Parkplätze am Haus begrenzt; Klinik auf Rollstuhlnutzung ausgerichtet (u. a. elektronische Türen, Aufzüge).",
      "Servicesprechstunde dienstags und donnerstags 10:00–11:00 Uhr in Raum 47 zu Unterbringung und Versorgung."
    ]
  },
  "ck-hardtwald-ii-psom": {
    "kontraindikationen": [
      "In der psychosomatischen Rehabilitation Ausnahme von Suchterkrankungen und Erkrankungen des schizophrenen Formenkreises."
    ],
    "therapieHinweise": [
      "Adipositas-Konzept für BMI über 30 kg/m² bis 190 kg Körpergewicht, auch mit psychischer Begleiterkrankung.",
      "Spezialkonzepte Schmerz und Medizinisch-beruflich-orientierte Rehabilitation (MBOR) neben dem Adipositas-Konzept.",
      "Kurse in der Lehrküche mit Diätassistenz."
    ],
    "factsExtra": [
      "Rehabilitationsabteilung und gesonderte Krankenhaus-/Akutabteilung am Standort.",
      "Fragebogen zur Vorbereitung der Reha vor Anreise ausfüllen und zur Aufnahmeuntersuchung mitbringen.",
      "Vorbefunde in Kopie mitbringen (u. a. Krankenhausentlassungsbericht, Labor nicht älter als ein Jahr, EKG/EEG/MRT/CT soweit vorhanden)."
    ],
    "wahlleistungenHinweis": "Beihilfefähig nach § 6 Abs. 1 und § 7 BhV Bund; anerkannte private Krankenanstalt nach § 30 GewO.",
    "alltag": [
      "Alle Zimmer Einzelzimmer mit kleinem Bad (Dusche/WC), Radio und Telefon.",
      "Anreise bis 11:00 Uhr; ärztliche Anreisevisite, anschließend individueller Therapieplan.",
      "Kostenfreies WLAN im Zimmer und in ausgewiesenen Foyer-Bereichen.",
      "Waschmaschinen und Trockner gegen Gebühr; Handtücher und Bettwäsche werden gestellt.",
      "Schwimmhalle auch außerhalb der Therapiezeiten nutzbar; Sport- und Kulturhalle im Haus.",
      "Kostform Vollkost oder ovo-lakto-vegetabil; medizinische Sonderkost nach rechtzeitiger Absprache."
    ],
    "mitbehandlungHinweis": "Aufnahme in die psychosomatische Krankenhaus-/Akutabteilung nur mit ärztlicher oder psychotherapeutischer Einweisung und vereinbartem Termin."
  },
  "ck-hartwald": {
    "alltag": [
      "36 Zimmer mit Balkon im Nebengebäude, Vergabe nach Verfügbarkeit, nicht reservierbar.",
      "Fernbedienung für das Zimmer-TV kostenlos ausleihbar; Spezielle Betten für große Personen sowie Pflegebetten mit Überwachung.",
      "228 Einzelzimmer; barrierefreie Zimmer vorhanden; alle Nichtraucherzimmer.",
      "Fünf Zimmer für Mutter oder Vater mit Kind.",
      "Schwimmbad und Sauna auch in der therapiefreien Zeit.",
      "Kostenfreies WLAN; Waschmaschinen und Bügeleisen, Chips gegen Bezahlung."
    ],
    "therapieHinweise": [
      "Stomatherapie: pflegerische Aufnahme, Anleitung zur selbstständigen Versorgung, wöchentliche Stomagruppe; monatlich Besuch ehrenamtlicher ILCO-Mitarbeitender.",
      "Duale Reha Psycho-Gastroenterologie.",
      "MBOR mit beruflicher Ausrichtung in allen Phasen."
    ],
    "factsExtra": [
      "Lehrklinik für Ernährungsmedizin nach der DAEM; ernährungsmedizinische Schwerpunktklinik, zertifiziert durch NutriZert.",
      "Klinik seit 1973.",
      "Doppelzimmer laut FAQ für Begleitpersonen.",
      "Bibliothek, Schwimmbad und Sauna auf der Klinikseite."
    ],
    "wahlleistungenHinweis": "Begleitperson im Rehabilitandenzimmer mit Verpflegung. Anwendungen für Begleitpersonen bietet die Klinik nicht an; Behandlungen bei niedergelassenen Therapeutinnen und Therapeuten im Ort möglich.",
    "mitbehandlungHinweis": "Duale Reha Psycho-Gastroenterologie: psychosomatische und gastroenterologische Behandlung im Verbund, inkl. Ernährungstherapie und Stomatherapie."
  },
  "ck-haseems": {
    "alltag": [
      "Wohn- und Therapiegebäude, Speisesaal, Ergo-/Arbeitstherapie mit Belastungserprobung.",
      "Barrierefrei laut Trägerkonzept.",
      "Unterbringung in Einbettzimmern mit eigenem Bad; daneben Zweibettzimmer und rollstuhlgerechte Einzelzimmer.",
      "Frauenwohnen in eigenem, transpondergesicherten Trakt.",
      "Rauchen nur im Rauchpavillon.",
      "Wellnessbereich mit Sauna, Fitnessräume, Außensport, Lehrküche; Hallenbad gegenüber der Klinik nutzbar."
    ],
    "sozialdienstLeistungen": [
      "Medizin, Psychotherapie, Sozialberatung sowie Arbeits- und Ergotherapie arbeiten am Behandlungskonzept.",
      "Klärung von Finanzen, Anträgen, Behörden, Jobcenter und Krankenkasse.",
      "Schuldenberatung, Pfändungsschutzkonto, MPU-Fragen.",
      "Einleitung von Nachfolgeangeboten wie betreutes Wohnen."
    ],
    "therapieHinweise": [
      "Suchtstoffübergreifend: Alkohol, Drogen, Medikamente, pathologisches Glücksspiel.",
      "Trauma und Sucht, substitutionsgestützte Reha, Komb-Nord, ambulante Weiterbehandlung und Nachsorge.",
      "Substitutionsgestützte medizinische Rehabilitation möglich; Beikonsumfreiheit wird dokumentiert, Abdosieren kann eingeleitet werden.",
      "Komb-Nord-Behandlung, Trauma und Sucht, Rückfallbehandlung.",
      "Verhaltenstherapie und Tiefenpsychologie; Familientherapie; Raucherentwöhnung.",
      "Sonderkostformen medizinisch und/oder weltanschaulich; BORA mit Belastungserprobung und Bewerbungstraining."
    ],
    "factsExtra": [
      "Klinikwebsite fachklinik-hase-ems.de war nicht erreichbar; Angaben vom Träger Caritas Osnabrück.",
      "69 Plätze (60 vollstationär, 6 ganztägig ambulant, 3 Adaption).",
      "Federführend DRV Braunschweig-Hannover.",
      "Klinik barrierefrei für körperbehinderte Rehabilitandinnen und Rehabilitanden eingerichtet.",
      "Aufnahme von Begleitpersonen und Begleitkindern nicht möglich.",
      "Anerkennung nach §§ 35 und 36 BtMG; Behandlung nach § 64 StGB nach Einzelfallentscheidung grundsätzlich möglich."
    ],
    "mitbehandlungHinweis": "Mitbehandlung psychiatrischer und psychosomatischer Begleiterkrankungen genannt.",
    "kontraindikationen": [
      "Schwere somatische Erkrankungen, die eine aktive Teilnahme an der Rehabilitation nicht zulassen.",
      "Chronische Erkrankungen oder Behinderungen mit dichtem pflegerischem Betreuungsbedarf.",
      "Schwere psychische Störungen, für die die gruppentherapeutische Behandlung eine andauernde Überforderung darstellt, oder hirnorganische Beeinträchtigungen ohne erfolgversprechende Psychotherapie."
    ]
  },
  "ck-haus-im-sueden": {
    "alltag": [
      "Kostenlose Leihfahrräder; vergünstigte Fitness-Studio-Mitgliedschaft während der Adaption möglich.",
      "Ausschließlich Einzelzimmer in mehreren Wohngruppen mit Wohnküchen, Sanitärbereichen, Balkonen und Dachterrassen.",
      "Kostenloser Internetzugang.",
      "Arbeitstraining an mehreren Wochentagen; morgens Alkohol- und Drogenkontrollen; abends optional gemeinsames Kochen und Selbsthilfegruppen."
    ],
    "wahlleistungenHinweis": "Vergünstigte Mitgliedschaft in einem Fitness-Studio während der Behandlungszeit. Kostenlose Leihfahrräder.",
    "sozialdienstLeistungen": [
      "Sozialberatung zu Schulden, Ämtern, Wohnungssuche und Behördengängen.",
      "Bewerbungscoaching und Kontakt zu Arbeitsagentur/Jobcenter.",
      "Vermittlung in abstinentes Betreutes Wohnen nach der Adaption."
    ],
    "therapieHinweise": [
      "Bezugstherapie, Gruppentherapie in der Regel bis maximal 10 Personen.",
      "Rückfallvorbeugung mit regelmäßigen Suchtmittelkontrollen.",
      "Sportgruppe und 14-tägige Gruppe Arbeit & Bewerbung."
    ],
    "factsExtra": [
      "Voraussetzung ist eine erfolgreich abgeschlossene Suchtklinik-Behandlung, nicht Entgiftung.",
      "Broschüre Stand 11/2025."
    ],
    "mitbehandlungHinweis": "Medizinische Behandlung in Kooperation mit der suchtmedizinischen Ambulanz des Bürgerhospitals / ZSG Klinikum Bad Cannstatt; ärztliche Beratung im Haus."
  },
  "ck-haus-lenne": {
    "alltag": [
      "Erste drei Wochen Aufnahmegruppe (themenzentriert, zweimal wöchentlich).",
      "Während der stationären Phase zweimal wöchentlich Urinprobe unter Sicht (Opiate, Kokain, Amphetamine, Cannabis, Benzodiazepine); in der ambulanten Phase einmal wöchentlich.",
      "Sämtliche Medikamente bei Aufnahme beim Arzt abgeben; Ausgabe über die Klinik.",
      "Offene Sprechstunde dienstags 10:30–12 Uhr inkl. Hausbesichtigung."
    ],
    "sozialdienstLeistungen": [
      "Soziales Training: Anträge, Umgang mit Behörden, Ordnungssystem für persönliche Unterlagen.",
      "Arbeitstherapie u. a. Holzwerkstatt, Hauswirtschaft, Tierversorgung, Fahrradwerkstatt, Küche, Garten, Haustechnik.",
      "Bewerbungstraining als Indikationsgruppe nach etwa zwei Monaten Therapiezeit.",
      "Hilfe der Drogenberatungsstelle bei Antrag, Sozialbericht und ärztlichem Befundbericht."
    ],
    "therapieHinweise": [
      "Kombitherapie aus stationärer und ambulanter Phase; Kurzzeit- oder Langzeittherapie.",
      "Bezugsgruppe zweimal wöchentlich; Einzeltherapie einmal wöchentlich.",
      "Indikative Gruppen u. a. Rückfallprävention, Skills, pathologisches Glücksspiel, pathologischer PC-/Internetgebrauch, Sexualität und Rausch.",
      "Erlebnistherapie im Outdoor-Bereich (Wandern, Klettern, Kanufahren); Entspannung: autogenes Training und progressive Muskelrelaxation.",
      "Eintägiges Angehörigenseminar; Paartherapie bei gemeinsam aufgenommenen Paaren vorgesehen."
    ],
    "kontraindikationen": [
      "Fehlende Kostenzusage bzw. ungeklärte Privatfinanzierung.",
      "Keine nachgewiesene körperliche Entgiftung.",
      "Unzureichende körperliche oder psychische Stabilität für das Programm."
    ],
    "factsExtra": [
      "Frauen und Männer ab 18, in Einzelfällen jünger.",
      "Anerkennung nach §§ 35, 36, 37 BtMG; Berliner Therapie-Sofort-Programm.",
      "Downloads: Hausordnung, Koffer packen, Wochenplan."
    ]
  },
  "ck-hausen-im-tal": {
    "therapieHinweise": [
      "Hilfe für junge Menschen mit Sucht- und Drogenproblemen.",
      "Ausstieg aus dem Suchtmittelkonsum, Aufarbeitung persönlicher Probleme, berufliche Perspektive.",
      "Drogenfreies Umfeld."
    ],
    "factsExtra": [
      "Adresse Voradelberg 2, Leibertingen-Thalheim.",
      "Klinikseite unter http://www.tzhit.de/."
    ]
  },
  "ck-haussee": {
    "therapieHinweise": [
      "Psychosomatische Fachabteilung u. a. Depression, Angst, Panik, Zwang, Anpassung, Belastung, somatoforme und Persönlichkeitsstörungen."
    ],
    "factsExtra": [
      "Psychosomatik laut Qualitätsbericht 105 Betten."
    ],
    "mitbehandlungHinweis": "Weitere Fachabteilungen Neurologie und Kardiologie am Standort; internistische und orthopädische Mitbehandlung im Klinikverbund möglich.",
    "alltag": [
      "Anreise bis spätestens 10 Uhr; am Anreisetag ist die ärztliche Aufnahme geplant.",
      "Mit Bahn über Neustrelitz, weiter Buslinie 619; Parkplätze auf dem Klinikgelände.",
      "Drei Menülinien, eine davon DGE-zertifiziert; Sonderkostformen werden individuell zubereitet.",
      "Aufenthalt über Feiertage möglich; Unterbrechung nur in Ausnahmesituationen."
    ],
    "sozialdienstLeistungen": [
      "Anschlussheilbehandlung: Antrag über den Sozialdienst des vorbehandelnden Krankenhauses.",
      "Heilverfahren: Antrag beim zuständigen Kostenträger, in der Regel mit Unterstützung des Hausarztes."
    ],
    "wahlleistungenHinweis": "TV, Telefon, WLAN und Parken sind gebührenpflichtig. Begleitperson in der Psychosomatik nur abhängig vom Therapiezweck und nach Vorabklärung; Übernachtung inkl. Vollpension im Zimmer der rehabilitierenden Person."
  },
  "ck-heidehof": {
    "factsExtra": [
      "fk-heidehof.de leitete auf die Diakoniestiftung Sachsen; Klinikdetails dort im CMS.",
      "Adaption Pirna gehört laut Trägerverbund zum Heidehof, ist ein anderes Haus.",
      "Zertifiziert nach Diakonie-Siegel Medizinische Rehabilitation (BAR-anerkannt).",
      "Bereitschaft zu suchtmittelfreier Lebensweise als Grundlage der Aufnahme.",
      "Pflegedienst rund um die Uhr; Medikamentenausgabe und Pflegevisiten.",
      "Adaption in Pirna ist ein Anschlussangebot, nicht dasselbe Haus."
    ],
    "therapieHinweise": [
      "Regelbehandlungsdauer 12–24 Wochen, abhängig vom individuellen Therapiebedarf.",
      "Fokus auf psychiatrische Doppeldiagnosen sowie eingeschränkte Leistungsfähigkeit.",
      "Multiprofessionelles Team auf psychotherapeutischem, neurologischem und internistischem Gebiet.",
      "Angehörigenseminare einmal im Quartal."
    ],
    "alltag": [
      "Nach der Aufnahmephase Zweibettzimmer in Therapiehäusern mit Dusche, WC und Telefonanschluss.",
      "Kostenloses WLAN nicht auf den Zimmern, sondern in ausgewählten öffentlichen Bereichen.",
      "Aufnahme gemeinsam mit Kindern möglich; spezielle Betreuung und Erziehungshilfen für suchtkranke Eltern."
    ],
    "sozialdienstLeistungen": [
      "Zugang über Suchtberatungsstelle, Arbeitsagentur, Heilfürsorge, JVA-Sozialdienst oder Direktverlegung nach psychiatrischer Regelbehandlung."
    ]
  },
  "ck-heiligenfeld-berlin": {
    "alltag": [
      "Vollstationär mit Zimmer im Haus oder Tagesklinik (Mo–Fr, Nächte und Wochenenden zu Hause).",
      "Zimmer mit Bad (Dusche oder Badewanne); Allergikerzimmer und Tierzimmer nach Voranmeldung.",
      "Ausgänge und Besuche außerhalb der Therapien grundsätzlich möglich; Übernachtung außer Haus nur nach Genehmigung und für jeweils eine Nacht.",
      "Waschmaschine, Trockner und Bügeleisen im Haus; Fernsehraum und Computer mit Internetzugang.",
      "Freiwillige Meditationen mehrmals wöchentlich; viermal im Jahr „Tag der Stille“."
    ],
    "therapieHinweise": [
      "Gesprächs-, körperorientierte sowie kunst- und musiktherapeutische Verfahren.",
      "Achtsamkeit, Spiritualität und Naturtherapie; Walking/Jogging und Nordic Walking.",
      "Physiotherapeutische Einzelbehandlungen nach ärztlicher Verordnung.",
      "Spezielle Angebote u. a. für Lehrkräfte sowie Vollzugsbeamtinnen und -beamte.",
      "Aufenthaltsdauer durchschnittlich sechs bis acht Wochen."
    ],
    "factsExtra": [
      "Krankenhausbehandlung (kein Kur-/Sanatoriumsangebot) für GKV, PKV, Beihilfe und Selbstzahler.",
      "Lage in historischer Parklandschaft Berlin-Marzahn, Brebacher Weg 15.",
      "Tierbegleitete Therapie nur am Standort Bad Kissingen, nicht in Berlin."
    ],
    "wahlleistungenHinweis": "Gesetzliche Kassenleistung maximal Zweibettzimmer; Privatversicherte werden in Einbettzimmern untergebracht. Mitnahme von Hund, Katze oder Kleintier nach Voranmeldung gegen Entgelt.",
    "mitbehandlungHinweis": "Medikamente nur nach Anordnung der Klinikärztinnen und Klinikärzte am Pflegestützpunkt. Für mindestens sieben Tage die bisherige Medikation mitbringen plus aktuellen Medikamentenplan."
  },
  "ck-heiligenfeld-familienklinik": {
    "alltag": [
      "Anreise zwischen 09:30 und 11:00 Uhr.",
      "Aufnahme von Erwachsenen allein, mit Kindern oder als ganze Familie; jedes Familienmitglied in eigener Therapie, plus familientherapeutische Inhalte.",
      "Familien (Eltern mit Kindern bis 13 Jahre) in Familienzimmern mit Durchgangstür; mindestens ein Bad mit Dusche und WC.",
      "Jugendliche (14–17 Jahre) im Zweibettzimmer mit gemeinsamem Bad; eigener Schrank mit Tresor und Schreibtisch.",
      "Bett selbst machen und Zimmer sauber halten; einmal wöchentlich Reinigung.",
      "Eltern sind für Mahlzeiten, Betreuung und Aufsicht der Kinder zuständig; gemeinsames Abendessen und Wochenendmahlzeiten."
    ],
    "therapieHinweise": [
      "Fachkrankenhaus für Familien, Eltern, Kinder (3–14) und Jugendliche.",
      "Tiefenpsychologisches Gruppensetting; bestimmte Krankheitsbilder nur nach Einzelfallprüfung.",
      "Psychodynamisch-systemische Familientherapie; Eltern-Kind-Therapie mit Fokus Bindung und Mentalisieren.",
      "Multifamiliensetting mit wöchentlichen Eltern-Kind-Zielen; therapeutisch begleitetes freies Spiel."
    ],
    "factsExtra": [
      "Krankenhausbehandlung für gesetzlich und privat Versicherte, kein reines Reha-Heilverfahren."
    ],
    "kontraindikationen": [
      "Aufnahme ab 3 Jahren; Kinder unter 14 Jahren nur in Begleitung mindestens eines ebenfalls behandlungsbedürftigen Elternteils."
    ]
  },
  "ck-heiligenfeld-rosengarten": {
    "alltag": [
      "Ansprechendes Einzelzimmer mit Bad (Dusche oder Badewanne), Schränken und Telefon.",
      "Meditations- und Kunstraum, Brettspielbereich, Bibliothek; Gartenanlage mit Liegewiese.",
      "Wellnessbehandlungen außerhalb der regulären Therapiezeiten.",
      "Tierbegleitete Therapie mit dem eigenen Hund: Hundeküche, Hundedusche, eingezäunter Freilauf; Hund nicht in den Speisesaal.",
      "Bett selbst beziehen und Zimmer sauber halten; Hausservice einmal wöchentlich.",
      "Ausgänge und Besuche außerhalb der Therapien grundsätzlich möglich; Übernachtung außer Haus nur nach Genehmigung, jeweils maximal eine Nacht."
    ],
    "therapieHinweise": [
      "Psychodynamische Grundlage, ergänzt durch Verhaltenstherapie, Systemik, Traumatherapie, Körpertherapie und Achtsamkeit.",
      "Physiotherapeutische Gruppen, Bewegungstherapie, Jogging und Walking am Morgen.",
      "Freiwillige Meditationen, Besinnungsrituale in Therapiegruppen, viermal im Jahr „Tag der Stille“.",
      "Tierbegleitete Therapie: das eigene Tier wird aktiv in die Therapie einbezogen.",
      "Spezielle Gruppenkonzepte u. a. für Menschen in helfenden und sozialen Berufen, ältere Menschen sowie Essstörungen/Adipositas (Umwelterklärung der Kliniken).",
      "Durchschnittliche Aufenthaltsdauer rund fünf Wochen, abhängig von der Kostenzusage."
    ],
    "factsExtra": [
      "Stationäre psychosomatische Rehabilitation für gesetzlich Versicherte; Belegungsvertrag mit der DRV Bund seit 2012.",
      "Beginnende stoffgebundene Abhängigkeitserkrankungen im Behandlungsspektrum.",
      "Lage am Luitpoldpark der UNESCO-Welterbestadt Bad Kissingen.",
      "Teil der Zimmer für behinderte oder schwer übergewichtige Rehabilitandinnen und Rehabilitanden; rollstuhlgängiges Bad vorhanden.",
      "Speisenangebot nach D-A-CH-Vorgaben, vollwertig und ökologisch orientiert.",
      "Sauna und Schwimmbad in der Parkklinik Heiligenfeld nutzbar."
    ],
    "wahlleistungenHinweis": "Bademantel und Saunatuch gegen Kaution. Aufnahme mit Hund, Katze oder Kleintier nach Voranmeldung gegen Entgelt; u. a. Kopie der Privathaftpflicht und aktuelle Gesundheitsbescheinigung des Tieres."
  },
  "ck-heiligenfeld-waldmuenchen": {
    "alltag": [
      "Zimmer mit Dusche, WC und Telefon; natürliche Materialien, individuelle Gestaltung in begrenztem Umfang.",
      "Patientenbibliothek, Begegnungsraum, Fernsehraum, Billard, Malräume und Meditationsraum.",
      "Außengelände mit Ruhezonen, Kneipp-Becken, Feuerstelle und Multifunktionsspielfeld.",
      "Ausgänge außerhalb der Therapien grundsätzlich möglich; Übernachtung außer Haus nur nach Genehmigung für jeweils eine Nacht.",
      "Fahrrad- und E-Bike-Verleih April bis September; Waschmaschine und Trockner im Haus.",
      "Vegetarische und vegane Speisen sowie Sonderdiäten; Küche mit Qualitätszertifikaten, Schwerpunkt ökologische Ernährung."
    ],
    "therapieHinweise": [
      "Gesprächs-, körperorientierte sowie kunst- und musiktherapeutische Verfahren.",
      "Achtsamkeitstraining; Therapiegruppen beginnen mit einem Ritual der Sammlung.",
      "Physiotherapie nach Verordnung; Gruppe „Strukturierte Bewegung“ (Stretching, Rückenschule).",
      "Naturtherapie; jederzeit zugänglicher Meditationsraum.",
      "Chefarzt Artan Laska; durchschnittliche Behandlungsdauer sechs bis acht Wochen.",
      "Familientherapie zum Jahreswechsel 2024/2025 an die Klinik Bad Wörishofen verlagert."
    ],
    "factsExtra": [
      "Fachkrankenhaus für psychosomatische Medizin (Krankenhausbehandlung, nicht Reha) für GKV, PKV, Beihilfe und Selbstzahler.",
      "Erwachsene seit 2024; Lage am Stadtrand von Waldmünchen im Naturpark Oberer Bayerischer Wald, nahe der tschechischen Grenze.",
      "Bettenzahl auf 40 reduziert (Umwelterklärung 2026 der Heiligenfeld Kliniken).",
      "Kleines Schwimmbad am Standort; Computer mit Internetzugang im Haus.",
      "Haustiere sind nicht möglich."
    ],
    "wahlleistungenHinweis": "GKV-Standard maximal Zweibettzimmer. Für Privatversicherte Aufnahmeantrag mit oder ohne Chefarzt-Wahlleistung."
  },
  "ck-hephata-schneeberg": {
    "kontraindikationen": [
      "Bei vorwiegendem Konsum illegaler Suchtmittel: Eignung der Einrichtung individuell klären.",
      "Regulär abgeschlossene Entwöhnungsbehandlung als formale Voraussetzung."
    ],
    "mitbehandlungHinweis": "Die ärztliche Leitung verschreibt vor Ort keine Medikamente, nur Empfehlungen. Haus- oder Facharzt möglichst früh aus der Einrichtung heraus organisieren.",
    "alltag": [
      "Zwölf Einzelzimmer und zwei Doppelzimmer für Paare; Küchen, Gemeinschafts- und Sanitärräume.",
      "Bewerbungstrainingszimmer mit Schreibtisch und Computer.",
      "Haustiere nach vorheriger Absprache möglich.",
      "Innenstadtlage Aschaffenburg, fußläufig zu Bahnhof, Behörden und Einkauf."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei Integration in eigene Wohn- und Arbeitsverhältnisse."
    ],
    "therapieHinweise": [
      "Ärztlich begleitete Fortführung der medizinischen Rehabilitation nach Langzeittherapie.",
      "Behandlungsdauer zwei bis mehrere Monate laut Trägerseite.",
      "Paare möglich, Beziehungsthemen im therapeutischen Prozess."
    ],
    "factsExtra": [
      "Einzelzimmer plus Doppelzimmer für Paare; Haustiere nach vorheriger Absprache.",
      "DRV-Länder vorwiegend; DRV Bund nur Einzelfallentscheidung.",
      "Mündliche Kostenzusage genügt laut Klinikseite; persönliches Kennenlerngespräch nach Unterlageneingang."
    ]
  },
  "ck-hermannsborn": {
    "alltag": [
      "Therapieplan digital über Smartphone oder Tablet einsehbar.",
      "Regelhaft Einzelzimmer mit eigenem Bad, Notruf und häufig Balkon; 216 Betten am Standort.",
      "Kostenfreies WLAN; TV und Zimmertelefon gebührenpflichtig an der Rezeption.",
      "Handtücher und Bettwäsche werden gestellt; Waschmaschinen und Trockner im Haus; Bademantel ausleihbar.",
      "Anreise vormittags (FAQ: 10–12 Uhr); auf Wunsch Abholung vom Bahnhof Altenbeken.",
      "Parken auf dem Klinikparkplatz; Fahrradverleih am Standort Park Klinik."
    ],
    "factsExtra": [
      "Park Klinik: psychosomatisches Heilverfahren im Verbund der Gräflichen Kliniken Bad Driburg.",
      "Begleitpersonen für psychosomatische Patientinnen und Patienten in der Regel nicht möglich; Ausnahmen nach ärztlicher Rücksprache.",
      "Nicht identisch mit AHG Klinik Bad Driburg oder Klinik Rosenberg.",
      "Lage im eigenen Landschaftspark in Bad Hermannsborn; Park Café und Fernsehraum."
    ],
    "wahlleistungenHinweis": "Medizinische Wahlleistungen vor Antritt der Reha anfragen; DRV- und Postbeamtenkasse-Versicherte haben in der Regel keinen Anspruch. Weitere Wahlleistungen auf eigene Kosten möglich.",
    "sozialdienstLeistungen": [
      "Psychosomatische Nachsorge Psy-RENA in Gruppen am Standort Park Klinik."
    ],
    "therapieHinweise": [
      "Psychosomatisches Heilverfahren (kein AHB) u. a. bei Depression, Burn-out, Angst, Anpassungsstörungen, chronischem Schmerz und Long Covid/Post-Corona.",
      "Eigenes Konzept für pflegende Angehörige (PuRpA, Stiftung Wohlfahrtspflege NRW).",
      "Chefarzt Psychosomatik, Psychotherapie und Psychiatrie: Christian Weidner."
    ]
  },
  "ck-hirtenstein": {
    "kontraindikationen": [
      "Männer unter 18 Jahren",
      "aktuelle Substitution",
      "akute Suizidalität",
      "fehlende Rehabilitationsfähigkeit"
    ],
    "alltag": [
      "74 Plätze Entwöhnung und 8 Plätze Adaption.",
      "Bezugsgruppe dreimal wöchentlich à 90 Minuten, rund zwölf Teilnehmende.",
      "Langzeittherapie je nach Suchtmittel 13 Wochen, pathologisches Glücksspiel 10 Wochen; kürzere Formen 6–8 Wochen.",
      "Zweiwöchige Aufnahme- und Diagnostikphase mit Aufnahmegruppe (dreimal wöchentlich).",
      "Zimmer am Entlasstag bis 09:00 Uhr räumen; Kaution 25 € für den Zimmerschrankschlüssel im Patientenservice.",
      "Internet-PCs im Erdgeschoss gegen Gebühr von 5 € für den gesamten Aufenthalt (Nutzungszeiten laut Hausordnung)."
    ],
    "sozialdienstLeistungen": [
      "Beratung zu Krankenversicherungsschutz, Sozialhilfebedarf und Mietangelegenheiten.",
      "Schuldnerberatung sowie Straf-, Sozial- und Zivilrecht; Unterstützung bei Anträgen aller Art."
    ],
    "therapieHinweise": [
      "BORA durchgängig im Konzept; Arbeitstherapie in Holz, Metall, Außenanlagen, Küche, Hauswirtschaft und Verwaltung.",
      "Indikationsgruppen u. a. MPU-Vorbereitung, Tabakentwöhnung, soziales Kompetenztraining, Bewerbungstraining, Achtsamkeit, Angst, Familie und Partnerschaft, Rückfallprävention.",
      "Sporttherapie inkl. Schwimmen, Wassergymnastik, Bergwandern sowie AVK- und Polyneuropathiegruppe.",
      "Ergotherapie mit Lehrküche und ausdruckszentrierter Arbeit; Auffang-, Kurzzeit- und Kombinationsbehandlung."
    ],
    "factsExtra": [
      "Männerspezifische Entwöhnung bei Alkohol, Medikamenten und pathologischem Glücksspiel; Beikonsum von Cannabis und Partydrogen möglich.",
      "Träger Suchthilfe Allgäu / Ordenswerke; Zertifizierung DO-QUA.R.",
      "Nach vorliegender Kostenzusage Versand von Einladungsunterlagen, Packliste und Hausordnung.",
      "Vorgespräch mit der Aufnahme persönlich oder telefonisch möglich."
    ],
    "mitbehandlungHinweis": "Suchtmittelbedingte körperliche Folgeerkrankungen werden mitbehandelt; eigene Gruppen für AVK und Polyneuropathie.",
    "wahlleistungenHinweis": "Internetnutzung an den Klinik-PCs gegen Gebühr von 5 € für den gesamten Aufenthalt, Zahlung im Patientenservice."
  },
  "ck-hochgrat": {
    "kontraindikationen": [
      "Körpergewicht über 140 kg",
      "BMI unter 17",
      "Keine Reha: reines Akutkrankenhaus"
    ],
    "alltag": [
      "105 stationäre Behandlungsplätze; GKV, PKV und Beihilfe.",
      "Vollwertkost mit Fleisch oder vegetarische Kost; vegane Kost wird nicht angeboten.",
      "Keine Sonderkost bei Gluten-, Soja- oder Milcheiweißunverträglichkeit; nuss-, laktose- und kern-/steinobstfreie Kost möglich."
    ],
    "sozialdienstLeistungen": [
      "Soziale Beratung im Entlassmanagement nach § 39 Abs. 1a SGB V.",
      "Nachsorgegruppe zur Planung der Zeit nach der Behandlung."
    ],
    "therapieHinweise": [
      "Tiefenpsychologisch fundierte, kognitiv-behaviorale und systemische Therapie.",
      "Achtsamkeitsbasierte Medizin (MBSR), Körpertherapie, Bonding-Psychotherapie.",
      "Traumasensible Verfahren nach Luise Reddemann; Elemente aus DBT/Skillstraining.",
      "Therapeutische Gemeinschaft; integrierte Nachsorge; Familienwoche zur Angehörigeneinbeziehung.",
      "Einführung in das 12-Schritte-Programm der anonymen Selbsthilfegruppen."
    ],
    "factsExtra": [
      "Akutklinik für Psychosomatik und Psychotherapie der Reisach-Kliniken in Stiefenhofen-Wolfsried.",
      "Aufnahme mit Verordnung von Krankenhausbehandlung (GKV) bzw. Kostenzusage PKV/Beihilfe."
    ],
    "wahlleistungenHinweis": "Einbettzimmer mit Nasszelle als Wahlleistung für Privat- und Zusatzversicherte sowie Selbstzahler.",
    "mitbehandlungHinweis": "Fundierte körpermedizinische Mitbetreuung im Behandlungskonzept; am Anreisetag körperliche Untersuchung durch Körperärztin oder Körperarzt."
  },
  "ck-hochstadt": {
    "kontraindikationen": [
      "Sehr eingeschränkte deutsche Sprachkenntnisse, akute Psychosen (z. B. Schizophrenien) und akute Suizidalität schließen die Aufnahme aus.",
      "Schwere hirnorganische Beeinträchtigungen, die eine Behandlung auf offener Station nicht zulassen.",
      "Suchterzeugende Medikamente oder Betäubungsmittel (z. B. Medikinet, Lyrica) vor Aufnahme abdosieren; keine Substitutionsbehandlung im Haus.",
      "Keine Aufnahme bei ausschließlichen Essstörungen oder stoffungebundenen Erkrankungen, Demenz sowie deutlich ausgeprägten hirnorganischen Psychosyndromen laut Therapiekonzept."
    ],
    "alltag": [
      "Ein- oder Zweibettzimmer; Mehrzahl Doppelzimmer. Acht Stationen, getrennt nach Alkohol/Medikamente (Haus 5) und Drogen (Haupthaus).",
      "Eigene Frauenstation mit Bad und Küche; Paare nach Prüfung (stabile Beziehung mindestens 6 Monate) im Doppelzimmer möglich.",
      "Besuch nach Absprache; Ausgänge und Familienheimfahrten stufenweise. Kein Fahren mit Kfz, keine Patientenparkplätze, keine Haustiere.",
      "Waschmaschinen und Trockner im Haus; Wochenenden mit Möglichkeit zur Selbstverpflegung.",
      "Keine eigenen Fernseher, Spielkonsolen oder Muskelaufbaupräparate; Creatin, Eiweißpulver und Energy-Drinks nicht erlaubt."
    ],
    "sozialdienstLeistungen": [
      "Klärung der existenziellen Absicherung, Schuldnerberatung und Wohnungssuche.",
      "Arbeitsbezogene Leistungen, Nachsorge und fallführende Betreuung der Adaption.",
      "MPU-Informationsgruppe; Unterstützung bei Kontakten zu Jobcenter, Justiz und Beratungsstellen."
    ],
    "factsExtra": [
      "Vor der Entwöhnung steht die Entzugsbehandlung, nahtlose Verlegung u. a. aus Bayreuth, Ebensfeld oder Rehau möglich.",
      "Drogenentwöhnung 24 Wochen, Alkohol/Medikamente 15 Wochen, Auffang kürzer, Adaption 12 Wochen laut Therapiekonzept.",
      "NADA-Suchtakupunktur; therapeutisches Bogenschießen; Arbeitstherapie in Schreinerei, Gartenbau, Küche und Haustechnik.",
      "75 Planbetten.",
      "Nahtlose Verlegung aus kooperierenden Entzugsstationen möglich."
    ],
    "mitbehandlungHinweis": "Hepatitis-C-Behandlung möglich. Neuropsychiatrische Mitbehandlung u. a. bei Depressivität, Angst, Anfallsleiden und Psychosen nach Abklingen der Akutphase. Schwangere nach Absprache.",
    "therapieHinweise": [
      "Vollstationäre Reha nach abgeschlossener Entgiftung.",
      "Langzeitentwöhnung plus begleitende psychiatrisch-psychotherapeutische Behandlung.",
      "Glücksspielsucht wird bei stoffgebundener Abhängigkeit mitbehandelt; Doppeldiagnosen inkl. Psychosen."
    ]
  },
  "ck-hoechsten": {
    "kontraindikationen": [
      "Abstinenzorientierte Behandlung: abhängigkeitserzeugende Medikamente sind in der Klinik nicht erlaubt, u. a. Benzodiazepine, Z-Schlafmittel, Opioide, ADHS-Stimulanzien (Atomoxetin ist ausgenommen), Pregabalin und Distraneurin."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung als Baustein des Therapieplans.",
      "Vorbereitung der Zeit danach: Adaption, Selbsthilfe, betreute Wohnformen, berufliche Klärung oder ambulante Psychotherapie."
    ],
    "therapieHinweise": [
      "Tiefenpsychologisch-interaktionelles Konzept; Gruppentherapie dreimal wöchentlich, regelmäßige Einzeltermine inkl. Paar- und Familiengespräche.",
      "Indikationen u. a. Alkohol, illegale Drogen, Essstörung plus Sucht sowie Trauma und Sucht.",
      "Bausteine: tiergestützte Therapie, Ergo- und Arbeitstherapie (Garten, Tierversorgung, Hauswirtschaft), Sport, Kreativtherapie, Angehörigenseminar.",
      "Eingangsphase mit Diagnostik und Indikationskonferenz; anschließend Einzelzimmer mit Nasszelle, Beginn oft im Doppelzimmer."
    ],
    "mitbehandlungHinweis": "Umfassende Diagnostik internistisch, psychiatrisch-neurologisch und sozialmedizinisch; Komorbiditäten wie Depression sind im therapeutischen Angebot genannt.",
    "alltag": [
      "74 Einzel- und sechs Doppelzimmer; barrierefreie Nutzung aller Räume.",
      "Ab 1. Juli zusätzlich 42 neue Einzelzimmer laut Trägerseite."
    ],
    "factsExtra": [
      "Frauenspezifische stationäre Entwöhnung.",
      "Sobald Unterlagen und Kostenzusage vorliegen, Kontakt wegen Aufnahmetermin."
    ]
  },
  "ck-hoehenklinik-bischofsgruen": {
    "alltag": [
      "Anreise am Aufnahmetag bis 10 Uhr; am ersten Tag kann eine Begleitperson mitkommen.",
      "Zimmer bis 08:00 Uhr räumen (Prävention bis 14 Uhr); private Wasserkocher und Kaffeemaschinen aus Brandschutzgründen nicht erlaubt.",
      "Einzelzimmer mit Bad, TV und Telefon, Blick in die Natur, teilweise Balkon.",
      "Alle Zimmer Nichtraucherzimmer; vier barrierefreie Zimmer.",
      "Vier Doppelzimmer für Paare bei gleichzeitiger Teilnahme am Präventionsprogramm.",
      "Internetzugang über WLAN möglich; vegetarisches Essen und Diätkost."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutisch geprägter Ansatz; psychologisches Aufnahmegespräch plus fachärztliche psychiatrische Aufnahme-Exploration durch Ober- oder Chefarzt.",
      "Diagnostik u. a. AMDP-Befund, BDI-II, GAF, SCL-90 und CGI.",
      "Entspannung u. a. autogenes Training und progressive Muskelrelaxation; Kreativtherapie (Malen, Werken, Töpfern); Lichttherapie bei saisonaler Depression.",
      "Konzepte nach Leitlinien der Fachgesellschaften und Reha-Therapiestandards der DRV.",
      "Psychotherapie, Entspannung, Ergo- und Kreativtherapie, Sport- und Bewegungstherapie, Physiotherapie."
    ],
    "factsExtra": [
      "Zweimal wöchentlich Einführungsvortrag für neu angekommene Patientinnen und Patienten.",
      "Alkohol in Maßen nur in der Cafeteria 17:30–21:00 Uhr; sonst Alkohol- und Cannabiskonsum auf dem Gelände untersagt.",
      "Mahlzeiten gemeinsam im Speisesaal; Lebensmittel von außen nur Obst, luftdicht Verpacktes und alkoholfreie Getränke.",
      "Klinik der Deutschen Rentenversicherung Nordbayern; Zertifizierung QMS-Reha."
    ],
    "wahlleistungenHinweis": "Begleitperson nach Kapazität mit Vollpension und Nutzung der Freizeiteinrichtungen, 67,00 Euro pro Tag inkl. Kurbeitrag. WLAN-Tickets an der Pforte. Aufnahme von Kindern in der Reha-Klinik nicht möglich.",
    "sozialdienstLeistungen": [
      "Sozialtherapie und Sozialberatung im Therapieangebot."
    ],
    "mitbehandlungHinweis": "Psychopharmakotherapie und physikalische Therapie sind im Leistungsangebot genannt."
  },
  "ck-holthausen": {
    "alltag": [
      "Vier Wohnhäuser: je eine Therapiegruppe mit elf Patienten, Aufenthaltsraum und Gruppentherapieraum.",
      "In den ersten 14 Tagen Gelände nur mit Klinikmitarbeitenden oder Patientenbegleitung verlassen.",
      "Danach Ausgang zu zweit; Einzelausgang nach der Hälfte der Therapiezeit nach Rücksprache.",
      "Besuch nach den ersten 14 Tagen an Sa/So/Feiertagen bis 21:30 Uhr; Besuch soll drogenfrei sein.",
      "Nachtruhe So–Do 22:30–6:00 Uhr, Fr/Sa 23:30–6:00 Uhr. Kein eigenes Führen eines PKW während der Reha.",
      "Vier Häuser mit fester Therapiegruppe: Haus 1 Mischkonsum, Haus 2 Cannabis und jüngere Patientinnen und Patienten, Haus 3 Heroin und ältere, Haus 4 Eltern mit Kindern."
    ],
    "sozialdienstLeistungen": [
      "Berufsberatung und Sozialdienst zur Eingliederung in Arbeit, Beruf und Gesellschaft.",
      "Unterstützung bei Übergangsgeld, Einkommens- bzw. Leistungsbescheiden und Schuldenregulierung.",
      "Hilfen zu Schuldnerberatung, Arbeitslosengeld, Übergangsgeld, gesetzlicher Betreuung, Adaption und betreutem Wohnen.",
      "Berufsberatung: schulischer, Ausbildungs- und Berufsweg in den ersten beiden Wochen, danach Stellensuche.",
      "Vermittlung in Suchtberatung und Selbsthilfe für die Nachsorge.",
      "Zeugnisse, Lebenslauf, Einkommens- oder Leistungsbescheide und Unterlagen zur Schuldenregulierung mitbringen."
    ],
    "therapieHinweise": [
      "Stufenmodell in drei Stufen mit Suchtgruppe, dann Rückfallprävention.",
      "Bausteine u. a. Gruppen- und Einzelpsychotherapie, Arbeitstherapie, BORA, indikative Gruppen (Frauen/Männer, Cannabis, Eltern).",
      "Physiotherapie in den Räumen des ehemaligen St.-Georg-Krankenhauses Bad Fredeburg, Transfer per Klinik-Taxi.",
      "Stufenmodell in drei Stufen; Zuordnung zur Hausgruppe nach Indikation ab dem ersten Tag.",
      "Gruppen- und Einzelpsychotherapie mit Bezugstherapeutin bzw. Bezugstherapeut, Arbeitstherapie, BORA, indikative Gruppen.",
      "Bei Intoxikation und erhaltener Rehabilitationsfähigkeit Restentzug in der Aufnahmestation der Partnerklinik Fredeburg."
    ],
    "factsExtra": [
      "44 Therapieplätze in vier Häusern; Fachabteilung der Johannesbad Fachklinik Fredeburg.",
      "Vier Adaptionsplätze in der Partnerklinik Fredeburg nach abgeschlossener Entwöhnung.",
      "Kostenloses WLAN, bei Medien- oder Geldspielproblematik therapeutisch eingeschränkt.",
      "Regelmäßige Abstinenz- und Zimmerkontrollen; Energy-Drinks sind nicht gestattet.",
      "44 Therapieplätze plus vier Adaptionsplätze in der Partnerklinik Fredeburg.",
      "DIN EN ISO 9001 und DEGEMED/FVS; Beleger DRV, Krankenkassen, Sozialhilfeträger und Beihilfe."
    ],
    "kontraindikationen": [
      "Aufnahme zum vereinbarten Termin frei von Entzugszeichen; bei fehlender Rehabilitationsfähigkeit Vermittlung in eine akute Entgiftung.",
      "Heroinabhängigkeit: Aufnahme nur entgiftet und ohne Substitutionsmittel.",
      "Aufnahme nur entgiftet und ohne Substitutionsmittel.",
      "Intoxikation am Aufnahmetag: keine Aufnahme in die Entwöhnung, Vermittlung in akute Entgiftung."
    ]
  },
  "ck-holthauser-muehle": {
    "kontraindikationen": [
      "Aktuelle Substitution (Aufnahme nur ohne Substitutionsmittel).",
      "Nicht abgeschlossene Entgiftung (Restentzug dann in der Aufnahmestation der Johannesbad Fachklinik Fredeburg)."
    ],
    "alltag": [
      "44 Therapieplätze in vier Häusern (je Therapiegruppe elf Personen) plus vier Adaptionsplätze in der Partnerklinik Fredeburg.",
      "Zimmer mit Dusche, WC und Telefon; Einzelzimmer vorhanden.",
      "In der Anfangsphase Ausgang nur mit Klinikmitarbeitenden oder Patientenbegleitung; danach mit Mitpatientin bzw. Mitpatient.",
      "Besuch Samstag, Sonntag und Feiertage nach der Anfangsphase auf Antrag.",
      "WLAN nicht bei den Diagnosen pathologisches Glücksspiel oder Mediensucht; Smartphones auf Zimmern, Nutzung kann eingeschränkt werden.",
      "Klinikeigene heilpädagogische Kindertagesstätte für Patient:innen mit Begleitkindern."
    ],
    "sozialdienstLeistungen": [
      "Berufsberatung sowie Unterstützung bei Zeugnissen, Lebenslauf, Übergangsgeld und Schuldenregulierung.",
      "Klinischer Sozialdienst vor Ort."
    ],
    "therapieHinweise": [
      "Drei Stufen; Zuordnung: Haus 1 Mischkonsum, Haus 3 Heroin (nur entgiftet, ohne Substitut), Haus 4 Eltern mit Kindern bis 6 Jahren.",
      "Cannabisabhängigkeit als Hauptdiagnose möglich; Paare und Schwangere nach Konzept.",
      "Behandlungsdauer einer ersten Therapie 12 bis 26 Wochen.",
      "Gesamtbehandlungskonzept mit somatischen, sozial- und psychotherapeutischen sowie arbeitstherapeutischen Anteilen.",
      "Indikationsgeleitete Rehabilitationsplanung; anschließende Adaption als Phase II möglich."
    ],
    "factsExtra": [
      "Aufnahme nur entgiftet und ohne Substitutionsmittel.",
      "Belegung durch DRV, gesetzliche und private Krankenkassen sowie Beihilfe.",
      "Aufnahme ab dem jungen Erwachsenenalter.",
      "Fachklinik zur Entwöhnung von Drogenabhängigen im Johannesbad-Verbund."
    ],
    "mitbehandlungHinweis": "Somatische Interventionen sind laut Trägerseite Teil des Gesamtkonzepts."
  },
  "ck-huettenbuehl": {
    "kontraindikationen": [
      "Körpergewicht über 150 kg: Aufnahme nicht vorgesehen."
    ],
    "factsExtra": [
      "Dialysepatientinnen und -patienten werden aufgenommen.",
      "Allergenarme Zimmer; vegane Ernährung und Sonderkostformen.",
      "171 Zimmer, davon 3 Doppelzimmer; DGE-Qualitätsstandard für die Klinikverpflegung.",
      "Versorgungsvertrag nach § 111 SGB V; Kostenträger Rentenversicherung, GKV/PKV und Selbstzahler.",
      "QMS-REHA der DRV Bund zertifiziert.",
      "Präventionswochen und Post-Lockdown-Reha öffentlich genannt."
    ],
    "alltag": [
      "171 Einzelzimmer mit Duschbad, Telefon, Schreibtisch, Sessel, Garderobe und Safe.",
      "Zimmer überwiegend barrierefrei, alle Nichtraucherzimmer; Teeküche je Station.",
      "Schwimmbad, Sauna, Fitnessraum und Liegewiese auch in der therapiefreien Zeit.",
      "Kostenfreies WLAN in der ganzen Klinik."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung im Haus.",
      "Nachsorge Psy-RENA in Gruppen bis 10 Personen, 90 Minuten.",
      "MBOR mit Empfehlung zu Leistungen zur Teilhabe am Arbeitsleben und stufenweiser Wiedereingliederung."
    ],
    "therapieHinweise": [
      "Integratives Konzept aus tiefenpsychologischen und verhaltenstherapeutischen Ansätzen.",
      "Traumaspezifische Behandlungsmöglichkeiten einschließlich komplexer PTBS.",
      "Musik-, Aktiv-, Kreativ- und Ernährungstherapie; RV-Fit mit Zürcher Ressourcenmodell."
    ],
    "mitbehandlungHinweis": "Begleiterkrankungen wie Bluthochdruck, Asthma sowie Muskel-Skelett-, Stoffwechsel-, Herz-Kreislauf- und Atemwegserkrankungen werden internistisch-psychotherapeutisch mitbehandelt."
  },
  "ck-inntal": {
    "kontraindikationen": [
      "Erkrankungen mit akuter Suizidgefährdung",
      "akute Psychosen",
      "infektiöse Patientinnen und Patienten",
      "manifeste stoffgebundene Abhängigkeit",
      "organische psychische Störungen / fortgeschrittene Demenz",
      "Störungen des Sozialverhaltens ohne Eingliederungsmöglichkeit"
    ],
    "alltag": [
      "Rund 100 Betten zuzüglich Begleitpersonen; Begleitkinder werden während der Therapiezeiten betreut.",
      "Cafeteria mit Sonnenterrasse, Schwimmbad mit Therapiebecken, Sauna, Gymnastikräume, Tischtennis.",
      "Ausflüge ins Europareservat Unterer Inn / Naturium; organisierte Ausflüge und Spieleabende.",
      "Kindertagesstätte für Begleitkinder: Bärchengruppe bis 4 Jahre, Skatergruppe 4–8 Jahre, Jugendgruppe ab 3. Klasse bis 16 Jahre (Mo–Fr bis 16:00 Uhr, bei Bedarf bis 17:00 Uhr).",
      "Hausaufgabenbetreuung für schulpflichtige Begleitkinder; Freizeit u. a. Eltern-Kind-Schwimmen, Ausflüge, Kinderdisco.",
      "Handtücher und Badetücher kostenfrei; Waschmittel für Münzwaschmaschinen selbst mitbringen."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung; auf der transkulturellen Station auch in der Muttersprache.",
      "MBOR der DRV bei besonderen beruflichen Belastungen.",
      "Erstberatung des Sozialdienstes für alle neu Angereisten zu Arbeitsplatz und sozialrechtlichen Fragen.",
      "Gruppenangebote u. a. Sozialrecht, Konflikte am Arbeitsplatz, Stress am Arbeitsplatz, berufliche Perspektive und Nachsorge."
    ],
    "therapieHinweise": [
      "Tiefenpsychologisch fundierte Psychotherapie, Verhaltenstherapie, systemische und Familientherapie.",
      "Transkulturelle Psychotherapie laufend auf Türkisch; weitere Sprachen (u. a. BKS, Russisch) nach Voranfrage.",
      "IDeA-Konzept bei affektiver Störung plus Adipositas (BMI 30–50): Bewegung, Ernährung, Achtsamkeit, Kreativtherapie.",
      "Atem-, Tanz- und Musiktherapie, Yoga, therapeutisch begleiteter Esstisch, Lehrküche.",
      "IRENA und Psy-RENA; spezielles Adipositas-Nachsorgekonzept."
    ],
    "factsExtra": [
      "Fachklinik für psychosomatische Medizin in Simbach am Inn an der österreichischen Grenze.",
      "Stationäre und ganztägig ambulante Reha; Chefarzt Klinik für Transkulturelle Psychosomatik."
    ],
    "mitbehandlungHinweis": "Immobile oder pflegebedürftige Rehabilitanden sowie IDeA-Teilnahme über 180 kg oder somatisch sehr instabil nicht vorgesehen; schwere körperliche Begleiterkrankungen vorherige Absprache. Kardiologische Abklärung vor IDeA.",
    "wahlleistungenHinweis": "Fernseher-Verleih 3 Euro pro Tag, Wunsch vor der Anreise anmelden. Thermoskanne, Tasse, Trinkglas und Wolldecke gegen 30 Euro Kaution; spezielle Trinkflasche für Quellwasser 2,50 Euro."
  },
  "ck-irmingard": {
    "kontraindikationen": [
      "Vegane, kuhmilcheiweißfreie, zuckerfreie oder ketogene Ernährung kann nicht berücksichtigt werden; bei medizinisch zwingender Notwendigkeit keine Aufnahme.",
      "In der Psychotraumatologie: keine Behandlung akuter unbehandelter Suchterkrankungen; aktive Sucht ist Ausschluss.",
      "Akute oder hochdosierte Benzodiazepinabhängigkeit nicht mit der Traumabehandlung vereinbar."
    ],
    "alltag": [
      "Rücksprache mit der Diätassistenz bei Histamin-, Sorbitintoleranz, Fruktosemalabsorption oder mehreren Unverträglichkeiten.",
      "Ausschließlich Einzelzimmer mit Bad, Toilette, Telefon, TV, Radio und Balkon; Telefon und TV kostenpflichtig.",
      "Teeküche mit Wasserkocher und Kühlschrank auf jeder Station.",
      "Nachtruhe ab 22:00 Uhr; Rauchen nur am ausgewiesenen Außenplatz (auch E-Zigaretten).",
      "Keine privaten Elektrogeräte wie Wasserkocher, Heizlüfter, Kaffeemaschinen oder Bügeleisen; E-Bike-Akkus nicht laden.",
      "Mittagessen: zwei Menüs zur Wahl, Bestellung am Terminal; vegetarisch, glutenfrei und laktosearm nach ärztlicher Diagnose."
    ],
    "therapieHinweise": [
      "Psychosomatische Rehabilitation und Krankenhausbehandlung, inkl. Traumafolgestörungen.",
      "Stabile Substitution bzw. ärztlich verschriebene Opioide nach Vorgespräch möglich, wenn kein instabiler Beikonsum vorliegt."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung zu persönlichen, finanziellen, beruflichen und sozialrechtlichen Fragen; Termine in Psychosomatik und Psychotraumatologie über die behandelnden Therapeutinnen und Therapeuten."
    ],
    "factsExtra": [
      "Geplante vollstationäre Krankenhausbehandlung nach § 39 SGB V, keine Reha- oder Kuranstalt.",
      "Haus Luitpold: freies WLAN und kostenfreier Parkplatz; Hauptklinikzimmer ohne WLAN.",
      "Anmeldung mit Anmeldebogen, Vorbefunden und Krankenhauseinweisung; gesetzlich Versicherte ohne vorherige Kostenzusage."
    ],
    "wahlleistungenHinweis": "PRIMA-Wahlleistungen für Privatversicherte und Selbstzahler (u. a. PRIMA ambiente und ambiente plus). Übernachtung einer Begleitperson auf zustellbarer Schlafcouch mit Frühstück oder Vollpension nach Buchung an der Rezeption. Begleitpersonen nehmen nicht an Therapien teil."
  },
  "ck-isargrund": {
    "kontraindikationen": [
      "Schwere körperliche Erkrankung ohne regelmäßige Therapieteilnahme.",
      "Ausgeprägte hirnorganische Beeinträchtigung ohne regelmäßige Therapieteilnahme.",
      "Akute Suizidalität; akute Psychose.",
      "Vorrangige Abhängigkeit von illegalen Drogen.",
      "Zöliakie.",
      "Polytoxe Abhängigkeit illegaler Drogen oder intravenöser Konsum: keine Aufnahme."
    ],
    "alltag": [
      "20 Einzel- und 20 Zweibettzimmer, jeweils mit Dusche und WC.",
      "Fahrradausleihe für Touren und Einkauf im Dorfladen; im Winter Skier.",
      "Haustierkonzept: Unterbringung mit dem eigenen Haustier nach Konzept.",
      "Regionalkonzept: Realitätserprobung am Wohnort alle zwei Wochen ab dem 5. Therapiewochenende bis spätestens zwei Wochen vor Therapieende.",
      "Sechs Zimmer für Patientinnen und Patienten mit Haustieren reserviert.",
      "Am Aufnahmetag Gepäck- und ggf. Fahrzeugkontrolle auf verbotene Substanzen."
    ],
    "sozialdienstLeistungen": [
      "Berufliche Reha-Beratung zur Wiedereingliederung.",
      "Praktikumsplätze in Klinikabteilungen zur Förderung der Grundarbeitsfähigkeit.",
      "Wöchentliche Sozialdienstsprechstunde.",
      "Unterstützung bei Arbeitslosengeld, Wohnungs- und Versorgungsämtern, Schuldenregulierung.",
      "Beistand bei Gerichtsverfahren, Ehescheidung, Wohnungs- und Arbeitssuche.",
      "Berufliche Reha-Beratung, Bewerbungstraining, interne Praktika in Haustechnik, Hauswirtschaft und Küche."
    ],
    "therapieHinweise": [
      "Gruppen- und Einzelpsychotherapie, Arbeits- und Beschäftigungstherapie, Sporttherapie.",
      "MPU-Vorbereitung öffentlich genannt.",
      "Nahtlosverfahren aus der Entzugsklinik; bei längerer Abstinenz genügt eine Hausarztbescheinigung statt frischer stationärer Entgiftung.",
      "Vorherige stationäre Entgiftung; bei länger bestehender Abstinenz genügt eine hausärztliche Bescheinigung.",
      "Nahtlosverfahren: direkter Übergang aus der Entzugsklinik.",
      "MPU-Vorbereitung mit anerkanntem Verkehrspsychologen; Aufenthalt für suchtmittelabhängige Paare."
    ],
    "factsExtra": [
      "Zöliakie ist öffentlich als Aufnahmeausschluss genannt.",
      "Zusätzlicher Konsum illegaler Drogen in der Vorgeschichte sowie nicht stoffliche Zweitdiagnosen (Glücksspiel, Internet, Kaufsucht) möglich.",
      "Klinikeigene externe Adaption Haus am Schneeberg in Aschaffenburg mit acht Behandlungsplätzen."
    ],
    "mitbehandlungHinweis": "Internistische, orthopädische und neurologische Befunde werden mitbetreut, ggf. über Fachärzte in der Umgebung."
  },
  "ck-johannesbad-adaption-dortmund": {
    "alltag": [
      "Adaption auf dem Gelände des Berufsförderwerks Dortmund; Schwerpunkt berufliche Teilhabe.",
      "Einzelappartements mit eigenem Balkon und Bad, TV- und Internetanschluss, kleinem Kühlschrank.",
      "Acht Gemeinschaftsküchen zur Selbstversorgung; kostenfreies WLAN.",
      "Keine Fernsehgeräte gestellt, eigener Fernseher am Anschluss möglich; eigenen Fön mitbringen.",
      "Rauchen im Gebäude, in Zimmern und auf Balkonen nicht gestattet; ausgewiesene Außenbereiche.",
      "Keine Haustiere; keine Patientenparkplätze; U-Bahn-Haltestelle Hacheney in unmittelbarer Nähe."
    ],
    "factsExtra": [
      "40 Behandlungsplätze; Kooperation mit dem BFW Dortmund seit 2018.",
      "U49-Endhaltestelle Hacheney in unmittelbarer Nähe.",
      "Keine eigene öffentliche Pack- oder Ausschlussliste auf der Standortseite gefunden.",
      "Zertifiziert nach DIN EN ISO 9001:2015 und DEGEMED/FVS.",
      "Handtücher vorhanden, Bademäntel nicht.",
      "Eigene Bügeleisen und Wasserkocher nicht mitbringen."
    ],
    "sozialdienstLeistungen": [
      "Klinischer Sozialdienst am Standort.",
      "Unterstützung beim Wohnortwechsel; Vernetzung mit BFW, Arbeitsverwaltung, Betrieben und Suchthilfe.",
      "Aufnahmefragebogen in der Regel mit Unterstützung des Sozialdienstes der abgebenden Entwöhnungsklinik."
    ],
    "therapieHinweise": [
      "Adaptionsdauer in der Regel 12 bis 16 Wochen je nach Kostenträger.",
      "Diagnostische und Trainingsmöglichkeiten im Berufsförderungswerk; nach Kostenzusage optional Telefonkonferenz mit der Bezugstherapie der abgebenden Klinik.",
      "Adaption nach regulär abgeschlossener Entwöhnungsbehandlung Phase 1; Schwerpunkt berufliche Teilhabe.",
      "Nutzung von Fitnessstudio und Mehrzweckhalle des BFW; externe Praktika.",
      "Individuelle Zugangsbeschränkungen bei pathologischem Online-Glücksspiel oder Mediensucht.",
      "Erstgespräch, optional mit Hausbesichtigung; Behandlung beihilfefähig, Selbstzahlende möglich."
    ],
    "kontraindikationen": [
      "Akut stationär behandlungsbedürftige allgemeinmedizinische, internistische, neurologische oder psychiatrische Erkrankung, insbesondere produktive Psychose.",
      "Akute Suizidalität; schwere hirnorganische Beeinträchtigungen.",
      "Nicht ausreichende deutsche Sprachkenntnisse für die medizinische Rehabilitation Sucht.",
      "Pflegebedürftigkeit, schwere Mobilitätsstörung (Rollstuhl), schwerste Sehstörung.",
      "Substitutionsbehandlung bei Aufnahme der Adaption; keine Begleitkinder."
    ]
  },
  "ck-johannesbad-fuessing": {
    "sozialdienstLeistungen": [
      "Beratung und Einleitung der Nachsorge bzw. nachfolgender ambulanter Therapie.",
      "Vermittlung bei Komplikationen im sozialen Umfeld, z. B. am Arbeitsplatz.",
      "Partner- und Familiengespräche im Therapieangebot.",
      "IRENA und Tele-IRENA, RV Fit am Standort.",
      "Informationen für Begleitpersonen im Servicemenü."
    ],
    "therapieHinweise": [
      "Einzel- und Gruppengesprächs-Psychotherapie: tiefenpsychologisch fundiert, Verhaltenstherapie, systemische und Familientherapie.",
      "Körper-Tanz-Therapie, Kunst- und Gestaltungstherapie; Entspannung u. a. Funktionelle Entspannung, Fantasiereisen, progressive Muskelrelaxation nach Jacobson.",
      "Integrierte Bädertherapie im Thermal-Mineralwasser der hauseigenen Johannesbad Therme.",
      "Keine orthopädischen oder schmerzmedizinischen Konsultationen innerhalb der psychosomatischen Fachabteilung.",
      "Reha-Abteilung Psychosomatische Medizin/Psychotherapie neben Orthopädie, Urologie und Schmerz.",
      "Getrennte Akut-Psychosomatik im Haus."
    ],
    "mitbehandlungHinweis": "Die psychosomatische Fachabteilung behandelt auch seelische Folgen chronischer körperlicher Erkrankungen. Medikamentöse Behandlung und Soziotherapie sind Teil des Therapieplans.",
    "alltag": [
      "Standardzimmer sowie Komfortzimmer und Wohlfühlzimmer für Zwei gegen Aufpreis laut Zimmerseiten.",
      "Anschluss an die Johannesbad Therme; stationär, teilstationär und ambulant möglich."
    ],
    "factsExtra": [
      "Getrennte Akut-Psychosomatik im Haus; Heilverfahren, AHB, teilstationär/ambulant."
    ],
    "wahlleistungenHinweis": "Komfortzimmer und Wohlfühlzimmer für Zwei als kostenpflichtige Zimmerkategorien veröffentlicht."
  },
  "ck-johannesbad-nuernberg": {
    "alltag": [
      "Schließfächer und PC-Arbeitsplätze; barrierefreier Eingang, Aufzug und Treppenlift.",
      "Handys und Laptops nur in therapiefreien Zeiten.",
      "Spielen um Geld nicht gestattet; Rauchen auf ausgewiesenem Platz.",
      "Therapiegruppe bis 20 Personen; wechselnde Wochenpläne aus Therapie-Modulen.",
      "Mo–Fr 8:30–12:00 und 13:00–17:00 Uhr, Sa 8:30–12:30 Uhr; Teilnahme am Mittagessen vorgesehen.",
      "Fahrzeit in der Regel bis 45 Minuten; intaktes häusliches Umfeld."
    ],
    "sozialdienstLeistungen": [
      "Klinische Sozialarbeit zu sozialrechtlichen und finanziellen Fragen sowie Umgang mit Ämtern.",
      "Vorbereitung der Nachsorge, Kontakt zu Selbsthilfe und Nachsorgeeinrichtungen.",
      "Berufliche Reintegration: Praktika, EDV-Grundlagenkurs, Bewerbungstraining.",
      "Angehörigenarbeit: Paar- und Familiengespräche."
    ],
    "factsExtra": [
      "Zur Aufnahme u. a. aktueller Arztbericht inkl. Medikamentenbericht und Laborwerten, Sozialbericht der Suchtberatungsstelle und Kostenzusage.",
      "Grund-Abstinenzfähigkeit in der therapiefreien Zeit ist Aufnahmevoraussetzung laut Klinikseite.",
      "Besichtigung nur nach Termin; unangekündigte Alkohol- und Drogentests möglich."
    ],
    "wahlleistungenHinweis": "Für Beamtinnen und Beamte beihilfefähig nach den Beihilfevorschriften des Bundes und der Länder. Selbstzahlerinnen und Selbstzahler werden aufgenommen.",
    "kontraindikationen": [
      "Akute Selbst- oder Fremdgefährdung.",
      "Akute Psychose.",
      "Akute Suizidalität.",
      "Fehlende Rehabilitationsfähigkeit."
    ],
    "therapieHinweise": [
      "Psychotherapie als Einzel- und Gruppentherapie.",
      "Fachärztliche Mitbetreuung und Beratung.",
      "Bei Alkoholabhängigkeit wird eine Entzugsbehandlung ca. 7 Tage vor Aufnahme empfohlen, nicht als Pflicht ausgewiesen."
    ],
    "mitbehandlungHinweis": "Ausstellung von Rezepten, Verordnungen oder Überweisungen ist in der Einrichtung nicht möglich; Dauermedikation über die betreuende Arztpraxis."
  },
  "ck-johannesbad-saarschleife": {
    "alltag": [
      "Standard: Einzel- oder Doppelzimmer ca. 22 m² mit Telefon, TV (gegen Gebühr) und meist Balkon, Dusche/WC.",
      "Handtuch und Duschtuch auf dem Zimmer, Wechsel in der Regel montags und freitags; eigene Handtücher möglich.",
      "Nichtraucher in Innenräumen, Zimmern, Balkonen und vor Ein-/Ausgängen; Rauchen im Bistro-Außenbereich und Innenhof.",
      "Waschmaschinen gegen Münze; Bügeleisen gegen Kaution an der Rezeption.",
      "Haustiere nicht gestattet; Tierpension im Nachbarort genannt."
    ],
    "sozialdienstLeistungen": [
      "Sozialrechtliche Beratung und Beantragung von Leistungen, Schwerbehindertenrecht, Kranken- und Pflegeversicherung.",
      "Beratung zu Teilhabe am Arbeitsleben, Erwerbsminderung und beruflicher wie medizinischer Rehabilitation.",
      "Wirtschaftliche Absicherung (Lohnfortzahlung, Übergangsgeld, Krankengeld).",
      "Vermittlung an Integrationsfachdienst, Reha- und Rentenberatung sowie zu Vorsorgevollmacht und Patientenverfügung.",
      "Hilfe bei Pflegegrad, Pflegegeld, Hausnotruf und Vermittlung von Pflegedienst, Haushaltshilfe oder Essen auf Rädern.",
      "Information zu ambulanter, teilstationärer und vollstationärer Weiterversorgung, ggf. Heimplatzvermittlung."
    ],
    "therapieHinweise": [
      "Psychosomatik: Einzel- und Gruppentherapie, Entspannung, Qi Gong, Yoga, Kreativ- und Sporttherapie.",
      "Multimodale Schmerztherapie (Pharmakotherapie, Psychologie, Physiologie, medizinische Trainingstherapie, Sozialberatung).",
      "Schwerpunkte u. a. chronischer Schmerz/Fibromyalgie, Lebenskrisen, Erschöpfung/Burnout, Depression.",
      "Am Standort ergänzend Orthopädie, Neurologie und Europäisches Zentrum für TCM.",
      "Abteilung Psychosomatische Medizin und Psychotherapie: u. a. Depression/Burnout, Lebenskrisen, chronischer Schmerz/Fibromyalgie, Angst/Panik, Zwang, Persönlichkeitsstörungen.",
      "Am Standort zusätzlich Orthopädie, Neurologie und Europäisches Zentrum für TCM (u. a. Schmerz, Stress, Magen-Darm, Immunschwäche)."
    ],
    "factsExtra": [
      "WLAN in Zimmern und ausgewählten öffentlichen Bereichen kostenfrei.",
      "Cloef-Bad mit Bäderlandschaft und Sauna am Standort Orscholz.",
      "Barrierefreie Zimmer und Allergikerzimmer auf Anfrage; Fön nur in Komfort und Suite, sonst gegen Kaution.",
      "Versorgungsvertrag § 111 SGB V; Belegung u. a. DRV, GKV, PKV, Beihilfe, BG; PKV-Einstufung als Gemischte Anstalt.",
      "Cloef-Bad mit Kursangebot und Fitnessraum am Standort Orscholz.",
      "Getrennte Akutpsychosomatik im Fachkrankenhaus am selben Träger, nicht identisch mit der Reha-Abteilung."
    ],
    "wahlleistungenHinweis": "Classic-Zimmer gegen Aufpreis, Komfort-Zimmer und Suite höherpreisig. TV und Telefon im Zimmer gegen Gebühr. Parkplatz für Patientinnen und Patienten gegen Tagessatz, Tiefgarage nach Reservierung. Premium-Servicepaket als PDF ausgewiesen."
  },
  "ck-kadesch-herne": {
    "alltag": [
      "Ganztägig ambulante Reha setzt ein relativ intaktes Wohnumfeld voraus und bleibt alltagsnah.",
      "Stundenweise Beschäftigung in Arbeitsbereichen der Einrichtung und berufsorientierte Praktika strukturieren den Tag.",
      "Abstinenz im direkten Kontakt mit Familie, Partnerschaft und Selbsthilfe festigen.",
      "Adaption und GAR am Standort Hauptstraße 94; nach Adaption Wohnplätze in der Wohngemeinschaft der sozialen Rehabilitation.",
      "Adaption und ganztägig ambulante Rehabilitation am Standort Hauptstraße 94."
    ],
    "sozialdienstLeistungen": [
      "Familiengespräche mit Partnerinnen und Partnern, Eltern und Kindern.",
      "Zusammenarbeit mit Betrieben und Einrichtungen der beruflichen Integration, ggf. Reha-Fachberater:in.",
      "Externe Arbeits- und Belastungserprobung, Betriebspraktika und berufliche Bildungsmaßnahmen in der Adaption.",
      "Nachsorge (ARS-N): wöchentliche Einzel- und Gruppengespräche, Bezugspersonengespräche, Unterstützung bei Wiedereingliederung.",
      "Familiengespräche mit Partner:innen, Eltern, Kindern.",
      "Zusammenarbeit mit Einrichtungen zur beruflichen Integration und Betrieben, ggf. Reha-Fachberater:in."
    ],
    "therapieHinweise": [
      "GAR als Entwöhnung mit wöchentlichen Einzel- und Gruppengesprächen.",
      "Substitutionsgestützte GAR möglich (Klinik nennt Obergrenze unter 60 mg Methadon); Beikonsumfreiheit vor Beginn der Maßnahme.",
      "Eigene Eingangsphase für Substituierte, um Belastbarkeit für das volle Programm aufzubauen.",
      "Adaption als letzte Phase der stationären medizinischen Rehabilitation bei besonderem weitergehendem Bedarf.",
      "Wöchentliche Einzel- und Gruppengespräche; Fortführung der medizinischen, psychotherapeutischen und suchttherapeutischen Behandlung.",
      "Krisenintervention während der Adaption."
    ],
    "factsExtra": [
      "Zertifizierung BAR deQus und AZAV; federführend DRV Westfalen.",
      "Aufnahme und Assistenz über Daniela Santoro (MFA); therapeutische Leitung Fabian Peters.",
      "Adaption als letzte Phase der stationären medizinischen Rehabilitation bei besonderem weitergehendem Bedarf.",
      "Ganztägig ambulante medizinische Rehabilitation und Nachsorge am selben Trägerstandort."
    ]
  },
  "ck-kaisberg": {
    "alltag": [
      "Stationär: 1-Bett-Zimmer mit eigenem Bad sowie 2-Bett aus zwei 1-Bett-Wohneinheiten mit gemeinsamem Bad.",
      "Gemeinschaftsräume, Mensa, Ruheräume; TV, Notebook, Internetanschluss.",
      "Adaption: Einzelappartements mit kleiner Küche und Selbstverpflegung.",
      "Einbettzimmer mit eigenem Bad; Zweibettzimmer als zwei Einbett-Wohneinheiten mit gemeinsamem Bad.",
      "Internetanschluss per Kabel auf den Zimmern; eigenes TV-Gerät und Notebook möglich.",
      "Gemeinschaftsräume mit TV, Kaffee- und Teebar; Mensa und Ruheräume."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung zu beruflichen, rechtlichen und sozialen Angelegenheiten.",
      "Bewerbungstraining, EDV-Kurse, Praktika; Vermittlung in Nachsorge.",
      "Individuelle Beratung bei beruflichen, rechtlichen und sozialen Angelegenheiten.",
      "Vermittlung in Nachsorge; ambulant betreutes Wohnen im Trägerverbund."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutische Basis: Gruppe, Einzel, Paar/Familie, achtsamkeitsbasierte Rückfallprophylaxe, soziale Kompetenzen, Skills, Trauma, ADHS.",
      "Arbeits- und Ergotherapie inkl. Lehrküche und Handwerk; Sporttherapie; Ohrakupunktur.",
      "Verhaltenstherapeutisches Konzept; Paar- und Familientherapie; genderspezifische Gruppen.",
      "Skillstraining, traumatherapeutische Verfahren, ADHS-Behandlung, Achtsamkeit.",
      "Arbeitstherapie mit Lehrküche, Handwerk, EDV, Bewerbungstraining und externen Praktika.",
      "Ohrakupunktur nach Seeber; Hypnose und progressive Muskelrelaxation."
    ],
    "factsExtra": [
      "36 stationäre Plätze, 6 Adaptionsplätze; ganztägig ambulant möglich.",
      "Selbsthilfegruppe „Sober“ donnerstags im Klinikgebäude.",
      "Paaraufnahme ab 18 Jahren genannt.",
      "Aufnahme von Frauen, Männern und Paaren ab 18 Jahren, Schwerpunkt Drogenabhängigkeit.",
      "Eigene Selbsthilfegruppe; kulturspezifische Gruppen.",
      "Kostenträger u. a. DRV Westfalen, DRV Bund, Krankenkassen und überörtliche Sozialhilfeträger."
    ],
    "mitbehandlungHinweis": "Nebenindikationen u. a. Alkohol, Verhaltenssüchte, Angst/Zwang, Belastung, Persönlichkeitsstörungen, Depression, Nikotin, Essstörungen, ADHS.",
    "kontraindikationen": [
      "Am Aufnahmetag drogenfrei mit Abstinenznachweis; die Klinik nennt eine kurze Mindestabstinenz vor Anreise.",
      "Zahnsanierung sollte zum Aufnahmezeitpunkt erfolgt sein."
    ]
  },
  "ck-kamillushaus": {
    "factsExtra": [
      "Stationäre Rehabilitation Sucht im Verbund Katholische Kliniken Ruhrhalbinsel / Contilia.",
      "Ganztägig ambulante Therapie zusätzlich zur stationären Reha genannt.",
      "Hausordnung über die Trägerseite verlinkt; keine öffentliche Unterlagenliste auf der Reha-Unterseite."
    ],
    "alltag": [
      "Besuch an Samstagen, Sonntagen und Feiertagen 13–18 Uhr; höchstens vier Personen; Kinder unter 12 Jahren nur in Begleitung Erwachsener.",
      "Aufenthalt von Besuch in Patientinnen- und Rehabilitandenzimmern nicht gestattet.",
      "Rauchen nur in gekennzeichneten Außenbereichen; E-Zigaretten mit austauschbaren Liquids untersagt.",
      "Handys und Tablets während der Therapiegruppen nicht nutzen; private Elektrogeräte außer Kommunikationsmitteln und medizinisch notwendigen Geräten nicht gestattet.",
      "Haustiere mitbringen oder füttern nicht gestattet; Glücks- und Kartenspiele mit Geldeinsatz nicht gestattet."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung und Beratung zur beruflichen Wiedereingliederung (Arbeitstherapie BORA).",
      "Paar- und Familiengespräche im stationären Reha-Programm.",
      "Eilantrag auf nahtlos anschließende Rehabilitation bereits während des Qualifizierten Entzugs im Haus möglich."
    ],
    "therapieHinweise": [
      "Stationäre Entwöhnung für Erwachsene mit Alkohol- und/oder Medikamentenabhängigkeit; Dauer laut Klinikseite zwischen sechs und sechzehn Wochen.",
      "Indikative Gruppen u. a. Soziales Kompetenztraining, Rückfallprophylaxe, Depressions- und Angstbewältigung; Frauen- und Männergruppe; traumaspezifische Angebote.",
      "Ergo- und Kunsttherapie, Sporttherapie, Entspannungstechniken, Ernährungsberatung mit Lehrküche, Ohr-Akupunktur."
    ],
    "mitbehandlungHinweis": "Psychische Begleiterkrankungen wie Depression, posttraumatische Belastungsstörung, Angststörungen, AD(H)S und Persönlichkeitsstörungen werden im Reha-Konzept mitbehandelt."
  },
  "ck-kandertal": {
    "therapieHinweise": [
      "Psychosomatische Reha für Erwachsene, Jugendliche ab 16 Jahren und Familien.",
      "Familienrehabilitation: gesamte Familie, wenn ein Elternteil oder ein Kind betroffen ist.",
      "Essstörungen und Migrationskonzept öffentlich genannt.",
      "Medizinisch-berufliche Orientierung (MBOR / Belastungserprobung) ist Teil der psychosomatischen Reha.",
      "Psychosomatische Reha in der Regel vier Wochen; Verlängerung bei medizinischer Notwendigkeit über die Klinikärztin bzw. den Klinikarzt.",
      "Migrationskonzept: Deutschkenntnisse sind Voraussetzung, keine Behandlung in der Muttersprache."
    ],
    "alltag": [
      "Haus Blauen: 40 Einzelzimmer mit Dusche, WC, TV und Telefon für Jugendliche und Erwachsene.",
      "Haus Schweizerblick: 52 Familien-Appartements mit Dusche, WC, TV, Telefon und Babyfon.",
      "Hallen-/Bewegungsbad, Sauna, Sport- und Bewegungshalle, Lehrküche, Kegelbahn, Tennisplatz und Minigolf.",
      "Vollwertkost nach DGE; vegetarisch und Sonderkost (u. a. gluten-, laktose-, diabetes- und fructosefrei, schweinefleischfrei) nach Absprache vor Rehaantritt; keine Halal-Speisen.",
      "Telefon weltweit und in Mobilfunknetze ohne Gebühr."
    ],
    "factsExtra": [
      "Lage auf 850 Metern am Fuße des Hochblauen im Südschwarzwald.",
      "Träger Kur + Reha GmbH; Kooperation mit der benachbarten Rehaklinik Birkenbuck (u. a. suchtbelastete Familien).",
      "Reha U25 für 16- bis 25-Jährige mit altersgerechten Themen."
    ],
    "wahlleistungenHinweis": "WLAN 5 Euro pro Woche oder 10 Euro für drei Wochen."
  },
  "ck-karthause": {
    "sozialdienstLeistungen": [
      "Unterstützung beim Aufbau eines ambulanten Nachsorgenetzwerks; Substitutionsambulanz am Zentrum für Suchtmedizin.",
      "Kostenträger u. a. regionale Rentenversicherung und Krankenkassen, in Einzelfällen DRV Bund und Jugendämter.",
      "Sozialpädagogische Beratung und Betreuung.",
      "Förderung elterlicher Kompetenzen und Bindung zum Kind."
    ],
    "therapieHinweise": [
      "BORA mit Bezug auf die Bedürfnisse von Eltern bei der Wiedereingliederung ins Arbeitsleben.",
      "Traumatherapeutische Begleitung bei Bedarf.",
      "Einzel- und Gruppentherapie der Suchtproblematik; Paartherapie und Angehörigenarbeit.",
      "Arbeits-, Sport- und Ergotherapie; psychotherapeutische Behandlung der Kinder zusammen mit den Eltern.",
      "Mit und ohne begleitende Substitutionsbehandlung."
    ],
    "factsExtra": [
      "Anerkennung nach § 35 BtMG.",
      "Therapiedauer in der Regel 5,5 Monate.",
      "Für Schwangere, Mütter und Paare mit Kindern unter sechs Jahren; auch wenn Kinder aktuell nicht im Haushalt leben bzw. rückgeführt werden sollen.",
      "Vorbereitende Maßnahmen auf Entgiftungsstation 19c des Zentrums für klinische Suchtmedizin möglich.",
      "Nach Abschluss einzeltherapeutische Maßnahmen und Drogenscreening weiter möglich.",
      "Terminvergabe über die Zentrale Belegungssteuerung der medbo."
    ],
    "alltag": [
      "Therapeutische Gemeinschaft mit Schwerpunkten Wohnen, Arbeit und Freizeit.",
      "8 Plätze, davon 6 voll- und 2 teilstationär; Kinder unter sechs Jahren nach Absprache."
    ]
  },
  "ck-kieferngarten": {
    "alltag": [
      "Wohnen in Ein- oder Zweizimmer-Apartments mit eigener Küche; Selbstversorgung.",
      "Garten und große Dachterrasse; U-Bahn Kieferngarten (U6) fußläufig.",
      "Einkaufsmöglichkeiten und öffentliche Sportanlagen in der Nachbarschaft.",
      "Therapeutische Wohngemeinschaften in München-Kieferngarten.",
      "20 vollstationäre und 2 ganztägig ambulante Plätze.",
      "Infotermin vor Ort; bei längerer Anreise Übernachtung als Gast möglich."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei Praktikum- und Arbeitssuche; Bewerbungsunterlagen in Arbeitskompetenzgruppen.",
      "Vor dem Infotermin: Lebenslauf, Suchtverlauf und Therapiereflexion; zum Aufnahmetermin Kostenzusage (auch telefonisch erteilt).",
      "Eigenes Nachsorgeprojekt TWG Kieferngarten im Anschluss an die Adaption.",
      "Anerkennung nach §§ 35/36 BtMG; federführend DRV Bayern Süd."
    ],
    "therapieHinweise": [
      "Adaption in der Regel 12–16 Wochen nach abgeschlossener Entwöhnung; nahtloser Übergang.",
      "Mindestens vier- bis sechswöchiges Praktikum; Arbeitskompetenzgruppen mit Bewerbungstraining.",
      "Doppeldiagnosen im Aufnahmeprofil genannt."
    ],
    "factsExtra": [
      "DO-QUA.R-zertifiziert 18.03.2024–17.03.2027.",
      "Träger Deutscher Orden.",
      "Alter 18–60; Alkohol, Drogen, Medikamente und Glücksspiel."
    ]
  },
  "ck-kirchberg": {
    "therapieHinweise": [
      "Abteilung Psychosomatik/Psychotherapie neben Kardiologie und Orthopädie.",
      "Chefärztin Psychosomatik Dr. med. Kirsten Buchenau.",
      "Bezugstherapeutin bzw. Bezugstherapeut (Psychologie) plus somatische Ärztinnen und Ärzte analog Hausarztrolle.",
      "Gruppen- und Einzelpsychotherapie mit tiefenpsychologischen, verhaltenstherapeutischen und systemischen Anteilen; Psychoedukation u. a. zu Angst, Depression und Schmerz.",
      "Spezifisches dreiwöchiges psychosomatisches Angebot für Polizei, feuerwehrtechnischen Dienst und Bundeswehr (Bereich psychosomatik-gz)."
    ],
    "kontraindikationen": [
      "Akute Suizidalität, akute Psychosen oder Manien.",
      "Aktuell nicht trockene bzw. nicht clean substanzbezogene Abhängigkeit.",
      "Vorrangig akutmedizinischer psychiatrischer Behandlungsbedarf: Klinik verweist auf ein psychiatrisches Krankenhaus.",
      "Wesentliche körperliche Diagnostik und Ausschluss gravierender organischer Ursachen sollen vor der stationären Aufnahme erfolgt sein."
    ],
    "alltag": [
      "Einzelzimmer mit eigener Nasszelle, Balkon, Durchwahltelefon, TV, Zimmersafe und WLAN laut Qualitätsbericht.",
      "Unterbringung einer Begleitperson grundsätzlich möglich; Lebenspartnerinnen und Lebenspartner können nach Möglichkeit in den therapeutischen Prozess einbezogen werden.",
      "Gästeinformation in Deutsch, Englisch und Türkisch.",
      "Aufnahme von Patientinnen und Patienten bis 150 kg laut Qualitätsbericht möglich."
    ],
    "sozialdienstLeistungen": [
      "Beratung zur beruflichen Re-Integration und zu finanziell-existentiellen Fragen.",
      "Beratung zu Leistungen der Pflegekasse; Vermittlung zu Ämtern und Behörden, u. a. Schwerbehindertenausweis.",
      "Entlassmanagement in Abstimmung von Sozialdienst und Ärztin bzw. Arzt; Wiedereingliederung nach ärztlicher Einschätzung."
    ],
    "factsExtra": [
      "Zertifizierung DIN EN ISO 9001:2015 und DEGEMED (Auditleitfaden 6.0) laut Qualitätsbericht.",
      "Akutversorgung und Rehabilitation unter einem Dach (Gesundheitsunternehmen Gollée); nahtloser Wechsel ins Reha-Zimmer ohne Betreuungswechsel laut Klinik.",
      "Patienten-App EMENTO zur Terminzu- bzw. -absage, zu Fragebögen und zur Einreichung von Vorbefunden."
    ]
  },
  "ck-klinik-rhoen": {
    "alltag": [
      "Anreise am Aufnahmetag zwischen 10:30 und 12:30 Uhr; Mittagsverpflegung möglich.",
      "Rauchen nur im Raucherpavillon, auch E-Zigarette; bei Rauchen im Zimmer Reinigungspauschale 175 Euro.",
      "160 Zimmer, sieben als Zweibettzimmer für Begleitkinder nutzbar; Duschbad, Telefon, Fernseher.",
      "Regelhaft Einzelzimmer; Doppelzimmer für Rehabilitanden mit Begleitperson.",
      "Kostenloses WLAN im gesamten Haus; überwiegend barrierefreie Nichtraucherzimmer."
    ],
    "sozialdienstLeistungen": [
      "Sozial-, Reha- und Rentenberatung.",
      "Stufenweise Wiedereingliederung aus der Reha heraus möglich.",
      "Psy-RENA-Nachsorge mit 25 Terminen inkl. Aufnahme- und Abschlussgespräch; IRENA."
    ],
    "therapieHinweise": [
      "Offenes Gruppenkonzept.",
      "MBOR mit Testdiagnostik, indikativer Gruppe und Arbeitstherapie am PC.",
      "Begleitkinder 3–12 Jahre nach Absprache und Verfügbarkeit."
    ],
    "factsExtra": [
      "QMS-REHA zertifiziert.",
      "Stationär und ambulant möglich."
    ],
    "mitbehandlungHinweis": "Begleiterkrankungen aus Ernährung/Stoffwechsel, Herz-Kreislauf und Verdauungssystem werden mitbehandelt; Dialyse in Bad Kissingen nach Vorabsprache möglich."
  },
  "ck-klinik-saale": {
    "alltag": [
      "Besuch auf den Zimmern aus therapeutischen Gründen unerwünscht; Übernachtung externer Besucher im Haus nicht möglich.",
      "Rauchen nur in der Raucherzone im Garten; bei Rauchen im Zimmer Reinigungspauschale 175 Euro, wiederholter Verstoß kann zur Entlassung führen.",
      "Regelhaft Einzelzimmer; Doppelzimmer für Begleitpersonen.",
      "Kostenloses WLAN im gesamten Haus; Fernseher in allen Zimmern.",
      "Waschmaschine und Trockner mit Wertmarken (2,50 Euro am Empfang).",
      "Begrenzte kostenpflichtige Parkplätze im Parkhaus."
    ],
    "sozialdienstLeistungen": [
      "Sozial-, Reha- und Rentenberatung.",
      "Nachsorge stufenweise Wiedereingliederung und/oder IRENA."
    ],
    "therapieHinweise": [
      "Offenes Gruppenkonzept, tiefenpsychologisch orientiert, durch Einzelgespräche ergänzbar.",
      "Duale Reha Diabetologie und Psychosomatik als Modellprojekt der DRV, begrenzte Plätze.",
      "DDG-konforme Diabetes-Schulungen; zertifizierte Ernährungsfachklinik der DAEM."
    ],
    "factsExtra": [
      "Rund 100 Schulungsveranstaltungen.",
      "Begleitpersonen nach Absprache für die komplette Rehadauer.",
      "Kinderbetreuung auf der Klinikseite genannt."
    ],
    "mitbehandlungHinweis": "Dialyse in Bad Kissingen nach Vorabsprache möglich; kardiologische, diabetologische und psychosomatische Schulungen im Haus."
  },
  "ck-klosterwald": {
    "alltag": [
      "Schwimmbad, Fitnessraum, Fernsehräume, Computerkabinett; barrierefrei und behindertengerecht.",
      "Pflege nutzt alltagsnahe Aktivitäten zur Selbstständigkeitsförderung.",
      "Besuch nach der ersten Woche in öffentlichen Bereichen: Mi/Fr 14:30–17:30, Sa 12:30–17:30, So 08:45–17:30 Uhr.",
      "Ausgang ab dem 4. Tag: Mo–Fr 14:30–21:00, Sa 12:30–21:00, So 08:45–21:00 Uhr; Eintrag ins Ausgangsbuch.",
      "Patientenzimmer als Rückzugsort; gegenseitige Zimmerbesuche nicht gestattet. Bildschirme bis 24 Zoll möglich.",
      "WLAN kostenfrei; Fahrradverleih und Mitbringen eigener Fahrräder mit sicherer Verwahrung."
    ],
    "sozialdienstLeistungen": [
      "Berufsfördernde Maßnahmen: Adaption, stufenweise Wiedereingliederung, Leistungen zur Teilhabe am Arbeitsleben.",
      "Case-Management: u. a. Übergangsgeld, Bürgergeld, Patientenkonto, GdB, Schuldenregulierung und stufenweise Wiedereingliederung.",
      "Tägliche Sozialdienstsprechstunden; Kontakt zu Sozialamt, Jobcenter, Justiz, Wohnheim und Adaption.",
      "Basisdokumentation in der ersten Woche (Wohnform, Schulden, Betreuung, soziale Problemlagen)."
    ],
    "therapieHinweise": [
      "Gruppen- und Einzeltherapie tiefenpsychologisch und verhaltenstherapeutisch.",
      "Kurzzeittherapie und Kombinationsbehandlung zusätzlich zur Regelzeit 13 Wochen."
    ],
    "factsExtra": [
      "112 stationäre Plätze; Diakonische gGmbH der Bethanien Diakonissen-Stiftung.",
      "Direktverlegung aus Entgiftung mit klinikeigenem Verfahren genannt.",
      "Klinikeigener Fahrdienst zur Abholung aus der Entgiftung oder vom Bahnhof Hermsdorf-Bad Klosterlausnitz.",
      "Bei Aufnahme Atemalkoholkontrolle; bei positivem Befund Entscheidung über Aufnahme bzw. Verlegung in eine Entgiftungseinrichtung.",
      "Abstinenz von Alkohol, abhängigkeitserzeugenden Medikamenten und illegalen Substanzen bei Aufnahme."
    ],
    "kontraindikationen": [
      "Schwerwiegende somatische oder psychische Erkrankungen, die erweiterter Diagnostik oder akuter stationärer Behandlung bedürfen",
      "Akute Selbst- oder Fremdgefährdung einschließlich Suizidalität",
      "Ausgeprägte Intelligenzminderung (ICD-10 F72–F73)",
      "Erkrankungen mit fortgeschrittener Hirnleistungsminderung (z. B. Demenz)",
      "Körperliche Schädigungen oder soziale Beeinträchtigungen, die einer aktiven Teilnahme am Therapieangebot entgegenstehen",
      "Ausgeprägte Multimorbidität bzw. Erkrankungen mit hohem Pflegebedarf"
    ]
  },
  "ck-kompass-hof": {
    "kontraindikationen": [
      "Akute Psychose, akute Suizidalität, akute Traumatisierung.",
      "Unzureichende Sprachkenntnisse; reine stoffungebundene Sucht ohne Substanzabhängigkeit.",
      "Starke körperliche Behinderungen mit Pflegebedürftigkeit; Erkrankungen, die die volle Teilnahme am Therapieprogramm ausschließen.",
      "Keine Substitution; Opioide, Pregabalin, Benzodiazepine und Amphetamine im Haus nicht möglich."
    ],
    "sozialdienstLeistungen": [
      "Kontaktaufnahme vorab erwünscht; Sozialbericht im Vorfeld erbeten.",
      "Beratung bei Finanzierungsfragen und finanziellen Problemen; Unterstützung in juristischen Fragen und im Umgang mit Ämtern.",
      "Kompass Nachsorge und Kompass Soziotherapie im Trägerverbund.",
      "Aufnahme mit Therapieauflage oder Zurückstellung nach §§ 35/36 BtMG möglich."
    ],
    "therapieHinweise": [
      "Bezugstherapeutensystem; therapeutische Einzel- und Gruppengespräche; Paar- und Familiengespräche nach Absprache.",
      "Allgemeinmedizinische und psychiatrische Versorgung; Sport-, Ergo- und Arbeitstherapie.",
      "BORA: Training zur beruflichen Wiedereingliederung, Praktika, interne und externe Belastungserprobung.",
      "Kombitherapie mit stationärer Phase 8–13 Wochen zusätzlich zur Regelbehandlung genannt."
    ],
    "alltag": [
      "Überwiegend Einzelzimmer mit eigenem Bad.",
      "Sauna, Fitnessraum, Musikraum, Freizeiträume und Außenanlagen; ehemaliges Dominikanerinnenkloster Lohhof."
    ],
    "factsExtra": [
      "27 Plätze; Regelbehandlungsdauer 22–24 Wochen laut Träger.",
      "Hauptbeleger DRV Schwaben; Versorgungsvertrag § 111 SGB V; QMS Reha / ISO 9001:2015.",
      "Paare und Schwangere laut buss-Profil möglich.",
      "Drogen- und Alkoholfreiheit am Aufnahmetag zusätzlich zur abgeschlossenen Entgiftung."
    ]
  },
  "ck-korso": {
    "kontraindikationen": [
      "Alter unter 14 Jahren",
      "reiner Abnehmwunsch ohne Essstörung",
      "psychotische Erkrankungen",
      "Intelligenzminderung",
      "Asperger-Syndrom",
      "Gewichtsprobleme durch körperliche oder Magen-Darm-Erkrankungen"
    ],
    "alltag": [
      "Eigene Station für Jugendliche ab 14 Jahren; Erwachsene auf getrennter Station.",
      "Behandlung überwiegend in der Gruppe; Mahlzeiten und viele Freizeitangebote gemeinsam.",
      "Typischer Tagesbeginn kurz vor 7 Uhr mit Frühsport und/oder Wiegen; Mittagsruhe und festgelegte Haus-/Nachtruhe.",
      "Besuchstage Samstag, Sonntag und gesetzliche Feiertage; Behandlungszeit üblicherweise 5–7 Wochen.",
      "Krankenhausschule NRW vor Ort (außerhalb der Ferien).",
      "Einzel- oder Doppelzimmer mit Dusche, WC, Selbstwähltelefon und Schwesternrufanlage."
    ],
    "sozialdienstLeistungen": [
      "Sozialpädagogische Gespräche; Unterstützung bei der Planung nach der Klinik.",
      "Angehörigenseminare und angeleitete Angehörigengruppen."
    ],
    "therapieHinweise": [
      "Psychotherapie, Ergotherapie/Gestaltungstherapie, Ernährungstherapie und Körpertherapie.",
      "Betreute Mahlzeiten, Lehrküche und Therapiefrühstück; Familientherapie und Multifamilientherapie.",
      "Psychosomatisch-psychodynamisches Konzept mit therapeutischer Gemeinschaft.",
      "Basisgruppe mit vier Teilnehmenden in den ersten zwei Wochen bei besonders ausgeprägter Symptomatik.",
      "Zuordnung in eine bestehende Therapiegruppe durch die Klinik; geschlechtsdifferenzierte Erwachsenengruppen, eigene Gruppen für Jugendliche und 17- bis 20-Jährige.",
      "Realitätstraining (Alltagstage zu Hause) und Außenwohngruppen in der Schlussphase."
    ],
    "factsExtra": [
      "Johanniter-Fachklinik ausschließlich für psychosomatische Essstörungen in Bad Oeynhausen.",
      "Reha-Zulassung für DRV und GKV, keine Krankenhausbehandlung nach § 108 SGB V."
    ],
    "mitbehandlungHinweis": "Gewichtsobergrenze für eine Aufnahme 200 kg. Medizinisch-psychosomatische Diagnostik inkl. Labor und EKG im Haus.",
    "wahlleistungenHinweis": "Einbettzimmer 80 Euro pro Tag nur für Erwachsene; Chefarztbehandlung auf Wunsch (gesonderte Rechnung). Doppelzimmer zumindest für die Schutzzeit vorgesehen."
  },
  "ck-kraichtal": {
    "kontraindikationen": [
      "Therapeutisches Angebot für suchtkranke Mütter (frauenspezifisch).",
      "Akute Psychose.",
      "Akute Suizidalität.",
      "Rollstuhlpflicht; Klinik laut Trägerseite nicht für gehbehinderte Patientinnen geeignet, die auf einen Rollstuhl angewiesen sind.",
      "Keine allgemeine Zulassung nach § 35 BtMG."
    ],
    "factsExtra": [
      "Negatives Drogenscreening bei Aufnahme genannt.",
      "Bei Begleitkind ab 1 Jahr Nachweis Masern-Impfschutz.",
      "Evangelische Stadtmission Heidelberg als Träger."
    ],
    "alltag": [
      "Einzel- und Doppelzimmer mit eigenem Bad; Mutter-Kind-Zimmer mit Duschbad, bei Bedarf Baby- oder Kinderbett und Wickelkommode.",
      "Klinikinterner Kindergarten: Montag bis Freitag 8.10–11.50 Uhr, Montag bis Donnerstag zusätzlich 14.00–16.50 Uhr.",
      "Sauna an drei Abenden; Fitnessraum, Sporthalle mit Kegelbahn, Tischtennis und Poolbillard, zwei Kreativräume.",
      "Bibliothek mit Teeküche; Café Klatsch mit Sonnenterrasse."
    ],
    "sozialdienstLeistungen": [
      "Angehörigen-Seminar für Angehörige von alkoholabhängigen Patientinnen; stützende Angehörige werden nach Möglichkeit einbezogen.",
      "Bei Bedarf Organisation von Jugendamt, sozialpädagogischer Familienhilfe und nachstationärer Kinderbetreuung."
    ],
    "therapieHinweise": [
      "Integratives Konzept: vier Bezugsgruppen unabhängig von Alter und Suchtform; Indikativgruppe Verhaltenssucht für Glücksspiel, Kauf- und Medienabhängigkeit.",
      "Indikativgruppe Essstörungen und Müttergruppe zur Reflexion des Erziehungsverhaltens.",
      "Arbeitstherapie in Gärtnerei und Kleintierzoo; tiergestützte Therapie mit Ponys und Ziegen.",
      "Traumaspezifische Stabilisierung; Sport- und Entspannungstherapie."
    ]
  },
  "ck-kronsberg": {
    "alltag": [
      "Moderne Wohnhäuser im Gartenbereich der Klinik; Speisesaal im Haupthaus.",
      "Freizeit u. a. Boule, Kicker, Billard und Rasenschach.",
      "Helle Zimmer mit Bad und WC, Einzel- und Doppelzimmer, alle mit Notrufanlage.",
      "Vollständig barrierefrei, mit Auszeichnung.",
      "Tischlerei und Sporthalle mit Physioraum."
    ],
    "therapieHinweise": [
      "Budotherapie zur Selbstbehauptung; Impulskontrolltraining; Training sozialer Kompetenzen mit Videofeedback.",
      "Indikativ u. a. Intensivtherapie Depression und Trauerbewältigung, Elternschaft und Sucht, Skillstraining, Selbstfürsorge für Frauen.",
      "Lehrküche für Gastronomie und Service.",
      "BORA-basierte Ergotherapie und beruflicher WorkPark (Komplexbehandlung seit 2013).",
      "Physio- und Bewegungstherapie, Funsport, Exkursionen in Hannover.",
      "Medikation durch Fachärzt:innen für Psychiatrie/Psychotherapie und Neurologie."
    ],
    "factsExtra": [
      "Akademisches Lehrklinikum der Universität Hildesheim.",
      "Aufnahme bei leichter Intelligenzminderung (ICD-10 F70) nach vorheriger Absprache möglich.",
      "WorkPark als Alleinsteller für Berufstätige und Arbeitssuchende.",
      "Mitbehandlung u. a. spezifischer Persönlichkeitsstörungen und Impulskontrollstörungen laut Trägerseite."
    ],
    "kontraindikationen": [
      "Akute Suizidalität.",
      "Akute Psychosen.",
      "Ausgeprägte hirnorganische Störungen (Korsakow-Syndrom)."
    ],
    "sozialdienstLeistungen": [
      "Beratung zu Behörden, Geld/Finanzen und Freizeit.",
      "Paar- und Familiengespräche; Angehörigenseminar alle fünf Wochen.",
      "BEM-Begleitung und Kontakt zu Betrieb nach Einverständnis."
    ],
    "mitbehandlungHinweis": "Komorbidität somatischer Erkrankungen im Auftrag vorgesehen; Medikation nach Leitlinien, regelmäßige Medikamente vor Aufnahme mitteilen."
  },
  "ck-lago": {
    "kontraindikationen": [
      "Keine Aufnahme bei Substitution mit Opiaten.",
      "Keine Aufnahme bei Stimulantien (z. B. Ritalin), Gabapentin oder sogenannten Z-Substanzen.",
      "Akute Selbst- oder Fremdgefährdung gehört in eine psychiatrische Einrichtung."
    ],
    "mitbehandlungHinweis": "Psychotherapie verhaltens-, tiefenpsychologisch und systemisch; ggf. Paar- oder Angehörigengespräche. Sport-, Ergo-/Arbeits- und Kunsttherapie sowie Therapie mit Pferden.",
    "alltag": [
      "Musik- und Fitnessraum.",
      "Besuche am Wochenende von Beginn an möglich."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei Behördenangelegenheiten.",
      "Therapie mit Pferden."
    ],
    "therapieHinweise": [
      "Kurzzeit bis 15 Wochen mit Option ambulanter Anschluss; Langzeit bis 24 Wochen; Adaption 16 Wochen.",
      "Frauen, Männer und Paare ab 18.",
      "§ 35 BtMG."
    ],
    "factsExtra": [
      "Vorgespräch telefonisch oder vor Ort.",
      "Während der Entwöhnung kein Konsum."
    ]
  },
  "ck-landelin": {
    "kontraindikationen": [
      "Körperlicher Entzug ist Voraussetzung.",
      "Alkoholabstinenz mindestens eine Woche, Cannabis und illegale Drogen mindestens zwei Wochen vor Aufnahme.",
      "Teilnahme setzt Mobilität und Gehfähigkeit voraus.",
      "Keine akutmedizinische Behandlung oder Überwachung während der Reha; parallele Erkrankungen vorher stabilisieren.",
      "Diagnostik und Neueinstellung begleitender Erkrankungen sollen vor der Aufnahme abgeschlossen sein."
    ],
    "alltag": [
      "Klinik-Shuttle ab Herbolzheim nach Vereinbarung; Bus 261 Haltestelle Rehaklinik.",
      "Therapiebeginn im Doppelzimmer; Umzug ins Einzelzimmer im Verlauf möglich, sobald eines frei wird.",
      "Klinik barrierearm ausgewiesen; Zimmer mit Dusche/WC und Telefon.",
      "Klinikeigene Fahrräder, Nordic-Walking-Stöcke und eine Regio-Karte für den ÖPNV können ausgeliehen werden.",
      "Fitnessraum, Beach-Volleyballfeld, Bouleplatz, Internetcenter und Kreativraum frei nutzbar.",
      "Anreise am Aufnahmetag bis 11.30 Uhr; Angehörige können am Aufnahmegespräch und Mittagessen teilnehmen."
    ],
    "therapieHinweise": [
      "Suchttherapeutische Gruppe und Einzeltherapie.",
      "Konzept für Suchtmittelabhängigkeit in Verbindung mit depressiven Störungen.",
      "Ärztliche Behandlung organischer und psychosozialer Folgeschäden; Fachdisziplinen Innere Medizin sowie Psychiatrie/Psychotherapie.",
      "Arbeitstherapie verbindlich: Haustechnik mit Fahrradwerkstatt, Schreinerei, Gärtnerei, Schlosserei, Küche und interner Dienst.",
      "Externe Belastungserprobung als Betriebspraktikum in der Region möglich.",
      "Paar- und Familiengespräche sowie Angehörigenseminare."
    ],
    "factsExtra": [
      "Entzug im Krankenhaus empfohlen; häuslicher Entzug nur nach Rücksprache mit dem Hausarzt.",
      "Körperlicher Entzug vor der Entwöhnung vorausgesetzt; Klinik empfiehlt qualifizierte Entzugsbehandlung im Krankenhaus.",
      "Suchtmittelfreier Antritt: Alkoholkarenz und längere Karenz für Cannabis sowie illegale Drogen laut Klinikseite.",
      "Hausordnung bewusst wenig restriktiv gefasst, um Alltagserprobung zu ermöglichen."
    ],
    "sozialdienstLeistungen": [
      "Orientierende Sozialberatung zu Arbeit, Wohnung, Finanzen, Führerschein, Schwerbehindertenausweis und Gerichtsverfahren.",
      "Kontakt zu Jobcenter, Agentur für Arbeit, Schuldnerberatung und weiteren Stellen noch während der Reha.",
      "Vorgespräch und Klinikbesichtigung über den Reha-Support möglich."
    ],
    "mitbehandlungHinweis": "Organische und psychosoziale Folgeschäden werden internistisch sowie psychiatrisch-psychotherapeutisch mitbehandelt; allgemeinärztliche Grundversorgung im Haus."
  },
  "ck-legau": {
    "kontraindikationen": [
      "Frauenspezifisch; Zielgruppe abhängigkeitserkrankte Frauen zwischen 21 und 65 Jahren.",
      "Nur abhängigkeitserkrankte Frauen; Zielgruppe 21 bis 65 Jahre.",
      "Hauptindikation Alkohol und Medikamente; nur begrenzte Plätze für illegale Drogen.",
      "Psychotherapie setzt die Bereitschaft zur Suchtmittelfreiheit voraus."
    ],
    "alltag": [
      "Gemeinschaftsküche: Speisen mit Patientinnen in der Arbeitstherapie; regionale/saisonale Küche.",
      "Gruppen-, Aufenthalts- und Fernsehräume, Wintergärten, Kreativräume, Bibliothek, PC-Raum, Sauna, Gymnastikhalle.",
      "Kindergarten, Kinderkrippe, Spielplatz; Mutter-Kind-Kochen donnerstags auf den WGs.",
      "Behandlung in Wohngruppen in vier Häusern; Speisen in der Gemeinschaftsküche mit den Patientinnen selbst zubereitet.",
      "Dreimal wöchentlich Lebensmittelausgabe; donnerstags Kochen in der Mutter-Kind-Gruppe auf den WGs.",
      "Kostenfreier Internetzugang, Waschküche, Sauna, Gymnastikhalle, PC-Raum, Bibliothek, Wintergärten."
    ],
    "therapieHinweise": [
      "Langzeit 13 Wochen, bis 22 Wochen bei illegalem Suchtmittelkonsum; Wiederholung 8–10, bis 16 Wochen.",
      "Einzel- und Kleingruppe; tiefenpsychologisch und verhaltenstherapeutisch, ergänzt durch Gespräch, Gestalt, Psychodrama und Körperverfahren.",
      "BORA: berufliche Schlüsselqualifikationen, bei Bedarf Bewerbungstraining.",
      "Yoga, Entspannung und Resilienz im Standardprogramm; Indikationsgruppen (je fünf Einheiten) u. a. zu Trauma, Depression, Selbstwert, Körperwahrnehmung.",
      "Mutter-Kind-Gruppe mit Mütterkompetenz („Starke Eltern – Starke Kinder“), Psychomotorik und therapeutischem Reiten."
    ],
    "factsExtra": [
      "Live-Seite fachklinik-legau.de war nicht erreichbar; Beleg über Klinik-Archivseite.",
      "30 Therapieplätze, AWO Bezirksverband Schwaben.",
      "Hauptindikation Alkohol und Medikamente; begrenzte Plätze für illegale Drogen.",
      "AWO Bezirksverband Schwaben, 30 Therapieplätze.",
      "Kinderkrippe (0 bis ca. 3 Jahre) und Kindergarten (bis ca. 6 Jahre) während der Therapiezeiten.",
      "Schulkinder bis 12 Jahre nach besonderen Voraussetzungen als Gastschülerinnen bzw. Gastschüler möglich."
    ]
  },
  "ck-lehre": {
    "alltag": [
      "Eigenes Zimmer; am Aufnahmetag Begrüßung durch Hausleitung, Therapiepate, Urin- und Alkoholkontrolle.",
      "Arbeitstherapie u. a. Holz- und Metallverarbeitung, Garten- und Landschaftsbau, Hausrenovierung, Hauswirtschaft und Bürokommunikation.",
      "Stammphase in Stufen mit wachsenden Freiheitsspielräumen; Arbeitsbereiche rotieren, in Stufe III Vertiefung eines Bereichs.",
      "Plenum der Therapiegruppe dreimal wöchentlich; tägliche Tagesschau an Werktagen; Lehrküche mit Ernährungsberatung.",
      "Therapie, Andachten, Sport und Alltag in mehreren Gebäuden auf einem naturgeschützten Grundstück mit Teichen.",
      "Beachvolleyball, Tischtennis, Kicker, Dart, Fahrräder, Kanu, Zugang zu externer Sporthalle."
    ],
    "sozialdienstLeistungen": [
      "Beratung zu Justizangelegenheiten, Schuldnerberatung, Berufsklärung und Bewerbungstraining.",
      "Kooperation mit Ämtern und Behörden; Nachsorge über Kooperationspartner."
    ],
    "therapieHinweise": [
      "Stammphase 22 Wochen; optionale Adaption 12–16 Wochen; optionale ambulante Weiterbehandlung 6 Monate (jeweils eigene Indikation und Antrag).",
      "Eingangsdiagnostik in den ersten 6 Wochen; Verlaufs- und Abschlussdiagnostik; Ausrichtung an BORA.",
      "Am Tag nach der Aufnahme volle Teilnahme am Rehabilitationsprogramm.",
      "Stationäre medizinische Rehabilitation für drogenabhängige Männer ohne Altersbegrenzung.",
      "4 der 23 Plätze für die Adaptionsphase am selben Campus.",
      "Eine Vielzahl von Begleiterkrankungen kann mitbehandelt werden."
    ],
    "factsExtra": [
      "Anerkennung nach § 35 BtMG; federführend DRV Braunschweig-Hannover.",
      "Nur männliche Erwachsene."
    ],
    "mitbehandlungHinweis": "Mitbehandlung einer Vielzahl von Begleiterkrankungen und Störungen im Reha-Rahmen laut Trägerseite."
  },
  "ck-liblar": {
    "sozialdienstLeistungen": [
      "Sozialdienst: Schuldnerunterlagen zur Klärung mitzubringen, soweit vorhanden."
    ],
    "factsExtra": [
      "Aufnahmevoraussetzungen-Seite nennt abgeschlossene Entgiftung.",
      "Mitbringen u. a. Personalausweis, Krankenkassenkarte, letzter Arztbericht."
    ],
    "alltag": [
      "Moderne Einzel- oder Doppelzimmer mit Dusche und WC; Paare im Doppelzimmer, Therapie getrennt.",
      "Vegetarische Kost möglich, vegane Linie nicht angeboten.",
      "Mitgebrachte Fernseher bis 42 Zoll Bildschirmdiagonale.",
      "Fahrradverleih; Fitness- und Saunabereich in der Freizeit nutzbar."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutisch-systemischer Ansatz; Bezugsgruppe von 6–8 Personen, dreimal wöchentlich.",
      "Wöchentliches Einzelgespräch; Indikativgruppen u. a. Rückfallprophylaxe, Skills, Tabakentwöhnung, Bewerbungstraining.",
      "Arbeitstherapie in Handwerk, Garten- und Landschaftsbau sowie Hauswirtschaft; Lehrküche.",
      "Regelbehandlung öffentlich 22 Wochen; integrierte Adaption in der Regel drei Monate.",
      "Wechsel in ganztägig ambulante Therapie bei passenden Rahmenbedingungen möglich.",
      "Geschlechtsspezifische Frauengruppe und Paartherapie-Programm ausgewiesen."
    ]
  },
  "ck-lichtblick": {
    "kontraindikationen": [
      "Aktuell bestehender Konsum illegaler Drogen oder THC.",
      "Aktuell bestehende Selbst- oder Fremdgefährdung.",
      "Schwerwiegende hirnorganische Beeinträchtigung (z. B. Demenz), die die Teilnahme am Therapieprogramm ausschließt.",
      "Aktueller Konsum illegaler Drogen oder THC.",
      "Aktuelle Selbst- oder Fremdgefährdung.",
      "Schwerwiegende hirnorganische Beeinträchtigungen (z. B. Demenz), die eine Teilnahme am Therapieprogramm ausschließen."
    ],
    "alltag": [
      "Hausordnung: keine alkoholhaltigen Lebensmittel, keine Spielekonsolen, Fernseher, Laptops oder Tablets auf dem Zimmer.",
      "Unterbringung in Doppelzimmern, Einzelzimmer bei therapeutischer Indikation.",
      "In der Reha nicht erlaubt: alkoholhaltige Lebensmittel und Mundwässer, Tauchsieder, Fernseher, Fotoapparat, Laptop/Tablet, Drogen und Waffen.",
      "Handys nur außerhalb der Therapiestunden; in der ersten Zeit keine Heimfahrten.",
      "Turnhalle, Volleyball, Tischtennis, Kegelbahn und Fitnessraum auf dem Gelände.",
      "Für Sauna und Bewegungsbecken Badebekleidung, Badesandalen und Badestola mitbringen."
    ],
    "therapieHinweise": [
      "Regeldauer 13 Wochen bei substanzbezogener, 10 Wochen bei nicht substanzbezogener Abhängigkeit.",
      "Pathologisches Glücksspielen und Mediensucht im Reha-Angebot.",
      "Komorbide psychiatrische Erkrankungen werden mitberücksichtigt, soweit remittiert bzw. rehafähig.",
      "Vorrangig Gruppentherapie in Bezugsgruppen von 12 Rehabilitandinnen und Rehabilitanden.",
      "Reha bei Alkohol, Medikamenten, pathologischem Glücksspielen und Medienabhängigkeit ausgewiesen.",
      "Bei substanzbezogener Abhängigkeit ist vor Reha-Antritt eine Entgiftung erforderlich; suchtspezifische Akutstation S1 am Standort."
    ],
    "factsExtra": [
      "Entgiftung vor Reha-Antritt gefordert; suchtspezifische Akutstation S1 am Standort mit möglicher Direktverlegung."
    ],
    "sozialdienstLeistungen": [
      "Sozialarbeiterinnen und Sozialarbeiter klären bei Bedarf soziale Probleme.",
      "Antragstellung über Suchtberatungsstelle oder während des Qualifizierten Entzugs über den Sozialdienst und die behandelnden Ärztinnen und Ärzte."
    ],
    "mitbehandlungHinweis": "Komorbide psychiatrische Krankheitsbilder (u. a. Persönlichkeitsstörungen, Angst- und Panikstörungen, affektive Erkrankungen, weitgehend remittierte Psychosen, kognitive Beeinträchtigungen) soweit rehafähig. Bei Körpergewicht über 150 kg oder Körpergröße über 2 m vor Anreise Rücksprache."
  },
  "ck-lindenberg-ried": {
    "alltag": [
      "Ausschließlich Einzelzimmer mit Dusche/WC, Telefon, kostenfreiem Fernseher und Internet; teilweise Balkon.",
      "Doppelzimmer für Partner-Reha auf Anfrage.",
      "Anreise spätestens 10:00 Uhr; Abholung vom Bahnhof Röthenbach/Allgäu.",
      "Hausbus an Werktagen zweimal täglich kostenlos in die Stadt Lindenberg und zurück.",
      "Handtücher stellt die Klinik; Waschmaschine, Trockner und Bügeleisen gegen Entgelt.",
      "Wärmeerzeugende Elektrogeräte (außer Föhn) sind aus Brandschutzgründen nicht gestattet."
    ],
    "sozialdienstLeistungen": [
      "MBOR-Basisangebote für alle DRV-Rehabilitandinnen und Rehabilitanden (sozialrechtliche Information, Stressbewältigung, Arbeitsplatzergonomie).",
      "MBOR Stufe B bei besonderer beruflicher Problemlage inkl. EFL-Kurzscreening.",
      "Sozial- und Rehaberatung ergänzen den Behandlungsplan."
    ],
    "therapieHinweise": [
      "Psychosomatik: pflegerische Aufnahme, ärztliche Untersuchung und psychotherapeutisches Erstinterview.",
      "Testdiagnostik u. a. ADS, FIE, SCL-90 und AVEM.",
      "Trauergruppe und tiergestützte Therapie öffentlich genannt.",
      "Intensive psychologische Betreuung nur bei psychosomatischer Indikation.",
      "Intensive psychologische Betreuung nur bei psychosomatischer Indikation; in der Orthopädie nur ergänzend."
    ],
    "factsExtra": [
      "Fachklinik der DRV Schwaben für Psychosomatik und Orthopädie; Chefarzt Alexander Taube.",
      "Zertifizierte Menülinie Vitalgäu; vegetarische und allergikergerechte Kost ausgewiesen.",
      "Keine Wunschzimmer-Reservierung aus organisatorischen Gründen.",
      "Kinder können nicht mitgebracht werden; Besuch von Kindern und Partnern an Wochenenden und Feiertagen tagsüber möglich.",
      "Haustiere nicht erlaubt.",
      "Aufnahme bis 180 kg Körpergewicht; Klinik barrierefrei."
    ]
  },
  "ck-lindenhof": {
    "alltag": [
      "Klinikinterne Kindertagesstätte; Mutter-Kind und Schwangere im Konzept.",
      "Lindenhof-ABC mit Hausregeln als Infoseite.",
      "Ausschließlich Einzelzimmer; Mütter wohnen mit Kind im selben Zimmer.",
      "Handy und Laptop außerhalb der Therapiezeiten im Zimmer oder außerhalb des Geländes; Tiere nicht möglich.",
      "Waschmaschinen und Trockner vorhanden, Waschmarken am Kiosk; Trinkbrunnen im Speisesaal.",
      "Anreise suchtmittelfrei bis 11:00 Uhr; Zimmerkaution 40 Euro."
    ],
    "therapieHinweise": [
      "Frauenspezifische Suchtrehabilitation; substitutionsgestützte Reha öffentlich genannt.",
      "Langzeitreha Alkohol 15 Wochen, Drogen 24 Wochen.",
      "Indikativ u. a. soziales und emotionales Kompetenztraining, MUT, Sicherheit finden – Sucht und Trauma, Skillstraining, Sucht und Essstörung, Theatertherapie.",
      "Frauenspezifische Adaption in möblierter WG auf dem Klinikgelände, geplant 12–16 Wochen."
    ],
    "factsExtra": [
      "Aufnahme ohne vorangegangene Entgiftung nur nach Absprache; dann Screeningnachweise.",
      "Bei Mitaufnahme eines Kindes eigene Kostenzusage für das Kind.",
      "Zertifiziert nach DIN EN ISO 9001:2015; Reha-Qualitätssicherung der DRV und deQus/BAR.",
      "Frauen ab 18 Jahren; Begleitkinder bis zum Ende der Grundschule bzw. 12. Lebensjahr."
    ],
    "sozialdienstLeistungen": [
      "Klinischer Sozialdienst zu sozialen und wirtschaftlichen Fragen, beruflicher Wiedereingliederung und juristischen Hilfen.",
      "Arbeitstherapie in Küche, Handwerk, Garten, Hauswirtschaft, Kiosk, Pforte oder Praktikum bei Kooperationsbetrieben.",
      "Angehörigentage (acht Termine im Jahr) sowie Paargespräche."
    ],
    "mitbehandlungHinweis": "Mitbehandlung von Depression, Angst, PTBS, Borderline, AD(H)S, nicht akuten Psychosen sowie pathologischem Glücksspiel und Essstörungen."
  },
  "ck-ludwigsmuehle": {
    "alltag": [
      "18 Plätze für Erwachsene, bis zu 20 Plätze für Kinder; Familien wohnen in verbundenen Zimmern mit Bad.",
      "Heilpädagogisches Herzenssache-Kinderhaus (Jugendhilfe) mit modernisiertem Neubau und Außenspielflächen.",
      "Eltern-Kind-Aktivitäten, Elternschule und Elterngruppe; auch Paare ohne Kinder und Schwangere aufnahmefähig.",
      "Familien wohnen in verbundenen Zimmern mit Bad; 18 Erwachsenen- und bis zu 20 Kinderplätze.",
      "Elternschule, Elterngruppe und Eltern-Kind-Aktivitäten; auch Paare ohne Kinder und Schwangere aufnahmefähig.",
      "Adaption der Villa Maria in Appartements in fußläufiger Entfernung; Kinderbetreuung morgens weiter im Kinderhaus."
    ],
    "sozialdienstLeistungen": [
      "Einleitung von Nachsorge, u. a. sozialpädagogische Familienhilfe.",
      "Vorbereitung von betreutem Wohnen und ambulanter Nachsorge.",
      "Unterstützung bei Kostenübernahme Haushaltshilfe und Hilfe zur Erziehung für mitaufgenommene Kinder.",
      "Arbeitstherapie, EDV-Grundkurse und berufliche Praktika."
    ],
    "therapieHinweise": [
      "Suchttherapie für drogenabhängige Eltern und Alleinerziehende inkl. Doppeldiagnosen.",
      "Familien-, Paar- und Beziehungstherapie; Marte Meo (Videofeedback); Einleitung von Traumaarbeit.",
      "Geschlechtsspezifische Behandlung, Verhaltenstraining und soziales Kompetenztraining.",
      "Arbeitstherapie, EDV-Grundkurse und berufliche Praktika.",
      "Integrierte Adaption in externen Wohngruppen (u. a. Landau).",
      "Geschlechtsspezifische Behandlung, Verhaltenstraining, soziales Kompetenztraining, Rollenspiel und Psychodrama."
    ],
    "factsExtra": [
      "Fachklinik Villa Maria des Therapieverbunds Ludwigsmühle in Billigheim-Ingenheim, nicht identisch mit der Fachklinik Ludwigsmühle.",
      "Kinder- und jugendpsychiatrische Mitbehandlung der Kinder in Kooperation; ADHS-Diagnostik bei Bedarf.",
      "Fachklinik Villa Maria in Billigheim-Ingenheim, nicht identisch mit der Fachklinik Ludwigsmühle."
    ]
  },
  "ck-luisenklinik": {
    "alltag": [
      "Reha-Bereich generell Einzelzimmer mit Bad, Durchwahltelefon und Notruf; behindertengerechte Zimmer vorhanden.",
      "Akutabteilung im Regelfall Zweibettzimmer (gesetzliche Kassenleistung).",
      "Stationäre und ganztägig ambulante Reha; Standort Bad Dürrheim mit Klinikschule.",
      "Besuche nicht während der Therapiezeit und nicht nach 22:00 Uhr; Wochenendübernachtung von Angehörigen im Einzelzimmer nach Anmeldung bis Freitag 9 Uhr.",
      "Nichtraucherklinik; Rauchen nur außerhalb des Geländes und am Raucherpavillon.",
      "Zwei Waschräume (Zimmertransponder): Waschen 3 €, Trocknen 2 €; Waschpulver und Bügeleisen an der Rezeption."
    ],
    "sozialdienstLeistungen": [
      "Beratung zur wirtschaftlichen Sicherung sowie zur beruflichen und sozialen (Re-)Integration.",
      "Unterstützung bei der konkreten Umsetzung der nächsten Schritte; Psy-RENA-Nachsorge."
    ],
    "therapieHinweise": [
      "Verhaltensmedizinisch-integrativer Schwerpunkt; Einzelpsychotherapie plus problembezogene Gruppen.",
      "Trainingsgruppen für Kommunikation und soziale Kompetenz; Skillstraining; psychoedukative Gruppen.",
      "Psychotherapiegruppe für berufliche Probleme; MBOR; Training alltagspraktischer Fertigkeiten.",
      "Musik-, Kunst-, Sing- und Gartentherapie; Ergotherapie/Berufstherapie.",
      "Sport- und Bewegungstherapie, Physiotherapie, physikalische Therapie, Qigong, progressive Muskelentspannung."
    ],
    "factsExtra": [
      "Inhabergeführte Fachklinik im Familienbesitz; Mutterhaus Bad Dürrheim mit Akut, Reha und Ambulanz für Erwachsene sowie Kinder und Jugendliche.",
      "Reha Erwachsene: 123 Betten und drei tagesklinische Plätze; Standort insgesamt über 220 vollstationäre Betten.",
      "Behandlung mit Begleitkind oder Begleitperson sowie parallele Behandlung von Eltern und Kind öffentlich genannt."
    ],
    "wahlleistungenHinweis": "Reha-Unterbringung generell im Einzelzimmer; in der Akutabteilung Regelversorgung Zweibettzimmer.",
    "mitbehandlungHinweis": "Physiotherapie nach ärztlicher Verordnung auch bei degenerativen und postoperativen Beschwerden; Kostformen nach Bedarf."
  },
  "ck-luisenklinik-stuttgart": {
    "alltag": [
      "Ganztägig ambulante Reha: Kernzeiten montags bis freitags 08:00–17:00 Uhr nach individuellem Plan, abends nach Hause.",
      "Aufnahme am ersten Tag ab 08:00 Uhr; Transponder für den Gebäudezutritt, abschließbarer Schrank.",
      "Mittagessen in der Kantine im 2. Obergeschoss, Kosten übernimmt die Klinik; drei Menüs zur Auswahl.",
      "Eigene Tasse für heiße Getränke mitbringen und im Spind aufbewahren; Wasserspender kostenfrei.",
      "Pfand für Wäscheset, Schlüssel und Transponder, Rückgabe am Ende der Therapie.",
      "Keine klinikeigenen Parkplätze; Parkhaus Gerber gegen Gebühr. Rauchen nur außerhalb des Gebäudes."
    ],
    "therapieHinweise": [
      "Verhaltensmedizinisch-integratives Konzept; Therapieplan wird am Aufnahmetag besprochen.",
      "Verbindung von Therapie und innerstädtischem Alltag (PPRZ Stuttgart).",
      "Nachsorge in Gruppen (8–12 Personen), meist wochentags ab 17:00 Uhr.",
      "Schwerpunkt Verhaltenstherapie; Verbindung von Therapie und Alltag.",
      "Psychotherapeutische Ambulanz mit Ausbildungstherapeutinnen unter Supervision zusätzlich zum PPRZ."
    ],
    "factsExtra": [
      "60 ganztägig ambulante Therapieplätze, Paulinenstraße 21.",
      "Unverbindliche Informationsabende für Interessierte.",
      "Nach Kostenzusage Bestätigung mit ungefährem Termin; Einladungsschreiben mit Infos kurz vor Aufnahme.",
      "Eigenanteil bei Krankenkasse als Kostenträger: Betrag eine Woche nach Anreise, Zahlung bar oder EC an der Rezeption.",
      "Psy-RENA-Nachsorge im Gruppenprofil.",
      "Tagesklinik der Luisenklinik-Gruppe (stationär Bad Dürrheim separat)."
    ],
    "kontraindikationen": [
      "Psychotherapeutische Ambulanz (nicht die ganztägig ambulante Reha): Notfälle, akute psychiatrische Erkrankungen und Suchterkrankungen werden ambulant nicht behandelt.",
      "In der Ambulanz keine medikamentöse Mitbehandlung oder Rezeptierung bereits eingenommener Medikamente."
    ]
  },
  "ck-lukas-braunschweig": {
    "alltag": [
      "Anwesenheit an Wochentagen 8:30–15:30 Uhr sowie samstags 9:00–13:00 Uhr.",
      "Wöchentliche Infoveranstaltung mit Besichtigung in Braunschweig am 1. und 3. Dienstag um 15:30 Uhr.",
      "Ganztägig ambulant: Alltag mit Beruf und/oder Familie läuft weiter, Therapietermine werden daran angepasst."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung und Einleitung von Nachsorge; Kooperation mit DRV-Reha-Beratung, Agentur für Arbeit, Jobcenter und Selbsthilfe.",
      "BORA: sozialrechtliche Beratung, Berufsklärung mit Diagnostik (MELBA, Mini-ICF), Training sozialer Kompetenzen und Belastungserprobung."
    ],
    "therapieHinweise": [
      "Kognitive Verhaltenstherapie in Einzel- und Gruppensetting; psychologische Testdiagnostik; Psychoedukation u. a. zu Angst und Depression.",
      "Ergotherapie inkl. MELBA-Diagnostik, EDV- und Bewerbungstraining, ggf. externes Arbeitsplatzpraktikum.",
      "NADA-Ohrakupunktur; Sport- und Bewegungstherapie; Ernährungsberatung und Lehrküche; Achtsamkeit, Genusstraining, kognitives Training.",
      "Behandlungsdauer in der Regel zwischen sechs und 15 Wochen nach individuellem Bedarf.",
      "Reha-Tagesklinik als Alternative zwischen ambulanter Fachambulanz und stationärer Therapie; Standort Braunschweig im Rehabilitationszentrum St. Leonhard."
    ],
    "factsExtra": [
      "Tagesklinik Braunschweig mit 24 ganztägig ambulanten Plätzen laut Trägerbericht; Standort im Rehabilitationszentrum St. Leonhard.",
      "Vor der Aufnahme Vorbereitung über die örtliche Fachambulanz; zum Aufnahmetermin zugesandte Unterlagen ausgefüllt mitbringen.",
      "Evangelische Stiftung Neuerkerode / Lukas-Werk; Schwesterangebot auch in Northeim."
    ],
    "mitbehandlungHinweis": "Aufnahme substituierter Patientinnen und Patienten laut Träger-Jahresbericht möglich, wenn eine schrittweise Reduzierung des Substituts als Therapieziel vereinbart ist."
  },
  "ck-lvr-langenfeld": {
    "alltag": [
      "Station 35 in familiärer Atmosphäre mit hohem Maß an Eigenverantwortung.",
      "Gute Anbindung an soziales Umfeld und Freizeitangebote im Rheinland.",
      "16 stationäre, zwei tagesklinische und zwei Adaptionsplätze.",
      "Behandlung in familiärer Atmosphäre mit hohem Maß an Eigenverantwortung.",
      "Gute infrastrukturelle Anbindung an soziales Umfeld und Freizeitangebote."
    ],
    "sozialdienstLeistungen": [
      "Hilfe bei der Kostenbeantragung durch den Sozialdienst der LVR-Klinik oder die regionale Suchtberatungsstelle.",
      "Vermittlung in Nachsorgemaßnahmen.",
      "Soziotherapie und Sozialarbeit im Abteilungsangebot; Angehörigengespräche.",
      "Hilfe bei der Kostenbeantragung durch den Sozialdienst der LVR-Klinik Langenfeld oder regionale Suchtberatungsstelle."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutische, systemische und tiefenpsychologische Konzepte; Psychotherapie in Kleingruppen und Einzelgesprächen.",
      "Psychiatrisch-medizinische Diagnostik, Entspannung, Ernährungs- und Gesundheitsberatung, Sport- und Arbeitstherapie.",
      "Rückfallprophylaxe-Training, Einbindung von Angehörigen und Freunden, Paarbehandlung.",
      "Nahtlosverfahren aus den Aufnahmestationen der Klinik (qualifizierter Entzug vor Ort) möglich.",
      "Verhaltenstherapeutische, systemische und tiefenpsychologische Konzepte.",
      "Sport- und Arbeitstherapie."
    ],
    "factsExtra": [
      "Auftrag: Alkohol-, Medikamenten- und Cannabisabhängigkeit; Aufnahmemanagement 02173 102-2263.",
      "Typische Beleger: DRV Rheinland, Knappschaft, Krankenkassen; QReha-zertifiziert.",
      "Station 35: 16 stationäre, 2 tagesklinische und 2 Adaptionsplätze.",
      "Regeldauer ca. 16 Wochen nach abgeschlossener Entzugsbehandlung.",
      "Typische Beleger: DRV Rheinland, Knappschaft, Krankenkassen."
    ]
  },
  "ck-lwl-foerderturm": {
    "alltag": [
      "Freizeitangebote auf dem Klinikgelände: Café Big Apple, Krankenhauspark, Haus der Religion, Kirche und Andachtsraum.",
      "Abendliche Veranstaltungen, u. a. Landhauslesungen und Forum Gesundheit.",
      "Stationäre Rehabilitation im Phönix-Haus (Station P5) nach Qualifizierter Entzugsbehandlung.",
      "In den ersten Wochen ganztägige Behandlung; Übergang ins ganztägig ambulante Setting Unna gegen Ende möglich."
    ],
    "sozialdienstLeistungen": [
      "Beantragung der Kostenübernahme über Suchtberatungsstelle oder Sozialdienst eines Krankenhauses in Verbindung mit abgeschlossener Entzugsbehandlung.",
      "Aufbau positiver und belohnender Aktivitäten zur Erhaltung bzw. Wiederherstellung der Erwerbstätigkeit.",
      "Vermittlung in Nachsorge und Selbsthilfegruppen."
    ],
    "therapieHinweise": [
      "Reguläre Behandlungsdauer öffentlich durchschnittlich 13 Wochen, abhängig von der Kostenzusage.",
      "Mitbehandlung von Depression, Angststörungen oder anderen psychischen bzw. internistischen Erkrankungen, sofern die Rehabilitationsfähigkeit nicht erheblich beeinträchtigt ist.",
      "Ergotherapie mit handwerklichen Techniken und Alltagsbewältigung; konkretes Angebot vor Ort erfragen.",
      "Klärungs- und lösungsorientierte Verhaltenstherapie.",
      "Virtual-Reality-Therapie ist am Standort ausgewiesen."
    ],
    "factsExtra": [
      "Wohnortnahe stationäre Reha mit früher Wiedereingliederung ins soziale Umfeld.",
      "30 stationäre Plätze auf zwei Stationen.",
      "Nahtloser Wechsel aus der Qualifizierten Entzugsbehandlung der LWL-Klinik Dortmund bei Kostenzusage möglich."
    ],
    "kontraindikationen": [
      "Erkrankungen, die die Rehabilitationsfähigkeit erheblich beeinträchtigen (schwere psychische oder internistische Probleme)."
    ],
    "mitbehandlungHinweis": "Behandlung psychischer Begleiterkrankungen im Reha-Rahmen."
  },
  "ck-lwl-unna-tk": {
    "alltag": [
      "Konzept öffentlich: 12 Wochen an sechs Tagen der Woche; morgens in die Tagesklinik, nachmittags Rückkehr ins Umfeld.",
      "Ganztägig ambulant in der Tagesklinik Unna, abends Rückkehr ins gewohnte Umfeld.",
      "Teilnahme in der Regel an fünf bis sechs Tagen pro Woche."
    ],
    "sozialdienstLeistungen": [
      "Arbeitstherapeutischer Einsatz in Betrieben des ersten Arbeitsmarktes; nach einigen Wochen kurze Einsätze an der eigenen Arbeitsstelle, um Stressfaktoren zu bearbeiten.",
      "Sozial- und Suchttherapie, arbeitstherapeutischer Einsatz.",
      "Förderung beruflicher Integration, Krisenbegleitung, Paar- und Familiengespräche."
    ],
    "factsExtra": [
      "Voraussetzung laut Klinikseite: abgeschlossener Entzug und Kostenzusage.",
      "Eigenständiger Campus Unna nach Umzug aus Iserlohn, getrennt vom stationären Standort Dortmund-Aplerbeck.",
      "Bei längerer Abstinenzphase ist kein nahtloser Übergang aus dem Entzug nötig."
    ],
    "kontraindikationen": [
      "Fehlende Fähigkeit, nachts sowie an Sonn- und Feiertagen abstinent zu bleiben."
    ],
    "therapieHinweise": [
      "Kreativtherapie, Bewegungstherapie, Entspannungsverfahren und Arbeitstherapie.",
      "Zusätzlich ambulante Drogenreha in Dortmund sowie ambulante Reha bei pathologischem Glücksspiel und Medienabhängigkeit in Unna ausgewiesen."
    ]
  },
  "ck-magdalenenstift": {
    "kontraindikationen": [
      "Nur Männer; Medikamentenabhängigkeit auf Grundlage illegaler Drogen ist nicht vorgesehen."
    ],
    "alltag": [
      "Helle Zimmer nach Sanierung 2022; große Werkstatt für Arbeits- und Kreativtherapie, Gruppenräume und Freizeitbereiche.",
      "Großer Garten, unter Anleitung bewirtschaftet; angrenzendes Freibad in den Sommermonaten nutzbar."
    ],
    "sozialdienstLeistungen": [
      "Vermittlung weiterführender Maßnahmen wie Adaption, berufliche Rehabilitation oder sozialtherapeutisches Wohnen.",
      "Vorbereitung durch eine ambulante Beratungsstelle ist vorteilhaft; Kontakt zu einer Selbsthilfegruppe als Bezugsgruppe nach der Behandlung."
    ],
    "therapieHinweise": [
      "Tiefenpsychologisch und sozialtherapeutisch orientiert; körperliche, psychische, soziale und spirituelle Seite.",
      "Alkohol, flüchtige Substanzen (Schnüffelstoffe) und Medikamente; als Nebendiagnose nicht-substanzbezogene Süchte, insbesondere Mediensucht.",
      "Affektive Störungen und gut remittierte Erkrankungen des schizophrenen Formenkreises werden berücksichtigt, soweit die Integration in die Gruppentherapie möglich ist.",
      "Stationäre medizinische Rehabilitation alkohol- und medikamentenabhängiger Männer.",
      "Eigene Werkstatt für Arbeitstherapie."
    ],
    "factsExtra": [
      "Stadtmission Chemnitz, Gebäude des Diakoniekrankenhauses Diakomed Hartmannsdorf."
    ]
  },
  "ck-magnus-huss": {
    "kontraindikationen": [
      "Kein aktueller Konsum illegaler Drogen oder Alkohol; bei Aufnahme negativer Drogen- und Alkoholtest.",
      "Nicht aufgenommen bei erwartetem psychovegetativem Entzugssyndrom, akuter oder residualer Psychose, akuter Suizidalität.",
      "Schwere kognitive Beeinträchtigung, unzureichende Deutschkenntnisse oder Pflegebedarf, der die Therapieteilnahme verhindert."
    ],
    "alltag": [
      "Überwiegend Einzelzimmer mit eigenem Bad; Wohnbereiche nach Bezugsgruppen, Paar- und barrierefreie Zimmer möglich.",
      "Nutzung mobiler Endgeräte in den ersten zwei Wochen nach der Ankunft ausgesetzt; Patin bzw. Pate für 24 Stunden.",
      "Frischküche, Speisesaal mit verbindlicher Teilnahme an den Mahlzeiten; Küchenkommission der Rehabilitandinnen und Rehabilitanden.",
      "Sport- und Freizeiträume, Fitnessbereich, Sporthalle; Hundeauslauf auf dem Gelände.",
      "Überwiegend Einzelzimmer mit eigenem Bad in Wohnbereichen nach Bezugsgruppen; Paarzimmer möglich.",
      "Sport- und Freizeiträume."
    ],
    "sozialdienstLeistungen": [
      "Hilfe zur Selbsthilfe im Umgang mit Ämtern, Gerichten, Vermietern und Gläubigern.",
      "Unterstützung bei Schuldensituation, Gerichtssachen und finanzieller Versorgung während der Therapie; Bewerbungsunterlagen mitbringen.",
      "Hilfe zur Selbsthilfe im Umgang mit Ämtern und Behörden."
    ],
    "therapieHinweise": [
      "Bezugsgruppentherapie mehrmals wöchentlich, Einzeltherapie, indikative Gruppen u. a. Angst, Tabak, Depression, Psychose, Glücksspiel, Rückfallprophylaxe.",
      "BORA: Arbeitstherapie in Holz- und Metallwerkstatt, Ergotherapie, Bewerbungstraining, externe Arbeitserprobung.",
      "Mitbehandlung u. a. Persönlichkeitsstörungen, leichte bis mittelgradige Depression, ADHS, Angst, PTBS, Essstörungen und pathologisches Glücksspiel.",
      "Ergotherapie, Sporttherapie, Arbeitstherapie in Holz- und Metallwerkstatt.",
      "BORA – berufliche Orientierung in der medizinischen Rehabilitation Abhängigkeitskranker."
    ],
    "factsExtra": [
      "Neubau seit 2023 am Stadtrand Schwerin. Haustiere nach Anmeldung über gesondertes Formular im Zimmer möglich.",
      "Aufnahme ab 18 Jahren bei Abhängigkeit von illegalen Drogen; gültige Kostenzusage und aktueller Clean-Status.",
      "Nachweis einer abgeschlossenen Zahnbehandlung mitbringen; Wecker ohne Kabel mit Batterie, Arbeitssachen und Sportbekleidung.",
      "Neubau Erstbezug Februar 2023 am Stadtrand Schwerin.",
      "Haustiere nach Anmeldung über gesondertes Formular.",
      "Anmeldung mit Bewerbung, Lebenslauf und Suchtverlauf bzw. Sozialbericht."
    ],
    "mitbehandlungHinweis": "Mitbehandlung von Persönlichkeitsstörungen, leichten bis mittelgradigen depressiven Episoden, ADHS, Angst- und Zwangsstörungen, PTBS, Essstörungen sowie residualen Zuständen medikamentös behandelter drogeninduzierter Psychosen."
  },
  "ck-mainbogen": {
    "kontraindikationen": [
      "Aufnahme nur nach abgeschlossener stationärer Entgiftung und negativem Drogenscreening.",
      "Kombibehandlung nicht bei Psychosen, schweren hirnorganischen Beeinträchtigungen oder schwerer Einschränkung der intellektuellen Leistungsfähigkeit.",
      "Aufnahme nur nach stationärer Entgiftung und suchtmittelfreier Anreise.",
      "Suizidalität.",
      "Akute Psychosen.",
      "Schwere hirnorganische Beeinträchtigungen."
    ],
    "alltag": [
      "Eigene Sporthalle und eigenes Hallenbad.",
      "Fahrdienst zum Bahnhof und zu externen Arztterminen.",
      "Anreise am Aufnahmetag suchtmittelfrei bis 10:00 Uhr.",
      "Anreise am Aufnahmetag suchtmittelfrei bis 10:00 Uhr; Angehörige dürfen zur Aufnahme mitkommen.",
      "Frauenklinik in fünf Wohngruppen; Einzelzimmer mit ebenerdiger Dusche, Festnetz, Kühlschrank, Safe, Fernseher und kostenfreiem Internet.",
      "Gemeinsame Mahlzeiten; Frühstücksbuffet, mittags Wahl zwischen zwei Gerichten (eines vegetarisch)."
    ],
    "therapieHinweise": [
      "Frauenspezifische Entwöhnung, Regeldauer bis 15 Wochen, 60 stationäre Plätze.",
      "Traumagruppe und EMDR nach Diagnostik und Stabilisierung.",
      "Tiergestützte Therapie mit Alpakas.",
      "Ganztagsambulante Entlassform bis 4 Wochen; ambulante Nachsorge bis 6 Monate.",
      "Frauenspezifische Entwöhnung, Regeldauer öffentlich bis 15 Wochen. Traumagruppe und EMDR nach Diagnostik und Stabilisierung.",
      "Tiergestützte Therapie mit Alpakas. Mutter-Kind-Therapie mit Betreuung in der klinikeigenen Kita Kindernest."
    ],
    "factsExtra": [
      "Nur Frauen; Begleitkinder bis 12 Jahre und schwangere Patientinnen möglich.",
      "Mutter-Kind-Zentrum Rückenwind am Standort.",
      "Nur Frauen; Begleitkinder bis 12 Jahre und schwangere Patientinnen im Einzelfall möglich.",
      "Bei positivem Drogenscreening in der Regel Unterbrechung durch Entgiftung im BKH Bayreuth.",
      "Mutter-Kind-Zentrum Rückenwind am Standort; Aufnahmebogen und Lebenslauf vor Aufnahme ins Mutter-Kind-Haus."
    ],
    "sozialdienstLeistungen": [
      "Sozialanamnese in der ersten Woche; offene Sprechstunden. Beratung zu Wohnen, Finanzen, Rente, Wohnberechtigungsschein und Wohngeld.",
      "Vermittlung an Schuldnerberatung; BORA-Gruppen, stufenweise Wiedereingliederung und Arbeitgebergespräche.",
      "Unterstützung bei Adaption, betreutem Wohnen und Nachsorge; DRV-Sprechstunden in der Klinik.",
      "Sozialanamnese in der ersten Behandlungswoche; offene Sprechstunden und individuelle Termine.",
      "Sozialrechtliche Beratung zu Wohnen, Finanzen und Rente; Vermittlung an Schuldnerberatung.",
      "Berufliche Beratung, BORA-Gruppen, stufenweise Wiedereingliederung und Arbeitgebergespräche."
    ]
  },
  "ck-marbachtal": {
    "therapieHinweise": [
      "DRV-eigene Schwerpunktklinik ausschließlich für psychosomatische Erkrankungen.",
      "Leitender Arzt Dr. med. Klaus Herrmann, Psychosomatische Medizin.",
      "Schwerpunkte u. a. depressive Episoden und rezidivierende Depression, Belastungs- und Anpassungsstörungen, MBOR sowie anhaltende Trauerstörung.",
      "Trauerangebot: gestalttherapeutische Gruppen, Trauerspaziergänge und Seelsorge, eingebettet in Bezugsgruppe, Einzelgespräche, Entspannung und Sport.",
      "Weitere Verfahren u. a. Gesprächs-, Ergo-, Sport- und Physiotherapie, Bewegungsbad, medizinische Bäder und Massagen, Ernährungsberatung."
    ],
    "alltag": [
      "158 Einzelzimmer mit Nasszelle (Dusche/WC), Notruf, kostenfreiem Festnetztelefon, Flat-TV und Zimmersafe.",
      "Teeküche auf der Etage; Waschmaschinen und Trockner; Handtücher wöchentlich, Bettwäsche zweiwöchentlich.",
      "Begleitperson im Zimmer an therapiefreien Tagen nach Absprache mit der Patientenverwaltung.",
      "Die Psychotherapiegruppe bleibt der Bezugsrahmen; ein Gruppen- oder Zimmertausch ist nicht vorgesehen.",
      "Am Anreisetag: ärztliche Aufnahmeuntersuchung, psychologisches Aufnahmegespräch und Patin bzw. Pate aus der Rehabilitandenschaft.",
      "Sporthalle, Billardzimmer, Bibliothek mit Leseraum, Bewegungsbad, Kegelbahn und Fitnessraum."
    ],
    "sozialdienstLeistungen": [
      "Sozial- und Rehabilitationsberatung im Haus.",
      "Psy-RENA-Nachsorge: wöchentliche Abendgruppe, 25 Sitzungen über sechs Monate, plus Aufnahme- und Abschlussgespräch.",
      "Stufenweise Wiedereingliederung im unmittelbaren Anschluss an die Reha (Stufenplan G0834)."
    ],
    "factsExtra": [
      "Belegung vor allem über die DRV Oldenburg-Bremen (Zulassung § 111 SGB V); Rehabilitandinnen und Rehabilitanden aller Rentenversicherungsträger und Selbstzahlende.",
      "Selbstzahlende: Pflegesatz 14-tägig im Voraus bar oder mit EC-Karte.",
      "Diagnostik u. a. psychologische Testdiagnostik, Ruhe- und Belastungs-EKG, Spirometrie und Sonografie."
    ],
    "wahlleistungenHinweis": "Persönlicher WLAN-Zugang kostenpflichtig (Voucher am Empfang); kostenfreier Hotspot an der Rezeption und im Aufenthaltsbereich des 1. OG. Begleitperson im Zimmer an therapiefreien Tagen nach Absprache, 45 Euro/Tag inkl. Verpflegung zuzüglich Kurtaxe."
  },
  "ck-maria-stern": {
    "alltag": [
      "Tägliche Zimmer- und Gemeinschaftsreinigung durch die Rehabilitandinnen und Rehabilitanden; wöchentliche Hygienebegehung durch den Pflegedienst.",
      "Gemeinschaftsküche im Erdgeschoss; Selbstversorgung inkl. Kochen in Kleingruppen.",
      "Guten-Morgen-Gruppe Di–Fr 8:30 Uhr für alle, die nicht im Praktikum sind; Gruppentherapie zweimal wöchentlich.",
      "Arbeitserprobung in der Regel mindestens 30 Wochenstunden; Nachtruhe 23:00–06:00 Uhr.",
      "In der Regel Einzelzimmer mit Dusche, WC, Schreibtisch, Einbauküche und TV; Doppelzimmer nur ausnahmsweise und kurzzeitig bei Belegung.",
      "Packliste nennt u. a. Sportschuhe für Innen- und Außenbereich."
    ],
    "sozialdienstLeistungen": [
      "Regelung des monatlichen Einkommens, Schuldnerberatung und rechtliche Fragen (u. a. Bewährungsauflagen).",
      "Wohnungssuche und Ämtergänge in der Entlassvorbereitung.",
      "Praktikumsprechstunde, Bewerbungstraining und Behördengänge im Wochenplan."
    ],
    "therapieHinweise": [
      "Gruppentherapie zweimal wöchentlich plus Einzelgespräche mit der Bezugstherapie; Angehörigengespräche bei Bedarf.",
      "Testdiagnostik u. a. zu Konzentration, Merkfähigkeit und spezifischen Fähigkeiten.",
      "Externe Praktika in rund 200 Firmen der Landkreise Rhön-Grabfeld, Bad Kissingen und Schweinfurt.",
      "Betriebspraktika zur Erprobung im Arbeitsalltag und neuer beruflicher Ziele."
    ],
    "factsExtra": [
      "18 Behandlungsplätze; Regelbehandlung 12–16 Wochen bzw. drei bis vier Monate je nach Kostenzusage.",
      "Kostenloses WLAN; Fitnessraum, Computerraum und Aufenthalts-/Therapieraum zur Mitnutzung.",
      "Aufnahme von Paaren; Vorstellungsgespräch, ggf. mit Probewohnen.",
      "Schriftliche Bewerbung mit tabellarischem Lebens- und Suchtverlauf sowie persönlichen Zielen; Vorliegen einer Kostenübernahmeerklärung.",
      "Aufnahme von Patient:innen mit Kindern ab dem 3. Lebensjahr laut Klinikseite.",
      "Staatliche Anerkennung nach §§ 35, 36 BtMG."
    ]
  },
  "ck-marienstift": {
    "kontraindikationen": [
      "Organische psychische Störungen (F0) und Intelligenzminderung (F70–F73)",
      "Akute Psychose",
      "Bei illegalen Suchtmitteln: negativer Urintest bei Aufnahme (THC-frei; Ausnahmen bei kontinuierlich fallenden Werten nach nahtloser Verlegung)"
    ],
    "alltag": [
      "Aufnahmen in der Regel montags bis freitags",
      "Angehörige werden zur Aufnahme eingeladen; Angehörigengespräch vor der ersten Wochenendheimfahrt",
      "Freizeit u. a. Sporthalle, Fitness, Sauna, Schwimmbad, Sportplatz",
      "Ein- oder Zweibettzimmer mit Telefon; Kühlfach im Stationskühlschrank; WLAN in Teilbereichen mit täglich befristetem Zugang.",
      "In den ersten 14 Tagen Ausgangsbeschränkungen und keine Besuche; Besuch danach am Wochenende 8:00–22:00 Uhr.",
      "Waschmaschinen und Trockner gegen Gebühr; Hand- und Badetücher vom Haus."
    ],
    "sozialdienstLeistungen": [
      "Anträge zu Übergangsgeld, ALG I/II, Wohngeld; Schuldenregulierung und P-Konto",
      "Berufliche Wiedereingliederung, LTA, stufenweise Wiedereingliederung, Adaption",
      "Klärung der Wohnungssituation und Vermittlung in betreute Wohnformen",
      "Für Sozialberatung Unterlagen mitbringen, z. B. Mietvertrag, Einkommensbescheide, ALG-II-Bescheid, Rentenbescheid, Schuldenunterlagen, Schwerbehindertenbescheid."
    ],
    "therapieHinweise": [
      "Integriertes Angebot „Trauma und Sucht“",
      "StoF: dreiwöchige stabilisierungsorientierte Festigungsbehandlung, entwickelt mit der DRV Braunschweig-Hannover",
      "Qualifizierter Entzug in Kooperation mit dem St. Franziskushospital Lohne",
      "Tiergestützte Therapie mit Therapiehund Jano und Bienenvölkern (freiwillig)",
      "Arbeitstherapie nach BORA; Belastungserprobungen als fester Bestandteil.",
      "Arbeitskleidung, Lebenslauf und Bewerbungsunterlagen zur beruflichen Orientierung mitbringen."
    ],
    "factsExtra": [
      "112 vollstationäre und 5 ganztägig ambulante Plätze laut Klinikseite",
      "Männerspezifisch; Frauenhaus desselben Trägers ist St. Vitus Visbek"
    ],
    "wahlleistungenHinweis": "WLAN befristet; Wäsche gegen Gebühr; Nähzimmer gegen Entgelt. Sauna und Schwimmbad nach ärztlicher Genehmigung."
  },
  "ck-martha-stz": {
    "kontraindikationen": [
      "Aufnahme nicht vorgesehen, solange Sie noch entzügig sind; Entgiftung im Krankenhaus idealerweise vorab."
    ],
    "alltag": [
      "Einzelzimmer; gemeinsame Wohnbereiche, Therapieraum und Wohnküche in kleinen Gruppen (maximal 13 Personen je Gruppe).",
      "Eltern-Kind-Apartments mit Kinderzimmer; großes Spielzimmer und Ergotherapie-Bereich.",
      "Fitnessraum, Café, Werkraum und Turnhalle; Tischtennis sowie Schwimmhalle Ohlsdorf als Freizeitangebot.",
      "Besucherführung mittwochs nach telefonischer Anmeldung."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung und praktische Unterstützung bei Anträgen und Schuldenregulation.",
      "Unterstützung bei Wohnungs- und Arbeitssuche.",
      "Angehörigen- und Paargespräche."
    ],
    "therapieHinweise": [
      "Integratives Konzept, tiefenpsychologisch fundiert mit verhaltenstherapeutischen Elementen.",
      "Stationäre Entwöhnung in der Regel 15 Wochen; kürzere Auffangtherapien möglich.",
      "Gruppen u. a. Angst und Depression, Rückfallprävention, Skillstraining, Sucht und Arbeit, Elternsein.",
      "Mitaufnahme von Kindern im Alter von ein bis zwölf Jahren."
    ],
    "factsExtra": [
      "Fach- und Tagesklinik im Verbund des SuchtTherapieZentrums der Martha Stiftung in Hamburg-Hummelsbüttel.",
      "Kostenübernahme vor Aufnahme klären; Unterstützung über die STZ-Beratungsstellen Barmbek, Harburg und Hummel."
    ],
    "mitbehandlungHinweis": "Doppeldiagnosen im Angebot, u. a. Sucht und Depression, Angst, bipolare Störungen, Persönlichkeitsstörungen, Traumata, Psychosen, ADHS."
  },
  "ck-medbo-woellershof": {
    "kontraindikationen": [
      "Aktueller Konsum illegaler Drogen; Suchtmittelfreiheit in diesem Bereich wird vorausgesetzt, der Konsum soll weit zurückliegen.",
      "Akute psychotische Zustände; akute Selbsttötungsgefahr.",
      "Schwere hirnorganische Beeinträchtigungen (etwa Alkohol-Demenz).",
      "Schwerste körperliche Beeinträchtigungen (Einzelfallprüfung).",
      "Unzureichende Deutschkenntnisse in Sprechen und Verstehen."
    ],
    "alltag": [
      "Offen geführte Fachklinik in HAUS 19; Zweibettzimmer mit Telefon, Dusche und WC, Bodenbelag teilweise allergikertauglich.",
      "Wechsel in ein Einbettzimmer im Verlauf nach Verfügbarkeit möglich.",
      "Speisesaal, Küche, Hauswirtschaftsraum und Aufenthaltsraum im Haus; Waschmaschinen und Trockner kostenfrei.",
      "Drei Menüs zur Auswahl, alternative Kostformen und Unverträglichkeiten werden berücksichtigt.",
      "Parkgelände mit Sportplatz, Boccia, Kegelbahn und Sinnespfad; kostenloser Fahrradverleih; Kicker und Tischtennis."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung, Arbeitsbelastungserprobung und Belastungserprobung zu Hause.",
      "Unterstützung im Umgang mit Ämtern, bei finanziellen Fragen und bei der Organisation von Hilfen nach Behandlungsende.",
      "Bewerbungstraining; arbeitsbezogene Gruppen für Arbeitslose und Berufstätige; externes Arbeitsplatzpraktikum.",
      "Vermittlung an Suchtberatungsstellen und Selbsthilfegruppen; Selbsthilfegruppen stellen sich im Haus vor.",
      "Angehörigenseminar sowie Familien- und Angehörigengespräche."
    ],
    "therapieHinweise": [
      "Erwachsene mit Abhängigkeit von Alkohol und/oder Medikamenten; Behandlungsplan nach dem BORA-Konzept.",
      "Erstbehandlung in der Regel 15 Wochen, Verkürzung oder Verlängerung im Verlauf möglich; Wiederholer 8–15 Wochen, Auffang- und Festigungsbehandlung 8 Wochen.",
      "Einzel- und Gruppenpsychotherapie mit verhaltenstherapeutischen, integrativen, psychodynamischen, patientenzentrierten, systemischen und körperorientierten Methoden.",
      "Indikative Gruppen u. a. Depressionsbewältigung, Selbstsicherheit, kognitives Training, Kochgruppe, NADA-Ohrakupunktur, Tabak/Cannabis.",
      "Medizinische Rehabilitation bei Abhängigkeitserkrankungen am Bezirksklinikum Wöllershof."
    ],
    "factsExtra": [
      "31 stationäre Rehabilitationsplätze am Bezirksklinikum Wöllershof (Störnstein).",
      "Kennenlerngespräch über den sozialpädagogischen Dienst der Fachklinik; gültige Kostenzusage ist Aufnahmevoraussetzung.",
      "Nahtlose Überleitung aus der hauseigenen Akutsuchtmedizin möglich.",
      "Auftrag ist Sucht-Rehabilitation, nicht die Akutpsychiatrie."
    ],
    "mitbehandlungHinweis": "Gleichzeitig vorhandene psychische Erkrankungen (Doppeldiagnosen) und somatische Erkrankungen (u. a. Bluthochdruck, Diabetes) werden im multiprofessionellen Team mitbehandelt. Bei eingeschränkter körperlicher Belastbarkeit wird das Therapieprogramm angepasst."
  },
  "ck-median-adaption-duisburg": {
    "alltag": [
      "Einzelapartments mit eigener Küche und eigenem Bad; Selbstversorgung, Verpflegungsgeld in der Regel nach der ersten Woche wöchentlich.",
      "Rücklagen für Einkäufe der ersten Woche einplanen. WLAN kostenfrei.",
      "Waschmaschinen und Trockner auf den Etagen gegen Gebühr; Bettwäsche und Handtücher stellt die Hauswirtschaft, Tausch einmal wöchentlich.",
      "Freizeit nach 17:00 Uhr und am Wochenende selbst gestalten. In der gesamten Einrichtung Rauchverbot.",
      "Patin bzw. Pate erklärt Abläufe, Behördenadressen sowie Einkaufs- und Freizeitmöglichkeiten.",
      "Einzelappartements mit integrierter Küche zur Selbstversorgung."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung beim Adaptionsantrag; Vorstellungsgespräch montags 14 Uhr mit Hausführung, Termine unter 0203 30578-28.",
      "Ummeldung beim Duisburger Meldeamt mit Hausbescheinigung und Personalausweis.",
      "Anschluss: ambulant betreutes Wohnen in Wohngemeinschaften oder Einzelwohnen; Vermittlung an andere Träger bei Belegung.",
      "Therapeutisches und sozialpädagogisches Fachpersonal arbeitet zusammen an Abstinenz und Eingliederung."
    ],
    "therapieHinweise": [
      "Aufnahme mit Bestandsaufnahme gesundheitlich, persönlich, beruflich und sozial; gemeinsame Adaptionsziele.",
      "Einzel- und Gruppentherapie plus indikative Angebote zu Wohnen, Beruf, Kreativität und Entspannung.",
      "BORA-Ausrichtung; externe Belastungserprobung in kooperierenden Unternehmen der Region.",
      "Dauer öffentlich: Alkohol- und Medikamentenabhängigkeit bis drei Monate, Drogenabhängigkeit bis vier Monate.",
      "Ausgerichtet an BORA (beruflich orientierte Rehabilitation Abhängigkeitskranker).",
      "Externe Belastungserprobung in kooperierenden Unternehmen der Region."
    ],
    "factsExtra": [
      "Zielgruppe: Abhängigkeitserkrankte nach Fachklinik mit erhöhter Rückfallgefährdung (u. a. Arbeitslosigkeit, Wohnungslosigkeit, soziale Desintegration).",
      "Alkohol-, Medikamenten- und Mehrfachabhängigkeit sowie Glücksspielabhängigkeit. Belegung durch alle Leistungsträger.",
      "Hausversammlung ist verpflichtend; Alkohol- und Drogenkontrollen jederzeit möglich.",
      "Schrittweiser Übergang aus der Fachklinik in die Adaption.",
      "Fokus auf Neustart im Arbeitsleben."
    ]
  },
  "ck-median-adaption-koblenz": {
    "alltag": [
      "Einzel- und Paarzimmer mit integrierter Küchenzeile; Gemeinschaftsküche und Aufenthaltsraum mit TV.",
      "Selbstverpflegung; Hauswirtschafts- und Kochtraining.",
      "Fernseher, Musikanlagen und PC dürfen mitgebracht werden.",
      "Externes Berufspraktikum in Koblenzer Betrieben."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei Anträgen und behördlichen Angelegenheiten.",
      "Hilfestellung bei Schuldner- und Insolvenzberatung.",
      "Nachsorgeplanung (betreutes Wohnen, ambulante Weiterbehandlung); Reha-Fallbegleitung für Versicherte der DRV Rheinland-Pfalz.",
      "Indikative Gruppe Wohnungssuche."
    ],
    "factsExtra": [
      "Adaption nach abgeschlossener Entwöhnung; Behandlungsdauer in der Regel 12–16 Wochen.",
      "Paare, wenn beide betroffen; Mütter und Väter mit Kindern bis zum Vorschulalter nach Vorgespräch.",
      "Differenziertes Behandlungs- und Betreuungsangebot laut Trägerseite.",
      "Einzel- und Gruppengespräche im Konzept."
    ],
    "mitbehandlungHinweis": "Psychische Begleiterkrankungen (u. a. Ängste, Depressionen, Persönlichkeitsstörungen) nach Indikationsklärung; Aufnahme auch aus der forensischen Psychiatrie (§ 64). Paare, wenn beide betroffen; Eltern mit Kindern bis zum Vorschulalter nach Vorgespräch.",
    "therapieHinweise": [
      "Dreimonatige Adaption mit gezielter Wiederherstellung der Erwerbsfähigkeit."
    ]
  },
  "ck-median-adaption-koeln": {
    "alltag": [
      "Schon am ersten Tag Einzelausgang unter Nutzung des Ausgangsbuches.",
      "Im Vordergrund steht das externe Betriebspraktikum; interne Phase je nach Stabilität wenige Tage bis etwa 4–6 Wochen.",
      "Belastungstraining intern u. a. in Hauswirtschaft, Alltagstraining und Selbstorganisation.",
      "Checkliste u. a. Personalausweis, Allergiepass, benötigte Medikamente und Sportkleidung.",
      "Checkliste zur Anmeldung und Aufnahme auf der Klinikseite."
    ],
    "sozialdienstLeistungen": [
      "Bewerbungstraining inkl. Umgang mit lückenhaften Berufsbiografien und Erstellung von Unterlagen an PC-Trainingsplätzen.",
      "Vermittlung in ambulante Nachsorge, ambulant betreutes Wohnen oder stationäre Weiterbetreuung in der Innenstadt-Außenwohngruppe.",
      "Enge Zusammenarbeit mit Kölner Suchthilfe und Trägern der beruflichen Bildung.",
      "Adaption, besondere Wohnform, ambulant betreutes Wohnen und Tagesstruktur.",
      "Nachsorge MyMEDIAN@Home und Rethera Mind im Konzernangebot."
    ],
    "therapieHinweise": [
      "Adaption als zweite Phase direkt im Anschluss an die fachklinische Entwöhnung, verhaltenstherapeutisch.",
      "Handlungskompetenztraining, Einzel- und Gruppengespräche mit sozialarbeiterischem Schwerpunkt.",
      "Regeldauer in der Regel 13 Wochen, in Einzelfällen Verlängerung um vier Wochen.",
      "Schwerpunkt vorrangig Alkohol- und Medikamentenabhängigkeit.",
      "Dreimonatige Adaptionsbehandlung mit Fokus Wiederherstellung der Erwerbsfähigkeit."
    ],
    "factsExtra": [
      "Persönliches Informationsgespräch vor der Aufnahme zum Abgleich von Erwartungen und Indikation.",
      "Standort Mathias-Brüggen-Straße, Köln-Ehrenfeld; Außenwohngruppe in der Kölner Innenstadt.",
      "Suchtmittelfreies Leben als Zielrahmen.",
      "Standort Köln-Ehrenfeld."
    ]
  },
  "ck-median-agz-duesseldorf": {
    "alltag": [
      "Rehatag in der Regel ab 09:00 Uhr, gleitender Beginn zwischen 08:00 und 09:30 Uhr möglich.",
      "Ende je nach Therapieplan in der Regel spätestens 15:00 Uhr.",
      "Therapieplan täglich, nicht wochenweise im Voraus.",
      "Medikamente können im ambulanten Setting zu Hause eingenommen werden.",
      "Ganztägig ambulante Reha: abends Rückkehr in die häusliche Umgebung.",
      "Öffnungszeiten laut Klinik: Mo–Do 08:00–20:00 Uhr, Fr 08:30–14:30 Uhr."
    ],
    "sozialdienstLeistungen": [
      "Psy-RENA vor Ort: zwei Einzelgespräche und 25 Gruppentermine; VT-Problemlösegruppen Mo–Do 16:30–18:00 und 18:30–20:00 Uhr.",
      "Rehasport (u. a. Atemwege sowie Muskel- und Skelett) über Rehasport Deutschland e. V.; Gerätetraining gegen Mitgliedsbeitrag.",
      "Digitale Nachsorge MyMEDIAN@Home (IRENA-Konzept) und Rethera Mind."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutischer Ansatz; Basisangebot: Einzelgespräch mit Bezugstherapeut, soziale Fähigkeiten, Problemlösegruppen, Sport-, Ergo- und Körperwahrnehmung, Entspannung, Einführungsgruppe.",
      "Störungsspezifische Gruppen u. a. Essstörung, Angst, Depression; Alltagserprobung im privaten Kontext."
    ],
    "factsExtra": [
      "Laut Klinik 125 Therapieplätze Psychosomatik und 40 Plätze Kardiologie.",
      "Chefärztin Dr. med. Sabine Zimmerling, Fachärztin für Psychosomatische Medizin und Psychotherapie, Psychoonkologie und psychosomatische Schmerztherapie.",
      "Zusätzlich Prävention (Stark im Beruf, RV fit Hybrid)."
    ]
  },
  "ck-median-agz-hannover": {
    "alltag": [
      "Ruheraum zwischen den Therapien; Bücher- und Spieleschrank.",
      "Mittagessen in der Cafeteria nach DGE-Richtlinien: Hauptgericht, Salatteller und vegetarische Auswahl.",
      "Wasserspender; verschließbare Behälter für die Nutzung erbeten.",
      "Eigenständige Versorgung im häuslichen Umfeld wird vorausgesetzt; Fahrdienst bei medizinischer Notwendigkeit möglich.",
      "Ganztägig ambulante Reha auf rund 8.000 m² mit Therapie- und Sporträumen sowie Ruheraum mit Liegen.",
      "Öffnungszeiten laut Klinik: Mo–Do 07:00–17:00 Uhr, Fr 07:00–16:00 Uhr."
    ],
    "factsExtra": [
      "Versorgungsvertrag nach § 21 SGB IX mit der DRV sowie nach § 40 SGB V für ganztägig ambulante Reha und AHB.",
      "Als gemischte Krankenanstalt nach § 30 GewO konzessioniert; Beihilfefähigkeit für Privatversicherte ausgewiesen.",
      "Fachbereiche Orthopädie, Neurologie und Psychosomatik.",
      "Chefarzt Psychosomatik Andreas Trupp, Facharzt für Psychiatrie und Psychotherapie, Sozialmedizin.",
      "Laut Klinik rund 250 Behandlungsplätze und Prävention (RV-Fit-Kontext)."
    ],
    "wahlleistungenHinweis": "Frühstück und warme Getränke in der Cafeteria gegen Entgelt.",
    "sozialdienstLeistungen": [
      "Interdisziplinäres Team inkl. Sozialarbeit; MBOR bei besonderen beruflichen Problemlagen.",
      "Nachsorge und Prävention im Versorgungsspektrum genannt."
    ],
    "therapieHinweise": [
      "Integriertes methodenübergreifendes Konzept zur Veränderung belastender Lebenssituationen sowie affektiver und körperlicher Reaktionsmuster.",
      "Spektrum u. a. Belastung/Anpassung, Angst, Depression, somatoforme Störungen, Bewältigung bei chronischer Erkrankung oder nach Krebs."
    ]
  },
  "ck-median-agz-leipzig": {
    "alltag": [
      "230 ganztägig ambulante Behandlungsplätze; behindertenfreundlich, für Rollstuhlfahrende geeignet.",
      "Schwimm- und Gymnastikhalle, Bewegungsbad mit Strömungskanal; Cafeteria Mo–Fr 08:30–16:15 Uhr.",
      "Je nach Kostenträger und Behandlungsdauer 3-Gänge-Mittagessen; Fahrdienst am Therapietag; Parkhaus Thomasiusstraße vergünstigt.",
      "Öffnungszeiten Aufnahme: Mo–Do 07:30–19:00 Uhr, Fr 07:30–18:00 Uhr.",
      "Ganztägig ambulante Reha; Wohnen zu Hause, Therapie vor Ort in Leipzig-Zentrum-West."
    ],
    "factsExtra": [
      "AlterG-Ausstattung bis 150 kg genannt.",
      "Privatambulanzen Orthopädie und Neurologie am Standort.",
      "Rezeptbehandlung inkl. Kindertherapie; betriebliche Gesundheitsförderung; Sportmedizinisches Institut."
    ],
    "wahlleistungenHinweis": "Selbstzahlertraining im Sportmedizinischen Institut Leipzig; Rezeptbehandlung inkl. Kindertherapie und betriebliche Gesundheitsförderung am Standort.",
    "mitbehandlungHinweis": "Fachbereiche Orthopädie, Kardiologie, Neurologie und Psychosomatik arbeiten interdisziplinär; auch bei Erkrankungen mehrerer Organsysteme.",
    "sozialdienstLeistungen": [
      "Nachsorge MyMEDIAN@Home und Rethera Mind im MEDIAN-Angebot genannt."
    ],
    "therapieHinweise": [
      "Behandlungsgebiete laut Klinik: Psychosomatik, Orthopädie, Kardiologie, Neurologie, Long Covid sowie Prävention."
    ]
  },
  "ck-median-agz-stuttgart": {
    "kontraindikationen": [
      "Körperliche Erkrankungen müssen ambulant behandelbar sein.",
      "Fachliche Einschätzung ausreichender Stabilität für Abstinenz an Abenden und Wochenenden.",
      "Bei schweren Krankheitsbildern Aufnahmeentscheidung nur nach Vorgespräch."
    ],
    "alltag": [
      "Ganztägig ambulante Rehabilitation: Tag von 8:30 bis 16:30 Uhr, samstags bis 13:00 Uhr.",
      "Morgen- und Tagesabschlussrunde 8:30 und 16:00 Uhr; montags um 16:00 Uhr Vorstellung neuer Rehabilitandinnen und Rehabilitanden.",
      "Gemeinsames Mittagessen um 12:30 Uhr; Behandlungsprogramm montags bis samstags.",
      "Aufnahmetag ist Montag (Eingangsuntersuchung, Erstgespräch Bezugstherapie); Entlasstag ist Samstag.",
      "Tagesklinik rauchfreie Zone; Rauchen nur an bestimmten Orten im Freien.",
      "Offener Infoabend donnerstags um 18:00 Uhr ohne Anmeldung (außer Feiertage)."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung nach Bedarf.",
      "Antragstellung in der Regel über psychosoziale Beratungsstelle, Fachambulanz, Krankenhaus-Sozialdienst oder betrieblichen Sozialdienst.",
      "Externe Arbeitserprobung und Informationsgespräch mit Vertreterinnen bzw. Vertretern des beruflichen Umfelds möglich.",
      "Partner- bzw. Familiengespräche nach Bedarf; Angehörigengruppe 14-tägig."
    ],
    "therapieHinweise": [
      "Ganztägig ambulante Reha für Frauen und Männer ab 18 Jahren bei Abhängigkeit von Alkohol, Medikamenten oder Cannabis.",
      "Hauptbehandlung in der Regel rund 12 Wochen; Kombibehandlung mit 6–8 Wochen ganztägig ambulant und anschließender ambulanter Fortsetzung am Wohnort.",
      "Gruppentherapie viermal wöchentlich; Kunsttherapie, Sport/Fitness, Entspannung und Körperwahrnehmung, Forum, Vorträge, Rückfallanalyse.",
      "Indikationsgruppen, Einzeltherapie durch Bezugstherapie sowie Chef- bzw. Oberarztvisite und Bezugsarztsprechstunde.",
      "In den ersten zwei Wochen umfassende Diagnostik; vorläufiger Behandlungsplan am Ende der zweiten Woche."
    ],
    "factsExtra": [
      "Anfahrt in der Regel maximal 45 Minuten mit öffentlichen Verkehrsmitteln.",
      "Kostenträger u. a. DRV Baden-Württemberg und DRV Bund, Krankenkassen und weitere Träger nach Absprache.",
      "22 Plätze in zentraler Innenstadtlage (Rotebühlstraße 133, Stuttgart) laut Trägerkonzept."
    ],
    "wahlleistungenHinweis": "Beihilfefähig laut Klinikseite. Zuzahlung abhängig von Kostenträger und Einkommen; Befreiung unter bestimmten Voraussetzungen möglich.",
    "mitbehandlungHinweis": "Mitbehandlung komorbider psychischer Störungen, insbesondere affektiver Störungen, Angst- und Anpassungsstörungen sowie Persönlichkeitsstörungen. Körperliche Begleit- und Folgeerkrankungen aus Innerer Medizin, Orthopädie und Neurologie im ambulanten Rahmen."
  },
  "ck-median-berggieshuebel": {
    "kontraindikationen": [
      "Akute Suizidalität.",
      "Primäre Suchterkrankungen mit aktueller Abhängigkeitssymptomatik, bei denen zunächst eine körperliche Entgiftung erforderlich ist.",
      "Schizophrene oder bipolare Störungen mit derzeit bestehender Akutsymptomatik.",
      "Ausgeprägte hirnorganische Beeinträchtigungen (z. B. hirnorganische Psychosyndrome).",
      "Klinisch relevante demenzielle Erkrankungen.",
      "Body-Mass-Index unter 16; Kinder und Jugendliche unter 16 Jahren."
    ],
    "alltag": [
      "Einzelzimmer mit Balkon; barrierefreie, vollausgestattete Zimmer genannt.",
      "Abholung vom Bahnhof Pirna bei Anreise mit öffentlichen Verkehrsmitteln; Parkplatz bei Anreise mit dem PKW.",
      "Psychosomatik: pflegerische Aufnahme im 4. Obergeschoss; Bezugspsychotherapeutin bzw. Bezugspsychotherapeut für Einzel- und Gruppenpsychotherapie.",
      "Am ersten Freitag Begrüßung durch die Bezugsgruppe und Klinikrundgang; erste Gruppensitzung regulär am folgenden Montag."
    ],
    "sozialdienstLeistungen": [
      "Sozialrechtliche Informationen und sozialtherapeutische Beratung.",
      "Hilfen zur Reintegration ins Berufsleben; sozialmedizinische Bewertung."
    ],
    "therapieHinweise": [
      "Integratives Konzept mit kognitiv-verhaltenstherapeutischen und tiefenpsychologisch fundierten Methoden.",
      "Beschwerdespezifische Psychotherapiegruppen, u. a. Angstbewältigungsgruppe; Konfrontation wird vorbereitet und kann ambulant fortgesetzt werden.",
      "Reha für Orthopädie und Psychosomatik; Chefarzt Psychosomatik Facharzt für Psychiatrie und Psychotherapie.",
      "Digitale Nachsorge Rethera Mind / MyMEDIAN@Home."
    ],
    "factsExtra": [
      "193 Betten am Standort, davon 92 in der Psychosomatik und 101 in der Orthopädie laut Klinikseite.",
      "Chefarzt Psychosomatik Dr. med. Sven Alex (Facharzt für Psychiatrie und Psychotherapie, Sozialmedizin).",
      "Checkliste zum Anreisetag auf der Klinikseite (u. a. Personalausweis, Versichertenkarte, Impf- und Allergiepass)."
    ]
  },
  "ck-median-berka-ilmtal": {
    "sozialdienstLeistungen": [
      "Sozialmedizinische Betreuung bei Krankheitsverarbeitung, Stressbewältigung und Planung der Rückkehr in Alltag und Beruf"
    ],
    "therapieHinweise": [
      "Methodenintegratives Kurzzeitkonzept mit Schwerpunkten Verhaltenstherapie und Tiefenpsychologie",
      "Halboffene Gruppenpsychotherapie plus ergänzende Einzeltherapie",
      "Gestaltungs-, Ergo-, Musik- und Tanztherapie; Bewegung inkl. Yoga, Qi Gong, Nordic Walking und Achtsamkeit",
      "In gruppentherapeutischen Settings höchstens 12 Patientinnen und Patienten je Bezugstherapeut"
    ],
    "factsExtra": [
      "Chefärztin Psychosomatik: Dr. med. Ute Reinbach-Rödiger",
      "Eigenes Haus im Reha-Zentrum Bad Berka, neben der Adelsberg-Klinik"
    ],
    "mitbehandlungHinweis": "Comorbidität Sucht ist ausgewiesenes Behandlungsspektrum der Ilmtal-Klinik.",
    "alltag": [
      "Einzelzimmer 17–19 m² mit eigenem Bad und Fernseher, teilweise mit Balkon; barrierefreie Zimmer vorhanden.",
      "Kein Kühlschrank im Zimmer; Safe an der Rezeption; Allergikerbettwäsche auf Anfrage beim Housekeeping.",
      "WLAN über Medienpauschale; Waschmaschine und Trockner gegen Gebühr.",
      "Besuche nach Absprache, vorzugsweise am Wochenende; Haustiere aus hygienischen Gründen nicht gestattet.",
      "Schwimmbad und MTT-Raum nach ärztlicher Freigabe außerhalb der Therapie; keine Sauna im Haus.",
      "Mittags und abends Buffet, mittags meist zwei warme Gerichte; Sonderkost nach Absprache."
    ],
    "wahlleistungenHinweis": "WLAN und Telefon über Medienpauschale. Kein Bademantel und kein Föhn im Zimmer. Parken auf dem Klinikgelände kostenfrei. Fahrdienst vom Bahnhof nach Absprache."
  },
  "ck-median-bernkastel": {
    "kontraindikationen": [
      "Klinik Moselhöhe (Psychosomatik) nicht barrierefrei; keine Aufnahme bei Angewiesensein auf Gehhilfen.",
      "Ausschluss: Abhängigkeitserkrankungen, Essstörungen, akute Psychosen, Suizidalität.",
      "Körpergewicht über 135 kg (Zulassung der Sportgeräte)."
    ],
    "therapieHinweise": [
      "Psychosomatik und Psychotherapie in der Klinik Moselhöhe; weitere Häuser u. a. Bernkastel, Burg Landshut, Moselschleife.",
      "Federführend DRV Bund; auch regionale RV, Krankenkassen, Selbstzahler und Beihilfe.",
      "MBOR von Beginn an mit Überprüfung der Leistungsfähigkeit im Tagesablauf.",
      "Indikative Gruppen u. a. zu Schmerz, Depression, Stress und Angst.",
      "Kunst-, Tanz- und Ergotherapie, Yoga, Körperwahrnehmung, Entspannung, Lehrküche."
    ],
    "factsExtra": [
      "Abholung am Bahnhof Wittlich nach telefonischer Abstimmung.",
      "Begleitpersonen nach Verfügbarkeit über den Reservierungsservice.",
      "Kurgastzentrum mit Friseur, Kiosk, Café und Bibliothek in unmittelbarer Nähe.",
      "Medikamente für den gesamten Aufenthalt plus aktuellen Medikationsplan (ggf. mit QR-Code) mitbringen; Kühlung im Pflegestützpunkt möglich."
    ],
    "alltag": [
      "Einzelzimmer ca. 16 m² mit eigenem Bad, Fernseher und Wertschließfach; kein Kühlschrank und kein Föhn im Zimmer.",
      "Therapien beginnen in der Regel um 7:00 Uhr; Essen im Speisesaal (morgens/abends Buffet, mittags zwei Gerichte), nicht auf dem Zimmer.",
      "WLAN über Medienpauschale; Waschen und Trocknen gegen Gebühr (je 2,50 Euro).",
      "Keine Kinderaufnahme, keine Haustiere; Alkohol nicht gestattet.",
      "Besuch in der Psychosomatik am Wochenende möglich."
    ],
    "sozialdienstLeistungen": [
      "Sozialtherapie im psychosomatischen Programm; interdisziplinäres Team mit Sozialarbeit."
    ],
    "wahlleistungenHinweis": "Medienpauschale WLAN 35 Euro (2 Mbit/s) oder 80 Euro (8 Mbit/s) für drei Wochen, Zahlung an der Rezeption."
  },
  "ck-median-brandis": {
    "alltag": [
      "Begleitperson: Doppelzimmer bzw. Aufbettung nach Bedarf und Verfügbarkeit.",
      "Rauchen nur im ausgewiesenen Raucher-Pavillon, nicht auf Balkon oder Terrasse.",
      "Schwimmbad und Sauna täglich außer montags nach ärztlicher Zustimmung; Fitnessraum nach Einweisung.",
      "Nachtruhe 22:00–06:00 Uhr (Freitag/Samstag 23:00–06:00 Uhr); Mittagsruhe am Wochenende 13:00–15:00 Uhr.",
      "Kein Alkohol auf dem Gelände; Kinder und Haustiere nicht aufnehmbar.",
      "Medikamente können im Pflegestützpunkt kühl gelagert werden; mobiler Kühlschrank gegen Gebühr ausleihbar."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung u. a. zu Arbeitsplatz, Rente, Antragstellungen, wirtschaftlicher Versorgung und finanziellen Schwierigkeiten; Termin über den Stationsarzt."
    ],
    "therapieHinweise": [
      "Psychosomatik: Gruppengespräche mit Bezugspsychotherapie, ergänzt durch Einzel-, Gestaltungs- und Sporttherapie sowie Entspannungsverfahren und indizierte Gruppen.",
      "Ganzkörperkryotherapie in der Kältekammer (Temperaturen bis –110 °C) u. a. bei rheumatischen und degenerativen Erkrankungen.",
      "Nichtrauchertraining im Klinikangebot; Gartengruppe und Bewegungsangebote im Schwimmbad.",
      "Interdisziplinäres Team aus Medizin, Pflege, Psychotherapie und Sozialarbeit.",
      "Stationäre Reha Orthopädie und Psychosomatik; psychologische und Leistungsdiagnostik am Standort."
    ],
    "factsExtra": [
      "Zwei Direktaufnahme-Zimmer mit postakutstationärem Standard für kurzfristige AHB-Aufnahmen.",
      "Kleine Hausbibliothek und Raum der Besinnung im 5. OG; Andacht einmal pro Woche in der Klinik.",
      "Postakut- und Rehabilitationszentrum am Waldrand östlich von Leipzig.",
      "Zimmer am Abreisetag bis 08:00 Uhr frei geben."
    ],
    "wahlleistungenHinweis": "WLAN im Empfangsbereich gratis, übrige Bereiche kostenpflichtig (Medienpauschale an der Rezeption). Mobiler Kühlschrank gegen Gebühr. Begleitperson im Doppelzimmer bzw. per Aufbettung nach Verfügbarkeit.",
    "mitbehandlungHinweis": "Am Standort Orthopädie/Rheumatologie und Innere Medizin; Begleiterkrankungen verschiedener Fachgebiete können mitbehandelt werden."
  },
  "ck-median-burggraben": {
    "therapieHinweise": [
      "Chefarzt Psychosomatik Dr. med. (SU) Alexey Tarasov, Facharzt für Psychiatrie, Psychotherapie und Sozialmedizin.",
      "Angstbehandlung verhaltenstherapeutisch und psychoedukativ mit Fokus Selbstmanagement und sozialer Handlungskompetenz.",
      "Integratives multimodales psychosomatisches Angebot; Kooperation mit dem Psychotherapeutischen Lehrinstitut Bad Salzuflen.",
      "Bei Depression tiefenpsychologisch orientiert, ergänzt um kognitive und interpersonelle Ansätze.",
      "Entspannung u. a. Progressive Muskelentspannung, Achtsamkeitstraining, Qigong; Physio- und Sporttherapie."
    ],
    "factsExtra": [
      "Private Krankenanstalt nach § 30 GewO und Vorsorge-/Rehabilitationseinrichtung nach § 107 SGB V.",
      "Modellprojekt mit der DRV Westfalen für Versicherte der Region mit akut bedrohter Arbeitsfähigkeit (Psychosomatik).",
      "Beihilfefähigkeit laut Klinik-PDF Innere Medizin/Kardiologie ausgewiesen.",
      "Ganztägig ambulante Rehabilitation zusätzlich zum Stationären genannt."
    ],
    "alltag": [
      "Drei verbundene Häuser Quellenhof, Tannenhof und Wiesenhof, jeweils mit eigenem Speisesaal.",
      "Zimmer mit Balkon; Begleitperson gegen Gebühr auf Zustellbett oder in gemietetem Einzelzimmer, soweit verfügbar.",
      "Cafeteria, Friseursalon, Aufenthaltsbereiche; Schwerlastbetten und HTS-Zimmer mit Lichtsignalanlage am Standort."
    ],
    "sozialdienstLeistungen": [
      "Nachsorge über MyMEDIAN@Home und Rethera Mind laut Klinikseite.",
      "AHB-Anmeldung über den Krankenhaus-Sozialdienst; Reservierungsservice Nord-West für Termine."
    ],
    "wahlleistungenHinweis": "MEDIAN premium: moderne Einzelzimmer auf Hotelniveau mit Lounge und Restaurant; auch premium Zweibettzimmer und executive Suite mit Balkon. Begleitperson gegen Gebühr.",
    "mitbehandlungHinweis": "Am Standort auch Kardiologie, Pneumologie, Orthopädie/Unfallchirurgie sowie HTS/Cochlea; internistische Mitbehandlung im Hausrahmen."
  },
  "ck-median-daun-adaption": {
    "alltag": [
      "Einzelzimmer mit eigenem Bad; Gemeinschaftsräume, Küchen und Aufenthaltsbereiche.",
      "Mahlzeiten nicht in der Klinik: selbst einkaufen und kochen, tägliches Verpflegungsgeld.",
      "Gewohnte finanzielle Leistungen plus Verpflegungsgeld in der Adaptionszeit."
    ],
    "factsExtra": [
      "Adaption nach Entwöhnung (Phase I); Dauer in der Regel 8–16 Wochen, Verlängerung möglich.",
      "Aufnahme nach Vorgespräch, Kostenzusage und Teilnahmefähigkeit.",
      "Teil des MEDIAN Rehazentrums Daun neben Am Rosenberg, Thommener Höhe und Fachambulanz."
    ],
    "kontraindikationen": [
      "Interne Adaption nur nach regulär beendeter Phase I im MEDIAN Rehazentrum Daun (Thommener Höhe, Am Rosenberg oder Altburg)."
    ],
    "sozialdienstLeistungen": [
      "Soziotherapeutische Begleitung des Praktikums inkl. Bilanzgespräche und Betriebsbesuche.",
      "Kosten für Fahrt und Arbeitskleidung werden erstattet; gleiche Geldleistung wie in Phase I plus Verpflegungsgeld.",
      "Hausgruppe wöchentlich zu Alltag, Haushalt, Kochen und Freizeit; geschützte Arbeitsbereiche u. a. kaufmännische Übungsfirma und Überbetriebliches Ausbildungszentrum Wittlich."
    ],
    "therapieHinweise": [
      "Dreiphasenmodell: Vorbereitung im letzten Drittel der Fachklinik, zentrale Phase mit externem Praktikum, Ablösephase zu Wohnen, Beruf und Nachsorge.",
      "Externes Praktikum in der Regel vier Tage à acht Stunden; ein Therapietag in der Klinik mit Bezugsgruppe, Einzelgespräch, Arztkontakt und Sozialberatung.",
      "Praktikum startet in der Regel am zweiten oder dritten Tag nach Einzug; Vorbereitung durch Bewerbungstraining und Jobcoaching.",
      "Interne Adaption öffentlich 8–11 Wochen bei Alkohol, Medikamenten und Glücksspiel, bis 16 Wochen bei Drogen bzw. Polytoxikomanie.",
      "Nach Behandlung in Altburg: Adaption für Eltern mit nicht schulpflichtigen Kindern; zwei extra geräumige Zimmer.",
      "Paare: jedes Paarmitglied bewohnt ein eigenes Zimmer; Fortsetzung der Paartherapie möglich."
    ]
  },
  "ck-median-daun-rosenberg": {
    "alltag": [
      "Checkliste: Personalausweis, KV-Karte, Entlassungs-/Arztberichte, Medikamente der ersten Tage.",
      "Besuche ab der dritten Behandlungswoche freitagabends, am Wochenende und an Feiertagen; Angehörige Fr ab 16:00 Uhr bis So 17:30 Uhr; Erstbesuch mit kurzer Besucherinformation.",
      "Ausgang in den ersten zwei Wochen auf das Klinikgelände beschränkt; Nachtruhe 23:00–6:00 Uhr.",
      "Patin oder Pate aus der Bezugsgruppe begrüßt Neuankommende; Anreise am Aufnahmetag bis 10:00 Uhr; Abholservice vom Bahnhof Gerolstein nach Voranmeldung.",
      "Zimmer mit eigenem Bad; in der Abhängigkeitsabteilung Einzel- und Zweibettzimmer, in der Psychosomatik Einzelzimmer laut Patientenwegweiser.",
      "Kein Fernseher auf dem Zimmer (Aufenthaltsräume); Gemeinschaftskühlschränke, Allergikerbettwäsche bei Bedarf."
    ],
    "therapieHinweise": [
      "Psychosomatik und Suchtrehabilitation (Alkoholabhängigkeit und Verhaltenssüchte) in einer Klinik.",
      "Indikative Gruppen zu Suchtmittelkonsum in der Psychosomatik-Abteilung.",
      "Psychosomatik: Kostenzusage in der Regel bis fünf Wochen mit Verlängerungsmöglichkeit; Basis u. a. Verhaltenstherapie, Ergotherapie, Sport, Physiotherapie, Sozialtherapie.",
      "Abhängigkeitsabteilung: Regeldauer 8–15 Wochen bei Alkohol- und Medikamentenabhängigkeit, 22 Wochen bei Drogenabhängigkeit; erste Aufnahmewoche auf der gemeinsamen Aufnahmestation in der Klinik Thommener Höhe.",
      "Indikative Gruppen Abhängigkeit u. a. Rückfallvorbeugung, traumaspezifische Stabilisierung, Frauengruppe, kognitives Training, Virtual-Reality-Angebot."
    ],
    "factsExtra": [
      "Patientenwegweiser Abhängigkeit und Psychosomatik als PDF der Klinik.",
      "0,0 Promille bei Aufnahme in der Abhängigkeitsabteilung genannt.",
      "150 Behandlungsplätze am Standort, davon 72 in der Abhängigkeitsabteilung und 78 in der Psychosomatik.",
      "Neubau mit 62 Patientenzimmern, barrierefrei, darunter vier rollstuhlgerechte Zimmer; jedes neue Zimmer mit Bad sowie Balkon oder Terrasse.",
      "Unverbindliches Kennenlernen der Klinik nach Absprache mit der Öffentlichkeitsarbeit möglich."
    ],
    "kontraindikationen": [
      "Akute Eigen- oder Fremdgefährdung (z. B. akute Suizidalität), akute Drogenintoxikation, Abhängigkeitserkrankungen ohne Abstinenz, akute Psychosen.",
      "Pflegebedarf oberhalb von Pflegegrad 2, Immobilität, Demenz, ausgeprägte Intelligenzminderung, fehlende Gruppentherapiefähigkeit (z. B. ausgeprägte Hörminderung oder deutliche Sprachbarrieren).",
      "BMI unter 17,5 oder Körpergewicht über 150 kg; Personen unter 18 Jahren nicht vorgesehen."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung zu beruflicher Wiedereingliederung, Finanzen und sozialer Absicherung, Schwerbehindertenrecht, Schulden und Behördenkontakten.",
      "Indikative Gruppen u. a. Rückkehr an den Arbeitsplatz, berufliche Neuorientierung, Umgang mit Konflikten und Mobbing."
    ]
  },
  "ck-median-dormagen": {
    "alltag": [
      "112 vollstationäre Plätze, grundsätzlich Einzelzimmer (ehemaliges Hotel) mit Telefon, Fernseher und Internetzugang.",
      "Checkliste zum Start mit Personalausweis, KV-Karte, Arztberichten.",
      "Zimmer ca. 16 m² mit eigenem Bad, abschließbarem Fach und Teppich; barrierearme Zimmer und Allergikerbettwäsche bei Bedarf.",
      "Kein Kühlschrank und kein Föhn im Zimmer; Handtücher werden gestellt, Bademäntel nicht.",
      "Therapien in der Regel ab 8:30 Uhr; Essen im Speisesaal (morgens/abends Buffet, mittags zwei Gerichte; vegetarisch, vegan nach Absprache).",
      "Besuch nach den ersten beiden Behandlungswochen außerhalb der Therapiezeiten und am Wochenende; Haustiere nicht gestattet; Parken auf dem Gelände kostenfrei."
    ],
    "therapieHinweise": [
      "IST-Konzept Integrative Sucht- und Traumatherapie bei PTBS.",
      "Integrative Sucht- und Depressionstherapie als zweiter Schwerpunkt.",
      "Behandlung auf Grundlage der modernen Verhaltensmedizin bzw. Neuropsychotherapie nach Grawe.",
      "Bezugsgruppentherapie in der Regel viermal wöchentlich; Zuordnung der Traumabehandlung in eine von vier Bezugsgruppen vor Aufnahme.",
      "Reine Frauengruppe im Konzept Integrative Sucht- und Traumatherapie."
    ],
    "factsExtra": [
      "Behandlungsdauer laut Konzept 8–16 Wochen, im Einzelfall länger.",
      "Entgiftung vor Therapiebeginn individuell zu klären; Abstinenzgebot zu Therapiebeginn.",
      "Antragsunterlagen über Suchtberatungsstelle."
    ],
    "kontraindikationen": [
      "Hochgradig kognitive Störungen wie Demenzen oder Korsakoff-Syndrom.",
      "Akute Schizophrenien oder andere psychotische Störungen; akute Suizidalität.",
      "Körperliche Erkrankungen, die die Rehabilitationsfähigkeit maßgeblich beeinträchtigen.",
      "Fehlende Abstinenz von anderen Drogen; Body-Mass-Index unter 17,5.",
      "Medikamentöse Weiterbehandlung mit Methylphenidat (z. B. Ritalin, Medikinet) oder Tetrahydrocannabinol (Dronabinol, THC, Cannabis)."
    ],
    "sozialdienstLeistungen": [
      "Formale Aufnahme u. a. durch Verwaltung oder Sozialdienst; Wegweiser und Therapiewochenplan am Anreisetag.",
      "Soziotherapie im Behandlungskonzept; Unterlagen zu sozialen Klärungsbedarfen während des Aufenthalts mitbringen."
    ],
    "wahlleistungenHinweis": "WLAN und Telefon über Medienpauschale (1,00 Euro/Tag an der Rezeption); ab der sechsten Behandlungswoche unentgeltlich. Waschmaschinen und Trockner gegen 2,50 Euro je Nutzung.",
    "mitbehandlungHinweis": "Mitbehandlung assoziierter Begleit- und Folgeerkrankungen u. a. Depression, Angst, PTBS, leichte kognitive Störungen, somatoforme und Schlafstörungen, Polyneuropathie, Leberschäden und Bluthochdruck laut Klinikseite."
  },
  "ck-median-gottleuba": {
    "kontraindikationen": [
      "Keine Aufnahme bei Bedarf an akuter psychiatrischer oder internistischer Behandlung, z. B. akute Suizidgefahr oder lebensbedrohliches Untergewicht bei Magersucht.",
      "Primäre Suchterkrankungen werden nicht behandelt.",
      "Keine Akut-Einweisungen.",
      "Haustiere aus hygienischen Gründen nicht gestattet.",
      "Häuser 1, 2, 3 sowie 6 und 7 der Klinik für Psychosomatik sind nicht barrierefrei."
    ],
    "alltag": [
      "Psychosomatik in fünf Jugendstilhäusern; Unterbringung in Einzelzimmern mit Dusche, WC, Fernseher und Telefon (15–18 m²).",
      "Neue Rehabilitandinnen und Rehabilitanden werden von einem Paten aus der Therapiegruppe in den Klinikalltag eingeführt.",
      "Besuche in den Öffnungszeiten; Übernachtung nur nach vorheriger Anmeldung.",
      "Kinder ab 4 Jahren als Begleitperson oder Therapiekind möglich; in der Familienklinik in der Regel gemeinsame Unterbringung.",
      "Abholung am Bahnhof Pirna dienstags bis donnerstags um 11:30 Uhr öffentlich genannt."
    ],
    "sozialdienstLeistungen": [
      "Sozialmedizinische Beratung und Unterstützung als dritte Säule neben Psychotherapie und medizinischer Behandlung."
    ],
    "therapieHinweise": [
      "Schwerpunkt Verhaltenstherapie; krankheitsbildbezogene Gruppen (u. a. Angst, Schmerz, Depression) plus Problemlösegruppen und Einzeltherapie.",
      "Bezugstherapeutin bzw. Bezugstherapeut von der Aufnahme bis zur Entlassung.",
      "Therapeutisches Bogenschießen als körpertherapeutisches Angebot ausgewiesen.",
      "Ergotherapie mit kognitivem Training, Kreativtherapie, Projektgruppen und Belastungserprobung.",
      "Psychosomatische Rehabilitation neben Orthopädie, Kardiologie, Stoffwechsel sowie Familien- und Kinderreha am selben Campus."
    ],
    "wahlleistungenHinweis": "WLAN-Zugang kostenpflichtig, Konditionen an der Rezeption. Parkplatzgebühr 3 Euro pro Tag bzw. 15 Euro pro Woche. Bademantel vor Ort ausleihbar.",
    "mitbehandlungHinweis": "Drei Säulen: Psychotherapie (Verhaltenstherapie), medizinische und ggf. medikamentöse Behandlung, sozialmedizinische Beratung. Medikamente für den gesamten Aufenthalt und aktueller Medikationsplan zur Anreise.",
    "factsExtra": [
      "Traditionsklinik seit 1913 im Gesundheitspark mit sechs Fachkliniken.",
      "Familienklinik und Kinder- und Jugendreha am Campus."
    ]
  },
  "ck-median-graal-mueritz": {
    "alltag": [
      "Einzelzimmer 18–25 m² mit Dusche/WC, Safe und Fernseher; barrierefreie Zimmer vorhanden.",
      "Kein Kühlschrank und kein Föhn auf dem Zimmer (Föhn ausleihbar); keine Allergikerbettwäsche.",
      "Waschmaschine und Trockner im Haus (Waschen 3,00 €, Trocknen 2,00 €).",
      "WLAN kostenpflichtig (24,00 € für den Aufenthalt); Telefon 5,00 € Medienpauschale.",
      "Essen im Speisesaal, nicht auf dem Zimmer; vegetarische Option ausgewiesen.",
      "Anreise und Aufnahme 09:00–13:00 Uhr; Fahrdienst vom Bahnhof bis 16:00 Uhr."
    ],
    "sozialdienstLeistungen": [
      "AHB, Heilverfahren, teilstationäre und ambulante Reha sowie MBOR am Standort.",
      "Nachsorgeangebote des Trägers (u. a. MyMEDIAN@Home) auf der Klinikseite genannt.",
      "Nachsorge MyMEDIAN@Home und Rethera Mind laut Klinikseite."
    ],
    "therapieHinweise": [
      "Drei Fachabteilungen Orthopädie, Pneumologie und Psychosomatik mit konsiliarischer Zusammenarbeit bei Komorbidität.",
      "Therapien ab 07:00 Uhr; Gerätetraining nach medizinischer Freigabe auch außerhalb der Therapiezeiten.",
      "Schwimmbad und Sauna außerhalb der Therapiezeiten nach Absprache mit der behandelnden Ärztin bzw. dem behandelnden Arzt.",
      "Integratives multimodales Konzept mit tiefenpsychologischen und verhaltenstherapeutischen Bausteinen.",
      "Rehabilitationsfokus laut Klinik auf den Gruppenprozess, nicht allein auf Einzeltherapie."
    ],
    "factsExtra": [
      "Fachklinik für Orthopädie, Pneumologie und Psychosomatik an der Ostsee; zusätzlich MEDIAN Wellbeing als private Tagesklinik Psychosomatik.",
      "Parkplatz auf dem Klinikgelände kostenlos; Friseur sowie Praxen für Logopädie und Dermatologie im Haus.",
      "Keine Haustiere; Alkohol während des Aufenthalts nicht gestattet.",
      "Dermatologische Praxis im Haus.",
      "Tagesklinik-Angebot am Standort ausgewiesen (Weiterleitung MEDIAN Wellbeing)."
    ],
    "wahlleistungenHinweis": "WLAN und Telefon gegen Gebühr. MEDIAN select: kostenpflichtige Komfortpakete und 1-Raum-Appartement auf Anfrage; Begleitperson im Appartement nach Konditionsauskunft möglich."
  },
  "ck-median-hohenfeld": {
    "alltag": [
      "Schwimmbad außerhalb der Therapiezeiten mit ärztlicher Erlaubnis.",
      "DGE-zertifizierte Ernährung; sparsam Salz, Verzicht auf Geschmacksverstärker.",
      "Unterbringung im Einzelzimmer mit eigenem Bad, Telefon und Fernseher; Zimmergröße rund 12,5 m², abschließbares Fach, Allergikerbettwäsche auf Bedarf.",
      "Kein Kühlschrank im Zimmer; Gemeinschaftskühlschränke und Medikamentenkühlschrank.",
      "WLAN und Telefon über Medienpauschale; Waschmaschinen gegen Gebühr.",
      "Anreise zwischen 10:00 und 12:00 Uhr; am Entlassungstag Zimmer bis 08:30 Uhr räumen."
    ],
    "therapieHinweise": [
      "Abteilung für Psychosomatische Medizin und Psychotherapie mit dem gesamten Spektrum der Psychotherapie; daneben Orthopädie.",
      "Chefärztin Psychosomatik Dr. med. Constanze Erdt."
    ],
    "kontraindikationen": [
      "Keine Akut-Einweisungen.",
      "Keine Mitaufnahme von Kindern; Haustiere aus hygienischen Gründen nicht gestattet."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung im psychosomatischen Programm; Schwerpunkt-Bezugsgruppen u. a. zu beruflichen Problemlagen."
    ],
    "factsExtra": [
      "369 kernsanierte Patientenzimmer; 12 rollstuhlgerechte Zimmer sowie 2 Zimmer für kleinwüchsige Patientinnen und Patienten.",
      "Fahrdienst vom Bahnhof Bad Camberg nach Absprache; Bahnhof rund 1,7 km.",
      "Therapien ab dem ersten Tag nach der Anreise; Cafeteria im Haus."
    ],
    "wahlleistungenHinweis": "Wahlleistungszimmer (select Living) mit Balkon, 40-Zoll-Bildschirm, Bademantel und Zugang zur Tee-Lounge (Kaffee, Tee, Mineralwasser); WLAN im Wahlleistungsbereich inklusive."
  },
  "ck-median-kinzigtal-soden": {
    "therapieHinweise": [
      "Integrative Psychotherapie (verhaltenstherapeutisch und psychodynamisch) neben Orthopädie und Sportmedizin.",
      "Chefarzt Dr. med. (Univ. Zagreb) Rudolf Pastovic, Facharzt für Psychosomatische Medizin und Psychotherapie.",
      "Integrative Psychotherapie: verhaltenstherapeutisch und tiefenpsychologisch, ressourcenorientiert mit psychodynamischen Elementen.",
      "Einzel- und Gruppenpsychotherapie; Gruppen zu Depression, Angst, Schmerz, Stress, Trauma und Mobbing.",
      "Ergo- und Gestaltungstherapie, Kunst-, Musik- und Genusstherapie sowie Entspannungstraining.",
      "Hirnleistungstraining und Ernährungsberatung im psychosomatischen Programm."
    ],
    "alltag": [
      "Sie wohnen in Einzelzimmern (ca. 11–13 m²) mit eigenem Bad, Fernseher und abschließbarem Fach; überwiegend mit Balkon.",
      "Doppelzimmer (ca. 18,5 m²) für Begleitperson oder Kind; drei Zimmer und das Gebäude sind rollstuhlgerecht.",
      "WLAN und Telefon gegen Medienpauschale an der Rezeption; Waschmaschine und Trockner gegen Gebühr.",
      "Frühstück und Abendessen als Buffet, mittags zwei Gerichte; vegetarisch und nach Absprache vegan.",
      "Alkohol ist in der Klinik nicht gestattet; Haustiere sind nicht möglich.",
      "Parken auf dem Klinikgelände kostenfrei; Handtücher werden gestellt, Föhn bitte selbst mitbringen."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung und Konfliktbearbeitung rund um den Arbeitsplatz im psychosomatischen Programm."
    ],
    "factsExtra": [
      "Fachklinik für Orthopädie, Sportmedizin und Psychosomatik; Chefarzt Psychosomatik Dr. med. (Univ. Zagreb) Rudolf Pastovic.",
      "Lage am Kurpark mit Anbindung an die Spessart-Therme (reduzierter Eintritt).",
      "Teilstationäre Reha mit Ruheraum und Mittagessen möglich; Anreise werktags."
    ],
    "wahlleistungenHinweis": "Bademantel gegen Gebühr; WLAN und Telefon über Medienpauschale (Zahlung an der Rezeption). Begleitperson nach Kapazität, Preise über Rezeption."
  },
  "ck-median-kuehlungsborn": {
    "alltag": [
      "Besuch montags bis freitags 16:00–20:00 Uhr, am Wochenende tagsüber bis 20:00 Uhr.",
      "Haustiere aus hygienischen Gründen nicht gestattet; Alkoholkonsum in der Klinik nicht gestattet.",
      "Im Erwachsenenhaus Gemeinschaftskühlschränke, kein Kühlschrank auf dem Zimmer; Mutter-Kind-Apartments mit Küchenzeile und Kühlschrank.",
      "Abholung vom Bahnhof Kühlungsborn West nach Absprache.",
      "Helle Einzelzimmer mit eigenem Bad, Durchwahltelefon, Radio und Fernseher; kostenpflichtiges WLAN im Haus.",
      "Cafeteria mit Dachterrasse, Aufenthaltsräume, Fitnessraum, Schwimmbad und Sauna."
    ],
    "wahlleistungenHinweis": "Medienpauschale für Telefon, TV und WLAN 5 € pro Woche, Zahlung an der Rezeption. Föhn gegen 10 € Leihgebühr. Parken auf dem Klinikgelände kostenpflichtig. Waschraum im Untergeschoss des Mutter-Kind-Hauses, Kosten je Waschgang 2–6 €.",
    "kontraindikationen": [
      "Mutter-Kind-Kur: u. a. Suchterkrankungen, Suizidgefährdung, floride Infektionskrankheit mit Isolationsbedarf, akut entgleiste chronische Krankheiten mit apparativer Überwachung, immunsupprimierte Patientinnen ohne ausreichende Eigenversorgung, mobilitätseinschränkende Gehbehinderung."
    ],
    "sozialdienstLeistungen": [
      "Kinderclub/Kinderbetreuung während der Therapiezeiten bei Mutter-Kind-Maßnahme.",
      "MBOR mit Ergo- und Psychotherapie in Einzel- und Gruppenarbeit."
    ],
    "therapieHinweise": [
      "Frauenspezifisches psychosomatisches Konzept; Gruppenpsychotherapie zur Themenklärung und Ressourcenaktivierung.",
      "Mögliche Begleiterkrankungen laut Klinik u. a. Hypertonus, Diabetes, Adipositas, Tabakabhängigkeit, Asthma, Schlafstörungen, Migräne."
    ],
    "factsExtra": [
      "Reine Frauenklinik für psychosomatische Reha.",
      "Zusätzlich Mutter-Kind-Kuren mit direktem Strandzugang.",
      "Chefärztin Dr. med. Sabine Barry, Fachärztin für Psychiatrie und Psychotherapie."
    ]
  },
  "ck-median-lobenstein": {
    "alltag": [
      "194 Einzelzimmer und 22 Doppelzimmer mit Dusche, WC, Telefon- und Fernsehanschluss; Teil der Zimmer mit Balkon.",
      "Sechs allergenarme und 24 rollstuhlgerechte Zimmer.",
      "Haustiere aus hygienischen Gründen nicht gestattet; Unterbringung von Kindern nicht möglich.",
      "Zwei Waschmaschinen gegen Gebühr, Trockner kostenfrei; Schwimm- und Gymnastikhalle sowie Fitnessraum.",
      "Unterbringung in Einzelzimmern mit eigenem Bad; Zimmergröße 15–35 m².",
      "TV gebührenpflichtig; abschließbares Fach im Zimmer und an der Rezeption."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung im psychosomatischen Therapieangebot."
    ],
    "therapieHinweise": [
      "Psychosomatik vorrangig als Gruppentherapiekonzept auf tiefenpsychologischer und verhaltenstherapeutischer Grundlage.",
      "Indikationsstellung vor Aufnahme anhand der Aktenlage; ggf. noch ausstehende Diagnostik vor Therapiebeginn.",
      "Reha für Orthopädie, verhaltensmedizinische Orthopädie und Psychosomatik.",
      "Heilverfahren/AHB DRV und GKV; Prävention."
    ],
    "factsExtra": [
      "Sanitätshaus Rosenau bietet dienstags und donnerstags Orthopädietechnik in der Klinik an.",
      "WLAN gebührenpflichtig (Medienpauschale); keine Sauna im Haus.",
      "Hauseigenes Schwimmbad; Handtücher für den Klinikaufenthalt werden gestellt.",
      "Kooperationen mit anderen Reha- und Akutkliniken sowie niedergelassenen Ärztinnen/Ärzten und Psychologinnen/Psychologen."
    ],
    "mitbehandlungHinweis": "Am Standort auch Orthopädie und verhaltensmedizinische Orthopädie. Orthopädische und internistische Begleiterkrankungen nach interner Prüfung mitbehandelbar.",
    "wahlleistungenHinweis": "Pauschalkur (Selbstzahler) laut Klinikseite: Übernachtung im Einzelzimmer, Vollverpflegung, Schwimmbad. Gästeaufenthalt im Patientenzimmer der besuchten Person gegen Tagessatz möglich."
  },
  "ck-median-mecklenburg": {
    "alltag": [
      "Einzel- und Doppelzimmer mit Dusche und WC in übersichtlichen Hausgemeinschaften.",
      "Ein Zimmer behindertengerecht; Turnhalle, Fitnessraum, Sauna, PC-Raum, Eltern-Kind-Raum, klinikeigener Kindergarten.",
      "Strukturierter Tagesablauf.",
      "Bei Aufnahme ein Mitpatient als Pate; Behandlungsbuch mit Wochenplänen zu Therapien, Visiten und Arztsprechstunden mitbringen.",
      "Zimmer nicht abschließbar; mitgebrachte Medikamente beim Pflegepersonal abgeben, Ausgabe ausschließlich durch Klinikmitarbeitende.",
      "Besuch nach Anmeldung Mo–Fr 16:15–21:30 Uhr, Wochenende/Feiertag 08:30–21:30 Uhr; höchstens drei elektronische Geräte, Nutzung nur mit Kopfhörern."
    ],
    "therapieHinweise": [
      "Konzepte für Stimulanzienabhängigkeit und Traumafolgestörungen genannt.",
      "Anmeldung in der Regel über Suchtberatungsstellen, Fachambulanzen oder Krankenhaus-Sozialdienste.",
      "Entwöhnungsbehandlung in der Regel sechs Monate.",
      "Zusätzlich Angebote zu Psychose und Sucht, ADHS und Sucht sowie Paar- und Familientherapie.",
      "Eltern-Kind-Behandlung: gemeinsames Zimmer, Betreuung im klinikeigenen Kindergarten, Erziehungstraining und Elterngruppe."
    ],
    "factsExtra": [
      "Anerkennung nach §§ 35–36 BtMG.",
      "Nahtlose Verlegung aus Entzug möglich.",
      "Paare, Schwangere und Eltern mit Begleitkindern im Auftrag.",
      "Aufnahmekriterien laut Kliniküberblick: Bewerbung mit Lebenslauf und Suchtverlauf, gültige Kostenzusage und Drogenfreiheit.",
      "Entzugsbehandlung direkt vor Aufnahme in der Regel einplanen; suchtmittelfreier Therapieantritt.",
      "Beihilfefähig; Belegung durch DRV Bund und andere Rentenversicherungen, Krankenkassen und Sozialhilfeträger."
    ],
    "kontraindikationen": [
      "Aufnahme für drogenabhängige Frauen und Männer ab 18 Jahren.",
      "Drogenfreiheit bei Aufnahme laut Kliniküberblick."
    ],
    "sozialdienstLeistungen": [
      "Arbeitstherapie gemäß BORA-Konzept.",
      "Lehrküche und Ernährungsberatung.",
      "Erziehungstraining und Elterngruppe im Eltern-Kind-Angebot."
    ]
  },
  "ck-median-muehlengrund": {
    "kontraindikationen": [
      "Keine Suchterkrankungen, schweren Verhaltensstörungen, schweren Depressionen mit Suizidalität, Psychosen oder hochgradigen Intelligenzminderungen."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutisches, kreatives und sportmedizinisches Konzept.",
      "Virtual-Reality-Expositionstherapie bei Angststörungen.",
      "Konsile diabetologisch, orthopädisch, kardiologisch und neurologisch möglich."
    ],
    "alltag": [
      "Einzelzimmer 14–20 m² mit eigenem Bad, Fernseher und abschließbarem Fach; barrierearme Zimmer, 23 rollstuhlgerecht; alle mit Balkon.",
      "Begleitpersonen können im Zimmer (Zustellbett oder Schlafcouch) übernachten; Kinder und Haustiere nicht zur Mitaufnahme.",
      "Nichtraucherklinik im Gebäude, ausgewiesener Raucherplatz auf dem Gelände; Alkohol während des Aufenthalts nicht gestattet.",
      "WLAN in der Cafeteria kostenfrei, sonst gegen Entgelt; Waschmaschinen und Trockner gegen Gebühr; Bademantel gegen Gebühr an der Rezeption.",
      "Zwei Handtücher, ein Badetuch und eine Badevorlage, in der Regel einmal wöchentlich gewechselt.",
      "Frühstück und Abendessen als Buffet, mittags Menüwahl aus zwei Gerichten; vegetarisch und vegan möglich."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung im Behandlungskonzept ausgewiesen."
    ],
    "factsExtra": [
      "Zwei Häuser: Im Junkerngrund und Alte Mühle; Fachbereiche Orthopädie, Psychosomatik, Innere Medizin/(Psycho-)Kardiologie und Neurologie.",
      "Hauseigener Fahrdienst MediTransFair vom Bahnhof Bad Wildungen nach Voranmeldung; Dialyse im Haus.",
      "Therapiebauernhof in der Psychosomatik; Hippotherapie in der Neurologie.",
      "Keine Akut-Einweisungen; Garagen nicht vorhanden.",
      "Parkplätze begrenzt; Behindertenparkplatz an der Rezeption mit Ausweis G oder AG anmelden."
    ],
    "wahlleistungenHinweis": "Bademantel gegen Reinigungs- und Pfandgebühr an der Rezeption. WLAN außerhalb der Cafeteria gegen Entgelt; Medienpauschale an der Rezeption."
  },
  "ck-median-odenwald": {
    "alltag": [
      "Waldnahe Rehaklinik; Leben-und-Wohnen-Seite der Klinik.",
      "Virtual-Reality-Therapie für Phobien und Suchterkrankungen genannt.",
      "Überwiegend Einzel- oder Doppelzimmer mit eigener Nasszelle; einzelne Zimmer rollstuhlgerecht und allergenarm.",
      "Begleitkinder von 0 bis 12 Jahren nach Rücksprache mit klinikeigener Kinderbetreuung und Schulunterricht in umliegenden Schulen.",
      "Besuche in der Regel am Wochenende, individuell vereinbar.",
      "Bezugsgruppe mit 12 Personen; wöchentlich vier Gruppentherapiesitzungen plus Eigenarbeit."
    ],
    "therapieHinweise": [
      "Abteilung Abhängigkeitserkrankungen und Psychosomatik unter einem Dach.",
      "Jugendpsychosomatik für 16–21-Jährige.",
      "Integratives, multimodales tiefenpsychologisch fundiertes Gruppentherapiekonzept mit verhaltenstherapeutischen und systemischen Elementen.",
      "Monatlich wechselnde themenzentrierte Gruppen zu Komorbidität und Beruf; Indikationsgruppen u. a. zu Angst und sozialen Hemmungen.",
      "Reguläre stationäre Behandlungsdauer bei Alkoholabhängigkeit in der Regel drei bis vier Monate; Kurzzeit bei stabiler sozialer Integration möglich.",
      "Jugendpsychosomatik 16–21 Jahre: generationenübergreifendes Bezugsgruppensystem, Reflecting-Teams, Familiengespräche."
    ],
    "factsExtra": [
      "Bei Aufnahme negative Drogenurinbefunde und unauffällige Alkoholtests genannt.",
      "Glücksspiel- und Online-Sucht im Fokus der Klinikseite.",
      "Mindest-BMI 14,5 während des Aufenthalts bei Essstörung laut Klinikseite.",
      "Versorgungsvertrag § 111 SGB V, beihilfefähig; gesetzlich, privat und Selbstzahlende.",
      "Schwimmbad, Kneippbecken, Sauna, Fitnessraum, Sporthalle, Lehrküche, Minigolf und Fahrradverleih auf dem Gelände."
    ],
    "kontraindikationen": [
      "Akute Suizidalität",
      "Nicht abgeschlossene Entgiftung oder Entzugssymptomatik",
      "Heroinabhängigkeit oder Substitution",
      "Akute psychotische Symptomatik",
      "Pflegebedürftigkeit",
      "Körperliche Erkrankungen, die eine akutstationäre Krankenhausbehandlung erfordern"
    ],
    "sozialdienstLeistungen": [
      "Sozialmedizinische Klärung der beruflichen Leistungsfähigkeit.",
      "Beantragung von Leistungen zur beruflichen Teilhabe.",
      "Individuelle Sozialberatung in der Jugendpsychosomatik; Vernetzung mit Eltern, Betreuenden, Vor- und Nachbehandlern.",
      "Nachsorge in der Fachambulanz Darmstadt."
    ]
  },
  "ck-median-psm-duerkheim": {
    "kontraindikationen": [
      "Akute Selbstgefährdung; akute oder chronische Psychosen; fremdaggressives Verhalten.",
      "Bestehende Medikamenten-, Drogen- und Alkoholabhängigkeit oder ausgeprägter Missbrauch.",
      "Lebensalter unter 18 Jahren; BMI kleiner als 17; Gewicht über 160 kg.",
      "Wenn Unterstützung bei alltäglichen Verrichtungen (Körperpflege, Ankleiden) benötigt wird."
    ],
    "alltag": [
      "Essen im Speisesaal, nicht auf dem Zimmer.",
      "Veganes Essen nach Absprache; Unverträglichkeiten vor Anreise mitteilen.",
      "Kein Alkoholkonsum während des Aufenthalts.",
      "Einzelzimmer mit eigenem Bad, 18–24 m², Safe; Fernsehen in Aufenthaltsräumen, nicht auf dem Zimmer.",
      "Anreise möglichst bis 10:00 Uhr; Zuordnung zu einem von vier Behandlungsteams, Abholung an der Rezeption.",
      "Waschmaschinen und Trockner gegen Gebühr (Waschen 2,50 €, Trocknen 1,50 €); WLAN kostenpflichtig."
    ],
    "therapieHinweise": [
      "Mehr als 40 Jahre verhaltenstherapeutisches Konzept.",
      "Gruppen für spezifische Störungsbilder; altersspezifische Angebote; Organmedizin in der Medizinischen Zentrale.",
      "Therapien beginnen am Tag nach der Anreise; Bezugsarzt in der Regel am Anreisetag, Bezugstherapie spätestens am Folgetag.",
      "Essstörungsprogramm mit Therapievereinbarung und bei Untergewicht Gewichtsvertrag; Vorgespräch zur Indikation möglich.",
      "Körperliche Untersuchung am Anreisetag; ob eine medikamentöse Mitbehandlung nötig ist, wird dort festgelegt."
    ],
    "factsExtra": [
      "Dauermedikamente für den gesamten Aufenthalt mitbringen, plus aktueller Medikationsplan.",
      "Beihilfefähig; von privaten Krankenkassen als gemischte Krankenanstalt anerkannt.",
      "Bahnhof rund 550 m fußläufig.",
      "Keine Sauna im Haus; Ergometerraum nach medizinischer Freigabe und Einweisung.",
      "Während des Aufenthalts öffentlich genannte Promille-Obergrenze 0,5."
    ],
    "wahlleistungenHinweis": "WLAN 18 € oder 35 € für drei Wochen je nach Datenvolumen, Zahlung an der Rezeption. Telefon 0,20 €/Minute. Bademäntel werden nicht angeboten.",
    "mitbehandlungHinweis": "Medikamentöse Mitbehandlung nach der Aufnahmeuntersuchung durch den Bezugsarzt; Organmedizin in der Medizinischen Zentrale."
  },
  "ck-median-ptk-liebenwerda": {
    "alltag": [
      "Checkliste zum Start mit Personalausweis, KV-Karte, Arztberichten.",
      "Eltern-Kind-Konzept als Schwerpunktseite.",
      "Unterbringung in Doppelzimmern (ca. 25 m²) mit eigenem Bad, abschließbarem Fach und Föhn; barrierefreie Zimmer vorhanden.",
      "Kein Fernseher im Zimmer, Aufenthaltsräume für Fernsehabende; Teppichböden, Allergikerbettwäsche bei Bedarf.",
      "Gratis-WLAN; Waschmaschine und Trockner gegen 1 € je Vorgang.",
      "Morgens und abends Buffet, mittags zwei Gerichte; vegetarisch möglich, vegan nicht regelmäßig vorgesehen."
    ],
    "factsExtra": [
      "122 Behandlungsplätze.",
      "Abholung bzw. Direktverlegung von der Entgiftungsstation im Kliniküberblick genannt.",
      "Unterlagen stehen laut FAQ im Einladungsschreiben."
    ],
    "kontraindikationen": [
      "Drogenabhängigkeit als Haupt-Suchtdiagnose.",
      "Akute Psychosen mit Selbst- oder Fremdgefährdung; ansteckende Krankheiten wie Tbc.",
      "Hirnorganische Störungen mit erheblicher Orientierungsstörung (z. B. ausgeprägtes Korsakow-Syndrom).",
      "Körperliche Funktionseinschränkungen mit Pflegebedürftigkeit; schwere Erkrankungen mit sofortigem stationärem Behandlungsbedarf."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung zu Finanzen, Behörden, Wohnen und beruflicher Rehabilitation; Hilfeplan in der ersten Therapiewoche.",
      "Internes Arbeitstherapiepraktikum und Vorbereitung eines externen Praktikums; Bewerbungstraining im EDV-Kabinett.",
      "Nachsorgeplanung mit Suchtberatungsstellen, Selbsthilfe und ggf. Adaption."
    ],
    "therapieHinweise": [
      "Zwölfwöchiges 3-Phasen-Modell mit Schwerpunkt medizinisch-beruflich orientierter Rehabilitation.",
      "Phase 1 (Woche 1): Orientierung und Psychoedukation; Phase 2 (Woche 2–6): tägliche Gruppe und wöchentliche Einzelgespräche; Phase 3 ab Woche 7: Reintegration und Praktika.",
      "Alkohol- und/oder Medikamentenabhängigkeit; Polytoxikomanie nur, wenn Alkohol oder Medikamente im Vordergrund stehen.",
      "Entzugsbehandlung vor Reha nur bei erheblichem Suchtmitteleinfluss oder ausgeprägten Entzugssymptomen."
    ],
    "mitbehandlungHinweis": "Begleitende somatische Erkrankungen (z. B. Stoffwechselstörungen) und psychiatrische Begleiterkrankungen (z. B. Depression) werden fachlich mitbehandelt."
  },
  "ck-median-pyrmont-psm": {
    "kontraindikationen": [
      "Kinder und Jugendliche unter 18 Jahren grundsätzlich nicht; Ausnahmen ab 16 Jahren nach ambulanter Voruntersuchung.",
      "Primäre Alkohol-, Medikamenten- oder Drogenabhängigkeit.",
      "Akut suizidgefährdete oder psychotisch erkrankte Menschen.",
      "Schwere hirnorganische Beeinträchtigungen oder reduzierte kognitive Fähigkeiten.",
      "Schwer gehbehinderte oder rollstuhlpflichtige Patientinnen und Patienten; forensische Patientinnen und Patienten oder Therapieauflage."
    ],
    "therapieHinweise": [
      "Rein verhaltenstherapeutisches Konzept; Bezugstherapeutensystem.",
      "U. a. Essstörungen, Depression, somatoforme Störungen, Burnout und Tinnitus."
    ],
    "alltag": [
      "199 Einzelzimmer, davon 3 allergenarm und 27 mit Balkon; Standard mit Fernseher, Telefon, Dusche, WC und rollstuhlgerechter Einrichtung.",
      "Waschmaschinen und Trockner gegen Gebühr; gebührenpflichtiges WLAN im gesamten Haus.",
      "Patensystem am Aufnahmetag: längere Rehabilitandinnen und Rehabilitanden führen Klinikrundgang und erste Orientierung durch.",
      "Ankunft bis 10:00 Uhr vorgesehen; Fahrdienst vom Bahnhof Bad Pyrmont. Taxifahrten vom Bahnhof werden nicht erstattet.",
      "Parkplätze begrenzt; Nutzung privater Fahrzeuge während des Aufenthalts auf eigene Verantwortung.",
      "Patientenbibliothek mit Selbsthilfeliteratur. Freitagvormittag Einführungsveranstaltung zum verhaltenstherapeutischen Ansatz."
    ],
    "sozialdienstLeistungen": [
      "Soziotherapie zu Beruf, Wiedereinstieg, Ausbildung, Teilhabe und Nachsorge.",
      "Beratung zu Finanzen und individuelle Belastungserprobung.",
      "Bei Bedarf Kontaktaufnahme mit Behörden, Beratungsstellen und Nachsorgeeinrichtungen."
    ],
    "factsExtra": [
      "Ambulantes Vorgespräch, insbesondere bei Ess- und Zwangsstörungen sowie vorausgegangenen Psychosen.",
      "VR-Therapie bei Angsterkrankungen und Phobien; rTMS als nicht-invasive Ergänzung bei Depression und Angst."
    ],
    "wahlleistungenHinweis": "Gebührenpflichtiges WLAN im gesamten Haus. Waschmaschinen und Trockner gegen Gebühr.",
    "mitbehandlungHinweis": "Aufnahmeuntersuchung mit Routinelabor, EKG sowie Messung von Größe, Gewicht, Blutdruck und Puls. Bei Bedarf Belastungs-EKG, 24-Stunden-Blutdruck, Lungenfunktion, Ultraschall, Schlafapnoe-Screening und EEG."
  },
  "ck-median-rhein-haardt": {
    "alltag": [
      "Checkliste zum Start: Personalausweis, KV-Karte, Entlassungsberichte, Medikamente.",
      "Unterbringung in Doppelzimmern (ca. 18 m²) mit eigenem Bad, begründet mit dem therapeutischen Konzept.",
      "Kein Fernseher und kein Safe im Zimmer; Gemeinschaftskühlschrank nutzbar; Zimmer nicht barrierefrei.",
      "Waschmaschine kostenfrei; WLAN über Medienpauschale an der Rezeption.",
      "Essen im Speisesaal: morgens und abends Buffet, mittags zwei Gerichte; Unverträglichkeiten vor Anreise mitteilen.",
      "Therapien beginnen in der Regel um 8:00 Uhr; MTT-Raum nach ärztlicher Freigabe und Einweisung."
    ],
    "factsExtra": [
      "Rehaklinik für Abhängigkeitserkrankungen und Psychosomatik.",
      "Patientenmanagement unter den Klinik-Durchwahlen der Trägerseite.",
      "Rehaklinik für Abhängigkeitserkrankungen (Alkohol, Medikamente) und Psychosomatik.",
      "Geschlechtsspezifische Trennung in der Gruppenpsychotherapie im kultursensiblen Setting möglich.",
      "Wertgegenstände und größere Geldbeträge laut Checkliste zu Hause lassen."
    ],
    "wahlleistungenHinweis": "Zuzahlung und Befreiung auf der Klinikseite erläutert (gesetzliche Zuzahlung).",
    "sozialdienstLeistungen": [
      "Sozialtherapie und Sozialberatung zu alltäglichen Fragen durch die Sozialarbeiterin der Klinik.",
      "Entwöhnungsantrag in der Regel über Suchtberatungsstelle; Psychosomatik über Haus- oder Facharzt."
    ],
    "therapieHinweise": [
      "Sucht-Reha: Verhaltenstherapie, psychodynamische, gesprächs- und systemische Elemente in Einzel und Gruppe.",
      "Interne Arbeitstherapie (Hausdienste) und realitätsnahe Arbeitserprobung bei örtlichen Firmen gegen Ende.",
      "Kultursensible Entwöhnung auf Deutsch, Russisch und Polnisch (Bezugsgruppe, Indikativgruppen, Einzel).",
      "Psychosomatik: Diagnostik, Gestaltung, Bewegung, Gesundheitsbildung; Indikativgruppen Stress, Angst, Depression, Genuss.",
      "Psychosomatik nur auf Deutsch; Patenschaften zwischen Mitrehabilitandinnen und Mitrehabilitanden."
    ]
  },
  "ck-median-roemhild": {
    "alltag": [
      "Checkliste zum Start mit Ausweisen, KV-Karte, Arztberichten.",
      "Klinikbus holt Anreisende an der Zentralhaltestelle Römhild ab.",
      "33 Einbett- und 56 Zweibettzimmer; mit Ausnahme eines Hauses eigene Dusche und WC; Telefonanschluss, teilweise Balkon.",
      "Barrierefreie Zimmer und Allergikerbettwäsche vorhanden; kein Fernseher im Zimmer, Fernsehen in Aufenthaltsräumen.",
      "WLAN und Telefon über Medienpauschale; Waschmaschinen und Trockner gegen Gebühr.",
      "Frühstück und Abendessen als Buffet; Alkohol in der Klinik nicht gestattet."
    ],
    "factsExtra": [
      "145 Behandlungsplätze, rund 80 Mitarbeitende.",
      "Interdisziplinäre Suchtbehandlung nach aktuellen wissenschaftlichen Standards laut Klinikseite.",
      "Anbau für paar- und familienorientierte Therapie; weitere Villen im Park, Sportkomplex und Arbeitstherapiegebäude.",
      "Schnelleinweisung über DRV Mitteldeutschland aus qualifizierter Entzugsbehandlung oder über die ARGE möglich.",
      "Stimulanzienabhängigkeit in Verbindung mit pathologischem Glücksspiel im Angebot."
    ],
    "sozialdienstLeistungen": [
      "Sozialdienst klärt soziale, berufliche und organisatorische Fragen; Unterlagen zu Übergangsgeld oder Arbeitslosengeld bei Bedarf mitbringen."
    ],
    "therapieHinweise": [
      "Behandlung von Alkohol-, Drogen-, Medikamenten- und Mehrfachabhängigkeit; besonderer Schwerpunkt u. a. Crystal Meth.",
      "Indikative Gruppen u. a. Angst, Depression, soziales Kompetenztraining, Bewerbungstraining, EDV, Hirnleistungstraining, Raucherentwöhnung und Kochen.",
      "Elternbehandlung mit begleitenden Kindern; Therapie von Paaren; Adaption auf dem Klinikgelände in einem separaten Gebäude.",
      "Arbeitstherapie (Schreinerei, Metall, Fahrradwerkstatt, Garten) und Gestaltungstherapie (Seidenmalerei, Korbflechten, Speckstein).",
      "Sportkomplex mit Sporthalle, Schwimmbecken, Fitnessraum und Sauna; Bogenschießen und Aquatherapie genannt."
    ],
    "wahlleistungenHinweis": "WLAN und Telefon über Medienpauschale; Waschmaschinen und Trockner gegen Gebühr.",
    "mitbehandlungHinweis": "Komorbide Depressionen, Angsterkrankungen, Persönlichkeitsstörungen und Psychosen werden in der Sucht-Reha mitbehandelt."
  },
  "ck-median-rothenfelde": {
    "therapieHinweise": [
      "Psychosomatik seit 1995; 110 stationäre Betten plus fünf ganztägig ambulante Rehaplätze.",
      "Gesamtgebiet der Psychosomatik; auch Rehabilitanden mit orthopädischen und inneren Erkrankungen im psychosomatischen Gesamtplan.",
      "Chefarzt Psychosomatik Dr. med. Roland Kiehl (Psychosomatik, Allgemeinmedizin, Sozialmedizin, Suchtmedizin).",
      "Einzel- und Gruppentherapie, Tanztherapie, Yoga, Gestaltungstherapie, Ergotherapie und konzentrative Bewegungstherapie.",
      "Bewegungs- und Sporttherapie, Entspannung, Achtsamkeit, Ernährungsberatung und Angehörigenarbeit.",
      "Indikationen u. a. Depression, Somatisierung, Erschöpfung, Angst, Trauer, Schmerz/Fibromyalgie sowie psychosomatischer Gesamtplan bei orthopädischen und inneren Erkrankungen."
    ],
    "factsExtra": [
      "Kompetenzzentrum MBOR.",
      "245 Einzel- und 25 Doppelzimmer; Café Classic; Geräteraum mit Ergometer, Laufband und Crosstrainer außerhalb der Therapiezeiten.",
      "Kompetenzzentrum MBOR; stationär und ganztägig ambulant in Orthopädie und Psychosomatik."
    ],
    "wahlleistungenHinweis": "Premium-Station mit gehobener Ausstattung laut Klinikangabe.",
    "alltag": [
      "Einzelzimmer 17–20 m² mit eigenem Bad und Fernseher; rund 80 allergenarme Zimmer; Allergikerbettwäsche auf Anfrage.",
      "Kein Safe und kein Kühlschrank im Zimmer; Wertsachen-Safe an der Rezeption; einzelne Zimmer mit abschließbarem Fach.",
      "Handtücher für den Alltag stellt die Klinik; extra Handtücher für Therapie und Schwimmbad bitte mitbringen.",
      "Besuche in den Öffnungszeiten; Kinder und Haustiere sind nicht vorgesehen; Alkohol im Haus nicht gestattet.",
      "Waschmaschine und Trockner gegen Gebühr; WLAN und Telefon über Medienpauschale an der Rezeption.",
      "AHB-Zimmer behindertenfreundlich mit Pflegebett; Zustellbett für Begleitpersonen möglich, kein klinikeigenes Gästehaus."
    ],
    "sozialdienstLeistungen": [
      "Einzelberatung zu sozialen, sozialrechtlichen, beruflichen und persönlichen Fragen.",
      "Unterstützung bei Teilhabe am Arbeitsleben, stufenweiser Wiedereingliederung und GdB-Feststellung.",
      "Beratung zu Übergangsgeld, Hilfen zum Lebensunterhalt und Pflegeversicherung.",
      "Vermittlung in Selbsthilfe, Beratungsstellen, Behörden und ambulanten Rehasport; Initiierung von Nachsorge."
    ]
  },
  "ck-median-saale-koesen": {
    "therapieHinweise": [
      "Integrativer, vorwiegend verhaltenstherapeutischer Ansatz, ergänzt durch Tiefenpsychologie.",
      "Basis-, Depressions-, Angst-, Schmerz- und Stressgruppen; Sport-/Bewegungstherapie, Ergo- und Kreativtherapie."
    ],
    "kontraindikationen": [
      "Dissoziative und dissoziale Persönlichkeitsstörungen nicht im psychosomatischen Spektrum."
    ],
    "alltag": [
      "Einzel- und Doppelzimmer mit Dusche/WC, Telefon und Fernseher; die meisten mit Balkon.",
      "Rollstuhlgerechte Zimmer; Krankenhausbetten auf Wunsch.",
      "Buffet mittags und abends, täglicher Salatbuffet; spezielle Kost nach Absprache.",
      "Therapien vormittags 8:00–12:15 Uhr und nachmittags 13:00–17:00 Uhr; Hausschluss 22:30 Uhr."
    ],
    "sozialdienstLeistungen": [
      "Sozialdienst für berufliche Wiedereingliederung, Anträge und Planung der Nachbetreuung."
    ],
    "factsExtra": [
      "Fachklinik für Orthopädie und Psychosomatik; ärztlicher Bereitschaftsdienst rund um die Uhr.",
      "Nachsorge über MyMEDIAN@Home."
    ],
    "wahlleistungenHinweis": "Friseur und medizinische Fußpflege auf Wunsch buchbar. Begleitperson im Zustellbett nach Verfügbarkeit; physiotherapeutische Behandlung der Begleitperson mit Rezept möglich."
  },
  "ck-median-salze": {
    "therapieHinweise": [
      "Eigene psychosomatische Fachabteilung; laut Klinik können nahezu alle psychosomatischen Erkrankungen rehabilitiert werden.",
      "Daneben Orthopädie.",
      "Chefarzt Psychosomatik Andreas Trupp (Psychiatrie, Psychotherapie, Sozialmedizin).",
      "Einzel- und Gruppentherapie, Bewegungstherapie, Entspannung (PMR, Atmung, Achtsamkeit) und Kneipp-Anwendungen.",
      "Psychoedukation zum Zusammenhang von Stress, Gefühl und Körpersymptom; Alltags- und Lebensbewältigung im Therapieplan.",
      "Therapiezeiten in der Regel vormittags bis nachmittags; Umfang richtet sich nach dem Krankheitsbild."
    ],
    "alltag": [
      "Einzelzimmer rund 15 m² mit eigenem Bad, Fernseher und abschließbarem Fach; barrierefreie Zimmer vorhanden.",
      "Kein Kühlschrank und kein Föhn auf dem Zimmer; Allergikerbettwäsche auf Anfrage; Handtücher stellt die Klinik.",
      "Besuche täglich bis 22 Uhr; Kinder und Haustiere sind nicht vorgesehen.",
      "Frühstück und Abendessen als Buffet, mittags zwei Gerichte; vegetarisch und nach Vorankündigung vegan bzw. bei Unverträglichkeit.",
      "Waschmaschine und Trockner gegen Gebühr; WLAN und Telefon über Medienpauschale.",
      "Schwimmbad und Fitnessbereich SalzeVita nach ärztlicher Freigabe; Klinikbus in die Stadt."
    ],
    "factsExtra": [
      "Die meisten Zimmer mit Balkon, teilweise Blick ins Tal; sieben behindertengerecht ausgestattete Zimmer.",
      "Zustellbett für Begleitpersonen auf Anfrage; Abholung durch Fahrdienst nach Abstimmung mit dem Reservierungsservice."
    ],
    "wahlleistungenHinweis": "WLAN und Telefon als kostenpflichtige Medienpauschale; Bademantel gegen Gebühr ausleihbar."
  },
  "ck-median-schlangenbad": {
    "kontraindikationen": [
      "Akute Psychosen und akute Suizidalität; ausgeprägte dissoziative Zustände; bipolare Störungen; Manien.",
      "Ausgeprägtes selbstverletzendes Verhalten; primäre Suchterkrankungen; hirnorganisch bestimmte Störungsbilder.",
      "Ausgeprägtes Untergewicht (BMI unter 17) oder Übergewicht (Körpergewicht über 130 kg)."
    ],
    "alltag": [
      "Essen im Patienten-Restaurant.",
      "Kein Alkoholkonsum in der Klinik.",
      "Thermalhallenbad Aeskulap Therme schließt an das Klinikgebäude an.",
      "Einzelzimmer mit Balkon und eigenem Bad, 16–31 m², Safe und Fernseher; barrierefreie Zimmer vorhanden.",
      "Anreise zwischen 10:00 und 11:00 Uhr; Zimmer am Entlassungstag bis 08:30 Uhr räumen.",
      "Kein Kühlschrank und kein Föhn im Zimmer; Allergikerbettwäsche; Handtücher werden gestellt."
    ],
    "therapieHinweise": [
      "Schulenübergreifend Verhaltenstherapie und Tiefenpsychologie.",
      "Chefärztin Psychosomatik Petra Marx.",
      "Gynäkologische Psychosomatik neben Rheumatologie und Gynäkologie.",
      "Kerntherapie aus Gesprächs-, Körperpsycho- und Gestaltungs- bzw. Ergotherapie, meist in thematisch offenen Gruppen.",
      "Bezugstherapie und/oder therapeutisch ausgebildeter Bezugsarzt; indikative Gruppen u. a. Stress, Stabilisierung, Achtsamkeit.",
      "Therapiebegleithund Rosie; multimodales Schmerzkonzept u. a. bei Fibromyalgie und Endometriose."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung im multimodalen Schmerzkonzept der Klinik genannt."
    ],
    "factsExtra": [
      "Gynäkologie-Abteilung im 5. Stock mit eigenem Wohnzimmer, Unterbringung nur von Frauen.",
      "Anbindung an die Aeskulap Therme; freies Schwimmen im beispielhaften Tagesplan.",
      "Akut-Einweisungen sind nicht vorgesehen."
    ],
    "wahlleistungenHinweis": "WLAN kostenpflichtig (am Anreisetag und für die MEDIAN-Nachsorge-App gratis). Medienpauschale an der Rezeption. Begleitperson nach Klinikangebot möglich."
  },
  "ck-median-schmannewitz": {
    "kontraindikationen": [
      "Keine Akut-Einweisungen.",
      "Keine Unterbringung von Kindern oder Haustieren."
    ],
    "alltag": [
      "Unterbringung im Einzelzimmer (17,5–23 m²) mit eigenem Bad; Doppelzimmer für Begleitperson bei Bedarf.",
      "Fernseher gebührenpflichtig; WLAN und Telefon über Medienpauschale.",
      "Fahrdienst vom und zum Bahnhof Dahlen.",
      "Vegetarische Speisen; veganes Essen nach Absprache; Alkohol nicht gestattet.",
      "Waschmaschinen und Trockner gegen Gebühr."
    ],
    "sozialdienstLeistungen": [
      "Nachsorge MyMEDIAN@Home zum Weitertrainieren von zu Hause."
    ],
    "wahlleistungenHinweis": "MEDIAN select mit Komfortzimmern, Club-Lounge und persönlichem Ansprechpartner; buchbar über Privatversicherung, Zusatzversicherung oder als Selbstzahler. Premium-Paket mit kostenfreier Medienpauschale.",
    "mitbehandlungHinweis": "Kardiologie, Orthopädie, Onkologie und Psychosomatik am Standort. Begleitperson im Doppelzimmer möglich.",
    "therapieHinweise": [
      "Eigene Abteilung Psychosomatik und Psychotherapie neben Orthopädie, Kardiologie und Onkologie."
    ],
    "factsExtra": [
      "Nicht identisch mit der VITREA-Klinik Dahlen.",
      "Waldlage Schmannewitz zwischen Leipzig und Dresden."
    ]
  },
  "ck-median-schoenen-moos": {
    "alltag": [
      "Aufnahme von Erwachsenen aus dem gesamten Bundesgebiet oder dem Ausland, als Einzelpersonen oder als Familie.",
      "Mitaufnahme von Begleitpersonen auf Anfrage.",
      "180 Betten, komfortable Einzelzimmer mit Dusche/WC, Balkon und Telefon."
    ],
    "therapieHinweise": [
      "Interkulturelle Psychosomatik für türkisch- und rumänischsprachige Patientinnen und Patienten.",
      "Stationäre und ganztägig ambulante Rehabilitation, MBOR.",
      "Internistische und orthopädische Aufnahmeuntersuchung mit somatischem Therapieplan."
    ],
    "factsExtra": [
      "2025 in MEDIAN integriert; eigene Klinikdomain klinik-a-s-moos.de.",
      "Versorgungsvertrag nach § 111 SGB V."
    ],
    "sozialdienstLeistungen": [
      "Sozial- und Berufsberatung: Sozialrechtsberatung, Analyse der häuslichen und beruflichen Situation, Bewerbungstraining, Organisation der Nachsorge.",
      "MBOR Stufe A und B: berufsbezogene Diagnostik, sozialrechtliche Informationen, psychosoziale Arbeit; Stufe C über Orientierungsgespräch und Berufscoaching.",
      "Auf Wunsch Kontakt zu Behörden, Selbsthilfegruppen, Arbeitgeber und Rentenversicherung; Organisation von stufenweiser Wiedereingliederung und LTA-Anträgen."
    ],
    "wahlleistungenHinweis": "Mitaufnahme von Begleitkindern nach Absprache; Begleitpersonen auf Anfrage. Schulaufgabenbetreuung für schulpflichtige Begleitkinder mit Fragebogen der Heimatschule. Mehrere allergiearme Zimmer, drei rollstuhlgerechte Zimmer.",
    "mitbehandlungHinweis": "Fachärztliche Mitbehandlung orthopädischer Begleiterkrankungen und internistischer Erkrankungen; Pharmakotherapie nach Indikation."
  },
  "ck-median-schweriner-see": {
    "alltag": [
      "Psychosomatik-Abteilung überwiegend Einbettzimmer mit Duschbad, WC und Telefon.",
      "Checkliste zum Start der Klinik.",
      "Therapeutische Wohngruppe mit Gemeinschafts- und Therapieraum; Schwimmbad, Sauna, Fitness, Fahrräder, Internetcafé und Bibliothek.",
      "Alkohol während der gesamten Behandlung nicht gestattet; Rauchen nur an zwei ausgewiesenen Außenstellen.",
      "In der Suchtabteilung in den ersten drei Wochen kein Einzelausgang; Wechsel von der Aufnahmestation in die Wohngruppe nach der Eingangsphase.",
      "Begleitkinder 2–11 Jahre im Zimmer des Elternteils; Betreuung in der Kita „Schweriner Seefahrer“, Schulkinder in der örtlichen Schule."
    ],
    "therapieHinweise": [
      "Digitale Nachsorge Rethera Mind für Depression, Angst und somatoforme Störungen.",
      "Integrativ-verhaltenstherapeutisches Konzept; Bezugstherapeutin bzw. Bezugstherapeut bereits am Aufnahmetag.",
      "Suchtabteilung: Aufnahme nach Entgiftung; durchschnittlich 15 Wochen, Kurzzeit acht Wochen, Auffang/Festigung sechs Wochen.",
      "Spezialkonzepte für pathologisches Glücksspiel, pathologischen PC-/Internetgebrauch und Risikoberufsgruppen (u. a. Polizei, Justiz, Feuerwehr, Rettungsdienst).",
      "Mütter und Väter mit Kind (2–11 Jahre) nach Kostenzusage für die Begleitperson; keine eigenständige Kindertherapie."
    ],
    "factsExtra": [
      "Psychosomatik und Abhängigkeitserkrankungen (Alkohol und Medikamente) am gleichen Standort.",
      "Naturnahe Lage am Schweriner See.",
      "204 Betten bzw. Behandlungsplätze; Standort Lübstorf am Schweriner See.",
      "Frauen und Männer ab 18 Jahren; Belegung u. a. durch DRV, GKV, PKV und Sozialhilfeträger."
    ],
    "sozialdienstLeistungen": [
      "Soziotherapie zu Beruf, Recht, Finanzen und Wohnen (Hilfe zur Selbsthilfe).",
      "Kombi-Therapie mit regionalen und überregionalen Suchtberatungsstellen.",
      "Belastungserprobung und Unterstützung der beruflichen Wiedereingliederung."
    ],
    "mitbehandlungHinweis": "In der Psychosomatik ist eine Aufnahme auch bei zusätzlichem schädlichen Gebrauch von Alkohol oder Medikamenten möglich (Konzept Risikoberufsgruppen)."
  },
  "ck-median-sonnenhang": {
    "alltag": [
      "Unterbringung in Doppelzimmern, bei Indikation oder Gruppenmodell auch Einzelzimmer; Bad mit Dusche, Telefon, kostenloses WLAN, teilweise TV.",
      "Allergikerzimmer vorhanden; Bettwäschewechsel dienstags; Waschmaschine, Trockner und Bügeleisen zum Selbstkostenpreis.",
      "Besuch Samstag, Sonntag und Feiertag 9.00–21.00 Uhr, nicht auf dem Patientenzimmer; Gemeinschaftsräume oder Café nutzen.",
      "Einkauf in Puderbach oder Kleinigkeiten im Café; Anreise bis 11.00 Uhr.",
      "Drei Plätze zur internen Adaption (Phase II) im Haus Sonnenhang.",
      "Rauchen nur in ausgewiesenen Zonen; E-Zigaretten nicht erlaubt."
    ],
    "sozialdienstLeistungen": [
      "Regelmäßige Angehörigenseminare; wöchentliche Selbsthilfegruppen über Aushang.",
      "Berufliche Wiedereingliederung bzw. Rückkehr an den Arbeitsplatz als Therapieziel."
    ],
    "wahlleistungenHinweis": "Nutzerausweis gegen einmalige Gebühr für Bibliothek und Leihfahrräder. Shuttle zum Schwimmbad und zur Sauna Dierdorf am Wochenende im Wechsel der Häuser gegen Gebühr.",
    "therapieHinweise": [
      "Stoffgebundene Abhängigkeit plus Nebendiagnosen im integrierten Modell.",
      "Schwerpunktgruppen hausbezogen; Zuordnung nach Aufnahme- und Aktenprüfung.",
      "Verhaltenstherapeutisch und tiefenpsychologisch fundiert, ergänzt durch systemische und humanistische Strategien."
    ],
    "factsExtra": [
      "Rund 70 Männer ab 18 Jahren am Standort Steimel.",
      "Gesamt Klinik Wied: 206 Plätze an zwei Standorten, darunter 3 Adaptionsplätze.",
      "Ergebnis der Hauszuordnung kommt mit dem Einladungsschreiben."
    ],
    "mitbehandlungHinweis": "Mitbehandlung nicht stoffgebundener Abhängigkeiten (z. B. Essstörungen, pathologisches Spielen), psychischer Störungen (z. B. Depression, Angst) und psychosomatischer Bilder (z. B. chronische Schmerzen) laut Trägerseite der MEDIAN Klinik Wied."
  },
  "ck-median-suedpark": {
    "alltag": [
      "Einzelzimmer mit eigenem Bad, TV und abschließbarem Fach; Standard 11,5 m², Premium 17 m², Vinylboden.",
      "Barrierefreie Zimmer vorhanden; öffentliche Bereiche rollstuhlgerecht.",
      "Morgens und abends Buffet, mittags Auswahl aus zwei Gerichten; vegetarisch möglich, vegan nicht zugesichert.",
      "Alkohol in der Klinik nicht gestattet; Haustiere aus hygienischen Gründen nicht gestattet.",
      "Parkplatz auf dem Klinikgelände kostenlos, begrenzt; Kurzzeitparkplätze vor dem Eingang zum Be- und Entladen."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung im Therapieangebot der Psychosomatik.",
      "Psy-RENA-Nachsorgegruppe am Standort, Terminvereinbarung unter 06032 704-161."
    ],
    "factsExtra": [
      "275 Betten/Behandlungsplätze; Begleitpersonen im Gästehaus oder per Zustellbett.",
      "Muttersprachliche psychosomatische Behandlung für türkischsprachige Versicherte; Mitarbeitende sprechen neben Englisch und Türkisch weitere Sprachen.",
      "Kinder während der Reha nicht regelhaft mit im Zimmer; nach individueller Absprache möglich.",
      "Bilinguales psychosomatisches Rehabilitationsangebot für türkischsprachige Versicherte.",
      "Essstörungen ab BMI > 18."
    ],
    "wahlleistungenHinweis": "WLAN über Medienpauschale kostenpflichtig (u. a. Tagesticket 3 Euro, Wochenticket 15 Euro). Premiumzimmer mit Safe, Kühlschrank, Föhn und Bademantel; Bademantel sonst gegen Gebühr. Waschen 2,50 Euro, Trocknen 2,00 Euro.",
    "kontraindikationen": [
      "Essstörungen unter BMI 18 sind nicht das Aufnahmeangebot."
    ],
    "therapieHinweise": [
      "Psychosomatik tiefenpsychologisch und verhaltenstherapeutisch; Einzel- und Gruppenpsychotherapie.",
      "Alterspsychosomatik, Trauer, Mobbing; stützende Intervention bei Trauma/Anpassung.",
      "Biofeedback, Yoga, Raucherentwöhnung."
    ],
    "mitbehandlungHinweis": "Enge Kooperation der Fachabteilungen Kardiologie, Orthopädie und Psychosomatik am Standort."
  },
  "ck-median-toenisstein": {
    "alltag": [
      "140 allergenarme Einzelzimmer, davon zehn barrierefrei, mit WC, Dusche, TV und Notruf; teils Balkon.",
      "Zwei Speisesäle: morgens/abends Buffet, mittags zwei Menüs; vegane Speisen möglich.",
      "Hauseigenes Hallenbad mit 20-m-Becken.",
      "Aufnahmegruppe: Klinikgelände nicht verlassen. Stammgruppe: Anwesenheitspflicht 21:00–09:00 Uhr, alle Mahlzeiten und Therapieveranstaltungen.",
      "Nachtruhe 23:00–07:00 Uhr im Zimmer; keine gegenseitigen Zimmerbesuche; Smartphones, Tablets und Laptops während Mahlzeiten und Therapie untersagt.",
      "Zimmer 20–35 m² mit eigenem Bad und Safe, ohne Kühlschrank (Gemeinschaftskühlschrank); kein Fernseher im Zimmer, Aufenthaltsräume für Fernsehabende. Therapien ab ca. 8:15 Uhr."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutisches Kurzzeitkonzept; achtwöchige Intensivtherapie.",
      "Cannabis, Kokain und Lifestyle-Drogen bei erhaltener sozialer Integration genannt.",
      "Einwöchige Aufnahmephase mit körperlicher, labormedizinischer und psychologischer Diagnostik.",
      "Teilnahme an psychotherapeutischen, medizinischen, sozialarbeiterischen und sporttherapeutischen Maßnahmen ist vorgesehen; Freistellungen beantragen."
    ],
    "factsExtra": [
      "Fachklinik mit rund 50 Jahren Erfahrung in der Entwöhnung laut Klinikseite.",
      "VR-Therapie als Schwerpunkt verlinkt.",
      "Reguläre Therapiedauer acht Wochen; entgangene Tage können nachgeholt werden.",
      "Haustiere und Begleitkinder sind nicht vorgesehen.",
      "Bahnabholung am Bahnhof Bad Neuenahr nach Voranmeldung der Ankunftszeit."
    ],
    "sozialdienstLeistungen": [
      "Soziale, finanzielle und berufliche Themen sowie weiterführende Therapie- und Betreuungsangebote im Behandlungskonzept.",
      "Selbsthilfegruppen zweimal wöchentlich möglich; Teilnahme an vier Veranstaltungen ist vorgesehen.",
      "Unterlagen zu Übergangsgeld, Geldleistungen, rechtlichen oder finanziellen Verfahren und bei beruflicher Neuorientierung (Zeugnisse, Lebenslauf) mitbringen."
    ],
    "wahlleistungenHinweis": "WLAN über Medienpauschale an der Rezeption (laut FAQ u. a. 3 Euro/Tag, 15 Euro/Woche). Parken 1 Euro/Tag. Waschmaschinen und Trockner 2 Euro je Nutzung. Kaution 30 Euro für Zimmer- und Schließfachschlüssel laut Klinik-A–Z.",
    "mitbehandlungHinweis": "Falls erforderlich, Verlegung zur körperlichen Entgiftung in kooperierende Krankenhäuser. Entgiftungsbedarf vor Therapieantritt wird im Einzelfall geklärt."
  },
  "ck-median-vesalius": {
    "alltag": [
      "Unterbringung in Einzelzimmern (ca. 15–25 m²) mit eigenem Bad, Safe und Föhn; barrierefreie Zimmer vorhanden.",
      "Kein Kühlschrank im Zimmer; Allergikerbettwäsche bei Bedarf; Handtücher werden gestellt.",
      "Frühstück und Abendessen als Buffet, mittags zwei Menüs; täglich vegetarisches Menü, vegan auf Anfrage.",
      "Kinder und Haustiere nicht aufnehmbar; striktes Alkoholverbot.",
      "Waschmaschinen und Trockner gegen Gebühr; Schwimmbad für Wassertherapie nach ärztlicher Freigabe auch außerhalb der Therapiezeiten."
    ],
    "wahlleistungenHinweis": "WLAN und Telefon über Medienpauschale (laut FAQ 1,00 € pro Tag) an der Rezeption. Parkdeck gegen Gebühr. MEDIAN premium: Einzelzimmer, Lounge, Komfortspeisesaal, Minibar mit alkoholfreien Getränken. Begleitpersonen in Doppelzimmern.",
    "mitbehandlungHinweis": "Spezielles Therapiekonzept für die Doppelindikation Orthopädie und Psychosomatik am Standort.",
    "sozialdienstLeistungen": [
      "Sozialdienstliche Beratung ausdrücklich als Therapiebaustein genannt."
    ],
    "therapieHinweise": [
      "Bausteine u. a. Einzel- und Gruppenpsychotherapie, Tanz- und Gestaltungstherapie, Entspannung, Fitnesstraining, Nordic Walking.",
      "Gruppen: Depression, Angst, Psychosomatik, Tinnitus, Schmerz, Trauer, soziales Kompetenztraining, Selbstsicherheit; Lichttherapie bei saisonaler Depression; Biofeedback, Hirnleistungstraining.",
      "VR bei Angst im Standortprofil; Nachsorge DE-RENA."
    ],
    "factsExtra": [
      "Chefarzt Psychosomatik Matthias Volz, Facharzt für Psychiatrie und Psychotherapie.",
      "Stationär, teilstationär und ambulant; private Tagesklinik für psychosomatische Reha am Standort."
    ]
  },
  "ck-median-waldsee": {
    "alltag": [
      "Einzel- oder Doppelzimmer mit Dusche und WC.",
      "Integrierte Adaption.",
      "Öffentlich 30 Zweibettzimmer und vier Einzelzimmer mit Dusche, WC und Waschbecken; Handtücher werden gestellt.",
      "FAQ: Unterbringung in Doppel- oder Mehrbettzimmern; Zimmer nicht barrierefrei, kein Fernseher und kein Kühlschrank im Zimmer.",
      "Wertschließfach im Zimmer; Gemeinschaftskühlschränke; Allergikerbettwäsche bei Bedarf. Parkplatz auf dem Gelände kostenfrei.",
      "Integrierte Adaption Haus Michael: 13 Plätze, Zimmer mit Bad und kleiner Küchenzeile."
    ],
    "therapieHinweise": [
      "Fachklinik für Doppeldiagnosen: Drogen- und Medikamentenabhängigkeit mit komorbider psychiatrischer Erkrankung.",
      "Fachklinik für Doppeldiagnosen: Drogenabhängigkeit plus psychiatrische Erkrankung, u. a. schizophrener oder depressiver Formenkreis sowie schwere Persönlichkeits- und Entwicklungsstörungen.",
      "Psychiatrisch-verhaltensmedizinisches Konzept, ergänzt um systemische, tiefenpsychologische, körper- und arbeitstherapeutische Verfahren.",
      "Regeldauer stationär öffentlich 5 bis 6 Monate; mit anschließender Adaption bis zu 9 Monate. Junge Erwachsene ab 18 Jahren.",
      "Arbeitstherapie in Hauswerkstätten (Möbelrestauration, Schneiderei, Gartenbau, Töpferei, Innenausbau, Küche, Hauswirtschaft, Kleintierzucht, Waldpflege) und externe Praktika.",
      "Hausinterne Klinikschule; Paartherapie möglich."
    ],
    "factsExtra": [
      "Ausgewiesen als Reha-Zentrum für junge Abhängige.",
      "Substitution vor Antritt nicht vorgesehen laut Klinikhinweis; stationäre Entgiftung besonders bei Alkohol, Opiaten, Benzodiazepinen empfohlen.",
      "Vor der Aufnahme entgiftet. Vorabbesuch nach Terminvereinbarung möglich.",
      "Haustiere nach vorheriger Absprache. Interessierte regelmäßig etwa ein- bis zweimal im Monat kurz melden.",
      "Bei ungewöhnlichen Neuroleptika oder Antidepressiva Medikamente für drei Tage mitbringen. Bei Betreuung Kopie des Betreuungsbeschlusses sinnvoll."
    ],
    "mitbehandlungHinweis": "Mitbehandlung u. a. Schizophrenie, Depression, Persönlichkeitsstörung; Substanzen u. a. Cannabis, Kokain, Heroin, Benzodiazepine."
  },
  "ck-median-wied": {
    "alltag": [
      "Zwei Standorte: Haus Mühlental in Wied und männerspezifisches Haus Sonnenhang in Steimel.",
      "Unterbringung in Doppelzimmern mit Bad/Dusche; Einzelzimmer bei Indikation oder je nach Gruppenmodell.",
      "Kostenfreies WLAN, Telefonanschluss, teilweise TV; Allergikerzimmer vorhanden; kein Kühlschrank im Zimmer.",
      "Klinik laut FAQ nicht barrierefrei; einzelne Zimmer ebenerdig oder über Aufzug erreichbar.",
      "Kinder und Haustiere werden nicht aufgenommen; Handtücher bitte mitbringen (Leihhandtücher gegen Kaution nur vorübergehend).",
      "Besuche in therapiefreien Zeiten nach Rücksprache mit der Bezugsgruppetherapie."
    ],
    "therapieHinweise": [
      "Schwerpunktgruppen u. a. Sucht & Psychosomatik, Sucht & Depression, Sucht & Psychose.",
      "Regelzeiten ca. 8 Wochen bei Alkohol/Medikamenten, 12–24 Wochen bei illegalen Drogen.",
      "Kurzzeit Alkohol/Medikamente 13 Wochen, Langzeit bei illegalen Drogen und Mehrfachabhängigkeit 22 Wochen, stationärer Teil der Kombinationsbehandlung 8 Wochen.",
      "Schwerpunkte Haus Mühlental u. a. Sucht und Post-/Long-Covid, Sucht und Somatik; Haus Sonnenhang u. a. Sucht und Persönlichkeitsstörung sowie Sucht und Psychose.",
      "Verhaltenstherapeutische und tiefenpsychologische Fundierung, ergänzt durch systemische und humanistische Verfahren; integriertes Behandlungsmodell.",
      "Tier- und naturgestützte Angebote; Kegelbahn in Wied; Holz-, Kreativ- und Textilwerkstatt."
    ],
    "factsExtra": [
      "206 Behandlungsplätze inkl. Adaption und tagesklinische Plätze.",
      "Drogenscreening und Atemalkoholtest am Aufnahmetag; positiver Befund kann die Aufnahme verhindern.",
      "Substitution nur mit gesonderter Kostenzusage.",
      "Haus Sonnenhang in Steimel ist männerspezifisch und hält drei Adaptionsplätze vor; Zuordnung zum Haus nach Aktenprüfung im Einladungsschreiben.",
      "Nahtlosaufnahme nach qualifizierter Entgiftung möglich.",
      "Freizeit u. a. Bibliothek, Gemeinschaftsräume mit TV, PC-Raum, Teeküchen, Café/Kiosk und Fitnessraum."
    ],
    "sozialdienstLeistungen": [
      "Aufnahmeprüfung anhand Sozial- und Arztbericht auch vor der Kostenbeantragung möglich.",
      "Anreisekosten (Bahn) der DRV gegen Vorlage der Fahrkarte in der Klinik erstattungsfähig.",
      "Verwaltung von Bargeld über ein Patientenkonto auf Wunsch."
    ],
    "mitbehandlungHinweis": "Mitbehandlung nicht stoffgebundener Abhängigkeiten (z. B. Essstörungen, pathologisches Spielen), psychischer Störungen (Depression, Angst, Psychose) und psychosomatischer Krankheitsbilder (chronische Schmerzen). Vier Plätze substitutionsgestützte Therapie nur mit gesonderter Kostenzusage."
  },
  "ck-median-wigbertshoehe": {
    "alltag": [
      "Checkliste zum Start; Fahrstuhl vorhanden.",
      "Zugehöriges Adaptionshaus Hohe Tanne.",
      "Sie starten in einem Doppelzimmer (11–23 m²) mit eigenem Bad und wechseln je nach Verlauf ins Einzelzimmer.",
      "Kein Fernseher im Zimmer, Fernsehabende in Aufenthaltsräumen; abschließbares Fach, Gemeinschaftskühlschrank.",
      "Therapien beginnen in der Regel um 7:00 Uhr; Essen im Speisesaal (Buffet morgens/abends, mittags zwei Gerichte).",
      "Besuche am Wochenende; Kinder können nicht mit aufgenommen werden."
    ],
    "therapieHinweise": [
      "Spezialkonzept Glücksspielabhängigkeit und Spezialkonzept +55.",
      "Aufnahme ab dem 16. Lebensjahr; Behandlung suchtmittelfrei anzutreten.",
      "Behandlung suchtmittelfrei antreten; Entgiftung im Akutkrankenhaus bei Bedarf rechtzeitig vorschalten.",
      "Patienschaftssystem: erfahrene Rehabilitandinnen und Rehabilitanden unterstützen Neuankömmlinge.",
      "Spezialkonzepte Glücksspielabhängigkeit und +55; Aufnahme ab 16 Jahren ausgewiesen.",
      "Adaptionshaus Hohe Tanne: Einzelgespräche, Gruppe, internes Arbeitstraining, hauswirtschaftliches und Kochtraining, externe Praktika."
    ],
    "factsExtra": [
      "77 Behandlungsplätze.",
      "Entgiftung in einem Akutkrankenhaus nur falls nötig, rechtzeitig einplanen.",
      "Anmeldung bei der Verwaltung am Haupteingang, anschließend ärztliches Erstgespräch.",
      "Patientendisposition bereits bei Antragstellung erreichbar (Durchwahl 185-65).",
      "Vegetarisch möglich; veganes Essen nicht regelmäßig vorgesehen. Medikamente werden im Pflegestützpunkt abgegeben.",
      "Nach Kostenzusage und Terminabsprache Einladungsschreiben mit den Antrittsinformationen."
    ]
  },
  "ck-median-wismar": {
    "alltag": [
      "Unterbringung in Einzelzimmern mit eigenem Bad, rund 19 m², Fernseher und abschließbarem Fach; barrierefreie Zimmer vorhanden.",
      "Kein Kühlschrank und kein Föhn im Zimmer; Handtücher stellt die Klinik, Bademäntel nicht.",
      "Morgens und abends Buffet, mittags Wahl aus zwei Gerichten; Essen im Speisesaal; vegetarisch möglich, vegan nicht zugesagt.",
      "WLAN kostenpflichtig; Waschen 2,50 €, Trocknen 2,00 €; Cafeteria und Bushaltestelle am Gelände.",
      "Kinder und Haustiere nicht zur Mitaufnahme; Alkohol während des Aufenthalts nicht gestattet.",
      "Schwimmbad vorhanden; freies Schwimmen und Ergometer nach ärztlicher Freigabe."
    ],
    "sozialdienstLeistungen": [
      "Beratung in sozialen und rechtlichen Angelegenheiten sowie zur Situation am Arbeitsplatz."
    ],
    "therapieHinweise": [
      "Laut Trägerseite Spezialisierung auf Depression, Angststörungen sowie Arbeitsstörungen wie Burnout, Mobbing oder Arbeitsplatzphobien; auch Erschöpfung, Schmerz- und Kopfschmerzsyndrome sowie Tinnitus.",
      "Psychologische Betreuung: Einzelberatung, Seminare zu Stressabbau und Schmerzbewältigung, Entspannungstherapie.",
      "MBOR und Rehabilitation von Schwerbrandverletzten am Standort ausgewiesen."
    ],
    "factsExtra": [
      "Schwerpunktklinik für orthopädische Rehabilitation mit psychologischer Mitbetreuung; Lage am Wendorfer Strand.",
      "Begleitperson: Doppelzimmer nach Bedarf."
    ],
    "wahlleistungenHinweis": "MEDIAN select: Komfortzimmer mit Balkon (u. a. elektrisch verstellbares Bett, Kühlschrank, Kaffeemaschine) gegen Aufpreis. Komfort-Appartement: Begleitperson ohne Aufpreis inklusive Verpflegung laut Klinik."
  },
  "ck-mediclin-baar": {
    "alltag": [
      "Patientinnen und Patienten der Baar Klinik melden sich bis 11 Uhr an der Rezeption.",
      "Einzelzimmer mit Dusche, WC und Balkon; Notrufanlage, häufig behindertengerecht.",
      "Besuche in der Baar Klinik auf das Wochenende beschränkt; Übernachtung von Besuch auf Anfrage organisierbar.",
      "Mitpatientin oder Mitpatient als Pate zur Orientierung.",
      "Rauchverbot im Haus, Raucherbereich auf dem Gelände; Parken gebührenpflichtig (Baar laut Klinikseite 45 € je 5 Wochen)."
    ],
    "sozialdienstLeistungen": [
      "Soziotherapeutische Hilfe zu sozialen und wirtschaftlichen Fragen in Einzel- und Gruppentherapie.",
      "Beratungsangebote zur Entlassung und Nachsorge auf der Klinikseite."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutischer Psychotherapieansatz; MBOR zur beruflichen Orientierung.",
      "Schwerpunkte u. a. Depressionen, Anpassungsstörungen, Angsterkrankungen, somatoforme Störungen sowie Schlafstörungen und stressbedingte psychosomatische Erkrankungen.",
      "Gruppentherapien in offenen, flexiblen Konzepten über zwei bis drei Wochen.",
      "Fachklinik für Psychosomatik und Verhaltensmedizin.",
      "Post-COVID-Schwerpunktklinik am Campus."
    ],
    "factsExtra": [
      "Vorzugsweise Belegung durch die DRV Bund.",
      "IQMP kompakt zertifiziert; Campus Königsfeld im heilklimatischen Kurort.",
      "Unter einem Dach mit der kardiologischen Albert-Schweitzer-Klinik.",
      "Begleitpersonen im Serviceformular genannt.",
      "Campus Königsfeld unter einem Dach mit der kardiologischen Albert-Schweitzer-Klinik."
    ],
    "mitbehandlungHinweis": "Aufnahme blinder und sehbehinderter Patientinnen und Patienten möglich, sofern weitgehend selbstständige Orientierung in Klinik und Therapien; erwachsene nicht-sehbehinderte Begleitperson nach Absprache, nicht in den Therapien.",
    "wahlleistungenHinweis": "MEDICLIN KOMFORT PLUS als Komfort- und Servicepaket öffentlich angeboten; Wahl- und Komfortleistungen über das Kontaktformular."
  },
  "ck-mediclin-bad-wildungen": {
    "kontraindikationen": [
      "Aufnahme bei Fremd- oder Eigengefährdung nicht möglich.",
      "Weitere Ausschlüsse laut Klinik: zeitliche und räumliche Desorientiertheit, akute Psychosen, hirnorganisch bedingte psychische Störungen.",
      "Drogen- und Alkoholabhängigkeit; fehlende Fähigkeit oder Motivation zur Psychotherapie.",
      "Rehabilitandinnen und Rehabilitanden mit MRSA / 3- oder 4-MRGN sollen laut Klinikseite nicht aufgenommen werden."
    ],
    "alltag": [
      "Reha-Bereich: 256 Einzelzimmer mit Dusche und WC, davon 184 rollstuhl- und behindertengerecht; TV und Telefon.",
      "WLAN im Zimmer gegen Gebühr an der Rezeption.",
      "Frühstück und Abendessen am Büffet, mittags Drei-Gänge-Menü, vegetarisch und Sonderkost nach Absprache.",
      "Therapieblock ab ca. 8.20 Uhr mit Stationsversammlung; Besuche außerhalb der Therapiezeiten (in der Regel nach 17 Uhr) und am Wochenende durchgehend.",
      "In der Psychosomatik in den ersten Tagen Mitpatientin oder Mitpatient als Pate zur Eingewöhnung.",
      "Anreise in der Psychosomatik bis 12:00 Uhr an der Rezeption; Zimmer am Abreisetag in der Reha bis 08:00 Uhr räumen."
    ],
    "sozialdienstLeistungen": [
      "Berufliche Rehabilitation",
      "Antragstellungen bei Behörden",
      "Soziale Betreuung",
      "Hilfsmittelversorgung"
    ],
    "therapieHinweise": [
      "Fokus auf Gruppentherapie, ergänzt durch Einzelgespräche mit Bezugstherapeutinnen und -therapeuten.",
      "Soziotherapie u. a. zu Kontakt mit dem Arbeitgeber, berufsfördernden Maßnahmen und weiterführender Hilfe nach der Reha.",
      "Schmerztherapie mit ganzheitlichem Ansatz; sport- und krankengymnastische Gruppenangebote."
    ],
    "factsExtra": [
      "Akutpsychosomatik laut Krankenhausplan Hessen: 75 vollstationäre Betten und 10 teilstationäre Plätze.",
      "Beihilfefähig; AHB, Heilverfahren, BGSW, besondere Versorgung nach § 140a SGB V und Selbstzahler möglich.",
      "Blinde und sehbehinderte Rehabilitandinnen und Rehabilitanden: leicht erreichbare Zimmer, Begleitperson und Blindenführhund nach Absprache (Führhundnachweis, tierärztliche Gesundheitsbescheinigung; Hund nicht ins Schwimmbad).",
      "Parkplätze begrenzt und kostenpflichtig; Bahnabholung nach Absprache.",
      "Hausordnung: in der Akutpsychosomatik Besuche nicht auf Station, Treffen in öffentlichen Bereichen (z. B. Cafeteria).",
      "Keine Nahrungsmittel, Geschirr oder Besteck auf dem Zimmer."
    ],
    "wahlleistungenHinweis": "MEDICLIN PRIVITA: Komfort- und Servicepaket für Privatversicherte mit Wahlleistung, Beihilfeberechtigte, Zusatzversicherte oder Selbstzahlerinnen und Selbstzahler.",
    "mitbehandlungHinweis": "Haus ausgelegt auf Patientinnen und Patienten bis 130 kg; bei höherem Gewicht vor Anreise nachfragen, Aufnahme nicht zugesichert. Orthopädie und psychosomatische Reha am Standort."
  },
  "ck-mediclin-bliestal": {
    "alltag": [
      "Einzelzimmer mit Dusche und WC; Telefon, Fernseher und WLAN gegen Gebühr.",
      "Zimmer behinderten- oder teilbehindertengerecht, an den Notruf angeschlossen.",
      "Begleitpersonen im Zimmer nur in Orthopädie sowie Kardiologie und Innerer Medizin, nicht in der Psychosomatik.",
      "Anreise an der Rezeption zwischen 10 und 12 Uhr."
    ],
    "sozialdienstLeistungen": [
      "Beratung zu Übergangsgeld, Krankengeld und Rente",
      "Berufliche Fragen und stufenweise Wiedereingliederung",
      "Persönliche und soziale Probleme, häusliches Umfeld",
      "Reha-Nachsorgeprogramme"
    ],
    "therapieHinweise": [
      "Integrative Psychotherapie (u. a. Verhaltenstherapie).",
      "MBOR-P mit arbeitsplatzbezogenen Gruppen, u. a. Pflegeberufe, Mobbing, Burn-out.",
      "Naturtherapie (Waldbaden), Achtsamkeit, Schlafhygiene, Raucherentwöhnung.",
      "Integrative Psychotherapie mit Verhaltenstherapie, psychodynamischen, systemischen und psychoanalytischen Verfahren im Team.",
      "Themenspezifische Gruppen u. a. Trauer, Essstörung und Essverhalten, Persönlichkeitsstile, Pflegeberufe, Psychotherapie und Religion.",
      "Musik- und Tanztherapie; Achtsamkeitsgruppe über vier Termine (Body-Scan, Yoga, Sitz- und Gehmeditation)."
    ],
    "factsExtra": [
      "Digitaler Aufnahmefragebogen nach Anreisetermin, möglichst früh, spätestens zwei Wochen vor Anreise.",
      "Beihilfeberechtigte Privatversicherte: Unterkunft und Verpflegung am Abreisetag; Anerkennungsbescheid vor Behandlungsbeginn.",
      "Zulassung nach § 30 GewO; stationäre, teilstationäre und ambulante Reha."
    ],
    "wahlleistungenHinweis": "MEDICLIN PRIVITA: zusätzliches Komfort- und Serviceangebot.",
    "mitbehandlungHinweis": "Am Standort auch Kardiologie, Orthopädie/Rheumatologie und Innere Medizin; psychosomatische Reha getrennt davon.",
    "kontraindikationen": [
      "Akute Psychose",
      "Suchterkrankung"
    ]
  },
  "ck-mediclin-deister-weser": {
    "alltag": [
      "Einzelzimmer mit Dusche, WC, Telefon; Fernseher gegen Gebühr an der Rezeption.",
      "WLAN gegen Entgelt (Haus Weser im Zimmer; Haus Deister hausweit).",
      "Rauchverbot im Haus und auf dem Gelände, ausgewiesene Raucherbereiche.",
      "Hunde nur in der psychosomatischen Rehaklinik, nicht in Onkologie und Urologie.",
      "Einzelzimmer mit Dusche, WC und Telefon; Fernseher gegen Gebühr an der Rezeption freischalten.",
      "WLAN gegen Entgelt (Haus Weser im Zimmer). Bettwäsche und ein Handtuch-Set stellt die Klinik."
    ],
    "sozialdienstLeistungen": [
      "Sozialrechtliche Angelegenheiten und Antragstellungen bei Behörden",
      "Unterstützung berufstätiger Rehabilitandinnen und Rehabilitanden bei der Wiedereingliederung ins Arbeitsleben",
      "Sozialrechtliche Angelegenheiten und Antragstellungen bei Behörden.",
      "Unterstützung berufstätiger Rehabilitandinnen und Rehabilitanden bei der Wiedereingliederung.",
      "Kostenübernahme für Begleitkinder über Antrag auf Haushaltshilfe beim Kostenträger vor Aufnahme klären."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutisches Konzept (Psychosomatische Medizin, Psychiatrie, Neurologie).",
      "ADHS im Erwachsenenalter: ADHS-Gruppe, Problemlöse- und Selbstsicherheitstraining, medikamentöse Therapie, Selbstmanagement.",
      "Ambulante ADHS-Diagnostik zur Diagnosestellung laut Klinikseite derzeit nicht angeboten.",
      "Zu Beginn ärztliche Aufnahmeuntersuchung und psychotherapeutisches Gespräch mit der Bezugstherapie; gemeinsame Reha-Ziele und Therapieplan."
    ],
    "factsExtra": [
      "Aufnahme von Müttern und Vätern mit gesunden Begleitkindern; Kinderbetreuung während der Therapiezeiten, nicht in der therapiefreien Zeit.",
      "Keine gemeinsame Behandlung von Elternteil und Kind (keine Kinder- und Jugendtherapeutinnen und -therapeuten).",
      "Kind laut Klinikseite in der Regel mindestens 3 Jahre, sauber, altersgemäß entwickelt; Gruppengröße maximal 12 Kinder.",
      "Vertragsklinik der DRV, Versorgungsvertrag § 111 SGB V, beihilfefähig.",
      "Aufnahme von Müttern und Vätern mit gesunden Begleitkindern; Betreuung nur während der Therapiezeiten.",
      "Kind in der Regel mindestens 3 Jahre, sauber, altersgemäß entwickelt; Unterbringung im Zimmer der Eltern; Gruppengröße begrenzt."
    ],
    "wahlleistungenHinweis": "MEDICLIN PRIVITA: Komfort- und Servicepaket; Klinik-PDF nennt Paketpreise, Abstimmung mit der Versicherung vor Anreise.",
    "mitbehandlungHinweis": "Seelische Krisen und Anpassungsstörungen infolge chronisch verlaufender internistischer, neurologischer oder onkologischer Erkrankungen sind ausgewiesen. Standort Klinik Deister (HNO/Urologie) ist nicht Psychosomatik."
  },
  "ck-mediclin-duenenwald": {
    "alltag": [
      "Einzelzimmer mit Dusche, WC, Notruf, TV und Telefon (gebührenpflichtig), größtenteils Balkon.",
      "Behinderten- und allergiegerechte Zimmer bei Bedarf.",
      "Frühstück und Abendessen als Buffet, mittags Wahl zwischen drei Gerichten; Medicafé.",
      "Parken während des Aufenthalts gebührenpflichtig (Pfand an der Rezeption); behindertengerechte Plätze ohne Parkgebühr."
    ],
    "sozialdienstLeistungen": [
      "Aufnahme blinder und sehbehinderter Rehabilitandinnen und Rehabilitanden mit Assistenzhund oder Begleitperson; Bedürfnisse werden vorab geklärt.",
      "Begleitservice zum Speisesaal, Unterstützung bei Formularen, Wäsche- und Bügelservice; Schriftstücke in Großdruck oder Audio."
    ],
    "therapieHinweise": [
      "Psychometrische Diagnostik, u. a. computergestützte Testverfahren.",
      "Enge Zusammenarbeit mit der Orthopädie am Standort; Konsile und apparative Diagnostik möglich.",
      "Sport- und Atemtherapie teilweise am Strand (Yogaelemente, Achtsamkeit, Nordic Walking)."
    ],
    "factsExtra": [
      "Orthopädie und Psychosomatik am selben Standort.",
      "Anamnesebogen Psychosomatik vor Anreise an die Klinik senden (Download auf der Klinikseite).",
      "Chefärztin Psychosomatik Sabine Zahn; Sekretariat 038371 70-220/-357.",
      "AHB, Anschlussrehabilitation und MBOR; Kostenträger DRV, GKV, PKV und BG.",
      "Lage direkt hinter der Stranddüne im Ostseebad Trassenheide/Usedom."
    ],
    "mitbehandlungHinweis": "Orthopädische Begleiterkrankungen können am Standort internistisch-orthopädisch mituntersucht und mitbehandelt werden.",
    "kontraindikationen": [
      "Nicht geeignet bei Suchterkrankungen.",
      "Nicht geeignet bei akuten Psychosen.",
      "Nicht geeignet bei suizidalen Krisen."
    ],
    "wahlleistungenHinweis": "Wahl- und Komfortleistungen sowie Begleitpersonen im Kontaktformular der Klinik genannt."
  },
  "ck-mediclin-reichshof": {
    "alltag": [
      "226 Einzelzimmer, 84 behinderten- und rollstuhlgerecht; Dusche, WC, Fernseher, Telefon, Notruf.",
      "Begleitperson im selben Zimmer möglich.",
      "Einzelne Zimmer mit zusätzlichen Halterungen für neurologische Erkrankungen.",
      "Begleitperson im selben Zimmer (Rooming-in) bzw. Zustellbett möglich.",
      "Psychosomatik-Stationen mit Farbkonzept der vier Elemente Erde, Wasser, Luft und Feuer.",
      "Begrüßungsveranstaltung in der Anreisewoche; Hausweit Rauch- und Alkoholverbot, Seminare zur Raucherentwöhnung."
    ],
    "sozialdienstLeistungen": [
      "Leistungen der Kranken-, Pflege- und Rentenversicherung",
      "Maßnahmen der beruflichen und medizinischen Rehabilitation",
      "Antrag auf Schwerbehindertenausweis",
      "Finanzielle Absicherung und Versorgung nach der Reha",
      "Beratung zu Kranken-, Pflege- und Rentenversicherung sowie finanzieller Absicherung nach der Reha.",
      "Unterstützung bei beruflicher und medizinischer Rehabilitation und beim Antrag auf Schwerbehindertenausweis."
    ],
    "therapieHinweise": [
      "MBOR bei arbeitsplatzbezogenen Störungen und beruflichen Problemlagen (längere Arbeitsunfähigkeit, Arbeitslosigkeit, zerrüttetes Arbeitsverhältnis, Mobbing).",
      "Interdisziplinäre Post-Covid-/Long-Covid-Reha mit Neurologie, Pneumologie und Psychosomatik.",
      "Einzeltherapie ergänzt die Gruppenbehandlungen.",
      "Psychosomatik: tiefenpsychologische, verhaltenstherapeutische, störungsspezifische und sozialmedizinische Elemente.",
      "Basisgruppen Selbstsicherheit, Problemlösen und Gesundheitstraining; Indikationsgruppen Depression und arbeitsplatzbezogenes Problemlösen.",
      "Einzelgespräche ergänzen die Gruppen; Entspannung, Achtsamkeit, Kreativ-/Gestaltungstherapie, Ergo-, Physio- und Sporttherapie, Ernährungstherapie."
    ],
    "factsExtra": [
      "Seelsorge und Gottesdienste sowie Raucherentwöhnung ausgewiesen.",
      "Seelsorge und Gottesdienste ausgewiesen.",
      "Patientenaufnahme 02265 995-235/-735; Flyer Psychosomatik als PDF."
    ],
    "wahlleistungenHinweis": "MEDICLIN KOMFORT PLUS: Komfortzimmer u. a. mit kostenfreiem WLAN, SKY, kostenfreien Inlandsgesprächen (ohne Sonderrufnummern).",
    "mitbehandlungHinweis": "Neurologie und Pneumologie am Standort; psychosomatische Reha kann körperliche und psychische Long-Covid-Folgen im Verbund aufgreifen."
  },
  "ck-mediclin-seepark": {
    "alltag": [
      "Einzelzimmer mit Dusche und WC; 19 Zimmer mit barrierefreien Bädern; Schwesternrufanlage.",
      "Kinder und Jugendliche auf eigener Station mit medizinischer Zentrale in direkter Nähe.",
      "TV gebührenpflichtig; Durchwahltelefon.",
      "Besuche Samstag, Sonntag und Feiertage; Hausschließung 23 Uhr, Nachtruhe ab 22.30 Uhr.",
      "Anreise an der Rezeption zwischen 10 und 12 Uhr.",
      "Anreise an der Rezeption zwischen 10:00 und 12:00 Uhr; Aufnahmeuntersuchung am Anreisetag."
    ],
    "sozialdienstLeistungen": [
      "Kranken-, Renten- und Pflegeversicherung, Übergangs- und Krankengeld, Hauswirtschaftspflege",
      "Finanzielle Hilfen, Renten- und Schwerbehindertenrecht, Teilhabe",
      "Berufliche und schulische Perspektiven nach der Entlassung",
      "Vermittlung von Beratungsstellen, Therapeutinnen und Therapeuten, Selbsthilfe, betreutem Wohnen",
      "DRV-Nachsorge u. a. Psy-RENA und Adipositas-Nachsorge für Kinder und Jugendliche",
      "Beratung zu Kranken-, Renten- und Pflegeversicherung, Übergangs- und Krankengeld, Hauswirtschaftspflege."
    ],
    "therapieHinweise": [
      "Zentrum für Essstörungen: Wiedererlernen eines normalen Ess- und Trinkverhaltens; individuelle Essenspläne und Begleitung durch Ernährungsfachkräfte.",
      "Ganzheitliches, interdisziplinäres und familienorientiertes Konzept.",
      "Stationär, teilstationär und ambulant.",
      "Zentrum für Essstörungen: Wiedererlernen eines normalen Ess- und Trinkverhaltens mit individuellen Essensplänen.",
      "Ganzheitliches, interdisziplinäres und familienorientiertes Konzept; stationär, teilstationär und ambulant.",
      "Psychotherapie einzeln und in der Gruppe; indikative Gruppen u. a. zu Depression, Angst, Stressmanagement und Emotionsregulation."
    ],
    "factsExtra": [
      "Mütter oder Väter mit Begleitkindern, auch Säuglinge; Betreuung während der Therapien.",
      "Hauseigene Kinder- und Jugendbetreuung sowie Klinikunterricht (Grundschule bis gymnasiale Oberstufe).",
      "Hauseigene Kinder- und Jugendbetreuung sowie Klinikunterricht von Grundschule bis gymnasiale Oberstufe.",
      "Arbeits- und Schulmaterialien der Heimatschule mitbringen, damit der Klinikunterricht anschließen kann.",
      "Digitalen Aufnahmefragebogen möglichst früh, spätestens zwei Wochen vor Anreise ausfüllen (Link nach Terminvergabe)."
    ],
    "wahlleistungenHinweis": "MEDICLIN KOMFORT PLUS: zusätzliches Komfort- und Serviceangebot.",
    "mitbehandlungHinweis": "Keine Gewichtsunter- oder Obergrenze zur Aufnahme. Somatische Begleiterkrankungen internistisch mitbehandelt; auch immobile Patientinnen und Patienten, BMI über 30 bis 350 kg."
  },
  "ck-mediclin-soltau": {
    "alltag": [
      "Aufnahme in der Regel zwischen 9 und 11 Uhr; digitaler Aufnahmefragebogen möglichst früh, spätestens zwei Wochen vor Anreise.",
      "Frühstück 7–9 Uhr Buffet, Mittag 11:45–13:15 Uhr drei Menüs, Abendessen 17–19 Uhr Buffet; bei Unverträglichkeiten Diätassistenz vorab informieren.",
      "WLAN und Flachbildfernseher in den Zimmern; Großteil behindertenfreundlich bzw. rollstuhlgerecht.",
      "Freizeit u. a. Schwimmhalle, Sporthalle, Tischtennis, Billard, Bibliothek, Fahrrad- und Walkingstockverleih.",
      "90 Betten in Einzelzimmern in der psychosomatischen Klinik."
    ],
    "sozialdienstLeistungen": [
      "Beratung zu Übergangsgeld, stufenweiser Wiedereingliederung, Arbeitsplatzkonflikten, Berufsförderung und Erwerbsminderung.",
      "Beratung zur beruflichen Rehabilitation.",
      "Entlassungsplanung mit weiterführender Behandlung, beruflicher oder häuslicher Wiedereingliederung."
    ],
    "therapieHinweise": [
      "Berufsbezogene Psychotherapiegruppe, Arbeitsplatztraining und Belastungserprobung.",
      "Ernährungstherapie mit Lehrküche; Psychoedukation zu Depression, Angst, Schmerz und Schlaf.",
      "Physikalische Therapie (u. a. Massage, Lymphdrainage, Hydro-/Balneotherapie); Yoga und Pilates.",
      "Gruppe für Trauernde und Nichtraucherseminar im Programm.",
      "Verhaltenstherapeutisch und tiefenpsychologisch fundiertes Konzept mit Bezugstherapeut als zentralem Ansprechpartner.",
      "Motto laut Klinik: Handeln – nicht behandeln lassen."
    ],
    "mitbehandlungHinweis": "Allgemeinmedizinische Mitbetreuung; körperliche Beschwerden (u. a. Schmerz, Tinnitus, Schwindel, orthopädische und Covid-19-assoziierte psychosomatische Erkrankungen) werden in den Behandlungsplan einbezogen. Diagnostik u. a. Anamnese, körperliche Untersuchung, Labor und psychologische Tests.",
    "kontraindikationen": [
      "Keine akute Psychose.",
      "Keine Suchterkrankung.",
      "Keine Situation, in der eine Betreuung über den Reha-Rahmen hinaus nötig ist."
    ],
    "factsExtra": [
      "Post-COVID-Rehabilitation am Klinikum Soltau ausgewiesen.",
      "MEDICLIN Therapie-App für Rehabilitation von zu Hause."
    ],
    "wahlleistungenHinweis": "KOMFORT PLUS als exclusive Serviceleistungen; Wahl- und Komfortleistungen sowie Begleitpersonen im Kontaktformular genannt."
  },
  "ck-mediclin-vogelsang": {
    "alltag": [
      "Reha mit Hund nach den Klinikbedingungen möglich.",
      "Begleitpersonen an Wochenenden und therapiefreien Tagen; Zusatzbett im Zimmer gegen Entgelt zuzüglich Kurtaxe.",
      "Digitaler Aufnahmefragebogen nach Erhalt des Anreisetermins.",
      "Einzelzimmer mit Dusche/WC; Telefon und WLAN gegen Gebühr.",
      "Patin bzw. Pate in den ersten Tagen.",
      "Therapien ab dem ersten Tag nach der Anreise."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung zu beruflichen, sozialen und wirtschaftlichen Fragen im Zusammenhang mit der Behandlung"
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutische psychosomatische Rehabilitation; persönlicher Bezugstherapeut.",
      "Transkulturelle Psychosomatik mit kultursensibler Diagnostik und Behandlung (Informationen auf Deutsch und Türkisch).",
      "Digitale Nachsorge Mind-RENA (Videogespräch und Chat mit den Reha-Therapeutinnen und -Therapeuten).",
      "Auch ganztägig ambulante psychosomatische Reha: tagsüber in der Klinik, abends zu Hause.",
      "Genusstraining („Cay-Sitzung“) dreimal wöchentlich im transkulturellen Konzept.",
      "Ärztliche Aufnahmeuntersuchung am Anreisetag; fachärztliche Vorstellung innerhalb von 24 bis 48 Stunden."
    ],
    "factsExtra": [
      "Federführend DRV Bund; gesetzlich und privat Versicherte sowie Selbstzahler.",
      "Digitalen Aufnahmefragebogen möglichst früh, spätestens zwei Wochen vor Anreise ausfüllen."
    ],
    "wahlleistungenHinweis": "Wahl- und Komfortleistungen über MEDICLIN; Details vor Anreise bei der Patientenverwaltung.",
    "mitbehandlungHinweis": "Schwerpunkte u. a. Depression, Stressfolgeerkrankungen, psychosomatische Schlafstörungen, Traumafolgestörungen und somatoforme Schmerzstörungen.",
    "kontraindikationen": [
      "Akute Manien, ultra-rapid- und rapid-cycling sowie Mischzustände bei bipolaren Störungen.",
      "Psychosen aus dem schizophrenen Formenkreis mit akuter Symptomatik.",
      "Forensische Patientinnen und Patienten; akute Suizidalität.",
      "Ausgeprägte hirnorganische Störungen, z. B. fortgeschrittene MS, Parkinson oder Demenz.",
      "Abhängigkeitserkrankungen als primäre Diagnose.",
      "Seh- und hörbehinderte Rehabilitandinnen und Rehabilitanden; Gewichtsgrenze 140 kg."
    ]
  },
  "ck-medicoreha-rheydt": {
    "alltag": [
      "Ganztägig ambulante Reha im medicentrum Rheydt; Wohnen zu Hause.",
      "Therapiefläche laut Träger rund 2.800 m² inkl. Bewegungsbad; Öffnungszeiten Mo–Do 07:30–20:30, Fr 07:30–18:00, Sa 09:00–14:00 Uhr."
    ],
    "sozialdienstLeistungen": [
      "IRENA, T-RENA und Psy-RENA am Standort.",
      "Sozialberatung zu sozialrechtlichen Fragen, beruflicher Eingliederung und berufsbezogener Leistungsdiagnostik (Stellenprofil der Abteilung)."
    ],
    "therapieHinweise": [
      "Ambulante psychosomatische Reha (APR) mit Ziel psychischer Stabilisierung und sozialer/beruflicher Teilhabe.",
      "Chefärztin Psychosomatik Petra Vennen."
    ],
    "factsExtra": [
      "25 Behandlungsplätze Psychosomatik laut Träger/Stellenprofil.",
      "Zusätzlich Orthopädie, Physiotherapie, Ergotherapie, RV-Fit und betriebliches Gesundheitsmanagement."
    ]
  },
  "ck-medicos-aufschalke": {
    "alltag": [
      "Ambulantes Therapieprogramm montags bis freitags zwischen 08:00 und 16:30 Uhr, Ablauf und Umfang vergleichbar einer stationären Reha.",
      "Regelmäßige Infonachmittage mit Rundgang durch die Räume und Fragen zur Beantragung.",
      "Ganztägig ambulante Reha am Parkstadion/Schalke-Campus; Wohnen zu Hause.",
      "Kostenfreier Parkplatz A (Sanierung ab 18.03.26, Ausweichen auf Parkplatz B); Parkhaus kostenpflichtig, an Arena-Tagen deutlich teurer."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung als fester Bestandteil der psychosomatischen Rehabilitation.",
      "PSY-RENA-Nachsorge berufsbegleitend: 25 wöchentliche Gruppengespräche à 90 Minuten plus Aufnahme- und Abschlussgespräch."
    ],
    "therapieHinweise": [
      "Offene Bezugsgruppen mit rund 10 Teilnehmenden.",
      "Elemente u. a. Gesprächspsychotherapie in der Gruppe, Ergotherapie, Entspannung (PMR oder autogenes Training), Sport- und Bewegungstherapie, Ernährungsberatung und Psychoedukation.",
      "Indikationsgruppen u. a. Angst, Achtsamkeit, Schlaftraining, Depression, Selbstfürsorge, soziale Kompetenz und chronischer Schmerz.",
      "Eigene Abteilung Psychosomatik mit ärztlicher Leitung; ganztägig ambulant vergleichbar einer stationären Reha laut Trägerprofil."
    ],
    "factsExtra": [
      "Teil der ZAR-/Nanz-medico-Gruppe.",
      "Sekretariat Psychosomatik 0209 38033-484; Zentrale 0209 38033-0.",
      "SMS-Service 0151 52008995 laut Standortseite."
    ]
  },
  "ck-mevesta-fellbach": {
    "alltag": [
      "30 Plätze in Apartments mit Kochnische, Dusche und WC; fast ausschließlich Einzelzimmer.",
      "Gemeinschaftsküche, Wohnzimmer, PC mit Internet, freies WLAN; barrierefreier Zugang."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei Wiedereingliederung in Arbeit, Alltag und Familie.",
      "Vorbereitung ambulanter Betreuung nach der Adaption; sozialrechtliche Fragen.",
      "4- bis 12-wöchiges betreutes Praktikum in Betrieben, Verwaltung und Behörden."
    ],
    "therapieHinweise": [
      "Neben Psychotherapie Schwerpunkt berufliche Orientierung.",
      "Module Ernährungsberatung, Gesundheitsfürsorge, Sport und alltagspraktische Fertigkeiten."
    ],
    "factsExtra": [
      "Aufnahme nach Entwöhnung bei legalen oder illegalen Suchtmitteln oder Spielsucht.",
      "BAR-anerkanntes QM nach deQus / § 20 Abs. 2a SGB IX."
    ]
  },
  "ck-mi-pyrmont": {
    "kontraindikationen": [
      "Akute Suizidalität.",
      "Akute produktive Psychosen.",
      "Manifeste Suchterkrankung (Alkohol- und Drogenabhängigkeit)."
    ],
    "alltag": [
      "Unterbringung in Einzelzimmern mit Balkon; Telefon, Fernseher und WLAN gegen Gebühr.",
      "Anreise zwischen 10:00 und 12:00 Uhr; kostenloser Safe im Zimmer; Handtücher stellt die Klinik, zwei Badetücher für Anwendungen mitbringen.",
      "Rauchen im Zimmer, auf dem Balkon und im Nichtraucherbereich vor den Eingängen nicht gestattet (inkl. E-Zigaretten und Shishas).",
      "Waschmaschine und Trockner gegen Gebühr; Bügeleisen gegen Pfand; kostenlose Parkplätze vor der Klinik, Tiefgarage gegen Gebühr.",
      "Taxifahrt vom Bahnhof Bad Pyrmont zur Klinik übernimmt die Klinik laut Anreisehinweis.",
      "Unterbringung mit virtuellem Klinikrundgang auf der Trägerseite; Komfortleistungen und Verpflegung gesondert beschrieben."
    ],
    "sozialdienstLeistungen": [
      "Psy-RENA-Nachsorge der Deutschen Rentenversicherung kann eingeleitet werden.",
      "Sozial- und Rehabilitationsberatung als individuelle Zusatztherapie nach Indikation.",
      "Sozialdienst: Information, Beratung und Vermittlung u. a. zu Haushaltshilfe, Essen auf Rädern, häuslicher Pflege, Tagesstätten/Tagespflege und beruflich-sozialen Maßnahmen.",
      "IRENA im Ambulanten Therapiezentrum der Klinik für DRV Bund und Land; Empfehlung des Reha-Arztes erforderlich."
    ],
    "mitbehandlungHinweis": "Am Standort zusätzlich Orthopädie/Unfallchirurgie, spezielle Schmerztherapie, Geriatrie und AltersTraumaZentrum. Begleitperson nach Absprache ab einer Woche im Patientenzimmer möglich (laut Merkblatt 60 € zzgl. Kurtaxe, Vollpension, Nutzung Schwimmbad).",
    "therapieHinweise": [
      "Abteilung psychosomatische Rehabilitation; zusätzlich spezielle Schmerztherapie und ambulantes Therapiezentrum am Standort.",
      "Kunst-, Tanztherapie, Tai Chi/Qigong und Hyperthermie im öffentlichen Profil genannt."
    ],
    "factsExtra": [
      "Checkliste/Anreise und Entlassmanagement auf der Klinikseite hinterlegt."
    ],
    "wahlleistungenHinweis": "Komfortleistungen auf der Patientenseite ausgewiesen; Details über die Klinik."
  },
  "ck-michels-brandenburg": {
    "alltag": [
      "In der Regel Einzelzimmer mit Fernseher; Handtücher und Bettwäsche werden gestellt.",
      "Besuche bis 22:00 Uhr möglich, ohne die Therapien zu stören.",
      "Kostenfreies WLAN unter anderem im Foyer.",
      "Waschmaschinen und Trockner gegen Gebühr (50-Cent-Stücke).",
      "Haustiere aus hygienischen Gründen nicht gestattet.",
      "Klinikparkplatz gegen Gebühr; begrenzte Zahl an Plätzen."
    ],
    "sozialdienstLeistungen": [
      "Bei Bedarf werden während der Behandlung weiterführende Wiedereingliederungsmaßnahmen im Sinne einer Nachsorge eingeleitet bzw. vermittelt."
    ],
    "wahlleistungenHinweis": "Bademantel an der Rezeption leihweise gegen Gebühr. Waschmaschinen und Trockner gegen Gebühr.",
    "mitbehandlungHinweis": "Fachabteilungen Neurologie (Phasen B–D), Orthopädie, Kardiologie und Geriatrie im selben Haus; ärztliche Aufnahmeuntersuchung internistisch-neurologisch, bei Bedarf orthopädisch.",
    "therapieHinweise": [
      "Eigene Reha-Abteilung Psychosomatik (Depression, Angst, Zwang, chronischer Schmerz, Tinnitus, Trauer, ADHS) neben Neuro, Ortho, Kardio und Geriatrie."
    ],
    "factsExtra": [
      "Eine der größten Michels-Kliniken; Waldsiedlung Bernau nördlich von Berlin.",
      "Nicht identisch mit Fontane-Klinik Motzen oder Hoppegarten."
    ]
  },
  "ck-michels-pankow": {
    "alltag": [
      "Zur Behandlung sportliche Kleidung, Turnschuhe und ein großes Handtuch mitbringen.",
      "Innerstädtische Tagesklinik Forum Pankow; Öffnungszeiten Mo–Do 07:00–19:00, Fr 07:00–17:00 Uhr.",
      "Telefonische Erreichbarkeit Mo–Fr 07:00–14:30 Uhr."
    ],
    "sozialdienstLeistungen": [
      "Sozialmedizinische Beratung: Vorträge zu sozialrechtlichen Fragen, Unterstützung bei Anträgen und bei der Wiedereingliederung ins Berufsleben.",
      "IRENA/T-RENA-Nachsorge im Profil.",
      "Berufsbegleitende Reha (BbR) zusätzlich zur ganztägig ambulanten Reha genannt."
    ],
    "therapieHinweise": [
      "Evidenzbasierte Psychotherapie, vorwiegend kognitive Verhaltenstherapie, Schematherapie, CBASP sowie Akzeptanz- und Commitment-Therapie.",
      "Ergänzend Entspannung (autogenes Training, PMR), Sport inkl. Walking, Schwimmen und Aqua-Fitness, Ergo-, Musik- und Kunsttherapie sowie Kochgruppe.",
      "40 Behandlungsplätze Psychosomatik neben Orthopädie, Neurologie und Geriatrie."
    ],
    "factsExtra": [
      "Tele-Reha-Nachsorge mit Caspar Health nach der ambulanten Reha ausgewiesen.",
      "Selbstständiges Erreichen der Klinik, auch mit öffentlichen Verkehrsmitteln, ist Voraussetzung.",
      "IK 541100207; Therapiepraxis ProVital am Standort."
    ]
  },
  "ck-mittelrhein": {
    "kontraindikationen": [
      "Organische psychische Störungen (F0), z. B. Demenz",
      "Akute oder instabile Psychosen (stabile psychopharmakologische Einstellung vor Reha-Beginn)",
      "Alkohol-, Medikamenten- oder Drogenabhängigkeit bzw. Polytoxikomanie",
      "Intelligenzminderung wesentlichen Ausmaßes",
      "Aktuelle oder drohende Selbst- oder Fremdgefährdung"
    ],
    "alltag": [
      "Freundlich eingerichtete Einzelzimmer mit Bad; Telefon, Radio, Fernseher",
      "Schwimmbad und Sauna, Lehrküche, Bistro, Bibliothek, Duft- und Kräutergarten, Barfußpfad",
      "Freizeit u. a. Yoga, Qigong, Minigolf, Boccia, Outdoor-Fitness, geführte Wanderungen, Alpaka-Spaziergänge"
    ],
    "sozialdienstLeistungen": [
      "Zusammenarbeit mit Selbsthilfe u. a. ADHS-Kompass Koblenz, Deutsche Tinnitus-Liga, Anonyme Alkoholiker"
    ],
    "therapieHinweise": [
      "Integratives verhaltenstherapeutisches Konzept mit Gruppen- und Einzelpsychotherapie",
      "Spezialangebote: AD(H)S im Erwachsenenalter (Basisgruppe plus indikative Gruppe), chronischer Tinnitus, Psychoonkologie, psychosomatische Post-COVID-Reha",
      "Ergänzend Körper-, Kreativ- und Sozio-/Ergotherapie; Sport inkl. therapeutischem Klettern und Wassergymnastik"
    ],
    "factsExtra": [
      "195 Behandlungsplätze; Träger Deutsche Rentenversicherung Rheinland-Pfalz",
      "Barrierefreie Zimmer ausgewiesen",
      "Hochhaus nach Brandkernsanierung wieder in Betrieb, 195 Betten am Standort.",
      "Freizeitangebot u. a. Alpaka-Spaziergänge im Kurpark."
    ],
    "wahlleistungenHinweis": "Fernsehgerät und WLAN im Zimmer gebührenfrei; WLAN während der Therapien nicht nutzen.",
    "mitbehandlungHinweis": "Psychosen nur bei stabiler psychopharmakologischer Einstellung vor Reha-Beginn. Post-COVID: kardiologisches Konsil in Boppard bzw. pulmologisches Konsil in Simmern möglich; ausgeprägte Traumafolgestörung nach Intensivtherapie eher in einer auf Traumabewältigung spezialisierten Klinik."
  },
  "ck-moehringsburg": {
    "alltag": [
      "Therapie überwiegend in geschlechtsspezifischen Gruppen; Männern und Frauen steht jeweils eine eigene Station zur Verfügung.",
      "Frauenabteilung: 6 Einzel- und 2 Doppelzimmer mit TV und eigenem Bad sowie Gemeinschaftsraum.",
      "35 stationäre und 7 ganztägig ambulante Plätze in überschaubarem, niedrigschwelligem Setting."
    ],
    "sozialdienstLeistungen": [
      "Beratung zur stufenweisen Wiedereingliederung, zum integrativen Fallmanagement und zur Fortführung in der Suchtberatungsstelle am Wohnort."
    ],
    "therapieHinweise": [
      "Substitutionsgestützte Rehabilitation: Integration in die bestehenden Therapiegruppen; Kurzbehandlung in der Regel 12 Wochen, Langzeit bis 26 Wochen.",
      "Ganztägig ambulant: in der Regel 8–15 Wochen; Kombinationsbehandlung mit der Suchtberatungsstelle über insgesamt 52 Wochen möglich (ganztägig ambulante Phasen höchstens 15 Wochen).",
      "Aufnahme in die substitutionsgestützte Therapie bei stabiler Substitutionsdosis und abgeschlossener Teilentgiftung vom Beikonsum.",
      "Individuell gestaltete Entwöhnung bei Alkohol-, Cannabis-, Medikamenten- und Mischabhängigkeit.",
      "Genderspezifische Suchtbehandlung ausgewiesen.",
      "Behandlungsdauer in der Regel 8–15 Wochen."
    ],
    "factsExtra": [
      "Ganztägig ambulantes Angebot ausdrücklich auch für alleinerziehende Elternteile, denen eine stationäre Entwöhnung wegen fehlender Kinderbetreuung nicht möglich ist.",
      "Wunsch- und Wahlrecht nach § 9 SGB IX; Formular zum Beifügen an den Reha-Antrag auf der Klinikseite.",
      "Teil des Suchtkompetenzzentrums der Klinikum Osnabrück GmbH.",
      "Nahtlosverfahren der DRV Braunschweig-Hannover.",
      "Standort im ehemaligen St.-Raphael-Krankenhaus Ostercappeln."
    ],
    "mitbehandlungHinweis": "Aufnahme auch bei erhöhtem Pflegebedarf und leichter/mittelgradiger Intelligenzminderung; barrierefreie Ausstattung; Anbindung an das Klinikum Osnabrück."
  },
  "ck-motzen": {
    "kontraindikationen": [
      "ADS/ADHS nicht als Hauptdiagnose mit spezifischem Konzept",
      "Anorexie nur bei klarem Behandlungsauftrag und BMI von mindestens 16,0 kg/m²"
    ],
    "alltag": [
      "Therapeutische Gemeinschaft; Familien- oder Durchgangszimmer nach Absprache.",
      "Besuchszeiten werktags 16:30–21:00 Uhr, Wochenende und Feiertage 9:00–22:00 Uhr.",
      "Ärztliche und pflegerische 24-Stunden-Präsenz auch an Sonn- und Feiertagen.",
      "Psychosomatik: wohnlich gestaltete Einzelzimmer mit Dusche und WC.",
      "Behindertengerechte Zimmer; Aufnahme auch bei hohem Körpergewicht bis 300 kg nach Klinikangabe. Familienzimmer, Durchgangszimmer und Allergikerzimmer.",
      "Alle mitgeführten Medikamente bei Aufnahme im Pflegedienst abgeben; Ausgabe über die Klinikärzte zu festen Zeiten."
    ],
    "sozialdienstLeistungen": [
      "Information zu existenzsichernden Hilfen",
      "Beratung zur beruflichen Situation und zu Leistungen zur Teilhabe am Arbeitsleben",
      "Unterstützung bei stufenweiser Wiedereingliederung und beruflichen Veränderungen",
      "Hilfe im Umgang mit Ämtern und bei Antragstellungen, Unterstützung in Schuldenfragen",
      "Vermittlung in Adaption, stationäre Nachsorge und betreutes Wohnen",
      "Existenzsichernde Hilfen und Umgang mit Ämtern und Behörden."
    ],
    "therapieHinweise": [
      "Essstörungssetting bis zu 10 Wochen, Abschluss ggf. mit 14-tägiger Selbstversorgerphase.",
      "MBOR mit beruflichem Stressmanagement, sozialem Kompetenztraining, Ergo- und Arbeitstherapie.",
      "Trauergruppe, Indikationsgruppen Angst, Yoga/Meditation, Körpertherapie.",
      "Mitbehandlung gravierender komorbider somatischer und Suchterkrankungen bei klarem fachärztlichem Auftrag.",
      "Psychotherapie tiefenpsychologisch fundiert, verhaltenstherapeutisch, systemisch und psychoanalytisch; Einzel- und Gruppen.",
      "Indikationsgruppen unter anderem Depression, Angst, Schmerz, Trauer, soziales Kompetenztraining und berufliches Stressmanagement."
    ],
    "factsExtra": [
      "Drei Fachabteilungen am Standort: Sucht, Erwachsenenpsychosomatik, Kinder- und Jugendpsychosomatik.",
      "Seelage Motzen südlich von Berlin.",
      "Nur zwei Zimmer für Hunde geeignet; Nachfrage auf diese Plätze ist hoch.",
      "Versorgungsvertrag nach § 111 SGB V; federführend DRV Bund sowie gesetzliche Krankenkassen.",
      "Telefonisches Vorgespräch mit dem Aufnahmeteam möglich; nach Bewilligung schriftliche Einladung plus Checkliste.",
      "Am Standort auch Kinder- und Jugendpsychosomatik; Kontraindikationen dort unter anderem akute Psychose, Drogenintoxikation, Suizidalität oder Fremdaggressivität."
    ],
    "mitbehandlungHinweis": "24-Stunden-Präsenz, Visiten und bezugsärztliche Sprechstunden. Diagnostik im Haus u. a. Labor, Sonografie, EKG, 24-Stunden-EKG und -Blutdruck. Kooperation mit der hauseigenen Suchtabteilung, Berliner Unikliniken und regionalen Akuthäusern."
  },
  "ck-muenchwies": {
    "kontraindikationen": [
      "Abhängigkeit von harten Drogen (z. B. Heroin, Crack) als klare Kontraindikation.",
      "Akute Psychosen; akute Selbstgefährdung."
    ],
    "therapieHinweise": [
      "Cannabis als Haupt- oder Nebendiagnose behandelbar; eigene Cannabisgruppe zwei Stunden pro Woche.",
      "Polyvalenter Gebrauch ohne harte Drogen möglich.",
      "Essstörungsprogramm Anorexie/Bulimie geschlechtsspezifisch, auch für Männer.",
      "Verhaltenstherapie mit Elementen der Gesprächs- und Körpertherapie.",
      "Gruppentherapie in der therapeutischen Wohngruppe, Einzeltherapie und Indikativgruppen.",
      "Behandlung suchtmittelfrei antreten; Entgiftung im Akutkrankenhaus rechtzeitig vorplanen."
    ],
    "factsExtra": [
      "Suchtmittelfreier Antritt; Entgiftung bei Bedarf im Akutkrankenhaus vorab zu planen.",
      "Abteilung für psychische und psychosomatische Störungen neben der Suchtabteilung."
    ],
    "alltag": [
      "Offen geführtes Haus; Aufnahme nur bei freiwilligem Antritt.",
      "Frühstück und Abendessen im Speisesaal mit der Wohngruppe; therapeutische Angebote bis in den späten Nachmittag.",
      "Handtücher und Bettwäsche stellt die Klinik; Wäschewaschen in Eigenregie, Wäschesack mitbringen.",
      "Großes Bade-/Saunatuch selbst mitbringen; Hallenturnschuhe ohne schwarze Sohlen.",
      "Strapazierfähige Kleidung für die Ergotherapie (Arbeiten mit Farben).",
      "Elektrische Geräte nur in geprüftem, einwandfreiem Zustand; Radio nur mit Kopfhörer."
    ],
    "sozialdienstLeistungen": [
      "Soziotherapie zu Wohnungsproblemen, Schulden und Rückkehr ins Berufsleben.",
      "Bei Arbeitslosigkeit Bewerbungsunterlagen (z. B. Lebenslauf) mitbringen."
    ]
  },
  "ck-muenzesheim": {
    "kontraindikationen": [
      "Akute Psychose.",
      "Akute Suizidalität.",
      "Keine allgemeingültige Zulassung nach § 35 BtMG."
    ],
    "sozialdienstLeistungen": [
      "Angehörigenseminar; stützende Angehörige werden nach Rücksprache einbezogen.",
      "Arbeitstherapie in Schreinerei, Schlosserei, Gärtnerei, Haustechnik und Kleintierzoo zur Vorbereitung auf den Arbeitsmarkt."
    ],
    "alltag": [
      "Modern ausgestattete Einzelzimmer mit eigenem Bad, großteils Balkon.",
      "Bibliothek, Fernsehraum, Patienten-Café mit Internet, Teeküchen, Kiosk, Schwimmbad, Sauna, Beachvolleyball, Tischtennis, Kraftraum, Sporthalle."
    ],
    "therapieHinweise": [
      "Schwerpunkt pathologisches Glücksspiel neben stoffgebundener Abhängigkeit.",
      "Abstinenzorientiertes ganzheitliches Konzept mit medizinischer und psychotherapeutischer Begleitung plus kreative, soziale und sportliche Angebote.",
      "Entwöhnung nach abgeschlossener akuter Entgiftung; bei Medikamentenabhängigkeit Aufnahme frei von süchtig machenden Medikamenten."
    ],
    "factsExtra": [
      "Psychosomatische Fachklinik im selben Trägerverbund, anderes Haus.",
      "Barrierefreie Einzelzimmer vorhanden."
    ]
  },
  "ck-nado-dortmund": {
    "sozialdienstLeistungen": [
      "Federführender Leistungsträger DRV Westfalen; Belegung auch durch andere Rentenversicherungsträger und Krankenkassen.",
      "Nach der Adaption Übergang ins Ambulant Betreute Wohnen möglich (21 Wohnplätze in drei Häusern, Einzelwohnungen und WGs).",
      "Schuldnerberatung.",
      "Kooperation mit Betrieben, Schulen, Jobcentern und überbetrieblichen Ausbildungsstätten; enge Verbindung zum Therapiezentrum Ostberge."
    ],
    "alltag": [
      "17 Plätze, überwiegend Einzelzimmer mit Bad/WC; Gemeinschaftsküchen, Ess-, Fernseh- und Aufenthaltsräume, begrünter Innenhof.",
      "Dauer drei bis vier Monate."
    ],
    "therapieHinweise": [
      "Tiefenpsychologische und verhaltenstherapeutische Einzeltherapie sowie Groß- und Kleingruppen.",
      "Ergotherapie: EDV-Schulung, Leistungsdiagnostik; Arbeitstherapie mit interner und externer Belastungserprobung.",
      "Sport: Fußball, Badminton, Kraftsport, Volleyball, Laufen; Psychoedukation, Autogenes Training, Ernährungsberatung, Raucherentwöhnung."
    ],
    "factsExtra": [
      "Frauen, Männer und Paare, jeweils auch mit Kindern; in Ausnahmefällen Quereinsteiger nach zeitnah beendeter Therapie.",
      "Anerkennung nach §§ 35/36 BtMG.",
      "Informationsgespräch vor Aufnahmeentscheidung."
    ],
    "mitbehandlungHinweis": "Sozialmedizinische, psychiatrische und neurologische Diagnostik im Haus."
  },
  "ck-nauheim": {
    "kontraindikationen": [
      "Akute Suizidalität",
      "Akute psychotische Zustände",
      "Gerichtliche Therapieauflage",
      "Opiatsubstitution (z. B. Methadon oder Subutex)",
      "Pflegebedürftigkeit",
      "Fehlende Fähigkeit, dem Selbstmanagementkonzept zu folgen"
    ],
    "therapieHinweise": [
      "Langzeit: Alkohol/Medikamente in der Regel 13–15 Wochen, Drogen 24 Wochen, Verhaltenssüchte 10 Wochen.",
      "Kurzzeit 8–10 Wochen nur bei Alkohol/Medikamenten mit Abstinenzerfahrung und ohne schwere Folgeerkrankungen.",
      "Eigene Frauengruppe und Seniorengruppe; Auffang-/Wiederholerbehandlung 8–10 Wochen.",
      "Nahtlosaufnahme aus Entgiftung möglich; Kooperationspartner Vitos Hochtaunus.",
      "Eigene Abteilung für Verhaltenssüchte (Glücksspiel, Kauf-Shopping-Störung, Computerspielstörung) mit eigenem DRV-Abteilungsschlüssel.",
      "Neben kognitiver Verhaltenstherapie je nach Indikation Schematherapie, DBT, Selbstmitgefühl, Akzeptanz- und Commitment-Therapie sowie traumatherapeutische Interventionen."
    ],
    "factsExtra": [
      "300 komfortable Einzelzimmer im Neubau Zentrum für psychische Gesundheit.",
      "Fachambulanz in Friedrichsdorf: ambulante Entwöhnung, Suchtnachsorge und Psy-RENA.",
      "Interne Adaption mit externer Belastungserprobung bei regionalen Arbeitgebern.",
      "Neubau als barrierefreies Zentrum für psychische Gesundheit geplant und umgesetzt; medizinische Station mit getrenntem Zugang von Sucht- und psychosomatischer Klinik.",
      "Beihilfe für Beamtinnen und Beamte ausgewiesen; Selbstzahler werden aufgenommen.",
      "Kooperation mit der Vitos Klinik: Entzugsbehandlung unmittelbar vor der Entwöhnung mit nahtlosem Übergang."
    ],
    "alltag": [
      "Neben stoffgebundenen Süchten auch Spielsucht, Kaufsucht und Mediensucht im Angebot.",
      "Getrennte Speisesäle für Abhängigkeitserkrankungen, Psychosomatik und Mitarbeitende; Lounge auf jeder Etage der Psychosomatik.",
      "Nach dem Standortwechsel 2024: komfortable Einzelzimmer in der Klinik für Abhängigkeitserkrankungen.",
      "Nach Kostenzusage sendet das Haus einen Vor-Aufnahmefragebogen; Sie senden ihn ausgefüllt zurück.",
      "Ambulante Betreuer und Angehörige dürfen Sie am Aufnahmetag begleiten."
    ],
    "wahlleistungenHinweis": "Belegung durch Renten- und Krankenversicherung; beihilfefähig nach BhV des Bundes und der Länder. Selbstzahler werden aufgenommen.",
    "sozialdienstLeistungen": [
      "Vor der Antragstellung Kontakt zu einer Suchtberatungsstelle oder einem betrieblichen Sozialdienst; die Klinik vermittelt auf Wunsch."
    ]
  },
  "ck-nettetal": {
    "kontraindikationen": [
      "Schwere somatische Erkrankungen, bei denen eine aktive Teilnahme an der Rehabilitation nicht möglich ist.",
      "Chronische Erkrankungen oder Behinderungen mit stark eingeschränkter Selbstversorgung und dichtem Pflegebedarf.",
      "Schwere psychische Störungen, für die die gruppentherapeutische Behandlung eine andauernde Überforderung darstellt oder bei hirnorganischer Beeinträchtigung eine Psychotherapie nicht erfolgversprechend ist."
    ],
    "alltag": [
      "Drei Gebäude mit Einzel- und Doppelzimmern, jeweils eigenes Bad mit Dusche und WC; abschließbares Wertfach im Zimmer.",
      "Pate bzw. Patin aus der Rehabilitandenschaft in der Anfangszeit; Aufnahmegruppe zur Vorstellung.",
      "Besuch samstags und sonntags 14:00–19:00 Uhr; Besuchspersonen suchtmittelfrei.",
      "Handy, Laptop und Tablet in der Freizeit möglich; Musik im Zimmer mit Kopfhörern.",
      "Rauchen nur im Raucherpavillon; Alkohol und nicht verordnete psychotrope Substanzen nicht gestattet.",
      "Adaption in eigenem Haus mit Selbstversorgung, Einzelzimmer mit Bad, Küche, Waschmaschine und Trockner."
    ],
    "sozialdienstLeistungen": [
      "Sozialrechtliche Beratung zu Berufsfindung, Arbeitsplatzsicherung und Anträgen auf Sozialleistungen.",
      "Maßnahmen zur Schuldenregulierung; Justizbetreuung und Korrespondenz mit Behörden.",
      "Angehörigenarbeit: Informationsveranstaltungen und Gespräche zu Psychoedukation und Co-Abhängigkeit.",
      "Ambulante Nachsorge und Weiterbehandlung."
    ],
    "factsExtra": [
      "Aufnahme ab Volljährigkeit; federführend DRV Braunschweig-Hannover, daneben Krankenkassen und Sozialhilfeträger.",
      "Behandlung nach § 64 StGB nach Einzelfallentscheidung.",
      "Männerspezifisch.",
      "BtMG-Anerkennung, Kombi-Nord."
    ],
    "therapieHinweise": [
      "Stationäre Entwöhnung, integrierte Adaption, ganztägig ambulante Behandlung, Kombinationsbehandlung.",
      "Angebote Trauma und Sucht, Psychose und Sucht, pathologisches Glücksspiel, Cannabisbehandlung.",
      "Rehabilitation unter Substitution; BORA; Rückfallbehandlung."
    ]
  },
  "ck-neue-rhoen": {
    "kontraindikationen": [
      "Akute Suizidalität und akute Eigengefährdung bei fehlender Absprachefähigkeit.",
      "Schwere selbstverletzende Verhaltensweisen bei fehlender Absprachefähigkeit; Aggressivität und akute Fremdgefährdung.",
      "Akute Psychosen, Schizophrenie, wahnhafte Störungen und akute Manien, die nicht ausreichend medikamentös behandelt sind.",
      "Akute Intoxikation, fehlende Entgiftung und akutes Entzugssyndrom.",
      "Beigebrauch unter Substitution; fehlende Abstinenzfähigkeit bzw. fehlender Abstinenzwunsch.",
      "Schwere körperliche Erkrankungen mit kontinuierlichem Pflegebedarf; akute ansteckende Infektionen (z. B. offene Tuberkulose)."
    ],
    "alltag": [
      "Patientenzimmer in Neubauten; Hauptgebäude historischer Gutshof auf rund 3 ha im Biosphärenreservat Rhön.",
      "Rauchen nur in geschlechtergetrennten Außenbereichen; im Zimmer und auf Balkonen untersagt.",
      "WLAN hausweit; Handy in der Regel erst in der therapiefreien Zeit ab 16 Uhr.",
      "Waschmaschinen gegen Waschmarken; private Fernseher, Kühlschränke und Wasserkocher nicht mitbringen.",
      "Hunde in Einzelfällen nach Absprache; Fahrdienst vom Bahnhof Burghaun, nach Absprache auch aus der Entgiftung.",
      "Paare in Paarzimmern im Männerbereich."
    ],
    "sozialdienstLeistungen": [
      "Antragstellung in der Regel über Suchtberatungsstelle, eigene Fachstelle, sozialpsychiatrischen Dienst oder Krankenhaus-Sozialdienst.",
      "Eigene Fachstellen in Fulda und Frankfurt inkl. ambulanter Rehabilitation und DigiSucht-Beratung.",
      "Fahrtkostenabrechnung bei DRV-Kostenträger während der Kassenzeiten im Haus."
    ],
    "therapieHinweise": [
      "Geschlechtsspezifische Therapie für Frauen und Männer ab 18 Jahren.",
      "Wöchentliche Einzeltherapie beim Bezugstherapeuten plus Gruppentherapie; Gruppen- und Einzeltherapeut nach Möglichkeit nicht identisch.",
      "Paarseminare und Paargespräche, wenn beide Partner suchtmittelabhängig sind.",
      "Spezialkonzept Cannabisabhängigkeit und Depressionen auf der Klinikseite genannt.",
      "Suchtfachklinik mit Paartherapie.",
      "Mitaufnahme von Begleitkindern; Familienzimmer."
    ],
    "factsExtra": [
      "Aufnahme in der Regel nach abgeschlossener Entgiftung, sofern erforderlich; Nahtlosverfahren direkt von Entgiftungsstationen möglich.",
      "Medizinische Rehabilitation nach SGB IX für DRV und GKV."
    ],
    "mitbehandlungHinweis": "Komorbide psychische Störungen (u. a. Depression, Angst, Essstörung, PTBS) und somatische Folgeerkrankungen werden diagnostiziert und mitbehandelt, in Zusammenarbeit mit niedergelassenen Fachärzten."
  },
  "ck-neumuehle": {
    "kontraindikationen": [
      "Aufnahme in der Regel ab 18 Jahren.",
      "Nicht vorgesehen bei chronischem hirnorganischem Psychosyndrom, ungeklärten ansteckenden Erkrankungen und überwiegender Pflegebedürftigkeit."
    ],
    "alltag": [
      "48 Behandlungsplätze, überwiegend Zweibettzimmer mit Dusche und WC.",
      "Kostenlose Telefon- und Internetnutzung sowie Fahrservice laut Trägerprofil.",
      "Arbeitstherapeutische Werkstätten Holz/Metall, Nutzgarten mit Gewächshaus, Stallungen; Bewegungsraum und EDV-Schulungsraum."
    ],
    "sozialdienstLeistungen": [
      "Sozialmedizinische Beratung, Abklärung wirtschaftlicher Verhältnisse und Krankenversicherungsschutz.",
      "Hilfe bei Schuldenregulierung und aktiver Bewältigung von Wohnungs- und Arbeitslosigkeit.",
      "Vorbereitung beruflicher Reintegration, Nachsorge und Vermittlung an Suchtberatungsstellen bzw. Adaption."
    ],
    "mitbehandlungHinweis": "Doppeldiagnosen (u. a. Psychosen, Depression, Angst, PTBS, Persönlichkeitsstörungen, Essstörungen) und somatische Begleiterkrankungen wie Hepatitis können mitbehandelt werden. Aufnahme von Schwangeren und Paaren ausgewiesen.",
    "therapieHinweise": [
      "Stationäre Entwöhnung vor allem bei Drogenabhängigkeit.",
      "Frauenspezifisches Angebot.",
      "Q Reha plus; Versorgungsvertrag § 111 SGB V."
    ],
    "factsExtra": [
      "Schwesterklinik der Saaletalklinik."
    ]
  },
  "ck-nordlicht": {
    "alltag": [
      "Einzelzimmer mit Dusche und WC, barrierefrei ausgewiesen.",
      "Gemeinsame Mahlzeiten; Nachtruhe 22:00–06:00 Uhr.",
      "Besuch nach der ersten Woche; Rauchen nur im Raucherpavillon.",
      "Glücksspiel inklusive Online-Spielen um Geld ist untersagt.",
      "Rehabilitationsabteilung Freudenholm: Unterbringung in Einzelzimmern mit Dusche und WC.",
      "Klinik erfüllt öffentlich die Kriterien der Barrierefreiheit."
    ],
    "sozialdienstLeistungen": [
      "Beratung zu beruflicher Wiedereingliederung und sozialen Fragen.",
      "Entlassmanagement plant die Nachsorge.",
      "Aufnahmeplanung für die Rehabilitationsabteilung; nahtloser Wechsel von der qualifizierten Entzugsbehandlung in Rickling ist öffentlich genannt.",
      "Nachsorge über Beratungsstellen, Selbsthilfegruppen und betriebliche Suchthelfer.",
      "BORA-Praktika intern und extern zur beruflichen Orientierung."
    ],
    "therapieHinweise": [
      "Arbeitstherapie, Tabakentwöhnung, VR-Expositionstraining und tiergestützte Therapie.",
      "Regeldauer 13 Wochen; interne und externe Praktika möglich.",
      "Nahtloser Wechsel von der qualifizierten Entzugsbehandlung in Rickling möglich.",
      "Zehn Therapiegruppen mit insgesamt 120 Behandlungsplätzen in der medizinischen Rehabilitation.",
      "Arbeitstherapie und Ergotherapie sind im Qualitätsbericht ausgewiesen.",
      "Zehn Therapiegruppen in der medizinischen Rehabilitation."
    ],
    "factsExtra": [
      "Zehn Therapiegruppen am Standort Freudenholm.",
      "Kombibehandlung / integrierte Rehabilitation öffentlich genannt.",
      "Maximale Regeldauer der medizinischen Rehabilitation: 13 Wochen.",
      "Qualifizierte Entzugsbehandlung und Krisenintervention laufen im Psychiatrischen Krankenhaus Rickling, nicht in der Reha-Abteilung.",
      "Keine Substitutionsbehandlung illegaler Drogen laut Qualitätsbericht.",
      "Geleitete Selbsthilfegruppe WIDA für Frauen mit Alkohol- und Medikamentenproblemen am Standort Schellhorn."
    ],
    "kontraindikationen": [
      "Keine Substitutionsbehandlung illegaler Drogen laut Qualitätsbericht der klinischen Abteilung."
    ],
    "mitbehandlungHinweis": "Qualifizierte Entzugsbehandlung und Krisenintervention laufen im Psychiatrischen Krankenhaus Rickling, nicht in der Rehabilitationsabteilung Freudenholm. Nahtloser Wechsel in die Reha ist öffentlich genannt.",
    "wahlleistungenHinweis": "Belegung durch Rentenversicherung, gesetzliche und private Krankenkassen; Behandlung beihilfefähig."
  },
  "ck-oberharz": {
    "alltag": [
      "Planmäßige Ankunft 9:00–11:00 Uhr an der Rezeption; Schlüsselkarte, anschließend Pflegezentrale vor dem Zimmerbezug.",
      "Klinik gibt nur Medikamente aus, die für die onkologische, hämatologische oder psychosomatische Behandlung notwendig sind; übrige Mittel selbst mitbringen.",
      "280 modern ausgestattete Einzelzimmer mit Dusche, WC, Kühlschrank und LCD-Fernseher inkl. Rehabilitandenkanal."
    ],
    "wahlleistungenHinweis": "Begleitpersonen möglich; Unterkunft und Verpflegung laut Klinikseite 74 € pro Tag, Zahlung über die Touristinformation.",
    "mitbehandlungHinweis": "Schwerpunktklinik für Onkologie und Psychosomatik am Standort. Freiverkäufliche und auf Privatrezept verordnete Mittel selbst mitbringen.",
    "sozialdienstLeistungen": [
      "Nachsorge und Selbsthilfe im Navigationsangebot.",
      "Beratung und Schulung neben der Therapie."
    ],
    "therapieHinweise": [
      "Schwerpunkte Burnout, Psychoonkologie und Stammzelltransplantation.",
      "MBOR und ambulante Reha öffentlich genannt.",
      "Wellness-Angebote im Haus auf der Klinikseite."
    ],
    "factsExtra": [
      "280 Betten, rund 180 Mitarbeitende.",
      "AHB im Angebot.",
      "Onkologie und Psychosomatik am Standort."
    ]
  },
  "ck-oelmuehle": {
    "wahlleistungenHinweis": "Münzwaschmaschinen und Trockner im Haus; Bettwäsche und Handtücher werden gestellt. Haustiere sind nicht gestattet. Fahrrad auf eigene Verantwortung möglich.",
    "mitbehandlungHinweis": "Medizinische Behandlung durch die Klinikärztinnen und Klinikärzte; bei Bedarf fachärztliche Untersuchungen. Mitgebrachte Medikamente bei Ankunft abgeben.",
    "alltag": [
      "80 Einzelzimmer im stationären Bereich; 10 Plätze ganztägig ambulant; 16 Adaptionsplätze."
    ],
    "sozialdienstLeistungen": [
      "Nachsorge im Angebot.",
      "Kombinationstherapie stationär/ambulant."
    ],
    "therapieHinweise": [
      "Standardtherapie 24 Wochen stationär bei Medikamentenabhängigkeit.",
      "Indikative Gruppen u. a. PMR, Persönlichkeitsstile, Kunsttherapie, Nichtrauchermotivation, Stressbewältigung, gesunde Ernährung.",
      "Belastungserprobung."
    ],
    "factsExtra": [
      "Schwerpunktklinik Medikamentenabhängigkeit der DRV Mitteldeutschland laut Trägerseite.",
      "91 % Weiterempfehlungsquote auf der Klinikseite genannt."
    ]
  },
  "ck-oerrel": {
    "kontraindikationen": [
      "Akute Suizidalität; Fremdgefährdung bei mehrfacher substanzunabhängiger Gewaltbereitschaft.",
      "Desorientierung oder erhebliche Merkfähigkeitsstörungen bei Demenz oder Delir; akute oder instabile Psychosen; manische Phasen.",
      "Erhebliche Pflegebedürftigkeit oder erhebliche Gehbehinderung, die die Reha-Teilnahme ausschließt.",
      "Drogenabhängigkeit als Hauptdiagnose; aktueller Heroinbeikonsum und/oder laufende Substitution.",
      "Pathologisches Spielen ohne eigenes Setting; Spielsucht soll bereits behandelt oder derzeit nicht behandlungsbedürftig sein."
    ],
    "alltag": [
      "66 Behandlungsplätze; Einzel- und Doppelzimmer einschließlich barrierefreier Varianten.",
      "Regulärer Aufnahmetag Mittwoch; Patenbegleitung am Aufnahmetag.",
      "Arbeitstherapie in Holzwerkstatt, Garten, Hauswirtschaft und Haustechnik.",
      "Fitnessraum, Sauna, Turnhalle, Lehrküche; Freizeit u. a. Minigolf, Boule, Tennis.",
      "Mitnahme von Begleittieren öffentlich angeboten."
    ],
    "sozialdienstLeistungen": [
      "Beratung zu Lebensunterhalt, Übergangsgeld, Schuldnerberatung, Kleidergeld und Grad der Behinderung.",
      "Kooperation mit Jobcenter, Agentur für Arbeit und Betrieben zur Wiedereingliederung.",
      "Antragstellung mit Begleitung durch die Klinik.",
      "Eigene Adaption Hambühren."
    ],
    "mitbehandlungHinweis": "Am Aufnahmetag Check auf Suchtmittelfreiheit und Rehafähigkeit durch den leitenden Arzt; psychiatrisch-psychotherapeutische Aufnahme in den ersten drei Tagen. Internist als Bezugsarzt für somatische Begleit- und Folgeerkrankungen.",
    "therapieHinweise": [
      "Kombi-Nord: achtwöchiges stationäres Modul, anschließend ambulant ohne erneute Beantragung.",
      "Auffangtherapien 8–10 Wochen nach Rückfall; Kurzzeit 6–10 Wochen mit Anbindung an Suchtberatungsstelle.",
      "Mitnahme von Begleittieren möglich; Traumatherapie öffentlich genannt."
    ],
    "factsExtra": [
      "Christlich motivierte Einrichtung.",
      "GSB-Qualitätssiegel REHA laut Trägerseite."
    ]
  },
  "ck-oldenburger-land": {
    "kontraindikationen": [
      "Akute oder schwerwiegende chronische Psychosen; akute Suizidalität.",
      "Akute schwere körperliche Erkrankungen; schwere antisoziale Persönlichkeitsstörungen.",
      "Wenn Art oder Ausmaß einer Behinderung die Teilnahme an wesentlichen Therapien ausschließt."
    ],
    "alltag": [
      "Unterbringung in Einzelzimmern mit Nasszelle; drei rollstuhlgerechte Zimmer, Fahrstuhl und schwellenfreie Türen.",
      "Aufnahme in der Regel dienstags und donnerstags.",
      "Freizeit u. a. Cafeteria, Billard, Bücherei, Fernsehraum, Tischtennis, Fitnessgeräte, PC-Labor, Fahrradausleihe.",
      "Besuch bitte beim Therapeuten oder Pflegestützpunkt anmelden; Besuch auf dem Zimmer nach Absprache."
    ],
    "sozialdienstLeistungen": [
      "Anmeldung in der Regel über Suchtberatungsstelle oder Sozialdienst (Krankenhaus, Wohnheim, Betrieb).",
      "Angehörigengespräche und Mitarbeiterseminare etwa alle acht Wochen.",
      "Planung nachstationärer Hilfe (Suchtberatung, Übergangswohnen) mit Ihrer Zustimmung."
    ],
    "therapieHinweise": [
      "Spezielle Einrichtung für Erwachsene mit Abhängigkeitserkrankung und intellektueller Beeinträchtigung; Heilerziehungspflege im Konzept.",
      "Gruppen- und Einzelpsychotherapie, indikative Gruppen (Freizeit, Familie, Partnerschaft).",
      "Arbeitstherapie in Gärtnerei/Landwirtschaft, Holz/Metall/Haustechnik, Hauswirtschaft oder Cafeteria.",
      "BORA mit arbeitsbezogener Diagnostik; NADA-Akupunktur u. a. bei leichter Entzugssymptomatik oder Tabakentwöhnung."
    ],
    "factsExtra": [
      "Teilnahme am regionalen Verbund Kombi-Nord.",
      "Aufnahme bis 180 kg (stabile Lattenroste); Begleitpersonen nicht möglich.",
      "Bio-Gemüse aus eigenen Feldern und Gewächshäusern in der Küche."
    ],
    "mitbehandlungHinweis": "Leichte Entzugserscheinungen können im Einzelfall im Haus behandelt werden. Weitere psychiatrische Erkrankungen (z. B. Persönlichkeitsstörungen, affektive Störungen) laut Rehakonzept mitbehandelbar."
  },
  "ck-ostberge": {
    "factsExtra": [
      "Stationäre Entwöhnungsbehandlung, Dortmund-Aplerbeck.",
      "Prospekt: Entzugs- und Aufnahmetermin sollen aufeinander abgestimmt sein.",
      "Keine ausführliche öffentliche Unterlagenliste auf der Startseite."
    ],
    "kontraindikationen": [
      "Nicht aufgenommen werden Personen mit akut stationär behandlungsbedürftiger allgemeinmedizinischer, internistischer oder neurologischer Erkrankung.",
      "Keine Aufnahme bei akuter Suizidalität, florider psychotischer Symptomatik oder akuter hirnorganischer Beeinträchtigung.",
      "Sprachkenntnisse, um aktiv an der Psychotherapie teilzunehmen, sind Voraussetzung.",
      "Mindestalter 16 Jahre; Schwerpunkt Abhängigkeit von illegalen Drogen."
    ],
    "alltag": [
      "In den ersten drei Therapiewochen keine Besuche.",
      "Telefonate vom ersten Tag mit dem eigenen Handy.",
      "Wäsche kostenfrei im Waschsalon; Bettwäsche und Handtücher wöchentlich gestellt.",
      "Einkaufsdienst dreimal pro Woche, sonntags frische Brötchen.",
      "Bargeld von Besuch gegen Quittung auf das Taschengeldkonto; Auszahlungen im Verwaltungsbüro.",
      "Besuchsanmeldung bei Ankunft; Geschenke vorzeigen. Personen mit erkennbarer Intoxikation dürfen Haus und Gelände nicht betreten."
    ],
    "sozialdienstLeistungen": [
      "Bezugstherapeutin bzw. Bezugstherapeut unterstützt bei sozialen und lebenspraktischen Fragen, u. a. Antrag auf Arbeitslosengeld.",
      "Begleitung zu Gerichtsterminen in der Nähe möglich.",
      "Planung von Nachsorge, Adaption sowie schulischer und beruflicher Bildung; bei Bedarf Begleitung zu Terminen."
    ],
    "therapieHinweise": [
      "Kognitive Verhaltenstherapie und systemische Therapie; Kleingruppen mit festem Bezugstherapeuten.",
      "Arbeitstherapie mit MELBA-Diagnostik; Schwerpunkt Rückkehr in die Arbeitswelt.",
      "Aufnahme von Paaren, die bereits länger zusammenwohnen.",
      "Strafrückstellung nach §§ 35/36 BtMG möglich.",
      "Erstbehandlung öffentlich 22 Wochen; Rückfallbehandlung 12 Wochen; verkürzt 17 bzw. 8 Wochen bei Wiederaufnahme oder Rückverlegung aus der Adaption.",
      "Abholung aus der Entzugsbehandlung in der Regel durch das Team."
    ],
    "mitbehandlungHinweis": "Komorbide psychische Störungen (Doppeldiagnose, inkl. psychotischer Symptomatik) werden in ein spezielles Behandlungsprogramm integriert; ärztliche Leitung Psychiatrie/Psychotherapie ab dem Aufnahmetag."
  },
  "ck-osterbach": {
    "kontraindikationen": [
      "Akute Selbst- und Fremdgefährdung",
      "Das Krankheitsbild bestimmende Suchterkrankung",
      "Floride Psychose"
    ],
    "alltag": [
      "Alle Zimmer Einzelzimmer mit Bad, Fernseher und Telefon; teilweise barrierefrei",
      "Psychosomatik: Wochenende therapiefrei; Neurologie und Tinnitus: Samstagvormittag Therapie",
      "WLAN hausweit kostenfrei; Schwimmbad abends und am Wochenende nach ärztlicher Freigabe",
      "Gemeinsame Mahlzeiten dreimal täglich im Speisesaal; frische Küche mit Vollkost, Reduktionskost, leichter Vollkost und vegetarischer Kost.",
      "Individuelle Ernährungsform möglichst frühzeitig mitteilen.",
      "Kleiner Kiosk für Getränke, Snacks, Postkarten und Zeitschriften."
    ],
    "therapieHinweise": [
      "Integratives Angebot mit psychodynamischem oder verhaltenstherapeutischem Schwerpunkt",
      "Eigene Psychotraumatologie",
      "Neurologische Psychosomatik, u. a. nach Schlaganfall oder MS sowie bei nicht-organischem Schwindel",
      "Fachabteilungen Neurologie, Psychotherapeutische Medizin/Psychotraumatologie und Tinnitusbehandlung"
    ],
    "factsExtra": [
      "Haustiere nicht mitbringen; Klinik verweist auf eine Tierpension in der Nähe"
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung ist Teil des interdisziplinären Therapieangebots."
    ]
  },
  "ck-osterholz": {
    "alltag": [
      "Stationär: Einzelzimmer mit eigenem Bad im dreiteiligen Neubau.",
      "Tagesklinik CHANGE! Bremen im Dachgeschoss des Altbaus (20 ganztägig ambulante Plätze).",
      "Parkgelände unter Denkmalschutz mit Sportstätten; Bushaltestelle unmittelbar vor dem Eingang.",
      "Gesamtes Gelände und alle Gebäude barrierefrei.",
      "Bushaltestelle direkt vor dem Eingang.",
      "Persönliche telefonische Vorbereitung durch die Aufnahmekoordination."
    ],
    "sozialdienstLeistungen": [
      "Berufswegeplanung über Arbeitstherapie und diagnostisches Inventar",
      "Externe berufliche Praktika; Weitervermittlung in die trägereigene Externe Adaption Am Wall"
    ],
    "therapieHinweise": [
      "Suchtmittelübergreifend in Bedarfsgruppen nach neuropsychotherapeutischem Konzept (vier seelische Grundbedürfnisse nach Grawe).",
      "Ergo- und Kunsttherapie, Sport- und Bewegungstherapie, Physiotherapie, Arbeitstherapie.",
      "Indikativgruppen u. a. Training emotionaler Kompetenzen, Tabakentwöhnung, Ohrakupunktur nach NADA, Stressbewältigung.",
      "Paarbehandlungen; besonders geschützter Bereich für Frauen; traumatherapeutische Behandlung möglich.",
      "Substitution nach fachärztlichem Vorgespräch.",
      "Suchtmittelübergreifende Behandlung in Bedarfsgruppen nach neuropsychotherapeutischem Konzept (vier seelische Grundbedürfnisse nach Grawe)."
    ],
    "factsExtra": [
      "80 stationäre und 20 ganztägig ambulante Plätze, Frauen und Männer ab 18 Jahren.",
      "Federführend DRV Oldenburg-Bremen; Anerkennung durch alle DRVen, auch Krankenkasse möglich.",
      "Zertifiziert nach deQus (BAR-anerkannt).",
      "Persönliche telefonische Vorbereitung durch die Aufnahmekoordination.",
      "Tagesklinik CHANGE! Bremen im Dachgeschoss des Altbaus: ganztägig ambulant bei stabilem Umfeld zu Hause.",
      "CHANGE!: körperliche Entgiftung und hohe Verbindlichkeit erwartet; Vorlaufgruppe bis zum Aufnahmetermin möglich."
    ],
    "mitbehandlungHinweis": "Gesamtes Gelände und alle Gebäude barrierefrei. Medizinische Rehabilitation auch bei gerichtlicher oder sonstiger Therapieauflage."
  },
  "ck-park-klinik-driburg": {
    "therapieHinweise": [
      "Psychodynamische Psychotherapie, kognitive Verhaltenstherapie, Schematherapie und Traumatherapie.",
      "Eigene Abteilung für posttraumatische Belastungsstörungen; Post-Corona-Konzept.",
      "Einzel- und Gruppenpsychotherapie, Psychoedukation, soziales Kompetenztraining, Qi Gong.",
      "Kunsttherapie, Gartentherapie, therapeutisches Boxen, Aquafitness und Nordic Walking."
    ],
    "mitbehandlungHinweis": "Komplexe und chronifizierte Krankheitsbilder mit körperlichen und psychischen Anteilen, u. a. Kopf- und Rückenschmerzen sowie Long-Covid/Post-Corona.",
    "alltag": [
      "Regelhaft Einzelzimmer mit eigenem Bad, oft Balkon; 216 Betten in Einzel- und Doppelzimmern.",
      "Kostenfreies WLAN; Telefon und Fernseher kostenpflichtig an der Rezeption; Notrufsystem; Waschmaschine/Trockner; Bademantel leihweise.",
      "Speisesaal: mittags Tischservice, morgens und abends Buffet; Park Café mit eigener Konditorei; vegane Kost regelhaft nicht angeboten."
    ],
    "sozialdienstLeistungen": [
      "Sozialdienst zu Wiedereinstieg, Entgeltfortzahlung und Umschulung; Termin im Therapieplan.",
      "Ernährungsberatung, Lehrküche, Gesundheitsvorträge; Spezialkonzept Reha für pflegende Angehörige."
    ],
    "factsExtra": [
      "Keine eigenen Behältnisse und kein Mitnehmen von Speisesaal-Geschirr aus Hygienegründen.",
      "Allergien und diätetische Einschränkungen vor Anreise an die Ernährungsabteilung melden."
    ],
    "wahlleistungenHinweis": "Zimmert elefon und Fernsehgerät gegen Gebühr. Begleitpersonen in der psychosomatischen Reha nur bedingt und nach Absprache mit dem Arzt."
  },
  "ck-park-lippspringe": {
    "alltag": [
      "Mütter mit Begleitkindern (0–10 Jahre): gemeinsame Anreise, Kita-Betreuung, Unterricht für Schulkinder",
      "Angst- und Trauergruppen zum Umgang mit Folgestörungen einer COVID-Erkrankung oder dem Tod Angehöriger",
      "Psychosomatik und Entwöhnung unter einem Dach im denkmalgeschützten Stiftsgebäude (Umbau 2020) mit Park.",
      "Entwöhnung laut Klinikseite überwiegend in Einzelzimmern (70 Betten).",
      "Kostenfreies WLAN im gesamten Haus; Bücherecke mit Lektüre und Gesellschaftsspielen.",
      "Bezahlung in den Kliniken ausschließlich bargeldlos."
    ],
    "therapieHinweise": [
      "Voll- und teilstationäre psychosomatische Reha",
      "MBOR mit berufsorientierter Diagnostik und Schematherapie",
      "PSY-RENA-Nachsorge der DRV (Aufnahmegespräch, Gruppen, Abschlussgespräch)",
      "Neuropsychologische Therapie mit computergestützten Trainingsprogrammen",
      "EMDR, achtsamkeitsbasierte Therapie, Foto-, Kunst- und Ergotherapie sowie Körpertherapie.",
      "Berufsbezogene Gruppen AVEM und ZaZo; Arbeitstherapie in Garten, Küche/Hauswirtschaft und EDV."
    ],
    "factsExtra": [
      "Reha-Fähigkeit: eigenständige und aktive Teilnahme an den Therapien, ausreichende physische und psychische Belastbarkeit",
      "Chefärztin Dr. SI Becker (Psychiatrie und Psychotherapie; DBT, katathym-imaginative und tiergestützte Therapie).",
      "Versorgungsvertrag nach § 111 SGB V; rollstuhlgebundene psychosomatische Behandlung genannt."
    ],
    "mitbehandlungHinweis": "Ausgewiesen u. a. Abhängigkeitserkrankungen (F1), nichtstoffgebundene Impulse (F63), postakute Schizophrenie sowie HIV-positive Patientinnen und Patienten mit psychischen Erkrankungen.",
    "kontraindikationen": [
      "Akute Selbstgefährdung, akute Suizidalität, akute Schizophrenie oder akute Manie.",
      "Hirnorganische Beeinträchtigung.",
      "Keine Aufnahme von Kindern und Jugendlichen unter 18 Jahren als Rehabilitandinnen und Rehabilitanden."
    ],
    "sozialdienstLeistungen": [
      "Einzel- und Gruppenberatung zu sozialrechtlichen Fragen, LTA, Qualifizierung, Eingliederung, Übergangsgeld und Rente.",
      "Soziale Diagnostik zu Schulden, Bewerbungen, Vereinsamung, Familie und stufenweiser Wiedereingliederung."
    ],
    "wahlleistungenHinweis": "Begleitperson nach Verfügbarkeit über die Patientenverwaltung; alternativ Hotels und Pensionen in Bad Lippspringe."
  },
  "ck-park-schwalbach": {
    "alltag": [
      "Einzelzimmer mit Bad und Balkon, Notfallsystem, Telefon und Flachbildfernseher.",
      "WLAN kostenpflichtig.",
      "Frühstück und Abendessen als Büffet, mittags zwei Gerichte davon eines vegetarisch; Allergien und Unverträglichkeiten nach Absprache.",
      "Schwimmbad, Café, Kiosk, Wasserspender; Freizeit u. a. Tischtennis, Dart, Qi Gong.",
      "Begleitpersonen und zu pflegende Angehörige können nicht aufgenommen werden; keine Kinderbetreuung, keine Doppelzimmer.",
      "Beurlaubungen nur in dringenden Fällen mit Zustimmung der medizinischen Klinikleitung."
    ],
    "sozialdienstLeistungen": [
      "Einzelberatung zur beruflichen und privaten Reintegration",
      "Übergangs- und Krankengeld",
      "Ärztliche sozialmedizinische Beratung",
      "Reha-Fachberatung; Kooperation mit dem Berufsförderungswerk Frankfurt/Bad Vilbel (orthopädisches Assessment)"
    ],
    "therapieHinweise": [
      "Integratives psychosomatisches Konzept mit Bezugstherapeutensystem.",
      "Verhaltenstherapeutisch, tiefenpsychologisch fundiert und systemisch; gruppentherapeutischer Schwerpunkt.",
      "Nonverbale Verfahren: gestalterische Ergotherapie, Körperwahrnehmung, Sport- und Bewegungstherapie, progressive Muskelrelaxation.",
      "Schwerpunkt chronische Schmerzstörungen und dissoziative Bewegungsstörungen in enger Zusammenarbeit mit der Orthopädie."
    ],
    "factsExtra": [
      "DRV-Hessen-Klinik; Stellenausschreibung 2026 nennt 182 Betten, davon 92 Psychosomatik und 90 Orthopädie.",
      "Stationäre Reha und AHB.",
      "Psychometrische Testverfahren in der Psychosomatik standardmäßig.",
      "43 behindertengerechte Einzelzimmer laut Klinikseite.",
      "Eigenes Schloss zur Diebstahlsicherung mitbringen; Wertfach im Zimmer."
    ],
    "mitbehandlungHinweis": "Orthopädie und Psychosomatik unter einem Dach; Stoffwechselstörungen und Unverträglichkeiten kulinarisch berücksichtigt, Allergiepass mitbringen.",
    "wahlleistungenHinweis": "WLAN kostenpflichtig. Festnetz-Gespräche ins Telekom-Festnetz gebührenfrei; Fernseher gebührenfrei. Waschmaschine und Trockner im Münzbetrieb."
  },
  "ck-park-steben": {
    "kontraindikationen": [
      "Hirnorganische Erkrankung, soweit die Teilnahme an den Therapien nicht möglich ist.",
      "Schwere Persönlichkeitsstörungen ohne Behandlungsmotivation.",
      "Suizidgefährdung; akute Psychose oder Manie.",
      "Primäre Alkohol-, Drogen- oder Medikamentenabhängigkeit.",
      "Dauerhafte Bettlägerigkeit; schwere oder mittelschwere Intelligenzminderung."
    ],
    "alltag": [
      "159 Einzelzimmer, teilweise mit Balkon; 6 Zimmer für Menschen mit Mobilitätseinschränkungen.",
      "Eigenes Bad (Dusche/WC), TV, Telefon, Pflegenotruf.",
      "Therapie- und Bewegungsbad, Turnhalle, Garten, Lehrküche, Bibliothek, Teeküche und Aufenthaltsräume.",
      "Parkplätze begrenzt und kostenpflichtig.",
      "Anreise zwischen 9.30 und 12.30 Uhr; Zimmerschlüssel am Empfang.",
      "Gemeinschaftliche Teeküche und Aufenthaltsräume im Erdgeschoss; Sonnenterrasse, Liegewiesen, Tischtennis und Tischkicker."
    ],
    "sozialdienstLeistungen": [
      "Beratung bei finanzieller Belastung und Kontakt zu Behörden",
      "Hilfe bei Anträgen, Übergangsgeld und Zuzahlungsbefreiung",
      "Stufenweise Wiedereingliederung und berufliche Rehabilitation",
      "Bewerbungsunterlagen und arbeitsplatzbezogene Fragen",
      "Vermittlung IRENA, Beratungsstellen, Selbsthilfe, Tageskliniken"
    ],
    "therapieHinweise": [
      "Multiprofessionelles Team aus tiefenpsychologischer, verhaltenstherapeutischer, systemischer, humanistischer und hypnotherapeutischer Ausrichtung.",
      "MBOR bei besonderen beruflichen Problemlagen.",
      "IRENA-Nachsorge der DRV Bund für psychische und psychosomatische Störungen, nicht für stoffgebundene Abhängigkeitserkrankungen."
    ],
    "factsExtra": [
      "Klinikseite: 159 Betten, rund 1200 Patientinnen und Patienten im Jahr, Aufenthalt im Schnitt fünf Wochen.",
      "Hol- und Bringservice nach Prüfung des Kostenträgers.",
      "Post-Covid-Nachsorgeprogramm ausgewiesen."
    ],
    "mitbehandlungHinweis": "Somatische Fachärzte im Team; körperliche Begleiterkrankungen im ganzheitlichen Ansatz. Reha- und Akutbereich getrennt (Akutstation 34 Betten).",
    "wahlleistungenHinweis": "Parkplätze begrenzt und kostenpflichtig. Verleih von Nordic-Walking-Stöcken, Bademänteln und Badehandtüchern. Wäscheautomat, Trockner und Bügeleisen nutzbar."
  },
  "ck-parkland": {
    "kontraindikationen": [
      "Akute psychiatrische Krankheitsbilder.",
      "Suchterkrankungen, die zuerst eine stationäre Entwöhnungstherapie erfordern.",
      "Hirnorganische Erkrankungen mit starken Einschränkungen.",
      "Akute Suizidalität.",
      "Im Essstörungsbereich Reha ist ein Mindest-BMI von 16 ausgewiesen.",
      "Mobilität im Klinikgebäude und selbstständige Körperpflege sind Aufnahmevoraussetzung der Reha."
    ],
    "alltag": [
      "Laut Qualitätsbericht 195 Ein-Bett-Zimmer mit eigener Nasszelle.",
      "Unterbringung einer Begleitperson grundsätzlich möglich.",
      "Anreise laut Klinik zwischen 8.30 und 10.30 Uhr."
    ],
    "sozialdienstLeistungen": [
      "Klinische Sozialarbeit und Rehaberatung kostenfrei (Reha-Beratung, Sozialpädagogik, Sozialarbeit)",
      "Häusliche Wiedereingliederung, Tages-, Kurzzeit- und Dauerpflege",
      "Pflegeversicherung und finanzielle Hilfen, Schwerbehindertenrecht",
      "Stufenweise Wiedereingliederung, Teilhabe, innerbetriebliche Umsetzung, Fortbildung und Umschulung",
      "Lohnersatzleistungen und Renten"
    ],
    "therapieHinweise": [
      "Reha und Akut unter einem Dach; DeGPT-Psychotraumatherapie am Standort.",
      "Indikationen laut Klinikbroschüre u. a. neurotische und affektive Störungen, dissoziative und somatoforme Störungen, Persönlichkeitsstörungen, ADHS/ADS bei Erwachsenen."
    ],
    "factsExtra": [
      "Angehörigenbetreuung, Kunsttherapie, Biofeedback und Belastungserprobung ausgewiesen.",
      "PLUS+ Service u. a. Cafeteria-Gutschein, Minibar, Sky/DAZN in Premium-Zimmern."
    ],
    "wahlleistungenHinweis": "PLUS+ Komfortzimmer und wahlärztliche Chefarztbehandlung; Konditionen mit PKV/Zusatzversicherung abstimmen. Ansprechpartner Wahlleistungen: Sven Döhring, 05621 706-629.",
    "mitbehandlungHinweis": "Körperliche Erkrankungen mit seelischen Folgen laut Klinikbroschüre mitbehandelbar, u. a. CED, Herz, Diabetes, Tinnitus, Hypertonie, Asthma, Onkologie, Hauterkrankungen. Betten und Untersuchungseinrichtungen für besonderes Übergewicht ausgewiesen."
  },
  "ck-paul-ehrlich": {
    "kontraindikationen": [
      "Psychosen.",
      "Suchterkrankungen.",
      "Bedarf einer akutmedizinischen Versorgung."
    ],
    "alltag": [
      "Rauchfreie Klinik.",
      "Kostenfreies WLAN.",
      "Waschmaschinen und Trockner gegen Gebühr; Waschmittel selbst mitbringen.",
      "Ruhezeit ab 21 Uhr, Nachtruhe ab 23 Uhr."
    ],
    "sozialdienstLeistungen": [
      "Sozialmedizinische Betreuung und Sozialberatung.",
      "Gruppen des Sozialdienstes: Training sozialer Kompetenzen und Berufswegeplanung."
    ],
    "therapieHinweise": [
      "Psychotherapeutische Einzel- und Gruppentherapie; PMR, Achtsamkeit, Körperwahrnehmung.",
      "MBOR Stufe B.",
      "Sport- und Bewegungstherapie, Ergotherapie, Lehrküche."
    ],
    "factsExtra": [
      "Seit Februar 2004 DIN EN ISO 9001 und DEGEMED zertifiziert.",
      "Hausführung Dienstag–Freitag 9 Uhr am Morgen nach Anreise.",
      "Alkohol auf dem gesamten Klinikgelände verboten."
    ],
    "wahlleistungenHinweis": "Selbstzahlende und Privatversicherte werden im Qualitätskompass genannt.",
    "mitbehandlungHinweis": "190 Betten, davon 70 Psychosomatik und 120 Orthopädie; internistische Diagnostik im Haus."
  },
  "ck-petersen-rostock": {
    "kontraindikationen": [
      "Akute Selbst- oder Fremdgefährdung; akute psychotische Symptomatik",
      "Fortgeschrittene Hirnleistungsminderung/Demenz; ausgeprägte Intelligenzminderung",
      "Erkrankungen mit hohem Pflegebedarf",
      "Medikamente mit hohem Suchtpotenzial (seltene schmerztherapeutische Ausnahmen)"
    ],
    "alltag": [
      "96 Einzelzimmer mit Nasszelle; Wohnbereiche mit Küche und Aufenthalt",
      "Besuch samstags 12:30–18:30 Uhr, sonn- und feiertags 09:00–18:30 Uhr",
      "Rauchfreies Krankenhaus; Rauchen nur auf ausgewiesenen Außenflächen",
      "Am Aufnahmetag Aufnahme durch Verwaltung und Arzt, Hausführung und Anbindung an die Aufnahmegruppe für die ersten zwei bis drei Wochen.",
      "In den ersten sieben Tagen steht ein erfahrener Mitpatient aus der eigenen Gruppe als Pate zur Seite.",
      "Bei 12-wöchiger Entwöhnung zwei therapeutische Belastungserprobungen möglich (Freitag 16:30 Uhr bis Sonntag 22:00 Uhr, Antrag und Einverständnis der Bezugstherapie)."
    ],
    "sozialdienstLeistungen": [
      "Soziale Diagnostik, Behördenkontakte, Schuldnerberatung, Hinweise zu MPU und Adaption/Nachsorge",
      "Berufliche Wiedereingliederung (BORA); wöchentliche Rehabilitandenseminare"
    ],
    "therapieHinweise": [
      "Stationär und ganztägig ambulant; zusätzlich Festigungstherapie und Kombi-Nord",
      "Indikativgruppen u. a. KVT Depression und Sucht, Resilienz, Frauengruppe, Nikotinentwöhnung",
      "Geschlossene Zwölf-Wochen-Gruppe ohne Verlängerung; Gruppe „Sucht im Alter“ ab 55 Jahren"
    ],
    "factsExtra": [
      "Primär Alkohol und Medikamente; zusätzliche illegale Substanzen nur, wenn Alkohol/Medikamente im Vordergrund stehen und bei Aufnahme Abstinenz von allen Substanzen besteht",
      "Aufnahme ab Volljährigkeit; nach Kostenzusage vergibt die Klinik den Aufnahmetermin.",
      "Ganztägig ambulante Entwöhnung nur nach Vorgespräch mit einer Therapeutin oder einem Therapeuten des Hauses, in Abstimmung mit der Suchtberatungsstelle."
    ],
    "mitbehandlungHinweis": "Als Zweitdiagnose im Konzept: nicht stoffgebundene Abhängigkeit (pathologisches Glücksspiel, Kaufsucht, Internet-/Medienabhängigkeit) sowie psychiatrische Erkrankungen (u. a. Neurosen, Persönlichkeitsstörungen, Depressionen, Ängste)."
  },
  "ck-pfalzburger": {
    "alltag": [
      "Fitnessraum und Sauna; begrünte Außenanlage mit Volleyballfeld.",
      "Küche im Haus, Verpflegung vor Ort zubereitet, auch vegetarisch.",
      "Keine Parkplätze vor Ort.",
      "Hausbesichtigung dienstags 10:30 Uhr, Treffpunkt Blissestraße 2–6, suchtmittelfrei.",
      "Moderne Einzel- oder Doppelzimmer.",
      "Innenstadtlage Wilmersdorf: Alltagserfahrungen und kritische Situationen mit Therapeut:innen im Großstadtsetting."
    ],
    "therapieHinweise": [
      "Kurzzeittherapie seit 2024: in der Regel 10 Wochen (Alkohol) bzw. 15 Wochen (andere Substanzen).",
      "Selbsthilfegruppen im Haus; Aufnahme-Team Blissestraße, telefonische Sprechzeiten Mo–Fr 9–12 Uhr.",
      "Stationäre Rehabilitation für 56 Erwachsene; Paaraufnahme möglich.",
      "Ganztägig ambulante Entlastung bei Bedarf.",
      "Sport inkl. therapeutischem Boxen und Ausdauer; Ergotherapie, Kunstworkshops, Theatergruppe, Musiktherapie."
    ],
    "sozialdienstLeistungen": [
      "Vorbereitung von Nachsorge, Weiterbehandlung und Arbeitsperspektive."
    ],
    "factsExtra": [
      "DIN EN ISO 9001 (DQS) seit 2006; QReha plus.",
      "Anerkennung durch Deutsche Rentenversicherungen."
    ]
  },
  "ck-pirna-adaption": {
    "factsExtra": [
      "Adaption nach der Entwöhnung im Verbund Fachklinik Heidehof, anderes Haus.",
      "Antrag auf Nachsorgeleistungen vor Ende der Entwöhnung, Vorgespräch.",
      "Aufnahme nach Kostenübernahmebescheid und regulär beendeter Entwöhnung.",
      "Standort Geibeltstraße 3, 01796 Pirna; zertifiziert nach dem Diakonie-Siegel Medizinische Rehabilitation."
    ],
    "alltag": [
      "Schwerpunkt: selbstständige Organisation des suchtmittelfreien Alltags und der eigenen Wohnung.",
      "Gruppen- und Freizeitaktivitäten sind Teil des Programms."
    ],
    "sozialdienstLeistungen": [
      "Kooperation mit vorbehandelnden Entwöhnungseinrichtungen, Suchtberatung, Wohnprojekten sowie Berufsbildungseinrichtungen (BFW, BTZ, BBW).",
      "Berufliche und soziale Integration als Behandlungsziel; individuelle Ziele werden gemeinsam festgelegt."
    ],
    "therapieHinweise": [
      "Bausteine u. a. externes Praktikum, Training der Selbstversorgung, sozialmedizinische Versorgung, Einzelgespräche und Gruppentherapie.",
      "Behandlungsdauer je nach Kostenzusage drei bis vier Monate.",
      "Indikation u. a. illegale Drogen, Alkohol, Medikamente, Spielsucht sowie Sucht mit seelischen Erkrankungen nach medikamentöser Einstellung."
    ],
    "mitbehandlungHinweis": "Sucht in Verbindung mit Persönlichkeitsstörungen, Ängsten oder Psychosen nach medikamentöser Einstellung ist im Konzept der Adaption genannt."
  },
  "ck-prop-laim": {
    "alltag": [
      "Fünf Wohngemeinschaften mit Einzel- und Doppelzimmern, Bad/Toilette und Küche; WLAN in der gesamten Einrichtung.",
      "Behandlungsalltag auf Selbstversorgung ausgelegt; weitgehend selbstorganisierter Alltag.",
      "Lange Ausgangszeiten zur gestuften, individuellen Erprobung.",
      "Unterstützte Freizeitangebote unter der Woche und am Wochenende; Anbindung an einen Sportverein möglich.",
      "15 Plätze in fünf Wohngemeinschaften mit Bad und Küche; weitgehend selbstorganisierter Alltag in München-Laim.",
      "Paare möglich."
    ],
    "sozialdienstLeistungen": [
      "Bezugssozialdienst bei sozialrechtlichen Fragen sowie Behördengängen.",
      "Unterstützung bei Wohnungssuche und Bewerbung um Wohnraum.",
      "Kontingenzplätze in eigenen therapeutischen Wohngemeinschaften; Vermittlung zu weiteren TWG-Anbietern.",
      "Erarbeitung von Nachsorge (Selbsthilfe, ambulante Nachsorge, TWG, betreutes Einzelwohnen).",
      "Bezugssozialdienst für sozialrechtliche Fragen.",
      "Erarbeitung von Nachsorge (Selbsthilfe, ambulante Nachsorge, TWG, BEW)."
    ],
    "therapieHinweise": [
      "Wöchentliche therapeutische Einzel- und Gruppentherapien sowie wöchentliche Organisationsgruppen.",
      "Medizinische Aufnahme, Begleitung und Beratung durch ärztliche Psychotherapie.",
      "Arbeitserprobung im Rahmen eines oder mehrerer Praktika; Arbeitsberatung.",
      "Ernährungsberatung und Lehrküche; Sporttherapie mit Fokus auf Freizeit und körperliche Gesundheit.",
      "Interdisziplinäres Team aus Fachärzten, Psychotherapie und Sozialtherapie; Behandlungsplan wird regelmäßig ausgewertet und angepasst."
    ],
    "factsExtra": [
      "Adaption für suchtmittelabhängige Erwachsene; Aufnahme von Paaren möglich.",
      "Anerkennung nach §§ 35 und 36 BtMG.",
      "Zentrale Stadtlage Valpichlerstraße 100 in München-Laim; Einrichtung wochentags ab 08:00 Uhr besetzt.",
      "Hauptbeleger DRV Bayern Süd; deQus-zertifiziert.",
      "Zentrale Stadtlage Valpichlerstraße 100.",
      "Prop-Infotelefon 0800 0007767."
    ]
  },
  "ck-prowo": {
    "sozialdienstLeistungen": [
      "Antragsweg über Drogenberatungsstelle, Bewährungshilfe oder Sozialdienste von Entzugsklinik bzw. JVA."
    ],
    "factsExtra": [
      "Fachklinik zur Behandlung drogenabhängiger Männer und Frauen inkl. Adaption.",
      "Substitution vor Antritt abgeschlossen; Entzugsbescheinigung entfällt bei Direktaufnahme aus der JVA.",
      "Versorgungsvertrag SGB V/IX, federführend DRV Rheinland laut Trägerseite.",
      "Anerkennung nach § 35 BtMG; Mitglied Bioland und Zertifikat nach EG-Bio-Verordnung für ökologisch erzeugte Lebensmittel.",
      "16 Behandlungsplätze in der Entwöhnung Kerpen laut Trägerseite."
    ],
    "kontraindikationen": [
      "Schwere organische oder endogene psychopathologische Syndrome; akute Suizidgefährdung; akute Psychosen.",
      "Ausgeprägte hirnorganische Störungen (z. B. Korsakow-Syndrom); erhöhter pflegerischer Betreuungsbedarf."
    ],
    "alltag": [
      "Einbettzimmer in saniertem Fachwerkhof mit neueren Wohneinheiten.",
      "Tagesbeginn mit Frühstück um 7:30 Uhr; therapeutisches Programm ab 9 Uhr; Mittag 13 Uhr, Abendessen 19 Uhr.",
      "Ausgang wochentags bis 22 Uhr, am Wochenende 8–23 Uhr; Nachtruhe ab 22 Uhr, Bettruhe ab 24 Uhr.",
      "Heimfahrten nach vierwöchiger Eingewöhnung möglich."
    ],
    "therapieHinweise": [
      "Medizinische Grund- und psychiatrische Versorgung, Einzel- und Gruppentherapie, Arbeitstherapie in der Holzwerkstatt, Sport.",
      "Reguläre Behandlungsdauer der Entwöhnung laut Trägerseite ein halbes Jahr.",
      "Negatives Drogenscreening Voraussetzung; Substitution oder Abdosierung im Haus nicht möglich."
    ],
    "mitbehandlungHinweis": "HIV, Hepatitis A–D, medikamentös behandelte Tuberkulose, stabiler Diabetes und Epilepsie werden grundsätzlich mitbehandelt; antivirale Therapien sind möglich. Psychose nach Absprache, nicht bei akuter Dekompensation."
  },
  "ck-prowo-koeln": {
    "kontraindikationen": [
      "Keine Aufnahme bei alleiniger Medikamentenabhängigkeit.",
      "Keine Aufnahme bei schweren organischen oder endogenen psychopathologischen Syndromen, akuter Suizidgefährdung oder ständiger pflegerischer Betreuungsbedürftigkeit."
    ],
    "therapieHinweise": [
      "Durchschnittlich 17-wöchige Adaption mit Fokus auf berufliche Orientierung, Freizeitgestaltung, soziale Reintegration, Wohnsituation und Gesundheit.",
      "Eigenverantwortlicher Ansatz: Sie formulieren den Hilfebedarf, das Team hält hohe Kontaktdichte.",
      "Eigenständiges Adaptionskonzept mit Facharzt, Suchttherapie, Psychologie, Ernährungsberatung.",
      "Mindestens vierwöchiges Praktikum, Freizeitengagement und Kontaktaufbau außerhalb der Einrichtung.",
      "Stationär und ganztägig ambulant; Frauen, Männer und Paare.",
      "Rufbereitschaft außerhalb der regulären Arbeitszeiten."
    ],
    "factsExtra": [
      "PROWO 2 (Adaption) in Köln-Mülheim, Düsseldorfer Str. 219; federführend DRV Rheinland.",
      "Versorgungsvertrag nach § 111 SGB V; BAR-zertifiziert.",
      "Unabhängige Einrichtung mit eigener Infrastruktur und eigenem Personal, nicht identisch mit der Fachklinik Kerpen.",
      "Während laufender Entwöhnung telefonische Anfrage möglich; schriftliche Unterlagen laut Aufnahmeseite nicht erforderlich."
    ],
    "alltag": [
      "12 Behandlungsplätze im Neubau (seit Ende 2020), Einzelzimmer mit eigenem Bad, Gemeinschaftsräume.",
      "Innenstadt mit ÖPNV in etwa 20 Minuten erreichbar."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei Schulden, alltäglichen Mehrfachaufgaben und beruflicher Wiedereingliederung.",
      "Sozialarbeiterin mit psychotherapeutischer Zusatzqualifikation und Fachkraft für berufliche Wiedereingliederung im Team."
    ],
    "mitbehandlungHinweis": "Viele Rehabilitand:innen mit körperlicher und psychischer Komorbidität; medizinische Diagnostik und Beratung im Haus."
  },
  "ck-pskbgl": {
    "factsExtra": [
      "Psychosomatische Klinik mit Anerkennung zur stationären Entwöhnungsbehandlung.",
      "Standort Klinikum Oberberg, nicht die Schlosspark-Klinik Paffrather Straße.",
      "Keine öffentliche Aufnahme-Checkliste auf der Standortseite gefunden."
    ],
    "kontraindikationen": [
      "Akute Psychosen; ausgeprägte irreversible organische Psychosyndrome; deutliche Intelligenzminderung.",
      "Akute Suizidalität; ausgeprägte somatische Erkrankungen oder Pflegebedürftigkeit jenseits der Klinikmöglichkeiten.",
      "Keine zeitgleiche Behandlung beider Partner einer aktuellen Paarbeziehung.",
      "Mindestalter 18 Jahre; intoxikierte Personen werden nicht aufgenommen."
    ],
    "alltag": [
      "A-Abteilung: überwiegend Zweibettzimmer (20–24 m²) mit Nasszelle; wenige Einzelzimmer nach medizinischer Indikation; zwei rollstuhlgerechte Zimmer.",
      "Pate am Aufnahmetag (Mitrehabilitand, möglichst Zimmerkollege); ab dem zweiten Behandlungstag volles Programm.",
      "Atemalkoholkontrolle bei Aufnahme; Ausgangssperre zu Beginn, Zweierausgang nach 2, Einzelausgang nach 4 Wochen.",
      "Frühstück und Abendessen selbst zubereitet; Rauchen nur außerhalb des Gebäudes auf überdachter Terrasse.",
      "Holzwerkstatt, Kunst- und Kreativtherapie, Bewegungstherapie, Mehrzweckhalle, Beachvolleyball und Boule."
    ],
    "sozialdienstLeistungen": [
      "Sozialdienst organisiert den Aufnahmetag und klärt Bezüge; Hilfe bei beruflicher Reha und Schuldenregulierung.",
      "Paar- und Familiengespräche; Angehörige können in der Institutsambulanz betreut werden.",
      "Ganztägig ambulante Plätze am Standort; Adaptive Phase auf dem Klinikgelände."
    ],
    "therapieHinweise": [
      "Regelbehandlungsdauer bis zu 16 Wochen (bei Cannabis, Kokain oder Amphetaminen bis zu 20 Wochen).",
      "Halboffene Gruppen (Basis- und Stammgruppen); Gruppenpsychotherapie mehrmals wöchentlich plus Einzelpsychotherapie.",
      "Indikativ u. a. geschlechtsspezifische Gruppen, Raucherentwöhnung, Haushaltstraining, Bewerbungstraining.",
      "Substitution im Einzelfall möglich; Entzüge bei Alkohol bzw. Medikamenten derzeit nicht im Haus.",
      "Bei kürzlichem Konsum Nachweis einer unmittelbar zuvor abgeschlossenen Entzugsbehandlung."
    ]
  },
  "ck-pzn-landhaus": {
    "alltag": [
      "Während der Reha Verzicht auf Alkohol einschließlich alkoholfreien Biers und alkoholhaltiger Lebensmittel; alle Medikamente dem Personal angeben.",
      "22 Plätze; geräumiges Doppelzimmer mit Dusche und WC, barrierefreies Zimmer vorhanden.",
      "Gemeinschaftsräume: Aufenthalt, Speiseraum, Fernsehraum, Teeküche; Minigolf, Kegelbahn, Park und Balkone.",
      "Nach vollstationärer Phase tagesklinische Weiterbehandlung möglich."
    ],
    "factsExtra": [
      "Entzugsbehandlung kann zuvor auf Krankenhausstationen des PZN erfolgen; Antragstellung für die Reha dort möglich.",
      "Wohnortnahe Langzeitentwöhnung als Station 49 der Klinik für Suchttherapie und Entwöhnung.",
      "Zugang auch über Suchtberatungsstelle, nicht nur intern nach Qualifiziertem Entzug."
    ],
    "kontraindikationen": [
      "Abhängigkeit von illegalen Drogen und Cannabis.",
      "Starke hirnorganische Beeinträchtigungen."
    ],
    "sozialdienstLeistungen": [
      "Feste Ansprechperson des Sozialdienstes: Wohnungs- und Arbeitssuche, Schuldenregulierung, soziale Kompetenz.",
      "Nachsorge: Beratungsstelle, Selbsthilfegruppe, Vermittlung in Adaption oder Betreutes Wohnen."
    ],
    "therapieHinweise": [
      "Einzel-, Gruppen-, Familien- und Partnergespräche; Angehörigentreffen.",
      "Gestaltungs-, Ergo-, Sport-/Bewegungs-, Entspannungs- und Arbeitstherapie; Koch- und Backgruppe.",
      "Therapeutisch begleitete Arbeitserprobung und ggf. Praktika."
    ],
    "wahlleistungenHinweis": "Klinik für Suchttherapie bietet Wahlleistungen und Komfortbereich für besondere Standards; gesondert ansprechen.",
    "mitbehandlungHinweis": "Spezialisiert auf Mitbehandlung zusätzlich bestehender psychischer Störungen, z. B. Depression und Persönlichkeitsstörungen, sowie besonderer sozialer Schwierigkeiten."
  },
  "ck-ratingen": {
    "alltag": [
      "Eingangsphase 2–4 Wochen: Ausgänge in Begleitung eines Mitrehabilitanden, Einzelausgang nur ausnahmsweise.",
      "Besuche am Wochenende sowie nach Rücksprache außerhalb des Tagesprogramms.",
      "Hauptphase: Ausgänge allein möglich, Heimfahrten zur Alltagserprobung.",
      "Sport und Freizeit (u. a. Fußball, Fitness, Schwimmen, Radfahren, Drachenboot) sind fest im Angebot.",
      "Zweibettzimmer mit eigener Nasszelle; Einzelzimmer werden derzeit nicht vorgehalten, bei medizinischer Notwendigkeit Einfachbelegung.",
      "Ein barrierefreies und ein behindertengerechtes Zimmer."
    ],
    "sozialdienstLeistungen": [
      "Berufliche Integration bzw. Reintegration",
      "Schuldnerberatung",
      "Wiederherstellung des Krankenversicherungsschutzes",
      "Beratung zu Miete, Sozialhilfe sowie Straf-, Sozial- und Zivilrecht",
      "Beratung über ambulante Betreuung, Nachsorge und Adaption",
      "Klärung der sozialrechtlichen Situation in der Eingangsphase."
    ],
    "therapieHinweise": [
      "Multimodal: Psycho- und Suchttherapie, Sozialtherapie, Arbeits- und Ergotherapie, Kreativtherapie, Medizin/Pflege.",
      "Indikativgruppen u. a. Soziales Kompetenztraining, Deeskalation, Achtsamkeit, Männer-/Frauen-/Elterngruppe, Spielsucht, Trauma, Psychose, Rückfallprophylaxe.",
      "DRV-anerkannte Schwerpunktklinik für Doppeldiagnosen (u. a. Psychose, Depression, Manie, Persönlichkeits- und Traumafolgestörungen).",
      "Eingangs-, Haupt- (16–18 Wochen) und Ablösungsphase (ca. 6 Wochen); externes Praktikum (5 Tage) mit der Rentenversicherung vereinbart.",
      "Drei Phasen: Eingangsphase, Hauptphase, Ablösungsphase mit Bewerbungstraining und Nachsorgeplanung.",
      "Körperlicher Entzug vor Aufnahme abgeschlossen; negatives Drogenscreening; Intoxikation schließt die Aufnahme aus."
    ],
    "factsExtra": [
      "56 Entwöhnungsplätze, 6 stationäre Adaptionsplätze, 2 ganztägig ambulante Plätze.",
      "Zielgruppe auch Therapieauflage nach § 35 BtMG.",
      "Denkmalgeschützte Villa plus Neubau, etwa zehn Minuten zum Ratinger Zentrum.",
      "Träger Suchthilfe Düsseldorf / Deutscher Orden.",
      "Vorstellungsgespräch auf Wunsch möglich; für die hauseigene Adaption bei externen Bewerbern verpflichtend."
    ],
    "kontraindikationen": [
      "Akute Suizidalität.",
      "Floride Psychosen mit Handlungsrelevanz.",
      "Instabile Epilepsien.",
      "Pflegebedürftigkeit.",
      "Gravierende hirnorganische Schädigung."
    ],
    "mitbehandlungHinweis": "Körperliche Folgeerkrankungen (z. B. Pankreatitis, Hepatitis, Diabetes, PNP, Zahnschäden) werden in Kooperation mit niedergelassenen Fachärzten mitbehandelt."
  },
  "ck-ratzeburg": {
    "therapieHinweise": [
      "Verhaltensmedizinisch-interdisziplinäres Programm (medizinisch, physio-, sozial- und psychotherapeutisch)",
      "Stationäre und ganztägig ambulante Reha; verhaltensmedizinisch orientierte Rehabilitation (VOR)",
      "Psychologische Einzel- und Gruppengespräche, Entspannungsverfahren, individuelles Krankheitskonzept"
    ],
    "factsExtra": [
      "Fachabteilungen u. a. Verhaltensmedizin, Kardiologie und Orthopädie unter einem Dach"
    ],
    "alltag": [
      "Unterbringung ausschließlich in Einzelzimmern; jedes Zimmer mit Fernseher, WLAN kostenlos.",
      "Einige Doppelzimmer für Begleitpersonen nach Voranmeldung.",
      "Waschmaschinen und Trockner gegen geringe Gebühr; Kühlschränke in den Teeküchen jeder Ebene.",
      "Fahrradabstellplatz und kostenlose E-Bike-Ladung an der Rezeption.",
      "Handtücher und Bettwäsche werden gestellt; Duschgel und Fön mitbringen.",
      "Unterlagen können an aufnahme.mbk@drv-nord.de gesendet werden; Klinik ist beihilfefähig."
    ],
    "sozialdienstLeistungen": [
      "MBOR in geschlossenen Gruppen: Testung berufsspezifischer körperlicher Anforderungen an nachgestellten Arbeitsplätzen mit Bewegungs- und Ergotherapie.",
      "Enge Zusammenarbeit von Therapieabteilung und Sozialdienst; psychosoziale Aspekte der beruflichen Rückkehr sind Teil des MBOR-Konzepts."
    ],
    "wahlleistungenHinweis": "Parkplatz nach Verfügbarkeit 60 Euro für den Reha-Aufenthalt; Anmeldung am Anreisetag an der Rezeption.",
    "mitbehandlungHinweis": "Individuelle Ernährungsbedürfnisse und Unverträglichkeiten vorab mit der Diätassistenz (diaetassistentin.mbk@drv-nord.de). Diabetes ist keine Hauptindikation; psychologische Mitbehandlung durch eine Fachpsychologin Diabetes möglich."
  },
  "ck-reha-viersen": {
    "mitbehandlungHinweis": "Orthopädie und Psychosomatik unter einem Dach. Psychologische Beratung auch für orthopädische Rehabilitandinnen und Rehabilitanden (u. a. Stressmanagement, Schmerzbewältigung).",
    "alltag": [
      "Ganztägig ambulant Mo–Fr; Erlerntes abends und am Wochenende im Lebensumfeld erproben.",
      "Eigener Fahrdienst zum Holen und Bringen möglich.",
      "Regeldauer fünf Wochen; je Behandlungstag bis zu sechs Stunden Anwendungen."
    ],
    "sozialdienstLeistungen": [
      "Psy-RENA: 27 Therapieeinheiten in 12 Monaten, 50–90 Minuten, ein- bis zweimal wöchentlich, Einzel und Gruppe; Verordnung nur durch den Reha-Arzt, nicht durch Haus- oder Facharzt.",
      "Klinische Sozialarbeit im Behandlungsspektrum."
    ],
    "therapieHinweise": [
      "Multiprofessionelles Team: FA Psychiatrie/Psychotherapie bzw. psychosomatische Medizin, PP, Sozialarbeit, Ergo, Physio, Sport, Diät, Gesundheitspflege.",
      "Wöchentlich psychotherapeutische Einzelgespräche und regelmäßige ärztliche Visiten.",
      "Bezugspersonen können bei Bedarf und Wunsch einbezogen werden."
    ],
    "factsExtra": [
      "Chefarzt Dr. Matthias Gasche, Facharzt für Psychosomatische Medizin und Psychotherapie.",
      "Verlängerung der ambulanten Reha bis 30 Behandlungstage nach Kostenträgerregel möglich."
    ]
  },
  "ck-rehahaus-gundelfingen": {
    "alltag": [
      "Bis zu 12 Behandlungsplätze in Wohngruppen mit eigenen Funktionsräumen.",
      "Ein- und Zweibettzimmer mit Balkon; jeweils eigene Küche und Aufenthaltsraum laut Rehabilitationskonzept.",
      "Barrierefreie Zugänge nur zu den Funktionsräumen im Erdgeschoss.",
      "Industriegebiet Freiburg-Nord in unmittelbarer Nähe für Praktika, Arbeits- und Ausbildungsplätze.",
      "Externe Adaption, selbstständig organisiert."
    ],
    "factsExtra": [
      "In der Adaptionsphase auch Frauen; Intensivphase im Therapiezentrum Brückle männerspezifisch.",
      "Adresse Gewerbestraße 6, 79194 Gundelfingen; anerkannt nach §§ 35, 36 BtMG.",
      "Männer und Frauen.",
      "Träger AKRM Lörrach e.V."
    ],
    "sozialdienstLeistungen": [
      "Nachbetreuung im betreuten Wohnen, ambulanter Nachbetreuung oder Selbsthilfe."
    ],
    "therapieHinweise": [
      "Adaption in der Regel 12–16 Wochen.",
      "Schwerpunkte Rückfallbewältigung, Belastbarkeit in Beziehungen und Arbeitspraktika.",
      "Auch Abschluss nach Entwöhnung in anderen Häusern möglich; bei günstigen Voraussetzungen als eigenständige Behandlung."
    ]
  },
  "ck-release": {
    "alltag": [
      "Wohnen in Einzelzimmern; Paarzimmer möglich; TV und WLAN",
      "Barrierefreier Wohnbereich im Bettenhaus",
      "Sport u. a. Laufen, Schwimmen, Radfahren, Fußball, Beach-Volleyball, Krafttraining",
      "39 Plätze; Wohnen in Einzelzimmern, Paarzimmer möglich; barrierearmer Wohnbereich im Bettenhaus.",
      "Gemeinsame Mahlzeiten, therapeutisches Programm und Freizeit in einer verbindlichen Hausgemeinschaft.",
      "Freizeit u. a. Schwimmen, Kraftsport, Boule, Billard, Radtouren, Kanu, Solebad, Sauna; PC-Arbeitsplätze und kostenfreies WLAN."
    ],
    "therapieHinweise": [
      "Laut Klinikseite 1996 erste Einrichtung, in der substituierte und nicht substituierte Drogenabhängige gemeinsam behandelt wurden",
      "Substitutionsgestützte Entwöhnung mit Abdosierung; maximale Eingangsdosis laut Klinikseite 60 mg Methadon bzw. 30 mg Polamidon oder 8 mg Subutex",
      "Mitbehandlung komorbider AD(H)S; Kurzzeittherapie, Auffangbehandlung, Nikotinentwöhnung",
      "Substitutionsgestützte Entwöhnung mit Abdosierung; maximale Eingangsdosis laut Broschüre 50 mg Methadon, 25 mg Polamidon, 6 mg Subutex oder 400 mg Substitol.",
      "BORA-Konzept: nach Ergo-Diagnostik und Lehrküche Modellarbeitsplätze Fahrradwerkstatt, Garten, Verwaltung oder Küche/Hauswirtschaft.",
      "Indikationsgruppen, AD(H)S-Testdiagnostik mit psychologischem Programm, IFT-Rauchfrei-Gruppe."
    ],
    "factsExtra": [
      "Abgeschlossene Zahnsanierung als Aufnahmevoraussetzung ausgewiesen",
      "Anerkennung nach §§ 35/36 BtMG; Frauenbereich und Paarangebote",
      "Anerkennung durch DRV (inkl. Bund), Krankenkassen nach § 111 SGB V, überörtliche Sozialhilfeträger und § 35 BtMG.",
      "Abgeschlossene Zahnsanierung als Aufnahmevoraussetzung in der Klinikbroschüre genannt.",
      "Kooperation mit der Klinik für Manuelle Therapie Hamm; Lungensport und Rückenschule."
    ],
    "sozialdienstLeistungen": [
      "Beratung zu sozialrechtlichen, juristischen und finanziellen Fragen; abgestufte Geldverwaltung.",
      "Berufliche Wiedereingliederung gemeinsam mit der Rehafachberatung der DRV Westfalen.",
      "Unterstützung bei Anträgen gegenüber anderen Trägern; enge Zusammenarbeit mit Fachanwälten."
    ]
  },
  "ck-release-adaption": {
    "sozialdienstLeistungen": [
      "Unterstützung bei rechtlichen und finanziellen Fragen, Behördengängen, Gerichtsterminen, Schuldenregulierung und Wohnungssuche.",
      "Persönliches Vorstellungsgespräch mit Besichtigung vor Aufnahme möglich.",
      "Anerkennung nach § 35 ff. BtMG."
    ],
    "kontraindikationen": [
      "Akute Psychosen.",
      "Akute Suizidalität."
    ],
    "alltag": [
      "Einzel- und Doppelzimmer, mehrere Küchen, Fitnessraum, Garten.",
      "Kostenfreies WLAN.",
      "Wohneinheit mit Einzelzimmern für Frauen und Kinder."
    ],
    "therapieHinweise": [
      "Behandlungsdauer 17 Wochen, medizinisch/therapeutisch verkürz- oder verlängerbar.",
      "12 stationäre Plätze plus ganztägig ambulante Adaption und ambulante Nachsorge.",
      "Zielgruppe auch Alleinerziehende und Paare mit Kindern."
    ],
    "factsExtra": [
      "deQus / DIN ISO 9001:2015 seit 2012.",
      "Getrennt von der Entwöhnungsklinik in Ascheberg."
    ]
  },
  "ck-renchtal": {
    "kontraindikationen": [
      "Täglicher Cannabis-, Amphetamin- oder Kokainkonsum, wenn Glücksspiel nicht im Vordergrund steht (Angabe zum Glücksspielangebot)."
    ],
    "alltag": [
      "Neues Bettenhaus mit 44 Einzelzimmern inkl. Dusche/WC, zwei davon barrierefrei; Gemeinschaftsraum und Teeküche je Etage.",
      "Nach Fusion (28.09.2026) getrennte Zimmer- und Aufenthaltsbereiche für Frauen, Männer und gemischt; Frauenbereich mit Einzelzimmerstandard.",
      "Speisesaal mit eigener Zeitschiene für Frauen sowie für Frauen und Männer.",
      "Mitarbeit in Küche, Waschküche, Hauswirtschaft, Schreinerei, Papierwerkstatt, Gärtnerei und Haustechnik.",
      "Begleittiere (Hunde/Katzen) nach Vorabklärung; für Männer mit Begleittier ab Januar 2027."
    ],
    "mitbehandlungHinweis": "Mitbehandlung psychiatrischer Begleiterkrankungen (Persönlichkeits-, Traumafolge- und Angststörungen, affektive und psychotische Störungen im remittierten Zustand). Pathologisches Glücksspiel als Haupt-, Einzel- oder Zweitdiagnose.",
    "sozialdienstLeistungen": [
      "Adaption und ambulante Nachsorge im bwlv-Verbund."
    ],
    "therapieHinweise": [
      "Rehabilitation bei Alkohol- und Medikamentenabhängigkeit."
    ],
    "factsExtra": [
      "Fusion mit Fachklinik Schloz für 28.09.2026 angekündigt; Haus bis dahin eigenständig."
    ]
  },
  "ck-revita-kelbra": {
    "alltag": [
      "Kinder von 6 Monaten bis 12 Jahren; familienfreundliche Zimmer; Eltern-Kind-Gruppen",
      "Haustiere nach Absprache, Unterbringung im Zimmer möglich",
      "Angehörigenbesuche ab der 5. Therapiewoche; Familienheimfahrten ab der 9. Woche",
      "Fitness- und Kraftraum, Sauna, Tischtennis, Volleyball und Fußball; Gruppenausflüge in der Freizeit."
    ],
    "therapieHinweise": [
      "Verzahnung von Abhängigkeitserkrankung, begleitenden psychischen Erkrankungen, psychiatrischen Doppeldiagnosen und körperlichen Folgeerkrankungen",
      "Einzel- und Gruppentherapie, Ergo- und Physiotherapie, Bewegungstherapie sowie körperorientierte, kreative und erfahrungsbasierte Verfahren.",
      "Gruppen u. a. Frauen-/Männergruppen, Selbstsicherheitstraining, Rückfallprävention, Stabilisierungsgruppe, Gewaltprävention, therapeutisches Malen, Nichtrauchermotivation.",
      "Zweiwöchige Belastungserprobung intern oder bei externen Kooperationspartnern zur Einschätzung von Leistungs- und Arbeitsfähigkeit.",
      "Tiergestützte Therapie im Angebot ausgewiesen; BORA-Besprechungsraum in Haus 3."
    ],
    "mitbehandlungHinweis": "Psychiatrische Doppeldiagnosen und körperliche Folgeerkrankungen werden diagnostisch und therapeutisch in die Gesamtbehandlung einbezogen.",
    "sozialdienstLeistungen": [
      "Sozialer Dienst im Erdgeschoss von Haus 1; berufliche Begleitung mit Einzelgesprächen, Fallbesprechungen, Bewerbungstraining und berufsbezogener Diagnostik.",
      "Nachsorge: Vermittlung in Adaptions- oder Nachsorgeeinrichtungen, individuell abgestimmt."
    ],
    "factsExtra": [
      "Drei Häuser: Haus 1 (Verwaltung, Sozialer Dienst, Speisesaal, medizinische Abteilung, Labor), Haus 2 (Gruppenräume und Zimmer), Haus 3 (Sporthalle, Physiotherapie, Kraftraum, Sauna, Ergotherapie).",
      "Wäscherei, PC-Raum und Lehrküche im Keller von Haus 1; Fahrradverleih, tägliche Sporthallennutzung, Strandbad Stausee Kelbra.",
      "Am Aufnahmetag Organisation zentral im Aufnahmesekretariat."
    ]
  },
  "ck-richelsdorf": {
    "alltag": [
      "Wohnen in zweckmäßig eingerichteten Doppelzimmern mit Nasszelle.",
      "Besuch Freitag 18–22 Uhr, Samstag/Sonntag/Feiertag 9–22 Uhr (Angabe der Klinikseite).",
      "Strukturierter Tagesablauf zwischen Therapien und persönlichen Pausen.",
      "Regelunterbringung in Zweibettzimmern mit Nasszelle; wenige Einzelzimmer bei Bedarf.",
      "Kein Fernseher im Zimmer; Fernsehen in Aufenthaltsräumen.",
      "Barrierefreie Zimmer und abschließbares Fach vorhanden."
    ],
    "sozialdienstLeistungen": [
      "Vorbereitung arbeitsloser Rehabilitanden auf die Rückkehr ins Berufsleben, inkl. Bewerbungstraining.",
      "Ermittlung passender Tätigkeiten und Wege zur Arbeitsplatzfindung.",
      "Unterlagen zu Übergangsgeld oder Arbeitslosengeld zur sozialen Beratung mitbringen.",
      "Bewerbungstraining und Arbeitsintegrationsphase im Konzept ausgewiesen.",
      "Mutter-/Vater-Kind-Konzept: Mitaufnahme von Kindern bis zum 12. Lebensjahr, wenn die Betreuung am Heimatort fehlt."
    ],
    "therapieHinweise": [
      "Interdisziplinäre Entwöhnung bei Alkohol-, Medikamenten- und/oder Drogenabhängigkeit.",
      "Mutter-/Vater-Kind-Konzept: Kinder vom Säuglingsalter bis 12 Jahre, auch schwangere Frauen.",
      "Nach Eingewöhnung (mindestens vier Wochen) Nachholen von Kindern aus Jugendamts-Pflegestelle möglich.",
      "Entgiftung vor Therapiebeginn abgeschlossen; bei Bedarf vorgeschaltet in einem kooperierenden Krankenhaus.",
      "Paarbehandlung: gemeinsame Aufnahme, getrennte Therapiegruppen, gemeinsame Paargespräche und Angehörigenseminar.",
      "Bei illegalen Drogen in der Regel Vorstellungsgespräch zur Selbststeuerungsfähigkeit."
    ],
    "factsExtra": [
      "Eltern-Kind-Behandlung seit 1997, eingebettet ins allgemeine Programm.",
      "Ambulante Physiotherapie und physikalische Behandlung auch für externe Patientinnen und Patienten.",
      "Entgiftung kann in einem Kooperationskrankenhaus vorgeschaltet werden.",
      "Freiwilligkeit, Eigenmotivation und Anbindung an Beratungsstelle oder Abstinenzgruppe am Heimatort sind Aufnahmevoraussetzungen.",
      "Schwangere Frauen werden im Mutter-/Vater-Kind-Konzept bevorzugt aufgenommen.",
      "Abholung vom Bahnhof Wildeck-Obersuhl nach Voranmeldung möglich."
    ],
    "wahlleistungenHinweis": "WLAN kostenpflichtig (2 Euro/Tag, 10 Euro/Woche, 30 Euro/Monat). Telefon: 7,50 Euro Grundgebühr plus 0,50 Euro/Tag. Medienpauschale an der Rezeption. Kein Fernseher im Zimmer; Fernsehen in Aufenthaltsräumen.",
    "mitbehandlungHinweis": "Verschreibungspflichtige und nicht verschreibungspflichtige Dauermedikamente für den gesamten Aufenthalt mitbringen, inkl. spezifischer Präparate wie Insulin; aktueller Medikationsplan möglichst mit QR-Code. Medikamente werden über die Pflege gelagert und ausgegeben. Orthopädische Begleiterkrankungen, multimodale Schmerztherapie und Suchtmittelsubstitute sind im Angebot genannt.",
    "kontraindikationen": [
      "Produktive Psychose; remittierte, medikamentös eingestellte Psychose nur nach klärendem Vorgespräch.",
      "Hirnorganische Funktionseinschränkung.",
      "Fehlende Gehfähigkeit, Unfähigkeit Treppen zu steigen oder schwere körperliche Erkrankung.",
      "Ausgeprägte dissoziale Persönlichkeitsstörung."
    ]
  },
  "ck-ringgenhof": {
    "alltag": [
      "Unterbringung in Einzel- oder Doppelzimmern (laut Klinikseite 80 % Einzel, 20 % Doppel), überwiegend mit Duschbad/WC",
      "Freizeit u. a. Sporthalle, Fitness, Tennis, Sauna, Minigolf, Billard, Dart, Musikraum, Kegelbahn, Bibliothek",
      "EDV-Schulungsraum mit Internet gegen Gebühr"
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung; bei Glücksspiel zusätzlich Geld- und Schuldenmanagement inkl. Löschen von Online-Spielaccounts",
      "Zusammenarbeit mit Freundeskreis, Kreuzbund, Blauem Kreuz und Anonymen Alkoholikern"
    ],
    "therapieHinweise": [
      "Drei Fachabteilungen: Alkohol und Spielsucht, Drogen, Sucht und Psychose",
      "Tiefenpsychologisch fundiert; wöchentliche Einzeltherapie inkl. Paar- und Familiengespräche; Gruppentherapie dreimal wöchentlich",
      "Drogenbereich: vierwöchige Basisgruppe, danach Langzeit bis 26 Wochen, Kurz-/Mittelzeit 12–20 Wochen, Cannabis/Partydrogen 20 Wochen"
    ],
    "factsExtra": [
      "Männerklinik; Abteilungen laut Klinikseite 76 (Alkohol/Spielsucht), 46 (Drogen) und 30 (Sucht und Psychose) Plätze"
    ],
    "kontraindikationen": [
      "Abstinenzorientiert: keine abhängigkeitserzeugenden Medikamente (u. a. Benzodiazepine, Z-Schlafmittel, Opioide, Methylphenidat); Atomoxetin ist erlaubt.",
      "Aktuellen Medikamentenplan vor Aufnahme übersenden und bei Unklarheiten vorab abstimmen."
    ],
    "mitbehandlungHinweis": "Fachabteilung Sucht und Psychose mit intensiver psychiatrischer Mitbehandlung. Paar- und Familiengespräche sowie Angehörigenseminar."
  },
  "ck-rosenberg": {
    "kontraindikationen": [
      "Ausschlussdiagnosen laut Qualitätsbericht: Suchterkrankungen.",
      "Schwerwiegende Essstörungen im Sinne einer Anorexie oder Bulimie.",
      "Psychosen."
    ],
    "alltag": [
      "199 Patientenzimmer, davon 30 Doppelzimmer für Begleitpersonen; 15 Zimmer mit Spezialausstattung für besonders übergewichtige Patientinnen und Patienten.",
      "Dusche und WC, in der Regel Balkon, Flachbildfernseher mit Sat- und WLAN-Anschluss; Schwesternnotruf in Zimmer und Nasszelle.",
      "Barrierefreier Zugang, rollstuhlgerechte Erreichbarkeit der Räume; 3 teilstationäre Zimmer.",
      "Rauchverbot in Zimmern, Fluren, Toiletten und auf Balkonen; Klinik-Friseur zeitweise.",
      "Kostenfreies WLAN.",
      "Eigene Wasserkocher, Kaffeemaschinen, Heizgeräte, Ventilatoren und Kühlboxen sind in den Zimmern nicht vorgesehen."
    ],
    "sozialdienstLeistungen": [
      "Beratung zur beruflichen Integration und wirtschaftlichen Situation",
      "Schwerbehindertenrecht, Pflegegesetz, häusliche Versorgung",
      "Rentenversicherung; Suchtberatung für Betroffene und Angehörige",
      "Leistungen zur Teilhabe am Arbeitsleben, Wiedereingliederung, Fallmanagement",
      "Freie Sprechstunden ohne Anmeldung montags und mittwochs 13–14 Uhr (Erdgeschoss, Raum 33)"
    ],
    "therapieHinweise": [
      "Internistisch orientierte Psychosomatik, Traumafolgeerkrankungen, Psychodiabetes und Reizdarm-/Reizmagensyndrom.",
      "Psychoedukation; Entspannungsverfahren (autogenes Training, Muskelentspannung), Nichtrauchertraining.",
      "Stationär und ambulant, inkl. MBOR."
    ],
    "factsExtra": [
      "DRV Westfalen; Kostenträger u. a. DRV, ARGE Krebsbekämpfung Bochum, GKV/PKV, Berufsgenossenschaften, Versorgungsämter, Beihilfe, Selbstzahler.",
      "Video-Rentenberatung alle drei Wochen nach Rücksprache mit Stationsarzt oder Sozialdienst.",
      "Fragebogen zur Gesundheit vor Anreise als Grundlage des ärztlichen Aufnahmegesprächs.",
      "Psychosomatische Reha mit speziellem Behandlungskonzept für pflegende Angehörige, inkl. Sozialberatung zu Entlastung in der Pflege."
    ],
    "mitbehandlungHinweis": "Gastroenterologie und Diabetes am Standort; 15 Zimmer für besonderes Übergewicht. Mitbehandelbare internistische Indikationen (u. a. CED, Leber, Pankreas) im Qualitätsbericht ausgewiesen.",
    "wahlleistungenHinweis": "Waschmaschine und Trockner gegen Wertchips aus der Cafeteria; Waschmittel dort erhältlich. Bügeleisen vorhanden."
  },
  "ck-roseneck": {
    "kontraindikationen": [
      "Primäre Alkohol- und Drogenabhängigkeit.",
      "Akute psychotische Erkrankungen.",
      "Akute Selbstgefährdung bzw. Suizidalität.",
      "Demenzen.",
      "Mindestalter im Regelfall 12 Jahre.",
      "Demenzen und weitere Störungen, die das Setting ausschließen."
    ],
    "alltag": [
      "Besuchszeiten 8:00–22:00 Uhr; während der Therapiezeiten auf Besuch verzichten.",
      "Alkohol auf dem gesamten Klinikgelände nicht gestattet.",
      "Essstörungsstationen: keine eigenen Lebensmittel, Waagen, Abführmittel oder Sportgeräte.",
      "Rauchfreie Klinik, Rauchen nur im Raucherpavillon; Cannabis grundsätzlich untersagt.",
      "Medikamente bei Anreise abgeben (Aufbewahrung in der Medizinischen Zentrale), nicht auf dem Zimmer lagern.",
      "Safe im Zimmer; keine eigenen TV-Geräte, Wasserkocher oder vergleichbare Elektrogeräte (Brandschutz)."
    ],
    "therapieHinweise": [
      "Spezialkonzepte für Essstörungen, inkl. Komplexstation bei sehr niedrigem BMI.",
      "Jugendstationen für Essstörungen, Depression, Angst und Zwang.",
      "Zwangsernährung wird laut Klinik nicht eingesetzt."
    ],
    "factsExtra": [
      "Standorte Prien am Chiemsee, Rosenheim und Vogtareuth.",
      "Komplexstation für schwere Anorexie ohne Mindestgewicht als Aufnahmekriterium."
    ],
    "wahlleistungenHinweis": "Wahlleistung Zimmer sowie wahlärztliche Leistungen für Privatversicherte und Beihilfe.",
    "sozialdienstLeistungen": [
      "Sozialtherapie im Einzelsetting u. a. zu Berufseinstieg, betrieblichem Eingliederungsmanagement, Alltagshilfen, Isolation, Selbsthilfegruppen, Schwerbehindertenrecht und wirtschaftlicher Absicherung.",
      "Für Jugendliche und junge Erwachsene u. a. Rückkehr in die Schule, therapiebegleitender Schulbesuch, Jugendhilfe und Ablösung vom Elternhaus.",
      "Standort Prien: Haus T, 4. OG, Mo–Fr; Haus Rosenheim: Haus 1, 3. OG, Mo–Fr; Tagesklinik Prien Di–Do."
    ]
  },
  "ck-rosenhoehe": {
    "alltag": [
      "Ruhezeit 21:00–06:30 Uhr, Nachtruhe ab 23:00 Uhr; Klinik 06:00–23:00 Uhr.",
      "Anwesenheit bei den Mahlzeiten; Menübestellsystem.",
      "Rauchen nur an gekennzeichneter Stelle im Außengelände.",
      "Alkohol und nicht medizinisches Cannabis im Klinikbereich untersagt.",
      "Besuche auf den Zimmern nicht erwünscht.",
      "Unterbringung in Einzelzimmern mit eigenem Bad, Telefon und kostenlosem WLAN."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung zu sozialrechtlichen, beruflichen, finanziellen und Rentenfragen; Anmeldung über Oberarzt bzw. Psychologen."
    ],
    "therapieHinweise": [
      "Tiefenpsychologisch fundierte Gruppen- und Einzelgespräche.",
      "Therapiekonzept Neue Medien.",
      "Grenzfallbehandlung Sucht öffentlich genannt.",
      "Schmerzbewältigung und Raucherentwöhnung.",
      "Tiefenpsychologisch fundierte Gruppen- und Einzelgespräche; interaktionelle Gruppen.",
      "Psy-RENA-Nachsorge nach der Reha möglich."
    ],
    "factsExtra": [
      "Lehrküche, Sauna, Schwimmbad und Fitnessraum am Standort.",
      "Zimmerwechsel grundsätzlich nicht vorgesehen.",
      "DGE-zertifizierte Menülinie im Speisesaal; Menüänderung nur bis zum Vortag 12:00 Uhr.",
      "E-Bike-Verleih werktags ab 18:00 Uhr, am Wochenende ab 09:30 Uhr; MTT auch abends nutzbar.",
      "Zimmer am Entlassungstag bis 08:00 Uhr räumen; bis zur Abreise abschließbarer Kofferraum.",
      "Begleitperson im begrenzten Umfang als Zustellbett; Anwendungen für Begleitpersonen nicht im Haus."
    ],
    "wahlleistungenHinweis": "TV-Gerät fürs Zimmer gegen Entgelt; WLAN kostenfrei.",
    "mitbehandlungHinweis": "Begleiterkrankungen aus Ernährung/Stoffwechsel, Herz-Kreislauf, Atmung und Orthopädie werden mitbehandelt.",
    "kontraindikationen": [
      "Rehabilitandinnen und Rehabilitanden mit akuter Psychose können nicht aufgenommen werden."
    ]
  },
  "ck-roswitha": {
    "alltag": [
      "Besuch in der therapiefreien Zeit möglich.",
      "Anwesenheit in der Klinik während der Therapien und der Essenszeiten sowie nachts (wochentags 23–6 Uhr, vor therapiefreien Tagen 24–6 Uhr).",
      "Hauptanreisetage Dienstag und Mittwoch.",
      "Anreise in der Regel 9:00–11:00 Uhr; bei Bahnankunft Abholung vom Bahnhof Bad Gandersheim nach Rückmeldung bzw. Anruf eine Woche vorher.",
      "Anreisebestätigung und Patientenfragebogen vorab ausfüllen und an die Klinik senden.",
      "1 Handtuch, 1 Duschtuch und 1 Badevorleger auf dem Zimmer, Wechsel einmal wöchentlich; WLAN im Haus."
    ],
    "sozialdienstLeistungen": [
      "Finanzielle Absicherung während und nach der Reha",
      "Rückkehr an den Arbeitsplatz, Arbeitsplatzkonflikte, stufenweise Wiedereingliederung",
      "Berufliche Rehabilitation (LTA)",
      "Unterstützung bei familiärer Pflege",
      "Gruppen- und Einzelgespräche, auf Wunsch mit Angehörigen"
    ],
    "therapieHinweise": [
      "Integrative psychosomatische Reha mit psychodynamischen und verhaltenstherapeutischen Ansätzen.",
      "Bezugstherapeut und Bezugsarzt; Behandlungsdauer laut FAQ zwischen drei und etwa sechs Wochen, Verlängerung nach therapeutischer Prüfung.",
      "Verhaltenstherapeutische Gruppenpsychotherapie mit Motivations- und Gesundheitstraining.",
      "Neben der psychosomatischen Reha stationäre psychotherapeutische Akutbehandlung im Rahmen der Integrierten Versorgung (Direkteinweisung) für 18- bis 75-Jährige aus der Region."
    ],
    "factsExtra": [
      "Vertragsklinik der DRV Bund, Versorgungsvertrag § 111 SGB V; Beihilfe nach Kostenklärung möglich.",
      "Voraussetzung laut Zuweiserseite: Kostenübernahmeerklärung einer Krankenkasse oder Rentenversicherung.",
      "IK 260310891; private Krankenanstalt nach § 30 GewO.",
      "Zertifizierung DEGEMED 6.0 und DIN EN ISO 9001:2015."
    ],
    "mitbehandlungHinweis": "Interdisziplinäres Team aus Medizin, Therapie, Pflege, Physio- und Sporttherapie, Ergotherapie, Ernährungsberatung und Sozialarbeit.",
    "kontraindikationen": [
      "Therapeutische und sanitäre Einrichtungen mit maximaler Tragkraft 150 kg; bei höherem Körpergewicht Rücksprache mit dem Patientenmanagement."
    ],
    "wahlleistungenHinweis": "Medienpauschale am Anreisetag an der Rezeption: Telefon (Grundgebühr und Einheiten) sowie TV für den gesamten Aufenthalt inklusive Verlängerungstage."
  },
  "ck-rothaar": {
    "kontraindikationen": [
      "Schizophrenie im akuten Stadium.",
      "Akute Suizidalität.",
      "Demenzielle Störung ohne Teilnahme an therapeutischen Abläufen.",
      "Akute Heroinabhängigkeit.",
      "Schwere organische Erkrankung mit Intensivbedarf; Sexualstraftäter.",
      "Demenzielle Störungen, die eine Teilnahme am Therapieablauf ausschließen."
    ],
    "alltag": [
      "Barrierefrei; drei Zimmer behindertengerecht; Bad mit Dusche/WC.",
      "Entgiftung im Haus möglich.",
      "130 Behandlungsplätze, 100 Zimmer mit Dusche/WC; drei behindertengerechte Zimmer; barrierefrei.",
      "Einige Zimmer mit Balkon; keine Reservierung von Wunschzimmern.",
      "WLAN in Gemeinschaftsräumen; Sauna, Grillhütte, Bibliothek, Billard, Minigolf, Fahrrad- und Skiverleih.",
      "Eltern-Kind-Bereich; Behandlung ohne Begleitpersonen außer im Eltern-Kind-Setting."
    ],
    "therapieHinweise": [
      "Bezugsgruppe plus Indikativgruppen (u. a. Trauma, Depression, Frauen-/Männergruppen, Werktherapie Holz).",
      "Substitutionsgestützte Entwöhnung öffentlich genannt.",
      "Regeldauer 15 Wochen, je nach Maßnahme 6–24 Wochen.",
      "Halboffene Bezugsgruppe von etwa zehn Personen; Regeldauer 14–15 Wochen, je nach Maßnahme 6–24 Wochen.",
      "Indikativgruppen u. a. Trauma, Depression, Frauen-/Männergruppen, Werktherapie Holz.",
      "Entgiftung vor Ort möglich; bei Entzugssymptomen vorübergehend Aufnahme auf der hauseigenen Wachstation."
    ],
    "factsExtra": [
      "Antritt nicht zwingend abstinent; Entgiftung vor Ort möglich.",
      "Schwangere sowie Mütter oder Väter mit bis zu drei Kindern ab einem Jahr, auch mit Handicap.",
      "Russisch- und türkischsprachiges Angebot.",
      "Mitglied im Fachverband Sucht; Kooperationsverbund Sauerland mit der federführenden DRV Westfalen.",
      "Antritt nicht zwingend abstinent; Aufnahme „clean“ oder nahtlos nach Entzug."
    ],
    "mitbehandlungHinweis": "Körperliche Folgeschäden (u. a. Leber, Bauchspeicheldrüse, Polyneuropathie) und orthopädische Beschwerden werden mitbehandelt.",
    "sozialdienstLeistungen": [
      "Beratung bei finanziellen, juristischen sowie sozialen und beruflichen Fragen.",
      "Externe Betriebspraktika; Erziehungsberatung und Kooperation mit Tagesmüttern, Kitas und Schulen.",
      "Antragsweg über Suchtberatungsstelle: Reha-Antrag, Sozialbericht und ärztliches Gutachten (Hausarzteinweisung genügt nicht).",
      "Beratung bei finanziellen Schwierigkeiten, juristischen Fragen sowie sozialer und beruflicher Wiedereingliederung.",
      "Externe Betriebspraktika zur Erprobung der Arbeitsfähigkeit.",
      "Erziehungsberatung und Kooperation mit Tagesmüttern, Kindereinrichtungen und Schulen im Eltern-Kind-Bereich."
    ]
  },
  "ck-rusteberg": {
    "alltag": [
      "Unterbringung in modernen Bettenhäusern in Ein- und Zweibettzimmern mit eigener Dusche und WC.",
      "Kleine Stationseinheiten mit eigener Küche und Aufenthaltsraum; ruhiges Nebengebäude mit eigenem Aufenthaltsraum.",
      "Vier behindertenfreundliche Einzelzimmer.",
      "Mahlzeiten aus der klinikeigenen Küche; besondere Kostformen über Diätassistenz."
    ],
    "sozialdienstLeistungen": [
      "Berufliches Integrationstraining bei drohender oder eingetretener Erwerbslosigkeit.",
      "Anschluss an ambulante Nachsorge in SiT-Beratungsstellen oder Adaption in Weimar bzw. Erfurt.",
      "Unterstützung bei sozialen, finanziellen und gerichtlichen Problemlagen im Alltag."
    ],
    "therapieHinweise": [
      "Einzel- und Gruppentherapie, Rückfallprophylaxetraining und soziales Kompetenztraining.",
      "Psychoedukationstraining für Rehabilitandinnen und Rehabilitanden mit Psychoseerfahrung.",
      "MPU-Gruppe zur Vorbereitung auf die Wiedererlangung der Fahrerlaubnis; Raucherentwöhnungsgruppe.",
      "Selbstverteidigungskurs speziell für Frauen; geschlechtsspezifische Angebote.",
      "Behandlungskonzept für 22 Wochen; kürzere Dauer in Einzelfällen möglich.",
      "Stationäre medizinische Reha vor allem für Drogenabhängige."
    ],
    "factsExtra": [
      "60 Therapieplätze für Frauen und Männer ab 18 Jahren (Drogen, Alkohol, Medikamente, Doppeldiagnosen).",
      "Fahrdienst holt nach Vorvereinbarung aus der Entgiftungsklinik ab.",
      "Schnelleinweisung aus einer stationären Entgiftung über den dortigen Sozialdienst möglich.",
      "SiT Thüringen, federführend DRV Mitteldeutschland.",
      "ISO/deQus."
    ],
    "mitbehandlungHinweis": "Umfangreiche medizinisch-psychiatrische Mitbehandlung inkl. fachärztlicher Konsiliardienste; komplette Zahnsanierung während der Reha möglich."
  },
  "ck-saaletalklinik": {
    "alltag": [
      "Vorrangig Einzelzimmer; 166 Therapieplätze laut Klinikflyer.",
      "Nachtruhe 22:00–6:00 Uhr; ab Hausschluss Aufenthalt auf dem eigenen Zimmer.",
      "Rauchen im Haus, im Zimmer, auf dem Balkon und im Bad nicht gestattet.",
      "Zimmer-, Alkohol- und Urinkontrollen können ohne Ankündigung erfolgen.",
      "Hauseigenes Schwimmbad (auch in der Freizeit), Saunabereich, Turnhalle und Fahrradverleih.",
      "Betreten der Zimmer anderer Rehabilitandinnen und Rehabilitanden nicht gestattet."
    ],
    "sozialdienstLeistungen": [
      "Beratung durch den Sozialdienst, u. a. zu Wohnungs- und Arbeitssuche.",
      "Angehörigengruppen und -seminare; Paargespräche nach Absprache."
    ],
    "therapieHinweise": [
      "Kombitherapie mit achtwöchiger stationärer Phase.",
      "Stationäre medizinische Rehabilitation bei Alkohol- und Medikamentenabhängigkeit."
    ],
    "factsExtra": [
      "Campus NES, Fachverband Sucht-Mitglied."
    ]
  },
  "ck-sachsenklinik": {
    "kontraindikationen": [
      "Borderlinepersönlichkeitsstörungen werden im psychosomatischen Konzept ausdrücklich ausgenommen."
    ],
    "alltag": [
      "Einzelzimmer in Haus Herrmannsbad und Haus am Park mit kostenfreiem TV und Safe; kein Kühlschrank im Zimmer.",
      "Therapien und Mahlzeiten im jeweiligen Haus; Schwimmbad nur im Haus Herrmannsbad.",
      "Nachtruhe 22:30–6:00 Uhr; bei Aufnahme ein Mitpatient als Pate.",
      "WLAN kostenpflichtig (Lobby Haus Herrmannsbad sowie gesamtes Haus am Park).",
      "Besuch jederzeit; Übernachtung von Besuch im Zimmer nur nach Voranmeldung und kostenpflichtiger Aufbettung.",
      "Vollwertige vegane Ernährung laut Klinikseite nicht durchgängig sicherstellbar."
    ],
    "sozialdienstLeistungen": [
      "Termin beim Sozialdienst zu Beginn der Reha.",
      "Beratung zu Teilhabe am Arbeitsleben, Nachsorge und Selbsthilfegruppen.",
      "Hilfe bei Kontakt zu Integrationsfachdienst, Agentur für Arbeit, Rentenversicherung und Nachsorgeeinrichtungen.",
      "Unterstützung bei Kontakt zum Arbeitgeber, u. a. stufenweise Wiedereingliederung."
    ],
    "therapieHinweise": [
      "Kognitive Verhaltenstherapie plus Schematherapie nach Young, CBASP nach McCullough und metakognitive Therapie nach Wells.",
      "Persönliche Bezugstherapie mit fester Therapiegruppe von Aufnahme bis Entlassung.",
      "Schwerpunkte u. a. chronische Depression, Traumatyp I, somatoforme Schmerzstörungen; spezifische Behandlung von Depressionen im Alter.",
      "MBOR bei besonderen beruflichen Problemlagen; Arbeitsversuche in kooperierenden Einrichtungen."
    ],
    "factsExtra": [
      "Psychosomatik seit 2024 auch im Haus am Park; beide Häuser inhaltlich identisch, organisatorisch getrennt.",
      "Michels-Kliniken-Verbund; rollstuhlgerechte Zimmer vorhanden.",
      "Medikamente werden von der Klinik gestellt; für die ersten Tage eigenen Vorrat mitbringen."
    ],
    "wahlleistungenHinweis": "Ambulante Zusatzangebote wie Packungen, Massagen oder Taping an der Rezeption des Haus Herrmannsbad käuflich erwerbbar.",
    "mitbehandlungHinweis": "Orthopädie, Neurologie und Psychosomatik am Standort; psychosomatische Plätze in Haus Herrmannsbad und Haus am Park. Begleitperson im Doppelzimmer möglich."
  },
  "ck-salus-adaption-huerth": {
    "alltag": [
      "24 Einzelappartements mit eigenem Bad und Küchenzeile im Neubau (Argeles-sur-Mer-Str. 2, Hürth).",
      "Behandlungszeit je nach Leistungsträger und Suchtmittel 12 bis 17 Wochen; Aufnahme nahtlos aus der Entwöhnungsbehandlung Phase I.",
      "Kinder ab dem 3. Lebensmonat bis 10 Jahre; Angebot auch für Paare sowie für gleichgeschlechtlich orientierte Frauen und Männer.",
      "50 Euro Kaution für das Apartment, Rückerstattung nach ordnungsgemäßer Rückgabe.",
      "Appartements im Erweiterungsbau; Alltagserprobung der in der Entwöhnung gewonnenen Ergebnisse."
    ],
    "sozialdienstLeistungen": [
      "Begleitung bei der beruflichen Teilhabe inkl. Praktikum; Koordination berufliche Teilhabe im Team.",
      "Netzwerk zu praktikumsgebenden Firmen, ambulanten BeWo-Anbietern und Nachsorgeeinrichtungen.",
      "Klärung der zukünftigen Wohnsituation in suchtmittelfreier Umgebung; Nachsorgeplanung."
    ],
    "therapieHinweise": [
      "Verhaltens-, selbstmanagement- und ressourcenorientierte Verfahren; individuelle Behandlungsplanung, Einzel- und Gruppentherapie.",
      "Indikative Schwerpunkte u. a. pathologisches Glücksspiel, ADHS, Medienabhängigkeit sowie Arbeit mit gleichgeschlechtlich orientierten, trans- und intergeschlechtlichen Menschen.",
      "Familientherapeutische Begleitung, Angehörigen- und Paargespräche; ärztliche und fachärztliche psychiatrische Sprechstunden.",
      "Zweite Phase der medizinischen Rehabilitation direkt im Anschluss an die Entwöhnung.",
      "Angebot für Frauen, Männer und Paare mit Kindern."
    ],
    "factsExtra": [
      "Federführender Leistungsträger: Deutsche Rentenversicherung Rheinland; Einzelfallentscheidungen anderer regionaler Rentenversicherungen und Sozialhilfeträger möglich.",
      "Leitung Frauke Wulf; 24 Plätze seit Erweiterung und Neubau 2021.",
      "Therapiekonzept, Aufnahme und Unterlagenliste sind auf der Trägerseite als eigene Rubriken ausgewiesen."
    ]
  },
  "ck-salus-castrop": {
    "alltag": [
      "Konzept mit Alltagsnähe statt Abschottung; stadtnah am grünen Rand, S-Bahn-Anbindung.",
      "Aufnahme zwischen 09:00 und 11:00 Uhr. Nachtruhe 23:00–06:00 Uhr, freitags, samstags und vor Feiertagen ab 24:00 Uhr.",
      "Waschmaschinen, Trockner und Bügeleisen vorhanden; Bettwäsche und Handtücher werden gestellt. Wäschewaschen auf dem Zimmer nicht vorgesehen.",
      "Handy, Laptop und kleiner Fernseher (Monitor bis 30 Zoll) nach Absprache; flächendeckendes WLAN. E-Zigaretten nicht erlaubt.",
      "Besuch ab dem ersten Wochenende samstags und sonntags 14–19 Uhr, persönlich an- und abmelden. Heimfahrten in der Regel ab der 5. Therapiewoche.",
      "Teilnahme an den Mahlzeiten verbindlich; vegane Ernährung nicht angeboten. Energy-Drinks, Mate, Malzbier, CBD, alkoholfreies Bier und Fassbrause nicht erlaubt."
    ],
    "therapieHinweise": [
      "Schwerpunkt junge Erwachsene ab 18 mit Cannabis- und/oder Partydrogenkonsum.",
      "MPU-Vorbereitungskurs in Kooperation mit Suchthilfe Direkt Essen gGmbH.",
      "Bezugsgruppe regulär acht Personen, halboffen; Gruppenpsychotherapie zentral.",
      "Indikative Gruppen u. a. Depression, Training sozialer Kompetenzen, Trauma und Sucht, ADHS, Raucherentwöhnung, Männergruppe, Psychosegruppe und Skillstraining.",
      "Arbeitstherapie in Ergotherapie (Ton, Speckstein, Mosaik, Malerei) und Hausmanagement; interne und externe Belastungserprobung.",
      "BORA-Angebote: PC-Schulung, Bewerbungstraining, Arbeitgebergespräche, Betriebsbesichtigungen."
    ],
    "factsExtra": [
      "Regelbehandlung 22 Wochen bei Ersttherapie, 12–16 Wochen bei Wiederholungstherapie.",
      "Paaraufnahme möglich.",
      "Abhängigkeit von illegalen Substanzen und multiplen Konsumformen.",
      "Keine Entgiftungsstation. Aufnahme nur clean bzw. nahtlos nach regulär abgeschlossener Entgiftung; bei THC nahtloser Anschluss empfohlen.",
      "Sozialhilfebeziehende: Antrag auf Taschengeld und Bekleidungsbeihilfe über den Sozialdienst. Arbeitslosigkeit dem Jobcenter bzw. der Agentur für Arbeit zum Behandlungsbeginn mitteilen."
    ]
  },
  "ck-salus-friedberg": {
    "sozialdienstLeistungen": [
      "Sozialdienst in der Adaption als eigene Unterseite ausgewiesen.",
      "In der Adaption Unterstützung bei Arbeit, Ausbildung und abstinenter Alltagsgestaltung in der Rhein-Main-Region.",
      "Externes Praktikum als Belastungserprobung in der Adaption."
    ],
    "therapieHinweise": [
      "Entwöhnung bei Drogen, Alkohol, Medikamenten, Glücksspiel und Internet.",
      "Gruppen für 18–25-Jährige und Senioren ab 45; frauenspezifische Behandlung und Reha mit Begleitkindern im Verbund.",
      "Bezugstherapie ausschließlich durch Psychologinnen und Psychologen, Psychologische Psychotherapeutinnen und Psychotherapeuten sowie Suchttherapeutinnen und Suchttherapeuten.",
      "Bezugsgruppentherapie u. a. zu Trauma, Stressbewältigung, Partnerschaft, Angst und Depression."
    ],
    "factsExtra": [
      "Regelbehandlungsdauer 22 Wochen, Adaption bis drei Monate anschließbar; Paarbehandlung möglich.",
      "62 Therapieplätze plus 10 Adaptionsplätze.",
      "Anerkennung nach §§ 35, 36 BtMG."
    ],
    "alltag": [
      "Am Aufnahmetag: Kennenlernen der Bezugstherapeutin bzw. des Bezugstherapeuten, ärztliche Aufnahmeuntersuchung inklusive Drogentest.",
      "Betreuung in den ersten Tagen durch eine therapieältere Rehabilitandin bzw. einen therapieälteren Rehabilitanden.",
      "Orientierungsgruppe in den ersten zwei Wochen; Information über Arbeitstherapie-Angebote.",
      "Am Aufnahmetag wird eine saubere Urinprobe erwartet.",
      "Adaption: 10 Apartments mit Bad und Küchenzeile, überwiegend mit Balkon oder Terrasse; Fitness- und Sportangebote der Klinik mitnutzbar."
    ]
  },
  "ck-salus-hurth": {
    "alltag": [
      "Stationär: komfortable Einzelzimmer mit Duschbad, Minisafe, Kühlschrank, Telefon, TV und freiem WLAN.",
      "Vegane Ernährung wird nicht angeboten.",
      "Verordnete Dauermedikamente mitbringen und bei Aufnahme in der Medizinischen Zentrale abgeben; Bedarfsmedikamente und Schmerzmittel nicht mitbringen.",
      "Rauchverbot 0–6 Uhr auch an den ausgewiesenen Rauchzonen; E-Bikes und E-Roller aus Brandschutzgründen nicht gestattet.",
      "Keine klinikzugehörigen Parkplätze; öffentliche Parkplätze in der Nähe nutzen.",
      "Ganztägig ambulant (GAT): Mo–Fr 8:30–17:00 Uhr bzw. nach Absprache, abends nach Hause; Schließfach, Umkleiden und Ruheräume."
    ],
    "therapieHinweise": [
      "Psychosomatik verhaltenstherapeutisch orientiert: kognitive Umstrukturierung, Psychoedukation, Selbstmanagement und Stressreduktion; Gruppen, Einzel, Indikationsgruppen, Sport, Ergo-, Arbeits- und Kunsttherapie.",
      "GAT für Patientinnen und Patienten aus der näheren Umgebung; Fahrkosten zwischen Wohnort und Klinik trägt der Leistungsträger laut Flyer.",
      "Fachklinik für Psychosomatik, stationär und ganztägig ambulant.",
      "Eigene Frauenklinik; psychosomatische Akutbehandlung für akut psychisch stark Belastete.",
      "Suchtfachklinik und Adaption am Campus."
    ],
    "factsExtra": [
      "Reine Rehabilitationsklinik: Aufnahme nur mit Antrag auf medizinische Rehabilitation, nicht mit Krankenhauseinweisung oder Überweisung.",
      "Heimfahrten während der stationären Reha nur nach Abstimmung und Genehmigung durch das Behandlungsteam.",
      "Waschmaschinen und Trockner gegen Gebühr (je 2 €); 10 € Pfand für Zimmerschlüsselkarte und Brieffachschlüssel.",
      "Angebot „Reha Rundblick“ für sehbehinderte und blinde Menschen im erwerbsfähigen Alter seit 2018.",
      "Mutter-Kind-Appartements in der Frauenklinik.",
      "IK 570530012 / 540500163."
    ],
    "wahlleistungenHinweis": "Belegung durch Renten- und Krankenversicherung; beihilfefähig nach BhV des Bundes und der Länder. Selbstzahler werden aufgenommen.",
    "sozialdienstLeistungen": [
      "Partner- und Angehörigenseminare der Psychosomatik und der Sucht.",
      "Infoabende Psychosomatik und Sucht (Präsenz und online)."
    ]
  },
  "ck-salus-lindow": {
    "alltag": [
      "1- und 2-Bettzimmer mit Nasszelle; Schwimmhalle, Sauna, Sportanlagen.",
      "Psychosomatik: Einzelzimmer mit Bad, Telefon, Fernseher, Kühlschrank und Minisafe; Zweibettzimmer auf Wunsch.",
      "Suchtbereich: Zweibettzimmer mit Dusche, WC und Telefon; medizinische Aufnahmestation mit Überwachungszimmer.",
      "Hallenbad, Sauna, Fitness, Lehrküche, Cafeteria; Rauchverbot in Räumen und auf dem Gelände, Raucherpavillons.",
      "PKW-Fahren während der Behandlung versicherungstechnisch untersagt."
    ],
    "therapieHinweise": [
      "Verhaltensmedizinische Ausrichtung; ca. 50 gruppentherapeutische Angebote.",
      "Sucht und Psychosomatik am Standort; Traumasprechstunde öffentlich genannt.",
      "Psychosomatik in Phasen: Intensiv-Screening, Selbstreflexion, Veränderung, Erprobung; Bezugstherapie.",
      "Körperliche Entzugsbehandlung soll vor Reha-Antritt erfolgt sein; bei Intoxikation Beobachtung auf der medizinischen Station, ggf. Verlegung ins Ruppiner Klinikum."
    ],
    "factsExtra": [
      "273 Therapieplätze (181 Sucht, 92 Psychosomatik laut Fachverband Sucht).",
      "Schriftliche Aufforderung, entgiftet zu kommen; bei Intoxikation Beobachtung/Verlegung.",
      "Angehörigen- und Besucherseminare mit Terminen auf der Klinikseite.",
      "Federführend DRV Berlin-Brandenburg; Versorgungsvertrag nach § 111 SGB V; beihilfefähig.",
      "Zertifiziert nach DIN EN ISO 9001, DEGEMED/FVS und MAAS-BGW."
    ],
    "kontraindikationen": [
      "Akute Suizidalität; akutes psychotisches Geschehen.",
      "Ansteckende Krankheiten, die Mitrehabilitandinnen und Mitrehabilitanden gefährden.",
      "Rollstuhlpflicht, permanente Gehunfähigkeit oder Bettlägerigkeit.",
      "Stoffgebundene Abhängigkeit in der Psychosomatik: interne Verlegung in die Suchtabteilung, mit Zustimmung des Leistungsträgers."
    ],
    "sozialdienstLeistungen": [
      "Beratung zu Schuldenregulierung, Übergangsgeld, Strafverfahren, Wohnen und Behörden.",
      "Bewerbungstraining, Arbeitstherapie (Schreinerei, Gärtnerei, Übungsfirma) und externe Arbeitserprobung.",
      "BORA-Konzept in der Suchtabteilung; Kooperation u. a. mit Jobcenter."
    ],
    "mitbehandlungHinweis": "Sucht und Psychosomatik am Standort. Bei stoffgebundener Abhängigkeit in der Psychosomatik interne Verlegung in die Suchtabteilung. Interkurrente Erkrankungen auf der medizinischen Station."
  },
  "ck-salus-nauheim-adaption": {
    "alltag": [
      "Zwölf Einzelappartements mit Kochgelegenheit; Selbstversorgung im Sinne des Selbstmanagements.",
      "Leistungsbezug (z. B. Bürgergeld) bleibt; zusätzlich wöchentliches Verpflegungsgeld über die Klinik.",
      "Freizeitanlagen der Klinik (u. a. Sauna, Fitnessraum, Tischtennis, Filmvorführungen) weiter nutzbar.",
      "Regelmäßiger Besuch einer regionalen Selbsthilfegruppe gehört zum Behandlungskonzept.",
      "PC-Arbeitsplätze für Bewerbungen und administrative Angelegenheiten.",
      "Für Frauen und Männer mit Abhängigkeit von Alkohol, Drogen, Medikamenten, Medien oder Geldspiele."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei Wohnungs- und Jobsuche, Bewerbungen und Behördengängen.",
      "Praktikumsplatzsuche bereits während der Entwöhnung vor dem Wechsel; Bilanzgespräch beim Praktikumsgeber.",
      "Netzwerkarbeit mit regionalen Arbeitgebern, Jobcenter, Nachsorgeeinrichtungen und Selbsthilfe."
    ],
    "therapieHinweise": [
      "Nahtlose Anschlussbehandlung nach regulär abgeschlossener Entwöhnung; medizinische Rehabilitation.",
      "Externe, mehrwöchige Arbeitserprobung bei regionalen Arbeitgebern.",
      "Bezugsgruppe u. a. zu Arbeitsleben, alltagsnaher Rückfallprophylaxe und Selbstsicherheit.",
      "Wöchentliche Gruppe Organisation und Selbstmanagement (GOS), von der Rehabilitandengruppe geleitet.",
      "Suchttherapeutische Einzel- und Gruppentherapie im Selbstmanagementkonzept; ärztliche und fachärztliche psychiatrische Versorgung."
    ],
    "factsExtra": [
      "Zwölf Behandlungsplätze in Einzelappartements in separatem Haus, Schwahlheimer Straße 81, Bad Nauheim.",
      "Wesentlicher Anlass laut Klinik: (Langzeit-)Arbeitslosigkeit bei bestehender Arbeitsfähigkeit."
    ]
  },
  "ck-salus-potsdam": {
    "kontraindikationen": [
      "Akute Suizidalität",
      "Schweres und rezidivierendes selbstverletzendes Verhalten",
      "Akute psychotische Exazerbation",
      "Erhebliche psychische Komorbidität, die ambulant nicht angemessen mitbehandelt werden kann",
      "Ausgeprägte kognitive Störungen (z. B. Demenz, Korsakow)",
      "Intelligenzminderung"
    ],
    "alltag": [
      "Ganztägig ambulant, keine Übernachtung; werktags 8–16 Uhr, samstags 8–12 Uhr.",
      "Erprobung im eigenen Alltag und Einbeziehen von Angehörigen ist Teil des Settings.",
      "Anfahrtsweg mit öffentlichen Verkehrsmitteln in der Regel höchstens 45 Minuten je Strecke.",
      "Ganztägig ambulant mit Anfahrt im ÖPNV in der Regel bis etwa 45 Minuten; stabile Wohnsituation vorausgesetzt.",
      "Aufnahme mit Atemalkoholkontrolle sowie körperlicher Untersuchung (Blut, Urin, Ruhe-EKG).",
      "Geeignet u. a. für Alleinerziehende oder Personen mit Versorgungspflichten zu Hause."
    ],
    "sozialdienstLeistungen": [
      "Rehafachberatung und Bewerbungstraining",
      "Arbeitgebergespräche und Arbeitserprobung",
      "EDV-Schulung; Koordination der Nachsorge mit AWO Potsdam",
      "Kooperation mit Klinikum Ernst von Bergmann (Entzug, Rückfall-Akutbehandlung) und AWO Potsdam (Suchtberatung, Nachsorge).",
      "Bewerbungstraining, Arbeitserprobung, Rehafachberatung und Arbeitgebergespräche."
    ],
    "therapieHinweise": [
      "22 Plätze für Alkohol- und Medikamentenabhängigkeit; Behandlungsdauer im Schnitt 12 Wochen, Entlassphase nach Stationär im Schnitt 4 Wochen.",
      "Angebote u. a. Bezugsgruppe, Exposition, Joystick-/PC-Rückfalltraining, Raucherentwöhnung, Lehrküche, Partner-/Angehörigenseminare.",
      "Nahtloser Übergang von der Entzugsbehandlung im Klinikum Ernst von Bergmann; Rückfall ist keine automatische Kontraindikation.",
      "Nahtloser Übergang nach Entzugsbehandlung im Klinikum Ernst von Bergmann.",
      "Rückfallprävention u. a. Expositionsübungen, Ablehnungstraining, Online-Therapietagebuch, Joysticktraining.",
      "Auffangbehandlung nach Rückfall innerhalb von zwei Jahren ausgewiesen."
    ],
    "factsExtra": [
      "Gebäude Q, Charlottenstraße 72, Klinikum Ernst von Bergmann.",
      "Therapieverbund mit EvB und AWO: Entzug, Entwöhnung und Nachsorge in einer Kette.",
      "Spezifische Module für Auffangbehandlung (6 Wochen), Wiederholung (10 Wochen) und Kombi (8 Wochen).",
      "Tagesklinische Entlassphase nach stationärer Entwöhnung möglich.",
      "Wöchentlicher Besuch einer Selbsthilfegruppe im Konzept genannt."
    ],
    "mitbehandlungHinweis": "Räumliche Integration ins Klinikum Ernst von Bergmann: konsiliarärztliche Mitbehandlung und Verlegung in den somatischen Bereich oder die KPP&P bei Bedarf. Schweigepflichtentbindung für die Abstimmung mit externen Ärztinnen und Ärzten ist Voraussetzung."
  },
  "ck-salza": {
    "alltag": [
      "Einzelzimmer mit Dusche, WC, Telefon, Wertschließfach; TV gegen Gebühr. Kein Kühlschrank, keine eigenen Wasserkocher.",
      "Stationäre Anreise bis 11:00 Uhr, ganztägig ambulant bis 9:00 Uhr. Zimmer am Abreisetag bis 8:30 Uhr.",
      "Therapien auch samstags; Teilnahme verpflichtend. Klinikgelände 6:00–23:00 Uhr.",
      "Besuch außerhalb der Therapiezeiten; Übernachtung im Zimmer gegen Gebühr nach Reservierung (ab einer Woche Aufenthalt).",
      "Rauchfreie Klinik, Rauchen nur in gekennzeichneten Außenbereichen. Haustiere nicht möglich.",
      "Unterbringung in Einzelzimmern mit Dusche, WC, Telefon und Wertschließfach; kein Kühlschrank, Medikamente am Pflegestützpunkt kühlbar."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung im stationären Therapieangebot.",
      "Vorbereitung der Rückkehr nach Hause und an den Arbeitsplatz im psychosomatischen Konzept.",
      "Psy-RENA für psychosomatische Rehabilitandinnen und Rehabilitanden der Deutschen Rentenversicherung: 25 Gesprächstermine à 90 Minuten in geschlossener oder halboffener Gruppe plus ärztliches Aufnahme- und Abschlussgespräch.",
      "IRENA für orthopädische Indikation: bis 24 Behandlungseinheiten von mindestens 90 Minuten plus ärztliches Aufnahme- und Abschlussgespräch.",
      "Ganztägig ambulante Reha mit Sozialberatung für Ortsnahe (ohne Übernachtung, inkl. Fahrdienst und Mittagessen)."
    ],
    "therapieHinweise": [
      "Psychosomatik methodenübergreifend psychodynamisch, verhaltens- und sozialtherapeutisch, systemisch und körperzentriert.",
      "Enge Zusammenarbeit mit Orthopädie und Innerer Medizin im Haus.",
      "Osteologisches Schwerpunktzentrum inkl. Knochendichtemessung.",
      "Stationär und ganztägig ambulant; Orthopädie zusätzlich BGSW.",
      "Haus vereint Orthopädie und Psychosomatische Medizin/Psychotherapie plus internistischen Diagnostik- und Behandlungsbereich.",
      "Psychosomatik: Gruppentherapie auf tiefenpsychologischer und verhaltenstherapeutischer Grundlage."
    ],
    "factsExtra": [
      "Lage im Stadtzentrum Bad Langensalza, Parks fußläufig.",
      "Regeldauer je nach Indikation 18–42 Tage.",
      "Kostenloser WLAN-Zugang in Foyer und Cafeteria; Bahnhofstransfer nach Anmeldung.",
      "Kostenloses Telefonieren im deutschen Netz im Patientenzimmer laut Imageflyer.",
      "Abholung vom Bahnhof nach Voranmeldung; Parkplatz kostenpflichtig.",
      "Anreise bis 11:00 Uhr an der Rezeption; Therapieplan am Anreisetag in den Patientenbriefkasten."
    ],
    "wahlleistungenHinweis": "Komfort-light-Pakete vor Ort buchbar (u. a. Minibar, Wellness/Föhn). Fernseher gegen Gebühr. Parkplatz kostenpflichtig mit Wochentarifen. Begleitperson: Kosten oft in Hotelhöhe, medizinisch notwendige Begleitung anteilig über die Kasse.",
    "mitbehandlungHinweis": "Klinik und Patientenzimmer barrierefrei bzw. rollstuhlgerecht. Pflege rund um die Uhr. Gesundheitswochen-Selbstzahlerprogramm nicht geeignet bei ununterbrochener Rollstuhlabhängigkeit oder fehlender Selbstversorgung.",
    "kontraindikationen": [
      "Alter unter 18 Jahren.",
      "Akute Psychose, hirnorganisches Psychosyndrom, geistige Behinderung, starke Pflegebedürftigkeit.",
      "Akute Suizidalität.",
      "Schwere organische Erkrankungen mit medizinischem Überwachungsbedarf.",
      "Manifeste primäre Suchterkrankung.",
      "Endgültige Aufnahme erst nach ärztlicher Untersuchung; abweichende Befunde (etwa Gewicht ab 150 kg, ansteckende Erkrankungen) können den Antritt verhindern."
    ]
  },
  "ck-schielberg": {
    "alltag": [
      "Unterbringung nach der Eingewöhnungsphase in Einzelzimmern.",
      "Wohngruppe mit kleiner Küche zum gemeinsamen Kochen; Patensystem.",
      "Zwei Fitnessräume, Beachvolleyball, Tischtennis, Tischfußball sowie Sozial- und TV-Räume; eigene Fahrräder bzw. E-Bikes können mitgebracht werden.",
      "Rauchen nur an ausgewiesenen Außenplätzen; E-Zigaretten nicht gestattet.",
      "Besuch von Angehörigen ab der 4. Behandlungswoche samstags und sonntags 13:30–18:00 Uhr, mit An- und Abmeldung.",
      "Ausgänge ab der 4. Behandlungswoche; externe Lieferdienste nicht gestattet."
    ],
    "sozialdienstLeistungen": [
      "Einleitung ambulanter, berufsorientierter und stationärer Nachsorge sowie Betreutes Wohnen laut Trägerflyer.",
      "Gemeinsames Erstellen bzw. Prüfen von Bewerbungsunterlagen und Vorbereitung auf Bewerbungsgespräche.",
      "Adaption und Nachsorge im bwlv-Verbund."
    ],
    "therapieHinweise": [
      "Behandlung in drei entwicklungsspezifischen indikativen Kleingruppen.",
      "Arbeitstherapie (Hausmeisterei, Haus und Hof, Küche, Kreativ) und externe Berufspraktika in der Adaption.",
      "Abholung aus Entgiftungseinrichtungen oder Justizvollzugsanstalten möglich.",
      "Stationäre Kurzzeittherapie für Drogenabhängige.",
      "BtMG-anerkannt."
    ],
    "mitbehandlungHinweis": "Mitbehandlung von ADHS, Spielsucht, Persönlichkeitsstörungen und ungünstigen Konfliktreaktionen laut Trägerflyer.",
    "factsExtra": [
      "Umzug nach Wiesloch für Oktober 2026 auf der Trägerseite angekündigt."
    ]
  },
  "ck-schielberg-adaption-ka": {
    "alltag": [
      "Vier Einzelzimmer (15–20 m²) in denkmalgeschütztem Bürgerhaus Lessingstraße 15, Gemeinschaftsküche, Gemeinschaftsraum, zwei Bäder",
      "WLAN, TV-Anschluss, Waschmaschine",
      "Abends und am Wochenende Stadt Karlsruhe; Familienheimfahrt alle zwei Wochen am Wochenende"
    ],
    "sozialdienstLeistungen": [
      "Klärung der Wohnsituation, selbstständige Haushaltsführung, Aufbau eines abstinenzfördernden Umfelds"
    ],
    "therapieHinweise": [
      "Wöchentliche Psychotherapiegruppe",
      "Wöchentlicher Selbsthilfegruppenbesuch mit Bestätigung",
      "Betriebspraktika 20–32 Stunden/Woche; Praktikumsplatz mit ÖPNV innerhalb einer Stunde erreichbar"
    ],
    "factsExtra": [
      "Externe Adaption in der Karlsruher Innenstadt, getrennt vom Klinikcampus Marxzell-Schielberg",
      "Trägerhinweis: Fachklinik Schielberg zieht am 20.10.2026 nach Wiesloch (bwlv Fachklinik Rhein-Neckar); Standort Schielberg wird Adaptionszentrum"
    ]
  },
  "ck-schlehreut": {
    "kontraindikationen": [
      "Reine Fraueneinrichtung, Aufnahmealter 18 bis 65 Jahre.",
      "Besondere pflegerische oder klinische Einrichtungen (z. B. besondere Diäten, Rollstuhl) werden nicht vorgehalten.",
      "Therapieunfähigkeit, z. B. mangelnde Sprachbeherrschung.",
      "Gefährdung der Therapie von Mitpatientinnen, z. B. akute Psychosen."
    ],
    "alltag": [
      "Mitaufnahme von bis zu drei Kindern (0–12 Jahre); eigene Kindertagesstätte.",
      "Packliste zum Download auf der Kontaktseite.",
      "Interne Adaption in Wegscheid.",
      "Einzel- und Doppelzimmer; Mütter mit Kindern in Familienzimmern mit Nasszelle.",
      "Waschmaschinen und Trockner mit Münzeinwurf; eigenes Patienten-WLAN.",
      "Schulkinder werden in einer örtlichen Schule unterrichtet."
    ],
    "therapieHinweise": [
      "Erstbehandlung 13 Wochen bei Alkohol/Medikamenten, 22 Wochen bei Drogen; Wiederholung/Auffang/Festigung ca. 6–8 Wochen.",
      "Mitbehandlung zusätzlich auftretender Essstörungen und nicht akut psychiatrischer Störungsbilder."
    ],
    "factsExtra": [
      "42 Plätze; substituierte und schwangere Frauen werden aufgenommen.",
      "Bei längerer Abstinenz genügen engmaschige Drogentests statt frischer Entgiftung (Klinik-ABC).",
      "Live-Domain .de war leer; Klinikseite unter fachklinik-schlehreut.com."
    ],
    "sozialdienstLeistungen": [
      "Kontakt zu einer Beratungsstelle vor Aufnahme; Weiterbetreuung durch eine Beratungsstelle zum Therapieabschluss.",
      "Kosten für Begleitkinder über Haushaltshilfeantrag.",
      "In der Adaption: Bewerbungstraining, Berufsinformationszentrum Passau, interne Arbeitserprobung in Handwerk und Hauswirtschaft."
    ]
  },
  "ck-schlossklinik-buchau": {
    "alltag": [
      "Alle Zimmer als Einzelzimmer belegt; Renovierung 2016–2018",
      "Besuch außerhalb der Therapien möglich; Café Maximiliana",
      "Psychosomatik-Patientinnen und -Patienten können in der Partnerklinik Federseeklinik untergebracht werden",
      "Anreise in der Regel bis 10 Uhr, damit die Aufnahmeuntersuchung noch am Anreisetag stattfinden kann.",
      "Hauseigenes Bewegungsbad mit Thermalwasser (32 °C) zu bestimmten Zeiten; Adelindis Therme für Patientinnen und Patienten vergünstigt.",
      "Wochenendbeurlaubung aus versicherungstechnischen Gründen nicht vorgesehen."
    ],
    "therapieHinweise": [
      "Integratives Konzept: tiefenpsychologisch, systemisch, verhaltens- und körpertherapeutisch",
      "Paargespräche und Familienberatung bei Bedarf",
      "Fachabteilung Psychosomatik rund 90 Betten"
    ],
    "factsExtra": [
      "Akademisches Lehrkrankenhaus der Universität Ulm; beihilfefähig; barrierefrei",
      "Eigenständige Indikationen Psychosomatik und Neurologie unter einem Dach",
      "Arzneimittel für die gesamte Aufenthaltsdauer mitbringen.",
      "Parkplatz Bittelwiesen kostenpflichtig; Monatskarte am Automaten."
    ],
    "wahlleistungenHinweis": "Begleitperson nach Möglichkeit im Zimmer, auch für einzelne Tage; Preise auf der Klinikseite.",
    "sozialdienstLeistungen": [
      "Patientenfahrservice zur Anschlussrehabilitation in einem definierten Umkreis, Abholung aus Krankenhaus oder von zu Hause nach Anmeldung."
    ],
    "mitbehandlungHinweis": "Eigenständige Abteilungen Neurologie (Phasen C und D) und Psychosomatik unter einem Dach. Psychosomatik-Patientinnen und -Patienten können in der Partnerklinik Federseeklinik untergebracht werden; ärztlich, therapeutisch und pflegerisch ohne Nachteil."
  },
  "ck-schloz": {
    "kontraindikationen": [
      "Akute Psychosen mit Produktivsymptomen; Psychosen mit schweren Basisstörungen.",
      "Schwere Depressionen mit psychotischen Symptomen; akute Suizidalität.",
      "Schwere hirnorganische Beeinträchtigungen.",
      "Emotional instabile Zustandsbilder ohne ausreichende Selbstverfügbarkeit.",
      "Schwere körperliche Beeinträchtigungen."
    ],
    "alltag": [
      "Besuch ab der zweiten Woche; auf dem Zimmer nur im Einzelzimmer; außerhalb der Therapie bis 21:00 Uhr.",
      "Rauchen nur im Raucherpavillon; Klinikgebäude und Gelände suchtmittelfrei.",
      "Mahlzeiten Mo–Fr sowie Abendessen am Wochenende sind Teil des Therapieprogramms.",
      "Nachtruhe unter der Woche 23:00–6:30 Uhr, vor therapiefreien Tagen 24:00–6:30 Uhr; ab 22:00 Uhr Klinikruhe.",
      "38 Behandlungsplätze in Einzel- und Doppelzimmern in zwei Häusern im parkähnlichen Garten.",
      "Fusion mit Haus Renchtal: Frauenbereich mit Einzelzimmerstandard; Speisesaal mit frauenspezifischer Zeitschiene."
    ],
    "wahlleistungenHinweis": "Hunde nach Voranmeldung als Wahlleistung im Zimmer möglich; Versorgung in der therapiefreien Zeit, Leinenpflicht, gesonderte Waschmaschine für Tierwäsche.",
    "sozialdienstLeistungen": [
      "Wiedereingliederung durch Adaption.",
      "Ambulante Nachsorge und berufsorientierte Nachsorge."
    ],
    "therapieHinweise": [
      "Frauenspezifische Entwöhnung bei Alkohol- und Medikamentenabhängigkeit.",
      "Mitbehandlung psychiatrischer Begleiterkrankungen im remittierten Zustand.",
      "Generationensensible Behandlung; Begleittiere (Hunde/Katzen) unter bestimmten Voraussetzungen."
    ],
    "factsExtra": [
      "Vollstationär und tagesklinisch ab 18 Jahren.",
      "Umzug/Fusion mit Haus Renchtal für 28.09.2026 auf der Trägerseite angekündigt."
    ],
    "mitbehandlungHinweis": "Persönlichkeits-, Traumafolge- und Angststörungen sowie affektive und psychotische Störungen im remittierten Zustand werden mitbehandelt."
  },
  "ck-schoenbirken": {
    "alltag": [
      "Einzel- oder Doppelzimmer mit Duschbad; zwei behindertengerechte Zimmer; wenige Einbettzimmer in der Villa.",
      "Arbeitstherapie in Küche, Hauswirtschaft, Garten oder im Tierbereich; Mitverantwortung für das Zusammenleben im Haus.",
      "Holz- und Kreativwerkstatt mit Keramikofen, Sport- und Physioraum, Fahrradverleih, PC-Raum, Kaminzimmer.",
      "Frischküche im Haus, auch vegetarisch; Fitnessraum.",
      "Moderne Einzel- oder Doppelzimmer mit Duschbad; zwei behindertengerechte Zimmer.",
      "Vollwertküche und Speisesaal; Fitnessraum und Sportangebot."
    ],
    "sozialdienstLeistungen": [
      "Aufnahme-Team unterstützt bei Kostenübernahme, Suche einer Beratungsstelle oder eines passenden Krankenhauses.",
      "Informationsgespräch inklusive Besichtigung nach Terminabsprache.",
      "Kombitherapie zur Vorbereitung von Nachsorge, Weiterbehandlung und Arbeitsperspektive.",
      "Kombitherapie mit Vorbereitung von Nachsorge, Weiterbehandlung und Arbeitsperspektive."
    ],
    "therapieHinweise": [
      "Integratives Konzept mit verhaltenstherapeutischen, systemischen und gestalttherapeutischen Elementen.",
      "Alkoholentwöhnungsbehandlung, auch für Paare und schwangere Frauen.",
      "Frauengruppe, Tabakentwöhnung, Training sozialer Kompetenz, Physiotherapie und Entspannungsverfahren.",
      "Anti-Alkohol-Training (AAT, PC-gestützt); frühe Anbindung an regionale Selbsthilfegruppen.",
      "Therapiedauer 3–4 Monate; 32 Plätze.",
      "Behandlung alkoholabhängiger Paare inkl. paarspezifischem Suchtverhalten."
    ],
    "factsExtra": [
      "Denkmalgeschützte Villa mit Neubauten in Vielitzsee/OT Strubensee; Garten und Tiergehege.",
      "Zertifiziert nach DIN EN ISO 9001 und QReha plus (BAR-Anforderungen).",
      "Ehemaligentreffen als fester Bestandteil.",
      "Wechsel von stationärer in ganztägig ambulante Form (Kombitherapie) ausgewiesen."
    ]
  },
  "ck-schorborn": {
    "kontraindikationen": [
      "Substitutionsgestützte Entwöhnung wird im Neuen Land nicht angeboten."
    ],
    "mitbehandlungHinweis": "Mitbehandlung posttraumatischer Belastungsstörungen mit haltgebenden imaginativen Verfahren. Medienabhängigkeit als Zusatzindikation, konzeptionell mit der Fachstelle computence in Hannover.",
    "alltag": [
      "Therapeutische Lebensgemeinschaft; Mitarbeitende und Ehemalige aus der Nachsorge leben vor Ort.",
      "Geregelter Tagesablauf, gutes Essen, Gemeinschaft; Arbeitstraining und Freizeitangebote."
    ],
    "sozialdienstLeistungen": [
      "Hilfe bei Berufsfindung und Eingliederung ins Arbeitsleben.",
      "Nachsorgeperspektiven: Mitarbeit, Ausbildung, Wohngruppen; ambulante Suchtnachsorge auch als Kombimodell mit Eingliederungshilfe."
    ],
    "therapieHinweise": [
      "Christlich orientierte stationäre Entwöhnung, Schwerpunkt illegale Drogen; auch Medienabhängigkeit.",
      "Wöchentliche Einzel- und Gruppengespräche.",
      "Bereitschaft, sich mit Sinn- und Wertefragen auseinanderzusetzen.",
      "Ziel: Leben ohne Suchtmittel und ohne Substitution."
    ],
    "factsExtra": [
      "Anerkennung nach § 35 BtMG (Therapie statt Strafe) laut Trägerseite.",
      "Standort Schorborn ist eines von zwei Therapiezentren des Trägers (zusammen 40 Plätze); Kindermitbetreuung ist am Standort Amelith ausgewiesen, nicht in Schorborn.",
      "Aufnahmefragebogen, Kurzkonzeption und Flyer im Downloadbereich."
    ]
  },
  "ck-schwedenstein": {
    "kontraindikationen": [
      "Schwere körperliche Erkrankung oder Behinderung, die die regelmäßige Teilnahme am Reha-Angebot verhindert.",
      "Akute Psychosen; akute Suizidalität.",
      "Hirnorganisches Psychosyndrom, das Psychotherapie nicht zulässt.",
      "Floride substanzgebundene Abhängigkeitserkrankung; notwendige Entgiftungsbehandlung; Alkoholabhängigkeit.",
      "Minderjährigkeit; BMI unter 18 kg/m²; Körpergewicht über 180 kg."
    ],
    "alltag": [
      "Alkohol, Cannabis und sonstige Drogen in der Klinik führen laut Patienteninformationsmappe zur Entlassung; auch als alkoholfrei deklarierte Sorten.",
      "Ruhezeiten 13–13.30 Uhr und 22–6 Uhr; Mutter/Vater-Kind-Bereich Mittagsruhe 12–14 Uhr.",
      "Häuser A und C täglich 21 Uhr geschlossen; Patientinnen und Patienten mit kleinen Kindern: Kinder bis 21 Uhr ins Bett.",
      "Sexuelle Kontakte zu Mitpatientinnen und Mitpatienten nicht gestattet.",
      "Zimmerreinigung montags, mittwochs und freitags.",
      "Therapieplan im Postfach; Änderungen täglich ab 16:00 Uhr prüfen."
    ],
    "therapieHinweise": [
      "Schwerpunkte u. a. PTBS, Psychoonkologie, chronischer Schmerz, Tinnitus, somatoforme und funktionelle Störungen.",
      "Essstörungen laut Klinikflyer ab 18 Jahren und ab BMI 16 kg/m², sofern ICD-Kriterien und genehmigter Reha-Antrag vorliegen.",
      "Therapie vorwiegend in Gruppen, ergänzt durch Einzelgespräche; Ernährungsberatung bei Essstörungen."
    ],
    "factsExtra": [
      "Anamnesefragebogen: bei bekannter Abhängigkeit nachweislicher Substanzverzicht über mindestens sechs Monate (Abstinenzbedingung, kein Entgiftungsnachweis des Hauses).",
      "Am Anreisetag Aufnahmegespräch mit dem Stationsarzt und Vereinbarung der Reha-Ziele; weitere Untersuchungen bei Bedarf am zweiten Tag.",
      "Oberarztvisite in der Regel 14-tägig je nach Indikation."
    ],
    "mitbehandlungHinweis": "Aufnahme bei Gewicht über 180 kg und BMI unter 18 ausgeschlossen. Eltern-Kind-Station und Begleithund laut Trägerangabe möglich.",
    "sozialdienstLeistungen": [
      "Sozialdienst nimmt bei Bedarf Kontakt zu Behörden und Betriebsärztinnen bzw. Betriebsärzten auf und bereitet die Reha-Nachsorge vor."
    ],
    "wahlleistungenHinweis": "Fernbedienung, Haartrockner und Bademäntel gegen Gebühr an der Rezeption; Kühlschrankfach gegen einmalige Gebühr."
  },
  "ck-seehof": {
    "alltag": [
      "176 Einzelzimmer und vier Doppelzimmer für gemeinsam anreisende Paare; vier barrierefreie Zimmer.",
      "Alle Zimmer mit Duschbad, Schreibtisch, Safe und Telefon; Nichtraucherzimmer.",
      "WLAN und TV kostenfrei; Buffet im Speisesaal.",
      "Alle Patientinnen und Patienten nehmen am Entspannungsangebot (Basisprogramm) teil; dazu das grüne Laken aus dem Zimmer mitbringen.",
      "Nachts Arzt oder Ärztin und Pflegekraft im Bereitschaftsdienst; roter Rufknopf im Zimmer.",
      "Alle Zimmer mit Duschbad, Bett, Schreibtisch, Garderobe, Safe und Telefon; Nichtraucherzimmer."
    ],
    "sozialdienstLeistungen": [
      "Sozialtherapeutische Begleitung zu sozialmedizinischen und beruflichen Fragen, insbesondere in der Psychokardiologie.",
      "Beratung zu Schwerbehindertenrecht, Lohnfortzahlung, Krankengeld und Übergangsgeld.",
      "Klärung der beruflichen Situation und der häuslichen Versorgung nach der Reha.",
      "Unterstützung bei Pflegeversicherung, Rentenfragen, Selbsthilfegruppen und Reha-Nachsorge."
    ],
    "therapieHinweise": [
      "Schwerpunkt Verhaltenstherapie; Einzeltherapie mit Bezugstherapeutin oder Bezugstherapeut.",
      "Gruppen u. a. Depression, Angst, Schmerz und Stressbewältigung.",
      "Eigene psycho-kardiologische Reha; Post-COVID-Programm.",
      "Chef- oder Oberarztvisiten unmittelbar nach Aufnahme, danach in zwei- bis dreiwöchigem Turnus.",
      "Zu Beginn Abstimmung der Therapieziele mit Bezugstherapie, Bewegungstherapie, Ergotherapie, Sozialarbeit und Visite; körperliche Untersuchung, Labor und Psychodiagnostik.",
      "Psychosomatik mit Schwerpunkt Verhaltenstherapie; fester Bezugstherapeut für den gesamten Aufenthalt."
    ],
    "factsExtra": [
      "Drei Abteilungen: Kardiologie, Psychosomatik, Psychokardiologie.",
      "Teilstationäre bzw. ambulante Reha möglich, soweit medizinisch geeignet.",
      "Ernährungsstudio für theoretische und praktische Schulung.",
      "Versorgungsvertrag nach § 111 SGB V; Kostenträger u. a. Rentenversicherung, GKV/PKV, Berufsgenossenschaften und Beihilfe.",
      "Salzgrotte in der Physikalischen Therapie; Ernährungsstudio für praktische Umsetzung.",
      "Post-COVID im Rahmen der dualen Reha ausgewiesen."
    ],
    "mitbehandlungHinweis": "Psychokardiologie: internistisch-kardiologische und psychosomatische Behandlung im selben Konzept."
  },
  "ck-seewiesen": {
    "kontraindikationen": [
      "Akute Suizidalität, akute Psychosen, akute manische Episode.",
      "Alkohol-, Drogen- und Medikamentenabhängigkeit.",
      "Psychotherapie setzt ausreichende deutsche Sprachkenntnisse voraus.",
      "Akute Suizidalität, akute Psychosen und akute manische Episode schließen die Aufnahme aus.",
      "Alkohol-, Drogen- und Medikamentenabhängigkeit sind nicht der Auftrag der psychosomatischen Abteilung.",
      "Ausreichende deutsche Sprachkenntnisse werden vorausgesetzt."
    ],
    "alltag": [
      "Waschmaschinen, Waschmittel und Trockner als Münzgeräte; Bügelmöglichkeit vorhanden.",
      "Abschließbare Schublade im Zimmer; Klinik übernimmt keine Haftung für Wertgegenstände.",
      "Schwimmbad und Freizeitaktivitäten nicht bei jeder Erkrankung möglich.",
      "Einzelzimmer mit eigener Dusche und WC, Telefon, Fernseher, Radio und Notrufanlage.",
      "Elektrisch verstellbares Bett. Klinik weitgehend barrierefrei ausgewiesen.",
      "Einzelzimmer mit eigener Dusche und WC, elektrisch verstellbarem Bett, Telefon, Fernseher, Radio und Notrufanlage."
    ],
    "therapieHinweise": [
      "Gruppen- und Einzeltherapie mit festem Bezugsteam.",
      "Essstörungen, Zwang, PTBS, dissoziative und Persönlichkeitsstörungen nur nach vorheriger Klärung.",
      "Gruppen- und Einzeltherapien mit festem Bezugstherapeutenteam.",
      "Therapiebausteine über mehrere Wochen in der Gruppe, aufeinander aufbauend.",
      "Integratives Konzept mit verhaltensmedizinischen und tiefenpsychologischen Schwerpunkten sowie systemischen Ansätzen.",
      "Gruppen- und Einzeltherapie mit festem Bezugstherapeutenteam."
    ],
    "sozialdienstLeistungen": [
      "Anmeldung nach vorliegender Kostenzusage bei Rentenversicherung, GKV, PKV, Beihilfe oder Sozialhilfeträger.",
      "Familienorientierte Erwachsenenrehabilitation (FER) in der Psychosomatik: Kinderhaus-Betreuung während der Therapiezeiten."
    ],
    "factsExtra": [
      "Psychosomatik ist eine Abteilung neben Kardiologie und Orthopädie.",
      "Aktuelle Vorbefunde sollen mitgebracht werden, um Doppeluntersuchungen zu vermeiden.",
      "Eltern-Kind-Betreuung im Kinderhaus für Kinder von etwa 1 bis 12 Jahren; keine Beschulung, Hausaufgabenhilfe möglich."
    ],
    "mitbehandlungHinweis": "Standarddiagnostik bei Aufnahme: ärztliche und psychologische Untersuchung, Testdiagnostik, Ruhe-EKG und Laborscreening."
  },
  "ck-segeberg-psom": {
    "alltag": [
      "Freundliche helle Zimmer mit eigenem Dusch-Bad, TV, Telefon und WLAN.",
      "Klinikbereiche rollstuhl- und behindertengerecht; Lage wenige Schritte vom Großen Segeberger See.",
      "Vollkost, leichte Kost, vegetarische Gerichte und verordnete Diäten; Unverträglichkeiten bei Aufnahme mitteilen.",
      "Begleitpersonen möglich, Kinder auf Nachfrage; Kinderbetreuung während der Therapiezeiten."
    ],
    "sozialdienstLeistungen": [
      "Sozialdienst der Klinik für Psychosomatische Medizin und Psychotherapie (Ansprechpartnerinnen Hanna Kracht und Laura Meier).",
      "Hausweiter Sozialdienst: Formulare zu Pflegegrad und AHB, Schwerbehinderung, häusliche und Kurzzeitpflege, Kontakt zu Kostenträgern."
    ],
    "therapieHinweise": [
      "Therapeutischer Schwerpunkt Gruppentherapie.",
      "Reha laut Klinik kein Ersatz für eine ambulante Richtlinienpsychotherapie; Empfehlung, vor Antritt eine ambulante Anschlussperspektive zu klären.",
      "Standort psychosomatische Reha: Klosterkamp 15."
    ],
    "factsExtra": [
      "Gütesiegel „Medizinische Rehabilitation in geprüfter Qualität“ (TÜV Hessen / BAR) für die psychosomatische Reha am Standort Klosterkamp 15.",
      "Freizeitprogramm u. a. Begrüßungsveranstaltung, Bastelabend, Tischtennis, Filmabend."
    ],
    "mitbehandlungHinweis": "Im Verbund Kardiologie/Orthopädie/Neurologie; Auftrag hier ist die psychosomatische Rehabilitation, nicht die Akutstation."
  },
  "ck-serrahn": {
    "alltag": [
      "Lage am Krakower See; Freizeit u. a. Kanu, Angeln, Fahrrad, Billard, Volleyball, Fitnessraum, Sauna und Grillplatz.",
      "Bis zu 8 der 40 Plätze für Frauen.",
      "Zwei- oder Einbettzimmer."
    ],
    "therapieHinweise": [
      "Gruppen- und Einzeltherapie; Ergo- und Arbeitstherapie in Holz- und Metallwerkstatt.",
      "Sport- und Bewegungstherapie, u. a. Bogenschießen; Entspannungstherapie.",
      "Indikativgruppen u. a. soziales Kompetenztraining, Akzeptanztherapie und Rückfall.",
      "Berufliche Beratung und Praktika; Angehörigenarbeit.",
      "Seelsorge und biblisch orientierte Lebenshilfe; Hundehaltertraining."
    ],
    "factsExtra": [
      "Träger Serrahner Diakoniewerk (Blaues Kreuz); Orientierung am christlichen Menschenbild.",
      "Klinikseite: Entwöhnung bei Cannabis und illegalen Drogen, 40 Plätze; Regeldauer sechs Monate, verkürzbar bei erreichtem Ziel.",
      "Kostenträger: Rentenversicherung, Krankenkasse oder Sozialamt."
    ],
    "kontraindikationen": [
      "Paare werden nicht zeitgleich aufgenommen."
    ],
    "sozialdienstLeistungen": [
      "Antragstellung in der Regel mit Suchtberatungsstelle, eigener Beratungsstelle des Trägers, sozialpsychiatrischem Dienst oder Krankenhaus-Sozialdienst."
    ],
    "mitbehandlungHinweis": "Zusätzliche Alkohol- oder Medikamentenproblematik und psychiatrische Erkrankungen werden mitbehandelt."
  },
  "ck-sieg-reha": {
    "alltag": [
      "Ganztägig ambulantes Setting an den Standorten Hennef (Mittelstraße) und Alfter.",
      "In der Regel 15–30 Therapieeinheiten à 3–6 Stunden, je nach Kostenträger 3–5 Termine pro Woche.",
      "Verpflegung durch die hauseigene Küche; Ruhemöglichkeiten in separaten Räumen.",
      "Fahrdienst für nicht mobile Rehabilitandinnen und Rehabilitanden."
    ],
    "sozialdienstLeistungen": [
      "Hinweise der Sozialberatung zu Übergangsgeld statt Krankengeld sowie zur stufenweisen Wiedereingliederung.",
      "Nachsorge IRENA und Psy-RENA; Psy-RENA nach Ende auch als Selbstzahler möglich.",
      "Sozialberatung.",
      "Planung und Einleitung von Leistungen zur Teilhabe am Arbeitsleben, Umschulung oder beruflicher Wiedereingliederung."
    ],
    "wahlleistungenHinweis": "Weiterbehandlung auf Selbstzahlerbasis möglich. Heilmittel (Physio-, Ergo-, Logopädie) auch auf Verordnung oder als Selbstzahler.",
    "therapieHinweise": [
      "Einzel- und Gruppenpsychotherapie bei Bezugstherapeutin/Bezugstherapeut.",
      "Paar- und Familiengespräche, Atem- und Körpertherapie, Entspannung, Training sozialer Kompetenzen.",
      "Ergo- und Arbeitstherapie, Sport, Kunsttherapie, Ernährungsberatung, Physiotherapie; MBOR."
    ],
    "factsExtra": [
      "Ganztägig ambulantes Setting.",
      "Fahrdienst auf der Leistungsseite genannt.",
      "Kleine indikationsspezifische Gruppen."
    ]
  },
  "ck-sinova-schussental": {
    "kontraindikationen": [
      "Patientinnen und Patienten mit deutlichem Untergewicht (BMI unter 15) können in der Regel nicht behandelt werden (Flyer Essstörungen).",
      "Akute psychische Krisen.",
      "Akute Gefahr von Selbsttötung.",
      "Suchterkrankungen ohne ausreichende Abstinenzfähigkeit.",
      "Akute Schizophrenien und akute schizoaffektive Störungen.",
      "Schwere somatische Erkrankungen bzw. Einschränkung von Selbstversorgung oder Mobilität nur nach Einzelfallabsprache."
    ],
    "alltag": [
      "Besuch in der therapiefreien Zeit in der Cafeteria; Besuche auf Zimmer oder Station nicht gestattet.",
      "Übernachtung von Angehörigen nur am Wochenende nach schriftlicher Bestätigung des Therapeuten.",
      "Wertfach im Zimmer; Zimmer-, Wertfach- und Postfachschlüssel bei Ankunft.",
      "Abreise: Zimmer bis 8:00 Uhr verlassen; Zuzahlung, Telefon und TV vor Abreise begleichen.",
      "Handy nur im Zimmer; TV-Gerät an der Rezeption anmeldbar.",
      "Stationäre Unterbringung; zusätzlich tagesklinische Behandlung möglich."
    ],
    "sozialdienstLeistungen": [
      "Reha-Eilverfahren Psychosomatik: Antragsunterlagen können aus der Akutbehandlung über die Klinik an die DRV Baden-Württemberg übermittelt werden.",
      "Beratung zur Antragstellung; ambulante Nachsorge genannt.",
      "Patientenaufnahme telefonisch 07525 93-2726 oder -2729."
    ],
    "wahlleistungenHinweis": "TV-Gerät an der Rezeption anmeldbar; Zimmertelefon für Gespräche nach außen. Übernachtung von Angehörigen am Wochenende nach Genehmigung; Preise an Rezeption oder Patientenaufnahme.",
    "mitbehandlungHinweis": "Am Aufnahmetag körperliche Untersuchung durch den Funktionsarzt für somatische Medizin; Medikamente der Klinik, mitgebrachte Präparate am Anreisetag beim Pflegedienst abgeben.",
    "therapieHinweise": [
      "Behandlungsprogramm Depression gemäß Reha-Therapiestandard.",
      "Programm Adipositas (bei Essstörung oder als Komorbidität).",
      "Programm für besondere berufliche Problemlagen, Wiedereingliederung und Leistungsbeurteilung."
    ],
    "factsExtra": [
      "Rehaklinik neben psychosomatischem Fachkrankenhaus am Campus Aulendorf.",
      "Versorgungsverträge § 109 und § 111 SGB V; beihilferechtlich und von der PKV als gemischte Anstalt anerkannt.",
      "Chefarzt Reha Dr. Thomas Wangemann."
    ]
  },
  "ck-skh-rodewisch": {
    "alltag": [
      "Alkoholische Getränke grundsätzlich nicht gestattet; Rauchen nur in den vorgesehenen Räumen.",
      "Mitbringen von Tieren und Suchtmitteln nicht gestattet.",
      "Ein- und Zweibettzimmer mit Sanitärbereich.",
      "Besuchszeiten Mi 13–18 Uhr, Fr 17–18 Uhr, So/Feiertag 13–18 Uhr."
    ],
    "sozialdienstLeistungen": [
      "Lebenspraktisches Training und begleitende Sozialarbeit.",
      "Arbeit mit Angehörigen im Therapieprogramm genannt.",
      "Unterstützung bei sozialen und persönlichen Problemlagen.",
      "Motivierung zur ambulanten Nachsorge."
    ],
    "factsExtra": [
      "30 Therapieplätze in Haus B5.",
      "Grundbehandlungsdauer bis zu 16 Wochen.",
      "Reha-Station B5 für Alkohol- und Medikamentenabhängigkeit; Kostenübernahme durch Rentenversicherung, Sozialhilfeträger oder gesetzliche Krankenkassen.",
      "Haus B5: Räume für Gruppengespräche, Entspannungs-, Sport-, Arbeits- und Kreativtherapie."
    ],
    "therapieHinweise": [
      "Frauen- und männerspezifische Therapieangebote; Paartherapie möglich.",
      "Gruppen- und Einzeltherapie inkl. videogestütztem Rückfallpräventionstraining.",
      "Entspannung, Kreativ-, Arbeits- sowie Sport- und Bewegungstherapie; Ernährungsberatung, Genusstraining, Akupunktur."
    ]
  },
  "ck-skm-reha-koeln": {
    "sozialdienstLeistungen": [
      "Schuldenregulierung sowie juristische und finanzielle Fragestellungen.",
      "Suche nach Kontakten zu Selbsthilfegruppen und Netzwerkprojekten.",
      "Berufliche/schulische Orientierung und Erstellung von Bewerbungsunterlagen.",
      "Planung individueller Nachsorge (ARS oder ambulant betreutes Wohnen)."
    ],
    "therapieHinweise": [
      "Rückfallprophylaxe-Training; regelmäßige ärztliche Sprechstunden.",
      "Einbeziehung von Angehörigen und Partnerinnen bzw. Partnern.",
      "Weiterführung der therapeutischen Behandlung nach Entwöhnung.",
      "Externe Arbeitspraktika zur beruflichen Belastungsfähigkeit."
    ],
    "alltag": [
      "15 Einzelzimmer und Gemeinschaftsräume.",
      "Zusätzlich ganztägig ambulante Adaption für Rehabilitand:innen mit eigener Wohnung in Köln.",
      "Lebenspraktische Hilfe im Alltag; Sport- und Kulturangebote."
    ],
    "factsExtra": [
      "Ziel: Wiederherstellung der Erwerbsfähigkeit und soziale Integration.",
      "Träger Sozialdienst Katholischer Männer e.V., eigener Kölner Campus."
    ]
  },
  "ck-sonnenberg": {
    "alltag": [
      "Checkliste: Sport- und Freizeitkleidung, Badesachen, festes Schuhwerk, wetterfeste Kleidung.",
      "Belegung als Einzelzimmer mit eigenem Bad; teilweise Balkon, Telefon und Kabelfernsehen.",
      "Barrierarm, rollstuhlgerechte Zimmer vorhanden.",
      "Mittagessen mit zwei Menüs; vegetarische, fettreduzierte und muslimische Kost. Vegane Auswahl am Büfett, keine separate vegane Zubereitung.",
      "WLAN und Telefon über Medienpauschale. Wasch- und Bügelraum im Haus A gegen Gebühr.",
      "Rauchen nur in gekennzeichneten Bereichen, nicht auf Zimmer oder Balkon. Alkohol führt zur Entlassung."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutisch fundierte psychosomatische Intensivtherapie, ergänzt durch psychodynamische Elemente.",
      "Indikativgruppen Depressions- und Schmerzbewältigung, soziales Kompetenz- und Stressbewältigungstraining.",
      "Psychosomatik verhaltenstherapeutisch, ergänzt um psychodynamische Elemente.",
      "Gruppen: soziales Kompetenztraining, Stressbewältigung, Depressions- und Schmerzbewältigung.",
      "MBOR (medizinisch-berufliche Orientierung) und BGSW nach Arbeits- oder Wegeunfall ausgewiesen.",
      "Multimodale Schmerztherapie mit wöchentlichem interdisziplinärem Assessment."
    ],
    "factsExtra": [
      "Orthopädie, Kardiologie und Psychosomatik am selben Reha-Zentrum.",
      "Aufnahme von Begleitpersonen möglich.",
      "Kein Fahrservice. Zimmerzuordnung Haus A oder B nach medizinischen Belangen.",
      "AHB unmittelbar nach Krankenhausaufenthalt; Heilverfahren stationär oder ganztägig ambulant.",
      "Nahrungsmittelunverträglichkeiten nur bei vorgelegtem Allergiepass."
    ],
    "wahlleistungenHinweis": "Chefarztbehandlung sowie MEDIAN select (erweiterter Zimmerkomfort) und MEDIAN premium (persönlicher Service) gegen Aufpreis.",
    "kontraindikationen": [
      "Aufnahme nur bei eigenständiger Versorgung oder mit Begleitperson.",
      "Körpergewicht über 130 kg schließt die Aufnahme aus.",
      "Akut-Einweisungen nicht möglich. Keine Kinder, keine Haustiere."
    ],
    "sozialdienstLeistungen": [
      "Klärung der häuslichen, familiären und beruflichen Situation.",
      "Informationen zu Grad der Behinderung, Übergangsgeld und Leistungen zur Teilhabe am Arbeitsleben."
    ],
    "mitbehandlungHinweis": "Orthopädie, Kardiologie und Psychosomatik am Standort. Begleitperson im Beistellbett oder nach Verfügbarkeit im Einzelzimmer."
  },
  "ck-soteria-adaption": {
    "mitbehandlungHinweis": "Nebendiagnosen wie affektive Erkrankungen, Angststörungen, Persönlichkeitsstörungen, psychosomatische Störungen und nicht-stoffgebundene Abhängigkeiten (z. B. Spielsucht) sind laut Klinikseite aufnahmefähig. Ärztliche Sprechstunden und Nachtbereitschaft durch medizinisch geschultes Personal.",
    "alltag": [
      "23 Einzelappartements mit Küche, Bad, Fernseher und Telefon.",
      "Alltagsnahe Erprobung nach abgeschlossener Entwöhnung, in der Regel drei Monate."
    ],
    "sozialdienstLeistungen": [
      "Zusammenarbeit mit Beratungsstellen, Fachkliniken, Ärzten, Selbsthilfe, Betrieben, Ämtern und Leistungsträgern."
    ],
    "therapieHinweise": [
      "Zehnwöchiges Betriebspraktikum, möglichst auf dem ersten Arbeitsmarkt; zwei Ergotherapeut:innen zur Praktikumsorganisation.",
      "Ärztliche, suchttherapeutische, ergotherapeutische und sozialarbeiterische Begleitung."
    ],
    "factsExtra": [
      "Standort Ludwig-Erhard-Straße 21, eigener Campus neben der Stammklinik.",
      "Für Männer und Frauen mit Alkohol-, Medikamenten- und Drogenabhängigkeit nach Phase I.",
      "Beantragung durch die abgebende Entwöhnungsklinik; Übergang rund fünf Wochen vor Beginn vorbereitbar."
    ]
  },
  "ck-soteria-leipzig": {
    "alltag": [
      "15 Euro Pfandgeld für Zimmerschlüssel und Wertfach.",
      "Regelhaft Doppelzimmer; Einzelzimmer nur in Ausnahmefällen aus medizinischen Gründen.",
      "Handy außerhalb der Therapieeinheiten im Zimmer; auf dem Gelände wochentags ab 18:30 Uhr, Wochenende/Feiertag ab 13:00 Uhr.",
      "Besuch auf der Aufnahmestation Sa/So/Feiertag 13–17 Uhr; nach Verlegung in die Bezugsgruppe zusätzlich täglich 18:30–21:30 Uhr.",
      "Keine Geräte zur Mediennutzung, keine Laptops, keine Geräte zum Erwärmen von Lebensmitteln; Musikinstrument nach Absprache.",
      "Gottesdienst an Sonn- und Feiertagen nach Absprache."
    ],
    "therapieHinweise": [
      "Stationäre Rehabilitation in der Regel 12–16 Wochen bei Alkohol- und Medikamentenabhängigkeit, 22–24 Wochen bei Drogenabhängigkeit; Verlängerung oder Verkürzung nach medizinisch-therapeutischer Notwendigkeit.",
      "Arbeitstherapie mit Schwerpunkt externe Praktika, begleitet durch Ergotherapie.",
      "Sport- und Bewegungstherapie; Adipositas- und Diabetikergruppen mit Sport.",
      "Berufspraktikum zur Überprüfung der Erwerbsfähigkeit."
    ],
    "factsExtra": [
      "Abholung vom Hauptbahnhof Leipzig nach vorheriger Absprache über die Patientenverwaltung möglich.",
      "Hausordnung Rehabilitationsbereich Soteria Klinik öffentlich hinterlegt.",
      "Zertifikat „Medizinische Rehabilitation in geprüfter Qualität“ (TÜV Hessen) gemeinsam mit der Adaption.",
      "Rückfall führt nicht zwangsläufig zur Entlassung; Fortsetzung nach Entgiftung und Aufarbeitung möglich."
    ],
    "kontraindikationen": [
      "Drogeninduzierte Psychosen sollen abgeklungen, psychotische Episoden bei schizophrenen Patient:innen remittiert sein; leichte Restsymptomatik bei Einsicht laut Klinikseite in der Regel behandelbar.",
      "Keine Paaraufnahme.",
      "Keine Haustiere."
    ],
    "sozialdienstLeistungen": [
      "Anleitung zur eigenverantwortlichen Klärung, Vermittlung in Nachsorgeeinrichtungen, Berufs- und Rentenfragen.",
      "Begleitung nach Fähigkeiten und individuellem Bedarf."
    ],
    "mitbehandlungHinweis": "Patient:innen mit schizophrenen bzw. schizoaffektiven Psychosen, bipolaren Störungen, drogeninduzierten Psychosen, hirnorganischen Einschränkungen, affektiven Störungen oder Angststörungen bei bestehender Rehabilitationsfähigkeit laut FAQ grundsätzlich möglich."
  },
  "ck-sotterhausen": {
    "alltag": [
      "20 Euro Schlüsselpfand.",
      "Nicht mitbringen: Laptops, Spielkonsolen, USB-Sticks, gebrannte CDs/DVDs, Lavalampen, Lösungsmittel und Raumerfrischer.",
      "Kosmetika mit Methanol, Ethanol, Butanol oder Propanol sowie Sprays sind nicht gestattet; Deoroller und Pumpsprays möglich.",
      "Einzel- und Doppelzimmer mit eigenem Bad.",
      "Waschmaschinen und Wäschetrockner vorhanden.",
      "Turnhalle, Fitness, Tischtennis, Beachvolleyball, Fußball, Billard, Computerraum, Garten."
    ],
    "kontraindikationen": [
      "Keine Paaraufnahme."
    ],
    "sozialdienstLeistungen": [
      "Plant die Zeit nach der Behandlung, klärt finanzielle Fragen und rechtliche Angelegenheiten laut Faltblatt 2026."
    ],
    "therapieHinweise": [
      "Frauen- und männerspezifische Gruppen.",
      "Angehörige über Seminare und Familiengespräche.",
      "Sport- und erlebnispädagogische Angebote (u. a. Kanu, Kletterwald, Beachvolleyball).",
      "Indikative Schwerpunkte u. a. berufliche Orientierung, Psychose und Sucht, ADHS und Sucht, Spielsucht."
    ],
    "factsExtra": [
      "Nahtlosverfahren der DRV Mitteldeutschland: Aufnahme aus der Entzugseinrichtung möglich.",
      "Alter 18–35 Jahre, illegale Drogen und Alkohol."
    ]
  },
  "ck-spittler": {
    "alltag": [
      "Eltern-Kind-Zimmer, Fitnessbereich, Werkstatt, Bibliothek; Einrichtung behindertengerecht",
      "Geschützter Bereich für Frauen; Paartherapie nach Vorgespräch",
      "Besuch ab dem ersten Tag in den Nachmittagsstunden; offene Ehemaligengruppe und Ehemaligentreffen",
      "Am Aufnahmetag allgemeinmedizinische und psychiatrische Untersuchung; Anamnese spätestens am Folgetag.",
      "Basisbewegungstherapie zweimal wöchentlich 90 Minuten; Wassergymnastik nach ärztlichem Check-up.",
      "Motivationsgruppe donnerstags 14 Uhr."
    ],
    "sozialdienstLeistungen": [
      "Erfassung der sozialen und ökonomischen Situation; Hinweise zu Schulden und betreutem Wohnen",
      "Angehörigensprechstunde und Angehörigenseminar"
    ],
    "therapieHinweise": [
      "Psychoanalytisch-interaktionelle Methodik (PIM) kombiniert mit verhaltenstherapeutischen Manualen, u. a. Rückfallprävention",
      "Trauma-Gruppe „Sicherheit finden“",
      "Bewerbungs-, Computer- und Sprachtraining; Arbeitspraktikum in Kooperation mit Betrieben (Return to work)",
      "26-Wochen-Langzeittherapie für Mischkonsum (Cannabis, Kokain, Amphetamine/Metamphetamine, MDMA).",
      "Weitere Bausteine u. a. Sozio- und Milieutherapie, Psychoedukation, Gestaltungstherapie, Diätberatung und Gesundheitsinformationstraining."
    ],
    "factsExtra": [
      "Stationär plus 12 ganztägig ambulante Plätze ab 18 Jahren",
      "Regeltherapie laut Klinikseite 13 Wochen bei Alkoholabhängigkeit und 22 Wochen bei Mischkonsum von Drogen; Verlängerung individuell",
      "87 Behandlungsplätze stationär und ganztägig ambulant (Angabe Vivantes).",
      "Zentrale Lage im Auguste-Viktoria-Klinikum Berlin-Schöneberg.",
      "Stationäre Aufnahmekoordination: Birgit Hahn, 030 130 20 8690."
    ],
    "mitbehandlungHinweis": "Elternschaft und Sucht mit Kooperationspartner Escape (Notdienst Berlin e.V.); Sucht im Alter mit spezieller Ergo- und Bewegungstherapie.",
    "kontraindikationen": [
      "Akuter intravenöser Heroinkonsum.",
      "Fehlende Rehabilitationsfähigkeit (Klärung im Vorgespräch)."
    ]
  },
  "ck-sprudelhof": {
    "kontraindikationen": [
      "Aufnahme mit einem Körpergewicht von mehr als 130 kg ist in der Einrichtung nicht möglich.",
      "Aufnahme von Begleitpersonen aus medizinischen Gründen nicht möglich."
    ],
    "alltag": [
      "Keine Parkplätze auf dem Gelände; in der Umgebung kostenpflichtige Parkmöglichkeiten. Anreise mit öffentlichen Verkehrsmitteln empfohlen (rund fünf Gehminuten vom Bahnhof).",
      "Speisesaal ohne feste Sitzordnung und ohne feste Tischzeiten; Frühstück und Abendessen als Buffet, mittags Wahl zwischen drei Menüs darunter vegetarisch.",
      "Offenes Feuer sowie eigene Elektrogeräte (Kaffeemaschine, Tauchsieder, Bügeleisen) in den Zimmern untersagt.",
      "210 Einzelzimmer mit Dusche, WC, überwiegend Balkon, Telefon und Flachbildfernseher.",
      "Sieben Zimmer behinderten- und rollstuhlgerecht.",
      "Kostenloses WLAN im Erdgeschoss; Schwimmbad, Dachterrasse, Teeküche, Kiosk."
    ],
    "wahlleistungenHinweis": "Wäschewaschen, Trocknen und Bügeln über den kostenpflichtigen bargeldlosen Dienst „app Wash“ (Miele OPS) in der Klinik.",
    "sozialdienstLeistungen": [
      "Nachsorge im Angebot der Klinik.",
      "Checkliste und Downloads im Servicebereich."
    ],
    "therapieHinweise": [
      "Bezugstherapeutensystem in der Psychosomatik.",
      "Einzeltherapie tiefenpsychologisch oder verhaltenstherapeutisch; Biofeedback.",
      "Indikative Gruppen u. a. Konfrontation bei Agoraphobie, Skill-Gruppe, Tabakentwöhnung."
    ],
    "factsExtra": [
      "Therapien auch im Kurpark (Walking).",
      "Lehrkochen, Schulungsbuffet und Einkaufstraining."
    ],
    "mitbehandlungHinweis": "Kardiologische Rehabilitanden können bei Indikation psychosomatische Verfahren mitnutzen; apparativ u. a. EKG, Langzeit-Blutdruck, Echo und Sonographie."
  },
  "ck-st-camillus": {
    "alltag": [
      "Vier Wohnbereiche in Zweibettzimmern, gemischt Frauen und Männer; Aufenthalt, Speise, Küche und eigener Therapieraum je Wohnbereich",
      "Besuch montags bis freitags 17:00–21:00 Uhr, samstags, sonntags und feiertags 14:00–21:00 Uhr",
      "Wäsche gegen Gebühr nach Gruppenplan; kleiner Fitnessraum außerhalb der Therapiezeiten"
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei Arbeitsplatzsuche und Schuldenregulierung",
      "Informationsabende der Selbsthilfe in der Klinik; im letzten Drittel Teilnahme an einer wohnortnahen Selbsthilfegruppe als Bestandteil des Rehaplans"
    ],
    "therapieHinweise": [
      "Arbeitstherapie, Gestaltung und Kunst, Sport, Entspannung, Familientherapie, Rückfallmanagement",
      "Therapie bei spezieller Problematik, u. a. Angstbewältigung, berufliche Rehabilitation, Depression"
    ],
    "factsExtra": [
      "48 stationäre und 12 ganztägig ambulante (GAR) Plätze",
      "Aufnahme am angegebenen Datum zwischen 08:00 und 10:00 Uhr an der Klinikinformation"
    ]
  },
  "ck-step-tagesklinik": {
    "therapieHinweise": [
      "Psychotherapie verhaltenstherapeutisch, systemisch und tiefenpsychologisch in Einzel, Gruppe sowie bei Bedarf Angehörigen- und Paargesprächen; individueller Plan mit Bezugstherapeutin bzw. Bezugstherapeut.",
      "Für Berufstätige: Prüfung der Arbeitsplatzsituation und Gespräche mit dem Arbeitgeber, Unterstützung bei Kommunikation sowie Stress- und Konfliktbewältigung.",
      "Psychotherapie, interaktionelle Ergotherapie, Sport/Bewegung inkl. Impulskontrolltraining.",
      "Externe Belastungserprobungen; Bewerbungstraining und Praktika.",
      "Substitutionsgestützte Behandlung ohne Beikonsum, wenn der Kostenträger zustimmt; Vergabe beim niedergelassenen Arzt, Ziel Dosisreduktion oder Substitutionsfreiheit.",
      "Ernährungsberatung, kognitives Training, PME nach Jacobson, Schwimmen, Gymnastik."
    ],
    "factsExtra": [
      "18 ganztägig ambulante Behandlungsplätze für Erwachsene ab 18 Jahren mit Abhängigkeit von Alkohol, Medikamenten oder illegalisierten Drogen.",
      "Wöchentliche Info-Veranstaltung mit Rundgang durch die Räumlichkeiten; Kennenlerngespräch oder telefonische Klärung möglich.",
      "Kombinationsbehandlung mit anderen Fachkliniken der Sektorversorgung.",
      "Enge Zusammenarbeit mit Entzugsstationen der Region Hannover."
    ],
    "kontraindikationen": [
      "Akute Suizidalität.",
      "Akute Psychosen.",
      "Ausgeprägte hirnorganische Störungen (Korsakow-Syndrom)."
    ],
    "alltag": [
      "Behandlung an sechs Tagen die Woche, Wohnen zu Hause.",
      "Barrierefreie Gruppenräume und großer Aufenthaltsraum."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei Behörden, Arbeit, Wohnung, Schulden nach dem Prinzip Hilfe zur Selbsthilfe.",
      "Paar- und Familiengespräche sowie Angehörigen-Informationen.",
      "Nachsorgeplanung; Anerkennung nach §§ 35/36 BtMG."
    ],
    "mitbehandlungHinweis": "Opiatabhängigkeit auch unter Substitution; Mitbehandlung somatischer Komorbidität und spezifischer Persönlichkeitsstörungen laut Trägerseite."
  },
  "ck-stillenberg": {
    "alltag": [
      "Helle Zimmer mit eigenem Badezimmer; Gemeinschafts- und Aufenthaltsräume sowie Therapie-/Gruppenräume.",
      "Freizeit im Haus u. a. Kicker, Tischtennis, Gesellschaftsspiele und Fernseher im Gemeinschaftsraum.",
      "Schwimmen ist als Therapieangebot ausgewiesen; Badebekleidung in der Checkliste genannt.",
      "Ganztägig ambulante Entwöhnung: über Tag in der Klinik (rund 40 Stunden pro Woche), Wohnen zu Hause."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung im Therapieangebot; Angehörigengespräche und Familientherapie.",
      "Sozialdienst kommt in der Aufnahmephase auf Sie zu und plant mit Ihnen die Zeit nach der stationären Behandlung, inkl. Kontakt zu ambulanten Hilfen."
    ],
    "therapieHinweise": [
      "Nach Eingangsdiagnostik individueller Therapieplan: Einzel- und Gruppenpsychotherapie, Informationsgruppen, Hirnleistungstraining, Ergo- und Arbeitstherapie, Sozialtraining, Sport- und Entspannungstherapie.",
      "Indikative Übungsgruppen u. a. Selbstsicherheitstraining, Rückfallprävention, Angstgruppe, Raucherentwöhnung, Gesundheitstraining, Stabilisierung bei Trauma.",
      "Muttersprachliche Therapie in Russisch und Polnisch (Gruppe und Infogruppen); deutscher Sprachunterricht und Integrationswerkstatt zur Migrationsgeschichte.",
      "Eigene Station mit 20 Therapieplätzen für Abhängige von illegalen Drogen.",
      "Regeldauer laut Klinikseite: Alkohol/Medikamente bis 13 (+2) Wochen stationär bzw. 12 Wochen ganztägig ambulant; illegale Drogen 22 (+2) Wochen."
    ],
    "factsExtra": [
      "Schwerpunkt stationäre Entwöhnung; zusätzlich ambulant in Warstein und ganztägig ambulant, auch in Kooperation mit der Suchthilfe Wendepunkt in Arnsberg-Neheim.",
      "Nahtlose Verlegung aus dem LWL-Zentrum für Suchtmedizin Warstein nach qualifizierter Entzugsbehandlung wird angestrebt.",
      "Vorgespräch mit Ärztin/Arzt bzw. Therapeutin/Therapeut und Besichtigung des Rehabilitationszentrums vor der Entscheidung möglich.",
      "Voraussetzung laut Klinikseite: abgeschlossene qualifizierte Entzugsbehandlung, aktuelle Suchtmittelabstinenz und schriftliche Kostenzusage."
    ],
    "mitbehandlungHinweis": "Aufnahme auch bei zusätzlichen psychischen Störungen (Ängste, Depressionen, Psychosen, emotional-instabile Persönlichkeitsstörungen, Traumafolgen), wenn die Motivation zur Abstinenz besteht."
  },
  "ck-suedergellersen": {
    "alltag": [
      "Einzel- oder Doppelzimmer mit kleinem Arbeitsbereich und eigenem Bad.",
      "Frühstück und Abendessen werden gemeinsam zubereitet; Mahlzeiten zu festen Zeiten im Speisesaal.",
      "Fachpersonal rund um die Uhr; Fitnessraum, Garten sowie Fernseh- und Aufenthaltsräume.",
      "Eigene Lehrküche; Sporttherapie mehrmals wöchentlich (Fitnessraum, Joggen, Beachvolleyball, Fahrradfahren).",
      "Ein Zimmer speziell für Rollstuhlnutzung eingerichtet; barrierefrei erreichbar laut DHS-Profil.",
      "Verpflegung berücksichtigt Diäten, Krankheitsbilder und religiöse Speisevorschriften."
    ],
    "mitbehandlungHinweis": "Begleiterkrankungen werden mitbehandelt und vor Aufnahme abgesprochen. Der Umgang mit Folgeerkrankungen wie Hepatitis oder HIV wird thematisiert.",
    "sozialdienstLeistungen": [
      "Nachsorge: Vermittlung in ambulante Einrichtungen, fachärztliche Behandlung, psychosoziale Dienste und Selbsthilfegruppen; Angehörige werden einbezogen.",
      "Anerkennung nach §§ 35/36 BtMG."
    ],
    "therapieHinweise": [
      "Verhaltenstherapeutische, systemische und tiefenpsychologische Verfahren.",
      "Physiotherapeutische Kurse; Bewegung und Ernährung als fester Bestandteil."
    ],
    "factsExtra": [
      "34 Plätze; Therapiedauer 3–6 Monate laut therapieplaetze.de/BAR.",
      "Hauptbeleger DRV Braunschweig-Hannover.",
      "Flyer der Paritätischen Suchthilfe Nds. veröffentlicht."
    ]
  },
  "ck-tagesklinik-duesseldorf": {
    "kontraindikationen": [
      "Ohne ausreichende Stabilität oder ohne stützendes soziales Umfeld rät die Klinik zur stationären Behandlung statt Tagesklinik.",
      "Für die substitutionsgestützte Reha: Beikonsumfreiheit und geklärte Eingangsdosierung."
    ],
    "alltag": [
      "Ganztägig ambulante Therapie montags bis samstags; Abende und der überwiegende Teil des Wochenendes zu Hause.",
      "Morgens in die Klinik, Tag mit der Bezugsgruppe im Therapieprogramm, nachmittags Rückkehr nach Hause.",
      "Feste Bezugstherapie für die gesamte Behandlungsdauer.",
      "Während der tagesklinischen Behandlung Arbeitsunfähigkeit; Übergangsgeld über die Rentenversicherung möglich."
    ],
    "sozialdienstLeistungen": [
      "Hilfe bei der Antragstellung und Klärung der Kostenübernahme durch Rentenversicherung oder Krankenkasse.",
      "Kontakt zu Selbsthilfegruppen im Behandlungsprogramm.",
      "Vermittlung in stationäre Entgiftung oder stationäre Kliniken über das Suchtberatungs- und Therapiezentrum."
    ],
    "therapieHinweise": [
      "Programm u. a. Gruppen- und Einzeltherapie, Rückfallprophylaxe, ärztliche Untersuchungen, Ergo- und Kunsttherapie, Sport- und Bewegungstherapie, Ernährungsberatung und Angehörigengespräche.",
      "Substitutionsgestützte Rehabilitation möglich: Beikonsumfreiheit und abgestimmte Eingangsdosierung; Substitution über die kooperierende Substitutionsärztin.",
      "Anerkennung nach § 35 BtMG (Therapie statt Strafe), sofern die Voraussetzungen für eine tagesklinische Behandlung erfüllt sind.",
      "Behandlungsdauer laut Klinikseite 12 bis 20 Wochen, im Einzelfall kürzer oder länger."
    ],
    "factsExtra": [
      "Tagesklinik im Suchtberatungs- und Therapiezentrum der Diakonie Düsseldorf, Langerstraße 2.",
      "Zugang in der Regel über Anbindung an eine Beratungsstelle und Vorgespräch in der Tagesklinik.",
      "Entzugs- bzw. Entgiftungsbehandlung findet nicht im Haus statt; Vermittlung in geeignete Kliniken möglich."
    ]
  },
  "ck-tagwerk-stuttgart": {
    "alltag": [
      "Strukturierter Wochenplan mit therapeutischen Gruppen, Einzelgesprächen, Sport, Sozialberatung und Arbeitstherapie.",
      "Übergangsstandort bis voraussichtlich 3. Oktober 2026: Rotebühlstraße 191, 70197 Stuttgart."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung und Modul Leben & Arbeit (BORA).",
      "Unterstützung beim Aufbau funktionierender Lebensstrukturen."
    ],
    "therapieHinweise": [
      "Verhaltenstherapie, tiefenpsychologisch fundierte und systemische Verfahren; Traumatherapie.",
      "Neurofeedback und TDCS, Physiotherapie, Akupunktur, Ernährung, Entspannung.",
      "SURE/SURE+, Kombi-Therapie, tagesklinische Entlassungsphase, Therapie nach § 35 BtMG."
    ],
    "factsExtra": [
      "In der Regel Aufnahme direkt nach stationärer oder teilstationärer qualifizierter Entgiftung; Nahtlosaufnahme aus Entzugseinrichtungen möglich.",
      "In Ausnahmefällen Cleanstatus über mehrere Urinkontrollen im Haus.",
      "Cleaner Bezugsperson aus dem sozialen Umfeld als Unterstützung vorgesehen.",
      "Gemeinsame Trägerschaft Caritas Stuttgart und release e.V."
    ]
  },
  "ck-tannenhof-adaption-berlin": {
    "alltag": [
      "WLAN im Haus; Selbstversorgung und eigene Freizeitgestaltung in den Apartments.",
      "Möblierte Einzelapartments mit Küche, Bad, Balkon und TV.",
      "Fitnessraum, Spielraum für Kinder, Billard, Tischtennis, PC-Raum.",
      "Zwei benachbarte Mietshäuser mit Garten in Berlin-Buckow."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung zur weiteren Wohnform und zu sozialen Angelegenheiten.",
      "Unterstützung bei der Organisation der Nachsorge.",
      "Reha-Beratungen durch Vertreterinnen und Vertreter der Rentenversicherung im Haus.",
      "Antrag auf Kostenübernahme über den Sozialdienst der abgebenden Rehaklinik.",
      "Bei Kindern: Beantragung von Haushaltshilfe beim Rentenversicherungsträger."
    ],
    "therapieHinweise": [
      "Computerschulungskurse und Bewerbungstraining.",
      "Fachärztliche psychiatrische und psychosomatische Versorgung im Haus.",
      "Stationäre Adaption für 38 Personen inkl. Berufstätigkeit/Praktikum.",
      "Zwei- bis dreimonatiges Betriebspraktikum, Platzsuche möglichst selbstständig.",
      "Konstruktiver Umgang mit Rückfall: zuerst stationäre Entgiftung, dann verbindliche Regelungen."
    ],
    "factsExtra": [
      "Anerkannt gemäß §§ 35, 36 BtMG.",
      "Seit 2006 nach DIN EN ISO 9001 (DQS) zertifiziert.",
      "Kinder willkommen; Betreuung im Kinderhaus oder in Tagesgruppen.",
      "Hausbesichtigung mittwochs 13 Uhr nach telefonischer Anmeldung.",
      "Flyer 2025 und Bewerbungsfragebogen 2023 als PDF."
    ]
  },
  "ck-tannenhof-adaption-np": {
    "alltag": [
      "Jedes Apartment mit eigenem Balkon laut Trägerbroschüre; WLAN im Haus.",
      "Kinderspielzimmer, Sportraum, Volleyball und Tischtennis; Garten mit Liegewiese und Grillplatz.",
      "Ein Apartment behindertengerecht für Rollstuhlfahrerinnen und Rollstuhlfahrer.",
      "TV und Musikanlage auch im Zimmer laut Broschüre.",
      "22 abschließbare 1-Zimmer-Apartments mit Küchenzeile und Duschbad/WC; Selbstversorgung und eigene Freizeitgestaltung.",
      "Therapie-, Gemeinschafts- und Behandlungsräume, Waschküche, PC-Übungsraum."
    ],
    "sozialdienstLeistungen": [
      "Anmeldung über Bewerbungsfragebogen von Interessentin bzw. Interessent und behandelnder Ärztin bzw. behandelndem Arzt.",
      "Kostenübernahmeantrag über Bezugstherapeut:in und Sozialdienst der abgebenden Klinik.",
      "Bei Kindern: Zusatzfragebogen und Haushaltshilfe beim Rentenversicherungsträger."
    ],
    "therapieHinweise": [
      "Therapiehündin Inu; ärztliche Betreuung im Haus.",
      "Berufsberatung durch zwei Arbeitsberaterinnen bzw. Arbeitsberater; PC-Schulungen und Bewerbungstraining.",
      "Im Einzelfall Aufnahme bei pathologischer Spielsucht.",
      "Therapiedauer öffentlich 3–4 Monate.",
      "Praktikumsplatz selbstständig; wöchentliche Arbeitszeit ca. 24 Stunden.",
      "Rückfallaufarbeitung unter Fortsetzung der Adaption auf Wunsch nach Entgiftung."
    ],
    "factsExtra": [
      "Saniertes historisches Bürgerhaus in Zentrumslage Neuruppin.",
      "Mitnahme von Kindern möglich.",
      "Besichtigung nach Absprache."
    ]
  },
  "ck-tannenhof-lichtenrade": {
    "kontraindikationen": [
      "Voraussetzung laut Trägerkonzept: abgeschlossene Entgiftungsbehandlung, negatives Drogenscreening sowie negative Atemalkohol- bzw. Urinprobe am Aufnahmetag."
    ],
    "alltag": [
      "Täglich frisch zubereitete Vollwertkost, auch vegetarisch.",
      "PC-Raum, Spielzimmer, Nutzgarten, Sportplätze und Kinderspielplatz auf dem Gelände.",
      "Informationsgespräch vor Aufnahme möglich; Aufnahmesprechzeiten montags und donnerstags 10:00–14:00 Uhr.",
      "S-Bahn-Station Lichtenrade in 5–10 Gehminuten.",
      "Ein- oder Zweibettzimmer nach Verfügbarkeit; gemeinsame Zimmer für Eltern mit kleinen Kindern, zwei nebeneinander liegende Zimmer für Eltern mit älteren Kindern.",
      "Sport- und Bewegungsräume (Yoga, Fitness, Entspannung); Volleyball und Fußball auf dem Gelände."
    ],
    "sozialdienstLeistungen": [
      "Aufnahme-Team berät zur Antragstellung und Therapievorbereitung; offene Sprechstunden, Vorbereitungsgruppen und Besuchsrundgänge.",
      "Übergang in Betreutes Gruppenwohnen (Lichtenrade/Buckow) nach der Therapie möglich.",
      "Vorbereitung des Therapieendes, Übergang in Adaption oder Nachsorge."
    ],
    "therapieHinweise": [
      "Prinzip der therapeutischen Gemeinschaft; Therapiedauer bis zu sechs Monaten.",
      "Elterncoaching und Elterntherapiegruppe; gemeinsame Freizeitangebote für Eltern und Kinder.",
      "Anerkennung nach §§ 35, 36 BtMG.",
      "Sport- und Bewegungstherapie, Ernährungsberatung und Lehrküche, Kunsttherapie, Eltern-Kind-Angebote, angeleitete Freizeit.",
      "Kinderhaus: Betreuung von Kindern bis 12 Jahre, 16 Plätze; Aufnahme von Eltern mit Kindern sowie Schwangeren.",
      "Akupunktur laut Trägerflyer."
    ],
    "factsExtra": [
      "40 Plätze für Erwachsene; Indikation am Standort Medikamente und Drogen, bei Eltern und Schwangeren zusätzlich Alkohol.",
      "DIN EN ISO 9001 (DQS) seit 2006.",
      "Gründungsstandort 1979, parkähnliches Gelände in Lichtenrade.",
      "Anerkennung DRV Bund, DRV Berlin-Brandenburg und weitere Träger."
    ],
    "mitbehandlungHinweis": "Mitbehandlung psychischer Begleiterkrankungen laut Trägerflyer."
  },
  "ck-tannenhof-tagesklinik": {
    "kontraindikationen": [
      "Ganztägig ambulant nur bei stabilem privatem Umfeld und Abstinenzfähigkeit in den therapiefreien Zeiten (Abende und Wochenende)."
    ],
    "alltag": [
      "Therapiezeiten werktags ca. 8:00–16:00 Uhr, samstags ca. 8:30–13:30 Uhr; Rückkehr in die eigene Wohnung.",
      "Gemeinsames Mittagessen im Haus (Küche der nahe gelegenen Einrichtung Die Pfalzburger); samstags gemeinsames Frühstück, vegetarische Kost möglich.",
      "Info-Termin mittwochs 11:00 Uhr in der Blissestraße 2–6 ohne Voranmeldung bei Punktabstinenz.",
      "Speiseraum, Ruheraum, PC-Bereich, Multifunktions- und Sportraum."
    ],
    "sozialdienstLeistungen": [
      "Sozialarbeit zu beruflichen und Alltagsproblemen; Bewerbungstraining und berufliche Orientierung.",
      "Einbindung von Familie und Bezugspersonen; Unterstützung bei der Antragstellung über das Aufnahme-Team.",
      "Wöchentliche Vorbereitungsgruppe vor Therapiebeginn laut Trägerflyer."
    ],
    "therapieHinweise": [
      "Gruppe „Sicherheit finden“ für Rehabilitand:innen mit traumatischen Erfahrungen, kunsttherapeutisch begleitet.",
      "Bewegung u. a. therapeutisches Boxen, Yoga, Lauftherapie, Rückenschule, Faszientraining, Kraftsport.",
      "Kunst- und Ergotherapie, Kultur- und Projektgruppe.",
      "Berufliche Orientierung, Bewerbungstraining, Sozialberatung."
    ],
    "factsExtra": [
      "DIN EN ISO 9001 (DQS) seit 2006; QReha plus.",
      "Ganztägig ambulante Suchttherapie, von den Rentenversicherungen anerkannt."
    ]
  },
  "ck-tauwetter": {
    "factsExtra": [
      "Patienteninformation der SKM Köln Reha gGmbH als Merkblatt.",
      "Eilantrag aus qualifizierter Entgiftung möglich.",
      "Stationäre Entwöhnung in Bornheim, kirchlicher Träger SKM.",
      "35 stationäre Betten und 5 ganztägig ambulante Plätze laut Klinikseite.",
      "Schwerpunkt junge Erwachsene bis etwa 40 Jahre; Einzelfallentscheidungen möglich."
    ],
    "kontraindikationen": [
      "In akuten Phasen einer Psychose oder Suizidalität keine Aufnahme; zuerst zuständiges psychiatrisches Krankenhaus."
    ],
    "alltag": [
      "Drei modernisierte Wohnhäuser; Frauen und Männer mit eigenem Wohnbereich.",
      "Denkmalgeschütztes Schloss mit Speiseräumen, Küche sowie Sport- und Gruppentherapieräumen.",
      "Freizeit u. a. Fitnessgeräte, Tischtennis, Billard, Kicker und Bibliothek; drei Fernsehaufenthaltsräume, einer nur für Patientinnen.",
      "Infogespräch und Besichtigung am ersten Freitag im Monat nach telefonischer Voranmeldung."
    ],
    "sozialdienstLeistungen": [
      "Sozialtherapeutische Interventionen der klinischen Sozialarbeit; Hilfen zur Alltagsbewältigung und Existenzsicherung.",
      "Zugang über Fachambulanzen und Beratungsstellen des SKM Köln, Entzugsstationen oder niedergelassene Ärztinnen und Ärzte."
    ],
    "therapieHinweise": [
      "Methodenintegrativ: Verhaltenstherapie, systemisch-lösungsorientiert, Gesprächspsychotherapie und tiefenpsychologisch fundiert.",
      "Ab dem zweiten Tag: Bezugsgruppe dreimal wöchentlich, Einzelgespräche, Arbeitstherapie (u. a. Schreinerei, Fahrradwerkstatt, Hausmeisterei, Landschaftspflege, Hauswirtschaft, Küche).",
      "Indikativ u. a. Rückfallprophylaxe, soziales Kompetenztraining, Stressbewältigung, Psychose- und Suchtbewältigung, Spielsucht, Raucherentwöhnung.",
      "Frauenspezifische Bezugsgruppe und eigene Räumlichkeiten.",
      "In der Regel 22 Behandlungswochen; Stabilisierung, Rückfall und Krise 4–16 Wochen."
    ],
    "mitbehandlungHinweis": "Integrierte Mitbehandlung von Doppeldiagnosen und komorbiden psychischen Erkrankungen, u. a. Traumafolgen, instabile Störungen, Angst, Depression und Persönlichkeitsstörungen."
  },
  "ck-teutoburg": {
    "kontraindikationen": [
      "Akute Suizidgefährdung und akute psychotische Krankheitsentwicklung (zunächst Vorbehandlung)",
      "Andere psychische Störungen im Vordergrund, z. B. Depression oder psychosomatische Erkrankung",
      "Drogenabhängige aus der näheren Umgebung von Gütersloh in der Regel nicht (Szenenähe)"
    ],
    "alltag": [
      "Rauchen nur am Raucherpoint; Rauchen im Haus laut Hausordnung disziplinarische Entlassung",
      "Keine privaten Fernseher, Laptops, Tablets oder Spielekonsolen auf dem Zimmer"
    ],
    "sozialdienstLeistungen": [
      "Sicherung selbstverantwortlicher Handlungskompetenz, insbesondere Geldumgang (Glücksspiel)"
    ],
    "therapieHinweise": [
      "Alkohol, Medikamente, Glücksspiel, Medien und Drogen; Essstörungen nur als sekundäre Abhängigkeit",
      "Indikativgruppen u. a. Depression und Sucht, Angst und Sucht, Sicherheit finden, therapeutisches Bogenschießen und Boxen",
      "Laut Konzept 100 stationäre, 10 Adaptions- und 10 ganztägig ambulante Plätze"
    ],
    "factsExtra": [
      "Qualifizierter Entzug von Alkohol und Medikamenten im LWL-Klinikum Gütersloh möglich",
      "Anerkennung nach § 35 BtMG"
    ],
    "mitbehandlungHinweis": "Paar-, Angehörigen- und Eltern-Kinder-Seminare öffentlich genannt. Qualifizierter Entzug von Alkohol und Medikamenten im LWL-Klinikum Gütersloh möglich; diese Möglichkeit besteht nicht für drogenabhängige Frauen."
  },
  "ck-tgj-adaption": {
    "therapieHinweise": [
      "Beratung zur Arbeitsintegration, Bewerbungs- und soziales Kompetenztraining, EDV-Schulungen.",
      "Fachärztliche Begleitung im Rahmen der medizinischen Rehabilitation.",
      "Voraussetzung laut Träger: Verzicht auf Suchtmittelkonsum und süchtige Verhaltensweisen (Glücksspiel, Medien)."
    ],
    "factsExtra": [
      "Infoveranstaltung am ersten Mittwoch des Monats von 14:30 bis 15:30 Uhr (Raum 3.13/3.14).",
      "Gepäck laut Bewerberbogen auf zwei Koffer und einen Fernseher bzw. PC beschränkt; eigene Möbel sind nicht gestattet.",
      "Nur im Anschluss an stationäre oder teilstationäre Entwöhnung.",
      "Telefonische Anmeldung oder Direktversand des Bewerberbogens 2026 möglich."
    ],
    "alltag": [
      "Wohnen in Einzimmer-Apartments mit Bad und Küche.",
      "Externes Praktikum zur Belastungserprobung."
    ],
    "sozialdienstLeistungen": [
      "Gemeinsamer Unterstützungsplan u. a. zu Arbeit, Wohnen und Alltag.",
      "Beratung und Therapie in Einzel- und Gruppengesprächen."
    ]
  },
  "ck-tiefental": {
    "alltag": [
      "Rehabilitandinnen und Rehabilitanden sind selbst für die häusliche Lebensgestaltung verantwortlich.",
      "Zimmerruhe 22:00–6:00 Uhr; gegenseitige Zimmerbesuche laut Konzeption nicht erlaubt.",
      "80 stationäre Plätze in 1- und 2-Bett-Zimmern (29 Einzelzimmer, davon 9 behinderten-/teilweise rollstuhlgerecht), Bad mit Dusche.",
      "Neun Wohngebäude mit Gruppenraum und Teeküche; Sporthalle, Boulebahn, Freiluftschach, Sauna, Leihfahrräder.",
      "Klinikführung dienstags 13:30 Uhr ohne Anmeldung."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei stufenweiser Wiedereingliederung und, im Intensiv-Programm, bei Kontakt zum Arbeitgeber.",
      "Vorstellung des Sozialdienstes bereits in der Aufnahmephase.",
      "Sozialberatung, Arbeitstherapie zur Vorbereitung der beruflichen Reintegration.",
      "Kombinationsmöglichkeiten mit Tagesklinik Saarbrücken, Adaption Tiefental und Zentrum für Abhängigkeitsprobleme."
    ],
    "therapieHinweise": [
      "Intensiv-Programm (in der Regel 8 Wochen) für Menschen mit Arbeitsplatzbezug: Work-Life-Balance an zwei Tagen pro Woche, ggf. Probearbeitstage am eigenen Arbeitsplatz.",
      "Einwöchige Aufnahmephase mit Diagnostik und individuellem Therapieplan.",
      "Wöchentliche Einzeltherapie plus Gruppentherapie und indikative Gruppen (Depression, Psychosen, Entspannung, Körpertherapie).",
      "Regeldauer 12–15 Wochen Alkohol, bis 26 Wochen Drogen; Auffang 6 Wochen, Wiederholung 8–10 Wochen.",
      "Anschließend 4 Wochen ganztägig ambulant möglich; Kombitherapie 8 Wochen stationär plus ambulante Entwöhnung."
    ],
    "factsExtra": [
      "Mutter-Kind-Zimmer, Kinderspielzimmer und kleines Außenspielgelände; Aufnahme von Müttern mit Kindern möglich.",
      "Barrierefreier Zugang zu den Therapiebereichen, Aufzug zum Untergeschoss.",
      "Hund nach Rücksprache mit der Aufnahmekoordination möglich.",
      "Besonderes Angebot für stärkere kognitive und/oder körperliche Beeinträchtigungen.",
      "Hauptindikationen Alkohol, Medikamente, Cannabis, Amphetamine, Mehrfachabhängigkeit ohne Opiatvordergrund."
    ],
    "kontraindikationen": [
      "Schwere begleitende psychiatrische Krankheitsbilder, die eine Teilnahme am Therapieprogramm unmöglich machen.",
      "Opiatkonsum im Vordergrund der Mehrfachabhängigkeit."
    ],
    "mitbehandlungHinweis": "Mitbehandlung begleitender psychischer und psychosomatischer Störungen inkl. psychotischer Krankheitsbilder in der Vorgeschichte; ärztliche Sprechstunden und Visiten bei körperlichen und psychischen Begleiterkrankungen."
  },
  "ck-tps-hamburg": {
    "alltag": [
      "Wohnen im Einzelzimmer mit eigenem Bad.",
      "Offene Infoveranstaltung jeden zweiten Mittwoch 11:00–12:00 Uhr ohne Anmeldung (Therapie, Zugangswege, Rundgang).",
      "26 Betten, davon 9 in möglichen Adaptionsräumen.",
      "Stammtherapiephase sechs Monate; interne Adaption bis 4 Monate mit derselben Bezugsperson."
    ],
    "factsExtra": [
      "Vor Aufnahme medizinisch-fachliches Vorstellungsgespräch zur Klärung von Anliegen, Zielen und Passung.",
      "Zertifiziert nach DIN EN ISO 9001:2015 und Paritätischem Qualitätssiegel Reha (PQ-Sys, BAR-anerkannt).",
      "Städtische Lage in Hamburg-Altona mit Zugang zu Beschäftigungs- und Praktikumsplätzen; zeitnahe Aufnahme weiblicher Rehabilitandinnen auf der Trägerseite genannt.",
      "Aufnahme ab 18 Jahren, ggf. unter übergangsweiser Substitution.",
      "Federführend DRV Nord; Verträge auch mit DRV Oldenburg-Bremen und DRV Knappschaft-Bahn-See."
    ],
    "sozialdienstLeistungen": [
      "Klärung berufs- und gesundheitsrelevanter sowie sozialrechtlicher Fragen.",
      "Arbeits- und Ergotherapie (Holz, Textil, Büroarbeit) zur beruflichen Integration."
    ],
    "therapieHinweise": [
      "Konzept verbindet gruppenorientierte Suchtarbeit und individualpsychiatrische Psychosebehandlung.",
      "Aufnahme ohne Unterscheidung legaler oder illegaler Suchtmittel.",
      "Anerkennung nach §§ 35/36 BtMG bei erfüllten Voraussetzungen."
    ],
    "mitbehandlungHinweis": "Angebot für Doppeldiagnose Sucht plus Psychose oder ADHS; häufig auch neurotische, Belastungs- und Persönlichkeitsstörungen."
  },
  "ck-tz-speyer": {
    "alltag": [
      "Morgens Arbeitstraining bzw. externes Praktikum; nachmittags und abends Gruppen- und Einzelgespräche.",
      "Selbstversorgung: Kochen allein oder gemeinsam; Fernsehräume und PC-Raum mit Internetzugang und WLAN.",
      "Lage etwa fünf Gehminuten von der Innenstadt und nah an den wichtigsten Ämtern.",
      "Probewohnen im Zusammenhang mit dem Informationsgespräch möglich.",
      "Sieben Einzelappartements mit Bad und Küchenzeile sowie Wohngruppen für weitere Rehabilitand:innen.",
      "Fünf Wohngruppen, zusammengefasst in zwei Therapiegruppen."
    ],
    "therapieHinweise": [
      "Psychotherapie in der Adaption gegenüber der Fachklinikphase reduziert; Üben von Arbeit, Haushalt, Wohnungssuche, Bewerbung, PC-Nutzung und Freizeitgestaltung.",
      "Nahtloser Anschluss an Phase I der Entwöhnung nach Kostenzusage.",
      "Internes Arbeitstraining / Belastungserprobung und externes Betriebspraktikum.",
      "Leistungs- und berufsspezifische Diagnostik (u. a. EXPLORIX, MELBA, psychologische Testung).",
      "Drei Phasen: Eingewöhnung, Erprobung (6–8 Wochen Kern), Entlassvorbereitung.",
      "Alkohol/Medikamente/Glücksspiel in der Regel 12–13 Wochen, Drogen bis 16 Wochen."
    ],
    "factsExtra": [
      "Schriftliche Bewerbung mit Motivationsschreiben, Suchtverlauf und beruflichem Lebenslauf an adaption@tz-speyer.de.",
      "Obligatorisches ambulantes Vorgespräch; Adaptionsantrag über die Fachklinik vor Ende der Phase I.",
      "Staatliche Anerkennung nach §§ 35, 36 BtMG.",
      "Therapiewiederholer nach kurzer Auffrischung oder Entgiftung direkt in die Adaption möglich, wenn der Leistungsträger zustimmt.",
      "Federführend DRV Rheinland-Pfalz; auch DRV Bund, Krankenkassen und Sozialhilfe."
    ],
    "kontraindikationen": [
      "Akute Suizidalität.",
      "Akute Psychosen.",
      "Schwere hirnorganische Störungen."
    ],
    "sozialdienstLeistungen": [
      "Enge Abstimmung mit Sozialabteilungen und Bezugstherapeut:innen der belegenden Fachkliniken und Beratungsstellen.",
      "Vorbereitung ambulanter Anschlusshilfen und Selbsthilfe vor Entlassung."
    ]
  },
  "ck-uexkuell": {
    "kontraindikationen": [
      "Akute Psychosen",
      "Manifeste Suchterkrankungen",
      "Akute Suizidalität",
      "Intensivere medizinische Betreuung erforderlich"
    ],
    "sozialdienstLeistungen": [
      "Sozialtherapie und Beratung; Sozialanamnese im Rahmen der Diagnostik"
    ],
    "therapieHinweise": [
      "Psychodynamische Grundlage, ergänzt um verhaltenstherapeutische, systemische und achtsamkeitsbasierte Module",
      "Einzel- und Gruppenpsychotherapie, Körper- und Ausdruckstherapie, Bewegung, Physiotherapie, MBOR",
      "Akut, vollstationäre Reha und Tagesklinik unter einem Dach",
      "Rehabilitationsbehandlung in der Regel fünf Wochen, Verlängerung oder Verkürzung bei Bedarf.",
      "MBOR-Stufen A und B sowie berufliche Belastungserprobung (Stufe C) im Reha-Konzept."
    ],
    "factsExtra": [
      "Reha: gesetzliche Rentenversicherung oder GKV (§ 111 SGB V); Akut: GKV; beihilfefähig",
      "Getrennte Patientenverwaltung für Akut und Reha",
      "Essstörungen in der Reha ab BMI über 18 bis höchstens 130 kg"
    ],
    "alltag": [
      "Reha auf Station Wissereck: 25 Einzelzimmer mit Bad, Telefon, TV und WLAN, teilweise mit Balkon.",
      "Akutbereich: Doppel- und Einzelzimmer; Rehabereich ausschließlich Einzelzimmer, alle mit Bad.",
      "Frühstück als Buffet, mittags Wahl zwischen Vollkost und vegetarisch, abends Brotzeit-Buffet; Verpflegung nach DGE-Empfehlungen.",
      "Telefon weltweit und in Mobilfunknetze kostenlos; WLAN kostenpflichtig.",
      "Ärztlich bestätigte Unverträglichkeiten und Allergien werden berücksichtigt, sofern Atteste vorliegen."
    ],
    "wahlleistungenHinweis": "WLAN kostenpflichtig (24 Stunden 1 Euro, Wochenpaket 7 Euro, Zwei-Wochen-Paket 13 Euro, Monatspaket 28 Euro). Akut: Einzelzimmer mit Balkon für Privatversicherte und Beihilfeberechtigte genannt."
  },
  "ck-vielbach": {
    "alltag": [
      "Patienten wohnen in Zweibett- oder Einzelzimmern.",
      "Adaptionshaus mit angeschlossener Scheune; Selbstversorgung in der Gemeinschaftsküche, Zimmer mit TV und eigenem Bad.",
      "Cafeteria und Sporthalle; Natur und Tiere (Esel, Meerschweinchen, Kaninchen) im Konzept.",
      "Hunde in separaten Hundehäusern (12–14 m², Wärmelampe) unmittelbar am Patientenwohnhaus; eigener Raum für Hundebesitzer im Wohnhaus.",
      "Katzen und andere Kleintiere können das Patientenzimmer teilen; bei Bedarf kleine Hundehalterschule.",
      "Tierarztpraxis in rund 300 m Entfernung; Spaziergänge mit dem Hund in therapiefreier Zeit."
    ],
    "sozialdienstLeistungen": [
      "Schwerpunkt Wohnen und Finanzen; Bewerbungstraining für Arbeitssuchende."
    ],
    "therapieHinweise": [
      "Arbeit, Fitness und Freizeit als eigene Leistungsbereiche der Klinikseite.",
      "Outdoor-Therapiegruppe und Gesprächsgruppe bei der Arbeitstherapie unter realistischen Bedingungen.",
      "Musiktherapie im Musikraum; Kreativtherapie inkl. Arbeit mit Ton.",
      "Naturgestützte Suchttherapie mit klinik eigenen Tieren (Esel, Meerschweinchen, Kaninchen, Bienen)."
    ],
    "factsExtra": [
      "Keine öffentliche Entgiftungspflicht oder Unterlagenliste auf der Klinikseite.",
      "Patientenzeitung und SuchtGlocke als Veröffentlichungen.",
      "58 Behandlungsplätze für suchtkranke Männer, auch bei Wohnungslosigkeit; Haustiere (Hund, Katze u. a.) können mitgebracht werden.",
      "Angegliederte stationäre Vorsorge „Neue Wege“ zur Vorbereitung der Entwöhnung: Anreise entgiftet, keine schriftliche Bewerbung und keine Mindestaufenthaltsdauer, vorherige Anmeldung.",
      "Nach der Entwöhnung Adaptionsbehandlung in der angeschlossenen Adaptionseinrichtung."
    ]
  },
  "ck-villa-lilly": {
    "alltag": [
      "85 Behandlungsplätze; Eltern und Alleinerziehende mit Kindern im Vorschulalter.",
      "Mini Lilly: pädagogische Betreuung der Begleitkinder, Kinder nehmen nicht an der Therapie teil.",
      "Besuch nach zwei bzw. vier Wochen je nach Behandlungsfortschritt, im Einzelfall früher.",
      "Arbeitstherapie: Schreinerei, Metall, Malerei, Gärtnerei, Kindergarten, Hauswirtschaft, Garten, Patientenbüro.",
      "Einrichtung rauchfrei; Rauchen nur in ausgewiesenen Außenbereichen.",
      "Handys und Multimedia nur auf den Patientenzimmern, nicht in Gemeinschaftsräumen; Nachtruhe 23:00–07:00 Uhr."
    ],
    "therapieHinweise": [
      "Integratives Konzept; psychiatrische Begleiterkrankung mitbehandelt.",
      "Entwöhnung bis 40 Wochen mit interner Adaption; Kurzzeit, Wiederholung, Auffang, ambulant-stationäre Kombi.",
      "Adaption: Einzelzimmer, Selbstversorgung und eigenverantwortliche Geldverwaltung."
    ],
    "factsExtra": [
      "Aufnahme auch im Verlauf der Schwangerschaft; Paare möglich.",
      "Aufnahmefragebogen und Download-Unterlagen auf der Klinikseite.",
      "Anerkennung nach §§ 35/36 BtMG; federführend DRV Hessen.",
      "Betriebserlaubnis für Kinderaufnahme nach § 45 SGB VIII; Schreinerei als Lehrbetrieb der Handwerkskammer Wiesbaden.",
      "Mindestalter 18 Jahre, keine obere Altersgrenze."
    ],
    "sozialdienstLeistungen": [
      "Empfehlung, Anträge auf Übergangsgeld, Bürgergeld oder Hilfe zum Lebensunterhalt rechtzeitig vor Aufnahme mit der Suchtberatung zu klären.",
      "Fahrkosten für notwendige Praktikumfahrten können von der DRV Hessen übernommen werden (öffentliche Verkehrsmittel, 2. Klasse)."
    ],
    "wahlleistungenHinweis": "Kaution 50 Euro binnen einer Woche nach Aufnahme für Rezeptgebühren und Zimmer; Rückerstattung nach Abschluss der Abrechnungen.",
    "mitbehandlungHinweis": "Medikamente nur nach ärztlicher Verordnung, auch nicht verschreibungspflichtige. Medikamente nach Betäubungsmittelgesetz werden nicht verordnet."
  },
  "ck-vitrea-bad-berleburg": {
    "alltag": [
      "Psychosomatik: Einzelzimmer mit Dusche/WC, Telefon, TV-Kabelanschluss und WLAN; teilweise behindertengerechte Zimmer und Allergikerzimmer.",
      "Aufnahme montags bis donnerstags vormittags; anschließend körperliche Untersuchung und Aufnahmegespräch beim Bezugstherapeuten.",
      "Zimmer am Abreisetag bis 09:00 Uhr räumen; Safe und Notfallklingel im Zimmer.",
      "Reha mit Hund in Psychosomatik und HTS in einem separaten Bereich mit eigenem Eingang; Anmeldung über die Aufnahme.",
      "Heimfahrten aufgrund der Kostenträgervorgaben nicht möglich; Rauchen nur im Raucherpavillon."
    ],
    "therapieHinweise": [
      "Konzept verbindet tiefenpsychologische, systemische und verhaltenstherapeutische Elemente.",
      "Schwerpunkt Gruppenpsychotherapie; zusätzlich in der Regel ein Einzelgespräch pro Woche beim Bezugstherapeuten.",
      "Schwerpunkte u. a. Psychosen-Reha, Essstörungen (speziell Adipositas), Depression, Angst und Somatisierungsstörungen.",
      "Musik-, Tanz-, Bewegungs- sowie Kunst- und Gestaltungstherapie im Klinikflyer genannt.",
      "Borderline- und Essstörungsstation nimmt laut Flyer nur weibliche Patientinnen auf."
    ],
    "sozialdienstLeistungen": [
      "Sozialdienst und Zuweiserberatung, Patientendisposition auf der Klinikseite ausgewiesen."
    ],
    "factsExtra": [
      "Zwei Adressen: Neurologie Am Schlosspark 11; psychische Erkrankungen und Hörstörungen Arnikaweg 1.",
      "POST-COVID-Siegel von qualitätskliniken.de; Premium-Rehaklinik-Siegel 2025 laut Träger.",
      "Ehemals VAMED/Helios Rothaar-Klinik, jetzt VITREA."
    ],
    "wahlleistungenHinweis": "Begleitpersonen im Servicemenü genannt; Konditionen über die Klinik.",
    "mitbehandlungHinweis": "Post-COVID-Behandlung schwerpunktmäßig in der Fachabteilung Neurologie am Standort Schlosspark; psychische Erkrankungen und Hörstörungen am Arnikaweg."
  },
  "ck-vitrea-berghof-2": {
    "alltag": [
      "25 Einzelapartments mit Küchenzeile zur Selbstversorgung",
      "Drei Phasen: Eingewöhnung, Berufspraktikum mit Wohnungssuche, Ablösung",
      "Anreise 9–11 Uhr; Zielbahnhof Bohmte; PKW oder Motorrad während der Adaption nutzbar",
      "Alkohol, Medikamente und illegale Drogen auf dem gesamten Gelände untersagt; Gepäck bei Anreise suchtmittelfrei.",
      "Geldspiele und Aufsuchen von Spielhallen nicht erlaubt.",
      "Haustiere nicht erlaubt; Mitwirkung bei der Pflege von Vögeln, Fischen und Kaninchen im Außengelände möglich."
    ],
    "sozialdienstLeistungen": [
      "Wohnungssuche, berufliche Planung, finanzielle Absicherung, Begleitung des Praktikums"
    ],
    "therapieHinweise": [
      "Einzel- und Gruppentherapie, Ergo- und Arbeitstherapie, ärztliche Visiten",
      "Sozialtherapeutische Unterstützung bei Bewerbungen, Vorstellungsgesprächen und Haushaltsführung"
    ],
    "factsExtra": [
      "Nahtlose Adaption aus der stationären Entwöhnung der Berghofklinik und der Wiehengebirgsklinik Bad Essen",
      "Paare möglich"
    ],
    "wahlleistungenHinweis": "Parkplätze gegen Gebühr. Eigener Fernseher kann im Apartment angeschlossen werden.",
    "mitbehandlungHinweis": "Bereits bestehende Dauermedikation bei chronischen Erkrankungen in ausreichender Menge mitbringen oder Rezepte zur Einlösung vor Ort. Nicht reha-relevante Facharzttermine vorab planen oder Überweisung mitbringen."
  },
  "ck-vitrea-berghofklinik": {
    "kontraindikationen": [
      "Keine Aufnahme bei Abhängigkeit von illegalen harten Drogen (Heroin, Crystal Meth), intravenösem Drogenkonsum, akuter Suizidalität und Psychosen, schweren hirnorganischen Psychosyndromen einschließlich Demenz sowie bei Pflegebedürftigkeit."
    ],
    "alltag": [
      "Feste Bezugsgruppe für die gesamte Therapiezeit; wöchentliche Zimmerreinigung im Therapieplan.",
      "Ergo- und Arbeitstherapie zweimal wöchentlich in der Bezugsgruppe.",
      "Fitnessraum, Schwimmbad, Sauna, klinikeigene Sporthalle; Pflege rund um die Uhr.",
      "Unterbringung in modernen Doppelzimmern mit Dusche/WC, Telefonanschluss und Radio; Einzelzimmer nach ärztlich-therapeutischer Indikation.",
      "Zwei behindertengerechte Zimmer; ein Zimmer für stark übergewichtige Patientinnen und Patienten.",
      "WLAN in gekennzeichneten öffentlichen Bereichen kostenfrei; Cafeteria mit Außenterrasse, Lehrküche, Fernsehräume, Bibliothek mit Internet-Terminals."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung: Vortrag in der Aufnahmewoche, offene Sprechstunden; Unterlagen wie Bescheide, Schriftwechsel, Bewerbungsunterlagen mitbringen."
    ],
    "therapieHinweise": [
      "Tiefenpsychologische Gruppenpsychotherapie plus Sport, Kunst, Kreativ- und Arbeitstherapie.",
      "Indikatives Konzept für Traumafolgestörungen; Seniorengruppe; Kombi-/Komb-Nord möglich.",
      "Nahtloser Übergang in Adaption Berghofklinik II."
    ],
    "factsExtra": [
      "130 Therapieplätze; niedersachsenweit Standort für das komplette Spektrum pathologischer Glücksspielsucht laut Träger.",
      "Paartherapie gemeinsam mit der Wiehengebirgsklinik genannt."
    ],
    "mitbehandlungHinweis": "Spezialisiert auf Alkohol, Medikamente, Cannabis/Lifestyledrogen und Politoxikomanie ohne Heroinabhängigkeit, jeweils auch mit psychischen Begleiterkrankungen; pathologische Glücksspiel- und Mediensucht.",
    "wahlleistungenHinweis": "Fahrräder über die klinikeigene Fahrradwerkstatt gegen Entgelt ausleihbar; eigene Fahrräder oder E-Bikes können sicher untergestellt werden."
  },
  "ck-vitrea-damp": {
    "alltag": [
      "Psychosomatische Reha mit Hund möglich: ein Hund pro Patient, max. Schulterhöhe 65 cm und 35 kg, mindestens 6 Monate alt.",
      "Hund muss allein im Zimmer bleiben können; Mitnahme zu Therapien nicht möglich.",
      "Kosten 15 Euro pro Tag, optional Kühlschrankpauschale; Nachweise: Haftpflicht, Impfausweis, tierärztliche Eignung.",
      "Überwiegend Einzelzimmer mit Bad, Dusche, WC und Balkon (Ostsee- oder Naturblick); rollstuhlgerechte Zimmer vorhanden.",
      "Unterbringungs- und Umzugswünsche während der Modernisierung nicht berücksichtigbar.",
      "Kostenloser Klinikshuttle ab Bahnhof Eckernförde nach rechtzeitiger Anmeldung."
    ],
    "sozialdienstLeistungen": [
      "Sozialarbeiterinnen und Sozialarbeiter im interdisziplinären Psychosomatik-Team.",
      "Zuweiserseite listet Indikationen für Sozialdienste (keine gesonderte öffentliche Beratungsliste darüber hinaus)."
    ],
    "therapieHinweise": [
      "Integrativer Ansatz: psychodynamisch, verhaltenstherapeutisch, erlebnisorientiert und ressourcenaktivierend.",
      "Indikationen u. a. Depression, Burn-out, Angst, somatoforme und Schmerzstörungen, Trauer, PTBS, Essstörungen, Computer-/Internetsucht.",
      "Chefärztin Psychosomatik mit Schwerpunkten Psychokardiologie und chronische Schmerzstörungen."
    ],
    "factsExtra": [
      "Direkt an der Ostsee, Hundestrand vor Ort.",
      "Checkliste zur Anreise: Befundberichte, OP-/Behandlungsberichte, Bildgebung, aktuelle Laborbefunde wenn vorhanden.",
      "Kompetenzzentrum für medizinisch-beruflich orientierte Rehabilitation (MBOR) der DRV Bund laut Klinikflyer."
    ],
    "mitbehandlungHinweis": "Abteilung eingebettet in Orthopädie, Neurologie, Kardiologie und Nephrologie. Ostseeklinik Damp als Akutkrankenhaus mit Intensivstation und Dialyse vor Ort.",
    "wahlleistungenHinweis": "Wahlleistung Zimmer „Ausblick & Service“ mit Blick auf Ostsee und/oder Yachthafen inkl. Bademantel, Föhn, Wecker und Extra-Decke. Seezimmer-Paket: WLAN, Telefon-Grundgebühr, TV inkl. Sky. Standard: TV und Telefon gegen Gebühr."
  },
  "ck-vitrea-hildesheim": {
    "alltag": [
      "Ganztägig ambulant, Gesamtbehandlungszeit 4 bis 6 Stunden pro Tag; Ruhepausen zwischen den Anwendungen.",
      "Ruhe- und Leseraum sowie Speisesaal; Mittagessen möglich.",
      "Kein stationäres Zimmer; Umkleideschränke für ganztägig ambulante Reha.",
      "Fahrdienst bei Bedarf."
    ],
    "sozialdienstLeistungen": [
      "Sozialarbeiterin im Team",
      "Koordination barrierefreier beruflicher Wiedereingliederung",
      "Organisation und Durchführung der Reha-Nachsorge",
      "Soziale Re-Integration im häuslichen Umfeld (Angehörigenarbeit, Selbsthilfe, Betriebe)"
    ],
    "therapieHinweise": [
      "Ambulante psychosomatische Reha: depressive Störungen, Belastungs- und Anpassungsstörungen, Angststörungen, somatoforme Störungen insbesondere chronischer Schmerz, Persönlichkeitsstörungen, Burn-out als Zusatzdiagnose.",
      "Facharzt vor Ort; individuelles Programm mit hoher Therapiedichte.",
      "Heilmittelversorgung und medizinische Fitness zusätzlich."
    ],
    "factsExtra": [
      "Rund 3000 m², modern ausgestattete Räume und Trainingsfläche.",
      "Team u. a. Physio- und Sporttherapie, Ergotherapie, Psychologie, medizinisches Fachpersonal, Sozialarbeit, Diätassistenz.",
      "Leitender Arzt Psychosomatik: Dr. med. Thomas Lehnhoff MPH."
    ],
    "mitbehandlungHinweis": "Zulassung nach § 111 SGB V für Orthopädie, Neurologie und Psychosomatik; enge Zusammenarbeit mit Krankenhaus- sowie Haus- und Fachärzten."
  },
  "ck-vitrea-wiehengebirge": {
    "alltag": [
      "Freundlich gestaltete Zimmer und Aufenthaltsbereiche.",
      "Aufnahmewoche mit ärztlicher, pflegerischer, psychiatrischer und therapeutischer Aufnahme, Zuordnung zur Bezugsgruppe.",
      "Begleithunde nach Vorab-Prüfung und Vereinbarung möglich; Aufpreis pro angebrochener Woche; Hunde-Einzelzimmer.",
      "Bitte zur Aufnahme bis 9:00 Uhr eintreffen; Klinik im Ortsteil Hüsede (nicht mit den anderen Häusern in Bad Essen verwechseln).",
      "Handtücher selbst mitbringen; Bettwäsche, Bügeleisen und Bügelbrett stellt das Haus.",
      "Fernseher in Gemeinschaftsräumen, nicht auf dem Zimmer; Handy, Radio und Laptop in Zimmerlautstärke."
    ],
    "sozialdienstLeistungen": [
      "Eigene Seite Sozialdienst und Zuweiser; Patientenmanagement für Aufnahmeformalitäten.",
      "Unterstützung bei Antrag und Sozialbericht über Suchtberatung, Hausarzt oder Kliniksozialdienst der Entgiftung.",
      "Nahtlosverfahren: während der qualifizierten Entgiftung Einleitung der Entwöhnung, nahtloser Übergang als Ziel.",
      "Patientenmanagement klärt Aufnahmeformalitäten; nicht reha-relevante Facharzttermine planen Sie außerhalb der Therapiezeit selbst."
    ],
    "therapieHinweise": [
      "Gruppenpsychotherapie plus Sport-/Bewegungstherapie, Ergo- und Kreativtherapie, indikative Angebote.",
      "Therapiekonzept „Sicherheit finden“ (Trauma und Sucht) und integrierte suchtmedizinische/orthopädische Reha (ISOR) auf der Trägerseite.",
      "Nahtloser Übergang in die Adaption Berghofklinik II möglich.",
      "Gruppenpsychotherapie, Sport-/Bewegungstherapie, Ergo- und Kreativtherapie, Einzeltherapie.",
      "Konzepte „Sicherheit finden“ (Trauma und Sucht) und integrierte suchtmedizinische/orthopädische Reha (ISOR).",
      "Dauermedikation einschließlich Psychopharmaka ist nicht in den Reha-Leistungen enthalten; Vorrat bzw. Rezepte mitbringen."
    ],
    "factsExtra": [
      "146 Therapieplätze, Schwerpunkt Alkohol und Medikamente.",
      "FVS/DEGEMED-zertifiziert; über 40 Jahre Suchtrehabilitation.",
      "Hunde bleiben während Therapien, Anwendungen und Mahlzeiten allein im Zimmer bzw. Zwinger.",
      "Impfausweis zur Aufnahme mitbringen; Rollator, Rollstuhl oder Gehbehinderung vorab dem Patientenmanagement melden.",
      "Patientenkonto für Bargeldauszahlung an der Rezeption (Überweisung im Vorfeld möglich).",
      "Begleithund nur nach Vorabanmeldung, Prüfung und Vereinbarung; Hund bleibt während Therapie und Mahlzeiten allein."
    ],
    "wahlleistungenHinweis": "Begleithund: Aufpreis pro angebrochener Woche laut Klinikseite."
  },
  "ck-vitus": {
    "alltag": [
      "Frauenklinik: 2-Bett- und 1-Bettzimmer mit Dusche und WC; Einzelzimmer nicht vorab reservierbar.",
      "Ausgang erste Woche zu dritt, zweite Woche zu zweit, ab dritter Woche Einzelausgang. Rückkehr So–Do 21:30, Fr/Sa 22:30 Uhr.",
      "Teilnahme an den Hauptmahlzeiten verpflichtend (Frühstück 6:45, Mittag 11:45, Abend 17:45 Uhr).",
      "Besuch ab der vierten Woche am Wochenende nach Absprache; Heimfahrt nach der achten Woche nach Absprache.",
      "Suchtmittelkonsum und -besitz verboten; Alkohol-, Blut-, Urin- und Zimmerkontrollen ohne Vorankündigung möglich.",
      "Wohnlich eingerichtete Zwei- und Einbettzimmer mit Dusche und WC; Einzelzimmer im Vorfeld nicht reservierbar, Zuweisung nach medizinischer oder psychotherapeutischer Indikation."
    ],
    "therapieHinweise": [
      "Frauenspezifische Entwöhnung bei stoffgebundener und nicht-stoffgebundener Abhängigkeit, Essstörungen, Sucht und Trauma, Persönlichkeitsstörungen.",
      "Externe pferdegestützte Therapie; Angehörigenschulung sowie Paar- und Familiengespräche.",
      "Behandlungsdauer je nach Indikation bis zu 26 Wochen.",
      "Gendersensible Entwöhnung für Frauen mit Trauma-Schwerpunkt; Bezugsgruppen offen, Cannabis/Amphetamin in kleinerem Setting.",
      "Multimodal: Verhaltenstherapie, Tiefenpsychologie, Gestalt, Systemik, Traumatherapie; Seeking Safety, Dissoziations-Stopp, DBT-orientierte Angebote.",
      "Externe pferdegestützte Therapie; Arbeitstherapie in Küche, Garten, Hausservice, Tischlerei und Kreativbereichen."
    ],
    "factsExtra": [
      "95 vollstationäre Plätze, Klinik seit 1975.",
      "Eigene Kapelle, ökumenische Gottesdienste.",
      "Kinder ab sechs Jahren ggf. in der Jugendburg Cloppenburg; Mutter-Kind-Zimmer für Wochenendbesuch gegen Kostenbeitrag.",
      "Haustiere nicht möglich.",
      "Frauenhaus; Abteilungen Alkohol/Medikamente sowie Cannabis/Amphetamin.",
      "Aufnahmen in der Regel montags bis donnerstags, in besonderen Fällen freitags."
    ],
    "wahlleistungenHinweis": "Wunsch- und Wahlrecht nach § 69 SGB IX; Formular auf der Klinikseite. Versorgungsverträge nach § 111 SGB V.",
    "mitbehandlungHinweis": "Ärzteteam im Haus; neu aufgetretene Erkrankungen über niedergelassene Fachärztinnen und Fachärzte außerhalb. Gemischtgeschlechtliches Personal – Wunsch nach ausschließlich weiblicher Behandlung der Klinik vorab mitteilen.",
    "kontraindikationen": [
      "Schwerwiegende hirnorganische Störungen mit erheblicher Desorientierung oder schwere Einschränkung der intellektuellen Fähigkeiten.",
      "Akute schwerwiegende psychotische Erkrankungen und akute Suizidalität.",
      "Schwere akute körperliche Erkrankungen oder Pflegebedürftigkeit.",
      "Langjährige Heroinabhängigkeit, langjährig substituierte Patientinnen und Aufnahme unter Substitution.",
      "BMI unter 16; bei Hinweisen auf Essstörung in der Regel Vorgespräch vor Aufnahme."
    ],
    "sozialdienstLeistungen": [
      "Feste Ansprechperson in der Sozialberatung während des gesamten Aufenthalts.",
      "Beratung zu Finanzen, Schulden, Langzeitarbeitslosigkeit, Wohnung und Behörden.",
      "Schuldengruppe in Kooperation mit einer Schuldnerberatung; Antrags- und Behördentraining.",
      "Bei bestehendem Arbeitsplatz Gruppe zum Umgang mit Konflikten am Arbeitsplatz."
    ]
  },
  "ck-waldschloesschen": {
    "kontraindikationen": [
      "Floride Psychosen; akute Suizidalität.",
      "Fortgeschrittene hirnorganische Veränderungen.",
      "Schwere Depressionen; Pflegebedürftigkeit.",
      "Akute Infektiosität (z. B. akute Hepatitis A oder B).",
      "Floride Psychosen, akute Suizidalität, fortgeschrittene hirnorganische Veränderungen.",
      "Schwere Depressionen, Pflegebedürftigkeit, akute Infektiosität (z. B. Hepatitis A oder B)."
    ],
    "alltag": [
      "Keine Kontaktsperre; Besuch ab der 3. Woche Samstag und Sonntag 14:00–18:00 Uhr.",
      "Erste 4 Wochen auf dem Gelände; ab Woche 2 Ausgang in Begleitung.",
      "Kein eigenes Auto; keine Haustiere; WLAN kostenlos.",
      "Am Aufnahmetag Begrüßung im Aufnahmebüro und Patenschaft durch eine erfahrene Person aus dem Rehabilitandenkreis.",
      "Phase 1 (erster Monat): Aufenthalt nur im Gebäude und auf dem Gelände; Ausgang nur bei begleiteten Gruppenaktivitäten.",
      "Kein Ausgang mit Besuch und kein Fitnessstudio in Phase 1; Arzt- und Behördengänge mit Personalbegleitung."
    ],
    "sozialdienstLeistungen": [
      "Schuldenregulierung in Kooperation mit einer Schuldnerberatung.",
      "Unterstützung bei Wohnungssuche und Arbeitssuche.",
      "Anschreiben an die Staatsanwaltschaft.",
      "Unterstützung bei Antragstellung über Suchtberatung, Krankenhaus-Sozialdienst oder die Fachklinik.",
      "JVA-Weg: Sozialbericht, medizinischer Befundbericht und Medikamentenliste über den Suchtberatungsdienst der JVA.",
      "Nahtlosverfahren aus der Entzugsklinik über den dortigen Sozialdienst, sofern Plätze frei sind."
    ],
    "therapieHinweise": [
      "Arbeitstherapie, Sport- und Kreativangebote.",
      "Adaption bis 4 Monate in Einzelzimmerappartements mit Küchenzeile, 11 Plätze intern und extern.",
      "Vier Phasen: Ankommen (Woche 1–4), Handlungskompetenzen (Woche 5–8), weitere Erprobung und Ablösung.",
      "22 Wochen bei Abhängigkeit von illegalen Drogen; Adaption bis vier Monate in Einzelzimmerappartements.",
      "Crystal-Meth-angepasstes Setting mit kürzeren, häufigeren Gesprächen und kognitivem Training.",
      "Wöchentlich Einzelgespräch und mehrere Bezugsgruppen, bei Bedarf geschlechtsspezifisch."
    ],
    "factsExtra": [
      "Negative Atemluft- und Urinkontrolle bei Aufnahme.",
      "Frauenbereich getrennt (14 stationäre Plätze).",
      "45 Behandlungsplätze ab 18 Jahren: 20 stationär Männer, 14 stationär Frauen im eigenen Bereich, 11 Adaptionsplätze intern und extern.",
      "Ein barrierefreier bzw. rollstuhlgerechter Platz ausgewiesen.",
      "Träger: Ordenswerke des Deutschen Ordens.",
      "Negative Atemluft- und Urinkontrolle bei Aufnahme; Entgiftung im Krankenhaus vorausgesetzt."
    ]
  },
  "ck-waldschloss-dd": {
    "alltag": [
      "Aufnahme in der Regel montags bis freitags, Anreise bis 11 Uhr; Abholung von Bahnhof oder Flughafen bei öffentlicher Anreise.",
      "Mitteilung des Aufnahmetermins enthält Hinweise zu Kleidung, Medikamenten und elektronischen Kleingeräten.",
      "Patientenzimmer mit eigenem Bad sowie Telefon-, Internet- und Fernsehanschluss.",
      "Mit der Terminmitteilung Hinweise zu Kleidung, Medikamenten und elektronischen Kleingeräten."
    ],
    "therapieHinweise": [
      "Zentrum für Psychotraumatherapie; u. a. EMDR, IRRT, TRIMB, Screen-Technik.",
      "Hochfrequente Einzelpsychotherapie; durchschnittliche Behandlungsdauer etwa sechs bis zwölf Wochen.",
      "Prüfung der gesundheitlichen Voraussetzungen anhand Fragebogen, Therapieantrag und Vorbefunden vor Behandlungsbeginn; Klärung offener Fragen telefonisch oder persönlich.",
      "Psychotraumaambulanz am Standort (0351 44832071).",
      "Zentrum für Psychotraumatherapie; u. a. EMDR, IRRT, TRIMB, Screen-Technik; Orientierung an AWMF-Leitlinien.",
      "Hochfrequente Einzelpsychotherapie plus themenzentrierte Gruppe, Wochenausklang und nonverbales Gruppenangebot (Ergotherapie)."
    ],
    "factsExtra": [
      "Versorgungs- und Rehabilitationseinrichtung gemäß § 111 SGB V; staatlich anerkannte Privatkrankenanstalt.",
      "Selbstzahler: inhaltliche Vorprüfung durch Leitende Ärztin oder Leitenden Psychologen, dann Vorleistung im 10-Tage-Takt.",
      "Versorgung nach § 111 SGB V; staatlich anerkannte Privatkrankenanstalt.",
      "Patientenfragebogen und Klinikflyer als PDF; Prüfung der gesundheitlichen Voraussetzungen vor Beginn."
    ],
    "wahlleistungenHinweis": "Privatversicherte und Selbstzahler: Wahlleistungselemente Einbettzimmerzuschlag, Zweibettzimmerzuschlag und ärztlich-therapeutische Wahlleistung je nach Tarif.",
    "mitbehandlungHinweis": "Sekundäre Abhängigkeitserkrankungen nach Trauma können im Konzept berücksichtigt werden; vorausgehend kann eine Entgiftungs- oder suchtspezifische Behandlung außerhalb nötig sein. Leichte neuropsychologische Defizite nach Schädel-Hirn-Trauma werden behandelt.",
    "sozialdienstLeistungen": [
      "Sozialberatung unterstützt den Kontakt zu einer ambulanten Suchtberatungsstelle, wenn eine sekundäre Abhängigkeit Thema ist.",
      "Empfehlung, schon während des Aufenthalts eine Suchtselbsthilfegruppe in Dresden zu besuchen."
    ]
  },
  "ck-waren": {
    "alltag": [
      "200 Behandlungsplätze in Einzelzimmern (ca. 20 m²) mit eigenem Bad, Safe und gebührenpflichtigem Fernseher.",
      "Gemeinsames Essen im Klinikrestaurant; morgens und abends Buffet, mittags zwei Gerichte, vegetarische Option.",
      "Beispielhafter Tag: Therapie vormittags und nachmittags, Abendessen 17:30–19:00, Nachtruhe ab 23:00 Uhr.",
      "Ausgang: So–Do Rückkehr bis 22:30 Uhr, Fr/Sa bis 24:00 Uhr. Alkohol auf dem Gelände nicht gestattet.",
      "Besuche in den ersten drei Wochen mit der Bezugstherapie absprechen; Besucher melden sich an der Rezeption.",
      "Einzelzimmer mit eigenem Bad, Safe und Fernseher (Nutzung gebührenpflichtig)."
    ],
    "therapieHinweise": [
      "Integrativ verhaltenstherapeutischer Ansatz mit medizinischen und psychologischen Maßnahmen.",
      "Ergotherapie und Tanztherapie sind ausgewiesen; 24/7-Besetzung der Medizinischen Zentrale.",
      "Integrativ-verhaltenstherapeutisches, verhaltensmedizinisches Konzept.",
      "Feste Bezugstherapeutin oder fester Bezugstherapeut (Arzt oder Psychologe mit Psychotherapiezusatz).",
      "Ganztägig ambulante Behandlung und ambulante Reha-Nachsorge möglich.",
      "Private Krankenversicherung: als gemischte Krankenanstalt anerkannt (akutstationär und Sanatoriumsbehandlung)."
    ],
    "factsExtra": [
      "Lage am Kurpark im Ostteil von Waren, Blick auf Müritz und Feisneck.",
      "Barrierefreie Zimmer vorhanden; Begleitkinder im Zimmer, wenn der Kostenträger genehmigt.",
      "Haustiere sind aus hygienischen Gründen nicht gestattet.",
      "Klinik ist beihilfefähig; Belegung durch DRV, Krankenkassen, PKV und Sozialhilfeträger.",
      "Keine Akut-Einweisungen."
    ],
    "wahlleistungenHinweis": "Parkplatz 1 €/Tag, höchstens 50 € je Aufenthalt (Vorauszahlung 50 €). Medienpauschale WLAN/Telefon 10 €/Woche oder 80 € je Aufenthalt; Premium-Paket ohne diese Pauschale. TV im Zimmer gebührenpflichtig. WLAN nicht kostenlos.",
    "mitbehandlungHinweis": "Medizinische Zentrale im Gartengeschoss rund um die Uhr besetzt: Untersuchungen, Behandlungen und Medikamentenausgabe. Spezifische Dauermedikamente für den gesamten Aufenthalt mitbringen.",
    "kontraindikationen": [
      "Akute Selbstgefährdung.",
      "Medikamenten-, Drogen- und Alkoholabhängigkeit.",
      "Unter 18 Jahren.",
      "Hirnorganische oder psychotische Beeinträchtigung.",
      "Nicht gehfähig und gleichzeitig pflegerischer Mehrbedarf trotz Rollstuhl."
    ],
    "sozialdienstLeistungen": [
      "Soziotherapie: Hilfe bei beruflichen, rechtlichen und finanziellen Schwierigkeiten sowie Wohnungsfragen (Hilfe zur Selbsthilfe).",
      "Mitaufnahme von Kindern als Begleitperson mit Zustimmung des Kostenträgers."
    ]
  },
  "ck-wehrawald": {
    "kontraindikationen": [
      "Aufnahme bis zu einem Körpergewicht von 150 kg laut Klinikseite.",
      "Begleitpersonen in der Psychosomatik und bei der Dualen Reha nicht möglich."
    ],
    "sozialdienstLeistungen": [
      "Sozialberatung als Bestandteil des multidisziplinären Therapiekonzepts.",
      "Stützende Gruppen mit Psychologie und Sozialdienst zu psychosozialen Belastungssituationen.",
      "Im Post-COVID-Angebot sozialrechtliche Beratung (u. a. Grad der Behinderung) und berufliche Reintegration (LTA)."
    ],
    "wahlleistungenHinweis": "Begleitperson außerhalb der Psychosomatik und Dualen Reha nach Feststellung der Notwendigkeit durch die behandelnde Ärztin oder den behandelnden Arzt und Bestätigung des Kostenträgers; Anwendungen für Begleitpersonen bietet die Klinik nicht an.",
    "mitbehandlungHinweis": "Allergenarme Zimmer vorhanden. Begleiterkrankungen des Herz-Kreislauf-Systems sowie Ernährungs- und Stoffwechselkrankheiten im Angebot genannt. Besondere Sprachkenntnisse: Englisch und Polnisch.",
    "alltag": [
      "224 Zimmer, davon 213 Einzel- und 11 Doppelzimmer, alle mit Balkon.",
      "Zwei barrierefreie Einzelzimmer und ein barrierefreies Doppelzimmer.",
      "Kostenfreies WLAN; Fernseher gebührenfrei; alle Nichtraucherzimmer.",
      "Kostenfreie Parkplätze; Klinikbus holt Bahnanreisende in Freiburg und am Flughafen Basel-Mulhouse ab."
    ],
    "therapieHinweise": [
      "Duale Reha Psycho-Pneumologie.",
      "Begleitpersonen nach Absprache und Verfügbarkeit für die komplette Rehadauer im Doppelzimmer."
    ],
    "factsExtra": [
      "Haustiere können nicht mitgebracht werden.",
      "Handtücher und Bettwäsche stellt die Klinik.",
      "Föhn selbst mitbringen; Thermoskanne für die Teeküche empfohlen."
    ]
  },
  "ck-weihersmuehle": {
    "kontraindikationen": [
      "Männerklinik; Aufnahme öffentlich 18–50 Jahre.",
      "Keine Aufnahme bei akuter florider Psychose, akuter Manie, akuter Suizidalität oder Epilepsie.",
      "Keine Aufnahme bei Rollstuhlpflicht.",
      "Opioide nur Tilidin, Tramadol, Oxycodon; regelmäßiger Opiatkonsum und intravenöser Konsum ausgenommen."
    ],
    "alltag": [
      "Helle Ein- und Zweibettzimmer mit eigenem Bad; Wohnen in Wohngruppen mit 8–12 Personen.",
      "Kostenloses WLAN; Smartphone, Laptop und Tablet außerhalb der Therapiezeiten ab 16 Uhr erlaubt.",
      "Keine Haustiere; eigenes Auto während der Behandlung nicht nutzen.",
      "Besuche in der Regel ab der vierten Behandlungswoche, Freitag 13:00 Uhr bis Sonntag 18:00 Uhr; Besucherzimmer vorhanden.",
      "Keine Kontaktsperre."
    ],
    "sozialdienstLeistungen": [
      "Antragshilfe über Suchtberatungsstellen, Krankenhaus-Sozialdienst oder JVA-Sozialdienst.",
      "Achtwöchige Auffang- bzw. Festigungsbehandlung für ehemalige Rehabilitanden bei erneuter Gefährdung oder kurzem Rückfall."
    ],
    "therapieHinweise": [
      "Kognitive Verhaltenstherapie; Arbeitstherapie u. a. Schreinerei, Küche, Garten, Kunstwerkstatt, Fahrradwerkstatt.",
      "Zusatzangebote u. a. Rückfallprävention, Bewerbungstraining, ADHS-Indikationsgruppen, Raucherentwöhnung, soziales Kompetenztraining.",
      "Anerkennung nach § 35 BtMG (Therapie statt Strafe) laut Trägerseite."
    ],
    "factsExtra": [
      "Sieben Wohngruppen; Fitnessstudio auf dem Gelände.",
      "Abholservice nach Absprache; Busverbindungen Nürnberg/Fürth/Ansbach.",
      "Zertifiziert nach DO-QUA.R.",
      "Hepatitis-C-Diagnostik und -Therapie extern."
    ],
    "mitbehandlungHinweis": "Bei ausreichender Stabilität Mitbehandlung psychischer Begleiterkrankungen (u. a. ADHS, Depression, Angst, Persönlichkeitsstörungen, Traumafolgen, Psychosen, Glücksspiel). Somatische Begleiterkrankungen über niedergelassene Ärztinnen und Ärzte."
  },
  "ck-weitenau": {
    "alltag": [
      "Arbeitstherapie in Schreinerei, Metallwerkstatt, Gärtnerei, Küche, Hauswirtschaft, Verwaltung, Wäscherei, Fahrradwerkstatt.",
      "Sport u. a. Fußball, Schwimmen, Fitness-/Kraftraum; spezielle Angebote für Frauen.",
      "Anreise bis 13:30 Uhr; alkohol- und urinkontrollierte Ankunft; Patin bzw. Pate. Ausgang und Besuch in der Anfangsphase eingeschränkt und begleitet.",
      "Arbeitstherapie in Schreinerei, Metallwerkstatt, Gärtnerei, Küche, Hauswirtschaft, Verwaltung, Wäscherei und Fahrradwerkstatt.",
      "Waschmöglichkeit im Haus. Handtücher, Hallenschuhe mit heller Sohle, Outdoor-Turnschuhe, Badezeug, Regenbekleidung und Handy mitbringen.",
      "Keine offenen Raucherutensilien; Rauchen nur an ausgewiesenen Plätzen. Alkohol und Drogen aller Art untersagt."
    ],
    "therapieHinweise": [
      "Gruppen u. a. Motivation, Abstinenz, soziales Miteinander, Konfliktmanagement, SKILLS, Freizeitmanagement, Raucherentwöhnung.",
      "Traumatherapie und Trauerbewältigung genannt.",
      "Schule im Haus; Aufnahmeunterlagen getrennt für unter/über 18 Jahre plus Kofferpackliste.",
      "Jugendliche und junge Erwachsene bis 27 Jahre; Paare möglich. Indikative Gruppen u. a. Motivation, Abstinenz, soziales Miteinander, Konfliktmanagement, SKILLS, Freizeitmanagement, Raucherentwöhnung.",
      "Klinikschule mit Haupt- und Realschulabschluss vor Ort, Berufsschulvorbereitung, Nachhilfe; 20 Schulplätze öffentlich genannt.",
      "Traumasensible Therapie und Trauerbewältigung. Aufnahmegruppe in den ersten vier bis sechs Wochen einmal wöchentlich."
    ],
    "factsExtra": [
      "Anmeldung über Suchtberatungsstellen, Psychiatrien oder Entgiftungen.",
      "Kinder- und jugendpsychiatrische Begleitung genannt.",
      "36 Plätze Haus Weitenau, 16 Plätze Haus Maulburg laut Trägerseite.",
      "Anmeldung nur über Suchtberatungsstellen, Psychiatrien oder Entgiftungen. Aufnahmeunterlagen getrennt für unter und über 18 Jahre plus Kofferpackliste als PDF.",
      "Masernnachweis nach IfSG vor Aufnahme (Impfpass oder ärztliches Zeugnis). Kopie der Geburtsurkunde und aktuellstes Schulzeugnis für Schule und Behörden.",
      "36 Plätze Haus Weitenau, 16 Plätze Haus Maulburg. Klassenhund in der Schule öffentlich genannt."
    ],
    "kontraindikationen": [
      "Schwere und akut behandlungsbedürftige somatische Erkrankungen, schwere hirnorganische Störungen, akute Psychosen, Pflegebedürftigkeit.",
      "Schwangerschaft; Ausnahmen mit Blick auf den erwarteten Geburtstermin möglich.",
      "Schwere und akut behandlungsbedürftige somatische Erkrankungen.",
      "Schwere hirnorganische Störungen; akute Psychosen.",
      "Pflegebedürftigkeit.",
      "Schwangerschaft (Ausnahmen mit Blick auf den erwarteten Geburtstermin möglich)."
    ],
    "sozialdienstLeistungen": [
      "Klärung von Wohnung, Krankenversicherung, Unterhalt und rechtlichen Fragen, auch bei Betreuung.",
      "Klärung der Kostenträgerschaft für die Adaptionsphase. Angehörigenarbeit, Elterngespräche und Familiengespräche zur Vorbereitung von Heimfahrten.",
      "Klärung der Kostenträgerschaft für die Adaptionsphase."
    ]
  },
  "ck-wendepunkt": {
    "alltag": [
      "Wellnessbereich mit Sauna, Patientenbibliothek, Loggia.",
      "Gemütliche Aufenthaltsräume mit TV und Radio; ansprechende Therapieräume.",
      "Großzügige Einzelzimmer mit Dusche/WC.",
      "PC-Arbeitsplätze mit Internetzugang; Kleinsporthalle mit Kraftraum."
    ],
    "therapieHinweise": [
      "Zusätzliche Angebote: Akupunktur, Nikotinentwöhnung und Ernährungsberatung.",
      "Intensive Einzeltherapie nach störungsspezifischen Methoden; interdisziplinäre Bausteine in Einzel- und Gruppenform.",
      "Module: ambulante Reha 6–12 Monate; stationäre Erstbehandlung 15–16 Wochen; Wiederholungsbehandlung 10 Wochen; Kombinationsbehandlung 8 Wochen stationär plus 6–12 Monate ambulant.",
      "Umwandlung der stationären Phase in den letzten zwei bis vier Wochen in ganztägig ambulant möglich.",
      "Paar- und Angehörigengespräche; wöchentliche Nachsorgegruppe dienstags.",
      "Ambulante Reha setzt festen Wohnsitz und berufliche Integration voraus."
    ],
    "factsExtra": [
      "Lage natur- und zentrumsnah in Stuttgart (Prießnitzweg 24); Anbindung an die ergänzende Versorgung des Klinikums Stuttgart.",
      "Bei geplanter Adaption nach der stationären Phase Unterstützung bei der Suche nach einer geeigneten Einrichtung.",
      "Beteiligung am Nahtlosverfahren der DRV; Direktverlegung aus Entzugsstationen anderer Krankenhäuser möglich.",
      "Antragsweg über Suchtberatungsstelle, Entgiftungsstation oder Haus-/Facharzt.",
      "Nachsorge nach regulär abgeschlossener Reha, 6–12 Monate."
    ],
    "sozialdienstLeistungen": [
      "Unterstützung bei beruflichen Perspektiven und Problemen im Arbeitsleben.",
      "Organisation des Nahtlosverfahrens aus qualifizierten Entzugsstationen."
    ],
    "wahlleistungenHinweis": "Medienangebote in den Zimmern teils gebührenpflichtig laut Klinikseite.",
    "mitbehandlungHinweis": "Mitbehandlung weiterer psychiatrischer Störungen neben der Suchterkrankung, z. B. depressive Erkrankungen. Qualifizierter Entzug bei Bedarf auf Stationen VAMOS, DEMOS oder Tagesklinik TANDEM des Klinikums Stuttgart."
  },
  "ck-wermsdorf": {
    "alltag": [
      "Zweibettzimmer mit Sanitärbereich in fünf gemischtgeschlechtlichen Wohnbereichen.",
      "Orientierungsphase mit Besuch und Ausgang in Begleitung ab der dritten Woche.",
      "Haustiere nach Absprache möglich."
    ],
    "sozialdienstLeistungen": [
      "Klärung behördlicher Angelegenheiten; berufliche und soziale Wiedereingliederung.",
      "Bewerbungstraining; Kontaktherstellung zu Selbsthilfegruppen; geregelte Nachsorge."
    ],
    "therapieHinweise": [
      "Diagnosespezifische Therapie in kleinen Gruppen, hoher Anteil Einzeltherapie.",
      "Schwerpunkt komorbide Psychosen und Persönlichkeitsstörungen; Traumatherapie und Schematherapie ausgewiesen.",
      "Drei Phasen: Orientierung ca. 4–9 Wochen, intensive Therapie ca. 14 Wochen, Ablösung ca. 6 Wochen mit externem Berufspraktikum."
    ],
    "factsExtra": [
      "Kooperation mit dem Fachkrankenhaus Hubertusburg und Suchtberatungsstellen.",
      "Flyer der AWO-Trägerseite: Alltagstraining, Angehörigen-/Paargespräche, Skillstraining."
    ],
    "mitbehandlungHinweis": "Gleichzeitigbehandlung von Drogenabhängigkeit und psychiatrischer Zweitdiagnose (u. a. Psychose, schwere Persönlichkeitsstörung)."
  },
  "ck-weser-ems": {
    "alltag": [
      "80 stationäre und 20 ganztägig ambulante Plätze auf 4 Stationen mit jeweils 2 Bezugsgruppen.",
      "Kein Fernseher auf dem Zimmer; Laptop, Tablet und Smartphone im Zimmer erlaubt.",
      "Ausgang in den ersten zwei Wochen in der Regel zu zweit; ab der dritten Woche Einzelausgang und Essensbefreiung in Absprache.",
      "Besuch Mo–Fr in der therapiefreien Zeit außerhalb der Klinik bis 18:30 Uhr; Sa/So 09:30–18:30 Uhr auch in der Klinik und im Zimmer.",
      "Teilnahme an den Mahlzeiten verpflichtend; kein Mohn in Speisen; keine Lieferdienste.",
      "Mitgebrachte Medikamente und Nahrungsergänzungsmittel werden am Aufnahmetag bei Pflege oder Ärztin bzw. Arzt abgegeben."
    ],
    "therapieHinweise": [
      "Konzept nach ICF; genderspezifische Gruppenangebote.",
      "Behandlungszeit in der Regel 13–15 Wochen bei Alkohol/Medikamenten, 22–24 Wochen bei Drogenabhängigkeit.",
      "Ganztägig ambulante Reha (GAR) bei weitgehend intaktem sozialem oder beruflichem Umfeld; Anreise bis etwa 45 Minuten, fester Wohnsitz.",
      "Angebot für suchtkranke Menschen mit Schwer- und Schwersthörigkeit (FM-Anlage).",
      "Psychische, somatische und soziale Aspekte werden berufsgruppenübergreifend behandelt.",
      "Leichte Entzugssymptomatik kann mit NADA-Akupunktur behandelt werden."
    ],
    "factsExtra": [
      "Abgeschlossene Entgiftung, Behandlungsmotivation und Kostenzusage als Aufnahmevoraussetzungen.",
      "Männer und Frauen ab 18 Jahren; stationär oder ganztägig ambulant.",
      "GSB-Qualitätssiegel Reha, BAR-anerkannt, Zertifikat bis 23.04.2027.",
      "Federführend DRV Oldenburg-Bremen laut Flyer 02/2026.",
      "Neubau im Stadtteil Kreyenbrück; Chefarzt Dr. med. Manuel Seewald."
    ],
    "mitbehandlungHinweis": "Leichte Entzugssymptomatik im Haus über NADA-Akupunktur; enge Kooperation mit Akutkrankenhäusern und Arztpraxen der Region."
  },
  "ck-weserblick": {
    "kontraindikationen": [
      "Geschlossene Unterbringung erforderlich.",
      "Fortgeschrittene dementielle Entwicklung.",
      "Manifeste, im Vordergrund stehende Abhängigkeitserkrankungen."
    ],
    "sozialdienstLeistungen": [
      "Berufliche Belastungserprobung.",
      "Beratung zur Rückkehr an den Arbeitsplatz.",
      "Einbeziehung des sozialen Umfelds durch Angehörigen-, Familien- oder Paargespräche."
    ],
    "therapieHinweise": [
      "Einzelpsychotherapie tiefenpsychologisch oder verhaltenstherapeutisch, einmal wöchentlich.",
      "Gruppen u. a. Angst- und Schmerzbewältigung, Musik- und Körpertherapie, Achtsamkeit.",
      "Traumatherapeutisches Vorgehen und systemische Sichtweisen integriert.",
      "Einzelpsychotherapie tiefenpsychologisch oder verhaltenstherapeutisch.",
      "Gruppen unter anderem Angst- und Schmerzbewältigung, Musik- und Körpertherapie, Achtsamkeit."
    ],
    "factsExtra": [
      "Modellprojekt der DRV Westfalen für frühzeitige psychosomatische Reha bei akut bedrohter Arbeitsfähigkeit.",
      "Am Standort auch Akutklinik für offene Psychiatrie und Psychotherapie für Privatpatientinnen und Selbstzahlerinnen.",
      "Keine Akut-Einweisung; eilige Aufnahmen nur in Absprache über den zentralen Reservierungsservice."
    ],
    "alltag": [
      "Unterbringung in Einzelzimmern mit Bad/Dusche, Telefon und TV; Zweibettzimmer für Paare.",
      "WLAN gebührenpflichtig; Safe mietbar.",
      "Vegetarische Speisen und DGE-Kostformen; Unverträglichkeiten nach Voranmeldung.",
      "Haustiere nicht gestattet; wenige Parkplätze, Anreise mit der Bahn empfohlen."
    ],
    "wahlleistungenHinweis": "Begleitperson gegen Gebühr: Zustellbett, eigenes Zimmer nach Verfügbarkeit oder Hotel in der Nähe.",
    "mitbehandlungHinweis": "Ernährungsberatung und Lehrküche; körperliche Begleittherapie und Sporttherapie."
  },
  "ck-wiesengrund": {
    "kontraindikationen": [
      "Keine Behandlung akuter krankenhauspflichtiger Erkrankungen.",
      "Keine Aufnahme bzw. Fortführung bei akuter Intoxikation, Entzugssyndrom, drogeninduzierter Psychose, aktueller Psychose oder akuter Suizidalität.",
      "Eigen- und Fremdgefährdung; akute affektive Störung mit Selbstmordgedanken."
    ],
    "alltag": [
      "Glücksspiele bzw. Spielen um Geld in der Klinik nicht gestattet.",
      "Paare können gemeinsam behandelt werden.",
      "Kontakt- und Ausgangssperre über zwei Wochen; danach individuelle Regelungen.",
      "Überwiegend Zweibettzimmer mit Dusche/WC; zwei Einzelzimmer nach Bedarf (z. B. PTBS); zwei hindernisgerechte Zimmer.",
      "Pate oder Patin aus dem Kompetenzteam zum Einleben; Eingangsgruppe ab dem Aufnahmetag.",
      "Handy-Nutzung in Zimmern und auf der Terrasse, im Gebäude ab 18:30 Uhr; elektrische Geräte nach Prüfung."
    ],
    "sozialdienstLeistungen": [
      "12 Plätze ambulant betreutes Wohnen / Nachsorge laut Trägerseite.",
      "Vermittlung über regionale Drogenberatungsstellen; verpflichtende Vorgespräche vor Aufnahme.",
      "In der ersten Woche Erfassung von Familie, Wohnen, Finanzen und juristischer Situation; Finanzplan.",
      "BORA-Screening und berufsbezogene Diagnostik; Kooperation mit Jobcentern und Beratungsstellen.",
      "Vermittlung über regionale Drogenberatungsstellen; verpflichtende Vorgespräche vor Aufnahme, insbesondere bei SURE."
    ],
    "therapieHinweise": [
      "Schwerpunkt Drogenabhängigkeit, daneben Alkohol, Medikamente und Nikotin.",
      "Substitutionsgestützte Rehabilitation (SURE) in Absprache mit der DRV Baden-Württemberg; Abdosierungsschema fachärztlich.",
      "Anerkennung nach § 35 BtMG für stationäre Langzeitrehabilitation mit Adaption.",
      "Regelbehandlung 22 Wochen, Kurzzeit 13 Wochen, Kombibehandlung erste Phase 16 Wochen.",
      "Substitutionsgestützte Rehabilitation (SURE) in Absprache mit der DRV Baden-Württemberg; verpflichtendes Vorgespräch.",
      "Indikationsgruppen u. a. Frauen-, Männer-, Migrationsgruppe und PTBS (Seeking Safety)."
    ],
    "factsExtra": [
      "Aufnahme ab 18 Jahren, Frauen und Männer.",
      "Bei Aufnahme ohne Entzugsbehandlung: nachgewiesene Beigebrauchsfreiheit von wenigstens vier Wochen (Konzeption).",
      "Aufnahme ab 18 Jahren, Frauen und Männer; Paare können gemeinsam behandelt werden.",
      "Anerkennung nach § 35 BtMG für stationäre Langzeitrehabilitation mit Adaption.",
      "Nachsorgeangebot u. a. betreutes Wohnen in Schenkenzell öffentlich genannt."
    ],
    "mitbehandlungHinweis": "Komorbide seelische Erkrankungen werden mitbehandelt, soweit rehafähig. Begleitkinder öffentlich genannt."
  },
  "ck-wittekind": {
    "kontraindikationen": [
      "Aufnahme nicht vorgesehen bei akuter Psychose, Anorexie mit vital bedrohlichem Untergewicht (BMI unter 15), stoffgebundener Abhängigkeitserkrankung, akuter Suizidalität und Pflegebedürftigkeit.",
      "Rollstuhlnutzung ist möglich, sofern keine Pflegeleistungen benötigt werden."
    ],
    "alltag": [
      "Anreise in der Regel 9:00–11:00 Uhr; Hauptanreisetage Dienstag und Mittwoch, Aufnahmen an jedem Wochentag möglich.",
      "WLAN-Hotspot im Haus 6:00–23:00 Uhr kostenfrei ohne Zugangsdaten; klinikeigene PCs mit Internetzugang.",
      "Besuch Mo–Fr 17:00–22:00 Uhr, Sa/So/Feiertag 8:00–22:00 Uhr; Besucher beim Pflegepersonal vorstellen.",
      "Nachtruhe unter der Woche 22:30–6:00 Uhr, vor therapiefreien Tagen 24:00–6:00 Uhr; Mittagsruhe 13:15–14:00 Uhr.",
      "Haustiere sind nicht gestattet. Fernseher, Wasserkocher und Bügeleisen bitte nicht mitbringen."
    ],
    "wahlleistungenHinweis": "Telefonanschluss im Zimmer gegen Telefonpauschale freischaltbar. Fernsehen in Fernsehräumen und Cafeteria.",
    "mitbehandlungHinweis": "Ärztliche Eingangsdiagnostik zu Beginn; Pflegedienstzimmer rund um die Uhr. Dauermedikation bei chronischen Erkrankungen ist nicht in den Rehabilitationsleistungen enthalten und in ausreichender Menge mitzubringen oder per Rezept vor Ort einzulösen.",
    "sozialdienstLeistungen": [
      "Informationen für Zuweiser und Sozialdienste auf der Klinikseite."
    ],
    "therapieHinweise": [
      "Schwerpunkt tiefenpsychologisch/psychoanalytische Gruppenpsychotherapie.",
      "Begleitend Sport- und Bewegungstherapie, Kunst- und Ergotherapie, indikative Angebote."
    ],
    "factsExtra": [
      "85 Therapieplätze für erwachsene Frauen und Männer.",
      "Zertifiziert nach DEGEMED 6.0 und DIN EN ISO 9001:2015.",
      "Premium-Mitglied Qualitätskliniken.de."
    ]
  },
  "ck-wolkersdorf": {
    "alltag": [
      "Großzügige Zweierzimmer mit guter Nasszelle; Therapie in alter Villa, Wohnen und Arbeiten im Neubau.",
      "Handy nur während der Therapiezeiten tagsüber abgeben, Geld selbstständig verwalten (Konzept 2024).",
      "Besuch an drei Sonntagen im Monat zwischen 12 und 17 Uhr.",
      "In der zweiten Phase Realitätstraining mit Stadtausgängen und Familienheimfahrten.",
      "Koch- und Essbereich, Wohnzimmer, Kino-, Fitness- und Therapiegarten; Basketball, Volleyball, Billard, Dart, Kicker.",
      "Arbeitstherapie in Schreinerei, Schlosserei und Küche."
    ],
    "sozialdienstLeistungen": [
      "Hilfe beim Ausfüllen von Anträgen durch Mitarbeitende vor Ort.",
      "Aufnahme auch mit justizieller Auflage nach § 35 BtMG.",
      "Trägerinterne Adaption im Einfamilienhaus in Nürnberg-Katzwang im Anschluss möglich, auch nach anderer Klinik.",
      "Bei Rückfall gemeinsame Klärung, ob die Therapie nach ggf. erneuter Entgiftung fortgesetzt werden kann.",
      "Anerkennung nach §§ 35/36 BtMG.",
      "Trägerinterne Adaption in Nürnberg-Katzwang im Anschluss möglich."
    ],
    "therapieHinweise": [
      "Drei Phasen: Eingang mit Therapieplan, erste Phase mit Vorstellung in der Gruppe, zweite Phase mit Realitätstraining.",
      "Bezugstherapie zu Ängsten, Sorgen und Plänen; Gruppenarbeit an den Therapiezielen."
    ],
    "factsExtra": [
      "Männerhaus ab 18 Jahren, bis zu 28 Plätze; Hauptindikation illegale Drogen/THC.",
      "Alkohol, Medikamente und Glücksspiel als Nebendiagnose möglich.",
      "Stadtmission Nürnberg; Lage Baimbacher Straße 2 in Schwabach-Wolkersdorf.",
      "Bis zu 28 Plätze; Regeldauer 22 Wochen laut Trägerflyer 2025.",
      "Alkohol, Medikamente und Glücksspiel als Zusatzindikation.",
      "Konzept 2024 neu gestaltet; Faltblätter für Fachpersonal und Klienten veröffentlicht."
    ]
  },
  "ck-wuermtal": {
    "kontraindikationen": [
      "Akute Psychosen, akute Suizidalität",
      "Pflegebedürftigkeit"
    ],
    "alltag": [
      "36 Plätze in einem Gebäude um die Jahrhundertwende mit eigenem Wald",
      "Sport u. a. Fußball, Volleyball, Krafttraining, Joggen; Ausflüge nach München, an Seen und in die Berge"
    ],
    "sozialdienstLeistungen": [
      "Berufliche Integration, Schuldnerberatung, Wiederherstellung des Krankenversicherungsschutzes",
      "Mietangelegenheiten, Sozialhilfebedarf, Straf-, Sozial- und Zivilrecht"
    ],
    "therapieHinweise": [
      "Schwerpunkt Doppeldiagnosen (Sucht plus Depression, Angst, Trauma, Glücksspiel)",
      "Bezugskleingruppe 6–10 Personen, zweimal 90 Minuten wöchentlich; wöchentliches Einzelgespräch",
      "Indikativgruppen: Psychoedukation, Rückfallprävention, Skilltraining und Achtsamkeit, Eingangsgruppe",
      "Arbeitstherapie: Küche und Service, Werkstatt, Garten und Wald, Wäscherei, Empfang, EDV"
    ],
    "factsExtra": [
      "Anerkennung DRV Bund und §§ 35 ff. BtMG; in Einzelfällen Abholservice"
    ],
    "mitbehandlungHinweis": "Mitbehandlung typischer Begleiterkrankungen, z. B. Polyneuropathie und Hepatitis C."
  },
  "ck-zapr-glotterbad": {
    "kontraindikationen": [
      "Akute Psychosen; akute Suizidalität.",
      "Substanzabhängigkeiten.",
      "Schwere hirnorganische Schäden; Pflegebedarf.",
      "Intelligenzminderung mit stark eingeschränkter Einsichts- und Introspektionsfähigkeit.",
      "Chronische psychiatrische Erkrankungen ohne soziale Integration."
    ],
    "alltag": [
      "Ganztägig ambulant: fester Wohnsitz und selbstständige Anreise; Klinik in der Regel in höchstens einer Stunde erreichbar.",
      "An Behandlungstagen Mittagessen; Aufenthaltsbereich mit Ruheraum, Küchenzeile und Sanitärbereich.",
      "Schwimmbad und medizinische Trainingstherapie der benachbarten Rehaklinik nutzbar."
    ],
    "mitbehandlungHinweis": "MBOR mit möglichem Berufscoaching. Angehörigen- und Familiengespräche. Lehrküche sowie Gesundheits- und Ernährungsberatung.",
    "sozialdienstLeistungen": [
      "Reha und Nachsorge, Anträge und Formulare auf der Trägerseite."
    ],
    "therapieHinweise": [
      "Ganztägig ambulante psychosomatische Rehabilitation.",
      "Kombi-Reha mit der benachbarten Rehaklinik Glotterbad: stationärer Teil, anschließend ganztägig ambulant, ohne Behandlerwechsel."
    ],
    "factsExtra": [
      "Tagesklinik der RehaZentren Baden-Württemberg.",
      "FAQs und Hinweise für Ärztinnen und Ärzte öffentlich."
    ]
  },
  "ck-zwieselberg": {
    "alltag": [
      "Zimmer mit Dusche/Bad, größtenteils Balkon.",
      "Ausgang in den ersten zwei Wochen auf die Klinikumgebung beschränkt; danach donnerstags nachmittags und am Wochenende in Absprache.",
      "Keine eigenen Fernsehgeräte; gemeinsamer Fernsehraum.",
      "Pate am Aufnahmetag; Partnerin zur Aufnahme erwünscht.",
      "Frühstück und Abendessen als Buffet; Mittagessen von der Fachklinik Hohenfreudenstadt mit drei Menüvarianten inkl. vegetarisch und Sonderkost.",
      "Besuche am Wochenende nach der Eingangsphase; Übernachtung mit der Familie außer Haus nach Absprache möglich."
    ],
    "sozialdienstLeistungen": [
      "Vorbereitung über psychosoziale Beratungsstelle, betrieblichen Sozialdienst oder Hausarzt; die Klinik hilft beim Finden der Ansprechpersonen vor Ort.",
      "Heimfahrten und Angehörigenbesuche werden in den meisten Fällen vom Kostenträger gefördert."
    ],
    "therapieHinweise": [
      "Therapiegruppe an vier Wochentagen mit Bezugstherapeutin bzw. Bezugstherapeut.",
      "Indikativgruppen u. a. Tabakentwöhnung, Rückfallprävention, Depressionsbewältigung, soziales Kompetenztraining und pathologisches Glücksspiel.",
      "Sport- und Bewegungstherapie u. a. Yoga, Nordic Walking, therapeutisches Bogenschießen, Indoor-Cycling und Skilanglauf.",
      "Kurzzeittherapie von acht Wochen sowie Kombinations- und Auffangbehandlungen öffentlich genannt.",
      "38 Therapieplätze für Männer mit Alkohol- oder Medikamentenabhängigkeit bzw. pathologischem Glücksspiel.",
      "Gemeinsames Leben im Haus ist Teil des Konzepts."
    ],
    "factsExtra": [
      "Seit 2007 zertifiziert und BAR-anerkannt.",
      "Klinikwebsite fachklinik-zwieselberg.de leitet auf die allgemeine MEDICLIN-Rehaliste um; Beleg ist das MEDICLIN-Merkblatt."
    ]
  },
};

export function steckExtra(id: string): SteckExtra | undefined {
  return STECK_EXTRA_BY_ID[id];
}
