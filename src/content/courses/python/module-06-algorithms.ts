import type { CourseModule } from "../types";

export const pythonAlgorithms: CourseModule = {
  slug: "algorithms",
  title: "Algorithms & Complexity in Python",
  description:
    "Bring it together: recursion and memoization, binary search (and the bisect module), and reasoning about Big-O the way you would in a Python interview. Each lesson ends in a classic exercise.",
  lessons: [
    {
      slug: "recursion",
      title: "Recursion and memoization",
      summary: "Base cases, the recursion limit, and caching with lru_cache.",
      blocks: [
        {
          kind: "prose",
          markdown: `## A function that calls itself

Recursion expresses a problem in terms of a smaller version of itself. Every recursive function needs:

1. A **base case** that returns directly without recursing.
2. A **recursive step** that moves toward the base case.

\`\`\`python
def factorial(n):
    if n <= 1:            # base case
        return 1
    return n * factorial(n - 1)   # recursive step
\`\`\`

Each call adds a frame to the **call stack**. Python guards against runaway recursion with a limit (default ~1000 frames) and raises \`RecursionError\` rather than crashing — so the base case isn't optional. For deep but legitimate recursion you can raise it with \`sys.setrecursionlimit\`, but an iterative reformulation is usually better.`,
        },
        {
          kind: "prose",
          markdown: `## When naive recursion is a trap

The textbook recursive Fibonacci recomputes the same values exponentially many times:

\`\`\`python
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)   # O(2^n) — far too slow
\`\`\`

Two cures. **Memoization** caches results — and Python makes it a one-line decorator:

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)   # now O(n)
\`\`\`

Or go **bottom-up** (tabulation — the iterative half of dynamic programming), building from the base cases with O(1) memory:

\`\`\`python
def fib(n):
    if n < 2:
        return n
    prev, cur = 0, 1
    for _ in range(2, n + 1):
        prev, cur = cur, prev + cur   # tuple assignment — no temp needed
    return cur
\`\`\`

That "each state depends on a couple of previous states" shape is the gateway to DP. The next exercise — climbing stairs — is Fibonacci in disguise.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "climb-stairs",
            title: "Climbing stairs",
            prompt: `You can climb a staircase 1 or 2 steps at a time. Return the number of **distinct ways** to reach the top of \`n\` steps.

\`\`\`text
climb_stairs(2) -> 2    # (1+1), (2)
climb_stairs(3) -> 3    # (1+1+1), (1+2), (2+1)
climb_stairs(5) -> 8
\`\`\`

To reach step \`n\` you came from step \`n-1\` or \`n-2\`, so \`ways(n) = ways(n-1) + ways(n-2)\` — Fibonacci. Build it bottom-up to stay O(n). \`n\` is between 1 and 30.`,
            signature: {
              name: "climbStairs",
              params: [{ name: "n", type: "int" }],
              returns: "int",
            },
            tests: [
              { input: [2], expected: 2 },
              { input: [3], expected: 3 },
              { input: [5], expected: 8 },
              { input: [1], expected: 1, hidden: true },
              { input: [10], expected: 89, hidden: true },
              { input: [30], expected: 1346269, hidden: true },
            ],
            starterCode: `def climb_stairs(n):
    # ways(n) = ways(n-1) + ways(n-2). Build it up from the base cases.
    pass
`,
            solution: `def climb_stairs(n):
    if n < 3:
        return n
    prev, cur = 1, 2  # ways to reach step 1 and step 2
    for _ in range(3, n + 1):
        prev, cur = cur, prev + cur
    return cur
`,
            hints: [
              "There's 1 way to climb 1 step and 2 ways to climb 2 steps — your base cases.",
              "Each higher step's answer is the sum of the previous two answers.",
              "Carry just the last two values: `prev, cur = cur, prev + cur` each iteration.",
            ],
          },
        },
      ],
    },
    {
      slug: "binary-search",
      title: "Binary search",
      summary: "Halving a sorted range, and the bisect module.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Halve the haystack every step

If data is **sorted**, you don't scan it linearly. Binary search checks the middle element and discards half the range each comparison — O(log n) instead of O(n).

\`\`\`python
def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2        # // is integer division
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1            # target is in the right half
        else:
            hi = mid - 1            # target is in the left half
    return -1                       # not found
\`\`\`

Three details that cause most binary-search bugs:

- **Loop condition \`lo <= hi\`** (not \`<\`) — otherwise you miss the one-element range.
- **Always move a bound past \`mid\`** (\`mid + 1\` / \`mid - 1\`) so the range strictly shrinks and the loop ends.
- Use **\`//\`** for the midpoint — \`/\` produces a float in Python 3, which can't index a list.`,
        },
        {
          kind: "prose",
          markdown: `## The stdlib already has it: bisect

For the "where does this value go in a sorted list" task, the \`bisect\` module is built in and fast:

\`\`\`python
import bisect

i = bisect.bisect_left(nums, target)   # leftmost index where target could insert
found = i < len(nums) and nums[i] == target
bisect.insort(nums, value)             # insert while keeping the list sorted
\`\`\`

But the real value of binary search is recognising the **pattern** beyond literal lookups: whenever a predicate flips from \`False\` to \`True\` exactly once across a range (it's "monotonic"), you can binary-search for the boundary — first bad version, minimum feasible capacity, integer square root, and so on. Implement it by hand in the exercise so the pattern is yours.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "binary-search",
            title: "Binary search",
            prompt: `\`nums\` is sorted in **ascending order** with distinct values. Return the index of \`target\`, or \`-1\` if it isn't present. Aim for O(log n).

\`\`\`text
search([-1, 0, 3, 5, 9, 12], 9)  -> 4
search([-1, 0, 3, 5, 9, 12], 2)  -> -1
\`\`\`

Maintain a \`[lo, hi]\` window, check the middle, and discard the half that can't contain \`target\`. Mind the three details: \`lo <= hi\`, move bounds past \`mid\`, and \`//\` for the midpoint.`,
            signature: {
              name: "search",
              params: [
                { name: "nums", type: "int[]" },
                { name: "target", type: "int" },
              ],
              returns: "int",
            },
            tests: [
              { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
              { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
              { input: [[5], 5], expected: 0, hidden: true },
              { input: [[5], -5], expected: -1, hidden: true },
              { input: [[], 1], expected: -1, hidden: true },
              { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9], 1], expected: 0, hidden: true },
              { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9], 9], expected: 8, hidden: true },
            ],
            starterCode: `def search(nums, target):
    # Binary search a sorted, distinct list. Return the index or -1.
    pass
`,
            solution: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
