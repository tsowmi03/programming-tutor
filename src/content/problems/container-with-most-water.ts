import type { CodeProblemDef } from "../types";

export const containerWithMostWater: CodeProblemDef = {
  type: "code",
  slug: "container-with-most-water",
  title: "Container With Most Water",
  difficulty: "medium",
  category: "two-pointers",
  order: 3,
  description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines such that the two endpoints of the \`i\`-th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that, together with the x-axis, form a container that holds the **most water**, and return that maximum area.

The area between lines \`i\` and \`j\` is \`(j - i) * min(height[i], height[j])\` — water can't rise above the shorter line.

**Example 1**

\`\`\`text
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: lines at indices 1 and 8 give (8-1) * min(8,7) = 49.
\`\`\`

**Example 2**

\`\`\`text
Input: height = [1,1]
Output: 1
\`\`\`

**Constraints**

- \`2 <= height.length <= 100000\`
- \`0 <= height[i] <= 10000\`
`,
  hints: [
    "Brute force tries every pair — O(n²). Think about starting with the *widest* container instead.",
    "With pointers at both ends, the area is limited by the shorter line. What happens to the area if you move the taller line inward? The width shrinks and the limiting height can't improve.",
    "So the only move that can possibly help is moving the **shorter** line inward. Track the best area seen along the way.",
  ],
  signature: {
    name: "maxArea",
    params: [{ name: "height", type: "int[]" }],
    returns: "int",
  },
  testCases: [
    { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
    { input: [[1, 1]], expected: 1 },
    { input: [[4, 3, 2, 1, 4]], expected: 16, hidden: true },
    { input: [[1, 2, 1]], expected: 2, hidden: true },
    { input: [[0, 0]], expected: 0, hidden: true },
    { input: [[10, 0, 0, 0, 10]], expected: 40, hidden: true },
    { input: [[2, 3, 4, 5, 18, 17, 6]], expected: 17, hidden: true },
  ],
  starterCode: {
    python: `def max_area(height):
    """Return the maximum water area between any two lines."""
    # Your code here
    pass
`,
    javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
  // Your code here
}
`,
    java: `class Solution {
    public int maxArea(int[] height) {
        // Your code here
        return 0;
    }
}
`,
    c: `int maxArea(int* height, int heightSize) {
    // Your code here
    return 0;
}
`,
  },
  solutions: {
    python: `def max_area(height):
    left, right = 0, len(height) - 1
    best = 0
    while left < right:
        width = right - left
        best = max(best, width * min(height[left], height[right]))
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return best
`,
    javascript: `function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let best = 0;
  while (left < right) {
    const area = (right - left) * Math.min(height[left], height[right]);
    best = Math.max(best, area);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return best;
}
`,
    java: `class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1, best = 0;
        while (left < right) {
            int area = (right - left) * Math.min(height[left], height[right]);
            best = Math.max(best, area);
            if (height[left] < height[right]) left++;
            else right--;
        }
        return best;
    }
}
`,
    c: `int maxArea(int* height, int heightSize) {
    int left = 0, right = heightSize - 1, best = 0;
    while (left < right) {
        int h = height[left] < height[right] ? height[left] : height[right];
        int area = (right - left) * h;
        if (area > best) best = area;
        if (height[left] < height[right]) left++;
        else right--;
    }
    return best;
}
`,
  },
  editorial: `## Approach: two pointers, move the shorter line

Start with the widest possible container: pointers at both ends. At each
step the area is \`width × min(left height, right height)\`.

The crucial argument: **moving the taller line inward can never help.**
The width strictly shrinks, and the limiting (shorter) height stays the
same or gets worse. Moving the *shorter* line is the only move with any
chance of finding a taller pair that compensates for the lost width.

So: record the current area, then step whichever pointer holds the shorter
line. Each element is visited at most once.

This is a **greedy elimination** proof — every pair you skip is provably no
better than one you already measured. Convincing yourself of that argument
is the real lesson of this problem; the code is six lines.

**Complexity:** O(n) time, O(1) space.
`,
};
