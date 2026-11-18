# STARX ALPHA LABS — PLAN ARCHITECTURE & VERSIONING SPECIFICATION
**Document ID:** `STARX-SPEC-PLN-004`  
**Date:** November 18, 2026  
**Status:** AUTHORITATIVE SPECIFICATION  
**Author:** Principal Product Architect & Technical Lead  

---

## 1. PLAN ARCHITECTURAL PRINCIPLES

1. **Solution-Specific Scoping:** Plans are not generic division cards; they are tailored to specific solution archetypes (e.g. Ecommerce Storefront vs Corporate Website; Cloud POS vs Integrated ERP).
2. **Explicit Commercial Boundaries:** No ambiguous "unlimited" promises. Every plan record strictly defines pages/screens, allowed user roles, included revision rounds, SLA response times, post-launch warranty days, and included monthly maintenance hours.
3. **Multi-Component Separation:** Transparent separation between One-Time Development (CapEx), Architecture Staging, Monthly SLA Retainers (OpEx), and Metered Consumption (AI tokens/voice minutes).
4. **Immutable Plan Versioning:** When a customer selects a plan during onboarding, their session is permanently bound to that exact plan version (`version: 1`). Subsequent price changes in the catalogue generate a new version (`version: 2`) without altering active client estimates or approved contracts.

---

## 2. STANDARDIZED TIER DEFINITIONS

| Tier Level | Nomenclature | Purpose & Scope | Target Audience | Warranty | Standard SLA |
|---|---|---|---|---|---|
| **Starter** | Launchpad / Single-Store / MVP | Core functional platform built for immediate validation and initial customer intake. | Founders, Small Businesses, Boutique Outlets | 30–45 Days | Standard 48h |
| **Growth** | Scale / Multi-Branch / Pro | Full-stack platform with dynamic CMS, RBAC, payment switches, and CRM integration. | Growing Companies, Retail Chains, Scale-ups | 60 Days | Priority 24h |
| **Professional** | Advanced / Multi-Tenant | High-concurrency architecture with multi-tenant isolation, metered billing, and audit logs. | Funded Startups, Mid-Market Enterprises | 90 Days | High Priority 4h |
| **Enterprise** | Transformation / Custom Pod | Bespoke enterprise architecture, multi-region cloud, dedicated pod retainer, and SOC-2 vault. | Large Corporations, Financial Conglomerates | 180–365 Days | Mission-Critical 2h |

---

## 3. CANONICAL PLAN RECORDS INVENTORY

### StarX Web Plans
- `web-biz-starter` (Launchpad Business Flagship): ₹49,999 ($699) • Up to 5 Pages • 2 Revisions • 30-Day Warranty
- `web-biz-growth` (Growth Corporate Flagship & CMS): ₹1,19,999 ($1,599) • Up to 12 Pages • 3 Revisions • 60-Day Warranty
- `web-biz-pro` (Enterprise Brand Ecosystem): ₹2,49,999 ($3,299) • Up to 25 Views • 4 Revisions • 90-Day Warranty
- `web-biz-enterprise` (Bespoke Digital Transformation): ₹5,99,999 ($7,999) • Custom Unlimited • 180-Day Warranty
- `web-ecom-starter` (D2C Ecommerce Launchpad): ₹79,999 ($1,049) • Up to 100 Products • UPI Gateway • 45-Day Warranty
- `web-ecom-growth` (Growth Scale Commerce Engine): ₹1,79,999 ($2,399) • Unlimited Products • Multi-Warehouse • 60-Day Warranty

### StarX Apps Plans
- `app-xplat-mvp` (Universal Mobile MVP): ₹89,999 ($1,199) • Up to 6 Core Views • iOS & Android • 45-Day Warranty
- `app-xplat-growth` (Production Scale Mobile Product): ₹2,49,999 ($3,299) • 12–16 Screens • Offline SQLite • 60-Day Warranty

### StarX Business Plans
- `biz-pos-single` (Counter Express Cloud POS): ₹69,999 ($899) • 1 Terminal • Thermal Print Sync • 45-Day Warranty
- `biz-pos-multi` (Multi-Outlet Retail & Chain POS): ₹1,99,999 ($2,599) • Up to 5 Outlets • Central Stock • 60-Day Warranty

### StarX SaaS Plans
- `saas-mvp-launch` (SaaS Launchpad MVP): ₹79,999 ($999) • Multi-Tenancy • Stripe Billing • 45-Day Warranty
- `saas-mvp-pro` (Growth Scale SaaS Engine): ₹2,29,999 ($2,999) • Metered Usage • Webhooks • 60-Day Warranty

### StarX AI Plans
- `ai-agent-starter` (Autonomous Assistant & Agent Pod): ₹59,999 ($799) • Gemini 2.0 • 3 Workflows • 500k Tokens
- `ai-agent-growth` (Multi-Agent Autonomous Orchestration): ₹1,79,999 ($2,399) • Agent Squad • RAG • 2M Tokens

### StarX Custom Plans
- `cust-squad-half` (Dedicated Fractional Engineering Pod): ₹1,99,999 ($2,599)/mo • 2 Senior Engineers • 160h/mo
- `cust-squad-full` (Full Dedicated Engineering Pod): ₹3,99,999 ($5,199)/mo • 4 Senior Engineers • 320h/mo
- `cust-squad-enterprise` (Strategic Enterprise Tech Partnership): ₹8,99,999 ($11,999)/mo • 6+ Senior Specialists
