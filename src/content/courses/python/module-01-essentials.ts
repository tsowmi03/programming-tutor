import type { CourseModule } from "../types";

export const pythonEssentials: CourseModule = {
  slug: "essentials",
  title: "Python Essentials for Programmers",
  description:
    "You already know how to code. This module maps what you know onto Python's syntax and the idioms that make Python code read the way it does — indentation, dynamic typing, truthiness, and f-strings.",
  lessons: [
    {
      slug: "syntax-and-functions",
      title: "Syntax, functions, and dynamic typing",
      summary: "Indentation as structure, def, and types that travel with values.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Python in one breath

Python is a **dynamically typed**, interpreted language that prizes readability. There are no braces and no semicolons — **indentation defines blocks**, and a newline ends a statement. The result is code with very little syntactic noise.

\`\`\`python
count = 42          # int — no type declared
ratio = 3.14        # float
ready = True        # bool (capitalised!)
name = "Ada"        # str — single or double quotes
nothing = None      # the absence of a value (like null)
\`\`\`

Types belong to **values**, not variables. A name can be rebound to any type, and the interpreter checks operations at runtime:

\`\`\`python
x = 42
x = "now a string"   # perfectly legal
\`\`\`

If you come from a statically typed language, this is the biggest shift: mistakes that a compiler would catch surface when the line actually runs. Python *does* support optional **type hints** (\`def f(n: int) -> int:\`) for tooling and documentation, but they don't change runtime behaviour — they're annotations, not enforcement.`,
        },
        {
          kind: "prose",
          markdown: `## Functions are just \`def\`

Functions are defined with \`def\`, the body is indented (4 spaces by convention), and \`return\` hands back a value (a bare \`return\` or falling off the end yields \`None\`).

\`\`\`python
def add(a, b):
    return a + b

def greet(name):
    # No return -> the function returns None
    print(f"Hello, {name}")
\`\`\`

A few conventions to absorb, because all Python code follows them:

- **Functions and variables are \`snake_case\`** (\`two_sum\`, \`running_total\`) — not the \`camelCase\` you may be used to.
- Indentation is **structure**, not decoration: an inconsistent indent is a syntax error.
- There's no block delimiter — a \`:\` opens a block and the indented lines below it are the body.

> **On these exercises:** you implement a top-level \`snake_case\` function with the name the task gives you. \`print(...)\` output shows up under "Your prints" in the test panel — handy for debugging, ignored when grading your return value.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "triple",
            title: "Your first Python function",
            prompt: `Implement \`triple\` so it returns three times its argument.

A warm-up to get the workflow under your fingers: write the body, hit **Run** to check the sample cases, then **Submit** to run the hidden tests too.

\`\`\`text
triple(4)  -> 12
triple(-2) -> -6
\`\`\``,
            signature: {
              name: "triple",
              params: [{ name: "n", type: "int" }],
              returns: "int",
            },
            tests: [
              { input: [4], expected: 12 },
              { input: [0], expected: 0 },
              { input: [-2], expected: -6, hidden: true },
              { input: [1000], expected: 3000, hidden: true },
            ],
            starterCode: `def triple(n):
    # Return three times n.
    pass
`,
            solution: `def triple(n):
    return 3 * n
`,
            hints: [
              "Replace the `pass` placeholder with a `return` statement.",
              "`return 3 * n` is the whole body.",
            ],
          },
        },
      ],
    },
    {
      slug: "control-flow-and-truthiness",
      title: "Control flow and truthiness",
      summary: "if/elif/else, the loops, and what counts as true.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Branching

\`if\` / \`elif\` / \`else\` — note \`elif\`, not \`else if\` — and no parentheses around the condition:

\`\`\`python
if score >= 90:
    grade = "A"
elif score >= 70:
    grade = "B"
else:
    grade = "C"
\`\`\`

### Truthiness

Python has no \`switch\`, but it leans heavily on **truthiness**: every value is usable in a boolean context, and "empty" things are falsy. This shapes a lot of idiomatic code.

\`\`\`python
# Falsy: False, None, 0, 0.0, "" (empty str), [] {} () (empty containers)
# Truthy: basically everything else

if not items:        # idiomatic "if the list is empty"
    return 0

name = user_name or "anonymous"   # fallback when user_name is "" or None
\`\`\`

Comparisons chain naturally — \`if 0 <= i < len(nums):\` reads exactly as the maths does — and \`and\` / \`or\` / \`not\` are spelled as words.`,
        },
        {
          kind: "prose",
          markdown: `## The loops

Python's \`for\` is a **for-each** over any iterable — it's the default loop:

\`\`\`python
for value in numbers:        # iterate elements directly
    print(value)

for i in range(len(numbers)):   # range(n) yields 0..n-1, when you need the index
    print(i, numbers[i])

for i, value in enumerate(numbers):   # index AND value — the Pythonic combo
    print(i, value)

while condition:             # the usual while loop
    ...
\`\`\`

Reach for \`enumerate\` whenever you'd otherwise write \`range(len(...))\` and index back in — it's clearer and is the idiom Python developers expect.

A couple of small but important differences from C-family languages:

- There's **no \`++\`** — write \`count += 1\`.
- \`break\` and \`continue\` work as usual; \`for\`/\`while\` can even have an \`else\` clause (runs if the loop wasn't \`break\`-ed), though you'll rarely need it.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "count-vowels",
            title: "Count the vowels",
            prompt: `Return the number of vowels (\`a e i o u\`, upper- or lower-case) in the string \`s\`.

\`\`\`text
count_vowels("Ada Lovelace") -> 6
count_vowels("xyz")          -> 0
\`\`\`

A string is iterable, so \`for c in s\` walks its characters. The Pythonic check is \`c.lower() in "aeiou"\` — and \`sum(1 for c in s if ...)\` collapses the whole thing to one line once you're comfortable.`,
            signature: {
              name: "countVowels",
              params: [{ name: "s", type: "string" }],
              returns: "int",
            },
            tests: [
              { input: ["Ada Lovelace"], expected: 6 },
              { input: ["xyz"], expected: 0 },
              { input: [""], expected: 0, hidden: true },
              { input: ["AEIOUaeiou"], expected: 10, hidden: true },
              { input: ["The quick brown fox"], expected: 5, hidden: true },
            ],
            starterCode: `def count_vowels(s):
    # Count a, e, i, o, u (either case) and return the total.
    pass
`,
            solution: `def count_vowels(s):
    count = 0
    for c in s:
        if c.lower() in "aeiou":
            count += 1
    return count
`,
            hints: [
              "Iterate the characters with `for c in s:`.",
              "Normalise case with `c.lower()` and test membership: `c.lower() in \"aeiou\"`.",
              "Keep a running `count` and `count += 1` on each vowel — or write it as `sum(1 for c in s if c.lower() in \"aeiou\")`.",
            ],
          },
        },
      ],
    },
  ],
};
