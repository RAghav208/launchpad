-- Launchpad — initial schema (Phase B)
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query → paste → Run),
-- or via the Supabase CLI. Safe to re-run (idempotent where practical).

-- ─────────────────────────────────────────────────────────────
-- Tables (every row is owned by a user; protected by RLS below)
-- ─────────────────────────────────────────────────────────────

create table if not exists public.profiles (
  user_id      uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  target_date  date,
  theme        text not null default 'dark' check (theme in ('light', 'dark')),
  pomodoro     jsonb not null default '{"focusMin":25,"breakMin":5,"longBreakMin":15}'::jsonb,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists public.roadmap_progress (
  user_id    uuid not null references auth.users (id) on delete cascade,
  task_id    text not null,
  done       boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, task_id)
);

create table if not exists public.lesson_progress (
  user_id    uuid not null references auth.users (id) on delete cascade,
  lesson_id  text not null,
  status     text not null default 'unread' check (status in ('unread', 'in_progress', 'done')),
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- Flashcards AND quiz items share this SM-2 scheduling state.
create table if not exists public.srs_cards (
  user_id       uuid not null references auth.users (id) on delete cascade,
  card_id       text not null,
  ease_factor   real not null default 2.5,
  repetitions   integer not null default 0,
  interval_days integer not null default 0,
  due_date      date not null default current_date,
  last_quality  smallint,
  updated_at    timestamptz not null default now(),
  primary key (user_id, card_id)
);

create table if not exists public.dsa_log (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users (id) on delete cascade,
  name           text not null,
  pattern        text,
  difficulty     text check (difficulty in ('easy', 'medium', 'hard')),
  solved_unaided boolean not null default false,
  url            text,
  ease_factor    real not null default 2.5,
  repetitions    integer not null default 0,
  interval_days  integer not null default 0,
  due_date       date not null default current_date,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- scope = 'journal' for the global journal, or a lesson_id for per-lesson notes.
create table if not exists public.notes (
  user_id    uuid not null references auth.users (id) on delete cascade,
  scope      text not null,
  content    text not null default '',
  updated_at timestamptz not null default now(),
  primary key (user_id, scope)
);

create table if not exists public.study_sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  occurred_on date not null default current_date,
  minutes     integer not null default 0,
  kind        text not null default 'focus',
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- Row-Level Security: a user can only read/write their own rows
-- ─────────────────────────────────────────────────────────────

alter table public.profiles         enable row level security;
alter table public.roadmap_progress enable row level security;
alter table public.lesson_progress  enable row level security;
alter table public.srs_cards         enable row level security;
alter table public.dsa_log           enable row level security;
alter table public.notes             enable row level security;
alter table public.study_sessions    enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array[
    'profiles', 'roadmap_progress', 'lesson_progress',
    'srs_cards', 'dsa_log', 'notes', 'study_sessions'
  ]
  loop
    execute format('drop policy if exists "Own rows" on public.%I;', t);
    execute format(
      'create policy "Own rows" on public.%I for all
         using (auth.uid() = user_id) with check (auth.uid() = user_id);',
      t
    );
  end loop;
end $$;

-- ─────────────────────────────────────────────────────────────
-- Auto-create a profile row when a new auth user signs up
-- ─────────────────────────────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- Keep updated_at fresh on writes
-- ─────────────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array[
    'profiles', 'roadmap_progress', 'lesson_progress',
    'srs_cards', 'dsa_log', 'notes'
  ]
  loop
    execute format('drop trigger if exists set_updated_at on public.%I;', t);
    execute format(
      'create trigger set_updated_at before update on public.%I
         for each row execute function public.set_updated_at();',
      t
    );
  end loop;
end $$;
