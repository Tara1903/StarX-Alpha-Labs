"use client";

export type ProjectStage =
  | "Requirement Gathering"
  | "UI/UX Wireframing & Design"
  | "Architecture & Database Setup"
  | "Frontend / App UI Development"
  | "Backend & Business Logic"
  | "API & Third-Party Integration"
  | "Quality Assurance & Testing"
  | "Client Beta Review"
  | "Security & Performance Audit"
  | "Production Deployment"
  | "Client Training & Knowledge Transfer"
  | "Final Handover & IP Signoff"
  | "Active SLA Maintenance & Support";

export const PROJECT_STAGES: ProjectStage[] = [
  "Requirement Gathering",
  "UI/UX Wireframing & Design",
  "Architecture & Database Setup",
  "Frontend / App UI Development",
  "Backend & Business Logic",
  "API & Third-Party Integration",
  "Quality Assurance & Testing",
  "Client Beta Review",
  "Security & Performance Audit",
  "Production Deployment",
  "Client Training & Knowledge Transfer",
  "Final Handover & IP Signoff",
  "Active SLA Maintenance & Support"
];

export type ProjectLifecycleStatus =
  | "Awaiting Activation"
  | "Project Confirmed"
  | "Requirement Finalisation"
  | "UI/UX Design"
  | "Design Review"
  | "Development"
  | "Internal Testing"
  | "Customer Testing"
  | "Revision"
  | "Final Approval"
  | "Deployment"
  | "Handover"
  | "Warranty"
  | "Completed"
  | "On Hold"
  | "Cancelled";

export const PROJECT_LIFECYCLE_STATUSES: ProjectLifecycleStatus[] = [
  "Awaiting Activation",
  "Project Confirmed",
  "Requirement Finalisation",
  "UI/UX Design",
  "Design Review",
  "Development",
  "Internal Testing",
  "Customer Testing",
  "Revision",
  "Final Approval",
  "Deployment",
  "Handover",
  "Warranty",
  "Completed",
  "On Hold",
  "Cancelled"
];

export interface ProjectMilestoneItem {
  id: string;
  milestoneNumber: number;
  title: string;
  description: string;
  deliverables: string[];
  status: "Pending" | "In Progress" | "Review Ready" | "Approved" | "Completed";
  startDate?: string;
  targetDate?: string;
  completedDate?: string;
  requiresClientApproval: boolean;
  approvalStatus?: "Pending Review" | "Changes Requested" | "Approved";
  approvalNotes?: string;
  approvedAt?: string;
  approvedBy?: string;
  assignedLead?: string;
}

export interface ClientApprovalRecord {
  id: string;
  projectId: string;
  title: string;
  approvalType: "UI/UX Design" | "Homepage Design" | "Important Screen" | "Feature Scope" | "Testing Signoff" | "Final Delivery";
  itemVersion: string;
  status: "Pending" | "Approved" | "Changes Requested";
  previewUrl?: string;
  requestedAt: string;
  customerName?: string;
  customerEmail?: string;
  customerNotes?: string;
  decidedAt?: string;
}

export interface ProjectActivationChecklist {
  proposalAccepted: boolean;
  proposalId?: string;
  agreementExecuted: boolean;
  agreementId?: string;
  advancePaymentVerified: boolean;
  paymentId?: string;
  advanceAmountPaid: number;
  adminConfirmed: boolean;
  confirmedBy?: string;
  activatedAt?: string;
}

export interface ProjectWarrantyDetails {
  included: boolean;
  warrantyPeriodDays: number; // default 30
  startDate?: string;
  endDate?: string;
  coverageScope: string[];
  exclusions: string[];
  status: "Not Started" | "Active" | "Expired";
}

