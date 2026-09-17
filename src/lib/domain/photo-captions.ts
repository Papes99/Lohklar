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
  "ck-eusserthal": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
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
  "ck-kompass-hof": [
    { file: "aussen.jpg", slot: "aussen", caption: "Eingang" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Zimmer" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Gelände" },
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
