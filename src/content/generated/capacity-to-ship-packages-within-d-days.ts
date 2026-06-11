import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "capacity-to-ship-packages-within-d-days",
  title: "Capacity to Ship Packages Within D Days",
  difficulty: "medium",
  category: "binary-search",
  order: 1094,
  description: `A conveyor belt has packages that must all be shipped from one port to another within \`days\` days.

The \`i\`-th package on the conveyor belt has a weight of \`weights[i]\`. Each day, we load the ship with packages in the order they appear on the conveyor belt. We may not split a package across days, and the ship must carry packages in the given order (no reordering).

Return the **minimum weight capacity** of the ship that allows all packages to be shipped within \`days\` days.

\`\`\`text
Example 1:
Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15
Explanation: A capacity of 15 is the minimum that allows delivery in 5 days:
  Day 1: 1, 2, 3, 4, 5
  Day 2: 6, 7
  Day 3: 8
  Day 4: 9
  Day 5: 10
\`\`\`

\`\`\`text
Example 2:
Input: weights = [3,2,2,4,1,4], days = 3
Output: 6
Explanation:
  Day 1: 3, 2
  Day 2: 2, 4
  Day 3: 1, 4
\`\`\`

\`\`\`text
Example 3:
Input: weights = [1,2,3,1,1], days = 4
Output: 3
\`\`\`

**Constraints:**
- \`1 <= days <= weights.length <= 500\`
- \`1 <= weights[i] <= 500\``,
  hints: [
    `The answer lies between the maximum single package weight (lower bound) and the sum of all weights (upper bound). Why?`,
    `For a given capacity, can you check in O(n) whether all packages can be shipped within \`days\` days?`,
    `Use binary search over the possible capacity values and apply the feasibility check at each midpoint.`,
    `In the feasibility check, greedily load as many packages as possible each day without exceeding the current capacity candidate.`,
  ],
  signature: {
    "name": "shipWithinDays",
    "params": [
      {
        "name": "weights",
        "type": "int[]"
      },
      {
        "name": "days",
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
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10
        ],
        5
      ],
      "expected": 15,
      "hidden": false
    },
    {
      "input": [
        [
          3,
          2,
          2,
          4,
          1,
          4
        ],
        3
      ],
      "expected": 6,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3,
          1,
          1
        ],
        4
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ],
        1
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          5,
          5,
          5,
          5
        ],
        5
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          5,
          5,
          5,
          5
        ],
        1
      ],
      "expected": 25,
      "hidden": true
    },
    {
      "input": [
        [
          10,
          10,
          10,
          10
        ],
        2
      ],
      "expected": 20,
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
        1
      ],
      "expected": 15,
      "hidden": true
    },
    {
      "input": [
        [
          4,
          1,
          4,
          1,
          4,
          1
        ],
        3
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          500,
          500,
          500,
          500,
          500,
          500,
          500,
          500,
          500,
          500
        ],
        10
      ],
      "expected": 500,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def ship_within_days(weights: list[int], days: int) -> int:
    # TODO: implement using binary search
    pass
`,
    javascript: `/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function(weights, days) {
    // TODO: implement using binary search
};
`,
    java: `class Solution {
    public int shipWithinDays(int[] weights, int days) {
        // TODO: implement using binary search
        return 0;
    }
}
`,
    c: `int shipWithinDays(int* weights, int weightsSize, int days) {
    // TODO: implement using binary search
    return 0;
}
`,
  },
  solutions: {
    python: `def ship_within_days(weights: list[int], days: int) -> int:
    def can_ship(capacity):
        day_count = 1
        current_load = 0
        for w in weights:
            if current_load + w > capacity:
                day_count += 1
                current_load = 0
            current_load += w
        return day_count <= days

    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_ship(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
`,
    javascript: `var shipWithinDays = function(weights, days) {
    function canShip(capacity) {
        let dayCount = 1, currentLoad = 0;
        for (const w of weights) {
            if (currentLoad + w > capacity) {
                dayCount++;
                currentLoad = 0;
            }
            currentLoad += w;
        }
        return dayCount <= days;
    }

    let lo = Math.max(...weights);
    let hi = weights.reduce((a, b) => a + b, 0);
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (canShip(mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
};
`,
    java: `class Solution {
    public int shipWithinDays(int[] weights, int days) {
        int lo = 0, hi = 0;
        for (int w : weights) {
            lo = Math.max(lo, w);
            hi += w;
        }
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (canShip(weights, days, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private boolean canShip(int[] weights, int days, int capacity) {
        int dayCount = 1, currentLoad = 0;
        for (int w : weights) {
            if (currentLoad + w > capacity) {
                dayCount++;
                currentLoad = 0;
            }
            currentLoad += w;
        }
        return dayCount <= days;
    }
}
`,
    c: `static int canShip(int* weights, int weightsSize, int days, int capacity) {
    int dayCount = 1, currentLoad = 0;
    for (int i = 0; i < weightsSize; i++) {
        if (currentLoad + weights[i] > capacity) {
            dayCount++;
            currentLoad = 0;
        }
        currentLoad += weights[i];
    }
    return dayCount <= days;
}

int shipWithinDays(int* weights, int weightsSize, int days) {
    int lo = 0, hi = 0;
    for (int i = 0; i < weightsSize; i++) {
        if (weights[i] > lo) lo = weights[i];
        hi += weights[i];
    }
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (canShip(weights, weightsSize, days, mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
`,
  },
  editorial: `## Approach: Binary Search on the Answer

### Key Insight

The minimum feasible ship capacity must be at least \`max(weights)\` (we must be able to carry the heaviest single package) and at most \`sum(weights)\` (we can always ship everything in one day). The answer lies somewhere in this range, and the feasibility function is **monotone**: if capacity \`C\` works, then any capacity \`> C\` also works. This is the hallmark of a binary-search-on-answer problem.

### Algorithm

1. Set \`lo = max(weights)\`, \`hi = sum(weights)\`.
2. Binary search: compute \`mid = (lo + hi) / 2\`.
3. **Feasibility check** for capacity \`mid\`: greedily load packages onto the ship each day. If adding the next package would exceed \`mid\`, start a new day. Count total days needed.
4. If days needed \`<= days\`, the capacity is sufficient → search lower half (\`hi = mid\`).
5. Otherwise search upper half (\`lo = mid + 1\`).
6. Return \`lo\` when the loop exits.

### Complexity

- **Time:** O(n log(sum(weights))) — the binary search range is at most \`500 * 500 = 250,000\`, so the \`log\` factor is ≈ 18. Each feasibility check is O(n).
- **Space:** O(1) extra space.`,
};

export default problem;
