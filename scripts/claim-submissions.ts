/**
 * Assigns submissions created before accounts existed (userId NULL) to a
 * user. Run once after deploying multi-user support:
 *
 *   npx tsx scripts/claim-submissions.ts you@example.com
 *
 * The user must already exist — sign up through the app first. Uses the same
 * database resolution as the app (TURSO_DATABASE_URL if set, else
 * DATABASE_URL).
 */

import { createPrismaClient } from "../src/lib/prisma-client";

const prisma = createPrismaClient();

async function main() {
  const email = process.argv[2]?.trim().toLowerCase();
  if (!email) {
    console.error("Usage: npx tsx scripts/claim-submissions.ts <email>");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(
      `No user with email "${email}". Sign up through the app first.`,
    );
    process.exit(1);
  }

  const { count } = await prisma.submission.updateMany({
    where: { userId: null },
    data: { userId: user.id },
  });

  console.log(
    count === 0
      ? "No unclaimed submissions found."
      : `Assigned ${count} legacy submission${count === 1 ? "" : "s"} to ${user.email}.`,
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
