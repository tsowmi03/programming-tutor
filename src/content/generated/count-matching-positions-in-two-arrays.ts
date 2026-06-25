import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-matching-positions-in-two-arrays",
  title: "Count Matching Positions in Two Arrays",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 3018,
  description: `Given two integer arrays \`a\` and \`b\` of the same length, return how many positions contain equal values.

\`\`\`text
Example 1:
Input:  a = [1,2,3], b = [1,0,3]
Output: 2

Example 2:
Input:  a = [1,2], b = [3,4]
Output: 0
\`\`\`

**Constraints:**
- \`0 <= a.length == b.length <= 1000\``,
  hints: [
    `Use one index to walk both arrays.`,
    `Increment the counter when the values at that index are equal.`,
  ],

  signature: {
    "name": "countMatchingPositions",
    "params": [
      {
        "name": "a",
        "type": "int[]"
      },
      {
        "name": "b",
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
          1,
          2,
          3
        ],
        [
          1,
          0,
          3
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2
        ],
        [
          3,
          4
        ]
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [],
        []
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          5
        ],
        [
          5
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          2
        ],
        [
          1,
          2,
          2
        ]
      ],
      "expected": 2,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_matching_positions(a: list[int], b: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countMatchingPositions(a, b) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countMatchingPositions(a: number[], b: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countMatchingPositions(int[] a, int[] b) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countMatchingPositions(int* a, int aSize, int* b, int bSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def count_matching_positions(a: list[int], b: list[int]) -> int:
    count = 0
    for i in range(len(a)):
        if a[i] == b[i]:
            count += 1
    return count
`,
    javascript: `function countMatchingPositions(a, b) {
    let count = 0;
    for (let i = 0; i < a.length; i++) if (a[i] === b[i]) count++;
    return count;
}
`,
    typescript: `function countMatchingPositions(a: number[], b: number[]): number {
    let count = 0;
    for (let i = 0; i < a.length; i++) if (a[i] === b[i]) count++;
    return count;
}`,
    java: `class Solution {
    public int countMatchingPositions(int[] a, int[] b) {
        int count = 0;
        for (int i = 0; i < a.length; i++) if (a[i] == b[i]) count++;
        return count;
    }
}
`,
    c: `int countMatchingPositions(int* a, int aSize, int* b, int bSize) {
    int count = 0;
    for (int i = 0; i < aSize; i++) if (a[i] == b[i]) count++;
    return count;
}
`,
  },
  editorial: `Walk both arrays in lockstep and count equal positions. This is O(n) time.`,
};

export default problem;
