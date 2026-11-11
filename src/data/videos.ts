export interface VideoCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  count: number;
}

export interface VideoItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  categoryId: string;
  categoryTitle: string;
  videoType: "youtube" | "vimeo" | "mp4";
  videoUrl: string; // Embed or stream URL
  thumbnailUrl: string;
  durationSeconds: number;
  durationText: string;
  language: string;
  featured: boolean;
  published: boolean;
  viewCount: number;
  relatedDemoId?: string;
  relatedDemoSlug?: string;
  relatedDemoName?: string;
  features: string[];
  tags: string[];
}

export const VIDEO_CATEGORIES: VideoCategory[] = [
  {
    id: "local-business-growth",
    title: "Local Business Growth",
    description: "Digital systems, automated booking, and customer acquisition engines for high-street businesses.",
    iconName: "Store",
    count: 3,
  },
  {
    id: "medical-dental-clinics",
    title: "Medical & Dental Clinics",
    description: "HIPAA-aligned patient portals, digital appointment scheduling, and electronic health intake.",
    iconName: "Stethoscope",
    count: 3,
  },
  {
    id: "restaurants-cafes",
    title: "Restaurants & Cafes",
    description: "Commission-free direct food ordering, digital table QR menus, and kitchen display integrations.",
    iconName: "Utensils",
    count: 3,
  },
  {
    id: "real-estate-builders",
    title: "Real Estate & Builders",
    description: "Interactive property showcases, unit floor plans, virtual tours, and automated buyer lead capture.",
    iconName: "Building",
    count: 3,
  },
  {
    id: "automotive-dealerships",
    title: "Automotive & Dealerships",
    description: "Live vehicle inventories, test-drive booking systems, service scheduling, and spare parts catalog.",
    iconName: "Car",
    count: 2,
  },
  {
    id: "fitness-wellness-centers",
    title: "Fitness & Wellness Centers",
    description: "Gym memberships, class scheduling, trainer booking, and integrated member check-in portals.",
    iconName: "Activity",
    count: 2,
  },
  {
    id: "retail-ecommerce",
    title: "Retail & E-Commerce",
    description: "Ultra-fast headless online storefronts with instant checkout, inventory sync, and multi-currency billing.",
    iconName: "ShoppingBag",
    count: 3,
  },
  {
    id: "professional-services",
    title: "Professional Services",
    description: "Client intake portals, document vaults, and consultation schedulers for Law Firms, CAs, and Consultants.",
    iconName: "Briefcase",
    count: 2,
  },
  {
    id: "education-coaching",
    title: "Education & Coaching",
    description: "Learning management systems, live batch scheduling, test series, and student fee collection.",
    iconName: "GraduationCap",
    count: 2,
  },
  {
    id: "hospitality-resorts-travel",
    title: "Hospitality, Resorts & Travel",
    description: "Direct room booking engines, seasonal packages, excursion reservations, and guest concierge.",
    iconName: "Palmtree",
    count: 2,
  },
  {
    id: "events-venues",
    title: "Events & Venues",
    description: "Auditorium & banquet booking, ticketing, seat reservation maps, and VIP attendee management.",
    iconName: "Calendar",
    count: 2,
  },
  {
    id: "startup-technology",
    title: "Startup & Technology",
    description: "SaaS dashboards, developer documentation portals, API consoles, and product launch marketing engines.",
    iconName: "Rocket",
    count: 3,
  },
];

