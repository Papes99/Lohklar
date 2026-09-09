import { useState } from "react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SiteFooter } from "@/components/brand/site-footer";
import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { invitePath } from "@/lib/domain/teams";
import { acceptInvite, peekInvite } from "@/lib/server/teams";

export const Route = createFileRoute("/einladung/$token")({
  component: InvitePage,
});

function InvitePage() {
  const { token } = Route.useParams();
  const { user, isPending } = useCurrentUserState();
  const peek = useQuery({
    queryKey: ["invite-peek", token],
    queryFn: () => peekInvite({ data: token }),
  });
  const [acceptedId, setAcceptedId] = useState<string | null>(null);
  const accept = useMutation({
    mutationFn: () => acceptInvite({ data: token }),
    onSuccess: (result) => setAcceptedId(result.teamId),
  });

  if (acceptedId) {
    return <Navigate to="/app/team/$teamId" params={{ teamId: acceptedId }} />;
  }

  const next = invitePath(token);

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <header className="px-4 py-6">
        <Wordmark size="sm" />
      </header>
      <main id="inhalt" className="mx-auto w-full max-w-md flex-1 px-4 pb-16">
        <h1 className="font-display text-3xl tracking-tight">Einladung zum Team-Raum</h1>
        {peek.isPending || isPending ? (
          <p className="mt-4 text-ink-muted">Einladung wird geprüft…</p>
        ) : (
          <>
            <p className="mt-3 text-ink-muted">{peek.data?.message}</p>
            {peek.data?.open && peek.data.email ? (
              <p className="mt-2 text-sm text-ink-muted">Gilt für {peek.data.email}.</p>
            ) : null}
            {peek.data?.open ? (
              user ? (
                <div className="mt-6 space-y-3">
                  {accept.error ? (
                    <p className="text-sm text-danger">
                      {accept.error instanceof Error
                        ? accept.error.message
                        : "Annehmen ist fehlgeschlagen."}
                    </p>
                  ) : null}
                  <Button
                    type="button"
                    disabled={accept.isPending}
                    onClick={() => accept.mutate()}
                  >
                    {accept.isPending ? "Wird angenommen…" : "Einladung annehmen"}
                  </Button>
                </div>
              ) : (
                <div className="mt-6 space-y-3">
                  <p className="text-sm text-ink-muted">
                    Bitte anmelden oder ein Konto erstellen — mit derselben E-Mail wie in der
                    Einladung.
                  </p>
                  <Button asChild>
                    <Link to="/login" search={{ next }}>
                      Anmelden und annehmen
                    </Link>
                  </Button>
                </div>
              )
            ) : (
              <Button className="mt-6" asChild variant="secondary">
                <Link to="/app">Zur Fallarbeit</Link>
              </Button>
            )}
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
