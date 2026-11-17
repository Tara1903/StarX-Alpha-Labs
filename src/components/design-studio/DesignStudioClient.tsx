"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { DIVISIONS_DATA, getDivisionBySlug } from "@/data/divisions";
import { INDUSTRIES_DATA, getIndustryBySlug } from "@/data/industries";
import { CANONICAL_PLANS, GLOBAL_PLAN_ADDONS, getPlanById, getDefaultPlanForDivision } from "@/data/plans";
import { calculateComplexityScore, recommendPlan, ComplexityFactors } from "@/lib/plans/recommendationEngine";
import { buildStitchPromptBlueprint } from "@/lib/stitch/blueprints";
import type {
  StitchDeviceType,
  StitchModelId,
  DesignStudioProject,
  DesignGenerationJob,
  DesignArtifact,
  DesignRevision,
  DesignStudioBrief,
} from "@/lib/stitch/types";
import { STITCH_CAPABILITIES } from "@/lib/stitch/capabilities";
import { parseStitchDesignMd, getStitchCssVariables } from "@/lib/stitch/artifacts";
import {
  Sparkles,
  Layers,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Send,
  Smartphone,
  Laptop,
  Tablet,
  Eye,
  Sliders,
  Check,
  AlertTriangle,
  Cpu,
  FileCode,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  History,
  Lock,
  RefreshCw,
  Share2,
  Copy,
  Wand2,
  ChevronDown,
  Info,
  Code,
  CheckCircle,
  Clock,
  Briefcase,
  Globe,
  SlidersHorizontal,
  ChevronRight,
  Plus,
  Palette,
  Terminal,
  Activity,
  DollarSign,
  TrendingUp,
} from "lucide-react";

const GUEST_SESSION_STORAGE_KEY = "starx_design_studio_guest_session";
const AUTOSAVE_STORAGE_KEY = "starx_design_studio_state_v2";

