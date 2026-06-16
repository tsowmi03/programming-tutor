import { prisma } from "./prisma";

export type AuthRateLimitAction = "login" | "signup" | "oauth";

interface RateLimitPolicy {
  maxAttempts: number;
  windowMs: number;
  blockMs: number;
}

const POLICIES: Record<AuthRateLimitAction, RateLimitPolicy> = {
  login: { maxAttempts: 6, windowMs: 15 * 60 * 1000, blockMs: 15 * 60 * 1000 },
  signup: { maxAttempts: 8, windowMs: 60 * 60 * 1000, blockMs: 60 * 60 * 1000 },
  oauth: { maxAttempts: 20, windowMs: 10 * 60 * 1000, blockMs: 10 * 60 * 1000 },
};

export class AuthRateLimitError extends Error {
  constructor(
    public retryAt: Date,
    message = "Too many attempts. Try again later.",
  ) {
    super(message);
    this.name = "AuthRateLimitError";
  }
}

function currentWindowStart(now: Date, policy: RateLimitPolicy): Date {
  return new Date(now.getTime() - policy.windowMs);
}

export async function assertAuthAllowed(
  action: AuthRateLimitAction,
  keyHash: string,
  now = new Date(),
): Promise<void> {
  const bucket = await prisma.authRateLimit.findUnique({
    where: { action_keyHash: { action, keyHash } },
  });
  if (!bucket?.blockedUntil) return;
  if (bucket.blockedUntil > now) throw new AuthRateLimitError(bucket.blockedUntil);

  await prisma.authRateLimit.update({
    where: { action_keyHash: { action, keyHash } },
    data: { blockedUntil: null },
  });
}

export async function recordAuthFailure(
  action: AuthRateLimitAction,
  keyHash: string,
  now = new Date(),
): Promise<void> {
  const policy = POLICIES[action];
  const staleBefore = currentWindowStart(now, policy);
  const existing = await prisma.authRateLimit.findUnique({
    where: { action_keyHash: { action, keyHash } },
  });

  if (!existing || existing.windowStart < staleBefore) {
    await prisma.authRateLimit.upsert({
      where: { action_keyHash: { action, keyHash } },
      create: { action, keyHash, count: 1, windowStart: now },
      update: { count: 1, windowStart: now, blockedUntil: null },
    });
    return;
  }

  const count = existing.count + 1;
  await prisma.authRateLimit.update({
    where: { action_keyHash: { action, keyHash } },
    data: {
      count,
      blockedUntil:
        count >= policy.maxAttempts
          ? new Date(now.getTime() + policy.blockMs)
          : existing.blockedUntil,
    },
  });
}

export async function clearAuthFailures(
  action: AuthRateLimitAction,
  keyHash: string,
): Promise<void> {
  await prisma.authRateLimit
    .delete({ where: { action_keyHash: { action, keyHash } } })
    .catch(() => {});
}
