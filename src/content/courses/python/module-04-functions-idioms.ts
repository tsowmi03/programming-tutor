import type { CourseModule } from "../types";

export const pythonFunctionsIdioms: CourseModule = {
  slug: "functions-idioms",
  title: "Functions, Iteration & Idioms",
  description:
    "The tools that make Python code concise: enumerate and zip, sorting with a key function, lambdas, unpacking, and the small idioms that distinguish Pythonic code from a literal translation.",
  lessons: [
    {
      slug: "iteration-tools",
      title: "enumerate, zip, and unpacking",
      summary: "The built-ins that replace index bookkeeping.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Stop counting indices by hand

Python gives you iteration helpers that eliminate manual index juggling. Using them is a strong signal of idiomatic code.

**\`enumerate\`** pairs each element with its index:

\`\`\`python
for i, value in enumerate(nums):
    print(i, value)

# with a custom start:
for line_no, line in enumerate(lines, start=1):
    ...
\`\`\`

**\`zip\`** walks several sequences in lockstep:

\`\`\`python
names = ["Ada", "Alan"]
ages = [36, 41]
for name, age in zip(names, ages):
    print(name, age)        # Ada 36 / Alan 41
\`\`\`

\`zip\` stops at the shortest input, and pairing it with unpacking handles many "compare adjacent elements" tasks neatly — e.g. \`for a, b in zip(nums, nums[1:])\` walks consecutive pairs.`,
        },
        {
          kind: "prose",
          markdown: `## Unpacking and multiple assignment

Python lets you destructure sequences directly, which removes a lot of temporary-variable noise:

\`\`\`python
a, b = 1, 2
a, b = b, a               # swap — no temp needed
first, *rest = [1, 2, 3]  # first=1, rest=[2, 3]  (starred capture)
(x, y), z = (1, 2), 3
\`\`\`

This is why returning a tuple and unpacking it reads so cleanly:

\`\`\`python
def divmod_pair(a, b):
    return a // b, a % b

quotient, remainder = divmod_pair(17, 5)   # 3, 2
\`\`\`

These small conveniences add up: \`enumerate\`, \`zip\`, and unpacking together let most "loop with an index and a couple of temporaries" routines collapse into a couple of clean lines. The exercise applies them to building per-item results.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "initials",
            title: "Extract initials",
            prompt: `Given a list of full names, return a list of **upper-case initials** — the first letter of each space-separated word, joined together.

\`\`\`text
initials(["ada lovelace", "alan turing"])  -> ["AL", "AT"]
initials(["grace brewster murray hopper"]) -> ["GBMH"]
\`\`\`

Each name has at least one word; words are separated by single spaces. \`name.split()\` gives the words, \`word[0].upper()\` an initial, and a comprehension assembles each result — this is a great fit for a nested comprehension.`,
            signature: {
              name: "initials",
              params: [{ name: "names", type: "string[]" }],
              returns: "string[]",
            },
            tests: [
              {
                input: [["ada lovelace", "alan turing"]],
                expected: ["AL", "AT"],
              },
              { input: [["grace brewster murray hopper"]], expected: ["GBMH"] },
              { input: [[]], expected: [], hidden: true },
              { input: [["plato"]], expected: ["P"], hidden: true },
              {
                input: [["john von neumann", "kurt godel"]],
                expected: ["JVN", "KG"],
                hidden: true,
              },
            ],
            starterCode: `def initials(names):
    # For each name, take the first letter of each word, upper-cased.
    pass
`,
            solution: `def initials(names):
    return [
        "".join(word[0].upper() for word in name.split())
        for name in names
    ]
`,
            hints: [
              "`name.split()` returns the list of words in one name.",
              "`word[0].upper()` is a single initial; `\"\".join(...)` glues a name's initials together.",
              "Wrap it in an outer comprehension over `names` to produce the list of results.",
            ],
          },
        },
      ],
    },
    {
      slug: "sorting-with-keys",
      title: "Sorting with a key",
      summary: "sorted, key functions, lambdas, and stable multi-level sorts.",
      blocks: [
        {
          kind: "prose",
          markdown: `## \`sorted\` and the \`key\` function

\`sorted(iterable)\` returns a new sorted list; \`list.sort()\` sorts in place. The real power is the **\`key\`** argument — a function applied to each element to derive the value to sort by.

\`\`\`python
words = ["banana", "kiwi", "apple"]
sorted(words)                       # alphabetical
sorted(words, key=len)              # by length: ['kiwi', 'apple', 'banana']
sorted(nums, reverse=True)          # descending
\`\`\`

A **lambda** is a small anonymous function, handy for inline keys:

\`\`\`python
points = [(1, 5), (3, 2), (1, 1)]
sorted(points, key=lambda p: p[1])  # sort by the second element
\`\`\`

### Multi-level sorts

Return a **tuple** from the key to sort by several criteria at once — tuples compare element by element:

\`\`\`python
# Sort by count DESCENDING, then by value ASCENDING:
sorted(values, key=lambda v: (-count[v], v))
\`\`\`

Negating a number flips its sort direction, so \`(-count[v], v)\` means "most frequent first, ties broken by smaller value". Python's sort is **stable**, so equal keys keep their original order — useful when you only need to sort by one thing without disturbing the rest.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "sort-by-frequency",
            title: "Sort by frequency",
            prompt: `Sort \`nums\` so that values appearing **more often come first**. Break ties (equal frequencies) by **smaller value first**. Return the reordered list — every element of the input appears, just reordered.

\`\`\`text
sort_by_frequency([1, 1, 2, 2, 2, 3]) -> [2, 2, 2, 1, 1, 3]
sort_by_frequency([4, 5, 6, 5, 4, 4]) -> [4, 4, 4, 5, 5, 6]
\`\`\`

Count frequencies in a dict, then sort with a tuple key: \`key=lambda n: (-freq[n], n)\` — frequency descending, value ascending. (\`collections.Counter\`, covered next module, builds the counts in one line.)`,
            signature: {
              name: "sortByFrequency",
              params: [{ name: "nums", type: "int[]" }],
              returns: "int[]",
            },
            tests: [
              { input: [[1, 1, 2, 2, 2, 3]], expected: [2, 2, 2, 1, 1, 3] },
              { input: [[4, 5, 6, 5, 4, 4]], expected: [4, 4, 4, 5, 5, 6] },
              { input: [[]], expected: [], hidden: true },
              { input: [[7, 7, 7]], expected: [7, 7, 7], hidden: true },
              { input: [[3, 1, 2]], expected: [1, 2, 3], hidden: true },
              {
                input: [[5, 5, 4, 4, 3, 3]],
                expected: [3, 3, 4, 4, 5, 5],
                hidden: true,
              },
            ],
            starterCode: `def sort_by_frequency(nums):
    # Count frequencies, then sort by (frequency desc, value asc).
    pass
`,
            solution: `def sort_by_frequency(nums):
    freq = {}
    for n in nums:
        freq[n] = freq.get(n, 0) + 1
    return sorted(nums, key=lambda n: (-freq[n], n))
`,
            hints: [
              "First build a frequency dict: `freq[n] = freq.get(n, 0) + 1`.",
              "Sort the original list with a tuple key so two criteria apply at once.",
              "`key=lambda n: (-freq[n], n)` — negative frequency sorts most-frequent first; `n` breaks ties ascending.",
            ],
          },
        },
      ],
    },
  ],
};
