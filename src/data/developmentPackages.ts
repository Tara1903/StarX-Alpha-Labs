export type DivisionType = "website" | "app" | "combo";

export interface PackageFeature {
  name: string;
  included: boolean;
  tooltip?: string;
}

export interface DevelopmentPackage {
  id: string;
  division: DivisionType;
  code: string; // W1, A1, C1
  name: string;
  tagline: string;
  startingPrice: number;
  popular?: boolean;
  bestValue?: boolean;
  pagesOrScreens: string;
  platforms: string[];
  timeline: string;
  idealFor: string;
  features: string[];
  standaloneValue?: number; // for combo packages to show real savings
  savings?: number;
}

export interface DevelopmentAddon {
  id: string;
  name: string;
  description: string;
  startingPrice: number;
  priceType: "one_time" | "monthly" | "yearly";
  applicableTo: DivisionType[] | "all";
  popular?: boolean;
  iconName?: string;
}

export interface HostingMaintenancePlan {
  id: string;
  category: "domain" | "hosting" | "maintenance";
  name: string;
  price: number;
  billingPeriod: "one_time" | "monthly" | "yearly";
  features: string[];
  recommended?: boolean;
}

// --------------------------------------------------------------------------
// DIVISION A: WEBSITE DEVELOPMENT PACKAGES (W1 - W6)
// --------------------------------------------------------------------------
export const WEBSITE_PACKAGES: DevelopmentPackage[] = [
  {
    id: "pkg-w1",
    division: "website",
    code: "W1",
    name: "Starter Website",
    tagline: "Essential online presence for small businesses & professionals",
    startingPrice: 7999,
    pagesOrScreens: "Up to 5 Pages",
    platforms: ["Web", "Responsive Mobile"],
    timeline: "3–5 Days",
    idealFor: "Consultants, local businesses, portfolios & single-service companies",
    features: [
      "Up to 5 responsive pages (Home, About, Services, Contact, etc.)",
      "Modern, fast mobile-first UI design",
      "Interactive contact enquiry form with email alerts",
      "1-Click WhatsApp direct chat button",
      "Essential on-page SEO meta tags & robots.txt",
      "Social media profile links integration",
      "SSL HTTPS configuration assistance",
      "Cloud hosting deployment assistance",
      "14 days post-launch technical support",
    ],
  },
  {
    id: "pkg-w2",
    division: "website",
    code: "W2",
    name: "Business Website",
    tagline: "High-credibility web presence with content management & lead forms",
    startingPrice: 14999,
    popular: true,
    pagesOrScreens: "Up to 10 Pages",
    platforms: ["Web", "Mobile & Tablet"],
    timeline: "7–10 Days",
    idealFor: "Growing SMEs, service agencies, clinics, hospitality & coaching",
    features: [
      "Up to 10 customized responsive pages",
      "Bespoke branded UI/UX with smooth micro-animations",
      "Dynamic content sections & portfolio gallery",
      "Admin CMS to update text, photos & services easily",
      "Lead management & enquiry tracking dashboard",
      "Official WhatsApp Business integration",
      "Integrated SEO-optimized blog module",
      "Google Maps interactive location embed",
      "Google Analytics 4 & Meta Pixel integration",
      "30 days post-launch warranty & maintenance",
    ],
  },
  {
    id: "pkg-w3",
    division: "website",
    code: "W3",
    name: "Premium Website",
    tagline: "High-impact visual brand experience with advanced lead engines",
    startingPrice: 24999,
    bestValue: true,
    pagesOrScreens: "Up to 20 Pages",
    platforms: ["Web", "Ultra-wide & Mobile"],
    timeline: "10–14 Days",
    idealFor: "Established brands, corporations, manufacturers & institutions",
    features: [
      "Up to 20 custom designed dynamic pages",
      "Cinematic dark or light futuristic theme styling",
      "Full administrative console with role permissions",
      "Lead capture funnel with automated email confirmations",
      "Full technical SEO architecture & XML sitemaps",
      "Multi-form routing (Quote, Consultation, Career, Enquiries)",
      "Multi-language support option (English + Hindi/Regional)",
      "REST API integration with third-party CRM / ERP",
      "Executive analytics dashboard with traffic insights",
      "60 days dedicated technical maintenance & SLA",
    ],
  },
  {
    id: "pkg-w4",
    division: "website",
    code: "W4",
    name: "E-Commerce Website",
    tagline: "High-conversion online store with inventory & payments",
    startingPrice: 29999,
    pagesOrScreens: "Unlimited Products / 15 Pages",
    platforms: ["Web", "Mobile Web App"],
    timeline: "12–16 Days",
    idealFor: "D2C brands, retail stores, fashion, food delivery & wholesale",
    features: [
      "Full product catalogue with categories, filters & search",
      "Product variant engine (size, color, material, weight)",
      "Instant checkout with Razorpay / Stripe / PhonePe integration",
      "Automated shipping rate calculation & pin-code verification",
      "Coupon code, discount voucher & festival promotion engine",
      "Customer account portal with order history & live tracking",
      "Central admin inventory & stock alert management",
      "Automated WhatsApp & SMS order confirmation alerts",
      "Exportable sales reports & GST invoice generation",
      "45 days technical onboarding & maintenance",
    ],
  },
  {
    id: "pkg-w5",
    division: "website",
    code: "W5",
    name: "Advanced Web Portal",
    tagline: "Custom role-based web application, portal & workflow engine",
    startingPrice: 49999,
    pagesOrScreens: "Custom Architecture (30+ Views)",
    platforms: ["Enterprise Web", "PWA"],
    timeline: "2–4 Weeks",
    idealFor: "B2B portals, logistics, school ERPs, healthcare & booking networks",
    features: [
      "Multi-tenant customer & staff portal architecture",
      "Role-Based Access Control (Super Admin, Manager, Staff, Customer)",
      "Secure database integration (PostgreSQL / Supabase / MongoDB)",
      "Operational workflow automation & status transition engine",
      "Customer document upload & automated PDF generation",
      "Real-time notifications & email trigger system",
      "Enterprise audit logs & activity history",
      "Two-factor authentication (2FA) & encrypted data security",
      "Custom analytics & graphical reporting cockpit",
      "90 days guaranteed bug-fix warranty & support",
    ],
  },
  {
    id: "pkg-w6",
    division: "website",
    code: "W6",
    name: "Enterprise / Custom SaaS",
    tagline: "Cloud-native scalable software platform built for global distribution",
    startingPrice: 99999,
    pagesOrScreens: "Scalable Full Platform",
    platforms: ["Cloud Web", "Edge Global CDN"],
    timeline: "4–8 Weeks",
    idealFor: "Tech startups, SaaS founders, enterprise digitization & fintech",
    features: [
      "Full custom SaaS multi-tenant infrastructure",
      "Tiered subscription billing with recurring payment gateway",
      "Organization workspace management & team seat licensing",
      "High-concurrency microservices or edge serverless architecture",
      "Automated daily offsite database backups & disaster recovery",
      "Comprehensive REST / GraphQL API with developer API keys",
      "AI model integration (custom LLM, chatbot or automation)",
      "Enterprise SOC-2 / ISO compliance-ready security framework",
      "Automated CI/CD deployment pipelines on Vercel / AWS",
      "6 months enterprise SLA & continuous engineering support",
    ],
  },
];

