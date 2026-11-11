"use client";

import { DivisionType } from "@/data/developmentPackages";

export type EstimateStatus =
  | "Submitted"
  | "Under Review"
  | "Requirement Clarification"
  | "Proposal Prepared"
  | "Proposal Sent"
  | "Quotation Issued"
  | "Revision Requested"
  | "Proposal Accepted"
  | "Agreement Pending"
  | "Awaiting Advance Payment"
  | "Project Confirmed"
  | "Expired"
  | "Cancelled"
  | "Rejected";

export interface EstimateAddonItem {
  id: string;
  name: string;
  price: number;
}

export interface RequirementVerificationSpec {
  businessObjective?: string;
  projectType?: string;
  targetAudience?: string;
  requiredScreens?: string;
  requiredUserRoles?: string;
  customerDashboardReqs?: string;
  adminDashboardReqs?: string;
  requiredIntegrations?: string;
  paymentGatewayReqs?: string;
  databaseReqs?: string;
  hostingRequirements?: string;
  securityRequirements?: string;
  referenceWebsites?: string;
  designPreferences?: string;
  contentAvailability?: string;
  projectTimeline?: string;
  additionalScope?: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface EstimateConsultationMeeting {
  status: "Not Requested" | "Requested" | "Scheduled" | "Completed" | "Rescheduled" | "Cancelled";
  preferredTime?: string;
  scheduledTime?: string;
  meetingUrl?: string;
  consultantName?: string;
  notes?: string;
}

export interface CustomerEstimate {
  id: string;
  estimateNumber: string; // e.g. STARX-EST-2026-000001
  clientName: string;
  clientBusiness: string;
  clientEmail: string;
  clientPhone: string;
  preferredContact?: "WhatsApp" | "Phone Call" | "Google Meet" | "Email";
  preferredMeetingTime?: string;
  division: DivisionType;
  packageCode: string;
  packageName: string;
  basePrice: number;
  selectedAddons: EstimateAddonItem[];
  addonsTotal: number;
  hostingCost: number;
  maintenanceCost: number;
  subtotal: number;
  taxRate: number; // 0.18
  gstAmount: number;
  grandTotal: number;
  notes?: string;
  consentAccepted: boolean;
  status: EstimateStatus;
  assignedConsultant?: string;
  internalNotes?: string;
  meeting?: EstimateConsultationMeeting;
  requirements?: RequirementVerificationSpec;
  proposalId?: string;
  proposalNumber?: string;
  agreementId?: string;
  projectId?: string;
  projectCode?: string;
  createdAt: string;
  validUntil: string; // 30 days
  updatedAt: string;
  history: {
    timestamp: string;
    status: EstimateStatus;
    actor: string;
    note: string;
  }[];
}

const STORAGE_KEY = "starx_customer_estimates_v2";

export function generateEstimateId(): string {
  const year = new Date().getFullYear();
  const counter = Math.floor(100000 + Math.random() * 900000);
  return `STARX-EST-${year}-${counter}`;
}

export function getEstimates(): CustomerEstimate[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const now = new Date();
      const validUntil = new Date(now.getTime() + 30 * 86400000).toISOString();
      const sampleEstimates: CustomerEstimate[] = [
        {
          id: "est-101",
          estimateNumber: "STARX-EST-2026-001042",
          clientName: "Vikram Malhotra",
          clientBusiness: "Nexus Logistics Hub",
          clientEmail: "vikram@nexuslogistics.in",
          clientPhone: "+91 98200 12345",
          preferredContact: "WhatsApp",
          preferredMeetingTime: "Tomorrow 3:00 PM IST",
          division: "combo",
          packageCode: "C2",
          packageName: "Business Combo (Web + Android & iOS)",
          basePrice: 49999,
          selectedAddons: [
            { id: "add-pg", name: "Payment Gateway Integration (Mayank Singh UPI / Razorpay)", price: 4999 },
            { id: "add-push", name: "Push Notification System (OneSignal / FCM)", price: 3999 }
          ],
          addonsTotal: 8998,
          hostingCost: 4999,
          maintenanceCost: 2999,
          subtotal: 63996,
          taxRate: 0.18,
          gstAmount: 11519,
          grandTotal: 75515,
          notes: "Need fast 3-week delivery for upcoming fleet launch in Bengaluru.",
          consentAccepted: true,
          status: "Under Review",
          assignedConsultant: "Aarav Sharma (Principal Architect)",
          internalNotes: "Client validated. Fleet management portal + driver Android app required. Scheduled technical scoping call.",
          meeting: {
            status: "Scheduled",
            preferredTime: "Tomorrow 3:00 PM IST",
            scheduledTime: new Date(Date.now() + 86400000).toISOString(),
            meetingUrl: "https://meet.google.com/starx-nexus-scope",
            consultantName: "Aarav Sharma"
          },
          requirements: {
            businessObjective: "Real-time dispatching and client tracking for 50+ intercity fleet trucks",
            projectType: "Web Dispatch ERP + Native Driver Flutter Application",
            targetAudience: "Fleet operators, corporate clients, drivers",
            requiredScreens: "22 Web Cockpit Screens + 8 Mobile Screens",
            requiredUserRoles: "Super Admin, Dispatch Manager, Driver, Corporate Client",
            customerDashboardReqs: "Consignment tracking, digital waybills, automated PDF invoicing",
            adminDashboardReqs: "Live vehicle telemetry, route optimization, driver payroll, billing",
            requiredIntegrations: "Mayank Singh UPI Gateway, Fastag API, GPS Webhook",
            paymentGatewayReqs: "Advance 40% milestone billing + automated freight settlement",
            databaseReqs: "PostgreSQL with PostGIS geographic coordinates",
            hostingRequirements: "Multi-region edge hosting with automated automated failover",
            securityRequirements: "AES-256 encrypted trip logs, 2FA for fleet directors",
            projectTimeline: "4 Weeks total (Milestone 1 to Handover)"
          },
          proposalId: "prop-101",
          proposalNumber: "STARX-PROP-2026-000101",
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          validUntil,
          updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          history: [
            {
              timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
              status: "Submitted",
              actor: "Customer (Online Calculator)",
              note: "Estimate locked from public interactive calculator"
            },
            {
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              status: "Under Review",
              actor: "Aarav Sharma (Sales Lead)",
              note: "Assigned lead architect and scheduled requirement verification"
            }
          ]
        },
        {
          id: "est-102",
          estimateNumber: "STARX-EST-2026-001043",
          clientName: "Dr. Ananya Roy",
          clientBusiness: "Aura Aesthetics & Dental Care",
          clientEmail: "ananya@auraclinic.in",
          clientPhone: "+91 97111 88223",
          preferredContact: "Phone Call",
          division: "website",
          packageCode: "W3",
          packageName: "Growth Business Website",
          basePrice: 19999,
          selectedAddons: [
            { id: "add-seo", name: "Advanced Local SEO & Schema Architecture", price: 3499 }
          ],
          addonsTotal: 3499,
          hostingCost: 2499,
          maintenanceCost: 0,
          subtotal: 25997,
          taxRate: 0.18,
          gstAmount: 4679,
          grandTotal: 30676,
          notes: "Need online appointment scheduling with instant WhatsApp confirmations.",
          consentAccepted: true,
          status: "Submitted",
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          validUntil,
          updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          history: [
            {
              timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
              status: "Submitted",
              actor: "Customer (Online Calculator)",
              note: "Estimate generated and locked by client"
            }
          ]
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleEstimates));
      return sampleEstimates;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read estimates from storage", err);
    return [];
  }
}

