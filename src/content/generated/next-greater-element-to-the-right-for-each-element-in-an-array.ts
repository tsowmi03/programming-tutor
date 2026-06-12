import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "next-greater-element-to-the-right-for-each-element-in-an-array",
  title: "Next Greater Element to the Right",
  difficulty: "easy",
  category: "stack",
  order: 1075,
  description: `Given an array of integers \`nums\`, return an array \`result\` of the same length where \`result[i]\` is the **next greater element** to the right of \`nums[i]\`. The next greater element for \`nums[i]\` is the **first** element to the right (at index \`j > i\`) that is **strictly greater** than \`nums[i]\`. If no such element exists, set \`result[i] = -1\`.

**Example 1:**
\`\`\`text
Input:  nums = [4, 5, 2, 10, 8]
Output: [5, 10, 10, -1, -1]

Explanation:
  4  → next greater to the right is 5
  5  → next greater to the right is 10
  2  → next greater to the right is 10
  10 → no greater element to the right → -1
  8  → no greater element to the right → -1
\`\`\`

**Example 2:**
\`\`\`text
Input:  nums = [2, 1, 2, 4, 3]
Output: [4, 2, 4, -1, -1]

Explanation:
  2 → first strictly greater to the right is 4
  1 → first strictly greater to the right is 2
  2 → first strictly greater to the right is 4
  4 → no strictly greater element to the right → -1
  3 → no strictly greater element to the right → -1
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^4\`
- \`-10^5 <= nums[i] <= 10^5\``,
  hints: [
    `A brute-force O(n²) solution works: for each element, scan rightward until you find a strictly larger value.`,
    `Can you avoid rescanning elements? Think about which elements are still 'waiting' to find their next greater — can a data structure track them?`,
    `Use a stack of indices for elements that haven't found their next greater element yet. When you encounter a value larger than the value at the top-of-stack index, you've found the answer for that index.`,
  ],
  signature: {
    "name": "nextGreaterElement",
    "params": [
      {
        "name": "nums",
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
          4,
          5,
          2,
          10,
          8
        ]
      ],
      "expected": [
        5,
        10,
        10,
        -1,
        -1
      ],
      "hidden": false
    },
    {
      "input": [
        [
          2,
          1,
          2,
          4,
          3
        ]
      ],
      "expected": [
        4,
        2,
        4,
        -1,
        -1
      ],
      "hidden": false
    },
    {
      "input": [
        [
          1,
          3,
          2,
          4
        ]
      ],
      "expected": [
        3,
        4,
        4,
        -1
      ],
      "hidden": false
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
        -1,
        -1,
        -1,
        -1,
        -1
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
        ]
      ],
      "expected": [
        2,
        3,
        4,
        5,
        -1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          3,
          3,
          3
        ]
      ],
      "expected": [
        -1,
        -1,
        -1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1
        ]
      ],
      "expected": [
        -1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          2,
          7,
          3,
          5,
          1,
          4,
          6
        ]
      ],
      "expected": [
        7,
        -1,
        5,
        6,
        4,
        6,
        -1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -3,
          -1,
          -2,
          0
        ]
      ],
      "expected": [
        -1,
        0,
        0,
        -1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          5,
          5,
          5,
          5,
          6
        ]
      ],
      "expected": [
        6,
        6,
        6,
        6,
        -1
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def next_greater_element(nums):
    # TODO: return an array where result[i] is the next greater element
    # to the right of nums[i], or -1 if none exists
    return []
`,
    javascript: `function nextGreaterElement(nums) {
    // TODO: return an array where result[i] is the next greater element
    // to the right of nums[i], or -1 if none exists
    return [];
}
`,
    java: `class Solution {
    public int[] nextGreaterElement(int[] nums) {
        // TODO: return an array where result[i] is the next greater element
        // to the right of nums[i], or -1 if none exists
        return new int[0];
    }
}
`,
    c: `int* nextGreaterElement(int* nums, int numsSize, int* returnSize) {
    // TODO: return an array where result[i] is the next greater element
    // to the right of nums[i], or -1 if none exists
    *returnSize = numsSize;
    int* result = (int*)malloc(numsSize * sizeof(int));
    return result;
}
`,
  },
  solutions: {
    python: `def next_greater_element(nums):
    n = len(nums)
    result = [-1] * n
    stack = []  # stores indices
    for i in range(n):
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = nums[i]
        stack.append(i)
    return result
`,
    javascript: `function nextGreaterElement(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
            const idx = stack.pop();
            result[idx] = nums[i];
        }
        stack.push(i);
    }
    return result;
}
`,
    java: `class Solution {
    public int[] nextGreaterElement(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        java.util.Arrays.fill(result, -1);
        int[] stack = new int[n + 1];
        int top = -1;
        for (int i = 0; i < n; i++) {
            while (top >= 0 && nums[i] > nums[stack[top]]) {
                result[stack[top--]] = nums[i];
            }
            stack[++top] = i;
        }
        return result;
    }
}
`,
    c: `#include <stdlib.h>
int* nextGreaterElement(int* nums, int numsSize, int* returnSize) {
    *returnSize = numsSize;
    int* result = (int*)malloc(numsSize * sizeof(int));
    for (int i = 0; i < numsSize; i++) result[i] = -1;
    int* stack = (int*)malloc(numsSize * sizeof(int));
    int top = -1;
    for (int i = 0; i < numsSize; i++) {
        while (top >= 0 && nums[i] > nums[stack[top]]) {
            result[stack[top--]] = nums[i];
        }
        stack[++top] = i;
    }
    free(stack);
    return result;
}
`,
  },
  editorial: `## Approach: Monotonic Stack — O(n)

The brute-force approach scans every element to the right for each position, giving **O(n²)** time. A monotonic stack brings this down to **O(n)**.

### Key Idea

Maintain a **stack of indices** for elements that have not yet found their next greater element. The values at those indices are always in **non-increasing order** from bottom to top of the stack.

### Algorithm

1. Initialize \`result = [-1, -1, …, -1]\` and an empty \`stack\`.
2. For each index \`i\` from left to right:
   - While the stack is non-empty **and** \`nums[i] > nums[stack.top()]\`:
     - Pop index \`idx\`; set \`result[idx] = nums[i]\` (first greater element found).
   - Push \`i\` onto the stack.
3. Any index remaining in the stack has no next greater element; its result stays \`-1\`.

### Example Walkthrough

\`\`\`text
nums = [4, 5, 2, 10, 8]

i=0 (4):  push 0.                    stack=[0]
i=1 (5):  5>4 → pop 0 → res[0]=5; push 1.  stack=[1]
i=2 (2):  2<5 → push 2.              stack=[1,2]
i=3 (10): 10>2 → pop 2 → res[2]=10;
          10>5 → pop 1 → res[1]=10; push 3. stack=[3]
i=4 (8):  8<10 → push 4.             stack=[3,4]

Indices 3,4 remain → result stays -1.
Final: [5, 10, 10, -1, -1]
\`\`\`

### Complexity

| | |
|---|---|
| **Time** | O(n) — each index is pushed and popped at most once |
| **Space** | O(n) — stack and result array |`,
};

export default problem;
