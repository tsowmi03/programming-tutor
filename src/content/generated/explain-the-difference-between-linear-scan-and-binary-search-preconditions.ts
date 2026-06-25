import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "explain-the-difference-between-linear-scan-and-binary-search-preconditions",
  title: "Linear Scan vs Binary Search: What Do They Each Require?",
  difficulty: "easy",
  category: "complexity",
  order: 1055,
  description: `## Linear Scan vs Binary Search

Two of the most fundamental search algorithms are **linear scan** (also called linear search) and **binary search**. They can both find a target value in a collection, but they have very different requirements and performance characteristics.

**Your task:** Explain the following in your own words:

1. How does a **linear scan** work, and what preconditions (if any) does it require on the input?
2. How does **binary search** work, and what preconditions does it *strictly* require on the input?
3. What is the time complexity of each algorithm (best case, worst case), and why?
4. Give a concrete example of a situation where you **cannot** use binary search but **can** use linear scan — and explain why.
5. Give a concrete example of a situation where binary search is clearly the better choice, and explain the trade-off.
`,
  hints: [
    `Think about what information you need to know about the data *before* you start searching with each algorithm.`,
    `Consider what happens when binary search looks at the middle element — why does the data need to be sorted for this decision to be correct?`,
    `Random access means jumping to any index in O(1). Which data structures support this, and which don't?`,
    `Think about the trade-off between the cost of sorting once versus the savings on many subsequent searches.`,
  ],
  guidance: [
    {
      "title": "Start with the mechanics",
      "body": "Before comparing the two, make sure you can clearly describe *how* each one works step by step. Walk through a small example array (say, 5 elements) searching for a target using each method.",
      "level": "nudge"
    },
    {
      "title": "Identify the decision binary search makes",
      "body": "When binary search looks at the middle element and it's smaller than the target, it throws away the entire left half. Ask yourself: **why is it safe to throw away that half?** What property of the data guarantees the target can't be there?",
      "level": "nudge"
    },
    {
      "title": "Think about random access as a hidden precondition",
      "body": "Sorting is the obvious precondition for binary search, but there's a subtler one: you need to reach the *middle* element cheaply. In an array this is O(1). In a singly-linked list, finding the middle takes O(n). This makes binary search impractical on linked lists even if they are sorted.",
      "level": "strategy"
    },
    {
      "title": "Frame the trade-off quantitatively",
      "body": "To justify the cost of sorting (O(n log n)), think about how many searches (k) you'll perform. If each binary search saves O(n) − O(log n) ≈ O(n) comparisons versus linear scan, and sorting costs O(n log n), then after roughly O(log n) searches the investment breaks even. For large datasets with many queries, binary search is almost always worth it.",
      "level": "strategy"
    },
    {
      "title": "Structure your answer around: preconditions → complexity → examples",
      "body": "A strong answer follows this shape:\n\n```\n1. Linear scan\n   - How it works (iterate, compare)\n   - Preconditions: none\n   - O(1) best / O(n) worst\n\n2. Binary search\n   - How it works (halve the range each step)\n   - Preconditions: sorted data + O(1) random access\n   - O(1) best / O(log n) worst\n\n3. Example favoring linear scan\n   - Unsorted data OR linked-list structure\n\n4. Example favoring binary search\n   - Large sorted array, many lookups\n   - Quantify the difference (e.g., 20 steps vs 1,000,000)\n```",
      "level": "pseudocode"
    }
  ],

  modelAnswer: `## Linear Scan

A linear scan simply iterates through every element in a collection from start to finish, comparing each one to the target until a match is found or the collection is exhausted.

**Preconditions:** None. The collection can be in any order — sorted, unsorted, or even containing duplicates. Linear scan works on any iterable structure (array, linked list, stream, etc.).

**Time Complexity:**
- **Best case:** O(1) — the target is the very first element.
- **Worst case:** O(n) — the target is the last element, or not present at all.
- **Average case:** O(n) — on average, you inspect half the elements.

---

## Binary Search

Binary search works by repeatedly halving the search space. It looks at the **middle** element of the current range:
- If the middle element equals the target → found!
- If the middle element is less than the target → search the right half.
- If the middle element is greater than the target → search the left half.

This halving continues until the target is found or the range is empty.

**Preconditions (strict):**
1. **The collection must be sorted** (in a consistent, known order — ascending or descending).
2. **Random access must be possible** — you need to jump directly to the middle element in O(1) time. This is why binary search works naturally on arrays but not on linked lists (which require O(n) to reach the middle).

**Time Complexity:**
- **Best case:** O(1) — the target happens to be the middle element on the first check.
- **Worst case:** O(log n) — each step halves the remaining elements, so after at most log₂(n) steps the search space is exhausted.
- **Average case:** O(log n).

---

## When You CANNOT Use Binary Search

**Example:** You receive a live stream of user IDs as they log in. The IDs arrive in no particular order, and you need to check if a specific ID has already appeared.

Binary search is impossible here because the data is **unsorted** (and continuously growing). A linear scan through the so-far-received IDs is the straightforward fallback (though a hash set would be even better for repeated lookups).

---

## When Binary Search Is Clearly Better

**Example:** A sorted array of 1,000,000 product prices, and you need to check if a given price exists.

- Linear scan: up to 1,000,000 comparisons (O(n)).
- Binary search: at most ~20 comparisons (log₂(1,000,000) ≈ 20) — O(log n).

The trade-off is that binary search requires the array to be **pre-sorted**. Sorting costs O(n log n) upfront, but if you perform many searches on the same data, binary search pays off quickly.

---

## Summary Table

| | Linear Scan | Binary Search |
|---|---|---|
| Precondition | None | Sorted + random access |
| Best case | O(1) | O(1) |
| Worst case | O(n) | O(log n) |
| Works on unsorted data? | ✅ Yes | ❌ No |
| Works on linked lists? | ✅ Yes | ❌ Inefficient |
`,
  keyPoints: [
    `Linear scan requires no preconditions on the input order`,
    `Binary search strictly requires the collection to be sorted`,
    `Binary search also requires O(1) random access (e.g., arrays, not linked lists)`,
    `Linear scan is O(n) worst case; binary search is O(log n) worst case`,
    `Both have O(1) best case (target found immediately)`,
    `Can identify a concrete scenario where binary search is impossible due to unsorted data`,
    `Can explain the sorting trade-off: sorting costs O(n log n) but enables O(log n) searches`,
  ],
};

export default problem;
