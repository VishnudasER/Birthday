-- ============================================================
-- Supabase Schema for "A Little World Called Us ❤️"
-- Birthday Special Project
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── 1. QUIZ SUBMISSIONS TABLE ────────────────────────────────
create table if not exists public.quiz_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  session_id text not null,
  answers jsonb not null default '[]'::jsonb,
  client_score integer not null default 0,
  client_percentage integer not null default 0,
  score_verified boolean not null default false,
  created_at timestamptz not null default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.quiz_submissions enable row level security;

-- Policies:
-- Service role has full access
-- Authenticated users (anonymous session) can insert their own submissions
create policy "Users can insert their own quiz submissions"
  on public.quiz_submissions
  for insert
  with check (auth.uid() = user_id or auth.uid() is not null);

-- Only service role can view submissions by default (protecting answers/privacy)
create policy "Service role can view quiz submissions"
  on public.quiz_submissions
  for select
  using (auth.jwt() ->> 'role' = 'service_role');


-- ── 2. TIME CAPSULE SUBMISSIONS TABLE ────────────────────────
create table if not exists public.timecapsule_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  session_id text not null,
  answers jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.timecapsule_submissions enable row level security;

-- Policies:
-- Authenticated users (anonymous session) can insert their own time capsule
create policy "Users can insert their own timecapsule submissions"
  on public.timecapsule_submissions
  for insert
  with check (auth.uid() = user_id or auth.uid() is not null);

-- Only service role can view submissions by default
create policy "Service role can view timecapsule submissions"
  on public.timecapsule_submissions
  for select
  using (auth.jwt() ->> 'role' = 'service_role');


-- ── 3. STORAGE SETUP FOR PRIVATE PHOTOS ──────────────────────
-- Insert private storage bucket if not existing
insert into storage.buckets (id, name, public)
values ('birthday-photos', 'birthday-photos', false)
on conflict (id) do nothing;

-- Storage policies: bucket is private.
-- Only service role (and edge function createSignedUrl) can read from the bucket.
create policy "Service role has full access to birthday-photos"
  on storage.objects
  for all
  using (bucket_id = 'birthday-photos' and auth.jwt() ->> 'role' = 'service_role');


-- ── 4. INDEXES ───────────────────────────────────────────────
create index if not exists idx_quiz_submissions_created_at
  on public.quiz_submissions (created_at desc);

create index if not exists idx_timecapsule_submissions_created_at
  on public.timecapsule_submissions (created_at desc);

create index if not exists idx_quiz_submissions_user_id
  on public.quiz_submissions (user_id);

create index if not exists idx_timecapsule_submissions_user_id
  on public.timecapsule_submissions (user_id);
