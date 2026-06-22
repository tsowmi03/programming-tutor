import { randomUUID } from "node:crypto";
import type { PrismaClient } from "@prisma/client";
import { prisma } from "./prisma";

export type AiGuidanceLimitBucket = "daily" | "burst";

export interface AiGuidanceLimitPolicy {
  bucket: AiGuidanceLimitBucket;
  limit: number;
  windowMs: number;
}

export interface AiGuidanceUsageStatus {
  bucket: AiGuidanceLimitBucket;
  limit: number;
  remaining: number;
  resetAt: Date;
}

export interface AiGuidanceUsageReservation {
  statuses: AiGuidanceUsageStatus[];
}

type RawPrisma = Pick<PrismaClient, "$executeRaw" | "$queryRaw">;

type BucketRow = {
  count: number | bigint;
  resetAt: Date | string;
};

const DEFAULT_DAILY_LIMIT = 30;
const DEFAULT_BURST_LIMIT = 6;
const BURST_WINDOW_MS = 10 * 60 * 1000;
const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000;

function readLimit(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw == null || raw.trim() === "") return fallback;

  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return fallback;
  return parsed;
}

export function aiGuidanceLimitPolicies(): AiGuidanceLimitPolicy[] {
  return [
    {
      bucket: "daily",
      limit: readLimit("AI_GUIDANCE_DAILY_LIMIT", DEFAULT_DAILY_LIMIT),
      windowMs: DAILY_WINDOW_MS,
    },
    {
      bucket: "burst",
      limit: readLimit("AI_GUIDANCE_BURST_LIMIT", DEFAULT_BURST_LIMIT),
      windowMs: BURST_WINDOW_MS,
    },
  ];
}

export function secondsUntil(from: Date, until: Date): number {
  return Math.max(1, Math.ceil((until.getTime() - from.getTime()) / 1000));
}

export function formatRetryDelay(from: Date, until: Date): string {
  const seconds = secondsUntil(from, until);
  if (seconds < 60) return "under a minute";

  const minutes = Math.ceil(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"}`;

  const hours = Math.ceil(minutes / 60);
  return `${hours} hour${hours === 1 ? "" : "s"}`;
}

function limitMessage(bucket: AiGuidanceLimitBucket, now: Date, retryAt: Date) {
  const limitName =
    bucket === "daily" ? "daily AI guidance limit" : "short-term AI guidance limit";
  return `You've reached the ${limitName}. You can ask again in ${formatRetryDelay(
    now,
    retryAt,
  )}. The built-in hints and any guidance already shown are still available.`;
}

export class AiGuidanceLimitError extends Error {
  code = "AI_GUIDANCE_LIMIT_REACHED" as const;

  constructor(
    public bucket: AiGuidanceLimitBucket,
    public retryAt: Date,
    public retryAfterSeconds: number,
    message: string,
  ) {
    super(message);
    this.name = "AiGuidanceLimitError";
  }
}

async function reserveBucket(
  tx: RawPrisma,
  userId: string,
  policy: AiGuidanceLimitPolicy,
  now: Date,
): Promise<AiGuidanceUsageStatus> {
  const resetAt = new Date(now.getTime() + policy.windowMs);

  await tx.$executeRaw`
    INSERT INTO "AiGuidanceUsageBucket" ("id", "userId", "bucket", "count", "resetAt", "createdAt", "updatedAt")
    VALUES (${randomUUID()}, ${userId}, ${policy.bucket}, 0, ${resetAt}, ${now}, ${now})
    ON CONFLICT("userId", "bucket") DO NOTHING
  `;

  await tx.$executeRaw`
    UPDATE "AiGuidanceUsageBucket"
    SET "count" = 0, "resetAt" = ${resetAt}, "updatedAt" = ${now}
    WHERE "userId" = ${userId}
      AND "bucket" = ${policy.bucket}
      AND "resetAt" <= ${now}
  `;

  const changed = await tx.$executeRaw`
    UPDATE "AiGuidanceUsageBucket"
    SET "count" = "count" + 1, "updatedAt" = ${now}
    WHERE "userId" = ${userId}
      AND "bucket" = ${policy.bucket}
      AND "resetAt" > ${now}
      AND "count" < ${policy.limit}
  `;

  const rows = await tx.$queryRaw<BucketRow[]>`
    SELECT "count", "resetAt"
    FROM "AiGuidanceUsageBucket"
    WHERE "userId" = ${userId}
      AND "bucket" = ${policy.bucket}
    LIMIT 1
  `;
  const row = rows[0];
  const currentCount = row ? Number(row.count) : policy.limit;
  const currentResetAt = row ? new Date(row.resetAt) : resetAt;

  if (Number(changed) !== 1) {
    throw new AiGuidanceLimitError(
      policy.bucket,
      currentResetAt,
      secondsUntil(now, currentResetAt),
      limitMessage(policy.bucket, now, currentResetAt),
    );
  }

  return {
    bucket: policy.bucket,
    limit: policy.limit,
    remaining: Math.max(0, policy.limit - currentCount),
    resetAt: currentResetAt,
  };
}

export async function reserveAiGuidanceUsage(
  userId: string,
  now = new Date(),
): Promise<AiGuidanceUsageReservation> {
  const policies = aiGuidanceLimitPolicies();

  return prisma.$transaction(async (tx) => {
    const statuses: AiGuidanceUsageStatus[] = [];
    for (const policy of policies) {
      statuses.push(await reserveBucket(tx, userId, policy, now));
    }
    return { statuses };
  });
}

export async function refundAiGuidanceUsage(
  userId: string,
  reservation: AiGuidanceUsageReservation,
): Promise<void> {
  await prisma.$transaction(
    reservation.statuses.map((status) =>
      prisma.aiGuidanceUsageBucket.updateMany({
        where: {
          userId,
          bucket: status.bucket,
          resetAt: status.resetAt,
          count: { gt: 0 },
        },
        data: { count: { decrement: 1 } },
      }),
    ),
  );
}

export function aiGuidanceUsageResponse(
  reservation: AiGuidanceUsageReservation,
) {
  return {
    limits: reservation.statuses.map((status) => ({
      bucket: status.bucket,
      limit: status.limit,
      remaining: status.remaining,
      resetAt: status.resetAt.toISOString(),
    })),
  };
}
