import type { ExplanationProblemDef } from "../types";

export const analyzingLoops: ExplanationProblemDef = {
  type: "explanation",
  slug: "analyzing-loops",
  title: "Analysing Loops and Nested Loops",
  difficulty: "medium",
  category: "complexity",
  order: 2,
  description: `Determine the time complexity of each snippet below, and explain *how you reason it out* — the method matters more than the answers.

**Snippet A**

\`\`\`python
total = 0
for i in range(n):
    for j in range(n):
        total += i * j
\`\`\`

**Snippet B**

\`\`\`python
total = 0
for i in range(n):
    for j in range(i):
        total += 1
\`\`\`

**Snippet C**

\`\`\`python
i = 1
while i < n:
    i = i * 2
\`\`\`

**Snippet D**

\`\`\`python
for i in range(n):        # phase 1
    do_constant_work()
for j in range(m):        # phase 2
    do_constant_work()
\`\`\`

Explain the general rules you used (nesting, sequencing, halving/doubling, dependent loop bounds).
`,
  hints: [
    "Count how many times the innermost line executes, as a function of n.",
    "In Snippet B the inner loop's length *depends on* i. Sum it: 0 + 1 + 2 + … + (n-1).",
    "In Snippet C, how many doublings does it take for 1 to reach n?",
  ],
  modelAnswer: `The universal method: **count how many times the innermost operation runs**, as a function of input size. Loop structure is just a recipe for that count.

**Snippet A — O(n²).** The inner body runs n times for each of the n outer iterations: n × n. Independent nested loops *multiply*.

**Snippet B — O(n²), via summing.** The inner bound depends on \`i\`, so you can't just multiply — you sum the work over outer iterations: 0 + 1 + 2 + … + (n−1) = n(n−1)/2. Dropping constants leaves O(n²). The lesson: *triangular* loops are still quadratic — "the inner loop is shorter on average" only buys a constant factor of ½.

**Snippet C — O(log n).** \`i\` doubles each iteration: 1, 2, 4, 8, … After k iterations i = 2^k, and the loop stops when 2^k ≥ n, i.e. k = log₂(n). Any loop that repeatedly doubles, halves, or otherwise multiplies its progress variable runs in O(log n). This is the signature of binary search and balanced-tree operations.

**Snippet D — O(n + m).** Sequential (non-nested) phases *add*. With two different input sizes you must keep both terms — O(n + m) — because neither dominates in general. (If both loops ran over n, O(n + n) would collapse to O(n).)

**The rules extracted:**

1. **Nested independent loops multiply** their iteration counts.
2. **Dependent inner bounds → sum the series.** The arithmetic series 1+2+…+n = n(n+1)/2 ∈ O(n²) is the one to memorise.
3. **Multiplicative progress (doubling/halving) → logarithmic.**
4. **Sequential phases add;** keep separate variables separate.
5. Constant-time bodies contribute only a constant factor — focus on iteration counts.

Worth internalising until you can eyeball loop nests and read off the complexity.
`,
  keyPoints: [
    "Method: count executions of the innermost operation as a function of n",
    "A: nested independent loops multiply → O(n²)",
    "B: dependent bound — sum 0+1+…+(n−1) = n(n−1)/2 → still O(n²)",
    "C: doubling progress → O(log n)",
    "D: sequential phases add and distinct sizes stay separate → O(n + m)",
  ],
};
