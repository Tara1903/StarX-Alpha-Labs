# STARX ALPHA LABS — BRAND MIGRATION AUDIT
**Date:** November 10, 2026  
**Subject:** Pre-Implementation Comprehensive Inventory & Rebranding Strategy  
**Source Identity:** STARX LABS / StarX Labs / starx-labs  
**Target Identity:** StarX Alpha Labs / StarX Alpha (short reference)  
**Brand Category:** Technology and Software Engineering Company  
**Ecosystem Policy:** Strict preservation of independent STARX FLOW product identity  

---

## 1. EXECUTIVE AUDIT SUMMARY

An exhaustive automated and structural repository scan was conducted across all source code, route handlers, metadata, component libraries, shared datasets, configuration files, and architectural documentation.

- **Total Direct Brand References Identified:** 71 in code/pages + 148 including division/ecosystem tokens + 24 in architectural documentation.
- **Affected Route Pages:** 19 public route files across `src/app/`.
- **Affected Marketing Components:** 6 components in `src/components/marketing/`.
- **Affected Data Modules:** 4 modules in `src/data/`.
- **Affected Core Library Configurations:** 2 files (`src/lib/constants.ts`, `src/lib/ecosystem.ts`).
- **Independent Ecosystem Boundary:** `STARX FLOW` strictly audited and preserved as an independent product entity.

---

## 2. INVENTORY OF DISCOVERED BRAND REFERENCES

### 2.1 Core Metadata & Application Configuration
| File Path | Location | Existing Old Reference | Planned StarX Alpha Labs Migration |
|---|---|---|---|
| `src/lib/constants.ts` | Line 2 | `name: "STARX LABS"` | `name: "StarX Alpha Labs"` |
| `src/lib/constants.ts` | Line 3 | `legalName: "STARX LABS Ltd."` | `legalName: "StarX Alpha Labs"` *(Unregistered trade brand note)* |
| `src/lib/constants.ts` | Line 4 | `tagline: "High-Performance Digital Engineering..."` | `tagline: "Technology & Software Engineering Company"` |
| `src/lib/constants.ts` | Line 5–6 | `"STARX LABS engineers premier custom software..."` | Baseline positioning: *"StarX Alpha Labs is a technology and software engineering company building modern digital products, intelligent applications and custom technology solutions for businesses."* |
| `src/lib/constants.ts` | Line 13–14 | `contact@starxlabs.io`, `solutions@starxlabs.io` | Documented external domain aliases |
| `src/app/layout.tsx` | Line 27–40 | Root layout metadata title template & OpenGraph | Uses updated `SITE_CONFIG` + New JSON-LD Schema |
| `src/app/api/health/route.ts` | Line 7 | `product: "STARX LABS"` | `product: "StarX Alpha Labs"` |
| `package.json` | Line 2 | `"name": "starx-labs"` | `"name": "starx-alpha-labs"` |
| `package-lock.json` | Line 2, 8 | `"name": "starx-labs"` | Synchronized with `package.json` |

### 2.2 Navigation, Footer & Visual Components
| Component | Affected Area | Current Old Representation | Planned Update |
|---|---|---|---|
| `src/components/marketing/Navbar.tsx` | Line 60–65 | `STARX LABS` + `Neural Engineering` | Wordmark: `STARX ALPHA LABS` + `Technology & Software Engineering` |
| `src/components/marketing/Footer.tsx` | Line 22–24 | `STARX LABS` Wordmark | Wordmark: `STARX ALPHA LABS` |
| `src/components/marketing/Footer.tsx` | Line 165 | `STARX Neural Architecture` | `StarX Alpha Architecture: Fully Operational` |
| `src/components/marketing/Footer.tsx` | Line 169 | `© {currentYear} {SITE_CONFIG.name}` | Fully reflects `StarX Alpha Labs` |
| `src/components/marketing/HeroSection.tsx` | Line 88 | `starx-labs://production-telemetry` | `starx-alpha-labs://production-telemetry` |
| `src/components/marketing/CompanyIntro.tsx` | Line 62 | `STARX LABS is a specialized digital engineering...` | Full baseline positioning for StarX Alpha Labs |
| `src/components/marketing/EcosystemSection.tsx` | Line 56–58 | `While STARX LABS engineers bespoke software... our sister product STARX FLOW...` | `While StarX Alpha Labs engineers bespoke software... the independently operated product STARX FLOW...` |
| `src/app/design-system/page.tsx` | Line 55, 186, 396 | `STARX LABS`, `StarX Labs AI` | `STARX ALPHA LABS`, `StarX Alpha AI` |

