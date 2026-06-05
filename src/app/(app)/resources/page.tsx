import { Card, MetaLabel } from "@/components/ui/card";

type Resource = { name: string; by?: string; href: string; note: string };

const GROUPS: { title: string; items: Resource[] }[] = [
  {
    title: "Roadmaps & curricula",
    items: [
      {
        name: "Coding Interview University",
        by: "jwasham",
        href: "https://github.com/jwasham/coding-interview-university",
        note: "The CS-from-scratch interview curriculum the DSA phases are sequenced after.",
      },
      {
        name: "Tech Interview Handbook",
        href: "https://www.techinterviewhandbook.org/",
        note: "Concise, practical prep with a focused study plan and cheatsheets.",
      },
      {
        name: "roadmap.sh — AI & Data Scientist",
        href: "https://roadmap.sh/ai-data-scientist",
        note: "Visual skill tree for the AI / ML career path.",
      },
    ],
  },
  {
    title: "AI & Machine Learning",
    items: [
      {
        name: "Machine Learning Course With Python",
        by: "Siddhardhan",
        href: "https://www.youtube.com/playlist?list=PLfFghEzKVmjsNtIRwErklMAN8nJmebB0I",
        note: "The rigorous, build-from-scratch ML course the ML phases follow video by video.",
      },
      {
        name: "Machine Learning Specialization",
        by: "Andrew Ng, DeepLearning.AI",
        href: "https://www.coursera.org/specializations/machine-learning-introduction",
        note: "The classic foundational ML course; gold standard for the fundamentals.",
      },
      {
        name: "Essence of Linear Algebra",
        by: "3Blue1Brown",
        href: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
        note: "Visual intuition for the math behind ML. Pair it with the math phase.",
      },
      {
        name: "StatQuest",
        by: "Josh Starmer",
        href: "https://www.youtube.com/@statquest",
        note: "ML and statistics explained clearly, one concept at a time.",
      },
      {
        name: "scikit-learn user guide",
        href: "https://scikit-learn.org/stable/user_guide.html",
        note: "The reference for classical machine learning in Python.",
      },
      {
        name: "Kaggle",
        href: "https://www.kaggle.com/",
        note: "Datasets, competitions, and free micro-courses to practice on real data.",
      },
      {
        name: "Practical Deep Learning",
        by: "fast.ai",
        href: "https://course.fast.ai/",
        note: "Hands-on, top-down deep learning once you reach the DL phase.",
      },
      {
        name: "Hugging Face — Learn",
        href: "https://huggingface.co/learn",
        note: "Courses and tools for LLMs, transformers, and modern AI.",
      },
    ],
  },
  {
    title: "Learn Python",
    items: [
      {
        name: "Python official tutorial",
        href: "https://docs.python.org/3/tutorial/",
        note: "The authoritative starting point, straight from the source.",
      },
      {
        name: "Automate the Boring Stuff",
        by: "Al Sweigart",
        href: "https://automatetheboringstuff.com/",
        note: "Free, beginner-friendly, project-based Python.",
      },
      {
        name: "Real Python",
        href: "https://realpython.com/",
        note: "Deep, readable tutorials once you're past the basics.",
      },
    ],
  },
  {
    title: "Data structures & algorithms",
    items: [
      {
        name: "NeetCode",
        href: "https://neetcode.io/",
        note: "Pattern-based problem roadmap with clear video solutions.",
      },
      {
        name: "VisuAlgo",
        href: "https://visualgo.net/en",
        note: "Animated visualizations of data structures and algorithms.",
      },
      {
        name: "Big-O Cheat Sheet",
        href: "https://www.bigocheatsheet.com/",
        note: "Quick complexity reference for common operations.",
      },
    ],
  },
  {
    title: "Practice problems",
    items: [
      {
        name: "LeetCode",
        href: "https://leetcode.com/",
        note: "Start Easy, then work the NeetCode 150 list.",
      },
      {
        name: "Codewars",
        href: "https://www.codewars.com/",
        note: "Bite-size katas for daily reps.",
      },
      {
        name: "Exercism — Python track",
        href: "https://exercism.org/tracks/python",
        note: "Mentored exercises with real feedback.",
      },
    ],
  },
  {
    title: "Mock interviews",
    items: [
      {
        name: "Pramp",
        href: "https://www.pramp.com/",
        note: "Free peer-to-peer mock interviews.",
      },
      {
        name: "interviewing.io",
        href: "https://interviewing.io/",
        note: "Practice with engineers, anonymously.",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Resources
        </h1>
        <p className="mt-1 text-sm text-muted">
          Hand-picked places to learn, visualize, and practice. Links open in a
          new tab.
        </p>
      </div>

      {GROUPS.map((group) => (
        <Card key={group.title}>
          <MetaLabel>{group.title}</MetaLabel>
          <ul className="mt-1 flex flex-col divide-y divide-border">
            {group.items.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 py-3"
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="text-sm font-medium text-fg underline-offset-4 group-hover:underline">
                        {r.name}
                      </span>
                      {r.by ? (
                        <span className="font-mono text-[11.5px] text-faint">
                          {r.by}
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-muted">
                      {r.note}
                    </span>
                  </span>
                  <span className="shrink-0 pt-0.5 font-mono text-xs text-faint transition-colors group-hover:text-fg">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}