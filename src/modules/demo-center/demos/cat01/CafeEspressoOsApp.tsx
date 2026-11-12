"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Coffee,
  Croissant,
  Flame,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  Stamp,
  X,
} from "lucide-react";
import type { DemoProductDefinition } from "../../types";
import { toDemoModel } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

interface CafeDrink {
  id: string;
  name: string;
  category: "Espresso & Milk" | "Signature Lattes" | "Pour Over & Batch" | "Artisanal Bakery";
  basePrice: number;
  ozLabel: string;
  note: string;
}

interface CupTicket {
  id: string;
  orderNo: string;
  customerName: string;
  drinkName: string;
  sizeOz: string;
  milk: string;
  shot: string;
  finish: string;
  temp: string;
  price: number;
  channel: "TAKEAWAY" | "FOR HERE";
  stage: "Queued" | "Pulling" | "Ready";
}

interface LoyaltyCard {
  id: string;
  memberName: string;
  phone: string;
  stamps: number;
  maxStamps: number;
  preferredMilk: string;
  walletBalance: number;
}

interface BeanPastryLot {
  id: string;
  name: string;
  type: "Single-Origin Bean" | "Morning Pastry";
  originOrBatch: string;
  remainingUnits: number;
  unitLabel: string;
  wastedUnits: number;
}

interface CafeOsState {
  barName: string;
  grinderSpec: string;
  catalog: CafeDrink[];
  cupQueue: CupTicket[];
  loyaltyCards: LoyaltyCard[];
  pantryLots: BeanPastryLot[];
}

const ROASTCRAFT_SEED: CafeOsState = {
  barName: "Roastcraft Espresso OS",
  grinderSpec: "Mythos II • 18.2g In / 36.4g Out",
  catalog: [
    { id: "cd-1", name: "Flat White", category: "Espresso & Milk", basePrice: 280, ozLabel: "6.5 oz • 93°C", note: "Velvety microfoam, double ristretto, sweet cocoa profile." },
    { id: "cd-2", name: "Cortado", category: "Espresso & Milk", basePrice: 240, ozLabel: "4.5 oz • House Roast", note: "1:1 ratio, Spanish Gibraltar glass, balanced sweetness." },
    { id: "cd-3", name: "Iced Ceremonial Matcha", category: "Signature Lattes", basePrice: 340, ozLabel: "16 oz • Uji Grade", note: "Whisked cold over hand-cut clear ice." },
    { id: "cd-4", name: "Pistachio Cardamom Roll", category: "Artisanal Bakery", basePrice: 260, ozLabel: "Morning Bake", note: "Double-baked laminated sourdough, roasted pistachio frangipane." },
    { id: "cd-5", name: "Ethiopian Nitro Draft", category: "Pour Over & Batch", basePrice: 310, ozLabel: "12 oz • Keg A-04", note: "Yirgacheffe washed, floral jasmine & crisp nitrogen crema." },
    { id: "cd-6", name: "Salted Jaggery Cappuccino", category: "Signature Lattes", basePrice: 295, ozLabel: "8 oz • Seasonal", note: "Slow-simmered palm jaggery caramel & espresso." },
  ],
  cupQueue: [
    {
      id: "cup-201",
      orderNo: "#201",
      customerName: "Liam K.",
      drinkName: "Flat White",
      sizeOz: "12 oz",
      milk: "OAT MILK",
      shot: "DBL RISTRETTO",
      finish: "CINNAMON DUST",
      temp: "145°F VELVET",
      price: 330,
      channel: "TAKEAWAY",
      stage: "Queued",
    },
    {
      id: "cup-202",
      orderNo: "#202",
      customerName: "Sarah Chen",
      drinkName: "Cortado",
      sizeOz: "4.5 oz",
      milk: "ORGANIC WHOLE",
      shot: "1:1 EXTRACTION",
      finish: "NO SUGAR",
      temp: "150°F",
      price: 240,
      channel: "FOR HERE",
      stage: "Pulling",
    },
    {
      id: "cup-203",
      orderNo: "#203",
      customerName: "Marcus Brody",
      drinkName: "Iced Ceremonial Matcha",
      sizeOz: "16 oz",
      milk: "ALMOND MILK",
      shot: "CEREMONIAL DOUBLE",
      finish: "MADAGASCAR VANILLA",
      temp: "ICED DRAFT",
      price: 390,
      channel: "TAKEAWAY",
      stage: "Queued",
    },
  ],
  loyaltyCards: [
    { id: "lc-1", memberName: "Anika Sharma", phone: "+91 98201 55110", stamps: 7, maxStamps: 8, preferredMilk: "Oat Milk", walletBalance: 1450 },
    { id: "lc-2", memberName: "Rohan Desai", phone: "+91 98114 78220", stamps: 4, maxStamps: 8, preferredMilk: "Whole Milk", walletBalance: 820 },
    { id: "lc-3", memberName: "Tara Nair", phone: "+91 99002 31441", stamps: 8, maxStamps: 8, preferredMilk: "Almond Milk", walletBalance: 640 },
  ],
  pantryLots: [
    { id: "bl-1", name: "Colombia Huila Micro-Lot", type: "Single-Origin Bean", originOrBatch: "Lot #CH-26 • Washed Pink Bourbon", remainingUnits: 14, unitLabel: "kg roasted", wastedUnits: 0 },
    { id: "bl-2", name: "Ethiopia Yirgacheffe", type: "Single-Origin Bean", originOrBatch: "Lot #EY-19 • Cold Brew / Filter", remainingUnits: 6, unitLabel: "kg roasted", wastedUnits: 0 },
    { id: "bl-3", name: "Pistachio Cardamom Rolls", type: "Morning Pastry", originOrBatch: "07:00 AM Deck Batch", remainingUnits: 9, unitLabel: "pcs", wastedUnits: 1 },
    { id: "bl-4", name: "Brown Butter financiers", type: "Morning Pastry", originOrBatch: "07:30 AM Deck Batch", remainingUnits: 12, unitLabel: "pcs", wastedUnits: 2 },
  ],
};

