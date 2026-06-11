import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "why-nested-loops-over-the-same-array-are-usually-o-n-2",
  title: "Why Nested Loops Over the Same Array Are Usually O(n²)",
  difficulty: "medium",
  category: "complexity",
  order: 1037,
  description: `Consider the following pseudocode that iterates over an array of length **n** with two nested loops:

\`\`\`text
for i from 0 to n-1:
    for j from 0 to n-1:
        doConstantWork(arr[i], arr[j])
\`\`\`

And a common variation that avoids redundant pairs:

\`\`\`text
for i from 0 to n-1:
    for j from i+1 to n-1:
        doConstantWork(arr[i], arr[j])
\`\`\`

**Your task:** Explain, in detail, why both patterns produce **O(n²)** time complexity. Your answer should cover:

1. How to count the total number of iterations (work units) in each version.
2. The arithmetic or combinatorial reasoning behind the resulting formula.
3. Why the constant factor or lower-order terms are dropped in Big-O notation, and how that justifies calling both patterns O(n²).
4. At least one concrete example with a small value of n (e.g., n = 4) that illustrates the iteration count.
5. A brief note on when a nested-loop structure might *not* be O(n²) — give a concrete counterexample.
`,
  hints: [
    `Think about what happens to the inner loop: for each of the n iterations of the outer loop, how many times does the inner loop body execute?`,
    `For the triangular version (j starts at i+1), try writing out the number of inner iterations for each value of i and see if you recognize the sum.`,
    `Recall the formula for the sum 1 + 2 + 3 + … + (n−1) = n(n−1)/2, and think about how Big-O treats constant coefficients and lower-order terms.`,
    `For the counterexample, consider a nested loop where the inner loop does not depend on n at all, or where the inner loop variable is halved each time rather than incremented by one.`,
  ],
  modelAnswer: `## Why Nested Loops Over the Same Array Are Usually O(n²)

### 1. Counting Iterations in the Full Double Loop

\`\`\`text
for i from 0 to n-1:          ← runs n times
    for j from 0 to n-1:      ← runs n times for EACH i
        doConstantWork(...)
\`\`\`

For every one of the **n** iterations of the outer loop, the inner loop executes **n** times. The total number of calls to \`doConstantWork\` is:

\`\`\`
n × n = n²
\`\`\`

If \`doConstantWork\` takes O(1) time, the total time is **c · n²** for some constant c, which is **O(n²)**.

**Concrete example (n = 4):**

\`\`\`text
i=0: j=0,1,2,3  → 4 iterations
i=1: j=0,1,2,3  → 4 iterations
i=2: j=0,1,2,3  → 4 iterations
i=3: j=0,1,2,3  → 4 iterations
Total: 4 × 4 = 16 = 4²
\`\`\`

---

### 2. Counting Iterations in the Triangular (Half) Double Loop

\`\`\`text
for i from 0 to n-1:
    for j from i+1 to n-1:
        doConstantWork(...)
\`\`\`

Here the inner loop does fewer iterations depending on i:

| i | inner iterations |
|---|------------------|
| 0 | n−1              |
| 1 | n−2              |
| 2 | n−3              |
| … | …                |
| n−2 | 1              |
| n−1 | 0              |

The total work is:

\`\`\`
(n−1) + (n−2) + (n−3) + … + 1 + 0
  = n(n−1)/2
  = n²/2 − n/2
\`\`\`

**Concrete example (n = 4):**

\`\`\`text
i=0: j=1,2,3  → 3 iterations
i=1: j=2,3    → 2 iterations
i=2: j=3      → 1 iteration
i=3: (none)   → 0 iterations
Total: 3+2+1+0 = 6 = 4·3/2
\`\`\`

This uses the well-known arithmetic series formula:

\`\`\`
1 + 2 + … + (n−1) = n(n−1)/2
\`\`\`

---

### 3. Why Both Are O(n²): Dropping Constants and Lower-Order Terms

Big-O notation describes **asymptotic growth** — how the runtime scales as n grows large. The formal definition is:

> f(n) = O(g(n)) if there exist positive constants c and n₀ such that f(n) ≤ c · g(n) for all n ≥ n₀.

**Full loop:** Total work = n². This is already exactly n², so it is O(n²).

**Triangular loop:** Total work = n²/2 − n/2.
- The constant factor 1/2 is absorbed into the Big-O constant c.
- The lower-order term n/2 is dominated by n²/2 for large n and is dropped.
- Result: **O(n²)**.

Both versions differ only by a constant factor (2×), which is irrelevant in Big-O. As n grows, both grow **quadratically**.

\`\`\`text
n=10:    full=100,      triangular=45
n=100:   full=10,000,   triangular=4,950
n=1,000: full=1,000,000 triangular=499,500
\`\`\`

In all cases the triangular version does roughly half the work — a constant ratio — so the growth rate is identical.

---

### 4. When Nested Loops Are NOT O(n²)

Nested loops are **not** automatically O(n²). The key question is: *how does the inner loop's iteration count relate to n?*

**Counterexample A — Inner loop is constant:**
\`\`\`text
for i from 0 to n-1:
    for j from 0 to 9:      ← always exactly 10 iterations
        doConstantWork()
\`\`\`
Total work = 10n → **O(n)**.

**Counterexample B — Inner loop variable is halved (logarithmic inner loop):**
\`\`\`text
for i from 0 to n-1:
    j = n
    while j > 1:
        j = j / 2             ← halved each time → log₂(n) iterations
        doConstantWork()
\`\`\`
Total work = n · log₂(n) → **O(n log n)**.

**Counterexample C — Both loops are over different sizes:**
\`\`\`text
for i from 0 to n-1:
    for j from 0 to m-1:    ← m is independent of n
        doConstantWork()
\`\`\`
Total work = n · m → **O(nm)**, which is only O(n²) if m = O(n).

---

### Summary

| Pattern | Exact iterations | Big-O |
|---------|-----------------|-------|
| Full double loop | n² | O(n²) |
| Triangular loop | n(n−1)/2 | O(n²) |
| Constant inner loop | 10n | O(n) |
| Logarithmic inner loop | n·log n | O(n log n) |

The reason nested loops over the same array of size n are *usually* O(n²) is that both the outer and inner loop iteration counts scale with n, producing a product n·n = n². Constant factors and lower-order terms that arise from variations (like starting j at i+1) do not change this fundamental quadratic growth rate.`,
  keyPoints: [
    `Full double loop executes exactly n × n = n² inner iterations`,
    `Triangular loop (j starts at i+1) executes n(n−1)/2 inner iterations via the arithmetic series formula`,
    `n(n−1)/2 is O(n²) because the constant factor 1/2 and lower-order term are dropped in Big-O`,
    `Big-O captures asymptotic growth rate, ignoring constant multiples and lower-order terms`,
    `Both patterns differ by a factor of ~2 in actual work but share the same O(n²) complexity class`,
    `Concrete example with n=4: full loop = 16 iterations, triangular loop = 6 iterations`,
    `Nested loops are NOT always O(n²): a constant or logarithmic inner loop yields O(n) or O(n log n)`,
  ],
};

export default problem;
