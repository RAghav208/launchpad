import { Card, MetaLabel } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { getStudyTotals } from "@/lib/data/study";
import { getProfile } from "@/lib/data/profile";
import { Greeting } from "@/components/dashboard/greeting";

// Static seed data for the Phase A scaffold — real data arrives with the
// database + auth in Phase B.
const phases: { label: string; value: number }[] = [
  { label: "Phase 0 · Python", value: 42 },
  { label: "Phase 1 · Problem-solving", value: 8 },
  { label: "Phase 2 · Core DSA", value: 0 },
];

const todos: { text: string; done: boolean }[] = [
  { text: "Read: for vs while", done: true },
  { text: "Solve 3 warm-up loop exercises", done: false },
  { text: "Flashcards: the loops deck", done: false },
];

const stats: { value: string; suffix?: string; label: string }[] = [
  { value: "5", suffix: "/30", label: "Lessons done" },
  { value: "8", label: "Problems logged" },
  { value: "6", label: "Days studied" },
  { value: "87%", label: "Recall accuracy" },
];

function formatMinutes(total: number): string {
  if (total <= 0) return "0m";
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

export default async function DashboardPage() {
  const [{ todayMinutes, weekMinutes }, profile] = await Promise.all([
    getStudyTotals(),
    getProfile(),
  ]);
  const name =
    profile?.display_name?.trim() || profile?.email?.split("@")[0] || "there";
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      {/* Greeting + countdown */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Greeting name={name} />
          <p className="mt-1 text-sm text-muted">
            Phase 0 · Week 2 — Loops &amp; functions
          </p>
        </div>
        <Chip>
          <span className="font-mono text-sm text-fg">84</span> days to target
        </Chip>
      </div>

      {/* Due for review today */}
      <Card className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <MetaLabel>Due for review today</MetaLabel>
          <p className="mt-1 font-display text-lg font-medium">
            <span className="text-signal">12</span> flashcards ·{" "}
            <span className="text-signal">2</span> problems to revisit
          </p>
          <p className="mt-1 text-[13px] text-muted">
            Spaced repetition keeps it in long-term memory.
          </p>
        </div>
        <Button>
          Start review <ArrowRightIcon className="size-4" />
        </Button>
      </Card>

      {/* Focus time — real data from study_sessions */}
      <Card>
        <MetaLabel>Focus time</MetaLabel>
        <div className="mt-2 flex gap-10">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight">
              {formatMinutes(todayMinutes)}
            </p>
            <p className="mt-0.5 text-[13px] text-muted">Today</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight">
              {formatMinutes(weekMinutes)}
            </p>
            <p className="mt-0.5 text-[13px] text-muted">This week</p>
          </div>
        </div>
      </Card>

      {/* Continue + Today's focus */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <MetaLabel>Continue learning</MetaLabel>
          <h3 className="mt-2.5 font-display text-base font-medium">
            Python › 04 · Loops
          </h3>
          <ProgressBar value={55} className="mt-3" />
          <p className="mt-2.5 font-mono text-xs text-muted">Lesson 4 of 12 · 55%</p>
        </Card>

        <Card>
          <MetaLabel>Today&apos;s focus</MetaLabel>
          <ul className="mt-3 flex flex-col gap-2.5">
            {todos.map((t) => (
              <li
                key={t.text}
                className={cn(
                  "flex items-center gap-2.5 text-[13px]",
                  t.done ? "text-muted line-through" : "text-fg",
                )}
              >
                <span
                  className={cn(
                    "flex size-[15px] shrink-0 items-center justify-center rounded-[5px] border",
                    t.done
                      ? "border-ink bg-ink text-on-ink"
                      : "border-border-strong",
                  )}
                >
                  {t.done && <CheckIcon className="size-2.5" />}
                </span>
                {t.text}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Progress by phase */}
      <Card>
        <div className="flex items-center justify-between">
          <MetaLabel>Your progress</MetaLabel>
          <span className="font-mono text-xs text-fg">18% overall</span>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {phases.map((p) => (
            <div
              key={p.label}
              className="grid grid-cols-[110px_1fr_36px] items-center gap-3 text-[13px] sm:grid-cols-[150px_1fr_40px]"
            >
              <span>{p.label}</span>
              <ProgressBar value={p.value} />
              <span className="text-right font-mono text-xs text-muted">
                {p.value}%
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <p className="font-display text-2xl font-semibold tracking-tight">
              {s.value}
              {s.suffix && (
                <span className="text-base font-normal text-muted">{s.suffix}</span>
              )}
            </p>
            <MetaLabel className="mt-1.5">{s.label}</MetaLabel>
          </Card>
        ))}
      </div>
    </div>
  );
}
