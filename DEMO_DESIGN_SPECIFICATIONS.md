# STARX ALPHA LABS — DEMO CENTER
## DEMO DESIGN SPECIFICATIONS (ALL 160 PRODUCTS & 18 ARCHETYPES)

---

# 1. OVERVIEW & DESIGN PHILOSOPHY

The StarX Alpha Labs Demo Center is a showcase of 160 distinct, production-quality commercial software applications spanning 12 business categories. Rather than relying on monolithic dashboard templates, every single demo possesses:

1. **Independent Product Identity**: Distinct business naming, tailored typography, custom brand token palette, and domain-specific vocabulary.
2. **Interface Archetype Selection**: 18 specialized interface archetypes (POS terminal, ordering kiosk, clinic EHR, diagnostic lab, property discovery, fleet dispatch, warehouse WMS, kanban workflow, CRM pipeline, LMS player, manufacturing console, quality inspection snag sheet, developer portal, node automation canvas, analytics canvas, and community feed).
3. **Dedicated Interactive Workflows**: Exactly 3 state-changing end-to-end workflows per product with live data mutation and zero cross-demo leakage.
4. **Isolated Persistence**: Clean browser `sessionStorage` state caching keyed to each demo slug with an instant "Reset State" safety action.

---

# 2. THE 18 INTERFACE ARCHETYPES & DESIGN SPECS

### Archetype 1: `pos-terminal` (Full-Screen Hospitality POS)
- **Primary Use Case**: Fine dining restaurants, gastropubs, craft breweries, fast casual dine-in.
- **Visual Composition**: Multi-column terminal with high-density dining floorplan (tables color-coded by occupancy, billing, and reservation status), real-time ticket sidebar, and modifier adder.
- **Key Interactions**:
  - Click table to load seat ticket.
  - Add items with modifiers (cooking temperature, dietary tags).
  - Fire courses to simulated KOT kitchen display.
  - Split bills by seat counts with tax computation.

