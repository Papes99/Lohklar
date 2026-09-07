import { Link } from "@tanstack/react-router";
import { CoverPhoto, SubstanceTags } from "@/components/clinic/cover-photo";
import { WartezeitSchaetzung } from "@/components/wait/wartezeit-schaetzung";
import { clinicSearchHits } from "@/lib/domain/catalog-filter";
import {
  WAIT_UNCERTAINTY_LABEL,
  clinicCardTags,
  coverAuftragTag,
  type ClinicWithWait,
} from "@/lib/domain/types";

export function ClinicCard({ clinic, query }: { clinic: ClinicWithWait; query?: string }) {
  const photo =
    clinic.photos.find((item) => item.slot === "aussen") ?? clinic.photos[0];
  const auftrag = coverAuftragTag(clinic);
  const hits = query?.trim() ? clinicSearchHits(query, clinic).filter((hit) => hit !== auftrag) : [];
  const tags = hits.length > 0 ? hits : clinicCardTags(clinic);
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
        {hits.length > 0 ? (
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-ink-muted">
            Passung zur Suche
          </p>
        ) : null}
        <SubstanceTags
          className={hits.length > 0 ? "mt-1.5" : undefined}
          accent={auftrag}
          tags={tags}
          matched={hits.length > 0}
        />
        <div className="mt-4">
          <h3 className="font-display text-xl tracking-tight text-ink group-hover:underline">
            <MarkQuery text={clinic.name} query={query} />
          </h3>
          <p className="mt-1 text-sm text-ink-muted">
            <MarkQuery text={`${clinic.city}, ${clinic.stateName}`} query={query} />
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

function escapeRe(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function MarkQuery({ text, query }: { text: string; query?: string }) {
  const raw = query?.trim() ?? "";
  if (raw.length < 2) return text;
  const tokens = [...new Set(raw.split(/\s+/).filter((token) => token.length >= 2))];
  if (!tokens.length) return text;
  const re = new RegExp(`(${tokens.map(escapeRe).join("|")})`, "ig");
  const parts = text.split(re);
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, index) => {
        const hit = tokens.some((token) => token.localeCompare(part, "de", { sensitivity: "accent" }) === 0);
        if (!hit) return <span key={`${part}-${index}`}>{part}</span>;
        return (
          <mark key={`${part}-${index}`} className="rounded-[var(--radius-xs)] bg-primary-soft text-ink">
            {part}
          </mark>
        );
      })}
    </>
  );
}
