# Launchpad — SWE Interview Prep

A study companion for landing a software-engineering role: it organizes your plan, drives daily practice with **spaced repetition**, and tracks your progress — all behind a clean, calm interface.

> Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Supabase

## Features

- 🔐 **Passwordless magic-link auth** (Supabase) with per-user data isolation via Row-Level Security
- 🗺️ **Interactive 12-week roadmap** — checkable tasks, persisted per user
- 🧩 **DSA log with SM-2 spaced repetition** — solved problems resurface for review right before you'd forget them
- ⏱️ **Flexible Pomodoro timer** (presets + custom length) that logs focus sessions
- 📝 **Dated, topic-tagged notes** — preview cards open into a full editor (edit / delete)
- ⚙️ **Profile & preferences** — display name, target date, Pomodoro config
- 🌗 **Calm, minimal design system** — light/dark themes, collapsible sidebar, semantic design tokens

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first design tokens) |
| Backend | Supabase — Postgres, Auth, Row-Level Security |
| Hosting | Vercel |

## Getting started

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env.local
# then fill NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
# (Supabase dashboard → Project Settings → API)

# 3. Run
npm run dev
```

Then, in your Supabase project:

1. **SQL Editor** — run `supabase/migrations/0001_init.sql`, then `supabase/migrations/0002_note_entries.sql`.
2. **Authentication → URL Configuration** — set **Site URL** to `http://localhost:3000` and add the redirect `http://localhost:3000/**`.

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/(app)/          protected routes: dashboard, learn, practice, dsa, roadmap, notes, settings
  app/(auth)/login    magic-link sign-in
  app/auth/callback   magic-link code exchange
  components/          design-system primitives, layout shell, feature views
  content/            static curriculum (roadmap, note topics, DSA patterns)
  lib/supabase/       browser + server Supabase clients
  lib/data/           server-side read helpers
  lib/actions/        server actions (auth-checked mutations)
  lib/srs.ts          SM-2 spaced-repetition engine
  proxy.ts            session refresh + route protection (Next.js 16 "proxy")
supabase/migrations/  SQL schema + Row-Level Security policies
```

## License

MIT
