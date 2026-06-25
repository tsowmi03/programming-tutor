import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-first-repeated-value-in-an-integer-array",
  title: "First Repeated Value",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 1006,
  description: `Given an integer array \`nums\`, return the **first value that appears more than once** when scanning from left to right.

More precisely, find the smallest index \`i\` such that \`nums[i]\` has already appeared somewhere in \`nums[0..i-1]\`. Return \`nums[i]\`.

If no value repeats, return \`-1\`.

\`\`\`text
Example 1:
Input:  nums = [4, 3, 2, 7, 3, 1, 2]
Output: 3
Explanation: 3 appears at index 1 and again at index 4.
             2 also repeats, but 3 is seen repeated first.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 2, 3, 4]
Output: -1
Explanation: No value repeats.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [5, 5]
Output: 5
Explanation: 5 repeats immediately at index 1.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\``,
  hints: [
    `As you scan left to right, you need to know which values you have already seen. What data structure lets you check membership in O(1)?`,
    `Keep a set of visited values. The moment you encounter a value already in the set, that is your answer.`,
  ],
  guidance: [
    {
      "title": "What information do you need to track?",
      "body": "You only need to know *whether* a value has been seen before — not how many times or where. A set (hash set) is perfect for this.",
      "level": "nudge"
    },
    {
      "title": "Single-pass strategy",
      "body": "Iterate through the array once. Before recording each element, check if it is already in the seen-set. If yes, return it immediately. If you finish the loop without returning, return -1.",
      "level": "strategy"
    },
    {
      "title": "Watch out for the order requirement",
      "body": "The problem asks for the first *repeated* value encountered during a left-to-right scan — not the value with the smallest magnitude or the value that occurs most often. Stop as soon as you find the first repeat.",
      "level": "pitfall"
    },
    {
      "title": "Implementation shape",
      "body": "```\nseen = empty set\nfor each value in nums:\n    if value in seen:\n        return value\n    add value to seen\nreturn -1\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "firstRepeatedValue",
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
          4,
          3,
          2,
          7,
          3,
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
          2,
          3,
          4
        ]
      ],
      "expected": -1,
      "hidden": false
    },
    {
      "input": [
        [
          5,
          5
        ]
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ]
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          1,
          2,
          1
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          -3,
          -1,
          -3,
          2
        ]
      ],
      "expected": -3,
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
          1
        ]
      ],
      "expected": 1,
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
        ]
      ],
      "expected": -1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def first_repeated_value(nums: list[int]) -> int:
    # TODO: implement
    return -1
`,
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function firstRepeatedValue(nums) {
    // TODO: implement
    return -1;
}
`,
    typescript: `function firstRepeatedValue(nums: number[]): number {
    // TODO: implement
    return -1;
}
`,
    java: `class Solution {
    public int firstRepeatedValue(int[] nums) {
        // TODO: implement
        return -1;
    }
}
`,
    csharp: `public class Solution {
    public int FirstRepeatedValue(int[] nums) {
        // TODO: implement
        return -1;
    }
}
`,
    c: `#include <stdlib.h>
int firstRepeatedValue(int* nums, int numsSize) {
    // TODO: implement
    return -1;
}
`,
    cpp: `class Solution {
public:
    int firstRepeatedValue(vector<int>& nums) {
        // TODO: implement
        return -1;
    }
};
`,
  },
  solutions: {
    python: `def first_repeated_value(nums: list[int]) -> int:
    seen = set()
    for v in nums:
        if v in seen:
            return v
        seen.add(v)
    return -1
`,
    javascript: `function firstRepeatedValue(nums) {
    const seen = new Set();
    for (const v of nums) {
        if (seen.has(v)) return v;
        seen.add(v);
    }
    return -1;
}
`,
    typescript: `function firstRepeatedValue(nums: number[]): number {
    const seen = new Set<number>();
    for (const v of nums) {
        if (seen.has(v)) return v;
        seen.add(v);
    }
    return -1;
}
`,
    java: `class Solution {
    public int firstRepeatedValue(int[] nums) {
        java.util.HashSet<Integer> seen = new java.util.HashSet<>();
        for (int v : nums) {
            if (seen.contains(v)) return v;
            seen.add(v);
        }
        return -1;
    }
}
`,
    csharp: `public class Solution {
    public int FirstRepeatedValue(int[] nums) {
        var seen = new System.Collections.Generic.HashSet<int>();
        foreach (int v in nums) {
            if (seen.Contains(v)) return v;
            seen.Add(v);
        }
        return -1;
    }
}
`,
    c: `#include <stdlib.h>
int firstRepeatedValue(int* nums, int numsSize) {
    for (int i = 1; i < numsSize; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] == nums[i]) return nums[i];
        }
    }
    return -1;
}
`,
    cpp: `class Solution {
public:
    int firstRepeatedValue(vector<int>& nums) {
        unordered_set<int> seen;
        for (int v : nums) {
            if (seen.count(v)) return v;
            seen.insert(v);
        }
        return -1;
    }
};
`,
  },
  editorial: `## Approach: Hash Set (Single Pass)

### Intuition
We scan the array from left to right. At each position we need to know whether the current value has appeared before. A **hash set** answers membership queries in O(1) average time, so we can do the whole check in a single pass.

### Algorithm
1. Create an empty set \`seen\`.
2. For each value \`v\` in \`nums\` (left to right):
   - If \`v\` is already in \`seen\`, return \`v\` — it is the first repeated value.
   - Otherwise add \`v\` to \`seen\`.
3. If the loop ends with no match, return \`-1\`.

### Complexity
- **Time:** O(n) — each element is inserted and looked up at most once.
- **Space:** O(n) — the set stores at most all distinct values.

### Note on the C solution
Portable C has no standard hash map, so the reference solution uses a nested-loop O(n²) brute-force scan. For the given constraints (n ≤ 10⁵) this is correct and straightforward to verify.`,
};

export default problem;
