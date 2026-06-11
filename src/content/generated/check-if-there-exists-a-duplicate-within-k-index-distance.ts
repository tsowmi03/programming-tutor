import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-if-there-exists-a-duplicate-within-k-index-distance",
  title: "Contains Duplicate Within K Distance",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 1052,
  description: `Given an integer array \`nums\` and an integer \`k\`, return \`true\` if there exist two **distinct indices** \`i\` and \`j\` such that:

- \`nums[i] == nums[j]\`, **and**
- \`|i - j| <= k\`

Otherwise return \`false\`.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 1], k = 3
Output: true
Explanation: nums[0] == nums[3] == 1 and |0 - 3| = 3 <= 3.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 2, 3, 1, 2, 3], k = 2
Output: false
Explanation: Each pair of equal elements is exactly 3 indices apart, which exceeds k = 2.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`0 <= k <= 10^5\``,
  hints: [
    `What data structure lets you check in O(1) whether a value has been seen before and at which index?`,
    `As you scan left to right, maintain a map from each value to the most recent index where it appeared.`,
    `For each element, look it up in the map — if it was seen at some earlier index \`j\` and \`i - j <= k\`, you're done.`,
    `In C there is no built-in map; a brute-force nested loop that only looks up to k steps ahead is perfectly acceptable.`,
  ],
  signature: {
    "name": "containsNearbyDuplicate",
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
          0,
          1,
          1
        ],
        1
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
          1,
          2,
          3
        ],
        2
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ],
        1
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [],
        0
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          1,
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
          1
        ],
        1
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          99,
          99
        ],
        2
      ],
      "expected": true,
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
        ],
        5
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          1,
          2,
          1
        ],
        2
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def contains_nearby_duplicate(nums, k):
    # TODO: implement
    return False
`,
    javascript: `function containsNearbyDuplicate(nums, k) {
    // TODO: implement
    return false;
}
`,
    java: `class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        // TODO: implement
        return false;
    }
}
`,
    c: `#include <stdbool.h>
bool containsNearbyDuplicate(int* nums, int numsSize, int k) {
    // TODO: implement
    return false;
}
`,
  },
  solutions: {
    python: `def contains_nearby_duplicate(nums, k):
    seen = {}
    for i, num in enumerate(nums):
        if num in seen and i - seen[num] <= k:
            return True
        seen[num] = i
    return False
`,
    javascript: `function containsNearbyDuplicate(nums, k) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (seen.has(nums[i]) && i - seen.get(nums[i]) <= k) {
            return true;
        }
        seen.set(nums[i], i);
    }
    return false;
}
`,
    java: `class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        java.util.HashMap<Integer, Integer> seen = new java.util.HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            if (seen.containsKey(nums[i]) && i - seen.get(nums[i]) <= k) {
                return true;
            }
            seen.put(nums[i], i);
        }
        return false;
    }
}
`,
    c: `#include <stdbool.h>
bool containsNearbyDuplicate(int* nums, int numsSize, int k) {
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize && j - i <= k; j++) {
            if (nums[i] == nums[j]) return true;
        }
    }
    return false;
}
`,
  },
  editorial: `## Approach: Hash Map — Last Seen Index

### Intuition

We need to detect whether any value repeats within a window of \`k\` positions. The key insight is that for a given value, only its **most recent** previous occurrence matters: if that one is too far away, all earlier ones are even farther.

### Algorithm

1. Maintain a hash map \`seen\` that stores \`value → most recent index\`.
2. For each index \`i\`:
   - If \`nums[i]\` exists in \`seen\` and \`i - seen[nums[i]] <= k\`, return \`true\`.
   - Update \`seen[nums[i]] = i\`.
3. Return \`false\` if the loop completes without finding a pair.

### Why only store the latest index?

Suppose value \`v\` last appeared at index \`j < i\`. If \`i - j > k\`, any even earlier occurrence \`a < j\` satisfies \`i - a > k\` too. Keeping the most recent index is strictly optimal.

### Complexity

| | Time | Space |
|---|---|---|
| Hash map approach | O(n) | O(n) |
| C brute-force | O(n · k) | O(1) |

The C solution uses a nested loop where the inner loop exits as soon as \`j - i > k\`, so in practice it stays manageable within the given constraints.`,
};

export default problem;
