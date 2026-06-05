import { Card, MetaLabel } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { getStudyTotals, getStudyDays } from "@/lib/data/study";
import { getProfile } from "@/lib/data/profile";
import { getReviewQueue } from "@/lib/data/review";
import { getDsaEntries } from "@/lib/data/dsa";
import { getCompletedLessonIds } from "@/lib/data/lessons";
import { getRoadmapDoneIds } from "@/lib/data/roadmap";
import { Greeting } from "@/components/dashboard/greeting";
import { ALL_LESSONS, LESSON_COUNT } from "@/content";
import { ROADMAP, ROADMAP_TASK_COUNT } from "@/content/roadmap";
import { todayISODate } from "@/lib/srs";

function formatMinutes(total: number): string {
  if (total <= 0) return "0m";
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

export default async function DashboardPage() {
  const [study, studyDays, profile, review, dsa, completedLessonIds, roadmapDoneIds] =
    await Promise.all([
      getStudyTotals(),
      getStudyDays(),
      getProfile(),
      getReviewQueue(),
      getDsaEntries(),
      getCompletedLessonIds(),
      getRoadmapDoneIds(),
    ]);

  const { todayMinutes, weekMinutes } = study;
  const name =
    profile?.display_name?.trim() || profile?.email?.split("@")[0] || "there";
  const today = todayISODate();

  // Reviews / DSA due now
  const reviewDue = review.queue.length;
  const dsaDue = dsa.filter((e) => e.due_date <= today).length;

  // Lessons
  const completed = new Set(completedLessonIds);
  const lessonsDone = ALL_LESSONS.filter((l) => completed.has(l.id)).length;
  const nextLesson = ALL_LESSONS.find((l) => !completed.has(l.id));
  const nextLessonIndex = nextLesson
    ? ALL_LESSONS.findIndex((l) => l.id === nextLesson.id)
    : -1;
  const lessonPct = LESSON_COUNT ? Math.round((lessonsDone / LESSON_COUNT) * 100) : 0;

  // Roadmap progress (mirrors the Roadmap page)
  const roadmapDone = new Set(roadmapDoneIds);
  const phases = ROADMAP.map((phase) => {
    const ids = phase.weeks.flatMap((w) => w.tasks.map((t) => t.id));
    const done = ids.filter((id) => roadmapDone.has(id)).length;
    return {
      title: phase.title,
      value: ids.length ? Math.round((done / ids.length) * 100) : 0,
    };
  });
  const overallPct = ROADMAP_TASK_COUNT
    ? Math.round((roadmapDone.size / ROADMAP_TASK_COUNT) * 100)
    : 0;

  // Where you are right now = first week with an unchecked task
  let currentLabel = "Plan complete";
  current: for (const phase of ROADMAP) {
    for (const week of phase.weeks) {
      if (week.tasks.some((t) => !roadmapDone.has(t.id))) {
        currentLabel = `${phase.title.split(" · ")[0]} · ${week.title}`;
        break current;
      }
    }
  }

  // Target countdown
  const daysToTarget = profile?.target_date
    ? Math.ceil(
        (new Date(`${profile.target_date}T00:00:00`).getTime() -
          new Date(`${today}T00:00:00`).getTime()) /
          86_400_000,
      )
    : null;

  const daysStudied = studyDays.length;
  const cardsInRotation = Math.max(0, review.total - review.newCount);

  const todos: { text: string; done: boolean; href: string }[] = [
    {
      text:
        reviewDue > 0
          ? `Review ${reviewDue} due ${reviewDue === 1 ? "card" : "cards"}`
          : "Reviews all caught up",
      done: reviewDue === 0,
      href: "/practice",
    },
    {
      text: nextLesson ? `Read: ${nextLesson.title}` : "All lessons complete",
      done: !nextLesson,
      href: nextLesson ? `/learn/${nextLesson.id}` : "/learn",
    },
    {
      text:
        dsaDue > 0
          ? `Revisit ${dsaDue} DSA ${dsaDue === 1 ? "problem" : "problems"}`
          : "DSA reviews clear",
      done: dsaDue === 0,
      href: "/dsa",
    },
  ];

  const stats: { value: string; suffix?: string; label: string }[] = [
    { value: String(lessonsDone), suffix: `/${LESSON_COUNT}`, label: "Lessons done" },
    { value: String(dsa.length), label: "Problems logged" },
    { value: String(daysStudied), label: "Days studied" },
    { value: String(cardsInRotation), label: "Cards in rotation" },
  ];

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      {/* Greeting + countdown */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Greeting name={name} />
          <p className="mt-1 text-sm text-muted">{currentLabel}</p>
        </div>
        {daysToTarget !== null ? (
          <Chip>
            <span className="font-mono text-sm text-fg">{daysToTarget}</span> days
            to target
          </Chip>
        ) : (
          <Link
            href="/settings"
            className="text-[13px] text-muted transition-colors hover:text-fg"
          >
            Set a target →
          </Link>
        )}
      </div>

      {/* Due for review today */}
      <Card className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <MetaLabel>Due for review today</MetaLabel>
          <p className="mt-1 font-display text-lg font-medium">
            <span className="text-signal">{reviewDue}</span>{" "}
            {reviewDue === 1 ? "card" : "cards"} ·{" "}
            <span className="text-signal">{dsaDue}</span>{" "}
            {dsaDue === 1 ? "problem" : "problems"} to revisit
          </p>
          <p className="mt-1 text-[13px] text-muted">
            Spaced repetition keeps it in long-term memory.
          </p>
        </div>
        <Link href="/practice">
          <Button>
            Start review <ArrowRightIcon className="size-4" />
          </Button>
        </Link>
      </Card>

      {/* Focus time */}
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
        {nextLesson ? (
          <Link href={`/learn/${nextLesson.id}`} className="group block h-full">
            <Card className="h-full transition-colors group-hover:border-border-strong">
              <MetaLabel>Continue learning</MetaLabel>
              <h3 className="mt-2.5 font-display text-base font-medium">
                {nextLesson.title}
              </h3>
              <ProgressBar value={lessonPct} className="mt-3" />
              <p className="mt-2.5 font-mono text-xs text-muted">
                Lesson {nextLessonIndex + 1} of {LESSON_COUNT} · {lessonPct}%
              </p>
            </Card>
          </Link>
        ) : (
          <Card className="h-full">
            <MetaLabel>Continue learning</MetaLabel>
            <h3 className="mt-2.5 font-display text-base font-medium">
              All lessons complete
            </h3>
            <ProgressBar value={100} className="mt-3" />
            <p className="mt-2.5 font-mono text-xs text-muted">
              {LESSON_COUNT} of {LESSON_COUNT} · 100%
            </p>
          </Card>
        )}

        <Card className="h-full">
          <MetaLabel>Today&apos;s focus</MetaLabel>
          <ul className="mt-3 flex flex-col gap-2.5">
            {todos.map((t) => {
              const row = (
                <span
                  className={cn(
                    "flex items-center gap-2.5 text-[13px] transition-colors",
                    t.done ? "text-muted line-through" : "text-fg group-hover:text-fg",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-[15px] shrink-0 items-center justify-center rounded-[5px] border",
                      t.done ? "border-ink bg-ink text-on-ink" : "border-border-strong",
                    )}
                  >
                    {t.done && <CheckIcon className="size-2.5" />}
                  </span>
                  {t.text}
                </span>
              );
              return (
                <li key={t.text}>
                  {t.done ? (
                    row
                  ) : (
                    <Link href={t.href} className="group block">
                      {row}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      {/* Progress by phase */}
      <Card>
        <div className="flex items-center justify-between">
          <MetaLabel>Your progress</MetaLabel>
          <span className="font-mono text-xs text-fg">{overallPct}% overall</span>
        </div>
        <div className="mt-4 flex flex-col gap-3.5">
          {phases.map((p) => (
            <div key={p.title}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate text-[13px] text-fg">{p.title}</span>
                <span className="shrink-0 font-mono text-xs text-muted">
                  {p.value}%
                </span>
              </div>
              <ProgressBar value={p.value} className="mt-1.5" />
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