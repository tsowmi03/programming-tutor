import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "add-two-numbers-stored-in-reversed-linked-lists-array-representation-return-result-array",
  title: "Add Two Numbers as Reversed Lists",
  difficulty: "medium",
  category: "linked-lists",
  order: 1119,
  description: `You are given two non-empty arrays \`l1\` and \`l2\` representing two non-negative integers. The digits are stored in **reverse order** (least-significant digit first), and each element contains a single digit.

Add the two numbers and return the result as an array in the same reversed format.

\`\`\`text
Example 1:
Input:  l1 = [2, 4, 3], l2 = [5, 6, 4]
Numbers: 342 + 465 = 807
Output: [7, 0, 8]
\`\`\`

\`\`\`text
Example 2:
Input:  l1 = [9, 9, 9, 9], l2 = [9, 9, 9]
Numbers: 9999 + 999 = 10998
Output: [8, 9, 9, 0, 1]
\`\`\`

\`\`\`text
Example 3:
Input:  l1 = [0], l2 = [0]
Output: [0]
\`\`\`

**Constraints:**
- \`1 <= l1.length, l2.length <= 100\`
- \`0 <= l1[i], l2[i] <= 9\`
- Neither \`l1\` nor \`l2\` represents a number with leading zeros (except the number 0 itself).`,
  hints: [
    `Process digits from index 0 upward, just like adding two numbers by hand starting from the ones place.`,
    `Keep track of a carry variable. After processing all digits from both arrays, don't forget to append a final carry of 1 if it exists.`,
    `Use a loop that continues while there are remaining digits in either array OR there is a non-zero carry.`,
  ],
  signature: {
    "name": "addTwoNumbers",
    "params": [
      {
        "name": "l1",
        "type": "int[]"
      },
      {
        "name": "l2",
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
          2,
          4,
          3
        ],
        [
          5,
          6,
          4
        ]
      ],
      "expected": [
        7,
        0,
        8
      ],
      "hidden": false
    },
    {
      "input": [
        [
          9,
          9,
          9,
          9
        ],
        [
          9,
          9,
          9
        ]
      ],
      "expected": [
        8,
        9,
        9,
        0,
        1
      ],
      "hidden": false
    },
    {
      "input": [
        [
          0
        ],
        [
          0
        ]
      ],
      "expected": [
        0
      ],
      "hidden": false
    },
    {
      "input": [
        [
          1
        ],
        [
          9,
          9,
          9
        ]
      ],
      "expected": [
        0,
        0,
        0,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          5
        ],
        [
          5
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
        [
          9
        ],
        [
          1
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
        [
          9,
          9
        ],
        [
          1
        ]
      ],
      "expected": [
        0,
        0,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          3
        ],
        [
          7
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
        [
          1,
          8
        ],
        [
          0,
          2
        ]
      ],
      "expected": [
        1,
        0,
        1
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def add_two_numbers(l1: list[int], l2: list[int]) -> list[int]:
    # TODO: implement
    return []
`,
    javascript: `function addTwoNumbers(l1, l2) {
    // TODO: implement
    return [];
}
`,
    typescript: `function addTwoNumbers(l1: number[], l2: number[]): number[] {
    // TODO: implement
    return [];
}`,
    java: `class Solution {
    public int[] addTwoNumbers(int[] l1, int[] l2) {
        // TODO: implement
        return new int[0];
    }
}
`,
    csharp: `public class Solution {
    public int[] AddTwoNumbers(int[] l1, int[] l2) {
        // TODO: implement
        return new int[0];
    }
}`,
    c: `int* addTwoNumbers(int* l1, int l1Size, int* l2, int l2Size, int* returnSize) {
    // TODO: implement
    *returnSize = 0;
    return NULL;
}
`,
    cpp: `class Solution {
public:
    vector<int> addTwoNumbers(vector<int>& l1, vector<int>& l2) {
        // TODO: implement
        return {};
    }
};`,
  },
  solutions: {
    python: `def add_two_numbers(l1: list[int], l2: list[int]) -> list[int]:
    result = []
    carry = 0
    i = 0
    while i < len(l1) or i < len(l2) or carry:
        a = l1[i] if i < len(l1) else 0
        b = l2[i] if i < len(l2) else 0
        total = a + b + carry
        result.append(total % 10)
        carry = total // 10
        i += 1
    return result
`,
    javascript: `function addTwoNumbers(l1, l2) {
    const result = [];
    let carry = 0;
    let i = 0;
    while (i < l1.length || i < l2.length || carry) {
        const a = i < l1.length ? l1[i] : 0;
        const b = i < l2.length ? l2[i] : 0;
        const total = a + b + carry;
        result.push(total % 10);
        carry = Math.floor(total / 10);
        i++;
    }
    return result;
}
`,
    typescript: `function addTwoNumbers(l1: number[], l2: number[]): number[] {
    const result: number[] = [];
    let carry = 0;
    let i = 0;
    while (i < l1.length || i < l2.length || carry) {
        const a = i < l1.length ? l1[i] : 0;
        const b = i < l2.length ? l2[i] : 0;
        const total = a + b + carry;
        result.push(total % 10);
        carry = Math.floor(total / 10);
        i++;
    }
    return result;
}`,
    java: `class Solution {
    public int[] addTwoNumbers(int[] l1, int[] l2) {
        int maxLen = Math.max(l1.length, l2.length) + 1;
        int[] temp = new int[maxLen];
        int carry = 0, i = 0, size = 0;
        while (i < l1.length || i < l2.length || carry != 0) {
            int a = i < l1.length ? l1[i] : 0;
            int b = i < l2.length ? l2[i] : 0;
            int total = a + b + carry;
            temp[size++] = total % 10;
            carry = total / 10;
            i++;
        }
        int[] result = new int[size];
        for (int j = 0; j < size; j++) result[j] = temp[j];
        return result;
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int[] AddTwoNumbers(int[] l1, int[] l2) {
        List<int> result = new List<int>();
        int carry = 0, i = 0;
        while (i < l1.Length || i < l2.Length || carry != 0) {
            int a = i < l1.Length ? l1[i] : 0;
            int b = i < l2.Length ? l2[i] : 0;
            int total = a + b + carry;
            result.Add(total % 10);
            carry = total / 10;
            i++;
        }
        return result.ToArray();
    }
}`,
    c: `#include <stdlib.h>
int* addTwoNumbers(int* l1, int l1Size, int* l2, int l2Size, int* returnSize) {
    int maxLen = (l1Size > l2Size ? l1Size : l2Size) + 1;
    int* result = (int*)malloc(maxLen * sizeof(int));
    int carry = 0, i = 0, size = 0;
    while (i < l1Size || i < l2Size || carry) {
        int a = i < l1Size ? l1[i] : 0;
        int b = i < l2Size ? l2[i] : 0;
        int total = a + b + carry;
        result[size++] = total % 10;
        carry = total / 10;
        i++;
    }
    *returnSize = size;
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> addTwoNumbers(vector<int>& l1, vector<int>& l2) {
        vector<int> result;
        int carry = 0, i = 0;
        while (i < (int)l1.size() || i < (int)l2.size() || carry) {
            int a = i < (int)l1.size() ? l1[i] : 0;
            int b = i < (int)l2.size() ? l2[i] : 0;
            int total = a + b + carry;
            result.push_back(total % 10);
            carry = total / 10;
            i++;
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Digit-by-Digit Addition with Carry

### Intuition
Because both arrays store digits in reverse order (LSB first), we can simulate elementary school addition by iterating from index 0 upward. At each position we sum the corresponding digits plus any carry from the previous step.

### Algorithm
1. Initialize \`carry = 0\` and index \`i = 0\`.
2. Loop while \`i < len(l1)\` OR \`i < len(l2)\` OR \`carry != 0\`:
   - Let \`a = l1[i]\` if in bounds, else \`0\`.
   - Let \`b = l2[i]\` if in bounds, else \`0\`.
   - Compute \`total = a + b + carry\`.
   - Append \`total % 10\` to the result.
   - Set \`carry = total / 10\`.
   - Increment \`i\`.
3. Return the result array.

The loop condition handles arrays of different lengths naturally, and the \`carry\` check ensures a final carry digit (e.g., \`9 + 1 = 10\`) is not dropped.

### Complexity
- **Time:** O(max(n, m)) where n = len(l1), m = len(l2). Each digit is processed once.
- **Space:** O(max(n, m) + 1) for the output array.`,
};

export default problem;
