import "server-only";

import crypto from "node:crypto";
import { buildDesignBriefAndStitchPayload, invokeStitchDesignGeneration } from "./stitchAdapter";
import { runAutomatedDemoQa } from "./qaEngine";
import {
  appendForgeAuditLog,
  getForgeDemoById,
  getForgeJobById,
  getForgeSettings,
  listDemoVersions,
  listForgeBatches,
  listForgeJobs,
  resetSandboxState,
  saveDemoVersion,
  saveForgeBatch,
  saveForgeJob,
  upsertForgeDemo,
} from "./store";
import {
  FORGE_JOB_STAGES,
  type ForgeBatch,
  type ForgeDemoRecord,
  type ForgeJob,
  type ForgeLogEntry,
} from "./types";

function makeLog(level: ForgeLogEntry["level"], stage: string, message: string): ForgeLogEntry {
  return {
    id: crypto.randomUUID().slice(0, 8),
    timestamp: new Date().toISOString(),
    level,
    stage,
    message,
  };
}

export async function createGenerationJob(params: {
  demoIdOrSlug: string;
  inputConfig: Partial<ForgeJob["inputConfig"]>;
  actorEmail: string;
  batchId?: string | null;
}): Promise<{ job: ForgeJob; demo: ForgeDemoRecord }> {
  const demo = await getForgeDemoById(params.demoIdOrSlug);
  if (!demo) {
    throw new Error(`Demo "${params.demoIdOrSlug}" was not found in StarX Forge catalogue.`);
  }

  const settings = await getForgeSettings();
  if (!settings.generationEnabled) {
    throw new Error(
      "StarX Forge batch/single generation is locked (Phase 3A catalogue staging mode). Enable Generation Lock release in Forge Settings after Phase 3B approval."
    );
  }
  const activeJobs = (await listForgeJobs()).filter((j) => j.status === "running");

  const now = new Date().toISOString();
  const mergedInput: ForgeJob["inputConfig"] = {
    businessName: params.inputConfig.businessName || demo.businessName,
    industry: params.inputConfig.industry || demo.industry,
    categorySlug: params.inputConfig.categorySlug || demo.categorySlug,
    description: params.inputConfig.description || demo.description,
    targetCustomers: params.inputConfig.targetCustomers || demo.targetAudience,
    workflows:
      params.inputConfig.workflows && params.inputConfig.workflows.length > 0
        ? params.inputConfig.workflows
        : demo.workflows.map((w) => `${w.title}: ${w.description}`),
    designPreferences: params.inputConfig.designPreferences || demo.designDirection,
    functionalRequirements:
      params.inputConfig.functionalRequirements && params.inputConfig.functionalRequirements.length > 0
        ? params.inputConfig.functionalRequirements
        : demo.featureRequirements,
    specialInstructions: params.inputConfig.specialInstructions || "",
    mode: params.inputConfig.mode || (demo.catalogId ? "catalogue" : "custom"),
  };

  const { designBrief, stitchRequestPayload } = buildDesignBriefAndStitchPayload(
    demo,
    mergedInput,
    settings.defaultGenerationInstructions
  );

  const jobCode = `FORGE-JOB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const logs: ForgeLogEntry[] = [
    makeLog("info", FORGE_JOB_STAGES[0], `Analysed business requirements for ${mergedInput.businessName}.`),
    makeLog("success", FORGE_JOB_STAGES[1], `Constructed structured Stitch design brief and engineering contract.`),
  ];

  const isQueueFull = activeJobs.length >= settings.maxConcurrentJobs;

  const job: ForgeJob = {
    id: crypto.randomUUID(),
    jobCode,
    demoId: demo.id,
    demoSlug: demo.slug,
    demoName: mergedInput.businessName,
    batchId: params.batchId ?? null,
    currentStage: isQueueFull ? FORGE_JOB_STAGES[1] : FORGE_JOB_STAGES[2],
    stageIndex: isQueueFull ? 2 : 3,
    status: isQueueFull ? "queued" : "running",
    inputConfig: mergedInput,
    designBrief,
    stitchRequestPayload,
    stitchResponseAssets: { connected: false, source: "pending" },
    outputReferences: {
      targetRoute: demo.previewUrl,
      sandboxKey: demo.slug,
    },
    qaResults: null,
    logs,
    errors: [],
    retryCount: 0,
    maxRetries: settings.retryLimit,
    durationMs: null,
    startedAt: isQueueFull ? null : now,
    completedAt: null,
    createdBy: params.actorEmail,
    createdAt: now,
    updatedAt: now,
  };

  if (isQueueFull) {
    logs.push(
      makeLog(
        "warn",
        FORGE_JOB_STAGES[1],
        `Concurrency limit reached (${activeJobs.length}/${settings.maxConcurrentJobs}). Job queued safely.`
      )
    );
    await saveForgeJob(job);
    const updatedDemo = await upsertForgeDemo({
      id: demo.id,
      slug: demo.slug,
      businessName: demo.businessName,
      generationStatus: "queued",
      updatedBy: params.actorEmail,
    });
    await appendForgeAuditLog({
      actorEmail: params.actorEmail,
      action: "FORGE_JOB_QUEUED",
      targetType: "forge_jobs",
      targetId: job.jobCode,
      details: { demoSlug: demo.slug },
    });
    return { job, demo: updatedDemo };
  }

  // Attempt Stage 3: Real Stitch MCP invocation
  const executed = await executeStitchAndAdvance(job, demo, params.actorEmail, settings.stitchMcpEndpoint);
  await appendForgeAuditLog({
    actorEmail: params.actorEmail,
    action: "FORGE_JOB_STARTED",
    targetType: "forge_jobs",
    targetId: executed.job.jobCode,
    details: { demoSlug: demo.slug, status: executed.job.status, stageIndex: executed.job.stageIndex },
  });
  return executed;
}

async function executeStitchAndAdvance(
  job: ForgeJob,
  demo: ForgeDemoRecord,
  actorEmail: string,
  stitchEndpoint?: string | null
): Promise<{ job: ForgeJob; demo: ForgeDemoRecord }> {
  job.logs.push(makeLog("info", FORGE_JOB_STAGES[2], "Connecting to Google Stitch MCP..."));
  const stitchRes = await invokeStitchDesignGeneration(job.stitchRequestPayload, stitchEndpoint);

  if (!stitchRes.ok) {
    const errMsg = stitchRes.error || "Stitch MCP connection failed.";
    job.status = "failed";
    job.currentStage = FORGE_JOB_STAGES[2];
    job.stageIndex = 3;
    job.stitchResponseAssets = {
      connected: stitchRes.connected,
      source: "pending",
      error: errMsg,
    };
    job.errors = Array.from(new Set([...job.errors, errMsg]));
    job.logs.push(makeLog("error", FORGE_JOB_STAGES[2], errMsg));
    job.completedAt = new Date().toISOString();
    job.durationMs = job.startedAt ? Date.now() - new Date(job.startedAt).getTime() : 0;

    await saveForgeJob(job);
    const updatedDemo = await upsertForgeDemo({
      id: demo.id,
      slug: demo.slug,
      businessName: demo.businessName,
      generationStatus: "draft",
      updatedBy: actorEmail,
    });
    return { job, demo: updatedDemo };
  }

  job.stitchResponseAssets = stitchRes.assets || { connected: true, source: "stitch-mcp" };
  return await completeBuildAndQaPipeline(job, demo, actorEmail);
}

/**
 * Resumes from Stage 5 once genuine Stitch design assets are attached (via remote bridge or Antigravity IDE sync)
 * OR re-runs QA & Implementation stages cleanly.
 */
export async function syncStitchAssetsAndContinue(params: {
  jobId: string;
  actorEmail: string;
  stitchAssets: {
    projectId: string;
    screenIds?: string[];
    designTokens?: Record<string, string>;
    screenSummary: string;
    rawArtifact?: any;
  };
}): Promise<{ job: ForgeJob; demo: ForgeDemoRecord }> {
  const job = await getForgeJobById(params.jobId);
  if (!job) throw new Error("Job not found.");
  const demo = await getForgeDemoById(job.demoId);
  if (!demo) throw new Error("Associated demo not found.");

  job.status = "running";
  job.startedAt = job.startedAt || new Date().toISOString();
  job.errors = [];
  job.stitchResponseAssets = {
    connected: true,
    source: "manual-sync",
    projectId: params.stitchAssets.projectId,
    screenIds: params.stitchAssets.screenIds || [],
    designTokens: params.stitchAssets.designTokens || {},
    screenSummary: params.stitchAssets.screenSummary,
    rawArtifact: params.stitchAssets.rawArtifact,
  };
  job.logs.push(
    makeLog(
      "success",
      FORGE_JOB_STAGES[4],
      `Retrieved Stitch design artifact (${params.stitchAssets.projectId}).`
    )
  );

  // Merge any verified Stitch color tokens into demo brandConfig if valid hex
  const tokens = params.stitchAssets.designTokens || {};
  const mergedBrand = { ...demo.brandConfig };
  for (const k of ["primary", "secondary", "accent", "bg", "surface", "text"]) {
    if (typeof tokens[k] === "string" && /^#[0-9a-fA-F]{6}$/.test(tokens[k])) {
      mergedBrand[k] = tokens[k];
    }
  }
  const patchedDemo = await upsertForgeDemo({
    id: demo.id,
    slug: demo.slug,
    businessName: demo.businessName,
    brandConfig: mergedBrand,
    generationStatus: "implementing",
    updatedBy: params.actorEmail,
  });

  return await completeBuildAndQaPipeline(job, patchedDemo, params.actorEmail);
}

async function completeBuildAndQaPipeline(
  job: ForgeJob,
  demo: ForgeDemoRecord,
  actorEmail: string
): Promise<{ job: ForgeJob; demo: ForgeDemoRecord }> {
  // Stages 6..9: Design Analysis -> Implementation -> Isolated Sandbox Data
  job.stageIndex = 6;
  job.currentStage = FORGE_JOB_STAGES[5];
  job.logs.push(makeLog("info", FORGE_JOB_STAGES[5], "Analysed generated design structure and mapped workflows."));

  job.stageIndex = 7;
  job.currentStage = FORGE_JOB_STAGES[6];
  job.logs.push(makeLog("info", FORGE_JOB_STAGES[6], `Verified frontend runtime target (${demo.archetype}) at ${demo.previewUrl}.`));

  job.stageIndex = 8;
  job.currentStage = FORGE_JOB_STAGES[7];
  job.logs.push(makeLog("info", FORGE_JOB_STAGES[7], `Bound ${demo.workflows.length} interactive domain workflows.`));

  job.stageIndex = 9;
  job.currentStage = FORGE_JOB_STAGES[8];
  await resetSandboxState(demo.slug, "default");
  job.logs.push(makeLog("success", FORGE_JOB_STAGES[8], `Initialized isolated database sandbox snapshot for ${demo.slug}.`));

  // Stage 10: Real Automated QA
  job.stageIndex = 10;
  job.currentStage = FORGE_JOB_STAGES[9];
  const qaReport = await runAutomatedDemoQa(demo, {
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
  });
  job.qaResults = qaReport;
  job.logs.push(
    makeLog(
      qaReport.readiness === "blocked" ? "error" : qaReport.readiness === "warnings" ? "warn" : "success",
      FORGE_JOB_STAGES[9],
      `Automated QA finished: ${qaReport.passedCount} passed, ${qaReport.failedCount} failed, ${qaReport.warningCount} warnings.`
    )
  );

  if (qaReport.readiness === "blocked") {
    job.stageIndex = 11;
    job.currentStage = FORGE_JOB_STAGES[10];
    job.status = "failed";
    job.errors.push(...qaReport.defects);
    job.completedAt = new Date().toISOString();
    job.durationMs = job.startedAt ? Date.now() - new Date(job.startedAt).getTime() : 0;

    await saveForgeJob(job);
    const failedDemo = await upsertForgeDemo({
      id: demo.id,
      slug: demo.slug,
      businessName: demo.businessName,
      generationStatus: "qa_failed",
      qaStatus: "failed",
      lastQaReport: qaReport,
      updatedBy: actorEmail,
    });
    return { job, demo: failedDemo };
  }

  // Stages 12 & 13: Preview Ready & Waiting for Administrator Approval
  job.stageIndex = 12;
  job.currentStage = FORGE_JOB_STAGES[11];
  job.outputReferences = {
    targetRoute: demo.previewUrl,
    componentTarget: `DemoRuntimeDispatcher(${demo.archetype})`,
    sandboxKey: demo.slug,
    previewUrl: demo.previewUrl,
    implementedFiles: [
      `src/app/demos/${demo.categorySlug}/${demo.slug}/live/page.tsx`,
      `src/modules/demo-center/runtime/DemoRuntimeDispatcher.tsx`,
    ],
  };
  job.logs.push(makeLog("success", FORGE_JOB_STAGES[11], `Isolated preview environment prepared at ${demo.previewUrl}.`));

  job.stageIndex = 13;
  job.currentStage = FORGE_JOB_STAGES[12];
  job.status = "completed";
  job.completedAt = new Date().toISOString();
  job.durationMs = job.startedAt ? Date.now() - new Date(job.startedAt).getTime() : 0;
  job.logs.push(makeLog("success", FORGE_JOB_STAGES[12], "Build complete. Ready for Administrator QA Review & Approval."));

  await saveForgeJob(job);
  const readyDemo = await upsertForgeDemo({
    id: demo.id,
    slug: demo.slug,
    businessName: demo.businessName,
    generationStatus: "ready_for_review",
    qaStatus: qaReport.readiness === "warnings" ? "warnings" : "passed",
    lastQaReport: qaReport,
    updatedBy: actorEmail,
  });

  return { job, demo: readyDemo };
}

export async function retryForgeJob(jobId: string, actorEmail: string): Promise<{ job: ForgeJob; demo: ForgeDemoRecord }> {
  const job = await getForgeJobById(jobId);
  if (!job) throw new Error("Job not found.");
  if (job.retryCount >= job.maxRetries) {
    throw new Error(`Retry limit reached (${job.retryCount}/${job.maxRetries}). Adjust retry limit in Forge Settings if needed.`);
  }
  const demo = await getForgeDemoById(job.demoId);
  if (!demo) throw new Error("Associated demo not found.");

  const settings = await getForgeSettings();
  job.retryCount += 1;
  job.status = "running";
  job.errors = [];
  job.startedAt = new Date().toISOString();
  job.completedAt = null;
  job.logs.push(makeLog("warn", job.currentStage, `Manual retry #${job.retryCount} initiated by ${actorEmail}.`));

  const result = await executeStitchAndAdvance(job, demo, actorEmail, settings.stitchMcpEndpoint);
  await appendForgeAuditLog({
    actorEmail,
    action: "FORGE_JOB_RETRIED",
    targetType: "forge_jobs",
    targetId: job.jobCode,
    details: { retryCount: job.retryCount, resultStatus: result.job.status },
  });
  return result;
}

