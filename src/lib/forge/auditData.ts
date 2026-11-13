import type { DemoProductType } from "@/types/demo";

export type AuditDecision = "KEEP" | "SCRAP";

export interface DemoAuditRecord {
  id: number;
  catalogId: number;
  slug: string;
  name: string;
  batch: "Batch 01" | "Batch 02" | "Pilot";
  originalCategorySlug: string;
  originalCategoryName: string;
  targetCategorySlug: string;
  targetCategoryName: string;
  productType: DemoProductType;
  scores: {
    design: number; // /25
    functionality: number; // /25
    completeness: number; // /20
    originality: number; // /15
    commercial: number; // /15
    total: number; // /100
  };
  decision: AuditDecision;
  analysisReasoning: string;
  salvageableAssets: string[];
  issuesFound: string[];
  recommendedAction: string;
}

export const PORTFOLIO_AUDIT_DATA: DemoAuditRecord[] = [
  // =========================================================================
  // BATCH 01: FOOD & HOSPITALITY (14 DEMOS: 2 KEEP, 12 SCRAP)
  // =========================================================================
  {
    id: 1,
    catalogId: 1,
    slug: "restaurant-management-system",
    name: "Restaurant Management System",
    batch: "Batch 01",
    originalCategorySlug: "food-hospitality",
    originalCategoryName: "Food & Hospitality",
    targetCategorySlug: "food-hospitality",
    targetCategoryName: "Food & Hospitality",
    productType: "web_application",
    scores: { design: 23, functionality: 23, completeness: 19, originality: 13, commercial: 14, total: 92 },
    decision: "SCRAP",
    analysisReasoning: "Internal dining operations dashboard (floor plan, KOT dispatch, recipe costing). Scrapped in portfolio reset to abandon internal management software in favor of client-sellable customer-facing dining websites and guest portals.",
    salvageableAssets: ["Interactive 12-table floor plan canvas", "Real-time KOT audio alert dispatcher", "Bill split and course-firing algorithms"],
    issuesFound: ["Back-office management software rather than customer-facing digital product"],
    recommendedAction: "Scrapped. Reusable floor canvas and bill split components archived."
  },
  {
    id: 2,
    catalogId: 2,
    slug: "restaurant-pos-billing",
    name: "Restaurant POS & Billing",
    batch: "Batch 01",
    originalCategorySlug: "food-hospitality",
    originalCategoryName: "Food & Hospitality",
    targetCategorySlug: "food-hospitality",
    targetCategoryName: "Food & Hospitality",
    productType: "web_application",
    scores: { design: 22, functionality: 23, completeness: 18, originality: 11, commercial: 12, total: 86 },
    decision: "SCRAP",
    analysisReasoning: "Cashier billing terminal with numpad entry and split payments. Scrapped in portfolio reset; clients do not buy standalone web POS terminals from a digital agency.",
    salvageableAssets: ["Numpad speed-dial component", "Split payment calculator", "Thermal print CSS preview"],
    issuesFound: ["Operational cashier terminal; zero consumer web appeal"],
    recommendedAction: "Scrapped. Payment split calculator harvested for consumer checkout."
  },
  {
    id: 3,
    catalogId: 3,
    slug: "cloud-kitchen-management",
    name: "Cloud Kitchen Management",
    batch: "Batch 01",
    originalCategorySlug: "food-hospitality",
    originalCategoryName: "Food & Hospitality",
    targetCategorySlug: "food-hospitality",
    targetCategoryName: "Food & Hospitality",
    productType: "web_application",
    scores: { design: 21, functionality: 23, completeness: 18, originality: 11, commercial: 13, total: 86 },
    decision: "SCRAP",
    analysisReasoning: "Multi-brand ghost kitchen order consolidation and station dispatch. Scrapped in portfolio reset to focus on customer-facing multi-brand food ordering apps.",
    salvageableAssets: ["Multi-brand station router", "Rider pickup countdown timer", "Kitchen ticket line-printer layout"],
    issuesFound: ["Internal commissary tooling without consumer interface"],
    recommendedAction: "Scrapped. Station router archived."
  },
  {
    id: 4,
    catalogId: 4,
    slug: "cafe-management-system",
    name: "Cafe Management System",
    batch: "Batch 01",
    originalCategorySlug: "food-hospitality",
    originalCategoryName: "Food & Hospitality",
    targetCategorySlug: "food-hospitality",
    targetCategoryName: "Food & Hospitality",
    productType: "pwa",
    scores: { design: 18, functionality: 17, completeness: 14, originality: 11, commercial: 10, total: 70 },
    decision: "SCRAP",
    analysisReasoning: "Previous implementation was built as a dark back-office dashboard instead of a customer-facing cafe app. Existing code scrapped; slated for brand-new customer ordering PWA concept.",
    salvageableAssets: ["Roaster bean profile schema", "Beverage modifier options (milk substitutes, syrups)"],
    issuesFound: ["Dark dashboard interface; lacks customer mobile ordering journey"],
    recommendedAction: "Scrapped. Slated for fresh consumer PWA design in future catalogue."
  },
  {
    id: 5,
    catalogId: 5,
    slug: "bakery-management-system",
    name: "Bakery Management System",
    batch: "Batch 01",
    originalCategorySlug: "food-hospitality",
    originalCategoryName: "Food & Hospitality",
    targetCategorySlug: "food-hospitality",
    targetCategoryName: "Food & Hospitality",
    productType: "ecommerce_website",
    scores: { design: 17, functionality: 17, completeness: 13, originality: 10, commercial: 10, total: 67 },
    decision: "SCRAP",
    analysisReasoning: "Implemented as internal flour batch yields and oven schedules. Existing code scrapped to make way for a luxury custom cake studio and pastry ecommerce storefront.",
    salvageableAssets: ["Recipe batch scaling multiplier", "Allergen matrix badges"],
    issuesFound: ["Industrial bakery schedule rather than consumer pastry storefront"],
    recommendedAction: "Scrapped. Allergen badges archived."
  },
  {
    id: 6,
    catalogId: 6,
    slug: "food-delivery-management",
    name: "Food Delivery Management",
    batch: "Batch 01",
    originalCategorySlug: "food-hospitality",
    originalCategoryName: "Food & Hospitality",
    targetCategorySlug: "food-hospitality",
    targetCategoryName: "Food & Hospitality",
    productType: "web_application",
    scores: { design: 22, functionality: 23, completeness: 18, originality: 12, commercial: 13, total: 88 },
    decision: "KEEP",
    analysisReasoning: "Exceptional real-time delivery logistics dispatch application with live SVG radar tracking, rider battery/speed telemetry, and geofence alerts. A genuine, sellable logistics web app.",
    salvageableAssets: ["Live SVG delivery radar map", "Fleet rider status monitor", "Order dispatch stepper"],
    issuesFound: ["None. Retained as flagship demo."],
    recommendedAction: "KEEP. Maintained active in Food & Hospitality showcase."
  },
  {
    id: 7,
    catalogId: 7,
    slug: "table-reservation-booking",
    name: "Table Reservation & Booking",
    batch: "Batch 01",
    originalCategorySlug: "food-hospitality",
    originalCategoryName: "Food & Hospitality",
    targetCategorySlug: "food-hospitality",
    targetCategoryName: "Food & Hospitality",
    productType: "web_application",
    scores: { design: 20, functionality: 19, completeness: 15, originality: 11, commercial: 11, total: 76 },
    decision: "SCRAP",
    analysisReasoning: "Built from the perspective of a restaurant maitre d' rather than a customer dining reservation experience. Existing code scrapped for fresh consumer guest booking portal.",
    salvageableAssets: ["Table assignment slot algorithm", "VIP diner history profile"],
    issuesFound: ["Host-stand perspective rather than guest booking experience"],
    recommendedAction: "Scrapped. Time-slot picker logic archived."
  },
  {
    id: 8,
    catalogId: 8,
    slug: "hotel-restaurant-management",
    name: "Hotel & Restaurant Management",
    batch: "Batch 01",
    originalCategorySlug: "food-hospitality",
    originalCategoryName: "Food & Hospitality",
    targetCategorySlug: "food-hospitality",
    targetCategoryName: "Food & Hospitality",
    productType: "web_application",
    scores: { design: 20, functionality: 20, completeness: 16, originality: 11, commercial: 12, total: 79 },
    decision: "SCRAP",
    analysisReasoning: "Enterprise PMS integration for hotel room folio charges and banquet ledgers. Scrapped as back-office management software.",
    salvageableAssets: ["Room folio charge posting mapper", "Banquet dining ledger component"],
    issuesFound: ["Enterprise hotel back-office PMS; zero client showcase appeal"],
    recommendedAction: "Scrapped. Folio charge engine archived."
  },
  {
    id: 9,
    catalogId: 9,
    slug: "catering-business-management",
    name: "Catering Business Management",
    batch: "Batch 01",
    originalCategorySlug: "food-hospitality",
    originalCategoryName: "Food & Hospitality",
    targetCategorySlug: "food-hospitality",
    targetCategoryName: "Food & Hospitality",
    productType: "web_application",
    scores: { design: 19, functionality: 19, completeness: 16, originality: 11, commercial: 11, total: 76 },
    decision: "SCRAP",
    analysisReasoning: "Banquet event order (BEO) contract workflow and equipment checklist. Scrapped in portfolio reset.",
    salvageableAssets: ["BEO generator", "Headcount ingredient calculation engine"],
    issuesFound: ["Heavy internal back-office format"],
    recommendedAction: "Scrapped. Headcount calculation logic archived."
  },
  {
    id: 10,
    catalogId: 10,
    slug: "food-truck-management",
    name: "Food Truck Management",
    batch: "Batch 01",
    originalCategorySlug: "food-hospitality",
    originalCategoryName: "Food & Hospitality",
    targetCategorySlug: "food-hospitality",
    targetCategoryName: "Food & Hospitality",
    productType: "web_application",
    scores: { design: 13, functionality: 13, completeness: 11, originality: 8, commercial: 7, total: 52 },
    decision: "SCRAP",
    analysisReasoning: "Weak commercial value. Redundant basic POS with low enterprise differentiation. Scrapped permanently.",
    salvageableAssets: ["Live GPS location broadcasting badge"],
    issuesFound: ["Redundant with POS #02; low client demand"],
    recommendedAction: "Scrapped permanently."
  },
  {
    id: 11,
    catalogId: 11,
    slug: "bar-pub-management",
    name: "Bar & Pub Management",
    batch: "Batch 01",
    originalCategorySlug: "food-hospitality",
    originalCategoryName: "Food & Hospitality",
    targetCategorySlug: "food-hospitality",
    targetCategoryName: "Food & Hospitality",
    productType: "web_application",
    scores: { design: 16, functionality: 15, completeness: 12, originality: 9, commercial: 8, total: 60 },
    decision: "SCRAP",
    analysisReasoning: "Redundant duplicate of bar tabs and pour tracking. Scrapped permanently.",
    salvageableAssets: ["Keg percentage visual gauge", "Happy hour timed pricing toggle"],
    issuesFound: ["Heavy duplication with restaurant POS"],
    recommendedAction: "Scrapped permanently."
  },
  {
    id: 12,
    catalogId: 12,
    slug: "qsr-management",
    name: "QSR Management",
    batch: "Batch 01",
    originalCategorySlug: "food-hospitality",
    originalCategoryName: "Food & Hospitality",
    targetCategorySlug: "food-hospitality",
    targetCategoryName: "Food & Hospitality",
    productType: "web_application",
    scores: { design: 21, functionality: 21, completeness: 17, originality: 11, commercial: 12, total: 82 },
    decision: "KEEP",
    analysisReasoning: "Outstanding dual-mode self-service ordering kiosk and rapid counter dispatch with oversized touch targets, meal combo upsells, and token queue display. A genuine customer-facing digital product.",
    salvageableAssets: ["Oversized touch ordering interface", "Fast food combo configurator", "Token calling screen"],
    issuesFound: ["None. Retained as flagship QSR demo."],
    recommendedAction: "KEEP. Maintained active in Food & Hospitality showcase."
  },
  {
    id: 13,
    catalogId: 13,
    slug: "grocery-fresh-food-ordering",
    name: "Grocery & Fresh Food Ordering",
    batch: "Batch 01",
    originalCategorySlug: "food-hospitality",
    originalCategoryName: "Food & Hospitality",
    targetCategorySlug: "food-hospitality",
    targetCategoryName: "Food & Hospitality",
    productType: "ecommerce_website",
    scores: { design: 17, functionality: 18, completeness: 15, originality: 10, commercial: 10, total: 70 },
    decision: "SCRAP",
    analysisReasoning: "Built as internal procurement sheets rather than an engaging consumer organic grocery subscription storefront. Existing code scrapped for future consumer storefront.",
    salvageableAssets: ["Perishable freshness countdown", "Weight-based gram pricing selector"],
    issuesFound: ["Internal procurement focus rather than consumer shopping experience"],
    recommendedAction: "Scrapped. Weight calculation logic archived."
  },
  {
    id: 14,
    catalogId: 14,
    slug: "food-inventory-supply-management",
    name: "Food Inventory & Supply Management",
    batch: "Batch 01",
    originalCategorySlug: "food-hospitality",
    originalCategoryName: "Food & Hospitality",
    targetCategorySlug: "food-hospitality",
    targetCategoryName: "Food & Hospitality",
    productType: "web_application",
    scores: { design: 15, functionality: 15, completeness: 12, originality: 8, commercial: 8, total: 58 },
    decision: "SCRAP",
    analysisReasoning: "Weak differentiation spreadsheet-like inventory table. Scrapped permanently.",
    salvageableAssets: ["FIFO stock expiry badge component"],
    issuesFound: ["Uninspired tabular UI with zero customer-facing product value"],
    recommendedAction: "Scrapped permanently."
  },

  // =========================================================================
  // BATCH 02: RETAIL & ECOMMERCE (14 DEMOS: 3 KEEP, 11 SCRAP)
  // =========================================================================
  {
    id: 15,
    catalogId: 15,
    slug: "retail-store-management",
    name: "Retail Store Management",
    batch: "Batch 02",
    originalCategorySlug: "retail-ecommerce",
    originalCategoryName: "Retail & Ecommerce",
    targetCategorySlug: "retail-ecommerce",
    targetCategoryName: "Retail & Ecommerce",
    productType: "web_application",
    scores: { design: 23, functionality: 23, completeness: 18, originality: 13, commercial: 14, total: 91 },
    decision: "SCRAP",
    analysisReasoning: "Multi-counter retail store manager with supplier POs and register closeouts. Scrapped as internal back-office tool.",
    salvageableAssets: ["Daily register closeout modal", "Supplier PO generation flow", "Staff shift metrics"],
    issuesFound: ["Back-office operational tool rather than customer-facing retail product"],
    recommendedAction: "Scrapped. Modal layouts archived."
  },
  {
    id: 16,
    catalogId: 16,
    slug: "multi-store-pos-system",
    name: "Multi-Store POS System",
    batch: "Batch 02",
    originalCategorySlug: "retail-ecommerce",
    originalCategoryName: "Retail & Ecommerce",
    targetCategorySlug: "retail-ecommerce",
    targetCategoryName: "Retail & Ecommerce",
    productType: "web_application",
    scores: { design: 24, functionality: 24, completeness: 19, originality: 14, commercial: 14, total: 95 },
    decision: "SCRAP",
    analysisReasoning: "High-grade multi-location cashier POS terminal. Scrapped as management software; clients buy D2C storefronts and branded mobile apps.",
    salvageableAssets: ["Branch switcher topbar", "Inter-store transfer request workflow", "Consolidated chain revenue chart"],
    issuesFound: ["Internal cashier POS rather than consumer shopping experience"],
    recommendedAction: "Scrapped. Branch switcher component archived."
  },
  {
    id: 17,
    catalogId: 17,
    slug: "fashion-apparel-store",
    name: "Fashion & Apparel Store",
    batch: "Batch 02",
    originalCategorySlug: "retail-ecommerce",
    originalCategoryName: "Retail & Ecommerce",
    targetCategorySlug: "retail-ecommerce",
    targetCategoryName: "Retail & Ecommerce",
    productType: "web_application",
    scores: { design: 23, functionality: 23, completeness: 18, originality: 13, commercial: 14, total: 91 },
    decision: "SCRAP",
    analysisReasoning: "Back-office apparel SKU matrix and seasonal designer collection manager. Scrapped in portfolio reset.",
    salvageableAssets: ["Size x Color variant matrix", "Seasonal collection manager", "Garment exchange workflow"],
    issuesFound: ["Back-office merchandising system rather than consumer fashion storefront"],
    recommendedAction: "Scrapped. Variant matrix logic archived."
  },
  {
    id: 18,
    catalogId: 18,
    slug: "electronics-store-management",
    name: "Electronics Store Management",
    batch: "Batch 02",
    originalCategorySlug: "retail-ecommerce",
    originalCategoryName: "Retail & Ecommerce",
    targetCategorySlug: "retail-ecommerce",
    targetCategoryName: "Retail & Ecommerce",
    productType: "web_application",
    scores: { design: 23, functionality: 23, completeness: 18, originality: 13, commercial: 14, total: 91 },
    decision: "SCRAP",
    analysisReasoning: "Hardware serial number/IMEI tracking and repair job cards. Scrapped as internal repair shop software.",
    salvageableAssets: ["IMEI/Serial lookup scanner simulator", "Warranty period tracker", "Repair job card workflow"],
    issuesFound: ["Service bay management software rather than electronics ecommerce experience"],
    recommendedAction: "Scrapped. Serial lookup component archived."
  },
  {
    id: 19,
    catalogId: 19,
    slug: "grocery-store-management",
    name: "Grocery Store Management",
    batch: "Batch 02",
    originalCategorySlug: "retail-ecommerce",
    originalCategoryName: "Retail & Ecommerce",
    targetCategorySlug: "retail-ecommerce",
    targetCategoryName: "Retail & Ecommerce",
    productType: "web_application",
    scores: { design: 22, functionality: 23, completeness: 18, originality: 13, commercial: 14, total: 90 },
    decision: "SCRAP",
    analysisReasoning: "Supermarket cashier barcode checkout and spoilage write-offs. Scrapped as back-office management tool.",
    salvageableAssets: ["Weight tare calculator", "Barcode audio beeper simulation", "Perishable shelf-life audit board"],
    issuesFound: ["Cashier checkout terminal rather than consumer grocery shopping app"],
    recommendedAction: "Scrapped. Audio beeper and tare calculator archived."
  },
  {
    id: 20,
    catalogId: 20,
    slug: "furniture-store-management",
    name: "Furniture Store Management",
    batch: "Batch 02",
    originalCategorySlug: "retail-ecommerce",
    originalCategoryName: "Retail & Ecommerce",
    targetCategorySlug: "retail-ecommerce",
    targetCategoryName: "Retail & Ecommerce",
    productType: "web_application",
    scores: { design: 23, functionality: 23, completeness: 19, originality: 13, commercial: 14, total: 92 },
    decision: "SCRAP",
    analysisReasoning: "Furniture quote builder and two-man delivery route scheduler. Scrapped as internal logistics software.",
    salvageableAssets: ["Finish swatch selector", "Quotation builder modal", "Two-man delivery scheduler"],
    issuesFound: ["Internal operations suite rather than consumer furniture ecommerce store"],
    recommendedAction: "Scrapped. Swatch selector archived."
  },
  {
    id: 21,
    catalogId: 21,
    slug: "jewellery-store-management",
    name: "Jewellery Store Management",
    batch: "Batch 02",
    originalCategorySlug: "retail-ecommerce",
    originalCategoryName: "Retail & Ecommerce",
    targetCategorySlug: "retail-ecommerce",
    targetCategoryName: "Retail & Ecommerce",
    productType: "web_application",
    scores: { design: 24, functionality: 24, completeness: 19, originality: 13, commercial: 14, total: 94 },
    decision: "SCRAP",
    analysisReasoning: "Bullion gold rate board and HUID government hallmarking verifier. Scrapped as back-office jewelry operations.",
    salvageableAssets: ["Live bullion rate recalculation ticker", "HUID hallmarking certificate modal", "Wastage and making charge breakdown"],
    issuesFound: ["Bullion back-office operations rather than luxury consumer jewelry boutique"],
    recommendedAction: "Scrapped. Gold ticker component archived."
  },
  {
    id: 22,
    catalogId: 22,
    slug: "pharmacy-retail-management",
    name: "Pharmacy Retail Management",
    batch: "Batch 02",
    originalCategorySlug: "retail-ecommerce",
    originalCategoryName: "Retail & Ecommerce",
    targetCategorySlug: "retail-ecommerce",
    targetCategoryName: "Retail & Ecommerce",
    productType: "web_application",
    scores: { design: 23, functionality: 23, completeness: 19, originality: 13, commercial: 14, total: 92 },
    decision: "SCRAP",
    analysisReasoning: "Pharmacy dispensary with Schedule H1 prescription verification and strip unit conversion. Scrapped as medical dispensary software.",
    salvageableAssets: ["Rx prescription requirement gate", "Strip vs. loose tablet unit converter", "Batch expiry quarantine manager"],
    issuesFound: ["Dispensary compliance software rather than consumer wellness / pharmacy ecommerce"],
    recommendedAction: "Scrapped. Rx upload gate archived."
  },
  {
    id: 23,
    catalogId: 23,
    slug: "ecommerce-storefront",
    name: "E-Commerce Storefront",
    batch: "Batch 02",
    originalCategorySlug: "retail-ecommerce",
    originalCategoryName: "Retail & Ecommerce",
    targetCategorySlug: "retail-ecommerce",
    targetCategoryName: "Retail & Ecommerce",
    productType: "ecommerce_website",
    scores: { design: 24, functionality: 24, completeness: 20, originality: 14, commercial: 14, total: 96 },
    decision: "KEEP",
    analysisReasoning: "Superb consumer-facing D2C digital product! Full product detail modal, multi-item cart slideover drawer, promo code discounts, and simulated checkout.",
    salvageableAssets: ["Cart slideover drawer with quantity controls", "Simulated checkout payment sheet", "Product filter sidebar"],
    issuesFound: ["None. Retained as premier D2C Storefront flagship demo."],
    recommendedAction: "KEEP. Maintained active in Retail & Ecommerce showcase."
  },
  {
    id: 24,
    catalogId: 24,
    slug: "multi-vendor-marketplace",
    name: "Multi-Vendor Marketplace",
    batch: "Batch 02",
    originalCategorySlug: "retail-ecommerce",
    originalCategoryName: "Retail & Ecommerce",
    targetCategorySlug: "retail-ecommerce",
    targetCategoryName: "Retail & Ecommerce",
    productType: "marketplace",
    scores: { design: 24, functionality: 24, completeness: 19, originality: 14, commercial: 14, total: 95 },
    decision: "KEEP",
    analysisReasoning: "A true 3-sided marketplace experience! Product catalog with vendor storefronts, seller onboarding modal, commission rate ledger, and multi-vendor split cart.",
    salvageableAssets: ["Vendor storefront badge card", "Marketplace commission calculation engine", "Seller application workflow"],
    issuesFound: ["None. Retained as premier Marketplace flagship demo."],
    recommendedAction: "KEEP. Maintained active in Retail & Ecommerce showcase."
  },
  {
    id: 25,
    catalogId: 25,
    slug: "online-fashion-boutique",
    name: "Online Fashion Boutique",
    batch: "Batch 02",
    originalCategorySlug: "retail-ecommerce",
    originalCategoryName: "Retail & Ecommerce",
    targetCategorySlug: "retail-ecommerce",
    targetCategoryName: "Retail & Ecommerce",
    productType: "ecommerce_website",
    scores: { design: 25, functionality: 25, completeness: 20, originality: 14, commercial: 14, total: 98 },
    decision: "KEEP",
    analysisReasoning: "The pinnacle of luxury digital products! Interactive editorial lookbook with clickable hotspot tags, live size/color pill selectors, curated stories, and couture drawer checkout.",
    salvageableAssets: ["Interactive editorial lookbook hotspot viewer", "Fabric composition modal", "Luxury slide-out shopping bag"],
    issuesFound: ["None. Highest scoring demo in portfolio."],
    recommendedAction: "KEEP. Maintained active in Retail & Ecommerce showcase."
  },
  {
    id: 26,
    catalogId: 26,
    slug: "wholesale-distribution-management",
    name: "Wholesale Distribution Management",
    batch: "Batch 02",
    originalCategorySlug: "retail-ecommerce",
    originalCategoryName: "Retail & Ecommerce",
    targetCategorySlug: "retail-ecommerce",
    targetCategoryName: "Retail & Ecommerce",
    productType: "web_application",
    scores: { design: 23, functionality: 23, completeness: 18, originality: 14, commercial: 14, total: 92 },
    decision: "SCRAP",
    analysisReasoning: "B2B wholesale trading suite with tiered quantity pricing and customer credit limits. Scrapped as back-office wholesale management software.",
    salvageableAssets: ["Tiered quantity price matrix", "Trade credit limit approval badge", "Proforma invoice generator"],
    issuesFound: ["B2B enterprise portal without consumer retail digital experience"],
    recommendedAction: "Scrapped. Price matrix archived."
  },
  {
    id: 27,
    catalogId: 27,
    slug: "inventory-stock-management",
    name: "Inventory & Stock Management",
    batch: "Batch 02",
    originalCategorySlug: "retail-ecommerce",
    originalCategoryName: "Retail & Ecommerce",
    targetCategorySlug: "retail-ecommerce",
    targetCategoryName: "Retail & Ecommerce",
    productType: "web_application",
    scores: { design: 25, functionality: 25, completeness: 19, originality: 14, commercial: 14, total: 97 },
    decision: "SCRAP",
    analysisReasoning: "Masterpiece warehouse management system with 4-aisle bin locator and wave picking. Scrapped as internal logistics software; client companies buy customer portals and websites.",
    salvageableAssets: ["Visual 4-aisle warehouse bin grid", "Wave picking status dispatch board", "Cycle count discrepancy logger"],
    issuesFound: ["Pure warehouse management software with zero consumer product appeal"],
    recommendedAction: "Scrapped. Bin locator and wave picking engine archived."
  },
  {
    id: 28,
    catalogId: 28,
    slug: "order-returns-management",
    name: "Order & Returns Management",
    batch: "Batch 02",
    originalCategorySlug: "retail-ecommerce",
    originalCategoryName: "Retail & Ecommerce",
    targetCategorySlug: "retail-ecommerce",
    targetCategoryName: "Retail & Ecommerce",
    productType: "web_application",
    scores: { design: 24, functionality: 24, completeness: 19, originality: 14, commercial: 14, total: 95 },
    decision: "SCRAP",
    analysisReasoning: "Reverse logistics RMA platform with photographic inspection and courier reverse pickup. Scrapped as internal operations software.",
    salvageableAssets: ["RMA photo inspection gallery", "Reverse courier AWB generator", "Store credit refund processor"],
    issuesFound: ["Internal operations suite rather than customer digital product"],
    recommendedAction: "Scrapped. Photo inspection gallery archived."
  },

  // =========================================================================
  // PILOT: MAISON EMBER (Protected Pilot under Rule 10)
  // =========================================================================
  {
    id: 0,
    catalogId: 0,
    slug: "restaurant-management-pilot",
    name: "Maison Ember — Fine Dining OS Pilot",
    batch: "Pilot",
    originalCategorySlug: "food-hospitality",
    originalCategoryName: "Food & Hospitality",
    targetCategorySlug: "food-hospitality",
    targetCategoryName: "Food & Hospitality",
    productType: "web_application",
    scores: { design: 24, functionality: 24, completeness: 19, originality: 14, commercial: 14, total: 95 },
    decision: "KEEP",
    analysisReasoning: "The foundational production pilot. Preserved unconditionally under Rule 10 with published status intact.",
    salvageableAssets: ["Original sound-effects player", "Fine dining dark theme tokens", "Maison Ember visual identity"],
    issuesFound: ["None. Protected pilot benchmark."],
    recommendedAction: "KEEP (PILOT). Retain published status and pilot isolation per Rule 10."
  }
];

