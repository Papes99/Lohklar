import { useEffect } from "react";
import { InstallHint } from "./install-hint";
import { UpdateBanner } from "./update-banner";

export function PwaRuntime() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (!window.isSecureContext) return;
    const host = window.location.hostname;
    if (host.endsWith(".grok-sandbox.com") || host === "localhost" || host === "127.0.0.1") {
      return;
    }
    void navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
      /* Registration is best-effort; the site stays usable without it. */
    });
  }, []);

  return (
    <>
      <InstallHint />
      <UpdateBanner />
    </>
  );
}
