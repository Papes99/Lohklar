import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CheckSquare, ChevronDown, ChevronUp, FileDown, Plus, Printer } from "lucide-react";
import { FoundedLine } from "@/components/brand/wordmark";
import { HouseBlock, ParkedHouse } from "@/components/dokument/house-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  documentFooterLines,
  emptyExtra,
  formatDataAsOf,
  moveItem,
  parkHouse,
  restoreHouse,
  type DocumentBody,
  type DocumentExtra,
} from "@/lib/domain/document";
import { buildDocxBlob, documentFileStem } from "@/lib/domain/document-export";
import { formatDeDate, formatDeDateTime, formatDeTime, formatRunStatus } from "@/lib/format";
import {
  markRunFertig,
  restoreDocumentVersion,
  updateResultDocument,
  type ResultDocument,
  type RunRecord,
} from "@/lib/server/cases";

export function Ergebnisdokument({
  run,
  clientName,
}: {
  run: RunRecord & { document: ResultDocument };
  clientName: string;
  clinics?: unknown;
}) {
  const doc = run.document;
  const queryClient = useQueryClient();
  const [body, setBody] = useState<DocumentBody>(doc.body);
  const [versions, setVersions] = useState(doc.versions);
  const [status, setStatus] = useState<"idle" | "dirty" | "saving" | "saved">("idle");
  const [savedAt, setSavedAt] = useState(doc.updatedAt);
  const [runStatus, setRunStatus] = useState(run.status);
  const [dragId, setDragId] = useState<string | null>(null);
  const skipSave = useRef(true);
  const bodyRef = useRef(body);
  bodyRef.current = body;

  const label = run.label.trim() || `Lauf ${run.runNumber}`;

  useEffect(() => {
    setBody(doc.body);
    setVersions(doc.versions);
    skipSave.current = true;
    setStatus("idle");
  }, [doc.id, doc.updatedAt]);

  useEffect(() => {
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    setStatus("dirty");
    const handle = window.setTimeout(() => {
      void persist({ snapshot: false });
    }, 900);
    return () => window.clearTimeout(handle);
  }, [body]);

  async function persist(opts: { snapshot: boolean; exported?: boolean }) {
    setStatus("saving");
    try {
      const result = await updateResultDocument({
        data: {
          documentId: doc.id,
          body: bodyRef.current,
          snapshot: opts.snapshot,
          exported: opts.exported,
        },
      });
      setVersions(result.versions);
      setStatus("saved");
      setSavedAt(result.updatedAt);
      if (opts.snapshot || opts.exported) {
        await queryClient.invalidateQueries({ queryKey: ["folder", run.folderId] });
      }
    } catch (error) {
      setStatus("dirty");
      toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen.");
    }
  }

  function patchHouse(clinicId: string, next: DocumentBody["houses"][number]) {
    setBody((prev) => ({
      ...prev,
      houses: prev.houses.map((house) => (house.clinicId === clinicId ? next : house)),
    }));
  }

  function moveHouse(from: number, to: number) {
    setBody((prev) => ({ ...prev, houses: moveItem(prev.houses, from, to) }));
  }

  async function onExportPdf() {
    await persist({ snapshot: true, exported: true });
    toast.success(`Export gespeichert im Ordner ${clientName}.`);
    window.print();
  }

  async function onMarkFertig() {
    try {
      await persist({ snapshot: true });
      await markRunFertig({ data: { runId: run.id } });
      setRunStatus("fertig");
      toast.success("Dokument als fertig markiert.");
      await queryClient.invalidateQueries({ queryKey: ["folder", run.folderId] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Status nicht gesetzt.");
    }
  }

  async function onExportDocx() {
    try {
      await persist({ snapshot: true, exported: true });
      const blob = await buildDocxBlob(bodyRef.current, {
        clientName,
        label,
        dateIso: run.createdAt,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${documentFileStem({ clientName, label, dateIso: run.createdAt })}.docx`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Export gespeichert im Ordner ${clientName}.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "DOCX-Export fehlgeschlagen.");
    }
  }

  async function onSnapshot() {
    await persist({ snapshot: true });
    toast.success("Version im Fallordner gesichert.");
  }

  async function onRestore(version: number) {
    try {
      const result = await restoreDocumentVersion({
        data: { documentId: doc.id, version },
      });
      skipSave.current = true;
      setBody(result.body);
      setStatus("saved");
      toast.success(`Version ${version} wiederhergestellt.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Version nicht geladen.");
    }
  }

  return (
    <article id="ergebnisdokument" className="dokument space-y-8">
      <div className="print-only space-y-3">
        <FoundedLine />
        <h1 className="font-display text-4xl">Ergebnisdokument</h1>
        <p className="text-lg">
          {clientName} · {label} · {formatDeDate(run.createdAt)}
        </p>
      </div>

      <header className="no-print space-y-4">
        <FoundedLine />
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
              Ergebnisdokument
            </p>
            <h2 className="font-display text-3xl tracking-tight">
              {clientName}
              <span className="text-ink-muted"> · {label}</span>
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              {formatDeDate(run.createdAt)} · Datenstand {formatDataAsOf(body.dataAsOf)}
            </p>
            <Badge className="mt-2" tone={runStatus === "entwurf" ? "warn" : "ok"}>
              {formatRunStatus(runStatus)}
            </Badge>
          </div>
          <SaveChip status={status} savedAt={savedAt} />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" type="button" onClick={() => document.getElementById("dokument-houses")?.scrollIntoView({ behavior: "smooth" })}>
            Reihenfolge ändern
          </Button>
          <Button id="dokument-export-pdf" type="button" onClick={() => void onExportPdf()}>
            <Printer className="size-4" aria-hidden="true" />
            PDF
          </Button>
          <Button
            id="dokument-export-docx"
            variant="secondary"
            type="button"
            onClick={() => void onExportDocx()}
          >
            <FileDown className="size-4" aria-hidden="true" />
            DOCX
          </Button>
          {runStatus === "entwurf" ? (
            <Button variant="secondary" type="button" onClick={() => void onMarkFertig()}>
              Als fertig markieren
            </Button>
          ) : null}
          <Button
            id="dokument-save-version"
            variant="secondary"
            type="button"
            onClick={() => void onSnapshot()}
          >
            Version sichern
          </Button>
        </div>
        {versions.length > 0 ? (
          <label className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
            Version im Fallordner
            <select
              id="dokument-versions"
              className="h-11 rounded-[var(--radius-md)] bg-surface px-3 text-ink shadow-[var(--shadow-border)]"
              defaultValue=""
              onChange={(event) => {
                const value = Number(event.target.value);
                event.currentTarget.value = "";
                if (value) void onRestore(value);
              }}
            >
              <option value="">Aktuellen Arbeitsstand behalten</option>
              {versions.map((item) => (
                <option key={item.version} value={item.version}>
                  Version {item.version} · {formatDeDateTime(item.createdAt)}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </header>

      <section>
        <h3 className="font-display text-2xl tracking-tight">Bedarfe</h3>
        <p className="mt-1 text-sm text-ink-muted no-print">
          Ergebnisformulierung, kein Fragenkatalog.
        </p>
        <Textarea
          id="dokument-needs"
          className="no-print mt-3"
          value={body.needsText}
          onChange={(event) => setBody((prev) => ({ ...prev, needsText: event.target.value }))}
        />
        <p className="print-only mt-3 text-sm">{body.needsText}</p>
      </section>

      <section>
        <h3 className="font-display text-2xl tracking-tight">Rangfolge der Häuser</h3>
        {body.houses.length === 0 ? (
          <p className="mt-3 text-ink-muted">Noch keine Häuser in diesem Dokument.</p>
        ) : (
          <ol className="mt-3 space-y-1 text-sm">
            {body.houses.map((house, index) => (
              <li key={house.clinicId}>
                <span className="tabular-nums text-ink-muted">{index + 1}. </span>
                {house.clinicName}
                <span className="text-ink-muted"> · {house.location}</span>
              </li>
            ))}
          </ol>
        )}
      </section>

      <div id="dokument-houses" className="space-y-4">
        {body.houses.map((house, index) => (
          <HouseBlock
            key={house.clinicId}
            house={house}
            rank={index + 1}
            total={body.houses.length}
            onChange={(next) => patchHouse(house.clinicId, next)}
            onMove={(dir) => moveHouse(index, index + dir)}
            onPark={() => setBody((prev) => parkHouse(prev, house.clinicId))}
            onDragStart={() => setDragId(house.clinicId)}
            onDrop={() => {
              if (!dragId) return;
              const from = body.houses.findIndex((item) => item.clinicId === dragId);
              setDragId(null);
              if (from >= 0) moveHouse(from, index);
            }}
          />
        ))}
      </div>

      {body.parked.length > 0 ? (
        <section className="no-print">
          <h3 className="font-display text-xl tracking-tight">Aus diesem Dokument genommen</h3>
          <p className="mt-1 text-sm text-ink-muted">
            Nur dieses Ergebnis. Der Klinik-Steckbrief im Katalog bleibt.
          </p>
          <ul className="mt-3 space-y-2">
            {body.parked.map((house) => (
              <ParkedHouse
                key={house.clinicId}
                house={house}
                onRestore={() => setBody((prev) => restoreHouse(prev, house.clinicId))}
              />
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h3 className="font-display text-2xl tracking-tight">Eigene Absätze und To-dos</h3>
          <div className="no-print flex flex-wrap gap-2">
            <Button
              id="dokument-add-absatz"
              variant="secondary"
              size="sm"
              type="button"
              onClick={() =>
                setBody((prev) => ({ ...prev, extras: [...prev.extras, emptyExtra("absatz")] }))
              }
            >
              <Plus className="size-4" aria-hidden="true" />
              Absatz
            </Button>
            <Button
              id="dokument-add-todo"
              variant="secondary"
              size="sm"
              type="button"
              onClick={() =>
                setBody((prev) => ({ ...prev, extras: [...prev.extras, emptyExtra("todo")] }))
              }
            >
              <CheckSquare className="size-4" aria-hidden="true" />
              To-do
            </Button>
          </div>
        </div>
        {body.extras.length === 0 ? (
          <p className="mt-3 text-sm text-ink-muted">Noch keine eigenen Absätze.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {body.extras.map((extra, index) => (
              <li key={extra.id}>
                <ExtraCard
                  extra={extra}
                  index={index}
                  total={body.extras.length}
                  onChange={(next) =>
                    setBody((prev) => ({
                      ...prev,
                      extras: prev.extras.map((item) => (item.id === extra.id ? next : item)),
                    }))
                  }
                  onMove={(dir) =>
                    setBody((prev) => ({
                      ...prev,
                      extras: moveItem(prev.extras, index, index + dir),
                    }))
                  }
                  onRemove={() =>
                    setBody((prev) => ({
                      ...prev,
                      extras: prev.extras.filter((item) => item.id !== extra.id),
                    }))
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="font-display text-2xl tracking-tight">Eigene Notizen der Fachkraft</h3>
        <Textarea
          id="dokument-staff-notes"
          className="no-print mt-3"
          value={body.staffNotes}
          placeholder="Eigene To-dos oder Absprachen mit Kostenträger."
          onChange={(event) => setBody((prev) => ({ ...prev, staffNotes: event.target.value }))}
        />
        <p className="print-only mt-3 text-sm">
          {body.staffNotes.trim() ? body.staffNotes : "Keine eigenen Notizen."}
        </p>
      </section>

      <footer className="space-y-1 border-t border-line pt-4 text-sm text-ink-muted">
        {documentFooterLines(body).map((line) => (
          <p key={line}>{line}</p>
        ))}
        <FoundedLine className="pt-2" />
      </footer>
    </article>
  );
}

function SaveChip({
  status,
  savedAt,
}: {
  status: "idle" | "dirty" | "saving" | "saved";
  savedAt?: string;
}) {
  const time = savedAt ? formatDeTime(savedAt) : "";
  const label =
    status === "saving"
      ? "Speichert…"
      : status === "saved"
        ? time
          ? `Gespeichert ${time}`
          : "Gespeichert"
        : status === "dirty"
          ? "Ungesichert"
          : "Autosave";
  return (
    <Badge
      tone={status === "saved" ? "ok" : status === "dirty" ? "warn" : "neutral"}
      aria-live="polite"
    >
      {label}
    </Badge>
  );
}

function ExtraCard({
  extra,
  index,
  total,
  onChange,
  onMove,
  onRemove,
}: {
  extra: DocumentExtra;
  index: number;
  total: number;
  onChange: (next: DocumentExtra) => void;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
      <div className="flex flex-wrap items-center gap-2">
        {extra.kind === "todo" ? (
          <label className="flex min-h-11 items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={extra.done}
              onChange={(event) => onChange({ ...extra, done: event.target.checked })}
            />
            To-do
          </label>
        ) : (
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
            Absatz
          </span>
        )}
        <Input
          className="no-print max-w-sm"
          value={extra.title}
          aria-label="Titel"
          onChange={(event) => onChange({ ...extra, title: event.target.value })}
        />
        <span className="print-only font-medium">{extra.title}</span>
        <div className="no-print ml-auto flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            aria-label="Nach oben"
            disabled={index === 0}
            onClick={() => onMove(-1)}
          >
            <ChevronUp className="size-4" aria-hidden="true" />
            Nach oben
          </Button>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            aria-label="Nach unten"
            disabled={index === total - 1}
            onClick={() => onMove(1)}
          >
            <ChevronDown className="size-4" aria-hidden="true" />
            Nach unten
          </Button>
          <Button variant="ghost" size="sm" type="button" onClick={onRemove}>
            Entfernen
          </Button>
        </div>
      </div>
      <Textarea
        className="no-print mt-3 min-h-20"
        value={extra.text}
        onChange={(event) => onChange({ ...extra, text: event.target.value })}
      />
      <p className="print-only mt-2 text-sm">{extra.text}</p>
    </div>
  );
}
