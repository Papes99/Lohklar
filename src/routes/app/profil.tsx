import { type FormEvent, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient, signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getProfile, updateProfile } from "@/lib/server/profile";

export const Route = createFileRoute("/app/profil")({
  component: ProfilPage,
});

function ProfilPage() {
  const { user } = useCurrentUserState();
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["profile"], queryFn: () => getProfile() });
  const profile = query.data;
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  const displayName = name ?? profile?.name ?? user?.displayName ?? "";

  const save = useMutation({
    mutationFn: (next: string) => updateProfile({ data: { name: next } }),
    onSuccess: async (next) => {
      setError(null);
      setName(next.name);
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      try {
        await authClient.updateUser({ name: next.name });
      } catch {
        /* session cache refreshes on next load */
      }
    },
    onError: () => setError("Der Name konnte nicht gespeichert werden."),
  });

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    save.mutate(displayName);
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <header>
        <h1 className="font-display text-3xl tracking-tight">Profil</h1>
        <p className="mt-2 text-ink-muted">
          Konto der Fachkraft. Fallnamen sitzen ausschließlich am Fallordner.
        </p>
      </header>

      <section className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <div className="flex items-center gap-4">
          {profile?.image || user?.profileImageUrl ? (
            <img
              src={profile?.image ?? user?.profileImageUrl ?? ""}
              alt=""
              className="size-16 rounded-full object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <span className="grid size-16 place-items-center rounded-full bg-primary-soft font-display text-2xl text-primary">
              {(displayName || "P").charAt(0).toUpperCase()}
            </span>
          )}
          <div className="min-w-0">
            <p className="font-display text-xl tracking-tight">{displayName || "Profil"}</p>
            {profile?.admin ? (
              <p className="mt-1 text-sm text-ink-muted">Admin. Nutzung im Dashboard sichtbar.</p>
            ) : (
              <p className="mt-1 text-sm text-ink-muted">Fachkraft-Konto</p>
            )}
          </div>
        </div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="profile-name">Name am Konto</Label>
            <Input
              id="profile-name"
              value={displayName}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              maxLength={80}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-email">E-Mail</Label>
            <Input
              id="profile-email"
              value={profile?.email ?? user?.primaryEmail ?? ""}
              readOnly
              className="text-ink-muted"
            />
          </div>
          {profile?.providers.length ? (
            <p className="text-sm text-ink-muted">
              Anmeldung über {profile.providers.join(", ")}.
            </p>
          ) : null}
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" disabled={save.isPending}>
            {save.isPending ? "Speichern…" : "Speichern"}
          </Button>
        </form>
      </section>

      <Button
        variant="ghost"
        disabled={signingOut}
        onClick={() => {
          setSigningOut(true);
          void signOut("/login").catch(() => {
            setSigningOut(false);
            setError("Abmelden ist fehlgeschlagen. Bitte erneut versuchen.");
          });
        }}
      >
        {signingOut ? "Abmelden…" : "Abmelden"}
      </Button>
    </div>
  );
}
