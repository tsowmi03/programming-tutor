import type { CourseModule } from "../types";

export const pythonAdvancedStdlib: CourseModule = {
  slug: "advanced-stdlib",
  title: "Advanced Iteration and Standard Library Tools",
  description:
    "Use lazy iteration, itertools, bisect, and heapq to solve problems with less code and better asymptotic behavior.",
  lessons: [
    {
      slug: "iterators-and-generators",
      title: "Iterators and generators",
      summary:
        "Produce values lazily and understand when a sequence is single-use.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Iteration is a protocol

An iterable can produce an iterator. An iterator produces values until it is exhausted:

\`\`\`python
iterator = iter([1, 2, 3])
next(iterator)  # 1
next(iterator)  # 2
\`\`\`

\`for\` loops use this protocol automatically.

A generator function contains \`yield\`:

\`\`\`python
def positives(nums):
    for n in nums:
        if n > 0:
            yield n
\`\`\`

Calling it does not run the body immediately. Values are produced as the consumer asks for them. This saves memory and supports streaming, but it also means a generator is usually single-use once consumed.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "running-totals",
            title: "Generate running totals",
            prompt: `Return a list where each position is the sum of all input values up to that position.

\`\`\`text
running_totals([2, -1, 4]) -> [2, 1, 5]
\`\`\`

Write a private generator that yields each running total, then materialise it once with \`list(...)\`.`,
            signature: {
              name: "runningTotals",
              params: [{ name: "nums", type: "int[]" }],
              returns: "int[]",
            },
            tests: [
              { input: [[2, -1, 4]], expected: [2, 1, 5] },
              { input: [[]], expected: [] },
              { input: [[5]], expected: [5] },
              { input: [[1, 1, 1, 1]], expected: [1, 2, 3, 4], hidden: true },
              { input: [[-3, 2, 2]], expected: [-3, -1, 1], hidden: true },
            ],
            starterCode: `def running_totals(nums):
    # Use a generator helper and return a list of its values.
    pass
`,
            solution: `def _generate_totals(nums):
    total = 0
    for n in nums:
        total += n
        yield total


def running_totals(nums):
    return list(_generate_totals(nums))
`,
            hints: [
              "The generator should keep `total = 0` as local state.",
              "After adding each number, `yield total`.",
              "The public function can return `list(_generate_totals(nums))`.",
            ],
          },
        },
      ],
    },
    {
      slug: "itertools-for-structured-loops",
      title: "itertools for structured loops",
      summary:
        "Reach for reusable iterator building blocks before writing complex nested loops.",
      blocks: [
        {
          kind: "prose",
          markdown: `## itertools packages common iteration shapes

\`itertools\` contains small, composable iterator tools:

\`\`\`python
from itertools import combinations, groupby, accumulate

list(combinations([1, 2, 3], 2))  # (1,2), (1,3), (2,3)
list(accumulate([1, 2, 3]))       # 1, 3, 6
\`\`\`

\`groupby\` groups only adjacent equal keys. Sort first when you want all equal values grouped globally:

\`\`\`python
for key, group in groupby(sorted(words), key=len):
    ...
\`\`\`

Iterator tools are lazy, so they compose without allocating intermediate lists unless you materialise them.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "run-lengths",
            title: "Run-length encode groups",
            prompt: `Return the run lengths of adjacent equal characters in \`s\`, encoded as strings \`"char:count"\`.

\`\`\`text
run_lengths("aaabbcaaa") -> ["a:3", "b:2", "c:1", "a:3"]
run_lengths("")          -> []
\`\`\`

Use \`itertools.groupby\` or track the current character manually.`,
            signature: {
              name: "runLengths",
              params: [{ name: "s", type: "string" }],
              returns: "string[]",
            },
            tests: [
              { input: ["aaabbcaaa"], expected: ["a:3", "b:2", "c:1", "a:3"] },
              { input: [""], expected: [] },
              { input: ["x"], expected: ["x:1"] },
              { input: ["112222"], expected: ["1:2", "2:4"], hidden: true },
              {
                input: ["ab"],
                expected: ["a:1", "b:1"],
                hidden: true,
              },
            ],
            starterCode: `def run_lengths(s):
    # Return adjacent groups as "char:count" strings.
    pass
`,
            solution: `from itertools import groupby


def run_lengths(s):
    return [
        f"{char}:{sum(1 for _ in group)}"
        for char, group in groupby(s)
    ]
`,
            hints: [
              "`groupby(s)` yields `(character, group_iterator)` for adjacent equal runs.",
              "Count one group with `sum(1 for _ in group)`.",
              "Build each output string with an f-string.",
            ],
          },
        },
      ],
    },
    {
      slug: "bisect-and-sorted-boundaries",
      title: "bisect and sorted boundaries",
      summary:
        "Use the standard library for insertion points and lower-bound searches.",
      blocks: [
        {
          kind: "prose",
          markdown: `## bisect is binary search for insertion points

\`bisect_left\` returns the first index where a value can be inserted while preserving sorted order:

\`\`\`python
from bisect import bisect_left, bisect_right

bisect_left([1, 2, 2, 4], 2)   # 1
bisect_right([1, 2, 2, 4], 2)  # 3
\`\`\`

Use \`bisect_left\` for "first position where value is at least target". Use \`bisect_right\` for "first position where value is greater than target".

\`insort\` inserts into a sorted list, but insertion is O(n) because elements shift. Bisect finds the position in O(log n); list insertion still dominates for large lists.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "insert-positions",
            title: "Find sorted insertion positions",
            prompt: `\`nums\` is sorted ascending. For each target in \`targets\`, return the index where it should be inserted to keep \`nums\` sorted, before any equal values.

\`\`\`text
insert_positions([1, 3, 3, 7], [0, 3, 5, 9]) -> [0, 1, 3, 4]
\`\`\`

Use \`bisect_left\`.`,
            signature: {
              name: "insertPositions",
              params: [
                { name: "nums", type: "int[]" },
                { name: "targets", type: "int[]" },
              ],
              returns: "int[]",
            },
            tests: [
              { input: [[1, 3, 3, 7], [0, 3, 5, 9]], expected: [0, 1, 3, 4] },
              { input: [[], [1, 2]], expected: [0, 0] },
              { input: [[2, 4, 6], []], expected: [] },
              {
                input: [[1, 1, 1], [1, 0, 2]],
                expected: [0, 0, 3],
                hidden: true,
              },
            ],
            starterCode: `def insert_positions(nums, targets):
    # Return the bisect_left insertion point for each target.
    pass
`,
            solution: `from bisect import bisect_left


def insert_positions(nums, targets):
    return [bisect_left(nums, target) for target in targets]
`,
            hints: [
              "Import `bisect_left` from `bisect`.",
              "`bisect_left(nums, target)` returns the required index.",
              "A comprehension over `targets` preserves target order.",
            ],
          },
        },
      ],
    },
    {
      slug: "heapq-and-priority-queues",
      title: "heapq and priority queues",
      summary:
        "Keep the next smallest item available without sorting the whole input repeatedly.",
      blocks: [
        {
          kind: "prose",
          markdown: `## heapq implements a min-heap on a list

\`heapq\` functions treat an ordinary list as a binary min-heap:

\`\`\`python
import heapq

heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 2)
heapq.heappop(heap)  # 2
\`\`\`

Push and pop are O(log n). The smallest value is always at \`heap[0]\`.

For a max-heap, store negative priorities or use tuple priorities:

\`\`\`python
heapq.heappush(heap, (-score, name))
\`\`\`

Tuples compare left to right, so the second element breaks ties.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "kth-largest",
            title: "Find the kth largest with heapq",
            prompt: `Return the \`k\`th largest value in \`nums\`. Duplicate values count as separate positions.

\`\`\`text
kth_largest([3, 2, 1, 5, 6, 4], 2) -> 5
kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4) -> 4
\`\`\`

Maintain a min-heap of at most \`k\` values. After all values are processed, the heap root is the kth largest.`,
            signature: {
              name: "kthLargest",
              params: [
                { name: "nums", type: "int[]" },
                { name: "k", type: "int" },
              ],
              returns: "int",
            },
            tests: [
              { input: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
              {
                input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4],
                expected: 4,
              },
              { input: [[7], 1], expected: 7 },
              { input: [[-1, -5, -2, -4], 3], expected: -4, hidden: true },
              { input: [[2, 2, 2, 2], 3], expected: 2, hidden: true },
            ],
            starterCode: `def kth_largest(nums, k):
    # Keep a min-heap of the k largest values seen so far.
    pass
`,
            solution: `import heapq


def kth_largest(nums, k):
    heap = []
    for value in nums:
        heapq.heappush(heap, value)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]
`,
            hints: [
              "`heapq.heappush(heap, value)` adds a value.",
              "When `len(heap) > k`, remove the smallest with `heappop`.",
              "The remaining heap contains the k largest values, so `heap[0]` is the kth largest.",
            ],
          },
        },
      ],
    },
  ],
};
