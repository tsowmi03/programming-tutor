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
| OAuth apps | Google, GitHub, and Apple login buttons need provider credentials | **you** (provider dashboards) |

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

The Prisma driver adapter is already wired into the app and seed script.
Install dependencies after cloning:

```bash
npm install
```

Push the schema and seed (run locally, pointed at Turso):

```bash
turso db shell codeclimb < <(npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script)
TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... npm run db:seed
```

## 2. Code execution — self-hosted Piston

On a small x86-64 Linux VPS:

```bash
cd deploy/piston
cp .env.example .env
# Set PISTON_HOST and generate PISTON_AUTH_TOKEN with:
# openssl rand -hex 32
# Keep PISTON_OUTPUT_MAX_SIZE=1048576 from .env.example.
docker compose up -d

# install the four runtimes (matching versions in src/lib/judge/languages.ts)
for pkg in "python 3.10.0" "node 18.15.0" "java 15.0.2" "gcc 10.2.0"; do
  set -- $pkg
  curl -s -X POST http://localhost:2000/api/v2/packages \
    -H 'Content-Type: application/json' \
    -d "{\"language\":\"$1\",\"version\":\"$2\"}"
done
```

The included Caddy service obtains HTTPS certificates automatically. It keeps
Piston's port bound to the VPS loopback interface and requires a bearer token
on the public endpoint.

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
| `PISTON_URL` | `https://<your-piston-host>/api/v2` |
| `PISTON_AUTH_TOKEN` | the token configured on the Piston host |
| `APP_URL` | your public app URL, e.g. `https://codeclimb.example` |

Optional provider variables:

| Provider | Variables | Callback URL |
| --- | --- | --- |
| Google | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | `<APP_URL>/api/auth/google/callback` |
| GitHub | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | `<APP_URL>/api/auth/github/callback` |
| Apple | `APPLE_CLIENT_ID`, `APPLE_TEAM_ID`, `APPLE_KEY_ID`, `APPLE_PRIVATE_KEY` | `<APP_URL>/api/auth/apple/callback` |

Deploy. Done.

## Security notes for going public

- The local executor refuses nothing — it's gated to local use by the fact
  that `EXECUTOR=piston` is required config on hosts. Never expose the app
  publicly with `EXECUTOR=local`.
- Password and OAuth auth are built in. Keep provider secrets out of the repo
  and rotate them if they are exposed.
- Auth forms are rate-limited in the database. Add a rate limit on `/api/run`
  and `/api/submissions` (e.g. Upstash Ratelimit) before sharing the URL.
