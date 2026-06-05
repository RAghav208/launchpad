import type { Track, Flashcard, PredictOutput } from "@/content/types";

export const graphsDpTrack: Track = {
  id: "cs-graphs-dp",
  title: "Graphs, Recursion & DP",
  modules: [
    {
      id: "cs-recursion-graphs",
      title: "Recursion & graphs",
      lessons: [
        {
          id: "recursion",
          title: "Recursion",
          summary: "A function that solves a problem by calling itself.",
          blocks: [
            { kind: "prose", text: "Recursion is a function that solves a problem by calling itself on a smaller piece of it. It feels strange at first, then becomes one of your sharpest tools, especially for trees and graphs." },
            { kind: "heading", text: "Base case and recursive case" },
            { kind: "prose", text: "Every recursive function needs two parts: a *base case* that returns an answer without recursing (so it stops), and a *recursive case* that calls itself on something smaller, moving toward the base case." },
            { kind: "code", lang: "python", code: "def factorial(n):\n    if n <= 1:                  # base case: stop here\n        return 1\n    return n * factorial(n - 1)  # recursive case: a smaller problem" },
            { kind: "heading", text: "How the calls stack up" },
            { kind: "prose", text: "Each call pauses and waits for the smaller call beneath it to finish, then the results multiply back up the chain." },
            { kind: "code", lang: "python", code: "# factorial(3)\n# = 3 * factorial(2)\n# = 3 * (2 * factorial(1))\n# = 3 * (2 * 1)\n# = 6" },
            { kind: "heading", text: "A list example" },
            { kind: "prose", text: "The pattern is always the same: handle the empty/smallest case, otherwise combine the first piece with the recursive result of the rest." },
            { kind: "code", lang: "python", code: "def total(nums):\n    if not nums:                 # base case: empty list sums to 0\n        return 0\n    return nums[0] + total(nums[1:])\n\nprint(total([1, 2, 3]))   # 6" },
            { kind: "callout", tone: "warn", text: "If the base case is missing or never reached, the function calls itself forever and Python raises RecursionError. Always make each call move toward the base case." },
            { kind: "keypoints", points: ["A base case returns without recursing (it stops)", "A recursive case calls itself on something smaller", "Each call waits for the one beneath it, then results unwind", "Recursion suits trees, graphs, and divide-and-conquer", "No reachable base case -> RecursionError"] },
            { kind: "practice", text: "Write recursive functions:", items: ["`total(nums)` that sums a list (base case: the empty list).", "`countdown(n)` that prints n, n-1, ... down to 1.", "On paper, trace `factorial(4)` the way the lesson traced `factorial(3)`.", "Stretch: `reverse(s)` that reverses a string recursively."] },
          ],
        },
        {
          id: "graphs",
          title: "Graphs & traversal",
          summary: "Nodes and edges, explored breadth-first or depth-first.",
          blocks: [
            { kind: "prose", text: "A graph is nodes joined by edges: maps, social networks, package dependencies, web links. Almost every graph problem starts with one skill: visiting every node without getting lost." },
            { kind: "heading", text: "Representing a graph" },
            { kind: "prose", text: "The common representation is an *adjacency list*: a dict mapping each node to the list of nodes it connects to." },
            { kind: "code", lang: "python", code: 'graph = {\n    "A": ["B", "C"],\n    "B": ["D"],\n    "C": ["D"],\n    "D": [],\n}' },
            { kind: "heading", text: "Breadth-first search (BFS)" },
            { kind: "prose", text: "BFS explores in rings outward from the start, using a queue. In an unweighted graph it naturally finds the shortest path (fewest edges)." },
            { kind: "code", lang: "python", code: 'from collections import deque\n\ndef bfs(start):\n    seen = {start}\n    queue = deque([start])\n    while queue:\n        node = queue.popleft()\n        print(node)\n        for nxt in graph[node]:\n            if nxt not in seen:\n                seen.add(nxt)\n                queue.append(nxt)\n\nbfs("A")   # A B C D' },
            { kind: "heading", text: "Depth-first search (DFS)" },
            { kind: "prose", text: "DFS goes as deep as possible down one path before backing up. It is naturally recursive (or uses a stack)." },
            { kind: "code", lang: "python", code: "def dfs(node, seen=None):\n    if seen is None:\n        seen = set()\n    if node in seen:\n        return\n    seen.add(node)\n    print(node)\n    for nxt in graph[node]:\n        dfs(nxt, seen)" },
            { kind: "callout", tone: "warn", text: "Always track a `seen` set. Graphs can contain cycles, and without it BFS and DFS will loop forever revisiting the same nodes." },
            { kind: "keypoints", points: ["Represent a graph as an adjacency list (`dict` of neighbours)", "BFS uses a queue, explores level by level, finds shortest paths", "DFS uses recursion or a stack, goes deep first", "Always keep a `seen` set to avoid cycles", "Most graph problems build on BFS or DFS"] },
            { kind: "practice", text: "Traverse the graph:", items: ["Run `bfs(\"A\")` on paper and write the visiting order.", "Run `dfs(\"A\")` on paper. How does the order differ from BFS?", "Explain why the `seen` set is essential if the graph has a cycle.", "Stretch: modify BFS to also record how many steps each node is from the start."] },
          ],
        },
      ],
    },
    {
      id: "cs-dp",
      title: "Dynamic programming",
      lessons: [
        {
          id: "dp-intro",
          title: "Dynamic programming",
          summary: "Speed up recursion by caching overlapping subproblems.",
          blocks: [
            { kind: "prose", text: "Dynamic programming sounds intimidating but the idea is simple: do not solve the same subproblem twice. Remember answers you have already computed." },
            { kind: "heading", text: "The problem: recomputation" },
            { kind: "prose", text: "Naive recursive Fibonacci recomputes the same values an exponential number of times. `fib(50)` is effectively hopeless." },
            { kind: "code", lang: "python", code: "def fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n# fib(5) recomputes fib(2) three times; the work explodes" },
            { kind: "heading", text: "Memoization (top-down)" },
            { kind: "prose", text: "Keep the recursion, but cache each result the first time you compute it. The next time, you look it up instead of recomputing." },
            { kind: "code", lang: "python", code: "def fib(n, memo=None):\n    if memo is None:\n        memo = {}\n    if n < 2:\n        return n\n    if n not in memo:\n        memo[n] = fib(n - 1, memo) + fib(n - 2, memo)\n    return memo[n]\n\nprint(fib(50))   # instant" },
            { kind: "heading", text: "Tabulation (bottom-up)" },
            { kind: "prose", text: "The other style drops recursion entirely: build a table from the smallest cases upward until you reach the answer." },
            { kind: "code", lang: "python", code: "def fib(n):\n    table = [0, 1]\n    for i in range(2, n + 1):\n        table.append(table[i - 1] + table[i - 2])\n    return table[n]" },
            { kind: "callout", tone: "tip", text: "Reach for DP when a problem has overlapping subproblems and its answer builds from the answers to smaller versions. Both fib styles turn exponential work into O(n)." },
            { kind: "keypoints", points: ["DP avoids solving the same subproblem twice", "It applies when subproblems overlap and answers build from smaller ones", "Memoization = top-down recursion with a cache", "Tabulation = bottom-up, fill a table iteratively", "Both turn exponential recomputation into `O(n)`"] },
            { kind: "practice", text: "Explore DP:", items: ["Add a counter to the naive `fib` to count calls for `fib(10)`.", "Do the same with the memoized version and compare the counts.", "Trace the tabulation version filling its table for `fib(6)`.", "Stretch: write a memoized function for the number of ways to climb n stairs taking 1 or 2 steps."] },
          ],
        },
      ],
    },
  ],
};

