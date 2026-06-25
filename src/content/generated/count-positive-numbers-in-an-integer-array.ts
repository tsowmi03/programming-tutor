import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-positive-numbers-in-an-integer-array",
  title: "Count Positive Numbers",
  difficulty: "easy",
  category: "foundations",
  order: 1000,
  description: `Given an integer array \`nums\`, return the count of elements that are **strictly positive** (greater than zero).

\`\`\`text
Example 1:
Input:  nums = [1, -2, 3, 0, 5]
Output: 3
Explanation: 1, 3, and 5 are strictly positive.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [-1, -4, 0, -7]
Output: 0
Explanation: No element is greater than zero.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [2, 4, 6, 8]
Output: 4
Explanation: All four elements are strictly positive.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\``,
  hints: [
    `Loop through each element and check if it is greater than zero.`,
    `Keep a running counter that you increment each time you find a positive number.`,
  ],
  guidance: [
    {
      "title": "Start simple",
      "body": "A single pass through the array is all you need. Think about what condition separates a positive number from zero or a negative number.",
      "level": "nudge"
    },
    {
      "title": "Counter pattern",
      "body": "Initialize a counter to 0 before the loop. Inside the loop, increment the counter whenever `nums[i] > 0`. Return the counter after the loop ends.",
      "level": "strategy"
    },
    {
      "title": "Watch out for zero",
      "body": "Zero is **not** a positive number. Make sure your condition is strictly `> 0`, not `>= 0`.",
      "level": "pitfall"
    }
  ],

  signature: {
    "name": "countPositives",
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
          1,
          -2,
          3,
          0,
          5
        ]
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          -1,
          -4,
          0,
          -7
        ]
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [
          2,
          4,
          6,
          8
        ]
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        []
      ],
      "expected": 0,
      "hidden": true
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
          -1000000000,
          1000000000
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          1
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          -5,
          -3,
          -1,
          0,
          1,
          3,
          5
        ]
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_positives(nums: list[int]) -> int:
    # TODO: return the count of strictly positive numbers
    return 0`,
    javascript: `function countPositives(nums) {
    // TODO: return the count of strictly positive numbers
    return 0;
}`,
    typescript: `function countPositives(nums: number[]): number {
    // TODO: return the count of strictly positive numbers
    return 0;
}`,
    java: `class Solution {
    public int countPositives(int[] nums) {
        // TODO: return the count of strictly positive numbers
        return 0;
    }
}`,
    csharp: `public class Solution {
    public int CountPositives(int[] nums) {
        // TODO: return the count of strictly positive numbers
        return 0;
    }
}`,
    c: `int countPositives(int* nums, int numsSize) {
    // TODO: return the count of strictly positive numbers
    return 0;
}`,
    cpp: `class Solution {
public:
    int countPositives(vector<int>& nums) {
        // TODO: return the count of strictly positive numbers
        return 0;
    }
};`,
  },
  solutions: {
    python: `def count_positives(nums: list[int]) -> int:
    count = 0
    for n in nums:
        if n > 0:
            count += 1
    return count`,
    javascript: `function countPositives(nums) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) count++;
    }
    return count;
}`,
    typescript: `function countPositives(nums: number[]): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) count++;
    }
    return count;
}`,
    java: `class Solution {
    public int countPositives(int[] nums) {
        int count = 0;
        for (int n : nums) {
            if (n > 0) count++;
        }
        return count;
    }
}`,
    csharp: `public class Solution {
    public int CountPositives(int[] nums) {
        int count = 0;
        foreach (int n in nums) {
            if (n > 0) count++;
        }
        return count;
    }
}`,
    c: `int countPositives(int* nums, int numsSize) {
    int count = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] > 0) count++;
    }
    return count;
}`,
    cpp: `class Solution {
public:
    int countPositives(vector<int>& nums) {
        int count = 0;
        for (int n : nums) {
            if (n > 0) count++;
        }
        return count;
    }
};`,
  },
  editorial: `## Approach: Single Pass Counter

Iterate through every element of the array once. Maintain an integer counter initialized to \`0\`. For each element, check if it is strictly greater than \`0\`; if so, increment the counter. Return the counter after the loop.

### Why it works
Every element is visited exactly once, and the condition \`> 0\` correctly excludes both zero and negative numbers.

### Complexity
- **Time:** O(n) — one pass over the array.
- **Space:** O(1) — only a single counter variable is used.`,
};

export default problem;
