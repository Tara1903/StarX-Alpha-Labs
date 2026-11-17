import { Json } from "./database.types";
export * from "./database.types";

export interface CanonicalPlanRow {
  id: string;
  division_slug: string;
  tier: "starter" | "growth" | "enterprise" | "custom";
  code: string;
  name: string;
  tagline: string;
  description: string;
  price_inr: number;
  price_usd: number;
  is_custom_price: boolean;
  billing_type: string;
  timeline_weeks: string;
  screen_scope: string;
  sla_level: string;
  warranty_days: number;
  is_active: boolean;
  metadata: Json;
  created_at: string;
  updated_at: string;
}

export interface CanonicalFeatureRow {
  id: string;
  division_slug: string;
  name: string;
  description: string;
  category: string;
  is_active: boolean;
  created_at: string;
}

export interface PlanFeatureRow {
  plan_id: string;
  feature_id: string;
  is_included: boolean;
  limitation_note: string | null;
  created_at: string;
}

export interface RecommendationRuleRow {
  id: string;
  division_slug: string;
  industry_slug: string | null;
  platform: string | null;
  min_complexity: number;
  max_complexity: number;
  recommended_plan_id: string;
  reason_template: string;
  priority: number;
  is_active: boolean;
  created_at: string;
}

export interface AiPromptBlueprintRow {
  id: string;
  division_slug: string;
  industry_slug: string;
  category: string;
  device_type: "DESKTOP" | "MOBILE" | "TABLET";
  system_instructions: string;
  base_prompt_template: string;
  suggested_color_palette: Json;
  version: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CustomerDesignSessionRow {
  id: string;
  session_token: string;
  customer_id: string | null;
  current_step: number;
  step_data: Json;
  completed_steps: Json;
  is_converted: boolean;
  last_active_at: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerEnquiryRow {
  id: string;
  session_id: string | null;
  project_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  customer_company: string | null;
  division_slug: string;
  industry_slug: string;
  selected_plan_id: string | null;
  selected_addons: Json;
  estimated_total_inr: number;
  notes: string | null;
  status: "new" | "contacted" | "quoted" | "converted" | "closed";
  created_at: string;
  updated_at: string;
}

export interface QuotationRecordRow {
  id: string;
  quotation_code: string;
  enquiry_id: string | null;
  project_id: string | null;
  customer_id: string | null;
  division_slug: string;
  selected_plan_id: string | null;
  base_price_inr: number;
  addons_total_inr: number;
  discount_inr: number;
  final_total_inr: number;
  payment_schedule: Json;
  status: "draft" | "sent" | "accepted" | "rejected" | "expired";
  valid_until: string;
  created_at: string;
  updated_at: string;
}

export interface AuditEventRow {
  id: string;
  actor_id: string | null;
  actor_role: string;
  action: string;
  target_entity: string;
  target_id: string | null;
  details: Json;
  ip_address: string | null;
  created_at: string;
}

export interface DesignStudioProjectRow {
  id: string;
  project_code: string;
  customer_id: string | null;
  organization_id: string | null;
  session_id: string | null;
  title: string;
  industry_slug: string;
  division_slug: string;
  status: "draft" | "generating" | "generated" | "revision_requested" | "approved" | "quoted" | "archived";
  target_platforms: Json;
  feature_requirements: Json;
  theme_preference: string;
  raw_description: string | null;
  structured_brief: Json;
  active_artifact_id: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  quote_request_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface DesignGenerationJobRow {
  id: string;
  job_code: string;
  project_id: string;
  provider: string;
  model_id: string;
  device_type: string;
  status: "queued" | "processing" | "completed" | "failed" | "cancelled";
  stage: string;
  progress_percent: number;
  prompt: string;
  input_parameters: Json;
  provider_project_id: string | null;
  provider_screen_id: string | null;
  error_message: string | null;
  execution_logs: Json;
  created_at: string;
  updated_at: string;
}

export interface DesignArtifactRow {
  id: string;
  project_id: string;
  job_id: string | null;
  version_number: number;
  provider: string;
  provider_project_id: string;
  provider_screen_id: string | null;
  title: string;
  device_type: string;
  design_theme: Json;
  design_md: string | null;
  thumbnail_url: string | null;
  download_url: string | null;
  html_code: string | null;
  palette: Json;
  key_features: Json;
  is_approved: boolean;
  created_at: string;
}

export interface DesignRevisionRow {
  id: string;
  project_id: string;
  artifact_id: string;
  revision_number: number;
  notes: string;
  status: "pending" | "processing" | "applied" | "rejected";
  applied_job_id: string | null;
  created_at: string;
}
