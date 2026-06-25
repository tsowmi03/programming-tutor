import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-set-bits-in-a-non-negative-integer",
  title: "Count Set Bits in Range",
  difficulty: "medium",
  category: "foundations",
  order: 2990,
  description: `Given a non-negative integer \`n\`, return the **total number of set bits** (1-bits) across the binary representations of **all integers from 0 to n (inclusive)**.

For example, the numbers 0 through 4 in binary are:
\`\`\`
0 → 000  (0 set bits)
1 → 001  (1 set bit)
2 → 010  (1 set bit)
3 → 011  (2 set bits)
4 → 100  (1 set bit)
\`\`\`
So the total for n = 4 is 0 + 1 + 1 + 2 + 1 = **5**.

\`\`\`text
Example 1:
Input:  n = 4
Output: 5

Example 2:
Input:  n = 7
Output: 12

Example 3:
Input:  n = 0
Output: 0
\`\`\`

**Constraints:**
- \`0 <= n <= 100000000\` (10^8)

*A brute-force loop over all numbers from 0 to n will time-out for large n. Aim for O(log n) time.*`,
  hints: [
    `Think about how many numbers in [0, n] have bit position k set. Can you compute that count for each bit independently?`,
    `For a given bit position k (value 2^k), the bit cycles: it is 0 for 2^k numbers, then 1 for 2^k numbers, then 0 again, etc. Count the complete cycles plus the remainder.`,
    `Sum the contribution of every bit position from 0 up to floor(log2(n)).`,
  ],
  guidance: [
    {
      "title": "Why brute force is too slow",
      "body": "Iterating from 0 to n and calling `popcount` on each is O(n log n). For n up to 10^8 that is billions of operations — far too slow.",
      "level": "nudge"
    },
    {
      "title": "Count each bit position independently",
      "body": "For bit position `k` (0-indexed from LSB), the bit alternates in blocks: `2^k` zeros, then `2^k` ones, repeating. In the range [0, n] you can count how many numbers have bit `k` set without scanning each number.",
      "level": "strategy"
    },
    {
      "title": "Formula for one bit position",
      "body": "Let `cycle = 2^(k+1)` (full on/off period). The number of complete cycles in [0, n] is `full = (n + 1) / cycle`. The remainder beyond full cycles is `rem = (n + 1) % cycle`. The count of set bit-k values is:\n```\nfull * 2^k  +  max(0, rem - 2^k)\n```\nSum this over all bit positions k = 0, 1, …, 27.",
      "level": "strategy"
    },
    {
      "title": "Pitfall: integer overflow",
      "body": "Even though the final answer fits in a 32-bit int for n ≤ 10^8, intermediate products like `full * halfCycle` can temporarily be large. Using a 64-bit accumulator for intermediate arithmetic is safest before casting back.",
      "level": "pitfall"
    },
    {
      "title": "Implementation shape",
      "body": "```\nfunction countSetBits(n):\n    total = 0\n    for k in 0..27:\n        halfCycle = 1 << k          // 2^k\n        cycle     = halfCycle << 1  // 2^(k+1)\n        full      = (n + 1) / cycle\n        rem       = (n + 1) % cycle\n        total    += full * halfCycle + max(0, rem - halfCycle)\n    return total\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "countSetBits",
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
        4
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        7
      ],
      "expected": 12,
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
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        15
      ],
      "expected": 32,
      "hidden": true
    },
    {
      "input": [
        16
      ],
      "expected": 33,
      "hidden": true
    },
    {
      "input": [
        255
      ],
      "expected": 1024,
      "hidden": true
    },
    {
      "input": [
        100
      ],
      "expected": 319,
      "hidden": true
    },
    {
      "input": [
        100000000
      ],
      "expected": 1314447116,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_set_bits(n: int) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countSetBits(n) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countSetBits(n: number): number {
    // TODO: implement
    return 0;
}
`,
    java: `class Solution {
    public int countSetBits(int n) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int CountSetBits(int n) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countSetBits(int n) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    int countSetBits(int n) {
        // TODO: implement
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def count_set_bits(n: int) -> int:
    total = 0
    for k in range(28):
        half_cycle = 1 << k
        cycle = half_cycle << 1
        full = (n + 1) // cycle
        rem = (n + 1) % cycle
        total += full * half_cycle + max(0, rem - half_cycle)
    return total
`,
    javascript: `function countSetBits(n) {
    let total = 0;
    for (let k = 0; k < 28; k++) {
        const halfCycle = 1 << k;
        const cycle = halfCycle << 1;
        const full = Math.floor((n + 1) / cycle);
        const rem = (n + 1) % cycle;
        total += full * halfCycle + Math.max(0, rem - halfCycle);
    }
    return total;
}
`,
    typescript: `function countSetBits(n: number): number {
    let total = 0;
    for (let k = 0; k < 28; k++) {
        const halfCycle = 1 << k;
        const cycle = halfCycle << 1;
        const full = Math.floor((n + 1) / cycle);
        const rem = (n + 1) % cycle;
        total += full * halfCycle + Math.max(0, rem - halfCycle);
    }
    return total;
}
`,
    java: `class Solution {
    public int countSetBits(int n) {
        long total = 0;
        for (int k = 0; k < 28; k++) {
            long halfCycle = 1L << k;
            long cycle = halfCycle << 1;
            long full = ((long)n + 1) / cycle;
            long rem = ((long)n + 1) % cycle;
            total += full * halfCycle + Math.max(0, rem - halfCycle);
        }
        return (int) total;
    }
}
`,
    csharp: `public class Solution {
    public int CountSetBits(int n) {
        long total = 0;
        for (int k = 0; k < 28; k++) {
            long halfCycle = 1L << k;
            long cycle = halfCycle << 1;
            long full = ((long)n + 1) / cycle;
            long rem = ((long)n + 1) % cycle;
            total += full * halfCycle + System.Math.Max(0, rem - halfCycle);
        }
        return (int) total;
    }
}
`,
    c: `int countSetBits(int n) {
    long long total = 0;
    int k;
    for (k = 0; k < 28; k++) {
        long long halfCycle = 1LL << k;
        long long cycle = halfCycle << 1;
        long long full = ((long long)n + 1) / cycle;
        long long rem = ((long long)n + 1) % cycle;
        long long extra = rem - halfCycle;
        total += full * halfCycle + (extra > 0 ? extra : 0);
    }
    return (int) total;
}
`,
    cpp: `class Solution {
public:
    int countSetBits(int n) {
        long long total = 0;
        for (int k = 0; k < 28; k++) {
            long long halfCycle = 1LL << k;
            long long cycle = halfCycle << 1;
            long long full = ((long long)n + 1) / cycle;
            long long rem = ((long long)n + 1) % cycle;
            total += full * halfCycle + std::max(0LL, rem - halfCycle);
        }
        return (int) total;
    }
};
`,
  },
  editorial: `## Approach: Bit-by-Bit Counting — O(log n)

### Key Insight

Instead of counting bits for each number individually (O(n) numbers × O(log n) bits = too slow), we count **how many numbers in [0, n] have bit position k set**, for each bit independently.

### How Bit k Behaves

Bit position k (0 = LSB) follows a regular on/off pattern:
- **Off** for \`2^k\` consecutive numbers
- **On** for \`2^k\` consecutive numbers
- Repeats with period \`2^(k+1)\`

In the range [0, n]:
1. Count **complete cycles**: \`full = (n + 1) / 2^(k+1)\`
   Each complete cycle contributes exactly \`2^k\` set bits.
2. Count the **remainder**: \`rem = (n + 1) % 2^(k+1)\`
   Of the remainder, the first \`2^k\` positions have bit k = 0, the next up to \`2^k\` have bit k = 1.
   Contribution: \`max(0, rem - 2^k)\`

So the count for bit k is:
\`\`\`
contrib(k) = full * 2^k + max(0, rem - 2^k)
\`\`\`

Sum over k = 0 to 27 (since n ≤ 10^8 < 2^27).

### Verification with Examples

**n = 4:**
- k=0: cycle=2, full=2, rem=1 → 2×1 + max(0,0) = 2
- k=1: cycle=4, full=1, rem=1 → 1×2 + max(0,-1) = 2
- k=2: cycle=8, full=0, rem=5 → 0 + max(0,1) = 1
- Total = 2+2+1 = **5** ✓

**n = 7:**
- k=0: full=4, rem=0 → 4
- k=1: full=2, rem=0 → 4
- k=2: full=1, rem=0 → 4
- Total = 4+4+4 = **12** ✓

**n = 100000000:**
Result = **1314447116** ✓

### Complexity

- **Time:** O(log n) — 28 iterations
- **Space:** O(1)`,
};

export default problem;
