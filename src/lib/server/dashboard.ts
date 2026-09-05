import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { CLINIC_SEED } from "@/lib/domain/clinic-seed";
import {
  CATALOG_LOG,
  catalogLogInRange,
  housesAt,
  type CatalogLogEntry,
} from "@/lib/domain/catalog-log";
import {
  berlinTodayYmd,
  berlinYmd,
  buildSeries,
  calendarMonthRange,
  dashRange,
  daysInBerlinMonth,
  formatYmd,
  parseYmd,
  type DashView,
  type SeriesPoint,
} from "@/lib/domain/usage";

export type DashAction = {
  at: string;
  ymd: string;
  label: string;
};

export type DashCalendarDay = {
  ymd: string;
  day: number;
  usage: boolean;
  update: boolean;
};

export type DashboardBoard = {
  view: DashView;
  date: string;
  fromYmd: string;
  usersTotal: number;
  usersActive: number;
  usersNew: number;
  me: number;
  houses: number;
  updates: number;
  series: SeriesPoint[];
  calendar: { year: number; month: number; days: DashCalendarDay[] };
  actions: DashAction[];
  log: CatalogLogEntry[];
};

function n(value: unknown): number {
  return Number(value ?? 0);
}

function isView(value: unknown): value is DashView {
  return value === "day" || value === "month" || value === "year";
}

async function optional<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch {
    return fallback;
  }
}

function actionLabel(kind: string, clinicName: string | null): string {
  if (kind === "clinic_view") return clinicName ? `Steckbrief ${clinicName}` : "Steckbrief";
  if (kind === "wait_shown") return "Wartezeit";
  if (kind === "wait_rechenweg") return "Rechenweg";
  if (kind === "document_export") return "Export";
  if (kind === "regional_search") return "Suche";
  if (kind === "session") return "Sitzung";
  if (kind === "run") return "Klar-o-Mat";
  if (kind === "document") return "Dokument";
  if (kind === "lohlotse") return "Lohlotse";
  return "Aktion";
}

const NAMES = new Map(CLINIC_SEED.map((clinic) => [clinic.id, clinic.shortName]));

export const getDashboard = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { view?: string; date?: string } | undefined) => {
    const view = isView(input?.view) ? input.view : ("month" as const);
    const date =
      typeof input?.date === "string" && parseYmd(input.date) ? input.date : berlinTodayYmd();
    return { view, date };
  })
  .handler(async ({ context, data }): Promise<DashboardBoard> => {
    const sql = await getSql();
    const userId = context.userId;
    const range = dashRange(data.view, data.date);
    const cal = calendarMonthRange(data.date);
    const from = range.from.toISOString();
    const to = range.to.toISOString();
    const calFrom = cal.from.toISOString();
    const calTo = cal.to.toISOString();
    const spanFrom = range.from <= cal.from ? range.from : cal.from;
    const spanTo = range.to >= cal.to ? range.to : cal.to;

    const people = await optional(
      () =>
        sql<{ users_total: number; users_new: number }>`
      select
        (select count(*)::int from "user" where "createdAt" < ${to}) as users_total,
        (select count(*)::int from "user"
          where "createdAt" >= ${from} and "createdAt" < ${to}) as users_new
    `,
      [],
    );

    const active = await optional(
      () =>
        sql<{ n: number }>`
      select count(distinct uid)::int as n from (
        select user_id as uid from usage_events
          where created_at >= ${from} and created_at < ${to}
        union
        select user_id from runs
          where created_at >= ${from} and created_at < ${to}
      ) s
    `,
      [],
    );

    const mine = await optional(
      () =>
        sql<{ n: number }>`
      select (
        (select count(*)::int from usage_events
          where user_id = ${userId} and created_at >= ${from} and created_at < ${to})
        +
        (select count(*)::int from runs
          where user_id = ${userId} and created_at >= ${from} and created_at < ${to})
      )::int as n
    `,
      [],
    );

    const spanFromIso = spanFrom.toISOString();
    const spanToIso = spanTo.toISOString();

    const events = await optional(
      () =>
        sql<{ created_at: string | Date; user_id: string }>`
      select created_at, user_id from usage_events
        where created_at >= ${spanFromIso} and created_at < ${spanToIso}
      union all
      select created_at, user_id from runs
        where created_at >= ${spanFromIso} and created_at < ${spanToIso}
    `,
      [],
    );

    const actionRows = await optional(
      () =>
        sql<{ created_at: string | Date; kind: string; clinic_id: string | null }>`
      select created_at, kind, clinic_id from usage_events
        where user_id = ${userId} and created_at >= ${from} and created_at < ${to}
      union all
      select created_at, 'run' as kind, null::text as clinic_id from runs
        where user_id = ${userId} and created_at >= ${from} and created_at < ${to}
      union all
      select updated_at as created_at, 'document' as kind, null::text as clinic_id from result_documents
        where user_id = ${userId} and updated_at >= ${from} and updated_at < ${to}
      union all
      select created_at, 'lohlotse' as kind, null::text as clinic_id from lohlotse_messages
        where user_id = ${userId} and created_at >= ${from} and created_at < ${to}
    `,
      [],
    );

    const parsedEvents = events.map((row) => ({
      at: new Date(row.created_at),
      userId: row.user_id,
    }));
    const inRange = parsedEvents.filter(
      (event) => event.at >= range.from && event.at < range.to,
    );
    const houseLog = catalogLogInRange(range.from, range.to, CATALOG_LOG);
    const series = buildSeries(
      range.view,
      range.dateYmd,
      inRange.map((event) => ({ at: event.at, mine: event.userId === userId })),
      houseLog.filter((entry) => entry.kind === "aufgenommen").map((entry) => new Date(entry.at)),
    );

    const usageDays = new Set<string>();
    const updateDays = new Set<string>();
    for (const event of parsedEvents) {
      if (event.at >= cal.from && event.at < cal.to) usageDays.add(berlinYmd(event.at));
    }
    for (const entry of catalogLogInRange(cal.from, cal.to, CATALOG_LOG)) {
      updateDays.add(entry.ymd);
    }
    const dayCount = daysInBerlinMonth(cal.year, cal.month);
    const days: DashCalendarDay[] = Array.from({ length: dayCount }, (_, index) => {
      const day = index + 1;
      const ymd = formatYmd(cal.year, cal.month, day);
      return {
        ymd,
        day,
        usage: usageDays.has(ymd),
        update: updateDays.has(ymd),
      };
    });

    const actions: DashAction[] = actionRows
      .map((row) => {
        const at = new Date(row.created_at);
        return {
          at: at.toISOString(),
          ymd: berlinYmd(at),
          label: actionLabel(row.kind, row.clinic_id ? (NAMES.get(row.clinic_id) ?? null) : null),
          sort: at.getTime(),
        };
      })
      .sort((a, b) => b.sort - a.sort)
      .slice(0, 5)
      .map(({ at, ymd, label }) => ({ at, ymd, label }));

    return {
      view: range.view,
      date: range.dateYmd,
      fromYmd: range.fromYmd,
      usersTotal: n(people[0]?.users_total),
      usersActive: n(active[0]?.n),
      usersNew: n(people[0]?.users_new),
      me: n(mine[0]?.n),
      houses: housesAt(range.to, CATALOG_LOG),
      updates: houseLog.length,
      series,
      calendar: { year: cal.year, month: cal.month, days },
      actions,
      log: houseLog,
    };
  });
