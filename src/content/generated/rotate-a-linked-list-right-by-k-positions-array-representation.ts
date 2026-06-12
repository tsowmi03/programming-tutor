import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "rotate-a-linked-list-right-by-k-positions-array-representation",
  title: "Rotate Linked List Right by K Positions",
  difficulty: "medium",
  category: "linked-lists",
  order: 1117,
  description: `You are given a singly linked list represented as an integer array \`nodes\` and a non-negative integer \`k\`. Rotate the list to the **right** by \`k\` positions and return the resulting list as an integer array.

Rotating right by 1 moves the last element to the front. Rotating right by \`k\` applies this operation \`k\` times (but you should do it efficiently).

\`\`\`text
Example 1:
Input:  nodes = [1, 2, 3, 4, 5], k = 2
Output: [4, 5, 1, 2, 3]
Explanation:
After 1 rotation: [5, 1, 2, 3, 4]
After 2 rotations: [4, 5, 1, 2, 3]
\`\`\`

\`\`\`text
Example 2:
Input:  nodes = [0, 1, 2], k = 4
Output: [2, 0, 1]
Explanation:
Length is 3, so k mod 3 = 1 effective rotation.
After 1 rotation: [2, 0, 1]
\`\`\`

\`\`\`text
Example 3:
Input:  nodes = [1], k = 100
Output: [1]
Explanation:
Single element list is unchanged.
\`\`\`

**Constraints:**
- \`0 <= nodes.length <= 1000\`
- \`-10000 <= nodes[i] <= 10000\`
- \`0 <= k <= 100000\``,
  hints: [
    `If the list has length n, rotating by k is the same as rotating by k % n. What does that tell you about which element becomes the new head?`,
    `The new head is at index n - (k % n). Try splitting the array at that index and rearranging the two parts.`,
    `Be careful with edge cases: empty list, single element, or k that is a multiple of n (no rotation needed).`,
  ],
  signature: {
    "name": "rotateRight",
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
    "returns": "int[]",
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
      "expected": [
        4,
        5,
        1,
        2,
        3
      ],
      "hidden": false
    },
    {
      "input": [
        [
          0,
          1,
          2
        ],
        4
      ],
      "expected": [
        2,
        0,
        1
      ],
      "hidden": false
    },
    {
      "input": [
        [
          1
        ],
        100
      ],
      "expected": [
        1
      ],
      "hidden": false
    },
    {
      "input": [
        [],
        5
      ],
      "expected": [],
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
        0
      ],
      "expected": [
        1,
        2,
        3,
        4,
        5
      ],
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
      "expected": [
        1,
        2,
        3,
        4,
        5
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2
        ],
        1
      ],
      "expected": [
        2,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          3,
          -1,
          7,
          0,
          -5,
          2
        ],
        3
      ],
      "expected": [
        0,
        -5,
        2,
        3,
        -1,
        7
      ],
      "hidden": true
    },
    {
      "input": [
        [
          10,
          20,
          30
        ],
        9
      ],
      "expected": [
        10,
        20,
        30
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -2,
          -3,
          -4
        ],
        6
      ],
      "expected": [
        -3,
        -4,
        -1,
        -2
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def rotate_right(nodes: list[int], k: int) -> list[int]:
    # TODO: implement rotation
    return []`,
    javascript: `function rotateRight(nodes, k) {
    // TODO: implement rotation
    return [];
}`,
    java: `class Solution {
    public int[] rotateRight(int[] nodes, int k) {
        // TODO: implement rotation
        return new int[0];
    }
}`,
    c: `int* rotateRight(int* nodes, int nodesSize, int k, int* returnSize) {
    // TODO: implement rotation
    *returnSize = 0;
    return NULL;
}`,
  },
  solutions: {
    python: `def rotate_right(nodes: list[int], k: int) -> list[int]:
    n = len(nodes)
    if n == 0 or k == 0:
        return nodes[:]
    effective = k % n
    if effective == 0:
        return nodes[:]
    split = n - effective
    return nodes[split:] + nodes[:split]`,
    javascript: `function rotateRight(nodes, k) {
    const n = nodes.length;
    if (n === 0 || k === 0) return nodes.slice();
    const effective = k % n;
    if (effective === 0) return nodes.slice();
    const split = n - effective;
    return nodes.slice(split).concat(nodes.slice(0, split));
}`,
    java: `class Solution {
    public int[] rotateRight(int[] nodes, int k) {
        int n = nodes.length;
        if (n == 0 || k == 0) return nodes.clone();
        int effective = k % n;
        if (effective == 0) return nodes.clone();
        int split = n - effective;
        int[] result = new int[n];
        int idx = 0;
        for (int i = split; i < n; i++) result[idx++] = nodes[i];
        for (int i = 0; i < split; i++) result[idx++] = nodes[i];
        return result;
    }
}`,
    c: `int* rotateRight(int* nodes, int nodesSize, int k, int* returnSize) {
    *returnSize = nodesSize;
    if (nodesSize == 0) {
        *returnSize = 0;
        return NULL;
    }
    int effective = k % nodesSize;
    int* result = (int*)malloc(nodesSize * sizeof(int));
    if (effective == 0) {
        for (int i = 0; i < nodesSize; i++) result[i] = nodes[i];
        return result;
    }
    int split = nodesSize - effective;
    int idx = 0;
    for (int i = split; i < nodesSize; i++) result[idx++] = nodes[i];
    for (int i = 0; i < split; i++) result[idx++] = nodes[i];
    return result;
}`,
  },
  editorial: `## Approach: Modular Arithmetic + Array Slicing

### Key Insight

Rotating a list of length \`n\` to the right by \`k\` is equivalent to rotating by \`k % n\` (since rotating by \`n\` returns the original list). After \`k % n\` right rotations, the element at index \`n - (k % n)\` becomes the new head.

So the result is simply: \`nodes[split:] + nodes[:split]\` where \`split = n - (k % n)\`.

### Algorithm

1. Compute \`n = len(nodes)\`. Handle empty list.
2. Compute \`effective = k % n\`. If \`effective == 0\`, return a copy of the original.
3. Set \`split = n - effective\`.
4. Return \`nodes[split..n-1]\` concatenated with \`nodes[0..split-1]\`.

### Complexity

- **Time:** O(n) — one pass to build the output array.
- **Space:** O(n) — for the output array.

### Example Trace

\`\`\`
nodes = [1, 2, 3, 4, 5], k = 2
n = 5, effective = 2 % 5 = 2, split = 5 - 2 = 3
result = nodes[3..4] + nodes[0..2]
       = [4, 5] + [1, 2, 3]
       = [4, 5, 1, 2, 3]
\`\`\`

Edge cases handled: empty array returns \`[]\`; \`k\` multiple of \`n\` returns original list unchanged.`,
};

export default problem;
