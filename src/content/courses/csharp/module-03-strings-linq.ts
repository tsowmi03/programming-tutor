import type { CourseModule } from "../types";

export const csharpStringsLinq: CourseModule = {
  slug: "strings-linq",
  title: "Strings & LINQ",
  description:
    "Strings show up in half of all interview problems, and LINQ turns multi-line loops into a single readable query. Both are C# superpowers worth fluency in.",
  lessons: [
    {
      slug: "strings",
      title: "Working with strings",
      summary: "Immutability, StringBuilder, and the methods you'll actually use.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Strings are immutable

A C# \`string\` is a reference type, but its contents never change. Every operation that looks like a mutation actually returns a **new** string:

\`\`\`csharp
string s = "hello";
string up = s.ToUpper();   // "HELLO" — s is still "hello"
char first = s[0];         // 'h' — index like an array
int len = s.Length;        // 5
\`\`\`

Because each modification allocates a fresh string, building a string in a loop with \`+=\` is quietly O(n²) — every \`+=\` copies the whole accumulated string. For that, use \`StringBuilder\`:

\`\`\`csharp
var sb = new System.Text.StringBuilder();
for (int i = 0; i < n; i++) {
    sb.Append(i);
    sb.Append(',');
}
string result = sb.ToString();   // O(n) overall
\`\`\`

For a handful of concatenations, \`+\` or string interpolation is perfectly fine — reach for \`StringBuilder\` only when appending in a loop.`,
        },
        {
          kind: "prose",
          markdown: `## The string toolkit

A selection you'll use constantly. All of these return new values (strings are immutable):

\`\`\`csharp
s.ToLower()  s.ToUpper()       // case
s.Trim()                       // strip surrounding whitespace
s.Contains("ab")               // substring test -> bool
s.IndexOf('x')                 // first index, or -1
s.StartsWith("he")  s.EndsWith("lo")
s.Substring(1, 3)              // 3 chars starting at index 1
s.Replace("a", "b")
s.Split(' ')                   // -> string[] of words
string.Join(",", parts)        // string[] -> "a,b,c"
\`\`\`

And the \`char\` helpers (from \`System.Char\`) are invaluable for parsing:

\`\`\`csharp
char.IsDigit(c)   char.IsLetter(c)   char.IsWhiteSpace(c)
char.ToLower(c)   char.ToUpper(c)
\`\`\`

### Interpolated strings

Prefix a string with \`$\` to embed expressions in braces — cleaner than concatenation:

\`\`\`csharp
int n = 42;
string msg = $"The answer is {n}, doubled is {n * 2}.";
\`\`\``,
        },
        {
          kind: "exercise",
          exercise: {
            id: "is-anagram",
            title: "Valid anagram",
            prompt: `Return \`true\` if \`t\` is an anagram of \`s\` — i.e. \`t\` uses exactly the same characters as \`s\`, the same number of times, in any order.

\`\`\`text
IsAnagram("anagram", "nagaram") -> true
IsAnagram("rat", "car")         -> false
\`\`\`

Assume lower-case letters only. The classic approaches: sort both and compare, or count characters with a dictionary and check the counts match. Different lengths can never be anagrams — a useful early exit.`,
            signature: {
              name: "isAnagram",
              params: [
                { name: "s", type: "string" },
                { name: "t", type: "string" },
              ],
              returns: "bool",
            },
            tests: [
              { input: ["anagram", "nagaram"], expected: true },
              { input: ["rat", "car"], expected: false },
              { input: ["", ""], expected: true, hidden: true },
              { input: ["a", "ab"], expected: false, hidden: true },
              { input: ["listen", "silent"], expected: true, hidden: true },
              { input: ["aacc", "ccac"], expected: false, hidden: true },
            ],
            starterCode: `using System.Collections.Generic;

public class Solution {
    public bool IsAnagram(string s, string t) {
        // Same characters, same counts -> anagram.
    }
}`,
            solution: `using System.Collections.Generic;

public class Solution {
    public bool IsAnagram(string s, string t) {
        if (s.Length != t.Length) {
            return false;
        }
        var counts = new Dictionary<char, int>();
        foreach (char c in s) {
            counts[c] = counts.GetValueOrDefault(c, 0) + 1;
        }
        foreach (char c in t) {
            if (!counts.TryGetValue(c, out int n) || n == 0) {
                return false;
            }
            counts[c] = n - 1;
        }
        return true;
    }
}`,
            hints: [
              "If the lengths differ, they can't be anagrams — return `false` immediately.",
              "Count each character of `s` in a `Dictionary<char, int>`.",
              "Walk `t` and decrement; if a character is missing or its count is already 0, return `false`.",
            ],
          },
        },
      ],
    },
    {
      slug: "linq",
      title: "LINQ: querying collections",
      summary: "Where, Select, OrderBy, and friends — declarative data shaping.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Describe the result, not the loop

LINQ (Language Integrated Query) is a set of methods over any sequence (\`IEnumerable<T>\` — which arrays and \`List<T>\` both are) that let you filter, transform, sort, and aggregate declaratively. Add \`using System.Linq;\` to unlock them.

\`\`\`csharp
using System.Linq;

int[] nums = { 5, 3, 8, 1, 9, 2 };

var bigOnes   = nums.Where(n => n > 3);          // filter
var doubled   = nums.Select(n => n * 2);         // transform (map)
var sorted    = nums.OrderBy(n => n);            // ascending
var descending = nums.OrderByDescending(n => n);
\`\`\`

The \`n => n > 3\` syntax is a **lambda** — an inline anonymous function, \`parameters => body\`. \`Where\` keeps elements for which the lambda returns \`true\`; \`Select\` maps each element through the lambda.

These compose into readable pipelines:

\`\`\`csharp
int[] result = nums
    .Where(n => n % 2 == 0)   // evens only
    .OrderBy(n => n)          // sorted
    .ToArray();               // materialise back to an array
\`\`\``,
        },
        {
          kind: "prose",
          markdown: `## Aggregations and materialising

LINQ also collapses a sequence to a single value:

\`\`\`csharp
int total  = nums.Sum();
int most   = nums.Max();
int howMany = nums.Count(n => n > 3);   // count matching a predicate
bool any   = nums.Any(n => n < 0);      // is there any negative?
bool all   = nums.All(n => n > 0);      // are they all positive?
int firstBig = nums.First(n => n > 7);  // first match (throws if none)
\`\`\`

### Deferred execution — the one surprise

\`Where\`, \`Select\`, and \`OrderBy\` are **lazy**: they describe a query but don't run until you enumerate the result (with \`foreach\`, \`.ToArray()\`, \`.ToList()\`, \`.Count()\`, etc.). This is usually invisible, but it means you should call \`.ToArray()\` / \`.ToList()\` to "freeze" a result you'll use more than once or return.

> **LINQ vs hand-written loops:** LINQ is about *clarity*, not raw speed. For hot inner loops a plain \`for\` may be faster, but for shaping data and expressing intent, a LINQ pipeline is hard to beat. Know both; choose per situation.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "sorted-evens",
            title: "Sorted evens, the LINQ way",
            prompt: `Return the **even** numbers of \`nums\`, **sorted ascending**, as an array.

\`\`\`text
SortedEvens([5, 3, 8, 1, 9, 2, 6]) -> [2, 6, 8]
SortedEvens([1, 3, 5])             -> []
\`\`\`

This is a one-liner with LINQ: \`Where\` to filter, \`OrderBy\` to sort, \`ToArray\` to return. (You can also do it with a loop and \`List<int>\` + \`Sort\` — both are fine.) Remember a number is even when \`n % 2 == 0\`, which also holds for negatives and zero.`,
            signature: {
              name: "sortedEvens",
              params: [{ name: "nums", type: "int[]" }],
              returns: "int[]",
            },
            tests: [
              { input: [[5, 3, 8, 1, 9, 2, 6]], expected: [2, 6, 8] },
              { input: [[1, 3, 5]], expected: [] },
              { input: [[]], expected: [], hidden: true },
              { input: [[-4, -2, 0, 1]], expected: [-4, -2, 0], hidden: true },
              { input: [[10, 8, 6, 4, 2]], expected: [2, 4, 6, 8, 10], hidden: true },
            ],
            starterCode: `using System.Linq;

public class Solution {
    public int[] SortedEvens(int[] nums) {
        // Filter to evens, sort ascending, return as an array.
    }
}`,
            solution: `using System.Linq;

public class Solution {
    public int[] SortedEvens(int[] nums) {
        return nums
            .Where(n => n % 2 == 0)
            .OrderBy(n => n)
            .ToArray();
    }
}`,
            hints: [
              "`nums.Where(n => n % 2 == 0)` keeps the even numbers.",
              "Chain `.OrderBy(n => n)` to sort ascending.",
              "Finish with `.ToArray()` to return an `int[]`.",
            ],
          },
        },
      ],
    },
  ],
};
