-- Aggregated usage for the dashboard. No chat text, no diagnoses, no client names.
create table if not exists usage_events (
  id text primary key,
  user_id text not null,
  kind text not null,
  clinic_id text,
  meta text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists usage_events_user_kind_idx
  on usage_events (user_id, kind, created_at desc);
