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
  PreferredContactMethod,
  PreferredContactTime,
  DesignStudioContactProfile,
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
  Phone,
  Mail,
  MessageSquare,
  Building2,
  User,
  ThumbsUp,
  AlertCircle,
  FileText,
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

const COUNTRY_CODES = [
  { code: "+91", label: "India (+91)", flag: "🇮🇳" },
  { code: "+1", label: "USA / Canada (+1)", flag: "🇺🇸" },
  { code: "+44", label: "United Kingdom (+44)", flag: "🇬🇧" },
  { code: "+971", label: "UAE (+971)", flag: "🇦🇪" },
  { code: "+65", label: "Singapore (+65)", flag: "🇸🇬" },
  { code: "+61", label: "Australia (+61)", flag: "🇦🇺" },
  { code: "+49", label: "Germany (+49)", flag: "🇩🇪" },
  { code: "+33", label: "France (+33)", flag: "🇫🇷" },
  { code: "+81", label: "Japan (+81)", flag: "🇯🇵" },
  { code: "+41", label: "Switzerland (+41)", flag: "🇨🇭" },
  { code: "+31", label: "Netherlands (+31)", flag: "🇳🇱" },
  { code: "+966", label: "Saudi Arabia (+966)", flag: "🇸🇦" },
  { code: "+852", label: "Hong Kong (+852)", flag: "🇭🇰" },
];

const CONTACT_METHODS: { id: PreferredContactMethod; label: string; icon: string; desc: string }[] = [
  { id: "phone", label: "Phone Call", icon: "📞", desc: "Direct consultation call with engineering lead" },
  { id: "whatsapp", label: "WhatsApp", icon: "💬", desc: "Instant messaging & design review chat" },
  { id: "email", label: "Email", icon: "✉️", desc: "Formal proposal & architectural summary" },
];

