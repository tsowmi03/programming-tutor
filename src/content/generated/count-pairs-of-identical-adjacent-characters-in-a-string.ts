import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-pairs-of-identical-adjacent-characters-in-a-string",
  title: "Count Adjacent Identical Character Pairs",
  difficulty: "easy",
  category: "foundations",
  order: 1022,
  description: `Given a string \`s\`, count the number of **adjacent identical pairs** — positions \`i\` (0-indexed) where \`s[i] == s[i+1]\`.

Return that count.

\`\`\`text
Example 1:
  Input:  s = "aabb"
  Output: 2
  Explanation: s[0]==s[1] ('a'=='a') and s[2]==s[3] ('b'=='b').

Example 2:
  Input:  s = "aaa"
  Output: 2
  Explanation: s[0]==s[1] and s[1]==s[2], so 2 pairs.

Example 3:
  Input:  s = "abcd"
  Output: 0
  Explanation: No two adjacent characters are the same.
\`\`\`

**Constraints:**
- \`0 <= s.length <= 10^4\`
- \`s\` consists of lowercase English letters.`,
  hints: [
    `Loop from index 0 up to (but not including) the last index, comparing each character with the one immediately after it.`,
    `Keep a running counter and increment it every time \`s[i] == s[i+1]\`.`,
    `Be careful about the loop boundary — comparing \`s[i]\` with \`s[i+1]\` requires \`i+1\` to be a valid index.`,
  ],
  signature: {
    "name": "countAdjacentPairs",
    "params": [
      {
        "name": "s",
        "type": "string"
      }
    ],
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        "aabb"
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        "aaa"
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        "abcd"
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        "aa"
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "a"
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        ""
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        "aabbcc"
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        "aaaa"
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        "abba"
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "aabbba"
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_adjacent_pairs(s: str) -> int:
    # TODO: count pairs of identical adjacent characters
    return 0
`,
    javascript: `function countAdjacentPairs(s) {
    // TODO: count pairs of identical adjacent characters
    return 0;
}
`,
    typescript: `function countAdjacentPairs(s: string): number {
    // TODO: count pairs of identical adjacent characters
    return 0;
}`,
    java: `class Solution {
    public int countAdjacentPairs(String s) {
        // TODO: count pairs of identical adjacent characters
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int CountAdjacentPairs(string s) {
        // TODO: count pairs of identical adjacent characters
        return 0;
    }
}`,
    c: `int countAdjacentPairs(char* s) {
    /* TODO: count pairs of identical adjacent characters */
    return 0;
}
`,
    cpp: `class Solution {
public:
    int countAdjacentPairs(string s) {
        // TODO: count pairs of identical adjacent characters
        return 0;
    }
};`,
  },
  solutions: {
    python: `def count_adjacent_pairs(s: str) -> int:
    count = 0
    for i in range(len(s) - 1):
        if s[i] == s[i + 1]:
            count += 1
    return count
`,
    javascript: `function countAdjacentPairs(s) {
    let count = 0;
    for (let i = 0; i < s.length - 1; i++) {
        if (s[i] === s[i + 1]) count++;
    }
    return count;
}
`,
    typescript: `function countAdjacentPairs(s: string): number {
    let count = 0;
    for (let i = 0; i < s.length - 1; i++) {
        if (s[i] === s[i + 1]) count++;
    }
    return count;
}`,
    java: `class Solution {
    public int countAdjacentPairs(String s) {
        int count = 0;
        for (int i = 0; i < s.length() - 1; i++) {
            if (s.charAt(i) == s.charAt(i + 1)) count++;
        }
        return count;
    }
}
`,
    csharp: `public class Solution {
    public int CountAdjacentPairs(string s) {
        int count = 0;
        for (int i = 0; i < s.Length - 1; i++) {
            if (s[i] == s[i + 1]) count++;
        }
        return count;
    }
}`,
    c: `int countAdjacentPairs(char* s) {
    int count = 0;
    for (int i = 0; s[i] != '\\0' && s[i + 1] != '\\0'; i++) {
        if (s[i] == s[i + 1]) count++;
    }
    return count;
}
`,
    cpp: `class Solution {
public:
    int countAdjacentPairs(string s) {
        int count = 0;
        for (int i = 0; i < (int)s.length() - 1; i++) {
            if (s[i] == s[i + 1]) count++;
        }
        return count;
    }
};`,
  },
  editorial: `## Approach: Single Linear Scan

Iterate through the string once, comparing each character with its right neighbour.

### Algorithm
1. Initialise a counter \`count = 0\`.
2. Loop \`i\` from \`0\` to \`n - 2\` (inclusive), where \`n = len(s)\`.
3. If \`s[i] == s[i+1]\`, increment \`count\`.
4. Return \`count\`.

In C we use the null-terminator \`'\\0'\` as the loop sentinel instead of a precomputed length.

### Complexity
- **Time:** O(n) — one pass through the string.
- **Space:** O(1) — only a counter variable is used.

### Edge cases
- Empty string (\`n = 0\`): the loop body never executes → returns 0. ✓
- Single character (\`n = 1\`): same reasoning → returns 0. ✓
- All identical characters (e.g., \`"aaaa"\`): every adjacent pair matches → returns \`n - 1\`. ✓`,
};

export default problem;
