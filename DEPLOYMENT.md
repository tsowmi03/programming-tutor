# Deploying CodeClimb

The app runs perfectly **locally** with zero configuration (SQLite + local
code execution). Hosting it publicly needs three things, two of which
require accounts only you can create. Everything code-side is already in
place.

## What you need

| Piece | Why | Who can do it |
| --- | --- | --- |
| Vercel project | hosts the Next.js app | **you** (Vercel account, free Hobby tier) |
| Turso database | SQLite doesn't persist on serverless; Turso is libSQL (SQLite-compatible) with a generous free tier | **you** (Turso account) |
| Piston instance | sandboxed code execution — local executor is single-user only and doesn't exist on Vercel | **you** (any small VPS or your own machine + tunnel) |

> **Alternative without Vercel:** run the whole thing on one small VPS with
> `npm run build && npm start` plus a local Piston container. Then SQLite
> works as-is and you can skip Turso entirely. This is the simplest hosted
> setup; the steps below are for the serverless route.

## 1. Database — Turso

```bash
brew install tursodatabase/tap/turso
turso auth signup
turso db create codeclimb
turso db show codeclimb --url        # -> TURSO_DATABASE_URL
turso db tokens create codeclimb     # -> TURSO_AUTH_TOKEN
```

Then install the Prisma driver adapter and wire it in (one small code
change, kept out of the local path on purpose):

```bash
npm install @prisma/adapter-libsql
```

In `src/lib/prisma.ts`, construct the client with the adapter when the env
vars are present:

```ts
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

function makeClient() {
  if (process.env.TURSO_DATABASE_URL) {
    const adapter = new PrismaLibSQL({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    return new PrismaClient({ adapter });
  }
  return new PrismaClient(); // local SQLite via DATABASE_URL
}
```

Push the schema and seed (run locally, pointed at Turso):

```bash
turso db shell codeclimb < <(npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script)
TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... npm run db:seed
```

## 2. Code execution — self-hosted Piston

On any Docker host (a $5 VPS is plenty for one user):

```bash
docker run -d --name piston --privileged -p 2000:2000 \
  -v piston_packages:/piston/packages ghcr.io/engineer-man/piston
# install the four runtimes (matching versions in src/lib/judge/languages.ts)
for pkg in "python 3.10.0" "node 18.15.0" "java 15.0.2" "gcc 10.2.0"; do
  set -- $pkg
  curl -s -X POST http://localhost:2000/api/v2/packages \
    -H 'Content-Type: application/json' \
    -d "{\"language\":\"$1\",\"version\":\"$2\"}"
done
```

Put it behind HTTPS (Caddy/Traefik/cloudflared) and note the URL.

## 3. App — Vercel

```bash
npx vercel link    # or import tsowmi03/programming-tutor in the dashboard
```

Set the environment variables in the Vercel project:

| Variable | Value |
| --- | --- |
| `TURSO_DATABASE_URL` | from step 1 |
| `TURSO_AUTH_TOKEN` | from step 1 |
| `DATABASE_URL` | `file:./dev.db` (unused at runtime once Turso is wired, but Prisma's generator wants it set) |
| `EXECUTOR` | `piston` |
| `PISTON_URL` | `https://<your-piston-host>/api/v2/piston` |

Deploy. Done.

## Security notes for going public

- The local executor refuses nothing — it's gated to local use by the fact
  that `EXECUTOR=piston` is required config on hosts. Never expose the app
  publicly with `EXECUTOR=local`.
- There is **no auth** yet (single-user by design). If you want it public,
  add auth first (NextAuth or Clerk) or at minimum put the deployment behind
  Vercel's password protection / your own access layer; otherwise strangers
  can write to your database and burn your Piston CPU.
- Add a rate limit on `/api/run` and `/api/submissions` (e.g. Upstash
  Ratelimit) before sharing the URL.
