import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "combination-sum-count-number-of-ordered-ways-to-sum-to-target-using-given-coins",
  title: "Combination Sum Count",
  difficulty: "medium",
  category: "recursion-dp",
  order: 1151,
  description: `Given an array of **distinct** positive integers \`coins\` and a non-negative integer \`target\`, return the number of **ordered** sequences of elements from \`coins\` (repetition allowed) that sum to exactly \`target\`.

Two sequences are considered different if the order of elements differs — for example \`[1, 2]\` and \`[2, 1]\` are counted as two distinct sequences.

\`\`\`text
Example 1:
Input:  coins = [1, 2], target = 3
Output: 3
Explanation: The 3 ordered sequences are [1,1,1], [1,2], [2,1].
\`\`\`

\`\`\`text
Example 2:
Input:  coins = [1, 2, 3], target = 4
Output: 7
Explanation: [1,1,1,1], [1,1,2], [1,2,1], [2,1,1], [2,2], [1,3], [3,1]
\`\`\`

\`\`\`text
Example 3:
Input:  coins = [2], target = 5
Output: 0
Explanation: 5 is odd; no sequence of even numbers can sum to 5.
\`\`\`

**Constraints:**
- \`1 <= coins.length <= 10\`
- \`1 <= coins[i] <= 20\` (all values are distinct)
- \`0 <= target <= 25\`
- The answer is guaranteed to fit in a signed 32-bit integer.`,
  hints: [
    `Define dp[i] as the number of ordered sequences that sum to i. What is dp[0], and how can you compute dp[i] from smaller subproblems?`,
    `For each sum i, try subtracting every coin c (where c ≤ i): any sequence that sums to (i − c) can be extended by appending c to produce a sequence summing to i.`,
    `The outer loop should iterate over target values (1 to target), and the inner loop over coins — this ordering naturally counts all orderings unlike the unordered combination problem.`,
  ],
  signature: {
    "name": "combinationSumCount",
    "params": [
      {
        "name": "coins",
        "type": "int[]"
      },
      {
        "name": "target",
        "type": "int"
      }
    ],
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        [
          1,
          2
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
          2,
          3
        ],
        4
      ],
      "expected": 7,
      "hidden": false
    },
    {
      "input": [
        [
          2
        ],
        5
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ],
        5
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          4
        ],
        7
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        1
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          3,
          5
        ],
        10
      ],
      "expected": 14,
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
        10
      ],
      "expected": 464,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2
        ],
        0
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          10
        ],
        15
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def combination_sum_count(coins: list, target: int) -> int:
    # TODO: implement using dynamic programming
    return 0
`,
    javascript: `function combinationSumCount(coins, target) {
    // TODO: implement using dynamic programming
    return 0;
}
`,
    java: `class Solution {
    public int combinationSumCount(int[] coins, int target) {
        // TODO: implement using dynamic programming
        return 0;
    }
}
`,
    c: `int combinationSumCount(int* coins, int coinsSize, int target) {
    /* TODO: implement using dynamic programming */
    return 0;
}
`,
  },
  solutions: {
    python: `def combination_sum_count(coins: list, target: int) -> int:
    dp = [0] * (target + 1)
    dp[0] = 1
    for i in range(1, target + 1):
        for coin in coins:
            if coin <= i:
                dp[i] += dp[i - coin]
    return dp[target]
`,
    javascript: `function combinationSumCount(coins, target) {
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= target; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] += dp[i - coin];
            }
        }
    }
    return dp[target];
}
`,
    java: `class Solution {
    public int combinationSumCount(int[] coins, int target) {
        int[] dp = new int[target + 1];
        dp[0] = 1;
        for (int i = 1; i <= target; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] += dp[i - coin];
                }
            }
        }
        return dp[target];
    }
}
`,
    c: `int combinationSumCount(int* coins, int coinsSize, int target) {
    int dp[26];
    int k;
    for (k = 0; k <= target; k++) dp[k] = 0;
    dp[0] = 1;
    for (int i = 1; i <= target; i++) {
        for (int j = 0; j < coinsSize; j++) {
            if (coins[j] <= i) {
                dp[i] += dp[i - coins[j]];
            }
        }
    }
    return dp[target];
}
`,
  },
  editorial: `## Approach: Bottom-Up Dynamic Programming

### Intuition

Define \`dp[i]\` = the number of ordered sequences of coins that sum to exactly \`i\`.

**Base case:** \`dp[0] = 1\` — there is exactly one way to form a sum of 0: the empty sequence.

**Transition:** For every target sum \`i\` (from 1 to \`target\`), iterate over every coin \`c\`. If \`c ≤ i\`, any ordered sequence summing to \`i − c\` can be extended by appending \`c\` to yield a sequence summing to \`i\`. So:

\`\`\`
dp[i] += dp[i - c]  for each coin c where c ≤ i
\`\`\`

### Why the outer loop is over sums (not coins)

In the **unordered** combinations problem, the outer loop is over coins to avoid counting \`[1,2]\` and \`[2,1]\` separately. Here we *want* to count them separately, so we iterate over sums first and coins second — every different last element produces a different counted sequence.

### Example trace — coins = [1, 2], target = 3

| i | coin=1: dp[i-1] | coin=2: dp[i-2] | dp[i] |
|---|-----------------|-----------------|-------|
| 1 | dp[0] = 1       | —               | 1     |
| 2 | dp[1] = 1       | dp[0] = 1       | 2     |
| 3 | dp[2] = 2       | dp[1] = 1       | **3** |

Sequences: \`[1,1,1]\`, \`[1,2]\`, \`[2,1]\` ✓

### Complexity

- **Time:** O(target × |coins|)
- **Space:** O(target) for the \`dp\` array`,
};

export default problem;
