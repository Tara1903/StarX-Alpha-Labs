import { NextResponse } from "next/server";
import { AuthError, requireAdmin } from "@/lib/auth/admin";
import {
  getForgeOverviewMetrics,
  getForgeSettings,
  getStorageMode,
  listForgeAuditLogs,
  listForgeBatches,
  listForgeDemos,
  listForgeJobs,
} from "@/lib/forge/store";

export async function GET() {
  try {
    await requireAdmin(["owner", "admin", "editor"]);
    const [overview, demos, jobs, batches, settings, auditLogs, storageMode] = await Promise.all([
      getForgeOverviewMetrics(),
      listForgeDemos(),
      listForgeJobs(),
      listForgeBatches(),
      getForgeSettings(),
      listForgeAuditLogs(40),
      getStorageMode(),
    ]);

    return NextResponse.json({
      success: true,
      storageMode,
      overview,
      demos,
      jobs,
      batches,
      settings,
      auditLogs,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Failed to load StarX Forge workspace data." }, { status: 500 });
  }
}
