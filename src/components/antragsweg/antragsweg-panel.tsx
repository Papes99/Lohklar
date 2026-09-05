import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DEADLINE_KINDS,
  DEADLINE_LABELS,
  DOC_STATUSES,
  DOC_STATUS_LABELS,
  KOSTENTRAEGER_LABELS,
  KOSTENTRAEGER_PFADE,
  summarizeAntragsweg,
  type DocStatus,
  type KostentraegerPfad,
} from "@/lib/domain/antragsweg";
import {
  addAntragDocument,
  getAntragsweg,
  removeAntragDocument,
  updateAntragDeadline,
  updateAntragDocument,
  updateAntragswegPfad,
} from "@/lib/server/antragsweg";
import { cn } from "@/lib/utils";

// berlinTodayYmd is in usage.ts — keep panel free of usage coupling:
function todayYmd(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return parts;
}

type Props = {
  folderId: string;
  clientName: string;
};

export function AntragswegPanel({ folderId, clientName }: Props) {
  const queryClient = useQueryClient();
  const queryKey = ["antragsweg", folderId] as const;
  const query = useQuery({
    queryKey,
    queryFn: () => getAntragsweg({ data: folderId }),
  });
  const [customLabel, setCustomLabel] = useState("");

  const summary = useMemo(() => {
    if (!query.data) return null;
    return summarizeAntragsweg(query.data, todayYmd());
  }, [query.data]);

  function invalidate(next?: Awaited<ReturnType<typeof getAntragsweg>>) {
    if (next) queryClient.setQueryData(queryKey, next);
    else void queryClient.invalidateQueries({ queryKey });
  }

  const pfadMutation = useMutation({
    mutationFn: (kostentraegerPfad: KostentraegerPfad) =>
      updateAntragswegPfad({ data: { folderId, kostentraegerPfad } }),
    onSuccess: (data) => {
      invalidate(data);
      toast.success("Kostenträger gespeichert.");
    },
    onError: (error) =>
      toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen."),
  });

  const docMutation = useMutation({
    mutationFn: (input: {
      documentId: string;
      status: DocStatus;
      note: string;
      label?: string;
    }) =>
      updateAntragDocument({
        data: {
          folderId,
          documentId: input.documentId,
          status: input.status,
          note: input.note,
          label: input.label,
        },
      }),
    onSuccess: (data) => {
      invalidate(data);
      toast.success("Unterlage gespeichert.");
    },
    onError: (error) =>
      toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen."),
  });

  const addMutation = useMutation({
    mutationFn: (label: string) => addAntragDocument({ data: { folderId, label } }),
    onSuccess: (data) => {
      setCustomLabel("");
      invalidate(data);
      toast.success("Unterlage hinzugefügt.");
    },
    onError: (error) =>
      toast.error(error instanceof Error ? error.message : "Hinzufügen fehlgeschlagen."),
  });

  const removeMutation = useMutation({
    mutationFn: (documentId: string) =>
      removeAntragDocument({ data: { folderId, documentId } }),
    onSuccess: (data) => {
      invalidate(data);
      toast.success("Unterlage entfernt.");
    },
    onError: (error) =>
      toast.error(error instanceof Error ? error.message : "Löschen fehlgeschlagen."),
  });

  const deadlineMutation = useMutation({
    mutationFn: (input: { kind: string; date: string | null; note: string }) =>
      updateAntragDeadline({
        data: {
          folderId,
          kind: input.kind,
          date: input.date,
          note: input.note,
        },
      }),
    onSuccess: (data) => {
      invalidate(data);
      toast.success("Frist gespeichert.");
    },
    onError: (error) =>
      toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen."),
  });

  if (query.isPending) {
    return <p className="text-ink-muted">Antragsweg wird geladen…</p>;
  }
  if (!query.data) {
    return <p>Antragsweg nicht gefunden.</p>;
  }

  const antrag = query.data;
  const today = todayYmd();

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display text-2xl tracking-tight">Antragsweg</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Organisation für {clientName}. Nur Status und Fristen — keine Diagnosen oder
          Befundinhalte.
        </p>
        {summary ? (
          <p className="mt-2 flex flex-wrap gap-2 text-sm">
            <Badge tone={summary.missing > 0 ? "warn" : "ok"}>
              {summary.missing} fehlt
            </Badge>
            <Badge tone="neutral">{summary.requested} angefordert</Badge>
            <Badge tone="ok">{summary.ready} vorhanden</Badge>
            {summary.overdue > 0 ? (
              <Badge tone="warn">Frist überschritten</Badge>
            ) : null}
          </p>
        ) : null}
      </div>

      <div className="space-y-2 rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]">
        <label htmlFor="kostentraeger" className="text-sm font-medium">
          Kostenträger-Pfad
        </label>
        <select
          id="kostentraeger"
          className="h-11 w-full max-w-md rounded-[var(--radius-md)] bg-bg-subtle px-3 text-base text-ink shadow-[var(--shadow-border)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          value={antrag.kostentraegerPfad}
          disabled={pfadMutation.isPending}
          onChange={(event) =>
            pfadMutation.mutate(event.target.value as KostentraegerPfad)
          }
        >
          {KOSTENTRAEGER_PFADE.map((pfad) => (
            <option key={pfad} value={pfad}>
              {KOSTENTRAEGER_LABELS[pfad]}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <h3 className="font-display text-xl tracking-tight">Unterlagen</h3>
        <ul className="space-y-3">
          {antrag.documents.map((doc) => (
            <li
              key={doc.id}
              className="rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-[12rem] flex-1">
                  <p className="font-medium">{doc.label}</p>
                  {doc.key == null ? (
                    <p className="text-xs text-ink-muted">Eigene Unterlage</p>
                  ) : null}
                </div>
                <select
                  aria-label={`Status ${doc.label}`}
                  className="h-11 min-w-[10rem] rounded-[var(--radius-md)] bg-bg-subtle px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  value={doc.status}
                  disabled={docMutation.isPending}
                  onChange={(event) =>
                    docMutation.mutate({
                      documentId: doc.id,
                      status: event.target.value as DocStatus,
                      note: doc.note,
                    })
                  }
                >
                  {DOC_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {DOC_STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-3 space-y-2">
                <label htmlFor={`note-${doc.id}`} className="text-xs font-medium text-ink-muted">
                  Kurznotiz (optional)
                </label>
                <Textarea
                  id={`note-${doc.id}`}
                  rows={2}
                  defaultValue={doc.note}
                  placeholder="Kurznotiz zur Organisation (optional)"
                  onBlur={(event) => {
                    const note = event.target.value;
                    if (note === doc.note) return;
                    docMutation.mutate({
                      documentId: doc.id,
                      status: doc.status,
                      note,
                    });
                  }}
                />
              </div>
              {doc.key == null ? (
                <div className="mt-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={removeMutation.isPending}
                    onClick={() => removeMutation.mutate(doc.id)}
                  >
                    Entfernen
                  </Button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-1">
          <Input
            value={customLabel}
            onChange={(event) => setCustomLabel(event.target.value)}
            placeholder="Weitere Unterlage"
            aria-label="Weitere Unterlage"
            className="max-w-sm"
          />
          <Button
            type="button"
            variant="secondary"
            disabled={addMutation.isPending || customLabel.trim().length < 2}
            onClick={() => addMutation.mutate(customLabel)}
          >
            Unterlage hinzufügen
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-display text-xl tracking-tight">Fristen</h3>
        <ul className="space-y-3">
          {DEADLINE_KINDS.map((kind) => {
            const item = antrag.deadlines.find((row) => row.kind === kind) ?? {
              kind,
              date: null,
              note: "",
            };
            const overdue =
              item.date &&
              item.date < today &&
              (kind === "widerspruchsfrist" || kind === "entscheidung_erwartet");
            return (
              <li
                key={kind}
                className={cn(
                  "rounded-[var(--radius-xl)] bg-surface p-4 shadow-[var(--shadow-border)]",
                  overdue && "ring-1 ring-amber-700/30",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{DEADLINE_LABELS[kind]}</p>
                  {overdue ? <Badge tone="warn">Frist überschritten</Badge> : null}
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-[12rem_1fr]">
                  <div className="space-y-1">
                    <label htmlFor={`date-${kind}`} className="text-xs font-medium text-ink-muted">
                      Datum
                    </label>
                    <Input
                      id={`date-${kind}`}
                      type="date"
                      defaultValue={item.date ?? ""}
                      onBlur={(event) => {
                        const date = event.target.value || null;
                        if (date === item.date) return;
                        deadlineMutation.mutate({
                          kind,
                          date,
                          note: item.note,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor={`dnote-${kind}`} className="text-xs font-medium text-ink-muted">
                      Kurznotiz
                    </label>
                    <Input
                      id={`dnote-${kind}`}
                      defaultValue={item.note}
                      placeholder="Kurznotiz zur Organisation (optional)"
                      onBlur={(event) => {
                        const note = event.target.value;
                        if (note === item.note) return;
                        deadlineMutation.mutate({
                          kind,
                          date: item.date,
                          note,
                        });
                      }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
