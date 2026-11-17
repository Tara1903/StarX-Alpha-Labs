# STARX ALPHA LABS — ADMIN CENTRE BASELINE AUDIT

**Project:** StarX Alpha Labs  
**Website:** https://www.starxalphalabs.online/  
**Tagline:** Build Smarter. Lead Tomorrow.  
**Baseline Git Tag:** `backup-pre-admin-centre-master-20261118`  
**Current Branch:** `feat/portal-transformation`  
**Date of Audit:** 18 November 2026  
**Status:** Audit Complete · Upgrade Path Defined

---

## 1. Executive Summary

StarX Alpha Labs is an elite, high-velocity technology agency delivering bespoke digital platforms, enterprise cloud architectures, and autonomous AI systems. A critical requirement of the platform transformation is establishing a unified, production-grade **Admin Centre** that serves as the single source of truth for all business operations, customer enquiries, Design Studio generations, quotations, and active delivery projects.

This audit evaluates the entire administrative ecosystem across three layers:
1. **Frontend Presentation & State Layer:** `src/app/admin`, `src/components/admin/SuperAdminPortal.tsx`, `AdminSidebar.tsx`, `AdminHeader.tsx`, and 13 functional modules in `src/components/admin/modules/`.
2. **Backend API & Middleware Layer:** 28 admin API routes under `src/app/api/admin/` covering CRM, finance, CMS, forge, gateway, members, and audit logs.
3. **Authoritative Persistence Layer:** Supabase PostgreSQL database schemas (`quote_requests`, `customer_enquiries`, `design_studio_projects`, `design_generation_jobs`, `design_artifacts`, `canonical_plans`, `canonical_features`, `quotations`, `invoices`, `payments`, `client_projects`, `admin_members`, `audit_logs`, `audit_events`).

### Key Discovery: The Core Disconnect
The customer-facing **Design Studio** and **Build with StarX** flows actively store live customer enquiries inside Supabase (`quote_requests` with full `metadata.project`, `metadata.artifact`, `metadata.job`, and `metadata.contactProfile` payloads). However, the existing `SuperAdminPortal.tsx` was hydrating its internal state (`unifiedLeads`, `demoRequests`, `agencyEnquiries`) using static fallback arrays (`DEMO-73921`, `AGY-9104`). 

Connecting `SuperAdminPortal.tsx` and `CRMModule.tsx` to directly query and mutate live database records via `/api/admin/inquiries` and Supabase instantly bridges customer submissions directly into the internal operations workflow.

---

## 2. Module Audit Matrix (20 Operational Modules)

Each module is classified according to the required taxonomy:
- **FUNCTIONAL:** Fully implemented, connected to authoritative backend, handles errors.
- **PARTIAL:** UI exists, partial backend connectivity, needs completion or real data connection.
- **UI ONLY:** Visual layout exists but powered by static/mock data.
- **BROKEN:** Syntax, import, or runtime errors present.
- **DUPLICATE:** Redundant with another module; needs consolidation.
- **MISSING:** Essential business capability lacking any implementation.
- **NEEDS SECURITY REVIEW:** Missing server-side authorization or exposing sensitive information.

