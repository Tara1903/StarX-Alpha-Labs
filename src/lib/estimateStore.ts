"use client";

import { DivisionType } from "@/data/developmentPackages";

export interface EstimateAddonItem {
  id: string;
  name: string;
  price: number;
}

export interface CustomerEstimate {
  id: string;
  estimateNumber: string;
  clientName: string;
  clientBusiness: string;
  clientEmail: string;
  clientPhone: string;
  division: DivisionType;
  packageCode: string;
  packageName: string;
  basePrice: number;
  selectedAddons: EstimateAddonItem[];
  addonsTotal: number;
  hostingCost: number;
  maintenanceCost: number;
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  notes?: string;
  createdAt: string;
  status: "New" | "Contacted" | "Quotation Issued" | "Archived";
}

const STORAGE_KEY = "starx_customer_estimates";

export function getEstimates(): CustomerEstimate[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const sampleEstimates: CustomerEstimate[] = [
        {
          id: "est-101",
          estimateNumber: "EST-2026-1042",
          clientName: "Vikram Malhotra",
          clientBusiness: "Nexus Logistics Hub",
          clientEmail: "vikram@nexuslogistics.in",
          clientPhone: "+91 98200 12345",
          division: "combo",
          packageCode: "C2",
          packageName: "Business Combo (Web + Android & iOS)",
          basePrice: 49999,
          selectedAddons: [
            { id: "add-pg", name: "Payment Gateway Integration (Razorpay / Stripe)", price: 4999 },
            { id: "add-push", name: "Push Notification System (OneSignal / FCM)", price: 3999 }
          ],
          addonsTotal: 8998,
          hostingCost: 4999,
          maintenanceCost: 2999,
          subtotal: 63996,
          gstAmount: 11519,
          grandTotal: 75515,
          notes: "Need fast 3-week delivery for upcoming fleet launch in Bengaluru.",
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          status: "New"
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

export function updateEstimateStatus(
  id: string,
  status: CustomerEstimate["status"]
): void {
  if (typeof window === "undefined") return;
  try {
    const list = getEstimates();
    const updated = list.map((e) => (e.id === id ? { ...e, status } : e));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to update estimate status", err);
  }
}
