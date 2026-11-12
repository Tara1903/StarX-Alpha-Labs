import { NextResponse } from "next/server";
import { AuthError, requireAdmin } from "@/lib/auth/admin";
import { runRealIntegrationHealthCheck } from "@/lib/forge/health";

export async function GET() {
  try {
    await requireAdmin(["owner", "admin", "editor"]);
    const checks = await runRealIntegrationHealthCheck();
    return NextResponse.json({ success: true, checks });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Failed to run integration health diagnostics." }, { status: 500 });
  }
}
