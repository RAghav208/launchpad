import type { GuidedProblem } from "@/content/types";

export const pythonGuided: GuidedProblem[] = [
  {
    id: "py-vars-g1",
    lessonId: "py-vars",
    title: "Describe yourself in variables",
    prompt: "Create three variables: your name (text), your age (a whole number), and your height in metres (a decimal). Print one sentence using an f-string, then print the type of each variable.",
    hints: [
      "Assign with `=`. Text needs quotes; a decimal like 1.75 is a float.",
      "An f-string is `f\"...{name}...\"` and can hold several values at once.",
      "`type(age)` returns the type. Print all three: `print(type(name), type(age), type(height))`.",
    ],
    solution: [
      { kind: "prose", text: "Pick a value of the right kind for each variable, then drop them into an f-string." },
      { kind: "code", lang: "python", code: 'name = "Ada"\nage = 36\nheight = 1.75\nprint(f"{name} is {age} and {height}m tall")\nprint(type(name), type(age), type(height))' },
      { kind: "prose", text: "`name` is a `str`, `age` an `int`, `height` a `float`. Python infers each type straight from the value you assigned." },
    ],
  },
  {
    id: "py-ops-g1",
    lessonId: "py-ops",
    title: "Whole weeks, and even or odd",
    prompt: "Given `days = 100`, print how many whole weeks it contains, then print whether `days` is even.",
    hints: [
      "`//` gives whole groups (floor division).",
      "A number is even when `n % 2 == 0`, which evaluates to a bool.",
    ],
    solution: [
      { kind: "code", lang: "python", code: "days = 100\nprint(days // 7)        # 14 whole weeks\nprint(days % 2 == 0)    # True -> even" },
      { kind: "prose", text: "`//` throws away the remainder to give whole weeks; `%` keeps the remainder, and comparing it to 0 answers even-or-odd." },
    ],
  },
  {
    id: "py-io-g1",
    lessonId: "py-io",
    title: "Add two numbers from the user",
    prompt: "Ask the user for two numbers and print their sum. Make sure it adds them as numbers, not as text.",
    hints: [
      "`input()` returns a `str`, so wrap each one in `int()`.",
      "Add the two converted values and print the result.",
    ],
    solution: [
      { kind: "code", lang: "python", code: 'a = int(input("First number: "))\nb = int(input("Second number: "))\nprint(f"Sum: {a + b}")' },
      { kind: "callout", tone: "warn", text: "Without the int() calls you would be joining strings: \"5\" + \"5\" gives \"55\", not 10." },
    ],
  },
  {
    id: "py-cond-g1",
    lessonId: "py-cond",
    title: "Grade a score",
    prompt: "Read a score from 0 to 100 and print a grade: A for 90+, B for 80+, C for 60+, otherwise Fail.",
    hints: [
      "Check the highest threshold first.",
      "`elif` is only checked when the earlier conditions were False, so order matters.",
    ],
    solution: [
      { kind: "code", lang: "python", code: 'score = int(input("Score: "))\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelif score >= 60:\n    print("C")\nelse:\n    print("Fail")' },
      { kind: "prose", text: "Because the first matching branch wins, checking from highest to lowest keeps the logic simple." },
    ],
  },
  {
    id: "py-loops-g1",
    lessonId: "py-loops",
    title: "Sum 1 to 100",
    prompt: "Use a loop to add up the numbers 1 through 100, then print the total.",
    hints: [
      "`range(1, 101)` gives 1 up to and including 100.",
      "Keep a running `total`, adding each number as you go.",
    ],
    solution: [
      { kind: "code", lang: "python", code: "total = 0\nfor n in range(1, 101):\n    total += n\nprint(total)   # 5050" },
      { kind: "prose", text: "`total += n` is shorthand for `total = total + n`. After the loop, total holds the full sum." },
    ],
  },
  {
    id: "py-funcs-g1",
    lessonId: "py-funcs",
    title: "Write is_even and use it",
    prompt: "Write a function `is_even(n)` that returns True or False, then use it to print the even numbers from 1 to 10.",
    hints: [
      "Return the expression `n % 2 == 0` directly.",
      "Loop 1 to 10 and print n when `is_even(n)` is True.",
    ],
    solution: [
      { kind: "code", lang: "python", code: "def is_even(n):\n    return n % 2 == 0\n\nfor n in range(1, 11):\n    if is_even(n):\n        print(n)   # 2 4 6 8 10" },
      { kind: "prose", text: "The function returns a bool, so it reads naturally inside the `if`." },
    ],
  },
  {
    id: "py-lists-g1",
    lessonId: "py-lists",
    title: "Slice and grow a list",
    prompt: "Given a list of 5 numbers, print the last three with a slice, then append a 6th number and print the new length.",
    hints: [
      "A negative slice `xs[-3:]` takes the last three items.",
      "`xs.append(x)` adds to the end; `len(xs)` gives the count.",
    ],
    solution: [
      { kind: "code", lang: "python", code: "xs = [10, 20, 30, 40, 50]\nprint(xs[-3:])    # [30, 40, 50]\nxs.append(60)\nprint(len(xs))    # 6" },
      { kind: "prose", text: "Slicing returns a new list and leaves the original alone; append changes the list in place." },
    ],
  },
  {
    id: "py-strings-g1",
    lessonId: "py-strings",
    title: "Clean up a messy name",
    prompt: "Given `raw = '  aDA  '`, print it trimmed of spaces and capitalised (first letter upper, the rest lower).",
    hints: [
      "`.strip()` removes the surrounding spaces.",
      "`.capitalize()` upper-cases the first letter and lower-cases the rest. Methods chain.",
    ],
    solution: [
      { kind: "code", lang: "python", code: 'raw = "  aDA  "\nprint(raw.strip().capitalize())   # "Ada"' },
      { kind: "prose", text: "Each method returns a new string, so you can chain `.strip()` then `.capitalize()` in one line." },
    ],
  },
  {
    id: "py-dicts-g1",
    lessonId: "py-dicts",
    title: "Count the letters",
    prompt: "Count how many times each letter appears in the word 'banana' and print the resulting dictionary.",
    hints: [
      "Loop over the characters of the string.",
      "Use `counts.get(ch, 0) + 1` so a letter you have not seen starts at 0.",
    ],
    solution: [
      { kind: "code", lang: "python", code: 'counts = {}\nfor ch in "banana":\n    counts[ch] = counts.get(ch, 0) + 1\nprint(counts)   # {\'b\': 1, \'a\': 3, \'n\': 2}' },
      { kind: "prose", text: "`.get(ch, 0)` avoids a KeyError on the first time you meet a letter, which is the heart of the counting pattern." },
    ],
  },
  {
    id: "py-compr-g1",
    lessonId: "py-compr",
    title: "Squares of the evens",
    prompt: "Using a single list comprehension, build the squares of the even numbers from 1 to 20.",
    hints: [
      "Filter the evens with `if n % 2 == 0`.",
      "Square each kept value with `n * n`.",
    ],
    solution: [
      { kind: "code", lang: "python", code: "result = [n * n for n in range(1, 21) if n % 2 == 0]\nprint(result)   # [4, 16, 36, 64, 100, 144, 196, 256, 324, 400]" },
      { kind: "prose", text: "The filter runs first to keep evens, then the expression squares each survivor, all in one readable line." },
    ],
  },
  {
    id: "py-errors-g1",
    lessonId: "py-errors",
    title: "Read a number safely",
    prompt: "Read a number with int(input()), but if the user types something invalid, print 'Please enter a whole number.' instead of crashing.",
    hints: [
      "Put the risky conversion inside a `try` block.",
      "Catch the specific `ValueError` in an `except` block.",
    ],
    solution: [
      { kind: "code", lang: "python", code: 'try:\n    n = int(input("Number: "))\n    print(n + 1)\nexcept ValueError:\n    print("Please enter a whole number.")' },
      { kind: "prose", text: "`int(\"abc\")` raises ValueError. Catching that one type handles bad input while letting other, unexpected errors still surface." },
    ],
  },
];