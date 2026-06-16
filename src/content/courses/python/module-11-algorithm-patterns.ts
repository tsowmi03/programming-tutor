import type { CourseModule } from "../types";

export const pythonAlgorithmPatterns: CourseModule = {
  slug: "algorithm-patterns",
  title: "Algorithm Patterns in Python",
  description:
    "Practise the recurring shapes behind sorting, two pointers, sliding windows, prefix sums, trees, graphs, backtracking, and dynamic programming.",
  lessons: [
    {
      slug: "sorting-and-intervals",
      title: "Sorting and interval processing",
      summary:
        "Sort data into an order that turns a global problem into a local scan.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Sorting is often the setup step

Python makes sorting compact:

\`\`\`python
ordered = sorted(items, key=lambda item: item.start)
items.sort(key=lambda item: item.start)  # in place
\`\`\`

Sorting costs O(n log n), but it can reveal structure:

- duplicates become adjacent;
- intervals that may overlap become adjacent;
- two-pointer scans become possible;
- binary search becomes meaningful.

Know whether you are mutating the input. \`sorted(...)\` returns a new list. \`list.sort(...)\` mutates the list and returns \`None\`.`,
        },
        {
          kind: "prose",
          markdown: `## Merge intervals after sorting by start

For intervals \`[start, end]\`, sort by \`start\`. Keep one current merged interval:

1. If the next start is at most the current end, extend the current end.
2. Otherwise, append the current interval and start a new one.

After sorting, every possible overlap with the current interval arrives next, so a single scan is enough. Sorting dominates the total cost: O(n log n).`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "merge-intervals",
            title: "Merge overlapping intervals",
            prompt: `Each row of \`intervals\` is \`[start, end]\` with \`start <= end\`.

Merge every overlapping or touching interval and return the merged intervals sorted by start.

\`\`\`text
merge_intervals([[1,3], [2,6], [8,10], [10,12]])
-> [[1,6], [8,12]]
\`\`\`

Use \`sorted\` so the original input list does not need to be mutated.`,
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
              { input: [[[1, 4], [5, 7]]], expected: [[1, 4], [5, 7]] },
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
            starterCode: `def merge_intervals(intervals):
    # Sort by start, then scan and merge.
    pass
`,
            solution: `def merge_intervals(intervals):
    if not intervals:
        return []

    ordered = sorted((start, end) for start, end in intervals)
    merged = []
    cur_start, cur_end = ordered[0]

    for start, end in ordered[1:]:
        if start <= cur_end:
            cur_end = max(cur_end, end)
        else:
            merged.append([cur_start, cur_end])
            cur_start, cur_end = start, end

    merged.append([cur_start, cur_end])
    return merged
`,
            hints: [
              "Handle the empty input before reading the first interval.",
              "`sorted((start, end) for start, end in intervals)` sorts by start, then end.",
              "Append the final current interval after the loop.",
            ],
          },
        },
      ],
    },
    {
      slug: "two-pointers",
      title: "Two pointers",
      summary:
        "Move indices according to a rule that safely shrinks the search space.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Two pointers avoid nested loops

Two-pointer algorithms maintain positions that move according to what the current comparison proves.

Common shapes:

- left and right ends moving inward;
- slow and fast positions moving in one direction;
- one read pointer and one write pointer.

For a sorted list containing negatives, the largest square is at one of the two ends. Compare absolute values, write the larger square at the back of the result, then move that pointer inward.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "sorted-squares",
            title: "Squares of a sorted list",
            prompt: `\`nums\` is sorted ascending and may contain negative values.

Return the square of every value, also sorted ascending.

\`\`\`text
sorted_squares([-4, -1, 0, 3, 10]) -> [0, 1, 9, 16, 100]
\`\`\`

Use pointers at both ends and fill the result from right to left in O(n).`,
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
              { input: [[-5, -4, -1]], expected: [1, 16, 25], hidden: true },
              { input: [[0, 1, 2]], expected: [0, 1, 4], hidden: true },
            ],
            starterCode: `def sorted_squares(nums):
    # Compare both ends and fill the result from the back.
    pass
`,
            solution: `def sorted_squares(nums):
    result = [0] * len(nums)
    left, right = 0, len(nums) - 1

    for write in range(len(nums) - 1, -1, -1):
        left_square = nums[left] * nums[left]
        right_square = nums[right] * nums[right]
        if left_square > right_square:
            result[write] = left_square
            left += 1
        else:
            result[write] = right_square
            right -= 1
    return result
`,
            hints: [
              "The largest remaining square must come from `left` or `right`.",
              "Fill `result` from the last index down to zero.",
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
        "Reuse overlap between neighboring contiguous ranges.",
      blocks: [
        {
          kind: "prose",
          markdown: `## A fixed window changes incrementally

A contiguous window of length \`k\` loses one value and gains one value each time it slides:

\`\`\`text
new_sum = old_sum - outgoing + incoming
\`\`\`

Compute the first window once, then update in O(1) per move. Total time is O(n), not O(nk).

Variable-size windows use left and right boundaries. Expand right to include values; move left while the window violates a condition. This works when removing values changes the condition predictably.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "maximum-window-sum",
            title: "Maximum fixed-window sum",
            prompt: `Return the maximum sum of any contiguous subarray of exactly \`k\` elements.

\`\`\`text
max_window_sum([2, 1, 5, 1, 3, 2], 3) -> 9
max_window_sum([-5, -2, -3], 2)       -> -5
\`\`\`

Assume \`1 <= k <= len(nums)\`.`,
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
              { input: [[1, 2, 3, 4, 5], 5], expected: 15, hidden: true },
              {
                input: [[4, -1, 2, 10, -2, 3], 2],
                expected: 12,
                hidden: true,
              },
            ],
            starterCode: `def max_window_sum(nums, k):
    # Sum the first k values, then slide the window.
    pass
`,
            solution: `def max_window_sum(nums, k):
    window = sum(nums[:k])
    best = window
    for right in range(k, len(nums)):
        window += nums[right]
        window -= nums[right - k]
        best = max(best, window)
    return best
`,
            hints: [
              "`sum(nums[:k])` computes the first complete window.",
              "When index `right` enters, index `right - k` leaves.",
              "Initialise `best` from the first window so all-negative inputs work.",
            ],
          },
        },
      ],
    },
    {
      slug: "prefix-sums-and-counting",
      title: "Prefix sums and counting maps",
      summary:
        "Turn subarray sum questions into lookups of prior cumulative totals.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Prefix sums describe every subarray

Let \`prefix[i]\` be the sum before index \`i\`. The sum from \`left\` through \`right - 1\` is:

\`\`\`text
prefix[right] - prefix[left]
\`\`\`

For "how many subarrays sum to k", scan once while storing how often each previous prefix sum has appeared. If the current prefix is \`p\), then a prior prefix \`p - k\` forms a subarray ending here with sum \`k\`.

This pattern handles negative numbers, where sliding-window sum rules often break.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "subarray-sum-count",
            title: "Count subarrays summing to k",
            prompt: `Return the number of contiguous subarrays whose sum is exactly \`k\`.

\`\`\`text
subarray_sum_count([1, 1, 1], 2) -> 2
subarray_sum_count([1, -1, 0], 0) -> 3
\`\`\`

Use a dictionary of prefix-sum frequencies.`,
            signature: {
              name: "subarraySumCount",
              params: [
                { name: "nums", type: "int[]" },
                { name: "k", type: "int" },
              ],
              returns: "int",
            },
            tests: [
              { input: [[1, 1, 1], 2], expected: 2 },
              { input: [[1, -1, 0], 0], expected: 3 },
              { input: [[], 0], expected: 0 },
              { input: [[3, 4, 7, 2, -3, 1, 4, 2], 7], expected: 4, hidden: true },
              { input: [[0, 0, 0], 0], expected: 6, hidden: true },
            ],
            starterCode: `def subarray_sum_count(nums, k):
    # Count prior prefix sums that would make the current subarray sum to k.
    pass
`,
            solution: `def subarray_sum_count(nums, k):
    seen = {0: 1}
    prefix = 0
    total = 0
    for n in nums:
        prefix += n
        total += seen.get(prefix - k, 0)
        seen[prefix] = seen.get(prefix, 0) + 1
    return total
`,
            hints: [
              "Start with `{0: 1}` so subarrays beginning at index 0 are counted.",
              "At current prefix `p`, prior prefix `p - k` gives sum `k`.",
              "Update the dictionary after counting matches for this position.",
            ],
          },
        },
      ],
    },
    {
      slug: "trees-and-recursive-structure",
      title: "Trees and recursive structure",
      summary:
        "Model hierarchical data and combine answers from subtrees.",
      blocks: [
        {
          kind: "prose",
          markdown: `## A tree node contains smaller trees

A binary tree node has a value and optional left and right children:

\`\`\`python
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
\`\`\`

Recursive tree functions usually have a base case for \`None\`, then combine the answers from children:

\`\`\`python
def depth(node):
    if node is None:
        return 0
    return 1 + max(depth(node.left), depth(node.right))
\`\`\`

The traversal order depends on when the parent can be processed: before children, between children, or after children.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "bst-depth",
            title: "Build a BST and measure its depth",
            prompt: `Insert the distinct values from \`values\` into a binary search tree in the given order. Return the tree's maximum depth, counting the root as depth 1. Return 0 for an empty input.

\`\`\`text
bst_depth([4, 2, 6, 1, 3, 5, 7]) -> 3
bst_depth([1, 2, 3, 4])          -> 4
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
            starterCode: `def bst_depth(values):
    # Insert values into a BST, then return its maximum depth.
    pass
`,
            solution: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def _insert(node, value):
    if node is None:
        return Node(value)
    if value < node.value:
        node.left = _insert(node.left, value)
    else:
        node.right = _insert(node.right, value)
    return node


def _depth(node):
    if node is None:
        return 0
    return 1 + max(_depth(node.left), _depth(node.right))


def bst_depth(values):
    root = None
    for value in values:
        root = _insert(root, value)
    return _depth(root)
`,
            hints: [
              "Insertion returns a new node when it reaches `None`.",
              "Depth is one plus the greater child depth.",
              "Remember `root = _insert(root, value)` for the first insertion.",
            ],
          },
        },
      ],
    },
    {
      slug: "graphs-bfs-and-dfs",
      title: "Graphs, BFS, and DFS",
      summary:
        "Represent arbitrary connections and traverse each reachable vertex once.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Adjacency lists fit sparse graphs

For \`n\` vertices numbered \`0\` through \`n - 1\`, an adjacency list is usually a list of lists:

\`\`\`python
graph = [[] for _ in range(n)]
for a, b in edges:
    graph[a].append(b)
    graph[b].append(a)
\`\`\`

This is O(V + E) space for a sparse graph. An adjacency matrix uses O(V²) space and is useful mainly when the graph is dense or edge existence checks dominate.

BFS uses a \`deque\`. DFS can use recursion or a stack. Both need a visited set or Boolean list to handle cycles.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "connected-components",
            title: "Count connected components",
            prompt: `There are \`n\` vertices numbered \`0\` through \`n - 1\`. Each row of \`edges\` is an undirected edge \`[a, b]\`.

Return the number of connected components, including isolated vertices.

\`\`\`text
count_components(5, [[0,1], [1,2], [3,4]]) -> 2
count_components(4, [])                    -> 4
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
              { input: [5, [[0, 1], [1, 2], [3, 4]]], expected: 2 },
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
            starterCode: `def count_components(n, edges):
    # Build an undirected adjacency list, then traverse each component.
    pass
`,
            solution: `from collections import deque


def count_components(n, edges):
    graph = [[] for _ in range(n)]
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)

    visited = [False] * n
    components = 0

    for start in range(n):
        if visited[start]:
            continue
        components += 1
        queue = deque([start])
        visited[start] = True

        while queue:
            current = queue.popleft()
            for neighbor in graph[current]:
                if not visited[neighbor]:
                    visited[neighbor] = True
                    queue.append(neighbor)

    return components
