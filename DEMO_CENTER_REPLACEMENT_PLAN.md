# STARX ALPHA LABS — DEMO CENTER
## MASTER REPLACEMENT PLAN: 160 PRODUCTION-GRADE BUSINESS DEMOS
**Document Reference:** `DEMO_CENTER_REPLACEMENT_PLAN.md`  
**Date:** November 11, 2026  
**Auditor:** Principal Software Architect & QA Director  
**Target Platform:** STARX ALPHA LABS (`https://www.starxalphalabs.online`)  

---

## 1. REPLACEMENT OBJECTIVES & CONSTRAINTS

1. **Complete Catalogue Replacement:** Replace the synthetic 160 placeholder models with the **authoritative 160 business software products** across 12 distinct industry categories.
2. **True Product Individuality:** Every demo must feature a bespoke visual direction, custom color palette, tailored typography hierarchy, and a dedicated interface layout appropriate to its commercial archetype (e.g. POS terminal, Kiosk, Clinic EHR, Laboratory accessioning, Logistics dispatch, CNC manufacturing console, etc.).
3. **Zero Monolithic Simulator:** Replace `LiveDemoSimulator.tsx` with a modular, archetype-driven **Demo Engine** (`src/modules/demo-center/`) capable of loading distinct product experiences with isolated browser state, real interactive workflows, and instant reset.
4. **Authentic Business Workflows:** Every demo must feature at least 3 genuine end-to-end interactive workflows with real-time UI state updates.
5. **Preservation of Platform Decoupling:** STARX FLOW (`https://starx-flow.runs-on.dev/`) remains completely decoupled.

---

## 2. THE AUTHORITATIVE 12 CATEGORIES TAXONOMY

| Cat # | Category Name | Slug | Demos | Key Focus Areas |
|---|---|---|---|---|
| **01** | Food & Hospitality | `food-hospitality` | 14 | POS, KOT, Cloud Kitchens, Kiosks, Fine Dining, Room Service, Catering |
| **02** | Retail & Ecommerce | `retail-ecommerce` | 14 | D2C Stores, B2B Wholesalers, Marketplaces, Sneaker Drops, Hardware SKUs |
| **03** | Healthcare | `healthcare` | 14 | Clinic EHR, Patient Portals, Dental Charts, Diagnostic Labs, Blood Banks |
| **04** | Real Estate | `real-estate` | 14 | Property Portals, Agent CRM, Leasing, Inspections, Co-Living, Auctions |
| **05** | Education | `education` | 13 | School SIS, University Portals, LMS, Coding Bootcamps, Exam Centers |
| **06** | Automotive | `automotive` | 13 | Dealerships, Service Bays, EV Charging, Rental Fleets, Roadside Rescue |
| **07** | Beauty & Wellness | `beauty-wellness` | 13 | Salons, Spas, Gym Membership, Personal Trainers, Aesthetic Studios |
| **08** | Logistics & Transport | `logistics-transport` | 13 | Courier Tracking, WMS, Dispatch Towers, Cold Chain, Reverse Logistics |
| **09** | Professional Services | `professional-services` | 13 | Law Portals, Accounting Ledgers, Consulting, Agency ATS, Architecture |
| **10** | Manufacturing | `manufacturing` | 13 | Production Lines, OEE Telemetry, QC Gates, CNC Job Queues, Batch Tracing |
| **11** | Travel & Events | `travel-events` | 13 | Travel Booking, Hotel PMS, Resort Concierge, Ticketing, Wedding Planning |
| **12** | Technology & SaaS | `technology-saas` | 13 | Analytics Dashboards, Project Kanban, CRM, API Portals, Cloud Consoles |
| **TOTAL** | **12 Categories** | | **160** | **Complete Commercial Spectrum** |

---

## 3. MASTER CATALOGUE OF ALL 160 DEMOS

