import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import {
  BEDARFE,
  DURATION_FILTERS,
  EXTRAS,
  GENDER_FILTERS,
  INDICATIONS,
  SETTING_FILTERS,
  STATES,
  type KlaromatAnswers,
} from "@/lib/domain/types";
import { emptyAnswers } from "@/lib/domain/matching";
import { formatDeDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const STEPS = ["Bereich", "Bedarf", "Wahlkriterien", "Weitere Kriterien", "Prüfung"];

export function KlaromatWizard({
  clientName,
  runNumber,
  label,
  createdAt,
  initialAnswers,
  guest = false,
  onComplete,
  onSaveDraft,
  onExit,
}: {
  clientName: string;
  runNumber?: number;
  label?: string;
  createdAt?: string;
  initialAnswers?: KlaromatAnswers;
  guest?: boolean;
  onComplete: (answers: KlaromatAnswers) => Promise<void>;
  onSaveDraft?: (answers: KlaromatAnswers) => Promise<void>;
  onExit?: () => void;
}) {
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [guestDraftOpen, setGuestDraftOpen] = useState(false);
  const [answers, setAnswers] = useState<KlaromatAnswers>(() => ({
    ...emptyAnswers(),
    ...initialAnswers,
    clientName,
  }));

  const bedarfe = useMemo(
    () => BEDARFE.filter((item) => item.areas.includes(answers.indication)),
    [answers.indication],
  );

  const runCaption = guest
    ? "Gast-Durchlauf · wird nicht gespeichert"
    : `Für ${clientName}  ·  Durchlauf ${label?.trim() || (runNumber ? `#${runNumber}` : createdAt ? formatDeDate(createdAt) : "")}`;

  async function submit() {
    setBusy(true);
    try {
      await onComplete({ ...answers, clientName });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Lauf konnte nicht gespeichert werden.",
      );
      setBusy(false);
    }
  }

  async function saveDraft() {
    if (!onSaveDraft) {
      if (guest) setGuestDraftOpen(true);
      return;
    }
    setBusy(true);
    try {
      await onSaveDraft({ ...answers, clientName });
      toast.success(`Entwurf in ${clientName} gespeichert. Sie können später fortsetzen.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Entwurf nicht gespeichert.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">Klar-o-Mat</p>
          <p className="mt-1 text-sm text-ink-muted">{runCaption}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {!guest ? <Badge tone="warn">Entwurf</Badge> : null}
          {guest ? (
            <Button variant="ghost" type="button" onClick={() => setGuestDraftOpen(true)}>
              Entwurf speichern
            </Button>
          ) : onSaveDraft ? (
            <Button
              variant="ghost"
              type="button"
              id="klaromat-save-draft"
              disabled={busy}
              onClick={() => void saveDraft()}
            >
              Entwurf speichern
            </Button>
          ) : null}
          {onExit ? (
            <Button variant="ghost" type="button" onClick={onExit}>
              Beenden
            </Button>
          ) : null}
        </div>
      </header>

      <ol className="mb-8 flex gap-1" aria-label="Fortschritt">
        {STEPS.map((stepLabel, index) => (
          <li
            key={stepLabel}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              index <= step ? "bg-primary" : "bg-bg-subtle",
            )}
          >
            <span className="sr-only">
              {stepLabel}
              {index === step ? ", aktueller Schritt" : ""}
            </span>
          </li>
        ))}
      </ol>
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
        Schritt {step + 1} von {STEPS.length}
      </p>
      <h1 className="mt-2 font-display text-3xl tracking-tight">{STEPS[step]}</h1>
      <p className="mt-2 text-sm text-ink-muted">
        <a href="#klaromat-help" className="text-primary hover:underline">
          Keine Diagnose eintragen. Bedarf reicht.
        </a>
      </p>

      <div className="mt-6 space-y-5">
        {step === 0 ? (
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">Indikationsbereich</legend>
            {INDICATIONS.map((item) => (
              <label
                key={item.id}
                className={cn(
                  "flex min-h-11 cursor-pointer gap-3 rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
                  answers.indication === item.id && "ring-2 ring-primary",
                )}
              >
                <input
                  type="radio"
                  name="indication"
                  className="mt-1"
                  checked={answers.indication === item.id}
                  onChange={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      indication: item.id,
                      bedarfe: [],
                    }))
                  }
                />
                <span>
                  <span className="block font-medium">{item.label}</span>
                  <span className="text-sm text-ink-muted">{item.hint}</span>
                </span>
              </label>
            ))}
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">Beschriebener Bedarf</legend>
            <p id="klaromat-help" className="text-sm text-ink-muted">
              Keine Diagnose eintragen. Bedarf reicht.
            </p>
            <div className="flex flex-wrap gap-2">
              {bedarfe.map((item) => (
                <Chip
                  key={item.id}
                  active={answers.bedarfe.includes(item.id)}
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      bedarfe: toggle(prev.bedarfe, item.id),
                    }))
                  }
                >
                  {item.label}
                </Chip>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <div className="space-y-6">
            <fieldset>
              <legend className="mb-2 text-sm font-medium">Bundesländer</legend>
              <div className="flex flex-wrap gap-2">
                {STATES.map((state) => (
                  <Chip
                    key={state.code}
                    active={answers.states.includes(state.code)}
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        states: toggle(prev.states, state.code),
                      }))
                    }
                  >
                    {state.name}
                  </Chip>
                ))}
              </div>
              <p className="mt-2 text-sm text-ink-muted">Keine Auswahl = bundesweit offen.</p>
            </fieldset>
            <Choice
              legend="Geschlechtsspezifisches Setting"
              options={GENDER_FILTERS}
              value={answers.genderSetting}
              onChange={(genderSetting) =>
                setAnswers((prev) => ({ ...prev, genderSetting }))
              }
            />
            <Choice
              legend="Behandlungssetting"
              options={SETTING_FILTERS}
              value={answers.setting}
              onChange={(setting) => setAnswers((prev) => ({ ...prev, setting }))}
            />
            <Choice
              legend="Dauer"
              options={DURATION_FILTERS}
              value={answers.durationPref}
              onChange={(durationPref) =>
                setAnswers((prev) => ({ ...prev, durationPref }))
              }
            />
            <label className="flex min-h-11 items-center gap-3">
              <input
                type="checkbox"
                checked={answers.ahb}
                onChange={(event) =>
                  setAnswers((prev) => ({ ...prev, ahb: event.target.checked }))
                }
              />
              Anschlussheilbehandlung (AHB) ist ein Wahlkriterium
            </label>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-5">
            <fieldset>
              <legend className="mb-2 text-sm font-medium">Weitere Wahlkriterien</legend>
              <div className="flex flex-wrap gap-2">
                {EXTRAS.map((item) => (
                  <Chip
                    key={item.id}
                    active={answers.extras.includes(item.id)}
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        extras: toggle(prev.extras, item.id),
                      }))
                    }
                  >
                    {item.label}
                  </Chip>
                ))}
              </div>
            </fieldset>
            <div className="space-y-2">
              <Label htmlFor="notes">Hinweise der Fachkraft</Label>
              <Textarea
                id="notes"
                value={answers.notes}
                onChange={(event) =>
                  setAnswers((prev) => ({ ...prev, notes: event.target.value }))
                }
              />
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-3 rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]">
            <p>
              <strong>Person:</strong>{" "}
              {guest ? "Gast-Durchlauf — Speichern erst nach Konto und Namen." : clientName}
            </p>
            <p>
              <strong>Bereich:</strong>{" "}
              {INDICATIONS.find((item) => item.id === answers.indication)?.label}
            </p>
            <p>
              <strong>Wahlkriterien:</strong>{" "}
              {[
                answers.states.length ? answers.states.join(", ") : "Region offen",
                answers.genderSetting,
                answers.setting,
                answers.ahb ? "AHB" : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <p className="text-sm text-ink-muted">
              Der Lauf erzeugt ein Ergebnis. Lohklar entscheidet keine Therapie und sagt
              keine Aufnahme zu. Wartezeiten sind Schätzungen.
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {step > 0 ? (
          <Button variant="secondary" type="button" onClick={() => setStep((s) => s - 1)}>
            Zurück
          </Button>
        ) : null}
        {step < STEPS.length - 1 ? (
          <Button
            type="button"
            id="klaromat-next"
            aria-label="Weiter zum nächsten Schritt"
            onClick={() => setStep((s) => s + 1)}
          >
            Weiter
          </Button>
        ) : (
          <Button type="button" id="klaromat-complete" disabled={busy} onClick={() => void submit()}>
            {busy ? "Abgleich läuft…" : "Treffer zeigen"}
          </Button>
        )}
      </div>

      {guestDraftOpen ? (
        <Modal titleId="guest-draft-title" title="Entwurf nur mit Konto">
          <p className="mt-2 text-sm text-ink-muted">
            Ordnen Sie diesen Durchlauf nach der Registrierung einem Namen zu.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild>
              <a href="/login">Jetzt Konto erstellen</a>
            </Button>
            <Button variant="ghost" type="button" onClick={() => setGuestDraftOpen(false)}>
              Ohne Speichern weiter
            </Button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

function toggle(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

function Chip({
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
        active ? "bg-primary text-primary-fg" : "bg-bg-subtle text-ink",
      )}
    >
      {children}
    </button>
  );
}

function Choice<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Chip
            key={option.id}
            active={value === option.id}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </Chip>
        ))}
      </div>
    </fieldset>
  );
}
