-- Persönliche Notizen am Fallordner: Zeilen, keine Textflächen.
-- Vorschläge aus dem Lohlotse (Agent D) liegen in derselben Karte.

create table if not exists personal_note_lines (
  id text primary key,
  folder_id text not null references case_folders(id) on delete cascade,
  user_id text not null,
  section text not null,
  body text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists personal_note_lines_folder_idx
  on personal_note_lines (folder_id, section, sort_order);

create table if not exists personal_note_suggestions (
  id text primary key,
  folder_id text not null references case_folders(id) on delete cascade,
  user_id text not null,
  section text not null,
  body text not null,
  source text not null default 'lohlotse',
  source_key text not null,
  status text not null default 'pending',
  accepted_line_id text,
  created_at timestamptz not null default now(),
  unique (folder_id, source_key)
);
create index if not exists personal_note_suggestions_folder_idx
  on personal_note_suggestions (folder_id, status, created_at);
