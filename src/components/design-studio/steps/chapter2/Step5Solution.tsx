"use client";

import React, { useState } from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import { DivisionSlug } from "../../types";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Layers,
  ShoppingBag,
  Globe,
  Smartphone,
  Briefcase,
  Cpu,
  Terminal,
  HelpCircle,
} from "lucide-react";

interface SolutionItem {
  id: string;
  name: string;
  description: string;
  badge?: string;
}

const DIVISION_SOLUTIONS: Record<DivisionSlug, SolutionItem[]> = {
  "starx-web": [
    {
      id: "ecommerce-store",
      name: "E-Commerce & Digital Storefront",
      description: "High-conversion product catalogs, cart, multi-currency checkout, and payment gateways.",
      badge: "High Conversion",
    },
    {
      id: "customer-portal",
      name: "Customer & Client Portal",
      description: "Secure authenticated portal for account management, document sharing, and self-service.",
      badge: "Self-Service",
    },
    {
      id: "booking-platform",
      name: "Interactive Booking Engine",
      description: "Real-time calendar availability, appointment scheduling, and automated reminders.",
    },
    {
      id: "marketplace-platform",
      name: "Multi-Vendor Marketplace",
      description: "Dual-sided platform for buyers and sellers with commission splits and dispute resolution.",
      badge: "Multi-Vendor",
    },
    {
      id: "corporate-presence",
      name: "Corporate Web Presence",
      description: "Fast, SEO-dominant institutional web platform with CMS and global CDN distribution.",
    },
    {
      id: "custom-web-app",
      name: "Interactive Web Application",
      description: "Rich client-side Single Page Application with dynamic dashboards and reactive state.",
    },
  ],
  "starx-apps": [
    {
      id: "consumer-mobile-app",
      name: "Direct-to-Consumer App",
      description: "Native iOS and Android consumer mobile experience with push notifications and social features.",
      badge: "Top Rated",
    },
    {
      id: "ondemand-delivery-app",
      name: "On-Demand & Delivery App",
      description: "Live driver GPS tracking, route dispatch, order updates, and mobile wallet integration.",
      badge: "Real-Time GPS",
    },
    {
      id: "b2b-field-app",
      name: "B2B Field & Operational App",
      description: "Offline-capable technician and field ops app with barcode scanning and signature capture.",
    },
    {
      id: "marketplace-app",
      name: "Two-Sided Marketplace App",
      description: "Separate or unified workflows for service providers and end consumers.",
    },
    {
      id: "social-community-app",
      name: "Community & Membership App",
      description: "Feeds, messaging, member directories, gated multimedia, and event check-in.",
    },
    {
      id: "enterprise-companion-app",
      name: "Enterprise Companion App",
      description: "Secure employee mobile tools synced with internal SSO and backend ERPs.",
    },
  ],
  "starx-business": [
    {
      id: "pos-billing",
      name: "Cloud & Offline POS Terminal",
      description: "Lightning-fast checkout, barcode scanning, split bills, receipts, and cash drawer sync.",
      badge: "Offline Ready",
    },
    {
      id: "inventory-warehouse",
      name: "Inventory & Warehouse Engine",
      description: "Multi-warehouse stock levels, SKU tracking, low-stock reorder automation, and audits.",
      badge: "Multi-Location",
    },
    {
      id: "crm-operations",
      name: "Operational CRM & Lead Pipeline",
      description: "Customer lifecycle tracking, sales pipelines, task management, and communication logs.",
    },
    {
      id: "restaurant-pos",
      name: "Restaurant & Kitchen KDS",
      description: "Table floor maps, Kitchen Display Systems, modifier menus, and digital menus.",
    },
    {
      id: "erp-suite",
      name: "Enterprise Resource Planning (ERP)",
      description: "Unified finance, procurement, human resources, and vendor management.",
    },
    {
      id: "business-automation",
      name: "Workflow & Billing Automation",
      description: "Recurring invoicing, automated tax compliance, payment reconciliations, and alerts.",
    },
  ],
  "starx-saas": [
    {
      id: "b2b-subscription-saas",
      name: "Multi-Tenant B2B SaaS Platform",
      description: "Tenant isolation, role-based workspaces, seat-based billing, and Stripe webhook handling.",
      badge: "Scalable B2B",
    },
    {
      id: "workflow-automation",
      name: "Workflow & Process Automation",
      description: "Trigger-action workflow engines, scheduled automation tasks, and webhook integrations.",
    },
    {
      id: "analytics-kpi-dashboard",
      name: "BI & Analytics Dashboard",
      description: "Real-time metrics, interactive charts, cohort tracking, and automated PDF export.",
    },
    {
      id: "developer-api-saas",
      name: "Developer API & Webhook Service",
      description: "API key generation, rate limiting, OpenAPI documentation, and usage metering.",
    },
    {
      id: "team-collaboration-tool",
      name: "Team Collaboration Workspace",
      description: "Real-time document editing, team channels, permission control, and activity auditing.",
    },
    {
      id: "custom-cloud-software",
      name: "Specialized Cloud Platform",
      description: "Custom software tailored to industry-specific operational standards and compliance.",
    },
  ],
  "starx-ai": [
    {
      id: "autonomous-ai-agents",
      name: "Autonomous Agent Swarms",
      description: "Multi-agent systems executing coordinated asynchronous workflows, research, and coding.",
      badge: "Autonomous",
    },
    {
      id: "enterprise-rag-engine",
      name: "Enterprise RAG & Document Search",
      description: "Vector database embeddings, hybrid search, semantic chunking, and cited answers.",
      badge: "Vector Embeddings",
    },
    {
      id: "conversational-copilot",
      name: "Conversational Voice & Chat Copilot",
      description: "Real-time voice and text copilots grounded in your domain context and internal APIs.",
    },
    {
      id: "document-intelligence-ocr",
      name: "Intelligent Document & Invoice OCR",
      description: "Automated parsing of invoices, contracts, receipts, and forms into validated JSON.",
    },
    {
      id: "predictive-analytics-ai",
      name: "Predictive AI & Decision Engine",
      description: "Classification, churn prevention, anomaly detection, and demand forecasting models.",
    },
    {
      id: "bespoke-ai-microservice",
      name: "Bespoke AI Pipeline",
      description: "Custom fine-tuned open-source models, LoRA adapters, and sandboxed AI execution.",
    },
  ],
  "starx-custom": [
    {
      id: "enterprise-system-integration",
      name: "Enterprise System Integration",
      description: "Bridges legacy mainframe databases, SAP/Salesforce APIs, and modern cloud stacks.",
      badge: "High Security",
    },
    {
      id: "iot-telemetry-gateway",
      name: "Hardware & IoT Telemetry Gateway",
      description: "MQTT and WebSocket brokers ingesting millions of telemetry events per minute.",
    },
    {
      id: "bespoke-protocol-engine",
      name: "Bespoke Protocol & High-Throughput Engine",
      description: "Low-latency streaming architectures in Go or Rust with zero-allocation buffers.",
    },
    {
      id: "legacy-modernization",
      name: "Legacy System Replatforming",
      description: "Step-by-step strangler fig migration from monoliths to cloud-native micro-services.",
    },
    {
      id: "cloud-infrastructure-iac",
      name: "Dedicated Cloud & Kubernetes IaC",
      description: "Terraform/Pulumi automated multi-region deployments with zero-trust networking.",
    },
    {
      id: "custom-engineering-bespoke",
      name: "Fully Custom Architecture",
      description: "Bespoke engineering solving novel technical challenges outside standard categories.",
    },
  ],
};

