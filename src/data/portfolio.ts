export interface PortfolioItem {
  slug: string;
  title: string;
  projectType: "Architectural Demo" | "Proprietary Prototype" | "Reference System";
  category: "web" | "systems" | "ai";
  categoryLabel: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: string[];
  architectureHighlights: string[];
  demoUrl?: string;
  githubUrl?: string;
  verificationBadge: string;
}

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    slug: "apex-capital-portal",
    title: "Apex Capital Corporate Architecture",
    projectType: "Architectural Demo",
    category: "web",
    categoryLabel: "Web & Corporate Portal",
    tagline: "High-security corporate web portal for modern private equity firms",
    description: "A showcase of corporate design system engineering: bilingual typography, investor document rooms, real-time portfolio company charts, and strict Content Security Policies.",
    features: [
      "Bilingual English/Devanagari dynamic switching",
      "Interactive SVG portfolio fund allocation chart",
      "Restricted investor document download room",
      "Sub-second page transitions via Server Components",
    ],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Motion"],
    architectureHighlights: [
      "Zero-layout-shift navigation with active state restoration",
      "Cryptographically verified document token downloads",
      "Optimized KaTeX rendering for financial formulas",
    ],
    verificationBadge: "STARX Reference Demo",
  },
  {
    slug: "omni-warehouse-kds",
    title: "OmniLogistics Operations Console",
    projectType: "Proprietary Prototype",
    category: "systems",
    categoryLabel: "Custom Software & Systems",
    tagline: "Real-time dispatch, inventory status matrix, and order state machine",
    description: "A prototype operations management console engineered for high-throughput fulfillment centers. Demonstrates virtualized data tables, WebSocket event listeners, and automated picking batch creation.",
    features: [
      "Virtualized data grid handling 10,000+ active SKU rows",
      "Real-time order state machine with state transition safety",
      "Automated picking list PDF generation with thermal barcode support",
      "Granular staff role permissions (Admin, Dispatcher, Picker)",
    ],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Redis"],
    architectureHighlights: [
      "Row-Level Security (RLS) guaranteeing tenant isolation",
      "Optimistic UI updates for high-speed barcode scanning",
      "Automated dead-letter queue for failed webhook integrations",
    ],
    verificationBadge: "STARX Architecture Prototype",
  },
  {
    slug: "cerebro-doc-rag",
    title: "Cerebro Contract Intelligence Engine",
    projectType: "Architectural Demo",
    category: "ai",
    categoryLabel: "Custom AI & RAG",
    tagline: "Proprietary RAG engine for automated compliance and clause extraction",
    description: "Demonstrates practical enterprise AI: ingesting legal Master Services Agreements, computing vector embeddings via pgvector, and surfacing grounded citations without model hallucination.",
    features: [
      "Multi-page PDF parsing and chunking with semantic boundaries",
      "Hybrid vector and keyword BM25 retrieval pipeline",
      "Hallucination guardrail scoring on model generation",
      "Interactive source document citation viewer",
    ],
    techStack: ["OpenAI API", "Pgvector", "LangChain", "Next.js", "Tailwind CSS"],
    architectureHighlights: [
      "Zero-retention enterprise privacy compliance setup",
      "Context window optimization reducing token expenditure by 42%",
      "Structured output validation with strict Zod schemas",
    ],
    verificationBadge: "STARX AI Reference System",
  },
  {
    slug: "lux-storefront-headless",
    title: "Verve Artisan Headless Commerce",
    projectType: "Architectural Demo",
    category: "web",
    categoryLabel: "E-Commerce",
    tagline: "Sub-second headless storefront with visual product configurator",
    description: "A digital commerce reference architecture featuring custom 3D model previews, instant client-side catalog filtering, and multi-currency checkout integration.",
    features: [
      "WebGL interactive 3D product view with Three.js",
      "Instant faceted search and price filtering without page reloads",
      "One-page optimized mobile checkout workflow",
      "Live currency conversion with automatic geolocation",
    ],
    techStack: ["Next.js", "React Three Fiber", "Three.js", "TypeScript", "Stripe"],
    architectureHighlights: [
      "Isolated 3D WebGL boundary with instant image fallback",
      "Edge-cached product catalog with revalidation tags",
      "Idempotent Stripe webhook payment processing",
    ],
    verificationBadge: "STARX Commerce Demo",
  },
];
