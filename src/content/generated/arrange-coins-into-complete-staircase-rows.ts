import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "arrange-coins-into-complete-staircase-rows",
  title: "Arrange Coins into Staircase Rows",
  difficulty: "easy",
  category: "binary-search",
  order: 1025,
  description: `You have \`n\` coins and want to build a staircase. The staircase consists of \`k\` complete rows where row \`i\` contains exactly \`i\` coins.

Given \`n\`, return the number of **complete** rows of the staircase you will build.

\`\`\`text
Example 1:
Input:  n = 5
Output: 2
Explanation:
  Row 1: 1 coin  ✓
  Row 2: 2 coins ✓
  Row 3: 3 coins needed, only 2 left → incomplete
  Answer: 2 complete rows
\`\`\`

\`\`\`text
Example 2:
Input:  n = 8
Output: 3
Explanation:
  Row 1: 1 coin  ✓
  Row 2: 2 coins ✓
  Row 3: 3 coins ✓
  Row 4: 4 coins needed, only 2 left → incomplete
  Answer: 3 complete rows
\`\`\`

\`\`\`text
Example 3:
Input:  n = 1
Output: 1
\`\`\`

**Constraints:**
- \`1 <= n <= 2^31 - 1\``,
  hints: [
    `The total coins needed for k complete rows is k*(k+1)/2. Can you binary search on k?`,
    `Search in the range [1, n]. For a given mid, check if mid*(mid+1)/2 <= n.`,
  ],
  guidance: [
    {
      "title": "Think about what you're searching for",
      "body": "You want the largest `k` such that `1 + 2 + ... + k = k*(k+1)/2 <= n`. This is a classic 'find the largest value satisfying a condition' pattern.",
      "level": "nudge"
    },
    {
      "title": "Binary search range",
      "body": "The answer lies between `1` and `n` (since you can have at most `n` rows if you only had 1 coin each). Use binary search over this range to find the largest valid `k`.",
      "level": "strategy"
    },
    {
      "title": "Overflow caution",
      "body": "When computing `mid * (mid + 1) / 2`, note that `mid` can be up to ~2 billion. In C, Java, and C# use `long`/`int64` for the multiplication before dividing. In Python integers are unbounded so no issue.",
      "level": "pitfall"
    },
    {
      "title": "Binary search shape",
      "body": "```\nlo = 1, hi = n\nwhile lo <= hi:\n    mid = (lo + hi) / 2\n    coins = mid * (mid + 1) / 2\n    if coins == n: return mid\n    elif coins < n: lo = mid + 1\n    else: hi = mid - 1\nreturn hi\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "arrangeCoins",
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
        5
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        8
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        1
      ],
      "expected": 1,
      "hidden": false
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
        3
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        6
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        10
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        2147483647
      ],
      "expected": 65535,
      "hidden": true
    },
    {
      "input": [
        1000000000
      ],
      "expected": 44720,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def arrange_coins(n: int) -> int:
    # TODO: implement using binary search
    pass
`,
    javascript: `/**
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function(n) {
    // TODO: implement using binary search
};
`,
    typescript: `function arrangeCoins(n: number): number {
    // TODO: implement using binary search
    return 0;
}
`,
    java: `class Solution {
    public int arrangeCoins(int n) {
        // TODO: implement using binary search
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int ArrangeCoins(int n) {
        // TODO: implement using binary search
        return 0;
    }
}
`,
    c: `int arrangeCoins(int n) {
    // TODO: implement using binary search
    return 0;
}
`,
    cpp: `class Solution {
public:
    int arrangeCoins(int n) {
        // TODO: implement using binary search
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def arrange_coins(n: int) -> int:
    lo, hi = 1, n
    while lo <= hi:
        mid = (lo + hi) // 2
        coins = mid * (mid + 1) // 2
        if coins == n:
            return mid
        elif coins < n:
            lo = mid + 1
        else:
            hi = mid - 1
    return hi
`,
    javascript: `/**
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function(n) {
    let lo = 1, hi = n;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        const coins = mid * (mid + 1) / 2;
        if (coins === n) return mid;
        else if (coins < n) lo = mid + 1;
        else hi = mid - 1;
    }
    return hi;
};
`,
    typescript: `function arrangeCoins(n: number): number {
    let lo = 1, hi = n;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        const coins = mid * (mid + 1) / 2;
        if (coins === n) return mid;
        else if (coins < n) lo = mid + 1;
        else hi = mid - 1;
    }
    return hi;
}
`,
    java: `class Solution {
    public int arrangeCoins(int n) {
        long lo = 1, hi = n;
        while (lo <= hi) {
            long mid = (lo + hi) / 2;
            long coins = mid * (mid + 1) / 2;
            if (coins == n) return (int) mid;
            else if (coins < n) lo = mid + 1;
            else hi = mid - 1;
        }
        return (int) hi;
    }
}
`,
    csharp: `public class Solution {
    public int ArrangeCoins(int n) {
        long lo = 1, hi = n;
        while (lo <= hi) {
            long mid = (lo + hi) / 2;
            long coins = mid * (mid + 1) / 2;
            if (coins == n) return (int) mid;
            else if (coins < n) lo = mid + 1;
            else hi = mid - 1;
        }
        return (int) hi;
    }
}
`,
    c: `int arrangeCoins(int n) {
    long long lo = 1, hi = n;
    while (lo <= hi) {
        long long mid = (lo + hi) / 2;
        long long coins = mid * (mid + 1) / 2;
        if (coins == n) return (int) mid;
        else if (coins < n) lo = mid + 1;
        else hi = mid - 1;
    }
    return (int) hi;
}
`,
    cpp: `class Solution {
public:
    int arrangeCoins(int n) {
        long long lo = 1, hi = n;
        while (lo <= hi) {
            long long mid = (lo + hi) / 2;
            long long coins = mid * (mid + 1) / 2;
            if (coins == n) return (int) mid;
            else if (coins < n) lo = mid + 1;
            else hi = mid - 1;
        }
        return (int) hi;
    }
};
`,
  },
  editorial: `## Approach: Binary Search on the Number of Complete Rows

### Key Insight

For \`k\` complete rows, the total coins required is the triangular number \`k*(k+1)/2\`. We want the **largest** \`k\` such that \`k*(k+1)/2 <= n\`.

Instead of iterating from 1 to n, we binary search over possible values of \`k\`.

### Algorithm

1. Set \`lo = 1\`, \`hi = n\`.
2. Compute \`mid = (lo + hi) / 2\` and check \`mid*(mid+1)/2\` against \`n\`.
   - If equal to \`n\`: return \`mid\` immediately.
   - If less than \`n\`: the answer might be larger, so \`lo = mid + 1\`.
   - If greater than \`n\`: the answer must be smaller, so \`hi = mid - 1\`.
3. When the loop ends, \`hi\` holds the largest valid \`k\`.

### Overflow Handling

\`mid\` can be up to ~2 × 10⁹, so \`mid*(mid+1)\` can overflow a 32-bit integer. Use 64-bit integers (\`long long\` in C/C++, \`long\` in Java/C#) for the multiplication.

### Verification of key test cases

- \`n = 2147483647\`: \`65535*65536/2 = 2,147,450,880 ≤ 2,147,483,647\` ✓ and \`65536*65537/2 = 2,147,516,416 > 2,147,483,647\` ✓ → answer **65535**
- \`n = 1000000000\`: \`44720*44721/2 = 999,970,680 ≤ 1,000,000,000\` ✓ and \`44721*44722/2 = 1,000,015,281 > 1,000,000,000\` ✓ → answer **44720**

### Complexity

- **Time:** O(log n) — at most ~31 iterations for n up to 2³¹ − 1.
- **Space:** O(1).`,
};

export default problem;
