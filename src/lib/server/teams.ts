import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql, type Sql } from "@/lib/db";
import { createInviteToken, hashInviteToken } from "@/lib/domain/team-token";
import {
  canAssignFolder,
  canManageTeam,
  canUnassignFolder,
  cleanInviteEmail,
  cleanTeamName,
  emailsMatch,
  inviteExpiresAt,
  inviteUrl,
  isInviteOpen,
  isTeamRole,
  removalBlock,
  type TeamRole,
} from "@/lib/domain/teams";
import { asIso } from "./cases-shared";
import { requireFolderAccess } from "./folder-access";

export type TeamSummary = {
  id: string;
  name: string;
  role: TeamRole;
  memberCount: number;
  createdAt: string;
};

export type TeamMemberRow = {
  userId: string;
  name: string;
  email: string | null;
  role: TeamRole;
  createdAt: string;
};

export type TeamInviteRow = {
  id: string;
  email: string;
  role: TeamRole;
  status: string;
  expiresAt: string;
  createdAt: string;
  open: boolean;
};

export type TeamDetail = {
  id: string;
  name: string;
  role: TeamRole;
  members: TeamMemberRow[];
  invites: TeamInviteRow[];
};

function appOrigin(): string {
  const raw = typeof process !== "undefined" ? process.env.BETTER_AUTH_URL : undefined;
  const url = raw?.trim();
  if (url) return url.replace(/\/$/, "");
  return "https://lohklar.de";
}

async function requireMembership(
  sql: Sql,
  teamId: string,
  userId: string,
): Promise<TeamRole> {
  const rows = await sql<{ role: string }>`
    select role from team_members where team_id = ${teamId} and user_id = ${userId}
  `;
  const role = rows[0]?.role;
  if (!role || !isTeamRole(role)) throw new Error("Kein Zugang zu diesem Team-Raum.");
  return role;
}

async function leitungCount(sql: Sql, teamId: string): Promise<number> {
  const rows = await sql<{ n: number }>`
    select count(*)::int as n from team_members where team_id = ${teamId} and role = 'leitung'
  `;
  return Number(rows[0]?.n ?? 0);
}

export const listMyTeams = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<TeamSummary[]> => {
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      name: string;
      role: string;
      member_count: number;
      created_at: string;
    }>`
      select
        t.id,
        t.name,
        m.role,
        (select count(*)::int from team_members x where x.team_id = t.id) as member_count,
        t.created_at
      from team_members m
      join teams t on t.id = m.team_id
      where m.user_id = ${context.userId}
      order by t.name asc
    `;
    return rows.flatMap((row) =>
      isTeamRole(row.role)
        ? [
            {
              id: row.id,
              name: row.name,
              role: row.role,
              memberCount: Number(row.member_count),
              createdAt: asIso(row.created_at),
            },
          ]
        : [],
    );
  });

export const createTeam = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { name?: string }) => {
    const name = cleanTeamName(typeof input?.name === "string" ? input.name : "");
    if (!name) throw new Error("Bitte einen Namen für den Team-Raum angeben (2–80 Zeichen).");
    return { name };
  })
  .handler(async ({ context, data }): Promise<TeamSummary> => {
    const sql = await getSql();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    await sql.query(`insert into teams (id, name, created_by, created_at, updated_at) values ($1,$2,$3,$4,$4)`, [
      id,
      data.name,
      context.userId,
      now,
    ]);
    await sql.query(`insert into team_members (team_id, user_id, role, created_at) values ($1,$2,'leitung',$3)`, [
      id,
      context.userId,
      now,
    ]);
    return {
      id,
      name: data.name,
      role: "leitung",
      memberCount: 1,
      createdAt: now,
    };
  });

