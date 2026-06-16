import type { CourseModule } from "../types";

export const csharpLanguageDepth: CourseModule = {
  slug: "language-depth",
  title: "The C# Type System in Practice",
  description:
    "Move past surface syntax into the rules that govern numeric code, conversions, method contracts, equality, nullability, and recoverable input.",
  lessons: [
    {
      slug: "numeric-types-and-conversions",
      title: "Numeric types, overflow, and conversions",
      summary:
        "Choose numeric types deliberately and understand what C# converts for you.",
      blocks: [
        {
          kind: "prose",
          markdown: `## The numeric types are different tools

C# has several integer and floating-point types. The common choices are:

| Type | Typical use |
|---|---|
| \`int\` | everyday whole numbers and array indices |
| \`long\` | whole numbers that may exceed about 2.1 billion |
| \`double\` | scientific or approximate decimal calculations |
| \`decimal\` | money and other base-10 calculations where decimal precision matters |

An operation is normally performed using the operand types. Two \`int\` values produce an \`int\`, even if you assign the result to a \`long\` afterward:

\`\`\`csharp
int a = 2_000_000_000;
int b = 2_000_000_000;

long wrong = a + b;          // overflow occurs before assignment
long right = (long)a + b;    // convert one operand before adding
\`\`\`

Integer division also stays integer:

\`\`\`csharp
int whole = 7 / 2;           // 3
double precise = 7 / 2.0;    // 3.5
\`\`\`

Use \`checked\` when overflow should become an exception rather than wrap silently:

\`\`\`csharp
int result = checked(a + b); // throws OverflowException
\`\`\``,
        },
        {
          kind: "prose",
          markdown: `## Implicit and explicit conversions

C# allows a conversion implicitly when every source value fits in the destination type:

\`\`\`csharp
int count = 10;
long wideCount = count;      // safe, so no cast is needed
\`\`\`

A narrowing conversion needs a cast because information may be lost:

\`\`\`csharp
double measurement = 9.8;
int truncated = (int)measurement; // 9, not 10
\`\`\`

For user input, prefer parsing APIs over casts:

\`\`\`csharp
int parsed = int.Parse("42");               // throws on invalid input
bool ok = int.TryParse("42", out int value); // false instead of throwing
\`\`\`

Numeric literals can use separators for readability, such as \`1_000_000\`, and suffixes when the intended type is not the default: \`10L\`, \`3.5m\`, \`2.0f\`.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "safe-average",
            title: "Average without intermediate overflow",
            prompt: `Return the integer average of the non-empty array \`nums\`.

Use integer division, so any fractional part is discarded. The sum may exceed the range of \`int\`, even though the final average always fits in an \`int\`.

\`\`\`text
SafeAverage([2, 4, 6])                         -> 4
SafeAverage([2_147_483_647, 2_147_483_647])   -> 2_147_483_647
\`\`\`

Accumulate into a \`long\`, divide by \`nums.Length\`, then cast the final result to \`int\`.`,
            signature: {
              name: "safeAverage",
              params: [{ name: "nums", type: "int[]" }],
              returns: "int",
            },
            tests: [
              { input: [[2, 4, 6]], expected: 4 },
              { input: [[5]], expected: 5 },
              {
                input: [[2147483647, 2147483647]],
                expected: 2147483647,
              },
              { input: [[-5, -4]], expected: -4, hidden: true },
              {
                input: [[2147483647, -2147483648]],
                expected: 0,
                hidden: true,
              },
            ],
            starterCode: `public class Solution {
    public int SafeAverage(int[] nums) {
        // Sum in a type wide enough to avoid int overflow.
    }
}`,
            solution: `public class Solution {
    public int SafeAverage(int[] nums) {
        long total = 0;
        foreach (int n in nums) {
            total += n;
        }
        return (int)(total / nums.Length);
    }
}`,
            hints: [
              "Declare the running total as `long`, not `int`.",
              "Adding an `int` to a `long` produces a `long` result.",
              "Divide the completed total by `nums.Length`, then cast the result to `int`.",
            ],
          },
        },
      ],
    },
    {
      slug: "operators-and-patterns",
      title: "Operators, ranges, and pattern-based branching",
      summary:
        "Use C# operators precisely and turn multi-branch rules into readable code.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Operators have types too

The arithmetic operators are familiar, but their result follows C#'s type rules. Comparison operators return \`bool\`, and logical operators require Boolean operands:

\`\`\`csharp
bool inside = value >= min && value <= max;
bool outside = value < min || value > max;
bool opposite = !inside;
\`\`\`

\`&&\` and \`||\` short-circuit. The right side is evaluated only when needed, which makes guarded access safe:

\`\`\`csharp
if (items != null && items.Length > 0) {
    // Length is read only when items is not null.
}
\`\`\`

The conditional operator chooses one of two values:

\`\`\`csharp
string parity = n % 2 == 0 ? "even" : "odd";
\`\`\`

For more than two cases, a \`switch\` expression can keep a classification rule in one place:

\`\`\`csharp
string band = score switch {
    < 0 or > 100 => "invalid",
    < 50 => "fail",
    < 85 => "pass",
    _ => "distinction",
};
\`\`\`

Modern patterns can match constants, ranges, types, properties, and combinations using \`and\`, \`or\`, and \`not\`. An \`if\` chain remains appropriate when the conditions are stateful or need several statements.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "classify-score",
            title: "Classify a score",
            prompt: `Return a label for \`score\` using these exact ranges:

- below 0 or above 100: \`"invalid"\`
- 0 through 49: \`"fail"\`
- 50 through 84: \`"pass"\`
- 85 through 100: \`"distinction"\`

\`\`\`text
ClassifyScore(-1) -> "invalid"
ClassifyScore(72) -> "pass"
ClassifyScore(90) -> "distinction"
\`\`\`

Implement the ranges in an order that makes every boundary unambiguous.`,
            signature: {
              name: "classifyScore",
              params: [{ name: "score", type: "int" }],
              returns: "string",
            },
            tests: [
              { input: [-1], expected: "invalid" },
              { input: [49], expected: "fail" },
              { input: [72], expected: "pass" },
              { input: [90], expected: "distinction" },
              { input: [0], expected: "fail", hidden: true },
              { input: [50], expected: "pass", hidden: true },
              { input: [85], expected: "distinction", hidden: true },
              { input: [101], expected: "invalid", hidden: true },
            ],
            starterCode: `public class Solution {
    public string ClassifyScore(int score) {
        // Return invalid, fail, pass, or distinction.
    }
}`,
            solution: `public class Solution {
    public string ClassifyScore(int score) {
        if (score < 0 || score > 100) return "invalid";
        if (score < 50) return "fail";
        if (score < 85) return "pass";
        return "distinction";
    }
}`,
            hints: [
              "Reject values outside 0 through 100 first.",
              "After invalid values are gone, checking only each upper boundary is enough.",
              "Test the exact boundaries 49/50 and 84/85.",
            ],
          },
        },
      ],
    },
    {
      slug: "method-contracts",
      title: "Method contracts and parameter design",
      summary:
        "Design methods with clear inputs, outputs, helpers, and mutation rules.",
      blocks: [
        {
          kind: "prose",
          markdown: `## A signature is a contract

A method signature states what callers must provide and what they receive:

\`\`\`csharp
public static int Clamp(int value, int min, int max)
\`\`\`

Good method design keeps each method focused, names side effects clearly, and avoids surprising mutation. Parameters are passed **by value** by default:

- A value-type argument copies its value.
- A reference-type argument copies the reference. The method can mutate the referenced object, but assigning the parameter to another object does not replace the caller's variable.

\`ref\`, \`out\`, and \`in\` change parameter passing:

\`\`\`csharp
void Swap(ref int a, ref int b) { ... }       // read and write caller variables
bool TryRead(string text, out int value) { ... } // must assign value
int Inspect(in LargeStruct value) { ... }     // read-only by reference
\`\`\`

Use them when the contract truly needs those semantics. Returning a value is usually simpler.`,
        },
        {
          kind: "prose",
          markdown: `## Optional, named, and variable-length arguments

Optional parameters have compile-time defaults:

\`\`\`csharp
public string FormatName(string name, bool upper = false) { ... }
\`\`\`

Named arguments make Boolean-heavy calls easier to read:

\`\`\`csharp
FormatName("Ada", upper: true);
\`\`\`

\`params\` lets callers pass zero or more arguments, exposed to the method as an array:

\`\`\`csharp
public int Sum(params int[] values) { ... }
Sum(1, 2, 3);
\`\`\`

Overloads share a name but accept different parameter lists. Keep overloads consistent so callers do not have to learn several meanings for one method name.

Private helper methods are useful when they give a repeated rule a name. They also make the public method read as a sequence of intentions rather than implementation details.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "sum-inclusive-range",
            title: "Sum an inclusive range",
            prompt: `Return the sum of every integer from \`start\` to \`end\`, inclusive.

The arguments may arrive in either order. Treat \`SumInclusive(5, 2)\` the same as \`SumInclusive(2, 5)\`.

\`\`\`text
SumInclusive(2, 5)  -> 14
SumInclusive(5, 2)  -> 14
SumInclusive(-2, 2) -> 0
\`\`\`

Use a small private helper or a local swap to establish the lower and upper bounds before looping.`,
            signature: {
              name: "sumInclusive",
              params: [
                { name: "start", type: "int" },
                { name: "end", type: "int" },
              ],
              returns: "int",
            },
            tests: [
              { input: [2, 5], expected: 14 },
              { input: [5, 2], expected: 14 },
              { input: [-2, 2], expected: 0 },
              { input: [7, 7], expected: 7, hidden: true },
              { input: [-5, -3], expected: -12, hidden: true },
            ],
            starterCode: `public class Solution {
    public int SumInclusive(int start, int end) {
        // Normalise the bounds, then add every value in the range.
    }
}`,
            solution: `public class Solution {
    public int SumInclusive(int start, int end) {
        int lower = System.Math.Min(start, end);
        int upper = System.Math.Max(start, end);
        int total = 0;
        for (int value = lower; value <= upper; value++) {
            total += value;
        }
        return total;
    }
}`,
            hints: [
              "`Math.Min` and `Math.Max` can establish the bounds regardless of argument order.",
              "The upper endpoint is included, so loop while `value <= upper`.",
              "Return the accumulated total after the loop.",
            ],
          },
        },
      ],
    },
    {
      slug: "nullability-and-equality",
      title: "Nullability, equality, and comparison",
      summary:
        "Distinguish identity from value equality and compare strings intentionally.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Nullable annotations describe intent

With nullable reference types enabled, \`string\` means "expected to be non-null" and \`string?\` means "null is an allowed state". These annotations guide compiler analysis; they do not create a different runtime type.

\`\`\`csharp
string? candidate = FindName();
if (candidate is not null) {
    Console.WriteLine(candidate.Length);
}
\`\`\`

Useful operators include:

- \`?.\` for null-conditional access.
- \`??\` for a fallback value.
- \`??=\` for assigning only when the current value is null.
- \`!\` for suppressing a warning when you can prove a value is non-null. Use it sparingly because it adds no runtime check.

For nullable value types such as \`int?\`, inspect \`.HasValue\`, use \`.Value\` after checking, or use pattern matching: \`if (count is int n)\`.`,
        },
        {
          kind: "prose",
          markdown: `## Equality depends on the type

Reference identity asks whether two variables point to the same object. Value equality asks whether their contents mean the same thing.

- Most classes inherit reference-based equality unless they override it.
- Records generate value-based equality.
- Structs have value semantics.
- Strings compare their text by value.
- Arrays and \`List<T>\` do not compare elements with \`==\`.

For strings, state the comparison rule. Usernames, identifiers, and protocol values usually need ordinal comparison rather than culture-aware sorting:

\`\`\`csharp
bool exact = string.Equals(a, b, StringComparison.Ordinal);
bool ignoreCase = string.Equals(
    a,
    b,
    StringComparison.OrdinalIgnoreCase
);
\`\`\`

\`ToLower()\` before comparing allocates new strings and can introduce culture-dependent behavior. A comparison API is clearer and safer.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "index-of-ignore-case",
            title: "Case-insensitive ordinal lookup",
            prompt: `Return the first index in \`values\` whose text equals \`target\`, ignoring case. Return \`-1\` when there is no match.

Use \`StringComparison.OrdinalIgnoreCase\`; do not allocate lower-case copies of every string.

\`\`\`text
IndexOfIgnoreCase(["Ada", "Grace"], "ada") -> 0
IndexOfIgnoreCase(["Ada", "Grace"], "Linus") -> -1
\`\`\``,
            signature: {
              name: "indexOfIgnoreCase",
              params: [
                { name: "values", type: "string[]" },
                { name: "target", type: "string" },
              ],
              returns: "int",
            },
            tests: [
              { input: [["Ada", "Grace"], "ada"], expected: 0 },
              { input: [["Ada", "Grace"], "GRACE"], expected: 1 },
              { input: [["Ada", "Grace"], "Linus"], expected: -1 },
              { input: [[], "anything"], expected: -1, hidden: true },
              {
                input: [["same", "SAME"], "Same"],
                expected: 0,
                hidden: true,
              },
            ],
            starterCode: `using System;

public class Solution {
    public int IndexOfIgnoreCase(string[] values, string target) {
        // Return the first ordinal, case-insensitive match.
    }
}`,
            solution: `using System;

public class Solution {
    public int IndexOfIgnoreCase(string[] values, string target) {
        for (int i = 0; i < values.Length; i++) {
            if (string.Equals(
                values[i],
                target,
                StringComparison.OrdinalIgnoreCase
            )) {
                return i;
            }
        }
        return -1;
    }
}`,
            hints: [
              "Loop by index because the required result is an index.",
              "Call `string.Equals(values[i], target, StringComparison.OrdinalIgnoreCase)`.",
              "Return immediately on the first match; otherwise return `-1` after the loop.",
            ],
          },
        },
      ],
    },
    {
      slug: "exceptions-and-try-pattern",
      title: "Exceptions and the Try pattern",
      summary:
        "Separate exceptional failures from expected invalid input.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Exceptions report failed operations

\`try\`, \`catch\`, and \`finally\` define how a method responds when an operation cannot complete:

\`\`\`csharp
try {
    return int.Parse(text);
}
catch (FormatException) {
    return 0;
}
finally {
    // Runs whether the operation succeeded or failed.
}
\`\`\`

Catch only exceptions you can handle meaningfully. A broad \`catch (Exception)\` can hide programming errors and make failures difficult to diagnose. When rethrowing the same exception, use \`throw;\` to preserve the original stack trace.

Throw argument exceptions near the public boundary when callers violate a method contract:

\`\`\`csharp
if (count < 0) {
    throw new ArgumentOutOfRangeException(nameof(count));
}
\`\`\``,
        },
        {
          kind: "prose",
          markdown: `## Expected invalid input is not exceptional

Parsing user-entered text is expected to fail sometimes. .NET APIs commonly expose a **Try pattern** for that case:

\`\`\`csharp
if (int.TryParse(text, out int number)) {
    // number is available here
}
\`\`\`

The method returns \`bool\` and writes the result to an \`out\` parameter only when successful. Similar APIs include \`Dictionary.TryGetValue\`, \`DateTime.TryParse\`, \`Enum.TryParse\`, and queue/stack Try methods.

Use exceptions for a failed operation that callers cannot reasonably predict from ordinary control flow. Use a Try method when failure is a normal branch of the operation.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "sum-valid-integers",
            title: "Sum only valid integers",
            prompt: `Each element of \`values\` is user-entered text. Parse the valid integers and return their sum. Ignore invalid entries.

\`\`\`text
SumValidIntegers(["10", "oops", "-3"]) -> 7
SumValidIntegers(["", "4.5", "8"])     -> 8
\`\`\`

Use \`int.TryParse\` so invalid input follows ordinary control flow rather than throwing an exception.`,
            signature: {
              name: "sumValidIntegers",
              params: [{ name: "values", type: "string[]" }],
              returns: "int",
            },
            tests: [
              { input: [["10", "oops", "-3"]], expected: 7 },
              { input: [["", "4.5", "8"]], expected: 8 },
              { input: [[]], expected: 0 },
              {
                input: [["0", " 12 ", "-2", "none"]],
                expected: 10,
                hidden: true,
              },
              {
                input: [["2147483648", "1"]],
                expected: 1,
                hidden: true,
              },
            ],
            starterCode: `public class Solution {
    public int SumValidIntegers(string[] values) {
        // Add entries for which int.TryParse succeeds.
    }
}`,
            solution: `public class Solution {
    public int SumValidIntegers(string[] values) {
        int total = 0;
        foreach (string value in values) {
            if (int.TryParse(value, out int parsed)) {
                total += parsed;
            }
        }
        return total;
    }
}`,
            hints: [
              "`int.TryParse(value, out int parsed)` returns `true` on success.",
              "Add `parsed` only inside the successful branch.",
              "No `try`/`catch` block is needed for expected invalid text.",
            ],
          },
        },
      ],
    },
  ],
};
