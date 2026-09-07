import { ClaimGuestDialog } from "@/components/klaromat/claim-guest-dialog";
import { Outlet } from "@tanstack/react-router";
import { Wordmark } from "@/components/brand/wordmark";
import {
  FALLARBEIT_NAV,
  FallarbeitMobileNav,
  FallarbeitNavLink,
} from "@/components/layout/fallarbeit-nav";
import { ProfileChip } from "@/components/layout/profile-chip";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function AppShell() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <div className="min-h-screen bg-bg p-6">
        <div className="mx-auto max-w-6xl space-y-4">
          <div className="h-14 animate-pulse rounded-[var(--radius-lg)] bg-bg-subtle" />
          <div className="h-64 animate-pulse rounded-[var(--radius-xl)] bg-bg-subtle" />
        </div>
      </div>
    );
  }
  if (!user) return <RedirectToSignIn />;

  const chip = (
    <ProfileChip
      name={user.displayName ?? user.primaryEmail ?? "Profil"}
      image={user.profileImageUrl}
    />
  );

  return (
    <div className="min-h-screen bg-bg pb-20 lg:pb-0">
      <aside className="no-print hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-line lg:bg-surface lg:p-5">
        <Wordmark size="sm" to="/" />
        <nav aria-label="Fallarbeit" className="mt-8 flex flex-col gap-1">
          {FALLARBEIT_NAV.map((item) => (
            <FallarbeitNavLink key={item.to} {...item} />
          ))}
        </nav>
        <div className="mt-auto pt-6">{chip}</div>
      </aside>
      <header className="no-print flex items-center justify-between border-b border-line bg-surface px-4 py-3 lg:hidden">
        <Wordmark size="sm" to="/" />
        {chip}
      </header>
      <div className="lg:pl-64">
        <div id="inhalt" className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <ClaimGuestDialog />
          <Outlet />
        </div>
      </div>
      <FallarbeitMobileNav />
    </div>
  );
}
