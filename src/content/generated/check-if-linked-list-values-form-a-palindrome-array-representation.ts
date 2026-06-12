import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-if-linked-list-values-form-a-palindrome-array-representation",
  title: "Linked List Palindrome Check",
  difficulty: "easy",
  category: "linked-lists",
  order: 1111,
  description: `You are given an array \`values\` that represents the node values of a singly linked list in order (from head to tail).

Return \`true\` if the linked list is a **palindrome** (reads the same forwards and backwards), and \`false\` otherwise.

\`\`\`text
Example 1:
Input:  values = [1, 2, 2, 1]
Output: true
Explanation: The list 1 -> 2 -> 2 -> 1 reads the same forwards and backwards.
\`\`\`

\`\`\`text
Example 2:
Input:  values = [1, 2, 3]
Output: false
Explanation: The list 1 -> 2 -> 3 reversed is 3 -> 2 -> 1, which differs.
\`\`\`

\`\`\`text
Example 3:
Input:  values = [7]
Output: true
Explanation: A single-node list is always a palindrome.
\`\`\`

**Constraints:**
- \`1 <= values.length <= 10^5\`
- \`-10^4 <= values[i] <= 10^4\``,
  hints: [
    `Think about using two pointers: one starting at the beginning and one at the end, moving towards the center.`,
    `A string or list is a palindrome if it equals its own reverse. Can you apply that idea here?`,
    `You only need to check up to the midpoint — if any pair of mirrored elements differs, the answer is false.`,
  ],
  signature: {
    "name": "isLinkedListPalindrome",
    "params": [
      {
        "name": "values",
        "type": "int[]"
      }
    ],
    "returns": "bool",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          1,
          2,
          2,
          1
        ]
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3
        ]
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        [
          7
        ]
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          1
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3,
          2,
          1
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          0,
          -1
        ]
      ],
      "expected": true,
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
        ]
      ],
      "expected": false,
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
        ]
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def is_linked_list_palindrome(values: list[int]) -> bool:
    # TODO: implement
    return False
`,
    javascript: `/**
 * @param {number[]} values
 * @return {boolean}
 */
function isLinkedListPalindrome(values) {
    // TODO: implement
    return false;
}
`,
    typescript: `function isLinkedListPalindrome(values: number[]): boolean {
    // TODO: implement
    return false;
}`,
    java: `class Solution {
    public boolean isLinkedListPalindrome(int[] values) {
        // TODO: implement
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool IsLinkedListPalindrome(int[] values) {
        // TODO: implement
        return false;
    }
}`,
    c: `#include <stdbool.h>

bool isLinkedListPalindrome(int* values, int valuesSize) {
    // TODO: implement
    return false;
}
`,
    cpp: `class Solution {
public:
    bool isLinkedListPalindrome(vector<int>& values) {
        // TODO: implement
        return false;
    }
};`,
  },
  solutions: {
    python: `def is_linked_list_palindrome(values: list[int]) -> bool:
    left, right = 0, len(values) - 1
    while left < right:
        if values[left] != values[right]:
            return False
        left += 1
        right -= 1
    return True
`,
    javascript: `/**
 * @param {number[]} values
 * @return {boolean}
 */
function isLinkedListPalindrome(values) {
    let left = 0, right = values.length - 1;
    while (left < right) {
        if (values[left] !== values[right]) return false;
        left++;
        right--;
    }
    return true;
}
`,
    typescript: `function isLinkedListPalindrome(values: number[]): boolean {
    let left = 0, right = values.length - 1;
    while (left < right) {
        if (values[left] !== values[right]) return false;
        left++;
        right--;
    }
    return true;
}`,
    java: `class Solution {
    public boolean isLinkedListPalindrome(int[] values) {
        int left = 0, right = values.length - 1;
        while (left < right) {
            if (values[left] != values[right]) return false;
            left++;
            right--;
        }
        return true;
    }
}
`,
    csharp: `public class Solution {
    public bool IsLinkedListPalindrome(int[] values) {
        int left = 0, right = values.Length - 1;
        while (left < right) {
            if (values[left] != values[right]) return false;
            left++;
            right--;
        }
        return true;
    }
}`,
    c: `#include <stdbool.h>

bool isLinkedListPalindrome(int* values, int valuesSize) {
    int left = 0, right = valuesSize - 1;
    while (left < right) {
        if (values[left] != values[right]) return false;
        left++;
        right--;
    }
    return true;
}
`,
    cpp: `class Solution {
public:
    bool isLinkedListPalindrome(vector<int>& values) {
        int left = 0, right = (int)values.size() - 1;
        while (left < right) {
            if (values[left] != values[right]) return false;
            left++;
            right--;
        }
        return true;
    }
};`,
  },
  editorial: `## Approach: Two-Pointer Technique

Since the linked list is represented as an array, we can use a classic two-pointer approach to check for a palindrome.

### Algorithm
1. Initialize a \`left\` pointer at index \`0\` and a \`right\` pointer at index \`n - 1\`.
2. While \`left < right\`:
   - If \`values[left] != values[right]\`, return \`false\`.
   - Increment \`left\` and decrement \`right\`.
3. If the loop completes without finding a mismatch, return \`true\`.

### Why it works
A sequence is a palindrome if and only if every element at position \`i\` equals the element at position \`n - 1 - i\`. By checking pairs from both ends moving inward, we verify this property efficiently.

### Complexity
- **Time:** O(n) — we visit each element at most once.
- **Space:** O(1) — only two pointer variables are used, regardless of input size.`,
};

export default problem;
