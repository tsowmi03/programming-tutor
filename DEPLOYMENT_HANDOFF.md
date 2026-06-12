# Deployment handoff

Last updated: 11 June 2026

## Status: LIVE

CodeClimb is deployed and fully working.

- **Production URL:** https://programming-tutor-nu.vercel.app
- All four languages judge correctly (Python, JavaScript, Java, C), submissions
  persist to Turso, and every page returns 200.

## Architecture

Vercel cannot reach IPv6-only origins, so the original IPv6 `sslip.io` endpoint
was abandoned. Public ingress now runs through a Cloudflare Tunnel on the
`codeclimb.dev` domain:

```
Vercel  →  https://piston.codeclimb.dev   (Cloudflare dual-stack TLS)
        →  cloudflared                     (systemd service, OUTBOUND-only from VM)
        →  Caddy on 127.0.0.1:80           (bearer-token auth boundary)
        →  Piston :2000                     (loopback only)
```

The VM has **no inbound web ports**: Caddy binds to loopback, cloudflared only
makes outbound connections, and the public web firewall rule was deleted. Only
IAP SSH (TCP 22 from `35.235.240.0/20`) reaches the VM.

## Repository state

- Branch: `deploy/vercel-turso` (pushed to `origin`)
- Latest commits:
  - `4ad49c2 fix: emit Main class before Solution in Java harness`
  - `d560df5 Secure the hosted Piston executor`
  - `cb7c016 Add Turso database support for deployment`

### The Java harness fix (`4ad49c2`)

Piston runs Java via single-file source launch (`java Main.java`), where JEP 330
makes the entry point the *first* top-level class, which must declare `main()`.
The harness emitted the user's `class Solution` first and `public class Main`
second, so Piston tried to launch `Solution` and failed with
`can't find main(String[]) method in class: Solution`. The local executor used
`javac` + `java Main`, so this never appeared in local reference runs.
`src/lib/judge/harness/java.ts` now emits `Main` before the user's code.

## Vercel

- Project: `tenacity-tutoring/programming-tutor`
  (id `prj_4jeEdFJBQXtjc1vNUcBRsyv0hN0W`)
- Logged in via Vercel CLI as `admin-9111`.
- GitHub repo connected: `tsowmi03/programming-tutor`.
- Production environment variables (set via `vercel env`):

```text
TURSO_DATABASE_URL=<codeclimb-turso-url>      # from Keychain
TURSO_AUTH_TOKEN=<codeclimb-turso-token>      # from Keychain
DATABASE_URL=file:./dev.db                    # build-time only (Prisma generator)
EXECUTOR=piston
PISTON_URL=https://piston.codeclimb.dev/api/v2
PISTON_AUTH_TOKEN=<codeclimb-piston-auth-token>  # from Keychain
```

Note: the runtime reads `TURSO_DATABASE_URL` (not `DATABASE_URL`) for Turso;
`DATABASE_URL` only satisfies Prisma's generator at build time.

Redeploy: `npx vercel --prod` from the repo root. The production alias updates a
few seconds after the deploy reports Ready.

## Turso

- Account `tsowmi03`, database `codeclimb`, region `aws-ap-south-1`.
- URL: `libsql://codeclimb-tsowmi03.aws-ap-south-1.turso.io`
- Seeded with 23 problems and 0 submissions (verification test data was cleared).
- Adapter: `@prisma/adapter-libsql` via `src/lib/prisma-client.ts`.
- Credentials in macOS Keychain:

```bash
security find-generic-password -a tsowmi03 -s codeclimb-turso-url -w
security find-generic-password -a tsowmi03 -s codeclimb-turso-token -w
```

- Quick DB checks with the `turso` CLI:

```bash
turso db shell codeclimb "SELECT COUNT(*) FROM Problem;"     # 23
turso db shell codeclimb "SELECT COUNT(*) FROM Submission;"  # 0
```

## Cloudflare Tunnel

- Domain `codeclimb.dev` registered through Cloudflare Registrar; zone managed in
  Cloudflare.
- Tunnel name: `codeclimb-piston`
- Tunnel ID: `ac0d8754-1e81-4bc1-bba6-9f4583495ee4`
- Public hostname: `piston.codeclimb.dev` (CNAME → tunnel, created by cloudflared)
- On the VM:
  - `cloudflared` installed from the Cloudflare apt repo (`pkg.cloudflare.com` —
    reachable over IPv6, unlike GitHub release assets).
  - Origin cert: `~/.cloudflared/cert.pem`
  - Config: `/etc/cloudflared/config.yml` (ingress
    `piston.codeclimb.dev → http://localhost:80`)
  - Credentials: `/etc/cloudflared/ac0d8754-…json`
  - Runs as the `cloudflared` systemd service (enabled + active).

