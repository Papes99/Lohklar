-- Lohklar domain schema. Per-user rows always carry user_id text.
-- Clinic catalog is shared (no user_id). Case data is isolated per account.

create table if not exists clinics (
  id text primary key,
  name text not null,
  short_name text not null,
  city text not null,
  state_code text not null,
  state_name text not null,
  traeger text not null,
  traeger_art text not null,
  address text not null,
  phone text not null,
  email text not null,
  website text not null,
  indication_areas text[] not null,
  substances text[] not null default '{}',
  therapy_forms text[] not null,
  duration_weeks_min int not null,
  duration_weeks_max int not null,
  gender_setting text not null,
  setting text not null,
  ahb boolean not null default false,
  heilverfahren boolean not null default true,
  barrierefrei boolean not null default false,
  angehoerigenarbeit boolean not null default false,
  kinderbetreuung boolean not null default false,
  substitution boolean not null default false,
  gluecksspiel boolean not null default false,
  trauma boolean not null default false,
  junge_erwachsene boolean not null default false,
  places_estimate int not null,
  occupancy_index numeric not null,
  wait_base_days int not null,
  wait_variance_days int not null,
  sort_order int not null default 0
);

create table if not exists official_steckbriefe (
  clinic_id text primary key references clinics(id) on delete cascade,
  leitbild text not null,
  lage_haus text not null,
  aufnahme_indikation text not null,
  therapiekonzept text not null,
  alltag_setting text not null,
  angehoerige text not null,
  ausschluss text not null,
  nachsorge text not null,
  besonderheiten text not null
);

create table if not exists clinic_photos (
  id text primary key,
  clinic_id text not null references clinics(id) on delete cascade,
  slot text not null,
  caption text not null,
  alt text not null,
  image_path text not null,
  sort_order int not null default 0,
  unique (clinic_id, slot)
);

create table if not exists case_folders (
  id text primary key,
  user_id text not null,
  client_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists case_folders_user_idx on case_folders (user_id, updated_at desc);

create table if not exists runs (
  id text primary key,
  folder_id text not null references case_folders(id) on delete cascade,
  user_id text not null,
  run_number int not null,
  answers jsonb not null,
  matches jsonb not null,
  created_at timestamptz not null default now(),
  unique (folder_id, run_number)
);
create index if not exists runs_folder_idx on runs (folder_id, run_number);

create table if not exists result_documents (
  id text primary key,
  run_id text not null unique references runs(id) on delete cascade,
  folder_id text not null references case_folders(id) on delete cascade,
  user_id text not null,
  title text not null,
  notes text not null default '',
  selected_clinic_ids text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists personal_steckbriefe (
  folder_id text primary key references case_folders(id) on delete cascade,
  user_id text not null,
  passt text not null default '',
  passt_nicht text not null default '',
  offene_fragen text not null default '',
  rueckmeldungen text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists lohlotse_threads (
  id text primary key,
  folder_id text not null unique references case_folders(id) on delete cascade,
  user_id text not null,
  created_at timestamptz not null default now()
);

create table if not exists lohlotse_messages (
  id text primary key,
  thread_id text not null references lohlotse_threads(id) on delete cascade,
  user_id text not null,
  role text not null,
  content text not null,
  created_at timestamptz not null default now()
);
create index if not exists lohlotse_messages_thread_idx on lohlotse_messages (thread_id, created_at);
