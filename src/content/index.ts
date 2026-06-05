import type {
  Flashcard,
  GuidedProblem,
  Lesson,
  PredictOutput,
  ReviewItem,
  Track,
} from "@/content/types";
import { pythonTrack } from "@/content/python/lessons";
import { pythonFlashcards } from "@/content/python/flashcards";
import { pythonPredict } from "@/content/python/predict";
import { pythonGuided } from "@/content/python/guided";
import {
  foundationsTrack,
  foundationsFlashcards,
  foundationsPredict,
} from "@/content/cs/foundations";
import {
  treesSortingTrack,
  treesSortingFlashcards,
  treesSortingPredict,
} from "@/content/cs/trees-sorting";
import {
  graphsDpTrack,
  graphsDpFlashcards,
  graphsDpPredict,
} from "@/content/cs/graphs-dp";
import { csGuided } from "@/content/cs/guided";
import { mlFoundationsTrack, mlFoundationsGuided } from "@/content/ml/foundations";
import { mathTrack, mathGuided } from "@/content/ml/math";
import { coreMlTrack, coreMlGuided } from "@/content/ml/core";
import { deepLearningTrack, deepLearningGuided } from "@/content/ml/deeplearning";
import { llmsTrack, llmsGuided } from "@/content/ml/llms";
import { mlopsTrack, mlopsGuided } from "@/content/ml/mlops";
import { mlFlashcards, mlPredict } from "@/content/ml/cards";

export const TRACKS: Track[] = [
  pythonTrack,
  foundationsTrack,
  treesSortingTrack,
  graphsDpTrack,
  mlFoundationsTrack,
  mathTrack,
  coreMlTrack,
  deepLearningTrack,
  llmsTrack,
  mlopsTrack,
];

export const ALL_LESSONS: Lesson[] = TRACKS.flatMap((track) =>
  track.modules.flatMap((module) => module.lessons),
);

export const LESSON_COUNT = ALL_LESSONS.length;

export function getLesson(id: string): Lesson | undefined {
  return ALL_LESSONS.find((lesson) => lesson.id === id);
}

/** Previous / next lesson in reading order (across modules and tracks). */
export function adjacentLessons(id: string): { prev?: Lesson; next?: Lesson } {
  const i = ALL_LESSONS.findIndex((lesson) => lesson.id === id);
  if (i === -1) return {};
  return {
    prev: i > 0 ? ALL_LESSONS[i - 1] : undefined,
    next: i < ALL_LESSONS.length - 1 ? ALL_LESSONS[i + 1] : undefined,
  };
}

export const ALL_FLASHCARDS: Flashcard[] = [
  ...pythonFlashcards,
  ...foundationsFlashcards,
  ...treesSortingFlashcards,
  ...graphsDpFlashcards,
  ...mlFlashcards,
];
export const ALL_PREDICT: PredictOutput[] = [
  ...pythonPredict,
  ...foundationsPredict,
  ...treesSortingPredict,
  ...graphsDpPredict,
  ...mlPredict,
];

/** Review items in pedagogical order: per lesson, its flashcards then its predicts. */
export const ALL_REVIEW_ITEMS: ReviewItem[] = ALL_LESSONS.flatMap((lesson) => [
  ...ALL_FLASHCARDS.filter((f) => f.lessonId === lesson.id).map(
    (f) => ({ type: "flashcard", ...f }) as ReviewItem,
  ),
  ...ALL_PREDICT.filter((p) => p.lessonId === lesson.id).map(
    (p) => ({ type: "predict", ...p }) as ReviewItem,
  ),
]);

export const REVIEW_ITEM_COUNT = ALL_REVIEW_ITEMS.length;

const GUIDED_POOL: GuidedProblem[] = [
  ...pythonGuided,
  ...csGuided,
  ...mlFoundationsGuided,
  ...mathGuided,
  ...coreMlGuided,
  ...deepLearningGuided,
  ...llmsGuided,
  ...mlopsGuided,
];

/** Guided learn-by-doing problems (hints + worked solution), in lesson order. */
export const ALL_GUIDED: GuidedProblem[] = ALL_LESSONS.flatMap((lesson) =>
  GUIDED_POOL.filter((g) => g.lessonId === lesson.id),
);

export function getGuidedProblems(lessonId?: string): GuidedProblem[] {
  return lessonId
    ? ALL_GUIDED.filter((g) => g.lessonId === lessonId)
    : ALL_GUIDED;
}