`,
            hints: [
              "Initialise an empty neighbor list for every vertex.",
              "Add both directions for each undirected edge.",
              "Start a traversal only from unvisited vertices; each start is one component.",
            ],
          },
        },
      ],
    },
    {
      slug: "backtracking",
      title: "Backtracking and search state",
      summary:
        "Explore decision trees while keeping state restoration explicit.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Backtracking explores choices

Backtracking is depth-first search over decisions:

1. Choose one option.
2. Recurse on the remaining problem.
3. Restore mutable state if it was changed.
4. Try the next option.

For subset search, each element has two branches: exclude it or include it. Passing the remaining target by value means there is no mutable state to undo.

The number of subsets is O(2^n), so pruning is important when constraints allow it. With negative numbers, simple "remaining below zero" pruning is not generally safe.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "count-target-subsets",
            title: "Count subsets that reach a target",
            prompt: `Return the number of subsets of \`nums\` whose values sum to \`target\`.

Each array position can be used at most once. Equal values at different positions are distinct choices. The empty subset counts when \`target\` is 0.

\`\`\`text
count_target_subsets([1, 2, 3], 3) -> 2   # [3], [1,2]
count_target_subsets([], 0)        -> 1
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
              { input: [[1, 1, 1], 2], expected: 3, hidden: true },
              { input: [[-1, 1, 2], 1], expected: 2, hidden: true },
            ],
            starterCode: `def count_target_subsets(nums, target):
    # Count include/exclude choices recursively.
    pass
