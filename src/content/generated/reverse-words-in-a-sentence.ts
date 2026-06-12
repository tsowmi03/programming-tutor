import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "reverse-words-in-a-sentence",
  title: "Reverse Words in a Sentence",
  difficulty: "medium",
  category: "foundations",
  order: 1028,
  description: `Given a string \`sentence\` consisting of words separated by **single spaces**, return a new string with the words in **reverse order**, also separated by single spaces.

A **word** is a maximal sequence of non-space characters.

\`\`\`text
Example 1:
Input:  sentence = "the sky is blue"
Output: "blue is sky the"
\`\`\`

\`\`\`text
Example 2:
Input:  sentence = "hello world"
Output: "world hello"
\`\`\`

\`\`\`text
Example 3:
Input:  sentence = "a good example"
Output: "example good a"
\`\`\`

**Constraints:**
- \`0 <= sentence.length <= 10^4\`
- \`sentence\` consists of lowercase English letters and spaces only.
- Words are separated by exactly one space; there are no leading or trailing spaces (unless the string is empty).`,
  hints: [
    `Can you split the sentence string into a list of individual words using the space character as a delimiter?`,
    `Once you have the list of words, think about reversing the entire list.`,
    `After reversing the word list, how do you combine the words back into a single string with exactly one space between each pair?`,
    `In C, use strtok on a *copy* of the input to tokenize it (strtok mutates its argument), store the token pointers in an array, then iterate the array backwards to build the result with strcat.`,
  ],
  signature: {
    "name": "reverseWords",
    "params": [
      {
        "name": "sentence",
        "type": "string"
      }
    ],
    "returns": "string"
  },
  testCases: [
    {
      "input": [
        "the sky is blue"
      ],
      "expected": "blue is sky the",
      "hidden": false
    },
    {
      "input": [
        "hello world"
      ],
      "expected": "world hello",
      "hidden": false
    },
    {
      "input": [
        "a good example"
      ],
      "expected": "example good a",
      "hidden": false
    },
    {
      "input": [
        "one"
      ],
      "expected": "one",
      "hidden": true
    },
    {
      "input": [
        ""
      ],
      "expected": "",
      "hidden": true
    },
    {
      "input": [
        "coding is fun and rewarding"
      ],
      "expected": "rewarding and fun is coding",
      "hidden": true
    },
    {
      "input": [
        "i love data structures"
      ],
      "expected": "structures data love i",
      "hidden": true
    },
    {
      "input": [
        "fly me to the moon"
      ],
      "expected": "moon the to me fly",
      "hidden": true
    }
  ],
  starterCode: {
    python: `def reverse_words(sentence: str) -> str:
    # TODO: reverse the order of words in the sentence
    return ""
`,
    javascript: `function reverseWords(sentence) {
    // TODO: reverse the order of words in the sentence
    return "";
}
`,
    typescript: `function reverseWords(sentence: string): string {
    // TODO: reverse the order of words in the sentence
    return "";
}`,
    java: `class Solution {
    public String reverseWords(String sentence) {
        // TODO: reverse the order of words in the sentence
        return "";
    }
}
`,
    csharp: `public class Solution {
    public string ReverseWords(string sentence) {
        // TODO: reverse the order of words in the sentence
        return "";
    }
}`,
    c: `char* reverseWords(char* sentence) {
    // TODO: reverse the order of words in the sentence
    return "";
}
`,
    cpp: `class Solution {
public:
    string reverseWords(string sentence) {
        // TODO: reverse the order of words in the sentence
        return "";
    }
};`,
  },
  solutions: {
    python: `def reverse_words(sentence: str) -> str:
    if not sentence:
        return ""
    words = sentence.split(' ')
    words.reverse()
    return ' '.join(words)
`,
    javascript: `function reverseWords(sentence) {
    if (sentence === '') return '';
    return sentence.split(' ').reverse().join(' ');
}
`,
    typescript: `function reverseWords(sentence: string): string {
    if (sentence === '') return '';
    return sentence.split(' ').reverse().join(' ');
}`,
    java: `class Solution {
    public String reverseWords(String sentence) {
        if (sentence.isEmpty()) return "";
        String[] words = sentence.split(" ");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) sb.append(' ');
        }
        return sb.toString();
    }
}
`,
    csharp: `using System;

public class Solution {
    public string ReverseWords(string sentence) {
        if (sentence.Length == 0) return "";
        string[] words = sentence.Split(' ');
        Array.Reverse(words);
        return string.Join(" ", words);
    }
}`,
    c: `#include <string.h>
#include <stdlib.h>

char* reverseWords(char* sentence) {
    int len = (int)strlen(sentence);
    char* result = (char*)malloc(len + 2);
    result[0] = '\\0';
    if (len == 0) return result;

    char* copy = (char*)malloc(len + 1);
    strcpy(copy, sentence);

    char* words[10001];
    int wordCount = 0;
    char* token = strtok(copy, " ");
    while (token != NULL) {
        words[wordCount++] = token;
        token = strtok(NULL, " ");
    }

    for (int i = wordCount - 1; i >= 0; i--) {
        strcat(result, words[i]);
        if (i > 0) strcat(result, " ");
    }

    free(copy);
    return result;
}
`,
    cpp: `class Solution {
public:
    string reverseWords(string sentence) {
        if (sentence.empty()) return "";
        vector<string> words;
        string word;
        for (char c : sentence) {
            if (c == ' ') {
                words.push_back(word);
                word.clear();
            } else {
                word += c;
            }
        }
        words.push_back(word);
        string result;
        for (int i = (int)words.size() - 1; i >= 0; i--) {
            result += words[i];
            if (i > 0) result += ' ';
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Split → Reverse → Join

The core insight is to decompose the problem into three independent steps:

1. **Split** the sentence on the space character to get an array of words.
2. **Reverse** the array in-place (or iterate backwards).
3. **Join** the reversed array back into a string, inserting exactly one space between consecutive words.

All three operations run in O(n) time, so the overall complexity is linear.

### Walkthrough

\`\`\`
Input  : "the sky is blue"
Split  : ["the", "sky", "is", "blue"]
Reverse: ["blue", "is", "sky", "the"]
Join   : "blue is sky the"
\`\`\`

### Edge cases

| Input | Output |
|-------|--------|
| \`""\` | \`""\` |
| \`"one"\` | \`"one"\` |

Handle the empty-string case explicitly to avoid joining a list containing a single empty token.

### C implementation notes

- \`strtok\` modifies the string it operates on, so we **copy** the input before tokenizing.
- Token pointers are stored in a fixed-size array.
- The result is built by walking the token array **backwards** with \`strcat\`, inserting a space between tokens.

### Complexity

- **Time:** O(n) — each character is visited a constant number of times.
- **Space:** O(n) — linear space for the words array and the output string.`,
};

export default problem;
