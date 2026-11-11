export type AdminTabId =
  | "overview"
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
  | "expenses";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "owner" | "admin" | "editor";
  status: "active" | "suspended";
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
  status:
    | "new"
    | "under_review"
    | "contacted"
    | "followup_required"
    | "demo_scheduled"
    | "demo_presented"
    | "quotation_sent"
    | "converted"
    | "not_interested"
    | "closed";
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
}

export interface AdminNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "lead" | "demo" | "quote" | "system";
  read: boolean;
}
