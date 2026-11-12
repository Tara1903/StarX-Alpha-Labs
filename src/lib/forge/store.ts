import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { ALL_160_DEMOS } from "@/modules/demo-center/registry";
import type {
  ForgeAuditLog,
  ForgeBatch,
  ForgeDemoRecord,
  ForgeDemoVersion,
  ForgeJob,
  ForgeOverviewMetrics,
  ForgeSettings,
} from "./types";

interface LocalForgeState {
  demos: ForgeDemoRecord[];
  versions: ForgeDemoVersion[];
  jobs: ForgeJob[];
  batches: ForgeBatch[];
  settings: ForgeSettings;
  auditLogs: ForgeAuditLog[];
  sandboxes: Record<string, Record<string, any>>;
}

const DATA_DIR = path.join(process.cwd(), ".forge-data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

// Ephemeral in-memory cache (helps in read-only serverless runtime if DB not migrated yet)
let memoryFallback: LocalForgeState | null = null;
let schemaReadyCache = false;
let catalogSeededCache = false;

function createDefaultSettings(): ForgeSettings {
  return {
    id: "default",
    generationEnabled: false,
    maxConcurrentJobs: 2,
    retryLimit: 2,
    jobTimeoutSeconds: 300,
    defaultGenerationInstructions:
      "Follow StarX Alpha Labs quality standards: craft an authentic, domain-specific application with realistic regional workflows, WCAG AA contrast, responsive mobile-first layouts, and isolated sandbox data.",
    defaultQaRequirements: {
      requireVisualCheck: true,
      requireFunctionalCheck: true,
      requireTechnicalCheck: true,
      requirePerformanceCheck: true,
      blockPublishOnCriticalFail: true,
    },
    stitchMcpEndpoint: process.env.STITCH_MCP_URL || null,
    antigravityWorkerMode: "local-bridge",
    updatedBy: "system",
    updatedAt: new Date().toISOString(),
  };
}

function buildSeedCatalogDemos(): ForgeDemoRecord[] {
  const now = new Date().toISOString();
  return ALL_160_DEMOS.map((prod) => ({
    id: `demo-${String(prod.id).padStart(4, "0")}-${prod.slug.slice(0, 24)}`,
    catalogId: prod.id,
    slug: prod.slug,
    businessName: prod.name,
    industry: prod.categoryName,
    categorySlug: prod.categorySlug,
    description: prod.shortDescription,
    targetAudience: prod.suitableFor,
    designDirection: `${prod.brand.fontHeadline} typography • Primary ${prod.brand.primary} / Accent ${prod.brand.accent} • Archetype: ${prod.archetype}`,
    featureRequirements: prod.features,
    workflows: prod.workflows,
    archetype: prod.archetype,
    brandConfig: prod.brand as unknown as Record<string, string>,
    seedData: prod.initialData,
    generationStatus: "draft",
    qaStatus: "not_run",
    publishingStatus: "unpublished",
    previewUrl: `/demos/${prod.categorySlug}/${prod.slug}/live`,
    publishedVersion: 0,
    activeVersionId: null,
    lastQaReport: null,
    createdBy: "catalog-registry",
    updatedBy: "catalog-registry",
    createdAt: now,
    updatedAt: now,
  }));
}

async function readLocalState(): Promise<LocalForgeState> {
  if (memoryFallback) {
    return memoryFallback;
  }
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as LocalForgeState;
    if (!parsed.demos || parsed.demos.length === 0) {
      parsed.demos = buildSeedCatalogDemos();
    }
    memoryFallback = parsed;
    return parsed;
  } catch {
    const initial: LocalForgeState = {
      demos: buildSeedCatalogDemos(),
      versions: [],
      jobs: [],
      batches: [],
      settings: createDefaultSettings(),
      auditLogs: [],
      sandboxes: {},
    };
    memoryFallback = initial;
    await writeLocalState(initial);
    return initial;
  }
}

async function writeLocalState(state: LocalForgeState): Promise<void> {
  memoryFallback = state;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch {
    // Vercel serverless filesystem is read-only; keep in-memory state silently without crashing
  }
}

