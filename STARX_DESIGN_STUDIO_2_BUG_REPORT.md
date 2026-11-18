# STARX ALPHA LABS — DESIGN STUDIO 2.0
## Functional Defect & Bug Registry

**Document:** `STARX_DESIGN_STUDIO_2_BUG_REPORT.md`  
**Date:** November 18, 2026  
**Status:** ACTIVE AUDIT & RESOLUTION TRACKER  

---

### Bug Summary Table

| Bug ID | Title | Severity | Affected Area | Root Cause | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG-DS-01** | Unapplied Migrations in Supabase Schema Cache | **CRITICAL** | Database / RLS | Migrations `20261117000001` & `000002` were committed as SQL files but not executed in remote Supabase (`PGRST205`). | **IN PROGRESS** |
| **BUG-DS-02** | Missing Public Plans Retrieval API | **CRITICAL** | API / Pricing | `/api/admin/plans` requires Admin JWT. No customer-accessible route exists to fetch active plans dynamically. | **IN PROGRESS** |
| **BUG-DS-03** | Unhandled Division Slug Exception in `recommendPlan` | **CRITICAL** | Frontend / Plan Engine | `getPlansByDivision()` throws uncaught `Error` inside `useMemo` when given variant slugs like `starx-systems`. | **IN PROGRESS** |
| **BUG-DS-04** | Involuntary Step Reset on Browser Refresh | **HIGH** | State / Autosave | `localStorage` restore only preserved `currentStep` if `activeArtifact` existed, wiping progress on steps 1–7. | **IN PROGRESS** |
| **BUG-DS-05** | Guest-First Contact Capture at Step 8 | **HIGH** | UX / Architecture | Customer was asked for name/email/phone only at the final step, preventing cross-device session resumption. | **IN PROGRESS** |
| **BUG-DS-06** | Feature Configuration Disconnected from Plan Matrix | **HIGH** | Features / Scope | Selected features in Step 3/5 did not map to canonical feature IDs with plan inclusion or add-on pricing rules. | **IN PROGRESS** |
| **BUG-DS-07** | Stitch MCP Multi-Chunk Buffer Truncation | **HIGH** | Worker / Stitch Provider | Large tool payloads (330KB) delivered in 64KB stdout chunks failed line-based JSON splitting without a multi-chunk buffer. | **IN PROGRESS** |
| **BUG-DS-08** | Storage Upload Return Signature Mismatch | **MEDIUM** | Storage / Worker | `uploadAssetToStorage()` returned `{ signedUrl, storagePath }`, breaking scripts expecting a direct URL string. | **IN PROGRESS** |
| **BUG-DS-09** | Missing Version-Locked Design Approval Protocol | **MEDIUM** | Demo Workspace | Revisions did not invalidate previous design approvals, risking stale enquiry submissions. | **IN PROGRESS** |
| **BUG-DS-10** | Monolithic Component File Size (3,790 lines) | **MEDIUM** | Code Quality | All 8 steps and modaled logic lived in `DesignStudioClient.tsx`, causing state coupling and re-render cascades. | **IN PROGRESS** |

---

### In-Depth Bug Profiles

#### BUG-DS-01: Unapplied Migrations in Supabase Schema Cache
* **Severity**: Critical (P0)
* **Affected Files**:
  * `supabase/migrations/20261117000001_design_studio_ecosystem.sql`
  * `supabase/migrations/20261117000002_master_platform_architecture.sql`
  * `src/lib/stitch/jobs.ts`
  * `src/app/api/admin/plans/route.ts`
* **Reproduction**:
  Execute `supabaseClient.from('canonical_plans').select('*')`. Returns error: `Could not find the table 'public.canonical_plans' in the schema cache (code PGRST205)`.
* **Impact**:
  Any backend code attempting to read or write to `canonical_plans`, `canonical_features`, `customer_design_sessions`, or `design_studio_projects` fails.
* **Correction**:
  1. Build a resilient runtime catalog provider that holds the authoritative 24 canonical plans, features, and addons in memory with 100% zero-crash guarantee.
  2. Implement dual-write persistence in `DesignStudioOrchestrator`: attempt primary tables and fall back cleanly to `quote_requests` JSONB store which is active in Supabase.
  3. Provide an automated SQL bootstrap/migration runner that executes table definitions safely.

---

#### BUG-DS-02: Missing Public Plans Retrieval API
* **Severity**: Critical (P0)
* **Affected Files**:
  * `src/app/api/admin/plans/route.ts`
  * `src/app/api/design-studio/plans/route.ts` (new)
* **Reproduction**:
  A customer on `/design-studio` tries to fetch active plans. There is no public API endpoint. Accessing `/api/admin/plans` returns HTTP 401 Unauthorized (`Missing authorization header`).
* **Impact**:
  Customers cannot dynamically fetch published plans from the backend; the frontend was forced to rely exclusively on static client-side bundle data.
* **Correction**:
  Create `src/app/api/design-studio/plans/route.ts` as a public, cached endpoint that serves published canonical plans filtered by division, solution, and industry with normalized slug resolution.

---

