import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "detect-a-cycle-in-a-directed-graph-given-as-an-adjacency-edge-list",
  title: "Detect Cycle in a Directed Graph",
  difficulty: "medium",
  category: "trees-graphs",
  order: 1131,
  description: `You are given a directed graph with \`n\` nodes (labeled \`0\` to \`n-1\`) and a list of directed edges.

Return \`true\` if the graph contains **at least one cycle**, or \`false\` if it is a DAG (directed acyclic graph).

The graph is given as an edge list \`edges\` where \`edges[i] = [u, v]\` means there is a directed edge from node \`u\` to node \`v\`.

\`\`\`text
Example 1:
n = 4, edges = [[0,1],[1,2],[2,3],[3,1]]
Output: true
Explanation: There is a cycle 1 -> 2 -> 3 -> 1.
\`\`\`

\`\`\`text
Example 2:
n = 4, edges = [[0,1],[1,2],[2,3]]
Output: false
Explanation: No cycle exists; the graph is a DAG.
\`\`\`

\`\`\`text
Example 3:
n = 3, edges = [[0,1],[1,2],[0,2]]
Output: false
Explanation: No cycle; edges only go forward.
\`\`\`

**Constraints:**
- \`1 <= n <= 1000\`
- \`0 <= edges.length <= 5000\`
- \`edges[i].length == 2\`
- \`0 <= edges[i][0], edges[i][1] < n\`
- There are no self-loops (no edge where \`u == v\`).`,
  hints: [
    `Try a DFS-based approach. A cycle exists in a directed graph if you can reach a node that is already in the current DFS recursion stack.`,
    `Maintain two arrays: one to track visited nodes globally, and one to track nodes currently in the DFS call stack. If you encounter a node that is in the call stack, you've found a cycle.`,
    `Alternatively, think about topological sort (Kahn's algorithm). If you cannot process all nodes (there are nodes with non-zero in-degree remaining), those nodes form a cycle.`,
  ],
  signature: {
    "name": "hasCycle",
    "params": [
      {
        "name": "n",
        "type": "int"
      },
      {
        "name": "edges",
        "type": "int[][]"
      }
    ],
    "returns": "bool",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        4,
        [
          [
            0,
            1
          ],
          [
            1,
            2
          ],
          [
            2,
            3
          ],
          [
            3,
            1
          ]
        ]
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        4,
        [
          [
            0,
            1
          ],
          [
            1,
            2
          ],
          [
            2,
            3
          ]
        ]
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        3,
        [
          [
            0,
            1
          ],
          [
            1,
            2
          ],
          [
            0,
            2
          ]
        ]
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        1,
        []
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        2,
        [
          [
            0,
            1
          ],
          [
            1,
            0
          ]
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        5,
        [
          [
            0,
            1
          ],
          [
            1,
            2
          ],
          [
            2,
            3
          ],
          [
            3,
            4
          ],
          [
            4,
            2
          ]
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        5,
        [
          [
            0,
            1
          ],
          [
            0,
            2
          ],
          [
            1,
            3
          ],
          [
            2,
            3
          ],
          [
            3,
            4
          ]
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        6,
        [
          [
            0,
            1
          ],
          [
            1,
            2
          ],
          [
            2,
            3
          ],
          [
            3,
            4
          ],
          [
            4,
            5
          ],
          [
            5,
            3
          ]
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        3,
        [
          [
            0,
            1
          ],
          [
            0,
            2
          ],
          [
            1,
            2
          ]
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        4,
        [
          [
            0,
            1
          ],
          [
            2,
            3
          ],
          [
            3,
            2
          ]
        ]
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def has_cycle(n: int, edges: list[list[int]]) -> bool:
    # TODO: implement cycle detection in a directed graph
    return False
`,
    javascript: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
function hasCycle(n, edges) {
    // TODO: implement cycle detection in a directed graph
    return false;
}
`,
    java: `class Solution {
    public boolean hasCycle(int n, int[][] edges) {
        // TODO: implement cycle detection in a directed graph
        return false;
    }
}
`,
    c: `bool hasCycle(int n, int** edges, int edgesSize, int* edgesColSize) {
    // TODO: implement cycle detection in a directed graph
    return false;
}
`,
  },
  solutions: {
    python: `def has_cycle(n: int, edges: list[list[int]]) -> bool:
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)

    # 0 = unvisited, 1 = in stack, 2 = done
    state = [0] * n

    def dfs(node):
        state[node] = 1
        for nei in adj[node]:
            if state[nei] == 1:
                return True
            if state[nei] == 0 and dfs(nei):
                return True
        state[node] = 2
        return False

    for i in range(n):
        if state[i] == 0:
            if dfs(i):
                return True
    return False
`,
    javascript: `function hasCycle(n, edges) {
    const adj = Array.from({length: n}, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
    }

    // 0 = unvisited, 1 = in stack, 2 = done
    const state = new Array(n).fill(0);

    function dfs(node) {
        state[node] = 1;
        for (const nei of adj[node]) {
            if (state[nei] === 1) return true;
            if (state[nei] === 0 && dfs(nei)) return true;
        }
        state[node] = 2;
        return false;
    }

    for (let i = 0; i < n; i++) {
        if (state[i] === 0) {
            if (dfs(i)) return true;
        }
    }
    return false;
}
`,
    java: `class Solution {
    private int[] state;
    private int[][] adjList;
    private int[] adjCount;

    public boolean hasCycle(int n, int[][] edges) {
        adjList = new int[n][n];
        adjCount = new int[n];
        state = new int[n];

        for (int[] e : edges) {
            adjList[e[0]][adjCount[e[0]]++] = e[1];
        }

        for (int i = 0; i < n; i++) {
            if (state[i] == 0 && dfs(i)) return true;
        }
        return false;
    }

    private boolean dfs(int node) {
        state[node] = 1;
        for (int i = 0; i < adjCount[node]; i++) {
            int nei = adjList[node][i];
            if (state[nei] == 1) return true;
            if (state[nei] == 0 && dfs(nei)) return true;
        }
        state[node] = 2;
        return false;
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>

static int adjList[1000][5000];
static int adjCount[1000];
static int state[1000];

static int dfsNode[6000];
static int dfsIdx[6000];

static int dfs(int start) {
    int top = 0;
    dfsNode[0] = start;
    dfsIdx[0] = 0;
    state[start] = 1;

    while (top >= 0) {
        int node = dfsNode[top];
        int idx = dfsIdx[top];

        if (idx < adjCount[node]) {
            int nei = adjList[node][idx];
            dfsIdx[top]++;
            if (state[nei] == 1) return 1;
            if (state[nei] == 0) {
                state[nei] = 1;
                top++;
                dfsNode[top] = nei;
                dfsIdx[top] = 0;
            }
        } else {
            state[node] = 2;
            top--;
        }
    }
    return 0;
}

int hasCycle(int n, int** edges, int edgesSize, int* edgesColSize) {
    memset(adjCount, 0, sizeof(int) * n);
    memset(state, 0, sizeof(int) * n);

    for (int i = 0; i < edgesSize; i++) {
        int u = edges[i][0];
        int v = edges[i][1];
        adjList[u][adjCount[u]++] = v;
    }

    for (int i = 0; i < n; i++) {
        if (state[i] == 0) {
            if (dfs(i)) return 1;
        }
    }
    return 0;
}
`,
  },
  editorial: `## Approach: DFS with Recursion Stack Coloring

### Intuition

A cycle exists in a directed graph if and only if we encounter a **back edge** during DFS — an edge pointing to an ancestor in the current DFS path.

We track each node's state:
- **0 (Unvisited):** Not yet explored.
- **1 (In Stack):** Currently in the DFS call stack (being explored).
- **2 (Done):** Fully explored; no cycle through this node.

If we visit a neighbor that is currently **In Stack** (state = 1), we have found a back edge → cycle detected.

### Algorithm

1. Build an adjacency list from the edge list.
2. For each unvisited node, run DFS.
3. On entering a node, mark it as \`In Stack\`.
4. For each neighbor:
   - If \`In Stack\` → cycle found, return \`true\`.
   - If \`Unvisited\` → recurse; propagate \`true\` if cycle found.
5. On leaving a node, mark it as \`Done\`.
6. If no cycle found after all DFS calls, return \`false\`.

### Complexity

- **Time:** O(V + E) — each node and edge is visited once.
- **Space:** O(V + E) — adjacency list and recursion stack.

### Alternative: Kahn's Algorithm (Topological Sort)

Repeatedly remove nodes with in-degree 0. If all nodes are removed, the graph is a DAG. If some nodes remain (with non-zero in-degree), they form a cycle. Both approaches run in O(V + E).`,
};

export default problem;
