"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import {
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Building2,
  PhoneCall,
  Loader2
} from "lucide-react";
import { VIDEO_CATEGORIES } from "@/data/videos";

export function PersonalizedDemoSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    phone: "",
    email: "",
    city: "",
    industry: "local-business-growth",
    solutionType: "Website + App Combo",
    currentWebsite: "",
    primaryGoal: "Generate More Qualified Leads",
    estimatedBudget: "₹50,000 – ₹1,00,000",
    targetTimeline: "Within 1 Month",
    projectDetails: "",
    website_hp: "", // Honeypot
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successResult, setSuccessResult] = useState<{
    requestCode: string;
    whatsappUrl: string;
  } | null>(null);

  const industries = VIDEO_CATEGORIES.map((c) => ({
    id: c.id,
    label: c.title,
  }));

  const solutionTypes = [
    "Professional Business Website",
    "iOS & Android Mobile App",
    "Website + App Combo (Best Value)",
    "Custom Enterprise Software / Portal",
  ];

  const primaryGoals = [
    "Generate More Qualified Leads",
    "Automate Inquiries & Bookings",
    "Accept Online Payments & Orders",
    "Replace Outdated Legacy Website",
    "Scale Across Multiple Locations",
  ];

  const budgetRanges = [
    "Under ₹25,000",
    "₹25,000 – ₹50,000",
    "₹50,000 – ₹1,00,000",
    "₹1,00,000 – ₹2,50,000",
    "₹2,50,000+",
  ];

  const timelineOptions = [
    "Immediately (1–2 Weeks)",
    "Within 1 Month",
    "1–3 Months",
    "Planning / Exploratory",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Client-side quick check
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
    if (!formData.phone.trim() || formData.phone.length < 7) newErrors.phone = "Valid phone is required";
    if (!formData.email.trim() || !formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (formData.projectDetails.trim().length < 10) newErrors.projectDetails = "Please describe your requirements (min 10 characters)";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessResult({
          requestCode: data.requestCode,
          whatsappUrl: data.whatsappUrl,
        });
      } else {
        setErrors(data.errors || { form: data.error || "Failed to submit request" });
      }
    } catch {
      setErrors({ form: "Network error. Please try again or message us on WhatsApp." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="free-personalized-demo" className="py-24 relative overflow-hidden bg-[#030A24] border-t border-b border-[#0A1940]">
      {/* Radiant Background Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full bg-gradient-to-r from-[#00D9FF]/15 via-[#873BFF]/15 to-[#FF35B8]/15 blur-[160px] pointer-events-none -z-10" />

      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/40 bg-[#071638]/90 backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.25)]">
            <Sparkles className="w-4 h-4 text-[#00D9FF]" />
            <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
              100% Free • No Obligation • 24–48h Turnaround
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Get a Free Personalized Demo <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#E52BFF]">
              for Your Exact Business
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#C8D5EF] leading-relaxed">
            Tell us about your company and goals. Our engineering team will configure a dedicated interactive
            demonstration featuring your industry workflows, branding preview, and real-time features.
          </p>
        </div>

        {/* Success Modal / Card State */}
        {successResult ? (
          <div className="max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl bg-[#071638]/95 border-2 border-[#00D9FF] shadow-[0_0_50px_rgba(0,217,255,0.35)] backdrop-blur-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#00D9FF]/20 border border-[#00D9FF] flex items-center justify-center mx-auto text-[#00D9FF]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D9FF]">
                Request Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Your Free Demo Is Being Prepared!
              </h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto">
                Your unique reference ID is{" "}
                <span className="font-mono font-bold text-white px-2 py-0.5 rounded bg-[#030B24] border border-[#00D9FF]/40">
                  {successResult.requestCode}
                </span>
                . Our engineers will review your requirements and dispatch your interactive demo within 24–48 hours.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={successResult.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm text-[#030B24] bg-[#00DF89] hover:bg-[#00c97b] shadow-[0_0_25px_rgba(0,223,137,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open in WhatsApp for Priority Review</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="tel:+919660937033"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-sm text-white bg-[#0A1940] border border-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#00D9FF]" />
                <span>Call +91 9660937033</span>
              </a>
            </div>

            <button
              onClick={() => setSuccessResult(null)}
              className="text-xs text-slate-400 hover:text-white underline pt-4"
            >
              Submit another demo request
            </button>
          </div>
        ) : (
          /* Main 12-Field Form */
          <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#071638]/90 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Full Name & Business Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-2">
                    1. Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D9FF]"
                  />
                  {errors.fullName && <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-2">
                    2. Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Apex Health Clinic"
                    className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D9FF]"
                  />
                  {errors.businessName && <p className="text-xs text-rose-400 mt-1">{errors.businessName}</p>}
                </div>
              </div>

              {/* Row 2: WhatsApp / Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-2">
                    3. WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D9FF]"
                  />
                  {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-2">
                    4. Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rahul@business.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D9FF]"
                  />
                  {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Row 3: City & Industry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-2">
                    5. City / Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Indore, Mumbai, Delhi, Bengaluru"
                    className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D9FF]"
                  />
                  {errors.city && <p className="text-xs text-rose-400 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-2">
                    6. Industry Category *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                  >
                    {industries.map((ind) => (
                      <option key={ind.id} value={ind.label} className="bg-[#071638] text-white">
                        {ind.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Solution Type & Current Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-2">
                    7. Desired Solution Type *
                  </label>
                  <select
                    value={formData.solutionType}
                    onChange={(e) => setFormData({ ...formData, solutionType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                  >
                    {solutionTypes.map((st) => (
                      <option key={st} value={st} className="bg-[#071638] text-white">
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-2">
                    8. Current Website (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.currentWebsite}
                    onChange={(e) => setFormData({ ...formData, currentWebsite: e.target.value })}
                    placeholder="https://example.com or None"
                    className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>
              </div>

              {/* Row 5: Primary Goal & Budget Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-2">
                    9. Primary Business Goal *
                  </label>
                  <select
                    value={formData.primaryGoal}
                    onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                  >
                    {primaryGoals.map((g) => (
                      <option key={g} value={g} className="bg-[#071638] text-white">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-2">
                    10. Estimated Budget Range *
                  </label>
                  <select
                    value={formData.estimatedBudget}
                    onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00D9FF]"
                  >
                    {budgetRanges.map((b) => (
                      <option key={b} value={b} className="bg-[#071638] text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 6: Target Timeline */}
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-2">
                  11. Target Deployment Timeline *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timelineOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setFormData({ ...formData, targetTimeline: opt })}
                      className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                        formData.targetTimeline === opt
                          ? "bg-[#00D9FF]/20 border-[#00D9FF] text-white shadow-[0_0_15px_rgba(0,217,255,0.3)]"
                          : "bg-[#030B24] border-white/10 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 7: Project Details */}
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider mb-2">
                  12. Key Project Requirements &amp; Features *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  placeholder="Describe your target audience, required features (e.g., booking calendar, payments, catalog), and any existing systems you need integrated."
                  className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00D9FF]"
                />
                {errors.projectDetails && <p className="text-xs text-rose-400 mt-1">{errors.projectDetails}</p>}
              </div>

              {/* Invisible Honeypot field for bot spam prevention */}
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

              {/* Submission Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-[#FF941F] via-[#FF35B8] to-[#E52BFF] shadow-[0_0_35px_rgba(255,148,31,0.45)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Generating Demo Specification...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit &amp; Request My Free Personalized Demo</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees Bar */}
              <div className="pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00DF89]" />
                  <span>100% Free &amp; Zero Obligation</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-[#00D9FF]" />
                  <span>24–48h Turnaround Time</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-[#E52BFF]" />
                  <span>Strict NDA &amp; Confidentiality</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </Container>
    </section>
  );
}
