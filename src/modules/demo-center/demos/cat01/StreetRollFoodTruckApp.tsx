"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CloudOff,
  Flame,
  MapPin,
  Plus,
  RotateCcw,
  Sparkles,
  Truck,
  Wifi,
  Zap,
} from "lucide-react";
import type { DemoProductDefinition } from "../../types";
import { toDemoModel } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

type TabId = "pos" | "queue" | "pitches" | "commissary";

interface StreetMenuItem {
  id: string;
  name: string;
  category: "Tacos & Birria" | "Smash Burgers" | "Loaded Fries" | "Drinks";
  prepMins: number;
  price: number;
  desc: string;
}

interface StreetTicket {
  id: string;
  tokenNo: string;
  curbName: string;
  heatLevel: "Mild" | "Medium Jalapeño" | "Ghost Reaper";
  itemsSummary: string;
  total: number;
  paymentMode: "UPI" | "Cash" | "Offline Buffer";
  synced: boolean;
  pitchSpot: string;
}

interface PitchStop {
  id: string;
  day: string;
  location: string;
  hours: string;
  permitCode: string;
  active: boolean;
}

interface CommissaryItem {
  id: string;
  item: string;
  loadedQty: string;
  parTarget: string;
  checked: boolean;
}

interface FoodTruckState {
  unitName: string;
  offlineMode: boolean;
  tickets: StreetTicket[];
  pitches: PitchStop[];
  commissary: CommissaryItem[];
}

const STREET_MENU: StreetMenuItem[] = [
  { id: "sm-1", name: "Ancho Beef Birria Tacos (3x)", category: "Tacos & Birria", prepMins: 4, price: 340, desc: "Crispy corn tortilla · Roasted consomé cup" },
  { id: "sm-2", name: "Double Smash Street Burger", category: "Smash Burgers", prepMins: 5, price: 290, desc: "Caramelized onion, cheddar, chili burger sauce" },
  { id: "sm-3", name: "Loaded Carnitas Street Fries", category: "Loaded Fries", prepMins: 3, price: 240, desc: "Cotija crumble, pickled red onion, smoky crema" },
  { id: "sm-4", name: "Smoky Chipotle Chicken Burrito", category: "Tacos & Birria", prepMins: 4, price: 310, desc: "Black beans, avocado lime crema, charred corn" },
  { id: "sm-5", name: "Charred Corn Elote Bowl", category: "Loaded Fries", prepMins: 2, price: 190, desc: "Smoked tajín dust, lime aioli, queso fresco" },
  { id: "sm-6", name: "Hibiscus Agua Fresca (Cold Curb)", category: "Drinks", prepMins: 1, price: 130, desc: "Fresh hibiscus flower brew & cinnamon citrus" },
];

const STREET_ROLL_SEED: FoodTruckState = {
  unitName: "StreetRoll Unit #04",
  offlineMode: false,
  tickets: [
    {
      id: "tk-142",
      tokenNo: "#TRK-142",
      curbName: "Walk-Up Line #02",
      heatLevel: "Medium Jalapeño",
      itemsSummary: "Birria Tacos (3x) x1, Agua Fresca x1",
      total: 470,
      paymentMode: "UPI",
      synced: true,
      pitchSpot: "Downtown Tech Pitch #B2",
    },
    {
      id: "tk-143",
      tokenNo: "#TRK-143",
      curbName: "Pager #19 (Dead-Zone Cache)",
      heatLevel: "Ghost Reaper",
      itemsSummary: "Double Smash Burger x2, Street Fries x1",
      total: 820,
      paymentMode: "Offline Buffer",
      synced: false,
      pitchSpot: "Downtown Tech Pitch #B2",
    },
  ],
  pitches: [
    { id: "pt-1", day: "Thu Lunch", location: "Downtown Tech Pitch #B2", hours: "11:30–15:00", permitCode: "CITY-VND-204", active: true },
    { id: "pt-2", day: "Fri Evening", location: "Brewery Tapyard Alley", hours: "17:30–23:00", permitCode: "PRK-NIT-889", active: false },
    { id: "pt-3", day: "Sat Market", location: "Harbor Pier Street Food Lot", hours: "12:00–22:00", permitCode: "HAR-MKT-112", active: false },
  ],
  commissary: [
    { id: "cm-1", item: "Braised Beef Birria (Vacuum Cambro)", loadedQty: "18 kg", parTarget: "18 kg", checked: true },
    { id: "cm-2", item: "Dry-Aged Chuck Smash Patties", loadedQty: "140 pcs", parTarget: "150 pcs", checked: true },
    { id: "cm-3", item: "Propane Generator Cylinder Backup", loadedQty: "2 Full Tanks", parTarget: "2 Full Tanks", checked: false },
  ],
};