#### BUG-DS-03: Unhandled Division Slug Exception in `recommendPlan`
* **Severity**: Critical (P0)
* **Affected Files**:
  * `src/lib/plans/recommendationEngine.ts`
  * `src/data/plans.ts`
  * `src/components/design-studio/DesignStudioClient.tsx`
* **Reproduction**:
  Navigate to `/design-studio?division=starx-systems` or `/design-studio?division=web`.
  1. `getPlansByDivision("starx-systems")` returns `[]`.
  2. `recommendPlan({ divisionSlug: "starx-systems" })` throws:
     `Error: No canonical plans found for division: starx-systems`.
  3. Because this is executed inside `useMemo()` in `DesignStudioClient.tsx`:
     The component crashes with an uncaught runtime exception.
  4. The screen goes blank or Step 4 renders 0 plans.
* **Correction**:
  1. Add canonical division slug normalization to `src/data/plans.ts`:
     Map `web` -> `starx-web`, `apps` -> `starx-apps`, `business` / `systems` / `starx-systems` -> `starx-business`, `saas` -> `starx-saas`, `ai` / `starx-ai-solutions` -> `starx-ai`, `custom` -> `starx-custom`.
  2. In `recommendPlan()`, wrap lookup in safe fallback: if no plans match, fall back to `starx-web` or default plans instead of throwing an unhandled exception.
  3. In the React component, wrap recommendation calculation in a `try / catch` with safe fallback defaults.

---

#### BUG-DS-04: Involuntary Step Reset on Browser Refresh
* **Severity**: High (P1)
* **Affected Files**:
  * `src/components/design-studio/DesignStudioClient.tsx`
* **Reproduction**:
  1. Start Design Studio, advance to Step 3 or Step 4.
  2. Refresh the browser (`F5` or `Ctrl + R`).
  3. The component reloads at Step 1 because `localStorage` check only called `setCurrentStep(parsed.currentStep)` inside:
     `if (parsed.activeArtifact) { setCurrentStep(parsed.currentStep); }`.
* **Impact**:
  Users who reload during steps 1 through 7 lose their step position and must navigate back from the beginning.
* **Correction**:
  Decouple `currentStep` restoration from `activeArtifact`. Restore `currentStep` whenever `parsed.currentStep >= 1 && parsed.currentStep <= 16`.

---

#### BUG-DS-05: Guest-First Contact Capture at Step 8
* **Severity**: High (P1)
* **Affected Files**:
  * `src/components/design-studio/DesignStudioClient.tsx`
* **Reproduction**:
  Examine onboarding flow. Users are treated as anonymous guests until Step 8.
* **Impact**:
  Violates the core product requirement for **Account-First Onboarding**. Users cannot save progress across devices, receive magic links, or bind their project to a verified profile.
* **Correction**:
  Make Account Creation & Authentication **Step 1** (Chapter 1), followed immediately by Profile & Contact details in **Step 2**, linking every subsequent step to the authenticated user ID and email.

---

#### BUG-DS-06: Feature Configuration Disconnected from Plan Matrix
* **Severity**: High (P1)
* **Affected Files**:
  * `src/components/design-studio/DesignStudioClient.tsx`
  * `src/data/plans.ts`
  * `src/lib/plans/recommendationEngine.ts`
* **Reproduction**:
  Select features in Step 3. Switch plans in Step 4. Observe Step 5. Features were static strings and did not show which features are included in the selected plan vs optional add-ons vs upgrade-only features.
* **Impact**:
  Customers could not see the scope boundaries of their selected plan.
* **Correction**:
  Implement a 4-tier feature categorization in Step 14:
  1. Included in Your Plan
  2. Optional Add-ons
  3. Available Through an Upgrade
  4. Requires Custom Engineering.

---

#### BUG-DS-07: Stitch MCP Multi-Chunk Buffer Truncation
* **Severity**: High (P1)
* **Affected Files**:
  * `src/lib/stitch/directProvider.ts`
  * `scripts/stitch-worker.mjs`
* **Reproduction**:
  Calling `tools/list` or `generate_screen_from_text` returns 330KB of JSON.
  Stdout arrives in multiple chunks of 65,536 bytes.
  A line-based parser that expects `\n` per chunk or splits naively truncates the stream mid-JSON.
* **Impact**:
  The JSON-RPC promise never resolves, resulting in an operation timeout after 180s.
* **Correction**:
  Implement a robust JSON-RPC stream buffer that accumulates chunks until complete JSON objects are parsed by matching brace depths or complete `\n` line delimiters.

---

#### BUG-DS-08: Storage Upload Return Signature Mismatch
* **Severity**: Medium (P2)
* **Affected Files**:
  * `src/lib/stitch/directProvider.ts`
  * `scripts/test-stitch-production-readiness.mjs`
* **Reproduction**:
  `uploadAssetToStorage()` returns `{ signedUrl: string, storagePath: string }`.
  `test-stitch-production-readiness.mjs` called `fetch(publicUrl)`, which passed `[object Object]`, causing `TypeError: Failed to parse URL from [object Object]`.
* **Impact**:
  Unit and integration tests failed during storage verification.
* **Correction**:
  Ensure test runners and caller functions extract `uploadResult.signedUrl` properly.