| Module # | Module Name | Scope & Capabilities | Classification | Existing File(s) / Route(s) | Remediation Required |
|---|---|---|---|---|---|
| **01** | **Executive Overview** | Daily/monthly KPIs, enquiry volume, response times, Stitch generation rates, revenue metrics, recent activity stream | **UI ONLY** | `src/components/admin/modules/DashboardModule.tsx` | Hydrate KPIs from real Supabase enquiries, quotations, projects, and Stitch jobs instead of static counters. |
| **02** | **Enquiry Management** | Inbound leads from Design Studio, contact forms, calculators; detailed enquiry workspace, search, filtering, assignment | **PARTIAL** | `src/components/admin/modules/CRMModule.tsx`<br>`src/app/api/admin/inquiries/route.ts` | Hydrate from real `quote_requests` & `customer_enquiries`; render complete project brief, artifact snapshot, and customer profile. |
| **03** | **Direct Client Contact** | Phone (`tel:`), WhatsApp (`wa.me`), Email (`mailto`), Copy details; mandatory manual outcome logging; follow-up queue | **PARTIAL** | `src/components/admin/modules/CRMModule.tsx` | Add dedicated direct contact action buttons, strict manual outcome dialog, and follow-up queue (Due Today, Overdue, Upcoming). |
| **04** | **Enquiry Pipeline & SLA** | 12-stage status workflow (New, Assigned, Contacted, Quoted, Won, Lost, etc.), SLA timers, color alerts, lost reason capture | **PARTIAL** | `src/components/admin/modules/CRMModule.tsx`<br>`src/types/database.types.ts` | Expand status state machine from 5 to 12 stages with SLA tracking and mandatory lost reason logging. |
| **05** | **Design Studio Management** | Monitor customer projects, Stitch generation jobs, worker health, retry failed jobs, artifact inspector, draft privacy | **PARTIAL** | `src/components/admin/modules/PersonalizedDemoModule.tsx`<br>`src/components/admin/forge/` | Connect to `design_studio_projects` & `design_generation_jobs`; add retry button, worker status badge, and draft vs submitted privacy. |
| **06** | **Customer & CRM Management** | Aggregated customer profiles across multiple enquiries, lifecycle stage, organization relationships, guest-to-account link | **PARTIAL** | `src/components/admin/modules/CRMModule.tsx`<br>`src/app/api/admin/client-organizations/route.ts` | Aggregate client enquiries by email/phone into unified customer dossier; track lifetime value and linked projects. |
| **07** | **Divisions & Service Catalogue** | 6 technical divisions, 12 industries, capability matrix, active toggles, pricing tiers, descriptions | **PARTIAL** | `src/components/admin/modules/CMSModule.tsx`<br>`src/app/api/admin/divisions/route.ts`<br>`src/app/api/admin/industries/route.ts` | Connect to live database catalogue; allow toggling active status, updating capabilities, and syncing with customer portal. |
| **08** | **Plans, Features & Pricing** | Canonical plans (Prototype, MVP, Production, Enterprise), feature matrix, real-time sync with customer recommendations | **PARTIAL** | `src/components/admin/modules/PricingPackagesModule.tsx`<br>`supabase/migrations/20261117000002_*.sql` | Sync with `canonical_plans` and `canonical_features` tables; reflect immediate changes on customer-facing plan cards. |
| **09** | **AI Intelligence Management** | AI provider status (Stitch / Gemini), prompt blueprints, requirement discovery rules, complexity thresholds | **PARTIAL** | `src/components/admin/modules/BusinessSettingsModule.tsx`<br>`src/components/admin/forge/tabs/ForgeSettingsTab.tsx` | Consolidate AI model configuration, prompt blueprint inspection, and recommendation rule tuning into one interface. |
| **10** | **Technical Assessment** | Engineering feasibility notes, architecture choice, stack recommendations, timeline estimate, internal risk analysis | **MISSING** | `src/components/admin/modules/CRMModule.tsx` | Add dedicated "Technical Assessment" tab to Enquiry Workspace allowing engineers to record assessment without altering client brief. |
| **11** | **Quotations & Commercial** | Itemized quote builder, validity, payment terms, internal approval, PDF/web issuance, statuses (Draft, Review, Sent, Accepted) | **PARTIAL** | `src/components/admin/modules/FinanceModule.tsx`<br>`src/lib/quotationStore.ts`<br>`src/app/api/admin/finance/quotations/route.ts` | Upgrade quotation builder with itemized tiers, discount controls, internal review workflow, and link to customer enquiry. |
| **12** | **Orders & Project Management** | Commercial order execution, milestone tracker, assigned engineering team, 6-stage delivery progression | **PARTIAL** | `src/lib/projectStore.ts`<br>`src/components/admin/SuperAdminPortal.tsx` | Connect project tracking to live database; enforce delivery stages (Blueprint, Architecture, Implementation, QA, Deployment, Handover). |
| **13** | **Finance & Payment Records** | Invoices, payment milestones, gateway transaction audit, manual verification (no automated unauthorized CC charging) | **FUNCTIONAL** | `src/components/admin/modules/FinanceModule.tsx`<br>`src/app/api/admin/gateway/route.ts` | Verify strict commercial controls: payment status tracking, invoice generation, manual approval gates. |
| **14** | **Documents & Agreements** | Legal contracts, SOW, NDA, Design Sign-off, revision tracking, client signature status | **PARTIAL** | `src/components/admin/modules/FinanceModule.tsx` (Contracts tab) | Expand document types to include SOW, NDA, and Design Approval Certificate; store document metadata in Supabase. |
| **15** | **Support & Maintenance** | Client post-launch tickets, SLA tracking, maintenance tiers, bug triage, priority escalation | **MISSING** | `src/components/admin/SuperAdminPortal.tsx` | Introduce lightweight Support Ticket & SLA queue for converted client projects. |
| **16** | **Team & Permission Control** | Administrative roster, RBAC roles (Owner, Admin, Editor), invite member, account status toggle, privilege checks | **FUNCTIONAL** | `src/components/admin/modules/AdminTeamModule.tsx`<br>`src/app/api/admin/members/route.ts` | Verify RBAC enforcement: owner-only capabilities (financial adjustments, settings, role edits) protected against editors. |
| **17** | **CMS & Content Management** | Case studies, insights/blog posts, portfolio showcase, hero banners, testimonials, dynamic editing | **FUNCTIONAL** | `src/components/admin/modules/CMSModule.tsx`<br>`src/app/api/admin/blog/route.ts`<br>`src/app/api/admin/portfolio/route.ts` | Connect to live Supabase portfolio and blog tables with full markdown preview and image asset linking. |
| **18** | **Notifications & Alerts** | Real-time in-app badge alerts, new enquiry toasts, overdue follow-up warnings, worker failure pings | **PARTIAL** | `src/components/admin/AdminHeader.tsx` | Connect notification bell to live polling of unread enquiries, overdue follow-ups, and worker anomalies. |
| **19** | **Analytics & Business Reports** | Conversion funnel, lead acquisition by channel, time to first contact KPI, division revenue breakdown, export CSV | **PARTIAL** | `src/components/admin/modules/ReportsModule.tsx`<br>`src/app/api/admin/finance/reports/route.ts` | Connect reports to live database records; add Time-to-First-Contact and Design-to-Quote conversion analytics. |
| **20** | **Audit Logs & Settings** | Immutable audit trail of administrative actions, business settings, brand rules, SEO, security toggles | **FUNCTIONAL** | `src/components/admin/modules/AuditLogsModule.tsx`<br>`src/components/admin/modules/BusinessSettingsModule.tsx`<br>`src/app/api/admin/audit-logs/route.ts` | Verify audit event logging for all status transitions, quotation issuances, and user permission modifications. |

