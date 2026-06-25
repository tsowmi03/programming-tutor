import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-pairs-in-a-sorted-array-with-sum-less-than-target",
  title: "Count Pairs with Sum Less Than Target",
  difficulty: "medium",
  category: "two-pointers",
  order: 2991,
  description: `Given a **sorted** (non-decreasing) integer array \`nums\` and an integer \`target\`, return the number of pairs \`(i, j)\` where \`0 <= i < j < nums.length\` and \`nums[i] + nums[j] < target\`.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 4, 5], target = 6
Output: 4
Explanation: Valid pairs are (1,2), (1,3), (1,4), (2,3) → sums 3,4,5,5 all < 6.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [-3, -1, 0, 2, 4, 6], target = 3
Output: 7
Explanation: Pairs with sum < 3:
(-3,-1),(-3,0),(-3,2),(-3,4),(-1,0),(-1,2),(0,2) → 7 pairs.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1, 1, 1, 1], target = 3
Output: 6
Explanation: All C(4,2)=6 pairs have sum 2 < 3.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^4\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`-10^4 <= target <= 10^4\`
- \`nums\` is sorted in non-decreasing order.`,
  hints: [
    `The array is sorted — think about what happens when you fix the smallest element and search for valid partners using a pointer from the other end.`,
    `Use two pointers: left at the start, right at the end. If nums[left] + nums[right] < target, all indices between left and right pair validly with left.`,
    `When the sum is too large, move the right pointer inward. When the sum is small enough, count (right - left) valid pairs and advance left.`,
  ],
  guidance: [
    {
      "title": "Why two pointers work on a sorted array",
      "body": "Because the array is sorted, `nums[left] + nums[right]` is the largest possible sum involving `nums[left]`. If that sum is still less than `target`, every element between `left+1` and `right` also forms a valid pair with `left`.",
      "level": "nudge"
    },
    {
      "title": "Counting in bulk",
      "body": "When `nums[left] + nums[right] < target`, there are exactly `right - left` valid pairs that include `nums[left]` (paired with each of `nums[left+1]` through `nums[right]`). Add that count, then increment `left`.",
      "level": "strategy"
    },
    {
      "title": "Moving the right pointer",
      "body": "When `nums[left] + nums[right] >= target`, the sum is too large. Decrement `right` to try a smaller second element. Continue until `left >= right`.",
      "level": "strategy"
    },
    {
      "title": "Common pitfall: off-by-one in the count",
      "body": "When `nums[left] + nums[right] < target`, the count to add is `right - left` (not `right - left - 1` or `right - left + 1`). There are indices `left+1, left+2, ..., right` — that is exactly `right - left` indices.",
      "level": "pitfall"
    },
    {
      "title": "Algorithm shape",
      "body": "```\ncount = 0\nleft = 0, right = n - 1\nwhile left < right:\n    if nums[left] + nums[right] < target:\n        count += right - left   # all of left+1..right pair with left\n        left += 1\n    else:\n        right -= 1\nreturn count\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "countPairs",
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
          1,
          2,
          3,
          4,
          5
        ],
        6
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        [
          -3,
          -1,
          0,
          2,
          4,
          6
        ],
        3
      ],
      "expected": 7,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1
        ],
        3
      ],
      "expected": 6,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        10
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        3
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          5
        ],
        10
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          -5,
          -4,
          -3,
          -2,
          -1
        ],
        -3
      ],
      "expected": 9,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0,
          0,
          0
        ],
        1
      ],
      "expected": 10,
      "hidden": true
    },
    {
      "input": [
        [
          -10000,
          0,
          10000
        ],
        1
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2
        ],
        4
      ],
      "expected": 1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_pairs(nums: list[int], target: int) -> int:
    # TODO: implement using two pointers
    return 0
