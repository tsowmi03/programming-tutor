import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-all-unique-pairs-in-an-array-that-sum-to-a-target-return-count",
  title: "Count Unique Pairs Summing to Target",
  difficulty: "medium",
  category: "arrays-hashing",
  order: 1058,
  description: `Given an integer array \`nums\` and an integer \`target\`, return the count of **unique value-pairs** \`(a, b)\` satisfying **all** of the following:

1. \`a <= b\`
2. \`a + b == target\`
3. Both \`a\` and \`b\` appear in \`nums\`
4. If \`a == b\`, then \`a\` must appear **at least twice** in \`nums\`

Two pairs are considered the same if they contain identical values. Multiple occurrences of the same value in \`nums\` do **not** produce extra pairs.

\`\`\`text
Example 1:
Input:  nums = [1, 5, 3, 3, 2, 4], target = 6
Output: 3
Explanation: Unique pairs: (1,5), (2,4), (3,3).
             3 appears twice so (3,3) is valid.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 2, 3, 4, 5], target = 6
Output: 2
Explanation: Unique pairs: (1,5), (2,4).
             Only one 3 exists, so (3,3) is invalid.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`-2 * 10^4 <= target <= 2 * 10^4\``,
  hints: [
    `Build a frequency map so you can check in O(1) whether a number's required complement exists in the array.`,
    `For each unique number \`num\`, its complement is \`target - num\`. Check if the complement is also a key in the map.`,
    `Normalize every candidate pair as \`(min(num, complement), max(num, complement))\` and use a seen-set to avoid counting the same value-pair twice.`,
    `Handle \`num == target - num\` separately: you need \`freq[num] >= 2\` to form a valid pair using the same value twice.`,
  ],
  signature: {
    "name": "countUniquePairs",
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
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        [
          1,
          5,
          3,
          3,
          2,
          4
        ],
        6
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
          4,
          5
        ],
        6
      ],
      "expected": 2,
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
        2
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        [],
        5
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
          -1,
          1,
          2,
          -2,
          0
        ],
        0
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          3,
          3,
          3
        ],
        6
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0,
          0
        ],
        0
      ],
      "expected": 1,
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
        ],
        11
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          2,
          3,
          4,
          4,
          5
        ],
        6
      ],
      "expected": 2,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_unique_pairs(nums, target):
    # TODO: implement
    return 0`,
    javascript: `var countUniquePairs = function(nums, target) {
    // TODO: implement
    return 0;
};`,
    typescript: `function countUniquePairs(nums: number[], target: number): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countUniquePairs(int[] nums, int target) {
        // TODO: implement
        return 0;
    }
}`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int CountUniquePairs(int[] nums, int target) {
        // TODO: implement
        return 0;
    }
}`,
    c: `int countUniquePairs(int* nums, int numsSize, int target) {
    // TODO: implement
    return 0;
}`,
    cpp: `class Solution {
public:
    int countUniquePairs(vector<int>& nums, int target) {
        // TODO: implement
        return 0;
    }
};`,
  },
  solutions: {
    python: `def count_unique_pairs(nums, target):
    from collections import Counter
    freq = Counter(nums)
    seen = set()
    count = 0
    for num in freq:
        complement = target - num
        if complement in freq:
            pair = (min(num, complement), max(num, complement))
            if pair not in seen:
                if num == complement:
                    if freq[num] >= 2:
                        count += 1
                else:
                    count += 1
                seen.add(pair)
    return count`,
    javascript: `var countUniquePairs = function(nums, target) {
    const freq = new Map();
    for (const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    const seen = new Set();
    let count = 0;
    for (const num of freq.keys()) {
        const complement = target - num;
        if (freq.has(complement)) {
            const a = Math.min(num, complement);
            const b = Math.max(num, complement);
            const pair = a + ',' + b;
            if (!seen.has(pair)) {
                if (num === complement) {
                    if (freq.get(num) >= 2) count++;
                } else {
                    count++;
                }
                seen.add(pair);
            }
        }
    }
    return count;
};`,
    typescript: `function countUniquePairs(nums: number[], target: number): number {
    const freq = new Map<number, number>();
    for (const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    const seen = new Set<string>();
    let count = 0;
    for (const num of freq.keys()) {
        const complement = target - num;
        if (freq.has(complement)) {
            const a = Math.min(num, complement);
            const b = Math.max(num, complement);
            const pair = a + ',' + b;
            if (!seen.has(pair)) {
                if (num === complement) {
                    if (freq.get(num)! >= 2) count++;
                } else {
                    count++;
                }
                seen.add(pair);
            }
        }
    }
    return count;
}`,
    java: `class Solution {
    public int countUniquePairs(int[] nums, int target) {
        java.util.Map<Integer, Integer> freq = new java.util.HashMap<>();
        for (int num : nums) {
            freq.put(num, freq.getOrDefault(num, 0) + 1);
        }
        java.util.Set<String> seen = new java.util.HashSet<>();
        int count = 0;
        for (int num : freq.keySet()) {
            int complement = target - num;
            if (freq.containsKey(complement)) {
                int a = Math.min(num, complement);
                int b = Math.max(num, complement);
                String pair = a + "," + b;
                if (!seen.contains(pair)) {
                    if (num == complement) {
                        if (freq.get(num) >= 2) count++;
                    } else {
                        count++;
                    }
                    seen.add(pair);
                }
            }
        }
        return count;
    }
}`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int CountUniquePairs(int[] nums, int target) {
        Dictionary<int, int> freq = new Dictionary<int, int>();
        foreach (int num in nums) {
            if (freq.ContainsKey(num)) freq[num]++;
            else freq[num] = 1;
        }
        HashSet<string> seen = new HashSet<string>();
        int count = 0;
        foreach (int num in freq.Keys) {
            int complement = target - num;
            if (freq.ContainsKey(complement)) {
                int a = num < complement ? num : complement;
                int b = num > complement ? num : complement;
                string pair = a + "," + b;
                if (!seen.Contains(pair)) {
                    if (num == complement) {
                        if (freq[num] >= 2) count++;
                    } else {
                        count++;
                    }
                    seen.Add(pair);
                }
            }
        }
        return count;
    }
}`,
    c: `#include <stdlib.h>
