import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type UpdatePayload = {
  version: string;
  title: string;
  body?: string;
  href?: string;
  cta?: string;
};

function storageKey(version: string) {
  return `lohklar-update-${version}`;
}

export function UpdateBanner() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [update, setUpdate] = useState<UpdatePayload | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    void fetch("/update.json", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: UpdatePayload | null) => {
        if (cancelled || !data?.version || !data.title) return;
        try {
          if (window.localStorage.getItem(storageKey(data.version)) === "1") return;
        } catch {
          /* Banner trotzdem zeigen. */
        }
        setUpdate(data);
      })
      .catch(() => {
        /* Banner ist optional. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onLogin = pathname === "/login" || pathname.startsWith("/login/");
  if (!update || onLogin) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(storageKey(update.version), "1");
    } catch {
      /* ignore */
    }
    setUpdate(null);
  };

  return (
    <div
      className={cn(
        "no-print fixed inset-x-3 z-30 mx-auto max-w-lg rounded-[var(--radius-md)] border border-line bg-surface px-4 py-3 shadow-[var(--shadow-border)]",
        "bottom-[4.75rem] lg:bottom-4",
      )}
      role="status"
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink">{update.title}</p>
          {update.body ? <p className="mt-1 text-xs text-ink-muted">{update.body}</p> : null}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {update.cta && update.href === "/kliniken" ? (
              <Link
                to="/kliniken"
                className="inline-flex min-h-11 items-center rounded-full bg-primary px-3 text-xs font-medium text-primary-fg"
                onClick={dismiss}
              >
                {update.cta}
              </Link>
            ) : null}
            <button
              type="button"
              className="inline-flex min-h-11 items-center rounded-full px-3 text-xs font-medium text-ink-muted hover:bg-bg-subtle"
              onClick={dismiss}
            >
              Verstanden
            </button>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-lg leading-none text-ink-muted hover:bg-bg-subtle"
          onClick={dismiss}
          aria-label="Schließen"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  );
}
