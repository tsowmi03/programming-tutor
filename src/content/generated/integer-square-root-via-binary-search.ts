import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "integer-square-root-via-binary-search",
  title: "Integer Square Root",
  difficulty: "easy",
  category: "binary-search",
  order: 1086,
  description: `Given a non-negative integer \`n\`, return the **integer square root** of \`n\` — that is, the largest integer \`k\` such that \`k * k <= n\`.

You may **not** use any built-in square root or power functions.

\`\`\`text
Example 1:
Input:  n = 9
Output: 3
Explanation: 3 * 3 = 9 <= 9, and 4 * 4 = 16 > 9.
\`\`\`

\`\`\`text
Example 2:
Input:  n = 14
Output: 3
Explanation: 3 * 3 = 9 <= 14, and 4 * 4 = 16 > 14, so the floor is 3.
\`\`\`

\`\`\`text
Example 3:
Input:  n = 0
Output: 0
Explanation: The square root of 0 is 0.
\`\`\`

**Constraints:**
- \`0 <= n <= 2^31 - 1\``,
  hints: [
    `Think of binary search over the range [0, n]. What condition lets you narrow down the answer?`,
    `If mid * mid <= n, then mid could be the answer — but a larger value might also work. Move the left boundary up.`,
    `Watch out for integer overflow when computing mid * mid for large values of n. Consider using 64-bit integers.`,
  ],
  signature: {
    "name": "mySqrt",
    "params": [
      {
        "name": "n",
        "type": "int"
      }
    ],
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        9
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        14
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        0
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        1
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        2
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        25
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        26
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        2147395600
      ],
      "expected": 46340,
      "hidden": true
    },
    {
      "input": [
        2147483647
      ],
      "expected": 46340,
      "hidden": true
    },
    {
      "input": [
        100
      ],
      "expected": 10,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def my_sqrt(n: int) -> int:
    # TODO: implement integer square root using binary search
    return 0
`,
    javascript: `/**
 * @param {number} n
 * @return {number}
 */
function mySqrt(n) {
    // TODO: implement integer square root using binary search
    return 0;
}
`,
    java: `class Solution {
    public int mySqrt(int n) {
        // TODO: implement integer square root using binary search
        return 0;
    }
}
`,
    c: `int mySqrt(int n) {
    // TODO: implement integer square root using binary search
    return 0;
}
`,
  },
  solutions: {
    python: `def my_sqrt(n: int) -> int:
    if n == 0:
        return 0
    lo, hi = 1, n
    ans = 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if mid * mid <= n:
            ans = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return ans
`,
    javascript: `/**
 * @param {number} n
 * @return {number}
 */
function mySqrt(n) {
    if (n === 0) return 0;
    let lo = 1, hi = n, ans = 0;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (BigInt(mid) * BigInt(mid) <= BigInt(n)) {
            ans = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return ans;
}
`,
    java: `class Solution {
    public int mySqrt(int n) {
        if (n == 0) return 0;
        long lo = 1, hi = n, ans = 0;
        while (lo <= hi) {
            long mid = lo + (hi - lo) / 2;
            if (mid * mid <= (long) n) {
                ans = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return (int) ans;
    }
}
`,
    c: `int mySqrt(int n) {
    if (n == 0) return 0;
    long long lo = 1, hi = n, ans = 0;
    while (lo <= hi) {
        long long mid = lo + (hi - lo) / 2;
        if (mid * mid <= (long long)n) {
            ans = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return (int)ans;
}
`,
  },
  editorial: `## Approach: Binary Search

We want the largest integer \`k\` such that \`k * k <= n\`.

### Idea

Binary search over the candidate range \`[0, n]\`. At each step we pick the midpoint \`mid\`:
- If \`mid * mid <= n\`, then \`mid\` is a valid candidate — record it as the current best answer and search the right half (\`lo = mid + 1\`) to see if something larger also works.
- Otherwise, \`mid\` is too large — search the left half (\`hi = mid - 1\`).

When the loop ends, \`ans\` holds the largest valid \`k\`.

### Overflow caution

\`n\` can be up to \`2^31 - 1 ≈ 2.1 × 10^9\`, so \`mid * mid\` can reach roughly \`4.6 × 10^18\`, which overflows a 32-bit integer. Use 64-bit integers (\`long long\` in C/Java, Python handles big integers natively, and \`BigInt\` in JavaScript).

### Complexity

- **Time:** O(log n) — binary search halves the search space each iteration.
- **Space:** O(1) — only a handful of variables.`,
};

export default problem;
