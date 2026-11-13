"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { DemoProductDefinition } from "../../types";
import { useDemoState } from "../../state/useDemoState";
import {
  Monitor,
  Smartphone,
  ChefHat,
  BarChart3,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Flame,
  Wine,
  CreditCard,
  Bell,
  Layers,
  ShieldCheck,
  RotateCcw,
  Plus,
  Send,
  Calendar,
  Users,
  QrCode,
  Tag,
  AlertTriangle,
  Info,
  ChevronRight,
  ExternalLink,
  Laptop
} from "lucide-react";

// =============================================================================
// TYPES & DATA STRUCTURES
// =============================================================================

export type EcosystemSurface = "web" | "mobile" | "kds" | "analytics";
export type EcosystemPersona = "guest" | "chef" | "director";
export type KitchenStation = "all" | "grill" | "robata" | "bar" | "garde-manger";

export interface EcosystemTicket {
  id: string;
  source: "Web Experience" | "Mobile App (Table 14)" | "In-Room Concierge";
  customerName: string;
  vipTier: "Noir VIP" | "Gold Reserve" | "Standard";
  station: "grill" | "robata" | "bar" | "garde-manger";
  items: { name: string; qty: number; notes?: string }[];
  status: "incoming" | "in-prep" | "plated" | "dispatched";
  createdAt: string;
  elapsedMinutes: number;
  tableNumber?: string;
  allergens: string[];
}

interface EcosystemState {
  tickets: EcosystemTicket[];
  loyaltyPoints: number;
  lifetimeSpend: number;
  syncEvents: { id: string; time: string; message: string; surface: string }[];
}

const INITIAL_TICKETS: EcosystemTicket[] = [
  {
    id: "OD-401",
    source: "Mobile App (Table 14)",
    customerName: "Elena Rostova",
    vipTier: "Noir VIP",
    station: "robata",
    items: [
      { name: "A5 Miyazaki Wagyu Skewer", qty: 2, notes: "Tare glaze, medium rare" },
      { name: "Charred King Oyster Mushroom", qty: 1, notes: "Ponzu brown butter" },
    ],
    status: "in-prep",
    createdAt: "19:42",
    elapsedMinutes: 8,
    tableNumber: "T-14",
    allergens: ["Gluten-Free"],
  },
  {
    id: "OD-402",
    source: "Web Experience",
    customerName: "Arthur Kensington",
    vipTier: "Gold Reserve",
    station: "bar",
    items: [
      { name: "Smoked Yuzu Highball", qty: 2, notes: "Artisan hand-carved ice sphere" },
      { name: "Chai Spice Old Fashioned", qty: 1, notes: "Single barrel bourbon" },
    ],
    status: "incoming",
    createdAt: "19:47",
    elapsedMinutes: 3,
    tableNumber: "Lounge 3",
    allergens: [],
  },
  {
    id: "OD-403",
    source: "Mobile App (Table 14)",
    customerName: "Elena Rostova",
    vipTier: "Noir VIP",
    station: "garde-manger",
    items: [
      { name: "Hokkaido Scallop Crudo", qty: 1, notes: "Finger lime, white soy, shiso" },
    ],
    status: "plated",
    createdAt: "19:35",
    elapsedMinutes: 15,
    tableNumber: "T-14",
    allergens: ["Shellfish"],
  },
];

const INITIAL_STATE: EcosystemState = {
  tickets: INITIAL_TICKETS,
  loyaltyPoints: 4850,
  lifetimeSpend: 142500,
  syncEvents: [
    {
      id: "ev-1",
      time: "19:42:10",
      message: "Mobile order placed at Table 14: Routed to Robata Station",
      surface: "Mobile App",
    },
    {
      id: "ev-2",
      time: "19:47:04",
      message: "Web Pre-Dinner Cocktails booked for Lounge 3: Routed to Bar KDS",
      surface: "Web Showcase",
    },
  ],
};

interface OmniDineEcosystemAppProps {
  product: DemoProductDefinition;
}