### CATEGORY 01: FOOD & HOSPITALITY (14 Demos)
1. `001` — **Ember & Oak**: Restaurant POS (Floorplan, table status, KOT dispatch, bill splitting)
2. `002` — **Little Loom**: Neighbourhood Cafe (Beverage customizer, mobile pickup queue, loyalty ledger)
3. `003` — **Tandoor House**: Cloud Kitchen Management (Kitchen stations, live ticket queue, station handover)
4. `004` — **StreetBite**: Food Truck Ordering (Location ping, mobile ordering, sold-out toggle)
5. `005` — **Maison Crumb**: Bakery & Patisserie (Preorder calendar, bespoke cake customizer, batch capacity)
6. `006` — **Atelier Table**: Fine Dining Reservations (Interactive seating plan, tasting menus, guest allergies)
7. `007` — **Grand Meridian**: Hotel Room Service (Room-tagged ordering, delivery dispatch, VIP preferences)
8. `008` — **Harvest Basket**: Fresh Grocery Market (Weight-based checkout, aisle search, smart replenishment)
9. `009` — **Dockside**: Seafood Counter (Catch origin tags, batch freshness tracker, wastage log)
10. `010` — **Gather & Grain**: Catering Management (Event banquet proposals, headcount scale, chef scheduling)
11. `011` — **Quickstop**: QSR Touchscreen Kiosk (High-contrast touch targets, upsell combos, order token display)
12. `012` — **Pressed & Pulp**: Juice Bar (Interactive smoothie builder, ingredient nutrition calculator, takeaway orders)
13. `013` — **Dash District**: Food Delivery Merchant Console (Live order ingestion, rider assignment, ETA monitor)
14. `014` — **Juniper Social**: Bar & Pub Management (Open bar tabs, cocktail queue, happy hour rules, split bills)

### CATEGORY 02: RETAIL & ECOMMERCE (14 Demos)
15. `015` — **Threadform**: Fashion Boutique (Editorial lookbook, size/fit filter, visual wishlist, mock checkout)
16. `016` — **Sole Society**: Sneaker Store (Drop countdown timer, sneaker size selector, raffle queue entry)
17. `017` — **Circuit Lab**: Electronics Store (Technical spec side-by-side comparison, warranty selector, stock monitor)
18. `018` — **Form & Field**: Furniture & Interiors (Room planner compositions, material swatches, dimensions inspector)
19. `019` — **Heirloom**: Jewellery Boutique (Macro gemstone inspector, metal carat switcher, custom design request)
20. `020` — **MarketLane**: Supermarket Operations (Barcode scanner POS simulation, SKU price updater, shelf restock)
21. `021` — **WellSpring Retail Pharmacy**: Pharmacy Storefront (OTC wellness catalog, mock prescription upload, click-and-collect)
22. `022` — **Paper Trail**: Bookstore (Reading lists, staff book recommendations, author index, genre filters)
23. `023` — **GlossHaus**: Cosmetics Retail (Shade finder tool, cruelty-free filter, ingredient breakdown, customer reviews)
24. `024` — **Summit Supply**: Sports & Outdoor Store (Gear specification cards, bundle builder, outdoor terrain filters)
25. `025` — **Bolt & Timber**: Hardware Store (SKU part-number search, counter sale order pad, bin aisle locations)
26. `026` — **Serein**: Direct-to-Consumer Storefront (High-conversion landing page, cart slide-over, discount coupon engine)
27. `027` — **Bazaar Collective**: Multi-Vendor Marketplace (Vendor storefront switcher, commission breakdown, multi-item checkout)
28. `028` — **Horology**: Luxury Watch Boutique (Movement specification sheet, appointment booking, servicing intake)