export const getTeam = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((teamId: string) => teamId)
  .handler(async ({ context, data: teamId }): Promise<TeamDetail> => {
    const sql = await getSql();
    const role = await requireMembership(sql, teamId, context.userId);
    const teams = await sql<{ id: string; name: string }>`
      select id, name from teams where id = ${teamId}
    `;
    const team = teams[0];
    if (!team) throw new Error("Team-Raum nicht gefunden.");

    const memberRows = await sql<{
      user_id: string;
      role: string;
      created_at: string;
      name: string | null;
      email: string | null;
    }>`
      select m.user_id, m.role, m.created_at, u.name, u.email
      from team_members m
      left join "user" u on u.id = m.user_id
      where m.team_id = ${teamId}
      order by m.role asc, coalesce(u.name, u.email, m.user_id) asc
    `;

    const members: TeamMemberRow[] = memberRows.flatMap((row) =>
      isTeamRole(row.role)
        ? [
            {
              userId: row.user_id,
              name: row.name?.trim() || row.email || "Konto ohne Namen",
              email: row.email,
              role: row.role,
              createdAt: asIso(row.created_at),
            },
          ]
        : [],
    );

    let invites: TeamInviteRow[] = [];
    if (canManageTeam(role)) {
      const inviteRows = await sql<{
        id: string;
        email: string;
        role: string;
        status: string;
        expires_at: string;
        created_at: string;
      }>`
        select id, email, role, status, expires_at, created_at
        from team_invites
        where team_id = ${teamId}
        order by created_at desc
      `;
      const now = new Date();
      invites = inviteRows.map((row) => {
        const expiresAt = new Date(row.expires_at);
        return {
          id: row.id,
          email: row.email,
          role: isTeamRole(row.role) ? row.role : "mitglied",
          status: row.status,
          expiresAt: asIso(row.expires_at),
          createdAt: asIso(row.created_at),
          open: isInviteOpen(row.status, expiresAt, now),
        };
      });
    }

    return { id: team.id, name: team.name, role, members, invites };
  });

export const createInvite = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { teamId: string; email: string }) => {
    const email = cleanInviteEmail(input.email);
    if (!email) throw new Error("Bitte eine gültige E-Mail angeben.");
    if (!input.teamId) throw new Error("Team-Raum fehlt.");
    return { teamId: input.teamId, email };
  })
  .handler(async ({ context, data }): Promise<{ inviteId: string; email: string; expiresAt: string; url: string }> => {
    const sql = await getSql();
    const role = await requireMembership(sql, data.teamId, context.userId);
    if (!canManageTeam(role)) throw new Error("Nur die Leitung darf einladen.");

    const already = await sql<{ user_id: string }>`
      select m.user_id
      from team_members m
      join "user" u on u.id = m.user_id
      where m.team_id = ${data.teamId} and lower(u.email) = ${data.email}
    `;
    if (already[0]) throw new Error("Diese Person ist bereits im Team-Raum.");

    await sql.query(
      `update team_invites set status = 'widerrufen'
       where team_id = $1 and email = $2 and status = 'offen'`,
      [data.teamId, data.email],
    );

    const token = createInviteToken();
    const id = crypto.randomUUID();
    const expires = inviteExpiresAt();
    await sql.query(
      `insert into team_invites (
        id, team_id, email, role, token_hash, status, invited_by, expires_at, created_at
      ) values ($1,$2,$3,'mitglied',$4,'offen',$5,$6,now())`,
      [id, data.teamId, data.email, token.hash, context.userId, expires.toISOString()],
    );

    return {
      inviteId: id,
      email: data.email,
      expiresAt: expires.toISOString(),
      url: inviteUrl(appOrigin(), token.raw),
    };
  });

export const revokeInvite = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { inviteId: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{ id: string; team_id: string; status: string }>`
      select id, team_id, status from team_invites where id = ${data.inviteId}
    `;
    const invite = rows[0];
    if (!invite) throw new Error("Einladung nicht gefunden.");
    const role = await requireMembership(sql, invite.team_id, context.userId);
    if (!canManageTeam(role)) throw new Error("Nur die Leitung darf Einladungen widerrufen.");
    await sql.query(`update team_invites set status = 'widerrufen' where id = $1 and status = 'offen'`, [
      invite.id,
    ]);
    return { ok: true as const };
  });

export const removeMember = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { teamId: string; userId: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const actorRole = await requireMembership(sql, data.teamId, context.userId);
    const target = await sql<{ user_id: string; role: string }>`
      select user_id, role from team_members
      where team_id = ${data.teamId} and user_id = ${data.userId}
    `;
    const member = target[0];
    if (!member || !isTeamRole(member.role)) throw new Error("Mitglied nicht gefunden.");
    const block = removalBlock({
      actorRole,
      targetRole: member.role,
      targetIsSelf: context.userId === data.userId,
      leitungCount: await leitungCount(sql, data.teamId),
    });
    if (block) throw new Error(block);
    await sql.query(`delete from team_members where team_id = $1 and user_id = $2`, [data.teamId, data.userId]);
    return { ok: true as const };
  });

