// STARX ALPHA LABS — CENTRAL DEMO MODELS REPOSITORY
// Contains exactly 160 verified demo models across 12 main categories.
// Generated strictly according to engineering specifications.

import { DemoModel } from "@/types/demo";

export const ALL_DEMOS: DemoModel[] = [
  {
    "id": 1,
    "name": "Restaurant Website",
    "slug": "restaurant-website",
    "categoryNumber": 1,
    "categoryName": "Restaurant, Food & Hospitality",
    "categorySlug": "restaurant-food",
    "shortDescription": "Enterprise-ready Restaurant Website engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Restaurant Website is a comprehensive, production-tested software solution purpose-built for Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks",
    "mainFeatures": [
      "Dynamic Digital Menu with Variant Pricing",
      "Instant Kitchen Order Ticket (KOT) Dispatch",
      "Table QR Code Ordering & Split Billing",
      "Live Order Status & Driver Dispatch Tracking",
      "Inventory & Raw Ingredient Depletion Alerts",
      "Multi-outlet Centralized Management"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Website",
    "platform": "Website",
    "estimatedDevelopmentTime": "1-2 Weeks",
    "indicativeStartingPrice": "₹24,999",
    "indicativePriceUsd": "$349",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1237,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.1@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.1@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.1@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Restaurant Website Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Restaurant Website. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "restaurant website",
        "restaurant, food & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 2,
    "name": "Online Food Ordering",
    "slug": "online-food-ordering",
    "categoryNumber": 1,
    "categoryName": "Restaurant, Food & Hospitality",
    "categorySlug": "restaurant-food",
    "shortDescription": "Enterprise-ready Online Food Ordering engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Online Food Ordering is a comprehensive, production-tested software solution purpose-built for Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks",
    "mainFeatures": [
      "Dynamic Digital Menu with Variant Pricing",
      "Instant Kitchen Order Ticket (KOT) Dispatch",
      "Table QR Code Ordering & Split Billing",
      "Live Order Status & Driver Dispatch Tracking",
      "Inventory & Raw Ingredient Depletion Alerts",
      "Multi-outlet Centralized Management"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹39,999",
    "indicativePriceUsd": "$549",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1274,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.2@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.2@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.2@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Online Food Ordering Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Online Food Ordering. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "online food ordering",
        "restaurant, food & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 3,
    "name": "Cloud Kitchen",
    "slug": "cloud-kitchen",
    "categoryNumber": 1,
    "categoryName": "Restaurant, Food & Hospitality",
    "categorySlug": "restaurant-food",
    "shortDescription": "Enterprise-ready Cloud Kitchen engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Cloud Kitchen is a comprehensive, production-tested software solution purpose-built for Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks",
    "mainFeatures": [
      "Dynamic Digital Menu with Variant Pricing",
      "Instant Kitchen Order Ticket (KOT) Dispatch",
      "Table QR Code Ordering & Split Billing",
      "Live Order Status & Driver Dispatch Tracking",
      "Inventory & Raw Ingredient Depletion Alerts",
      "Multi-outlet Centralized Management"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1311,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.3@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.3@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.3@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Cloud Kitchen Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Cloud Kitchen. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "cloud kitchen",
        "restaurant, food & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 4,
    "name": "Multi-Restaurant Food App",
    "slug": "multi-restaurant-food-app",
    "categoryNumber": 1,
    "categoryName": "Restaurant, Food & Hospitality",
    "categorySlug": "restaurant-food",
    "shortDescription": "Enterprise-ready Multi-Restaurant Food App engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Multi-Restaurant Food App is a comprehensive, production-tested software solution purpose-built for Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks",
    "mainFeatures": [
      "Dynamic Digital Menu with Variant Pricing",
      "Instant Kitchen Order Ticket (KOT) Dispatch",
      "Table QR Code Ordering & Split Billing",
      "Live Order Status & Driver Dispatch Tracking",
      "Inventory & Raw Ingredient Depletion Alerts",
      "Multi-outlet Centralized Management"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-6 Weeks",
    "indicativeStartingPrice": "₹79,999",
    "indicativePriceUsd": "$1,099",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1348,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.4@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.4@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.4@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Multi-Restaurant Food App Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Multi-Restaurant Food App. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "multi-restaurant food app",
        "restaurant, food & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 5,
    "name": "Food Delivery App",
    "slug": "food-delivery-app",
    "categoryNumber": 1,
    "categoryName": "Restaurant, Food & Hospitality",
    "categorySlug": "restaurant-food",
    "shortDescription": "Enterprise-ready Food Delivery App engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Food Delivery App is a comprehensive, production-tested software solution purpose-built for Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks",
    "mainFeatures": [
      "Dynamic Digital Menu with Variant Pricing",
      "Instant Kitchen Order Ticket (KOT) Dispatch",
      "Table QR Code Ordering & Split Billing",
      "Live Order Status & Driver Dispatch Tracking",
      "Inventory & Raw Ingredient Depletion Alerts",
      "Multi-outlet Centralized Management"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "React Native / Flutter",
      "Next.js Backend",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "WebSockets"
    ],
    "developmentType": "Mobile App",
    "platform": "Mobile App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹69,999",
    "indicativePriceUsd": "$949",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1385,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.5@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.5@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.5@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Food Delivery App Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Food Delivery App. Built by StarX Alpha Labs with React Native / Flutter, Next.js Backend, Supabase. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "food delivery app",
        "restaurant, food & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 6,
    "name": "Restaurant POS",
    "slug": "restaurant-pos",
    "categoryNumber": 1,
    "categoryName": "Restaurant, Food & Hospitality",
    "categorySlug": "restaurant-food",
    "shortDescription": "Enterprise-ready Restaurant POS engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Restaurant POS is a comprehensive, production-tested software solution purpose-built for Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks",
    "mainFeatures": [
      "Dynamic Digital Menu with Variant Pricing",
      "Instant Kitchen Order Ticket (KOT) Dispatch",
      "Table QR Code Ordering & Split Billing",
      "Live Order Status & Driver Dispatch Tracking",
      "Inventory & Raw Ingredient Depletion Alerts",
      "Multi-outlet Centralized Management"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹44,999",
    "indicativePriceUsd": "$629",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1422,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.6@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.6@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.6@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Restaurant POS Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Restaurant POS. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "restaurant pos",
        "restaurant, food & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 7,
    "name": "Cafe & Coffee Shop",
    "slug": "cafe-and-coffee-shop",
    "categoryNumber": 1,
    "categoryName": "Restaurant, Food & Hospitality",
    "categorySlug": "restaurant-food",
    "shortDescription": "Enterprise-ready Cafe & Coffee Shop engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Cafe & Coffee Shop is a comprehensive, production-tested software solution purpose-built for Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks",
    "mainFeatures": [
      "Dynamic Digital Menu with Variant Pricing",
      "Instant Kitchen Order Ticket (KOT) Dispatch",
      "Table QR Code Ordering & Split Billing",
      "Live Order Status & Driver Dispatch Tracking",
      "Inventory & Raw Ingredient Depletion Alerts",
      "Multi-outlet Centralized Management"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹29,999",
    "indicativePriceUsd": "$419",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1459,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.7@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.7@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.7@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Cafe & Coffee Shop Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Cafe & Coffee Shop. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "cafe & coffee shop",
        "restaurant, food & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 8,
    "name": "Bakery & Cake Shop",
    "slug": "bakery-and-cake-shop",
    "categoryNumber": 1,
    "categoryName": "Restaurant, Food & Hospitality",
    "categorySlug": "restaurant-food",
    "shortDescription": "Enterprise-ready Bakery & Cake Shop engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Bakery & Cake Shop is a comprehensive, production-tested software solution purpose-built for Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks",
    "mainFeatures": [
      "Dynamic Digital Menu with Variant Pricing",
      "Instant Kitchen Order Ticket (KOT) Dispatch",
      "Table QR Code Ordering & Split Billing",
      "Live Order Status & Driver Dispatch Tracking",
      "Inventory & Raw Ingredient Depletion Alerts",
      "Multi-outlet Centralized Management"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹34,999",
    "indicativePriceUsd": "$489",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1496,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.8@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.8@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.8@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Bakery & Cake Shop Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Bakery & Cake Shop. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "bakery & cake shop",
        "restaurant, food & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 9,
    "name": "Sweet Shop",
    "slug": "sweet-shop",
    "categoryNumber": 1,
    "categoryName": "Restaurant, Food & Hospitality",
    "categorySlug": "restaurant-food",
    "shortDescription": "Enterprise-ready Sweet Shop engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Sweet Shop is a comprehensive, production-tested software solution purpose-built for Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks",
    "mainFeatures": [
      "Dynamic Digital Menu with Variant Pricing",
      "Instant Kitchen Order Ticket (KOT) Dispatch",
      "Table QR Code Ordering & Split Billing",
      "Live Order Status & Driver Dispatch Tracking",
      "Inventory & Raw Ingredient Depletion Alerts",
      "Multi-outlet Centralized Management"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹32,999",
    "indicativePriceUsd": "$459",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1533,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.9@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.9@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.9@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Sweet Shop Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Sweet Shop. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "sweet shop",
        "restaurant, food & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 10,
    "name": "Catering Management",
    "slug": "catering-management",
    "categoryNumber": 1,
    "categoryName": "Restaurant, Food & Hospitality",
    "categorySlug": "restaurant-food",
    "shortDescription": "Enterprise-ready Catering Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Catering Management is a comprehensive, production-tested software solution purpose-built for Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks",
    "mainFeatures": [
      "Dynamic Digital Menu with Variant Pricing",
      "Instant Kitchen Order Ticket (KOT) Dispatch",
      "Table QR Code Ordering & Split Billing",
      "Live Order Status & Driver Dispatch Tracking",
      "Inventory & Raw Ingredient Depletion Alerts",
      "Multi-outlet Centralized Management"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹54,999",
    "indicativePriceUsd": "$769",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1570,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.10@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.10@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.10@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Catering Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Catering Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "catering management",
        "restaurant, food & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 11,
    "name": "Tiffin & Meal Subscription",
    "slug": "tiffin-and-meal-subscription",
    "categoryNumber": 1,
    "categoryName": "Restaurant, Food & Hospitality",
    "categorySlug": "restaurant-food",
    "shortDescription": "Enterprise-ready Tiffin & Meal Subscription engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Tiffin & Meal Subscription is a comprehensive, production-tested software solution purpose-built for Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks",
    "mainFeatures": [
      "Dynamic Digital Menu with Variant Pricing",
      "Instant Kitchen Order Ticket (KOT) Dispatch",
      "Table QR Code Ordering & Split Billing",
      "Live Order Status & Driver Dispatch Tracking",
      "Inventory & Raw Ingredient Depletion Alerts",
      "Multi-outlet Centralized Management"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹42,999",
    "indicativePriceUsd": "$599",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1607,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.11@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.11@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.11@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Tiffin & Meal Subscription Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Tiffin & Meal Subscription. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "tiffin & meal subscription",
        "restaurant, food & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 12,
    "name": "Grocery & Supermarket",
    "slug": "grocery-and-supermarket",
    "categoryNumber": 1,
    "categoryName": "Restaurant, Food & Hospitality",
    "categorySlug": "restaurant-food",
    "shortDescription": "Enterprise-ready Grocery & Supermarket engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Grocery & Supermarket is a comprehensive, production-tested software solution purpose-built for Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks",
    "mainFeatures": [
      "Dynamic Digital Menu with Variant Pricing",
      "Instant Kitchen Order Ticket (KOT) Dispatch",
      "Table QR Code Ordering & Split Billing",
      "Live Order Status & Driver Dispatch Tracking",
      "Inventory & Raw Ingredient Depletion Alerts",
      "Multi-outlet Centralized Management"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹59,999",
    "indicativePriceUsd": "$829",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1644,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.12@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.12@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.12@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Grocery & Supermarket Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Grocery & Supermarket. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "grocery & supermarket",
        "restaurant, food & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 13,
    "name": "Fruits & Vegetables Store",
    "slug": "fruits-and-vegetables-store",
    "categoryNumber": 1,
    "categoryName": "Restaurant, Food & Hospitality",
    "categorySlug": "restaurant-food",
    "shortDescription": "Enterprise-ready Fruits & Vegetables Store engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Fruits & Vegetables Store is a comprehensive, production-tested software solution purpose-built for Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks",
    "mainFeatures": [
      "Dynamic Digital Menu with Variant Pricing",
      "Instant Kitchen Order Ticket (KOT) Dispatch",
      "Table QR Code Ordering & Split Billing",
      "Live Order Status & Driver Dispatch Tracking",
      "Inventory & Raw Ingredient Depletion Alerts",
      "Multi-outlet Centralized Management"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹34,999",
    "indicativePriceUsd": "$489",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1681,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.13@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.13@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.13@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Fruits & Vegetables Store Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Fruits & Vegetables Store. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "fruits & vegetables store",
        "restaurant, food & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 14,
    "name": "Dairy & Milk Subscription",
    "slug": "dairy-and-milk-subscription",
    "categoryNumber": 1,
    "categoryName": "Restaurant, Food & Hospitality",
    "categorySlug": "restaurant-food",
    "shortDescription": "Enterprise-ready Dairy & Milk Subscription engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Dairy & Milk Subscription is a comprehensive, production-tested software solution purpose-built for Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks",
    "mainFeatures": [
      "Dynamic Digital Menu with Variant Pricing",
      "Instant Kitchen Order Ticket (KOT) Dispatch",
      "Table QR Code Ordering & Split Billing",
      "Live Order Status & Driver Dispatch Tracking",
      "Inventory & Raw Ingredient Depletion Alerts",
      "Multi-outlet Centralized Management"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹44,999",
    "indicativePriceUsd": "$629",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1718,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.14@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.14@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.14@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Dairy & Milk Subscription Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Dairy & Milk Subscription. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "dairy & milk subscription",
        "restaurant, food & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 15,
    "name": "Food Franchise Management",
    "slug": "food-franchise-management",
    "categoryNumber": 1,
    "categoryName": "Restaurant, Food & Hospitality",
    "categorySlug": "restaurant-food",
    "shortDescription": "Enterprise-ready Food Franchise Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Food Franchise Management is a comprehensive, production-tested software solution purpose-built for Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Standalone restaurants, cloud kitchens, bakeries, cafes, food chains & franchise networks",
    "mainFeatures": [
      "Dynamic Digital Menu with Variant Pricing",
      "Instant Kitchen Order Ticket (KOT) Dispatch",
      "Table QR Code Ordering & Split Billing",
      "Live Order Status & Driver Dispatch Tracking",
      "Inventory & Raw Ingredient Depletion Alerts",
      "Multi-outlet Centralized Management"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-6 Weeks",
    "indicativeStartingPrice": "₹89,999",
    "indicativePriceUsd": "$1,249",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1755,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.15@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.15@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.15@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Food Franchise Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Food Franchise Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "food franchise management",
        "restaurant, food & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 16,
    "name": "General E-commerce Store",
    "slug": "general-e-commerce-store",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready General E-commerce Store engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs General E-commerce Store is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹39,999",
    "indicativePriceUsd": "$549",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1792,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.16@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.16@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.16@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "General E-commerce Store Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of General E-commerce Store. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "general e-commerce store",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 17,
    "name": "Multi-Vendor Marketplace",
    "slug": "multi-vendor-marketplace",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Multi-Vendor Marketplace engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Multi-Vendor Marketplace is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "5-7 Weeks",
    "indicativeStartingPrice": "₹99,999",
    "indicativePriceUsd": "$1,399",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1829,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.17@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.17@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.17@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Multi-Vendor Marketplace Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Multi-Vendor Marketplace. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "multi-vendor marketplace",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 18,
    "name": "Fashion & Clothing Store",
    "slug": "fashion-and-clothing-store",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Fashion & Clothing Store engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Fashion & Clothing Store is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹44,999",
    "indicativePriceUsd": "$629",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1866,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.18@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.18@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.18@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Fashion & Clothing Store Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Fashion & Clothing Store. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "fashion & clothing store",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 19,
    "name": "Electronics Store",
    "slug": "electronics-store",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Electronics Store engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Electronics Store is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1903,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.19@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.19@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.19@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Electronics Store Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Electronics Store. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "electronics store",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 20,
    "name": "Mobile Accessories Store",
    "slug": "mobile-accessories-store",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Mobile Accessories Store engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Mobile Accessories Store is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹34,999",
    "indicativePriceUsd": "$489",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1940,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.20@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.20@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.20@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Mobile Accessories Store Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Mobile Accessories Store. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "mobile accessories store",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 21,
    "name": "Beauty & Cosmetics Store",
    "slug": "beauty-and-cosmetics-store",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Beauty & Cosmetics Store engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Beauty & Cosmetics Store is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹44,999",
    "indicativePriceUsd": "$629",
    "availabilityStatus": "Under Development",
    "isAiEnabled": true,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1977,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.21@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.21@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.21@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Beauty & Cosmetics Store Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Beauty & Cosmetics Store. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "beauty & cosmetics store",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 22,
    "name": "Ayurvedic & Wellness Store",
    "slug": "ayurvedic-and-wellness-store",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Ayurvedic & Wellness Store engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Ayurvedic & Wellness Store is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹39,999",
    "indicativePriceUsd": "$549",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 2014,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.22@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.22@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.22@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Ayurvedic & Wellness Store Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Ayurvedic & Wellness Store. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "ayurvedic & wellness store",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 23,
    "name": "Furniture Store",
    "slug": "furniture-store",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Furniture Store engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Furniture Store is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹54,999",
    "indicativePriceUsd": "$769",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1211,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.23@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.23@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.23@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Furniture Store Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Furniture Store. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "furniture store",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 24,
    "name": "Jewellery Store",
    "slug": "jewellery-store",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Jewellery Store engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Jewellery Store is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹59,999",
    "indicativePriceUsd": "$829",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1248,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.24@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.24@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.24@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Jewellery Store Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Jewellery Store. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "jewellery store",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 25,
    "name": "Footwear Store",
    "slug": "footwear-store",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Footwear Store engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Footwear Store is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹39,999",
    "indicativePriceUsd": "$549",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1285,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.25@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.25@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.25@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Footwear Store Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Footwear Store. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "footwear store",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 26,
    "name": "Grocery E-commerce",
    "slug": "grocery-e-commerce",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Grocery E-commerce engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Grocery E-commerce is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹54,999",
    "indicativePriceUsd": "$769",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1322,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.26@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.26@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.26@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Grocery E-commerce Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Grocery E-commerce. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "grocery e-commerce",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 27,
    "name": "Wholesale / B2B Portal",
    "slug": "wholesale-and-b2b-portal",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Wholesale / B2B Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Wholesale / B2B Portal is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹74,999",
    "indicativePriceUsd": "$1,049",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1359,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.27@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.27@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.27@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Wholesale / B2B Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Wholesale / B2B Portal. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "wholesale / b2b portal",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 28,
    "name": "Dropshipping Store",
    "slug": "dropshipping-store",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Dropshipping Store engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Dropshipping Store is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹39,999",
    "indicativePriceUsd": "$549",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": true,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1396,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.28@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.28@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.28@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Dropshipping Store Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Dropshipping Store. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "dropshipping store",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 29,
    "name": "Subscription Commerce",
    "slug": "subscription-commerce",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Subscription Commerce engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Subscription Commerce is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1433,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.29@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.29@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.29@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Subscription Commerce Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Subscription Commerce. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "subscription commerce",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 30,
    "name": "Digital Products Store",
    "slug": "digital-products-store",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Digital Products Store engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Digital Products Store is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹34,999",
    "indicativePriceUsd": "$489",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1470,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.30@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.30@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.30@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Digital Products Store Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Digital Products Store. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "digital products store",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 31,
    "name": "Local Shop Online Store",
    "slug": "local-shop-online-store",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Local Shop Online Store engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Local Shop Online Store is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "1-2 Weeks",
    "indicativeStartingPrice": "₹29,999",
    "indicativePriceUsd": "$419",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1507,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.31@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.31@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.31@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Local Shop Online Store Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Local Shop Online Store. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "local shop online store",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 32,
    "name": "D2C Brand Website",
    "slug": "d2c-brand-website",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready D2C Brand Website engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs D2C Brand Website is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1544,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.32@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.32@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.32@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "D2C Brand Website Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of D2C Brand Website. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "d2c brand website",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 33,
    "name": "Rental Marketplace",
    "slug": "rental-marketplace",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Rental Marketplace engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Rental Marketplace is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-6 Weeks",
    "indicativeStartingPrice": "₹84,999",
    "indicativePriceUsd": "$1,189",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1581,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.33@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.33@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.33@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Rental Marketplace Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Rental Marketplace. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "rental marketplace",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 34,
    "name": "Pharmacy Store Demo",
    "slug": "pharmacy-store-demo",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Pharmacy Store Demo engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Pharmacy Store Demo is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹54,999",
    "indicativePriceUsd": "$769",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1618,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.34@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.34@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.34@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Pharmacy Store Demo Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Pharmacy Store Demo. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "pharmacy store demo",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 35,
    "name": "Building Materials Store",
    "slug": "building-materials-store",
    "categoryNumber": 2,
    "categoryName": "E-Commerce & Retail",
    "categorySlug": "ecommerce-retail",
    "shortDescription": "Enterprise-ready Building Materials Store engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Building Materials Store is a comprehensive, production-tested software solution purpose-built for D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "D2C brands, online retailers, wholesalers, boutique stores & multi-vendor platforms",
    "mainFeatures": [
      "Ultra-fast Faceted Product Search & Filtering",
      "Dynamic Product Variant Engine & Stock Alerts",
      "Razorpay, Stripe & Cash-on-Delivery Checkout",
      "Automated Order Lifecycle & Fulfillment Workflows",
      "Tiered Wholesale & B2B Volume Pricing",
      "Abandoned Cart Recovery & SMS Alerts"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1655,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.35@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.35@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.35@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Building Materials Store Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Building Materials Store. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "building materials store",
        "e-commerce & retail",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 36,
    "name": "Coaching Institute Website",
    "slug": "coaching-institute-website",
    "categoryNumber": 3,
    "categoryName": "Education, Coaching & Training",
    "categorySlug": "education-training",
    "shortDescription": "Enterprise-ready Coaching Institute Website engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Coaching Institute Website is a comprehensive, production-tested software solution purpose-built for Coaching institutes, EdTech startups, schools, universities & corporate L&D departments. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Coaching institutes, EdTech startups, schools, universities & corporate L&D departments",
    "mainFeatures": [
      "Batch Management & Automated Attendance Log",
      "Interactive Course Curriculum & Video Player",
      "Online Examination Engine with Auto-grading",
      "Fee Invoicing, Receipts & Due Reminders",
      "Student & Parent Dedicated Mobile Portals",
      "Digital Certificate Generation with Verification"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Website",
    "platform": "Website",
    "estimatedDevelopmentTime": "1-2 Weeks",
    "indicativeStartingPrice": "₹24,999",
    "indicativePriceUsd": "$349",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1692,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.36@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.36@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.36@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Coaching Institute Website Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Coaching Institute Website. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "coaching institute website",
        "education, coaching & training",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 37,
    "name": "Coaching Management ERP",
    "slug": "coaching-management-erp",
    "categoryNumber": 3,
    "categoryName": "Education, Coaching & Training",
    "categorySlug": "education-training",
    "shortDescription": "Enterprise-ready Coaching Management ERP engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Coaching Management ERP is a comprehensive, production-tested software solution purpose-built for Coaching institutes, EdTech startups, schools, universities & corporate L&D departments. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Coaching institutes, EdTech startups, schools, universities & corporate L&D departments",
    "mainFeatures": [
      "Batch Management & Automated Attendance Log",
      "Interactive Course Curriculum & Video Player",
      "Online Examination Engine with Auto-grading",
      "Fee Invoicing, Receipts & Due Reminders",
      "Student & Parent Dedicated Mobile Portals",
      "Digital Certificate Generation with Verification"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1729,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.37@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.37@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.37@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Coaching Management ERP Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Coaching Management ERP. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "coaching management erp",
        "education, coaching & training",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 38,
    "name": "Online Learning LMS",
    "slug": "online-learning-lms",
    "categoryNumber": 3,
    "categoryName": "Education, Coaching & Training",
    "categorySlug": "education-training",
    "shortDescription": "Enterprise-ready Online Learning LMS engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Online Learning LMS is a comprehensive, production-tested software solution purpose-built for Coaching institutes, EdTech startups, schools, universities & corporate L&D departments. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Coaching institutes, EdTech startups, schools, universities & corporate L&D departments",
    "mainFeatures": [
      "Batch Management & Automated Attendance Log",
      "Interactive Course Curriculum & Video Player",
      "Online Examination Engine with Auto-grading",
      "Fee Invoicing, Receipts & Due Reminders",
      "Student & Parent Dedicated Mobile Portals",
      "Digital Certificate Generation with Verification"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹74,999",
    "indicativePriceUsd": "$1,049",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1766,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.38@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.38@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.38@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Online Learning LMS Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Online Learning LMS. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "online learning lms",
        "education, coaching & training",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 39,
    "name": "School Management ERP",
    "slug": "school-management-erp",
    "categoryNumber": 3,
    "categoryName": "Education, Coaching & Training",
    "categorySlug": "education-training",
    "shortDescription": "Enterprise-ready School Management ERP engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs School Management ERP is a comprehensive, production-tested software solution purpose-built for Coaching institutes, EdTech startups, schools, universities & corporate L&D departments. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Coaching institutes, EdTech startups, schools, universities & corporate L&D departments",
    "mainFeatures": [
      "Batch Management & Automated Attendance Log",
      "Interactive Course Curriculum & Video Player",
      "Online Examination Engine with Auto-grading",
      "Fee Invoicing, Receipts & Due Reminders",
      "Student & Parent Dedicated Mobile Portals",
      "Digital Certificate Generation with Verification"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "5-6 Weeks",
    "indicativeStartingPrice": "₹89,999",
    "indicativePriceUsd": "$1,249",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1803,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.39@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.39@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.39@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "School Management ERP Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of School Management ERP. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "school management erp",
        "education, coaching & training",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 40,
    "name": "College Management System",
    "slug": "college-management-system",
    "categoryNumber": 3,
    "categoryName": "Education, Coaching & Training",
    "categorySlug": "education-training",
    "shortDescription": "Enterprise-ready College Management System engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs College Management System is a comprehensive, production-tested software solution purpose-built for Coaching institutes, EdTech startups, schools, universities & corporate L&D departments. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Coaching institutes, EdTech startups, schools, universities & corporate L&D departments",
    "mainFeatures": [
      "Batch Management & Automated Attendance Log",
      "Interactive Course Curriculum & Video Player",
      "Online Examination Engine with Auto-grading",
      "Fee Invoicing, Receipts & Due Reminders",
      "Student & Parent Dedicated Mobile Portals",
      "Digital Certificate Generation with Verification"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "6-8 Weeks",
    "indicativeStartingPrice": "₹1,19,999",
    "indicativePriceUsd": "$1,699",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1840,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.40@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.40@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.40@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "College Management System Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of College Management System. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "college management system",
        "education, coaching & training",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 41,
    "name": "Tuition Centre Management",
    "slug": "tuition-centre-management",
    "categoryNumber": 3,
    "categoryName": "Education, Coaching & Training",
    "categorySlug": "education-training",
    "shortDescription": "Enterprise-ready Tuition Centre Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Tuition Centre Management is a comprehensive, production-tested software solution purpose-built for Coaching institutes, EdTech startups, schools, universities & corporate L&D departments. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Coaching institutes, EdTech startups, schools, universities & corporate L&D departments",
    "mainFeatures": [
      "Batch Management & Automated Attendance Log",
      "Interactive Course Curriculum & Video Player",
      "Online Examination Engine with Auto-grading",
      "Fee Invoicing, Receipts & Due Reminders",
      "Student & Parent Dedicated Mobile Portals",
      "Digital Certificate Generation with Verification"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹39,999",
    "indicativePriceUsd": "$549",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1877,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.41@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.41@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.41@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Tuition Centre Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Tuition Centre Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "tuition centre management",
        "education, coaching & training",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 42,
    "name": "Test Preparation Platform",
    "slug": "test-preparation-platform",
    "categoryNumber": 3,
    "categoryName": "Education, Coaching & Training",
    "categorySlug": "education-training",
    "shortDescription": "Enterprise-ready Test Preparation Platform engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Test Preparation Platform is a comprehensive, production-tested software solution purpose-built for Coaching institutes, EdTech startups, schools, universities & corporate L&D departments. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Coaching institutes, EdTech startups, schools, universities & corporate L&D departments",
    "mainFeatures": [
      "Batch Management & Automated Attendance Log",
      "Interactive Course Curriculum & Video Player",
      "Online Examination Engine with Auto-grading",
      "Fee Invoicing, Receipts & Due Reminders",
      "Student & Parent Dedicated Mobile Portals",
      "Digital Certificate Generation with Verification"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹59,999",
    "indicativePriceUsd": "$829",
    "availabilityStatus": "Under Development",
    "isAiEnabled": true,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1914,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.42@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.42@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.42@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Test Preparation Platform Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Test Preparation Platform. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "test preparation platform",
        "education, coaching & training",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 43,
    "name": "Online Examination System",
    "slug": "online-examination-system",
    "categoryNumber": 3,
    "categoryName": "Education, Coaching & Training",
    "categorySlug": "education-training",
    "shortDescription": "Enterprise-ready Online Examination System engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Online Examination System is a comprehensive, production-tested software solution purpose-built for Coaching institutes, EdTech startups, schools, universities & corporate L&D departments. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Coaching institutes, EdTech startups, schools, universities & corporate L&D departments",
    "mainFeatures": [
      "Batch Management & Automated Attendance Log",
      "Interactive Course Curriculum & Video Player",
      "Online Examination Engine with Auto-grading",
      "Fee Invoicing, Receipts & Due Reminders",
      "Student & Parent Dedicated Mobile Portals",
      "Digital Certificate Generation with Verification"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹69,999",
    "indicativePriceUsd": "$969",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1951,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.43@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.43@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.43@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Online Examination System Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Online Examination System. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "online examination system",
        "education, coaching & training",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 44,
    "name": "Quiz & Assessment Platform",
    "slug": "quiz-and-assessment-platform",
    "categoryNumber": 3,
    "categoryName": "Education, Coaching & Training",
    "categorySlug": "education-training",
    "shortDescription": "Enterprise-ready Quiz & Assessment Platform engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Quiz & Assessment Platform is a comprehensive, production-tested software solution purpose-built for Coaching institutes, EdTech startups, schools, universities & corporate L&D departments. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Coaching institutes, EdTech startups, schools, universities & corporate L&D departments",
    "mainFeatures": [
      "Batch Management & Automated Attendance Log",
      "Interactive Course Curriculum & Video Player",
      "Online Examination Engine with Auto-grading",
      "Fee Invoicing, Receipts & Due Reminders",
      "Student & Parent Dedicated Mobile Portals",
      "Digital Certificate Generation with Verification"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹44,999",
    "indicativePriceUsd": "$629",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1988,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.44@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.44@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.44@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Quiz & Assessment Platform Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Quiz & Assessment Platform. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "quiz & assessment platform",
        "education, coaching & training",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 45,
    "name": "Language Learning Platform",
    "slug": "language-learning-platform",
    "categoryNumber": 3,
    "categoryName": "Education, Coaching & Training",
    "categorySlug": "education-training",
    "shortDescription": "Enterprise-ready Language Learning Platform engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Language Learning Platform is a comprehensive, production-tested software solution purpose-built for Coaching institutes, EdTech startups, schools, universities & corporate L&D departments. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Coaching institutes, EdTech startups, schools, universities & corporate L&D departments",
    "mainFeatures": [
      "Batch Management & Automated Attendance Log",
      "Interactive Course Curriculum & Video Player",
      "Online Examination Engine with Auto-grading",
      "Fee Invoicing, Receipts & Due Reminders",
      "Student & Parent Dedicated Mobile Portals",
      "Digital Certificate Generation with Verification"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Under Development",
    "isAiEnabled": true,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 2025,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.45@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.45@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.45@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Language Learning Platform Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Language Learning Platform. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "language learning platform",
        "education, coaching & training",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 46,
    "name": "Skill Development Portal",
    "slug": "skill-development-portal",
    "categoryNumber": 3,
    "categoryName": "Education, Coaching & Training",
    "categorySlug": "education-training",
    "shortDescription": "Enterprise-ready Skill Development Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Skill Development Portal is a comprehensive, production-tested software solution purpose-built for Coaching institutes, EdTech startups, schools, universities & corporate L&D departments. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Coaching institutes, EdTech startups, schools, universities & corporate L&D departments",
    "mainFeatures": [
      "Batch Management & Automated Attendance Log",
      "Interactive Course Curriculum & Video Player",
      "Online Examination Engine with Auto-grading",
      "Fee Invoicing, Receipts & Due Reminders",
      "Student & Parent Dedicated Mobile Portals",
      "Digital Certificate Generation with Verification"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1222,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.46@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.46@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.46@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Skill Development Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Skill Development Portal. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "skill development portal",
        "education, coaching & training",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 47,
    "name": "Corporate Training LMS",
    "slug": "corporate-training-lms",
    "categoryNumber": 3,
    "categoryName": "Education, Coaching & Training",
    "categorySlug": "education-training",
    "shortDescription": "Enterprise-ready Corporate Training LMS engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Corporate Training LMS is a comprehensive, production-tested software solution purpose-built for Coaching institutes, EdTech startups, schools, universities & corporate L&D departments. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Coaching institutes, EdTech startups, schools, universities & corporate L&D departments",
    "mainFeatures": [
      "Batch Management & Automated Attendance Log",
      "Interactive Course Curriculum & Video Player",
      "Online Examination Engine with Auto-grading",
      "Fee Invoicing, Receipts & Due Reminders",
      "Student & Parent Dedicated Mobile Portals",
      "Digital Certificate Generation with Verification"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹79,999",
    "indicativePriceUsd": "$1,099",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1259,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.47@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.47@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.47@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Corporate Training LMS Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Corporate Training LMS. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "corporate training lms",
        "education, coaching & training",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 48,
    "name": "Teacher Management Portal",
    "slug": "teacher-management-portal",
    "categoryNumber": 3,
    "categoryName": "Education, Coaching & Training",
    "categorySlug": "education-training",
    "shortDescription": "Enterprise-ready Teacher Management Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Teacher Management Portal is a comprehensive, production-tested software solution purpose-built for Coaching institutes, EdTech startups, schools, universities & corporate L&D departments. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Coaching institutes, EdTech startups, schools, universities & corporate L&D departments",
    "mainFeatures": [
      "Batch Management & Automated Attendance Log",
      "Interactive Course Curriculum & Video Player",
      "Online Examination Engine with Auto-grading",
      "Fee Invoicing, Receipts & Due Reminders",
      "Student & Parent Dedicated Mobile Portals",
      "Digital Certificate Generation with Verification"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹44,999",
    "indicativePriceUsd": "$629",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1296,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.48@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.48@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.48@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Teacher Management Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Teacher Management Portal. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "teacher management portal",
        "education, coaching & training",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 49,
    "name": "Student Counselling Portal",
    "slug": "student-counselling-portal",
    "categoryNumber": 3,
    "categoryName": "Education, Coaching & Training",
    "categorySlug": "education-training",
    "shortDescription": "Enterprise-ready Student Counselling Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Student Counselling Portal is a comprehensive, production-tested software solution purpose-built for Coaching institutes, EdTech startups, schools, universities & corporate L&D departments. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Coaching institutes, EdTech startups, schools, universities & corporate L&D departments",
    "mainFeatures": [
      "Batch Management & Automated Attendance Log",
      "Interactive Course Curriculum & Video Player",
      "Online Examination Engine with Auto-grading",
      "Fee Invoicing, Receipts & Due Reminders",
      "Student & Parent Dedicated Mobile Portals",
      "Digital Certificate Generation with Verification"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹39,999",
    "indicativePriceUsd": "$549",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1333,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.49@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.49@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.49@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Student Counselling Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Student Counselling Portal. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "student counselling portal",
        "education, coaching & training",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 50,
    "name": "Digital Library",
    "slug": "digital-library",
    "categoryNumber": 3,
    "categoryName": "Education, Coaching & Training",
    "categorySlug": "education-training",
    "shortDescription": "Enterprise-ready Digital Library engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Digital Library is a comprehensive, production-tested software solution purpose-built for Coaching institutes, EdTech startups, schools, universities & corporate L&D departments. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Coaching institutes, EdTech startups, schools, universities & corporate L&D departments",
    "mainFeatures": [
      "Batch Management & Automated Attendance Log",
      "Interactive Course Curriculum & Video Player",
      "Online Examination Engine with Auto-grading",
      "Fee Invoicing, Receipts & Due Reminders",
      "Student & Parent Dedicated Mobile Portals",
      "Digital Certificate Generation with Verification"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1370,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.50@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.50@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.50@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Digital Library Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Digital Library. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "digital library",
        "education, coaching & training",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 51,
    "name": "Hospital Website",
    "slug": "hospital-website",
    "categoryNumber": 4,
    "categoryName": "Healthcare & Wellness",
    "categorySlug": "healthcare-wellness",
    "shortDescription": "Enterprise-ready Hospital Website engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Hospital Website is a comprehensive, production-tested software solution purpose-built for Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures",
    "mainFeatures": [
      "Doctor OPD Slot Booking & Smart Calendar",
      "HIPAA-conscious Electronic Health Records (EHR)",
      "Prescription Generator with Drug Interaction Alerts",
      "Diagnostic Test Booking & Digital Lab Reports",
      "Encrypted Telemedicine Video Consultation",
      "Medical Inventory & Pharmacy Dispensation Sync"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Website",
    "platform": "Website",
    "estimatedDevelopmentTime": "1-2 Weeks",
    "indicativeStartingPrice": "₹29,999",
    "indicativePriceUsd": "$419",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1407,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.51@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.51@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.51@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Hospital Website Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Hospital Website. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "hospital website",
        "healthcare & wellness",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 52,
    "name": "Hospital Management ERP",
    "slug": "hospital-management-erp",
    "categoryNumber": 4,
    "categoryName": "Healthcare & Wellness",
    "categorySlug": "healthcare-wellness",
    "shortDescription": "Enterprise-ready Hospital Management ERP engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Hospital Management ERP is a comprehensive, production-tested software solution purpose-built for Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures",
    "mainFeatures": [
      "Doctor OPD Slot Booking & Smart Calendar",
      "HIPAA-conscious Electronic Health Records (EHR)",
      "Prescription Generator with Drug Interaction Alerts",
      "Diagnostic Test Booking & Digital Lab Reports",
      "Encrypted Telemedicine Video Consultation",
      "Medical Inventory & Pharmacy Dispensation Sync"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "6-8 Weeks",
    "indicativeStartingPrice": "₹1,49,999",
    "indicativePriceUsd": "$2,099",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1444,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.52@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.52@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.52@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Hospital Management ERP Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Hospital Management ERP. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "hospital management erp",
        "healthcare & wellness",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 53,
    "name": "Clinic Management",
    "slug": "clinic-management",
    "categoryNumber": 4,
    "categoryName": "Healthcare & Wellness",
    "categorySlug": "healthcare-wellness",
    "shortDescription": "Enterprise-ready Clinic Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Clinic Management is a comprehensive, production-tested software solution purpose-built for Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures",
    "mainFeatures": [
      "Doctor OPD Slot Booking & Smart Calendar",
      "HIPAA-conscious Electronic Health Records (EHR)",
      "Prescription Generator with Drug Interaction Alerts",
      "Diagnostic Test Booking & Digital Lab Reports",
      "Encrypted Telemedicine Video Consultation",
      "Medical Inventory & Pharmacy Dispensation Sync"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹54,999",
    "indicativePriceUsd": "$769",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1481,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.53@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.53@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.53@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Clinic Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Clinic Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "clinic management",
        "healthcare & wellness",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 54,
    "name": "Doctor Appointment App",
    "slug": "doctor-appointment-app",
    "categoryNumber": 4,
    "categoryName": "Healthcare & Wellness",
    "categorySlug": "healthcare-wellness",
    "shortDescription": "Enterprise-ready Doctor Appointment App engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Doctor Appointment App is a comprehensive, production-tested software solution purpose-built for Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures",
    "mainFeatures": [
      "Doctor OPD Slot Booking & Smart Calendar",
      "HIPAA-conscious Electronic Health Records (EHR)",
      "Prescription Generator with Drug Interaction Alerts",
      "Diagnostic Test Booking & Digital Lab Reports",
      "Encrypted Telemedicine Video Consultation",
      "Medical Inventory & Pharmacy Dispensation Sync"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "React Native / Flutter",
      "Next.js Backend",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "WebSockets"
    ],
    "developmentType": "Mobile App",
    "platform": "Mobile App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1518,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.54@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.54@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.54@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Doctor Appointment App Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Doctor Appointment App. Built by StarX Alpha Labs with React Native / Flutter, Next.js Backend, Supabase. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "doctor appointment app",
        "healthcare & wellness",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 55,
    "name": "Diagnostic Lab Portal",
    "slug": "diagnostic-lab-portal",
    "categoryNumber": 4,
    "categoryName": "Healthcare & Wellness",
    "categorySlug": "healthcare-wellness",
    "shortDescription": "Enterprise-ready Diagnostic Lab Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Diagnostic Lab Portal is a comprehensive, production-tested software solution purpose-built for Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures",
    "mainFeatures": [
      "Doctor OPD Slot Booking & Smart Calendar",
      "HIPAA-conscious Electronic Health Records (EHR)",
      "Prescription Generator with Drug Interaction Alerts",
      "Diagnostic Test Booking & Digital Lab Reports",
      "Encrypted Telemedicine Video Consultation",
      "Medical Inventory & Pharmacy Dispensation Sync"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹59,999",
    "indicativePriceUsd": "$829",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1555,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.55@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.55@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.55@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Diagnostic Lab Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Diagnostic Lab Portal. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "diagnostic lab portal",
        "healthcare & wellness",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 56,
    "name": "Pharmacy Management",
    "slug": "pharmacy-management",
    "categoryNumber": 4,
    "categoryName": "Healthcare & Wellness",
    "categorySlug": "healthcare-wellness",
    "shortDescription": "Enterprise-ready Pharmacy Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Pharmacy Management is a comprehensive, production-tested software solution purpose-built for Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures",
    "mainFeatures": [
      "Doctor OPD Slot Booking & Smart Calendar",
      "HIPAA-conscious Electronic Health Records (EHR)",
      "Prescription Generator with Drug Interaction Alerts",
      "Diagnostic Test Booking & Digital Lab Reports",
      "Encrypted Telemedicine Video Consultation",
      "Medical Inventory & Pharmacy Dispensation Sync"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1592,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.56@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.56@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.56@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Pharmacy Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Pharmacy Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "pharmacy management",
        "healthcare & wellness",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 57,
    "name": "Telemedicine Platform",
    "slug": "telemedicine-platform",
    "categoryNumber": 4,
    "categoryName": "Healthcare & Wellness",
    "categorySlug": "healthcare-wellness",
    "shortDescription": "Enterprise-ready Telemedicine Platform engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Telemedicine Platform is a comprehensive, production-tested software solution purpose-built for Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures",
    "mainFeatures": [
      "Doctor OPD Slot Booking & Smart Calendar",
      "HIPAA-conscious Electronic Health Records (EHR)",
      "Prescription Generator with Drug Interaction Alerts",
      "Diagnostic Test Booking & Digital Lab Reports",
      "Encrypted Telemedicine Video Consultation",
      "Medical Inventory & Pharmacy Dispensation Sync"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹89,999",
    "indicativePriceUsd": "$1,249",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1629,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.57@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.57@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.57@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Telemedicine Platform Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Telemedicine Platform. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "telemedicine platform",
        "healthcare & wellness",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 58,
    "name": "Dental Clinic Software",
    "slug": "dental-clinic-software",
    "categoryNumber": 4,
    "categoryName": "Healthcare & Wellness",
    "categorySlug": "healthcare-wellness",
    "shortDescription": "Enterprise-ready Dental Clinic Software engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Dental Clinic Software is a comprehensive, production-tested software solution purpose-built for Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures",
    "mainFeatures": [
      "Doctor OPD Slot Booking & Smart Calendar",
      "HIPAA-conscious Electronic Health Records (EHR)",
      "Prescription Generator with Drug Interaction Alerts",
      "Diagnostic Test Booking & Digital Lab Reports",
      "Encrypted Telemedicine Video Consultation",
      "Medical Inventory & Pharmacy Dispensation Sync"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹44,999",
    "indicativePriceUsd": "$629",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1666,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.58@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.58@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.58@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Dental Clinic Software Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Dental Clinic Software. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "dental clinic software",
        "healthcare & wellness",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 59,
    "name": "Physiotherapy Centre",
    "slug": "physiotherapy-centre",
    "categoryNumber": 4,
    "categoryName": "Healthcare & Wellness",
    "categorySlug": "healthcare-wellness",
    "shortDescription": "Enterprise-ready Physiotherapy Centre engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Physiotherapy Centre is a comprehensive, production-tested software solution purpose-built for Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures",
    "mainFeatures": [
      "Doctor OPD Slot Booking & Smart Calendar",
      "HIPAA-conscious Electronic Health Records (EHR)",
      "Prescription Generator with Drug Interaction Alerts",
      "Diagnostic Test Booking & Digital Lab Reports",
      "Encrypted Telemedicine Video Consultation",
      "Medical Inventory & Pharmacy Dispensation Sync"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹39,999",
    "indicativePriceUsd": "$549",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1703,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.59@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.59@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.59@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Physiotherapy Centre Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Physiotherapy Centre. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "physiotherapy centre",
        "healthcare & wellness",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 60,
    "name": "Fitness & Gym Management",
    "slug": "fitness-and-gym-management",
    "categoryNumber": 4,
    "categoryName": "Healthcare & Wellness",
    "categorySlug": "healthcare-wellness",
    "shortDescription": "Enterprise-ready Fitness & Gym Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Fitness & Gym Management is a comprehensive, production-tested software solution purpose-built for Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures",
    "mainFeatures": [
      "Doctor OPD Slot Booking & Smart Calendar",
      "HIPAA-conscious Electronic Health Records (EHR)",
      "Prescription Generator with Drug Interaction Alerts",
      "Diagnostic Test Booking & Digital Lab Reports",
      "Encrypted Telemedicine Video Consultation",
      "Medical Inventory & Pharmacy Dispensation Sync"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹44,999",
    "indicativePriceUsd": "$629",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1740,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.60@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.60@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.60@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Fitness & Gym Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Fitness & Gym Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "fitness & gym management",
        "healthcare & wellness",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 61,
    "name": "Yoga & Wellness Studio",
    "slug": "yoga-and-wellness-studio",
    "categoryNumber": 4,
    "categoryName": "Healthcare & Wellness",
    "categorySlug": "healthcare-wellness",
    "shortDescription": "Enterprise-ready Yoga & Wellness Studio engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Yoga & Wellness Studio is a comprehensive, production-tested software solution purpose-built for Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures",
    "mainFeatures": [
      "Doctor OPD Slot Booking & Smart Calendar",
      "HIPAA-conscious Electronic Health Records (EHR)",
      "Prescription Generator with Drug Interaction Alerts",
      "Diagnostic Test Booking & Digital Lab Reports",
      "Encrypted Telemedicine Video Consultation",
      "Medical Inventory & Pharmacy Dispensation Sync"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹39,999",
    "indicativePriceUsd": "$549",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1777,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.61@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.61@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.61@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Yoga & Wellness Studio Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Yoga & Wellness Studio. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "yoga & wellness studio",
        "healthcare & wellness",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 62,
    "name": "Nutrition Consultation Portal",
    "slug": "nutrition-consultation-portal",
    "categoryNumber": 4,
    "categoryName": "Healthcare & Wellness",
    "categorySlug": "healthcare-wellness",
    "shortDescription": "Enterprise-ready Nutrition Consultation Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Nutrition Consultation Portal is a comprehensive, production-tested software solution purpose-built for Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures",
    "mainFeatures": [
      "Doctor OPD Slot Booking & Smart Calendar",
      "HIPAA-conscious Electronic Health Records (EHR)",
      "Prescription Generator with Drug Interaction Alerts",
      "Diagnostic Test Booking & Digital Lab Reports",
      "Encrypted Telemedicine Video Consultation",
      "Medical Inventory & Pharmacy Dispensation Sync"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹44,999",
    "indicativePriceUsd": "$629",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1814,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.62@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.62@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.62@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Nutrition Consultation Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Nutrition Consultation Portal. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "nutrition consultation portal",
        "healthcare & wellness",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 63,
    "name": "Salon & Spa Management",
    "slug": "salon-and-spa-management",
    "categoryNumber": 4,
    "categoryName": "Healthcare & Wellness",
    "categorySlug": "healthcare-wellness",
    "shortDescription": "Enterprise-ready Salon & Spa Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Salon & Spa Management is a comprehensive, production-tested software solution purpose-built for Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures",
    "mainFeatures": [
      "Doctor OPD Slot Booking & Smart Calendar",
      "HIPAA-conscious Electronic Health Records (EHR)",
      "Prescription Generator with Drug Interaction Alerts",
      "Diagnostic Test Booking & Digital Lab Reports",
      "Encrypted Telemedicine Video Consultation",
      "Medical Inventory & Pharmacy Dispensation Sync"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹42,999",
    "indicativePriceUsd": "$599",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1851,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.63@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.63@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.63@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Salon & Spa Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Salon & Spa Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "salon & spa management",
        "healthcare & wellness",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 64,
    "name": "Medical Inventory System",
    "slug": "medical-inventory-system",
    "categoryNumber": 4,
    "categoryName": "Healthcare & Wellness",
    "categorySlug": "healthcare-wellness",
    "shortDescription": "Enterprise-ready Medical Inventory System engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Medical Inventory System is a comprehensive, production-tested software solution purpose-built for Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures",
    "mainFeatures": [
      "Doctor OPD Slot Booking & Smart Calendar",
      "HIPAA-conscious Electronic Health Records (EHR)",
      "Prescription Generator with Drug Interaction Alerts",
      "Diagnostic Test Booking & Digital Lab Reports",
      "Encrypted Telemedicine Video Consultation",
      "Medical Inventory & Pharmacy Dispensation Sync"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1888,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.64@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.64@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.64@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Medical Inventory System Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Medical Inventory System. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "medical inventory system",
        "healthcare & wellness",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 65,
    "name": "Patient Portal",
    "slug": "patient-portal",
    "categoryNumber": 4,
    "categoryName": "Healthcare & Wellness",
    "categorySlug": "healthcare-wellness",
    "shortDescription": "Enterprise-ready Patient Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Patient Portal is a comprehensive, production-tested software solution purpose-built for Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Private clinics, hospitals, diagnostic labs, therapy centers & telemedicine ventures",
    "mainFeatures": [
      "Doctor OPD Slot Booking & Smart Calendar",
      "HIPAA-conscious Electronic Health Records (EHR)",
      "Prescription Generator with Drug Interaction Alerts",
      "Diagnostic Test Booking & Digital Lab Reports",
      "Encrypted Telemedicine Video Consultation",
      "Medical Inventory & Pharmacy Dispensation Sync"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1925,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.65@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.65@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.65@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Patient Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Patient Portal. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "patient portal",
        "healthcare & wellness",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 66,
    "name": "CRM Software",
    "slug": "crm-software",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready CRM Software engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs CRM Software is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹69,999",
    "indicativePriceUsd": "$969",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1962,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.66@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.66@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.66@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "CRM Software Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of CRM Software. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "crm software",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 67,
    "name": "ERP Software",
    "slug": "erp-software",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready ERP Software engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs ERP Software is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "6-8 Weeks",
    "indicativeStartingPrice": "₹1,29,999",
    "indicativePriceUsd": "$1,799",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1999,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.67@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.67@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.67@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "ERP Software Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of ERP Software. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "erp software",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 68,
    "name": "Billing & Invoicing",
    "slug": "billing-and-invoicing",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Billing & Invoicing engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Billing & Invoicing is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹39,999",
    "indicativePriceUsd": "$549",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 2036,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.68@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.68@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.68@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Billing & Invoicing Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Billing & Invoicing. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "billing & invoicing",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 69,
    "name": "Inventory Management",
    "slug": "inventory-management",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Inventory Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Inventory Management is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹54,999",
    "indicativePriceUsd": "$769",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1233,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.69@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.69@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.69@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Inventory Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Inventory Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "inventory management",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 70,
    "name": "HR & Payroll",
    "slug": "hr-and-payroll",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready HR & Payroll engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs HR & Payroll is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4 Weeks",
    "indicativeStartingPrice": "₹74,999",
    "indicativePriceUsd": "$1,049",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1270,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.70@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.70@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.70@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "HR & Payroll Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of HR & Payroll. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "hr & payroll",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 71,
    "name": "Attendance Management",
    "slug": "attendance-management",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Attendance Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Attendance Management is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹39,999",
    "indicativePriceUsd": "$549",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1307,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.71@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.71@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.71@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Attendance Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Attendance Management. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "attendance management",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 72,
    "name": "Project Management",
    "slug": "project-management",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Project Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Project Management is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹59,999",
    "indicativePriceUsd": "$829",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1344,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.72@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.72@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.72@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Project Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Project Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "project management",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 73,
    "name": "Task Management",
    "slug": "task-management",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Task Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Task Management is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹34,999",
    "indicativePriceUsd": "$489",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1381,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.73@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.73@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.73@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Task Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Task Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "task management",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 74,
    "name": "Sales Management",
    "slug": "sales-management",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Sales Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Sales Management is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹54,999",
    "indicativePriceUsd": "$769",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1418,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.74@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.74@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.74@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Sales Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Sales Management. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "sales management",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 75,
    "name": "Purchase Management",
    "slug": "purchase-management",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Purchase Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Purchase Management is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹54,999",
    "indicativePriceUsd": "$769",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1455,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.75@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.75@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.75@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Purchase Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Purchase Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "purchase management",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 76,
    "name": "Accounting Dashboard",
    "slug": "accounting-dashboard",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Accounting Dashboard engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Accounting Dashboard is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1492,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.76@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.76@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.76@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Accounting Dashboard Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Accounting Dashboard. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "accounting dashboard",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 77,
    "name": "Warehouse Management",
    "slug": "warehouse-management",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Warehouse Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Warehouse Management is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹84,999",
    "indicativePriceUsd": "$1,189",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1529,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.77@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.77@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.77@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Warehouse Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Warehouse Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "warehouse management",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 78,
    "name": "Franchise Management",
    "slug": "franchise-management",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Franchise Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Franchise Management is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹89,999",
    "indicativePriceUsd": "$1,249",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1566,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.78@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.78@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.78@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Franchise Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Franchise Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "franchise management",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 79,
    "name": "Distributor Management",
    "slug": "distributor-management",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Distributor Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Distributor Management is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4 Weeks",
    "indicativeStartingPrice": "₹79,999",
    "indicativePriceUsd": "$1,099",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1603,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.79@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.79@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.79@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Distributor Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Distributor Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "distributor management",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 80,
    "name": "Field Staff Management",
    "slug": "field-staff-management",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Field Staff Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Field Staff Management is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "React Native / Flutter",
      "Next.js Backend",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "WebSockets"
    ],
    "developmentType": "Mobile App",
    "platform": "Mobile App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹69,999",
    "indicativePriceUsd": "$969",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1640,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.80@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.80@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.80@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Field Staff Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Field Staff Management. Built by StarX Alpha Labs with React Native / Flutter, Next.js Backend, Supabase. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "field staff management",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 81,
    "name": "Customer Support CRM",
    "slug": "customer-support-crm",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Customer Support CRM engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Customer Support CRM is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹59,999",
    "indicativePriceUsd": "$829",
    "availabilityStatus": "Under Development",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1677,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.81@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.81@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.81@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Customer Support CRM Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Customer Support CRM. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "customer support crm",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 82,
    "name": "Document Management",
    "slug": "document-management",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Document Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Document Management is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1714,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.82@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.82@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.82@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Document Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Document Management. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "document management",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 83,
    "name": "Subscription Management",
    "slug": "subscription-management",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Subscription Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Subscription Management is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1751,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.83@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.83@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.83@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Subscription Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Subscription Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "subscription management",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 84,
    "name": "Appointment Management",
    "slug": "appointment-management",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Appointment Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Appointment Management is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹39,999",
    "indicativePriceUsd": "$549",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1788,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.84@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.84@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.84@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Appointment Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Appointment Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "appointment management",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 85,
    "name": "Business Analytics",
    "slug": "business-analytics",
    "categoryNumber": 5,
    "categoryName": "Business, CRM & Enterprise",
    "categorySlug": "business-crm",
    "shortDescription": "Enterprise-ready Business Analytics engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Business Analytics is a comprehensive, production-tested software solution purpose-built for Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Fast-growing SMBs, enterprise corporations, trading agencies & field operations teams",
    "mainFeatures": [
      "Visual Drag-and-Drop Deal Kanban Pipeline",
      "GST-Compliant Automated Invoicing Engine",
      "Staff Attendance, Geofencing & Leave Approval",
      "Multi-warehouse Inventory & Reorder Thresholds",
      "Customer Interaction Timeline & Email Sync",
      "Role-based Granular Permission Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹79,999",
    "indicativePriceUsd": "$1,099",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1825,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.85@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.85@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.85@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Business Analytics Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Business Analytics. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "business analytics",
        "business, crm & enterprise",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 86,
    "name": "Real Estate Website",
    "slug": "real-estate-website",
    "categoryNumber": 6,
    "categoryName": "Real Estate, Construction & Hospitality",
    "categorySlug": "real-estate-hospitality",
    "shortDescription": "Enterprise-ready Real Estate Website engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Real Estate Website is a comprehensive, production-tested software solution purpose-built for Real estate builders, brokerage firms, hotel chains, fleet operators & event planners. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Real estate builders, brokerage firms, hotel chains, fleet operators & event planners",
    "mainFeatures": [
      "Interactive Property Map & 3D Virtual Tours",
      "Lead Capture & Smart Broker Attribution",
      "Site Material Tracking & Milestone Budgeting",
      "Channel Manager for OTA Room Sync",
      "Automated Rental Lease Agreements & Signatures",
      "Fleet Telematics & Vehicle Availability Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Website",
    "platform": "Website",
    "estimatedDevelopmentTime": "1-2 Weeks",
    "indicativeStartingPrice": "₹29,999",
    "indicativePriceUsd": "$419",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1862,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.86@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.86@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.86@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Real Estate Website Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Real Estate Website. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "real estate website",
        "real estate, construction & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 87,
    "name": "Real Estate CRM",
    "slug": "real-estate-crm",
    "categoryNumber": 6,
    "categoryName": "Real Estate, Construction & Hospitality",
    "categorySlug": "real-estate-hospitality",
    "shortDescription": "Enterprise-ready Real Estate CRM engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Real Estate CRM is a comprehensive, production-tested software solution purpose-built for Real estate builders, brokerage firms, hotel chains, fleet operators & event planners. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Real estate builders, brokerage firms, hotel chains, fleet operators & event planners",
    "mainFeatures": [
      "Interactive Property Map & 3D Virtual Tours",
      "Lead Capture & Smart Broker Attribution",
      "Site Material Tracking & Milestone Budgeting",
      "Channel Manager for OTA Room Sync",
      "Automated Rental Lease Agreements & Signatures",
      "Fleet Telematics & Vehicle Availability Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹74,999",
    "indicativePriceUsd": "$1,049",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1899,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.87@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.87@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.87@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Real Estate CRM Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Real Estate CRM. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "real estate crm",
        "real estate, construction & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 88,
    "name": "Construction Management",
    "slug": "construction-management",
    "categoryNumber": 6,
    "categoryName": "Real Estate, Construction & Hospitality",
    "categorySlug": "real-estate-hospitality",
    "shortDescription": "Enterprise-ready Construction Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Construction Management is a comprehensive, production-tested software solution purpose-built for Real estate builders, brokerage firms, hotel chains, fleet operators & event planners. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Real estate builders, brokerage firms, hotel chains, fleet operators & event planners",
    "mainFeatures": [
      "Interactive Property Map & 3D Virtual Tours",
      "Lead Capture & Smart Broker Attribution",
      "Site Material Tracking & Milestone Budgeting",
      "Channel Manager for OTA Room Sync",
      "Automated Rental Lease Agreements & Signatures",
      "Fleet Telematics & Vehicle Availability Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹89,999",
    "indicativePriceUsd": "$1,249",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1936,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.88@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.88@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.88@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Construction Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Construction Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "construction management",
        "real estate, construction & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 89,
    "name": "Architecture Studio",
    "slug": "architecture-studio",
    "categoryNumber": 6,
    "categoryName": "Real Estate, Construction & Hospitality",
    "categorySlug": "real-estate-hospitality",
    "shortDescription": "Enterprise-ready Architecture Studio engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Architecture Studio is a comprehensive, production-tested software solution purpose-built for Real estate builders, brokerage firms, hotel chains, fleet operators & event planners. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Real estate builders, brokerage firms, hotel chains, fleet operators & event planners",
    "mainFeatures": [
      "Interactive Property Map & 3D Virtual Tours",
      "Lead Capture & Smart Broker Attribution",
      "Site Material Tracking & Milestone Budgeting",
      "Channel Manager for OTA Room Sync",
      "Automated Rental Lease Agreements & Signatures",
      "Fleet Telematics & Vehicle Availability Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Website",
    "platform": "Website",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹34,999",
    "indicativePriceUsd": "$489",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1973,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.89@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.89@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.89@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Architecture Studio Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Architecture Studio. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "architecture studio",
        "real estate, construction & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 90,
    "name": "Interior Design Website",
    "slug": "interior-design-website",
    "categoryNumber": 6,
    "categoryName": "Real Estate, Construction & Hospitality",
    "categorySlug": "real-estate-hospitality",
    "shortDescription": "Enterprise-ready Interior Design Website engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Interior Design Website is a comprehensive, production-tested software solution purpose-built for Real estate builders, brokerage firms, hotel chains, fleet operators & event planners. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Real estate builders, brokerage firms, hotel chains, fleet operators & event planners",
    "mainFeatures": [
      "Interactive Property Map & 3D Virtual Tours",
      "Lead Capture & Smart Broker Attribution",
      "Site Material Tracking & Milestone Budgeting",
      "Channel Manager for OTA Room Sync",
      "Automated Rental Lease Agreements & Signatures",
      "Fleet Telematics & Vehicle Availability Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Website",
    "platform": "Website",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹34,999",
    "indicativePriceUsd": "$489",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 2010,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.90@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.90@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.90@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Interior Design Website Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Interior Design Website. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "interior design website",
        "real estate, construction & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 91,
    "name": "Travel Agency",
    "slug": "travel-agency",
    "categoryNumber": 6,
    "categoryName": "Real Estate, Construction & Hospitality",
    "categorySlug": "real-estate-hospitality",
    "shortDescription": "Enterprise-ready Travel Agency engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Travel Agency is a comprehensive, production-tested software solution purpose-built for Real estate builders, brokerage firms, hotel chains, fleet operators & event planners. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Real estate builders, brokerage firms, hotel chains, fleet operators & event planners",
    "mainFeatures": [
      "Interactive Property Map & 3D Virtual Tours",
      "Lead Capture & Smart Broker Attribution",
      "Site Material Tracking & Milestone Budgeting",
      "Channel Manager for OTA Room Sync",
      "Automated Rental Lease Agreements & Signatures",
      "Fleet Telematics & Vehicle Availability Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1207,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.91@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.91@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.91@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Travel Agency Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Travel Agency. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "travel agency",
        "real estate, construction & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 92,
    "name": "Hotel Booking Website",
    "slug": "hotel-booking-website",
    "categoryNumber": 6,
    "categoryName": "Real Estate, Construction & Hospitality",
    "categorySlug": "real-estate-hospitality",
    "shortDescription": "Enterprise-ready Hotel Booking Website engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Hotel Booking Website is a comprehensive, production-tested software solution purpose-built for Real estate builders, brokerage firms, hotel chains, fleet operators & event planners. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Real estate builders, brokerage firms, hotel chains, fleet operators & event planners",
    "mainFeatures": [
      "Interactive Property Map & 3D Virtual Tours",
      "Lead Capture & Smart Broker Attribution",
      "Site Material Tracking & Milestone Budgeting",
      "Channel Manager for OTA Room Sync",
      "Automated Rental Lease Agreements & Signatures",
      "Fleet Telematics & Vehicle Availability Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1244,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.92@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.92@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.92@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Hotel Booking Website Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Hotel Booking Website. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "hotel booking website",
        "real estate, construction & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 93,
    "name": "Car Rental System",
    "slug": "car-rental-system",
    "categoryNumber": 6,
    "categoryName": "Real Estate, Construction & Hospitality",
    "categorySlug": "real-estate-hospitality",
    "shortDescription": "Enterprise-ready Car Rental System engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Car Rental System is a comprehensive, production-tested software solution purpose-built for Real estate builders, brokerage firms, hotel chains, fleet operators & event planners. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Real estate builders, brokerage firms, hotel chains, fleet operators & event planners",
    "mainFeatures": [
      "Interactive Property Map & 3D Virtual Tours",
      "Lead Capture & Smart Broker Attribution",
      "Site Material Tracking & Milestone Budgeting",
      "Channel Manager for OTA Room Sync",
      "Automated Rental Lease Agreements & Signatures",
      "Fleet Telematics & Vehicle Availability Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹59,999",
    "indicativePriceUsd": "$829",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1281,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.93@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.93@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.93@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Car Rental System Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Car Rental System. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "car rental system",
        "real estate, construction & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 94,
    "name": "Taxi Booking App",
    "slug": "taxi-booking-app",
    "categoryNumber": 6,
    "categoryName": "Real Estate, Construction & Hospitality",
    "categorySlug": "real-estate-hospitality",
    "shortDescription": "Enterprise-ready Taxi Booking App engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Taxi Booking App is a comprehensive, production-tested software solution purpose-built for Real estate builders, brokerage firms, hotel chains, fleet operators & event planners. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Real estate builders, brokerage firms, hotel chains, fleet operators & event planners",
    "mainFeatures": [
      "Interactive Property Map & 3D Virtual Tours",
      "Lead Capture & Smart Broker Attribution",
      "Site Material Tracking & Milestone Budgeting",
      "Channel Manager for OTA Room Sync",
      "Automated Rental Lease Agreements & Signatures",
      "Fleet Telematics & Vehicle Availability Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "React Native / Flutter",
      "Next.js Backend",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "WebSockets"
    ],
    "developmentType": "Mobile App",
    "platform": "Mobile App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹84,999",
    "indicativePriceUsd": "$1,189",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1318,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.94@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.94@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.94@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Taxi Booking App Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Taxi Booking App. Built by StarX Alpha Labs with React Native / Flutter, Next.js Backend, Supabase. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "taxi booking app",
        "real estate, construction & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 95,
    "name": "Logistics Management",
    "slug": "logistics-management",
    "categoryNumber": 6,
    "categoryName": "Real Estate, Construction & Hospitality",
    "categorySlug": "real-estate-hospitality",
    "shortDescription": "Enterprise-ready Logistics Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Logistics Management is a comprehensive, production-tested software solution purpose-built for Real estate builders, brokerage firms, hotel chains, fleet operators & event planners. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Real estate builders, brokerage firms, hotel chains, fleet operators & event planners",
    "mainFeatures": [
      "Interactive Property Map & 3D Virtual Tours",
      "Lead Capture & Smart Broker Attribution",
      "Site Material Tracking & Milestone Budgeting",
      "Channel Manager for OTA Room Sync",
      "Automated Rental Lease Agreements & Signatures",
      "Fleet Telematics & Vehicle Availability Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-6 Weeks",
    "indicativeStartingPrice": "₹94,999",
    "indicativePriceUsd": "$1,319",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1355,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.95@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.95@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.95@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Logistics Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Logistics Management. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "logistics management",
        "real estate, construction & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 96,
    "name": "Courier Management",
    "slug": "courier-management",
    "categoryNumber": 6,
    "categoryName": "Real Estate, Construction & Hospitality",
    "categorySlug": "real-estate-hospitality",
    "shortDescription": "Enterprise-ready Courier Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Courier Management is a comprehensive, production-tested software solution purpose-built for Real estate builders, brokerage firms, hotel chains, fleet operators & event planners. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Real estate builders, brokerage firms, hotel chains, fleet operators & event planners",
    "mainFeatures": [
      "Interactive Property Map & 3D Virtual Tours",
      "Lead Capture & Smart Broker Attribution",
      "Site Material Tracking & Milestone Budgeting",
      "Channel Manager for OTA Room Sync",
      "Automated Rental Lease Agreements & Signatures",
      "Fleet Telematics & Vehicle Availability Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹74,999",
    "indicativePriceUsd": "$1,049",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1392,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.96@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.96@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.96@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Courier Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Courier Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "courier management",
        "real estate, construction & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 97,
    "name": "Event Management",
    "slug": "event-management",
    "categoryNumber": 6,
    "categoryName": "Real Estate, Construction & Hospitality",
    "categorySlug": "real-estate-hospitality",
    "shortDescription": "Enterprise-ready Event Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Event Management is a comprehensive, production-tested software solution purpose-built for Real estate builders, brokerage firms, hotel chains, fleet operators & event planners. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Real estate builders, brokerage firms, hotel chains, fleet operators & event planners",
    "mainFeatures": [
      "Interactive Property Map & 3D Virtual Tours",
      "Lead Capture & Smart Broker Attribution",
      "Site Material Tracking & Milestone Budgeting",
      "Channel Manager for OTA Room Sync",
      "Automated Rental Lease Agreements & Signatures",
      "Fleet Telematics & Vehicle Availability Matrix"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1429,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.97@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.97@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.97@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Event Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Event Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "event management",
        "real estate, construction & hospitality",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 98,
    "name": "Repair & Service Management",
    "slug": "repair-and-service-management",
    "categoryNumber": 7,
    "categoryName": "Professional & Local Services",
    "categorySlug": "professional-services",
    "shortDescription": "Enterprise-ready Repair & Service Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Repair & Service Management is a comprehensive, production-tested software solution purpose-built for Service contractors, law firms, CA practices, creative studios & consulting agencies. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Service contractors, law firms, CA practices, creative studios & consulting agencies",
    "mainFeatures": [
      "Real-time Technician Scheduling & GPS Dispatch",
      "Service Job Sheets with Before/After Photos",
      "Client Document Vault with Bank-grade Encryption",
      "Retainer & Hourly Billing Calculator",
      "Applicant Tracking System (ATS) with Resume Parser",
      "Automated Review Collection & SMS Notifications"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1466,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.98@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.98@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.98@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Repair & Service Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Repair & Service Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "repair & service management",
        "professional & local services",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 99,
    "name": "Cleaning Service Portal",
    "slug": "cleaning-service-portal",
    "categoryNumber": 7,
    "categoryName": "Professional & Local Services",
    "categorySlug": "professional-services",
    "shortDescription": "Enterprise-ready Cleaning Service Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Cleaning Service Portal is a comprehensive, production-tested software solution purpose-built for Service contractors, law firms, CA practices, creative studios & consulting agencies. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Service contractors, law firms, CA practices, creative studios & consulting agencies",
    "mainFeatures": [
      "Real-time Technician Scheduling & GPS Dispatch",
      "Service Job Sheets with Before/After Photos",
      "Client Document Vault with Bank-grade Encryption",
      "Retainer & Hourly Billing Calculator",
      "Applicant Tracking System (ATS) with Resume Parser",
      "Automated Review Collection & SMS Notifications"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹42,999",
    "indicativePriceUsd": "$599",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1503,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.99@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.99@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.99@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Cleaning Service Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Cleaning Service Portal. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "cleaning service portal",
        "professional & local services",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 100,
    "name": "Wedding Planner Portal",
    "slug": "wedding-planner-portal",
    "categoryNumber": 7,
    "categoryName": "Professional & Local Services",
    "categorySlug": "professional-services",
    "shortDescription": "Enterprise-ready Wedding Planner Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Wedding Planner Portal is a comprehensive, production-tested software solution purpose-built for Service contractors, law firms, CA practices, creative studios & consulting agencies. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Service contractors, law firms, CA practices, creative studios & consulting agencies",
    "mainFeatures": [
      "Real-time Technician Scheduling & GPS Dispatch",
      "Service Job Sheets with Before/After Photos",
      "Client Document Vault with Bank-grade Encryption",
      "Retainer & Hourly Billing Calculator",
      "Applicant Tracking System (ATS) with Resume Parser",
      "Automated Review Collection & SMS Notifications"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹44,999",
    "indicativePriceUsd": "$629",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1540,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.100@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.100@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.100@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Wedding Planner Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Wedding Planner Portal. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "wedding planner portal",
        "professional & local services",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 101,
    "name": "Photography Studio",
    "slug": "photography-studio",
    "categoryNumber": 7,
    "categoryName": "Professional & Local Services",
    "categorySlug": "professional-services",
    "shortDescription": "Enterprise-ready Photography Studio engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Photography Studio is a comprehensive, production-tested software solution purpose-built for Service contractors, law firms, CA practices, creative studios & consulting agencies. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Service contractors, law firms, CA practices, creative studios & consulting agencies",
    "mainFeatures": [
      "Real-time Technician Scheduling & GPS Dispatch",
      "Service Job Sheets with Before/After Photos",
      "Client Document Vault with Bank-grade Encryption",
      "Retainer & Hourly Billing Calculator",
      "Applicant Tracking System (ATS) with Resume Parser",
      "Automated Review Collection & SMS Notifications"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Website",
    "platform": "Website",
    "estimatedDevelopmentTime": "1-2 Weeks",
    "indicativeStartingPrice": "₹29,999",
    "indicativePriceUsd": "$419",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1577,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.101@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.101@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.101@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Photography Studio Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Photography Studio. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "photography studio",
        "professional & local services",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 102,
    "name": "Legal Firm Website",
    "slug": "legal-firm-website",
    "categoryNumber": 7,
    "categoryName": "Professional & Local Services",
    "categorySlug": "professional-services",
    "shortDescription": "Enterprise-ready Legal Firm Website engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Legal Firm Website is a comprehensive, production-tested software solution purpose-built for Service contractors, law firms, CA practices, creative studios & consulting agencies. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Service contractors, law firms, CA practices, creative studios & consulting agencies",
    "mainFeatures": [
      "Real-time Technician Scheduling & GPS Dispatch",
      "Service Job Sheets with Before/After Photos",
      "Client Document Vault with Bank-grade Encryption",
      "Retainer & Hourly Billing Calculator",
      "Applicant Tracking System (ATS) with Resume Parser",
      "Automated Review Collection & SMS Notifications"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Website",
    "platform": "Website",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹34,999",
    "indicativePriceUsd": "$489",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1614,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.102@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.102@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.102@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Legal Firm Website Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Legal Firm Website. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "legal firm website",
        "professional & local services",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 103,
    "name": "CA & Accounting Firm",
    "slug": "ca-and-accounting-firm",
    "categoryNumber": 7,
    "categoryName": "Professional & Local Services",
    "categorySlug": "professional-services",
    "shortDescription": "Enterprise-ready CA & Accounting Firm engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs CA & Accounting Firm is a comprehensive, production-tested software solution purpose-built for Service contractors, law firms, CA practices, creative studios & consulting agencies. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Service contractors, law firms, CA practices, creative studios & consulting agencies",
    "mainFeatures": [
      "Real-time Technician Scheduling & GPS Dispatch",
      "Service Job Sheets with Before/After Photos",
      "Client Document Vault with Bank-grade Encryption",
      "Retainer & Hourly Billing Calculator",
      "Applicant Tracking System (ATS) with Resume Parser",
      "Automated Review Collection & SMS Notifications"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹44,999",
    "indicativePriceUsd": "$629",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1651,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.103@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.103@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.103@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "CA & Accounting Firm Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of CA & Accounting Firm. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "ca & accounting firm",
        "professional & local services",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 104,
    "name": "Insurance Agency CRM",
    "slug": "insurance-agency-crm",
    "categoryNumber": 7,
    "categoryName": "Professional & Local Services",
    "categorySlug": "professional-services",
    "shortDescription": "Enterprise-ready Insurance Agency CRM engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Insurance Agency CRM is a comprehensive, production-tested software solution purpose-built for Service contractors, law firms, CA practices, creative studios & consulting agencies. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Service contractors, law firms, CA practices, creative studios & consulting agencies",
    "mainFeatures": [
      "Real-time Technician Scheduling & GPS Dispatch",
      "Service Job Sheets with Before/After Photos",
      "Client Document Vault with Bank-grade Encryption",
      "Retainer & Hourly Billing Calculator",
      "Applicant Tracking System (ATS) with Resume Parser",
      "Automated Review Collection & SMS Notifications"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1688,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.104@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.104@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.104@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Insurance Agency CRM Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Insurance Agency CRM. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "insurance agency crm",
        "professional & local services",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 105,
    "name": "Recruitment & Job Portal",
    "slug": "recruitment-and-job-portal",
    "categoryNumber": 7,
    "categoryName": "Professional & Local Services",
    "categorySlug": "professional-services",
    "shortDescription": "Enterprise-ready Recruitment & Job Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Recruitment & Job Portal is a comprehensive, production-tested software solution purpose-built for Service contractors, law firms, CA practices, creative studios & consulting agencies. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Service contractors, law firms, CA practices, creative studios & consulting agencies",
    "mainFeatures": [
      "Real-time Technician Scheduling & GPS Dispatch",
      "Service Job Sheets with Before/After Photos",
      "Client Document Vault with Bank-grade Encryption",
      "Retainer & Hourly Billing Calculator",
      "Applicant Tracking System (ATS) with Resume Parser",
      "Automated Review Collection & SMS Notifications"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹69,999",
    "indicativePriceUsd": "$969",
    "availabilityStatus": "Under Development",
    "isAiEnabled": true,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1725,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.105@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.105@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.105@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Recruitment & Job Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Recruitment & Job Portal. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "recruitment & job portal",
        "professional & local services",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 106,
    "name": "Freelance Marketplace",
    "slug": "freelance-marketplace",
    "categoryNumber": 7,
    "categoryName": "Professional & Local Services",
    "categorySlug": "professional-services",
    "shortDescription": "Enterprise-ready Freelance Marketplace engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Freelance Marketplace is a comprehensive, production-tested software solution purpose-built for Service contractors, law firms, CA practices, creative studios & consulting agencies. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Service contractors, law firms, CA practices, creative studios & consulting agencies",
    "mainFeatures": [
      "Real-time Technician Scheduling & GPS Dispatch",
      "Service Job Sheets with Before/After Photos",
      "Client Document Vault with Bank-grade Encryption",
      "Retainer & Hourly Billing Calculator",
      "Applicant Tracking System (ATS) with Resume Parser",
      "Automated Review Collection & SMS Notifications"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹89,999",
    "indicativePriceUsd": "$1,249",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1762,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.106@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.106@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.106@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Freelance Marketplace Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Freelance Marketplace. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "freelance marketplace",
        "professional & local services",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 107,
    "name": "Laundry Management",
    "slug": "laundry-management",
    "categoryNumber": 7,
    "categoryName": "Professional & Local Services",
    "categorySlug": "professional-services",
    "shortDescription": "Enterprise-ready Laundry Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Laundry Management is a comprehensive, production-tested software solution purpose-built for Service contractors, law firms, CA practices, creative studios & consulting agencies. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Service contractors, law firms, CA practices, creative studios & consulting agencies",
    "mainFeatures": [
      "Real-time Technician Scheduling & GPS Dispatch",
      "Service Job Sheets with Before/After Photos",
      "Client Document Vault with Bank-grade Encryption",
      "Retainer & Hourly Billing Calculator",
      "Applicant Tracking System (ATS) with Resume Parser",
      "Automated Review Collection & SMS Notifications"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹39,999",
    "indicativePriceUsd": "$549",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1799,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.107@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.107@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.107@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Laundry Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Laundry Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "laundry management",
        "professional & local services",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 108,
    "name": "Security Agency Management",
    "slug": "security-agency-management",
    "categoryNumber": 7,
    "categoryName": "Professional & Local Services",
    "categorySlug": "professional-services",
    "shortDescription": "Enterprise-ready Security Agency Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Security Agency Management is a comprehensive, production-tested software solution purpose-built for Service contractors, law firms, CA practices, creative studios & consulting agencies. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Service contractors, law firms, CA practices, creative studios & consulting agencies",
    "mainFeatures": [
      "Real-time Technician Scheduling & GPS Dispatch",
      "Service Job Sheets with Before/After Photos",
      "Client Document Vault with Bank-grade Encryption",
      "Retainer & Hourly Billing Calculator",
      "Applicant Tracking System (ATS) with Resume Parser",
      "Automated Review Collection & SMS Notifications"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹59,999",
    "indicativePriceUsd": "$829",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1836,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.108@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.108@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.108@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Security Agency Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Security Agency Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "security agency management",
        "professional & local services",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 109,
    "name": "Pest Control Booking",
    "slug": "pest-control-booking",
    "categoryNumber": 7,
    "categoryName": "Professional & Local Services",
    "categorySlug": "professional-services",
    "shortDescription": "Enterprise-ready Pest Control Booking engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Pest Control Booking is a comprehensive, production-tested software solution purpose-built for Service contractors, law firms, CA practices, creative studios & consulting agencies. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Service contractors, law firms, CA practices, creative studios & consulting agencies",
    "mainFeatures": [
      "Real-time Technician Scheduling & GPS Dispatch",
      "Service Job Sheets with Before/After Photos",
      "Client Document Vault with Bank-grade Encryption",
      "Retainer & Hourly Billing Calculator",
      "Applicant Tracking System (ATS) with Resume Parser",
      "Automated Review Collection & SMS Notifications"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹39,999",
    "indicativePriceUsd": "$549",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1873,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.109@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.109@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.109@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Pest Control Booking Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Pest Control Booking. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "pest control booking",
        "professional & local services",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 110,
    "name": "Coaching & Consultancy CRM",
    "slug": "coaching-and-consultancy-crm",
    "categoryNumber": 7,
    "categoryName": "Professional & Local Services",
    "categorySlug": "professional-services",
    "shortDescription": "Enterprise-ready Coaching & Consultancy CRM engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Coaching & Consultancy CRM is a comprehensive, production-tested software solution purpose-built for Service contractors, law firms, CA practices, creative studios & consulting agencies. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Service contractors, law firms, CA practices, creative studios & consulting agencies",
    "mainFeatures": [
      "Real-time Technician Scheduling & GPS Dispatch",
      "Service Job Sheets with Before/After Photos",
      "Client Document Vault with Bank-grade Encryption",
      "Retainer & Hourly Billing Calculator",
      "Applicant Tracking System (ATS) with Resume Parser",
      "Automated Review Collection & SMS Notifications"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹54,999",
    "indicativePriceUsd": "$769",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1910,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.110@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.110@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.110@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Coaching & Consultancy CRM Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Coaching & Consultancy CRM. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "coaching & consultancy crm",
        "professional & local services",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 111,
    "name": "Manufacturing ERP",
    "slug": "manufacturing-erp",
    "categoryNumber": 8,
    "categoryName": "Manufacturing, Industrial & Wholesale",
    "categorySlug": "manufacturing-industrial",
    "shortDescription": "Enterprise-ready Manufacturing ERP engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Manufacturing ERP is a comprehensive, production-tested software solution purpose-built for Industrial factories, manufacturing plants, wholesale distributors & procurement desks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Industrial factories, manufacturing plants, wholesale distributors & procurement desks",
    "mainFeatures": [
      "Multi-level Bill of Materials (BOM) Configurator",
      "Shopfloor Work-in-Progress (WIP) Tracking",
      "Automated Quality Inspection & Defect Logging",
      "Dealer Quota Allocation & Bulk Ordering",
      "Supplier RFQ & Automated Purchase Orders",
      "Batch Traceability & Barcode/QR Scanning"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "6-8 Weeks",
    "indicativeStartingPrice": "₹1,49,999",
    "indicativePriceUsd": "$2,099",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1947,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.111@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.111@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.111@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Manufacturing ERP Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Manufacturing ERP. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "manufacturing erp",
        "manufacturing, industrial & wholesale",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 112,
    "name": "Production Planning System",
    "slug": "production-planning-system",
    "categoryNumber": 8,
    "categoryName": "Manufacturing, Industrial & Wholesale",
    "categorySlug": "manufacturing-industrial",
    "shortDescription": "Enterprise-ready Production Planning System engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Production Planning System is a comprehensive, production-tested software solution purpose-built for Industrial factories, manufacturing plants, wholesale distributors & procurement desks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Industrial factories, manufacturing plants, wholesale distributors & procurement desks",
    "mainFeatures": [
      "Multi-level Bill of Materials (BOM) Configurator",
      "Shopfloor Work-in-Progress (WIP) Tracking",
      "Automated Quality Inspection & Defect Logging",
      "Dealer Quota Allocation & Bulk Ordering",
      "Supplier RFQ & Automated Purchase Orders",
      "Batch Traceability & Barcode/QR Scanning"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹94,999",
    "indicativePriceUsd": "$1,319",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1984,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.112@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.112@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.112@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Production Planning System Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Production Planning System. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "production planning system",
        "manufacturing, industrial & wholesale",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 113,
    "name": "Factory Management",
    "slug": "factory-management",
    "categoryNumber": 8,
    "categoryName": "Manufacturing, Industrial & Wholesale",
    "categorySlug": "manufacturing-industrial",
    "shortDescription": "Enterprise-ready Factory Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Factory Management is a comprehensive, production-tested software solution purpose-built for Industrial factories, manufacturing plants, wholesale distributors & procurement desks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Industrial factories, manufacturing plants, wholesale distributors & procurement desks",
    "mainFeatures": [
      "Multi-level Bill of Materials (BOM) Configurator",
      "Shopfloor Work-in-Progress (WIP) Tracking",
      "Automated Quality Inspection & Defect Logging",
      "Dealer Quota Allocation & Bulk Ordering",
      "Supplier RFQ & Automated Purchase Orders",
      "Batch Traceability & Barcode/QR Scanning"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹89,999",
    "indicativePriceUsd": "$1,249",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 2021,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.113@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.113@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.113@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Factory Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Factory Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "factory management",
        "manufacturing, industrial & wholesale",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 114,
    "name": "Quality Control System",
    "slug": "quality-control-system",
    "categoryNumber": 8,
    "categoryName": "Manufacturing, Industrial & Wholesale",
    "categorySlug": "manufacturing-industrial",
    "shortDescription": "Enterprise-ready Quality Control System engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Quality Control System is a comprehensive, production-tested software solution purpose-built for Industrial factories, manufacturing plants, wholesale distributors & procurement desks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Industrial factories, manufacturing plants, wholesale distributors & procurement desks",
    "mainFeatures": [
      "Multi-level Bill of Materials (BOM) Configurator",
      "Shopfloor Work-in-Progress (WIP) Tracking",
      "Automated Quality Inspection & Defect Logging",
      "Dealer Quota Allocation & Bulk Ordering",
      "Supplier RFQ & Automated Purchase Orders",
      "Batch Traceability & Barcode/QR Scanning"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Under Development",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1218,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.114@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.114@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.114@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Quality Control System Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Quality Control System. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "quality control system",
        "manufacturing, industrial & wholesale",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 115,
    "name": "Raw Material Inventory",
    "slug": "raw-material-inventory",
    "categoryNumber": 8,
    "categoryName": "Manufacturing, Industrial & Wholesale",
    "categorySlug": "manufacturing-industrial",
    "shortDescription": "Enterprise-ready Raw Material Inventory engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Raw Material Inventory is a comprehensive, production-tested software solution purpose-built for Industrial factories, manufacturing plants, wholesale distributors & procurement desks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Industrial factories, manufacturing plants, wholesale distributors & procurement desks",
    "mainFeatures": [
      "Multi-level Bill of Materials (BOM) Configurator",
      "Shopfloor Work-in-Progress (WIP) Tracking",
      "Automated Quality Inspection & Defect Logging",
      "Dealer Quota Allocation & Bulk Ordering",
      "Supplier RFQ & Automated Purchase Orders",
      "Batch Traceability & Barcode/QR Scanning"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹69,999",
    "indicativePriceUsd": "$969",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1255,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.115@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.115@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.115@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Raw Material Inventory Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Raw Material Inventory. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "raw material inventory",
        "manufacturing, industrial & wholesale",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 116,
    "name": "Industrial B2B Marketplace",
    "slug": "industrial-b2b-marketplace",
    "categoryNumber": 8,
    "categoryName": "Manufacturing, Industrial & Wholesale",
    "categorySlug": "manufacturing-industrial",
    "shortDescription": "Enterprise-ready Industrial B2B Marketplace engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Industrial B2B Marketplace is a comprehensive, production-tested software solution purpose-built for Industrial factories, manufacturing plants, wholesale distributors & procurement desks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Industrial factories, manufacturing plants, wholesale distributors & procurement desks",
    "mainFeatures": [
      "Multi-level Bill of Materials (BOM) Configurator",
      "Shopfloor Work-in-Progress (WIP) Tracking",
      "Automated Quality Inspection & Defect Logging",
      "Dealer Quota Allocation & Bulk Ordering",
      "Supplier RFQ & Automated Purchase Orders",
      "Batch Traceability & Barcode/QR Scanning"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "5-6 Weeks",
    "indicativeStartingPrice": "₹1,09,999",
    "indicativePriceUsd": "$1,529",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1292,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.116@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.116@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.116@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Industrial B2B Marketplace Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Industrial B2B Marketplace. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "industrial b2b marketplace",
        "manufacturing, industrial & wholesale",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 117,
    "name": "Dealer & Distributor Portal",
    "slug": "dealer-and-distributor-portal",
    "categoryNumber": 8,
    "categoryName": "Manufacturing, Industrial & Wholesale",
    "categorySlug": "manufacturing-industrial",
    "shortDescription": "Enterprise-ready Dealer & Distributor Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Dealer & Distributor Portal is a comprehensive, production-tested software solution purpose-built for Industrial factories, manufacturing plants, wholesale distributors & procurement desks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Industrial factories, manufacturing plants, wholesale distributors & procurement desks",
    "mainFeatures": [
      "Multi-level Bill of Materials (BOM) Configurator",
      "Shopfloor Work-in-Progress (WIP) Tracking",
      "Automated Quality Inspection & Defect Logging",
      "Dealer Quota Allocation & Bulk Ordering",
      "Supplier RFQ & Automated Purchase Orders",
      "Batch Traceability & Barcode/QR Scanning"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4 Weeks",
    "indicativeStartingPrice": "₹79,999",
    "indicativePriceUsd": "$1,099",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1329,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.117@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.117@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.117@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Dealer & Distributor Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Dealer & Distributor Portal. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "dealer & distributor portal",
        "manufacturing, industrial & wholesale",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 118,
    "name": "Supplier Management",
    "slug": "supplier-management",
    "categoryNumber": 8,
    "categoryName": "Manufacturing, Industrial & Wholesale",
    "categorySlug": "manufacturing-industrial",
    "shortDescription": "Enterprise-ready Supplier Management engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Supplier Management is a comprehensive, production-tested software solution purpose-built for Industrial factories, manufacturing plants, wholesale distributors & procurement desks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Industrial factories, manufacturing plants, wholesale distributors & procurement desks",
    "mainFeatures": [
      "Multi-level Bill of Materials (BOM) Configurator",
      "Shopfloor Work-in-Progress (WIP) Tracking",
      "Automated Quality Inspection & Defect Logging",
      "Dealer Quota Allocation & Bulk Ordering",
      "Supplier RFQ & Automated Purchase Orders",
      "Batch Traceability & Barcode/QR Scanning"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1366,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.118@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.118@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.118@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Supplier Management Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Supplier Management. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "supplier management",
        "manufacturing, industrial & wholesale",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 119,
    "name": "Procurement Software",
    "slug": "procurement-software",
    "categoryNumber": 8,
    "categoryName": "Manufacturing, Industrial & Wholesale",
    "categorySlug": "manufacturing-industrial",
    "shortDescription": "Enterprise-ready Procurement Software engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Procurement Software is a comprehensive, production-tested software solution purpose-built for Industrial factories, manufacturing plants, wholesale distributors & procurement desks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Industrial factories, manufacturing plants, wholesale distributors & procurement desks",
    "mainFeatures": [
      "Multi-level Bill of Materials (BOM) Configurator",
      "Shopfloor Work-in-Progress (WIP) Tracking",
      "Automated Quality Inspection & Defect Logging",
      "Dealer Quota Allocation & Bulk Ordering",
      "Supplier RFQ & Automated Purchase Orders",
      "Batch Traceability & Barcode/QR Scanning"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Cloud ERP",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹74,999",
    "indicativePriceUsd": "$1,049",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1403,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.119@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.119@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.119@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Procurement Software Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Procurement Software. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "procurement software",
        "manufacturing, industrial & wholesale",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 120,
    "name": "Export-Import Portal",
    "slug": "export-import-portal",
    "categoryNumber": 8,
    "categoryName": "Manufacturing, Industrial & Wholesale",
    "categorySlug": "manufacturing-industrial",
    "shortDescription": "Enterprise-ready Export-Import Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Export-Import Portal is a comprehensive, production-tested software solution purpose-built for Industrial factories, manufacturing plants, wholesale distributors & procurement desks. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Industrial factories, manufacturing plants, wholesale distributors & procurement desks",
    "mainFeatures": [
      "Multi-level Bill of Materials (BOM) Configurator",
      "Shopfloor Work-in-Progress (WIP) Tracking",
      "Automated Quality Inspection & Defect Logging",
      "Dealer Quota Allocation & Bulk Ordering",
      "Supplier RFQ & Automated Purchase Orders",
      "Batch Traceability & Barcode/QR Scanning"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4 Weeks",
    "indicativeStartingPrice": "₹84,999",
    "indicativePriceUsd": "$1,189",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1440,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.120@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.120@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.120@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Export-Import Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Export-Import Portal. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "export-import portal",
        "manufacturing, industrial & wholesale",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 121,
    "name": "AI Customer Support Chatbot",
    "slug": "ai-customer-support-chatbot",
    "categoryNumber": 9,
    "categoryName": "AI, Automation & Advanced Technology",
    "categorySlug": "ai-automation",
    "shortDescription": "Enterprise-ready AI Customer Support Chatbot engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs AI Customer Support Chatbot is a comprehensive, production-tested software solution purpose-built for Enterprises seeking automated operations, AI customer service, and workflow autonomy. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Enterprises seeking automated operations, AI customer service, and workflow autonomy",
    "mainFeatures": [
      "Autonomous Multi-turn Conversational AI Agent",
      "Custom RAG Vector Search across Company Docs",
      "WhatsApp Business Official Cloud API Integration",
      "Prompt Optimization & Guardrail Safety Engine",
      "Detailed Token Usage, Latency & Cost Telemetry",
      "Human-in-the-Loop Fallback Escalation Queue"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "AI Microservice",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1477,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.121@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.121@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.121@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "AI Customer Support Chatbot Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of AI Customer Support Chatbot. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "ai customer support chatbot",
        "ai, automation & advanced technology",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 122,
    "name": "AI Sales Assistant",
    "slug": "ai-sales-assistant",
    "categoryNumber": 9,
    "categoryName": "AI, Automation & Advanced Technology",
    "categorySlug": "ai-automation",
    "shortDescription": "Enterprise-ready AI Sales Assistant engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs AI Sales Assistant is a comprehensive, production-tested software solution purpose-built for Enterprises seeking automated operations, AI customer service, and workflow autonomy. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Enterprises seeking automated operations, AI customer service, and workflow autonomy",
    "mainFeatures": [
      "Autonomous Multi-turn Conversational AI Agent",
      "Custom RAG Vector Search across Company Docs",
      "WhatsApp Business Official Cloud API Integration",
      "Prompt Optimization & Guardrail Safety Engine",
      "Detailed Token Usage, Latency & Cost Telemetry",
      "Human-in-the-Loop Fallback Escalation Queue"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "AI Microservice",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹59,999",
    "indicativePriceUsd": "$829",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1514,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.122@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.122@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.122@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "AI Sales Assistant Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of AI Sales Assistant. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "ai sales assistant",
        "ai, automation & advanced technology",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 123,
    "name": "WhatsApp Business Automation",
    "slug": "whatsapp-business-automation",
    "categoryNumber": 9,
    "categoryName": "AI, Automation & Advanced Technology",
    "categorySlug": "ai-automation",
    "shortDescription": "Enterprise-ready WhatsApp Business Automation engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs WhatsApp Business Automation is a comprehensive, production-tested software solution purpose-built for Enterprises seeking automated operations, AI customer service, and workflow autonomy. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Enterprises seeking automated operations, AI customer service, and workflow autonomy",
    "mainFeatures": [
      "Autonomous Multi-turn Conversational AI Agent",
      "Custom RAG Vector Search across Company Docs",
      "WhatsApp Business Official Cloud API Integration",
      "Prompt Optimization & Guardrail Safety Engine",
      "Detailed Token Usage, Latency & Cost Telemetry",
      "Human-in-the-Loop Fallback Escalation Queue"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹44,999",
    "indicativePriceUsd": "$629",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1551,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.123@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.123@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.123@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "WhatsApp Business Automation Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of WhatsApp Business Automation. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "whatsapp business automation",
        "ai, automation & advanced technology",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 124,
    "name": "AI Voice Assistant",
    "slug": "ai-voice-assistant",
    "categoryNumber": 9,
    "categoryName": "AI, Automation & Advanced Technology",
    "categorySlug": "ai-automation",
    "shortDescription": "Enterprise-ready AI Voice Assistant engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs AI Voice Assistant is a comprehensive, production-tested software solution purpose-built for Enterprises seeking automated operations, AI customer service, and workflow autonomy. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Enterprises seeking automated operations, AI customer service, and workflow autonomy",
    "mainFeatures": [
      "Autonomous Multi-turn Conversational AI Agent",
      "Custom RAG Vector Search across Company Docs",
      "WhatsApp Business Official Cloud API Integration",
      "Prompt Optimization & Guardrail Safety Engine",
      "Detailed Token Usage, Latency & Cost Telemetry",
      "Human-in-the-Loop Fallback Escalation Queue"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "AI Microservice",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹79,999",
    "indicativePriceUsd": "$1,099",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1588,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.124@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.124@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.124@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "AI Voice Assistant Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of AI Voice Assistant. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "ai voice assistant",
        "ai, automation & advanced technology",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 125,
    "name": "AI Document Assistant",
    "slug": "ai-document-assistant",
    "categoryNumber": 9,
    "categoryName": "AI, Automation & Advanced Technology",
    "categorySlug": "ai-automation",
    "shortDescription": "Enterprise-ready AI Document Assistant engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs AI Document Assistant is a comprehensive, production-tested software solution purpose-built for Enterprises seeking automated operations, AI customer service, and workflow autonomy. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Enterprises seeking automated operations, AI customer service, and workflow autonomy",
    "mainFeatures": [
      "Autonomous Multi-turn Conversational AI Agent",
      "Custom RAG Vector Search across Company Docs",
      "WhatsApp Business Official Cloud API Integration",
      "Prompt Optimization & Guardrail Safety Engine",
      "Detailed Token Usage, Latency & Cost Telemetry",
      "Human-in-the-Loop Fallback Escalation Queue"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "AI Microservice",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹54,999",
    "indicativePriceUsd": "$769",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1625,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.125@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.125@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.125@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "AI Document Assistant Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of AI Document Assistant. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "ai document assistant",
        "ai, automation & advanced technology",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 126,
    "name": "AI Content Generator",
    "slug": "ai-content-generator",
    "categoryNumber": 9,
    "categoryName": "AI, Automation & Advanced Technology",
    "categorySlug": "ai-automation",
    "shortDescription": "Enterprise-ready AI Content Generator engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs AI Content Generator is a comprehensive, production-tested software solution purpose-built for Enterprises seeking automated operations, AI customer service, and workflow autonomy. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Enterprises seeking automated operations, AI customer service, and workflow autonomy",
    "mainFeatures": [
      "Autonomous Multi-turn Conversational AI Agent",
      "Custom RAG Vector Search across Company Docs",
      "WhatsApp Business Official Cloud API Integration",
      "Prompt Optimization & Guardrail Safety Engine",
      "Detailed Token Usage, Latency & Cost Telemetry",
      "Human-in-the-Loop Fallback Escalation Queue"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Under Development",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1662,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.126@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.126@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.126@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "AI Content Generator Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of AI Content Generator. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "ai content generator",
        "ai, automation & advanced technology",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 127,
    "name": "AI Image Generation Portal",
    "slug": "ai-image-generation-portal",
    "categoryNumber": 9,
    "categoryName": "AI, Automation & Advanced Technology",
    "categorySlug": "ai-automation",
    "shortDescription": "Enterprise-ready AI Image Generation Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs AI Image Generation Portal is a comprehensive, production-tested software solution purpose-built for Enterprises seeking automated operations, AI customer service, and workflow autonomy. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Enterprises seeking automated operations, AI customer service, and workflow autonomy",
    "mainFeatures": [
      "Autonomous Multi-turn Conversational AI Agent",
      "Custom RAG Vector Search across Company Docs",
      "WhatsApp Business Official Cloud API Integration",
      "Prompt Optimization & Guardrail Safety Engine",
      "Detailed Token Usage, Latency & Cost Telemetry",
      "Human-in-the-Loop Fallback Escalation Queue"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1699,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.127@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.127@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.127@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "AI Image Generation Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of AI Image Generation Portal. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "ai image generation portal",
        "ai, automation & advanced technology",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 128,
    "name": "AI Resume Screening",
    "slug": "ai-resume-screening",
    "categoryNumber": 9,
    "categoryName": "AI, Automation & Advanced Technology",
    "categorySlug": "ai-automation",
    "shortDescription": "Enterprise-ready AI Resume Screening engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs AI Resume Screening is a comprehensive, production-tested software solution purpose-built for Enterprises seeking automated operations, AI customer service, and workflow autonomy. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Enterprises seeking automated operations, AI customer service, and workflow autonomy",
    "mainFeatures": [
      "Autonomous Multi-turn Conversational AI Agent",
      "Custom RAG Vector Search across Company Docs",
      "WhatsApp Business Official Cloud API Integration",
      "Prompt Optimization & Guardrail Safety Engine",
      "Detailed Token Usage, Latency & Cost Telemetry",
      "Human-in-the-Loop Fallback Escalation Queue"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "AI Microservice",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹59,999",
    "indicativePriceUsd": "$829",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1736,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.128@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.128@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.128@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "AI Resume Screening Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of AI Resume Screening. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "ai resume screening",
        "ai, automation & advanced technology",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 129,
    "name": "AI Business Analytics",
    "slug": "ai-business-analytics",
    "categoryNumber": 9,
    "categoryName": "AI, Automation & Advanced Technology",
    "categorySlug": "ai-automation",
    "shortDescription": "Enterprise-ready AI Business Analytics engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs AI Business Analytics is a comprehensive, production-tested software solution purpose-built for Enterprises seeking automated operations, AI customer service, and workflow autonomy. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Enterprises seeking automated operations, AI customer service, and workflow autonomy",
    "mainFeatures": [
      "Autonomous Multi-turn Conversational AI Agent",
      "Custom RAG Vector Search across Company Docs",
      "WhatsApp Business Official Cloud API Integration",
      "Prompt Optimization & Guardrail Safety Engine",
      "Detailed Token Usage, Latency & Cost Telemetry",
      "Human-in-the-Loop Fallback Escalation Queue"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4 Weeks",
    "indicativeStartingPrice": "₹89,999",
    "indicativePriceUsd": "$1,249",
    "availabilityStatus": "Under Development",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1773,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.129@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.129@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.129@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "AI Business Analytics Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of AI Business Analytics. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "ai business analytics",
        "ai, automation & advanced technology",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 130,
    "name": "AI Knowledge Base",
    "slug": "ai-knowledge-base",
    "categoryNumber": 9,
    "categoryName": "AI, Automation & Advanced Technology",
    "categorySlug": "ai-automation",
    "shortDescription": "Enterprise-ready AI Knowledge Base engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs AI Knowledge Base is a comprehensive, production-tested software solution purpose-built for Enterprises seeking automated operations, AI customer service, and workflow autonomy. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Enterprises seeking automated operations, AI customer service, and workflow autonomy",
    "mainFeatures": [
      "Autonomous Multi-turn Conversational AI Agent",
      "Custom RAG Vector Search across Company Docs",
      "WhatsApp Business Official Cloud API Integration",
      "Prompt Optimization & Guardrail Safety Engine",
      "Detailed Token Usage, Latency & Cost Telemetry",
      "Human-in-the-Loop Fallback Escalation Queue"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "AI Microservice",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹54,999",
    "indicativePriceUsd": "$769",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1810,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.130@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.130@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.130@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "AI Knowledge Base Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of AI Knowledge Base. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "ai knowledge base",
        "ai, automation & advanced technology",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 131,
    "name": "AI Appointment Assistant",
    "slug": "ai-appointment-assistant",
    "categoryNumber": 9,
    "categoryName": "AI, Automation & Advanced Technology",
    "categorySlug": "ai-automation",
    "shortDescription": "Enterprise-ready AI Appointment Assistant engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs AI Appointment Assistant is a comprehensive, production-tested software solution purpose-built for Enterprises seeking automated operations, AI customer service, and workflow autonomy. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Enterprises seeking automated operations, AI customer service, and workflow autonomy",
    "mainFeatures": [
      "Autonomous Multi-turn Conversational AI Agent",
      "Custom RAG Vector Search across Company Docs",
      "WhatsApp Business Official Cloud API Integration",
      "Prompt Optimization & Guardrail Safety Engine",
      "Detailed Token Usage, Latency & Cost Telemetry",
      "Human-in-the-Loop Fallback Escalation Queue"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "AI Microservice",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹44,999",
    "indicativePriceUsd": "$629",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1847,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.131@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.131@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.131@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "AI Appointment Assistant Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of AI Appointment Assistant. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "ai appointment assistant",
        "ai, automation & advanced technology",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 132,
    "name": "AI E-commerce Assistant",
    "slug": "ai-e-commerce-assistant",
    "categoryNumber": 9,
    "categoryName": "AI, Automation & Advanced Technology",
    "categorySlug": "ai-automation",
    "shortDescription": "Enterprise-ready AI E-commerce Assistant engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs AI E-commerce Assistant is a comprehensive, production-tested software solution purpose-built for Enterprises seeking automated operations, AI customer service, and workflow autonomy. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Enterprises seeking automated operations, AI customer service, and workflow autonomy",
    "mainFeatures": [
      "Autonomous Multi-turn Conversational AI Agent",
      "Custom RAG Vector Search across Company Docs",
      "WhatsApp Business Official Cloud API Integration",
      "Prompt Optimization & Guardrail Safety Engine",
      "Detailed Token Usage, Latency & Cost Telemetry",
      "Human-in-the-Loop Fallback Escalation Queue"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "AI Microservice",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": true,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1884,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.132@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.132@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.132@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "AI E-commerce Assistant Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of AI E-commerce Assistant. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "ai e-commerce assistant",
        "ai, automation & advanced technology",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 133,
    "name": "Workflow Automation Platform",
    "slug": "workflow-automation-platform",
    "categoryNumber": 9,
    "categoryName": "AI, Automation & Advanced Technology",
    "categorySlug": "ai-automation",
    "shortDescription": "Enterprise-ready Workflow Automation Platform engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Workflow Automation Platform is a comprehensive, production-tested software solution purpose-built for Enterprises seeking automated operations, AI customer service, and workflow autonomy. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Enterprises seeking automated operations, AI customer service, and workflow autonomy",
    "mainFeatures": [
      "Autonomous Multi-turn Conversational AI Agent",
      "Custom RAG Vector Search across Company Docs",
      "WhatsApp Business Official Cloud API Integration",
      "Prompt Optimization & Guardrail Safety Engine",
      "Detailed Token Usage, Latency & Cost Telemetry",
      "Human-in-the-Loop Fallback Escalation Queue"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹99,999",
    "indicativePriceUsd": "$1,399",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1921,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.133@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.133@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.133@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Workflow Automation Platform Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Workflow Automation Platform. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "workflow automation platform",
        "ai, automation & advanced technology",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 134,
    "name": "Custom AI Agent Platform",
    "slug": "custom-ai-agent-platform",
    "categoryNumber": 9,
    "categoryName": "AI, Automation & Advanced Technology",
    "categorySlug": "ai-automation",
    "shortDescription": "Enterprise-ready Custom AI Agent Platform engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Custom AI Agent Platform is a comprehensive, production-tested software solution purpose-built for Enterprises seeking automated operations, AI customer service, and workflow autonomy. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Enterprises seeking automated operations, AI customer service, and workflow autonomy",
    "mainFeatures": [
      "Autonomous Multi-turn Conversational AI Agent",
      "Custom RAG Vector Search across Company Docs",
      "WhatsApp Business Official Cloud API Integration",
      "Prompt Optimization & Guardrail Safety Engine",
      "Detailed Token Usage, Latency & Cost Telemetry",
      "Human-in-the-Loop Fallback Escalation Queue"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "5-6 Weeks",
    "indicativeStartingPrice": "₹1,19,999",
    "indicativePriceUsd": "$1,699",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1958,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.134@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.134@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.134@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Custom AI Agent Platform Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Custom AI Agent Platform. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "custom ai agent platform",
        "ai, automation & advanced technology",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 135,
    "name": "AI Education Assistant",
    "slug": "ai-education-assistant",
    "categoryNumber": 9,
    "categoryName": "AI, Automation & Advanced Technology",
    "categorySlug": "ai-automation",
    "shortDescription": "Enterprise-ready AI Education Assistant engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs AI Education Assistant is a comprehensive, production-tested software solution purpose-built for Enterprises seeking automated operations, AI customer service, and workflow autonomy. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Enterprises seeking automated operations, AI customer service, and workflow autonomy",
    "mainFeatures": [
      "Autonomous Multi-turn Conversational AI Agent",
      "Custom RAG Vector Search across Company Docs",
      "WhatsApp Business Official Cloud API Integration",
      "Prompt Optimization & Guardrail Safety Engine",
      "Detailed Token Usage, Latency & Cost Telemetry",
      "Human-in-the-Loop Fallback Escalation Queue"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "AI Microservice",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Under Development",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1995,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.135@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.135@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.135@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "AI Education Assistant Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of AI Education Assistant. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "ai education assistant",
        "ai, automation & advanced technology",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 136,
    "name": "Membership Platform",
    "slug": "membership-platform",
    "categoryNumber": 10,
    "categoryName": "Membership & Community Platforms",
    "categorySlug": "membership-community",
    "shortDescription": "Enterprise-ready Membership Platform engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Membership Platform is a comprehensive, production-tested software solution purpose-built for Creator clubs, professional associations, alumni networks & community platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Creator clubs, professional associations, alumni networks & community platforms",
    "mainFeatures": [
      "Tiered Membership Access & Paywall Gating",
      "Multi-level Referral Tracking with Automated Payouts",
      "Interactive Community Discussion Channels",
      "Gamified Loyalty Points & Digital Coupon Wallet",
      "Classified Listing Moderation & Featured Placements",
      "Verified Member Profiles & Badging System"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹59,999",
    "indicativePriceUsd": "$829",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 2032,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.136@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.136@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.136@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Membership Platform Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Membership Platform. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "membership platform",
        "membership & community platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 137,
    "name": "Referral Management System",
    "slug": "referral-management-system",
    "categoryNumber": 10,
    "categoryName": "Membership & Community Platforms",
    "categorySlug": "membership-community",
    "shortDescription": "Enterprise-ready Referral Management System engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Referral Management System is a comprehensive, production-tested software solution purpose-built for Creator clubs, professional associations, alumni networks & community platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Creator clubs, professional associations, alumni networks & community platforms",
    "mainFeatures": [
      "Tiered Membership Access & Paywall Gating",
      "Multi-level Referral Tracking with Automated Payouts",
      "Interactive Community Discussion Channels",
      "Gamified Loyalty Points & Digital Coupon Wallet",
      "Classified Listing Moderation & Featured Placements",
      "Verified Member Profiles & Badging System"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹44,999",
    "indicativePriceUsd": "$629",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1229,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.137@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.137@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.137@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Referral Management System Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Referral Management System. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "referral management system",
        "membership & community platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 138,
    "name": "Loyalty & Rewards Platform",
    "slug": "loyalty-and-rewards-platform",
    "categoryNumber": 10,
    "categoryName": "Membership & Community Platforms",
    "categorySlug": "membership-community",
    "shortDescription": "Enterprise-ready Loyalty & Rewards Platform engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Loyalty & Rewards Platform is a comprehensive, production-tested software solution purpose-built for Creator clubs, professional associations, alumni networks & community platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Creator clubs, professional associations, alumni networks & community platforms",
    "mainFeatures": [
      "Tiered Membership Access & Paywall Gating",
      "Multi-level Referral Tracking with Automated Payouts",
      "Interactive Community Discussion Channels",
      "Gamified Loyalty Points & Digital Coupon Wallet",
      "Classified Listing Moderation & Featured Placements",
      "Verified Member Profiles & Badging System"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1266,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.138@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.138@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.138@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Loyalty & Rewards Platform Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Loyalty & Rewards Platform. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "loyalty & rewards platform",
        "membership & community platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 139,
    "name": "Online Community Portal",
    "slug": "online-community-portal",
    "categoryNumber": 10,
    "categoryName": "Membership & Community Platforms",
    "categorySlug": "membership-community",
    "shortDescription": "Enterprise-ready Online Community Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Online Community Portal is a comprehensive, production-tested software solution purpose-built for Creator clubs, professional associations, alumni networks & community platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Creator clubs, professional associations, alumni networks & community platforms",
    "mainFeatures": [
      "Tiered Membership Access & Paywall Gating",
      "Multi-level Referral Tracking with Automated Payouts",
      "Interactive Community Discussion Channels",
      "Gamified Loyalty Points & Digital Coupon Wallet",
      "Classified Listing Moderation & Featured Placements",
      "Verified Member Profiles & Badging System"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹54,999",
    "indicativePriceUsd": "$769",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1303,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.139@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.139@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.139@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Online Community Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Online Community Portal. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "online community portal",
        "membership & community platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 140,
    "name": "Social Networking Platform",
    "slug": "social-networking-platform",
    "categoryNumber": 10,
    "categoryName": "Membership & Community Platforms",
    "categorySlug": "membership-community",
    "shortDescription": "Enterprise-ready Social Networking Platform engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Social Networking Platform is a comprehensive, production-tested software solution purpose-built for Creator clubs, professional associations, alumni networks & community platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Creator clubs, professional associations, alumni networks & community platforms",
    "mainFeatures": [
      "Tiered Membership Access & Paywall Gating",
      "Multi-level Referral Tracking with Automated Payouts",
      "Interactive Community Discussion Channels",
      "Gamified Loyalty Points & Digital Coupon Wallet",
      "Classified Listing Moderation & Featured Placements",
      "Verified Member Profiles & Badging System"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "5-6 Weeks",
    "indicativeStartingPrice": "₹99,999",
    "indicativePriceUsd": "$1,399",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1340,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.140@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.140@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.140@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Social Networking Platform Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Social Networking Platform. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "social networking platform",
        "membership & community platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 141,
    "name": "Classified Ads Portal",
    "slug": "classified-ads-portal",
    "categoryNumber": 10,
    "categoryName": "Membership & Community Platforms",
    "categorySlug": "membership-community",
    "shortDescription": "Enterprise-ready Classified Ads Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Classified Ads Portal is a comprehensive, production-tested software solution purpose-built for Creator clubs, professional associations, alumni networks & community platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Creator clubs, professional associations, alumni networks & community platforms",
    "mainFeatures": [
      "Tiered Membership Access & Paywall Gating",
      "Multi-level Referral Tracking with Automated Payouts",
      "Interactive Community Discussion Channels",
      "Gamified Loyalty Points & Digital Coupon Wallet",
      "Classified Listing Moderation & Featured Placements",
      "Verified Member Profiles & Badging System"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹59,999",
    "indicativePriceUsd": "$829",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1377,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.141@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.141@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.141@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Classified Ads Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Classified Ads Portal. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "classified ads portal",
        "membership & community platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 142,
    "name": "Online Directory",
    "slug": "online-directory",
    "categoryNumber": 10,
    "categoryName": "Membership & Community Platforms",
    "categorySlug": "membership-community",
    "shortDescription": "Enterprise-ready Online Directory engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Online Directory is a comprehensive, production-tested software solution purpose-built for Creator clubs, professional associations, alumni networks & community platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Creator clubs, professional associations, alumni networks & community platforms",
    "mainFeatures": [
      "Tiered Membership Access & Paywall Gating",
      "Multi-level Referral Tracking with Automated Payouts",
      "Interactive Community Discussion Channels",
      "Gamified Loyalty Points & Digital Coupon Wallet",
      "Classified Listing Moderation & Featured Placements",
      "Verified Member Profiles & Badging System"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1414,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.142@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.142@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.142@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Online Directory Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Online Directory. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "online directory",
        "membership & community platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 143,
    "name": "Crowdfunding Platform",
    "slug": "crowdfunding-platform",
    "categoryNumber": 10,
    "categoryName": "Membership & Community Platforms",
    "categorySlug": "membership-community",
    "shortDescription": "Enterprise-ready Crowdfunding Platform engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Crowdfunding Platform is a comprehensive, production-tested software solution purpose-built for Creator clubs, professional associations, alumni networks & community platforms. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Creator clubs, professional associations, alumni networks & community platforms",
    "mainFeatures": [
      "Tiered Membership Access & Paywall Gating",
      "Multi-level Referral Tracking with Automated Payouts",
      "Interactive Community Discussion Channels",
      "Gamified Loyalty Points & Digital Coupon Wallet",
      "Classified Listing Moderation & Featured Placements",
      "Verified Member Profiles & Badging System"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹89,999",
    "indicativePriceUsd": "$1,249",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1451,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.143@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.143@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.143@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Crowdfunding Platform Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Crowdfunding Platform. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "crowdfunding platform",
        "membership & community platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 144,
    "name": "Donation Management Portal",
    "slug": "donation-management-portal",
    "categoryNumber": 11,
    "categoryName": "Media, Events & Digital Content",
    "categorySlug": "media-events",
    "shortDescription": "Enterprise-ready Donation Management Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Donation Management Portal is a comprehensive, production-tested software solution purpose-built for Event organizers, digital media publications, webinar producers & charitable trusts. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Event organizers, digital media publications, webinar producers & charitable trusts",
    "mainFeatures": [
      "Secure Digital Ticketing with QR Access Control",
      "Protected DRM Video Streaming with CDN Caching",
      "Live Interactive Webinar Chat, Q&A & Polls",
      "Automated Recurring Donation Processing & 80G Receipts",
      "Dynamic Digital Publishing CMS with Paywall",
      "Sponsor Banner Ad Management & Impression Tracking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹39,999",
    "indicativePriceUsd": "$549",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1488,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.144@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.144@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.144@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Donation Management Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Donation Management Portal. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "donation management portal",
        "media, events & digital content",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 145,
    "name": "Job & Gig Marketplace",
    "slug": "job-and-gig-marketplace",
    "categoryNumber": 11,
    "categoryName": "Media, Events & Digital Content",
    "categorySlug": "media-events",
    "shortDescription": "Enterprise-ready Job & Gig Marketplace engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Job & Gig Marketplace is a comprehensive, production-tested software solution purpose-built for Event organizers, digital media publications, webinar producers & charitable trusts. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Event organizers, digital media publications, webinar producers & charitable trusts",
    "mainFeatures": [
      "Secure Digital Ticketing with QR Access Control",
      "Protected DRM Video Streaming with CDN Caching",
      "Live Interactive Webinar Chat, Q&A & Polls",
      "Automated Recurring Donation Processing & 80G Receipts",
      "Dynamic Digital Publishing CMS with Paywall",
      "Sponsor Banner Ad Management & Impression Tracking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹84,999",
    "indicativePriceUsd": "$1,189",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1525,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.145@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.145@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.145@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Job & Gig Marketplace Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Job & Gig Marketplace. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "job & gig marketplace",
        "media, events & digital content",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 146,
    "name": "Video Learning Platform",
    "slug": "video-learning-platform",
    "categoryNumber": 11,
    "categoryName": "Media, Events & Digital Content",
    "categorySlug": "media-events",
    "shortDescription": "Enterprise-ready Video Learning Platform engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Video Learning Platform is a comprehensive, production-tested software solution purpose-built for Event organizers, digital media publications, webinar producers & charitable trusts. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Event organizers, digital media publications, webinar producers & charitable trusts",
    "mainFeatures": [
      "Secure Digital Ticketing with QR Access Control",
      "Protected DRM Video Streaming with CDN Caching",
      "Live Interactive Webinar Chat, Q&A & Polls",
      "Automated Recurring Donation Processing & 80G Receipts",
      "Dynamic Digital Publishing CMS with Paywall",
      "Sponsor Banner Ad Management & Impression Tracking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "4 Weeks",
    "indicativeStartingPrice": "₹79,999",
    "indicativePriceUsd": "$1,099",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": true,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1562,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.146@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.146@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.146@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Video Learning Platform Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Video Learning Platform. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "video learning platform",
        "media, events & digital content",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 147,
    "name": "Webinar Platform",
    "slug": "webinar-platform",
    "categoryNumber": 11,
    "categoryName": "Media, Events & Digital Content",
    "categorySlug": "media-events",
    "shortDescription": "Enterprise-ready Webinar Platform engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Webinar Platform is a comprehensive, production-tested software solution purpose-built for Event organizers, digital media publications, webinar producers & charitable trusts. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Event organizers, digital media publications, webinar producers & charitable trusts",
    "mainFeatures": [
      "Secure Digital Ticketing with QR Access Control",
      "Protected DRM Video Streaming with CDN Caching",
      "Live Interactive Webinar Chat, Q&A & Polls",
      "Automated Recurring Donation Processing & 80G Receipts",
      "Dynamic Digital Publishing CMS with Paywall",
      "Sponsor Banner Ad Management & Impression Tracking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "SaaS Platform",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹74,999",
    "indicativePriceUsd": "$1,049",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1599,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.147@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.147@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.147@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Webinar Platform Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Webinar Platform. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "webinar platform",
        "media, events & digital content",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 148,
    "name": "News & Media Portal",
    "slug": "news-and-media-portal",
    "categoryNumber": 11,
    "categoryName": "Media, Events & Digital Content",
    "categorySlug": "media-events",
    "shortDescription": "Enterprise-ready News & Media Portal engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs News & Media Portal is a comprehensive, production-tested software solution purpose-built for Event organizers, digital media publications, webinar producers & charitable trusts. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Event organizers, digital media publications, webinar producers & charitable trusts",
    "mainFeatures": [
      "Secure Digital Ticketing with QR Access Control",
      "Protected DRM Video Streaming with CDN Caching",
      "Live Interactive Webinar Chat, Q&A & Polls",
      "Automated Recurring Donation Processing & 80G Receipts",
      "Dynamic Digital Publishing CMS with Paywall",
      "Sponsor Banner Ad Management & Impression Tracking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "Python / FastAPI",
      "LangChain",
      "OpenAI / Claude API",
      "Supabase pgvector",
      "Tailwind CSS"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1636,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.148@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.148@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.148@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "News & Media Portal Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of News & Media Portal. Built by StarX Alpha Labs with Next.js 16, React 19, Python / FastAPI. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "news & media portal",
        "media, events & digital content",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 149,
    "name": "Digital Magazine Platform",
    "slug": "digital-magazine-platform",
    "categoryNumber": 11,
    "categoryName": "Media, Events & Digital Content",
    "categorySlug": "media-events",
    "shortDescription": "Enterprise-ready Digital Magazine Platform engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Digital Magazine Platform is a comprehensive, production-tested software solution purpose-built for Event organizers, digital media publications, webinar producers & charitable trusts. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Event organizers, digital media publications, webinar producers & charitable trusts",
    "mainFeatures": [
      "Secure Digital Ticketing with QR Access Control",
      "Protected DRM Video Streaming with CDN Caching",
      "Live Interactive Webinar Chat, Q&A & Polls",
      "Automated Recurring Donation Processing & 80G Receipts",
      "Dynamic Digital Publishing CMS with Paywall",
      "Sponsor Banner Ad Management & Impression Tracking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe / Razorpay"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "2 Weeks",
    "indicativeStartingPrice": "₹44,999",
    "indicativePriceUsd": "$629",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1673,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.149@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.149@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.149@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Digital Magazine Platform Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Digital Magazine Platform. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "digital magazine platform",
        "media, events & digital content",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 150,
    "name": "Event Ticket Booking",
    "slug": "event-ticket-booking",
    "categoryNumber": 11,
    "categoryName": "Media, Events & Digital Content",
    "categorySlug": "media-events",
    "shortDescription": "Enterprise-ready Event Ticket Booking engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Event Ticket Booking is a comprehensive, production-tested software solution purpose-built for Event organizers, digital media publications, webinar producers & charitable trusts. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "Event organizers, digital media publications, webinar producers & charitable trusts",
    "mainFeatures": [
      "Secure Digital Ticketing with QR Access Control",
      "Protected DRM Video Streaming with CDN Caching",
      "Live Interactive Webinar Chat, Q&A & Polls",
      "Automated Recurring Donation Processing & 80G Receipts",
      "Dynamic Digital Publishing CMS with Paywall",
      "Sponsor Banner Ad Management & Impression Tracking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase SSR",
      "PostgreSQL",
      "Prisma / Drizzle"
    ],
    "developmentType": "Web App",
    "platform": "Web App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1710,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.150@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.150@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.150@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Event Ticket Booking Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Event Ticket Booking. Built by StarX Alpha Labs with Next.js 16, React 19, TypeScript. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "event ticket booking",
        "media, events & digital content",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 151,
    "name": "Grocery Delivery App",
    "slug": "grocery-delivery-app",
    "categoryNumber": 12,
    "categoryName": "Mobile Apps & Customer Platforms",
    "categorySlug": "mobile-apps",
    "shortDescription": "Enterprise-ready Grocery Delivery App engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Grocery Delivery App is a comprehensive, production-tested software solution purpose-built for On-demand hyper-local startups, mobile-first businesses & field team operations. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "On-demand hyper-local startups, mobile-first businesses & field team operations",
    "mainFeatures": [
      "Native iOS & Android Performance via Flutter / React Native",
      "Live GPS Geolocation Tracking & Map Polyline",
      "Instant Push Notifications via FCM / OneSignal",
      "Offline SQLite Sync for Zero-connectivity Operations",
      "Biometric FaceID / Fingerprint Quick Authentication",
      "In-App Razorpay & UPI Seamless Deep-linking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "React Native / Flutter",
      "Next.js Backend",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "WebSockets"
    ],
    "developmentType": "Mobile App",
    "platform": "Mobile App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹79,999",
    "indicativePriceUsd": "$1,099",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1747,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.151@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.151@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.151@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Grocery Delivery App Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Grocery Delivery App. Built by StarX Alpha Labs with React Native / Flutter, Next.js Backend, Supabase. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "grocery delivery app",
        "mobile apps & customer platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 152,
    "name": "Food Delivery App",
    "slug": "food-delivery-app-mobile",
    "categoryNumber": 12,
    "categoryName": "Mobile Apps & Customer Platforms",
    "categorySlug": "mobile-apps",
    "shortDescription": "Enterprise-ready Food Delivery App engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Food Delivery App is a comprehensive, production-tested software solution purpose-built for On-demand hyper-local startups, mobile-first businesses & field team operations. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "On-demand hyper-local startups, mobile-first businesses & field team operations",
    "mainFeatures": [
      "Native iOS & Android Performance via Flutter / React Native",
      "Live GPS Geolocation Tracking & Map Polyline",
      "Instant Push Notifications via FCM / OneSignal",
      "Offline SQLite Sync for Zero-connectivity Operations",
      "Biometric FaceID / Fingerprint Quick Authentication",
      "In-App Razorpay & UPI Seamless Deep-linking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "React Native / Flutter",
      "Next.js Backend",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "WebSockets"
    ],
    "developmentType": "Mobile App",
    "platform": "Mobile App",
    "estimatedDevelopmentTime": "4-5 Weeks",
    "indicativeStartingPrice": "₹79,999",
    "indicativePriceUsd": "$1,099",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": true,
    "isPopular": false,
    "viewsCount": 1784,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.152@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.152@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.152@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Food Delivery App Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Food Delivery App. Built by StarX Alpha Labs with React Native / Flutter, Next.js Backend, Supabase. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "food delivery app",
        "mobile apps & customer platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 153,
    "name": "Shopping App",
    "slug": "shopping-app",
    "categoryNumber": 12,
    "categoryName": "Mobile Apps & Customer Platforms",
    "categorySlug": "mobile-apps",
    "shortDescription": "Enterprise-ready Shopping App engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Shopping App is a comprehensive, production-tested software solution purpose-built for On-demand hyper-local startups, mobile-first businesses & field team operations. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "On-demand hyper-local startups, mobile-first businesses & field team operations",
    "mainFeatures": [
      "Native iOS & Android Performance via Flutter / React Native",
      "Live GPS Geolocation Tracking & Map Polyline",
      "Instant Push Notifications via FCM / OneSignal",
      "Offline SQLite Sync for Zero-connectivity Operations",
      "Biometric FaceID / Fingerprint Quick Authentication",
      "In-App Razorpay & UPI Seamless Deep-linking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "React Native / Flutter",
      "Next.js Backend",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "WebSockets"
    ],
    "developmentType": "Mobile App",
    "platform": "Mobile App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹69,999",
    "indicativePriceUsd": "$969",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1821,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.153@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.153@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.153@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Shopping App Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Shopping App. Built by StarX Alpha Labs with React Native / Flutter, Next.js Backend, Supabase. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "shopping app",
        "mobile apps & customer platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 154,
    "name": "Service Booking App",
    "slug": "service-booking-app",
    "categoryNumber": 12,
    "categoryName": "Mobile Apps & Customer Platforms",
    "categorySlug": "mobile-apps",
    "shortDescription": "Enterprise-ready Service Booking App engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Service Booking App is a comprehensive, production-tested software solution purpose-built for On-demand hyper-local startups, mobile-first businesses & field team operations. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "On-demand hyper-local startups, mobile-first businesses & field team operations",
    "mainFeatures": [
      "Native iOS & Android Performance via Flutter / React Native",
      "Live GPS Geolocation Tracking & Map Polyline",
      "Instant Push Notifications via FCM / OneSignal",
      "Offline SQLite Sync for Zero-connectivity Operations",
      "Biometric FaceID / Fingerprint Quick Authentication",
      "In-App Razorpay & UPI Seamless Deep-linking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "React Native / Flutter",
      "Next.js Backend",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "WebSockets"
    ],
    "developmentType": "Mobile App",
    "platform": "Mobile App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1858,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.154@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.154@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.154@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Service Booking App Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Service Booking App. Built by StarX Alpha Labs with React Native / Flutter, Next.js Backend, Supabase. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "service booking app",
        "mobile apps & customer platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 155,
    "name": "Doctor Booking App",
    "slug": "doctor-booking-app",
    "categoryNumber": 12,
    "categoryName": "Mobile Apps & Customer Platforms",
    "categorySlug": "mobile-apps",
    "shortDescription": "Enterprise-ready Doctor Booking App engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Doctor Booking App is a comprehensive, production-tested software solution purpose-built for On-demand hyper-local startups, mobile-first businesses & field team operations. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "On-demand hyper-local startups, mobile-first businesses & field team operations",
    "mainFeatures": [
      "Native iOS & Android Performance via Flutter / React Native",
      "Live GPS Geolocation Tracking & Map Polyline",
      "Instant Push Notifications via FCM / OneSignal",
      "Offline SQLite Sync for Zero-connectivity Operations",
      "Biometric FaceID / Fingerprint Quick Authentication",
      "In-App Razorpay & UPI Seamless Deep-linking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "React Native / Flutter",
      "Next.js Backend",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "WebSockets"
    ],
    "developmentType": "Mobile App",
    "platform": "Mobile App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹69,999",
    "indicativePriceUsd": "$969",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": true,
    "viewsCount": 1895,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.155@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.155@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.155@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Doctor Booking App Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Doctor Booking App. Built by StarX Alpha Labs with React Native / Flutter, Next.js Backend, Supabase. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "doctor booking app",
        "mobile apps & customer platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 156,
    "name": "Education App",
    "slug": "education-app",
    "categoryNumber": 12,
    "categoryName": "Mobile Apps & Customer Platforms",
    "categorySlug": "mobile-apps",
    "shortDescription": "Enterprise-ready Education App engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Education App is a comprehensive, production-tested software solution purpose-built for On-demand hyper-local startups, mobile-first businesses & field team operations. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "On-demand hyper-local startups, mobile-first businesses & field team operations",
    "mainFeatures": [
      "Native iOS & Android Performance via Flutter / React Native",
      "Live GPS Geolocation Tracking & Map Polyline",
      "Instant Push Notifications via FCM / OneSignal",
      "Offline SQLite Sync for Zero-connectivity Operations",
      "Biometric FaceID / Fingerprint Quick Authentication",
      "In-App Razorpay & UPI Seamless Deep-linking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "React Native / Flutter",
      "Next.js Backend",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "WebSockets"
    ],
    "developmentType": "Mobile App",
    "platform": "Mobile App",
    "estimatedDevelopmentTime": "3-4 Weeks",
    "indicativeStartingPrice": "₹69,999",
    "indicativePriceUsd": "$969",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": true,
    "isEcommerce": true,
    "isErpCrm": false,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1932,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.156@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.156@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.156@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Education App Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Education App. Built by StarX Alpha Labs with React Native / Flutter, Next.js Backend, Supabase. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "education app",
        "mobile apps & customer platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 157,
    "name": "Employee App",
    "slug": "employee-app",
    "categoryNumber": 12,
    "categoryName": "Mobile Apps & Customer Platforms",
    "categorySlug": "mobile-apps",
    "shortDescription": "Enterprise-ready Employee App engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Employee App is a comprehensive, production-tested software solution purpose-built for On-demand hyper-local startups, mobile-first businesses & field team operations. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "On-demand hyper-local startups, mobile-first businesses & field team operations",
    "mainFeatures": [
      "Native iOS & Android Performance via Flutter / React Native",
      "Live GPS Geolocation Tracking & Map Polyline",
      "Instant Push Notifications via FCM / OneSignal",
      "Offline SQLite Sync for Zero-connectivity Operations",
      "Biometric FaceID / Fingerprint Quick Authentication",
      "In-App Razorpay & UPI Seamless Deep-linking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "React Native / Flutter",
      "Next.js Backend",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "WebSockets"
    ],
    "developmentType": "Mobile App",
    "platform": "Mobile App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹59,999",
    "indicativePriceUsd": "$829",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1969,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.157@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.157@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.157@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Employee App Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Employee App. Built by StarX Alpha Labs with React Native / Flutter, Next.js Backend, Supabase. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "employee app",
        "mobile apps & customer platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 158,
    "name": "Delivery Partner App",
    "slug": "delivery-partner-app",
    "categoryNumber": 12,
    "categoryName": "Mobile Apps & Customer Platforms",
    "categorySlug": "mobile-apps",
    "shortDescription": "Enterprise-ready Delivery Partner App engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Delivery Partner App is a comprehensive, production-tested software solution purpose-built for On-demand hyper-local startups, mobile-first businesses & field team operations. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "On-demand hyper-local startups, mobile-first businesses & field team operations",
    "mainFeatures": [
      "Native iOS & Android Performance via Flutter / React Native",
      "Live GPS Geolocation Tracking & Map Polyline",
      "Instant Push Notifications via FCM / OneSignal",
      "Offline SQLite Sync for Zero-connectivity Operations",
      "Biometric FaceID / Fingerprint Quick Authentication",
      "In-App Razorpay & UPI Seamless Deep-linking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "React Native / Flutter",
      "Next.js Backend",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "WebSockets"
    ],
    "developmentType": "Mobile App",
    "platform": "Mobile App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹59,999",
    "indicativePriceUsd": "$829",
    "availabilityStatus": "Live Demo",
    "isAiEnabled": false,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 2006,
    "rating": 5,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.158@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.158@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.158@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Delivery Partner App Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Delivery Partner App. Built by StarX Alpha Labs with React Native / Flutter, Next.js Backend, Supabase. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "delivery partner app",
        "mobile apps & customer platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 159,
    "name": "Customer Loyalty App",
    "slug": "customer-loyalty-app",
    "categoryNumber": 12,
    "categoryName": "Mobile Apps & Customer Platforms",
    "categorySlug": "mobile-apps",
    "shortDescription": "Enterprise-ready Customer Loyalty App engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Customer Loyalty App is a comprehensive, production-tested software solution purpose-built for On-demand hyper-local startups, mobile-first businesses & field team operations. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "On-demand hyper-local startups, mobile-first businesses & field team operations",
    "mainFeatures": [
      "Native iOS & Android Performance via Flutter / React Native",
      "Live GPS Geolocation Tracking & Map Polyline",
      "Instant Push Notifications via FCM / OneSignal",
      "Offline SQLite Sync for Zero-connectivity Operations",
      "Biometric FaceID / Fingerprint Quick Authentication",
      "In-App Razorpay & UPI Seamless Deep-linking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "React Native / Flutter",
      "Next.js Backend",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "WebSockets"
    ],
    "developmentType": "Mobile App",
    "platform": "Mobile App",
    "estimatedDevelopmentTime": "2-3 Weeks",
    "indicativeStartingPrice": "₹49,999",
    "indicativePriceUsd": "$699",
    "availabilityStatus": "Under Development",
    "isAiEnabled": false,
    "isEcommerce": true,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1203,
    "rating": 4.8,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.159@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.159@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.159@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Customer Loyalty App Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Customer Loyalty App. Built by StarX Alpha Labs with React Native / Flutter, Next.js Backend, Supabase. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "customer loyalty app",
        "mobile apps & customer platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  },
  {
    "id": 160,
    "name": "Business Owner App",
    "slug": "business-owner-app",
    "categoryNumber": 12,
    "categoryName": "Mobile Apps & Customer Platforms",
    "categorySlug": "mobile-apps",
    "shortDescription": "Enterprise-ready Business Owner App engineered by StarX Alpha Labs with real-time operations, role-based workflows, and scalable cloud architecture.",
    "fullDescription": "The StarX Alpha Labs Business Owner App is a comprehensive, production-tested software solution purpose-built for On-demand hyper-local startups, mobile-first businesses & field team operations. Designed to eliminate operational bottlenecks, it pairs a frictionless public interface with an intelligent administrative backbone, offering multi-tenant scalability, granular permission matrices, and robust reporting out of the box.",
    "suitableFor": "On-demand hyper-local startups, mobile-first businesses & field team operations",
    "mainFeatures": [
      "Native iOS & Android Performance via Flutter / React Native",
      "Live GPS Geolocation Tracking & Map Polyline",
      "Instant Push Notifications via FCM / OneSignal",
      "Offline SQLite Sync for Zero-connectivity Operations",
      "Biometric FaceID / Fingerprint Quick Authentication",
      "In-App Razorpay & UPI Seamless Deep-linking"
    ],
    "modules": [
      {
        "name": "Public Customer Facing Portal",
        "description": "Intuitive, high-performance web experience optimized for discovery, conversions, and customer engagement.",
        "roles": [
          "customer",
          "guest"
        ],
        "keyFeatures": [
          "Mobile-first responsive design",
          "Instant search and discovery",
          "Frictionless checkout / enquiry",
          "Account self-service hub"
        ]
      },
      {
        "name": "Command Center Admin Console",
        "description": "Centralized administrative dashboard for owners and managers to monitor live telemetry, users, and transactions.",
        "roles": [
          "admin"
        ],
        "keyFeatures": [
          "Real-time KPI telemetry",
          "Comprehensive catalog and record CRUD",
          "Staff role permission matrix",
          "System audit trails & export"
        ]
      },
      {
        "name": "Operational Staff / Vendor Portal",
        "description": "Dedicated workspace tailored for staff, technicians, vendors, or instructors with restricted access.",
        "roles": [
          "staff",
          "vendor"
        ],
        "keyFeatures": [
          "Task queues and fulfillment lists",
          "Real-time status updates",
          "Direct customer communication",
          "Performance analytics"
        ]
      }
    ],
    "techStack": [
      "React Native / Flutter",
      "Next.js Backend",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "WebSockets"
    ],
    "developmentType": "Mobile App",
    "platform": "Mobile App",
    "estimatedDevelopmentTime": "3 Weeks",
    "indicativeStartingPrice": "₹64,999",
    "indicativePriceUsd": "$899",
    "availabilityStatus": "Offline Ready",
    "isAiEnabled": true,
    "isEcommerce": false,
    "isErpCrm": true,
    "isFreeDemoAvailable": true,
    "isFeatured": false,
    "isPopular": false,
    "viewsCount": 1240,
    "rating": 4.8999999999999995,
    "offlineReady": true,
    "sampleRoles": [
      {
        "role": "admin",
        "label": "System Administrator",
        "email": "admin.160@starxalphalabs.io",
        "passwordHint": "admin@starx123",
        "permissions": [
          "Full Access",
          "Financial Reports",
          "User Management",
          "System Config"
        ]
      },
      {
        "role": "customer",
        "label": "Verified Customer",
        "email": "customer.160@example.com",
        "passwordHint": "customer@pass123",
        "permissions": [
          "Browse Catalog",
          "Place Orders / Enquiries",
          "Track Status",
          "Profile Settings"
        ]
      },
      {
        "role": "staff",
        "label": "Operational Staff",
        "email": "staff.160@starxalphalabs.io",
        "passwordHint": "staff@starx123",
        "permissions": [
          "Process Queue",
          "Update Ticket Status",
          "View Daily Summary"
        ]
      }
    ],
    "screenshots": [
      "/images/demos/screen-1.png",
      "/images/demos/screen-2.png",
      "/images/demos/screen-3.png"
    ],
    "videoThumbnail": "/images/demos/video-thumb.png",
    "videoDuration": "3:45",
    "seo": {
      "title": "Business Owner App Demo — StarX Alpha Labs",
      "description": "Explore live interactive demo of Business Owner App. Built by StarX Alpha Labs with React Native / Flutter, Next.js Backend, Supabase. Explore features, role portals, and get instant quotation.",
      "keywords": [
        "business owner app",
        "mobile apps & customer platforms",
        "custom software demo",
        "starx alpha labs",
        "enterprise web application"
      ]
    }
  }
];

export function getAllDemos(): DemoModel[] {
  return ALL_DEMOS;
}

export function getDemoBySlug(slug: string): DemoModel | undefined {
  return ALL_DEMOS.find((d) => d.slug === slug);
}

export function getDemoById(id: number): DemoModel | undefined {
  return ALL_DEMOS.find((d) => d.id === id);
}

export function getDemosByCategory(categorySlug: string): DemoModel[] {
  return ALL_DEMOS.filter((d) => d.categorySlug === categorySlug);
}

export function getFeaturedDemos(): DemoModel[] {
  return ALL_DEMOS.filter((d) => d.isFeatured);
}

export function getPopularDemos(): DemoModel[] {
  return ALL_DEMOS.filter((d) => d.isPopular || d.isFeatured);
}

export function getRelatedDemos(currentDemo: DemoModel, count: number = 4): DemoModel[] {
  return ALL_DEMOS
    .filter((d) => d.categorySlug === currentDemo.categorySlug && d.id !== currentDemo.id)
    .slice(0, count);
}
