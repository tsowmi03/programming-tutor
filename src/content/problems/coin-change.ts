import type { CodeProblemDef } from "../types";

export const coinChange: CodeProblemDef = {
  type: "code",
  slug: "coin-change",
  title: "Coin Change",
  difficulty: "medium",
  category: "recursion-dp",
  order: 2,
  description: `You are given an array \`coins\` of distinct coin denominations and an integer \`amount\`. Return the **fewest number of coins** needed to make up \`amount\` exactly. If it cannot be made, return \`-1\`. You have unlimited coins of each denomination.

**Example 1**

\`\`\`text
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
\`\`\`

**Example 2**

\`\`\`text
Input: coins = [2], amount = 3
Output: -1
\`\`\`

**Example 3**

\`\`\`text
Input: coins = [1], amount = 0
Output: 0
\`\`\`

**Constraints**

- \`1 <= coins.length <= 12\`
- \`1 <= coins[i] <= 10000\`
- \`0 <= amount <= 10000\`

**Note:** the greedy strategy of always taking the largest coin fails — try \`coins = [1,3,4], amount = 6\`.
`,
  hints: [
    `Greedy fails: with coins [1,3,4] and amount 6, largest-first gives 4+1+1 (3 coins) but 3+3 (2 coins) is better.`,
    `Define best(a) = fewest coins for amount a. The *last* coin used was some c, so best(a) = 1 + min over coins c of best(a - c).`,
    `Build a table from 0 up to amount (best(0) = 0, everything else starts “impossible”). For each amount, try every coin. Answer is best(amount), or -1 if still impossible.`,
  ],
  signature: {
    "name": "coinChange",
    "params": [
      {
        "name": "coins",
        "type": "int[]"
      },
      {
        "name": "amount",
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
          2,
          5
        ],
        11
      ],
      "expected": 3
    },
    {
      "input": [
        [
          2
        ],
        3
      ],
      "expected": -1
    },
    {
      "input": [
        [
          1
        ],
        0
      ],
      "expected": 0
    },
    {
      "input": [
        [
          1,
          3,
          4
        ],
        6
      ],
      "expected": 2
    },
    {
      "input": [
        [
          2,
          5,
          10,
          1
        ],
        27
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          186,
          419,
          83,
          408
        ],
        6249
      ],
      "expected": 20,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          7
        ],
        1
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          7
        ],
        14
      ],
      "expected": 2,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def coin_change(coins, amount):
    """Return the fewest coins needed for amount, or -1."""
    # Your code here
    pass
`,
    javascript: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number} fewest coins, or -1
 */
function coinChange(coins, amount) {
  // Your code here
}
`,
    typescript: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number} fewest coins, or -1
 */
