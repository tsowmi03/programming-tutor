import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-closest-pair-sum-to-a-target-in-a-sorted-array",
  title: "Closest Pair Sum",
  difficulty: "medium",
  category: "two-pointers",
  order: 1016,
  description: `Given a **sorted** integer array \`nums\` and an integer \`target\`, find the pair of indices \`[i, j]\` (where \`i < j\`) such that \`nums[i] + nums[j]\` is closest to \`target\`.

If there are multiple pairs with the same closest distance, return the pair with the **smaller index \`i\`**. If there is still a tie on \`i\`, return the pair with the **smaller index \`j\`**.

Return the answer as \`[i, j]\`.

\`\`\`text
Example 1:
Input:  nums = [1, 3, 5, 8, 10], target = 9
Output: [0, 3]
Explanation: nums[0]+nums[3] = 1+8 = 9, distance 0. Perfect match!
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [-3, -1, 2, 4, 7], target = 3
Output: [1, 3]
Explanation: nums[1]+nums[3] = -1+4 = 3, distance 0. Perfect match!
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1, 2, 3, 4], target = 100
Output: [2, 3]
Explanation: Largest possible sum is 3+4=7, which is the closest to 100.
\`\`\`

**Constraints:**
- \`2 <= nums.length <= 10^4\`
- \`-10^5 <= nums[i] <= 10^5\`
- \`-2 * 10^5 <= target <= 2 * 10^5\`
- \`nums\` is sorted in non-decreasing order.`,
  hints: [
    `Since the array is sorted, consider placing one pointer at the start and one at the end. How does moving each pointer affect the sum?`,
    `If the current sum is less than the target, moving the left pointer right increases the sum. If it's greater, moving the right pointer left decreases it. Track the best (distance, i, j) seen so far.`,
    `When recording ties, always prefer the smaller \`i\`, then smaller \`j\` — make sure your comparison handles this correctly.`,
  ],
  guidance: [
    {
      "title": "Start with two pointers at opposite ends",
      "body": "Place `left = 0` and `right = n - 1`. At each step compute `sum = nums[left] + nums[right]` and compare to `target`.",
      "level": "nudge"
    },
    {
      "title": "Moving the pointers",
      "body": "- If `sum < target`, increment `left` to increase the sum.\n- If `sum > target`, decrement `right` to decrease the sum.\n- If `sum == target`, you found a perfect match — return immediately.",
      "level": "strategy"
    },
    {
      "title": "Tracking the best pair",
      "body": "Keep `bestDist`, `bestI`, `bestJ`. Update only when `|sum - target| < bestDist`, or when equal and `(left, right)` is lexicographically smaller than `(bestI, bestJ)`.",
      "level": "strategy"
    },
    {
      "title": "Tie-breaking order",
      "body": "When a tie occurs, compare `left < bestI`, or `left == bestI && right < bestJ`. This ensures the smallest `i` (then smallest `j`) is recorded.",
      "level": "pitfall"
    },
    {
      "title": "Algorithm shape",
      "body": "```\nleft = 0, right = n-1\nbestDist = INF, bestI = 0, bestJ = 1\nwhile left < right:\n    s = nums[left] + nums[right]\n    d = abs(s - target)\n    if d < bestDist or (d == bestDist and (left < bestI or (left == bestI and right < bestJ))):\n        bestDist, bestI, bestJ = d, left, right\n    if d == 0: break\n    elif s < target: left++\n    else: right--\nreturn [bestI, bestJ]\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "closestPairSum",
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
    "returns": "int[]",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          1,
          3,
          5,
          8,
          10
        ],
        9
      ],
      "expected": [
        0,
        3
      ],
      "hidden": false
    },
    {
      "input": [
        [
          -3,
          -1,
          2,
          4,
          7
        ],
        3
      ],
      "expected": [
        1,
        3
      ],
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
        100
      ],
      "expected": [
        2,
        3
      ],
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
        -100
      ],
      "expected": [
        0,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0
        ],
        0
      ],
      "expected": [
        0,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -5,
          -3,
          -1,
          0,
          2,
          4
        ],
        -4
      ],
      "expected": [
        1,
        2
      ],
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
        2
      ],
      "expected": [
        0,
        3
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -10,
          -5,
          0,
          5,
          10
        ],
        0
      ],
      "expected": [
        0,
        4
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          3,
          5,
          7,
          9,
          11
        ],
        10
      ],
      "expected": [
        0,
        4
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def closest_pair_sum(nums: list[int], target: int) -> list[int]:
    # TODO: implement using two pointers
    return [0, 1]
`,
    javascript: `function closestPairSum(nums, target) {
    // TODO: implement using two pointers
    return [0, 1];
}
`,
    typescript: `function closestPairSum(nums: number[], target: number): number[] {
    // TODO: implement using two pointers
    return [0, 1];
}
`,
    java: `class Solution {
    public int[] closestPairSum(int[] nums, int target) {
        // TODO: implement using two pointers
        return new int[]{0, 1};
    }
}
`,
    csharp: `public class Solution {
    public int[] ClosestPairSum(int[] nums, int target) {
        // TODO: implement using two pointers
        return new int[]{0, 1};
    }
}
`,
    c: `int* closestPairSum(int* nums, int numsSize, int target, int* returnSize) {
    int* result = (int*)malloc(2 * sizeof(int));
    *returnSize = 2;
    result[0] = 0;
    result[1] = 1;
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> closestPairSum(vector<int>& nums, int target) {
        // TODO: implement using two pointers
        return {0, 1};
    }
};
`,
  },
  solutions: {
    python: `def closest_pair_sum(nums: list[int], target: int) -> list[int]:
    left, right = 0, len(nums) - 1
    best_dist = float('inf')
    best_i, best_j = 0, 1
    while left < right:
        s = nums[left] + nums[right]
        d = abs(s - target)
        if d < best_dist or (d == best_dist and (left < best_i or (left == best_i and right < best_j))):
            best_dist, best_i, best_j = d, left, right
        if d == 0:
            break
        elif s < target:
            left += 1
        else:
            right -= 1
    return [best_i, best_j]
`,
    javascript: `function closestPairSum(nums, target) {
    let left = 0, right = nums.length - 1;
    let bestDist = Infinity, bestI = 0, bestJ = 1;
    while (left < right) {
        const s = nums[left] + nums[right];
        const d = Math.abs(s - target);
        if (d < bestDist || (d === bestDist && (left < bestI || (left === bestI && right < bestJ)))) {
            bestDist = d; bestI = left; bestJ = right;
        }
        if (d === 0) break;
        else if (s < target) left++;
        else right--;
    }
    return [bestI, bestJ];
}
`,
    typescript: `function closestPairSum(nums: number[], target: number): number[] {
    let left = 0, right = nums.length - 1;
    let bestDist = Infinity, bestI = 0, bestJ = 1;
    while (left < right) {
        const s = nums[left] + nums[right];
        const d = Math.abs(s - target);
        if (d < bestDist || (d === bestDist && (left < bestI || (left === bestI && right < bestJ)))) {
            bestDist = d; bestI = left; bestJ = right;
        }
        if (d === 0) break;
        else if (s < target) left++;
        else right--;
    }
    return [bestI, bestJ];
}
`,
    java: `class Solution {
    public int[] closestPairSum(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        int bestDist = Integer.MAX_VALUE, bestI = 0, bestJ = 1;
        while (left < right) {
            int s = nums[left] + nums[right];
            int d = Math.abs(s - target);
            if (d < bestDist || (d == bestDist && (left < bestI || (left == bestI && right < bestJ)))) {
                bestDist = d; bestI = left; bestJ = right;
            }
            if (d == 0) break;
            else if (s < target) left++;
            else right--;
        }
        return new int[]{bestI, bestJ};
    }
}
`,
    csharp: `using System;
public class Solution {
    public int[] ClosestPairSum(int[] nums, int target) {
        int left = 0, right = nums.Length - 1;
        int bestDist = int.MaxValue, bestI = 0, bestJ = 1;
        while (left < right) {
            int s = nums[left] + nums[right];
            int d = Math.Abs(s - target);
            if (d < bestDist || (d == bestDist && (left < bestI || (left == bestI && right < bestJ)))) {
                bestDist = d; bestI = left; bestJ = right;
            }
            if (d == 0) break;
            else if (s < target) left++;
            else right--;
        }
        return new int[]{bestI, bestJ};
    }
}
`,
    c: `int* closestPairSum(int* nums, int numsSize, int target, int* returnSize) {
    int* result = (int*)malloc(2 * sizeof(int));
    *returnSize = 2;
    int left = 0, right = numsSize - 1;
    int bestDist = -1, bestI = 0, bestJ = 1;
    while (left < right) {
        int s = nums[left] + nums[right];
        int d = s - target;
        if (d < 0) d = -d;
        if (bestDist < 0 || d < bestDist ||
            (d == bestDist && (left < bestI || (left == bestI && right < bestJ)))) {
            bestDist = d; bestI = left; bestJ = right;
        }
        if (d == 0) break;
        else if (s < target) left++;
        else right--;
    }
    result[0] = bestI;
    result[1] = bestJ;
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> closestPairSum(vector<int>& nums, int target) {
        int left = 0, right = (int)nums.size() - 1;
        int bestDist = INT_MAX, bestI = 0, bestJ = 1;
        while (left < right) {
            int s = nums[left] + nums[right];
            int d = abs(s - target);
            if (d < bestDist || (d == bestDist && (left < bestI || (left == bestI && right < bestJ)))) {
                bestDist = d; bestI = left; bestJ = right;
            }
            if (d == 0) break;
            else if (s < target) left++;
            else right--;
        }
        return {bestI, bestJ};
    }
};
`,
  },
  editorial: `## Approach: Two Pointers

### Intuition

Because the array is sorted, we can use two pointers starting at opposite ends. The key insight is:
- If the current sum is **less** than \`target\`, we need a larger sum → move \`left\` right.
- If the current sum is **greater** than \`target\`, we need a smaller sum → move \`right\` left.
- If the sum equals \`target\`, we can't do better — return immediately.

This lets us examine every promising candidate in O(n) time instead of O(n²).

### Tie-breaking

We track \`(bestDist, bestI, bestJ)\`. We update when:
1. The new distance is strictly smaller, **or**
2. The new distance equals \`bestDist\` and \`(left, right)\` is lexicographically smaller than \`(bestI, bestJ)\` — i.e., \`left < bestI\`, or \`left == bestI && right < bestJ\`.

### Complexity

- **Time:** O(n) — each pointer moves at most n steps total.
- **Space:** O(1) — only a constant number of variables used.

### Walkthrough (Example 3)

\`nums = [1,2,3,4], target = 100\`

| left | right | sum | dist | update? |
|------|-------|-----|------|---------|
| 0    | 3     | 5   | 95   | yes → (95,0,3) |
| 1    | 3     | 6   | 94   | yes → (94,1,3) |
| 2    | 3     | 7   | 93   | yes → (93,2,3) |
| left==right → stop |

Return \`[2, 3]\`.`,
};

export default problem;
