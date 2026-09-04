-- Lohlotse: thread stays on one folder, optional house in view, structured replies, merge undo.
alter table lohlotse_threads add column if not exists clinic_id text;
alter table lohlotse_threads add column if not exists last_opened_at timestamptz not null default now();

alter table lohlotse_messages add column if not exists payload jsonb;

create table if not exists lohlotse_merges (
  id text primary key,
  folder_id text not null references case_folders(id) on delete cascade,
  user_id text not null,
  field text not null,
  before_text text not null,
  after_text text not null,
  undone boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists lohlotse_merges_folder_idx
  on lohlotse_merges (folder_id, created_at desc);
