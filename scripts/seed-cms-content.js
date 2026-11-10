/**
 * STARX ALPHA LABS — IDEMPOTENT CMS CONTENT SEED SCRIPT
 * Migrates Phase 1-4 existing content into dedicated Supabase tables:
 * - 10 Services
 * - 3 Divisions
 * - 7 Industries
 * - 4 Portfolio Projects
 * - 3 Blog Essays
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env.local to load credentials
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const value = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.log('[SEED SKIP] Supabase credentials not configured in .env.local. Seed script prepared for deployment.');
  process.exit(0);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

async function seed() {
  console.log('--- Starting StarX Alpha Labs CMS Content Migration ---');

  // 1. Seed Divisions
  const divisions = [
    {
      slug: 'starx-digital',
      title: 'STARX DIGITAL',
      tagline: 'High-Performance Web Architecture & Digital Commerce',
      short_description: 'Specialized in corporate websites, high-conversion landing pages, e-commerce platforms, and progressive web apps.',
      badge: 'Web & E-Commerce',
      mission: 'To eliminate slow, bloated, generic web templates and deliver hand-crafted, high-converting digital storefronts and corporate websites for market-leading brands.',
      overview: 'STARX DIGITAL delivers modern web presences that combine cinematic design with rock-solid corporate typography, sub-second response times, and measurable commercial conversion.',
      capabilities: [
        { title: 'Business & Corporate Websites', description: 'Bespoke digital headquarters that build trust and engage decision-makers.' },
        { title: 'E-Commerce & Storefronts', description: 'High-performance shopping experiences with customized checkout flows.' },
        { title: 'High-Impact Landing Pages', description: 'Tuned for paid acquisition campaigns with near-zero latency.' },
        { title: 'Progressive Web Apps (PWAs)', description: 'App-like mobile experiences installable straight from browsers.' },
      ],
      deliverables: ['Custom responsive design system', 'Full Next.js / TypeScript source code', 'SEO schema metadata'],
      tech_stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4'],
      status: 'published',
      display_order: 1,
      seo_title: 'STARX DIGITAL — Web Architecture & Digital Commerce',
      seo_description: 'High-performance web architecture, corporate websites, and e-commerce platforms.',
      published_at: new Date().toISOString(),
    },
    {
      slug: 'starx-systems',
      title: 'STARX SYSTEMS',
      tagline: 'Custom Software, Enterprise Dashboards & Microservices',
      short_description: 'Specialized in bespoke business operating systems, internal workflow engines, and distributed API gateways.',
      badge: 'Systems & Cloud',
      mission: 'To architect secure, scalable, fault-tolerant software backends that automate complex operations.',
      overview: 'STARX SYSTEMS engineers robust software architectures that power business operations with sub-second data synchronization.',
      capabilities: [
        { title: 'Bespoke Business Software', description: 'Tailored workflow platforms replacing fragmented spreadsheets.' },
        { title: 'Enterprise Dashboards', description: 'Real-time operational cockpits visualizing business telemetry.' },
        { title: 'API Gateways & Microservices', description: 'High-throughput REST and GraphQL endpoints.' },
      ],
      deliverables: ['Custom database schema and migrations', 'Zero-trust authorization matrix', 'API documentation'],
      tech_stack: ['Next.js', 'PostgreSQL', 'Supabase', 'Redis', 'Docker'],
      status: 'published',
      display_order: 2,
      seo_title: 'STARX SYSTEMS — Enterprise Software & Cloud Architecture',
      seo_description: 'Custom software engineering, high-concurrency microservices, and enterprise dashboards.',
      published_at: new Date().toISOString(),
    },
    {
      slug: 'starx-ai-solutions',
      title: 'STARX AI SOLUTIONS',
      tagline: 'Applied AI, Intelligent Workflows & Enterprise RAG',
      short_description: 'Specialized in domain-specific Retrieval-Augmented Generation, fine-tuned agentic pipelines, and computer vision.',
      badge: 'Applied AI',
      mission: 'To transition enterprises from experimental AI chat toys to deterministic, secure business automations.',
      overview: 'STARX AI SOLUTIONS bridges cutting-edge machine learning with enterprise software engineering.',
      capabilities: [
        { title: 'Enterprise RAG Pipelines', description: 'Deterministic semantic retrieval over proprietary documents.' },
        { title: 'Agentic Workflow Automation', description: 'Autonomous multi-step agents handling complex business logic.' },
        { title: 'Predictive ML & Analytics', description: 'Custom regressors and classifiers forecasting key metrics.' },
      ],
      deliverables: ['Grounded vector embedding pipelines', 'Strict hallucination guardrails', 'Model evaluation benchmarks'],
      tech_stack: ['Python', 'LangChain', 'pgvector', 'Next.js', 'FastAPI'],
      status: 'published',
      display_order: 3,
      seo_title: 'STARX AI SOLUTIONS — Enterprise AI & RAG Pipelines',
      seo_description: 'Applied artificial intelligence, grounded RAG pipelines, and agentic workflows.',
      published_at: new Date().toISOString(),
    },
  ];

  for (const div of divisions) {
    const { error } = await supabase.from('divisions').upsert(div, { onConflict: 'slug' });
    if (error) console.error(`Error seeding division ${div.slug}:`, error.message);
  }
  console.log('✓ Seeded 3 Divisions');

  // 2. Seed Services
  const services = [
    { slug: 'business-website', title: 'Business Website Development', category: 'digital', division_slug: 'starx-digital', starting_price: '$2,400', order: 1 },
    { slug: 'corporate-website', title: 'Corporate Portal Engineering', category: 'digital', division_slug: 'starx-digital', starting_price: '$4,800', order: 2 },
    { slug: 'landing-pages', title: 'High-Impact Campaign Landing Pages', category: 'digital', division_slug: 'starx-digital', starting_price: '$1,200', order: 3 },
    { slug: 'ecommerce', title: 'Modern E-Commerce Storefronts', category: 'digital', division_slug: 'starx-digital', starting_price: '$3,800', order: 4 },
    { slug: 'pwa', title: 'Progressive Web Apps (PWAs)', category: 'digital', division_slug: 'starx-digital', starting_price: '$3,200', order: 5 },
    { slug: 'custom-software', title: 'Custom Business Software', category: 'systems', division_slug: 'starx-systems', starting_price: '$6,500', order: 6 },
    { slug: 'business-applications', title: 'Operational Internal Applications', category: 'systems', division_slug: 'starx-systems', starting_price: '$4,500', order: 7 },
    { slug: 'api-integrations', title: 'API Engineering & Systems Integration', category: 'systems', division_slug: 'starx-systems', starting_price: '$2,800', order: 8 },
    { slug: 'custom-ai', title: 'Custom AI & Intelligent Automation', category: 'ai', division_slug: 'starx-ai-solutions', starting_price: '$5,500', order: 9 },
    { slug: 'maintenance', title: 'DevOps & Technical Maintenance', category: 'maintenance', division_slug: 'starx-systems', starting_price: '$499/mo', order: 10 },
  ];

  for (const s of services) {
    const servicePayload = {
      slug: s.slug,
      title: s.title,
      short_description: `Enterprise-grade ${s.title.toLowerCase()} engineered for performance, security, and measurable conversion.`,
      description: `Comprehensive engineering for ${s.title.toLowerCase()} combining modern Next.js architecture with robust backend systems.`,
      content: {
        benefits: ['Sub-second response times', 'Rigorous security architecture', 'Mobile-first responsiveness'],
        features: ['Bespoke engineering', 'Type-safe contracts', 'Full source code ownership'],
        techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'PostgreSQL'],
        scope: ['Discovery & Architecture', 'Design & Engineering', 'UAT Testing & Deployment'],
        estimatedTimeline: '2 – 6 Weeks',
        startingPrice: s.starting_price,
        faqs: [{ question: 'How is maintenance handled?', answer: 'We offer continuous SLA coverage and monitoring.' }],
      },
      category: s.category,
      category_label: s.category === 'ai' ? 'STARX AI' : s.category === 'systems' ? 'STARX SYSTEMS' : 'STARX DIGITAL',
      division_slug: s.division_slug,
      status: 'published',
      display_order: s.order,
      seo_title: `${s.title} — StarX Alpha Labs`,
      seo_description: `Professional ${s.title.toLowerCase()} services from StarX Alpha Labs.`,
      published_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('services').upsert(servicePayload, { onConflict: 'slug' });
    if (error) console.error(`Error seeding service ${s.slug}:`, error.message);
  }
  console.log('✓ Seeded 10 Services');

  // 3. Seed Industries
  const industries = [
    { slug: 'restaurants-cloud-kitchens', name: 'Restaurants & Cloud Kitchens', badge: 'Food & Hospitality', order: 1 },
    { slug: 'retail-wholesale', name: 'Retail & Wholesale', badge: 'Commerce & Distribution', order: 2 },
    { slug: 'education-training', name: 'Education & Coaching', badge: 'EdTech & Learning', order: 3 },
    { slug: 'healthcare-clinics', name: 'Healthcare & Clinical Practices', badge: 'Health & Wellness', order: 4 },
    { slug: 'real-estate-construction', name: 'Real Estate & Construction', badge: 'PropTech & Infrastructure', order: 5 },
    { slug: 'logistics-transport', name: 'Logistics & Supply Chain', badge: 'Transport & Fleet', order: 6 },
    { slug: 'professional-services', name: 'Professional Services', badge: 'Legal & Consulting', order: 7 },
  ];

  for (const ind of industries) {
    const indPayload = {
      slug: ind.slug,
      name: ind.name,
      badge: ind.badge,
      tagline: `Modern digital systems and high-throughput operational software for ${ind.name}.`,
      overview: `Tailored software architectures addressing the unique regulatory and operational needs of ${ind.name}.`,
      challenges: ['Legacy paper/spreadsheet bottlenecks', 'Unreliable customer communication', 'Data fragmentation'],
      solutions: ['Centralized cloud architecture', 'Automated customer dispatch', 'Real-time telemetry dashboards'],
      featured_capabilities: ['Automated Workflow Engine', 'Role-Based Access Control', 'Multi-tenant Isolation'],
      recommended_services: ['business-website', 'ecommerce', 'custom-software'],
      status: 'published',
      display_order: ind.order,
      seo_title: `${ind.name} Software Solutions — StarX Alpha Labs`,
      seo_description: `Enterprise digital solutions engineered for ${ind.name}.`,
      published_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('industries').upsert(indPayload, { onConflict: 'slug' });
    if (error) console.error(`Error seeding industry ${ind.slug}:`, error.message);
  }
  console.log('✓ Seeded 7 Industries');

  // 4. Seed Portfolio Projects
  const portfolio = [
    { slug: 'apex-capital-portal', title: 'Apex Capital Corporate Architecture', category: 'web', badge: 'StarX Alpha Reference Demo', order: 1 },
    { slug: 'omni-warehouse-kds', title: 'OmniLogistics Operations Console', category: 'systems', badge: 'StarX Alpha Architecture Prototype', order: 2 },
    { slug: 'cerebro-doc-rag', title: 'Cerebro Enterprise Document RAG', category: 'ai', badge: 'StarX Alpha AI Architecture Prototype', order: 3 },
    { slug: 'lux-storefront-headless', title: 'Aura Maison Headless Storefront', category: 'web', badge: 'StarX Alpha Commerce Prototype', order: 4 },
  ];

  for (const p of portfolio) {
    const portPayload = {
      slug: p.slug,
      title: p.title,
      project_type: 'Architectural Demo',
      category: p.category,
      category_label: p.category === 'ai' ? 'AI & Machine Learning' : p.category === 'systems' ? 'Systems & Software' : 'Web & Corporate Portal',
      tagline: `Production-grade architecture prototype engineered by StarX Alpha Labs.`,
      description: `A showcase of rigorous engineering: bilingual typography, real-time charts, and strict Content Security Policies.`,
      features: ['Sub-second page transitions', 'Cryptographically verified document rooms', 'Granular role permissions'],
      tech_stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4'],
      architecture_highlights: ['Row-Level Security guaranteeing isolation', 'Zero-layout-shift navigation'],
      verification_badge: p.badge,
      status: 'published',
      featured: true,
      display_order: p.order,
      seo_title: `${p.title} — StarX Alpha Labs Portfolio`,
      seo_description: `Architectural case study: ${p.title}.`,
    };

    const { error } = await supabase.from('portfolio_projects').upsert(portPayload, { onConflict: 'slug' });
    if (error) console.error(`Error seeding portfolio ${p.slug}:`, error.message);
  }
  console.log('✓ Seeded 4 Portfolio Projects');

  // 5. Seed Blog Posts
  const blog = [
    { slug: 'nextjs-16-turbopack-enterprise-architecture', title: 'Next.js 16 and Turbopack: Engineering Scalable Enterprise Web Platforms', category: 'Engineering' },
    { slug: 'practical-enterprise-rag-without-hallucinations', title: 'Practical Enterprise RAG: Grounding AI Workflows in Proprietary Data', category: 'AI & Systems' },
    { slug: 'decoupling-operational-automation-from-custom-code', title: 'Decoupling Architecture: Why Enterprise Infrastructure Requires Clean Product Isolation', category: 'Architecture' },
  ];

  for (const b of blog) {
    const blogPayload = {
      slug: b.slug,
      title: b.title,
      excerpt: `An engineering essay on modern software architecture by the StarX Alpha Labs technical team.`,
      content: `### Architecture Insights\n\nAt StarX Alpha Labs, performance, security, and data integrity are non-negotiable foundations.`,
      author_name: 'StarX Alpha Engineering Team',
      author_role: 'Platform Architecture',
      read_time: '6 min read',
      category: b.category,
      tags: ['Engineering', 'Architecture', 'TypeScript'],
      status: 'published',
      published_at: new Date().toISOString(),
      seo_title: `${b.title} — StarX Alpha Labs`,
      seo_description: `Technical deep-dive on ${b.title.toLowerCase()}.`,
    };

    const { error } = await supabase.from('blog_posts').upsert(blogPayload, { onConflict: 'slug' });
    if (error) console.error(`Error seeding blog ${b.slug}:`, error.message);
  }
  console.log('✓ Seeded 3 Blog Posts');

  console.log('--- Migration & Seeding Completed Successfully ---');
}

seed().catch(console.error);