export function Step5Solution() {
  const { state, setSolution, nextStep } = useDesignStudio();
  const primaryDivision = state.primaryDivision || "starx-web";
  const solutions = DIVISION_SOLUTIONS[primaryDivision] || DIVISION_SOLUTIONS["starx-web"];
  const selectedSolution = state.solutionCategory;

  const [customSolutionName, setCustomSolutionName] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleSelect = (id: string, name: string) => {
    setShowCustomInput(false);
    setSolution(id, name);
  };

  const handleCustomSubmit = () => {
    if (customSolutionName.trim()) {
      setSolution("custom-bespoke", customSolutionName.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Chapter 2 • Step 5 of 16
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          What Are We Creating Together?
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Choose the solution model that best matches your target product for{" "}
          <span className="text-cyan-400 font-semibold">{primaryDivision.toUpperCase()}</span> in the{" "}
          <span className="text-cyan-400 font-semibold">{state.industry.toUpperCase()}</span> sector.
        </p>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {solutions.map((item) => {
          const isSelected = selectedSolution === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleSelect(item.id, item.name)}
              className={`group relative rounded-xl p-5 transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                isSelected
                  ? "bg-gradient-to-b from-cyan-500/15 via-blue-500/5 to-transparent border-cyan-400 shadow-[0_0_25px_rgba(0,217,255,0.2)] ring-1 ring-cyan-400"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </h3>
                  {item.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 group-hover:text-zinc-300">
                  {isSelected ? "Selected Model" : "Select Model"}
                </span>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors ${
                    isSelected
                      ? "bg-cyan-400 text-black font-bold"
                      : "border border-zinc-600 group-hover:border-zinc-400"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bespoke / Custom Option */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              Building something unique or not listed above?
            </h4>
            <p className="text-xs text-zinc-400">
              Specify your bespoke product type and our solution architect will construct custom requirements.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCustomInput(!showCustomInput)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-cyan-300 transition-colors"
          >
            {showCustomInput ? "Cancel" : "Define Custom Solution"}
          </button>
        </div>

        {showCustomInput && (
          <div className="mt-4 pt-4 border-t border-white/10 flex gap-3">
            <input
              type="text"
              value={customSolutionName}
              onChange={(e) => setCustomSolutionName(e.target.value)}
              placeholder="e.g. AI-Powered Medical Device Telemetry Platform"
              className="flex-1 px-4 py-2 text-xs rounded-xl bg-black/40 border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="button"
              onClick={handleCustomSubmit}
              disabled={!customSolutionName.trim()}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs disabled:opacity-50 transition-colors"
            >
              Apply Custom
            </button>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>
            Solution Archetype: <strong className="text-white">{selectedSolution}</strong>
          </span>
        </div>

        <button
          type="button"
          onClick={nextStep}
          disabled={!selectedSolution}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer disabled:opacity-50"
        >
          <span>Continue to Platform Selection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