`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function countPairs(nums, target) {
    // TODO: implement using two pointers
    return 0;
}
`,
    typescript: `function countPairs(nums: number[], target: number): number {
    // TODO: implement using two pointers
    return 0;
}
`,
    java: `class Solution {
    public int countPairs(int[] nums, int target) {
        // TODO: implement using two pointers
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int CountPairs(int[] nums, int target) {
        // TODO: implement using two pointers
        return 0;
    }
}
`,
    c: `int countPairs(int* nums, int numsSize, int target) {
    // TODO: implement using two pointers
    return 0;
}
`,
    cpp: `class Solution {
public:
    int countPairs(vector<int>& nums, int target) {
        // TODO: implement using two pointers
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def count_pairs(nums: list[int], target: int) -> int:
    count = 0
    left, right = 0, len(nums) - 1
    while left < right:
        if nums[left] + nums[right] < target:
            count += right - left
            left += 1
        else:
            right -= 1
    return count
`,
    javascript: `function countPairs(nums, target) {
    let count = 0;
    let left = 0, right = nums.length - 1;
    while (left < right) {
        if (nums[left] + nums[right] < target) {
            count += right - left;
            left++;
        } else {
            right--;
        }
    }
    return count;
}
`,
    typescript: `function countPairs(nums: number[], target: number): number {
    let count = 0;
    let left = 0, right = nums.length - 1;
    while (left < right) {
        if (nums[left] + nums[right] < target) {
            count += right - left;
            left++;
        } else {
            right--;
        }
    }
    return count;
}
`,
    java: `class Solution {
    public int countPairs(int[] nums, int target) {
        int count = 0;
        int left = 0, right = nums.length - 1;
        while (left < right) {
            if (nums[left] + nums[right] < target) {
                count += right - left;
                left++;
            } else {
                right--;
            }
        }
        return count;
    }
}
`,
    csharp: `public class Solution {
    public int CountPairs(int[] nums, int target) {
        int count = 0;
        int left = 0, right = nums.Length - 1;
        while (left < right) {
            if (nums[left] + nums[right] < target) {
                count += right - left;
                left++;
            } else {
                right--;
            }
        }
        return count;
    }
}
`,
    c: `int countPairs(int* nums, int numsSize, int target) {
    int count = 0;
    int left = 0, right = numsSize - 1;
    while (left < right) {
        if (nums[left] + nums[right] < target) {
            count += right - left;
            left++;
        } else {
            right--;
        }
    }
    return count;
}
`,
    cpp: `class Solution {
public:
    int countPairs(vector<int>& nums, int target) {
        int count = 0;
        int left = 0, right = (int)nums.size() - 1;
        while (left < right) {
            if (nums[left] + nums[right] < target) {
                count += right - left;
                left++;
            } else {
                right--;
            }
        }
        return count;
    }
};
`,
  },
  editorial: `## Approach: Two Pointers

### Intuition

Because the array is **sorted**, we can use two pointers — one starting at the left end (smallest element) and one at the right end (largest element) — to count valid pairs in a single pass.

Key observation: if \`nums[left] + nums[right] < target\`, then for the fixed index \`left\`, **every** index \`j\` in the range \`(left, right]\` also satisfies \`nums[left] + nums[j] < target\` (since the array is non-decreasing). That gives us \`right - left\` new valid pairs at once.

### Algorithm

1. Initialize \`left = 0\`, \`right = n - 1\`, \`count = 0\`.
2. While \`left < right\`:
   - If \`nums[left] + nums[right] < target\`: add \`right - left\` to \`count\`, then \`left++\`.
   - Otherwise: \`right--\`.
3. Return \`count\`.

### Worked Example

\`nums = [1, 2, 3, 4, 5]\`, \`target = 6\`

- \`left=0, right=4\`: \`1+5=6\`, not \`< 6\` → \`right--\`
- \`left=0, right=3\`: \`1+4=5 < 6\` → add \`3-0=3\`, \`left++\`
- \`left=1, right=3\`: \`2+4=6\`, not \`< 6\` → \`right--\`
- \`left=1, right=2\`: \`2+3=5 < 6\` → add \`2-1=1\`, \`left++\`
- \`left=2, right=2\`: loop ends
- Total = 4 ✓

### Complexity

- **Time:** O(n) — each pointer moves at most n steps total.
- **Space:** O(1) — only a constant number of variables.`,
};

export default problem;
