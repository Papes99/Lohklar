import { Link } from "@tanstack/react-router";
import { CoverPhoto, SubstanceTags } from "@/components/clinic/cover-photo";
import { WartezeitSchaetzung } from "@/components/wait/wartezeit-schaetzung";
import {
  WAIT_UNCERTAINTY_LABEL,
  clinicCardTags,
  coverAuftragTag,
  type ClinicWithWait,
} from "@/lib/domain/types";

export function ClinicCard({ clinic }: { clinic: ClinicWithWait }) {
  const photo =
    clinic.photos.find((item) => item.slot === "aussen") ?? clinic.photos[0];
  return (
    <Link
      to="/kliniken/$clinicId"
      params={{ clinicId: clinic.id }}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-xl)] bg-surface shadow-[var(--shadow-border)] transition-shadow duration-150 hover:shadow-[var(--shadow-border-hover)]"
    >
      <CoverPhoto
        src={photo?.imagePath}
        alt={photo?.alt ?? clinic.name}
        className="aspect-photo h-40 w-full"
      />
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <SubstanceTags accent={coverAuftragTag(clinic)} tags={clinicCardTags(clinic)} />
        <div className="mt-4">
          <h3 className="font-display text-xl tracking-tight text-ink group-hover:underline">
            {clinic.name}
          </h3>
          <p className="mt-1 text-sm text-ink-muted">
            {clinic.city}, {clinic.stateName}
          </p>
        </div>
        <div className="mt-auto pt-4">
          <WartezeitSchaetzung estimate={clinic.wait} variant="chip" />
          <SubstanceTags
            className="mt-2"
            tags={[`Unsicherheit ${WAIT_UNCERTAINTY_LABEL[clinic.wait.uncertainty]}`]}
          />
        </div>
      </div>
    </Link>
  );
}
