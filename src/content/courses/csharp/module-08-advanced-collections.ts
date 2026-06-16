import type { CourseModule } from "../types";

export const csharpAdvancedCollections: CourseModule = {
  slug: "advanced-collections",
  title: "Advanced Collections and Iteration",
  description:
    "Work with nested data, collection interfaces, lazy iterators, reusable generic comparisons, and heap-based priority processing.",
  lessons: [
    {
      slug: "jagged-and-multidimensional-data",
      title: "Jagged arrays and multidimensional data",
      summary:
        "Represent rows of different lengths and traverse nested structures safely.",
      blocks: [
        {
          kind: "prose",
          markdown: `## C# has two kinds of rectangular-looking arrays

A rectangular multidimensional array stores one block with fixed dimensions:

\`\`\`csharp
int[,] grid = new int[3, 4];
grid[1, 2] = 7;
int rows = grid.GetLength(0);
int columns = grid.GetLength(1);
\`\`\`

A jagged array is an array of arrays:

\`\`\`csharp
int[][] rows = {
    new int[] { 1, 2 },
    new int[] { 3, 4, 5 },
    new int[] { 6 }
};
\`\`\`

Each inner array can have a different length. Access uses two index operations: \`rows[r][c]\`.

Jagged arrays are often convenient for graph adjacency lists, triangular data, grouped results, and APIs that already expose arrays. Rectangular arrays are appropriate when dimensions are fixed and every row has the same shape.`,
        },
        {
          kind: "prose",
          markdown: `## Nested loops should follow the actual shape

Do not assume every row has the first row's length:

\`\`\`csharp
for (int r = 0; r < rows.Length; r++) {
    for (int c = 0; c < rows[r].Length; c++) {
        Console.WriteLine(rows[r][c]);
    }
}
\`\`\`

The outer array and every inner array are reference types. A shallow clone of the outer array still shares the inner arrays:

\`\`\`csharp
int[][] shallow = (int[][])rows.Clone();
shallow[0][0] = 99; // also changes rows[0][0]
\`\`\`

A deep copy must clone each row. This distinction matters whenever a method promises not to mutate caller-owned nested data.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "jagged-row-sums",
            title: "Sum jagged rows",
            prompt: `Return one sum per row of the jagged array \`rows\`.

Rows may have different lengths, including zero.

\`\`\`text
RowSums([[1, 2], [3, 4, 5], []]) -> [3, 12, 0]
\`\`\`

Size the result from the outer array and inspect each row's own \`.Length\`.`,
            signature: {
              name: "rowSums",
              params: [{ name: "rows", type: "int[][]" }],
              returns: "int[]",
            },
            tests: [
              {
                input: [[[1, 2], [3, 4, 5], []]],
                expected: [3, 12, 0],
              },
              { input: [[]], expected: [] },
              { input: [[[7]]], expected: [7] },
              {
                input: [[[-1, 1], [10, -3, -2], [0, 0]]],
                expected: [0, 5, 0],
                hidden: true,
              },
            ],
            starterCode: `public class Solution {
    public int[] RowSums(int[][] rows) {
        // Return one sum per inner array.
    }
}`,
            solution: `public class Solution {
    public int[] RowSums(int[][] rows) {
        int[] result = new int[rows.Length];
        for (int r = 0; r < rows.Length; r++) {
            int total = 0;
            for (int c = 0; c < rows[r].Length; c++) {
                total += rows[r][c];
            }
            result[r] = total;
        }
        return result;
    }
}`,
            hints: [
              "The result length is `rows.Length`.",
              "Use `rows[r].Length` for the inner loop.",
              "An empty row naturally leaves its total at zero.",
            ],
          },
        },
      ],
    },
    {
      slug: "collection-contracts-and-iterators",
      title: "Collection contracts and iterators",
      summary:
        "Program to the operations you need and generate sequences lazily with yield.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Accept the narrowest useful interface

Collection interfaces communicate what a method needs:

| Interface | Contract |
|---|---|
| \`IEnumerable<T>\` | can be enumerated |
| \`IReadOnlyCollection<T>\` | enumerable and has a count |
| \`IReadOnlyList<T>\` | count plus indexed reading |
| \`ICollection<T>\` | can add/remove and has a count |
| \`IList<T>\` | mutable indexed collection |

If a method only loops, accepting \`IEnumerable<T>\` lets callers provide an array, list, set, query, or custom iterator. If the method indexes repeatedly, request \`IReadOnlyList<T>\` rather than hiding repeated enumeration.

Do not enumerate an arbitrary \`IEnumerable<T>\` several times unless its contract permits that. It may perform I/O, compute values again, or support only one pass. Materialise with \`.ToList()\` or \`.ToArray()\` when a stable snapshot is required.`,
        },
        {
          kind: "prose",
          markdown: `## yield builds a lazy state machine

A method containing \`yield return\` produces an iterator:

\`\`\`csharp
public IEnumerable<int> PositiveValues(IEnumerable<int> source) {
    foreach (int value in source) {
        if (value > 0) {
            yield return value;
        }
    }
}
\`\`\`

The body runs as the consumer requests each value. Local state is preserved between requests. \`yield break\` ends the sequence.

Laziness avoids allocating the whole result and supports streaming, but exceptions also occur during enumeration rather than when the iterator method is called. Document that timing when it matters.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "iterator-running-totals",
            title: "Generate running totals with yield",
            prompt: `Return an array where each position is the sum of all input values up to that position.

\`\`\`text
RunningTotals([2, -1, 4]) -> [2, 1, 5]
\`\`\`

Write a private iterator method returning \`IEnumerable<int>\`. It should maintain the running total and \`yield return\` each new value. Materialise it once in the public method.`,
            signature: {
              name: "runningTotals",
              params: [{ name: "nums", type: "int[]" }],
              returns: "int[]",
            },
            tests: [
              { input: [[2, -1, 4]], expected: [2, 1, 5] },
              { input: [[]], expected: [] },
              { input: [[5]], expected: [5] },
              {
                input: [[1, 1, 1, 1]],
                expected: [1, 2, 3, 4],
                hidden: true,
              },
              {
                input: [[-3, 2, 2]],
                expected: [-3, -1, 1],
                hidden: true,
              },
            ],
            starterCode: `using System.Collections.Generic;
using System.Linq;

public class Solution {
    private IEnumerable<int> GenerateTotals(int[] nums) {
        // Maintain state and yield each running total.
    }

    public int[] RunningTotals(int[] nums) {
        // Materialise the iterator once.
    }
}`,
            solution: `using System.Collections.Generic;
using System.Linq;

public class Solution {
    private IEnumerable<int> GenerateTotals(int[] nums) {
        int total = 0;
        foreach (int n in nums) {
            total += n;
            yield return total;
        }
    }

    public int[] RunningTotals(int[] nums) {
        return GenerateTotals(nums).ToArray();
    }
}`,
            hints: [
              "The iterator keeps `int total = 0` as local state.",
              "After adding each number, `yield return total`.",
              "Call `.ToArray()` on the iterator in the public method.",
            ],
          },
        },
      ],
    },
    {
      slug: "generic-algorithms-and-comparers",
      title: "Generic algorithms and comparers",
      summary:
        "Separate reusable traversal from the rule that decides ordering.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Generic methods preserve type information

A generic method can express an algorithm once:

\`\`\`csharp
public static T First<T>(IReadOnlyList<T> items) {
    return items[0];
}
\`\`\`

Constraints state capabilities required from \`T\`:

\`\`\`csharp
public static T Create<T>() where T : new() {
    return new T();
}
\`\`\`

Common constraints include \`class\`, \`struct\`, \`notnull\`, a base class, one or more interfaces, and \`new()\`. Add a constraint only when the implementation uses that capability.`,
        },
        {
          kind: "prose",
          markdown: `## Ordering is a separate strategy

\`IComparable<T>\` defines a type's natural order. \`IComparer<T>\` and \`Comparison<T>\` provide ordering for a particular operation:

\`\`\`csharp
Comparison<string> byLength = (a, b) =>
    a.Length.CompareTo(b.Length);
\`\`\`

Comparison results mean:

- less than zero: first value comes before the second;
- zero: tied for this comparison;
- greater than zero: first value comes after the second.

Use \`StringComparer.Ordinal\` or \`StringComparer.OrdinalIgnoreCase\` for identifiers and machine-facing text. Culture-aware comparers are intended for text shown and sorted for people.

A generic traversal can accept a comparison strategy rather than embedding one fixed rule.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "best-string-by-comparison",
            title: "Choose a value with a comparison strategy",
            prompt: `Return the longest string in the non-empty array \`values\`. If several strings have the same length, return the ordinally smallest one.

\`\`\`text
BestString(["pear", "fig", "apple", "grape"]) -> "apple"
BestString(["beta", "alpha"])                 -> "alpha"
\`\`\`

Write a generic private \`Best<T>\` helper that accepts a \`Comparison<T>\`. The public method should provide the string-specific rule.`,
            signature: {
              name: "bestString",
              params: [{ name: "values", type: "string[]" }],
              returns: "string",
            },
            tests: [
              {
                input: [["pear", "fig", "apple", "grape"]],
                expected: "apple",
              },
              { input: [["beta", "alpha"]], expected: "alpha" },
              { input: [["only"]], expected: "only" },
              {
                input: [["zoo", "ant", "yak"]],
                expected: "ant",
                hidden: true,
              },
              {
                input: [["a", "bb", "ccc", "bbb"]],
                expected: "bbb",
                hidden: true,
              },
            ],
            starterCode: `using System;

public class Solution {
    private T Best<T>(T[] values, Comparison<T> comparison) {
        // Keep the candidate for which comparison(candidate, best) is positive.
    }

    public string BestString(string[] values) {
        // Prefer greater length; on a tie prefer ordinally smaller text.
    }
}`,
            solution: `using System;

public class Solution {
    private T Best<T>(T[] values, Comparison<T> comparison) {
        T best = values[0];
        for (int i = 1; i < values.Length; i++) {
            if (comparison(values[i], best) > 0) {
                best = values[i];
            }
        }
        return best;
    }

    public string BestString(string[] values) {
        return Best(values, (a, b) => {
            int byLength = a.Length.CompareTo(b.Length);
            if (byLength != 0) return byLength;
            return -StringComparer.Ordinal.Compare(a, b);
        });
    }
}`,
            hints: [
              "The helper can initialise `best` from `values[0]`.",
              "A longer string should compare as greater.",
              "For equal lengths, negate `StringComparer.Ordinal.Compare(a, b)` so ordinally smaller text wins.",
            ],
          },
        },
      ],
    },
    {
      slug: "heaps-and-priority-processing",
      title: "Heaps and priority processing",
      summary:
        "Maintain the next highest-priority item without fully sorting every value.",
      blocks: [
        {
          kind: "prose",
          markdown: `## A heap maintains one extreme efficiently

A binary min-heap stores the smallest value at index 0. For an item at index \`i\`:

\`\`\`text
parent      = (i - 1) / 2
left child  = 2 * i + 1
right child = 2 * i + 2
\`\`\`

Insertion appends the value, then swaps upward while it is smaller than its parent. Removing the minimum moves the last value to the root, then swaps downward with the smaller child.

Both operations are O(log n). Peeking at the minimum is O(1).

Modern .NET includes \`PriorityQueue<TElement, TPriority>\`. Knowing the heap underneath remains useful because it explains complexity, tie handling, and how to adapt when a runtime or problem does not provide the exact queue you need.`,
        },
        {
          kind: "prose",
          markdown: `## Keep only what the answer needs

To find the kth largest value, a full sort costs O(n log n). A min-heap of at most \`k\` values costs O(n log k):

1. Push each value.
2. If the heap grows beyond \`k\`, remove its minimum.
3. The heap now contains the \`k\` largest values seen so far.
4. Its minimum is the kth largest overall.

This bounded-state pattern appears in top-k queries, streaming leaderboards, schedulers, and merging sorted sources.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "kth-largest-heap",
            title: "Find the kth largest with a bounded heap",
            prompt: `Return the \`k\`th largest value in \`nums\`. Duplicate values count as separate positions.

\`\`\`text
KthLargest([3, 2, 1, 5, 6, 4], 2) -> 5
KthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4) -> 4
\`\`\`

Implement a min-heap with \`List<int>\`. Keep at most \`k\` values, removing the minimum whenever the heap becomes too large. Assume \`1 <= k <= nums.Length\`.`,
            signature: {
              name: "kthLargest",
              params: [
                { name: "nums", type: "int[]" },
                { name: "k", type: "int" },
              ],
              returns: "int",
            },
            tests: [
              { input: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
              {
                input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4],
                expected: 4,
              },
              { input: [[7], 1], expected: 7 },
              {
                input: [[-1, -5, -2, -4], 3],
                expected: -4,
                hidden: true,
              },
              {
                input: [[2, 2, 2, 2], 3],
                expected: 2,
                hidden: true,
              },
            ],
            starterCode: `using System.Collections.Generic;

public class Solution {
    private void Push(List<int> heap, int value) {
        // Append and bubble up.
    }

    private int PopMin(List<int> heap) {
        // Remove the root, move the last value, and bubble down.
    }

    public int KthLargest(int[] nums, int k) {
        // Maintain a min-heap containing at most k values.
    }
}`,
            solution: `using System.Collections.Generic;

public class Solution {
    private void Swap(List<int> heap, int a, int b) {
        int temp = heap[a];
        heap[a] = heap[b];
        heap[b] = temp;
    }

    private void Push(List<int> heap, int value) {
        heap.Add(value);
        int i = heap.Count - 1;
        while (i > 0) {
            int parent = (i - 1) / 2;
            if (heap[parent] <= heap[i]) break;
            Swap(heap, parent, i);
            i = parent;
        }
    }

    private int PopMin(List<int> heap) {
        int min = heap[0];
        int last = heap[heap.Count - 1];
        heap.RemoveAt(heap.Count - 1);
        if (heap.Count == 0) return min;

        heap[0] = last;
        int i = 0;
        while (true) {
            int left = 2 * i + 1;
            int right = left + 1;
            if (left >= heap.Count) break;

            int smaller = left;
            if (right < heap.Count && heap[right] < heap[left]) {
                smaller = right;
            }
            if (heap[i] <= heap[smaller]) break;
            Swap(heap, i, smaller);
            i = smaller;
        }
        return min;
    }

    public int KthLargest(int[] nums, int k) {
        var heap = new List<int>();
        foreach (int value in nums) {
            Push(heap, value);
            if (heap.Count > k) {
                PopMin(heap);
            }
        }
        return heap[0];
    }
}`,
            hints: [
              "For insertion, compare the appended value with `(i - 1) / 2` until the heap property holds.",
              "For removal, replace the root with the last value and repeatedly swap with the smaller child.",
              "After processing all values, a size-k min-heap has the kth largest value at index 0.",
            ],
          },
        },
      ],
    },
  ],
};