#include <string.h>

static int cmpInts(const void* a, const void* b) {
    int x = *(int*)a, y = *(int*)b;
    return (x > y) - (x < y);
}

int countUniquePairs(int* nums, int numsSize, int target) {
    if (numsSize < 2) return 0;
    int* sorted = (int*)malloc(numsSize * sizeof(int));
    memcpy(sorted, nums, numsSize * sizeof(int));
    qsort(sorted, numsSize, sizeof(int), cmpInts);
    int count = 0, left = 0, right = numsSize - 1;
    while (left < right) {
        int sum = sorted[left] + sorted[right];
        if (sum == target) {
            count++;
            int lv = sorted[left], rv = sorted[right];
            while (left < right && sorted[left] == lv) left++;
            while (left < right && sorted[right] == rv) right--;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    free(sorted);
    return count;
}`,
    cpp: `class Solution {
public:
    int countUniquePairs(vector<int>& nums, int target) {
        unordered_map<int, int> freq;
        for (int num : nums) {
            freq[num]++;
        }
        unordered_set<string> seen;
        int count = 0;
        for (auto& kv : freq) {
            int num = kv.first;
            int complement = target - num;
            if (freq.count(complement)) {
                int a = min(num, complement);
                int b = max(num, complement);
                string pair = to_string(a) + "," + to_string(b);
                if (!seen.count(pair)) {
                    if (num == complement) {
                        if (kv.second >= 2) count++;
                    } else {
                        count++;
                    }
                    seen.insert(pair);
                }
            }
        }
        return count;
    }
};`,
  },
  editorial: `## Approach: Frequency Map + Seen Set

### Key Insight

Rather than examining all O(n²) index-pairs, we iterate over **unique values** in a frequency map. For each value \`num\`, its required complement is \`target - num\`. Normalising the pair as \`(min, max)\` lets us detect duplicates cheaply.

### Algorithm

1. **Build frequency map** — count occurrences of every value in O(n).
2. **Iterate unique values** — for each \`num\`, compute \`complement = target - num\`.
3. **Check and deduplicate**:
   - If \`complement\` is absent, skip.
   - Form \`pair = (min(num, complement), max(num, complement))\`.
   - If \`pair\` is already in \`seen\`, skip.
   - If \`num == complement\`, only count if \`freq[num] >= 2\`.
   - Otherwise count it, then add to \`seen\`.
4. Return \`count\`.

### Complexity

| | Time | Space |
|---|---|---|
| Python / JS / Java | O(n) average | O(n) |
| C (sort + two-ptr) | O(n log n) | O(n) |

### C: Sort + Two-Pointer

Sort a copy of \`nums\`, then move \`left\` and \`right\` pointers inward:
- \`sum == target\` → increment count, skip all duplicates of both endpoint values.
- \`sum < target\` → advance \`left\`.
- \`sum > target\` → retreat \`right\`.

This naturally handles duplicate-skipping without a hash set.`,
};

export default problem;
