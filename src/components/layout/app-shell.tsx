import { ClaimGuestDialog } from "@/components/klaromat/claim-guest-dialog";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Compass,
  Folder,
  LayoutDashboard,
  Map,
  MessageCircle,
} from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/klar-o-mat", label: "Klar-o-Mat", icon: Compass },
  { to: "/app/fallordner", label: "Fälle", icon: Folder },
  { to: "/app/lohlotse", label: "Lohlotse", icon: MessageCircle },
  { to: "/kliniken", label: "Steckbriefe", icon: Map },
] as const;

export function AppShell() {
  const { user, isPending } = useCurrentUserState();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const wide = pathname.startsWith("/app/lohlotse");
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
    <div className="min-h-screen bg-bg pb-20 lg:pb-0">
      <aside className="no-print hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-line lg:bg-surface lg:p-5">
        <Wordmark size="sm" to="/app" />
        <nav aria-label="Fallarbeit" className="mt-8 flex flex-col gap-1">
          {NAV.map((item) => (
            <NavLink key={item.to} {...item} />
          ))}
        </nav>
        <div className="mt-auto pt-6">
          <UserButton />
        </div>
      </aside>
      <header className="no-print flex items-center justify-between border-b border-line bg-surface px-4 py-3 lg:hidden">
        <Wordmark size="sm" to="/app" stacked={false} />
        <UserButton />
      </header>
      <div className="lg:pl-64">
        <div
          id="inhalt"
          className={cn("mx-auto px-4 py-6 sm:px-6", wide ? "max-w-7xl" : "max-w-5xl")}
        >
          <ClaimGuestDialog />
          <Outlet />
        </div>
      </div>
      <nav
        aria-label="Fallarbeit mobil"
        className="no-print fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-line bg-surface lg:hidden"
      >
        {NAV.map((item) => (
          <NavLink key={item.to} {...item} compact />
        ))}
      </nav>
    </div>
  );
}

function NavLink({
  to,
  label,
  icon: Icon,
  compact,
}: {
  to: (typeof NAV)[number]["to"];
  label: string;
  icon: typeof LayoutDashboard;
  compact?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active =
    to === "/app" ? pathname === "/app" : pathname === to || pathname.startsWith(`${to}/`);
  return (
    <Link
      to={to}
      className={cn(
        "flex min-h-12 items-center gap-2 rounded-[var(--radius-md)] px-3 text-sm font-medium",
        compact && "flex-col justify-center gap-0.5 px-1 text-[11px]",
        active ? "bg-primary-soft text-primary" : "text-ink-muted hover:bg-bg-subtle hover:text-ink",
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </Link>
  );
}
