import { QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Toaster } from "sonner";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { UsageBeacon } from "@/components/usage/beacon";
import { AuthProvider } from "@/lib/auth/provider";
import { getQueryClient } from "@/lib/query";
import appCss from "../styles.css?url";

const APP_NAME = "Lohklar";

const fetchSessionUser = createServerFn({ method: "GET" }).handler(async () => {
  const { getSessionUser } = await import("@/lib/auth/verify.server");
  const user = await getSessionUser();
  return user ? { id: user.id, email: user.email } : null;
});

export const Route = createRootRoute({
  beforeLoad: async () => ({ sessionUser: await fetchSessionUser() }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Lohklar — Orientierung in der medizinischen Rehabilitation. founded by Kerlwerk.",
      },
      { name: "theme-color", content: "#F3F0E8" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  const queryClient = getQueryClient();
  return (
    <html lang="de" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-bg font-sans text-ink">
        <PreviewHostBridge />
        <a href="#inhalt" className="skip-link">
          Zum Inhalt
        </a>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <UsageBeacon />
            <Outlet />
            <Toaster
              position="bottom-right"
              toastOptions={{
                className: "font-sans text-ink bg-surface border-line",
              }}
            />
          </AuthProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}
