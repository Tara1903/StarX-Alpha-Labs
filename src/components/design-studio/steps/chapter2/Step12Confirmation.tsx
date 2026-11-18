"use client";

import React, { useState } from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Layers,
  Globe,
  Users,
  Check,
  AlertCircle,
  HelpCircle,
  Loader2,
} from "lucide-react";

export function Step12Confirmation() {
  const { state, confirmSpecification, evaluateRecommendation, nextStep } = useDesignStudio();
  const [confirmed, setConfirmed] = useState(state.requirementSpecification?.isConfirmed || false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Clarification questions answered by customer
  const [clarifications, setClarifications] = useState({
    userApproval: "auto",
    paymentTiming: "instant",
  });

  const handleConfirmAndProceed = async () => {
    if (!confirmed) {
      setErrorMsg("Please check the confirmation box to verify your requirements before receiving commercial plan recommendations.");
      return;
    }

    setIsEvaluating(true);
    setErrorMsg(null);

    try {
      confirmSpecification();
      await evaluateRecommendation();
      nextStep();
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to calculate plan recommendations. Please try again.");
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Chapter 2 • Step 12 of 16
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          Let's Make Sure We Understand Your Idea.
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Review your structured project specification synthesized from Steps 3–11. Confirming your requirements unlocks deterministic plan matching and AI justifications.
        </p>
      </div>

      {/* Structured Specification Review Card */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 backdrop-blur-xl space-y-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              Project Specification Blueprint
            </h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono">
            ID: DS-{state.sessionToken ? state.sessionToken.slice(0, 8).toUpperCase() : "2026-ACTIVE"}
          </span>
        </div>

        {/* 2-Column Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">
              Customer & Contact
            </span>
            <p className="font-bold text-white text-sm">
              {state.account.fullName || state.profile.fullName || "StarX Customer"}
            </p>
            <p className="text-zinc-400">{state.account.email}</p>
            <p className="text-zinc-400">
              {state.profile.countryCode} {state.profile.mobileNumber}
            </p>
          </div>

          <div className="space-y-1 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">
              Ecosystem & Sector
            </span>
            <p className="font-bold text-white text-sm">
              {state.primaryDivision.toUpperCase()} • {state.industry.toUpperCase()}
            </p>
            <p className="text-cyan-400 font-medium">
              Solution: {state.solutionCategory}
            </p>
            <p className="text-zinc-400">
              Platforms: {state.platforms.join(", ").toUpperCase()}
            </p>
          </div>

          <div className="space-y-1 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 md:col-span-2">
            <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">
              Core Product Vision (Customer Verbatim)
            </span>
            <p className="text-zinc-200 text-xs italic leading-relaxed">
              "{state.ideaDescription || "Custom digital solution designed with StarX Alpha Labs."}"
            </p>
          </div>

          <div className="space-y-1 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">
              User Personas & Access Control
            </span>
            <p className="font-bold text-white">
              {state.userRoles.length} Defined Personas
            </p>
            <p className="text-zinc-400 line-clamp-2">
              {state.userRoles.join(", ")}
            </p>
          </div>

          <div className="space-y-1 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">
              Feature Scope & Third-Party Connectors
            </span>
            <p className="font-bold text-white">
              {state.featureRequirements.length} Features • {state.integrations.length} Integrations
            </p>
            <p className="text-zinc-400 line-clamp-2">
              Integrations: {state.integrations.join(", ")}
            </p>
          </div>
        </div>

        {/* AI Clarification Questions */}
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/15 p-4 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>AI Architecture Clarification Check</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">
                Customer Registration Flow:
              </label>
              <select
                value={clarifications.userApproval}
                onChange={(e) =>
                  setClarifications({ ...clarifications, userApproval: e.target.value })
                }
                className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
              >
                <option value="auto">Instant Self-Serve Registration</option>
                <option value="admin_approval">Admin Manual Approval Required</option>
                <option value="invite_only">Invite-Only Access</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">
                Payment & Fulfillment Flow:
              </label>
              <select
                value={clarifications.paymentTiming}
                onChange={(e) =>
                  setClarifications({ ...clarifications, paymentTiming: e.target.value })
                }
                className="w-full p-2 rounded-lg bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
              >
                <option value="instant">Instant Payment Capture upon Order</option>
                <option value="escrow">Escrow & Release upon Milestone Completion</option>
                <option value="invoice">Post-Order Net-30 Invoicing</option>
              </select>
            </div>
          </div>
        </div>

        {/* Explicit Confirmation Checkbox */}
        <div
          onClick={() => setConfirmed(!confirmed)}
          className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
            confirmed
              ? "bg-emerald-500/10 border-emerald-500/30"
              : "bg-white/[0.02] border-white/10 hover:border-white/20"
          }`}
        >
          <div
            className={`w-5 h-5 rounded flex items-center justify-center text-xs transition-colors shrink-0 mt-0.5 ${
              confirmed
                ? "bg-emerald-500 text-black font-bold"
                : "border border-zinc-600"
            }`}
          >
            {confirmed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-white">
              I verify these requirements accurately represent my project scope.
            </p>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Confirming locks this specification version and initiates deterministic plan recommendation ranking in Chapter 3.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Chapter 2 Complete • Entering Chapter 3 (Define Your Solution)</span>
        </div>

        <button
          type="button"
          onClick={handleConfirmAndProceed}
          disabled={!confirmed || isEvaluating}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer disabled:opacity-50"
        >
          {isEvaluating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Evaluating Canonical Plans...</span>
            </>
          ) : (
            <>
              <span>Confirm & Find the Right Plan</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
