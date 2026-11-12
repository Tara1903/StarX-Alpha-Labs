import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireAdmin } from "@/lib/auth/admin";
import { appendForgeAuditLog, getForgeSettings, saveForgeSettings } from "@/lib/forge/store";

export async function GET() {
  try {
    await requireAdmin(["owner", "admin"]);
    const settings = await getForgeSettings();
    return NextResponse.json({ success: true, settings });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Failed to load Forge settings." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAdmin(["owner", "admin"]);
    const body = await request.json();

    const maxConcurrentJobs = Math.min(Math.max(1, Number(body.maxConcurrentJobs) || 2), 10);
    const retryLimit = Math.min(Math.max(0, Number(body.retryLimit) || 2), 5);
    const jobTimeoutSeconds = Math.min(Math.max(30, Number(body.jobTimeoutSeconds) || 300), 1800);

    const updated = await saveForgeSettings(
      {
        maxConcurrentJobs,
        retryLimit,
        jobTimeoutSeconds,
        defaultGenerationInstructions:
          typeof body.defaultGenerationInstructions === "string"
            ? body.defaultGenerationInstructions
            : undefined,
        defaultQaRequirements: body.defaultQaRequirements,
        stitchMcpEndpoint: body.stitchMcpEndpoint || null,
        antigravityWorkerMode: body.antigravityWorkerMode || "local-bridge",
      },
      admin.email
    );

    await appendForgeAuditLog({
      actorEmail: admin.email,
      action: "FORGE_SETTINGS_UPDATED",
      targetType: "forge_settings",
      targetId: "default",
      details: { maxConcurrentJobs, retryLimit, jobTimeoutSeconds },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err?.message || "Failed to update settings." }, { status: 400 });
  }
}