Manage the tunnel service:

```bash
gcloud compute ssh codeclimb-piston \
  --project=codeclimb-499101 --zone=us-central1-a --tunnel-through-iap \
  --ssh-key-file="$HOME/.ssh/programming-tutor-piston" \
  --command='sudo systemctl status cloudflared --no-pager; cloudflared tunnel info codeclimb-piston'
```

## Piston VM (Google Cloud)

- Project `CodeClimb` (`codeclimb-499101`, number `863123461432`),
  account `tsowmi03@gmail.com`, 90-day trial active.
- VM `codeclimb-piston`, zone `us-central1-a`, `e2-micro`, Debian 12, 30 GB disk,
  4 GB swap. **IPv6-only** — the temporary external IPv4 was removed.
- VPC `codeclimb-vpc`, subnet `codeclimb-us-central1` (`10.10.0.0/24`),
  internal IP `10.10.0.2`, external IPv6 `2600:1900:4000:70b::/96`.
- Firewall: only `codeclimb-allow-iap-ssh` (TCP 22 from `35.235.240.0/20`).
  `codeclimb-allow-piston-web-ipv6` was **deleted** — no public web ports.

> Because the VM is IPv6-only, IPv4-only hosts (e.g. GitHub release assets,
> `ghcr.io`) are unreachable. Future Piston images or runtime downloads from
> IPv4-only hosts need a temporary external IPv4 or an IPv6-capable mirror.
> Cloudflare-hosted endpoints (apt repo, ghcr via proxy) work over IPv6.

SSH (IAP):

```bash
gcloud compute ssh codeclimb-piston \
  --project=codeclimb-499101 --zone=us-central1-a --tunnel-through-iap \
  --ssh-key-file="$HOME/.ssh/programming-tutor-piston"
```

### Piston / Caddy on the VM

- Deployment dir: `~/piston` (docker-compose: `piston_api`, `piston_caddy`).
- Piston binds `127.0.0.1:2000`. Runtimes: Python 3.10.0, Node 18.15.0,
  Java 15.0.2, GCC 10.2.0.
- `PISTON_OUTPUT_MAX_SIZE=1048576` raises the stock 1 KiB stdio cap while
  retaining bounded-output protection for judge runs.
- Caddy reconfigured for the tunnel: `auto_https off`, plain HTTP on `:80`,
  published as `127.0.0.1:80:80` only (port 443 dropped). It still enforces the
  `Authorization: Bearer <token>` boundary and proxies to `piston:2000`.
  Previous configs saved as `~/piston/Caddyfile.bak.*` and
  `~/piston/docker-compose.yml.bak.*`.
- Token in `~/piston/.env` (mode 600) and in Keychain:

```bash
security find-generic-password -a tsowmi03 -s codeclimb-piston-host -w   # piston.codeclimb.dev
security find-generic-password -a tsowmi03 -s codeclimb-piston-auth-token -w
```

Health checks:

```bash
# From anywhere (Cloudflare is dual-stack): 401 without token, 200 with.
TOKEN=$(security find-generic-password -a tsowmi03 -s codeclimb-piston-auth-token -w)
curl -s -o /dev/null -w '%{http_code}\n' https://piston.codeclimb.dev/api/v2/runtimes
curl -s -H "Authorization: Bearer $TOKEN" https://piston.codeclimb.dev/api/v2/runtimes

# On the VM: containers + local runtimes
gcloud compute ssh codeclimb-piston \
  --project=codeclimb-499101 --zone=us-central1-a --tunnel-through-iap \
  --ssh-key-file="$HOME/.ssh/programming-tutor-piston" \
  --command='cd ~/piston && sudo docker-compose ps && curl -fsS http://127.0.0.1:2000/api/v2/runtimes'
```

## Outstanding / before sharing publicly

- **No application auth.** The app is single-user by design (`DEPLOYMENT.md`).
  Anyone with the URL can write to Turso and consume Piston CPU. Add auth
  (NextAuth/Clerk) or Vercel password protection before sharing the URL.
- **No rate limiting** on `/api/run` and `/api/submissions`. Add one (e.g.
  Upstash Ratelimit) before public exposure.
- The `e2-micro` is resource-constrained; Java is the heaviest runtime
  (~2.3 s JVM startup). Fine for single-user practice, not for concurrent load.

## Security notes

- Do not expose Piston port 2000 publicly; keep Caddy as the auth boundary.
- Keep `PISTON_AUTH_TOKEN` out of git, logs, and screenshots. Rotate if exposed.
- Keep SSH on IAP only; do not open public SSH.
- Tunnel credentials (`/etc/cloudflared/*.json`, `~/.cloudflared/cert.pem`) live
  only on the VM — keep them there.
