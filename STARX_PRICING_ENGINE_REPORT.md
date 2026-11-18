# STARX ALPHA LABS — PRICING ENGINE ARCHITECTURAL REPORT
**Document ID:** `STARX-REP-ENG-011`  
**Date:** November 18, 2026  
**Status:** COMPLETE & AUTHORITATIVE  
**Module:** `calculateInvestmentSummary` (`src/data/commercialCatalogue.ts`)  
**Author:** Principal Commercial Architect & Senior Full-Stack Engineer  

---

## 1. PRICING ENGINE ARCHITECTURE

The StarX Pricing Engine enforces server-side, authoritative commercial calculation. All price evaluations occur within authenticated API routes and trusted server contexts.

```
┌────────────────────────────────────────────────────────┐
│ TOTAL INVESTMENT CALCULATION PIPELINE                 │
├───────────────────────────────┬────────────────────────┤
│ Base Plan Development Fee     │ e.g. ₹1,19,999         │
│ (+) Selected Modular Add-ons  │ e.g. ₹11,999           │
├───────────────────────────────┼────────────────────────┤
│ Net One-Time Investment       │ = ₹1,31,998            │
│ (+) Statutory GST (18%)       │ = ₹23,760              │
├───────────────────────────────┼────────────────────────┤
│ Gross One-Time Investment     │ = ₹1,55,758            │
│ (Separately) Monthly SLA Ops  │ = ₹9,999 / month       │
└───────────────────────────────┴────────────────────────┘
```

---

## 2. MULTI-COMPONENT PRICING BREAKDOWN

### 1. Base Development Fee (CapEx)
Covers all architectural scaffolding, custom UI/UX design, Next.js 15 App Router engineering, database schemas, and Google Stitch MCP blueprint integration.

### 2. Infrastructure Setup & Onboarding
One-time setup covering DNS record provisioning, automated SSL certificate issuance, staging environment deployment, and Razorpay/Stripe webhook verification.

### 3. Recurring Monthly SLA Operations (OpEx)
Separately quoted recurring service covering 24/7 uptime telemetry, monthly security dependency patching, automated daily PostgreSQL snapshots, and guaranteed response SLAs (Standard 48h to Enterprise 2h).

### 4. Metered Consumption Architecture
To safeguard agency profitability, variable consumption is isolated:
- **Gemini / LLM Tokens:** Billed at direct API cost after plan allowance.
- **Voice Minutes (ElevenLabs / LiveKit):** Billed at per-minute pass-through.
- **WhatsApp Cloud API:** Charged per Meta conversation category.

### 5. Statutory Tax Compliance (GST @ 18%)
- **Domestic (India):** 18% GST (CGST 9% + SGST 9% or IGST 18%) calculated on all gross services with automated HSN/SAC code assignment (`998314` - IT Design & Development Services).
- **International Export:** 0% GST applied automatically under export of services guidelines with registered Letter of Undertaking (LUT).

---

## 3. SECURITY & COMMERCIAL GOVERNANCE

1. **Client-Side Modification Immunity:** The onboarding client submits only `planId` and an array of `addonIds`. The server recomputes the exact investment using database records, ignoring any tampered price values passed in request bodies.
2. **Immutable Quotation Records:** Final approved proposals generate cryptographically stamped records stored in `quotation_records` and `quotations` tables.
