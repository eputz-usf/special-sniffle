-- Current USF student profile prototype persistence.
-- This does not replace USF Microsoft authentication.
-- For this prototype, rows are tied to an anonymous browser session_id.
-- In a production USF implementation, profile rows should be associated with
-- the authenticated USF identity instead.

create table if not exists public.current_usf_profiles (
  session_id text primary key,
  profile jsonb not null default '{}'::jsonb,
  majors jsonb not null default '[]'::jsonb,
  auth_context text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists current_usf_profiles_session_id_idx
  on public.current_usf_profiles (session_id);

alter table public.current_usf_profiles enable row level security;

grant select, insert, update on public.current_usf_profiles to anon;

drop policy if exists "Allow anonymous profile select" on public.current_usf_profiles;
create policy "Allow anonymous profile select"
  on public.current_usf_profiles
  for select
  to anon
  using (true);

drop policy if exists "Allow anonymous profile insert" on public.current_usf_profiles;
create policy "Allow anonymous profile insert"
  on public.current_usf_profiles
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous profile update" on public.current_usf_profiles;
create policy "Allow anonymous profile update"
  on public.current_usf_profiles
  for update
  to anon
  using (true)
  with check (true);