`,
            hints: [
              "Start with `lo, hi = 0, len(nums) - 1`; loop while `lo <= hi`.",
              "Compare `nums[mid]` to target: if smaller, search right (`lo = mid + 1`); if larger, search left (`hi = mid - 1`).",
              "Return `mid` on a match and `-1` if the loop ends without finding it.",
            ],
          },
        },
      ],
    },
    {
      slug: "complexity-capstone",
      title: "Capstone: complexity in practice",
      summary: "Reading Big-O off Python code, and a final classic to tie it together.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Reading complexity off the code

Big-O describes how work grows with input size \`n\`. A quick field guide for the Python you've written in this course:

- A single \`for\` over \`n\` items → **O(n)**.
- A loop inside a loop, both over the input → **O(n²)**.
- Halving the range each step (binary search) → **O(log n)**.
- A \`dict\`/\`set\` lookup or insert → **O(1)** average — this is *why* hashing turns so many O(n²) brute forces into O(n).
- \`sorted(...)\` / \`list.sort()\` → **O(n log n)**.

Watch for hidden costs Python makes easy to overlook:

- \`x in a_list\` is **O(n)**; \`x in a_set\` is **O(1)** — converting first is often the whole optimisation.
- \`list.pop(0)\` and \`list.insert(0, x)\` are **O(n)** (everything shifts) — use \`collections.deque\` for a front queue.
- Building a string with \`+=\` in a loop is **O(n²)** — collect in a list and \`"".join\`.
- Slicing (\`nums[a:b]\`) copies, so it's **O(k)** in the slice length and uses O(k) space.

**Space** counts too: a \`set\` of every element is O(n) extra memory — usually a fair trade for dropping time from O(n²) to O(n), but worth saying out loud.`,
        },
        {
          kind: "prose",
          markdown: `## One last classic: maximum subarray

Given a list that may contain negatives, find the largest sum of any **contiguous** subarray. The brute force tries every start/end pair in O(n²). **Kadane's algorithm** does it in a single O(n) pass with O(1) space:

> Walk left to right. At each element decide: extend the best subarray ending at the previous position, or start fresh from here. Track the best total seen anywhere.

\`\`\`python
# current = best sum of a subarray ENDING at the current index
# best    = best sum seen ANYWHERE so far
current = max(num, current + num)
best = max(best, current)
\`\`\`

That single "extend or restart" comparison is the whole trick. Implement it below to close out the course.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "max-subarray",
            title: "Maximum subarray (Kadane's)",
            prompt: `Return the largest sum of any **non-empty contiguous** subarray of \`nums\`. The list always has at least one element and may contain negatives.

\`\`\`text
max_sub_array([-2, 1, -3, 4, -1, 2, 1, -5, 4]) -> 6   # [4, -1, 2, 1]
max_sub_array([-3, -1, -2])                    -> -1   # [-1]
max_sub_array([5])                             -> 5
\`\`\`

Kadane's: keep \`current\` = best sum ending here (\`max(num, current + num)\`) and \`best\` = max of all the \`current\` values. Initialise both to \`nums[0]\` and iterate from the second element.`,
            signature: {
              name: "maxSubArray",
              params: [{ name: "nums", type: "int[]" }],
              returns: "int",
            },
            tests: [
              { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
              { input: [[-3, -1, -2]], expected: -1 },
              { input: [[5]], expected: 5 },
              { input: [[1, 2, 3, 4]], expected: 10, hidden: true },
              { input: [[-1, -2, -3, -4]], expected: -1, hidden: true },
              { input: [[8, -19, 5, -4, 20]], expected: 21, hidden: true },
            ],
            starterCode: `def max_sub_array(nums):
    # Kadane's algorithm: extend or restart, tracking the best sum.
    pass
`,
            solution: `def max_sub_array(nums):
    current = best = nums[0]
    for num in nums[1:]:
        current = max(num, current + num)
        best = max(best, current)
    return best
`,
            hints: [
              "Initialise `current = best = nums[0]`, then iterate over `nums[1:]`.",
              "At each element: `current = max(num, current + num)` — restart if extending would hurt.",
              "Update `best = max(best, current)` every step; return `best`.",
            ],
          },
        },
      ],
    },
  ],
};
