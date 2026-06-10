import { NextResponse } from "next/server";
import { listProblems } from "@/lib/problems";
import { toErrorResponse } from "@/lib/api";

export async function GET() {
  try {
    const problems = await listProblems();
    return NextResponse.json({ problems });
  } catch (err) {
    return toErrorResponse(err);
  }
}
