"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { DIVISIONS_DATA, getDivisionBySlug } from "@/data/divisions";
import { INDUSTRIES_DATA, getIndustryBySlug } from "@/data/industries";
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
} from "lucide-react";

const GUEST_SESSION_STORAGE_KEY = "starx_design_studio_guest_session";

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
  const queryProjectId = searchParams.get("project");
  const querySessionId = searchParams.get("session");

  // 4 Fluid Stages:
  // 1: Describe Your Idea (Conversational Requirement Discovery)
  // 2: AI Requirement Analysis & Brief Review
  // 3: Live Stitch Telemetry Synthesis
  // 4: Hero Personalized Demo Presentation Workspace
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [sessionId, setSessionId] = useState<string>("");
  const [isRestoringSession, setIsRestoringSession] = useState<boolean>(true);

  // Stage 1 Inputs
  const [selectedIndustry, setSelectedIndustry] = useState<string>(initialIndustry);
  const [selectedDivision, setSelectedDivision] = useState<string>(initialDivision);
  const [projectName, setProjectName] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("SaaS Web Application");
  const [rawDescription, setRawDescription] = useState<string>("");
  const [intendedUsers, setIntendedUsers] = useState<string>(
    "Customers, Account Managers, Support Staff"
  );
  const [platformTargets, setPlatformTargets] = useState<string[]>([
    "Web Responsive (Desktop & Mobile)",
  ]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "Role-Based Access Control",
    "Real-Time Data Dashboard",
    "Customer Account Portal",
    "Payment Gateway Integration",
  ]);
  const [customFeatureInput, setCustomFeatureInput] = useState<string>("");
  const [themePreference, setThemePreference] = useState<
    "cosmic-dark" | "executive-light" | "high-contrast-neon"
  >("cosmic-dark");
  const [deviceTarget, setDeviceTarget] = useState<StitchDeviceType>("DESKTOP");
  const [modelPreference, setModelPreference] =
    useState<StitchModelId>("GEMINI_3_8_FLASH");
  const [specialInstructions, setSpecialInstructions] = useState<string>("");

  // Stage 2 Synthesized Brief Review
  const [editableBriefNotes, setEditableBriefNotes] = useState<string>("");
  const [isEditingBrief, setIsEditingBrief] = useState<boolean>(false);

  // Backend Entities
  const [activeProject, setActiveProject] = useState<DesignStudioProject | null>(null);
  const [activeJob, setActiveJob] = useState<DesignGenerationJob | null>(null);
  const [activeArtifact, setActiveArtifact] = useState<DesignArtifact | null>(null);
  const [allArtifacts, setAllArtifacts] = useState<DesignArtifact[]>([]);
  const [revisionsList, setRevisionsList] = useState<DesignRevision[]>([]);

  // Generation Telemetry (Stage 3)
  const [generationProgress, setGenerationProgress] = useState<number>(15);
  const [generationStageText, setGenerationStageText] = useState<string>(
    "Compiling Structured Architecture Ontology..."
  );

  // Stage 4 Workspace State
  const [activeViewport, setActiveViewport] = useState<StitchDeviceType>("DESKTOP");
  const [previewMode, setPreviewMode] = useState<"render" | "sandbox">("render");
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);
  const [briefDrawerOpen, setBriefDrawerOpen] = useState<boolean>(false);
  const [activeVersionDropdown, setActiveVersionDropdown] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Refinement Bar (In-Canvas NL Editing)
  const [refinementPrompt, setRefinementPrompt] = useState<string>("");
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [refinementToast, setRefinementToast] = useState<string | null>(null);

  // Conversion / Build With StarX Modal
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientCompany, setClientCompany] = useState<string>("");
  const [clientTimeline, setClientTimeline] = useState<string>("3–5 Weeks");
  const [clientBudget, setClientBudget] = useState<string>("₹75,000 - ₹2,50,000");
  const [clientNotes, setClientNotes] = useState<string>("");
  const [isSubmittingQuote, setIsSubmittingQuote] = useState<boolean>(false);
  const [quoteSuccessId, setQuoteSuccessId] = useState<string | null>(null);

  // Derived Objects
  const currentIndustryObj = useMemo(() => {
    return getIndustryBySlug(selectedIndustry) || INDUSTRIES_DATA[0];
  }, [selectedIndustry]);

  const currentDivisionObj = useMemo(() => {
    return getDivisionBySlug(selectedDivision) || DIVISIONS_DATA[0];
  }, [selectedDivision]);

  const parsedDesignMd = useMemo(() => {
    return parseStitchDesignMd(activeArtifact?.designMd);
  }, [activeArtifact?.designMd]);

  const stitchCssVars = useMemo(() => {
    return getStitchCssVariables(activeArtifact?.designTheme);
  }, [activeArtifact?.designTheme]);

  // Session Initialization & Restoration
  useEffect(() => {
    const sess = querySessionId || getOrCreateGuestSessionId();
    setSessionId(sess);

    const restoreSession = async () => {
      try {
        let endpoint = "";
        if (queryProjectId) {
          endpoint = `/api/design-studio/projects?id=${encodeURIComponent(queryProjectId)}`;
        } else if (sess) {
          endpoint = `/api/design-studio/projects?sessionId=${encodeURIComponent(sess)}`;
        }

        if (endpoint) {
          const res = await fetch(endpoint);
          if (res.ok) {
            const data = await res.json();
            if (data.ok && data.project) {
              setActiveProject(data.project);
              if (data.activeArtifact) {
                setActiveArtifact(data.activeArtifact);
                setActiveViewport(data.activeArtifact.deviceType || "DESKTOP");
                if (data.activeArtifact.htmlCode) {
                  setPreviewMode("render");
                }
              }
              if (Array.isArray(data.artifacts) && data.artifacts.length > 0) {
                setAllArtifacts(data.artifacts);
              } else if (data.activeArtifact) {
                setAllArtifacts([data.activeArtifact]);
              }
              if (Array.isArray(data.revisions)) {
                setRevisionsList(data.revisions);
              }

              // If artifact is ready, jump to hero demo workspace
              if (data.activeArtifact) {
                setCurrentStep(4);
              }
            }
          }
        }
      } catch (err) {
        console.warn("[DesignStudio] Session restoration skipped:", err);
      } finally {
        setIsRestoringSession(false);
      }
    };

    restoreSession();
  }, [queryProjectId, querySessionId]);

  // Sync URL query when active project changes
  useEffect(() => {
    if (typeof window !== "undefined" && activeProject?.id && sessionId) {
      const url = new URL(window.location.href);
      url.searchParams.set("session", sessionId);
      url.searchParams.set("project", activeProject.id);
      window.history.replaceState({}, "", url.toString());
    }
  }, [activeProject?.id, sessionId]);

  // Feature Toggle Helpers
  const toggleFeature = (feat: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const handleAddCustomFeature = () => {
    const trimmed = customFeatureInput.trim();
    if (trimmed && !selectedFeatures.includes(trimmed)) {
      setSelectedFeatures((prev) => [...prev, trimmed]);
      setCustomFeatureInput("");
    }
  };

  const togglePlatform = (plat: string) => {
    setPlatformTargets((prev) =>
      prev.includes(plat) ? prev.filter((p) => p !== plat) : [...prev, plat]
    );
  };

  // Stage 1 -> 2: Synthesize AI Design Brief
  const handleProceedToBrief = () => {
    const finalTitle =
      projectName.trim() ||
      `${currentIndustryObj.name} ${productCategory.replace("Web Application", "").trim()} Platform`;
    setProjectName(finalTitle);

    const generatedBriefPrompt = [
      `TARGET ARCHITECTURE: ${finalTitle} (${productCategory})`,
      `INDUSTRY DOMAIN: ${currentIndustryObj.name} | DIVISION: ${currentDivisionObj.name}`,
      `INTENDED USER PERSONAS: ${intendedUsers || "General Users, System Administrators"}`,
      `CORE PURPOSE: ${rawDescription.trim() || `Modern digital system for ${currentIndustryObj.name} with real-time operations, transparent workflows, and optimized client journeys.`}`,
      `KEY FUNCTIONAL MODULES: ${selectedFeatures.join(", ")}`,
      `PLATFORMS & VIEWPORTS: ${platformTargets.join(", ")} (Primary Target: ${deviceTarget})`,
      `AESTHETIC THEME: ${themePreference === "cosmic-dark" ? "Cosmic Liquid Glass (Deep Navy & Neon Accents)" : themePreference === "executive-light" ? "Executive Modern (Clean Slate Monochrome)" : "Cyber Brutalist (Laser Cyan & High Contrast)"}`,
    ].join("\n\n");

    setEditableBriefNotes(generatedBriefPrompt);
    setCurrentStep(2);
  };

  // Stage 2 -> 3: Create Project & Trigger Real Stitch Generation
  const handleTriggerStitchGeneration = async () => {
    setCurrentStep(3);
    setGenerationProgress(20);
    setGenerationStageText("Compiling Structured Architecture Ontology...");

    try {
      // 1. Create Project in Backend with Session ID
      const projRes = await fetch("/api/design-studio/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brief: {
            industrySlug: selectedIndustry,
            industryName: currentIndustryObj.name,
            divisionSlug: selectedDivision,
            divisionName: currentDivisionObj.name,
            projectName: projectName.trim(),
            description:
              rawDescription.trim() ||
              `Personalized demo platform for ${currentIndustryObj.name} designed with Google Stitch.`,
            platformTargets,
            selectedFeatures,
            themePreference,
            deviceTarget,
            modelPreference,
            specialInstructions: editableBriefNotes || specialInstructions.trim() || undefined,
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
      setGenerationStageText("Invoking Google Stitch MCP Protocol & Gemini 3.8 Flash...");

      // 2. Submit Real Generation Job
      const jobRes = await fetch("/api/design-studio/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: createdProject.id,
          modelId: modelPreference,
          deviceType: deviceTarget,
          customPrompt: `Create an authentic, high-impact ${deviceTarget.toLowerCase()} design for ${createdProject.title}. Requirements: ${editableBriefNotes}`,
        }),
      });

      setGenerationProgress(75);
      setGenerationStageText("Synthesizing Material You tokens & high-resolution responsive canvas...");

      const jobData = await jobRes.json();
      if (jobData.ok && jobData.artifact) {
        setActiveJob(jobData.job);
        setActiveArtifact(jobData.artifact);
        setAllArtifacts([jobData.artifact]);
        setActiveViewport(jobData.artifact.deviceType || deviceTarget);

        setGenerationProgress(100);
        setGenerationStageText("Personalized Demo Ready! Entering Presentation Workspace...");
        setTimeout(() => setCurrentStep(4), 700);
      } else if (jobData.job?.status === "queued") {
        setActiveJob(jobData.job);
        setGenerationProgress(100);
        setGenerationStageText("Project queued in PostgreSQL for persistent processing.");
        setTimeout(() => setCurrentStep(4), 700);
      } else {
        throw new Error(jobData.error || "Generation job failed to produce artifact");
      }
    } catch (err: any) {
      console.error("[DesignStudio] Generation error:", err);
      setCurrentStep(4);
    }
  };

  // Instant Architecture Preview (Fallback when queued)
  const handleGeneratePreview = async () => {
    if (!activeProject) return;
    setCurrentStep(3);
    setGenerationProgress(50);
    setGenerationStageText("Synthesizing responsive architectural wireframe...");
    try {
      const res = await fetch("/api/design-studio/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: activeProject.id,
          modelId: modelPreference,
          deviceType: deviceTarget,
          previewOnly: true,
        }),
      });
      const data = await res.json();
      if (data.ok && data.artifact) {
        setActiveArtifact(data.artifact);
        setActiveJob(data.job);
        setAllArtifacts([data.artifact]);
        setGenerationProgress(100);
        setGenerationStageText("Architectural preview ready!");
        setTimeout(() => setCurrentStep(4), 500);
      }
    } catch {
      setCurrentStep(4);
    }
  };

  // Stage 4: In-Canvas Natural Language Refinement with Stitch AI
  const handleRefineDesign = async (customText?: string) => {
    const textToSubmit = (customText || refinementPrompt).trim();
    if (!textToSubmit || !activeProject || !activeArtifact) return;

    setIsRefining(true);
    setRefinementToast("Stitch AI is synthesizing your requested revisions...");

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

  // Version Switcher
  const handleSwitchVersion = (versionArt: DesignArtifact) => {
    setActiveArtifact(versionArt);
    setActiveViewport(versionArt.deviceType || "DESKTOP");
    setActiveVersionDropdown(false);
  };

  // Share Demo Link
  const handleShareDemo = () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setShareToast("Personalized Demo Link Copied to Clipboard!");
      setTimeout(() => setShareToast(null), 3000);
    });
  };

  // Submit Quotation & Engineering Handoff
  const handleSubmitQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail.trim() || !clientName.trim() || !activeProject) return;

    setIsSubmittingQuote(true);
    try {
      const handoffDetails = [
        `STARX DESIGN STUDIO — PERSONALIZED DEMO QUOTATION HANDOFF`,
        `Project ID: ${activeProject.projectCode} (${activeProject.id})`,
        `Title: ${activeProject.title}`,
        `Stitch Provider Project: ${activeArtifact?.providerProjectId || "Google Stitch MCP"}`,
        `Approved Version: v${activeArtifact?.versionNumber || 1} (${activeArtifact?.title || "Primary Screen"})`,
        `Industry: ${currentIndustryObj.name} (${selectedIndustry})`,
        `Division: ${currentDivisionObj.name} (${selectedDivision})`,
        `Product Category: ${productCategory}`,
        `Target Platforms: ${platformTargets.join(", ")}`,
        `Primary Viewport: ${activeViewport}`,
        `Theme Aesthetic: ${themePreference}`,
        `Intended Users: ${intendedUsers}`,
        `Core Features: ${selectedFeatures.join(", ")}`,
        `Customer Notes: ${clientNotes || "None"}`,
        `Revisions Logged: ${revisionsList.map((r) => r.notes).join("; ") || "None"}`,
        `Stitch Design Artifact URL: ${activeArtifact?.thumbnailUrl || "Available in PostgreSQL"}`,
        `Client Vision: ${rawDescription || "Enterprise system implementation."}`,
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
          budgetRange: clientBudget,
          timeline: clientTimeline,
          projectDetails: handoffDetails,
          sourcePage: "/design-studio",
        }),
      });

      const quoteData = await res.json();
      const quoteId =
        quoteData?.quoteId || `STX-QUO-${Date.now().toString().slice(-6)}`;
      setQuoteSuccessId(quoteId);
    } catch {
      setQuoteSuccessId(`STX-QUO-${Date.now().toString().slice(-6)}`);
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  // Viewport Sizing Map for Chassis
  const viewportStyles = useMemo(() => {
    switch (activeViewport) {
      case "MOBILE":
        return {
          wrapper: "max-w-[400px] w-full",
          aspect: "min-h-[720px]",
          label: "Mobile (390px)",
          icon: Smartphone,
        };
      case "TABLET":
        return {
          wrapper: "max-w-[768px] w-full",
          aspect: "min-h-[580px]",
          label: "Tablet (768px)",
          icon: Tablet,
        };
      case "DESKTOP":
      default:
        return {
          wrapper: "max-w-6xl w-full",
          aspect: "min-h-[560px]",
          label: "Desktop (1440px)",
          icon: Laptop,
        };
    }
  }, [activeViewport]);

  return (
    <div
      className="min-h-screen bg-[#030B24] text-white selection:bg-[#00D9FF] selection:text-[#030B24] py-8 sm:py-12"
      style={stitchCssVars as React.CSSProperties}
    >
      <Container className="space-y-8">
        {/* Top Studio Brand Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#0A1940]">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-[#E52BFF]/15 text-[#E52BFF] border border-[#E52BFF]/30 flex items-center gap-1.5 shadow-[0_0_12px_rgba(229,43,255,0.2)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>StarX Design Studio • Personalized AI Demo Generator</span>
              </span>
              <span className="px-2.5 py-1 text-xs font-mono rounded-full bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Google Stitch MCP Connected</span>
              </span>
              {activeProject && (
                <span className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Session Active: {activeProject.projectCode}</span>
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Describe Your Idea. See It Designed in Seconds.
            </h1>
            <p className="text-xs sm:text-sm text-[#C8D5EF] max-w-2xl leading-relaxed">
              Tell our AI what you want to build. Google Stitch synthesizes authentic
              architecture, responsive layouts, and interactive design prototypes tailored
              specifically to your individual requirements.
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap items-center gap-2.5">
            {activeArtifact && currentStep === 4 && (
              <button
                type="button"
                onClick={handleShareDemo}
                className="px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white bg-[#071638] border border-white/10 rounded-xl hover:border-[#00D9FF]/40 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span>Share Demo</span>
              </button>
            )}
            <Link
              href="/get-quote"
              className="px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white bg-[#071638] border border-white/10 rounded-xl hover:border-white/20 transition-all"
            >
              Custom RFQ &rarr;
            </Link>
            <Link
              href="/project-calculator"
              className="px-3.5 py-2 text-xs font-bold text-[#00D9FF] bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-xl hover:bg-[#00D9FF]/20 transition-all"
            >
              Budget Calculator &rarr;
            </Link>
          </div>
        </div>

        {/* Share Link Toast */}
        {shareToast && (
          <div className="fixed top-6 right-6 z-50 bg-[#071638] text-[#00D9FF] border border-[#00D9FF]/40 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-mono font-bold animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{shareToast}</span>
          </div>
        )}

        {/* 4-Step Visual Progress Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { num: 1, label: "01. Describe Your Idea" },
            { num: 2, label: "02. AI Architecture Brief" },
            { num: 3, label: "03. Stitch Synthesis" },
            { num: 4, label: "04. Hero Demo Workspace" },
          ].map((step) => {
            const isPassed = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            return (
              <div
                key={step.num}
                onClick={() => {
                  if (step.num < currentStep || (step.num === 4 && activeArtifact)) {
                    setCurrentStep(step.num);
                  }
                }}
                className={`p-3 rounded-2xl border transition-all flex items-center gap-2.5 ${
                  isCurrent
                    ? "bg-[#071638] border-[#00D9FF] text-white shadow-[0_0_15px_rgba(0,217,255,0.2)]"
                    : isPassed
                    ? "bg-[#030B24] border-emerald-500/40 text-emerald-400 cursor-pointer hover:border-emerald-500"
                    : "bg-[#030B24] border-[#0A1940] text-slate-500"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
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

        {/* ========================================================================= */}
        {/* STAGE 1: DESCRIBE YOUR IDEA (Conversational Discovery)                    */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="p-6 sm:p-10 rounded-3xl bg-[#071638]/90 border border-[#0A1940] space-y-8 shadow-2xl backdrop-blur-xl">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00D9FF]">
                Stage 01 • Describe Your Vision
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                What software do you want to build?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Provide your requirements below. Our AI converts your input into a formal
                system architecture, and Google Stitch generates an authentic, personalized
                design.
              </p>
            </div>

            {/* Product Category Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Product Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {[
                  "SaaS Web Application",
                  "Customer Portal",
                  "Business ERP / POS",
                  "Branded Mobile App",
                  "E-Commerce Storefront",
                  "Analytics Dashboard",
                  "Custom AI System",
                ].map((cat) => {
                  const selected = productCategory === cat;
                  return (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setProductCategory(cat)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        selected
                          ? "bg-[#00D9FF]/20 border-[#00D9FF] text-white shadow-[0_0_10px_rgba(0,217,255,0.25)]"
                          : "bg-[#030B24] border-[#0A1940] text-slate-400 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Industry & Division Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Target Industry Domain
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-[#0A1940] text-sm text-white focus:outline-none focus:border-[#00D9FF] transition-all"
                >
                  {INDUSTRIES_DATA.map((ind) => (
                    <option key={ind.slug} value={ind.slug}>
                      {ind.emoji} {ind.name}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400">{currentIndustryObj.tagline}</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Primary StarX Division
                </label>
                <select
                  value={selectedDivision}
                  onChange={(e) => setSelectedDivision(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-[#0A1940] text-sm text-white focus:outline-none focus:border-[#00D9FF] transition-all"
                >
                  {DIVISIONS_DATA.map((div) => (
                    <option key={div.slug} value={div.slug}>
                      {div.name} ({div.badge})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400">{currentDivisionObj.tagline}</p>
              </div>
            </div>

            {/* Project Working Title & Purpose Textarea */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Project Title or Brand Name
                </label>
                <input
                  type="text"
                  placeholder={`e.g. Apex ${currentIndustryObj.name} Platform`}
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-[#0A1940] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Describe Your Software Concept &amp; Core Workflow
                </label>
                <textarea
                  rows={3}
                  placeholder="What does your software need to accomplish? Who will use it? What manual process or friction does it eliminate?"
                  value={rawDescription}
                  onChange={(e) => setRawDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-[#0A1940] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF] transition-all"
                />
              </div>
            </div>

            {/* User Personas & Target Platforms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Intended Users &amp; Key Roles
                </label>
                <input
                  type="text"
                  placeholder="e.g. Store Customers, Field Technicians, Warehouse Admins, C-Suite"
                  value={intendedUsers}
                  onChange={(e) => setIntendedUsers(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#030B24] border border-[#0A1940] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Target Device Viewport
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "DESKTOP", label: "Desktop (1440px)", icon: Laptop },
                    { id: "TABLET", label: "Tablet (768px)", icon: Tablet },
                    { id: "MOBILE", label: "Mobile (390px)", icon: Smartphone },
                  ].map((dev) => {
                    const Icon = dev.icon;
                    const active = deviceTarget === dev.id;
                    return (
                      <button
                        type="button"
                        key={dev.id}
                        onClick={() => setDeviceTarget(dev.id as StitchDeviceType)}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                          active
                            ? "bg-[#087BFF]/20 border-[#00D9FF] text-white"
                            : "bg-[#030B24] border-[#0A1940] text-slate-400 hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#00D9FF]" />
                        <span>{dev.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Essential Features Checklist + Custom Tags */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Core Features &amp; Functional Modules ({selectedFeatures.length})
                </label>
                <span className="text-[11px] text-slate-400">Click to toggle or add custom below</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  ...currentIndustryObj.featuredCapabilities,
                  "Role-Based Access Control",
                  "Real-Time Data Dashboard",
                  "Automated WhatsApp Notifications",
                  "Payment Gateway Integration",
                  "Multi-Tenant Isolation",
                  "Interactive Reporting Analytics",
                  "Audit Logging & Security",
                ].map((feat) => {
                  const checked = selectedFeatures.includes(feat);
                  return (
                    <button
                      type="button"
                      key={feat}
                      onClick={() => toggleFeature(feat)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between cursor-pointer ${
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

              {/* Add Custom Feature Tag */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="+ Add custom module (e.g. Biometric Attendance, Inventory Barcode Scanner)..."
                  value={customFeatureInput}
                  onChange={(e) => setCustomFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomFeature();
                    }
                  }}
                  className="grow px-4 py-2.5 rounded-xl bg-[#030B24] border border-[#0A1940] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF]"
                />
                <button
                  type="button"
                  onClick={handleAddCustomFeature}
                  className="px-4 py-2.5 rounded-xl bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/40 text-xs font-bold hover:bg-[#00D9FF]/30 transition-all cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Feature</span>
                </button>
              </div>
            </div>

            {/* Visual Style & Theme Preset */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Visual Personality &amp; Color Scheme
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: "cosmic-dark",
                    name: "Cosmic Liquid Glass",
                    desc: "Deep Space Navy, Cyan & Violet specular glows, glassmorphism",
                    swatch: ["#030B24", "#00D9FF", "#E52BFF"],
                  },
                  {
                    id: "executive-light",
                    name: "Executive Modern",
                    desc: "Clean Slate Monochrome, crisp platinum borders, subtle contrast",
                    swatch: ["#F8FAFC", "#0F172A", "#087BFF"],
                  },
                  {
                    id: "high-contrast-neon",
                    name: "Cyber Brutalist",
                    desc: "Laser Cyan, Electric Amber, High-density HUD grids",
                    swatch: ["#000000", "#00D9FF", "#F59E0B"],
                  },
                ].map((th) => {
                  const active = themePreference === th.id;
                  return (
                    <button
                      type="button"
                      key={th.id}
                      onClick={() => setThemePreference(th.id as any)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                        active
                          ? "bg-[#087BFF]/20 border-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.2)] text-white"
                          : "bg-[#030B24] border-[#0A1940] text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{th.name}</span>
                        <div className="flex items-center gap-1">
                          {th.swatch.map((col, idx) => (
                            <span
                              key={idx}
                              className="w-3 h-3 rounded-full border border-white/20"
                              style={{ backgroundColor: col }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400">{th.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Advance to Brief Review */}
            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero login wall • Instant personalized demo generation</span>
              </span>

              <button
                type="button"
                onClick={handleProceedToBrief}
                className="px-8 py-3 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#087BFF] hover:brightness-110 text-white shadow-xl flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Analyze &amp; Formulate Design Brief</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 2: AI REQUIREMENT ANALYSIS & BRIEF REVIEW                           */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="p-6 sm:p-10 rounded-3xl bg-[#071638]/90 border border-[#0A1940] space-y-8 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#00D9FF]">
                  Stage 02 • AI Requirement Analysis
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Synthesized Architecture Brief
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Our system has analyzed your inputs and structured a technical brief for
                  Google Stitch. You can review and adjust this brief before launching generation.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Edit Inputs
              </button>
            </div>

            {/* Executive Synthesis Summary Card */}
            <div className="p-6 rounded-2xl bg-[#030B24] border border-[#0A1940] space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/5">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Software Target
                  </span>
                  <h3 className="text-xl font-bold text-white">{projectName}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {productCategory} • {currentIndustryObj.name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="electric" size="sm">
                    {currentIndustryObj.name}
                  </Badge>
                  <Badge variant="corporate" size="sm">
                    {currentDivisionObj.name}
                  </Badge>
                  <span className="px-2.5 py-1 text-xs font-mono rounded-full bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20">
                    {deviceTarget} Viewport
                  </span>
                </div>
              </div>

              {/* Synthesized Brief Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="space-y-1.5">
                  <span className="font-mono text-slate-400 uppercase flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-[#00D9FF]" />
                    <span>Stitch AI Model Engine</span>
                  </span>
                  <select
                    value={modelPreference}
                    onChange={(e) => setModelPreference(e.target.value as StitchModelId)}
                    className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                  >
                    {STITCH_CAPABILITIES.supportedModels.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-slate-400 uppercase flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Target Deployment Viewport</span>
                  </span>
                  <div className="flex gap-1.5">
                    {[
                      { id: "DESKTOP", label: "Desktop", icon: Laptop },
                      { id: "TABLET", label: "Tablet", icon: Tablet },
                      { id: "MOBILE", label: "Mobile", icon: Smartphone },
                    ].map((dev) => {
                      const Icon = dev.icon;
                      const active = deviceTarget === dev.id;
                      return (
                        <button
                          type="button"
                          key={dev.id}
                          onClick={() => setDeviceTarget(dev.id as StitchDeviceType)}
                          className={`grow px-2 py-2 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                            active
                              ? "bg-[#087BFF]/20 border-[#00D9FF] text-white"
                              : "bg-[#071638] border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          <Icon className="w-3 h-3" />
                          <span>{dev.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-slate-400 uppercase">Architecture Tier</span>
                  <p className="font-semibold text-[#00D9FF] text-xs pt-2">
                    Production Full-Stack (Next.js 16 + Supabase + Stitch Tokens)
                  </p>
                </div>
              </div>

              {/* Scoped Functional Modules List */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-xs font-mono text-slate-400 uppercase">
                  Scoped Modules ({selectedFeatures.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedFeatures.map((f) => (
                    <span
                      key={f}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#071638] border border-white/10 text-slate-200"
                    >
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Editable Brief Prompt Textarea */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 uppercase flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-[#00D9FF]" />
                    <span>Compiled Stitch Design Brief</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditingBrief(!isEditingBrief)}
                    className="text-[11px] font-mono text-[#00D9FF] hover:underline cursor-pointer"
                  >
                    {isEditingBrief ? "Collapse Editor" : "Edit Prompt"}
                  </button>
                </div>
                {isEditingBrief ? (
                  <textarea
                    rows={6}
                    value={editableBriefNotes}
                    onChange={(e) => setEditableBriefNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#071638] border border-white/10 font-mono text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF] transition-all"
                  />
                ) : (
                  <div className="p-4 rounded-xl bg-[#071638] border border-white/10 text-xs font-mono text-slate-300 whitespace-pre-line max-h-48 overflow-y-auto leading-relaxed">
                    {editableBriefNotes}
                  </div>
                )}
              </div>
            </div>

            {/* Launch Synthesis CTA */}
            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Google Stitch Engine initialized &amp; ready for real generation</span>
              </span>

              <button
                type="button"
                onClick={handleTriggerStitchGeneration}
                className="px-8 py-3.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#E52BFF] to-[#087BFF] hover:brightness-110 text-white shadow-[0_0_20px_rgba(229,43,255,0.3)] flex items-center gap-2 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Synthesize Live Demo With Google Stitch</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 3: LIVE STITCH SYNTHESIS TELEMETRY                                  */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="p-12 sm:p-16 rounded-3xl bg-[#071638]/90 border border-[#0A1940] flex flex-col items-center justify-center text-center space-y-8 shadow-2xl backdrop-blur-xl">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-[#00D9FF]/20 border-t-[#00D9FF] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#00D9FF] animate-pulse" />
              </div>
            </div>

            <div className="space-y-4 max-w-xl mx-auto">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-widest text-[#00D9FF] bg-[#00D9FF]/10 rounded-full border border-[#00D9FF]/20">
                Google Stitch Live Synthesis
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Designing {projectName}
              </h3>
              <p className="text-xs text-[#00D9FF] font-mono">{generationStageText}</p>

              {/* Progress Bar */}
              <div className="w-full bg-[#030B24] rounded-full h-2.5 overflow-hidden border border-white/10">
                <div
                  className="bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#E52BFF] h-full transition-all duration-500 shadow-[0_0_10px_rgba(0,217,255,0.5)]"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>

              {/* Real Milestones */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-4 text-[11px] font-mono text-left">
                <div className="p-2.5 rounded-xl bg-[#030B24] border border-white/5 text-slate-300 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Brief Compiled</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#030B24] border border-white/5 text-slate-300 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#00D9FF] shrink-0" />
                  <span>Stitch MCP Connected</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#030B24] border border-white/5 text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#E52BFF] shrink-0" />
                  <span>Material You Tokens</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 4: HERO PERSONALIZED DEMO PRESENTATION WORKSPACE                     */}
        {/* ========================================================================= */}
        {currentStep === 4 && activeArtifact && (
          <div className="space-y-6">
            {/* Command & Control Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#071638]/90 border border-[#0A1940] flex flex-wrap items-center justify-between gap-4 shadow-xl backdrop-blur-xl">
              {/* Left: Project title & version pill */}
              <div className="flex items-center gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#00D9FF]">
                      Personalized AI Demo
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">•</span>
                    <span className="text-[10px] font-mono text-slate-300">
                      {currentIndustryObj.name}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                    <span>{activeArtifact.title || projectName}</span>
                  </h2>
                </div>

                {/* Version Selector Pill */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setActiveVersionDropdown(!activeVersionDropdown)}
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30 flex items-center gap-1.5 hover:bg-[#00D9FF]/20 cursor-pointer"
                  >
                    <span>v{activeArtifact.versionNumber || 1}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {/* Version Switcher Dropdown */}
                  {activeVersionDropdown && (
                    <div className="absolute top-full left-0 mt-2 z-50 w-56 p-2 rounded-2xl bg-[#071638] border border-white/10 shadow-2xl space-y-1">
                      <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase">
                        Version History ({allArtifacts.length})
                      </div>
                      {allArtifacts.map((art) => {
                        const isCurrent = art.id === activeArtifact.id;
                        return (
                          <button
                            type="button"
                            key={art.id}
                            onClick={() => handleSwitchVersion(art)}
                            className={`w-full px-3 py-2 rounded-xl text-xs font-mono text-left flex items-center justify-between cursor-pointer transition-all ${
                              isCurrent
                                ? "bg-[#00D9FF]/20 text-[#00D9FF] font-bold"
                                : "text-slate-300 hover:bg-white/5"
                            }`}
                          >
                            <span>Version {art.versionNumber}</span>
                            <span className="text-[10px] text-slate-400">
                              {art.deviceType}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Center: Device Viewport Controls */}
              <div className="flex items-center gap-1 bg-[#030B24] p-1 rounded-xl border border-white/10">
                {[
                  { id: "DESKTOP", label: "Desktop", icon: Laptop },
                  { id: "TABLET", label: "Tablet", icon: Tablet },
                  { id: "MOBILE", label: "Mobile", icon: Smartphone },
                ].map((vp) => {
                  const Icon = vp.icon;
                  const active = activeViewport === vp.id;
                  return (
                    <button
                      type="button"
                      key={vp.id}
                      onClick={() => setActiveViewport(vp.id as StitchDeviceType)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        active
                          ? "bg-[#087BFF] text-white shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{vp.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right: Quick Action Buttons & Conversion CTA */}
              <div className="flex items-center gap-2">
                {/* HTML Sandbox Toggle (if HTML exists) */}
                {activeArtifact.htmlCode && (
                  <div className="flex items-center bg-[#030B24] p-1 rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => setPreviewMode("render")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        previewMode === "render"
                          ? "bg-[#00D9FF]/20 text-[#00D9FF] font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Visual
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode("sandbox")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        previewMode === "sandbox"
                          ? "bg-[#00D9FF]/20 text-[#00D9FF] font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Live Code
                    </button>
                  </div>
                )}

                {/* Lightbox / Zoom */}
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="p-2 rounded-xl bg-[#030B24] border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                  title="Expand to Fullscreen Lightbox"
                >
                  <Maximize2 className="w-4 h-4 text-[#00D9FF]" />
                </button>

                {/* Brief Slide-Over Trigger */}
                <button
                  type="button"
                  onClick={() => setBriefDrawerOpen(true)}
                  className="px-3 py-2 rounded-xl bg-[#030B24] border border-white/10 text-xs font-mono font-bold text-slate-300 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <FileCode className="w-3.5 h-3.5 text-[#E52BFF]" />
                  <span className="hidden md:inline">Tokens &amp; Brief</span>
                </button>

                {/* Download Signed Assets */}
                <a
                  href={`/api/design-studio/artifacts/${activeArtifact.id}/file?type=screenshot&mode=redirect&sessionId=${sessionId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-[#030B24] border border-white/10 text-xs font-mono font-bold text-emerald-400 hover:bg-emerald-500/10 transition-all flex items-center gap-1.5"
                  title="Download High-Res Design Screenshot"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Export</span>
                </a>

                {/* HERO CONVERSION CTA: BUILD THIS WITH STARX */}
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-500 via-[#00D9FF] to-[#087BFF] hover:brightness-110 text-[#030B24] shadow-[0_0_20px_rgba(0,217,255,0.4)] flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Build This With StarX</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* =================================================================== */}
            {/* THE HERO CANVAS: CENTERPIECE OF THE SCREEN                         */}
            {/* =================================================================== */}
            <div className="relative rounded-3xl bg-[#020716] border border-[#0A1940] p-4 sm:p-8 flex flex-col items-center justify-center min-h-[640px] shadow-2xl overflow-hidden">
              {/* Subtle Ambient Radial Glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-25"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 30%, rgba(0, 217, 255, 0.25) 0%, rgba(3, 11, 36, 0) 70%)",
                }}
              />

              {/* In-Canvas Refinement Loading Spinner Overlay */}
              {isRefining && (
                <div className="absolute inset-0 z-40 bg-[#030B24]/80 backdrop-blur-md flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full border-4 border-[#00D9FF]/20 border-t-[#00D9FF] animate-spin" />
                  <div className="space-y-1">
                    <h4 className="text-xl font-black text-white">
                      Synthesizing Requested Revisions...
                    </h4>
                    <p className="text-xs text-[#00D9FF] font-mono">
                      Google Stitch is modifying the canvas with your instructions.
                    </p>
                  </div>
                </div>
              )}

              {/* Viewport Chassis Container */}
              <div
                className={`${viewportStyles.wrapper} relative rounded-2xl overflow-hidden border border-white/15 bg-[#030B24] shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300`}
              >
                {/* Desktop Browser Bar Chassis */}
                {activeViewport === "DESKTOP" && (
                  <div className="px-4 py-2.5 bg-[#071638] border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <div className="hidden sm:flex items-center gap-1.5 ml-3 px-3 py-1 rounded-lg bg-[#030B24] border border-white/5 text-[11px] font-mono text-slate-400">
                        <Lock className="w-2.5 h-2.5 text-emerald-400" />
                        <span>https://starxalphalabs.online/demo/{activeProject?.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span>1440 × 900</span>
                    </div>
                  </div>
                )}

                {/* Mobile / Tablet Status Notch */}
                {activeViewport === "MOBILE" && (
                  <div className="px-6 py-2 bg-[#071638] border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>9:41</span>
                    <div className="w-16 h-4 bg-black rounded-full" />
                    <span>5G • 100%</span>
                  </div>
                )}

                {activeViewport === "TABLET" && (
                  <div className="px-6 py-2 bg-[#071638] border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                      <span>Tablet Viewport</span>
                    </div>
                    <span>768 × 1024</span>
                  </div>
                )}

                {/* Canvas Interior View: Render or Sandbox */}
                {previewMode === "sandbox" && activeArtifact.htmlCode ? (
                  <div className="w-full bg-white h-[650px] overflow-auto">
                    <iframe
                      srcDoc={activeArtifact.htmlCode}
                      title={activeArtifact.title}
                      sandbox="allow-scripts"
                      className="w-full h-full border-0"
                    />
                  </div>
                ) : activeArtifact.thumbnailUrl ? (
                  <div className="relative group bg-[#020716] flex items-center justify-center p-1">
                    <img
                      src={activeArtifact.thumbnailUrl}
                      alt={activeArtifact.title}
                      className="w-full h-auto object-cover rounded-xl cursor-zoom-in"
                      onClick={() => setLightboxOpen(true)}
                    />
                    <div
                      onClick={() => setLightboxOpen(true)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                    >
                      <span className="px-4 py-2 rounded-xl bg-[#071638]/90 border border-white/20 text-xs font-mono font-bold text-white flex items-center gap-2 shadow-2xl">
                        <ZoomIn className="w-4 h-4 text-[#00D9FF]" />
                        <span>Click to Inspect Fullscreen (Zoom &amp; Pan)</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-16 text-center text-slate-400 font-mono text-xs">
                    Authentic screen rendered through Google Stitch protocol.
                  </div>
                )}
              </div>
            </div>

            {/* Refinement Toast Feedback */}
            {refinementToast && (
              <div className="p-3.5 rounded-2xl bg-[#071638] border border-[#00D9FF]/40 text-xs text-[#00D9FF] font-mono font-bold flex items-center justify-between shadow-2xl animate-in fade-in">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E52BFF]" />
                  <span>{refinementToast}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setRefinementToast(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* =================================================================== */}
            {/* FLOATING NATURAL LANGUAGE REFINEMENT BAR                           */}
            {/* =================================================================== */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#071638]/95 border border-[#0A1940] space-y-3.5 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-[#00D9FF]" />
                  <span>Natural Language Design Refinement</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  Powered by Google Stitch <code className="text-[#00D9FF]">edit_screens</code> MCP
                </span>
              </div>

              {/* Quick Prompt Pill Suggestions */}
              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                {[
                  "+ Darker hero with champagne gold accents",
                  "+ Add real-time sales & revenue charts",
                  "+ Add customer quick-booking modal",
                  "+ Include WhatsApp direct support trigger",
                  "+ Make table columns high-density",
                ].map((sugg) => (
                  <button
                    type="button"
                    key={sugg}
                    onClick={() => {
                      setRefinementPrompt(sugg.replace("+ ", ""));
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#030B24] border border-white/10 text-slate-300 hover:border-[#00D9FF]/40 hover:text-[#00D9FF] transition-all cursor-pointer"
                  >
                    {sugg}
                  </button>
                ))}
              </div>

              {/* Refinement Input & Action */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  placeholder="Describe what to change (e.g. Make hero darker, add inventory table, introduce checkout button)..."
                  value={refinementPrompt}
                  onChange={(e) => setRefinementPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isRefining) {
                      e.preventDefault();
                      handleRefineDesign();
                    }
                  }}
                  className="grow px-4 py-3 rounded-xl bg-[#030B24] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF] transition-all"
                />
                <button
                  type="button"
                  disabled={isRefining || !refinementPrompt.trim()}
                  onClick={() => handleRefineDesign()}
                  className="px-6 py-3 rounded-xl text-xs font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-white hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isRefining ? "Refining..." : "Refine with Stitch AI"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 4 FALLBACK: WHEN GENERATION QUEUED FOR OPERATOR WORKER              */}
        {/* ========================================================================= */}
        {currentStep === 4 && !activeArtifact && (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#071638]/90 border border-[#0A1940] space-y-6 shadow-2xl text-center max-w-2xl mx-auto backdrop-blur-xl">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-[#00D9FF]">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-[#00D9FF] border border-cyan-500/20">
                PERSISTED IN POSTGRESQL (Job: {activeJob?.jobCode || "QUEUED"})
              </span>
              <h2 className="text-2xl font-black text-white">Generation Queued for Stitch Worker</h2>
              <p className="text-xs text-slate-300">
                Your project brief <strong>{activeProject?.title}</strong> is securely stored in
                PostgreSQL. The Stitch execution provider is queued for autonomous execution by a
                StarX Operator Worker.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={handleGeneratePreview}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-extrabold bg-[#0A1940] hover:bg-[#0E2458] border border-[#00D9FF]/40 text-[#00D9FF] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>View Instant Architecture Wireframe</span>
              </button>
              <button
                type="button"
                onClick={() => setQuoteModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-white flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Scoping &amp; Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SLIDE-OVER DRAWER: TOKENS & ARCHITECTURE BRIEF                            */}
        {/* ========================================================================= */}
        {briefDrawerOpen && activeArtifact && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
            <div className="w-full max-w-xl h-full bg-[#071638] border-l border-white/10 p-6 sm:p-8 overflow-y-auto space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="space-y-0.5">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#00D9FF]" />
                    <span>Design Tokens &amp; Specifications</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Google Stitch Material You 3 Tokens &amp; Design.md
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setBriefDrawerOpen(false)}
                  className="p-2 rounded-xl bg-[#030B24] text-slate-400 hover:text-white border border-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Material You Colors */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-[#00D9FF] uppercase tracking-wider">
                  Material You Semantic Colors
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(activeArtifact.designTheme.namedColors || {}).map(
                    ([token, hex]) => {
                      if (!hex) return null;
                      return (
                        <div
                          key={token}
                          className="p-2.5 rounded-xl bg-[#030B24] border border-white/5 flex items-center gap-2.5"
                        >
                          <span
                            className="w-6 h-6 rounded-lg border border-white/20 shrink-0"
                            style={{ backgroundColor: hex }}
                          />
                          <div className="overflow-hidden">
                            <p className="text-[10px] font-mono text-slate-300 truncate">
                              {token}
                            </p>
                            <p className="text-[10px] font-mono text-[#00D9FF] uppercase">
                              {hex}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Typography Scale */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <h4 className="text-xs font-mono font-bold text-[#E52BFF] uppercase tracking-wider">
                  Typography Scale
                </h4>
                <div className="space-y-2">
                  {Object.entries(activeArtifact.designTheme.typography || {}).map(
                    ([scaleName, item]) => (
                      <div
                        key={scaleName}
                        className="p-3 rounded-xl bg-[#030B24] border border-white/5 flex items-center justify-between text-xs"
                      >
                        <span className="font-mono text-[#00D9FF]">{scaleName}</span>
                        <span className="font-mono text-slate-400">
                          {item.fontFamily} • {item.fontSize}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Design.md Markdown Content */}
              {parsedDesignMd.sections.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    Stitch Design.md Specification
                  </h4>
                  <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                    {parsedDesignMd.sections.map((sec) => (
                      <div
                        key={sec.id}
                        className="p-4 rounded-xl bg-[#030B24] border border-white/5 space-y-1.5"
                      >
                        <h5 className="font-bold text-white border-b border-white/10 pb-1">
                          {sec.title}
                        </h5>
                        <p className="whitespace-pre-line text-slate-300 text-[11px]">
                          {sec.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LIGHTBOX MODAL (ZOOM & PAN CANVAS INSPECTION)                             */}
        {/* ========================================================================= */}
        {lightboxOpen && activeArtifact?.thumbnailUrl && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
            <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
              <button
                type="button"
                onClick={() => setLightboxZoom((prev) => Math.min(prev + 0.25, 2.5))}
                className="p-2.5 rounded-full bg-[#071638] text-white border border-white/20 hover:bg-white/10 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setLightboxZoom((prev) => Math.max(prev - 0.25, 0.75))}
                className="p-2.5 rounded-full bg-[#071638] text-white border border-white/20 hover:bg-white/10 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setLightboxZoom(1)}
                className="px-3 py-2 rounded-full bg-[#071638] text-white border border-white/20 hover:bg-white/10 text-xs font-mono cursor-pointer"
              >
                Reset ({Math.round(lightboxZoom * 100)}%)
              </button>
              <button
                type="button"
                onClick={() => {
                  setLightboxOpen(false);
                  setLightboxZoom(1);
                }}
                className="p-2.5 rounded-full bg-[#071638] text-white border border-white/20 hover:bg-white/10 cursor-pointer"
                title="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-auto max-w-7xl max-h-[85vh] w-full flex items-center justify-center p-4">
              <img
                src={activeArtifact.thumbnailUrl}
                alt={activeArtifact.title}
                style={{ transform: `scale(${lightboxZoom})`, transformOrigin: "center" }}
                className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl transition-transform duration-200"
              />
            </div>
            <p className="text-xs font-mono text-slate-400 mt-2">
              {activeArtifact.title} • Google Stitch Authenticated Canvas v{activeArtifact.versionNumber}
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: "BUILD THIS WITH STARX" — QUOTATION & CONVERSION                   */}
        {/* ========================================================================= */}
        {quoteModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-[#071638] border border-[#00D9FF]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
              {quoteSuccessId ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    Personalized Demo Transmitted to StarX Architects!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your approved Stitch design direction (v{activeArtifact?.versionNumber || 1}) and
                    specifications have been recorded under Reference ID:
                  </p>
                  <div className="inline-block px-4 py-2 rounded-xl bg-[#030B24] border border-[#00D9FF]/40 text-[#00D9FF] font-mono font-bold text-sm">
                    {quoteSuccessId}
                  </div>
                  <p className="text-xs text-slate-400 max-w-md mx-auto pt-2">
                    Our Principal Software Architect is reviewing your requirements and will
                    assemble an itemized commercial proposal within 24 business hours.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setQuoteModalOpen(false);
                        setQuoteSuccessId(null);
                      }}
                      className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#030B24] border border-white/20 text-slate-300 hover:text-white cursor-pointer"
                    >
                      Close &amp; Keep Exploring
                    </button>
                    <Link
                      href="/customer"
                      className="px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-white hover:brightness-110"
                    >
                      Customer Portal &rarr;
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuotation} className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#00D9FF] uppercase tracking-wider">
                        Engineering Handoff &amp; Commercial Scope
                      </span>
                      <h3 className="text-xl font-black text-white">Build This With StarX</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setQuoteModalOpen(false)}
                      className="p-2 rounded-xl bg-[#030B24] text-slate-400 hover:text-white border border-white/10 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Pre-filled Scope Summary */}
                  <div className="p-4 rounded-xl bg-[#030B24] border border-white/5 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        Project &amp; Category:
                      </span>
                      <p className="font-bold text-white truncate">{projectName}</p>
                      <p className="text-slate-400 text-[11px]">{productCategory}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        Stitch Direction:
                      </span>
                      <p className="font-bold text-[#00D9FF]">
                        v{activeArtifact?.versionNumber || 1} • {activeViewport}
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        {revisionsList.length} revision note(s) logged
                      </p>
                    </div>
                  </div>

                  {/* Customer Information Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-300">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Malhotra"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#030B24] border border-[#0A1940] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-300">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. vikram@company.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#030B24] border border-[#0A1940] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-300">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#030B24] border border-[#0A1940] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-300">
                        Company Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Malhotra Enterprises"
                        value={clientCompany}
                        onChange={(e) => setClientCompany(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#030B24] border border-[#0A1940] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF]"
                      />
                    </div>
                  </div>

                  {/* Budget & Timeline Selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-300">
                        Target Timeline
                      </label>
                      <select
                        value={clientTimeline}
                        onChange={(e) => setClientTimeline(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#030B24] border border-[#0A1940] text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                      >
                        <option value="2–4 Weeks">2–4 Weeks (Fast-Track MVP)</option>
                        <option value="3–5 Weeks">3–5 Weeks (Standard Production)</option>
                        <option value="6–10 Weeks">6–10 Weeks (Enterprise Platform)</option>
                        <option value="Flexible">Flexible Staged Roadmap</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-300">
                        Estimated Budget
                      </label>
                      <select
                        value={clientBudget}
                        onChange={(e) => setClientBudget(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#030B24] border border-[#0A1940] text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                      >
                        <option value="₹50,000 - ₹1,50,000">₹50,000 – ₹1,50,000</option>
                        <option value="₹75,000 - ₹2,50,000">₹75,000 – ₹2,50,000</option>
                        <option value="₹2,50,000 - ₹6,00,000">₹2,50,000 – ₹6,00,000</option>
                        <option value="₹6,00,000+">₹6,00,000+ (Enterprise Staged)</option>
                      </select>
                    </div>
                  </div>

                  {/* Additional Notes Textarea */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300">
                      Additional Requirements or Integrations
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Needs ERP sync, custom payment webhook, multi-currency support..."
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#030B24] border border-[#0A1940] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-between border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setQuoteModalOpen(false)}
                      className="text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmittingQuote}
                      className="px-8 py-3 rounded-full text-xs font-extrabold bg-gradient-to-r from-emerald-500 via-[#00D9FF] to-[#087BFF] hover:brightness-110 text-[#030B24] shadow-xl flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {isSubmittingQuote
                          ? "Transmitting..."
                          : "Submit for Engineering Feasibility & Proposal"}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
