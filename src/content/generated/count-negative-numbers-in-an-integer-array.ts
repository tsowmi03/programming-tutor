import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-negative-numbers-in-an-integer-array",
  title: "Count Negative Numbers",
  difficulty: "easy",
  category: "foundations",
  order: 1001,
  description: `Given an integer array \`nums\`, return the count of **negative** numbers in the array.

A number is considered negative if it is **strictly less than zero**.

\`\`\`text
Example 1:
Input:  nums = [3, -1, 0, -5, 2, -3]
Output: 3
Explanation: -1, -5, and -3 are negative.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 2, 3, 4]
Output: 0
Explanation: No negative numbers.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [-7, -2, -9]
Output: 3
Explanation: All three numbers are negative.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 1000\`
- \`-1000 <= nums[i] <= 1000\``,
  hints: [
    `Iterate through each element and check whether it is less than zero.`,
    `Keep a running counter that you increment whenever you find a negative number.`,
  ],
  guidance: [
    {
      "title": "Identify what you're looking for",
      "body": "You need to count elements that satisfy a simple condition: `nums[i] < 0`. Think about how to check each element one by one.",
      "level": "nudge"
    },
    {
      "title": "Use a counter variable",
      "body": "Initialize a counter to `0` before the loop. For each element in the array, if it is strictly less than `0`, increment the counter by `1`. Return the counter after the loop.",
      "level": "strategy"
    },
    {
      "title": "Watch out for zero",
      "body": "`0` is **not** negative. Make sure your condition is `< 0` (strict), not `<= 0`.",
      "level": "pitfall"
    },
    {
      "title": "Pseudocode shape",
      "body": "```\ncount = 0\nfor each num in nums:\n    if num < 0:\n        count += 1\nreturn count\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "countNegatives",
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
          -1,
          0,
          -5,
          2,
          -3
        ]
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3,
          4
        ]
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [
          -7,
          -2,
          -9
        ]
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          0
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          -1
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          0,
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
          -1000,
          1000,
          -500,
          500,
          0
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -2,
          -3,
          -4,
          -5
        ]
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          3,
          1,
          -1,
          -3,
          -5,
          0,
          2,
          -10
        ]
      ],
      "expected": 4,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_negatives(nums):
    # TODO: count and return the number of negative integers
    pass`,
    javascript: `function countNegatives(nums) {
    // TODO: count and return the number of negative integers
}
`,
    typescript: `function countNegatives(nums: number[]): number {
    // TODO: count and return the number of negative integers
    return 0;
}
`,
    java: `class Solution {
    public int countNegatives(int[] nums) {
        // TODO: count and return the number of negative integers
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int CountNegatives(int[] nums) {
        // TODO: count and return the number of negative integers
        return 0;
    }
}
`,
    c: `#include <stdlib.h>
int countNegatives(int* nums, int numsSize) {
    // TODO: count and return the number of negative integers
    return 0;
}
`,
    cpp: `class Solution {
public:
    int countNegatives(vector<int>& nums) {
        // TODO: count and return the number of negative integers
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def count_negatives(nums):
    count = 0
    for num in nums:
        if num < 0:
            count += 1
    return count
`,
    javascript: `function countNegatives(nums) {
    let count = 0;
    for (const num of nums) {
        if (num < 0) count++;
    }
    return count;
}
`,
    typescript: `function countNegatives(nums: number[]): number {
    let count = 0;
    for (const num of nums) {
        if (num < 0) count++;
    }
    return count;
}
`,
    java: `class Solution {
    public int countNegatives(int[] nums) {
        int count = 0;
        for (int num : nums) {
            if (num < 0) count++;
        }
        return count;
    }
}
`,
    csharp: `public class Solution {
    public int CountNegatives(int[] nums) {
        int count = 0;
        foreach (int num in nums) {
            if (num < 0) count++;
        }
        return count;
    }
}
`,
    c: `#include <stdlib.h>
int countNegatives(int* nums, int numsSize) {
    int count = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] < 0) count++;
    }
    return count;
}
`,
    cpp: `class Solution {
public:
    int countNegatives(vector<int>& nums) {
        int count = 0;
        for (int num : nums) {
            if (num < 0) count++;
        }
        return count;
    }
};
`,
  },
  editorial: `## Approach: Linear Scan

Iterate through every element of the array and check whether it is strictly less than \`0\`. Maintain a counter that is incremented each time the condition is met, then return the counter.

\`\`\`
count = 0
for each num in nums:
    if num < 0:
        count += 1
return count
\`\`\`

**Why it works:** Every element is visited exactly once, and the condition \`num < 0\` correctly excludes \`0\` itself as required.

**Time Complexity:** O(n) — each element is examined once.

**Space Complexity:** O(1) — only a single counter variable is used.`,
};

export default problem;
