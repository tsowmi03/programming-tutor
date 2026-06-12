import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "the-difference-between-time-and-space-complexity",
  title: "Time Complexity vs. Space Complexity",
  difficulty: "easy",
  category: "complexity",
  order: 1034,
  description: `In your own words, explain the difference between **time complexity** and **space complexity**.

Your answer should cover:
- What each type of complexity measures.
- How Big-O notation is used to express both.
- A concrete example algorithm (or pair of algorithms) that illustrates a situation where the two complexities differ — for instance, a trade-off where using more memory makes the algorithm faster.
- Why both metrics matter when evaluating an algorithm.`,
  hints: [
    `Think about two different 'resources' a computer program consumes as it runs.`,
    `Consider an algorithm like computing the Fibonacci sequence — how does a naive recursive version compare to one that stores previously computed results?`,
    `Ask yourself: if you had unlimited memory, could you always make an algorithm faster? What would the cost be?`,
    `Remember that Big-O describes how resource usage *scales* with input size n, not the exact amount used.`,
  ],
  modelAnswer: `## Time Complexity vs. Space Complexity

### What They Measure

**Time complexity** measures *how the number of operations an algorithm performs grows* as the size of the input (\`n\`) increases. It answers the question: "How much longer will this take if the input doubles?"

**Space complexity** measures *how much additional memory an algorithm needs* as the size of the input grows. It answers the question: "How much more RAM will this use if the input doubles?"

Neither metric measures an exact number of seconds or bytes — they describe *scaling behavior*.

---

### Big-O Notation for Both

Big-O notation is used the same way for both:

| Notation | Meaning |
|---|---|
| O(1) | Constant — doesn't grow with input |
| O(log n) | Logarithmic growth |
| O(n) | Linear — grows proportionally to input |
| O(n²) | Quadratic — grows with the square of input |

Example:
- A simple loop over an array: **O(n) time, O(1) space** (no extra memory needed).
- Copying an array into a new array: **O(n) time, O(n) space**.

---

### A Classic Trade-Off: Fibonacci

**Naive recursion:**
\`\`\`text
fib(n) calls fib(n-1) and fib(n-2), each of which calls two more, etc.
Time:  O(2^n)  — exponential, because subproblems are recomputed repeatedly
Space: O(n)    — the call stack depth reaches n
\`\`\`

**Memoization (caching results):**
\`\`\`text
Store fib(k) in a table the first time it's computed; look it up on future calls.
Time:  O(n)  — each subproblem is solved exactly once
Space: O(n)  — the table holds one entry per value from 0 to n
\`\`\`

Here, we *traded nothing* — space stayed O(n) and time improved dramatically from O(2^n) to O(n). This illustrates that extra memory can eliminate redundant work.

**Iterative (two variables):**
\`\`\`text
Keep only the last two computed values at any time.
Time:  O(n)  — one loop
Space: O(1)  — only two variables regardless of n
\`\`\`

The iterative version is the best of both worlds here, but that is not always possible.

---

### Why Both Matter

- **Time** matters because users notice slowness. An O(n²) algorithm on a million items performs a trillion operations — far too slow.
- **Space** matters because memory is finite. An algorithm that caches a terabyte of data to save a second of compute time is impractical on most machines.
- In many real-world problems there is a genuine **time-space trade-off**: you can use more memory to precompute results and answer queries faster (e.g., lookup tables, hash maps), or use less memory at the cost of recomputing values.

A good engineer considers *both* dimensions when choosing or designing an algorithm.`,
  keyPoints: [
    `Time complexity counts how operations scale with input size n.`,
    `Space complexity counts how extra memory usage scales with input size n.`,
    `Both are expressed using Big-O notation.`,
    `A concrete example (e.g., Fibonacci memoization, lookup tables) is given to illustrate the difference.`,
    `The concept of a time-space trade-off is explained.`,
    `Both metrics matter because computational resources (CPU and RAM) are finite.`,
  ],
};

export default problem;
