"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  CheckCircle2,
  CreditCard,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Utensils,
} from "lucide-react";
import type { DemoProductDefinition } from "../../types";
import { toDemoModel } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

type TabId = "tape" | "folio" | "mealplans" | "housekeeping";

interface SuiteRecord {
  id: string;
  roomNo: string;
  suiteName: string;
  category: "Presidential & Villas" | "Grand Penthouse" | "Riviera Ocean";
  guestName: string | null;
  mealPlan: "CP" | "MAP" | "AP";
  ratePerNight: number;
  nights: number;
  housekeeping: "Inspected" | "In-House Clean" | "Turnover";
  dinnerSlot: string;
  folioIncidentals: number;
}

interface FolioCharge {
  id: string;
  roomNo: string;
  outlet: string;
  description: string;
  amount: number;
  mealCreditApplied: number;
  postedAt: string;
}

interface HotelPmsState {
  propertyName: string;
  selectedRoomNo: string;
  suites: SuiteRecord[];
  charges: FolioCharge[];
}

const AURELIA_SEED: HotelPmsState = {
  propertyName: "Aurelia Grand PMS + F&B",
  selectedRoomNo: "304",
  suites: [
    {
      id: "st-301",
      roomNo: "301",
      suiteName: "Penthouse Azure",
      category: "Grand Penthouse",
      guestName: "Alexander Sterling",
      mealPlan: "MAP",
      ratePerNight: 42000,
      nights: 4,
      housekeeping: "In-House Clean",
      dinnerSlot: "Le Belvédère · 20:00",
      folioIncidentals: 14800,
    },
    {
      id: "st-302",
      roomNo: "302",
      suiteName: "Grand Riviera Suite",
      category: "Riviera Ocean",
      guestName: null,
      mealPlan: "CP",
      ratePerNight: 28000,
      nights: 0,
      housekeeping: "Inspected",
      dinnerSlot: "Ready for Arrival",
      folioIncidentals: 0,
    },
    {
      id: "st-304",
      roomNo: "304",
      suiteName: "Riviera Royal Suite",
      category: "Presidential & Villas",
      guestName: "Countess Elena Rostova",
      mealPlan: "AP",
      ratePerNight: 68000,
      nights: 5,
      housekeeping: "In-House Clean",
      dinnerSlot: "Private Terrace · 19:30",
      folioIncidentals: 28400,
    },
    {
      id: "st-305",
      roomNo: "305",
      suiteName: "Mediterranean Garden Villa",
      category: "Presidential & Villas",
      guestName: "Duke & Duchess Somerset",
      mealPlan: "MAP",
      ratePerNight: 54000,
      nights: 3,
      housekeeping: "In-House Clean",
      dinnerSlot: "Seafood Pavilion · 20:30",
      folioIncidentals: 19200,
    },
    {
      id: "st-402",
      roomNo: "402",
      suiteName: "Deluxe Promenade",
      category: "Riviera Ocean",
      guestName: null,
      mealPlan: "CP",
      ratePerNight: 22000,
      nights: 0,
      housekeeping: "Turnover",
      dinnerSlot: "Attendant: Marie L.",
      folioIncidentals: 0,
    },
  ],
  charges: [
    {
      id: "ch-1",
      roomNo: "304",
      outlet: "Le Gabriel Fine Dining",
      description: "7-Course Grand Cru Tasting Menu (2 Guests)",
      amount: 18500,
      mealCreditApplied: 4000,
      postedAt: "20:14",
    },
    {
      id: "ch-2",
      roomNo: "301",
      outlet: "In-Room Sommelier",
      description: "Dom Pérignon Vintage 2013 + Mineral Cordials",
      amount: 14800,
      mealCreditApplied: 0,
      postedAt: "19:42",
    },
  ],
};

