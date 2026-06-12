import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "breadth-first-vs-depth-first-traversal-tradeoffs",
  title: "BFS vs DFS: Choosing the Right Traversal",
  difficulty: "easy",
  category: "trees-graphs",
  order: 1121,
  description: `## Breadth-First Search vs Depth-First Search

Both **Breadth-First Search (BFS)** and **Depth-First Search (DFS)** are fundamental algorithms for exploring trees and graphs. Yet they explore nodes in very different orders, and each shines in different scenarios.

### Your Task

Explain the core difference between how BFS and DFS traverse a tree or graph. Then discuss the **tradeoffs** between the two approaches, covering:

1. **How each algorithm works** — describe the order nodes are visited and what data structure each relies on.
2. **Memory usage** — how much memory does each approach use in the best and worst case for a tree?
3. **When to prefer BFS** — give at least two concrete scenarios where BFS is the better choice.
4. **When to prefer DFS** — give at least two concrete scenarios where DFS is the better choice.
5. **A concrete example** — for the tree below, list the order nodes are visited under BFS and under DFS (pre-order).

\`\`\`text
        1
       / \\
      2   3
     / \\
    4   5
\`\`\`
`,
  hints: [
    `Think about what data structure sits at the heart of each algorithm — a queue vs. a stack. How does that choice dictate the order of exploration?`,
    `Consider a very wide tree (many children per node) vs. a very deep tree (long chains). Which traversal uses more memory in each case?`,
    `Shortest path in an unweighted graph is a classic use-case — which traversal guarantees you find it first, and why?`,
    `Cycle detection, topological sort, and solving mazes often appear in DFS discussions. Why does DFS map naturally to these problems?`,
  ],
  modelAnswer: `## BFS vs DFS: Core Difference

**Breadth-First Search (BFS)** explores nodes **level by level**, visiting all neighbors of the current node before moving deeper. It uses a **queue** (FIFO).

**Depth-First Search (DFS)** explores nodes by going **as deep as possible** along each branch before backtracking. It uses a **stack** (LIFO) — either an explicit one or the call stack via recursion.

---

## How Each Algorithm Works

**BFS:**
1. Enqueue the start node.
2. Dequeue a node, process it, enqueue all unvisited neighbors.
3. Repeat until the queue is empty.

Result: nodes are visited in order of increasing distance from the start.

**DFS (pre-order):**
1. Push the start node (or call recursively).
2. Process the node, then recurse/push into each child.
3. Backtrack when a dead end is reached.

Result: nodes are visited by fully exploring one branch before moving to the next.

---

## Memory Usage

| Scenario | BFS | DFS |
|---|---|---|  
| **Wide tree** (many children per node) | ❌ High — the queue holds an entire level, which can be huge | ✅ Low — only one path from root to current node |
| **Deep tree** (long chain / skewed tree) | ✅ Low — queue holds only a few nodes at a time | ❌ High — call stack or explicit stack grows with depth |

- **BFS worst case:** O(w) extra space, where w is the maximum width (can be O(n) for a complete binary tree's last level).
- **DFS worst case:** O(h) extra space, where h is the height (can be O(n) for a skewed tree).

---

## When to Prefer BFS

1. **Shortest path in an unweighted graph** — BFS always finds the shortest path (fewest edges) first because it explores by distance.
2. **Level-order processing** — e.g., printing a tree level by level, finding nodes at distance k, or web crawlers exploring by "hops".
3. **The target is likely close to the source** — BFS finds nearby nodes quickly without exploring far branches.

---

## When to Prefer DFS

1. **Cycle detection** — DFS naturally tracks the current recursion path, making it easy to detect back-edges (cycles).
2. **Topological sort** — DFS post-order on a DAG directly yields a topological ordering.
3. **Solving mazes / exhaustive search / backtracking** — DFS explores one complete path at a time, fitting the backtracking pattern.
4. **The target is likely deep in the tree** — DFS reaches deep nodes faster than BFS.
5. **Memory is constrained and the tree is wide** — DFS uses O(h) space vs BFS's O(w).

---

## Concrete Example

\`\`\`text
        1
       / \\
      2   3
     / \\
    4   5
\`\`\`

**BFS order (level by level):**
\`\`\`
1 → 2 → 3 → 4 → 5
\`\`\`
Level 0: [1], Level 1: [2, 3], Level 2: [4, 5]

**DFS pre-order (root, left, right):**
\`\`\`
1 → 2 → 4 → 5 → 3
\`\`\`
Visit 1, go left to 2, go left to 4 (leaf, backtrack), go right to 5 (leaf, backtrack), backtrack to 1, go right to 3.

---

## Quick Summary

| | BFS | DFS |
|---|---|---|
| Data structure | Queue | Stack / Recursion |
| Order | Level by level | Branch by branch |
| Memory | O(width) | O(height) |
| Shortest path | ✅ Yes | ❌ Not guaranteed |
| Best for | Shortest paths, level-order | Backtracking, topology, cycles |`,
  keyPoints: [
    `BFS uses a queue; DFS uses a stack (or recursion)`,
    `BFS visits nodes level by level; DFS visits nodes branch by branch`,
    `BFS memory is O(width); DFS memory is O(height)`,
    `BFS guarantees shortest path in unweighted graphs; DFS does not`,
    `DFS is naturally suited to backtracking, cycle detection, and topological sort`,
    `BFS is preferred when the target is near the source or level-order processing is needed`,
    `Correct BFS order for the example: 1, 2, 3, 4, 5`,
    `Correct DFS pre-order for the example: 1, 2, 4, 5, 3`,
  ],
};

export default problem;
