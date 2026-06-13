import type { CourseModule } from "../types";

export const pythonCollections: CourseModule = {
  slug: "collections",
  title: "Lists, Dicts & Sets",
  description:
    "Python's built-in containers are the workhorses of nearly every algorithm. Learn the list, dict, and set — their APIs, their costs, and the dict/set patterns that crack most problems.",
  lessons: [
    {
      slug: "lists-and-tuples",
      title: "Lists and tuples",
      summary: "The dynamic array, slicing, and the immutable tuple.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Lists: the everyday sequence

A Python \`list\` is a growable, ordered sequence — what other languages call a dynamic array or \`ArrayList\`. It can hold mixed types, though for algorithms you'll usually keep them homogeneous.

\`\`\`python
nums = [10, 20, 30]
nums.append(40)        # grow at the end — amortised O(1)
nums[0]                # 10 — index from 0
nums[-1]               # 40 — negative indices count from the end!
len(nums)              # 4
nums[1] = 99           # mutable
30 in nums             # True — but this is an O(n) scan
\`\`\`

### Slicing

Slicing is a Python superpower — \`seq[start:stop:step]\` returns a new list (the \`stop\` index is exclusive):

\`\`\`python
nums = [0, 1, 2, 3, 4, 5]
nums[1:4]      # [1, 2, 3]
nums[:3]       # [0, 1, 2]   (from the start)
nums[3:]       # [3, 4, 5]   (to the end)
nums[::-1]     # [5, 4, 3, 2, 1, 0]  — reversed!
\`\`\`

Building a result list and returning it is the bread-and-butter pattern; \`append\` in a loop is the Python equivalent of "accumulate then return".`,
        },
        {
          kind: "prose",
          markdown: `## Tuples: immutable, lightweight

A \`tuple\` is an ordered sequence that **can't be changed** after creation. Use one for a fixed group of values — a coordinate, a record, multiple return values.

\`\`\`python
point = (3, 4)
x, y = point          # tuple unpacking -> x=3, y=4
point[0]              # 3
# point[0] = 9        # TypeError: tuples are immutable
\`\`\`

Two everyday consequences of immutability:

- **Multiple return values** are just a tuple: \`return lo, hi\` then \`a, b = f()\`.
- Because they're immutable (hashable), tuples can be **dictionary keys or set elements** — lists cannot.

\`\`\`python
def min_max(nums):
    return min(nums), max(nums)   # returns a tuple

low, high = min_max([3, 1, 4])    # 1, 4
\`\`\`

> **Built-ins do a lot of the work:** \`len\`, \`min\`, \`max\`, \`sum\`, \`sorted\`, \`any\`, \`all\` operate on any sequence. Prefer them over hand-rolled loops — they're faster (implemented in C) and clearer.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "running-max",
            title: "Running maximum",
            prompt: `Return a list \`out\` the same length as \`nums\`, where \`out[i]\` is the **maximum of \`nums[0..i]\`** (the largest value seen up to and including index \`i\`).

\`\`\`text
running_max([3, 1, 4, 1, 5, 9, 2]) -> [3, 3, 4, 4, 5, 9, 9]
running_max([5])                   -> [5]
\`\`\`

Track the best value so far in a variable and \`append\` it each step. \`max(best, n)\` updates the running maximum cleanly.`,
            signature: {
              name: "runningMax",
              params: [{ name: "nums", type: "int[]" }],
              returns: "int[]",
            },
            tests: [
              { input: [[3, 1, 4, 1, 5, 9, 2]], expected: [3, 3, 4, 4, 5, 9, 9] },
              { input: [[5]], expected: [5] },
              { input: [[-3, -1, -7]], expected: [-3, -1, -1], hidden: true },
              { input: [[2, 2, 2]], expected: [2, 2, 2], hidden: true },
              { input: [[1, 2, 3, 4, 5]], expected: [1, 2, 3, 4, 5], hidden: true },
            ],
            starterCode: `def running_max(nums):
    # Build a list of the running maximum and return it.
    pass
`,
            solution: `def running_max(nums):
    result = []
    best = float("-inf")
    for n in nums:
        best = max(best, n)
        result.append(best)
    return result
`,
            hints: [
              "Start with an empty `result = []` and a `best` initialised to negative infinity (`float(\"-inf\")`).",
              "For each `n`, update `best = max(best, n)` and `result.append(best)`.",
              "Return `result` after the loop.",
            ],
          },
        },
      ],
    },
    {
      slug: "dicts-and-sets",
      title: "Dictionaries and sets",
      summary: "The hash map and hash set — O(1) lookups that solve most problems.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Dict: the hash map

If one data structure unlocks the most algorithm problems, it's the hash map. In Python it's the built-in \`dict\`: average **O(1)** insert, lookup, and delete by key.

\`\`\`python
ages = {"Ada": 36, "Alan": 41}   # literal
ages["Grace"] = 45               # insert or overwrite
ages["Ada"]                      # 36 — but raises KeyError if missing!
"Ada" in ages                    # True — membership tests keys, O(1)

ages.get("Nobody")               # None instead of raising
ages.get("Nobody", 0)            # 0 — supply a default
\`\`\`

Two things to internalise:

- Indexing a **missing** key (\`ages["nope"]\`) raises \`KeyError\`. Use \`in\` or \`.get(key, default)\` to be safe.
- Iterating a dict yields its **keys**; use \`.items()\` for key/value pairs and \`.values()\` for values.

### The frequency-count idiom

Counting occurrences is everywhere — memorise this:

\`\`\`python
freq = {}
for n in nums:
    freq[n] = freq.get(n, 0) + 1
\`\`\`

\`.get(n, 0)\` returns 0 when \`n\` isn't a key yet, so the first occurrence starts the count at 1. (Module 5 shows \`collections.Counter\`, which does this in one line.)`,
        },
        {
          kind: "prose",
          markdown: `## Set: membership in O(1)

When you only care *whether* you've seen something — not how many times or what it maps to — use a \`set\`. It's an unordered collection of unique, hashable values with O(1) membership.

\`\`\`python
seen = set()           # NB: {} is an empty DICT, not a set
seen.add(5)
5 in seen              # True — O(1), versus O(n) for a list
seen.add(5)            # no-op: sets ignore duplicates
len(seen)              # 1
\`\`\`

The crucial performance lesson: \`x in some_list\` is an **O(n)** scan, but \`x in some_set\` is **O(1)**. Turning a list into a set before doing repeated membership checks is one of the most common ways to drop an algorithm from O(n²) to O(n).

\`\`\`python
# Deduplicate in one expression:
unique = set(nums)
# Set algebra is built in:
a & b    # intersection
a | b    # union
a - b    # difference
\`\`\``,
        },
        {
          kind: "exercise",
          exercise: {
            id: "two-sum",
            title: "Two Sum with a dict",
            prompt: `Given a list \`nums\` and a \`target\`, return the **indices** of the two numbers that add up to \`target\`, in **ascending order**. Exactly one solution exists, and you may not reuse an element.

\`\`\`text
two_sum([2, 7, 11, 15], 9) -> [0, 1]   # 2 + 7
two_sum([3, 2, 4], 6)      -> [1, 2]   # 2 + 4
\`\`\`

The brute force checks every pair in O(n²). With a dict mapping **value → index**, do it in one O(n) pass: for each number, its needed partner is \`target - n\`. Look that up *before* inserting the current number, and \`enumerate\` gives you the index for free.`,
            signature: {
              name: "twoSum",
              params: [
                { name: "nums", type: "int[]" },
                { name: "target", type: "int" },
              ],
              returns: "int[]",
            },
            tests: [
              { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
              { input: [[3, 2, 4], 6], expected: [1, 2] },
              { input: [[3, 3], 6], expected: [0, 1], hidden: true },
              { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4], hidden: true },
              { input: [[0, 4, 3, 0], 0], expected: [0, 3], hidden: true },
            ],
            starterCode: `def two_sum(nums, target):
    # Use a dict mapping value -> index, and enumerate for the index.
    pass
`,
            solution: `def two_sum(nums, target):
    seen = {}  # value -> index
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i
    return []
`,
            hints: [
              "Loop with `for i, n in enumerate(nums):` to get index and value together.",
              "The partner you need is `target - n`. Check `if complement in seen:` BEFORE storing the current value.",
              "Store `seen[n] = i`. Earlier indices are inserted first, so the returned pair is already ascending.",
            ],
          },
        },
      ],
    },
    {
      slug: "costs-and-membership",
      title: "Container costs at a glance",
      summary: "Why the right container turns O(n²) into O(n).",
      blocks: [
        {
          kind: "prose",
          markdown: `## Picking the right container

The three workhorses have different strengths. Choosing well is often the whole difference between a slow and a fast solution.

| Operation | \`list\` | \`dict\` / \`set\` |
|---|---|---|
| Access / lookup by **index/key** | O(1) | O(1) (key) |
| Membership (\`x in c\`) | **O(n)** scan | **O(1)** |
| Append / add | O(1) amortised | O(1) |
| Insert/remove at front | O(n) | n/a |
| Keeps insertion order | yes | dict yes, set no |

The headline pattern, worth burning in: **if you find yourself doing \`x in a_list\` inside a loop, you almost certainly want a \`set\` (or \`dict\`) instead** — that single change drops the nested O(n²) scan to O(n).

The exercise below is the canonical example: detecting a duplicate.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "contains-duplicate",
            title: "Contains duplicate",
            prompt: `Return \`True\` if any value appears **at least twice** in \`nums\`, and \`False\` if every element is distinct.

\`\`\`text
contains_duplicate([1, 2, 3, 1]) -> True
contains_duplicate([1, 2, 3, 4]) -> False
\`\`\`

A \`set\` makes this a clean O(n): add each value, and the moment one is already present you've found a repeat. (A slick one-liner also exists — compare \`len(set(nums))\` to \`len(nums)\`.)`,
            signature: {
              name: "containsDuplicate",
              params: [{ name: "nums", type: "int[]" }],
              returns: "bool",
            },
            tests: [
              { input: [[1, 2, 3, 1]], expected: true },
              { input: [[1, 2, 3, 4]], expected: false },
              { input: [[]], expected: false, hidden: true },
              { input: [[7]], expected: false, hidden: true },
              { input: [[5, 5, 5, 5]], expected: true, hidden: true },
              { input: [[-1, -2, -3, -2]], expected: true, hidden: true },
            ],
            starterCode: `def contains_duplicate(nums):
    # A set tracks what you've already seen.
    pass
`,
            solution: `def contains_duplicate(nums):
    seen = set()
    for n in nums:
        if n in seen:
            return True
        seen.add(n)
    return False
`,
            hints: [
              "Track values in a `set`; check `if n in seen:` before adding.",
              "The first time you see a value already in the set, return `True`.",
              "Or compare lengths: `return len(set(nums)) != len(nums)`.",
            ],
          },
        },
      ],
    },
  ],
};
