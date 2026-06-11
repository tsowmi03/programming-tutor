import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "return-the-kth-value-from-the-end-of-a-list-array-representation",
  title: "Kth Value From the End",
  difficulty: "easy",
  category: "linked-lists",
  order: 1112,
  description: `You are given an integer array \`nodes\` representing the values of a singly linked list in order (index 0 is the head), and a positive integer \`k\`.

Return the value of the **k-th node from the end** of the list. It is guaranteed that \`k\` is valid (1 ≤ k ≤ nodes.length).

\`\`\`text
Example 1:
Input:  nodes = [1, 2, 3, 4, 5], k = 2
Output: 4
Explanation: The list is 1 -> 2 -> 3 -> 4 -> 5.
             The 2nd node from the end is 4.
\`\`\`

\`\`\`text
Example 2:
Input:  nodes = [7, 14, 21], k = 3
Output: 7
Explanation: The 3rd node from the end is the head, which has value 7.
\`\`\`

**Constraints:**
- 1 ≤ nodes.length ≤ 10^4
- -10^5 ≤ nodes[i] ≤ 10^5
- 1 ≤ k ≤ nodes.length`,
  hints: [
    `Think about the relationship between the index from the end and the index from the front.`,
    `If the list has n elements and you want the k-th from the end, what index from the beginning does that correspond to?`,
    `The k-th node from the end is at index n - k (0-based).`,
  ],
  signature: {
    "name": "kthFromEnd",
    "params": [
      {
        "name": "nodes",
        "type": "int[]"
      },
      {
        "name": "k",
        "type": "int"
      }
    ],
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          1,
          2,
          3,
          4,
          5
        ],
        2
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        [
          7,
          14,
          21
        ],
        3
      ],
      "expected": 7,
      "hidden": false
    },
    {
      "input": [
        [
          42
        ],
        1
      ],
      "expected": 42,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3,
          4,
          5
        ],
        1
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3,
          4,
          5
        ],
        5
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          10,
          20,
          30,
          40
        ],
        2
      ],
      "expected": 30,
      "hidden": true
    },
    {
      "input": [
        [
          -5,
          -3,
          0,
          3,
          5
        ],
        3
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          100000,
          -100000,
          99999
        ],
        2
      ],
      "expected": -100000,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1,
          2
        ],
        2
      ],
      "expected": 1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def kth_from_end(nodes: list[int], k: int) -> int:
    # TODO: return the k-th value from the end
    return 0
`,
    javascript: `function kthFromEnd(nodes, k) {
    // TODO: return the k-th value from the end
    return 0;
}
`,
    java: `class Solution {
    public int kthFromEnd(int[] nodes, int k) {
        // TODO: return the k-th value from the end
        return 0;
    }
}
`,
    c: `int kthFromEnd(int* nodes, int nodesSize, int k) {
    // TODO: return the k-th value from the end
    return 0;
}
`,
  },
  solutions: {
    python: `def kth_from_end(nodes: list[int], k: int) -> int:
    return nodes[len(nodes) - k]
`,
    javascript: `function kthFromEnd(nodes, k) {
    return nodes[nodes.length - k];
}
`,
    java: `class Solution {
    public int kthFromEnd(int[] nodes, int k) {
        return nodes[nodes.length - k];
    }
}
`,
    c: `int kthFromEnd(int* nodes, int nodesSize, int k) {
    return nodes[nodesSize - k];
}
`,
  },
  editorial: `## Approach: Direct Index Calculation

### Intuition
In a linked list of length \`n\`, the k-th node from the end is the \`(n - k)\`-th node from the front (0-based indexing). Since the list is represented as an array, we can access this directly in O(1) time.

### Algorithm
1. Compute the length \`n = nodes.length\`.
2. Return \`nodes[n - k]\`.

### Two-Pointer Analogy
For an actual linked list (not array-backed), the classic O(n) approach is:
- Advance a **fast** pointer \`k\` steps ahead of a **slow** pointer.
- Move both pointers one step at a time until the fast pointer reaches the end.
- The slow pointer now sits at position \`n - k\` — the answer.

With an array, we skip the traversal entirely.

### Complexity
- **Time:** O(1) — single array index lookup.
- **Space:** O(1) — no extra storage used.`,
};

export default problem;
