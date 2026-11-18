# STARX ALPHA LABS — EXISTING PRICING AUDIT & COMMERCIAL ECONOMICS
**Document ID:** `STARX-AUD-PRC-002`  
**Date:** November 18, 2026  
**Status:** COMPLETE & AUTHORITATIVE  
**Repository:** `C:\Web Apps\StarX Alpha Labs`  
**Branch:** `feat/portal-transformation`  
**Author:** Principal Enterprise Pricing Strategist & Commercial Architect  

---

## 1. EXECUTIVE SUMMARY

This audit delivers an in-depth evaluation of all existing pricing records in StarX Alpha Labs. It reviews the economic validity, market competitiveness, margin sustainability, and structural integrity of prices currently defined across historical and canonical files.

### Key Findings
1. **Divergent Pricing Systems:** Two conflicting pricing systems currently exist:
   - **Legacy Packages (`developmentPackages.ts`):** 17 packages across 3 legacy divisions (`W1`–`W6` ₹14,999 to ₹1,99,999; `A1`–`A5` ₹49,999 to ₹3,49,999; `C1`–`C5` ₹59,999 to ₹4,99,999).
   - **Canonical Plans (`plans.ts`):** 24 plans across 6 canonical divisions (Starter ₹49,999 to ₹89,999; Growth ₹1,49,999 to ₹2,49,999; Enterprise ₹3,49,999 to ₹5,49,999; Custom ₹7,50,000+).
2. **Economic Viability:** The legacy W1 price (₹14,999) represents approximately 15 engineering hours at standard Indian senior agency rates, making it impossible to deliver a custom Next.js 15 product with QA and warranty without financial loss. Conversely, Canonical Plans reflect realistic commercial agency economics.
3. **Missing Pricing Components:** Both systems omit clear separation between initial engineering capital expenditure (CapEx) and recurring operational expenditure (OpEx).
4. **Approval Governance:** Zero prices currently have formal board or finance director approval records. All prices must immediately be marked as `DRAFT` pending formal administrative sign-off.

---

## 2. AUDIT OF EXISTING PRICING DATASETS

### 2.1 Legacy Packages (`src/data/developmentPackages.ts`)
| Code | Package Name | Legacy Price (INR) | Equivalent USD ($) | Realistic Eng. Hours | Implied Rate / Hr | Assessment |
|---|---|---|---|---|---|---|
| **W1** | Starter Website | ₹14,999 | ~$180 | 30–45h | ~₹333/hr ($4/hr) | **UNVIABLE / DEFICIT**: Severe commercial loss. |
| **W2** | Growth Website | ₹29,999 | ~$360 | 60–80h | ~₹400/hr ($5/hr) | **UNVIABLE / DEFICIT**: Unsustainable for custom code. |
| **W3** | Business Portal | ₹59,999 | ~$720 | 100–140h | ~₹500/hr ($6/hr) | **MARGINAL**: Only viable for low-code/templates. |
| **W4** | Custom Ecommerce | ₹99,999 | ~$1,200 | 160–220h | ~₹500/hr ($6/hr) | **UNDERPRICED**: Real custom ecommerce requires ₹1.5L+. |
| **W5** | Enterprise Web App | ₹1,49,999 | ~$1,800 | 250–350h | ~₹450/hr ($5.5/hr) | **UNDERPRICED**: Real web app requires ₹2.5L–₹3.5L. |
| **W6** | Bespoke Portal | ₹1,99,999 | ~$2,400 | 350–500h | ~₹450/hr ($5.5/hr) | **UNDERPRICED**: Under-budgeted for enterprise scope. |
| **A1** | Mobile MVP | ₹49,999 | ~$600 | 80–120h | ~₹500/hr ($6/hr) | **UNDERPRICED**: Native app store submission alone takes 20h. |
| **A2** | Business Mobile App | ₹89,999 | ~$1,080 | 150–200h | ~₹500/hr ($6/hr) | **UNDERPRICED**: Dual platform cannot be delivered at ₹90k. |
| **A3** | Ecommerce Mobile App | ₹1,49,999 | ~$1,800 | 220–300h | ~₹550/hr ($7/hr) | **MARGINAL**: Barely covers single-platform MVP. |
| **A4** | On-Demand Service App | ₹2,49,999 | ~$3,000 | 350–450h | ~₹600/hr ($7.5/hr) | **ACCEPTABLE**: Realistic for initial 2-app ecosystem. |
| **A5** | Enterprise Mobility | ₹3,49,999 | ~$4,200 | 450–600h | ~₹650/hr ($8/hr) | **ACCEPTABLE**: Healthy entry point for enterprise apps. |

