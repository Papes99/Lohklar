import { ChevronLeft, ChevronRight } from "lucide-react";
import { DashCalendar } from "@/components/dashboard/dash-calendar";
import { DashChart } from "@/components/dashboard/dash-chart";
import {
  filterCatalogLog,
  formatCatalogLogLine,
  type CatalogLogFilter,
} from "@/lib/domain/catalog-log";
import {
  DASH_VIEWS,
  addBerlinMonths,
  daysInBerlinMonth,
  formatYmd,
  parseYmd,
  type DashView,
} from "@/lib/domain/usage";
import type { DashboardBoard } from "@/lib/server/dashboard";
import { cn } from "@/lib/utils";

export type DashSearch = {
  view: DashView;
  date: string;
  log?: CatalogLogFilter;
};

const LOG_FILTERS: { id: CatalogLogFilter; label: string }[] = [
  { id: "alle", label: "Alle" },
  { id: "neu", label: "Neu" },
  { id: "geaendert", label: "Geändert" },
];

export function DashBoardSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true">
      <div className="h-10 w-56 animate-pulse rounded-[var(--radius-md)] bg-bg-subtle" />
      <div className="h-36 animate-pulse rounded-[var(--radius-xl)] bg-bg-subtle" />
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="h-80 animate-pulse rounded-[var(--radius-xl)] bg-bg-subtle lg:col-span-2" />
        <div className="h-80 animate-pulse rounded-[var(--radius-xl)] bg-bg-subtle" />
      </div>
    </div>
  );
}

