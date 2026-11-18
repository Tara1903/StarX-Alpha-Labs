# STARX ALPHA LABS — CANONICAL SERVICE & SOLUTION CATALOGUE
**Document ID:** `STARX-SPEC-SVC-003`  
**Date:** November 18, 2026  
**Status:** AUTHORITATIVE SPECIFICATION  
**Author:** Principal Product Architect & Solutions Strategist  

---

## 1. CATALOGUE HIERARCHY

The StarX commercial architecture enforces a strict 7-level structural hierarchy:
```
Division
  └─ Service Category
       └─ Solution Archetype
            └─ Plan Family
                 └─ Canonical Plan & Tier
                      └─ Feature Groups & Classifications
                           └─ Add-ons & Multi-Component Pricing
```

---

## 2. DIVISION & SERVICE MAPPINGS

### Division 1: StarX Web (`starx-web`)
*Tagline: High-Performance Web Platforms, Portals & Digital Flagships*

| Solution ID | Slug | Solution Name | Applicable Industries | Target Platforms | Default Plan Family |
|---|---|---|---|---|---|
| `sol-web-biz` | `business-websites` | Corporate & Business Websites | Retail, Healthcare, Real Estate, Education, Finance, Legal, Hospitality | Web Desktop, Web Mobile, Tablet | `fam-web-biz` |
| `sol-web-ecom` | `ecommerce-websites` | Custom Headless Ecommerce Store | Retail, Media, Wellness, Manufacturing | Web Desktop, Web Mobile | `fam-web-ecom` |
| `sol-web-land` | `landing-pages` | High-Conversion Landing Funnels | Retail, Finance, EdTech, Real Estate | Web Desktop, Web Mobile | `fam-web-land` |
| `sol-web-app` | `web-applications` | Full-Stack Web Applications | Finance, Healthcare, Logistics, EdTech, Gov | Web Desktop, Web Mobile, Tablet | `fam-web-app` |
| `sol-web-book` | `booking-portals` | Interactive Booking & Portals | Healthcare, Hospitality, Wellness, Legal | Web Desktop, Web Mobile | `fam-web-book` |
| `sol-web-dash` | `enterprise-portals` | Enterprise Intranet & Dashboards | Logistics, Manufacturing, Finance, Gov | Web Desktop, Tablet | `fam-web-dash` |

---

### Division 2: StarX Apps (`starx-apps`)
*Tagline: Native & Universal Mobile Applications Built for Scale*

| Solution ID | Slug | Solution Name | Applicable Industries | Target Platforms | Default Plan Family |
|---|---|---|---|---|---|
| `sol-app-and` | `android-applications` | Native Android App (Kotlin/Compose) | Retail, Logistics, Healthcare, EdTech | Android Phone, Tablet | `fam-app-and` |
| `sol-app-ios` | `ios-applications` | Native iOS App (Swift/SwiftUI) | Retail, FinTech, Wellness, Media | iOS Phone, iPad | `fam-app-ios` |
| `sol-app-xplat` | `cross-platform-applications`| Universal Mobile App (React Native) | Retail, Healthcare, EdTech, PropTech | iOS Phone, Android Phone | `fam-app-xplat` |
| `sol-app-ecom` | `ecommerce-mobile-apps` | Mobile Shopping & Store App | Retail, Wellness, Consumer Brands | iOS Phone, Android Phone | `fam-app-ecom` |
| `sol-app-deliv` | `delivery-logistics-apps` | On-Demand Delivery & Dispatch | Logistics, Hospitality, Retail | iOS Phone, Android Phone | `fam-app-deliv` |

---

### Division 3: StarX Business (`starx-business`)
*Tagline: Cloud POS, Inventory, Operational ERP & Commercial Suites*

| Solution ID | Slug | Solution Name | Applicable Industries | Target Platforms | Default Plan Family |
|---|---|---|---|---|---|
| `sol-biz-pos` | `pos-billing-systems` | Cloud POS & Retail Billing Engine | Retail, Hospitality, Healthcare | Web Desktop, Tablet, POS | `fam-biz-pos` |
| `sol-biz-inv` | `inventory-stock-management`| Multi-Warehouse Stock Suite | Retail, Manufacturing, Logistics | Web Desktop, Handheld | `fam-biz-inv` |
| `sol-biz-rest` | `restaurant-management` | Restaurant & Kitchen Suite (KDS) | Hospitality, Restaurants, Cafes | Tablet, Web Desktop, KDS | `fam-biz-rest` |
| `sol-biz-crm` | `crm-pipeline-management` | Lead Capture & Sales CRM | Real Estate, FinTech, EdTech | Web Desktop, Web Mobile | `fam-biz-crm` |
| `sol-biz-erp` | `enterprise-erp-operations` | Integrated Enterprise ERP Suite | Manufacturing, Logistics, Healthcare | Web Desktop | `fam-biz-erp` |
| `sol-biz-hr` | `hr-payroll-attendance` | HR, Attendance & Payroll Portal | EdTech, Healthcare, Industrial | Web Desktop, Web Mobile | `fam-biz-hr` |

