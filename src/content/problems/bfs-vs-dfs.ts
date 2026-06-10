import type { ExplanationProblemDef } from "../types";

export const bfsVsDfs: ExplanationProblemDef = {
  type: "explanation",
  slug: "bfs-vs-dfs",
  title: "BFS vs DFS: When and Why",
  difficulty: "medium",
  category: "trees-graphs",
  order: 2,
  description: `Compare **breadth-first search (BFS)** and **depth-first search (DFS)** for exploring a graph.

Your answer should cover:

1. The order in which each visits nodes, and the data structure that produces that order.
2. Which problems each is the right tool for (give at least two per traversal, with reasons).
3. Their space behaviour — when does BFS's memory explode, and when does DFS's?
4. Why BFS finds shortest paths in **unweighted** graphs but not weighted ones, and what handles the weighted case.
5. Why a visited set is essential in graphs but unnecessary in trees.
`,
  hints: [
    "The two algorithms are the *same loop* with a different container — which container gives which order?",
    "Think of a very wide bushy graph vs a very deep narrow one.",
  ],
  modelAnswer: `**Order and machinery.** Both traversals repeat "take a node out of the container, visit it, put its unvisited neighbours in." The **container** is the entire difference:

- **BFS** uses a **queue** — nodes are visited in rings of increasing distance from the start: all nodes 1 edge away, then 2, then 3…
- **DFS** uses a **stack** (explicit, or the call stack via recursion) — it commits to one path as deep as it can go, then backtracks to the most recent fork.

**When BFS is right.** Anything about *distance in edges*: **shortest path in unweighted graphs/grids** (word ladders, maze fewest-steps, "minimum moves" puzzles), or level-by-level processing of trees (level-order printing, "rightmost node per level"). If the question contains "minimum number of steps," reach for BFS.

**When DFS is right.** Anything about *structure reachable along paths*: **connected components / flood fill** (Number of Islands), **cycle detection and topological sorting** (the "currently on my path" state falls out of the recursion naturally), exhaustive **backtracking** (permutations, N-queens), tree post-processing where children must finish before parents. DFS is also usually less code — a recursive function.

**Space.** BFS holds an entire **frontier**: on a bushy graph the queue can approach O(V) — for a branching factor b and depth d, O(b^d). DFS holds one **path** plus branch points: O(depth). So BFS explodes on *wide* graphs, DFS on *deep* ones (a million-node path will overflow the recursion stack — switch to an iterative stack). Rule of thumb: shallow-and-wide favours DFS's memory; deep-and-narrow favours BFS's. Correctness requirements (shortest path!) trump memory preferences, though.

**Shortest paths and weights.** BFS's guarantee relies on the queue processing nodes in non-decreasing distance order — true when every edge costs exactly 1, because distance equals BFS rings. With weights, a 2-edge path can be cheaper than a 1-edge path of weight 10, breaking the equivalence. **Dijkstra's algorithm** is the fix — conceptually BFS with the queue upgraded to a *priority queue* keyed by accumulated cost.

**The visited set.** Graphs may contain cycles and multiple routes to one node; without marking visited nodes, BFS re-enqueues nodes repeatedly and DFS recurses forever around cycles. Trees are acyclic with exactly one path to each node (and traversal goes parent→child), so a visited set is redundant by construction.
`,
  keyPoints: [
    "Same loop, different container: queue → BFS (rings of distance), stack/recursion → DFS (deep paths + backtrack)",
    "BFS for unweighted shortest path / level-order; DFS for components, cycles, topological sort, backtracking",
    "BFS memory scales with frontier width (O(b^d)); DFS with path depth (recursion overflow risk)",
    "BFS shortest path requires unit edges; weighted graphs need Dijkstra (priority queue)",
    "Visited set prevents cycles/re-visits in graphs; trees don't need one",
  ],
};
