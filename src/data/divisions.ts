export interface DivisionCapability {
  title: string;
  description: string;
}

export interface DivisionItem {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  badge: string;
  mission: string;
  overview: string;
  indicativePrice: string;
  accentColor: string;
  iconName: "Globe" | "Smartphone" | "Briefcase" | "Cloud" | "Sparkles" | "Cpu";
  capabilities: DivisionCapability[];
  deliverables: string[];
  techStack: string[];
}

export const DIVISIONS_DATA: DivisionItem[] = [
  {
    slug: "starx-web",
    name: "STARX WEB",
    tagline: "High-Performance Web Applications, Portals & Digital Architecture",
    shortDescription: "Specialized in corporate web presences, ecommerce platforms, progressive web apps, enterprise portals, and bespoke web platforms.",
    badge: "Web & Platforms",
    mission: "To eliminate slow, bloated, generic web templates and engineer ultra-fast, bespoke digital headquarters that convert visitors and scale seamlessly.",
    overview: "STARX WEB architects modern digital presences combining cinematic design, sub-second response times, and hardened enterprise architecture. From high-conversion corporate landing engines to complex client account portals, we engineer custom web software that leads the market.",
    indicativePrice: "From ₹499/mo (Managed) • Project Scopes from ₹14,999",
    accentColor: "#00D9FF",
    iconName: "Globe",
    capabilities: [
      {
        title: "Corporate Websites & Digital Portals",
        description: "Bespoke digital headquarters engineered for high trust, articulation of complex value propositions, and executive decision-maker conversion.",
      },
      {
        title: "Headless E-Commerce & Storefronts",
        description: "Sub-second shopping platforms with customized checkout flows, automated inventory reconciliation, and multi-currency billing.",
      },
      {
        title: "Customer-Facing Account Portals",
        description: "Secure, polished client workspaces with real-time status dashboards, self-service document vaults, and automated billing management.",
      },
      {
        title: "Progressive Web Apps (PWAs)",
        description: "Installable web applications delivering native app-like fluidity, offline caching, push notifications, and zero app-store commission friction.",
      },
      {
        title: "Interactive Booking & Scheduling Engines",
        description: "High-concurrency reservation engines with real-time slot locking, automated calendar synchronization, and instant payment capture.",
      },
      {
        title: "Search & Core Web Vitals Optimization",
        description: "Technical SEO schemas, semantic structured metadata, image optimization pipelines, and 95+ Google Lighthouse speed scores.",
      },
    ],
    deliverables: [
      "Custom responsive design system & component library",
      "Production-ready Next.js 16 / TypeScript source code",
      "Structured SEO schema metadata & Open Graph assets",
      "Automated CI/CD deployment pipeline on Cloudflare / Vercel Edge",
      "Full performance audit & Core Web Vitals certification report",
    ],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Motion", "Vercel / Cloudflare Edge"],
  },
  {
    slug: "starx-apps",
    name: "STARX APPS",
    tagline: "Native & Cross-Platform Mobile Applications for iOS & Android",
    shortDescription: "Engineered for touch: bespoke mobile applications, customer ordering apps, on-demand dispatch systems, and workforce tools.",
    badge: "Mobile Engineering",
    mission: "To build fluid, branded mobile applications that drive customer loyalty, automate operational queues, and deliver native operating-system performance.",
    overview: "STARX APPS delivers custom mobile applications for modern consumer brands and enterprise workforces. We build native iOS and Android apps, as well as unified cross-platform solutions that share business logic with web platforms while retaining fluid 60fps touch interactions.",
    indicativePrice: "From ₹499/mo (Managed) • Project Scopes from ₹19,999",
    accentColor: "#E52BFF",
    iconName: "Smartphone",
    capabilities: [
      {
        title: "Consumer Mobile Applications",
        description: "Intuitive, high-retention consumer apps featuring frictionless sign-in, biometric authentication, and personalized feeds.",
      },
      {
        title: "On-Demand Delivery & Dispatch Apps",
        description: "Real-time driver telemetry, route guidance, status bump bars, and push notification pipelines for high-velocity dispatch.",
      },
      {
        title: "Mobile Commerce & In-App Purchases",
        description: "Seamless single-tap checkout via UPI, Apple Pay, Google Pay, and localized regional payment switches.",
      },
      {
        title: "Healthcare & Patient Companions",
        description: "Secure, compliant mobile health portals enabling appointment bookings, prescription viewing, and teleconsultations.",
      },
      {
        title: "Field Workforce & Operations Tools",
        description: "Offline-capable mobile apps with barcode scanning, signature capture, inspection checklists, and automatic sync.",
      },
      {
        title: "Cross-Platform Unified Architecture",
        description: "Shared TypeScript core logic between React Native/Flutter and web apps, reducing development time by up to 40%.",
      },
    ],
    deliverables: [
      "App Store & Google Play production-ready binaries",
      "Complete React Native / Flutter / Swift codebase",
      "Push notification service setup (APNs / FCM)",
      "Automated build and test deployment pipelines",
      "App store listing assets, privacy manifests, and compliance filing",
    ],
    techStack: ["React Native", "Flutter", "TypeScript", "Swift", "Kotlin", "Supabase Mobile SDK", "FCM"],
  },
  {
    slug: "starx-business",
    name: "STARX BUSINESS",
    tagline: "Point of Sale, Operations ERP, CRM & Business Management Systems",
    shortDescription: "Mission-critical operations software: POS terminals, cloud kitchen hubs, serialized inventory, CRM funnels, and enterprise accounting.",
    badge: "Business OS & ERP",
    mission: "To liberate businesses from rigid, generic software subscriptions by engineering proprietary operational platforms tailored exactly to their business workflows.",
    overview: "STARX BUSINESS engineers dedicated operational management software. From high-turn dining POS systems and multi-branch inventory logistics to end-to-end customer relationship pipelines and commercial accounting, we engineer proprietary business tools that eliminate operational chaos.",
    indicativePrice: "From ₹999/mo (Managed) • Custom ERP Scopes Available",
    accentColor: "#FF941F",
    iconName: "Briefcase",
    capabilities: [
      {
        title: "Point-of-Sale (POS) & Billing Systems",
        description: "Sub-second touch billing, split checks, table course firing, GST invoicing, cash drawer reconciliation, and UPI settlement.",
      },
      {
        title: "Restaurant OS & Multi-Station KDS",
        description: "Dining room floor management, kitchen order ticketing (KOT), virtual cloud kitchen aggregation, and ingredient tracking.",
      },
      {
        title: "Inventory & Multi-Warehouse Supply Chain",
        description: "Batch/expiry tracking, barcode SKU scanning, low-stock reorder triggers, and supplier purchase order automation.",
      },
      {
        title: "CRM & Sales Opportunity Funnels",
        description: "Custom lead capture, automated stage progression, sales agent assignments, communication histories, and quotation pipelines.",
      },
      {
        title: "Financial Accounting & Invoicing",
        description: "Automated invoice sequence generation, payment gateway reconciliation, expense ledgers, and financial tax reports.",
      },
      {
        title: "Industry-Specific Operational Systems",
        description: "Tailored operational consoles for healthcare clinics, real estate brokerages, automotive dealerships, and manufacturing shops.",
      },
    ],
    deliverables: [
      "Full database schema & ERD architecture documentation",
      "PostgreSQL database with Row Level Security (RLS) enforcement",
      "Dedicated role-based consoles (Admin, Manager, Cashier, Kitchen)",
      "Integrated UPI & payment reconciliation webhooks",
      "Comprehensive staff user manual and training documentation",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Supabase", "Redis", "UPI Gateway", "WebSockets"],
  },
  {
    slug: "starx-saas",
    name: "STARX SAAS",
    tagline: "Custom Subscription Platforms, Multi-Tenant Architecture & Cloud Products",
    shortDescription: "Architected for scale: proprietary multi-tenant software platforms, subscription billing engines, and collaborative cloud products.",
    badge: "Cloud SaaS",
    mission: "To engineer modern, resilient SaaS platforms that empower companies to monetize proprietary domain expertise as recurring subscription revenue.",
    overview: "STARX SAAS partners with founders and established enterprises to conceptualize, design, and engineer commercial subscription software. We build scalable multi-tenant architectures, recurring billing engines, self-service onboarding flows, and real-time collaborative workspaces.",
    indicativePrice: "From ₹999/mo (Managed) • Platform Scopes from ₹49,999",
    accentColor: "#087BFF",
    iconName: "Cloud",
    capabilities: [
      {
        title: "Multi-Tenant Platform Architecture",
        description: "Strict tenant data isolation via PostgreSQL schema separation or row-level tenant security, scaling to millions of records.",
      },
      {
        title: "Subscription Billing & Tier Management",
        description: "Automated monthly/yearly recurring billing, usage-based meter billing, dunning management, and instant license provisioning.",
      },
      {
        title: "Self-Service Customer Onboarding",
        description: "Guided setup wizards, invite-a-team-member workflows, team role delegation, and automated workspace provisioning.",
      },
      {
        title: "Role-Based Access Control (RBAC)",
        description: "Fine-grained permissions matrix, audit trails, activity logging, and single sign-on (SSO / SAML) for enterprise accounts.",
      },
      {
        title: "API Developer Portals & Webhook Dispatch",
        description: "Developer-facing documentation consoles, API key token management, rate limiters, and outbound webhook delivery queues.",
      },
      {
        title: "SaaS Telemetry & Revenue Analytics",
        description: "Real-time calculation of MRR, ARR, churn rate, user engagement velocity, and customer lifetime value (LTV).",
      },
    ],
    deliverables: [
      "Production-ready multi-tenant software codebase",
      "Automated subscription billing integration (Stripe / Razorpay)",
      "Database migration scripts with zero-downtime schema evolution",
      "Comprehensive API documentation and developer sandbox",
      "Production infrastructure deployment with automated failover",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "Stripe / Razorpay", "Tailwind CSS"],
  },
  {
    slug: "starx-ai",
    name: "STARX AI",
    tagline: "Autonomous AI Agents, Domain RAG Pipelines & Intelligent Automation",
    shortDescription: "Practical artificial intelligence: autonomous workflow agents, private RAG document engines, semantic search, and computer vision.",
    badge: "Autonomous AI",
    mission: "To integrate practical, high-value artificial intelligence directly into real software workflows without hype, hallucination risk, or proprietary data leakage.",
    overview: "STARX AI develops tailored artificial intelligence capabilities embedded directly into your software applications. We build domain-specific RAG search engines over private corporate knowledge bases, autonomous agents for routine operational tasks, and model evaluation guardrails.",
    indicativePrice: "Custom Project Scopes + Consumption AI Credits",
    accentColor: "#873BFF",
    iconName: "Sparkles",
    capabilities: [
      {
        title: "Autonomous Workflow Agents",
        description: "Self-directing software agents that execute multi-step business tasks across calendars, emails, spreadsheets, and databases.",
      },
      {
        title: "Retrieval-Augmented Generation (RAG)",
        description: "Private AI retrieval over internal SOPs, contracts, technical manuals, and historical databases using pgvector embeddings.",
      },
      {
        title: "Automated Document Intelligence",
        description: "High-accuracy extraction and structured JSON validation from unstructured PDFs, receipts, invoices, and legal scans.",
      },
      {
        title: "Semantic Search & Vector Catalogues",
        description: "Intuitive conceptual product search across extensive inventories and knowledge bases beyond rigid keyword matching.",
      },
      {
        title: "AI Customer Support & Sales Copilots",
        description: "Context-aware conversational assistants that qualify inbound leads, schedule consultations, and resolve customer tickets.",
      },
      {
        title: "AI Safety Guardrails & Benchmarking",
        description: "Deterministic input/output filtering, PII redaction, hallucination detection, and token latency monitoring.",
      },
    ],
    deliverables: [
      "Vector database pipeline & embedding index (pgvector)",
      "Evaluated model prompts, system directives & guardrails",
      "Zero-data-retention compliance architecture",
      "Interactive conversational UI components & API bridges",
      "Token consumption tracking & inference cost telemetry",
    ],
    techStack: ["Google Gemini API", "Claude API", "OpenAI", "Pgvector", "LangChain", "Python", "TypeScript"],
  },
  {
    slug: "starx-custom",
    name: "STARX CUSTOM",
    tagline: "Bespoke Enterprise Engineering, Cloud Architecture & Dedicated Teams",
    shortDescription: "Engineered for unique challenges: custom software engineering, legacy modernization, cloud infrastructure, and white-label agency delivery.",
    badge: "Enterprise Engineering",
    mission: "To solve complex architectural and operational engineering challenges through bespoke, sovereign software assets built to exacting enterprise standards.",
    overview: "STARX CUSTOM is our elite custom engineering division. When off-the-shelf software and standard frameworks cannot meet unique regulatory, scale, or business requirements, we architect purpose-built enterprise software, secure APIs, and dedicated digital infrastructures.",
    indicativePrice: "Individually Scoped RFP/RFQ • Milestone Deliverables",
    accentColor: "#FF35B8",
    iconName: "Cpu",
    capabilities: [
      {
        title: "Bespoke Enterprise Engineering",
        description: "Tailored software platforms built from the ground up to match unique company logic, compliance mandates, and organizational structures.",
      },
      {
        title: "100% White-Label Agency Delivery",
        description: "Elite engineering horsepower for digital agencies looking to deliver high-ticket enterprise platforms under their own brand.",
      },
      {
        title: "Legacy Re-Architecture & Modernization",
        description: "Safe, incremental migration from slow legacy PHP/monolith applications to modern, decoupled Next.js microservices.",
      },
      {
        title: "High-Throughput API Architecture",
        description: "Scalable REST and GraphQL API gateways, event-driven webhook pipelines, and secure external third-party bridges.",
      },
      {
        title: "Cloud Infrastructure & Cybersecurity",
        description: "Hardened serverless deployments, automated failover, zero-trust security postures, and strict penetration resilience.",
      },
      {
        title: "Dedicated Engineering Pods",
        description: "Long-term dedicated engineering pods that integrate directly into client teams for continuous feature velocity.",
      },
    ],
    deliverables: [
      "End-to-end proprietary intellectual property (100% code ownership)",
      "Comprehensive system architecture documentation & diagrams",
      "Automated testing suite with CI/CD deployment pipelines",
      "Dedicated staging and production environments",
      "Formal Master Service Agreement (MSA) and 30-day bug warranty",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Docker", "Kubernetes", "AWS / Cloudflare", "TypeScript"],
  },
];

// Preserved backwards-compatible lookup helper
export function getDivisionBySlug(slug: string): DivisionItem | undefined {
  const normalized = slug.trim().toLowerCase();
  
  // Exact match
  const exact = DIVISIONS_DATA.find((d) => d.slug === normalized);
  if (exact) return exact;

  // Legacy route mappings
  if (normalized === "starx-digital") return DIVISIONS_DATA.find((d) => d.slug === "starx-web");
  if (normalized === "starx-systems") return DIVISIONS_DATA.find((d) => d.slug === "starx-business");
  if (normalized === "starx-ai-solutions") return DIVISIONS_DATA.find((d) => d.slug === "starx-ai");

  return undefined;
}
