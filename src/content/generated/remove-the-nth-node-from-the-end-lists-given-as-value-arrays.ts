import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "remove-the-nth-node-from-the-end-lists-given-as-value-arrays",
  title: "Remove Nth Node From End of List",
  difficulty: "medium",
  category: "linked-lists",
  order: 1116,
  description: `You are given an integer array \`nodes\` representing the values of a singly linked list in order, and an integer \`n\`.

Remove the **n-th node from the end** of the list and return the resulting list as an integer array.

You may assume \`n\` is always valid (1 ≤ n ≤ length of list).

\`\`\`text
Example 1:
Input:  nodes = [1, 2, 3, 4, 5], n = 2
Output: [1, 2, 3, 5]
Explanation: The 2nd node from the end is the node with value 4.
             Removing it gives [1, 2, 3, 5].
\`\`\`

\`\`\`text
Example 2:
Input:  nodes = [1, 2], n = 1
Output: [1]
Explanation: The 1st node from the end is the node with value 2.
             Removing it gives [1].
\`\`\`

\`\`\`text
Example 3:
Input:  nodes = [5], n = 1
Output: []
Explanation: Removing the only element leaves an empty list.
\`\`\`

**Constraints:**
- 1 ≤ nodes.length ≤ 1000
- -10^4 ≤ nodes[i] ≤ 10^4
- 1 ≤ n ≤ nodes.length`,
  hints: [
    `The index of the node to remove (0-based from the start) is \`len - n\`, where \`len\` is the total length of the list.`,
    `Try using two pointers: advance the first pointer by n steps, then move both pointers together until the first reaches the end. The second pointer will be just before the node to remove.`,
    `Don't forget the edge case where the node to remove is the head (when n equals the length of the list).`,
  ],
  signature: {
    "name": "removeNthFromEnd",
    "params": [
      {
        "name": "nodes",
        "type": "int[]"
      },
      {
        "name": "n",
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
        1,
        2,
        3,
        5
      ],
      "hidden": false
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
        1
      ],
      "hidden": false
    },
    {
      "input": [
        [
          5
        ],
        1
      ],
      "expected": [],
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
        5
      ],
      "expected": [
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
        1
      ],
      "expected": [
        1,
        2,
        3,
        4
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2
        ],
        2
      ],
      "expected": [
        2
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        2
      ],
      "expected": [
        1,
        3
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -5,
          0,
          3,
          -1,
          7
        ],
        3
      ],
      "expected": [
        -5,
        0,
        -1,
        7
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1
        ],
        2
      ],
      "expected": [
        1,
        1,
        1
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `from typing import List

def remove_nth_from_end(nodes: List[int], n: int) -> List[int]:
    # TODO: implement this function
    return []
`,
    javascript: `/**
 * @param {number[]} nodes
 * @param {number} n
 * @return {number[]}
 */
function removeNthFromEnd(nodes, n) {
    // TODO: implement this function
    return [];
}
`,
    java: `class Solution {
    public int[] removeNthFromEnd(int[] nodes, int n) {
        // TODO: implement this function
        return new int[0];
    }
}
`,
    c: `#include <stdlib.h>

int* removeNthFromEnd(int* nodes, int nodesSize, int n, int* returnSize) {
    // TODO: implement this function
    *returnSize = 0;
    return NULL;
}
`,
  },
  solutions: {
    python: `from typing import List

def remove_nth_from_end(nodes: List[int], n: int) -> List[int]:
    length = len(nodes)
    remove_index = length - n
    result = []
    for i, val in enumerate(nodes):
        if i != remove_index:
            result.append(val)
    return result
`,
    javascript: `/**
 * @param {number[]} nodes
 * @param {number} n
 * @return {number[]}
 */
function removeNthFromEnd(nodes, n) {
    const length = nodes.length;
    const removeIndex = length - n;
    const result = [];
    for (let i = 0; i < length; i++) {
        if (i !== removeIndex) {
            result.push(nodes[i]);
        }
    }
    return result;
}
`,
    java: `class Solution {
    public int[] removeNthFromEnd(int[] nodes, int n) {
        int length = nodes.length;
        int removeIndex = length - n;
        int[] result = new int[length - 1];
        int j = 0;
        for (int i = 0; i < length; i++) {
            if (i != removeIndex) {
                result[j++] = nodes[i];
            }
        }
        return result;
    }
}
`,
    c: `#include <stdlib.h>

int* removeNthFromEnd(int* nodes, int nodesSize, int n, int* returnSize) {
    int removeIndex = nodesSize - n;
    int newSize = nodesSize - 1;
    *returnSize = newSize;
    if (newSize == 0) {
        return NULL;
    }
    int* result = (int*)malloc(newSize * sizeof(int));
    int j = 0;
    for (int i = 0; i < nodesSize; i++) {
        if (i != removeIndex) {
            result[j++] = nodes[i];
        }
    }
    return result;
}
`,
  },
  editorial: `## Approach: Calculate Remove Index

### Intuition

Given a list of length \`L\`, the n-th node from the end is at **0-based index \`L - n\`** from the start. Once we know this index, we simply copy all elements except the one at that index into a new array.

### Algorithm

1. Compute \`length = len(nodes)\`.
2. Compute \`removeIndex = length - n\`.
3. Iterate through the array. Copy every element whose index is **not** \`removeIndex\` into the result.
4. Return the result.

### Two-Pointer Alternative (classic linked-list approach)

For a true linked list (not an array), the standard O(1)-space technique uses two pointers:
- Advance the **fast** pointer \`n\` steps ahead.
- Move both **fast** and **slow** together until **fast** reaches the end.
- **slow** is now just before the node to delete.

Because the input here is already an array, the direct index calculation is cleaner.

### Complexity

- **Time:** O(L) — single pass to build the result.
- **Space:** O(L) — for the output array.

### Edge Cases

- Removing the **head** (\`n == L\`): \`removeIndex = 0\`, handled naturally.
- Removing the **tail** (\`n == 1\`): \`removeIndex = L - 1\`, handled naturally.
- Single-element list: result is an empty array.`,
};

export default problem;
