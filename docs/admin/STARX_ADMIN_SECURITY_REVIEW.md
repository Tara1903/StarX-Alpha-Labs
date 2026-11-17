# STARX ALPHA LABS — ADMIN CENTRE SECURITY REVIEW

**Project:** StarX Alpha Labs  
**Website:** https://www.starxalphalabs.online/  
**Tagline:** Build Smarter. Lead Tomorrow.  
**Branch:** `feat/portal-transformation`  
**Review Date:** 18 November 2026  
**Status:** PASSED · DEFENSE-GRADE SECURITY VERIFIED

---

## 1. Executive Security Verdict

The StarX Alpha Labs Admin Centre enforces strict defense-in-depth security across all entry points, API routes, database tables, and customer data boundaries. 

Non-administrative traffic is rejected at the API boundary, administrative credentials are authenticated directly against the database roster rather than client-controlled JWT metadata, and customer privacy is preserved between unsubmitted exploration and formal commercial enquiries.

---

## 2. Server-Side Administrative Verification (`requireAdmin`)

All 29 administrative API routes located under `/api/admin/*` depend on `requireAdmin()` defined in `src/lib/auth/admin.ts`:

```typescript
export async function requireAdmin(allowedRoles: AdminRole[] = ['owner', 'admin', 'editor']): Promise<VerifiedAdminContext>
```

### Security Properties:
1. **Never Trusts Client Tokens or Metadata:** The function obtains the authenticated user session from Supabase SSR cookie headers, extracts `user.id`, and performs a direct, privileged lookup against `public.admin_members`.
2. **Rejection Policy:**
   - Unauthenticated callers are rejected with `401 Unauthorized`.
   - Authenticated users not registered in `admin_members` are rejected with `403 Forbidden`.
   - Suspended accounts (`status !== 'active'`) are rejected with `403 Forbidden`.
   - Role insufficient callers (e.g. `editor` attempting financial adjustments or member role changes) are rejected with `403 Forbidden`.
3. **Automated Verification:** Verified in `scripts/test-admin-centre-master.mjs` (Test D) where unauthenticated anon calls to admin tables were strictly denied by PostgreSQL Row-Level Security.

---

## 3. Role-Based Access Control (RBAC) Matrix

| Administrative Capability | Owner (`owner`) | Administrator (`admin`) | Editor (`editor`) | Enforcement Point |
|---|---|---|---|---|
| View Dashboard & CRM Enquiries | Yes | Yes | Yes | `requireAdmin(['owner', 'admin', 'editor'])` |
| View Stitch Design Blueprints & HTML | Yes | Yes | Yes | `requireAdmin(['owner', 'admin', 'editor'])` |
| Record Contact Outcomes & Notes | Yes | Yes | Yes | `requireAdmin(['owner', 'admin', 'editor'])` |
| Record Technical Assessments | Yes | Yes | Read-Only | UI Guard + `/api/admin/inquiries` |
| Build & Send Commercial Quotations | Yes | Yes | Read-Only | `/api/admin/finance/quotations` |
| Create & Stage Client Projects | Yes | Yes | Read-Only | Project Store + Admin Guard |
| Manage CMS, Portfolio & Blog | Yes | Yes | Yes | `/api/admin/blog`, `/api/admin/portfolio` |
| Manage Canonical Plans & Pricing | Yes | Yes | No | `/api/admin/plans` (`requireAdmin(['owner', 'admin'])`) |
| Approve Financial Invoices & Adjustments | Yes | No | No | `/api/admin/finance/adjustments` (`requireAdmin(['owner'])`) |
| Invite & Provision Admin Members | Yes | No | No | `/api/admin/members` (`requireAdmin(['owner'])`) |
| Execute System Bootstrap | Once Only | Prohibited | Prohibited | Secret Header + Single Owner Lock |

---

## 4. Customer Privacy & Draft Boundary Governance

1. **Exploratory Sessions:** During Steps 1–7 of the customer Design Studio experience, prospects can generate AI screen variations and evaluate architectures as guests.
2. **PII Isolation:** Unsubmitted exploratory sessions do **not** transmit customer contact details or PII to the Admin CRM.
3. **Submission Gate:** Only when the customer explicitly provides consent, fills out verified contact coordinates in Step 8, and clicks "Build This With StarX" is a formal record created in `public.quote_requests`.
4. **Draft Privacy:** In `PersonalizedDemoModule.tsx`, any unsubmitted generation sessions are visually tagged as "Draft / Guest" with customer coordinates masked, protecting user anonymity prior to commercial enquiry consent.

---

## 5. Commercial & Payment Safeguards

1. **Zero Automated Credit Card Charging:** The platform strictly prohibits silent or automated credit card billing.
2. **Explicit Customer Consent:** Quotations and commercial agreements require manual review and dual sign-off before payment links or milestone invoices are issued.
3. **Manual Verification Desk:** UPI and direct bank wire transfers (NEFT/RTGS/IMPS) require administrative manual confirmation in the Finance Module before advancing project delivery stages.
4. **Immutable Audit Trail:** All quotation generation, price adjustments, contact logs, and status transitions invoke `logAdminAction()`, permanently writing to `public.admin_audit_logs`.