### 2.3 Public Routes & Page Metadata
| Route / File | Category | Content to Update |
|---|---|---|
| `src/app/about/page.tsx` | Public Page | Title, description, `About StarX Alpha Labs` badge, founding narrative |
| `src/app/divisions/page.tsx` | Public Page | Title, description, overview copy |
| `src/app/divisions/starx-ai-solutions/page.tsx` | Division | Retain slug `/divisions/starx-ai-solutions`, update metadata & headers |
| `src/app/divisions/starx-digital/page.tsx` | Division | Retain slug `/divisions/starx-digital`, update metadata & headers |
| `src/app/divisions/starx-systems/page.tsx` | Division | Retain slug `/divisions/starx-systems`, update metadata & headers |
| `src/app/services/page.tsx` | Public Page | Title: `Engineering Services Catalog — StarX Alpha Labs` |
| `src/app/services/[slug]/page.tsx` | Dynamic Service | Title: `${service.title} — StarX Alpha Labs` |
| `src/app/portfolio/page.tsx` | Public Page | Title, description: `...built by StarX Alpha Labs` |
| `src/app/portfolio/PortfolioClient.tsx` | Client Showcase | Honesty disclaimer: `StarX Alpha Labs strictly refuses...` |
| `src/app/portfolio/[slug]/page.tsx` | Dynamic Case Study | Title: `${project.title} — Case Study \| StarX Alpha Labs` |
| `src/app/industries/page.tsx` | Public Page | Title: `Industries Served — StarX Alpha Labs` |
| `src/app/industries/[slug]/page.tsx` | Dynamic Industry | Title: `${industry.name} Software & Digital Solutions — StarX Alpha Labs` |
| `src/app/pricing/page.tsx` | Public Page | Title: `Pricing & Engagement Models — StarX Alpha Labs` |
| `src/app/blog/page.tsx` | Public Page | Title: `Engineering Blog & Architectural Insights — StarX Alpha Labs` |
| `src/app/blog/[slug]/page.tsx` | Dynamic Blog | Title: `${post.title} — StarX Alpha Labs` |
| `src/app/contact/page.tsx` | Public Page | Description, introductory copy, mutual NDA terms |
| `src/app/privacy/page.tsx` | Legal Policy | Title, descriptions, data handling commitments under StarX Alpha Labs |
| `src/app/terms/page.tsx` | Legal Policy | Title, descriptions, intellectual property transfer terms under StarX Alpha Labs |
| `src/app/refund/page.tsx` | Legal Policy | Title, descriptions, milestone refund terms under StarX Alpha Labs |
| `src/app/cancellation/page.tsx` | Legal Policy | Title, descriptions, project cancellation terms under StarX Alpha Labs |
| `src/app/cookies/page.tsx` | Legal Policy | Title, descriptions, tracking policy under StarX Alpha Labs |

### 2.4 Data Datasets (`src/data/`)
| File | Old Reference | Planned Update |
|---|---|---|
| `src/data/blog.ts` | Author `STARX Engineering Team`, `STARX AI Division` | `StarX Alpha Engineering Team`, `StarX Alpha AI Division` |
| `src/data/blog.ts` | Content: `At STARX LABS...`, `STARX LABS builds custom...` | `At StarX Alpha Labs...`, `StarX Alpha Labs builds custom...` |
| `src/data/portfolio.ts` | Badges: `STARX Reference Demo`, etc. | `StarX Alpha Reference Demo`, etc. |
| `src/data/services.ts` | Category label: `STARX LABS` | `StarX Alpha Labs` |
| `src/lib/ecosystem.ts` | UTM campaign source `starxlabs` | `starx_alpha_labs` |

