import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-whether-any-pair-has-absolute-difference-k",
  title: "Pair With Absolute Difference K",
  difficulty: "medium",
  category: "arrays-hashing",
  order: 1010,
  description: `Given an integer array \`nums\` and an integer \`k\`, return \`true\` if there exist **two distinct indices** \`i\` and \`j\` such that \`|nums[i] - nums[j]| == k\`, or \`false\` otherwise.

Note: The two elements must be at different indices, but they can have the same value (if \`k == 0\`).

\`\`\`text
Example 1:
Input: nums = [1, 5, 3, 4, 2], k = 3
Output: true
Explanation: |5 - 2| = 3  (indices 1 and 4)
\`\`\`

\`\`\`text
Example 2:
Input: nums = [1, 2, 3, 4], k = 6
Output: false
Explanation: No pair has an absolute difference of 6.
\`\`\`

\`\`\`text
Example 3:
Input: nums = [7, 7, 7], k = 0
Output: true
Explanation: |7 - 7| = 0  (indices 0 and 1)
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^4\`
- \`-10^5 <= nums[i] <= 10^5\`
- \`0 <= k <= 2 * 10^5\``,
  hints: [
    `For each element x, you need to find whether x + k or x - k already exists in the array.`,
    `A hash set lets you look up whether a target value exists in O(1) time. Be careful when k == 0: you need the same value to appear more than once.`,
  ],
  guidance: [
    {
      "title": "Reframe the search",
      "body": "Instead of comparing every pair, think about what the \"partner\" of element `x` must look like: it must equal `x + k` or `x - k`.",
      "level": "nudge"
    },
    {
      "title": "Use a hash set for O(1) lookups",
      "body": "Iterate through `nums`. For each element, check whether `x + k` or `x - k` is already in a set of seen values. If yes, return `true`. Otherwise, add `x` to the set and continue.",
      "level": "strategy"
    },
    {
      "title": "Edge case: k == 0",
      "body": "When `k == 0`, you need `x + 0 == x`, meaning the same value must appear at two different indices. The \"seen\" set approach handles this naturally: you check before inserting, so if `x` is already in the set you return `true`.",
      "level": "pitfall"
    },
    {
      "title": "Algorithm shape",
      "body": "```\nseen = empty set\nfor x in nums:\n    if (x + k) in seen OR (x - k) in seen:\n        return true\n    add x to seen\nreturn false\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "hasPairWithDifferenceK",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      },
      {
        "name": "k",
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
          5,
          3,
          4,
          2
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
          4
        ],
        6
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        [
          7,
          7,
          7
        ],
        0
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ],
        0
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2
        ],
        1
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          -3,
          -1,
          2,
          5
        ],
        3
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
        ],
        0
      ],
      "expected": true,
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
        15
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          -5,
          0,
          5,
          10
        ],
        5
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          100000,
          -100000
        ],
        200000
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def has_pair_with_difference_k(nums: list[int], k: int) -> bool:
    # TODO: implement
    return False
`,
    javascript: `function hasPairWithDifferenceK(nums, k) {
    // TODO: implement
    return false;
}
`,
    typescript: `function hasPairWithDifferenceK(nums: number[], k: number): boolean {
    // TODO: implement
    return false;
}
`,
    java: `class Solution {
    public boolean hasPairWithDifferenceK(int[] nums, int k) {
        // TODO: implement
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool HasPairWithDifferenceK(int[] nums, int k) {
        // TODO: implement
        return false;
    }
}
`,
    c: `bool hasPairWithDifferenceK(int* nums, int numsSize, int k) {
    // TODO: implement
    return false;
}
`,
    cpp: `class Solution {
public:
    bool hasPairWithDifferenceK(vector<int>& nums, int k) {
        // TODO: implement
        return false;
    }
};
`,
  },
  solutions: {
    python: `def has_pair_with_difference_k(nums: list[int], k: int) -> bool:
    seen = set()
    for x in nums:
        if (x + k) in seen or (x - k) in seen:
            return True
        seen.add(x)
    return False
`,
    javascript: `function hasPairWithDifferenceK(nums, k) {
    const seen = new Set();
    for (const x of nums) {
        if (seen.has(x + k) || seen.has(x - k)) {
            return true;
        }
        seen.add(x);
    }
    return false;
}
`,
    typescript: `function hasPairWithDifferenceK(nums: number[], k: number): boolean {
    const seen = new Set<number>();
    for (const x of nums) {
        if (seen.has(x + k) || seen.has(x - k)) {
            return true;
        }
        seen.add(x);
    }
    return false;
}
`,
    java: `class Solution {
    public boolean hasPairWithDifferenceK(int[] nums, int k) {
        java.util.HashSet<Integer> seen = new java.util.HashSet<>();
        for (int x : nums) {
            if (seen.contains(x + k) || seen.contains(x - k)) {
                return true;
            }
            seen.add(x);
        }
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool HasPairWithDifferenceK(int[] nums, int k) {
        var seen = new System.Collections.Generic.HashSet<int>();
        foreach (int x in nums) {
            if (seen.Contains(x + k) || seen.Contains(x - k)) {
                return true;
            }
            seen.Add(x);
        }
        return false;
    }
}
`,
    c: `#include <stdbool.h>
bool hasPairWithDifferenceK(int* nums, int numsSize, int k) {
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            int diff = nums[i] - nums[j];
            if (diff < 0) diff = -diff;
            if (diff == k) return true;
        }
    }
    return false;
}
`,
    cpp: `class Solution {
public:
    bool hasPairWithDifferenceK(vector<int>& nums, int k) {
        unordered_set<int> seen;
        for (int x : nums) {
            if (seen.count(x + k) || seen.count(x - k)) {
                return true;
            }
            seen.insert(x);
        }
        return false;
    }
};
`,
  },
  editorial: `## Approach: Hash Set

### Intuition
For any element \`x\`, a valid partner must equal \`x + k\` or \`x - k\`. Instead of checking all pairs (O(n²)), we can use a hash set of previously seen values to answer "does the partner exist?" in O(1).

### Algorithm
1. Initialize an empty hash set \`seen\`.
2. For each element \`x\` in \`nums\`:
   - If \`x + k\` is in \`seen\` **or** \`x - k\` is in \`seen\`, return \`true\`.
   - Otherwise, add \`x\` to \`seen\`.
3. If no pair found, return \`false\`.

### Why checking both \`x+k\` and \`x-k\`?
We only look backward (into already-seen elements). Element \`y\` that was already seen pairs with \`x\` if \`|x - y| == k\`, i.e. \`y == x + k\` or \`y == x - k\`.

### Edge case: k == 0
When \`k == 0\`, we need the same value at two different indices. Since we check before inserting, the second occurrence of a value will find the first occurrence in \`seen\` and correctly return \`true\`.

### Complexity
- **Time:** O(n) — single pass, each hash set operation is O(1) amortized.
- **Space:** O(n) — the hash set holds at most n elements.

### C note
The C solution uses a brute-force O(n²) double loop to avoid the need for a hash map, which is not available in standard C without significant boilerplate.`,
};

export default problem;
