import { NextResponse } from "next/server";
import { listProblems } from "@/lib/problems";
import { requireUser } from "@/lib/auth";
import { toErrorResponse } from "@/lib/api";

export async function GET() {
  try {
    const user = await requireUser();
    const problems = await listProblems(user.id);
    return NextResponse.json({ problems });
  } catch (err) {
    return toErrorResponse(err);
  }
}
