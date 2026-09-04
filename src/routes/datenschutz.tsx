import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/brand/site-footer";
import { FoundedLine } from "@/components/brand/wordmark";
import { PublicHeader } from "@/components/layout/public-header";

export const Route = createFileRoute("/datenschutz")({ component: Privacy });

function Privacy() {
  return (
    <div className="min-h-screen bg-bg">
      <PublicHeader />
      <main id="inhalt" className="prose-legal mx-auto max-w-3xl px-4 py-12">
        <FoundedLine />
        <h1 className="mt-3 font-display text-4xl tracking-tight">Datenschutz</h1>
        <p className="mt-4">
          Verantwortliche Stelle: Kerlwerk, Julian Kerl, Hamburg. Lohklar verarbeitet
          Daten zweckgebunden und datensparsam (DSGVO).
        </p>
        <h2>Zwecke</h2>
        <ul>
          <li>Konto der Fachkraft (Anmeldung)</li>
          <li>Fallarbeit: Arbeitsname, Klar-o-Mat-Läufe, Ergebnisdokumente</li>
          <li>Persönlicher Steckbrief und Lohlotse je Fallordner</li>
        </ul>
        <h2>Klientendaten</h2>
        <p>
          Klientendaten liegen nur in getrennten Fallordnern der angemeldeten
          Fachkraft. Es wird ein Arbeitsname geführt, keine Diagnose durch das
          System. Fallordner entstehen erst mit dem ersten Klar-o-Mat-Lauf.
        </p>
        <h2>Rechtsgrundlagen</h2>
        <p>
          Art. 6 Abs. 1 lit. b und f DSGVO (Nutzung des Dienstes, berechtigtes
          Interesse an sicherer Fallarbeit). Gesundheitsdaten nur, soweit die
          Fachkraft sie selbst einträgt; sie bleiben in ihrem Fallordner.
        </p>
        <h2>Speicherung und Löschung</h2>
        <p>
          Kontodaten und Fallordner bleiben, bis die Fachkraft den Ordner oder das
          Konto löscht. Offizielle Klinik-Steckbriefe sind ein gemeinsamer
          Musterkatalog ohne Personenbezug.
        </p>
        <h2>Rechte</h2>
        <p>
          Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und
          Beschwerde bei einer Aufsichtsbehörde. Lohklar trifft keine
          automatisierte Entscheidung mit Rechtswirkung.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
