import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { OfficialSteckbrief } from "@/components/clinic/official-steckbrief";
import { SteckbriefPrintSheet } from "@/components/clinic/steckbrief-print";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { emitUsage } from "@/lib/domain/usage";
import { getClinic } from "@/lib/server/clinics";

export const Route = createFileRoute("/kliniken/$clinicId")({
  loader: ({ params }) => getClinic({ data: params.clinicId }),
  component: ClinicDetailPage,
});

function ClinicDetailPage() {
  const clinic = Route.useLoaderData();
  useEffect(() => {
    if (clinic?.id) emitUsage("clinic_view", { clinicId: clinic.id });
  }, [clinic?.id]);

  return (
    <PublicLayout>
      <main id="inhalt" className="steckbrief-page mx-auto max-w-6xl px-4 py-10">
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link to="/kliniken" className="text-sm font-medium text-primary hover:underline">
            Alle Steckbriefe
          </Link>
          {clinic ? (
            <Button variant="secondary" type="button" onClick={() => printSteckbrief(clinic.name)}>
              <Printer className="size-4" aria-hidden="true" />
              Als PDF drucken
            </Button>
          ) : null}
        </div>
        {clinic ? (
          <>
            <OfficialSteckbrief clinic={clinic} />
            <SteckbriefPrintSheet clinic={clinic} />
          </>
        ) : (
          <p>Dieser Steckbrief ist nicht vorhanden.</p>
        )}
      </main>
    </PublicLayout>
  );
}

function printSteckbrief(clinicName: string) {
  const previous = document.title;
  document.title = `Steckbrief ${clinicName} – Lohklar`;
  const restore = () => {
    document.title = previous;
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);
  window.print();
}