export function saveEstimateToStore(estimate: CustomerEstimate): void {
  if (typeof window === "undefined") return;
  try {
    const list = getEstimates();
    const updated = [estimate, ...list.filter((e) => e.id !== estimate.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save estimate to storage", err);
  }
}

export function getEstimateById(id: string): CustomerEstimate | null {
  const list = getEstimates();
  return list.find((e) => e.id === id || e.estimateNumber === id) || null;
}

export function updateEstimateStatus(
  id: string,
  status: EstimateStatus,
  actor: string = "Admin",
  note: string = ""
): CustomerEstimate | null {
  if (typeof window === "undefined") return null;
  try {
    const list = getEstimates();
    let updatedEstimate: CustomerEstimate | null = null;
    const updated = list.map((e) => {
      if (e.id === id || e.estimateNumber === id) {
        const item: CustomerEstimate = {
          ...e,
          status,
          updatedAt: new Date().toISOString(),
          history: [
            {
              timestamp: new Date().toISOString(),
              status,
              actor,
              note: note || `Status updated to ${status}`
            },
            ...e.history
          ]
        };
        updatedEstimate = item;
        return item;
      }
      return e;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updatedEstimate;
  } catch (err) {
    console.error("Failed to update estimate status", err);
    return null;
  }
}

export function updateEstimateRequirements(
  id: string,
  requirements: RequirementVerificationSpec,
  consultantName: string
): CustomerEstimate | null {
  if (typeof window === "undefined") return null;
  try {
    const list = getEstimates();
    let updatedEstimate: CustomerEstimate | null = null;
    const updated = list.map((e) => {
      if (e.id === id || e.estimateNumber === id) {
        const item: CustomerEstimate = {
          ...e,
          status: "Requirement Clarification",
          requirements: {
            ...requirements,
            verifiedAt: new Date().toISOString(),
            verifiedBy: consultantName
          },
          updatedAt: new Date().toISOString(),
          history: [
            {
              timestamp: new Date().toISOString(),
              status: "Requirement Clarification",
              actor: consultantName,
              note: "Completed comprehensive 17-point requirement verification"
            },
            ...e.history
          ]
        };
        updatedEstimate = item;
        return item;
      }
      return e;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updatedEstimate;
  } catch (err) {
    console.error("Failed to update estimate requirements", err);
    return null;
  }
}