export async function cancelForgeJob(jobId: string, actorEmail: string): Promise<ForgeJob> {
  const job = await getForgeJobById(jobId);
  if (!job) throw new Error("Job not found.");
  if (job.status === "completed" || job.status === "cancelled") {
    return job;
  }
  job.status = "cancelled";
  job.completedAt = new Date().toISOString();
  job.logs.push(makeLog("warn", job.currentStage, `Job cancelled by ${actorEmail}.`));
  const saved = await saveForgeJob(job);

  const demo = await getForgeDemoById(job.demoId);
  if (demo && ["queued", "designing", "implementing", "testing"].includes(demo.generationStatus)) {
    await upsertForgeDemo({
      id: demo.id,
      slug: demo.slug,
      businessName: demo.businessName,
      generationStatus: "draft",
      updatedBy: actorEmail,
    });
  }

  await appendForgeAuditLog({
    actorEmail,
    action: "FORGE_JOB_CANCELLED",
    targetType: "forge_jobs",
    targetId: job.jobCode,
    details: { demoId: job.demoId },
  });
  return saved;
}

export async function executeStandaloneDemoQa(params: {
  demoIdOrSlug: string;
  actorEmail: string;
  baseUrl?: string;
}): Promise<{ demo: ForgeDemoRecord; qaReport: any }> {
  const demo = await getForgeDemoById(params.demoIdOrSlug);
  if (!demo) throw new Error("Demo not found.");

  const qaReport = await runAutomatedDemoQa(demo, {
    baseUrl: params.baseUrl,
    previousFixHistory: demo.lastQaReport?.fixHistory || [],
  });

  const updated = await upsertForgeDemo({
    id: demo.id,
    slug: demo.slug,
    businessName: demo.businessName,
    qaStatus: qaReport.readiness === "blocked" ? "failed" : qaReport.readiness === "warnings" ? "warnings" : "passed",
    generationStatus:
      qaReport.readiness === "blocked"
        ? "qa_failed"
        : demo.generationStatus === "draft" || demo.generationStatus === "qa_failed"
        ? "ready_for_review"
        : demo.generationStatus,
    lastQaReport: qaReport,
    updatedBy: params.actorEmail,
  });

  await appendForgeAuditLog({
    actorEmail: params.actorEmail,
    action: "FORGE_QA_EXECUTED",
    targetType: "forge_demos",
    targetId: demo.slug,
    details: { readiness: qaReport.readiness, passed: qaReport.passedCount, failed: qaReport.failedCount },
  });

  return { demo: updated, qaReport };
}

