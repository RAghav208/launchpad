# Launchpad — SWE & AI/ML Interview Prep

A full-stack study companion that takes a near-beginner from Python basics to interview-ready across **Data Structures & Algorithms** and the complete **AI / Machine Learning** stack. Lessons, guided practice, spaced repetition, a tailored roadmap, focus tracking, and progress, all behind a calm, minimal interface.

> Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Supabase · Vercel

## What's inside

**Curriculum:** 10 tracks, 75+ deep lessons. Every lesson uses the same teaching format: section headings, multiple worked code examples, tip / warn callouts, key-points summary, and a graded multi-exercise practice block.

| Track | Covers |
|---|---|
| **Python Foundations** | Variables, operators, I/O, conditionals, loops, functions, lists, strings, dicts/sets/tuples, comprehensions, errors & debugging |
| **Big-O & Data Structures** | Big-O notation, analyzing code, arrays, linked lists, stacks & queues, hash tables |
| **Search, Trees & Sorting** | Binary search, trees & traversals, BSTs, sorting, heaps & priority queues |
| **Graphs, Recursion & DP** | Recursion, graph representation & traversal (BFS/DFS), dynamic programming |
| **ML Foundations & Data Toolkit** | AI vs ML vs DL, supervised/unsupervised/reinforcement, NumPy, pandas, matplotlib, seaborn, data collection, missing values, scaling, encoding, train/test split, imbalance, TF-IDF |
| **Mathematics for ML** *(rigorous)* | Linear algebra (vectors, dot product, matrices, matmul), statistics (descriptive/inferential, central tendency, variability, correlation, hypothesis testing), probability (Bayes, random variables, distributions, Normal, Poisson) |
| **Core Machine Learning** | ML workflow, cross-validation, overfitting, bias-variance, loss functions, metrics, gradient descent; linear & logistic regression, SVMs, decision trees & random forests, k-NN, Naive Bayes, k-Means, PCA; pipelines + projects |
| **Deep Learning** | Neurons & layers, forward pass, backpropagation, optimizers; PyTorch, CNNs, RNNs/LSTMs, transformers & attention |
| **Modern AI & LLMs** | How LLMs work, prompt engineering, embeddings, vector databases, RAG, prompting vs RAG vs fine-tuning, agents & tool calling, building & deploying AI apps, responsible AI |
| **MLOps & Job Readiness** | Experiment tracking, model serving, drift monitoring, pipelines; portfolio building, ML interview rounds, ML system design framework |

The DSA tracks follow the sequencing of [Coding Interview University](https://github.com/jwasham/coding-interview-university). The ML tracks mirror Siddhardhan's [Machine Learning Course With Python](https://www.youtube.com/playlist?list=PLfFghEzKVmjsNtIRwErklMAN8nJmebB0I) for foundations / math / classical ML, with the deep learning, LLM, and MLOps content authored on top.

## Features

- 🔐 **Passwordless magic-link auth** (Supabase) with per-user data isolation via Row-Level Security
- 📚 **Deep lessons** with section headings, worked examples, callouts, key points, and graded practice
- 🧠 **Two practice modes**
  - **Guided** — every lesson has a learn-by-doing problem with a hint ladder and a fully explained worked solution
  - **Review** — flashcards and predict-the-output multiple choice on **SM-2 spaced repetition**, so cards resurface right before you'd forget
- 🗺️ **Tailored roadmap** — DSA phases P0–P4 plus AI/ML phases P5–P10, each with checkable tasks that drive your dashboard
- 🧩 **DSA log with SM-2** — solved problems get scheduled for review automatically
- ⏱️ **Flexible Pomodoro timer** (presets + custom length) that logs focus sessions
- 📊 **Live dashboard** — your next lesson, what's due today, focus time, roadmap progress per phase
- 📝 **Dated, topic-tagged notes** — preview cards open into a full editor (edit / delete)
- ⚙️ **Profile & preferences** — display name, target date, Pomodoro config
- 🌗 **Calm, minimal design system** — light/dark themes, collapsible sidebar, semantic design tokens, no AI slop

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first design tokens) |
| Backend | Supabase — Postgres, Auth, Row-Level Security |
| Spaced repetition | Custom SM-2 implementation (`src/lib/srs.ts`) |
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

Open [http://localhost:3000](http://localhost:3000), sign in with a magic link, and start at `/learn`.

## Project structure

```
src/
  app/(app)/                    protected routes: dashboard, learn, learn/[lessonId],
                                practice, dsa, roadmap, notes, resources, settings
  app/(auth)/login              magic-link sign-in
  app/auth/callback             magic-link code exchange
  components/
    layout/                     app shell, fixed sidebar, header, pomodoro
    learn/                      lesson renderer, code highlighter
    practice/                   practice hub, guided mode, review mode
    ui/                         design-system primitives
  content/
    python/                     Python lessons, flashcards, predicts, guided problems
    cs/                         Big-O / DS / trees / sorting / graphs / DP content
    ml/                         ML foundations, math, core ML, DL, LLMs, MLOps content
    index.ts                    track aggregation + lookup helpers
    types.ts                    LessonBlock, Lesson, Track, Flashcard, PredictOutput, GuidedProblem
    roadmap.ts                  10-phase tailored study plan
  lib/
    supabase/                   browser + server Supabase clients
    data/                       server-side read helpers
    actions/                    server actions (auth-checked mutations)
    srs.ts                      SM-2 spaced-repetition engine
  proxy.ts                      session refresh + route protection (Next.js 16 "proxy")
supabase/migrations/            SQL schema + Row-Level Security policies
```

## How the practice flow works

Every lesson has its own scoped practice. From a lesson page, **Practice this** drops you into a session limited to that lesson's cards and problems.

- **Guided mode** — work the problem in your editor, reveal hints one at a time when stuck, then study the worked solution.
- **Review mode** — flashcards (self-rated quality) and predict-the-output (multiple choice with explanations). Reviews are scheduled by SM-2: due dates and ease factor adapt to how well you recall each card.

The global `/practice` page mixes everything that's due across all tracks, ordered by lesson sequence.

## Roadmap

Ten phases that the dashboard reads dynamically:

```
P0  Python Foundations            (Weeks 1–3)
P1  Big-O & Core Data Structures  (Weeks 4–6)
P2  Search, Trees & Sorting       (Weeks 7–9)
P3  Graphs, DP & Interview Ready  (Weeks 10–12)
P4  Beyond 12 weeks (stretch)
P5  ML Foundations & Data Toolkit
P6  Mathematics for ML
P7  Core Machine Learning
P8  Deep Learning
P9  Modern AI & LLMs
P10 MLOps, Projects & Job Readiness
```

Tick tasks off as you go — your dashboard's "current week" subtitle, progress bars, and stats update automatically.

## License

MIT
