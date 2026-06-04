create table if not exists public.transfer_quiz_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  quiz_version text not null default 'transfer-v2',
  started_at timestamptz not null,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.transfer_quiz_responses (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  question_id text not null,
  answer_value text not null,
  quiz_version text not null default 'transfer-v2',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint transfer_quiz_responses_session_question_unique unique (
    session_id,
    question_id
  )
);

create table if not exists public.transfer_quiz_results (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  recommended_degrees jsonb not null,
  top_match text not null,
  major_scores jsonb not null default '{}'::jsonb,
  explanations jsonb not null default '{}'::jsonb,
  recommendation_signals jsonb not null default '{}'::jsonb,
  quiz_version text not null default 'transfer-v2',
  created_at timestamptz not null default now()
);

alter table public.transfer_quiz_sessions
  add column if not exists quiz_version text not null default 'transfer-v2';

alter table public.transfer_quiz_sessions
  add column if not exists started_at timestamptz;

alter table public.transfer_quiz_sessions
  add column if not exists completed_at timestamptz;

alter table public.transfer_quiz_sessions
  add column if not exists updated_at timestamptz not null default now();

alter table public.transfer_quiz_responses
  add column if not exists quiz_version text not null default 'transfer-v2';

alter table public.transfer_quiz_responses
  add column if not exists updated_at timestamptz not null default now();

alter table public.transfer_quiz_results
  add column if not exists major_scores jsonb not null default '{}'::jsonb;

alter table public.transfer_quiz_results
  add column if not exists explanations jsonb not null default '{}'::jsonb;

alter table public.transfer_quiz_results
  add column if not exists recommendation_signals jsonb not null default '{}'::jsonb;

alter table public.transfer_quiz_results
  add column if not exists quiz_version text not null default 'transfer-v2';

create unique index if not exists transfer_quiz_sessions_session_id_unique
  on public.transfer_quiz_sessions (session_id);

create unique index if not exists transfer_quiz_responses_session_question_unique_idx
  on public.transfer_quiz_responses (session_id, question_id);

create unique index if not exists transfer_quiz_results_session_id_unique
  on public.transfer_quiz_results (session_id);

alter table public.transfer_quiz_sessions enable row level security;
alter table public.transfer_quiz_responses enable row level security;
alter table public.transfer_quiz_results enable row level security;

grant usage on schema public to anon;
grant select, insert, update on public.transfer_quiz_sessions to anon;
grant select, insert, update on public.transfer_quiz_responses to anon;
grant select, insert, update on public.transfer_quiz_results to anon;

drop policy if exists "Allow anonymous transfer quiz session selects"
  on public.transfer_quiz_sessions;

create policy "Allow anonymous transfer quiz session selects"
  on public.transfer_quiz_sessions
  for select
  to anon
  using (true);

drop policy if exists "Allow anonymous transfer quiz session inserts"
  on public.transfer_quiz_sessions;

create policy "Allow anonymous transfer quiz session inserts"
  on public.transfer_quiz_sessions
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous transfer quiz session updates"
  on public.transfer_quiz_sessions;

create policy "Allow anonymous transfer quiz session updates"
  on public.transfer_quiz_sessions
  for update
  to anon
  using (true)
  with check (true);

drop policy if exists "Allow anonymous transfer quiz response selects"
  on public.transfer_quiz_responses;

create policy "Allow anonymous transfer quiz response selects"
  on public.transfer_quiz_responses
  for select
  to anon
  using (true);

drop policy if exists "Allow anonymous transfer quiz response inserts"
  on public.transfer_quiz_responses;

create policy "Allow anonymous transfer quiz response inserts"
  on public.transfer_quiz_responses
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous transfer quiz response updates"
  on public.transfer_quiz_responses;

create policy "Allow anonymous transfer quiz response updates"
  on public.transfer_quiz_responses
  for update
  to anon
  using (true)
  with check (true);

drop policy if exists "Allow anonymous transfer quiz result selects"
  on public.transfer_quiz_results;

create policy "Allow anonymous transfer quiz result selects"
  on public.transfer_quiz_results
  for select
  to anon
  using (true);

drop policy if exists "Allow anonymous transfer quiz result inserts"
  on public.transfer_quiz_results;

create policy "Allow anonymous transfer quiz result inserts"
  on public.transfer_quiz_results
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous transfer quiz result updates"
  on public.transfer_quiz_results;

create policy "Allow anonymous transfer quiz result updates"
  on public.transfer_quiz_results
  for update
  to anon
  using (true)
  with check (true);
