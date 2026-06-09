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

create table if not exists public.current_usf_quiz_sessions (
  session_id text primary key,
  quiz_version text not null,
  started_at timestamptz not null,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.current_usf_quiz_responses (
  session_id text not null references public.current_usf_quiz_sessions(session_id) on delete cascade,
  question_id text not null,
  answer_value text not null,
  quiz_version text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (session_id, question_id)
);

create table if not exists public.current_usf_quiz_results (
  session_id text primary key references public.current_usf_quiz_sessions(session_id) on delete cascade,
  recommended_degrees jsonb not null default '[]'::jsonb,
  top_match text not null,
  major_scores jsonb not null default '{}'::jsonb,
  explanations jsonb not null default '{}'::jsonb,
  recommendation_signals jsonb not null default '{}'::jsonb,
  quiz_version text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists current_usf_quiz_sessions_session_id_idx
  on public.current_usf_quiz_sessions (session_id);

create unique index if not exists current_usf_quiz_responses_session_question_idx
  on public.current_usf_quiz_responses (session_id, question_id);

create unique index if not exists current_usf_quiz_results_session_id_idx
  on public.current_usf_quiz_results (session_id);

alter table public.current_usf_quiz_sessions enable row level security;
alter table public.current_usf_quiz_responses enable row level security;
alter table public.current_usf_quiz_results enable row level security;

grant select, insert, update on public.current_usf_quiz_sessions to anon;
grant select, insert, update on public.current_usf_quiz_responses to anon;
grant select, insert, update on public.current_usf_quiz_results to anon;

drop policy if exists "Allow anonymous current USF quiz session select" on public.current_usf_quiz_sessions;
create policy "Allow anonymous current USF quiz session select"
  on public.current_usf_quiz_sessions
  for select
  to anon
  using (true);

drop policy if exists "Allow anonymous current USF quiz session insert" on public.current_usf_quiz_sessions;
create policy "Allow anonymous current USF quiz session insert"
  on public.current_usf_quiz_sessions
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous current USF quiz session update" on public.current_usf_quiz_sessions;
create policy "Allow anonymous current USF quiz session update"
  on public.current_usf_quiz_sessions
  for update
  to anon
  using (true)
  with check (true);

drop policy if exists "Allow anonymous current USF quiz response select" on public.current_usf_quiz_responses;
create policy "Allow anonymous current USF quiz response select"
  on public.current_usf_quiz_responses
  for select
  to anon
  using (true);

drop policy if exists "Allow anonymous current USF quiz response insert" on public.current_usf_quiz_responses;
create policy "Allow anonymous current USF quiz response insert"
  on public.current_usf_quiz_responses
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous current USF quiz response update" on public.current_usf_quiz_responses;
create policy "Allow anonymous current USF quiz response update"
  on public.current_usf_quiz_responses
  for update
  to anon
  using (true)
  with check (true);

drop policy if exists "Allow anonymous current USF quiz result select" on public.current_usf_quiz_results;
create policy "Allow anonymous current USF quiz result select"
  on public.current_usf_quiz_results
  for select
  to anon
  using (true);

drop policy if exists "Allow anonymous current USF quiz result insert" on public.current_usf_quiz_results;
create policy "Allow anonymous current USF quiz result insert"
  on public.current_usf_quiz_results
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous current USF quiz result update" on public.current_usf_quiz_results;
create policy "Allow anonymous current USF quiz result update"
  on public.current_usf_quiz_results
  for update
  to anon
  using (true)
  with check (true);
