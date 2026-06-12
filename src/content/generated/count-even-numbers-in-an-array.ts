import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-even-numbers-in-an-array",
  title: "Count Even Numbers in Array",
  difficulty: "easy",
  category: "foundations",
  order: 1003,
  description: `Given an integer array \`nums\`, return the **count** of even numbers in the array.

An integer is **even** if it is divisible by 2 (i.e., \`n % 2 == 0\`). Note that \`0\` is considered even, and negative even numbers (like \`-4\`) count as well.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 4, 5]
Output: 2
Explanation: 2 and 4 are the only even numbers.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [-2, -1, 0, 1, 2]
Output: 3
Explanation: -2, 0, and 2 are all even.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1, 3, 5, 7]
Output: 0
Explanation: No even numbers present.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 10^4\`
- \`-10^5 <= nums[i] <= 10^5\``,
  hints: [
    `Iterate through every element of the array one by one.`,
    `Use the modulo operator \`%\` to check whether a number is divisible by 2.`,
    `Keep a running counter and increment it each time you find an even number.`,
  ],
  signature: {
    "name": "countEven",
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
          2,
          3,
          4,
          5
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          -2,
          -1,
          0,
          1,
          2
        ]
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          3,
          5,
          7
        ]
      ],
      "expected": 0,
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
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          7
        ]
      ],
      "expected": 0,
      "hidden": true
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
      "hidden": true
    },
    {
      "input": [
        [
          100,
          200,
          300
        ]
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          -4,
          -3,
          -2,
          -1
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0
        ]
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_even(nums: list[int]) -> int:
    # TODO: count and return the number of even integers in nums
    return 0
`,
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function countEven(nums) {
    // TODO: count and return the number of even integers in nums
    return 0;
}
`,
    java: `class Solution {
    public int countEven(int[] nums) {
        // TODO: count and return the number of even integers in nums
        return 0;
    }
}
`,
    c: `int countEven(int* nums, int numsSize) {
    /* TODO: count and return the number of even integers in nums */
    return 0;
}
`,
  },
  solutions: {
    python: `def count_even(nums: list[int]) -> int:
    count = 0
    for n in nums:
        if n % 2 == 0:
            count += 1
    return count
`,
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function countEven(nums) {
    let count = 0;
    for (const n of nums) {
        if (n % 2 === 0) count++;
    }
    return count;
}
`,
    java: `class Solution {
    public int countEven(int[] nums) {
        int count = 0;
        for (int n : nums) {
            if (n % 2 == 0) count++;
        }
        return count;
    }
}
`,
    c: `int countEven(int* nums, int numsSize) {
    int count = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] % 2 == 0) count++;
    }
    return count;
}
`,
  },
  editorial: `## Approach: Single Linear Scan

### Intuition
We only need to look at each number once and ask: is it divisible by 2? Maintain a counter that we increment whenever the answer is yes.

### Algorithm
1. Initialize \`count = 0\`.
2. For each integer \`n\` in \`nums\`:
   - If \`n % 2 == 0\`, increment \`count\`.
3. Return \`count\`.

### Why negatives work
In all four languages, the \`%\` operator for even-number checking still works on negative integers: \`-4 % 2 == 0\`, \`-3 % 2 != 0\`, etc., so no special handling is needed.

### Complexity
- **Time:** O(n) — we visit every element exactly once.
- **Space:** O(1) — only a single integer counter is used regardless of input size.`,
};

export default problem;
