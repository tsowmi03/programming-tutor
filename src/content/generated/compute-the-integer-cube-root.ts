import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "compute-the-integer-cube-root",
  title: "Integer Cube Root",
  difficulty: "medium",
  category: "binary-search",
  order: 1028,
  description: `Given a non-negative integer \`n\`, return the **integer cube root** of \`n\`.

The integer cube root is the largest integer \`k\` such that \`k * k * k <= n\`.

You **must** use a binary search approach and must **not** use any built-in exponentiation or cube-root library functions.

\`\`\`text
Example 1:
Input:  n = 27
Output: 3
Explanation: 3^3 = 27 = 27, so the integer cube root is 3.
\`\`\`

\`\`\`text
Example 2:
Input:  n = 20
Output: 2
Explanation: 2^3 = 8 <= 20, but 3^3 = 27 > 20, so the integer cube root is 2.
\`\`\`

\`\`\`text
Example 3:
Input:  n = 0
Output: 0
Explanation: 0^3 = 0 <= 0, so the integer cube root is 0.
\`\`\`

**Constraints:**
- \`0 <= n <= 2^31 - 1\``,
  hints: [
    `Think about what range of values the answer could fall in. What is the maximum possible cube root for n up to 2^31 - 1?`,
    `Binary search on the candidate answer k. At each step, compare k*k*k with n — but be careful about integer overflow when computing k*k*k for large k.`,
    `When k*k*k == n you have an exact answer; when it's less than n, record k as a candidate and search higher; when it's greater, search lower.`,
  ],
  guidance: [
    {
      "title": "Bound Your Search Space",
      "body": "The cube root of any number up to 2^31 - 1 is at most 1290 (since 1290^3 ≈ 2.15×10^9 < 2^31 - 1 and 1291^3 > 2^31 - 1). So your binary search range is `[0, 1290]`.",
      "level": "nudge"
    },
    {
      "title": "Binary Search Template",
      "body": "Maintain `lo = 0`, `hi = 1290`. In each iteration, compute `mid = (lo + hi) / 2` and compare `mid^3` to `n`:\n- If `mid^3 == n`, return `mid`.\n- If `mid^3 < n`, the answer is at least `mid`; set `lo = mid + 1` (and track `mid` as a candidate).\n- If `mid^3 > n`, the answer is below `mid`; set `hi = mid - 1`.\nReturn your best candidate when the loop ends.",
      "level": "strategy"
    },
    {
      "title": "Overflow Pitfall",
      "body": "When computing `mid * mid * mid` in languages with 32-bit integers (C, Java, C#), the product can exceed 2^31 - 1 even though mid ≤ 1290 (1290^3 ≈ 2.15×10^9 fits in a 32-bit signed int, but intermediate products might not if you're not careful). Use a 64-bit integer (`long` in Java/C#, `long long` in C/C++) for the cube computation.",
      "level": "pitfall"
    },
    {
      "title": "Implementation Shape",
      "body": "```\nfunction integerCubeRoot(n):\n    lo = 0, hi = 1290, result = 0\n    while lo <= hi:\n        mid = (lo + hi) / 2\n        cube = (long) mid * mid * mid\n        if cube == n:\n            return mid\n        else if cube < n:\n            result = mid\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return result\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "integerCubeRoot",
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
        27
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        20
      ],
      "expected": 2,
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
        8
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        2147483647
      ],
      "expected": 1290,
      "hidden": true
    },
    {
      "input": [
        1000000000
      ],
      "expected": 1000,
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
        125
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        728
      ],
      "expected": 8,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def integer_cube_root(n: int) -> int:
    # TODO: implement using binary search
    pass
`,
    javascript: `/**
 * @param {number} n
 * @return {number}
 */
function integerCubeRoot(n) {
    // TODO: implement using binary search
}
`,
    typescript: `function integerCubeRoot(n: number): number {
    // TODO: implement using binary search
    return 0;
}
`,
    java: `class Solution {
    public int integerCubeRoot(int n) {
        // TODO: implement using binary search
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int IntegerCubeRoot(int n) {
        // TODO: implement using binary search
        return 0;
    }
}
`,
    c: `int integerCubeRoot(int n) {
    // TODO: implement using binary search
    return 0;
}
`,
    cpp: `class Solution {
public:
    int integerCubeRoot(int n) {
        // TODO: implement using binary search
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def integer_cube_root(n: int) -> int:
    lo, hi, result = 0, 1290, 0
    while lo <= hi:
        mid = (lo + hi) // 2
        cube = mid * mid * mid
        if cube == n:
            return mid
        elif cube < n:
            result = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return result
`,
    javascript: `/**
 * @param {number} n
 * @return {number}
 */
function integerCubeRoot(n) {
    let lo = 0, hi = 1290, result = 0;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        const cube = mid * mid * mid;
        if (cube === n) return mid;
        else if (cube < n) {
            result = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return result;
}
`,
    typescript: `function integerCubeRoot(n: number): number {
    let lo = 0, hi = 1290, result = 0;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        const cube = mid * mid * mid;
        if (cube === n) return mid;
        else if (cube < n) {
            result = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return result;
}
`,
    java: `class Solution {
    public int integerCubeRoot(int n) {
        int lo = 0, hi = 1290, result = 0;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            long cube = (long) mid * mid * mid;
            if (cube == n) return mid;
            else if (cube < n) {
                result = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return result;
    }
}
`,
    csharp: `public class Solution {
    public int IntegerCubeRoot(int n) {
        int lo = 0, hi = 1290, result = 0;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            long cube = (long)mid * mid * mid;
            if (cube == n) return mid;
            else if (cube < n) {
                result = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return result;
    }
}
`,
    c: `int integerCubeRoot(int n) {
    int lo = 0, hi = 1290, result = 0;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        long long cube = (long long)mid * mid * mid;
        if (cube == n) return mid;
        else if (cube < n) {
            result = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return result;
}
`,
    cpp: `class Solution {
public:
    int integerCubeRoot(int n) {
        int lo = 0, hi = 1290, result = 0;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            long long cube = (long long)mid * mid * mid;
            if (cube == n) return mid;
            else if (cube < n) {
                result = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return result;
    }
};
`,
  },
  editorial: `## Approach: Binary Search on the Answer

### Key Insight

We want the largest integer \`k\` such that \`k³ ≤ n\`. Since \`k\` is bounded (the cube root of \`2^31 - 1 ≈ 2.15×10^9\` is about \`1290\`), we can binary search over the range \`[0, 1290]\`.

### Algorithm

1. Set \`lo = 0\`, \`hi = 1290\`, \`result = 0\`.
2. While \`lo <= hi\`:
   - Compute \`mid = (lo + hi) / 2\`.
   - Compute \`cube = mid³\` (using 64-bit arithmetic to avoid overflow).
   - If \`cube == n\`: return \`mid\` immediately.
   - If \`cube < n\`: \`mid\` is a valid candidate; save it as \`result\` and search higher (\`lo = mid + 1\`).
   - If \`cube > n\`: search lower (\`hi = mid - 1\`).
3. Return \`result\`.

### Overflow Note

Even though \`mid ≤ 1290\`, the cube \`1290³ = 2,146,689,000\` fits in a 32-bit signed int (max ≈ 2.147×10^9), but it's very close to the boundary. Using a 64-bit integer for the cube computation is the safe and correct approach.

### Complexity

- **Time:** O(log 1290) = O(1) — effectively constant since the search space is fixed.
- **Space:** O(1).`,
};

export default problem;
