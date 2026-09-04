import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { formatDeDate, formatRunStatus } from "@/lib/format";
import { listFolders } from "@/lib/server/cases";

export const Route = createFileRoute("/app/fallordner/")({
  component: FoldersPage,
});

function FoldersPage() {
  const query = useQuery({ queryKey: ["folders"], queryFn: () => listFolders() });
  const folders = query.data ?? [];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Fälle</h1>
          <p className="mt-2 max-w-xl text-ink-muted">
            Je Person ein Name. Ordner entstehen nur zusammen mit einem Durchlauf.
          </p>
        </div>
        <Button asChild>
          <Link to="/app/klar-o-mat">Neuer Klar-o-Mat</Link>
        </Button>
      </header>
      {query.isPending ? (
        <p className="text-ink-muted">Fälle werden geladen…</p>
      ) : folders.length > 0 ? (
        <ul className="grid gap-3">
          {folders.map((folder) => (
            <li key={folder.id}>
              <Link
                to="/app/fallordner/$folderId"
                params={{ folderId: folder.id }}
                className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
              >
                <span>
                  <span className="font-medium">{folder.clientName}</span>
                  <span className="mt-1 block text-sm text-ink-muted">
                    {folder.runCount} {folder.runCount === 1 ? "Durchlauf" : "Durchläufe"}
                    {folder.lastStatus ? ` · ${formatRunStatus(folder.lastStatus)}` : ""}
                    {folder.lastRunAt ? ` · ${formatDeDate(folder.lastRunAt)}` : ""}
                  </span>
                </span>
                <span className="text-sm font-medium text-primary">Öffnen</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-[var(--radius-xl)] bg-surface p-6 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-2xl tracking-tight">Noch keine Fallordner</h2>
          <p className="mt-2 text-ink-muted">
            Noch keine Person. Der erste Klar-o-Mat legt Ordner und Durchlauf 1 gemeinsam an.
          </p>
          <Button className="mt-4" asChild>
            <Link to="/app/klar-o-mat">Klar-o-Mat für neue Person</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