### CATEGORY 03: HEALTHCARE (14 Demos)
29. `029` — **Northstar Family Clinic**: Clinic Management (Doctor consultation schedules, patient check-in, visit logs)
30. `030` — **Meridian Hospital**: Patient Portal (Digital health records, lab report viewer, upcoming appointments)
31. `031` — **Brightline Dental**: Dental Practice (Interactive dental tooth chart, treatment stages, procedure ledger)
32. `032` — **ClearPath Diagnostics**: Diagnostic Laboratory (Sample barcoding, specimen accessioning, test report publisher)
33. `033` — **Restore Motion**: Physiotherapy Clinic (Exercise regimen builder, joint mobility tracker, recovery timeline)
34. `034` — **Focus Eye**: Optometry Practice (Eyewear frame catalogue, lens prescription record, fitting status)
35. `035` — **Paw & Pine**: Veterinary Clinic (Pet medical records, vaccination calendar, owner communication portal)
36. `036` — **Stillwater**: Mental Wellness Booking (Practitioner credentials, confidential session scheduler, calm intake)
37. `037` — **Pulse Connect**: Telehealth Platform (Simulated virtual waiting room, video consultation state, clinical notes)
38. `038` — **Atlas Radiology**: Imaging Centre (DICOM/study viewer layout, radiologist findings, PACS worklist)
39. `039` — **RedDrop**: Blood Bank Management (Inventory matrix by blood group, expiry date alerts, emergency hospital requests)
40. `040` — **Homeward Care**: Home Healthcare Operations (Caregiver dispatch map, patient visit checklist, care plans)
41. `041` — **MedEquip Rental**: Medical Equipment Rental (Oxygen/wheelchair availability calendar, asset condition inspection)
42. `042` — **CarePath**: Patient Follow-Up Management (Post-discharge reminder queues, patient check-in timeline, recovery alerts)

### CATEGORY 04: REAL ESTATE (14 Demos)
43. `043` — **Habitat**: Property Discovery Marketplace (Map & listing split view, price filter, virtual tour launcher)
44. `044` — **Keyline**: Real Estate Agent CRM (Lead deal pipeline, property showing schedule, client interaction notes)
45. `045` — **Hearthstone**: Rental Property Management (Tenant lease ledger, rent tracking, maintenance ticket desk)
46. `046` — **Skyline Residences**: Residential Project Sales (Interactive floor-plate unit selector, reservation hold, amenity gallery)
47. `047` — **Workstead**: Commercial Leasing (Floor square-footage filter, lease proposal generator, viewing bookings)
48. `048` — **SiteCheck**: Property Inspection (Room-by-room snag list, photo evidence uploader, defect severity rating)
49. `049` — **Haven Facilities**: Facility Management (Building asset list, preventive maintenance schedule, work order board)
50. `050` — **BrokerDesk**: Brokerage Operations (Commission split calculation, closing checklist, broker sales leaderboard)
51. `051` — **CommonGround**: Co-Living Management (Room inventory, resident matching, communal event calendar)
52. `052` — **EstateRoom**: Property Auction Platform (Live bid simulator, lot catalog, auction countdown, reserve price indicator)
53. `053` — **Build & Beyond**: Property Developer Dashboard (Construction milestone Gantt, contractor progress, permit tracking)
54. `054` — **ParcelView**: Land & Plot Explorer (Topographic plot boundary viewer, zoning info, dimension calculator)
55. `055` — **MoveIn**: Tenant Onboarding Portal (Move-in digital checklist, utility activation tracker, key handover signoff)
56. `056` — **PropertyScope**: Market Research Workspace (Neighborhood valuation trends, rental yield comparisons, exportable briefs)

