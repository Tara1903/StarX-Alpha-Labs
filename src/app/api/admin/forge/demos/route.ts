import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { AuthError, requireAdmin } from "@/lib/auth/admin";
import { transitionDemoApproval } from "@/lib/forge/orchestrator";
import {
  appendForgeAuditLog,
  getForgeDemoById,
  listDemoVersions,
  listForgeDemos,
  upsertForgeDemo,
} from "@/lib/forge/store";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(["owner", "admin", "editor"]);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const demo = await getForgeDemoById(id);
      if (!demo) {
        return NextResponse.json({ error: "Demo not found." }, { status: 404 });
      }
      const versions = await listDemoVersions(demo.id);
      return NextResponse.json({ success: true, demo, versions });
    }

    const demos = await listForgeDemos();
    return NextResponse.json({ success: true, demos });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Failed to fetch demos." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin(["owner", "admin", "editor"]);
    const body = await request.json();

    if (body.action === "duplicate" && body.sourceId) {
      const source = await getForgeDemoById(body.sourceId);
      if (!source) {
        return NextResponse.json({ error: "Source demo not found." }, { status: 404 });
      }
      const suffix = Math.floor(100 + Math.random() * 900);
      const newSlug = `${source.slug}-copy-${suffix}`;
      const duplicated = await upsertForgeDemo({
        id: crypto.randomUUID(),
        catalogId: null,
        slug: newSlug,
        businessName: `${source.businessName} (Copy ${suffix})`,
        industry: source.industry,
        categorySlug: source.categorySlug,
        description: source.description,
        targetAudience: source.targetAudience,
        designDirection: source.designDirection,
        featureRequirements: source.featureRequirements,
        workflows: source.workflows,
        archetype: source.archetype,
        brandConfig: source.brandConfig,
        seedData: source.seedData,
        generationStatus: "draft",
        qaStatus: "not_run",
        publishingStatus: "unpublished",
        previewUrl: `/demos/${source.categorySlug}/${source.slug}/live`,
        createdBy: admin.email,
        updatedBy: admin.email,
      });

      await appendForgeAuditLog({
        actorEmail: admin.email,
        action: "FORGE_DEMO_DUPLICATED",
        targetType: "forge_demos",
        targetId: duplicated.slug,
        details: { sourceSlug: source.slug },
      });

      return NextResponse.json({ success: true, demo: duplicated });
    }

    // Create new custom demo
    const businessName = String(body.businessName || "").trim();
    if (businessName.length < 2) {
      return NextResponse.json({ error: "Business name must be at least 2 characters." }, { status: 400 });
    }

    const requestedSlug = typeof body.slug === "string"
      ? body.slug
          .toLowerCase()
          .replace(/[^a-z0-9-]+/g, "-")
          .replace(/^-|-$/g, "")
      : "";
    const baseSlug = businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const slug = requestedSlug || `${baseSlug}-${Math.floor(100 + Math.random() * 900)}`;

    if (requestedSlug) {
      const existing = await getForgeDemoById(requestedSlug);
      if (existing) {
        return NextResponse.json({ error: `A demo with slug "${requestedSlug}" already exists.` }, { status: 409 });
      }
    }

    const created = await upsertForgeDemo({
      id: crypto.randomUUID(),
      catalogId: null,
      slug,
      businessName,
      industry: body.industry || "Custom Enterprise",
      categorySlug: body.categorySlug || "saas-ai-automation",
      description: body.description || `Custom interactive business platform for ${businessName}.`,
      targetAudience: body.targetCustomers || "Business Operators & Customers",
      designDirection: body.designPreferences || "Clean High-Contrast Domain UI",
      featureRequirements: Array.isArray(body.functionalRequirements) ? body.functionalRequirements : [],
      workflows: Array.isArray(body.workflows)
        ? body.workflows.map((w: any, idx: number) =>
            typeof w === "string" ? { id: `wf${idx + 1}`, title: w, description: w } : w
          )
        : [
            { id: "wf1", title: "Core Operations Workbench", description: "Manage primary records and live status." },
            { id: "wf2", title: "Customer Portal View", description: "Self-service customer portal experience." },
            { id: "wf3", title: "Analytics & Exports", description: "Operational metrics and filtered reports." },
          ],
      archetype: body.archetype || "analytics-canvas",
      brandConfig: body.brandConfig || {
        primary: "#087BFF",
        secondary: "#0A1940",
        accent: "#00D9FF",
        bg: "#030B24",
        surface: "#0A1940",
        border: "rgba(0,217,255,0.2)",
        text: "#F8FAFC",
        mutedText: "#94A3B8",
        fontHeadline: "sans",
      },
      seedData: body.seedData || {
        records: [
          { id: "REC-01", title: `${businessName} Initial Dataset`, status: "Active", value: 12500 },
          { id: "REC-02", title: "Customer Onboarding Queue", status: "Pending", value: 8400 },
        ],
      },
      generationStatus: "draft",
      qaStatus: "not_run",
      publishingStatus: "unpublished",
      previewUrl: `/demos/${body.categorySlug || "saas-ai-automation"}/${slug}/live`,
      createdBy: admin.email,
      updatedBy: admin.email,
    });

    await appendForgeAuditLog({
      actorEmail: admin.email,
      action: "FORGE_CUSTOM_DEMO_CREATED",
      targetType: "forge_demos",
      targetId: created.slug,
      details: { businessName: created.businessName, industry: created.industry },
    });

    return NextResponse.json({ success: true, demo: created });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err?.message || "Failed to create demo." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const admin = await requireAdmin(["owner", "admin"]);
    const body = await request.json();
    const { demoId, action, notes, targetVersionNumber } = body;

    if (!demoId || !action) {
      return NextResponse.json({ error: "demoId and action are required." }, { status: 400 });
    }

    const updated = await transitionDemoApproval({
      demoIdOrSlug: demoId,
      action,
      actorEmail: admin.email,
      notes,
      targetVersionNumber,
    });

    const versions = await listDemoVersions(updated.id);
    return NextResponse.json({ success: true, demo: updated, versions });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err?.message || "Failed to transition demo state." }, { status: 400 });
  }
}
