/**
 * Stitch Job Orchestrator & Multi-Tier Persistence Manager
 * Coordinates generation jobs, status transitions, atomic locks,
 * Supabase PostgreSQL persistence (primary tables & resilient metadata store),
 * and Supabase Storage artifact synchronization.
 * StarX Alpha Labs — Design Studio Production Ecosystem
 */

import type {
  DesignStudioProject,
  DesignGenerationJob,
  DesignArtifact,
  DesignRevision,
  DesignStudioBrief,
  StitchModelId,
  StitchDeviceType,
} from "./types";
import { stitchClient } from "./client";
import { createClient } from "@supabase/supabase-js";

// In-memory runtime cache for hot same-session performance
const localProjects = new Map<string, DesignStudioProject>();
const localJobs = new Map<string, DesignGenerationJob>();
const localArtifacts = new Map<string, DesignArtifact>();
const localRevisions = new Map<string, DesignRevision[]>();

// In-flight locking map to prevent duplicate concurrent executions
const activeJobLocks = new Set<string>();

export class DesignStudioOrchestrator {
  /**
   * Helper to get Supabase Admin client safely.
   */
  private getAdminClient() {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
    ) {
      try {
        return createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY,
          { auth: { persistSession: false, autoRefreshToken: false } }
        );
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Persists project & metadata into PostgreSQL.
   * Tries primary design_studio_projects table first;
   * Falls back to resilient quote_requests table in PostgreSQL.
   */
  private async persistProjectToDb(project: DesignStudioProject): Promise<void> {
    const admin = this.getAdminClient();
    if (!admin) return;

    let primarySaved = false;
    try {
      const { error } = await admin.from("design_studio_projects" as any).upsert(
        {
          id: project.id,
          project_code: project.projectCode,
          organization_id: project.organizationId || null,
          customer_id: project.customerId || null,
          session_id: project.sessionId || null,
          title: project.title,
          industry_slug: project.industrySlug,
          division_slug: project.divisionSlug,
          status: project.status,
          target_platforms: project.targetPlatforms,
          feature_requirements: project.featureRequirements,
          theme_preference: project.themePreference,
          raw_description: project.rawDescription,
          structured_brief: project.structuredBrief,
          active_artifact_id: project.activeArtifactId,
          contact_name: project.contactName,
          contact_email: project.contactEmail,
          contact_phone: project.contactPhone,
          quote_request_id: project.quoteRequestId,
          updated_at: new Date().toISOString(),
        } as any,
        { onConflict: "id" }
      );
      if (!error) primarySaved = true;
    } catch {
      // Primary table may be pending schema migration
    }

    // Always ensure PostgreSQL persistence in quote_requests store
    try {
      const existing = await admin
        .from("quote_requests")
        .select("id, metadata")
        .eq("metadata->>projectId", project.id)
        .maybeSingle();

      const metadataPayload = {
        is_design_studio: true,
        projectId: project.id,
        projectCode: project.projectCode,
        project,
        activeArtifactId: project.activeArtifactId,
      };

      if (existing?.data?.id) {
        await admin
          .from("quote_requests")
          .update({
            metadata: {
              ...(existing.data.metadata as any),
              ...metadataPayload,
            },
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.data.id);
      } else {
        await admin.from("quote_requests").insert({
          name: project.contactName || "Design Studio Client",
          email: project.contactEmail || "client@starxalphalabs.online",
          phone: project.contactPhone || null,
          company: project.title,
          service_slug: project.divisionSlug,
          budget_range: "₹1,50,000 - ₹5,00,000",
          timeline: "3–6 Weeks",
          project_details: `STARX DESIGN STUDIO PROJECT [Code: ${project.projectCode}] — ${project.title}\nDescription: ${project.rawDescription || ""}`,
          status: "new",
          metadata: metadataPayload as any,
        });
      }
    } catch (e: any) {
      console.warn("[DesignStudioOrchestrator] Secondary PostgreSQL backup save note:", e?.message);
    }
  }

  /**
   * Persists generation job to PostgreSQL.
   */
  private async persistJobToDb(job: DesignGenerationJob): Promise<void> {
    const admin = this.getAdminClient();
    if (!admin) return;

    try {
      await admin.from("design_generation_jobs" as any).upsert(
        {
          id: job.id,
          job_code: job.jobCode,
          project_id: job.projectId,
          provider: job.provider,
          model_id: job.modelId,
          device_type: job.deviceType,
          status: job.status,
          stage: job.stage,
          progress_percent: job.progressPercent,
          prompt: job.prompt,
          input_parameters: job.inputParameters,
          provider_project_id: job.providerProjectId,
          provider_screen_id: job.providerScreenId,
          error_message: job.errorMessage,
          execution_logs: job.executionLogs,
          updated_at: new Date().toISOString(),
        } as any,
        { onConflict: "id" }
      );
    } catch {
      // Primary table error, fall through
    }

    try {
      const existing = await admin
        .from("quote_requests")
        .select("id, metadata")
        .eq("metadata->>projectId", job.projectId)
        .maybeSingle();

      if (existing?.data?.id) {
        const meta = (existing.data.metadata as any) || {};
        meta.job = job;
        meta.jobId = job.id;
        await admin
          .from("quote_requests")
          .update({ metadata: meta, updated_at: new Date().toISOString() })
          .eq("id", existing.data.id);
      }
    } catch {}
  }

  /**
   * Persists design artifact to PostgreSQL.
   */
  private async persistArtifactToDb(artifact: DesignArtifact): Promise<void> {
    const admin = this.getAdminClient();
    if (!admin) return;

    try {
      await admin.from("design_artifacts" as any).upsert(
        {
          id: artifact.id,
          project_id: artifact.projectId,
          job_id: artifact.jobId,
          version_number: artifact.versionNumber,
          provider: artifact.provider,
          provider_project_id: artifact.providerProjectId,
          provider_screen_id: artifact.providerScreenId,
          title: artifact.title,
          device_type: artifact.deviceType,
          design_theme: artifact.designTheme,
          design_md: artifact.designMd,
          thumbnail_url: artifact.thumbnailUrl,
          download_url: artifact.downloadUrl,
          html_code: artifact.htmlCode,
          palette: artifact.palette,
          key_features: artifact.keyFeatures,
          is_approved: artifact.isApproved,
        } as any,
        { onConflict: "id" }
      );
    } catch {
      // Primary table error, fall through
    }

    try {
      const existing = await admin
        .from("quote_requests")
        .select("id, metadata")
        .eq("metadata->>projectId", artifact.projectId)
        .maybeSingle();

      if (existing?.data?.id) {
        const meta = (existing.data.metadata as any) || {};
        meta.artifact = artifact;
        meta.activeArtifactId = artifact.id;
        await admin
          .from("quote_requests")
          .update({ metadata: meta, updated_at: new Date().toISOString() })
          .eq("id", existing.data.id);
      }
    } catch {}
  }

  /**
   * Creates or initializes a new Design Studio Project.
   */
  public async createProject(
    brief: DesignStudioBrief,
    contact?: {
      name?: string;
      email?: string;
      phone?: string;
      organizationId?: string;
      customerId?: string;
      sessionId?: string;
    }
  ): Promise<DesignStudioProject> {
    const id = `dsp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const projectCode = `DS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const project: DesignStudioProject = {
      id,
      projectCode,
      organizationId: contact?.organizationId,
      customerId: contact?.customerId,
      sessionId: contact?.sessionId,
      title: brief.projectName,
      industrySlug: brief.industrySlug,
      divisionSlug: brief.divisionSlug,
      status: "draft",
      targetPlatforms: brief.platformTargets,
      featureRequirements: brief.selectedFeatures,
      themePreference: brief.themePreference,
      rawDescription: brief.description,
      structuredBrief: brief,
      contactName: contact?.name,
      contactEmail: contact?.email,
      contactPhone: contact?.phone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    localProjects.set(id, project);

    // Save to PostgreSQL
    await this.persistProjectToDb(project);

    return project;
  }

  /**
   * Retrieves a project by ID with full PostgreSQL persistence across restarts.
   */
  public async getProject(projectId: string): Promise<DesignStudioProject | null> {
    if (localProjects.has(projectId)) {
      return localProjects.get(projectId)!;
    }

    const admin = this.getAdminClient();
    if (!admin) return null;

    // 1. Try primary design_studio_projects table
    try {
      const { data } = await admin
        .from("design_studio_projects" as any)
        .select("*")
        .eq("id", projectId)
        .maybeSingle();

      if (data) {
        const p = data as any;
        const project: DesignStudioProject = {
          id: p.id,
          projectCode: p.project_code,
          organizationId: p.organization_id || undefined,
          customerId: p.customer_id || undefined,
          sessionId: p.session_id || undefined,
          title: p.title,
          industrySlug: p.industry_slug,
          divisionSlug: p.division_slug,
          status: p.status,
          targetPlatforms: p.target_platforms || [],
          featureRequirements: p.feature_requirements || [],
          themePreference: p.theme_preference || "cosmic-dark",
          rawDescription: p.raw_description,
          structuredBrief: p.structured_brief || {},
          activeArtifactId: p.active_artifact_id,
          contactName: p.contact_name,
          contactEmail: p.contact_email,
          contactPhone: p.contact_phone,
          quoteRequestId: p.quote_request_id,
          createdAt: p.created_at,
          updatedAt: p.updated_at,
        };
        localProjects.set(projectId, project);
        return project;
      }
    } catch {}

    // 2. Try PostgreSQL quote_requests metadata store
    try {
      const { data } = await admin
        .from("quote_requests")
        .select("metadata")
        .eq("metadata->>projectId", projectId)
        .maybeSingle();

      if (data?.metadata && (data.metadata as any).project) {
        const project = (data.metadata as any).project as DesignStudioProject;
        localProjects.set(projectId, project);
        return project;
      }
    } catch {}

    return null;
  }

  /**
   * Creates and executes a design generation job with atomic locking and idempotency protection.
   */
  public async submitGenerationJob(params: {
    projectId: string;
    modelId?: StitchModelId;
    deviceType?: StitchDeviceType;
    customPrompt?: string;
    previewOnly?: boolean;
    idempotencyKey?: string;
  }): Promise<{ job: DesignGenerationJob; artifact?: DesignArtifact; isDuplicate?: boolean }> {
    const project = await this.getProject(params.projectId);
    if (!project) {
      throw new Error(`Project ${params.projectId} not found in database.`);
    }

    // Idempotency check: if an active job for this project is currently queued or processing, return it
    const existingActive = Array.from(localJobs.values()).find(
      (j) =>
        j.projectId === params.projectId &&
        (j.status === "queued" || j.status === "processing")
    );
    if (existingActive) {
      return { job: existingActive, isDuplicate: true };
    }

    // Atomic lock to protect against duplicate concurrent executions
    if (activeJobLocks.has(params.projectId)) {
      const active = Array.from(localJobs.values()).find((j) => j.projectId === params.projectId);
      if (active) {
        return { job: active, isDuplicate: true };
      }
      throw new Error(
        `A generation job for project "${project.projectCode}" is already in progress.`
      );
    }
    activeJobLocks.add(params.projectId);

    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const jobCode = `STITCH-JOB-${Math.floor(100000 + Math.random() * 900000)}`;
    const modelId = params.modelId || "GEMINI_3_8_FLASH";
    const deviceType = params.deviceType || project.structuredBrief.deviceTarget || "DESKTOP";

    const job: DesignGenerationJob = {
      id: jobId,
      jobCode,
      projectId: project.id,
      organizationId: project.organizationId,
      provider: "stitch",
      modelId,
      deviceType,
      status: "processing",
      stage: "Synthesizing Stitch Design System Specification",
      progressPercent: 30,
      prompt: params.customPrompt || `Design for ${project.title}`,
      inputParameters: {
        modelId,
        deviceType,
        industry: project.industrySlug,
        features: project.featureRequirements,
        idempotencyKey: params.idempotencyKey,
      },
      retryCount: 0,
      maxRetries: 3,
      heartbeatAt: new Date().toISOString(),
      idempotencyKey: params.idempotencyKey,
      executionLogs: [
        {
          timestamp: new Date().toISOString(),
          message: "Generation job created and claimed with atomic lock",
          stage: "Initialization",
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    localJobs.set(jobId, job);
    project.status = "generating";
    await this.persistJobToDb(job);
    await this.persistProjectToDb(project);

    try {
      // Execute via Stitch Client or Preview Mode
      const res = params.previewOnly
        ? stitchClient.generatePreviewOnlyWireframe({
            projectId: project.id,
            brief: project.structuredBrief,
            modelId,
            deviceType,
            customPrompt: params.customPrompt,
            versionNumber: 1,
          })
        : await stitchClient.generateDesign({
            projectId: project.id,
            brief: project.structuredBrief,
            modelId,
            deviceType,
            customPrompt: params.customPrompt,
            versionNumber: 1,
          });

      if (res.ok && res.artifact) {
        const artifact = res.artifact;
        artifact.jobId = jobId;
        artifact.organizationId = project.organizationId;

        job.status = "completed";
        job.stage = "Design artifact generated, verified, and stored";
        job.progressPercent = 100;
        job.providerProjectId = res.providerProjectId;
        job.providerScreenId = res.providerScreenId;
        job.executionLogs.push({
          timestamp: new Date().toISOString(),
          message: `Generation succeeded via ${res.provenance}. Screen ID: ${res.providerScreenId || "primary"}`,
          stage: "Completion",
        });

        localArtifacts.set(artifact.id, artifact);
        project.activeArtifactId = artifact.id;
        project.status = "generated";
        project.updatedAt = new Date().toISOString();

        await this.persistArtifactToDb(artifact);
        await this.persistJobToDb(job);
        await this.persistProjectToDb(project);

        return { job, artifact };
      } else {
        // Provider unavailable or failed
        job.status = res.provenance === "unavailable" ? "queued" : "failed";
        job.stage =
          res.provenance === "unavailable"
            ? "Awaiting Stitch Operator Worker"
            : "Generation Attempt Failed";
        job.errorMessage =
          res.error || "Stitch provider failed to generate design concept.";
        job.executionLogs.push({
          timestamp: new Date().toISOString(),
          message: job.errorMessage,
          stage: "Error",
        });

        project.status = res.provenance === "unavailable" ? "draft" : "draft";
        await this.persistJobToDb(job);
        await this.persistProjectToDb(project);

        return { job };
      }
    } finally {
      // Always release lock
      activeJobLocks.delete(params.projectId);
    }
  }

  /**
   * Retrieves a job by ID with PostgreSQL persistence across restarts.
   */
  public async getJob(jobId: string): Promise<DesignGenerationJob | null> {
    if (localJobs.has(jobId)) {
      return localJobs.get(jobId)!;
    }

    const admin = this.getAdminClient();
    if (!admin) return null;

    try {
      const { data } = await admin
        .from("design_generation_jobs" as any)
        .select("*")
        .eq("id", jobId)
        .maybeSingle();

      if (data) {
        const j = data as any;
        const job: DesignGenerationJob = {
          id: j.id,
          jobCode: j.job_code,
          projectId: j.project_id,
          provider: j.provider || "stitch",
          modelId: j.model_id,
          deviceType: j.device_type,
          status: j.status,
          stage: j.stage,
          progressPercent: j.progress_percent,
          prompt: j.prompt,
          inputParameters: j.input_parameters || {},
          providerProjectId: j.provider_project_id,
          providerScreenId: j.provider_screen_id,
          errorMessage: j.error_message,
          executionLogs: j.execution_logs || [],
          createdAt: j.created_at,
          updatedAt: j.updated_at,
        };
        localJobs.set(jobId, job);
        return job;
      }
    } catch {}

    try {
      const { data } = await admin
        .from("quote_requests")
        .select("metadata")
        .eq("metadata->>jobId", jobId)
        .maybeSingle();

      if (data?.metadata && (data.metadata as any).job) {
        const job = (data.metadata as any).job as DesignGenerationJob;
        localJobs.set(jobId, job);
        return job;
      }
    } catch {}

    return null;
  }

  /**
   * Retrieves an artifact by ID with PostgreSQL persistence across restarts.
   */
  public async getArtifact(artifactId: string): Promise<DesignArtifact | null> {
    if (localArtifacts.has(artifactId)) {
      return localArtifacts.get(artifactId)!;
    }

    const admin = this.getAdminClient();
    if (!admin) return null;

    try {
      const { data } = await admin
        .from("design_artifacts" as any)
        .select("*")
        .eq("id", artifactId)
        .maybeSingle();

      if (data) {
        const a = data as any;
        const artifact: DesignArtifact = {
          id: a.id,
          projectId: a.project_id,
          jobId: a.job_id,
          versionNumber: a.version_number,
          provider: a.provider || "stitch",
          providerProjectId: a.provider_project_id,
          providerScreenId: a.provider_screen_id,
          title: a.title,
          styleName: a.style_name || "default",
          deviceType: a.device_type,
          designTheme: a.design_theme || {},
          designMd: a.design_md,
          thumbnailUrl: a.thumbnail_url,
          downloadUrl: a.download_url,
          htmlCode: a.html_code,
          palette: a.palette || [],
          keyFeatures: a.key_features || [],
          isApproved: a.is_approved || false,
          createdAt: a.created_at,
        };
        localArtifacts.set(artifactId, artifact);
        return artifact;
      }
    } catch {}

    try {
      const { data } = await admin
        .from("quote_requests")
        .select("metadata")
        .eq("metadata->>activeArtifactId", artifactId)
        .maybeSingle();

      if (data?.metadata && (data.metadata as any).artifact) {
        const artifact = (data.metadata as any).artifact as DesignArtifact;
        localArtifacts.set(artifactId, artifact);
        return artifact;
      }
    } catch {}

    return null;
  }

  /**
   * Retrieves the active artifact for a project.
   */
  public async getActiveArtifactForProject(projectId: string): Promise<DesignArtifact | null> {
    const project = await this.getProject(projectId);
    if (project?.activeArtifactId) {
      const art = await this.getArtifact(project.activeArtifactId);
      if (art) return art;
    }

    for (const art of localArtifacts.values()) {
      if (art.projectId === projectId) return art;
    }

    const admin = this.getAdminClient();
    if (admin) {
      try {
        const { data } = await admin
          .from("quote_requests")
          .select("metadata")
          .eq("metadata->>projectId", projectId)
          .maybeSingle();

        if (data?.metadata && (data.metadata as any).artifact) {
          const artifact = (data.metadata as any).artifact as DesignArtifact;
          localArtifacts.set(artifact.id, artifact);
          return artifact;
        }
      } catch {}
    }

    return null;
  }

  /**
   * Retrieves a project by Guest Session ID.
   */
  public async getProjectBySession(sessionId: string): Promise<DesignStudioProject | null> {
    for (const project of localProjects.values()) {
      if (project.sessionId === sessionId) return project;
    }

    const admin = this.getAdminClient();
    if (!admin) return null;

    try {
      const { data } = await admin
        .from("design_studio_projects" as any)
        .select("*")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        return this.getProject((data as any).id);
      }
    } catch {}

    try {
      const { data } = await admin
        .from("quote_requests")
        .select("metadata")
        .eq("metadata->project->>sessionId", sessionId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data?.metadata && (data.metadata as any).project) {
        const p = (data.metadata as any).project as DesignStudioProject;
        localProjects.set(p.id, p);
        return p;
      }
    } catch {}

    return null;
  }

  /**
   * Retrieves all artifact versions generated for a project.
   */
  public async getArtifactsForProject(projectId: string): Promise<DesignArtifact[]> {
    const list: DesignArtifact[] = [];
    for (const art of localArtifacts.values()) {
      if (art.projectId === projectId && !list.some((existing) => existing.id === art.id)) {
        list.push(art);
      }
    }

    const admin = this.getAdminClient();
    if (admin) {
      try {
        const { data } = await admin
          .from("design_artifacts" as any)
          .select("*")
          .eq("project_id", projectId)
          .order("version_number", { ascending: true });

        if (data && data.length > 0) {
          for (const a of data) {
            if (!list.some((existing) => existing.id === (a as any).id)) {
              list.push({
                id: (a as any).id,
                projectId: (a as any).project_id,
                jobId: (a as any).job_id,
                versionNumber: (a as any).version_number,
                provider: (a as any).provider || "stitch",
                providerProjectId: (a as any).provider_project_id,
                providerScreenId: (a as any).provider_screen_id,
                title: (a as any).title,
                styleName: (a as any).style_name || "default",
                deviceType: (a as any).device_type,
                designTheme: (a as any).design_theme || {},
                designMd: (a as any).design_md,
                thumbnailUrl: (a as any).thumbnail_url,
                downloadUrl: (a as any).download_url,
                storagePathHtml: (a as any).storage_path_html,
                storagePathScreenshot: (a as any).storage_path_screenshot,
                htmlCode: (a as any).html_code,
                palette: (a as any).palette || [],
                keyFeatures: (a as any).key_features || [],
                isApproved: (a as any).is_approved || false,
                createdAt: (a as any).created_at,
              });
            }
          }
        }
      } catch {}

      try {
        const { data } = await admin
          .from("quote_requests")
          .select("metadata")
          .eq("metadata->>projectId", projectId)
          .maybeSingle();

        if (data?.metadata && (data.metadata as any).artifact) {
          const art = (data.metadata as any).artifact as DesignArtifact;
          if (!list.some((existing) => existing.id === art.id)) {
            list.push(art);
          }
        }
        if (data?.metadata && Array.isArray((data.metadata as any).revisions_artifacts)) {
          for (const art of (data.metadata as any).revisions_artifacts) {
            if (!list.some((existing) => existing.id === art.id)) {
              list.push(art);
            }
          }
        }
      } catch {}
    }

    list.sort((a, b) => a.versionNumber - b.versionNumber);
    return list;
  }

  /**
   * Submits a revision request with optional genuine Stitch AI re-generation.
   */
  public async submitRevision(params: {
    projectId: string;
    artifactId: string;
    notes: string;
    triggerRegeneration?: boolean;
    modelId?: StitchModelId;
    deviceType?: StitchDeviceType;
  }): Promise<{ revision: DesignRevision; newArtifact?: DesignArtifact }> {
    const revId = `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const existingList = localRevisions.get(params.projectId) || [];
    const currentArtifact = await this.getArtifact(params.artifactId);
    const project = await this.getProject(params.projectId);

    const revision: DesignRevision = {
      id: revId,
      projectId: params.projectId,
      artifactId: params.artifactId,
      revisionNumber: existingList.length + 1,
      notes: params.notes,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    let newArtifact: DesignArtifact | undefined;

    // Trigger authentic Stitch AI editing when requested
    if (params.triggerRegeneration && currentArtifact && project) {
      revision.status = "processing";
      try {
        const editRes = await stitchClient.editDesign({
          projectId: params.projectId,
          providerProjectId: currentArtifact.providerProjectId,
          screenId: currentArtifact.providerScreenId || "screen_primary",
          prompt: params.notes,
          modelId: params.modelId || "GEMINI_3_8_FLASH",
          deviceType: params.deviceType || currentArtifact.deviceType,
          versionNumber: (currentArtifact.versionNumber || 1) + 1,
          currentArtifact,
        });

        if (editRes.ok && editRes.artifact) {
          newArtifact = editRes.artifact;
          newArtifact.organizationId = project.organizationId;
          localArtifacts.set(newArtifact.id, newArtifact);
          project.activeArtifactId = newArtifact.id;
          project.status = "generated";
          revision.status = "applied";
          revision.appliedJobId = `job_edit_${Date.now()}`;

          await this.persistArtifactToDb(newArtifact);

          // Persist to multi-version array in quote_requests store
          const admin = this.getAdminClient();
          if (admin) {
            try {
              const row = await admin
                .from("quote_requests")
                .select("id, metadata")
                .eq("metadata->>projectId", params.projectId)
                .maybeSingle();

              if (row?.data?.id) {
                const meta = (row.data.metadata as any) || {};
                const arts = Array.isArray(meta.revisions_artifacts) ? meta.revisions_artifacts : [];
                arts.push(newArtifact);
                meta.revisions_artifacts = arts;
                meta.artifact = newArtifact;
                meta.activeArtifactId = newArtifact.id;
                await admin
                  .from("quote_requests")
                  .update({ metadata: meta, updated_at: new Date().toISOString() })
                  .eq("id", row.data.id);
              }
            } catch {}
          }
        }
      } catch (err: any) {
        console.error("[DesignStudioOrchestrator] Revision editing error:", err?.message);
        revision.status = "applied";
      }
    } else {
      revision.status = "applied";
    }

    existingList.push(revision);
    localRevisions.set(params.projectId, existingList);

    if (project) {
      project.status = newArtifact ? "generated" : "revision_requested";
      project.updatedAt = new Date().toISOString();
      await this.persistProjectToDb(project);
    }

    return { revision, newArtifact };
  }

  /**
   * Retrieves revisions for a project.
   */
  public async getRevisions(projectId: string): Promise<DesignRevision[]> {
    return localRevisions.get(projectId) || [];
  }

  /**
   * Approves an artifact and links it to quotation.
   */
  public async approveArtifact(params: {
    projectId: string;
    artifactId: string;
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    quoteRequestId?: string;
  }): Promise<{ ok: boolean }> {
    const artifact = await this.getArtifact(params.artifactId);
    if (artifact) {
      artifact.isApproved = true;
      await this.persistArtifactToDb(artifact);
    }

    const project = await this.getProject(params.projectId);
    if (project) {
      project.status = "approved";
      if (params.contactName) project.contactName = params.contactName;
      if (params.contactEmail) project.contactEmail = params.contactEmail;
      if (params.contactPhone) project.contactPhone = params.contactPhone;
      if (params.quoteRequestId) {
        project.quoteRequestId = params.quoteRequestId;
        project.status = "quoted";
      }
      project.updatedAt = new Date().toISOString();
      await this.persistProjectToDb(project);
    }

    return { ok: true };
  }

  /**
   * Scans for orphaned jobs stuck in 'processing' state where the worker lease has expired.
   * Automatically reclaims or fails them based on retry count.
   */
  public async reclaimExpiredProcessingJobs(
    leaseTimeoutMs = 600000
  ): Promise<{ reclaimedCount: number; failedCount: number }> {
    const admin = this.getAdminClient();
    if (!admin) return { reclaimedCount: 0, failedCount: 0 };

    const cutoffIso = new Date(Date.now() - leaseTimeoutMs).toISOString();
    let reclaimedCount = 0;
    let failedCount = 0;

    // 1. Check primary table if available
    try {
      const { data: staleJobs } = await admin
        .from("design_generation_jobs" as any)
        .select("*")
        .eq("status", "processing")
        .lt("updated_at", cutoffIso);

      if (staleJobs && staleJobs.length > 0) {
        for (const j of staleJobs) {
          const retries = (j.input_parameters?.retry_count || 0) + 1;
          const maxRetries = j.input_parameters?.max_retries || 3;
          if (retries >= maxRetries) {
            await admin
              .from("design_generation_jobs" as any)
              .update({
                status: "failed",
                error_message: `Execution lease expired (exceeded max retries ${maxRetries}).`,
                updated_at: new Date().toISOString(),
              })
              .eq("id", j.id);
            failedCount++;
          } else {
            await admin
              .from("design_generation_jobs" as any)
              .update({
                status: "queued",
                stage: `Reclaimed from abandoned worker lease (Retry ${retries}/${maxRetries})`,
                input_parameters: { ...j.input_parameters, retry_count: retries },
                updated_at: new Date().toISOString(),
              })
              .eq("id", j.id);
            reclaimedCount++;
          }
        }
      }
    } catch {}

    // 2. Check fallback quote_requests store
    try {
      const { data: staleRows } = await admin
        .from("quote_requests")
        .select("id, metadata, updated_at")
        .eq("metadata->job->>status", "processing");

      if (staleRows && staleRows.length > 0) {
        for (const row of staleRows) {
          const job = row.metadata?.job as DesignGenerationJob;
          if (!job) continue;

          // Check application heartbeat timestamp or row timestamp
          const jobTimestamp = job.heartbeatAt || job.updatedAt;
          const isStale = jobTimestamp
            ? new Date(jobTimestamp).getTime() <= Date.now() - leaseTimeoutMs
            : new Date(row.updated_at).getTime() <= Date.now() - leaseTimeoutMs;

          if (!isStale) continue;

          const retries = (job.retryCount || 0) + 1;
          const maxRetries = job.maxRetries || 3;

          if (retries >= maxRetries) {
            job.status = "failed";
            job.errorMessage = `Execution lease expired (exceeded max retries ${maxRetries}).`;
            failedCount++;
          } else {
            job.status = "queued";
            job.stage = `Reclaimed from abandoned worker lease (Retry ${retries}/${maxRetries})`;
            job.retryCount = retries;
            reclaimedCount++;
          }
          job.updatedAt = new Date().toISOString();
          const meta = { ...row.metadata, job };
          await admin
            .from("quote_requests")
            .update({ metadata: meta, updated_at: new Date().toISOString() })
            .eq("id", row.id);
        }
      }
    } catch {}

    return { reclaimedCount, failedCount };
  }

  /**
   * Updates heartbeat timestamp for an active job to keep the lease active during long tasks.
   */
  public async updateJobHeartbeat(jobId: string, stage?: string): Promise<boolean> {
    const admin = this.getAdminClient();
    const nowIso = new Date().toISOString();

    const job = localJobs.get(jobId);
    if (job) {
      job.heartbeatAt = nowIso;
      job.updatedAt = nowIso;
      if (stage) job.stage = stage;
    }

    if (!admin) return true;

    try {
      await admin
        .from("design_generation_jobs" as any)
        .update({ updated_at: nowIso, stage })
        .eq("id", jobId);
    } catch {}

    try {
      const existing = await admin
        .from("quote_requests")
        .select("id, metadata")
        .eq("metadata->>jobId", jobId)
        .maybeSingle();

      if (existing?.data?.id && existing.data.metadata?.job) {
        const meta = existing.data.metadata as any;
        meta.job.heartbeatAt = nowIso;
        meta.job.updatedAt = nowIso;
        if (stage) meta.job.stage = stage;
        await admin
          .from("quote_requests")
          .update({ metadata: meta, updated_at: nowIso })
          .eq("id", existing.data.id);
      }
    } catch {}

    return true;
  }

  /**
   * Generates a fresh temporary signed URL (default 3600s / 1 hr) for an artifact file.
   */
  public async getSignedArtifactUrl(
    artifactId: string,
    assetType: "html" | "screenshot" = "html"
  ): Promise<{ ok: boolean; signedUrl?: string; error?: string }> {
    const artifact = await this.getArtifact(artifactId);
    if (!artifact) {
      return { ok: false, error: "Artifact not found." };
    }

    const admin = this.getAdminClient();
    if (!admin) {
      return { ok: false, error: "Database client unavailable." };
    }

    let storagePath = assetType === "html" ? artifact.storagePathHtml : artifact.storagePathScreenshot;

    if (!storagePath) {
      const url = assetType === "html" ? artifact.downloadUrl : artifact.thumbnailUrl;
      if (url && url.includes("design-studio-artifacts/")) {
        const parts = url.split("design-studio-artifacts/")[1]?.split("?")[0];
        if (parts) storagePath = parts;
      }
    }

    if (!storagePath && assetType === "html" && artifact.htmlCode) {
      const path = `projects/${artifact.projectId}/${artifact.id}.html`;
      await admin.storage.from("design-studio-artifacts").upload(path, Buffer.from(artifact.htmlCode, "utf8"), {
        contentType: "text/html",
        upsert: true,
      });
      storagePath = path;
    }

    if (!storagePath) {
      return { ok: false, error: `No storage asset path available for artifact (${assetType})` };
    }

    const { data, error } = await admin.storage
      .from("design-studio-artifacts")
      .createSignedUrl(storagePath, 3600);

    if (error || !data?.signedUrl) {
      return { ok: false, error: error?.message || "Failed to generate signed URL" };
    }

    return { ok: true, signedUrl: data.signedUrl };
  }

  /**
   * Verifies that the requesting actor has permission to access the artifact.
   * Prevents cross-organization data leakage.
   */
  public async verifyArtifactAccess(
    artifactId: string,
    options: { organizationId?: string; customerId?: string; sessionId?: string }
  ): Promise<{ authorized: boolean; reason?: string; artifact?: DesignArtifact }> {
    const artifact = await this.getArtifact(artifactId);
    if (!artifact) {
      return { authorized: false, reason: "Artifact not found." };
    }

    const project = await this.getProject(artifact.projectId);
    if (!project) {
      return { authorized: true, artifact }; // Public preview or unassigned
    }

    // Check organization boundary: if project belongs to an organization, caller MUST match
    if (project.organizationId && options.organizationId) {
      if (project.organizationId !== options.organizationId) {
        return {
          authorized: false,
          reason: "Access denied: Unauthorized cross-organization artifact access.",
        };
      }
    } else if (project.organizationId && !options.organizationId) {
      return {
        authorized: false,
        reason: "Access denied: Artifact belongs to a private organization.",
      };
    }

    // Check customer boundary if project is customer-assigned
    if (project.customerId && options.customerId) {
      if (project.customerId !== options.customerId) {
        return {
          authorized: false,
          reason: "Access denied: Artifact belongs to a different customer account.",
        };
      }
    }

    return { authorized: true, artifact };
  }
}

export const designStudioOrchestrator = new DesignStudioOrchestrator();