### CATEGORY 05: EDUCATION (13 Demos)
57. `057` — **CampusOne**: School Management System (Student attendance register, class timetable builder, school noticeboard)
58. `058` — **UniSphere**: University Student Portal (Semester course registration, GPA transcript viewer, assignment drop box)
59. `059` — **LearnDeck**: Learning Management System (Video curriculum player, interactive quiz engine, completion certificates)
60. `060` — **RankRise**: Coaching & Test Preparation (Mock exam timer, question palette, national percentile analytics)
61. `061` — **LinguaHouse**: Language Academy (Vocabulary trainer, 1-on-1 speaking session booking, CEFR level tracker)
62. `062` — **Little Acorns**: Preschool Parent App (Daily activity photo feed, nap/meal log, teacher messaging)
63. `063` — **CourseCraft**: Online Course Creator (Drag-and-drop module curriculum builder, student enrollment stats, sales preview)
64. `064` — **StackForge Academy**: Coding Bootcamp (Terminal/IDE layout, code submission reviewer, cohort sprint board)
65. `065` — **Archive & Co.**: Library Management (Book barcode catalog search, loan due-date tracker, member borrowing history)
66. `066` — **SkillFoundry**: Vocational Training (Workshop practical stations, apprenticeship logbook, certification awards)
67. `067` — **ExamPoint**: Examination Centre (Hall seat allocation map, candidate biometric status, invigilator duty list)
68. `068` — **TutorLoop**: Tutoring Marketplace (Subject tutor search, hourly rate comparison, lesson slot reservation)
69. `069` — **ClassClock**: Timetable & Attendance (Teacher substitution engine, classroom clash detection, daily period grid)

### CATEGORY 06: AUTOMOTIVE (13 Demos)
70. `070` — **Apex Motors**: Car Dealership Management (Showroom inventory showroom, test drive bookings, finance calculator)
71. `071` — **TorqueWorks**: Vehicle Service Centre (Bay repair queue, technician labor work order, spare part picker)
72. `072` — **RoamDrive**: Car Rental Platform (Fleet availability calendar, deposit calculator, pickup/return inspection)
73. `073` — **ReDrive**: Used Car Marketplace (Vehicle history report, multi-point inspection score, trade-in estimator)
74. `074` — **VoltPath**: EV Charging Network (Live station charger map, connector availability, mock charging session)
75. `075` — **PartPilot**: Auto Parts Inventory (OEM part-number lookup, vehicle compatibility cross-reference, warehouse stock)
76. `076` — **Gloss Garage**: Auto Detailing Studio (Ceramic coating package builder, before/after slider, booking calendar)
77. `077` — **Suds & Steel**: Car Wash (Wash bay queue monitor, subscription RFID pass manager, daily wash count)
78. `078` — **Treadline**: Tyre Shop (Tyre size selector by vehicle, wheel alignment booking, tread life monitor)
79. `079` — **RoadRescue**: Roadside Assistance (Emergency breakdown dispatcher, GPS tow-truck locator, rescue timeline)
80. `080` — **MotoDistrict**: Motorcycle Dealership (Bespoke bike customizer, test ride scheduler, gear accessories cart)
81. `081` — **ShiftRight**: Driving School Management (Dual-control vehicle bookings, student maneuver scorecard, driving exam readiness)
82. `082` — **InspectAuto**: Vehicle Inspection (RTA roadworthiness checklist, OBD diagnostics log, digital inspection report)

### CATEGORY 07: BEAUTY & WELLNESS (13 Demos)
83. `083` — **The Cutting Room**: Salon Management (Hair stylist appointment diary, service catalog, product add-ons)
84. `084` — **Solstice Spa**: Spa & Wellness (Hydrotherapy & massage booking, therapist selection, aromatherapy preferences)
85. `085` — **Fade Theory**: Barbershop (Barber queue board, grooming package menu, vintage reward punch-card)
86. `086` — **Lacquer House**: Nail Studio (Nail art swatch gallery, technician time slots, custom design requests)
87. `087` — **Skin Atelier**: Aesthetic Studio Booking (Dermatology consultation intake, skin-treatment roadmap, facial packages)
88. `088` — **Iron District**: Gym Membership (Turnstile QR access simulator, tiered plan switcher, workout zone schedule)
89. `089` — **The Yoga Edit**: Yoga Studio (Studio class timetable, instructor bios, mat reservation engine)
90. `090` — **Motion Club**: Fitness Class Studio (HIIT/Spin class capacity monitor, leaderboard score tracker, cancellation queue)
91. `091` — **FormCoach**: Personal Trainer Portal (Client workout routine assigner, rep/weight progression chart, meal check-in)
92. `092` — **Nourish Notes**: Nutrition Coaching (Macro & calorie diary, meal plan generator, hydration habit tracker)
93. `093` — **Stillpoint Massage**: Massage Therapy (Pressure and focus-area selector, therapist availability, treatment room log)
94. `094` — **Wildflower Retreats**: Wellness Retreat Booking (Multi-day itinerary schedule, accommodation booking, excursion choices)
95. `095` — **Vow & Veil**: Bridal Makeup Studio (Bridal portfolio gallery, trial date scheduler, bridal party package builder)

