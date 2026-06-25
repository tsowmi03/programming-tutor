import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "maximum-sum-of-a-length-k-subarray-with-all-distinct-values",
  title: "Maximum Sum of Length-K Subarray with All Distinct Values",
  difficulty: "medium",
  category: "sliding-window",
  order: 2993,
  description: `Given an integer array \`nums\` and an integer \`k\`, return the **maximum sum** of any contiguous subarray of length exactly \`k\` where **all elements in the subarray are distinct**.

If no such subarray exists, return \`-1\`.

\`\`\`text
Example 1:
Input:  nums = [1, 5, 4, 2, 9, 9, 3], k = 3
Output: 15
Explanation: Subarray [4, 2, 9] has sum 15 with all distinct elements.
             [2, 9, 9] is invalid (duplicate 9). [1, 5, 4] = 10, [5, 4, 2] = 11.
             15 is the maximum valid sum.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [4, 4, 4], k = 3
Output: -1
Explanation: The only window of length 3 is [4, 4, 4] which has duplicates.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1, 2, 3, 4, 5], k = 2
Output: 9
Explanation: Subarray [4, 5] has sum 9, all elements distinct.
\`\`\`

**Constraints:**
- \`1 <= k <= nums.length <= 10^4\`
- \`1 <= nums[i] <= 1000\``,
  hints: [
    `Use a sliding window of fixed size k. Track the current window sum and the frequency of each element inside the window.`,
    `When you slide the window, add the incoming element and remove the outgoing element from your frequency map. Only update the answer when the number of distinct elements equals k.`,
  ],
  guidance: [
    {
      "title": "Start with a Fixed-Size Window",
      "body": "Since you always need exactly `k` elements, maintain a window of exactly that size and slide it one position at a time from left to right.",
      "level": "nudge"
    },
    {
      "title": "Track Distinct Count with a Frequency Map",
      "body": "Keep a frequency map for the current window. The number of distinct elements equals the number of keys with count > 0. When this equals `k`, all elements in the window are distinct.",
      "level": "strategy"
    },
    {
      "title": "Slide Efficiently",
      "body": "At each step: add `nums[right]` to the window (increment its frequency and add to sum), then if the window exceeds size k remove `nums[right - k]` (decrement frequency, delete key if 0, subtract from sum). Check validity after each step.",
      "level": "strategy"
    },
    {
      "title": "Edge Case: No Valid Window",
      "body": "If the answer was never updated (no window of size k had all distinct values), return -1. Initialize the answer to -1 as a sentinel.",
      "level": "pitfall"
    },
    {
      "title": "Pseudocode Shape",
      "body": "```\nfreq = {}\nwindow_sum = 0\nans = -1\nfor right in 0..n-1:\n    freq[nums[right]]++\n    window_sum += nums[right]\n    if right >= k:\n        out = nums[right - k]\n        window_sum -= out\n        freq[out]--\n        if freq[out] == 0: delete freq[out]\n    if right >= k-1 and len(freq) == k:\n        ans = max(ans, window_sum)\nreturn ans\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "maximumSubarraySum",
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
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          1,
          5,
          4,
          2,
          9,
          9,
          3
        ],
        3
      ],
      "expected": 15,
      "hidden": false
    },
    {
      "input": [
        [
          4,
          4,
          4
        ],
        3
      ],
      "expected": -1,
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
        2
      ],
      "expected": 9,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          1,
          2,
          1,
          2
        ],
        2
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          10
        ],
        1
      ],
      "expected": 10,
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
      "expected": 6,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          5,
          5,
          5
        ],
        2
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          1,
          4,
          1,
          5,
          9,
          2,
          6
        ],
        4
      ],
      "expected": 22,
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
      "expected": 15,
      "hidden": true
    },
    {
      "input": [
        [
          100,
          99,
          98
        ],
        3
      ],
      "expected": 297,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def maximum_subarray_sum(nums: list[int], k: int) -> int:
    # TODO: implement sliding window with distinct check
    return -1
`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function maximumSubarraySum(nums, k) {
    // TODO: implement sliding window with distinct check
    return -1;
}
`,
    typescript: `function maximumSubarraySum(nums: number[], k: number): number {
    // TODO: implement sliding window with distinct check
    return -1;
}
`,
    java: `class Solution {
    public int maximumSubarraySum(int[] nums, int k) {
        // TODO: implement sliding window with distinct check
        return -1;
    }
}
`,
    csharp: `using System;
using System.Collections.Generic;

public class Solution {
    public int MaximumSubarraySum(int[] nums, int k) {
        // TODO: implement sliding window with distinct check
        return -1;
    }
}
`,
    c: `int maximumSubarraySum(int* nums, int numsSize, int k) {
    // TODO: implement sliding window with distinct check
    return -1;
}
`,
    cpp: `class Solution {
public:
    int maximumSubarraySum(vector<int>& nums, int k) {
        // TODO: implement sliding window with distinct check
        return -1;
    }
};
`,
  },
  solutions: {
    python: `def maximum_subarray_sum(nums: list[int], k: int) -> int:
    from collections import defaultdict
    freq = defaultdict(int)
    window_sum = 0
    ans = -1
    n = len(nums)
    for right in range(n):
        freq[nums[right]] += 1
        window_sum += nums[right]
        if right >= k:
            out = nums[right - k]
            window_sum -= out
            freq[out] -= 1
            if freq[out] == 0:
                del freq[out]
        if right >= k - 1 and len(freq) == k:
            ans = max(ans, window_sum)
    return ans
`,
    javascript: `function maximumSubarraySum(nums, k) {
    const freq = new Map();
    let windowSum = 0;
    let ans = -1;
    const n = nums.length;
    for (let right = 0; right < n; right++) {
        freq.set(nums[right], (freq.get(nums[right]) || 0) + 1);
        windowSum += nums[right];
        if (right >= k) {
            const out = nums[right - k];
            windowSum -= out;
            freq.set(out, freq.get(out) - 1);
            if (freq.get(out) === 0) freq.delete(out);
        }
        if (right >= k - 1 && freq.size === k) {
            ans = Math.max(ans, windowSum);
        }
    }
    return ans;
}
`,
    typescript: `function maximumSubarraySum(nums: number[], k: number): number {
    const freq = new Map<number, number>();
    let windowSum = 0;
    let ans = -1;
    const n = nums.length;
    for (let right = 0; right < n; right++) {
        freq.set(nums[right], (freq.get(nums[right]) ?? 0) + 1);
        windowSum += nums[right];
        if (right >= k) {
            const out = nums[right - k];
            windowSum -= out;
            freq.set(out, freq.get(out)! - 1);
            if (freq.get(out) === 0) freq.delete(out);
        }
        if (right >= k - 1 && freq.size === k) {
            ans = Math.max(ans, windowSum);
        }
    }
    return ans;
}
`,
    java: `class Solution {
    public int maximumSubarraySum(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        int windowSum = 0;
        int ans = -1;
        int n = nums.length;
        for (int right = 0; right < n; right++) {
            freq.merge(nums[right], 1, Integer::sum);
            windowSum += nums[right];
            if (right >= k) {
                int out = nums[right - k];
                windowSum -= out;
                freq.merge(out, -1, Integer::sum);
                if (freq.get(out) == 0) freq.remove(out);
            }
            if (right >= k - 1 && freq.size() == k) {
                ans = Math.max(ans, windowSum);
            }
        }
        return ans;
    }
}
`,
    csharp: `using System;
using System.Collections.Generic;

public class Solution {
    public int MaximumSubarraySum(int[] nums, int k) {
        var freq = new Dictionary<int, int>();
        int windowSum = 0;
        int ans = -1;
        int n = nums.Length;
        for (int right = 0; right < n; right++) {
            if (!freq.ContainsKey(nums[right])) freq[nums[right]] = 0;
            freq[nums[right]]++;
            windowSum += nums[right];
            if (right >= k) {
                int outVal = nums[right - k];
                windowSum -= outVal;
                freq[outVal]--;
                if (freq[outVal] == 0) freq.Remove(outVal);
            }
            if (right >= k - 1 && freq.Count == k) {
                ans = Math.Max(ans, windowSum);
            }
        }
        return ans;
    }
}
`,
    c: `int maximumSubarraySum(int* nums, int numsSize, int k) {
    /* Brute force O(n*k): for each window check distinctness */
    int ans = -1;
    for (int i = 0; i <= numsSize - k; i++) {
        /* Check all elements in window [i, i+k-1] are distinct */
        int distinct = 1;
        for (int a = i; a < i + k && distinct; a++) {
            for (int b = a + 1; b < i + k && distinct; b++) {
                if (nums[a] == nums[b]) distinct = 0;
            }
        }
        if (distinct) {
            int sum = 0;
            for (int a = i; a < i + k; a++) sum += nums[a];
            if (ans < sum) ans = sum;
        }
    }
    return ans;
}
`,
    cpp: `class Solution {
public:
    int maximumSubarraySum(vector<int>& nums, int k) {
        unordered_map<int,int> freq;
        int windowSum = 0;
        int ans = -1;
        int n = (int)nums.size();
        for (int right = 0; right < n; right++) {
            freq[nums[right]]++;
            windowSum += nums[right];
            if (right >= k) {
                int out = nums[right - k];
                windowSum -= out;
                if (--freq[out] == 0) freq.erase(out);
            }
            if (right >= k - 1 && (int)freq.size() == k) {
                ans = max(ans, windowSum);
            }
        }
        return ans;
    }
};
`,
  },
  editorial: `## Approach: Sliding Window with Frequency Map

### Intuition
We need the maximum sum among all subarrays of length exactly \`k\` whose elements are all distinct. A brute-force approach checks all windows in O(n·k) time. We can do better with a sliding window in O(n).

### Algorithm
1. Maintain a frequency map \`freq\` for elements in the current window.
2. Maintain the current window sum \`windowSum\`.
3. Slide the right boundary from \`0\` to \`n-1\`. At each step:
   - Add \`nums[right]\` to the frequency map and to \`windowSum\`.
   - If the window has grown beyond \`k\` elements (\`right >= k\`), remove \`nums[right - k]\` from the map and subtract it from \`windowSum\`.
   - Once the window has exactly \`k\` elements (\`right >= k-1\`), check if \`freq.size() == k\`. If so, all elements are distinct — update the answer.
4. Return \`ans\` (or \`-1\` if never updated).

### Why \`freq.size() == k\` means all distinct?
In a window of size \`k\`, if the number of distinct keys is also \`k\`, each element must appear exactly once.

### Complexity
- **Time:** O(n) — each element is added and removed at most once.
- **Space:** O(k) — the frequency map holds at most \`k\` entries at any time.

### Example Walkthrough
\`nums = [1, 5, 4, 2, 9, 9, 3]\`, \`k = 3\`

| right | window    | distinct | sum | ans |
|-------|-----------|----------|-----|-----|
| 0     | [1]       | 1        | 1   | -1  |
| 1     | [1,5]     | 2        | 6   | -1  |
| 2     | [1,5,4]   | 3 ✓      | 10  | 10  |
| 3     | [5,4,2]   | 3 ✓      | 11  | 11  |
| 4     | [4,2,9]   | 3 ✓      | 15  | 15  |
| 5     | [2,9,9]   | 2        | 20  | 15  |
| 6     | [9,9,3]   | 2        | 21  | 15  |

Answer: **15**`,
};

export default problem;
