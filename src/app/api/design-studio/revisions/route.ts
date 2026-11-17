import { NextResponse, type NextRequest } from "next/server";
import { CreateRevisionSchema, ApproveDesignSchema } from "@/lib/stitch/schemas";
import { designStudioOrchestrator } from "@/lib/stitch/jobs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { ok: false, error: "Missing required projectId" },
        { status: 400 }
      );
    }

    const revisions = await designStudioOrchestrator.getRevisions(projectId);
    return NextResponse.json({ ok: true, revisions });
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
    const parsed = CreateRevisionSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { projectId, artifactId, notes, triggerRegeneration, modelId, deviceType } = parsed.data;
    const result = await designStudioOrchestrator.submitRevision({
      projectId,
      artifactId,
      notes,
      triggerRegeneration,
      modelId,
      deviceType,
    });

    return NextResponse.json(
      { ok: true, revision: result.revision, newArtifact: result.newArtifact },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = ApproveDesignSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { projectId, artifactId } = parsed.data;
    const result = await designStudioOrchestrator.approveArtifact({
      projectId,
      artifactId,
    });

    return NextResponse.json({ ok: true, approved: result.ok });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
