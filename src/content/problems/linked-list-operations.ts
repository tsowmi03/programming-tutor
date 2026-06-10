import type { ExplanationProblemDef } from "../types";

export const linkedListOperations: ExplanationProblemDef = {
  type: "explanation",
  slug: "reversing-a-linked-list",
  title: "How Reversing a Linked List Works",
  difficulty: "medium",
  category: "linked-lists",
  order: 2,
  description: `Explain, step by step, how to **reverse a singly linked list in place** (the iterative three-pointer technique).

Your answer should cover:

1. Which pointers you maintain and what each one means.
2. The exact sequence of pointer updates in one loop iteration, and why the order of those updates matters.
3. A short walkthrough on the list \`1 → 2 → 3\`.
4. The time and space complexity, and why the recursive version differs in space.

You can write pseudocode or real code to support the explanation, but the *why* is the marked part.
`,
  hints: [
    "You need to flip each node's `next` pointer — but the moment you flip it, you lose your route forward. What must you save first?",
    "Three names: `prev` (already-reversed part), `current` (node being flipped), and a temporary for the unvisited remainder.",
  ],
  modelAnswer: `**The pointers.** Reversal walks the list once, flipping each node's \`next\` to point backwards. Three references are maintained:

- \`prev\` — head of the **already-reversed** prefix (starts as \`null\`, ends as the new head).
- \`current\` — the node whose pointer is being flipped right now.
- \`next_node\` — a temporary saving the **rest of the list** before the flip destroys the only route to it.

**One iteration, in strict order:**

\`\`\`text
1. next_node = current.next     # save the way forward FIRST
2. current.next = prev          # the flip
3. prev = current               # reversed prefix grows by one
4. current = next_node          # advance into the unreversed part
\`\`\`

Step 1 must precede step 2: a singly linked list has no way back, so \`current.next\` is the *only* reference to the remainder. Flip first and the rest of the list is garbage — this is the classic bug, and it's why the temporary exists.

**Walkthrough on \`1 → 2 → 3\`:**

| Iteration | Action | State (reversed | remaining) |
|---|---|---|
| start | — | \`∅\` | \`1 → 2 → 3\` |
| 1 | flip 1 | \`1\` | \`2 → 3\` |
| 2 | flip 2 | \`2 → 1\` | \`3\` |
| 3 | flip 3 | \`3 → 2 → 1\` | \`∅\` |

\`current\` is now \`null\`, the loop ends, and \`prev\` points at \`3\` — the new head. The loop invariant that makes the whole thing easy to trust: *after every iteration, \`prev\` heads a correctly reversed list of everything visited so far*.

**Complexity.** Each node is touched exactly once: **O(n) time, O(1) extra space** — just three pointers regardless of list length. The recursive version is also O(n) time but uses **O(n) space**, because each of the n nested calls occupies a stack frame until the recursion unwinds (and can stack-overflow on long lists). The iterative version is what you'd ship.
`,
  keyPoints: [
    "Three pointers: prev (reversed prefix), current (being flipped), saved next (rest of list)",
    "Save current.next before flipping — flipping first loses the only route to the remainder",
    "Update order: save next → flip → advance prev → advance current",
    "Correct trace on a small list, ending with prev as the new head",
    "Iterative: O(n) time / O(1) space; recursive: O(n) space due to call-stack frames",
  ],
};
