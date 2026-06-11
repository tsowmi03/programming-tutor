import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "amortized-analysis-using-dynamic-array-growth",
  title: "Amortized Analysis of Dynamic Array Growth",
  difficulty: "medium",
  category: "complexity",
  order: 1037,
  description: `## Dynamic Arrays and the Cost of Growing

A **dynamic array** (e.g., Python \`list\`, Java \`ArrayList\`, C++ \`vector\`) appears to support O(1) \`append\` operations, yet internally it must occasionally copy all its elements into a larger buffer — an operation that clearly takes O(n) time.

Consider the following growth strategy: the array starts with capacity 1. Whenever a new element is inserted and the array is full, a new buffer of **double the current capacity** is allocated and all existing elements are copied over before the new element is added.

**Your task:** Explain the concept of **amortized analysis** and use it to prove that, under the doubling strategy described above, a sequence of *n* \`append\` operations has an **O(n) total cost**, giving an **O(1) amortized cost per operation**.

Your answer should cover:
1. What amortized analysis means and why worst-case per-operation analysis is misleading here.
2. A concrete accounting (aggregate, banker's, or physicist's method — choose at least one) that shows the total work across *n* appends is O(n).
3. Why a **constant-factor growth** strategy (e.g., always double) is crucial — explain what goes wrong if the array grows by only a **fixed constant** (e.g., +1 or +10) instead.
4. Any trade-offs the doubling strategy makes (time vs. space).`,
  hints: [
    `Think about how often a resize actually happens. After a resize to capacity c, you can do at least c/2 cheap appends before the next resize. How does that ratio affect the average cost?`,
    `Try the aggregate method: list every resize event for n appends (capacities 1, 2, 4, 8, …) and add up the total number of element copies across all resizes. Does that sum look like a familiar series?`,
    `For the fixed-increment comparison, ask yourself: if the capacity grows as d, 2d, 3d, … up to n, what is the total copy work? Compare that series to the geometric one from doubling.`,
    `For the banker's method, imagine each append 'pre-pays' a small constant number of tokens. Can you set that constant so that whenever a resize occurs, the saved tokens exactly cover the cost of copying?`,
  ],
  modelAnswer: `## Amortized Analysis of Dynamic Array Growth

### 1. What Is Amortized Analysis?

Worst-case analysis asks: *how expensive can a single operation be?* For a dynamic array \`append\`, the answer is O(n) — if the buffer is full we must copy n elements. But this expensive case is **rare**. Most appends simply write one element in O(1).

**Amortized analysis** asks instead: *what is the average cost per operation over a long sequence?* Crucially, this is not a probabilistic average — it is a **guaranteed worst-case bound on the total cost divided by the number of operations**. If n operations cost T(n) in total (worst case), each operation is said to have an amortized cost of T(n)/n.

---

### 2. Aggregate Method — Counting Total Copies

Suppose we perform n \`append\` operations starting from an empty array with capacity 1, doubling on overflow.

**Capacities at each resize:** 1 → 2 → 4 → 8 → … → 2^k where 2^k ≥ n.

**Cost of each copy event:** When capacity grows from 2^(i-1) to 2^i, we copy 2^(i-1) elements.

**Total copy work:**
\`\`\`
Σ (copies at each resize) = 1 + 2 + 4 + 8 + … + 2^(k-1)
                          = 2^k - 1
                          < 2n          (since 2^k < 2n)
\`\`\`

Each of the n appends also does 1 unit of write work, contributing n total.

**Grand total work ≤ n (writes) + 2n (copies) = 3n = O(n)**

Dividing by n operations: **amortized cost per append = O(1)**. ✓

---

### 3. Banker's Method (Accounting / Token Argument)

Assign each \`append\` a **credit of 3 tokens** (a constant amortized charge):
- 1 token pays for writing the new element.
- 2 tokens are saved on the new element as a "future copy" reserve.

**Invariant:** every element in the second half of the current buffer holds 2 saved tokens.

When a resize occurs (capacity = c, so c/2 elements are in the second half):
- The c/2 elements in the second half collectively hold c tokens.
- Copying all c elements costs exactly c tokens.
- The reserve covers the copy — **no extra charge needed**.

Since every operation is charged a constant 3 tokens, the total charge for n appends is 3n = O(n), confirming O(1) amortized cost.

---

### 4. Why a Fixed-Constant Growth Strategy Fails

Suppose instead we grow the array by a fixed amount \`d\` (e.g., d = 1 or d = 10) each time it overflows.

Resizes happen at sizes d, 2d, 3d, …, n. Copy costs are d + 2d + 3d + … + (n/d)·d.

\`\`\`
Total copies = d · (1 + 2 + 3 + … + n/d)
             = d · (n/d)(n/d + 1)/2
             ≈ n²/(2d)
             = O(n²)
\`\`\`

This gives **O(n) amortized cost per append** — linear, not constant. For large n, this is catastrophically slow. The geometric (doubling) strategy is essential because the geometric series 1 + 2 + 4 + … converges to a linear sum, while the arithmetic series does not.

---

### 5. Trade-offs of the Doubling Strategy

| Concern | Detail |
|---|---|
| **Wasted space** | After a resize, up to half the allocated capacity may be unused. Worst case: ~50% space overhead. |
| **Shrinking** | Naive doubling never frees memory. A good implementation shrinks (e.g., halve capacity when array is 25% full) — but must use a different threshold to avoid thrashing. |
| **Growth factor choice** | Some libraries use 1.5× instead of 2× to reduce peak memory at a slight cost increase. The amortized bound holds for any constant factor > 1. |
| **Occasional latency spike** | A single resize is O(n); applications needing consistent latency (real-time systems) may prefer linked structures or pre-allocated pools. |

---

### Summary

- Amortized analysis distributes the cost of rare expensive operations over many cheap ones.
- Doubling strategy: n appends cost O(n) total → **O(1) amortized per append**.
- Fixed-increment growth costs O(n²) total → O(n) amortized — avoid it.
- Trade-off: up to ~50% wasted space in exchange for fast appends.`,
  keyPoints: [
    `Defines amortized analysis as worst-case total cost divided by number of operations (not a probabilistic average)`,
    `Shows total copy work under doubling is a geometric series summing to < 2n, so total work is O(n)`,
    `Correctly concludes O(1) amortized cost per append`,
    `Explains or applies at least one formal method: aggregate, banker's (token/accounting), or physicist's (potential)`,
    `Explains why fixed-increment growth leads to O(n²) total work (arithmetic series) vs. O(n) for geometric growth`,
    `Identifies the space trade-off: up to ~50% unused capacity after a resize`,
    `Notes that any constant growth factor > 1 preserves the O(1) amortized bound`,
  ],
};

export default problem;
