// SM-2 spaced-repetition algorithm (SuperMemo 2).
// Source of truth: /DESIGN.md. Reused by DSA-problem revisits and, later,
// flashcards + quiz items.

export type SrsState = {
  easeFactor: number;
  repetitions: number;
  intervalDays: number;
};

export const SRS_DEFAULT: SrsState = {
  easeFactor: 2.5,
  repetitions: 0,
  intervalDays: 0,
};

/**
 * Apply one SM-2 review.
 * @param state current scheduling state
 * @param quality 0–5 (5 perfect · 4 hesitation · 3 hard · <3 = miss → restart)
 */
export function applySm2(state: SrsState, quality: number): SrsState {
  const q = Math.max(0, Math.min(5, Math.round(quality)));
  let { easeFactor, repetitions, intervalDays } = state;

  if (q >= 3) {
    if (repetitions === 0) intervalDays = 1;
    else if (repetitions === 1) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * easeFactor);
    repetitions += 1;
  } else {
    repetitions = 0;
    intervalDays = 1;
  }

  easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  return { easeFactor, repetitions, intervalDays };
}

// ── Date helpers (local-date YYYY-MM-DD strings, which compare correctly) ──

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function toISODate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function todayISODate(): string {
  return toISODate(new Date());
}

/** YYYY-MM-DD `intervalDays` from `from` (default today). */
export function dueDateFrom(intervalDays: number, from: Date = new Date()): string {
  const d = new Date(from);
  d.setDate(d.getDate() + Math.max(0, Math.round(intervalDays)));
  return toISODate(d);
}

/** YYYY-MM-DD of Monday of the current week (local). */
export function startOfWeekISODate(from: Date = new Date()): string {
  const d = new Date(from);
  const sinceMonday = (d.getDay() + 6) % 7; // 0 = Sun → 6, 1 = Mon → 0, …
  d.setDate(d.getDate() - sinceMonday);
  return toISODate(d);
}
