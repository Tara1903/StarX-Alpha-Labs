export interface IndustryItem {
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  overview: string;
  challenges: string[];
  solutions: string[];
  featuredCapabilities: string[];
  recommendedServices: string[];
}

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    slug: "restaurants-cloud-kitchens",
    name: "Restaurants & Cloud Kitchens",
    badge: "Food & Hospitality",
    tagline: "Direct Digital Ordering, Multi-Outlet Kitchen Management & Brand Presence",
    overview: "Third-party delivery platforms extract 20–30% in commissions while disconnecting restaurants from their customer data. We engineer direct online ordering platforms, QR table ordering, and central kitchen dashboards.",
    challenges: [
      "Heavy reliance on third-party aggregators eroding profit margins",
      "Menu synchronization bottlenecks across multiple physical locations",
      "Lack of direct customer retention data and repeat order channels",
    ],
    solutions: [
      "Zero-commission direct web ordering with automated delivery dispatch",
      "Centralized real-time menu and 86-item inventory management",
      "Bespoke brand websites highlighting culinary craftsmanship",
    ],
    featuredCapabilities: [
      "Custom Digital Ordering Engine",
      "Multi-Branch Kitchen Display System (KDS)",
      "Automated WhatsApp/SMS Order Notifications",
      "Table Reservation & Event Booking System",
    ],
    recommendedServices: ["business-website", "ecommerce", "custom-software"],
  },
  {
    slug: "retail-wholesale",
    name: "Retail & Wholesale",
    badge: "Commerce & Distribution",
    tagline: "Omnichannel B2B Wholesaler Portals & Retail Inventory Systems",
    overview: "From multi-tier wholesale pricing to live multi-warehouse inventory tracking, we build digital commerce and B2B portals that eliminate manual phone/paper ordering.",
    challenges: [
      "Manual order taking via phone, email, and paper catalogs",
      "Discrepancies between warehouse stock and online product availability",
      "Complex tiered pricing and custom credit terms per wholesaler",
    ],
    solutions: [
      "Self-service wholesale portal with customer-specific price books",
      "Real-time ERP/warehouse inventory synchronization",
      "Automated credit limits, invoicing, and bulk reordering",
    ],
    featuredCapabilities: [
      "Tiered B2B Price Matrix & MOQ Enforcement",
      "Multi-Warehouse Inventory Tracking",
      "Automated Purchase Orders & Commercial Invoicing",
      "Bulk Barcode & SKU Management",
    ],
    recommendedServices: ["ecommerce", "custom-software", "api-integrations"],
  },
  {
    slug: "education-coaching",
    name: "Education & Coaching",
    badge: "EdTech & Learning",
    tagline: "Student Portals, Course Platforms & Institutional Systems",
    overview: "We architect reliable digital learning environments, student admission workflows, attendance tracking, and interactive video lecture platforms for academies, universities, and coaching institutes.",
    challenges: [
      "Fragmented admission and fee collection workflows",
      "Course piracy and unauthorized video distribution risks",
      "Disjointed parent-student communications and progress tracking",
    ],
    solutions: [
      "Automated digital admissions, KYC, and recurring tuition billing",
      "DRM-protected video delivery with watermarking and device limits",
      "Central student performance dashboards with parent access",
    ],
    featuredCapabilities: [
      "Student Information System (SIS)",
      "Secure Video Lecture Streaming & DRM",
      "Automated Fee Receipts & Payment Gateways",
      "Exam & Quiz Assessment Engines",
    ],
    recommendedServices: ["business-applications", "custom-software", "business-website"],
  },
  {
    slug: "clinics-healthcare",
    name: "Clinics & Healthcare Providers",
    badge: "Health & Wellness",
    tagline: "HIPAA-Aware Patient Portals, Appointment Engines & Clinic Management",
    overview: "We engineer professional medical clinic websites, doctor appointment scheduling systems, electronic health record (EHR) bridges, and secure tele-consultation portals.",
    challenges: [
      "High patient no-show rates and phone-line appointment congestion",
      "Strict data privacy and health record compliance requirements",
      "Cluttered, outdated clinic websites failing to communicate credibility",
    ],
    solutions: [
      "Real-time online doctor scheduling with automated confirmation SMS",
      "Encrypted patient record portals with role-based staff authorization",
      "Authoritative clinic websites with doctor bios and procedure guides",
    ],
    featuredCapabilities: [
      "Doctor Schedule & Room Allocation Engine",
      "Secure Patient Prescription & Report Repository",
      "Automated Appointment Reminders & Follow-Ups",
      "Medical Tele-Consultation Booking",
    ],
    recommendedServices: ["business-website", "custom-software", "business-applications"],
  },
  {
    slug: "ecommerce-brands",
    name: "E-Commerce Brands",
    badge: "D2C Brands",
    tagline: "Headless Commerce, Speed Optimization & Custom Checkout Flows",
    overview: "Fast, bespoke digital storefronts built on Next.js and high-speed APIs, giving direct-to-consumer brands complete creative control and sub-second page performance.",
    challenges: [
      "High cart abandonment rates due to slow template-based checkout pages",
      "Inability to implement bespoke product bundles or customization steps",
      "Rising advertising acquisition costs requiring higher on-site conversion",
    ],
    solutions: [
      "Custom headless storefronts loading 3x faster than standard themes",
      "Frictionless one-page checkout tailored for mobile shoppers",
      "Dynamic product bundle calculators and visual variant selectors",
    ],
    featuredCapabilities: [
      "Headless Next.js Storefront Architecture",
      "Custom Visual Configurator & Bundles",
      "Global Multi-Currency & Localized Checkout",
      "Real-Time Analytics & Conversion Funnel Telemetry",
    ],
    recommendedServices: ["ecommerce", "landing-pages", "pwa"],
  },
  {
    slug: "smb-enterprises",
    name: "Small & Medium Enterprises",
    badge: "Enterprise Growth",
    tagline: "Modernization of Core Business Processes & Modern Web Presence",
    overview: "We help growing SMBs transition away from disconnected legacy software and paper spreadsheets by building modern, cohesive digital platforms that drive operational efficiency.",
    challenges: [
      "Siloed operational data spread across spreadsheets and emails",
      "Legacy software that doesn't integrate with modern cloud APIs",
      "High operational overhead limiting geographic expansion",
    ],
    solutions: [
      "Custom operations consoles tailored to specific company workflows",
      "Automated document processing and real-time activity dashboards",
      "Scalable corporate web presences that project market leadership",
    ],
    featuredCapabilities: [
      "Operations Management Web Portal",
      "Automated Invoice & Document Generation",
      "Staff Role Permissions & Action Audits",
      "API Bridges to Accounting & Delivery Systems",
    ],
    recommendedServices: ["custom-software", "business-applications", "business-website"],
  },
  {
    slug: "professional-services",
    name: "Professional & Advisory Services",
    badge: "Legal & Consulting",
    tagline: "Corporate Brand Authority, Client Portals & Secure Document Handling",
    overview: "Law firms, accountancies, engineering consultancies, and financial advisors require dignified corporate design, thought leadership publication, and secure client document rooms.",
    challenges: [
      "Need to project exceptional intellectual authority and discretion",
      "Unsecured email attachments for confidential client documentation",
      "Complex service offerings that prospective clients struggle to navigate",
    ],
    solutions: [
      "Refined corporate web presence with publication-grade typography",
      "Encrypted client portals for private document sharing and sign-off",
      "Interactive consultation request and onboarding questionnaires",
    ],
    featuredCapabilities: [
      "Encrypted Document Room & Secure Uploads",
      "Lead Consultation Qualifier & Intake Engine",
      "Thought Leadership & Whitepaper Publication Module",
      "Client Matter Status & Engagement Tracker",
    ],
    recommendedServices: ["corporate-portal", "business-applications", "custom-ai"],
  },
];