export interface ClientProject {
  id: string;
  projectCode: string; // STARX-PRJ-2026-000001
  estimateNumber?: string;
  proposalId?: string;
  proposalNumber?: string;
  agreementId?: string;
  clientName: string;
  clientBusiness: string;
  clientEmail: string;
  clientPhone: string;
  projectName: string;
  division?: "website" | "app" | "combo";
  packageCode?: string;
  status: ProjectLifecycleStatus;
  progressPercent: number;
  assignedProjectManager: string;
  startDate: string;
  expectedDeliveryDate: string;
  actualHandoverDate?: string;
  totalCost: number;
  totalBudget?: number;
  currentStage?: ProjectStage;
  paidAmount: number;
  balanceAmount: number;
  activation: ProjectActivationChecklist;
  milestones: ProjectMilestoneItem[];
  approvals: ClientApprovalRecord[];
  warranty: ProjectWarrantyDetails;
  recentUpdates: { id: string; date: string; message: string; author: string; type: "milestone" | "approval" | "payment" | "general" }[];
  stagingUrl?: string;
  productionUrl?: string;
  repositoryUrl?: string;
}

const STORAGE_KEY = "starx_client_projects_v2";

export function generateProjectId(): string {
  const year = new Date().getFullYear();
  const counter = Math.floor(100000 + Math.random() * 900000);
  return `STARX-PRJ-${year}-${counter}`;
}

export function getDefaultMilestones(): ProjectMilestoneItem[] {
  return [
    {
      id: "m1",
      milestoneNumber: 1,
      title: "Milestone 1 — Requirement & Discovery",
      description: "Scope confirmation, user stories, technical architecture, and database entity mapping.",
      deliverables: ["Technical SRS Document", "Database Schema Spec", "Kickoff Architecture Signoff"],
      status: "Completed",
      completedDate: new Date(Date.now() - 86400000 * 14).toISOString(),
      requiresClientApproval: true,
      approvalStatus: "Approved",
      approvedBy: "Client Owner",
      approvedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
      assignedLead: "Aarav Sharma"
    },
    {
      id: "m2",
      milestoneNumber: 2,
      title: "Milestone 2 — UI/UX Design & Prototyping",
      description: "Figma wireframes, dark cyberpunk design tokens, responsive layout mockups, and client walkthrough.",
      deliverables: ["Interactive Prototype", "Component Library Spec", "Design System Signoff"],
      status: "Completed",
      completedDate: new Date(Date.now() - 86400000 * 7).toISOString(),
      requiresClientApproval: true,
      approvalStatus: "Approved",
      approvedBy: "Client Owner",
      approvedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      assignedLead: "Kavya Patel"
    },
    {
      id: "m3",
      milestoneNumber: 3,
      title: "Milestone 3 — Core Development & Engine Build",
      description: "Next.js 16 full-stack cockpit, API gateway routing, database migrations, and responsive frontends.",
      deliverables: ["Working Dispatch Engine", "API Webhook Endpoints", "Staging Cockpit Build"],
      status: "In Progress",
      startDate: new Date(Date.now() - 86400000 * 6).toISOString(),
      targetDate: new Date(Date.now() + 86400000 * 7).toISOString(),
      requiresClientApproval: false,
      assignedLead: "Rohan V."
    },
    {
      id: "m4",
      milestoneNumber: 4,
      title: "Milestone 4 — Security & Comprehensive Testing",
      description: "Functional test coverage, mobile responsive verification, security audit, and edge resilience tests.",
      deliverables: ["QA Regression Matrix", "Security Penetration Audit", "Bug Zero Verification"],
      status: "Pending",
      targetDate: new Date(Date.now() + 86400000 * 12).toISOString(),
      requiresClientApproval: false,
      assignedLead: "QA Automation Lead"
    },
    {
      id: "m5",
      milestoneNumber: 5,
      title: "Milestone 5 — Client Staging Review & Feedback",
      description: "Client sandbox access, beta operational trial, feature verification, and feedback implementation.",
      deliverables: ["Client Sandbox Access", "Feedback Review Protocol", "Feature Scope Approval"],
      status: "Pending",
      targetDate: new Date(Date.now() + 86400000 * 16).toISOString(),
      requiresClientApproval: true,
      assignedLead: "Aarav Sharma"
    },
    {
      id: "m6",
      milestoneNumber: 6,
      title: "Milestone 6 — Production Deployment & DNS Setup",
      description: "Custom domain mapping, SSL certificate automation, CDN edge cache configuration, and database indexing.",
      deliverables: ["Production Domain Live", "SSL Verification", "Post-deployment Health Check"],
      status: "Pending",
      targetDate: new Date(Date.now() + 86400000 * 20).toISOString(),
      requiresClientApproval: false,
      assignedLead: "DevOps Engineer"
    },
    {
      id: "m7",
      milestoneNumber: 7,
      title: "Milestone 7 — Handover, IP Transfer & Warranty Start",
      description: "Full git repository transfer, documentation handover, administrative credentials, and 30-day warranty initiation.",
      deliverables: ["Source Code Transfer", "Administrator Guide", "Official IP Assignment Certificate", "30-Day Warranty Activation"],
      status: "Pending",
      targetDate: new Date(Date.now() + 86400000 * 22).toISOString(),
      requiresClientApproval: true,
      assignedLead: "Aarav Sharma"
    }
  ];
}

