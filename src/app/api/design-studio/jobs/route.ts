import { NextResponse, type NextRequest } from "next/server";
import { TriggerGenerationSchema } from "@/lib/stitch/schemas";
import { designStudioOrchestrator } from "@/lib/stitch/jobs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Missing required job ID" },
        { status: 400 }
      );
    }

    const job = await designStudioOrchestrator.getJob(id);
    if (!job) {
      return NextResponse.json(
        { ok: false, error: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, job });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = TriggerGenerationSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { projectId, modelId, deviceType, customPrompt, previewOnly } = parsed.data;
    const result = await designStudioOrchestrator.submitGenerationJob({
      projectId,
      modelId,
      deviceType,
      customPrompt,
      previewOnly,
    });

    return NextResponse.json({
      ok: true,
      job: result.job,
      artifact: result.artifact,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
