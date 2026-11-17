export interface IndustryItem {
  number: number;
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  overview: string;
  challenges: string[];
  opportunities: string[];
  solutions: string[];
  featuredCapabilities: string[];
  recommendedDivisions: string[];
  recommendedServices: string[];
  technologies: string[];
  accentColor: string;
  emoji: string;
}

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    number: 1,
    slug: "retail-commerce",
    name: "Retail & Commerce",
    badge: "Commerce & Omnichannel",
    tagline: "Omnichannel POS, Headless D2C Storefronts & Multi-Warehouse Supply Chains",
    overview: "Modern retail requires instant synchronization between physical point-of-sale terminals and high-speed digital storefronts. We engineer headless ecommerce engines, multi-store barcode POS, serialized IMEI/HUID inventory, and automated customer loyalty platforms.",
    challenges: [
      "Inventory reconciliation lag between physical retail counters and online storefronts",
      "High platform transaction fees and rigid checkout customization limits on generic SaaS",
      "Managing returns, exchanges, and RMA flows across distributed retail locations",
    ],
    opportunities: [
      "Sub-second headless digital storefronts converting at 2x generic template rates",
      "Real-time unified inventory tracking across retail stores, dark stores, and warehouses",
      "Direct customer engagement and loyalty automation via WhatsApp and SMS",
    ],
    solutions: [
      "Bespoke headless Next.js ecommerce storefronts with single-click checkout",
      "Multi-store POS with barcode scanning, shift registers, and GST billing",
      "Automated returns management (RMA), warranty tracking, and customer loyalty",
    ],
    featuredCapabilities: [
      "Multi-Location Inventory Reconciliation",
      "Touch POS Register with Split Billing",
      "Dynamic Product Search & Filter Engine",
      "Instant UPI, Card & Wallet Settlement",
    ],
    recommendedDivisions: ["starx-web", "starx-apps", "starx-business"],
    recommendedServices: ["ecommerce", "custom-software", "business-applications"],
    technologies: ["Next.js", "PostgreSQL", "Supabase", "Redis", "UPI Gateway", "Tailwind CSS"],
    accentColor: "#00D9FF",
    emoji: "🛒",
  },
  {
    number: 2,
    slug: "food-hospitality",
    name: "Food & Hospitality",
    badge: "Hospitality & Dining OS",
    tagline: "Restaurant OS, KOT Kitchen Displays, Table Reservations & Cloud Kitchen Hubs",
    overview: "Third-party delivery platforms extract 20–30% in commissions while isolating restaurants from their guests. We engineer complete restaurant operating systems: commission-free direct ordering, interactive floor seating, KOT bump displays, bar tabs, and commissary inventory.",
    challenges: [
      "Heavy reliance on aggregator channels eroding food and beverage margins",
      "Communication breakdowns between dining room servers and busy kitchen stations",
      "Recipe costing inaccuracies and high food waste without ingredient-level tracking",
    ],
    opportunities: [
      "Commission-free direct online food ordering and table QR ordering engines",
      "Station-specific Kitchen Display Systems (KDS) accelerating ticket turnaround times",
      "Predictive ingredient reordering based on dynamic sales volume and shelf life",
    ],
    solutions: [
      "Full-stack restaurant operating systems unifying host stand, POS, and kitchen",
      "Multi-brand cloud kitchen consolidation consoles for multi-store operators",
      "Table reservation and tasting menu pre-payment platforms",
    ],
    featuredCapabilities: [
      "Interactive Floor Seating & Table Status",
      "Real-Time WebSocket KOT Kitchen Dispatch",
      "Recipe Costing & FIFO Pantry Inventory",
      "Split Checks & Fast UPI / Card Checkout",
    ],
    recommendedDivisions: ["starx-business", "starx-web", "starx-apps"],
    recommendedServices: ["business-applications", "custom-software", "pwa"],
    technologies: ["Next.js", "WebSockets", "PostgreSQL", "Node.js", "Supabase", "Tailwind CSS"],
    accentColor: "#FF941F",
    emoji: "🍴",
  },
  {
    number: 3,
    slug: "healthcare-life-sciences",
    name: "Healthcare & Life Sciences",
    badge: "Healthcare & Clinical Systems",
    tagline: "Clinic Management, Telemedicine, Diagnostic LIS & Patient Health Records",
    overview: "Healthcare providers face stringent regulatory standards, fragmented patient histories, and slow administrative intake. We engineer HIPAA-aligned clinic management systems, digital appointment scheduling, pathology lab report dispatch, and secure patient portals.",
    challenges: [
      "Manual phone booking creating reception bottlenecks and high appointment no-shows",
      "Siloed patient health records hindering multi-specialty clinical consultations",
      "Delayed pathology report generation and cumbersome manual distribution to patients",
    ],
    opportunities: [
      "Automated self-service patient appointment intake and calendar slot locking",
      "Instant WhatsApp dispatch of digitally signed lab reports and diagnostic summaries",
      "Telemedicine video consultations embedded directly into patient health portals",
    ],
    solutions: [
      "Hospital & specialty clinic practice management software with doctor schedules",
      "Diagnostic pathology Laboratory Information Systems (LIS) with automated report delivery",
      "Secure patient mobile companions for prescription refills and consultation histories",
    ],
    featuredCapabilities: [
      "OPD Queue & Token Display System",
      "Digital Prescription & Medical Charting",
      "Diagnostic Lab Workflow & Barcode Specimen Tracking",
      "End-to-End Encrypted Patient Medical Vault",
    ],
    recommendedDivisions: ["starx-business", "starx-web", "starx-apps"],
    recommendedServices: ["business-applications", "custom-software", "corporate-portal"],
    technologies: ["Next.js", "PostgreSQL", "Supabase RLS", "WebRTC", "TypeScript", "Tailwind CSS"],
    accentColor: "#00C98B",
    emoji: "🏥",
  },
  {
    number: 4,
    slug: "education-edtech",
    name: "Education & EdTech",
    badge: "Education & Learning Systems",
    tagline: "Learning Management Systems, Student Fee Portals & Cohort Classrooms",
    overview: "Educational institutions and digital educators need modern platforms that bridge asynchronous learning with live interactive classrooms. We build custom Learning Management Systems (LMS), student fee management portals, computerized test series engines, and institutional admin consoles.",
    challenges: [
      "Fragmented student fee collection and manual reconciliation of tuition dues",
      "Generic video course platforms offering zero interactive cohort community features",
      "Cheating and vulnerability during online assessment and mock examination tests",
    ],
    opportunities: [
      "Automated tuition fee payment gateways with scheduled WhatsApp reminder nudges",
      "Interactive cohort learning with community discussion feeds and peer assignments",
      "Secured, timed computerized testing engines with real-time score percentiles",
    ],
    solutions: [
      "Institutional university and school administrative ERPs managing student lifecycles",
      "Digital course marketplaces for creator educators with DRM video streaming",
      "Interactive CBT examination platforms with live anti-cheat timers and analytics",
    ],
    featuredCapabilities: [
      "Student Admission & Enrollment Pipeline",
      "Automated Tuition Fee Invoicing & Receipts",
      "DRM-Protected Video Lecture Playlists",
      "Live Student Progress & Gradebook Telemetry",
    ],
    recommendedDivisions: ["starx-web", "starx-apps", "starx-saas"],
    recommendedServices: ["corporate-portal", "custom-software", "business-applications"],
    technologies: ["Next.js", "PostgreSQL", "Supabase", "Node.js", "Redis", "Tailwind CSS"],
    accentColor: "#873BFF",
    emoji: "🎓",
  },
  {
    number: 5,
    slug: "real-estate-infrastructure",
    name: "Real Estate & Infrastructure",
    badge: "Real Estate & PropTech",
    tagline: "Property ERP, Unit Availability Showcases, Broker CRMs & Society Management",
    overview: "Real estate developers and asset managers operate high-ticket transactions requiring flawless buyer credibility and meticulous unit tracking. We build interactive property showcases, broker commission CRMs, construction stage milestone portals, and residential society management apps.",
    challenges: [
      "Static PDF brochures failing to engage high-net-worth property buyers",
      "Disorganized broker networks resulting in duplicate client leads and commission disputes",
      "Complex payment plan milestone invoicing based on unpredictable construction stages",
    ],
    opportunities: [
      "Interactive 3D unit selectors and virtual floor plan visualizers driving buyer engagement",
      "Centralized broker lead protection portal with automated attribution and stage tracking",
      "Construction stage progress dashboards with photo updates and automated demand notes",
    ],
    solutions: [
      "Luxury developer project showcase websites with interactive unit inventory",
      "Brokerage sales CRM with buyer budget matching and follow-up cadence",
      "Gated community and residential society billing and amenity reservation software",
    ],
    featuredCapabilities: [
      "Interactive Tower & Floor Unit Availability Matrix",
      "Construction Milestone Billing & Demand Letters",
      "Broker Lead Registration & Deal Attribution",
      "Society Maintenance & Amenity Slot Booking",
    ],
    recommendedDivisions: ["starx-web", "starx-business", "starx-apps"],
    recommendedServices: ["business-website", "custom-software", "corporate-portal"],
    technologies: ["Next.js", "Three.js", "PostgreSQL", "Supabase", "TypeScript", "Tailwind CSS"],
    accentColor: "#10b981",
    emoji: "🏢",
  },
  {
    number: 6,
    slug: "automotive-mobility",
    name: "Automotive & Mobility",
    badge: "Automotive & Mobility",
    tagline: "Dealership Showrooms, Test-Drive Booking, Service Desks & Spare Parts Catalogues",
    overview: "Automotive dealerships and fleet operators manage high-value inventories, multi-stage repair orders, and strict service maintenance intervals. We engineer digital vehicle showroom platforms, live test-drive dispatch schedulers, service bay management consoles, and digital parts catalogues.",
    challenges: [
      "Inefficient test-drive scheduling leading to missed buyer leads and idling vehicles",
      "Opaque service station progress resulting in low customer trust during repair jobs",
      "Complex spare parts numbering causing ordering errors and mechanic delays",
    ],
    opportunities: [
      "Instant online test-drive booking with vehicle VIN reservation and license check",
      "Live vehicle service status trackers sending photo updates to owners on WhatsApp",
      "Searchable exploded-view spare parts catalogues with instant checkout",
    ],
    solutions: [
      "Multi-brand vehicle dealership portals with live inventory filters and EMI calculators",
      "Automotive workshop service management consoles tracking bays and mechanics",
      "Spare parts inventory WMS with part-number search and supplier purchase orders",
    ],
    featuredCapabilities: [
      "Live Vehicle Inventory & Specification Comparators",
      "Workshop Job Card & Service Bay Allocation",
      "Automated Service Due & Insurance Renewal Alerts",
      "Spare Parts SKU Barcode & Bin Management",
    ],
    recommendedDivisions: ["starx-business", "starx-web", "starx-apps"],
    recommendedServices: ["business-applications", "custom-software", "ecommerce"],
    technologies: ["Next.js", "PostgreSQL", "Supabase", "Node.js", "Tailwind CSS"],
    accentColor: "#087BFF",
    emoji: "🚗",
  },
  {
    number: 7,
    slug: "logistics-supply-chain",
    name: "Logistics & Supply Chain",
    badge: "Logistics & Telemetry",
    tagline: "Fleet Dispatch Telemetry, Multi-Branch WMS & Automated Manifest Tracking",
    overview: "Supply chains fail when cargo location, warehouse bin assignments, and carrier handoffs rely on manual paper manifests. We build real-time fleet dispatch consoles, multi-branch warehouse management systems (WMS), digital proof-of-delivery apps, and vendor freight portals.",
    challenges: [
      "Zero visibility into driver transit bottlenecks and estimated arrival times",
      "Warehouse pick-and-pack errors caused by unmapped storage aisles and bin locations",
      "Paper-based proof-of-delivery slips that get lost, delaying commercial invoicing",
    ],
    opportunities: [
      "Live GPS radar telemetry tracking vehicle routes and trip milestone completions",
      "Optimized warehouse picking route maps reducing staff transit time by 30%",
      "Mobile digital signature and photographic proof-of-delivery with instant cloud sync",
    ],
    solutions: [
      "Centralized fleet dispatch command consoles with driver milestone telemetry",
      "Warehouse bin and aisle location management software with barcode validation",
      "Freight partner and client consignment tracking portals with automated notifications",
    ],
    featuredCapabilities: [
      "Real-Time Trip Route & Driver Telemetry",
      "Warehouse Bin Map & SKU Pick List Generator",
      "Electronic Proof of Delivery (e-POD) with Signatures",
      "Automated Freight Invoice & Weight Reconciliation",
    ],
    recommendedDivisions: ["starx-business", "starx-custom", "starx-apps"],
    recommendedServices: ["custom-software", "business-applications", "api-integrations"],
    technologies: ["Next.js", "PostgreSQL", "WebSockets", "Supabase", "Node.js", "Tailwind CSS"],
    accentColor: "#f59e0b",
    emoji: "🚚",
  },
  {
    number: 8,
    slug: "manufacturing-industrial",
    name: "Manufacturing & Industrial",
    badge: "Manufacturing & Industry 4.0",
    tagline: "Shop-Floor OEE Tracking, Bill of Materials (BOM) & Quality Assurance Consoles",
    overview: "Industrial plants require exact coordination between raw material availability, machine calibration, and multi-stage assembly runs. We engineer shop-floor execution systems, multi-level Bill of Materials (BOM) managers, First Article Inspection (FAI) QA consoles, and equipment maintenance schedules.",
    challenges: [
      "Unplanned machine downtime due to reactive rather than predictive maintenance",
      "BOM versioning errors resulting in incorrect raw material procurement and waste",
      "Paper quality inspection sheets that prevent real-time defect rate analysis",
    ],
    opportunities: [
      "Real-time Overall Equipment Effectiveness (OEE) dashboards highlighting bottlenecks",
      "Dynamic multi-level Bill of Materials engines linked to current supplier costs",
      "Tablet-based shop-floor quality tolerance checks with automated pass/fail flagging",
    ],
    solutions: [
      "Shop-floor production management consoles monitoring active work orders and batch outputs",
      "Industrial inventory systems tracking raw materials, WIP stages, and finished goods",
      "Equipment preventive maintenance schedules tracking machine hours and spare parts",
    ],
    featuredCapabilities: [
      "Overall Equipment Effectiveness (OEE) Telemetry",
      "Multi-Tier Bill of Materials (BOM) Engine",
      "First Article Inspection & Quality Tolerance Logging",
      "Preventive Machine Maintenance Scheduler",
    ],
    recommendedDivisions: ["starx-business", "starx-custom"],
    recommendedServices: ["custom-software", "business-applications", "api-integrations"],
    technologies: ["Next.js", "PostgreSQL", "Supabase", "Node.js", "Tailwind CSS"],
    accentColor: "#e11d48",
    emoji: "🏭",
  },
  {
    number: 9,
    slug: "finance-professional-services",
    name: "Finance & Professional Services",
    badge: "Finance & Corporate Advisory",
    tagline: "Client Intake Portals, Secure Document Vaults, Retainer Billing & Practice ERP",
    overview: "Law firms, Chartered Accountants, investment advisories, and management consultancies handle confidential client records under strict data privacy obligations. We engineer secure client onboarding portals, encrypted document vaults, billable hour trackers, and automated milestone invoicing.",
    challenges: [
      "Unsecured email exchange of sensitive tax, corporate, and legal client documents",
      "Leakage of billable hours and dispute-prone retrospective client invoicing",
      "Clunky client onboarding processes requiring repeated manual document submissions",
    ],
    opportunities: [
      "End-to-end encrypted client portals with granular permission-based document sharing",
      "Real-time retainer balance tracking with automated milestone drawdowns and alerts",
      "Self-service digital client intake forms with e-signature and identity verification",
    ],
    solutions: [
      "Corporate advisory and law firm practice management consoles managing engagements",
      "Secure client document vaults with audit logs of every access and download event",
      "Automated professional services quotation and retainer billing engines",
    ],
    featuredCapabilities: [
      "Secure Client Document Vault with Watermarking",
      "Client Matter & Engagement Lifecycle Management",
      "Billable Hours & Retainer Milestone Drawdowns",
      "Automated Commercial Quotation & Retainer Billing",
    ],
    recommendedDivisions: ["starx-web", "starx-business", "starx-custom"],
    recommendedServices: ["corporate-portal", "custom-software", "business-website"],
    technologies: ["Next.js", "PostgreSQL", "Supabase RLS", "TypeScript", "Tailwind CSS"],
    accentColor: "#0284c7",
    emoji: "💼",
  },
  {
    number: 10,
    slug: "beauty-fitness-lifestyle",
    name: "Beauty, Fitness & Lifestyle",
    badge: "Wellness & Lifestyle",
    tagline: "Appointment Calendars, Member Subscription Check-in & Salon POS",
    overview: "Spas, premium salons, luxury fitness clubs, and wellness studios rely on frictionless booking experiences and high recurring member retention. We build visual appointment calendars, membership subscription check-ins, stylist commission POS, and direct client re-engagement automations.",
    challenges: [
      "High client no-show rates on appointment bookings without prepayment commitment",
      "Complex stylist and trainer commission calculation across services and product sales",
      "Manual check-in queues at fitness centers creating friction for members",
    ],
    opportunities: [
      "Visual treatment booking calendars requiring small deposit authorization to lock slots",
      "Automated commission and performance ledgers calculating staff earnings in real time",
      "Mobile QR membership passes enabling contactless, sub-second check-in scans",
    ],
    solutions: [
      "Salon and spa appointment booking engines with staff preference selectors",
      "Gym and wellness club membership platforms with recurring billing and access passes",
      "Unified beauty counter POS tracking retail product sales and service add-ons",
    ],
    featuredCapabilities: [
      "Visual Multi-Staff Appointment Calendar",
      "Automated WhatsApp Appointment Confirmation & Reminders",
      "Digital QR Member Check-in & Usage Limits",
      "Staff Commission & Tip Split Calculation",
    ],
    recommendedDivisions: ["starx-web", "starx-apps", "starx-business"],
    recommendedServices: ["business-website", "ecommerce", "pwa"],
    technologies: ["Next.js", "PostgreSQL", "Supabase", "TypeScript", "Tailwind CSS"],
    accentColor: "#E52BFF",
    emoji: "✨",
  },
  {
    number: 11,
    slug: "travel-tourism-events",
    name: "Travel, Tourism & Events",
    badge: "Travel & Venue Booking",
    tagline: "Direct Room Booking Engines, Venue Reservation Maps & Tour Customizers",
    overview: "Hotels, luxury resorts, event venues, and tour operators lose significant revenue to OTA commissions (Booking.com, Airbnb). We engineer direct reservation engines, interactive venue and banquet floor seat reservation maps, multi-day tour package customizers, and guest concierge portals.",
    challenges: [
      "Extravagant OTA booking commissions eroding boutique hospitality profitability",
      "Double-booking risks across direct channels and external travel agency calendars",
      "Difficulty marketing customized multi-activity itineraries without manual quotes",
    ],
    opportunities: [
      "High-converting direct room reservation engines with automated seasonal pricing",
      "Interactive venue seat and banquet table map selectors with real-time availability",
      "Self-service tour package builders enabling travelers to curate custom itineraries",
    ],
    solutions: [
      "Boutique resort and hotel direct room booking engines with guest folios",
      "Auditorium, concert, and banquet hall interactive seat and venue reservation platforms",
      "Adventure and travel agency booking portals with live guide scheduling",
    ],
    featuredCapabilities: [
      "Direct Room & Suite Booking Engine with Dynamic Rates",
      "Interactive Event Hall & Banquet Table Floor Maps",
      "Multi-Day Tour Itinerary Customization Engine",
      "Automated Guest Confirmation & Digital Key Passes",
    ],
    recommendedDivisions: ["starx-web", "starx-apps", "starx-business"],
    recommendedServices: ["business-website", "ecommerce", "custom-software"],
    technologies: ["Next.js", "PostgreSQL", "Supabase", "TypeScript", "Tailwind CSS"],
    accentColor: "#06b6d4",
    emoji: "🌴",
  },
  {
    number: 12,
    slug: "technology-digital-enterprises",
    name: "Technology & Digital Enterprises",
    badge: "Technology & SaaS",
    tagline: "Developer Portals, Telemetry Dashboards, SaaS Consoles & High-Speed Marketing",
    overview: "Technology companies and digital enterprises demand engineering excellence: high-speed marketing platforms, developer API documentation consoles, real-time platform telemetry monitors, and secure multi-tenant customer dashboards. We build the digital infrastructure that fuels tech scale.",
    challenges: [
      "Slow, bloated marketing websites that fail technical scrutiny and hurt dev credibility",
      "Fragmented developer documentation resulting in long integration cycles and API churn",
      "Lack of unified customer administration consoles for SaaS products",
    ],
    opportunities: [
      "High-speed Next.js platforms achieving sub-second global response times and 100 speed scores",
      "Interactive API documentation portals with live code snippets and sandbox testing",
      "Clean, scalable multi-tenant SaaS dashboards with real-time metrics and RBAC controls",
    ],
    solutions: [
      "Enterprise tech company marketing websites engineered with cinematic design",
      "Interactive developer portals with API key management and webhook testing consoles",
      "Custom SaaS operational dashboards with real-time financial and telemetry charts",
    ],
    featuredCapabilities: [
      "Interactive API Documentation & Playground",
      "Real-Time Telemetry & Metric Visualizations",
      "Multi-Tenant SaaS Administration Dashboard",
      "Role-Based Access Control & Security Audit Logs",
    ],
    recommendedDivisions: ["starx-saas", "starx-web", "starx-ai", "starx-custom"],
    recommendedServices: ["corporate-portal", "custom-software", "custom-ai", "api-integrations"],
    technologies: ["Next.js 16", "React 19", "PostgreSQL", "Supabase", "Redis", "TypeScript", "Tailwind CSS"],
    accentColor: "#3b82f6",
    emoji: "🚀",
  },
];

// Preserved backwards-compatible lookup helper
export function getIndustryBySlug(slug: string): IndustryItem | undefined {
  const normalized = slug.trim().toLowerCase();

  // Exact match
  const exact = INDUSTRIES_DATA.find((i) => i.slug === normalized);
  if (exact) return exact;

  // Legacy route mappings
  if (normalized === "restaurants-cloud-kitchens") return INDUSTRIES_DATA.find((i) => i.slug === "food-hospitality");
  if (normalized === "retail-wholesale") return INDUSTRIES_DATA.find((i) => i.slug === "retail-commerce");
  if (normalized === "ecommerce-brands") return INDUSTRIES_DATA.find((i) => i.slug === "retail-commerce");
  if (normalized === "clinics-healthcare") return INDUSTRIES_DATA.find((i) => i.slug === "healthcare-life-sciences");
  if (normalized === "education-coaching") return INDUSTRIES_DATA.find((i) => i.slug === "education-edtech");
  if (normalized === "smb-enterprises") return INDUSTRIES_DATA.find((i) => i.slug === "technology-digital-enterprises");
  if (normalized === "professional-services") return INDUSTRIES_DATA.find((i) => i.slug === "finance-professional-services");

  return undefined;
}
