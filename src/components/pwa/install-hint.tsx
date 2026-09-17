import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "lohklar-pwa-hint-dismissed";

export function InstallHint() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      return;
    }

    const onPrompt = (raw: Event) => {
      raw.preventDefault();
      setEvent(raw as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!event) return null;

  return (
    <div className="fixed inset-x-3 bottom-[4.75rem] z-40 mx-auto max-w-md rounded-[var(--radius-lg)] bg-surface px-4 py-3 shadow-[var(--shadow-border)] lg:bottom-4">
      <p className="text-sm text-ink">Lohklar als App auf dem Startbildschirm ablegen.</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="min-h-11 rounded-[var(--radius-md)] bg-primary px-3 text-sm font-medium text-primary-fg"
          onClick={() => {
            void event.prompt().finally(() => setEvent(null));
          }}
        >
          App installieren
        </button>
        <button
          type="button"
          className="min-h-11 rounded-[var(--radius-md)] px-3 text-sm text-ink-muted hover:bg-bg-subtle"
          onClick={() => {
            try {
              window.localStorage.setItem(DISMISS_KEY, "1");
            } catch {
              /* ignore */
            }
            setEvent(null);
          }}
        >
          Später
        </button>
      </div>
    </div>
  );
}
