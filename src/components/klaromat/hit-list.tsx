import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { WartezeitSchaetzung } from "@/components/wait/wartezeit-schaetzung";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CoverPhoto, SubstanceTags } from "@/components/clinic/cover-photo";
import { StatusChip } from "@/components/clinic/status-chip";
import { formulateFit } from "@/lib/domain/document";
import { coverageLabel, hydrateMatch, isBlocked, listedNeeds } from "@/lib/domain/matching";
import {
  WAIT_UNCERTAINTY_LABEL,
  coverAuftragTag,
  coverSubstanceTags,
  type ChipStatus,
  type Clinic,
  type CriterionStatus,
  type KlaromatAnswers,
  type MatchSnapshot,
} from "@/lib/domain/types";
import { cn } from "@/lib/utils";

const COUNT_PRESETS = [3, 5, 10] as const;

export function MatchHitList({
  clientName,
  answers,
  matches,
  clinics,
  guest = false,
  creating = false,
  onCreateDocument,
  onAdjustNeed,
}: {
  clientName: string;
  answers: KlaromatAnswers;
  matches: MatchSnapshot[];
  clinics: Clinic[];
  guest?: boolean;
  creating?: boolean;
  onCreateDocument: (clinicIds: string[]) => void;
  onAdjustNeed: () => void;
}) {
  const clinicMap = useMemo(() => new Map(clinics.map((clinic) => [clinic.id, clinic])), [clinics]);
  const ranked = useMemo(() => matches.map(hydrateMatch), [matches]);
  const viable = useMemo(() => ranked.filter((item) => !isBlocked(item)), [ranked]);
  const blocked = useMemo(() => ranked.filter((item) => isBlocked(item)), [ranked]);
  const needs = useMemo(() => listedNeeds(answers), [answers]);
  const [selected, setSelected] = useState<string[]>(() =>
    matches.filter((item) => !isBlocked(hydrateMatch(item))).slice(0, 10).map((item) => item.clinicId),
  );
  const [showAllViable, setShowAllViable] = useState(false);
  const [showBlocked, setShowBlocked] = useState(false);

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  function setCount(n: number) {
    setSelected(viable.slice(0, n).map((item) => item.clinicId));
  }

  function moveSelected(from: number, to: number) {
    setSelected((prev) => moveIds(prev, from, to));
  }

  const visibleViable = showAllViable ? viable : viable.slice(0, 10);
  const selectedHouses = selected
    .map((id) => {
      const match = ranked.find((item) => item.clinicId === id);
      const clinic = clinicMap.get(id);
      if (!match || !clinic) return null;
      return { match, clinic };
    })
    .filter((item): item is { match: MatchSnapshot; clinic: Clinic } => Boolean(item));

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">Klar-o-Mat</p>
        <h1 className="mt-1 font-display text-3xl tracking-tight">Rangliste für {clientName}</h1>
        <p className="mt-2 text-ink-muted">
          Die ersten zehn Häuser ohne Ausschluss. Orientierung, keine Aufnahmezusage.
        </p>
      </header>

      <section className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]">
        <h2 className="font-display text-xl tracking-tight">Gesetzte Anforderungen</h2>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {needs.map((item) => (
            <Badge key={`${item.criterion}-${item.value}`} tone="primary">
              {item.criterion} · {item.value}
            </Badge>
          ))}
        </ul>
        <p className="mt-3 text-sm text-ink-muted">
          {viable.length} Häuser ohne Ausschluss · {blocked.length} Häuser decken zentrale Anforderungen
          nicht · {needs.length} gesetzte Kriterien
        </p>
      </section>

      {viable.length === 0 ? (
        <div className="rounded-[var(--radius-xl)] bg-surface p-6 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-2xl tracking-tight">Keine belastbare Passung</h2>
          <p className="mt-2 text-ink-muted">
            Substanz, Geschlecht, Substitution, Kinder, AHB oder Setting schließen die Häuser im
            Katalog aus. Bedarf anpassen oder Region erweitern.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="button" onClick={onAdjustNeed}>
              Bedarf ändern
            </Button>
          </div>
        </div>
      ) : (
        <ol className="space-y-4">
          {visibleViable.map((match) => {
            const clinic = clinicMap.get(match.clinicId);
            if (!clinic) return null;
            const place = selected.indexOf(clinic.id);
            return (
              <RankCard
                key={clinic.id}
                rank={match.rank}
                place={place >= 0 ? place + 1 : null}
                clinic={clinic}
                match={match}
                answers={answers}
                selected={place >= 0}
                guest={guest}
                onToggle={() => toggle(clinic.id)}
              />
            );
          })}
        </ol>
      )}

      {viable.length > 10 && !showAllViable ? (
        <Button variant="secondary" type="button" onClick={() => setShowAllViable(true)}>
          Weitere {viable.length - 10} Häuser in der Rangliste
        </Button>
      ) : null}

      {blocked.length > 0 ? (
        <section className="space-y-3">
          <button
            type="button"
            className="text-left text-sm font-medium text-primary hover:underline"
            onClick={() => setShowBlocked((open) => !open)}
          >
            {showBlocked ? "Verbergen" : "Anzeigen"}: {blocked.length} Häuser decken zentrale
            Anforderungen nicht
          </button>
          {showBlocked ? (
            <ul className="space-y-3">
              {blocked.map((match) => {
                const clinic = clinicMap.get(match.clinicId);
                if (!clinic) return null;
                return (
                  <li
                    key={clinic.id}
                    className="rounded-[var(--radius-xl)] bg-surface p-4 text-sm shadow-[var(--shadow-border)]"
                  >
                    <p className="font-medium">
                      Rang {match.rank} · {clinic.name}
                      <span className="font-normal text-ink-muted">
                        {" "}
                        · {clinic.city}, {clinic.stateName} · {coverageLabel(match)}
                      </span>
                    </p>
                    <ul className="mt-2 space-y-1 text-ink-muted">
                      {(match.blocking ?? []).map((item) => (
                        <li key={item}>– {item}</li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </section>
      ) : null}

      {guest ? (
        <p className="text-sm text-ink-muted">
          Zusammenstellung, Dokument und PDF nach Konto und Namenszuordnung.
        </p>
      ) : viable.length > 0 ? (
        <section className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-2xl tracking-tight">Zusammenstellung</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Anzahl, Auswahl und Platz für das Dokument. Texte schreiben Sie danach, das PDF drucken
            Sie aus dem Dokument.
          </p>
          <fieldset className="mt-4">
            <legend className="mb-2 text-sm font-medium">Anzahl</legend>
            <div className="flex flex-wrap gap-2">
              {COUNT_PRESETS.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setCount(Math.min(count, viable.length))}
                  className={cn(
                    "min-h-11 rounded-full px-3 text-sm",
                    selected.length === Math.min(count, viable.length)
                      ? "bg-primary text-primary-fg"
                      : "bg-bg-subtle text-ink",
                  )}
                >
                  {count}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCount(viable.length)}
                className={cn(
                  "min-h-11 rounded-full px-3 text-sm",
                  selected.length === viable.length ? "bg-primary text-primary-fg" : "bg-bg-subtle text-ink",
                )}
              >
                Alle ohne Ausschluss ({viable.length})
              </button>
            </div>
          </fieldset>
          {selectedHouses.length === 0 ? (
            <p className="mt-4 text-sm text-ink-muted">Noch kein Haus ausgewählt.</p>
          ) : (
            <ol className="mt-4 space-y-2">
              {selectedHouses.map((item, index) => (
                <li
                  key={item.clinic.id}
                  className="flex flex-wrap items-center gap-2 rounded-[var(--radius-md)] bg-bg-subtle px-3 py-2"
                >
                  <span className="font-display text-xl tabular-nums text-primary" aria-label={`Platz ${index + 1}`}>
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 text-sm">
                    <span className="font-medium">{item.clinic.name}</span>
                    <span className="text-ink-muted">
                      {" "}
                      · {item.clinic.city} · Katalograng {item.match.rank}
                    </span>
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      aria-label={`${item.clinic.name} nach oben`}
                      disabled={index === 0}
                      onClick={() => moveSelected(index, index - 1)}
                    >
                      <ChevronUp className="size-4" aria-hidden="true" />
                      Auf
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      aria-label={`${item.clinic.name} nach unten`}
                      disabled={index === selectedHouses.length - 1}
                      onClick={() => moveSelected(index, index + 1)}
                    >
                      <ChevronDown className="size-4" aria-hidden="true" />
                      Ab
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      aria-label={`${item.clinic.name} entfernen`}
                      onClick={() => toggle(item.clinic.id)}
                    >
                      <X className="size-4" aria-hidden="true" />
                      Weg
                    </Button>
                  </div>
                </li>
              ))}
            </ol>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="secondary" type="button" onClick={onAdjustNeed}>
              Bedarf ändern
            </Button>
            <Button
              id="klaromat-create-document"
              type="button"
              disabled={creating || selected.length === 0}
              onClick={() => onCreateDocument(selected)}
            >
              {creating
                ? "Dokument entsteht…"
                : `Dokument erzeugen (${selected.length})`}
            </Button>
          </div>
        </section>
      ) : null}

      {guest || viable.length === 0 ? (
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" type="button" onClick={onAdjustNeed}>
            Bedarf ändern
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function RankCard({
  rank,
  place,
  clinic,
  match,
  answers,
  selected,
  guest,
  onToggle,
}: {
  rank: number;
  place: number | null;
  clinic: Clinic;
  match: MatchSnapshot;
  answers: KlaromatAnswers;
  selected: boolean;
  guest: boolean;
  onToggle: () => void;
}) {
  const photo = clinic.photos.find((item) => item.slot === "aussen") ?? clinic.photos[0];
  const hits = match.reasons.filter((reason) => reason.status === "match");
  const partials = match.reasons.filter((reason) => reason.status === "partial");
  const misses = match.reasons.filter((reason) => reason.status === "miss");
  return (
    <li className="overflow-hidden rounded-[var(--radius-xl)] bg-surface shadow-[var(--shadow-border)]">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-44">
          <CoverPhoto
            src={photo?.imagePath}
            alt={photo?.alt ?? clinic.name}
            auftrag={coverAuftragTag(clinic)}
            className="aspect-photo h-36 w-full sm:h-40 sm:w-44"
          />
          <div className="px-3 py-2 sm:px-2">
            <SubstanceTags
              tags={[
                ...coverSubstanceTags(clinic),
                `Unsicherheit ${WAIT_UNCERTAINTY_LABEL[match.wait.uncertainty]}`,
              ]}
            />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
          <div className="flex items-start gap-3">
            <p className="font-display text-3xl leading-none tracking-tight text-primary" aria-label={`Rang ${rank}`}>
              {rank}
            </p>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-xl tracking-tight">{clinic.name}</h2>
              <p className="text-sm text-ink-muted">
                {clinic.city}, {clinic.stateName}
                {" · "}
                {coverageLabel(match)}
                {place ? ` · Platz ${place} im Dokument` : ""}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-subtle" aria-hidden="true">
                <div className="h-full rounded-full bg-primary" style={{ width: `${match.score}%` }} />
              </div>
              <p className="mt-1 text-xs text-ink-muted">{match.score} % gewichtete Deckung</p>
            </div>
          </div>
          <p className="text-sm">{formulateFit(clinic, match, answers)}</p>
          <div className="flex flex-wrap gap-1.5">
            {hits.map((reason) => (
              <Badge key={reason.criterion} tone="ok">
                {reason.criterion}
              </Badge>
            ))}
            {partials.map((reason) => (
              <Badge key={reason.criterion} tone="warn">
                {reason.criterion}
              </Badge>
            ))}
            {misses.map((reason) => (
              <Badge key={reason.criterion} tone="danger">
                {reason.criterion}
              </Badge>
            ))}
          </div>
          <WartezeitSchaetzung estimate={match.wait} variant="chip" />
          <details className="text-sm">
            <summary className="cursor-pointer font-medium text-primary">Abgleich im Detail</summary>
            <ul className="mt-3 space-y-2">
              {match.reasons.map((reason) => (
                <li key={reason.criterion} className="flex flex-col gap-1">
                  <StatusChip label={reason.criterion} status={toChip(reason.status)} />
                  <span className="text-ink-muted">{reason.detail}</span>
                </li>
              ))}
            </ul>
          </details>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" asChild>
              <Link to="/kliniken/$clinicId" params={{ clinicId: clinic.id }}>
                Steckbrief
              </Link>
            </Button>
            {guest ? null : (
              <Button
                variant={selected ? "primary" : "ghost"}
                size="sm"
                type="button"
                aria-pressed={selected}
                onClick={onToggle}
              >
                {selected ? `Platz ${place}` : "Aufnehmen"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

function toChip(status: CriterionStatus): ChipStatus {
  if (status === "match") return "vorhanden";
  if (status === "partial") return "eingeschraenkt";
  return "nicht_angeboten";
}

function moveIds(list: string[], from: number, to: number): string[] {
  if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  if (!item) return list;
  next.splice(to, 0, item);
  return next;
}
