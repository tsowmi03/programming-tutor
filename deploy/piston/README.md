# Piston host

Run this deployment only on a dedicated x86-64 Linux VPS with Docker,
cgroup v2, and ports 80/443 open.

1. Copy `.env.example` to `.env`.
2. Set `PISTON_HOST` to a DNS name that resolves to the VPS.
3. Generate `PISTON_AUTH_TOKEN` with `openssl rand -hex 32`.
4. Keep `PISTON_OUTPUT_MAX_SIZE=1048576` so judge protocol output and bounded
   user debug output fit without disabling Piston's output protection.
5. Start the services with `docker compose up -d`.
6. Install the required runtimes through the loopback-only API:

```bash
# gcc provides both the "c" and "c++" runtimes; mono provides "csharp".
for package in \
  "python 3.10.0" \
  "node 18.15.0" \
  "typescript 5.0.3" \
  "java 15.0.2" \
  "mono 6.12.0" \
  "gcc 10.2.0"
do
  set -- $package
  curl --fail-with-body \
    --request POST http://127.0.0.1:2000/api/v2/packages \
    --header "Content-Type: application/json" \
    --data "{\"language\":\"$1\",\"version\":\"$2\"}"
done
```

Configure Vercel with:

```text
EXECUTOR=piston
PISTON_URL=https://<PISTON_HOST>/api/v2
PISTON_AUTH_TOKEN=<same token as the VPS>
```
