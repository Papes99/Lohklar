import { PHOTO_SLOTS, type ClinicPhoto } from "./types.ts";

export const USAGE_KINDS = [
  "clinic_view",
  "wait_shown",
  "wait_rechenweg",
  "regional_search",
  "session",
  "document_export",
] as const;

export type UsageKind = (typeof USAGE_KINDS)[number];

export type DashboardPeriod = "woche" | "monat" | "jahr";

export const DASHBOARD_PERIODS: { id: DashboardPeriod; label: string }[] = [
  { id: "woche", label: "Woche" },
  { id: "monat", label: "Monat" },
  { id: "jahr", label: "Jahr" },
];

const WEEKDAY: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export type UsagePayload = {
  kind: UsageKind;
  clinicId?: string | null;
  meta?: string;
};

const pending: UsagePayload[] = [];
let subscribers = 0;

export function isUsageKind(value: string): value is UsageKind {
  return (USAGE_KINDS as readonly string[]).includes(value);
}

export function berlinParts(now: Date): {
  year: number;
  month: number;
  day: number;
  weekday: number;
} {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    weekday: WEEKDAY[get("weekday")] ?? 1,
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** Instant of 00:00 Europe/Berlin on the given calendar day. */
export function berlinMidnight(year: number, month: number, day: number): Date {
  const utcGuess = Date.UTC(year, month - 1, day, 0, 0, 0);
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const asUtc = (ms: number) => {
    const parts = dtf.formatToParts(new Date(ms));
    const get = (type: string) => Number(parts.find((part) => part.type === type)?.value);
    return Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  };
  return new Date(utcGuess - (asUtc(utcGuess) - utcGuess));
}

export function periodRange(
  period: DashboardPeriod,
  now = new Date(),
): { from: Date; to: Date; fromYmd: string } {
  const parts = berlinParts(now);
  let year = parts.year;
  let month = parts.month;
  let day = parts.day;
  if (period === "jahr") {
    month = 1;
    day = 1;
  } else if (period === "monat") {
    day = 1;
  } else {
    const start = berlinMidnight(parts.year, parts.month, parts.day);
    const delta = (parts.weekday + 6) % 7;
    start.setUTCDate(start.getUTCDate() - delta);
    const shifted = berlinParts(start);
    year = shifted.year;
    month = shifted.month;
    day = shifted.day;
  }
  const from = berlinMidnight(year, month, day);
  return {
    from,
    to: now,
    fromYmd: `${year}-${pad(month)}-${pad(day)}`,
  };
}

export function catalogPhotoStats(
  clinics: { photos: ClinicPhoto[] }[],
): { withImage: number; placeholder: number } {
  let withImage = 0;
  let placeholder = 0;
  for (const clinic of clinics) {
    for (const slot of PHOTO_SLOTS) {
      const matches = clinic.photos.filter((photo) => photo.slot === slot.id);
      if (slot.required) {
        if (matches[0]?.imagePath) withImage += 1;
        else placeholder += 1;
        continue;
      }
      const existing = matches.filter((photo) => photo.imagePath).slice(0, slot.max);
      withImage += existing.length;
    }
  }
  return { withImage, placeholder };
}

export function sanitizeUsage(input: {
  kind: string;
  clinicId?: string | null;
  meta?: string;
}): UsagePayload | null {
  if (!isUsageKind(input.kind)) return null;
  const clinicId =
    typeof input.clinicId === "string" && /^ck-[a-z0-9-]+$/i.test(input.clinicId)
      ? input.clinicId
      : null;
  const meta = (input.meta ?? "").trim();
  if (meta.length > 40 || /[^a-z0-9|_+,.-]/i.test(meta)) {
    return { kind: input.kind, clinicId, meta: "" };
  }
  return { kind: input.kind, clinicId, meta };
}

function oncePerSession(key: string): boolean {
  if (typeof window === "undefined") return true;
  try {
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, "1");
    return true;
  } catch {
    return true;
  }
}

export function emitUsage(kind: UsageKind, extra: { clinicId?: string; meta?: string } = {}): void {
  if (typeof window === "undefined") return;
  if (kind === "wait_shown" || kind === "clinic_view") {
    if (!oncePerSession(`lohklar.usage.${kind}.${extra.clinicId ?? "_"}`)) return;
  }
  const detail: UsagePayload = {
    kind,
    clinicId: extra.clinicId,
    meta: extra.meta,
  };
  window.dispatchEvent(new CustomEvent("lohklar-usage", { detail }));
  if (subscribers === 0) pending.push(detail);
}

export function takePendingUsage(): UsagePayload[] {
  return pending.splice(0);
}

export function markUsageSubscribed(active: boolean): void {
  subscribers += active ? 1 : -1;
  if (subscribers < 0) subscribers = 0;
}

export function emitSessionUsage(): void {
  if (typeof window === "undefined") return;
  if (!oncePerSession("lohklar.usage.session")) return;
  let returning = false;
  try {
    returning = localStorage.getItem("lohklar.seen") === "1";
    localStorage.setItem("lohklar.seen", "1");
  } catch {
    returning = false;
  }
  const viewport = window.innerWidth < 768 ? "mobile" : "desktop";
  emitUsage("session", { meta: `${viewport}|${returning ? "returning" : "new"}` });
}
