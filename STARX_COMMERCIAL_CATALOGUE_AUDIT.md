# STARX ALPHA LABS — MASTER COMMERCIAL CATALOGUE AUDIT
**Document ID:** `STARX-AUD-CAT-001`  
**Date:** November 18, 2026  
**Status:** COMPLETE & AUTHORITATIVE  
**Repository:** `C:\Web Apps\StarX Alpha Labs`  
**Branch:** `feat/portal-transformation`  
**Author:** Principal Commercial Architect & Technical Lead  

---

## 1. EXECUTIVE SUMMARY & AUDIT OBJECTIVE

This audit establishes the baseline for the StarX Alpha Labs Master Commercial Catalogue and Pricing Engine. The objective is to replace fragmented, hardcoded, and legacy pricing data with a database-driven, multi-component commercial system across all six canonical divisions, twelve industries, and dozens of solution archetypes.

### Audit Scope
1. **Existing Plans & Tiers:** Audited `src/data/plans.ts`, `src/types/plans.ts`, and legacy `src/data/developmentPackages.ts`.
2. **Pricing Models & Currencies:** Evaluated INR (₹) base pricing, USD ($) export pricing, and billing models.
3. **Service & Solution Categories:** Inspected division coverage, solution mappings, and industry connections.
4. **Feature & Add-on Taxonomy:** Analyzed feature classifications, groups, limits, and compatibility rules.
5. **Recommendation Engine:** Reviewed `src/lib/plans/recommendationEngine.ts` and algorithmic determinism.
6. **Admin Centre Management:** Audited `SuperAdminPortal.tsx` and `PricingPackagesModule.tsx`.
7. **Database Migrations & Tables:** Checked Supabase PostgreSQL schemas and live database schema cache.

---

## 2. CANONICAL CLASSIFICATION OF EXISTING ASSETS

Every commercial asset in the codebase has been inspected and classified under one of the six canonical categories:

| Asset / File / Entity | Current Location | Classification | Action & Treatment |
|---|---|---|---|
| **Canonical Plan Types** | `src/types/plans.ts` | **VERIFIED AND REUSABLE** | Retain base interface; expand with Solution IDs, Plan Families, Plan Versions, explicit limits, and multi-component pricing. |
| **Recommendation Engine Algorithm** | `src/lib/plans/recommendationEngine.ts` | **VERIFIED AND REUSABLE** | Multi-factor complexity scoring (1–10) works well; upgrade to evaluate solution-level compatibility and mandatory feature coverage. |
| **Design Studio Step 13 & 14** | `src/components/design-studio/steps/chapter3/` | **INCOMPLETE** | Step 13 queries `/api/design-studio/plans` but lacks solution-level filtering and deep feature comparison; Step 14 uses hardcoded mock add-ons instead of database records. |
| **Canonical Plans (24 Plans)** | `src/data/plans.ts` | **INCOMPLETE / UNAPPROVED** | Covers all 6 divisions across 4 tiers (Starter, Growth, Enterprise, Custom), but plans are division-wide rather than solution-specific (e.g. Web is generic rather than Ecommerce vs Web App). Prices lack board sign-off (mark as `DRAFT`). |
| **Legacy Packages (W1–W6, A1–A5, C1–C5)** | `src/data/developmentPackages.ts` | **OUTDATED & DUPLICATE** | Deprecated 3-division flat-fee package model. Must NOT be restored or used for customer-facing onboarding. Retain strictly as read-only historical reference. |
| **Admin PricingPackagesModule** | `src/components/admin/modules/PricingPackagesModule.tsx` | **OUTDATED** | Currently displays the legacy W1–W6 packages and estimates. Must be upgraded to the `CommercialCatalogueModule` managing the full commercial catalogue. |
| **Database Schema Migration** | `supabase/migrations/20261117000002_master_platform_architecture.sql` | **INCOMPLETE** | Defined `canonical_plans`, `canonical_features`, `plan_features`, `recommendation_rules`, but was not yet applied to the remote Supabase database schema cache. |
| **Solution-Level Hierarchy** | N/A | **MISSING** | Hierarchy currently jumps from Division directly to Plan without intermediate Solution and Plan Family entities. |
| **Multi-Component Pricing** | N/A | **MISSING** | No formal separation between one-time development, setup, recurring maintenance, per-seat licensing, and metered AI usage. |
| **Pricing Approval Workflow** | N/A | **MISSING** | No status machine (`DRAFT` → `INTERNAL_REVIEW` → `APPROVED` → `PUBLISHED` → `ARCHIVED`) or audit log for price alterations. |

---

## 3. DIVISION & INDUSTRY COVERAGE AUDIT