export function getClientProjects(): ClientProject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const now = new Date();
      const initial: ClientProject[] = [
        {
          id: "proj-101",
          projectCode: "STARX-PRJ-2026-000101",
          estimateNumber: "STARX-EST-2026-001042",
          proposalId: "prop-101",
          proposalNumber: "STARX-PROP-2026-000101",
          agreementId: "agr-101",
          clientName: "Vikram Malhotra",
          clientBusiness: "Nexus Logistics Hub",
          clientEmail: "vikram@nexuslogistics.in",
          clientPhone: "+91 98200 12345",
          projectName: "Nexus Multi-City Logistics & Fleet Dispatch Platform",
          division: "combo",
          packageCode: "C2",
          status: "Development",
          progressPercent: 42,
          assignedProjectManager: "Aarav Sharma",
          startDate: new Date(Date.now() - 86400000 * 14).toISOString(),
          expectedDeliveryDate: new Date(Date.now() + 86400000 * 16).toISOString(),
          totalCost: 75515,
          paidAmount: 30206,
          balanceAmount: 45309,
          stagingUrl: "https://nexus-staging.starxalphalabs.online",
          activation: {
            proposalAccepted: true,
            proposalId: "prop-101",
            agreementExecuted: true,
            agreementId: "agr-101",
            advancePaymentVerified: true,
            paymentId: "pay-101",
            advanceAmountPaid: 30206,
            adminConfirmed: true,
            confirmedBy: "Super Administrator",
            activatedAt: new Date(Date.now() - 86400000 * 14).toISOString()
          },
          milestones: getDefaultMilestones(),
          approvals: [
            {
              id: "appr-1",
              projectId: "proj-101",
              title: "UI/UX High-Fidelity Design Prototype Signoff",
              approvalType: "UI/UX Design",
              itemVersion: "v1.0",
              status: "Approved",
              previewUrl: "https://nexus-staging.starxalphalabs.online/design",
              requestedAt: new Date(Date.now() - 86400000 * 9).toISOString(),
              customerName: "Vikram Malhotra",
              customerEmail: "vikram@nexuslogistics.in",
              customerNotes: "Approved without modifications. The electric cyan dark dashboard matches our brand palette.",
              decidedAt: new Date(Date.now() - 86400000 * 7).toISOString()
            },
            {
              id: "appr-2",
              projectId: "proj-101",
              title: "Consignment Booking & Telemetry Screen Layout",
              approvalType: "Important Screen",
              itemVersion: "v1.2",
              status: "Pending",
              previewUrl: "https://nexus-staging.starxalphalabs.online/telemetry-preview",
              requestedAt: new Date(Date.now() - 86400000 * 1).toISOString()
            }
          ],
          warranty: {
            included: true,
            warrantyPeriodDays: 30,
            coverageScope: [
              "Critical runtime bug fixes and configuration corrections",
              "Database indexing and query execution stability",
              "Mayank Singh UPI payment callback reconciliation support",
              "Hosting edge server availability and SSL renewals"
            ],
            exclusions: [
              "Brand-new module requests or un-scoped feature redesigns",
              "Third-party API outages or external upstream carrier outages"
            ],
            status: "Not Started"
          },
          recentUpdates: [
            {
              id: "upd-1",
              date: new Date(Date.now() - 3600000 * 3).toISOString(),
              message: "Milestone 3: Finished Next.js 16 driver telemetry integration. Initiating driver mobile build.",
              author: "Rohan V. (Full-Stack Engineer)",
              type: "milestone"
            },
            {
              id: "upd-2",
              date: new Date(Date.now() - 86400000 * 7).toISOString(),
              message: "Milestone 2 Approved by client. Transferred UI mockups to development team.",
              author: "Aarav Sharma (Project Manager)",
              type: "approval"
            },
            {
              id: "upd-3",
              date: new Date(Date.now() - 86400000 * 14).toISOString(),
              message: "Project activated upon confirmed 40% advance milestone clearance (₹30,206).",
              author: "System Audit",
              type: "payment"
            }
          ]
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read client projects from storage", err);
    return [];
  }
}