const CONTACT_TIMES: { id: PreferredContactTime; label: string; timeRange: string }[] = [
  { id: "morning", label: "Morning", timeRange: "9:00 AM – 12:00 PM" },
  { id: "afternoon", label: "Afternoon", timeRange: "12:00 PM – 5:00 PM" },
  { id: "evening", label: "Evening", timeRange: "5:00 PM – 8:00 PM" },
  { id: "flexible", label: "Any Time / Flexible", timeRange: "At your convenience" },
];

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

  // Contact Profile State (Step 8 Section B)
  const [contactFullName, setContactFullName] = useState<string>("");
  const [contactCountryCode, setContactCountryCode] = useState<string>("+91");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactCompany, setContactCompany] = useState<string>("");
  const [contactPreferredMethod, setContactPreferredMethod] = useState<PreferredContactMethod>("phone");
  const [contactPreferredTime, setContactPreferredTime] = useState<PreferredContactTime>("flexible");
  const [contactConsent, setContactConsent] = useState<boolean>(false);
  const [contactConsentTimestamp, setContactConsentTimestamp] = useState<string | null>(null);
  const [contactErrors, setContactErrors] = useState<{
    fullName?: string;
    phone?: string;
    email?: string;
    consent?: string;
  }>({});
  const [isSavingContact, setIsSavingContact] = useState<boolean>(false);
  const [contactSavedToast, setContactSavedToast] = useState<string | null>(null);

  // Design Approval State
  const [isApprovingDesign, setIsApprovingDesign] = useState<boolean>(false);
  const [approvalToast, setApprovalToast] = useState<string | null>(null);

  // Review & Enquiry Submission Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [isEditingContactInModal, setIsEditingContactInModal] = useState<boolean>(false);
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState<boolean>(false);
  const [enquiryError, setEnquiryError] = useState<string | null>(null);
  const [enquirySuccessData, setEnquirySuccessData] = useState<{
    referenceCode: string;
    quoteId: string;
    submittedAt: string;
  } | null>(null);

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
        if (parsed.contactProfile) {
          if (parsed.contactProfile.fullName) setContactFullName(parsed.contactProfile.fullName);
          if (parsed.contactProfile.countryCode) setContactCountryCode(parsed.contactProfile.countryCode);
          if (parsed.contactProfile.phone) setContactPhone(parsed.contactProfile.phone);
          if (parsed.contactProfile.email) setContactEmail(parsed.contactProfile.email);
          if (parsed.contactProfile.company) setContactCompany(parsed.contactProfile.company);
          if (parsed.contactProfile.preferredContactMethod) setContactPreferredMethod(parsed.contactProfile.preferredContactMethod);
          if (parsed.contactProfile.preferredContactTime) setContactPreferredTime(parsed.contactProfile.preferredContactTime);
          if (parsed.contactProfile.consent !== undefined) setContactConsent(parsed.contactProfile.consent);
          if (parsed.contactProfile.consentTimestamp) setContactConsentTimestamp(parsed.contactProfile.consentTimestamp);
        } else {
          if (parsed.clientName) setContactFullName(parsed.clientName);
          if (parsed.clientEmail) setContactEmail(parsed.clientEmail);
          if (parsed.clientPhone) setContactPhone(parsed.clientPhone);
          if (parsed.clientCompany) setContactCompany(parsed.clientCompany);
        }
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
        contactProfile: {
          fullName: contactFullName,
          countryCode: contactCountryCode,
          phone: contactPhone,
          email: contactEmail,
          company: contactCompany,
          preferredContactMethod: contactPreferredMethod,
          preferredContactTime: contactPreferredTime,
          consent: contactConsent,
          consentTimestamp: contactConsentTimestamp,
        },
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
    contactFullName,
    contactCountryCode,
    contactPhone,
    contactEmail,
    contactCompany,
    contactPreferredMethod,
    contactPreferredTime,
    contactConsent,
    contactConsentTimestamp,
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

  // Contact validation
  const validateContactForm = (): boolean => {
    const errs: { fullName?: string; phone?: string; email?: string; consent?: string } = {};

    if (!contactFullName.trim() || contactFullName.trim().length < 2) {
      errs.fullName = "Please enter your full name (minimum 2 characters)";
    }

    const cleanPhone = contactPhone.replace(/[\s\-()]/g, "");
    if (!cleanPhone || !/^[0-9]{7,15}$/.test(cleanPhone)) {
      errs.phone = "Please enter a valid mobile number (7–15 digits)";
    }

    if (!contactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
      errs.email = "Please enter a valid corporate or business email address";
    }

    if (!contactConsent) {
      errs.consent = "You must agree to be contacted to proceed";
    }

    setContactErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Save contact details to local state & server project draft (Does NOT create an enquiry)
  const handleSaveContactDetails = async (): Promise<boolean> => {
    if (!validateContactForm()) return false;

    setIsSavingContact(true);
    const ts = contactConsentTimestamp || new Date().toISOString();
    if (!contactConsentTimestamp) {
      setContactConsentTimestamp(ts);
    }

    const profile: DesignStudioContactProfile = {
      fullName: contactFullName.trim(),
      countryCode: contactCountryCode,
      phone: contactPhone.trim(),
      email: contactEmail.trim().toLowerCase(),
      company: contactCompany.trim() || undefined,
      preferredContactMethod: contactPreferredMethod,
      preferredContactTime: contactPreferredTime,
      consent: contactConsent,
      consentTimestamp: ts,
    };

    setClientName(profile.fullName);
    setClientEmail(profile.email);
    setClientPhone(`${profile.countryCode} ${profile.phone}`);
    setClientCompany(profile.company || "");

    if (activeProject) {
      setActiveProject((prev) => (prev ? { ...prev, contactProfile: profile } : null));

      try {
        await fetch("/api/design-studio/projects", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId: activeProject.id,
            contactProfile: profile,
          }),
        });
      } catch (err) {
        console.warn("[DesignStudio] Could not patch draft contact profile:", err);
      }
    }

    setIsSavingContact(false);
    setContactSavedToast("Contact details saved to your project session.");
    setTimeout(() => setContactSavedToast(null), 4000);
    return true;
  };

  // Version-Specific Design Approval
  const handleApproveDesign = async () => {
    if (!activeProject || !activeArtifact) return;

    setIsApprovingDesign(true);
    try {
      const res = await fetch("/api/design-studio/artifacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "approve",
          projectId: activeProject.id,
          artifactId: activeArtifact.id,
          contactName: contactFullName.trim() || clientName || undefined,
          contactEmail: contactEmail.trim() || clientEmail || undefined,
          contactPhone: contactPhone.trim() || clientPhone || undefined,
        }),
      });

      const data = await res.json();
      if (data.ok && data.artifact) {
        setActiveArtifact(data.artifact);
        setAllArtifacts((prev) =>
          prev.map((a) => (a.id === data.artifact.id ? data.artifact : a))
        );
        setApprovalToast(`Design version v${data.artifact.versionNumber || 1} approved!`);
        setTimeout(() => setApprovalToast(null), 4000);
      }
    } catch (err) {
      console.error("[DesignStudio] Approve error:", err);
    } finally {
      setIsApprovingDesign(false);
    }
  };

  // Submit Project Enquiry Handoff
  const handleSubmitProjectEnquiry = async () => {
    if (!validateContactForm()) {
      setIsEditingContactInModal(true);
      return;
    }

    if (!activeArtifact?.isApproved) {
      setEnquiryError("Please approve your design before submitting.");
      return;
    }

    if (!activeProject || isSubmittingEnquiry) return;

    setIsSubmittingEnquiry(true);
    setEnquiryError(null);

    try {
      const ts = contactConsentTimestamp || new Date().toISOString();
      const profile: DesignStudioContactProfile = {
        fullName: contactFullName.trim(),
        countryCode: contactCountryCode,
        phone: contactPhone.trim(),
        email: contactEmail.trim().toLowerCase(),
        company: contactCompany.trim() || undefined,
        preferredContactMethod: contactPreferredMethod,
        preferredContactTime: contactPreferredTime,
        consent: contactConsent,
        consentTimestamp: ts,
      };

      const handoffDetails = [
        `STARX DESIGN STUDIO — APPROVED PROJECT ENQUIRY`,
        `Project ID: ${activeProject.projectCode} (${activeProject.id})`,
        `Title: ${activeProject.title}`,
        `Stitch Screen ID: ${activeArtifact?.providerScreenId || "Google Stitch MCP Screen"}`,
        `Approved Version: v${activeArtifact?.versionNumber || 1} (Approved at: ${activeArtifact?.approvedAt || new Date().toISOString()})`,
        `Division: ${currentDivisionObj.name} (${selectedDivision})`,
        `Industry: ${currentIndustryObj.name} (${selectedIndustry})`,
        `Selected Plan: ${currentPlan.name} (${currentPlan.code}) — ${formatINR(currentPlan.priceINR)} / ${formatUSD(currentPlan.priceUSD)}`,
        `Selected Add-ons: ${selectedAddonIds.join(", ") || "None"} (Addons Total: ${formatINR(pricingTotals.addonsINR)})`,
        `Estimated Total Investment: ${formatINR(pricingTotals.totalINR)} / ${formatUSD(pricingTotals.totalUSD)}`,
        `Target Platforms: ${platformTargets.join(", ")}`,
        `Primary Viewport: ${activeViewport}`,
        `Brand Palette: Primary ${palettePrimary}, Accent ${paletteAccent}`,
        `Preferred Contact Method: ${contactPreferredMethod.toUpperCase()}`,
        `Preferred Contact Time: ${contactPreferredTime.toUpperCase()}`,
        `Consent Recorded: YES (Timestamp: ${ts})`,
        `Customer Notes: ${clientNotes || "None"}`,
        `Scope Special Instructions: ${scopeNotes || "None"}`,
      ].join("\n\n");

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: profile.fullName,
          email: profile.email,
          phone: `${profile.countryCode} ${profile.phone}`,
          company: profile.company || `${projectName} (${currentIndustryObj.name})`,
          serviceSlug: selectedDivision,
          budgetRange: `${formatINR(pricingTotals.totalINR)} (${currentPlan.name})`,
          timeline: currentPlan.timelineWeeks,
          projectDetails: handoffDetails,
          sourcePage: "/design-studio",
          projectId: activeProject.id,
          artifactId: activeArtifact.id,
          contactProfile: profile,
          consent: profile.consent,
          consentTimestamp: profile.consentTimestamp,
        }),
      });

      const data = await res.json();
      if (data.ok || data.success) {
        const ref = data.referenceCode || data.quoteId || `STX-ENQ-${activeProject.projectCode}`;
        setEnquirySuccessData({
          referenceCode: ref,
          quoteId: data.quoteId || ref,
          submittedAt: new Date().toISOString(),
        });
        setQuoteSubmittedCode(ref);
      } else {
        setEnquiryError(data.message || data.error || "Failed to submit enquiry. Please retry.");
      }
    } catch (err: any) {
      setEnquiryError(err.message || "Network error. Please try again.");
    } finally {
      setIsSubmittingEnquiry(false);
    }
  };

  // Download Project Blueprint & Summary
  const handleDownloadSummary = () => {
    const summary = [
      `=============================================================`,
      `STARX ALPHA LABS — APPROVED PROJECT DESIGN BLUEPRINT`,
      `=============================================================`,
      `Enquiry Reference: ${enquirySuccessData?.referenceCode || quoteSubmittedCode || "STX-ENQ-PENDING"}`,
      `Submission Date  : ${enquirySuccessData?.submittedAt ? new Date(enquirySuccessData.submittedAt).toLocaleString() : new Date().toLocaleString()}`,
      `Project Title    : ${brandName || projectName || "StarX Project"}`,
      `Division         : ${currentDivisionObj.name} (${selectedDivision})`,
      `Industry         : ${currentIndustryObj.name} (${selectedIndustry})`,
      `Category         : ${productCategory}`,
      `-------------------------------------------------------------`,
      `CONTACT INFORMATION`,
      `Full Name        : ${contactFullName || clientName}`,
      `Mobile Phone     : ${contactCountryCode} ${contactPhone || clientPhone}`,
      `Email Address    : ${contactEmail || clientEmail}`,
      `Company          : ${contactCompany || clientCompany || "Direct / Independent"}`,
      `Preferred Contact: ${contactPreferredMethod.toUpperCase()}`,
      `Preferred Time   : ${contactPreferredTime.toUpperCase()}`,
      `Consent Recorded : YES (${contactConsentTimestamp || "Approved"})`,
      `-------------------------------------------------------------`,
      `ARCHITECTURE & ESTIMATED INVESTMENT`,
      `Selected Plan    : ${currentPlan.name} (${currentPlan.code})`,
      `Base Investment  : ${formatINR(currentPlan.priceINR)} / ${formatUSD(currentPlan.priceUSD)}`,
      `Add-ons          : ${selectedAddonIds.join(", ") || "None"} (${formatINR(pricingTotals.addonsINR)})`,
      `Total Estimated  : ${formatINR(pricingTotals.totalINR)} / ${formatUSD(pricingTotals.totalUSD)}`,
      `Timeline         : ${currentPlan.timelineWeeks}`,
      `Complexity Score : ${complexityData.score}/100`,
      `Platforms        : ${platformTargets.join(", ")}`,
      `-------------------------------------------------------------`,
      `STITCH GENERATION ARTIFACT`,
      `Screen Title     : ${activeArtifact?.title || "Hero Screen"}`,
      `Screen ID        : ${activeArtifact?.providerScreenId || "Active"}`,
      `Version          : v${activeArtifact?.versionNumber || 1}`,
      `Approval Status  : ${activeArtifact?.isApproved ? `APPROVED (${activeArtifact.approvedAt})` : "DRAFT"}`,
      `Primary Viewport : ${activeViewport}`,
      `Brand Palette    : Primary ${palettePrimary}, Accent ${paletteAccent}, Background ${paletteBg}`,
      `Features         : ${selectedFeatures.join("; ")}`,
      `=============================================================`,
      `StarX Alpha Labs • Build Smarter. Lead Tomorrow.`,
      `Website: https://www.starxalphalabs.online`,
      `=============================================================`,
    ].join("\n");

    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `StarX-Design-Blueprint-${enquirySuccessData?.referenceCode || "Summary"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stepTitles = [
    { num: 1, label: "Solution Discovery", sub: "Division & Industry" },
    { num: 2, label: "AI Requirement Discovery", sub: "Idea & Workflows" },
    { num: 3, label: "Feature & Complexity Analysis", sub: "Technical Audit" },
    { num: 4, label: "Plan Selection", sub: "AI Recommendation" },
    { num: 5, label: "Feature Configuration", sub: "Scope & Add-ons" },
    { num: 6, label: "Design Personalisation", sub: "Palette & Themes" },
    { num: 7, label: "AI Blueprint & Prompt Generation", sub: "Stitch Prompt" },
    { num: 8, label: "Google Stitch Generation & Contact Details", sub: "Demo & Contact" },
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

      {contactSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#071638] border border-[#00C98B] text-white text-xs font-mono shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-[#00C98B]" />
          <span>{contactSavedToast}</span>
        </div>
      )}

      {approvalToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#071638] border border-[#00D9FF] text-white text-xs font-mono shadow-2xl flex items-center gap-3">
          <ThumbsUp className="w-4 h-4 text-[#00D9FF]" />
          <span>{approvalToast}</span>
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
                <Badge variant="electric" dot>Step 7 of 8 • AI Blueprint &amp; Prompt Generation</Badge>
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
          {/* STEP 8: GOOGLE STITCH GENERATION & CONTACT DETAILS */}
          {/* ================================================================ */}
          {currentStep === 8 && (
            <div className="space-y-12">
              {/* Step Header */}
              <div className="text-center space-y-3">
                <Badge variant="electric" dot>Step 8 of 8 • Google Stitch Generation &amp; Contact Details</Badge>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Personalized AI Demo &amp; Contact Workspace
                </h1>
                <p className="text-sm sm:text-base text-[#C8D5EF] max-w-2xl mx-auto">
                  Review your Google Stitch MCP synthesized design, inspect responsive viewports, test refinements, and provide your contact details for an engineering handoff.
                </p>
              </div>

              {/* ================================================================ */}
              {/* SECTION A — GENERATE YOUR PERSONALISED DEMO */}
              {/* ================================================================ */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00D9FF] flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Section A — Generate Your Personalised Demo</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Engine: Google Stitch MCP (Gemini 3.8 Flash)
                  </span>
                </div>

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

                {/* Initial Launch Card if not yet generated and not generating */}
                {!activeArtifact && !isGenerating && (
                  <div className="max-w-xl mx-auto p-8 rounded-3xl bg-[#0A1940] border border-white/15 text-center space-y-5 shadow-2xl">
                    <div className="w-14 h-14 rounded-2xl bg-[#087BFF]/20 border border-[#00D9FF]/30 flex items-center justify-center mx-auto text-[#00D9FF]">
                      <Wand2 className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-white">Synthesize Your Personalized Demo</h3>
                      <p className="text-xs text-slate-300 max-w-md mx-auto">
                        Ready to trigger Google Stitch MCP for {brandName || projectName || "your project"} with {currentDivisionObj.name} architecture.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLaunchStitchGeneration}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#E52BFF] text-white font-black text-xs shadow-xl hover:brightness-110 flex items-center gap-2 mx-auto cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Trigger Google Stitch MCP Generation</span>
                    </button>
                  </div>
                )}

                {/* Hero Workspace Canvas */}
                {activeArtifact && (
                  <div className="space-y-6">
                    {/* Workspace Command Bar */}
                    <div className="p-4 rounded-2xl bg-[#0A1940] border border-white/10 flex flex-wrap items-center justify-between gap-4 shadow-xl">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-[#00C98B] animate-pulse" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm font-bold text-white">
                              {activeArtifact.title || brandName || projectName}
                            </h2>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#030B24] text-[#00D9FF] border border-white/10 font-bold">
                              v{activeArtifact.versionNumber || 1}
                            </span>
                            {activeArtifact.isApproved && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00C98B]/20 text-[#00C98B] border border-[#00C98B]/40 flex items-center gap-1 font-bold">
                                <CheckCircle className="w-3 h-3" />
                                <span>Approved</span>
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">
                            Provider: {activeArtifact.provider} • Screen: {activeArtifact.providerScreenId || "Primary"}
                          </span>
                        </div>
                      </div>

                      {/* Screen Navigation Tabs (when multiple revisions exist) */}
                      {allArtifacts.length > 1 && (
                        <div className="flex items-center gap-1.5 bg-[#030B24] p-1 rounded-xl border border-white/10">
                          <span className="text-[10px] font-mono text-slate-500 px-2">Screens:</span>
                          {allArtifacts.map((art) => {
                            const isSelected = art.id === activeArtifact.id;
                            return (
                              <button
                                key={art.id}
                                type="button"
                                onClick={() => setActiveArtifact(art)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#087BFF] text-white shadow"
                                    : "text-slate-400 hover:text-white"
                                }`}
                              >
                                v{art.versionNumber || 1}
                              </button>
                            );
                          })}
                        </div>
                      )}

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
                          title="Share Design Link"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Share</span>
                        </button>

                        {/* Edit Contact Information CTA */}
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById("contact-information-section");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono flex items-center gap-1.5 border border-white/10 cursor-pointer"
                        >
                          <User className="w-3.5 h-3.5 text-[#00D9FF]" />
                          <span>Edit Contact Info</span>
                        </button>

                        {/* Version-Specific Design Approval CTA */}
                        {!activeArtifact.isApproved ? (
                          <button
                            type="button"
                            onClick={handleApproveDesign}
                            disabled={isApprovingDesign}
                            className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-[#00C98B] border border-[#00C98B]/50 font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            {isApprovingDesign ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <ThumbsUp className="w-3.5 h-3.5" />
                            )}
                            <span>Approve v{activeArtifact.versionNumber || 1}</span>
                          </button>
                        ) : (
                          <div className="px-3 py-2 rounded-xl bg-[#00C98B]/10 border border-[#00C98B]/30 text-[#00C98B] text-xs font-mono font-bold flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>v{activeArtifact.versionNumber || 1} Approved</span>
                          </div>
                        )}

                        {/* Build This With StarX CTA */}
                        <button
                          type="button"
                          onClick={() => setReviewModalOpen(true)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black font-extrabold text-xs shadow-lg hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>Build This With StarX</span>
                        </button>
                      </div>
                    </div>

                    {/* Sandboxed Viewport Chassis */}
                    <div className="relative mx-auto flex justify-center py-2">
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
                          <div className="text-[10px] font-mono text-slate-400 bg-[#030B24] px-4 py-0.5 rounded-full border border-white/5 truncate max-w-xs sm:max-w-md">
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
                    <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-[#0A1940] border border-white/10 space-y-3 shadow-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00D9FF] flex items-center gap-1.5">
                          <Wand2 className="w-3.5 h-3.5" />
                          Collaborative Refinement with Google Stitch
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          Powered by Stitch edit_screens MCP
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
              </div>

              {/* ================================================================ */}
              {/* SECTION B — YOUR CONTACT INFORMATION */}
              {/* ================================================================ */}
              <div id="contact-information-section" className="space-y-6 pt-10 border-t border-white/10">
                <div className="space-y-2">
                  <Badge variant="outline">Section B • Your Contact Information</Badge>
                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    Where Can We Reach You?
                  </h2>
                  <p className="text-sm text-[#C8D5EF] max-w-2xl">
                    Your personalised design is ready! Share your contact details so our team can reach you when you&apos;re ready to discuss bringing your idea to life.
                  </p>
                </div>

                <div className="max-w-3xl rounded-3xl bg-[#0A1940] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
                  {/* Active Saved Status Indicator */}
                  {contactFullName && contactPhone && contactEmail && contactConsent && (
                    <div className="p-4 rounded-2xl bg-[#030B24] border border-[#00C98B]/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                      <div className="flex items-center gap-2 text-[#00C98B]">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Contact profile active: <strong>{contactFullName}</strong> • {contactCountryCode} {contactPhone} • {contactEmail}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        Consent: {contactConsentTimestamp ? new Date(contactConsentTimestamp).toLocaleDateString() : "Recorded"}
                      </span>
                    </div>
                  )}

                  <div className="space-y-5">
                    {/* Required Fields Group */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                          <span>Full Name <strong className="text-red-400">*</strong></span>
                          {contactErrors.fullName && (
                            <span className="text-[10px] text-red-400">{contactErrors.fullName}</span>
                          )}
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            value={contactFullName}
                            onChange={(e) => {
                              setContactFullName(e.target.value);
                              if (contactErrors.fullName) setContactErrors((prev) => ({ ...prev, fullName: undefined }));
                            }}
                            placeholder="e.g. Alex Sharma"
                            className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#030B24] border text-xs text-white focus:outline-none focus:border-[#00D9FF] ${
                              contactErrors.fullName ? "border-red-500/80" : "border-white/10"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Business Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                          <span>Email Address <strong className="text-red-400">*</strong></span>
                          {contactErrors.email && (
                            <span className="text-[10px] text-red-400">{contactErrors.email}</span>
                          )}
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="email"
                            value={contactEmail}
                            onChange={(e) => {
                              setContactEmail(e.target.value);
                              if (contactErrors.email) setContactErrors((prev) => ({ ...prev, email: undefined }));
                            }}
                            placeholder="alex@company.com"
                            className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#030B24] border text-xs text-white focus:outline-none focus:border-[#00D9FF] ${
                              contactErrors.email ? "border-red-500/80" : "border-white/10"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mobile Number with Country Code */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                        <span>Mobile Number <strong className="text-red-400">*</strong></span>
                        {contactErrors.phone && (
                          <span className="text-[10px] text-red-400">{contactErrors.phone}</span>
                        )}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <select
                          value={contactCountryCode}
                          onChange={(e) => setContactCountryCode(e.target.value)}
                          aria-label="Country Code"
                          className="px-3 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF] cursor-pointer"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code} className="bg-[#030B24] text-white">
                              {c.flag} {c.label}
                            </option>
                          ))}
                        </select>
                        <div className="sm:col-span-2 relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="tel"
                            value={contactPhone}
                            onChange={(e) => {
                              setContactPhone(e.target.value);
                              if (contactErrors.phone) setContactErrors((prev) => ({ ...prev, phone: undefined }));
                            }}
                            placeholder="98765 43210 (digits only)"
                            className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#030B24] border text-xs text-white focus:outline-none focus:border-[#00D9FF] ${
                              contactErrors.phone ? "border-red-500/80" : "border-white/10"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Optional Fields Group */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">
                        Company / Organisation Name <span className="text-slate-500">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={contactCompany}
                          onChange={(e) => setContactCompany(e.target.value)}
                          placeholder="e.g. Acme Tech Innovations"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#030B24] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                        />
                      </div>
                    </div>

                    {/* Preferred Contact Method */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-300">Preferred Contact Method</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {CONTACT_METHODS.map((m) => {
                          const isSel = contactPreferredMethod === m.id;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => setContactPreferredMethod(m.id)}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                                isSel
                                  ? "bg-[#087BFF]/20 border-[#00D9FF] text-white shadow-md"
                                  : "bg-[#030B24] border-white/10 text-slate-400 hover:text-white"
                              }`}
                            >
                              <div className="flex items-center gap-2 font-bold text-xs">
                                <span>{m.icon}</span>
                                <span>{m.label}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{m.desc}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Preferred Contact Time */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-300">Preferred Contact Time</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {CONTACT_TIMES.map((t) => {
                          const isSel = contactPreferredTime === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setContactPreferredTime(t.id)}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                isSel
                                  ? "bg-[#087BFF]/20 border-[#00D9FF] text-white shadow-md"
                                  : "bg-[#030B24] border-white/10 text-slate-400 hover:text-white"
                              }`}
                            >
                              <div className="font-bold text-xs">{t.label}</div>
                              <p className="text-[9px] text-slate-400 mt-0.5">{t.timeRange}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Explicit Consent Checkbox (REQUIRED) */}
                    <div className="p-4 rounded-xl bg-[#030B24] border border-white/10 space-y-2">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={contactConsent}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setContactConsent(checked);
                            if (checked && !contactConsentTimestamp) {
                              setContactConsentTimestamp(new Date().toISOString());
                            }
                            if (contactErrors.consent) setContactErrors((prev) => ({ ...prev, consent: undefined }));
                          }}
                          className="mt-1 w-4 h-4 rounded text-[#00D9FF] focus:ring-0 bg-[#071638] border-white/20 cursor-pointer"
                        />
                        <span className="text-xs text-slate-300 leading-relaxed select-none">
                          I agree that StarX Alpha Labs may contact me using the details provided regarding my proposed project and design. <strong className="text-red-400">*</strong>
                        </span>
                      </label>
                      {contactErrors.consent && (
                        <p className="text-[10px] text-red-400 font-mono pl-7">{contactErrors.consent}</p>
                      )}
                      {contactConsent && contactConsentTimestamp && (
                        <p className="text-[10px] text-slate-500 font-mono pl-7">
                          Consent recorded on {new Date(contactConsentTimestamp).toLocaleString()}
                        </p>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <button
                        type="button"
                        onClick={handleSaveContactDetails}
                        disabled={isSavingContact}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black font-extrabold text-xs shadow-lg hover:brightness-110 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSavingContact ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                        <span>Save Contact Details</span>
                      </button>

                      <p className="text-[10px] text-slate-400 font-mono max-w-sm">
                        🔒 Note: Entering your contact details does not place an order or create an enquiry yet. You can continue exploring and refining your demo above.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </main>

      {/* ================================================================ */}
      {/* BUILD THIS WITH STARX & FINAL SUCCESS MODAL */}
      {/* ================================================================ */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-[#0A1940] border border-[#00D9FF]/40 p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            <button
              type="button"
              onClick={() => {
                setReviewModalOpen(false);
                setIsEditingContactInModal(false);
              }}
              className="absolute top-6 right-6 text-slate-400 hover:text-white text-xl cursor-pointer"
            >
              &times;
            </button>

            {/* CASE 1: FINAL SUCCESS SCREEN */}
            {enquirySuccessData ? (
              <div className="space-y-6 text-left">
                {/* Heading & Supporting Text */}
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-[#00C98B]/20 border border-[#00C98B]/40 flex items-center justify-center mx-auto text-[#00C98B]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Thank You! Your Project Enquiry Has Been Received.
                  </h2>
                  <p className="text-sm text-[#C8D5EF]">
                    Your idea is one step closer to becoming reality.
                  </p>
                </div>

                {/* Section: What's Next? with 3-Step Visual Progress */}
                <div className="p-6 rounded-2xl bg-[#030B24] border border-white/10 space-y-4">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>What&apos;s Next?</span>
                    </h3>
                    <p className="text-xs text-[#00D9FF] font-mono">
                      A StarX representative will contact you directly.
                    </p>
                  </div>

                  {/* 3-Step Progress Timeline */}
                  <div className="space-y-3 pt-2">
                    {/* Step 1: Enquiry Received */}
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#00C98B] text-black font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white">Step 1 — Enquiry Received (Completed)</div>
                        <p className="text-[11px] text-slate-300">
                          Your project details and approved design have been submitted to our team.
                        </p>
                      </div>
                    </div>

                    {/* Step 2: Our Team Reviews Your Project */}
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#087BFF] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                        2
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-[#00D9FF]">Step 2 — Our Team Reviews Your Project (In Progress)</div>
                        <p className="text-[11px] text-slate-300">
                          A StarX technical consultant will review your design, feature requirements, and estimated scope.
                        </p>
                      </div>
                    </div>

                    {/* Step 3: We'll Contact You */}
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-300">Step 3 — We&apos;ll Contact You</div>
                        <p className="text-[11px] text-slate-300">
                          Our representative will reach out via <strong className="text-white">{contactPreferredMethod.toUpperCase()}</strong> at <strong className="text-white">{contactPreferredTime}</strong> to discuss timeline, architecture, and exact pricing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details Recap Card */}
                <div className="p-5 rounded-2xl bg-[#030B24] border border-white/10 space-y-2.5 text-xs font-mono">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pb-1 border-b border-white/5">
                    Project Details Recap
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Enquiry Reference ID:</span>
                    <span className="text-[#00D9FF] font-bold">{enquirySuccessData.referenceCode}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Project Name:</span>
                    <span className="text-white font-bold">{projectName || brandName || activeProject?.title || "StarX Project"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Submitted Date &amp; Time:</span>
                    <span className="text-white">{new Date(enquirySuccessData.submittedAt).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Contact Number:</span>
                    <span className="text-white">{contactCountryCode} {contactPhone}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Selected Division:</span>
                    <span className="text-white">{currentDivisionObj.name}</span>
                  </div>
                </div>

                {/* Reassurance Banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#00C98B]/10 to-[#087BFF]/10 border border-[#00C98B]/30 text-xs text-slate-200">
                  💡 <strong>You don&apos;t need to do anything else right now.</strong> Our team will be in touch using the contact details you provided.
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black font-extrabold text-xs shadow-xl hover:brightness-110 text-center"
                  >
                    Back to Homepage
                  </Link>
                  <button
                    type="button"
                    onClick={handleDownloadSummary}
                    className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#00D9FF]" />
                    <span>Download Project Blueprint</span>
                  </button>
                </div>
              </div>
            ) : (
              /* CASE 2: REVIEW & SUBMIT SCREEN ("# Build This With StarX") */
              <div className="space-y-6 text-left">
                {/* Heading & Supporting Text */}
                <div className="space-y-1">
                  <Badge variant="electric">Commercial Conversion</Badge>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Build This With StarX
                  </h2>
                  <p className="text-xs sm:text-sm text-[#C8D5EF]">
                    Ready to bring your approved design to life? Submit your project enquiry and our representative will contact you directly.
                  </p>
                </div>

                {/* Section 1: Project Summary */}
                <div className="p-4 rounded-2xl bg-[#030B24] border border-white/10 space-y-2 text-xs font-mono">
                  <div className="text-[10px] uppercase font-bold text-[#00D9FF] tracking-wider pb-1 border-b border-white/5">
                    1. Project Summary
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Selected Plan:</span>
                    <span className="text-white font-bold">{currentPlan.name} ({currentPlan.code})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Investment:</span>
                    <span className="text-[#00D9FF] font-bold">{formatINR(pricingTotals.totalINR)} / {formatUSD(pricingTotals.totalUSD)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Delivery Timeline:</span>
                    <span className="text-white">{currentPlan.timelineWeeks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Platforms:</span>
                    <span className="text-white">{platformTargets.join(", ")}</span>
                  </div>
                </div>

                {/* Section 2: Generated Design Snapshot */}
                <div className="p-4 rounded-2xl bg-[#030B24] border border-white/10 space-y-2 text-xs font-mono">
                  <div className="text-[10px] uppercase font-bold text-[#00D9FF] tracking-wider pb-1 border-b border-white/5 flex items-center justify-between">
                    <span>2. Generated Design Snapshot</span>
                    <span className="text-slate-400">{activeViewport}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Screen Title:</span>
                    <span className="text-white font-bold">{activeArtifact?.title || brandName || projectName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Version:</span>
                    <span className="text-white font-bold">v{activeArtifact?.versionNumber || 1}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-slate-400">Approval Status:</span>
                    {activeArtifact?.isApproved ? (
                      <span className="text-[#00C98B] font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Approved ({activeArtifact.approvedAt ? new Date(activeArtifact.approvedAt).toLocaleDateString() : "Active"})</span>
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Not Yet Approved</span>
                        </span>
                        <button
                          type="button"
                          onClick={handleApproveDesign}
                          disabled={isApprovingDesign}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-[#00C98B] border border-[#00C98B]/40 hover:bg-emerald-500/30 text-[10px] font-bold cursor-pointer"
                        >
                          Approve Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 3: Your Contact Information */}
                <div className="p-4 rounded-2xl bg-[#030B24] border border-white/10 space-y-3 text-xs font-mono">
                  <div className="flex items-center justify-between pb-1 border-b border-white/5">
                    <span className="text-[10px] uppercase font-bold text-[#00D9FF] tracking-wider">
                      3. Your Contact Information
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingContactInModal(!isEditingContactInModal)}
                      className="text-[11px] text-[#00D9FF] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <User className="w-3 h-3" />
                      <span>{isEditingContactInModal ? "Done Editing" : "Edit Contact Information"}</span>
                    </button>
                  </div>

                  {!isEditingContactInModal ? (
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Full Name:</span>
                        <span className="text-white font-bold">{contactFullName || <em className="text-red-400">Required</em>}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Mobile Phone:</span>
                        <span className="text-white font-bold">
                          {contactPhone ? `${contactCountryCode} ${contactPhone}` : <em className="text-red-400">Required</em>}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Email:</span>
                        <span className="text-white font-bold">{contactEmail || <em className="text-red-400">Required</em>}</span>
                      </div>
                      {contactCompany && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Company:</span>
                          <span className="text-white">{contactCompany}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-400">Preferred Method:</span>
                        <span className="text-[#00D9FF] uppercase">{contactPreferredMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Preferred Time:</span>
                        <span className="text-white capitalize">{contactPreferredTime}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-white/5">
                        <span className="text-slate-400">Recorded Consent:</span>
                        <span className={contactConsent ? "text-[#00C98B] font-bold" : "text-red-400 font-bold"}>
                          {contactConsent
                            ? `Consent to be contacted recorded on ${contactConsentTimestamp ? new Date(contactConsentTimestamp).toLocaleDateString() : "Today"}`
                            : "Consent required to submit"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Inline Editor in Modal */
                    <div className="space-y-3 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={contactFullName}
                          onChange={(e) => setContactFullName(e.target.value)}
                          placeholder="Full Name *"
                          className="px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-xs text-white"
                        />
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="Email Address *"
                          className="px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <select
                          value={contactCountryCode}
                          onChange={(e) => setContactCountryCode(e.target.value)}
                          aria-label="Country Code in Modal"
                          className="px-2 py-2 rounded-xl bg-[#071638] border border-white/10 text-xs text-white"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code} className="bg-[#030B24] text-white">
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="Mobile Number *"
                          className="col-span-2 px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-xs text-white"
                        />
                      </div>
                      <input
                        type="text"
                        value={contactCompany}
                        onChange={(e) => setContactCompany(e.target.value)}
                        placeholder="Company / Organisation (Optional)"
                        className="w-full px-3 py-2 rounded-xl bg-[#071638] border border-white/10 text-xs text-white"
                      />
                      <label className="flex items-center gap-2 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={contactConsent}
                          onChange={(e) => {
                            setContactConsent(e.target.checked);
                            if (e.target.checked && !contactConsentTimestamp) {
                              setContactConsentTimestamp(new Date().toISOString());
                            }
                          }}
                          className="w-3.5 h-3.5 rounded text-[#00D9FF]"
                        />
                        <span className="text-[11px] text-slate-300">
                          I agree that StarX may contact me regarding this project.
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Error Banner */}
                {enquiryError && (
                  <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{enquiryError}</span>
                  </div>
                )}

                {/* Final CTA & Supporting Text */}
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSubmitProjectEnquiry}
                    disabled={isSubmittingEnquiry}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black font-black text-sm shadow-xl hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingEnquiry ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>Submit Project Enquiry</span>
                  </button>
                  <p className="text-center text-[11px] text-slate-400 font-mono">
                    No payment is required at this stage. Our representative will contact you directly to discuss your project.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
