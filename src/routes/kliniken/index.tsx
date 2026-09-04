import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/brand/site-footer";
import { ClinicCard } from "@/components/clinic/clinic-card";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { INDICATIONS, type Indication } from "@/lib/domain/types";
import { listClinics } from "@/lib/server/clinics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/kliniken/")({
  loader: () => listClinics(),
  component: ClinicsPage,
});

function ClinicsPage() {
  const [filter, setFilter] = useState<Indication | "alle">("alle");
  const rows = Route.useLoaderData();
  const clinics = useMemo(() => {
    if (filter === "alle") return rows;
    return rows.filter((clinic) => clinic.indicationAreas.includes(filter));
  }, [filter, rows]);

  return (
    <div className="min-h-screen bg-bg">
      <PublicHeader />
      <main id="inhalt" className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
          Offizielle Steckbriefe
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Klinik-Steckbriefe</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Dieselbe Vorlage für alle Häuser, inklusive Fotoleiste. Musterprofile zur
          Orientierung — persönlich wird nur im Fallordner annotiert.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <FilterChip active={filter === "alle"} onClick={() => setFilter("alle")}>
            Alle
          </FilterChip>
          {INDICATIONS.map((item) => (
            <FilterChip
              key={item.id}
              active={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </FilterChip>
          ))}
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clinics.map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} />
          ))}
        </div>
        <p className="mt-10 text-sm text-ink-muted">
          {clinics.length} Profile · Wartezeit-Schätzung ohne Garantie
        </p>
        <Badge className="mt-2">Musterkatalog</Badge>
      </main>
      <SiteFooter />
    </div>
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
      className={cn(
        "min-h-11 rounded-full px-3 text-sm",
        active ? "bg-primary text-primary-fg" : "bg-surface text-ink shadow-[var(--shadow-border)]",
      )}
    >
      {children}
    </button>
  );
}
