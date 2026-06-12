import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "insert-a-value-at-the-front-of-a-list-and-return-the-new-list-array",
  title: "Prepend Value to List",
  difficulty: "easy",
  category: "linked-lists",
  order: 1113,
  description: `You are given an integer array \`list\` representing the values of a singly linked list in order (index 0 is the head), and an integer \`val\`.

Insert \`val\` at the **front** of the list and return the resulting array.

\`\`\`text
Example 1:
Input:  list = [1, 2, 3], val = 0
Output: [0, 1, 2, 3]
\`\`\`

\`\`\`text
Example 2:
Input:  list = [5, 10, 15], val = 99
Output: [99, 5, 10, 15]
\`\`\`

\`\`\`text
Example 3:
Input:  list = [], val = 7
Output: [7]
\`\`\`

**Constraints:**
- \`0 <= list.length <= 1000\`
- \`-10^6 <= list[i], val <= 10^6\``,
  hints: [
    `Think about what the resulting array looks like: the new value comes first, followed by all existing elements.`,
    `You can build the result by allocating an array of size n+1, placing val at index 0, and copying the original elements into indices 1..n.`,
  ],
  signature: {
    "name": "prependToList",
    "params": [
      {
        "name": "list",
        "type": "int[]"
      },
      {
        "name": "val",
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
          3
        ],
        0
      ],
      "expected": [
        0,
        1,
        2,
        3
      ],
      "hidden": false
    },
    {
      "input": [
        [
          5,
          10,
          15
        ],
        99
      ],
      "expected": [
        99,
        5,
        10,
        15
      ],
      "hidden": false
    },
    {
      "input": [
        [],
        7
      ],
      "expected": [
        7
      ],
      "hidden": false
    },
    {
      "input": [
        [
          42
        ],
        -1
      ],
      "expected": [
        -1,
        42
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1
        ],
        1
      ],
      "expected": [
        1,
        1,
        1,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -5,
          -3,
          -1
        ],
        -7
      ],
      "expected": [
        -7,
        -5,
        -3,
        -1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1000000
        ],
        -1000000
      ],
      "expected": [
        -1000000,
        1000000
      ],
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0,
          0
        ],
        0
      ],
      "expected": [
        0,
        0,
        0,
        0,
        0
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def prepend_to_list(list: list[int], val: int) -> list[int]:
    # TODO: insert val at the front and return the new list
    pass
`,
    javascript: `/**
 * @param {number[]} list
 * @param {number} val
 * @return {number[]}
 */
function prependToList(list, val) {
    // TODO: insert val at the front and return the new list
}
`,
    java: `class Solution {
    public int[] prependToList(int[] list, int val) {
        // TODO: insert val at the front and return the new list
        return new int[]{};
    }
}
`,
    c: `#include <stdlib.h>
int* prependToList(int* list, int listSize, int val, int* returnSize) {
    // TODO: insert val at the front and return the new list
    *returnSize = 0;
    return NULL;
}
`,
  },
  solutions: {
    python: `def prepend_to_list(list: list[int], val: int) -> list[int]:
    return [val] + list
`,
    javascript: `/**
 * @param {number[]} list
 * @param {number} val
 * @return {number[]}
 */
function prependToList(list, val) {
    return [val, ...list];
}
`,
    java: `class Solution {
    public int[] prependToList(int[] list, int val) {
        int n = list.length;
        int[] result = new int[n + 1];
        result[0] = val;
        for (int i = 0; i < n; i++) {
            result[i + 1] = list[i];
        }
        return result;
    }
}
`,
    c: `#include <stdlib.h>
int* prependToList(int* list, int listSize, int val, int* returnSize) {
    int newSize = listSize + 1;
    int* result = (int*)malloc(newSize * sizeof(int));
    result[0] = val;
    for (int i = 0; i < listSize; i++) {
        result[i + 1] = list[i];
    }
    *returnSize = newSize;
    return result;
}
`,
  },
  editorial: `## Approach: Allocate a New Array of Size n+1

### Intuition
Inserting at the front of a linked list means the new node becomes the new head. When we model the list as an array, we need to place \`val\` at index 0 and shift all original elements one position to the right.

### Steps
1. Create a new array of size \`n + 1\` (where \`n\` is the original length).
2. Set \`result[0] = val\`.
3. Copy each element from the original array into \`result[i + 1]\`.
4. Return the new array.

### Complexity
- **Time:** O(n) — we copy every element once.
- **Space:** O(n) — the returned array is size n+1.

In Python and JavaScript, language built-ins (\`[val] + list\` and \`[val, ...list]\`) handle this concisely. In Java and C we allocate the result array explicitly and copy elements in a loop.`,
};

export default problem;
