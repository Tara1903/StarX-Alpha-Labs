export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
  category: "digital" | "systems" | "ai" | "maintenance";
  categoryLabel: string;
  divisionSlug: string;
  overview: string;
  benefits: string[];
  features: string[];
  techStack: string[];
  scope: string[];
  estimatedTimeline: string;
  startingPrice: string;
  faqs: { question: string; answer: string }[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: "business-website",
    title: "Business Website Development",
    shortDescription: "Modern, performant, mobile-first websites designed to build brand authority and generate inbound leads.",
    category: "digital",
    categoryLabel: "STARX DIGITAL",
    divisionSlug: "starx-digital",
    overview: "We engineer high-performance business websites that present your company with authority, deliver lightning-fast page speeds, and convert visitors into qualified business inquiries.",
    benefits: [
      "Sub-second Largest Contentful Paint (LCP) performance",
      "Full mobile and tablet responsive optimization",
      "Built-in on-page SEO and structured metadata",
      "Clean, maintainable component architecture",
    ],
    features: [
      "Custom responsive design (no generic pre-made themes)",
      "Next.js App Router with server-side rendering",
      "Tailwind CSS custom design system styling",
      "Secure contact and lead capture integration",
      "Google Analytics & Core Web Vitals telemetry",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel / Cloudflare"],
    scope: [
      "Discovery & wireframing",
      "Bespoke visual design & copy layout",
      "Frontend engineering & interactive animations",
      "SEO & accessibility verification",
      "Deployment & domain DNS configuration",
    ],
    estimatedTimeline: "2 – 4 Weeks",
    startingPrice: "$2,400",
    faqs: [
      {
        question: "Do you use WordPress or custom code?",
        answer: "We build using modern Next.js and React rather than WordPress, ensuring superior speed, zero plugin vulnerabilities, and rock-solid uptime.",
      },
      {
        question: "Can we update our website content later?",
        answer: "Yes, we integrate headless content management solutions or structured JSON datasets so your team can easily update content.",
      },
    ],
  },
  {
    slug: "corporate-portal",
    title: "Corporate Website Development",
    shortDescription: "Multi-regional, high-security corporate portals with investor relations, governance, and multilingual architecture.",
    category: "digital",
    categoryLabel: "STARX DIGITAL",
    divisionSlug: "starx-digital",
    overview: "Engineered for mid-market and enterprise corporations requiring multi-departmental pages, compliance standards, high-availability architecture, and international localization.",
    benefits: [
      "Enterprise-grade security and sanitized inputs",
      "Bilingual and multilingual localization readiness",
      "Role-specific governance and newsroom publishing",
      "Strict WCAG 2.1 AA accessibility conformance",
    ],
    features: [
      "Multi-page enterprise architecture with hierarchical navigation",
      "Corporate brand guideline enforcement",
      "Investor relations, press, and careers modules",
      "Interactive data visualizations and reporting charts",
      "Custom security headers and CSP configurations",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "Supabase"],
    scope: [
      "Stakeholder discovery & information architecture",
      "Design systems & typography scale approval",
      "Multi-route implementation & localization",
      "Security audit & penetration review",
      "Production deployment with SLA coverage",
    ],
    estimatedTimeline: "4 – 8 Weeks",
    startingPrice: "$5,500",
    faqs: [
      {
        question: "Can this portal handle international traffic?",
        answer: "Yes, our deployments use global Edge CDN distribution to ensure instant delivery from over 300 points of presence worldwide.",
      },
    ],
  },
  {
    slug: "landing-pages",
    title: "High-Conversion Landing Pages",
    shortDescription: "Laser-focused landing pages engineered for specific advertising campaigns, product launches, and lead generation.",
    category: "digital",
    categoryLabel: "STARX DIGITAL",
    divisionSlug: "starx-digital",
    overview: "Built for marketing leaders needing maximum conversion rates. Every element, headline, form, and animation is tuned for rapid loading and measurable response.",
    benefits: [
      "Optimized for high Google Ads Quality Scores",
      "Zero layout shift (CLS < 0.05) for smooth user flow",
      "Direct webhook synchronization to your email/CRM platform",
    ],
    features: [
      "A/B test ready component architecture",
      "Interactive value proposition calculators",
      "Integrated lead capture with real-time validation",
      "Social proof and trust guarantee modules",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    scope: [
      "Funnel review & copywriting collaboration",
      "Single-page high-impact UI design",
      "Form validation & webhook integration",
      "Speed optimization & tag management setup",
    ],
    estimatedTimeline: "1 – 2 Weeks",
    startingPrice: "$1,500",
    faqs: [
      {
        question: "Can we connect this to our existing CRM?",
        answer: "Yes, we connect form submissions directly to your CRM, email service, or webhook endpoint.",
      },
    ],
  },
  {
    slug: "ecommerce",
    title: "E-Commerce & Digital Storefronts",
    shortDescription: "Fast, custom storefronts engineered for high conversion, frictionless checkout, and reliable inventory management.",
    category: "digital",
    categoryLabel: "STARX DIGITAL",
    divisionSlug: "starx-digital",
    overview: "We architect bespoke digital commerce platforms that deliver speed, custom product configuration, and seamless payment gateway integrations without template bloat.",
    benefits: [
      "Sub-second catalog browsing and instant client-side filtering",
      "PCI-DSS compliant checkout integration",
      "Automated tax, currency, and shipping fee calculations",
    ],
    features: [
      "Custom product catalog & variant matrix",
      "Stripe / payment gateway integration",
      "Cart management & checkout state machine",
      "Order tracking & automated invoice delivery",
      "Customer account & order history portal",
    ],
    techStack: ["Next.js", "React", "TypeScript", "PostgreSQL / Supabase", "Stripe API"],
    scope: [
      "Product catalog modeling & payment architecture",
      "Storefront UI design & shopping cart UX",
      "Secure payment checkout integration",
      "Order workflow automation & notification webhooks",
      "Load testing & launch verification",
    ],
    estimatedTimeline: "5 – 10 Weeks",
    startingPrice: "$6,800",
    faqs: [
      {
        question: "Which payment gateways do you support?",
        answer: "We support Stripe, PayPal, Razorpay, Authorize.net, and custom bank gateways.",
      },
    ],
  },
  {
    slug: "pwa",
    title: "Progressive Web Applications (PWAs)",
    shortDescription: "App-like experiences that run directly in web browsers with offline caching, push notifications, and home-screen installation.",
    category: "digital",
    categoryLabel: "STARX DIGITAL",
    divisionSlug: "starx-digital",
    overview: "PWAs deliver the speed, responsiveness, and tactile experience of native mobile apps without requiring App Store downloads or platform-specific commissions.",
    benefits: [
      "Installable on iOS and Android devices directly from browser",
      "Offline caching via service workers",
      "Instant loading on low-bandwidth cellular networks",
    ],
    features: [
      "Web App Manifest & custom app icons",
      "Service worker background caching strategies",
      "Hardware-accelerated touch gestures and transitions",
      "Background data synchronization",
    ],
    techStack: ["Next.js", "TypeScript", "Workbox", "Tailwind CSS"],
    scope: [
      "Mobile UX workflow design",
      "Service worker cache architecture",
      "Install prompt & touch UI implementation",
      "Cross-device mobile QA testing",
    ],
    estimatedTimeline: "3 – 6 Weeks",
    startingPrice: "$3,800",
    faqs: [
      {
        question: "Can users install the PWA on iPhones?",
        answer: "Yes, Safari on iOS fully supports 'Add to Home Screen' with standalone app window execution.",
      },
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software Development",
    shortDescription: "Tailor-made software platforms engineered to automate complex business logic, reduce operational friction, and scale.",
    category: "systems",
    categoryLabel: "STARX SYSTEMS",
    divisionSlug: "starx-systems",
    overview: "When off-the-shelf software doesn't fit your operational requirements, STARX SYSTEMS architects bespoke enterprise software tailored precisely to your company's workflows.",
    benefits: [
      "100% proprietary code ownership with zero monthly per-seat licensing",
      "Engineered to match your exact business operational models",
      "Scalable database architecture with strict Row-Level Security",
    ],
    features: [
      "Multi-tenant or dedicated single-tenant architectures",
      "Granular role-based access control (RBAC)",
      "Audit logging & compliance event tracing",
      "Comprehensive data export and automated reporting",
    ],
    techStack: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Supabase", "Docker"],
    scope: [
      "Deep domain workflow discovery & data modeling",
      "System architecture blueprint & DB schema design",
      "Core business logic implementation & testing",
      "Staging validation & security assessment",
      "Production deployment with training documentation",
    ],
    estimatedTimeline: "8 – 16 Weeks",
    startingPrice: "$12,000",
    faqs: [
      {
        question: "Do we own the source code?",
        answer: "Yes. 100% of the custom source code, documentation, and database schemas are transferred to your company upon project completion.",
      },
    ],
  },
  {
    slug: "business-applications",
    title: "Business-Specific Applications",
    shortDescription: "Internal portals, operations management tools, inventory consoles, and specialized workflow systems.",
    category: "systems",
    categoryLabel: "STARX SYSTEMS",
    divisionSlug: "starx-systems",
    overview: "Purpose-built operations portals that replace messy spreadsheets, disconnected legacy tools, and manual data entry with clean, unified web applications.",
    benefits: [
      "Eliminate human data entry errors across departments",
      "Real-time visibility into inventory, orders, and task states",
      "Streamlined employee onboarding with intuitive UI",
    ],
    features: [
      "Data tables with advanced search, filtering, and export",
      "Automated status transitions and task assignment",
      "Document generation (PDF invoices, work orders, receipts)",
      "Secure staff authentication & session management",
    ],
    techStack: ["Next.js", "React 19", "TypeScript", "Supabase", "Tailwind CSS"],
    scope: [
      "Current process audit & bottleneck mapping",
      "Interactive wireframing & prototype validation",
      "Database schema & CRUD endpoint implementation",
      "Data migration from legacy spreadsheets",
      "User testing & operational rollout",
    ],
    estimatedTimeline: "6 – 12 Weeks",
    startingPrice: "$8,500",
    faqs: [
      {
        question: "Can we import our existing Excel or CSV data?",
        answer: "Yes, we build custom data migration scripts to sanitize and import your historical records into the new system.",
      },
    ],
  },
  {
    slug: "api-integrations",
    title: "API Development & System Integrations",
    shortDescription: "Robust REST and GraphQL APIs, webhook event buses, and custom integrations between disparate enterprise platforms.",
    category: "systems",
    categoryLabel: "STARX SYSTEMS",
    divisionSlug: "starx-systems",
    overview: "Connect your isolated software systems. We engineer resilient API bridges that synchronize data, trigger automated events, and eliminate manual duplicate data entry.",
    benefits: [
      "Real-time bidirectional data synchronization",
      "Automated retry mechanisms and dead-letter queues",
      "Comprehensive API documentation (OpenAPI / Swagger)",
    ],
    features: [
      "Secure OAuth2, API key, and JWT token authentication",
      "Rate limiting and request throttling protection",
      "Payload validation using strict Zod schemas",
      "Telemetry, error alerting, and structured logging",
    ],
    techStack: ["Node.js", "TypeScript", "Next.js Route Handlers", "PostgreSQL", "Redis"],
    scope: [
      "Endpoint specification & data contract design",
      "Authentication & security gateway setup",
      "Integration handler implementation & mocking",
      "Load testing & latency optimization",
      "Documentation delivery & developer handoff",
    ],
    estimatedTimeline: "3 – 6 Weeks",
    startingPrice: "$4,500",
    faqs: [
      {
        question: "How do you handle API errors and network drops?",
        answer: "We engineer idempotent request handling, exponential backoff retries, and failure alerts so data is never lost during transient network outages.",
      },
    ],
  },
  {
    slug: "custom-ai",
    title: "Custom AI Application Development",
    shortDescription: "Application-embedded AI capabilities, proprietary RAG pipelines, and intelligent software features built to your specs.",
    category: "ai",
    categoryLabel: "STARX AI SOLUTIONS",
    divisionSlug: "starx-ai-solutions",
    overview: "We integrate artificial intelligence directly into your core business applications. From context-aware document analysis to intelligent automation, we build tailored AI features for your unique datasets.",
    benefits: [
      "Trained and grounded on your specific internal business data",
      "Strict data privacy — zero customer data used for model retraining",
      "Predictable latency and model fallback architectures",
    ],
    features: [
      "Retrieval-Augmented Generation (RAG) with vector databases",
      "Automated document summarization, extraction, and verification",
      "Semantic search and natural language database querying",
      "Custom model prompt engineering and automated guardrails",
    ],
    techStack: ["OpenAI / Anthropic APIs", "Gemini", "Pgvector", "TypeScript", "LangChain"],
    scope: [
      "AI feasibility analysis & data privacy assessment",
      "Embedding model selection & vector pipeline design",
      "Application integration & UI embedding",
      "Evaluation benchmark testing & output hallucination checks",
      "Deployment with token usage monitoring",
    ],
    estimatedTimeline: "6 – 12 Weeks",
    startingPrice: "$9,500",
    faqs: [
      {
        question: "Is this the same as STARX FLOW?",
        answer: "No. STARX FLOW provides general-purpose business automations like AI receptionists and CRM workflows. STARX AI SOLUTIONS builds bespoke, deep AI architectures integrated directly into custom proprietary software.",
      },
      {
        question: "Is our proprietary company data safe?",
        answer: "Yes. We configure enterprise zero-retention data policies with leading model providers, and vector embeddings remain securely isolated inside your private database.",
      },
    ],
  },
  {
    slug: "maintenance",
    title: "Technical Maintenance & SLA Support",
    shortDescription: "Proactive security patching, continuous performance monitoring, zero-downtime updates, and dedicated engineering support.",
    category: "maintenance",
    categoryLabel: "StarX Alpha Labs",
    divisionSlug: "starx-systems",
    overview: "Protect your digital investment. Our engineering team provides continuous monitoring, automated backups, regular dependency updates, and guaranteed response times.",
    benefits: [
      "Guaranteed priority response times (under 2 hours for critical incidents)",
      "Proactive vulnerability scanning and dependency patching",
      "Continuous speed and Core Web Vitals maintenance",
    ],
    features: [
      "24/7 automated uptime and latency monitoring",
      "Automated off-site database backups with tested restore plans",
      "Monthly architectural health and security audit reports",
      "Dedicated monthly engineering sprint hours for feature iterations",
    ],
    techStack: ["Datadog", "Sentry", "GitHub Actions", "Vercel / AWS", "Supabase"],
    scope: [
      "Monitoring agent integration & alerting setup",
      "Backup automation & disaster recovery drill",
      "Monthly security patching & framework upgrades",
      "Continuous bug fixes & small feature requests",
    ],
    estimatedTimeline: "Ongoing Monthly Engagement",
    startingPrice: "$850 / month",
    faqs: [
      {
        question: "Can we cancel or upgrade our maintenance plan?",
        answer: "Yes, our maintenance agreements are flexible month-to-month or annual contracts with 30-day cancellation terms.",
      },
    ],
  },
];