// --------------------------------------------------------------------------
// DIVISION B: MOBILE APP DEVELOPMENT PACKAGES (A1 - A5)
// --------------------------------------------------------------------------
export const APP_PACKAGES: DevelopmentPackage[] = [
  {
    id: "pkg-a1",
    division: "app",
    code: "A1",
    name: "Basic Android App",
    tagline: "Fast Android application for business catalogue & enquiries",
    startingPrice: 19999,
    pagesOrScreens: "Up to 5 Screens",
    platforms: ["Android APK / AAB"],
    timeline: "7–10 Days",
    idealFor: "Local businesses, catalogues, information portals & service booking",
    features: [
      "Native-feel modern Android UI with fluid navigation",
      "Home, services, catalogue, about & contact screens",
      "Direct phone call & WhatsApp click-to-chat triggers",
      "Customer enquiry form connected to email / Google Sheets",
      "Offline caching for instant loading on poor networks",
      "Clean Material Design 3 theme matching your brand",
      "Google Play Store publishing guidance & bundle build",
      "30 days application warranty & maintenance",
    ],
  },
  {
    id: "pkg-a2",
    division: "app",
    code: "A2",
    name: "Professional Android App",
    tagline: "Dynamic Android application with user accounts & push alerts",
    startingPrice: 34999,
    popular: true,
    pagesOrScreens: "Up to 10 Screens",
    platforms: ["Android (Google Play)"],
    timeline: "12–16 Days",
    idealFor: "Service providers, coaching institutes, clinics & community apps",
    features: [
      "Secure user registration & phone OTP / email login",
      "Personalized customer profile & booking management",
      "Firebase Cloud Messaging (FCM) unlimited push notifications",
      "Dynamic REST API connectivity with live database",
      "In-app search & category filtering engine",
      "Interactive feedback, reviews & ratings module",
      "Google Play Store end-to-end publishing service",
      "Admin web panel to send push notifications & view leads",
      "Crashlytics & analytics reporting integration",
      "45 days post-launch support & maintenance",
    ],
  },
  {
    id: "pkg-a3",
    division: "app",
    code: "A3",
    name: "Advanced Android App",
    tagline: "Feature-rich mobile application with in-app payments & live tracking",
    startingPrice: 59999,
    pagesOrScreens: "Up to 18 Screens",
    platforms: ["Android (Google Play Store)"],
    timeline: "2–3 Weeks",
    idealFor: "On-demand food delivery, ride hailing, salon booking & fitness",
    features: [
      "In-app payments (UPI, Cards, NetBanking, Wallets)",
      "Live GPS map integration & real-time location tracking",
      "In-app live chat / support messaging",
      "Multi-role support (Customer, Partner / Driver view)",
      "Order status timeline with automated push updates",
      "Digital wallet / loyalty reward points module",
      "Fast SQLite / Room local storage with biometric login",
      "Complete backend administrative API & web portal",
      "Google Play Store policy approval guarantee",
      "60 days dedicated technical SLA & monitoring",
    ],
  },
  {
    id: "pkg-a4",
    division: "app",
    code: "A4",
    name: "Cross-Platform App",
    tagline: "Single codebase running natively on both Android & iOS (Apple App Store)",
    startingPrice: 79999,
    bestValue: true,
    pagesOrScreens: "Up to 20 Screens",
    platforms: ["Android (Google Play)", "iOS (Apple App Store)"],
    timeline: "3–4 Weeks",
    idealFor: "High-growth startups, D2C brands & businesses targeting iPhone users",
    features: [
      "Unified React Native / Flutter modern codebase",
      "Simultaneous release on Google Play Store & Apple App Store",
      "Platform-native animations (Material 3 on Android, Cupertino on iOS)",
      "Apple Sign-In & Google OAuth authentication",
      "Unified payment gateway supporting Apple Pay & UPI",
      "Automated push notifications on both iOS (APNs) and Android (FCM)",
      "Dark mode & light mode system appearance switching",
      "Universal deep links (share products/screens across platforms)",
      "App Store & Google Play review guidelines submission assist",
      "90 days dual-platform warranty & SLA",
    ],
  },
  {
    id: "pkg-a5",
    division: "app",
    code: "A5",
    name: "Enterprise Mobile App",
    tagline: "Large-scale mobile ecosystem with microservices & offline sync",
    startingPrice: 149999,
    pagesOrScreens: "Custom Enterprise Scope",
    platforms: ["Android", "iOS", "Internal MDM"],
    timeline: "4–8 Weeks",
    idealFor: "Fintech, healthcare systems, logistics fleets & enterprise workforce",
    features: [
      "Complete dual-platform iOS & Android mobile enterprise suite",
      "Offline-first sync engine with conflict resolution",
      "Advanced biometric encryption (FaceID, Fingerprint, Hardware Key)",
      "Role-based multi-tier interfaces (Field Staff, Dispatcher, Executive)",
      "High-volume message queuing & real-time WebSocket events",
      "End-to-end encrypted voice / video calls where required",
      "Automated unit & integration test coverage",
      "Full API documentation & SDK generation",
      "Dedicated App Store review expediting assistance",
      "6 months enterprise SLA & continuous release cycles",
    ],
  },
];

