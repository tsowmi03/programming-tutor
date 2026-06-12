import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-index-of-the-first-occurrence-of-a-target-in-an-array",
  title: "Find First Occurrence in Array",
  difficulty: "easy",
  category: "foundations",
  order: 1018,
  description: `Given an integer array \`nums\` and an integer \`target\`, return the **index** of the first occurrence of \`target\` in \`nums\`. If \`target\` does not exist in \`nums\`, return \`-1\`.

\`\`\`text
Example 1:
Input:  nums = [5, 3, 7, 3, 1], target = 3
Output: 1
Explanation: 3 first appears at index 1.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 2, 4, 6], target = 5
Output: -1
Explanation: 5 is not in the array.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [7], target = 7
Output: 0
Explanation: 7 is at index 0.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 10^4\`
- \`-10^5 <= nums[i], target <= 10^5\``,
  hints: [
    `Walk through the array from left to right and compare each element with the target.`,
    `The moment you find a match, return its index — there is no need to keep scanning.`,
    `What should you return if you finish the loop without ever finding the target?`,
  ],
  signature: {
    "name": "findFirstOccurrence",
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
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          5,
          3,
          7,
          3,
          1
        ],
        3
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          4,
          6
        ],
        5
      ],
      "expected": -1,
      "hidden": false
    },
    {
      "input": [
        [
          7
        ],
        7
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [],
        3
      ],
      "expected": -1,
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
        1
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          10,
          20,
          30,
          40,
          50
        ],
        50
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          -3,
          -1,
          0,
          2,
          5
        ],
        -1
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        1
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          4,
          4,
          4,
          9
        ],
        9
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def find_first_occurrence(nums, target):
    # TODO: return the index of the first occurrence of target, or -1
    return -1
`,
    javascript: `function findFirstOccurrence(nums, target) {
    // TODO: return the index of the first occurrence of target, or -1
    return -1;
}
`,
    typescript: `function findFirstOccurrence(nums: number[], target: number): number {
    // TODO: return the index of the first occurrence of target, or -1
    return -1;
}`,
    java: `class Solution {
    public int findFirstOccurrence(int[] nums, int target) {
        // TODO: return the index of the first occurrence of target, or -1
        return -1;
    }
}
`,
    csharp: `public class Solution {
    public int FindFirstOccurrence(int[] nums, int target) {
        // TODO: return the index of the first occurrence of target, or -1
        return -1;
    }
}`,
    c: `int findFirstOccurrence(int* nums, int numsSize, int target) {
    /* TODO: return the index of the first occurrence of target, or -1 */
    return -1;
}
`,
    cpp: `class Solution {
public:
    int findFirstOccurrence(vector<int>& nums, int target) {
        // TODO: return the index of the first occurrence of target, or -1
        return -1;
    }
};`,
  },
  solutions: {
    python: `def find_first_occurrence(nums, target):
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1
`,
    javascript: `function findFirstOccurrence(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) return i;
    }
    return -1;
}
`,
    typescript: `function findFirstOccurrence(nums: number[], target: number): number {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) return i;
    }
    return -1;
}`,
    java: `class Solution {
    public int findFirstOccurrence(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
}
`,
    csharp: `public class Solution {
    public int FindFirstOccurrence(int[] nums, int target) {
        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
}`,
    c: `int findFirstOccurrence(int* nums, int numsSize, int target) {
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] == target) return i;
    }
    return -1;
}
`,
    cpp: `class Solution {
public:
    int findFirstOccurrence(vector<int>& nums, int target) {
        for (int i = 0; i < (int)nums.size(); i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
};`,
  },
  editorial: `## Approach: Linear Scan

Iterate through the array from index \`0\` to \`n-1\`. At each position, check whether the current element equals \`target\`. If it does, immediately return that index — this is guaranteed to be the **first** occurrence because we scan left-to-right and stop at the first match.

If the loop completes without finding the target, return \`-1\`.

\`\`\`python
for i in range(len(nums)):
    if nums[i] == target:
        return i
return -1
\`\`\`

### Complexity
- **Time:** O(n) — in the worst case (target absent or at the last position) we inspect every element once.
- **Space:** O(1) — only a single loop counter variable is used; no extra data structures are needed.`,
};

export default problem;
