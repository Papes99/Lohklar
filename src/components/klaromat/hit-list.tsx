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

  const selectedSet = useMemo(() => (guest ? new Set<string>() : new Set(selected)), [guest, selected]);
  const pool = showAllViable ? viable : viable.slice(0, 10);
  const unselected = pool.filter((item) => !selectedSet.has(item.clinicId));
  const hiddenUnselected = Math.max(0, viable.length - pool.length);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">Klar-o-Mat</p>
        <h1 className="mt-1 font-display text-3xl tracking-tight">Rangliste für {clientName}</h1>
        <p className="mt-2 text-ink-muted">
          Die ersten zehn ohne Ausschluss, Rangfolge über alle {clinics.length} Kataloghäuser.
          Orientierung, keine Aufnahmezusage.
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
            Substanz, Geschlecht, Substitution, Kinder, Anschlussheilbehandlung (AHB) nach
            Krankenhaus oder Setting schließen die Häuser im Katalog aus. Bedarf anpassen oder
            Region erweitern.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="button" onClick={onAdjustNeed}>
              Bedarf ändern
            </Button>
          </div>
        </div>
      ) : null}

      {viable.length > 0 && !guest ? (
        <section className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-xl tracking-tight">Zusammenstellung</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Reihenfolge mit Auf und Ab an den Karten. Texte schreiben Sie danach, das PDF drucken Sie
            aus dem Dokument.
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
        </section>
      ) : null}

      {viable.length > 0 && !guest && selected.length === 0 ? (
        <p className="text-sm text-ink-muted">Noch kein Haus aufgenommen.</p>
      ) : null}

      {viable.length > 0 && !guest && selected.length > 0 ? (
        <ol className="space-y-4">
          {selected.map((id, index) => {
            const clinic = clinicMap.get(id);
            const match = ranked.find((item) => item.clinicId === id);
            if (!clinic || !match) return null;
            return (
              <RankCard
                key={clinic.id}
                rank={match.rank}
                place={index + 1}
                clinic={clinic}
                match={match}
                answers={answers}
                selected
                guest={false}
                canMoveUp={index > 0}
                canMoveDown={index < selected.length - 1}
                onToggle={() => toggle(clinic.id)}
                onMoveUp={() => moveSelected(index, index - 1)}
                onMoveDown={() => moveSelected(index, index + 1)}
              />
            );
          })}
        </ol>
      ) : null}

      {viable.length > 0 && !guest ? (
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" type="button" onClick={onAdjustNeed}>
            Bedarf ändern
          </Button>
          <Button
            id="klaromat-create-document"
            type="button"
            disabled={creating || selected.length === 0}
            onClick={() => onCreateDocument(selected)}
          >
            {creating ? "Dokument entsteht…" : `Dokument erzeugen (${selected.length})`}
          </Button>
        </div>
      ) : null}

      {viable.length > 0 && unselected.length > 0 ? (
        <section className="space-y-4">
          {guest ? null : (
            <h2 className="font-display text-xl tracking-tight">Weitere Häuser</h2>
          )}
          <ol className="space-y-4">
            {unselected.map((match) => {
              const clinic = clinicMap.get(match.clinicId);
              if (!clinic) return null;
              return (
                <RankCard
                  key={clinic.id}
                  rank={match.rank}
                  place={null}
                  clinic={clinic}
                  match={match}
                  answers={answers}
                  selected={false}
                  guest={guest}
                  canMoveUp={false}
                  canMoveDown={false}
                  onToggle={() => toggle(clinic.id)}
                />
              );
            })}
          </ol>
        </section>
      ) : null}

      {hiddenUnselected > 0 ? (
        <Button variant="secondary" type="button" onClick={() => setShowAllViable(true)}>
          Weitere {hiddenUnselected} Häuser in der Rangliste
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
        <div className="flex flex-wrap gap-3">
          <p className="w-full text-sm text-ink-muted">
            Zusammenstellung, Dokument und PDF nach Konto und Namenszuordnung.
          </p>
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
  canMoveUp,
  canMoveDown,
  onToggle,
  onMoveUp,
  onMoveDown,
}: {
  rank: number;
  place: number | null;
  clinic: Clinic;
  match: MatchSnapshot;
  answers: KlaromatAnswers;
  selected: boolean;
  guest: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onToggle: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const photo = clinic.photos.find((item) => item.slot === "aussen") ?? clinic.photos[0];
  const hits = match.reasons.filter((reason) => reason.status === "match");
  const partials = match.reasons.filter((reason) => reason.status === "partial");
  const misses = match.reasons.filter((reason) => reason.status === "miss");
  const hero = selected && place ? place : rank;
  return (
    <li className="overflow-hidden rounded-[var(--radius-xl)] bg-surface shadow-[var(--shadow-border)]">
      <div className="flex flex-col sm:flex-row">
        <div className="flex sm:w-auto">
          {selected && !guest ? (
            <div className="flex shrink-0 flex-col items-center justify-center gap-1 bg-bg-subtle px-1 py-2">
              <button
                type="button"
                className="grid size-11 place-items-center rounded-[var(--radius-sm)] text-ink hover:bg-surface disabled:opacity-40"
                aria-label={`${clinic.name} nach oben`}
                disabled={!canMoveUp}
                onClick={onMoveUp}
              >
                <ChevronUp className="size-5" aria-hidden="true" />
              </button>
              <span className="font-display text-lg tabular-nums text-primary" aria-label={`Platz ${place}`}>
                {place}
              </span>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-[var(--radius-sm)] text-ink hover:bg-surface disabled:opacity-40"
                aria-label={`${clinic.name} nach unten`}
                disabled={!canMoveDown}
                onClick={onMoveDown}
              >
                <ChevronDown className="size-5" aria-hidden="true" />
              </button>
            </div>
          ) : null}
          <div className="min-w-0 flex-1 sm:w-44 sm:flex-none">
            <CoverPhoto
              src={photo?.imagePath}
              alt={photo?.alt ?? clinic.name}
              className="aspect-photo h-36 w-full sm:h-40 sm:w-44"
            />
            <div className="px-3 py-2 sm:px-2">
              <SubstanceTags
                accent={coverAuftragTag(clinic)}
                tags={[
                  ...coverSubstanceTags(clinic),
                  `Unsicherheit ${WAIT_UNCERTAINTY_LABEL[match.wait.uncertainty]}`,
                ]}
              />
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
          <div className="flex items-start gap-3">
            {selected ? null : (
              <p className="font-display text-3xl leading-none tracking-tight text-primary" aria-label={`Rang ${rank}`}>
                {hero}
              </p>
            )}
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-xl tracking-tight">{clinic.name}</h2>
              <p className="text-sm text-ink-muted">
                {clinic.city}, {clinic.stateName}
                {" · "}
                {coverageLabel(match)}
                {selected ? ` · Katalograng ${rank}` : ""}
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
            {guest ? null : selected ? (
              <Button
                variant="ghost"
                size="sm"
                type="button"
                aria-label={`${clinic.name} entfernen`}
                onClick={onToggle}
              >
                <X className="size-4" aria-hidden="true" />
                Weg
              </Button>
            ) : (
              <Button variant="ghost" size="sm" type="button" aria-pressed={false} onClick={onToggle}>
                Aufnehmen
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
