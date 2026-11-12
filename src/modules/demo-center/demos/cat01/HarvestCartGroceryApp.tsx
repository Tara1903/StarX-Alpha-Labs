"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  Leaf,
  PackageCheck,
  Plus,
  RefreshCw,
  RotateCcw,
  ShoppingBasket,
  Sparkles,
} from "lucide-react";
import type { DemoProductDefinition } from "../../types";
import { toDemoModel } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

type TabId = "produce" | "subscriptions" | "picker" | "slots";

interface ProduceCatalogItem {
  id: string;
  farm: string;
  name: string;
  category: "Heirloom Produce" | "Dairy & Eggs" | "Artisan Staples";
  harvestNote: string;
  pricePerKg: number;
  subscribable: boolean;
}

interface CrateOrder {
  id: string;
  refNo: string;
  household: string;
  slotWindow: string;
  itemsSummary: string;
  total: number;
  dailySubscription: boolean;
  status: "Packing (Cold Chain)" | "Substitute Review" | "Dispatched";
}

interface SubstituteProposal {
  id: string;
  outOfStockItem: string;
  proposedSwap: string;
  deltaLabel: string;
  decision: "Pending" | "Approved" | "Declined & Refunded";
}

interface HarvestCartState {
  brandName: string;
  selectedSlot: string;
  crateOrders: CrateOrder[];
  substitutes: SubstituteProposal[];
}

const PRODUCE_ITEMS: ProduceCatalogItem[] = [
  { id: "pr-1", farm: "Valley Creek Organic", name: "Heirloom San Marzano Tomatoes", category: "Heirloom Produce", harvestNote: "Picked 4h ago", pricePerKg: 240, subscribable: false },
  { id: "pr-2", farm: "Green Grove Co-Op", name: "Organic Baby Tuscan Kale", category: "Heirloom Produce", harvestNote: "Triple washed", pricePerKg: 320, subscribable: true },
  { id: "pr-3", farm: "Pasture Valley Creamery", name: "A2 Grass-Fed Farm Milk & Curd Pack", category: "Dairy & Eggs", harvestNote: "6:00 AM Churn", pricePerKg: 140, subscribable: true },
  { id: "pr-4", farm: "Sierra Orchard", name: "Wild Mountain Blueberries & Berries", category: "Artisan Staples", harvestNote: "Zero pesticide", pricePerKg: 680, subscribable: false },
];

const WEIGHT_OPTIONS = [250, 500, 1000] as const;

const HARVEST_CART_SEED: HarvestCartState = {
  brandName: "HarvestCart Fresh",
  selectedSlot: "Tomorrow 6:30–8:00 AM Express",
  crateOrders: [
    {
      id: "hc-91",
      refNo: "#HC-8849",
      household: "Rao Residence (Villa 14)",
      slotWindow: "Tomorrow 6:30–8:00 AM Express",
      itemsSummary: "A2 Grass-Fed Milk 1kg (Daily), Tomatoes 500g",
      total: 246,
      dailySubscription: true,
      status: "Substitute Review",
    },
    {
      id: "hc-92",
      refNo: "#HC-8854",
      household: "Mehta Penthouse B2",
      slotWindow: "Tomorrow 6:30–8:00 AM Express",
      itemsSummary: "Organic Baby Kale 250g, Wild Blueberries 500g",
      total: 420,
      dailySubscription: false,
      status: "Packing (Cold Chain)",
    },
  ],
  substitutes: [
    {
      id: "sub-1",
      outOfStockItem: "Standard Hass Avocado (Pack of 3)",
      proposedSwap: "Organic Jumbo Coastal Haas (+15% weight)",
      deltaLabel: "Free Upgrade (₹0 extra)",
      decision: "Pending",
    },
  ],
};

