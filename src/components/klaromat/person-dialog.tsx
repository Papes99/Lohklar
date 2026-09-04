import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { filterFolders } from "@/lib/domain/folder-search";
import { formatDeDate, formatRunStatus } from "@/lib/format";
import { startExistingPerson, startNewPerson, type FolderSummary } from "@/lib/server/cases";
import { cn } from "@/lib/utils";

type View = "choose" | "new" | "existing";

export function PersonDialog({
  folders,
  preselectedFolderId,
}: {
  folders: FolderSummary[];
  preselectedFolderId?: string;
}) {
  const navigate = useNavigate();
  const usable = folders.filter((folder) => folder.runCount >= 1);
  const hasFolders = usable.length > 0;
  const [view, setView] = useState<View>(
    preselectedFolderId && hasFolders ? "existing" : "choose",
  );
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [fileRef, setFileRef] = useState("");
  const [note, setNote] = useState("");
  const [query, setQuery] = useState("");
  const [folderId, setFolderId] = useState(preselectedFolderId ?? "");
  const [label, setLabel] = useState("");
  const [busy, setBusy] = useState(false);

  const matches = useMemo(() => filterFolders(usable, query).slice(0, 8), [usable, query]);
  const selected = usable.find((folder) => folder.id === folderId);

  function onSearch(value: string) {
    setQuery(value);
    const next = filterFolders(usable, value).slice(0, 8);
    if (!value.trim()) return;
    if (!next.some((folder) => folder.id === folderId) && next[0]) {
      setFolderId(next[0].id);
    }
  }

  async function submitNew() {
    if (name.trim().length < 2) {
      setNameError("Bitte einen Namen vergeben. Der Name gehört zum Ordner.");
      return;
    }
    setBusy(true);
    try {
      const result = await startNewPerson({
        data: { clientName: name, fileRef, internalNote: note },
      });
      await navigate({ to: "/app/klar-o-mat", search: { run: result.runId } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Start fehlgeschlagen.");
      setBusy(false);
    }
  }

  async function submitExisting() {
    if (!folderId) {
      toast.error("Bitte eine bestehende Person wählen.");
      return;
    }
    setBusy(true);
    try {
      const result = await startExistingPerson({ data: { folderId, label } });
      await navigate({ to: "/app/klar-o-mat", search: { run: result.runId } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Start fehlgeschlagen.");
      setBusy(false);
    }
  }

  function cancel() {
    void navigate({ to: "/app/fallordner" });
  }

  if (view === "choose") {
    return (
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl tracking-tight">Für wen läuft dieser Klar-o-Mat?</h1>
        <p className="mt-3 text-ink-muted">
          Jeder Start erzeugt einen Durchlauf. Es gibt keinen Fallordner ohne Klar-o-Mat.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <article className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]">
            <h2 className="font-display text-xl tracking-tight">Neue Person</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Legt einen Fallordner an und startet Durchlauf 1.
            </p>
            <Button className="mt-4" type="button" onClick={() => setView("new")}>
              Neue Person anlegen
            </Button>
          </article>
          <article
            className={cn(
              "rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]",
              !hasFolders && "opacity-60",
            )}
          >
            <h2 className="font-display text-xl tracking-tight">Bestehende Person</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Wählt einen Ordner und erzeugt immer einen neuen Durchlauf. Alte Durchläufe bleiben.
            </p>
            <Button
              className="mt-4"
              type="button"
              disabled={!hasFolders}
              onClick={() => hasFolders && setView("existing")}
            >
              Person wählen
            </Button>
            {!hasFolders ? (
              <p className="mt-3 text-sm text-ink-muted">Legen Sie zuerst eine neue Person an.</p>
            ) : null}
          </article>
        </div>
        <p className="mt-6">
          <Button variant="ghost" type="button" onClick={cancel}>
            Abbrechen
          </Button>
        </p>
      </div>
    );
  }

  if (view === "new") {
    return (
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl tracking-tight">Neue Person / neuer Fall</h1>
        <form
          className="mt-8 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!busy) void submitNew();
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="person-name">Name der Person *</Label>
            <Input
              id="person-name"
              value={name}
              autoComplete="off"
              required
              minLength={2}
              placeholder="z. B. Mira K."
              onChange={(event) => {
                setName(event.target.value);
                setNameError("");
              }}
            />
            {nameError ? <p className="text-sm text-danger">{nameError}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="file-ref">Aktenzeichen (optional)</Label>
            <Input
              id="file-ref"
              value={fileRef}
              autoComplete="off"
              placeholder="internes Zeichen"
              onChange={(event) => setFileRef(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="internal-note">Notiz (optional)</Label>
            <Textarea
              id="internal-note"
              rows={2}
              value={note}
              placeholder="Keine Diagnose"
              onChange={(event) => setNote(event.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3 pt-4">
            <Button variant="ghost" type="button" onClick={() => setView("choose")}>
              Abbrechen
            </Button>
            <Button type="submit" id="klaromat-start" disabled={busy || name.trim().length < 2}>
              {busy ? "Bitte warten…" : "Ordner anlegen und starten"}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl tracking-tight">Bestehende Person</h1>
      <form
        className="mt-8 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!busy) void submitExisting();
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="folder-search">Person suchen oder wählen</Label>
          <Input
            id="folder-search"
            value={query}
            autoComplete="off"
            placeholder="Name tippen — Tippfehler sind erlaubt"
            role="combobox"
            aria-expanded
            aria-controls="folder-results"
            aria-autocomplete="list"
            onChange={(event) => onSearch(event.target.value)}
          />
        </div>
        <ul
          id="folder-results"
          role="listbox"
          className="divide-y divide-line rounded-[var(--radius-lg)] bg-surface shadow-[var(--shadow-border)]"
        >
          {matches.length === 0 ? (
            <li className="px-4 py-3 text-sm text-ink-muted">Keine Person mit diesem Namen.</li>
          ) : (
            matches.map((folder) => (
              <li key={folder.id} role="option" aria-selected={folder.id === folderId}>
                <button
                  type="button"
                  onClick={() => setFolderId(folder.id)}
                  className={cn(
                    "flex min-h-11 w-full flex-col items-start px-4 py-3 text-left",
                    folder.id === folderId && "bg-primary-soft",
                  )}
                >
                  <span className="font-medium">{folder.clientName}</span>
                  <span className="text-sm text-ink-muted">
                    {folder.runCount} {folder.runCount === 1 ? "Durchlauf" : "Durchläufe"}
                    {folder.lastStatus ? ` · ${formatRunStatus(folder.lastStatus)}` : ""}
                    {folder.lastRunAt ? ` · ${formatDeDate(folder.lastRunAt)}` : ""}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
        {selected ? (
          <div className="space-y-2">
            <Label htmlFor="run-label">Label dieses Durchlaufs (optional)</Label>
            <Input
              id="run-label"
              value={label}
              autoComplete="off"
              placeholder="z. B. nach Entgiftung"
              onChange={(event) => setLabel(event.target.value)}
            />
          </div>
        ) : null}
        <div className="flex flex-wrap gap-3 pt-4">
          <Button variant="ghost" type="button" onClick={() => setView("choose")}>
            Zurück
          </Button>
          <Button type="submit" id="klaromat-start" disabled={busy || !folderId}>
            {busy ? "Bitte warten…" : "Neuen Durchlauf starten"}
          </Button>
        </div>
      </form>
    </div>
  );
}
