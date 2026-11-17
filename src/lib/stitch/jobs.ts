/**
 * Stitch Job Orchestrator & Persistence Manager
 * Coordinates generation jobs, status transitions, and Supabase / in-memory persistence
 * StarX Alpha Labs — Design Studio Ecosystem
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
import { createAdminClient } from "@/lib/supabase/admin";

// In-memory runtime cache for seamless offline resilience & local test suites
const localProjects = new Map<string, DesignStudioProject>();
const localJobs = new Map<string, DesignGenerationJob>();
const localArtifacts = new Map<string, DesignArtifact>();
const localRevisions = new Map<string, DesignRevision[]>();

export class DesignStudioOrchestrator {
  /**
   * Creates or initializes a new Design Studio Project.
   */
  public async createProject(
    brief: DesignStudioBrief,
    contact?: { name?: string; email?: string; phone?: string }
  ): Promise<DesignStudioProject> {
    const id = `dsp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const projectCode = `DS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const project: DesignStudioProject = {
      id,
      projectCode,
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

    // Attempt Supabase persistence if available
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
        const admin = createAdminClient();
        await admin.from("design_studio_projects" as any).insert({
          id: project.id,
          project_code: project.projectCode,
          title: project.title,
          industry_slug: project.industrySlug,
          division_slug: project.divisionSlug,
          status: project.status,
          target_platforms: project.targetPlatforms,
          feature_requirements: project.featureRequirements,
          theme_preference: project.themePreference,
          raw_description: project.rawDescription,
          structured_brief: project.structuredBrief,
          contact_name: project.contactName,
          contact_email: project.contactEmail,
          contact_phone: project.contactPhone,
        } as any);
      }
    } catch {
      // Gracefully fall back to local storage
    }

    return project;
  }

  /**
   * Retrieves a project by ID.
   */
  public async getProject(projectId: string): Promise<DesignStudioProject | null> {
    if (localProjects.has(projectId)) {
      return localProjects.get(projectId)!;
    }

    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
        const admin = createAdminClient();
        const { data } = await admin
          .from("design_studio_projects" as any)
          .select("*")
          .eq("id", projectId)
          .single();
        if (data) {
          const p = data as any;
          const project: DesignStudioProject = {
            id: p.id,
            projectCode: p.project_code,
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
      }
    } catch {
      // Return null on failure
    }

    return null;
  }

  /**
   * Creates and executes a design generation job.
   */
  public async submitGenerationJob(params: {
    projectId: string;
    modelId?: StitchModelId;
    deviceType?: StitchDeviceType;
    customPrompt?: string;
  }): Promise<{ job: DesignGenerationJob; artifact?: DesignArtifact }> {
    const project = await this.getProject(params.projectId);
    if (!project) {
      throw new Error(`Project ${params.projectId} not found`);
    }

    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const jobCode = `STITCH-JOB-${Math.floor(100000 + Math.random() * 900000)}`;
    const modelId = params.modelId || "GEMINI_3_8_FLASH";
    const deviceType = params.deviceType || project.structuredBrief.deviceTarget || "DESKTOP";

    const job: DesignGenerationJob = {
      id: jobId,
      jobCode,
      projectId: project.id,
      provider: "stitch",
      modelId,
      deviceType,
      status: "processing",
      stage: "Synthesizing Stitch Design System Specification",
      progressPercent: 45,
      prompt: params.customPrompt || `Design for ${project.title}`,
      inputParameters: {
        modelId,
        deviceType,
        industry: project.industrySlug,
        features: project.featureRequirements,
      },
      executionLogs: [
        {
          timestamp: new Date().toISOString(),
          message: "Job initialized by Design Studio Client",
          stage: "Initialization",
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    localJobs.set(jobId, job);
    project.status = "generating";

    // Execute generation via Stitch Client
    const res = await stitchClient.generateDesign({
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

      job.status = "completed";
      job.stage = "Design artifacts synthesized and verified";
      job.progressPercent = 100;
      job.providerProjectId = res.providerProjectId;
      job.executionLogs.push({
        timestamp: new Date().toISOString(),
        message: `Artifact synthesized successfully via ${res.provenance}`,
        stage: "Completion",
      });

      localArtifacts.set(artifact.id, artifact);
      project.activeArtifactId = artifact.id;
      project.status = "generated";
      project.updatedAt = new Date().toISOString();

      // Persist to Supabase if available
      try {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
          const admin = createAdminClient();
          await admin.from("design_generation_jobs" as any).insert({
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
            execution_logs: job.executionLogs,
          } as any);

          await admin.from("design_artifacts" as any).insert({
            id: artifact.id,
            project_id: artifact.projectId,
            job_id: artifact.jobId,
            version_number: artifact.versionNumber,
            provider: artifact.provider,
            provider_project_id: artifact.providerProjectId,
            title: artifact.title,
            design_theme: artifact.designTheme,
            design_md: artifact.designMd,
            thumbnail_url: artifact.thumbnailUrl,
            device_type: artifact.deviceType,
          } as any);

          await admin
            .from("design_studio_projects" as any)
            .update({
              status: "generated",
              active_artifact_id: artifact.id,
              updated_at: new Date().toISOString(),
            } as any)
            .eq("id", project.id);
        }
      } catch {
        // Fall back to memory
      }

      return { job, artifact };
    } else {
      job.status = "failed";
      job.errorMessage = res.error || "Failed to generate design concept";
      project.status = "draft";
      return { job };
    }
  }

  /**
   * Retrieves a job by ID.
   */
  public async getJob(jobId: string): Promise<DesignGenerationJob | null> {
    return localJobs.get(jobId) || null;
  }

  /**
   * Retrieves an artifact by ID or by project ID.
   */
  public async getArtifact(artifactId: string): Promise<DesignArtifact | null> {
    return localArtifacts.get(artifactId) || null;
  }

  /**
   * Retrieves the active artifact for a project.
   */
  public async getActiveArtifactForProject(projectId: string): Promise<DesignArtifact | null> {
    const project = await this.getProject(projectId);
    if (project?.activeArtifactId) {
      return localArtifacts.get(project.activeArtifactId) || null;
    }
    // Search local artifacts
    for (const art of localArtifacts.values()) {
      if (art.projectId === projectId) return art;
    }
    return null;
  }

  /**
   * Submits a revision request.
   */
  public async submitRevision(params: {
    projectId: string;
    artifactId: string;
    notes: string;
  }): Promise<DesignRevision> {
    const revId = `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const existingList = localRevisions.get(params.projectId) || [];

    const revision: DesignRevision = {
      id: revId,
      projectId: params.projectId,
      artifactId: params.artifactId,
      revisionNumber: existingList.length + 1,
      notes: params.notes,
      status: "applied",
      createdAt: new Date().toISOString(),
    };

    existingList.push(revision);
    localRevisions.set(params.projectId, existingList);

    const project = await this.getProject(params.projectId);
    if (project) {
      project.status = "revision_requested";
      project.updatedAt = new Date().toISOString();
    }

    return revision;
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
    quoteRequestId?: string;
  }): Promise<{ ok: boolean }> {
    const artifact = localArtifacts.get(params.artifactId);
    if (artifact) {
      artifact.isApproved = true;
    }

    const project = await this.getProject(params.projectId);
    if (project) {
      project.status = "approved";
      if (params.quoteRequestId) {
        project.quoteRequestId = params.quoteRequestId;
        project.status = "quoted";
      }
      project.updatedAt = new Date().toISOString();
    }

    return { ok: true };
  }
}

export const designStudioOrchestrator = new DesignStudioOrchestrator();
