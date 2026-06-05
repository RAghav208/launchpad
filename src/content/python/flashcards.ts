import type { Flashcard } from "@/content/types";

export const pythonFlashcards: Flashcard[] = [
  { id: "py-vars-fc-1", lessonId: "py-vars", front: "How do you create a variable in Python?", back: "Assign a value with `=`, e.g. `age = 36`. No type declaration — Python infers the type." },
  { id: "py-vars-fc-2", lessonId: "py-vars", front: "Name Python's four core basic types.", back: "`str` (text), `int` (whole number), `float` (decimal), `bool` (True / False)." },
  { id: "py-vars-fc-3", lessonId: "py-vars", front: "Can a variable change type after it is created?", back: "Yes. Python is dynamically typed, so the same name can point to a `str` now and an `int` later." },

  { id: "py-ops-fc-1", lessonId: "py-ops", front: "Difference between `/`, `//`, and `%`?", back: "`/` true division → float; `//` floor division → drops the fraction; `%` gives the remainder." },
  { id: "py-ops-fc-2", lessonId: "py-ops", front: "Difference between `=` and `==`?", back: "`=` assigns a value to a variable; `==` compares two values and returns a bool." },
  { id: "py-ops-fc-3", lessonId: "py-ops", front: "What is `7 % 3`, and what is `%` good for?", back: "`1`, the remainder. `%` is handy for even/odd checks and wrapping values around." },

  { id: "py-io-fc-1", lessonId: "py-io", front: "What type does `input()` return, and why does it matter?", back: "Always a `str`. Convert with `int()` / `float()` before doing math, or you'll get an error." },
  { id: "py-io-fc-2", lessonId: "py-io", front: "What is an f-string?", back: "A string prefixed with `f` where `{}` embeds values, e.g. `f\"Hi {name}\"`." },
  { id: "py-io-fc-3", lessonId: "py-io", front: "What does `\"5\" + \"5\"` produce?", back: "`\"55\"`. The `+` joins two strings; it does not add numbers." },

  { id: "py-cond-fc-1", lessonId: "py-cond", front: "What do `if`, `elif`, `else` do?", back: "`if` runs when its condition is True; `elif` checks another condition if earlier ones were False; `else` runs when none matched." },
  { id: "py-cond-fc-2", lessonId: "py-cond", front: "How is a code block defined in Python?", back: "By indentation (4 spaces by convention) — not braces. Consistent indentation is required." },
  { id: "py-cond-fc-3", lessonId: "py-cond", front: "In an if/elif/elif chain, how many branches run?", back: "At most one: the first whose condition is `True`. The rest are skipped." },

  { id: "py-loops-fc-1", lessonId: "py-loops", front: "When do you use `for` vs `while`?", back: "`for` to iterate a known sequence/count; `while` to repeat until a condition changes." },
  { id: "py-loops-fc-2", lessonId: "py-loops", front: "What do `break` and `continue` do?", back: "`break` exits the loop entirely; `continue` skips to the next iteration." },
  { id: "py-loops-fc-3", lessonId: "py-loops", front: "What does `range(3)` produce?", back: "The numbers 0, 1, 2 (0 up to but not including 3)." },

  { id: "py-funcs-fc-1", lessonId: "py-funcs", front: "How do you define a function and return a value?", back: "`def name(params):` then `return value`. With no `return`, it yields `None`." },
  { id: "py-funcs-fc-2", lessonId: "py-funcs", front: "What is a default parameter?", back: "A parameter with a fallback value, e.g. `def power(base, exp=2)`. Omitting it uses the default." },

  { id: "py-lists-fc-1", lessonId: "py-lists", front: "How do you access the last item of a list `xs`?", back: "`xs[-1]` — negative indexes count from the end." },
  { id: "py-lists-fc-2", lessonId: "py-lists", front: "What does the slice `xs[1:3]` return?", back: "A new list with items at indexes 1 and 2 (stop index 3 excluded)." },
  { id: "py-lists-fc-3", lessonId: "py-lists", front: "How do you add an item to the end of a list?", back: "`xs.append(item)`." },

  { id: "py-strings-fc-1", lessonId: "py-strings", front: "Are Python strings mutable?", back: "No — strings are immutable. Methods like `.upper()` / `.strip()` return a NEW string." },
  { id: "py-strings-fc-2", lessonId: "py-strings", front: "What does `\"a,b,c\".split(\",\")` return?", back: "The list `['a', 'b', 'c']`." },

  { id: "py-dicts-fc-1", lessonId: "py-dicts", front: "How do you read and add values in a dict `d`?", back: "Read with `d[key]`; add/update with `d[key] = value`." },
  { id: "py-dicts-fc-2", lessonId: "py-dicts", front: "What's a `set` good for?", back: "Unique items and fast membership tests (`x in s`). Order isn't guaranteed." },
  { id: "py-dicts-fc-3", lessonId: "py-dicts", front: "How is a tuple different from a list?", back: "A tuple is immutable; written with parentheses `(a, b)`." },

  { id: "py-compr-fc-1", lessonId: "py-compr", front: "Write the shape of a list comprehension with a filter.", back: "`[expr for x in seq if condition]`." },

  { id: "py-errors-fc-1", lessonId: "py-errors", front: "How do you read a Python traceback?", back: "Bottom-up — the last line names the error type and message." },
  { id: "py-errors-fc-2", lessonId: "py-errors", front: "What does `try` / `except` do?", back: "Runs risky code in `try`; if a matching error is raised, `except` handles it instead of crashing." },
];
