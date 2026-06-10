import type { ExplanationProblemDef } from "../types";

export const memoizationVsTabulation: ExplanationProblemDef = {
  type: "explanation",
  slug: "memoization-vs-tabulation",
  title: "Memoization vs Tabulation",
  difficulty: "medium",
  category: "recursion-dp",
  order: 3,
  description: `Dynamic programming is usually implemented one of two ways: **memoization** (top-down) or **tabulation** (bottom-up). Explain both.

Your answer should cover:

1. What property a problem needs before DP applies at all (name and explain the two classic conditions).
2. How memoization works mechanically, and what it adds to plain recursion.
3. How tabulation works mechanically, and how you decide the fill order.
4. The practical trade-offs: when would you pick each? (Think: code clarity, stack limits, subproblem coverage, space optimisation.)
5. Illustrate with Fibonacci or Climbing Stairs: show how the same recurrence appears in both styles.
`,
  hints: [
    "The two conditions: overlapping ________ and optimal ________.",
    "Memoization = recursion + a cache. Tabulation = solve smallest first, no recursion.",
    "One of the two styles only ever computes subproblems that are actually needed…",
  ],
  modelAnswer: `**When DP applies.** Two properties must hold:

- **Overlapping subproblems** — the naive recursion solves the *same* smaller instances repeatedly (fib(5) needs fib(3) twice; fib(4) needs it again). No overlap (e.g. mergesort's halves are disjoint) → caching buys nothing; that's plain divide-and-conquer.
- **Optimal substructure** — an optimal answer is composed of optimal answers to subproblems, so it's *valid* to combine cached sub-answers.

**Memoization (top-down).** Write the natural recursion, then add a cache keyed by arguments: on entry, return the cached value if present; otherwise compute, store, return. Each distinct subproblem is now computed once — for Fibonacci that's exponential → O(n). The recursion's *call structure* is untouched; you've only deduplicated work.

\`\`\`python
def fib(n, memo={0: 0, 1: 1}):
    if n not in memo:
        memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]
\`\`\`

**Tabulation (bottom-up).** Eliminate recursion: create a table indexed by subproblem, seed the base cases, and fill in an order that guarantees **dependencies are ready before they're read** — for fib, simply ascending. The fill order is read directly off the recurrence's arrows (cell a needs a−1 and a−2 ⇒ fill ascending; 2-D problems might fill row-by-row, by increasing interval length, etc.).

\`\`\`python
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
\`\`\`

**Trade-offs.**

- **Clarity:** memoization mirrors the recurrence as you derived it — usually the fastest to write correctly. Tabulation forces you to think about ordering.
- **Stack safety:** memoization recurses — depth ~n can overflow (Python's ~1000-frame default limit is hit easily). Tabulation is a loop; no such risk.
- **Subproblem coverage:** memoization computes **only reachable** subproblems — a big win when the state space is sparse. Tabulation fills the whole table regardless.
- **Space optimisation:** tabulation's explicit order enables dropping old rows — fib needs just two variables (O(1) space, as above). Caches can't easily do that.
- Constant factors mildly favour loops over function calls.

**Practical default:** derive the recurrence, prototype with memoization, convert to tabulation when you need stack safety or the rolling-window space saving.
`,
  keyPoints: [
    "DP needs overlapping subproblems + optimal substructure (and why each matters)",
    "Memoization = natural recursion + cache; each distinct subproblem computed once",
    "Tabulation = iterative table fill, ordered so dependencies are ready before use",
    "Trade-offs: memo only computes needed states but risks stack overflow; tabulation enables rolling-window space optimisation",
    "Same recurrence shown in both styles (e.g. Fibonacci O(1)-space loop)",
  ],
};
