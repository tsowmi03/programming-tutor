import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "best-time-to-buy-and-sell-stock-single-transaction",
  title: "Best Time to Buy and Sell Stock",
  difficulty: "easy",
  category: "sliding-window",
  order: 1097,
  description: `You are given an array \`prices\` where \`prices[i]\` is the price of a stock on day \`i\`.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the **maximum profit** you can achieve from this transaction. If no profit is possible, return \`0\`.

\`\`\`text
Example 1:
Input:  prices = [7, 1, 5, 3, 6, 4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.
\`\`\`

\`\`\`text
Example 2:
Input:  prices = [7, 6, 4, 3, 1]
Output: 0
Explanation: Prices only decrease, so no transaction yields a profit.
\`\`\`

**Constraints:**
- \`1 <= prices.length <= 100,000\`
- \`0 <= prices[i] <= 10,000\``,
  hints: [
    `Try keeping track of the minimum price seen so far as you scan left to right.`,
    `At each day, the best profit you could make by selling that day is the current price minus the minimum price seen so far.`,
    `Keep a running maximum of those per-day profits — that's your answer.`,
  ],
  signature: {
    "name": "maxProfit",
    "params": [
      {
        "name": "prices",
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
          7,
          1,
          5,
          3,
          6,
          4
        ]
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        [
          7,
          6,
          4,
          3,
          1
        ]
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [
          2,
          4,
          1
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          5,
          5,
          5
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          1
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          10,
          2,
          8,
          1,
          9
        ]
      ],
      "expected": 8,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          10000
        ]
      ],
      "expected": 10000,
      "hidden": true
    },
    {
      "input": [
        [
          10000,
          0
        ]
      ],
      "expected": 0,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def max_profit(prices: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function maxProfit(prices) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function maxProfit(prices: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int maxProfit(int[] prices) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int MaxProfit(int[] prices) {
        // TODO: implement
        return 0;
    }
}`,
    c: `int maxProfit(int* prices, int pricesSize) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // TODO: implement
        return 0;
    }
};`,
  },
  solutions: {
    python: `def max_profit(prices: list[int]) -> int:
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        if price < min_price:
            min_price = price
        elif price - min_price > max_profit:
            max_profit = price - min_price
    return max_profit
`,
    javascript: `function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfitVal = 0;
    for (const price of prices) {
        if (price < minPrice) {
            minPrice = price;
        } else if (price - minPrice > maxProfitVal) {
            maxProfitVal = price - minPrice;
        }
    }
    return maxProfitVal;
}
`,
    typescript: `function maxProfit(prices: number[]): number {
    let minPrice = Infinity;
    let maxProfitVal = 0;
    for (const price of prices) {
        if (price < minPrice) {
            minPrice = price;
        } else if (price - minPrice > maxProfitVal) {
            maxProfitVal = price - minPrice;
        }
    }
    return maxProfitVal;
}`,
    java: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
}
`,
    csharp: `public class Solution {
    public int MaxProfit(int[] prices) {
        int minPrice = int.MaxValue;
        int maxProfit = 0;
        foreach (int price in prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
}`,
    c: `int maxProfit(int* prices, int pricesSize) {
    int minPrice = prices[0];
    int maxProfitVal = 0;
    for (int i = 1; i < pricesSize; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else if (prices[i] - minPrice > maxProfitVal) {
            maxProfitVal = prices[i] - minPrice;
        }
    }
    return maxProfitVal;
}
`,
    cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX;
        int maxProfitVal = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfitVal) {
                maxProfitVal = price - minPrice;
            }
        }
        return maxProfitVal;
    }
};`,
  },
  editorial: `## Approach: Single Pass (Sliding Window / Greedy)

### Intuition

As we scan through prices from left to right, the best we can do on any given selling day is to have bought at the **lowest price seen so far**. We keep track of that minimum and update our best profit at each step.

### Algorithm

1. Initialize \`minPrice = ∞\` and \`maxProfit = 0\`.
2. For each \`price\` in \`prices\`:
   - If \`price < minPrice\`, update \`minPrice = price\` (found a cheaper buy day).
   - Else compute \`profit = price - minPrice\`; if it exceeds \`maxProfit\`, update \`maxProfit\`.
3. Return \`maxProfit\`.

This is conceptually a **sliding window** where the left pointer is the cheapest buy day discovered so far and the right pointer advances each iteration.

### Complexity

- **Time:** O(n) — single pass through the array.
- **Space:** O(1) — only two scalar variables.

### Example Walkthrough

\`\`\`
prices = [7, 1, 5, 3, 6, 4]

day 0: price=7, minPrice=7, maxProfit=0
day 1: price=1, minPrice=1, maxProfit=0
day 2: price=5, profit=4, maxProfit=4
day 3: price=3, profit=2, maxProfit=4
day 4: price=6, profit=5, maxProfit=5
day 5: price=4, profit=3, maxProfit=5

Answer: 5
\`\`\``,
};

export default problem;
