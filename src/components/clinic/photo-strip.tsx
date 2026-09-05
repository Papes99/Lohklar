import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { AuftragChip, SubstanceTags } from "@/components/clinic/cover-photo";
import {
  PHOTO_SLOTS,
  PHOTO_SOURCE_LABEL,
  type ClinicPhoto,
  type PhotoSlot,
} from "@/lib/domain/types";

type Tile = {
  key: string;
  slot: PhotoSlot;
  label: string;
  required: boolean;
  photo: ClinicPhoto | null;
};

export function PhotoStrip({
  photos,
  clinicName,
  variant = "page",
  auftrag,
  substances = [],
}: {
  photos: ClinicPhoto[];
  clinicName: string;
  variant?: "page" | "aside";
  auftrag?: string | null;
  substances?: string[];
}) {
  const [open, setOpen] = useState<Tile | null>(null);
  const tiles = useMemo(() => buildTiles(photos), [photos]);
  const compact = variant === "aside";

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-2">
        {tiles.map((tile, index) => (
          <li
            key={tile.key}
            className={!compact && tile.slot === "aussen" ? "col-span-2" : undefined}
          >
            <PhotoTile
              tile={tile}
              clinicName={clinicName}
              compact={compact}
              auftrag={index === 0 ? auftrag : undefined}
              substances={index === 0 ? substances : []}
              onOpen={() => setOpen(tile)}
            />
          </li>
        ))}
      </ul>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={open.photo?.alt ?? open.label}
          onClick={() => setOpen(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[var(--radius-lg)] bg-surface"
            onClick={(event) => event.stopPropagation()}
          >
            {open.photo?.imagePath ? (
              <img
                src={open.photo.imagePath}
                alt={open.photo.alt}
                className="max-h-[78vh] w-full object-contain"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="grid aspect-photo place-items-center bg-bg-subtle text-ink-muted">
                Foto nicht verfügbar
              </div>
            )}
            <p className="px-4 py-3 text-sm text-ink-muted">{open.label}</p>
            <button
              type="button"
              className="absolute right-2 top-2 grid size-11 place-items-center rounded-full bg-surface text-ink shadow-[var(--shadow-border)]"
              onClick={() => setOpen(null)}
              aria-label="Schließen"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function PhotoTile({
  tile,
  clinicName,
  compact,
  auftrag,
  substances,
  onOpen,
}: {
  tile: Tile;
  clinicName: string;
  compact: boolean;
  auftrag?: string | null;
  substances: string[];
  onOpen: () => void;
}) {
  const missing = !tile.photo?.imagePath;
  const hero = !compact && tile.slot === "aussen";
  const frame = hero
    ? "aspect-photo h-40 w-full object-cover sm:h-44"
    : compact
      ? "aspect-photo h-24 w-full object-cover"
      : "aspect-photo h-28 w-full object-cover";
  const label = tile.photo?.caption ?? tile.label;
  return (
    <figure className="overflow-hidden rounded-[var(--radius-md)] bg-bg-subtle">
      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full text-left"
        aria-label={`${label} der ${clinicName} vergrößern`}
      >
        {missing ? (
          <div
            className={`grid place-items-center bg-bg-subtle ${hero ? "aspect-photo h-40 sm:h-44" : compact ? "aspect-photo h-24" : "aspect-photo h-28"}`}
          >
            <p className="px-2 text-center text-xs text-ink-muted">
              Foto nicht verfügbar
              <span className="mt-1 block">Quelle {PHOTO_SOURCE_LABEL[tile.photo?.source ?? "fehlt"]}</span>
            </p>
          </div>
        ) : (
          <img
            src={tile.photo!.imagePath!}
            alt={tile.photo!.alt}
            className={frame}
            crossOrigin="anonymous"
          />
        )}
        {auftrag ? <AuftragChip>{auftrag}</AuftragChip> : null}
      </button>
      {substances.length > 0 ? (
        <div className="px-2 pt-2">
          <SubstanceTags tags={substances} />
        </div>
      ) : null}
      <figcaption className="px-2 py-1.5 text-xs text-ink-muted">{label}</figcaption>
    </figure>
  );
}

function buildTiles(photos: ClinicPhoto[]): Tile[] {
  const withImage = photos.filter((photo) => photo.imagePath);
  if (withImage.length) {
    return withImage.map((photo) => ({
      key: photo.slot,
      slot: photo.slot,
      label: photo.caption,
      required: PHOTO_SLOTS.find((slot) => slot.id === photo.slot)?.required ?? false,
      photo,
    }));
  }
  const tiles: Tile[] = [];
  for (const slot of PHOTO_SLOTS) {
    if (!slot.required) continue;
    const photo = photos.find((item) => item.slot === slot.id) ?? null;
    tiles.push({
      key: slot.id,
      slot: slot.id,
      label: slot.label,
      required: true,
      photo,
    });
  }
  return tiles;
}
