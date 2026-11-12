import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireAdmin } from "@/lib/auth/admin";
import { executeStandaloneDemoQa } from "@/lib/forge/orchestrator";

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin(["owner", "admin", "editor"]);
    const body = await request.json();

    if (!body.demoId) {
      return NextResponse.json({ error: "demoId is required." }, { status: 400 });
    }

    const origin = request.nextUrl?.origin || process.env.NEXT_PUBLIC_SITE_URL;
    const result = await executeStandaloneDemoQa({
      demoIdOrSlug: body.demoId,
      actorEmail: admin.email,
      baseUrl: origin,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err?.message || "Failed to run Automated QA." }, { status: 400 });
  }
}