export interface PortfolioAuditMetrics {
  totalAudited: number;
  keepCount: number;
  scrapCount: number;
  reclassifyCount: number;
  rebuildCount: number;
  averageScore: number;
  highestScoring: { name: string; score: number };
  lowestScoring: { name: string; score: number };
}

export function getPortfolioAuditMetrics(): PortfolioAuditMetrics {
  const demosOnly = PORTFOLIO_AUDIT_DATA.filter((d) => d.batch !== "Pilot");
  const total = demosOnly.length; // 28
  const keep = demosOnly.filter((d) => d.decision === "KEEP").length; // 5
  const scrap = demosOnly.filter((d) => d.decision === "SCRAP").length; // 23

  const sum = demosOnly.reduce((acc, d) => acc + d.scores.total, 0);
  const avg = Math.round(sum / total);

  let highest = demosOnly[0];
  let lowest = demosOnly[0];
  for (const d of demosOnly) {
    if (d.scores.total > highest.scores.total) highest = d;
    if (d.scores.total < lowest.scores.total) lowest = d;
  }

  return {
    totalAudited: total,
    keepCount: keep,
    scrapCount: scrap,
    reclassifyCount: 0,
    rebuildCount: 0,
    averageScore: avg,
    highestScoring: { name: highest.name, score: highest.scores.total },
    lowestScoring: { name: lowest.name, score: lowest.scores.total },
  };
}
