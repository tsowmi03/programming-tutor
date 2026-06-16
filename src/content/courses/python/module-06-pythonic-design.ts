import type { CourseModule } from "../types";

export const pythonPythonicDesign: CourseModule = {
  slug: "pythonic-design",
  title: "Pythonic Design and Data Modeling",
  description:
    "Use Python's function model, dataclasses, special methods, and decorators to express behavior cleanly.",
  lessons: [
    {
      slug: "first-class-functions",
      title: "First-class functions and closures",
      summary:
        "Pass behavior as data and capture small pieces of state deliberately.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Functions are objects

Python functions can be assigned, passed, returned, stored in containers, and called later:

\`\`\`python
def square(n):
    return n * n

operation = square
operation(5)  # 25
\`\`\`

Small anonymous functions use \`lambda\`, most often as a \`key\` function or callback:

\`\`\`python
sorted(words, key=lambda word: (len(word), word))
\`\`\`

A closure is a function that remembers variables from its enclosing scope:

\`\`\`python
def add_offset(offset):
    def inner(value):
        return value + offset
    return inner
\`\`\`

Use closures for small behavior with a little configuration. Use a class when the behavior has several operations, a public state model, or a meaningful identity.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "transform-by-mode",
            title: "Select behavior with a function",
            prompt: `Return a transformed copy of \`nums\` according to \`mode\`:

- \`"square"\`: \`n * n\`
- \`"negate"\`: \`-n\`
- \`"absolute"\`: \`abs(n)\`
- any other mode: leave \`n\` unchanged

\`\`\`text
transform_by_mode([1, -2, 3], "square")   -> [1, 4, 9]
transform_by_mode([1, -2, 3], "absolute") -> [1, 2, 3]
\`\`\`

Choose one function, then use the same comprehension for every mode.`,
            signature: {
              name: "transformByMode",
              params: [
                { name: "nums", type: "int[]" },
                { name: "mode", type: "string" },
              ],
              returns: "int[]",
            },
            tests: [
              { input: [[1, -2, 3], "square"], expected: [1, 4, 9] },
              { input: [[1, -2, 3], "absolute"], expected: [1, 2, 3] },
              { input: [[1, -2, 3], "negate"], expected: [-1, 2, -3] },
              { input: [[], "square"], expected: [], hidden: true },
              { input: [[4, 0, -5], "unknown"], expected: [4, 0, -5], hidden: true },
            ],
            starterCode: `def transform_by_mode(nums, mode):
    # Select one function, then apply it to every number.
    pass
`,
            solution: `def transform_by_mode(nums, mode):
    if mode == "square":
        transform = lambda n: n * n
    elif mode == "negate":
        transform = lambda n: -n
    elif mode == "absolute":
        transform = abs
    else:
        transform = lambda n: n
    return [transform(n) for n in nums]
`,
            hints: [
              "Assign the selected behavior to a local name such as `transform`.",
              "`abs` is already a function, so it can be assigned directly.",
              "Once the function is selected, `[transform(n) for n in nums]` handles every mode.",
            ],
          },
        },
      ],
    },
    {
      slug: "argument-design",
      title: "Argument design and call clarity",
      summary:
        "Use defaults, keyword-only parameters, *args, and **kwargs where they clarify a contract.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Parameters shape the API

Python supports several parameter forms:

\`\`\`python
def connect(host, port=5432, *, timeout=5):
    ...
\`\`\`

\`host\` is required. \`port\` has a default. \`timeout\` is keyword-only because it appears after \`*\`.

Keyword-only parameters make Boolean and option-heavy APIs clearer:

\`\`\`python
connect("localhost", timeout=10)
\`\`\`

\`*args\` collects extra positional arguments into a tuple. \`**kwargs\` collects extra keyword arguments into a dict. Use them for true forwarding or flexible APIs, not to avoid designing a clear signature.`,
        },
        {
          kind: "prose",
          markdown: `## The mutable-default trap

Default arguments are evaluated once when the function is defined:

\`\`\`python
def add_bad(value, bucket=[]):
    bucket.append(value)
    return bucket
\`\`\`

Every call without \`bucket\` shares the same list. Use \`None\` as the default sentinel:

\`\`\`python
def add_good(value, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(value)
    return bucket
\`\`\`

The same rule applies to dictionaries, sets, and custom mutable objects.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "build-prefixed-labels",
            title: "Build prefixed labels",
            prompt: `Return a label for each name in \`names\` using the format \`"{prefix}:{index}:{name}"\`.

Indexing starts at 1.

\`\`\`text
build_prefixed_labels("user", ["Ada", "Grace"]) -> ["user:1:Ada", "user:2:Grace"]
\`\`\`

Use \`enumerate(names, start=1)\` and an f-string.`,
            signature: {
              name: "buildPrefixedLabels",
              params: [
                { name: "prefix", type: "string" },
                { name: "names", type: "string[]" },
              ],
              returns: "string[]",
            },
            tests: [
              {
                input: ["user", ["Ada", "Grace"]],
                expected: ["user:1:Ada", "user:2:Grace"],
              },
              { input: ["x", []], expected: [] },
              { input: ["item", ["one"]], expected: ["item:1:one"] },
              {
                input: ["n", ["a", "b", "c"]],
                expected: ["n:1:a", "n:2:b", "n:3:c"],
                hidden: true,
              },
            ],
            starterCode: `def build_prefixed_labels(prefix, names):
    # Return labels in the format prefix:index:name, starting at 1.
    pass
`,
            solution: `def build_prefixed_labels(prefix, names):
    return [
        f"{prefix}:{index}:{name}"
        for index, name in enumerate(names, start=1)
    ]
`,
            hints: [
              "`enumerate(names, start=1)` yields `(1, first_name)`, then `(2, second_name)`, and so on.",
              "An f-string can embed all three parts.",
              "A list comprehension preserves order and builds the returned list.",
            ],
          },
        },
      ],
    },
    {
      slug: "dataclasses-and-domain-records",
      title: "Dataclasses and domain records",
      summary:
        "Model small data objects without writing boilerplate constructors and repr methods.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Dataclasses are for data-shaped objects

\`dataclasses.dataclass\` generates an \`__init__\`, \`__repr__\`, equality, and optional ordering from annotated fields:

\`\`\`python
from dataclasses import dataclass

@dataclass(frozen=True)
class Student:
    name: str
    score: int
\`\`\`

\`frozen=True\` makes the instance immutable after construction. That is useful for values that should not drift after creation.

Use a dataclass when the object is mainly a named bundle of fields. Use a normal class when it owns invariants, lifecycle, side effects, or several behaviors.`,
        },
        {
          kind: "prose",
          markdown: `## Ordering and derived sort keys

Dataclasses can be sorted by their fields if \`order=True\`, but explicit sort keys are often clearer:

\`\`\`python
students = [Student("Ada", 95), Student("Grace", 95)]
sorted(students, key=lambda s: (-s.score, s.name))
\`\`\`

That key says exactly what the domain needs: higher score first, name ascending on ties.

\`__post_init__\` can validate or derive fields after the generated initializer runs. If you need significant validation, consider whether a regular class with an explicit constructor would be clearer.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "top-students",
            title: "Sort student records",
            prompt: `Given parallel lists \`names\` and \`scores\`, return the names sorted by:

1. higher score first;
2. name ascending for equal scores.

\`\`\`text
top_students(["Ada", "Grace", "Linus"], [95, 95, 80]) -> ["Ada", "Grace", "Linus"]
\`\`\`

Define a small dataclass for the paired data, then sort with an explicit key.`,
            signature: {
              name: "topStudents",
              params: [
                { name: "names", type: "string[]" },
                { name: "scores", type: "int[]" },
              ],
              returns: "string[]",
            },
            tests: [
              {
                input: [["Ada", "Grace", "Linus"], [95, 95, 80]],
                expected: ["Ada", "Grace", "Linus"],
              },
              {
                input: [["B", "A"], [10, 10]],
                expected: ["A", "B"],
              },
              { input: [[], []], expected: [] },
              {
                input: [["Tom", "Alex", "Sam"], [70, 90, 90]],
                expected: ["Alex", "Sam", "Tom"],
                hidden: true,
              },
            ],
            starterCode: `def top_students(names, scores):
    # Pair names and scores, then sort by score desc and name asc.
    pass
`,
            solution: `from dataclasses import dataclass


@dataclass(frozen=True)
class Student:
    name: str
    score: int


def top_students(names, scores):
    students = [
        Student(name, score)
        for name, score in zip(names, scores)
    ]
    students.sort(key=lambda student: (-student.score, student.name))
    return [student.name for student in students]
`,
            hints: [
              "`zip(names, scores)` pairs corresponding entries.",
              "Sort by `(-student.score, student.name)`.",
              "Return just the `name` field from the sorted records.",
            ],
          },
        },
      ],
    },
    {
      slug: "dunder-methods-and-protocols",
      title: "Dunder methods and protocols",
      summary:
        "Implement Python's informal interfaces by defining the special methods operations call.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Python operations call special methods

Python's syntax maps to methods with double underscores:

\`\`\`python
len(obj)      # obj.__len__()
obj[i]        # obj.__getitem__(i)
for x in obj  # obj.__iter__()
a < b         # a.__lt__(b)
str(obj)      # obj.__str__()
\`\`\`

These are sometimes called dunder methods. They let your types participate in Python protocols without inheriting from a particular base class.

Only implement special methods when your object genuinely behaves like that protocol. A class should not be iterable unless iteration has an obvious meaning for users.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "sort-points",
            title: "Sort points with a custom order",
            prompt: `Each row of \`points\` is \`[x, y]\`.

Return the points sorted by:

1. Manhattan distance from the origin, \`abs(x) + abs(y)\`;
2. \`x\` ascending;
3. \`y\` ascending.

\`\`\`text
sort_points([[1, 2], [0, 3], [-1, 1]]) -> [[-1, 1], [0, 3], [1, 2]]
\`\`\`

Define a small \`Point\` class with \`__lt__\`, sort instances, then convert back to lists.`,
            signature: {
              name: "sortPoints",
              params: [{ name: "points", type: "int[][]" }],
              returns: "int[][]",
            },
            tests: [
              {
                input: [[[1, 2], [0, 3], [-1, 1]]],
                expected: [[-1, 1], [0, 3], [1, 2]],
              },
              { input: [[]], expected: [] },
              {
                input: [[[2, 0], [0, 2], [-2, 0], [0, -2]]],
                expected: [[-2, 0], [0, -2], [0, 2], [2, 0]],
              },
              {
                input: [[[3, 4], [1, 1], [2, -1]]],
                expected: [[1, 1], [2, -1], [3, 4]],
                hidden: true,
              },
            ],
            starterCode: `def sort_points(points):
    # Sort by manhattan distance, then x, then y.
    pass
`,
            solution: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def key(self):
        return (abs(self.x) + abs(self.y), self.x, self.y)

    def __lt__(self, other):
        return self.key() < other.key()


def sort_points(points):
    objects = [Point(x, y) for x, y in points]
    objects.sort()
    return [[point.x, point.y] for point in objects]
`,
            hints: [
              "A tuple key can express all three sorting rules.",
              "`__lt__` should compare this point's key with the other point's key.",
              "After sorting objects, return `[[point.x, point.y] for point in objects]`.",
            ],
          },
        },
      ],
    },
    {
      slug: "decorators-and-caching",
      title: "Decorators and caching",
      summary:
        "Wrap functions to add behavior and cache overlapping subproblems.",
      blocks: [
        {
          kind: "prose",
          markdown: `## A decorator replaces a function with another callable

A decorator receives a function and returns a function:

\`\`\`python
def logged(fn):
    def wrapper(*args, **kwargs):
        print("calling", fn.__name__)
        return fn(*args, **kwargs)
    return wrapper

@logged
def add(a, b):
    return a + b
\`\`\`

The \`@logged\` form is syntax for \`add = logged(add)\`.

Decorators are useful for cross-cutting behavior such as caching, retries, timing, authorization checks, and registration. Keep wrappers transparent where possible by preserving the original signature or using \`functools.wraps\`.`,
        },
        {
          kind: "prose",
          markdown: `## functools.cache and lru_cache

Recursive functions with overlapping subproblems often need memoization. Python's standard library handles that:

\`\`\`python
from functools import cache

@cache
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)
\`\`\`

\`cache\` is available in Python 3.9+. \`lru_cache(maxsize=None)\` is the older equivalent and remains common. Cache only pure functions: the same arguments should always produce the same result without depending on mutable outside state.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "tribonacci-with-cache",
            title: "Tribonacci with caching",
            prompt: `The Tribonacci sequence is:

- \`T(0) = 0\`
- \`T(1) = 1\`
- \`T(2) = 1\`
- \`T(n) = T(n-1) + T(n-2) + T(n-3)\`

Return \`T(n)\` for \`0 <= n <= 30\`.

\`\`\`text
tribonacci(4)  -> 4
tribonacci(25) -> 1389537
\`\`\`

Use a cached recursive helper or bottom-up iteration. The intended practice is \`functools.lru_cache\`.`,
            signature: {
              name: "tribonacci",
              params: [{ name: "n", type: "int" }],
              returns: "int",
            },
            tests: [
              { input: [0], expected: 0 },
              { input: [1], expected: 1 },
              { input: [4], expected: 4 },
              { input: [10], expected: 149, hidden: true },
              { input: [25], expected: 1389537, hidden: true },
            ],
            starterCode: `def tribonacci(n):
    # Return T(n). Try a cached recursive helper.
    pass
`,
            solution: `from functools import lru_cache


def tribonacci(n):
    @lru_cache(maxsize=None)
    def helper(k):
        if k == 0:
            return 0
        if k <= 2:
            return 1
        return helper(k - 1) + helper(k - 2) + helper(k - 3)

    return helper(n)
`,
            hints: [
              "A nested helper keeps the cache local to one top-level call.",
              "The base cases are 0, 1, and 2.",
              "Decorate the helper with `@lru_cache(maxsize=None)` so repeated subproblems are computed once.",
            ],
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "count-cached-states",
            title: "Count unique recursive states",
            prompt: `A cached recursive function only computes each distinct state once.

For the recurrence \`f(n) = f(n-1) + f(n-2)\` with base states \`0\` and \`1\`, return how many distinct states are computed when evaluating \`f(n)\`.

\`\`\`text
count_cached_states(0) -> 1
count_cached_states(1) -> 1
count_cached_states(5) -> 6
\`\`\`

This is a reasoning check: base-case calls compute one state. For \`n >= 2\`, the computed states are exactly \`0\` through \`n\`.`,
            signature: {
              name: "countCachedStates",
              params: [{ name: "n", type: "int" }],
              returns: "int",
            },
            tests: [
              { input: [0], expected: 1 },
              { input: [1], expected: 1 },
              { input: [5], expected: 6 },
              { input: [10], expected: 11, hidden: true },
              { input: [30], expected: 31, hidden: true },
            ],
            starterCode: `def count_cached_states(n):
    # How many distinct states does the cached recurrence compute?
    pass
`,
            solution: `def count_cached_states(n):
    if n < 2:
        return 1
    return n + 1
`,
            hints: [
              "A direct base-case call such as `f(0)` or `f(1)` computes only that one state.",
              "With caching, `f(4)` computes states 4, 3, 2, 1, and 0 once each.",
              "For `n >= 2`, there are `n + 1` distinct states.",
            ],
          },
        },
      ],
    },
  ],
};
