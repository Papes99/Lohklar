import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { FoundedLine } from "@/components/brand/wordmark";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-ink">
      <TriangleAlert className="size-10 text-danger" aria-hidden="true" />
      <h1 className="font-display text-2xl">Etwas ist schiefgelaufen</h1>
      <p className="max-w-md text-sm break-words text-ink-muted">
        {error.message || "Unerwarteter Fehler. Bitte die Seite neu laden."}
      </p>
      <Link to="/" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
        Zur Startseite
      </Link>
      <FoundedLine className="mt-6" />
    </main>
  );
}

export function NotFoundComponent() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-ink">
      <h1 className="font-display text-2xl">Seite nicht gefunden</h1>
      <p className="max-w-md text-ink-muted">
        Diese Adresse gehört nicht zu Lohklar. Prüfen Sie den Link oder gehen Sie zur Übersicht.
      </p>
      <Link to="/" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
        Zur Startseite
      </Link>
    </main>
  );
}
