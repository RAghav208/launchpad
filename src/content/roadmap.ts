export type RoadmapTask = { id: string; label: string };
export type RoadmapWeek = { id: string; title: string; tasks: RoadmapTask[] };
export type RoadmapPhase = {
  id: string;
  title: string;
  subtitle: string;
  weeks: RoadmapWeek[];
};

// Near-beginner 12-week plan, sequenced after "Coding Interview University"
// (github.com/jwasham/coding-interview-university): Big-O -> core data structures
// -> binary search/bitwise -> trees -> sorting -> graphs -> recursion/DP -> review.
// Python foundations come first because CIU assumes you can already code.
// Task ids are STABLE — they are the primary key in roadmap_progress.
export const ROADMAP: RoadmapPhase[] = [
  {
    id: "p0",
    title: "Phase 0 · Python Foundations",
    subtitle: "Weeks 1–3 · get genuinely comfortable writing code first",
    weeks: [
      {
        id: "p0-w1",
        title: "Week 1 — Python basics",
        tasks: [
          { id: "p0-w1-t1", label: "Set up Python + VS Code, run your first script" },
          { id: "p0-w1-t2", label: "Variables, data types, operators, input/output" },
          { id: "p0-w1-t3", label: "Conditionals (if / elif / else)" },
          { id: "p0-w1-t4", label: "Write 5–10 tiny programs" },
        ],
      },
      {
        id: "p0-w2",
        title: "Week 2 — Control flow & functions",
        tasks: [
          { id: "p0-w2-t1", label: "Loops (for, while) and when to use each" },
          { id: "p0-w2-t2", label: "Functions — inputs, outputs, why they matter" },
          { id: "p0-w2-t3", label: "Lists and strings" },
          { id: "p0-w2-t4", label: "Read errors and debug confidently" },
        ],
      },
      {
        id: "p0-w3",
        title: "Week 3 — Data & a mini-project",
        tasks: [
          { id: "p0-w3-t1", label: "Dictionaries, sets, tuples" },
          { id: "p0-w3-t2", label: "Nested data + comprehensions" },
          { id: "p0-w3-t3", label: "Mini-capstone: a small CLI program" },
          { id: "p0-w3-t4", label: "Git & GitHub basics — push your code" },
        ],
      },
    ],
  },
  {
    id: "p1",
    title: "Phase 1 · Big-O & Core Data Structures",
    subtitle: "Weeks 4–6 · the CIU foundation — complexity, arrays, lists, hashing",
    weeks: [
      {
        id: "p1-w4",
        title: "Week 4 — Algorithmic complexity",
        tasks: [
          { id: "p1-w4-t1", label: "Big-O: time & space complexity intuition (no scary math)" },
          { id: "p1-w4-t2", label: "Analyze the cost of your own loops" },
          { id: "p1-w4-t3", label: "Arrays & dynamic arrays — how they grow" },
          { id: "p1-w4-t4", label: "Solve 3–4 easy array problems" },
        ],
      },
      {
        id: "p1-w5",
        title: "Week 5 — Linear structures",
        tasks: [
          { id: "p1-w5-t1", label: "Linked lists (singly & doubly) — build one" },
          { id: "p1-w5-t2", label: "Stacks (LIFO) and when to use them" },
          { id: "p1-w5-t3", label: "Queues (FIFO) and deques" },
          { id: "p1-w5-t4", label: "Solve 3–4 stack/queue problems" },
        ],
      },
      {
        id: "p1-w6",
        title: "Week 6 — Hashing",
        tasks: [
          { id: "p1-w6-t1", label: "Hash tables: how they work, collisions" },
          { id: "p1-w6-t2", label: "Sets & dicts as hash structures" },
          { id: "p1-w6-t3", label: "Arrays & Hashing pattern — 4–5 problems" },
          { id: "p1-w6-t4", label: "Two Pointers — intro + 2–3 problems" },
        ],
      },
    ],
  },
  {
    id: "p2",
    title: "Phase 2 · Search, Trees & Sorting",
    subtitle: "Weeks 7–9 · binary search, bitwise, trees, heaps, the key sorts",
    weeks: [
      {
        id: "p2-w7",
        title: "Week 7 — Search & bits",
        tasks: [
          { id: "p2-w7-t1", label: "Binary search (iterative & recursive)" },
          { id: "p2-w7-t2", label: "Bitwise operations basics" },
          { id: "p2-w7-t3", label: "Sliding Window pattern — 3–4 problems" },
        ],
      },
      {
        id: "p2-w8",
        title: "Week 8 — Trees",
        tasks: [
          { id: "p2-w8-t1", label: "Trees intro + traversals (in/pre/post-order)" },
          { id: "p2-w8-t2", label: "Tree BFS vs DFS" },
          { id: "p2-w8-t3", label: "Binary Search Trees (BSTs)" },
          { id: "p2-w8-t4", label: "Solve 3–4 easy tree problems" },
        ],
      },
      {
        id: "p2-w9",
        title: "Week 9 — Heaps & sorting",
        tasks: [
          { id: "p2-w9-t1", label: "Heap / priority queue" },
          { id: "p2-w9-t2", label: "Merge sort, quick sort, why O(n log n)" },
          { id: "p2-w9-t3", label: "Tries (intro)" },
          { id: "p2-w9-t4", label: "Start Project 1" },
        ],
      },
    ],
  },
  {
    id: "p3",
    title: "Phase 3 · Graphs, DP & Interview Readiness",
    subtitle: "Weeks 10–12 · graphs, gentle DP, then into the arena",
    weeks: [
      {
        id: "p3-w10",
        title: "Week 10 — Graphs & recursion",
        tasks: [
          { id: "p3-w10-t1", label: "Graph representations (adjacency list / matrix)" },
          { id: "p3-w10-t2", label: "Graph BFS & DFS" },
          { id: "p3-w10-t3", label: "Recursion patterns & base cases" },
          { id: "p3-w10-t4", label: "Finish & deploy Project 1" },
        ],
      },
      {
        id: "p3-w11",
        title: "Week 11 — Dynamic programming (gentle)",
        tasks: [
          { id: "p3-w11-t1", label: "Memoization vs tabulation" },
          { id: "p3-w11-t2", label: "1-D dynamic programming, classic easy DP" },
          { id: "p3-w11-t3", label: "Resume v2" },
          { id: "p3-w11-t4", label: "Start your STAR story bank" },
        ],
      },
      {
        id: "p3-w12",
        title: "Week 12 — Final review & the arena",
        tasks: [
          { id: "p3-w12-t1", label: "Mixed problem review (timed)" },
          { id: "p3-w12-t2", label: "First mock interviews — narrate out loud" },
          { id: "p3-w12-t3", label: "Polish GitHub + portfolio" },
          { id: "p3-w12-t4", label: "Start applying to roles" },
        ],
      },
    ],
  },
  {
    id: "p4",
    title: "Phase 4 · Beyond 12 Weeks (optional)",
    subtitle: "CIU's deeper track — pick these up once the core feels solid",
    weeks: [
      {
        id: "p4-sys",
        title: "Systems & design (stretch)",
        tasks: [
          { id: "p4-sys-t1", label: "System design & scalability intro" },
          { id: "p4-sys-t2", label: "Design patterns & OOD basics" },
          { id: "p4-sys-t3", label: "Processes, threads & caches" },
          { id: "p4-sys-t4", label: "Networking basics (HTTP, TCP/IP)" },
        ],
      },
      {
        id: "p4-algo",
        title: "Deeper algorithms (stretch)",
        tasks: [
          { id: "p4-algo-t1", label: "More dynamic programming" },
          { id: "p4-algo-t2", label: "Advanced graphs: Dijkstra, union-find" },
          { id: "p4-algo-t3", label: "Combinatorics & probability" },
          { id: "p4-algo-t4", label: "String searching & manipulation" },
        ],
      },
    ],
  },
  {
    id: "p5",
    title: "Phase 5 · ML Foundations & Data Toolkit",
    subtitle: "AI/ML concepts, NumPy, pandas, and data preprocessing",
    weeks: [
      {
        id: "p5-w1",
        title: "ML fundamentals",
        tasks: [
          { id: "p5-w1-t1", label: "AI vs Machine Learning vs Deep Learning" },
          { id: "p5-w1-t2", label: "Supervised vs unsupervised vs reinforcement learning" },
          { id: "p5-w1-t3", label: "Types of supervised learning" },
          { id: "p5-w1-t4", label: "Unsupervised learning: clustering & association" },
          { id: "p5-w1-t5", label: "What deep learning is (overview)" },
        ],
      },
      {
        id: "p5-w2",
        title: "Data libraries",
        tasks: [
          { id: "p5-w2-t1", label: "NumPy: arrays & vectorized operations" },
          { id: "p5-w2-t2", label: "pandas: DataFrames & data wrangling" },
          { id: "p5-w2-t3", label: "matplotlib: plotting basics" },
          { id: "p5-w2-t4", label: "seaborn: statistical visualization" },
        ],
      },
      {
        id: "p5-w3",
        title: "Data collection & preprocessing",
        tasks: [
          { id: "p5-w3-t1", label: "Collecting data + the Kaggle API" },
          { id: "p5-w3-t2", label: "Handling missing values" },
          { id: "p5-w3-t3", label: "Standardization & feature scaling" },
          { id: "p5-w3-t4", label: "Label encoding categorical data" },
          { id: "p5-w3-t5", label: "Train/test split" },
          { id: "p5-w3-t6", label: "Handling imbalanced datasets" },
          { id: "p5-w3-t7", label: "Text features with TF-IDF" },
        ],
      },
    ],
  },
  {
    id: "p6",
    title: "Phase 6 · Mathematics for ML",
    subtitle: "Linear algebra, statistics, and probability, rigorously",
    weeks: [
      {
        id: "p6-w1",
        title: "Linear algebra",
        tasks: [
          { id: "p6-w1-t1", label: "Vectors & vector operations" },
          { id: "p6-w1-t2", label: "Dot product, cross product, projections" },
          { id: "p6-w1-t3", label: "Matrices & matrix operations" },
          { id: "p6-w1-t4", label: "Linear algebra in Python (NumPy)" },
        ],
      },
      {
        id: "p6-w2",
        title: "Statistics",
        tasks: [
          { id: "p6-w2-t1", label: "Descriptive vs inferential statistics" },
          { id: "p6-w2-t2", label: "Population, sample & sampling" },
          { id: "p6-w2-t3", label: "Central tendency: mean, median, mode" },
          { id: "p6-w2-t4", label: "Variability: range, variance, std dev" },
          { id: "p6-w2-t5", label: "Percentiles, correlation & causation" },
          { id: "p6-w2-t6", label: "Hypothesis testing" },
        ],
      },
      {
        id: "p6-w3",
        title: "Probability",
        tasks: [
          { id: "p6-w3-t1", label: "Probability basics" },
          { id: "p6-w3-t2", label: "Random variables & their types" },
          { id: "p6-w3-t3", label: "Probability distributions" },
          { id: "p6-w3-t4", label: "Normal (Gaussian) distribution" },
          { id: "p6-w3-t5", label: "Poisson distribution" },
        ],
      },
    ],
  },
  {
    id: "p7",
    title: "Phase 7 · Core Machine Learning",
    subtitle: "Model concepts and algorithms, built from scratch",
    weeks: [
      {
        id: "p7-w1",
        title: "Model concepts",
        tasks: [
          { id: "p7-w1-t1", label: "The ML workflow & what a model is" },
          { id: "p7-w1-t2", label: "Model selection & cross-validation" },
          { id: "p7-w1-t3", label: "Overfitting, underfitting & bias-variance" },
          { id: "p7-w1-t4", label: "Loss functions & model evaluation" },
          { id: "p7-w1-t5", label: "Parameters, hyperparameters & gradient descent" },
        ],
      },
      {
        id: "p7-w2",
        title: "Algorithms from scratch",
        tasks: [
          { id: "p7-w2-t1", label: "Linear regression (math + from scratch)" },
          { id: "p7-w2-t2", label: "Logistic regression (math + from scratch)" },
          { id: "p7-w2-t3", label: "Support Vector Machines (kernels, hinge loss)" },
          { id: "p7-w2-t4", label: "Decision trees & random forests" },
          { id: "p7-w2-t5", label: "k-Nearest Neighbors & Naive Bayes" },
          { id: "p7-w2-t6", label: "k-Means clustering & PCA" },
        ],
      },
      {
        id: "p7-w3",
        title: "Practice projects",
        tasks: [
          { id: "p7-w3-t1", label: "Prediction projects (diabetes, house price, spam)" },
          { id: "p7-w3-t2", label: "Customer segmentation with k-means" },
          { id: "p7-w3-t3", label: "scikit-learn end-to-end workflow" },
          { id: "p7-w3-t4", label: "ML interview questions review" },
        ],
      },
    ],
  },
  {
    id: "p8",
    title: "Phase 8 · Deep Learning",
    subtitle: "Neural networks and PyTorch",
    weeks: [
      {
        id: "p8-w1",
        title: "Neural network foundations",
        tasks: [
          { id: "p8-w1-t1", label: "Neurons, layers & activation functions" },
          { id: "p8-w1-t2", label: "Forward pass & loss functions" },
          { id: "p8-w1-t3", label: "Backpropagation & gradient descent (deep)" },
          { id: "p8-w1-t4", label: "Optimizers, epochs, batches, learning rate" },
        ],
      },
      {
        id: "p8-w2",
        title: "PyTorch & architectures",
        tasks: [
          { id: "p8-w2-t1", label: "PyTorch fundamentals (tensors, autograd)" },
          { id: "p8-w2-t2", label: "Build & train a neural network" },
          { id: "p8-w2-t3", label: "CNNs for computer vision" },
          { id: "p8-w2-t4", label: "RNNs / LSTMs for sequences" },
          { id: "p8-w2-t5", label: "Transformers & attention" },
        ],
      },
    ],
  },
  {
    id: "p9",
    title: "Phase 9 · Modern AI & LLMs",
    subtitle: "Generative AI, RAG, and building AI apps",
    weeks: [
      {
        id: "p9-w1",
        title: "Working with LLMs",
        tasks: [
          { id: "p9-w1-t1", label: "How LLMs work (tokens, context, transformers)" },
          { id: "p9-w1-t2", label: "Using LLM APIs & prompt engineering" },
          { id: "p9-w1-t3", label: "Embeddings & semantic search" },
          { id: "p9-w1-t4", label: "Vector databases" },
        ],
      },
      {
        id: "p9-w2",
        title: "Building AI apps",
        tasks: [
          { id: "p9-w2-t1", label: "Retrieval-augmented generation (RAG)" },
          { id: "p9-w2-t2", label: "Fine-tuning vs prompting vs RAG" },
          { id: "p9-w2-t3", label: "AI agents & function calling" },
          { id: "p9-w2-t4", label: "Build & deploy an AI-powered app" },
          { id: "p9-w2-t5", label: "Responsible AI: bias, safety, evaluation" },
        ],
      },
    ],
  },
  {
    id: "p10",
    title: "Phase 10 · MLOps, Projects & Job Readiness",
    subtitle: "Productionize, build a portfolio, and prepare for interviews",
    weeks: [
      {
        id: "p10-w1",
        title: "MLOps & deployment",
        tasks: [
          { id: "p10-w1-t1", label: "Experiment tracking & model versioning" },
          { id: "p10-w1-t2", label: "Serving models as APIs" },
          { id: "p10-w1-t3", label: "Monitoring & data drift" },
          { id: "p10-w1-t4", label: "Data pipelines" },
        ],
      },
      {
        id: "p10-w2",
        title: "Portfolio & interviews",
        tasks: [
          { id: "p10-w2-t1", label: "Complete 2-3 end-to-end ML projects" },
          { id: "p10-w2-t2", label: "Build an LLM-powered capstone" },
          { id: "p10-w2-t3", label: "ML system design basics" },
          { id: "p10-w2-t4", label: "Mock ML interviews & resume polish" },
        ],
      },
    ],
  },
];

export const ALL_ROADMAP_TASK_IDS: string[] = ROADMAP.flatMap((phase) =>
  phase.weeks.flatMap((week) => week.tasks.map((task) => task.id)),
);

export const ROADMAP_TASK_COUNT = ALL_ROADMAP_TASK_IDS.length;