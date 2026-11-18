import type { CanonicalPlan, PlanAddon, PlanDivisionSlug } from "@/types/plans";
import type { StitchDeviceType, StitchModelId, DesignArtifact, DesignStudioProject } from "@/lib/stitch/types";

export type OnboardingChapter = 1 | 2 | 3 | 4;
export type OnboardingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

export type DivisionSlug = PlanDivisionSlug;
export type IndustrySlug = string;
export type DesignPreferences = DesignPreferencesData;

export interface FeatureRequirement {
  featureId: string;
  name: string;
  priority: "must_have" | "important" | "nice_to_have";
  category?: string;
}

export type { CanonicalPlan, PlanAddon, PlanDivisionSlug };

export interface ChapterMeta {
  chapter: OnboardingChapter;
  title: string;
  subtitle: string;
  steps: OnboardingStep[];
}

export const ONBOARDING_CHAPTERS: ChapterMeta[] = [
  {
    chapter: 1,
    title: "Chapter 1: Get Started",
    subtitle: "Account, Profile & Division",
    steps: [1, 2, 3, 4],
  },
  {
    chapter: 2,
    title: "Chapter 2: Understand Your Idea",
    subtitle: "Scope, Features & Requirements",
    steps: [5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    chapter: 3,
    title: "Chapter 3: Define Your Solution",
    subtitle: "Plan Recommendation & Scope Configuration",
    steps: [13, 14],
  },
  {
    chapter: 4,
    title: "Chapter 4: Create Your Design",
    subtitle: "Personalisation & Stitch Demo Generation",
    steps: [15, 16],
  },
];

export interface StepMeta {
  step: OnboardingStep;
  chapter: OnboardingChapter;
  title: string;
  heading: string;
  subtitle: string;
}

export const STEP_DEFINITIONS: Record<OnboardingStep, StepMeta> = {
  1: {
    step: 1,
    chapter: 1,
    title: "Create Account",
    heading: "Let's Build Something Amazing.",
    subtitle: "Create your StarX account to start designing your next digital solution.",
  },
  2: {
    step: 2,
    chapter: 1,
    title: "Your Profile",
    heading: "Tell Us a Little About Yourself.",
    subtitle: "Your profile helps us personalize your solution and project correspondence.",
  },
  3: {
    step: 3,
    chapter: 1,
    title: "StarX Division",
    heading: "What Would You Like to Build?",
    subtitle: "Select the primary StarX engineering division that matches your digital solution.",
  },
  4: {
    step: 4,
    chapter: 1,
    title: "Select Industry",
    heading: "Which Industry Are You Building For?",
    subtitle: "Tailor the architectural patterns, security controls, and workflow templates to your domain.",
  },
  5: {
    step: 5,
    chapter: 2,
    title: "Choose Solution",
    heading: "What Are We Creating Together?",
    subtitle: "Select the concrete solution archetype optimized for your industry and target market.",
  },
  6: {
    step: 6,
    chapter: 2,
    title: "Select Platforms",
    heading: "Where Should Your Solution Work?",
    subtitle: "Choose the target device runtimes and operating systems for your product.",
  },
  7: {
    step: 7,
    chapter: 2,
    title: "Tell Us Your Idea",
    heading: "Tell Us What You Have in Mind.",
    subtitle: "Describe your solution in plain language. What core problem does it solve?",
  },
  8: {
    step: 8,
    chapter: 2,
    title: "Who Will Use It?",
    heading: "Who Is This Solution For?",
    subtitle: "Identify your user personas, operational roles, and permission requirements.",
  },
  9: {
    step: 9,
    chapter: 2,
    title: "Choose Features",
    heading: "What Should Your Solution Be Able to Do?",
    subtitle: "Select and prioritize architectural capabilities from our modular catalogue.",
  },
  10: {
    step: 10,
    chapter: 2,
    title: "Workflows & APIs",
    heading: "How Should Everything Work Together?",
    subtitle: "Specify critical user journeys, third-party APIs, payment switches, and integrations.",
  },
  11: {
    step: 11,
    chapter: 2,
    title: "Project Scale",
    heading: "Let's Understand the Scale of Your Project.",
    subtitle: "Define expected traffic volume, data sensitivity, and mission-critical availability guarantees.",
  },
  12: {
    step: 12,
    chapter: 2,
    title: "AI Confirmation",
    heading: "Let's Make Sure We Understand Your Idea.",
    subtitle: "Review your structured requirement specification and confirm technical assumptions before plan selection.",
  },
  13: {
    step: 13,
    chapter: 3,
    title: "Plan Selection",
    heading: "We've Understood Your Idea. Let's Find the Right Plan.",
    subtitle: "Explore deterministic plan recommendations matched to your architectural scope with transparent pricing.",
  },
  14: {
    step: 14,
    chapter: 3,
    title: "Configure Features",
    heading: "Make Your Plan Your Own.",
    subtitle: "Configure included deliverables, modular add-ons, and review your clear commercial boundary.",
  },
  15: {
    step: 15,
    chapter: 4,
    title: "Personalise Design",
    heading: "Let's Give Your Idea an Identity.",
    subtitle: "Set your product identity, brand color palette, typography, and visual interface aesthetic.",
  },
  16: {
    step: 16,
    chapter: 4,
    title: "Generate Demo",
    heading: "Everything Is Coming Together.",
    subtitle: "Review your comprehensive blueprint and generate your personalized Google Stitch interactive demo.",
  },
};

export interface UserAccountData {
  userId?: string;
  fullName: string;
  email: string;
  password?: string;
  isAuthenticated: boolean;
  isGuestFallback?: boolean;
}

export interface ProfileContactData {
  fullName: string;
  countryCode: string;
  mobileNumber: string;
  companyName: string;
  projectType: "business" | "startup" | "personal" | "enterprise" | "other";
  websiteUrl?: string;
  preferredContactMethod: "whatsapp" | "call" | "email";
}

export interface FeatureRequirementItem {
  id: string;
  name: string;
  category: "core" | "ux" | "security" | "integration" | "ai" | "analytics";
  priority: "must_have" | "important" | "nice_to_have";
  isCustom?: boolean;
}

export interface RequirementSpecification {
  projectObjective: string;
  coreProblem: string;
  primaryUsers: string[];
  userRoles: Array<{ role: string; description: string; separateDashboard: boolean }>;
  targetPlatforms: string[];
  requiredFeatures: FeatureRequirementItem[];
  integrations: string[];
  scaleAssumptions: {
    expectedUsers: string;
    transactionVolume: string;
    dataSensitivity: "public" | "internal" | "sensitive_pii" | "regulated_financial";
    slaExpectation: "standard_48h" | "priority_24h" | "mission_critical_2h";
  };
  confirmedAt?: string;
}

export interface DesignPreferencesData {
  productName: string;
  brandName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  typography: string;
  designStyle: "minimal" | "premium" | "modern" | "corporate" | "bold" | "futuristic" | "playful" | "elegant";
  appearance: "dark" | "light" | "system";
  brandPersonality: string;
  referenceUrl?: string;
  visualStyle?: string;
  theme?: "dark" | "light" | "system";
}

export interface DesignStudioSessionState {
  // Session metadata
  sessionId: string;
  projectId?: string;
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  isRestoring: boolean;
  lastSavedAt?: string;

  // Chapter 1: Get Started
  account: UserAccountData;
  profile: ProfileContactData;
  divisionSlug: PlanDivisionSlug;
  supportingDivisions: PlanDivisionSlug[];
  industrySlug: string;

  // Chapter 2: Understand Your Idea
  solutionSlug: string;
  solutionName: string;
  platforms: string[];
  rawDescription: string;
  ideaStartersUsed: string[];
  userRoles: string[];
  userPermissionsNote?: string;
  selectedFeatures: FeatureRequirementItem[];
  selectedIntegrations: string[];
  scaleDetails: {
    expectedUsers: string;
    transactionVolume: string;
    dataSensitivity: "public" | "internal" | "sensitive_pii" | "regulated_financial";
    slaLevel: "standard_48h" | "priority_24h" | "mission_critical_2h";
  };
  specification: RequirementSpecification;
  isSpecConfirmed: boolean;

  // Chapter 3: Define Your Solution
  selectedPlanId: string;
  selectedPlanVersion: string;
  recommendationResult?: any;
  selectedAddonIds: string[];
  featureCustomizations: Record<string, "included" | "addon" | "upgrade" | "custom">;
  calculatedPriceINR: number;
  calculatedPriceUSD: number;

  // Chapter 4: Create Your Design
  preferences: DesignPreferencesData;
  generatedBlueprint?: any;

  // Generation & Demo Workspace
  isGenerating: boolean;
  generationStage: string;
  generationProgress: number;
  generationError?: string;
  activeArtifact?: DesignArtifact;
  artifactsHistory: DesignArtifact[];
  activeProject?: DesignStudioProject;
  isApproved: boolean;
  approvedVersion?: number;

  // Enquiry Submission
  enquirySubmitted: boolean;
  enquiryId?: string;
  enquirySubmittedAt?: string;

  // Aliases for clean step access
  primaryDivision: PlanDivisionSlug;
  industry: string;
  solutionCategory: string;
  ideaDescription: string;
  featureRequirements: FeatureRequirement[];
  integrations: string[];
  scaleRequirements: any;
  requirementSpecification: any;
  selectedPlanName?: string;
  selectedPlanPrice?: number | string;
  configuredFeatures: {
    included: string[];
    addons: string[];
    upgrades: string[];
    custom: string[];
  };
  designPreferences: DesignPreferencesData;
  generationJob?: any;
  sessionToken?: string;
}
