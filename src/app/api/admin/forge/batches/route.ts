import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireAdmin } from "@/lib/auth/admin";
import { controlForgeBatch, createForgeBatch } from "@/lib/forge/orchestrator";
import { listForgeBatches } from "@/lib/forge/store";

export async function GET() {
  try {
    await requireAdmin(["owner", "admin", "editor"]);
    const batches = await listForgeBatches();
    return NextResponse.json({ success: true, batches });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Failed to load batches." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin(["owner", "admin"]);
    const body = await request.json();

    if (!body.name || !Array.isArray(body.demoIds) || body.demoIds.length === 0) {
      return NextResponse.json({ error: "Batch name and at least one demoId are required." }, { status: 400 });
    }

    const batch = await createForgeBatch({
      name: String(body.name),
      description: String(body.description || ""),
      demoIds: body.demoIds,
      maxConcurrency: Number(body.maxConcurrency) || 2,
      actorEmail: admin.email,
      settings: body.settings,
    });

    return NextResponse.json({ success: true, batch });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err?.message || "Failed to create batch." }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const admin = await requireAdmin(["owner", "admin"]);
    const body = await request.json();
    const { batchId, action } = body;

    if (!batchId || !["start", "pause", "resume", "cancel"].includes(action)) {
      return NextResponse.json({ error: "Valid batchId and action are required." }, { status: 400 });
    }

    const result = await controlForgeBatch({
      batchId,
      action,
      actorEmail: admin.email,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err?.message || "Failed to control batch." }, { status: 400 });
  }
}
