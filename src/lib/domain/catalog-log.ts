import { HOUSES } from "./katalog-houses.ts";

export const CATALOG_CHANGE_KINDS = ["aufgenommen", "aktualisiert", "entfernt"] as const;
export type CatalogChangeKind = (typeof CATALOG_CHANGE_KINDS)[number];

export type CatalogLogFilter = "alle" | "neu" | "geaendert";

export type CatalogLogEntry = {
  at: string;
  ymd: string;
  clinicId: string;
  clinicName: string;
  kind: CatalogChangeKind;
};

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** Per-house official catalog log. Core 50: 2026-09-01. Erweiterung: 2026-09-05. */
export const CATALOG_LOG: CatalogLogEntry[] = HOUSES.map((house) => {
  const isNew = house.sortOrder > 50;
  const ymd = isNew ? "2026-09-05" : "2026-09-01";
  const minute = isNew ? house.sortOrder - 51 : Math.max(0, house.sortOrder - 1);
  const hour = 8 + Math.floor(minute / 60);
  const min = minute % 60;
  return {
    at: `${ymd}T${pad(hour)}:${pad(min)}:00+02:00`,
    ymd,
    clinicId: house.id,
    clinicName: house.shortName,
    kind: "aufgenommen" as const,
  };
});

export function catalogLogInRange(
  from: Date,
  to: Date,
  log: CatalogLogEntry[] = CATALOG_LOG,
): CatalogLogEntry[] {
  const start = from.getTime();
  const end = to.getTime();
  return log
    .filter((entry) => {
      const time = new Date(entry.at).getTime();
      return time >= start && time < end;
    })
    .sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : a.clinicName.localeCompare(b.clinicName, "de")));
}

export function housesAt(at: Date, log: CatalogLogEntry[] = CATALOG_LOG): number {
  const time = at.getTime();
  let count = 0;
  for (const entry of log) {
    if (new Date(entry.at).getTime() >= time) continue;
    if (entry.kind === "aufgenommen") count += 1;
    if (entry.kind === "entfernt") count -= 1;
  }
  return count;
}

export function filterCatalogLog(
  entries: CatalogLogEntry[],
  filter: CatalogLogFilter,
): CatalogLogEntry[] {
  if (filter === "neu") return entries.filter((entry) => entry.kind === "aufgenommen");
  if (filter === "geaendert") {
    return entries.filter((entry) => entry.kind === "aktualisiert" || entry.kind === "entfernt");
  }
  return entries;
}

export function formatCatalogLogLine(entry: CatalogLogEntry): string {
  const [year, month, day] = entry.ymd.split("-");
  return `${day}.${month}.${year}  ·  ${entry.clinicName}  ·  ${entry.kind}`;
}

export function isCatalogLogFilter(value: unknown): value is CatalogLogFilter {
  return value === "alle" || value === "neu" || value === "geaendert";
}
