import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/brand/site-footer";
import { ClinicCard } from "@/components/clinic/clinic-card";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  catalogFilterActive,
  catalogPulse,
  emptyCatalogFilter,
  filterClinics,
  type CatalogFilter,
} from "@/lib/domain/catalog-filter";
import { STATES, type Indication } from "@/lib/domain/types";
import { listClinics } from "@/lib/server/clinics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/kliniken/")({
  loader: () => listClinics(),
  component: ClinicsPage,
});

const AUFTRAG: { id: "alle" | Indication; label: string }[] = [
  { id: "alle", label: "Alle" },
  { id: "sucht", label: "Suchtreha" },
  { id: "psychosomatik", label: "Psychosomatik" },
  { id: "dual", label: "Dualdiagnose" },
];

function ClinicsPage() {
  const [filter, setFilter] = useState<CatalogFilter>(emptyCatalogFilter);
  const rows = Route.useLoaderData();
  const pulse = useMemo(() => catalogPulse(rows), [rows]);
  const clinics = useMemo(() => filterClinics(rows, filter), [filter, rows]);
  const active = catalogFilterActive(filter);

  function patch(partial: Partial<CatalogFilter>) {
    setFilter((current) => ({ ...current, ...partial }));
  }

  return (
    <div className="min-h-screen bg-bg">
      <PublicHeader />
      <main id="inhalt" className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
          Offizielle Steckbriefe · ohne Konto
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Klinik-Steckbriefe</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Dieselbe Vorlage für alle Häuser, inklusive Fotoleiste. Öffentlich lesbar — speichern
          und annotieren nur im Fallordner.
        </p>

        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          <PulseStat label="Häuser im Katalog" value={pulse.houses} />
          <PulseStat
            label="Vollständige Steckbriefe"
            value={pulse.complete}
            hint={`von ${pulse.houses}`}
          />
          <PulseStat label="Mit Außenfoto" value={pulse.coverPhotos} />
        </dl>
        <p className="mt-2 text-xs text-ink-muted">
          Vollständig heißt: Außenfoto, Telefon, Website, bekannte Zimmerart und alle Textblöcke mit Inhalt.
          Fehlende Wahlleistungspreise zählen nicht als Lücke.
        </p>

        <div className="mt-8 space-y-5 rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[1fr_16rem]">
            <div>
              <Label htmlFor="klinik-suche">Suche</Label>
              <Input
                id="klinik-suche"
                type="search"
                value={filter.q}
                onChange={(event) => patch({ q: event.target.value })}
                placeholder="Name, Ort, Träger…"
                autoComplete="off"
                className="mt-1 bg-bg"
              />
            </div>
            <div>
              <Label htmlFor="klinik-land">Bundesland</Label>
              <select
                id="klinik-land"
                className="mt-1 h-11 w-full rounded-[var(--radius-md)] bg-bg px-3 text-base text-ink shadow-[var(--shadow-border)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                value={filter.state}
                onChange={(event) => patch({ state: event.target.value })}
              >
                <option value="">Alle Bundesländer</option>
                {STATES.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <FilterGroup legend="Auftrag">
            {AUFTRAG.map((item) => (
              <FilterChip
                key={item.id}
                active={filter.auftrag === item.id}
                onClick={() => patch({ auftrag: item.id })}
              >
                {item.label}
              </FilterChip>
            ))}
          </FilterGroup>

          <FilterGroup legend="Substanzen">
            <FilterChip
              active={filter.alkohol}
              onClick={() => patch({ alkohol: !filter.alkohol })}
            >
              Alkohol
            </FilterChip>
            <FilterChip
              active={filter.drogenMedikamente}
              onClick={() => patch({ drogenMedikamente: !filter.drogenMedikamente })}
            >
              Drogen / Medikamente
            </FilterChip>
          </FilterGroup>

          <FilterGroup legend="Passung">
            <FilterChip
              active={filter.einzelzimmer}
              onClick={() => patch({ einzelzimmer: !filter.einzelzimmer })}
            >
              Einzelzimmer
            </FilterChip>
            <FilterChip
              active={filter.substitution}
              onClick={() => patch({ substitution: !filter.substitution })}
            >
              Substitution
            </FilterChip>
            <FilterChip active={filter.kinder} onClick={() => patch({ kinder: !filter.kinder })}>
              Eltern-Kind
            </FilterChip>
            <FilterChip
              active={filter.gender === "frauen"}
              onClick={() => patch({ gender: filter.gender === "frauen" ? "egal" : "frauen" })}
            >
              Frauen
            </FilterChip>
            <FilterChip
              active={filter.gender === "maenner"}
              onClick={() => patch({ gender: filter.gender === "maenner" ? "egal" : "maenner" })}
            >
              Männer
            </FilterChip>
            <FilterChip active={filter.ahb} onClick={() => patch({ ahb: !filter.ahb })}>
              AHB
            </FilterChip>
            <FilterChip
              active={filter.barriere}
              onClick={() => patch({ barriere: !filter.barriere })}
            >
              Barrierearm
            </FilterChip>
            <FilterChip
              active={filter.setting === "tagesklinik"}
              onClick={() =>
                patch({ setting: filter.setting === "tagesklinik" ? "egal" : "tagesklinik" })
              }
            >
              Tagesklinik
            </FilterChip>
            <FilterChip
              active={filter.vollstaendig}
              onClick={() => patch({ vollstaendig: !filter.vollstaendig })}
            >
              Nur vollständige
            </FilterChip>
          </FilterGroup>

          {active ? (
            <p>
              <button
                type="button"
                className="min-h-11 text-sm font-medium text-primary hover:underline"
                onClick={() => setFilter(emptyCatalogFilter())}
              >
                Filter zurücksetzen
              </button>
            </p>
          ) : null}
        </div>

        {clinics.length === 0 ? (
          <p className="mt-8 text-ink-muted">
            Keine Häuser zu diesen Filtern.{" "}
            <button
              type="button"
              className="font-medium text-primary hover:underline"
              onClick={() => setFilter(emptyCatalogFilter())}
            >
              Filter zurücksetzen
            </button>
          </p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {clinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </div>
        )}

        <p className="mt-10 text-sm text-ink-muted">
          {clinics.length} von {pulse.houses} Häusern · {pulse.complete} vollständig · Wartezeit-Schätzung
          ohne Garantie
        </p>
        <Badge className="mt-2">Klinikatalog</Badge>
      </main>
      <SiteFooter />
    </div>
  );
}

function PulseStat({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">{label}</p>
      <p className="mt-1 font-display text-3xl tabular-nums tracking-tight">
        {value}
        {hint ? <span className="ml-2 text-base text-ink-muted">{hint}</span> : null}
      </p>
    </div>
  );
}

function FilterGroup({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
        {legend}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-h-11 rounded-full px-3 text-sm",
        active ? "bg-primary text-primary-fg" : "bg-bg text-ink shadow-[var(--shadow-border)]",
      )}
    >
      {children}
    </button>
  );
}
