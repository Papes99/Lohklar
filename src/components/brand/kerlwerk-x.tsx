import { cn } from "@/lib/utils";

export const KERLWERK_X_URL = "https://x.com/Kerlwerk";
const KERLWERK_X_FOLLOWERS = 22_872;

function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.59l-5.16-6.74L5.2 22H1.93l8.02-9.16L1.5 2h6.76l4.66 6.17L18.244 2Zm-1.16 18.04h1.81L7.01 3.86H5.07l12.014 16.18Z"
      />
    </svg>
  );
}

function followerLabel(count: number): string {
  return `${count.toLocaleString("de-DE")} Follower`;
}

export function KerlwerkXCard({ className }: { className?: string }) {
  const followers = followerLabel(KERLWERK_X_FOLLOWERS);
  return (
    <a
      href={KERLWERK_X_URL}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Kerlwerk auf X, @Kerlwerk, ${followers} — öffnet in neuem Tab`}
      className={cn(
        "group mt-6 block overflow-hidden rounded-[var(--radius-xl)] bg-surface text-ink no-underline shadow-[var(--shadow-border)] transition-shadow duration-150 hover:shadow-[var(--shadow-border-hover)]",
        className,
      )}
    >
      <img
        src="/brand/kerlwerk-cover.jpg"
        alt=""
        className="h-36 w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
      />
      <div className="px-5 pb-5">
        <img
          src="/brand/kerlwerk-avatar.jpg"
          alt=""
          className="-mt-8 size-16 rounded-full object-cover outline outline-2 outline-surface"
        />
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <span>
            <span className="block font-display text-xl tracking-tight text-ink">Kerlwerk</span>
            <span className="mt-0.5 block text-sm text-ink-muted">@Kerlwerk</span>
            <span className="mt-2 block text-sm tabular-nums text-ink">
              <span className="font-medium">{KERLWERK_X_FOLLOWERS.toLocaleString("de-DE")}</span>
              <span className="text-ink-muted"> Follower</span>
            </span>
          </span>
          <span className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary group-hover:underline">
            <XMark className="size-4" />
            Auf X ansehen
          </span>
        </div>
      </div>
    </a>
  );
}

export function KerlwerkXLink({ className }: { className?: string }) {
  return (
    <a
      href={KERLWERK_X_URL}
      target="_blank"
      rel="noreferrer noopener"
      className={cn("inline-flex min-h-11 items-center gap-2 text-ink hover:underline", className)}
    >
      <XMark className="size-3.5" />
      Kerlwerk auf X
    </a>
  );
}
