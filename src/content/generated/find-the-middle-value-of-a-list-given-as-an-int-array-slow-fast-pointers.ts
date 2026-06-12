import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-middle-value-of-a-list-given-as-an-int-array-slow-fast-pointers",
  title: "Middle of the Linked List",
  difficulty: "easy",
  category: "linked-lists",
  order: 1110,
  description: `Given an array \`nums\` representing the values of a singly linked list (in order from head to tail), return the **value** of the middle node.

If the list has an **even** number of elements, return the value of the **second** middle node.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 4, 5]
Output: 3
Explanation: The middle node has value 3.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 2, 3, 4, 5, 6]
Output: 4
Explanation: Two middle nodes are 3 and 4; return the second middle, which is 4.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [7]
Output: 7
Explanation: Single element list — the middle is the only element.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 100\`
- \`1 <= nums[i] <= 100\``,
  hints: [
    `Imagine two pointers starting at index 0: one moves one step at a time, the other moves two steps at a time. When the fast pointer reaches the end, where is the slow pointer?`,
    `For an array of length n, the second middle index is n/2 (integer division). You can verify this with both odd and even lengths.`,
    `You don't actually need a linked list — simulate the slow/fast pointer logic directly on the array using indices.`,
  ],
  signature: {
    "name": "middleValue",
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
          1,
          2,
          3,
          4,
          5
        ]
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
          5,
          6
        ]
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        [
          7
        ]
      ],
      "expected": 7,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2
        ]
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
          3,
          3
        ]
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          10,
          20,
          30,
          40
        ]
      ],
      "expected": 30,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          1,
          8,
          3,
          9,
          2,
          7
        ]
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          100
        ]
      ],
      "expected": 100,
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
        ]
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          42,
          17
        ]
      ],
      "expected": 17,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def middle_value(nums: list[int]) -> int:
    # TODO: implement using slow/fast pointer logic
    pass
`,
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function middleValue(nums) {
    // TODO: implement using slow/fast pointer logic
}
`,
    typescript: `function middleValue(nums: number[]): number {
    // TODO: implement using slow/fast pointer logic
    return 0;
}`,
    java: `class Solution {
    public int middleValue(int[] nums) {
        // TODO: implement using slow/fast pointer logic
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int MiddleValue(int[] nums) {
        // TODO: implement using slow/fast pointer logic
        return 0;
    }
}`,
    c: `#include <stdlib.h>

int middleValue(int* nums, int numsSize) {
    // TODO: implement using slow/fast pointer logic
    return 0;
}
`,
    cpp: `class Solution {
public:
    int middleValue(vector<int>& nums) {
        // TODO: implement using slow/fast pointer logic
        return 0;
    }
};`,
  },
  solutions: {
    python: `def middle_value(nums: list[int]) -> int:
    slow = 0
    fast = 0
    n = len(nums)
    while fast < n and fast + 1 < n:
        slow += 1
        fast += 2
    return nums[slow]
`,
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function middleValue(nums) {
    let slow = 0;
    let fast = 0;
    const n = nums.length;
    while (fast < n && fast + 1 < n) {
        slow += 1;
        fast += 2;
    }
    return nums[slow];
}
`,
    typescript: `function middleValue(nums: number[]): number {
    let slow = 0;
    let fast = 0;
    const n = nums.length;
    while (fast < n && fast + 1 < n) {
        slow += 1;
        fast += 2;
    }
    return nums[slow];
}`,
    java: `class Solution {
    public int middleValue(int[] nums) {
        int slow = 0;
        int fast = 0;
        int n = nums.length;
        while (fast < n && fast + 1 < n) {
            slow += 1;
            fast += 2;
        }
        return nums[slow];
    }
}
`,
    csharp: `public class Solution {
    public int MiddleValue(int[] nums) {
        int slow = 0;
        int fast = 0;
        int n = nums.Length;
        while (fast < n && fast + 1 < n) {
            slow += 1;
            fast += 2;
        }
        return nums[slow];
    }
}`,
    c: `#include <stdlib.h>

int middleValue(int* nums, int numsSize) {
    int slow = 0;
    int fast = 0;
    while (fast < numsSize && fast + 1 < numsSize) {
        slow += 1;
        fast += 2;
    }
    return nums[slow];
}
`,
    cpp: `class Solution {
public:
    int middleValue(vector<int>& nums) {
        int slow = 0;
        int fast = 0;
        int n = nums.size();
        while (fast < n && fast + 1 < n) {
            slow += 1;
            fast += 2;
        }
        return nums[slow];
    }
};`,
  },
  editorial: `## Approach: Slow and Fast Pointers

We simulate the classic slow/fast (tortoise and hare) pointer technique on the array using indices.

### Idea
- Start both \`slow\` and \`fast\` at index \`0\`.
- While \`fast\` can advance by 2 steps (i.e., both \`fast\` and \`fast+1\` are valid indices), move \`slow\` forward by 1 and \`fast\` forward by 2.
- When \`fast\` can no longer advance, \`slow\` points to the middle.

### Why it works
- For odd length \`n\`, \`fast\` lands on the last index and \`slow\` ends up at index \`n/2\` — exactly the middle.
- For even length \`n\`, \`fast\` lands on index \`n-2\` (second-to-last), so \`slow\` ends up at index \`n/2\` — the second middle node, as required.

### Example trace (n=6: [1,2,3,4,5,6])
| step | slow | fast |
|------|------|------|
| init |  0   |  0   |
|  1   |  1   |  2   |
|  2   |  2   |  4   |
| stop |  3   |  —   |
Return \`nums[3] = 4\`. ✓

### Complexity
- **Time:** O(n) — one pass through the array.
- **Space:** O(1) — only two index variables used.`,
};

export default problem;
