import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";

export function createPrismaClient(): PrismaClient {
  const url = process.env.TURSO_DATABASE_URL;

  if (!url) {
    return new PrismaClient();
  }

  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!authToken) {
    throw new Error(
      "TURSO_AUTH_TOKEN is required when TURSO_DATABASE_URL is configured.",
    );
  }

  const adapter = new PrismaLibSQL({ url, authToken });
  return new PrismaClient({ adapter });
}