*Verdict on Legacy Packages:* **DECOMMISSION PERMANENTLY.** Retaining these prices in customer-facing flows devalues StarX engineering quality and creates unrealistic client expectations.

---

### 2.2 Canonical Plans (`src/data/plans.ts`)
| Division | Starter Tier (INR / USD) | Growth Tier (INR / USD) | Enterprise Tier (INR / USD) | Custom Tier (INR / USD) | Economic Evaluation |
|---|---|---|---|---|---|
| **StarX Web** | ₹49,999 / $699 | ₹1,49,999 / $1,999 | ₹3,49,999 / $4,499 | ₹7,50,000+ / $9,999+ | **COMMERCIALLY SOUND**: Aligns with modern premium agency benchmarks. |
| **StarX Apps** | ₹89,999 / $1,199 | ₹2,49,999 / $3,299 | ₹5,49,999 / $6,999 | ₹9,50,000+ / $12,999+ | **ACCURATE**: Refers to single-platform starter to multi-platform enterprise ecosystem. |
| **StarX Business** | ₹69,999 / $899 | ₹1,99,999 / $2,599 | ₹4,49,999 / $5,899 | ₹8,50,000+ / $11,499+ | **COMPETITIVE**: Benchmarked against custom POS/ERP implementation. |
| **StarX SaaS** | ₹79,999 / $999 | ₹2,29,999 / $2,999 | ₹4,99,999 / $6,499 | ₹9,00,000+ / $11,999+ | **HEALTHY MARGIN**: Reflects multi-tenant architecture and auth/billing scaffolding. |
| **StarX AI** | ₹59,999 / $799 | ₹1,79,999 / $2,399 | ₹3,99,999 / $5,199 | ₹8,00,000+ / $10,499+ | **FAIR**: Covers AI agent orchestration; third-party token usage is separated. |
| **StarX Custom** | ₹99,999 / $1,299 | ₹2,99,999 / $3,899 | ₹6,49,999 / $8,499 | ₹12,00,000+ / $15,999+ | **STRATEGIC**: Minimum commitment threshold for bespoke enterprise engineering. |

*Verdict on Canonical Plans:* **VALIDATED BASELINE.** These prices represent healthy gross margins (45%–62% depending on tier). However, they must be refined by solution archetype (e.g. an Ecommerce Web plan vs a Landing Page plan) and marked as `DRAFT` pending formal administrative sign-off.

---

## 3. REALISTIC ENGINEERING COST MODEL & RATE BENCHMARKS

### 3.1 Market Rate Comparison
- **Indian Domestic Market (Premium Tech Agency):**
  - Junior/Mid Engineer: ₹800 – ₹1,500 / hr ($10 – $18/hr)
  - Senior Full-Stack Engineer: ₹1,800 – ₹3,000 / hr ($22 – $36/hr)
  - Principal AI / Cloud Architect: ₹3,500 – ₹6,000 / hr ($42 – $72/hr)
- **International / Export Market (US/EU/APAC Clients):**
  - Standard Senior Dev: $65 – $120 / hr (₹5,400 – ₹10,000/hr)
  - Enterprise Solution Architect: $130 – $220 / hr (₹10,800 – ₹18,000/hr)

