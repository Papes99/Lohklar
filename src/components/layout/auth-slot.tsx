import { Link, useRouteContext } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function AuthSlot() {
  const { sessionUser } = useRouteContext({ from: "__root__" });
  const { user, isPending } = useCurrentUserState();
  const signedIn = Boolean(user || sessionUser);

  if (!signedIn) {
    return (
      <Link
        to="/login"
        className="inline-flex min-h-11 items-center rounded-[var(--radius-md)] bg-primary px-4 text-sm font-medium text-primary-fg"
      >
        Anmelden
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        to="/app"
        className="inline-flex min-h-11 items-center px-2 text-sm font-medium text-primary hover:underline"
      >
        Zur Fallarbeit
      </Link>
      {isPending && !user ? null : <UserButton />}
    </div>
  );
}
