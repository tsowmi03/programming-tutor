import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "reverse-a-singly-linked-list-represented-as-an-int-array-of-values",
  title: "Reverse a Linked List (Array Representation)",
  difficulty: "easy",
  category: "linked-lists",
  order: 1109,
  description: `A singly linked list is represented as an array of integers where \`values[i]\` is the value of the \`i\`-th node and the nodes are linked in order (index 0 → index 1 → … → index n-1).

Given this array representation, return a **new array** that represents the linked list with all nodes reversed (i.e., the last node becomes the head, and so on).

\`\`\`text
Example 1:
Input:  values = [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]
Explanation: The list 1->2->3->4->5 reversed is 5->4->3->2->1.
\`\`\`

\`\`\`text
Example 2:
Input:  values = [7, 3]
Output: [3, 7]
Explanation: The list 7->3 reversed is 3->7.
\`\`\`

\`\`\`text
Example 3:
Input:  values = [42]
Output: [42]
Explanation: A single-node list reversed is itself.
\`\`\`

**Constraints:**
- \`0 <= values.length <= 10^4\`
- \`-10^5 <= values[i] <= 10^5\``,
  hints: [
    `Think about what reversing a linked list means in terms of the array: the first element goes last, and the last element goes first.`,
    `You can simply reverse the array. Try using two pointers — one starting at the beginning and one at the end — swapping elements as they move toward each other.`,
    `Don't forget to handle the edge cases: an empty list and a single-element list should be returned as-is.`,
  ],
  signature: {
    "name": "reverseLinkedList",
    "params": [
      {
        "name": "values",
        "type": "int[]"
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
        ]
      ],
      "expected": [
        5,
        4,
        3,
        2,
        1
      ],
      "hidden": false
    },
    {
      "input": [
        [
          7,
          3
        ]
      ],
      "expected": [
        3,
        7
      ],
      "hidden": false
    },
    {
      "input": [
        [
          42
        ]
      ],
      "expected": [
        42
      ],
      "hidden": false
    },
    {
      "input": [
        []
      ],
      "expected": [],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1
        ]
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
          -3,
          -2,
          -1,
          0,
          1,
          2,
          3
        ]
      ],
      "expected": [
        3,
        2,
        1,
        0,
        -1,
        -2,
        -3
      ],
      "hidden": true
    },
    {
      "input": [
        [
          100000,
          -100000
        ]
      ],
      "expected": [
        -100000,
        100000
      ],
      "hidden": true
    },
    {
      "input": [
        [
          5,
          4,
          3,
          2,
          1
        ]
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
          3
        ]
      ],
      "expected": [
        3,
        2,
        1
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def reverse_linked_list(values: list[int]) -> list[int]:
    # TODO: implement this function
    return []
`,
    javascript: `/**
 * @param {number[]} values
 * @return {number[]}
 */
function reverseLinkedList(values) {
    // TODO: implement this function
    return [];
}
`,
    typescript: `function reverseLinkedList(values: number[]): number[] {
    // TODO: implement this function
    return [];
}`,
    java: `class Solution {
    public int[] reverseLinkedList(int[] values) {
        // TODO: implement this function
        return new int[]{};
    }
}
`,
    csharp: `public class Solution {
    public int[] ReverseLinkedList(int[] values) {
        // TODO: implement this function
        return new int[]{};
    }
}`,
    c: `#include <stdlib.h>

int* reverseLinkedList(int* values, int valuesSize, int* returnSize) {
    // TODO: implement this function
    *returnSize = 0;
    return NULL;
}
`,
    cpp: `class Solution {
public:
    vector<int> reverseLinkedList(vector<int>& values) {
        // TODO: implement this function
        return {};
    }
};`,
  },
  solutions: {
    python: `def reverse_linked_list(values: list[int]) -> list[int]:
    return values[::-1]
`,
    javascript: `/**
 * @param {number[]} values
 * @return {number[]}
 */
function reverseLinkedList(values) {
    let left = 0;
    let right = values.length - 1;
    const result = [...values];
    while (left < right) {
        const tmp = result[left];
        result[left] = result[right];
        result[right] = tmp;
        left++;
        right--;
    }
    return result;
}
`,
    typescript: `function reverseLinkedList(values: number[]): number[] {
    let left = 0;
    let right = values.length - 1;
    const result = [...values];
    while (left < right) {
        const tmp = result[left];
        result[left] = result[right];
        result[right] = tmp;
        left++;
        right--;
    }
    return result;
}`,
    java: `class Solution {
    public int[] reverseLinkedList(int[] values) {
        int n = values.length;
        int[] result = new int[n];
        for (int i = 0; i < n; i++) {
            result[i] = values[n - 1 - i];
        }
        return result;
    }
}
`,
    csharp: `public class Solution {
    public int[] ReverseLinkedList(int[] values) {
        int n = values.Length;
        int[] result = new int[n];
        for (int i = 0; i < n; i++) {
            result[i] = values[n - 1 - i];
        }
        return result;
    }
}`,
    c: `#include <stdlib.h>

int* reverseLinkedList(int* values, int valuesSize, int* returnSize) {
    *returnSize = valuesSize;
    if (valuesSize == 0) {
        return NULL;
    }
    int* result = (int*)malloc(valuesSize * sizeof(int));
    for (int i = 0; i < valuesSize; i++) {
        result[i] = values[valuesSize - 1 - i];
    }
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> reverseLinkedList(vector<int>& values) {
        int n = values.size();
        vector<int> result(n);
        for (int i = 0; i < n; i++) {
            result[i] = values[n - 1 - i];
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Two-Pointer Reversal

Since the linked list is represented as a plain array, reversing the linked list is equivalent to reversing the array.

### Key Idea
Use two pointers — \`left\` starting at index \`0\` and \`right\` starting at index \`n-1\`. Swap the elements at these positions, then move \`left\` forward and \`right\` backward until they meet in the middle.

### Steps
1. If the array is empty or has one element, return it as-is.
2. Otherwise, swap \`values[left]\` and \`values[right]\`.
3. Increment \`left\`, decrement \`right\`.
4. Repeat until \`left >= right\`.

### Complexity
- **Time:** O(n) — we visit each element once.
- **Space:** O(n) — we create a new result array (O(1) extra if reversing in-place).

### Example Trace
\`\`\`
values = [1, 2, 3, 4, 5]
Step 1: swap index 0 and 4 → [5, 2, 3, 4, 1]
Step 2: swap index 1 and 3 → [5, 4, 3, 2, 1]
Step 3: left == right (index 2), stop.
Result: [5, 4, 3, 2, 1]
\`\`\`

This directly simulates what it means to reverse a linked list: node pointers are re-wired so that each node points to its predecessor instead of its successor.`,
};

export default problem;
