export type TeamRole = "leitung" | "mitglied";
export type InviteStatus = "offen" | "angenommen" | "widerrufen";

export const TEAM_ROLES: { id: TeamRole; label: string }[] = [
  { id: "leitung", label: "Leitung" },
  { id: "mitglied", label: "Mitglied" },
];

export const ROLE_LABEL: Record<TeamRole, string> = {
  leitung: "Leitung",
  mitglied: "Mitglied",
};

export const INVITE_TTL_MS = 14 * 24 * 60 * 60 * 1000;

export function isTeamRole(value: string): value is TeamRole {
  return value === "leitung" || value === "mitglied";
}

export function cleanTeamName(raw: string): string | null {
  const name = raw.replace(/\s+/g, " ").trim();
  if (name.length < 2 || name.length > 80) return null;
  return name;
}

export function cleanInviteEmail(raw: string): string | null {
  const email = raw.replace(/\s+/g, "").trim().toLowerCase();
  if (email.length < 5 || email.length > 160) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

export function emailsMatch(a: string, b: string): boolean {
  return cleanInviteEmail(a) === cleanInviteEmail(b) && Boolean(cleanInviteEmail(a));
}

export function inviteExpiresAt(now = new Date()): Date {
  return new Date(now.getTime() + INVITE_TTL_MS);
}

export function isInviteOpen(status: string, expiresAt: Date, now = new Date()): boolean {
  return status === "offen" && expiresAt.getTime() > now.getTime();
}

export function canManageTeam(role: TeamRole | null | undefined): boolean {
  return role === "leitung";
}

export function removalBlock(input: {
  actorRole: TeamRole | null;
  targetRole: TeamRole;
  targetIsSelf: boolean;
  leitungCount: number;
}): string | null {
  if (!canManageTeam(input.actorRole)) {
    return "Nur die Leitung darf Mitglieder entfernen.";
  }
  if (input.targetIsSelf && input.targetRole === "leitung" && input.leitungCount <= 1) {
    return "Die letzte Leitung kann den Raum nicht verlassen, ohne eine andere Leitung einzusetzen.";
  }
  if (input.targetRole === "leitung" && input.leitungCount <= 1) {
    return "Die letzte Leitung kann nicht entfernt werden.";
  }
  return null;
}

export function canAssignFolder(input: { isOwner: boolean; isMember: boolean }): boolean {
  return input.isOwner && input.isMember;
}

export function canUnassignFolder(input: { isOwner: boolean; actorRole: TeamRole | null }): boolean {
  return input.isOwner || canManageTeam(input.actorRole);
}

/** Relative return paths only — no open redirects. */
export function safeReturnPath(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const path = value.trim();
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("://")) return null;
  if (path.startsWith("/einladung/") || path.startsWith("/app")) return path;
  return null;
}

export function invitePath(rawToken: string): string {
  return `/einladung/${encodeURIComponent(rawToken)}`;
}

export function inviteUrl(origin: string, rawToken: string): string {
  const base = origin.replace(/\/$/, "") || "https://lohklar.de";
  return `${base}${invitePath(rawToken)}`;
}
