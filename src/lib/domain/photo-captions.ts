import type { ClinicPhoto, PhotoSlot } from "./types.ts";

/** Max. 1 Titel + 4 Galerie. */
export const MAX_CLINIC_PHOTOS = 5;

/**
 * Captions beschreiben den sichtbaren Bildinhalt — nicht den Kliniknamen,
 * nicht „Foto 1“, nichts, was nicht im Bild steht.
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