export function OmniDineEcosystemApp({ product }: OmniDineEcosystemAppProps) {
  const { state: demoState, setState: setDemoState, resetState: resetDemoState } = useDemoState<EcosystemState>(
    product.slug,
    INITIAL_STATE
  );

  const [activeSurface, setActiveSurface] = useState<EcosystemSurface>("web");
  const [activePersona, setActivePersona] = useState<EcosystemPersona>("guest");
  const [kdsFilter, setKdsFilter] = useState<KitchenStation>("all");
  const [webReservationSuccess, setWebReservationSuccess] = useState(false);
  const [mobileCartNotice, setMobileCartNotice] = useState<string | null>(null);

  // Filter KDS tickets
  const filteredTickets = useMemo(() => {
    if (kdsFilter === "all") return demoState.tickets;
    return demoState.tickets.filter((t: EcosystemTicket) => t.station === kdsFilter);
  }, [demoState.tickets, kdsFilter]);

  // Action: Place new order from Mobile
  const handleMobileOrder = (dishName: string, station: "grill" | "robata" | "bar" | "garde-manger", price: number) => {
    const newId = `OD-${Math.floor(400 + Math.random() * 90)}`;
    const newTicket: EcosystemTicket = {
      id: newId,
      source: "Mobile App (Table 14)",
      customerName: "Elena Rostova",
      vipTier: "Noir VIP",
      station: station,
      items: [{ name: dishName, qty: 1 }],
      status: "incoming",
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      elapsedMinutes: 1,
      tableNumber: "T-14",
      allergens: [],
    };

    const newSyncEvent = {
      id: `ev-${Date.now()}`,
      time: new Date().toLocaleTimeString(),
      message: `Table 14 ordered ${dishName} via Mobile. Dispatched to ${station.toUpperCase()} station.`,
      surface: "Mobile Guest App",
    };

    setDemoState({
      ...demoState,
      tickets: [newTicket, ...demoState.tickets],
      loyaltyPoints: demoState.loyaltyPoints + Math.round(price * 0.1),
      lifetimeSpend: demoState.lifetimeSpend + price,
      syncEvents: [newSyncEvent, ...demoState.syncEvents.slice(0, 9)],
    });

    setMobileCartNotice(`Order #${newId} placed! Synced to Kitchen Display.`);
    setTimeout(() => setMobileCartNotice(null), 4000);
  };

  // Action: Book VIP Experience from Web
  const handleWebBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `OD-${Math.floor(500 + Math.random() * 90)}`;
    const newTicket: EcosystemTicket = {
      id: newId,
      source: "Web Experience",
      customerName: "Arthur Kensington",
      vipTier: "Gold Reserve",
      station: "bar",
      items: [{ name: "Omakase Cocktail Tasting (3-Course)", qty: 2 }],
      status: "incoming",
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      elapsedMinutes: 1,
      tableNumber: "Chef Counter",
      allergens: [],
    };

    const newSyncEvent = {
      id: `ev-${Date.now()}`,
      time: new Date().toLocaleTimeString(),
      message: `Web Reservation Confirmed: Omakase Tasting ticket #${newId} dispatched to Bar KDS.`,
      surface: "Web Showcase",
    };

    setDemoState({
      ...demoState,
      tickets: [newTicket, ...demoState.tickets],
      syncEvents: [newSyncEvent, ...demoState.syncEvents.slice(0, 9)],
    });

    setWebReservationSuccess(true);
    setTimeout(() => setWebReservationSuccess(false), 5000);
  };

  // Action: Bump KDS ticket status
  const handleBumpTicket = (ticketId: string) => {
    const updated = demoState.tickets.map((t) => {
      if (t.id !== ticketId) return t;
      let nextStatus: EcosystemTicket["status"] = "in-prep";
      if (t.status === "incoming") nextStatus = "in-prep";
      else if (t.status === "in-prep") nextStatus = "plated";
      else if (t.status === "plated") nextStatus = "dispatched";
      return { ...t, status: nextStatus };
    });

    const targetTicket = demoState.tickets.find((t) => t.id === ticketId);
    const newSyncEvent = {
      id: `ev-${Date.now()}`,
      time: new Date().toLocaleTimeString(),
      message: `KDS Ticket #${ticketId} bumped to next stage. Client status refreshed.`,
      surface: "Kitchen Display (KDS)",
    };

    setDemoState({
      ...demoState,
      tickets: updated,
      syncEvents: [newSyncEvent, ...demoState.syncEvents.slice(0, 9)],
    });
  };

  return (
    <div className="min-h-screen bg-[#060D17] text-slate-100 flex flex-col font-sans selection:bg-[#1E7ECA] selection:text-white">
      {/* Top Universal Ecosystem Bar */}
      <header className="sticky top-0 z-50 bg-[#081528]/95 backdrop-blur-md border-b border-[#143054] px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href={`/demos/${product.categorySlug}/${product.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-[#0C1E36] border border-[#173863] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Blueprint</span>
            </Link>
            <div className="h-4 w-px bg-slate-700 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                  OMNIDINE
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#1769AA]/40 text-[#73D8FF] border border-[#1E7ECA]/40">
                  Digital Ecosystem
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">
                Synchronized 3-Surface Suite â€¢ Web Portal + Native Mobile + Real-Time Kitchen KDS
              </p>
            </div>
          </div>

          {/* Surface Switcher Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-[#0B1A30] border border-[#173863]">
            <button
              onClick={() => setActiveSurface("web")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSurface === "web"
                  ? "bg-[#1769AA] text-white shadow-md shadow-[#1769AA]/40"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Web Portal</span>
            </button>
            <button
              onClick={() => setActiveSurface("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSurface === "mobile"
                  ? "bg-[#1769AA] text-white shadow-md shadow-[#1769AA]/40"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Guest App</span>
            </button>
            <button
              onClick={() => setActiveSurface("kds")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSurface === "kds"
                  ? "bg-[#1769AA] text-white shadow-md shadow-[#1769AA]/40"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>Kitchen KDS</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300">
                {demoState.tickets.length}
              </span>
            </button>
            <button
              onClick={() => setActiveSurface("analytics")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSurface === "analytics"
                  ? "bg-[#1769AA] text-white shadow-md shadow-[#1769AA]/40"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Omni-Analytics</span>
            </button>
          </div>

          {/* Reset Sandbox */}
          <button
            onClick={() => resetDemoState()}
            title="Reset Simulated State"
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1 rounded bg-[#0A172A] border border-[#16345A]"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden lg:inline">Reset Sandbox</span>
          </button>
        </div>
      </header>

      {/* Real-time Omnichannel Live Sync Ticker */}
      <div className="bg-[#050B14] border-b border-[#10243E] px-4 py-1.5 text-xs flex items-center justify-between gap-4 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Live OmniSync Bus
          </span>
        </div>
        <div className="truncate text-[11px] text-slate-300 flex-1">
          {demoState.syncEvents[0] ? (
            <span>
              <strong className="text-[#73D8FF]">[{demoState.syncEvents[0].surface}]</strong>{" "}
              {demoState.syncEvents[0].message}{" "}
              <span className="text-slate-500 font-mono">({demoState.syncEvents[0].time})</span>
            </span>
          ) : (
            "Connected to local omnichannel message broker."
          )}
        </div>
        <div className="text-[11px] font-mono text-slate-400 shrink-0 hidden sm:flex items-center gap-3">
          <span>
            Noir Loyalty: <strong className="text-amber-400">{demoState.loyaltyPoints} pts</strong>
          </span>
          <span>
            Spend: <strong className="text-emerald-400">â‚¹{demoState.lifetimeSpend.toLocaleString()}</strong>
          </span>
        </div>
      </div>

      {/* Main Surface Viewport */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {/* ========================================================================= */}
        {/* SURFACE 1: BRANDED WEB PORTAL */}
        {/* ========================================================================= */}
        {activeSurface === "web" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0E1E38] via-[#12284C] to-[#0A162B] border border-[#1E4373] p-8 sm:p-12 shadow-2xl">
              <div className="max-w-2xl space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  <Wine className="w-3.5 h-3.5" />
                  <span>The Grand Dining Collective</span>
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Three Concepts. One Seamless Culinary Horizon.
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Welcome to OmniDine Collective. Book your chef counter experience at Kuro Robata, reserve an intimate terrace dinner at Aura, or unlock exclusive seasonal cellar tastings with single sign-on cross-venue loyalty.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="#reserve"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#1F7ECB] hover:from-[#1E7ECA] hover:to-[#32A9E8] text-white font-bold text-xs shadow-lg shadow-[#1769AA]/40 flex items-center gap-2"
                  >
                    <span>Reserve Tasting Experience</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setActiveSurface("mobile")}
                    className="px-5 py-2.5 rounded-xl bg-[#0F243E] hover:bg-[#163359] text-slate-200 font-semibold text-xs border border-[#1F4677] flex items-center gap-2"
                  >
                    <Smartphone className="w-4 h-4 text-[#73D8FF]" />
                    <span>View Guest Mobile Companion</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Venues Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#091527] border border-[#173863] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                  KR
                </div>
                <h3 className="text-lg font-bold text-white">Kuro Robata & Bar</h3>
                <p className="text-xs text-slate-400">
                  Modern Japanese charcoal hearth cooking, dry-aged Wagyu, and rare single-malt pairings.
                </p>
                <div className="text-[11px] text-emerald-400 font-mono">Open for Dinner â€¢ 12 Seats Available</div>
              </div>

              <div className="p-6 rounded-2xl bg-[#091527] border border-[#173863] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
                  AT
                </div>
                <h3 className="text-lg font-bold text-white">Aura Rooftop Terrace</h3>
                <p className="text-xs text-slate-400">
                  Panoramic city skyline views, Mediterranean coastal small plates, and botanical cocktails.
                </p>
                <div className="text-[11px] text-emerald-400 font-mono">Live Jazz Sunset â€¢ 4 Tables Open</div>
              </div>

              <div className="p-6 rounded-2xl bg-[#091527] border border-[#173863] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                  BC
                </div>
                <h3 className="text-lg font-bold text-white">The Brass Cellar</h3>
                <p className="text-xs text-slate-400">
                  Underground private dining sanctuary featuring 1,200 curated labels and sommelier tables.
                </p>
                <div className="text-[11px] text-purple-400 font-mono">Private Hire Only â€¢ By Appointment</div>
              </div>
            </div>

            {/* Reservation Form that pushes to live KDS */}
            <div id="reserve" className="p-8 rounded-3xl bg-[#091629] border border-[#173863] space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#32A9E8]" />
                    <span>Cross-Venue Tasting Reservation</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Book an omakase experience. This web transaction instantly dispatches a prep card to the live Kitchen KDS.
                  </p>
                </div>
                {webReservationSuccess && (
                  <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Reservation Ticket Dispatched to Kitchen Display!</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleWebBooking} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Dining Concept</label>
                  <select className="w-full bg-[#050D1A] border border-[#173863] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#32A9E8]">
                    <option>Kuro Robata (Chef Counter)</option>
                    <option>Aura Rooftop (Terrace Cabana)</option>
                    <option>The Brass Cellar (Private Vault)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Guests</label>
                  <select className="w-full bg-[#050D1A] border border-[#173863] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#32A9E8]">
                    <option>2 Guests (Omakase Duo)</option>
                    <option>4 Guests (Executive Table)</option>
                    <option>6 Guests (Chef Suite)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Tasting Experience</label>
                  <select className="w-full bg-[#050D1A] border border-[#173863] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#32A9E8]">
                    <option>7-Course Robata Symphony (â‚¹4,500/guest)</option>
                    <option>5-Course Coastal Botanical (â‚¹3,800/guest)</option>
                    <option>Grand Cellar Reserve Pairing (â‚¹6,200/guest)</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#1769AA] hover:bg-[#1E7ECA] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm & Sync with Kitchen</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SURFACE 2: NATIVE MOBILE GUEST APP */}
        {/* ========================================================================= */}
        {activeSurface === "mobile" && (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-4 animate-fadeIn">
            {/* Phone Frame Simulator */}
            <div className="w-full max-w-[360px] h-[720px] bg-[#03070E] rounded-[48px] border-[10px] border-[#132238] shadow-2xl relative flex flex-col overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-5 bg-[#132238] rounded-b-2xl z-40 flex items-center justify-center">
                <div className="w-12 h-1 bg-[#050B14] rounded-full" />
              </div>

              {/* Status bar */}
              <div className="pt-6 px-6 pb-2 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>19:48</span>
                <div className="flex items-center gap-1.5">
                  <span>5G</span>
                  <div className="w-4 h-2 border border-slate-400 rounded-sm p-0.5">
                    <div className="w-full h-full bg-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Mobile Content Scrollable */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 text-xs">
                {/* VIP Digital Member Pass */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1C2C47] to-[#0D1A30] border border-[#274B7F] shadow-lg text-white space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#73D8FF]">
                      OMNIDINE NOIR
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold">
                      DIAMOND VIP
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-sm font-extrabold">Elena Rostova</div>
                      <div className="text-[10px] text-slate-300">Table 14 â€¢ Kuro Robata</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-amber-400">{demoState.loyaltyPoints}</div>
                      <div className="text-[9px] text-slate-400">Reward Pts</div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-700/50 flex justify-between text-[10px] text-slate-300">
                    <span>Apple Wallet Synced</span>
                    <span className="text-emerald-400 font-mono">Active Session</span>
                  </div>
                </div>

                {mobileCartNotice && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold animate-pulse">
                    {mobileCartNotice}
                  </div>
                )}

                {/* Tableside Quick Order Actions */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-xs">Tableside Add-Ons</span>
                    <span className="text-[10px] text-[#32A9E8]">Live to Robata KDS</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-[#0A1728] border border-[#16345A] flex items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-white text-xs">Truffle Edamame</div>
                        <div className="text-[10px] text-slate-400">Maldon smoked salt, white truffle oil</div>
                        <div className="text-[11px] text-[#73D8FF] font-semibold mt-0.5">â‚¹550</div>
                      </div>
                      <button
                        onClick={() => handleMobileOrder("Truffle Edamame", "garde-manger", 550)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#1769AA] hover:bg-[#1E7ECA] text-white font-bold text-[11px] flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Order</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0A1728] border border-[#16345A] flex items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-white text-xs">A5 Wagyu Kushiyaki</div>
                        <div className="text-[10px] text-slate-400">Tare glaze, fresh wasabi stem</div>
                        <div className="text-[11px] text-[#73D8FF] font-semibold mt-0.5">â‚¹1,850</div>
                      </div>
                      <button
                        onClick={() => handleMobileOrder("A5 Wagyu Kushiyaki", "robata", 1850)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#1769AA] hover:bg-[#1E7ECA] text-white font-bold text-[11px] flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Order</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0A1728] border border-[#16345A] flex items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-white text-xs">Tokyo Drift Cocktail</div>
                        <div className="text-[10px] text-slate-400">Hibiki Japanese Harmony, matcha cream</div>
                        <div className="text-[11px] text-[#73D8FF] font-semibold mt-0.5">â‚¹1,200</div>
                      </div>
                      <button
                        onClick={() => handleMobileOrder("Tokyo Drift Cocktail", "bar", 1200)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#1769AA] hover:bg-[#1E7ECA] text-white font-bold text-[11px] flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Order</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Concierge & Service Call */}
                <div className="p-3 rounded-xl bg-[#0B1A2F] border border-[#1A3D68] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wine className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Call Sommelier</div>
                      <div className="text-[10px] text-slate-400">Cellar vintage recommendations</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileCartNotice("Sommelier paged. Arriving at Table 14.");
                      setTimeout(() => setMobileCartNotice(null), 3000);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#0F2847] text-[#73D8FF] font-semibold text-[10px] border border-[#1E7ECA]/40"
                  >
                    Page Staff
                  </button>
                </div>
              </div>

              {/* Mobile Bottom Navigation */}
              <div className="p-3 bg-[#0A1629] border-t border-[#132B4C] flex justify-around text-slate-400 text-[10px]">
                <div className="text-[#32A9E8] font-bold flex flex-col items-center">
                  <QrCode className="w-4 h-4" />
                  <span>Table 14</span>
                </div>
                <div className="flex flex-col items-center">
                  <Flame className="w-4 h-4" />
                  <span>Menu</span>
                </div>
                <div className="flex flex-col items-center">
                  <Wine className="w-4 h-4" />
                  <span>Cellar</span>
                </div>
                <div className="flex flex-col items-center">
                  <CreditCard className="w-4 h-4" />
                  <span>Pay Bill</span>
                </div>
              </div>
            </div>

            {/* Explanatory Panel for Mobile Companion */}
            <div className="max-w-md space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/30">
                Native Guest Companion Architecture
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                Frictionless In-Venue Mobile Engagement
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When a guest sits down at Table 14 or scans the in-venue NFC tag, their mobile device automatically links with their active dining ticket. Tableside orders bypass server delays and feed directly into the kitchen station's bump queue.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Instant NFC/QR Table pairing with zero app install required.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Omnichannel Apple Wallet & Google Wallet pass integration.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Real-time split bill payment with tokenized card authorization.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveSurface("kds")}
                  className="px-4 py-2.5 rounded-xl bg-[#1769AA] hover:bg-[#1E7ECA] text-white font-bold text-xs flex items-center gap-2 shadow-lg"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>Switch to Kitchen KDS to View Dispatched Orders</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SURFACE 3: KITCHEN DISPLAY SYSTEM (KDS) */}
        {/* ========================================================================= */}
        {activeSurface === "kds" && (
          <div className="space-y-6 animate-fadeIn">
            {/* KDS Header Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#091527] border border-[#173863]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    OmniDine KDS â€” Service Bump Screen
                  </h2>
                  <p className="text-xs text-slate-400">
                    Direct routing from Web Reservations, Mobile Tableside, & In-Room Service
                  </p>
                </div>
              </div>

              {/* Station Filter */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#050D1A] border border-[#143054] text-xs">
                {(["all", "robata", "grill", "bar", "garde-manger"] as KitchenStation[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => setKdsFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-semibold uppercase text-[10px] transition-all ${
                      kdsFilter === st
                        ? "bg-[#1769AA] text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Tickets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                    ticket.status === "incoming"
                      ? "bg-[#121A2B] border-amber-500/50 shadow-lg shadow-amber-500/10"
                      : ticket.status === "in-prep"
                      ? "bg-[#09172B] border-[#1E7ECA]/60"
                      : ticket.status === "plated"
                      ? "bg-[#071F22] border-emerald-500/50"
                      : "bg-[#0A1422] border-slate-700/40 opacity-70"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs border-b border-slate-700/50 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold font-mono text-white text-sm">
                          {ticket.id}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded font-mono uppercase bg-[#173863] text-[#73D8FF]">
                          {ticket.tableNumber || "Direct"}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          ticket.status === "incoming"
                            ? "bg-amber-400/20 text-amber-300 animate-pulse"
                            : ticket.status === "in-prep"
                            ? "bg-sky-400/20 text-sky-300"
                            : ticket.status === "plated"
                            ? "bg-emerald-400/20 text-emerald-300"
                            : "bg-slate-700 text-slate-300"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-white flex items-center justify-between">
                        <span>{ticket.customerName}</span>
                        <span className="text-[10px] font-mono text-amber-400">{ticket.vipTier}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Source: <span className="text-slate-300">{ticket.source}</span> â€¢ Placed:{" "}
                        <span className="font-mono text-slate-300">{ticket.createdAt}</span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="p-3 rounded-xl bg-[#040A14] border border-[#10243E] space-y-2">
                      {ticket.items.map((item, idx) => (
                        <div key={idx} className="text-xs flex items-start justify-between gap-2">
                          <div>
                            <span className="font-bold text-white">
                              {item.qty}x {item.name}
                            </span>
                            {item.notes && (
                              <p className="text-[11px] text-amber-300/80 italic">{item.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {ticket.allergens.length > 0 && (
                      <div className="flex items-center gap-1.5 text-[10px] text-red-400 bg-red-500/10 px-2 py-1 rounded-lg border border-red-500/30">
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                        <span>Allergen Alert: {ticket.allergens.join(", ")}</span>
                      </div>
                    )}
                  </div>

                  {/* Bump Actions */}
                  <div className="pt-4 mt-2 border-t border-slate-700/40 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{ticket.elapsedMinutes}m elapsed</span>
                    </span>

                    <button
                      onClick={() => handleBumpTicket(ticket.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#1769AA] hover:bg-[#1E7ECA] text-white font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      <span>
                        {ticket.status === "incoming"
                          ? "Start Prep"
                          : ticket.status === "in-prep"
                          ? "Mark Plated"
                          : ticket.status === "plated"
                          ? "Bump / Expedited"
                          : "Closed"}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SURFACE 4: OMNI-ANALYTICS ENGINE */}
        {/* ========================================================================= */}
        {activeSurface === "analytics" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#091527] border border-[#173863] space-y-1">
                <span className="text-xs text-slate-400 font-medium">Daily Group GMV</span>
                <div className="text-2xl font-extrabold text-white">â‚¹4,82,500</div>
                <div className="text-[11px] text-emerald-400 font-mono">+18.4% vs previous Friday</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#091527] border border-[#173863] space-y-1">
                <span className="text-xs text-slate-400 font-medium">Channel Split</span>
                <div className="text-2xl font-extrabold text-[#73D8FF]">Mobile 58% / Web 42%</div>
                <div className="text-[11px] text-slate-400 font-mono">Zero third-party commission</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#091527] border border-[#173863] space-y-1">
                <span className="text-xs text-slate-400 font-medium">Average Check Size</span>
                <div className="text-2xl font-extrabold text-amber-400">â‚¹5,450</div>
                <div className="text-[11px] text-emerald-400 font-mono">+34% with tableside add-ons</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#091527] border border-[#173863] space-y-1">
                <span className="text-xs text-slate-400 font-medium">Active Dining Tickets</span>
                <div className="text-2xl font-extrabold text-emerald-400">
                  {demoState.tickets.length} Tables
                </div>
                <div className="text-[11px] text-slate-400 font-mono">11m avg preparation time</div>
              </div>
            </div>

            {/* Omnichannel Attribution & Cross-Venue Velocity */}
            <div className="p-6 rounded-3xl bg-[#091629] border border-[#173863] space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Omnichannel Event Stream & Cross-Venue Attribution
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#173863] text-slate-400 font-mono text-[11px]">
                      <th className="pb-2.5">Time</th>
                      <th className="pb-2.5">Surface Origin</th>
                      <th className="pb-2.5">Event Description</th>
                      <th className="pb-2.5">Target Destination</th>
                      <th className="pb-2.5">Sync Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#102540]">
                    {demoState.syncEvents.map((ev) => (
                      <tr key={ev.id} className="text-slate-300">
                        <td className="py-2.5 font-mono text-slate-400">{ev.time}</td>
                        <td className="py-2.5 font-semibold text-[#73D8FF]">{ev.surface}</td>
                        <td className="py-2.5">{ev.message}</td>
                        <td className="py-2.5 font-mono text-slate-400">Hospitality Cloud</td>
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            ACKNOWLEDGED
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Persistent Bottom Simulation Disclosure */}
      <footer className="mt-auto border-t border-[#10243E] bg-[#050B14] px-4 py-3 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Simulated Omnichannel Architecture:</strong> Cross-surface WebSockets, Apple Wallet pass generation, POS bridge hardware, and kitchen thermal printer protocols operate in a secure client sandbox with local state synchronization.
            </span>
          </div>
          <div className="font-mono text-slate-500 text-[10px]">
            StarX Alpha Labs â€¢ Product #166
          </div>
        </div>
      </footer>
    </div>
  );
}
