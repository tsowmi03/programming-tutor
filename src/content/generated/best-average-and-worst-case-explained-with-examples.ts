import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "best-average-and-worst-case-explained-with-examples",
  title: "Best, Average, and Worst Case Complexity",
  difficulty: "medium",
  category: "complexity",
  order: 1036,
  description: `## Best, Average, and Worst Case Complexity

When we analyze the time complexity of an algorithm, a single Big-O expression isn't always the full story. The same algorithm can behave very differently depending on the specific input it receives.

Your task is to explain the three cases of algorithmic complexity — **best**, **average**, and **worst** — in your own words. Your answer should cover:

1. What each case means and how to identify it.
2. **Concrete examples** using at least two well-known algorithms (e.g., linear search, binary search, quicksort, insertion sort).
3. Why all three cases matter in practice, and when engineers focus on one over another.
4. The distinction between worst-case Big-O and average-case analysis (including an intuition for expected-case reasoning).
5. A brief note on what **amortized** analysis is and how it differs from per-operation worst-case analysis (use dynamic array resizing as your example).

Use specific Big-O expressions (e.g., O(1), O(log n), O(n), O(n²)) when describing each case.`,
  hints: [
    `Think about what 'best case' means for linear search — what value would you be searching for to hit it immediately?`,
    `For quicksort, what property of the chosen pivot determines whether you land in the best, average, or worst case?`,
    `Amortized analysis is about spreading the cost of rare expensive operations across many cheap ones — think about how often a dynamic array actually needs to resize.`,
    `Average-case analysis usually requires an assumption about the probability distribution of inputs — make sure to mention this in your answer.`,
  ],
  modelAnswer: `## Best, Average, and Worst Case Complexity

### What Are the Three Cases?

Algorithm complexity is not always a fixed number — it depends on the input. We capture this variability with three distinct analyses:

| Case | Meaning |
|---|---|
| **Best case** | The input that causes the algorithm to do the *least* work possible. |
| **Average case** | The expected work over a *typical* or *random* input, usually assuming a probability distribution. |
| **Worst case** | The input that causes the algorithm to do the *most* work possible. |

---

### Example 1: Linear Search

Linear search scans an array from left to right, returning when the target is found.

\`\`\`text
Array: [3, 7, 1, 9, 4],  target = ?
\`\`\`

- **Best case — O(1):** The target is the *first* element (target = 3). Only one comparison is needed.
- **Worst case — O(n):** The target is the *last* element or not in the array at all (target = 4 or target = 99). All *n* elements are checked.
- **Average case — O(n):** Assuming the target is equally likely to be at any position, on average it's found halfway through the array → roughly n/2 comparisons → **O(n)**.

Note that best and average/worst are in entirely different complexity classes here (O(1) vs O(n)).

---

### Example 2: Binary Search

Binary search works on a *sorted* array by repeatedly halving the search space.

\`\`\`text
Sorted array: [1, 3, 5, 7, 9, 11, 13],  target = ?
\`\`\`

- **Best case — O(1):** The target is exactly the *middle* element on the first check.
- **Worst case — O(log n):** The target is at either end or not present; the search space halves log₂(n) times before concluding.
- **Average case — O(log n):** Even on average, binary search takes O(log n) comparisons because the structure of the algorithm always halves the problem, regardless of where the target sits.

Here, best case is still O(1), but average and worst are both O(log n) — they don't differ by a complexity class.

---

### Example 3: Quicksort

Quicksort's complexity depends critically on **pivot choice**.

\`\`\`text
Array to sort: [5, 3, 8, 1, 9, 2, 7]
\`\`\`

- **Best case — O(n log n):** Every pivot chosen splits the array into two *equal halves*. The recursion tree has depth log n, and each level does O(n) work.
- **Average case — O(n log n):** With a random pivot, the expected split is "good enough" (not necessarily perfect). Probabilistic analysis shows the expected total work is still O(n log n).
- **Worst case — O(n²):** The pivot is always the *smallest* or *largest* element (e.g., already-sorted input with a naïve first-element pivot). One partition has size 0 and the other n−1; the recursion tree degenerates into a linear chain of n levels, each doing O(n) work.

\`\`\`text
Worst-case pivot choices on [1, 2, 3, 4, 5]:
  pivot=1 → [] and [2,3,4,5]   (depth 1)
  pivot=2 → [] and [3,4,5]     (depth 2)
  ...                           (depth n)
Total comparisons ≈ n + (n-1) + ... + 1 = O(n²)
\`\`\`

---

### Example 4: Insertion Sort

- **Best case — O(n):** The array is *already sorted*. Each new element only needs one comparison to confirm it's in place.
- **Worst case — O(n²):** The array is *reverse sorted*. Each new element must be compared and shifted past every previously sorted element.
- **Average case — O(n²):** On a random permutation, each element is shifted about halfway back on average → still O(n²).

---

### Why All Three Cases Matter

- **Worst case** is most commonly cited in Big-O notation because it provides a **guarantee** — no matter what input you receive, the algorithm won't exceed this bound. This is crucial for real-time systems and security-sensitive code.
- **Average case** matters when inputs are typically random or well-distributed. Quicksort is preferred in practice over mergesort (both O(n log n) average) because of lower constant factors, even though its worst case is worse.
- **Best case** is rarely the primary concern, but it can signal optimization opportunities. For example, insertion sort's O(n) best case makes it an excellent choice for nearly-sorted data.

---

### Average Case Requires Assumptions

Average-case analysis requires you to **assume a distribution over inputs**. Most analyses assume a uniform random distribution. If real-world inputs are skewed (e.g., nearly-sorted arrays fed to quicksort), the average-case guarantee may not hold. This is why algorithms like **randomized quicksort** (random pivot selection) are preferred — they make the algorithm's randomness independent of the input.

---

### Amortized Analysis: Spreading Costs Over Time

Amortized analysis is different from per-operation worst-case analysis. It asks: **what is the average cost per operation over a long sequence of operations**, even if some individual operations are expensive?

**Example: Dynamic Array (e.g., Python list / Java ArrayList)**

When a dynamic array runs out of capacity, it resizes by allocating a new array (typically 2× the size) and copying all elements. This single resize operation costs **O(n)**. But it happens rarely.

\`\`\`text
Capacity doublings for n = 16 insertions:
  Copy 1  element at size 1  → resize to 2
  Copy 2  elements at size 2  → resize to 4
  Copy 4  elements at size 4  → resize to 8
  Copy 8  elements at size 8  → resize to 16
  Total extra copies: 1+2+4+8 = 15 ≈ n
\`\`\`

Over *n* insertions, total copy work = O(n). Therefore, the **amortized cost per insertion = O(n) / n = O(1)**.

Amortized O(1) per \`append\` does **not** mean every append is O(1) in the worst case — it means that the *average* cost per operation, when spread across many operations, is O(1). This is a weaker but still very useful guarantee.

---

### Summary Table

| Algorithm | Best Case | Average Case | Worst Case |
|---|---|---|---|
| Linear Search | O(1) | O(n) | O(n) |
| Binary Search | O(1) | O(log n) | O(log n) |
| Quicksort | O(n log n) | O(n log n) | O(n²) |
| Insertion Sort | O(n) | O(n²) | O(n²) |
| Dynamic Array Append | O(1) | O(1) amortized | O(n) per-op |`,
  keyPoints: [
    `Best case: minimum work input; worst case: maximum work input; average case: expected work over a distribution of inputs`,
    `Linear search: best O(1), average/worst O(n) — all three differ in practical impact`,
    `Binary search: best O(1), average and worst both O(log n)`,
    `Quicksort: best/average O(n log n), worst O(n²) triggered by bad pivot choices (e.g., already-sorted input with first-element pivot)`,
    `Insertion sort: best O(n) for nearly-sorted data, average/worst O(n²)`,
    `Worst-case analysis provides an unconditional guarantee; average-case analysis requires assumptions about input distribution`,
    `Randomized algorithms (e.g., random-pivot quicksort) decouple performance from adversarial inputs`,
    `Amortized analysis measures average cost per operation over a sequence, not per-operation worst case`,
    `Dynamic array resizing: O(n) worst-case per append, but O(1) amortized because doublings are exponentially rare`,
  ],
};

export default problem;
