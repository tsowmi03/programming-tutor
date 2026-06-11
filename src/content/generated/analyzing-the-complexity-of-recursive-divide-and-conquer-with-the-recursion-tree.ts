import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "analyzing-the-complexity-of-recursive-divide-and-conquer-with-the-recursion-tree",
  title: "Analyzing Divide-and-Conquer with the Recursion Tree Method",
  difficulty: "hard",
  category: "complexity",
  order: 1041,
  description: `The **recursion tree method** is a powerful technique for solving divide-and-conquer recurrences without memorizing the Master Theorem. In this problem you must *teach and apply* the method rigorously.

Your task is to write a thorough explanation that covers the following, in order:

1. **The general setup.** Explain what a recurrence of the form \`T(n) = a·T(n/b) + f(n)\` represents: what \`a\`, \`b\`, and \`f(n)\` mean for an actual divide-and-conquer algorithm, and what a recursion tree is (nodes, levels, cost per node, cost per level).

2. **Per-level accounting.** Derive, for a generic level \`i\` (root = level 0): the number of nodes, the subproblem size at that level, and the total work summed across that level. State the depth of the tree and explain the boundary/leaf level.

3. **Three worked analyses.** Build the recursion tree and derive a tight Θ-bound for each of these, showing the per-level sums and how you total them:
   - \`T(n) = 2·T(n/2) + Θ(n)\` (e.g. merge sort)
   - \`T(n) = 2·T(n/2) + Θ(n^2)\`
   - \`T(n) = 4·T(n/2) + Θ(n)\`
   For each, classify which of the three Master-Theorem-style regimes it falls into (root-dominated, balanced/equal, leaf-dominated) and explain *why* by comparing the level sums.

4. **A non-uniform-split case.** Explain how the recursion tree changes for \`T(n) = T(n/3) + T(2n/3) + Θ(n)\`, where subproblems have unequal sizes. Discuss why the tree is unbalanced, what the longest and shortest root-to-leaf paths are, and how you bound the total work to get Θ(n log n).

5. **Pitfalls.** Identify at least two common mistakes when using the recursion tree method (e.g. miscounting leaves, ignoring the floor/ceiling, assuming a geometric series dominates when it does not).

Write in clear prose with explicit summations. Use \`\`\`text fenced blocks for any tree diagrams or algebra.`,
  hints: [
    `At level i there are a^i nodes, each of size n/b^i, so the work on that level is a^i · f(n/b^i). Find a closed form for this as a function of i.`,
    `The tree has depth log_b(n). The number of leaves is a^(log_b n) = n^(log_b a). Compare the cost of the root level f(n) against the cost of the leaf level n^(log_b a).`,
    `Whether total work is Θ(root), Θ(f(n)·depth), or Θ(leaves) depends on whether the per-level costs form a decreasing, constant, or increasing geometric sequence.`,
    `For unequal splits like T(n/3)+T(2n/3)+Θ(n), every full level still costs Θ(n), and the tree depth ranges between log_3 n and log_{3/2} n — both Θ(log n).`,
  ],
  modelAnswer: `## 1. The general setup

A divide-and-conquer recurrence

\`\`\`text
T(n) = a · T(n/b) + f(n),   a ≥ 1, b > 1
\`\`\`

models an algorithm that:
- **divides** a problem of size \`n\` into \`a\` subproblems, each of size \`n/b\`;
- **recurses** on each subproblem (the \`a·T(n/b)\` term);
- spends \`f(n)\` extra work to split the input and combine the results (the *divide + combine* cost) at this level.

The **recursion tree** makes the cost explicit:
- The **root** represents the original call; its node cost is \`f(n)\`.
- Each node with subproblem size \`m\` has \`a\` children of size \`m/b\` and carries node cost \`f(m)\`.
- **Level \`i\`** (root = level 0) contains all nodes whose subproblem size is \`n/b^i\`.
- The **total running time** is the sum of *all* node costs over the whole tree, which we organize as the sum over levels of the per-level cost.

## 2. Per-level accounting

Because each node has \`a\` children, the number of nodes grows by a factor of \`a\` per level:

\`\`\`text
Level i:
  number of nodes      = a^i
  subproblem size      = n / b^i
  cost of ONE node     = f(n / b^i)
  TOTAL cost of level  = a^i · f(n / b^i)
\`\`\`

The recursion stops when the subproblem size reaches the base case, i.e. when \`n/b^i = 1\`, giving

\`\`\`text
depth = log_b(n)   (levels 0 .. log_b n)
\`\`\`

At the **leaf level** \`i = log_b n\` the number of nodes is

\`\`\`text
leaves = a^{log_b n} = n^{log_b a}
\`\`\`

Each leaf does Θ(1) work, so the leaf level contributes Θ(n^{log_b a}). The grand total is

\`\`\`text
T(n) = Θ(n^{log_b a}) + Σ_{i=0}^{log_b n - 1} a^i · f(n / b^i)
\`\`\`

The asymptotics are decided by comparing the per-level costs \`a^i·f(n/b^i)\` across levels — they typically form a geometric-like series whose behavior is decreasing, constant, or increasing.

## 3. Three worked analyses

### (a) T(n) = 2·T(n/2) + Θ(n)  — *balanced*
Here a=2, b=2, f(n)=n, so log_b a = 1.

\`\`\`text
Level i cost = 2^i · (n / 2^i) = n
\`\`\`

Every level costs exactly Θ(n). There are \`log_2 n + 1\` levels.

\`\`\`text
T(n) = Σ_{i=0}^{log n} n = n · (log n + 1) = Θ(n log n)
\`\`\`

Leaf cost = n^{log_2 2} = n, equal to the root cost n. The series is **constant** per level → **balanced regime** → multiply level cost by depth: **Θ(n log n)**.

### (b) T(n) = 2·T(n/2) + Θ(n²)  — *root-dominated*
a=2, b=2, f(n)=n², log_b a = 1.

\`\`\`text
Level i cost = 2^i · (n / 2^i)^2 = 2^i · n^2 / 4^i = n^2 · (1/2)^i
\`\`\`

These form a **decreasing geometric series** with ratio 1/2:

\`\`\`text
T(n) = n^2 · Σ_{i=0}^{log n} (1/2)^i ≤ n^2 · Σ_{i=0}^{∞} (1/2)^i = 2 n^2 = Θ(n^2)
\`\`\`

The root (n²) dominates everything below it; leaves contribute only Θ(n) ≪ n². This is the **root-dominated regime** → **Θ(n²)**.

### (c) T(n) = 4·T(n/2) + Θ(n)  — *leaf-dominated*
a=4, b=2, f(n)=n, log_b a = log_2 4 = 2.

\`\`\`text
Level i cost = 4^i · (n / 2^i) = n · 4^i / 2^i = n · 2^i
\`\`\`

These form an **increasing geometric series** with ratio 2, so the *last* (leaf) level dominates:

\`\`\`text
T(n) = n · Σ_{i=0}^{log n} 2^i = n · (2^{log n + 1} - 1) = Θ(n · 2^{log n}) = Θ(n · n) = Θ(n^2)
\`\`\`

Equivalently leaves = n^{log_2 4} = n², and n² ≫ f(n)=n, so the total is **Θ(n²)** dominated by the leaf level — the **leaf-dominated regime**.

### Summary of regimes
\`\`\`text
Compare f(n)  vs  n^{log_b a}:
  f(n) grows faster  → root-dominated  → Θ(f(n))            [case (b)]
  same order         → balanced        → Θ(f(n) · log n)     [case (a)]
  f(n) grows slower  → leaf-dominated  → Θ(n^{log_b a})      [case (c)]
\`\`\`

## 4. Non-uniform split: T(n) = T(n/3) + T(2n/3) + Θ(n)

Now the two subproblems have **different sizes** (n/3 and 2n/3), so the tree is **unbalanced**: branches that keep taking the \`·(2/3)\` factor are longer than branches taking \`·(1/3)\`.

Key observation — **each *fully populated* level still costs Θ(n)**. The combined size of all nodes at any level (before branches start hitting their base cases) is \`n\`, because the two children sizes sum to \`n/3 + 2n/3 = n\` at every split, and \`f\` is linear so node costs add up to the node sizes:

\`\`\`text
Level 0:  n
Level 1:  n/3 + 2n/3                 = n
Level 2:  n/9 + 2n/9 + 2n/9 + 4n/9   = n
...        (each level totals ≤ n)
\`\`\`

The **shortest** root-to-leaf path repeatedly multiplies by 1/3, reaching size 1 after \`log_3 n\` levels; the **longest** path multiplies by 2/3, reaching 1 after \`log_{3/2} n\` levels. Both are Θ(log n).

- **Upper bound:** Every level costs at most n, and there are at most \`log_{3/2} n = Θ(log n)\` levels, so \`T(n) ≤ n·log_{3/2} n = O(n log n)\`.
- **Lower bound:** For the first \`log_3 n\` levels the tree is completely full and each such level costs exactly n, giving \`T(n) ≥ n·log_3 n = Ω(n log n)\`.

Therefore **T(n) = Θ(n log n)** — the differing logarithm bases only change the constant, not the asymptotic class.

## 5. Common pitfalls

1. **Miscounting leaves.** The leaf count is \`a^{log_b n} = n^{log_b a}\`, *not* simply \`n\` or \`log n\`. Forgetting the exponent \`log_b a\` (as in case (c), where it is 2) leads to wrong leaf-dominated answers.
2. **Assuming the geometric series is dominated by the root.** Only when the per-level series is *decreasing* (ratio < 1) does the root term dominate. If the ratio is > 1 the *leaves* dominate; if it equals 1 you must multiply by the number of levels. You must actually compute the ratio \`a/b^{(power of f)}\`.
3. **Ignoring floors/ceilings.** Real recurrences use \`T(⌊n/b⌋)\` etc. For asymptotic Θ-bounds these can be dropped (a formal proof uses the substitution method or the Akra–Bazzi theorem), but assuming \`n\` is an exact power of \`b\` is only a convenience, not a proof.
4. **Stopping the sum too early / off-by-one in depth.** The number of levels is \`log_b n + 1\` (levels 0 through log_b n); using \`log_b n\` levels can drop the leaf contribution in a leaf-dominated case.
5. **Adding incomparable terms loosely.** In unbalanced trees, summing the *maximum* possible work per level over the *maximum* depth gives a valid upper bound but you still need a matching lower bound (full levels) to claim a tight Θ.`,
  keyPoints: [
    `Defines a, b, f(n) and explains the recursion tree (nodes, levels, per-node and per-level cost).`,
    `Derives level-i facts: a^i nodes, size n/b^i, level cost a^i·f(n/b^i), depth log_b n, leaves = n^{log_b a}.`,
    `Solves 2T(n/2)+Θ(n) as balanced → Θ(n log n) with constant per-level cost.`,
    `Solves 2T(n/2)+Θ(n²) as root-dominated (decreasing geometric series) → Θ(n²).`,
    `Solves 4T(n/2)+Θ(n) as leaf-dominated (increasing geometric series, n^{log2 4}=n²) → Θ(n²).`,
    `States the comparison rule: f(n) vs n^{log_b a} gives root-dominated / balanced / leaf-dominated.`,
    `Analyzes the unbalanced split T(n/3)+T(2n/3)+Θ(n): each level costs Θ(n), depth between log_3 n and log_{3/2} n, total Θ(n log n) with matching upper and lower bounds.`,
    `Lists pitfalls: miscounting leaves (n^{log_b a}), wrong assumption about which level dominates, floor/ceiling handling, off-by-one in depth.`,
    `Uses explicit summations / geometric-series reasoning rather than just quoting the Master Theorem.`,
  ],
};

export default problem;