### CATEGORY 08: LOGISTICS & TRANSPORT (13 Demos)
96. `096` — **ParcelFlow**: Courier Management (AWB consignment tracking, courier hub sorting, delivery exception handler)
97. `097` — **StockPilot**: Warehouse Management (Bin/aisle barcode locator, picking & packing wave list, inventory adjustments)
98. `098` — **LastMile**: Delivery Dispatch (Route optimization map, driver manifest, proof-of-delivery capture)
99. `099` — **FreightBridge**: Freight Forwarding (Sea/Air container milestones, bill of lading document vault, customs tracking)
100. `100` — **HaulTrack**: Trucking Fleet Management (Truck telemetry dashboard, driver duty hours, fuel & tire maintenance log)
101. `101` — **ColdChain**: Temperature-Controlled Logistics (Refrigerated sensor simulation, temperature breach alerts, reefer fleet)
102. `102` — **MoveMate**: Moving Company Management (Home move quote estimator, room inventory checklist, crew dispatch)
103. `103` — **FieldOps**: Field Service Dispatch (Technician work order assignment, customer location map, parts consumed log)
104. `104` — **ReturnLoop**: Reverse Logistics (E-commerce returns portal, warehouse quality inspection, refund release approval)
105. `105` — **FulfilNest**: Ecommerce Fulfilment (Multi-store order aggregation, shipping label generator, packing station view)
106. `106` — **ShipStack**: Shipping Aggregator Dashboard (Carrier rate comparison matrix, bulk manifest creation, tracking API log)
107. `107` — **ChainSight**: Supply Chain Control Tower (Global supplier map, purchase order delivery status, critical bottleneck alerts)
108. `108` — **ZipRider**: On-Demand Bike Delivery (Urban express messenger booking, parcel size selector, live courier dispatch)

### CATEGORY 09: PROFESSIONAL SERVICES (13 Demos)
109. `109` — **CounselDesk**: Law Firm Client Portal (Legal case matter status, billable hour timekeeper, confidential brief vault)
110. `110` — **Ledger & Co.**: Accounting Practice (Client chart of accounts, reconciliation workspace, tax filing preparation)
111. `111` — **Northstar Consulting**: Consulting Project Portal (Advisory project deliverables, milestone roadmap, stakeholder approvals)
112. `112` — **Campaign House**: Marketing Agency Workspace (Creative campaign roadmap, social media asset approval, marketing KPIs)
113. `113` — **Frame & Form**: Creative Studio Client Proofing (Full-screen artwork review, pin-point visual annotations, version comparison)
114. `114` — **TalentGrid**: Recruitment ATS (Kanban applicant pipeline, resume reviewer, interview scheduling matrix)
115. `115` — **PeoplePulse**: HR & Attendance (Employee directory, leave application calendar, payroll slip viewer)
116. `116` — **WorkNest**: Coworking Space Management (Hot desk & conference room booking, member directory, keycard logs)
117. `117` — **CoverDesk**: Insurance Brokerage CRM (Policy quotation comparator, claims processing queue, policy renewal reminders)
118. `118` — **Meridian Advisory**: Financial Advisory Client Portal (Wealth portfolio allocation, quarterly performance report, advisor chat)
119. `119` — **Line & Space**: Architecture Studio (Architectural CAD sheet index, revision history log, client finish selections)
120. `120` — **BuildLedger**: Construction Project Management (Subcontractor punch-list, site daily progress diary, cement/steel logs)
121. `121` — **OpsCare**: IT Managed Services Desk (ITIL support ticket queue, server health monitors, SLA breach countdown)

