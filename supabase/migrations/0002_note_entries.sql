-- Launchpad — dated, topic-tagged note entries (Phase H, Notes redesign)
-- Run in the Supabase SQL Editor.

create table if not exists public.note_entries (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  topic      text not null default 'General',
  content    text not null,
  created_at timestamptz not null default now()
);

create index if not exists note_entries_user_created_idx
  on public.note_entries (user_id, created_at desc);

alter table public.note_entries enable row level security;

drop policy if exists "Own rows" on public.note_entries;
create policy "Own rows" on public.note_entries for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
