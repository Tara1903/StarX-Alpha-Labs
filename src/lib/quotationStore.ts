"use client";

import { createProjectFromQuotation } from "./projectStore";

export type ProposalStatus =
  | "Draft"
  | "Under Review"
  | "Sent"
  | "Revision Requested"
  | "Approved"
  | "Agreement Generated"
  | "Rejected"
  | "Expired";

export interface ProposalLineItem {
  id: string;
  category: "Development" | "Hosting & Cloud" | "Integrations & APIs" | "Maintenance & SLA";
  title: string;
  description: string;
  amount: number;
}

export interface ProposalMilestoneSchedule {
  milestoneNumber: number;
  title: string;
  deliverables: string[];
  percentage: number;
  amount: number;
  duePeriod: string;
  approvalRequired: boolean;
}

export interface ProposalVersion {
  versionNumber: string; // e.g. "v1.0", "v2.0"
  createdAt: string;
  createdBy: string;
  changeSummary: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  items: ProposalLineItem[];
  milestones: ProposalMilestoneSchedule[];
}

export interface ProposalAcceptanceAudit {
  acceptedAt: string;
  acceptedBy: string;
  clientIp?: string;
  clientSignatureName: string;
  designation?: string;
  acceptanceVersion: string;
  verificationHash: string;
}

export interface Quotation {
  id: string;
  proposalNumber: string; // STARX-PROP-2026-000001
  estimateNumber?: string; // STARX-EST-2026-000001
  estimateId?: string;
  clientName: string;
  clientBusiness: string;
  clientEmail: string;
  clientPhone: string;
  
  // Section A-F: Overview & Objectives
  projectTitle: string;
  projectOverview: string;
  businessObjectives: string[];
  selectedSolution?: string;
  projectScope?: string;
  paymentSchedule?: string;
  customerNotes?: string;
  
  // Section G-K: Scope, Pages, Roles & Dashboards
  scopeDescription: string;
  modules: string[];
  features: string[];
  pagesOrScreens: string[];
  userRoles: string[];
  customerDashboardFeatures: string[];
  adminDashboardFeatures: string[];
  
  // Section L-N: Tech Stack, Integrations, Design
  techStack: string[];
  thirdPartyIntegrations: string[];
  designSpecifications: string;
  
  // Section O-T: Items, Milestones, Taxes & Recurring Costs
  items: ProposalLineItem[];
  milestoneSchedules: ProposalMilestoneSchedule[];
  subtotal: number;
  discountAmount?: number;
  taxRate: number; // 0.18 for 18% GST
  taxAmount: number;
  totalAmount: number;
  deliveryTimeline: string;
  hostingAndRecurringCosts: string;
  
  // Section U-Y: Terms, Exclusions, IP & Validity
  supportAndWarrantyTerms: string[];
  exclusionsAndAssumptions: string[];
  changeRequestPolicy: string;
  intellectualPropertyTerms: string;
  termsAndConditions: string[];
  validityDays: number;
  validUntil: string;

  // Status, Versioning & Audit
  currentVersion: string;
  versions: ProposalVersion[];
  status: ProposalStatus;
  customerRevisionNotes?: string;
  acceptance?: ProposalAcceptanceAudit;
  
