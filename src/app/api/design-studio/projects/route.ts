import { NextResponse, type NextRequest } from "next/server";
import { CreateDesignProjectSchema, ContactProfileSchema } from "@/lib/stitch/schemas";
import { designStudioOrchestrator } from "@/lib/stitch/jobs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const sessionId = searchParams.get("sessionId");

    if (!id && !sessionId) {
      return NextResponse.json(
        { ok: false, error: "Missing required project ID or sessionId" },
        { status: 400 }
      );
    }

    const project = id
      ? await designStudioOrchestrator.getProject(id)
      : await designStudioOrchestrator.getProjectBySession(sessionId!);

    if (!project) {
      return NextResponse.json(
        { ok: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const artifact = project.activeArtifactId
      ? await designStudioOrchestrator.getArtifact(project.activeArtifactId)
      : null;

    const allArtifacts = await designStudioOrchestrator.getArtifactsForProject(project.id);
    const revisions = await designStudioOrchestrator.getRevisions(project.id);

    return NextResponse.json({
      ok: true,
      project,
      activeArtifact: artifact,
      artifacts: allArtifacts,
      revisions,
    });
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
    const parsed = CreateDesignProjectSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { brief, contact, sessionId, organizationId } = parsed.data;
    const finalContact = {
      ...contact,
      sessionId: sessionId || contact?.sessionId,
      organizationId: organizationId || contact?.organizationId,
    };
    const project = await designStudioOrchestrator.createProject(brief as any, finalContact);

    return NextResponse.json({ ok: true, project }, { status: 201 });
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
    const { projectId, contactProfile } = json;

    if (!projectId) {
      return NextResponse.json(
        { ok: false, error: "Missing required projectId" },
        { status: 400 }
      );
    }

    if (!contactProfile) {
      return NextResponse.json(
        { ok: false, error: "Missing contactProfile" },
        { status: 400 }
      );
    }

    const parsed = ContactProfileSchema.safeParse(contactProfile);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const project = await designStudioOrchestrator.updateProjectContactProfile(
      projectId,
      parsed.data
    );

    if (!project) {
      return NextResponse.json(
        { ok: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, project });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
