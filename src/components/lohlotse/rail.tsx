import { useEffect, type ReactNode } from "react";
import { OfficialSteckbrief } from "@/components/clinic/official-steckbrief";
import { HighlightedText, quotesOf } from "@/components/lohlotse/highlight-text";
import { Button } from "@/components/ui/button";
import {
  PERSONAL_FIELD_LABEL,
  splitUnits,
  type LohlotseHighlight,
  type PersonalDraft,
  type PersonalField,
} from "@/lib/domain/lohlotse";
import { emitUsage } from "@/lib/domain/usage";
import type { ClinicWithWait } from "@/lib/domain/types";
import type { LohlotseMatch } from "@/lib/server/lohlotse";
import { cn } from "@/lib/utils";

const FIELDS: PersonalField[] = ["passt", "passtNicht", "offeneFragen", "rueckmeldungen"];

export function LohlotseRail({
  clientName,
  personal,
  clinic,
  clinics,
  matches,
  highlights,
  onSelectClinic,
}: {
  clientName: string;
  personal: PersonalDraft;
  clinic: ClinicWithWait | null;
  clinics: ClinicWithWait[];
  matches: LohlotseMatch[];
  highlights: LohlotseHighlight[];
  onSelectClinic: (clinicId: string | null) => void;
}) {
  useEffect(() => {
    if (clinic?.id) emitUsage("clinic_view", { clinicId: clinic.id });
  }, [clinic?.id]);

  const officialQuotes = quotesOf(highlights, "official");
  const highlightBlocks = [
    ...new Set(
      highlights
        .filter((item) => item.surface === "official" && item.block)
        .map((item) => String(item.block)),
    ),
  ];

  return (
    <aside
      id="lohlotse-rail"
      className="space-y-6 rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)] lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto"
      aria-label="Steckbrief-Leiste"
    >
      <div>
        <label htmlFor="lohlotse-clinic" className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
          Haus im Fokus
        </label>
        <select
          id="lohlotse-clinic"
          className="mt-2 h-11 w-full rounded-[var(--radius-md)] bg-bg px-3 text-sm text-ink shadow-[var(--shadow-border)]"
          value={clinic?.id ?? ""}
          onChange={(event) => onSelectClinic(event.target.value || null)}
        >
          <option value="">Klinik wählen oder nennen</option>
          {matches.length > 0 ? (
            <optgroup label="Aus dem letzten Lauf">
              {matches.map((item) => (
                <option key={item.clinicId} value={item.clinicId}>
                  {item.name}
                </option>
              ))}
            </optgroup>
          ) : null}
          <optgroup label="Klinikatalog">
            {clinics.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {clinic ? (
        <OfficialSteckbrief
          clinic={clinic}
          variant="rail"
          highlightQuotes={officialQuotes}
          highlightBlocks={highlightBlocks}
        />
      ) : (
        <div className="rounded-[var(--radius-lg)] bg-bg-subtle p-4">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
            Offizieller Steckbrief
          </p>
          <p className="mt-2 text-sm text-ink">Klinik wählen oder nennen.</p>
          <p className="mt-1 text-sm text-ink-muted">
            Die Einheitsvorlage inkl. Fotoleiste öffnet sich, sobald ein Haus im Fokus ist.
          </p>
          {matches.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {matches.slice(0, 4).map((item) => (
                <Button
                  key={item.clinicId}
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => onSelectClinic(item.clinicId)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      )}

      <PersonalPane name={clientName} personal={personal} highlights={highlights} />
    </aside>
  );
}

function PersonalPane({
  name,
  personal,
  highlights,
}: {
  name: string;
  personal: PersonalDraft;
  highlights: LohlotseHighlight[];
}) {
  return (
    <section className="space-y-4 border-t border-line pt-5">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
          Persönlicher Steckbrief
        </p>
        <h2 className="mt-1 font-display text-2xl tracking-tight">Persönlich für {name}</h2>
        <p className="mt-1 text-sm text-ink-muted">Nur dieser Ordner. Offizieller Kliniktext bleibt unangetastet.</p>
      </div>
      {FIELDS.map((field) => {
        const quotes = quotesOf(highlights, "personal", field);
        const lines = splitUnits(personal[field]);
        const fieldHit = highlights.some(
          (item) => item.surface === "personal" && (item.field === field || (!item.field && field === "passt")),
        );
        return (
          <div
            key={field}
            data-personal-field={field}
            data-personal-highlight={fieldHit ? "true" : undefined}
            className={cn(fieldHit && "rounded-[var(--radius-md)] border-l-4 border-l-primary pl-3")}
          >
            <h3 className="text-sm font-medium">{PERSONAL_FIELD_LABEL[field]}</h3>
            {lines.length === 0 ? (
              <p className="mt-1 text-sm text-ink-muted">Noch leer — Samen bleibt die Überschrift.</p>
            ) : (
              <ul className="mt-1 space-y-1.5 text-sm text-ink">
                {lines.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span aria-hidden="true" className="text-ink-subtle">
                      –
                    </span>
                    <HighlightedText text={line} quotes={quotes} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </section>
  );
}

export function MobileRail({
  open,
  onToggle,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="lg:hidden">
      <Button
        type="button"
        variant="secondary"
        className="w-full"
        id="lohlotse-rail-toggle"
        aria-expanded={open}
        aria-controls="lohlotse-rail-mobile"
        onClick={onToggle}
      >
        {open ? "Steckbrief-Leiste schließen" : "Steckbrief-Leiste öffnen"}
      </Button>
      {open ? (
        <div id="lohlotse-rail-mobile" className="mt-3">
          {children}
        </div>
      ) : null}
    </div>
  );
}
