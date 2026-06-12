import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-words-in-a-sentence-split-on-single-spaces",
  title: "Count Words in a Sentence",
  difficulty: "easy",
  category: "foundations",
  order: 1017,
  description: `Given a sentence string where words are separated by **exactly one space**, return the number of words in the sentence. The sentence has no leading or trailing spaces.

\`\`\`text
Example 1:
Input:  sentence = "hello world"
Output: 2
Explanation: The sentence contains two words: "hello" and "world".
\`\`\`

\`\`\`text
Example 2:
Input:  sentence = "the quick brown fox"
Output: 4
Explanation: The sentence contains four words: "the", "quick", "brown", and "fox".
\`\`\`

\`\`\`text
Example 3:
Input:  sentence = "hello"
Output: 1
Explanation: There is only one word in the sentence.
\`\`\`

**Constraints:**
- \`1 <= sentence.length <= 1000\`
- \`sentence\` consists of lowercase English letters and single spaces only.
- Words are separated by exactly one space.
- There are no leading or trailing spaces.`,
  hints: [
    `Think about what character separates words from each other in this sentence.`,
    `How does the number of spaces relate to the number of words? For example, 1 space means 2 words, 3 spaces means 4 words.`,
    `You can either count the spaces and add 1, or split the string on spaces and count the resulting pieces.`,
  ],
  signature: {
    "name": "countWords",
    "params": [
      {
        "name": "sentence",
        "type": "string"
      }
    ],
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        "hello world"
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        "the quick brown fox"
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        "hello"
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        "a b c d e f g"
      ],
      "expected": 7,
      "hidden": true
    },
    {
      "input": [
        "programming is fun"
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        "a"
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "i love data structures and algorithms"
      ],
      "expected": 6,
      "hidden": true
    },
    {
      "input": [
        "x y"
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        "abc def ghi jkl mno"
      ],
      "expected": 5,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_words(sentence: str) -> int:
    # TODO: count and return the number of words
    return 0
`,
    javascript: `function countWords(sentence) {
    // TODO: count and return the number of words
    return 0;
}
`,
    typescript: `function countWords(sentence: string): number {
    // TODO: count and return the number of words
    return 0;
}`,
    java: `class Solution {
    public int countWords(String sentence) {
        // TODO: count and return the number of words
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int CountWords(string sentence) {
        // TODO: count and return the number of words
        return 0;
    }
}`,
    c: `int countWords(char* sentence) {
    // TODO: count and return the number of words
    return 0;
}
`,
    cpp: `class Solution {
public:
    int countWords(string sentence) {
        // TODO: count and return the number of words
        return 0;
    }
};`,
  },
  solutions: {
    python: `def count_words(sentence: str) -> int:
    return len(sentence.split(' '))
`,
    javascript: `function countWords(sentence) {
    return sentence.split(' ').length;
}
`,
    typescript: `function countWords(sentence: string): number {
    return sentence.split(' ').length;
}`,
    java: `class Solution {
    public int countWords(String sentence) {
        return sentence.split(" ", -1).length;
    }
}
`,
    csharp: `public class Solution {
    public int CountWords(string sentence) {
        return sentence.Split(' ').Length;
    }
}`,
    c: `int countWords(char* sentence) {
    if (sentence == 0 || sentence[0] == '\\0') return 0;
    int count = 1;
    for (int i = 0; sentence[i] != '\\0'; i++) {
        if (sentence[i] == ' ') count++;
    }
    return count;
}
`,
    cpp: `class Solution {
public:
    int countWords(string sentence) {
        if (sentence.empty()) return 0;
        int count = 1;
        for (char c : sentence) {
            if (c == ' ') count++;
        }
        return count;
    }
};`,
  },
  editorial: `## Approach: Count Spaces

Because words are separated by **exactly one space** with no leading or trailing spaces, the number of words always equals the **number of spaces + 1**.

We can scan the string once, count every \`' '\` character, and return \`count + 1\`.

Alternatively, most languages have a \`split\` method. Splitting on a single space produces an array whose length is the answer directly.

### Walkthrough

\`\`\`
sentence = "the quick brown fox"
spaces found at indices 3, 9, 15  → count = 3
answer = 3 + 1 = 4
\`\`\`

### Complexity
- **Time:** O(n) — single pass through the string of length n.
- **Space:** O(1) if counting spaces; O(n) if using \`split\` (stores substrings).`,
};

export default problem;