---

## 3. ASSETS REQUIRING UPDATES

1. **Favicon & Web App Manifest**:
   - Create Next.js App Router standard `src/app/manifest.ts` declaring `name: "StarX Alpha Labs"`, `short_name: "StarX Alpha"`.
2. **Textual Wordmarks in Vector / CSS**:
   - Primary Header wordmark in `Navbar.tsx` dynamically styled with high-contrast gradient text `STARX ALPHA LABS`.
   - Footer primary wordmark updated to `STARX ALPHA LABS`.
   - Star mark symbol `SX` preserved as the central emblem across 3D scenes and badges.
3. **Structured Data (JSON-LD)**:
   - Inject Organization and WebSite schema in `RootLayout` (`src/app/layout.tsx`).

---

## 4. METADATA AND SEO AUDIT

- **Page Titles**: Standardized template `%s | StarX Alpha Labs`, default `StarX Alpha Labs — Technology & Software Engineering Company`.
- **OpenGraph & Twitter Cards**: Updated to `StarX Alpha Labs` with the new official positioning.
- **Route Slugs & Canonical URLs**: 100% preserved. Zero URL breaking or redirection overhead.
- **Sitemap & Robots**: Dynamically driven by `SITE_CONFIG.url` and static dataset lists; preserves all 49 routes.

---

## 5. EXTERNAL DEPENDENCIES (MANUAL ACTIONS REQUIRED)

The following external items cannot safely be renamed automatically within local code:
1. **GitHub Repository Name / URL**: Currently `https://github.com/Tara1903/StarX-Labs`. Renaming remote repository to `StarX-Alpha-Labs` requires GitHub repository settings admin action.
2. **Custom Domain Name**: `starxlabs.io` -> `starxalphalabs.io` requires DNS purchase and hosting domain configuration.
3. **Supabase Cloud Project**: Project name in Supabase Management Console.
4. **Corporate Registration / Legal Entity**: Formal incorporation of "StarX Alpha Labs" as a registered entity with relevant regulatory authorities.

All external manual items are cataloged in `BRAND_MIGRATION_EXTERNAL_ACTIONS.md`.

---

## 6. MIGRATION PLAN & SEQUENCE

1. **Phase 1: Configuration & Core Identity Constants** (`src/lib/constants.ts`, `src/lib/ecosystem.ts`, `package.json`).
2. **Phase 2: Global Metadata, Root Layout & Manifest** (`src/app/layout.tsx`, `src/app/manifest.ts`, `src/app/api/health/route.ts`).
3. **Phase 3: Navigation & Footer Branding Components** (`src/components/marketing/Navbar.tsx`, `src/components/marketing/Footer.tsx`).
4. **Phase 4: Shared Datasets** (`src/data/blog.ts`, `src/data/portfolio.ts`, `src/data/services.ts`, `src/data/divisions.ts`).
5. **Phase 5: Marketing & Design System Components** (`HeroSection.tsx`, `CompanyIntro.tsx`, `EcosystemSection.tsx`, `design-system/page.tsx`, `globals.css`).
6. **Phase 6: Public & Dynamic Route Pages** (About, Divisions, Services, Portfolio, Industries, Pricing, Blog, Contact).
7. **Phase 7: Legal Governance Pages** (Privacy, Terms, Refund, Cancellation, Cookies).
8. **Phase 8: Documentation Files** (`README.md`, `ARCHITECTURE.md`, `DEVELOPMENT_ROADMAP.md`, `ENVIRONMENT_SETUP.md`, `IMPLEMENTATION_STATUS.md`, `TESTING_REPORT.md`).
9. **Phase 9: Comprehensive Build, Lint, and Runtime Verification**.
10. **Phase 10: Final Deliverables Generation** (`BRAND_MIGRATION_REPORT.md`, `BRAND_MIGRATION_EXTERNAL_ACTIONS.md`).