---

## 3. Detailed Architectural Findings

### 3.1 Database & Schema Alignment
- The PostgreSQL schema contains rich records in `public.quote_requests` (13 active submissions).
- The `metadata` JSONB column stores complete Design Studio context:
  - `projectId`, `artifactId`, `jobId`, `enquiryRef`
  - `project`: title, status, divisionSlug, industrySlug, rawDescription, structuredBrief, targetPlatforms, featureRequirements
  - `artifact`: title, palette, designMd, htmlCode, provider, styleName, deviceType, isApproved, downloadUrl, thumbnailUrl, versionNumber
  - `contactProfile`: fullName, email, phone, company, preferredContactMethod, bestTimeToReach, location
- The `admin_members` table has 1 registered Owner account (`starxalphalabs@gmail.com`), ensuring privileged RBAC operations can be validated.

### 3.2 State Management & Client Disconnect
- `SuperAdminPortal.tsx` previously initialized state with hardcoded items:
  - `demoRequests`: 2 mock dental and bistro requests.
  - `agencyEnquiries`: 1 mock agency request.
  - `unifiedLeads`: duplicate mock representations.
- To resolve this, `SuperAdminPortal.tsx` must:
  1. Perform a real `fetch('/api/admin/inquiries')` on component mount.
  2. Map incoming `quote_requests`, `enquiries`, and `consultation_requests` into the `UnifiedLead[]` data structure.
  3. Include all Design Studio metadata, screenshots, and contact profiles.
  4. Implement an auto-refresh interval (every 30 seconds) and a manual "Refresh" button in `AdminHeader`.

