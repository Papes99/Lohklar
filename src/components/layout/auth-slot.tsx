import { Link, useRouteContext } from "@tanstack/react-router";
import { ProfileChip } from "@/components/layout/profile-chip";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function AuthSlot() {
  const { sessionUser } = useRouteContext({ from: "__root__" });
  const { user } = useCurrentUserState();

  if (user) {
    return (
      <ProfileChip
        name={user.displayName ?? user.primaryEmail ?? "Profil"}
        image={user.profileImageUrl}
      />
    );
  }

  if (sessionUser) {
    return (
      <ProfileChip name={sessionUser.email ?? "Profil"} />
    );
  }

  return (
    <Link
      to="/login"
      className="inline-flex min-h-11 shrink-0 items-center rounded-[var(--radius-md)] bg-primary px-4 text-sm font-medium text-primary-fg"
    >
      Anmelden
    </Link>
  );
}
