import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-occurrences-of-each-value-and-return-the-most-frequent",
  title: "Most Frequent Element",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 1044,
  description: `Given an integer array \`nums\`, return the element that appears **most frequently**.

If multiple elements share the highest frequency, return the **smallest** of those elements.

**Example 1:**
\`\`\`text
Input:  nums = [1, 2, 2, 3, 3, 3]
Output: 3
Explanation: 3 appears 3 times — the highest frequency.
\`\`\`

**Example 2:**
\`\`\`text
Input:  nums = [1, 1, 2, 2, 3]
Output: 1
Explanation: Both 1 and 2 appear twice (tied for highest).
             Return the smaller value, 1.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^4\`
- \`-10^4 <= nums[i] <= 10^4\``,
  hints: [
    `Try iterating through the array and counting how many times each distinct value appears.`,
    `Once you have all the counts, what is the largest count value?`,
    `If several elements share that maximum count, how do you decide which one to return?`,
    `A single pass over your count map — tracking both the max frequency and the minimum element at that frequency — is enough.`,
  ],
  signature: {
    "name": "mostFrequent",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      }
    ],
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        [
          1,
          2,
          2,
          3,
          3,
          3
        ]
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          1,
          2,
          2,
          3
        ]
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        [
          5
        ]
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        [
          -1,
          -1,
          2,
          2,
          -1
        ]
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          4,
          4,
          4,
          4
        ]
      ],
      "expected": 4,
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
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          10,
          10,
          10,
          5,
          5,
          5,
          3
        ]
      ],
      "expected": 5,
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
          6,
          5,
          3,
          5
        ]
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          -5,
          -5,
          -3,
          -3,
          -3,
          -1
        ]
      ],
      "expected": -3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def most_frequent(nums):
    # TODO: count occurrences and return the most frequent element
    # (break ties by returning the smallest element)
    return 0
`,
    javascript: `function mostFrequent(nums) {
    // TODO: count occurrences and return the most frequent element
    // (break ties by returning the smallest element)
    return 0;
}
`,
    java: `class Solution {
    public int mostFrequent(int[] nums) {
        // TODO: count occurrences and return the most frequent element
        // (break ties by returning the smallest element)
        return 0;
    }
}
`,
    c: `int mostFrequent(int* nums, int numsSize) {
    /* TODO: count occurrences and return the most frequent element
       (break ties by returning the smallest element) */
    return 0;
}
`,
  },
  solutions: {
    python: `def most_frequent(nums):
    count = {}
    for n in nums:
        count[n] = count.get(n, 0) + 1
    max_freq = max(count.values())
    return min(k for k, v in count.items() if v == max_freq)
`,
    javascript: `function mostFrequent(nums) {
    const count = {};
    for (const n of nums) {
        count[n] = (count[n] || 0) + 1;
    }
    let maxFreq = 0;
    for (const key in count) {
        if (count[key] > maxFreq) maxFreq = count[key];
    }
    let result = Infinity;
    for (const key in count) {
        if (count[key] === maxFreq) {
            const val = parseInt(key);
            if (val < result) result = val;
        }
    }
    return result;
}
`,
    java: `class Solution {
    public int mostFrequent(int[] nums) {
        java.util.Map<Integer, Integer> count = new java.util.HashMap<>();
        for (int n : nums) {
            count.put(n, count.getOrDefault(n, 0) + 1);
        }
        int maxFreq = 0;
        for (int v : count.values()) {
            if (v > maxFreq) maxFreq = v;
        }
        int result = Integer.MAX_VALUE;
        for (java.util.Map.Entry<Integer, Integer> entry : count.entrySet()) {
            if (entry.getValue() == maxFreq && entry.getKey() < result) {
                result = entry.getKey();
            }
        }
        return result;
    }
}
`,
    c: `int mostFrequent(int* nums, int numsSize) {
    int maxFreq = 0;
    int result = nums[0];
    for (int i = 0; i < numsSize; i++) {
        int freq = 0;
        for (int j = 0; j < numsSize; j++) {
            if (nums[j] == nums[i]) freq++;
        }
        if (freq > maxFreq || (freq == maxFreq && nums[i] < result)) {
            maxFreq = freq;
            result = nums[i];
        }
    }
    return result;
}
`,
  },
  editorial: `## Approach: Frequency Map + Single Scan

### Steps

1. **Count frequencies** — Iterate through \`nums\` and build a hash map \`count\` where \`count[v]\` is the number of times value \`v\` appears. This takes O(n) time.

2. **Find the maximum frequency** — Scan the map's values for the largest count.

3. **Pick the smallest winner** — Among all keys whose count equals the maximum, return the minimum.

Steps 2 and 3 can be merged into a single pass over the map.

\`\`\`python
count = {}
for n in nums:
    count[n] = count.get(n, 0) + 1
max_freq = max(count.values())
return min(k for k, v in count.items() if v == max_freq)
\`\`\`

### Complexity
| | Time | Space |
|---|---|---|
| Python / JS / Java | O(n) | O(n) |
| C (brute-force) | O(n²) | O(1) |

The C solution avoids a hash map by recomputing the frequency of each element with a nested loop. It updates the running result whenever it finds a higher frequency, or an equal frequency with a smaller value — giving exactly the same answer with no extra memory.`,
};

export default problem;
