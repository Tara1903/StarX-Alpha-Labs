export interface DivisionItem {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  badge: string;
  mission: string;
  overview: string;
  capabilities: { title: string; description: string }[];
  deliverables: string[];
  techStack: string[];
}

export const DIVISIONS_DATA: DivisionItem[] = [
  {
    slug: "starx-digital",
    name: "STARX DIGITAL",
    tagline: "High-Performance Web Architecture & Digital Commerce",
    shortDescription: "Specialized in corporate websites, high-conversion landing pages, e-commerce platforms, and progressive web apps.",
    badge: "Web & E-Commerce",
    mission: "To eliminate slow, bloated, generic web templates and deliver hand-crafted, high-converting digital storefronts and corporate websites for market-leading brands.",
    overview: "STARX DIGITAL delivers modern web presences that combine cinematic design with rock-solid corporate typography, sub-second response times, and measurable commercial conversion.",
    capabilities: [
      {
        title: "Business & Corporate Websites",
        description: "Bespoke digital headquarters that build trust, articulate complex value propositions, and engage executive decision-makers.",
      },
      {
        title: "E-Commerce & Digital Storefronts",
        description: "High-performance shopping experiences with customized checkout flows, automated inventory, and multi-currency support.",
      },
      {
        title: "High-Impact Landing Pages",
        description: "Tuned for paid acquisition campaigns and product launches with near-zero latency and high conversion rates.",
      },
      {
        title: "Progressive Web Apps (PWAs)",
        description: "App-like mobile experiences installable straight from browsers, with offline capability and push notifications.",
      },
      {
        title: "Enterprise Redesigns & Replatforming",
        description: "Safe migrations from legacy, slow CMS platforms to modern headless Next.js architectures without SEO ranking loss.",
      },
      {
        title: "Search & Core Web Vitals Optimization",
        description: "Deep technical SEO, semantic structured schemas, optimized media delivery, and top-tier Google speed scores.",
      },
    ],
    deliverables: [
      "Custom responsive design system",
      "Full Next.js / TypeScript source code",
      "SEO schema metadata & Open Graph assets",
      "Automated CI/CD deployment pipeline",
      "Comprehensive performance audit report",
    ],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Motion", "Vercel / Cloudflare"],
  },
  {
    slug: "starx-systems",
    name: "STARX SYSTEMS",
    tagline: "Custom Enterprise Software & Scalable Web Applications",
    shortDescription: "Engineered for operational complexity: bespoke web applications, internal portals, custom ERP/CRM tools, and API architectures.",
    badge: "Custom Software",
    mission: "To liberate businesses from rigid, costly SaaS subscriptions by building proprietary software assets tailored exactly to their operational workflows.",
    overview: "STARX SYSTEMS architects mission-critical web applications that streamline high-volume operations, eliminate repetitive manual workflows, and scale with organizational growth.",
    capabilities: [
      {
        title: "Custom Web Applications",
        description: "Bespoke SaaS platforms and portals built with robust multi-tenant architectures and strict role-based access control.",
      },
      {
        title: "Business-Specific Software",
        description: "Custom operational software designed around your company's unique business logic, compliance rules, and workflows.",
      },
      {
        title: "Operations & Management Portals",
        description: "Centralized internal command consoles that unify distributed teams, inventory status, tasks, and company assets.",
      },
      {
        title: "Customer-Facing Portals",
        description: "Secure, polished account dashboards where clients manage subscriptions, view project milestones, and submit requests.",
      },
      {
        title: "API Architecture & Integrations",
        description: "High-throughput REST and GraphQL endpoints, webhook event pipelines, and secure third-party gateway bridges.",
      },
      {
        title: "Custom Dashboards & Business Intelligence",
        description: "Real-time analytics and financial charts that transform raw database rows into actionable executive intelligence.",
      },
    ],
    deliverables: [
      "Full system architecture & ERD documentation",
      "PostgreSQL database schemas with RLS security policies",
      "Type-safe API routes & validation schemas",
      "Role-based authentication & audit logging",
      "Staging & production deployment environments",
    ],
    techStack: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Supabase", "Redis", "Docker"],
  },
  {
    slug: "starx-ai-solutions",
    name: "STARX AI SOLUTIONS",
    tagline: "Bespoke Artificial Intelligence & Intelligent System Integrations",
    shortDescription: "Application-embedded AI capabilities, proprietary RAG pipelines, semantic search, and intelligent workflow features.",
    badge: "Intelligent Systems",
    mission: "To integrate practical, high-value artificial intelligence directly into client software architectures without hype, hallucination risk, or data exposure.",
    overview: "STARX AI SOLUTIONS develops tailored AI capabilities embedded directly inside your software platforms. We avoid generic chat wrappers and build deep, domain-specific AI engines.",
    capabilities: [
      {
        title: "Custom AI Applications & Models",
        description: "Bespoke AI applications built for specialized industry analysis, classification, and domain reasoning.",
      },
      {
        title: "Retrieval-Augmented Generation (RAG)",
        description: "Grounded AI search across internal manuals, legal documents, contracts, and knowledge bases using pgvector.",
      },
      {
        title: "Embedded Intelligent Features",
        description: "Adding natural language summaries, smart autofill, and predictive suggestions directly into existing workflows.",
      },
      {
        title: "Automated Document Processing",
        description: "High-accuracy extraction and structured schema validation from unstructured PDFs, receipts, invoices, and scans.",
      },
      {
        title: "Semantic Search & Vector Indexing",
        description: "Enabling intuitive conceptual search across large catalogs and databases beyond basic keyword matching.",
      },
      {
        title: "AI Safety Guardrails & Model Evaluation",
        description: "Comprehensive benchmark suites and input/output guardrails ensuring compliance, accuracy, and brand safety.",
      },
    ],
    deliverables: [
      "Vector database pipeline & embedding architecture",
      "Evaluated model prompt suites & guardrails",
      "Zero-retention data privacy compliance setup",
      "API endpoints & interactive UI components",
      "Token usage & inference latency monitoring",
    ],
    techStack: ["OpenAI API", "Anthropic Claude API", "Google Gemini", "Pgvector", "LangChain", "Python / TypeScript"],
  },
];
