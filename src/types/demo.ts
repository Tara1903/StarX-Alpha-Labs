export type DemoAvailabilityStatus = "Live Demo" | "Coming Soon" | "Under Development" | "Planned" | "Offline Ready";
export type DemoPlatform = "Website" | "Web App" | "Mobile App";
export type DemoDevType = "Web App" | "Mobile App" | "Website" | "Cloud ERP" | "AI Microservice" | "SaaS Platform";
export type DemoProductType =
  | "business_website"
  | "ecommerce_website"
  | "web_application"
  | "marketplace"
  | "native_android_app"
  | "native_ios_app"
  | "pwa"
  | "business_management_software"
  | "digital_ecosystem";

export interface DemoRoleAccount {
  role: "admin" | "customer" | "staff" | "vendor" | "delivery" | "teacher" | "student" | "manager";
  label: string;
  email: string;
  passwordHint: string;
  permissions: string[];
}

export interface DemoModule {
  name: string;
  description: string;
  roles: string[];
  keyFeatures: string[];
}

export interface DemoModel {
  id: number;
  name: string;
  slug: string;
  categoryNumber: number;
  categoryName: string;
  categorySlug: string;
  shortDescription: string;
  fullDescription: string;
  suitableFor: string;
  mainFeatures: string[];
  modules: DemoModule[];
  techStack: string[];
  developmentType: DemoDevType;
  platform: DemoPlatform;
  estimatedDevelopmentTime: string;
  indicativeStartingPrice: string;
  indicativePriceUsd: string;
  availabilityStatus: DemoAvailabilityStatus;
  isAiEnabled: boolean;
  isEcommerce: boolean;
  isErpCrm: boolean;
  isFreeDemoAvailable: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  viewsCount: number;
  rating: number;
  offlineReady: boolean;
  sampleRoles: DemoRoleAccount[];
  screenshots: string[];
  videoThumbnail: string;
  videoDuration: string;
  productType?: string;
  standardProductType?: DemoProductType;
  searchKeywords?: string[];
  thumbnail?: string;
  generationStatus?: string;
  qaStatus?: string;
  publishingStatus?: string;
  previewRoute?: string;
  publicRoute?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface DemoCategory {
  number: number;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  iconName: string;
  gradient: string;
  count: number;
  highlights: string[];
}
