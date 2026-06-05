"use client";

import { Fragment, useState, useTransition, type ReactNode } from "react";
import Link from "next/link";
import type { ReviewQueue } from "@/lib/data/review";
import { reviewItem } from "@/lib/actions/review";
import { Card, MetaLabel } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { CodeBlock } from "@/components/learn/code-block";
import { cn } from "@/lib/cn";

const FLASH_RATINGS: { label: string; quality: number }[] = [
  { label: "Again", quality: 1 },
  { label: "Hard", quality: 3 },
  { label: "Good", quality: 4 },
  { label: "Easy", quality: 5 },
];

function inline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`)/g).map((seg, i) =>
    seg.startsWith("`") && seg.endsWith("`") ? (
      <code key={i} className="rounded bg-track px-1.5 py-0.5 font-mono text-[12.5px]">
        {seg.slice(1, -1)}
      </code>
    ) : (
      <Fragment key={i}>{seg}</Fragment>
    ),
  );
}

/** Review mode: spaced-repetition flashcards + predict-the-output. Rendered inside PracticeHub. */
export function PracticeView({
  initial,
  scopeTitle,
}: {
  initial: ReviewQueue;
  scopeTitle?: string;
}) {
  const [queue] = useState(initial.queue);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [, startTransition] = useTransition();

  const total = queue.length;
  const current = queue[index];

  function advance(cardId: string, quality: number) {
    startTransition(async () => {
      try {
        await reviewItem(cardId, quality);
      } catch {
        /* best-effort; keep the session flowing */
      }
    });
    setReviewedCount((n) => n + 1);
    setIndex((i) => i + 1);
    setRevealed(false);
    setSelected(null);
  }

  if (total === 0) {
    return (
      <Card>
        <p className="text-sm text-fg">
          {scopeTitle
            ? `Nothing due in ${scopeTitle} right now.`
            : "You're all caught up. Nothing due right now."}
        </p>
        <p className="mt-1 text-[13px] text-muted">
          Reviews come back on a spaced-repetition schedule. Complete more
          lessons to unlock new cards.
        </p>
        <Link
          href="/learn"
          className="mt-4 inline-block text-[13px] font-medium text-muted transition-colors hover:text-fg"
        >
          Go to Learn →
        </Link>
      </Card>
    );
  }

  if (index >= total) {
    return (
      <Card>
        <p className="text-sm text-fg">
          Session complete. You reviewed <strong>{reviewedCount}</strong>{" "}
          {reviewedCount === 1 ? "item" : "items"}.
        </p>
        <p className="mt-1 text-[13px] text-muted">
          Spaced repetition has rescheduled each one. Come back when they&apos;re
          due again.
        </p>
      </Card>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          <span className="text-signal">{initial.dueCount}</span> due ·{" "}
          {initial.newCount} new
        </p>
        <span className="shrink-0 font-mono text-xs text-muted">
          {index + 1} / {total}
        </span>
      </div>
      <ProgressBar value={(index / total) * 100} />

      {current.type === "flashcard" ? (
        <Card>
          <MetaLabel>Flashcard</MetaLabel>
          <p className="mt-3 font-display text-lg font-medium tracking-tight">
            {inline(current.front)}
          </p>

          {revealed ? (
            <>
              <div className="mt-4 border-t border-border pt-4 text-[15px] leading-relaxed text-fg">
                {inline(current.back)}
              </div>
              <p className="mt-4 text-[13px] text-muted">How well did you recall it?</p>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {FLASH_RATINGS.map((r) => (
                  <Button
                    key={r.quality}
                    variant="secondary"
                    size="sm"
                    onClick={() => advance(current.id, r.quality)}
                  >
                    {r.label}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <Button className="mt-4" onClick={() => setRevealed(true)}>
              Show answer
            </Button>
          )}
        </Card>
      ) : (
        <Card>
          <MetaLabel>Predict the output</MetaLabel>
          <p className="mt-2 text-sm text-muted">What does this print?</p>
          <div className="mt-3">
            <CodeBlock code={current.code} />
          </div>

          <div className="mt-3 flex flex-col gap-2">
            {current.options.map((opt, i) => {
              const answered = selected !== null;
              const isAnswer = i === current.answer;
              const chosen = selected === i;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={answered}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "flex items-center gap-2 rounded-control border px-3 py-2 text-left font-mono text-[13px] transition-colors",
                    !answered && "border-border text-fg hover:bg-hover",
                    answered && isAnswer && "border-code-str text-code-str",
                    answered && chosen && !isAnswer && "border-border-strong text-muted line-through",
                    answered && !chosen && !isAnswer && "border-border text-faint",
                  )}
                >
                  {answered && (
                    <span className="w-3 shrink-0">
                      {isAnswer ? "✓" : chosen ? "✗" : ""}
                    </span>
                  )}
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <>
              <p className="mt-3 text-[13px] text-muted">
                <span className="font-medium text-fg">
                  {selected === current.answer ? "Correct." : "Not quite."}
                </span>{" "}
                {current.explanation}
              </p>
              <Button
                className="mt-3"
                onClick={() =>
                  advance(current.id, selected === current.answer ? 4 : 1)
                }
              >
                Next →
              </Button>
            </>
          )}
        </Card>
      )}
    </>
  );
}