// --------------------------------------------------------------------------
// DIVISION C: WEBSITE + APP COMBO PACKAGES (C1 - C5)
// --------------------------------------------------------------------------
export const COMBO_PACKAGES: DevelopmentPackage[] = [
  {
    id: "pkg-c1",
    division: "combo",
    code: "C1",
    name: "Starter Digital Combo",
    tagline: "Starter Business Website + Basic Android App with unified brand identity",
    startingPrice: 24999,
    standaloneValue: 27998, // 7999 + 19999
    savings: 2999,
    pagesOrScreens: "5 Web Pages + 5 App Screens",
    platforms: ["Website", "Android Mobile App"],
    timeline: "7–10 Days",
    idealFor: "New startups & local businesses establishing both web and app presence",
    features: [
      "Starter Business Website (up to 5 responsive pages)",
      "Basic Android Application (Play Store ready AAB build)",
      "Synchronized contact info, brand colors & logo mark",
      "Unified customer enquiry management to single destination",
      "WhatsApp direct chat integrated on both web and app",
      "Free SSL configuration & cloud deployment assistance",
      "Google Play Store publishing guidance",
      "30 days complete combo technical support",
    ],
  },
  {
    id: "pkg-c2",
    division: "combo",
    code: "C2",
    name: "Business Digital Combo",
    tagline: "Business Website + Professional Android App with shared database",
    startingPrice: 44999,
    standaloneValue: 49998, // 14999 + 34999
    savings: 4999,
    popular: true,
    pagesOrScreens: "10 Web Pages + 10 App Screens",
    platforms: ["Website", "Android App", "Admin Web Portal"],
    timeline: "2–3 Weeks",
    idealFor: "Clinics, training institutes, service firms & hospitality chains",
    features: [
      "Full Business Website (up to 10 customized pages with CMS)",
      "Professional Android App with user registration & profiles",
      "Shared PostgreSQL / Supabase customer database",
      "Unified Super Admin panel managing both website & app leads",
      "Unlimited push notifications sent to app users from admin",
      "Google Analytics & App Crashlytics unified tracking",
      "Google Play Store end-to-end publishing assistance",
      "SEO-optimized web presence with mobile app download banner",
      "60 days dedicated combo warranty & maintenance",
    ],
  },
  {
    id: "pkg-c3",
    division: "combo",
    code: "C3",
    name: "E-Commerce Combo",
    tagline: "Complete E-Commerce Storefront + Customer Shopping Mobile App",
    startingPrice: 69999,
    standaloneValue: 89998, // 29999 + 59999
    savings: 19999,
    bestValue: true,
    pagesOrScreens: "Full Storefront + 15+ App Screens",
    platforms: ["Web E-Commerce", "Android App (iOS optional)", "Seller Admin"],
    timeline: "3–4 Weeks",
    idealFor: "D2C fashion, supermarkets, electronics & cloud kitchen franchises",
    features: [
      "Full E-Commerce Web Storefront with product catalogue & cart",
      "Native-feel Shopping Mobile App with instant push alerts",
      "Real-time synchronized inventory between web and app",
      "Shared Razorpay / Stripe payment gateway integration",
      "Unified customer accounts (login on web, see cart on app)",
      "Centralized order management with automated GST invoices",
      "Live order status push notifications sent to app users",
      "Coupon, discount & seasonal promotion engine",
      "Google Play Store submission & publishing",
      "90 days complete e-commerce technical support & SLA",
    ],
  },
  {
    id: "pkg-c4",
    division: "combo",
    code: "C4",
    name: "Advanced Business Combo",
    tagline: "Advanced Web Portal + Cross-Platform Mobile App (Android + iOS)",
    startingPrice: 119999,
    standaloneValue: 129998, // 49999 + 79999
    savings: 9999,
    pagesOrScreens: "Portal Suite + 20+ Mobile Screens",
    platforms: ["Web Portal", "Android App", "iOS App", "Super Admin"],
    timeline: "4–6 Weeks",
    idealFor: "Fintech, logistics, on-demand marketplaces & healthcare networks",
    features: [
      "Enterprise Web Portal with multi-role access control",
      "Cross-Platform Mobile App running on both Android & iOS",
      "Shared single authentication (Web + App unified session)",
      "Real-time database sync with Supabase PostgreSQL",
      "Unified Super Admin Console with live business analytics",
      "In-app payments, wallet rewards & automated PDF reports",
      "Multi-channel notifications (Push, WhatsApp, SMS, Email)",
      "Google Play Store & Apple App Store review publishing",
      "120 days enterprise-grade technical maintenance",
    ],
  },
  {
    id: "pkg-c5",
    division: "combo",
    code: "C5",
    name: "Enterprise Digital Ecosystem",
    tagline: "Complete Enterprise Web Platform + Dual iOS & Android Apps + Microservices",
    startingPrice: 199999,
    standaloneValue: 249998, // 99999 + 149999
    savings: 49999,
    pagesOrScreens: "Full Custom Ecosystem",
    platforms: ["Global Cloud Web", "Android App", "iOS App", "Admin Cockpit"],
    timeline: "6–10 Weeks",
    idealFor: "Large corporations, multi-city operations, public sector & funded startups",
    features: [
      "Complete custom Enterprise Web Application with microservices",
      "Dedicated iOS (Swift/React Native) and Android native-performance apps",
      "Shared high-concurrency cloud database with automated backups",
      "Centralized Super Admin Cockpit overseeing all business operations",
      "Multi-tenant hierarchy (Franchises, Branches, Managers, Customers)",
      "High-throughput REST/GraphQL APIs with developer documentation",
      "Custom AI workflow automation / document intelligence integration",
      "Enterprise SOC-2 / ISO compliance-ready security & encryption",
      "Google Play Store & Apple App Store guaranteed deployment",
      "6 months complete enterprise SLA with dedicated engineering lead",
    ],
  },
];

