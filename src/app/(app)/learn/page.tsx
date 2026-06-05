import Link from "next/link";
import { TRACKS, LESSON_COUNT } from "@/content";
import { getCompletedLessonIds } from "@/lib/data/lessons";
import { Card, MetaLabel } from "@/components/ui/card";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export default async function LearnPage() {
  const doneIds = new Set(await getCompletedLessonIds());
  const overall = LESSON_COUNT
    ? Math.round((doneIds.size / LESSON_COUNT) * 100)
    : 0;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Learn
          </h1>
          <p className="mt-1 text-sm text-muted">
            Work through the lessons, then drill them in Practice.
          </p>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-display text-2xl font-semibold tracking-tight">
            {overall}%
          </div>
          <MetaLabel>
            {doneIds.size}/{LESSON_COUNT} done
          </MetaLabel>
        </div>
      </div>

      {TRACKS.map((track) => (
        <section key={track.id} className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-[15px] font-semibold tracking-tight text-fg">
              {track.title}
            </h2>
            <span className="h-px flex-1 bg-border" />
          </div>

          {track.modules.map((module) => (
            <Card key={module.id}>
              <MetaLabel>{module.title}</MetaLabel>
              <ul className="mt-2 flex flex-col">
                {module.lessons.map((lesson) => {
                  const done = doneIds.has(lesson.id);
                  return (
                    <li key={lesson.id}>
                      <Link
                        href={`/learn/${lesson.id}`}
                        className="flex items-center gap-3 rounded-control px-2 py-2.5 transition-colors hover:bg-hover"
                      >
                        <span
                          className={cn(
                            "flex size-5 shrink-0 items-center justify-center rounded-full border",
                            done
                              ? "border-ink bg-ink text-on-ink"
                              : "border-border-strong",
                          )}
                        >
                          {done && <CheckIcon className="size-3" />}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-fg">
                            {lesson.title}
                          </span>
                          <span className="block truncate text-[13px] text-muted">
                            {lesson.summary}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Card>
          ))}
        </section>
      ))}
    </div>
  );
}