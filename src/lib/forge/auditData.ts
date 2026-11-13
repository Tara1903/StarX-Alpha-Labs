import type { DemoProductType } from "@/types/demo";

export type AuditDecision = "KEEP" | "RECLASSIFY" | "REBUILD" | "SCRAP";

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
  // --- BATCH 01: FOOD & HOSPITALITY ---
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
    productType: "business_management_software",
    scores: { design: 23, functionality: 23, completeness: 19, originality: 13, commercial: 14, total: 92 },
    decision: "RECLASSIFY",
    analysisReasoning: "Highly capable multi-table floor state engine, KOT kitchen dispatch, recipe costing and shift management. A genuine enterprise operational software suite retained within Food & Hospitality under the business_management_software product type.",
    salvageableAssets: ["Interactive 12-table floor plan canvas", "Real-time KOT audio alert dispatcher", "Bill split and course-firing algorithms"],
    issuesFound: ["Previously unclassified product type; now standardized as business_management_software"],
    recommendedAction: "Retain in Food & Hospitality category with standardized product type 'business_management_software'."
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
    productType: "business_management_software",
    scores: { design: 22, functionality: 23, completeness: 18, originality: 11, commercial: 12, total: 86 },
    decision: "RECLASSIFY",
    analysisReasoning: "Fast-touch cashier terminal with numpad item entry, split bill drawer, and GST invoice formatting. Retained in Food & Hospitality under the business_management_software product type.",
    salvageableAssets: ["Numpad speed-dial component", "Split payment calculator", "Thermal print CSS preview"],
    issuesFound: ["Overlaps with demo #01 floor billing; specialized for rapid counter checkout"],
    recommendedAction: "Retain in Food & Hospitality category with product type 'business_management_software'."
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
    productType: "business_management_software",
    scores: { design: 21, functionality: 23, completeness: 18, originality: 11, commercial: 13, total: 86 },
    decision: "RECLASSIFY",
    analysisReasoning: "Multi-brand ghost kitchen order consolidation, aggregator dispatch integration (Swiggy/Zomato), and packaging lines. Operational business software within Food & Hospitality.",
    salvageableAssets: ["Multi-brand kitchen router", "Rider pickup countdown timer", "Kitchen ticket line-printer layout"],
    issuesFound: ["B2B back-office tool now cleanly typed as business_management_software"],
    recommendedAction: "Retain in Food & Hospitality category with product type 'business_management_software'."
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
    decision: "REBUILD",
    analysisReasoning: "Valuable boutique cafe concept built as a generic back-office dashboard rather than the customer-facing mobile ordering PWA with bean flavor notes and loyalty stamp card that specialty coffee shops purchase.",
    salvageableAssets: ["Roaster bean profile schema", "Beverage modifier options (milk substitutes, syrups)"],
    issuesFound: ["Looks like a dark dashboard rather than an inviting artisan cafe product", "Lacks customer ordering journey"],
    recommendedAction: "Rebuild as an Artisan Specialty Cafe Mobile Ordering & Stamp Loyalty PWA in Food & Hospitality."
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
    decision: "REBUILD",
    analysisReasoning: "High commercial interest concept implemented as internal flour batch yields rather than a luxury cake designer studio and pastry pre-ordering storefront.",
    salvageableAssets: ["Recipe batch scaling multiplier", "Allergen matrix badges"],
    issuesFound: ["Missing bespoke custom cake inquiry builder", "Missing pastry storefront visuals"],
    recommendedAction: "Rebuild as a Custom Cake Studio & Bakehouse Online Ordering Storefront in Food & Hospitality."
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
    analysisReasoning: "Top-tier real-time delivery logistics dispatch application with live SVG radar tracking, rider battery/speed telemetry, and geofence alerts.",
    salvageableAssets: ["Live SVG delivery map component", "Fleet rider status monitor", "Order dispatch stepper"],
    issuesFound: ["Minor: Simulated socket event for rider progress"],
    recommendedAction: "Keep as a premier Food & Hospitality logistics demo."
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
    decision: "REBUILD",
    analysisReasoning: "Currently built as a host-stand reception planner rather than an OpenTable-style guest booking portal with tasting menu prepayment, party size selector, and dietary note collection.",
    salvageableAssets: ["Table assignment slot algorithm", "VIP diner history profile"],
    issuesFound: ["Inverted perspective: built for the maitre d' instead of the guest"],
    recommendedAction: "Rebuild as a Guest Table Reservation & Dining Experience Booking Platform in Food & Hospitality."
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
    productType: "business_management_software",
    scores: { design: 20, functionality: 20, completeness: 16, originality: 11, commercial: 12, total: 79 },
    decision: "RECLASSIFY",
    analysisReasoning: "Enterprise PMS integration for room service charge posting, multi-outlet dining billing, and room guest account reconciliation. Retained within Food & Hospitality as business_management_software.",
    salvageableAssets: ["Room folio billing mapper", "Banquet dining ledger component"],
    issuesFound: ["Operational hotel PMS tool standardized as business_management_software"],
    recommendedAction: "Retain in Food & Hospitality category with product type 'business_management_software'."
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
    productType: "business_management_software",
    scores: { design: 19, functionality: 19, completeness: 16, originality: 11, commercial: 11, total: 76 },
    decision: "RECLASSIFY",
    analysisReasoning: "Full Banquet Event Order (BEO) contract workflow, per-head ingredient scaling, equipment checklist, and staff deployment schedules. Retained within Food & Hospitality.",
    salvageableAssets: ["BEO generator", "Headcount ingredient calculation engine"],
    issuesFound: ["Heavy internal back-office format now correctly designated as business_management_software"],
    recommendedAction: "Retain in Food & Hospitality category with product type 'business_management_software'."
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
    analysisReasoning: "Weak commercial value. Duplicates generic POS features of demo #02 without solving actual food truck pain points (offline sync, live roaming GPS).",
    salvageableAssets: ["Live GPS location broadcasting badge"],
    issuesFound: ["Redundant with demo #02", "Low enterprise purchasing interest"],
    recommendedAction: "Scrap from active showcase. Archive source; harvest GPS broadcasting component."
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
    productType: "business_management_software",
    scores: { design: 16, functionality: 15, completeness: 12, originality: 9, commercial: 8, total: 60 },
    decision: "SCRAP",
    analysisReasoning: "Redundant with demo #01 (Aura Dine) and #02 (Apex POS). Bar tabs and pour tracking are already covered; lacks smart tap flow meter IoT telemetry.",
    salvageableAssets: ["Keg percentage visual gauge", "Happy hour timed pricing toggle"],
    issuesFound: ["Heavy duplication with restaurant POS"],
    recommendedAction: "Scrap from active showcase. Merge keg telemetry into demo #01 bar module."
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
    analysisReasoning: "Outstanding dual-mode kiosk and rapid kitchen order dispatch. Fast oversized touch targets, meal combo upsells, and token queue display.",
    salvageableAssets: ["Oversized touch ordering interface", "Fast food combo configurator", "Token calling screen"],
    issuesFound: ["Kiosk full-screen mode needs minor styling polish"],
    recommendedAction: "Keep as a flagship Food & Hospitality QSR self-service product."
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
    decision: "REBUILD",
    analysisReasoning: "Valuable farm-to-table concept built as internal procurement sheets rather than an engaging consumer organic grocery subscription storefront.",
    salvageableAssets: ["Perishable freshness countdown", "Weight-based gram pricing selector"],
    issuesFound: ["Missing organic produce photography and subscription weekly basket builder"],
    recommendedAction: "Rebuild as a Farm-to-Door Organic Produce & Weekly Subscription Storefront in Food & Hospitality."
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
    productType: "business_management_software",
    scores: { design: 15, functionality: 15, completeness: 12, originality: 8, commercial: 8, total: 58 },
    decision: "SCRAP",
    analysisReasoning: "Weak differentiation. Pure spreadsheet-like stock levels that are completely superseded and outclassed by demo #27 (OmniVault WMS).",
    salvageableAssets: ["FIFO stock expiry badge component"],
    issuesFound: ["Complete overlap with enterprise WMS #27", "Uninspired tabular UI"],
    recommendedAction: "Scrap from active showcase. Consolidate food supply rules into demo #27."
  },

  // --- BATCH 02: RETAIL & ECOMMERCE ---
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
    productType: "business_management_software",
    scores: { design: 23, functionality: 23, completeness: 18, originality: 13, commercial: 14, total: 91 },
    decision: "RECLASSIFY",
    analysisReasoning: "Comprehensive multi-counter store operations, supplier purchase orders, returns and shift reconciliation. Retained within Retail & Ecommerce with product type business_management_software.",
    salvageableAssets: ["Daily register closeout modal", "Supplier PO generation flow", "Staff shift metrics"],
    issuesFound: ["Correctly classified under Retail & Ecommerce with product type business_management_software"],
    recommendedAction: "Retain in Retail & Ecommerce category with product type 'business_management_software'."
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
    productType: "business_management_software",
    scores: { design: 24, functionality: 24, completeness: 19, originality: 14, commercial: 14, total: 95 },
    decision: "RECLASSIFY",
    analysisReasoning: "Exceptional multi-location chain POS with branch switcher, inter-store stock transfer requests, and consolidated sales auditing. Retained in Retail & Ecommerce.",
    salvageableAssets: ["Branch switcher topbar", "Inter-store transfer request workflow", "Consolidated chain revenue chart"],
    issuesFound: ["Standardized product type as business_management_software"],
    recommendedAction: "Retain in Retail & Ecommerce category with product type 'business_management_software'."
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
    productType: "business_management_software",
    scores: { design: 23, functionality: 23, completeness: 18, originality: 13, commercial: 14, total: 91 },
    decision: "RECLASSIFY",
    analysisReasoning: "Complete apparel merchandising platform with size/color SKU matrix, designer season collections, and return/exchange ledger. Operational software within Retail & Ecommerce.",
    salvageableAssets: ["Size x Color variant matrix", "Seasonal collection manager", "Garment exchange workflow"],
    issuesFound: ["Back-office merchandising system classified as business_management_software"],
    recommendedAction: "Retain in Retail & Ecommerce category with product type 'business_management_software'."
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
    productType: "business_management_software",
    scores: { design: 23, functionality: 23, completeness: 18, originality: 13, commercial: 14, total: 91 },
    decision: "RECLASSIFY",
    analysisReasoning: "High-grade electronics management suite with serialized IMEI tracking, manufacturer warranty ledger, and repair service job cards. Retained within Retail & Ecommerce.",
    salvageableAssets: ["IMEI/Serial lookup scanner simulator", "Warranty period tracker", "Repair job card workflow"],
    issuesFound: ["High-complexity hardware tool designated as business_management_software"],
    recommendedAction: "Retain in Retail & Ecommerce category with product type 'business_management_software'."
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
    productType: "business_management_software",
    scores: { design: 22, functionality: 23, completeness: 18, originality: 13, commercial: 14, total: 90 },
    decision: "RECLASSIFY",
    analysisReasoning: "Fast supermarket checkout with barcode scan simulation, weight tare calculation, perishable expiry tracking, and supplier restocking POs. Retained within Retail & Ecommerce.",
    salvageableAssets: ["Weight tare calculator", "Barcode audio beeper simulation", "Perishable shelf-life audit board"],
    issuesFound: ["Supermarket POS and inventory designated as business_management_software"],
    recommendedAction: "Retain in Retail & Ecommerce category with product type 'business_management_software'."
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
    productType: "business_management_software",
    scores: { design: 23, functionality: 23, completeness: 19, originality: 13, commercial: 14, total: 92 },
    decision: "RECLASSIFY",
    analysisReasoning: "Bespoke furniture retail platform featuring room collection sets, material & finish swatch selectors, quotation builder, and 2-man delivery scheduling. Retained within Retail & Ecommerce.",
    salvageableAssets: ["Finish swatch selector", "Quotation builder modal", "Two-man white-glove delivery scheduler"],
    issuesFound: ["Back-office quotation and dispatch tool classified as business_management_software"],
    recommendedAction: "Retain in Retail & Ecommerce category with product type 'business_management_software'."
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
    productType: "business_management_software",
    scores: { design: 24, functionality: 24, completeness: 19, originality: 13, commercial: 14, total: 94 },
    decision: "RECLASSIFY",
    analysisReasoning: "Remarkable bullion and jewellery retail suite featuring a live daily gold rate board, wastage & making charge calculations, and government HUID hallmarking verification. Retained within Retail & Ecommerce.",
    salvageableAssets: ["Live bullion rate recalculation ticker", "HUID hallmarking certificate modal", "Wastage and making charge breakdown"],
    issuesFound: ["High-value bullion operations classified as business_management_software"],
    recommendedAction: "Retain in Retail & Ecommerce category with product type 'business_management_software'."
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
    productType: "business_management_software",
    scores: { design: 23, functionality: 23, completeness: 19, originality: 13, commercial: 14, total: 92 },
    decision: "RECLASSIFY",
    analysisReasoning: "Highly compliant pharmacy dispensary system with Schedule H1 prescription enforcement, batch-wise strip/tablet unit conversion, and expired batch quarantine. Retained within Retail & Ecommerce.",
    salvageableAssets: ["Rx prescription requirement gate", "Strip vs. loose tablet unit converter", "Batch expiry quarantine manager"],
    issuesFound: ["Clinical dispensary system designated as business_management_software"],
    recommendedAction: "Retain in Retail & Ecommerce category with product type 'business_management_software'."
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
    analysisReasoning: "Superb consumer-facing D2C digital product! Full product detail modal, multi-item cart slideover drawer, promo code discounts, and simulated Stripe/UPI checkout.",
    salvageableAssets: ["Cart slideover drawer with quantity controls", "Simulated checkout payment sheet", "Product filter sidebar"],
    issuesFound: ["None. Excellent consumer digital product."],
    recommendedAction: "Keep as flagship showcase in Retail & Ecommerce."
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
    issuesFound: ["None. Complete multi-sided digital product."],
    recommendedAction: "Keep as premier Marketplace demo in Retail & Ecommerce."
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
    analysisReasoning: "The gold standard of luxury digital products! Interactive editorial lookbook with clickable hotspot tags, live size/color pill selectors, curated stories, and couture drawer checkout.",
    salvageableAssets: ["Interactive editorial lookbook hotspot viewer", "Fabric composition and care modal", "Luxury slide-out shopping bag"],
    issuesFound: ["None. Highest scoring demo in portfolio."],
    recommendedAction: "Keep as premier Haute Couture flagship product in Retail & Ecommerce."
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
    productType: "business_management_software",
    scores: { design: 23, functionality: 23, completeness: 18, originality: 14, commercial: 14, total: 92 },
    decision: "RECLASSIFY",
    analysisReasoning: "B2B wholesale trading suite with tiered quantity pricing, client trade credit limits, proforma invoices, and pallet logistics estimators. Retained within Retail & Ecommerce.",
    salvageableAssets: ["Tiered quantity price matrix", "Trade credit limit approval badge", "Proforma invoice generator"],
    issuesFound: ["B2B enterprise portal correctly typed as business_management_software"],
    recommendedAction: "Retain in Retail & Ecommerce category with product type 'business_management_software'."
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
    productType: "business_management_software",
    scores: { design: 25, functionality: 25, completeness: 19, originality: 14, commercial: 14, total: 97 },
    decision: "RECLASSIFY",
    analysisReasoning: "A masterpiece of warehouse management! Interactive 4-aisle bin locator grid, wave picking status board, cycle count audits, and automatic stock reorder triggers. Retained in Retail & Ecommerce.",
    salvageableAssets: ["Visual 4-aisle warehouse bin grid", "Wave picking status dispatch board", "Cycle count discrepancy logger"],
    issuesFound: ["Industrial inventory suite designated as business_management_software"],
    recommendedAction: "Retain in Retail & Ecommerce category with product type 'business_management_software'."
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
    productType: "business_management_software",
    scores: { design: 24, functionality: 24, completeness: 19, originality: 14, commercial: 14, total: 95 },
    decision: "RECLASSIFY",
    analysisReasoning: "Comprehensive reverse logistics engine! Customer RMA claim submission, photographic proof review, return authorization approval, courier reverse pickup, and instant refund credit. Retained in Retail & Ecommerce.",
    salvageableAssets: ["RMA photo inspection gallery", "Reverse courier AWB generator", "Store credit refund processor"],
    issuesFound: ["Reverse logistics operations designated as business_management_software"],
    recommendedAction: "Retain in Retail & Ecommerce category with product type 'business_management_software'."
  },

  // --- PILOT: MAISON EMBER (Rule 10 Preservation) ---
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
    recommendedAction: "Retain published status and pilot isolation per Rule 10."
  }
];

export interface PortfolioAuditMetrics {
  totalAudited: number;
  keepCount: number;
  reclassifyCount: number;
  rebuildCount: number;
  scrapCount: number;
  averageScore: number;
  highestScoring: { name: string; score: number };
  lowestScoring: { name: string; score: number };
}

export function getPortfolioAuditMetrics(): PortfolioAuditMetrics {
  const demosOnly = PORTFOLIO_AUDIT_DATA.filter(d => d.batch !== "Pilot");
  const total = demosOnly.length;
  const keep = demosOnly.filter(d => d.decision === "KEEP").length;
  const reclassify = demosOnly.filter(d => d.decision === "RECLASSIFY").length;
  const rebuild = demosOnly.filter(d => d.decision === "REBUILD").length;
  const scrap = demosOnly.filter(d => d.decision === "SCRAP").length;

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
    reclassifyCount: reclassify,
    rebuildCount: rebuild,
    scrapCount: scrap,
    averageScore: avg,
    highestScoring: { name: highest.name, score: highest.scores.total },
    lowestScoring: { name: lowest.name, score: lowest.scores.total }
  };
}
