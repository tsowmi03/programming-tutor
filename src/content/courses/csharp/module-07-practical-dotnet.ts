import type { CourseModule } from "../types";

export const csharpPracticalDotNet: CourseModule = {
  slug: "practical-dotnet",
  title: "Practical .NET Development",
  description:
    "Understand how C# code becomes a .NET application, then work with resources, text data, asynchronous operations, cancellation, and automated tests.",
  lessons: [
    {
      slug: "projects-namespaces-and-assemblies",
      title: "Projects, namespaces, and assemblies",
      summary:
        "Know where source files, dependencies, build settings, and compiled code fit.",
      blocks: [
        {
          kind: "prose",
          markdown: `## C# is the language; .NET is the platform

A typical application is organised around a project file such as \`.csproj\`. The project tells the .NET SDK:

- which target framework to compile for;
- whether the output is an executable or library;
- which NuGet packages and project references it needs;
- which compiler features are enabled, including nullable analysis and implicit usings.

Common CLI commands:

\`\`\`text
dotnet new console
dotnet restore
dotnet build
dotnet run
dotnet test
dotnet add package Some.Package
\`\`\`

\`dotnet build\` compiles source into an **assembly**, usually a \`.dll\`, containing Intermediate Language and metadata. The .NET runtime loads that assembly and just-in-time compiles methods for the current machine.`,
        },
        {
          kind: "prose",
          markdown: `## Namespaces organise names; assemblies package code

A namespace prevents unrelated types from colliding:

\`\`\`csharp
namespace CodeClimb.Billing {
    public class Invoice { }
}
\`\`\`

\`using CodeClimb.Billing;\` imports names into a source file. It does not load a package or create a dependency. The project or assembly reference supplies the dependency; \`using\` only changes name lookup.

A single assembly can contain many namespaces, and one namespace can span several assemblies. Keep those concepts separate.

Access modifiers define the visible API:

- \`public\`: visible wherever the containing type or assembly is accessible.
- \`internal\`: visible only inside the same assembly.
- \`private\`: visible only inside the containing type.
- \`protected\`: visible to the type and derived types.

Default to the narrowest access that supports the design. Every public member becomes a contract other code may depend on.

### Activity: trace a dependency

For a real project, pick one external type and answer:

1. Which \`using\` makes its short name available?
2. Which package or project reference supplies its assembly?
3. Is the type public, and which of its members form the API you call?
4. What command restores and builds that dependency?

This separates four ideas that are often incorrectly treated as one.`,
        },
      ],
    },
    {
      slug: "language-versions-and-modern-syntax",
      title: "Language versions and modern C#",
      summary:
        "Connect language features to target frameworks and distinguish stable syntax from previews.",
      blocks: [
        {
          kind: "prose",
          markdown: `## The project selects a language version

C# evolves alongside .NET. The target framework normally determines the default language version:

- .NET 8 defaults to C# 12.
- .NET 9 defaults to C# 13.
- .NET 10 defaults to C# 14.

At the time this lesson was revised in June 2026, C# 14 is the latest stable release. C# 15 is available only as a preview with .NET 11 previews. Production projects should normally use the language version supported by their target framework.

You can inspect or override the version in a project file:

\`\`\`xml
<PropertyGroup>
  <TargetFramework>net10.0</TargetFramework>
  <LangVersion>14.0</LangVersion>
</PropertyGroup>
\`\`\`

Use \`preview\` only when the project deliberately accepts preview compiler and runtime constraints.`,
        },
        {
          kind: "prose",
          markdown: `## Recognise modern syntax without losing the underlying model

Recent releases add concise ways to express existing ideas:

\`\`\`csharp
// C# 12 collection expression
int[] scores = [72, 84, 91];

// C# 12 primary constructor
public sealed class Student(string name) {
    public string Name { get; } = name;
}

// C# 14 null-conditional assignment
customer?.LastSeen = DateTime.UtcNow;
\`\`\`

C# 14 also adds extension blocks, which can define extension properties, methods, operators, and static members. Traditional extension methods remain common and portable:

\`\`\`csharp
public static class StringExtensions {
    public static bool HasText(this string? value) =>
        !string.IsNullOrWhiteSpace(value);
}
\`\`\`

New syntax does not replace the need to understand types, allocation, mutation, dispatch, and exceptions. Read the project target before copying syntax from current documentation into an older codebase.

> **Exercise runtime note:** this site's C# judge uses a compatibility-oriented Mono runtime. Reference solutions therefore use broadly supported syntax even when a lesson demonstrates newer C#. Use a local .NET 10 project to practise C# 14-only features.

### Activity: modernise with intent

Take a small class from an older project and identify:

1. One initializer that could become a collection expression.
2. One data-focused class that might be clearer as a record.
3. One constructor that could use a primary constructor without hiding validation.
4. One extension method candidate, and whether C# 14 extension syntax would improve its public API.

For each change, record the minimum target framework and language version it requires. Do not modernise syntax when it would break a supported target.`,
        },
      ],
    },
    {
      slug: "disposal-io-and-serialization",
      title: "Disposal, files, streams, and serialization",
      summary:
        "Release resources deterministically and transform external data at clear boundaries.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Dispose resources that own external state

Managed memory is reclaimed by the garbage collector. Resources such as file handles, sockets, database connections, and streams also need deterministic cleanup.

Types that own these resources implement \`IDisposable\`. A \`using\` statement calls \`Dispose\` even when an exception occurs:

\`\`\`csharp
using (var reader = new StreamReader(path)) {
    string text = reader.ReadToEnd();
}

// Modern declaration form: disposed at the end of the scope.
using var stream = File.OpenRead(path);
\`\`\`

Do not dispose an object you do not own unless its API explicitly transfers ownership. If your class owns a disposable dependency for its entire lifetime, your class will usually implement \`IDisposable\` too.`,
        },
        {
          kind: "prose",
          markdown: `## Keep I/O at the boundary

\`File.ReadAllText\`, \`File.ReadAllLines\`, and their async counterparts cover simple file operations. Streams are useful when data is large, arrives incrementally, or comes from something other than a file.

Serialization translates between objects and an external representation such as JSON:

\`\`\`csharp
string json = JsonSerializer.Serialize(order);
Order? parsed = JsonSerializer.Deserialize<Order>(json);
\`\`\`

External data is untrusted. Validate required fields and domain rules after deserialization rather than assuming a syntactically valid document is meaningful.

A testable design separates concerns:

1. Read text from a file, HTTP response, or message.
2. Parse it into a data shape.
3. Validate and process that data with pure methods.
4. Write the result at the boundary.

The exercise practises the parse-and-process middle without coupling the logic to a real file.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "csv-row-totals",
            title: "Parse CSV-shaped rows",
            prompt: `Each string in \`rows\` contains comma-separated fields. Return one total per row by adding every field that is a valid integer and ignoring invalid fields.

\`\`\`text
CsvRowTotals(["1,2,3", "10,bad,-4"]) -> [6, 6]
CsvRowTotals(["", "5"])              -> [0, 5]
\`\`\`

Treat the strings as data already read from an external source. Split each row, validate each field with \`int.TryParse\`, and keep the transformation independent from file access.`,
            signature: {
              name: "csvRowTotals",
              params: [{ name: "rows", type: "string[]" }],
              returns: "int[]",
            },
            tests: [
              {
                input: [["1,2,3", "10,bad,-4"]],
                expected: [6, 6],
              },
              { input: [["", "5"]], expected: [0, 5] },
              { input: [[]], expected: [] },
              {
                input: [[" 7 , 8 ", "1,,2"]],
                expected: [15, 3],
                hidden: true,
              },
              {
                input: [["none", "-2,-3,-4"]],
                expected: [0, -9],
                hidden: true,
              },
            ],
            starterCode: `public class Solution {
    public int[] CsvRowTotals(string[] rows) {
        // Split each row and sum only fields that parse as int.
    }
}`,
            solution: `public class Solution {
    public int[] CsvRowTotals(string[] rows) {
        int[] totals = new int[rows.Length];
        for (int i = 0; i < rows.Length; i++) {
            foreach (string field in rows[i].Split(',')) {
                if (int.TryParse(field, out int value)) {
                    totals[i] += value;
                }
            }
        }
        return totals;
    }
}`,
            hints: [
              "Allocate the result with one slot per input row.",
              "`rows[i].Split(',')` produces the fields for one row.",
              "Add a field only when `int.TryParse` succeeds.",
            ],
          },
        },
      ],
    },
    {
      slug: "tasks-async-await-and-cancellation",
      title: "Tasks, async/await, and cancellation",
      summary:
        "Represent ongoing work without blocking threads and preserve failure and cancellation.",
      blocks: [
        {
          kind: "prose",
          markdown: `## A Task represents an operation

\`Task\` represents work that may finish later. \`Task<T>\` also carries a result.

\`\`\`csharp
public async Task<string> LoadAsync(
    HttpClient client,
    string url,
    CancellationToken cancellationToken
) {
    string text = await client.GetStringAsync(url, cancellationToken);
    return text.Trim();
}
\`\`\`

\`await\` pauses the async method until the task finishes, then resumes it without blocking the current thread. Exceptions are stored on the task and rethrown at the \`await\`.

Async methods normally return \`Task\` or \`Task<T>\`. \`async void\` is reserved for event handlers because callers cannot await it or observe its failures normally.`,
        },
        {
          kind: "prose",
          markdown: `## Concurrency is not automatically parallelism

Starting several I/O operations before awaiting them lets their waiting periods overlap:

\`\`\`csharp
Task<User> userTask = LoadUserAsync(id, token);
Task<Order[]> ordersTask = LoadOrdersAsync(id, token);

await Task.WhenAll(userTask, ordersTask);
User user = await userTask;
Order[] orders = await ordersTask;
\`\`\`

This is useful for independent I/O. It does not make CPU-heavy work faster by itself. For CPU-bound work, measure first and consider parallel APIs only when the work is large enough and thread-safe.

A \`CancellationToken\` is a cooperative request. Accept it, pass it to downstream async APIs, and check it in long loops with \`ThrowIfCancellationRequested\`. Cancellation should normally propagate as \`OperationCanceledException\`, not be converted into an ordinary result.

Avoid blocking async code with \`.Result\` or \`.Wait()\` in application code. It ties up a thread and can deadlock under some synchronization contexts. The exercise wrapper is synchronous only because this site's judge calls ordinary methods; the worker methods still demonstrate task creation and result ordering.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "async-batch-sums",
            title: "Coordinate independent tasks",
            prompt: `Return the sum of each row in \`batches\`, preserving the original row order.

Create one \`Task<int>\` per row using an async helper, wait for all tasks, then collect results by task index.

\`\`\`text
BatchSums([[1, 2, 3], [10, -4], []]) -> [6, 6, 0]
\`\`\`

The task work is deliberately small so it can run in the judge. In production, concurrency is mainly useful when each task performs independent I/O; creating tasks for tiny arithmetic adds overhead.`,
            signature: {
              name: "batchSums",
              params: [{ name: "batches", type: "int[][]" }],
              returns: "int[]",
            },
            tests: [
              {
                input: [[[1, 2, 3], [10, -4], []]],
                expected: [6, 6, 0],
              },
              { input: [[[5]]], expected: [5] },
              { input: [[]], expected: [] },
              {
                input: [[[-1, -2], [4, 5, 6], [0, 0]]],
                expected: [-3, 15, 0],
                hidden: true,
              },
            ],
            starterCode: `using System.Threading.Tasks;

public class Solution {
    private async Task<int> SumAsync(int[] values) {
        await Task.Yield();
        // Return the row sum.
    }

    public int[] BatchSums(int[][] batches) {
        // Start one task per row, wait for all, preserve task order.
    }
}`,
            solution: `using System.Threading.Tasks;

public class Solution {
    private async Task<int> SumAsync(int[] values) {
        await Task.Yield();
        int total = 0;
        foreach (int value in values) {
            total += value;
        }
        return total;
    }

    public int[] BatchSums(int[][] batches) {
        var tasks = new Task<int>[batches.Length];
        for (int i = 0; i < batches.Length; i++) {
            tasks[i] = SumAsync(batches[i]);
        }

        Task.WaitAll(tasks);

        int[] result = new int[tasks.Length];
        for (int i = 0; i < tasks.Length; i++) {
            result[i] = tasks[i].Result;
        }
        return result;
    }
}`,
            hints: [
              "Create the whole `Task<int>[]` before waiting.",
              "`Task.WaitAll(tasks)` is used only to adapt the async work to the judge's synchronous method.",
              "Reading `tasks[i].Result` after all tasks finish preserves input order.",
            ],
          },
        },
      ],
    },
    {
      slug: "testing-debugging-and-contracts",
      title: "Testing, debugging, and contracts",
      summary:
        "Design small deterministic units, cover boundaries, and diagnose failures from evidence.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Tests specify observable behavior

A unit test normally follows arrange, act, assert:

\`\`\`csharp
[Fact]
public void Clamp_returns_upper_bound_when_value_is_too_large() {
    int result = NumberRules.Clamp(120, 0, 100);
    Assert.Equal(100, result);
}
\`\`\`

Good tests target behavior and boundaries:

- normal values;
- minimum and maximum valid values;
- empty collections;
- invalid arguments;
- repeated values and ordering;
- prior bug cases.

Avoid asserting private implementation details. A refactor should not break tests when the public behavior remains correct.`,
        },
        {
          kind: "prose",
          markdown: `## Make failures easy to locate

Pure methods are easy to test because their output depends only on their inputs. Put clocks, random generators, file systems, networks, and databases behind small boundaries so core rules can be tested without those systems.

When debugging:

1. Reproduce the failure with the smallest input you can.
2. Read the exception type, message, and first relevant stack frame.
3. Inspect actual values at the point where behavior diverges.
4. Add or tighten a test before changing the implementation.
5. Remove temporary logging once the cause is covered.

Assertions and argument validation can state assumptions close to the code that depends on them. They are more useful than allowing an impossible state to cause a distant null reference or index error.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "clamp-all",
            title: "Implement a boundary-driven contract",
            prompt: `Return a new array where every value is clamped to the inclusive range \`[min, max]\`.

- Values below \`min\` become \`min\`.
- Values above \`max\` become \`max\`.
- Values inside the range are unchanged.

\`\`\`text
ClampAll([-5, 5, 15], 0, 10) -> [0, 5, 10]
\`\`\`

Assume \`min <= max\`. Before coding, identify the three behavior partitions and the exact boundary values that need tests.`,
            signature: {
              name: "clampAll",
              params: [
                { name: "values", type: "int[]" },
                { name: "min", type: "int" },
                { name: "max", type: "int" },
              ],
              returns: "int[]",
            },
            tests: [
              {
                input: [[-5, 5, 15], 0, 10],
                expected: [0, 5, 10],
              },
              { input: [[0, 10], 0, 10], expected: [0, 10] },
              { input: [[], -2, 2], expected: [] },
              {
                input: [[-3, -2, -1, 0, 1, 2, 3], -2, 2],
                expected: [-2, -2, -1, 0, 1, 2, 2],
                hidden: true,
              },
              {
                input: [[7, 7, 6, 8], 7, 7],
                expected: [7, 7, 7, 7],
                hidden: true,
              },
            ],
            starterCode: `public class Solution {
    public int[] ClampAll(int[] values, int min, int max) {
        // Return a clamped copy; do not mutate the input array.
    }
}`,
            solution: `public class Solution {
    public int[] ClampAll(int[] values, int min, int max) {
        int[] result = new int[values.Length];
        for (int i = 0; i < values.Length; i++) {
            if (values[i] < min) {
                result[i] = min;
            } else if (values[i] > max) {
                result[i] = max;
            } else {
                result[i] = values[i];
            }
        }
        return result;
    }
}`,
            hints: [
              "Allocate a separate result array to preserve the input.",
              "Test below-range, above-range, and in-range values separately.",
              "Values exactly equal to `min` or `max` stay unchanged.",
            ],
          },
        },
      ],
    },
  ],
};
