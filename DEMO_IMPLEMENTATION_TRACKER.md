# STARX ALPHA LABS — DEMO IMPLEMENTATION TRACKER
**Document Reference:** `DEMO_IMPLEMENTATION_TRACKER.md`  
**Date:** November 11, 2026  
**Auditor:** QA Director & Lead Systems Architect  
**Target Platform:** STARX ALPHA LABS (`https://www.starxalphalabs.online`)  

---

## 1. SUMMARY METRICS
- **Total Catalogue Target:** 160 Demos
- **Categories:** 12
- **Pre-Implementation Status:** STAGE 1 & 2 COMPLETE (Audit, Architecture, Master Registry & Engine Foundations Established)
- **Engine Deployment:** Dynamic Archetype Dispatcher with State Sandboxing Active
- **Overall Quality Target:** 100% Individualized Business UI • 3+ Real Workflows per Demo • Responsive • Accessible

---

## 2. 160-DEMO IMPLEMENTATION STATUS TABLE

| ID | Demo Name | Category | Archetype | Workflows | Status | QA Gate | Notes |
|---|---|---|---|---|---|---|---|
| **001** | Ember & Oak — Restaurant POS | Food & Hospitality | `pos-terminal` | 3 | In Progress | Ready | Floorplan table seating, KOT ticket queue, bill split |
| **002** | Little Loom — Cafe | Food & Hospitality | `ordering-kiosk` | 3 | In Progress | Ready | Coffee size customizer, pickup queue, loyalty points |
| **003** | Tandoor House — Cloud Kitchen | Food & Hospitality | `pos-terminal` | 3 | In Progress | Ready | Aggregator ingestion, kitchen station dispatch, prep handover |
| **004** | StreetBite — Food Truck | Food & Hospitality | `ecommerce-storefront` | 3 | In Progress | Ready | Mobile street menu, GPS location pin, sold-out toggle |
| **005** | Maison Crumb — Bakery | Food & Hospitality | `booking-calendar` | 3 | In Progress | Ready | Cake customizer, preorder date calendar, daily baking capacity |
| **006** | Atelier Table — Fine Dining | Food & Hospitality | `booking-calendar` | 3 | In Progress | Ready | Seating plan reservations, tasting wine pairing, allergy notes |
| **007** | Grand Meridian — Room Service | Food & Hospitality | `pos-terminal` | 3 | In Progress | Ready | Room-number dining, delivery time slot, VIP butler notes |
| **008** | Harvest Basket — Grocery | Food & Hospitality | `ecommerce-storefront` | 3 | In Progress | Ready | Weight-based produce, smart cart, click-and-collect |
| **009** | Dockside — Seafood Counter | Food & Hospitality | `warehouse-wms` | 3 | In Progress | Ready | Catch arrival date, freshness log, custom filleting scale |
| **010** | Gather & Grain — Catering | Food & Hospitality | `crm-pipeline` | 3 | In Progress | Ready | Banquet proposal builder, headcount scaling, staff schedule |
| **011** | Quickstop — QSR Kiosk | Food & Hospitality | `ordering-kiosk` | 3 | In Progress | Ready | High-contrast touch meal, upsell combos, token number display |
| **012** | Pressed & Pulp — Juice Bar | Food & Hospitality | `ordering-kiosk` | 3 | In Progress | Ready | Smoothie ingredient builder, nutrition macro tally, pickup queue |
| **013** | Dash District — Delivery Console | Food & Hospitality | `fleet-dispatch` | 3 | In Progress | Ready | Delivery order ingestion, rider assignment, ETA monitor |
| **014** | Juniper Social — Bar & Pub | Food & Hospitality | `pos-terminal` | 3 | In Progress | Ready | Bar tab ledger, cocktail station queue, happy hour settlement |
| **015** | Threadform — Fashion Boutique | Retail & Ecommerce | `ecommerce-storefront` | 3 | In Progress | Ready | Editorial lookbook, size/fit dimensions, slide cart |
| **016** | Sole Society — Sneaker Store | Retail & Ecommerce | `ecommerce-storefront` | 3 | In Progress | Ready | Drop countdown, size availability grid, raffle queue entry |
| **017** | Circuit Lab — Electronics Store | Retail & Ecommerce | `ecommerce-storefront` | 3 | In Progress | Ready | Side-by-side spec comparison, warranty selector, store stock |
| **018** | Form & Field — Furniture | Retail & Ecommerce | `ecommerce-storefront` | 3 | In Progress | Ready | Room planner, finish swatch selector, white-glove delivery |
| **019** | Heirloom — Jewellery Boutique | Retail & Ecommerce | `ecommerce-storefront` | 3 | In Progress | Ready | Gemstone macro inspector, metal carat switcher, bridal booking |
| **020** | MarketLane — Supermarket | Retail & Ecommerce | `pos-terminal` | 3 | In Progress | Ready | Barcode scanner simulation, SKU price updater, shelf reorder |
| **021** | WellSpring Retail Pharmacy | Retail & Ecommerce | `ecommerce-storefront` | 3 | In Progress | Ready | OTC wellness catalog, mock prescription upload, locker pickup |
| **022** | Paper Trail — Bookstore | Retail & Ecommerce | `ecommerce-storefront` | 3 | In Progress | Ready | Reading list explorer, staff review notes, signed edition reserve |
| **023** | GlossHaus — Cosmetics Retail | Retail & Ecommerce | `ecommerce-storefront` | 3 | In Progress | Ready | Foundation shade matcher, vegan filter, ingredient breakdown |
| **024** | Summit Supply — Outdoor Store | Retail & Ecommerce | `ecommerce-storefront` | 3 | In Progress | Ready | Gear spec cards, camping bundle package, weather rating filter |
| **025** | Bolt & Timber — Hardware Store | Retail & Ecommerce | `warehouse-wms` | 3 | In Progress | Ready | SKU part number lookup, counter order pad, bin aisle map |
| **026** | Serein — DTC Storefront | Retail & Ecommerce | `ecommerce-storefront` | 3 | In Progress | Ready | High-conversion landing, discount coupon engine, 1-click cart |
| **027** | Bazaar Collective — Marketplace | Retail & Ecommerce | `ecommerce-storefront` | 3 | In Progress | Ready | Multi-vendor switcher, commission calculator, multi-seller cart |
| **028** | Horology — Luxury Watches | Retail & Ecommerce | `ecommerce-storefront` | 3 | In Progress | Ready | Movement spec sheet, showroom appointment, servicing intake |
| **029** | Northstar Family Clinic | Healthcare | `clinic-operations` | 3 | In Progress | Ready | Patient registration, doctor schedule queue, digital Rx pad |
| **030** | Meridian Hospital — Portal | Healthcare | `clinic-operations` | 3 | In Progress | Ready | Diagnostic reports viewer, specialist booking, billing summary |
| **031** | Brightline Dental Practice | Healthcare | `clinic-operations` | 3 | In Progress | Ready | Interactive 32-tooth dental chart, treatment stages, procedure log |
| **032** | ClearPath Diagnostics Lab | Healthcare | `diagnostic-lab` | 3 | In Progress | Ready | Specimen barcoding, hematology test stages, lab report release |
| **033** | Restore Motion — Physiotherapy | Healthcare | `clinic-operations` | 3 | In Progress | Ready | Range of motion log, exercise routine builder, recovery chart |
| **034** | Focus Eye — Optometry Practice | Healthcare | `clinic-operations` | 3 | In Progress | Ready | Vision prescription record, frame fitting status, exam scheduler |
| **035** | Paw & Pine — Veterinary Clinic | Healthcare | `clinic-operations` | 3 | In Progress | Ready | Pet microchip record, vaccine calendar, veterinary surgery log |
| **036** | Stillwater — Mental Wellness | Healthcare | `booking-calendar` | 3 | In Progress | Ready | Therapist matching intake, confidential booking, session calendar |
| **037** | Pulse Connect — Telehealth | Healthcare | `clinic-operations` | 3 | In Progress | Ready | Virtual waiting room, tele-consultation space, post-call Rx |
| **038** | Atlas Radiology — Imaging Centre | Healthcare | `diagnostic-lab` | 3 | In Progress | Ready | DICOM MRI/X-ray viewer, radiologist diagnostic report, dispatch |
| **039** | RedDrop — Blood Bank | Healthcare | `warehouse-wms` | 3 | In Progress | Ready | Blood group stock matrix, shelf-life expiry, hospital emergency |
| **040** | Homeward Care — Home Healthcare | Healthcare | `fleet-dispatch` | 3 | In Progress | Ready | Caregiver route map, home visit checklist, care plan signoff |
| **041** | MedEquip Rental | Healthcare | `warehouse-wms` | 3 | In Progress | Ready | Oxygen/wheelchair stock, rental lease calculator, sanitization log |
| **042** | CarePath — Patient Follow-Up | Healthcare | `crm-pipeline` | 3 | In Progress | Ready | Post-discharge queue, symptom risk flag, nurse call scheduler |
| **043** | Habitat — Property Marketplace | Real Estate | `property-discovery` | 3 | In Progress | Ready | Map/listing split, price/bed filter, virtual tour launcher |
| **044** | Keyline — Real Estate Agent CRM | Real Estate | `crm-pipeline` | 3 | In Progress | Ready | Lead deal pipeline, property showing calendar, offer notes |
| **045** | Hearthstone — Rental Management | Real Estate | `crm-pipeline` | 3 | In Progress | Ready | Lease ledger, rent overdue tracker, maintenance work order |
| **046** | Skyline Residences — Sales | Real Estate | `property-discovery` | 3 | In Progress | Ready | Interactive floorplate unit picker, reservation hold, progress |
| **047** | Workstead — Commercial Leasing | Real Estate | `property-discovery` | 3 | In Progress | Ready | Floor sqft calculator, lease proposal generator, viewing booking |
| **048** | SiteCheck — Property Inspection | Real Estate | `quality-inspection` | 3 | In Progress | Ready | Room snag list, photo evidence logger, inspection report |
| **049** | Haven Facilities Management | Real Estate | `quality-inspection` | 3 | In Progress | Ready | HVAC/Elevator registry, preventive maintenance, work orders |
| **050** | BrokerDesk — Brokerage Ops | Real Estate | `crm-pipeline` | 3 | In Progress | Ready | Commission split calculation, closing checklist, leaderboard |
| **051** | CommonGround — Co-Living | Real Estate | `booking-calendar` | 3 | In Progress | Ready | Room availability calendar, resident match, community events |
| **052** | EstateRoom — Property Auctions | Real Estate | `property-discovery` | 3 | In Progress | Ready | Live auction bidding simulation, reserve price, bidder registration |
| **053** | Build & Beyond — Developer | Real Estate | `kanban-workflow` | 3 | In Progress | Ready | Construction Gantt tracker, subcontractor signoff, permit status |
| **054** | ParcelView — Land Explorer | Real Estate | `property-discovery` | 3 | In Progress | Ready | Topographic boundary viewer, zoning info, dimension calculator |
| **055** | MoveIn — Tenant Onboarding | Real Estate | `kanban-workflow` | 3 | In Progress | Ready | Move-in checklist, digital key handover signature, utility tracker |
| **056** | PropertyScope — Market Research | Real Estate | `analytics-canvas` | 3 | In Progress | Ready | Neighborhood valuation heatmap, rental yield comparison, export |
| **057** | CampusOne — School SIS | Education | `lms-learning` | 3 | In Progress | Ready | Student attendance register, timetable clash resolver, report card |
| **058** | UniSphere — University Portal | Education | `lms-learning` | 3 | In Progress | Ready | Course enrollment workspace, GPA transcript, assignment drop box |
| **059** | LearnDeck — LMS Platform | Education | `lms-learning` | 3 | In Progress | Ready | Video lecture player, interactive chapter quiz, certificates |
| **060** | RankRise — Coaching & TestPrep | Education | `lms-learning` | 3 | In Progress | Ready | Mock exam countdown, question palette, topic performance analytics |
| **061** | LinguaHouse — Language Academy | Education | `lms-learning` | 3 | In Progress | Ready | CEFR level test, 1-on-1 speaking booking, vocabulary cards |
| **062** | Little Acorns — Preschool App | Education | `community-feed` | 3 | In Progress | Ready | Daily activity photo feed, nap/meal log, parent messaging |
| **063** | CourseCraft — Course Creator | Education | `kanban-workflow` | 3 | In Progress | Ready | Drag-and-drop module builder, video pricing tier, sales stats |
| **064** | StackForge — Coding Bootcamp | Education | `developer-portal` | 3 | In Progress | Ready | Web IDE sprint workspace, mentor code review, cohort progress |
| **065** | Archive & Co. — Library | Education | `warehouse-wms` | 3 | In Progress | Ready | Barcode catalog search, checkout due dates, overdue notices |
| **066** | SkillFoundry — Vocational | Education | `lms-learning` | 3 | In Progress | Ready | Workshop practical station reservation, competency scorecard |
| **067** | ExamPoint — Examination Centre | Education | `quality-inspection` | 3 | In Progress | Ready | Exam hall seat grid, biometric verification, invigilator schedule |
| **068** | TutorLoop — Tutoring Market | Education | `booking-calendar` | 3 | In Progress | Ready | Subject tutor rating search, lesson slot booking, file exchange |
| **069** | ClassClock — Timetable | Education | `pos-terminal` | 3 | In Progress | Ready | Teacher substitution manager, classroom clash grid, attendance |
| **070** | Apex Motors — Dealership | Automotive | `property-discovery` | 3 | In Progress | Ready | Showroom inventory filter, test drive booking, loan EMI calc |
| **071** | TorqueWorks — Service Centre | Automotive | `pos-terminal` | 3 | In Progress | Ready | Service bay repair queue, mechanic labor work order, parts billing |
| **072** | RoamDrive — Car Rental | Automotive | `booking-calendar` | 3 | In Progress | Ready | Fleet calendar, deposit & insurance calculator, vehicle pickup |
| **073** | ReDrive — Used Car Market | Automotive | `property-discovery` | 3 | In Progress | Ready | Multi-point inspection score, service history, trade-in value |
| **074** | VoltPath — EV Charging | Automotive | `fleet-dispatch` | 3 | In Progress | Ready | Charging station map, connector status, simulated charging receipt |
| **075** | PartPilot — Auto Parts | Automotive | `warehouse-wms` | 3 | In Progress | Ready | Model part-number search, OEM compatibility cross-ref, stock |
| **076** | Gloss Garage — Detailing | Automotive | `booking-calendar` | 3 | In Progress | Ready | Paint protection package builder, before/after slider, booking |
| **077** | Suds & Steel — Car Wash | Automotive | `pos-terminal` | 3 | In Progress | Ready | Wash tier selector, bay queue monitor, RFID pass ledger |
| **078** | Treadline — Tyre Shop | Automotive | `warehouse-wms` | 3 | In Progress | Ready | Tyre dimension lookup, wheel alignment booking, warranty tracker |
| **079** | RoadRescue — Roadside Rescue | Automotive | `fleet-dispatch` | 3 | In Progress | Ready | Breakdown incident logging, live tow GPS map, ETA countdown |
| **080** | MotoDistrict — Motorcycles | Automotive | `ecommerce-storefront` | 3 | In Progress | Ready | 360 accessory customizer, track test-ride booking, gear checkout |
| **081** | ShiftRight — Driving School | Automotive | `booking-calendar` | 3 | In Progress | Ready | Lesson appointment scheduler, vehicle allocation, scorecard |
| **082** | InspectAuto — Inspection | Automotive | `quality-inspection` | 3 | In Progress | Ready | RTA roadworthiness checklist, OBD diagnostics, inspection report |
| **083** | The Cutting Room — Salon | Beauty & Wellness | `booking-calendar` | 3 | In Progress | Ready | Stylist calendar, service menu selector, retail add-on billing |
| **084** | Solstice Spa & Wellness | Beauty & Wellness | `booking-calendar` | 3 | In Progress | Ready | Hydrotherapy suite booking, aromatherapy intake, room assignment |
| **085** | Fade Theory — Barbershop | Beauty & Wellness | `pos-terminal` | 3 | In Progress | Ready | Chair queue board, grooming menu, vintage loyalty stamp card |
| **086** | Lacquer House — Nail Studio | Beauty & Wellness | `booking-calendar` | 3 | In Progress | Ready | Nail art swatch gallery, gel manicure scheduler, technician picker |
| **087** | Skin Atelier — Aesthetic Studio | Beauty & Wellness | `clinic-operations` | 3 | In Progress | Ready | Skin consultation intake, custom facial roadmap, post-care notes |
| **088** | Iron District — Gym | Beauty & Wellness | `pos-terminal` | 3 | In Progress | Ready | Barcode pass check-in, tiered plan changer, trainer booking |
| **089** | The Yoga Edit — Studio | Beauty & Wellness | `booking-calendar` | 3 | In Progress | Ready | Weekly Vinyasa schedule, mat space reservation, pass purchase |
| **090** | Motion Club — Fitness Classes | Beauty & Wellness | `booking-calendar` | 3 | In Progress | Ready | Spin class seat picker, capacity counter, waitlist notification |
| **091** | FormCoach — Personal Trainer | Beauty & Wellness | `kanban-workflow` | 3 | In Progress | Ready | Client routine assigner, rep/weight chart, weekly check-in notes |
| **092** | Nourish Notes — Nutrition | Beauty & Wellness | `clinic-operations` | 3 | In Progress | Ready | Macro calorie tracker, custom meal plan generator, video booking |
| **093** | Stillpoint Massage Therapy | Beauty & Wellness | `booking-calendar` | 3 | In Progress | Ready | Body tension map, pressure selector, therapist room booking |
| **094** | Wildflower Wellness Retreats | Beauty & Wellness | `booking-calendar` | 3 | In Progress | Ready | Multi-day itinerary, eco-villa booking, workshop RSVP |
| **095** | Vow & Veil — Bridal Makeup | Beauty & Wellness | `booking-calendar` | 3 | In Progress | Ready | Bridal lookbook portfolio, wedding trial scheduler, package calc |
| **096** | ParcelFlow — Courier Ops | Logistics & Transport | `fleet-dispatch` | 3 | In Progress | Ready | AWB consignment lookup, sorting hub scan, delivery exception |
| **097** | StockPilot — Warehouse WMS | Logistics & Transport | `warehouse-wms` | 3 | In Progress | Ready | Bin/shelf location map, picking wave list, cycle count adjustment |
| **098** | LastMile — Delivery Dispatch | Logistics & Transport | `fleet-dispatch` | 3 | In Progress | Ready | Driver route optimization map, manifest assigner, POD signature |
| **099** | FreightBridge — Forwarding | Logistics & Transport | `fleet-dispatch` | 3 | In Progress | Ready | Ocean container milestone tracker, bill of lading vault, customs |
| **100** | HaulTrack — Trucking Fleet | Logistics & Transport | `fleet-dispatch` | 3 | In Progress | Ready | Semi-truck telemetry, driver duty clock, engine maintenance log |
| **101** | ColdChain — Pharma Logistics | Logistics & Transport | `fleet-dispatch` | 3 | In Progress | Ready | Temp sensor graph, breach threshold alert, compliance report |
| **102** | MoveMate — Moving Company | Logistics & Transport | `crm-pipeline` | 3 | In Progress | Ready | Move estimate calc, furniture checklist, crew dispatch schedule |
| **103** | FieldOps — Field Service Desk | Logistics & Transport | `fleet-dispatch` | 3 | In Progress | Ready | Technician job assignment, customer location map, parts logged |
| **104** | ReturnLoop — Reverse Logistics | Logistics & Transport | `warehouse-wms` | 3 | In Progress | Ready | Customer RMA portal, return inspection, refund release approval |
| **105** | FulfilNest — Fulfilment | Logistics & Transport | `warehouse-wms` | 3 | In Progress | Ready | Multi-channel order aggregator, shipping rate picker, packing label |
| **106** | ShipStack — Shipping Aggregator | Logistics & Transport | `analytics-canvas` | 3 | In Progress | Ready | Carrier rate matrix comparison, bulk manifest generator, API log |
| **107** | ChainSight — Supply Chain Tower | Logistics & Transport | `analytics-canvas` | 3 | In Progress | Ready | Global vendor status map, delivery bottleneck alert, lead time |
| **108** | ZipRider — Bike Delivery | Logistics & Transport | `fleet-dispatch` | 3 | In Progress | Ready | Urban bike messenger dispatch, weight/distance fare, live GPS |
| **109** | CounselDesk — Law Firm Portal | Professional Services | `crm-pipeline` | 3 | In Progress | Ready | Litigation matter status board, billable hour timer, document vault |
| **110** | Ledger & Co. — Accounting | Professional Services | `analytics-canvas` | 3 | In Progress | Ready | Client chart of accounts, bank statement reconciliation, tax calc |
| **111** | Northstar Consulting Portal | Professional Services | `kanban-workflow` | 3 | In Progress | Ready | Advisory deliverables, milestone signoff matrix, executive brief |
| **112** | Campaign House — Agency | Professional Services | `kanban-workflow` | 3 | In Progress | Ready | Campaign roadmap, creative asset review, campaign ROI summary |
| **113** | Frame & Form — Proofing | Professional Services | `quality-inspection` | 3 | In Progress | Ready | Artwork mockup reviewer, pin annotations, client signoff button |
| **114** | TalentGrid — Recruitment ATS | Professional Services | `kanban-workflow` | 3 | In Progress | Ready | Candidate Kanban pipeline, resume skill score, interview scorecard |
| **115** | PeoplePulse — HR Portal | Professional Services | `lms-learning` | 3 | In Progress | Ready | Corporate employee directory, leave application calendar, payslip |
| **116** | WorkNest — Coworking Space | Professional Services | `booking-calendar` | 3 | In Progress | Ready | Hot desk & meeting room booking, member directory, access pass |
| **117** | CoverDesk — Insurance CRM | Professional Services | `crm-pipeline` | 3 | In Progress | Ready | Policy quote comparison matrix, claims review, renewal queue |
| **118** | Meridian Advisory — Finance | Professional Services | `analytics-canvas` | 3 | In Progress | Ready | Asset allocation dashboard, quarterly report download, advisor chat |
| **119** | Line & Space — Architecture | Professional Services | `quality-inspection` | 3 | In Progress | Ready | CAD blueprint revision index, finish palette picker, site log |
| **120** | BuildLedger — Construction | Professional Services | `kanban-workflow` | 3 | In Progress | Ready | Subcontractor punch-list, daily material delivery log, safety audit |
| **121** | OpsCare — Managed IT Desk | Professional Services | `kanban-workflow` | 3 | In Progress | Ready | ITIL support ticket queue, cloud server uptime monitor, SLA timer |
| **122** | ForgeOS — Production Ops | Manufacturing | `manufacturing-console` | 3 | In Progress | Ready | Shopfloor work order release, machine allocation, output counter |
| **123** | FactoryPulse — OEE Plant | Manufacturing | `manufacturing-console` | 3 | In Progress | Ready | OEE Availability/Performance gauges, downtime code logger, yield |
| **124** | QualityLoop — QC Inspection | Manufacturing | `quality-inspection` | 3 | In Progress | Ready | First-piece quality checklist, defect photo capture, quarantine |
| **125** | RawStock — Material Inventory | Manufacturing | `warehouse-wms` | 3 | In Progress | Ready | Heat/lot number tracking, minimum safety stock alert, mill cert |
| **126** | SupplyForge — Procurement | Manufacturing | `crm-pipeline` | 3 | In Progress | Ready | RFQ bidding matrix, PO release, vendor on-time scorecards |
| **127** | MaintainX Factory — Maintenance | Manufacturing | `manufacturing-console` | 3 | In Progress | Ready | Preventive maintenance schedule, repair work orders, parts log |
| **128** | StitchWorks — Garment Ops | Manufacturing | `manufacturing-console` | 3 | In Progress | Ready | Size-spec cut order sheet, sewing line progress, carton packing |
| **129** | Batch & Barrel — Food Production| Manufacturing | `manufacturing-console` | 3 | In Progress | Ready | HACCP temp log, ingredient formula scaling, batch trace report |
| **130** | CircuitAssembly — Electronics | Manufacturing | `manufacturing-console` | 3 | In Progress | Ready | SMT feeder allocation, PCB barcode inspection, rework queue |
| **131** | CNC Works — Job Management | Manufacturing | `manufacturing-console` | 3 | In Progress | Ready | G-code program assignment, tool wear meter, spindle runtime |
| **132** | Packline — Packaging Lines | Manufacturing | `manufacturing-console` | 3 | In Progress | Ready | Packaging conveyor speed gauge, camera barcode verify, pallets |
| **133** | ProcessWorks — Process Plant | Manufacturing | `manufacturing-console` | 3 | In Progress | Ready | Mixing vat fluid level telemetry, pressure/temp trend, signoff |
| **134** | EquipLease — Equipment Rental | Manufacturing | `warehouse-wms` | 3 | In Progress | Ready | Heavy equipment rental list, engine hour meter log, damage check |
| **135** | Wayfarer — Travel Booking | Travel & Events | `booking-calendar` | 3 | In Progress | Ready | Flight & hotel package search, itinerary builder, voucher |
| **136** | StayFound — Hotel PMS | Travel & Events | `pos-terminal` | 3 | In Progress | Ready | Front desk tape chart grid, guest check-in & room charge, cleaning |
| **137** | Palm & Pine — Resort Concierge | Travel & Events | `booking-calendar` | 3 | In Progress | Ready | Poolside cocktail orders, sunset sailing booking, concierge chat |
| **138** | Trailmakers — Tour Operator | Travel & Events | `booking-calendar` | 3 | In Progress | Ready | Mountain trekking departure dates, guide roster, gear checklist |
| **139** | TripCanvas — Itinerary Planner| Travel & Events | `kanban-workflow` | 3 | In Progress | Ready | Interactive day-by-day trip timeline, reservation cards, budget |
| **140** | SeatRoute — Bus Ticketing | Travel & Events | `booking-calendar` | 3 | In Progress | Ready | Sleeper/seater layout picker, boarding point selector, m-ticket |
| **141** | FestiPass — Event Ticketing | Travel & Events | `ecommerce-storefront` | 3 | In Progress | Ready | Tiered festival ticket picker, digital pass QR wallet, stage lineup |
| **142** | VenueOS — Venue Management | Travel & Events | `booking-calendar` | 3 | In Progress | Ready | Banquet hall seating configuration, catering checklist, deposit |
| **143** | EverAfter — Wedding Planner | Travel & Events | `kanban-workflow` | 3 | In Progress | Ready | Minute-by-minute run-of-show, RSVP seating chart, vendor invoice |
| **144** | SummitLive — Conferences | Travel & Events | `community-feed` | 3 | In Progress | Ready | Multi-track agenda, speaker directory & bio cards, badge printer |
| **145** | Beyond Boundaries — Trips | Travel & Events | `booking-calendar` | 3 | In Progress | Ready | Destination experience catalog, artisan workshop booking, reviews |
| **146** | Camp & Cloud — Glamping | Travel & Events | `booking-calendar` | 3 | In Progress | Ready | Safari tent site reservation, campfire gear kit picker, park rules |
| **147** | GatherRound — Event Planner | Travel & Events | `kanban-workflow` | 3 | In Progress | Ready | Event task Kanban board, vendor quotation comparison, budget |
| **148** | MetricLab — SaaS Analytics | Technology & SaaS | `analytics-canvas` | 3 | In Progress | Ready | MRR/ARR trend chart, cohort retention heatmap, report export |
| **149** | FlowBoard — Agile Management | Technology & SaaS | `kanban-workflow` | 3 | In Progress | Ready | Agile sprint Kanban board, task points & tags, burndown progress |
| **150** | OrbitCRM — SaaS Pipeline | Technology & SaaS | `crm-pipeline` | 3 | In Progress | Ready | Sales lead deal pipeline board, customer 360 profile, email log |
| **151** | HelpGrid — Support Desk | Technology & SaaS | `kanban-workflow` | 3 | In Progress | Ready | Support ticket inbox with SLA countdown, conversation, canned reply |
| **152** | DevPortal — API Platform | Technology & SaaS | `developer-portal` | 3 | In Progress | Ready | Endpoint docs explorer, interactive mock API runner, code snippets |
| **153** | CloudDeck — Cloud Console | Technology & SaaS | `manufacturing-console` | 3 | In Progress | Ready | Virtual compute instance manager, start/stop toggle, pod logs |
| **154** | ShieldOps — Cybersecurity | Technology & SaaS | `quality-inspection` | 3 | In Progress | Ready | Vulnerability incident feed, phishing simulation, SOC 2 score |
| **155** | Subscript — Subscription | Technology & SaaS | `crm-pipeline` | 3 | In Progress | Ready | Pricing plan tier configurator, upgrade/downgrade, billing log |
| **156** | ProductSignal — Analytics | Technology & SaaS | `analytics-canvas` | 3 | In Progress | Ready | User onboarding funnel conversion, feature click adoption, cohorts |
| **157** | EchoMind — AI Assistant | Technology & SaaS | `developer-portal` | 3 | In Progress | Ready | Enterprise RAG query tester, citation reference cards, index manager |
| **158** | Automate Studio — Workflows | Technology & SaaS | `node-automation` | 3 | In Progress | Ready | Visual trigger & action node canvas, drag node connect, run log |
| **159** | SiteForge — Website CMS | Technology & SaaS | `node-automation` | 3 | In Progress | Ready | Drag-and-drop page block builder, mobile preview, version control |
| **160** | CommunityOS — Community | Technology & SaaS | `community-feed` | 3 | In Progress | Ready | Topic discussion channels, member directory & badges, event RSVP |
