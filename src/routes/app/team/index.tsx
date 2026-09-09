import { type FormEvent, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROLE_LABEL } from "@/lib/domain/teams";
import { createTeam, listMyTeams } from "@/lib/server/teams";

export const Route = createFileRoute("/app/team/")({
  component: TeamListPage,
});

function TeamListPage() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["teams"], queryFn: () => listMyTeams() });
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const create = useMutation({
    mutationFn: () => createTeam({ data: { name } }),
    onSuccess: async () => {
      setName("");
      setError(null);
      await queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
    onError: (err: Error) => setError(err.message || "Team-Raum konnte nicht angelegt werden."),
  });

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    create.mutate();
  }

  const teams = query.data ?? [];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl tracking-tight">Team-Raum</h1>
        <p className="mt-2 max-w-xl text-ink-muted">
          Gemeinsame Arbeit einer Beratungsstelle. Fälle bleiben privat, bis Sie sie dem Raum
          zuordnen.
        </p>
      </header>

      <section className="rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <h2 className="font-display text-2xl tracking-tight">Raum anlegen</h2>
        <form className="mt-4 space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="team-name">Name der Stelle</Label>
            <Input
              id="team-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="z. B. Beratungsstelle Altona"
              maxLength={80}
              required
            />
          </div>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" disabled={create.isPending}>
            {create.isPending ? "Anlegen…" : "Team-Raum anlegen"}
          </Button>
        </form>
        <p className="mt-3 text-sm text-ink-muted">Sie werden Leitung dieses Raums.</p>
      </section>

      {query.isPending ? (
        <p className="text-ink-muted">Team-Räume werden geladen…</p>
      ) : teams.length === 0 ? (
        <p className="text-ink-muted">Noch kein Team-Raum. Legen Sie einen an oder nehmen Sie eine Einladung an.</p>
      ) : (
        <ul className="grid gap-3">
          {teams.map((team) => (
            <li key={team.id}>
              <Link
                to="/app/team/$teamId"
                params={{ teamId: team.id }}
                className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
              >
                <span>
                  <span className="font-medium">{team.name}</span>
                  <span className="mt-1 block text-sm text-ink-muted">
                    {ROLE_LABEL[team.role]} · {team.memberCount}{" "}
                    {team.memberCount === 1 ? "Person" : "Personen"}
                  </span>
                </span>
                <span className="text-sm font-medium text-primary">Öffnen</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
