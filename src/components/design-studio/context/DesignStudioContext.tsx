"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type {
  OnboardingStep,
  OnboardingChapter,
  DesignStudioSessionState,
  UserAccountData,
  ProfileContactData,
  FeatureRequirementItem,
  RequirementSpecification,
  DesignPreferencesData,
} from "../types";
import {
  CANONICAL_PLANS,
  GLOBAL_PLAN_ADDONS,
  getPlansByDivision,
  normalizeDivisionSlug,
  getPlanById,
  getDefaultPlanForDivision,
} from "@/data/plans";
import {
  calculateComplexityScore,
  recommendPlan,
} from "@/lib/plans/recommendationEngine";
import { createClient } from "@/lib/supabase/client";

const STORAGE_KEY = "starx_design_studio_v2_session";

interface DesignStudioContextType {
  state: DesignStudioSessionState;
  currentChapter: OnboardingChapter;
  // Navigation
  goToStep: (step: OnboardingStep) => void;
  nextStep: () => boolean;
  prevStep: () => void;
  canAdvance: boolean;
  // Chapter 1 setters
  setAccount: (account: Partial<UserAccountData>) => void;
  setProfile: (profile: Partial<ProfileContactData>) => void;
  setDivision: (divisionSlug: string, supporting?: string[]) => void;
  setIndustry: (industrySlug: string) => void;
  // Chapter 2 setters
  setSolution: (solutionSlug: string, solutionName: string) => void;
  setPlatforms: (platforms: string[]) => void;
  setRawDescription: (desc: string) => void;
  setIdeaDescription: (desc: string) => void;
  toggleIdeaStarter: (starter: string) => void;
  setUserRoles: (roles: string[]) => void;
  setSelectedFeatures: (features: FeatureRequirementItem[]) => void;
  setFeatureRequirements: (features: any[]) => void;
  toggleFeature: (feature: FeatureRequirementItem) => void;
  setIntegrations: (integrations: string[]) => void;
  setScaleDetails: (scale: Partial<DesignStudioSessionState["scaleDetails"]>) => void;
  setScaleRequirements: (scale: any) => void;
  setSpecification: (spec: Partial<RequirementSpecification>) => void;
  confirmSpecification: () => void;
  // Chapter 3 setters
  setSelectedPlanId: (planId: string) => void;
  setSelectedPlan: (planId: string, planName?: string, planPrice?: number | string) => void;
  toggleAddon: (addonId: string) => void;
  setConfiguredFeatures: (cfg: any) => void;
  evaluateRecommendation: () => Promise<void>;
  // Chapter 4 setters
  setPreferences: (pref: Partial<DesignPreferencesData>) => void;
  setDesignPreferences: (pref: Partial<DesignPreferencesData>) => void;
  // Execution
  generateDemo: () => Promise<void>;
  approveDesignVersion: (versionNumber: number) => void;
  submitProjectEnquiry: (notes?: string) => Promise<{ success: boolean; enquiryId?: string; error?: string }>;
  resetSession: () => void;
}

const defaultAccount: UserAccountData = {
  fullName: "",
  email: "",
  isAuthenticated: false,
};

const defaultProfile: ProfileContactData = {
  fullName: "",
  countryCode: "+91",
  mobileNumber: "",
  companyName: "",
  projectType: "business",
  websiteUrl: "",
  preferredContactMethod: "whatsapp",
};

const defaultPreferences: DesignPreferencesData = {
  productName: "",
  brandName: "",
  primaryColor: "#00D9FF",
  secondaryColor: "#087BFF",
  accentColor: "#E52BFF",
  typography: "Plus Jakarta Sans",
  designStyle: "premium",
  appearance: "dark",
  brandPersonality: "High-trust, futuristic, cinematic and ultra-fluid enterprise software",
};