export function HarvestCartGroceryApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState } = useDemoState<HarvestCartState>(
    product.slug,
    HARVEST_CART_SEED
  );
  const [tab, setTab] = useState<TabId>("produce");
  const [weights, setWeights] = useState<Record<string, number>>({
    "pr-1": 500,
    "pr-2": 250,
    "pr-3": 1000,
    "pr-4": 500,
  });
  const [subDailyMap, setSubDailyMap] = useState<Record<string, boolean>>({
    "pr-3": true,
  });
  const [basket, setBasket] = useState<{ itemId: string; grams: number; dailySub: boolean }[]>([
    { itemId: "pr-3", grams: 1000, dailySub: true },
  ]);
  const [householdInput, setHouseholdInput] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [customOpen, setCustomOpen] = useState(false);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((curr) => (curr === msg ? null : curr)), 2600);
  };

  const priceFor = (item: ProduceCatalogItem, grams: number, daily: boolean) => {
    const raw = (item.pricePerKg * grams) / 1000;
    return Math.round(daily ? raw * 0.9 : raw);
  };

  const basketTotal = useMemo(() => {
    return basket.reduce((sum, entry) => {
      const it = PRODUCE_ITEMS.find((p) => p.id === entry.itemId);
      return sum + (it ? priceFor(it, entry.grams, entry.dailySub) : 0);
    }, 0);
  }, [basket]);

  const scheduleCrateDrop = (e: React.FormEvent) => {
    e.preventDefault();
    const household = householdInput.trim();
    if (!household) return;
    const summary = basket
      .map((b) => {
        const it = PRODUCE_ITEMS.find((p) => p.id === b.itemId);
        return it ? `${it.name.split(" ")[0]} ${b.grams}g${b.dailySub ? " (Daily)" : ""}` : "";
      })
      .filter(Boolean)
      .join(", ");

    const created: CrateOrder = {
      id: `hc-${Date.now()}`,
      refNo: `#HC-${8860 + state.crateOrders.length}`,
      household,
      slotWindow: state.selectedSlot,
      itemsSummary: summary || "Fresh Crate Bundle",
      total: basketTotal,
      dailySubscription: basket.some((b) => b.dailySub),
      status: "Packing (Cold Chain)",
    };

    setState((prev) => ({
      ...prev,
      crateOrders: [created, ...prev.crateOrders],
    }));
    setHouseholdInput("");
    notify(`Scheduled cold-chain crate ${created.refNo} for ${household} (${state.selectedSlot}).`);
  };

  const resolveSubstitute = (id: string, decision: SubstituteProposal["decision"]) => {
    setState((prev) => ({
      ...prev,
      substitutes: prev.substitutes.map((s) => (s.id === id ? { ...s, decision } : s)),
    }));
    notify(`Picker substitute decision recorded: ${decision}.`);
  };

  const toggleDailySubscription = (orderId: string) => {
    setState((prev) => ({
      ...prev,
      crateOrders: prev.crateOrders.map((c) =>
        c.id === orderId ? { ...c, dailySubscription: !c.dailySubscription } : c
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-[#F7F9F5] text-[#131B2E] flex flex-col font-sans">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-[#14532D] text-white text-xs font-semibold shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Top Botanical Forest Header */}
      <header className="border-b border-[#C0C9BE] bg-white px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/demos/food-hospitality/grocery-fresh-food-ordering"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#C0C9BE] text-xs text-[#404941] hover:bg-[#F7F9F5]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#14532D] text-white flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#003B1B]">{state.brandName}</div>
              <div className="text-[11px] font-semibold text-[#006D30]">
                {state.selectedSlot} · 3.8°C Thermal Crate
              </div>
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "produce", label: "Fresh Produce & Weight Pricing" },
            { id: "subscriptions", label: `Daily Subscriptions (${state.crateOrders.filter((c) => c.dailySubscription).length})` },
            { id: "picker", label: "Picker & Substitutes" },
            { id: "slots", label: "Delivery Slots & Crates" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as TabId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                tab === item.id
                  ? "bg-[#14532D] text-white"
                  : "bg-[#F2F3FF] text-[#131B2E] hover:bg-[#B1F2BE]/40"
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
              notify("Produce basket and cold-chain crates reset.");
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#C0C9BE] bg-white text-xs text-[#404941] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            type="button"
            onClick={() => setCustomOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FFDBCE] text-[#7F2B00] text-xs font-semibold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Customize
          </button>
        </div>
      </header>

      {/* VIEW 1: PRODUCE WEIGHT MATRIX + CRATE CHECKOUT & PICKER SUBSTITUTES */}
      {tab === "produce" && (
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-5 p-4 md:p-6">
          <div className="xl:col-span-7 space-y-4">
            <div className="rounded-2xl border border-[#B1F2BE] bg-[#E8F8EC] p-4 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-bold text-[#003B1B]">Harvest Direct · Picked 4h before doorstep drop</span>
                <div className="text-[#404941]">Zero-waste insulated crate return earns ₹120 deposit credit.</div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#14532D] text-white font-bold">
                10% OFF Daily 7AM Subscriptions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRODUCE_ITEMS.map((item) => {
                const selectedG = weights[item.id] || 500;
                const daily = Boolean(subDailyMap[item.id]);
                const computedPrice = priceFor(item, selectedG, daily);
                return (
                  <div key={item.id} className="rounded-2xl border border-[#C0C9BE] bg-white p-4 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span className="text-[#006D30]">{item.farm}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#FFDBCE] text-[#7F2B00]">{item.harvestNote}</span>
                    </div>
                    <h3 className="font-bold text-base text-[#131B2E]">{item.name}</h3>

                    <div className="text-lg font-extrabold text-[#14532D]">
                      ₹{computedPrice}{" "}
                      <span className="text-xs font-normal text-[#404941]">for {selectedG}g</span>
                    </div>

                    {/* Weight Selector Slider / Pills */}
                    <div className="flex gap-1.5 text-xs">
                      {WEIGHT_OPTIONS.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setWeights((prev) => ({ ...prev, [item.id]: g }))}
                          className={`flex-1 py-1.5 rounded-lg font-semibold cursor-pointer ${
                            selectedG === g
                              ? "bg-[#14532D] text-white"
                              : "bg-[#F7F9F5] border border-[#C0C9BE] text-[#404941]"
                          }`}
                        >
                          {g >= 1000 ? "1kg" : `${g}g`}
                        </button>
                      ))}
                    </div>

                    {/* Daily 7AM Subscription Switch */}
                    <label className="flex items-center justify-between p-2 rounded-xl bg-[#F7F9F5] border border-[#C0C9BE] text-xs cursor-pointer">
                      <span className="inline-flex items-center gap-2 font-medium">
                        <input
                          type="checkbox"
                          checked={daily}
                          onChange={() =>
                            setSubDailyMap((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                          }
                          className="accent-[#14532D]"
                        />
                        Subscribe Daily 7AM
                      </span>
                      <span className="text-[#006D30] font-bold">Save 10%</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setBasket((prev) => [...prev, { itemId: item.id, grams: selectedG, dailySub: daily }]);
                        notify(`Added ${selectedG}g ${item.name} to morning crate.`);
                      }}
                      className="w-full py-2 rounded-xl bg-[#006D30] hover:bg-[#14532D] text-white text-xs font-bold cursor-pointer"
                    >
                      + Add to Morning Crate
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 5 cols: Morning Crate Checkout + Live Picker Substitute Approval */}
          <aside className="xl:col-span-5 space-y-4">
            <div className="rounded-2xl border border-[#C0C9BE] bg-white p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-base text-[#003B1B]">Schedule Farm-to-Door Crate</h2>
                <span className="font-mono font-bold text-sm text-[#14532D]">₹{basketTotal}</span>
              </div>

              <div className="space-y-1.5 text-xs">
                {basket.map((b, i) => {
                  const it = PRODUCE_ITEMS.find((p) => p.id === b.itemId);
                  if (!it) return null;
                  return (
                    <div key={i} className="flex justify-between py-1 border-b border-[#F2F3FF]">
                      <span>
                        {it.name} ({b.grams}g){b.dailySub ? " · Daily 7AM" : ""}
                      </span>
                      <span className="font-bold">₹{priceFor(it, b.grams, b.dailySub)}</span>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={scheduleCrateDrop} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#404941] mb-1">Household / Villa Delivery Name</label>
                  <input
                    type="text"
                    value={householdInput}
                    onChange={(e) => setHouseholdInput(e.target.value)}
                    placeholder="Enter household or apartment..."
                    className="w-full px-3 py-2 rounded-xl border border-[#C0C9BE] bg-[#F7F9F5]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#14532D] hover:bg-[#003B1B] text-white font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Schedule Morning Crate Drop
                </button>
              </form>

              <div className="pt-3 border-t border-[#E8F8EC] space-y-2">
                <div className="text-[11px] font-bold uppercase text-[#404941]">
                  Scheduled Morning Crates ({state.crateOrders.length})
                </div>
                {state.crateOrders.slice(0, 2).map((c) => (
                  <div key={c.id} className="p-2.5 rounded-xl bg-[#F7F9F5] border border-[#C0C9BE] text-xs flex justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-bold text-[#003B1B] truncate">{c.refNo} · {c.household}</div>
                      <div className="text-[11px] text-[#404941] truncate">{c.itemsSummary}</div>
                    </div>
                    <span className="shrink-0 font-bold text-[#14532D]">₹{c.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Picker Substitute Approval Drawer */}
            <div className="rounded-2xl border border-[#C0C9BE] bg-white p-5 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#003B1B]">Live Picker Substitute Request</span>
                <span className="px-2 py-0.5 rounded bg-[#FFDBCE] text-[#7F2B00] font-bold">Bay 4 · Picker Marcus</span>
              </div>
              {state.substitutes.map((s) => (
                <div key={s.id} className="space-y-2.5">
                  <div className="p-2.5 rounded-xl bg-[#FFFBEB] border border-[#FFDCC3]">
                    <div className="line-through text-[#7F2B00]">{s.outOfStockItem}</div>
                    <div className="font-bold text-[#003B1B] mt-0.5">Match: {s.proposedSwap}</div>
                    <div className="text-[11px] text-[#006D30]">{s.deltaLabel}</div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-[#14532D]">Status: {s.decision}</span>
                    {s.decision === "Pending" && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => resolveSubstitute(s.id, "Approved")}
                          className="px-3 py-1.5 rounded-lg bg-[#14532D] text-white font-bold cursor-pointer"
                        >
                          Approve Substitute
                        </button>
                        <button
                          type="button"
                          onClick={() => resolveSubstitute(s.id, "Declined & Refunded")}
                          className="px-3 py-1.5 rounded-lg border border-[#C0C9BE] text-[#404941] cursor-pointer"
                        >
                          Refund
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* VIEW 2: DAILY SUBSCRIPTIONS */}
      {tab === "subscriptions" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-bold text-[#003B1B]">Recurring 7:00 AM Milk, Eggs & Greens Subscriptions</h1>
          <div className="space-y-3">
            {state.crateOrders.map((c) => (
              <div key={c.id} className="rounded-2xl border border-[#C0C9BE] bg-white p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-sm text-[#003B1B]">{c.refNo} · {c.household}</div>
                  <div className="text-[#404941]">{c.itemsSummary} · {c.slotWindow}</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleDailySubscription(c.id)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold cursor-pointer ${
                    c.dailySubscription ? "bg-[#14532D] text-white" : "bg-[#F7F9F5] border border-[#C0C9BE]"
                  }`}
                >
                  {c.dailySubscription ? "Daily Subscription Active ✓" : "Enable Daily Repeat"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: PICKER PACKING & SUBSTITUTES */}
      {tab === "picker" && (
        <div className="flex-1 p-4 md:p-6 max-w-4xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-bold text-[#003B1B]">Cold-Chain Crate Packing & Ripeness Swaps</h1>
          <div className="rounded-2xl border border-[#C0C9BE] bg-white p-5 space-y-3 text-xs">
            {state.substitutes.map((s) => (
              <div key={s.id} className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-sm">{s.proposedSwap}</div>
                  <div className="text-[#404941]">Replacing: {s.outOfStockItem} · Decision: {s.decision}</div>
                </div>
                <button
                  type="button"
                  onClick={() => resolveSubstitute(s.id, "Approved")}
                  className="px-4 py-2 rounded-xl bg-[#14532D] text-white font-bold cursor-pointer"
                >
                  Approve Ripeness Upgrade
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: DELIVERY SLOTS & THERMAL CRATES */}
      {tab === "slots" && (
        <div className="flex-1 p-4 md:p-6 max-w-4xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-bold text-[#003B1B]">Choose Express Farm Delivery Window</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {[
              "Tomorrow 6:30–8:00 AM Express",
              "Tomorrow 9:00–11:00 AM Midday",
              "Tomorrow 5:00–7:00 PM Evening Harvest",
            ].map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => {
                  setState((prev) => ({ ...prev, selectedSlot: slot }));
                  notify(`Selected delivery slot: ${slot}`);
                }}
                className={`p-5 rounded-2xl border text-left space-y-2 cursor-pointer ${
                  state.selectedSlot === slot
                    ? "bg-[#14532D] text-white border-[#14532D]"
                    : "bg-white border-[#C0C9BE] text-[#131B2E]"
                }`}
              >
                <div className="font-bold text-sm">{slot}</div>
                <div className="opacity-85">3.8°C Thermal Crate · Reusable Swap</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <CustomizationModal demo={toDemoModel(product)} isOpen={customOpen} onClose={() => setCustomOpen(false)} />
    </div>
  );
}
