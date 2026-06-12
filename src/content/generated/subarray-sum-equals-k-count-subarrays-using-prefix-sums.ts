import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "subarray-sum-equals-k-count-subarrays-using-prefix-sums",
  title: "Subarray Sum Equals K",
  difficulty: "medium",
  category: "arrays-hashing",
  order: 1055,
  description: `Given an integer array \`nums\` and an integer \`k\`, return the **total number of subarrays** whose elements sum to exactly \`k\`.

A **subarray** is a contiguous, non-empty sequence of elements within the array.

\`\`\`text
Example 1:
Input:  nums = [1, 1, 1], k = 2
Output: 2
Explanation: [nums[0], nums[1]] = [1,1] and [nums[1], nums[2]] = [1,1]
             each sum to 2. Total count = 2.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 2, 3], k = 3
Output: 2
Explanation: [1, 2] (sum = 3) and [3] (sum = 3) are the two valid subarrays.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 2 * 10^4\`
- \`-1000 <= nums[i] <= 1000\`
- \`-10^7 <= k <= 10^7\``,
  hints: [
    `A brute-force O(n²) solution checks every possible subarray start and end. Can you do better?`,
    `Think about prefix sums: the sum of subarray nums[i..j] equals prefix[j+1] - prefix[i]. You want this difference to equal k.`,
    `Rearranging: prefix[i] = prefix[j+1] - k. As you scan left to right, you need to know how many earlier prefix sums equal (currentPrefix - k). A hash map gives O(1) lookups.`,
    `Initialize your frequency map with {0: 1} before starting — this handles subarrays that begin at index 0, where the left boundary has an implicit prefix sum of 0.`,
  ],
  signature: {
    "name": "subarraySum",
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
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        [
          1,
          1,
          1
        ],
        2
      ],
      "expected": 2,
      "hidden": false
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
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ],
        1
      ],
      "expected": 1,
      "hidden": false
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
      "expected": 6,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -1,
          1
        ],
        0
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          4,
          7,
          2,
          -3,
          1,
          4,
          2
        ],
        7
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          -1,
          1,
          -1
        ],
        0
      ],
      "expected": 4,
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
        3
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          5
        ],
        5
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          2,
          2,
          2
        ],
        4
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def subarray_sum(nums, k):
    # TODO: return the count of subarrays that sum to k
    return 0`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    // TODO: return the count of subarrays that sum to k
    return 0;
};`,
    java: `class Solution {
    public int subarraySum(int[] nums, int k) {
        // TODO: return the count of subarrays that sum to k
        return 0;
    }
}`,
    c: `int subarraySum(int* nums, int numsSize, int k) {
    // TODO: return the count of subarrays that sum to k
    return 0;
}`,
  },
  solutions: {
    python: `def subarray_sum(nums, k):
    count = 0
    prefix = 0
    freq = {0: 1}
    for num in nums:
        prefix += num
        count += freq.get(prefix - k, 0)
        freq[prefix] = freq.get(prefix, 0) + 1
    return count`,
    javascript: `var subarraySum = function(nums, k) {
    let count = 0, prefix = 0;
    const freq = new Map();
    freq.set(0, 1);
    for (const num of nums) {
        prefix += num;
        count += (freq.get(prefix - k) || 0);
        freq.set(prefix, (freq.get(prefix) || 0) + 1);
    }
    return count;
};`,
    java: `class Solution {
    public int subarraySum(int[] nums, int k) {
        int count = 0, prefix = 0;
        java.util.Map<Integer, Integer> freq = new java.util.HashMap<>();
        freq.put(0, 1);
        for (int num : nums) {
            prefix += num;
            count += freq.getOrDefault(prefix - k, 0);
            freq.put(prefix, freq.getOrDefault(prefix, 0) + 1);
        }
        return count;
    }
}`,
    c: `int subarraySum(int* nums, int numsSize, int k) {
    int count = 0;
    for (int i = 0; i < numsSize; i++) {
        int sum = 0;
        for (int j = i; j < numsSize; j++) {
            sum += nums[j];
            if (sum == k) count++;
        }
    }
    return count;
}`,
  },
  editorial: `## Approach: Prefix Sum + Hash Map

**Core Idea:** The sum of any subarray \`nums[i..j]\` equals \`prefix[j+1] - prefix[i]\`, where \`prefix[t]\` is the sum of the first \`t\` elements. To count subarrays summing to \`k\`, we need:

\`\`\`
prefix[j+1] - prefix[i] = k  ⟺  prefix[i] = prefix[j+1] - k
\`\`\`

As we scan left to right and compute the running prefix sum, we look up how many past prefix sums equal \`(currentPrefix − k)\`. A hash map gives O(1) lookups.

**Algorithm:**
1. Initialize \`freq = {0: 1}\`, \`prefix = 0\`, \`count = 0\`.
2. For each element \`num\` in \`nums\`:
   - \`prefix += num\`
   - \`count += freq.get(prefix − k, 0)\`
   - \`freq[prefix] += 1\`
3. Return \`count\`.

**Why \`{0: 1}\`?** A subarray starting at index 0 has its left boundary with prefix sum 0. Pre-loading this entry ensures those subarrays are counted.

**Walkthrough** — \`nums = [1, 1, 1]\`, \`k = 2\`:

| num | prefix | prefix−k | freq (before lookup)    | count |
|-----|--------|----------|-------------------------|-------|
|  1  |   1    |   −1     | {0:1}                   |   0   |
|  1  |   2    |    0     | {0:1, 1:1}              |   1   |
|  1  |   3    |    1     | {0:1, 1:1, 2:1}         |   2   |

**Complexity:**
- **Time:** O(n) — one pass, O(1) hash map operations per element.
- **Space:** O(n) — at most n + 1 distinct prefix sums stored.

> **C Note:** The C solution uses an O(n²) brute-force scan over all subarrays, which is simpler without a built-in hash map and still correct within the given constraints.`,
};

export default problem;
