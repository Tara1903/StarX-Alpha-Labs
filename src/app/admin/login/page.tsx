"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { createClient } from "@/lib/supabase/client";
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both email and administrative password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setIsLoading(false);
        setErrorMessage(error.message || "Invalid administrative credentials.");
        return;
      }

      if (data.session) {
        // Successful session creation -> redirect to Admin Console
        router.push("/admin");
        router.refresh();
      } else {
        setIsLoading(false);
        setErrorMessage("Authentication failed to establish an active session.");
      }
    } catch (err: unknown) {
      setIsLoading(false);
      setErrorMessage(err instanceof Error ? err.message : "Network error establishing administrative session.");
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-[#F8FAFC] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background ambient depth glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#1769AA]/20 via-[#32A9E8]/15 to-transparent blur-[160px] pointer-events-none -z-10" />

      {/* Admin Panel Container */}
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#0B192B]/90 border border-[rgba(130,180,220,0.22)] shadow-2xl shadow-[#00031E]/80 space-y-6 relative z-10 backdrop-blur-xl">
        {/* Header with StarX Alpha Labs 3D Logo */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <BrandLogo size="lg" priority />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(130,180,220,0.2)] bg-[#102D50]/60 text-[10px] font-mono tracking-widest uppercase text-[#73D8FF] mb-2">
              <ShieldCheck className="w-3 h-3 text-[#73D8FF]" /> Authorized Personnel Only
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              StarX Alpha Labs
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Administrative & CMS Control Center
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@starx-alpha-labs.com"
                className="w-full h-11 pl-10 pr-4 bg-[#07111F]/80 border border-[rgba(130,180,220,0.22)] rounded-xl text-white placeholder:text-slate-500 text-sm focus:border-[#73D8FF] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 pl-10 pr-4 bg-[#07111F]/80 border border-[rgba(130,180,220,0.22)] rounded-xl text-white placeholder:text-slate-500 text-sm focus:border-[#73D8FF] focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#32A9E8] hover:from-[#1E88E5] hover:to-[#42A5F5] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#1769AA]/30 transition-all duration-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verifying Credentials...
              </span>
            ) : (
              <>
                <span>Sign In to Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="pt-4 border-t border-[rgba(130,180,220,0.12)] text-center space-y-2">
          <p className="text-[11px] text-slate-400">
            Access is strictly monitored. Public registration is disabled.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-mono">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">
              &larr; Back to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
