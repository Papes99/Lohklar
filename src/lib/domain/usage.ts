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

export type DashView = "day" | "month" | "year";

export const DASH_VIEWS: { id: DashView; label: string }[] = [
  { id: "day", label: "Tag" },
  { id: "month", label: "Monat" },
  { id: "year", label: "Jahr" },
];

export const MONTH_LABELS_DE = [
  "Jan",
  "Feb",
  "Mär",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dez",
] as const;

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
  hour: number;
} {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    weekday: WEEKDAY[get("weekday")] ?? 1,
    hour: Number(get("hour")),
  };
}

export function pad2(n: number): string {
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

export function formatYmd(year: number, month: number, day: number): string {
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

export function parseYmd(ymd: string): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return { year, month, day };
}

export function berlinTodayYmd(now = new Date()): string {
  const parts = berlinParts(now);
  return formatYmd(parts.year, parts.month, parts.day);
}

export function berlinYmd(at: Date): string {
  const parts = berlinParts(at);
  return formatYmd(parts.year, parts.month, parts.day);
}

export function addBerlinMonths(year: number, month: number, delta: number): { year: number; month: number } {
  const index = year * 12 + (month - 1) + delta;
  const nextYear = Math.floor(index / 12);
  const nextMonth = (index % 12) + 1;
  return { year: nextYear, month: nextMonth };
}

export function daysInBerlinMonth(year: number, month: number): number {
  const start = berlinMidnight(year, month, 1);
  const next = month === 12 ? berlinMidnight(year + 1, 1, 1) : berlinMidnight(year, month + 1, 1);
  return Math.round((next.getTime() - start.getTime()) / 86_400_000);
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
    fromYmd: formatYmd(year, month, day),
  };
}

export type DashRange = {
  view: DashView;
  dateYmd: string;
  from: Date;
  to: Date;
  fromYmd: string;
};

export function dashRange(view: DashView, dateYmd: string, now = new Date()): DashRange {
  const parsed = parseYmd(dateYmd) ?? parseYmd(berlinTodayYmd(now))!;
  let from: Date;
  let to: Date;
  if (view === "day") {
    from = berlinMidnight(parsed.year, parsed.month, parsed.day);
    const probe = new Date(from.getTime() + 36 * 3_600_000);
    const next = berlinParts(probe);
    to = berlinMidnight(next.year, next.month, next.day);
  } else if (view === "month") {
    from = berlinMidnight(parsed.year, parsed.month, 1);
    const next = addBerlinMonths(parsed.year, parsed.month, 1);
    to = berlinMidnight(next.year, next.month, 1);
  } else {
    from = berlinMidnight(parsed.year, 1, 1);
    to = berlinMidnight(parsed.year + 1, 1, 1);
  }
  const fromParts = berlinParts(from);
  return {
    view,
    dateYmd: formatYmd(parsed.year, parsed.month, parsed.day),
    from,
    to,
    fromYmd: formatYmd(fromParts.year, fromParts.month, fromParts.day),
  };
}

export function calendarMonthRange(dateYmd: string): { from: Date; to: Date; year: number; month: number } {
  const parsed = parseYmd(dateYmd) ?? parseYmd(berlinTodayYmd())!;
  const from = berlinMidnight(parsed.year, parsed.month, 1);
  const next = addBerlinMonths(parsed.year, parsed.month, 1);
  return {
    from,
    to: berlinMidnight(next.year, next.month, 1),
    year: parsed.year,
    month: parsed.month,
  };
}

export type SeriesPoint = {
  key: string;
  label: string;
  all: number;
  me: number;
  houses: number;
};

export function emptySeries(view: DashView, dateYmd: string): SeriesPoint[] {
  const parsed = parseYmd(dateYmd);
  if (!parsed) return [];
  if (view === "day") {
    return Array.from({ length: 24 }, (_, hour) => ({
      key: pad2(hour),
      label: String(hour),
      all: 0,
      me: 0,
      houses: 0,
    }));
  }
  if (view === "month") {
    const count = daysInBerlinMonth(parsed.year, parsed.month);
    return Array.from({ length: count }, (_, index) => {
      const day = index + 1;
      return {
        key: formatYmd(parsed.year, parsed.month, day),
        label: String(day),
        all: 0,
        me: 0,
        houses: 0,
      };
    });
  }
  return MONTH_LABELS_DE.map((label, index) => ({
    key: `${parsed.year}-${pad2(index + 1)}`,
    label,
    all: 0,
    me: 0,
    houses: 0,
  }));
}

export function eventBucketKey(view: DashView, at: Date): string {
  const parts = berlinParts(at);
  if (view === "day") return pad2(parts.hour);
  if (view === "month") return formatYmd(parts.year, parts.month, parts.day);
  return `${parts.year}-${pad2(parts.month)}`;
}

export function buildSeries(
  view: DashView,
  dateYmd: string,
  events: { at: Date; mine: boolean }[],
  houseAts: Date[],
): SeriesPoint[] {
  const points = emptySeries(view, dateYmd);
  const index = new Map(points.map((point, i) => [point.key, i]));
  for (const event of events) {
    const slot = index.get(eventBucketKey(view, event.at));
    if (slot == null) continue;
    const point = points[slot]!;
    point.all += 1;
    if (event.mine) point.me += 1;
  }
  for (const at of houseAts) {
    const slot = index.get(eventBucketKey(view, at));
    if (slot == null) continue;
    points[slot]!.houses += 1;
  }
  return points;
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