export const graphsDpFlashcards: Flashcard[] = [
  { id: "recursion-fc-1", lessonId: "recursion", front: "Two parts every recursive function needs?", back: "A base case that stops the recursion, and a recursive case that moves toward it." },
  { id: "recursion-fc-2", lessonId: "recursion", front: "What happens if a recursion never reaches its base case?", back: "It recurses forever and Python raises RecursionError (the call stack overflows)." },
  { id: "graphs-fc-1", lessonId: "graphs", front: "Common way to represent a graph in code?", back: "An adjacency list: a `dict` mapping each node to a list of its neighbours." },
  { id: "graphs-fc-2", lessonId: "graphs", front: "BFS vs DFS — data structures and behaviour?", back: "BFS uses a queue and explores level by level; DFS uses a stack or recursion and goes deep first." },
  { id: "dp-intro-fc-1", lessonId: "dp-intro", front: "When does dynamic programming help?", back: "When a problem has overlapping subproblems you would otherwise recompute. Cache the results." },
  { id: "dp-intro-fc-2", lessonId: "dp-intro", front: "Memoization vs tabulation?", back: "Memoization is top-down recursion with a cache; tabulation is bottom-up, filling a table iteratively." },
];

export const graphsDpPredict: PredictOutput[] = [
  { id: "recursion-po-1", lessonId: "recursion", code: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(4))", options: ["24", "12", "4", "256"], answer: 0, explanation: "4 * 3 * 2 * 1 = 24. Each call multiplies n by the factorial of n-1 until the base case." },
  { id: "graphs-po-1", lessonId: "graphs", code: 'from collections import deque\n\ngraph = {"A": ["B", "C"], "B": [], "C": []}\norder = []\nq = deque(["A"])\nseen = {"A"}\nwhile q:\n    n = q.popleft()\n    order.append(n)\n    for m in graph[n]:\n        if m not in seen:\n            seen.add(m)\n            q.append(m)\nprint(order)', options: ["['A', 'B', 'C']", "['A', 'C', 'B']", "['B', 'C', 'A']", "['A']"], answer: 0, explanation: "BFS dequeues A first, enqueues its neighbours B then C, and visits them in that order." },
  { id: "dp-intro-po-1", lessonId: "dp-intro", code: "def fib(n, memo=None):\n    if memo is None:\n        memo = {}\n    if n < 2:\n        return n\n    if n not in memo:\n        memo[n] = fib(n - 1, memo) + fib(n - 2, memo)\n    return memo[n]\n\nprint(fib(7))", options: ["13", "8", "21", "7"], answer: 0, explanation: "The sequence is 0,1,1,2,3,5,8,13 — so fib(7) is 13." },
];