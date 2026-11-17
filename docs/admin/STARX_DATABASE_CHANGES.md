# STARX ALPHA LABS — DATABASE CHANGES & SCHEMA AUDIT

**Project:** StarX Alpha Labs  
**Website:** https://www.starxalphalabs.online/  
**Tagline:** Build Smarter. Lead Tomorrow.  
**Branch:** `feat/portal-transformation`  
**Date:** 18 November 2026  
**Status:** FULLY ALIGNED · PRODUCTION-READY

---

## 1. Database Architecture Overview

The StarX Alpha Labs platform utilizes Supabase PostgreSQL as its authoritative state store. The Admin Centre interacts with core operational tables through typed service clients (`createAdminClient()`) and server-side session verifications (`requireAdmin()`).

---

## 2. Table-by-Table Schema Matrix

### 2.1 `public.quote_requests`
Primary repository for inbound customer enquiries, including those originating from the Design Studio.
- **`id` (UUID):** Primary key.
- **`name` (TEXT):** Customer full name.
- **`email` (TEXT):** Verified email address.
- **`phone` (TEXT):** Verified contact phone number.
- **`company` (TEXT):** Business or organisation name.
- **`service_slug` (TEXT):** Division or service tier.
- **`budget_range` (TEXT):** Customer-stated budget scope.
- **`timeline` (TEXT):** Delivery urgency.
- **`project_details` (TEXT):** Primary problem description.
- **`status` (TEXT):** Database column with legacy CHECK constraint: `CHECK (status IN ('new', 'reviewing', 'quoted', 'declined', 'won'))`.
- **`metadata` (JSONB):** Comprehensive operational payload containing:
  - `enquiryRef`: String (e.g. `STX-ENQ-202611-3A9F`).
  - `leadStatus`: Detailed 12-state workflow status (`new`, `assigned`, `attempted_contact`, `contacted`, `needs_assessment`, `assessment_complete`, `followup_required`, `quote_prepared`, `quotation_sent`, `negotiation`, `converted`, `not_interested`, `on_hold`, `closed`).
  - `contactProfile`: Object with `preferredMethod`, `bestTimeToReach`, `countryCode`, `location`.
  - `project`: Snapshot of Design Studio brief.
  - `artifact`: Snapshot of Stitch generated screens, HTML download URLs, palette, prompt.
  - `contactHistory`: Array of manual contact outcome logs.
  - `technicalAssessment`: Engineering feasibility notes and stack choices.
  - `followUpDate`: ISO date string for SLA queues.
  - `assignedTo`: Administrative assignee email.

### 2.2 Dual-Layer Status Pattern (`DB_QUOTE_STATUS_MAP`)
To preserve absolute PostgreSQL schema compliance without breaking legacy CHECK constraints or losing operational detail, the application implements bidirectional status mapping:

```typescript
const DB_QUOTE_STATUS_MAP: Record<string, string> = {
  new: 'new',
  assigned: 'reviewing',
  attempted_contact: 'reviewing',
  under_review: 'reviewing',
  contacted: 'reviewing',
  needs_assessment: 'reviewing',
  assessment_complete: 'reviewing',
  followup_required: 'reviewing',
  demo_scheduled: 'reviewing',
  demo_presented: 'reviewing',
  quote_prepared: 'quoted',
  quotation_sent: 'quoted',
  negotiation: 'quoted',
  converted: 'won',
  not_interested: 'declined',
  on_hold: 'declined',
  closed: 'declined',
};
```
- **Writing:** Writes mapped status to `quote_requests.status` while persisting exact 12-stage status to `metadata.leadStatus`.
- **Reading:** `/api/admin/inquiries` yields `status: metadata.leadStatus || q.status`.

### 2.3 `public.admin_members`
Stores the administrative roster for server-side privilege verification:
- **`id` (UUID):** Primary key.
- **`user_id` (UUID):** References `auth.users(id)`.
- **`email` (TEXT):** Administrative email.
- **`role` (TEXT):** `owner` | `admin` | `editor`.
- **`status` (TEXT):** `active` | `suspended`.
- **`is_active` (BOOLEAN):** Active status flag.

### 2.4 `public.canonical_plans` & `public.canonical_features`
Manages the authoritative product offerings displayed across the customer portal and calculator:
- **`id` (TEXT):** Unique plan identifier (`plan_proto_v1`, `plan_mvp_v1`, `plan_prod_v1`, `plan_custom_v1`).
- **`tier` (TEXT):** `starter` | `growth` | `enterprise` | `custom`.
- **`code` (TEXT):** Unique code (e.g. `STX-PROTO`, `STX-MVP`, `STX-PROD`, `STX-CUSTOM`).
- **`price_inr` (NUMERIC):** Authoritative price in Indian Rupees.
- **`price_usd` (NUMERIC):** International price in USD.
- **`timeline_weeks` (TEXT):** Estimated delivery timeframe.
- **`is_active` (BOOLEAN):** Active toggle state.

### 2.5 `public.admin_audit_logs` & `public.audit_events`
Stores immutable, append-only operational events:
- **`id` (UUID):** Unique log record.
- **`actor_user_id` (UUID):** ID of admin making change.
- **`actor_email` (TEXT):** Administrator email.
- **`actor_role` (TEXT):** Role at time of action.
- **`action` (TEXT):** Verb (`INQUIRY_STATUS_UPDATED`, `CONTACT_OUTCOME_LOGGED`, `PRICING_PLAN_UPDATED`, etc.).
- **`entity_type` (TEXT):** Target table.
- **`entity_id` (TEXT):** ID of modified record.
- **`metadata` (JSONB):** Old/new state delta and timestamp.
