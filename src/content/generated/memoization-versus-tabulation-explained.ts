import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "memoization-versus-tabulation-explained",
  title: "Memoization vs. Tabulation: Two Faces of Dynamic Programming",
  difficulty: "easy",
  category: "recursion-dp",
  order: 1139,
  description: `Dynamic Programming (DP) is a technique for solving problems by breaking them into overlapping subproblems and storing results to avoid redundant computation. There are two classic ways to implement DP:

1. **Memoization** (top-down)
2. **Tabulation** (bottom-up)

Using the Fibonacci sequence as a concrete example (\`fib(n) = fib(n-1) + fib(n-2)\`, with \`fib(0) = 0\`, \`fib(1) = 1\`), explain **both** approaches in depth. Your answer should cover:

- How each approach works conceptually
- How each approach handles subproblem storage (the "memo table" vs. the DP array)
- The order in which subproblems are solved
- Space and time complexity for each
- At least one concrete advantage and one concrete disadvantage of each
- When you would prefer one over the other

You do **not** need to write runnable code, but short pseudocode or code snippets are encouraged to illustrate your points.`,
  hints: [
    `Think about the direction of computation: does memoization start from the big problem or the small base cases? What about tabulation?`,
    `Consider what data structure each approach uses to store already-computed answers, and how that structure is accessed.`,
    `Recursion is the engine of memoization — what are the practical consequences of deep recursion (e.g., fib(10000))?`,
    `For space complexity, ask: does tabulation need to remember *all* previous Fibonacci values, or just the last two? Can memoization do the same trick easily?`,
  ],
  modelAnswer: `## Memoization (Top-Down DP)

### How it works
Memoization starts from the **original problem** and recurses downward toward base cases — exactly like a normal recursive solution — but caches ("memoizes") each subproblem's result the first time it is computed. On subsequent calls with the same argument, the cached value is returned immediately instead of recomputing.

### Fibonacci example
\`\`\`python
cache = {}
def fib(n):
    if n <= 1:
        return n
    if n in cache:
        return cache[n]        # already solved — O(1) lookup
    cache[n] = fib(n-1) + fib(n-2)
    return cache[n]
\`\`\`
Without the cache, \`fib(5)\` recomputes \`fib(3)\` twice, \`fib(2)\` three times, etc., giving O(2ⁿ) time. With the cache, each unique value of \`n\` is computed exactly once → **O(n) time, O(n) space** (cache + call stack).

### Subproblem order
Subproblems are solved **on demand** — only those reachable from the original call are ever computed. The recursion tree is pruned automatically.

### Advantages
- Natural translation from a recursive definition; easy to reason about correctness.
- Only computes subproblems that are actually needed (lazy evaluation).

### Disadvantages
- Carries **call-stack overhead**; deep recursion can cause stack-overflow errors (e.g., \`fib(10000)\` in Python).
- Slightly slower in practice due to function-call and hash-lookup overhead.

---

## Tabulation (Bottom-Up DP)

### How it works
Tabulation starts from the **base cases** and iteratively fills in a table (array) in a predetermined order until reaching the target problem. No recursion is involved.

### Fibonacci example
\`\`\`python
def fib(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]   # every subproblem filled in order
    return dp[n]
\`\`\`
This is **O(n) time, O(n) space**. The space can even be reduced to O(1) by keeping only the last two values, since \`fib(i)\` depends only on \`fib(i-1)\` and \`fib(i-2)\`.

### Subproblem order
Subproblems are solved in a **fixed, explicit order** (smallest to largest). Every entry in the table is filled before it is needed.

### Advantages
- No recursion → no call-stack risk; handles very large \`n\` safely.
- Often faster in practice (simple loop, cache-friendly array access).
- Easier to apply space optimizations once the dependency pattern is clear.

### Disadvantages
- Requires you to determine the correct fill order upfront, which can be tricky for 2-D or graph-based DP.
- May compute subproblems that are never needed by the specific input (over-computation).

---

## Comparison Table

| Property | Memoization (top-down) | Tabulation (bottom-up) |
|---|---|---|
| Starting point | Original problem | Base cases |
| Mechanism | Recursion + cache | Iteration + table |
| Subproblem order | On-demand (lazy) | Explicit (eager) |
| Stack overflow risk | Yes (deep recursion) | No |
| Over-computation | No | Possible |
| Space optimization | Harder | Easier |
| Code style | Closer to math definition | More imperative |

---

## When to prefer each

- **Prefer memoization** when: the recursion structure is complex or not all subproblems are needed (e.g., game trees, irregular DAGs), or when it is easier to prove correctness top-down.
- **Prefer tabulation** when: \`n\` is large (stack depth concern), performance is critical, or you want to apply space optimizations.`,
  keyPoints: [
    `Memoization is top-down: starts from the target problem and recurses to base cases`,
    `Tabulation is bottom-up: starts from base cases and iterates up to the target problem`,
    `Both achieve O(n) time for Fibonacci by ensuring each subproblem is solved only once`,
    `Memoization stores results in a cache (often a hash map); tabulation fills an array in order`,
    `Memoization risks stack overflow for very deep recursion; tabulation does not`,
    `Tabulation is generally easier to space-optimize (e.g., rolling array for Fibonacci)`,
    `Memoization only computes needed subproblems (lazy); tabulation may compute extras (eager)`,
    `The choice often depends on the problem structure and performance constraints`,
  ],
};

export default problem;
