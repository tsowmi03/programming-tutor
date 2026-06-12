import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "topological-sort-of-a-dag-given-as-edge-list-return-a-valid-ordering",
  title: "Find Topological Order",
  difficulty: "medium",
  category: "trees-graphs",
  order: 1135,
  description: `Given a directed acyclic graph (DAG) with \`n\` nodes labelled \`0\` to \`n - 1\` and a list of directed edges, return the **lexicographically smallest** valid topological ordering of the nodes.

An edge \`edges[i] = [u, v]\` indicates a directed edge from node \`u\` to node \`v\`. A topological ordering is a linear arrangement of all nodes such that for every directed edge \`u → v\`, node \`u\` appears before node \`v\`.

If multiple valid orderings exist, return the lexicographically smallest one.

\`\`\`text
Example 1:
Input:  n = 4, edges = [[1,0],[2,0],[3,1],[3,2]]
Output: [3,1,2,0]
Explanation:
  Edges: 1->0, 2->0, 3->1, 3->2.
  Node 3 has no prerequisites, so it goes first.
  Then both 1 and 2 are available; pick 1 (smaller), then 2, then 0.
\`\`\`

\`\`\`text
Example 2:
Input:  n = 6, edges = [[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]
Output: [4,5,0,2,3,1]
Explanation:
  Nodes 4 and 5 start with in-degree 0; pick 4 first (smaller).
  After 4: pick 5. After 5: 0 and 2 become available; pick 0, then 2, 3, 1.
\`\`\`

**Constraints:**
- \`1 <= n <= 100\`
- \`0 <= edges.length <= n * (n - 1) / 2\`
- \`edges[i].length == 2\`
- \`0 <= edges[i][0], edges[i][1] < n\`
- The input graph is guaranteed to be a DAG (no cycles).`,
  hints: [
    `Use Kahn's algorithm: compute the 'in-degree' (number of incoming edges) for every node. Nodes with in-degree 0 are immediately eligible to be placed next.`,
    `To guarantee the lexicographically smallest result, always pick the smallest-indexed node whose in-degree is currently 0.`,
    `After placing a node, reduce the in-degree of each of its neighbors. Any neighbor that drops to in-degree 0 becomes eligible and should be added to your available set.`,
  ],
  signature: {
    "name": "findTopologicalOrder",
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
    "returns": "int[]",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        4,
        [
          [
            1,
            0
          ],
          [
            2,
            0
          ],
          [
            3,
            1
          ],
          [
            3,
            2
          ]
        ]
      ],
      "expected": [
        3,
        1,
        2,
        0
      ],
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
            0,
            2
          ],
          [
            1,
            2
          ]
        ]
      ],
      "expected": [
        0,
        1,
        2
      ],
      "hidden": false
    },
    {
      "input": [
        6,
        [
          [
            5,
            2
          ],
          [
            5,
            0
          ],
          [
            4,
            0
          ],
          [
            4,
            1
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
      "expected": [
        4,
        5,
        0,
        2,
        3,
        1
      ],
      "hidden": false
    },
    {
      "input": [
        1,
        []
      ],
      "expected": [
        0
      ],
      "hidden": true
    },
    {
      "input": [
        2,
        []
      ],
      "expected": [
        0,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        2,
        [
          [
            0,
            1
          ]
        ]
      ],
      "expected": [
        0,
        1
      ],
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
      "expected": [
        0,
        1,
        2,
        3,
        4
      ],
      "hidden": true
    },
    {
      "input": [
        4,
        []
      ],
      "expected": [
        0,
        1,
        2,
        3
      ],
      "hidden": true
    },
    {
      "input": [
        3,
        [
          [
            2,
            0
          ],
          [
            2,
            1
          ]
        ]
      ],
      "expected": [
        2,
        0,
        1
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def find_topological_order(n: int, edges: list[list[int]]) -> list[int]:
    # TODO: implement Kahn's algorithm with greedy min-node selection
    return []
`,
    javascript: `function findTopologicalOrder(n, edges) {
    // TODO: implement Kahn's algorithm with greedy min-node selection
    return [];
}
`,
    typescript: `function findTopologicalOrder(n: number, edges: number[][]): number[] {
    // TODO: implement Kahn's algorithm with greedy min-node selection
    return [];
}`,
    java: `class Solution {
    public int[] findTopologicalOrder(int n, int[][] edges) {
        // TODO: implement Kahn's algorithm with greedy min-node selection
        return new int[0];
    }
}
`,
    csharp: `public class Solution {
    public int[] FindTopologicalOrder(int n, int[][] edges) {
        // TODO: implement Kahn's algorithm with greedy min-node selection
        return new int[0];
    }
}`,
    c: `#include <stdlib.h>
#include <string.h>

int* findTopologicalOrder(int n, int** edges, int edgesSize, int* edgesColSize, int* returnSize) {
    /* TODO: implement Kahn's algorithm with greedy min-node selection */
    *returnSize = 0;
    return NULL;
}
`,
    cpp: `class Solution {
public:
    vector<int> findTopologicalOrder(int n, vector<vector<int>>& edges) {
        // TODO: implement Kahn's algorithm with greedy min-node selection
        return {};
    }
};`,
  },
  solutions: {
    python: `import heapq

def find_topological_order(n: int, edges: list[list[int]]) -> list[int]:
    adj = [[] for _ in range(n)]
    in_degree = [0] * n
    for u, v in edges:
        adj[u].append(v)
        in_degree[v] += 1
    heap = [i for i in range(n) if in_degree[i] == 0]
    heapq.heapify(heap)
    result = []
    while heap:
        node = heapq.heappop(heap)
        result.append(node)
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                heapq.heappush(heap, neighbor)
    return result
`,
    javascript: `function findTopologicalOrder(n, edges) {
    const adj = Array.from({length: n}, () => []);
    const inDegree = new Array(n).fill(0);
    for (const [u, v] of edges) {
        adj[u].push(v);
        inDegree[v]++;
    }
    const processed = new Array(n).fill(false);
    const result = [];
    for (let step = 0; step < n; step++) {
        let minNode = -1;
        for (let i = 0; i < n; i++) {
            if (!processed[i] && inDegree[i] === 0) {
                minNode = i;
                break;
            }
        }
        if (minNode === -1) break;
        result.push(minNode);
        processed[minNode] = true;
        for (const neighbor of adj[minNode]) {
            inDegree[neighbor]--;
        }
    }
    return result;
}
`,
    typescript: `function findTopologicalOrder(n: number, edges: number[][]): number[] {
    const adj: number[][] = Array.from({length: n}, () => []);
    const inDegree: number[] = new Array(n).fill(0);
    for (const [u, v] of edges) {
        adj[u].push(v);
        inDegree[v]++;
    }
    const processed: boolean[] = new Array(n).fill(false);
    const result: number[] = [];
    for (let step = 0; step < n; step++) {
        let minNode = -1;
        for (let i = 0; i < n; i++) {
            if (!processed[i] && inDegree[i] === 0) {
                minNode = i;
                break;
            }
        }
        if (minNode === -1) break;
        result.push(minNode);
        processed[minNode] = true;
        for (const neighbor of adj[minNode]) {
            inDegree[neighbor]--;
        }
    }
    return result;
}`,
    java: `class Solution {
    public int[] findTopologicalOrder(int n, int[][] edges) {
        int[][] adj = new int[n][n];
        int[] adjCount = new int[n];
        int[] inDegree = new int[n];
        for (int[] edge : edges) {
            adj[edge[0]][adjCount[edge[0]]++] = edge[1];
            inDegree[edge[1]]++;
        }
        int[] result = new int[n];
        boolean[] visited = new boolean[n];
        for (int step = 0; step < n; step++) {
            int minNode = -1;
            for (int i = 0; i < n; i++) {
                if (!visited[i] && inDegree[i] == 0) {
                    minNode = i;
                    break;
                }
            }
            if (minNode == -1) break;
            result[step] = minNode;
            visited[minNode] = true;
            for (int j = 0; j < adjCount[minNode]; j++) {
                inDegree[adj[minNode][j]]--;
            }
        }
        return result;
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int[] FindTopologicalOrder(int n, int[][] edges) {
        List<int>[] adj = new List<int>[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new List<int>();
        }
        int[] inDegree = new int[n];
        foreach (int[] edge in edges) {
            adj[edge[0]].Add(edge[1]);
            inDegree[edge[1]]++;
        }
        int[] result = new int[n];
        bool[] visited = new bool[n];
        for (int step = 0; step < n; step++) {
            int minNode = -1;
            for (int i = 0; i < n; i++) {
                if (!visited[i] && inDegree[i] == 0) {
                    minNode = i;
                    break;
                }
            }
            if (minNode == -1) break;
            result[step] = minNode;
            visited[minNode] = true;
            foreach (int neighbor in adj[minNode]) {
                inDegree[neighbor]--;
            }
        }
        return result;
    }
}`,
    c: `#include <stdlib.h>
#include <string.h>

int* findTopologicalOrder(int n, int** edges, int edgesSize, int* edgesColSize, int* returnSize) {
    int inDegree[105];
    int adj[105][105];
    int adjCount[105];
    int i, j, step, minNode, u, v;
    memset(inDegree, 0, sizeof(inDegree));
    memset(adjCount, 0, sizeof(adjCount));
    for (i = 0; i < edgesSize; i++) {
        u = edges[i][0];
        v = edges[i][1];
        adj[u][adjCount[u]++] = v;
        inDegree[v]++;
    }
    int* result = (int*)malloc(n * sizeof(int));
    *returnSize = n;
    int processed[105];
    memset(processed, 0, sizeof(processed));
    for (step = 0; step < n; step++) {
        minNode = -1;
        for (i = 0; i < n; i++) {
            if (!processed[i] && inDegree[i] == 0) {
                minNode = i;
                break;
            }
        }
        if (minNode == -1) break;
        result[step] = minNode;
        processed[minNode] = 1;
        for (j = 0; j < adjCount[minNode]; j++) {
            inDegree[adj[minNode][j]]--;
        }
    }
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> findTopologicalOrder(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        vector<int> inDegree(n, 0);
        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            inDegree[edge[1]]++;
        }
        vector<bool> processed(n, false);
        vector<int> result;
        for (int step = 0; step < n; step++) {
            int minNode = -1;
            for (int i = 0; i < n; i++) {
                if (!processed[i] && inDegree[i] == 0) {
                    minNode = i;
                    break;
                }
            }
            if (minNode == -1) break;
            result.push_back(minNode);
            processed[minNode] = true;
            for (int neighbor : adj[minNode]) {
                inDegree[neighbor]--;
            }
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Kahn's Algorithm with Greedy Minimum Selection

A **topological ordering** places every node \`u\` before any node \`v\` where an edge \`u → v\` exists. To get the **lexicographically smallest** such ordering, we use **Kahn's algorithm** and always pick the smallest available node.

### Steps

1. **Build in-degrees.** For each edge \`[u, v]\`, increment \`inDegree[v]\`. Nodes with \`inDegree == 0\` have no unresolved prerequisites.

2. **Seed the ready set.** Insert all nodes with \`inDegree == 0\` into a min-priority queue (or use a linear scan for simplicity).

3. **Greedy extraction loop:**
   - Remove the smallest node from the ready set.
   - Append it to the result.
   - For each outgoing neighbor, decrement its in-degree. If it reaches 0, add it to the ready set.

4. **Return** the result array (will contain all \`n\` nodes for a valid DAG).

### Why does greedy work here?

At each step every node in the ready set is a valid candidate (all predecessors already placed). Choosing the minimum index always yields a lexicographically non-worse prefix—any other choice could only increase the prefix.

### Complexity

| | |
|---|---|
| **Time** | O((n + E) log n) with a min-heap; O(n² + E) with a linear scan |
| **Space** | O(n + E) |`,
};

export default problem;
