import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "number-of-provinces-in-a-friendship-graph-int-adjacency-matrix",
  title: "Number of Provinces",
  difficulty: "medium",
  category: "trees-graphs",
  order: 1134,
  description: `You are given \`n\` cities. Some of them are connected directly by roads. You are given an \`n x n\` adjacency matrix \`isConnected\`, where \`isConnected[i][j] == 1\` means city \`i\` and city \`j\` are directly connected, and \`isConnected[i][j] == 0\` means they are not.

A **province** is a group of cities that are directly or indirectly connected to each other. Cities not connected to any other city form their own province.

Return the **total number of provinces**.

\`\`\`text
Example 1:
Input:  isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
Explanation: Cities 0 and 1 are connected → one province.
             City 2 is alone → another province.
             Total = 2.
\`\`\`

\`\`\`text
Example 2:
Input:  isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
Explanation: No cities are connected to each other.
             Each city is its own province → Total = 3.
\`\`\`

\`\`\`text
Example 3:
Input:  isConnected = [[1,1,0,0],[1,1,1,0],[0,1,1,0],[0,0,0,1]]
Output: 2
Explanation: Cities 0, 1, 2 are all connected (transitively) → one province.
             City 3 is alone → another province.
             Total = 2.
\`\`\`

**Constraints:**
- \`1 <= n <= 200\`
- \`isConnected.length == n\`
- \`isConnected[i].length == n\`
- \`isConnected[i][j]\` is \`0\` or \`1\`
- \`isConnected[i][i] == 1\`
- \`isConnected[i][j] == isConnected[j][i]\``,
  hints: [
    `Think of each city as a node in an undirected graph. Two nodes share an edge when isConnected[i][j] == 1. The answer is the number of connected components.`,
    `You can use Depth-First Search (DFS): pick an unvisited city, mark all cities reachable from it as visited, and count how many times you have to start a new search.`,
    `Alternatively, Union-Find (Disjoint Set Union) is a clean fit: union every pair (i, j) where isConnected[i][j] == 1, then count the number of distinct roots.`,
  ],
  signature: {
    "name": "findCircleNum",
    "params": [
      {
        "name": "isConnected",
        "type": "int[][]"
      }
    ],
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          [
            1,
            1,
            0
          ],
          [
            1,
            1,
            0
          ],
          [
            0,
            0,
            1
          ]
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          [
            1,
            0,
            0
          ],
          [
            0,
            1,
            0
          ],
          [
            0,
            0,
            1
          ]
        ]
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          [
            1,
            1,
            0,
            0
          ],
          [
            1,
            1,
            1,
            0
          ],
          [
            0,
            1,
            1,
            0
          ],
          [
            0,
            0,
            0,
            1
          ]
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          [
            1
          ]
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          [
            1,
            1
          ],
          [
            1,
            1
          ]
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          [
            1,
            0,
            0,
            0
          ],
          [
            0,
            1,
            0,
            0
          ],
          [
            0,
            0,
            1,
            0
          ],
          [
            0,
            0,
            0,
            1
          ]
        ]
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          [
            1,
            1,
            1,
            1
          ],
          [
            1,
            1,
            1,
            1
          ],
          [
            1,
            1,
            1,
            1
          ],
          [
            1,
            1,
            1,
            1
          ]
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          [
            1,
            0,
            0,
            1,
            0
          ],
          [
            0,
            1,
            1,
            0,
            0
          ],
          [
            0,
            1,
            1,
            0,
            0
          ],
          [
            1,
            0,
            0,
            1,
            0
          ],
          [
            0,
            0,
            0,
            0,
            1
          ]
        ]
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          [
            1,
            1,
            0,
            0,
            0
          ],
          [
            1,
            1,
            0,
            0,
            0
          ],
          [
            0,
            0,
            1,
            1,
            0
          ],
          [
            0,
            0,
            1,
            1,
            0
          ],
          [
            0,
            0,
            0,
            0,
            1
          ]
        ]
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def find_circle_num(is_connected: list[list[int]]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `/**
 * @param {number[][]} isConnected
 * @return {number}
 */
function findCircleNum(isConnected) {
    // TODO: implement
    return 0;
}
`,
    java: `class Solution {
    public int findCircleNum(int[][] isConnected) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int findCircleNum(int** isConnected, int isConnectedSize, int* isConnectedColSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def find_circle_num(is_connected: list[list[int]]) -> int:
    n = len(is_connected)
    visited = [False] * n

    def dfs(city):
        for neighbor in range(n):
            if is_connected[city][neighbor] == 1 and not visited[neighbor]:
                visited[neighbor] = True
                dfs(neighbor)

    provinces = 0
    for i in range(n):
        if not visited[i]:
            visited[i] = True
            dfs(i)
            provinces += 1
    return provinces
`,
    javascript: `function findCircleNum(isConnected) {
    const n = isConnected.length;
    const visited = new Array(n).fill(false);

    function dfs(city) {
        for (let neighbor = 0; neighbor < n; neighbor++) {
            if (isConnected[city][neighbor] === 1 && !visited[neighbor]) {
                visited[neighbor] = true;
                dfs(neighbor);
            }
        }
    }

    let provinces = 0;
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            visited[i] = true;
            dfs(i);
            provinces++;
        }
    }
    return provinces;
}
`,
    java: `class Solution {
    private int n;
    private boolean[] visited;
    private int[][] isConnected;

    public int findCircleNum(int[][] isConnected) {
        this.n = isConnected.length;
        this.isConnected = isConnected;
        this.visited = new boolean[n];
        int provinces = 0;
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                visited[i] = true;
                dfs(i);
                provinces++;
            }
        }
        return provinces;
    }

    private void dfs(int city) {
        for (int neighbor = 0; neighbor < n; neighbor++) {
            if (isConnected[city][neighbor] == 1 && !visited[neighbor]) {
                visited[neighbor] = true;
                dfs(neighbor);
            }
        }
    }
}
`,
    c: `int findCircleNum(int** isConnected, int isConnectedSize, int* isConnectedColSize) {
    int n = isConnectedSize;
    int visited[200] = {0};
    int stack[200];
    int provinces = 0;
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            provinces++;
            int top = 0;
            stack[top++] = i;
            visited[i] = 1;
            while (top > 0) {
                int city = stack[--top];
                for (int neighbor = 0; neighbor < n; neighbor++) {
                    if (isConnected[city][neighbor] == 1 && !visited[neighbor]) {
                        visited[neighbor] = 1;
                        stack[top++] = neighbor;
                    }
                }
            }
        }
    }
    return provinces;
}
`,
  },
  editorial: `## Approach: DFS to Count Connected Components

The problem reduces to counting the number of **connected components** in an undirected graph represented by an adjacency matrix.

### Algorithm

1. Maintain a \`visited\` boolean array of size \`n\`, initialised to \`false\`.
2. Iterate over every city \`i\` from \`0\` to \`n-1\`.
3. If city \`i\` has **not** been visited, it is the start of a new province:
   - Increment the province counter.
   - Run DFS from city \`i\`, marking every reachable city as visited.
4. Return the province counter.

### Why it works

DFS from a starting node visits exactly the cities in its connected component. By only starting a new DFS when we encounter an unvisited node, we count each component exactly once.

### Complexity

- **Time:** O(n²) — we examine every cell of the adjacency matrix once.
- **Space:** O(n) — for the \`visited\` array and the DFS call stack (at most \`n\` deep).

### Alternative: Union-Find

Initialise \`parent[i] = i\` for all cities. For each pair \`(i, j)\` with \`isConnected[i][j] == 1\`, union their sets. The answer is the number of cities that are their own root (\`find(i) == i\`). Both approaches run in O(n²).`,
};

export default problem;
