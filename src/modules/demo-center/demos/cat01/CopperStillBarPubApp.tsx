"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Beer,
  CheckCircle2,
  CreditCard,
  Flame,
  Plus,
  RotateCcw,
  Sparkles,
  Wine,
} from "lucide-react";
import type { DemoProductDefinition } from "../../types";
import { toDemoModel } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

type TabId = "tabs" | "speedrail" | "variance" | "cocktails";

interface BarTabRecord {
  id: string;
  tabNo: string;
  guestName: string;
  seatLabel: string;
  zone: "Main Horseshoe" | "Whiskey Snug" | "Distillery Patio";
  balance: number;
  cardCap: number;
  pours: { label: string; mlUsed: number; price: number }[];
  closed: boolean;
}

interface BottleStock {
  id: string;
  spiritName: string;
  category: string;
  openBottleSizeMl: number;
  theoreticalLeftMl: number;
  physicalWeighedMl: number;
  peg30Price: number;
}

interface CocktailBom {
  id: string;
  name: string;
  glassware: string;
  price: number;
  spec: string;
  pourCost: number;
}

interface BarPubState {
  venueName: string;
  happyHourActive: boolean;
  activeTabId: string;
  tabs: BarTabRecord[];
  bottles: BottleStock[];
  cocktails: CocktailBom[];
}

const COPPER_STILL_SEED: BarPubState = {
  venueName: "CopperStill Taproom OS",
  happyHourActive: true,
  activeTabId: "tab-104",
  tabs: [
    {
      id: "tab-104",
      tabNo: "#TAB-104",
      guestName: "Marcus Sterling",
      seatLabel: "Seat Bar-06",
      zone: "Main Horseshoe",
      balance: 4850,
      cardCap: 6500,
      pours: [
        { label: "Lagavulin 16yr Single Malt (45ml)", mlUsed: 45, price: 2100 },
        { label: "Smoked Peat Old Fashioned x2", mlUsed: 120, price: 2750 },
      ],
      closed: false,
    },
    {
      id: "tab-112",
      tabNo: "#TAB-112",
      guestName: "Elena Rostova",
      seatLabel: "Snug Table 03",
      zone: "Whiskey Snug",
      balance: 8400,
      cardCap: 10000,
      pours: [
        { label: "WhistlePig 12yr Rye (60ml) x2", mlUsed: 120, price: 5400 },
        { label: "Copper Kettle Sour (Pint) x2", mlUsed: 0, price: 3000 },
      ],
      closed: false,
    },
    {
      id: "tab-121",
      tabNo: "#TAB-121",
      guestName: "Sarah Lin",
      seatLabel: "Patio High-Top 04",
      zone: "Distillery Patio",
      balance: 2150,
      cardCap: 5000,
      pours: [
        { label: "Charred Oak IPA (Draft) x2", mlUsed: 0, price: 1150 },
        { label: "House Barrel-Aged Negroni", mlUsed: 60, price: 1000 },
      ],
      closed: false,
    },
  ],
  bottles: [
    { id: "bt-1", spiritName: "Lagavulin 16yr Islay Malt", category: "Single Malt", openBottleSizeMl: 750, theoreticalLeftMl: 465, physicalWeighedMl: 450, peg30Price: 1400 },
    { id: "bt-2", spiritName: "Monkey 47 Dry Gin", category: "Botanical Gin", openBottleSizeMl: 500, theoreticalLeftMl: 310, physicalWeighedMl: 305, peg30Price: 1100 },
    { id: "bt-3", spiritName: "Michter's US*1 Straight Rye", category: "Bourbon & Rye", openBottleSizeMl: 750, theoreticalLeftMl: 540, physicalWeighedMl: 510, peg30Price: 1350 },
    { id: "bt-4", spiritName: "Don Julio Reposado Tequila", category: "Agave", openBottleSizeMl: 750, theoreticalLeftMl: 620, physicalWeighedMl: 620, peg30Price: 1250 },
  ],
  cocktails: [
    { id: "ck-1", name: "Smoked Peat Old Fashioned", glassware: "Rocks + Hand-Cut Ice", price: 1350, spec: "60ml Bourbon/Peat Wash · 10ml Demerara · 3d Angostura", pourCost: 295 },
    { id: "ck-2", name: "Barrel-Aged Copper Negroni", glassware: "Coupe", price: 1150, spec: "30ml Monkey 47 · 30ml Campari · 30ml Carpano Antica", pourCost: 260 },
    { id: "ck-3", name: "Charred Rosemary Penicillin", glassware: "Nick & Nora", price: 1250, spec: "45ml Blended Scotch · 15ml Islay Float · 20ml Ginger Honey", pourCost: 280 },
  ],
};

