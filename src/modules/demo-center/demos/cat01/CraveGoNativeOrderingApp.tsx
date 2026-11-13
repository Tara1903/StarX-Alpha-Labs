"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { DemoProductDefinition } from "../../types";
import { useDemoState } from "../../state/useDemoState";
import {
  Smartphone,
  MapPin,
  Search,
  ShoppingBag,
  Star,
  Clock,
  ArrowLeft,
  ChevronRight,
  Plus,
  Minus,
  CheckCircle2,
  Navigation,
  Sparkles,
  Phone,
  MessageCircle,
  X,
  CreditCard,
  ShieldCheck,
  Flame,
  Info,
  Sliders,
  RotateCcw,
} from "lucide-react";

// =============================================================================
// DOMAIN MODELS & TYPES
// =============================================================================

export interface CraveDishModifier {
  name: string;
  priceDelta: number;
}

export interface CraveDish {
  id: string;
  name: string;
  restaurant: string;
  cuisine: string;
  price: number;
  rating: number;
  calories: number;
  prepTime: string;
  image: string;
  description: string;
  modifiers: CraveDishModifier[];
  allergens: string[];
}

export interface CraveCartItem {
  dish: CraveDish;
  quantity: number;
  selectedModifier?: CraveDishModifier;
  specialInstructions?: string;
}

export interface CraveState {
  devicePlatform: "iOS" | "Android";
  activeTab: "explore" | "search" | "orders" | "profile";
  deliveryMode: "Delivery" | "Pickup";
  selectedAddress: string;
  selectedCuisine: string;
  cart: CraveCartItem[];
  activeOrderStage: "Idle" | "Confirmed" | "Kitchen Prep" | "Rider Dispatched" | "Arrived";
  riderEtaMinutes: number;
  riderLocation: { lat: number; lng: number; heading: string };
  loyaltyPoints: number;
}

const SAMPLE_DISHES: CraveDish[] = [
  {
    id: "cr-1",
    name: "Truffle Glazed Double Smashburger",
    restaurant: "Smashed & Co. Burgers",
    cuisine: "Burgers",
    price: 14.5,
    rating: 4.9,
    calories: 780,
    prepTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    description: "Two 100% Angus patties smashed with bone marrow butter, aged Gruyère, black truffle aioli, and brioche bun.",
    modifiers: [
      { name: "Extra Truffle Aioli", priceDelta: 1.5 },
      { name: "Add Smoked Applewood Bacon", priceDelta: 2.5 },
      { name: "Gluten-Free Potato Bun", priceDelta: 1.0 },
    ],
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "cr-2",
    name: "Spicy Bluefin Tuna Crispy Rice",
    restaurant: "Oishii Raw Bar",
    cuisine: "Japanese",
    price: 18.0,
    rating: 4.8,
    calories: 520,
    prepTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    description: "Pan-crisped sushi rice cakes crowned with minced spicy bluefin tuna, serrano pepper slice, and sweet soy tare.",
    modifiers: [
      { name: "Double Tuna Tartare", priceDelta: 4.0 },
      { name: "Truffle Ponzu Drizzle", priceDelta: 2.0 },
    ],
    allergens: ["Fish", "Soy"],
  },
  {
    id: "cr-3",
    name: "San Marzano Burrata Margherita",
    restaurant: "Forno D'Oro Pizza",
    cuisine: "Italian",
    price: 16.5,
    rating: 4.9,
    calories: 840,
    prepTime: "18-22 min",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    description: "72-hour cold fermented dough, volcanic San Marzano tomatoes, whole pugliese burrata, and fresh basil.",
    modifiers: [
      { name: "Add Prosciutto di Parma", priceDelta: 3.5 },
      { name: "Hot Calabrian Honey Drizzle", priceDelta: 1.5 },
    ],
    allergens: ["Gluten", "Dairy"],
  },
  {
    id: "cr-4",
    name: "Charred Chimichurri Steak Bowl",
    restaurant: "Verde Wellness Kitchen",
    cuisine: "Healthy Bowls",
    price: 17.5,
    rating: 4.7,
    calories: 590,
    prepTime: "12-18 min",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    description: "Grass-fed flank steak grilled medium-rare, organic quinoa, roasted sweet potatoes, and raw herb chimichurri.",
    modifiers: [
      { name: "Double Flank Steak (6oz)", priceDelta: 5.0 },
      { name: "Avocado Half", priceDelta: 2.0 },
    ],
    allergens: [],
  },
];

