import { NextResponse } from "next/server";
import { judgeCode } from "@/lib/judge/judge";
import { getProblemRecord, parseJudgingData } from "@/lib/problems";
import { runRequestSchema } from "@/lib/validation";
import { requireUser } from "@/lib/auth";
import { NotFoundError, toErrorResponse } from "@/lib/api";

/**
 * "Run" executes the user's code against the sample (visible) tests only and
 * records nothing — a fast feedback loop while iterating. Auth is required so
 * the executor can't be driven anonymously.
 */
export async function POST(req: Request) {
  try {
    await requireUser();
    const { slug, language, code } = runRequestSchema.parse(await req.json());

    const record = await getProblemRecord(slug);
    if (!record) throw new NotFoundError(`No problem named "${slug}"`);
    const judging = parseJudgingData(record);
    if (!judging) {
      return NextResponse.json(
        { error: "This problem does not accept code submissions." },
        { status: 400 },
      );
    }

    const visibleTests = judging.tests.filter((t) => !t.hidden);
    const outcome = await judgeCode({
      language,
      code,
      signature: judging.signature,
      tests: visibleTests,
    });

    return NextResponse.json({ outcome });
  } catch (err) {
    return toErrorResponse(err);
  }
}
