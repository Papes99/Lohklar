import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { filterFolders } from "@/lib/domain/folder-search";
import { clearGuestRun, readGuestRun } from "@/lib/guest-run";
import { claimGuestRun, listFolders } from "@/lib/server/cases";
import { cn } from "@/lib/utils";

export function ClaimGuestDialog() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"new" | "existing">("new");
  const [name, setName] = useState("");
  const [fileRef, setFileRef] = useState("");
  const [query, setQuery] = useState("");
  const [folderId, setFolderId] = useState("");
  const [busy, setBusy] = useState(false);

  const foldersQuery = useQuery({
    queryKey: ["folders"],
    queryFn: () => listFolders(),
    enabled: open,
  });
  const usable = (foldersQuery.data ?? []).filter((folder) => folder.runCount >= 1);
  const matches = useMemo(() => filterFolders(usable, query).slice(0, 6), [usable, query]);

  useEffect(() => {
    setOpen(Boolean(readGuestRun()));
  }, []);

  if (!open) return null;

  async function claim() {
    const guest = readGuestRun();
    if (!guest) {
      setOpen(false);
      return;
    }
    setBusy(true);
    try {
      const result = await claimGuestRun({
        data:
          mode === "existing"
            ? { folderId, answers: guest.answers }
            : { clientName: name, fileRef, answers: guest.answers },
      });
      clearGuestRun();
      toast.success("Gastlauf dem Fallordner zugeordnet.");
      setOpen(false);
      await navigate({
        to: "/app/fallordner/$folderId",
        params: { folderId: result.folderId },
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Zuordnung fehlgeschlagen.");
      setBusy(false);
    }
  }

  function discard() {
    clearGuestRun();
    setOpen(false);
  }

  const canSave =
    mode === "new" ? name.trim().length >= 2 : Boolean(folderId) && usable.length > 0;

  return (
    <Modal titleId="claim-title" title="Diesen Durchlauf einem Namen zuordnen" className="max-w-xl">
      <p className="mt-2 text-sm text-ink-muted">
        Erst jetzt entstehen Fallordner, Run und persönlicher Steckbrief-Samen.
      </p>
      <fieldset className="mt-5 space-y-3">
        <legend className="sr-only">Zuordnung</legend>
        <label className="flex min-h-11 items-center gap-3">
          <input
            type="radio"
            name="claim-mode"
            checked={mode === "new"}
            onChange={() => setMode("new")}
          />
          Neue Person
        </label>
        <label className="flex min-h-11 items-center gap-3">
          <input
            type="radio"
            name="claim-mode"
            checked={mode === "existing"}
            disabled={usable.length === 0}
            onChange={() => usable.length > 0 && setMode("existing")}
          />
          Bestehende Person
        </label>
      </fieldset>

      {mode === "new" ? (
        <div className="mt-4 space-y-3">
          <div className="space-y-2">
            <Label htmlFor="claim-name">Name der Person *</Label>
            <Input
              id="claim-name"
              value={name}
              autoComplete="off"
              placeholder="z. B. Mira K."
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="claim-ref">Aktenzeichen (optional)</Label>
            <Input
              id="claim-ref"
              value={fileRef}
              autoComplete="off"
              placeholder="internes Zeichen"
              onChange={(event) => setFileRef(event.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          <Label htmlFor="claim-search">Person suchen oder wählen</Label>
          <Input
            id="claim-search"
            value={query}
            autoComplete="off"
            onChange={(event) => setQuery(event.target.value)}
          />
          <ul className="divide-y divide-line rounded-[var(--radius-lg)] bg-bg-subtle">
            {matches.map((folder) => (
              <li key={folder.id}>
                <button
                  type="button"
                  className={cn(
                    "flex min-h-11 w-full px-3 py-2 text-left",
                    folder.id === folderId && "bg-primary-soft",
                  )}
                  onClick={() => setFolderId(folder.id)}
                >
                  {folder.clientName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="ghost" type="button" onClick={discard}>
          Verwerfen
        </Button>
        <Button type="button" disabled={busy || !canSave} onClick={() => void claim()}>
          {busy ? "Ordnet zu…" : "Zuordnen und speichern"}
        </Button>
      </div>
    </Modal>
  );
}
