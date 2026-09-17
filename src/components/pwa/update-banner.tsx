import { useEffect, useState } from "react";

type UpdatePayload = {
  version: string;
  title: string;
  body?: string;
};

const STORAGE_KEY = "lohklar-update-dismissed";

export function UpdateBanner() {
  const [update, setUpdate] = useState<UpdatePayload | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const host = window.location.hostname;
    if (host.endsWith(".grok-sandbox.com") || host === "localhost") return;
    if (window.location.pathname.startsWith("/login")) return;

    let cancelled = false;
    void fetch("/update.json", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: UpdatePayload | null) => {
        if (cancelled || !data?.version || !data.title) return;
        const dismissed = window.localStorage.getItem(STORAGE_KEY);
        if (dismissed === data.version) return;
        setUpdate(data);
      })
      .catch(() => {
        /* Banner ist optional. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!update) return null;

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, update.version);
    setUpdate(null);
  };

  const reload = () => {
    window.localStorage.setItem(STORAGE_KEY, update.version);
    window.location.reload();
  };

  return (
    <div
      className="no-print fixed inset-x-0 bottom-0 z-40 mx-auto mb-4 w-[calc(100%-1.5rem)] max-w-lg rounded-[var(--radius-md)] border border-line bg-surface px-4 py-3 shadow-[var(--shadow-border)]"
      role="status"
    >
      <p className="text-sm font-medium text-ink">{update.title}</p>
      {update.body ? <p className="mt-1 text-xs text-ink-muted">{update.body}</p> : null}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-fg"
          onClick={reload}
        >
          Aktualisieren
        </button>
        <button type="button" className="rounded-full px-3 py-1.5 text-xs text-ink-muted" onClick={dismiss}>
          Später
        </button>
      </div>
    </div>
  );
}
