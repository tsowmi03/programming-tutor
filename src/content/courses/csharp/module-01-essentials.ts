import type { CourseModule } from "../types";

export const csharpEssentials: CourseModule = {
  slug: "essentials",
  title: "C# Essentials for Programmers",
  description:
    "You already know how to code. This module maps what you know onto C#'s syntax, type system, and the handful of conventions that trip people up coming from other languages.",
  lessons: [
    {
      slug: "types-and-methods",
      title: "Types, variables, and methods",
      summary: "The type system, var, and how methods are declared.",
      blocks: [
        {
          kind: "prose",
          markdown: `## C# in one breath

C# is a **statically typed**, compiled, object-oriented language. Every value has a type known at compile time, every piece of code lives inside a type (usually a \`class\`), and the compiler catches a whole class of mistakes before you ever run anything.

If you come from Python or JavaScript, the biggest adjustment is that you declare types. If you come from Java, C# will feel familiar — with sharper edges filed off.

\`\`\`csharp
int count = 42;          // a 32-bit integer
double ratio = 3.14;     // 64-bit floating point
bool ready = true;       // true / false (lowercase!)
string name = "Ada";     // immutable text, double quotes only
char initial = 'A';      // a single character, single quotes
\`\`\`

### Let the compiler infer with \`var\`

When the type is obvious from the right-hand side, \`var\` saves you repeating it. The variable is **still statically typed** — \`var\` is inference, not "any".

\`\`\`csharp
var count = 42;             // inferred as int
var names = new List<int>(); // inferred as List<int>
// count = "oops";          // compile error: can't assign string to int
\`\`\`

Use \`var\` when the type is clear from the expression, and spell the type out when it aids readability. Both compile to identical code.`,
        },
        {
          kind: "prose",
          markdown: `## Methods live inside classes

There are no free-floating functions. A method belongs to a type and has an explicit return type (\`void\` if it returns nothing). On this site, exercises follow the standard convention: you implement a public method on a class named \`Solution\`.

\`\`\`csharp
public class Solution {
    // returnType  Name(parameters) { ... }
    public int Add(int a, int b) {
        return a + b;
    }

    // Single-expression methods can use "expression body" syntax:
    public int Square(int n) => n * n;
}
\`\`\`

A few conventions to absorb now, because C# code everywhere follows them:

- **Methods and public members are \`PascalCase\`** (\`Add\`, \`Square\`, \`Count\`) — unlike the \`camelCase\` you may be used to.
- **Local variables and parameters are \`camelCase\`** (\`a\`, \`b\`, \`runningTotal\`).
- Statements end with a semicolon; blocks use braces.

> **Why the method names are capitalised in these exercises:** the autograder calls a PascalCase method on your \`Solution\` class. The task will always tell you the exact name and signature to implement.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "triple",
            title: "Your first C# method",
            prompt: `Implement \`Triple\` so it returns three times its argument.

This is a warm-up to get the workflow under your fingers: write the method body, hit **Run** to check the sample cases, then **Submit** to run the hidden tests too.

\`\`\`text
Triple(4)  -> 12
Triple(-2) -> -6
\`\`\``,
            signature: {
              name: "triple",
              params: [{ name: "n", type: "int" }],
              returns: "int",
            },
            tests: [
              { input: [4], expected: 12 },
              { input: [0], expected: 0 },
              { input: [-2], expected: -6, hidden: true },
              { input: [1000], expected: 3000, hidden: true },
            ],
            starterCode: `public class Solution {
    public int Triple(int n) {
        // Return three times n.
    }
}`,
            solution: `public class Solution {
    public int Triple(int n) {
        return 3 * n;
    }
}`,
            hints: [
              "The method already declares it returns an `int` — you just need a `return` statement.",
              "`return 3 * n;` is the whole body.",
            ],
          },
        },
      ],
    },
    {
      slug: "value-vs-reference",
      title: "Value types vs reference types",
      summary: "The single most important distinction in C#'s memory model.",
      blocks: [
        {
          kind: "prose",
          markdown: `## The distinction that explains everything

Every C# type is either a **value type** or a **reference type**, and which one it is governs how assignment, equality, and argument passing behave. Get this right and a lot of "wait, why did that change?" bugs disappear.

| | Value types | Reference types |
|---|---|---|
| Examples | \`int\`, \`double\`, \`bool\`, \`char\`, \`struct\` | \`string\`, arrays, \`List<T>\`, classes |
| Variable holds | the value itself | a reference to an object |
| Assignment copies | the value | the reference (both point at one object) |

\`\`\`csharp
int a = 5;
int b = a;     // b is an independent copy
b = 99;        // a is still 5

int[] x = { 1, 2, 3 };
int[] y = x;   // y references the SAME array as x
y[0] = 99;     // x[0] is now 99 too
\`\`\`

This is exactly the same model as most languages with objects — primitives copy, objects share — C# just makes the categories explicit and lets you define your own value types with \`struct\`.`,
        },
        {
          kind: "prose",
          markdown: `## null, and how C# protects you from it

Reference types can be \`null\` (no object). Value types cannot be \`null\` unless you opt in with a \`?\`:

\`\`\`csharp
string? maybeName = null;   // nullable reference
int? maybeCount = null;     // nullable value type
int definitelyCount = 0;    // can never be null
\`\`\`

Two operators make null-handling concise and are everywhere in idiomatic C#:

\`\`\`csharp
// ?. — null-conditional: short-circuits to null instead of throwing
int? length = maybeName?.Length;

// ?? — null-coalescing: supply a fallback
int safeLength = maybeName?.Length ?? 0;
\`\`\`

### Equality has a twist

\`==\` compares **values** for value types and **references** for most class types — but \`string\` overloads \`==\` to compare contents, which is usually what you want:

\`\`\`csharp
"abc" == "ab" + "c"   // true — string compares by value
\`\`\`

For collections, \`==\` checks identity, not contents — to compare elements you iterate or use a helper. The autograder handles that comparison for you; just return the right array and it checks element-by-element.`,
        },
      ],
    },
    {
      slug: "control-flow",
      title: "Control flow and iteration",
      summary: "if/switch, the four loops, and foreach.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Branching

\`if\`/\`else if\`/\`else\` work as you'd expect. The condition **must** be a \`bool\` — there is no "truthiness", so \`if (count)\` is a compile error; write \`if (count != 0)\`.

\`switch\` is more powerful than in many languages. The classic form:

\`\`\`csharp
switch (grade) {
    case 'A':
        return "excellent";
    case 'B':
    case 'C':                 // fall-through by stacking labels
        return "solid";
    default:
        return "keep going";
}
\`\`\`

Modern C# also has a \`switch\` **expression**, which returns a value and is wonderfully compact:

\`\`\`csharp
string label = grade switch {
    'A' => "excellent",
    'B' or 'C' => "solid",
    _ => "keep going",   // _ is the default arm
};
\`\`\``,
        },
        {
          kind: "prose",
          markdown: `## The loops

\`\`\`csharp
for (int i = 0; i < n; i++) { /* index-based */ }

while (condition) { /* until condition is false */ }

do { /* runs at least once */ } while (condition);

// foreach: iterate the elements of any collection directly
foreach (int value in numbers) {
    Console.WriteLine(value);
}
\`\`\`

\`foreach\` is the idiomatic choice whenever you don't need the index — it's clearer and works over arrays, \`List<T>\`, dictionaries, strings (which iterate as \`char\`), and anything else enumerable. Reach for a \`for\` loop when you need the index itself (e.g. comparing \`nums[i]\` with \`nums[i + 1]\`).

\`break\` exits the nearest loop; \`continue\` skips to the next iteration.

> **Printing for debugging:** \`Console.WriteLine(x)\` prints to standard output. Anything you print shows up in the test panel under "Your prints" — handy while figuring out a problem, and ignored when grading your return value.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "count-vowels",
            title: "Count the vowels",
            prompt: `Return the number of vowels (\`a e i o u\`, upper- or lower-case) in the string \`s\`.

\`\`\`text
CountVowels("Ada Lovelace") -> 6
CountVowels("xyz")          -> 0
\`\`\`

A string iterates as a sequence of \`char\` with \`foreach\`. A neat trick: \`"aeiou".Contains(c)\` after lower-casing \`c\`, or a \`switch\`.`,
            signature: {
              name: "countVowels",
              params: [{ name: "s", type: "string" }],
              returns: "int",
            },
            tests: [
              { input: ["Ada Lovelace"], expected: 6 },
              { input: ["xyz"], expected: 0 },
              { input: [""], expected: 0, hidden: true },
              { input: ["AEIOUaeiou"], expected: 10, hidden: true },
              { input: ["The quick brown fox"], expected: 5, hidden: true },
            ],
            starterCode: `public class Solution {
    public int CountVowels(string s) {
        // Count a, e, i, o, u (either case) and return the total.
    }
}`,
            solution: `public class Solution {
    public int CountVowels(string s) {
        int count = 0;
        foreach (char c in s) {
            char lower = char.ToLower(c);
            if (lower == 'a' || lower == 'e' || lower == 'i'
                || lower == 'o' || lower == 'u') {
                count++;
            }
        }
        return count;
    }
}`,
            hints: [
              "Iterate the characters with `foreach (char c in s)`.",
              "Normalise case first with `char.ToLower(c)` so you only test lower-case vowels.",
              "Keep a running `int count` and `count++` whenever the character is a vowel.",
            ],
          },
        },
      ],
    },
  ],
};
