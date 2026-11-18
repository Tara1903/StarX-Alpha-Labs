"use client";

import React, { useState } from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import {
  User,
  Phone,
  Building,
  Globe,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Briefcase,
  Rocket,
  Shield,
  Layers,
} from "lucide-react";

const COUNTRY_CODES = [
  { code: "+91", label: "India (+91)", flag: "🇮🇳" },
  { code: "+1", label: "USA / Canada (+1)", flag: "🇺🇸" },
  { code: "+44", label: "UK (+44)", flag: "🇬🇧" },
  { code: "+971", label: "UAE (+971)", flag: "🇦🇪" },
  { code: "+65", label: "Singapore (+65)", flag: "🇸🇬" },
  { code: "+61", label: "Australia (+61)", flag: "🇦🇺" },
  { code: "+49", label: "Germany (+49)", flag: "🇩🇪" },
];

const PROJECT_TYPES = [
  { id: "business", label: "Established Business", icon: Briefcase, desc: "Scale operations & digital revenues" },
  { id: "startup", label: "New Tech Startup", icon: Rocket, desc: "Build & launch high-impact MVP" },
  { id: "enterprise", label: "Enterprise Scale", icon: Shield, desc: "Bespoke security & SLA guarantees" },
  { id: "personal", label: "Personal Project", icon: Layers, desc: "Founder prototype & private product" },
] as const;

export function Step2Profile() {
  const { state, setProfile, nextStep } = useDesignStudio();
  const profile = state.profile;

  const [fullName, setFullName] = useState(profile.fullName || state.account.fullName || "");
  const [countryCode, setCountryCode] = useState(profile.countryCode || "+91");
  const [mobileNumber, setMobileNumber] = useState(profile.mobileNumber || "");
  const [companyName, setCompanyName] = useState(profile.companyName || "");
  const [projectType, setProjectType] = useState<typeof profile.projectType>(profile.projectType || "business");
  const [websiteUrl, setWebsiteUrl] = useState(profile.websiteUrl || "");
  const [preferredMethod, setPreferredMethod] = useState<typeof profile.preferredContactMethod>(
    profile.preferredContactMethod || "whatsapp"
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!mobileNumber.trim() || mobileNumber.replace(/\D/g, "").length < 7) {
      setErrorMsg("Please enter a valid mobile number with at least 7 digits.");
      return;
    }

    setProfile({
      fullName,
      countryCode,
      mobileNumber: mobileNumber.trim(),
      companyName: companyName.trim(),
      projectType,
      websiteUrl: websiteUrl.trim(),
      preferredContactMethod: preferredMethod,
    });

    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#087BFF]/10 border border-[#00D9FF]/30 text-[#00D9FF] text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter 1 • Step 2 of 16</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Tell Us a Little About Yourself.
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto">
          Your profile helps us personalize your solution and project correspondence.
        </p>
      </div>

      {/* Main Glass Form Card */}
      <form onSubmit={handleContinue} className="rounded-3xl p-6 sm:p-8 bg-[#071638]/80 border border-[#0A1940] shadow-2xl backdrop-blur-xl space-y-6">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Full Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alistair Vance"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#00D9FF] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Mobile Number *
            </label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-24 px-2 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#00D9FF] transition-colors"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <div className="relative flex-1">
                <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#00D9FF] transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Company & Website */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Company / Organization (Optional)
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Aura Global Ltd"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#00D9FF] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Existing Website URL (Optional)
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://company.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#00D9FF] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Project Nature Selector */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
            Project Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PROJECT_TYPES.map((t) => {
              const Icon = t.icon;
              const isSelected = projectType === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setProjectType(t.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0A1940] border-[#00D9FF] text-white shadow-[0_0_15px_rgba(0,217,255,0.2)]"
                      : "bg-[#030B24] border-white/10 text-zinc-400 hover:border-white/20"
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? "text-[#00D9FF]" : "text-zinc-500"}`} />
                  <div className="text-xs font-bold leading-tight">{t.label}</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1">{t.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
            Preferred Method for Blueprint Handoff
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "whatsapp", label: "WhatsApp Direct", icon: MessageSquare },
              { id: "call", label: "Direct Phone Call", icon: Phone },
              { id: "email", label: "Email Correspondence", icon: Globe },
            ].map((m) => {
              const Icon = m.icon;
              const isSelected = preferredMethod === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPreferredMethod(m.id as any)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0A1940] border-[#00D9FF] text-white shadow-[0_0_15px_rgba(0,217,255,0.2)]"
                      : "bg-[#030B24] border-white/10 text-zinc-400 hover:border-white/20"
                  }`}
                >
                  <Icon className={`w-4 h-4 mx-auto mb-1 ${isSelected ? "text-[#00D9FF]" : "text-zinc-500"}`} />
                  <div className="text-xs font-bold">{m.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] hover:brightness-110 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer"
        >
          <span>Save Profile & Choose Division</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
