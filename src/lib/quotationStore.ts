"use client";

import { createProjectFromQuotation } from "./projectStore";

export interface QuotationLineItem {
  id: string;
  category: "Development" | "Hosting & Cloud" | "Integrations & APIs" | "Maintenance & SLA";
  title: string;
  description: string;
  amount: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  clientName: string;
  clientBusiness: string;
  clientEmail: string;
  clientPhone: string;
  selectedSolution: string;
  projectScope: string;
  modules: string[];
  features: string[];
  items: QuotationLineItem[];
  subtotal: number;
  taxRate: number; // 0.18 for 18% GST
  taxAmount: number;
  totalAmount: number;
  paymentSchedule: string;
  deliveryTimeline: string;
  termsAndConditions: string[];
  status: "Draft" | "Sent" | "Approved" | "Rejected" | "Modification Requested";
  customerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "starx_quotations";

export function getQuotations(): Quotation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial: Quotation[] = [
        {
          id: "qt-101",
          quotationNumber: "SXQ-2026-001",
          clientName: "Rajesh Kumar",
          clientBusiness: "Spice Garden Chains",
          clientEmail: "rajesh@spicegarden.in",
          clientPhone: "+91 98765 43210",
          selectedSolution: "Restaurant Website & Multi-Outlet POS (Model #1 & #6)",
          projectScope: "End-to-end digital ordering, kitchen order tickets (KOT) and billing POS system for 4 physical restaurant outlets in Mumbai.",
          modules: ["Public QR Digital Menu", "Kitchen Display System (KDS)", "Multi-Outlet POS Billing", "Delivery Dispatch API"],
          features: ["Table QR Ordering", "Real-time KOT Dispatch", "Split Billing & UPI Payments", "Inventory Depletion Alerts"],
          items: [
            { id: "i1", category: "Development", title: "Core Ordering & Kitchen Display Engineering", description: "Next.js 16 + React 19 + Supabase real-time KOT engine", amount: 65000 },
            { id: "i2", category: "Integrations & APIs", title: "Payment Gateway & Thermal Printer API", description: "Razorpay webhooks & ESC/POS printer driver integration", amount: 15000 },
            { id: "i3", category: "Hosting & Cloud", title: "Enterprise High-Availability Edge Setup", description: "Multi-region Supabase PostgreSQL & CDN edge deployment", amount: 8000 },
            { id: "i4", category: "Maintenance & SLA", title: "12-Month Priority SLA & System Patches", description: "24/7 uptime monitoring & rapid incident response", amount: 12000 }
          ],
          subtotal: 100000,
          taxRate: 0.18,
          taxAmount: 18000,
          totalAmount: 118000,
          paymentSchedule: "40% Advance on Kickoff, 40% on UAT Approval, 20% on Production Handover",
          deliveryTimeline: "3-4 Weeks from Requirement Signoff",
          termsAndConditions: [
            "Source code ownership transferred upon final milestone clearance.",
            "Includes 30 days post-launch hypercare and staff onboarding.",
            "Hosting and third-party SMS/WhatsApp gateway charges billed directly to client accounts.",
            "Scope variations beyond the approved architecture are subject to sprint addendums."
          ],
          status: "Sent",
          createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveQuotation(quote: Omit<Quotation, "id" | "quotationNumber" | "status" | "createdAt" | "updatedAt">): Quotation {
  const all = getQuotations();
  const count = all.length + 1;
  const newEntry: Quotation = {
    ...quote,
    id: `qt-${Date.now().toString(36)}`,
    quotationNumber: `SXQ-2026-${count.toString().padStart(3, "0")}`,
    status: "Sent",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const updated = [newEntry, ...all];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return newEntry;
}

export function updateQuotationStatus(id: string, status: Quotation["status"], notes?: string): Quotation | null {
  const all = getQuotations();
  let updatedItem: Quotation | null = null;
  const updated = all.map((item) => {
    if (item.id === id) {
      updatedItem = {
        ...item,
        status,
        ...(notes ? { customerNotes: notes } : {}),
        updatedAt: new Date().toISOString()
      };
      return updatedItem;
    }
    return item;
  });

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  // If approved, automatically create a Project!
  if (status === "Approved" && updatedItem) {
    createProjectFromQuotation(updatedItem);
  }

  return updatedItem;
}
