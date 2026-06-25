import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "explain-the-tradeoff-between-adjacency-lists-and-adjacency-matrices",
  title: "Adjacency List vs. Adjacency Matrix: Choosing the Right Representation",
  difficulty: "medium",
  category: "trees-graphs",
  order: 1058,
  description: `When representing a graph in memory, two classic data structures dominate: the **adjacency list** and the **adjacency matrix**.

Given a graph with **V** vertices and **E** edges, explain both representations and the tradeoffs between them. Your answer should cover:

1. How each structure is built and what it stores.
2. The **space complexity** of each.
3. The **time complexity** of the two most common operations: checking whether an edge exists between two vertices, and iterating over all neighbors of a vertex.
4. Practical guidance on **when to prefer one over the other** (consider density, V vs E, and common operations).

Support your explanation with a concrete example: use the undirected graph with 4 vertices (0–3) and edges \`{(0,1), (0,2), (1,3)}\`, and show what each representation looks like for that graph.`,
  hints: [
    `Start by thinking about what information each structure physically stores — how many 'cells' does each require as a function of V and E?`,
    `Consider two fundamental operations independently: (1) 'Is there an edge between u and v?' and (2) 'What are all the neighbors of u?' — which structure makes each faster?`,
    `Think about a graph with 1000 vertices but only 1001 edges vs. a graph with 1000 vertices and nearly 1,000,000 edges. How does the memory usage of each representation change?`,
    `Real-world algorithms like BFS and Dijkstra's heavily rely on iterating over neighbors. How does the O(V) row-scan cost of a matrix affect overall algorithm complexity compared to an adjacency list?`,
  ],
  guidance: [
    {
      "title": "Start with the physical structure",
      "body": "Before comparing, make sure you can precisely describe what each representation *stores*. An adjacency list is essentially an array of variable-length lists; an adjacency matrix is a fixed V×V table. Once you can picture what memory looks like for the sample graph, the space analysis falls out naturally.",
      "level": "nudge"
    },
    {
      "title": "Derive space complexity from what you store",
      "body": "Count the 'cells' in each structure:\n- **List**: one slot per vertex (the list headers) + one slot per directed edge → V + 2E for undirected → **O(V + E)**.\n- **Matrix**: always V rows × V columns regardless of edges → **O(V²)**.\n\nAsk: when is V + E much smaller than V²? When E << V (sparse graphs).",
      "level": "strategy"
    },
    {
      "title": "Analyze each operation separately",
      "body": "Tackle each operation in isolation:\n1. **Edge existence (u, v)?** — With a matrix, it's a single array lookup. With a list, you must search u's neighbor list, which could be as long as its degree.\n2. **Iterate all neighbors of u?** — With a list, walk only the actual neighbors (degree(u) steps). With a matrix, you must scan all V columns of row u, even the zeros.\n\nNeither structure dominates both operations.",
      "level": "strategy"
    },
    {
      "title": "Connect the tradeoffs to real use cases",
      "body": "A common mistake is assuming the adjacency matrix is 'better' because O(1) edge lookup sounds great. Watch out: most graph algorithms (BFS, DFS, Dijkstra's, topological sort) iterate over neighbors far more often than they query a specific edge. If you use a matrix for a sparse graph, each BFS/DFS iteration costs O(V) per vertex just to find its neighbors, inflating the overall complexity from O(V + E) to O(V²).",
      "level": "pitfall"
    },
    {
      "title": "Decision rule pseudocode",
      "body": "```\nif graph is DENSE (E ≈ V²) OR need O(1) edge existence checks frequently:\n    use adjacency matrix\nelse:  # graph is SPARSE (E << V²) or you need fast neighbor iteration\n    use adjacency list\n\n# Rule of thumb threshold:\n# if E > V² / log(V), lean toward matrix\n# otherwise, lean toward list\n```\nNote: 'sparse' and 'dense' are relative terms — always ground the choice in your specific V, E, and dominant operations.",
      "level": "pseudocode"
    }
  ],

  modelAnswer: `## Adjacency List

An adjacency list represents a graph as an array (or map) of lists. Index \`i\` holds a list of all vertices directly connected to vertex \`i\`.

**Example graph** — 4 vertices, edges \`{(0,1), (0,2), (1,3)}\`:

\`\`\`
Vertex 0: [1, 2]
Vertex 1: [0, 3]
Vertex 2: [0]
Vertex 3: [1]
\`\`\`

### Space
- **O(V + E)** — we store one list entry per vertex plus one entry per directed edge (two per undirected edge).
- For a sparse graph (E << V²) this is very memory-efficient.

### Operations
| Operation | Time |
|---|---|
| Check edge (u, v) | O(degree(u)) — scan u's list |
| Iterate neighbors of u | O(degree(u)) — just walk the list |

---

## Adjacency Matrix

An adjacency matrix is a V×V 2-D boolean (or weight) array. \`matrix[u][v] = 1\` means edge (u, v) exists.

**Same example:**

\`\`\`
     0  1  2  3
  0 [0, 1, 1, 0]
  1 [1, 0, 0, 1]
  2 [1, 0, 0, 0]
  3 [0, 1, 0, 0]
\`\`\`

### Space
- **O(V²)** — always allocates the full matrix regardless of actual edge count.
- For a sparse graph this wastes enormous space; for a dense graph (E ≈ V²) it is perfectly efficient.

### Operations
| Operation | Time |
|---|---|
| Check edge (u, v) | O(1) — direct array lookup |
| Iterate neighbors of u | O(V) — must scan the entire row |

---

## Head-to-Head Comparison

| | Adjacency List | Adjacency Matrix |
|---|---|---|
| Space | O(V + E) | O(V²) |
| Edge existence check | O(degree(u)) | O(1) |
| Iterate all neighbors | O(degree(u)) | O(V) |
| Add an edge | O(1) amortized | O(1) |
| Remove an edge | O(degree(u)) | O(1) |
| Best for | Sparse graphs | Dense graphs |

---

## When to Use Which

### Prefer an **adjacency list** when:
- The graph is **sparse** (E << V²), which is common in real-world graphs like social networks, road maps, or dependency graphs.
- You frequently need to **iterate over neighbors** (BFS, DFS, Dijkstra's, etc.).
- Memory is a concern and V is large.

### Prefer an **adjacency matrix** when:
- The graph is **dense** (E close to V²), such as a complete graph or a distance matrix in Floyd-Warshall.
- You frequently need to **check whether a specific edge exists** in O(1).
- V is small enough that O(V²) space is acceptable.
- The algorithm naturally operates on the matrix form (e.g., matrix exponentiation for path counting).

---

## Key Insight

The core tradeoff is **space vs. lookup speed**. The adjacency matrix trades O(V²) memory for O(1) edge queries; the adjacency list trades O(V + E) memory (much smaller for sparse graphs) for O(degree) edge queries. Since most real-world graphs are sparse, adjacency lists are the default choice in practice.`,
  keyPoints: [
    `Adjacency list stores V lists, one per vertex, with space O(V + E)`,
    `Adjacency matrix is a V×V grid with space O(V²)`,
    `Edge existence check: O(degree) for list vs O(1) for matrix`,
    `Neighbor iteration: O(degree) for list vs O(V) for matrix`,
    `Sparse graphs → prefer adjacency list; dense graphs → prefer adjacency matrix`,
    `Correctly illustrates both structures for the sample graph {(0,1),(0,2),(1,3)}`,
  ],
};

export default problem;
