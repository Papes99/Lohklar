import { HOUSES } from "./katalog-houses.ts";
import { STECKBRIEFE } from "./steckbrief-seed.ts";
import { finishClinic, toDraft } from "./katalog.ts";
import { applyPhotoPolicy } from "./photo-captions.ts";
import type { Clinic, Indication } from "./types.ts";

export const CLINIC_SEED: Clinic[] = HOUSES.map((spec) => {
  const steckbrief = STECKBRIEFE[spec.id];
  if (!steckbrief) {
    throw new Error(`Steckbrief fehlt für ${spec.id}`);
  }
  const draft = toDraft(spec);
  return finishClinic({ ...draft, photos: applyPhotoPolicy(spec.id, draft.photos) }, steckbrief);
});

export const INDICATION_SET = new Set<Indication>(["sucht", "psychosomatik", "dual"]);