const INITIAL_CRAVE_STATE: CraveState = {
  devicePlatform: "iOS",
  activeTab: "explore",
  deliveryMode: "Delivery",
  selectedAddress: "Penthouse 4B · 840 Grand Avenue",
  selectedCuisine: "All",
  cart: [
    {
      dish: SAMPLE_DISHES[0],
      quantity: 1,
      selectedModifier: SAMPLE_DISHES[0].modifiers[0],
    },
  ],
  activeOrderStage: "Rider Dispatched",
  riderEtaMinutes: 11,
  riderLocation: { lat: 40.7128, lng: -74.006, heading: "Northbound on 5th Ave" },
  loyaltyPoints: 1420,
};

export function CraveGoNativeOrderingApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState } = useDemoState<CraveState>(
    product.slug,
    INITIAL_CRAVE_STATE
  );

  const [selectedDishModal, setSelectedDishModal] = useState<CraveDish | null>(null);
  const [selectedModIndex, setSelectedModIndex] = useState<number>(0);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [tipAmount, setTipAmount] = useState<number>(3.0);
  const [checkoutSimulating, setCheckoutSimulating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return SAMPLE_DISHES.filter((d) => {
      if (state.selectedCuisine !== "All" && d.cuisine !== state.selectedCuisine) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return d.name.toLowerCase().includes(q) || d.restaurant.toLowerCase().includes(q);
      }
      return true;
    });
  }, [state.selectedCuisine, searchQuery]);

  // Cart calculations
  const cartSubtotal = useMemo(() => {
    return state.cart.reduce((sum, item) => {
      const modCost = item.selectedModifier ? item.selectedModifier.priceDelta : 0;
      return sum + (item.dish.price + modCost) * item.quantity;
    }, 0);
  }, [state.cart]);

  const deliveryFee = state.deliveryMode === "Delivery" ? 2.99 : 0.0;
  const serviceTax = Math.round(cartSubtotal * 0.088 * 100) / 100;
  const cartGrandTotal = Math.round((cartSubtotal + deliveryFee + serviceTax + tipAmount) * 100) / 100;

  // Cart actions
  const addToCart = (dish: CraveDish, modifier?: CraveDishModifier) => {
    setState((prev) => {
      const existing = prev.cart.find((c) => c.dish.id === dish.id && c.selectedModifier?.name === modifier?.name);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map((c) =>
            c.dish.id === dish.id && c.selectedModifier?.name === modifier?.name
              ? { ...c, quantity: c.quantity + 1 }
              : c
          ),
        };
      }
      return {
        ...prev,
        cart: [...prev.cart, { dish, quantity: 1, selectedModifier: modifier }],
      };
    });
    setSelectedDishModal(null);
  };

  const updateQuantity = (dishId: string, modName: string | undefined, delta: number) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart
        .map((c) => {
          if (c.dish.id === dishId && c.selectedModifier?.name === modName) {
            const nextQ = c.quantity + delta;
            return nextQ > 0 ? { ...c, quantity: nextQ } : null;
          }
          return c;
        })
        .filter(Boolean) as CraveCartItem[],
    }));
  };

  // 1-Tap Checkout Simulation
  const handleCheckout = () => {
    if (state.cart.length === 0) return;
    setCheckoutSimulating(true);
    setTimeout(() => {
      setCheckoutSimulating(false);
      setCartDrawerOpen(false);
      setState((prev) => ({
        ...prev,
        cart: [],
        activeOrderStage: "Confirmed",
        riderEtaMinutes: 24,
        loyaltyPoints: prev.loyaltyPoints + Math.round(cartGrandTotal * 10),
        activeTab: "orders",
      }));
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col items-center py-6 px-3 sm:px-6">
      {/* Top Banner / Breadcrumb & Hardware Platform Switcher */}
      <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href={`/demos/${product.categorySlug}/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-[#0E131F] border border-[#1E293B]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Product Blueprint</span>
          </Link>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-mono text-[#FF4B3A] font-semibold">
            Model #163 · CraveGo Native Mobile Ordering
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[#FF4B3A]/10 text-[#FF4B3A] border border-[#FF4B3A]/30">
            Native iOS & Android Simulation
          </span>
        </div>

        {/* Platform Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg bg-[#0E131F] p-0.5 border border-[#1E293B] text-xs font-mono">
            <button
              onClick={() => setState((s) => ({ ...s, devicePlatform: "iOS" }))}
              className={`px-3 py-1 rounded transition-colors ${
                state.devicePlatform === "iOS" ? "bg-[#FF4B3A] text-white font-bold" : "text-slate-400"
              }`}
            >
              iOS (SwiftUI)
            </button>
            <button
              onClick={() => setState((s) => ({ ...s, devicePlatform: "Android" }))}
              className={`px-3 py-1 rounded transition-colors ${
                state.devicePlatform === "Android" ? "bg-[#FF4B3A] text-white font-bold" : "text-slate-400"
              }`}
            >
              Android (Compose)
            </button>
          </div>
          <button
            onClick={resetState}
            title="Reset to initial seed"
            className="p-1.5 rounded-lg bg-[#0E131F] border border-[#1E293B] text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MOBILE DEVICE CONTAINER */}
      <div className="relative w-full max-w-[420px] aspect-[9/19.5] min-h-[780px] rounded-[48px] bg-black border-[10px] border-[#1A1F2C] shadow-2xl shadow-black/80 overflow-hidden flex flex-col">
        {/* Device Notch / Dynamic Island */}
        <div className="absolute top-0 inset-x-0 h-7 z-50 flex items-center justify-between px-7 pt-1 text-[11px] font-mono text-white select-none">
          <span>9:41</span>
          {state.devicePlatform === "iOS" ? (
            <div className="w-24 h-4 rounded-full bg-black border border-slate-800/80 mx-auto" />
          ) : (
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-700 mx-auto" />
          )}
          <div className="flex items-center gap-1.5 text-[10px]">
            <span>5G</span>
            <span className="w-4 h-2 rounded-xs border border-white flex items-center px-0.5">
              <span className="w-full h-full bg-emerald-400 rounded-2xs" />
            </span>
          </div>
        </div>

        {/* SCREEN CONTENT AREA */}
        <div className="flex-1 pt-9 pb-16 overflow-y-auto bg-[#0A0D14] flex flex-col scrollbar-none">
          {/* TAB 1: EXPLORE & ORDERING */}
          {state.activeTab === "explore" && (
            <div className="p-4 space-y-4">
              {/* Delivery / Pickup Pill Selector */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex rounded-full bg-[#121826] p-1 border border-[#1E293B] text-xs font-medium">
                  <button
                    onClick={() => setState((s) => ({ ...s, deliveryMode: "Delivery" }))}
                    className={`px-3 py-1 rounded-full transition-all ${
                      state.deliveryMode === "Delivery"
                        ? "bg-[#FF4B3A] text-white shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Delivery
                  </button>
                  <button
                    onClick={() => setState((s) => ({ ...s, deliveryMode: "Pickup" }))}
                    className={`px-3 py-1 rounded-full transition-all ${
                      state.deliveryMode === "Pickup"
                        ? "bg-[#FF4B3A] text-white shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Pickup
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono truncate max-w-[180px]">
                  <MapPin className="w-3.5 h-3.5 text-[#FF4B3A] shrink-0" />
                  <span className="truncate">{state.selectedAddress}</span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Craving burgers, sushi, or bowls?"
                  className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-[#121826] border border-[#1E293B] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF4B3A]"
                />
              </div>

              {/* Cuisine Categories Pills */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {["All", "Burgers", "Japanese", "Italian", "Healthy Bowls"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setState((s) => ({ ...s, selectedCuisine: c }))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                      state.selectedCuisine === c
                        ? "bg-[#FF4B3A] text-white"
                        : "bg-[#121826] text-slate-400 border border-[#1E293B] hover:text-white"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Featured Promo Hero Banner */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#FF4B3A] to-[#FF7A59] p-4 text-white shadow-lg shadow-[#FF4B3A]/20">
                <span className="text-[10px] uppercase font-mono tracking-widest bg-black/30 px-2 py-0.5 rounded-full inline-block mb-1">
                  CRAVEPASS VIP
                </span>
                <h3 className="text-base font-extrabold leading-snug">
                  $0 Delivery Fee on Artisan Drops
                </h3>
                <p className="text-[11px] text-white/90 mt-0.5">
                  Exclusive member perks & 15-minute express dispatch.
                </p>
              </div>

              {/* Dishes Grid */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">Recommended For You</span>
                  <span className="text-slate-500 font-mono text-[10px]">
                    {filteredDishes.length} artisanal dishes
                  </span>
                </div>

                {filteredDishes.map((dish) => (
                  <div
                    key={dish.id}
                    onClick={() => {
                      setSelectedDishModal(dish);
                      setSelectedModIndex(0);
                    }}
                    className="p-3 rounded-2xl bg-[#111726] border border-[#1C2538] hover:border-[#FF4B3A]/50 transition-all cursor-pointer flex gap-3 group"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#1A2234] relative">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/75 text-[9px] font-mono text-amber-300 flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        {dish.rating}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-[#FF7A59] transition-colors leading-tight line-clamp-1">
                          {dish.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{dish.restaurant}</p>
                        <p className="text-[10px] text-slate-400 line-clamp-1 mt-1 font-light">
                          {dish.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-mono font-bold text-white">
                          ${dish.price.toFixed(2)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(dish);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#FF4B3A] hover:bg-[#E03E2F] text-white text-[11px] font-semibold flex items-center gap-1 shadow"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: LIVE ORDER TRACKING & RIDER RADAR */}
          {state.activeTab === "orders" && (
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Live Delivery Telemetry</h3>
                  <p className="text-[11px] font-mono text-slate-400">Order #CRV-9942 · Carlos R. on Honda Activa</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {state.activeOrderStage}
                </span>
              </div>

              {/* Radar Map Simulation View */}
              <div className="relative h-44 rounded-2xl overflow-hidden bg-[#0F1420] border border-[#1E293B] p-3 flex flex-col justify-between">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF4B3A_1px,transparent_1px)] [background-size:12px_12px]" />

                {/* Simulated GPS Path Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 50 140 Q 180 80 320 40"
                    fill="none"
                    stroke="#FF4B3A"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                    className="animate-pulse"
                  />
                  <circle cx="50" cy="140" r="6" fill="#10B981" />
                  <circle cx="320" cy="40" r="6" fill="#38BDF8" />
                </svg>

                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono bg-black/70 px-2.5 py-1 rounded-lg border border-slate-800">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    GPS Live Ping: 18ms
                  </span>
                  <span className="text-slate-300">{state.riderLocation.heading}</span>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-black/80 border border-[#1E293B] flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#FF4B3A]/20 text-[#FF4B3A] flex items-center justify-center font-bold text-xs">
                      CR
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white">Carlos Rodriguez</div>
                      <div className="text-[9px] text-slate-400 font-mono">4.96 ★ (1,840 Deliveries)</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => alert("Simulated VoIP Phone Call: Connected to Courier Carlos.")}
                      className="p-2.5 rounded-full bg-[#1A2338] text-[#38BDF8] border border-[#38BDF8]/40 hover:bg-[#38BDF8]/20"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => alert("Simulated Courier In-App Chat Opened.")}
                      className="p-2.5 rounded-full bg-[#1A2338] text-[#10B981] border border-[#10B981]/40 hover:bg-[#10B981]/20"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Estimated Delivery Clock */}
              <div className="p-4 rounded-2xl bg-[#121826] border border-[#1E293B] text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Estimated Arrival</span>
                <div className="text-3xl font-extrabold text-[#FF4B3A] font-mono">
                  {state.riderEtaMinutes} Minutes
                </div>
                <p className="text-[11px] text-slate-300">
                  Courier is currently turning onto Grand Avenue.
                </p>
              </div>

              {/* Progress Milestones */}
              <div className="p-3.5 rounded-2xl bg-[#121826] border border-[#1E293B] space-y-3">
                {[
                  { label: "Order Accepted by Kitchen", done: true, time: "9:22 PM" },
                  { label: "Artisan Dishes Prepared & Packed", done: true, time: "9:34 PM" },
                  { label: "Rider Picked Up & On Route", done: true, time: "9:38 PM" },
                  { label: "Delivered to Doorstep", done: false, time: "Est. 9:49 PM" },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 ${step.done ? "text-emerald-400" : "text-slate-600"}`}
                      />
                      <span className={step.done ? "text-white" : "text-slate-500"}>{step.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{step.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: USER PROFILE & CRAVEPASS */}
          {state.activeTab === "profile" && (
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#121826] border border-[#1E293B]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF4B3A] to-[#FF8C66] flex items-center justify-center font-bold text-white text-base">
                  JD
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Jordan Daniels</div>
                  <div className="text-[11px] text-slate-400 font-mono">jordan.daniels@demo.starx.internal</div>
                  <span className="text-[9px] font-mono text-[#FF4B3A] uppercase tracking-wider block mt-0.5">
                    Tier: CravePass Gold Member
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1A1F2E] to-[#121622] border border-[#2A334A] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Rewards Balance</span>
                  <div className="text-2xl font-extrabold text-amber-300 font-mono mt-0.5">
                    {state.loyaltyPoints} Pts
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">
                    $14.20 Redemption Credit Available
                  </span>
                </div>
                <button
                  onClick={() => alert("Simulated Points Redemption Activated: $10 credit applied to next checkout.")}
                  className="px-3 py-1.5 rounded-xl bg-amber-400/20 text-amber-300 text-xs font-semibold border border-amber-400/40 hover:bg-amber-400/30"
                >
                  Redeem
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#121826] border border-[#1E293B] space-y-2 text-xs">
                <div className="font-semibold text-white">Demonstration Specifications</div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                  Simulating native Swift/Kotlin gestures, native status bar, FaceID/TouchID 1-tap checkout, and turn-by-turn Mapbox courier coordinates.
                </p>
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30 inline-block">
                    Zero Real Payments · Full Interactive Sandbox
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM FLOATING CART TRIGGER PILL (When cart has items) */}
        {state.cart.length > 0 && !cartDrawerOpen && state.activeTab === "explore" && (
          <div className="absolute bottom-16 inset-x-4 z-40">
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="w-full py-3 px-4 rounded-2xl bg-[#FF4B3A] hover:bg-[#E03E2F] text-white font-bold text-xs flex items-center justify-between shadow-xl shadow-[#FF4B3A]/40 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-black/40 text-white font-mono text-[10px] flex items-center justify-center">
                  {state.cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
                <span>View Order Bag</span>
              </div>
              <span className="font-mono text-sm">${cartGrandTotal.toFixed(2)}</span>
            </button>
          </div>
        )}

        {/* NATIVE BOTTOM NAVIGATION BAR */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-[#0B0F17]/95 backdrop-blur-md border-t border-[#192233] px-6 flex items-center justify-between z-40">
          {[
            { id: "explore", label: "Explore", icon: Flame },
            { id: "orders", label: "Tracker", icon: Navigation },
            { id: "profile", label: "Profile", icon: Star },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setState((s) => ({ ...s, activeTab: tab.id as any }))}
              className={`flex flex-col items-center gap-1 transition-colors ${
                state.activeTab === tab.id ? "text-[#FF4B3A]" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* DISH CUSTOMIZATION MODAL (Slide-Up Sheet) */}
        {selectedDishModal && (
          <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col justify-end">
            <div className="bg-[#101522] rounded-t-[32px] p-5 border-t border-[#222C42] space-y-4 max-h-[85%] overflow-y-auto">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-sm font-bold text-white">{selectedDishModal.name}</h3>
                <button
                  onClick={() => setSelectedDishModal(null)}
                  className="p-1.5 rounded-full bg-[#182032] text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={selectedDishModal.image}
                  alt={selectedDishModal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {selectedDishModal.description}
              </p>

              <div className="space-y-2 pt-1">
                <div className="text-xs font-semibold text-white">Select Your Modification</div>
                {selectedDishModal.modifiers.map((mod, idx) => (
                  <label
                    key={mod.name}
                    onClick={() => setSelectedModIndex(idx)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      selectedModIndex === idx
                        ? "bg-[#FF4B3A]/10 border-[#FF4B3A] text-white"
                        : "bg-[#141A29] border-[#1E273C] text-slate-400"
                    }`}
                  >
                    <span>{mod.name}</span>
                    <span className="font-mono text-[11px] text-[#FF4B3A]">
                      +${mod.priceDelta.toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => addToCart(selectedDishModal, selectedDishModal.modifiers[selectedModIndex])}
                  className="w-full py-3 rounded-xl bg-[#FF4B3A] hover:bg-[#E03E2F] text-white font-bold text-xs shadow-lg transition-colors"
                >
                  Add to Cart · $
                  {(
                    selectedDishModal.price +
                    (selectedDishModal.modifiers[selectedModIndex]?.priceDelta || 0)
                  ).toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NATIVE CART & 1-TAP CHECKOUT SHEET */}
        {cartDrawerOpen && (
          <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-xs flex flex-col justify-end">
            <div className="bg-[#101522] rounded-t-[32px] p-5 border-t border-[#222C42] space-y-4 max-h-[90%] overflow-y-auto">
              <div className="flex items-center justify-between pb-1 border-b border-[#1E273C]">
                <div>
                  <h3 className="text-sm font-bold text-white">Your Checkout Bag</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Deliver to {state.selectedAddress}</p>
                </div>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="p-1.5 rounded-full bg-[#182032] text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {state.cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#141B2B] text-xs font-mono"
                  >
                    <div className="max-w-[200px]">
                      <div className="text-white truncate font-medium">{item.dish.name}</div>
                      {item.selectedModifier && (
                        <div className="text-[10px] text-slate-400">
                          + {item.selectedModifier.name} (${item.selectedModifier.priceDelta.toFixed(2)})
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-[#0C111C] px-2 py-0.5 rounded-lg border border-[#1E273C]">
                        <button
                          onClick={() =>
                            updateQuantity(item.dish.id, item.selectedModifier?.name, -1)
                          }
                          className="text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white text-xs">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.dish.id, item.selectedModifier?.name, 1)
                          }
                          className="text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-white font-bold text-xs">
                        $
                        {(
                          (item.dish.price + (item.selectedModifier?.priceDelta || 0)) *
                          item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Courier Tip Selection */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-mono text-slate-300">Courier Appreciation Tip</div>
                <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                  {[2.0, 3.0, 5.0, 7.0].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTipAmount(t)}
                      className={`py-1.5 rounded-lg border text-center transition-colors ${
                        tipAmount === t
                          ? "bg-[#FF4B3A] text-white border-[#FF4B3A]"
                          : "bg-[#141B2B] border-[#1E273C] text-slate-300"
                      }`}
                    >
                      ${t.toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cost Summary Breakdown */}
              <div className="p-3 rounded-xl bg-[#0C111C] border border-[#1E273C] text-[11px] font-mono space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Delivery Dispatch</span>
                  <span className="text-white">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Tax</span>
                  <span className="text-white">${serviceTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Courier Tip</span>
                  <span className="text-white">${tipAmount.toFixed(2)}</span>
                </div>
                <div className="pt-1.5 border-t border-[#1E273C] flex justify-between text-sm font-bold text-white">
                  <span>Total Amount</span>
                  <span className="text-[#FF4B3A]">${cartGrandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* 1-Tap Pay Button Simulation */}
              <button
                onClick={handleCheckout}
                disabled={checkoutSimulating}
                className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
              >
                {checkoutSimulating ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <span>Verifying {state.devicePlatform === "iOS" ? "Apple Pay..." : "Google Pay..."}</span>
                  </span>
                ) : (
                  <span>
                    Pay with {state.devicePlatform === "iOS" ? " Apple Pay" : " Google Pay"} · ${cartGrandTotal.toFixed(2)}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER AUDIT NOTICE */}
      <div className="mt-6 text-center text-xs font-mono text-slate-500 max-w-lg">
        <span className="text-slate-400">StarX Forge Native Mobile Engine</span> · Model #163 CraveGo · Isolated Simulation Sandbox with Simulated Mapbox GPS & 1-Tap Payments.
      </div>
    </div>
  );
}
