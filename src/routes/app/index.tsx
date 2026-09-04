import { useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WartezeitSchaetzung } from "@/components/wait/wartezeit-schaetzung";
import { DASHBOARD_PERIODS, type DashboardPeriod } from "@/lib/domain/usage";
import { getDashboard } from "@/lib/server/dashboard";
import { listFolders } from "@/lib/server/cases";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/")({ component: DashboardPage });

function ymdDe(ymd: string): string {
  const [year, month, day] = ymd.split("-");
  if (!year || !month || !day) return ymd;
  return `${day}.${month}.${year}`;
}

function DashboardPage() {
  const [period, setPeriod] = useState<DashboardPeriod>("woche");
  const query = useQuery({
    queryKey: ["dashboard", period],
    queryFn: () => getDashboard({ data: { period } }),
  });
  const foldersQuery = useQuery({ queryKey: ["folders"], queryFn: () => listFolders() });
  const data = query.data;
  const noFolders = (foldersQuery.data?.length ?? 0) === 0;

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
            Übersicht
          </p>
          <h1 className="mt-1 font-display text-3xl tracking-tight">Dashboard</h1>
          <p className="mt-2 max-w-xl text-ink-muted">
            Nur Zahlen, ohne Klientennamen. Keine Chat-Inhalte, keine Rohdaten zur Gesundheit.
          </p>
        </div>
        <Button asChild>
          <Link to="/app/klar-o-mat">{noFolders ? "Klar-o-Mat für neue Person" : "Klar-o-Mat starten"}</Link>
        </Button>
      </header>

      {noFolders ? (
        <div className="rounded-[var(--radius-xl)] bg-surface p-6 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-2xl tracking-tight">Noch keine Fallordner</h2>
          <p className="mt-2 text-ink-muted">
            Legen Sie die erste Person an. Der Klar-o-Mat startet sofort mit Durchlauf 1. Ein
            Ordner ohne Durchlauf existiert nicht.
          </p>
          <Button className="mt-4" asChild>
            <Link to="/app/klar-o-mat">Klar-o-Mat für neue Person</Link>
          </Button>
        </div>
      ) : (
        <p>
          <Button variant="secondary" asChild>
            <Link to="/app/fallordner">Alle Fälle</Link>
          </Button>
        </p>
      )}

      <div
        role="tablist"
        aria-label="Zeitraum"
        className="flex gap-1 rounded-[var(--radius-lg)] bg-bg-subtle p-1"
      >
        {DASHBOARD_PERIODS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`dashboard-period-${item.id}`}
            aria-selected={period === item.id}
            className={cn(
              "min-h-11 flex-1 rounded-[var(--radius-md)] px-3 text-sm font-medium",
              period === item.id ? "bg-surface text-ink shadow-[var(--shadow-border)]" : "text-ink-muted",
            )}
            onClick={() => setPeriod(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {query.isError ? (
        <p className="text-ink-muted">
          Die Übersicht konnte nicht geladen werden. Bitte die Seite erneut öffnen.
        </p>
      ) : query.isPending || !data ? (
        <p className="text-ink-muted">Zahlen werden geladen…</p>
      ) : (
        <>
          <p className="text-sm text-ink-muted">
            Zeitraum ab {ymdDe(data.fromYmd)} · Europe/Berlin
          </p>

          <Section title="Klar-o-Mat">
            <Stat label="Starts" value={data.klaromatStarts} />
            <Stat label="Abgeschlossen" value={data.runsCompleted} />
            <Stat label="Entwürfe" value={data.runsDraft} />
          </Section>

          <Section title="Fallordner">
            <Stat label="Neue Ordner" value={data.foldersNew} hint="jeweils mit Lauf 1" />
            <Stat label="Folgeläufe" value={data.runsFollowup} hint="Runs > 1" />
          </Section>

          <Section title="Dokumente">
            <Stat label="Erzeugt" value={data.documents} />
            <Stat label="Exporte" value={data.exports} />
          </Section>

          <Section title="Steckbriefe">
            <Stat label="Aufrufe" value={data.clinicViews} />
            <Card className="sm:col-span-2">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
                Top-Kliniken
              </p>
              {data.topClinics.length === 0 ? (
                <p className="mt-2 text-sm text-ink-muted">Keine Aufrufe in diesem Zeitraum.</p>
              ) : (
                <ol className="mt-3 space-y-2">
                  {data.topClinics.map((item, index) => (
                    <li key={item.id} className="flex justify-between gap-3 text-sm">
                      <span>
                        {index + 1}. {item.name}
                      </span>
                      <span className="tabular-nums text-ink-muted">{item.count}</span>
                    </li>
                  ))}
                </ol>
              )}
            </Card>
          </Section>

          <Section title="Indikation">
            {data.indications.length === 0 ? (
              <p className="text-sm text-ink-muted sm:col-span-3">Keine Läufe in diesem Zeitraum.</p>
            ) : (
              data.indications.map((item) => (
                <Stat key={item.id} label={item.label} value={item.count} />
              ))
            )}
          </Section>

          <Section title="Lohlotse">
            <Stat label="Chats" value={data.lohlotseChats} />
            <Stat label="Nachrichten" value={data.lohlotseMessages} />
            <Stat label="Threads mit Namen" value={data.lohlotseThreadsNamed} />
            <Stat label="Threads ohne Namen" value={data.lohlotseThreadsUnnamed} />
            <Stat label="Übernahmen persönlich" value={data.steckbriefMerges} />
          </Section>

          <Section title="Wartezeit">
            <Stat label="Gezeigt" value={data.waitShown} />
            <Stat label="Rechenweg geöffnet" value={data.waitRechenweg} />
            <div className="sm:col-span-2">
              {data.wait ? (
                <WartezeitSchaetzung estimate={data.wait} track={false} />
              ) : (
                <Card>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
                    Wartezeit-Schätzung
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">
                    Keine gespeicherten Treffer in diesem Zeitraum.
                  </p>
                </Card>
              )}
            </div>
          </Section>

          <Section title="Fotoleiste · Musterkatalog">
            <Stat label="Slots mit Bild" value={data.photosWithImage} hint="Katalog, nicht Zeitraum" />
            <Stat label="Platzhalter" value={data.photosPlaceholder} hint="Katalog, nicht Zeitraum" />
          </Section>

          <Section title="Nutzung">
            <Stat label="Regionalsuchen" value={data.regionalSearches} />
            <Stat label="Desktop" value={data.sessionsDesktop} />
            <Stat label="Mobil" value={data.sessionsMobile} />
            <Stat label="Neue Sitzungen" value={data.sessionsNew} />
            <Stat label="Wiederkehrend" value={data.sessionsReturning} />
          </Section>
        </>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-2xl tracking-tight">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-3">{children}</div>
    </section>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint?: string;
}) {
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">{label}</p>
      <p className="mt-2 font-display text-3xl tabular-nums tracking-tight">{value}</p>
      {hint ? <p className="mt-1 text-xs text-ink-muted">{hint}</p> : null}
    </Card>
  );
}
