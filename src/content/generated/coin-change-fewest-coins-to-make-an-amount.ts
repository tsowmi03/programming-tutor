import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "coin-change-fewest-coins-to-make-an-amount",
  title: "Fewest Coins to Make Change",
  difficulty: "medium",
  category: "recursion-dp",
  order: 1144,
  description: `Given an array of distinct coin denominations \`coins\` and a target integer \`amount\`, return the **fewest number of coins** needed to make up exactly \`amount\`. If it is impossible to make \`amount\` with the given coins, return \`-1\`.

You may use each coin denomination an **unlimited** number of times.

\`\`\`text
Example 1:
Input:  coins = [1, 5, 10, 25], amount = 36
Output: 3
Explanation: 25 + 10 + 1 = 36  (3 coins)
\`\`\`

\`\`\`text
Example 2:
Input:  coins = [2], amount = 3
Output: -1
Explanation: No combination of 2-cent coins can sum to 3.
\`\`\`

\`\`\`text
Example 3:
Input:  coins = [1, 2, 5], amount = 11
Output: 3
Explanation: 5 + 5 + 1 = 11  (3 coins)
\`\`\`

**Constraints:**
- \`1 <= coins.length <= 12\`
- \`1 <= coins[i] <= 1000\`
- All values in \`coins\` are distinct.
- \`0 <= amount <= 10000\``,
  hints: [
    `Think about subproblems: if you knew the fewest coins to make \`amount - coin\` for each coin denomination, how would you compute the answer for \`amount\`?`,
    `Define \`dp[i]\` as the fewest coins needed to make amount \`i\`. The base case is \`dp[0] = 0\`. For each amount from 1 to \`amount\`, try every coin and take the minimum.`,
    `Initialize \`dp[i]\` with a sentinel value like \`amount + 1\` (representing infinity) for amounts you haven't solved yet. After filling the table, if \`dp[amount]\` is still the sentinel, return -1.`,
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
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          1,
          5,
          10,
          25
        ],
        36
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          5
        ],
        11
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          2
        ],
        3
      ],
      "expected": -1,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ],
        0
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1
        ],
        10000
      ],
      "expected": 10000,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          10,
          25
        ],
        7
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          7,
          405,
          436
        ],
        8729
      ],
      "expected": 22,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          5,
          10,
          1
        ],
        100
      ],
      "expected": 10,
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
          1,
          5,
          10,
          25
        ],
        0
      ],
      "expected": 0,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def coin_change(coins: list[int], amount: int) -> int:
    # TODO: implement bottom-up DP
    return -1
`,
    javascript: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
    // TODO: implement bottom-up DP
    return -1;
}
`,
    typescript: `function coinChange(coins: number[], amount: number): number {
    // TODO: implement bottom-up DP
    return -1;
}`,
    java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        // TODO: implement bottom-up DP
        return -1;
    }
}
`,
    csharp: `public class Solution {
    public int CoinChange(int[] coins, int amount) {
        // TODO: implement bottom-up DP
        return -1;
    }
}`,
    c: `int coinChange(int* coins, int coinsSize, int amount) {
    // TODO: implement bottom-up DP
    return -1;
}
`,
    cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        // TODO: implement bottom-up DP
        return -1;
    }
};`,
  },
  solutions: {
    python: `def coin_change(coins: list[int], amount: int) -> int:
    INF = amount + 1
    dp = [INF] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] < INF else -1
`,
    javascript: `function coinChange(coins, amount) {
    const INF = amount + 1;
    const dp = new Array(amount + 1).fill(INF);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] < INF ? dp[amount] : -1;
}
`,
    typescript: `function coinChange(coins: number[], amount: number): number {
    const INF = amount + 1;
    const dp = new Array(amount + 1).fill(INF);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] < INF ? dp[amount] : -1;
}`,
    java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int INF = amount + 1;
        int[] dp = new int[amount + 1];
        java.util.Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] < INF ? dp[amount] : -1;
    }
}
`,
    csharp: `public class Solution {
    public int CoinChange(int[] coins, int amount) {
        int INF = amount + 1;
        int[] dp = new int[amount + 1];
        for (int i = 0; i <= amount; i++) dp[i] = INF;
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            foreach (int coin in coins) {
                if (coin <= i) {
                    dp[i] = System.Math.Min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] < INF ? dp[amount] : -1;
    }
}`,
    c: `#include <stdlib.h>

int coinChange(int* coins, int coinsSize, int amount) {
    if (amount == 0) return 0;
    int INF = amount + 1;
    int* dp = (int*)malloc((amount + 1) * sizeof(int));
    for (int i = 0; i <= amount; i++) dp[i] = INF;
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < coinsSize; j++) {
            if (coins[j] <= i) {
                int candidate = dp[i - coins[j]] + 1;
                if (candidate < dp[i]) dp[i] = candidate;
            }
        }
    }
    int result = dp[amount] < INF ? dp[amount] : -1;
    free(dp);
    return result;
}
`,
    cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        int INF = amount + 1;
        vector<int> dp(amount + 1, INF);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] < INF ? dp[amount] : -1;
    }
};`,
  },
  editorial: `## Approach: Bottom-Up Dynamic Programming

### Intuition

Define \`dp[i]\` as the minimum number of coins needed to make amount \`i\`. The recurrence is:

\`\`\`
dp[i] = min(dp[i - coin] + 1)  for each coin in coins where coin <= i
\`\`\`

Base case: \`dp[0] = 0\` (zero coins needed to make amount 0).

All other entries are initialized to a sentinel value (\`amount + 1\`) representing "impossible".

After filling the table, if \`dp[amount]\` is still the sentinel, no combination exists, so return \`-1\`.

### Algorithm

1. Create array \`dp\` of size \`amount + 1\`, fill with \`INF = amount + 1\`.
2. Set \`dp[0] = 0\`.
3. For each amount \`i\` from \`1\` to \`amount\`:
   - For each \`coin\` in \`coins\`:
     - If \`coin <= i\`, update \`dp[i] = min(dp[i], dp[i - coin] + 1)\`.
4. Return \`dp[amount]\` if it is less than \`INF\`, else \`-1\`.

### Complexity

- **Time:** O(amount × n) where n = number of coin denominations.
- **Space:** O(amount) for the DP table.`,
};

export default problem;
