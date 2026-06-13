import type { CourseModule } from "../types";

export const pythonStringsComprehensions: CourseModule = {
  slug: "strings-comprehensions",
  title: "Strings & Comprehensions",
  description:
    "Strings appear in half of all interview problems, and comprehensions are the single most Pythonic construct there is — turning loops that build collections into one readable expression.",
  lessons: [
    {
      slug: "strings",
      title: "Working with strings",
      summary: "Immutability, the method toolkit, join, and f-strings.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Strings are immutable sequences

A Python \`str\` is an immutable sequence of characters. You can index and slice it like a list, but you can never modify it in place — every "change" returns a new string.

\`\`\`python
s = "hello"
s[0]          # 'h'
s[1:4]        # 'ell' — slicing works on strings too
s[::-1]       # 'olleh' — reversed
len(s)        # 5
# s[0] = 'H'  # TypeError: strings are immutable
\`\`\`

Because each modification allocates a new string, building one with \`+=\` in a loop is quietly O(n²). The Pythonic fix is to collect pieces in a list and \`"".join(...)\` them once at the end — O(n):

\`\`\`python
parts = []
for i in range(n):
    parts.append(str(i))
result = ",".join(parts)   # join is the right tool, not repeated +=
\`\`\``,
        },
        {
          kind: "prose",
          markdown: `## The string toolkit

A selection you'll reach for constantly — all return new values:

\`\`\`python
s.lower()   s.upper()
s.strip()                 # remove surrounding whitespace
s.split()                 # -> list of words (splits on any whitespace)
s.split(",")              # split on a specific separator
",".join(items)           # list of str -> "a,b,c"
s.replace("a", "b")
s.startswith("he")  s.endswith("lo")
s.find("x")               # index, or -1 if absent
"abc".isalpha()  "123".isdigit()   # character-class tests
\`\`\`

There's no \`is_vowel\` helper — for character classes beyond the built-in \`isalpha\`/\`isdigit\`/\`isspace\`, just test membership: \`c in "aeiou"\`.

### f-strings

Prefix a string with \`f\` to embed expressions in braces — the modern, readable way to format:

\`\`\`python
n = 42
msg = f"The answer is {n}, doubled is {n * 2}."
name = "Ada"
print(f"Hello, {name}!")
\`\`\`

Iterating a string yields its characters (\`for c in s\`), and \`sorted(s)\` returns a sorted *list* of its characters — both useful for the exercise below.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "is-anagram",
            title: "Valid anagram",
            prompt: `Return \`True\` if \`t\` is an anagram of \`s\` — i.e. \`t\` uses exactly the same characters as \`s\`, the same number of times, in any order.

\`\`\`text
is_anagram("anagram", "nagaram") -> True
is_anagram("rat", "car")         -> False
\`\`\`

Assume lower-case letters only. Two clean approaches: \`sorted(s) == sorted(t)\` (simple, O(n log n)), or count characters with a dict and compare (O(n)). Different lengths can never be anagrams.`,
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
            starterCode: `def is_anagram(s, t):
    # Same characters, same counts -> anagram.
    pass
`,
            solution: `def is_anagram(s, t):
    return sorted(s) == sorted(t)
`,
            hints: [
              "`sorted(s)` returns a list of `s`'s characters in order.",
              "Two strings are anagrams exactly when their sorted character lists are equal.",
              "`return sorted(s) == sorted(t)` — or, for O(n), compare two frequency dicts (different lengths are an early `False`).",
            ],
          },
        },
      ],
    },
    {
      slug: "comprehensions",
      title: "Comprehensions",
      summary: "List, set, and dict comprehensions — the Pythonic way to build collections.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Build a collection in one expression

A **comprehension** turns the "create a list, loop, conditionally append, return" pattern into a single readable line. This is perhaps *the* defining Python idiom.

\`\`\`python
# The loop you'd otherwise write:
squares = []
for n in nums:
    squares.append(n * n)

# The comprehension:
squares = [n * n for n in nums]
\`\`\`

Add a condition with a trailing \`if\` to filter:

\`\`\`python
evens = [n for n in nums if n % 2 == 0]
labels = [f"#{i}" for i in range(5)]          # ['#0', '#1', ...]
flat = [x for row in matrix for x in row]     # flatten a 2-D list
\`\`\`

The shape is always \`[ expression for item in iterable if condition ]\` — read it as "the expression, for each item, where the condition holds".`,
        },
        {
          kind: "prose",
          markdown: `## Set, dict, and generator forms

The same syntax with different brackets builds the other containers — and parentheses make a lazy **generator** that produces values on demand without materialising a list:

\`\`\`python
{n % 3 for n in nums}             # set comprehension -> unique remainders
{n: n * n for n in nums}          # dict comprehension -> {value: square}
sum(n * n for n in nums)          # generator expr — no intermediate list built
any(n < 0 for n in nums)          # short-circuits on the first negative
\`\`\`

Generators matter for performance: \`sum(n*n for n in nums)\` computes the total without ever allocating the full list of squares — important on large inputs.

> **A note on taste:** comprehensions are for *building or aggregating* a collection. If a "comprehension" is only being used for its side effects (e.g. printing), use a plain \`for\` loop — that's clearer and what other Python developers expect.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "sorted-evens",
            title: "Sorted evens, the comprehension way",
            prompt: `Return the **even** numbers of \`nums\`, **sorted ascending**, as a list.

\`\`\`text
sorted_evens([5, 3, 8, 1, 9, 2, 6]) -> [2, 6, 8]
sorted_evens([1, 3, 5])             -> []
\`\`\`

A filtering comprehension plus \`sorted\` does it in one line: \`sorted(n for n in nums if n % 2 == 0)\`. (\`n % 2 == 0\` correctly includes negatives and zero.)`,
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
            starterCode: `def sorted_evens(nums):
    # Filter to evens, sort ascending, return a list.
    pass
`,
            solution: `def sorted_evens(nums):
    return sorted(n for n in nums if n % 2 == 0)
`,
            hints: [
              "`n % 2 == 0` selects even numbers.",
              "A generator expression `(n for n in nums if n % 2 == 0)` filters lazily.",
              "Wrap it in `sorted(...)`, which returns a new sorted list.",
            ],
          },
        },
      ],
    },
  ],
};
