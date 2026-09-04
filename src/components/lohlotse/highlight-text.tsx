import { cn } from "@/lib/utils";

export function quotesOf(
  highlights: { surface?: string; field?: string; quote: string }[] | undefined,
  surface?: "official" | "personal",
  field?: string,
): string[] {
  if (!highlights) return [];
  return [
    ...new Set(
      highlights
        .filter((item) => (surface ? item.surface === surface : true) && (field ? item.field === field : true))
        .map((item) => item.quote.trim())
        .filter((item) => item.length >= 6 && !/^Angabe liegt nicht vor\.?$/i.test(item)),
    ),
  ];
}

export function isHighlightHit(text: string, quotes: string[]): boolean {
  const n = text.trim();
  if (!n) return false;
  return quotes.some((quote) => {
    if (n.includes(quote) || quote.includes(n)) return true;
    const slice = quote.slice(0, Math.min(18, quote.length));
    return slice.length >= 8 && n.includes(slice);
  });
}

export function HighlightedText({
  text,
  quotes,
  className,
}: {
  text: string;
  quotes: string[];
  className?: string;
}) {
  if (!isHighlightHit(text, quotes)) {
    return <span className={className}>{text}</span>;
  }
  const exact = quotes.find((quote) => text.includes(quote));
  if (exact) {
    const idx = text.indexOf(exact);
    return (
      <span className={className}>
        {text.slice(0, idx)}
        <mark className="rounded-[var(--radius-xs)] bg-primary-soft text-ink">{exact}</mark>
        {text.slice(idx + exact.length)}
      </span>
    );
  }
  return (
    <mark className={cn("rounded-[var(--radius-xs)] bg-primary-soft text-ink", className)}>{text}</mark>
  );
}
