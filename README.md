# CodeClimb

A personal, LeetCode-style training ground for programming fundamentals.
Solve coding problems in **Python, JavaScript, Java, or C** — judged against
real test cases — and cement the concepts with written **explanation
problems** reviewed against model answers.

## Features

- **23 problems** across 10 topics: foundations, complexity analysis,
  arrays & hashing, two pointers, stack & queue, binary search, sliding
  window, linked lists, trees & graphs, recursion & DP
- **Two problem types**
  - *Code*: Monaco editor (the VS Code editor), starter code per language,
    Run against sample tests, Submit against the full set including hidden
    tests, per-case results with your debug prints captured
  - *Explanation*: write the concept in your own words, then compare with a
    model answer, tick off key points, and self-assess
- **Learning-first design**: progressive hints, solutions locked until you
  solve (with an honest escape hatch), editorials that teach the *pattern*,
  drafts auto-saved per language, confetti when you earn it
- **Progress tracking**: per-topic and per-difficulty breakdowns, submission
  history with one-click restore into the editor

## Quick start

```bash
npm install
npx prisma db push     # create the SQLite database
npm run db:seed        # load the problems
npm run dev            # http://localhost:3000
```

Requirements: Node 20+, plus whichever language toolchains you want to
practice in — `python3`, `node`, a JDK (`javac`/`java`), and a C compiler
(`cc`). Anything missing just disables that language with a friendly error.

## How judging works

```
your code ──► harness generator ──► executor ──► protocol parser ──► results
              (per language)        (local or     (@@JUDGE:RESULT     per test
                                     Piston)        markers)
```

1. Each coding problem declares a typed **function signature** and a list of
   test cases (data, not code).
2. A per-language **harness generator** wraps your code in a test driver —
   Python/JS embed the tests as base64 JSON; Java/C compile them into typed
   literals (e.g. `new int[]{2,7,11,15}`), since they have no stdlib JSON.
3. The composed program runs via the configured **executor**:
   - `local` (default): the machine's own toolchains in a temp dir with time
     and output limits. Suitable for single-user use — submissions are your
     own code, the same trust model as running a script yourself.
   - `piston`: a sandboxed [Piston](https://github.com/engineer-man/piston)
     instance (`PISTON_URL`). **Required for any hosted/multi-user
     deployment.** (The public emkc.org instance went whitelist-only in
     Feb 2026.)
4. Output is parsed from a marker protocol that separates judge results from
   your own prints, so debug output shows up attached to the right test.

All 56 reference-solution × language combinations are verified through the
real judge: `npx tsx scripts/verify-solutions.ts`.

## Project layout

```
prisma/            schema + seed script
src/content/       problems-as-code (statements, tests, solutions, editorials)
src/lib/judge/     harness generators, executors, output parser, orchestrator
src/lib/           Prisma client, problem service, Zod validation
src/app/api/       REST routes (problems, run, submissions, progress)
src/app/           pages (dashboard, browser, workspace, progress)
src/components/    UI, including the Monaco workspace
scripts/           judge smoke test + full solution verification
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | dev server |
| `npm run build` | production build |
| `npm test` | unit tests (harness generators, protocol parser) |
| `npm run db:seed` | (re)seed problems — idempotent, keeps submissions |
| `npx tsx scripts/verify-solutions.ts` | run every reference solution through the judge |
| `npx tsx scripts/smoke-judge.ts` | quick judge sanity check incl. error paths |

## Adding a problem

1. Create `src/content/problems/<slug>.ts` exporting a `CodeProblemDef` or
   `ExplanationProblemDef` (copy a neighbour as a template).
2. Register it in `src/content/index.ts`.
3. `npm run db:seed`, then `npx tsx scripts/verify-solutions.ts <slug>` to
   prove the reference solutions pass in all four languages.

Supported signature types: `int`, `bool`, `string`, `int[]`, `string[]`,
`int[][]` (C supports all but `int[][]` as a *return* type). Set
`ordered: false` on a signature to accept array answers in any order.

## Hosting

See [DEPLOYMENT.md](DEPLOYMENT.md). Short version: the app deploys to Vercel
with a Turso (libSQL) database, and needs a self-hosted Piston instance for
code execution — those two account setups are the only manual steps.

## Roadmap ideas

- Spaced-repetition queue fed by self-assessment scores
- Optional AI feedback on explanation answers (Claude API)
- More languages (C++, Go, Rust) — each is one harness generator away
- Auth + multi-user, if it ever outgrows personal use
