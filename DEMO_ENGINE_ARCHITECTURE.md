# STARX ALPHA LABS — DEMO CENTER
## DEMO ENGINE ARCHITECTURE & TECHNICAL SPECIFICATION
**Document Reference:** `DEMO_ENGINE_ARCHITECTURE.md`  
**Date:** November 11, 2026  
**Auditor:** Principal Software Architect  
**Target Platform:** STARX ALPHA LABS (`https://www.starxalphalabs.online`)  

---

## 1. ARCHITECTURAL OVERVIEW

The StarX Alpha Labs Demo Engine is designed to solve a fundamental challenge: providing **160 completely distinct, visually exceptional, industry-accurate commercial software products** while maintaining a high-performance, maintainable, and type-safe Next.js 16 / React 19 codebase.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          DEMO DISPATCHER ROUTE                                  │
│                 /demos/[category]/[demo]/live/page.tsx                          │
└───────────────────────────────────────┬─────────────────────────────────────────┘
                                        │ (dynamic resolution via registry)
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         MODULAR DEMO ENGINE LAYER                               │
│                         src/modules/demo-center/                                │
│                                                                                 │
│   ┌────────────────────┐   ┌────────────────────┐   ┌──────────────────────┐    │
│   │   Registry & Spec  │   │  Isolated Storage  │   │  Interactive Prims   │    │
│   │   (160 Typed Demos)│   │  (useDemoState)    │   │  (KOT, Map, POS, etc)│    │
│   └────────────────────┘   └────────────────────┘   └──────────────────────┘    │
│                                                                                 │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │                      18 INTERFACE ARCHETYPES                            │   │
│   │  POS • Kiosk • Clinic • Diagnostic • WMS • Dispatch • Kanban • Console  │   │
│   │  Storefront • Fleet • Booking • Node Canvas • Terminal • LMS • etc.     │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────┬─────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    160 DEDICATED PRODUCT EXPERIENCES                            │
│         Category 01-12 (Ember & Oak, Little Loom, Northstar Clinic, etc.)       │
│      Unique Brand Tokens • Custom Fonts • Real Workflows • Isolated Data        │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. CORE ARCHITECTURAL MODULES

### 2.1 Demo Registry (`src/modules/demo-center/registry/`)
The central source of truth for all 160 demos. Every demo record exports:
- `id`: Numeric index from 1 to 160.
- `slug`: URL slug matching the business identity.
- `name`: Commercial product name (e.g., "Ember & Oak", "Northstar Family Clinic").
- `categorySlug`: Category key.
- `archetype`: Selected UX archetype (e.g., `pos`, `kiosk`, `clinic`, `ecommerce`, `dispatch`, `kanban`).
- `palette`: Bespoke color tokens (`primary`, `secondary`, `accent`, `bg`, `surface`, `border`, `text`).
- `typography`: Font family recommendation and display styling.
- `workflows`: Explicit names of the 3+ functional interactive workflows implemented.
- `sampleData`: Initial seed dataset tailored to the business.

### 2.2 Isolated State Management (`src/modules/demo-center/state/`)
Each demo operates in its own sandboxed state context powered by the `useDemoState<T>(demoSlug, initialData)` hook:
- **Zero Cross-Contamination:** State is keyed exclusively to `starx_demo_${slug}`. Modifying a restaurant order in Demo 001 will never affect Demo 002.
- **In-Memory & Session Storage:** Persists through navigation within the session.
- **Atomic Reset:** A universal, accessible "Reset Demo" action restores pristine default data instantly with feedback.

### 2.3 The 18 Interface Archetypes
Rather than forcing all demos into a generic dashboard layout, the engine provides 18 UX archetypes:
1. `pos-terminal`: Full-screen floorplan and order ticket split view (e.g. Ember & Oak, Juniper Social).
2. `ordering-kiosk`: High-contrast, large touch-target self-service flow (e.g. Quickstop).
3. `ecommerce-storefront`: Editorial catalog, filter sidebar, cart drawer, checkout (e.g. Threadform, Serein).
4. `booking-calendar`: Slot picker, provider availability, intake forms (e.g. Atelier Table, Solstice Spa).
5. `clinic-operations`: Patient list, consultation queue, vitals and prescription pad (e.g. Northstar Clinic).
6. `diagnostic-lab`: Specimen barcoding, accessioning, test status ladder (e.g. ClearPath Diagnostics).
7. `property-discovery`: Split map and real estate card grid with filters (e.g. Habitat, ParcelView).
8. `fleet-dispatch`: Real-time map, vehicle telemetry, driver assignments (e.g. LastMile, HaulTrack, RoadRescue).
9. `warehouse-wms`: Multi-bin aisle locations, picking/packing lists (e.g. StockPilot, FulfilNest).
10. `kanban-workflow`: Column-based task progression with drag/move actions (e.g. FlowBoard, TalentGrid).
11. `crm-pipeline`: Deal stage stages, lead interaction history, follow-ups (e.g. Keyline, OrbitCRM).
12. `lms-learning`: Video curriculum view, quiz modules, progress certificates (e.g. LearnDeck, CampusOne).
13. `manufacturing-console`: Shopfloor machine lines, OEE charts, downtime loggers (e.g. ForgeOS, FactoryPulse).
14. `quality-inspection`: Checklist gates, photo evidence, defect scoring (e.g. QualityLoop, SiteCheck, InspectAuto).
15. `developer-portal`: Endpoint explorer, interactive mock API runner, syntax blocks (e.g. DevPortal).
16. `node-automation`: Visual automation flow canvas with trigger/action nodes (e.g. Automate Studio).
17. `analytics-canvas`: Metric telemetry, date segmenting, cohort graphs (e.g. MetricLab, ProductSignal).
18. `community-feed`: Moderated topic channels, discussion threads, member badges (e.g. CommunityOS).

---

## 3. INTEGRATION WITH STARX ALPHA LABS PLATFORM

1. **Static Site Generation (SSG):** All 160 `/demos/[category]/[demo]/live` pages are statically pre-rendered via `generateStaticParams()` using Next.js 16 Turbopack for sub-second page loads.
2. **SEO & Metadata:** Each demo route automatically inherits dynamic title, description, and canonical tags pointing to `https://www.starxalphalabs.online/demos/[category]/[demo]/live`.
3. **Admin Portal Synchronization:** The Super Admin Portal (`/admin`) reads the registry directly to populate the Demo Catalog Module with zero duplicate code.
4. **Platform Decoupling:** All simulated operations are self-contained; no communication is routed to production customer databases or external SaaS products.
