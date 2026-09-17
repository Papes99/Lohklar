import type { ClinicPhoto, PhotoSlot } from "./types.ts";

/** Max. 1 Titel + 4 Galerie. */
export const MAX_CLINIC_PHOTOS = 5;

type PhotoOverride = {
  file: string;
  slot: PhotoSlot;
  caption: string;
  /** Offizielle Klinik-URL, falls die Datei noch nicht im Repo liegt. */
  href?: string;
};

/**
 * Captions beschreiben den sichtbaren Bildinhalt.
 * Nur Motive, die belegt und vom Titel verschieden sind.
 */
export const PHOTO_CAPTION_OVERRIDES: Partial<Record<string, PhotoOverride[]>> = {
  "ck-oelmuehle": [
    {
      file: "aussen.jpg",
      slot: "aussen",
      caption: "Eingang Neubau zur Straße, Klinikschriftzug über der Glastür",
    },
    {
      file: "zimmer.jpg",
      slot: "zimmer_bad",
      caption: "Einzelzimmer mit Fensterfront, Bett und zwei Stühlen",
      href: "https://www.fachklinik-alte-oelmuehle.de/fileadmin/_processed_/a/c/csm_Zimmer2_67c44c308e.jpg",
    },
    {
      file: "bad.jpg",
      slot: "zimmer_bad",
      caption: "Nasszelle mit Waschbecken, Spiegel und Handtuchtrockner",
      href: "https://www.fachklinik-alte-oelmuehle.de/fileadmin/_processed_/1/f/csm_Badezimmer_bearbeitet_8c38a644de.jpg",
    },
    {
      file: "adaption.jpg",
      slot: "umgebung",
      caption: "Helles mehrstöckiges Haus hinter Bäumen, Eingangstür",
      href: "https://www.fachklinik-alte-oelmuehle.de/fileadmin/_processed_/c/c/csm_Adaptionshaus_Bearbeitet_409d344792.jpg",
    },
    {
      file: "blaues-haus.jpg",
      slot: "besonderheit",
      caption: "Blaues Haus mit Glastür und Pflasterzufahrt",
      href: "https://www.fachklinik-alte-oelmuehle.de/fileadmin/_processed_/e/0/csm_Blaues_Haus_Sonne1_cfafe9e970.jpg",
    },
  ],
  "ck-auwald": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Außenanlagen am Haus" },
  ],
  "ck-bergstrasse": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Außenanlagen am Haus" },
  ],
  "ck-bergzabern": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Außenanlagen am Haus" },
  ],
  "ck-borkum": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Außenanlagen am Haus" },
  ],
  "ck-burgklinik": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Patientenzimmer" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Weiteres Motiv vom Gelände" },
  ],
  "ck-eusserthal": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Außenanlagen am Haus" },
  ],
  "ck-fehmarn": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Außenanlagen am Haus" },
  ],
  "ck-flechtingen": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Außenanlagen am Haus" },
  ],
  "ck-haffkueste": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Außenanlagen am Haus" },
  ],
  "ck-kieferngarten": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Patientenzimmer" },
  ],
  "ck-kompass-hof": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Patientenzimmer" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Außenanlagen am Haus" },
  ],
  "ck-landelin": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Weiteres Motiv vom Gelände" },
  ],
  "ck-lichtblick": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Außenanlagen am Haus" },
  ],
  "ck-muenchwies": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Außenanlagen am Haus" },
  ],
  "ck-nordlicht": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Außenanlagen am Haus" },
    { file: "speiseraum.jpg", slot: "speiseraum", caption: "Speiseraum" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Weiteres Motiv vom Gelände" },
  ],
  "ck-prop-laim": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Patientenzimmer" },
  ],
  "ck-rothaar": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Weiteres Motiv vom Gelände" },
  ],
  "ck-seehof": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Patientenzimmer" },
    { file: "besonderheit.jpg", slot: "besonderheit", caption: "Weiteres Motiv vom Gelände" },
  ],
  "ck-suedergellersen": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Patientenzimmer" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Außenanlagen am Haus" },
  ],
  "ck-waren": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Außenanlagen am Haus" },
  ],
  "ck-weserblick": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "umgebung.jpg", slot: "umgebung", caption: "Außenanlagen am Haus" },
  ],
  "ck-wolkersdorf": [
    { file: "aussen.jpg", slot: "aussen", caption: "Gebäude von der Straße" },
    { file: "zimmer.jpg", slot: "zimmer_bad", caption: "Patientenzimmer" },
  ],
};

const SLOT_CAPTION: Record<PhotoSlot, string> = {
  aussen: "Gebäude von der Straße",
  zimmer_bad: "Patientenzimmer mit Nasszelle",
  umgebung: "Außenanlagen am Haus",
  speiseraum: "Speiseraum",
  besonderheit: "Weiteres Motiv vom Gelände",
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
    const generic =
      !photo.caption ||
      photo.caption === "Außenansicht" ||
      photo.caption.startsWith("Außenansicht der") ||
      photo.caption === "Zimmer / Bad" ||
      photo.caption === "Umgebung / Lage" ||
      photo.caption === "Speiseraum / Verpflegung" ||
      photo.caption === "Besonderheit";
    unique.push({
      ...photo,
      caption: generic ? SLOT_CAPTION[photo.slot] : photo.caption,
      alt: generic ? SLOT_CAPTION[photo.slot] : photo.alt,
    });
  }
  if (unique.length) return capPhotos(unique);
  return capPhotos(photos);
}
