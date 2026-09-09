-- Team-Raum für Träger: Mitglieder, Einladungen, optionale Fallzuordnung.
-- Privatfälle bleiben privat, solange team_id leer ist.

create table if not exists teams (
  id text primary key,
  name text not null,
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists team_members (
  team_id text not null references teams(id) on delete cascade,
  user_id text not null,
  role text not null,
  created_at timestamptz not null default now(),
  primary key (team_id, user_id)
);
create index if not exists team_members_user_idx on team_members (user_id);

create table if not exists team_invites (
  id text primary key,
  team_id text not null references teams(id) on delete cascade,
  email text not null,
  role text not null default 'mitglied',
  token_hash text not null unique,
  status text not null default 'offen',
  invited_by text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  accepted_by text
);
create index if not exists team_invites_team_idx on team_invites (team_id, status);
create index if not exists team_invites_email_idx on team_invites (email, status);

alter table case_folders add column if not exists team_id text references teams(id) on delete set null;
create index if not exists case_folders_team_idx on case_folders (team_id);
