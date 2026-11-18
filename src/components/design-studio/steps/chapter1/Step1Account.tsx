"use client";

import React, { useState } from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import { createClient } from "@/lib/supabase/client";
import {
  Sparkles,
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export function Step1Account() {
  const { state, setAccount, nextStep } = useDesignStudio();
  const supabase = createClient();

  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [fullName, setFullName] = useState(state.account.fullName || "");
  const [email, setEmail] = useState(state.account.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (mode === "signup" && !fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              name: fullName,
            },
          },
        });

        if (error) {
          // If already registered, suggest sign in
          if (error.message.toLowerCase().includes("already registered")) {
            setMode("signin");
            setErrorMsg("This email is already registered. Please enter your password to sign in.");
            setIsLoading(false);
            return;
          }
          throw error;
        }

        setAccount({
          userId: data.user?.id,
          fullName,
          email,
          isAuthenticated: true,
        });

        setSuccessMsg("Account created successfully! Proceeding to your profile...");
        setTimeout(() => {
          nextStep();
        }, 800);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        const resolvedName =
          data.user?.user_metadata?.full_name ||
          data.user?.user_metadata?.name ||
          fullName ||
          email.split("@")[0];

        setAccount({
          userId: data.user?.id,
          fullName: resolvedName,
          email: data.user?.email || email,
          isAuthenticated: true,
        });

        setSuccessMsg("Welcome back! Proceeding to your profile...");
        setTimeout(() => {
          nextStep();
        }, 800);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed. Please verify your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestContinue = () => {
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg("Please provide your name and email to proceed.");
      return;
    }
    setAccount({
      fullName,
      email,
      isAuthenticated: false,
      isGuestFallback: true,
    });
    nextStep();
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      {/* Step Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#087BFF]/10 border border-[#00D9FF]/30 text-[#00D9FF] text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter 1 • Step 1 of 16</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Let&apos;s Build Something Amazing.
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto">
          Create your StarX account to start designing your next digital solution.
        </p>
      </div>

      {/* Main Glass Form Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[#071638]/80 border border-[#0A1940] shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#00D9FF]/10 to-transparent pointer-events-none" />

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 p-1 bg-[#030B24] border border-white/10 rounded-2xl mb-6 relative">
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErrorMsg(null);
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === "signup"
                ? "bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setErrorMsg(null);
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === "signin"
                ? "bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Sign In to Existing
          </button>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alistair Vance"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#00D9FF] transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="founder@company.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#00D9FF] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#00D9FF] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Minimum 6 characters with secure Supabase cryptographic hashing.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] hover:brightness-110 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{mode === "signup" ? "Create Account & Continue" : "Sign In & Continue"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Guest Fallback Option */}
        <div className="mt-6 pt-5 border-t border-white/10 text-center">
          <p className="text-xs text-zinc-400 mb-2">
            Want to explore design tools first without setting a password?
          </p>
          <button
            type="button"
            onClick={handleGuestContinue}
            className="text-xs font-mono text-[#00D9FF] hover:underline cursor-pointer"
          >
            Continue as Guest with Email →
          </button>
        </div>
      </div>
    </div>
  );
}
