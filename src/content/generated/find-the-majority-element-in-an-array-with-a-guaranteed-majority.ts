import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-majority-element-in-an-array-with-a-guaranteed-majority",
  title: "Majority Element",
  difficulty: "medium",
  category: "arrays-hashing",
  order: 1009,
  description: `Given an integer array \`nums\` of length \`n\`, find and return the **majority element**.

The majority element is the element that appears **more than** \`n / 2\` times. You may assume that the majority element **always exists** in the array.

\`\`\`text
Example 1:
Input:  nums = [3, 2, 3]
Output: 3
Explanation: 3 appears 2 times out of 3, which is > 3/2 = 1.5
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [2, 2, 1, 1, 1, 2, 2]
Output: 2
Explanation: 2 appears 4 times out of 7, which is > 7/2 = 3.5
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [6]
Output: 6
Explanation: Single element is trivially the majority element.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 5 * 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- The majority element always exists in \`nums\`.`,
  hints: [
    `Can you count how many times each element appears? Which data structure would let you look up counts quickly?`,
    `Once you have the counts, what threshold must the majority element exceed?`,
    `There is a clever O(n) time, O(1) space algorithm called Boyer-Moore Voting — think about what happens when you pair a majority element occurrence against a non-majority occurrence.`,
  ],
  guidance: [
    {
      "title": "Hash-map counting approach",
      "body": "Iterate through the array and maintain a frequency map from element to count. After building the map, scan for the entry whose count exceeds `n / 2`. This is O(n) time and O(n) space.",
      "level": "nudge"
    },
    {
      "title": "Threshold check",
      "body": "The majority element appears **strictly more than** `n / 2` times, so the threshold is `n // 2` (integer division). Any element with a count greater than this threshold is the answer.",
      "level": "strategy"
    },
    {
      "title": "Boyer-Moore Voting — the core insight",
      "body": "Maintain a `candidate` and a `count`. Walk through the array:\n- If `count == 0`, set the current element as the new `candidate`.\n- If the current element equals `candidate`, increment `count`.\n- Otherwise, decrement `count`.\n\nBecause the majority element appears more than half the time, it can never be fully \"cancelled out\" — it will be the candidate at the end.",
      "level": "strategy"
    },
    {
      "title": "Why Boyer-Moore is correct",
      "body": "The voting algorithm only works because the problem **guarantees** a majority element exists. If no majority is guaranteed, you would need a second pass to verify the candidate.",
      "level": "pitfall"
    },
    {
      "title": "Boyer-Moore pseudocode shape",
      "body": "```\ncandidate = nums[0]\ncount = 1\nfor each num in nums[1:]:\n    if count == 0:\n        candidate = num\n        count = 1\n    elif num == candidate:\n        count += 1\n    else:\n        count -= 1\nreturn candidate\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "majorityElement",
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
          3,
          2,
          3
        ]
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          2,
          2,
          1,
          1,
          1,
          2,
          2
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          6
        ]
      ],
      "expected": 6,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          1
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          5,
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
          -1,
          -1,
          2,
          -1,
          2
        ]
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          1000000000,
          -1000000000,
          1000000000
        ]
      ],
      "expected": 1000000000,
      "hidden": true
    },
    {
      "input": [
        [
          7,
          7,
          7,
          7,
          3,
          2,
          7
        ]
      ],
      "expected": 7,
      "hidden": true
    },
    {
      "input": [
        [
          4,
          4,
          4,
          4,
          4,
          4,
          1,
          2,
          3
        ]
      ],
      "expected": 4,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def majority_element(nums: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function majorityElement(nums) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function majorityElement(nums: number[]): number {
    // TODO: implement
    return 0;
}
`,
    java: `class Solution {
    public int majorityElement(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int MajorityElement(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int majorityElement(int* nums, int numsSize) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    int majorityElement(vector<int>& nums) {
        // TODO: implement
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def majority_element(nums: list[int]) -> int:
    candidate = nums[0]
    count = 1
    for num in nums[1:]:
        if count == 0:
            candidate = num
            count = 1
        elif num == candidate:
            count += 1
        else:
            count -= 1
    return candidate
`,
    javascript: `function majorityElement(nums) {
    let candidate = nums[0];
    let count = 1;
    for (let i = 1; i < nums.length; i++) {
        if (count === 0) {
            candidate = nums[i];
            count = 1;
        } else if (nums[i] === candidate) {
            count++;
        } else {
            count--;
        }
    }
    return candidate;
}
`,
    typescript: `function majorityElement(nums: number[]): number {
    let candidate: number = nums[0];
    let count: number = 1;
    for (let i = 1; i < nums.length; i++) {
        if (count === 0) {
            candidate = nums[i];
            count = 1;
        } else if (nums[i] === candidate) {
            count++;
        } else {
            count--;
        }
    }
    return candidate;
}
`,
    java: `class Solution {
    public int majorityElement(int[] nums) {
        int candidate = nums[0];
        int count = 1;
        for (int i = 1; i < nums.length; i++) {
            if (count == 0) {
                candidate = nums[i];
                count = 1;
            } else if (nums[i] == candidate) {
                count++;
            } else {
                count--;
            }
        }
        return candidate;
    }
}
`,
    csharp: `public class Solution {
    public int MajorityElement(int[] nums) {
        int candidate = nums[0];
        int count = 1;
        for (int i = 1; i < nums.Length; i++) {
            if (count == 0) {
                candidate = nums[i];
                count = 1;
            } else if (nums[i] == candidate) {
                count++;
            } else {
                count--;
            }
        }
        return candidate;
    }
}
`,
    c: `int majorityElement(int* nums, int numsSize) {
    int candidate = nums[0];
    int count = 1;
    for (int i = 1; i < numsSize; i++) {
        if (count == 0) {
            candidate = nums[i];
            count = 1;
        } else if (nums[i] == candidate) {
            count++;
        } else {
            count--;
        }
    }
    return candidate;
}
`,
    cpp: `class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int candidate = nums[0];
        int count = 1;
        for (int i = 1; i < (int)nums.size(); i++) {
            if (count == 0) {
                candidate = nums[i];
                count = 1;
            } else if (nums[i] == candidate) {
                count++;
            } else {
                count--;
            }
        }
        return candidate;
    }
};
`,
  },
  editorial: `## Approach: Boyer-Moore Voting Algorithm

### Intuition
The majority element appears more than \`n/2\` times. If we think of majority votes as \`+1\` and all others as \`-1\`, the total sum must be positive. We can simulate this with a running candidate and count.

### Algorithm
1. Initialize \`candidate = nums[0]\`, \`count = 1\`.
2. For each subsequent element \`num\`:
   - If \`count == 0\`, set \`candidate = num\`, \`count = 1\`.
   - Else if \`num == candidate\`, increment \`count\`.
   - Else decrement \`count\`.
3. Return \`candidate\`.

### Why it works
Every time we decrement count, we are "cancelling" one majority vote with one minority vote. Since the majority element appears more than \`n/2\` times, it cannot be fully cancelled — it will always be the surviving candidate.

### Complexity
- **Time:** O(n) — single pass through the array.
- **Space:** O(1) — only two variables (\`candidate\` and \`count\`) are needed.

### Alternative: Hash Map
Build a frequency map in O(n) time and O(n) space, then find the element with count > \`n/2\`. Simpler to reason about but uses extra memory.
`,
};

export default problem;
