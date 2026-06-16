import type { CourseModule } from "../types";

export const pythonPracticalPython: CourseModule = {
  slug: "practical-python",
  title: "Practical Python Development",
  description:
    "Connect Python code to real projects: versions, environments, modules, data files, async work, and tests.",
  lessons: [
    {
      slug: "versions-environments-and-packaging",
      title: "Versions, environments, and packaging",
      summary:
        "Know which Python you are running and keep project dependencies isolated.",
      blocks: [
        {
          kind: "prose",
          markdown: `## The interpreter version matters

Python language features are tied to interpreter versions. For example:

- Python 3.10 added structural pattern matching.
- Python 3.11 improved exception groups and traceback quality.
- Python 3.12 added newer generic type-parameter syntax.
- Python 3.14 is the current stable documentation line as of June 2026.

Check a local project with:

\`\`\`text
python --version
python -m pip --version
\`\`\`

This site's Python judge runs Python 3.10, so reference solutions avoid syntax that requires newer interpreters. A production project can use newer Python when its deployment target supports it.`,
        },
        {
          kind: "prose",
          markdown: `## Use an isolated environment

A virtual environment gives one project its own installed packages:

\`\`\`text
python -m venv .venv
source .venv/bin/activate
python -m pip install requests
python -m pip freeze
\`\`\`

Modern projects may use tools such as \`pip-tools\`, Poetry, Hatch, or uv, but the principle is the same: the project should declare its dependencies and avoid relying on whatever happens to be installed globally.

### Activity: inspect a project

For a real Python project, answer:

1. Which Python version does it require?
2. How are dependencies declared?
3. How do you create a clean environment?
4. Which command runs tests?
5. Which command runs the application or main script?

Those answers are part of understanding the codebase, not setup trivia.`,
        },
      ],
    },
    {
      slug: "modules-imports-and-boundaries",
      title: "Modules, imports, and boundaries",
      summary:
        "Organise code into importable modules and keep side effects at explicit entry points.",
      blocks: [
        {
          kind: "prose",
          markdown: `## A file is a module

A Python file can be imported by name:

\`\`\`python
from tools.parsing import parse_record
\`\`\`

Importing a module executes its top-level code once, then caches the module object. That is why modules should mostly define functions, classes, constants, and configuration. Put startup side effects behind an entry point:

\`\`\`python
def main():
    ...

if __name__ == "__main__":
    main()
\`\`\`

This lets the file be imported in tests without running the script.`,
        },
        {
          kind: "prose",
          markdown: `## Keep boundaries small

Business rules are easier to test when they are ordinary functions that accept data and return data. File systems, network calls, clocks, command-line arguments, environment variables, and databases belong at the boundary.

A practical shape:

1. Read input at the edge.
2. Parse and validate it.
3. Pass clean data into pure functions.
4. Write output at the edge.

The exercise below models configuration merging without reading real environment variables. That keeps the core rule testable.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "merge-config",
            title: "Merge key-value configuration",
            prompt: `Each entry in \`defaults\` and \`overrides\` has the form \`"key=value"\`.

Return the final configuration as \`"key=value"\` strings sorted by key. Values from \`overrides\` replace values from \`defaults\`.

\`\`\`text
merge_config(["host=local", "port=8000"], ["port=9000"])
-> ["host=local", "port=9000"]
\`\`\`

Ignore malformed entries that do not contain \`=\`.`,
            signature: {
              name: "mergeConfig",
              params: [
                { name: "defaults", type: "string[]" },
                { name: "overrides", type: "string[]" },
              ],
              returns: "string[]",
            },
            tests: [
              {
                input: [["host=local", "port=8000"], ["port=9000"]],
                expected: ["host=local", "port=9000"],
              },
              { input: [[], []], expected: [] },
              {
                input: [["a=1", "bad", "b=2"], ["a=3", "c=4"]],
                expected: ["a=3", "b=2", "c=4"],
              },
              {
                input: [["z=last", "a=first"], ["broken", "a=override"]],
                expected: ["a=override", "z=last"],
                hidden: true,
              },
            ],
            starterCode: `def merge_config(defaults, overrides):
    # Parse key=value entries, apply overrides, and return sorted key=value strings.
    pass
`,
            solution: `def merge_config(defaults, overrides):
    config = {}
    for entry in defaults + overrides:
        if "=" not in entry:
            continue
        key, value = entry.split("=", 1)
        config[key] = value
    return [f"{key}={config[key]}" for key in sorted(config)]
`,
            hints: [
              "`defaults + overrides` processes defaults first and replacements later.",
              "`entry.split('=', 1)` preserves `=` characters inside the value.",
              "Iterate `for key in sorted(config)` to return deterministic output.",
            ],
          },
        },
      ],
    },
    {
      slug: "files-json-and-context-managers",
      title: "Files, JSON, and context managers",
      summary:
        "Read external data safely and release resources with with-statements.",
      blocks: [
        {
          kind: "prose",
          markdown: `## with manages resources

Files, sockets, locks, and many other objects need cleanup. A context manager defines \`__enter__\` and \`__exit__\`, and the \`with\` statement guarantees exit logic runs:

\`\`\`python
with open("data.txt", encoding="utf-8") as f:
    text = f.read()
\`\`\`

That closes the file even if an exception occurs inside the block.

You can create context managers with classes or with \`contextlib.contextmanager\`, but most everyday code consumes context managers supplied by the standard library and third-party packages.`,
        },
        {
          kind: "prose",
          markdown: `## JSON is untrusted external data

\`json.loads\` parses a JSON string into Python data:

\`\`\`python
import json

record = json.loads(text)
\`\`\`

Syntactically valid JSON can still be semantically invalid for your program. Validate types and required fields after parsing. Treat missing keys, unexpected types, and invalid values as ordinary boundary concerns.

The exercise parses JSON strings already supplied as inputs. In a real application, the outer layer would read each line from a file with \`with open(...)\`, then pass the text into a pure parser function.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "json-score-totals",
            title: "Parse JSON score records",
            prompt: `Each string in \`records\` should be a JSON object with a \`"scores"\` field containing a list of integers.

Return one total per record. Return 0 for malformed JSON, missing \`"scores"\`, non-list scores, or non-integer items.

\`\`\`text
json_score_totals(['{"scores":[1,2,3]}', '{"scores":[10,-4]}']) -> [6, 6]
\`\`\`

Use \`json.loads\`, then validate the parsed shape before summing.`,
            signature: {
              name: "jsonScoreTotals",
              params: [{ name: "records", type: "string[]" }],
              returns: "int[]",
            },
            tests: [
              {
                input: [['{"scores":[1,2,3]}', '{"scores":[10,-4]}']],
                expected: [6, 6],
              },
              {
                input: [['{"scores":[]}', 'not json', '{"scores":[1,"x"]}']],
                expected: [0, 0, 0],
              },
              { input: [[]], expected: [] },
              {
                input: [['{"name":"Ada"}', '{"scores":[5,5,5]}']],
                expected: [0, 15],
                hidden: true,
              },
            ],
            starterCode: `def json_score_totals(records):
    # Parse each JSON record and return a validated score total.
    pass
`,
            solution: `import json


def json_score_totals(records):
    totals = []
    for text in records:
        try:
            record = json.loads(text)
        except ValueError:
            totals.append(0)
            continue

        scores = record.get("scores") if isinstance(record, dict) else None
        if (
            not isinstance(scores, list)
            or not all(isinstance(score, int) for score in scores)
        ):
            totals.append(0)
        else:
            totals.append(sum(scores))
    return totals
`,
            hints: [
              "`json.loads` raises `ValueError` for malformed JSON.",
              "Check `isinstance(record, dict)` before using `.get`.",
              "`all(isinstance(score, int) for score in scores)` validates the list contents.",
            ],
          },
        },
      ],
    },
    {
      slug: "asyncio-and-concurrent-work",
      title: "asyncio and concurrent work",
      summary:
        "Represent waiting work with coroutines and gather independent operations.",
      blocks: [
        {
          kind: "prose",
          markdown: `## async def creates a coroutine function

An \`async def\` function returns a coroutine object when called. It runs when awaited by an event loop:

\`\`\`python
async def fetch_user(client, user_id):
    response = await client.get(f"/users/{user_id}")
    return response.json()
\`\`\`

\`await\` pauses the coroutine while another awaitable finishes. This is useful for I/O-bound work: HTTP calls, database calls, subprocesses, and timers. It does not make CPU-heavy Python code run in parallel by itself.

\`asyncio.run(main())\` starts an event loop for a top-level async entry point. Do not call it from inside an event loop that is already running.`,
        },
        {
          kind: "prose",
          markdown: `## gather preserves result order

\`asyncio.gather\` runs independent awaitables concurrently and returns results in the same order as the awaitables passed in:

\`\`\`python
results = await asyncio.gather(
    load_user(1),
    load_user(2),
    load_user(3),
)
\`\`\`

If one task fails, failure handling depends on how \`gather\` is configured. For production code, decide how cancellation and partial failure should behave rather than treating it as an afterthought.

The exercise uses tiny async helpers only to practise coordination. In real code, async is most useful when each task waits on external I/O.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "async-batch-sums",
            title: "Coordinate independent async tasks",
            prompt: `Return the sum of each row in \`batches\`, preserving the original row order.

Create one coroutine per row, gather them, then return the ordered results.

\`\`\`text
batch_sums([[1, 2, 3], [10, -4], []]) -> [6, 6, 0]
\`\`\`

Use \`asyncio.run\` in the public function because the judge calls a normal synchronous function.`,
            signature: {
              name: "batchSums",
              params: [{ name: "batches", type: "int[][]" }],
              returns: "int[]",
            },
            tests: [
              { input: [[[1, 2, 3], [10, -4], []]], expected: [6, 6, 0] },
              { input: [[[5]]], expected: [5] },
              { input: [[]], expected: [] },
              {
                input: [[[-1, -2], [4, 5, 6], [0, 0]]],
                expected: [-3, 15, 0],
                hidden: true,
              },
            ],
            starterCode: `def batch_sums(batches):
    # Use asyncio to gather one row-sum coroutine per row.
    pass
`,
            solution: `import asyncio


async def _sum_row(row):
    await asyncio.sleep(0)
    return sum(row)


async def _batch_sums_async(batches):
    return await asyncio.gather(*(_sum_row(row) for row in batches))


def batch_sums(batches):
    return list(asyncio.run(_batch_sums_async(batches)))
`,
            hints: [
              "Define an `async` helper that returns `sum(row)`.",
              "`asyncio.gather(*(helper(row) for row in batches))` preserves input order.",
              "Wrap the async helper with `asyncio.run` in the public function.",
            ],
          },
        },
      ],
    },
    {
      slug: "testing-debugging-and-contracts",
      title: "Testing, debugging, and contracts",
      summary:
        "Write deterministic units, cover boundaries, and debug from observed behavior.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Tests describe behavior

Python's standard library includes \`unittest\`, and many projects use \`pytest\`. The structure is the same: arrange inputs, act, assert the observed result.

\`\`\`python
def test_clamp_caps_high_values():
    assert clamp(120, 0, 100) == 100
\`\`\`

Good tests cover:

- normal examples;
- boundary values;
- empty inputs;
- invalid inputs;
- repeated values;
- prior bug cases.

Test public behavior rather than private implementation. Refactors should not break tests when the behavior remains the same.`,
        },
        {
          kind: "prose",
          markdown: `## Debug from the failing input

A useful debugging loop:

1. Reproduce the smallest failing input.
2. Read the exception type, message, and relevant traceback frame.
3. Inspect values at the point behavior diverges.
4. Add or tighten a test for that case.
5. Change the implementation.

\`print\` is fine for quick local inspection. For long-running applications, use \`logging\` so messages have levels, destinations, and structured context.

Assertions are useful for internal invariants. Do not use \`assert\` for user-facing validation because Python can run with assertions disabled.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "clamp-all",
            title: "Implement a boundary-driven contract",
            prompt: `Return a new list where every value is clamped to the inclusive range \`[low, high]\`.

- Values below \`low\` become \`low\`.
- Values above \`high\` become \`high\`.
- Values inside the range are unchanged.

\`\`\`text
clamp_all([-5, 5, 15], 0, 10) -> [0, 5, 10]
\`\`\`

Assume \`low <= high\`.`,
            signature: {
              name: "clampAll",
              params: [
                { name: "values", type: "int[]" },
                { name: "low", type: "int" },
                { name: "high", type: "int" },
              ],
              returns: "int[]",
            },
            tests: [
              { input: [[-5, 5, 15], 0, 10], expected: [0, 5, 10] },
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
            starterCode: `def clamp_all(values, low, high):
    # Return a clamped copy of values.
    pass
`,
            solution: `def clamp_all(values, low, high):
    return [min(high, max(low, value)) for value in values]
`,
            hints: [
              "`max(low, value)` raises low values up to the lower bound.",
              "`min(high, ...)` caps high values at the upper bound.",
              "A comprehension returns a new list without mutating the input.",
            ],
          },
        },
      ],
    },
  ],
};
