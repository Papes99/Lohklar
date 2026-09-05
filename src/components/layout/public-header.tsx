import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/brand/wordmark";
import { AuthSlot } from "./auth-slot";

const LINKS = [
  { to: "/klar-o-mat" as const, label: "Klar-o-Mat" },
  { to: "/kliniken" as const, label: "Klinik-Steckbriefe" },
  { to: "/ueber" as const, label: "Über Lohklar" },
];

export function PublicHeader() {
  return (
    <header className="no-print border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Wordmark size="sm" />
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-5 text-sm sm:flex">
          {LINKS.map((item) => (
            <Link key={item.to} to={item.to} className="text-ink hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
        <AuthSlot />
      </div>
      <nav
        aria-label="Hauptnavigation mobil"
        className="flex gap-1 overflow-x-auto border-t border-line px-2 py-1 sm:hidden"
      >
        {LINKS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="inline-flex min-h-11 shrink-0 items-center px-3 text-sm text-ink hover:underline"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