export type InvitePeek = {
  teamName: string;
  email: string;
  open: boolean;
  message: string;
};

export const peekInvite = createServerFn({ method: "GET" })
  .validator((token: string) => token)
  .handler(async ({ data: token }): Promise<InvitePeek> => {
    const sql = await getSql();
    const hash = hashInviteToken(token);
    const rows = await sql<{
      email: string;
      status: string;
      expires_at: string;
      name: string;
    }>`
      select i.email, i.status, i.expires_at, t.name
      from team_invites i
      join teams t on t.id = i.team_id
      where i.token_hash = ${hash}
    `;
    const row = rows[0];
    if (!row) {
      return {
        teamName: "",
        email: "",
        open: false,
        message: "Diese Einladung wurde nicht gefunden oder ist nicht mehr gültig.",
      };
    }
    const open = isInviteOpen(row.status, new Date(row.expires_at));
    return {
      teamName: row.name,
      email: row.email,
      open,
      message: open
        ? `Einladung in den Team-Raum „${row.name}“.`
        : "Diese Einladung ist nicht mehr gültig.",
    };
  });

export const acceptInvite = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((token: string) => token)
  .handler(async ({ context, data: token }): Promise<{ teamId: string; teamName: string }> => {
    const sql = await getSql();
    const hash = hashInviteToken(token);
    const users = await sql<{ email: string | null }>`
      select email from "user" where id = ${context.userId}
    `;
    const email = users[0]?.email;
    if (!email) throw new Error("Am Konto fehlt eine E-Mail. Einladung kann nicht angenommen werden.");

    const rows = await sql<{
      id: string;
      team_id: string;
      email: string;
      status: string;
      expires_at: string;
      name: string;
    }>`
      select i.id, i.team_id, i.email, i.status, i.expires_at, t.name
      from team_invites i
      join teams t on t.id = i.team_id
      where i.token_hash = ${hash}
    `;
    const invite = rows[0];
    if (!invite || !isInviteOpen(invite.status, new Date(invite.expires_at))) {
      throw new Error("Diese Einladung ist nicht mehr gültig.");
    }
    if (!emailsMatch(invite.email, email)) {
      throw new Error(
        `Diese Einladung gilt für ${invite.email}. Sie sind als ${email} angemeldet.`,
      );
    }

    const existing = await sql<{ user_id: string }>`
      select user_id from team_members where team_id = ${invite.team_id} and user_id = ${context.userId}
    `;
    if (!existing[0]) {
      await sql.query(
        `insert into team_members (team_id, user_id, role, created_at) values ($1,$2,'mitglied',now())`,
        [invite.team_id, context.userId],
      );
    }
    await sql.query(
      `update team_invites
       set status = 'angenommen', accepted_at = now(), accepted_by = $1
       where id = $2`,
      [context.userId, invite.id],
    );
    return { teamId: invite.team_id, teamName: invite.name };
  });

export const assignFolderToTeam = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; teamId: string | null }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const folder = await requireFolderAccess(sql, context.userId, data.folderId);

    if (data.teamId === null) {
      if (!canUnassignFolder({ isOwner: folder.isOwner, actorRole: folder.teamRole })) {
        throw new Error("Diesen Fall können Sie dem Team-Raum nicht entziehen.");
      }
      await sql.query(`update case_folders set team_id = null, updated_at = now() where id = $1`, [folder.id]);
      return { ok: true as const, teamId: null as string | null, teamName: null as string | null };
    }

    const role = await requireMembership(sql, data.teamId, context.userId);
    if (!canAssignFolder({ isOwner: folder.isOwner, isMember: Boolean(role) })) {
      throw new Error("Nur die Person, der der Fallordner gehört, kann ihn dem Team zuordnen.");
    }
    const teams = await sql<{ id: string; name: string }>`select id, name from teams where id = ${data.teamId}`;
    const team = teams[0];
    if (!team) throw new Error("Team-Raum nicht gefunden.");
    await sql.query(`update case_folders set team_id = $1, updated_at = now() where id = $2`, [
      team.id,
      folder.id,
    ]);
    return { ok: true as const, teamId: team.id, teamName: team.name };
  });