`,
            solution: `def count_target_subsets(nums, target):
    def search(index, remaining):
        if index == len(nums):
            return 1 if remaining == 0 else 0
        without = search(index + 1, remaining)
        with_current = search(index + 1, remaining - nums[index])
        return without + with_current

    return search(0, target)
`,
            hints: [
              "At the end of the list, return 1 only when the remaining target is zero.",
              "One recursive call skips the current number.",
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
        "Cache overlapping subproblems or tabulate them in dependency order.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Define the state first

Dynamic programming applies when smaller subproblem answers are reused. Before coding, define:

1. What does one state mean?
2. What are the base cases?
3. Which smaller states can transition into this state?
4. What order computes dependencies first?
5. What value represents impossible?

For coin change, let \`dp[amount]\` mean the fewest coins needed to make that amount. \`dp[0] = 0\). Every coin can transition from \`amount - coin\` to \`amount\`.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "coin-change",
            title: "Minimum coins",
            prompt: `Return the fewest coins needed to make \`amount\` using unlimited copies of the positive denominations in \`coins\`.

Return \`-1\` when the amount cannot be made.

\`\`\`text
coin_change([1, 2, 5], 11) -> 3
coin_change([2], 3)        -> -1
coin_change([2], 0)        -> 0
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
              { input: [[2, 5, 10, 1], 27], expected: 4, hidden: true },
            ],
            starterCode: `def coin_change(coins, amount):
    # dp[a] is the fewest coins needed to make amount a.
    pass
`,
            solution: `def coin_change(coins, amount):
    unreachable = amount + 1
    dp = [0] + [unreachable] * amount

    for current in range(1, amount + 1):
        for coin in coins:
            if coin <= current and dp[current - coin] != unreachable:
                dp[current] = min(dp[current], dp[current - coin] + 1)

    return -1 if dp[amount] == unreachable else dp[amount]
`,
            hints: [
              "`amount + 1` is a safe unreachable sentinel.",
              "For each amount, inspect every coin that fits.",
              "If `dp[amount]` is still unreachable at the end, return `-1`.",
            ],
          },
        },
      ],
    },
  ],
};
