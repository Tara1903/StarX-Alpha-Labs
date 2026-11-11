// ==============================================================================
// STARX ALPHA LABS — CUSTOMER PORTAL & CLIENT WORKSPACE TYPES
// ==============================================================================

export type ClientRole = "owner" | "member" | "viewer";
export type ClientMemberStatus = "active" | "suspended" | "invited";

export interface ClientOrganization {
  id: string;
  name: string;
  businessType?: string;
  primaryContactName: string;
  primaryContactEmail: string;
  phone?: string;
  country: string;
  address?: string;
  status: "active" | "suspended";
  createdAt: string;
}

export interface ClientMember {
  id: string;
  organizationId: string;
  userId: string;
  role: ClientRole;
  status: ClientMemberStatus;
  fullName: string;
  email: string;
  createdAt: string;
}

export interface ClientInvitation {
  id: string;
  organizationId: string;
  organizationName?: string;
  email: string;
  fullName: string;
  role: ClientRole;
  token: string;
  expiresAt: string;
  acceptedAt?: string;
  createdAt: string;
}

export type MilestoneStatus = 
  | "upcoming" 
  | "in_progress" 
  | "awaiting_client" 
  | "completed" 
  | "delayed" 
  | "on_hold";

export interface ProjectMilestoneItem {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  stageOrder: number;
  status: MilestoneStatus;
  plannedStartDate?: string;
  targetDeliveryDate?: string;
  actualCompletionDate?: string;
  deliverableUrl?: string;
  clientVisible: boolean;
}

export type ClientActionType = 
  | "none" 
  | "review" 
  | "approve" 
  | "request_changes" 
  | "upload_files" 
  | "submit_feedback";

export interface ClientTaskItem {
  id: string;
  projectId: string;
  milestoneId?: string;
  title: string;
  description?: string;
  clientAction: ClientActionType;
  status: "pending" | "in_progress" | "awaiting_client" | "completed";
  dueDate?: string;
  clientVisible: boolean;
}

export type DocumentCategory = 
  | "brief" 
  | "architecture" 
  | "ui_ux_design" 
  | "deliverable" 
  | "client_upload" 
  | "report" 
  | "handover";

export interface ClientDocumentItem {
  id: string;
  projectId: string;
  projectName?: string;
  organizationId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSizeBytes?: number;
  documentCategory: DocumentCategory;
  version?: string;
  uploadedByType: "admin" | "client";
  uploadedByName?: string;
  clientVisible: boolean;
  createdAt: string;
}

export interface ProjectUpdateItem {
  id: string;
  projectId: string;
  projectName?: string;
  title: string;
  summary: string;
  content?: string;
  authorName: string;
  publishedAt: string;
}

export interface ProjectDiscussionMessage {
  id: string;
  projectId: string;
  senderUserId?: string;
  senderName: string;
  senderType: "client" | "admin";
  message: string;
  attachments?: { name: string; url: string; size?: string }[];
  createdAt: string;
}

export interface ClientApprovalRecord {
  id: string;
  projectId: string;
  itemType: "milestone" | "deliverable" | "sprint_review";
  itemId: string;
  itemTitle: string;
  clientUserId?: string;
  clientUserName?: string;
  decision: "approved" | "changes_requested";
  notes?: string;
  createdAt: string;
}

export interface ClientChangeRequestItem {
  id: string;
  projectId: string;
  projectName?: string;
  organizationId: string;
  title: string;
  description: string;
  justification?: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "new" | "under_review" | "accepted" | "rejected" | "completed";
  adminResponse?: string;
  submittedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientSupportTicket {
  id: string;
  ticketNumber: string;
  organizationId: string;
  projectId?: string;
  projectName?: string;
  subject: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in_progress" | "waiting_for_client" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
}

export interface ClientNotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface CustomerSessionContext {
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  organization: ClientOrganization;
  membership: ClientMember;
  assignedProjects: {
    id: string;
    projectCode: string;
    projectName: string;
    division: string;
    currentStage: string;
    progressPercent: number;
    totalBudget: number;
    status: string;
  }[];
}

export type CustomerPortalTab = 
  | "dashboard" 
  | "projects" 
  | "milestones" 
  | "tasks" 
  | "documents" 
  | "discussions" 
  | "change-requests" 
  | "support" 
  | "organization" 
  | "account";
