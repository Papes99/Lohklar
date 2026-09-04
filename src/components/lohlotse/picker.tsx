import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { FolderSummary } from "@/lib/server/cases";

export function LohlotsePicker({
  last,
  folders,
  onChoose,
}: {
  last: { folderId: string; clientName: string } | null;
  folders: FolderSummary[];
  onChoose: (folderId: string) => void;
}) {
  const others = last ? folders.filter((item) => item.id !== last.folderId) : folders;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">Lohlotse</p>
        <h1 className="mt-1 font-display text-3xl tracking-tight">Für welche Person?</h1>
        <p className="mt-2 text-ink-muted">
          Der Faden hängt an genau einem Arbeitsnamen. Ohne Namen speichert Lohlotse keinen
          Thread und keinen persönlichen Steckbrief.
        </p>
      </header>

      <section
        className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]"
        aria-label="🧭 Überblick"
      >
        <p className="font-display text-2xl tracking-tight">🧭 Überblick</p>
        <ul className="mt-3 space-y-2 text-ink">
          <li className="flex gap-2">
            <span aria-hidden="true" className="text-ink-subtle">
              –
            </span>
            <span>Für welche Person ist dieser Austausch?</span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true" className="text-ink-subtle">
              –
            </span>
            <span>Bestehenden Fallordner wählen oder über den Klar-o-Mat eine neue Person anlegen (immer mit Durchlauf 1).</span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true" className="text-ink-subtle">
              –
            </span>
            <span>Ohne Namen kein Thread, kein persönlicher Steckbrief.</span>
          </li>
        </ul>
      </section>

      {last ? (
        <div className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]">
          <p className="font-medium">Weiter mit {last.clientName}?</p>
          <p className="mt-1 text-sm text-ink-muted">Oder andere Person wählen.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button id="lohlotse-continue" type="button" onClick={() => onChoose(last.folderId)}>
              Weiter mit {last.clientName}
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/app/klar-o-mat">Neue Person über Klar-o-Mat</Link>
            </Button>
          </div>
        </div>
      ) : folders.length === 0 ? (
        <div className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]">
          <p className="font-medium">Noch kein Fallordner.</p>
          <p className="mt-1 text-sm text-ink-muted">
            Eine neue Person entsteht nur mit Durchlauf 1 im Klar-o-Mat. Leere Ordner gibt es nicht.
          </p>
          <Button className="mt-4" asChild>
            <Link to="/app/klar-o-mat">Klar-o-Mat für neue Person</Link>
          </Button>
        </div>
      ) : null}

      {others.length > 0 ? (
        <section>
          <h2 className="font-display text-2xl tracking-tight">
            {last ? "Andere Person" : "Fallordner"}
          </h2>
          <ul className="mt-3 grid gap-2">
            {others.map((folder) => (
              <li key={folder.id}>
                <button
                  type="button"
                  className="flex min-h-12 w-full items-center justify-between rounded-[var(--radius-lg)] bg-surface px-4 text-left shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
                  onClick={() => onChoose(folder.id)}
                >
                  <span className="font-medium">{folder.clientName}</span>
                  <span className="text-sm text-primary">Öffnen</span>
                </button>
              </li>
            ))}
          </ul>
          {last ? (
            <p className="mt-3">
              <Button variant="ghost" asChild>
                <Link to="/app/klar-o-mat">Neue Person über Klar-o-Mat</Link>
              </Button>
            </p>
          ) : (
            <p className="mt-3">
              <Button variant="secondary" asChild>
                <Link to="/app/klar-o-mat">Neue Person über Klar-o-Mat</Link>
              </Button>
            </p>
          )}
        </section>
      ) : last ? (
        <p>
          <Button variant="ghost" asChild>
            <Link to="/app/klar-o-mat">Neue Person über Klar-o-Mat</Link>
          </Button>
        </p>
      ) : null}
    </div>
  );
}
