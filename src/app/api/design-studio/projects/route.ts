import { NextResponse, type NextRequest } from "next/server";
import { CreateDesignProjectSchema } from "@/lib/stitch/schemas";
import { designStudioOrchestrator } from "@/lib/stitch/jobs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Missing required project ID" },
        { status: 400 }
      );
    }

    const project = await designStudioOrchestrator.getProject(id);
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

    const { brief, contact } = parsed.data;
    const project = await designStudioOrchestrator.createProject(brief as any, contact);

    return NextResponse.json({ ok: true, project }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
