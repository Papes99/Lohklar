import type { PhotoSlot } from "./types.ts";

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

export function capPhotos<T>(photos: T[]): T[] {
  return photos.slice(0, MAX_CLINIC_PHOTOS);
}
