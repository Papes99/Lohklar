import { AUFNAHME_EXTRA_BY_ID } from "./katalog-aufnahme-extra.ts";

/**
 * Block 14 — Aufnahmeunterlagen & Fristen.
 * Nur öffentlich belegte Klinik-/Trägerseiten und Merkblätter, Stand 2026-09-07.
 * Keine erfundenen DRV-Formulare, keine Packlisten, keine zweite Wartezeit.
 */
export type AufnahmeAngabe = {
  unterlagen?: string[];
  entgiftungspflicht?: boolean | null;
  bearbeitungszeitHinweis?: string;
};

export const AUFNAHME_BY_ID: Record<string, AufnahmeAngabe> = {
  "ck-adaption-birkenwerder": {
    unterlagen: [
      "Kostenübernahme.",
      "schriftliche Bewerbung / Fragebogen.",
    ],
  },
  "ck-adaption-cuxhaven": {
    unterlagen: [
      "Kostenzusage vor Aufnahme.",
      "schriftliche Bewerbung mit Lebenslauf, Beschreibung des beruflichen Werdegangs und der Suchtentwicklung.",
    ],
  },
  "ck-adaption-erfurt": {
    unterlagen: [
      "Kostenzusage des zuständigen Kostenträgers.",
      "Vorstellungstermin.",
    ],
  },
  "ck-adaption-heppenheim": {
    unterlagen: [
      "ausgefüllter Bewerbungsbogen.",
      "Kostengenehmigung.",
    ],
  },
  "ck-adaption-schwerin": {
    unterlagen: [
      "schriftliche Bewerbung.",
      "Bewerberfragebogen.",
      "Antrag auf Adaptionsbehandlung durch die abgebende Fachklinik beim Kostenträger.",
    ],
  },
  "ck-adaption-weimar": {
    unterlagen: [
      "Kostenzusage des zuständigen Kostenträgers.",
    ],
  },
  "ck-adv-f42": {
    unterlagen: [
      "Therapieplatzbewerbungsbogen.",
      "gültige Kostenübernahme des Leistungsträgers.",
      "ggf. Schweigepflichtentbindung für Zuweiser/Entgiftungsklinik.",
    ],
  },
  "ck-agj-karlsruhe": {
    unterlagen: [
      "Sozialbericht der vermittelnden Stelle (z. B. Beratungsstelle, Sozialdienst des Krankenhauses).",
      "Kostenzusage des zuständigen Leistungsträgers bzw. Kostenverpflichtungserklärung bei Selbstzahler*innen.",
      "schriftliche Bewerbung mit Lebenslauf und Suchtanamnese.",
      "ggf. Nachweis einer Entgiftungsbehandlung.",
      "aktuelle Arztbefunde (einschließlich Laborwerte).",
    ],
    entgiftungspflicht: true,
  },
  "ck-alkure-mainkofen": {
    entgiftungspflicht: true,
  },
  "ck-alpcura": {
    bearbeitungszeitHinweis: "Einweiserseite: von der Einreichung der Unterlagen bis zur Aufnahmebestätigung in der Regel einige Tage bis einige Wochen. Keine Aufnahmezusage.",
  },
  "ck-alpenblick": {
    unterlagen: [
      "Arztberichte.",
      "für Privatversicherte schriftliche Kostenübernahmeerklärung.",
    ],
  },
  "ck-alpenland": {
    unterlagen: [
      "Gültige Kostenzusage des Leistungsträgers.",
      "Sozialbericht der vermittelnden Beratungsstelle bzw. des Sozialdienstes eines Krankenhauses.",
      "Aktueller Lebens- und Suchtverlauf.",
      "Ggf. Beschreibung des gerichtlichen Hintergrunds.",
      "Bescheinigung über Infektionsstatus (HIV, Hepatitis-Serologie).",
    ],
    entgiftungspflicht: true,
  },
  "ck-alte-flugschule": {
    unterlagen: [
      "gültige Kostenzusage.",
      "Lebens- und Suchtverlauf.",
    ],
    entgiftungspflicht: true,
  },
  "ck-annenhof": {
    unterlagen: [
      "Lebenslauf.",
      "Suchtgeschichte.",
      "gewünschter Aufnahmezeitraum.",
      "gültige Kostenzusage.",
      "Klärung der Nebenkosten (ALG II, Übergangsgeld, Sozialhilfe).",
    ],
    entgiftungspflicht: true,
  },
  "ck-ansbach-haus7": {
    unterlagen: [
      "Kostenzusage durch den Kostenträger (Rentenversicherung, Krankenkasse oder Beihilfe).",
    ],
    entgiftungspflicht: true,
  },
  "ck-asklepios-bad-schwartau": {
    unterlagen: [
      "prästationärer Fragebogen.",
      "aktueller Entlassungsbericht und aktuelle Arztbriefe/Befundberichte.",
      "aktueller Medikamentenplan.",
    ],
  },
  "ck-auwald": {
    unterlagen: [
      "Arztbericht.",
      "Sozialbericht.",
      "Kostenzusage.",
      "abgeschlossene Entgiftung (FAQ).",
    ],
    entgiftungspflicht: true,
  },
  "ck-bassum": {
    unterlagen: [
      "Sozialbericht.",
      "ärztliche Stellungnahme.",
      "Antragsformulare beim Leistungsträger.",
      "Vorbefunde, Medikamentenverordnung und Berichte über ärztliche Behandlungen (z. B. letzte Entgiftung).",
    ],
    entgiftungspflicht: true,
  },
  "ck-bavaria-kreischa": {
    unterlagen: [
      "schriftliche Kostenübernahme durch den Kostenträger.",
      "ausgefüllte Unterlagen, die vorab zugesandt werden.",
      "Einnahmeplan von Medikamenten.",
      "ggf. Kopie Betreuerausweis oder Vorsorgevollmacht/Patientenverfügung.",
    ],
  },
  "ck-bergisch-land": {
    unterlagen: [
      "aktueller Medikationsplan.",
      "bei Dialyse: gültiger Transportschein bzw. Kostenzusage der Krankenkasse für Dialysefahrten.",
    ],
  },
  "ck-bergstrasse": {
    unterlagen: [
      "Sozialbericht (über Fachambulanz/Beratungsstelle).",
      "Antrag auf Kostengenehmigung.",
    ],
  },
  "ck-bergzabern": {
    unterlagen: [
      "ausgefüllter Anamnesefragebogen (freiwillig).",
      "Anschrift der behandelnden Ärzte.",
      "Krankenkassenkarte.",
    ],
  },
  "ck-birkenbuck": {
    unterlagen: [
      "Bewilligungsbescheid / Kostenzusage der Renten- oder Krankenversicherung.",
      "ärztlicher Antrag / Befundberichte zur Antragstellung.",
    ],
    entgiftungspflicht: true,
  },
  "ck-birkenweg": {
    unterlagen: [
      "Kostenzusage des Leistungsträgers.",
      "ärztliche Befunde der letzten Wochen.",
      "aktueller EKG-Befund.",
    ],
    entgiftungspflicht: true,
  },
  "ck-blankenburg": {
    unterlagen: [
      "Kostenzusage des Leistungsträgers.",
      "Sozialbericht.",
      "ärztliches Gutachten.",
    ],
    entgiftungspflicht: true,
  },
  "ck-boeddiger": {
    unterlagen: [
      "Kostenzusage (Rentenversicherung, Krankenkasse oder Jugendamt).",
    ],
  },
  "ck-boerstingen": {
    unterlagen: [
      "schriftliche Kostenzusage.",
      "Bewerbungsbogen.",
      "unterschriebener Behandlungsvertrag.",
      "Krankenversicherungsschutz.",
      "Zahnsanierungsbescheinigung.",
    ],
    entgiftungspflicht: true,
  },
  "ck-borkum": {
    unterlagen: [
      "Fragebogen zur Aufnahme.",
    ],
  },
  "ck-bramstedt": {
    unterlagen: [
      "Verordnung von Krankenhausbehandlung / fachärztliche Einweisung.",
      "Anmeldebogen.",
      "persönlicher Bericht.",
      "Befund (nicht älter als sechs Monate; bei Somatoforme Störung, PTBS, Essstörung BMI unter 15 zusätzlich nötig).",
      "Hörkurve des HNO-Arztes bei Tinnitus.",
    ],
    bearbeitungszeitHinweis: "Laut Klinik dauert die Prüfung der Unterlagen üblicherweise ca. 5–10 Werktage, im Einzelfall variabel. Keine Aufnahmezusage.",
  },
  "ck-briese": {
    unterlagen: [
      "Bewerbungsfragebogen.",
      "Kostenzusage des zuständigen Kostenträgers.",
    ],
    entgiftungspflicht: true,
  },
  "ck-brueckle": {
    unterlagen: [
      "ausgefüllter Bewerbungsfragebogen der Einrichtung.",
      "gültig auf das Therapiezentrum Brückle ausgestellte Kostenzusage.",
      "Nachweis Krankenversicherungsschutz / Krankenkassenkarte.",
      "Nachweis über die durchgeführte qualifizierte Entgiftung.",
      "Sozialbericht der Beratungsstelle.",
    ],
    entgiftungspflicht: true,
  },
  "ck-bussmannshof": {
    unterlagen: [
      "Bewerbungsschreiben.",
      "kurzer Lebenslauf.",
      "Sozialbericht.",
      "Kostenzusage des Leistungsträgers.",
    ],
    entgiftungspflicht: true,
  },
  "ck-bwlv-tagesreha-karlsruhe": {
    unterlagen: [
      "Kostenzusage des Leistungsträgers.",
    ],
    entgiftungspflicht: true,
  },
  "ck-bwlv-tuebingen": {
    unterlagen: [
      "Bewerbungsbogen.",
      "Kostenzusage mit Regelung der Nebenkosten.",
      "Krankenversicherungsschutz.",
    ],
    entgiftungspflicht: true,
  },
  "ck-bwlv-wiesengrund": {
    unterlagen: [
      "gültige Kostenzusage.",
      "Sozialbericht.",
      "ärztlicher Befundbericht.",
    ],
    entgiftungspflicht: true,
  },
  "ck-celenus-carolabad": {
    unterlagen: [
      "ausgefüllter Anamnesefragebogen (nach Absprache).",
      "Anschrift der behandelnden Ärzte.",
      "Krankenkassenkarte.",
      "ggf. Zuzahlungsbefreiung und Nachweis geleisteter Zuzahlungen.",
    ],
  },
  "ck-celenus-freiburg": {
    unterlagen: [
      "ausgefüllter Anamnesefragebogen (nach Absprache).",
      "Kostenzusage vor Aufnahme.",
      "Lebenslauf/beruflicher Werdegang für das Aufnahmegespräch im Sozialdienst.",
    ],
  },
  "ck-celenus-kinzigtal": {
    unterlagen: [
      "ausgefüllter Anamnesefragebogen.",
      "Anschrift der behandelnden Ärzte.",
      "Krankenkassenkarte.",
      "ggf. Zuzahlungsbefreiung und Nachweis geleisteter Zuzahlungen.",
      "Angaben zur stationären Aufnahme (Klinikfragebogen) und Behandlungsvertrag.",
    ],
  },
  "ck-celenus-schoemberg": {
    unterlagen: [
      "ausgefüllter Anamnesefragebogen (nach Absprache).",
    ],
  },
  "ck-celenus-schweizerwiese": {
    unterlagen: [
      "Anamnesefragebogen (nach Absprache).",
      "Anschrift der behandelnden Ärzte.",
      "Krankenkassenkarte.",
    ],
  },
  "ck-change-hamburg": {
    unterlagen: [
      "gültige Kostenübernahme des Leistungsträgers.",
    ],
  },
  "ck-curtius": {
    unterlagen: [
      "ausgefüllter Aufnahmefragebogen.",
      "Notwendigkeitsbescheinigung / Einweisungsschein des behandelnden Arztes für Krankenhausbehandlung (§ 39 SGB V) bei Akut.",
      "ggf. vorhandene Behandlungsberichte.",
      "bei Reha: Kostenübernahmeerklärung des Rentenversicherungsträgers bzw. der gesetzlichen Krankenversicherung.",
      "Privat: Kostenübernahmeerklärung der privaten Krankenversicherung vor Beginn.",
    ],
  },
  "ck-deignis": {
    unterlagen: [
      "Reha-Antrag mit Begründung, warum eine stationäre Behandlung erforderlich ist.",
      "Anmeldeformular der Klinik (wird zugesandt, sobald die Unterlagen vom Kostenträger vorliegen).",
      "für Privatversicherte: Kostenübernahmeerklärung der PKV und ggf. Beihilfe sowie aussagekräftige medizinische Unterlagen.",
    ],
  },
  "ck-dgd-tagesreha-ffm": {
    unterlagen: [
      "Kostenzusage der DRV Bund, DRV Hessen, der Krankenkasse oder eines anderen Kostenträgers.",
      "Anmeldung über die Psychiatrische Institutsambulanz (PIA) der DGD Klinik Hohe Mark.",
    ],
    entgiftungspflicht: true,
  },
  "ck-diako-adaption-husum": {
    unterlagen: [
      "Kostenzusage des Leistungsträgers.",
      "Krankenversicherungsnachweis.",
      "Nachweis einer erfolgreich abgeschlossenen klinischen Entwöhnungsbehandlung.",
    ],
  },
  "ck-do-it": {
    unterlagen: [
      "Bewerbungsfragebogen der Fachklinik DO IT!.",
    ],
  },
  "ck-do-it-adaption": {
    unterlagen: [
      "gültige Kostenzusage des Leistungsträgers.",
      "schriftliche Bewerbung mit ausführlichem Lebenslauf und individueller Suchtgeschichte.",
    ],
  },
  "ck-domiziel": {
    unterlagen: [
      "Fragebogen des Aufnahmemanagements.",
      "aktuelle Unterlagen (zurücksenden).",
      "Kostenzusage des Leistungsträgers.",
    ],
  },
  "ck-donnersberg": {
    unterlagen: [
      "Fragebogen des Aufnahmemanagements.",
      "vorhandene ärztliche Unterlagen.",
      "Sozialbericht.",
      "Zusage des Leistungsträgers.",
    ],
  },
  "ck-drv-friedrichshoehe": {
    unterlagen: [
      "medizinischer Rehabilitanden-Fragebogen (mit Einberufung zugeschickt, bei Anreise mitbringen).",
      "aktuelle Arzt- und Krankenhausberichte zur Anreise.",
    ],
  },
  "ck-ebel-vogelsberg": {
    unterlagen: [
      "Aufnahmebogen Reha.",
      "Fragebogen zur Sozial- und Arbeitsanamnese.",
      "Lebenslauf für Sozialberatung/Berufsanamnese.",
      "ggf. Patientenverfügung und Vollmacht.",
    ],
  },
  "ck-ebhausen": {
    unterlagen: [
      "schriftliche Bewerbung mit Sucht- und Lebenslauf.",
      "Nachweis einer regulär abgeschlossenen Entwöhnungsbehandlung.",
      "Kostenzusage eines Leistungsträgers.",
    ],
  },
  "ck-eichelsdorf": {
    unterlagen: [
      "gültige Kostenzusage des Leistungsträgers.",
      "bei Mitaufnahme eines Kindes gesonderte Kostenzusage.",
      "Bewerbungsunterlagen: Lebens- und Suchtverlauf.",
      "Sozialbericht.",
      "ärztliche Unterlagen.",
    ],
    entgiftungspflicht: true,
  },
  "ck-eifelhoehe": {
    unterlagen: [
      "Antrag auf medizinische Rehabilitation.",
      "Sozialbericht.",
      "ärztlicher Befundbericht.",
    ],
  },
  "ck-eifelklinik": {
    unterlagen: [
      "ausgefüllte Rückantwort, Behandlungsvertrag, Hausordnung, Datenschutz- und Datenübermittlungserklärungen.",
      "aktuelle Facharzt- und Krankenhausberichte.",
      "Berichte früherer Rehabilitationen.",
    ],
  },
  "ck-elbmarsch": {
    unterlagen: [
      "Arztbericht.",
      "Sozialbericht (bei der Indikation Sucht).",
      "Zusage eines Leistungs- oder Kostenträgers.",
      "Freiwilligkeitserklärung.",
      "Klinik-Aufnahmeunterlagen Sucht (Downloadcenter; vor Aufnahme ausfüllen und mitbringen).",
    ],
  },
  "ck-eschenberg": {
    unterlagen: [
      "Kostenzusage.",
      "Sozialbericht.",
      "ärztliches Gutachten / Arztgutachten.",
      "nachgewiesene Suchtmittelfreiheit ohne Entzugssymptomatik.",
    ],
    entgiftungspflicht: true,
  },
  "ck-eschenburg": {
    unterlagen: [
      "Kostenzusage (Rentenversicherung oder Krankenkasse).",
      "Antragsformular G100.",
      "aktueller Befundbericht des behandelnden Arztes.",
      "Sozialbericht.",
      "Freiwilligkeitserklärung.",
    ],
    entgiftungspflicht: true,
  },
  "ck-eusserthal": {
    unterlagen: [
      "Kostenzusage des Leistungsträgers (DRV oder Krankenkasse).",
      "ärztlicher Befundbericht.",
      "Sozialbericht der Suchtberatungsstelle (Formulare G0450 und G0452).",
      "Reha-Antrag G0100, ggf. Anlage G0110.",
    ],
    entgiftungspflicht: true,
  },
  "ck-eusserthal-landau": {
    unterlagen: [
      "Kostenzusage des Leistungsträgers.",
      "Sozialbericht der Suchtberatungsstelle (G0450 / G0452) plus ärztlicher Befundbericht — öffentlich für die Fachklinik-Reha genannt.",
    ],
    entgiftungspflicht: true,
  },
  "ck-fehmarn": {
    unterlagen: [
      "Bewerberfragebogen.",
      "Lebenslauf und Suchtverlauf.",
      "Kostenzusage.",
      "Medikationsplan (nicht älter als 4 Wochen).",
      "EKG (nicht älter als 4 Wochen).",
    ],
  },
  "ck-fischer-haus": {
    unterlagen: [
      "Arztbericht.",
      "Sozialbericht.",
      "Leistungsbescheid eines Kostenträgers.",
      "Vermittlung durch psychosoziale Beratungsstelle oder vergleichbare Stelle.",
    ],
    entgiftungspflicht: true,
  },
  "ck-fredeburg": {
    unterlagen: [
      "aktueller Arztbericht.",
      "Kostenzusage des Kostenträgers.",
      "Sozialbericht einer Suchtberatungsstelle (nur bei Diagnose Glücksspielsucht).",
    ],
  },
  "ck-freiolsheim": {
    unterlagen: [
      "Sozialbericht der vermittelnden Stelle.",
      "Kostenzusage des Leistungsträgers bzw. Kostenverpflichtungserklärung bei Selbstzahlern.",
      "Schriftliche Bewerbung mit Lebenslauf und Suchtanamnese.",
      "Ggf. Nachweis einer Entgiftungsbehandlung.",
      "Aktuelle Arztbefunde einschließlich Laborwerte und ggf. Medikamentenplan.",
    ],
    entgiftungspflicht: true,
  },
  "ck-friedrichshof": {
    unterlagen: [
      "Bewerbungsbogen (Lebens- und Suchtverlauf, Motivation).",
      "ärztliche Bescheinigung zu Diagnosen.",
      "aktueller Medikationsplan.",
      "ärztliche Vorbefunde (u. a. stationäre Voraufenthalte).",
      "Kostenzusage des Leistungsträgers.",
    ],
    entgiftungspflicht: true,
  },
  "ck-fuerstenwald": {
    unterlagen: [
      "Antrag auf Kostenübernahme beim Leistungsträger.",
      "Sozialbericht und ärztliches Gutachten (über Suchtberatungsstelle; nicht bei Beamten/Selbstständigen).",
      "ggf. Arztberichte aus vorhergehenden Behandlungen.",
    ],
    entgiftungspflicht: true,
  },
  "ck-furth": {
    unterlagen: [
      "aktueller Arztbericht.",
      "Zusage eines Kostenträgers.",
      "Sozialbericht einer Suchtberatungsstelle (bei Abhängigkeitserkrankung).",
    ],
  },
  "ck-germerode": {
    unterlagen: [
      "gültige Kostenzusage.",
      "Sozialbericht.",
      "ärztliche Befunde.",
      "Lebenslauf / beruflicher Werdegang.",
    ],
    entgiftungspflicht: true,
  },
  "ck-goehren": {
    unterlagen: [
      "Rehabilitandenfragebogen ausgefüllt am Aufnahmetag (Orthopädie: im Handgepäck).",
    ],
  },
  "ck-grafrath": {
    unterlagen: [
      "aktueller Lebenslauf.",
      "Beschreibung des Suchtverlaufs.",
      "ggf. Angaben zum juristischen Hintergrund.",
      "Medikamentenliste (vorab).",
      "gültige Kostenzusage.",
    ],
    entgiftungspflicht: true,
  },
  "ck-greifswald": {
    unterlagen: [
      "Kostenübernahmeerklärung / Kostenzusage des zuständigen Kostenträgers.",
    ],
    entgiftungspflicht: true,
  },
  "ck-groenenbach": {
    unterlagen: [
      "Bescheinigung über Zuzahlungen oder Befreiungsnachweis.",
      "Patientenfragebogen.",
    ],
  },
  "ck-grossburschla": {
    unterlagen: [
      "gültige Kostenübernahme.",
      "aktueller Befundbericht und Aufnahmeantrag (wenn Phase I nicht in Haus Germerode stattfand).",
    ],
  },
  "ck-hambuehren": {
    unterlagen: [
      "Bewerbungsbogen Adaption Hambühren.",
      "aktuelle relevante Berichte.",
      "Arzt- und Sozialbericht.",
      "Kostenübernahmeerklärung des Leistungsträgers.",
    ],
  },
  "ck-hamburg-mitte": {
    unterlagen: [
      "Kostenübernahmeerklärung des zuständigen Renten- oder Krankenversicherungsträgers oder der Sozialhilfe.",
    ],
  },
  "ck-hardtwald-ii-psom": {
    unterlagen: [
      "Fragebogen zur Vorbereitung der Reha.",
      "wichtige Vorbefunde in Kopie.",
      "Krankenhausentlassungsbericht (insbesondere bei AHB).",
      "Gutachten zur aktuellen Krankheitssituation, falls vorhanden.",
    ],
  },
  "ck-haseems": {
    unterlagen: [
      "Sozialbericht der vermittelnden Stelle.",
      "Kostenzusage des Leistungsträgers.",
      "wichtige ärztliche Untersuchungsbefunde (z. B. aktuelle Laborwerte, Berichte über stationäre Aufenthalte).",
      "Klärung der juristischen Situation.",
    ],
    entgiftungspflicht: true,
  },
  "ck-haus-im-sueden": {
    unterlagen: [
      "schriftliche Bewerbung mit Suchtverlauf und tabellarischem beruflichem Lebenslauf.",
      "Kopie des Adaptionsantrags der Fachklinik.",
      "Abschlussbericht der Fachklinik.",
      "Kostenzusage des zuständigen Kostenträgers.",
    ],
  },
  "ck-haus-lenne": {
    unterlagen: [
      "Kostenzusage eines Kostenträgers oder Klärung als Privatzahler.",
      "Nachweis über die körperliche Entgiftung.",
      "Schriftliche oder mündliche Kostenübernahmeerklärung.",
      "Gültige Krankenscheine für ärztliche und zahnärztliche Behandlung.",
      "Negative Urinkontrolle auf Drogen.",
    ],
    entgiftungspflicht: true,
  },
  "ck-heidehof": {
    unterlagen: [
      "Kostenzusage des Renten-, Krankenversicherungs- oder Sozialleistungsträgers.",
    ],
  },
  "ck-heiligenfeld-berlin": {
    unterlagen: [
      "persönlich ausgefüllter Fragebogen.",
      "Krankenhauseinweisung auf die Heiligenfeld Klinik Berlin (nicht älter als sechs Wochen bei Aufnahme).",
      "aktueller Befundbericht des behandelnden Arztes oder Therapeuten.",
      "ggf. Entlassungsberichte vorangegangener psychosomatischer/psychiatrischer Aufenthalte (vergangene zwei Jahre).",
      "bei PKV: schriftliche Kostenzusage der privaten Krankenversicherung.",
    ],
  },
  "ck-heiligenfeld-familienklinik": {
    unterlagen: [
      "Ausgefüllter Fragebogen / Selbstdarstellungsbogen (Klinikpaket).",
      "Aktueller ärztlicher oder therapeutischer Befundbericht (nicht älter als 3–4 Monate) bzw. Arztfragebogen.",
      "Krankenhaus-Einweisung (Verordnung von Krankenhausbehandlung), Original.",
      "Entlassberichte stationärer Voraufenthalte psychiatrisch/psychosomatisch (gesetzlich: letzte 3 Jahre).",
      "Privat: ausgefüllter Aufnahmeantrag.",
    ],
  },
  "ck-heiligenfeld-rosengarten": {
    unterlagen: [
      "persönlich ausgefüllter Fragebogen.",
      "Kostenzusage des Kostenträgers, ausgestellt auf die Rosengartenklinik Heiligenfeld.",
      "aktueller Befundbericht des behandelnden Arztes oder Therapeuten.",
      "ggf. Entlassungsberichte psychosomatischer/psychiatrischer Voraufenthalte (letztes Jahr; Trägerseite gesetzlich Versicherte: letzte 5 Jahre).",
    ],
  },
  "ck-heiligenfeld-waldmuenchen": {
    unterlagen: [
      "persönlich ausgefüllter Fragebogen / Selbstdarstellungsbogen.",
      "Krankenhauseinweisung auf die Heiligenfeld Klinik Waldmünchen.",
      "aktueller Befundbericht des behandelnden Arztes oder Therapeuten.",
      "ggf. Entlassungsberichte psychosomatischer/psychiatrischer Voraufenthalte (FAQ: zwei Jahre).",
      "bei PKV: schriftliche Kostenzusage und ggf. Beihilfebestätigung.",
    ],
  },
  "ck-hephata-schneeberg": {
    unterlagen: [
      "Anfragebogen (interaktive PDF der Einrichtung).",
      "suchtbezogener Lebenslauf in Stichpunkten.",
      "Kostenzusage des Leistungsträgers (mündlich genügt laut Klinikseite).",
    ],
  },
  "ck-hirtenstein": {
    unterlagen: [
      "gültige Kostenzusage des Leistungsträgers.",
      "Sozialbericht der vermittelnden Stelle mit Arztbericht.",
      "abgeschlossener körperlicher Entzug (Entgiftung).",
      "unauffälliges Alkohol- und Drogenscreening (Clean Status).",
    ],
    entgiftungspflicht: true,
  },
  "ck-hochgrat": {
    unterlagen: [
      "Verordnung von Krankenhausbehandlung (GKV) bzw. Kostenzusage PKV/Beihilfe.",
      "ausgefüllter Fragebogen Hochgrat Klinik.",
      "1–2-seitiger Situationsbericht.",
      "tabellarischer Lebenslauf.",
      "Kurzbefund bzw. Bericht des ambulanten Psychotherapeuten sowie Vorbefunde stationärer Behandlungen.",
    ],
  },
  "ck-hochstadt": {
    unterlagen: [
      "Bewerbung mit Motivationsschreiben.",
      "Lebenslauf und Suchtverlauf.",
      "Aufnahmefragebogen und Schweigepflichtentbindung (Download der Klinik).",
      "Kopie des Sozialberichts.",
      "Kostenzusage.",
    ],
  },
  "ck-hoechsten": {
    unterlagen: [
      "individuelle schriftliche Bewerbung mit Lebenslauf und Entwicklung der Suchterkrankung.",
      "Kostenzusage des Leistungsträgers.",
    ],
  },
  "ck-holthausen": {
    unterlagen: [
      "Kostenzusage des Leistungsträgers.",
      "Berichte über Behandlungen und Beratungen im Vorfeld (hilfreich).",
    ],
  },
  "ck-holthauser-muehle": {
    unterlagen: [
      "Kostenzusage des zuständigen Kosten- bzw. Leistungsträgers.",
      "Berichte über Behandlungen und Beratungen im Vorfeld (als hilfreich ausgewiesen).",
    ],
  },
  "ck-irmingard": {
    unterlagen: [
      "ausgefüllter Patienten-Anmeldebogen bzw. Wiederanmeldebogen.",
      "Befundberichte vorangegangener ambulanter/stationärer psychiatrischer bzw. psychotherapeutischer Behandlung.",
      "Krankenhaus-Einweisung des zuweisenden Arztes bzw. Psychotherapeuten.",
      "falls vorhanden: Befunde zu körperlichen Begleiterkrankungen.",
      "Privat-/Zusatzversicherte: Kostenzusage der PKV bzw. Beihilfe.",
    ],
    bearbeitungszeitHinweis: "Aufnahmetermine erst nach Sichtung und ärztlicher Prüfung der Unterlagen; die Sichtung kann einige Zeit in Anspruch nehmen, ohne Tageszahl. Keine Aufnahmezusage.",
  },
  "ck-isargrund": {
    unterlagen: [
      "Kostenzusage des Leistungsträgers.",
      "Sozialbericht.",
      "Arztbericht.",
    ],
    entgiftungspflicht: true,
  },
  "ck-johannesbad-adaption-dortmund": {
    unterlagen: [
      "aktuell vorliegende Kostenzusage des Leistungsträgers.",
      "ausgefüllter Aufnahmefragebogen / Fragebogen zur Vorbereitung der Adaptionsbehandlung vorab.",
    ],
  },
  "ck-johannesbad-fuessing": {
    unterlagen: [
      "aktuelle ärztliche Unterlagen mit Diagnose/Befunden zur Aufnahmediagnose.",
      "Aufnahme- und Behandlungsvertrag.",
    ],
  },
  "ck-johannesbad-nuernberg": {
    unterlagen: [
      "aktueller Arztbericht inkl. Medikamentenbericht sowie aktuellen Laborwerten.",
      "Sozialbericht einer Suchtberatungsstelle.",
      "Zusage eines Kostenträgers.",
    ],
  },
  "ck-kaisberg": {
    unterlagen: [
      "Schriftliche Bewerbung mit Lebenslauf und Suchtverlauf.",
      "Gültige Kostenzusage eines Leistungsträgers.",
      "Nachweis über den Krankenversicherungsschutz.",
      "Klärung der Therapienebenkosten (Übergangsgeld, ALG II, Taschengeld).",
      "Zahnsanierung sollte zum Aufnahmezeitpunkt erfolgt sein.",
    ],
    entgiftungspflicht: true,
  },
  "ck-kamillushaus": {
    unterlagen: [
      "Kostenzusage der Rentenversicherung/Krankenkasse (Entwöhnung).",
    ],
  },
  "ck-karthause": {
    unterlagen: [
      "gültige Kostenzusage des zuständigen Kostenträgers.",
    ],
  },
  "ck-kieferngarten": {
    unterlagen: [
      "Lebenslauf.",
      "Suchtverlauf.",
      "Therapiereflexion.",
      "gültige Kostenzusage (mindestens telefonisch erteilt) zum Aufnahmetermin.",
    ],
  },
  "ck-klosterwald": {
    unterlagen: [
      "Kostenzusage.",
      "Sozialbericht.",
      "ärztlicher Befundbericht / Befundberichte.",
      "klinikeigener Fragebogen nach Terminvergabe.",
      "ggf. weitere medizinische Unterlagen auf Anforderung.",
    ],
    entgiftungspflicht: true,
  },
  "ck-kompass-hof": {
    unterlagen: [
      "(Kurz-)Bewerbung.",
      "schriftliche oder mündliche Kostenzusage.",
    ],
    entgiftungspflicht: true,
  },
  "ck-korso": {
    unterlagen: [
      "Fragebogen zum Lebenslauf.",
      "schriftliche Kostenzusage eines Leistungsträgers.",
      "unterzeichnete Therapievereinbarung nach dem ambulanten Erstgespräch.",
    ],
  },
  "ck-kraichtal": {
    unterlagen: [
      "gültige Kostenzusage.",
      "Nachweis abgeschlossener ärztlich begleiteter ambulanter oder (qualifizierter) stationärer Entzug.",
      "negatives Drogenscreening bei Aufnahme.",
      "Einwilligungserklärung zur Datenverarbeitung.",
      "bei Begleitkind ab 1 Jahr Nachweis Masern-Impfschutz.",
    ],
  },
  "ck-kronsberg": {
    unterlagen: [
      "Antrag auf Kostenübernahme beim Leistungsträger.",
      "Sozialbericht der Beratungsstelle.",
      "Ärztlicher Befundbericht der Hausärztin / des Hausarztes.",
    ],
  },
  "ck-lago": {
    unterlagen: [
      "gültige Kostenübernahme (Rentenversicherung, Krankenkasse oder Sozialhilfeträger).",
      "Vorgespräch vor Ort oder schriftliche Bewerbung.",
    ],
    entgiftungspflicht: true,
  },
  "ck-landelin": {
    unterlagen: [
      "Nachweis über die Kostenübernahme des zuständigen Leistungsträgers.",
      "ärztliche Unterlagen zur aktuellen gesundheitlichen Situation.",
      "Aufstellung der aktuellen Medikation.",
      "Sozialbericht der vermittelnden Stelle.",
      "Freiwilligkeitserklärung.",
    ],
  },
  "ck-legau": {
    unterlagen: [
      "Sozialbericht (Suchtberatungsstelle oder BKH).",
      "ärztlicher Bericht.",
      "Kostenzusage Rentenversicherung oder Krankenkasse.",
      "bei Kindern zusätzlich Kostenübernahme Haushaltshilfe.",
    ],
  },
  "ck-lehre": {
    unterlagen: [
      "Kostenzusage.",
      "abgeschlossene Entzugsbehandlung.",
    ],
    entgiftungspflicht: true,
  },
  "ck-liblar": {
    unterlagen: [
      "Sozialbericht.",
      "medizinischer Befundbericht.",
      "Antrag auf Kostenübernahme.",
      "Aufnahmeformular der Klinik.",
      "Kostenzusage des Leistungsträgers.",
    ],
    entgiftungspflicht: true,
  },
  "ck-lichtblick": {
    unterlagen: [
      "Kostenübernahme / gültige Bewilligung des Kostenträgers.",
      "Medikamenteneinnahmeplan und Medikamente.",
      "Einkommensnachweise.",
      "aktuelle Bestätigung des Krankenversicherungsverhältnisses spätestens am Aufnahmetag.",
    ],
    entgiftungspflicht: true,
  },
  "ck-lindenhof": {
    unterlagen: [
      "Sozialbericht der vermittelnden Stelle.",
      "Kostenzusage des Leistungsträgers bzw. Kostenverpflichtungserklärung bei Selbstzahlerinnen.",
      "bei Mitaufnahme eines Kindes Kostenzusage für das Kind.",
      "Einverständniserklärung.",
      "Mitgliedsbescheinigung einer Krankenkasse.",
    ],
    entgiftungspflicht: true,
  },
  "ck-ludwigsmuehle": {
    unterlagen: [
      "Kostenzusage durch Rentenversicherung, Krankenversicherung oder Sozialamt.",
      "Sozialbericht.",
      "bei Mitaufnahme von Kindern: Kostenübernahme Haushaltshilfe und Hilfe zur Erziehung.",
    ],
  },
  "ck-luisenklinik": {
    unterlagen: [
      "Kostenzusage des Kostenträgers (Reha).",
      "Ärztliche Befunde zum Reha-Antrag.",
      "Impf- und Allergieausweis.",
    ],
  },
  "ck-luisenklinik-stuttgart": {
    unterlagen: [
      "Kostenzusage des Kostenträgers.",
      "Ärztliche Befunde zum Reha-Antrag.",
      "Medikamentenplan sämtlicher eingenommener Medikamente.",
      "Ärztliche Unterlagen, sofern vorhanden.",
      "Beiliegende Aufnahmeformulare, möglichst ausgefüllt.",
    ],
  },
  "ck-lukas-braunschweig": {
    unterlagen: [
      "Kostenzusage des Kostenträgers.",
      "vor der Aufnahme zugesandte Unterlagen, die ausgefüllt zum Aufnahmetermin mitzubringen sind.",
    ],
  },
  "ck-lvr-langenfeld": {
    unterlagen: [
      "Kostenzusage auf Leistungen zur medizinischen Rehabilitation bei Alkohol-, Medikamenten- oder Cannabisabhängigkeit.",
    ],
  },
  "ck-lwl-foerderturm": {
    unterlagen: [
      "Kostenzusage / Kostenübernahme.",
    ],
  },
  "ck-lwl-unna-tk": {
    unterlagen: [
      "Kostenzusage.",
    ],
    entgiftungspflicht: true,
  },
  "ck-magdalenenstift": {
    entgiftungspflicht: true,
  },
  "ck-magnus-huss": {
    unterlagen: [
      "gültige Kostenzusage.",
    ],
    entgiftungspflicht: true,
  },
  "ck-mainbogen": {
    unterlagen: [
      "gültige Kostenzusage.",
      "stationärer Entzug abgeschlossen.",
      "negatives Drogenscreening bei Aufnahme.",
      "Einwilligungserklärung der Patientin.",
      "bei Begleitkind: Nachweis Masern-Impfschutz.",
    ],
    entgiftungspflicht: true,
  },
  "ck-maria-stern": {
    unterlagen: [
      "formlose Bewerbung mit tabellarischem schulischen und beruflichen Lebens- und Suchtverlauf sowie Behandlungsgründen.",
      "Therapiebericht der zuweisenden Fachklinik.",
      "Kostenübernahme.",
    ],
  },
  "ck-marienstift": {
    unterlagen: [
      "gültige Kostenzusage.",
    ],
    entgiftungspflicht: true,
  },
  "ck-martha-stz": {
    unterlagen: [
      "Kostenübernahme vor der Aufnahme geklärt.",
    ],
    entgiftungspflicht: true,
  },
  "ck-medbo-woellershof": {
    unterlagen: [
      "gültige Kostenzusage für die Behandlung in der Fachklinik.",
    ],
  },
  "ck-median-adaption-koeln": {
    unterlagen: [
      "schriftliche oder mündliche Kostenzusage.",
      "Antrag der Klinik auf Adaptionsmaßnahme beim Kostenträger in Kopie.",
    ],
  },
  "ck-median-agz-duesseldorf": {
    unterlagen: [
      "Kostenzusage nach Reha-Antrag (über behandelnden Arzt; GKV: Muster 61).",
      "Liste der aktuell eingenommenen Medikamente.",
      "Angaben zu Hausarzt und weiteren behandelnden Ärzten.",
    ],
  },
  "ck-median-agz-leipzig": {
    unterlagen: [
      "Reservierungsbestätigung an den Zentralen Reservierungsservice.",
      "Entlassungsbericht des Krankenhauses / aktuelle Arztberichte und Befunde.",
      "Patientenfragebogen / Krankenvorgeschichte.",
      "Selbstzahler und Beihilfe: Kopie der Kostenzusage.",
    ],
  },
  "ck-median-agz-stuttgart": {
    unterlagen: [
      "Arztbericht mit aktuellen medizinischen Befunden.",
      "Sozialbericht.",
      "Kostenzusage des Leistungsträgers.",
      "Beantwortung eines Fragebogens zu Arbeit, Partnerschaft und Familie.",
    ],
    entgiftungspflicht: true,
  },
  "ck-median-berggieshuebel": {
    unterlagen: [
      "Reservierungsbestätigung an den Zentralen Reservierungsservice.",
      "Entlassungsbericht des Krankenhauses / aktuelle Arztberichte und Befunde.",
      "Patientenfragebogen / Krankenvorgeschichte.",
      "Selbstzahler und Beihilfe: Kopie der Kostenzusage.",
    ],
  },
  "ck-median-daun-adaption": {
    unterlagen: [
      "Kostenzusage des Leistungsträgers.",
      "Arztbericht.",
      "Sozialbericht.",
      "Freiwilligkeitserklärung.",
      "Vorgespräch in der Einrichtung.",
    ],
  },
  "ck-median-daun-rosenberg": {
    unterlagen: [
      "Kostenzusage des Leistungsträgers.",
      "Arztbericht.",
      "Sozialbericht.",
      "Freiwilligkeitserklärung (Abhängigkeitsabteilung).",
      "zugeschickter Aufnahmefragebogen (Psychosomatik).",
    ],
  },
  "ck-median-hohenfeld": {
    unterlagen: [
      "Entlassungsbericht des Krankenhauses sowie aktuelle Arztberichte und Befunde.",
      "Patientenfragebogen/Krankenvorgeschichte.",
      "bei Selbstzahlern und Beihilfe: Kopie der Kostenzusage.",
    ],
  },
  "ck-median-mecklenburg": {
    unterlagen: [
      "Arztbericht.",
      "Sozialbericht.",
      "Kostenzusage des Leistungsträgers.",
      "Bewerbung mit Lebenslauf und Suchtverlauf.",
    ],
    entgiftungspflicht: true,
  },
  "ck-median-roemhild": {
    unterlagen: [
      "Sozialbericht und ärztlicher Antrag zur Reha-Behandlung (über Suchtberatungsstelle und Hausarzt).",
      "Kostenzusage des Leistungsträgers.",
      "G100 Antrag auf Leistungen zur Teilhabe / G110 Anlage.",
      "Arztberichte, Entlassungsbericht des Krankenhauses (zur Aufnahme).",
    ],
  },
  "ck-median-saale-koesen": {
    unterlagen: [
      "Aufnahmebogen Psychosomatik / Patientenfragebogen zur Krankenvorgeschichte.",
      "Selbstzahler und Beihilfe: Kopie der Kostenzusage.",
      "Entlassungsbericht des Krankenhauses / aktuelle Arztberichte.",
    ],
  },
  "ck-median-schlangenbad": {
    unterlagen: [
      "Anreisebestätigung an den Zentralen Reservierungsservice (außer AHB).",
      "aktuelle Arztberichte.",
      "Entlassungsbericht des Krankenhauses.",
      "Passbild.",
      "vorab: Behandlungsvertrag, Anreisebestätigung, Anamnesebögen.",
    ],
  },
  "ck-median-schoenen-moos": {
    unterlagen: [
      "Kostenzusage.",
    ],
  },
  "ck-median-schweriner-see": {
    unterlagen: [
      "Antrag.",
      "Sozialbericht.",
      "ärztlicher Befundbericht.",
      "schriftliche Zusage des zuständigen Kostenträgers.",
    ],
    entgiftungspflicht: true,
  },
  "ck-median-sonnenhang": {
    unterlagen: [
      "aktuelle medizinische Unterlagen und Sozialbericht.",
      "gültige Kostenübernahmeerklärung.",
      "zwei Fragebögen und Terminbestätigung (nach Kostenzusage ausgefüllt zurücksenden).",
    ],
  },
  "ck-median-toenisstein": {
    unterlagen: [
      "Kostenzusage für die Maßnahme.",
      "Ggf. Unterlagen zur Beantragung von Übergangsgeld.",
      "Schriftliche Bescheide über Geldleistungen (BA, Krankenkasse u. a.).",
    ],
  },
  "ck-median-vesalius": {
    unterlagen: [
      "Reservierungsbestätigung an den Zentralen Reservierungsservice.",
      "Entlassungsbericht des Krankenhauses / aktuelle Arztberichte und Befunde.",
      "Patientenfragebogen / Krankenvorgeschichte.",
      "Selbstzahler und Beihilfe: Kopie der Kostenzusage.",
    ],
  },
  "ck-median-waldsee": {
    unterlagen: [
      "Kostenzusage für die Dauer der Behandlung.",
      "Arztbericht.",
      "Sozialbericht.",
      "Antrag auf Übernahme von Therapienebenkosten (sofern erforderlich).",
      "Zahnsanierungsbescheinigung.",
    ],
    entgiftungspflicht: true,
  },
  "ck-median-wied": {
    unterlagen: [
      "schriftliche Kostenzusage.",
      "Sozialbericht.",
      "Arztbericht / aktuelle medizinische Unterlagen.",
      "zwei Fragebögen nach Terminvergabe.",
      "Terminbestätigung.",
    ],
    bearbeitungszeitHinweis: "Nach Eingang der Kostenzusage Kontakt zur Terminabsprache binnen weniger Werktage. Aufnahmeprüfung anhand Sozial- und Arztbericht: Rückmeldung „binnen kurzer Zeit“. Keine Aufnahmezusage.",
  },
  "ck-median-wigbertshoehe": {
    unterlagen: [
      "Antrag.",
      "Sozialbericht.",
      "ärztlicher Befundbericht.",
      "Kostenzusage.",
    ],
  },
  "ck-mediclin-bliestal": {
    unterlagen: [
      "Kostenübernahmeerklärung.",
      "digitaler Aufnahmefragebogen (spätestens zwei Wochen vor Anreise).",
      "Privatversicherte: Leistungszusage vor Behandlungsbeginn.",
    ],
  },
  "ck-mediclin-duenenwald": {
    unterlagen: [
      "Sozialversicherungsnummer.",
      "Arztberichte.",
      "ggf. Bescheid über Grad der Behinderung.",
      "Aufnahmefragebogen Psychosomatik vorab zurücksenden.",
    ],
  },
  "ck-mediclin-seepark": {
    unterlagen: [
      "vom Hausarzt verordnete Medikamente und genaue Aufstellung.",
      "Privatpatienten: schriftliche Kostenzusage vor Aufnahme.",
    ],
  },
  "ck-mediclin-soltau": {
    unterlagen: [
      "Krankenkassenkarte.",
      "gegebenenfalls Einweisung.",
      "als Privatpatient die schriftliche Kostenzusage.",
      "digitaler Aufnahmefragebogen vor Anreise.",
    ],
  },
  "ck-mediclin-vogelsang": {
    unterlagen: [
      "Elektronische Gesundheitskarte.",
      "Sozialversicherungsnummer.",
      "Arztberichte.",
      "Bescheid über Grad der Behinderung (wenn vorhanden).",
      "Digitaler Aufnahmefragebogen vor Anreise.",
    ],
  },
  "ck-michels-brandenburg": {
    unterlagen: [
      "Krankenkassenkarte.",
      "Medikamentenplan.",
      "aktuelle Befunde.",
      "eventuell Patientenfragebogen.",
    ],
  },
  "ck-muenchwies": {
    unterlagen: [
      "Reha-Antrag.",
      "Sozialbericht.",
      "ärztlicher Befundbericht.",
      "schriftliche Zusage des zuständigen Kostenträgers.",
      "vollständig ausgefüllter Anmeldebogen vor der Anreise.",
    ],
    entgiftungspflicht: true,
  },
  "ck-muenzesheim": {
    unterlagen: [
      "gültige Kostenzusage des Leistungsträgers.",
      "Einwilligungserklärung zur Datenverarbeitung.",
    ],
  },
  "ck-nado-dortmund": {
    unterlagen: [
      "schriftliche Bewerbung.",
      "Lebens- und Suchtverlauf.",
      "Therapiereflexion.",
    ],
  },
  "ck-nauheim": {
    unterlagen: [
      "Arztbericht.",
      "Sozialbericht.",
      "Zusage eines Leistungs- oder Kostenträgers.",
      "Freiwilligkeitserklärung.",
      "Vor-Aufnahmefragebogen (nach Bewilligung).",
    ],
    entgiftungspflicht: true,
  },
  "ck-nettetal": {
    unterlagen: [
      "schriftliche Bewerbung.",
      "Sozialbericht der vermittelnden Stelle.",
      "Kostenzusage des Leistungsträgers.",
      "aktueller Krankenversicherungsschutz.",
      "wichtige ärztliche Untersuchungsbefunde (Laborwerte, Stationsberichte).",
    ],
    entgiftungspflicht: true,
  },
  "ck-neumuehle": {
    unterlagen: [
      "Gültige Kostenzusage.",
      "Bewerbung mit Lebenslauf und Schilderung der Suchterkrankung.",
      "Ärztliche Berichte.",
      "Sozialbericht.",
      "Nach Möglichkeit: Zahnsanierungsbescheinigung.",
    ],
  },
  "ck-oberharz": {
    unterlagen: [
      "ärztlicher Befundbericht S0051.",
      "Antragsformulare des Kostenträgers.",
      "Aufnahmefragebogen für die Verwaltung (ausgefüllt zurücksenden bzw. online).",
    ],
  },
  "ck-oerrel": {
    unterlagen: [
      "Arztbericht.",
      "Sozialbericht.",
      "Freiwilligkeitserklärung.",
      "Kostenübernahmeerklärung.",
      "möglichst ärztliches Attest, das ansteckende Krankheiten ausschließt.",
    ],
    entgiftungspflicht: true,
  },
  "ck-oldenburger-land": {
    unterlagen: [
      "Kostenzusage des Leistungsträgers.",
      "Sozialbericht oder Gutachten.",
      "Freiwilligkeit der Behandlung.",
    ],
    entgiftungspflicht: true,
  },
  "ck-ostberge": {
    unterlagen: [
      "schriftliche Kostenübernahme des zuständigen Leistungsträgers.",
    ],
  },
  "ck-parkland": {
    unterlagen: [
      "Aufnahmefragebogen / Anmeldebogen Akut (vollständig ausgefüllt).",
    ],
  },
  "ck-paul-ehrlich": {
    unterlagen: [
      "Patientenfragebogen vor Antritt ausfüllen und an die Klinik zurücksenden.",
      "ärztliche Befunde und Krankenhausberichte (falls vorhanden).",
    ],
  },
  "ck-petersen-rostock": {
    unterlagen: [
      "bewilligter Antrag / Kostenzusage des Rentenversicherungsträgers oder der Krankenkasse.",
      "Würzburger Screeningbogen vor Aufnahme (laut Konzept).",
    ],
    entgiftungspflicht: true,
  },
  "ck-pfalzburger": {
    unterlagen: [
      "Aufnahme-Fragebogen.",
      "ärztliche Unterlagen soweit vorhanden (z. B. Entlassbericht nach Entzug).",
      "Kostenübernahme des Rentenversicherers bzw. der Krankenkasse.",
    ],
    entgiftungspflicht: true,
  },
  "ck-pirna-adaption": {
    unterlagen: [
      "Kostenübernahmebescheid des Leistungsträgers.",
    ],
  },
  "ck-prowo": {
    unterlagen: [
      "Adresse und Telefonnummer der Drogenberatungsstelle bzw. vermittelnden Stelle.",
      "gültige Leistungszusage (Rentenversicherung, Krankenkasse oder überörtlicher Sozialhilfeträger).",
      "Bescheinigung über abgeschlossene Entzugsbehandlung oder Abstinenznachweis durch Screenings.",
      "Sozialbericht.",
      "negatives Drogenscreening.",
    ],
    entgiftungspflicht: true,
  },
  "ck-pskbgl": {
    entgiftungspflicht: true,
  },
  "ck-pzn-landhaus": {
    unterlagen: [
      "Kostenzusage.",
    ],
    entgiftungspflicht: true,
  },
  "ck-ratingen": {
    unterlagen: [
      "gültige Kostenzusage des Leistungsträgers.",
      "Sozialbericht der vermittelnden Beratungsstelle bzw. des Krankenhaus-Sozialdienstes.",
      "abgeschlossener körperlicher Entzug (Entgiftung).",
      "unauffälliges Alkohol- und Drogenscreening (Cleanstatus).",
    ],
  },
  "ck-ratzeburg": {
    unterlagen: [
      "Reha-Antrag (Formularpaket der Klinik).",
      "medizinischer Aufnahmefragebogen (online im Patientenportal nach Einladung).",
    ],
  },
  "ck-rehahaus-gundelfingen": {
    unterlagen: [
      "Fragebogen zur Bewerbung.",
      "schriftliche Kostenzusage auf das Therapiezentrum Brückle.",
      "Sozialbericht der Beratungsstelle.",
      "Nachweis der qualifizierten Entgiftung.",
      "Nachweis Krankenversicherungsschutz / Krankenkassenkarte.",
    ],
    entgiftungspflicht: true,
  },
  "ck-release": {
    unterlagen: [
      "schriftliche Bewerbung mit Lebens-/Suchtverlauf.",
      "Sozialbericht / ärztliches Gutachten.",
      "Leistungszusage für den Behandlungsplatz.",
      "Zusage für die Therapienebenkosten (Bürgergeld, Barbetrag etc.).",
      "Sozialbericht der Entsendestelle.",
    ],
    entgiftungspflicht: true,
  },
  "ck-release-adaption": {
    unterlagen: [
      "Leistungszusage für die Behandlungskosten.",
      "schriftliche oder telefonische Bewerbung.",
      "Überleitungsbogen Adaption.",
    ],
  },
  "ck-renchtal": {
    unterlagen: [
      "Kostenzusage.",
    ],
    entgiftungspflicht: true,
  },
  "ck-richelsdorf": {
    unterlagen: [
      "Arztbericht.",
      "Sozialbericht.",
      "Information über den Verlauf der Entgiftung.",
      "Kostenzusage des Leistungsträgers.",
    ],
    entgiftungspflicht: true,
  },
  "ck-ringgenhof": {
    unterlagen: [
      "Kostenzusage des Leistungs- bzw. Kostenträgers.",
      "individuelle schriftliche Bewerbung mit Lebenslauf und Entwicklung der Suchterkrankung.",
    ],
    entgiftungspflicht: true,
  },
  "ck-rosenberg": {
    unterlagen: [
      "ausgefüllter Fragebogen zu Ihrer Gesundheit (vor Anreise; Grundlage des ärztlichen Aufnahmegesprächs).",
      "Befundberichte.",
      "Medikationsplan der behandelnden Ärztin/des behandelnden Arztes.",
      "Medikamente in der Originalverpackung.",
    ],
  },
  "ck-roseneck": {
    unterlagen: [
      "Anmeldebogen.",
      "persönlicher Bericht.",
      "Kopie der Krankenhauseinweisung (Facharzt Psychiatrie/Nervenarzt/Psychosomatik oder Psychotherapie).",
      "Sorgerechtsbestätigung bei Minderjährigen.",
      "aktueller Befundbericht bei bestimmten Indikationen (u. a. PTBS; Depression unter 25 Jahren).",
    ],
  },
  "ck-roswitha": {
    unterlagen: [
      "Kostenübernahmeerklärung einer Krankenkasse oder Rentenversicherung.",
      "Ausgefüllte Anreisebestätigung.",
      "Ausgefüllter Patientenfragebogen.",
    ],
  },
  "ck-rothaar": {
    unterlagen: [
      "Antrag auf Kostenübernahme beim Leistungsträger.",
      "Sozialbericht.",
      "ärztliches Gutachten / Befundbericht (S0051).",
      "aktueller Medikamentenplan (max. 4 Wochen vor Anreise).",
    ],
    entgiftungspflicht: false,
  },
  "ck-rusteberg": {
    unterlagen: [
      "Reha-Bescheid / Kostenzusage des Leistungsträgers.",
    ],
  },
  "ck-saaletalklinik": {
    unterlagen: [
      "Kostenübernahmeerklärung eines Kosten- und Leistungsträgers.",
      "ausführlicher Arztbericht.",
      "Sozialbericht einer Psychosozialen Beratungsstelle oder Fachambulanz.",
    ],
  },
  "ck-salus-adaption-huerth": {
    unterlagen: [
      "Leistungsbewilligung durch den zuständigen Träger.",
      "schriftliche Bewerbung (Bewerbungsschreiben, Lebenslauf, Suchtverlauf sowie ärztliche und therapeutische Stellungnahmen).",
      "persönliches Bewerbungs- und Informationsgespräch.",
    ],
  },
  "ck-salus-castrop": {
    unterlagen: [
      "Leistungszusage / Kostenzusage.",
      "Sozialbericht der Drogenberatung.",
      "ärztliches Gutachten (für den Kostenantrag).",
    ],
    entgiftungspflicht: true,
  },
  "ck-salus-friedberg": {
    unterlagen: [
      "Kostenzusage des zuständigen Kostenträgers.",
      "Gerne, nicht zwingend: aussagefähiger Lebenslauf.",
      "Gerne, nicht zwingend: schriftliche Bescheinigung über Drogenfreiheit durch Entgiftungsstation oder Hausarzt.",
    ],
    entgiftungspflicht: false,
  },
  "ck-salus-hurth": {
    unterlagen: [
      "Arztbericht.",
      "Sozialbericht.",
      "Zusage eines Leistungs- oder Kostenträgers.",
      "Freiwilligkeitserklärung.",
    ],
  },
  "ck-salus-lindow": {
    unterlagen: [
      "Leistungs- bzw. Kostenantrag beim Kostenträger.",
      "Sozialbericht (Suchtberatungsstelle, betrieblicher Sozialdienst oder Entzugsstation).",
    ],
  },
  "ck-salus-nauheim-adaption": {
    unterlagen: [
      "Bewerbungsbogen Adaption.",
      "Aktueller beruflicher Lebenslauf.",
      "Kurzarztbrief mit aktueller Medikation, Diagnosen und voraussichtlicher sozialmedizinischer Leistungseinschätzung.",
      "Schweigepflichtentbindung für Adaptionsbewerber.",
      "Leistungsbewilligung / Adaptionsantrag des Phase-I-Behandlerteams.",
    ],
  },
  "ck-salus-potsdam": {
    unterlagen: [
      "Bewilligungsbescheid der Rentenversicherungsträger bzw. Kostenzusage (oder Selbstzahler).",
    ],
  },
  "ck-salza": {
    unterlagen: [
      "ausgefüllter Anamnesefragebogen (nach Absprache).",
      "Anschrift der behandelnden Ärzte.",
      "Krankenkassenkarte.",
      "ggf. Zuzahlungsbefreiung und Nachweis geleisteter Zuzahlungen.",
      "bei Betreuung den Beschluss.",
    ],
  },
  "ck-schielberg": {
    unterlagen: [
      "Kostenzusage.",
      "Anmeldebogen.",
    ],
  },
  "ck-schielberg-adaption-ka": {
    unterlagen: [
      "Kostenzusage.",
    ],
  },
  "ck-schlehreut": {
    unterlagen: [
      "gültige Kostenzusage.",
      "schriftliche Bewerbung mit Lebenslauf und Suchtkarriere.",
      "Kontakt zu Beratungsstelle oder Arzt.",
      "gültige Krankenversicherung.",
      "ggf. Vorbefunde bei fraglicher Kontraindikation.",
    ],
    entgiftungspflicht: true,
  },
  "ck-schloz": {
    unterlagen: [
      "Kostenzusage.",
      "Sozialbericht der zuweisenden Beratungsstelle (für Kombibehandlung öffentlich genannt).",
    ],
    entgiftungspflicht: true,
  },
  "ck-schoenbirken": {
    unterlagen: [
      "Kostenzusage eines Leistungsträgers.",
      "Sozialbericht einer Beratungsstelle.",
      "aktueller ärztlicher Bericht.",
    ],
    entgiftungspflicht: true,
  },
  "ck-schorborn": {
    unterlagen: [
      "gültige Kostenzusage des zuständigen Kostenträgers.",
      "Aufnahmefragebogen.",
    ],
  },
  "ck-skh-rodewisch": {
    unterlagen: [
      "Kostenübernahme durch den Rentenversicherungsträger.",
    ],
  },
  "ck-sonnenberg": {
    unterlagen: [
      "Entlassungsbericht des Krankenhauses / aktuelle Arztberichte und Befunde.",
      "Befreiungsausweis gesetzliche Zuzahlung (falls vorhanden).",
      "Selbstzahler und Beihilfe: Kopie der Kostenzusage.",
      "Daten Notfallkontakt.",
    ],
  },
  "ck-soteria-adaption": {
    unterlagen: [
      "Bewerbungsanschreiben mit Begründung der Adaption.",
      "Sucht-Lebenslauf (max. 2 Seiten).",
      "tabellarischer beruflicher Lebenslauf.",
    ],
  },
  "ck-soteria-leipzig": {
    unterlagen: [
      "Kostenzusage des zuständigen Kostenträgers.",
      "ausführlicher Arztbericht.",
      "Sozialbericht einer Suchtberatungsstelle.",
      "aktuelle Medikamente / Verordnungsplan.",
      "aktuelle relevante medizinische Unterlagen, z. B. Laborbefunde.",
    ],
    entgiftungspflicht: true,
  },
  "ck-sotterhausen": {
    unterlagen: [
      "Schriftliche Kostenzusage des zuständigen Leistungsträgers.",
      "Gültige Versicherungskarte der Krankenkasse.",
      "Sozialbericht / Arztbericht.",
      "Unterlagen zu gerichtlichem Beschluss, Schulden etc.",
    ],
  },
  "ck-st-camillus": {
    unterlagen: [
      "Kostenübernahme durch den Versicherungsträger.",
    ],
    entgiftungspflicht: true,
  },
  "ck-step-tagesklinik": {
    unterlagen: [
      "Antrag auf Kostenübernahme.",
      "Sozialbericht der Beratungsstelle.",
      "ärztlicher Befundbericht.",
      "Kostenzusage.",
    ],
  },
  "ck-stillenberg": {
    unterlagen: [
      "schriftliche Kostenzusage des Leistungsträgers.",
    ],
    entgiftungspflicht: true,
  },
  "ck-suedergellersen": {
    unterlagen: [
      "gültige Kostenzusage.",
      "Sozialbericht der Beratungsstelle.",
      "ärztlicher Befund.",
      "Antrag beim zuständigen Leistungsträger.",
    ],
  },
  "ck-tagesklinik-duesseldorf": {
    unterlagen: [
      "Fragebogen zur aktuellen Situation.",
    ],
  },
  "ck-tannenhof-adaption-berlin": {
    unterlagen: [
      "Bewerbungsfragebogen (Interessent und behandelnder Arzt).",
      "schriftliche Anmeldung.",
      "Antrag auf Kostenübernahme (über Sozialdienst der Rehaklinik).",
    ],
  },
  "ck-tannenhof-adaption-np": {
    unterlagen: [
      "Bewerbungsfragebogen (auch vom behandelnden Arzt).",
      "bei begleitenden Kindern Zusatzfragebogen Kinder.",
    ],
  },
  "ck-tannenhof-lichtenrade": {
    unterlagen: [
      "Kostenübernahme des Rentenversicherers bzw. der Krankenkasse.",
      "Arztbericht.",
      "Sozialbericht.",
      "ggf. Gutachten und Abschlussberichte von Vorbehandlungen.",
      "negatives Drogenscreening.",
    ],
    entgiftungspflicht: true,
  },
  "ck-tannenhof-tagesklinik": {
    unterlagen: [
      "Arztbericht.",
      "Sozialbericht.",
      "Gutachten / Abschlussberichte von Vorbehandlungen.",
      "Kostenübernahme des Rentenversicherers bzw. der Krankenkasse.",
    ],
    entgiftungspflicht: true,
  },
  "ck-tauwetter": {
    unterlagen: [
      "Kostenübernahmeerklärung des Versicherungs- bzw. Sozialhilfeträgers.",
      "Sozialbericht der beantragenden Stelle.",
      "aktueller, vom behandelnden Arzt unterschriebener Medikamentenplan.",
      "wenn möglich aktuelle Labor- und EKG-Befunde.",
    ],
    entgiftungspflicht: true,
  },
  "ck-teutoburg": {
    unterlagen: [
      "Sozialbericht der Suchtberatungsstelle (an Kostenträger und Klinik).",
      "schriftliche Bewerbung mit Lebenslauf und Suchtentwicklung (bei Drogenabhängigkeit).",
      "Krankenkassenkarte.",
    ],
  },
  "ck-tgj-adaption": {
    unterlagen: [
      "kurze formlose Bewerbung.",
      "Bewerberinnenbogen Adaption.",
    ],
  },
  "ck-tiefental": {
    unterlagen: [
      "gültige Kostenübernahmeerklärung des Sozialleistungsträgers.",
      "Vorbefunde zur Aufnahme.",
    ],
  },
  "ck-tps-hamburg": {
    unterlagen: [
      "aktueller ausführlicher psychiatrischer Arztbrief.",
      "aktueller Sozialbericht.",
      "Anmeldung zum Vorstellungsgespräch.",
    ],
    entgiftungspflicht: true,
  },
  "ck-tz-speyer": {
    unterlagen: [
      "Motivationsschreiben.",
      "Suchtverlauf.",
      "beruflicher Lebenslauf.",
      "Kostenzusage eines Leistungsträgers.",
    ],
  },
  "ck-villa-lilly": {
    unterlagen: [
      "Kostenzusage des zuständigen Leistungsträgers.",
      "ärztliche Bescheinigung, dass die körperliche Entgiftung abgeschlossen oder nicht notwendig ist.",
      "Aufnahmefragebogen.",
    ],
    entgiftungspflicht: true,
  },
  "ck-vitrea-berghof-2": {
    unterlagen: [
      "Kostenzusage des Leistungsträgers.",
      "Sozialbericht.",
      "Adaptionsantrag.",
      "Therapiebericht.",
    ],
  },
  "ck-vitrea-berghofklinik": {
    unterlagen: [
      "Reha-Antrag / Formularpaket (über Suchtberatungsstelle, Krankenkasse oder DRV).",
      "Sozialbericht.",
      "fachlich begründete ärztliche Stellungnahme (Vorgeschichte, Vorbehandlungen, aktuelle Symptomatik, Begründung der stationären Entwöhnung).",
      "Arztberichte und Befunde.",
    ],
  },
  "ck-vitrea-wiehengebirge": {
    unterlagen: [
      "Reha-Antrag (Formularpaket über Suchtberatungsstelle, Krankenkasse oder DRV).",
      "Sozialbericht (mit Suchtberatungsstelle oder während der Entgiftung).",
      "fachlich begründete Stellungnahme des Haus-/Facharztes.",
      "Anschriftenliste vor der Anreise.",
    ],
  },
  "ck-vitus": {
    unterlagen: [
      "ärztlicher Bericht.",
      "Sozialbericht der Beratungsstelle oder des Krankenhauses.",
      "schriftliche Zusage der Kostenübernahme.",
      "letzte Laborbefunde.",
      "ggf. Gesundheitszeugnis.",
    ],
  },
  "ck-waldschloesschen": {
    unterlagen: [
      "gültige Kostenzusage des Leistungsträgers.",
      "Sozialbericht der Beratungsstelle oder des Sozialdienstes eines Krankenhauses.",
      "Medikationsliste sowie medizinische Vorbefunde (z. B. Entlassbriefe, Labor- oder Röntgenbefunde).",
      "ausgefüllter Fragebogen nach Terminvergabe.",
      "Antrag auf medizinische Rehabilitation.",
    ],
    entgiftungspflicht: true,
  },
  "ck-waldschloss-dd": {
    unterlagen: [
      "Kostenzusage.",
      "ausgefüllter Patientenfragebogen.",
      "Behandlungsvertrag.",
      "Berichte früherer Klinikaufenthalte oder ambulanter Psychotherapie, soweit vorhanden.",
    ],
  },
  "ck-weihersmuehle": {
    unterlagen: [
      "Aktueller Lebenslauf und Beschreibung des Suchtverlaufs.",
      "Ggf. Angaben zum juristischen Hintergrund.",
      "Kostenzusage des Leistungsträgers.",
      "Sozialbericht der Beratungsstelle, des Krankenhaus-Sozialdienstes oder der JVA.",
      "Medizinische Vorbefunde (Entlassbriefe, Labor- oder Röntgenbefunde).",
    ],
    entgiftungspflicht: true,
  },
  "ck-wendepunkt": {
    unterlagen: [
      "Kostenzusage des Leistungsträgers.",
      "Antrag über Suchtberatungsstelle, Entgiftungsstation oder Haus-/Facharzt.",
    ],
  },
  "ck-weser-ems": {
    unterlagen: [
      "Kostenzusage des Leistungsträgers.",
    ],
    entgiftungspflicht: true,
  },
  "ck-wiesengrund": {
    unterlagen: [
      "Sozialbericht.",
      "ärztlicher Befundbericht.",
      "bei Aufnahme ohne vorgeschaltete Entzugsbehandlung: nachgewiesene Beigebrauchsfreiheit von wenigstens vier Wochen.",
    ],
  },
  "ck-wolkersdorf": {
    unterlagen: [
      "abgeschlossene Entgiftungsbehandlung, bestätigt durch Klinik oder Justizvollzugsanstalt.",
      "Kostenzusage von Krankenkasse, Sozialhilfeträger oder Rentenversicherung.",
    ],
    entgiftungspflicht: true,
  },
  "ck-wuermtal": {
    unterlagen: [
      "Motivationsschreiben bzw. Lebens- und Suchtverlauf (oder Sozialbericht).",
      "gültige Kostenzusage.",
      "Nachweis über abgeschlossene Entgiftung.",
      "Arztbrief und ggf. aktueller Medikationsplan.",
      "unauffälliges Alkohol- und Drogenscreening (Cleanstatus).",
    ],
    entgiftungspflicht: true,
  },
  "ck-zapr-glotterbad": {
    unterlagen: [
      "Kostenzusage.",
    ],
  },
  "ck-zwieselberg": {
    unterlagen: [
      "Kostenzusage des Leistungs- oder Kostenträgers.",
    ],
  },
};

export function aufnahmeAngabe(id: string): AufnahmeAngabe | undefined {
  const base = AUFNAHME_BY_ID[id];
  const extra = AUFNAHME_EXTRA_BY_ID[id];
  if (!base && !extra) return undefined;
  return {
    unterlagen: base?.unterlagen?.length ? base.unterlagen : extra?.unterlagen,
    entgiftungspflicht:
      base?.entgiftungspflicht !== undefined ? base.entgiftungspflicht : extra?.entgiftungspflicht,
    bearbeitungszeitHinweis: base?.bearbeitungszeitHinweis ?? extra?.bearbeitungszeitHinweis,
  };
}