export function AureliaGrandPmsApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState } = useDemoState<HotelPmsState>(
    product.slug,
    AURELIA_SEED
  );
  const [tab, setTab] = useState<TabId>("tape");
  const [categoryFilter, setCategoryFilter] = useState<string>("All Suites");
  const [chargeDesc, setChargeDesc] = useState("");
  const [chargeAmt, setChargeAmt] = useState("6500");
  const [chargeOutlet, setChargeOutlet] = useState("Le Gabriel Fine Dining");
  const [toast, setToast] = useState<string | null>(null);
  const [customOpen, setCustomOpen] = useState(false);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((curr) => (curr === msg ? null : curr)), 2600);
  };

  const selectedSuite = useMemo(
    () => state.suites.find((s) => s.roomNo === state.selectedRoomNo) || state.suites[0],
    [state.suites, state.selectedRoomNo]
  );

  const occupiedCount = useMemo(
    () => state.suites.filter((s) => s.guestName).length,
    [state.suites]
  );

  const filteredSuites = useMemo(() => {
    if (categoryFilter === "All Suites") return state.suites;
    return state.suites.filter((s) => s.category === categoryFilter);
  }, [state.suites, categoryFilter]);

  const handlePostCharge = (e: React.FormEvent) => {
    e.preventDefault();
    const desc = chargeDesc.trim();
    const amt = Math.max(200, Number(chargeAmt) || 0);
    if (!desc || !selectedSuite.guestName) {
      notify("Select an occupied suite and enter a F&B charge description.");
      return;
    }
    const credit = selectedSuite.mealPlan === "AP" ? Math.round(amt * 0.25) : selectedSuite.mealPlan === "MAP" ? Math.round(amt * 0.15) : 0;
    const netPosted = Math.max(0, amt - credit);
    const created: FolioCharge = {
      id: `ch-${Date.now()}`,
      roomNo: selectedSuite.roomNo,
      outlet: chargeOutlet,
      description: desc,
      amount: amt,
      mealCreditApplied: credit,
      postedAt: "Live Post",
    };
    setState((prev) => ({
      ...prev,
      charges: [created, ...prev.charges],
      suites: prev.suites.map((s) =>
        s.roomNo === selectedSuite.roomNo
          ? { ...s, folioIncidentals: s.folioIncidentals + netPosted }
          : s
      ),
    }));
    setChargeDesc("");
    notify(`Posted ₹${netPosted.toLocaleString("en-IN")} to Suite #${selectedSuite.roomNo} folio.`);
  };

  const checkInVacantSuite = (roomNo: string) => {
    setState((prev) => ({
      ...prev,
      selectedRoomNo: roomNo,
      suites: prev.suites.map((s) =>
        s.roomNo === roomNo
          ? {
              ...s,
              guestName: "Lord Julian Vance",
              mealPlan: "MAP",
              nights: 3,
              housekeeping: "In-House Clean",
              dinnerSlot: "Le Belvédère · 19:45",
            }
          : s
      ),
    }));
    notify(`Checked Lord Julian Vance into Suite #${roomNo} with MAP meal entitlement.`);
  };

  const cycleHousekeeping = (roomNo: string) => {
    const order: SuiteRecord["housekeeping"][] = ["Turnover", "Inspected", "In-House Clean"];
    setState((prev) => ({
      ...prev,
      suites: prev.suites.map((s) => {
        if (s.roomNo !== roomNo) return s;
        return { ...s, housekeeping: order[(order.indexOf(s.housekeeping) + 1) % order.length] };
      }),
    }));
    notify(`Housekeeping status updated for Suite #${roomNo}.`);
  };

  return (
    <div className="min-h-screen bg-[#F6FAFF] text-[#141D23] flex flex-col font-sans">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-[#002046] text-[#FDC34D] text-xs font-bold shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Top Riviera Navy Bar */}
      <header className="bg-[#002046] text-white px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/demos/food-hospitality/hotel-restaurant-management"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1B365D] text-xs text-[#D6E3FF] hover:bg-[#2E476F]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div>
            <div className="font-serif text-base font-bold tracking-wide text-[#FDC34D]">
              {state.propertyName}
            </div>
            <div className="text-[11px] text-[#AEC7F7]">
              Aurelia Riviera Flagship · {occupiedCount}/{state.suites.length} Suites Occupied
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "tape", label: "Room & Dining Tape Chart" },
            { id: "folio", label: `Post-to-Room Folio (${state.charges.length})` },
            { id: "mealplans", label: "Meal Plans (CP/MAP/AP)" },
            { id: "housekeeping", label: "Housekeeping & Sync" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as TabId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                tab === item.id
                  ? "bg-[#FDC34D] text-[#271900]"
                  : "bg-[#1B365D] text-[#E6EFF8] hover:bg-[#2E476F]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              resetState();
              notify("Hotel tape chart and guest folios reset.");
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#1B365D] text-xs text-white cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            type="button"
            onClick={() => setCustomOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#7B5800] text-white text-xs font-semibold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Customize
          </button>
        </div>
      </header>

      {/* VIEW 1: SUITE TAPE CHART + LIVE FOLIO CHARGE BRIDGE */}
      {tab === "tape" && (
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-5 p-4 md:p-6">
          <div className="xl:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h1 className="font-serif text-xl font-bold text-[#002046]">
                  Tape Chart & Dining Entitlements
                </h1>
                <p className="text-xs text-[#44474E]">
                  Click any occupied suite to switch the live Post-to-Room F&B Folio terminal.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {["All Suites", "Presidential & Villas", "Grand Penthouse", "Riviera Ocean"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategoryFilter(c)}
                    className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                      categoryFilter === c
                        ? "bg-[#002046] text-white"
                        : "bg-white border border-[#C4C6CF] text-[#44474E]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredSuites.map((s) => {
                const isSelected = s.roomNo === selectedSuite.roomNo;
                return (
                  <div
                    key={s.id}
                    onClick={() => setState((prev) => ({ ...prev, selectedRoomNo: s.roomNo }))}
                    className={`rounded-2xl border p-4 transition cursor-pointer ${
                      isSelected
                        ? "border-[#7B5800] bg-white shadow-sm ring-1 ring-[#7B5800]"
                        : "border-[#C4C6CF] bg-white hover:border-[#465F88]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B5800]">
                          Suite #{s.roomNo} · {s.category}
                        </span>
                        <h3 className="font-serif text-base font-bold text-[#002046]">{s.suiteName}</h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            s.housekeeping === "Inspected"
                              ? "bg-[#95F8A7] text-[#00210A]"
                              : s.housekeeping === "In-House Clean"
                              ? "bg-[#D6E3FF] text-[#001B3D]"
                              : "bg-[#FFDEA6] text-[#5D4200]"
                          }`}
                        >
                          {s.housekeeping}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#002046] text-[#FDC34D] text-[11px] font-bold">
                          {s.mealPlan} Plan
                        </span>
                      </div>
                    </div>

                    {s.guestName ? (
                      <div className="mt-3 rounded-xl bg-[#002046] text-white p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div>
                          <span className="font-bold text-[#FDC34D]">{s.guestName}</span> · {s.nights} Nights · ₹{s.ratePerNight.toLocaleString("en-IN")}/n
                          <div className="text-[11px] text-[#AEC7F7] mt-0.5">{s.dinnerSlot}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] uppercase text-[#AEC7F7]">Folio Incidentals</div>
                          <div className="font-bold text-[#FDC34D]">₹{s.folioIncidentals.toLocaleString("en-IN")}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3 rounded-xl bg-[#ECF5FE] border border-[#DBE4ED] p-3 flex items-center justify-between text-xs">
                        <span className="text-[#005323] font-semibold">
                          {s.housekeeping === "Inspected" ? "Vacant & Inspected — Ready" : `Turnover in Progress (${s.dinnerSlot})`}
                        </span>
                        <button
                          type="button"
                          onClick={(ev) => {
                            ev.stopPropagation();
                            checkInVacantSuite(s.roomNo);
                          }}
                          className="px-3 py-1 rounded-lg bg-[#002046] text-white font-semibold cursor-pointer"
                        >
                          Quick Check-In Guest
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 5 cols: Live Post-to-Room F&B Folio Terminal */}
          <aside className="xl:col-span-5 rounded-2xl border border-[#C4C6CF] bg-white p-5 space-y-4 h-fit">
            <div className="flex items-start justify-between gap-2 border-b border-[#E6EFF8] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#7B5800]">
                  Target Room Folio · In-House Verified
                </span>
                <h2 className="font-serif text-lg font-bold text-[#002046]">
                  Suite #{selectedSuite.roomNo} — {selectedSuite.suiteName}
                </h2>
                <div className="text-xs text-[#44474E]">
                  {selectedSuite.guestName || "No guest checked in"} · {selectedSuite.mealPlan} Meal Entitlement
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#95F8A7] text-[#00210A] text-[10px] font-bold">
                VERIFIED
              </span>
            </div>

            <form onSubmit={handlePostCharge} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#44474E] mb-1">Dining Outlet</label>
                <select
                  value={chargeOutlet}
                  onChange={(e) => setChargeOutlet(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#C4C6CF] bg-[#F6FAFF]"
                >
                  <option value="Le Gabriel Fine Dining">Le Gabriel Fine Dining</option>
                  <option value="In-Room Sommelier">In-Room Sommelier</option>
                  <option value="Riviera Pool Bar">Riviera Pool Bar</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-[#44474E] mb-1">F&B Order / Charge Item</label>
                <input
                  type="text"
                  value={chargeDesc}
                  onChange={(e) => setChargeDesc(e.target.value)}
                  placeholder="Enter dining check or room service item..."
                  className="w-full px-3 py-2 rounded-xl border border-[#C4C6CF] bg-[#F6FAFF]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#44474E] mb-1">Gross Check Amount (₹)</label>
                <input
                  type="number"
                  min={200}
                  step={100}
                  value={chargeAmt}
                  onChange={(e) => setChargeAmt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#C4C6CF] bg-[#F6FAFF]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#7B5800] hover:bg-[#5D4200] text-white font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Authorize & Post to Suite #{selectedSuite.roomNo}
              </button>
            </form>

            <div className="pt-3 border-t border-[#E6EFF8] space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#44474E]">
                Posted F&B Folio Ledger ({state.charges.length})
              </div>
              {state.charges.slice(0, 3).map((ch) => (
                <div key={ch.id} className="p-2.5 rounded-xl bg-[#F6FAFF] border border-[#DBE4ED] text-xs flex justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-bold text-[#002046] truncate">
                      #{ch.roomNo} · {ch.description}
                    </div>
                    <div className="text-[11px] text-[#44474E]">{ch.outlet}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-[#7B5800]">₹{(ch.amount - ch.mealCreditApplied).toLocaleString("en-IN")}</div>
                    {ch.mealCreditApplied > 0 && (
                      <div className="text-[10px] text-[#005323]">-₹{ch.mealCreditApplied} Plan Credit</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* VIEW 2: FULL FOLIO LEDGER */}
      {tab === "folio" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="font-serif text-xl font-bold text-[#002046]">Unified PMS Guest Folio Postings</h1>
          <div className="rounded-2xl border border-[#C4C6CF] bg-white divide-y divide-[#E6EFF8]">
            {state.charges.map((ch) => (
              <div key={ch.id} className="p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-sm text-[#002046]">Suite #{ch.roomNo} · {ch.description}</div>
                  <div className="text-[#44474E]">{ch.outlet} · Posted {ch.postedAt}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm text-[#7B5800]">
                    Net Folio: ₹{(ch.amount - ch.mealCreditApplied).toLocaleString("en-IN")}
                  </div>
                  <div className="text-[11px] text-[#005323]">
                    Meal Plan Credit: ₹{ch.mealCreditApplied.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: CP/MAP/AP MEAL PLANS */}
      {tab === "mealplans" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="font-serif text-xl font-bold text-[#002046]">CP / MAP / AP Dining Meal Entitlements</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {[
              { code: "CP (Continental)", inc: "Daily Artisan Breakfast included; à la carte dinner billed 100% to folio.", credit: "0% Dinner Deduction" },
              { code: "MAP (Modified American)", inc: "Breakfast + Dinner tasting credit included at Le Belvédère or Pavilion.", credit: "15% Automatic F&B Credit" },
              { code: "AP (Full Board)", inc: "All 3 meals + Afternoon High Tea & Sommelier cellar welcome credit.", credit: "25% Automatic F&B Credit" },
            ].map((mp) => (
              <div key={mp.code} className="rounded-2xl border border-[#C4C6CF] bg-white p-5 space-y-2">
                <div className="font-serif text-base font-bold text-[#002046]">{mp.code}</div>
                <p className="text-[#44474E]">{mp.inc}</p>
                <div className="pt-2 font-bold text-[#7B5800]">{mp.credit}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: HOUSEKEEPING SYNC */}
      {tab === "housekeeping" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="font-serif text-xl font-bold text-[#002046]">Housekeeping Turnover & In-Room Dining Sync</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.suites.map((s) => (
              <div key={s.id} className="rounded-2xl border border-[#C4C6CF] bg-white p-4 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-sm text-[#002046]">Suite #{s.roomNo} — {s.suiteName}</div>
                  <div className="text-[#44474E]">{s.guestName || "Vacant"} · {s.dinnerSlot}</div>
                </div>
                <button
                  type="button"
                  onClick={() => cycleHousekeeping(s.roomNo)}
                  className="px-3 py-1.5 rounded-lg bg-[#002046] text-white font-semibold cursor-pointer"
                >
                  {s.housekeeping} →
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