### 3.3 Direct Contact Workflow & Business Rules
- Section 27 of the system specification strictly mandates:
  > **"Never mark a customer contacted automatically upon clicking a Call or WhatsApp button."**
- Clicking a contact action (`tel:`, `https://wa.me/`, `mailto:`) must open the communication client, while keeping the enquiry in its current state.
- A modal or slide-over must require the admin to manually log the contact outcome:
  - *Successfully contacted — client interested*
  - *Successfully contacted — callback requested*
  - *Successfully contacted — requirements changed*
  - *No answer — left voicemail / SMS*
  - *WhatsApp message sent — waiting response*
  - *Email sent — awaiting reply*
  - *Client unresponsive*
  - *Client not interested / timing wrong*
- Recording an outcome updates the enquiry status, logs an internal note, records the timestamp, and optionally schedules the next follow-up.

---

## 4. Remediation Plan & Execution Sequence

1. **Phase 1: API & Data Layer Hardening**
   - Upgrade `/api/admin/inquiries` to return enriched enquiry records (joining `quote_requests`, `design_studio_projects`, and `design_artifacts`).
   - Add endpoint `POST /api/admin/inquiries/contact-outcome` to record contact events and update follow-up schedules.
   - Implement live polling and cache revalidation.

2. **Phase 2: Executive Dashboard & Live Metrics (Module 1)**
   - Connect `DashboardModule.tsx` to live enquiry, quote, and project counts.
   - Calculate real-time metrics: Today's Enquiries, Response Time KPI, Active Projects, Stitch Generations.

3. **Phase 3: Unified Enquiry & Direct Contact Workspace (Modules 2, 3, 4, 10)**
   - Re-engineer `CRMModule.tsx` into a comprehensive Enquiry Workspace.
   - Tabs:
     - **Overview:** Identity, contact, summary, timeline, assignment.
     - **Contact:** One-click direct actions (`tel:`, WhatsApp, `mailto:`, Copy Card) + manual outcome logging dialog.
     - **Requirements & Scope:** Full structured brief, target platforms, core features, budget, timeline.
     - **Approved Design:** Stitch screen preview, version badge, color palette, download HTML link, prompt inspector.
     - **Technical Assessment:** Internal engineering feasibility notes, architecture choice, stack, risks.
     - **Activity & Notes:** Immutable timeline of submissions, status changes, calls, and admin notes.
   - Follow-up Management Queue: Filter views for Due Today, Overdue, Upcoming, Completed.

4. **Phase 4: Design Studio Management & Privacy (Module 5)**
   - Upgrade `PersonalizedDemoModule.tsx` and Forge workspaces to inspect real generation jobs and projects.
   - Enforce customer design privacy: draft projects remain private; contact info only surfaces upon submission.

5. **Phase 5: Commercial, Quotations, and Project Flow (Modules 11, 12, 13)**
   - Connect quotation builder to enquiry records.
   - Enforce strict commercial safeguards: no automatic checkout, manual quotation approval required.

6. **Phase 6: Verification & End-to-End Testing**
   - Execute automated simulation test: guest Design Studio brief -> Stitch generation -> enquiry submission -> Admin Centre retrieval -> direct contact logging -> quotation creation.
   - Verify zero TypeScript or Next.js build errors.
