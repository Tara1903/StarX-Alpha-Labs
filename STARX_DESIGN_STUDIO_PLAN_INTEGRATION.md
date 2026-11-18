# STARX ALPHA LABS — DESIGN STUDIO PLAN INTEGRATION REPORT
**Document ID:** `STARX-REP-INT-013`  
**Date:** November 18, 2026  
**Status:** COMPLETE & VERIFIED  
**Components:** `Step13Plans.tsx` & `Step14Config.tsx`  
**Route:** `/design-studio` (Steps 13 & 14)  
**Author:** Principal UX Architect & Full-Stack Systems Lead  

---

## 1. CUSTOMER-FACING JOURNEY ARCHITECTURE

The customer onboarding flow at Chapter 3 connects directly to the Master Commercial Catalogue, providing an intelligent, personalized, and transparent commercial scoping experience.

```
Step 1–12: Requirement Discovery
  └─ Division (Step 3) + Industry (Step 4) + Solution (Step 5) + Features (Step 9) + Scale (Step 11)
       │
       ▼
Step 13: Plan Recommendation & Comparison
  ├─ Evaluates Multi-Factor Complexity Score (1–10)
  ├─ Calls `/api/design-studio/plans?division=...&solution=...&complexity=...`
  ├─ Displays "Recommended for Your Requirements" with AI Justification
  ├─ Currency Toggle: INR (₹) / USD ($)
  ├─ Renders Selectable Plan Cards with Scoping Boundaries
  └─ Side-by-Side Commercial Comparison Table
       │
       ▼
Step 14: Scope & Add-on Configuration
  ├─ Retrieves Exact Selected Plan Version
  ├─ Displays Included Base Features (100% In Scope)
  ├─ Displays Optional Modular Add-ons with Multi-Currency Pricing
  ├─ Displays Higher-Tier Features (Scale & Enterprise Tiers)
  └─ Live Authoritative Investment Ledger (Net + 18% GST = Gross Total)
       │
       ▼
Step 15–16: Personalisation & Stitch Demo Generation
```

---

## 2. STEP 13 IMPLEMENTATION EVIDENCE

### Verified UI Elements
1. **Heading:** *"We've Understood Your Idea. Let's Find the Right Plan."*
2. **Recommendation Banner:**
   - Displays Recommended Plan Name (e.g. `D2C Ecommerce Launchpad`).
   - Match Score Confidence (e.g. `96% Match Score`).
   - Contextual Justification: *"For your direct-to-consumer online store with instant UPI checkout and catalog management, the D2C Ecommerce Launchpad delivers high conversion from day one."*
   - Highlights Scope, Delivery Timeline, and SLA.
3. **Selectable Plan Cards:** Shows price in INR (default) with one-click toggle to USD export pricing.
4. **Side-by-Side Comparison Table:** Directly compares Investment, Scope Allowance, Estimated Timeline, SLA Level, Warranty Coverage, Included Revisions, and 100% IP Code Ownership.
5. **Screenshot Artifact:** `C:\Users\taras\.gemini\antigravity\brain\32133052-3c69-445b-87f6-80b9dce5f005\step-13-commercial-catalogue.png` (180 KB).

---

## 3. STEP 14 IMPLEMENTATION EVIDENCE

### Verified UI Elements
1. **Heading:** *"Configure Your Scope & Add-ons"*
2. **Included Capabilities (Left Column):**
   - Renders all features classified as `INCLUDED` for the selected plan with emerald checkmarks.
3. **Optional Modular Add-ons:**
   - Interactive checkboxes for compatible add-ons (e.g. `Enterprise Technical SEO & Schema Graph` @ ₹11,999; `Priority SLA & Managed Ops` @ ₹9,999/mo).
4. **Authoritative Investment Ledger (Right Column):**
   - Itemized breakdown of base plan + selected add-ons.
   - Calculates Net Subtotal.
   - Computes statutory 18% GST automatically for domestic Indian transactions.
   - Displays Gross Total Investment.
   - Discloses post-launch warranty and SLA response time guarantees.
5. **Screenshot Artifact:** `C:\Users\taras\.gemini\antigravity\brain\32133052-3c69-445b-87f6-80b9dce5f005\step-14-scope-config.png` (102 KB).
