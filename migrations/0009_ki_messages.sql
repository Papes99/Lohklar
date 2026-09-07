-- Lohklar KI: one chat thread per signed-in user (not per Fallordner).
create table if not exists ki_messages (
  id text primary key,
  user_id text not null,
  role text not null,
  content text not null,
  created_at timestamptz not null default now()
);
create index if not exists ki_messages_user_idx
  on ki_messages (user_id, created_at asc);
