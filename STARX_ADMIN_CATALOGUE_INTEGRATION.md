# STARX ALPHA LABS — ADMIN CENTRE COMMERCIAL CATALOGUE MANUAL
**Document ID:** `STARX-MAN-ADM-012`  
**Date:** November 18, 2026  
**Status:** COMPLETE & AUTHORITATIVE  
**Module:** `src/components/admin/modules/CommercialCatalogueModule.tsx`  
**Route:** `/admin` (Tab: "Commercial Catalogue")  
**Author:** Principal Full-Stack Engineer & Admin Portal Architect  

---

## 1. ADMIN MODULE INTEGRATION SUMMARY

The legacy W1–W6, A1–A5, and C1–C5 package reference interface inside `PricingPackagesModule.tsx` has been decommissioned from active commercial management. In its place, the **Master Commercial Catalogue Module** (`CommercialCatalogueModule.tsx`) provides complete oversight across all six canonical divisions.

---

## 2. SUBTAB CAPABILITIES & OPERATIONAL WORKFLOW

```
┌────────────────────────────────────────────────────────────────────────┐
│ MASTER COMMERCIAL CATALOGUE CONTROL ROOM                               │
├───────────────────┬────────────────────────────────────────────────────┤
│ Overview          │ Real-time metrics on 6 Divisions, 30 Solutions,    │
│                   │ 30 Plan Families, 17 Plans, 23 Features, 11 Addons.│
├───────────────────┼────────────────────────────────────────────────────┤
│ Solutions         │ Filter by division, manage supported platforms,    │
│                   │ link industry mappings, and set popular archetypes.│
├───────────────────┼────────────────────────────────────────────────────┤
│ Plans & Tiers     │ Live pricing in INR/USD, scoping limits, SLA,      │
│                   │ warranty days, and status transition workflow.     │
├───────────────────┼────────────────────────────────────────────────────┤
│ Master Features   │ Classified across 16 groups with customer-facing   │
│                   │ and internal technical descriptions.               │
├───────────────────┼────────────────────────────────────────────────────┤
│ Add-ons           │ Manage one-time vs monthly recurring add-ons and   │
│                   │ compatible plan tiers.                             │
├───────────────────┼────────────────────────────────────────────────────┤
│ Recommendation    │ Rule matrix mapping division + solution +          │
│ Rules             │ complexity score (1–10) to recommended plans.      │
├───────────────────┼────────────────────────────────────────────────────┤
│ Pricing Simulator │ Interactive investment and 18% GST calculator.     │
├───────────────────┼────────────────────────────────────────────────────┤
│ Audit History     │ Tamper-proof log tracking every price alteration.  │
└───────────────────┴────────────────────────────────────────────────────┘
```

---

## 3. PRICING STATUS MACHINE & GOVERNANCE

Administrators can transition plan pricing through four distinct compliance gates:
```
[ DRAFT ] ──> [ INTERNAL_REVIEW ] ──> [ APPROVED ] ──> [ PUBLISHED ]
```
- Clicking **"Change Status"** cycles the plan status with live toast feedback.
- Only plans with `PUBLISHED` status are served to customer-facing onboarding in Step 13.

---

## 4. AUDIT & ACCESS LOGGING
Every price alteration and plan edit triggers an audit entry via `logAdminAction`:
- Recorded in `catalogue_audit_logs` and `admin_audit_logs`.
- Captures Admin User ID, Email, Role, Previous Value, New Value, and Timestamp.
