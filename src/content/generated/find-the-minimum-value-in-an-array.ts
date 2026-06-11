import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-minimum-value-in-an-array",
  title: "Find Minimum in Array",
  difficulty: "easy",
  category: "foundations",
  order: 1002,
  description: `Given a non-empty array of integers \`nums\`, return the **minimum** value in the array.

\`\`\`text
Example 1:
Input:  nums = [3, 1, 4, 1, 5, 9, 2, 6]
Output: 1
Explanation: The smallest element is 1.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [-5, -1, -3, -2]
Output: -5
Explanation: All values are negative; -5 is the smallest.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [42]
Output: 42
Explanation: A single-element array; that element is both min and max.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^4\`
- \`-10^6 <= nums[i] <= 10^6\``,
  hints: [
    `Start by assuming the first element is the minimum, then compare it with every other element.`,
    `If you find an element smaller than your current minimum, update the minimum.`,
    `After scanning the entire array once, you will have the true minimum.`,
  ],
  signature: {
    "name": "findMin",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      }
    ],
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          3,
          1,
          4,
          1,
          5,
          9,
          2,
          6
        ]
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        [
          -5,
          -1,
          -3,
          -2
        ]
      ],
      "expected": -5,
      "hidden": false
    },
    {
      "input": [
        [
          42
        ]
      ],
      "expected": 42,
      "hidden": false
    },
    {
      "input": [
        [
          0,
          0,
          0
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          100,
          200,
          50,
          75
        ]
      ],
      "expected": 50,
      "hidden": true
    },
    {
      "input": [
        [
          -1000,
          1000
        ]
      ],
      "expected": -1000,
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
      "expected": 1,
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
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          -100,
          0,
          100
        ]
      ],
      "expected": -100,
      "hidden": true
    },
    {
      "input": [
        [
          7,
          7,
          7,
          7
        ]
      ],
      "expected": 7,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def find_min(nums):
    # TODO: return the minimum value in nums
    pass
`,
    javascript: `function findMin(nums) {
    // TODO: return the minimum value in nums
}
`,
    java: `class Solution {
    public int findMin(int[] nums) {
        // TODO: return the minimum value in nums
        return 0;
    }
}
`,
    c: `int findMin(int* nums, int numsSize) {
    /* TODO: return the minimum value in nums */
    return 0;
}
`,
  },
  solutions: {
    python: `def find_min(nums):
    minimum = nums[0]
    for n in nums:
        if n < minimum:
            minimum = n
    return minimum
`,
    javascript: `function findMin(nums) {
    let minimum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < minimum) {
            minimum = nums[i];
        }
    }
    return minimum;
}
`,
    java: `class Solution {
    public int findMin(int[] nums) {
        int minimum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < minimum) {
                minimum = nums[i];
            }
        }
        return minimum;
    }
}
`,
    c: `int findMin(int* nums, int numsSize) {
    int minimum = nums[0];
    for (int i = 1; i < numsSize; i++) {
        if (nums[i] < minimum) {
            minimum = nums[i];
        }
    }
    return minimum;
}
`,
  },
  editorial: `## Approach: Single Linear Scan

### Intuition
To find the minimum value we only need to look at each element once. We keep track of the smallest value seen so far and update it whenever we encounter a smaller element.

### Algorithm
1. Initialize \`minimum\` to \`nums[0]\`.
2. Iterate over every element in \`nums\`.
3. If the current element is less than \`minimum\`, update \`minimum\`.
4. Return \`minimum\`.

### Complexity
- **Time:** O(n) — each element is visited exactly once.
- **Space:** O(1) — only one extra variable is used regardless of input size.

### Why this works
After visiting every element, \`minimum\` holds the global minimum because we never skip an element and always replace our candidate when a strictly smaller value is found.`,
};

export default problem;
