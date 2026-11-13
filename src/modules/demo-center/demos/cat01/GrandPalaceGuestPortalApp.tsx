"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { DemoProductDefinition } from "../../types";
import { useDemoState } from "../../state/useDemoState";
import {
  KeyRound,
  Utensils,
  Sparkles,
  ConciergeBell,
  Receipt,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Thermometer,
  Moon,
  Sun,
  Flame,
  Coffee,
  Wine,
  Plus,
  Minus,
  ShoppingBag,
  Trash2,
  Calendar,
  Send,
  Sliders,
  Settings,
  Car,
  Bed,
  Check,
  AlertCircle,
  HelpCircle,
  Phone,
  Hotel,
} from "lucide-react";

// =============================================================================
// DOMAIN MODELS & DATA
// =============================================================================

export interface MenuItem {
  id: string;
  name: string;
  category: "Breakfast" | "All-Day Dining" | "Late Night" | "Cellar & Bar";
  description: string;
  price: number;
  prepTime: string;
  calories: string;
  dietary: string[];
  image: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface SpaTreatment {
  id: string;
  title: string;
  duration: string;
  price: number;
  category: "Holistic Massages" | "Facial Treatments" | "Thermal & Hammam Rituals";
  description: string;
  therapists: string[];
  availableSlots: string[];
  image: string;
}

export interface ServiceRequest {
  id: string;
  category: "Housekeeping" | "Valet" | "Luggage" | "Concierge";
  item: string;
  requestedAt: string;
  estimatedArrival: string;
  status: "Requested" | "Dispatched" | "In Transit" | "Completed";
  notes?: string;
}

export interface FolioEntry {
  id: string;
  date: string;
  category: "Room & Taxes" | "In-Room Dining" | "Spa & Wellness" | "Mini Bar";
  description: string;
  amount: number;
}

interface GuestPortalState {
  guestName: string;
  suiteNumber: string;
  checkInDate: string;
  checkOutDate: string;
  suiteTemperature: number;
  activeLightingScene: "Daylight" | "Relaxed Evening" | "Candlelight" | "Sleep Sanctuary";
  activeTab: "overview" | "dining" | "spa" | "services" | "folio" | "admin-cockpit";
  cart: CartItem[];
  placedOrders: {
    id: string;
    time: string;
    items: CartItem[];
    total: number;
    estimatedDelivery: string;
    status: "Kitchen Preparing" | "En Route to Suite" | "Delivered";
  }[];
  bookedSpa: {
    id: string;
    treatmentTitle: string;
    therapist: string;
    date: string;
    time: string;
    price: number;
  }[];
  activeRequests: ServiceRequest[];
  folioCharges: FolioEntry[];
  isDoorUnlocked: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "din-01",
    name: "The Royal Benedict & Osetra Caviar",
    category: "Breakfast",
    description: "Poached pasture eggs on toasted brioche, smoked Scottish salmon, Champagne hollandaise, and 10g Royal Osetra.",
    price: 48,
    prepTime: "20-25 min",
    calories: "580 kcal",
    dietary: ["Pescatarian"],
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "din-02",
    name: "Pain Perdu Caramélisé & Berries",
    category: "Breakfast",
    description: "Fluffy artisanal brioche soaked in Bourbon vanilla custard, caramelized demerara crust, forest berries and maple emulsion.",
    price: 32,
    prepTime: "15-20 min",
    calories: "490 kcal",
    dietary: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "din-03",
    name: "Pan-Roasted Maine Lobster Tail",
    category: "All-Day Dining",
    description: "Butter-poached lobster tail served with saffron risotto, charred baby leeks, and coral tarragon reduction.",
    price: 74,
    prepTime: "30-35 min",
    calories: "620 kcal",
    dietary: ["Gluten-Free", "Pescatarian"],
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "din-04",
    name: "Prime Dry-Aged Filet Mignon (8 oz)",
    category: "All-Day Dining",
    description: "USDA Prime 35-day dry-aged beef tenderloin, truffle pomme purée, roasted bone marrow, and bordelaise jus.",
    price: 68,
    prepTime: "25-30 min",
    calories: "740 kcal",
    dietary: ["Gluten-Free"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "din-05",
    name: "Midnight Wagyu Smash Slider Trio",
    category: "Late Night",
    description: "A5 Miyazaki Wagyu patties, aged Gruyère, sweet onion jam, and truffle dijonnaise on house-baked milk buns.",
    price: 38,
    prepTime: "18-22 min",
    calories: "680 kcal",
    dietary: ["Halal Beef"],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "din-06",
    name: "Dom Pérignon Vintage 2013 Brut",
    category: "Cellar & Bar",
    description: "Crisp white peach, toasted hazelnut, and vibrating minerality delivered in chilled silver ice bucket.",
    price: 360,
    prepTime: "10-15 min",
    calories: "750 ml",
    dietary: ["Organic"],
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
  },
];

const SPA_TREATMENTS: SpaTreatment[] = [
  {
    id: "spa-01",
    title: "Imperial Hot Stone & Argan Therapeutic Ritual",
    duration: "90 Minutes",
    price: 260,
    category: "Holistic Massages",
    description: "Volcanic basalt stones infused with warm organic Moroccan argan oil to dissolve deep muscular tension.",
    therapists: ["Elena Vance (Senior Master)", "Julien Moreau (Deep Tissue Specialist)"],
    availableSlots: ["10:00 AM", "12:30 PM", "03:00 PM", "05:30 PM"],
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "spa-02",
    title: "Royal Rose Gold Cellular Facial",
    duration: "60 Minutes",
    price: 210,
    category: "Facial Treatments",
    description: "Swiss cellular oxygen therapy with 24k gold leaf infusion and Bulgarian rose essence for immediate radiant glow.",
    therapists: ["Marie-Claire Dubois", "Chantal Mercier"],
    availableSlots: ["11:00 AM", "01:30 PM", "04:00 PM", "06:00 PM"],
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "spa-03",
    title: "Traditional Hammam Eucalyptus Detox",
    duration: "75 Minutes",
    price: 230,
    category: "Thermal & Hammam Rituals",
    description: "Black olive soap exfoliation under steam arches followed by invigorating cold plunge and mint hydration.",
    therapists: ["Tariq Benali", "Elena Vance (Senior Master)"],
    availableSlots: ["09:30 AM", "02:00 PM", "04:30 PM"],
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80",
  },
];

const INITIAL_REQUESTS: ServiceRequest[] = [
  {
    id: "REQ-401",
    category: "Housekeeping",
    item: "Turndown Service & Extra Egyptian Cotton Towels",
    requestedAt: "17:45",
    estimatedArrival: "18:15",
    status: "In Transit",
    notes: "Please deliver before evening theater departure.",
  },
  {
    id: "REQ-402",
    category: "Valet",
    item: "Vehicle Retrieval — Silver Porsche Panamera",
    requestedAt: "18:00",
    estimatedArrival: "18:20",
    status: "Dispatched",
    notes: "Car prepared at main portico entrance.",
  },
];

const INITIAL_FOLIO: FolioEntry[] = [
  { id: "FOL-01", date: "Nov 12", category: "Room & Taxes", description: "Royal Penthouse Suite Night 1 of 3", amount: 1450 },
  { id: "FOL-02", date: "Nov 12", category: "In-Room Dining", description: "Welcome Sunset Champagne & Caviar Plate", amount: 185 },
  { id: "FOL-03", date: "Nov 13", category: "Room & Taxes", description: "Royal Penthouse Suite Night 2 of 3", amount: 1450 },
  { id: "FOL-04", date: "Nov 13", category: "Spa & Wellness", description: "Thermal Hammam Eucalyptus Detox (Suite Charge)", amount: 230 },
];

// =============================================================================
// MAIN COMPONENT: GRAND PALACE HOTEL GUEST PORTAL
// =============================================================================

export function GrandPalaceGuestPortalApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState } = useDemoState<GuestPortalState>(product.slug, {
    guestName: "Lord Arthur & Lady Evelyn Sterling",
    suiteNumber: "Suite 804 · The Royal Penthouse",
    checkInDate: "Nov 12, 2026",
    checkOutDate: "Nov 15, 2026 (12:00 PM)",
    suiteTemperature: 21.5,
    activeLightingScene: "Relaxed Evening",
    activeTab: "overview",
    cart: [],
    placedOrders: [
      {
        id: "ORD-INROOM-882",
        time: "18:10",
        items: [
          { item: MENU_ITEMS[2], quantity: 2 },
          { item: MENU_ITEMS[5], quantity: 1 },
        ],
        total: 508,
        estimatedDelivery: "25 min (18:35)",
        status: "Kitchen Preparing",
      },
    ],
    bookedSpa: [
      {
        id: "SPA-RES-104",
        treatmentTitle: "Imperial Hot Stone & Argan Therapeutic Ritual",
        therapist: "Elena Vance (Senior Master)",
        date: "Tomorrow, Nov 14",
        time: "10:00 AM",
        price: 260,
      },
    ],
    activeRequests: INITIAL_REQUESTS,
    folioCharges: INITIAL_FOLIO,
    isDoorUnlocked: false,
  });

  // Local Form state for custom concierge request
  const [customRequestText, setCustomRequestText] = useState("");
  const [selectedRequestCategory, setSelectedRequestCategory] = useState<"Housekeeping" | "Valet" | "Luggage" | "Concierge">("Housekeeping");

  // Local state for Spa booking modal
  const [bookingSpaId, setBookingSpaId] = useState<string | null>(null);
  const [selectedSpaSlot, setSelectedSpaSlot] = useState("10:00 AM");
  const [selectedTherapist, setSelectedTherapist] = useState("");

  // Room Door Unlock Simulation
  const handleUnlockDoor = () => {
    setState((s) => ({ ...s, isDoorUnlocked: true }));
    setTimeout(() => {
      setState((s) => ({ ...s, isDoorUnlocked: false }));
    }, 4500);
  };

  // Cart operations
  const addToCart = (item: MenuItem) => {
    setState((s) => {
      const existing = s.cart.find((c) => c.item.id === item.id);
      if (existing) {
        return {
          ...s,
          cart: s.cart.map((c) => (c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)),
        };
      }
      return { ...s, cart: [...s.cart, { item, quantity: 1 }] };
    });
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setState((s) => {
      const nextCart = s.cart
        .map((c) => {
          if (c.item.id === itemId) {
            const newQ = c.quantity + delta;
            return newQ > 0 ? { ...c, quantity: newQ } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[];
      return { ...s, cart: nextCart };
    });
  };

  const handleCheckoutDining = () => {
    if (state.cart.length === 0) return;
    const subtotal = state.cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
    const serviceCharge = Math.round(subtotal * 0.15);
    const total = subtotal + serviceCharge;

    const newOrder = {
      id: `ORD-INROOM-${Math.floor(100 + Math.random() * 900)}`,
      time: "Just now",
      items: [...state.cart],
      total,
      estimatedDelivery: "28 min",
      status: "Kitchen Preparing" as const,
    };

    const newFolioEntry: FolioEntry = {
      id: `FOL-${Math.floor(10 + Math.random() * 90)}`,
      date: "Today",
      category: "In-Room Dining",
      description: `In-Room Dining Order (${state.cart.length} items)`,
      amount: total,
    };

    setState((s) => ({
      ...s,
      cart: [],
      placedOrders: [newOrder, ...s.placedOrders],
      folioCharges: [...s.folioCharges, newFolioEntry],
    }));
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRequestText.trim()) return;

    const newReq: ServiceRequest = {
      id: `REQ-${Math.floor(400 + Math.random() * 500)}`,
      category: selectedRequestCategory,
      item: customRequestText,
      requestedAt: "Just now",
      estimatedArrival: "15-20 min",
      status: "Dispatched",
    };

    setState((s) => ({
      ...s,
      activeRequests: [newReq, ...s.activeRequests],
    }));
    setCustomRequestText("");
  };

  const handleConfirmSpaBooking = (treatment: SpaTreatment) => {
    const newBooking = {
      id: `SPA-RES-${Math.floor(100 + Math.random() * 900)}`,
      treatmentTitle: treatment.title,
      therapist: selectedTherapist || treatment.therapists[0],
      date: "Tomorrow, Nov 14",
      time: selectedSpaSlot,
      price: treatment.price,
    };

    const newFolio: FolioEntry = {
      id: `FOL-${Math.floor(20 + Math.random() * 80)}`,
      date: "Nov 14",
      category: "Spa & Wellness",
      description: `${treatment.title} (${treatment.duration})`,
      amount: treatment.price,
    };

    setState((s) => ({
      ...s,
      bookedSpa: [...s.bookedSpa, newBooking],
      folioCharges: [...s.folioCharges, newFolio],
    }));
    setBookingSpaId(null);
  };

  const totalFolio = useMemo(() => {
    return state.folioCharges.reduce((acc, curr) => acc + curr.amount, 0);
  }, [state.folioCharges]);

  const cartTotal = useMemo(() => {
    return state.cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
  }, [state.cart]);

  return (
    <div className="min-h-screen bg-[#060D1A] text-[#E2E8F0] font-sans selection:bg-[#38BDF8]/30 selection:text-white antialiased">
      {/* =================================================================== */}
      {/* TOP NOTIFICATION / FLIGHT BAR */}
      {/* =================================================================== */}
      <div className="bg-[#0A162B] border-b border-[#1E293B] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-400">
        <div className="flex items-center gap-3">
          <Link
            href={`/demos/${product.categorySlug}/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-[#38BDF8] hover:text-[#7DD3FC] font-medium transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Catalogue Blueprint</span>
          </Link>
          <span className="text-[#334155]">|</span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            LIVE HOTEL GUEST COMPANION · CAT-01 #164
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 rounded bg-[#0F2442] text-[10px] text-[#38BDF8] border border-[#38BDF8]/30">
            5-Star Luxury Resort
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setState((s) => ({
                ...s,
                activeTab: s.activeTab === "admin-cockpit" ? "overview" : "admin-cockpit",
              }))
            }
            className={`px-2.5 py-1 text-[11px] font-medium rounded transition-all flex items-center gap-1 border ${
              state.activeTab === "admin-cockpit"
                ? "bg-[#38BDF8] text-black font-semibold border-[#38BDF8]"
                : "bg-[#0F1E36] border-[#1E293B] text-slate-300 hover:text-white"
            }`}
          >
            <Hotel className="w-3.5 h-3.5" />
            <span>{state.activeTab === "admin-cockpit" ? "Guest View" : "Front Desk Cockpit"}</span>
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* GUEST COMPANION HEADER */}
      {/* =================================================================== */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#060D1A]/90 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F2442] to-[#1E3A8A] border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8] shadow-lg">
              <Hotel className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-serif tracking-wider text-white font-medium uppercase">
                  Grand Palace Hotel & Resort
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#1E293B] text-[10px] font-mono text-[#38BDF8]">
                  Verified In-Stay (Simulation)
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                {state.suiteNumber} · Fictional Guest: {state.guestName}
              </p>
            </div>
          </div>

          {/* Quick Cart Pill & Digital Key Shortcut */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setState((s) => ({ ...s, activeTab: "dining" }))}
              className="relative p-2 rounded-xl bg-[#0F1E36] border border-[#1E293B] text-slate-200 hover:border-[#38BDF8] transition-colors"
              title="View in-room dining cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#38BDF8]" />
              {state.cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#38BDF8] text-black font-mono font-bold text-[10px] flex items-center justify-center">
                  {state.cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>

            <button
              onClick={handleUnlockDoor}
              disabled={state.isDoorUnlocked}
              title="Simulated NFC Keyless Entry · Demonstration State"
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                state.isDoorUnlocked
                  ? "bg-[#10B981] text-black border-[#10B981] animate-pulse"
                  : "bg-[#0F2442] border-[#38BDF8]/40 text-[#38BDF8] hover:bg-[#15325B]"
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{state.isDoorUnlocked ? "Door Unlocked (Relocks in 4s)" : "Simulate NFC Key Tap"}</span>
            </button>
          </div>
        </div>

        {/* Guest Tab Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#132035] flex overflow-x-auto gap-1 text-xs font-mono scrollbar-none py-1.5">
          {[
            { id: "overview", label: "Suite Sanctuary", icon: Bed },
            { id: "dining", label: "In-Room Dining", icon: Utensils },
            { id: "spa", label: "Spa & Wellness", icon: Sparkles },
            { id: "services", label: "Housekeeping & Valet", icon: ConciergeBell },
            { id: "folio", label: "Express Folio & Checkout", icon: Receipt },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = state.activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setState((s) => ({ ...s, activeTab: tab.id as any }))}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all flex-shrink-0 ${
                  isActive
                    ? "bg-[#0F2442] text-[#38BDF8] font-semibold border border-[#38BDF8]/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-[#0B172B]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* =================================================================== */}
      {/* TAB 1: SUITE SANCTUARY (OVERVIEW & DIGITAL ROOM CONTROLS) */}
      {/* =================================================================== */}
      {state.activeTab === "overview" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Welcome Suite Card */}
          <div className="rounded-2xl bg-gradient-to-r from-[#0C1A33] via-[#0F2446] to-[#0A162B] border border-[#1E3A8A]/50 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-3">
              <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-widest">
                Registered In-Stay Experience
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-white font-medium">
                {state.suiteNumber}
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">
                Reservation Active: <span className="text-white font-medium">{state.checkInDate}</span> through{" "}
                <span className="text-white font-medium">{state.checkOutDate}</span>. Complimentary high-speed fiber WiFi,
                24-hour dedicated butler dispatch, and private balcony overlooking the Mediterranean lagoon.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  VIP Status: Titanium Diamond
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#38BDF8]" />
                  Late Check-Out Guaranteed (14:00)
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Suite Automation Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Climate Control Card */}
            <div className="rounded-2xl bg-[#0A162B] border border-[#1E293B] p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#0F2442] text-[#38BDF8]">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif text-white font-medium">Suite Climate Control</h3>
                    <p className="text-xs text-slate-400 font-mono">Dual-Zone Precision HVAC</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono text-white font-semibold">{state.suiteTemperature}°C</span>
                  <span className="text-[10px] text-slate-400 block font-mono">Current Target</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>18.0°C (Crisp Cool)</span>
                  <span>24.0°C (Warm Ambient)</span>
                </div>
                <input
                  type="range"
                  min={18}
                  max={24}
                  step={0.5}
                  value={state.suiteTemperature}
                  onChange={(e) => setState((s) => ({ ...s, suiteTemperature: Number(e.target.value) }))}
                  className="w-full accent-[#38BDF8] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                {[20.0, 21.5, 23.0].map((t) => (
                  <button
                    key={t}
                    onClick={() => setState((s) => ({ ...s, suiteTemperature: t }))}
                    className={`py-2 rounded-lg border text-center transition-all ${
                      state.suiteTemperature === t
                        ? "bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8]"
                        : "bg-[#060D1A] border-[#1E293B] text-slate-400 hover:text-white"
                    }`}
                  >
                    Preset {t}°C
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting Scenes Card */}
            <div className="rounded-2xl bg-[#0A162B] border border-[#1E293B] p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#0F2442] text-[#38BDF8]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif text-white font-medium">Ambient Lighting Scenes</h3>
                    <p className="text-xs text-slate-400 font-mono">Curated Architectural Lighting</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#38BDF8] bg-[#0F2442] px-2.5 py-1 rounded-full border border-[#38BDF8]/30">
                  {state.activeLightingScene}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                {[
                  { id: "Daylight", icon: Sun, desc: "Natural 5000K crisp white" },
                  { id: "Relaxed Evening", icon: Moon, desc: "Warm 2700K gentle glow" },
                  { id: "Candlelight", icon: Flame, desc: "Intimate 2000K soft amber" },
                  { id: "Sleep Sanctuary", icon: Bed, desc: "Zero blue-light blackout" },
                ].map((scene) => {
                  const Icon = scene.icon;
                  const active = state.activeLightingScene === scene.id;
                  return (
                    <button
                      key={scene.id}
                      onClick={() => setState((s) => ({ ...s, activeLightingScene: scene.id as any }))}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        active
                          ? "bg-[#0F2442] border-[#38BDF8] text-white shadow-lg"
                          : "bg-[#060D1A] border-[#1E293B] text-slate-400 hover:text-white hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2 font-medium">
                        <Icon className={`w-4 h-4 ${active ? "text-[#38BDF8]" : "text-slate-400"}`} />
                        <span>{scene.id}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">{scene.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Orders & Concierge Service Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live In-Room Dining Status */}
            <div className="rounded-2xl bg-[#0A162B] border border-[#1E293B] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-serif text-white font-medium flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#38BDF8]" />
                  <span>Active In-Room Dining Delivery</span>
                </h4>
                <button
                  onClick={() => setState((s) => ({ ...s, activeTab: "dining" }))}
                  className="text-xs font-mono text-[#38BDF8] hover:underline"
                >
                  Order Menu
                </button>
              </div>

              {state.placedOrders.length > 0 ? (
                <div className="space-y-3">
                  {state.placedOrders.slice(0, 2).map((order) => (
                    <div key={order.id} className="p-4 rounded-xl bg-[#060D1A] border border-[#1E293B] space-y-3">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-[#38BDF8] font-semibold">{order.id}</span>
                        <span className="text-[#10B981] font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{order.status}</span>
                        </span>
                      </div>
                      <div className="text-xs text-slate-300">
                        {order.items.map((i) => `${i.quantity}x ${i.item.name}`).join(", ")}
                      </div>
                      <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-[#132035] text-slate-400">
                        <span>Estimated Arrival: {order.estimatedDelivery}</span>
                        <span className="text-white font-semibold">${order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-6 text-center font-mono">No active food orders currently in prep.</p>
              )}
            </div>

            {/* Active Housekeeping & Valet Requests */}
            <div className="rounded-2xl bg-[#0A162B] border border-[#1E293B] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-serif text-white font-medium flex items-center gap-2">
                  <ConciergeBell className="w-4 h-4 text-[#38BDF8]" />
                  <span>Housekeeping & Valet Dispatch</span>
                </h4>
                <button
                  onClick={() => setState((s) => ({ ...s, activeTab: "services" }))}
                  className="text-xs font-mono text-[#38BDF8] hover:underline"
                >
                  + New Request
                </button>
              </div>

              <div className="space-y-3">
                {state.activeRequests.slice(0, 2).map((req) => (
                  <div key={req.id} className="p-4 rounded-xl bg-[#060D1A] border border-[#1E293B] space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400 uppercase tracking-wider">{req.category}</span>
                      <span className="px-2 py-0.5 rounded bg-[#0F2442] text-[10px] text-[#38BDF8] border border-[#38BDF8]/30">
                        {req.status} · ETA {req.estimatedArrival}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-white">{req.item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =================================================================== */}
      {/* TAB 2: IN-ROOM DINING (MENU, MODIFIERS, & ORDERING) */}
      {/* =================================================================== */}
      {state.activeTab === "dining" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#1E293B]">
            <div>
              <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-widest">
                24-Hour Haute Gastronomie
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium mt-1">
                In-Room Dining & Cellar Service
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Crafted by Executive Chef Laurent and delivered tableside to your private suite dining room.
              </p>
            </div>

            {/* Cart Summary Bar */}
            {state.cart.length > 0 && (
              <div className="flex items-center gap-4 bg-[#0F2442] border border-[#38BDF8]/40 px-4 py-2 rounded-xl text-xs font-mono">
                <div>
                  <span className="text-slate-400">Cart Total: </span>
                  <span className="text-white font-bold text-sm">${cartTotal}</span>
                  <span className="text-slate-400 text-[10px] block">({state.cart.length} distinct dishes)</span>
                </div>
                <button
                  onClick={handleCheckoutDining}
                  className="px-4 py-2 rounded-lg bg-[#38BDF8] text-black font-semibold hover:bg-[#7DD3FC] transition-colors"
                >
                  Charge Suite & Order
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Menu Items Grid */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MENU_ITEMS.map((item) => {
                  const cartEntry = state.cart.find((c) => c.item.id === item.id);
                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-[#0A162B] border border-[#1E293B] hover:border-[#38BDF8]/40 p-4 transition-all flex flex-col justify-between group shadow-lg"
                    >
                      <div className="space-y-3">
                        <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#060D1A] relative border border-[#132035]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#38BDF8]">
                            {item.category}
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="text-base font-serif text-white font-medium group-hover:text-[#38BDF8] transition-colors">
                              {item.name}
                            </h3>
                            <span className="text-sm font-mono font-bold text-white">${item.price}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#132035] mt-4 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400 text-[11px]">{item.prepTime}</span>

                        {cartEntry ? (
                          <div className="flex items-center gap-2 bg-[#0F2442] px-2 py-1 rounded-lg border border-[#38BDF8]/30">
                            <button
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="text-slate-300 hover:text-white"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-bold text-white px-1">{cartEntry.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="text-slate-300 hover:text-white"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item)}
                            className="px-3 py-1.5 rounded-lg bg-[#0F2442] hover:bg-[#38BDF8] hover:text-black text-[#38BDF8] border border-[#38BDF8]/30 transition-all font-medium flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Slide / Sidebar Cart Drawer */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl bg-[#0A162B] border border-[#1E293B] p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                  <h3 className="text-sm font-serif text-white font-medium flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#38BDF8]" />
                    <span>In-Room Dining Basket</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">{state.cart.length} Dishes</span>
                </div>

                {state.cart.length > 0 ? (
                  <div className="space-y-3">
                    {state.cart.map((entry) => (
                      <div
                        key={entry.item.id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-[#060D1A] border border-[#1E293B] text-xs"
                      >
                        <div className="max-w-[150px]">
                          <p className="font-medium text-white truncate">{entry.item.name}</p>
                          <p className="text-[11px] font-mono text-slate-400">
                            ${entry.item.price} × {entry.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 font-mono">
                          <button
                            onClick={() => updateCartQuantity(entry.item.id, -1)}
                            className="p-1 rounded bg-[#0F1E36] hover:bg-[#1E293B] text-slate-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-white">{entry.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(entry.item.id, 1)}
                            className="p-1 rounded bg-[#0F1E36] hover:bg-[#1E293B] text-slate-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="pt-3 border-t border-[#1E293B] space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-slate-400">
                        <span>Dishes Subtotal:</span>
                        <span className="text-white">${cartTotal}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>White-Glove Service & Tray:</span>
                        <span className="text-white">${Math.round(cartTotal * 0.15)}</span>
                      </div>
                      <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-[#132035]">
                        <span>Room Folio Total:</span>
                        <span className="text-[#38BDF8]">${cartTotal + Math.round(cartTotal * 0.15)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckoutDining}
                      className="w-full py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#7DD3FC] text-black font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-lg"
                    >
                      Authorize Room Charge
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-xs font-mono text-slate-400 space-y-2">
                    <Utensils className="w-6 h-6 text-slate-500 mx-auto" />
                    <p>Your dining tray is empty.</p>
                    <p className="text-[11px] text-slate-500">Select dishes from the left to order.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =================================================================== */}
      {/* TAB 3: SPA & WELLNESS RESERVATIONS */}
      {/* =================================================================== */}
      {state.activeTab === "spa" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="pb-4 border-b border-[#1E293B]">
            <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-widest">
              Rejuvenation & Sanctuary
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium mt-1">
              The Grand Spa & Thermal Baths
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Signature treatments, heated hydrotherapy vitality pools, and private hammam rituals overlooking the coast.
            </p>
          </div>

          {/* Booked Spa Banner */}
          {state.bookedSpa.length > 0 && (
            <div className="p-4 rounded-xl bg-[#0F2442] border border-[#38BDF8]/40 space-y-2">
              <span className="text-xs font-mono text-[#38BDF8] uppercase font-semibold">
                Confirmed Spa Appointments
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {state.bookedSpa.map((b) => (
                  <div key={b.id} className="p-3 rounded-lg bg-[#0A162B] border border-[#1E293B] text-xs space-y-1">
                    <div className="flex justify-between font-medium text-white">
                      <span>{b.treatmentTitle}</span>
                      <span className="font-mono text-[#10B981]">${b.price}</span>
                    </div>
                    <div className="text-slate-400 font-mono text-[11px]">
                      {b.date} at {b.time} · Assigned: {b.therapist}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Treatments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SPA_TREATMENTS.map((treatment) => (
              <div
                key={treatment.id}
                className="rounded-2xl bg-[#0A162B] border border-[#1E293B] overflow-hidden flex flex-col justify-between group shadow-xl hover:border-[#38BDF8]/50 transition-all"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={treatment.image}
                      alt={treatment.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#38BDF8]">
                      {treatment.category}
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                      {treatment.duration}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-serif text-white font-medium">{treatment.title}</h3>
                      <span className="text-base font-mono font-bold text-white">${treatment.price}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{treatment.description}</p>

                    <div className="pt-2 text-[11px] font-mono text-slate-400">
                      <span className="block text-slate-500 uppercase text-[10px]">Master Therapists:</span>
                      {treatment.therapists.join(", ")}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      setBookingSpaId(treatment.id);
                      setSelectedTherapist(treatment.therapists[0]);
                      setSelectedSpaSlot(treatment.availableSlots[0]);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#0F2442] hover:bg-[#38BDF8] hover:text-black text-[#38BDF8] border border-[#38BDF8]/30 font-mono text-xs font-semibold transition-all uppercase tracking-wider"
                  >
                    Reserve Treatment
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Modal for Booking */}
          {bookingSpaId && (() => {
            const tr = SPA_TREATMENTS.find((t) => t.id === bookingSpaId);
            if (!tr) return null;
            return (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="rounded-2xl bg-[#0A162B] border border-[#38BDF8] max-w-md w-full p-6 space-y-5 shadow-2xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider">
                        Spa Reservation Calendar
                      </span>
                      <h3 className="text-lg font-serif text-white font-medium mt-1">{tr.title}</h3>
                    </div>
                    <button onClick={() => setBookingSpaId(null)} className="text-slate-400 hover:text-white">
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3 text-xs font-mono">
                    <div>
                      <label className="block text-slate-400 mb-1">Select Available Time Slot</label>
                      <div className="grid grid-cols-2 gap-2">
                        {tr.availableSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedSpaSlot(slot)}
                            className={`py-2 rounded-lg border text-center transition-all ${
                              selectedSpaSlot === slot
                                ? "bg-[#38BDF8] text-black font-semibold border-[#38BDF8]"
                                : "bg-[#060D1A] border-[#1E293B] text-slate-300 hover:text-white"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Preferred Therapist</label>
                      <select
                        value={selectedTherapist}
                        onChange={(e) => setSelectedTherapist(e.target.value)}
                        className="w-full bg-[#060D1A] border border-[#1E293B] rounded-lg px-3 py-2 text-white"
                      >
                        {tr.therapists.map((th) => (
                          <option key={th} value={th}>
                            {th}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="p-3 rounded-lg bg-[#0F2442] border border-[#1E3A8A] text-[11px] text-slate-300">
                      Charge: <span className="text-white font-bold">${tr.price}</span> (will be applied directly to Room Folio).
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setBookingSpaId(null)}
                      className="w-1/2 py-2.5 rounded-xl border border-[#1E293B] text-slate-400 hover:text-white text-xs font-mono"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleConfirmSpaBooking(tr)}
                      className="w-1/2 py-2.5 rounded-xl bg-[#38BDF8] text-black font-semibold text-xs font-mono hover:bg-[#7DD3FC]"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </main>
      )}

      {/* =================================================================== */}
      {/* TAB 4: HOUSEKEEPING, VALET & CONCIERGE REQUESTS */}
      {/* =================================================================== */}
      {state.activeTab === "services" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="pb-4 border-b border-[#1E293B]">
            <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-widest">
              Instant Butler Dispatch
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium mt-1">
              Housekeeping, Valet & Concierge
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select standard instant requests or write confidential requirements to your dedicated floor butler.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Quick 1-Tap Request Tiles */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-sm font-serif text-white font-medium">1-Tap Standard Guest Requests</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { cat: "Housekeeping" as const, title: "Extra Feather Pillows" },
                  { cat: "Housekeeping" as const, title: "Egyptian Cotton Towels" },
                  { cat: "Housekeeping" as const, title: "Fresh Ice Bucket" },
                  { cat: "Valet" as const, title: "Retrieve Vehicle to Portico" },
                  { cat: "Luggage" as const, title: "Luggage Pickup for Departure" },
                  { cat: "Concierge" as const, title: "Shoeshine Overnight Service" },
                ].map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const newReq: ServiceRequest = {
                        id: `REQ-${Math.floor(400 + Math.random() * 500)}`,
                        category: preset.cat,
                        item: preset.title,
                        requestedAt: "Just now",
                        estimatedArrival: "15 min",
                        status: "Dispatched",
                      };
                      setState((s) => ({ ...s, activeRequests: [newReq, ...s.activeRequests] }));
                    }}
                    className="p-3.5 rounded-xl bg-[#0A162B] border border-[#1E293B] hover:border-[#38BDF8] hover:bg-[#0F2442] text-left transition-all group"
                  >
                    <span className="text-[10px] font-mono text-[#38BDF8] block">{preset.cat}</span>
                    <span className="text-xs font-medium text-white group-hover:text-[#38BDF8] transition-colors mt-1 block">
                      {preset.title}
                    </span>
                  </button>
                ))}
              </div>

              {/* Custom Request Form */}
              <form onSubmit={handleCreateRequest} className="rounded-2xl bg-[#0A162B] border border-[#1E293B] p-5 space-y-4">
                <h4 className="text-xs font-mono uppercase text-[#38BDF8] tracking-wider">
                  Bespoke Butler Instruction
                </h4>
                <div className="flex gap-2">
                  {(["Housekeeping", "Valet", "Luggage", "Concierge"] as const).map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setSelectedRequestCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                        selectedRequestCategory === cat
                          ? "bg-[#38BDF8] text-black font-semibold"
                          : "bg-[#060D1A] border border-[#1E293B] text-slate-400"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <textarea
                  rows={3}
                  value={customRequestText}
                  onChange={(e) => setCustomRequestText(e.target.value)}
                  placeholder="e.g., Please arrange morning airport transfer Mercedes Maybach for 10:30 AM..."
                  className="w-full bg-[#060D1A] border border-[#1E293B] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#38BDF8] hover:bg-[#7DD3FC] text-black font-semibold text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit to Butler</span>
                </button>
              </form>
            </div>

            {/* Active Requests Status List */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-sm font-serif text-white font-medium">Active Dispatch Stream</h3>
              <div className="space-y-3">
                {state.activeRequests.map((req) => (
                  <div key={req.id} className="p-4 rounded-xl bg-[#0A162B] border border-[#1E293B] space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[#38BDF8] font-semibold">{req.id} · {req.category}</span>
                      <span className="px-2 py-0.5 rounded bg-[#0F2442] text-[10px] text-[#10B981] border border-[#10B981]/30">
                        {req.status}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-white">{req.item}</p>
                    <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-[#132035]">
                      <span>Requested: {req.requestedAt}</span>
                      <span>ETA: {req.estimatedArrival}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =================================================================== */}
      {/* TAB 5: EXPRESS FOLIO REVIEW & CHECKOUT */}
      {/* =================================================================== */}
      {state.activeTab === "folio" && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="pb-4 border-b border-[#1E293B]">
            <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-widest">
              Itemized Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium mt-1">
              Live Room Folio & Express Checkout
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              All suite room rates, dining charges, and spa rituals consolidated in real time.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0A162B] border border-[#1E293B] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-[#1E293B] flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-slate-400 uppercase">Guest Billing Account</p>
                <h3 className="text-lg font-serif text-white font-medium">{state.guestName}</h3>
                <p className="text-xs font-mono text-[#38BDF8]">{state.suiteNumber}</p>
              </div>

              <div className="text-right">
                <p className="text-xs font-mono text-slate-400 uppercase">Current Balance Due</p>
                <p className="text-3xl font-serif text-white font-semibold">${totalFolio.toLocaleString()}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#060D1A] text-slate-400 uppercase tracking-wider border-b border-[#1E293B]">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Itemized Description</th>
                    <th className="py-3 px-4 text-right">Amount (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#132035] text-slate-300">
                  {state.folioCharges.map((folio) => (
                    <tr key={folio.id} className="hover:bg-[#0D1C36] transition-colors">
                      <td className="py-3.5 px-4 text-slate-400">{folio.date}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#0F2442] text-[10px] text-[#38BDF8]">
                          {folio.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-white font-medium">{folio.description}</td>
                      <td className="py-3.5 px-4 text-right text-white font-semibold">
                        ${folio.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-[#081324] border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-400">
                Payment on file: <span className="text-white font-medium">Amex Centurion **** 9801 (Demo Sandbox)</span>
              </div>
              <button
                onClick={() => {
                  alert(
                    `Demonstration Checkout Simulation Complete!\n\nThank you, Lord & Lady Sterling.\nYour demonstration folio balance of $${totalFolio.toLocaleString()} has been finalized in session sandbox (Simulated settlement - zero actual financial charge applied).`
                  );
                }}
                className="px-6 py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#7DD3FC] text-black font-semibold text-xs font-mono uppercase tracking-wider transition-colors shadow-lg"
              >
                Perform 1-Tap Express Check-Out
              </button>
            </div>
          </div>
        </main>
      )}

      {/* =================================================================== */}
      {/* TAB 6: FRONT DESK & BUTLER COCKPIT (OPERATIONS OVERVIEW) */}
      {/* =================================================================== */}
      {state.activeTab === "admin-cockpit" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="pb-4 border-b border-[#1E293B] flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-widest">
                  Front Office Management
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#162744] text-slate-300 border border-[#234273]">
                  Demonstration Operational Telemetry
                </span>
              </div>
              <h2 className="text-2xl font-serif text-white font-medium mt-1">
                Front Desk & Butler Dispatch Operations
              </h2>
            </div>
            <button
              onClick={() => setState((s) => ({ ...s, activeTab: "overview" }))}
              className="px-3.5 py-1.5 rounded-lg border border-[#1E293B] bg-[#0A162B] text-xs font-mono text-slate-300 hover:text-white"
            >
              Return to Guest Portal
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#0A162B] border border-[#1E293B]">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Suite Occupancy</span>
              <p className="text-2xl font-serif text-white mt-1">88 / 94 Keys</p>
              <span className="text-[10px] text-[#10B981] font-mono mt-1 block">93.6% Occupancy (Demo Data)</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0A162B] border border-[#1E293B]">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Active Butler Dispatches</span>
              <p className="text-2xl font-serif text-[#38BDF8] mt-1">{state.activeRequests.length} Dispatched</p>
              <span className="text-[10px] text-slate-400 font-mono mt-1 block">Avg Response: 4.2 min</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0A162B] border border-[#1E293B]">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Kitchen Service Queue</span>
              <p className="text-2xl font-serif text-white mt-1">{state.placedOrders.length} In-Room Trays</p>
              <span className="text-[10px] text-slate-400 font-mono mt-1 block">Expediting on schedule</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0A162B] border border-[#1E293B]">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Spa Bookings Today</span>
              <p className="text-2xl font-serif text-white mt-1">{state.bookedSpa.length + 14} Rituals</p>
              <span className="text-[10px] text-[#10B981] font-mono mt-1 block">Hammam at 100% cap</span>
            </div>
          </div>

          {/* Service Dispatch Management Table */}
          <div className="rounded-2xl bg-[#0A162B] border border-[#1E293B] overflow-hidden">
            <div className="p-5 border-b border-[#1E293B] flex justify-between items-center">
              <h3 className="text-sm font-serif text-white font-medium">Live Butler Request Queue</h3>
              <span className="text-xs font-mono text-[#38BDF8]">Suite 804 Focus</span>
            </div>

            <div className="divide-y divide-[#132035]">
              {state.activeRequests.map((req) => (
                <div key={req.id} className="p-4 flex items-center justify-between text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-[#38BDF8] font-semibold">{req.id}</span>
                    <p className="text-white font-medium text-sm">{req.item}</p>
                    <p className="text-slate-400 text-[11px]">Requested: {req.requestedAt}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded bg-[#0F2442] text-[#10B981] border border-[#10B981]/30">
                      {req.status}
                    </span>
                    {req.status !== "Completed" && (
                      <button
                        onClick={() => {
                          setState((s) => ({
                            ...s,
                            activeRequests: s.activeRequests.map((r) =>
                              r.id === req.id ? { ...r, status: "Completed" } : r
                            ),
                          }));
                        }}
                        className="px-3 py-1 rounded-lg bg-[#10B981] text-black font-semibold hover:bg-[#34D399]"
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