---

### Division 4: StarX SaaS (`starx-saas`)
*Tagline: Multi-Tenant Cloud Software Products & Subscription Platforms*

| Solution ID | Slug | Solution Name | Applicable Industries | Target Platforms | Default Plan Family |
|---|---|---|---|---|---|
| `sol-saas-mvp` | `saas-mvp-launchpad` | B2B SaaS MVP Prototype | Professional Services, FinTech | Web Desktop, Web Mobile | `fam-saas-mvp` |
| `sol-saas-scale`| `saas-scale-platform` | High-Concurrency SaaS Platform | FinTech, Media, EdTech, Logistics | Web Desktop | `fam-saas-scale` |
| `sol-saas-ai` | `ai-enabled-saas` | AI-First SaaS Application | EdTech, Healthcare, PropTech | Web Desktop, Web Mobile | `fam-saas-ai` |
| `sol-saas-dev` | `developer-platform-saas`| Developer Platform & Cloud API | FinTech, Logistics, Media | Web Desktop | `fam-saas-dev` |

---

### Division 5: StarX AI (`starx-ai`)
*Tagline: Autonomous AI Agents, Copilots, RAG Systems & Voice Assistants*

| Solution ID | Slug | Solution Name | Applicable Industries | Target Platforms | Default Plan Family |
|---|---|---|---|---|---|
| `sol-ai-agent` | `autonomous-agents` | Autonomous Agent Workflows | FinTech, Healthcare, PropTech | Web Desktop, Background | `fam-ai-agent` |
| `sol-ai-rag` | `rag-document-intelligence` | Enterprise Document RAG & Search | Healthcare, EdTech, FinTech, Gov | Web Desktop, Web Mobile | `fam-ai-rag` |
| `sol-ai-voice` | `voice-ai-receptionists` | Conversational Voice AI Agent | Healthcare, Real Estate, Hotels | Telephony / Phone Line | `fam-ai-voice` |
| `sol-ai-copilot`| `product-copilots` | Embedded Product Copilot | Professional Services, FinTech | Web Desktop, Web Mobile | `fam-ai-copilot` |
| `sol-ai-vision` | `computer-vision-systems` | Computer Vision Quality Inspection | Manufacturing, Logistics, Retail | Web Desktop, Camera | `fam-ai-vision` |

---

### Division 6: StarX Custom (`starx-custom`)
*Tagline: Bespoke Engineering, Cloud Infrastructure & Dedicated Pods*

| Solution ID | Slug | Solution Name | Applicable Industries | Target Platforms | Default Plan Family |
|---|---|---|---|---|---|
| `sol-cust-api` | `custom-backend-apis` | High-Concurrency Distributed APIs | FinTech, Logistics, Media, Retail | Cloud Serverless / Edge | `fam-cust-api` |
| `sol-cust-infra`| `cloud-infrastructure-devops`| Sovereign Cloud & Kubernetes | FinTech, Healthcare, Gov | AWS, GCP, Azure, Bare Metal | `fam-cust-infra` |
| `sol-cust-legacy`| `legacy-modernization` | Legacy Modernization & Migration | FinTech, Manufacturing, Gov | Enterprise Datacenter | `fam-cust-legacy` |
| `sol-cust-squad`| `dedicated-engineering-pods` | Dedicated Senior Engineering Pod | All 12 Canonical Industries | Universal / All Platforms | `fam-cust-squad` |

---

## 3. INDUSTRY MATRIX INTEGRATION

Every solution archetype is mapped to at least one of the 12 canonical industries:
1. `retail-commerce`: 8 Solutions mapped
2. `healthcare-life-sciences`: 9 Solutions mapped
3. `real-estate-property`: 6 Solutions mapped
4. `education-edtech`: 8 Solutions mapped
5. `financial-services`: 11 Solutions mapped
6. `hospitality-travel`: 5 Solutions mapped
7. `logistics-supply-chain`: 8 Solutions mapped
8. `media-entertainment`: 5 Solutions mapped
9. `professional-services`: 7 Solutions mapped
10. `manufacturing-industrial`: 6 Solutions mapped
11. `fitness-wellness`: 4 Solutions mapped
12. `public-sector-gov`: 5 Solutions mapped
