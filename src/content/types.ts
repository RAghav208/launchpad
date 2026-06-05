export type LessonBlock =
  | { kind: "heading"; text: string }
  | { kind: "prose"; text: string }
  | { kind: "code"; lang: "python" | "text"; code: string; caption?: string }
  | { kind: "callout"; tone: "tip" | "note" | "warn"; text: string }
  | { kind: "keypoints"; points: string[] }
  | { kind: "practice"; text: string; items?: string[] };

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  blocks: LessonBlock[];
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Track = {
  id: string;
  title: string;
  modules: Module[];
};

/** Spaced-repetition review items. `id` is the stable srs_cards.card_id. */
export type Flashcard = {
  id: string;
  lessonId: string;
  front: string;
  back: string;
};

export type PredictOutput = {
  id: string;
  lessonId: string;
  code: string;
  options: string[];
  answer: number; // index into options
  explanation: string;
};

export type ReviewItem =
  | ({ type: "flashcard" } & Flashcard)
  | ({ type: "predict" } & PredictOutput);

/** A learn-by-doing exercise: a task, a ladder of hints, and a worked solution. */
export type GuidedProblem = {
  id: string;
  lessonId: string;
  title: string;
  prompt: string;
  hints: string[];
  solution: LessonBlock[];
};