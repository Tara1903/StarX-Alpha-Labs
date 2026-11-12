import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireAdmin } from "@/lib/auth/admin";
import {
  cancelForgeJob,
  createGenerationJob,
  retryForgeJob,
  syncStitchAssetsAndContinue,
} from "@/lib/forge/orchestrator";
import { listForgeJobs } from "@/lib/forge/store";

export async function GET() {
  try {
    await requireAdmin(["owner", "admin", "editor"]);
    const jobs = await listForgeJobs();
    return NextResponse.json({ success: true, jobs });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Failed to fetch jobs." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin(["owner", "admin", "editor"]);
    const body = await request.json();

    if (!body.demoId) {
      return NextResponse.json({ error: "demoId is required to start a generation job." }, { status: 400 });
    }

    const result = await createGenerationJob({
      demoIdOrSlug: body.demoId,
      inputConfig: body.inputConfig || {},
      actorEmail: admin.email,
      batchId: body.batchId || null,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err?.message || "Failed to start generation job." }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const admin = await requireAdmin(["owner", "admin", "editor"]);
    const body = await request.json();
    const { jobId, action, stitchAssets } = body;

    if (!jobId || !action) {
      return NextResponse.json({ error: "jobId and action are required." }, { status: 400 });
    }

    if (action === "retry") {
      const res = await retryForgeJob(jobId, admin.email);
      return NextResponse.json({ success: true, ...res });
    }

    if (action === "cancel") {
      const job = await cancelForgeJob(jobId, admin.email);
      return NextResponse.json({ success: true, job });
    }

    if (action === "sync_stitch") {
      if (!stitchAssets?.projectId || !stitchAssets?.screenSummary) {
        return NextResponse.json(
          { error: "Genuine Stitch output requires projectId and screenSummary." },
          { status: 400 }
        );
      }
      const res = await syncStitchAssetsAndContinue({
        jobId,
        actorEmail: admin.email,
        stitchAssets,
      });
      return NextResponse.json({ success: true, ...res });
    }

    return NextResponse.json({ error: `Unsupported job action: ${action}` }, { status: 400 });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err?.message || "Failed to update job." }, { status: 400 });
  }
}
