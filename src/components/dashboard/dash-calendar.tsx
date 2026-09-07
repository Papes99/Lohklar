import { ChevronLeft, ChevronRight } from "lucide-react";
import { berlinMidnight, berlinParts, type DashView } from "@/lib/domain/usage";
import type { DashCalendarDay } from "@/lib/server/dashboard";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const MONTHS = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

export function DashCalendar({
  year,
  month,
  days,
  selected,
  view,
  onSelectDay,
  onShiftMonth,
}: {
  year: number;
  month: number;
  days: DashCalendarDay[];
  selected: string;
  view: DashView;
  onSelectDay: (ymd: string) => void;
  onShiftMonth: (delta: number) => void;
}) {
  const first = berlinParts(berlinMidnight(year, month, 1));
  const lead = (first.weekday + 6) % 7;
  const cells: (DashCalendarDay | null)[] = [
    ...Array.from({ length: lead }, () => null),
    ...days,
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-1">
        <button
          type="button"
          className="grid size-11 place-items-center rounded-[var(--radius-md)] text-ink-muted hover:bg-bg-subtle hover:text-ink"
          aria-label="Vorheriger Monat"
          onClick={() => onShiftMonth(-1)}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <p className="min-w-0 text-center font-display text-xl tracking-tight">
          {MONTHS[month - 1]} {year}
        </p>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-[var(--radius-md)] text-ink-muted hover:bg-bg-subtle hover:text-ink"
          aria-label="Nächster Monat"
          onClick={() => onShiftMonth(1)}
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-3 grid grid-cols-7 text-center text-xs text-ink-muted">
        {WEEKDAYS.map((day) => (
          <span key={day} className="py-1">
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((cell, index) => {
          if (!cell) return <span key={`e-${index}`} className="min-h-11" />;
          const isSelected = cell.ymd === selected && view === "day";
          const label = [
            `${cell.day}. ${MONTHS[month - 1]} ${year}`,
            cell.usage ? "Nutzung" : null,
            cell.update ? "offizielles Update" : null,
          ]
            .filter(Boolean)
            .join(", ");
          return (
            <button
              key={cell.ymd}
              type="button"
              aria-label={label}
              aria-current={isSelected ? "date" : undefined}
              onClick={() => onSelectDay(cell.ymd)}
              className={cn(
                "flex min-h-11 flex-col items-center justify-center rounded-[var(--radius-sm)] text-sm tabular-nums",
                isSelected ? "bg-primary-soft text-primary" : "text-ink hover:bg-bg-subtle",
              )}
            >
              <span className="leading-none">{cell.day}</span>
              <span className="mt-1 flex h-2 items-center gap-0.5" aria-hidden="true">
                {cell.usage ? <span className="size-1 rounded-full bg-primary" /> : null}
                {cell.update ? <span className="size-1 bg-primary" /> : null}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 flex gap-4 text-xs text-ink-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1 rounded-full bg-primary" aria-hidden="true" />
          Nutzung
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1 bg-primary" aria-hidden="true" />
          Update
        </span>
      </p>
    </div>
  );
}