export function formatINR(val: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

export function formatUSD(val: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(val);
}

function getOrCreateGuestSessionId(): string {
  if (typeof window === "undefined") return "guest_sess_init";
  try {
    let sess = localStorage.getItem(GUEST_SESSION_STORAGE_KEY);
    if (!sess) {
      sess = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(GUEST_SESSION_STORAGE_KEY, sess);
    }
    return sess;
  } catch {
    return `guest_${Date.now()}_fallback`;
  }
}

export function DesignStudioClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialDivision = searchParams.get("division") || "starx-web";
  const initialIndustry = searchParams.get("industry") || "retail-commerce";
  const initialPlan = searchParams.get("plan");
  const queryProjectId = searchParams.get("project");
  const querySessionId = searchParams.get("session");

  // --------------------------------------------------------------------------
  // MASTER 8-STEP WORKFLOW STATE
  // --------------------------------------------------------------------------
  // 1: Solution Discovery
  // 2: AI Requirement Discovery
  // 3: Feature & Complexity Analysis
  // 4: Plan Selection (Recommendation Engine)
  // 5: Feature Configuration & Add-ons
  // 6: Design Personalisation
  // 7: AI Blueprint & Prompt Engine
  // 8: Google Stitch Generation Engine & Hero Presentation Workspace
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [sessionId, setSessionId] = useState<string>("");
  const [isRestoringSession, setIsRestoringSession] = useState<boolean>(true);
  const [restoredBannerOpen, setRestoredBannerOpen] = useState<boolean>(false);

  // STEP 1: SOLUTION DISCOVERY
  const [selectedDivision, setSelectedDivision] = useState<string>(initialDivision);
  const [selectedIndustry, setSelectedIndustry] = useState<string>(initialIndustry);
  const [productCategory, setProductCategory] = useState<string>("Bespoke Digital Headquarters");
  const [platformTargets, setPlatformTargets] = useState<string[]>(["Web Desktop", "Mobile Responsive"]);

  // STEP 2: AI REQUIREMENT DISCOVERY
  const [projectName, setProjectName] = useState<string>("");
  const [rawDescription, setRawDescription] = useState<string>("");
  const [coreProblem, setCoreProblem] = useState<string>("");
  const [intendedUsers, setIntendedUsers] = useState<string>("Consumers & Corporate Decision Makers");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "Sub-Second Dynamic Navigation",
    "Real-Time Inquiry Capture",
    "Verified Security Compliance",
    "Responsive Multi-Resolution Layout",
  ]);
  const [customFeatureInput, setCustomFeatureInput] = useState<string>("");

  // STEP 3: COMPLEXITY CALCULATION (Deterministic)
  const complexityData = useMemo(() => {
    return calculateComplexityScore({
      divisionSlug: selectedDivision,
      platforms: platformTargets,
      selectedFeatures,
      rawDescription: `${rawDescription} ${coreProblem}`,
    });
  }, [selectedDivision, platformTargets, selectedFeatures, rawDescription, coreProblem]);

  // STEP 4: PLAN RECOMMENDATION
  const recommendationData = useMemo(() => {
    return recommendPlan({
      divisionSlug: selectedDivision as any,
      industrySlug: selectedIndustry,
      platforms: platformTargets,
      selectedFeatures,
      complexityScore: complexityData.score,
      complexityFactors: complexityData.factors,
      rawDescription,
    });
  }, [selectedDivision, selectedIndustry, platformTargets, selectedFeatures, complexityData, rawDescription]);

  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    initialPlan || recommendationData.recommendedPlan.id
  );

  // Sync selectedPlan when division changes if current selection is invalid
  useEffect(() => {
    const plan = getPlanById(selectedPlanId);
    if (!plan || plan.divisionSlug !== selectedDivision) {
      setSelectedPlanId(recommendationData.recommendedPlan.id);
    }
  }, [selectedDivision, recommendationData.recommendedPlan.id, selectedPlanId]);

  // STEP 5: FEATURE CONFIGURATION & ADDONS
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([
    "addon-seo-mastery",
  ]);
  const [scopeNotes, setScopeNotes] = useState<string>("");

  // Calculate dynamic authoritative pricing
  const currentPlan = useMemo(() => {
    return getPlanById(selectedPlanId) || recommendationData.recommendedPlan;
  }, [selectedPlanId, recommendationData.recommendedPlan]);

  const pricingTotals = useMemo(() => {
    const baseINR = currentPlan.priceINR;
    const baseUSD = currentPlan.priceUSD;
    let addonsINR = 0;
    let addonsUSD = 0;

    selectedAddonIds.forEach((addonId) => {
      const addon = GLOBAL_PLAN_ADDONS.find((a) => a.id === addonId);
      if (addon) {
        addonsINR += addon.priceINR;
        addonsUSD += addon.priceUSD;
      }
    });

    return {
      baseINR,
      baseUSD,
      addonsINR,
      addonsUSD,
      totalINR: baseINR + addonsINR,
      totalUSD: baseUSD + addonsUSD,
    };
  }, [currentPlan, selectedAddonIds]);

  // STEP 6: DESIGN PERSONALISATION
  const [brandName, setBrandName] = useState<string>("");
  const [themePreference, setThemePreference] = useState<string>("cosmic-dark");
  const [palettePrimary, setPalettePrimary] = useState<string>("#00D9FF");
  const [paletteAccent, setPaletteAccent] = useState<string>("#087BFF");
  const [paletteBg, setPaletteBg] = useState<string>("#030B24");
  const [deviceTarget, setDeviceTarget] = useState<StitchDeviceType>("DESKTOP");
  const [modelPreference, setModelPreference] = useState<StitchModelId>("GEMINI_3_8_FLASH");

  // STEP 7: AI BLUEPRINT
  const promptBlueprint = useMemo(() => {
    return buildStitchPromptBlueprint({
      projectName: brandName || projectName || "StarX Project",
      divisionSlug: selectedDivision,
      industrySlug: selectedIndustry,
      category: productCategory,
      deviceType: deviceTarget,
      brandPalette: {
        primary: palettePrimary,
        accent: paletteAccent,
        background: paletteBg,
      },
      features: selectedFeatures,
      userRequirements: `${rawDescription}. Problem Solved: ${coreProblem}. Target Users: ${intendedUsers}.`,
      stylePreset: themePreference,
    });
  }, [
    brandName,
    projectName,
    selectedDivision,
    selectedIndustry,
    productCategory,
    deviceTarget,
    palettePrimary,
    paletteAccent,
    paletteBg,
    selectedFeatures,
    rawDescription,
    coreProblem,
    intendedUsers,
    themePreference,
  ]);

  // STEP 8: STITCH GENERATION & PRESENTATION WORKSPACE
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationStageText, setGenerationStageText] = useState<string>("");
  const [activeProject, setActiveProject] = useState<DesignStudioProject | null>(null);
  const [activeJob, setActiveJob] = useState<DesignGenerationJob | null>(null);
  const [activeArtifact, setActiveArtifact] = useState<DesignArtifact | null>(null);
  const [allArtifacts, setAllArtifacts] = useState<DesignArtifact[]>([]);
  const [revisionsList, setRevisionsList] = useState<DesignRevision[]>([]);
  const [activeViewport, setActiveViewport] = useState<StitchDeviceType>("DESKTOP");
  const [previewMode, setPreviewMode] = useState<"sandbox" | "visual">("sandbox");
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [briefDrawerOpen, setBriefDrawerOpen] = useState<boolean>(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [refinementPrompt, setRefinementPrompt] = useState<string>("");
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [refinementToast, setRefinementToast] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [activeVersionDropdown, setActiveVersionDropdown] = useState<boolean>(false);

  // Client Quote Form State
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientCompany, setClientCompany] = useState<string>("");
  const [clientNotes, setClientNotes] = useState<string>("");
  const [isSubmittingQuote, setIsSubmittingQuote] = useState<boolean>(false);
  const [quoteSubmittedCode, setQuoteSubmittedCode] = useState<string | null>(null);

  // Current entity lookups
  const currentDivisionObj = useMemo(() => {
    return getDivisionBySlug(selectedDivision) || DIVISIONS_DATA[0];
  }, [selectedDivision]);

  const currentIndustryObj = useMemo(() => {
    return getIndustryBySlug(selectedIndustry) || INDUSTRIES_DATA[0];
  }, [selectedIndustry]);

  // --------------------------------------------------------------------------
  // INITIALIZATION & SESSION RESTORATION
  // --------------------------------------------------------------------------
  useEffect(() => {
    const sess = querySessionId || getOrCreateGuestSessionId();
    setSessionId(sess);

    // Try restoring state from localStorage
    try {
      const saved = localStorage.getItem(AUTOSAVE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.projectName) setProjectName(parsed.projectName);
        if (parsed.rawDescription) setRawDescription(parsed.rawDescription);
        if (parsed.selectedDivision) setSelectedDivision(parsed.selectedDivision);
        if (parsed.selectedIndustry) setSelectedIndustry(parsed.selectedIndustry);
        if (parsed.selectedPlanId) setSelectedPlanId(parsed.selectedPlanId);
        if (parsed.selectedAddonIds) setSelectedAddonIds(parsed.selectedAddonIds);
        if (parsed.brandName) setBrandName(parsed.brandName);
        if (parsed.activeArtifact) {
          setActiveArtifact(parsed.activeArtifact);
          if (parsed.allArtifacts) setAllArtifacts(parsed.allArtifacts);
          if (parsed.activeProject) setActiveProject(parsed.activeProject);
          if (parsed.currentStep) setCurrentStep(parsed.currentStep);
          setRestoredBannerOpen(true);
        }
      }
    } catch (e) {
      console.warn("[DesignStudio] Failed to parse local state", e);
    } finally {
      setIsRestoringSession(false);
    }
  }, [querySessionId]);

  // Auto-save state to localStorage
  useEffect(() => {
    if (isRestoringSession || typeof window === "undefined") return;
    try {
      const stateToSave = {
        currentStep,
        selectedDivision,
        selectedIndustry,
        productCategory,
        platformTargets,
        projectName,
        rawDescription,
        coreProblem,
        intendedUsers,
        selectedFeatures,
        selectedPlanId,
        selectedAddonIds,
        brandName,
        themePreference,
        palettePrimary,
        paletteAccent,
        paletteBg,
        deviceTarget,
        activeProject,
        activeArtifact,
        allArtifacts,
        updatedAt: Date.now(),
      };
      localStorage.setItem(AUTOSAVE_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {}
  }, [
    currentStep,
    selectedDivision,
    selectedIndustry,
    productCategory,
    platformTargets,
    projectName,
    rawDescription,
    coreProblem,
    intendedUsers,
    selectedFeatures,
    selectedPlanId,
    selectedAddonIds,
    brandName,
    themePreference,
    palettePrimary,
    paletteAccent,
    paletteBg,
    deviceTarget,
    activeProject,
    activeArtifact,
    allArtifacts,
    isRestoringSession,
  ]);

  // --------------------------------------------------------------------------
  // STITCH GENERATION DISPATCHER
  // --------------------------------------------------------------------------
  const handleLaunchStitchGeneration = async () => {
    setIsGenerating(true);
    setCurrentStep(8);
    setGenerationProgress(15);
    setGenerationStageText("Initializing Google Stitch MCP session & secure project envelope...");

    try {
      // 1. Initialize or update Design Studio Project
      const projRes = await fetch("/api/design-studio/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId,
        },
        body: JSON.stringify({
          brief: {
            industrySlug: selectedIndustry,
            industryName: currentIndustryObj.name,
            divisionSlug: selectedDivision,
            divisionName: currentDivisionObj.name,
            projectName: brandName.trim() || projectName.trim() || "StarX Personalized Demo",
            description: rawDescription.trim() || `Bespoke solution for ${currentIndustryObj.name}.`,
            platformTargets,
            selectedFeatures,
            themePreference,
            deviceTarget,
            modelPreference,
            specialInstructions: promptBlueprint.prompt,
          },
          contact: {
            sessionId: sessionId || undefined,
            name: clientName || undefined,
            email: clientEmail || undefined,
            phone: clientPhone || undefined,
          },
          sessionId: sessionId || undefined,
        }),
      });

      const projData = await projRes.json();
      if (!projData.ok || !projData.project) {
        throw new Error(projData.error || "Failed to initialize design studio project");
      }

      const createdProject: DesignStudioProject = projData.project;
      setActiveProject(createdProject);

      setGenerationProgress(45);
      setGenerationStageText("Invoking Google Stitch MCP generate_screen_from_text tool with Gemini 3.8 Flash...");

      // 2. Dispatch Generation Job with compiled Blueprint Prompt
      const jobRes = await fetch("/api/design-studio/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: createdProject.id,
          modelId: modelPreference,
          deviceType: deviceTarget,
          customPrompt: promptBlueprint.prompt,
        }),
      });

      setGenerationProgress(80);
      setGenerationStageText("Synthesizing responsive HTML layout, Material You tokens & component chassis...");

      const jobData = await jobRes.json();
      if (jobData.ok && jobData.artifact) {
        setActiveJob(jobData.job);
        setActiveArtifact(jobData.artifact);
        setAllArtifacts([jobData.artifact]);
        setActiveViewport(jobData.artifact.deviceType || deviceTarget);

        setGenerationProgress(100);
        setGenerationStageText("Personalized Demo Generation Complete! Entering Interactive Workspace...");
      } else if (jobData.job?.status === "queued") {
        setActiveJob(jobData.job);
        setGenerationProgress(100);
        setGenerationStageText("Project queued in PostgreSQL for persistent processing.");
      } else {
        throw new Error(jobData.error || "Generation job failed to produce artifact");
      }
    } catch (err: any) {
      console.error("[DesignStudio] Generation error:", err);
      setGenerationStageText(`Error: ${err.message || "Failed to generate design."}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Natural Language Refinement with Stitch edit_screens
  const handleRefineDesign = async (customText?: string) => {
    const textToSubmit = (customText || refinementPrompt).trim();
    if (!textToSubmit || !activeProject || !activeArtifact) return;

    setIsRefining(true);
    setRefinementToast("Google Stitch is synthesizing your requested revisions...");

    try {
      const res = await fetch("/api/design-studio/revisions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId,
        },
        body: JSON.stringify({
          projectId: activeProject.id,
          artifactId: activeArtifact.id,
          notes: textToSubmit,
          triggerRegeneration: true,
          deviceType: activeViewport,
          modelId: modelPreference,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        if (data.revision) {
          setRevisionsList((prev) => [...prev, data.revision]);
        }
        if (data.newArtifact) {
          setActiveArtifact(data.newArtifact);
          setAllArtifacts((prev) => {
            const list = prev.filter((a) => a.id !== data.newArtifact.id);
            return [...list, data.newArtifact];
          });
          setRefinementToast(
            `Success! Version ${data.newArtifact.versionNumber} generated with your updates.`
          );
        } else {
          setRefinementToast("Revision note logged for StarX engineering review.");
        }
        setRefinementPrompt("");
      } else {
        setRefinementToast(data.error || "Revision could not be generated.");
      }
    } catch (err: any) {
      console.error("[DesignStudio] Refinement error:", err);
      setRefinementToast("Revision error. Please retry.");
    } finally {
      setIsRefining(false);
      setTimeout(() => setRefinementToast(null), 4500);
    }
  };

  // Submit Quotation & Engineering Handoff
  const handleSubmitQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail.trim() || !clientName.trim() || !activeProject) return;

    setIsSubmittingQuote(true);
    try {
      const handoffDetails = [
        `STARX DESIGN STUDIO — COMPLETE QUOTATION HANDOFF`,
        `Project ID: ${activeProject.projectCode} (${activeProject.id})`,
        `Title: ${activeProject.title}`,
        `Stitch Screen ID: ${activeArtifact?.providerScreenId || "Google Stitch MCP Generated"}`,
        `Approved Version: v${activeArtifact?.versionNumber || 1}`,
        `Division: ${currentDivisionObj.name} (${selectedDivision})`,
        `Industry: ${currentIndustryObj.name} (${selectedIndustry})`,
        `Selected Plan: ${currentPlan.name} (${currentPlan.code}) — ${formatINR(currentPlan.priceINR)} / ${formatUSD(currentPlan.priceUSD)}`,
        `Selected Add-ons: ${selectedAddonIds.join(", ") || "None"} (Total Addons: ${formatINR(pricingTotals.addonsINR)})`,
        `Estimated Total Investment: ${formatINR(pricingTotals.totalINR)} / ${formatUSD(pricingTotals.totalUSD)}`,
        `Target Platforms: ${platformTargets.join(", ")}`,
        `Primary Viewport: ${activeViewport}`,
        `Brand Palette: Primary ${palettePrimary}, Accent ${paletteAccent}`,
        `Customer Notes: ${clientNotes || "None"}`,
        `Scope Special Instructions: ${scopeNotes || "None"}`,
      ].join("\n\n");

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: clientName,
          email: clientEmail,
          phone: clientPhone || "+91 99999 99999",
          company: clientCompany || `${projectName} (${currentIndustryObj.name})`,
          serviceSlug: selectedDivision,
          budgetRange: `${formatINR(pricingTotals.totalINR)} (${currentPlan.name})`,
          timeline: currentPlan.timelineWeeks,
          projectDetails: handoffDetails,
          sourcePage: "/design-studio",
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setQuoteSubmittedCode(data.quoteId || activeProject.projectCode);
        setQuoteModalOpen(false);
      } else {
        alert(data.error || "Failed to submit quotation.");
      }
    } catch {
      alert("Submission error. Please verify network connectivity.");
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  const stepTitles = [
    { num: 1, label: "Discovery", sub: "Division & Industry" },
    { num: 2, label: "Requirements", sub: "Idea & Workflows" },
    { num: 3, label: "Complexity", sub: "Technical Audit" },
    { num: 4, label: "Plan Match", sub: "AI Recommendation" },
    { num: 5, label: "Configuration", sub: "Scope & Add-ons" },
    { num: 6, label: "Brand Styling", sub: "Palette & Themes" },
    { num: 7, label: "AI Blueprint", sub: "Stitch Prompt" },
    { num: 8, label: "Live Demo", sub: "Workspace & Handoff" },
  ];

  return (
    <div className="min-h-screen bg-[#030B24] text-white selection:bg-[#087BFF] selection:text-white">
      {/* Toast Notifications */}
      {refinementToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#071638] border border-[#00D9FF] text-white text-xs font-mono shadow-2xl flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-[#00D9FF] animate-spin" />
          <span>{refinementToast}</span>
        </div>
      )}

      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#00C98B] text-black text-xs font-bold shadow-2xl flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{shareToast}</span>
        </div>
      )}

      {/* Session Restored Recovery Banner */}
      {restoredBannerOpen && (
        <div className="bg-[#071638] border-b border-[#00D9FF]/30 py-2.5 px-4 text-xs font-mono text-center flex items-center justify-center gap-4">
          <span className="text-[#00D9FF] flex items-center gap-1.5">
            <History className="w-3.5 h-3.5" />
            Previous Design Studio session restored automatically.
          </span>
          <button
            type="button"
            onClick={() => setRestoredBannerOpen(false)}
            className="text-slate-400 hover:text-white underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Sticky 8-Step Header Stepper */}
      <div className="sticky top-16 sm:top-20 z-40 bg-[#030B24]/90 backdrop-blur-xl border-b border-white/10 py-3">
        <Container>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00D9FF] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>StarX Studio</span>
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-xs text-slate-300 hidden sm:inline font-mono">
                Step {currentStep} of 8: {stepTitles[currentStep - 1]?.label}
              </span>
            </div>

            {/* Stepper Navigation Pills */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
              {stepTitles.map((s) => {
                const isCurrent = s.num === currentStep;
                const isPassed = s.num < currentStep;
                return (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => {
                      if (isPassed || (s.num === 8 && activeArtifact)) {
                        setCurrentStep(s.num);
                      }
                    }}
                    disabled={!isPassed && s.num > currentStep && !(s.num === 8 && activeArtifact)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                      isCurrent
                        ? "bg-[#00D9FF] text-black shadow-[0_0_15px_rgba(0,217,255,0.4)]"
                        : isPassed
                        ? "bg-[#071638] text-white border border-white/20 hover:border-[#00D9FF] cursor-pointer"
                        : "bg-white/5 text-slate-500 border border-transparent cursor-not-allowed"
                    }`}
                  >
                    <span>{s.num}.</span>
                    <span className="hidden md:inline">{s.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Pricing Peek */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono bg-[#071638] px-3 py-1 rounded-xl border border-white/10">
              <span className="text-slate-400">Scope:</span>
              <span className="text-white font-bold">{formatINR(pricingTotals.totalINR)}</span>
            </div>
          </div>
        </Container>
      </div>

      <main className="py-10">
        <Container>
          {/* ================================================================ */}
          {/* STEP 1: SOLUTION DISCOVERY */}
          {/* ================================================================ */}
          {currentStep === 1 && (
            <div className="max-w-5xl mx-auto space-y-10">
              <div className="text-center space-y-3">
                <Badge variant="electric" dot>Step 1 of 8 • Solution Discovery</Badge>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Discover Your Technology Solution.
                </h1>
                <p className="text-sm sm:text-base text-[#C8D5EF] max-w-2xl mx-auto">
                  Select your core practice division, industry domain, and target platforms to anchor your architecture.
                </p>
              </div>

              {/* Division Selector */}
              <div className="space-y-4">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                  Select Practice Division (6 Canonical Domains)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {DIVISIONS_DATA.map((div) => {
                    const isSelected = selectedDivision === div.slug;
                    return (
                      <div
                        key={div.slug}
                        onClick={() => setSelectedDivision(div.slug)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                          isSelected
                            ? "bg-[#071638] border-[#00D9FF] shadow-[0_0_25px_rgba(0,217,255,0.25)] ring-1 ring-[#00D9FF]"
                            : "bg-[#0A1940]/70 border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span 
                            className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                            style={{ backgroundColor: `${div.accentColor}20`, color: div.accentColor }}
                          >
                            {div.badge}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#00D9FF]" />}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white">{div.name}</h4>
                          <p className="text-xs text-[#C8D5EF] mt-1 leading-relaxed line-clamp-2">
                            {div.tagline}
                          </p>
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
                          {div.indicativePrice}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Industry Selector */}
              <div className="space-y-4">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                  Select Target Industry (12 Industry Transformations)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {INDUSTRIES_DATA.map((ind) => {
                    const isSelected = selectedIndustry === ind.slug;
                    return (
                      <button
                        key={ind.slug}
                        type="button"
                        onClick={() => setSelectedIndustry(ind.slug)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? "bg-[#071638] border-[#00D9FF] text-white shadow-md"
                            : "bg-[#0A1940]/50 border-white/10 text-slate-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="text-xl">{ind.emoji}</span>
                        <div className="truncate">
                          <div className="text-xs font-bold truncate">{ind.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono truncate">{ind.badge}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Platform Targets */}
              <div className="space-y-4">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                  Select Target Deployment Platforms
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Web Desktop (1440px)",
                    "Mobile Responsive",
                    "Native iOS (iPhone)",
                    "Native Android",
                    "Progressive Web App (PWA)",
                    "Tablet / POS Terminal",
                    "Cloud Backend API",
                  ].map((plat) => {
                    const isChecked = platformTargets.includes(plat);
                    return (
                      <button
                        key={plat}
                        type="button"
                        onClick={() => {
                          setPlatformTargets((prev) =>
                            isChecked ? prev.filter((p) => p !== plat) : [...prev, plat]
                          );
                        }}
                        className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                          isChecked
                            ? "bg-[#00D9FF]/15 border-[#00D9FF] text-[#00D9FF]"
                            : "bg-[#0A1940] border-white/10 text-slate-400 hover:text-white"
                        }`}
                      >
                        {isChecked ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{plat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 1 Actions */}
              <div className="flex justify-end pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black font-extrabold text-sm shadow-xl hover:brightness-110 flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Requirements</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* STEP 2: AI REQUIREMENT DISCOVERY */}
          {/* ================================================================ */}
          {currentStep === 2 && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-3">
                <Badge variant="electric" dot>Step 2 of 8 • AI Requirement Discovery</Badge>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Frame Your Software Product.
                </h1>
                <p className="text-sm sm:text-base text-[#C8D5EF] max-w-2xl mx-auto">
                  Describe what your platform will do. Our AI engine extracts features, users, and complexity automatically.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#0A1940] border border-white/10 space-y-6">
                {/* Project Title */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Project or Brand Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g., Nexus POS, Zenith Luxury Store, Aura Health Portal"
                    className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-[#00D9FF] focus:outline-none"
                  />
                </div>

                {/* Core Idea Description */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Describe Your Platform &amp; Key Business Workflows
                  </label>
                  <textarea
                    rows={4}
                    value={rawDescription}
                    onChange={(e) => setRawDescription(e.target.value)}
                    placeholder="Describe what users do on this platform, what problems it solves, and what screens or features are most critical..."
                    className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-[#00D9FF] focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Core Problem Solved */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    What Primary Problem Does This Solve?
                  </label>
                  <input
                    type="text"
                    value={coreProblem}
                    onChange={(e) => setCoreProblem(e.target.value)}
                    placeholder="e.g., Eliminates manual spreadsheet errors; speeds up customer checkout by 3x"
                    className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-[#00D9FF] focus:outline-none"
                  />
                </div>

                {/* Intended Users */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Target Users / Stakeholders
                  </label>
                  <input
                    type="text"
                    value={intendedUsers}
                    onChange={(e) => setIntendedUsers(e.target.value)}
                    placeholder="e.g., Store Cashiers, Field Technicians, Paying Consumers, Super Admins"
                    className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-[#00D9FF] focus:outline-none"
                  />
                </div>

                {/* Feature Tags */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                    Core Capabilities &amp; Feature Modules
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedFeatures.map((f) => (
                      <span
                        key={f}
                        className="px-3 py-1.5 rounded-lg bg-[#071638] border border-[#00D9FF]/40 text-xs font-mono text-white flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00D9FF]" />
                        <span>{f}</span>
                        <button
                          type="button"
                          onClick={() => setSelectedFeatures((prev) => prev.filter((item) => item !== f))}
                          className="hover:text-red-400 text-slate-500 cursor-pointer"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      value={customFeatureInput}
                      onChange={(e) => setCustomFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && customFeatureInput.trim()) {
                          e.preventDefault();
                          setSelectedFeatures((prev) => [...prev, customFeatureInput.trim()]);
                          setCustomFeatureInput("");
                        }
                      }}
                      placeholder="Add custom feature (Press Enter)..."
                      className="grow px-4 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-xs text-white placeholder-slate-500 focus:border-[#00D9FF] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customFeatureInput.trim()) {
                          setSelectedFeatures((prev) => [...prev, customFeatureInput.trim()]);
                          setCustomFeatureInput("");
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white cursor-pointer"
                    >
                      Add Feature
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 2 Actions */}
              <div className="flex justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Discovery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black font-extrabold text-sm shadow-xl hover:brightness-110 flex items-center gap-2 cursor-pointer"
                >
                  <span>Analyze Complexity</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* STEP 3: FEATURE & COMPLEXITY ANALYSIS */}
          {/* ================================================================ */}
          {currentStep === 3 && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-3">
                <Badge variant="electric" dot>Step 3 of 8 • Architectural Complexity Audit</Badge>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Transparent Complexity Scoring.
                </h1>
                <p className="text-sm sm:text-base text-[#C8D5EF] max-w-2xl mx-auto">
                  Our deterministic multi-factor model audits your requirements across 5 engineering dimensions to recommend the right plan.
                </p>
              </div>

              {/* Score Meter & Radar Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Score Card */}
                <div className="p-8 rounded-3xl bg-[#0A1940] border border-white/10 flex flex-col justify-between items-center text-center space-y-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D9FF]">
                    Architectural Complexity
                  </span>
                  <div className="relative flex items-center justify-center">
                    <div className="w-36 h-36 rounded-full border-4 border-[#071638] flex items-center justify-center bg-[#030B24] shadow-[0_0_40px_rgba(0,217,255,0.2)]">
                      <div className="text-5xl font-black text-white">
                        {complexityData.score}
                        <span className="text-xl text-[#00D9FF]">/10</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-300">
                    {complexityData.score <= 3
                      ? "Essential Lean Scope (Starter Match)"
                      : complexityData.score <= 6
                      ? "Scaling Platform (Growth Match)"
                      : complexityData.score <= 8
                      ? "Enterprise Mission-Critical"
                      : "Bespoke Proprietary Architecture"}
                  </span>
                </div>

                {/* 5-Factor Radar Breakdown */}
                <div className="md:col-span-2 p-8 rounded-3xl bg-[#0A1940] border border-white/10 space-y-4">
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                    5-Factor Architectural Vectors
                  </h3>

                  <div className="space-y-3 text-xs font-mono">
                    {[
                      { name: "External System Integrations", val: complexityData.factors.integrations },
                      { name: "Real-Time Telemetry & Sync", val: complexityData.factors.realTime },
                      { name: "Security, RBAC & Compliance", val: complexityData.factors.security },
                      { name: "Multi-Platform Coverage", val: complexityData.factors.platforms },
                      { name: "Data Volume & Throughput Scale", val: complexityData.factors.scale },
                    ].map((f) => (
                      <div key={f.name} className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>{f.name}</span>
                          <span className="text-[#00D9FF] font-bold">{f.val} / 10</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#030B24] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#087BFF] to-[#00D9FF] rounded-full transition-all duration-500"
                            style={{ width: `${f.val * 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/5 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">Identified Drivers:</span>
                    {complexityData.breakdown.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-[#C8D5EF]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3 Actions */}
              <div className="flex justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Requirements</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black font-extrabold text-sm shadow-xl hover:brightness-110 flex items-center gap-2 cursor-pointer"
                >
                  <span>Review Recommended Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* STEP 4: PLAN SELECTION */}
          {/* ================================================================ */}
          {currentStep === 4 && (
            <div className="max-w-5xl mx-auto space-y-10">
              <div className="text-center space-y-3">
                <Badge variant="electric" dot>Step 4 of 8 • Deterministic Plan Recommendation</Badge>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Selected Commercial Scope.
                </h1>
                <p className="text-sm sm:text-base text-[#C8D5EF] max-w-2xl mx-auto">
                  Our recommendation engine matches your scope deterministically. No arbitrary budget sliders — the plan sets the commercial boundary.
                </p>
              </div>

              {/* AI Justification Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#087BFF]/20 via-[#071638] to-[#00D9FF]/20 border border-[#00D9FF]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#00D9FF]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00D9FF]">
                      AI Recommendation Engine Match
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#00D9FF] text-black">
                    {recommendationData.matchConfidence}% Match Confidence
                  </span>
                </div>
                <p className="text-sm text-white leading-relaxed font-medium">
                  {recommendationData.justification}
                </p>
              </div>

              {/* Side-by-Side Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {CANONICAL_PLANS.filter((p) => p.divisionSlug === selectedDivision).map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  const isRecommended = plan.id === recommendationData.recommendedPlan.id;

                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`rounded-3xl p-6 bg-[#0A1940] border transition-all cursor-pointer flex flex-col justify-between relative ${
                        isSelected
                          ? "border-[#00D9FF] shadow-[0_0_35px_rgba(0,217,255,0.3)] ring-2 ring-[#00D9FF]"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      {isRecommended && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black text-[10px] font-mono font-black uppercase tracking-wider py-0.5 px-3 rounded-full shadow-md">
                          Recommended Match
                        </div>
                      )}

                      <div className="space-y-4">
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#030B24] text-white border border-white/10">
                            {plan.code}
                          </span>
                          <span className="text-[10px] font-mono text-[#00D9FF]">{plan.timelineWeeks}</span>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                          <p className="text-xs text-[#C8D5EF] mt-1 leading-relaxed line-clamp-2">
                            {plan.tagline}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#030B24] border border-white/5 space-y-1">
                          <span className="text-[9px] font-mono uppercase text-slate-400 block">
                            Milestone Investment
                          </span>
                          <div className="text-xl font-black text-white">
                            {formatINR(plan.priceINR)}
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 block">
                            {formatUSD(plan.priceUSD)}
                          </span>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-[#C8D5EF]">
                          <span className="text-[10px] font-bold uppercase text-white block">Key Deliverables:</span>
                          {plan.includedFeatures.slice(0, 3).map((f) => (
                            <div key={f.id} className="flex items-start gap-1.5 text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{f.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6">
                        <button
                          type="button"
                          className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                            isSelected
                              ? "bg-[#00D9FF] text-black font-extrabold"
                              : "bg-white/10 text-white hover:bg-white/20"
                          }`}
                        >
                          {isSelected ? "Selected Plan ✓" : "Select Plan"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Step 4 Actions */}
              <div className="flex justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Complexity</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black font-extrabold text-sm shadow-xl hover:brightness-110 flex items-center gap-2 cursor-pointer"
                >
                  <span>Configure Features &amp; Add-ons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* STEP 5: FEATURE CONFIGURATION & ADDONS */}
          {/* ================================================================ */}
          {currentStep === 5 && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-3">
                <Badge variant="electric" dot>Step 5 of 8 • Scope &amp; Add-on Configuration</Badge>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Customize Scope &amp; Extras.
                </h1>
                <p className="text-sm sm:text-base text-[#C8D5EF] max-w-2xl mx-auto">
                  Review plan deliverables and toggle verified modular add-ons with dynamic authoritative pricing.
                </p>
              </div>

              {/* Base Plan Review Card */}
              <div className="p-6 rounded-3xl bg-[#0A1940] border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#00D9FF]">Selected Base Plan</span>
                    <h3 className="text-2xl font-bold text-white">{currentPlan.name} ({currentPlan.code})</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-white">{formatINR(currentPlan.priceINR)}</div>
                    <span className="text-xs font-mono text-slate-400">{formatUSD(currentPlan.priceUSD)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/5 text-xs text-[#C8D5EF]">
                  {currentPlan.includedFeatures.map((f) => (
                    <div key={f.id} className="flex items-start gap-2 bg-[#030B24] p-2.5 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#00C98B] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">{f.name}</strong>
                        <span className="text-[11px] text-slate-400">{f.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modular Add-Ons Selection */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Verified Modular Add-Ons (Optional)
                  </label>
                  <span className="text-xs font-mono text-[#00D9FF]">
                    {selectedAddonIds.length} Add-on(s) Selected (+{formatINR(pricingTotals.addonsINR)})
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {GLOBAL_PLAN_ADDONS.map((addon) => {
                    const isSelected = selectedAddonIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => {
                          setSelectedAddonIds((prev) =>
                            isSelected ? prev.filter((id) => id !== addon.id) : [...prev, addon.id]
                          );
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between gap-4 ${
                          isSelected
                            ? "bg-[#071638] border-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.2)]"
                            : "bg-[#0A1940] border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="w-4 h-4 rounded text-[#00D9FF]"
                            />
                            <h4 className="text-sm font-bold text-white">{addon.name}</h4>
                          </div>
                          <p className="text-xs text-[#C8D5EF] leading-relaxed pl-6">
                            {addon.description}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-sm font-extrabold text-white">{formatINR(addon.priceINR)}</div>
                          <span className="text-[10px] font-mono text-slate-400">{formatUSD(addon.priceUSD)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Total Investment Summary */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#071638] via-[#0A1940] to-[#071638] border border-[#00D9FF]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00D9FF]">
                    Total Authoritative Scope Investment
                  </span>
                  <div className="text-xs text-slate-300">
                    Includes {currentPlan.screenOrPageScope}, {currentPlan.timelineWeeks} execution, and {currentPlan.postLaunchWarrantyDays}-day warranty.
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-black text-white">{formatINR(pricingTotals.totalINR)}</div>
                  <span className="text-xs font-mono text-slate-400">Approx. {formatUSD(pricingTotals.totalUSD)}</span>
                </div>
              </div>

              {/* Step 5 Actions */}
              <div className="flex justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Plan</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(6)}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black font-extrabold text-sm shadow-xl hover:brightness-110 flex items-center gap-2 cursor-pointer"
                >
                  <span>Personalize Design &amp; Brand</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* STEP 6: DESIGN PERSONALISATION */}
          {/* ================================================================ */}
          {currentStep === 6 && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-3">
                <Badge variant="electric" dot>Step 6 of 8 • Visual Personalisation</Badge>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Style Your Demo Identity.
                </h1>
                <p className="text-sm sm:text-base text-[#C8D5EF] max-w-2xl mx-auto">
                  Customize the brand colors, design theme, and viewport target before invoking Google Stitch.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#0A1940] border border-white/10 space-y-6">
                {/* Brand Title */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Display Brand / Logo Name
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder={projectName || "e.g., StarX Alpha Labs"}
                    className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-[#00D9FF] focus:outline-none"
                  />
                </div>

                {/* Color Palette Presets & Swatches */}
                <div className="space-y-4">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                    Brand Color Palette (Industry Presets)
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { name: "Cyan Cyber", primary: "#00D9FF", accent: "#087BFF", bg: "#030B24" },
                      { name: "Neon Violet", primary: "#E52BFF", accent: "#873BFF", bg: "#0C0617" },
                      { name: "Solar Amber", primary: "#FF941F", accent: "#FF35B8", bg: "#0D0A14" },
                      { name: "Emerald Tech", primary: "#00C98B", accent: "#00D9FF", bg: "#04141E" },
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setPalettePrimary(preset.primary);
                          setPaletteAccent(preset.accent);
                          setPaletteBg(preset.bg);
                        }}
                        className="p-3 rounded-xl bg-[#030B24] border border-white/10 hover:border-white/30 text-left space-y-2 cursor-pointer"
                      >
                        <div className="flex gap-1.5">
                          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }} />
                          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.accent }} />
                          <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.bg }} />
                        </div>
                        <span className="text-xs font-bold text-white block">{preset.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Manual Hex Swatches */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-400">Primary Brand Color</label>
                      <div className="flex items-center gap-2 bg-[#030B24] px-3 py-2 rounded-xl border border-white/10">
                        <input
                          type="color"
                          value={palettePrimary}
                          onChange={(e) => setPalettePrimary(e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                        />
                        <input
                          type="text"
                          value={palettePrimary}
                          onChange={(e) => setPalettePrimary(e.target.value)}
                          className="bg-transparent text-xs font-mono text-white focus:outline-none w-20"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-400">Accent Interactive</label>
                      <div className="flex items-center gap-2 bg-[#030B24] px-3 py-2 rounded-xl border border-white/10">
                        <input
                          type="color"
                          value={paletteAccent}
                          onChange={(e) => setPaletteAccent(e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                        />
                        <input
                          type="text"
                          value={paletteAccent}
                          onChange={(e) => setPaletteAccent(e.target.value)}
                          className="bg-transparent text-xs font-mono text-white focus:outline-none w-20"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-400">Surface Background</label>
                      <div className="flex items-center gap-2 bg-[#030B24] px-3 py-2 rounded-xl border border-white/10">
                        <input
                          type="color"
                          value={paletteBg}
                          onChange={(e) => setPaletteBg(e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                        />
                        <input
                          type="text"
                          value={paletteBg}
                          onChange={(e) => setPaletteBg(e.target.value)}
                          className="bg-transparent text-xs font-mono text-white focus:outline-none w-20"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Theme Style Presets */}
                <div className="space-y-3">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                    Visual Theme Style
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: "cosmic-dark", label: "Cosmic Dark", desc: "Deep space black & neon cyan" },
                      { id: "cyber-neon", label: "Cyberpunk Neon", desc: "High-contrast magenta & purple" },
                      { id: "clean-corporate", label: "Clean Corporate", desc: "High-trust sapphire & navy" },
                      { id: "minimalist", label: "Sleek Minimalist", desc: "Monochrome with subtle borders" },
                    ].map((theme) => {
                      const isSelected = themePreference === theme.id;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => setThemePreference(theme.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#071638] border-[#00D9FF] text-white shadow-md"
                              : "bg-[#030B24] border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          <span className="text-xs font-bold text-white block">{theme.label}</span>
                          <span className="text-[10px] text-slate-400 leading-tight block mt-1">{theme.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Viewport Target Chassis */}
                <div className="space-y-3">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                    Target Viewport Chassis for Generation
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "DESKTOP" as StitchDeviceType, label: "Desktop Web (1440px)", icon: Laptop },
                      { id: "TABLET" as StitchDeviceType, label: "Tablet / POS (768px)", icon: Tablet },
                      { id: "MOBILE" as StitchDeviceType, label: "Mobile App (390px)", icon: Smartphone },
                    ].map((vp) => {
                      const Icon = vp.icon;
                      const isSelected = deviceTarget === vp.id;
                      return (
                        <button
                          key={vp.id}
                          type="button"
                          onClick={() => setDeviceTarget(vp.id)}
                          className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#071638] border-[#00D9FF] text-white shadow-md"
                              : "bg-[#030B24] border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          <Icon className="w-5 h-5 text-[#00D9FF]" />
                          <span className="text-xs font-bold">{vp.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 6 Actions */}
              <div className="flex justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Scope</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(7)}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black font-extrabold text-sm shadow-xl hover:brightness-110 flex items-center gap-2 cursor-pointer"
                >
                  <span>Review AI Blueprint</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* STEP 7: AI BLUEPRINT & PROMPT ENGINE */}
          {/* ================================================================ */}
          {currentStep === 7 && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-3">
                <Badge variant="electric" dot>Step 7 of 8 • AI Blueprint &amp; Prompt Compilation</Badge>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Compiled Stitch Directive.
                </h1>
                <p className="text-sm sm:text-base text-[#C8D5EF] max-w-2xl mx-auto">
                  Review the compiled blueprint and system instructions before triggering real Google Stitch MCP generation.
                </p>
              </div>

              {/* Blueprint Summary */}
              <div className="p-8 rounded-3xl bg-[#0A1940] border border-white/10 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-[#00D9FF] font-bold">
                      ENGINE CONFIGURATION
                    </span>
                    <h3 className="text-xl font-bold text-white">Google Stitch MCP Protocol</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#030B24] border border-white/10 text-slate-300">
                      Model: Gemini 3.8 Flash
                    </span>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#030B24] border border-white/10 text-slate-300">
                      Viewport: {deviceTarget}
                    </span>
                  </div>
                </div>

                {/* Compiled Prompt Terminal Viewer */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#00D9FF]" />
                      Compiled Generation Prompt (v{promptBlueprint.version})
                    </span>
                    <span>{promptBlueprint.prompt.length} chars</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#030B24] border border-white/10 font-mono text-xs text-slate-300 leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap select-all">
                    {promptBlueprint.prompt}
                  </div>
                </div>

                {/* Pre-Flight Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00C98B]" />
                    <span>Real MCP Tool: generate_screen_from_text</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00C98B]" />
                    <span>Dual PostgreSQL &amp; In-Memory Fallback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00C98B]" />
                    <span>Material You Design Tokens Injected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00C98B]" />
                    <span>Natural Language Revision Engine Ready</span>
                  </div>
                </div>
              </div>

              {/* Step 7 Actions */}
              <div className="flex justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(6)}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Styling</span>
                </button>

                <button
                  type="button"
                  onClick={handleLaunchStitchGeneration}
                  disabled={isGenerating}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#E52BFF] text-white font-black text-sm shadow-2xl hover:brightness-110 flex items-center gap-3 cursor-pointer"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Generate Personalized Demo with Stitch &rarr;</span>
                </button>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* STEP 8: GOOGLE STITCH GENERATION & HERO PRESENTATION WORKSPACE */}
          {/* ================================================================ */}
          {currentStep === 8 && (
            <div className="space-y-8">
              {/* Generation Progress Bar (When generating) */}
              {isGenerating && (
                <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#0A1940] border border-[#00D9FF]/40 text-center space-y-4 shadow-2xl">
                  <div className="flex items-center justify-center gap-3">
                    <Sparkles className="w-6 h-6 text-[#00D9FF] animate-spin" />
                    <h2 className="text-xl font-bold text-white">Synthesizing with Google Stitch MCP...</h2>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[#030B24] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00D9FF] to-[#087BFF] rounded-full transition-all duration-300"
                      style={{ width: `${generationProgress}%` }}
                    />
                  </div>
                  <p className="text-xs font-mono text-[#00D9FF]">{generationStageText}</p>
                </div>
              )}

              {/* Hero Workspace Canvas */}
              {activeArtifact && (
                <div className="space-y-6">
                  {/* Workspace Command Bar */}
                  <div className="p-4 rounded-2xl bg-[#0A1940] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-[#00C98B] animate-pulse" />
                      <div>
                        <h2 className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{activeArtifact.title || brandName || projectName}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#030B24] text-[#00D9FF] border border-white/10">
                            v{activeArtifact.versionNumber || 1}
                          </span>
                        </h2>
                        <span className="text-[10px] font-mono text-slate-400">
                          Provider: {activeArtifact.provider} • Screen ID: {activeArtifact.providerScreenId || "Active"}
                        </span>
                      </div>
                    </div>

                    {/* Viewport Switcher Controls */}
                    <div className="flex items-center gap-1.5 bg-[#030B24] p-1 rounded-xl border border-white/10">
                      {[
                        { id: "DESKTOP" as StitchDeviceType, icon: Laptop, label: "1440px" },
                        { id: "TABLET" as StitchDeviceType, icon: Tablet, label: "768px" },
                        { id: "MOBILE" as StitchDeviceType, icon: Smartphone, label: "390px" },
                      ].map((vp) => {
                        const Icon = vp.icon;
                        const isCurrent = activeViewport === vp.id;
                        return (
                          <button
                            key={vp.id}
                            type="button"
                            onClick={() => setActiveViewport(vp.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              isCurrent
                                ? "bg-[#087BFF] text-white shadow-md"
                                : "text-slate-400 hover:text-white"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{vp.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Quick CTAs */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            navigator.clipboard.writeText(window.location.href);
                            setShareToast("Link copied to clipboard!");
                            setTimeout(() => setShareToast(null), 3000);
                          }
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Share</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setQuoteModalOpen(true)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black font-extrabold text-xs shadow-lg hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Build with StarX</span>
                      </button>
                    </div>
                  </div>

                  {/* Sandboxed Viewport Chassis */}
                  <div className="relative mx-auto flex justify-center py-4">
                    <div
                      className={`border border-white/15 rounded-3xl bg-[#030B24] shadow-2xl overflow-hidden transition-all duration-300 ${
                        activeViewport === "MOBILE"
                          ? "w-[390px] min-h-[700px]"
                          : activeViewport === "TABLET"
                          ? "w-[768px] min-h-[750px]"
                          : "w-full max-w-6xl min-h-[750px]"
                      }`}
                    >
                      {/* Browser Window Chrome Top Bar */}
                      <div className="bg-[#071638] border-b border-white/10 px-4 py-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full bg-red-500/80" />
                          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                          <span className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 bg-[#030B24] px-4 py-0.5 rounded-full border border-white/5">
                          https://demo.starxalphalabs.online/{currentIndustryObj.slug}/{brandName || "preview"}
                        </div>
                        <div className="text-[10px] font-mono text-[#00D9FF]">
                          {activeViewport}
                        </div>
                      </div>

                      {/* Rendered Design Artifact */}
                      {activeArtifact.htmlCode ? (
                        <iframe
                          srcDoc={activeArtifact.htmlCode}
                          title={activeArtifact.title || "Stitch Demo Canvas"}
                          className="w-full min-h-[750px] border-0 bg-transparent"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      ) : activeArtifact.thumbnailUrl ? (
                        <div className="p-4 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={activeArtifact.thumbnailUrl}
                            alt={activeArtifact.title || "Design Screenshot"}
                            className="max-w-full rounded-2xl shadow-xl"
                          />
                        </div>
                      ) : (
                        <div className="p-16 text-center space-y-4">
                          <Sparkles className="w-10 h-10 text-[#00D9FF] mx-auto animate-pulse" />
                          <h3 className="text-lg font-bold text-white">Stitch Architectural Screen Ready</h3>
                          <p className="text-xs text-slate-400 max-w-md mx-auto">
                            Artifact registered in PostgreSQL storage. Use natural language refinement below to iterate on layout.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Natural Language Refinement Input Bar (Calls edit_screens) */}
                  <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-[#0A1940] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00D9FF] flex items-center gap-1.5">
                        <Wand2 className="w-3.5 h-3.5" />
                        Collaborative Refinement with Google Stitch
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Natural Language Edits Powered by Stitch edit_screens
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={refinementPrompt}
                        onChange={(e) => setRefinementPrompt(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleRefineDesign();
                          }
                        }}
                        placeholder="e.g. 'Add a dark glassmorphic metric card for total revenue', 'Change primary button color to cyan', 'Make the hero title larger'..."
                        className="grow px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-xs text-white placeholder-slate-500 focus:border-[#00D9FF] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRefineDesign()}
                        disabled={isRefining || !refinementPrompt.trim()}
                        className="px-6 py-3 rounded-xl bg-[#00D9FF] text-black font-extrabold text-xs hover:brightness-110 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isRefining ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                        <span>Apply Update</span>
                      </button>
                    </div>

                    {/* Quick Suggestion Pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[
                        "Add a high-contrast KPI metric bar",
                        "Insert an automated WhatsApp direct chat button",
                        "Show customer rating stars and social proof badges",
                        "Switch to high-density tabular data view",
                      ].map((sug) => (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => handleRefineDesign(sug)}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 cursor-pointer"
                        >
                          + {sug}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Quotation Submission Success Banner */}
              {quoteSubmittedCode && (
                <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#071638] border border-[#00C98B] text-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-[#00C98B] mx-auto" />
                  <h3 className="text-2xl font-black text-white">Quotation Request Dispatched!</h3>
                  <p className="text-xs text-slate-300">
                    Your design reference and itemized scope have been submitted to StarX Alpha Labs engineering.
                    Reference Code: <strong className="text-[#00D9FF] font-mono">{quoteSubmittedCode}</strong>
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/customer`}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black font-bold text-xs inline-block"
                    >
                      View in Customer Portal &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </Container>
      </main>

      {/* Build with StarX Commercial Conversion Modal */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-[#0A1940] border border-[#00D9FF]/40 p-8 space-y-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white text-lg cursor-pointer"
            >
              &times;
            </button>

            <div className="space-y-1">
              <Badge variant="electric">Commercial Conversion</Badge>
              <h3 className="text-2xl font-black text-white">Build with StarX Alpha Labs</h3>
              <p className="text-xs text-[#C8D5EF]">
                Lock in your scope, approved Stitch design reference, and itemized milestone quotation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#030B24] border border-white/5 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Selected Plan:</span>
                <span className="text-white font-bold">{currentPlan.name} ({currentPlan.code})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Investment:</span>
                <span className="text-[#00D9FF] font-bold">{formatINR(pricingTotals.totalINR)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Delivery Timeline:</span>
                <span className="text-white">{currentPlan.timelineWeeks}</span>
              </div>
            </div>

            <form onSubmit={handleSubmitQuotation} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Alex Sharma"
                    className="w-full px-3 py-2 rounded-xl bg-[#030B24] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3 py-2 rounded-xl bg-[#030B24] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl bg-[#030B24] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">Company / Organization</label>
                  <input
                    type="text"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="e.g. Acme Enterprises"
                    className="w-full px-3 py-2 rounded-xl bg-[#030B24] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400">Additional Project Notes</label>
                <textarea
                  rows={3}
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="Any specific architectural preferences, deadlines, or third-party systems..."
                  className="w-full px-3 py-2 rounded-xl bg-[#030B24] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingQuote}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black font-extrabold text-xs shadow-xl hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingQuote ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Submit Handoff for Guaranteed Quotation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
