import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "why-o-log-n-arises-from-repeatedly-halving-a-problem",
  title: "Why Halving a Problem Gives O(log n) Complexity",
  difficulty: "easy",
  category: "complexity",
  order: 1035,
  description: `## Why Does Repeatedly Halving a Problem Lead to O(log n)?

Many classic algorithms — binary search, finding the height of a balanced binary tree, certain divide-and-conquer routines — are described as running in **O(log n)** time. The common thread is that each step **cuts the remaining work roughly in half**.

**Your task:** Explain, in your own words, *why* this halving behaviour produces a logarithmic number of steps. Your answer should cover:

1. A concrete worked example showing how many steps it takes to reduce a problem of size *n* down to size 1 by halving repeatedly.
2. The mathematical relationship between the number of halvings and the logarithm (base 2).
3. A brief real-world algorithmic example (e.g. binary search) that illustrates the pattern.
4. Why the base of the logarithm does not matter for Big-O purposes.`,
  hints: [
    `Start with a small concrete number like n = 16 and count how many times you can divide it by 2 before reaching 1.`,
    `Think about the inverse operation: if you double a number k times starting from 1, what size do you reach? How does that relate to logarithms?`,
    `Recall that changing the base of a logarithm only multiplies it by a constant — and Big-O ignores constant factors.`,
  ],
  modelAnswer: `## Why Repeatedly Halving Gives O(log n)

### 1. Concrete Worked Example

Suppose we have a problem of size **n = 16** and each step cuts the size exactly in half:

| Step | Remaining size |
|------|---------------|
| 0    | 16            |
| 1    | 8             |
| 2    | 4             |
| 3    | 2             |
| 4    | 1  ← done     |

It took **4 steps** to go from 16 down to 1.

For n = 32 it takes 5 steps; for n = 64 it takes 6 steps. Doubling the problem size adds only **one** extra step. This is the key intuition behind logarithmic growth.

### 2. The Mathematical Relationship

After *k* halvings, the remaining size is:

\`\`\`
n / 2^k
\`\`\`

We want to know when this reaches 1:

\`\`\`
n / 2^k = 1
  2^k   = n
    k   = log₂(n)
\`\`\`

So the number of steps needed is exactly **log₂(n)**. For n = 16, log₂(16) = 4 — matching our table above.

Alternatively, think of the **inverse**: starting from 1 and doubling k times reaches 2^k. To get from 1 up to n by doubling, you need k = log₂(n) doublings. Halving is just that process in reverse.

### 3. Real-World Example — Binary Search

In binary search on a sorted array of n elements:

- Compare the target with the **middle** element.
- If not found, discard the half that cannot contain the target.
- Repeat on the surviving half.

Each comparison eliminates half the remaining candidates, so the number of comparisons is at most log₂(n) + 1. For n = 1,000,000 that is only about **20 comparisons**, versus up to 1,000,000 for a linear scan.

### 4. Why the Base Doesn't Matter for Big-O

Logarithms in different bases differ only by a **constant factor**:

\`\`\`
log_b(n) = log₂(n) / log₂(b)
\`\`\`

Since log₂(b) is just a constant (it doesn't depend on n), we have:

\`\`\`
log_b(n) = Θ(log₂(n))
\`\`\`

Big-O notation drops constant factors, so **O(log₂ n) = O(log₃ n) = O(log n)** — the base is irrelevant and we simply write O(log n).

### Summary

| Concept | Key idea |
|---------|----------|
| Halving → log steps | Each halving reduces exponent by 1; need log₂(n) halvings to reach 1 |
| Inverse of exponentiation | 2^k = n ↔ k = log₂(n) |
| Binary search | Discards half the search space per step → O(log n) |
| Base independence | Changing base multiplies by a constant → irrelevant in Big-O |`,
  keyPoints: [
    `Demonstrates with a concrete example (e.g. n=16) how many halving steps reach size 1`,
    `Derives the formula: after k halvings the size is n/2^k; setting this equal to 1 gives k = log₂(n)`,
    `Explains the inverse relationship: doubling k times from 1 reaches 2^k = n, so k = log₂(n)`,
    `Notes that doubling n adds only one extra step, illustrating slow (logarithmic) growth`,
    `Gives a concrete algorithmic example such as binary search`,
    `Explains why the logarithm base is irrelevant for Big-O (different bases differ by a constant factor)`,
  ],
};

export default problem;