  agreementId?: string;
  projectId?: string;
  
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "starx_official_proposals_v2";

export function generateProposalId(): string {
  const year = new Date().getFullYear();
  const counter = Math.floor(100000 + Math.random() * 900000);
  return `STARX-PROP-${year}-${counter}`;
}

export function getQuotations(): Quotation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const now = new Date();
      const validUntil = new Date(now.getTime() + 30 * 86400000).toISOString();
      const initial: Quotation[] = [
        {
          id: "prop-101",
          proposalNumber: "STARX-PROP-2026-000101",
          estimateNumber: "STARX-EST-2026-001042",
          estimateId: "est-101",
          clientName: "Vikram Malhotra",
          clientBusiness: "Nexus Logistics Hub",
          clientEmail: "vikram@nexuslogistics.in",
          clientPhone: "+91 98200 12345",
          projectTitle: "Nexus Fleet Logistics & Multi-City Dispatch Platform",
          projectOverview: "An enterprise-grade digital fleet coordination and client consignment tracking engine featuring an administrative dispatch cockpit and native mobile driver application.",
          businessObjectives: [
            "Centralize truck consignment assignment and eliminate manual spreadsheets",
            "Provide live telemetry tracking and instant PDF waybills to corporate clients",
            "Automate driver milestone payroll and advance fuel allocations"
          ],
          scopeDescription: "Complete architecture, UI/UX design, Next.js 16 Web Dispatch Cockpit, Android driver application, and Mayank Singh UPI payment automation.",
          modules: [
            "Executive Dispatch Dashboard",
            "Consignment Booking & Waybill Generator",
            "Driver Android Mobile Fleet App",
            "Corporate Client Consignment Portal",
            "Automated Invoicing & Milestone Settlement"
          ],
          features: [
            "Live Route Telemetry & GPS Coordinate Logging",
            "Automated GST e-Waybill Verification",
            "Digital Driver POD (Proof of Delivery) Signature Capture",
            "Automated WhatsApp Consignment Status Dispatches"
          ],
          pagesOrScreens: [
            "Admin Cockpit Overview",
            "Fleet Master Management",
            "Live Map Route Telemetry",
            "Trip Dispatcher",
            "Driver Roster",
            "Waybill Vault",
            "Customer Booking",
            "Consignment Tracking",
            "Driver Mobile Home",
            "POD Upload Screen"
          ],
          userRoles: ["Super Administrator", "Fleet Dispatcher", "Corporate Customer", "Driver"],
          customerDashboardFeatures: [
            "Self-service freight rate calculator",
            "Live consignment progress milestone view",
            "Downloadable stamped tax invoices & PODs"
          ],
          adminDashboardFeatures: [
            "Fleet utilization heatmaps",
            "Driver payout verification and batch settlement",
            "Audit logs for trip alterations"
          ],
          techStack: ["Next.js 16 (App Router)", "React 19", "Tailwind CSS v4", "Supabase PostgreSQL", "Mayank Singh UPI Gateway", "PWA / Flutter Native"],
          thirdPartyIntegrations: ["Mayank Singh UPI Gateway", "Google Maps Platform", "Fastag API", "Twilio WhatsApp Business"],
          designSpecifications: "StarX Alpha Labs Cyberpunk Dark System with electric cyan and blue neon telemetry gauges.",
          items: [
            {
              id: "i1",
              category: "Development",
              title: "Core Logistics ERP & Web Dispatcher",
              description: "Full Next.js 16 cockpit with live consignment lifecycle tracking and role-based access control.",
              amount: 49999
            },
            {
              id: "i2",
              category: "Integrations & APIs",
              title: "Payment Gateway Integration (Mayank Singh UPI)",
              description: "Automated webhook handling, instant QR generation and settlement ledger.",
              amount: 4999
            },
            {
              id: "i3",
              category: "Integrations & APIs",
              title: "Push Notification System (OneSignal / FCM)",
              description: "Automated push telemetry dispatches for drivers and dispatch managers.",
              amount: 3999
            },
            {
              id: "i4",
              category: "Hosting & Cloud",
              title: "Enterprise High-Availability Edge Setup",
              description: "Multi-region Supabase PostgreSQL & CDN edge deployment with daily automated backups.",
              amount: 4999
            }
          ],
          milestoneSchedules: [
            {
              milestoneNumber: 1,
              title: "Milestone 1 — Discovery, Architecture & Wireframes",
              deliverables: ["Technical SRS", "High-fidelity UI mockups", "Database schema approval"],
              percentage: 40,
              amount: 30206,
              duePeriod: "Week 1",
              approvalRequired: true
            },
            {
              milestoneNumber: 2,
              title: "Milestone 2 — Core Engine & Integration Development",
              deliverables: ["Web Dispatcher Cockpit", "Driver Mobile App Alpha", "UPI Gateway Staging Test"],
              percentage: 40,
              amount: 30206,
              duePeriod: "Week 3",
              approvalRequired: true
            },
            {
              milestoneNumber: 3,
              title: "Milestone 3 — Production Deployment, UAT & Handover",
              deliverables: ["Final bug regression", "Domain connection", "Full source code transfer & 30-day warranty start"],
              percentage: 20,
              amount: 15103,
              duePeriod: "Week 4",
              approvalRequired: true
            }
          ],
          subtotal: 63996,
          discountAmount: 0,
          taxRate: 0.18,
          taxAmount: 11519,
          totalAmount: 75515,
          deliveryTimeline: "3 to 4 Weeks from Kickoff Signoff",
          hostingAndRecurringCosts: "Hosting renewal at ₹4,999/yr post 1st year. Maintenance SLA optional at ₹2,999/mo.",
          supportAndWarrantyTerms: [
            "30-day post-launch comprehensive warranty covering all software defects and configuration glitches.",
            "Response time: < 4 hours during standard IST business hours.",
            "Excludes brand-new feature additions not included in this formal specification."
          ],
          exclusionsAndAssumptions: [
            "Client will provide timely API credentials and test fleet vehicle registrations.",
            "SMS gateway balances and WhatsApp Business API consumption fees are paid directly to providers."
          ],
          changeRequestPolicy: "Any scope additions requested after signoff will be itemized as sprint addendums with transparent hourly/milestone quotes.",
          intellectualPropertyTerms: "100% full intellectual property and source code ownership transfer upon final milestone settlement.",
          termsAndConditions: [
            "Estimate prices remain strictly locked for 30 calendar days.",
            "Development commences immediately upon verified 40% advance milestone clearance.",
            "All disputes subject to exclusive jurisdiction of Indore / Mumbai arbitration."
          ],
          validityDays: 30,
          validUntil,
          currentVersion: "v1.0",
          versions: [
            {
              versionNumber: "v1.0",
              createdAt: new Date(Date.now() - 86400000).toISOString(),
              createdBy: "Aarav Sharma (Sales Lead)",
              changeSummary: "Initial official proposal assembled from Estimate STARX-EST-2026-001042",
              subtotal: 63996,
              taxAmount: 11519,
              totalAmount: 75515,
              items: [],
              milestones: []
            }
          ],
          status: "Sent",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read proposals from storage", err);
    return [];
  }
}

export function saveQuotationToStore(data: Partial<Quotation> & { clientName: string }): Quotation {
  const quotationNumber = data.proposalNumber || generateProposalId();
  const now = new Date();
  const validUntil = data.validUntil || new Date(now.getTime() + 30 * 86400000).toISOString();
  
  const quotation: Quotation = {
    id: data.id || "prop_" + Date.now(),
    proposalNumber: quotationNumber,
    estimateNumber: data.estimateNumber,
    estimateId: data.estimateId,
    clientName: data.clientName,
    clientBusiness: data.clientBusiness || "Individual / Startup",
    clientEmail: data.clientEmail || "",
    clientPhone: data.clientPhone || "",
    projectTitle: data.projectTitle || data.selectedSolution || "Custom Project Scope",
    projectOverview: data.projectOverview || "Technical proposal assembled from estimate requirements.",
    businessObjectives: data.businessObjectives || ["Operational excellence", "High availability architecture"],
    selectedSolution: data.selectedSolution,
    projectScope: data.projectScope,
    scopeDescription: data.scopeDescription || data.projectScope || "Comprehensive full-stack engineering deliverables.",
    modules: data.modules || [],
    features: data.features || [],
    pagesOrScreens: data.pagesOrScreens || [],
    userRoles: data.userRoles || ["Administrator", "Client"],
    customerDashboardFeatures: data.customerDashboardFeatures || [],
    adminDashboardFeatures: data.adminDashboardFeatures || [],
    techStack: data.techStack || ["Next.js 16", "React 19", "Tailwind CSS v4", "Supabase"],
    thirdPartyIntegrations: data.thirdPartyIntegrations || [],
    designSpecifications: data.designSpecifications || "StarX Cyberpunk Dark System",
    items: data.items || [],
    milestoneSchedules: data.milestoneSchedules || [
      {
        milestoneNumber: 1,
        title: "Milestone 1 — Advance on Kickoff",
        deliverables: ["SRS", "Architecture"],
        percentage: 40,
        amount: Math.round((data.totalAmount || 0) * 0.4),
        duePeriod: "Week 1",
        approvalRequired: true
      },
      {
        milestoneNumber: 2,
        title: "Milestone 2 — Beta Review",
        deliverables: ["Staging Build"],
        percentage: 40,
        amount: Math.round((data.totalAmount || 0) * 0.4),
        duePeriod: "Week 3",
        approvalRequired: true
      },
      {
        milestoneNumber: 3,
        title: "Milestone 3 — Production Handover",
        deliverables: ["DNS Deployed", "Code Transfer"],
        percentage: 20,
        amount: Math.round((data.totalAmount || 0) * 0.2),
        duePeriod: "Week 4",
        approvalRequired: true
      }
    ],
    subtotal: data.subtotal || 0,
    discountAmount: data.discountAmount || 0,
    taxRate: data.taxRate || 0.18,
    taxAmount: data.taxAmount || 0,
    totalAmount: data.totalAmount || 0,
    deliveryTimeline: data.deliveryTimeline || "2–4 Weeks",
    paymentSchedule: data.paymentSchedule || "40% Advance, 40% UAT, 20% Handover",
    hostingAndRecurringCosts: data.hostingAndRecurringCosts || "Annual renewal post Year 1",
    supportAndWarrantyTerms: data.supportAndWarrantyTerms || ["30-day post-launch warranty"],
    exclusionsAndAssumptions: data.exclusionsAndAssumptions || ["Client to provide domain and APIs"],
    changeRequestPolicy: data.changeRequestPolicy || "Formal change request sprint addendums",
    intellectualPropertyTerms: data.intellectualPropertyTerms || "100% full source code ownership transferred upon final payment",
    termsAndConditions: data.termsAndConditions || ["Locked for 30 calendar days"],
    validityDays: data.validityDays || 30,
    validUntil,
    currentVersion: data.currentVersion || "v1.0",
    versions: data.versions || [],
    status: data.status || "Sent",
    createdAt: data.createdAt || now.toISOString(),
    updatedAt: now.toISOString()
  };

  if (typeof window !== "undefined") {
    try {
      const list = getQuotations();
      const updated = [quotation, ...list.filter((q) => q.id !== quotation.id)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save proposal to storage", err);
    }
  }
  return quotation;
}

export const saveQuotation = saveQuotationToStore;

export function getProposalById(id: string): Quotation | null {
  const list = getQuotations();
  return list.find((q) => q.id === id || q.proposalNumber === id) || null;
}

export function acceptProposal(
  proposalId: string,
  clientSignatureName: string,
  designation: string = "Authorized Signatory"
): Quotation | null {
  if (typeof window === "undefined") return null;
  try {
    const list = getQuotations();
    let acceptedProp: Quotation | null = null;
    const updated = list.map((q) => {
      if (q.id === proposalId || q.proposalNumber === proposalId) {
        const audit: ProposalAcceptanceAudit = {
          acceptedAt: new Date().toISOString(),
          acceptedBy: q.clientEmail,
          clientSignatureName,
          designation,
          acceptanceVersion: q.currentVersion,
          verificationHash: "SX-VERIFY-" + Math.random().toString(36).substring(2, 10).toUpperCase()
        };
        const item: Quotation = {
          ...q,
          status: "Approved",
          acceptance: audit,
          updatedAt: new Date().toISOString()
        };
        acceptedProp = item;
        return item;
      }
      return q;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return acceptedProp;
  } catch (err) {
    console.error("Failed to accept proposal", err);
    return null;
  }
}

export function requestProposalRevision(
  proposalId: string,
  revisionNotes: string
): Quotation | null {
  if (typeof window === "undefined") return null;
  try {
    const list = getQuotations();
    let revisedProp: Quotation | null = null;
    const updated = list.map((q) => {
      if (q.id === proposalId || q.proposalNumber === proposalId) {
        const item: Quotation = {
          ...q,
          status: "Revision Requested",
          customerRevisionNotes: revisionNotes,
          updatedAt: new Date().toISOString()
        };
        revisedProp = item;
        return item;
      }
      return q;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return revisedProp;
  } catch (err) {
    console.error("Failed to request revision", err);
    return null;
  }
}
