# CodeClimb

A LeetCode-style training ground for programming fundamentals. Solve coding
problems in the languages available for each problem — judged against real
test cases — and cement the concepts with written **explanation problems**
reviewed against model answers.

## Features

- **Multi-user accounts**: email + password signup with database-backed
  sessions (no external auth service). Submissions and progress are tracked
  per user; problems are shared.

- **244 problems** across 10 topics: foundations, complexity analysis,
  arrays & hashing, two pointers, stack & queue, binary search, sliding
  window, linked lists, trees & graphs, recursion & DP
- **Two problem types**
  - *Code*: Monaco editor (the VS Code editor), starter code per language,
    Run against sample tests, Submit against the full set including hidden
    tests, per-case results with your debug prints captured
  - *Explanation*: write the concept in your own words, then compare with a
    model answer, tick off key points, and self-assess
- **Learning-first design**: progressive guidance, solutions locked until you
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

All coding-problem reference solutions are verified through the real judge:
`npx tsx scripts/verify-solutions.ts`.

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
| `npx tsx scripts/claim-submissions.ts <email>` | one-off: assign submissions made before accounts existed to a user |
| `npx tsx scripts/verify-solutions.ts` | run every reference solution through the judge |
| `npx tsx scripts/smoke-judge.ts` | quick judge sanity check incl. error paths |
| `npm run problems:batch` | generate problems in bulk from `scripts/topics.json` |
| `npm run problems:generate -- --category … --difficulty … --topic …` | generate one problem |
| `npm run problems:index` | rebuild the generated-problems index |

## Adding a problem

### By hand

1. Create `src/content/problems/<slug>.ts` exporting a `CodeProblemDef` or
   `ExplanationProblemDef` (copy a neighbour as a template).
2. Register it in `src/content/index.ts`.
3. `npm run db:seed`, then `npx tsx scripts/verify-solutions.ts <slug>` to
   prove the reference solutions pass in the languages provided by the problem.

Supported signature types: `int`, `bool`, `string`, `int[]`, `string[]`,
`int[][]` (C supports all but `int[][]` as a *return* type). Set
`ordered: false` on a signature to accept array answers in any order.

### In bulk (AI-generated)

Problems can be authored by Claude and **machine-verified** before they're kept
— every generated code problem has its reference solutions run through the
real judge, and only problems that pass land in the seeded set. Generated
problems live in `src/content/generated/` (separate from the curated set) and
are wired into `ALL_PROBLEMS` automatically.

1. Set `ANTHROPIC_API_KEY` in your environment (see `.env.example`).
2. Edit `scripts/topics.json` — a list of `{ category, difficulty, topic }`
   entries (optionally `type: "explanation"`). This is the lever for scale:
   add as many topics as you want.
3. `npm run problems:batch` — generates each topic, verifies it, retries once
   with the failing test output if a solution doesn't pass, and rebuilds the
   index. By default it uses **Sonnet 4.6 for easy/medium and Opus 4.8 for
   hard** (Sonnet is ~5x cheaper and handles easy/medium well). Useful flags:
   `--category`, `--difficulty`, `--limit N`, `--concurrency N`, `--force`
   (regenerate existing), `--model <id>` (force one model for every problem).
   Re-running is idempotent — existing slugs are skipped.
4. `npm run db:seed` to load them into the database.

Problems that fail verification after the retry are written to
`src/content/generated/_review/` (not seeded) for you to inspect or discard.
One-offs: `npm run problems:generate -- --category arrays-hashing
--difficulty easy --topic "prefix sums"`.

## Runtime AI guidance

The Guidance tab can request contextual AI help for the current code attempt.
Set `ANTHROPIC_API_KEY` for the Next.js app, then ask from a problem page. The
request sends the problem text, visible tests, current editor contents, and the
latest run/submission result. Hidden test details stay redacted. To change the
runtime model, set `AI_GUIDANCE_MODEL` (default: `claude-haiku-4-5`).
Explanation questions can also be AI-marked on submit; set
`AI_EXPLANATION_MARKING_MODEL` to override its default model. Signed-in users
are limited by default to 30 AI assistance requests per 24 hours and 6 requests
per 10 minutes. Runtime guidance and explanation marking share this quota.
Override with `AI_GUIDANCE_DAILY_LIMIT` and `AI_GUIDANCE_BURST_LIMIT`.

## Hosting

See [DEPLOYMENT.md](DEPLOYMENT.md). Short version: the app deploys to Vercel
with a Turso (libSQL) database, and needs a self-hosted Piston instance for
code execution — those two account setups are the only manual steps.

## Accounts

Sign up at `/signup`; everything else requires a session. Auth is
self-contained: scrypt password hashes (Node's crypto), stricter signup
validation, database-backed auth throttling, and random session tokens stored
hashed in the database, delivered as an httpOnly cookie.

Google, GitHub, and Apple sign-in are available through the same session layer.
Set the relevant OAuth environment variables from `.env.example`; providers
that are not configured fail closed with a login-page error. Use `APP_URL` in
hosted environments so provider callback URLs are stable:

- Google: `/api/auth/google/callback`
- GitHub: `/api/auth/github/callback`
- Apple: `/api/auth/apple/callback`

If you have submissions from before accounts existed (they have no owner),
sign up first, then claim them:

```bash
npx tsx scripts/claim-submissions.ts you@example.com
```

## Roadmap ideas

- Spaced-repetition queue fed by self-assessment scores
- Optional AI feedback on explanation answers (Claude API)
- More languages (C++, Go, Rust) — each is one harness generator away
