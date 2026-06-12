import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-subarrays-of-exactly-size-k-where-all-elements-are-distinct",
  title: "Distinct Subarrays of Size K",
  difficulty: "easy",
  category: "sliding-window",
  order: 1099,
  description: `Given an integer array \`nums\` and an integer \`k\`, return the number of subarrays of length exactly \`k\` where **all elements are distinct** (no duplicates within that subarray).

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 2, 4], k = 3
Output: 2
Explanation:
  [1,2,3] – all distinct ✓
  [2,3,2] – 2 repeats    ✗
  [3,2,4] – all distinct ✓
  Count = 2
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 2, 3, 4, 5], k = 3
Output: 3
Explanation:
  [1,2,3] ✓  [2,3,4] ✓  [3,4,5] ✓  → 3
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1, 1, 1, 1], k = 2
Output: 0
Explanation: Every length-2 subarray is [1,1], none are distinct.
\`\`\`

**Constraints:**
- \`1 <= k <= nums.length <= 1000\`
- \`1 <= nums[i] <= 1000\``,
  hints: [
    `Slide a window of fixed size k across the array. What do you need to track inside that window?`,
    `Count the number of distinct elements in the current window. If it equals k, all elements are distinct.`,
    `When the window slides, remove the leftmost element and add the new rightmost element. Use a frequency map to update the distinct count efficiently.`,
  ],
  signature: {
    "name": "countDistinctSubarrays",
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
          2,
          3,
          2,
          4
        ],
        3
      ],
      "expected": 2,
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
        3
      ],
      "expected": 3,
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
      "expected": 0,
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
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2
        ],
        2
      ],
      "expected": 1,
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
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          5,
          5,
          5,
          5
        ],
        1
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3,
          1,
          2,
          3,
          4
        ],
        4
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
          8
        ],
        8
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
          3,
          4,
          5
        ],
        3
      ],
      "expected": 2,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_distinct_subarrays(nums: list[int], k: int) -> int:
    # TODO: implement sliding window
    return 0
