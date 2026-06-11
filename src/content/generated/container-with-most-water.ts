import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "container-with-most-water",
  title: "Container With Most Water",
  difficulty: "medium",
  category: "two-pointers",
  order: 1069,
  description: `Given an integer array \`height\` of length \`n\`, where each element represents the height of a vertical line drawn at that position, find two lines that together with the x-axis form a container that holds the **maximum** amount of water.

Return the maximum amount of water the container can hold.

The water held by lines at indices \`i\` and \`j\` (with \`i < j\`) equals \`min(height[i], height[j]) * (j - i)\`.

\`\`\`text
Example 1:
Input:  height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: Lines at index 1 (height 8) and index 8 (height 7) form the
best container. Area = min(8,7) * (8-1) = 7 * 7 = 49.
\`\`\`

\`\`\`text
Example 2:
Input:  height = [4,3,2,1,4]
Output: 16
Explanation: Lines at index 0 (height 4) and index 4 (height 4).
Area = min(4,4) * (4-0) = 4 * 4 = 16.
\`\`\`

**Constraints:**
- \`2 <= n <= 10^5\`
- \`0 <= height[i] <= 10^4\``,
  hints: [
    `The area depends on two things: the shorter of the two chosen heights, and the distance between them. A brute-force O(n²) scan works but can you do better?`,
    `Start with pointers at both ends — this gives the maximum possible width. Compute the current area, then decide which pointer to move inward.`,
    `If you move the pointer at the taller line inward, the width shrinks and the effective height can only stay the same or decrease (still capped by the shorter line). So always move the pointer pointing to the shorter line.`,
  ],
  signature: {
    "name": "maxArea",
    "params": [
      {
        "name": "height",
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
          8,
          6,
          2,
          5,
          4,
          8,
          3,
          7
        ]
      ],
      "expected": 49,
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
      "hidden": false
    },
    {
      "input": [
        [
          4,
          3,
          2,
          1,
          4
        ]
      ],
      "expected": 16,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          1
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          4,
          3
        ]
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          3,
          4,
          5,
          18,
          17,
          6
        ]
      ],
      "expected": 17,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          10,
          1,
          1,
          1,
          1,
          1,
          1,
          10
        ]
      ],
      "expected": 70,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          3,
          2,
          5,
          25,
          24,
          5
        ]
      ],
      "expected": 24,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          1,
          2,
          4,
          3
        ]
      ],
      "expected": 12,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def max_area(height: list[int]) -> int:
    # TODO: implement using two pointers
    return 0`,
    javascript: `function maxArea(height) {
    // TODO: implement using two pointers
    return 0;
}`,
    java: `class Solution {
    public int maxArea(int[] height) {
        // TODO: implement using two pointers
        return 0;
    }
}`,
    c: `int maxArea(int* height, int heightSize) {
    // TODO: implement using two pointers
    return 0;
}`,
  },
  solutions: {
    python: `def max_area(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    max_water = 0
    while left < right:
        area = min(height[left], height[right]) * (right - left)
        if area > max_water:
            max_water = area
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_water`,
    javascript: `function maxArea(height) {
    let left = 0, right = height.length - 1;
    let maxWater = 0;
    while (left < right) {
        const area = Math.min(height[left], height[right]) * (right - left);
        if (area > maxWater) maxWater = area;
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxWater;
}`,
    java: `class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int maxWater = 0;
        while (left < right) {
            int area = Math.min(height[left], height[right]) * (right - left);
            if (area > maxWater) maxWater = area;
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxWater;
    }
}`,
    c: `int maxArea(int* height, int heightSize) {
    int left = 0, right = heightSize - 1;
    int maxWater = 0;
    while (left < right) {
        int h = height[left] < height[right] ? height[left] : height[right];
        int area = h * (right - left);
        if (area > maxWater) maxWater = area;
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxWater;
}`,
  },
  editorial: `## Approach: Two Pointers

### Intuition

A brute-force solution checks every pair (i, j) and computes \`min(height[i], height[j]) * (j - i)\`, costing O(n²). We can do better.

Place a \`left\` pointer at index \`0\` and a \`right\` pointer at index \`n − 1\`. This pair has the **maximum width**. On each step, compute the current area and decide which pointer to move inward.

### Why always move the shorter-line pointer?

Suppose \`height[left] ≤ height[right]\`. Consider any pair \`(left, r')\` with \`r' < right\`:

\`\`\`
area(left, r') = min(height[left], height[r']) * (r' - left)
              ≤ height[left] * (right - left)
              = area(left, right)  [or less]
\`\`\`

So no future pair using \`left\` as the limiting height can beat the current area. We can safely discard \`left\` by incrementing it. By symmetry, when \`height[right] < height[left]\`, we decrement \`right\`.

### Algorithm

\`\`\`
left  = 0
right = n - 1
maxWater = 0

while left < right:
    area = min(height[left], height[right]) * (right - left)
    maxWater = max(maxWater, area)
    if height[left] < height[right]:
        left++
    else:
        right--

return maxWater
\`\`\`

### Complexity

- **Time:** O(n) — each pointer moves at most n steps total.
- **Space:** O(1) — only a fixed number of variables.`,
};

export default problem;
