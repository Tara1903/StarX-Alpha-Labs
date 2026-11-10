import { Metadata } from "next";
import { CustomerPortalClient } from "./CustomerPortalClient";

export const metadata: Metadata = {
  title: "Customer Acquisition & Quotation Hub — StarX Alpha Labs",
  description: "Customer self-service portal: Review technical quotations, track 8-stage project milestones, and manage demo inquiries.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CustomerPage() {
  return <CustomerPortalClient />;
}
