import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-connected-components-in-an-undirected-graph-given-as-an-edge-list-int",
  title: "Count Connected Components",
  difficulty: "easy",
  category: "trees-graphs",
  order: 1122,
  description: `Given an undirected graph with \`n\` nodes (labeled \`0\` to \`n-1\`) and a list of edges, return the number of **connected components** in the graph.

Each edge \`edges[i] = [u, v]\` indicates an undirected edge between node \`u\` and node \`v\`.

\`\`\`text
Example 1:
n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2
Explanation: Nodes {0,1,2} form one component and {3,4} form another.
\`\`\`

\`\`\`text
Example 2:
n = 4, edges = [[0,1],[2,3],[1,2]]
Output: 1
Explanation: All four nodes are connected.
\`\`\`

\`\`\`text
Example 3:
n = 3, edges = []
Output: 3
Explanation: No edges means every node is its own component.
\`\`\`

**Constraints:**
- \`1 <= n <= 1000\`
- \`0 <= edges.length <= 5000\`
- \`edges[i].length == 2\`
- \`0 <= u, v < n\`
- No self-loops and no repeated edges.`,
  hints: [
    `Try a BFS or DFS from each unvisited node — each time you start a new traversal, you've found a new component.`,
    `Alternatively, use Union-Find (Disjoint Set Union): start with n components, and merge two nodes whenever there's an edge between them.`,
  ],
  signature: {
    "name": "countComponents",
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
    "returns": "int"
  },
  testCases: [
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
            3,
            4
          ]
        ]
      ],
      "expected": 2,
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
            2,
            3
          ],
          [
            1,
            2
          ]
        ]
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        3,
        []
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        1,
        []
      ],
      "expected": 1,
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
            2,
            3
          ],
          [
            4,
            5
          ]
        ]
      ],
      "expected": 3,
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
            0,
            3
          ],
          [
            0,
            4
          ]
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        7,
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
            3,
            4
          ],
          [
            5,
            6
          ]
        ]
      ],
      "expected": 3,
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
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        10,
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
            4,
            5
          ],
          [
            6,
            7
          ],
          [
            7,
            8
          ],
          [
            8,
            9
          ]
        ]
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_components(n: int, edges: list[list[int]]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
function countComponents(n, edges) {
    // TODO: implement
    return 0;
}
`,
    typescript: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
function countComponents(n: number, edges: number[][]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countComponents(int n, int[][] edges) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int CountComponents(int n, int[][] edges) {
        // TODO: implement
        return 0;
    }
}`,
    c: `int countComponents(int n, int** edges, int edgesSize, int* edgesColSize) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        // TODO: implement
        return 0;
    }
};`,
  },
  solutions: {
    python: `def count_components(n: int, edges: list[list[int]]) -> int:
    parent = list(range(n))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(x, y):
        px, py = find(x), find(y)
        if px != py:
            parent[px] = py

    for u, v in edges:
        union(u, v)

    return sum(1 for i in range(n) if find(i) == i)
`,
    javascript: `function countComponents(n, edges) {
    const parent = Array.from({length: n}, (_, i) => i);

    function find(x) {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    function union(x, y) {
        const px = find(x), py = find(y);
        if (px !== py) parent[px] = py;
    }

    for (const [u, v] of edges) {
        union(u, v);
    }

    let count = 0;
    for (let i = 0; i < n; i++) {
        if (find(i) === i) count++;
    }
    return count;
}
`,
    typescript: `function countComponents(n: number, edges: number[][]): number {
    const parent: number[] = Array.from({length: n}, (_, i) => i);

    function find(x: number): number {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    function union(x: number, y: number): void {
        const px = find(x), py = find(y);
        if (px !== py) parent[px] = py;
    }

    for (const [u, v] of edges) {
        union(u, v);
    }

    let count = 0;
    for (let i = 0; i < n; i++) {
        if (find(i) === i) count++;
    }
    return count;
}`,
    java: `class Solution {
    private int[] parent;

    private int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void union(int x, int y) {
        int px = find(x), py = find(y);
        if (px != py) parent[px] = py;
    }

    public int countComponents(int n, int[][] edges) {
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        for (int[] edge : edges) {
            union(edge[0], edge[1]);
        }

        int count = 0;
        for (int i = 0; i < n; i++) {
            if (find(i) == i) count++;
        }
        return count;
    }
}
`,
    csharp: `public class Solution {
    private int[] parent;

    private int Find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void Union(int x, int y) {
        int px = Find(x), py = Find(y);
        if (px != py) parent[px] = py;
    }

    public int CountComponents(int n, int[][] edges) {
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        foreach (int[] edge in edges) {
            Union(edge[0], edge[1]);
        }

        int count = 0;
        for (int i = 0; i < n; i++) {
            if (Find(i) == i) count++;
        }
        return count;
    }
}`,
    c: `int countComponents(int n, int** edges, int edgesSize, int* edgesColSize) {
    int parent[1001];
    for (int i = 0; i < n; i++) parent[i] = i;

    for (int i = 0; i < edgesSize; i++) {
        int u = edges[i][0];
        int v = edges[i][1];
        int pu = u;
        while (parent[pu] != pu) pu = parent[pu];
        int pv = v;
        while (parent[pv] != pv) pv = parent[pv];
        if (pu != pv) parent[pu] = pv;
    }

    int count = 0;
    for (int i = 0; i < n; i++) {
        int pi = i;
        while (parent[pi] != pi) pi = parent[pi];
        if (pi == i) count++;
    }
    return count;
}
`,
    cpp: `class Solution {
private:
    vector<int> parent;

    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    void unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px != py) parent[px] = py;
    }

public:
    int countComponents(int n, vector<vector<int>>& edges) {
        parent.resize(n);
        for (int i = 0; i < n; i++) parent[i] = i;

        for (auto& edge : edges) {
            unite(edge[0], edge[1]);
        }

        int count = 0;
        for (int i = 0; i < n; i++) {
            if (find(i) == i) count++;
        }
        return count;
    }
};`,
  },
  editorial: `## Approach: Union-Find (Disjoint Set Union)

### Idea
Start by treating each of the \`n\` nodes as its own component. For every edge \`[u, v]\`, merge the components of \`u\` and \`v\`. At the end, count how many nodes are their own root — that equals the number of components.

### Steps
1. Initialize \`parent[i] = i\` for all \`i\`.
2. For each edge \`[u, v]\`, find the roots of \`u\` and \`v\`. If they differ, set one root's parent to the other (union).
3. After processing all edges, iterate over all nodes; a node \`i\` is a component root if \`find(i) == i\`. Count these roots.

### Complexity
- **Time:** O(n + E · α(n)) where α is the inverse-Ackermann function — nearly O(1) per union/find.
- **Space:** O(n) for the parent array.

### Alternative: BFS/DFS
Build an adjacency list, then iterate over all nodes. For each unvisited node, run BFS/DFS to mark all reachable nodes as visited and increment the component count. Same O(n + E) complexity.`,
};

export default problem;
