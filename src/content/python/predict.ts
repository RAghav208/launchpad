import type { PredictOutput } from "@/content/types";

export const pythonPredict: PredictOutput[] = [
  { id: "py-vars-po-1", lessonId: "py-vars", code: 'x = 5\nx = "five"\nprint(type(x))', options: ["<class 'str'>", "<class 'int'>", "Error", "5"], answer: 0, explanation: "x was reassigned to a string, so its type is now str. In Python the type follows the value, not the name." },
  { id: "py-vars-po-2", lessonId: "py-vars", code: "x = 5\nx = x + 2.0\nprint(type(x).__name__)", options: ["float", "int", "7.0", "Error"], answer: 0, explanation: "Adding a float to an int produces a float, so x is now a float." },

  { id: "py-ops-po-1", lessonId: "py-ops", code: "print(7 // 2, 7 % 2)", options: ["3 1", "3.5 1", "3 0", "4 1"], answer: 0, explanation: "`//` floor-divides (3) and `%` is the remainder (1)." },
  { id: "py-ops-po-2", lessonId: "py-ops", code: "print(2 ** 3 + 1)", options: ["9", "7", "16", "Error"], answer: 0, explanation: "`**` runs first: 2 ** 3 = 8, then + 1 = 9." },

  { id: "py-io-po-1", lessonId: "py-io", code: 'print("5" + "5")', options: ['"55"', "10", '"10"', "Error"], answer: 0, explanation: "`+` on two strings concatenates them, giving \"55\" (no math)." },
  { id: "py-io-po-2", lessonId: "py-io", code: 'print("3" * 3)', options: ["333", "9", "33", "Error"], answer: 0, explanation: "Multiplying a string by an int repeats the string, giving 333 rather than doing math." },

  { id: "py-cond-po-1", lessonId: "py-cond", code: 'x = 5\nif x > 3:\n    print("big")\nelif x > 4:\n    print("bigger")', options: ['"big"', '"bigger"', 'both', "nothing"], answer: 0, explanation: "The first True branch runs and the rest are skipped, so only \"big\" prints." },
  { id: "py-cond-po-2", lessonId: "py-cond", code: 'x = 0\nif x:\n    print("yes")\nelse:\n    print("no")', options: ["no", "yes", "0", "Error"], answer: 0, explanation: "0 is falsy, so the else branch runs and prints no." },

  { id: "py-loops-po-1", lessonId: "py-loops", code: "total = 0\nfor i in range(4):\n    total += i\nprint(total)", options: ["6", "10", "4", "3"], answer: 0, explanation: "range(4) is 0,1,2,3, so 0+1+2+3 = 6." },
  { id: "py-loops-po-2", lessonId: "py-loops", code: "for i in range(5):\n    if i == 2:\n        break\n    print(i)", options: ["0 1", "0 1 2", "0 1 2 3 4", "1 2"], answer: 0, explanation: "Prints 0 then 1; `break` exits when i == 2, before printing it." },

  { id: "py-funcs-po-1", lessonId: "py-funcs", code: "def add(a, b=10):\n    return a + b\nprint(add(5))", options: ["15", "5", "10", "Error"], answer: 0, explanation: "`b` defaults to 10, so add(5) = 5 + 10 = 15." },
  { id: "py-funcs-po-2", lessonId: "py-funcs", code: "def f(x):\n    x + 1\nprint(f(3))", options: ["None", "4", "3", "Error"], answer: 0, explanation: "No `return`, so the function returns `None` (the `x + 1` result is discarded)." },

  { id: "py-lists-po-1", lessonId: "py-lists", code: "xs = [1, 2, 3, 4]\nprint(xs[1:3])", options: ["[2, 3]", "[1, 2, 3]", "[2, 3, 4]", "[1, 2]"], answer: 0, explanation: "Slice from index 1 up to (not including) 3, giving [2, 3]." },
  { id: "py-lists-po-2", lessonId: "py-lists", code: "xs = [1, 2, 3]\nxs.append(4)\nprint(len(xs))", options: ["4", "3", "5", "Error"], answer: 0, explanation: "append adds one item, so length becomes 4." },

  { id: "py-strings-po-1", lessonId: "py-strings", code: 'print("Python"[:3])', options: ['"Pyt"', '"Py"', '"hon"', '"Pytho"'], answer: 0, explanation: "Slice up to index 3 (excluded) gives 'Pyt'." },
  { id: "py-strings-po-2", lessonId: "py-strings", code: 'print("hello".replace("l", "L"))', options: ['"heLLo"', '"helLo"', '"hello"', '"HELLO"'], answer: 0, explanation: "replace swaps every match, so both l characters become L." },

  { id: "py-dicts-po-1", lessonId: "py-dicts", code: 'd = {"a": 1}\nd["b"] = 2\nprint(len(d))', options: ["2", "1", "3", "Error"], answer: 0, explanation: "Adding key 'b' makes the dict have 2 keys." },

  { id: "py-compr-po-1", lessonId: "py-compr", code: "print([n * 2 for n in range(3)])", options: ["[0, 2, 4]", "[2, 4, 6]", "[0, 1, 2]", "[1, 2, 3]"], answer: 0, explanation: "n is 0,1,2, doubled gives [0, 2, 4]." },
  { id: "py-compr-po-2", lessonId: "py-compr", code: "print([n for n in range(6) if n % 2 == 1])", options: ["[1, 3, 5]", "[0, 2, 4]", "[1, 2, 3]", "[0, 1, 2, 3, 4, 5]"], answer: 0, explanation: "The filter keeps only the odd numbers from 0 to 5." },

  { id: "py-errors-po-1", lessonId: "py-errors", code: "xs = [1, 2, 3]\nprint(xs[5])", options: ["IndexError", "None", "0", "[]"], answer: 0, explanation: "Index 5 is out of range for a 3-item list, raising IndexError." },
  { id: "py-errors-po-2", lessonId: "py-errors", code: 'try:\n    print(int("x"))\nexcept ValueError:\n    print("bad")', options: ["bad", "x", "0", "ValueError"], answer: 0, explanation: 'int("x") raises ValueError, which the except catches and prints bad.' },
];