### 3.1 The Six Canonical Divisions
The application must authoritatively support six canonical engineering divisions:
1. **StarX Web (`starx-web`):** Business websites, corporate websites, landing pages, custom ecommerce, full-stack web applications, enterprise portals, booking platforms, and dashboards.
2. **StarX Apps (`starx-apps`):** Native Android (Kotlin/Compose), Native iOS (Swift/SwiftUI), Cross-platform (React Native/Flutter), on-demand delivery, enterprise mobile apps, and offline-first field apps.
3. **StarX Business (`starx-business`):** Cloud POS & billing, multi-warehouse inventory, restaurant operational suites, custom CRM, lightweight ERP, HR/payroll, and business intelligence.
4. **StarX SaaS (`starx-saas`):** Multi-tenant B2B SaaS platforms, productivity software, analytics platforms, subscription billing engines, and developer tools.
5. **StarX AI (`starx-ai`):** Autonomous agent workflows, custom copilots, voice AI receptionists, RAG document intelligence, computer vision, and multi-agent orchestration.
6. **StarX Custom (`starx-custom`):** Bespoke software engineering, legacy modernization, high-concurrency backend/API engineering, IoT systems, cloud infrastructure, and dedicated squads.

### 3.2 The Twelve Canonical Industries
Every solution and plan family must link cleanly to the 12 verified industries:
1. `retail-commerce`: Retail, Ecommerce, D2C, Wholesale
2. `healthcare-life-sciences`: Clinics, Hospitals, Telemedicine, Diagnostics, Pharma
3. `real-estate-property`: Real Estate Agencies, Developers, Property Management, PropTech
4. `education-edtech`: Schools, Colleges, Coaching, LMS, EdTech Marketplaces
5. `financial-services`: FinTech, NBFC, Wealth Management, Microfinance, Accounting
6. `hospitality-travel`: Hotels, Resorts, Restaurants, Cafes, Travel Booking
7. `logistics-supply-chain`: Fleet Management, Freight, Courier, Warehousing
8. `media-entertainment`: Digital Creators, Streaming, Publishing, Gaming, Events
9. `professional-services`: Legal, Consulting, Design Agencies, Corporate Services
10. `manufacturing-industrial`: Factories, Production Tracking, Machinery, OEM
11. `fitness-wellness`: Gyms, Spas, Wellness Studios, Personal Trainers
12. `public-sector-gov`: Municipalities, Citizen Portals, Public Utilities

---

## 4. DETAILED GAP ANALYSIS

### Gap 1: Solution Archetype Granularity
*Current State:* When a user selects `StarX Web`, `src/data/plans.ts` serves `web-starter` (₹49,999), `web-growth` (₹1,49,999), `web-enterprise` (₹3,49,999), and `web-custom` (₹7,50,000+).  
*Flaw:* A customer requesting a 3-page Landing Page or an Ecommerce Storefront receives the identical generic "Web Presence" plans rather than dedicated Ecommerce or Landing Page plans with tailored features (cart, payment gateway, inventory sync) and realistic pricing.  
*Required Solution:* Introduce `canonical_solutions` and `canonical_plan_families` (e.g. `web-ecommerce`, `web-business-site`, `web-app-platform`, `apps-cross-platform`, `biz-pos-inventory`, `ai-agent-copilot`).

### Gap 2: Feature Grouping and Commercial Classification
*Current State:* Features are currently just arrays of `{ id, name, description, category }` attached directly inside each plan object.  
*Flaw:* No centralized master feature catalogue; features cannot be marked as `INCLUDED`, `OPTIONAL_ADDON`, `HIGHER_TIER_ONLY`, `CUSTOM_ENGINEERING`, or `UNSUPPORTED` relative to a selected plan. Step 14 cannot dynamically display what upgrades exist.  
*Required Solution:* Build `canonical_features` (150+ granular features across 16 groups) and a junction table/mapping `plan_features` with explicit classifications and quantity limitations.

### Gap 3: Pricing Engine & Cost Architecture Separation
*Current State:* Plans only hold flat `priceINR` and `priceUSD` numbers.  
*Flaw:* Cloud hosting, post-launch maintenance, AI token/voice consumption, and multi-platform fees are either omitted or merged into an ambiguous lump sum.  
*Required Solution:* Multi-component pricing model separating:
- One-Time Development
- Architecture Setup & Deployment
- Recurring Operations & Maintenance (Monthly/Annual)
- Metered Usage (AI tokens, voice minutes, SMS/WhatsApp)
- Per-Seat / Per-Outlet Licensing (for Business software)
- Configurable GST/Tax handling.

### Gap 4: Database State & Schema Synchronisation
*Current State:* Remote Supabase PostgreSQL instance has active `leads` and `profiles` tables, but `canonical_plans` and related tables return "Could not find table in schema cache".  
*Required Solution:* Create migration `20261118000001_commercial_catalogue_engine.sql` containing all commercial entities, and provide an authoritative in-memory TypeScript commercial catalogue fallback so that the application functions 100% reliably in all environments (production, staging, local, serverless).

---

## 5. AUDIT CONCLUSION & MANDATE
The existing `src/data/plans.ts` provides a solid architectural foundation (24 plans across 6 divisions), while `developmentPackages.ts` is confirmed obsolete and must be permanently decommissioned from active workflows. The next action is to establish the master canonical data model, author the comprehensive seed data, integrate the database and Admin Centre, and bind Step 13 and Step 14 to the authoritative commercial catalogue.
