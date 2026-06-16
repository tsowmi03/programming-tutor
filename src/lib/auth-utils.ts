import { createHash } from "node:crypto";
import { headers } from "next/headers";

/** Only allow same-site paths as post-login destinations. */
export function safeRedirectPath(value: unknown): string {
  return typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//")
    ? value
    : "/";
}

export async function clientIp(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwarded ||
    headerList.get("x-real-ip") ||
    headerList.get("cf-connecting-ip") ||
    "unknown"
  );
}

export function hashRateLimitKey(parts: string[]): string {
  return createHash("sha256")
    .update(parts.map((part) => part.toLowerCase()).join("|"))
    .digest("base64url");
}
