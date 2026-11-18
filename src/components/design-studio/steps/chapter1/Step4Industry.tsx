"use client";

import React, { useState } from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import { IndustrySlug } from "../../types";
import {
  ShoppingBag,
  Utensils,
  HeartPulse,
  GraduationCap,
  Building,
  Car,
  Truck,
  Factory,
  Landmark,
  Sparkles,
  Plane,
  Laptop,
  Check,
  Search,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface IndustryItem {
  slug: IndustrySlug;
  name: string;
  tagline: string;
  examples: string[];
  icon: React.ElementType;
  badge: string;
}

const INDUSTRIES: IndustryItem[] = [
  {
    slug: "retail",
    name: "Retail & Commerce",
    tagline: "Omnichannel, marketplaces & digital storefronts",
    examples: ["Direct-to-Consumer", "Multi-Vendor Marketplaces", "B2B Wholesale"],
    icon: ShoppingBag,
    badge: "High Demand",
  },
  {
    slug: "food-hospitality",
    name: "Food & Hospitality",
    tagline: "Restaurants, cloud kitchens & hotel management",
    examples: ["Table Ordering & POS", "Kitchen Display Systems", "Guest Bookings"],
    icon: Utensils,
    badge: "Popular",
  },
  {
    slug: "healthcare",
    name: "Healthcare & Life Sciences",
    tagline: "HIPAA-ready clinical systems, telemed & diagnostics",
    examples: ["Patient Portals", "Telehealth Consultations", "EHR Sync"],
    icon: HeartPulse,
    badge: "Regulated",
  },
  {
    slug: "education",
    name: "Education & EdTech",
    tagline: "LMS, live classrooms & student assessment engines",
    examples: ["Course Portals", "Interactive Tutoring", "Institutional Dashboards"],
    icon: GraduationCap,
    badge: "Growth",
  },
  {
    slug: "real-estate",
    name: "Real Estate & Infrastructure",
    tagline: "PropTech, MLS sync, tenant portals & listings",
    examples: ["Virtual Tour Portals", "Property Management", "Lease Workflows"],
    icon: Building,
    badge: "PropTech",
  },
  {
    slug: "automotive",
    name: "Automotive & Mobility",
    tagline: "Fleet management, EV telemetry & dealership software",
    examples: ["Fleet Tracking", "Vehicle Rental Flow", "Dealership POS"],
    icon: Car,
    badge: "Mobility",
  },
  {
    slug: "logistics",
    name: "Logistics & Supply Chain",
    tagline: "End-to-end dispatch, routing & warehouse tracking",
    examples: ["Real-time Driver Dispatch", "Freight Billing", "Warehouse Inventory"],
    icon: Truck,
    badge: "Logistics",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Industrial",
    tagline: "Shop-floor MES, machinery telemetry & supply ops",
    examples: ["Equipment Maintenance", "Assembly Monitoring", "Supplier Portal"],
    icon: Factory,
    badge: "Industry 4.0",
  },
  {
    slug: "finance",
    name: "Finance & Professional Services",
    tagline: "FinTech, wealth advisory, accounting & payments",
    examples: ["Wealth Portals", "Payment Gateways", "Audit & Compliance Dashboards"],
    icon: Landmark,
    badge: "FinTech",
  },
  {
    slug: "beauty-lifestyle",
    name: "Beauty, Fitness & Lifestyle",
    tagline: "Booking engines, membership platforms & wellness",
    examples: ["Salon Appointments", "Gym Membership Subscriptions", "Wellness Portals"],
    icon: Sparkles,
    badge: "Lifestyle",
  },
  {
    slug: "travel-events",
    name: "Travel, Tourism & Events",
    tagline: "Flight/hotel aggregation, itineraries & event ticketing",
    examples: ["Tour Booking Engines", "Dynamic Itinerary Planners", "QR Ticketing"],
    icon: Plane,
    badge: "Travel",
  },
  {
    slug: "technology",
    name: "Technology & Digital Enterprises",
    tagline: "SaaS developer tools, AI startups & cloud utilities",
    examples: ["Developer Platforms", "AI Automation Portals", "Data Pipelines"],
    icon: Laptop,
    badge: "Tech & Cloud",
  },
];

export function Step4Industry() {
  const { state, setIndustry, nextStep } = useDesignStudio();
  const selectedSlug = state.industry;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIndustries = INDUSTRIES.filter((ind) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      ind.name.toLowerCase().includes(q) ||
      ind.tagline.toLowerCase().includes(q) ||
      ind.examples.some((ex) => ex.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Chapter 1 • Step 4 of 16
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          Which Industry Are You Building For?
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Selecting your sector informs Google Stitch design tokens, industry UX workflows, and regulatory compliance considerations.
        </p>

        {/* Search bar */}
        <div className="pt-2 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search industries, keywords or examples..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
            />
          </div>
        </div>
      </div>

      {/* 12 Industries Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIndustries.map((ind) => {
          const isSelected = selectedSlug === ind.slug;
          const Icon = ind.icon;

          return (
            <div
              key={ind.slug}
              onClick={() => setIndustry(ind.slug)}
              className={`group relative rounded-xl p-5 transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                isSelected
                  ? "bg-gradient-to-b from-cyan-500/15 via-blue-500/5 to-transparent border-cyan-400 shadow-[0_0_25px_rgba(0,217,255,0.2)] ring-1 ring-cyan-400"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,217,255,0.4)]"
                        : "bg-white/5 text-zinc-400 border border-white/10 group-hover:text-zinc-200"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                    {ind.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-snug">
                    {ind.tagline}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1">
                  {ind.examples.map((ex, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.03] text-zinc-400 border border-white/5"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 group-hover:text-zinc-300">
                  {isSelected ? "Selected Sector" : "Select Sector"}
                </span>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors ${
                    isSelected
                      ? "bg-cyan-400 text-black font-bold"
                      : "border border-zinc-600 group-hover:border-zinc-400"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>
            Selected Sector:{" "}
            <strong className="text-white">
              {INDUSTRIES.find((i) => i.slug === selectedSlug)?.name || "Not selected"}
            </strong>
          </span>
        </div>

        <button
          type="button"
          onClick={nextStep}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer"
        >
          <span>Complete Chapter 1 & Understand Your Idea</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