export function DashBoard({
  data,
  search,
  onSearch,
}: {
  data: DashboardBoard;
  search: DashSearch;
  onSearch: (next: DashSearch) => void;
}) {
  const logFilter = search.log ?? "alle";
  const log = filterCatalogLog(data.log, logFilter);

  function setView(view: DashView) {
    onSearch({ ...search, view });
  }

  function setDate(date: string) {
    onSearch({ ...search, date });
  }

  function heading(): string {
    const parsed = parseYmd(search.date);
    if (!parsed) return search.date;
    if (search.view === "year") return String(parsed.year);
    const when = new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day));
    if (search.view === "month") {
      return when.toLocaleDateString("de-DE", { month: "long", year: "numeric", timeZone: "UTC" });
    }
    return when.toLocaleDateString("de-DE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  function onChartSelect(key: string) {
    if (search.view === "month" && /^\d{4}-\d{2}-\d{2}$/.test(key)) {
      onSearch({ ...search, view: "day", date: key });
      return;
    }
    if (search.view === "year" && /^\d{4}-\d{2}$/.test(key)) {
      onSearch({ ...search, view: "month", date: `${key}-01` });
    }
  }

  function shiftMonth(delta: number) {
    const parsed = parseYmd(search.date);
    if (!parsed) return;
    const next = addBerlinMonths(parsed.year, parsed.month, delta);
    const max = daysInBerlinMonth(next.year, next.month);
    setDate(formatYmd(next.year, next.month, Math.min(parsed.day, max)));
  }

  function shiftPeriod(delta: number) {
    const parsed = parseYmd(search.date);
    if (!parsed) return;
    if (search.view === "year") {
      setDate(formatYmd(parsed.year + delta, parsed.month, parsed.day));
      return;
    }
    if (search.view === "month") {
      shiftMonth(delta);
      return;
    }
    const utc = Date.UTC(parsed.year, parsed.month - 1, parsed.day + delta);
    const next = new Date(utc);
    setDate(formatYmd(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate()));
  }

  const seriesHint =
    search.view === "day"
      ? "Stunden im Tag."
      : search.view === "month"
        ? "Tage. Tippen öffnet den Tag."
        : "Monate. Tippen öffnet den Monat.";

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">Dashboard</p>
          <h1 className="mt-1 font-display text-3xl tracking-tight sm:text-4xl">{heading()}</h1>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">
            {data.admin
              ? "Vorgänge und Katalog, Europe/Berlin. Keine Klientennamen."
              : "Ihre Schritte und Katalog, Europe/Berlin. Keine Klientennamen."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div
            role="tablist"
            aria-label="Zeitraum"
            className="flex rounded-[var(--radius-lg)] bg-bg-subtle p-1"
          >
            {DASH_VIEWS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={search.view === item.id}
                className={cn(
                  "min-h-11 rounded-[var(--radius-md)] px-3 text-sm font-medium",
                  search.view === item.id
                    ? "bg-surface text-ink shadow-[var(--shadow-border)]"
                    : "text-ink-muted hover:text-ink",
                )}
                onClick={() => setView(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="grid size-11 place-items-center rounded-[var(--radius-md)] text-ink-muted hover:bg-bg-subtle hover:text-ink"
              aria-label="Vorheriger Zeitraum"
              onClick={() => shiftPeriod(-1)}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <label className="hidden min-h-11 items-center sm:flex">
              <span className="sr-only">Datum</span>
              <input
                type="date"
                value={search.date}
                onChange={(event) => {
                  if (event.target.value) setDate(event.target.value);
                }}
                className="h-11 rounded-[var(--radius-md)] bg-transparent px-2 text-sm tabular-nums text-ink"
              />
            </label>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-[var(--radius-md)] text-ink-muted hover:bg-bg-subtle hover:text-ink"
              aria-label="Nächster Zeitraum"
              onClick={() => shiftPeriod(1)}
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <section
        aria-label="Kennzahlen"
        className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6"
      >
        <div
          className={cn(
            "grid gap-8 lg:gap-0",
            data.admin
              ? "lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]"
              : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]",
          )}
        >
          {data.admin ? (
            <div className="lg:pr-8">
              <h2 className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
                Nutzung
              </h2>
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
                <Stat label="Konten" value={data.usersTotal} />
                <Stat label="Aktiv" value={data.usersActive} />
                <Stat label="Neu" value={data.usersNew} />
                <Stat label="Vorgänge" value={data.me} />
              </dl>
            </div>
          ) : (
            <div className="lg:pr-8">
              <h2 className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
                Ihre Arbeit
              </h2>
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5">
                <Stat label="Vorgänge" value={data.me} />
              </dl>
            </div>
          )}
          <div className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <h2 className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
              Katalog
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5">
              <Stat label="Häuser" value={data.houses} />
              <Stat label="Änderungen" value={data.updates} />
            </dl>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        <section
          aria-labelledby="dash-series"
          className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)] lg:col-span-2"
        >
          <h2 id="dash-series" className="font-display text-xl tracking-tight">
            Verlauf
          </h2>
          <p className="mt-1 text-sm text-ink-muted">{seriesHint}</p>
          <div className="mt-4 h-64 sm:h-72">
            <DashChart
              view={search.view}
              series={data.series}
              showAll={data.admin}
              onSelect={onChartSelect}
            />
          </div>
        </section>
        <section
          aria-labelledby="dash-cal"
          className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]"
        >
          <h2 id="dash-cal" className="sr-only">
            Kalender
          </h2>
          <DashCalendar
            year={data.calendar.year}
            month={data.calendar.month}
            days={data.calendar.days}
            selected={search.date}
            view={search.view}
            onSelectDay={(ymd) => onSearch({ ...search, view: "day", date: ymd })}
            onShiftMonth={shiftMonth}
          />
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section
          aria-labelledby="dash-actions"
          className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]"
        >
          <h2 id="dash-actions" className="font-display text-xl tracking-tight">
            Eigene Schritte
          </h2>
          {data.actions.length === 0 ? (
            <p className="mt-3 text-sm text-ink-muted">Keine Vorgänge in diesem Zeitraum.</p>
          ) : (
            <ol className="mt-4 divide-y divide-line">
              {data.actions.map((item) => (
                <li key={`${item.at}-${item.label}`} className="flex items-baseline gap-3 py-2.5 text-sm">
                  <span className="w-24 shrink-0 tabular-nums text-ink-muted">{ymdDe(item.ymd)}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ol>
          )}
        </section>
        <section
          aria-labelledby="dash-log"
          className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="dash-log" className="font-display text-xl tracking-tight">
              Katalog-Log
            </h2>
            <div role="tablist" aria-label="Log-Filter" className="flex rounded-[var(--radius-md)] bg-bg-subtle p-1">
              {LOG_FILTERS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={logFilter === item.id}
                  className={cn(
                    "min-h-11 rounded-[var(--radius-sm)] px-3 text-sm font-medium",
                    logFilter === item.id
                      ? "bg-surface text-ink shadow-[var(--shadow-border)]"
                      : "text-ink-muted hover:text-ink",
                  )}
                  onClick={() =>
                    onSearch({ ...search, log: item.id === "alle" ? undefined : item.id })
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          {log.length === 0 ? (
            <p className="mt-3 text-sm text-ink-muted">Keine Änderungen in diesem Zeitraum.</p>
          ) : (
            <ol className="mt-4 max-h-80 divide-y divide-line overflow-y-auto">
              {log.map((entry) => (
                <li
                  key={`${entry.at}-${entry.clinicId}-${entry.kind}`}
                  className="py-2.5 text-sm tabular-nums"
                >
                  {formatCatalogLogLine(entry)}
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">{label}</dt>
      <dd className="mt-1.5 font-display text-3xl tabular-nums tracking-tight sm:text-4xl">{value}</dd>
    </div>
  );
}

function ymdDe(ymd: string): string {
  const [year, month, day] = ymd.split("-");
  if (!year || !month || !day) return ymd;
  return `${day}.${month}.${year}`;
}
