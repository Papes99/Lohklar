/**
 * Zusätzliche Block-14-Angaben aus öffentlicher Klinikquelle.
 * Wird nur genutzt, wenn katalog-aufnahme.ts das Feld noch nicht setzt.
 * Nie erfinden. Keine zweite Wartezeit.
 */
export const AUFNAHME_EXTRA_BY_ID: Record<
  string,
  {
    unterlagen?: string[];
    entgiftungspflicht?: boolean | null;
    bearbeitungszeitHinweis?: string;
  }
> = {
  "ck-adaption-bremen": {
    "unterlagen": [
      "Bewerberbogen der Externen Adaption Bremen (Download auf der Trägerseite) bzw. Onlinebewerbung",
      "Angaben zur aktuell behandelnden Fachklinik inkl. Bezugstherapie",
      "Angabe des Kostenträgers der Rehamaßnahme"
    ]
  },
  "ck-adaption-cuxhaven": {
    "unterlagen": [
      "Kostenzusage vor Aufnahme.",
      "Antrag durch die vorbehandelnde Einrichtung.",
      "schriftliche Bewerbung mit Lebenslauf, beruflichem Werdegang und Suchtentwicklung."
    ]
  },
  "ck-adaption-heppenheim": {
    "unterlagen": [
      "ausgefüllter Bewerbungsbogen nach persönlicher Kontaktaufnahme",
      "Kostenzusage des Leistungsträgers"
    ],
    "bearbeitungszeitHinweis": "Nach Eingang des Bewerbungsbogens folgen Sichtung, persönliches Kennenlerngespräch und Rundgang vor Ort; die Aufnahme erfolgt nach Eingang der Kostenzusage."
  },
  "ck-adaption-lahr": {
    "unterlagen": [
      "Vorab Bewerbungsgespräch",
      "Nachweis der zuvor regulär abgeschlossenen suchttherapeutischen Entwöhnungstherapie",
      "Kostenzusage des Leistungsträgers"
    ]
  },
  "ck-adaption-leipzig-wermsdorf": {
    "unterlagen": [
      "schriftliche Bewerbung mit ausführlichem Lebens- und Suchtverlauf.",
      "Infogespräch im Haus.",
      "regulär abgeschlossene Entwöhnungstherapie.",
      "gültige Kostenzusage."
    ]
  },
  "ck-adaption-schwerin": {
    "unterlagen": [
      "schriftliche Bewerbung.",
      "Bewerberfragebogen.",
      "Antrag auf Adaptionsbehandlung durch die abgebende Fachklinik beim Kostenträger."
    ]
  },
  "ck-adaption-weimar": {
    "unterlagen": [
      "Kostenzusage des zuständigen Kostenträgers (Rentenversicherung, Krankenkasse oder Sozialamt).",
      "Vorstellungstermin vor der Aufnahme vereinbaren."
    ],
    "entgiftungspflicht": true
  },
  "ck-adv-f42": {
    "unterlagen": [
      "Therapieplatzbewerbungsbogen (Download auf der Klinikseite).",
      "Gültige Kostenübernahme des Leistungsträgers.",
      "Schweigepflichtentbindung zur Kontaktaufnahme mit Beratungsstelle oder Entgiftung ist hilfreich."
    ]
  },
  "ck-aggerblick": {
    "unterlagen": [
      "Für die Adaption: tabellarischer Lebenslauf, Suchtverlauf, persönliche Ziele, berufliche und Freizeitperspektiven sowie gültige Leistungszusage."
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Nach Eingang der Adaptionsbewerbung Einladung zum Vorstellungsgespräch; Aufnahmevoraussetzung dort ist eine gültige Leistungszusage."
  },
  "ck-agj-karlsruhe": {
    "unterlagen": [
      "Sozialbericht der vermittelnden Stelle.",
      "Kostenzusage bzw. Kostenverpflichtungserklärung bei Selbstzahler:innen.",
      "Schriftliche Bewerbung mit Lebenslauf und Suchtanamnese.",
      "Ggf. Nachweis einer Entgiftungsbehandlung.",
      "Aktuelle Arztbefunde einschließlich Laborwerte.",
      "Bei Medikamenteneinnahme aktueller Medikamentenplan."
    ],
    "entgiftungspflicht": true
  },
  "ck-alexianer-reha-koeln": {
    "unterlagen": [
      "Kostenzusage durch die Rentenversicherung (Bund und Land).",
      "Antrag über Suchtberatungsstelle oder Krankenhaus-Sozialdienst."
    ],
    "entgiftungspflicht": true
  },
  "ck-alkure-mainkofen": {
    "entgiftungspflicht": true
  },
  "ck-alpenblick": {
    "unterlagen": [
      "Gesundheitskarte.",
      "Wichtige medizinische Unterlagen (z. B. Arztbriefe, Impf- oder Röntgenpass).",
      "Eigene Medikamente für den gesamten Aufenthalt.",
      "Für Privatversicherte schriftliche Kostenübernahmeerklärung.",
      "Relevante Vorbefunde, aktueller Medikamentenplan und weitere medizinische Dokumente.",
      "Für Privatversicherte schriftliche Kostenübernahmeerklärung von Krankenversicherung und Beihilfestelle."
    ],
    "bearbeitungszeitHinweis": "Sobald die Kostenzusage des Kostenträgers eingetroffen ist, schriftliche Nachricht über den voraussichtlichen Aufnahmezeitraum. Keine Aufnahmezusage."
  },
  "ck-alpenland": {
    "unterlagen": [
      "Antragstellung und Sozialbericht",
      "gültige Kostenzusage",
      "Lebens- und Suchtverlauf, ggf. gerichtlicher Hintergrund",
      "Krankenversicherungskarte oder Mitgliedsbescheinigung",
      "Infektionsstatus (HIV, Hepatitis-Serologie)",
      "medizinische Vorbefunde (Entlassbriefe, Labor, Röntgen)"
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Regelmäßiger Kontakt mit dem Aufnahmebüro wird zur Planung erbeten; Vorgespräch und Besichtigung nach Absprache."
  },
  "ck-alpenland-reichenhall": {
    "unterlagen": [
      "Aktuelle Arztbriefe, Befunde und Unterlagen vorausgegangener Untersuchungen.",
      "Krankenversicherungskarte sowie Personalausweis oder Reisepass.",
      "Allergie-, Impf-, Röntgen- und Nachsorgepass sowie Diabetiker-Ausweis, soweit vorhanden.",
      "Röntgenbilder und benötigte Hilfsmittel.",
      "Dauermedikation, die ohne Unterbrechung eingenommen wird (rehabegründete Medikamente stellt die Klinik)."
    ]
  },
  "ck-alte-flugschule": {
    "unterlagen": [
      "Gültige Kostenzusage.",
      "Lebens- und Suchtverlauf."
    ],
    "entgiftungspflicht": true
  },
  "ck-ameos-luebeck-sucht": {
    "entgiftungspflicht": false,
    "unterlagen": [
      "Antragstellung über Suchtberatung im Haus oder Kooperation mit DRV Nord (Nahtlosverfahren)."
    ]
  },
  "ck-ameos-ratzeburg": {
    "unterlagen": [
      "Arztbriefe/Entlassungsbriefe des letzten Jahres sowie aktuelle Facharztberichte",
      "aktuelle Medikamentenliste, Laborwerte und EKG",
      "Röntgenbilder der letzten zwei Jahre bzw. CT-Bilder; Prothesendokumentationen soweit vorhanden",
      "Name und Anschrift von Hausarzt, Rentenversicherungsträger und Krankenkasse",
      "Ausweise soweit vorhanden (Allergie, Röntgen, Impf, Marcumar, Herzschrittmacher, Diabetiker) sowie Patientenverfügung",
      "bei DRV-Kostenträger Medikamentenvorrat für sieben Tage; frei verkäufliche Mittel für den gesamten Aufenthalt"
    ],
    "bearbeitungszeitHinweis": "Sobald ein Termin angeboten werden kann, erhalten Sie ein Einladungsschreiben."
  },
  "ck-annenhof": {
    "unterlagen": [
      "Bewerbung mit Lebenslauf, Suchtgeschichte und gewünschtem Aufnahmezeitraum",
      "gültige Kostenzusage",
      "Klärung der Nebenkosten (Bürgergeld, Übergangsgeld, Sozialhilfe)",
      "Krankenversicherungskarte oder Nachweis freiwilliger Krankenversicherung",
      "ggf. Gerichtsbescheide"
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Nach Bewerbung mit Lebenslauf und Suchtgeschichte Rückmeldung „umgehend“ zur Abstimmung der nächsten Schritte."
  },
  "ck-ansbach-haus7": {
    "unterlagen": [
      "Kostenzusage durch den Kostenträger (Rentenversicherung, Krankenkasse oder Beihilfe)."
    ],
    "entgiftungspflicht": true
  },
  "ck-asklepios-bad-schwartau": {
    "unterlagen": [
      "Prästationärer Fragebogen.",
      "Aktuelle Arztbriefe bzw. Entlassungsbericht.",
      "Krankenversichertenkarte und Rentenversicherungsnummer.",
      "Aktueller Medikamentenplan und Dauermedikation für die Reha-Dauer."
    ]
  },
  "ck-asklepios-fuerstenhof": {
    "unterlagen": [
      "Personalausweis oder Reisepass.",
      "Arztbriefe, frühere Krankenhausberichte und aktuelle Untersuchungsbefunde.",
      "Übersicht über regelmäßig benötigte Medikamente.",
      "Dauermedikation für die gesamte Reha-Dauer.",
      "Ggf. medizinische Pässe, Patientenverfügung oder Vorsorgevollmacht."
    ],
    "bearbeitungszeitHinweis": "Medizinische Unterlagen werden ärztlich gesichtet; Aufnahmetermin nach Freigabe unter Berücksichtigung von Kostenträger- und Rehabilitandenwünschen. Keine Aufnahmezusage."
  },
  "ck-auwald": {
    "unterlagen": [
      "Arztbericht",
      "Sozialbericht",
      "Kostenzusage",
      "Arztbericht.",
      "Sozialbericht.",
      "Kostenzusage des Leistungsträgers."
    ],
    "entgiftungspflicht": true
  },
  "ck-bavaria-kreischa": {
    "unterlagen": [
      "Schriftliche Kostenübernahme durch den Kostenträger.",
      "Ausgefüllte Unterlagen, die vorab zugesandt werden.",
      "Einnahmeplan von Medikamenten.",
      "Ggf. Kopie Betreuerausweis oder Vorsorgevollmacht/Patientenverfügung."
    ]
  },
  "ck-bergisch-land": {
    "unterlagen": [
      "Aktueller Medikationsplan.",
      "Bei Dialyse: gültiger Transportschein bzw. Kostenzusage der Krankenkasse für Dialysefahrten."
    ]
  },
  "ck-bergstrasse": {
    "unterlagen": [
      "Sozialbericht",
      "Antrag auf Kostengenehmigung",
      "Kostengenehmigung.",
      "Sozialbericht."
    ],
    "entgiftungspflicht": true
  },
  "ck-bergzabern": {
    "unterlagen": [
      "Befunde, Röntgenaufnahmen, EKG, Labor, Gutachten, Kernspintomographie und Arztberichte",
      "Ausgefüllter Anamnesefragebogen (freiwillig)",
      "Anschrift der behandelnden Ärzte",
      "Krankenkassenkarte",
      "Personalausweis",
      "Befunde, Arztberichte, Röntgen, EKG, Labor, Gutachten soweit vorhanden"
    ]
  },
  "ck-berleburg": {
    "unterlagen": [
      "Personalausweis.",
      "Versichertenkarte.",
      "Bescheinigungen über Zuzahlungen oder Befreiungsnachweis.",
      "Arztberichte und Laborbefunde."
    ]
  },
  "ck-berolina": {
    "unterlagen": [
      "Personalausweis oder Reisepass.",
      "Wichtige Unterlagen über die bisherige Behandlung.",
      "Liste der aktuell eingenommenen Medikamente mit Dosierung.",
      "Krankenversichertenkarte oder Klinik-Card bei Privatpatienten.",
      "Ausgefüllter Aufnahmefragebogen."
    ]
  },
  "ck-berus": {
    "unterlagen": [
      "Arztberichte / medizinische Vorbefunde",
      "Krankenversicherungskarte",
      "Personalausweis",
      "Bewilligung der Rehamaßnahme",
      "Arztberichte und Röntgenbilder soweit vorhanden",
      "Krankenversicherungskarte und Personalausweis"
    ]
  },
  "ck-birkenbuck": {
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Bei vorliegender Kostenzusage kann der Rehatermin direkt mit der Klinik vereinbart werden."
  },
  "ck-birkental": {
    "unterlagen": [
      "Krankenversicherungskarte und Röntgen-Pass.",
      "Dauermedikamente; Diabetikerinnen und Diabetiker: Teststreifen und eigenes Blutzuckermessgerät.",
      "Inkontinenzvorlagen und Stoma-Artikel für die ersten Tage, sofern benötigt."
    ]
  },
  "ck-birkenweg": {
    "unterlagen": [
      "aktueller EKG-Befund zur Aufnahme",
      "ärztliche Befunde der letzten Wochen",
      "falls kein Sozialbericht: ausführlicher Lebenslauf sowie Beschreibung der Suchtentwicklung und der Behandlungsziele",
      "Kostenzusage des Leistungsträgers",
      "Angehörige zum Aufnahmegespräch erwünscht"
    ],
    "entgiftungspflicht": true
  },
  "ck-blankenburg": {
    "unterlagen": [
      "Kostenzusage des Leistungsträgers.",
      "Sozialbericht.",
      "ärztliches Gutachten.",
      "Medikamente inkl. Originalverpackung zum Weiterverschreiben."
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Bei Kostenzusage zur Mitnahme eines Kindes als Begleitperson ist die Kinderbetreuung während der Therapiezeiten vorgesehen. Keine Aufnahmezusage."
  },
  "ck-blaukreuz-lippe": {
    "unterlagen": [
      "Persönliches Vorspräch in der Einrichtung; Probewohnen nach Absprache möglich.",
      "Stationäre Entwöhnung unmittelbar zuvor oder in den letzten 12 Monaten, oder Indikation nach Entgiftung bzw. ambulanter Reha Sucht."
    ],
    "bearbeitungszeitHinweis": "Jede Bewerberin und jeder Bewerber wird zu einem persönlichen Gespräch eingeladen; ein Probewohnen ist möglich. Keine Aufnahmezusage."
  },
  "ck-boeddiger": {
    "unterlagen": [
      "Kostenzusage (Rentenversicherung, Krankenkasse oder Jugendamt)",
      "gültige Kostenzusage (DRV, Krankenkasse oder Jugendamt)"
    ]
  },
  "ck-borkum": {
    "unterlagen": [
      "Fragebogen zur Aufnahme",
      "Anreisebestätigung",
      "Anreisebestätigung mit Ankunftszeit",
      "Info an die Diätküche bei Lebensmittelallergien und Intoleranzen"
    ]
  },
  "ck-bramstedt": {
    "unterlagen": [
      "Krankenhausbehandlung: Verordnung von Krankenhausbehandlung bzw. fachärztliche Einweisung",
      "Anmeldebogen und persönlicher Bericht",
      "Befund (nicht älter als sechs Monate; bei somatoformer Störung, PTBS, Essstörung BMI unter 15 zusätzlich nötig)",
      "Ggf. Entlassungsbericht früherer psychosomatischer/psychiatrischer Aufenthalte",
      "Reha: schriftliche Zusage der Krankenkasse bzw. Anmeldung durch den Träger (z. B. DRV)",
      "Privatversicherte: Kostenzusage der PKV oder Zusatzversicherung; Beihilfe: Bescheinigung der Beihilfefähigkeit"
    ],
    "bearbeitungszeitHinweis": "Nach vollständigen Unterlagen medizinische Prüfung; der genaue Anreisetag wird erst kurz vorher genannt. Keine Aufnahmezusage durch die Prüfung."
  },
  "ck-briese": {
    "unterlagen": [
      "Bewerbungsfragebogen der Klinik.",
      "Kostenzusage von Rentenversicherung, Krankenkasse oder Sozialamt.",
      "Nachweis einer erfolgreich abgeschlossenen Entzugsbehandlung."
    ],
    "entgiftungspflicht": true
  },
  "ck-brueckle": {
    "unterlagen": [
      "ausgefüllter Bewerbungsfragebogen der Einrichtung",
      "auf das Therapiezentrum Brückle ausgestellte gültige Kostenzusage",
      "Nachweis Krankenversicherungsschutz / Krankenkassenkarte",
      "Nachweis der qualifizierten Entgiftung (Ausnahmen vorab absprechen)",
      "Sozialbericht der Beratungsstelle",
      "Impfausweis soweit vorhanden; für Sozial- und Schuldnerberatung Zeugnisse, Bescheide und Schuldenunterlagen in Kopie"
    ],
    "entgiftungspflicht": true
  },
  "ck-buching": {
    "unterlagen": [
      "Versichertenkarte der Krankenkasse.",
      "Gültiger Personalausweis.",
      "Aktuelle Befunde der behandelnden Ärztinnen und Ärzte (z. B. Röntgen, EKG).",
      "Aktueller bundeseinheitlicher Medikationsplan.",
      "Dauermedikamente in ausreichender Menge bzw. Rezept der Hausärztin bzw. des Hausarztes.",
      "Eigene Hilfsmittel (z. B. Blutdruck- oder Blutzuckermessgerät, Einlagen)."
    ]
  },
  "ck-burgenlandklinik": {
    "unterlagen": [
      "Alle zu Hause eingenommenen Medikamente mitbringen und in der Stationszentrale abgeben",
      "Rehabilitationsantrag beim zuständigen Kostenträger (Unterstützung durch Suchtberatungsstelle)."
    ],
    "entgiftungspflicht": true
  },
  "ck-burgklinik": {
    "bearbeitungszeitHinweis": "Nach Kostenzusage plant die Patientenaufnahme den Aufenthalt und informiert schriftlich über Anreisetermin und weitere Schritte.",
    "unterlagen": [
      "Kontaktdaten und medizinische Vorbefunde.",
      "Für Akutpsychosomatik: private Kostenübernahme (PKV, Beihilfe oder Selbstzahlung); bei Direktabrechnung Abtretungserklärung und schriftliche Kostenübernahme.",
      "Optional telefonisches Vorgespräch mit Chefarzt Dr. Holger Süß bei besonderer medizinischer Indikation.",
      "Versichertenkarte",
      "Vorbefunde und medizinische Unterlagen",
      "Verordnete Medikamente für den ganzen Aufenthalt"
    ]
  },
  "ck-bussmannshof": {
    "unterlagen": [
      "Bewerbungsschreiben und kurzer Lebenslauf",
      "Sozialbericht",
      "Kostenzusage des Leistungsträgers",
      "bei Hundemitnahme Nachweis Hundesteuer und Impfungen"
    ],
    "entgiftungspflicht": true
  },
  "ck-bwlv-tagesreha-freiburg": {
    "unterlagen": [
      "Antrag über Suchtberatungsstelle, Arztpraxis oder Fachstelle Sucht Freiburg",
      "Antrag über Suchtberatungsstelle, Arztpraxis oder Fachstelle Sucht Freiburg."
    ]
  },
  "ck-bwlv-tagesreha-karlsruhe": {
    "unterlagen": [
      "Kostenzusage des Leistungsträgers."
    ],
    "entgiftungspflicht": true
  },
  "ck-bwlv-tagesreha-reutlingen": {
    "unterlagen": [
      "Antrag über eine Suchtberatungsstelle oder das Suchthilfezentrum Reutlingen."
    ]
  },
  "ck-bwlv-tuebingen": {
    "unterlagen": [
      "Bewerbungsbogen der Fachklinik Tübingen (Therapie ohne Substitution oder SURE)",
      "Angaben zur vermittelnden Beratungsstelle",
      "Schweigepflichtentbindung für die vorausgehende Entzugsbehandlung"
    ],
    "entgiftungspflicht": true
  },
  "ck-carolabad": {
    "unterlagen": [
      "Alle verfügbaren Befunde, Röntgenaufnahmen, EKG, Lungenfunktion, Labor, Gutachten, Kernspintomographie und Arztberichte",
      "Ausgefüllter Anamnesefragebogen (nach Absprache)",
      "Krankenkassenkarte und Personalausweis; Impfpass, ggf. Allergiepass und Marcumar-Pass",
      "Anschrift der behandelnden Ärzte; Schwerbehindertenausweis und Zuzahlungsbefreiung soweit vorhanden",
      "Medikamente für den gesamten Aufenthalt sowie aktuelle Hilfs- und Heilmittel (z. B. cPAP-Gerät)"
    ]
  },
  "ck-celenus-carolabad": {
    "unterlagen": [
      "Ausgefüllter Anamnesefragebogen (nach Absprache).",
      "Anschrift der behandelnden Ärzte.",
      "Krankenkassenkarte.",
      "Ggf. Zuzahlungsbefreiung und Nachweis geleisteter Zuzahlungen."
    ]
  },
  "ck-celenus-dekimed": {
    "unterlagen": [
      "Kostenzusage des Leistungsträgers",
      "bei Begleittier: Impfausweis, tierärztliche Bescheinigung und Nachweis der Hundehaftpflichtversicherung"
    ]
  },
  "ck-celenus-freiburg": {
    "unterlagen": [
      "Ausgefüllter Anamnesefragebogen (nach Absprache).",
      "Kostenzusage vor Aufnahme.",
      "Lebenslauf/beruflicher Werdegang für das Aufnahmegespräch im Sozialdienst.",
      "Ausweisdokumente und medizinische Unterlagen laut Aufnahmecheckliste."
    ]
  },
  "ck-celenus-kinzigtal": {
    "unterlagen": [
      "Ausgefüllter Anamnesefragebogen.",
      "Anschrift der behandelnden Ärzte.",
      "Krankenkassenkarte und Personalausweis.",
      "Ggf. Zuzahlungsbefreiung und Nachweis geleisteter Zuzahlungen.",
      "Angaben zur stationären Aufnahme und Behandlungsvertrag.",
      "ausgefüllter Anamnesefragebogen"
    ]
  },
  "ck-celenus-ortenau-add": {
    "unterlagen": [
      "Ausgefüllter Anamnesefragebogen.",
      "Behandlungsvertrag.",
      "Anschrift der behandelnden Ärzte.",
      "Krankenkassenkarte.",
      "Ggf. Zuzahlungsbefreiung und Nachweis geleisteter Zuzahlungen.",
      "alle verfügbaren Befunde (Röntgen, EKG, Lungenfunktion, Labor, Gutachten, Kernspintomographie, Arztberichte)"
    ]
  },
  "ck-celenus-schoemberg": {
    "unterlagen": [
      "Ausgefüllter Anamnesefragebogen (nach Absprache).",
      "Ausweisdokumente und medizinische Unterlagen.",
      "Wichtige Medikamente mindestens für die ersten drei Tage; fachfremde Medikamente für den gesamten Aufenthalt.",
      "Bei laktose- oder glutenfreier Kost: ärztliche Bescheinigung."
    ]
  },
  "ck-celenus-schweizerwiese": {
    "unterlagen": [
      "Anamnesefragebogen (nach Absprache).",
      "Anschrift der behandelnden Ärzte.",
      "Krankenkassenkarte."
    ]
  },
  "ck-change-hamburg": {
    "unterlagen": [
      "Gültige Kostenübernahme des zuständigen Leistungsträgers.",
      "Antragstellung gemeinsam mit einer Drogenberatung (z. B. SEEHAUS oder Böckmannstraße)."
    ],
    "entgiftungspflicht": true
  },
  "ck-chiemgau": {
    "unterlagen": [
      "Patientenfragebögen vollständig ausfüllen und zurücksenden.",
      "Gültiger Medikamentenplan, nicht älter als 3 Wochen.",
      "Aktuelle ärztliche Befunde und Krankenhausberichte.",
      "Aktuelle Röntgenaufnahmen.",
      "Gesundheitskarte, Personalausweis oder Reisepass; Allergiepass, Röntgenpass, Impfausweis."
    ]
  },
  "ck-curtius": {
    "unterlagen": [
      "Kostenübernahmeerklärung des Rentenversicherungsträgers oder der gesetzlichen Krankenversicherung",
      "vorhandene Behandlungsberichte",
      "Fragebögen zur stationären Aufnahme vorab zurücksenden",
      "Kostenübernahmeerklärung des Rentenversicherungsträgers oder der gesetzlichen Krankenversicherung.",
      "Vorhandene Behandlungsberichte."
    ]
  },
  "ck-db-brunnen": {
    "unterlagen": [
      "ausreichend Medikamente für die gesamte Reha einschließlich möglicher Verlängerung; seltene Präparate unbedingt mitbringen",
      "Attest bzw. Nachweis bei Allergien, Unverträglichkeiten oder ärztlich verordneten Diäten (einige Tage vor Anreise an die Patientenaufnahme)"
    ],
    "bearbeitungszeitHinweis": "Nach Kostenzusage plant die Patientenaufnahme den Aufenthalt und teilt den Anreisetermin schriftlich mit."
  },
  "ck-db-juliana": {
    "bearbeitungszeitHinweis": "Nach Kostenzusage plant die Patientenaufnahme den Aufenthalt und informiert schriftlich über den Anreisetermin. Keine Aufnahmezusage."
  },
  "ck-db-moehnesee": {
    "unterlagen": [
      "Atteste bzw. Nachweise zu Allergien, Unverträglichkeiten oder verordneten Diäten einige Tage vor Anreise an die Patientenaufnahme.",
      "Ausreichend eigene Medikamente, auch für eine mögliche Verlängerung."
    ]
  },
  "ck-db-norddeich": {
    "unterlagen": [
      "aktuelle medizinische Unterlagen und Befundberichte",
      "Krankenversicherungskarte, ggf. Zuzahlungsbefreiung",
      "verordnete Medikamente für mindestens die ersten drei Tage; rezeptfreie Mittel für den gesamten Aufenthalt",
      "ggf. ärztliches Attest zu einer Lebensmittelunverträglichkeit"
    ],
    "bearbeitungszeitHinweis": "Nach Kostenzusage plant die Patientenaufnahme den Aufenthalt und informiert schriftlich über den Anreisetermin. Aktuelle Vorlaufzeiten nennt das Aufnahmeteam. Keine Aufnahmezusage."
  },
  "ck-deignis": {
    "unterlagen": [
      "Kostenzusage des Kostenträgers (geht an die Klinik)",
      "Anmeldeformular der Klinik, das nach Eingang der Unterlagen per Post kommt",
      "Privatversicherung/Beihilfe: Kostenübernahmeerklärung plus aussagekräftige medizinische Unterlagen zur Aufnahmeprüfung",
      "Kostenzusage des Kostenträgers geht an die Klinik.",
      "Anmeldeformular der Klinik nach Eingang der Unterlagen ausfüllen und zurücksenden."
    ],
    "bearbeitungszeitHinweis": "Sobald die Unterlagen vom Kostenträger da sind, kommt das Anmeldeformular per Post; nach Rücksendung folgt die Information zum Anreisetermin."
  },
  "ck-dgd-tagesreha-ffm": {
    "unterlagen": [
      "Kostenzusage der DRV Bund, DRV Hessen, der Krankenkasse oder eines anderen Kostenträgers.",
      "Anmeldung über die Psychiatrische Institutsambulanz (PIA) der DGD Klinik Hohe Mark."
    ],
    "entgiftungspflicht": true
  },
  "ck-diako-adaption-husum": {
    "unterlagen": [
      "Kostenzusage des Leistungsträgers.",
      "Krankenversicherungsnachweis.",
      "Nachweis einer erfolgreich abgeschlossenen klinischen Entwöhnungsbehandlung."
    ]
  },
  "ck-diako-breklum": {
    "unterlagen": [
      "Kostenzusage eines Sozialleistungsträgers (Rentenversicherung, Krankenkasse oder Sozialamt)",
      "Aufnahme über niedergelassene Ärztinnen und Ärzte, Beratungsstellen oder stationäre Entzugsbehandlung nach Vorbereitung"
    ]
  },
  "ck-diana": {
    "unterlagen": [
      "Privatversicherte: Kostenübernahmeerklärung der PKV und/oder Beihilfe",
      "Allergiepass bzw. ärztliche Diagnose bei Nahrungsmittelunverträglichkeit",
      "Einwilligung zum Entlassmanagement (GKV)"
    ]
  },
  "ck-do-it": {
    "unterlagen": [
      "Online-Bewerbung oder ausgefüllter Bewerbungsfragebogen",
      "Bei Therapieerfahrung Entlassungsbericht der vorbehandelnden Einrichtung",
      "Angaben zum Entgiftungsort"
    ],
    "entgiftungspflicht": true
  },
  "ck-do-it-adaption": {
    "unterlagen": [
      "abgeschlossene Drogenentwöhnungstherapie",
      "gültige Kostenzusage des Leistungsträgers",
      "schriftliche Bewerbung mit ausführlichem Lebenslauf und individueller Suchtgeschichte"
    ]
  },
  "ck-domiziel": {
    "unterlagen": [
      "Fragebogen plus aktuelle Unterlagen nach Kontaktaufnahme.",
      "Zusage des Leistungsträgers."
    ],
    "bearbeitungszeitHinweis": "Adaptionsantrag bis spätestens vier Wochen vor Ende der stationären Entwöhnung; nach Prüfung Kontaktaufnahme, Aufnahme sobald die Zusage des Leistungsträgers vorliegt."
  },
  "ck-donnersberg": {
    "unterlagen": [
      "Fragebogen des Aufnahmemanagements",
      "vorhandene ärztliche Unterlagen",
      "Sozialbericht",
      "Zusage des Leistungsträgers"
    ],
    "entgiftungspflicht": true
  },
  "ck-drv-frankenhausen": {
    "unterlagen": [
      "Aktuelle Befunde und Untersuchungsergebnisse zur Anreise.",
      "Ärztliche Berichte sowie aktuelle Röntgen-, CT- oder MRT-Aufnahmen.",
      "Aktueller bundeseinheitlicher Medikamentenplan (samt QR-Code) und Dauermedikation."
    ]
  },
  "ck-drv-friedrichshoehe": {
    "unterlagen": [
      "Medizinischer Rehabilitanden-Fragebogen (mit Einberufung zugeschickt, bei Anreise mitbringen).",
      "Aktuelle Arzt- und Krankenhausberichte zur Anreise."
    ]
  },
  "ck-drv-hellbachtal": {
    "unterlagen": [
      "Medikamente und vorliegende medizinische Unterlagen sowie Röntgenbilder zur Aufnahmeuntersuchung."
    ]
  },
  "ck-drv-kurhessen": {
    "unterlagen": [
      "wesentliche Befundunterlagen inkl. Röntgenbilder und CT-Aufnahmen der letzten 24 Monate",
      "aktuell verordnete Medikamente für die ersten Tage",
      "Röntgen- und Impfpass",
      "Krankenkassenkarte",
      "Diabetikerausweis und Blutzuckermessgerät soweit vorhanden",
      "Erklärung über das Beschäftigungsverhältnis"
    ]
  },
  "ck-drv-lipperland": {
    "unterlagen": [
      "medizinische Unterlagen für die ärztliche Eingangsuntersuchung am Ankunftstag",
      "bei Allergien oder Unverträglichkeiten fachärztliches Attest oder Allergiepass vorab"
    ]
  },
  "ck-drv-werra": {
    "unterlagen": [
      "möglichst aktuelle Untersuchungsergebnisse zur Rehabilitation"
    ]
  },
  "ck-drv-wingertsberg": {
    "unterlagen": [
      "Taxigutschein aus dem Einladungsschreiben ausgefüllt dem Taxi übergeben",
      "zwei Badehandtücher für Anwendungen und Schwimmbad"
    ]
  },
  "ck-ebel-bergfried": {
    "unterlagen": [
      "Krankenversicherungskarte",
      "Notfall- und Impfausweis",
      "alle relevanten medizinischen Vorbefunde",
      "ggf. Allergiepass, Röntgenpass, Diabetikerausweis"
    ]
  },
  "ck-ebel-heinrich-heine": {
    "unterlagen": [
      "Krankenversicherungskarte; Notfall- und Impfausweis.",
      "Aktueller TSH-Wert und Laborwerte (großes Blutbild, Schilddrüse TSH+fT3+fT4).",
      "Relevante medizinische Vorbefunde; bundeseinheitlicher Medikamentenplan; Medikamente für die ersten drei Tage.",
      "Lebenslauf für Sozialberatung bzw. Berufsanamnese.",
      "Ggf. Allergie-, Röntgen-, Diabetiker-, Marcumar- oder Herzschrittmacherausweis; Befreiungsausweis; Patientenverfügung."
    ]
  },
  "ck-eifelhoehe": {
    "unterlagen": [
      "Antrag auf medizinische Rehabilitation",
      "Sozialbericht",
      "ärztlicher Befundbericht",
      "Einweisungsbescheid und Versichertenkarte",
      "aktueller Medikamentenplan"
    ],
    "entgiftungspflicht": true
  },
  "ck-eifelklinik": {
    "unterlagen": [
      "Ausgefüllte Rückantwort, Behandlungsvertrag, Hausordnung, Datenschutz- und Datenübermittlungserklärungen.",
      "Aktuelle Facharzt- und Krankenhausberichte.",
      "Berichte früherer Rehabilitationen.",
      "Fragebogen zur ärztlichen Aufnahme zur Aufnahmeuntersuchung."
    ]
  },
  "ck-elbingerode": {
    "entgiftungspflicht": false,
    "unterlagen": [
      "Kostenzusage des Rentenversicherungsträgers oder der Krankenkasse",
      "Aufklärungsbogen, Anamnesefragebogen und Informationsmaterial der Klinik",
      "Motivation zur Behandlung laut Flyer als Aufnahmevoraussetzung"
    ]
  },
  "ck-elbmarsch": {
    "unterlagen": [
      "Arztbericht",
      "Sozialbericht (Indikation Sucht)",
      "Zusage eines Leistungs- oder Kostenträgers",
      "Freiwilligkeitserklärung",
      "Klinik-Aufnahmeunterlagen Sucht (vor Aufnahme ausfüllen)",
      "Aufnahme-Checkliste vor Mutter-Kind-Behandlung, an die Klinik zurückzusenden."
    ],
    "entgiftungspflicht": true
  },
  "ck-erlengrund": {
    "unterlagen": [
      "Kontakt und Antrag über die örtliche Suchtberatungsstelle",
      "Kostenzusage des Leistungsträgers"
    ]
  },
  "ck-eschenberg": {
    "unterlagen": [
      "Kostenzusage",
      "Sozialbericht",
      "ärztliches Gutachten",
      "nachgewiesene Suchtmittelfreiheit ohne Entzugssymptomatik",
      "Kostenzusage des Leistungsträgers",
      "Sozialbericht und ärztliches Gutachten bzw. Befundbericht"
    ],
    "entgiftungspflicht": true
  },
  "ck-eschenburg": {
    "unterlagen": [
      "Kostenzusage (Rentenversicherung oder Krankenkasse)",
      "Antragsformular G100",
      "aktueller Befundbericht",
      "Sozialbericht",
      "Freiwilligkeitserklärung",
      "Entgiftungsbescheinigung bzw. Hausarztbescheinigung, dass Entgiftung derzeit nicht nötig ist"
    ],
    "entgiftungspflicht": true
  },
  "ck-eusserthal": {
    "unterlagen": [
      "Kostenzusage der Rentenversicherung oder Krankenkasse.",
      "ärztlicher Befundbericht.",
      "Sozialbericht der Suchtberatungsstelle (G0450/G0452).",
      "Reha-Antrag mit Wunschklinik Fachklinik Eußerthal",
      "ärztlicher Befundbericht",
      "Sozialbericht der Beratungsstelle"
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Das Haus nennt öffentlich einen Vorlauf nach Bewilligung, damit die Aufnahme möglichst nahtlos an die Entgiftung anschließen kann. Keine Aufnahmezusage."
  },
  "ck-eusserthal-landau": {
    "unterlagen": [
      "Kostenzusage des Leistungsträgers.",
      "Sozialbericht der Suchtberatungsstelle (G0450 / G0452) plus ärztlicher Befundbericht — öffentlich für die Fachklinik-Reha genannt."
    ],
    "entgiftungspflicht": true
  },
  "ck-fachklinik-meckenheim": {
    "unterlagen": [
      "gültige Krankenversicherungskarte",
      "Bewilligungsbescheid ALG II oder Sozialhilfe, sofern vorhanden",
      "ärztliche Vorberichte",
      "ärztlich verordnete Medikamente",
      "gültiger Personalausweis bzw. Aufenthaltsstatus",
      "Bewilligungsbescheid über Bürgergeld bzw. Sozialhilfe, sofern vorhanden"
    ],
    "entgiftungspflicht": true
  },
  "ck-fehmarn": {
    "unterlagen": [
      "Bewerberfragebogen",
      "Lebenslauf und Suchtverlauf",
      "Kostenzusage",
      "Medikationsplan, EKG und Laborbefunde (nicht älter als vier Wochen)",
      "diagnostische Vorbefunde und vorhandene Arztberichte"
    ],
    "entgiftungspflicht": false
  },
  "ck-franziska": {
    "unterlagen": [
      "Ärztlicher Befundbericht der behandelnden Ärztin bzw. des behandelnden Arztes.",
      "Bewilligung durch Rentenversicherung oder Krankenkasse.",
      "Bei Begleitkindern: elektronische Gesundheitskarte des Kindes sowie zwei Notfallkontakte."
    ]
  },
  "ck-fredeburg": {
    "unterlagen": [
      "Aktueller Arztbericht",
      "Zusage eines Kostenträgers",
      "Sozialbericht einer Suchtberatungsstelle (nur bei Diagnose Glücksspielsucht)",
      "Aktueller Arztbericht und Kostenzusage des Leistungsträgers.",
      "Bei Glücksspielsucht zusätzlich Sozialbericht einer Suchtberatungsstelle.",
      "Hilfreich: Berichte über Vorbehandlungen und Beratungen."
    ],
    "entgiftungspflicht": false,
    "bearbeitungszeitHinweis": "Liegen Arztbericht, Kostenzusage und ggf. Sozialbericht vor, teilt das Haus einen Aufnahmetermin mit."
  },
  "ck-freiolsheim": {
    "unterlagen": [
      "Sozialbericht der vermittelnden Stelle",
      "Kostenzusage bzw. Kostenverpflichtung bei Selbstzahlern",
      "schriftliche Bewerbung mit Lebenslauf und Suchtanamnese",
      "ggf. Nachweis einer Entgiftungsbehandlung",
      "aktuelle Arztbefunde inkl. Labor, Medikamentenplan",
      "zahnärztliche Bescheinigung über abgeschlossene Zahnsanierung"
    ],
    "entgiftungspflicht": false,
    "bearbeitungszeitHinweis": "Nach vorliegender Kostenzusage Kontaktaufnahme und Termin für das persönliche Vorgespräch."
  },
  "ck-friedrichshof": {
    "unterlagen": [
      "Bewerbung mit Lebens- und Suchtverlauf",
      "Sozialbericht der Beratungsstelle",
      "ärztliche Bescheinigung und aktueller Medikationsplan",
      "ärztliche Vorbefunde",
      "bei bekannter Infektionserkrankung Laborbefunde zu Viruslast und Therapiebedarf"
    ],
    "entgiftungspflicht": true
  },
  "ck-friedrichshof-adaption": {
    "unterlagen": [
      "Schriftliche Bewerbung mit Lebens- und Suchtverlauf.",
      "Sozialbericht der vermittelnden Beratungsstelle bzw. der abgebenden Fachklinik.",
      "Gültige Kostenzusage des Leistungsträgers für die Adaptionsphase."
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Bei fraglicher Indikation ist ein Vorstellungsgespräch zur Klärung möglich; Besichtigung nach Terminvereinbarung. Keine Aufnahmezusage."
  },
  "ck-fuerstenwald": {
    "unterlagen": [
      "Personalausweis oder Reisepass.",
      "Versichertenkarte der Krankenkasse.",
      "Impfausweis.",
      "ggf. Arztberichte aus vorhergehenden Behandlungen."
    ],
    "entgiftungspflicht": true
  },
  "ck-furth": {
    "unterlagen": [
      "aktueller Arztbericht",
      "Zusage eines Kostenträgers",
      "Sozialbericht einer Suchtberatungsstelle (bei Abhängigkeitserkrankung)",
      "Zusage des Kostenträgers"
    ],
    "entgiftungspflicht": false
  },
  "ck-gelderland": {
    "unterlagen": [
      "Aktuelle Laborergebnisse (nicht älter als vier Wochen) und letztes Ruhe-EKG, falls vorhanden.",
      "Wichtige reharelevante Vorbefunde der letzten drei Jahre, inkl. Bildgebung als Befund (Kopien, keine Originale/CDs).",
      "Medikamentenplan und Medikamente für die gesamte Reha-Dauer.",
      "Personalausweis und Krankenversichertenkarte."
    ]
  },
  "ck-germerode": {
    "unterlagen": [
      "gültige Kostenzusage",
      "Sozialbericht",
      "ärztliche Befunde",
      "Lebenslauf / beruflicher Werdegang",
      "Krankenversichertenkarte",
      "Personalausweis"
    ],
    "entgiftungspflicht": true
  },
  "ck-glotterbad": {
    "unterlagen": [
      "Personalausweis, Impfnachweis und Versichertenkarte der Krankenkasse.",
      "Alle vorhandenen ärztlichen Unterlagen sowie Medikamente für den Beginn des Aufenthalts.",
      "Bei beruflicher Problemlage: Unterlagen zur konkreten beruflichen Tätigkeit und Kontaktdaten zu Arbeitgeber bzw. Betriebsarzt."
    ]
  },
  "ck-grafrath": {
    "unterlagen": [
      "aktueller Lebenslauf und Suchtverlauf, ggf. juristischer Hintergrund",
      "Medikamentenliste vorab",
      "gültige Kostenzusage",
      "Sozialbericht mit Arztbericht",
      "unauffälliges Alkohol- und Drogenscreening",
      "Krankenversicherungskarte oder Mitgliedsbestätigung"
    ],
    "entgiftungspflicht": true
  },
  "ck-greifswald": {
    "unterlagen": [
      "Kostenübernahmeerklärung des Kostenträgers",
      "Antrag in der Regel über die behandelnde Suchtberatungsstelle"
    ],
    "entgiftungspflicht": true
  },
  "ck-groenenbach": {
    "unterlagen": [
      "Arztberichte, Laborbefunde, Bildgebung",
      "Allergie-, Diabetiker- und Impfpass",
      "ggf. Schwerbehindertenausweis",
      "Bescheinigungen über Zuzahlungen oder Befreiungsnachweis"
    ]
  },
  "ck-grossburschla": {
    "unterlagen": [
      "gültige Kostenübernahme.",
      "aktueller Befundbericht und Aufnahmeantrag, wenn Phase I nicht in Haus Germerode stattfand."
    ]
  },
  "ck-haffkueste": {
    "unterlagen": [
      "Anreisebestätigung",
      "Personalausweis, Schwerbehindertenausweis falls vorhanden",
      "Gültige Krankenversicherungskarte",
      "Aktuelle Arztberichte und Entlassungsbericht des Krankenhauses",
      "Impfpass, Allergiepass, Nahrungsmittel-Allergie-Pass, Krisenpass soweit vorhanden",
      "Aktueller Medikationsplan, Hilfsmittel und Dauermedikation"
    ]
  },
  "ck-hainberg": {
    "unterlagen": [
      "Antrag auf Leistungen zur medizinischen Rehabilitation (über Haus- bzw. Facharzt)",
      "Ärztliche Notwendigkeitsbescheinigung mit Diagnose und Begründung, warum ambulante Maßnahmen nicht ausreichen",
      "Reha über DRV: Antrag auf Leistungen zur medizinischen Rehabilitation mit Unterstützung von Haus- oder Facharzt",
      "Krankenkasse: Verordnung stationärer Reha durch antragsberechtigte Ärztin oder Arzt",
      "Ärztliche Notwendigkeitsbescheinigung mit Hinweis, dass ambulante Therapie ausgeschöpft oder unzureichend ist"
    ]
  },
  "ck-hambuehren": {
    "unterlagen": [
      "Bewerbungsbogen Adaption Hambühren.",
      "Aktuelle relevante Berichte.",
      "Arzt- und Sozialbericht.",
      "Kostenübernahmeerklärung des Leistungsträgers."
    ]
  },
  "ck-hamburg-mitte": {
    "unterlagen": [
      "Kostenübernahmeerklärung des zuständigen Renten- oder Krankenversicherungsträgers oder der Sozialhilfe."
    ]
  },
  "ck-hardtwald-ii-psom": {
    "unterlagen": [
      "Fragebogen zur Vorbereitung der Reha (vor Anreise ausfüllen, zur Aufnahmeuntersuchung mitbringen).",
      "Wichtige Vorbefunde in Kopie.",
      "Krankenhausentlassungsbericht (insbesondere bei AHB).",
      "Gutachten zur aktuellen Krankheitssituation, falls vorhanden."
    ],
    "bearbeitungszeitHinweis": "Nach Prüfung der Unterlagen schriftliche Mitteilung, ob eine Behandlung möglich ist und ab wann ein Platz zur Verfügung stehen kann. Aufnahme in der Akutklinik nur nach Terminvereinbarung. Keine Aufnahmezusage."
  },
  "ck-haseems": {
    "unterlagen": [
      "Sozialbericht der vermittelnden Stelle",
      "Kostenzusage des Leistungsträgers",
      "wichtige ärztliche Untersuchungsbefunde",
      "Klärung der juristischen Situation"
    ],
    "entgiftungspflicht": true
  },
  "ck-haus-im-sueden": {
    "unterlagen": [
      "schriftliche Bewerbung mit Suchtverlauf und tabellarischem beruflichem Lebenslauf.",
      "Kopie des Adaptionsantrags der Fachklinik.",
      "Abschlussbericht der Fachklinik.",
      "Kostenzusage des zuständigen Kostenträgers."
    ]
  },
  "ck-haus-lenne": {
    "unterlagen": [
      "Schriftliche oder mündliche Kostenübernahmeerklärung.",
      "Gültige Krankenscheine für ärztliche und zahnärztliche Behandlung.",
      "Negative Urinkontrolle auf Drogen.",
      "Nachweis über die körperliche Entgiftung."
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Während der Bearbeitung der Kostenübernahme wöchentlicher telefonischer Kontakt zwischen 9 und 15 Uhr erbeten. Bei vorliegender Kostenübernahme und freiem Platz folgt der Aufnahmetermin."
  },
  "ck-haussee": {
    "unterlagen": [
      "Selbstauskunftsbogen vor Anreise ausgefüllt zurücksenden.",
      "Krankengeschichte und Befunde bei Ankunft vorlegen (nicht per Post).",
      "Krankenversichertenkarte."
    ]
  },
  "ck-heidehof": {
    "unterlagen": [
      "Kostenzusage des Renten-, Krankenversicherungs- oder Sozialleistungsträgers"
    ],
    "entgiftungspflicht": true
  },
  "ck-heiligenfeld-berlin": {
    "unterlagen": [
      "persönlich ausgefüllter Fragebogen",
      "Krankenhauseinweisung auf die Heiligenfeld Klinik Berlin",
      "aktueller Befundbericht",
      "ggf. Entlassungsberichte der letzten zwei Jahre",
      "bei PKV/Beihilfe schriftliche Kostenzusage bzw. Beihilfebestätigung",
      "ausgefüllter Fragebogen der Heiligenfeld Kliniken."
    ]
  },
  "ck-heiligenfeld-familienklinik": {
    "unterlagen": [
      "Ausgefüllter Fragebogen / Selbstdarstellungsbogen.",
      "Aktueller ärztlicher oder therapeutischer Befundbericht (nicht älter als 3–4 Monate) bzw. Arztfragebogen.",
      "Krankenhaus-Einweisung (Verordnung von Krankenhausbehandlung) im Original.",
      "Entlassberichte stationärer Voraufenthalte psychiatrisch/psychosomatisch.",
      "Privat: ausgefüllter Aufnahmeantrag."
    ],
    "bearbeitungszeitHinweis": "Eingegangene Unterlagen werden von Aufnahmepsychologinnen und -psychologen geprüft und einer Behandlungsgruppe zugeordnet. Keine Aufnahmezusage."
  },
  "ck-heiligenfeld-waldmuenchen": {
    "unterlagen": [
      "persönlich ausgefüllter Fragebogen",
      "Krankenhauseinweisung auf die Heiligenfeld Klinik Waldmünchen",
      "aktueller Befundbericht",
      "ggf. Entlassungsberichte der letzten zwei Jahre",
      "bei PKV/Beihilfe Kostenzusage bzw. Beihilfebestätigung"
    ]
  },
  "ck-hephata-schneeberg": {
    "unterlagen": [
      "Anfragebogen der Adaption Haus am Schneeberg (PDF der Einrichtung).",
      "suchtbezogener Lebenslauf in Stichpunkten.",
      "Anfragebogen (interaktive PDF).",
      "Kostenzusage des Leistungsträgers (mündlich genügt laut Klinikseite)."
    ],
    "entgiftungspflicht": true
  },
  "ck-hermannsborn": {
    "unterlagen": [
      "Zugesandte Aufnahmeformulare ausgefüllt mitbringen.",
      "Entlassungsbrief sowie vorhandene Arztberichte, Röntgenbilder und EKG.",
      "Medikamente für mindestens drei Tage im Handgepäck.",
      "Krankenversicherungskarte (auch für Behandlungen außerhalb der Klinik).",
      "Selbstzahler- und Beihilfeverträge, soweit vorhanden."
    ]
  },
  "ck-hirtenstein": {
    "unterlagen": [
      "Reha-Antrag der betroffenen Person",
      "Sozialbericht",
      "Gültige Kostenzusage des Leistungsträgers",
      "Sozialbericht der vermittelnden Beratungsstelle bzw. des Krankenhaus-Sozialdienstes mit Arztbericht",
      "Abgeschlossener körperlicher Entzug (Entgiftung)",
      "Unauffälliges Alkohol- und Drogenscreening (Clean-Status)"
    ],
    "entgiftungspflicht": true
  },
  "ck-hochgrat": {
    "unterlagen": [
      "Verordnung von Krankenhausbehandlung (GKV) bzw. Kostenzusage PKV und ggf. Beihilfe",
      "Verordnung von Krankenhausbehandlung (GKV) bzw. Kostenzusage der privaten Krankenversicherung und ggf. der Beihilfe.",
      "ausgefüllter Fragebogen Hochgrat Klinik.",
      "ein- bis zweiseitiger Situationsbericht und tabellarischer Lebenslauf.",
      "Kurzbefund bzw. Bericht der ambulanten Psychotherapie sowie bisherige stationäre Behandlungsberichte.",
      "bei körperlichen Erkrankungen entsprechende Arztberichte."
    ]
  },
  "ck-hochstadt": {
    "unterlagen": [
      "Bewerbung mit Motivationsschreiben, Lebenslauf und Suchtverlauf",
      "Aufnahmefragebogen und Schweigepflichtentbindung (Downloadbereich)",
      "Kopie des Sozialberichts",
      "Kostenzusage",
      "Ausweisdokumente und Krankenversicherungskarte bzw. -nachweis",
      "Einkommensnachweis bzw. Bescheid über Arbeitslosengeld oder Bürgergeld, ggf. Betreuungsurkunde"
    ],
    "entgiftungspflicht": true
  },
  "ck-hoechsten": {
    "unterlagen": [
      "aktueller Medikamentenplan vor Aufnahme zur Vorab-Absprache mit dem Ärzteteam",
      "individuelle schriftliche Bewerbung mit Lebenslauf und Entwicklung der Suchterkrankung",
      "Kostenzusage des Leistungsträgers",
      "Lebenslauf und Beschreibung der Entwicklung der Suchterkrankung.",
      "Kostenzusage."
    ],
    "bearbeitungszeitHinweis": "Sobald Unterlagen und Kostenzusage vorliegen, nimmt die Klinik Kontakt wegen eines Aufnahmetermins auf."
  },
  "ck-hoehenklinik-bischofsgruen": {
    "unterlagen": [
      "aktuelle Arztbriefe, Entlassungsberichte, EKG- und Labordaten",
      "aktueller Medikamentenplan (nicht älter als eine Woche) und Medikamente in Originalverpackung für die ersten Tage",
      "Versichertenkarte; Röntgen- und Impfpass soweit vorhanden",
      "Diabetikerausweis, Gerinnungsausweis, Allergiepass soweit vorhanden",
      "Kopie der Patientenverfügung und Nachweis über Nahrungsmittelunverträglichkeit soweit vorhanden",
      "Erklärung über das Beschäftigungsverhältnis (G510) unverzüglich an die DRV zurücksenden, falls zugegangen"
    ]
  },
  "ck-holthausen": {
    "unterlagen": [
      "Kostenzusage des zuständigen Kosten- bzw. Leistungsträgers",
      "Sozialbericht der vorbereitenden Beratungsstelle",
      "Ausführlicher Arztbericht",
      "Zeugnisse und Lebenslauf (für Berufsberatung)",
      "Einkommens- oder Leistungsbescheide bzw. Unterlagen zur Schuldenregulierung, soweit vorhanden",
      "Ausführlicher Arztbericht bzw. Berichte über Vorbehandlungen"
    ],
    "entgiftungspflicht": true
  },
  "ck-holthauser-muehle": {
    "unterlagen": [
      "Sozialbericht der vorbereitenden Beratungsstelle.",
      "Ausführlicher Arztbericht.",
      "Zeugnisse und Lebenslauf für die Berufsberatung.",
      "Einkommens- oder Leistungsbescheide und Unterlagen zur Schuldenregulierung, soweit vorhanden.",
      "Kostenzusage des zuständigen Kosten- bzw. Leistungsträgers.",
      "Berichte über Vorbehandlungen und Beratungen als hilfreich ausgewiesen."
    ],
    "entgiftungspflicht": true
  },
  "ck-inntal": {
    "unterlagen": [
      "Versicherungskarte",
      "Personalausweis, ggf. Kinderausweis",
      "Allergiepass und Impfpass",
      "Medizinische Ausweise (z. B. Schrittmacher, Marcumar, Stoma)",
      "Medikamente für ca. sechs Tage bzw. teure Dauermedikation für den gesamten Aufenthalt"
    ]
  },
  "ck-irmingard": {
    "unterlagen": [
      "Ausgefüllter Patienten-Anmeldebogen bzw. Wiederanmeldebogen.",
      "Befundberichte vorangegangener ambulanter/stationärer psychiatrischer bzw. psychotherapeutischer Behandlung.",
      "Krankenhaus-Einweisung des zuweisenden Arztes bzw. Psychotherapeuten.",
      "Falls vorhanden: Befunde zu körperlichen Begleiterkrankungen.",
      "Privat-/Zusatzversicherte: Kostenzusage der PKV bzw. Beihilfe."
    ],
    "bearbeitungszeitHinweis": "Aufnahmetermine erst nach Sichtung und ärztlicher Prüfung der Unterlagen; die Sichtung kann einige Zeit in Anspruch nehmen, ohne Tageszahl. Keine Aufnahmezusage."
  },
  "ck-isargrund": {
    "unterlagen": [
      "Kostenzusage des Leistungsträgers",
      "Sozialbericht",
      "Arztbericht",
      "Sozialbericht und Arztbericht zur Antragstellung",
      "Kopien ärztlicher Vorberichte zum medizinischen Aufnahmegespräch",
      "Bereits verordnete Medikamente zur Abgabe beim Pflegepersonal am Aufnahmetag"
    ],
    "entgiftungspflicht": true
  },
  "ck-johannesbad-adaption-dortmund": {
    "unterlagen": [
      "Aktuelle Kostenzusage des Leistungsträgers.",
      "Ausgefüllter Aufnahmefragebogen vorab (Stärken und Schwächen zu Beruf und Selbstversorgung, Einschätzung Abstinenz bzw. Rückfallgefährdung).",
      "Erstgespräch, optional mit Hausbesichtigung.",
      "aktuelle Kostenzusage des Leistungsträgers",
      "ausgefüllter Aufnahmefragebogen vorab",
      "Anmeldung aus der Entwöhnungsklinik (Phase 1)"
    ],
    "entgiftungspflicht": true
  },
  "ck-johannesbad-nuernberg": {
    "unterlagen": [
      "aktueller Arztbericht inkl. Medikamentenbericht und aktuellen Laborwerten.",
      "Sozialbericht einer Suchtberatungsstelle.",
      "Zusage eines Kostenträgers."
    ],
    "entgiftungspflicht": false
  },
  "ck-kadesch-herne": {
    "unterlagen": [
      "Kostenzusage für Adaption bzw. ganztägig ambulante Rehabilitation",
      "Bei substitutionsgestützter GAR: Abstimmung der Substitution und der Beikonsumfreiheit vor Beginn"
    ]
  },
  "ck-kaisberg": {
    "unterlagen": [
      "schriftliche Bewerbung mit Lebenslauf und Suchtverlauf",
      "gültige Kostenzusage",
      "Nachweis Krankenversicherungsschutz",
      "Therapienebenkosten",
      "abgeschlossene Entgiftung bzw. Abstinenznachweis",
      "Zahnsanierung"
    ],
    "entgiftungspflicht": true
  },
  "ck-kandertal": {
    "unterlagen": [
      "Bewilligungsbescheid der Renten- oder Krankenversicherung.",
      "Ärztliche Bescheinigungen und Befundberichte zum Reha-Antrag.",
      "Reha-Antrag G0100 (Erwachsene) bzw. G0200 (Kinder- und Jugendreha) mit Angabe Wunschklinik Kandertal.",
      "Formular Wunsch- und Wahlrecht (Download auf der Klinikseite)."
    ],
    "bearbeitungszeitHinweis": "Liegt die Kostenzusage vor, vereinbaren Sie den Termin direkt mit der Klinik (Patiententelefon 07626 / 902 200)."
  },
  "ck-karthause": {
    "unterlagen": [
      "Gültige Kostenzusage des Kostenträgers.",
      "Persönliches Vorgespräch nach ausschließlich telefonischer Kontaktaufnahme mit Station 27 (Fon 0941 941-2580).",
      "gültige Kostenzusage des zuständigen Kostenträgers."
    ],
    "entgiftungspflicht": true
  },
  "ck-kieferngarten": {
    "unterlagen": [
      "Lebenslauf",
      "Suchtverlauf",
      "Therapiereflexion",
      "gültige Kostenzusage (mindestens telefonisch erteilt) zum Aufnahmetermin"
    ],
    "bearbeitungszeitHinweis": "Unterlagen vor dem Infotermin per Fax, Mail oder Post senden. Übergang von der Entwöhnung in die Adaption nahtlos."
  },
  "ck-kirchberg": {
    "unterlagen": [
      "Vorbefunde vorausgegangener Untersuchungen zum ärztlichen Aufnahmegespräch.",
      "Patientenfragebögen (auch über die App EMENTO).",
      "Digitale Einreichung von Vorbefunden und Medikationsplan über EMENTO; QR-Code und Patienten-ID stehen auf dem Einladungsschreiben."
    ]
  },
  "ck-klinik-rhoen": {
    "unterlagen": [
      "alle aktuellen medizinischen Unterlagen vom Hausarzt (bei offenen Wunden oder infektiösen Hauterkrankungen vorherige Rücksprache)",
      "aktuell gültiger bundeseinheitlicher Medikationsplan",
      "elektronische Gesundheitskarte und Schwerbehindertenausweis ab GdB 50",
      "verschreibungspflichtige Medikamente für die erste Woche",
      "beigefügte Fragebögen (gelb) vor Anreise ausfüllen",
      "bei Bahnreise Aufnahmeschein mit Ankunftszeit für den Fahrdienst"
    ]
  },
  "ck-klinik-saale": {
    "unterlagen": [
      "ärztliche Berichte sowie aktuelle Röntgen-, CT- oder MRT-Aufnahmen",
      "Medikamentenplan zur Aufnahmeuntersuchung und zu Visiten"
    ]
  },
  "ck-klosterwald": {
    "unterlagen": [
      "Kostenzusage",
      "Sozialbericht",
      "ärztlicher Befundbericht",
      "klinikeigener Fragebogen nach Terminvergabe",
      "ggf. weitere medizinische Unterlagen auf Anforderung"
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Nach Eingang der Kostenzusage prüft das Belegungsmanagement die Unterlagen; sofern keine Direktverlegung, wird umgehend ein Aufnahmetermin angeboten."
  },
  "ck-kompass-hof": {
    "unterlagen": [
      "(Kurz-)Bewerbung",
      "schriftliche oder mündliche Kostenzusage"
    ],
    "entgiftungspflicht": true
  },
  "ck-korso": {
    "unterlagen": [
      "ausgefüllter Klinik-Fragebogen",
      "persönliches Vorgespräch (Ausnahmen bei Vorbehandlung im Haus)",
      "schriftliche Kostenzusage vor Aufnahmeplanung",
      "Unterzeichnete Therapievereinbarung nach dem Vorgespräch."
    ]
  },
  "ck-kraichtal": {
    "unterlagen": [
      "gültige Kostenzusage",
      "Nachweis abgeschlossener ärztlich begleiteter ambulanter oder stationärer Entzug",
      "Einwilligungserklärung zur Datenverarbeitung",
      "bei Begleitkind ab 1 Jahr Nachweis Masern-Impfschutz"
    ],
    "entgiftungspflicht": true
  },
  "ck-kronsberg": {
    "unterlagen": [
      "Antrag auf Kostenübernahme beim Leistungsträger.",
      "Sozialbericht der Beratungsstelle.",
      "Ärztlicher Befundbericht der Hausärztin / des Hausarztes."
    ],
    "bearbeitungszeitHinweis": "Nach Kostenzusage vereinbart das Aufnahmemanagement den Termin und klärt, ob noch eine Entgiftung vorgeschaltet wird. Keine Aufnahmezusage."
  },
  "ck-lago": {
    "unterlagen": [
      "Gültige Kostenübernahme des Rentenversicherungsträgers.",
      "Abgeschlossene körperliche Entgiftung bei Aufnahme."
    ],
    "entgiftungspflicht": true
  },
  "ck-landelin": {
    "unterlagen": [
      "Nachweis über die Kostenübernahme des zuständigen Leistungsträgers",
      "ärztliche Unterlagen zur aktuellen gesundheitlichen Situation",
      "Aufstellung der aktuellen Medikation",
      "Sozialbericht der vermittelnden Stelle",
      "Freiwilligkeitserklärung",
      "Nachweis der Kostenübernahme"
    ],
    "entgiftungspflicht": true
  },
  "ck-legau": {
    "unterlagen": [
      "Sozialbericht (Suchtberatungsstelle oder BKH)",
      "ärztlicher Bericht",
      "Kostenzusage Rentenversicherung oder Krankenkasse",
      "bei Kindern zusätzlich Kostenübernahme Haushaltshilfe",
      "Sozialbericht der Suchtberatungsstelle oder des zuständigen BKH.",
      "Ärztlicher Bericht und Kostenzusage von Rentenversicherung oder Krankenkasse."
    ]
  },
  "ck-lehre": {
    "unterlagen": [
      "Kostenzusage.",
      "abgeschlossene Entzugsbehandlung."
    ],
    "entgiftungspflicht": true
  },
  "ck-liblar": {
    "unterlagen": [
      "Sozialbericht",
      "medizinischer Befundbericht",
      "Antrag auf Kostenübernahme",
      "Aufnahmeformular der Klinik",
      "Kostenzusage des Leistungsträgers",
      "Personalausweis, Krankenkassenkarte, letzter Arztbericht"
    ],
    "entgiftungspflicht": true
  },
  "ck-lichtblick": {
    "unterlagen": [
      "gültige Bewilligung des Kostenträgers",
      "Personalausweis oder Reisepass",
      "Krankenversicherungskarte",
      "Medikamenteneinnahmeplan und Medikamente",
      "Personalausweis, Krankenversichertenkarte, Einkommensnachweise",
      "aktuelle Bestätigung des Krankenversicherungsverhältnisses am Aufnahmetag"
    ],
    "entgiftungspflicht": true
  },
  "ck-lindenberg-ried": {
    "unterlagen": [
      "ausgefüllter Fragebogen zum Aufnahmegespräch (mit der Einladung oder Onlineformular)",
      "aktuelle medizinische Unterlagen (Befunde, Röntgenbilder, EKGs, Facharzt- und Krankenhausberichte)",
      "Röntgen-, Allergie-, Impf-, Blutdruckpass sowie Antikoagulantien- oder Diabetikerausweis soweit vorhanden",
      "Krankenversicherungskarte",
      "regelmäßig eingenommene Medikamente für die gesamte Aufenthaltsdauer"
    ],
    "bearbeitungszeitHinweis": "Sobald die schriftliche Kostenzusage vorliegt, informiert die Klinik über den Aufnahmetermin."
  },
  "ck-lindenhof": {
    "unterlagen": [
      "Sozialbericht der vermittelnden Stelle",
      "Kostenzusage bzw. Kostenverpflichtung bei Selbstzahlerinnen",
      "bei Mitaufnahme eines Kindes Kostenzusage für das Kind",
      "Einverständniserklärung",
      "gültiger Personalausweis",
      "Mitgliedsbescheinigung einer Krankenkasse"
    ],
    "entgiftungspflicht": true
  },
  "ck-ludwigsmuehle": {
    "unterlagen": [
      "Online-Bewerbungsfragebogen",
      "Sozialbericht der Drogenberatungsstelle",
      "Kostenzusage Rentenversicherung, Krankenversicherung oder Sozialamt",
      "für Kinder: Kostenübernahme Haushaltshilfe und Hilfe zur Erziehung (Jugendamt)"
    ],
    "bearbeitungszeitHinweis": "Nach Online-Bewerbung Rückruf bzw. E-Mail; nach Sozialbericht telefonisches Vorstellungsgespräch mit der Klinikleitung."
  },
  "ck-luisenklinik": {
    "unterlagen": [
      "Reha-Antrag mit ärztlichen Befunden an den Kostenträger"
    ],
    "bearbeitungszeitHinweis": "Nach Eingang der Kostenzusage Bestätigung mit ungefährem Aufnahmetermin; Einladungsschreiben mit Infos vor Anreise."
  },
  "ck-luisenklinik-stuttgart": {
    "unterlagen": [
      "Medikamentenplan sämtlicher eingenommener Medikamente.",
      "Vorliegende ärztliche Unterlagen.",
      "Zugesandte Formulare möglichst ausgefüllt zum ersten Tag.",
      "Portraitfoto für das therapeutische Team (kein Passfoto nötig).",
      "Kostenzusage des Kostenträgers",
      "ärztliche Befunde zum Reha-Antrag"
    ],
    "bearbeitungszeitHinweis": "Nach Eingang der Kostenzusage bestätigt die Klinik umgehend mit ungefährem Aufnahmetermin; Einladungsschreiben mit Termin und Informationen kommt vor der Anreise."
  },
  "ck-lukas-braunschweig": {
    "unterlagen": [
      "Kostenzusage des Kostenträgers.",
      "Vor der Aufnahme zugesandte Unterlagen, ausgefüllt zum Aufnahmetermin mitzubringen."
    ]
  },
  "ck-lvr-langenfeld": {
    "unterlagen": [
      "Kostenzusage auf Leistungen zur medizinischen Rehabilitation bei Alkohol-, Medikamenten- oder Cannabisabhängigkeit",
      "Kostenzusage auf Leistungen zur medizinischen Rehabilitation bei Alkohol-, Medikamenten- oder Cannabisabhängigkeit."
    ],
    "entgiftungspflicht": true
  },
  "ck-lwl-foerderturm": {
    "entgiftungspflicht": true,
    "unterlagen": [
      "Kostenzusage / Kostenübernahme."
    ]
  },
  "ck-lwl-unna-tk": {
    "unterlagen": [
      "Kostenzusage.",
      "Antrag über Suchtberatungsstelle, Krankenhaus-Sozialdienst oder suchtmedizinische Abteilung."
    ],
    "entgiftungspflicht": true
  },
  "ck-magdalenenstift": {
    "unterlagen": [
      "Kostenzusage des Leistungsträgers oder Vereinbarung einer Selbstzahlung"
    ],
    "entgiftungspflicht": true
  },
  "ck-magnus-huss": {
    "entgiftungspflicht": true,
    "unterlagen": [
      "Gültige Kostenzusage.",
      "Bewerbung, Lebenslauf, Verlauf der Abhängigkeitserkrankung oder Sozialbericht."
    ]
  },
  "ck-mainbogen": {
    "unterlagen": [
      "gültige Kostenzusage",
      "Einwilligungserklärung zur Datenverarbeitung",
      "Vorbereitung über psychosoziale Beratungsstelle, Krankenhaussozialdienst oder Betrieb",
      "Kostenzusage des Leistungsträgers"
    ],
    "entgiftungspflicht": true
  },
  "ck-marbachtal": {
    "unterlagen": [
      "Aktuelle medizinische Unterlagen (Gutachten, Arztbriefe, Krankenhausberichte, EKG, ggf. Röntgenbilder, Laborbefunde), auch neu hinzugekommene Befunde.",
      "Daten- und Anamnesebogen vor Anreise vollständig ausfüllen und zurücksenden.",
      "Gesundheitskarte; Schwerbehindertenausweis ab GdB 50 an der Rezeption vorlegen.",
      "Verschreibungspflichtige Medikamente für den Beginn der Reha; rezeptfreie Präparate selbst für die gesamte Zeit.",
      "Hilfsmittel (Blutzuckermessgerät und Teststreifen, Beatmung inkl. Sauerstoff, Stomaartikel) im Vorrat."
    ]
  },
  "ck-maria-stern": {
    "unterlagen": [
      "Schriftliche Bewerbung mit persönlichen Zielen, beruflichem Werdegang und Suchtverlauf.",
      "Therapiebericht der zuweisenden Fachklinik.",
      "Kostenübernahme.",
      "Schriftliche Bescheinigung über Drogenfreiheit durch Entgiftungsstation oder Hausärztin/Hausarzt."
    ]
  },
  "ck-marienstift": {
    "unterlagen": [
      "Ärztlicher Bericht",
      "Sozialbericht",
      "Schriftliche Kostenzusage des Leistungsträgers"
    ],
    "entgiftungspflicht": true
  },
  "ck-median-adaption-duisburg": {
    "unterlagen": [
      "Adaptionsantrag mit begründeter Indikation und therapeutischen Zielvorgaben",
      "Kostenzusage des Leistungsträgers",
      "gültiger Personalausweis für die Ummeldung in Duisburg"
    ],
    "bearbeitungszeitHinweis": "Den Adaptionsantrag erwartet der Leistungsträger spätestens vier Wochen vor Ende der Fachklinik. Das Vorstellungsgespräch ist öffentlich mit fünf bis sechs Wochen vor dem Wechsel genannt."
  },
  "ck-median-adaption-koeln": {
    "unterlagen": [
      "schriftliche oder mündliche Kostenzusage",
      "Antrag der abgebenden Klinik auf Adaptionsmaßnahme beim Kostenträger in Kopie",
      "persönliches Informationsgespräch in der Einrichtung"
    ],
    "bearbeitungszeitHinweis": "Der Antrag auf Kostenübernahme soll spätestens vier Wochen vor Abschluss der fachklinischen Behandlung beim Leistungsträger eingehen. Der Aufnahme geht ein persönliches Informationsgespräch voraus."
  },
  "ck-median-agz-duesseldorf": {
    "unterlagen": [
      "aktuelle medizinische Unterlagen (Untersuchungsergebnisse, Entlassbriefe, Laborbefunde)",
      "Liste der aktuell eingenommenen Medikamente",
      "Angaben zu Hausarzt und weiteren behandelnden Ärzten",
      "Versichertenkarte der Krankenkasse"
    ]
  },
  "ck-median-agz-hannover": {
    "unterlagen": [
      "Ärztliche Befunde der letzten zwei Jahre.",
      "Medikamente, die dauerhaft eingenommen werden müssen.",
      "Trainingshose bzw. Jogginganzug und Turnschuhe mit weißer Sohle; Handtuch."
    ]
  },
  "ck-median-agz-stuttgart": {
    "unterlagen": [
      "Kostenzusage des Leistungsträgers",
      "Sozialbericht",
      "Arztbericht mit aktuellen medizinischen Befunden",
      "Fragebogen zu Arbeit, Partnerschaft und Familie"
    ],
    "entgiftungspflicht": true
  },
  "ck-median-berggieshuebel": {
    "unterlagen": [
      "Reservierungsbestätigung an den Zentralen Reservierungsservice.",
      "Entlassungsbericht des Krankenhauses / aktuelle Arztberichte und Befunde.",
      "Patientenfragebogen / Krankenvorgeschichte.",
      "Selbstzahler und Beihilfe: Kopie der Kostenzusage."
    ]
  },
  "ck-median-berka-ilmtal": {
    "unterlagen": [
      "Unterlagen laut Einladungsschreiben vor Reha-Beginn.",
      "Anreisebestätigung an die Patientenaufnahme.",
      "Personalausweis, Krankenversichertenkarte, aktuelle Arztberichte bzw. Entlassungsbericht des Krankenhauses.",
      "Impf-, Allergie- oder Krisenpass sowie aktueller Medikationsplan (ggf. mit QR-Code).",
      "Regelmäßig benötigte Medikamente für den gesamten Aufenthalt; spezifische Dauermedikamente (z. B. Insulin) vollständig mitbringen.",
      "Selbstzahler und Beihilfe: Kopie der Kostenzusage."
    ]
  },
  "ck-median-bernkastel": {
    "unterlagen": [
      "Entlassungsbericht des Krankenhauses oder aktuelle Befunde.",
      "Krankenversicherungskarte und Personalausweis.",
      "Ggf. Befreiungsausweis und Allergiepass.",
      "Selbstzahler und Privatpatienten: Kopie der Kostenzusage."
    ]
  },
  "ck-median-brandis": {
    "unterlagen": [
      "Unterlagen laut Einladungsschreiben."
    ]
  },
  "ck-median-burggraben": {
    "unterlagen": [
      "Reservierungsbestätigung an den Zentralen Reservierungsservice senden",
      "Personalausweis, Schwerbehindertenausweis falls vorhanden",
      "Krankenversicherungskarte, Befreiungsausweis gesetzliche Zuzahlung",
      "Impfpass, Allergiepass, Marcumar-Pass soweit vorhanden",
      "Entlassungsbericht des Krankenhauses bzw. aktuelle Arztberichte und Befunde",
      "Kopie Patientenverfügung und Vorsorgevollmacht falls vorhanden; Selbstzahler und Beihilfe: Kopie der Kostenzusage"
    ]
  },
  "ck-median-daun-adaption": {
    "unterlagen": [
      "Kostenzusage",
      "Vorgespräch"
    ]
  },
  "ck-median-daun-rosenberg": {
    "unterlagen": [
      "Kostenzusage des Leistungsträgers",
      "Arztbericht",
      "Sozialbericht",
      "Freiwilligkeitserklärung (Abhängigkeitsabteilung)",
      "zugeschickter Aufnahmefragebogen (Psychosomatik)"
    ]
  },
  "ck-median-dormagen": {
    "unterlagen": [
      "Mitgliedskarte der Krankenkasse.",
      "Röntgenpass, falls vorhanden.",
      "Aktuelle Befundberichte der letzten drei Jahre bzw. aktuelle Laborwerte und EKG-Befund.",
      "Kopie der Geburtsurkunde des jüngsten Kindes, falls Anspruch auf Übergangsgeld besteht.",
      "Dauermedikation für einige Tage; Unterlagen zu Angelegenheiten mit Klärungsbedarf während des Aufenthalts."
    ]
  },
  "ck-median-gottleuba": {
    "unterlagen": [
      "Befunde, Heil- und Hilfsmittel sowie Medikamente.",
      "bereits ausgefüllte Formulare und Röntgenbilder.",
      "weitere Unterlagen laut Einladungsschreiben."
    ]
  },
  "ck-median-graal-mueritz": {
    "unterlagen": [
      "Versichertenkarte bzw. Chipkarte",
      "Medikamentenplan (ggf. mit QR-Code) und Befunde",
      "Impfausweis",
      "Bescheinigung der Reha-/Kurfähigkeit vom Heimatarzt",
      "ausreichender Vorrat der Dauermedikation für den gesamten Aufenthalt"
    ]
  },
  "ck-median-hohenfeld": {
    "unterlagen": [
      "Anreisebestätigung an den Zentralen Reservierungsservice.",
      "Entlassungsbericht des Krankenhauses sowie aktuelle Arztberichte und Befunde.",
      "Patientenfragebogen/Krankenvorgeschichte.",
      "Bei Selbstzahlern und Beihilfe: Kopie der Kostenzusage.",
      "Personalausweis und gültige Krankenversichertenkarte."
    ]
  },
  "ck-median-kinzigtal-soden": {
    "unterlagen": [
      "Anreisebestätigung an den Zentralen Reservierungsservice (nicht bei AHB).",
      "Personalausweis und bei Vorliegen Schwerbehindertenausweis.",
      "Krankenversichertenkarte, Arztberichte, Entlassungsbericht des Krankenhauses.",
      "Aktuelle Befunde (Röntgen, EKG, Labor) sowie Impf-, Allergie- oder Krisenpass.",
      "Medikamentenplan und sämtliche Medikamente in Originalverpackung für die gesamte Aufenthaltszeit bzw. das Rezept.",
      "Nahrungsmittelunverträglichkeiten vor Anreise per E-Mail an die Klinikernährung melden."
    ]
  },
  "ck-median-kuehlungsborn": {
    "unterlagen": [
      "Unterlagen laut Einladungsschreiben vor Reha-Beginn.",
      "Ausreichender Vorrat der regelmäßig einzunehmenden Medikamente für den gesamten Aufenthalt sowie aktueller Medikationsplan.",
      "Bei Nahrungsmittelunverträglichkeiten ärztliches Attest (z. B. IgE-Test) im Vorfeld.",
      "Eigene Hilfsmittel für die Nutzung während des Aufenthalts."
    ]
  },
  "ck-median-lobenstein": {
    "unterlagen": [
      "Unterlagen laut Einladungsschreiben der Klinik",
      "ausreichender Vorrat verschreibungspflichtiger und rezeptfreier Medikamente für den gesamten Aufenthalt, inkl. Dauermedikation",
      "aktueller Medikationsplan, möglichst mit QR-Code",
      "benötigte Hilfsmittel für die Nutzung während der Reha"
    ]
  },
  "ck-median-mecklenburg": {
    "unterlagen": [
      "Arztbericht",
      "Sozialbericht",
      "Kostenzusage",
      "Bewerbung mit Lebenslauf und Suchtverlauf",
      "Personalausweis, KV-Karte, Entlassungsbericht"
    ],
    "entgiftungspflicht": true
  },
  "ck-median-muehlengrund": {
    "unterlagen": [
      "Ausgefüllter Anamnesebogen.",
      "Personalausweis, gültige Krankenversicherungskarte, ggf. Schwerbehindertenausweis.",
      "Aktuelle Arztberichte, Entlassungsbericht, vorhandene Befunde (Röntgen, Labor, EKG).",
      "Impfpass, Allergiepass und aktueller Medikationsplan.",
      "Eigene Medikamente für den gesamten Aufenthalt.",
      "Anreisebestätigung vorab an den Zentralen Reservierungsservice (außer AHB)."
    ],
    "bearbeitungszeitHinweis": "Nach der Kostenzusage leitet der Leistungsträger die Unterlagen an die Klinik weiter; anschließend interne Bearbeitung."
  },
  "ck-median-odenwald": {
    "unterlagen": [
      "Für Rehabilitandinnen und Rehabilitanden bis 21 Jahren: Eigenbericht und persönliches Vorgespräch."
    ],
    "entgiftungspflicht": true
  },
  "ck-median-psm-duerkheim": {
    "unterlagen": [
      "Versichertenkarte und Personalausweis.",
      "Passfoto.",
      "Aktuelle ärztliche Unterlagen und Befunde.",
      "Medikamentenplan (ggf. mit QR-Code).",
      "Dauermedikamente für den gesamten Aufenthalt, inkl. nicht verschreibungspflichtiger Mittel.",
      "Hilfsmittel, die Sie während der Reha nutzen."
    ],
    "entgiftungspflicht": false
  },
  "ck-median-ptk-liebenwerda": {
    "entgiftungspflicht": true
  },
  "ck-median-pyrmont-psm": {
    "unterlagen": [
      "Alle vorhandenen Befundberichte und Röntgenaufnahmen von Hausarzt, Facharzt oder Krankenhaus",
      "PKV: schriftliche Kostenzusage vor Behandlungsbeginn sowie ärztlicher Befundbericht, vorzugsweise vom Facharzt für Psychiatrie/Psychotherapie oder Psychosomatik"
    ]
  },
  "ck-median-rhein-haardt": {
    "unterlagen": [
      "Kostenübernahmeerklärung (DRV, Krankenkasse, Sozialamt o. Ä.) und Terminvereinbarung mit der Klinik.",
      "Bei Entwöhnung: Sozialbericht der Suchtberatungsstelle oder des Krankenhaus-Sozialdienstes.",
      "Krankenversichertenkarte, Personalausweis, aktuelle Befunde (Röntgen, Impf-, Allergie- oder Krisenpass).",
      "Medikamente für den Beginn des Aufenthalts plus aktuellen Medikationsplan (ggf. mit QR-Code).",
      "Adressen von Angehörigen; zugesandte Fragebögen ausfüllen und vorab zurücksenden.",
      "Elektrische Rollstühle nur mit gültigem Prüfsiegel; defekte Elektrogeräte nicht mitbringen."
    ]
  },
  "ck-median-rothenfelde": {
    "unterlagen": [
      "Versichertenkarte und Vorbefunde",
      "Personalausweis, ggf. Schwerbehindertenausweis und Zuzahlungsbefreiung",
      "Entlassungsbericht bzw. aktuelle Arztberichte",
      "Impfpass, Allergiepass, Marcumar-Pass soweit vorhanden",
      "Aktueller Medikationsplan (möglichst mit QR-Code) und Medikamente für den gesamten Aufenthalt, inkl. Dauermedikation (z. B. Insulin, orale Chemotherapie)",
      "Patientenfragebogen zur Krankenvorgeschichte; Selbstzahler und Beihilfe: Kopie der Kostenzusage"
    ]
  },
  "ck-median-saale-koesen": {
    "unterlagen": [
      "Aufnahmebogen Psychosomatik / Patientenfragebogen zur Krankenvorgeschichte.",
      "Krankenversicherungskarte und Personalausweis.",
      "Entlassungsbericht des Krankenhauses / aktuelle Arztberichte.",
      "Selbstzahler und Beihilfe: Kopie der Kostenzusage."
    ]
  },
  "ck-median-salze": {
    "unterlagen": [
      "Personalausweis, Krankenversicherungskarte, ggf. Schwerbehindertenausweis und Zuzahlungsbefreiung",
      "Entlassungsbericht bzw. aktuelle Arztberichte und Befunde",
      "Impfpass, Allergiepass, Marcumar-Pass soweit vorhanden",
      "Aktueller Medikationsplan (möglichst mit QR-Code) und Medikamente für den gesamten Aufenthalt, inkl. Dauermedikation",
      "Patientenfragebogen zur Krankenvorgeschichte zum Anreisetag",
      "Selbstzahler und Beihilfe: Kopie der Kostenzusage; Reservierungsbestätigung an den Zentralen Reservierungsservice"
    ]
  },
  "ck-median-schlangenbad": {
    "unterlagen": [
      "Anreisebestätigung an den Zentralen Reservierungsservice (außer AHB).",
      "Aktuelle Arztberichte und Entlassungsbericht des Krankenhauses.",
      "Personalausweis und Krankenversicherungskarte.",
      "Vorab: Behandlungsvertrag, Anreisebestätigung, Anamnesebögen."
    ]
  },
  "ck-median-schmannewitz": {
    "unterlagen": [
      "Chipkarte der Krankenkasse.",
      "Personalausweis.",
      "Impfpass und Allergiepass.",
      "aktuell eingenommene Medikamente.",
      "falls vorhanden: aktuelle Befunde, Krankenpapiere, Röntgenaufnahmen."
    ]
  },
  "ck-median-schoenen-moos": {
    "unterlagen": [
      "Kostenzusage des Renten- oder Krankenversicherungsträgers.",
      "Selbstzahler, Beihilfe und Privatversicherte klären Aufnahmemodalitäten direkt mit der Klinik."
    ]
  },
  "ck-median-sonnenhang": {
    "unterlagen": [
      "aktuelle medizinische Unterlagen und Sozialbericht",
      "gültige Kostenübernahmeerklärung",
      "abgeschlossene Entgiftungs- bzw. Entzugsbehandlung",
      "Aktuelle medizinische Unterlagen und Sozialbericht.",
      "Gültige Kostenübernahmeerklärung.",
      "Zwei Fragebögen und Terminbestätigung nach Kostenzusage."
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Nach Aufnahme- und Aktenprüfung Mitteilung der Hauszuordnung mit dem Einladungsschreiben. Keine Aufnahmezusage."
  },
  "ck-median-suedpark": {
    "unterlagen": [
      "Versichertenkarte",
      "Personalausweis",
      "Passfoto",
      "aktuelle ärztliche Unterlagen und Befunde",
      "aktueller Medikamentenplan, ggf. mit QR-Code",
      "ausreichender Vorrat der Dauermedikation für den gesamten Aufenthalt"
    ]
  },
  "ck-median-toenisstein": {
    "unterlagen": [
      "Personalausweis",
      "Krankenversicherungskarte",
      "medizinische Unterlagen und Medikamentenplan laut Checkliste",
      "Versichertenkarte, Impfpass und Kostenzusage.",
      "Unterlagen für Übergangsgeld bzw. Bescheide über Geldleistungen.",
      "Medikamente für den gesamten Aufenthalt inkl. nicht verschreibungspflichtiger Präparate sowie aktueller Medikationsplan (ggf. mit QR-Code)."
    ]
  },
  "ck-median-waldsee": {
    "unterlagen": [
      "Kostenzusage für die Dauer der Behandlung",
      "Arztbericht",
      "Sozialbericht",
      "Antrag auf Übernahme von Therapienebenkosten sofern erforderlich",
      "Zahnsanierungsbescheinigung",
      "Nachweis über die Krankenversicherung"
    ],
    "entgiftungspflicht": true
  },
  "ck-median-wied": {
    "unterlagen": [
      "schriftliche Kostenzusage",
      "Sozialbericht",
      "Arztbericht / aktuelle medizinische Unterlagen",
      "zwei Fragebögen nach Terminvergabe",
      "Terminbestätigung"
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Nach Eingang der Kostenzusage Kontakt zur Terminabsprache binnen weniger Werktage; Rückmeldung zur Aufnahmeprüfung anhand Sozial- und Arztbericht binnen kurzer Zeit."
  },
  "ck-median-wigbertshoehe": {
    "unterlagen": [
      "Antrag",
      "Sozialbericht",
      "ärztlicher Befundbericht",
      "Kostenzusage",
      "Aktuelle medizinische Unterlagen und Medikamentenplan (ggf. mit QR-Code).",
      "Ausreichender Vorrat der Dauermedikation für den gesamten Aufenthalt, inkl. Insulin und ähnlicher Präparate."
    ],
    "bearbeitungszeitHinweis": "Nach Eingang der Kostenzusage und bindender Terminabsprache kommt das Einladungsschreiben mit Aufnahmetermin."
  },
  "ck-median-wismar": {
    "unterlagen": [
      "Personalausweis und gültige Krankenversicherungskarte.",
      "Entlassungsbericht bzw. aktuelle Arztberichte und Befunde.",
      "Impfpass, Allergiepass, ggf. Schwerbehindertenausweis.",
      "Aktueller Medikationsplan und Medikamente für den gesamten Aufenthalt.",
      "Für Selbstzahler und Beihilfe: Kopie der Kostenzusage.",
      "Patientenfragebogen bzw. Krankenvorgeschichte zum Anreisetag."
    ]
  },
  "ck-mediclin-baar": {
    "unterlagen": [
      "Personalausweis",
      "Elektronische Gesundheitskarte (Krankenversichertenkarte)",
      "Sozialversicherungsnummer",
      "Arztberichte und Röntgenbilder",
      "Liste verordneter Medikamente; Allergiepass sofern vorhanden",
      "Bescheid über Grad der Behinderung sofern vorhanden; Bankverbindung mit BIC und IBAN"
    ]
  },
  "ck-mediclin-bad-wildungen": {
    "unterlagen": [
      "Personalausweis",
      "Krankenversichertenkarte",
      "Sozialversicherungsnummer",
      "ärztliche Befunde und Laborbefunde",
      "verordnete Medikamente in Originalverpackung",
      "Allergiepass"
    ],
    "entgiftungspflicht": false
  },
  "ck-mediclin-bliestal": {
    "unterlagen": [
      "Kostenübernahmeerklärung",
      "digitaler Aufnahmefragebogen (möglichst früh, spätestens zwei Wochen vor Anreise)",
      "Arztberichte und Laborbefunde zur Anreise",
      "Privatversicherte: Leistungszusage vor Behandlungsbeginn"
    ],
    "entgiftungspflicht": false,
    "bearbeitungszeitHinweis": "Nach dem Reha-Bescheid erst Terminauskunft, wenn die Unterlagen des Kostenträgers in der Klinik eingetroffen sind."
  },
  "ck-mediclin-deister-weser": {
    "unterlagen": [
      "Arztberichte",
      "Röntgenbilder",
      "Personalausweis, Krankenversichertenkarte, Sozialversicherungsnummer.",
      "Arztberichte, Röntgenbilder, Allergiepass, Bescheid über den Grad der Behinderung.",
      "Verordnete Medikamente und Medikationsplan.",
      "Bankverbindung mit BIC und IBAN."
    ],
    "entgiftungspflicht": false
  },
  "ck-mediclin-duenenwald": {
    "unterlagen": [
      "Häusliche Dauermedikation für die gesamte Aufenthaltsdauer (rezeptiert mitbringen).",
      "Personalausweis und Krankenversichertenkarte.",
      "Allergie- bzw. Impfpass, Röntgenbilder sowie EKG- und Laborbefunde.",
      "Sozialversicherungsnummer",
      "Arztberichte",
      "ggf. Bescheid über Grad der Behinderung"
    ]
  },
  "ck-mediclin-reichshof": {
    "unterlagen": [
      "Arztberichte",
      "Röntgenbilder",
      "Krankenkassenkarte",
      "Personalausweis",
      "Allergiepass",
      "Bescheid über Grad der Behinderung"
    ],
    "entgiftungspflicht": false
  },
  "ck-mediclin-seepark": {
    "unterlagen": [
      "Krankenversichertenkarte",
      "Personalausweis",
      "Original-Röntgenbilder, Impfpass und sonstige wichtige Dokumente",
      "vom Hausarzt verordnete Medikamente und genaue Aufstellung",
      "Privatpatienten: schriftliche Kostenzusage vor Aufnahme",
      "Original-Röntgenbilder, Impfpass und sonstige wichtige Gesundheitsdokumente"
    ],
    "entgiftungspflicht": false,
    "bearbeitungszeitHinweis": "Digitalen Aufnahmefragebogen möglichst früh, spätestens zwei Wochen vor Anreise ausfüllen."
  },
  "ck-mediclin-soltau": {
    "unterlagen": [
      "Krankenkassenkarte",
      "gegebenenfalls Einweisung",
      "als Privatpatient die schriftliche Kostenzusage",
      "digitaler Aufnahmefragebogen vor Anreise"
    ]
  },
  "ck-mediclin-vogelsang": {
    "unterlagen": [
      "Personalausweis",
      "Elektronische Gesundheitskarte",
      "Sozialversicherungsnummer",
      "Arztberichte",
      "Röntgenbilder",
      "Allergiepass (wenn vorhanden)"
    ],
    "entgiftungspflicht": false,
    "bearbeitungszeitHinweis": "Digitalen Aufnahmefragebogen möglichst früh, spätestens zwei Wochen vor Anreise ausfüllen."
  },
  "ck-medicoreha-rheydt": {
    "unterlagen": [
      "Reha-Antrag G100 und Anlage G110 sowie Checkliste medizinischer Unterlagen G101i über die Trägerseite",
      "Selbsteinschätzungsbogen G115",
      "für die sozialmedizinische Sprechstunde alle relevanten Befunde; eine Überweisung ist laut Träger nicht erforderlich"
    ]
  },
  "ck-mevesta-fellbach": {
    "unterlagen": [
      "unmittelbar vorangegangener Abschluss einer stationären Entwöhnungsbehandlung (legale oder illegale Suchtmittel oder Spielsucht)",
      "unmittelbar vorangegangener Abschluss einer stationären Entwöhnungsbehandlung."
    ]
  },
  "ck-mi-pyrmont": {
    "unterlagen": [
      "Ärztliche Berichte, Untersuchungsbefunde und Röntgenaufnahmen.",
      "Berichte bisheriger Therapeutinnen und Therapeuten (z. B. Krankengymnastik, Ergotherapie), soweit vorhanden.",
      "Versichertenkarte der Krankenkasse.",
      "Rentenversicherungsausweis bei Aufnahme über die Deutsche Rentenversicherung.",
      "Aktuell eingenommene Medikamente.",
      "Bisher genutzte Hilfsmittel (z. B. Rollstuhl, Gehhilfen, Einlagen, Schienen)."
    ]
  },
  "ck-michels-brandenburg": {
    "unterlagen": [
      "Krankenkassenkarte",
      "Medikamentenplan",
      "aktuelle Befunde",
      "eventuell Patientenfragebogen"
    ]
  },
  "ck-michels-pankow": {
    "unterlagen": [
      "vorhandene Befunde und Röntgenbilder zur ärztlichen Aufnahmeuntersuchung",
      "sportliche Kleidung, Turnschuhe und ein großes Handtuch"
    ]
  },
  "ck-mittelrhein": {
    "unterlagen": [
      "Arztbriefe, aktuelle Untersuchungsbefunde, Röntgenaufnahmen",
      "Krankenversicherungskarte, ggf. Befreiungsausweis der Krankenkasse",
      "Nachsorgepass, Diabetespass und -tagebuch, Allergiepass, Röntgennachweisheft",
      "Alle Medikamente inkl. Medikamentenplan"
    ]
  },
  "ck-moehringsburg": {
    "unterlagen": [
      "Leistungszusage der Krankenkasse oder Rentenversicherung."
    ]
  },
  "ck-motzen": {
    "unterlagen": [
      "Reha-Antrag G 100",
      "Aktueller ärztlicher Befundbericht von Haus- oder Facharzt",
      "Personalausweis",
      "Krankenversichertenkarte",
      "Aktuelle Befundunterlagen, Entlassungsberichte und Medikamentenplan",
      "Reha-Antrag G 100 mit ärztlichem Befundbericht"
    ]
  },
  "ck-muenchwies": {
    "unterlagen": [
      "Reha-Antrag",
      "Sozialbericht",
      "ärztlicher Befundbericht",
      "schriftliche Kostenzusage",
      "Reha-Antrag, Sozialbericht und ärztlicher Befundbericht",
      "Ausgefüllter Anmeldebogen vor der Anreise an die Klinik"
    ],
    "entgiftungspflicht": true
  },
  "ck-muenzesheim": {
    "unterlagen": [
      "Gültige Kostenzusage des zuständigen Leistungsträgers.",
      "Negatives Drogenscreening bei Aufnahme.",
      "Einwilligungserklärung zur Erhebung und Verarbeitung der Behandlungsdaten."
    ],
    "entgiftungspflicht": true
  },
  "ck-nado-dortmund": {
    "unterlagen": [
      "Schriftliche Bewerbung.",
      "Lebens- und Suchtverlauf.",
      "Therapiereflexion.",
      "Ausführliches Informationsgespräch in der Einrichtung vor der Aufnahmeentscheidung."
    ]
  },
  "ck-nauheim": {
    "unterlagen": [
      "Arztbericht",
      "Sozialbericht",
      "Zusage eines Leistungs- oder Kostenträgers",
      "Freiwilligkeitserklärung",
      "Vor-Aufnahmefragebogen (nach Bewilligung)",
      "Vor-Aufnahmefragebogen (nach Einladung)"
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Aufnahmetag und erwartete Ankunftszeit werden rechtzeitig mitgeteilt."
  },
  "ck-nettetal": {
    "unterlagen": [
      "Schriftliche Bewerbung.",
      "Sozialbericht der vermittelnden Stelle.",
      "Kostenzusage des Leistungsträgers.",
      "Aktueller Krankenversicherungsschutz.",
      "Wichtige ärztliche Untersuchungsbefunde (z. B. aktuelle Laborwerte, Berichte über stationäre Aufenthalte).",
      "Klärung der juristischen Situation."
    ],
    "entgiftungspflicht": true
  },
  "ck-neue-rhoen": {
    "unterlagen": [
      "Bewilligung des Leistungsträgers (Rentenversicherung, Krankenkasse oder Sozialamt)",
      "regelmäßig eingenommene Medikamente und vorhandene Rezepte (Verwaltung in der medizinischen Abteilung)"
    ],
    "entgiftungspflicht": true
  },
  "ck-neumuehle": {
    "unterlagen": [
      "Kostenübernahmeerklärung des zuständigen Leistungsträgers",
      "Bewerbung mit Lebens- und Suchtverlauf",
      "Schriftliche Bescheinigung über Drogenfreiheit durch Entgiftungsstation oder niedergelassene Ärztin/Arzt",
      "Versichertenkarte der Krankenkasse",
      "In gesondert verabredeten Fällen ein Vorgespräch"
    ],
    "entgiftungspflicht": true
  },
  "ck-nordlicht": {
    "entgiftungspflicht": true
  },
  "ck-oberharz": {
    "unterlagen": [
      "Arztberichte und -befunde, soweit vorhanden.",
      "Krankenversicherungskarte; Allergie-, Impf- und ggf. Nachsorgepass.",
      "Medikamentenplan; Schwerbehindertenausweis sofern vorhanden.",
      "Rezeptpflichtige und freiverkäufliche Medikamente, die nicht zur onkologischen, hämatologischen oder psychosomatischen Behandlung gehören."
    ]
  },
  "ck-oelmuehle": {
    "unterlagen": [
      "Kostenzusage des Leistungsträgers (DRV, Krankenkasse, Sozialhilfe u. a.).",
      "Befundbericht von Arzt oder Psychotherapeut, Sozialbericht der Suchtberatungsstelle und Reha-Antrag.",
      "aktueller Medikamentenplan; alle aktuell benötigten Medikamente.",
      "Entlassungsberichte aus dem Krankenhaus (z. B. Entzugsbehandlung) und ggf. frühere Reha-Abschlussberichte.",
      "psychotherapeutische Berichte soweit vorhanden; Suchtverlauf und kurzes Motivationsschreiben.",
      "Versichertenkarte; Lebenslauf, Diabetikerausweis und Allergiepass soweit vorhanden."
    ],
    "entgiftungspflicht": true
  },
  "ck-oerrel": {
    "entgiftungspflicht": true
  },
  "ck-oldenburger-land": {
    "entgiftungspflicht": true
  },
  "ck-ostberge": {
    "unterlagen": [
      "schriftliche Kostenübernahme des zuständigen Leistungsträgers"
    ]
  },
  "ck-osterholz": {
    "unterlagen": [
      "Gültige Kostenübernahme des Leistungsträgers",
      "Antrag in der Regel über eine Suchtberatungsstelle; in Bremen u. a. Gesundheit Nord oder ambulante Suchthilfe Bremen"
    ],
    "entgiftungspflicht": true
  },
  "ck-park-klinik-driburg": {
    "unterlagen": [
      "Unterlagen aus dem Einladungsschreiben der Park Klinik, bei Anreise greifbar halten"
    ]
  },
  "ck-park-schwalbach": {
    "unterlagen": [
      "medizinische Unterlagen (Röntgenbilder, CT-Befunde, Labor-Befunde, Arztberichte über psychosomatische oder psychiatrische Behandlungen)",
      "aktuell verordnete Medikamente",
      "Erklärung über das Beschäftigungsverhältnis, falls zugesandt (für Übergangsgeld)"
    ],
    "entgiftungspflicht": false
  },
  "ck-park-steben": {
    "unterlagen": [
      "Krankenversicherungskarte",
      "Notfall- und Impfausweis",
      "relevante medizinische Vorbefunde",
      "ggf. Allergiepass, Röntgenpass, Diabetikerausweis, Marcumar-Pass, Herzschrittmacherausweis",
      "ggf. Röntgenaufnahmen, Laborbefunde, Arztbriefe",
      "ggf. Befreiungsausweis"
    ],
    "entgiftungspflicht": false
  },
  "ck-parkland": {
    "unterlagen": [
      "Aufnahmefragebogen / Anmeldebogen Akut (vollständig ausgefüllt)",
      "vollständig ausgefüllter Aufnahmefragebogen bzw. Anmeldebogen Akut (per E-Mail an info@parkland-klinik.de)",
      "Versichertenkarte der Krankenkasse",
      "Medikamentenplan (Ausdruck Hausarzt); im Akutbereich zusätzlich Medikamente für mindestens zwei Wochen",
      "ärztliche Befunde und Arztberichte in Kopie, soweit nach der Anmeldung neu hinzugekommen",
      "ausgefüllter Aufnahmebogen zur pflegerischen Aufnahme am Anreisetag"
    ],
    "entgiftungspflicht": false
  },
  "ck-paul-ehrlich": {
    "unterlagen": [
      "Ausgefüllter Patientenfragebogen vor Anreise zurücksenden.",
      "Ärztliche Befunde und Krankenhausberichte, falls vorhanden.",
      "Aktuelle Röntgenaufnahmen, EKG und Laborwerte, falls vorhanden.",
      "Krankenkassenkarte, Personalausweis oder Reisepass.",
      "Liste der Dauermedikation; Allergiepass, Diabetiker-Ausweis, Röntgenpass."
    ]
  },
  "ck-petersen-rostock": {
    "unterlagen": [
      "Bewilligter Reha-Antrag / Kostenzusage",
      "Lebenslauf bzw. Unterlagen zur berufsbezogenen Anamnese"
    ],
    "entgiftungspflicht": true
  },
  "ck-pfalzburger": {
    "unterlagen": [
      "Fragebogen des Aufnahme-Teams",
      "soweit vorhanden Entlassbericht nach Entzugsbehandlung in Kopie",
      "bei strafrechtlichen Auflagen Urteil sowie Bewährungs- und Therapieauflagen in Kopie",
      "Aufnahme-Fragebogen.",
      "Ärztliche Unterlagen soweit vorhanden (z. B. Entlassbericht nach Entzug).",
      "Kostenübernahme des Rentenversicherers bzw. der Krankenkasse."
    ],
    "entgiftungspflicht": true
  },
  "ck-pirna-adaption": {
    "unterlagen": [
      "Kostenübernahmebescheid des Leistungsträgers"
    ]
  },
  "ck-prowo": {
    "unterlagen": [
      "Adresse und Telefon der Drogenberatungsstelle bzw. vermittelnden Stelle",
      "gültige Leistungszusage (Rentenversicherung, Krankenkasse oder überörtlicher Sozialhilfeträger)",
      "Bescheinigung über abgeschlossene Entzugsbehandlung oder Abstinenznachweis durch Screenings",
      "Sozialbericht",
      "negatives Drogenscreening"
    ],
    "entgiftungspflicht": true
  },
  "ck-prowo-koeln": {
    "unterlagen": [
      "Telefonische Kontaktaufnahme unter 0221 6401715 bzw. adaption@prowo.de; schriftliche Unterlagen laut Trägerseite nicht erforderlich."
    ]
  },
  "ck-pzn-landhaus": {
    "unterlagen": [
      "Kostenzusage."
    ],
    "entgiftungspflicht": true
  },
  "ck-ratingen": {
    "unterlagen": [
      "Gültige Kostenzusage des Leistungsträgers",
      "Sozialbericht der vermittelnden Beratungsstelle bzw. des Krankenhaus-Sozialdienstes",
      "Bei Bedarf abgeschlossener körperlicher Entzug",
      "Ggf. unauffälliges Alkohol- und Drogenscreening (Cleanstatus)",
      "Krankenversicherungskarte oder Mitgliedsbescheinigung",
      "Ggf. medizinische Vorbefunde"
    ],
    "bearbeitungszeitHinweis": "Regelmäßige Kontakte mit dem Aufnahmebüro (Montag bis Donnerstag 9–12 Uhr) per Telefon oder E-Mail zum Nachweis der Behandlungsmotivation. Besichtigung freitags 10:30 Uhr nach Terminabsprache.",
    "entgiftungspflicht": true
  },
  "ck-reha-viersen": {
    "unterlagen": [
      "Schriftliche Bewilligung bzw. Kostenübernahme des Kostenträgers.",
      "Bei der Deutschen Rentenversicherung: Formulare G0100, G0110 und G0115 sowie ärztlicher Befundbericht.",
      "Bei der gesetzlichen Krankenkasse: Antrag über die behandelnde Ärztin bzw. den behandelnden Arzt (Formular 61 A–E) mit Befunden."
    ]
  },
  "ck-release": {
    "unterlagen": [
      "Schriftliche Bewerbung mit Lebens- und Suchtverlauf",
      "Sozialbericht / ärztliches Gutachten",
      "Leistungszusage für den Behandlungsplatz und Zusage der Therapienebenkosten",
      "Krankenversicherung, Pass/Personalausweis, ggf. Aufenthaltsstatus",
      "Bei Bedarf Nachweis über die Einstellung auf ein Substitutionsmittel",
      "Sozialbericht bzw. ärztliches Gutachten der Entsendestelle"
    ],
    "entgiftungspflicht": true
  },
  "ck-release-adaption": {
    "unterlagen": [
      "Leistungszusage für die Behandlungskosten",
      "schriftliche oder telefonische Bewerbung",
      "Überleitungsbogen Adaption"
    ]
  },
  "ck-richelsdorf": {
    "unterlagen": [
      "Arztbericht",
      "Sozialbericht",
      "Information über den Verlauf der Entgiftung",
      "Kostenzusage des Leistungsträgers"
    ],
    "entgiftungspflicht": true
  },
  "ck-ringgenhof": {
    "unterlagen": [
      "Schriftliche Bewerbung mit Lebenslauf und Darstellung der Suchterkrankung",
      "Kostenzusage des Leistungsträgers"
    ],
    "entgiftungspflicht": true
  },
  "ck-rosenberg": {
    "unterlagen": [
      "ausgefüllter Fragebogen zu Ihrer Gesundheit (vor Anreise; Grundlage des ärztlichen Aufnahmegesprächs)",
      "Befundberichte",
      "Röntgenbilder",
      "Medikationsplan der behandelnden Ärztin/des behandelnden Arztes",
      "Medikamente in der Originalverpackung",
      "Versichertenkarte"
    ],
    "entgiftungspflicht": false,
    "bearbeitungszeitHinweis": "Nach Kostenzusage schriftlicher Anreisetermin, sobald die Patientenaufnahme geplant hat."
  },
  "ck-roseneck": {
    "unterlagen": [
      "Anmeldebogen",
      "persönlicher Bericht",
      "Kopie der Krankenhauseinweisung (Facharzt Psychiatrie/Nervenarzt/Psychosomatik oder Psychotherapie)",
      "Sorgerechtsbestätigung bei Minderjährigen",
      "Anmeldebogen und persönlicher Bericht (bevorzugt über das Online-Formular)",
      "Kopie der Krankenhauseinweisung von Facharzt oder Psychotherapeutin bzw. Psychotherapeut"
    ],
    "bearbeitungszeitHinweis": "Online-Anmeldung wird vorrangig geprüft; Anmeldungen per Post oder E-Mail dauern länger."
  },
  "ck-rosenhoehe": {
    "unterlagen": [
      "Aktuell eingenommene Medikamente zur Aufnahmeuntersuchung mitbringen."
    ]
  },
  "ck-roswitha": {
    "unterlagen": [
      "Kostenübernahmeerklärung einer Krankenkasse oder Rentenversicherung",
      "Ausgefüllte Anreisebestätigung",
      "Ausgefüllter Patientenfragebogen"
    ],
    "entgiftungspflicht": false,
    "bearbeitungszeitHinweis": "Sobald die Kostenzusage vorliegt, kommt das Einladungsschreiben mit Aufnahmetermin."
  },
  "ck-rothaar": {
    "unterlagen": [
      "Antrag auf Kostenübernahme beim Leistungsträger",
      "Sozialbericht",
      "ärztliches Gutachten / Befundbericht (S0051)",
      "Antrag auf Kostenübernahme beim Leistungsträger (u. a. Formular G0100, Wunschklinik auf Seite 2)",
      "ärztliches Gutachten bzw. Befundbericht",
      "aktueller Medikamentenplan"
    ],
    "entgiftungspflicht": false
  },
  "ck-rusteberg": {
    "unterlagen": [
      "Reha-Antrag zusammen mit Haus- oder Fachärztin bzw. Haus- oder Facharzt beim Leistungsträger",
      "Reha-Bescheid; danach Meldung bei der Fachklinik zur Terminvergabe"
    ],
    "entgiftungspflicht": true
  },
  "ck-saaletalklinik": {
    "unterlagen": [
      "Kostenübernahmeerklärung eines Kosten- und Leistungsträgers.",
      "Ausführlicher Arztbericht mit Laborbefunden.",
      "Sozialbericht einer Psychosozialen Beratungsstelle, Fachambulanz oder Fachklinik."
    ],
    "entgiftungspflicht": true
  },
  "ck-sachsenklinik": {
    "unterlagen": [
      "Rückmeldung bzw. Klinikaufnahmevertrag aus dem Einladungsschreiben.",
      "Informationsblatt zum Aufenthalt (liegt dem Einladungsschreiben bei).",
      "Medikamente für die ersten Tage.",
      "Formulare für den Gepäckversand mit Hermes, falls genutzt (liegen dem Einladungsschreiben bei)."
    ],
    "bearbeitungszeitHinweis": "Mit dem Einladungsschreiben kommen Aufnahmetermin, Informationsblatt und Rückmeldung bzw. Klinikaufnahmevertrag; die Rückmeldung bitte zeitnah zurücksenden."
  },
  "ck-salus-adaption-huerth": {
    "unterlagen": [
      "Schriftliche Bewerbung: Bewerbungsschreiben, Lebenslauf, Suchtverlauf, ärztliche und therapeutische Stellungnahmen.",
      "Persönliches Bewerbungs- und Informationsgespräch.",
      "Ausgefüllte Fragebögen „Lebensumfeld und beruflicher Werdegang“ und „Fragebogen zur Person“.",
      "Versichertenkarte, ggf. Zuzahlungsbefreiung, Röntgen- und Impfpass; bei ALG II aktueller Bewilligungsbescheid.",
      "Ärztlich verordnete Medikamente (Abgabe in der Medizinischen Zentrale bei Aufnahme).",
      "Leistungsbewilligung durch den zuständigen Träger."
    ],
    "entgiftungspflicht": true
  },
  "ck-salus-castrop": {
    "unterlagen": [
      "Kostenzusage des Leistungsträgers",
      "Krankenversicherungskarte",
      "Impf- und Röntgenpass soweit vorhanden",
      "Medikamente zur Abgabe an die aufnehmende Ärztin bzw. den aufnehmenden Arzt",
      "Sportkleidung inkl. Hallenschuhe, Badezeug, große Badetücher sowie Gebrauchskleidung"
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Aufnahmetermin erst nach Eingang der Kostenzusage. Drei Wochen vor Aufnahme wöchentlich Kontakt halten, weil sich eine frühere Möglichkeit ergeben kann."
  },
  "ck-salus-hurth": {
    "unterlagen": [
      "Arztbericht",
      "Sozialbericht",
      "Zusage eines Leistungs- oder Kostenträgers",
      "Freiwilligkeitserklärung"
    ]
  },
  "ck-salus-lindow": {
    "unterlagen": [
      "Leistungs- bzw. Kostenantrag beim Kostenträger",
      "Sozialbericht (Suchtberatungsstelle, betrieblicher Sozialdienst oder Entzugsstation)"
    ],
    "entgiftungspflicht": true
  },
  "ck-salus-nauheim-adaption": {
    "unterlagen": [
      "Bewerbungsbogen Adaption der salus kliniken Bad Nauheim.",
      "Angaben zu Entwöhnungsklinik, Kostenträger, Entlassdatum und Bezugstherapie.",
      "Schilderung der Lebensbereiche Wohnen, Schulden, Familie, Freizeit, Selbstversorgung, Behörden sowie Bewährung/Haft."
    ],
    "entgiftungspflicht": true
  },
  "ck-salus-potsdam": {
    "unterlagen": [
      "Bewilligungsbescheid der Rentenversicherung bzw. Kostenzusage (oder Selbstzahler)",
      "Erwünscht: Sozialbericht einer Beratungsstelle oder Nachweis einer qualifizierten Entzugsbehandlung"
    ],
    "entgiftungspflicht": false
  },
  "ck-salza": {
    "unterlagen": [
      "Befunde, Röntgenaufnahmen, EKG, Labor, Gutachten, MRT und Arztberichte",
      "Ausgefüllter Anamnesefragebogen (nach Absprache)",
      "Anschrift der behandelnden Ärzte",
      "Krankenkassenkarte",
      "Personalausweis",
      "Ggf. Schwerbehindertenausweis, Impfpass, Allergiepass, Marcumar-Pass"
    ]
  },
  "ck-schlehreut": {
    "unterlagen": [
      "gültige Kostenzusage",
      "schriftliche Bewerbung mit Lebenslauf und Suchtkarriere",
      "Kontakt zu Beratungsstelle oder Arzt",
      "gültige Krankenversicherung",
      "ggf. Vorbefunde bei fraglicher Kontraindikation",
      "Entlassungsbericht vom Entgiftungskrankenhaus (Packliste)"
    ],
    "entgiftungspflicht": true
  },
  "ck-schlossklinik-buchau": {
    "unterlagen": [
      "Arzneimittel für die gesamte Aufenthaltsdauer"
    ]
  },
  "ck-schloz": {
    "entgiftungspflicht": true
  },
  "ck-schoenbirken": {
    "unterlagen": [
      "Kostenzusage eines Leistungsträgers (DRV, Krankenkasse oder Sozialamt)",
      "Sozialbericht einer Beratungsstelle",
      "aktueller ärztlicher Bericht",
      "Kostenzusage eines Leistungsträgers (DRV, Krankenkasse oder Sozialamt).",
      "Sozialbericht einer Beratungsstelle.",
      "aktueller ärztlicher Bericht."
    ],
    "entgiftungspflicht": true
  },
  "ck-schorborn": {
    "unterlagen": [
      "Gültige Kostenzusage des zuständigen Kostenträgers.",
      "Aufnahmefragebogen.",
      "Am Aufnahmetag Abstinenzüberprüfung (Alkohol-/Drogenscreening) und Gepäckkontrolle."
    ],
    "entgiftungspflicht": true
  },
  "ck-schwedenstein": {
    "unterlagen": [
      "ärztliche Unterlagen der zurückliegenden Jahre (Arztbriefe, Gutachten, Entlassungsberichte, Röntgenbefunde)",
      "möglichst aktuelle Routinelaboruntersuchung"
    ],
    "entgiftungspflicht": true
  },
  "ck-seehof": {
    "unterlagen": [
      "ärztliche Berichte",
      "aktuelle Röntgen-, CT- oder MRT-Aufnahmen"
    ]
  },
  "ck-seewiesen": {
    "unterlagen": [
      "Unterlagen vorausgegangener Behandlungen (Arztbriefe, Befunde, Röntgen, Untersuchungsergebnisse), möglichst in Kopie",
      "aktuelle Medikamentenliste vom Hausarzt (z. B. bundeseinheitlicher Medikamentenplan)",
      "ausgefüllte Formblätter der Klinik",
      "Krankenkassen-Versicherungskarte",
      "Impfpass sowie Allergiepass, Marcumar-Ausweis, Blutzucker-Tagebuch soweit vorhanden",
      "Kostenzusage des zuständigen Trägers."
    ]
  },
  "ck-segeberg-psom": {
    "entgiftungspflicht": false
  },
  "ck-serrahn": {
    "unterlagen": [
      "Antrag über Suchtberatungsstelle bzw. Sozialdienst; Klärung des Kostenträgers dort."
    ]
  },
  "ck-sieg-reha": {
    "unterlagen": [
      "ärztliche Verordnung der Maßnahmen",
      "Antrag auf ambulante Rehabilitation beim zuständigen Kostenträger"
    ]
  },
  "ck-sinova-schussental": {
    "unterlagen": [
      "Aufnahmeantrag bzw. Einwilligungserklärung am Aufnahmetag",
      "mitgebrachte Medikamente zur Abgabe beim Pflegedienst",
      "beim Reha-Eilverfahren Psychosomatik: Antragsformulare G0100, G110, Reha0200 sowie ggf. G115, G160, G161"
    ]
  },
  "ck-skh-rodewisch": {
    "unterlagen": [
      "Kostenübernahme durch den Rentenversicherungsträger."
    ]
  },
  "ck-skm-reha-koeln": {
    "unterlagen": [
      "Schriftliche Bewerbung mit Lebenslauf und Therapiereflexion.",
      "Kostenzusage des zuständigen Leistungsträgers."
    ]
  },
  "ck-sonnenberg": {
    "unterlagen": [
      "Entlassungsbericht des Krankenhauses / aktuelle Arztberichte und Befunde",
      "Krankenversicherungskarte",
      "Personalausweis",
      "Impfpass, Allergiepass, Schwerbehindertenausweis soweit vorhanden",
      "Selbstzahler und Beihilfe: Kopie der Kostenzusage",
      "Entlassungsbericht bzw. aktuelle Arztberichte und Befunde"
    ],
    "bearbeitungszeitHinweis": "Anreisetermin per Post, sobald die Kostenzusage vorliegt und die medizinischen Unterlagen geprüft sind."
  },
  "ck-soteria-adaption": {
    "unterlagen": [
      "Bewerbungsanschreiben mit inhaltlicher Begründung der Adaption",
      "Sucht-Lebenslauf (max. 2 Seiten)",
      "tabellarischer beruflicher Lebenslauf",
      "Vorstellungsgespräch rund fünf Wochen vor Beginn",
      "Bewerbungsanschreiben mit Begründung der Adaption.",
      "Sucht-Lebenslauf (max. 2 Seiten)."
    ]
  },
  "ck-soteria-leipzig": {
    "unterlagen": [
      "Kostenzusage des zuständigen Kostenträgers.",
      "ausführlicher Arztbericht.",
      "Sozialbericht einer Suchtberatungsstelle.",
      "aktuelle Medikamente / Verordnungsplan.",
      "aktuelle relevante medizinische Unterlagen, z. B. Laborbefunde."
    ],
    "entgiftungspflicht": true
  },
  "ck-sotterhausen": {
    "unterlagen": [
      "Schriftliche Kostenzusage des zuständigen Leistungsträgers.",
      "Gültige Versicherungskarte der Krankenkasse.",
      "Sozialbericht / Arztbericht.",
      "Unterlagen zu gerichtlichem Beschluss, Schulden etc."
    ],
    "bearbeitungszeitHinweis": "Bei vorliegender Kostenzusage teilt das Sekretariat einen verbindlichen Aufnahmetermin mit. Keine Aufnahmezusage."
  },
  "ck-spittler": {
    "unterlagen": [
      "Für die Tagesklinik: Vorbefunde und Arztbriefe, Krankenversicherungskarte, ggf. Röntgen- und Allergiepass, aktuelle Medikamentenliste, Personalausweis"
    ]
  },
  "ck-sprudelhof": {
    "unterlagen": [
      "wesentliche Befundunterlagen, Röntgen- und CT-Aufnahmen der letzten 24 Monate",
      "aktuell verordnete Medikamente in Originalverpackung bzw. Rezept sowie bundeseinheitlicher Medikamentenplan",
      "Krankenkassenkarte, Personalausweis, ggf. Schwerbehindertenausweis",
      "aktuelle Arztberichte, Entlassungsbericht, EKG- oder Laborbefunde (Kopien, keine Originale)",
      "Impfpass, Allergiepass, Krisenpass soweit vorhanden",
      "bei Nahrungsmittelunverträglichkeiten vorab E-Mail an ernaehrung-klinik-sprudelhof@drv-hessen.de"
    ]
  },
  "ck-st-camillus": {
    "entgiftungspflicht": true,
    "unterlagen": [
      "Kostenübernahme durch den Versicherungsträger.",
      "Handtücher (Bettwäsche wird gestellt).",
      "Feste Bekleidung für Arbeits- und Beschäftigungstherapie; Sportkleidung und Sportschuhe mit heller Sohle."
    ]
  },
  "ck-step-tagesklinik": {
    "unterlagen": [
      "Antrag auf Kostenübernahme.",
      "Sozialbericht der Beratungsstelle.",
      "ärztlicher Befundbericht.",
      "Kostenzusage.",
      "Bei gerichtlicher Auflage: bewilligter Antrag nach §§ 35/36 BtMG."
    ],
    "bearbeitungszeitHinweis": "Nach Kostenzusage wird der Aufnahmetermin vereinbart und geklärt, ob eine Entgiftung vorangestellt wird. Keine Aufnahmezusage."
  },
  "ck-stillenberg": {
    "entgiftungspflicht": true
  },
  "ck-suedergellersen": {
    "unterlagen": [
      "gültige Kostenzusage",
      "Sozialbericht der Beratungsstelle",
      "ärztlicher Befund",
      "Antrag beim zuständigen Leistungsträger"
    ],
    "bearbeitungszeitHinweis": "Sobald die Kostenzusage vorliegt, wird ein Aufnahmetermin vereinbart; dabei Klärung, ob eine Entgiftung vorangestellt werden muss. Bei gerichtlicher Auflage Antrag nach §§ 35/36 BtMG."
  },
  "ck-tagwerk-stuttgart": {
    "unterlagen": [
      "persönliches Vorstellungsgespräch.",
      "Kostenübernahmeerklärung des zuständigen Kostenträgers.",
      "ggf. Klärung strafrechtlicher Voraussetzungen."
    ]
  },
  "ck-tannenhof-adaption-berlin": {
    "unterlagen": [
      "Bewerbungsfragebogen (Interessent und behandelnder Arzt).",
      "Schriftliche Anmeldung.",
      "Antrag auf Kostenübernahme (über Sozialdienst der Rehaklinik)."
    ],
    "bearbeitungszeitHinweis": "Schriftliche Anmeldung und Kostenübernahmeantrag laut Trägerseite sechs Wochen vor Ende der stationären Therapie. Keine Aufnahmezusage."
  },
  "ck-tannenhof-adaption-np": {
    "unterlagen": [
      "Bewerbungsfragebogen (auch vom behandelnden Arzt).",
      "Bei begleitenden Kindern Zusatzfragebogen Kinder."
    ]
  },
  "ck-tannenhof-lichtenrade": {
    "unterlagen": [
      "Kostenübernahme des Rentenversicherers bzw. der Krankenkasse.",
      "Arztbericht.",
      "Sozialbericht.",
      "ggf. Gutachten und Abschlussberichte von Vorbehandlungen.",
      "negatives Drogenscreening."
    ],
    "entgiftungspflicht": true
  },
  "ck-tannenhof-tagesklinik": {
    "unterlagen": [
      "Arztbericht.",
      "Sozialbericht.",
      "Gutachten / Abschlussberichte von Vorbehandlungen.",
      "Kostenübernahme des Rentenversicherers bzw. der Krankenkasse."
    ],
    "entgiftungspflicht": true
  },
  "ck-tauwetter": {
    "unterlagen": [
      "Kostenübernahmeerklärung des Versicherungs- bzw. Sozialhilfeträgers",
      "Sozialbericht der beantragenden Stelle",
      "aktueller, vom behandelnden Arzt unterschriebener Medikamentenplan",
      "wenn möglich aktuelle Labor- und EKG-Befunde",
      "Personalausweis, Impfausweis und Krankenkassenkarte"
    ],
    "entgiftungspflicht": true
  },
  "ck-teutoburg": {
    "unterlagen": [
      "Sozialbericht und ggf. ärztliches Gutachten über die Suchtberatungsstelle",
      "Bei Drogenabhängigkeit: schriftliche Bewerbung mit Lebenslauf und Suchtentwicklung"
    ],
    "entgiftungspflicht": true
  },
  "ck-tgj-adaption": {
    "unterlagen": [
      "kurze formlose Bewerbung.",
      "Bewerberinnenbogen Adaption."
    ],
    "bearbeitungszeitHinweis": "Nach Eingang der Unterlagen ggf. Einladung zum persönlichen Gespräch."
  },
  "ck-tiefental": {
    "unterlagen": [
      "gültige Kostenübernahmeerklärung des Sozialleistungsträgers.",
      "Vorbefunde zur Aufnahme.",
      "Aufstellung der aktuellen Medikamentenverordnung."
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Sobald die Kostenzusage vorliegt, Abstimmung des Aufnahmetermins telefonisch oder per Post."
  },
  "ck-tps-hamburg": {
    "unterlagen": [
      "aktueller ausführlicher psychiatrischer Arztbrief.",
      "aktueller Sozialbericht.",
      "Anmeldung zum Vorstellungsgespräch."
    ],
    "entgiftungspflicht": true
  },
  "ck-tz-speyer": {
    "unterlagen": [
      "Motivationsschreiben mit Lebenslauf und Suchtentwicklung.",
      "Ärztliche und psychologische Epikrise der vermittelnden Fachklinik.",
      "Kostenzusage eines Leistungsträgers.",
      "Informationsgespräch nach telefonischer Kontaktaufnahme."
    ]
  },
  "ck-uexkuell": {
    "unterlagen": [
      "Ärztlicher Antrag mit Bescheinigungen und Befundberichten.",
      "Bewilligungsbescheid der Renten- oder Krankenversicherung; anschließend Terminabsprache in der Klinik."
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Sobald der Bewilligungsbescheid vorliegt, Terminabsprache unter 07684 90 69-104 (Mo–Do 8–10 Uhr). Kurzfristige Aufnahme wird bei Bedarf versucht."
  },
  "ck-villa-lilly": {
    "unterlagen": [
      "Kostenzusage des zuständigen Leistungsträgers",
      "ärztliche Bescheinigung, dass die körperliche Entgiftung abgeschlossen oder nicht notwendig ist",
      "Aufnahmefragebogen"
    ],
    "entgiftungspflicht": true
  },
  "ck-vitrea-bad-berleburg": {
    "unterlagen": [
      "Personalausweis",
      "Versichertenkarte",
      "Bescheinigungen über Zuzahlungen oder Befreiungsnachweis",
      "Arztberichte, Laborbefunde, Röntgen-, CT- oder MRT-Bilder, Allergiepass",
      "Schwerbehindertenausweis sofern vorhanden",
      "regelmäßig eingenommene Medikamente für die ersten Tage sowie genutzte Hilfsmittel"
    ]
  },
  "ck-vitrea-berghof-2": {
    "unterlagen": [
      "Kostenzusage des Leistungsträgers",
      "Sozialbericht",
      "Adaptionsantrag",
      "Therapiebericht"
    ]
  },
  "ck-vitrea-damp": {
    "unterlagen": [
      "relevante Befundberichte des Arztes oder Krankenhauses, OP-Bericht und Behandlungsberichte",
      "Röntgen- oder MRT/CT-Aufnahmen",
      "aktuelle Laborbefunde, wenn vorhanden",
      "Versichertenkarte.",
      "Relevante Befund-, OP- und Behandlungsberichte; Röntgen- oder MRT/CT-Aufnahmen; aktuelle Laborbefunde sofern vorhanden.",
      "Medizinische Ausweise (Röntgen-, Impf-, Allergie-, Diabetiker-, Schrittmacher-, Prothesen- oder Mutterpass)."
    ],
    "entgiftungspflicht": false
  },
  "ck-vitrea-hildesheim": {
    "unterlagen": [
      "ärztlicher Befundbericht (Heilverfahren über Haus- oder Facharzt)",
      "ggf. Zuzahlungsbefreiungsausweis",
      "Sportsachen (Trainingsanzug, Sportschuhe), Badesachen, Handtuch und Duschsachen"
    ],
    "entgiftungspflicht": false
  },
  "ck-vitrea-wiehengebirge": {
    "unterlagen": [
      "Elektronische Gesundheitskarte, ggf. Zuzahlungsbefreiung.",
      "Impfausweis.",
      "Aktuelle Röntgen-, MRT-, CT-Aufnahmen und Laborwerte, soweit vorhanden.",
      "Medikamente bzw. Rezepte für die Dauermedikation; ärztlicher Nachweis bei Allergien vorab an das Patientenmanagement."
    ]
  },
  "ck-vitus": {
    "unterlagen": [
      "Ärztlicher Bericht",
      "Sozialbericht der Beratungsstelle oder des Krankenhauses",
      "Schriftliche Zusage der Kostenübernahme",
      "Versichertenkarte und ggf. Zuzahlungsbefreiung",
      "Personalausweis",
      "Letzte Laborbefunde"
    ],
    "entgiftungspflicht": true
  },
  "ck-waldschloesschen": {
    "unterlagen": [
      "gültige Kostenzusage des Leistungsträgers",
      "Sozialbericht der Beratungsstelle oder des Krankenhaus-Sozialdienstes",
      "Krankenversicherungskarte oder Mitgliedsbestätigung",
      "Medikationsliste sowie medizinische Vorbefunde",
      "ausgefüllter Fragebogen nach Terminvergabe",
      "abgeschlossene Entgiftung (negative Atemluft- und Urinkontrolle bei Aufnahme)"
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Regelmäßiger Kontakt mit dem Aufnahmebüro (nach Absprache mindestens alle vier Wochen) zur Planung erbeten. Infogespräch nach Vereinbarung möglich."
  },
  "ck-waldschloss-dd": {
    "unterlagen": [
      "Kostenzusage",
      "ausgefüllter Patientenfragebogen",
      "Behandlungsvertrag",
      "Berichte früherer Klinikaufenthalte oder ambulanter Psychotherapie, soweit vorhanden",
      "Kostenzusage des Kostenträgers"
    ],
    "entgiftungspflicht": false,
    "bearbeitungszeitHinweis": "Sobald die Kostenzusage vorliegt, Planung des Aufenthalts und Versand der Aufnahmeunterlagen; Prüfung der gesundheitlichen Voraussetzungen vor Behandlungsbeginn."
  },
  "ck-waren": {
    "unterlagen": [
      "Medizinische Vorbefunde möglichst vollständig vor Aufnahme",
      "Psychologische Vorbefunde möglichst vollständig vor Aufnahme",
      "Weitere Mitbring-Unterlagen laut Einladungsschreiben",
      "Krankenversichertenkarte",
      "aktueller, vollständiger Lebenslauf",
      "vorliegende ärztliche Befunde, Befundberichte oder Klinikentlassberichte"
    ]
  },
  "ck-wehrawald": {
    "bearbeitungszeitHinweis": "Für Bahnanreisen enthält die Einladung gesonderte Informationen; Bus/Bahn/Flugzeug-Anreise nur dienstags."
  },
  "ck-weihersmuehle": {
    "unterlagen": [
      "Aktueller Lebenslauf und Beschreibung des Suchtverlaufs.",
      "Ggf. Angaben zum juristischen Hintergrund.",
      "Kostenzusage des Leistungsträgers.",
      "Sozialbericht der Beratungsstelle, des Krankenhaus-Sozialdienstes oder der JVA.",
      "Medizinische Vorbefunde und Krankenversicherungskarte.",
      "Abgeschlossene Entgiftung oder zuverlässiger Nachweis über sieben Cleantage"
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Regelmäßiger Kontakt mit dem Aufnahmebüro per Telefon oder E-Mail ist erwünscht und dient der Planung. Keine Aufnahmezusage."
  },
  "ck-weitenau": {
    "unterlagen": [
      "Aufnahmeunterlagen für unter 18-Jährige bzw. über 18-Jährige (Download auf der Trägerseite)",
      "Kofferpackliste",
      "Personalausweis und Krankenkassenkarte",
      "Vorberichte anderer klinischer Aufenthalte bzw. Psychotherapien",
      "Kopie der Geburtsurkunde und aktuellstes Schulzeugnis",
      "Bewerbungsunterlagen bzw. Arbeitszeugnisse"
    ]
  },
  "ck-wendepunkt": {
    "unterlagen": [
      "Kostenzusage des Leistungsträgers (u. a. DRV Baden-Württemberg, DRV Bund, Knappschaft-Bahn-See, DRV der Länder, Krankenkassen).",
      "Antrag über Suchtberatungsstelle, Entgiftungsstation oder Haus-/Facharzt."
    ],
    "bearbeitungszeitHinweis": "Ambulante Reha: Beginn nach Kostenzusage laut Klinikseite zeitnah möglich. Keine Aufnahmezusage."
  },
  "ck-weser-ems": {
    "entgiftungspflicht": true,
    "unterlagen": [
      "Kostenzusage des Leistungsträgers (DRV oder GKV)."
    ]
  },
  "ck-weserblick": {
    "unterlagen": [
      "schriftliche Begründung der Reha-Notwendigkeit durch den behandelnden Arzt",
      "Reha-Antrag beim Kostenträger mit ärztlichem Gutachten"
    ]
  },
  "ck-wiesengrund": {
    "unterlagen": [
      "Sozialbericht.",
      "Ärztlicher Befundbericht.",
      "Bei Aufnahme ohne vorgeschaltete Entzugsbehandlung: Nachweis der Beigebrauchsfreiheit von wenigstens vier Wochen.",
      "Sozialbericht",
      "ärztlicher Befundbericht",
      "gültige Kostenzusage"
    ],
    "entgiftungspflicht": false
  },
  "ck-wittekind": {
    "unterlagen": [
      "ausgefüllte Anschriftenliste vorab per E-Mail oder Post an das Patientenmanagement",
      "medizinische Vorbefunde und Berichte über ambulante oder stationäre Behandlungen als Kopie",
      "Liste des Hausarztes über längere Arbeitsunfähigkeitszeiten, soweit vorhanden",
      "Dauermedikation in ausreichender Menge bzw. Rezepte zum Einlösen vor Ort",
      "für Arbeitsuchende Bewerbungsunterlagen, idealerweise digital",
      "bei Allergien oder Unverträglichkeiten ärztlich-medizinischer Nachweis vor Aufnahme"
    ],
    "bearbeitungszeitHinweis": "Sobald die Kostenzusage des Leistungsträgers vorliegt, sendet das Patientenmanagement ein Einladungsschreiben mit Aufnahmetermin und einer Mitbringliste."
  },
  "ck-wolkersdorf": {
    "unterlagen": [
      "Nachweis der abgeschlossenen Entgiftung (Klinik oder Justizvollzugsanstalt).",
      "Kostenzusage von Rentenversicherung, Krankenkasse oder Sozialhilfeträger.",
      "Nachweis der abgeschlossenen Entgiftungsbehandlung durch Klinik oder Justizvollzugsanstalt",
      "Kostenzusage von Krankenkasse, Sozialhilfeträger oder Rentenversicherung"
    ],
    "entgiftungspflicht": true
  },
  "ck-wuermtal": {
    "unterlagen": [
      "Gültige Kostenzusage des Leistungsträgers.",
      "Sozialbericht der Beratungsstelle bzw. des Krankenhaus-Sozialdienstes; alternativ Motivationsschreiben mit Lebens- und Suchtverlauf, ggf. gerichtlicher Hintergrund.",
      "Nachweis über abgeschlossenen körperlichen Entzug; unauffälliges Alkohol- und Drogenscreening (Cleanstatus).",
      "Krankenversicherungskarte oder Mitgliedsbescheinigung.",
      "Bescheinigung über den Infektionsstatus (HIV, Hepatitis-Serologie) sowie medizinische Vorbefunde.",
      "Schriftliche Zusammenstellung der Schuldensituation zur Schuldenregulierung."
    ],
    "entgiftungspflicht": true,
    "bearbeitungszeitHinweis": "Regelmäßiger Kontakt mit dem Aufnahmebüro zur Planung; Vorgespräch und Besichtigung nach Absprache. Keine Aufnahmezusage."
  },
};
