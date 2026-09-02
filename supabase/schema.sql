-- Run this once in Supabase → SQL Editor.
-- Creates the tables the /admin dashboard reads and writes.

create table if not exists bot_status (
  id int primary key default 1,
  online boolean default true,
  servers int default 0,
  users int default 0,
  voice_connections int default 0,
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);
insert into bot_status (id) values (1) on conflict (id) do nothing;

create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists feature_flags (
  key text primary key,
  enabled boolean default true,
  label text
);
insert into feature_flags (key, enabled, label) values
  ('lossless_audio', true, 'Lossless audio streaming'),
  ('dsp_filters', true, 'DSP filters (8D, bass, nightcore)'),
  ('canary_signups', false, 'Raze Canary signups open'),
  ('premium_signups', false, 'Raze Premium signups open')
on conflict (key) do nothing;

-- Row Level Security: only authenticated users (i.e. you, logged into
-- /admin) can read or write. Anonymous visitors get nothing.
alter table bot_status enable row level security;
alter table announcements enable row level security;
alter table feature_flags enable row level security;

create policy "Authenticated read" on bot_status for select using (auth.role() = 'authenticated');
create policy "Authenticated write" on bot_status for update using (auth.role() = 'authenticated');

create policy "Authenticated read" on announcements for select using (auth.role() = 'authenticated');
create policy "Authenticated write" on announcements for all using (auth.role() = 'authenticated');

create policy "Authenticated read" on feature_flags for select using (auth.role() = 'authenticated');
create policy "Authenticated write" on feature_flags for update using (auth.role() = 'authenticated');
