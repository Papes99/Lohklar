import { type FormEvent, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROLE_LABEL, canManageTeam } from "@/lib/domain/teams";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  createInvite,
  getTeam,
  removeMember,
  revokeInvite,
} from "@/lib/server/teams";

export const Route = createFileRoute("/app/team/$teamId")({
  component: TeamDetailPage,
});

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

function TeamDetailPage() {
  const { teamId } = Route.useParams();
  const { user } = useCurrentUserState();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["team", teamId],
    queryFn: () => getTeam({ data: teamId }),
  });
  const [email, setEmail] = useState("");
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const invite = useMutation({
    mutationFn: () => createInvite({ data: { teamId, email } }),
    onSuccess: async (result) => {
      setEmail("");
      setInviteUrl(result.url);
      setCopied(false);
      setError(null);
      await queryClient.invalidateQueries({ queryKey: ["team", teamId] });
    },
    onError: (err: Error) => setError(err.message || "Einladung fehlgeschlagen."),
  });

  const revoke = useMutation({
    mutationFn: (inviteId: string) => revokeInvite({ data: { inviteId } }),
    onSuccess: async () => {
      setError(null);
      await queryClient.invalidateQueries({ queryKey: ["team", teamId] });
    },
    onError: (err: Error) => setError(err.message),
  });

  const remove = useMutation({
    mutationFn: (userId: string) => removeMember({ data: { teamId, userId } }),
    onSuccess: async () => {
      setError(null);
      await queryClient.invalidateQueries({ queryKey: ["team", teamId] });
    },
    onError: (err: Error) => setError(err.message),
  });

  function onInvite(event: FormEvent) {
    event.preventDefault();
    invite.mutate();
  }

  const team = query.data;
  if (query.isPending) return <p className="text-ink-muted">Team-Raum wird geladen…</p>;
  if (query.isError || !team) {
    return (
      <p>
        Team-Raum nicht gefunden.{" "}
        <Link to="/app/team" className="text-primary underline">
          Zur Übersicht
        </Link>
      </p>
    );
  }

  const leitung = canManageTeam(team.role);
  const pending = team.invites.filter((item) => item.open);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
          <Link to="/app/team" className="hover:underline">
            Team-Raum
          </Link>
        </p>
        <h1 className="mt-1 font-display text-3xl tracking-tight">{team.name}</h1>
        <p className="mt-2 text-ink-muted">
          Ihre Rolle: {ROLE_LABEL[team.role]}. Fälle werden nur sichtbar, wenn sie diesem Raum
          zugeordnet sind.
        </p>
      </header>

      {error ? <p className="text-sm text-danger">{error}</p> : null}

      {leitung ? (
        <section className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
          <h2 className="font-display text-2xl tracking-tight">Kollegin einladen</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Es wird ein Link erzeugt, den Sie selbst weitergeben. Lohklar versendet derzeit keine
            E-Mail.
          </p>
          <form className="mt-4 space-y-4" onSubmit={onInvite}>
            <div className="space-y-2">
              <Label htmlFor="invite-email">E-Mail der Fachkraft</Label>
              <Input
                id="invite-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <Button type="submit" disabled={invite.isPending}>
              {invite.isPending ? "Link wird erzeugt…" : "Einladungslink erzeugen"}
            </Button>
          </form>
          {inviteUrl ? (
            <div className="mt-4 space-y-3 rounded-[var(--radius-lg)] bg-bg p-4">
              <p className="text-sm font-medium">Link zum Kopieren</p>
              <p className="break-all text-sm text-ink-muted">{inviteUrl}</p>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  void copyText(inviteUrl).then((ok) => setCopied(ok));
                }}
              >
                {copied ? "Kopiert" : "Link kopieren"}
              </Button>
            </div>
          ) : null}
        </section>
      ) : null}

      <section>
        <h2 className="font-display text-2xl tracking-tight">Mitglieder</h2>
        <ul className="mt-4 grid gap-3">
          {team.members.map((member) => (
            <li
              key={member.userId}
              className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]"
            >
              <span>
                <span className="font-medium">{member.name}</span>
                <span className="mt-1 block text-sm text-ink-muted">
                  {ROLE_LABEL[member.role]}
                  {member.email ? ` · ${member.email}` : ""}
                </span>
              </span>
              {leitung && member.userId !== user?.id ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => remove.mutate(member.userId)}
                  disabled={remove.isPending}
                >
                  Entfernen
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      {leitung ? (
        <section>
          <h2 className="font-display text-2xl tracking-tight">Ausstehende Einladungen</h2>
          {pending.length === 0 ? (
            <p className="mt-3 text-ink-muted">Keine offenen Einladungen.</p>
          ) : (
            <ul className="mt-4 grid gap-3">
              {pending.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]"
                >
                  <span>
                    <span className="font-medium">{item.email}</span>
                    <span className="mt-1 block text-sm text-ink-muted">
                      Gültig bis {new Date(item.expiresAt).toLocaleDateString("de-DE")}
                    </span>
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => revoke.mutate(item.id)}
                    disabled={revoke.isPending}
                  >
                    Widerrufen
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}
    </div>
  );
}
