import type { ClinicPhoto, PhotoSlot } from "./types.ts";

/** Max. 1 Titel + 4 Galerie. */
export const MAX_CLINIC_PHOTOS = 5;

/**
 * Captions beschreiben den sichtbaren Bildinhalt.
 * Nur Dateien, die im Repo wirklich ein anderes Motiv sind (kein Duplikat der aussen.jpg).
 */
export const PHOTO_CAPTION_OVERRIDES: Partial<
  Record<string, { file: string; slot: PhotoSlot; caption: string }[]>
> = {
  "ck-oelmuehle": [
    {
      file: "aussen.jpg",
      slot: "aussen",
      caption: "Eingang Neubau zur Straße, Klinikschriftzug über der Glastür",
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
        imagePath: `/clinics/${clinicId}/${item.file}`,
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
