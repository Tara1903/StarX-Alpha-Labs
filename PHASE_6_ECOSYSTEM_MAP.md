# STARX ECOSYSTEM MAP & ARCHITECTURE SEPARATION SPECIFICATION
## StarX Alpha Labs & Independent Products

**Version**: 1.0  
**Effective Date**: November 11, 2026  
**Governing Policy**: Strict Platform Decoupling & Navigation-Only Integration

---

### 1. Ecosystem Entities & Identity Overview

```
+-------------------------------------------------------------------------+
|                          STARX ECOSYSTEM                                |
+-------------------------------------------------------------------------+
                                     |
               Public Contextual Navigation Only
               (No Shared DB / No Shared Auth / No Shared API)
                                     |
         +---------------------------+---------------------------+
         |                                                       |
         v                                                       v
+---------------------------------+     +---------------------------------+
|       STARX ALPHA LABS          |     |           STARX FLOW            |
|---------------------------------|     |---------------------------------|
| Technology & Software           |     | Independent AI Business         |
| Engineering Company             |     | Operating System (SaaS)         |
| Primary Domain: starxlabs.io    |     | Primary Domain: flow.starx.io   |
| Dedicated Supabase Project      |     | Dedicated Independent DB        |
| Dedicated Admin RBAC            |     | Independent User Accounts       |
+---------------------------------+     +---------------------------------+
```

---

### 2. Entity Profile: StarX Alpha Labs

- **Official Name**: StarX Alpha Labs
- **Classification**: Central Technology & Software Engineering Company
- **Core Function**:
  - Bespoke full-stack software development (Next.js 16, React 19, TypeScript).
  - 3D interactive WebGL graphics & motion engineering (Three.js, R3F).
  - Proprietary AI model fine-tuning, RAG pipelines, and vector database architectures.
  - Multi-tenant client portals and custom administrative workspaces.
  - 160+ interactive industry demonstration models.
- **Public Domain**: `https://starxlabs.io` (Staging/Production: `https://starx-alpha-labs.vercel.app`)
- **Persistence Architecture**:
  - Dedicated Supabase instance with Row Level Security (RLS) on all tables.
  - Role-based access control (`owner`, `admin`, `editor`).
  - Private proposal and asset storage buckets.

---

### 3. Entity Profile: STARX FLOW

- **Official Name**: STARX FLOW
- **Classification**: Independent Commercial SaaS Product
- **Core Function**:
  - Autonomous 24/7 AI Receptionist & Voice Call Assistant.
  - Omnichannel Customer Inbox (WhatsApp, SMS, Web Chat, Social DMs).
  - Automated Lead Capture, Deal Pipeline, and CRM Follow-Up Sequences.
  - Hands-Free Operational Workflows & Calendar Scheduling.
  - Pre-packaged business intelligence requiring zero custom software development.
- **Public Domain**: `https://flow.starx.io`
- **Persistence Architecture**:
  - Completely separate, isolated cloud infrastructure and database.
  - Autonomous authentication, session cookies, and user accounts.
  - Decoupled billing, customer management, and SLA enforcement.

---

### 4. Navigation & Referral Relationship Matrix

| Discovery Vector | Origin | Destination | Purpose | Technical Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| **Homepage Showcase** | StarX Alpha Labs (`/`) | STARX FLOW (`flow.starx.io`) | Introduces the flagship AI OS product to homepage visitors. | External anchor with `target="_blank" rel="noopener noreferrer"` and `utm_source=starx_alpha_labs&utm_campaign=homepage_flagship_product`. |
| **Global Navigation** | Desktop/Mobile Navbar | Ecosystem Directory (`/ecosystem`) | Enables discovery of independent products and architecture separation. | Internal Next.js `Link` to `/ecosystem`. |
| **Mobile Drawer Action** | Mobile Menu | STARX FLOW (`flow.starx.io`) | Quick access to the AI OS product on mobile viewports. | External anchor with `target="_blank" rel="noopener noreferrer"`. |
| **Footer Ecosystem Links** | Global Footer | STARX FLOW & `/ecosystem` | Persistent site-wide discovery. | External anchor with `target="_blank" rel="noopener noreferrer"`. |
| **Contextual Referral A** | AI Solutions (`/divisions/starx-ai-solutions`) | STARX FLOW (`flow.starx.io`) | Offers ready-made AI receptionist as an alternative to custom model engineering. | External anchor with `ref_feature=ai_receptionist`. |
| **Contextual Referral B** | Services Directory (`/development-services`) | STARX FLOW (`flow.starx.io`) | Guides local businesses seeking off-the-shelf automation. | External anchor with `campaign=development_services_banner`. |
| **Reciprocal Referral** *(External)* | STARX FLOW (`flow.starx.io`) | StarX Alpha Labs (`starxlabs.io`) | Recommends bespoke software engineering for clients with custom requirements. | External anchor with `utm_source=starx_flow&utm_medium=reciprocal_ecosystem`. |

---

### 5. Architectural Separation Rules (Non-Negotiable)

1. **Zero Shared Persistence**: Under no circumstances may StarX Alpha Labs connect to the STARX FLOW database, or vice versa.
2. **Zero Shared Authentication**: Neither platform may inspect, validate, or read the other's session cookies, JWT secrets, or user tokens.
3. **No Cross-Product PII Synchronization**: Customer data, contact lists, invoices, and communication transcripts must never be automatically synced across products.
4. **Stateless Referral Attribution**: Tracking parameters are strictly limited to standard UTM attributes (`utm_source`, `utm_medium`, `utm_campaign`, `ref_feature`). All links must continue to function if parameters are stripped by ad-blockers or privacy browsers.
5. **Operational Decoupling**: If STARX FLOW undergoes maintenance or downtime, StarX Alpha Labs must remain 100% operational, and vice versa.
