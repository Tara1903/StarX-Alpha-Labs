"use client";

import React, { useState } from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import { FeatureRequirement } from "../../types";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Search,
  Lock,
  CreditCard,
  Layers,
  Cpu,
  BarChart3,
  FileCheck,
} from "lucide-react";

interface FeatureCatalogItem {
  id: string;
  category: "auth" | "commerce" | "ops" | "ai";
  name: string;
  description: string;
  defaultPriority: "must_have" | "important" | "nice_to_have";
}

const CATALOG_FEATURES: FeatureCatalogItem[] = [
  // Auth
  {
    id: "auth_rbac",
    category: "auth",
    name: "Role-Based Access Control (RBAC)",
    description: "Granular permission sets for Admins, Staff, and Clients with session timeout enforcement.",
    defaultPriority: "must_have",
  },
  {
    id: "social_login",
    category: "auth",
    name: "OAuth & Passwordless Sign-In",
    description: "Google, Apple, and Email OTP magic links for frictionless user onboarding.",
    defaultPriority: "important",
  },
  {
    id: "audit_logging",
    category: "auth",
    name: "Comprehensive Audit Logs",
    description: "Immutable compliance log tracking all write operations, logins, and permission changes.",
    defaultPriority: "important",
  },
  {
    id: "multi_factor_auth",
    category: "auth",
    name: "Two-Factor Authentication (2FA)",
    description: "TOTP authenticator app and SMS verification for privileged admin actions.",
    defaultPriority: "important",
  },

  // Commerce
  {
    id: "product_catalog",
    category: "commerce",
    name: "Dynamic Catalog & SKU Management",
    description: "Product variants, image galleries, category hierarchies, and discount matrices.",
    defaultPriority: "must_have",
  },
  {
    id: "cart_checkout",
    category: "commerce",
    name: "High-Speed Cart & Checkout",
    description: "Multi-currency checkout supporting Stripe, Razorpay, UPI, Apple Pay, and Google Pay.",
    defaultPriority: "must_have",
  },
  {
    id: "subscription_billing",
    category: "commerce",
    name: "Automated Recurring Subscriptions",
    description: "Dunning management, proration, seat upgrades, and self-service customer billing portal.",
    defaultPriority: "important",
  },
  {
    id: "tax_invoicing",
    category: "commerce",
    name: "Automated GST / VAT Invoicing",
    description: "Compliant PDF invoice generation with sequential numbering and accounting sync.",
    defaultPriority: "important",
  },

  // Operations
  {
    id: "realtime_sync",
    category: "ops",
    name: "Real-Time WebSocket State Sync",
    description: "Instant data updates across connected tabs without manual page refreshing.",
    defaultPriority: "must_have",
  },
  {
    id: "inventory_tracking",
    category: "ops",
    name: "Multi-Location Inventory Tracking",
    description: "Real-time stock deduction, low-stock threshold warnings, and warehouse transfers.",
    defaultPriority: "important",
  },
  {
    id: "cloud_file_storage",
    category: "ops",
    name: "Secure Cloud File Management",
    description: "Direct-to-S3/Supabase presigned file uploads with virus scanning and CDN caching.",
    defaultPriority: "important",
  },
  {
    id: "analytics_reporting",
    category: "ops",
    name: "Interactive BI Analytics & Reports",
    description: "Visual time-series charts, conversion funnels, and one-click CSV / Excel exports.",
    defaultPriority: "important",
  },

  // AI
  {
    id: "ai_copilot_assistant",
    category: "ai",
    name: "Intelligent Conversational Copilot",
    description: "Context-aware AI chatbot helping users navigate data and answer support queries.",
    defaultPriority: "important",
  },
  {
    id: "rag_vector_search",
    category: "ai",
    name: "Enterprise RAG Document Search",
    description: "Vector database indexing across PDFs, manuals, and internal documentation.",
    defaultPriority: "important",
  },
  {
    id: "document_ocr_pipeline",
    category: "ai",
    name: "Automated Document & Receipt OCR",
    description: "AI extraction of structured JSON from receipts, invoices, and physical IDs.",
    defaultPriority: "nice_to_have",
  },
  {
    id: "predictive_recommendations",
    category: "ai",
    name: "Predictive Analytics & Recommendations",
    description: "ML recommendation engine boosting conversion and personalized product feeds.",
    defaultPriority: "nice_to_have",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Features", icon: Layers },
  { id: "auth", label: "Security & Auth", icon: Lock },
  { id: "commerce", label: "Commerce & Billing", icon: CreditCard },
  { id: "ops", label: "Operations & Data", icon: BarChart3 },
  { id: "ai", label: "AI & Intelligence", icon: Cpu },
];

export function Step9Features() {
  const { state, setFeatureRequirements, nextStep } = useDesignStudio();
  const selectedFeatures = state.featureRequirements || [];
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const isFeatureSelected = (id: string) => selectedFeatures.some((f) => f.featureId === id);

  const getPriority = (id: string) => {
    const found = selectedFeatures.find((f) => f.featureId === id);
    return found ? found.priority : "must_have";
  };

  const toggleFeature = (item: FeatureCatalogItem) => {
    if (isFeatureSelected(item.id)) {
      setFeatureRequirements(selectedFeatures.filter((f) => f.featureId !== item.id));
    } else {
      const newFeature: FeatureRequirement = {
        featureId: item.id,
        name: item.name,
        priority: item.defaultPriority,
        category: item.category,
      };
      setFeatureRequirements([...selectedFeatures, newFeature]);
    }
  };

  const changePriority = (
    id: string,
    priority: "must_have" | "important" | "nice_to_have",
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setFeatureRequirements(
      selectedFeatures.map((f) => (f.featureId === id ? { ...f, priority } : f))
    );
  };

  const filteredFeatures = CATALOG_FEATURES.filter((item) => {
    if (activeCategory !== "all" && item.category !== activeCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Chapter 2 • Step 9 of 16
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          What Should Your Solution Be Able to Do?
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Select features and assign their priority level. This directly informs the deterministic plan recommendation engine in Step 13.
        </p>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,217,255,0.4)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter features..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFeatures.map((item) => {
          const selected = isFeatureSelected(item.id);
          const priority = getPriority(item.id);

          return (
            <div
              key={item.id}
              onClick={() => toggleFeature(item)}
              className={`group relative rounded-xl p-5 transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                selected
                  ? "bg-gradient-to-b from-cyan-500/15 via-blue-500/5 to-transparent border-cyan-400 shadow-[0_0_20px_rgba(0,217,255,0.2)] ring-1 ring-cyan-400"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </h3>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors shrink-0 ${
                      selected
                        ? "bg-cyan-400 text-black font-bold"
                        : "border border-zinc-600 group-hover:border-zinc-400"
                    }`}
                  >
                    {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Priority Selector when selected */}
              {selected && (
                <div className="pt-3 mt-3 border-t border-cyan-500/20 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-cyan-300">
                    Priority Level:
                  </span>
                  <div className="flex gap-1">
                    {(["must_have", "important", "nice_to_have"] as const).map((p) => {
                      const isP = priority === p;
                      const label =
                        p === "must_have"
                          ? "Must Have"
                          : p === "important"
                          ? "Important"
                          : "Nice to Have";
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={(e) => changePriority(item.id, p, e)}
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md transition-all ${
                            isP
                              ? p === "must_have"
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                                : p === "important"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : "bg-white/5 text-zinc-500 hover:text-zinc-300"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>
            Selected: <strong className="text-white">{selectedFeatures.length} Features</strong> (
            {selectedFeatures.filter((f) => f.priority === "must_have").length} Must Have)
          </span>
        </div>

        <button
          type="button"
          onClick={nextStep}
          disabled={selectedFeatures.length === 0}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer disabled:opacity-50"
        >
          <span>Continue to Workflows & Integrations</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
