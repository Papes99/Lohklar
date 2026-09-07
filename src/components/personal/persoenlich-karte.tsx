import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Plus, X } from "lucide-react";
import { toast } from "sonner";
import {
  acceptPersonalSuggestion,
  addPersonalLine,
  dismissPersonalSuggestion,
  getPersonalCard,
  removePersonalLine,
  reopenPersonalSuggestion,
  restorePersonalLine,
} from "@/lib/server/personal-notes";
import {
  LINE_MAX,
  PERSONAL_SECTION_META,
  PERSONAL_SECTIONS,
  linesFor,
  type PersonalLine,
  type PersonalSection,
  type PersonalSuggestion,
} from "@/lib/domain/personal-notes";

export function PersoenlichKarte({ folderId, clientName }: { folderId: string; clientName: string }) {
  const queryClient = useQueryClient();
  const queryKey = ["personal-card", folderId];
  const cardQuery = useQuery({
    queryKey,
    queryFn: () => getPersonalCard({ data: folderId }),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey });

  if (cardQuery.isPending) {
    return (
      <article className="no-print rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]">
        <p className="text-sm text-ink-muted">Persönliche Notizen werden geladen…</p>
      </article>
    );
  }
  if (cardQuery.isError) {
    return (
      <article className="no-print rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]">
        <p className="text-sm text-ink-muted">Persönliche Notizen sind gerade nicht erreichbar.</p>
      </article>
    );
  }

  const card = cardQuery.data;
  const name = card.clientName || clientName;

  return (
    <article className="no-print rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]">
      <header className="mb-4">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
          Persönliche Notizen
        </p>
        <h2 className="mt-1 font-display text-2xl tracking-tight">Persönlich für {name}</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Ihre Zeilen zum Gespräch. Nicht der offizielle Klinik-Steckbrief.
        </p>
      </header>

      {card.suggestions.length > 0 ? (
        <VorschlagLeiste
          folderId={folderId}
          suggestions={card.suggestions}
          onChange={invalidate}
        />
      ) : null}

      <div className="grid gap-3 md:grid-cols-2">
        {PERSONAL_SECTIONS.map((section) => (
          <NoteSection
            key={section}
            folderId={folderId}
            section={section}
            lines={linesFor(card.lines, section)}
            onChange={invalidate}
          />
        ))}
      </div>
    </article>
  );
}

