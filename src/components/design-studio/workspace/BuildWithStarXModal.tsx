"use client";

import React, { useState } from "react";
import { useDesignStudio } from "../context/DesignStudioContext";
import {
  Sparkles,
  ShieldCheck,
  Check,
  X,
  Send,
  Loader2,
  AlertCircle,
  FileCheck2,
  Phone,
  Mail,
  User,
  Building,
} from "lucide-react";

interface BuildWithStarXModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function BuildWithStarXModal({ isOpen, onClose, onSuccess }: BuildWithStarXModalProps) {
  const { state, submitProjectEnquiry } = useDesignStudio();
  const [consent, setConsent] = useState(false);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErrorMsg("Please provide your explicit consent to project contact before submitting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await submitProjectEnquiry(notes.trim() || undefined);
      if (res.success) {
        onSuccess();
      } else {
        throw new Error(res.error || "Submission failed");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to submit project enquiry. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const planName = state.selectedPlanId || "Standard Plan";
  const contactName = state.profile.fullName || state.account.fullName || "StarX Partner";
  const contactEmail = state.account.email || "";
  const contactPhone = `${state.profile.countryCode} ${state.profile.mobileNumber}`.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#030B24] border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,217,255,0.25)] space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Approved Design Handoff
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            Build This With StarX
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Ready to bring your approved Google Stitch design into full production code? Submit your validated project scope directly to our principal solution architects.
          </p>
        </div>

        {/* Prefilled Summary Card */}
        <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="font-bold text-white flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-cyan-400" />
              Verified Design Snapshot: v{state.approvedVersion || 1}
            </span>
            <span className="font-mono text-cyan-400">
              {state.divisionSlug.toUpperCase()} • {state.industrySlug.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-300">
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Contact Name</span>
              <span className="font-bold text-white flex items-center gap-1.5 mt-0.5">
                <User className="w-3.5 h-3.5 text-zinc-400" />
                {contactName}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Verified Email</span>
              <span className="font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                {contactEmail}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Phone Number</span>
              <span className="font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Phone className="w-3.5 h-3.5 text-zinc-400" />
                {contactPhone || "Provided on account"}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Selected Architecture</span>
              <span className="font-bold text-cyan-300 flex items-center gap-1.5 mt-0.5">
                <Building className="w-3.5 h-3.5 text-zinc-400" />
                {planName}
              </span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 text-xs">
            <label className="text-zinc-300 font-medium">
              Additional Implementation Notes / Target Launch Timeline (Optional):
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. We want to complete code deployment within 6 weeks. Internal stakeholders have already signed off on the Google Stitch prototype."
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Consent Checkbox */}
          <div
            onClick={() => setConsent(!consent)}
            className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
              consent
                ? "bg-cyan-500/10 border-cyan-400/40"
                : "bg-white/[0.02] border-white/10 hover:border-white/20"
            }`}
          >
            <div
              className={`w-5 h-5 rounded flex items-center justify-center text-xs transition-colors shrink-0 mt-0.5 ${
                consent
                  ? "bg-cyan-400 text-black font-bold"
                  : "border border-zinc-600"
              }`}
            >
              {consent && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <p className="text-xs text-zinc-300 leading-snug">
              I agree to be contacted directly by a StarX technical representative via WhatsApp, phone, or email to discuss code implementation and milestone delivery for this approved design.
            </p>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero upfront payment required at enquiry submission.</span>
            </div>

            <button
              type="submit"
              disabled={!consent || isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting to Admin Centre...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Project Enquiry</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
