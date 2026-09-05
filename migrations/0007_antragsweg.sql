-- Antragsweg: Unterlagen- und Fristen-Checkliste am Fallordner (Agent A).
-- Keine Dokumentinhalte, keine Diagnosen.

create table if not exists antragsweg (
  folder_id text primary key references case_folders(id) on delete cascade,
  user_id text not null,
  kostentraeger_pfad text not null default 'offen',
  updated_at timestamptz not null default now(),
  constraint antragsweg_pfad_chk check (
    kostentraeger_pfad in ('offen','drv','krankenkasse','bg','sonstige')
  )
);
create index if not exists antragsweg_user_idx on antragsweg (user_id);

create table if not exists antragsweg_documents (
  id text primary key,
  folder_id text not null references antragsweg(folder_id) on delete cascade,
  user_id text not null,
  item_key text,
  label text not null,
  status text not null default 'fehlt',
  note text not null default '',
  sort_order int not null default 0,
  constraint antragsweg_doc_status_chk check (
    status in ('fehlt','angefordert','vorhanden','nicht_noetig')
  )
);
create index if not exists antragsweg_docs_folder_idx
  on antragsweg_documents (folder_id, sort_order);

create table if not exists antragsweg_deadlines (
  folder_id text not null references antragsweg(folder_id) on delete cascade,
  user_id text not null,
  kind text not null,
  due_date date,
  note text not null default '',
  primary key (folder_id, kind),
  constraint antragsweg_deadline_kind_chk check (
    kind in (
      'antrag_eingereicht',
      'entscheidung_erwartet',
      'entscheidung_eingegangen',
      'widerspruchsfrist'
    )
  )
);