export function CafeEspressoOsApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState } = useDemoState<CafeOsState>(
    product.slug,
    ROASTCRAFT_SEED
  );

  const [tab, setTab] = useState<"pos" | "queue" | "loyalty" | "beans">("pos");
  const [catFilter, setCatFilter] = useState<"All" | CafeDrink["category"]>("All");
  const [selectedDrinkId, setSelectedDrinkId] = useState(state.catalog[0]?.id || "cd-1");
  const [custName, setCustName] = useState("");
  const [milk, setMilk] = useState("Oat Milk (+₹50)");
  const [shot, setShot] = useState("Double Ristretto");
  const [temp, setTemp] = useState("145°F Velvet");
  const [finish, setFinish] = useState("Cinnamon");
  const [channel, setChannel] = useState<"TAKEAWAY" | "FOR HERE">("TAKEAWAY");
  const [search, setSearch] = useState("");
  const [customOpen, setCustomOpen] = useState(false);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [memberForm, setMemberForm] = useState({ name: "", phone: "", milk: "Oat Milk" });
  const [memberError, setMemberError] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const selectedDrink = useMemo(
    () => state.catalog.find((d) => d.id === selectedDrinkId) || state.catalog[0],
    [state.catalog, selectedDrinkId]
  );

  const milkSurcharge = milk.includes("+₹50") ? 50 : 0;
  const finishSurcharge = finish.includes("+₹40") ? 40 : 0;
  const customizedPrice = (selectedDrink?.basePrice || 0) + milkSurcharge + finishSurcharge;

  const activeCups = useMemo(
    () => state.cupQueue.filter((c) => c.stage !== "Ready"),
    [state.cupQueue]
  );

  const filteredDrinks = useMemo(() => {
    return state.catalog.filter((d) => {
      if (catFilter !== "All" && d.category !== catFilter) return false;
      if (search.trim()) {
        return d.name.toLowerCase().includes(search.toLowerCase());
      }
      return true;
    });
  }, [state.catalog, catFilter, search]);

  const handleQueueDrink = () => {
    if (!selectedDrink) return;
    const customer = custName.trim() || "Walk-In Guest";
    const newCup: CupTicket = {
      id: `cup-${Date.now()}`,
      orderNo: `#${Math.floor(205 + Math.random() * 790)}`,
      customerName: customer,
      drinkName: selectedDrink.name,
      sizeOz: selectedDrink.ozLabel.split("•")[0].trim(),
      milk: milk.split("(")[0].trim().toUpperCase(),
      shot: shot.toUpperCase(),
      finish: finish.split("(")[0].trim().toUpperCase(),
      temp: temp.toUpperCase(),
      price: customizedPrice,
      channel,
      stage: "Queued",
    };
    setState((prev) => ({
      ...prev,
      cupQueue: [newCup, ...prev.cupQueue],
    }));
    setCustName("");
    notify(`Printed sticker ${newCup.orderNo} for ${customer} — added to Barista Queue.`);
  };

  const advanceCupStage = (id: string) => {
    setState((prev) => ({
      ...prev,
      cupQueue: prev.cupQueue.map((c) =>
        c.id === id
          ? { ...c, stage: c.stage === "Queued" ? "Pulling" : "Ready" }
          : c
      ),
    }));
    notify("Updated barista cup status.");
  };

  const handleAddStamp = (memberId: string) => {
    setState((prev) => ({
      ...prev,
      loyaltyCards: prev.loyaltyCards.map((m) => {
        if (m.id !== memberId) return m;
        const nextStamps = m.stamps >= m.maxStamps ? 1 : m.stamps + 1;
        return { ...m, stamps: nextStamps };
      }),
    }));
    notify("Stamped loyalty card!");
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name.trim()) {
      setMemberError("Guest name is required.");
      return;
    }
    setState((prev) => ({
      ...prev,
      loyaltyCards: [
        {
          id: `lc-${Date.now()}`,
          memberName: memberForm.name.trim(),
          phone: memberForm.phone.trim() || "+91 98000 00000",
          stamps: 1,
          maxStamps: 8,
          preferredMilk: memberForm.milk,
          walletBalance: 500,
        },
        ...prev.loyaltyCards,
      ],
    }));
    setMemberForm({ name: "", phone: "", milk: "Oat Milk" });
    setMemberError("");
    setAddMemberOpen(false);
    notify("Created new Roastcraft loyalty pass.");
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#2B1613] flex flex-col font-sans">
      {/* Warm Artisanal Header */}
      <header className="sticky top-0 z-30 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E7DEC8] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href={`/demos/${product.categorySlug}/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-[#FBF8F3] border border-[#E7DEC8] text-[#564338] hover:text-[#2B1613]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#903F00] text-white flex items-center justify-center">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif font-bold text-base tracking-tight text-[#2B1613]">
                {state.barName}
              </span>
              <p className="text-[11px] text-[#564338]">{state.grinderSpec} • Calibrated</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "pos", label: "Espresso Bar POS" },
            { id: "queue", label: `Barista Cup Queue (${activeCups.length})` },
            { id: "loyalty", label: "Loyalty Wallet" },
            { id: "beans", label: "Beans & Pastries" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                tab === item.id
                  ? "bg-[#903F00] text-white"
                  : "bg-[#FBF8F3] border border-[#E7DEC8] text-[#564338] hover:text-[#2B1613]"
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
              notify("Restored Roastcraft morning shift seed.");
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E7DEC8] bg-white text-xs text-[#564338] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            type="button"
            onClick={() => setCustomOpen(true)}
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FFDBCA] text-[#763300] text-xs font-semibold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Customize
          </button>
        </div>
      </header>

      {/* VIEW 1: ESPRESSO BAR POS + LIVE CUP QUEUE */}
      {tab === "pos" && (
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-5 p-4 md:p-6">
          <div className="xl:col-span-7 space-y-5">
            {/* Search & Categories */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {(["All", "Espresso & Milk", "Signature Lattes", "Pour Over & Batch", "Artisanal Bakery"] as const).map(
                  (c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCatFilter(c)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                        catFilter === c
                          ? "bg-[#903F00] text-white"
                          : "bg-white border border-[#E7DEC8] text-[#564338]"
                      }`}
                    >
                      {c}
                    </button>
                  )
                )}
              </div>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#897267] absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search drink or pastry..."
                  className="pl-8 pr-3 py-1.5 w-44 rounded-lg bg-white border border-[#E7DEC8] text-xs focus:outline-none focus:border-[#903F00]"
                />
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredDrinks.map((drink) => {
                const isSel = selectedDrink?.id === drink.id;
                return (
                  <div
                    key={drink.id}
                    onClick={() => setSelectedDrinkId(drink.id)}
                    className={`rounded-2xl p-4 border cursor-pointer transition bg-[#FFFDF9] ${
                      isSel ? "border-2 border-[#903F00] shadow-sm" : "border-[#E7DEC8] hover:border-[#B45309]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif font-bold text-sm">{drink.name}</h3>
                      <span className="font-bold text-sm text-[#903F00]">₹{drink.basePrice}</span>
                    </div>
                    <p className="text-[11px] text-[#564338] mt-1 line-clamp-2">{drink.note}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#006D30] mt-3">
                      {drink.ozLabel}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Artisanal Customizer Panel */}
            {selectedDrink && (
              <div className="rounded-2xl border border-[#E7DEC8] bg-[#FFFDF9] p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E7DEC8] pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#903F00]">
                      Drink Modifier Matrix
                    </span>
                    <h2 className="font-serif text-lg font-bold">
                      Customizing: {selectedDrink.name}
                    </h2>
                  </div>
                  <span className="text-xl font-bold text-[#903F00]">₹{customizedPrice}</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <p className="font-bold text-[#564338] mb-1.5">Specialty Milk</p>
                    <div className="flex flex-wrap gap-2">
                      {["Oat Milk (+₹50)", "Almond (+₹50)", "Whole Milk", "Coconut (+₹50)"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setMilk(opt)}
                          className={`px-3 py-1.5 rounded-lg border cursor-pointer ${
                            milk === opt
                              ? "border-[#903F00] bg-[#FFDBCA]/40 font-bold text-[#331200]"
                              : "border-[#E7DEC8] bg-white text-[#564338]"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <p className="font-bold text-[#564338] mb-1.5">Extraction & Shot</p>
                      <div className="flex flex-wrap gap-1.5">
                        {["Single Shot", "Double Ristretto", "Decaf Swiss"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setShot(opt)}
                            className={`px-2.5 py-1.5 rounded-lg border cursor-pointer ${
                              shot === opt
                                ? "border-[#903F00] bg-[#FFDBCA]/40 font-bold"
                                : "border-[#E7DEC8] bg-white"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-[#564338] mb-1.5">Temp & Craft Finish</p>
                      <div className="flex flex-wrap gap-1.5">
                        {["Cinnamon", "Madagascar Vanilla (+₹40)", "Raw Panela"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFinish(opt)}
                            className={`px-2.5 py-1.5 rounded-lg border cursor-pointer ${
                              finish === opt
                                ? "border-[#903F00] bg-[#FFDBCA]/40 font-bold"
                                : "border-[#E7DEC8] bg-white"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <input
                      type="text"
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      placeholder="Guest name on cup..."
                      className="sm:col-span-2 px-3 py-2 rounded-lg border border-[#E7DEC8] bg-white"
                    />
                    <select
                      value={channel}
                      onChange={(e) => setChannel(e.target.value as any)}
                      className="px-3 py-2 rounded-lg border border-[#E7DEC8] bg-white"
                    >
                      <option value="TAKEAWAY">Takeaway Cup</option>
                      <option value="FOR HERE">For Here Ceramic</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleQueueDrink}
                  className="w-full py-2.5 rounded-xl bg-[#903F00] hover:bg-[#763300] text-white font-bold text-xs cursor-pointer"
                >
                  + Add to Barista Cup Queue • ₹{customizedPrice}
                </button>
              </div>
            )}
          </div>

          {/* Right: Live Cup Sticker Queue */}
          <aside className="xl:col-span-5 rounded-2xl border border-[#E7DEC8] bg-[#FFFDF9] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7DEC8] pb-3">
              <div>
                <h2 className="font-serif font-bold text-base">Live Cup Sticker Queue</h2>
                <p className="text-[11px] text-[#564338]">{activeCups.length} active cups in bar rush</p>
              </div>
              <button
                type="button"
                onClick={() => setTab("queue")}
                className="text-xs font-semibold text-[#903F00] hover:underline cursor-pointer"
              >
                Full Queue →
              </button>
            </div>

            <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
              {activeCups.map((cup) => (
                <div key={cup.id} className="rounded-xl border border-[#E7DEC8] bg-white p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">Order {cup.orderNo}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFE2DD] text-[#903F00]">
                        {cup.channel}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#006D30]">{cup.stage}</span>
                  </div>
                  <p className="font-serif font-bold text-base">{cup.customerName}</p>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#2B1613]">
                    {cup.drinkName} ({cup.sizeOz})
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold">
                    <span className="px-2 py-0.5 rounded bg-[#FBF8F3] border border-[#E7DEC8] text-[#903F00]">
                      *** {cup.milk} ***
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#FBF8F3] border border-[#E7DEC8]">
                      {cup.shot}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#FBF8F3] border border-[#E7DEC8]">
                      {cup.finish}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => advanceCupStage(cup.id)}
                    className={`w-full py-2 rounded-lg text-xs font-bold text-white cursor-pointer ${
                      cup.stage === "Queued" ? "bg-[#B45309]" : "bg-[#006D30]"
                    }`}
                  >
                    {cup.stage === "Queued" ? "Mark Pulling Shot" : "Ready for Pickup ✓"}
                  </button>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* VIEW 2: FULL BARISTA QUEUE */}
      {tab === "queue" && (
        <div className="p-6 max-w-6xl mx-auto w-full space-y-4">
          <h1 className="font-serif text-xl font-bold">Barista Cup & Counter Display</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.cupQueue.map((cup) => (
              <div key={cup.id} className="rounded-2xl border border-[#E7DEC8] bg-[#FFFDF9] p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>{cup.orderNo} • {cup.customerName}</span>
                  <span className={cup.stage === "Ready" ? "text-[#006D30]" : "text-[#903F00]"}>{cup.stage}</span>
                </div>
                <p className="font-semibold text-sm">{cup.drinkName} ({cup.sizeOz})</p>
                <p className="text-xs text-[#564338]">{cup.milk} • {cup.shot} • {cup.finish}</p>
                {cup.stage !== "Ready" && (
                  <button
                    type="button"
                    onClick={() => advanceCupStage(cup.id)}
                    className="w-full py-2 rounded-lg bg-[#903F00] text-white text-xs font-bold cursor-pointer"
                  >
                    Advance Stage
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: DIGITAL LOYALTY STAMP WALLET */}
      {tab === "loyalty" && (
        <div className="p-6 max-w-5xl mx-auto w-full space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h1 className="font-serif text-xl font-bold">Digital Loyalty & Wallet Passes</h1>
              <p className="text-xs text-[#564338]">Collect 8 espresso stamps to unlock a complimentary signature pour.</p>
            </div>
            <button
              type="button"
              onClick={() => setAddMemberOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#903F00] text-white text-xs font-semibold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Pass Holder
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.loyaltyCards.map((m) => (
              <div key={m.id} className="rounded-2xl border border-[#E7DEC8] bg-[#FFFDF9] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-base">{m.memberName}</span>
                  <span className="text-xs font-bold text-[#006D30]">₹{m.walletBalance} Wallet</span>
                </div>
                <p className="text-xs text-[#564338]">{m.phone} • Prefers {m.preferredMilk}</p>
                <div className="grid grid-cols-8 gap-1 pt-1">
                  {Array.from({ length: m.maxStamps }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-6 rounded flex items-center justify-center text-[10px] font-bold ${
                        idx < m.stamps ? "bg-[#903F00] text-white" : "bg-[#FBF8F3] border border-[#E7DEC8] text-[#897267]"
                      }`}
                    >
                      {idx < m.stamps ? "★" : idx + 1}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => handleAddStamp(m.id)}
                  className="w-full py-2 rounded-lg bg-[#006D30] text-white text-xs font-bold cursor-pointer"
                >
                  {m.stamps >= m.maxStamps ? "Redeem Free Drink & Reset" : "+ Stamp Visit"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: ROASTED BEAN LOTS & PASTRY BATCHES */}
      {tab === "beans" && (
        <div className="p-6 max-w-5xl mx-auto w-full space-y-4">
          <h1 className="font-serif text-xl font-bold">Roasted Single-Origin Beans & Pastry Batches</h1>
          <div className="rounded-2xl border border-[#E7DEC8] bg-[#FFFDF9] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FBF8F3] border-b border-[#E7DEC8] text-[#564338]">
                <tr>
                  <th className="px-4 py-3">Item / Lot</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Origin / Bake Time</th>
                  <th className="px-4 py-3">Remaining</th>
                  <th className="px-4 py-3">Spoilage</th>
                  <th className="px-4 py-3 text-right">Log Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7DEC8]">
                {state.pantryLots.map((lot) => (
                  <tr key={lot.id}>
                    <td className="px-4 py-3 font-bold">{lot.name}</td>
                    <td className="px-4 py-3 text-[#903F00]">{lot.type}</td>
                    <td className="px-4 py-3 text-[#564338]">{lot.originOrBatch}</td>
                    <td className="px-4 py-3 font-bold">{lot.remainingUnits} {lot.unitLabel}</td>
                    <td className="px-4 py-3">{lot.wastedUnits}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            pantryLots: prev.pantryLots.map((l) =>
                              l.id === lot.id
                                ? { ...l, remainingUnits: Math.max(0, l.remainingUnits - 1), wastedUnits: l.wastedUnits + 1 }
                                : l
                            ),
                          }))
                        }
                        className="px-2.5 py-1 rounded border border-[#E7DEC8] bg-white cursor-pointer"
                      >
                        Log Waste (-1)
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            pantryLots: prev.pantryLots.map((l) =>
                              l.id === lot.id ? { ...l, remainingUnits: l.remainingUnits + 5 } : l
                            ),
                          }))
                        }
                        className="px-2.5 py-1 rounded bg-[#006D30] text-white font-semibold cursor-pointer"
                      >
                        +5 Batch
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {addMemberOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateMember} className="w-full max-w-sm rounded-2xl bg-[#FFFDF9] border border-[#E7DEC8] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-base">New Cafe Loyalty Member</h3>
              <button type="button" onClick={() => setAddMemberOpen(false)} className="cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            {memberError && <p className="text-xs text-rose-700 bg-rose-50 p-2 rounded">{memberError}</p>}
            <input
              type="text"
              value={memberForm.name}
              onChange={(e) => setMemberForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Meera Krishnan"
              className="w-full px-3 py-2 rounded-lg border border-[#E7DEC8] bg-white text-xs"
            />
            <input
              type="text"
              value={memberForm.phone}
              onChange={(e) => setMemberForm((p) => ({ ...p, phone: e.target.value }))}
              placeholder="Phone (+91...)"
              className="w-full px-3 py-2 rounded-lg border border-[#E7DEC8] bg-white text-xs"
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setAddMemberOpen(false)} className="px-3 py-1.5 rounded border border-[#E7DEC8] text-xs cursor-pointer">
                Cancel
              </button>
              <button type="submit" className="px-4 py-1.5 rounded bg-[#903F00] text-white text-xs font-bold cursor-pointer">
                Create Pass
              </button>
            </div>
          </form>
        </div>
      )}

      <CustomizationModal demo={toDemoModel(product)} isOpen={customOpen} onClose={() => setCustomOpen(false)} />

      {toast && (
        <div className="fixed bottom-4 right-4 z-50 px-4 py-2.5 rounded-xl bg-[#2B1613] text-[#FFFDF9] text-xs font-medium shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#79DB8D]" />
          {toast}
        </div>
      )}
    </div>
  );
}
