import type { ExplanationProblemDef } from "../types";

export const whenBinarySearchApplies: ExplanationProblemDef = {
  type: "explanation",
  slug: "when-binary-search-applies",
  title: "When Does Binary Search Apply?",
  difficulty: "medium",
  category: "binary-search",
  order: 3,
  description: `Binary search is taught on sorted arrays, but its real applicability is wider — and subtler.

Your answer should cover:

1. The *actual* precondition for binary search (hint: it's about a predicate, not about "the array is sorted").
2. An example of binary searching something that isn't a sorted array — e.g. "binary search on the answer". Sketch how it works.
3. Why binary search on a linked list is pointless even if the list is sorted.
4. The classic implementation pitfalls (give at least two and how to avoid them).
`,
  hints: [
    "Picture a row of answers to a yes/no question looking like FFFF…TTTT. What does binary search find?",
    "“What is the minimum speed at which I can finish in time?” — how is that a binary search?",
  ],
  modelAnswer: `**The real precondition: a monotonic predicate.** Binary search needs a yes/no question over an ordered domain whose answers form a pattern like \`F F F F T T T T\` — false up to some boundary, true forever after (or vice versa). Binary search finds that **boundary** in O(log n) probes, because one probe anywhere tells you which side the boundary is on, discarding half the domain. "Sorted array containing target" is merely the special case where the predicate is \`a[i] >= target\`. Sortedness is *one way* to get monotonicity — not the requirement itself.

**Binary search on the answer.** Often the *answer to an optimisation problem* is the ordered domain. Example (LeetCode's Koko Eating Bananas pattern): find the minimum eating speed k to finish piles within h hours. Key observation: "can finish at speed k" is **monotonic** — if speed k works, every faster speed works too. So:

1. Bound the answer: lo = 1, hi = max pile.
2. For a candidate k, *check feasibility* by simulating (O(n)).
3. Feasible → search lower half (keep k as candidate); infeasible → search upper.

Result: O(n log(range)) for a problem with no array to sort in sight. The reusable recipe: **monotonic feasibility check ⇒ binary search the answer space.** ("Minimum capacity to ship in D days", "minimum largest-sum split", … all the same shape.)

**Why not on linked lists.** Binary search's win comes from O(1) *random access* — jumping straight to the midpoint. A linked list needs O(n/2) pointer hops just to reach the middle, so each "halving" costs linear time: O(n) total (worse constants than a plain scan). The log only survives when jumping is free. (Skip lists exist precisely to graft O(log n) jumping onto linked structures.)

**Classic pitfalls.**

- **Infinite loop from non-shrinking bounds:** with \`lo < hi\` and \`hi = mid\`, computing mid *rounded up* when searching the upper boundary (or \`lo = mid\` with rounding down) re-tests the same index forever. Fix: ensure every branch strictly shrinks the window, and match the mid-rounding to the branch structure.
- **Off-by-one at the boundary:** confusing "first true" with "last false", or using \`lo <= hi\` vs \`lo < hi\` inconsistently with how lo/hi are updated. Fix: pick one invariant (e.g. "answer always within [lo, hi]"), write it down, and check each branch preserves it.
- **Midpoint overflow** in fixed-width languages: \`(lo + hi) / 2\` can overflow; use \`lo + (hi - lo) / 2\`.
- **Unverified monotonicity:** if the predicate isn't actually monotonic, binary search converges confidently to nonsense. Prove "if k works then k+1 works" first.
`,
  keyPoints: [
    "True precondition: monotonic predicate (FFFF…TTTT) over an ordered domain; sortedness is a special case",
    "Binary search on the answer: bound the range, binary search with a feasibility check (monotone in the candidate)",
    "Linked lists lose O(1) random access, so midpoint jumps cost O(n) — the log dies",
    "Pitfalls: non-shrinking bounds/infinite loops, first-true vs last-false off-by-ones, midpoint overflow",
    "Always argue monotonicity before trusting the search",
  ],
};
