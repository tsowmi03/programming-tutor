import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-if-an-array-contains-a-target-value",
  title: "Contains Target",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 1043,
  description: `Given an integer array \`nums\` and an integer \`target\`, return \`true\` if \`target\` exists anywhere in \`nums\`, or \`false\` otherwise.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 4, 5], target = 3
Output: true
Explanation: 3 is present at index 2.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 2, 3, 4, 5], target = 6
Output: false
Explanation: 6 does not appear in the array.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [], target = 1
Output: false
Explanation: The array is empty, so target cannot be found.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i], target <= 10^9\``,
  hints: [
    `Try iterating through each element and comparing it with the target.`,
    `What should you return as soon as you find a match? What should you return if you finish the loop without finding one?`,
    `Many languages have a built-in method to check membership in an array (e.g., \`in\` for Python, \`includes\` for JavaScript).`,
  ],
  signature: {
    "name": "containsTarget",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      },
      {
        "name": "target",
        "type": "int"
      }
    ],
    "returns": "bool",
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
        3
      ],
      "expected": true,
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
        6
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        [
          7
        ],
        7
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        [],
        1
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          -1,
          -2,
          5
        ],
        -1
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          10,
          20,
          30
        ],
        10
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          10,
          20,
          30
        ],
        30
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          5,
          5
        ],
        5
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          -100,
          0,
          100
        ],
        0
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        -5
      ],
      "expected": false,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def contains_target(nums: list, target: int) -> bool:
    # TODO: implement
    return False
`,
    javascript: `function containsTarget(nums, target) {
    // TODO: implement
    return false;
}
`,
    java: `class Solution {
    public boolean containsTarget(int[] nums, int target) {
        // TODO: implement
        return false;
    }
}
`,
    c: `#include <stdbool.h>

bool containsTarget(int* nums, int numsSize, int target) {
    // TODO: implement
    return false;
}
`,
  },
  solutions: {
    python: `def contains_target(nums: list, target: int) -> bool:
    return target in nums
`,
    javascript: `function containsTarget(nums, target) {
    return nums.includes(target);
}
`,
    java: `class Solution {
    public boolean containsTarget(int[] nums, int target) {
        for (int num : nums) {
            if (num == target) return true;
        }
        return false;
    }
}
`,
    c: `#include <stdbool.h>

bool containsTarget(int* nums, int numsSize, int target) {
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] == target) return true;
    }
    return false;
}
`,
  },
  editorial: `## Approach: Linear Scan

Iterate over every element of \`nums\`. As soon as an element equals \`target\`, return \`true\`. If the loop completes without a match, return \`false\`.

\`\`\`python
def contains_target(nums, target):
    for num in nums:
        if num == target:
            return True
    return False
\`\`\`

**Why it works:** We inspect every possible position at most once, so we cannot miss a match.

**Complexity:**
- **Time:** O(n) — in the worst case we examine all n elements.
- **Space:** O(1) — no extra storage beyond a loop variable.

**Built-in shortcuts:** Python's \`in\` operator, JavaScript's \`Array.prototype.includes\`, and Java's enhanced for-loop with an early return all perform the same linear scan under the hood for plain arrays.

**Extension — repeated queries:** If you needed to answer many \`containsTarget\` queries on the same array, you could build a hash set once in O(n) time and then answer each query in O(1) average time.`,
};

export default problem;
