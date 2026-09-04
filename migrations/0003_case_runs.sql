-- Draft runs, labels, and folder file refs. Name stays on the folder.
alter table case_folders add column if not exists file_ref text not null default '';
alter table case_folders add column if not exists internal_note text not null default '';

alter table runs add column if not exists label text not null default '';
alter table runs add column if not exists status text not null default 'fertig';
