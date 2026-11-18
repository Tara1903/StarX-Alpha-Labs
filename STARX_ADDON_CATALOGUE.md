# STARX ALPHA LABS — CANONICAL ADD-ON CATALOGUE & MATRIX
**Document ID:** `STARX-SPEC-ADD-006`  
**Date:** November 18, 2026  
**Status:** AUTHORITATIVE SPECIFICATION  
**Author:** Principal Product Architect & Enterprise Pricing Strategist  

---

## 1. ADD-ON ARCHITECTURAL RULES

1. **Strict Compatibility Binding:** Add-ons cannot be blindly added to any solution. Each add-on explicitly declares `applicableSolutions` and `compatiblePlanTiers`.
2. **Multi-Currency Pricing:** Every add-on maintains an authoritative India Domestic price (INR ₹) and Export price (USD $).
3. **Billing Model Distinction:** Add-ons are clearly labeled as `ONE_TIME` (one-off development scope) or `MONTHLY` (ongoing infrastructure, SLA support, or operational retainers).
4. **Duplicate Charge Protection:** A feature that is already classified as `INCLUDED` in the selected plan tier cannot be double-billed as an add-on.

---

## 2. MODULAR ADD-ON RECORDS

| Add-on ID | Name & Tagline | Division | Price (INR) | Price (USD) | Billing Model | Compatible Tiers | Status |
|---|---|---|---|---|---|---|---|
| `addon-seo-mastery` | **Enterprise Technical SEO & Schema Graph**<br>Rank higher on Google with rich snippet structured JSON-LD schemas. | `starx-web` | ₹11,999 | $149 | `ONE_TIME` | Starter, Growth, Pro | `PUBLISHED` |
| `addon-multi-lang-i18n` | **Internationalization & Multi-Language Support**<br>Expand globally with localized language catalogs (English, Hindi, Arabic RTL). | `starx-web` | ₹14,999 | $199 | `ONE_TIME` | All Tiers | `PUBLISHED` |
| `addon-whatsapp-bot` | **WhatsApp Business API Notification Switch**<br>Automate instant order receipts, booking confirmations, and inquiries. | `starx-web` | ₹12,999 | $169 | `ONE_TIME` | Starter, Growth, Pro | `PUBLISHED` |
| `addon-app-dual-store` | **Dual App Store Submission & Compliance Guarantee**<br>Zero-rejection guarantee on Apple App Store & Google Play Store. | `starx-apps` | ₹19,999 | $249 | `ONE_TIME` | Starter, Growth, Pro | `PUBLISHED` |
| `addon-app-offline-sync`| **Offline-First SQLite Database Sync Engine**<br>Keep your mobile app fully operational even without internet connectivity. | `starx-apps` | ₹24,999 | $319 | `ONE_TIME` | Starter, Growth | `PUBLISHED` |
| `addon-biz-extra-counter`| **Additional POS Billing Terminal License**<br>Connect an extra billing counter or mobile tablet terminal. | `starx-business`| ₹7,999 | $99 | `ONE_TIME` | All Tiers | `PUBLISHED` |
| `addon-biz-data-migration`| **Legacy Excel / Tally Data Migration & Cleansing**<br>Safe, zero-loss transfer of customer, stock, and ledger records. | `starx-business`| ₹19,999 | $249 | `ONE_TIME` | All Tiers | `PUBLISHED` |
| `addon-saas-custom-domain`| **Automated Custom Tenant Subdomains & SSL**<br>Allow enterprise customers to point their own custom domain to your SaaS. | `starx-saas` | ₹24,999 | $319 | `ONE_TIME` | Starter, Growth, Pro | `PUBLISHED` |
| `addon-ai-rag-expansion` | **Expanded Document Vault & Vector Index (Up to 50k Pages)**<br>Scale document ingestion to thousands of internal manuals and policies. | `starx-ai` | ₹29,999 | $389 | `ONE_TIME` | Starter, Growth, Pro | `PUBLISHED` |
| `addon-ai-voice-telephony`| **Dedicated Business Virtual Phone Line (DID)**<br>Provision a direct Indian 1800 toll-free or localized virtual phone number. | `starx-ai` | ₹9,999 | $129 | `ONE_TIME` | Starter, Growth, Pro | `PUBLISHED` |
| `addon-priority-sla-monthly`| **Priority SLA & Managed Cloud Operations**<br>24/7 uptime monitoring, automated nightly backups & priority developer support. | All Divisions | ₹9,999 /mo | $129 /mo | `MONTHLY` | All Tiers | `PUBLISHED` |

---

## 3. ADD-ON COMPATIBILITY & VALIDATION MATRIX

| Solution Archetype | Compatible Add-ons | Incompatible / Redundant Add-ons |
|---|---|---|
| `business-websites` | SEO Mastery, Multi-Lang i18n, WhatsApp Switch, Priority SLA | Additional POS Terminal, Dual App Store |
| `ecommerce-websites` | SEO Mastery, Multi-Lang i18n, WhatsApp Switch, Priority SLA | Additional POS Terminal |
| `cross-platform-applications`| Dual App Store Suite, Offline SQLite Sync, Priority SLA | SEO Schema Mastery (Web Only) |
| `pos-billing-systems` | Extra Counter License, Legacy Data Migration, Priority SLA | Dual App Store, Custom Tenant Domains |
| `saas-mvp-launchpad` | Custom Tenant Domain SSL, Multi-Lang i18n, Priority SLA | Extra POS Counter |
| `autonomous-agents` | RAG Vault Expansion, WhatsApp Switch, Priority SLA | Extra POS Counter, Dual App Store |
