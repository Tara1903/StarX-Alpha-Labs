// STARX FORGE — Core Types, Constants & State Contracts
// Tagline: Design. Build. Test. Launch.

export const FORGE_JOB_STAGES = [
  "Analysing business requirements",
  "Preparing design brief",
  "Connecting to Stitch MCP",
  "Generating design",
  "Retrieving generated design",
  "Analysing design output",
  "Implementing frontend",
  "Implementing business logic",
  "Connecting demo data",
  "Running automated QA",
  "Fixing identified issues",
  "Preparing preview",
  "Waiting for administrator approval",
] as const;

export type ForgeJobStage = (typeof FORGE_JOB_STAGES)[number];

export type ForgeDemoGenerationStatus =
  | "draft"
  | "queued"
  | "designing"
  | "implementing"
  | "testing"
  | "qa_failed"
  | "ready_for_review"
  | "changes_requested"
  | "approved"
  | "published"
  | "archived";

export type ForgeQaStatus = "not_run" | "running" | "passed" | "failed" | "warnings";

export type ForgePublishingStatus = "unpublished" | "published" | "archived" | "rolled_back";

export type ForgeJobExecutionStatus = "queued" | "running" | "completed" | "failed" | "cancelled";

export type ForgeBatchStatus =
  | "draft"
  | "running"
  | "paused"
  | "completed"
  | "cancelled"
  | "partial_failure";

export interface ForgeLogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error" | "success";
  stage: string;
  message: string;
}

export interface ForgeQaCheckItem {
  id: string;
  category: "visual" | "functional" | "technical" | "performance";
  name: string;
  status: "passed" | "failed" | "warning" | "skipped";
  critical: boolean;
  details: string;
}

export interface ForgeQaReport {
  runId: string;
  demoSlug: string;
  executedAt: string;
  durationMs: number;
  readiness: "passed" | "blocked" | "warnings";
  passedCount: number;
  failedCount: number;
  warningCount: number;
  checks: ForgeQaCheckItem[];
  defects: string[];
  fixHistory: { timestamp: string; summary: string }[];
  notes?: string;
}

export interface ForgeDemoRecord {
  id: string;
  catalogId: number | null;
  slug: string;
  businessName: string;
  industry: string;
  categorySlug: string;
  description: string;
  targetAudience: string;
  designDirection: string;
  featureRequirements: string[];
  workflows: { id: string; title: string; description: string }[];
  archetype: string;
  brandConfig: Record<string, string>;
  seedData: Record<string, any>;
  generationStatus: ForgeDemoGenerationStatus;
  qaStatus: ForgeQaStatus;
  publishingStatus: ForgePublishingStatus;
  previewUrl: string;
  publishedVersion: number;
  activeVersionId: string | null;
  lastQaReport?: ForgeQaReport | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ForgeDemoVersion {
  id: string;
  demoId: string;
  versionNumber: number;
  jobId: string | null;
  designReferences: Record<string, any>;
  implementationSpec: Record<string, any>;
  qaReport: ForgeQaReport | null;
  previewUrl: string;
  approvedBy: string | null;
  approvedAt: string | null;
  notes: string | null;
  createdAt: string;
}

export interface ForgeJob {
  id: string;
  jobCode: string;
  demoId: string;
  demoSlug?: string;
  demoName?: string;
  batchId: string | null;
  currentStage: ForgeJobStage;
  stageIndex: number; // 1..13
  status: ForgeJobExecutionStatus;
  inputConfig: {
    businessName: string;
    industry: string;
    categorySlug: string;
    description: string;
    targetCustomers: string;
    workflows: string[];
    designPreferences: string;
    functionalRequirements: string[];
    specialInstructions: string;
    mode: "catalogue" | "custom";
  };
  designBrief: string;
  stitchRequestPayload: Record<string, any>;
  stitchResponseAssets: {
    connected?: boolean;
    source?: "stitch-mcp" | "manual-sync" | "pending";
    projectId?: string;
    screenIds?: string[];
    designTokens?: Record<string, string>;
    screenSummary?: string;
    rawArtifact?: any;
    error?: string;
  };
  outputReferences: {
    targetRoute?: string;
    componentTarget?: string;
    sandboxKey?: string;
    previewUrl?: string;
    implementedFiles?: string[];
  };
  qaResults: ForgeQaReport | null;
  logs: ForgeLogEntry[];
  errors: string[];
  retryCount: number;
  maxRetries: number;
  durationMs: number | null;
  startedAt: string | null;
  completedAt: string | null;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ForgeBatch {
  id: string;
  batchCode: string;
  name: string;
  description: string;
  demoIds: string[];
  maxConcurrency: number;
  status: ForgeBatchStatus;
  settings: {
    retryLimit: number;
    requireQaPass: boolean;
    autoAdvanceStages: boolean;
    designPreferences?: string;
  };
  totalCount: number;
  completedCount: number;
  failedCount: number;
  createdBy: string | null;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ForgeSettings {
  id: string;
  maxConcurrentJobs: number;
  retryLimit: number;
  jobTimeoutSeconds: number;
  defaultGenerationInstructions: string;
  defaultQaRequirements: {
    requireVisualCheck: boolean;
    requireFunctionalCheck: boolean;
    requireTechnicalCheck: boolean;
    requirePerformanceCheck: boolean;
    blockPublishOnCriticalFail: boolean;
  };
  stitchMcpEndpoint: string | null;
  antigravityWorkerMode: "local-bridge" | "ide-agent" | "remote-worker";
  updatedBy: string | null;
  updatedAt: string;
}

export interface ForgeAuditLog {
  id: string;
  actorEmail: string;
  action: string;
  targetType: string;
  targetId: string;
  details: Record<string, any>;
  createdAt: string;
}

export interface ForgeIntegrationStatusItem {
  id: "stitch_mcp" | "antigravity" | "database" | "storage" | "job_queue" | "qa_tooling";
  name: string;
  status: "connected" | "degraded" | "disconnected";
  summary: string;
  details: string;
  actionRequired?: string;
  checkedAt: string;
}

export interface ForgeOverviewMetrics {
  totalRegisteredDemos: number;
  publishedDemos: number;
  draftDemos: number;
  generatingDemos: number;
  failedJobs: number;
  pendingApprovals: number;
  recentlyCompletedJobs: ForgeJob[];
  recentActivity: ForgeAuditLog[];
  generationSuccessRate: number | null; // null until real completed/failed jobs exist
  averageDurationMs: number | null; // null until real completed jobs exist
}
