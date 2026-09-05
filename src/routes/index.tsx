import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/brand/site-footer";
import { FoundedLine, Wordmark } from "@/components/brand/wordmark";
import { PublicHeader } from "@/components/layout/public-header";
import { Button } from "@/components/ui/button";
import { SignInGate } from "@/lib/auth/gates";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-screen bg-bg">
      <PublicHeader />
      <main id="inhalt">
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <Wordmark size="lg" className="pointer-events-none hidden sm:inline-flex" to="/" />
            <h1 className="mt-8 font-display text-4xl tracking-tight sm:text-5xl">
              Orientierung in der medizinischen Rehabilitation.
            </h1>
            <FoundedLine className="mt-3" />
            <p className="mt-5 max-w-xl text-ink-muted">
              Klinik-Steckbriefe sind ohne Konto lesbar. Der Klar-o-Mat geht als Gast. Speichern
              erst nach Registrierung und Zuordnung zu einem Namen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SignInGate
                fallback={
                  <Button variant="secondary" asChild>
                    <Link to="/kliniken">Steckbriefe ohne Konto</Link>
                  </Button>
                }
              >
                <Button variant="secondary" asChild>
                  <Link to="/kliniken">Klinik-Steckbriefe</Link>
                </Button>
              </SignInGate>
              <SignInGate
                fallback={
                  <Button asChild>
                    <Link to="/klar-o-mat">Klar-o-Mat starten</Link>
                  </Button>
                }
              >
                <Button asChild>
                  <Link to="/app/klar-o-mat">Klar-o-Mat starten</Link>
                </Button>
              </SignInGate>
              <SignInGate
                fallback={
                  <>
                    <Button variant="secondary" asChild>
                      <Link to="/login">Anmelden</Link>
                    </Button>
                    <Button variant="secondary" asChild>
                      <Link to="/login" search={{ register: "1" }}>
                        Konto erstellen
                      </Link>
                    </Button>
                  </>
                }
              >
                <Button variant="secondary" asChild>
                  <Link to="/app/fallordner">Alle Fälle</Link>
                </Button>
              </SignInGate>
            </div>
          </div>
          <figure className="overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-border)]">
            <img
              src="/clinics/aussen-see.jpg"
              alt="Ansicht einer Rehaklinik am See, ohne Personen"
              className="aspect-photo w-full object-cover"
              crossOrigin="anonymous"
            />
            <figcaption className="bg-surface px-4 py-3 text-sm text-ink-muted">
              Klinikatalog zur Orientierung — keine verbindliche Klinikzusage.
            </figcaption>
          </figure>
        </section>

        <section className="border-t border-line bg-surface">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Steckbriefe",
                text: "250 Häuser, dieselbe Vorlage. Ohne Konto lesbar, inklusive Suche und Filter.",
              },
              {
                title: "Klar-o-Mat",
                text: "Jeder Start erzeugt einen Lauf. Ein Fallordner entsteht erst mit Lauf 1.",
              },
              {
                title: "Wartezeit-Schätzung",
                text: "Eine Komponente überall. Rechenweg aufklappbar. Keine Garantie.",
              },
              {
                title: "Lohlotse",
                text: "Chat mit Gedächtnis je Arbeitsname. Steckbrief-Leiste bleibt sichtbar.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h2 className="font-display text-2xl tracking-tight">{item.title}</h2>
                <p className="mt-2 text-ink-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
