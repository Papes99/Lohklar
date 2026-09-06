import { Link, useRouterState } from "@tanstack/react-router";
import {
  Compass,
  Folder,
  LayoutDashboard,
  Map,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const FALLARBEIT_NAV = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/klar-o-mat", label: "Klar-o-Mat", icon: Compass },
  { to: "/app/fallordner", label: "Fälle", icon: Folder },
  { to: "/app/lohlotse", label: "Lohlotse", icon: MessageCircle },
  { to: "/kliniken", label: "Steckbriefe", icon: Map },
] as const;

export type FallarbeitNavTo = (typeof FALLARBEIT_NAV)[number]["to"];

export function isFallarbeitNavActive(pathname: string, to: FallarbeitNavTo): boolean {
  if (to === "/app") return pathname === "/app";
  if (to === "/kliniken") return pathname === "/kliniken" || pathname.startsWith("/kliniken/");
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function FallarbeitNavLink({
  to,
  label,
  icon: Icon,
  compact,
}: {
  to: FallarbeitNavTo;
  label: string;
  icon: LucideIcon;
  compact?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = isFallarbeitNavActive(pathname, to);
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

/** Fixed bottom Fallarbeit tabs — mobile only (`lg:hidden`). */
export function FallarbeitMobileNav() {
  return (
    <nav
      aria-label="Fallarbeit mobil"
      className="no-print fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-line bg-surface lg:hidden"
    >
      {FALLARBEIT_NAV.map((item) => (
        <FallarbeitNavLink key={item.to} {...item} compact />
      ))}
    </nav>
  );
}
