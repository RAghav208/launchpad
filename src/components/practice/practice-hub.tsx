"use client";

import { useState } from "react";
import Link from "next/link";
import type { ReviewQueue } from "@/lib/data/review";
import type { GuidedProblem } from "@/content/types";
import { PracticeView } from "@/components/practice/practice-view";
import { GuidedPractice } from "@/components/practice/guided-practice";
import { cn } from "@/lib/cn";

export function PracticeHub({
  review,
  guided,
  scopeTitle,
}: {
  review: ReviewQueue;
  guided: GuidedProblem[];
  scopeTitle?: string;
}) {
  const hasGuided = guided.length > 0;
  const [mode, setMode] = useState<"guided" | "review">(
    hasGuided ? "guided" : "review",
  );

  const tab = (value: "guided" | "review", label: string) => (
    <button
      type="button"
      onClick={() => setMode(value)}
      aria-pressed={mode === value}
      className={cn(
        "rounded-[5px] px-3 py-1 text-[13px] font-medium transition-colors",
        mode === value ? "bg-ink text-on-ink" : "text-muted hover:text-fg",
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Practice
          </h1>
          {scopeTitle ? (
            <p className="mt-1 text-sm text-muted">
              {scopeTitle} ·{" "}
              <Link
                href="/practice"
                className="underline-offset-4 transition-colors hover:text-fg hover:underline"
              >
                practice all
              </Link>
            </p>
          ) : (
            <p className="mt-1 text-sm text-muted">
              Work a problem end to end, or review your cards.
            </p>
          )}
        </div>
        <div className="flex shrink-0 rounded-control border border-border p-0.5">
          {tab("guided", "Guided")}
          {tab("review", "Review")}
        </div>
      </div>

      {mode === "guided" ? (
        <GuidedPractice problems={guided} />
      ) : (
        <PracticeView initial={review} scopeTitle={scopeTitle} />
      )}
    </div>
  );
}