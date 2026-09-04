import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/brand/site-footer";
import { OfficialSteckbrief } from "@/components/clinic/official-steckbrief";
import { PublicHeader } from "@/components/layout/public-header";
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
    <div className="min-h-screen bg-bg">
      <PublicHeader />
      <main id="inhalt" className="mx-auto max-w-6xl px-4 py-10">
        <p className="no-print mb-6">
          <Link to="/kliniken" className="text-sm font-medium text-primary hover:underline">
            Alle Steckbriefe
          </Link>
        </p>
        {clinic ? (
          <OfficialSteckbrief clinic={clinic} />
        ) : (
          <p>Dieser Steckbrief ist nicht vorhanden.</p>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