export function saveProjectToStore(project: ClientProject): void {
  if (typeof window === "undefined") return;
  try {
    const list = getClientProjects();
    const updated = [project, ...list.filter((p) => p.id !== project.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save project to storage", err);
  }
}

export function getProjectById(id: string): ClientProject | null {
  const list = getClientProjects();
  return list.find((p) => p.id === id || p.projectCode === id) || null;
}

/**
 * Activate Project strictly when all 4 mandatory criteria are met:
 * 1. Proposal Accepted
 * 2. Agreement Executed
 * 3. Advance Payment Verified
 * 4. Admin Confirmation
 */
export function activateProjectFromActivationFlow(params: {
  estimateNumber?: string;
  proposalId: string;
  proposalNumber: string;
  agreementId: string;
  paymentId: string;
  advanceAmountPaid: number;
  clientName: string;
  clientBusiness: string;
  clientEmail: string;
  clientPhone: string;
  projectName: string;
  division?: "website" | "app" | "combo";
  packageCode?: string;
  totalCost: number;
  adminConfirmedBy: string;
}): ClientProject | null {
  if (typeof window === "undefined") return null;
  try {
    const projectCode = generateProjectId();
    const newProject: ClientProject = {
      id: "proj_" + Date.now(),
      projectCode,
      estimateNumber: params.estimateNumber,
      proposalId: params.proposalId,
      proposalNumber: params.proposalNumber,
      agreementId: params.agreementId,
      clientName: params.clientName,
      clientBusiness: params.clientBusiness,
      clientEmail: params.clientEmail,
      clientPhone: params.clientPhone,
      projectName: params.projectName,
      division: params.division,
      packageCode: params.packageCode,
      status: "Project Confirmed",
      progressPercent: 5,
      assignedProjectManager: "Aarav Sharma",
      startDate: new Date().toISOString(),
      expectedDeliveryDate: new Date(Date.now() + 86400000 * 28).toISOString(),
      totalCost: params.totalCost,
      paidAmount: params.advanceAmountPaid,
      balanceAmount: Math.max(0, params.totalCost - params.advanceAmountPaid),
      activation: {
        proposalAccepted: true,
        proposalId: params.proposalId,
        agreementExecuted: true,
        agreementId: params.agreementId,
        advancePaymentVerified: true,
        paymentId: params.paymentId,
        advanceAmountPaid: params.advanceAmountPaid,
        adminConfirmed: true,
        confirmedBy: params.adminConfirmedBy,
        activatedAt: new Date().toISOString()
      },
      milestones: getDefaultMilestones(),
      approvals: [],
      warranty: {
        included: true,
        warrantyPeriodDays: 30,
        coverageScope: [
          "Critical bug fixes and functional defect resolution",
          "Database query stability and indexing",
          "Payment gateway webhook callback reconciliation"
        ],
        exclusions: [
          "New feature requests or non-scoped design overhauls",
          "Third-party external service outages"
        ],
        status: "Not Started"
      },
      recentUpdates: [
        {
          id: "act-1",
          date: new Date().toISOString(),
          message: `Project officially activated. Confirmed 40% advance payment of ₹${params.advanceAmountPaid.toLocaleString('en-IN')}. Milestones initiated.`,
          author: params.adminConfirmedBy,
          type: "general"
        }
      ]
    };
    saveProjectToStore(newProject);
    return newProject;
  } catch (err) {
    console.error("Failed to activate project", err);
    return null;
  }
}

export function updateMilestoneApproval(
  projectId: string,
  milestoneNumber: number,
  approvalStatus: "Approved" | "Changes Requested",
  clientName: string,
  notes: string = ""
): ClientProject | null {
  if (typeof window === "undefined") return null;
  try {
    const list = getClientProjects();
    let updatedProj: ClientProject | null = null;
    const updated = list.map((p) => {
      if (p.id === projectId || p.projectCode === projectId) {
        const updatedMilestones = p.milestones.map((m) => {
          if (m.milestoneNumber === milestoneNumber) {
            return {
              ...m,
              approvalStatus,
              approvalNotes: notes,
              approvedBy: clientName,
              approvedAt: new Date().toISOString(),
              status: approvalStatus === "Approved" ? ("Approved" as const) : ("In Progress" as const)
            };
          }
          return m;
        });

        // Recalculate progress
        const completedCount = updatedMilestones.filter((m) => m.status === "Approved" || m.status === "Completed").length;
        const progressPercent = Math.round((completedCount / updatedMilestones.length) * 100);

        const item: ClientProject = {
          ...p,
          milestones: updatedMilestones,
          progressPercent,
          recentUpdates: [
            {
              id: "appr_" + Date.now(),
              date: new Date().toISOString(),
              message: `Milestone ${milestoneNumber}: ${approvalStatus} by client (${clientName}). ${notes ? `Notes: ${notes}` : ""}`,
              author: clientName,
              type: "approval"
            },
            ...p.recentUpdates
          ]
        };
        updatedProj = item;
        return item;
      }
      return p;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updatedProj;
  } catch (err) {
    console.error("Failed to update milestone approval", err);
    return null;
  }
}

export function advanceProjectStage(projectId: string, newStage: ProjectStage): void {
  if (typeof window === "undefined") return;
  try {
    const list = getClientProjects();
    const updated = list.map((p) => {
      if (p.id === projectId || p.projectCode === projectId) {
        return {
          ...p,
          currentStage: newStage,
          recentUpdates: [
            {
              id: "stg_" + Date.now(),
              date: new Date().toISOString(),
              message: `Project stage advanced to ${newStage}`,
              author: "Project Manager",
              type: "general" as const
            },
            ...p.recentUpdates
          ]
        };
      }
      return p;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to advance project stage", err);
  }
}

export function createProjectFromQuotation(quotation: any): void {
  // Bridge method for compatibility
  if (!quotation) return;
  activateProjectFromActivationFlow({
    estimateNumber: quotation.estimateNumber,
    proposalId: quotation.id,
    proposalNumber: quotation.proposalNumber || "STARX-PROP-2026-AUTO",
    agreementId: "agr-auto",
    paymentId: "pay-advance",
    advanceAmountPaid: Math.round((quotation.totalAmount || 50000) * 0.4),
    clientName: quotation.clientName,
    clientBusiness: quotation.clientBusiness,
    clientEmail: quotation.clientEmail,
    clientPhone: quotation.clientPhone,
    projectName: quotation.projectTitle || quotation.selectedSolution || "Custom Project",
    totalCost: quotation.totalAmount || 50000,
    adminConfirmedBy: "Super Administrator"
  });
}
