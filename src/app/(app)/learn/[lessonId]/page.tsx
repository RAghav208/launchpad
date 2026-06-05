import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, adjacentLessons } from "@/content";
import { getLessonStatus } from "@/lib/data/lessons";
import { LessonRenderer } from "@/components/learn/lesson-renderer";
import { MarkCompleteButton } from "@/components/learn/mark-complete-button";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ChevronLeftIcon } from "@/components/icons";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getLesson(lessonId);
  if (!lesson) notFound();

  const status = await getLessonStatus(lessonId);
  const { prev, next } = adjacentLessons(lessonId);

  return (
    <article className="mx-auto flex max-w-2xl flex-col gap-6">
      <header>
        <Link
          href="/learn"
          className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-fg"
        >
          ← All lessons
        </Link>
        <h1 className="mt-3 font-display text-[28px] font-semibold leading-tight tracking-tight">
          {lesson.title}
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          {lesson.summary}
        </p>
      </header>

      <LessonRenderer blocks={lesson.blocks} />

      <footer className="mt-4 border-t border-border pt-6">
        <div className="flex flex-wrap items-center gap-3">
          <MarkCompleteButton
            lessonId={lesson.id}
            initialDone={status === "done"}
          />
          <Link href={`/practice?lesson=${lesson.id}`}>
            <Button variant="secondary">
              Practice this <ArrowRightIcon className="size-4" />
            </Button>
          </Link>
        </div>

        <nav className="mt-6 flex items-stretch divide-x divide-border overflow-hidden rounded-card border border-border bg-surface">
          {prev ? (
            <Link
              href={`/learn/${prev.id}`}
              className="flex flex-1 items-center gap-3 p-4 transition-colors hover:bg-hover"
            >
              <ChevronLeftIcon className="size-4 shrink-0 text-muted" />
              <span className="min-w-0">
                <span className="block font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
                  Previous
                </span>
                <span className="block truncate text-sm font-medium text-fg">
                  {prev.title}
                </span>
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/learn/${next.id}`}
              className="flex flex-1 items-center justify-end gap-3 p-4 text-right transition-colors hover:bg-hover"
            >
              <span className="min-w-0">
                <span className="block font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
                  Next
                </span>
                <span className="block truncate text-sm font-medium text-fg">
                  {next.title}
                </span>
              </span>
              <ChevronLeftIcon className="size-4 shrink-0 rotate-180 text-muted" />
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      </footer>
    </article>
  );
}