### Archetype 2: `ordering-kiosk` (Touch-First Ordering Kiosk)
- **Primary Use Case**: Quick-service restaurants, bus ticketing counters, festival passes, fast casual takeaway.
- **Visual Composition**: High-contrast, large-touch targets, full-bleed product cards, floating tray summary, and token counter.
- **Key Interactions**:
  - Tap card to add to order tray.
  - Customise sizes, meal combos, and sides.
  - Instant token generation (#A-42) for pickup counter display.

### Archetype 3: `ecommerce-storefront` (Luxury & D2C Commerce)
- **Primary Use Case**: Fashion boutiques, sneaker releases, fine jewellery, organic skincare.
- **Visual Composition**: Editorial typography, product aspect ratio cards, filter bar (sizes, materials, categories), and quick-add to bag.
- **Key Interactions**:
  - Filter by collection and availability.
  - Add to bag with toast feedback.
  - Instant simulated checkout drawer.

### Archetype 4: `booking-calendar` (Appointment & Availability Scheduler)
- **Primary Use Case**: Hair salons, day spas, dental clinics, coworking desks, glamping domes.
- **Visual Composition**: Split layout featuring date picker, resource slots (chairs, rooms, suites), and confirmed appointment log.
- **Key Interactions**:
  - Select time slot and therapist/stylist.
  - Form validation for guest preferences.
  - Instant booking voucher issuance.

### Archetype 5: `clinic-operations` (Doctor EHR & Consultation Queue)
- **Primary Use Case**: Family practices, polyclinics, optometry, outpatient departments.
- **Visual Composition**: Patient triage queue, electronic medical record with vital signs radar (BP, Pulse, SpO2), and digital Rx pad.
- **Key Interactions**:
  - Advance patient queue from Waiting to In Consultation.
  - Formulate medication prescriptions with dosage schedules.
  - Digital sign-off and issue to patient portal.

### Archetype 6: `diagnostic-lab` (Pathology Accessioning & Analyzer)
- **Primary Use Case**: Diagnostic laboratories, imaging centers, blood banks.
- **Visual Composition**: Specimen accessioning table with barcode scans, analyzer progress pipeline, and verified report release.
- **Key Interactions**:
  - Track specimen accessioning through centrifuging and PCR assay.
  - Flag abnormal values against reference biological intervals.
  - Electronic sign-off by consulting pathologist.

### Archetype 7: `property-discovery` (Real Estate Listing & Map Split)
- **Primary Use Case**: Residential sales, commercial leasing, land parcel exploration, destination travel.
- **Visual Composition**: Split-screen with simulated interactive map pins, budget/size filters, unit inventory grid, and visit booking.
- **Key Interactions**:
  - Filter listings by price range and bedroom layout.
  - View floorplate specs.
  - Schedule in-person site visit consultations.

### Archetype 8: `fleet-dispatch` (Logistics & GPS Telemetry)
- **Primary Use Case**: Courier hubs, trucking fleets, roadside assistance, field technician dispatch.
- **Visual Composition**: Vehicle roster with active route stops, live speed telemetry, ETA counters, and emergency alert broadcast.
- **Key Interactions**:
  - Assign drivers to active delivery manifests.
  - Monitor route progress and proof-of-delivery milestones.
  - Emergency SOS broadcast to active vehicles.

### Archetype 9: `warehouse-wms` (Bin Locator & Wave Pick)
- **Primary Use Case**: E-commerce fulfillment, raw material stock, auto parts distributors.
- **Visual Composition**: Multi-bin matrix (Aisle-Rack-Shelf-Bin), wave picking list, and safety stock status alerts.
- **Key Interactions**:
  - Assign pick lists to warehouse staff.
  - Transfer stock between bin locations.
  - Trigger purchase requisitions when below safety stock.

### Archetype 10: `kanban-workflow` (Agile Boards & Production Sprints)
- **Primary Use Case**: Software squads, marketing agencies, construction DPR, architectural drawing revisions.
- **Visual Composition**: Drag/click multi-column Kanban board (Backlog, In Progress, Review, Done) with priority chips and story points.
- **Key Interactions**:
  - Move tasks across progress stages.
  - Create new work items with assignee and priority tags.
  - Track squad velocity and completion percentage.

### Archetype 11: `crm-pipeline` (Enterprise Deal Funnel)
- **Primary Use Case**: B2B sales teams, insurance brokerages, law firm retainers, recruitment ATS.
- **Visual Composition**: Multi-stage deal funnel with weighted pipeline values, client cards, and activity log.
- **Key Interactions**:
  - Advance prospective deals from Qualification to Won.
  - Log meeting notes and objection handling.
  - Generate parameterized offer/retainer documents.

### Archetype 12: `lms-learning` (Course Player & Curriculum)
- **Primary Use Case**: Online bootcamps, corporate compliance training, university portals.
- **Visual Composition**: Video player simulator, modular curriculum syllabus with completion ticks, and interactive quiz runner.
- **Key Interactions**:
  - Play module lessons with time tracking.
  - Complete check-for-understanding quizzes.
  - Generate personalized verified course completion certificates.

### Archetype 13: `manufacturing-console` (Shopfloor OEE Telemetry)
- **Primary Use Case**: Stamping plants, bottling lines, SMT assembly, CNC machining, chemical reactors.
- **Visual Composition**: Live plant telemetry gauges (OEE, Availability, Performance, Quality), line speed monitors, and downtime loggers.
- **Key Interactions**:
  - Release production work orders to specific machine centers.
  - Log machine downtime micro-stoppages with Pareto cause trees.
  - Audit finished parts and scrap counts against shift quotas.

### Archetype 14: `quality-inspection` (First-Article Snag Sheet)
- **Primary Use Case**: Aerospace machining, precision tooling, civil construction snag lists.
- **Visual Composition**: Specification tolerance verifier (Nominal, USL, LSL), measured gauge readings, and CAPA tickets.
- **Key Interactions**:
  - Verify measured dimensions against engineering specifications.
  - Issue Non-Conformance Reports (NCR) with photographic proof tags.
  - Sign off on final lot quarantine release.

### Archetype 15: `developer-portal` (API Docs & Request Runner)
- **Primary Use Case**: API platforms, fintech gateways, developer tools, AI microservices.
- **Visual Composition**: OpenAPI endpoint explorer, multi-language code switcher (cURL, TypeScript, Python), and live mock runner.
- **Key Interactions**:
  - Switch code languages instantly.
  - Inspect JSON schemas and authorization headers.
  - Execute simulated live HTTP requests and view 200 OK payloads.

### Archetype 16: `node-automation` (Visual Workflow Canvas)
- **Primary Use Case**: Integration builders, marketing automation, cloud orchestrators.
- **Visual Composition**: Step-by-step trigger-to-action node canvas, conditional logic branches, and live execution path glows.
- **Key Interactions**:
  - Connect triggers to conditional filters and actions.
  - Execute test runs with animated step timers.
  - Inspect intermediate JSON payload outputs.

### Archetype 17: `analytics-canvas` (SaaS Telemetry & Cohorts)
- **Primary Use Case**: SaaS revenue analytics, chartered accountancy close, product conversion funnels.
- **Visual Composition**: ARR/MRR metrics, growth waterfalls, cohort retention heatmaps, and export tools.
- **Key Interactions**:
  - Filter telemetry by date ranges and cohorts.
  - Inspect expansion vs churn breakdowns.
  - Export reports to CSV/PDF.

### Archetype 18: `community-feed` (Discussion Channels & Forums)
- **Primary Use Case**: Developer relations hubs, creator clubs, conference attendee networking.
- **Visual Composition**: Channel sidebar (#general, #showcase, #help), thread feed with upvotes, member badges, and virtual AMA calendar.
- **Key Interactions**:
  - Switch discussion channels.
  - Post replies and upvote community contributions.
  - RSVP for upcoming town halls and speaker AMAs.

---

# 3. CATEGORY ARCHITECTURE SUMMARY

| Category # | Name | Demos Count | Archetypes Used |
|---|---|---|---|
| 01 | Food & Hospitality | 14 | `pos-terminal`, `ordering-kiosk`, `booking-calendar` |
| 02 | Retail & Ecommerce | 14 | `ecommerce-storefront`, `ordering-kiosk`, `warehouse-wms` |
| 03 | Healthcare | 14 | `clinic-operations`, `diagnostic-lab`, `booking-calendar` |
| 04 | Real Estate | 14 | `property-discovery`, `crm-pipeline`, `quality-inspection` |
| 05 | Education | 13 | `lms-learning`, `booking-calendar`, `kanban-workflow` |
| 06 | Automotive | 13 | `fleet-dispatch`, `booking-calendar`, `quality-inspection` |
| 07 | Beauty & Wellness | 13 | `booking-calendar`, `ecommerce-storefront` |
| 08 | Logistics & Transport | 13 | `fleet-dispatch`, `warehouse-wms`, `ordering-kiosk` |
| 09 | Professional Services | 13 | `crm-pipeline`, `analytics-canvas`, `kanban-workflow` |
| 10 | Manufacturing | 13 | `manufacturing-console`, `quality-inspection`, `warehouse-wms` |
| 11 | Travel & Events | 13 | `property-discovery`, `booking-calendar`, `ordering-kiosk`, `community-feed` |
| 12 | Technology & SaaS | 13 | `analytics-canvas`, `kanban-workflow`, `developer-portal`, `node-automation`, `community-feed` |
| **TOTAL** | **12 Categories** | **160 Demos** | **18 Archetypes** |
