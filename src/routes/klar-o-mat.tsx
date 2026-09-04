import { useState } from "react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteFooter } from "@/components/brand/site-footer";
import { MatchHitList } from "@/components/klaromat/hit-list";
import { KlaromatWizard } from "@/components/klaromat/wizard";
import { PublicHeader } from "@/components/layout/public-header";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { rankClinics } from "@/lib/domain/matching";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { readGuestRun, writeGuestRun } from "@/lib/guest-run";
import { listClinics } from "@/lib/server/clinics";

export const Route = createFileRoute("/klar-o-mat")({
  component: GuestKlaromatPage,
});

function GuestKlaromatPage() {
  const { user, isPending } = useCurrentUserState();
  const clinicsQuery = useQuery({ queryKey: ["clinics"], queryFn: () => listClinics() });
  const [guest, setGuest] = useState(() => readGuestRun());
  const [accepted, setAccepted] = useState(Boolean(guest));

  if (isPending) {
    return <p className="p-8 text-ink-muted">Wird geladen…</p>;
  }
  if (user) {
    return <Navigate to="/app/klar-o-mat" />;
  }

  return (
    <div className="min-h-screen bg-bg">
      <PublicHeader />
      <main id="inhalt" className="mx-auto max-w-3xl px-4 py-10">
        {guest ? (
          <div className="space-y-6">
            <MatchHitList
              clientName="Gast-Durchlauf"
              answers={guest.answers}
              matches={guest.matches}
              clinics={clinicsQuery.data ?? []}
              guest
              onCreateDocument={() => undefined}
              onAdjustNeed={() => {
                setGuest(null);
                setAccepted(true);
              }}
            />
            <Button asChild>
              <Link to="/login">Konto erstellen</Link>
            </Button>
          </div>
        ) : accepted ? (
          <KlaromatWizard
            clientName="Gast-Durchlauf"
            guest
            onComplete={async (answers) => {
              const clinics = clinicsQuery.data ?? (await listClinics());
              const matches = rankClinics(clinics, answers);
              const stored = {
                answers,
                matches,
                completedAt: new Date().toISOString(),
              };
              writeGuestRun(stored);
              setGuest(stored);
            }}
          />
        ) : (
          <Modal titleId="guest-start-title" title="Gast-Durchlauf">
            <p className="mt-2 text-sm text-ink-muted">
              Sie können den Klar-o-Mat einmal durchlaufen. Speichern, Fallordner und
              persönlicher Steckbrief erst nach Konto und Namen.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button type="button" onClick={() => setAccepted(true)}>
                Als Gast starten
              </Button>
              <Button variant="secondary" asChild>
                <Link to="/login">Konto erstellen</Link>
              </Button>
            </div>
          </Modal>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
