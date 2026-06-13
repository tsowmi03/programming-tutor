import type { CourseModule } from "../types";

export const csharpAlgorithms: CourseModule = {
  slug: "algorithms",
  title: "Algorithms & Complexity in C#",
  description:
    "Bring it together: recursion and the call stack, binary search on sorted data, and reasoning about Big-O the way you would in a C# interview. Each lesson ends in a classic exercise.",
  lessons: [
    {
      slug: "recursion",
      title: "Recursion and the call stack",
      summary: "Base cases, the call stack, and why naive recursion can explode.",
      blocks: [
        {
          kind: "prose",
          markdown: `## A method that calls itself

Recursion expresses a problem in terms of a smaller version of itself. Every recursive method needs two things:

1. A **base case** that returns directly without recursing (otherwise it never stops).
2. A **recursive step** that moves toward the base case.

\`\`\`csharp
public int Factorial(int n) {
    if (n <= 1) return 1;          // base case
    return n * Factorial(n - 1);   // recursive step
}
\`\`\`

Each call gets its own frame on the **call stack** — its own copy of the parameters and locals. \`Factorial(4)\` stacks four frames, then they unwind: \`4 * (3 * (2 * 1))\`. C#'s default stack handles thousands of frames, but unbounded recursion throws \`StackOverflowException\`, so the base case isn't optional.`,
        },
        {
          kind: "prose",
          markdown: `## When naive recursion is a trap

The textbook recursive Fibonacci recomputes the same values exponentially many times:

\`\`\`csharp
int Fib(int n) => n < 2 ? n : Fib(n - 1) + Fib(n - 2);  // O(2^n) — far too slow
\`\`\`

The fix is to remember results you've already computed (**memoization**) or to build up answers iteratively from the base cases (**tabulation** — the bottom-up half of dynamic programming):

\`\`\`csharp
// Bottom-up: each value depends only on the previous two.
int Fib(int n) {
    if (n < 2) return n;
    int prev = 0, cur = 1;
    for (int i = 2; i <= n; i++) {
        int next = prev + cur;
        prev = cur;
        cur = next;
    }
    return cur;   // O(n) time, O(1) space
}
\`\`\`

This "each state depends on a few previous states" shape is the gateway to dynamic programming. The next exercise — climbing stairs — is Fibonacci in disguise, and a great place to feel that out.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "climb-stairs",
            title: "Climbing stairs",
            prompt: `You can climb a staircase 1 or 2 steps at a time. Return the number of **distinct ways** to reach the top of \`n\` steps.

\`\`\`text
ClimbStairs(2) -> 2    // (1+1), (2)
ClimbStairs(3) -> 3    // (1+1+1), (1+2), (2+1)
ClimbStairs(5) -> 8
\`\`\`

To reach step \`n\` you arrived from step \`n-1\` (one step) or \`n-2\` (two steps), so \`ways(n) = ways(n-1) + ways(n-2)\` — Fibonacci. Build it bottom-up to stay O(n) and avoid recomputation. \`n\` is between 1 and 30.`,
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
            starterCode: `public class Solution {
    public int ClimbStairs(int n) {
        // ways(n) = ways(n-1) + ways(n-2). Build it up from the base cases.
    }
}`,
            solution: `public class Solution {
    public int ClimbStairs(int n) {
        if (n < 3) return n;
        int prev = 1, cur = 2; // ways to reach step 1 and step 2
        for (int i = 3; i <= n; i++) {
            int next = prev + cur;
            prev = cur;
            cur = next;
        }
        return cur;
    }
}`,
            hints: [
              "There's 1 way to climb 1 step and 2 ways to climb 2 steps — your base cases.",
              "For each higher step, the answer is the sum of the previous two answers.",
              "Track just the last two values in a loop; no array or recursion needed.",
            ],
          },
        },
      ],
    },
    {
      slug: "binary-search",
      title: "Binary search",
      summary: "Halving a sorted search space, and getting the bounds right.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Halve the haystack every step

If data is **sorted**, you don't have to scan it linearly. Binary search checks the middle element and discards half the range each comparison — O(log n) instead of O(n).

\`\`\`csharp
public int Search(int[] nums, int target) {
    int lo = 0, hi = nums.Length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;   // avoids integer overflow vs (lo+hi)/2
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) lo = mid + 1;   // target is in the right half
        else hi = mid - 1;                        // target is in the left half
    }
    return -1;   // not found
}
\`\`\`

Three details that cause most binary-search bugs:

- **Loop condition \`lo <= hi\`** (not \`<\`) — otherwise you miss the case where the range narrows to one element.
- **Always move a bound past \`mid\`** (\`mid + 1\` / \`mid - 1\`) so the range strictly shrinks and the loop terminates.
- **\`lo + (hi - lo) / 2\`** computes the midpoint without risking overflow on large indices.`,
        },
        {
          kind: "prose",
          markdown: `## The standard library already has it

For the plain "find this value in a sorted array" task, \`System.Array.BinarySearch\` does the work:

\`\`\`csharp
int idx = System.Array.BinarySearch(nums, target);
// >= 0 : the index of a match
// <  0 : ~idx is where target WOULD be inserted to stay sorted
\`\`\`

That negative-complement return is a clever bonus: \`~idx\` (bitwise complement) gives the insertion point, so you can answer "where does this belong?" even on a miss.

But the real value of binary search is recognising the **pattern** beyond literal lookups: any time a predicate flips from false to true exactly once across a range (the "monotonic" condition), you can binary-search for the boundary — first bad version, minimum capacity that works, square root, and so on. Implement it by hand in the exercise so the pattern is yours.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "binary-search",
            title: "Binary search",
            prompt: `\`nums\` is sorted in **ascending order** with distinct values. Return the index of \`target\`, or \`-1\` if it isn't present. Aim for O(log n).

\`\`\`text
Search([-1, 0, 3, 5, 9, 12], 9)  -> 4
Search([-1, 0, 3, 5, 9, 12], 2)  -> -1
\`\`\`

Maintain a \`[lo, hi]\` window, check the middle, and discard the half that can't contain \`target\`. Mind the three details from the lesson: \`lo <= hi\`, move bounds past \`mid\`, and a safe midpoint.`,
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
            starterCode: `public class Solution {
    public int Search(int[] nums, int target) {
        // Binary search a sorted, distinct array. Return the index or -1.
    }
}`,
            solution: `public class Solution {
    public int Search(int[] nums, int target) {
        int lo = 0, hi = nums.Length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
}`,
            hints: [
              "Start with `lo = 0` and `hi = nums.Length - 1`; loop while `lo <= hi`.",
              "Compare `nums[mid]` to target: if smaller, the answer is to the right (`lo = mid + 1`); if larger, to the left (`hi = mid - 1`).",
              "Return `mid` on a match, and `-1` if the loop ends without finding it.",
            ],
          },
        },
      ],
    },
    {
      slug: "complexity-capstone",
      title: "Capstone: complexity in practice",
      summary: "Reading Big-O off C# code, and a final classic to tie it together.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Reading complexity off the code

Big-O describes how work grows with input size \`n\`. A quick field guide for the C# you've written in this course:

- A single \`for\`/\`foreach\` over \`n\` items → **O(n)**.
- A loop inside a loop, both over the input → **O(n²)**.
- Halving the range each step (binary search) → **O(log n)**.
- A \`Dictionary\`/\`HashSet\` lookup or insert → **O(1)** average — this is *why* hashing turns so many O(n²) brute forces into O(n).
- \`Array.Sort\` / \`OrderBy\` → **O(n log n)**.

Watch for hidden costs: building a string with \`+=\` in a loop is O(n²); \`list.Contains\` inside a loop is O(n²) (use a \`HashSet\`); \`nums.Where(...).ToArray()\` is O(n) but allocates.

**Space** counts too: a \`HashSet\` of every element is O(n) extra memory — often a fair trade for dropping time from O(n²) to O(n), but worth stating out loud in an interview.`,
        },
        {
          kind: "prose",
          markdown: `## One last classic: maximum subarray

Given an array that may contain negatives, find the largest sum of any **contiguous** subarray. The brute force tries every start/end pair in O(n²). **Kadane's algorithm** does it in a single O(n) pass with O(1) space, and it's a beautiful example of carrying just enough state:

> Walk left to right. At each element decide: extend the best subarray ending at the previous position, or start fresh from here. Track the best total seen anywhere.

\`\`\`csharp
// current = best sum of a subarray ENDING at the current index
// best    = best sum seen ANYWHERE so far
current = Max(nums[i], current + nums[i]);
best = Max(best, current);
\`\`\`

That single comparison — extend or restart — is the whole trick. Implement it below to close out the course.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "max-subarray",
            title: "Maximum subarray (Kadane's)",
            prompt: `Return the largest sum of any **non-empty contiguous** subarray of \`nums\`. The array always has at least one element and may contain negatives.

\`\`\`text
MaxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) -> 6   // [4, -1, 2, 1]
MaxSubArray([-3, -1, -2])                    -> -1   // [-1]
MaxSubArray([5])                             -> 5
\`\`\`

Kadane's: keep \`current\` = best sum ending here (\`Max(nums[i], current + nums[i])\`) and \`best\` = max of all the \`current\` values. Initialise both to \`nums[0]\` and scan from index 1.`,
            signature: {
              name: "maxSubArray",
              params: [{ name: "nums", type: "int[]" }],
              returns: "int",
            },
            tests: [
              {
                input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],
                expected: 6,
              },
              { input: [[-3, -1, -2]], expected: -1 },
              { input: [[5]], expected: 5 },
              { input: [[1, 2, 3, 4]], expected: 10, hidden: true },
              { input: [[-1, -2, -3, -4]], expected: -1, hidden: true },
              {
                input: [[8, -19, 5, -4, 20]],
                expected: 21,
                hidden: true,
              },
            ],
            starterCode: `using System;

public class Solution {
    public int MaxSubArray(int[] nums) {
        // Kadane's algorithm: extend or restart, tracking the best sum.
    }
}`,
            solution: `using System;

public class Solution {
    public int MaxSubArray(int[] nums) {
        int current = nums[0];
        int best = nums[0];
        for (int i = 1; i < nums.Length; i++) {
            current = Math.Max(nums[i], current + nums[i]);
            best = Math.Max(best, current);
        }
        return best;
    }
}`,
            hints: [
              "Initialise both `current` and `best` to `nums[0]`, then loop from index 1.",
              "At each element: `current = Math.Max(nums[i], current + nums[i])` — restart if extending would hurt.",
              "Update `best = Math.Max(best, current)` every step; return `best`.",
            ],
          },
        },
      ],
    },
  ],
};
