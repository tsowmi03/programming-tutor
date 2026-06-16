import type { CourseModule } from "../types";

export const csharpAlgorithmPatterns: CourseModule = {
  slug: "algorithm-patterns",
  title: "Algorithm Patterns in C#",
  description:
    "Practise the recurring shapes behind sorting, two pointers, sliding windows, trees, graphs, backtracking, and dynamic programming.",
  lessons: [
    {
      slug: "sorting-and-intervals",
      title: "Sorting and interval processing",
      summary:
        "Sort data into an order that makes the next decision local and predictable.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Sorting can reveal structure

Comparison sorting is normally O(n log n). That cost is often worthwhile because ordered data supports simpler scans:

- duplicate values become adjacent;
- intervals with nearby starts become adjacent;
- two-pointer techniques become possible;
- binary search becomes available;
- grouping and tie-breaking become deterministic.

C# options include:

\`\`\`csharp
Array.Sort(array);                 // mutates the array
list.Sort(comparison);             // mutates the list
var ordered = source.OrderBy(key); // lazy, returns a sequence
\`\`\`

Know whether the operation mutates caller-owned data. Clone first when the method contract promises to preserve its input.`,
        },
        {
          kind: "prose",
          markdown: `## Merge intervals after sorting by start

For intervals \`[start, end]\`, sort by \`start\`. Keep one current merged interval:

1. If the next start is at most the current end, they overlap. Extend the end.
2. Otherwise, emit the current interval and begin a new one.

After sorting, every possible overlap with the current interval arrives next, so a single O(n) scan is enough. Total complexity is O(n log n) because sorting dominates.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "merge-intervals",
            title: "Merge overlapping intervals",
            prompt: `Each row of \`intervals\` is \`[start, end]\` with \`start <= end\`.

Merge every overlapping or touching interval and return the merged intervals sorted by start.

\`\`\`text
MergeIntervals([[1,3], [2,6], [8,10], [10,12]])
-> [[1,6], [8,12]]
\`\`\`

Do not mutate the input rows. Sort copies by start, then scan once.`,
            signature: {
              name: "mergeIntervals",
              params: [{ name: "intervals", type: "int[][]" }],
              returns: "int[][]",
            },
            tests: [
              {
                input: [[[1, 3], [2, 6], [8, 10], [10, 12]]],
                expected: [[1, 6], [8, 12]],
              },
              {
                input: [[[1, 4], [5, 7]]],
                expected: [[1, 4], [5, 7]],
              },
              { input: [[]], expected: [] },
              {
                input: [[[5, 8], [1, 2], [2, 4], [9, 9]]],
                expected: [[1, 4], [5, 8], [9, 9]],
                hidden: true,
              },
              {
                input: [[[1, 10], [2, 3], [4, 8]]],
                expected: [[1, 10]],
                hidden: true,
              },
            ],
            starterCode: `using System.Collections.Generic;
using System.Linq;

public class Solution {
    public int[][] MergeIntervals(int[][] intervals) {
        // Copy, sort by start, and merge in one scan.
    }
}`,
            solution: `using System.Collections.Generic;
using System.Linq;

public class Solution {
    public int[][] MergeIntervals(int[][] intervals) {
        if (intervals.Length == 0) return new int[][] { };

        int[][] sorted = intervals
            .Select(interval => new int[] { interval[0], interval[1] })
            .OrderBy(interval => interval[0])
            .ToArray();

        var merged = new List<int[]>();
        int start = sorted[0][0];
        int end = sorted[0][1];

        for (int i = 1; i < sorted.Length; i++) {
            if (sorted[i][0] <= end) {
                end = System.Math.Max(end, sorted[i][1]);
            } else {
                merged.Add(new int[] { start, end });
                start = sorted[i][0];
                end = sorted[i][1];
            }
        }

        merged.Add(new int[] { start, end });
        return merged.ToArray();
    }
}`,
            hints: [
              "Handle the empty input before reading the first interval.",
              "Copy each row before sorting so the caller's rows are untouched.",
              "Remember to add the final current interval after the loop.",
            ],
          },
        },
      ],
    },
    {
      slug: "two-pointers",
      title: "Two pointers",
      summary:
        "Use movement rules at both ends of ordered data to avoid nested loops.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Two indices can encode a shrinking search space

Two-pointer algorithms maintain indices with a rule for moving one or both:

- opposite ends moving inward;
- slow and fast positions moving in one direction;
- one pointer marking a write position while another scans.

The technique works when each comparison tells you which movement cannot discard a valid answer.

For a sorted array containing negatives, the largest square is at one of the two ends. Compare absolute values, write the larger square at the back of the result, then move that pointer inward. This produces sorted squares in O(n) rather than sorting squares in O(n log n).`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "sorted-squares",
            title: "Squares of a sorted array",
            prompt: `\`nums\` is sorted ascending and may contain negative values.

Return the square of every value, also sorted ascending.

\`\`\`text
SortedSquares([-4, -1, 0, 3, 10]) -> [0, 1, 9, 16, 100]
\`\`\`

Use pointers at both ends and fill the result from right to left in O(n). Assume every squared value fits in an \`int\`.`,
            signature: {
              name: "sortedSquares",
              params: [{ name: "nums", type: "int[]" }],
              returns: "int[]",
            },
            tests: [
              {
                input: [[-4, -1, 0, 3, 10]],
                expected: [0, 1, 9, 16, 100],
              },
              {
                input: [[-7, -3, 2, 3, 11]],
                expected: [4, 9, 9, 49, 121],
              },
              { input: [[]], expected: [] },
              {
                input: [[-5, -4, -1]],
                expected: [1, 16, 25],
                hidden: true,
              },
              {
                input: [[0, 1, 2]],
                expected: [0, 1, 4],
                hidden: true,
              },
            ],
            starterCode: `public class Solution {
    public int[] SortedSquares(int[] nums) {
        // Compare both ends and fill the result from the back.
    }
}`,
            solution: `public class Solution {
    public int[] SortedSquares(int[] nums) {
        int[] result = new int[nums.Length];
        int left = 0;
        int right = nums.Length - 1;

        for (int write = nums.Length - 1; write >= 0; write--) {
            int leftSquare = nums[left] * nums[left];
            int rightSquare = nums[right] * nums[right];
            if (leftSquare > rightSquare) {
                result[write] = leftSquare;
                left++;
            } else {
                result[write] = rightSquare;
                right--;
            }
        }
        return result;
    }
}`,
            hints: [
              "The largest remaining square must come from `left` or `right`.",
              "Write the larger square at the current result position.",
              "Move only the pointer whose value you used.",
            ],
          },
        },
      ],
    },
    {
      slug: "sliding-window",
      title: "Sliding windows",
      summary:
        "Update a contiguous range incrementally instead of recomputing it.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Reuse the overlap between neighboring ranges

Contiguous subarray and substring problems often ask about windows. A fixed-size window of length \`k\` changes by only two values when it moves one step:

\`\`\`text
new sum = old sum - outgoing value + incoming value
\`\`\`

Compute the first window in O(k), then every move in O(1). The total is O(n), compared with O(nk) if each window is summed from scratch.

Variable-size windows use left and right boundaries. Expand the right side to include new data; move the left side while the window violates a condition. This works when removing values changes the condition predictably, such as sums of non-negative values or bounded character counts.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "maximum-window-sum",
            title: "Maximum fixed-window sum",
            prompt: `Return the maximum sum of any contiguous subarray of exactly \`k\` elements.

\`\`\`text
MaxWindowSum([2, 1, 5, 1, 3, 2], 3) -> 9
MaxWindowSum([-5, -2, -3], 2)       -> -5
\`\`\`

Assume \`1 <= k <= nums.Length\`. Sum the first window once, then slide it in O(n).`,
            signature: {
              name: "maxWindowSum",
              params: [
                { name: "nums", type: "int[]" },
                { name: "k", type: "int" },
              ],
              returns: "int",
            },
            tests: [
              { input: [[2, 1, 5, 1, 3, 2], 3], expected: 9 },
              { input: [[-5, -2, -3], 2], expected: -5 },
              { input: [[7], 1], expected: 7 },
              {
                input: [[1, 2, 3, 4, 5], 5],
                expected: 15,
                hidden: true,
              },
              {
                input: [[4, -1, 2, 10, -2, 3], 2],
                expected: 12,
                hidden: true,
              },
            ],
            starterCode: `public class Solution {
    public int MaxWindowSum(int[] nums, int k) {
        // Sum the first k values, then slide the window.
    }
}`,
            solution: `public class Solution {
    public int MaxWindowSum(int[] nums, int k) {
        int window = 0;
        for (int i = 0; i < k; i++) {
            window += nums[i];
        }

        int best = window;
        for (int right = k; right < nums.Length; right++) {
            window += nums[right];
            window -= nums[right - k];
            if (window > best) best = window;
        }
        return best;
    }
}`,
            hints: [
              "Initialise `window` from indices 0 through `k - 1`.",
              "When `right` enters, index `right - k` leaves.",
              "Initialise `best` from the first complete window so all-negative inputs work.",
            ],
          },
        },
      ],
    },
    {
      slug: "trees-and-recursive-structure",
      title: "Trees and recursive structure",
      summary:
        "Model hierarchical data with nodes and combine answers from subtrees.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Trees are recursive data

A binary tree node references up to two smaller trees:

\`\`\`csharp
public sealed class Node {
    public int Value;
    public Node Left;
    public Node Right;
}
\`\`\`

Depth-first traversal follows that structure naturally:

\`\`\`csharp
int Depth(Node node) {
    if (node == null) return 0;
    return 1 + Math.Max(Depth(node.Left), Depth(node.Right));
}
\`\`\`

Preorder processes a node before its children, inorder processes it between the left and right children, and postorder processes it after both children. Choose the order based on when the parent has enough information.`,
        },
        {
          kind: "prose",
          markdown: `## Binary search tree insertion

In a binary search tree, every value in the left subtree is smaller than the node and every value in the right subtree is larger. Searching and insertion follow one branch at each comparison.

The average cost is O(log n) when the tree stays balanced. Inserting already sorted values into a plain BST creates a chain and degrades operations to O(n). Production ordered maps use balancing schemes to prevent this.

The exercise builds an ordinary BST so you can see how insertion order changes its depth.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "bst-depth",
            title: "Build a BST and measure its depth",
            prompt: `Insert the distinct values from \`values\` into a binary search tree in the given order. Return the tree's maximum depth, counting the root as depth 1. Return 0 for an empty input.

\`\`\`text
BstDepth([4, 2, 6, 1, 3, 5, 7]) -> 3
BstDepth([1, 2, 3, 4])          -> 4
\`\`\`

Define a node class, an insertion helper, and a recursive depth helper.`,
            signature: {
              name: "bstDepth",
              params: [{ name: "values", type: "int[]" }],
              returns: "int",
            },
            tests: [
              { input: [[4, 2, 6, 1, 3, 5, 7]], expected: 3 },
              { input: [[1, 2, 3, 4]], expected: 4 },
              { input: [[]], expected: 0 },
              { input: [[10]], expected: 1, hidden: true },
              {
                input: [[5, 3, 8, 2, 4, 7, 9, 1]],
                expected: 4,
                hidden: true,
              },
            ],
            starterCode: `public sealed class Node {
    public int Value;
    public Node Left;
    public Node Right;

    public Node(int value) {
        Value = value;
    }
}

public class Solution {
    private Node Insert(Node node, int value) {
        // Return the subtree root after insertion.
    }

    private int Depth(Node node) {
        // Empty tree is 0; otherwise combine the two subtree depths.
    }

    public int BstDepth(int[] values) {
        // Insert in order, then measure the completed tree.
    }
}`,
            solution: `public sealed class Node {
    public int Value;
    public Node Left;
    public Node Right;

    public Node(int value) {
        Value = value;
    }
}

public class Solution {
    private Node Insert(Node node, int value) {
        if (node == null) return new Node(value);
        if (value < node.Value) {
            node.Left = Insert(node.Left, value);
        } else {
            node.Right = Insert(node.Right, value);
        }
        return node;
    }

    private int Depth(Node node) {
        if (node == null) return 0;
        return 1 + System.Math.Max(Depth(node.Left), Depth(node.Right));
    }

    public int BstDepth(int[] values) {
        Node root = null;
        foreach (int value in values) {
            root = Insert(root, value);
        }
        return Depth(root);
    }
}`,
            hints: [
              "Insertion returns a new node when it reaches a null child.",
              "Depth is one plus the greater depth of the left and right subtrees.",
              "Assign `root = Insert(root, value)` for every input value.",
            ],
          },
        },
      ],
    },
    {
      slug: "graphs-bfs-and-dfs",
      title: "Graphs, BFS, and DFS",
      summary:
        "Represent arbitrary connections and traverse every reachable vertex once.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Adjacency lists fit sparse graphs

A graph has vertices and edges. An adjacency list stores each vertex's neighbors:

\`\`\`csharp
var graph = new List<int>[n];
for (int i = 0; i < n; i++) {
    graph[i] = new List<int>();
}
\`\`\`

For an undirected edge \`[a, b]\`, add both \`b\` to \`a\`'s list and \`a\` to \`b\`'s list.

With \`V\` vertices and \`E\` edges, building and traversing an adjacency list costs O(V + E). An adjacency matrix costs O(V²) space and is useful mainly for dense graphs or constant-time edge checks.`,
        },
        {
          kind: "prose",
          markdown: `## BFS and DFS differ in frontier order

Both traversals mark vertices as visited so cycles do not create infinite loops.

- Breadth-first search uses a queue and visits by distance layers. It finds shortest path lengths in unweighted graphs.
- Depth-first search uses recursion or an explicit stack and follows one branch before returning.

To count connected components, start a traversal from every unvisited vertex. Each new start discovers one whole component.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "connected-components",
            title: "Count connected components",
            prompt: `There are \`n\` vertices numbered \`0\` through \`n - 1\`. Each row of \`edges\` is an undirected edge \`[a, b]\`.

Return the number of connected components, including isolated vertices.

\`\`\`text
CountComponents(5, [[0,1], [1,2], [3,4]]) -> 2
CountComponents(4, [])                    -> 4
\`\`\`

Build an adjacency list and run BFS or DFS from each unvisited vertex.`,
            signature: {
              name: "countComponents",
              params: [
                { name: "n", type: "int" },
                { name: "edges", type: "int[][]" },
              ],
              returns: "int",
            },
            tests: [
              {
                input: [5, [[0, 1], [1, 2], [3, 4]]],
                expected: 2,
              },
              { input: [4, []], expected: 4 },
              {
                input: [6, [[0, 1], [1, 2], [2, 0], [4, 5]]],
                expected: 3,
              },
              { input: [0, []], expected: 0, hidden: true },
              {
                input: [5, [[0, 1], [1, 2], [2, 3], [3, 4]]],
                expected: 1,
                hidden: true,
              },
            ],
            starterCode: `using System.Collections.Generic;

public class Solution {
    public int CountComponents(int n, int[][] edges) {
        // Build an undirected adjacency list, then traverse each component.
    }
}`,
            solution: `using System.Collections.Generic;

public class Solution {
    public int CountComponents(int n, int[][] edges) {
        var graph = new List<int>[n];
        for (int i = 0; i < n; i++) {
            graph[i] = new List<int>();
        }
        foreach (int[] edge in edges) {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }

        bool[] visited = new bool[n];
        int components = 0;
        for (int start = 0; start < n; start++) {
            if (visited[start]) continue;
            components++;

            var queue = new Queue<int>();
            queue.Enqueue(start);
            visited[start] = true;

            while (queue.Count > 0) {
                int current = queue.Dequeue();
                foreach (int next in graph[current]) {
                    if (visited[next]) continue;
                    visited[next] = true;
                    queue.Enqueue(next);
                }
            }
        }
        return components;
    }
}`,
            hints: [
              "Initialise an empty neighbor list for every vertex, including isolated ones.",
              "Add both directions for each undirected edge.",
              "Increment the component count only when starting from an unvisited vertex.",
            ],
          },
        },
      ],
    },
    {
      slug: "backtracking",
      title: "Backtracking and search state",
      summary:
        "Explore a decision tree while restoring state between alternatives.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Backtracking explores choices

Backtracking performs a depth-first search over decisions:

1. Choose one option.
2. Recurse on the remaining problem.
3. Undo mutable state when returning.
4. Try the next option.

It is suitable for permutations, combinations, constraint puzzles, and subset search. The search space is often exponential, so pruning invalid branches early matters.

A subset decision has two branches for each element: exclude it or include it. This creates up to \`2^n\` leaves. The implementation can pass the current sum by value, so no explicit undo is needed.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "count-target-subsets",
            title: "Count subsets that reach a target",
            prompt: `Return the number of subsets of \`nums\` whose values sum to \`target\`.

Each array position can be used at most once. Equal values at different positions are distinct choices. The empty subset counts when \`target\` is 0.

\`\`\`text
CountTargetSubsets([1, 2, 3], 3) -> 2   // [3], [1,2]
CountTargetSubsets([], 0)        -> 1
\`\`\`

At each index, recurse once without the value and once including it.`,
            signature: {
              name: "countTargetSubsets",
              params: [
                { name: "nums", type: "int[]" },
                { name: "target", type: "int" },
              ],
              returns: "int",
            },
            tests: [
              { input: [[1, 2, 3], 3], expected: 2 },
              { input: [[], 0], expected: 1 },
              { input: [[], 5], expected: 0 },
              {
                input: [[1, 1, 1], 2],
                expected: 3,
                hidden: true,
              },
              {
                input: [[-1, 1, 2], 1],
                expected: 2,
                hidden: true,
              },
            ],
            starterCode: `public class Solution {
    private int Search(int[] nums, int index, int remaining) {
        // Count solutions from this index with include/exclude branches.
    }

    public int CountTargetSubsets(int[] nums, int target) {
        // Begin the search at index 0.
    }
}`,
            solution: `public class Solution {
    private int Search(int[] nums, int index, int remaining) {
        if (index == nums.Length) {
            return remaining == 0 ? 1 : 0;
        }

        int without = Search(nums, index + 1, remaining);
        int with = Search(nums, index + 1, remaining - nums[index]);
        return without + with;
    }

    public int CountTargetSubsets(int[] nums, int target) {
        return Search(nums, 0, target);
    }
}`,
            hints: [
              "At the end of the array, return 1 only when the remaining target is zero.",
              "One recursive call skips `nums[index]`.",
              "The other call includes it by subtracting it from `remaining`.",
            ],
          },
        },
      ],
    },
    {
      slug: "dynamic-programming",
      title: "Dynamic programming",
      summary:
        "Cache overlapping subproblems and build answers in dependency order.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Dynamic programming needs two properties

Dynamic programming applies when:

- the problem has overlapping subproblems;
- an optimal or counted answer can be composed from smaller answers.

Memoization starts with recursion and caches results. Tabulation defines states and fills them iteratively in an order where dependencies are already known.

For minimum coin change, let \`dp[a]\` be the fewest coins needed to make amount \`a\`. The base state is \`dp[0] = 0\`. For each amount:

\`\`\`text
dp[amount] = min(dp[amount - coin] + 1)
\`\`\`

for every coin that does not exceed the amount and whose smaller state is reachable.`,
        },
        {
          kind: "prose",
          markdown: `## State definition comes before code

Before writing a DP loop, state:

1. What does one table entry mean?
2. What are the base cases?
3. Which smaller states lead to this state?
4. In what order must states be computed?
5. What value represents unreachable?

For coin change with amount \`A\` and \`C\` coin types, the table uses O(A) space and the nested transitions use O(A * C) time.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "coin-change",
            title: "Minimum coins",
            prompt: `Return the fewest coins needed to make \`amount\` using unlimited copies of the positive denominations in \`coins\`.

Return \`-1\` when the amount cannot be made.

\`\`\`text
CoinChange([1, 2, 5], 11) -> 3
CoinChange([2], 3)        -> -1
CoinChange([2], 0)        -> 0
\`\`\`

Use bottom-up dynamic programming with \`dp[0] = 0\`.`,
            signature: {
              name: "coinChange",
              params: [
                { name: "coins", type: "int[]" },
                { name: "amount", type: "int" },
              ],
              returns: "int",
            },
            tests: [
              { input: [[1, 2, 5], 11], expected: 3 },
              { input: [[2], 3], expected: -1 },
              { input: [[2], 0], expected: 0 },
              { input: [[1], 7], expected: 7, hidden: true },
              {
                input: [[2, 5, 10, 1], 27],
                expected: 4,
                hidden: true,
              },
            ],
            starterCode: `using System;

public class Solution {
    public int CoinChange(int[] coins, int amount) {
        // dp[a] is the fewest coins needed to make amount a.
    }
}`,
            solution: `using System;

public class Solution {
    public int CoinChange(int[] coins, int amount) {
        int unreachable = amount + 1;
        int[] dp = new int[amount + 1];
        for (int i = 1; i <= amount; i++) {
            dp[i] = unreachable;
        }

        for (int current = 1; current <= amount; current++) {
            foreach (int coin in coins) {
                if (coin <= current && dp[current - coin] != unreachable) {
                    dp[current] = Math.Min(
                        dp[current],
                        dp[current - coin] + 1
                    );
                }
            }
        }

        return dp[amount] == unreachable ? -1 : dp[amount];
    }
}`,
            hints: [
              "Use `amount + 1` as an unreachable sentinel because no valid answer needs that many coins.",
              "For each amount, inspect every coin that fits.",
              "A transition is valid only when `dp[current - coin]` is reachable.",
            ],
          },
        },
      ],
    },
  ],
};