async function isForgeSchemaReady(): Promise<boolean> {
  if (schemaReadyCache) return true;
  try {
    const admin = createAdminClient();
    const { error } = await (admin as any).from("forge_demos").select("id").limit(1);
    if (!error) {
      schemaReadyCache = true;
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

function mapDbDemo(row: any): ForgeDemoRecord {
  return {
    id: row.id,
    catalogId: row.catalog_id ?? null,
    slug: row.slug,
    businessName: row.business_name,
    industry: row.industry,
    categorySlug: row.category_slug,
    description: row.description,
    targetAudience: row.target_audience || "",
    designDirection: row.design_direction || "",
    featureRequirements: Array.isArray(row.feature_requirements) ? row.feature_requirements : [],
    workflows: Array.isArray(row.workflows) ? row.workflows : [],
    archetype: row.archetype || "pos-terminal",
    brandConfig: row.brand_config || {},
    seedData: row.seed_data || {},
    generationStatus: row.generation_status,
    qaStatus: row.qa_status,
    publishingStatus: row.publishing_status,
    previewUrl: row.preview_url || `/demos/${row.category_slug}/${row.slug}/live`,
    publishedVersion: row.published_version ?? 0,
    activeVersionId: row.active_version_id ?? null,
    createdBy: row.created_by ?? null,
    updatedBy: row.updated_by ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapDbJob(row: any): ForgeJob {
  return {
    id: row.id,
    jobCode: row.job_code,
    demoId: row.demo_id,
    batchId: row.batch_id ?? null,
    currentStage: row.current_stage,
    stageIndex: row.stage_index ?? 1,
    status: row.status,
    inputConfig: row.input_config || {},
    designBrief: row.design_brief || "",
    stitchRequestPayload: row.stitch_request_payload || {},
    stitchResponseAssets: row.stitch_response_assets || {},
    outputReferences: row.output_references || {},
    qaResults: row.qa_results && Object.keys(row.qa_results).length > 0 ? row.qa_results : null,
    logs: Array.isArray(row.logs) ? row.logs : [],
    errors: Array.isArray(row.errors) ? row.errors : [],
    retryCount: row.retry_count ?? 0,
    maxRetries: row.max_retries ?? 2,
    durationMs: row.duration_ms ?? null,
    startedAt: row.started_at ?? null,
    completedAt: row.completed_at ?? null,
    createdBy: row.created_by ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapDbBatch(row: any): ForgeBatch {
  return {
    id: row.id,
    batchCode: row.batch_code,
    name: row.name,
    description: row.description || "",
    demoIds: Array.isArray(row.demo_ids) ? row.demo_ids : [],
    maxConcurrency: row.max_concurrency ?? 2,
    status: row.status,
    settings: row.settings || { retryLimit: 2, requireQaPass: true, autoAdvanceStages: true },
    totalCount: row.total_count ?? 0,
    completedCount: row.completed_count ?? 0,
    failedCount: row.failed_count ?? 0,
    createdBy: row.created_by ?? null,
    startedAt: row.started_at ?? null,
    completedAt: row.completed_at ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getStorageMode(): Promise<"postgres" | "local-store"> {
  return (await isForgeSchemaReady()) ? "postgres" : "local-store";
}

export async function ensureForgeCatalogSeeded(): Promise<void> {
  if (catalogSeededCache) return;
  if (await isForgeSchemaReady()) {
    const admin = createAdminClient() as any;
    const { count } = await admin
      .from("forge_demos")
      .select("id", { count: "exact", head: true })
      .not("catalog_id", "is", null);
    if (count && count >= ALL_160_DEMOS.length) {
      catalogSeededCache = true;
      return;
    }
    if (!count || count < ALL_160_DEMOS.length) {
      const seeds = buildSeedCatalogDemos().map((d) => ({
        catalog_id: d.catalogId,
        slug: d.slug,
        business_name: d.businessName,
        industry: d.industry,
        category_slug: d.categorySlug,
        description: d.description,
        target_audience: d.targetAudience,
        design_direction: d.designDirection,
        feature_requirements: d.featureRequirements,
        workflows: d.workflows,
        archetype: d.archetype,
        brand_config: d.brandConfig,
        seed_data: d.seedData,
        generation_status: d.generationStatus,
        qa_status: d.qaStatus,
        publishing_status: d.publishingStatus,
        preview_url: d.previewUrl,
        created_by: "catalog-registry",
        updated_by: "catalog-registry",
      }));
      // Insert missing catalog entries in chunks of 40 without overwriting existing demos
      for (let i = 0; i < seeds.length; i += 40) {
        await admin
          .from("forge_demos")
          .upsert(seeds.slice(i, i + 40), { onConflict: "slug", ignoreDuplicates: true });
      }
      catalogSeededCache = true;
    }
    return;
  }
  await readLocalState();
}

/**
 * Lightweight single-query lookup returning only published catalog slugs for public showcase pages.
 */
export async function getPublishedCatalogSlugsFast(): Promise<string[]> {
  try {
    const admin = createAdminClient() as any;
    const { data, error } = await admin
      .from("forge_demos")
      .select("slug")
      .not("catalog_id", "is", null)
      .eq("publishing_status", "published");
    if (!error && Array.isArray(data)) {
      schemaReadyCache = true;
      return data.map((row: { slug: string }) => row.slug);
    }
  } catch {
    // Fallback below if Postgres table not available yet
  }
  const state = await readLocalState();
  return state.demos
    .filter((d) => d.catalogId !== null && d.publishingStatus === "published")
    .map((d) => d.slug);
}

/**
 * Lightweight single-row lookup for a published live demo route without scanning all 160 rows or jobs.
 */
export async function getPublishedForgeDemoFast(
  categorySlug: string,
  slug: string
): Promise<ForgeDemoRecord | null> {
  try {
    const admin = createAdminClient() as any;
    const { data, error } = await admin
      .from("forge_demos")
      .select("*")
      .eq("slug", slug)
      .eq("category_slug", categorySlug)
      .eq("publishing_status", "published")
      .maybeSingle();
    if (!error) {
      schemaReadyCache = true;
      return data ? mapDbDemo(data) : null;
    }
  } catch {
    // Fallback below if Postgres table not available yet
  }
  const state = await readLocalState();
  return (
    state.demos.find(
      (d) => d.slug === slug && d.categorySlug === categorySlug && d.publishingStatus === "published"
    ) || null
  );
}

export async function listForgeDemos(): Promise<ForgeDemoRecord[]> {
  await ensureForgeCatalogSeeded();
  if (await isForgeSchemaReady()) {
    const admin = createAdminClient() as any;
    const [{ data }, { data: jobs }] = await Promise.all([
      admin
        .from("forge_demos")
        .select("*")
        .order("catalog_id", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false }),
      admin
        .from("forge_jobs")
        .select("demo_id, qa_results, created_at")
        .order("created_at", { ascending: false })
        .limit(100),
    ]);

    const latestQaByDemoId = new Map<string, any>();
    for (const j of jobs || []) {
      if (j.demo_id && j.qa_results && Object.keys(j.qa_results).length > 0 && !latestQaByDemoId.has(j.demo_id)) {
        latestQaByDemoId.set(j.demo_id, j.qa_results);
      }
    }

    return (data || []).map((row: any) => ({
      ...mapDbDemo(row),
      lastQaReport: latestQaByDemoId.get(row.id) || null,
    }));
  }
  const state = await readLocalState();
  return [...state.demos].sort((a, b) => (a.catalogId ?? 9999) - (b.catalogId ?? 9999));
}

export async function getForgeDemoById(idOrSlug: string): Promise<ForgeDemoRecord | null> {
  const demos = await listForgeDemos();
  return demos.find((d) => d.id === idOrSlug || d.slug === idOrSlug) || null;
}

export async function upsertForgeDemo(demo: Partial<ForgeDemoRecord> & { slug: string; businessName: string }): Promise<ForgeDemoRecord> {
  const now = new Date().toISOString();
  if (await isForgeSchemaReady()) {
    const admin = createAdminClient() as any;
    const existing = await getForgeDemoById(demo.id || demo.slug);
    const payload = {
      ...(existing ? { id: existing.id } : {}),
      catalog_id: demo.catalogId ?? existing?.catalogId ?? null,
      slug: demo.slug,
      business_name: demo.businessName,
      industry: demo.industry ?? existing?.industry ?? "Custom Software",
      category_slug: demo.categorySlug ?? existing?.categorySlug ?? "saas-ai-automation",
      description: demo.description ?? existing?.description ?? "",
      target_audience: demo.targetAudience ?? existing?.targetAudience ?? "",
      design_direction: demo.designDirection ?? existing?.designDirection ?? "",
      feature_requirements: demo.featureRequirements ?? existing?.featureRequirements ?? [],
      workflows: demo.workflows ?? existing?.workflows ?? [],
      archetype: demo.archetype ?? existing?.archetype ?? "pos-terminal",
      brand_config: demo.brandConfig ?? existing?.brandConfig ?? {},
      seed_data: demo.seedData ?? existing?.seedData ?? {},
      generation_status: demo.generationStatus ?? existing?.generationStatus ?? "draft",
      qa_status: demo.qaStatus ?? existing?.qaStatus ?? "not_run",
      publishing_status: demo.publishingStatus ?? existing?.publishingStatus ?? "unpublished",
      preview_url: demo.previewUrl ?? existing?.previewUrl ?? `/demos/${demo.categorySlug || "saas-ai-automation"}/${demo.slug}/live`,
      published_version: demo.publishedVersion ?? existing?.publishedVersion ?? 0,
      active_version_id: demo.activeVersionId ?? existing?.activeVersionId ?? null,
      created_by: demo.createdBy ?? existing?.createdBy ?? "admin",
      updated_by: demo.updatedBy ?? "admin",
    };
    const { data, error } = await admin.from("forge_demos").upsert(payload, { onConflict: "slug" }).select().single();
    if (error) throw error;
    return mapDbDemo(data);
  }

  const state = await readLocalState();
  const idx = state.demos.findIndex((d) => d.id === demo.id || d.slug === demo.slug);
  if (idx >= 0) {
    const updated: ForgeDemoRecord = { ...state.demos[idx], ...demo, updatedAt: now };
    state.demos[idx] = updated;
    await writeLocalState(state);
    return updated;
  }

  const created: ForgeDemoRecord = {
    id: demo.id || crypto.randomUUID(),
    catalogId: demo.catalogId ?? null,
    slug: demo.slug,
    businessName: demo.businessName,
    industry: demo.industry || "Custom Vertical",
    categorySlug: demo.categorySlug || "saas-ai-automation",
    description: demo.description || "",
    targetAudience: demo.targetAudience || "Business Operators & Customers",
    designDirection: demo.designDirection || "Modern Dark SaaS Precision",
    featureRequirements: demo.featureRequirements || [],
    workflows: demo.workflows || [],
    archetype: demo.archetype || "analytics-canvas",
    brandConfig: demo.brandConfig || { primary: "#087BFF", accent: "#00D9FF", bg: "#030B24", surface: "#0A1940", text: "#F8FAFC" },
    seedData: demo.seedData || {},
    generationStatus: demo.generationStatus || "draft",
    qaStatus: demo.qaStatus || "not_run",
    publishingStatus: demo.publishingStatus || "unpublished",
    previewUrl: demo.previewUrl || `/demos/${demo.categorySlug || "saas-ai-automation"}/${demo.slug}/live`,
    publishedVersion: demo.publishedVersion ?? 0,
    activeVersionId: demo.activeVersionId ?? null,
    lastQaReport: demo.lastQaReport ?? null,
    createdBy: demo.createdBy || "admin",
    updatedBy: demo.updatedBy || "admin",
    createdAt: now,
    updatedAt: now,
  };
  state.demos.unshift(created);
  await writeLocalState(state);
  return created;
}

export async function listForgeJobs(): Promise<ForgeJob[]> {
  if (await isForgeSchemaReady()) {
    const admin = createAdminClient() as any;
    const { data } = await admin.from("forge_jobs").select("*").order("created_at", { ascending: false }).limit(200);
    return (data || []).map(mapDbJob);
  }
  const state = await readLocalState();
  return [...state.jobs].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getForgeJobById(jobId: string): Promise<ForgeJob | null> {
  const jobs = await listForgeJobs();
  return jobs.find((j) => j.id === jobId || j.jobCode === jobId) || null;
}

export async function saveForgeJob(job: ForgeJob): Promise<ForgeJob> {
  const now = new Date().toISOString();
  const payload = { ...job, updatedAt: now };
  if (await isForgeSchemaReady()) {
    const admin = createAdminClient() as any;
    const dbPayload = {
      id: payload.id,
      job_code: payload.jobCode,
      demo_id: payload.demoId,
      batch_id: payload.batchId,
      current_stage: payload.currentStage,
      stage_index: payload.stageIndex,
      status: payload.status,
      input_config: payload.inputConfig,
      design_brief: payload.designBrief,
      stitch_request_payload: payload.stitchRequestPayload,
      stitch_response_assets: payload.stitchResponseAssets,
      output_references: payload.outputReferences,
      qa_results: payload.qaResults || {},
      logs: payload.logs,
      errors: payload.errors,
      retry_count: payload.retryCount,
      max_retries: payload.maxRetries,
      duration_ms: payload.durationMs,
      started_at: payload.startedAt,
      completed_at: payload.completedAt,
      created_by: payload.createdBy,
    };
    const { data, error } = await admin.from("forge_jobs").upsert(dbPayload, { onConflict: "id" }).select().single();
    if (error) throw error;
    return mapDbJob(data);
  }

  const state = await readLocalState();
  const idx = state.jobs.findIndex((j) => j.id === payload.id);
  if (idx >= 0) state.jobs[idx] = payload;
  else state.jobs.unshift(payload);
  await writeLocalState(state);
  return payload;
}

export async function listForgeBatches(): Promise<ForgeBatch[]> {
  if (await isForgeSchemaReady()) {
    const admin = createAdminClient() as any;
    const { data } = await admin.from("forge_batches").select("*").order("created_at", { ascending: false });
    return (data || []).map(mapDbBatch);
  }
  const state = await readLocalState();
  return [...state.batches].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveForgeBatch(batch: ForgeBatch): Promise<ForgeBatch> {
  const now = new Date().toISOString();
  const payload = { ...batch, updatedAt: now };
  if (await isForgeSchemaReady()) {
    const admin = createAdminClient() as any;
    const { data, error } = await admin
      .from("forge_batches")
      .upsert(
        {
          id: payload.id,
          batch_code: payload.batchCode,
          name: payload.name,
          description: payload.description,
          demo_ids: payload.demoIds,
          max_concurrency: payload.maxConcurrency,
          status: payload.status,
          settings: payload.settings,
          total_count: payload.totalCount,
          completed_count: payload.completedCount,
          failed_count: payload.failedCount,
          created_by: payload.createdBy,
          started_at: payload.startedAt,
          completed_at: payload.completedAt,
        },
        { onConflict: "id" }
      )
      .select()
      .single();
    if (error) throw error;
    return mapDbBatch(data);
  }

  const state = await readLocalState();
  const idx = state.batches.findIndex((b) => b.id === payload.id);
  if (idx >= 0) state.batches[idx] = payload;
  else state.batches.unshift(payload);
  await writeLocalState(state);
  return payload;
}

export async function listDemoVersions(demoId: string): Promise<ForgeDemoVersion[]> {
  if (await isForgeSchemaReady()) {
    const admin = createAdminClient() as any;
    const { data } = await admin
      .from("forge_demo_versions")
      .select("*")
      .eq("demo_id", demoId)
      .order("version_number", { ascending: false });
    return (data || []).map((v: any) => ({
      id: v.id,
      demoId: v.demo_id,
      versionNumber: v.version_number,
      jobId: v.job_id,
      designReferences: v.design_references || {},
      implementationSpec: v.implementation_spec || {},
      qaReport: v.qa_report && Object.keys(v.qa_report).length > 0 ? v.qa_report : null,
      previewUrl: v.preview_url || "",
      approvedBy: v.approved_by,
      approvedAt: v.approved_at,
      notes: v.notes,
      createdAt: v.created_at,
    }));
  }
  const state = await readLocalState();
  return state.versions
    .filter((v) => v.demoId === demoId)
    .sort((a, b) => b.versionNumber - a.versionNumber);
}

export async function saveDemoVersion(version: ForgeDemoVersion): Promise<ForgeDemoVersion> {
  if (await isForgeSchemaReady()) {
    const admin = createAdminClient() as any;
    const { data, error } = await admin
      .from("forge_demo_versions")
      .insert({
        id: version.id,
        demo_id: version.demoId,
        version_number: version.versionNumber,
        job_id: version.jobId,
        design_references: version.designReferences,
        implementation_spec: version.implementationSpec,
        qa_report: version.qaReport || {},
        preview_url: version.previewUrl,
        approved_by: version.approvedBy,
        approved_at: version.approvedAt,
        notes: version.notes,
      })
      .select()
      .single();
    if (error) throw error;
    return { ...version, id: data.id, createdAt: data.created_at };
  }
  const state = await readLocalState();
  state.versions.unshift(version);
  await writeLocalState(state);
  return version;
}

export async function getForgeSettings(): Promise<ForgeSettings> {
  if (await isForgeSchemaReady()) {
    const admin = createAdminClient() as any;
    const { data } = await admin.from("forge_settings").select("*").eq("id", "default").maybeSingle();
    if (data) {
      return {
        id: data.id,
        generationEnabled: Boolean(
          data.generation_enabled ?? data.default_qa_requirements?.generationEnabled ?? false
        ),
        maxConcurrentJobs: data.max_concurrent_jobs,
        retryLimit: data.retry_limit,
        jobTimeoutSeconds: data.job_timeout_seconds,
        defaultGenerationInstructions: data.default_generation_instructions,
        defaultQaRequirements: data.default_qa_requirements,
        stitchMcpEndpoint: data.stitch_mcp_endpoint,
        antigravityWorkerMode: data.antigravity_worker_mode,
        updatedBy: data.updated_by,
        updatedAt: data.updated_at,
      };
    }
  }
  const state = await readLocalState();
  return state.settings;
}

export async function saveForgeSettings(partial: Partial<ForgeSettings>, actorEmail: string): Promise<ForgeSettings> {
  const current = await getForgeSettings();
  const updated: ForgeSettings = {
    ...current,
    ...partial,
    id: "default",
    updatedBy: actorEmail,
    updatedAt: new Date().toISOString(),
  };

  if (await isForgeSchemaReady()) {
    const admin = createAdminClient() as any;
    const baseRow = {
      id: "default",
      max_concurrent_jobs: updated.maxConcurrentJobs,
      retry_limit: updated.retryLimit,
      job_timeout_seconds: updated.jobTimeoutSeconds,
      default_generation_instructions: updated.defaultGenerationInstructions,
      default_qa_requirements: {
        ...updated.defaultQaRequirements,
        generationEnabled: updated.generationEnabled,
      },
      stitch_mcp_endpoint: updated.stitchMcpEndpoint,
      antigravity_worker_mode: updated.antigravityWorkerMode,
      updated_by: actorEmail,
      updated_at: updated.updatedAt,
    };

    const { error } = await admin
      .from("forge_settings")
      .upsert({ ...baseRow, generation_enabled: updated.generationEnabled }, { onConflict: "id" });

    if (error && /generation_enabled/i.test(error.message)) {
      await admin.from("forge_settings").upsert(baseRow, { onConflict: "id" });
    }
    return updated;
  }

  const state = await readLocalState();
  state.settings = updated;
  await writeLocalState(state);
  return updated;
}

export async function appendForgeAuditLog(entry: Omit<ForgeAuditLog, "id" | "createdAt">): Promise<void> {
  const record: ForgeAuditLog = {
    id: crypto.randomUUID(),
    ...entry,
    createdAt: new Date().toISOString(),
  };
  if (await isForgeSchemaReady()) {
    const admin = createAdminClient() as any;
    await admin.from("forge_audit_logs").insert({
      id: record.id,
      actor_email: record.actorEmail,
      action: record.action,
      target_type: record.targetType,
      target_id: record.targetId,
      details: record.details,
    });
    return;
  }
  const state = await readLocalState();
  state.auditLogs.unshift(record);
  state.auditLogs = state.auditLogs.slice(0, 250);
  await writeLocalState(state);
}

export async function listForgeAuditLogs(limit: number = 40): Promise<ForgeAuditLog[]> {
  if (await isForgeSchemaReady()) {
    const admin = createAdminClient() as any;
    const { data } = await admin
      .from("forge_audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    return (data || []).map((l: any) => ({
      id: l.id,
      actorEmail: l.actor_email,
      action: l.action,
      targetType: l.target_type,
      targetId: l.target_id,
      details: l.details || {},
      createdAt: l.created_at,
    }));
  }
  const state = await readLocalState();
  return state.auditLogs.slice(0, limit);
}

export async function getForgeOverviewMetrics(): Promise<ForgeOverviewMetrics> {
  const [demos, jobs, logs] = await Promise.all([
    listForgeDemos(),
    listForgeJobs(),
    listForgeAuditLogs(12),
  ]);

  const completedJobs = jobs.filter((j) => j.status === "completed");
  const failedJobs = jobs.filter((j) => j.status === "failed");
  const terminalCount = completedJobs.length + failedJobs.length;

  const durations = completedJobs.map((j) => j.durationMs).filter((d): d is number => typeof d === "number" && d > 0);
  const avgDurationMs =
    durations.length >= 1 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : null;

  return {
    totalRegisteredDemos: demos.length,
    publishedDemos: demos.filter((d) => d.publishingStatus === "published").length,
    draftDemos: demos.filter((d) => d.generationStatus === "draft").length,
    generatingDemos: demos.filter((d) =>
      ["queued", "designing", "implementing", "testing"].includes(d.generationStatus)
    ).length,
    failedJobs: failedJobs.length,
    pendingApprovals: demos.filter((d) =>
      ["ready_for_review", "approved"].includes(d.generationStatus) && d.publishingStatus !== "published"
    ).length,
    recentlyCompletedJobs: completedJobs.slice(0, 6),
    recentActivity: logs,
    generationSuccessRate: terminalCount > 0 ? Math.round((completedJobs.length / terminalCount) * 100) : null,
    averageDurationMs: avgDurationMs,
  };
}

// Isolated Demo Sandbox Database State (Section 4)
export async function getSandboxState(demoSlug: string, sessionKey: string = "default"): Promise<Record<string, any> | null> {
  if (await isForgeSchemaReady()) {
    const admin = createAdminClient() as any;
    const { data } = await admin
      .from("forge_demo_sandboxes")
      .select("state_data")
      .eq("demo_slug", demoSlug)
      .eq("session_key", sessionKey)
      .maybeSingle();
    return data?.state_data || null;
  }
  const state = await readLocalState();
  return state.sandboxes[`${demoSlug}:${sessionKey}`] || null;
}

export async function setSandboxState(
  demoSlug: string,
  stateData: Record<string, any>,
  sessionKey: string = "default"
): Promise<void> {
  if (await isForgeSchemaReady()) {
    const admin = createAdminClient() as any;
    await admin.from("forge_demo_sandboxes").upsert(
      {
        demo_slug: demoSlug,
        session_key: sessionKey,
        state_data: stateData,
        is_seed_snapshot: false,
      },
      { onConflict: "demo_slug,session_key" }
    );
    return;
  }
  const state = await readLocalState();
  state.sandboxes[`${demoSlug}:${sessionKey}`] = stateData;
  await writeLocalState(state);
}

export async function resetSandboxState(demoSlug: string, sessionKey: string = "default"): Promise<Record<string, any>> {
  const demo = await getForgeDemoById(demoSlug);
  const seed = demo?.seedData || {};
  await setSandboxState(demoSlug, seed, sessionKey);
  return seed;
}
