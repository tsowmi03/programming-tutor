import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "the-master-theorem-for-solving-divide-and-conquer-recurrences",
  title: "Mastering the Master Theorem",
  difficulty: "hard",
  category: "complexity",
  order: 1042,
  description: `The **Master Theorem** is a recipe for solving divide-and-conquer recurrences of the form:

\`\`\`text
T(n) = a * T(n / b) + f(n),   where a >= 1, b > 1
\`\`\`

Here \`a\` is the number of subproblems, \`n/b\` is the size of each subproblem, and \`f(n)\` is the cost of dividing the problem and combining the results.

Write a thorough explanation that covers all of the following:

1. **State the three cases** of the Master Theorem precisely. Define the *critical exponent* \`c* = log_b(a)\` (i.e. \`n^{log_b a}\`), and explain how \`f(n)\` is compared against \`n^{c*}\` in each case. State the regularity condition required by Case 3.
2. **Give the asymptotic solution \`T(n)\`** produced by each case.
3. **Build intuition** using the recursion tree: explain what \`n^{log_b a}\` represents (the number of leaves / work at the bottom), and describe whether the total work is leaf-dominated, evenly spread across levels, or root-dominated in each case.
4. **Apply the theorem** to these recurrences, naming the case and giving the result:
   - \`T(n) = 2 T(n/2) + O(n)\`  (merge sort)
   - \`T(n) = 7 T(n/2) + O(n^2)\`  (Strassen's matrix multiplication)
   - \`T(n) = 2 T(n/2) + O(1)\`  (e.g. tree traversal)
   - \`T(n) = T(n/2) + O(1)\`  (binary search)
5. **Explain the gaps**: give at least one recurrence the Master Theorem *cannot* solve and explain precisely why (the gap between cases). Address the case \`T(n) = 2 T(n/2) + O(n log n)\` and how the extended (case-2-with-log) form or the Akra–Bazzi method handles it.

Use markdown. Be precise about the polynomial-factor separation required between \`f(n)\` and \`n^{log_b a}\`.`,
  hints: [
    `Always compute the critical exponent c* = log_b(a) first, then ask: does f(n) grow polynomially slower, the same, or polynomially faster than n^{c*}?`,
    `"Polynomially" matters: Case 1 needs f(n) = O(n^{c* - epsilon}) and Case 3 needs f(n) = Omega(n^{c* + epsilon}) for some epsilon > 0. A mere logarithmic factor is not a polynomial factor.`,
    `Think of the recursion tree: there are a^{log_b n} = n^{log_b a} leaves. Compare the work at the leaves to the work at the root to decide which dominates.`,
    `Case 3's regularity condition a*f(n/b) <= k*f(n) for some k < 1 ensures the per-level work actually shrinks geometrically toward the leaves.`,
  ],
  modelAnswer: `## Setup

We analyze recurrences of the form

\`\`\`text
T(n) = a * T(n/b) + f(n),   a >= 1, b > 1, f(n) > 0 eventually.
\`\`\`

The single most important quantity is the **critical exponent**

\`\`\`text
c* = log_b(a),   giving the watershed function n^{c*} = n^{log_b a}.
\`\`\`

Everything depends on comparing the *driving function* \`f(n)\` against \`n^{c*}\`.

## The Three Cases

**Case 1 — leaf-dominated (bottom-heavy).**
If \`f(n) = O(n^{c* - epsilon})\` for some constant \`epsilon > 0\`, then

\`\`\`text
T(n) = Theta(n^{log_b a}).
\`\`\`

The work to split/combine is *polynomially smaller* than the work at the leaves, so the leaves dominate.

**Case 2 — balanced (every level costs the same).**
If \`f(n) = Theta(n^{c*})\` (equivalently \`f(n) = Theta(n^{log_b a})\`), then

\`\`\`text
T(n) = Theta(n^{log_b a} * log n).
\`\`\`

Each of the \`Theta(log n)\` levels of the recursion tree contributes the same asymptotic amount, so we pick up a logarithmic factor.

*(Generalized Case 2.)* If \`f(n) = Theta(n^{c*} * (log n)^k)\` for some \`k >= 0\`, then \`T(n) = Theta(n^{c*} * (log n)^{k+1})\`.

**Case 3 — root-dominated (top-heavy).**
If \`f(n) = Omega(n^{c* + epsilon})\` for some constant \`epsilon > 0\`, **and** the *regularity condition*

\`\`\`text
a * f(n/b) <= k * f(n)   for some constant k < 1 and all large n
\`\`\`

holds, then

\`\`\`text
T(n) = Theta(f(n)).
\`\`\`

The split/combine cost is polynomially larger than the leaf work; the regularity condition guarantees the per-level cost decreases geometrically going down the tree, so the root's \`f(n)\` dominates.

## Recursion-Tree Intuition

Expand the tree:
- Level 0 (root): \`1\` node, cost \`f(n)\`.
- Level i: \`a^i\` nodes, each of size \`n/b^i\`, cost \`a^i * f(n/b^i)\`.
- Bottom level (\`i = log_b n\`): \`a^{log_b n} = n^{log_b a} = n^{c*}\` leaves, each costing \`Theta(1)\`.

So \`n^{c*}\` literally counts the **leaves** (the total base-case work). The Master Theorem compares this leaf cost \`n^{c*}\` against the root cost \`f(n)\`:
- If leaf cost wins polynomially → **Case 1**, answer \`n^{c*}\`.
- If they tie at every level → **Case 2**, answer \`n^{c*} log n\` (sum over \`log n\` equal levels).
- If root cost wins polynomially (and shrinks geometrically downward) → **Case 3**, answer \`f(n)\`.

The geometric series is decreasing toward the leaves in Case 3, increasing toward the leaves in Case 1, and constant in Case 2.

## Worked Applications

**1. Merge sort: \`T(n) = 2 T(n/2) + O(n)\`.**
\`a = 2, b = 2\`, so \`c* = log_2 2 = 1\`, watershed \`n^1 = n\`. Here \`f(n) = Theta(n) = Theta(n^{c*})\` → **Case 2**. Therefore \`T(n) = Theta(n log n)\`.

**2. Strassen: \`T(n) = 7 T(n/2) + O(n^2)\`.**
\`a = 7, b = 2\`, so \`c* = log_2 7 ≈ 2.807\`. Watershed \`n^{2.807}\`. Here \`f(n) = Theta(n^2) = O(n^{2.807 - epsilon})\` (with e.g. \`epsilon ≈ 0.8\`) → **Case 1**. Therefore \`T(n) = Theta(n^{log_2 7}) ≈ Theta(n^{2.807})\`. (Compare naive \`Theta(n^3)\`.)

**3. Tree-size / postorder traversal: \`T(n) = 2 T(n/2) + O(1)\`.**
\`a = 2, b = 2\`, \`c* = 1\`, watershed \`n\`. Here \`f(n) = Theta(1) = O(n^{1 - epsilon})\` (e.g. \`epsilon = 1\`) → **Case 1**. Therefore \`T(n) = Theta(n)\`. Intuition: the leaves dominate; constant combine work cannot beat linear leaf count.

**4. Binary search: \`T(n) = T(n/2) + O(1)\`.**
\`a = 1, b = 2\`, \`c* = log_2 1 = 0\`, watershed \`n^0 = 1\`. Here \`f(n) = Theta(1) = Theta(n^0)\` → **Case 2**. Therefore \`T(n) = Theta(n^{0} * log n) = Theta(log n)\`.

## The Gaps — When the Theorem Fails

The Master Theorem (classic three-case form) requires a **polynomial** separation, i.e. a factor of \`n^{epsilon}\` for fixed \`epsilon > 0\`. Several situations fall into the cracks:

- **\`T(n) = 2 T(n/2) + O(n log n)\`.** Here \`c* = 1\`, so we compare \`f(n) = n log n\` with \`n^1\`. We have \`f(n)/n^{c*} = log n\`, which grows, so we are *not* in Case 2 (no exact \`Theta(n)\`). But \`n log n\` is **not** \`Omega(n^{1+epsilon})\` for any \`epsilon > 0\` (a log factor is asymptotically smaller than any positive power \`n^{epsilon}\`), so Case 3 does **not** apply either. The function sits in the gap *just above* Case 2. The **generalized Case 2** (with \`k = 1\`) does handle it: \`f(n) = Theta(n^{c*} (log n)^1)\` gives \`T(n) = Theta(n (log n)^2)\`. Equivalently, the **Akra–Bazzi** method gives the same answer by integrating \`f(u)/u^{p+1}\`.

- **A clean non-Master example: \`T(n) = 2 T(n/2) + n / log n\`.** Now \`f(n)/n^{c*} = 1/log n\` → 0, but \`f(n)\` is not \`O(n^{1-epsilon})\` for any \`epsilon > 0\` (it is bigger than every such power). So it is in the gap *just below* Case 2, and none of the three classic cases apply. (Akra–Bazzi yields \`T(n) = Theta(n log log n)\`.)

- **Non-polynomial / ill-behaved \`f\`** (e.g. oscillating \`f\`, or recurrences where the regularity condition of Case 3 fails) also escape the theorem; Akra–Bazzi or direct recursion-tree summation is then required.

**Summary:** compute \`c* = log_b a\`; classify \`f(n)\` versus \`n^{c*}\` by a *polynomial* margin; remember that logarithmic gaps (\`f = n^{c*} log^k n\` or \`f = n^{c*}/log n\`) are exactly where the classic three cases break, and reach for the generalized Case 2 or Akra–Bazzi there.`,
  keyPoints: [
    `Defines the critical exponent c* = log_b(a) and the watershed function n^{log_b a} as the central comparison.`,
    `States Case 1: f(n) = O(n^{c* - epsilon}) for some epsilon>0 ⇒ T(n) = Theta(n^{log_b a}) (leaf-dominated).`,
    `States Case 2: f(n) = Theta(n^{c*}) ⇒ T(n) = Theta(n^{log_b a} log n) (balanced), and mentions the generalized log^k form.`,
    `States Case 3: f(n) = Omega(n^{c* + epsilon}) PLUS the regularity condition a·f(n/b) <= k·f(n), k<1 ⇒ T(n) = Theta(f(n)) (root-dominated).`,
    `Explains the recursion tree: a^{log_b n} = n^{log_b a} counts the leaves; compares leaf cost vs root cost to decide dominance.`,
    `Correctly solves merge sort (Case 2 ⇒ n log n) and Strassen (Case 1 ⇒ n^{log_2 7} ≈ n^2.807).`,
    `Correctly solves T(n)=2T(n/2)+O(1) (Case 1 ⇒ Theta(n)) and binary search (Case 2 with c*=0 ⇒ Theta(log n)).`,
    `Stresses the polynomial-margin requirement: a log factor is not an n^epsilon factor.`,
    `Identifies T(n)=2T(n/2)+O(n log n) as falling in the gap above Case 2, resolved by generalized Case 2 / Akra–Bazzi to Theta(n log^2 n).`,
    `Gives a concrete recurrence the theorem cannot solve (e.g. n/log n driving term) and names Akra–Bazzi as the general tool.`,
  ],
};

export default problem;