function VorschlagLeiste({
  folderId,
  suggestions,
  onChange,
}: {
  folderId: string;
  suggestions: PersonalSuggestion[];
  onChange: () => void;
}) {
  const accept = useMutation({
    mutationFn: (suggestion: PersonalSuggestion) =>
      acceptPersonalSuggestion({ data: { folderId, suggestionId: suggestion.id } }),
    onSuccess: (result, suggestion) => {
      onChange();
      toast("Vorschlag übernommen.", {
        action: {
          label: "Rückgängig",
          onClick: () => {
            void reopenPersonalSuggestion({
              data: { folderId, suggestionId: suggestion.id, removeLineId: result.line.id },
            }).then(onChange);
          },
        },
      });
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Übernehmen fehlgeschlagen."),
  });
  const dismiss = useMutation({
    mutationFn: (suggestion: PersonalSuggestion) =>
      dismissPersonalSuggestion({ data: { folderId, suggestionId: suggestion.id } }),
    onSuccess: (_ok, suggestion) => {
      onChange();
      toast("Vorschlag verworfen.", {
        action: {
          label: "Rückgängig",
          onClick: () => {
            void reopenPersonalSuggestion({ data: { folderId, suggestionId: suggestion.id } }).then(
              onChange,
            );
          },
        },
      });
    },
  });

  return (
    <section
      aria-label="Vorschläge aus dem Lohlotse"
      className="mb-4 rounded-[var(--radius-md)] bg-primary-soft/60 p-3"
    >
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">
        Vorschläge aus dem Lohlotse
      </p>
      <ul className="mt-2 space-y-2">
        {suggestions.map((item) => (
          <li
            key={item.id}
            className="rounded-[var(--radius-sm)] bg-surface px-3 py-2 shadow-[var(--shadow-border)]"
          >
            <p className="text-sm leading-snug">{item.body}</p>
            <p className="mt-1 text-xs text-ink-muted">{PERSONAL_SECTION_META[item.section].title}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-1 rounded-[var(--radius-sm)] bg-primary px-3 text-sm font-medium text-primary-fg hover:bg-primary-hover"
                disabled={accept.isPending || dismiss.isPending}
                onClick={() => accept.mutate(item)}
              >
                <Check className="size-4" aria-hidden />
                Übernehmen
              </button>
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-1 rounded-[var(--radius-sm)] px-3 text-sm font-medium text-ink-muted hover:bg-bg-subtle hover:text-ink"
                disabled={accept.isPending || dismiss.isPending}
                onClick={() => dismiss.mutate(item)}
              >
                <X className="size-4" aria-hidden />
                Verwerfen
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function NoteSection({
  folderId,
  section,
  lines,
  onChange,
}: {
  folderId: string;
  section: PersonalSection;
  lines: PersonalLine[];
  onChange: () => void;
}) {
  const meta = PERSONAL_SECTION_META[section];
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const add = useMutation({
    mutationFn: (body: string) => addPersonalLine({ data: { folderId, section, body } }),
    onSuccess: () => {
      setDraft("");
      setOpen(false);
      onChange();
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen."),
  });

  const remove = useMutation({
    mutationFn: (line: PersonalLine) => removePersonalLine({ data: { folderId, lineId: line.id } }),
    onSuccess: (result) => {
      onChange();
      if (!result.line) return;
      const line = result.line;
      toast("Zeile gestrichen.", {
        action: {
          label: "Rückgängig",
          onClick: () => {
            void restorePersonalLine({ data: { ...line, folderId } }).then(onChange);
          },
        },
      });
    },
  });

  function submit() {
    const body = draft.trim();
    if (!body || add.isPending) return;
    add.mutate(body);
  }

  const empty = lines.length === 0;

  return (
    <section className="rounded-[var(--radius-sm)] bg-bg-subtle/70 p-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium">{meta.title}</h3>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] text-ink-muted hover:bg-surface hover:text-ink"
          aria-label={`${meta.title}: Zeile hinzufügen`}
          onClick={() => setOpen(true)}
        >
          <Plus className="size-4" aria-hidden />
        </button>
      </div>

      {empty && !open ? (
        <button
          type="button"
          className="mt-2 min-h-11 w-full rounded-[var(--radius-sm)] px-1 py-2 text-left text-sm text-ink-subtle"
          onClick={() => setOpen(true)}
        >
          {meta.ghost}
        </button>
      ) : (
        <ul className="mt-1 divide-y divide-line/80">
          {lines.map((line) => (
            <li key={line.id} className="flex items-start gap-1 py-1">
              <p className="min-h-11 flex-1 py-2 text-sm leading-snug">{line.body}</p>
              <button
                type="button"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-ink-subtle hover:bg-surface hover:text-danger"
                aria-label="Zeile streichen"
                onClick={() => remove.mutate(line)}
              >
                <X className="size-4" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}

      {open ? (
        <form
          className="mt-2"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <label className="sr-only" htmlFor={`note-${section}`}>
            {empty ? meta.ghost : meta.more}
          </label>
          <input
            id={`note-${section}`}
            ref={inputRef}
            value={draft}
            maxLength={LINE_MAX}
            placeholder={empty ? meta.ghost : meta.more}
            className="h-11 w-full rounded-[var(--radius-sm)] bg-surface px-3 text-sm text-ink shadow-[var(--shadow-border)] placeholder:text-ink-subtle"
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setDraft("");
                setOpen(false);
              }
            }}
            onBlur={() => {
              if (!draft.trim()) setOpen(false);
              else submit();
            }}
          />
        </form>
      ) : null}
    </section>
  );
}
