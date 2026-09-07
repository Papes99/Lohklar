import { Link } from "@tanstack/react-router";
import { KerlwerkXLink } from "./kerlwerk-x";
import { FoundedLine } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-line bg-surface-2">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <FoundedLine />
          <p className="max-w-md text-sm text-ink-muted">
            Orientierung in der medizinischen Rehabilitation. Keine Diagnose,
            keine Therapieentscheidung, keine Aufnahmezusage.
          </p>
        </div>
        <nav aria-label="Rechtliches" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link to="/ueber" className="inline-flex min-h-11 items-center text-ink hover:underline">
            Über Lohklar
          </Link>
          <KerlwerkXLink />
          <Link to="/impressum" className="inline-flex min-h-11 items-center text-ink hover:underline">
            Impressum
          </Link>
          <Link to="/datenschutz" className="inline-flex min-h-11 items-center text-ink hover:underline">
            Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  );
}