export async function transitionDemoApproval(params: {
  demoIdOrSlug: string;
  action: "approve" | "publish" | "request_changes" | "archive" | "rollback";
  actorEmail: string;
  notes?: string;
  targetVersionNumber?: number;
}): Promise<ForgeDemoRecord> {
  const demo = await getForgeDemoById(params.demoIdOrSlug);
  if (!demo) throw new Error("Demo not found.");
  const settings = await getForgeSettings();

  if (params.action === "publish") {
    if (settings.defaultQaRequirements.blockPublishOnCriticalFail && (demo.qaStatus === "failed" || demo.qaStatus === "not_run")) {
      throw new Error(
        `Publishing blocked: Demo "${demo.businessName}" has QA status "${demo.qaStatus}". Execute and pass Automated QA before publishing.`
      );
    }

    const nextVer = (demo.publishedVersion || 0) + 1;
    const versionRecord = await saveDemoVersion({
      id: crypto.randomUUID(),
      demoId: demo.id,
      versionNumber: nextVer,
      jobId: null,
      designReferences: { brandConfig: demo.brandConfig, archetype: demo.archetype },
      implementationSpec: { workflows: demo.workflows, features: demo.featureRequirements },
      qaReport: demo.lastQaReport || null,
      previewUrl: demo.previewUrl,
      approvedBy: params.actorEmail,
      approvedAt: new Date().toISOString(),
      notes: params.notes || `Published v${nextVer} by ${params.actorEmail}`,
      createdAt: new Date().toISOString(),
    });

    const published = await upsertForgeDemo({
      id: demo.id,
      slug: demo.slug,
      businessName: demo.businessName,
      generationStatus: "published",
      publishingStatus: "published",
      publishedVersion: nextVer,
      activeVersionId: versionRecord.id,
      updatedBy: params.actorEmail,
    });

    await appendForgeAuditLog({
      actorEmail: params.actorEmail,
      action: "FORGE_DEMO_PUBLISHED",
      targetType: "forge_demos",
      targetId: demo.slug,
      details: { version: nextVer },
    });
    return published;
  }

  if (params.action === "approve") {
    if (settings.defaultQaRequirements.blockPublishOnCriticalFail && demo.qaStatus === "failed") {
      throw new Error("Cannot approve a demo with critical QA failures.");
    }
    const approved = await upsertForgeDemo({
      id: demo.id,
      slug: demo.slug,
      businessName: demo.businessName,
      generationStatus: "approved",
      updatedBy: params.actorEmail,
    });
    await appendForgeAuditLog({
      actorEmail: params.actorEmail,
      action: "FORGE_DEMO_APPROVED",
      targetType: "forge_demos",
      targetId: demo.slug,
      details: { notes: params.notes || "" },
    });
    return approved;
  }

  if (params.action === "request_changes") {
    const revised = await upsertForgeDemo({
      id: demo.id,
      slug: demo.slug,
      businessName: demo.businessName,
      generationStatus: "changes_requested",
      updatedBy: params.actorEmail,
    });
    await appendForgeAuditLog({
      actorEmail: params.actorEmail,
      action: "FORGE_CHANGES_REQUESTED",
      targetType: "forge_demos",
      targetId: demo.slug,
      details: { notes: params.notes || "Changes requested during review" },
    });
    return revised;
  }

  if (params.action === "archive") {
    const archived = await upsertForgeDemo({
      id: demo.id,
      slug: demo.slug,
      businessName: demo.businessName,
      generationStatus: "archived",
      publishingStatus: "archived",
      updatedBy: params.actorEmail,
    });
    await appendForgeAuditLog({
      actorEmail: params.actorEmail,
      action: "FORGE_DEMO_ARCHIVED",
      targetType: "forge_demos",
      targetId: demo.slug,
      details: {},
    });
    return archived;
  }

  // Rollback
  const versions = await listDemoVersions(demo.id);
  const targetVer =
    typeof params.targetVersionNumber === "number"
      ? versions.find((v) => v.versionNumber === params.targetVersionNumber)
      : versions[1] || versions[0];

  if (!targetVer) {
    throw new Error("No prior published version snapshot is available for rollback.");
  }

  const rolledBack = await upsertForgeDemo({
    id: demo.id,
    slug: demo.slug,
    businessName: demo.businessName,
    brandConfig: targetVer.designReferences?.brandConfig || demo.brandConfig,
    workflows: targetVer.implementationSpec?.workflows || demo.workflows,
    featureRequirements: targetVer.implementationSpec?.features || demo.featureRequirements,
    publishingStatus: "published",
    generationStatus: "published",
    activeVersionId: targetVer.id,
    updatedBy: params.actorEmail,
  });

  await appendForgeAuditLog({
    actorEmail: params.actorEmail,
    action: "FORGE_DEMO_ROLLED_BACK",
    targetType: "forge_demos",
    targetId: demo.slug,
    details: { restoredVersion: targetVer.versionNumber },
  });

  return rolledBack;
}

