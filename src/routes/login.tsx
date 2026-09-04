import { useState, type FormEvent } from "react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { SiteFooter } from "@/components/brand/site-footer";
import { FoundedLine, Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GROK_PROVIDERS,
  authClient,
  authEnabled,
  signIn,
} from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

type Search = { register?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    register: typeof search.register === "string" ? search.register : undefined,
  }),
  component: Login,
});

function Login() {
  const { register } = Route.useSearch();
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">(register === "1" ? "up" : "in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resetHint, setResetHint] = useState(false);
  const [busy, setBusy] = useState(false);

  if (isPending) {
    return (
      <main className="grid min-h-screen place-items-center bg-bg">
        <div className="h-40 w-80 animate-pulse rounded-[var(--radius-xl)] bg-bg-subtle" />
      </main>
    );
  }
  if (user) {
    return <Navigate to="/app" />;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setResetHint(false);
    try {
      if (mode === "up") {
        const result = await authClient.signUp.email({
          email,
          password,
          name: name.trim() || email,
          callbackURL: "/app",
        });
        if (result.error) throw new Error(result.error.message);
      } else {
        const result = await authClient.signIn.email({
          email,
          password,
          callbackURL: "/app",
        });
        if (result.error) throw new Error(result.error.message);
      }
      window.location.href = "/app";
    } catch {
      setError("E-Mail oder Passwort stimmen nicht.");
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <header className="px-4 py-6">
        <Wordmark size="sm" />
      </header>
      <main
        id="inhalt"
        className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 pb-16"
      >
        <FoundedLine />
        <h1 className="mt-3 font-display text-3xl tracking-tight">
          {mode === "up" ? "Konto erstellen" : "Anmelden"}
        </h1>
        <p className="mt-2 text-ink-muted">
          Für Fallarbeit mit getrennten Fallordnern. Jede Person darf sich registrieren.
        </p>

        {authEnabled ? (
          <div className="mt-6 space-y-2">
            {GROK_PROVIDERS.map((provider) => (
              <Button
                key={provider.providerId}
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() =>
                  void signIn(provider.providerId, { callbackURL: "/app" })
                }
              >
                Weiter mit {provider.label}
              </Button>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-ink-muted">Anmeldung ist deaktiviert.</p>
        )}

        <p className="my-6 text-center text-xs uppercase tracking-[0.14em] text-ink-muted">
          oder mit E-Mail
        </p>

        <form className="space-y-4" onSubmit={(event) => void onSubmit(event)}>
          {mode === "up" ? (
            <div className="space-y-2">
              <Label htmlFor="name">Ihr Name (Konto)</Label>
              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
              />
              <p className="text-xs text-ink-muted">
                Name der Fachkraft am Konto. Fallnamen gehören ausschließlich zum Fallordner.
              </p>
            </div>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Passwort</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={mode === "up" ? "new-password" : "current-password"}
            />
          </div>
          {error ? (
            <div className="space-y-3">
              <p className="text-sm text-danger">{error}</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setError(null);
                    setBusy(false);
                  }}
                >
                  Erneut versuchen
                </Button>
                <Button type="button" variant="ghost" onClick={() => setResetHint(true)}>
                  Passwort zurücksetzen
                </Button>
              </div>
            </div>
          ) : null}
          {resetHint ? (
            <p className="text-sm text-ink-muted">
              Ein Zurücksetzen per E-Mail ist hier nicht eingerichtet. Bitte legen Sie ein
              neues Konto an oder versuchen Sie es erneut.
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Bitte warten…" : mode === "up" ? "Konto erstellen" : "Anmelden"}
          </Button>
        </form>

        <button
          type="button"
          className="mt-4 min-h-11 text-sm text-primary hover:underline"
          onClick={() => {
            setMode((current) => (current === "up" ? "in" : "up"));
            setError(null);
          }}
        >
          {mode === "up" ? "Bereits registriert? Anmelden" : "Noch kein Konto? Konto erstellen"}
        </button>

        <p className="mt-8 text-sm text-ink-muted">
          Mit der Nutzung gelten{" "}
          <Link to="/datenschutz" className="underline">
            Datenschutz
          </Link>{" "}
          und{" "}
          <Link to="/impressum" className="underline">
            Impressum
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
