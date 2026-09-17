import type { ClinicPhoto, PhotoSlot } from "./types.ts";

/** Max. 1 Titel + 4 Galerie. */
export const MAX_CLINIC_PHOTOS = 5;

type PhotoOverride = {
  file: string;
  slot: PhotoSlot;
  caption: string;
  href?: string;
};

export const PHOTO_CAPTION_OVERRIDES: Partial<Record<string, PhotoOverride[]>> = {
  "ck-oelmuehle": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "adaption.jpg", slot: "umgebung", caption: "Adaption" },
    { file: "blaues-haus.jpg", slot: "besonderheit", caption: "Halle" },
  ],
  "ck-auwald": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],
  "ck-bergstrasse": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],
  "ck-bergzabern": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],
  "ck-borkum": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],
  "ck-burgklinik": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Gelände" },
  ],
  "ck-fehmarn": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],
  "ck-flechtingen": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],
  "ck-haffkueste": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],
  "ck-kieferngarten": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],
  "ck-landelin": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Gelände" },
  ],
  "ck-lichtblick": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],
  "ck-muenchwies": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],
  "ck-nordlicht": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Gelände" },
  ],
  "ck-prop-laim": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],
  "ck-rothaar": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Gelände" },
  ],
  "ck-seehof": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Gelände" },
  ],
  "ck-suedergellersen": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],
  "ck-waren": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],
  "ck-weserblick": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],
  "ck-wolkersdorf": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],


  "ck-adaption-cuxhaven": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
  ],

  "ck-adaption-heppenheim": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-adaption-lahr": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
  ],

  "ck-adaption-leipzig-wermsdorf": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "adaption.jpg", slot: "umgebung", caption: "Adaption" },
  ],

  "ck-adaption-schwerin": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "adaption.jpg", slot: "umgebung", caption: "Adaption" },
  ],

  "ck-adaption-weimar": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-aggerblick": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-agj-karlsruhe": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-alexianer-reha-koeln": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-alpcura": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-alpenblick": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-alpenland": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-alpenland-reichenhall": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-alte-flugschule": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-ameos-kuehlungsborn": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-ameos-ratzeburg": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
  ],

  "ck-asklepios-bad-schwartau": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-asklepios-fuerstenhof": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-aukrug": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Team" },
  ],

  "ck-bassum": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-bavaria-kreischa": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-bergisch-land": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-berleburg": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-berus": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-birkental": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-blankenburg": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-blaukreuz-lippe": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-bramstedt": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-burgenlandklinik": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-bussmannshof": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
  ],


  "ck-bwlv-tagesreha-pforzheim": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-bwlv-tuebingen": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-carolabad": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-celenus-carolabad": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
  ],

  "ck-celenus-freiburg": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-celenus-kinzigtal": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-celenus-ortenau-add": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-celenus-schoemberg": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-celenus-schweizerwiese": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-dgd-tagesreha-ffm": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-diako-adaption-husum": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "adaption.jpg", slot: "umgebung", caption: "Adaption" },
  ],

  "ck-diana": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-do-it-adaption": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-drv-frankenhausen": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-drv-hellbachtal": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-drv-lipperland": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-drv-werra": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-drv-wingertsberg": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-ebel-bergfried": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-ebel-heinrich-heine": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-ebel-vogelsberg": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-ebhausen": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-eichelsdorf": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-eifelklinik": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-eschenberg": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-eschenburg": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "adaption.jpg", slot: "umgebung", caption: "Adaption" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-eusserthal": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "adaption.jpg", slot: "umgebung", caption: "Adaption" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-eusserthal-landau": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-fachklinik-meckenheim": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-friedrichshof": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "adaption.jpg", slot: "umgebung", caption: "Adaption" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],


  "ck-furth": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-gelderland": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-germerode": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-goehren": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-greifswald": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-griesbacherhof": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-groenenbach": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-hartwald": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-haus-im-sueden": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "adaption.jpg", slot: "umgebung", caption: "Adaption" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-haus-lenne": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-haussee": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-heiligenfeld-berlin": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-heiligenfeld-rosengarten": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-hermannsborn": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-hirtenstein": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-hochgrat": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-hochstadt": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-hoechsten": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-hoehenklinik-bischofsgruen": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-holthausen": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-holthauser-muehle": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-huettenbuehl": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-irmingard": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-isargrund": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-johannesbad-adaption-dortmund": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "adaption.jpg", slot: "umgebung", caption: "Adaption" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-johannesbad-fuessing": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-johannesbad-nuernberg": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-johannesbad-saarschleife": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-kaisberg": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-kamillushaus": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],


  "ck-karthause": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-klinik-rhoen": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-klinik-saale": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-klosterwald": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-kompass-hof": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-korso": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-kraichtal": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-kronsberg": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-lehre": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-liblar": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-lindenberg-ried": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-ludwigsmuehle": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "adaption.jpg", slot: "umgebung", caption: "Adaption" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-luisenklinik": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-luisenklinik-stuttgart": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-lvr-langenfeld": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speisesaal" },
  ],

  "ck-lwl-foerderturm": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-lwl-muensterland": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-magdalenenstift": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-magnus-huss": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-marbachtal": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-maria-stern": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-marienstift": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-medbo-woellershof": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-median-adaption-duisburg": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "adaption.jpg", slot: "umgebung", caption: "Adaption" },
  ],

  "ck-median-adaption-koblenz": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "adaption.jpg", slot: "umgebung", caption: "Adaption" },
  ],

  "ck-median-adaption-koeln": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "adaption.jpg", slot: "umgebung", caption: "Adaption" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-agz-duesseldorf": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-agz-stuttgart": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-berggieshuebel": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-berka-ilmtal": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],


  "ck-median-bernkastel": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-brandis": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-burggraben": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
  ],

  "ck-median-daun-adaption": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-daun-rosenberg": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-dormagen": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-gottleuba": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
  ],

  "ck-median-graal-mueritz": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-hohenfeld": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
  ],

  "ck-median-kinzigtal-soden": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
  ],

  "ck-median-kuehlungsborn": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
  ],

  "ck-median-lobenstein": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
  ],

  "ck-median-mecklenburg": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-muehlengrund": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-odenwald": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-psm-duerkheim": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
  ],

  "ck-median-ptk-liebenwerda": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-pyrmont-psm": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
  ],

  "ck-median-rhein-haardt": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
  ],

  "ck-median-roemhild": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-rothenfelde": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
  ],

  "ck-median-saale-koesen": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-salze": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
  ],

  "ck-median-schlangenbad": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-schmannewitz": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-schoenen-moos": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
  ],

  "ck-median-schweriner-see": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Halle" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-sonnenhang": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-suedpark": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "bad.jpg", slot: "zimmer_bad", caption: "Bad" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

  "ck-median-toenisstein": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
  ],

};

