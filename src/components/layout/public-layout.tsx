import type { ReactNode } from "react";
import { SiteFooter } from "@/components/brand/site-footer";
import { FallarbeitMobileNav } from "@/components/layout/fallarbeit-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

/**
 * Marketing / public chrome. When signed in, shows the same mobile bottom
 * Fallarbeit tab bar as AppShell and hides the competing top link strip.
 */
export function PublicLayout({
  children,
  footer = true,
}: {
  children: ReactNode;
  footer?: boolean;
}) {
  const { user, isPending } = useCurrentUserState();
  const showAppNav = Boolean(user) && !isPending;

  return (
    <div className={cn("min-h-screen bg-bg", showAppNav && "pb-20 lg:pb-0")}>
      <PublicHeader />
      {children}
      {footer ? <SiteFooter /> : null}
      {showAppNav ? <FallarbeitMobileNav /> : null}
    </div>
  );
}