export const VIDEO_ITEMS: VideoItem[] = [
  // 1. Local Business Growth
  {
    id: "vid-lbg-1",
    slug: "modern-local-business-operating-system-walkthrough",
    title: "Modern Local Business Operating System — Full Platform Walkthrough",
    description: "Watch how a local business transforms its daily customer appointments, inquiries, and automated WhatsApp follow-ups into a 24/7 autonomous growth engine.",
    categoryId: "local-business-growth",
    categoryTitle: "Local Business Growth",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Safe embed fallback
    thumbnailUrl: "/brand/video-thumbnails/local-biz.jpg",
    durationSeconds: 245,
    durationText: "4:05",
    language: "English / Hindi",
    featured: true,
    published: true,
    viewCount: 1420,
    relatedDemoId: "demo-local-business",
    relatedDemoSlug: "ecommerce-retail/retail-store",
    relatedDemoName: "Local Business Hub & Storefront",
    features: [
      "Direct WhatsApp Lead Dispatch",
      "Instant Calendar Booking",
      "Customer Review Automation",
      "Zero-Trust Database Security"
    ],
    tags: ["Local Business", "Lead Automation", "WhatsApp CRM", "Web Design"]
  },
  {
    id: "vid-lbg-2",
    slug: "omnichannel-retail-inventory-and-pos-sync",
    title: "Omnichannel Retail: Physical Store + Online Storefront Sync",
    description: "Demonstration of real-time inventory synchronization between offline point-of-sale registers and a high-speed Next.js web application.",
    categoryId: "local-business-growth",
    categoryTitle: "Local Business Growth",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/brand/video-thumbnails/pos-sync.jpg",
    durationSeconds: 198,
    durationText: "3:18",
    language: "English",
    featured: false,
    published: true,
    viewCount: 890,
    features: [
      "Sub-second Inventory Reconciliation",
      "Barcode Scanner Integration",
      "Instant UPI & Card Checkout"
    ],
    tags: ["Inventory Sync", "Retail", "Point of Sale", "Next.js"]
  },

  // 2. Medical & Dental Clinics
  {
    id: "vid-mdc-1",
    slug: "dental-clinic-digital-intake-and-telemedicine-system",
    title: "Dental & Medical Clinic Patient Management & Digital Intake System",
    description: "Explore the patient appointment booking journey, digital medical history forms, automated SMS reminders, and doctor consultation calendars.",
    categoryId: "medical-dental-clinics",
    categoryTitle: "Medical & Dental Clinics",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/brand/video-thumbnails/dental-clinic.jpg",
    durationSeconds: 312,
    durationText: "5:12",
    language: "English",
    featured: true,
    published: true,
    viewCount: 1840,
    relatedDemoId: "demo-medical-clinic",
    relatedDemoSlug: "healthcare-wellness/clinic-patient-portal",
    relatedDemoName: "Medical Clinic Patient Portal",
    features: [
      "Online Slot Booking with Advance Token",
      "Digital Prescription Download",
      "WhatsApp Appointment Confirmation",
      "Doctor Schedule Management"
    ],
    tags: ["Healthcare", "Dental Clinic", "Appointment System", "Patient Portal"]
  },

  // 3. Restaurants & Cafes
  {
    id: "vid-rc-1",
    slug: "commission-free-restaurant-online-ordering-system",
    title: "Zero-Commission Restaurant Online Ordering & Kitchen Display System",
    description: "Stop paying 25-30% platform aggregator fees. See how our custom restaurant platform handles online food ordering, table reservations, and live kitchen dispatch.",
    categoryId: "restaurants-cafes",
    categoryTitle: "Restaurants & Cafes",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/brand/video-thumbnails/restaurant-ordering.jpg",
    durationSeconds: 270,
    durationText: "4:30",
    language: "English / Hindi",
    featured: true,
    published: true,
    viewCount: 2630,
    relatedDemoId: "demo-online-ordering",
    relatedDemoSlug: "restaurant-food/online-food-ordering",
    relatedDemoName: "Online Food Ordering & KDS",
    features: [
      "Dynamic Menu with Modifiers & Add-ons",
      "Kitchen Display Station (KDS) Live View",
      "Direct UPI & Net Banking Payment",
      "Automated Delivery Driver Dispatch"
    ],
    tags: ["Restaurant", "Food Ordering", "KDS", "Zero Commission"]
  },

  // 4. Real Estate & Builders
  {
    id: "vid-reb-1",
    slug: "luxury-real-estate-project-showcase-and-unit-selector",
    title: "Real Estate Interactive Masterplan & Floor Plan Unit Selector",
    description: "An architectural digital experience for premium developers: interactive 3D floor plans, unit availability matrix, virtual walkthroughs, and VIP brochure downloads.",
    categoryId: "real-estate-builders",
    categoryTitle: "Real Estate & Builders",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/brand/video-thumbnails/real-estate.jpg",
    durationSeconds: 290,
    durationText: "4:50",
    language: "English",
    featured: true,
    published: true,
    viewCount: 1910,
    relatedDemoId: "demo-real-estate",
    relatedDemoSlug: "real-estate-construction/property-developer-portal",
    relatedDemoName: "Property Developer Showcase",
    features: [
      "Interactive 2D/3D Floor Plan Unit Selector",
      "Site Visit Scheduler with GPS Direction",
      "Direct RERA Compliance Disclosure",
      "Automated WhatsApp Brochure Dispatch"
    ],
    tags: ["Real Estate", "Builders", "Property Portal", "Floor Plans"]
  },

  // 5. Automotive & Dealerships
  {
    id: "vid-ad-1",
    slug: "automotive-dealership-inventory-and-service-booking",
    title: "Automotive Dealership: Live Inventory & Instant Service Booking",
    description: "Browse 360-degree vehicle interior views, filter by price and specs, book test drives, and schedule recurring vehicle maintenance.",
    categoryId: "automotive-dealerships",
    categoryTitle: "Automotive & Dealerships",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/brand/video-thumbnails/auto-dealer.jpg",
    durationSeconds: 215,
    durationText: "3:35",
    language: "English",
    featured: false,
    published: true,
    viewCount: 1120,
    features: [
      "Vehicle Spec Comparison Engine",
      "Test Drive Calendar Integration",
      "Automated Service Due Reminders"
    ],
    tags: ["Automotive", "Car Dealership", "Test Drive Booking"]
  },

  // 6. Fitness & Wellness Centers
  {
    id: "vid-fwc-1",
    slug: "gym-membership-management-and-class-booking-app",
    title: "Fitness Center: Membership Subscriptions & Trainer Class Scheduling",
    description: "A complete mobile-first application for gyms, yoga studios, and CrossFit centers with recurring payments, digital attendance, and workout plans.",
    categoryId: "fitness-wellness-centers",
    categoryTitle: "Fitness & Wellness Centers",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/brand/video-thumbnails/gym-app.jpg",
    durationSeconds: 185,
    durationText: "3:05",
    language: "English",
    featured: false,
    published: true,
    viewCount: 970,
    features: [
      "Recurring Monthly/Annual Subscription Billing",
      "Live Class Capacity & Waitlist Tracking",
      "Personal Trainer Slot Booking"
    ],
    tags: ["Fitness", "Gym App", "Class Booking", "Subscriptions"]
  },

  // 7. Retail & E-Commerce
  {
    id: "vid-rec-1",
    slug: "high-speed-headless-ecommerce-storefront-demo",
    title: "Sub-Second Headless E-Commerce Storefront: Cart to Checkout",
    description: "Experience 100/100 Core Web Vitals speed. Watch how our headless Next.js architecture increases checkout conversion rates and handles lightning traffic spikes.",
    categoryId: "retail-ecommerce",
    categoryTitle: "Retail & E-Commerce",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/brand/video-thumbnails/headless-ecom.jpg",
    durationSeconds: 260,
    durationText: "4:20",
    language: "English",
    featured: true,
    published: true,
    viewCount: 3100,
    relatedDemoId: "demo-headless-store",
    relatedDemoSlug: "ecommerce-retail/fashion-boutique",
    relatedDemoName: "Headless Fashion Storefront",
    features: [
      "Instantaneous Faceted Product Filtering",
      "One-Click UPI & Card Payment Gateway",
      "Order Tracking with SMS & WhatsApp",
      "Automated Abandoned Cart Follow-Up"
    ],
    tags: ["E-Commerce", "Headless", "Next.js Storefront", "Conversion"]
  },

  // 8. Professional Services
  {
    id: "vid-ps-1",
    slug: "law-firm-client-intake-and-secure-document-vault",
    title: "Professional Services: Client Intake & Encrypted Document Portal",
    description: "Secure, confidential client portal for legal, financial, and consulting practices. Features end-to-end encrypted file sharing and automated billing.",
    categoryId: "professional-services",
    categoryTitle: "Professional Services",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/brand/video-thumbnails/law-portal.jpg",
    durationSeconds: 220,
    durationText: "3:40",
    language: "English",
    featured: false,
    published: true,
    viewCount: 840,
    features: [
      "Encrypted Document Upload & Signature",
      "Retainer Billing & Invoice Generation",
      "Confidential Client Communications"
    ],
    tags: ["Legal Tech", "Client Portal", "Encrypted Vault", "Billing"]
  },

  // 9. Education & Coaching
  {
    id: "vid-ec-1",
    slug: "coaching-institute-lms-and-student-fee-portal",
    title: "Coaching Institute LMS: Online Tests, Live Classes & Fee Management",
    description: "Comprehensive education management system: batch creation, automated test evaluation, lecture notes library, and parent fee collection portal.",
    categoryId: "education-coaching",
    categoryTitle: "Education & Coaching",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/brand/video-thumbnails/coaching-lms.jpg",
    durationSeconds: 280,
    durationText: "4:40",
    language: "English / Hindi",
    featured: false,
    published: true,
    viewCount: 1450,
    features: [
      "Timed Online Mock Tests with Instant Rank",
      "Live Class Zoom/Google Meet Embeds",
      "Parent Fee Due SMS & Payment Links"
    ],
    tags: ["Education", "LMS", "Coaching Institute", "Online Tests"]
  },

  // 10. Hospitality & Resorts
  {
    id: "vid-hr-1",
    slug: "boutique-resort-direct-room-booking-engine",
    title: "Boutique Resort Direct Room Booking & Guest Experience Portal",
    description: "Eliminate OTA commissions. Showcase panoramic resort villas, live date availability calendars, dining packages, and automated airport transfer booking.",
    categoryId: "hospitality-resorts-travel",
    categoryTitle: "Hospitality, Resorts & Travel",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/brand/video-thumbnails/resort-booking.jpg",
    durationSeconds: 235,
    durationText: "3:55",
    language: "English",
    featured: false,
    published: true,
    viewCount: 1280,
    features: [
      "Direct Room & Villa Calendar Availability",
      "Seasonal Discount Code Engine",
      "Guest Concierge Chat Integration"
    ],
    tags: ["Hospitality", "Resort Booking", "Hotel Website", "Direct Booking"]
  },

  // 11. Events & Venues
  {
    id: "vid-ev-1",
    slug: "banquet-hall-and-event-venue-booking-system",
    title: "Banquet Hall & Event Venue Availability & Package Customizer",
    description: "Allows prospective wedding and corporate clients to check date availability, choose catering packages, calculate budgets, and reserve dates.",
    categoryId: "events-venues",
    categoryTitle: "Events & Venues",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/brand/video-thumbnails/venue-booking.jpg",
    durationSeconds: 195,
    durationText: "3:15",
    language: "English / Hindi",
    featured: false,
    published: true,
    viewCount: 920,
    features: [
      "Interactive Date Calendar with Slot Locking",
      "Dynamic Catering & Decor Cost Estimator",
      "Advance Token Payment Gateway"
    ],
    tags: ["Events", "Venue Booking", "Banquet Hall", "Calculator"]
  },

  // 12. Startup & Technology
  {
    id: "vid-st-1",
    slug: "enterprise-saas-dashboard-and-role-based-console",
    title: "Enterprise SaaS Dashboard: Multi-Tenant Architecture & Telemetry",
    description: "Walkthrough of an enterprise SaaS administration cockpit featuring real-time data visualizers, role-based access control, audit logs, and API token management.",
    categoryId: "startup-technology",
    categoryTitle: "Startup & Technology",
    videoType: "youtube",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/brand/video-thumbnails/saas-dashboard.jpg",
    durationSeconds: 320,
    durationText: "5:20",
    language: "English",
    featured: true,
    published: true,
    viewCount: 3890,
    relatedDemoId: "demo-saas-cockpit",
    relatedDemoSlug: "cloud-devops/cloud-resource-monitor",
    relatedDemoName: "Cloud Infrastructure Console",
    features: [
      "Multi-Tenant Isolation with Zero-Trust RLS",
      "Real-Time Telemetry & WebSockets",
      "Granular Admin Permissions & Audit Trails",
      "Integrated Billing & Stripe/Razorpay Webhooks"
    ],
    tags: ["SaaS", "Dashboard", "Multi-Tenant", "Enterprise"]
  }
];

export function getVideoBySlug(slug: string): VideoItem | undefined {
  return VIDEO_ITEMS.find((v) => v.slug === slug);
}

export function getVideosByCategory(categoryId: string): VideoItem[] {
  if (categoryId === "all") return VIDEO_ITEMS;
  return VIDEO_ITEMS.filter((v) => v.categoryId === categoryId);
}

export function getFeaturedVideos(): VideoItem[] {
  return VIDEO_ITEMS.filter((v) => v.featured);
}