### CATEGORY 10: MANUFACTURING (13 Demos)
122. `122` — **ForgeOS**: Production Management (Shopfloor work orders, machine line allocation, daily output tally)
123. `123` — **FactoryPulse**: OEE & Plant Performance (Availability/Performance/Quality metrics, downtime reason logger, shift analytics)
124. `124` — **QualityLoop**: Quality Inspection (First-article inspection checklist, defect severity tagger, non-conformance quarantine)
125. `125` — **RawStock**: Raw Material Inventory (Batch/heat lot traceability, minimum reorder alerts, supplier receipt logging)
126. `126` — **SupplyForge**: Supplier Procurement Portal (RFQ bidding matrix, purchase order status, vendor scorecards)
127. `127` — **MaintainX Factory**: Maintenance Management (Corrective maintenance work orders, spare part kitting, machine mean time to repair)
128. `128` — **StitchWorks**: Garment Manufacturing (Apparel size-spec cut sheets, sewing line progress, garment export carton packing)
129. `129` — **Batch & Barrel**: Food Production (HACCP critical control point log, recipe formulation batch scaling, sanitation record)
130. `130` — **CircuitAssembly**: Electronics Assembly (SMT feeder placement inspection, PCB serial barcode tracker, rework station log)
131. `131` — **CNC Works**: CNC Job Management (G-code program assignment, machine tool wear monitor, spindle runtime gauge)
132. `132` — **Packline**: Packaging Production (Carton line speed rate, label verification camera mock, pallet load builder)
133. `133` — **ProcessWorks**: Process Manufacturing (Continuous vat fluid level telemetry, temperature/pressure trend chart, batch signoff)
134. `134` — **EquipLease**: Industrial Equipment Rental (Excavator/forklift rental terms, equipment telemetry, damage inspection)

### CATEGORY 11: TRAVEL & EVENTS (13 Demos)
135. `135` — **Wayfarer**: Travel Booking Platform (Multi-city flight & hotel search, package itinerary builder, travel voucher)
136. `136` — **StayFound**: Hotel Property Management (Tape chart room grid, guest check-in/out folio, housekeeping maid tracker)
137. `137` — **Palm & Pine**: Boutique Resort Guest App (Resort activity bookings, poolside cocktail ordering, digital concierge requests)
138. `138` — **Trailmakers**: Tour Operator (Trek departure dates, mountain guide assignment, equipment rental checklist)
139. `139` — **TripCanvas**: Travel Itinerary Planner (Day-by-day interactive drag trip timeline, budget tally, flight/hotel cards)
140. `140` — **SeatRoute**: Bus Ticketing Platform (Coach lower/upper berth seat layout, boarding point picker, m-ticket generator)
141. `141` — **FestiPass**: Event Ticketing (Tiered festival ticket picker, QR pass wallet display, stage lineup schedule)
142. `142` — **VenueOS**: Venue Management (Banquet hall floor-plan layouts, catering equipment roster, booking calendar)
143. `143` — **EverAfter**: Wedding Planner (Guest RSVP table seat assigner, vendor invoice tracker, wedding day run-of-show)
144. `144` — **SummitLive**: Conference Management (Conference tracks agenda, speaker profile directory, attendee badge printer)
145. `145` — **Beyond Boundaries**: Destination Experiences (Exotic expedition bookings, local artisan workshops, traveler reviews)
146. `146` — **Camp & Cloud**: Camping & Glamping (Safari tent site reservation, campfire gear kit picker, park rules guide)
147. `147` — **GatherRound**: Event Planning Workspace (Event task kanban, supplier contract checklists, budget variance tracker)

