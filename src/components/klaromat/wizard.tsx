import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import {
  ACCESS_FILTERS,
  BEDARFE,
  DISTANCE_FILTERS,
  DURATION_FILTERS,
  GENDER_FILTERS,
  INDICATIONS,
  LAGE_FILTERS,
  PAYER_FILTERS,
  PERSON_GENDER_FILTERS,
  ROOM_FILTERS,
  SETTING_FILTERS,
  STATES,
  WAIT_FILTERS,
  YES_FILTERS,
  type KlaromatAnswers,
} from "@/lib/domain/types";
import { emptyAnswers, listedNeeds, normalizeAnswers } from "@/lib/domain/matching";
import { formatDeDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const STEPS = [
  "Auftrag",
  "Aufnahme",
  "Medizin",
  "Setting",
  "Wohnen und Familie",
  "Ort und Zeit",
  "Prüfung",
];

const STEP_LEADS = [
  "Auftrag und Kostenträger — ohne Diagnose. Dual nur, wenn Sucht und eine psychische Erkrankung im selben Haus nötig sind.",
  "Welche Substanzen oder psychosomatischen Schwerpunkte das Haus ausgewiesen haben muss.",
  "Substitution, Traumafokus, Medizinisch-Psychologische Untersuchung (MPU) und Therapie statt Strafe — nur setzen, was das Haus vorhalten muss.",
  "Stationär, Tagesklinik oder Adaption; Anschlussheilbehandlung (AHB) oder Heilverfahren.",
  "Einbettzimmer oder kein Mehrbettzimmer, Barrierefreiheit, Familie — nur setzen, was wirklich nötig ist.",
  "Bundesland, Wohnortnähe, Umgebung. Wartezeiten sind Schätzungen, keine Aufnahmezusage.",
  "Prüfen Sie die gesetzten Anforderungen in Alltagssprache, bevor die Rangliste entsteht.",
];

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
  const [answers, setAnswers] = useState<KlaromatAnswers>(() =>
    normalizeAnswers({
      ...emptyAnswers(),
      ...initialAnswers,
      clientName,
    }),
  );

  const substances = useMemo(
    () =>
      BEDARFE.filter(
        (item) =>
          item.areas.includes(answers.indication) &&
          ["alkohol", "drogen", "medikamente", "gluecksspiel"].includes(item.id),
      ),
    [answers.indication],
  );
  const psychoBedarfe = useMemo(
    () =>
      BEDARFE.filter(
        (item) =>
          item.areas.includes(answers.indication) &&
          ["depression", "angst", "trauma", "erschopfung", "schmerz", "ess"].includes(item.id),
      ),
    [answers.indication],
  );

  const runCaption = guest
    ? "Gast-Durchlauf · wird nicht gespeichert"
    : `Für ${clientName}  ·  Durchlauf ${label?.trim() || (runNumber ? `#${runNumber}` : createdAt ? formatDeDate(createdAt) : "")}`;

  const needs = listedNeeds(answers);

  async function submit() {
    setBusy(true);
    try {
      await onComplete(normalizeAnswers({ ...answers, clientName }));
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
      await onSaveDraft(normalizeAnswers({ ...answers, clientName }));
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
      <p className="mt-2 text-sm text-ink-muted">{STEP_LEADS[step]}</p>

      <div className="mt-6 space-y-5">
        {step === 0 ? (
          <div className="space-y-6">
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium">Auftrag</legend>
              <p className="text-sm text-ink-muted">
                Was der Kostenträger voraussichtlich finanzieren soll. Keine Diagnose. Dual heißt:
                Sucht und eine psychische Erkrankung im selben Haus — nicht zwei getrennte Aufenthalte.
              </p>
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
            <Choice
              legend="Geschlecht der Person"
              hint="Ausschluss, keine bloße Präferenz: Frauenspezifische Häuser nehmen keine Männer auf — und umgekehrt. Keine Vorgabe, wenn das Geschlecht die Aufnahme nicht begrenzt."
              options={PERSON_GENDER_FILTERS}
              value={answers.personGender}
              onChange={(personGender) => setAnswers((prev) => ({ ...prev, personGender }))}
            />
            <Choice
              legend="Kostenträger"
              hint="Die Deutsche Rentenversicherung (DRV) ist der übliche Weg in die medizinische Reha. Die gesetzliche Krankenversicherung (GKV) vor allem bei Anschlussheilbehandlung (AHB) nach Krankenhaus oder wenn die Rente nicht greift. Beihilfe weist der Steckbrief derzeit nicht aus."
              options={PAYER_FILTERS}
              value={answers.payer}
              onChange={(payer) => setAnswers((prev) => ({ ...prev, payer }))}
            />
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-6">
            {substances.length > 0 ? (
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium">Welche Substanzen muss das Haus aufnehmen?</legend>
                <p id="klaromat-help" className="text-sm text-ink-muted">
                  Nur setzen, was wirklich Aufnahmeauftrag sein muss. Jede gesetzte Substanz schließt
                  Häuser ohne diesen Auftrag aus. Keine Diagnose eintragen — der Bedarf reicht.
                </p>
                <div className="flex flex-wrap gap-2">
                  {substances.map((item) => (
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
            {psychoBedarfe.length > 0 ? (
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium">Psychosomatische Schwerpunkte</legend>
                <p className="text-sm text-ink-muted">
                  Nur setzen, was das Haus ausgewiesen haben muss. Essverhalten und Trauma-Folgen sind
                  Schwerpunkte des Hauses, nicht jede belastete Biografie. Keine Diagnose eintragen.
                </p>
                <div className="flex flex-wrap gap-2">
                  {psychoBedarfe.map((item) => (
                    <Chip
                      key={item.id}
                      active={answers.bedarfe.includes(item.id)}
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          bedarfe: toggle(prev.bedarfe, item.id),
                          traumaNeed:
                            item.id === "trauma" && !prev.bedarfe.includes("trauma")
                              ? "ja"
                              : item.id === "trauma"
                                ? "egal"
                                : prev.traumaNeed,
                        }))
                      }
                    >
                      {item.label}
                    </Chip>
                  ))}
                </div>
              </fieldset>
            ) : (
              <p id="klaromat-help" className="text-sm text-ink-muted">
                Keine Diagnose eintragen. Bedarf reicht.
              </p>
            )}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-6">
            {answers.indication !== "psychosomatik" ? (
              <Choice
                legend="Substitution"
                hint="Substitution heißt: ein Opioid-Ersatzmittel (zum Beispiel Methadon oder Buprenorphin) wird während der Reha weitergeführt. Wenn das nötig ist, fallen Häuser ohne diesen Auftrag raus. Welche Mittel das Haus führt, steht im Steckbrief unter Medizin."
                options={[
                  { id: "egal", label: "Keine Vorgabe" },
                  { id: "ja", label: "Muss weitergeführt werden" },
                  { id: "nein", label: "Nicht nötig" },
                ]}
                value={answers.substitutionNeed}
                onChange={(substitutionNeed) => setAnswers((prev) => ({ ...prev, substitutionNeed }))}
              />
            ) : null}
            {answers.indication === "sucht" && !answers.bedarfe.includes("trauma") ? (
              <Choice
                legend="Traumafokus"
                hint="Nur wenn das Haus einen ausgewiesenen Traumaschwerpunkt vorhalten muss — Trauma-Folgen als eigener Behandlungsschwerpunkt, nicht jede belastete Biografie. Lohklar wählt keine Therapie und stellt keine Diagnose."
                options={YES_FILTERS}
                value={answers.traumaNeed}
                onChange={(traumaNeed) => setAnswers((prev) => ({ ...prev, traumaNeed }))}
              />
            ) : null}
            {answers.indication !== "psychosomatik" ? (
              <Choice
                legend="Vorbereitung auf die Medizinisch-Psychologische Untersuchung (MPU)"
                hint="Die Medizinisch-Psychologische Untersuchung (MPU) prüft die Fahreignung, oft nach Verkehrsdelikten unter Suchtmittel. Nur setzen, wenn das Haus eine ausgewiesene Vorbereitung vorhalten muss. Die Untersuchung selbst macht Lohklar nicht."
                options={YES_FILTERS}
                value={answers.mpuNeed}
                onChange={(mpuNeed) => setAnswers((prev) => ({ ...prev, mpuNeed }))}
              />
            ) : null}
            {answers.indication !== "psychosomatik" ? (
              <Choice
                legend="Therapie statt Strafe (§ 35 Betäubungsmittelgesetz)"
                hint="§ 35 Betäubungsmittelgesetz (BtMG): Therapie statt Strafe. Nur Häuser mit ausgewiesener Anerkennung, vorrangig bei illegalen Drogen. Nicht für reine Alkoholabhängigkeit. Die Entscheidung trifft Staatsanwaltschaft bzw. Gericht, nicht Lohklar."
                options={YES_FILTERS}
                value={answers.klinikStattStrafeNeed}
                onChange={(klinikStattStrafeNeed) =>
                  setAnswers((prev) => ({ ...prev, klinikStattStrafeNeed }))
                }
              />
            ) : null}
            <div className="rounded-[var(--radius-lg)] bg-surface p-4 text-sm shadow-[var(--shadow-border)]">
              <p className="font-medium">Vor der Reha klären, nicht hier setzen</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-muted">
                <li>Offener Entzug und akute Krise schließen in allen Kataloghäusern aus. Entgiftung steht vorher.</li>
                <li>Lohklar sagt keine Aufnahme zu und schreibt nicht an den Kostenträger.</li>
              </ul>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-6">
            <Choice
              legend="Behandlungssetting"
              hint="Tagesklinik: die Person wohnt zu Hause und kommt täglich. Stationär: Wohnen im Haus. Adaption: Anschlusswohnen und Nachsorge nach abgeschlossener Entwöhnung — nicht die Entwöhnung selbst."
              options={SETTING_FILTERS}
              value={answers.setting}
              onChange={(setting) => setAnswers((prev) => ({ ...prev, setting }))}
            />
            <Choice
              legend="Zugang"
              hint="Anschlussheilbehandlung (AHB): Reha zeitnah nach einem Krankenhausaufenthalt; den Antrag stellt in der Regel schon der Klinik-Sozialdienst. Heilverfahren: geplante Reha über die Deutsche Rentenversicherung (DRV) oder die gesetzliche Krankenversicherung (GKV), nach Kostenzusage — nicht direkt nach dem Krankenhaus. Häuser ohne AHB-Auftrag scheiden aus, wenn Sie AHB setzen."
              options={ACCESS_FILTERS}
              value={answers.access}
              onChange={(access) => setAnswers((prev) => ({ ...prev, access, ahb: access === "ahb" }))}
            />
            <Choice
              legend="Dauer"
              hint="Sucht-Entwöhnung meist 12–16 Wochen, Psychosomatik oft 4–6, Essstörungen oft länger. Immer nach Kostenzusage — Lohklar sagt keine Aufnahme zu."
              options={DURATION_FILTERS}
              value={answers.durationPref}
              onChange={(durationPref) => setAnswers((prev) => ({ ...prev, durationPref }))}
            />
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-6">
            <Choice
              legend="Zimmer"
              hint="Einbettzimmer: allein im Zimmer (Einzelzimmer). Kein Mehrbettzimmer: Zweibett ist in Ordnung, drei oder mehr Betten nicht. Viele Häuser weisen die Zimmerart nicht aus — dann Rückfrage beim Haus, kein Ausschluss nur wegen „Angabe liegt nicht vor.“"
              options={ROOM_FILTERS}
              value={answers.roomPref}
              onChange={(roomPref) => setAnswers((prev) => ({ ...prev, roomPref }))}
            />
            <Choice
              legend="Barrierefreiheit"
              hint="Rollstuhl, Gehhilfe, keine Stockwerke ohne Aufzug. Fehlt die Angabe im Steckbrief, rangiert das Haus nicht vorne — es fällt aber nicht automatisch raus."
              options={YES_FILTERS}
              value={answers.mobilityNeed}
              onChange={(mobilityNeed) => setAnswers((prev) => ({ ...prev, mobilityNeed }))}
            />
            <Choice
              legend="Kinder mit ins Haus"
              hint="Mutter-Kind- oder Eltern-Kind-Platz. Nur wenige Häuser. Ohne diesen Bedarf nicht setzen — sonst bleiben fast alle Häuser außen vor."
              options={YES_FILTERS}
              value={answers.childrenNeed}
              onChange={(childrenNeed) => setAnswers((prev) => ({ ...prev, childrenNeed }))}
            />
            <Choice
              legend="Angehörigenarbeit"
              hint="Angehörigenseminar, Bezugspersonenarbeit. Nur setzen, wenn das Haus das ausweisen muss."
              options={YES_FILTERS}
              value={answers.familyWorkNeed}
              onChange={(familyWorkNeed) => setAnswers((prev) => ({ ...prev, familyWorkNeed }))}
            />
            <Choice
              legend="Junge Erwachsene"
              hint="Eigene Gruppe etwa 18–27 Jahre. Nur setzen, wenn das Haus das ausweisen muss."
              options={YES_FILTERS}
              value={answers.youngAdultNeed}
              onChange={(youngAdultNeed) => setAnswers((prev) => ({ ...prev, youngAdultNeed }))}
            />
            <Choice
              legend="Geschlechtsspezifisches Haus"
              hint="Nur setzen, wenn ein Frauen- oder Männerhaus gewünscht ist — nicht verwechseln mit dem Geschlecht der Person oben im Auftrag."
              options={GENDER_FILTERS}
              value={answers.genderSetting}
              onChange={(genderSetting) => setAnswers((prev) => ({ ...prev, genderSetting }))}
            />
          </div>
        ) : null}

        {step === 5 ? (
          <div className="space-y-6">
            <fieldset>
              <legend className="mb-2 text-sm font-medium">Bundesländer</legend>
              <p className="mb-3 text-sm text-ink-muted">
                Wohnortnähe für Kinder, Arbeit und Nachsorge. Distanz zum gewohnten Umfeld kann
                gewollt sein.
              </p>
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
              <label className="mt-3 flex min-h-11 items-center gap-3">
                <input
                  type="checkbox"
                  checked={answers.nearbyStatesOk}
                  onChange={(event) =>
                    setAnswers((prev) => ({ ...prev, nearbyStatesOk: event.target.checked }))
                  }
                />
                Nachbarländer mitbewerten, wenn das Wunschland knapp ist
              </label>
            </fieldset>
            <Choice
              legend="Wohnortnähe"
              hint="Insel- oder Reizklima (etwa Borkum) trennt vom gewohnten Umfeld, erschwert aber Besuch und Nachsorge."
              options={DISTANCE_FILTERS}
              value={answers.distancePref}
              onChange={(distancePref) => setAnswers((prev) => ({ ...prev, distancePref }))}
            />
            <Choice
              legend="Umgebung"
              hint="Am Wasser, Insel, ländlich, städtisch, Kurort oder Mittelgebirge — nur soweit der Steckbrief die Lage ausweist. Fehlt die Angabe, rangiert das Haus nicht vorne, es fällt nicht raus."
              options={LAGE_FILTERS}
              value={answers.lagePref}
              onChange={(lagePref) => setAnswers((prev) => ({ ...prev, lagePref }))}
            />
            <Choice
              legend="Wartezeit"
              hint="Schätzung, keine Live-Warteliste und keine Aufnahmezusage. Substanz, Geschlecht und Substitution wiegen schwerer als die Wartezeit."
              options={WAIT_FILTERS}
              value={answers.waitPref}
              onChange={(waitPref) => setAnswers((prev) => ({ ...prev, waitPref }))}
            />
            <div className="space-y-2">
              <Label htmlFor="notes">Hinweise der Fachkraft</Label>
              <Textarea
                id="notes"
                value={answers.notes}
                onChange={(event) => setAnswers((prev) => ({ ...prev, notes: event.target.value }))}
              />
              <p className="text-sm text-ink-muted">Keine Diagnose, kein Klientinnenname in diesem Feld nötig.</p>
            </div>
          </div>
        ) : null}

        {step === 6 ? (
          <div className="space-y-4 rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]">
            <p>
              <strong>Person:</strong>{" "}
              {guest ? "Gast-Durchlauf — Speichern erst nach Konto und Namen." : clientName}
            </p>
            <div>
              <p className="text-sm font-medium">Gesetzte Anforderungen</p>
              <ul className="mt-2 space-y-1 text-sm">
                {needs.map((item) => (
                  <li key={`${item.criterion}-${item.value}`}>
                    {item.criterion}: {item.value}
                  </li>
                ))}
              </ul>
            </div>
            {answers.notes.trim() ? (
              <p className="text-sm">
                <strong>Hinweis:</strong> {answers.notes.trim()}
              </p>
            ) : null}
            <p className="text-sm text-ink-muted">
              Der Lauf erzeugt eine Rangliste über den Katalog. Oben stehen die Häuser, die diese
              Anforderungen decken. Häuser mit Ausschluss — falscher Auftrag, Substanz, Geschlecht,
              Substitution, Kinder, Anschlussheilbehandlung (AHB) oder Setting — stehen unten.
              Lohklar entscheidet keine Therapie und sagt keine Aufnahme zu. Wartezeiten sind
              Schätzungen.
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
            {busy ? "Abgleich läuft…" : "Rangliste zeigen"}
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
  hint,
  options,
  value,
  onChange,
}: {
  legend: string;
  hint?: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">{legend}</legend>
      {hint ? <p className="mb-3 text-sm text-ink-muted">{hint}</p> : null}
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
