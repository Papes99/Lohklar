import { createFileRoute } from "@tanstack/react-router";
import { FoundedLine } from "@/components/brand/wordmark";
import { PublicLayout } from "@/components/layout/public-layout";

export const Route = createFileRoute("/impressum")({ component: Impressum });

function Impressum() {
  return (
    <PublicLayout>
      <main id="inhalt" className="prose-legal mx-auto max-w-3xl px-4 py-12">
        <FoundedLine />
        <h1 className="mt-3 font-display text-4xl tracking-tight">Impressum</h1>
        <p className="mt-4">Angaben gemäß § 5 TMG</p>
        <p>
          Kerlwerk
          <br />
          Julian Kerl
          <br />
          Hamburg, Deutschland
        </p>
        <p>
          Lohklar ist ein digitales Orientierungsangebot, kein medizinischer Dienst
          und keine Klinik. Kontakt über das Nutzerkonto der Fachkraft in der
          Anwendung.
        </p>
        <h2>Verantwortlich für den Inhalt</h2>
        <p>Julian Kerl, Kerlwerk, Hamburg.</p>
        <h2>Haftung für Inhalte</h2>
        <p>
          Klinikprofile sind Orientierungsdaten ohne Gewähr. Wartezeit-Schätzungen
          sind keine Zusagen. Für Aufnahme, Kosten und Behandlung bleiben Klinik,
          Ärzt:innen und Kostenträger zuständig.
        </p>
      </main>
    </PublicLayout>
  );
}