export function StreetRollFoodTruckApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState } = useDemoState<FoodTruckState>(
    product.slug,
    STREET_ROLL_SEED
  );
  const [tab, setTab] = useState<TabId>("pos");
  const [heat, setHeat] = useState<StreetTicket["heatLevel"]>("Medium Jalapeño");
  const [bag, setBag] = useState<Record<string, number>>({ "sm-1": 1 });
  const [curbNameInput, setCurbNameInput] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [customOpen, setCustomOpen] = useState(false);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((curr) => (curr === msg ? null : curr)), 2600);
  };

  const activePitch = useMemo(
    () => state.pitches.find((p) => p.active) || state.pitches[0],
    [state.pitches]
  );

  const offlineBufferedCount = useMemo(
    () => state.tickets.filter((t) => !t.synced).length,
    [state.tickets]
  );

  const bagItems = useMemo(
    () =>
      Object.entries(bag)
        .filter(([, q]) => q > 0)
        .map(([id, qty]) => ({ item: STREET_MENU.find((m) => m.id === id)!, qty }))
        .filter((x) => Boolean(x.item)),
    [bag]
  );

  const bagTotal = useMemo(
    () => bagItems.reduce((s, r) => s + r.item.price * r.qty, 0),
    [bagItems]
  );

  const submitStreetTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (bagItems.length === 0) return;
    const customerLabel = curbNameInput.trim() || `Walk-Up Curb #${state.tickets.length + 11}`;
    const tokenNo = `#TRK-${144 + state.tickets.length}`;
    const created: StreetTicket = {
      id: `tk-${Date.now()}`,
      tokenNo,
      curbName: customerLabel,
      heatLevel: heat,
      itemsSummary: bagItems.map((b) => `${b.item.name.split("(")[0].trim()} x${b.qty}`).join(", "),
      total: bagTotal,
      paymentMode: state.offlineMode ? "Offline Buffer" : "UPI",
      synced: !state.offlineMode,
      pitchSpot: activePitch.location,
    };
    setState((prev) => ({
      ...prev,
      tickets: [created, ...prev.tickets],
    }));
    setCurbNameInput("");
    setBag({ "sm-1": 1 });
    notify(
      state.offlineMode
        ? `${tokenNo} buffered offline cleanly (LTE off) for ${customerLabel}.`
        : `${tokenNo} fired to truck flat-top for ${customerLabel}.`
    );
  };

  const flushOfflineQueue = () => {
    setState((prev) => ({
      ...prev,
      offlineMode: false,
      tickets: prev.tickets.map((t) => ({ ...t, synced: true })),
    }));
    notify("Flushed offline truck tickets to cloud ledger.");
  };

  const activatePitch = (id: string) => {
    setState((prev) => ({
      ...prev,
      pitches: prev.pitches.map((p) => ({ ...p, active: p.id === id })),
    }));
    notify("Truck GPS pitch site switched.");
  };

  const toggleCommissary = (id: string) => {
    setState((prev) => ({
      ...prev,
      commissary: prev.commissary.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c)),
    }));
  };

  return (
    <div className="min-h-screen bg-[#121416] text-[#E2E2E5] flex flex-col font-sans">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-[#FACC15] text-[#231B00] text-xs font-extrabold shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Top Asphalt Status Header */}
      <header className="border-b border-[#333537] bg-[#1A1C1E] px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/demos/food-hospitality/food-truck-management"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#38393C] text-xs text-[#D1C6AB] hover:bg-[#282A2C]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div>
            <div className="font-bold text-sm tracking-tight text-[#FACC15] flex items-center gap-2">
              {state.unitName} · {activePitch.location}
            </div>
            <div className="text-[11px] font-mono text-[#D1C6AB]">
              Permit {activePitch.permitCode} · Curb Window {activePitch.hours}
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "pos", label: "Rapid Street POS" },
            { id: "queue", label: `Offline Queue (${offlineBufferedCount} Pending)` },
            { id: "pitches", label: "Weekly Pitch Schedule" },
            { id: "commissary", label: "Commissary Load-Out" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as TabId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                tab === item.id
                  ? "bg-[#FACC15] text-[#231B00]"
                  : "bg-[#282A2C] text-[#E2E2E5] hover:bg-[#333537]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setState((prev) => ({ ...prev, offlineMode: !prev.offlineMode }))
            }
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer ${
              state.offlineMode
                ? "bg-[#670211] text-[#FFE8E6]"
                : "bg-[#003919] text-[#4DE082]"
            }`}
          >
            {state.offlineMode ? <CloudOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            {state.offlineMode ? "OFFLINE CACHE" : "ONLINE"}
          </button>
          <button
            type="button"
            onClick={() => {
              resetState();
              notify("Food truck POS & offline buffer reset.");
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#38393C] bg-[#1E2022] text-xs text-[#E2E2E5] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            type="button"
            onClick={() => setCustomOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#3C2F00] text-[#FFECB9] text-xs font-semibold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Customize
          </button>
        </div>
      </header>

      {/* VIEW 1: RAPID TOUCH POS + TICKET DRAWER */}
      {tab === "pos" && (
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-5 p-4 md:p-6">
          <div className="xl:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#333537] bg-[#1E2022] p-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono uppercase text-[#D1C6AB]">Heat Modifier:</span>
                {(["Mild", "Medium Jalapeño", "Ghost Reaper"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setHeat(lvl)}
                    className={`px-3 py-1 rounded-lg font-bold cursor-pointer ${
                      heat === lvl
                        ? "bg-[#FACC15] text-[#231B00]"
                        : "bg-[#282A2C] text-[#E2E2E5]"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              {offlineBufferedCount > 0 && (
                <button
                  type="button"
                  onClick={flushOfflineQueue}
                  className="px-3 py-1 rounded-lg bg-[#00B55D] text-[#00210C] font-bold cursor-pointer"
                >
                  Sync {offlineBufferedCount} Offline Ticket(s)
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {STREET_MENU.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#333537] bg-[#1E2022] p-4 flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#4DE082]">
                      <span>{item.category}</span>
                      <span>PREP: {item.prepMins}M</span>
                    </div>
                    <h3 className="font-bold text-sm text-white mt-1.5">{item.name}</h3>
                    <p className="text-xs text-[#D1C6AB] mt-1">{item.desc}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#333537]">
                    <span className="font-mono font-bold text-base text-[#FACC15]">₹{item.price}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setBag((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }))
                      }
                      className="px-3 py-1.5 rounded-lg bg-[#282A2C] hover:bg-[#FACC15] hover:text-[#231B00] text-white text-xs font-bold cursor-pointer transition"
                    >
                      + ADD ({bag[item.id] || 0})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 cols: Curb Ticket Tender & Live Sync Feed */}
          <aside className="xl:col-span-5 space-y-4">
            <div className="rounded-2xl border border-[#333537] bg-[#1E2022] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-[#FACC15] text-[#231B00] font-mono text-xs font-extrabold">
                  NEW CURB TICKET
                </span>
                <span className="text-xs font-mono text-[#4DE082]">
                  {heat} · {state.offlineMode ? "Offline Queue Mode" : "Instant Cloud Sync"}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {bagItems.map(({ item, qty }) => (
                  <div key={item.id} className="flex items-center justify-between py-1.5 border-b border-[#333537]">
                    <span>{qty}x {item.name}</span>
                    <span className="font-mono font-bold text-[#FACC15]">₹{item.price * qty}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={submitStreetTicket} className="space-y-3 text-xs">
                <div>
                  <label className="block font-mono text-[#D1C6AB] mb-1">Pager / Curb Callout Name</label>
                  <input
                    type="text"
                    value={curbNameInput}
                    onChange={(e) => setCurbNameInput(e.target.value)}
                    placeholder="Enter curb customer or pager..."
                    className="w-full px-3 py-2 rounded-xl border border-[#4D4632] bg-[#121416] text-white"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[#D1C6AB]">TOTAL DUE</span>
                  <span className="text-2xl font-mono font-extrabold text-[#FACC15]">₹{bagTotal}</span>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#FACC15] hover:bg-[#FFE083] text-[#231B00] font-extrabold text-sm cursor-pointer"
                >
                  {state.offlineMode ? "⚡ Buffer Offline Curb Ticket" : "🔥 Fire Ticket & Settle UPI"}
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-[#333537] bg-[#1E2022] p-4 space-y-2">
              <div className="text-[11px] font-mono uppercase text-[#D1C6AB]">
                Recent Curb Tickets ({state.tickets.length})
              </div>
              {state.tickets.slice(0, 3).map((t) => (
                <div key={t.id} className="p-2.5 rounded-xl bg-[#121416] border border-[#282A2C] flex items-center justify-between gap-2 text-xs">
                  <div className="min-w-0">
                    <div className="font-bold text-white truncate">
                      {t.tokenNo} · {t.curbName}
                    </div>
                    <div className="text-[11px] text-[#D1C6AB] truncate">{t.itemsSummary}</div>
                  </div>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      t.synced ? "bg-[#003919] text-[#4DE082]" : "bg-[#670211] text-[#FFE8E6]"
                    }`}
                  >
                    {t.synced ? "SYNCED" : "OFFLINE"}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* VIEW 2: OFFLINE QUEUE & ORDER LOG */}
      {tab === "queue" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-[#FACC15]">Offline-First Curb Queue & Order Log</h1>
            <button
              type="button"
              onClick={flushOfflineQueue}
              className="px-4 py-2 rounded-xl bg-[#4DE082] text-[#003919] text-xs font-extrabold cursor-pointer"
            >
              Flush & Sync All Offline Tickets
            </button>
          </div>
          <div className="space-y-3">
            {state.tickets.map((t) => (
              <div key={t.id} className="rounded-2xl border border-[#333537] bg-[#1E2022] p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-sm text-white">{t.tokenNo} · {t.curbName}</div>
                  <div className="text-[#D1C6AB]">{t.itemsSummary} · Heat: {t.heatLevel}</div>
                  <div className="text-[11px] font-mono text-[#D1C6AB]">{t.pitchSpot}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-base text-[#FACC15]">₹{t.total}</span>
                  <span
                    className={`px-2.5 py-1 rounded font-mono font-bold ${
                      t.synced ? "bg-[#003919] text-[#4DE082]" : "bg-[#670211] text-[#FFE8E6]"
                    }`}
                  >
                    {t.synced ? "Cloud Synced" : "Buffered Offline"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: WEEKLY PITCH SCHEDULE */}
      {tab === "pitches" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-bold text-[#FACC15]">Weekly GPS Pitch Stops & Municipal Permits</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.pitches.map((p) => (
              <div key={p.id} className="rounded-2xl border border-[#333537] bg-[#1E2022] p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#4DE082]">{p.day}</span>
                  {p.active && <span className="px-2 py-0.5 rounded bg-[#FACC15] text-[#231B00] font-bold">PARKED NOW</span>}
                </div>
                <div className="font-bold text-base text-white">{p.location}</div>
                <div className="font-mono text-[#D1C6AB] space-y-1">
                  <div>Hours: {p.hours}</div>
                  <div>Permit: {p.permitCode}</div>
                </div>
                <button
                  type="button"
                  onClick={() => activatePitch(p.id)}
                  className="w-full py-2 rounded-xl bg-[#282A2C] hover:bg-[#FACC15] hover:text-[#231B00] font-bold cursor-pointer"
                >
                  {p.active ? "Active Truck GPS ✓" : "Switch Active Pitch"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: COMMISSARY LOAD-OUT */}
      {tab === "commissary" && (
        <div className="flex-1 p-4 md:p-6 max-w-4xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-bold text-[#FACC15]">Morning Commissary Prep & Truck Cooler Load-Out</h1>
          <div className="space-y-3">
            {state.commissary.map((c) => (
              <div key={c.id} className="rounded-2xl border border-[#333537] bg-[#1E2022] p-4 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-sm text-white">{c.item}</div>
                  <div className="font-mono text-[#D1C6AB]">Loaded: {c.loadedQty} / Par {c.parTarget}</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleCommissary(c.id)}
                  className={`px-3.5 py-1.5 rounded-lg font-bold cursor-pointer ${
                    c.checked ? "bg-[#4DE082] text-[#003919]" : "bg-[#282A2C] text-[#FACC15]"
                  }`}
                >
                  {c.checked ? "Loaded on Truck ✓" : "Verify Cooler"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <CustomizationModal demo={toDemoModel(product)} isOpen={customOpen} onClose={() => setCustomOpen(false)} />
    </div>
  );
}
