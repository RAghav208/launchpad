"use client";

import { useState } from "react";
import Link from "next/link";
import type { GuidedProblem } from "@/content/types";
import { LessonRenderer } from "@/components/learn/lesson-renderer";
import { Button } from "@/components/ui/button";
import { Card, MetaLabel } from "@/components/ui/card";

/** Guided mode: work a problem, reveal hints one at a time, then study the worked solution. */
export function GuidedPractice({ problems }: { problems: GuidedProblem[] }) {
  const [index, setIndex] = useState(0);
  const [hints, setHints] = useState(0);
  const [solved, setSolved] = useState(false);

  const total = problems.length;

  if (total === 0) {
    return (
      <Card>
        <p className="text-sm text-fg">No guided problems here yet.</p>
        <p className="mt-1 text-[13px] text-muted">
          Guided problems roll out track by track. Meanwhile, switch to{" "}
          <strong>Review</strong> above to drill flashcards and predict-the-output.
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
          Nice work. You finished all {total} guided{" "}
          {total === 1 ? "problem" : "problems"} here.
        </p>
        <button
          onClick={() => {
            setIndex(0);
            setHints(0);
            setSolved(false);
          }}
          className="mt-3 text-[13px] font-medium text-muted transition-colors hover:text-fg"
        >
          Start over
        </button>
      </Card>
    );
  }

  const p = problems[index];
  function reset() {
    setHints(0);
    setSolved(false);
  }

  return (
    <>
      <div className="flex items-center justify-end">
        <span className="font-mono text-xs text-muted">
          {index + 1} / {total}
        </span>
      </div>

      <Card>
        <MetaLabel>Guided problem</MetaLabel>
        <h2 className="mt-2 font-display text-lg font-semibold tracking-tight">
          {p.title}
        </h2>
        <p className="mt-2 text-[15px] leading-7 text-fg">{p.prompt}</p>

        {hints > 0 && (
          <ol className="mt-4 flex flex-col gap-2.5 border-t border-border pt-4">
            {p.hints.slice(0, hints).map((h, i) => (
              <li key={i} className="flex gap-3 text-[14px] leading-6 text-fg">
                <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
                  Hint {i + 1}
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {hints < p.hints.length && (
            <Button variant="secondary" size="sm" onClick={() => setHints((h) => h + 1)}>
              {hints === 0 ? "Show a hint" : `Next hint (${hints}/${p.hints.length})`}
            </Button>
          )}
          {!solved && (
            <Button size="sm" onClick={() => setSolved(true)}>
              Show solution
            </Button>
          )}
        </div>

        {solved && (
          <div className="mt-5 border-t border-border pt-5">
            <MetaLabel>Worked solution</MetaLabel>
            <div className="mt-3">
              <LessonRenderer blocks={p.solution} />
            </div>
          </div>
        )}
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          disabled={index === 0}
          onClick={() => {
            setIndex((i) => i - 1);
            reset();
          }}
        >
          Previous
        </Button>
        <Button
          size="sm"
          onClick={() => {
            setIndex((i) => i + 1);
            reset();
          }}
        >
          {index + 1 < total ? "Next problem" : "Finish"}
        </Button>
      </div>
    </>
  );
}