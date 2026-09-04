import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function CompassMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M16 7.5 L18.2 13.8 L24.5 16 L18.2 18.2 L16 24.5 L13.8 18.2 L7.5 16 L13.8 13.8 Z"
        fill="none"
        stroke="#f7f3ea"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="1.3" fill="#f7f3ea" />
    </svg>
  );
}

export function Wordmark({
  to = "/",
  size = "md",
  stacked = true,
  className,
}: {
  to?: string;
  size?: "sm" | "md" | "lg";
  stacked?: boolean;
  className?: string;
}) {
  const title =
    size === "lg" ? "text-4xl" : size === "sm" ? "text-xl" : "text-2xl";
  const sub = size === "lg" ? "text-sm" : "text-[11px]";
  return (
    <Link
      to={to}
      className={cn("group inline-flex items-center gap-2 text-ink no-underline", className)}
    >
      <CompassMark
        className={cn(
          "text-primary",
          size === "lg" ? "size-10" : size === "sm" ? "size-7" : "size-8",
        )}
      />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display font-semibold tracking-tight", title)}>
          Lohklar
        </span>
        {stacked ? (
          <span
            className={cn(
              "mt-1 font-sans font-medium tracking-[0.14em] text-ink-muted uppercase",
              sub,
            )}
          >
            founded by Kerlwerk
          </span>
        ) : (
          <span className="sr-only">founded by Kerlwerk</span>
        )}
      </span>
    </Link>
  );
}

export function FoundedLine({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "font-sans text-xs font-medium tracking-[0.14em] text-ink-muted uppercase",
        className,
      )}
    >
      Lohklar · founded by Kerlwerk
    </p>
  );
}
