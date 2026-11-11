"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { createClient } from "@/lib/supabase/client";
import {
  Lock,
  Mail,
  User,
  Building,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Loader2,
} from "lucide-react";

interface InviteData {
  valid: boolean;
  email: string;
  fullName: string;
  role: string;
  organizationName: string;
}

export default function CustomerInviteAcceptancePage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;

  const [loading, setLoading] = useState(true);
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setFetchError("No invitation token detected in the URL.");
      setLoading(false);
      return;
    }

    async function verifyToken() {
      try {
        const res = await fetch(`/api/customer/invite?token=${encodeURIComponent(token)}`);
        const json = await res.json();

        if (!res.ok) {
          setFetchError(json.error || "Invalid or expired invitation link.");
        } else {
          setInviteData(json);
        }
      } catch (err: any) {
        setFetchError("Unable to verify invitation link. Please check your connection.");
      } finally {
        setLoading(false);
      }
    }

    verifyToken();
  }, [token]);

  const handleAcceptInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (password.length < 8) {
      setSubmitError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setSubmitError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      // 1. Submit invitation acceptance to API
      const res = await fetch("/api/customer/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        setSubmitError(json.error || "Failed to activate client account.");
        setSubmitting(false);
        return;
      }

      setSuccess(true);

      // 2. Automatically log the client into Supabase
      if (inviteData?.email) {
        const supabase = createClient();
        await supabase.auth.signInWithPassword({
          email: inviteData.email,
          password,
        });
      }

      // 3. Navigate to Customer Workspace
      setTimeout(() => {
        router.push("/customer");
      }, 1500);
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred during account activation.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030B24] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#087BFF]/20 via-[#00D9FF]/15 to-[#E52BFF]/10 blur-[160px] pointer-events-none -z-10" />

      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <BrandLogo size="md" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#087BFF]/20 text-[#00D9FF] border border-[#00D9FF]/30">
            <Sparkles className="w-3 h-3" />
            <span>Client Workspace Onboarding</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Activate Your Workspace
          </h1>
          <p className="text-xs text-slate-300 font-light">
            Set up your secure credentials to collaborate on your StarX Alpha Labs engineering deliverables.
          </p>
        </div>

        {/* Content Card */}
        <div className="p-8 rounded-3xl bg-[#071638]/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6 text-left">
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#00D9FF] animate-spin" />
              <p className="text-xs font-mono text-slate-400">Verifying security token...</p>
            </div>
          )}

          {!loading && fetchError && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-rose-200">Invalid or Expired Link</p>
                  <p className="text-rose-300/90">{fetchError}</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                If you believe this is a mistake, please contact your StarX Alpha Labs Engagement Lead or request a renewed workspace invitation.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/customer/login"
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-center text-slate-300 transition-colors"
                >
                  Return to Client Sign In
                </Link>
                <Link
                  href="/contact"
                  className="w-full py-2.5 rounded-xl bg-[#087BFF]/20 hover:bg-[#087BFF]/30 border border-[#00D9FF]/30 text-xs font-mono text-center text-[#00D9FF] transition-colors"
                >
                  Contact Support Desk
                </Link>
              </div>
            </div>
          )}

          {!loading && !fetchError && inviteData && !success && (
            <form onSubmit={handleAcceptInvite} className="space-y-5">
              {/* Organization and User Badge */}
              <div className="p-3.5 rounded-2xl bg-[#08183A] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <Building className="w-4 h-4 text-[#00D9FF]" />
                  <span className="font-semibold">{inviteData.organizationName}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/5">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {inviteData.fullName}
                  </span>
                  <span className="font-mono text-[#00D9FF] uppercase tracking-wider text-[9px] bg-[#00D9FF]/10 px-2 py-0.5 rounded-md border border-[#00D9FF]/20">
                    {inviteData.role.replace("_", " ")}
                  </span>
                </div>
              </div>

              {submitError && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Email (Read only) */}
              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Invited Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    disabled
                    value={inviteData.email}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-400 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Set Password */}
              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Create Workspace Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="Min 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF] transition-colors"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF] transition-colors"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-[#030B24] bg-gradient-to-r from-[#00D9FF] to-[#087BFF] hover:brightness-110 shadow-lg shadow-[#087BFF]/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Activating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Activation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {!loading && success && (
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <p className="text-sm font-bold text-white">Account Successfully Activated!</p>
              <p className="text-xs text-slate-400">
                Redirecting you to your client workspace dashboard...
              </p>
            </div>
          )}
        </div>

        {/* Security Footer Notice */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>End-to-End Encrypted Session • TLS 1.3 Strict</span>
          </div>
          <p className="text-[10px] text-slate-500">
            StarX Alpha Labs Client Workspace. Dedicated Tenant Data Isolation.
          </p>
        </div>
      </div>
    </div>
  );
}