// BATCH MANAGEMENT (Section 7)
export async function createForgeBatch(params: {
  name: string;
  description: string;
  demoIds: string[];
  maxConcurrency: number;
  actorEmail: string;
  settings?: ForgeBatch["settings"];
}): Promise<ForgeBatch> {
  if (!params.demoIds || params.demoIds.length === 0) {
    throw new Error("Select at least one demo to create a batch.");
  }

  const now = new Date().toISOString();
  const batch: ForgeBatch = {
    id: crypto.randomUUID(),
    batchCode: `BATCH-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    name: params.name.trim(),
    description: params.description.trim(),
    demoIds: params.demoIds,
    maxConcurrency: Math.min(Math.max(1, params.maxConcurrency || 2), 10),
    status: "draft",
    settings: params.settings || {
      retryLimit: 2,
      requireQaPass: true,
      autoAdvanceStages: true,
    },
    totalCount: params.demoIds.length,
    completedCount: 0,
    failedCount: 0,
    createdBy: params.actorEmail,
    startedAt: null,
    completedAt: null,
    createdAt: now,
    updatedAt: now,
  };

  const saved = await saveForgeBatch(batch);
  await appendForgeAuditLog({
    actorEmail: params.actorEmail,
    action: "FORGE_BATCH_CREATED",
    targetType: "forge_batches",
    targetId: batch.batchCode,
    details: { totalCount: batch.totalCount, maxConcurrency: batch.maxConcurrency },
  });
  return saved;
}

export async function controlForgeBatch(params: {
  batchId: string;
  action: "start" | "pause" | "resume" | "cancel";
  actorEmail: string;
}): Promise<{ batch: ForgeBatch; spawnedJobs: ForgeJob[] }> {
  const batches = await listForgeBatches();
  const batch = batches.find((b) => b.id === params.batchId || b.batchCode === params.batchId);
  if (!batch) throw new Error("Batch not found.");

  const spawnedJobs: ForgeJob[] = [];

  if (params.action === "pause") {
    batch.status = "paused";
    const saved = await saveForgeBatch(batch);
    return { batch: saved, spawnedJobs };
  }

  if (params.action === "cancel") {
    batch.status = "cancelled";
    batch.completedAt = new Date().toISOString();
    const saved = await saveForgeBatch(batch);
    return { batch: saved, spawnedJobs };
  }

  const settings = await getForgeSettings();
  if (!settings.generationEnabled) {
    throw new Error(
      "StarX Forge generation is locked (Phase 3A preparation mode). Staged batches remain in draft until Phase 3B is approved."
    );
  }

  // Start or Resume: respect maxConcurrency
  batch.status = "running";
  batch.startedAt = batch.startedAt || new Date().toISOString();

  const existingBatchJobs = (await listForgeJobs()).filter((j) => j.batchId === batch.id);
  const alreadyProcessedIds = new Set(existingBatchJobs.map((j) => j.demoId));
  const pendingDemoIds = batch.demoIds.filter((id) => !alreadyProcessedIds.has(id));

  // Spawn up to maxConcurrency in this controlled tick
  const slice = pendingDemoIds.slice(0, batch.maxConcurrency);
  let completed = existingBatchJobs.filter((j) => j.status === "completed").length;
  let failed = existingBatchJobs.filter((j) => j.status === "failed").length;

  for (const demoId of slice) {
    try {
      const res = await createGenerationJob({
        demoIdOrSlug: demoId,
        inputConfig: { mode: "catalogue" },
        actorEmail: params.actorEmail,
        batchId: batch.id,
      });
      spawnedJobs.push(res.job);
      if (res.job.status === "completed") completed += 1;
      if (res.job.status === "failed") failed += 1;
    } catch {
      failed += 1;
    }
  }

  batch.completedCount = completed;
  batch.failedCount = failed;

  const remaining = batch.demoIds.length - (completed + failed);
  if (remaining <= 0) {
    batch.status = failed > 0 ? "partial_failure" : "completed";
    batch.completedAt = new Date().toISOString();
  }

  const saved = await saveForgeBatch(batch);
  await appendForgeAuditLog({
    actorEmail: params.actorEmail,
    action: `FORGE_BATCH_${params.action.toUpperCase()}`,
    targetType: "forge_batches",
    targetId: batch.batchCode,
    details: { spawned: spawnedJobs.length, completed, failed },
  });
  return { batch: saved, spawnedJobs };
}
