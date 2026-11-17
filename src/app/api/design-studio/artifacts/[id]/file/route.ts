import { NextResponse, type NextRequest } from "next/server";
import { designStudioOrchestrator } from "@/lib/stitch/jobs";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Missing required artifact ID" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const assetType = (searchParams.get("type") || "html") as "html" | "screenshot";
    const mode = searchParams.get("mode") || "redirect"; // "redirect" or "json"

    // Extract authorization context from headers or cookies
    const orgId = request.headers.get("x-organization-id") || undefined;
    const customerId = request.headers.get("x-customer-id") || undefined;

    // Verify cross-organization access boundary
    const access = await designStudioOrchestrator.verifyArtifactAccess(id, {
      organizationId: orgId,
      customerId: customerId,
    });

    if (!access.authorized) {
      return NextResponse.json(
        {
          ok: false,
          error: access.reason || "Forbidden: You do not have permission to access this artifact.",
        },
        { status: 403 }
      );
    }

    // Generate fresh temporary signed URL (1 hour)
    const signedRes = await designStudioOrchestrator.getSignedArtifactUrl(id, assetType);
    if (!signedRes.ok || !signedRes.signedUrl) {
      return NextResponse.json(
        { ok: false, error: signedRes.error || "Failed to generate authorized access URL" },
        { status: 404 }
      );
    }

    if (mode === "json") {
      return NextResponse.json({
        ok: true,
        artifactId: id,
        assetType,
        signedUrl: signedRes.signedUrl,
        expiresInSeconds: 3600,
      });
    }

    // Redirect to the private signed URL directly
    return NextResponse.redirect(signedRes.signedUrl, {
      status: 307,
      headers: {
        "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