### CATEGORY 12: TECHNOLOGY & SAAS (13 Demos)
148. `148` — **MetricLab**: SaaS Analytics (MRR/ARR growth charts, churn rate cohort analysis, customer LTV monitor)
149. `149` — **FlowBoard**: Project Management SaaS (Kanban sprint board, sprint burndown chart, task time tracker)
150. `150` — **OrbitCRM**: Customer Relationship Management (Lead pipeline stages, customer 360 contact card, sales email log)
151. `151` — **HelpGrid**: Customer Support Platform (Omnichannel customer support inbox, SLA priority queue, canned reply helper)
152. `152` — **DevPortal**: API Developer Platform (Interactive REST API endpoint tester, code snippet generator, API rate limit telemetry)
153. `153` — **CloudDeck**: Cloud Infrastructure Console (Virtual compute cluster status, container pod restart log, storage volume meters)
154. `154` — **ShieldOps**: Cybersecurity Awareness Centre (Phishing campaign simulator, compliance security score, incident report feed)
155. `155` — **Subscript**: Subscription Management (Pricing plan builder, customer subscription upgrades/downgrades, invoice simulation)
156. `156` — **ProductSignal**: Product Analytics (User onboarding funnel conversion, feature adoption events, cohort retention heatmaps)
157. `157` — **EchoMind**: AI Knowledge Assistant (RAG enterprise search query tester, citation reference previews, knowledge document index)
158. `158` — **Automate Studio**: Workflow Automation Builder (Visual node trigger & action canvas, workflow run simulator, step execution log)
159. `159` — **SiteForge**: Website CMS (Page section block builder, live responsive device preview, publish version control)
160. `160` — **CommunityOS**: Community Management (Topic discussion channels, member badge system, community event scheduler)

---

## 4. ARCHITECTURE & IMPLEMENTATION STAGES

### Stage 2: Demo Engine Foundation
- Create `src/modules/demo-center/` with:
  - `registry/`: The authoritative TypeScript repository containing all 160 typed product definitions.
  - `state/`: Persistent browser storage helpers (`useDemoState`) with state isolation and instant reset.
  - `archetypes/`: 18 reusable interface archetype frames (POS, Kiosk, Booking, Laboratory, Dispatch, Storefront, Workspace, Console, Board, etc.) that provide UX structure while leaving branding, colors, typography, and controls completely custom.
  - `components/`: Specialized UI primitives (interactive floorplans, tooth charts, barcode pads, Gantt bars, node canvas, terminal consoles, etc.).

### Stage 3: Experience Construction by Category
- Build the 160 distinct product experiences grouped by category.
- Guarantee that every demo has its own unique color palette, typography styling, custom components, and 3+ state-changing workflows.

### Stage 4: Routing & Dispatch
- Connect `/demos/[category]/[demo]/live` to the new Demo Engine dispatcher.
- Ensure SSG static page rendering compiles cleanly without runtime lag.
- Update `sitemap.ts` and `robots.ts` with all 160 new canonical URLs.

---

## 5. VERIFICATION GATES

| Gate | Check | Success Criteria |
|---|---|---|
| **Gate 1** | TypeScript Type Check | `npm run type-check` returns 0 errors |
| **Gate 2** | Production Turbopack Build | `npm run build` compiles all routes without failures |
| **Gate 3** | State Isolation Test | Modifying Demo 001 does not affect Demo 002 |
| **Gate 4** | Reset Verification | Clicking "Reset Demo" restores pristine sample data |
| **Gate 5** | Responsive UX | Verified across Desktop (1920x1080), Tablet (768x1024), and Mobile (390x844) |
