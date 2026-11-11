"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { createClient } from "@/lib/supabase/client";
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle 
} from "lucide-react";

export default function CustomerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      // Check client membership session
      const res = await fetch("/api/customer/session");
      if (res.ok) {
        router.push("/customer");
      } else {
        router.push("/customer");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred during sign-in.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030B24] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#087BFF]/20 via-[#00D9FF]/15 to-[#E52BFF]/10 blur-[160px] pointer-events-none -z-10" />

      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <BrandLogo size="md" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#087BFF]/20 text-[#00D9FF] border border-[#00D9FF]/30">
            <Sparkles className="w-3 h-3" />
            <span>StarX Alpha Labs Client Workspace</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Sign In to Client Portal
          </h1>
          <p className="text-xs text-slate-300 font-light">
            Access your assigned enterprise projects, milestones, deliverables, and team discussions.
          </p>
        </div>

        {/* Login Form Card */}
        <div className="p-8 rounded-3xl bg-[#071638]/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-5 text-left">
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Business Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="client@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Workspace Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-bold text-xs shadow-lg shadow-[#087BFF]/30 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : "Enter Client Workspace"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center space-y-2">
            <p className="text-[11px] text-slate-400">
              Invited by StarX Alpha Labs? Check your invitation email or click your secure onboarding link.
            </p>
            <div className="text-[11px] font-mono text-[#00D9FF]">
              <Link href="/contact" className="hover:underline">
                Request Portal Access or Support →
              </Link>
            </div>
          </div>
        </div>

        {/* Security Footer */}
        <div className="text-center text-[10px] font-mono text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00C98B]" />
          <span>StarX Alpha Labs Client Security &amp; Data Isolation Protocol</span>
        </div>
      </div>
    </div>
  );
}