// --------------------------------------------------------------------------
// SHARED ADD-ONS LIBRARY
// --------------------------------------------------------------------------
export const DEVELOPMENT_ADDONS: DevelopmentAddon[] = [
  {
    id: "addon-page",
    name: "Additional Website Page",
    description: "Fully designed & responsive extra content page",
    startingPrice: 500,
    priceType: "one_time",
    applicableTo: ["website", "combo"],
    iconName: "FileText",
  },
  {
    id: "addon-screen",
    name: "Additional App Screen",
    description: "Custom native UI mobile application screen",
    startingPrice: 750,
    priceType: "one_time",
    applicableTo: ["app", "combo"],
    iconName: "Smartphone",
  },
  {
    id: "addon-uiux",
    name: "Premium UI/UX Bespoke Design",
    description: "Custom Figma prototypes, micro-interactions & brand guidelines",
    startingPrice: 3000,
    priceType: "one_time",
    applicableTo: "all",
    popular: true,
    iconName: "Palette",
  },
  {
    id: "addon-seo",
    name: "Advanced Technical SEO Setup",
    description: "Schema markup, keyword strategy, XML sitemaps & speed tuning",
    startingPrice: 2500,
    priceType: "one_time",
    applicableTo: ["website", "combo"],
    popular: true,
    iconName: "Search",
  },
  {
    id: "addon-payment",
    name: "Payment Gateway Integration",
    description: "Razorpay / Stripe / PhonePe automated checkout & webhooks",
    startingPrice: 2000,
    priceType: "one_time",
    applicableTo: "all",
    popular: true,
    iconName: "CreditCard",
  },
  {
    id: "addon-whatsapp",
    name: "WhatsApp Automation Integration",
    description: "Official WhatsApp Cloud API for automated notifications",
    startingPrice: 1500,
    priceType: "one_time",
    applicableTo: "all",
    iconName: "MessageCircle",
  },
  {
    id: "addon-sms",
    name: "SMS Gateway Integration",
    description: "DLT-approved transactional OTP & SMS delivery pipeline",
    startingPrice: 1500,
    priceType: "one_time",
    applicableTo: "all",
    iconName: "MessageSquare",
  },
  {
    id: "addon-chatbot",
    name: "AI Smart Assistant Chatbot",
    description: "Fine-tuned AI receptionist trained on your business documents",
    startingPrice: 4999,
    priceType: "one_time",
    applicableTo: "all",
    popular: true,
    iconName: "Bot",
  },
  {
    id: "addon-analytics",
    name: "Advanced Business Analytics",
    description: "Custom conversion funnel tracking, heatmaps & KPI dashboard",
    startingPrice: 2500,
    priceType: "one_time",
    applicableTo: "all",
    iconName: "BarChart3",
  },
  {
    id: "addon-multilang",
    name: "Multi-Language Localization",
    description: "Full English, Hindi & regional language translation system",
    startingPrice: 2500,
    priceType: "one_time",
    applicableTo: "all",
    iconName: "Globe",
  },
  {
    id: "addon-api",
    name: "External API Integration",
    description: "Custom REST/GraphQL integration with accounting, ERP or logistics",
    startingPrice: 2500,
    priceType: "one_time",
    applicableTo: "all",
    iconName: "Code2",
  },
  {
    id: "addon-admin-module",
    name: "Custom Admin Feature Module",
    description: "Bespoke database management screen or workflow report",
    startingPrice: 4999,
    priceType: "one_time",
    applicableTo: "all",
    iconName: "Layers",
  },
  {
    id: "addon-crm",
    name: "CRM System Integration",
    description: "Direct lead routing into HubSpot, Salesforce, Zoho or custom CRM",
    startingPrice: 4999,
    priceType: "one_time",
    applicableTo: "all",
    iconName: "Users",
  },
  {
    id: "addon-migration",
    name: "Legacy Data Migration",
    description: "Safe extraction, cleaning & import from existing Excel / databases",
    startingPrice: 2500,
    priceType: "one_time",
    applicableTo: "all",
    iconName: "Database",
  },
  {
    id: "addon-maint-basic",
    name: "Basic Monthly Maintenance",
    description: "Security updates, monthly backup & minor content revisions",
    startingPrice: 999,
    priceType: "monthly",
    applicableTo: "all",
    iconName: "ShieldCheck",
  },
  {
    id: "addon-maint-adv",
    name: "Advanced Monthly SLA Maintenance",
    description: "24/7 uptime monitoring, 2-hr emergency SLA & bi-weekly updates",
    startingPrice: 2499,
    priceType: "monthly",
    applicableTo: "all",
    popular: true,
    iconName: "Cpu",
  },
];

