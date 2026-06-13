import type { CourseModule } from "../types";

export const csharpCollections: CourseModule = {
  slug: "collections",
  title: "Collections & Generics",
  description:
    "Arrays, List<T>, Dictionary<K,V>, and HashSet<T> are the workhorses of nearly every algorithm. Learn the C# versions and the generic type system that powers them.",
  lessons: [
    {
      slug: "arrays-and-lists",
      title: "Arrays and List<T>",
      summary: "Fixed arrays vs the resizable List<T>, and when to use each.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Arrays: fixed size, fast, the lingua franca

A C# array has a length fixed at creation. It's a reference type, indexed from 0, and knows its own size via \`.Length\`.

\`\`\`csharp
int[] a = new int[3];        // {0, 0, 0} — value types default to 0
int[] b = { 10, 20, 30 };    // initialiser syntax
int[] c = new int[] { 1, 2 };

int first = b[0];            // 10
int n = b.Length;            // 3  (note: Length, not length or size)
b[1] = 99;                   // arrays are mutable
\`\`\`

Most algorithm problems hand you an \`int[]\` and expect an \`int[]\` back. Array access is O(1); the trade-off is you can't grow it. When you need to accumulate an unknown number of results, build a \`List<int>\` and convert at the end with \`.ToArray()\`.`,
        },
        {
          kind: "prose",
          markdown: `## List&lt;T&gt;: the resizable array you'll reach for constantly

\`List<T>\` is a generic, growable array. The \`<T>\` is the element type — \`List<int>\`, \`List<string>\`, \`List<int[]>\`, whatever you need.

\`\`\`csharp
var nums = new List<int>();
nums.Add(5);          // append — amortised O(1)
nums.Add(3);
int count = nums.Count;   // 2  (List uses .Count, arrays use .Length)
int x = nums[0];          // index like an array -> 5
nums[0] = 50;             // mutate by index
nums.Contains(3);         // true — O(n) linear scan
nums.Sort();              // in place
int[] asArray = nums.ToArray();
\`\`\`

The naming inconsistency catches everyone: **arrays expose \`.Length\`, \`List<T>\` exposes \`.Count\`.** Both index with \`[]\`.

### A common pattern: build up results, return an array

\`\`\`csharp
public int[] DoublesOf(int[] nums) {
    var result = new List<int>();
    foreach (int n in nums) {
        result.Add(n * 2);
    }
    return result.ToArray();
}
\`\`\``,
        },
        {
          kind: "exercise",
          exercise: {
            id: "running-max",
            title: "Running maximum",
            prompt: `Return an array \`out\` the same length as \`nums\`, where \`out[i]\` is the **maximum of \`nums[0..i]\`** (the largest value seen up to and including index \`i\`).

\`\`\`text
RunningMax([3, 1, 4, 1, 5, 9, 2]) -> [3, 3, 4, 4, 5, 9, 9]
RunningMax([5])                   -> [5]
\`\`\`

You know the output length up front (it equals the input length), so a plain \`int[]\` works well here — no \`List\` needed.`,
            signature: {
              name: "runningMax",
              params: [{ name: "nums", type: "int[]" }],
              returns: "int[]",
            },
            tests: [
              { input: [[3, 1, 4, 1, 5, 9, 2]], expected: [3, 3, 4, 4, 5, 9, 9] },
              { input: [[5]], expected: [5] },
              { input: [[-3, -1, -7]], expected: [-3, -1, -1], hidden: true },
              { input: [[2, 2, 2]], expected: [2, 2, 2], hidden: true },
              { input: [[1, 2, 3, 4, 5]], expected: [1, 2, 3, 4, 5], hidden: true },
            ],
            starterCode: `using System;

public class Solution {
    public int[] RunningMax(int[] nums) {
        // Build an array of the running maximum and return it.
    }
}`,
            solution: `using System;

public class Solution {
    public int[] RunningMax(int[] nums) {
        int[] result = new int[nums.Length];
        int best = int.MinValue;
        for (int i = 0; i < nums.Length; i++) {
            best = Math.Max(best, nums[i]);
            result[i] = best;
        }
        return result;
    }
}`,
            hints: [
              "Allocate the result up front: `int[] result = new int[nums.Length];`.",
              "Track the best value seen so far in a variable, updating it each step with `Math.Max`.",
              "`Math.Max` lives in `System` — the starter already has `using System;`.",
            ],
          },
        },
      ],
    },
    {
      slug: "dictionaries-and-sets",
      title: "Dictionaries and sets",
      summary: "Dictionary<K,V> and HashSet<T> — O(1) lookups that crack most problems.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Dictionary&lt;TKey, TValue&gt;: the hash map

If one data structure unlocks the most algorithm problems, it's the hash map. In C# it's \`Dictionary<TKey, TValue>\`: average **O(1)** insert, lookup, and removal by key.

\`\`\`csharp
var ages = new Dictionary<string, int>();
ages["Ada"] = 36;            // insert or overwrite
ages["Alan"] = 41;

bool has = ages.ContainsKey("Ada");   // true
int a = ages["Ada"];                  // 36 — but THROWS if key is missing!

// Safe lookup without a double hash + without throwing:
if (ages.TryGetValue("Grace", out int g)) {
    // runs only if the key exists; g holds the value
}
\`\`\`

Two gotchas worth burning in:

- Indexing a **missing** key with \`ages["nope"]\` throws \`KeyNotFoundException\`. Use \`ContainsKey\` or \`TryGetValue\` to check first.
- Indexing to **assign** (\`ages["new"] = 1\`) is fine — it inserts.

### The frequency-count idiom

Counting occurrences is so common it's worth memorising:

\`\`\`csharp
var freq = new Dictionary<int, int>();
foreach (int n in nums) {
    freq[n] = freq.GetValueOrDefault(n, 0) + 1;
}
\`\`\`

\`GetValueOrDefault(key, fallback)\` returns the fallback when the key is absent — perfect for "increment, starting from zero".`,
        },
        {
          kind: "prose",
          markdown: `## HashSet&lt;T&gt;: membership in O(1)

When you only care *whether* you've seen something — not how many times or what it maps to — use a \`HashSet<T>\`.

\`\`\`csharp
var seen = new HashSet<int>();
seen.Add(5);          // returns true if newly added, false if already present
seen.Contains(5);     // true — O(1) average
seen.Add(5);          // returns false: 5 was already there
\`\`\`

The fact that \`Add\` *returns whether it was new* gives you a one-liner for "is this the first time I've seen this value?" — which is the core of duplicate detection.

> **Why O(1)?** Both \`Dictionary\` and \`HashSet\` hash the key to a bucket. With a good hash and reasonable load, lookups touch only a handful of entries regardless of size. Worst case is O(n) under pathological collisions, but you can treat them as O(1) for analysis.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "two-sum",
            title: "Two Sum with a dictionary",
            prompt: `Given an array \`nums\` and a \`target\`, return the **indices** of the two numbers that add up to \`target\`, in **ascending order**. Exactly one solution exists, and you may not reuse an element.

\`\`\`text
TwoSum([2, 7, 11, 15], 9) -> [0, 1]   // 2 + 7
TwoSum([3, 2, 4], 6)      -> [1, 2]   // 2 + 4
\`\`\`

The brute force checks every pair in O(n²). With a dictionary mapping **value → index**, you can do it in a single O(n) pass: for each number, its needed partner is \`target - n\`. Look that up before inserting the current number.`,
            signature: {
              name: "twoSum",
              params: [
                { name: "nums", type: "int[]" },
                { name: "target", type: "int" },
              ],
              returns: "int[]",
            },
            tests: [
              { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
              { input: [[3, 2, 4], 6], expected: [1, 2] },
              { input: [[3, 3], 6], expected: [0, 1], hidden: true },
              { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4], hidden: true },
              { input: [[0, 4, 3, 0], 0], expected: [0, 3], hidden: true },
            ],
            starterCode: `using System.Collections.Generic;

public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        // Use a Dictionary<int, int> mapping value -> index.
    }
}`,
            solution: `using System.Collections.Generic;

public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        var seen = new Dictionary<int, int>(); // value -> index
        for (int i = 0; i < nums.Length; i++) {
            int complement = target - nums[i];
            if (seen.TryGetValue(complement, out int j)) {
                return new int[] { j, i };
            }
            seen[nums[i]] = i;
        }
        return new int[] { };
    }
}`,
            hints: [
              "For each value `nums[i]`, the partner you need is `target - nums[i]`.",
              "Check whether that complement is already in the dictionary BEFORE inserting the current value — that guarantees two distinct indices.",
              "Store value → index: `seen[nums[i]] = i;`. Earlier indices are inserted first, so the returned pair is already ascending.",
            ],
          },
        },
      ],
    },
    {
      slug: "generics",
      title: "Generics, briefly",
      summary: "Why List<T> and Dictionary<K,V> have those angle brackets.",
      blocks: [
        {
          kind: "prose",
          markdown: `## What the &lt;T&gt; actually means

You've been using generics already: \`List<int>\`, \`Dictionary<string, int>\`, \`HashSet<int>\`. **Generics** let a type or method be written once and reused for any element type, with full compile-time type safety and no boxing of value types.

\`List<int>\` and \`List<string>\` share one implementation; \`T\` is a placeholder filled in when you use it. The payoff over an "object holds anything" container:

- The compiler stops you putting a \`string\` into a \`List<int>\`.
- No casts when you read elements back out.
- Value types aren't boxed onto the heap, so it's faster.

You can write your own generic methods too. The type parameter goes in angle brackets after the name:

\`\`\`csharp
public T First<T>(T[] items) => items[0];

int a = First(new int[] { 1, 2, 3 });        // T inferred as int
string s = First(new string[] { "x", "y" }); // T inferred as string
\`\`\`

For algorithm work you'll mostly *consume* the generic collections rather than author new generic types — but knowing \`<T>\` is "the element type, decided at the call site" demystifies every signature in the standard library.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "contains-duplicate",
            title: "Contains duplicate",
            prompt: `Return \`true\` if any value appears **at least twice** in \`nums\`, and \`false\` if every element is distinct.

\`\`\`text
ContainsDuplicate([1, 2, 3, 1]) -> true
ContainsDuplicate([1, 2, 3, 4]) -> false
\`\`\`

A \`HashSet<int>\` makes this a clean O(n): try to add each value; the first time \`Add\` returns \`false\`, you've found a repeat.`,
            signature: {
              name: "containsDuplicate",
              params: [{ name: "nums", type: "int[]" }],
              returns: "bool",
            },
            tests: [
              { input: [[1, 2, 3, 1]], expected: true },
              { input: [[1, 2, 3, 4]], expected: false },
              { input: [[]], expected: false, hidden: true },
              { input: [[7]], expected: false, hidden: true },
              { input: [[5, 5, 5, 5]], expected: true, hidden: true },
              { input: [[-1, -2, -3, -2]], expected: true, hidden: true },
            ],
            starterCode: `using System.Collections.Generic;

public class Solution {
    public bool ContainsDuplicate(int[] nums) {
        // A HashSet<int> tracks what you've already seen.
    }
}`,
            solution: `using System.Collections.Generic;

public class Solution {
    public bool ContainsDuplicate(int[] nums) {
        var seen = new HashSet<int>();
        foreach (int n in nums) {
            if (!seen.Add(n)) {
                return true;
            }
        }
        return false;
    }
}`,
            hints: [
              "`HashSet<T>.Add` returns `false` when the value was already present.",
              "Loop once; the moment `seen.Add(n)` is `false`, return `true`.",
              "If the loop finishes without a repeat, return `false`.",
            ],
          },
        },
      ],
    },
  ],
};