`,
    javascript: `function countDistinctSubarrays(nums, k) {
    // TODO: implement sliding window
    return 0;
}
`,
    typescript: `function countDistinctSubarrays(nums: number[], k: number): number {
    // TODO: implement sliding window
    return 0;
}`,
    java: `class Solution {
    public int countDistinctSubarrays(int[] nums, int k) {
        // TODO: implement sliding window
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int CountDistinctSubarrays(int[] nums, int k) {
        // TODO: implement sliding window
        return 0;
    }
}`,
    c: `int countDistinctSubarrays(int* nums, int numsSize, int k) {
    // TODO: implement sliding window
    return 0;
}
`,
    cpp: `class Solution {
public:
    int countDistinctSubarrays(vector<int>& nums, int k) {
        // TODO: implement sliding window
        return 0;
    }
};`,
  },
  solutions: {
    python: `def count_distinct_subarrays(nums: list[int], k: int) -> int:
    freq = {}
    distinct = 0
    result = 0
    n = len(nums)
    for i in range(n):
        # Add right element
        right = nums[i]
        if freq.get(right, 0) == 0:
            distinct += 1
        freq[right] = freq.get(right, 0) + 1
        # Remove left element when window exceeds k
        if i >= k:
            left = nums[i - k]
            freq[left] -= 1
            if freq[left] == 0:
                distinct -= 1
        # Check window of size k
        if i >= k - 1:
            if distinct == k:
                result += 1
    return result
`,
    javascript: `function countDistinctSubarrays(nums, k) {
    const freq = new Array(1001).fill(0);
    let distinct = 0;
    let result = 0;
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        // Add right element
        if (freq[nums[i]] === 0) {
            distinct++;
        }
        freq[nums[i]]++;
        // Remove left element when window exceeds k
        if (i >= k) {
            const left = nums[i - k];
            freq[left]--;
            if (freq[left] === 0) {
                distinct--;
            }
        }
        // Check window of size k
        if (i >= k - 1) {
            if (distinct === k) {
                result++;
            }
        }
    }
    return result;
}
`,
    typescript: `function countDistinctSubarrays(nums: number[], k: number): number {
    const freq = new Array(1001).fill(0);
    let distinct = 0;
    let result = 0;
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        // Add right element
        if (freq[nums[i]] === 0) {
            distinct++;
        }
        freq[nums[i]]++;
        // Remove left element when window exceeds k
        if (i >= k) {
            const left = nums[i - k];
            freq[left]--;
            if (freq[left] === 0) {
                distinct--;
            }
        }
        // Check window of size k
        if (i >= k - 1) {
            if (distinct === k) {
                result++;
            }
        }
    }
    return result;
}`,
    java: `class Solution {
    public int countDistinctSubarrays(int[] nums, int k) {
        int[] freq = new int[1001];
        int distinct = 0;
        int result = 0;
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            // Add right element
            if (freq[nums[i]] == 0) {
                distinct++;
            }
            freq[nums[i]]++;
            // Remove left element when window exceeds k
            if (i >= k) {
                int left = nums[i - k];
                freq[left]--;
                if (freq[left] == 0) {
                    distinct--;
                }
            }
            // Check window of size k
            if (i >= k - 1) {
                if (distinct == k) {
                    result++;
                }
            }
        }
        return result;
    }
}
`,
    csharp: `public class Solution {
    public int CountDistinctSubarrays(int[] nums, int k) {
        int[] freq = new int[1001];
        int distinct = 0;
        int result = 0;
        int n = nums.Length;
        for (int i = 0; i < n; i++) {
            // Add right element
            if (freq[nums[i]] == 0) {
                distinct++;
            }
            freq[nums[i]]++;
            // Remove left element when window exceeds k
            if (i >= k) {
                int left = nums[i - k];
                freq[left]--;
                if (freq[left] == 0) {
                    distinct--;
                }
            }
            // Check window of size k
            if (i >= k - 1) {
                if (distinct == k) {
                    result++;
                }
            }
        }
        return result;
    }
}`,
    c: `int countDistinctSubarrays(int* nums, int numsSize, int k) {
    int freq[1001] = {0};
    int distinct = 0;
    int result = 0;
    for (int i = 0; i < numsSize; i++) {
        /* Add right element */
        if (freq[nums[i]] == 0) {
            distinct++;
        }
        freq[nums[i]]++;
        /* Remove left element when window exceeds k */
        if (i >= k) {
            int left = nums[i - k];
            freq[left]--;
            if (freq[left] == 0) {
                distinct--;
            }
        }
        /* Check window of size k */
        if (i >= k - 1) {
            if (distinct == k) {
                result++;
            }
        }
    }
    return result;
}
`,
    cpp: `class Solution {
public:
    int countDistinctSubarrays(vector<int>& nums, int k) {
        int freq[1001] = {0};
        int distinct = 0;
        int result = 0;
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            // Add right element
            if (freq[nums[i]] == 0) {
                distinct++;
            }
            freq[nums[i]]++;
            // Remove left element when window exceeds k
            if (i >= k) {
                int left = nums[i - k];
                freq[left]--;
                if (freq[left] == 0) {
                    distinct--;
                }
            }
            // Check window of size k
            if (i >= k - 1) {
                if (distinct == k) {
                    result++;
                }
            }
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Fixed-Size Sliding Window with Frequency Count

### Intuition
For a subarray of length \`k\` to have all distinct elements, the number of distinct values in it must equal \`k\`. We maintain a sliding window of exactly size \`k\` and track distinct element counts using a frequency array.

### Algorithm
1. Maintain a frequency array \`freq\` (size 1001) and a counter \`distinct\`.
2. Iterate index \`i\` from \`0\` to \`n-1\`:
   - **Expand right**: If \`freq[nums[i]] == 0\`, increment \`distinct\`. Then increment \`freq[nums[i]]\`.
   - **Shrink left**: When \`i >= k\`, the element leaving the window is \`nums[i - k]\`. Decrement its frequency; if it reaches 0, decrement \`distinct\`.
   - **Count**: When \`i >= k - 1\` (window is full), if \`distinct == k\`, increment the answer.
3. Return the answer.

### Complexity
- **Time:** O(n) — each element is added and removed from the window at most once.
- **Space:** O(1) — frequency array of fixed size 1001 (since \`1 <= nums[i] <= 1000\`).

### Example Trace (nums = [1,2,3,2,4], k = 3)
\`\`\`
i=0: add 1, distinct=1
i=1: add 2, distinct=2
i=2: add 3, distinct=3 → window=[1,2,3], distinct==3 → result=1
i=3: add 2, freq[2]=2, distinct=3; remove nums[0]=1, freq[1]=0, distinct=2 → window=[2,3,2], distinct=2 ✗
i=4: add 4, distinct=3; remove nums[1]=2, freq[2]=1, distinct=3 → window=[3,2,4], distinct==3 → result=2
Answer: 2
\`\`\``,
};

export default problem;
