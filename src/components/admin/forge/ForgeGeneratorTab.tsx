"use client";

import React, { useState } from "react";
import type { ForgeDemoRecord } from "@/lib/forge/types";
import { DEMO_CATEGORIES } from "@/data/categories";
import { CheckCircle2, FileText, Sparkles } from "lucide-react";

interface ForgeGeneratorTabProps {
  demos: ForgeDemoRecord[];
  preselectedDemoId?: string;
  onCreateCustomDemo: (payload: Record<string, unknown>) => Promise<ForgeDemoRecord>;
  onLaunchJob: (demoId: string, inputConfig: Record<string, unknown>) => Promise<void>;
}

export function ForgeGeneratorTab({
  demos,
  preselectedDemoId,
  onCreateCustomDemo,
  onLaunchJob,
}: ForgeGeneratorTabProps) {
  const initialDemo = demos.find((d) => d.id === preselectedDemoId) || demos[0];
  const [mode, setMode] = useState<"catalogue" | "custom">("catalogue");
  const [selectedDemoId, setSelectedDemoId] = useState<string>(initialDemo?.id || "");
  const [showBriefConfirm, setShowBriefConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states (sensible defaults auto-filled from initial catalogue demo)
  const [businessName, setBusinessName] = useState(initialDemo?.businessName || "");
  const [industry, setIndustry] = useState(initialDemo?.industry || DEMO_CATEGORIES[0]?.name || "Food & Hospitality");
  const [categorySlug, setCategorySlug] = useState(initialDemo?.categorySlug || DEMO_CATEGORIES[0]?.slug || "food-hospitality");
  const [description, setDescription] = useState(initialDemo?.description || "");
  const [targetCustomers, setTargetCustomers] = useState(initialDemo?.targetAudience || "");
  const [workflowsText, setWorkflowsText] = useState(
    initialDemo ? initialDemo.workflows.map((w) => `${w.title}: ${w.description}`).join("\n") : ""
  );
  const [designPreferences, setDesignPreferences] = useState(initialDemo?.designDirection || "");
  const [functionalReqsText, setFunctionalReqsText] = useState(
    initialDemo ? initialDemo.featureRequirements.join(", ") : ""
  );
  const [specialInstructions, setSpecialInstructions] = useState("");

  const applyCatalogueDemo = (demoId: string) => {
    setSelectedDemoId(demoId);
    const target = demos.find((d) => d.id === demoId);
    if (!target) return;
    setBusinessName(target.businessName);
    setIndustry(target.industry);
    setCategorySlug(target.categorySlug);
    setDescription(target.description);
    setTargetCustomers(target.targetAudience);
    setWorkflowsText(target.workflows.map((w) => `${w.title}: ${w.description}`).join("\n"));
    setDesignPreferences(target.designDirection);
    setFunctionalReqsText(target.featureRequirements.join(", "));
  };

  const handleModeSwitch = (nextMode: "catalogue" | "custom") => {
    setMode(nextMode);
    if (nextMode === "catalogue") {
      applyCatalogueDemo(selectedDemoId || demos[0]?.id || "");
    } else {
      setBusinessName("");
      setDescription("");
      setTargetCustomers("Operations Managers, Staff & End Customers");
      setWorkflowsText(
        "Primary Operations Console: Manage daily records and status updates.\nCustomer Self-Service Portal: Real-time tracking & requests.\nAnalytics & Audit Reporting: Exportable KPIs and operational filters."
      );
      setDesignPreferences("Distinct domain-matched palette, WCAG AA contrast, responsive mobile-first dashboard.");
      setFunctionalReqsText("Role Switcher, Live Search & Filtering, CRUD Sandbox Persistence, Reset Seed Data");
    }
  };

  const handleConfirmAndExecute = async () => {
    setSubmitting(true);
    try {
      let targetId = selectedDemoId;
      if (mode === "custom") {
        const created = await onCreateCustomDemo({
          businessName,
          industry,
          categorySlug,
          description,
          targetCustomers,
          designPreferences,
          workflows: workflowsText
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean),
          functionalRequirements: functionalReqsText
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean),
        });
        targetId = created.id;
      }

      await onLaunchJob(targetId, {
        mode,
        businessName,
        industry,
        categorySlug,
        description,
        targetCustomers,
        workflows: workflowsText
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean),
        designPreferences,
        functionalRequirements: functionalReqsText
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
        specialInstructions,
      });
      setShowBriefConfirm(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-5xl">
      {/* Mode Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => handleModeSwitch("catalogue")}
          className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
            mode === "catalogue"
              ? "bg-[#087BFF]/20 border-[#00D9FF] shadow-lg shadow-[#087BFF]/20"
              : "bg-[#071638]/80 border-white/10 hover:border-white/25"
          }`}
        >
          <div className="text-sm font-extrabold text-white">1. Generate Existing Catalogue Demo</div>
          <p className="text-xs text-slate-300 mt-1">
            Select any of the 160 pre-registered businesses — workflows, audience, and branding auto-populate instantly.
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleModeSwitch("custom")}
          className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
            mode === "custom"
              ? "bg-[#087BFF]/20 border-[#00D9FF] shadow-lg shadow-[#087BFF]/20"
              : "bg-[#071638]/80 border-white/10 hover:border-white/25"
          }`}
        >
          <div className="text-sm font-extrabold text-white">2. Create New Custom Demo</div>
          <p className="text-xs text-slate-300 mt-1">
            Launch an unpublished custom business vertical with sensible engineering &amp; QA defaults.
          </p>
        </button>
      </div>

      {/* Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-5">
        {mode === "catalogue" ? (
          <div>
            <label className="block text-xs font-mono uppercase text-[#00D9FF] mb-2">
              Select Target Business From 160-Demo Catalogue
            </label>
            <select
              value={selectedDemoId}
              onChange={(e) => applyCatalogueDemo(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#05112A] border border-white/15 text-sm text-white focus:outline-none focus:border-[#00D9FF]"
            >
              {demos.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.catalogId ? `#${d.catalogId} — ` : "[Custom] "}
                  {d.businessName} ({d.industry})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">Business Name *</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Apex Cold-Chain Logistics"
                className="w-full px-4 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">Industry Category *</label>
              <select
                value={categorySlug}
                onChange={(e) => {
                  setCategorySlug(e.target.value);
                  const found = DEMO_CATEGORIES.find((c) => c.slug === e.target.value);
                  if (found) setIndustry(found.name);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
              >
                {DEMO_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">Business Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">Target Customers</label>
            <textarea
              rows={3}
              value={targetCustomers}
              onChange={(e) => setTargetCustomers(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Required Workflows (1 per line)
            </label>
            <textarea
              rows={4}
              value={workflowsText}
              onChange={(e) => setWorkflowsText(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Design Preferences &amp; Visual Direction
            </label>
            <textarea
              rows={4}
              value={designPreferences}
              onChange={(e) => setDesignPreferences(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Functional Requirements (comma separated)
            </label>
            <input
              type="text"
              value={functionalReqsText}
              onChange={(e) => setFunctionalReqsText(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Special Instructions (Optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any specific regional focus, pricing rules, or role flows..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 flex justify-end">
          <button
            type="button"
            disabled={!businessName.trim()}
            onClick={() => setShowBriefConfirm(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-extrabold text-xs shadow-lg shadow-[#087BFF]/30 hover:brightness-110 disabled:opacity-40 inline-flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Review Generation Brief &amp; Approve Execution →</span>
          </button>
        </div>
      </div>

      {/* Pre-execution Generation Brief Approval Modal */}
      {showBriefConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A1940] border border-[#00D9FF]/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 text-[#00D9FF] font-mono text-xs uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Generation Brief Approval</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">{businessName}</h3>
            <div className="p-4 rounded-2xl bg-[#05112A] border border-white/10 space-y-2 text-xs text-slate-200">
              <div><strong className="text-white">Pipeline:</strong> 13-Stage Stitch MCP + Antigravity Implementation + Automated QA</div>
              <div><strong className="text-white">Industry:</strong> {industry}</div>
              <div><strong className="text-white">Target Audience:</strong> {targetCustomers}</div>
              <div><strong className="text-white">Design Direction:</strong> {designPreferences}</div>
              <div><strong className="text-white">QA Gate:</strong> Visual Contrast, Workflow Coverage, Seed Isolation &amp; Security Checks</div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowBriefConfirm(false)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 cursor-pointer"
              >
                Back to Edit
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleConfirmAndExecute}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-extrabold text-xs inline-flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{submitting ? "Dispatching Job..." : "Approve & Launch Generation Job"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
