import type { CourseModule } from "../types";

export const pythonLanguageDepth: CourseModule = {
  slug: "language-depth",
  title: "The Python Object Model in Practice",
  description:
    "Move beyond surface syntax into names, identity, mutability, numeric behavior, truthiness, exceptions, and type hints.",
  lessons: [
    {
      slug: "objects-names-and-mutability",
      title: "Objects, names, and mutability",
      summary:
        "Understand assignment, aliasing, shallow copies, and why mutation surprises people.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Names point at objects

Python variables are names bound to objects. Assignment does not copy an object; it binds another name to the same object.

\`\`\`python
a = [1, 2]
b = a
b.append(3)
print(a)  # [1, 2, 3]
\`\`\`

Every object has an identity, a type, and a value. \`is\` compares identity, while \`==\` compares equality:

\`\`\`python
a is b      # True: same list object
a == b      # True: same contents
\`\`\`

Use \`is None\` for the singleton \`None\`; use \`==\` for value comparison.

Mutation changes an existing object. Rebinding points a name somewhere else:

\`\`\`python
items.append(4)    # mutate the list object
items = items + [4] # bind items to a new list
\`\`\``,
        },
        {
          kind: "prose",
          markdown: `## Shallow and deep copying

A slice copies a list's outer container:

\`\`\`python
copy = nums[:]
\`\`\`

For nested lists, that is only a **shallow** copy. The rows are still shared:

\`\`\`python
grid = [[1], [2]]
outer = grid[:]
outer[0].append(99)
print(grid)  # [[1, 99], [2]]
\`\`\`

To copy a nested structure by hand, copy each row:

\`\`\`python
new_grid = [row[:] for row in grid]
\`\`\`

Avoid the classic shared-row trap:

\`\`\`python
bad = [[]] * 3      # three references to one list
good = [[] for _ in range(3)]
\`\`\`

The second form creates a fresh row each time.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "copy-and-increment-grid",
            title: "Copy and increment a grid",
            prompt: `Return a new jagged grid where every integer in \`grid\` is increased by 1.

Preserve the row structure and do not rely on shared rows.

\`\`\`text
copy_and_increment_grid([[1, 2], [], [-3]]) -> [[2, 3], [], [-2]]
\`\`\`

Use a nested comprehension or explicit nested loops that create fresh row lists.`,
            signature: {
              name: "copyAndIncrementGrid",
              params: [{ name: "grid", type: "int[][]" }],
              returns: "int[][]",
            },
            tests: [
              {
                input: [[[1, 2], [], [-3]]],
                expected: [[2, 3], [], [-2]],
              },
              { input: [[]], expected: [] },
              { input: [[[0]]], expected: [[1]] },
              {
                input: [[[5, -5], [10], [1, 1, 1]]],
                expected: [[6, -4], [11], [2, 2, 2]],
                hidden: true,
              },
            ],
            starterCode: `def copy_and_increment_grid(grid):
    # Return a fresh grid with every value increased by 1.
    pass
`,
            solution: `def copy_and_increment_grid(grid):
    return [[value + 1 for value in row] for row in grid]
`,
            hints: [
              "Think in two levels: one loop over rows and one loop over values.",
              "`[value + 1 for value in row]` creates a fresh row.",
              "Wrap that row expression in an outer comprehension over `grid`.",
            ],
          },
        },
      ],
    },
    {
      slug: "numeric-model-and-division",
      title: "Numbers, division, and rounding",
      summary:
        "Use Python's integer model, division operators, and rounding rules deliberately.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Integers grow as needed

Python's \`int\` is arbitrary precision. You do not choose \`int\` versus \`long\`; the value grows until memory runs out.

\`\`\`python
10 ** 100  # a perfectly ordinary int
\`\`\`

That removes overflow bugs common in fixed-width languages, but it does not make arithmetic free. Very large integers cost more memory and CPU than small ones.

Python has two division operators:

\`\`\`python
7 / 2   # 3.5  float division
7 // 2  # 3    floor division
-7 // 2 # -4   floor, not truncate toward zero
7 % 2   # 1
\`\`\`

The identity \`a == (a // b) * b + (a % b)\` holds for positive and negative integers when \`b\` is non-zero.`,
        },
        {
          kind: "prose",
          markdown: `## Float and Decimal

\`float\` is a binary floating-point number. It is fast and suitable for measurement, simulation, and many algorithmic tasks, but not exact for most decimal fractions:

\`\`\`python
0.1 + 0.2  # 0.30000000000000004
\`\`\`

Use \`decimal.Decimal\` when base-10 precision is part of the domain, such as money. Use integer cents when that model is simpler.

Rounding also has a rule worth knowing:

\`\`\`python
round(2.5)  # 2
round(3.5)  # 4
\`\`\`

Python uses banker's rounding: ties go to the nearest even value. If a product requirement says "round halves up", implement that rule explicitly rather than assuming \`round\` means it.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "floor-average",
            title: "Floor average",
            prompt: `Return the mathematical floor of the average of the non-empty list \`nums\`.

\`\`\`text
floor_average([2, 4, 7]) -> 4
floor_average([-5, -4])  -> -5
\`\`\`

Use \`//\` so negative averages floor correctly. Python integers do not overflow on large sums.`,
            signature: {
              name: "floorAverage",
              params: [{ name: "nums", type: "int[]" }],
              returns: "int",
            },
            tests: [
              { input: [[2, 4, 7]], expected: 4 },
              { input: [[5]], expected: 5 },
              { input: [[-5, -4]], expected: -5 },
              {
                input: [[2147483647, 2147483647]],
                expected: 2147483647,
                hidden: true,
              },
              { input: [[-1, 0, 1]], expected: 0, hidden: true },
            ],
            starterCode: `def floor_average(nums):
    # Return floor(sum(nums) / len(nums)).
    pass
`,
            solution: `def floor_average(nums):
    return sum(nums) // len(nums)
`,
            hints: [
              "`sum(nums)` gives the total.",
              "`len(nums)` gives the count.",
              "Use `//`, not `/`, because the result must be an integer floor.",
            ],
          },
        },
      ],
    },
    {
      slug: "truthiness-and-comparisons",
      title: "Truthiness, comparisons, and matching",
      summary:
        "Use Boolean contexts, chained comparisons, and branch ordering without ambiguity.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Truthiness is a protocol

Python asks an object for truth by calling \`__bool__\` if it exists, otherwise \`__len__\` if it exists. Empty containers are falsy because their length is zero.

\`\`\`python
if not items:
    return []
\`\`\`

That is idiomatic for "empty or missing" containers, but be precise when \`0\`, \`""\`, and \`None\` mean different things:

\`\`\`python
if value is None:
    ...
\`\`\`

\`and\` and \`or\` return one of their operands, not a forced Boolean:

\`\`\`python
name = supplied_name or "anonymous"
\`\`\`

That fallback treats \`""\` as missing. Use an explicit \`is None\` check if an empty string is a legitimate value.`,
        },
        {
          kind: "prose",
          markdown: `## Comparisons and pattern matching

Comparisons chain naturally:

\`\`\`python
if 0 <= score <= 100:
    ...
\`\`\`

Membership reads like English:

\`\`\`python
if status in {"draft", "paid"}:
    ...
\`\`\`

Python 3.10 added structural pattern matching with \`match\`:

\`\`\`python
match command:
    case ["move", x, y]:
        ...
    case ["quit"]:
        ...
    case _:
        ...
\`\`\`

Use \`match\` for shape-based branching. Use \`if\` / \`elif\` for ordinary ranges and predicates.`,
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
classify_score(-1) -> "invalid"
classify_score(72) -> "pass"
classify_score(90) -> "distinction"
\`\`\`

Order the checks so the boundary values are clear.`,
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
            starterCode: `def classify_score(score):
    # Return invalid, fail, pass, or distinction.
    pass
`,
            solution: `def classify_score(score):
    if not 0 <= score <= 100:
        return "invalid"
    if score < 50:
        return "fail"
    if score < 85:
        return "pass"
    return "distinction"
`,
            hints: [
              "`not 0 <= score <= 100` is a compact invalid check.",
              "After invalid scores are gone, checking upper boundaries is enough.",
              "Test 49/50 and 84/85 mentally before submitting.",
            ],
          },
        },
      ],
    },
    {
      slug: "exceptions-and-eafp",
      title: "Exceptions and EAFP",
      summary:
        "Prefer clear failure boundaries and use try/except where failure is expected.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Exceptions are normal control flow at boundaries

Python style is often described as EAFP: "easier to ask forgiveness than permission". Try the operation, then handle the exception you expect:

\`\`\`python
try:
    number = int(text)
except ValueError:
    number = 0
\`\`\`

This is appropriate when failure is ordinary and the operation itself is the clearest validation.

Catch specific exception types. A broad \`except Exception\` can hide programming errors. Avoid bare \`except:\` outside very narrow system-level cleanup.

Use \`raise\` to signal a violated contract:

\`\`\`python
if amount < 0:
    raise ValueError("amount must be non-negative")
\`\`\``,
        },
        {
          kind: "prose",
          markdown: `## try, except, else, finally

\`else\` runs only when the \`try\` block did not raise. \`finally\` runs whether it succeeded or failed:

\`\`\`python
try:
    value = parse(text)
except ValueError:
    return None
else:
    return value
finally:
    cleanup()
\`\`\`

Resource cleanup is usually better expressed with a context manager and \`with\`, covered later. Reserve \`finally\` for cases where a context manager would obscure the control flow.

When re-raising the same exception, write bare \`raise\` inside the \`except\` block so the original traceback is preserved.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "sum-valid-integers",
            title: "Sum only valid integers",
            prompt: `Each element of \`values\` is user-entered text. Parse the valid integers and return their sum. Ignore invalid entries.

\`\`\`text
sum_valid_integers(["10", "oops", "-3"]) -> 7
sum_valid_integers(["", "4.5", "8"])     -> 8
\`\`\`

Use \`try\` / \`except ValueError\` around \`int(value)\`.`,
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
                expected: 2147483649,
                hidden: true,
              },
            ],
            starterCode: `def sum_valid_integers(values):
    # Add values that int(...) can parse.
    pass
`,
            solution: `def sum_valid_integers(values):
    total = 0
    for value in values:
        try:
            total += int(value)
        except ValueError:
            pass
    return total
`,
            hints: [
              "`int(value)` strips surrounding whitespace and raises `ValueError` on invalid text.",
              "Add inside the `try` block.",
              "Ignore only `ValueError`; do not catch every exception.",
            ],
          },
        },
      ],
    },
    {
      slug: "type-hints-and-api-contracts",
      title: "Type hints and API contracts",
      summary:
        "Use annotations for documentation, editor help, and static checking without confusing them with runtime enforcement.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Type hints are metadata

Python annotations describe intent:

\`\`\`python
def total(values: list[int]) -> int:
    return sum(values)
\`\`\`

They do not enforce types at runtime. This still runs unless your code checks it or an operation fails:

\`\`\`python
total(["1", "2"])
\`\`\`

Type hints support editors, documentation, and static checkers such as mypy or pyright. Treat them as part of the public contract, but keep runtime validation at trust boundaries: user input, files, network responses, and public APIs.

Useful building blocks:

\`\`\`python
str | None          # optional value, Python 3.10+
list[int]
dict[str, int]
tuple[int, int]
Callable[[int], int]
\`\`\``,
        },
        {
          kind: "prose",
          markdown: `## Contracts need names and validation

A good Python API names what it accepts and what it returns. Prefer a small number of clear parameters over a loose \`dict\` of unvalidated options.

Validate external text before treating it as an identifier, file path, command, enum value, or number. Built-ins often capture language rules exactly:

\`\`\`python
"valid_name".isidentifier()  # True
"not-valid".isidentifier()  # False
\`\`\`

The \`keyword\` module knows Python's reserved words:

\`\`\`python
import keyword
keyword.iskeyword("class")  # True
\`\`\`

Those helpers are better than a hand-written character check when the rule is specifically "valid Python identifier".`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "valid-identifiers",
            title: "Filter valid identifiers",
            prompt: `Return the names from \`names\` that are valid Python identifiers and are not Python keywords.

Preserve the original order.

\`\`\`text
valid_identifiers(["name", "class", "two_words", "2bad"]) -> ["name", "two_words"]
\`\`\`

Use \`str.isidentifier()\` and \`keyword.iskeyword\`.`,
            signature: {
              name: "validIdentifiers",
              params: [{ name: "names", type: "string[]" }],
              returns: "string[]",
            },
            tests: [
              {
                input: [["name", "class", "two_words", "2bad"]],
                expected: ["name", "two_words"],
              },
              { input: [[]], expected: [] },
              {
                input: [["_hidden", "with space", "for", "snake_case"]],
                expected: ["_hidden", "snake_case"],
              },
              {
                input: [["True", "none", "None", "valid123"]],
                expected: ["none", "valid123"],
                hidden: true,
              },
            ],
            starterCode: `def valid_identifiers(names):
    # Keep valid Python identifiers that are not reserved keywords.
    pass
`,
            solution: `import keyword


def valid_identifiers(names):
    return [
        name
        for name in names
        if name.isidentifier() and not keyword.iskeyword(name)
    ]
`,
            hints: [
              "`name.isidentifier()` checks Python's identifier syntax.",
              "`keyword.iskeyword(name)` rejects reserved words like `class` and `None`.",
              "A list comprehension preserves the input order.",
            ],
          },
        },
      ],
    },
  ],
};
