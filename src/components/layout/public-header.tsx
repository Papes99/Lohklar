import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/brand/wordmark";
import { AuthSlot } from "./auth-slot";

export function PublicHeader() {
  return (
    <header className="no-print border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Wordmark size="sm" />
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-5 text-sm sm:flex">
          <Link to="/klar-o-mat" className="text-ink hover:underline">
            Klar-o-Mat
          </Link>
          <Link to="/kliniken" className="text-ink hover:underline">
            Klinik-Steckbriefe
          </Link>
          <Link to="/ueber" className="text-ink hover:underline">
            Über Lohklar
          </Link>
        </nav>
        <AuthSlot />
      </div>
    </header>
  );
}
