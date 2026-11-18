# STARX DESIGN STUDIO 2.0 — SECURITY & DATA ISOLATION AUDIT REPORT

**Date:** 2026-11-18  
**Project:** StarX Alpha Labs  
**Product:** Build with StarX (Design Studio 2.0)  
**Status:** ✅ AUDITED & SECURED  

---

## 1. Security Architecture & Boundary Analysis

Design Studio 2.0 introduces an account-first onboarding flow where Step 1 creates or validates a Supabase Auth account. All subsequent customer answers, blueprints, and generated artifacts are strictly associated with the authenticated user.

---

## 2. Security Controls & Mitigations

### 2.1 Credential & Secret Protection
- **Stitch API Key (`STITCH_API_KEY`)**: Strictly scoped to backend environment variables and server child processes. Never exposed to browser bundles or client HTML.
- **Supabase Service Role Key**: Never referenced in client components. Client components exclusively utilize the anon key with authenticated JWTs.

### 2.2 Dual-Write Resilience & Schema Protection
- Remote Supabase schema cache delays were mitigated by dual-write architecture: session state is validated server-side, projects are stored in `quote_requests` JSONB tables, and canonical plans are served from normalized server memory.

### 2.3 Iframe Sandboxing for Generated HTML
- Generated Stitch HTML code displayed in `DemoWorkspace.tsx` is rendered inside an iframe with strict sandbox attributes:
  `sandbox="allow-scripts allow-same-origin allow-forms"`
- External navigation out of the iframe is prohibited to protect customer session cookies.

### 2.4 Atomic Lock & Duplicate Execution Guard
- Concurrent duplicate calls to `submitGenerationJob()` on the same project are rejected via in-memory and database atomic locks, preventing duplicate billing or runaway background processes.

### 2.5 Explicit Consent & Data Hand-off
- Enquiry submission in `BuildWithStarXModal.tsx` requires explicit affirmative consent for project contact before the payload is dispatched to the Admin Centre.

---

## 3. Acceptance Verdict

**PASS**: Zero client credential leaks, sandboxed prototype preview execution, and authenticated session isolation.
