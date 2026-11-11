/**
 * STARX ECOSYSTEM CENTRAL PRODUCT REGISTRY & REPOSITORY
 * 
 * Strict Independence Architecture Enforced:
 * - StarX Alpha Labs (Technology & Custom Engineering Company)
 * - STARX FLOW (Independent Commercial AI Business Operating System)
 * 
 * NO shared databases, NO shared authentication, NO shared credentials.
 * External public navigation and non-sensitive attribution only.
 */

import { SITE_CONFIG } from "@/lib/constants";
import { getStarxFlowDestinationUrl, ReferralParams } from "@/lib/ecosystem";

export type ProductStatus = "live" | "beta" | "in_development" | "concept";

export interface EcosystemProduct {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  category: "Business AI & Automation" | "Custom Engineering" | "Enterprise Tools";
  destinationUrl: string;
  getReferralUrl: (params?: ReferralParams) => string;
  status: ProductStatus;
  isFeatured: boolean;
  isIndependent: boolean;
  ctaLabel: string;
  badge: string;
  displayOrder: number;
  verifiedCapabilities: {
    title: string;
    description: string;
    tag: string;
  }[];
  architectureSeparation: {
    database: string;
    auth: string;
    infrastructure: string;
    dataPolicy: string;
  };
}

export const ECOSYSTEM_PRODUCTS: EcosystemProduct[] = [
  {
    id: "starx-flow",
    name: "STARX FLOW",
    slug: "flow",
    tagline: "Autonomous AI-Powered Business Operating System",
    shortDescription: "An independent commercial AI operating system designed for local businesses, featuring 24/7 AI receptionists, omnichannel inbox, automated lead pipelines, and operational workflows.",
    fullDescription: "STARX FLOW provides an out-of-the-box commercial platform that acts as an autonomous digital front desk and operations engine. Unlike custom software engineering, STARX FLOW is immediately deployable with pre-trained AI receptionists, WhatsApp business automation, and CRM synchronization.",
    category: "Business AI & Automation",
    destinationUrl: SITE_CONFIG.ecosystem.starxFlowUrl,
    getReferralUrl: (params?: ReferralParams) => getStarxFlowDestinationUrl({
      source: params?.source || "starx_alpha_labs",
      campaign: params?.campaign || "ecosystem_directory",
      medium: params?.medium || "referral",
      feature: params?.feature || "general",
    }),
    status: "live",
    isFeatured: true,
    isIndependent: true,
    ctaLabel: "Explore STARX FLOW",
    badge: "Flagship Independent Product",
    displayOrder: 1,
    verifiedCapabilities: [
      {
        title: "24/7 Autonomous AI Receptionist",
        description: "Inbound phone call answering, natural conversational qualification, and real-time appointment booking around the clock.",
        tag: "Zero-Latency Voice/Chat",
      },
      {
        title: "Omnichannel Inbox & WhatsApp Automation",
        description: "Unified communication stream syncing WhatsApp, SMS, Web Chat, and Social DMs with automated intelligent replies.",
        tag: "Unified Messaging",
      },
      {
        title: "Smart CRM & Automated Lead Pipeline",
        description: "Automatic lead capture, deal progression stages, and trigger-based follow-up sequences that prevent lost revenue.",
        tag: "Auto-Qualification",
      },
      {
        title: "Operational Workflow & Task Automation",
        description: "Automated calendar synchronization, document handoff, invoice follow-ups, and customer feedback collection.",
        tag: "Hands-Free Operations",
      },
      {
        title: "Business Knowledge Base Training",
        description: "Ingests specific business services, pricing tables, operational hours, and FAQs for accurate, on-brand responses.",
        tag: "Custom AI Memory",
      },
    ],
    architectureSeparation: {
      database: "Dedicated isolated PostgreSQL / Supabase instance separate from StarX Alpha Labs.",
      auth: "Independent user accounts, sessions, and JWT secrets. No SSO or shared login.",
      infrastructure: "Decoupled cloud deployment and domain (flow.starx.io).",
      dataPolicy: "Zero customer PII or transaction data synchronized between platforms.",
    },
  },
];

/**
 * Returns all active ecosystem products sorted by display order.
 */
export function getActiveEcosystemProducts(): EcosystemProduct[] {
  return ECOSYSTEM_PRODUCTS.filter((p) => p.status === "live" || p.status === "beta").sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
}

/**
 * Retrieves a single product by ID.
 */
export function getEcosystemProductById(id: string): EcosystemProduct | undefined {
  return ECOSYSTEM_PRODUCTS.find((p) => p.id === id || p.slug === id);
}
