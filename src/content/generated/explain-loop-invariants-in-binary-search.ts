import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "explain-loop-invariants-in-binary-search",
  title: "Loop Invariants in Binary Search",
  difficulty: "medium",
  category: "binary-search",
  order: 1059,
  description: `## Loop Invariants in Binary Search

Binary search is one of the most elegant algorithms in computer science, yet it is famously easy to get wrong — off-by-one errors, infinite loops, and missed targets are common bugs even for experienced developers.

The secret to writing a *correct* binary search every time is understanding its **loop invariant**: a property about the search space that is true before the loop begins, maintained after every iteration, and strong enough to let you reason about the result when the loop ends.

### Your Task

Explain loop invariants in the context of binary search. Your answer should cover:

1. **What a loop invariant is** — define it in your own words.
2. **The invariant for classic binary search** — searching for a target value in a sorted array. What property do \`lo\` and \`hi\` always satisfy?
3. **How the invariant is established, maintained, and terminated** — walk through the three proof obligations (initialization, maintenance, termination).
4. **How the invariant guides boundary decisions** — explain how the choice of \`lo = mid + 1\` vs \`lo = mid\`, and \`hi = mid - 1\` vs \`hi = mid\`, falls naturally out of preserving the invariant.
5. **A concrete bug caught by the invariant** — show an example of incorrect boundary update that violates the invariant and leads to an infinite loop or wrong answer.

Use pseudocode snippets where helpful.`,
  hints: [
    `Start by thinking about what must always be true about the variables \`lo\` and \`hi\` throughout the entire search — what do they 'promise' about where the target can be?`,
    `For each branch of the if/else inside the loop, ask: after this update, could we have accidentally excluded an index that holds the target?`,
    `Consider what happens when the loop exits — what does \`lo > hi\` tell you, and how does the invariant turn that into a meaningful conclusion?`,
  ],
  guidance: [
    {
      "title": "Start With the Meaning of the Search Space",
      "body": "Before thinking about code, ask yourself: what do `lo` and `hi` *represent*? They define the range of indices where the target *could* still be. Write that as a sentence — that sentence is the seed of your invariant.",
      "level": "nudge"
    },
    {
      "title": "Frame the Three Proof Obligations",
      "body": "Every loop invariant proof has three parts:\n1. **Initialization** — is the invariant true before the first iteration?\n2. **Maintenance** — assuming it is true at the start of an iteration, is it still true after the updates?\n3. **Termination** — when the loop exits, what does the invariant (combined with the exit condition) tell you?\n\nStructure your answer around these three checkpoints.",
      "level": "strategy"
    },
    {
      "title": "Pitfall: Confusing 'Excluded Index' With 'Violated Invariant'",
      "body": "When `nums[mid] < target`, we know `mid` is *not* the answer. If we set `lo = mid` instead of `lo = mid + 1`, we keep a known-wrong index in the search space. The invariant technically isn't broken (target is still in `[lo, hi]`), but the search space fails to *shrink* — this breaks the progress guarantee and can cause an infinite loop. Make sure to distinguish 'invariant preservation' from 'guaranteed progress'.",
      "level": "pitfall"
    },
    {
      "title": "Compare Closed vs Half-Open Interval Conventions",
      "body": "Some binary search implementations use `hi = n` and `lo < hi` (half-open interval `[lo, hi)`). The invariant changes slightly — 'target is in `[lo, hi)`' — and the boundary updates change accordingly (`hi = mid` instead of `hi = mid - 1`). Showing how the invariant dictates both conventions demonstrates deep understanding.",
      "level": "strategy"
    },
    {
      "title": "Pseudocode Shape for a Bug Demonstration",
      "body": "To show a concrete bug, use a tiny example like `nums = [1, 3], target = 3` and trace through with the wrong boundary:\n\n```\n# Buggy\nif nums[mid] < target:\n    lo = mid        # should be mid + 1\n```\n\nTrace: lo=0, hi=1, mid=0, nums[0]=1 < 3 → lo stays 0 → loop repeats forever.\n\nThen show how checking 'does the search space shrink?' immediately flags the bug.",
      "level": "pseudocode"
    }
  ],

  modelAnswer: `## Loop Invariants in Binary Search

### 1. What Is a Loop Invariant?

A **loop invariant** is a logical statement about program variables that:
- Is **true before the loop starts** (initialization),
- **Remains true after every iteration** (maintenance),
- **Leads to a useful conclusion when the loop exits** (termination).

Loop invariants are a formal tool for proving correctness. If your invariant is strong enough, its combination with the loop's exit condition guarantees the result is correct.

---

### 2. The Invariant for Classic Binary Search

Consider searching for \`target\` in a sorted array \`nums[0..n-1]\`:

\`\`\`
lo = 0
hi = n - 1

while lo <= hi:
    mid = lo + (hi - lo) // 2
    if nums[mid] == target:
        return mid
    elif nums[mid] < target:
        lo = mid + 1
    else:
        hi = mid - 1

return -1
\`\`\`

**Invariant:** *If \`target\` exists in \`nums\`, then it must be located at some index in the range \`[lo, hi]\` (inclusive).*

In other words, the search space \`[lo, hi]\` always contains the target (if it exists). We never exclude an index that could hold the answer.

---

### 3. Three Proof Obligations

#### Initialization
Before the loop, \`lo = 0\` and \`hi = n - 1\`. The full array \`[0, n-1]\` is the search space — if \`target\` is anywhere, it is in this range. ✓

#### Maintenance
At the start of each iteration, the invariant holds: if \`target\` exists, it is in \`[lo, hi]\`.

- We compute \`mid\` which is inside \`[lo, hi]\`.
- **Case \`nums[mid] == target\`:** We return immediately — no invariant to maintain.
- **Case \`nums[mid] < target\`:** The array is sorted, so \`target\` cannot be at \`mid\` or any index ≤ \`mid\`. We set \`lo = mid + 1\`. The new search space is \`[mid+1, hi]\`, which still contains \`target\` if it exists. ✓
- **Case \`nums[mid] > target\`:** Symmetrically, \`target\` cannot be at \`mid\` or higher. We set \`hi = mid - 1\`. The new search space \`[lo, mid-1]\` still contains \`target\` if it exists. ✓

In each case, the invariant is preserved after the update.

#### Termination
The loop exits when \`lo > hi\`, meaning the search space is empty. Combined with the invariant ("target is in \`[lo, hi]\` if it exists"), an empty range means \`target\` does not exist in \`nums\`. We correctly return \`-1\`. ✓

---

### 4. How the Invariant Guides Boundary Decisions

The choice of \`lo = mid + 1\` (not \`lo = mid\`) and \`hi = mid - 1\` (not \`hi = mid\`) is *directly dictated* by the invariant.

When \`nums[mid] < target\`, we know \`mid\` is **not** the answer. To preserve the invariant, we need the new \`lo\` to exclude \`mid\`. Hence \`lo = mid + 1\`.

If we wrote \`lo = mid\` instead, \`mid\` would remain in the search space even though we know it cannot be the answer. While this doesn't break the invariant *per se* (mid is a valid index to keep), the search space would not shrink when \`hi = mid\` as well, leading to an **infinite loop**.

**Half-open interval variant:** Some implementations use \`lo = 0, hi = n\` with the invariant \`[lo, hi)\` and exit condition \`lo < hi\`. There, the update is \`hi = mid\` (not \`mid - 1\`) because \`hi\` is exclusive. The invariant still dictates the boundary — just with a different formulation.

| Variant | lo init | hi init | exit | lower update | upper update |
|---|---|---|---|---|---|
| Closed \`[lo, hi]\` | 0 | n-1 | lo > hi | lo = mid+1 | hi = mid-1 |
| Half-open \`[lo, hi)\` | 0 | n | lo >= hi | lo = mid+1 | hi = mid |

---

### 5. A Concrete Bug Caught by the Invariant

**Buggy version:**
\`\`\`
lo = 0
hi = n - 1

while lo < hi:          # Bug 1: should be lo <= hi
    mid = lo + (hi - lo) // 2
    if nums[mid] < target:
        lo = mid        # Bug 2: should be mid + 1
    else:
        hi = mid - 1
\`\`\`

**What goes wrong:**

Suppose \`nums = [1, 3]\` and \`target = 3\`.

- \`lo=0, hi=1\`, \`mid=0\`, \`nums[0]=1 < 3\` → \`lo = mid = 0\`. Nothing changes!
- The loop condition \`lo < hi\` (0 < 1) is still true → infinite loop.

**Invariant check reveals the bug:** After setting \`lo = mid\`, is the invariant maintained? The invariant says "target is in \`[lo, hi]\`". We established \`nums[mid] < target\`, so \`mid\` cannot hold the target — yet we kept \`mid\` in the search space by setting \`lo = mid\`. The space did not shrink, violating the *progress* requirement and causing the infinite loop.

Fix: \`lo = mid + 1\` ensures \`mid\` is excluded and the search space strictly shrinks each iteration.

---

### Summary

| Obligation | What to check |
|---|---|
| Initialization | Full array in search space |
| Maintenance | Every update keeps target in \`[lo, hi]\` and shrinks the space |
| Termination | Empty space → target absent; target found → return mid |

Thinking in terms of the invariant transforms binary search from a "trick" into a systematic, verifiable procedure.`,
  keyPoints: [
    `A loop invariant is a property true before, during, and after every loop iteration`,
    `The invariant for binary search: 'if target exists, it lies within [lo, hi]'`,
    `Three proof obligations: initialization, maintenance, and termination`,
    `Boundary choice (mid+1 vs mid, mid-1 vs mid) is dictated by the need to exclude the checked index and shrink the search space`,
    `When the loop exits (lo > hi), the empty search space combined with the invariant proves target is absent`,
    `Using lo = mid instead of lo = mid+1 can violate progress, causing an infinite loop`,
    `Different interval conventions ([lo,hi] closed vs [lo,hi) half-open) have matching boundary update rules derived from the same invariant reasoning`,
  ],
};

export default problem;
