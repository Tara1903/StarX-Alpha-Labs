import { NextResponse, type NextRequest } from "next/server";
import { designStudioOrchestrator } from "@/lib/stitch/jobs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const projectId = searchParams.get("projectId");

    if (id) {
      const artifact = await designStudioOrchestrator.getArtifact(id);
      if (!artifact) {
        return NextResponse.json(
          { ok: false, error: "Artifact not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ ok: true, artifact });
    }

    if (projectId) {
      const artifact = await designStudioOrchestrator.getActiveArtifactForProject(projectId);
      if (!artifact) {
        return NextResponse.json(
          { ok: false, error: "No active artifact found for project" },
          { status: 404 }
        );
      }
      return NextResponse.json({ ok: true, artifact });
    }

    return NextResponse.json(
      { ok: false, error: "Provide either id or projectId" },
      { status: 400 }
    );
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
    const { action, projectId, artifactId, contactName, contactEmail, contactPhone, quoteRequestId } = json;

    if (action === "approve") {
      if (!projectId || !artifactId) {
        return NextResponse.json(
          { ok: false, error: "Missing required projectId or artifactId" },
          { status: 400 }
        );
      }

      const res = await designStudioOrchestrator.approveArtifact({
        projectId,
        artifactId,
        contactName,
        contactEmail,
        contactPhone,
        quoteRequestId,
      });

      const updatedArtifact = await designStudioOrchestrator.getArtifact(artifactId);

      return NextResponse.json({
        ok: true,
        success: true,
        artifact: updatedArtifact || res.artifact,
      });
    }

    return NextResponse.json(
      { ok: false, error: `Unsupported action: ${action}` },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