// --------------------------------------------------------------------------
// HOSTING, DOMAIN & RECURRING SERVICES
// --------------------------------------------------------------------------
export const RECURRING_SERVICES: HostingMaintenancePlan[] = [
  {
    id: "svc-domain",
    category: "domain",
    name: "Commercial Domain Registration (.com / .in)",
    price: 999,
    billingPeriod: "yearly",
    features: [
      "Full ownership & DNS control",
      "WHOIS privacy protection included",
      "Free automated SSL certificates",
      "Standard yearly renewal at configured price",
    ],
  },
  {
    id: "svc-host-basic",
    category: "hosting",
    name: "Basic Cloud Hosting",
    price: 1499,
    billingPeriod: "yearly",
    features: [
      "High-speed SSD cloud storage",
      "99.9% uptime SLA guarantee",
      "Automated weekly backups",
      "Free SSL HTTPS certificate",
    ],
  },
  {
    id: "svc-host-business",
    category: "hosting",
    name: "Business Edge Hosting",
    price: 3999,
    billingPeriod: "yearly",
    recommended: true,
    features: [
      "Global Edge CDN acceleration",
      "Daily automated database backups",
      "DDoS attack mitigation",
      "Dedicated serverless functions bandwidth",
    ],
  },
  {
    id: "svc-maint-std",
    category: "maintenance",
    name: "Standard Maintenance SLA",
    price: 1499,
    billingPeriod: "monthly",
    features: [
      "Proactive framework & library security patching",
      "Disaster recovery verified restore protocol",
      "Up to 3 hours of technical content updates/month",
      "Uptime & performance health monitoring",
    ],
  },
];

// Helper to format prices in INR with Indian grouping
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
