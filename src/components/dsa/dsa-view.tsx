"use client";

import { useState, useTransition } from "react";
import type { DsaEntry } from "@/lib/data/dsa";
import { DSA_PATTERNS, DIFFICULTIES } from "@/content/dsa-patterns";
import {
  addDsaProblem,
  reviewDsaProblem,
  deleteDsaProblem,
} from "@/lib/actions/dsa";
import { todayISODate } from "@/lib/srs";
import { Card, MetaLabel } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/field";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

const REVIEW_OPTIONS: { label: string; quality: number }[] = [
  { label: "Again", quality: 1 },
  { label: "Hard", quality: 3 },
  { label: "Good", quality: 4 },
  { label: "Easy", quality: 5 },
];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 font-mono text-[10.5px] text-muted">
      {children}
    </span>
  );
}

export function DsaView({ entries }: { entries: DsaEntry[] }) {
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [pattern, setPattern] = useState<string>(DSA_PATTERNS[0]);
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [solvedUnaided, setSolvedUnaided] = useState(true);
  const [url, setUrl] = useState("");

  const today = todayISODate();
  const due = entries.filter((e) => e.due_date <= today);
  const total = entries.length;
  const solvedRate = total
    ? Math.round((entries.filter((e) => e.solved_unaided).length / total) * 100)
    : 0;

  function add() {
    if (!name.trim()) return;
    startTransition(async () => {
      await addDsaProblem({
        name: name.trim(),
        pattern,
        difficulty,
        solvedUnaided,
        url: url.trim() || undefined,
      });
      setName("");
      setUrl("");
    });
  }

  function review(id: string, quality: number) {
    startTransition(async () => {
      await reviewDsaProblem(id, quality);
    });
  }

  function remove(id: string) {
    startTransition(async () => {
      await deleteDsaProblem(id);
    });
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          DSA Log
        </h1>
        <p className="mt-1 text-sm text-muted">
          Log every problem you solve. Spaced repetition resurfaces them right
          before you&apos;d forget.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="font-display text-2xl font-semibold tracking-tight">
            {total}
          </p>
          <MetaLabel className="mt-1.5">Problems logged</MetaLabel>
        </Card>
        <Card className="p-4">
          <p className="font-display text-2xl font-semibold tracking-tight">
            {solvedRate}%
          </p>
          <MetaLabel className="mt-1.5">Solved unaided</MetaLabel>
        </Card>
        <Card className="p-4">
          <p className="font-display text-2xl font-semibold tracking-tight">
            <span className={due.length ? "text-signal" : undefined}>
              {due.length}
            </span>
          </p>
          <MetaLabel className="mt-1.5">Due for review</MetaLabel>
        </Card>
      </div>

      {/* Add a problem */}
      <Card>
        <MetaLabel>Log a problem</MetaLabel>
        <div className="mt-3 flex flex-col gap-3">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Problem name (e.g. Two Sum)"
            onKeyDown={(e) => {
              if (e.key === "Enter") add();
            }}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Select value={pattern} onChange={(e) => setPattern(e.target.value)}>
              {DSA_PATTERNS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
            <Select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d[0].toUpperCase() + d.slice(1)}
                </option>
              ))}
            </Select>
          </div>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Link (optional) — LeetCode / NeetCode URL"
          />
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setSolvedUnaided((v) => !v)}
              aria-pressed={solvedUnaided}
              className="flex items-center gap-2.5 text-[13px] text-fg"
            >
              <span
                className={cn(
                  "flex size-[17px] shrink-0 items-center justify-center rounded-[5px] border transition-colors",
                  solvedUnaided
                    ? "border-ink bg-ink text-on-ink"
                    : "border-border-strong",
                )}
              >
                {solvedUnaided && <CheckIcon className="size-3" />}
              </span>
              Solved unaided
            </button>
            <Button onClick={add} disabled={pending || !name.trim()}>
              Add problem
            </Button>
          </div>
        </div>
      </Card>

      {/* Due for review */}
      {due.length > 0 && (
        <Card>
          <MetaLabel>Due for review</MetaLabel>
          <ul className="mt-3 flex flex-col divide-y divide-border">
            {due.map((e) => (
              <li
                key={e.id}
                className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-fg">{e.name}</p>
                  {e.pattern && (
                    <p className="mt-0.5 text-xs text-muted">{e.pattern}</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-1.5">
                  {REVIEW_OPTIONS.map((opt) => (
                    <Button
                      key={opt.quality}
                      variant="secondary"
                      size="sm"
                      disabled={pending}
                      onClick={() => review(e.id, opt.quality)}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* All problems */}
      <Card>
        <MetaLabel>All problems</MetaLabel>
        {entries.length === 0 ? (
          <p className="mt-3 text-sm text-muted">
            Nothing logged yet. Add your first problem above. 👆
          </p>
        ) : (
          <ul className="mt-3 flex flex-col divide-y divide-border">
            {entries.map((e) => (
              <li
                key={e.id}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {e.url ? (
                      <a
                        href={e.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate text-sm font-medium text-fg underline-offset-4 hover:underline"
                      >
                        {e.name}
                      </a>
                    ) : (
                      <span className="truncate text-sm font-medium text-fg">
                        {e.name}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    {e.pattern && <Tag>{e.pattern}</Tag>}
                    {e.difficulty && <Tag>{e.difficulty}</Tag>}
                    <span className="font-mono text-[10.5px] text-faint">
                      next {e.due_date}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove(e.id)}
                  disabled={pending}
                  aria-label={`Delete ${e.name}`}
                  className="shrink-0 rounded-control px-2 py-1 text-[13px] text-muted transition-colors hover:bg-hover hover:text-fg disabled:opacity-50"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
