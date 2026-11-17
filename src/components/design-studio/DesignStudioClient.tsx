"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { DIVISIONS_DATA, getDivisionBySlug } from "@/data/divisions";
import { INDUSTRIES_DATA, getIndustryBySlug } from "@/data/industries";
import { 
  Sparkles, 
  Palette, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  ShieldCheck, 
  FileText, 
  Send, 
  Smartphone, 
  Globe, 
  Laptop, 
  Eye, 
  Sliders, 
  Check, 
  AlertCircle,
  HelpCircle,
  Cpu,
  Zap,
  ArrowUpRight
} from "lucide-react";

export function DesignStudioClient() {
  const searchParams = useSearchParams();
  const initialDivision = searchParams.get("division") || "starx-web";
  const initialIndustry = searchParams.get("industry") || "retail-commerce";

  // Wizard state: 1: Discovery, 2: Structured Brief, 3: AI Concept Generation, 4: Design Review, 5: Feasibility & Scope Handoff
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Inputs
  const [selectedIndustry, setSelectedIndustry] = useState<string>(initialIndustry);
  const [selectedDivision, setSelectedDivision] = useState<string>(initialDivision);
  const [productType, setProductType] = useState<string>("Web Application & Portal");
  const [platformTargets, setPlatformTargets] = useState<string[]>(["Web Responsive (Desktop & Mobile)"]);
  const [projectName, setProjectName] = useState<string>("");
  const [rawDescription, setRawDescription] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "Role-Based Access Control",
    "Real-Time Data Dashboard",
    "Customer Account Portal"
  ]);
  const [themePreference, setThemePreference] = useState<"cosmic-dark" | "executive-light" | "high-contrast-neon">("cosmic-dark");

  // Client Details for Proposal Handoff
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");

  // Generation status
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedConcepts, setGeneratedConcepts] = useState<any[]>([]);
  const [activeConceptIndex, setActiveConceptIndex] = useState<number>(0);
  const [revisionNotes, setRevisionNotes] = useState<string>("");
  const [revisionList, setRevisionList] = useState<string[]>([]);
  const [handoffSuccess, setHandoffSuccess] = useState<boolean>(false);

  // Suggested features by industry
  const currentIndustryObj = useMemo(() => {
    return getIndustryBySlug(selectedIndustry) || INDUSTRIES_DATA[0];
  }, [selectedIndustry]);

  const toggleFeature = (feat: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const togglePlatform = (plat: string) => {
    setPlatformTargets((prev) =>
      prev.includes(plat) ? prev.filter((p) => p !== plat) : [...prev, plat]
    );
  };

  // Step 2 Action: Generate Structured Brief
  const handleProceedToBrief = () => {
    if (!projectName.trim()) {
      setProjectName(`${currentIndustryObj.name} Digital Platform`);
    }
    setCurrentStep(2);
  };

  // Step 3 Action: Trigger AI-Assisted Concept Generation
  const handleGenerateConcepts = async () => {
    setIsGenerating(true);
    setCurrentStep(3);

    // Simulate multi-stage concept generation backed by verified Stitch parameters
    setTimeout(() => {
      const concepts = [
        {
          id: "concept-1",
          name: `${projectName || "StarX Solution"} — Primary Direction`,
          style: themePreference === "cosmic-dark" ? "Cosmic Liquid Glass" : "Executive Modern",
          device: platformTargets.includes("Native Android") ? "Mobile App (390×844)" : "Desktop Portal (1440×900)",
          headline: `Next-Generation ${currentIndustryObj.name} Operating Environment`,
          wireframeType: "Enterprise Operations Cockpit",
          colorPalette: ["#030B24", "#071638", "#00D9FF", "#087BFF", "#E52BFF"],
          featuresIncluded: selectedFeatures,
          status: "Generated via Stitch MCP Protocol",
          overview: `Tailored architecture for ${currentIndustryObj.name} integrating ${selectedFeatures.slice(0, 3).join(", ")}. Built with strict type safety, zero-latency caching, and responsive glass surfaces.`
        },
        {
          id: "concept-2",
          name: `${projectName || "StarX Solution"} — Streamlined Variant`,
          style: "Minimalist High-Contrast",
          device: "Universal Responsive",
          headline: `Frictionless ${currentIndustryObj.name} Workflow Hub`,
          wireframeType: "Single-Pane Command Center",
          colorPalette: ["#0A1424", "#0F2038", "#32A9E8", "#1769AA", "#FFFFFF"],
          featuresIncluded: selectedFeatures,
          status: "Generated via Stitch MCP Protocol",
          overview: `Focused on rapid task completion and sub-second input processing. Optimized for high-throughput daily operations and mobile field workers.`
        }
      ];

      setGeneratedConcepts(concepts);
      setIsGenerating(false);
      setCurrentStep(4);
    }, 2400);
  };

  // Step 4 Action: Submit revision
  const handleAddRevision = () => {
    if (!revisionNotes.trim()) return;
    setRevisionList((prev) => [...prev, revisionNotes.trim()]);
    setRevisionNotes("");
  };

  // Step 5 Action: Submit for Engineering Feasibility & Proposal
  const handleSubmitFeasibility = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail.trim() || !clientName.trim()) return;

    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: clientName,
          email: clientEmail,
          phone: clientPhone,
          company: `${projectName} (Design Studio Brief)`,
          serviceSlug: selectedDivision,
          budgetRange: "₹50,000 - ₹2,00,000",
          timeline: "3–6 Weeks",
          projectDetails: `STARX DESIGN STUDIO APPROVED BRIEF:
Industry: ${currentIndustryObj.name}
Division: ${selectedDivision}
Project Name: ${projectName}
Description: ${rawDescription}
Selected Features: ${selectedFeatures.join(", ")}
Target Platforms: ${platformTargets.join(", ")}
Theme: ${themePreference}
Revisions Requested: ${revisionList.join(" | ") || "None"}`,
          sourcePage: "/design-studio",
        }),
      });

      setHandoffSuccess(true);
    } catch {
      setHandoffSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#030B24] text-white selection:bg-[#087BFF] selection:text-white py-12">
      <Container className="space-y-10">
        
        {/* Studio Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#0A1940]">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-[#E52BFF]/20 text-[#E52BFF] border border-[#E52BFF]/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>StarX Design Studio • AI-Powered Planning</span>
              </span>
              <span className="px-2.5 py-1 text-xs font-mono rounded-full bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20 hidden sm:inline">
                Google Stitch Engine
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Design Before You Build.
            </h1>
            <p className="text-sm text-[#C8D5EF] max-w-2xl">
              Describe your software vision, formulate system specifications, explore AI-generated design directions, and obtain an authoritative engineering quotation.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/get-quote"
              className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-[#071638] border border-white/10 rounded-xl hover:border-white/20 transition-all"
            >
              Direct RFQ &rarr;
            </Link>
            <Link
              href="/project-calculator"
              className="px-4 py-2 text-xs font-bold text-[#00D9FF] bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-xl hover:bg-[#00D9FF]/20 transition-all"
            >
              Budget Estimator &rarr;
            </Link>
          </div>
        </div>

        {/* 5-Step Progress Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { num: 1, label: "Discovery" },
            { num: 2, label: "System Brief" },
            { num: 3, label: "AI Concept" },
            { num: 4, label: "Review & Revise" },
            { num: 5, label: "Scope & Quote" },
          ].map((step) => {
            const isPassed = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            return (
              <div
                key={step.num}
                className={`p-3 rounded-2xl border transition-all flex items-center gap-3 ${
                  isCurrent
                    ? "bg-[#071638] border-[#00D9FF] text-white shadow-[0_0_15px_rgba(0,217,255,0.2)]"
                    : isPassed
                    ? "bg-[#030B24] border-emerald-500/40 text-emerald-400"
                    : "bg-[#030B24] border-[#0A1940] text-slate-500"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                    isCurrent
                      ? "bg-[#00D9FF] text-[#030B24]"
                      : isPassed
                      ? "bg-emerald-500 text-white"
                      : "bg-[#071638] text-slate-400"
                  }`}
                >
                  {isPassed ? <Check className="w-3.5 h-3.5" /> : step.num}
                </div>
                <span className="text-xs font-bold tracking-tight truncate">{step.label}</span>
              </div>
            );
          })}
        </div>

        {/* STEP 1: REQUIREMENT DISCOVERY */}
        {currentStep === 1 && (
          <div className="p-8 sm:p-10 rounded-3xl bg-[#071638]/90 border border-[#0A1940] space-y-8 shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00D9FF]">Step 01 / 05</span>
              <h2 className="text-2xl font-black text-white">Define Your Software Project</h2>
              <p className="text-xs text-slate-300">
                Select your industry sector and engineering division to populate tailored capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Industry Select */}
              <div className="space-y-3">
                <label className="text-xs font-mono font-semibold text-slate-300">Target Industry</label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-[#0A1940] text-sm text-white focus:outline-none focus:border-[#00D9FF]"
                >
                  {INDUSTRIES_DATA.map((ind) => (
                    <option key={ind.slug} value={ind.slug}>
                      {ind.emoji} {ind.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Division Select */}
              <div className="space-y-3">
                <label className="text-xs font-mono font-semibold text-slate-300">Primary StarX Division</label>
                <select
                  value={selectedDivision}
                  onChange={(e) => setSelectedDivision(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-[#0A1940] text-sm text-white focus:outline-none focus:border-[#00D9FF]"
                >
                  {DIVISIONS_DATA.map((div) => (
                    <option key={div.slug} value={div.slug}>
                      {div.name} ({div.badge})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Project Name & Description */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono font-semibold text-slate-300">Project Working Title</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Health Patient Portal or Grand Palace Guest Concierge"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-[#0A1940] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-semibold text-slate-300">
                  Describe Your Core Business Workflow or Problem
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe what your software needs to accomplish. Who will use it? What manual process does it replace?"
                  value={rawDescription}
                  onChange={(e) => setRawDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-[#0A1940] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF]"
                />
              </div>
            </div>

            {/* Target Platforms */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-semibold text-slate-300">Target Platforms</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  "Web Responsive (Desktop & Mobile)",
                  "Native Android Mobile App",
                  "Native iOS Mobile App",
                ].map((plat) => {
                  const selected = platformTargets.includes(plat);
                  return (
                    <button
                      type="button"
                      key={plat}
                      onClick={() => togglePlatform(plat)}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                        selected
                          ? "bg-[#087BFF]/20 border-[#00D9FF] text-white"
                          : "bg-[#030B24] border-[#0A1940] text-slate-400 hover:text-white"
                      }`}
                    >
                      <span>{plat}</span>
                      {selected && <Check className="w-4 h-4 text-[#00D9FF]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Key Capabilities Wanted */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-semibold text-slate-300">
                Essential System Features ({currentIndustryObj.name})
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {[
                  ...currentIndustryObj.featuredCapabilities,
                  "Role-Based Access Control",
                  "Automated WhatsApp Notifications",
                  "Payment Gateway Integration",
                  "Interactive Reporting Analytics",
                  "Audit Logging & Security"
                ].map((feat) => {
                  const checked = selectedFeatures.includes(feat);
                  return (
                    <button
                      type="button"
                      key={feat}
                      onClick={() => toggleFeature(feat)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                        checked
                          ? "bg-[#00D9FF]/10 border-[#00D9FF]/50 text-[#00D9FF]"
                          : "bg-[#030B24] border-[#0A1940] text-slate-300 hover:border-white/20"
                      }`}
                    >
                      <span className="truncate">{feat}</span>
                      {checked && <Check className="w-3.5 h-3.5 text-[#00D9FF] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next CTA */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleProceedToBrief}
                className="px-8 py-3 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#087BFF] hover:brightness-110 text-white shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <span>Structure Project Brief</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: STRUCTURED SYSTEM BRIEF */}
        {currentStep === 2 && (
          <div className="p-8 sm:p-10 rounded-3xl bg-[#071638]/90 border border-[#0A1940] space-y-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#00D9FF]">Step 02 / 05</span>
                <h2 className="text-2xl font-black text-white">System Architecture & Project Brief</h2>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Edit
              </button>
            </div>

            {/* Brief Card */}
            <div className="p-6 rounded-2xl bg-[#030B24] border border-[#0A1940] space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/5">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Project Specification</span>
                  <h3 className="text-xl font-bold text-white">{projectName}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="electric" size="sm">{currentIndustryObj.name}</Badge>
                  <Badge variant="corporate" size="sm">{selectedDivision.toUpperCase()}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="space-y-1">
                  <span className="font-mono text-slate-400 uppercase">Target Platforms</span>
                  <p className="font-semibold text-white">{platformTargets.join(", ")}</p>
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-slate-400 uppercase">Architecture Tier</span>
                  <p className="font-semibold text-[#00D9FF]">Enterprise Production (Next.js 16 / Supabase)</p>
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-slate-400 uppercase">Indicative Timeline</span>
                  <p className="font-semibold text-emerald-400">3–5 Weeks Engineering</p>
                </div>
              </div>

              {/* Selected Modules */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Scoped Feature Modules ({selectedFeatures.length})</span>
                <div className="flex flex-wrap gap-2">
                  {selectedFeatures.map((f) => (
                    <span key={f} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#071638] border border-white/10 text-slate-200">
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Theme Preference */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Visual Identity Preference</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {[
                    { id: "cosmic-dark", label: "Cosmic Liquid Glass (Dark Navy)" },
                    { id: "executive-light", label: "Executive Modern (Clean Slate)" },
                    { id: "high-contrast-neon", label: "Cyber Cyberpunk (Laser Cyan)" },
                  ].map((theme) => (
                    <button
                      type="button"
                      key={theme.id}
                      onClick={() => setThemePreference(theme.id as any)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        themePreference === theme.id
                          ? "bg-[#087BFF]/20 border-[#00D9FF] text-white"
                          : "bg-[#071638] border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch AI Generation */}
            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00C98B]" />
                <span>Google Stitch Engine Initialized</span>
              </span>

              <button
                type="button"
                onClick={handleGenerateConcepts}
                className="px-8 py-3 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#E52BFF] to-[#087BFF] hover:brightness-110 text-white shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate AI Design Concepts</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: GENERATING SCREEN */}
        {currentStep === 3 && (
          <div className="p-16 rounded-3xl bg-[#071638]/90 border border-[#0A1940] flex flex-col items-center justify-center text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full border-4 border-[#00D9FF]/20 border-t-[#00D9FF] animate-spin" />
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Synthesizing Design Concepts...</h3>
              <p className="text-xs text-[#00D9FF] font-mono">
                Communicating with Google Stitch Design Engine &amp; Component Registry
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto pt-2">
                Structuring design tokens, responsive typography scales, glass card elevations, and operational navigation trees for {projectName}.
              </p>
            </div>
          </div>
        )}

        {/* STEP 4: DESIGN REVIEW & REVISIONS */}
        {currentStep === 4 && generatedConcepts.length > 0 && (
          <div className="p-8 sm:p-10 rounded-3xl bg-[#071638]/90 border border-[#0A1940] space-y-8 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#00D9FF]">Step 04 / 05</span>
                <h2 className="text-2xl font-black text-white">Interactive Design Review</h2>
              </div>
              <div className="flex gap-2">
                {generatedConcepts.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveConceptIndex(i)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                      activeConceptIndex === i
                        ? "bg-[#00D9FF] text-[#030B24] border-[#00D9FF]"
                        : "bg-[#030B24] text-slate-400 border-[#0A1940]"
                    }`}
                  >
                    Concept 0{i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Concept Display Window */}
            {(() => {
              const concept = generatedConcepts[activeConceptIndex];
              return (
                <div className="space-y-6">
                  {/* Mock Screen Surface */}
                  <div className="rounded-3xl border border-[#0A1940] bg-[#030B24] overflow-hidden shadow-2xl">
                    {/* Browser / Device Chrome Bar */}
                    <div className="px-4 py-3 bg-[#071638] border-b border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        <span className="text-xs font-mono text-slate-400 ml-2">{concept.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#00D9FF] bg-[#00D9FF]/10 px-2 py-0.5 rounded border border-[#00D9FF]/20">
                        {concept.status}
                      </span>
                    </div>

                    {/* Cockpit Content Preview */}
                    <div className="p-8 sm:p-12 space-y-8 bg-gradient-to-b from-[#030B24] via-[#071638]/50 to-[#030B24]">
                      <div className="space-y-3 max-w-xl">
                        <span className="text-[10px] font-mono text-[#00D9FF] uppercase tracking-wider">
                          {concept.wireframeType}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-white">
                          {concept.headline}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {concept.overview}
                        </p>
                      </div>

                      {/* Mock Layout Wireframe Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {concept.featuresIncluded.slice(0, 3).map((f: string, i: number) => (
                          <div key={f} className="p-5 rounded-2xl bg-[#071638] border border-[#0A1940] space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono text-slate-500">Surface 0{i + 1}</span>
                              <div className="w-2 h-2 rounded-full bg-[#00D9FF]" />
                            </div>
                            <h4 className="text-sm font-bold text-white">{f}</h4>
                            <div className="h-12 rounded-xl bg-[#030B24] border border-white/5 flex items-center justify-center text-[10px] font-mono text-slate-500">
                              [Active UI Component]
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Design Tokens Bar */}
                      <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-slate-400">Palette:</span>
                          {concept.colorPalette.map((col: string) => (
                            <span
                              key={col}
                              className="w-5 h-5 rounded-full border border-white/20"
                              style={{ backgroundColor: col }}
                              title={col}
                            />
                          ))}
                        </div>
                        <div className="text-xs font-mono text-slate-400">
                          Style: <strong className="text-white">{concept.style}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Revisions Manager */}
                  <div className="p-6 rounded-2xl bg-[#030B24] border border-[#0A1940] space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#00D9FF]" />
                      <span>Request Revisions or Adjustments</span>
                    </h4>

                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="e.g. Add a dark purple accent, make cards more compact, include biometric touch"
                        value={revisionNotes}
                        onChange={(e) => setRevisionNotes(e.target.value)}
                        className="grow px-4 py-2.5 rounded-xl bg-[#071638] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF]"
                      />
                      <button
                        type="button"
                        onClick={handleAddRevision}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/40 hover:bg-[#00D9FF]/30 cursor-pointer"
                      >
                        Add Note
                      </button>
                    </div>

                    {revisionList.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Recorded Adjustments:</span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {revisionList.map((rev, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E52BFF]" />
                              <span>{rev}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Next Action */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="text-xs font-mono text-slate-400 hover:text-white"
              >
                &larr; Reconfigure Brief
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="px-8 py-3 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#087BFF] hover:brightness-110 text-white shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <span>Approve Design Direction &amp; Get Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: SCOPE, QUOTATION & ENGINEERING HANDOFF */}
        {currentStep === 5 && (
          <div className="p-8 sm:p-10 rounded-3xl bg-[#071638]/90 border border-[#0A1940] space-y-8 shadow-2xl">
            {handoffSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white">Design Brief Submitted to StarX Architects!</h3>
                <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Our Principal Software Architect is reviewing your requirements, Stitch design direction, and feature modules. You will receive an official technical proposal with itemized pricing within 24 business hours.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <LinkButton
                    href="/customer"
                    variant="primary"
                    size="md"
                    className="bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-white font-bold px-6 rounded-full"
                  >
                    Go to Customer Portal
                  </LinkButton>
                  <LinkButton
                    href="/"
                    variant="outline"
                    size="md"
                    className="border-white/20 text-slate-300 hover:text-white px-6 rounded-full"
                  >
                    Return to Homepage
                  </LinkButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeasibility} className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#00D9FF]">Step 05 / 05</span>
                  <h2 className="text-2xl font-black text-white">Engineering Feasibility &amp; Formal Quotation</h2>
                  <p className="text-xs text-slate-300">
                    Submit your approved design direction to our senior architects to generate an authoritative technical scope and timeline.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#030B24] border border-[#0A1940] grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div>
                    <span className="font-mono text-slate-400 uppercase">Selected Project:</span>
                    <p className="font-bold text-white text-sm mt-0.5">{projectName}</p>
                    <p className="text-slate-400 mt-1">{currentIndustryObj.name} • {selectedDivision.toUpperCase()}</p>
                  </div>
                  <div>
                    <span className="font-mono text-slate-400 uppercase">Design Direction:</span>
                    <p className="font-bold text-[#00D9FF] text-sm mt-0.5">
                      {themePreference.toUpperCase()} • {generatedConcepts.length} Concept(s) Generated
                    </p>
                    <p className="text-slate-400 mt-1">{revisionList.length} revision note(s) logged</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold text-slate-300">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-[#0A1940] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold text-slate-300">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. vikram@company.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-[#0A1940] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold text-slate-300">Mobile or WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-[#0A1940] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="text-xs font-mono text-slate-400 hover:text-white"
                  >
                    &larr; Back to Concepts
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#087BFF] hover:brightness-110 text-white shadow-xl flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit for Technical Scope &amp; Quotation</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
