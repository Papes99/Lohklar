import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/brand/site-footer";
import { FoundedLine } from "@/components/brand/wordmark";
import { PublicHeader } from "@/components/layout/public-header";

export const Route = createFileRoute("/ueber")({ component: About });

function About() {
  return (
    <div className="min-h-screen bg-bg">
      <PublicHeader />
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
          Bedarfe mit Klinikprofilen ab. Fallordner halten Läufe, Ergebnisdokumente
          und den Lohlotsen getrennt je Arbeitsname.
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
          Orientierungsprofile (Musterdaten). Sie folgen einer festen Vorlage mit
          Fotoleiste. Persönliche Arbeitsnotizen entstehen nur im Fallordner und
          erst mit Lauf 1.
        </p>
        <h2>Kerlwerk</h2>
        <p>
          Kerlwerk ist die Entwicklerfirma. Die Wortmarke lautet Lohklar, dezent
          darunter: founded by Kerlwerk.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
