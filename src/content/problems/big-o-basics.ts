import type { ExplanationProblemDef } from "../types";

export const bigOBasics: ExplanationProblemDef = {
  type: "explanation",
  slug: "big-o-basics",
  title: "What Big-O Actually Means",
  difficulty: "easy",
  category: "complexity",
  order: 1,
  description: `In your own words, explain what **Big-O notation** describes and why it matters when comparing algorithms.

Your answer should cover:

1. What a statement like "this algorithm is O(n²)" actually claims.
2. Why constants and smaller terms are dropped (why O(2n + 10) is just O(n)).
3. The common classes — O(1), O(log n), O(n), O(n log n), O(n²) — with a one-line example of each.
4. A situation where the Big-O-better algorithm could still be the *slower* choice in practice.

Write as if explaining to a classmate who has written code before but never analysed it.
`,
  hints: [
    "Think about what happens as the input grows, not how fast one particular run is.",
    "For the last part: what do the dropped constants mean for small inputs?",
  ],
  modelAnswer: `**What it claims.** Big-O describes how an algorithm's cost (usually time, sometimes memory) **grows as the input size grows**. Saying an algorithm is O(n²) means: as the input gets large, the running time grows at most proportionally to the square of the input size. It is a statement about the *shape* of the growth curve, not about any single run being fast or slow.

**Why constants and small terms are dropped.** Big-O deliberately ignores constant factors and lower-order terms — O(2n + 10) is just O(n) — for two reasons. First, constants depend on hardware, language, and compiler, which we want to abstract away. Second, growth rate dominates everything once inputs get large: an n² algorithm with a tiny constant will still eventually lose to an n algorithm with a huge constant. Doubling the input doubles an O(n) algorithm's work, but quadruples an O(n²) one — *that* is the durable difference.

**The common classes:**

| Class | Growth when n doubles | Typical example |
|---|---|---|
| O(1) | unchanged | hash map lookup, array indexing |
| O(log n) | +1 step | binary search |
| O(n) | doubles | scanning an array once |
| O(n log n) | a bit more than doubles | good sorts (merge sort, heapsort) |
| O(n²) | quadruples | comparing all pairs, bubble sort |

**When the "worse" Big-O wins anyway.** For *small* inputs, the dropped constants are the whole story. Insertion sort (O(n²)) beats merge sort on arrays of a dozen elements — which is why production sort implementations switch to it below a size threshold. Similarly, a linear scan of 20 items often beats a hash map lookup once you account for hashing overhead and cache behaviour. Big-O tells you what happens *eventually*, and "eventually" may be bigger than your actual data.

A useful habit: state the Big-O, then sanity-check it against realistic input sizes before letting it pick your implementation.
`,
  keyPoints: [
    "Big-O describes growth of cost as input size grows — not the speed of one run",
    "Constants and lower-order terms are dropped because growth rate dominates at scale (and constants are machine-dependent)",
    "Correct examples for O(1), O(log n), O(n), O(n log n), O(n²)",
    "Doubling intuition: O(n) doubles, O(n²) quadruples, O(log n) adds a step",
    "For small inputs, constant factors can make the asymptotically worse algorithm faster in practice",
  ],
};
