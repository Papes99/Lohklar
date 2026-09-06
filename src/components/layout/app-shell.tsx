import { ClaimGuestDialog } from "@/components/klaromat/claim-guest-dialog";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { Wordmark } from "@/components/brand/wordmark";
import {
  FALLARBEIT_NAV,
  FallarbeitMobileNav,
  FallarbeitNavLink,
} from "@/components/layout/fallarbeit-nav";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

export function AppShell() {
  const { user, isPending } = useCurrentUserState();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const wide = pathname.startsWith("/app/lohlotse");
  const dashboard = pathname === "/app";
  if (isPending) {
    return (
      <div className="min-h-screen bg-bg p-6">
        <div className="mx-auto max-w-5xl space-y-4">
          <div className="h-14 animate-pulse rounded-[var(--radius-lg)] bg-bg-subtle" />
          <div className="h-64 animate-pulse rounded-[var(--radius-xl)] bg-bg-subtle" />
        </div>
      </div>
    );
  }
  if (!user) return <RedirectToSignIn />;

  return (
    <div className={cn("min-h-screen bg-bg pb-20 lg:pb-0", dashboard && "bg-white lg:bg-bg")}>
      <aside className="no-print hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-line lg:bg-surface lg:p-5">
        <Wordmark size="sm" to="/" />
        <nav aria-label="Fallarbeit" className="mt-8 flex flex-col gap-1">
          {FALLARBEIT_NAV.map((item) => (
            <FallarbeitNavLink key={item.to} {...item} />
          ))}
        </nav>
        <div className="mt-auto pt-6">
          <UserButton />
        </div>
      </aside>
      <header className="no-print flex items-center justify-between border-b border-line bg-surface px-4 py-3 lg:hidden">
        <Wordmark size="sm" to="/" stacked={false} />
        <UserButton />
      </header>
      <div className={cn("lg:pl-64", dashboard && "bg-white")}>
        <div
          id="inhalt"
          className={cn(
            "mx-auto",
            dashboard
              ? "flex min-h-0 flex-col px-4 py-3 sm:px-5 lg:h-screen lg:overflow-hidden lg:px-6 lg:py-4"
              : cn("px-4 py-6 sm:px-6", wide ? "max-w-7xl" : "max-w-5xl"),
          )}
        >
          <ClaimGuestDialog />
          <Outlet />
        </div>
      </div>
      <FallarbeitMobileNav />
    </div>
  );
}
