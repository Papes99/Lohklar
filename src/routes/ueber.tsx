import { createFileRoute } from "@tanstack/react-router";
import { KerlwerkXCard } from "@/components/brand/kerlwerk-x";
import { FoundedLine } from "@/components/brand/wordmark";
import { PublicLayout } from "@/components/layout/public-layout";

export const Route = createFileRoute("/ueber")({ component: About });

function About() {
  return (
    <PublicLayout>
      <main id="inhalt" className="prose-legal mx-auto max-w-3xl px-4 py-12">
        <FoundedLine />
        <h1 className="mt-3 font-display text-4xl tracking-tight">Über Lohklar</h1>
        <p className="mt-4 text-lg text-ink">
          Lohklar ist ein Orientierungsangebot in der medizinischen Rehabilitation
          — Sucht, Psychosomatik, Dualdiagnosen und verwandte Bedarfe. Entwickelt
          von Kerlwerk.
        </p>
        <h2>Was Lohklar ist</h2>
        <p>
          Ein Werkzeug für Sozialarbeiter:innen, Beratungsstellen,
          Klinik-Sozialdienste und Angehörige. Der Klar-o-Mat gleicht beschriebene
          Bedarfe mit Klinikprofilen ab. Fallordner halten Läufe und Ergebnisdokumente
          getrennt je Arbeitsname.
        </p>
        <h2>Was Lohklar nicht ist</h2>
        <ul>
          <li>kein Medizinprodukt und keine Diagnoseinstanz</li>
          <li>keine Therapieentscheidung und keine Behandlungsplanung</li>
          <li>kein Belegungs- oder Wartelistensystem</li>
          <li>keine Zusage von Aufnahme, Kosten oder Wartezeit</li>
        </ul>
        <h2>Klinik-Steckbriefe</h2>
        <p>
          Die offiziellen Steckbriefe in dieser Version sind strukturierte
          Orientierungsprofile aus öffentlichen Klinikangaben. Sie folgen einer festen Vorlage mit
          Fotoleiste und sind ohne Konto lesbar.
        </p>
        <h2>Zwei Seiten, ein starkes Ergebnis</h2>
        <p>
          Aus einer produktiven Zusammenarbeit heraus ist Lohklar ab sofort offiziell
          verfügbar.
        </p>
        <p>
          Die technische Konzeption und Entwicklung stammt aus dem Hause Kerlwerk.
          Durch gebündeltes Know-how und partnerschaftliche Umsetzung ist eine moderne
          Anwendung entstanden, die ab sofort einsatzbereit ist.
        </p>
        <KerlwerkXCard />
      </main>
    </PublicLayout>
  );
}
