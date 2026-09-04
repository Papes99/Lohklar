import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { WartezeitSchaetzung } from "@/components/wait/wartezeit-schaetzung";
import {
  indicationLabel,
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
      {photo?.imagePath ? (
        <img
          src={photo.imagePath}
          alt={photo.alt}
          className="aspect-photo h-40 w-full object-cover"
          crossOrigin="anonymous"
        />
      ) : (
        <div className="grid aspect-photo h-40 place-items-center bg-bg-subtle text-sm text-ink-muted">
          Foto nicht verfügbar
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-display text-xl tracking-tight text-ink group-hover:underline">
            {clinic.name}
          </h3>
          <p className="text-sm text-ink-muted">
            {clinic.city}, {clinic.stateName}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {clinic.indicationAreas.map((area) => (
            <Badge key={area} tone="primary">
              {indicationLabel(area)}
            </Badge>
          ))}
          {clinic.ahb ? <Badge>AHB</Badge> : null}
        </div>
        <WartezeitSchaetzung estimate={clinic.wait} variant="chip" />
      </div>
    </Link>
  );
}
