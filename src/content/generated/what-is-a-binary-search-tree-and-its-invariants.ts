import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "what-is-a-binary-search-tree-and-its-invariants",
  title: "What Is a Binary Search Tree?",
  difficulty: "easy",
  category: "trees-graphs",
  order: 1126,
  description: `## What Is a Binary Search Tree?

In your own words, explain what a **Binary Search Tree (BST)** is. Your answer should address the following:

1. What is the basic structure of a BST (what kind of tree is it)?
2. What are the **BST invariants** (the ordering properties that must hold at every node)?
3. How do these invariants apply **recursively** throughout the entire tree — not just at the root?
4. Give a **small example** of a valid BST and a **small example** of an invalid BST, explaining why each one is or isn't valid.
5. What operations does the BST structure make efficient, and roughly why?

Be precise about the invariant — pay attention to whether it's \`<\` or \`<=\`.`,
  hints: [
    `Think about what rule each node must enforce with respect to its left and right children — then ask whether that rule only applies to immediate children or to all descendants.`,
    `Try drawing a small tree and checking: is it enough that a node's right child is larger than it? What about the right child's left child?`,
    `Consider what happens during a search: at each node, how do you decide whether to go left or right, and why does that eliminate a large portion of the tree?`,
    `Think about what 'strictly less than' vs 'less than or equal to' means — would allowing duplicates break any of the invariants or make operations more complex?`,
  ],
  modelAnswer: `## Binary Search Tree — Model Answer

### Basic Structure
A **Binary Search Tree** is a rooted binary tree, meaning each node has **at most two children**, called the **left child** and the **right child**.

---

### The BST Invariant
For **every** node \`N\` in the tree, the following must hold:

- All values in \`N\`'s **left subtree** are **strictly less than** \`N\`'s value.
- All values in \`N\`'s **right subtree** are **strictly greater than** \`N\`'s value.

In the most common definition, **duplicate values are not allowed**. Some variants allow duplicates by placing them consistently (e.g., always in the right subtree), but the standard BST assumes unique keys.

---

### The Invariant Is Recursive
It is a common mistake to check only the immediate children. The invariant must hold for the **entire subtree**, not just parent–child pairs.

For example, if a node has value \`10\` and a right child with value \`15\`, the left child of \`15\` must **also** be greater than \`10\` — not just less than \`15\`.

---

### Valid BST Example

\`\`\`text
        8
       / \\
      3   10
     / \\    \\
    1   6    14
       / \\
      4   7
\`\`\`

- Node \`8\`: left subtree contains {1, 3, 4, 6, 7}, all < 8 ✓; right subtree contains {10, 14}, all > 8 ✓
- Node \`3\`: left subtree {1} < 3 ✓; right subtree {4, 6, 7} > 3 ✓
- Every node satisfies the invariant recursively. ✓

---

### Invalid BST Example

\`\`\`text
        8
       / \\
      3   10
     / \\
    1   12   ← INVALID: 12 > 8, but it's in 8's left subtree
\`\`\`

- Node \`3\`'s right child is \`12\`. Locally, 12 > 3 seems fine.
- But \`12\` is in the **left subtree of 8**, so 12 must be < 8. It is not. ✗
- This violates the global invariant even though the local parent–child relationship at node 3 looks correct.

---

### Why the BST Structure Enables Efficient Operations
| Operation | Average Case | Reason |
|-----------|-------------|--------|
| Search    | O(log n)    | At each node, half the remaining tree is eliminated |
| Insert    | O(log n)    | Follow the same search path, insert at the leaf |
| Delete    | O(log n)    | Find node, then restructure locally |
| In-order traversal | O(n) | Visits all nodes in sorted ascending order |

The key insight is that the invariant lets you **eliminate half the search space at each step**, similar to binary search on a sorted array. However, this O(log n) guarantee only holds for a **balanced** tree. A degenerate BST (e.g., inserting already-sorted data) can degrade to O(n) per operation, resembling a linked list.

---

### Summary
- A BST is a binary tree with an ordering invariant: left subtree values < node value < right subtree values.
- The invariant is **global** (applies to entire subtrees), not just local (parent–child).
- It enables O(log n) search, insert, and delete on average.`,
  keyPoints: [
    `A BST is a binary tree (each node has at most two children)`,
    `Left subtree values are strictly less than the node's value`,
    `Right subtree values are strictly greater than the node's value`,
    `The invariant applies recursively to ALL nodes in each subtree, not just immediate children`,
    `Standard BSTs typically do not allow duplicate values`,
    `Can give a correct example of a valid BST`,
    `Can give a correct example of an invalid BST and explain why it fails (especially the subtle global-invariant violation)`,
    `BST enables O(log n) search/insert/delete on average due to halving the search space`,
    `In-order traversal of a BST yields sorted order`,
    `Worst-case degrades to O(n) for unbalanced trees`,
  ],
};

export default problem;