const SLOT_CAPTION: Record<PhotoSlot, string> = {
  aussen: "Eingang",
  zimmer_bad: "Zimmer",
  umgebung: "Gelände",
  speiseraum: "Speisesaal",
  besonderheit: "Halle",
};

export function capPhotos<T>(photos: T[]): T[] {
  return photos.slice(0, MAX_CLINIC_PHOTOS);
}

export function applyPhotoPolicy(clinicId: string, photos: ClinicPhoto[]): ClinicPhoto[] {
  const override = PHOTO_CAPTION_OVERRIDES[clinicId];
  if (override?.length) {
    return capPhotos(
      override.map((item) => ({
        slot: item.slot,
        caption: item.caption,
        alt: item.caption,
        imagePath: item.href ?? `/clinics/${clinicId}/${item.file}`,
        source: "klinik" as const,
        asOf: photos[0]?.asOf ?? "09.2026",
      })),
    );
  }
  const seen = new Set<string>();
  const unique: ClinicPhoto[] = [];
  for (const photo of photos) {
    if (!photo.imagePath) continue;
    if (seen.has(photo.imagePath)) continue;
    seen.add(photo.imagePath);
    unique.push({
      ...photo,
      caption: SLOT_CAPTION[photo.slot],
      alt: SLOT_CAPTION[photo.slot],
    });
  }
  if (unique.length) return capPhotos(unique);
  return capPhotos(
    photos.map((photo) => ({
      ...photo,
      caption: SLOT_CAPTION[photo.slot],
      alt: SLOT_CAPTION[photo.slot],
    })),
  );
}