export function CopperStillBarPubApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState } = useDemoState<BarPubState>(
    product.slug,
    COPPER_STILL_SEED
  );
  const [tab, setTab] = useState<TabId>("tabs");
  const [zoneFilter, setZoneFilter] = useState<string>("All Tabs");
  const [newTabGuest, setNewTabGuest] = useState("");
  const [newTabSeat, setNewTabSeat] = useState("Seat Bar-09");
  const [newTabCap, setNewTabCap] = useState("6000");
  const [toast, setToast] = useState<string | null>(null);
  const [customOpen, setCustomOpen] = useState(false);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((curr) => (curr === msg ? null : curr)), 2600);
  };

  const activeTab = useMemo(
    () => state.tabs.find((t) => t.id === state.activeTabId) || state.tabs[0],
    [state.tabs, state.activeTabId]
  );

  const openTabsExposure = useMemo(
    () => state.tabs.filter((t) => !t.closed).reduce((s, t) => s + t.balance, 0),
    [state.tabs]
  );

  const filteredTabs = useMemo(() => {
    if (zoneFilter === "All Tabs") return state.tabs;
    return state.tabs.filter((t) => t.zone === zoneFilter);
  }, [state.tabs, zoneFilter]);

  const pourSpiritToTab = (bottle: BottleStock, ml: 30 | 60) => {
    if (!activeTab || activeTab.closed) {
      notify("Select an open guest tab first.");
      return;
    }
    const basePrice = ml === 30 ? bottle.peg30Price : Math.round(bottle.peg30Price * 1.85);
    const price = state.happyHourActive ? Math.round(basePrice * 0.75) : basePrice;

    setState((prev) => ({
      ...prev,
      tabs: prev.tabs.map((t) =>
        t.id === activeTab.id
          ? {
              ...t,
              balance: t.balance + price,
              pours: [{ label: `${bottle.spiritName} (${ml}ml)`, mlUsed: ml, price }, ...t.pours],
            }
          : t
      ),
      bottles: prev.bottles.map((b) =>
        b.id === bottle.id
          ? { ...b, theoreticalLeftMl: Math.max(0, b.theoreticalLeftMl - ml) }
          : b
      ),
    }));
    notify(`Poured ${ml}ml ${bottle.spiritName} → ${activeTab.tabNo} (${state.happyHourActive ? "-25% HH" : "Standard"}).`);
  };

  const handleOpenNewTab = (e: React.FormEvent) => {
    e.preventDefault();
    const guest = newTabGuest.trim();
    if (!guest) return;
    const cap = Math.max(1500, Number(newTabCap) || 6000);
    const id = `tab-${Date.now()}`;
    const created: BarTabRecord = {
      id,
      tabNo: `#TAB-${125 + state.tabs.length}`,
      guestName: guest,
      seatLabel: newTabSeat.trim() || "Seat Bar-09",
      zone: "Main Horseshoe",
      balance: 0,
      cardCap: cap,
      pours: [],
      closed: false,
    };
    setState((prev) => ({
      ...prev,
      activeTabId: id,
      tabs: [created, ...prev.tabs],
    }));
    setNewTabGuest("");
    notify(`Opened pre-authorized card tab ${created.tabNo} for ${guest} (Cap ₹${cap}).`);
  };

  const closeTab = (id: string) => {
    setState((prev) => ({
      ...prev,
      tabs: prev.tabs.map((t) => (t.id === id ? { ...t, closed: !t.closed } : t)),
    }));
    notify("Tab settlement state updated.");
  };

  const reconcileBottle = (id: string) => {
    setState((prev) => ({
      ...prev,
      bottles: prev.bottles.map((b) =>
        b.id === id ? { ...b, theoreticalLeftMl: b.physicalWeighedMl } : b
      ),
    }));
    notify("Synced theoretical POS depletion to scale weight.");
  };

  return (
    <div className="min-h-screen bg-[#151312] text-[#E8E1DF] flex flex-col font-sans">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-[#D97707] text-[#2F1500] text-xs font-extrabold shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Top Taproom Copper Bar */}
      <header className="border-b border-[#554336] bg-[#1D1B1A] px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/demos/food-hospitality/bar-pub-management"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#554336] text-xs text-[#DBC2B0] hover:bg-[#2C2928]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div>
            <div className="font-bold text-sm tracking-wide text-[#FFB77D]">
              {state.venueName}
            </div>
            <div className="text-[11px] font-mono text-[#DBC2B0]">
              Station 01 · Open Exposure: ₹{openTabsExposure.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "tabs", label: `Open Bar Tabs (${state.tabs.filter((t) => !t.closed).length})` },
            { id: "speedrail", label: "Craft & Speed-Rail POS" },
            { id: "variance", label: "Liquor ml/Peg Variance" },
            { id: "cocktails", label: "Cocktail BOM Recipes" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as TabId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                tab === item.id
                  ? "bg-[#D97707] text-[#2F1500]"
                  : "bg-[#2C2928] text-[#E8E1DF] hover:bg-[#373433]"
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
              setState((prev) => ({ ...prev, happyHourActive: !prev.happyHourActive }))
            }
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer ${
              state.happyHourActive
                ? "bg-[#003824] text-[#4EDEA3]"
                : "bg-[#2C2928] text-[#DBC2B0]"
            }`}
          >
            {state.happyHourActive ? "Happy Hour -25% ON" : "Happy Hour OFF"}
          </button>
          <button
            type="button"
            onClick={() => {
              resetState();
              notify("Bar tabs, tap meter & bottle ml logs reset.");
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#554336] bg-[#221F1E] text-xs text-[#E8E1DF] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            type="button"
            onClick={() => setCustomOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#432100] text-[#FFB77D] text-xs font-semibold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Customize
          </button>
        </div>
      </header>

      {/* VIEW 1: OPEN BAR TABS + QUICK POUR & NEW TAB TERMINAL */}
      {tab === "tabs" && (
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-5 p-4 md:p-6">
          <div className="xl:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h1 className="text-xl font-bold text-[#FFB77D]">Live Pre-Authorized Bar Tabs</h1>
                <p className="text-xs text-[#DBC2B0]">
                  Click a guest card to target Speed-Rail 30ml / 60ml pours onto their tab.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {["All Tabs", "Main Horseshoe", "Whiskey Snug", "Distillery Patio"].map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => setZoneFilter(z)}
                    className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                      zoneFilter === z
                        ? "bg-[#D97707] text-[#2F1500]"
                        : "bg-[#221F1E] text-[#DBC2B0] border border-[#554336]"
                    }`}
                  >
                    {z}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTabs.map((t) => {
                const pct = Math.min(100, Math.round((t.balance / t.cardCap) * 100));
                const isSelected = t.id === activeTab?.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setState((prev) => ({ ...prev, activeTabId: t.id }))}
                    className={`rounded-2xl border p-4 space-y-3 cursor-pointer transition ${
                      isSelected
                        ? "border-[#D97707] bg-[#221F1E] ring-1 ring-[#D97707]"
                        : "border-[#554336] bg-[#221F1E]/85 hover:border-[#A38C7C]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-base text-white">
                          {t.guestName} <span className="font-mono text-xs text-[#FFB77D]">{t.tabNo}</span>
                        </div>
                        <div className="text-xs text-[#DBC2B0]">{t.seatLabel} · {t.zone}</div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          t.closed
                            ? "bg-[#373433] text-[#DBC2B0]"
                            : pct >= 80
                            ? "bg-[#93000A] text-[#FFDAD6]"
                            : "bg-[#003824] text-[#4EDEA3]"
                        }`}
                      >
                        {t.closed ? "Closed" : pct >= 80 ? "Cap Near" : "Pre-Auth OK"}
                      </span>
                    </div>

                    <div className="rounded-xl bg-[#151312] p-3 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#DBC2B0]">Balance: <strong className="text-white font-mono">₹{t.balance}</strong></span>
                        <span className="text-[#FFB77D] font-mono">Cap: ₹{t.cardCap}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#373433] overflow-hidden">
                        <div
                          className={`h-full ${pct >= 80 ? "bg-[#FFB4AB]" : "bg-[#D97707]"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      {t.pours.slice(0, 2).map((p, idx) => (
                        <div key={idx} className="flex justify-between text-[#DBC2B0]">
                          <span className="truncate">{p.label}</span>
                          <span className="font-mono text-[#FFB77D] shrink-0">₹{p.price}</span>
                        </div>
                      ))}
                      {t.pours.length === 0 && (
                        <div className="text-[#A38C7C] italic">No pours committed yet</div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#373433] text-xs">
                      <span className="text-[#4EDEA3] font-mono">
                        {isSelected ? "● Targeted for Speed-Rail" : "Click to Target"}
                      </span>
                      <button
                        type="button"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          closeTab(t.id);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#2C2928] hover:bg-[#373433] text-[#E8E1DF] font-semibold cursor-pointer"
                      >
                        {t.closed ? "Reopen Tab" : "Close & Settle"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 5 cols: Open Card Tab Form + Speed-Rail Peg Dispense */}
          <aside className="xl:col-span-5 space-y-4">
            <div className="rounded-2xl border border-[#554336] bg-[#221F1E] p-5 space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFB77D]">
                  Card Pre-Authorization Desk
                </span>
                <h2 className="text-lg font-bold text-white">+ Open New Guest Bar Tab</h2>
              </div>

              <form onSubmit={handleOpenNewTab} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#DBC2B0] mb-1">Guest Name</label>
                  <input
                    type="text"
                    value={newTabGuest}
                    onChange={(e) => setNewTabGuest(e.target.value)}
                    placeholder="Enter guest name for card pre-auth..."
                    className="w-full px-3 py-2 rounded-xl border border-[#554336] bg-[#151312] text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#DBC2B0] mb-1">Bar Seat / Booth</label>
                    <input
                      type="text"
                      value={newTabSeat}
                      onChange={(e) => setNewTabSeat(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#554336] bg-[#151312] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#DBC2B0] mb-1">Card Cap (₹)</label>
                    <input
                      type="number"
                      step={500}
                      value={newTabCap}
                      onChange={(e) => setNewTabCap(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#554336] bg-[#151312] text-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#D97707] hover:bg-[#FFB77D] text-[#2F1500] font-extrabold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Start Pre-Auth Bar Tab
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-[#554336] bg-[#221F1E] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FFB77D]">
                  Speed-Rail Dispense → {activeTab?.tabNo}
                </span>
                <span className="text-[11px] font-mono text-[#4EDEA3]">Auto-Logs ml Variance</span>
              </div>

              {state.bottles.slice(0, 3).map((bt) => (
                <div key={bt.id} className="p-3 rounded-xl bg-[#151312] border border-[#373433] flex items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="font-bold text-white">{bt.spiritName}</div>
                    <div className="text-[11px] font-mono text-[#DBC2B0]">
                      ₹{bt.peg30Price}/30ml · Left: {bt.theoreticalLeftMl}ml
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => pourSpiritToTab(bt, 30)}
                      className="px-2.5 py-1 rounded bg-[#2C2928] hover:bg-[#D97707] hover:text-[#2F1500] font-mono font-bold cursor-pointer"
                    >
                      30ml
                    </button>
                    <button
                      type="button"
                      onClick={() => pourSpiritToTab(bt, 60)}
                      className="px-2.5 py-1 rounded bg-[#2C2928] hover:bg-[#D97707] hover:text-[#2F1500] font-mono font-bold cursor-pointer"
                    >
                      60ml
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* VIEW 2: CRAFT & SPEED-RAIL POUR POS */}
      {tab === "speedrail" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-bold text-[#FFB77D]">Top-Shelf & Speed-Rail Metered Pours</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.bottles.map((bt) => (
              <div key={bt.id} className="rounded-2xl border border-[#554336] bg-[#221F1E] p-5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-mono text-[#4EDEA3] uppercase">{bt.category}</span>
                  <div className="font-bold text-base text-white">{bt.spiritName}</div>
                  <div className="font-mono text-[#DBC2B0] mt-1">
                    Remaining Bottle: {bt.theoreticalLeftMl}ml / {bt.openBottleSizeMl}ml
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => pourSpiritToTab(bt, 30)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#D97707] text-[#2F1500] font-bold cursor-pointer"
                  >
                    Charge 30ml to {activeTab?.tabNo}
                  </button>
                  <button
                    type="button"
                    onClick={() => pourSpiritToTab(bt, 60)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#2C2928] text-white font-bold cursor-pointer"
                  >
                    Charge 60ml to {activeTab?.tabNo}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: LIQUOR ML/PEG VARIANCE */}
      {tab === "variance" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-bold text-[#FFB77D]">Bottle Weight vs POS Pour Variance Audit</h1>
          <div className="rounded-2xl border border-[#554336] bg-[#221F1E] divide-y divide-[#373433] text-xs">
            {state.bottles.map((bt) => {
              const diff = bt.physicalWeighedMl - bt.theoreticalLeftMl;
              return (
                <div key={bt.id} className="p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-sm text-white">{bt.spiritName}</div>
                    <div className="font-mono text-[#DBC2B0]">
                      POS Theoretical: {bt.theoreticalLeftMl}ml · Bar Scale Physical: {bt.physicalWeighedMl}ml
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded font-mono font-bold ${
                        diff === 0 ? "bg-[#003824] text-[#4EDEA3]" : "bg-[#93000A] text-[#FFDAD6]"
                      }`}
                    >
                      Variance: {diff > 0 ? `+${diff}ml` : `${diff}ml`}
                    </span>
                    <button
                      type="button"
                      onClick={() => reconcileBottle(bt.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#D97707] text-[#2F1500] font-bold cursor-pointer"
                    >
                      Reconcile Scale
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 4: COCKTAIL BOM RECIPES */}
      {tab === "cocktails" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-bold text-[#FFB77D]">Signature Cocktail BOM & Pour Cost Sheet</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.cocktails.map((c) => {
              const pourPct = Math.round((c.pourCost / c.price) * 100);
              return (
                <div key={c.id} className="rounded-2xl border border-[#554336] bg-[#221F1E] p-5 space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-base text-white">{c.name}</span>
                    <span className="font-mono font-bold text-[#FFB77D]">₹{c.price}</span>
                  </div>
                  <div className="text-[#4EDEA3] font-mono">{c.glassware}</div>
                  <p className="text-[#DBC2B0]">{c.spec}</p>
                  <div className="pt-2 border-t border-[#373433] font-mono flex justify-between">
                    <span>BOM Cost: ₹{c.pourCost}</span>
                    <span className="text-[#4EDEA3] font-bold">Pour Cost: {pourPct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <CustomizationModal demo={toDemoModel(product)} isOpen={customOpen} onClose={() => setCustomOpen(false)} />
    </div>
  );
}
