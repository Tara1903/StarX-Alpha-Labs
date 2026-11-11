"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import {
  Handshake,
  CheckCircle2,
  Shield,
  Zap,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Building,
  PhoneCall,
  Lock,
  Layers,
  Sparkles,
  Loader2
} from "lucide-react";

export default function AgencyPartnershipPage() {
  const [formData, setFormData] = useState({
    agencyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    country: "India",
    clientVolume: "3–5 Projects / Month",
    servicesNeeded: ["Website Development", "App Development"],
    partnershipModel: "100% White-Label Delivery",
    message: "",
    website_hp: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successResult, setSuccessResult] = useState<{
    whatsappUrl: string;
  } | null>(null);

  const toggleService = (srv: string) => {
    setFormData((prev) => {
      const exists = prev.servicesNeeded.includes(srv);
      return {
        ...prev,
        servicesNeeded: exists
          ? prev.servicesNeeded.filter((s) => s !== srv)
          : [...prev.servicesNeeded, srv],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const errs: Record<string, string> = {};
    if (!formData.agencyName.trim()) errs.agencyName = "Agency name is required";
    if (!formData.contactName.trim()) errs.contactName = "Contact name is required";
    if (!formData.email.trim() || !formData.email.includes("@")) errs.email = "Valid email is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    if (!formData.country.trim()) errs.country = "Location is required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/agency-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessResult({
          whatsappUrl: data.whatsappUrl,
        });
      } else {
        setErrors(data.errors || { form: data.error || "Failed to submit enquiry" });
      }
    } catch {
      setErrors({ form: "Network error. Please try again or reach out on WhatsApp." });
    } finally {
      setLoading(false);
    }
  };

  const partnerPillars = [
    {
      icon: <Lock className="w-5 h-5 text-[#00D9FF]" />,
      title: "100% White-Label Delivery",
      description: "We work completely in the background. Your clients only see your brand, your emails, and your team.",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#00DF89]" />,
      title: "Healthy 40%–60% Agency Margins",
      description: "Access wholesale engineering pricing for W1–W6 websites and A1–A5 apps, enabling premium agency retail markups.",
    },
    {
      icon: <Zap className="w-5 h-5 text-[#E52BFF]" />,
      title: "Guaranteed Delivery Timelines",
      description: "Standard web projects delivered in 1–2 weeks, native mobile apps in 3–4 weeks. Zero missed client deadlines.",
    },
    {
      icon: <Layers className="w-5 h-5 text-[#FF941F]" />,
      title: "160+ Ready Demos to Close Deals",
      description: "Leverage our interactive catalog of 160+ working industry demos to present and close enterprise clients effortlessly.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#030B24] text-white selection:bg-[#087BFF] selection:text-white">
      <Navbar />

      <main className="grow pt-32 pb-24 relative overflow-hidden">
        {/* Background Atmospheric Lighting */}
        <div className="absolute top-0 right-1/4 w-[800px] h-[600px] rounded-full bg-gradient-to-b from-[#00D9FF]/18 via-[#087BFF]/12 to-transparent blur-[160px] pointer-events-none -z-10" />
        <div className="absolute top-1/2 -left-40 w-[650px] h-[650px] rounded-full bg-[#E52BFF]/10 blur-[180px] pointer-events-none -z-10" />

        <Container>
          {/* Header */}
          <div className="max-w-3xl space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/40 bg-[#071638]/90 backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.25)]">
              <Handshake className="w-4 h-4 text-[#00D9FF]" />
              <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                Agency &amp; Reseller Program
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Elite White-Label Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#E52BFF]">
                for Digital Agencies
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#C8D5EF] leading-relaxed">
              Scale your agency revenue without hiring overhead. We engineer enterprise-grade Next.js websites,
              native mobile applications, and custom SaaS platforms under your exclusive brand name.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {partnerPillars.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#030B24] border border-white/10 flex items-center justify-center">
                  {p.icon}
                </div>
                <h3 className="text-base font-bold text-white">{p.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>

          {/* Form & Value Split Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-7">
              {successResult ? (
                <div className="p-8 sm:p-10 rounded-3xl bg-[#071638]/95 border-2 border-[#00D9FF] shadow-[0_0_50px_rgba(0,217,255,0.35)] backdrop-blur-2xl text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#00D9FF]/20 border border-[#00D9FF] flex items-center justify-center mx-auto text-[#00D9FF]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D9FF]">
                      Application Received
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Welcome to the StarX Partner Network
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto">
                      Our founder and engineering leads will review your agency profile and schedule a direct partner briefing.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={successResult.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm text-[#030B24] bg-[#00DF89] hover:bg-[#00c97b] transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Connect with Hari Singh on WhatsApp</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-6 sm:p-10 rounded-3xl bg-[#071638]/90 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                  <div className="mb-6 space-y-1">
                    <h2 className="text-xl font-bold text-white">Apply for Agency Partnership</h2>
                    <p className="text-xs text-slate-400">
                      Fill out this quick partner application to review our wholesale rate card and SLA guidelines.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Agency & Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                          Agency Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.agencyName}
                          onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                          placeholder="e.g. Pixel Pulse Digital"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D9FF]"
                        />
                        {errors.agencyName && <p className="text-xs text-rose-400 mt-1">{errors.agencyName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          placeholder="e.g. Vikram Mehta (Founder / Director)"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D9FF]"
                        />
                        {errors.contactName && <p className="text-xs text-rose-400 mt-1">{errors.contactName}</p>}
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="vikram@pixelpulse.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D9FF]"
                        />
                        {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D9FF]"
                        />
                        {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Website & Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                          Agency Website
                        </label>
                        <input
                          type="text"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          placeholder="https://pixelpulse.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D9FF]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                          Country / City *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          placeholder="e.g. India (Mumbai), UAE, USA"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D9FF]"
                        />
                      </div>
                    </div>

                    {/* Partnership Model & Volume */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                          Preferred Partnership Model
                        </label>
                        <select
                          value={formData.partnershipModel}
                          onChange={(e) => setFormData({ ...formData, partnershipModel: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                        >
                          <option value="100% White-Label Delivery">100% White-Label Delivery (Your Brand)</option>
                          <option value="Referral & Commission Model">Referral &amp; Commission (20% Recurring)</option>
                          <option value="Dedicated Developer Pod">Dedicated Pod (Full-Time Engineers)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                          Estimated Monthly Volume
                        </label>
                        <select
                          value={formData.clientVolume}
                          onChange={(e) => setFormData({ ...formData, clientVolume: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                        >
                          <option value="1–2 Projects / Month">1–2 Projects / Month</option>
                          <option value="3–5 Projects / Month">3–5 Projects / Month</option>
                          <option value="6–10 Projects / Month">6–10 Projects / Month</option>
                          <option value="10+ Projects / Month">10+ Projects / Month</option>
                        </select>
                      </div>
                    </div>

                    {/* Services Needed Multi-select */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-2">
                        Target Services to Outsource
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Website Development",
                          "Mobile App Development",
                          "Combo Website + App",
                          "Custom SaaS & Portals",
                        ].map((srv) => (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => toggleService(srv)}
                            className={`p-2.5 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                              formData.servicesNeeded.includes(srv)
                                ? "bg-[#00D9FF]/20 border-[#00D9FF] text-white"
                                : "bg-[#030B24] border-white/10 text-slate-400 hover:border-white/20"
                            }`}
                          >
                            <span>{srv}</span>
                            {formData.servicesNeeded.includes(srv) && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00D9FF]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message / Pipeline details */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                        Tell us about your agency &amp; current active pipeline
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="e.g. We have 3 clients requesting dental clinic websites and 1 restaurant mobile app this month."
                        className="w-full px-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D9FF]"
                      />
                    </div>

                    {/* Honeypot */}
                    <input
                      type="text"
                      name="website_hp"
                      value={formData.website_hp}
                      onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    {errors.form && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
                        {errors.form}
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#E52BFF] shadow-[0_0_25px_rgba(0,217,255,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting Partner Application...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Application &amp; Unlock Partner Rates</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Right Column: Direct Founder Access & Partnership FAQs */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Founder Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#071638]/90 border border-[#00D9FF]/40 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#030B24] border border-[#00D9FF]/50 flex items-center justify-center text-xl font-bold text-[#00D9FF]">
                    HS
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Hari Singh</h3>
                    <p className="text-xs text-slate-400 font-mono">Founder &amp; Tech Lead</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  &ldquo;We treat our agency partners like extended leadership. You get direct Slack channels,
                  transparent commit histories, and fixed wholesale prices so you can sell with total confidence.&rdquo;
                </p>

                <div className="pt-2 border-t border-white/5 space-y-3">
                  <a
                    href="https://wa.me/919660937033?text=Hi%20Hari%2C%20I%20am%20interested%20in%20an%20Agency%20Partnership%20with%20StarX%20Alpha%20Labs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl font-bold text-xs text-[#030B24] bg-[#00DF89] hover:bg-[#00c97b] transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Founder Direct (+91 9660937033)</span>
                  </a>

                  <a
                    href="tel:+919660937033"
                    className="w-full py-2 rounded-xl font-mono text-xs text-slate-300 bg-[#030B24] border border-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#00D9FF]" />
                    <span>Call: +91 9660937033</span>
                  </a>
                </div>
              </div>

              {/* Partnership FAQs */}
              <div className="p-6 rounded-3xl bg-[#071638]/60 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Agency Partner FAQ
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <h4 className="font-bold text-white">Can we brand the software under our name?</h4>
                    <p className="text-slate-400 mt-0.5">Yes, 100%. All client-facing documentation, portal URLs, code repositories, and demo previews will carry your agency branding.</p>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    <h4 className="font-bold text-white">Do we get client NDA protection?</h4>
                    <p className="text-slate-400 mt-0.5">We sign a mutual Non-Disclosure Agreement before onboarding. We never contact your end-clients directly under any circumstances.</p>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    <h4 className="font-bold text-white">How does billing work?</h4>
                    <p className="text-slate-400 mt-0.5">Milestone-based billing: 50% upon project kickoff, 50% upon final staging approval prior to DNS switchover.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