const defaultSpec: RequirementSpecification = {
  projectObjective: "",
  coreProblem: "",
  primaryUsers: ["Customers", "Administrators"],
  userRoles: [
    { role: "Customer", description: "Direct customer interactions and portal", separateDashboard: false },
    { role: "Administrator", description: "Operations, order management and CRM controls", separateDashboard: true },
  ],
  targetPlatforms: ["Web Responsive (Desktop & Mobile)"],
  requiredFeatures: [],
  integrations: ["Payment Gateway Switch", "Instant WhatsApp Direct Notification"],
  scaleAssumptions: {
    expectedUsers: "Up to 10,000 MAU",
    transactionVolume: "High concurrency transactions",
    dataSensitivity: "sensitive_pii",
    slaExpectation: "priority_24h",
  },
};

const DesignStudioContext = createContext<DesignStudioContextType | null>(null);

export function DesignStudioProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  // Initial params
  const paramDivision = searchParams.get("division") || "starx-web";
  const paramIndustry = searchParams.get("industry") || "retail-commerce";
  const paramPlan = searchParams.get("plan");
  const paramSessionId = searchParams.get("session") || `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const [state, setState] = useState<DesignStudioSessionState>(() => {
    const normalizedDiv = normalizeDivisionSlug(paramDivision);
    const defaultPlan = paramPlan ? (getPlanById(paramPlan) || getDefaultPlanForDivision(normalizedDiv)) : getDefaultPlanForDivision(normalizedDiv);

    return {
      sessionId: paramSessionId,
      currentStep: 1,
      completedSteps: [],
      isRestoring: true,
      account: { ...defaultAccount },
      profile: { ...defaultProfile },
      divisionSlug: normalizedDiv,
      supportingDivisions: [],
      industrySlug: paramIndustry,
      solutionSlug: "custom-web-platform",
      solutionName: "Custom Web Platform & Portal",
      platforms: ["Web Desktop", "Mobile Responsive"],
      rawDescription: "",
      ideaStartersUsed: [],
      userRoles: ["Customers", "Administrators"],
      selectedFeatures: [],
      selectedIntegrations: ["Payment Gateway Switch", "WhatsApp Lead Alert"],
      scaleDetails: {
        expectedUsers: "Up to 5,000 MAU",
        transactionVolume: "Standard transaction flow",
        dataSensitivity: "internal",
        slaLevel: "priority_24h",
      },
      specification: { ...defaultSpec },
      isSpecConfirmed: false,
      selectedPlanId: defaultPlan.id,
      selectedPlanVersion: "v1.0",
      selectedAddonIds: ["addon-seo-mastery"],
      featureCustomizations: {},
      calculatedPriceINR: defaultPlan.priceINR,
      calculatedPriceUSD: defaultPlan.priceUSD,
      preferences: { ...defaultPreferences },
      isGenerating: false,
      generationStage: "idle",
      generationProgress: 0,
      artifactsHistory: [],
      isApproved: false,
      enquirySubmitted: false,

      // Aliases
      primaryDivision: normalizedDiv,
      industry: paramIndustry,
      solutionCategory: "custom-web-platform",
      ideaDescription: "",
      featureRequirements: [],
      integrations: ["Payment Gateway Switch", "WhatsApp Lead Alert"],
      scaleRequirements: {
        expectedUsers: "growth",
        concurrency: "standard",
        dataSensitivity: "standard",
        availabilitySla: "99.99",
      },
      requirementSpecification: { ...defaultSpec, isConfirmed: false },
      selectedPlanName: defaultPlan.name,
      selectedPlanPrice: defaultPlan.priceINR,
      configuredFeatures: {
        included: [],
        addons: ["addon-seo-mastery"],
        upgrades: [],
        custom: [],
      },
      designPreferences: { ...defaultPreferences },
      sessionToken: paramSessionId,
    };
  });

  // Calculate chapter from current step
  const currentChapter: OnboardingChapter = useMemo(() => {
    if (state.currentStep <= 4) return 1;
    if (state.currentStep <= 12) return 2;
    if (state.currentStep <= 14) return 3;
    return 4;
  }, [state.currentStep]);

  // Check Supabase authentication status on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const user = session.user;
          const userMeta = user.user_metadata || {};
          const fullName = userMeta.full_name || userMeta.name || user.email?.split("@")[0] || "Founding Partner";

          setState((prev) => ({
            ...prev,
            account: {
              userId: user.id,
              fullName,
              email: user.email || "",
              isAuthenticated: true,
            },
            profile: {
              ...prev.profile,
              fullName: prev.profile.fullName || fullName,
            },
          }));
        }
      } catch (err) {
        console.warn("[DesignStudio] Auth check skipped:", err);
      }
    }
    checkAuth();
  }, [supabase]);

  // Restore saved session from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setState((prev) => ({
            ...prev,
            ...parsed,
            isRestoring: false,
            // Ensure step is within valid 1-16 bounds
            currentStep: (parsed.currentStep >= 1 && parsed.currentStep <= 16) ? parsed.currentStep : prev.currentStep,
            // Preserve active auth if available
            account: prev.account.isAuthenticated ? prev.account : (parsed.account || prev.account),
          }));
          return;
        }
      }
    } catch (e) {
      console.warn("[DesignStudio] Restore session error:", e);
    }
    setState((prev) => ({ ...prev, isRestoring: false }));
  }, []);

  // Autosave to localStorage on meaningful state changes
  useEffect(() => {
    if (state.isRestoring || typeof window === "undefined") return;
    try {
      const toPersist = {
        sessionId: state.sessionId,
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
        account: {
          fullName: state.account.fullName,
          email: state.account.email,
          isAuthenticated: state.account.isAuthenticated,
          userId: state.account.userId,
        },
        profile: state.profile,
        divisionSlug: state.divisionSlug,
        industrySlug: state.industrySlug,
        solutionSlug: state.solutionSlug,
        solutionName: state.solutionName,
        platforms: state.platforms,
        rawDescription: state.rawDescription,
        userRoles: state.userRoles,
        selectedFeatures: state.selectedFeatures,
        selectedIntegrations: state.selectedIntegrations,
        scaleDetails: state.scaleDetails,
        specification: state.specification,
        isSpecConfirmed: state.isSpecConfirmed,
        selectedPlanId: state.selectedPlanId,
        selectedAddonIds: state.selectedAddonIds,
        preferences: state.preferences,
        activeArtifact: state.activeArtifact,
        artifactsHistory: state.artifactsHistory,
        isApproved: state.isApproved,
        approvedVersion: state.approvedVersion,
        enquirySubmitted: state.enquirySubmitted,
        enquiryId: state.enquiryId,
        lastSavedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist));
    } catch (e) {
      console.warn("[DesignStudio] Autosave failed:", e);
    }
  }, [state]);

  // Recalculate recommendation and pricing when inputs change
  useEffect(() => {
    try {
      const complexity = calculateComplexityScore({
        divisionSlug: state.divisionSlug,
        platforms: state.platforms,
        selectedFeatures: state.selectedFeatures.map((f) => f.name),
        rawDescription: state.rawDescription,
      });

      const rec = recommendPlan({
        divisionSlug: state.divisionSlug,
        industrySlug: state.industrySlug,
        platforms: state.platforms,
        selectedFeatures: state.selectedFeatures.map((f) => f.name),
        complexityScore: complexity.score,
        complexityFactors: complexity.factors,
        rawDescription: state.rawDescription,
      });

      const currentPlan = getPlanById(state.selectedPlanId) || rec.recommendedPlan;
      let totalINR = currentPlan.priceINR;
      let totalUSD = currentPlan.priceUSD;

      state.selectedAddonIds.forEach((addonId) => {
        const addon = GLOBAL_PLAN_ADDONS.find((a) => a.id === addonId);
        if (addon) {
          totalINR += addon.priceINR;
          totalUSD += addon.priceUSD;
        }
      });

      setState((prev) => ({
        ...prev,
        recommendationResult: rec,
        calculatedPriceINR: totalINR,
        calculatedPriceUSD: totalUSD,
      }));
    } catch (err) {
      console.warn("[DesignStudio] Recommendation evaluation note:", err);
    }
  }, [
    state.divisionSlug,
    state.industrySlug,
    state.platforms,
    state.selectedFeatures,
    state.rawDescription,
    state.selectedPlanId,
    state.selectedAddonIds,
  ]);

  // Step Validation logic: can the user advance from current step?
  const canAdvance = useMemo(() => {
    switch (state.currentStep) {
      case 1:
        // Must have email and name (authenticated or guest proceed)
        return Boolean(state.account.email && state.account.fullName);
      case 2:
        // Must have mobile number and valid full name
        return Boolean(state.profile.mobileNumber.length >= 7 && state.profile.fullName);
      case 3:
        return Boolean(state.divisionSlug);
      case 4:
        return Boolean(state.industrySlug);
      case 5:
        return Boolean(state.solutionSlug);
      case 6:
        return state.platforms.length > 0;
      case 7:
        return state.rawDescription.trim().length >= 10;
      case 8:
        return state.userRoles.length > 0;
      case 9:
        return state.selectedFeatures.length >= 1;
      case 10:
        return state.selectedIntegrations.length > 0;
      case 11:
        return Boolean(state.scaleDetails.expectedUsers);
      case 12:
        return state.isSpecConfirmed;
      case 13:
        return Boolean(state.selectedPlanId);
      case 14:
        return true; // Optional addons configuration
      case 15:
        return Boolean(state.preferences.productName || state.preferences.brandName);
      case 16:
        return Boolean(state.activeArtifact);
      default:
        return true;
    }
  }, [state]);

  // Step Navigation
  const goToStep = useCallback((step: OnboardingStep) => {
    setState((prev) => {
      const completed = new Set(prev.completedSteps);
      if (step > prev.currentStep) {
        completed.add(prev.currentStep);
      }
      return {
        ...prev,
        currentStep: step,
        completedSteps: Array.from(completed),
      };
    });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const nextStep = useCallback((): boolean => {
    if (state.currentStep >= 16) return false;
    const target = (state.currentStep + 1) as OnboardingStep;
    goToStep(target);
    return true;
  }, [state.currentStep, goToStep]);

  const prevStep = useCallback(() => {
    if (state.currentStep <= 1) return;
    const target = (state.currentStep - 1) as OnboardingStep;
    goToStep(target);
  }, [state.currentStep, goToStep]);

  // Setters
  const setAccount = useCallback((data: Partial<UserAccountData>) => {
    setState((prev) => ({
      ...prev,
      account: { ...prev.account, ...data },
      profile: {
        ...prev.profile,
        fullName: data.fullName || prev.profile.fullName,
      },
    }));
  }, []);

  const setProfile = useCallback((data: Partial<ProfileContactData>) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...data },
    }));
  }, []);

  const setDivision = useCallback((divSlug: string, supporting: string[] = []) => {
    const normalized = normalizeDivisionSlug(divSlug);
    setState((prev) => {
      const defaultPlan = getDefaultPlanForDivision(normalized);
      return {
        ...prev,
        divisionSlug: normalized,
        primaryDivision: normalized,
        supportingDivisions: supporting as any,
        selectedPlanId: defaultPlan.id,
        selectedPlanName: defaultPlan.name,
        selectedPlanPrice: defaultPlan.priceINR,
      };
    });
  }, []);

  const setIndustry = useCallback((industrySlug: string) => {
    setState((prev) => ({ ...prev, industrySlug, industry: industrySlug }));
  }, []);

  const setSolution = useCallback((solutionSlug: string, solutionName: string) => {
    setState((prev) => ({ ...prev, solutionSlug, solutionName, solutionCategory: solutionSlug }));
  }, []);

  const setPlatforms = useCallback((platforms: string[]) => {
    setState((prev) => ({ ...prev, platforms }));
  }, []);

  const setRawDescription = useCallback((rawDescription: string) => {
    setState((prev) => ({ ...prev, rawDescription, ideaDescription: rawDescription }));
  }, []);

  const setIdeaDescription = useCallback((desc: string) => {
    setState((prev) => ({ ...prev, rawDescription: desc, ideaDescription: desc }));
  }, []);

  const toggleIdeaStarter = useCallback((starter: string) => {
    setState((prev) => {
      const current = prev.rawDescription;
      const updated = current ? `${current}\n• ${starter}` : starter;
      const used = prev.ideaStartersUsed.includes(starter)
        ? prev.ideaStartersUsed
        : [...prev.ideaStartersUsed, starter];
      return { ...prev, rawDescription: updated, ideaDescription: updated, ideaStartersUsed: used };
    });
  }, []);

  const setUserRoles = useCallback((userRoles: string[]) => {
    setState((prev) => ({ ...prev, userRoles }));
  }, []);

  const setSelectedFeatures = useCallback((selectedFeatures: FeatureRequirementItem[]) => {
    setState((prev) => ({ ...prev, selectedFeatures }));
  }, []);

  const setFeatureRequirements = useCallback((features: any[]) => {
    setState((prev) => ({
      ...prev,
      featureRequirements: features,
      selectedFeatures: features.map((f) => ({
        id: f.featureId || f.id,
        name: f.name,
        category: f.category || "core",
        priority: f.priority || "must_have",
      })),
    }));
  }, []);

  const toggleFeature = useCallback((feature: FeatureRequirementItem) => {
    setState((prev) => {
      const exists = prev.selectedFeatures.some((f) => f.id === feature.id);
      const updated = exists
        ? prev.selectedFeatures.filter((f) => f.id !== feature.id)
        : [...prev.selectedFeatures, feature];
      return { ...prev, selectedFeatures: updated };
    });
  }, []);

  const setIntegrations = useCallback((selectedIntegrations: string[]) => {
    setState((prev) => ({ ...prev, selectedIntegrations, integrations: selectedIntegrations }));
  }, []);

  const setScaleDetails = useCallback((details: Partial<DesignStudioSessionState["scaleDetails"]>) => {
    setState((prev) => ({
      ...prev,
      scaleDetails: { ...prev.scaleDetails, ...details },
    }));
  }, []);

  const setScaleRequirements = useCallback((scale: any) => {
    setState((prev) => ({
      ...prev,
      scaleRequirements: scale,
      scaleDetails: {
        ...prev.scaleDetails,
        expectedUsers: scale.expectedUsers || prev.scaleDetails.expectedUsers,
        transactionVolume: scale.concurrency || prev.scaleDetails.transactionVolume,
      },
    }));
  }, []);

  const setSpecification = useCallback((spec: Partial<RequirementSpecification>) => {
    setState((prev) => ({
      ...prev,
      specification: { ...prev.specification, ...spec },
      requirementSpecification: { ...prev.requirementSpecification, ...spec },
    }));
  }, []);

  const confirmSpecification = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isSpecConfirmed: true,
      specification: {
        ...prev.specification,
        confirmedAt: new Date().toISOString(),
      },
      requirementSpecification: {
        ...prev.requirementSpecification,
        isConfirmed: true,
        confirmedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const setSelectedPlanId = useCallback((selectedPlanId: string) => {
    setState((prev) => ({ ...prev, selectedPlanId }));
  }, []);

  const setSelectedPlan = useCallback((planId: string, planName?: string, planPrice?: number | string) => {
    setState((prev) => ({
      ...prev,
      selectedPlanId: planId,
      selectedPlanName: planName || planId,
      selectedPlanPrice: planPrice,
    }));
  }, []);

  const toggleAddon = useCallback((addonId: string) => {
    setState((prev) => {
      const exists = prev.selectedAddonIds.includes(addonId);
      const updated = exists
        ? prev.selectedAddonIds.filter((id) => id !== addonId)
        : [...prev.selectedAddonIds, addonId];
      return { ...prev, selectedAddonIds: updated };
    });
  }, []);

  const setConfiguredFeatures = useCallback((cfg: any) => {
    setState((prev) => ({ ...prev, configuredFeatures: cfg }));
  }, []);

  const setPreferences = useCallback((pref: Partial<DesignPreferencesData>) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...pref },
      designPreferences: { ...prev.designPreferences, ...pref } as any,
    }));
  }, []);

  const setDesignPreferences = useCallback((pref: Partial<DesignPreferencesData>) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...pref },
      designPreferences: { ...prev.designPreferences, ...pref } as any,
    }));
  }, []);

  const evaluateRecommendation = useCallback(async () => {
    try {
      const complexity = calculateComplexityScore({
        divisionSlug: state.divisionSlug,
        platforms: state.platforms,
        selectedFeatures: state.selectedFeatures.map((f) => f.name),
        rawDescription: state.rawDescription,
      });

      const rec = recommendPlan({
        divisionSlug: state.divisionSlug,
        industrySlug: state.industrySlug,
        platforms: state.platforms,
        selectedFeatures: state.selectedFeatures.map((f) => f.name),
        complexityScore: complexity.score,
        complexityFactors: complexity.factors,
        rawDescription: state.rawDescription,
      });

      setState((prev) => ({
        ...prev,
        recommendationResult: {
          recommendedPlanId: rec.recommendedPlan.id,
          recommendedPlanName: rec.recommendedPlan.name,
          matchScore: rec.matchConfidence / 100,
          reasoning: [rec.justification, ...rec.keyMatches],
          eligiblePlanIds: [rec.recommendedPlan.id, ...rec.alternativePlans.map((p) => p.id)],
          unmatchedRequirements: rec.upgradeReasons,
          ...rec,
        },
        selectedPlanId: rec.recommendedPlan.id,
        selectedPlanName: rec.recommendedPlan.name,
        selectedPlanPrice: rec.recommendedPlan.priceUSD || rec.recommendedPlan.priceINR,
      }));
    } catch (e) {
      console.warn("[DesignStudio] Recommendation evaluation fallback:", e);
    }
  }, [state.divisionSlug, state.platforms, state.selectedFeatures, state.rawDescription]);

  // Execution: Generate Stitch Demo
  const generateDemo = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isGenerating: true,
      generationStage: "Preparing architectural blueprint...",
      generationProgress: 15,
      generationError: undefined,
    }));

    try {
      // Step A: Create or update project in backend
      const projectPayload = {
        title: state.preferences.productName || state.preferences.brandName || "StarX Digital Solution",
        industrySlug: state.industrySlug,
        divisionSlug: state.divisionSlug,
        targetPlatforms: state.platforms,
        featureRequirements: state.selectedFeatures.map((f) => f.name),
        themePreference: state.preferences.designStyle,
        rawDescription: state.rawDescription,
        contactName: state.profile.fullName || state.account.fullName,
        contactEmail: state.account.email,
        contactPhone: `${state.profile.countryCode} ${state.profile.mobileNumber}`.trim(),
        structuredBrief: {
          solutionName: state.solutionName,
          userRoles: state.userRoles,
          selectedIntegrations: state.selectedIntegrations,
          scaleDetails: state.scaleDetails,
          selectedPlanId: state.selectedPlanId,
          selectedAddonIds: state.selectedAddonIds,
          preferences: state.preferences,
        },
      };

      const projectRes = await fetch("/api/design-studio/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectPayload),
      });

      const projectData = await projectRes.json();
      const projectId = projectData?.project?.id || `dsp_${Date.now()}`;

      setState((prev) => ({
        ...prev,
        projectId,
        generationStage: "Dispatching Google Stitch AI generation...",
        generationProgress: 45,
      }));

      // Step B: Dispatch Stitch Generation Job
      const jobPayload = {
        projectId,
        brief: {
          industrySlug: state.industrySlug,
          industryName: state.industrySlug.replace(/-/g, " ").toUpperCase(),
          divisionSlug: state.divisionSlug,
          divisionName: state.divisionSlug.replace(/-/g, " ").toUpperCase(),
          projectName: projectPayload.title,
          description: state.rawDescription,
          platformTargets: state.platforms,
          selectedFeatures: state.selectedFeatures.map((f) => f.name),
          themePreference: state.preferences.designStyle,
          deviceTarget: "DESKTOP",
          modelPreference: "GEMINI_3_8_FLASH",
        },
        modelId: "GEMINI_3_8_FLASH",
        deviceType: "DESKTOP",
      };

      const jobRes = await fetch("/api/design-studio/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobPayload),
      });

      const jobData = await jobRes.json();

      if (!jobRes.ok || !jobData.success) {
        throw new Error(jobData.error || "Generation job failed to initialize");
      }

      setState((prev) => ({
        ...prev,
        generationStage: "Synthesizing responsive components & typography...",
        generationProgress: 80,
      }));

      // Artifact result from jobData
      const artifact = jobData.artifact || {
        id: `art_${Date.now()}`,
        projectId,
        versionNumber: (state.artifactsHistory?.length || 0) + 1,
        title: projectPayload.title,
        deviceType: "DESKTOP",
        provider: "stitch",
        providerProjectId: jobData.job?.providerProjectId || "stitch_proj_default",
        htmlCode: jobData.artifact?.htmlCode || `<!DOCTYPE html><html><head><title>${projectPayload.title}</title><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-slate-950 text-white min-h-screen flex items-center justify-center"><div class="p-8 text-center max-w-xl border border-cyan-500/30 rounded-2xl bg-slate-900/80 shadow-2xl"><h1 class="text-3xl font-extrabold text-cyan-400 mb-4">${projectPayload.title}</h1><p class="text-slate-300 text-sm leading-relaxed mb-6">${state.rawDescription.slice(0, 200)}...</p><div class="flex gap-2 justify-center"><span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-mono">${state.divisionSlug}</span><span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-mono">${state.industrySlug}</span></div></div></body></html>`,
        isApproved: false,
        createdAt: new Date().toISOString(),
      };

      setState((prev) => ({
        ...prev,
        isGenerating: false,
        generationStage: "Demo ready!",
        generationProgress: 100,
        activeArtifact: artifact,
        artifactsHistory: [artifact, ...(prev.artifactsHistory || [])],
        currentStep: 16,
      }));
    } catch (err: any) {
      console.error("[DesignStudio] Generation error:", err);
      setState((prev) => ({
        ...prev,
        isGenerating: false,
        generationStage: "error",
        generationError: err.message || "Stitch generation encountered an error. Please retry.",
      }));
    }
  }, [state]);

  const approveDesignVersion = useCallback((versionNumber: number) => {
    setState((prev) => ({
      ...prev,
      isApproved: true,
      approvedVersion: versionNumber,
      activeArtifact: prev.activeArtifact
        ? { ...prev.activeArtifact, isApproved: true }
        : prev.activeArtifact,
    }));
  }, []);

  const submitProjectEnquiry = useCallback(async (notes?: string) => {
    try {
      const enquiryPayload = {
        sessionId: state.sessionId,
        projectId: state.projectId,
        customerName: state.profile.fullName || state.account.fullName,
        customerEmail: state.account.email,
        customerPhone: `${state.profile.countryCode} ${state.profile.mobileNumber}`.trim(),
        customerCompany: state.profile.companyName || "",
        divisionSlug: state.divisionSlug,
        industrySlug: state.industrySlug,
        selectedPlanId: state.selectedPlanId,
        selectedAddons: state.selectedAddonIds,
        estimatedTotalINR: state.calculatedPriceINR,
        approvedArtifactId: state.activeArtifact?.id,
        approvedVersion: state.approvedVersion || 1,
        notes: notes || `Generated via Design Studio 2.0 with Stitch Artifact (${state.activeArtifact?.id})`,
      };

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: enquiryPayload.customerName,
          email: enquiryPayload.customerEmail,
          phone: enquiryPayload.customerPhone,
          company: enquiryPayload.customerCompany,
          serviceSlug: enquiryPayload.divisionSlug,
          budgetRange: `₹${state.calculatedPriceINR.toLocaleString("en-IN")}`,
          timeline: "3–4 Weeks",
          projectDetails: enquiryPayload.notes,
          metadata: {
            ...enquiryPayload,
            isDesignStudioHandoff: true,
          },
        }),
      });

      const data = await res.json();
      const enquiryId = data?.referenceCode || data?.quoteRequest?.id || `STX-ENQ-${Date.now().toString().slice(-6)}`;

      setState((prev) => ({
        ...prev,
        enquirySubmitted: true,
        enquiryId,
        enquirySubmittedAt: new Date().toISOString(),
      }));

      return { success: true, enquiryId };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to submit enquiry" };
    }
  }, [state]);

  const resetSession = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    const newSessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setState({
      sessionId: newSessionId,
      currentStep: 1,
      completedSteps: [],
      isRestoring: false,
      account: { ...defaultAccount },
      profile: { ...defaultProfile },
      divisionSlug: "starx-web",
      supportingDivisions: [],
      industrySlug: "retail-commerce",
      solutionSlug: "custom-web-platform",
      solutionName: "Custom Web Platform & Portal",
      platforms: ["Web Desktop", "Mobile Responsive"],
      rawDescription: "",
      ideaStartersUsed: [],
      userRoles: ["Customers", "Administrators"],
      selectedFeatures: [],
      selectedIntegrations: ["Payment Gateway Switch", "WhatsApp Lead Alert"],
      scaleDetails: {
        expectedUsers: "Up to 5,000 MAU",
        transactionVolume: "Standard transaction flow",
        dataSensitivity: "internal",
        slaLevel: "priority_24h",
      },
      specification: { ...defaultSpec },
      isSpecConfirmed: false,
      selectedPlanId: "web-starter",
      selectedPlanVersion: "v1.0",
      selectedAddonIds: ["addon-seo-mastery"],
      featureCustomizations: {},
      calculatedPriceINR: 14999,
      calculatedPriceUSD: 220,
      preferences: { ...defaultPreferences },
      isGenerating: false,
      generationStage: "idle",
      generationProgress: 0,
      artifactsHistory: [],
      isApproved: false,
      enquirySubmitted: false,
      primaryDivision: "starx-web",
      industry: "retail-commerce",
      solutionCategory: "custom-web-platform",
      ideaDescription: "",
      featureRequirements: [],
      integrations: ["Payment Gateway Switch", "WhatsApp Lead Alert"],
      scaleRequirements: {
        expectedUsers: "growth",
        concurrency: "standard",
        dataSensitivity: "standard",
        availabilitySla: "99.99",
      },
      requirementSpecification: { ...defaultSpec, isConfirmed: false },
      selectedPlanName: "Web Starter",
      selectedPlanPrice: 220,
      configuredFeatures: {
        included: [],
        addons: ["addon-seo-mastery"],
        upgrades: [],
        custom: [],
      },
      designPreferences: { ...defaultPreferences },
      sessionToken: newSessionId,
    });
  }, []);

  const value = useMemo(
    () => ({
      state,
      currentChapter,
      goToStep,
      nextStep,
      prevStep,
      canAdvance,
      setAccount,
      setProfile,
      setDivision,
      setIndustry,
      setSolution,
      setPlatforms,
      setRawDescription,
      setIdeaDescription,
      toggleIdeaStarter,
      setUserRoles,
      setSelectedFeatures,
      setFeatureRequirements,
      toggleFeature,
      setIntegrations,
      setScaleDetails,
      setScaleRequirements,
      setSpecification,
      confirmSpecification,
      setSelectedPlanId,
      setSelectedPlan,
      toggleAddon,
      setConfiguredFeatures,
      setPreferences,
      setDesignPreferences,
      evaluateRecommendation,
      generateDemo,
      approveDesignVersion,
      submitProjectEnquiry,
      resetSession,
    }),
    [
      state,
      currentChapter,
      goToStep,
      nextStep,
      prevStep,
      canAdvance,
      setAccount,
      setProfile,
      setDivision,
      setIndustry,
      setSolution,
      setPlatforms,
      setRawDescription,
      setIdeaDescription,
      toggleIdeaStarter,
      setUserRoles,
      setSelectedFeatures,
      setFeatureRequirements,
      toggleFeature,
      setIntegrations,
      setScaleDetails,
      setScaleRequirements,
      setSpecification,
      confirmSpecification,
      setSelectedPlanId,
      setSelectedPlan,
      toggleAddon,
      setConfiguredFeatures,
      setPreferences,
      setDesignPreferences,
      evaluateRecommendation,
      generateDemo,
      approveDesignVersion,
      submitProjectEnquiry,
      resetSession,
    ]
  );

  return (
    <DesignStudioContext.Provider value={value}>
      {children}
    </DesignStudioContext.Provider>
  );
}

export function useDesignStudio() {
  const context = useContext(DesignStudioContext);
  if (!context) {
    throw new Error("useDesignStudio must be used within a DesignStudioProvider");
  }
  return context;
}
