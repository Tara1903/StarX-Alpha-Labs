import { NextResponse } from "next/server";
import { AuthError, requireAdmin } from "@/lib/auth/admin";
import { PORTFOLIO_AUDIT_DATA, getPortfolioAuditMetrics } from "@/lib/forge/auditData";

export async function GET() {
  try {
    await requireAdmin(["owner", "admin", "editor"]);
    const metrics = getPortfolioAuditMetrics();

    return NextResponse.json({
      success: true,
      metrics,
      audits: PORTFOLIO_AUDIT_DATA,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Failed to load audit records." }, { status: 500 });
  }
}
