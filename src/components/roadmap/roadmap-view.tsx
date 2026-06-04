"use client";

import { useState, useTransition } from "react";
import { ROADMAP, ROADMAP_TASK_COUNT } from "@/content/roadmap";
import { setRoadmapTaskDone } from "@/lib/actions/roadmap";
import { Card, MetaLabel } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export function RoadmapView({ doneIds }: { doneIds: string[] }) {
  const [done, setDone] = useState<Set<string>>(() => new Set(doneIds));
  const [, startTransition] = useTransition();

  function toggle(taskId: string) {
    const next = !done.has(taskId);

    // Optimistic update
    setDone((prev) => {
      const copy = new Set(prev);
      if (next) copy.add(taskId);
      else copy.delete(taskId);
      return copy;
    });

    startTransition(async () => {
      try {
        await setRoadmapTaskDone(taskId, next);
      } catch {
        // Revert on failure
        setDone((prev) => {
          const copy = new Set(prev);
          if (next) copy.delete(taskId);
          else copy.add(taskId);
          return copy;
        });
      }
    });
  }

  const overall = Math.round((done.size / ROADMAP_TASK_COUNT) * 100);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Roadmap
          </h1>
          <p className="mt-1 text-sm text-muted">
            Your tailored 12-week plan. Check tasks off as you go — progress
            saves automatically.
          </p>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-display text-2xl font-semibold tracking-tight">
            {overall}%
          </div>
          <MetaLabel>
            {done.size}/{ROADMAP_TASK_COUNT} done
          </MetaLabel>
        </div>
      </div>

      {ROADMAP.map((phase) => {
        const ids = phase.weeks.flatMap((w) => w.tasks.map((t) => t.id));
        const phaseDone = ids.filter((id) => done.has(id)).length;
        const pct = Math.round((phaseDone / ids.length) * 100);

        return (
          <Card key={phase.id}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-base font-semibold tracking-tight">
                  {phase.title}
                </h2>
                <p className="mt-0.5 text-[13px] text-muted">{phase.subtitle}</p>
              </div>
              <span className="shrink-0 font-mono text-xs text-muted">
                {phaseDone}/{ids.length}
              </span>
            </div>
            <ProgressBar value={pct} className="mt-3" />

            <div className="mt-4 flex flex-col gap-4">
              {phase.weeks.map((week) => (
                <div key={week.id}>
                  <MetaLabel>{week.title}</MetaLabel>
                  <ul className="mt-2 flex flex-col gap-1">
                    {week.tasks.map((task) => {
                      const isDone = done.has(task.id);
                      return (
                        <li key={task.id}>
                          <button
                            type="button"
                            onClick={() => toggle(task.id)}
                            aria-pressed={isDone}
                            className="flex w-full items-center gap-2.5 rounded-control px-2 py-1.5 text-left text-[13.5px] transition-colors hover:bg-hover"
                          >
                            <span
                              className={cn(
                                "flex size-[17px] shrink-0 items-center justify-center rounded-[5px] border transition-colors",
                                isDone
                                  ? "border-ink bg-ink text-on-ink"
                                  : "border-border-strong",
                              )}
                            >
                              {isDone && <CheckIcon className="size-3" />}
                            </span>
                            <span
                              className={cn(
                                isDone ? "text-muted line-through" : "text-fg",
                              )}
                            >
                              {task.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
