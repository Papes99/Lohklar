/**
 * MPU-Vorbereitung and Klinik statt Strafe (§§ 35/36 BtMG) — only publicly
 * documented houses. Not a fourth indication. Do not infer from drogen=true.
 *
 * Klinik statt Strafe = Anerkennung als suchttherapeutische Einrichtung nach
 * §§ 35/36 BtMG (Therapie statt Strafe). Gilt für BtMG-Delikte, nicht für
 * reine Alkoholabhängigkeit. Eußerthal (Kontraindikation) und alkoholspezifische
 * Häuser ohne Anerkennung gehören nicht hierher. MEDIAN Am Waldsee nennt
 * öffentlich § 31 ff BtMG, das ist nicht § 35 — daher nicht enthalten.
 *
 * MPU-Vorbereitung = ausgewiesener Fahreignungs-Kurs / Indikationsgruppe im Haus.
 * Die MPU selbst macht Lohklar nicht; ambulante Beratungsstellen gehören nicht
 * in den Katalog.
 *
 * Bestandskatalog 2026-09-07: 223 Suchtreha-/Dual-Häuser gegen Klinikseiten,
 * Landeslisten (NRW MAGS, BW, Niedersachsen) und BVS-Profile geprüft.
 */

/** Stationäre Reha mit belegtem MPU-Vorbereitungskurs oder Indikationsgruppe. */
export const MPU_HOUSE_IDS = new Set<string>([
  "ck-alpenland", // Indikativgruppe MPU, rosenheim-suchthilfe
  "ck-bergstrasse", // Informationsgruppe Führerschein, Klinik Falkenhof
  "ck-donnersberg", // individuelle MPU-Vorbereitung, evh-pfalz
  "ck-eichelsdorf", // TÜV-Thüringen anerkannte MPU-Vorbereitung, bwlv
  "ck-elbingerode", // psychoedukativer MPU-Vortrag, DIAKO Harz
  "ck-eschenburg", // MPU-Vorbereitungsgruppe, MEDIAN Kliniküberblick
  "ck-hirtenstein", // MPU-Gruppe in Indikationsgruppen, suchthilfe-allgaeu
  "ck-hochstadt", // Vorbereitungskurs MPU, GEBO-Broschüre
  "ck-isargrund", // MPU-Vorbereitung auf die Prüfung, Hephata Weibersbrunn
  "ck-renchtal", // Informationsgruppe MPU, bwlv
  "ck-rusteberg", // MPU-Gruppe, sit-online
  "ck-salus-castrop", // MPU-Kurs mit Suchthilfe Direkt Essen gGmbH
]);

/**
 * Belegte Anerkennung nach §§ 35/36 BtMG bzw. Landesliste / Trägerseite /
 * öffentliches BVS-Profil mit ausdrücklicher Behandlung nach § 35/§ 36 BtMG.
 * Nur dokumentierte Häuser. Alkohol-only ohne Anerkennung und Kontraindikation
 * Eußerthal sind absichtlich nicht enthalten.
 */
export const KLINIK_STATT_STRAFE_IDS = new Set<string>([
  "ck-adaption-birkenwerder",
  "ck-adaption-erfurt",
  "ck-adaption-lahr",
  "ck-adaption-weimar",
  "ck-adv-f42",
  "ck-aggerblick",
  "ck-agj-karlsruhe",
  "ck-alpenland",
  "ck-bergstrasse",
  "ck-birkenweg",
  "ck-boeddiger",
  "ck-boerstingen",
  "ck-briese",
  "ck-brueckle",
  "ck-bussmannshof",
  "ck-bwlv-tuebingen",
  "ck-bwlv-wiesengrund",
  "ck-diako-adaption-husum",
  "ck-diako-breklum",
  "ck-do-it",
  "ck-do-it-adaption",
  "ck-do-suchthilfe-bonn",
  "ck-donnersberg",
  "ck-eichelsdorf",
  "ck-eschenberg",
  "ck-fachklinik-meckenheim",
  "ck-fehmarn",
  "ck-freiolsheim",
  "ck-friedrichshof",
  "ck-friedrichshof-adaption",
  "ck-fuerstenwald",
  "ck-germerode",
  "ck-grafrath",
  "ck-grossburschla",
  "ck-hamburg-mitte",
  "ck-haseems",
  "ck-haus-lenne",
  "ck-hausen-im-tal",
  "ck-hochstadt",
  "ck-hoechsten",
  "ck-kadesch-herne",
  "ck-kaisberg",
  "ck-karthause",
  "ck-kieferngarten",
  "ck-kompass-hof",
  "ck-kronsberg",
  "ck-lago",
  "ck-lehre",
  "ck-liblar",
  "ck-lindenhof",
  "ck-magnus-huss",
  "ck-maria-stern",
  "ck-median-mecklenburg",
  "ck-nado-dortmund",
  "ck-nettetal",
  "ck-neumuehle",
  "ck-osterholz",
  "ck-pfalzburger",
  "ck-prop-laim",
  "ck-prowo",
  "ck-prowo-koeln",
  "ck-pskbgl",
  "ck-ratingen",
  "ck-rehahaus-gundelfingen",
  "ck-release",
  "ck-release-adaption",
  "ck-rusteberg",
  "ck-salus-friedberg",
  "ck-schielberg",
  "ck-schielberg-adaption-ka",
  "ck-schlehreut",
  "ck-schorborn",
  "ck-skm-reha-koeln",
  "ck-soteria-leipzig",
  "ck-step-tagesklinik",
  "ck-suedergellersen",
  "ck-tagesklinik-duesseldorf",
  "ck-tagwerk-stuttgart",
  "ck-tannenhof-adaption-berlin",
  "ck-tannenhof-lichtenrade",
  "ck-tannenhof-tagesklinik",
  "ck-teutoburg",
  "ck-tps-hamburg",
  "ck-villa-lilly",
  "ck-waldschloesschen",
  "ck-weihersmuehle",
  "ck-weitenau",
  "ck-wiesengrund",
  "ck-wolkersdorf",
  "ck-wuermtal",
]);

export function houseOffersMpu(id: string): boolean {
  return MPU_HOUSE_IDS.has(id);
}

export function houseOffersKlinikStattStrafe(id: string): boolean {
  return KLINIK_STATT_STRAFE_IDS.has(id);
}
