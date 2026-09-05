import { HOUSES } from "./katalog-houses.ts";
import { buildSteckbrief } from "./katalog.ts";
import type { OfficialSteckbrief } from "./types.ts";

export const STECKBRIEFE: Record<string, OfficialSteckbrief> = Object.fromEntries(
  HOUSES.map((spec) => [spec.id, buildSteckbrief(spec)]),
);