function coinChange(coins: number[], amount: number): number {
  // Your code here
  return -1;
}`,
    java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        // Your code here
        return -1;
    }
}
`,
    csharp: `public class Solution {
    public int CoinChange(int[] coins, int amount) {
        // Your code here
        return -1;
    }
}`,
    c: `int coinChange(int* coins, int coinsSize, int amount) {
    // Your code here
    return -1;
}
`,
    cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        // Your code here
        return -1;
    }
};`,
  },
  solutions: {
    python: `def coin_change(coins, amount):
    IMPOSSIBLE = amount + 1  # sentinel larger than any real answer
    best = [IMPOSSIBLE] * (amount + 1)
    best[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a and best[a - c] + 1 < best[a]:
                best[a] = best[a - c] + 1
    return best[amount] if best[amount] != IMPOSSIBLE else -1
`,
    javascript: `function coinChange(coins, amount) {
  const IMPOSSIBLE = amount + 1; // sentinel larger than any real answer
  const best = new Array(amount + 1).fill(IMPOSSIBLE);
  best[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (c <= a && best[a - c] + 1 < best[a]) {
        best[a] = best[a - c] + 1;
      }
    }
  }
  return best[amount] === IMPOSSIBLE ? -1 : best[amount];
}
`,
    typescript: `function coinChange(coins: number[], amount: number): number {
  const IMPOSSIBLE = amount + 1; // sentinel larger than any real answer
  const best = new Array(amount + 1).fill(IMPOSSIBLE);
  best[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (c <= a && best[a - c] + 1 < best[a]) {
        best[a] = best[a - c] + 1;
      }
    }
  }
  return best[amount] === IMPOSSIBLE ? -1 : best[amount];
}`,
    java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int impossible = amount + 1; // sentinel larger than any real answer
        int[] best = new int[amount + 1];
        Arrays.fill(best, impossible);
        best[0] = 0;
        for (int a = 1; a <= amount; a++) {
            for (int c : coins) {
                if (c <= a && best[a - c] + 1 < best[a]) {
                    best[a] = best[a - c] + 1;
                }
            }
        }
        return best[amount] == impossible ? -1 : best[amount];
    }
}
`,
    csharp: `public class Solution {
    public int CoinChange(int[] coins, int amount) {
        int impossible = amount + 1; // sentinel larger than any real answer
        int[] best = new int[amount + 1];
        for (int i = 0; i <= amount; i++) best[i] = impossible;
        best[0] = 0;
        for (int a = 1; a <= amount; a++) {
            foreach (int c in coins) {
                if (c <= a && best[a - c] + 1 < best[a]) {
                    best[a] = best[a - c] + 1;
                }
            }
        }
        return best[amount] == impossible ? -1 : best[amount];
    }
}`,
    c: `int coinChange(int* coins, int coinsSize, int amount) {
    int impossible = amount + 1; /* sentinel larger than any real answer */
    int* best = malloc((amount + 1) * sizeof(int));
    for (int a = 0; a <= amount; a++) best[a] = impossible;
    best[0] = 0;
    for (int a = 1; a <= amount; a++) {
        for (int i = 0; i < coinsSize; i++) {
            int c = coins[i];
            if (c <= a && best[a - c] + 1 < best[a]) {
                best[a] = best[a - c] + 1;
            }
        }
    }
    int answer = best[amount] == impossible ? -1 : best[amount];
    free(best);
    return answer;
}
`,
    cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        int impossible = amount + 1; // sentinel larger than any real answer
        vector<int> best(amount + 1, impossible);
        best[0] = 0;
        for (int a = 1; a <= amount; a++) {
            for (int c : coins) {
                if (c <= a && best[a - c] + 1 < best[a]) {
                    best[a] = best[a - c] + 1;
                }
            }
        }
        return best[amount] == impossible ? -1 : best[amount];
    }
};`,
  },
  editorial: `## Approach: bottom-up dynamic programming

**Why greedy fails:** with \`coins = [1,3,4]\` and \`amount = 6\`, taking
the biggest coin first yields 4+1+1 = 3 coins, but 3+3 = 2 coins is
optimal. Locally best choices don't compose into a global optimum here, so
we need to consider all options — efficiently.

**The subproblem:** let \`best[a]\` = fewest coins to make amount \`a\`.
Whatever the optimal solution's *last* coin \`c\` was, removing it leaves an
optimal solution for \`a - c\` (if a cheaper one existed, swapping it in
would improve the original — the *optimal substructure* argument). So:

\`\`\`text
best[a] = 1 + min(best[a - c]  for every coin c <= a)
best[0] = 0
\`\`\`

Fill the table from \`0\` to \`amount\`; every \`best[a - c]\` you need is
already final. Using \`amount + 1\` as an "impossible" sentinel avoids
special-casing unreachable amounts — it can never win a \`min\`, and if it
survives to the end, the answer is \`-1\`.

**Complexity:** O(amount × number of coins) time, O(amount) space.

Compare this with Climbing Stairs: same skeleton (table + recurrence over
"last move"), but here each cell takes a \`min\` over choices instead of a
sum — the step from *counting* DP to *optimisation* DP.
`,
};
