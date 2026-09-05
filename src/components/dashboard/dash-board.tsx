import { Wordmark } from "@/components/brand/wordmark";
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

  const cards = [
    { label: "User", value: data.usersTotal },
    { label: "Aktiv", value: data.usersActive },
    { label: "Neu", value: data.usersNew },
    { label: "Ich", value: data.me },
    { label: "Reha-Häuser", value: data.houses },
    { label: "Updates", value: data.updates },
  ];

  return (
    <div className="dash flex min-h-0 flex-1 flex-col gap-3 lg:h-full">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <Wordmark size="sm" to="/app" stacked={false} className="hidden lg:inline-flex" />
        <div className="flex flex-wrap items-center gap-3">
          <div role="tablist" aria-label="Zeitraum" className="flex items-center gap-1">
            {DASH_VIEWS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={search.view === item.id}
                className={cn(
                  "min-h-11 px-3 text-sm",
                  search.view === item.id
                    ? "border-b border-primary font-medium text-primary"
                    : "text-ink-muted hover:text-ink",
                )}
                onClick={() => setView(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <label className="flex min-h-11 items-center gap-2 text-sm text-ink-muted">
            <span className="sr-only">Datum</span>
            <span className="hidden tabular-nums sm:inline">{heading()}</span>
            <input
              type="date"
              value={search.date}
              onChange={(event) => {
                if (event.target.value) setDate(event.target.value);
              }}
              className="h-11 rounded-[var(--radius-sm)] bg-transparent px-2 text-sm tabular-nums text-ink"
            />
          </label>
        </div>
      </header>

      <section aria-label="Kennzahlen" className="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
        {cards.map((card) => (
          <article
            key={card.label}
            className="flex h-20 flex-col justify-between rounded-[var(--radius-md)] border border-line bg-white px-3 py-2.5"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-muted">
              {card.label}
            </p>
            <p className="font-sans text-3xl font-medium tabular-nums leading-none tracking-tight">
              {card.value}
            </p>
          </article>
        ))}
      </section>

      <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section className="flex min-h-52 flex-col rounded-[var(--radius-md)] border border-line bg-white p-3 lg:min-h-0">
          <DashChart view={search.view} series={data.series} onSelect={onChartSelect} />
        </section>
        <section className="rounded-[var(--radius-md)] border border-line bg-white p-3">
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

      <div className="grid shrink-0 gap-3 lg:h-44 lg:grid-cols-2">
        <section className="flex min-h-0 flex-col rounded-[var(--radius-md)] border border-line bg-white p-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-muted">
            Meine Aktionen
          </p>
          {data.actions.length === 0 ? (
            <p className="mt-3 text-sm text-ink-muted">Keine Aktionen in diesem Zeitraum.</p>
          ) : (
            <ol className="mt-2 min-h-0 space-y-1.5 overflow-y-auto text-sm">
              {data.actions.map((item) => (
                <li key={`${item.at}-${item.label}`} className="flex gap-3">
                  <span className="tabular-nums text-ink-muted">{ymdDe(item.ymd)}</span>
                  <span className="text-ink-muted"> · </span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ol>
          )}
        </section>
        <section className="flex min-h-0 flex-col rounded-[var(--radius-md)] border border-line bg-white p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-muted">
              Offizielle Infos
            </p>
            <div role="tablist" aria-label="Log-Filter" className="flex gap-1">
              {LOG_FILTERS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={logFilter === item.id}
                  className={cn(
                    "min-h-8 px-2 text-xs",
                    logFilter === item.id ? "font-medium text-primary" : "text-ink-muted hover:text-ink",
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
            <ol className="mt-2 min-h-0 space-y-1.5 overflow-y-auto text-sm">
              {log.map((entry) => (
                <li key={`${entry.at}-${entry.clinicId}-${entry.kind}`} className="tabular-nums">
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

function ymdDe(ymd: string): string {
  const [year, month, day] = ymd.split("-");
  if (!year || !month || !day) return ymd;
  return `${day}.${month}.${year}`;
}