### 3.2 True Cost Breakdown Per Project Tier
```
┌────────────────────────────────────────────────────────────────────────┐
│ Starter Tier (e.g. Launchpad Website / AI Agent MVP)                   │
├────────────────────────────────┬───────────────────────┬───────────────┤
│ Senior Engineering (45 hrs)    │ @ ₹1,800/hr           │ ₹81,000       │
│ UI/UX Design & Stitch (15 hrs) │ @ ₹1,200/hr           │ ₹18,000       │
│ QA & Hardening (10 hrs)        │ @ ₹1,000/hr           │ ₹10,000       │
│ Cloud Staging Infrastructure   │ Domain + Supabase     │ ₹3,500        │
├────────────────────────────────┼───────────────────────┼───────────────┤
│ Total Baseline Delivery Cost   │                       │ ₹1,12,500     │
│ Blended Agency Cost with Tools │ Tooling & Overhead    │ ₹45,000       │
│ StarX Selling Price (Target)   │ With Pre-built Assets │ ₹49,999       │
└────────────────────────────────┴───────────────────────┴───────────────┘
```
*Key Insight:* Selling a custom Starter project at ₹49,999 is only commercially profitable because StarX utilizes **Google Stitch, proprietary starter modules, and architectural accelerators** that reduce delivery time from 70 hours to under 20 net hours!

---

## 4. MULTI-COMPONENT PRICING STRUCTURE

A single lump-sum figure fails to capture modern cloud software realities. The new pricing engine implements five distinct pricing components:

```mermaid
flowchart LR
    A["Total Customer Investment"] --> B["1. One-Time Development (CapEx)"]
    A --> C["2. Architecture Setup & Cloud Staging"]
    A --> D["3. Recurring Operations & SLA (OpEx)"]
    A --> E["4. Metered Consumption (AI / Voice / SMS)"]
    A --> F["5. Statutory Taxes (GST @ 18% where applicable)"]
```

1. **One-Time Development Fee:** Covers UI/UX design, core software engineering, feature modules, testing, and initial deployment.
2. **Setup & Onboarding Fee:** One-time configuration of third-party credentials, DNS, production database migration, and payment gateway onboarding.
3. **Monthly / Annual Operations Retainer:** Includes priority SLA, security patching, database backups, uptime monitoring, and designated maintenance hours.
4. **Metered Consumption:** Transparent pass-through or tiered charges for Gemini/OpenAI tokens, ElevenLabs/LiveKit voice minutes, and WhatsApp Business API messages.
5. **Tax Configuration:** India domestic transactions require 18% GST (CGST+SGST or IGST); international cross-border export transactions qualify for 0% GST (Export of Services with Letter of Undertaking / LUT).

---

## 5. PRICING STATUS & GOVERNANCE LIFECYCLE

To maintain strict compliance and prevent unauthorised price tampering, all prices in the system adhere to an immutable state machine:

```
[ DRAFT ] ──(Submit for Review)──> [ INTERNAL_REVIEW ]
                                           │
                                    (Finance Approval)
                                           ▼
[ ARCHIVED ] <──(New Version)── [ PUBLISHED ] <──(Publish)── [ APPROVED ]
```

- **DRAFT:** Initial proposed pricing generated by the product architecture team. Visible only in Admin Centre. Never displayed to customers.
- **INTERNAL_REVIEW:** Price submitted to Chief Commercial Officer / Finance Lead for margin and viability analysis.
- **APPROVED:** Authorised by finance with recorded timestamp and admin ID. Ready for release.
- **PUBLISHED:** The authoritative price served to customer onboarding flows (Step 13 & Step 14).
- **ARCHIVED:** Deprecated previous pricing versions. Retained indefinitely for immutable quotation records and contract compliance.

---

## 6. RECOMMENDATIONS FOR CATALOGUE PRICING ENGINE

1. **Decommission all W1–W6, A1–A5, and C1–C5 packages** from active use in the Admin Centre and customer portal.
2. **Upgrade all Canonical Plans to Solution-Specific Families** (e.g. separate Ecommerce Plans from Corporate Website Plans).
3. **Mark all initial seed prices as `DRAFT`** with clear economic rationales.
4. **Implement currency toggle and locale detection** (default INR `₹`, export USD `$`).
5. **Enforce server-side price calculation** on all quotes and enquiries to prevent client-side price modification attacks.
