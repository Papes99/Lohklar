import { cn } from "@/lib/utils";

export function CoverPhoto({
  src,
  alt,
  auftrag,
  className,
}: {
  src: string | null | undefined;
  alt: string;
  auftrag?: string | null;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-bg-subtle", className)}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" crossOrigin="anonymous" />
      ) : (
        <div className="grid h-full min-h-full place-items-center text-sm text-ink-muted">Foto nicht verfügbar</div>
      )}
      {auftrag ? <AuftragChip>{auftrag}</AuftragChip> : null}
    </div>
  );
}

/** Green on the photo: house type only. Shadow keeps it readable on light image areas. */
export function AuftragChip({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "auftrag-chip absolute bottom-3 left-3 inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-fg",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SubstanceTags({
  tags,
  accent,
  className,
}: {
  tags: string[];
  accent?: string | null;
  className?: string;
}) {
  if (!accent && tags.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {accent ? (
        <li>
          <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-fg">
            {accent}
          </span>
        </li>
      ) : null}
      {tags.map((tag) => (
        <li key={tag}>
          <span className="inline-flex items-center rounded-full bg-bg-subtle px-2.5 py-1 text-xs font-medium text-ink-muted">
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}
