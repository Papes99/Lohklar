import { HOUSES } from "./katalog-houses.ts";
import { STECKBRIEFE } from "./steckbrief-seed.ts";
import { finishClinic, toDraft } from "./katalog.ts";
import type { Clinic, Indication } from "./types.ts";

export const CLINIC_SEED: Clinic[] = HOUSES.map((spec) => {
  const steckbrief = STECKBRIEFE[spec.id];
  if (!steckbrief) {
    throw new Error(`Steckbrief fehlt für ${spec.id}`);
  }
  return finishClinic(toDraft(spec), steckbrief);
});

export const INDICATION_SET = new Set<Indication>(["sucht", "psychosomatik", "dual"]);
