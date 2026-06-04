export type RoadmapTask = { id: string; label: string };
export type RoadmapWeek = { id: string; title: string; tasks: RoadmapTask[] };
export type RoadmapPhase = {
  id: string;
  title: string;
  subtitle: string;
  weeks: RoadmapWeek[];
};

// The user's tailored, near-beginner 12-week plan (mirrors 00-roadmap/study-roadmap.md).
// Task ids are STABLE — they are the primary key in roadmap_progress.
export const ROADMAP: RoadmapPhase[] = [
  {
    id: "p0",
    title: "Phase 0 · Python Foundations",
    subtitle: "Weeks 1–3 · get genuinely comfortable writing code",
    weeks: [
      {
        id: "p0-w1",
        title: "Week 1 — Absolute basics",
        tasks: [
          { id: "p0-w1-t1", label: "Set up Python + an editor (VS Code)" },
          { id: "p0-w1-t2", label: "Variables, data types, operators, input/output" },
          { id: "p0-w1-t3", label: "Conditionals (if / elif / else)" },
          { id: "p0-w1-t4", label: "Write 5–10 tiny programs" },
        ],
      },
      {
        id: "p0-w2",
        title: "Week 2 — The workhorses",
        tasks: [
          { id: "p0-w2-t1", label: "Loops (for, while) and when to use each" },
          { id: "p0-w2-t2", label: "Functions — inputs, outputs, why they matter" },
          { id: "p0-w2-t3", label: "Lists and strings" },
          { id: "p0-w2-t4", label: "Read errors and debug" },
        ],
      },
      {
        id: "p0-w3",
        title: "Week 3 — Data & a mini-project",
        tasks: [
          { id: "p0-w3-t1", label: "Dictionaries, sets, tuples" },
          { id: "p0-w3-t2", label: "Nested data + comprehensions" },
          { id: "p0-w3-t3", label: "Mini-capstone: a small CLI program" },
          { id: "p0-w3-t4", label: "Resume v1 rough draft" },
        ],
      },
    ],
  },
  {
    id: "p1",
    title: "Phase 1 · Problem-Solving On-Ramp",
    subtitle: "Weeks 4–5 · bridge gently into DSA",
    weeks: [
      {
        id: "p1-w4",
        title: "Week 4",
        tasks: [
          { id: "p1-w4-t1", label: "Big-O intuition (no scary math)" },
          { id: "p1-w4-t2", label: "Arrays & Hashing — 4–5 easy problems" },
          { id: "p1-w4-t3", label: "Learn the loop: read → plan → code → test" },
        ],
      },
      {
        id: "p1-w5",
        title: "Week 5",
        tasks: [
          { id: "p1-w5-t1", label: "Two Pointers — 4–5 easy problems" },
          { id: "p1-w5-t2", label: "Start narrating your solutions out loud" },
        ],
      },
    ],
  },
  {
    id: "p2",
    title: "Phase 2 · Core DSA Patterns",
    subtitle: "Weeks 6–9 · the bread-and-butter patterns",
    weeks: [
      {
        id: "p2-w6",
        title: "Week 6",
        tasks: [
          { id: "p2-w6-t1", label: "Sliding Window" },
          { id: "p2-w6-t2", label: "Stack" },
        ],
      },
      {
        id: "p2-w7",
        title: "Week 7",
        tasks: [
          { id: "p2-w7-t1", label: "Binary Search" },
          { id: "p2-w7-t2", label: "Linked Lists" },
        ],
      },
      {
        id: "p2-w8",
        title: "Week 8",
        tasks: [
          { id: "p2-w8-t1", label: "Trees — intro & traversals" },
          { id: "p2-w8-t2", label: "Start Project 1" },
        ],
      },
      {
        id: "p2-w9",
        title: "Week 9",
        tasks: [
          { id: "p2-w9-t1", label: "Trees — BFS/DFS, BSTs" },
          { id: "p2-w9-t2", label: "Project 1 core functionality working" },
        ],
      },
    ],
  },
  {
    id: "p3",
    title: "Phase 3 · Consolidate + Apply",
    subtitle: "Weeks 10–12 · get into the arena",
    weeks: [
      {
        id: "p3-w10",
        title: "Week 10",
        tasks: [
          { id: "p3-w10-t1", label: "Heaps + Intervals" },
          { id: "p3-w10-t2", label: "Finish & deploy Project 1" },
          { id: "p3-w10-t3", label: "Resume v2" },
        ],
      },
      {
        id: "p3-w11",
        title: "Week 11",
        tasks: [
          { id: "p3-w11-t1", label: "Intro Graphs (BFS/DFS)" },
          { id: "p3-w11-t2", label: "Start your STAR story bank" },
          { id: "p3-w11-t3", label: "First mock interview" },
        ],
      },
      {
        id: "p3-w12",
        title: "Week 12",
        tasks: [
          { id: "p3-w12-t1", label: "Intro 1-D Dynamic Programming" },
          { id: "p3-w12-t2", label: "More mock interviews" },
          { id: "p3-w12-t3", label: "Start applying to roles" },
        ],
      },
    ],
  },
];

export const ALL_ROADMAP_TASK_IDS: string[] = ROADMAP.flatMap((phase) =>
  phase.weeks.flatMap((week) => week.tasks.map((task) => task.id)),
);

export const ROADMAP_TASK_COUNT = ALL_ROADMAP_TASK_IDS.length;
