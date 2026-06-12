import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-if-an-integer-array-has-no-duplicates",
  title: "Array Has No Duplicates",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 1048,
  description: `Given an integer array \`nums\`, return \`true\` if **all elements are distinct** (i.e., no value appears more than once), or \`false\` otherwise.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 4, 5]
Output: true
Explanation: Every element is unique.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 2, 3, 1]
Output: false
Explanation: The value 1 appears at indices 0 and 3.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = []
Output: true
Explanation: An empty array has no duplicates.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 10^4\`
- \`-10^6 <= nums[i] <= 10^6\``,
  hints: [
    `Think about a data structure that automatically rejects duplicate values when you insert an element.`,
    `If you insert every element into a set and the set ends up smaller than the original array, what does that tell you?`,
    `Alternatively, you can sort the array and compare adjacent elements — duplicates would end up next to each other.`,
    `For a brute-force approach, try comparing every pair of elements. What is the time complexity?`,
  ],
  signature: {
    "name": "isUnique",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      }
    ],
    "returns": "bool"
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
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3,
          1
        ]
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ]
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        []
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          5
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -2,
          -3
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          0,
          1,
          -1
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10
        ]
      ],
      "expected": true,
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
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          100,
          -100,
          50,
          -50,
          0
        ]
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def is_unique(nums: list[int]) -> bool:
    # TODO: return True if no duplicates exist, False otherwise
    return True
`,
    javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function isUnique(nums) {
    // TODO: return true if no duplicates exist, false otherwise
    return true;
}
`,
    typescript: `function isUnique(nums: number[]): boolean {
    // TODO: return true if no duplicates exist, false otherwise
    return true;
}`,
    java: `class Solution {
    public boolean isUnique(int[] nums) {
        // TODO: return true if no duplicates exist, false otherwise
        return true;
    }
}
`,
    csharp: `public class Solution {
    public bool IsUnique(int[] nums) {
        // TODO: return true if no duplicates exist, false otherwise
        return true;
    }
}`,
    c: `#include <stdbool.h>

bool isUnique(int* nums, int numsSize) {
    /* TODO: return true if no duplicates exist, false otherwise */
    return true;
}
`,
    cpp: `class Solution {
public:
    bool isUnique(vector<int>& nums) {
        // TODO: return true if no duplicates exist, false otherwise
        return true;
    }
};`,
  },
  solutions: {
    python: `def is_unique(nums: list[int]) -> bool:
    return len(nums) == len(set(nums))
`,
    javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function isUnique(nums) {
    return nums.length === new Set(nums).size;
}
`,
    typescript: `function isUnique(nums: number[]): boolean {
    return nums.length === new Set(nums).size;
}`,
    java: `class Solution {
    public boolean isUnique(int[] nums) {
        java.util.HashSet<Integer> seen = new java.util.HashSet<>();
        for (int n : nums) {
            if (!seen.add(n)) {
                return false;
            }
        }
        return true;
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public bool IsUnique(int[] nums) {
        HashSet<int> seen = new HashSet<int>();
        foreach (int n in nums) {
            if (!seen.Add(n)) {
                return false;
            }
        }
        return true;
    }
}`,
    c: `#include <stdbool.h>

bool isUnique(int* nums, int numsSize) {
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] == nums[j]) {
                return false;
            }
        }
    }
    return true;
}
`,
    cpp: `class Solution {
public:
    bool isUnique(vector<int>& nums) {
        unordered_set<int> seen;
        for (int n : nums) {
            if (!seen.insert(n).second) {
                return false;
            }
        }
        return true;
    }
};`,
  },
  editorial: `## Approach: Hash Set Membership

### Intuition
A **hash set** stores only unique values. If we insert every element of \`nums\` into a set, any duplicate will simply not increase the set's size. Therefore, after processing all elements, the set is smaller than the array if and only if a duplicate existed.

### Algorithm
1. Insert all elements of \`nums\` into a hash set.
2. Compare the size of the set to the length of the array.
3. If they are equal, all elements were distinct → return \`true\`.
4. Otherwise, return \`false\`.

\`\`\`python
def is_unique(nums):
    return len(nums) == len(set(nums))
\`\`\`

### Complexity
- **Time:** O(n) — each insertion into a hash set is O(1) amortised.
- **Space:** O(n) — the set may store up to n elements.

### Alternative: Sorting
Sort the array in O(n log n) and scan adjacent pairs. If \`nums[i] == nums[i+1]\` for any \`i\`, return \`false\`.

### C Note
Because C lacks a built-in hash map, the reference solution uses a nested loop (O(n²) time, O(1) space) that compares every pair \`(i, j)\` with \`i < j\`. This is perfectly acceptable given the constraint \`n ≤ 10⁴\`.`,
};

export default problem;
