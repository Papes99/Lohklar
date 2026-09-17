import type { ReactNode } from "react";
import { ClaimGuestDialog } from "@/components/klaromat/claim-guest-dialog";
import { Outlet, useRouteContext } from "@tanstack/react-router";
import { Wordmark } from "@/components/brand/wordmark";
import {
  FALLARBEIT_NAV,
  FallarbeitMobileNav,
  FallarbeitNavLink,
} from "@/components/layout/fallarbeit-nav";
import { ProfileChip } from "@/components/layout/profile-chip";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { resolveSignInGateState } from "@/lib/auth/sign-in-gate";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function AppShell() {
  const { sessionUser } = useRouteContext({ from: "__root__" });
  const { user, isPending } = useCurrentUserState();
  const signedIn = Boolean(user || sessionUser);
  const state = resolveSignInGateState({
    isPending: isPending && !signedIn,
    hasUser: signedIn,
  });

  if (state === "pending") {
    return (
      <AppChrome>
        <AppShellSkeleton />
      </AppChrome>
    );
  }
  if (state === "signed_out") return <RedirectToSignIn />;

  const chip = (
    <ProfileChip
      name={user?.displayName ?? user?.primaryEmail ?? sessionUser?.email ?? "Profil"}
      image={user?.profileImageUrl}
    />
  );

  return (
    <AppChrome chip={chip}>
      <ClaimGuestDialog />
      <Outlet />
    </AppChrome>
  );
}

function AppChrome({ chip, children }: { chip?: ReactNode; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg pb-20 lg:pb-0">
      <aside className="no-print hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-line lg:bg-surface lg:p-5">
        <Wordmark size="sm" to="/" />
        <nav aria-label="Fallarbeit" className="mt-8 flex flex-col gap-1">
          {FALLARBEIT_NAV.map((item) => (
            <FallarbeitNavLink key={item.to} {...item} />
          ))}
        </nav>
        {chip ? <div className="mt-auto pt-6">{chip}</div> : null}
      </aside>
      <header className="no-print flex items-center justify-between border-b border-line bg-surface px-4 py-3 lg:hidden">
        <Wordmark size="sm" to="/" />
        {chip}
      </header>
      <div className="lg:pl-64">
        <div id="inhalt" className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          {children}
        </div>
      </div>
      <FallarbeitMobileNav />
    </div>
  );
}

function AppShellSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true">
      <div className="h-14 animate-pulse rounded-[var(--radius-lg)] bg-bg-subtle" />
      <div className="h-64 animate-pulse rounded-[var(--radius-xl)] bg-bg-subtle" />
    </div>
  );
}
