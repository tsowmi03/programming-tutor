import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "koko-eating-bananas-minimum-eating-speed-to-finish-within-h-hours",
  title: "Koko Eating Bananas",
  difficulty: "medium",
  category: "binary-search",
  order: 1093,
  description: `Koko loves to eat bananas. There are \`n\` piles of bananas, where \`piles[i]\` is the number of bananas in the i-th pile. The guards have gone and will come back in \`h\` hours.

Koko can decide her eating speed \`k\` (bananas per hour). Each hour, she chooses some pile of bananas and eats \`k\` bananas from that pile. If the pile has fewer than \`k\` bananas, she eats all of them and does not eat any more bananas during that hour.

Return the **minimum** integer eating speed \`k\` such that she can eat all the bananas within \`h\` hours.

**Examples:**

\`\`\`text
Input:  piles = [3, 6, 7, 11], h = 8
Output: 4
Explanation:
  speed=4 -> ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 hours <= 8. ✓
  speed=3 -> ceil(3/3)+ceil(6/3)+ceil(7/3)+ceil(11/3) = 1+2+3+4 = 10 hours > 8.  ✗
\`\`\`

\`\`\`text
Input:  piles = [30, 11, 23, 4, 20], h = 5
Output: 30
Explanation: With only 5 hours for 5 piles, Koko must finish each pile in 1 hour,
             so she needs speed = max(piles) = 30.
\`\`\`

\`\`\`text
Input:  piles = [30, 11, 23, 4, 20], h = 6
Output: 23
\`\`\`

**Constraints:**
- \`1 <= piles.length <= 10^4\`
- \`piles.length <= h <= 10^9\`
- \`1 <= piles[i] <= 10^9\``,
  hints: [
    `If Koko can finish all bananas at speed k, can she also finish at any speed k' > k? Think about how the answer space behaves — is it monotone?`,
    `Binary search on the eating speed. What are reasonable lower and upper bounds for k?`,
    `For a given speed k, you can compute the total hours needed as the sum of ceil(piles[i] / k) for every pile. Use integer arithmetic: ceil(a/b) = (a + b - 1) / b.`,
  ],
  signature: {
    "name": "minEatingSpeed",
    "params": [
      {
        "name": "piles",
        "type": "int[]"
      },
      {
        "name": "h",
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
          3,
          6,
          7,
          11
        ],
        8
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        [
          30,
          11,
          23,
          4,
          20
        ],
        5
      ],
      "expected": 30,
      "hidden": false
    },
    {
      "input": [
        [
          30,
          11,
          23,
          4,
          20
        ],
        6
      ],
      "expected": 23,
      "hidden": false
    },
    {
      "input": [
        [
          1000000000
        ],
        1
      ],
      "expected": 1000000000,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1
        ],
        4
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1,
          999999999
        ],
        10
      ],
      "expected": 142857143,
      "hidden": true
    },
    {
      "input": [
        [
          5
        ],
        5
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          2
        ],
        3
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          100,
          200,
          300,
          400,
          500
        ],
        5
      ],
      "expected": 500,
      "hidden": true
    },
    {
      "input": [
        [
          100,
          200,
          300,
          400,
          500
        ],
        15
      ],
      "expected": 100,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def min_eating_speed(piles: list[int], h: int) -> int:
    # TODO: implement
    return 0
`,
    javascript: `/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
function minEatingSpeed(piles, h) {
    // TODO: implement
    return 0;
}
`,
    java: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int minEatingSpeed(int* piles, int pilesSize, int h) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def min_eating_speed(piles: list[int], h: int) -> int:
    def can_finish(speed):
        hours = 0
        for p in piles:
            hours += (p + speed - 1) // speed
        return hours <= h

    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_finish(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
`,
    javascript: `function minEatingSpeed(piles, h) {
    function canFinish(speed) {
        let hours = 0;
        for (const p of piles) {
            hours += Math.ceil(p / speed);
        }
        return hours <= h;
    }

    let lo = 1, hi = Math.max(...piles);
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (canFinish(mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
`,
    java: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int lo = 1, hi = 0;
        for (int p : piles) hi = Math.max(hi, p);

        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (canFinish(piles, mid, h)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private boolean canFinish(int[] piles, int speed, int h) {
        long hours = 0;
        for (int p : piles) {
            hours += (p + speed - 1) / speed;
        }
        return hours <= h;
    }
}
`,
    c: `int minEatingSpeed(int* piles, int pilesSize, int h) {
    int hi = 0;
    for (int i = 0; i < pilesSize; i++) {
        if (piles[i] > hi) hi = piles[i];
    }
    int lo = 1;

    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        long long hours = 0;
        for (int i = 0; i < pilesSize; i++) {
            hours += (piles[i] + mid - 1) / mid;
        }
        if (hours <= (long long)h) {
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
The answer space for \`k\` is the range \`[1, max(piles)]\`:
- At speed 1, Koko takes the most time (sum of all pile sizes in hours).
- At speed \`max(piles)\`, every pile is finished in exactly 1 hour, which is always sufficient since \`h >= n\`.

The feasibility function \`canFinish(k)\` is **monotone**: if speed \`k\` works, any speed \`k' > k\` also works. This makes binary search applicable.

### Algorithm
1. Set \`lo = 1\`, \`hi = max(piles)\`.
2. While \`lo < hi\`:
   - Compute \`mid = (lo + hi) / 2\`.
   - Compute total hours at speed \`mid\`: \`sum of ceil(piles[i] / mid)\` for all i.
   - If total hours \`<= h\`, the speed is sufficient — try smaller: \`hi = mid\`.
   - Otherwise, speed is too slow — increase: \`lo = mid + 1\`.
3. Return \`lo\`.

### Computing ceil without floats
\`ceil(a / b)\` using integer arithmetic = \`(a + b - 1) / b\`.

### Complexity
- **Time:** O(n log M), where n = number of piles, M = max(piles). The binary search runs O(log M) iterations, each scanning all piles in O(n).
- **Space:** O(1) extra space.

### Example Trace (piles=[3,6,7,11], h=8)
\`\`\`
lo=1, hi=11
  mid=6 → hours=1+1+2+2=6 ≤ 8 → hi=6
  mid=3 → hours=1+2+3+4=10 > 8 → lo=4
  mid=5 → hours=1+2+2+3=8 ≤ 8 → hi=5
  mid=4 → hours=1+2+2+3=8 ≤ 8 → hi=4
  lo==hi==4 → return 4
\`\`\``,
};

export default problem;
