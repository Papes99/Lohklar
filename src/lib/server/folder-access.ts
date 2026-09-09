import type { Sql } from "@/lib/db";
import { isTeamRole, type TeamRole } from "@/lib/domain/teams";

export type FolderAccess = {
  id: string;
  ownerId: string;
  clientName: string;
  teamId: string | null;
  teamName: string | null;
  teamRole: TeamRole | null;
  isOwner: boolean;
};

export async function loadFolderAccess(
  sql: Sql,
  userId: string,
  folderId: string,
): Promise<FolderAccess | null> {
  const rows = await sql<{
    id: string;
    user_id: string;
    client_name: string;
    team_id: string | null;
    team_name: string | null;
    team_role: string | null;
  }>`
    select
      f.id,
      f.user_id,
      f.client_name,
      f.team_id,
      t.name as team_name,
      tm.role as team_role
    from case_folders f
    left join teams t on t.id = f.team_id
    left join team_members tm on tm.team_id = f.team_id and tm.user_id = ${userId}
    where f.id = ${folderId}
      and (
        f.user_id = ${userId}
        or (
          f.team_id is not null
          and exists (
            select 1 from team_members m
            where m.team_id = f.team_id and m.user_id = ${userId}
          )
        )
      )
  `;
  const row = rows[0];
  if (!row) return null;
  return {
    id: row.id,
    ownerId: row.user_id,
    clientName: row.client_name,
    teamId: row.team_id,
    teamName: row.team_name,
    teamRole: row.team_role && isTeamRole(row.team_role) ? row.team_role : null,
    isOwner: row.user_id === userId,
  };
}

export async function requireFolderAccess(
  sql: Sql,
  userId: string,
  folderId: string,
): Promise<FolderAccess> {
  const folder = await loadFolderAccess(sql, userId, folderId);
  if (!folder) throw new Error("Fallordner nicht gefunden.");
  return folder;
}
