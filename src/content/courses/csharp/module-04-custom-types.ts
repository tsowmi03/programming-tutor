import type { CourseModule } from "../types";

export const csharpCustomTypes: CourseModule = {
  slug: "custom-types",
  title: "Defining Your Own Types",
  description:
    "Classes, records, and structs let you model the entities in a problem. Interfaces and IComparable give you reusable, sortable abstractions — the foundation for custom data structures.",
  lessons: [
    {
      slug: "classes-records-structs",
      title: "Classes, records, and structs",
      summary: "Three ways to define a type, and which to pick.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Classes: the default

A \`class\` bundles data (fields/properties) with behaviour (methods). It's a **reference type** — variables hold a reference, assignment shares the object.

\`\`\`csharp
public class Point {
    public int X { get; set; }   // auto-property
    public int Y { get; set; }

    public Point(int x, int y) { // constructor
        X = x;
        Y = y;
    }

    public int ManhattanFromOrigin() => System.Math.Abs(X) + System.Math.Abs(Y);
}

var p = new Point(3, -4);
int d = p.ManhattanFromOrigin();   // 7
\`\`\`

\`{ get; set; }\` is an **auto-property**: a field with a getter and setter generated for you. Use \`{ get; }\` (or \`{ get; init; }\`) for read-only data set once in the constructor.`,
        },
        {
          kind: "prose",
          markdown: `## Record classes: classes optimised for data

A \`record class\` is a class tuned for holding immutable data. The positional form declares properties, a constructor, value-based equality, and a readable \`ToString()\` in a single line:

\`\`\`csharp
public record Person(string Name, int Age);

var a = new Person("Ada", 36);
var b = new Person("Ada", 36);
bool same = a == b;          // true! records compare by VALUE, not reference
var older = a with { Age = 37 };  // non-destructive copy
\`\`\`

That value equality is the headline difference from a class, where \`==\` compares references. Reach for a record when a type is essentially "a bag of values" — coordinates, a parsed token, a key made of two fields.

Records can also be declared as \`record struct\`, which combines the generated record behavior with value-type copy semantics.

## Structs: value-type bundles

A \`struct\` looks like a class but is a **value type**, so assignment copies its data. Its storage depends on context: a struct may be inline in a local, array, field, or containing object, and boxing places a copy on the managed heap. Use structs for small values where copy semantics are desirable (the built-in \`int\`, \`bool\`, and \`DateTime\` are all structs). For most algorithm work, classes and records cover you; the rule to remember is value semantics, not a fixed storage location.

> **Picking one:** class by default; record when it's immutable data with value equality; struct for small value-semantic bundles. When in doubt, use a class.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "initials",
            title: "Extract initials",
            prompt: `Given an array of full names, return an array of **upper-case initials** — the first letter of each space-separated word, joined together.

\`\`\`text
Initials(["ada lovelace", "alan turing"]) -> ["AL", "AT"]
Initials(["grace brewster murray hopper"]) -> ["GBMH"]
\`\`\`

Each name has at least one word; words are separated by single spaces. \`Split(' ')\` gives you the words, and \`char.ToUpper(word[0])\` gives an initial. A \`StringBuilder\` (or string concatenation, since it's short) assembles each result.`,
            signature: {
              name: "initials",
              params: [{ name: "names", type: "string[]" }],
              returns: "string[]",
            },
            tests: [
              {
                input: [["ada lovelace", "alan turing"]],
                expected: ["AL", "AT"],
              },
              {
                input: [["grace brewster murray hopper"]],
                expected: ["GBMH"],
              },
              { input: [[]], expected: [], hidden: true },
              { input: [["plato"]], expected: ["P"], hidden: true },
              {
                input: [["john von neumann", "kurt godel"]],
                expected: ["JVN", "KG"],
                hidden: true,
              },
            ],
            starterCode: `using System.Text;

public class Solution {
    public string[] Initials(string[] names) {
        // For each name, take the first letter of each word, upper-cased.
    }
}`,
            solution: `using System.Text;

public class Solution {
    public string[] Initials(string[] names) {
        string[] result = new string[names.Length];
        for (int i = 0; i < names.Length; i++) {
            var sb = new StringBuilder();
            foreach (string word in names[i].Split(' ')) {
                sb.Append(char.ToUpper(word[0]));
            }
            result[i] = sb.ToString();
        }
        return result;
    }
}`,
            hints: [
              "Allocate `string[] result = new string[names.Length];` and fill it by index.",
              "`names[i].Split(' ')` returns the words of one name.",
              "For each word, append `char.ToUpper(word[0])` to a StringBuilder, then store `sb.ToString()`.",
            ],
          },
        },
      ],
    },
    {
      slug: "interfaces-and-sorting",
      title: "Interfaces and custom sorting",
      summary: "IComparable, comparison lambdas, and ordering by your own rules.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Interfaces: contracts without implementation

An **interface** declares members a type promises to provide, with no implementation. Code can then work with *any* type that fulfils the contract.

\`\`\`csharp
public interface IShape {
    double Area();
}

public class Circle : IShape {     // ": IShape" = "implements IShape"
    public double Radius { get; init; }
    public double Area() => System.Math.PI * Radius * Radius;
}
\`\`\`

The standard library is built on interfaces you already use: \`IEnumerable<T>\` (can be iterated), \`IList<T>\`, \`IDictionary<K,V>\`. Accepting an interface rather than a concrete type makes code reusable.

## Ordering: IComparable and comparison lambdas

To sort your own type, either implement \`IComparable<T>\` (define the natural order once)…

\`\`\`csharp
public class Score : System.IComparable<Score> {
    public int Value { get; init; }
    public int CompareTo(Score other) => Value.CompareTo(other.Value);
}
\`\`\`

…or pass a comparison/key selector at the sort site, which is more flexible:

\`\`\`csharp
int[] nums = { 5, 1, 4, 2 };
System.Array.Sort(nums);                       // natural ascending order

var list = new System.Collections.Generic.List<int> { 5, 1, 4, 2 };
list.Sort((a, b) => b.CompareTo(a));           // custom: descending
\`\`\`

A comparison function returns **negative** if \`a\` should come first, **positive** if \`b\` should, and **zero** if they tie. With LINQ, the same intent reads as \`OrderBy(keySelector).ThenBy(tieBreaker)\`.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "sort-by-frequency",
            title: "Sort by frequency",
            prompt: `Sort \`nums\` so that values appearing **more often come first**. Break ties (equal frequencies) by **smaller value first**. Return the reordered array — every element of the input appears, just reordered.

\`\`\`text
SortByFrequency([1, 1, 2, 2, 2, 3]) -> [2, 2, 2, 1, 1, 3]
SortByFrequency([4, 5, 6, 5, 4, 4]) -> [4, 4, 4, 5, 5, 6]
\`\`\`

Count frequencies in a dictionary, then sort with a two-level comparison: primary key = frequency (descending), tie-breaker = value (ascending). LINQ's \`OrderByDescending(...).ThenBy(...)\` expresses this directly.`,
            signature: {
              name: "sortByFrequency",
              params: [{ name: "nums", type: "int[]" }],
              returns: "int[]",
            },
            tests: [
              {
                input: [[1, 1, 2, 2, 2, 3]],
                expected: [2, 2, 2, 1, 1, 3],
              },
              {
                input: [[4, 5, 6, 5, 4, 4]],
                expected: [4, 4, 4, 5, 5, 6],
              },
              { input: [[]], expected: [], hidden: true },
              { input: [[7, 7, 7]], expected: [7, 7, 7], hidden: true },
              {
                input: [[3, 1, 2]],
                expected: [1, 2, 3],
                hidden: true,
              },
              {
                input: [[5, 5, 4, 4, 3, 3]],
                expected: [3, 3, 4, 4, 5, 5],
                hidden: true,
              },
            ],
            starterCode: `using System.Linq;
using System.Collections.Generic;

public class Solution {
    public int[] SortByFrequency(int[] nums) {
        // Count frequencies, then sort by (frequency desc, value asc).
    }
}`,
            solution: `using System.Linq;
using System.Collections.Generic;

public class Solution {
    public int[] SortByFrequency(int[] nums) {
        var freq = new Dictionary<int, int>();
        foreach (int n in nums) {
            freq[n] = freq.GetValueOrDefault(n, 0) + 1;
        }
        return nums
            .OrderByDescending(n => freq[n])
            .ThenBy(n => n)
            .ToArray();
    }
}`,
            hints: [
              "First build a `Dictionary<int, int>` of value → count.",
              "`OrderByDescending(n => freq[n])` sorts most-frequent first.",
              "Chain `.ThenBy(n => n)` so ties break by smaller value, then `.ToArray()`.",
            ],
          },
        },
      ],
    },
  ],
};
