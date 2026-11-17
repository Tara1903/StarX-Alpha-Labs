export type AdminTabId =
  | "overview"
  | "forge"
  | "crm"
  | "demo-requests"
  | "agency-enquiries"
  | "estimates"
  | "quotations"
  | "projects"
  | "demos"
  | "video-station"
  | "cms-services"
  | "cms-divisions"
  | "cms-industries"
  | "cms-portfolio"
  | "cms-blog"
  | "pricing-packages"
  | "settings"
  | "team"
  | "audit-logs"
  | "reports"
  | "finance"
  | "contracts"
  | "invoices"
  | "payments"
  | "expenses"
  | "support";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "owner" | "admin" | "editor";
  status: "active" | "suspended";
}

export type LeadStatus =
  | "new"
  | "assigned"
  | "attempted_contact"
  | "under_review"
  | "contacted"
  | "needs_assessment"
  | "assessment_complete"
  | "followup_required"
  | "demo_scheduled"
  | "demo_presented"
  | "quote_prepared"
  | "quotation_sent"
  | "negotiation"
  | "converted"
  | "not_interested"
  | "on_hold"
  | "closed";

export interface ContactHistoryEntry {
  id: string;
  date: string;
  method: "phone" | "whatsapp" | "email" | "in_person";
  outcome:
    | "successfully_contacted_interested"
    | "successfully_contacted_callback"
    | "successfully_contacted_requirements_changed"
    | "no_answer_voicemail"
    | "whatsapp_sent_waiting"
    | "email_sent_waiting"
    | "client_unresponsive"
    | "client_not_interested";
  notes: string;
  staffName: string;
  nextFollowUpDate?: string;
}

export interface DesignArtifactSnapshot {
  artifactId?: string;
  projectId?: string;
  projectCode?: string;
  title?: string;
  versionNumber?: number;
  provider?: string;
  styleName?: string;
  deviceType?: string;
  thumbnailUrl?: string;
  downloadUrl?: string;
  storagePathHtml?: string;
  storagePathScreenshot?: string;
  keyFeatures?: string[];
  palette?: { name: string; hex: string }[];
  designMd?: string;
  htmlCode?: string;
  prompt?: string;
  isApproved?: boolean;
}

export interface TechnicalAssessment {
  feasibility: "high" | "medium" | "complex" | "requires_custom_rnd";
  recommendedArchitecture: string;
  recommendedStack: string[];
  estimatedWeeks: string;
  riskAnalysis: string;
  notes: string;
  assessedBy?: string;
  assessedAt?: string;
}

export interface UnifiedLead {
  id: string;
  code: string;
  source: "contact" | "demo-request" | "calculator" | "quote" | "agency";
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  city?: string;
  country?: string;
  industry?: string;
  serviceRequired: string;
  budgetRange?: string;
  timeline?: string;
  primaryGoal?: string;
  referenceUrl?: string;
  agencyTier?: string;
  projectVolume?: string;
  message?: string;
  status: LeadStatus;
  assignedTo?: string;
  internalNotes: {
    id: string;
    author: string;
    text: string;
    createdAt: string;
  }[];
  followUpDate?: string;
  createdAt: string;
  lastActivityAt: string;
  isDuplicateFlag?: boolean;
  
  // Extended Design Studio & Operations Fields
  enquiryRef?: string;
  contactProfile?: {
    preferredMethod?: "phone" | "whatsapp" | "email";
    bestTimeToReach?: string;
    countryCode?: string;
    location?: string;
    companyName?: string;
  };
  designDetails?: DesignArtifactSnapshot;
  technicalAssessment?: TechnicalAssessment;
  contactHistory?: ContactHistoryEntry[];
  lostReason?: string;
  selectedPlan?: string;
  featuresList?: string[];
  rawMetadata?: Record<string, unknown>;
}

export interface AdminNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "lead" | "demo" | "quote" | "system";
  read: boolean;
  linkTab?: AdminTabId;
}
