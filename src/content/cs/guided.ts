import type { GuidedProblem } from "@/content/types";

export const csGuided: GuidedProblem[] = [
  {
    id: "bigo-intro-g1",
    lessonId: "bigo-intro",
    title: "Name the Big-O",
    prompt: "Give the Big-O (in terms of n, the list length) for each: (a) reading the first element, (b) printing every element once, (c) printing every possible pair of elements.",
    hints: [
      "A fixed number of steps, regardless of n, is O(1).",
      "One pass over n items is O(n).",
      "A loop inside a loop over n items multiplies to n x n.",
    ],
    solution: [
      { kind: "code", lang: "python", code: "# (a) O(1) - one step no matter how big the list is\nprint(items[0])\n\n# (b) O(n) - one pass\nfor x in items:\n    print(x)\n\n# (c) O(n^2) - a loop inside a loop\nfor a in items:\n    for b in items:\n        print(a, b)" },
      { kind: "prose", text: "(a) `O(1)`, (b) `O(n)`, (c) `O(n^2)`. The shape of the loops tells you the class." },
    ],
  },
  {
    id: "bigo-analyze-g1",
    lessonId: "bigo-analyze",
    title: "Simplify the Big-O",
    prompt: "A function runs three separate single loops over n items, then one nested double loop over n. What is its overall Big-O?",
    hints: [
      "Sequential loops add; nested loops multiply.",
      "Add the pieces, then drop constants and lower-order terms.",
    ],
    solution: [
      { kind: "prose", text: "Three single loops give `O(3n)`; the nested loop gives `O(n^2)`. Total is `O(3n + n^2)`." },
      { kind: "prose", text: "Drop the constant 3 and the smaller `n` term, leaving `O(n^2)`. The nested loop dominates." },
    ],
  },
  {
    id: "arrays-g1",
    lessonId: "arrays",
    title: "Pick the right structure",
    prompt: "You need to repeatedly add items to the FRONT of a collection that holds millions of elements. Why is a Python list a poor choice, and what is better?",
    hints: [
      "Inserting at the front of a list shifts every later element.",
      "You want front operations to be O(1).",
    ],
    solution: [
      { kind: "prose", text: "`list.insert(0, x)` is `O(n)` because every later element shifts right. Doing it millions of times is `O(n^2)` overall." },
      { kind: "code", lang: "python", code: "from collections import deque\nq = deque()\nq.appendleft(1)   # O(1) at the front\nq.append(2)       # O(1) at the back" },
      { kind: "prose", text: "`collections.deque` adds and removes at both ends in `O(1)`." },
    ],
  },
  {
    id: "linked-lists-g1",
    lessonId: "linked-lists",
    title: "Count the nodes",
    prompt: "Given the head of a singly linked list (each Node has .value and .next), write a function that counts how many nodes it has.",
    hints: [
      "Start at the head and follow .next until you reach None.",
      "Keep a counter as you walk.",
    ],
    solution: [
      { kind: "code", lang: "python", code: "def count(head):\n    n = 0\n    node = head\n    while node:\n        n += 1\n        node = node.next\n    return n" },
      { kind: "prose", text: "You must visit every node, so counting is `O(n)`." },
    ],
  },
  {
    id: "stacks-queues-g1",
    lessonId: "stacks-queues",
    title: "Balanced parentheses",
    prompt: "Use a stack to decide whether a string of '(' and ')' is balanced (every opening has a matching closing, in the right order).",
    hints: [
      "Push when you see '(', pop when you see ')'.",
      "If you try to pop an empty stack, or finish with a non-empty stack, it is unbalanced.",
    ],
    solution: [
      { kind: "code", lang: "python", code: 'def balanced(s):\n    stack = []\n    for ch in s:\n        if ch == "(":\n            stack.append(ch)\n        elif ch == ")":\n            if not stack:\n                return False\n            stack.pop()\n    return len(stack) == 0\n\nprint(balanced("(())"))  # True\nprint(balanced("(()"))   # False' },
      { kind: "prose", text: "The stack remembers each unmatched opening; a closing cancels the most recent one (LIFO)." },
    ],
  },
  {
    id: "hash-tables-g1",
    lessonId: "hash-tables",
    title: "Two-sum with a set",
    prompt: "Given a list of numbers and a target, decide whether any two of them add up to the target. Do it in O(n), not O(n^2).",
    hints: [
      "For each number, the partner you need is target - number.",
      "Keep a set of numbers seen so far, and check if the partner is already in it.",
    ],
    solution: [
      { kind: "code", lang: "python", code: "def has_pair(nums, target):\n    seen = set()\n    for n in nums:\n        if target - n in seen:\n            return True\n        seen.add(n)\n    return False\n\nprint(has_pair([2, 7, 4], 11))  # True (4 + 7)" },
      { kind: "prose", text: "Each `in` check on a set is `O(1)`, so the whole scan is `O(n)`, versus `O(n^2)` for checking every pair." },
    ],
  },
  {
    id: "binary-search-g1",
    lessonId: "binary-search",
    title: "Trace binary search",
    prompt: "On the sorted list [2, 4, 6, 8, 10], trace binary search for the value 4: list lo, hi, mid and the comparison at each step until it is found.",
    hints: [
      "Start with lo = 0 and hi = 4.",
      "mid = (lo + hi) // 2; compare the middle value to 4 and discard half.",
    ],
    solution: [
      { kind: "code", lang: "python", code: "# target 4 in [2, 4, 6, 8, 10]\n# lo=0 hi=4 mid=2 -> arr[2]=6 > 4 -> hi=1\n# lo=0 hi=1 mid=0 -> arr[0]=2 < 4 -> lo=1\n# lo=1 hi=1 mid=1 -> arr[1]=4  found at index 1" },
      { kind: "prose", text: "Three comparisons for five items; the search space halves each step (`O(log n)`)." },
    ],
  },
  {
    id: "trees-intro-g1",
    lessonId: "trees-intro",
    title: "In-order by hand",
    prompt: "A binary tree has root 4, with left child 2 (whose children are 1 and 3) and right child 6 (whose children are 5 and 7). Write its in-order traversal.",
    hints: [
      "In-order = traverse the left subtree, visit the node, traverse the right subtree.",
      "Fully finish the left subtree of 4 before visiting 4.",
    ],
    solution: [
      { kind: "prose", text: "In-order gives 1, 2, 3, 4, 5, 6, 7." },
      { kind: "prose", text: "Because this is a binary search tree, in-order traversal comes out in sorted order. That is a property worth remembering." },
    ],
  },
  {
    id: "bst-g1",
    lessonId: "bst",
    title: "Build a BST",
    prompt: "Insert 5, 3, 8, 1, 4 into an empty binary search tree in that order. Describe the tree, then give the in-order traversal.",
    hints: [
      "At each node, smaller values go left, larger go right.",
      "In-order traversal of a BST returns sorted values.",
    ],
    solution: [
      { kind: "prose", text: "5 is the root. 3 goes left of 5; 8 goes right of 5. 1 goes left of 3; 4 goes right of 3." },
      { kind: "prose", text: "In-order: 1, 3, 4, 5, 8 (sorted, as expected for a BST)." },
    ],
  },
  {
    id: "sorting-g1",
    lessonId: "sorting",
    title: "Sort with a key",
    prompt: "Given words = ['banana', 'kiwi', 'apple'], print them sorted by length, then sorted alphabetically.",
    hints: [
      "`sorted(words, key=len)` sorts by length.",
      "`sorted(words)` sorts alphabetically.",
    ],
    solution: [
      { kind: "code", lang: "python", code: 'words = ["banana", "kiwi", "apple"]\nprint(sorted(words, key=len))  # [\'kiwi\', \'apple\', \'banana\']\nprint(sorted(words))           # [\'apple\', \'banana\', \'kiwi\']' },
      { kind: "prose", text: "`sorted` returns a new list and leaves the original untouched; `key=` controls what to sort by." },
    ],
  },
  {
    id: "heaps-g1",
    lessonId: "heaps",
    title: "The two smallest",
    prompt: "Find the two smallest numbers in [7, 3, 9, 1, 5] using a heap.",
    hints: [
      "`heapq.nsmallest(k, data)` returns the k smallest.",
      "Or heapify and heappop twice.",
    ],
    solution: [
      { kind: "code", lang: "python", code: "import heapq\nnums = [7, 3, 9, 1, 5]\nprint(heapq.nsmallest(2, nums))  # [1, 3]" },
      { kind: "prose", text: "A heap gives you the smallest items without fully sorting the list." },
    ],
  },
  {
    id: "recursion-g1",
    lessonId: "recursion",
    title: "Recursive sum",
    prompt: "Write a recursive function total(nums) that sums a list. Name the base case and the recursive case.",
    hints: [
      "Base case: the empty list sums to 0.",
      "Recursive case: the first item plus the total of the rest.",
    ],
    solution: [
      { kind: "code", lang: "python", code: "def total(nums):\n    if not nums:          # base case\n        return 0\n    return nums[0] + total(nums[1:])  # recursive case\n\nprint(total([1, 2, 3]))  # 6" },
      { kind: "prose", text: "Each call shrinks the list by one until it is empty, then the results add back up." },
    ],
  },
  {
    id: "graphs-g1",
    lessonId: "graphs",
    title: "BFS order",
    prompt: "For graph {A: [B, C], B: [D], C: [D], D: []}, give the BFS visiting order from A, and explain why a 'seen' set is needed.",
    hints: [
      "BFS uses a queue and visits level by level.",
      "Both B and C point to D.",
    ],
    solution: [
      { kind: "prose", text: "Order: A, B, C, D." },
      { kind: "prose", text: "D is reachable from both B and C. Without a `seen` set it would be enqueued twice, and on a graph with cycles the traversal could loop forever." },
    ],
  },
  {
    id: "dp-intro-g1",
    lessonId: "dp-intro",
    title: "Memoize Fibonacci",
    prompt: "Naive recursive fib(n) is exponential. Add memoization so each value is computed once, and say why it is faster.",
    hints: [
      "Cache results in a dict keyed by n.",
      "Look up the cache before recomputing.",
    ],
    solution: [
      { kind: "code", lang: "python", code: "def fib(n, memo=None):\n    if memo is None:\n        memo = {}\n    if n < 2:\n        return n\n    if n not in memo:\n        memo[n] = fib(n - 1, memo) + fib(n - 2, memo)\n    return memo[n]" },
      { kind: "prose", text: "Without the cache, fib branches into two calls every time: `O(2^n)`. Caching means each fib(k) is computed once, so it drops to `O(n)`." },
    ],
  },
];