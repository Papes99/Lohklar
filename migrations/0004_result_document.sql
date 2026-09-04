-- Structured Ergebnisdokument body + version history (owned by the case folder).
alter table result_documents add column if not exists body jsonb not null default '{}'::jsonb;
alter table result_documents add column if not exists version int not null default 1;

create table if not exists result_document_versions (
  id text primary key,
  document_id text not null references result_documents(id) on delete cascade,
  folder_id text not null references case_folders(id) on delete cascade,
  user_id text not null,
  version int not null,
  body jsonb not null,
  created_at timestamptz not null default now(),
  unique (document_id, version)
);
create index if not exists result_document_versions_doc_idx
  on result_document_versions (document_id, version desc);
