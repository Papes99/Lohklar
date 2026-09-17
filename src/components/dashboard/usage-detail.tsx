import * as Dialog from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import {
  USAGE_DETAIL_LABELS,
  type DashView,
  type UsageDetailMetric,
} from "@/lib/domain/usage";
import { getUsageDetails, type UsageAccountRow } from "@/lib/server/dashboard";

export function UsageDetailSheet({
  metric,
  open,
  view,
  date,
  periodHeading,
  onClose,
}: {
  metric: UsageDetailMetric | null;
  open: boolean;
  view: DashView;
  date: string;
  periodHeading: string;
  onClose: () => void;
}) {
  const query = useQuery({
    queryKey: ["usage-details", metric, view, date],
    queryFn: () => getUsageDetails({ data: { metric: metric ?? "konten", view, date } }),
    enabled: open && metric != null,
  });

  const title = metric ? USAGE_DETAIL_LABELS[metric] : "Nutzung";
  const result = query.data;
  const forbidden = result?.ok === false;
  const payload = result?.ok === true ? result : null;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 flex max-h-[88vh] flex-col rounded-t-[var(--radius-xl)] bg-surface p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[var(--shadow-border)] outline-none lg:inset-auto lg:left-1/2 lg:top-1/2 lg:w-full lg:max-w-lg lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-[var(--radius-xl)] lg:p-6">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line lg:hidden" aria-hidden="true" />
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Dialog.Title className="font-display text-2xl tracking-tight">{title}</Dialog.Title>
              <p className="mt-1 text-sm text-ink-muted">{periodHeading}</p>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-md)] text-ink-muted hover:bg-bg-subtle hover:text-ink"
                aria-label="Schließen"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="mt-2 text-sm text-ink-muted">
            Nur Konten der Fachkräfte. Keine Klientennamen.
          </Dialog.Description>
          <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
            {query.isPending ? (
              <div className="space-y-3" aria-busy="true">
                <div className="h-16 animate-pulse rounded-[var(--radius-md)] bg-bg-subtle" />
                <div className="h-16 animate-pulse rounded-[var(--radius-md)] bg-bg-subtle" />
                <div className="h-16 animate-pulse rounded-[var(--radius-md)] bg-bg-subtle" />
              </div>
            ) : query.isError || forbidden ? (
              <p className="text-sm text-ink-muted">
                {forbidden
                  ? "Keine Berechtigung."
                  : "Die Liste konnte nicht geladen werden."}
              </p>
            ) : payload && payload.accounts.length === 0 && payload.kinds.length === 0 ? (
              <p className="text-sm text-ink-muted">Keine Einträge in diesem Zeitraum.</p>
            ) : payload ? (
              <DetailBody metric={metric} payload={payload} />
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function DetailBody({
  metric,
  payload,
}: {
  metric: UsageDetailMetric | null;
  payload: {
    accounts: UsageAccountRow[];
    kinds: { kind: string; label: string; count: number }[];
    truncated: boolean;
  };
}) {
  return (
    <div className="space-y-6">
      {metric === "vorgaenge" && payload.kinds.length > 0 ? (
        <section>
          <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
            Nach Typ
          </h3>
          <ul className="mt-2 divide-y divide-line">
            {payload.kinds.map((row) => (
              <li key={row.kind} className="flex items-baseline justify-between gap-3 py-2.5 text-sm">
                <span>{row.label}</span>
                <span className="tabular-nums text-ink-muted">{row.count}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {payload.accounts.length === 0 ? (
        payload.kinds.length > 0 ? null : (
          <p className="text-sm text-ink-muted">Keine Einträge in diesem Zeitraum.</p>
        )
      ) : (
        <section>
          {metric === "vorgaenge" ? (
            <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
              Nach Nutzer:in
            </h3>
          ) : null}
          <ul className={metric === "vorgaenge" ? "mt-2 divide-y divide-line" : "divide-y divide-line"}>
            {payload.accounts.map((account) => (
              <AccountRow key={account.email} account={account} showEvents={metric !== "neu"} />
            ))}
          </ul>
          {payload.truncated ? (
            <p className="mt-3 text-xs text-ink-muted">Weitere Einträge nicht angezeigt.</p>
          ) : null}
        </section>
      )}
    </div>
  );
}

function AccountRow({
  account,
  showEvents,
}: {
  account: UsageAccountRow;
  showEvents: boolean;
}) {
  return (
    <li className="py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-medium">{account.name || "Ohne Anzeigename"}</p>
          <p className="truncate text-sm text-ink-muted">{account.email}</p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-1">
          {account.newInPeriod ? <Chip>Neu</Chip> : null}
          {account.activeInPeriod ? <Chip>Aktiv</Chip> : null}
        </div>
      </div>
      <p className="mt-1.5 text-xs text-ink-muted">
        Angelegt {formatWhen(account.createdAt)}
        {account.lastLoginAt ? ` · Login ${formatWhen(account.lastLoginAt)}` : ""}
        {showEvents && account.eventsInPeriod > 0
          ? ` · ${account.eventsInPeriod} Vorgänge`
          : ""}
      </p>
    </li>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-bg-subtle px-2 py-0.5 text-xs font-medium text-ink-muted">
      {children}
    </span>
  );
}

function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("de-DE", {
    timeZone: "Europe/Berlin",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
