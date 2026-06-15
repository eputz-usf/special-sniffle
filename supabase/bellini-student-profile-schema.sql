-- Current Bellini student profile prototype persistence.
-- This does not replace USF Microsoft authentication.
-- For this prototype, rows are tied to an anonymous browser session_id.
-- In a production USF implementation, profile rows should be associated with
-- the authenticated USF identity instead.

create table if not exists public.bellini_student_profiles (
  session_id text primary key,
  profile jsonb not null default '{}'::jsonb,
  majors jsonb not null default '[]'::jsonb,
  auth_context text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists bellini_student_profiles_session_id_idx
  on public.bellini_student_profiles (session_id);

alter table public.bellini_student_profiles enable row level security;

grant select, insert, update on public.bellini_student_profiles to anon;

drop policy if exists "Allow anonymous profile select" on public.bellini_student_profiles;
create policy "Allow anonymous profile select"
  on public.bellini_student_profiles
  for select
  to anon
  using (true);

drop policy if exists "Allow anonymous profile insert" on public.bellini_student_profiles;
create policy "Allow anonymous profile insert"
  on public.bellini_student_profiles
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous profile update" on public.bellini_student_profiles;
create policy "Allow anonymous profile update"
  on public.bellini_student_profiles
  for update
  to anon
  using (true)
  with check (true);

create table if not exists public.bellini_student_quiz_sessions (
  session_id text primary key,
  quiz_version text not null,
  started_at timestamptz not null,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bellini_student_quiz_responses (
  session_id text not null references public.bellini_student_quiz_sessions(session_id) on delete cascade,
  question_id text not null,
  answer_value text not null,
  quiz_version text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (session_id, question_id)
);

create table if not exists public.bellini_student_quiz_results (
  session_id text primary key references public.bellini_student_quiz_sessions(session_id) on delete cascade,
  recommended_degrees jsonb not null default '[]'::jsonb,
  top_match text not null,
  major_scores jsonb not null default '{}'::jsonb,
  explanations jsonb not null default '{}'::jsonb,
  recommendation_signals jsonb not null default '{}'::jsonb,
  quiz_version text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists bellini_student_quiz_sessions_session_id_idx
  on public.bellini_student_quiz_sessions (session_id);

create unique index if not exists bellini_student_quiz_responses_session_question_idx
  on public.bellini_student_quiz_responses (session_id, question_id);

create unique index if not exists bellini_student_quiz_results_session_id_idx
  on public.bellini_student_quiz_results (session_id);

alter table public.bellini_student_quiz_sessions enable row level security;
alter table public.bellini_student_quiz_responses enable row level security;
alter table public.bellini_student_quiz_results enable row level security;

grant select, insert, update on public.bellini_student_quiz_sessions to anon;
grant select, insert, update on public.bellini_student_quiz_responses to anon;
grant select, insert, update on public.bellini_student_quiz_results to anon;

drop policy if exists "Allow anonymous Bellini student quiz session select" on public.bellini_student_quiz_sessions;
create policy "Allow anonymous Bellini student quiz session select"
  on public.bellini_student_quiz_sessions
  for select
  to anon
  using (true);

drop policy if exists "Allow anonymous Bellini student quiz session insert" on public.bellini_student_quiz_sessions;
create policy "Allow anonymous Bellini student quiz session insert"
  on public.bellini_student_quiz_sessions
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous Bellini student quiz session update" on public.bellini_student_quiz_sessions;
create policy "Allow anonymous Bellini student quiz session update"
  on public.bellini_student_quiz_sessions
  for update
  to anon
  using (true)
  with check (true);

drop policy if exists "Allow anonymous Bellini student quiz response select" on public.bellini_student_quiz_responses;
create policy "Allow anonymous Bellini student quiz response select"
  on public.bellini_student_quiz_responses
  for select
  to anon
  using (true);

drop policy if exists "Allow anonymous Bellini student quiz response insert" on public.bellini_student_quiz_responses;
create policy "Allow anonymous Bellini student quiz response insert"
  on public.bellini_student_quiz_responses
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous Bellini student quiz response update" on public.bellini_student_quiz_responses;
create policy "Allow anonymous Bellini student quiz response update"
  on public.bellini_student_quiz_responses
  for update
  to anon
  using (true)
  with check (true);

drop policy if exists "Allow anonymous Bellini student quiz result select" on public.bellini_student_quiz_results;
create policy "Allow anonymous Bellini student quiz result select"
  on public.bellini_student_quiz_results
  for select
  to anon
  using (true);

drop policy if exists "Allow anonymous Bellini student quiz result insert" on public.bellini_student_quiz_results;
create policy "Allow anonymous Bellini student quiz result insert"
  on public.bellini_student_quiz_results
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous Bellini student quiz result update" on public.bellini_student_quiz_results;
create policy "Allow anonymous Bellini student quiz result update"
  on public.bellini_student_quiz_results
  for update
  to anon
  using (true)
  with check (true);
