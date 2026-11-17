# STARX ALPHA LABS — MASTER PROJECT SPECIFICATION
## Complete Company Portal Transformation & Operational Architecture

**Company:** StarX Alpha Labs  
**Tagline:** Build Smarter. Lead Tomorrow.  
**Production Target:** [https://www.starxalphalabs.online/](https://www.starxalphalabs.online/)  
**Document Reference:** `MASTER_PROJECT_SPECIFICATION.md`  
**Architectural Baseline:** November 2026  
**Status:** **AUTHORITATIVE MASTER SPECIFICATION**  

---

## 1. COMPANY VISION & BUSINESS MODEL

StarX Alpha Labs is a complete technology company and engineering studio. We operate on a **custom-first business model**.

Clients visit the central StarX Alpha Labs portal to explore engineering capabilities, formulate requirements, generate AI-assisted design directions, obtain precise technical proposals and quotations, approve milestones, and commission StarX to engineer bespoke solutions.

### Core Strategic Mandates
1. **NOT a downloadable template marketplace:** StarX does not sell cheap, pre-packaged, static templates or retail off-the-shelf software packages.
2. **Central Operational Portal:** The platform functions as ONE unified customer-facing and operational company portal through which StarX sells, scopes, manages, and delivers engineering projects.
3. **Dual Client Entry Paths:**
   - **Path A (Direct Quotation):** Select capability → Submit detailed requirements → Architect review → Formal proposal → Approval & payment → Engineering delivery.
   - **Path B (Design Studio):** Describe idea → AI-assisted design concepts generated via Google Stitch → Revision and refinement → StarX feasibility review → Scope and quotation → Approval & payment → Engineering delivery.
4. **Decoupled Flagship (STARX FLOW):** STARX FLOW remains an independent commercial AI Business Operating System deployed on separate infrastructure ([https://flow.starx.io/](https://flow.starx.io/)) with zero shared database or auth credentials.

---

## 2. THE SIX APPROVED DIVISIONS

```
                               STARX ALPHA LABS
                                      │
    ┌─────────────┬───────────────────┼───────────────────┬─────────────┐
    ▼             ▼                   ▼                   ▼             ▼
StarX Web     StarX Apps        StarX Business        StarX SaaS     StarX AI
    │             │                   │                   │             │
    └─────────────┴───────────┬───────┴───────────────────┴─────────────┘
                              ▼
                         StarX Custom
```

### 1. StarX Web — Modern Web Platforms & Architecture
- **Focus:** High-performance web applications, enterprise corporate portals, high-conversion headless storefronts, customer portals, booking engines, and real-time operational dashboards.
- **Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion, Cloudflare / Vercel Edge.
- **Commercial Model:** Indicative monthly managed service ladders (Basic ₹499 to Ultra Max ₹8,999+) + custom upfront engineering contracts.

### 2. StarX Apps — Branded Mobile Applications
- **Focus:** Native and high-performance cross-platform mobile applications for iOS and Android. Delivery, booking, e-commerce, healthcare, education, and enterprise workforce apps.
- **Tech Stack:** React Native, Flutter, Swift, Kotlin, Supabase Mobile SDKs, WebSockets.
- **Commercial Model:** Indicative monthly service ladders (Basic ₹499 to Ultra Max ₹6,499) + milestone-based development fees.

### 3. StarX Business — Operations, ERP & POS Systems
- **Focus:** Complete operational software suites: Point of Sale (POS), table-side dining, cloud kitchen KOT dispatch, serialized inventory, multi-channel procurement, CRM, financial accounting, HR/payroll, and industry-specific ERPs.
- **Tech Stack:** PostgreSQL, Supabase RLS, Node.js, Next.js, offline-first client engines, UPI Gateway.
- **Commercial Model:** Indicative operational subscription ladders (Basic ₹999 to Ultra ₹24,999, Enterprise Custom) + deployment and hardware setup fees.

### 4. StarX SaaS — Custom Subscription Software Products
- **Focus:** Architecting and building bespoke, scalable multi-tenant SaaS platforms, collaboration tools, sales platforms, developer consoles, and specialized subscription hubs.
- **Tech Stack:** PostgreSQL Multi-tenant Schemas, Stripe/Razorpay Subscription webhooks, Redis, Docker, Supabase SSR.
- **Commercial Model:** Indicative subscription ladders (Basic ₹999 to Enterprise ₹19,999+) + proprietary development retainers.

### 5. StarX AI — Intelligent Systems & Autonomous Automation
- **Focus:** Bespoke AI agents, autonomous business workflows, domain-specific RAG pipelines, voice assistants, document intelligence, computer vision, and LLM model orchestration.
- **Tech Stack:** Google Gemini API, Anthropic Claude, OpenAI, Pgvector, LangChain, Python / TypeScript.
- **Commercial Model:** Scoped implementation fees + subscription infrastructure + usage-based AI token credits.

### 6. StarX Custom — Bespoke Enterprise Engineering
- **Focus:** Enterprise backend architecture, mission-critical APIs, cloud infrastructure, cybersecurity hardening, legacy migration, IoT/embedded systems, and 100% white-label agency engineering.
- **Tech Stack:** Distributed systems, microservices, Kubernetes, PostgreSQL, high-throughput message brokers.
- **Commercial Model:** Tailored RFP/RFQ proposals, time & materials, or milestone-based enterprise contracts.

---

## 3. THE TWELVE APPROVED INDUSTRIES

A single, canonical industry taxonomy applies across all marketing pages, service directories, quotation wizards, and the Design Studio:

1. **Retail & Commerce** — Omnichannel POS, D2C headless commerce, multi-vendor marketplaces, serialized inventory.
2. **Food & Hospitality** — Restaurant OS, KOT kitchen displays, table reservations, cloud kitchens, bar tabs, QSR kiosks.
3. **Healthcare & Life Sciences** — Clinic management, telemedicine, patient intake portals, pharmacy inventories, diagnostic labs.
4. **Education & EdTech** — Learning Management Systems (LMS), student fee portals, live cohort learning, examination platforms.
5. **Real Estate & Infrastructure** — Property management, unit inventory, broker CRMs, virtual tours, society billing.
6. **Automotive & Mobility** — Dealership management, live vehicle inventory, service scheduling, spare parts catalogues.
7. **Logistics & Supply Chain** — Fleet dispatch telemetry, route optimization, warehouse bin management, freight tracking.
8. **Manufacturing & Industrial** — Production scheduling, shop-floor OEE monitoring, BOM management, quality assurance.
9. **Finance & Professional Services** — Client onboarding portals, secure document vaults, billing engines, legal/CA practice management.
10. **Beauty, Fitness & Lifestyle** — Appointment calendars, member subscription check-in, salon POS, wellness class booking.
11. **Travel, Tourism & Events** — Venue booking, seat reservation maps, hotel booking engines, tour packaging.
12. **Technology & Digital Enterprises** — SaaS consoles, developer documentation portals, API management consoles, telemetry analytics.

---

## 4. RETIREMENT OF OBSOLETE MARKETPLACE ASSETS

1. **Public Demo Center:** Completely retired. Public routes (`/demos`, `/demos/[category]`, `/demos/[category]/[demo]`, etc.) are removed from global navigation and replaced with the **StarX Design Studio**.
2. **Video Station:** Hidden until authentic 60-second video walkthroughs are recorded. All placeholder embed URLs (`dQw4w9WgXcQ`) are eliminated.
3. **Old Fixed Packages (W1–W6, A1–A5, C1–C5):** Removed from public navigation and replaced with transparent indicative monthly ladders + custom project quotation models. Historical database records and agreements are strictly preserved.
4. **Project Calculator Transformation:** Refactored from a rigid fixed-price cart into an intelligent **Custom Project Estimator** producing indicative ranges and feeding directly into the proposal pipeline.

---

## 5. STARX DESIGN STUDIO (CORE CUSTOMER FEATURE)

The **StarX Design Studio** (`/design-studio`) is an interactive digital product workspace allowing prospective clients to explore, generate, and iterate on UI/UX directions before committing to engineering:

- **Step 1: Requirement Discovery:** The user enters business requirements, target industry, platform preference (Web, Mobile, Dual), and feature wishlists.
- **Step 2: AI-Assisted Concept Generation:** Integrates directly with the verified **Google Stitch MCP Server** (`create_project`, `generate_screen_from_text`, `get_screen`, `download_file`, `generate_variants`).
- **Step 3: Interactive Design Workspace:** Allows clients to view generated wireframes, screens, and design systems in real-time.
- **Step 4: Revision & Feedback:** Clients submit annotations, request style/theme adjustments, or generate layout variants.
- **Step 5: StarX Architectural Feasibility Review:** Technical leads review the design direction, formulate the exact tech stack, determine delivery milestones, and issue an authoritative quotation.
- **Step 6: Engineering Handoff:** Once the proposal and initial deposit are approved, the project transitions into active engineering inside the Customer Portal.

---

## 6. VISUAL IDENTITY: STARX COSMIC LIQUID GLASS

The entire portal follows the **StarX Cosmic Liquid Glass** visual identity:

- **Core Midnight Navy:** `#030B24` (Deep space canvas)
- **Deep Navy Surface:** `#071638` (Translucent glass containers)
- **Surface Border:** `#0A1940` (Subtle boundary framing)
- **Electric Cyan:** `#00D9FF` (Laser highlights, active indicators, primary accents)
- **Corporate Blue:** `#087BFF` (Deep trust and structured UI elements)
- **Magenta Glow:** `#E52BFF` (High-energy accents, gradient stops, premium actions)
- **Warm Amber:** `#FF941F` (System status, warnings, conversion warmth)

Key visual characteristics:
- Layered backdrop blurs (`backdrop-blur-xl`, `backdrop-blur-md`).
- Controlled cyan and magenta radial ambient depth glows.
- Clean 1px translucent glass borders (`border-white/10`, `border-[#00D9FF]/20`).
- Responsive 3D perspective tilt on interactive desktop cards.
- Respect for `prefers-reduced-motion` and strict WCAG AA contrast compliance.

---

## 7. EXECUTION ROADMAP

- **Phase 0:** Project Discovery & Safety Baseline *(COMPLETE)*
- **Phase 1:** Company Information Architecture *(Current)*
- **Phase 2:** Commercial Catalogue & Project Data Models
- **Phase 3:** Cosmic Liquid Glass Design System Standard
- **Phase 4:** Public Website Transformation
- **Phase 5:** StarX Design Studio & Stitch MCP Engine
- **Phase 6:** Enquiry, Quotation & Ordering Pipeline
- **Phase 7:** Customer Client Portal Enhancement
- **Phase 8:** Super Admin Console & Operational CRM
- **Phase 9:** Payments, Invoicing & Notifications
- **Phase 10:** SEO, Accessibility, Security & Performance Hardening
- **Phase 11:** Production Verification, Audit & Deployment Readiness
