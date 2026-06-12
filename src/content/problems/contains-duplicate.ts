import type { CodeProblemDef } from "../types";

export const containsDuplicate: CodeProblemDef = {
  type: "code",
  slug: "contains-duplicate",
  title: "Contains Duplicate",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 2,
  description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice**, and \`false\` if every element is distinct.

**Example 1**

\`\`\`text
Input: nums = [1,2,3,1]
Output: true
\`\`\`

**Example 2**

\`\`\`text
Input: nums = [1,2,3,4]
Output: false
\`\`\`

**Constraints**

- \`1 <= nums.length <= 100000\`
- \`-1000000000 <= nums[i] <= 1000000000\`
`,
  hints: [
    `Comparing every pair works but costs O(n²). What data structure answers “have I seen this before?” quickly?`,
    `A hash set stores seen values with O(1) average insert and lookup.`,
    `Alternative: sort the array first — duplicates become neighbours. That's O(n log n) time but O(1) extra space.`,
  ],
  signature: {
    "name": "containsDuplicate",
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
          1
        ]
      ],
      "expected": true
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
      "expected": false
    },
    {
      "input": [
        [
          1,
          1,
          1,
          3,
          3,
          4,
          3,
          2,
          4,
          2
        ]
      ],
      "expected": true
    },
    {
      "input": [
        [
          7
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -1
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          1000000000,
          -1000000000,
          0
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          14,
          18,
          22,
          22
        ]
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def contains_duplicate(nums):
    """Return True if any value appears at least twice."""
    # Your code here
    pass
`,
    javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
  // Your code here
}
`,
    typescript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums: number[]): boolean {
  // Your code here
  return false;
}`,
    java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        // Your code here
        return false;
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public bool ContainsDuplicate(int[] nums) {
        // Your code here
        return false;
    }
}`,
    c: `bool containsDuplicate(int* nums, int numsSize) {
    // Your code here
    return false;
}
`,
    cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        // Your code here
        return false;
    }
};`,
  },
  solutions: {
    python: `def contains_duplicate(nums):
    seen = set()
    for n in nums:
        if n in seen:
            return True
        seen.add(n)
    return False
`,
    javascript: `function containsDuplicate(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}
`,
    typescript: `function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}`,
    java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int n : nums) {
            if (!seen.add(n)) return true;
        }
        return false;
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public bool ContainsDuplicate(int[] nums) {
        HashSet<int> seen = new HashSet<int>();
        foreach (int n in nums) {
            if (!seen.Add(n)) return true;
        }
        return false;
    }
}`,
    c: `static int cmpInt(const void* a, const void* b) {
    int x = *(const int*)a, y = *(const int*)b;
    return (x > y) - (x < y);
}

bool containsDuplicate(int* nums, int numsSize) {
    qsort(nums, numsSize, sizeof(int), cmpInt);
    for (int i = 1; i < numsSize; i++) {
        if (nums[i] == nums[i - 1]) return true;
    }
    return false;
}
`,
    cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int n : nums) {
            if (seen.count(n)) return true;
            seen.insert(n);
        }
        return false;
    }
};`,
  },
  editorial: `## Approach: hash set of seen values

Walk the array once, keeping a set of values seen so far. If the current
value is already in the set, there's a duplicate. The set's O(1) average
membership test is what makes this linear overall.

**Complexity:** O(n) time, O(n) space.

## Alternative: sort first

After sorting, any duplicates sit next to each other, so a single scan
comparing neighbours finds them. This trades time — O(n log n) — for O(1)
extra space (the C reference solution does this, since C has no built-in
set). The "sort to make structure visible" trick is worth remembering; it
shows up in many problems.
`,
};
