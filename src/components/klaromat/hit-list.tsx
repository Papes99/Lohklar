import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { WartezeitSchaetzung } from "@/components/wait/wartezeit-schaetzung";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formulateFit, houseFeatures } from "@/lib/domain/document";
import type { Clinic, KlaromatAnswers, MatchSnapshot } from "@/lib/domain/types";
import { cn } from "@/lib/utils";

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
  const [selected, setSelected] = useState<string[]>(() => matches.map((item) => item.clinicId));

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">Klar-o-Mat</p>
        <h1 className="mt-1 font-display text-3xl tracking-tight">Passende Häuser für {clientName}</h1>
        <p className="mt-2 text-ink-muted">Ergebnis, keine Fragenwiederholung.</p>
      </header>

      {matches.length === 0 ? (
        <div className="rounded-[var(--radius-xl)] bg-surface p-6 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-2xl tracking-tight">Keine belastbare Passung</h2>
          <p className="mt-2 text-ink-muted">Bedarf anpassen oder Region erweitern.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="button" onClick={onAdjustNeed}>
              Bedarf ändern
            </Button>
            {!guest ? (
              <Button variant="secondary" type="button" disabled={creating} onClick={() => onCreateDocument([])}>
                Trotzdem Dokument anlegen
              </Button>
            ) : null}
          </div>
        </div>
      ) : (
        <ul className="space-y-4">
          {matches.map((match) => {
            const clinic = clinicMap.get(match.clinicId);
            if (!clinic) return null;
            const photo = clinic.photos.find((item) => item.slot === "aussen") ?? clinic.photos[0];
            const inDoc = selected.includes(clinic.id);
            const chips = houseFeatures(clinic).slice(0, 3);
            return (
              <li
                key={clinic.id}
                className="overflow-hidden rounded-[var(--radius-xl)] bg-surface shadow-[var(--shadow-border)]"
              >
                <div className="flex flex-col sm:flex-row">
                  {photo?.imagePath ? (
                    <img
                      src={photo.imagePath}
                      alt={photo.alt}
                      className="aspect-photo h-36 w-full object-cover sm:h-auto sm:w-40"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div className="grid aspect-photo h-36 place-items-center bg-bg-subtle text-sm text-ink-muted sm:h-auto sm:w-40">
                      Foto nicht verfügbar
                    </div>
                  )}
                  <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
                    <div>
                      <h2 className="font-display text-xl tracking-tight">{clinic.name}</h2>
                      <p className="text-sm text-ink-muted">
                        {clinic.city}, {clinic.stateName}
                      </p>
                    </div>
                    <p className="text-sm">{formulateFit(clinic, match, answers)}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {chips.map((chip) => (
                        <Badge key={chip}>{chip}</Badge>
                      ))}
                    </div>
                    <WartezeitSchaetzung estimate={match.wait} variant="chip" />
                    <div className="flex flex-wrap gap-2">
                      <Button variant="secondary" size="sm" asChild>
                        <Link to="/kliniken/$clinicId" params={{ clinicId: clinic.id }}>
                          Steckbrief
                        </Link>
                      </Button>
                      {guest ? null : (
                        <Button
                          variant={inDoc ? "primary" : "ghost"}
                          size="sm"
                          type="button"
                          aria-pressed={inDoc}
                          onClick={() => toggle(clinic.id)}
                        >
                          {inDoc ? "Im Dokument" : "Ins Dokument"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {guest ? (
        <p className="text-sm text-ink-muted">Export nach Registrierung und Namenszuordnung.</p>
      ) : matches.length > 0 ? (
        <Button
          id="klaromat-create-document"
          type="button"
          disabled={creating}
          className={cn(selected.length === 0 && "opacity-80")}
          onClick={() => onCreateDocument(selected)}
        >
          {creating ? "Dokument entsteht…" : "Dokument als Entwurf erzeugen"}
        </Button>
      ) : null}
    </div>
  );
}
