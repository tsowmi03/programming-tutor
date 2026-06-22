import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { NotFoundError, toErrorResponse } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import {
  DEFAULT_AI_GUIDANCE_MODEL,
  requestAiGuidance,
  type AiGuidanceProblemContext,
} from "@/lib/ai-guidance";
import { normalizeGuidance } from "@/lib/guidance";
import { getProblemRecord, parseJudgingData } from "@/lib/problems";
import { aiGuidanceRequestSchema } from "@/lib/validation";

export const maxDuration = 30;

/** Runtime AI guidance for the current code attempt. */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await requireUser();
    const { slug } = await params;
    const body = aiGuidanceRequestSchema.parse(await req.json());

    const record = await getProblemRecord(slug);
    if (!record) throw new NotFoundError(`No problem named "${slug}"`);
    if (record.type !== "code") {
      return NextResponse.json(
        { error: "AI guidance is currently available for code problems." },
        { status: 400 },
      );
    }

    const judging = parseJudgingData(record);
    if (!judging) {
      return NextResponse.json(
        { error: "This problem does not accept code submissions." },
        { status: 400 },
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI guidance is not configured. Set ANTHROPIC_API_KEY." },
        { status: 503 },
      );
    }

    const visibleTests = judging.tests.filter((test) => !test.hidden);
    const problem: AiGuidanceProblemContext = {
      title: record.title,
      difficulty: record.difficulty,
      category: record.category,
      description: record.description,
      guidance: normalizeGuidance(JSON.parse(record.hints)),
      signature: judging.signature,
      visibleTests,
      hiddenTestCount: judging.tests.length - visibleTests.length,
    };

    const guidance = await requestAiGuidance({
      client: new Anthropic({ apiKey }),
      model: process.env.AI_GUIDANCE_MODEL ?? DEFAULT_AI_GUIDANCE_MODEL,
      problem,
      language: body.language,
      code: body.code,
      mode: body.mode,
      latestOutcome: body.latestOutcome ?? null,
      runError: body.runError ?? null,
    });

    return NextResponse.json({ guidance });
  } catch (err) {
    return toErrorResponse(err);
  }
}
