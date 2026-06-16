/**
 * Seeds the database from the problem content in src/content.
 * Idempotent: problems are upserted by slug (re-running updates content
 * without touching submissions), and problems removed from the content are
 * pruned.
 */

import { ALL_PROBLEMS } from "../src/content";
import { normalizeGuidance } from "../src/lib/guidance";
import { createPrismaClient } from "../src/lib/prisma-client";

const prisma = createPrismaClient();

async function main() {
  const slugs = ALL_PROBLEMS.map((p) => p.slug);

  for (const def of ALL_PROBLEMS) {
    const guidance = normalizeGuidance(def.guidance, def.hints);
    const base = {
      title: def.title,
      type: def.type,
      difficulty: def.difficulty,
      category: def.category,
      order: def.order,
      description: def.description,
      // The legacy column name is kept for schema compatibility; its payload
      // is now structured guidance, with old string[] data still readable.
      hints: JSON.stringify(guidance),
      signature: def.type === "code" ? JSON.stringify(def.signature) : null,
      testCases: def.type === "code" ? JSON.stringify(def.testCases) : null,
      starterCode: def.type === "code" ? JSON.stringify(def.starterCode) : null,
      solutions: def.type === "code" ? JSON.stringify(def.solutions) : null,
      editorial: def.type === "code" ? def.editorial : null,
      modelAnswer: def.type === "explanation" ? def.modelAnswer : null,
      keyPoints:
        def.type === "explanation" ? JSON.stringify(def.keyPoints) : null,
    };

    await prisma.problem.upsert({
      where: { slug: def.slug },
      create: { slug: def.slug, ...base },
      update: base,
    });
  }

  const pruned = await prisma.problem.deleteMany({
    where: { slug: { notIn: slugs } },
  });

  console.log(
    `Seeded ${ALL_PROBLEMS.length} problems` +
      (pruned.count > 0 ? `, pruned ${pruned.count} stale` : ""),
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
