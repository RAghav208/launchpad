import { getReviewQueue } from "@/lib/data/review";
import { getLesson, getGuidedProblems } from "@/content";
import { PracticeHub } from "@/components/practice/practice-hub";

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<{ lesson?: string }>;
}) {
  const { lesson } = await searchParams;
  const review = await getReviewQueue(lesson);
  const guided = getGuidedProblems(lesson);
  const scopeTitle = lesson ? getLesson(lesson)?.title : undefined;
  return <PracticeHub review={review} guided={guided} scopeTitle={scopeTitle} />;
}