# STARX ALPHA LABS — MASTER FEATURE CATALOGUE & TAXONOMY
**Document ID:** `STARX-SPEC-FEAT-005`  
**Date:** November 18, 2026  
**Status:** AUTHORITATIVE SPECIFICATION  
**Author:** Principal Software Architect & QA Lead  

---

## 1. FEATURE CLASSIFICATION SYSTEM

Every feature in the StarX ecosystem is catalogued independently and assigned an authoritative classification relative to each plan:

1. **INCLUDED:** Included in the base development price with zero additional charges.
2. **OPTIONAL_ADDON:** Modular capability selectable during onboarding or subsequent sprints.
3. **HIGHER_TIER_ONLY:** Advanced capability requiring an upgrade to a higher plan tier.
4. **CUSTOM_ENGINEERING:** Bespoke engineering requirement requiring discovery assessment.
5. **UNSUPPORTED:** Incompatible with the target architecture or platform.

---

## 2. THE 16 ARCHITECTURAL FEATURE GROUPS

| Group Code | Feature Group Name | Core Technical Focus |
|---|---|---|
| `CORE_ARCHITECTURE` | Core Framework & SSR | Next.js 15 App Router, React 19, Turbopack, responsive container queries, PWA offline caching. |
| `AUTHENTICATION_IDENTITY`| Identity & Authentication | Supabase Auth, OAuth2 social login, passwordless magic links, TOTP MFA, enterprise SAML SSO. |
| `USER_MANAGEMENT_RBAC` | Access Control & Multi-Tenancy| PostgreSQL Row-Level Security (RLS), custom JWT claims, tenant isolation, member invitations. |
| `DASHBOARD_UX` | Dark Glassmorphism Cockpits | Obsidian midnight styling, backdrop-filter glass, KPI metric cards, interactive charts. |
| `COMMERCE_STOREFRONT` | Storefront & Checkout | Dynamic product matrix, full-text fuzzy search, optimistic cart, checkout acceleration. |
| `PAYMENTS_BILLING` | Payment Switches & Gateways | UPI QR / intent, Razorpay webhooks, Stripe multi-currency, recurring dunning engine. |
| `ANALYTICS_REPORTING` | Telemetry & Business Intel | Event telemetry, cohort retention, conversion funnels, scheduled PDF/CSV export. |
| `AUTOMATION_WORKFLOWS` | Event Triggers & Cron Workers | Serverless cron scheduler, dead-letter queues, WhatsApp Cloud API, webhook dispatchers. |
| `AI_INTELLIGENCE` | Generative AI & Agents | Gemini 2.0 API, tool-calling execution loops, pgvector RAG, conversational voice agents. |
| `INTEGRATIONS_APIS` | Third-Party Switches & Sync | REST / GraphQL endpoints, OpenAPI schemas, webhook listeners, ERP/Tally connectors. |
| `SECURITY_COMPLIANCE` | Defense-in-Depth & Hardening | Strict CSP headers, Upstash Redis rate limiting, Zod schema validation, AES-256 encryption. |
| `REPORTING_BI` | Data Visualization & SQL | Custom SQL query builder, executive dashboards, inventory valuation, financial ledgers. |
| `INFRASTRUCTURE_CLOUD` | Cloud Deployment & Hosting | Vercel Edge Runtime, AWS S3 storage, Redis caching, Supabase PostgreSQL clustering. |
| `STORAGE_MEDIA` | Digital Asset Management | Presigned upload URLs, Sharp image optimization, secure CDN distribution, document archiving. |
| `COMMUNICATIONS_MESSAGING`| Real-time Alerts & Push | Web push notifications, Resend transactional email, SMS gateway, in-app messaging. |
| `ENTERPRISE_GOVERNANCE` | Production SLA & Guarantees | Formal response time SLA, 30–180 day post-launch warranty, dedicated staging pods. |

---

## 3. MASTER FEATURE CATALOGUE RECORDS

| Feature ID | Feature Name | Group | Default Priority | Enterprise Only |
|---|---|---|---|---|
| `feat-nextjs-app-router` | Next.js 15 App Router & Server Components | `CORE_ARCHITECTURE` | `must_have` | No |
| `feat-responsive-mobile-fluid` | Fluid Responsive Layout (Mobile, Tablet, 4K) | `CORE_ARCHITECTURE` | `must_have` | No |
| `feat-pwa-offline-cache` | PWA Offline Cache & Installable Manifest | `CORE_ARCHITECTURE` | `nice_to_have` | No |
| `feat-auth-supabase-jwt` | Secure Passwordless & Password Auth | `AUTHENTICATION_IDENTITY` | `must_have` | No |
| `feat-auth-mfa-totp` | Multi-Factor Authentication (MFA / 2FA) | `AUTHENTICATION_IDENTITY` | `important` | No |
| `feat-auth-enterprise-sso` | Enterprise SAML 2.0 / Okta / Azure AD SSO | `AUTHENTICATION_IDENTITY` | `nice_to_have` | **Yes** |
| `feat-rbac-hierarchical-roles`| Granular Role-Based Access Control (RBAC) | `USER_MANAGEMENT_RBAC` | `must_have` | No |
| `feat-multi-tenant-orgs` | Multi-Tenant Workspaces & Team Invites | `USER_MANAGEMENT_RBAC` | `must_have` | No |
| `feat-obsidian-glass-dashboard`| Obsidian Midnight Glassmorphism UI | `DASHBOARD_UX` | `must_have` | No |
| `feat-interactive-charts-kpi` | Executive Metric Cards & Interactive Charts| `DASHBOARD_UX` | `important` | No |
| `feat-product-catalog-matrix` | Multi-Variant Product Catalogue & Search | `COMMERCE_STOREFRONT` | `must_have` | No |
| `feat-cart-one-click-checkout` | High-Conversion Cart & Instant Checkout | `COMMERCE_STOREFRONT` | `must_have` | No |
| `feat-upi-razorpay-gateway` | Native UPI & Razorpay Payment Switch | `PAYMENTS_BILLING` | `must_have` | No |
| `feat-stripe-global-currency` | Stripe Multi-Currency International Checkout| `PAYMENTS_BILLING` | `important` | No |
| `feat-subscription-recurring` | Recurring Subscription Billing Engine | `PAYMENTS_BILLING` | `must_have` | No |
| `feat-whatsapp-cloud-automation`| WhatsApp Cloud API Instant Notifications | `AUTOMATION_WORKFLOWS` | `important` | No |
| `feat-background-cron-workers` | Reliable Scheduled Tasks & Background Jobs | `AUTOMATION_WORKFLOWS` | `must_have` | No |
| `feat-gemini-orchestration-engine`| Gemini 2.0 / Flash AI Intelligence Engine | `AI_INTELLIGENCE` | `must_have` | No |
| `feat-rag-pgvector-embeddings`| Enterprise Document RAG with pgvector | `AI_INTELLIGENCE` | `must_have` | No |
| `feat-voice-ai-telephony-agent`| Conversational Voice AI Receptionist | `AI_INTELLIGENCE` | `must_have` | No |
| `feat-owasp-top-10-hardening` | OWASP Top 10 Hardening & Rate Limiting | `SECURITY_COMPLIANCE` | `must_have` | No |
| `feat-immutable-audit-ledger` | Cryptographically Verifiable Audit Ledger | `SECURITY_COMPLIANCE` | `important` | No |
| `feat-sla-warranty-support` | Production SLA & Post-Launch Bug Warranty | `ENTERPRISE_GOVERNANCE` | `must_have` | No |
