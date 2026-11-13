"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Calculator,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileText,
  MapPin,
  Plus,
  Printer,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  X,
} from "lucide-react";
import type { DemoProductDefinition } from "../../types";
import { toDemoModel } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

type TabId = "pipeline" | "costing" | "loadout" | "invoices";

interface BanquetEvent {
  id: string;
  refNo: string;
  title: string;
  client: string;
  venue: string;
  eventDate: string;
  headcount: number;
  perPlate: number;
  marginPct: number;
  stage: "Tasting Scheduled" | "Proposal Approved" | "Prep & Dispatch" | "Settled";
  stations: string[];
  depositPaidPct: number;
}

interface LoadoutGear {
  id: string;
  item: string;
  qty: string;
  category: string;
  packed: boolean;
}

interface CateringState {
  brandName: string;
  events: BanquetEvent[];
  gear: LoadoutGear[];
}

const BANQUET_SEED: CateringState = {
  brandName: "BanquetFlow ERP",
  events: [
    {
      id: "ev-9402",
      refNo: "#BF-9402",
      title: "Kensington Gala & Awards",
      client: "Sovereign Foundation",
      venue: "Crystal Grand Ballroom",
      eventDate: "Nov 18",
      headcount: 450,
      perPlate: 2450,
      marginPct: 69.4,
      stage: "Tasting Scheduled",
      stations: ["Live Carving Station", "Artisan Dim Sum"],
      depositPaidPct: 25,
    },
    {
      id: "ev-9388",
      refNo: "#BF-9388",
      title: "TechSummit Global VIP Dinner",
      client: "NexaCore Systems",
      venue: "Skyline Glass Atrium",
      eventDate: "Nov 22",
      headcount: 600,
      perPlate: 2100,
      marginPct: 74.1,
      stage: "Proposal Approved",
      stations: ["Mediterranean Graze", "Botanical Elixirs"],
      depositPaidPct: 50,
    },
    {
      id: "ev-9310",
      refNo: "#BF-9310",
      title: "Belmont Equestrian Jubilee",
      client: "Lord Harringfield",
      venue: "Manor Lawn Marquee",
      eventDate: "Tomorrow",
      headcount: 380,
      perPlate: 2800,
      marginPct: 70.5,
      stage: "Prep & Dispatch",
      stations: ["Raw Bar & Caviar", "Wood-Fired Robata"],
      depositPaidPct: 80,
    },
  ],
  gear: [
    { id: "gr-1", item: "Copper Chafing Dishes & Induction Pads", qty: "24 Units", category: "Hot Line", packed: true },
    { id: "gr-2", item: "Royal Bone China & Gold Flatware Sets", qty: "480 Covers", category: "Tableware", packed: true },
    { id: "gr-3", item: "Insulated Cambro Hot-Boxes (Gastronorm)", qty: "14 Cabinets", category: "Transport", packed: false },
    { id: "gr-4", item: "Service Captains + Steward Crew Manifest", qty: "34 Staff (1:15)", category: "Crew", packed: false },
  ],
};

const STAGES: BanquetEvent["stage"][] = [
  "Tasting Scheduled",
  "Proposal Approved",
  "Prep & Dispatch",
  "Settled",
];

export function BanquetFlowCateringApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState } = useDemoState<CateringState>(
    product.slug,
    BANQUET_SEED
  );
  const [tab, setTab] = useState<TabId>("pipeline");
  const [eventTitle, setEventTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [guestCount, setGuestCount] = useState(320);
  const [addLiveCarving, setAddLiveCarving] = useState(true);
  const [addDimSum, setAddDimSum] = useState(true);
  const [addBotanical, setAddBotanical] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [customOpen, setCustomOpen] = useState(false);
  const [selectedProposalEvent, setSelectedProposalEvent] = useState<BanquetEvent | null>(null);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((curr) => (curr === msg ? null : curr)), 2600);
  };

  const calculatedPerPlate = useMemo(() => {
    return 1650 + (addLiveCarving ? 450 : 0) + (addDimSum ? 320 : 0) + (addBotanical ? 280 : 0);
  }, [addLiveCarving, addDimSum, addBotanical]);

  const contractedTotal = useMemo(
    () => state.events.reduce((s, e) => s + e.headcount * e.perPlate, 0),
    [state.events]
  );

  const handleCreateEventQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const title = eventTitle.trim();
    if (!title) return;
    const stations: string[] = [];
    if (addLiveCarving) stations.push("Live Carving Station");
    if (addDimSum) stations.push("Artisan Dim Sum");
    if (addBotanical) stations.push("Botanical Elixirs");

    const created: BanquetEvent = {
      id: `ev-${Date.now()}`,
      refNo: `#BF-${9410 + state.events.length}`,
      title,
      client: clientName.trim() || "Corporate Gala Desk",
      venue: "Grand Pavilion",
      eventDate: "Dec 04",
      headcount: guestCount,
      perPlate: calculatedPerPlate,
      marginPct: 71.2,
      stage: "Tasting Scheduled",
      stations: stations.length ? stations : ["Standard Plated Menu"],
      depositPaidPct: 25,
    };

    setState((prev) => ({
      ...prev,
      events: [created, ...prev.events],
    }));
    setEventTitle("");
    setClientName("");
    notify(`Created quote ${created.refNo} for ${title} (₹${(guestCount * calculatedPerPlate).toLocaleString("en-IN")}).`);
  };

  const advanceStage = (id: string) => {
    setState((prev) => ({
      ...prev,
      events: prev.events.map((ev) => {
        if (ev.id !== id) return ev;
        const idx = STAGES.indexOf(ev.stage);
        const nextStage = STAGES[(idx + 1) % STAGES.length];
        return { ...ev, stage: nextStage };
      }),
    }));
  };

  const toggleGearPacked = (id: string) => {
    setState((prev) => ({
      ...prev,
      gear: prev.gear.map((g) => (g.id === id ? { ...g, packed: !g.packed } : g)),
    }));
  };

  const recordMilestonePayment = (id: string) => {
    setState((prev) => ({
      ...prev,
      events: prev.events.map((ev) =>
        ev.id === id ? { ...ev, depositPaidPct: Math.min(100, ev.depositPaidPct + 25) } : ev
      ),
    }));
    notify("Milestone invoice payment recorded (+25%).");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#0B1C30] flex flex-col font-sans">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-[#005D42] text-white text-xs font-semibold shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Top Banquet Header */}
      <header className="border-b border-[#BDC9C1]/60 bg-white px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/demos/food-hospitality/catering-business-management"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] text-xs text-[#3E4943] hover:bg-[#F8F9FF]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#047857] text-white flex items-center justify-center font-bold text-xs">
              BF
            </div>
            <div>
              <div className="font-bold text-sm text-[#0B1C30]">{state.brandName}</div>
              <div className="text-[11px] text-[#005D42] font-semibold">
                {state.events.length} Active Banquets · 71.2% Avg Food Margin
              </div>
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "pipeline", label: `Event Pipeline (${state.events.length})` },
            { id: "costing", label: "Per-Plate Costing" },
            { id: "loadout", label: "Equipment & Crew Loadout" },
            { id: "invoices", label: "Milestone Invoices" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as TabId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                tab === item.id
                  ? "bg-[#047857] text-white"
                  : "bg-[#EFF4FF] text-[#0B1C30] hover:bg-[#DCE9FF]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden xl:inline-flex items-center px-2.5 py-1.5 rounded-lg bg-[#97F5CC]/60 text-[#00513A] text-xs font-bold">
            Contracted: ₹{contractedTotal.toLocaleString("en-IN")}
          </span>
          <button
            type="button"
            onClick={() => {
              resetState();
              notify("Banquet pipeline and costing sheets reset.");
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-xs text-[#3E4943] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            type="button"
            onClick={() => setCustomOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FFDCC3] text-[#6E3900] text-xs font-semibold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Customize
          </button>
        </div>
      </header>

      {/* VIEW 1: CATERING EVENT PIPELINE KANBAN + PER-PLATE QUOTE BUILDER */}
      {tab === "pipeline" && (
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-5 p-4 md:p-6">
          {/* Left 8 cols: 4-Stage Catering Pipeline */}
          <div className="xl:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h1 className="text-xl font-bold text-[#0B1C30]">Master Banquet Execution Pipeline</h1>
                <p className="text-xs text-[#3E4943]">
                  Advance events cleanly from Tasting Scheduled through BEO Prep & Final Settlement.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#97F5CC] text-[#002115] text-xs font-bold">
                Target Gross Margin &gt;68%
              </span>
            </div>

            {/* Interactive Catering Milestone Timeline */}
            <div className="rounded-2xl border border-[#BDC9C1]/70 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#005D42] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  Catering Lifecycle Progression
                </span>
                <span className="text-[11px] font-mono text-[#3E4943]">
                  BEO Protocol · ISO 22000 Clean Pass
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                {STAGES.map((stg, i) => {
                  const count = state.events.filter((e) => e.stage === stg).length;
                  return (
                    <div
                      key={stg}
                      className={`p-2.5 rounded-xl border flex flex-col justify-between transition ${
                        count > 0
                          ? "border-[#047857]/40 bg-[#97F5CC]/20 text-[#002115]"
                          : "border-[#E2E8F0] bg-[#F8F9FF] text-[#3E4943]"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                        <span>STAGE 0{i + 1}</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-white text-[#047857] shadow-xs">
                          {count}
                        </span>
                      </div>
                      <div className="font-bold text-xs mt-1 truncate">{stg}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STAGES.map((stage) => {
                const cards = state.events.filter((e) => e.stage === stage);
                return (
                  <div key={stage} className="rounded-2xl border border-[#DCE9FF] bg-[#EFF4FF]/60 p-3.5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#005D42]">
                        {stage}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white text-xs font-bold text-[#0B1C30]">
                        {cards.length}
                      </span>
                    </div>

                    {cards.map((ev) => (
                      <div key={ev.id} className="rounded-xl border border-[#BDC9C1]/60 bg-white p-3.5 space-y-2.5 shadow-sm">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-[11px] font-mono text-[#3E4943]">
                              {ev.refNo} · {ev.eventDate}
                            </div>
                            <h3 className="font-bold text-sm text-[#0B1C30]">{ev.title}</h3>
                            <div className="text-xs text-[#3E4943]">
                              {ev.client} · {ev.venue}
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-[#97F5CC] text-[#002115] text-[11px] font-bold">
                            {ev.marginPct}% Margin
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 rounded-lg bg-[#F8F9FF] p-2 text-xs">
                          <div>
                            <div className="text-[10px] text-[#3E4943]">Headcount</div>
                            <div className="font-bold">{ev.headcount} Pax</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[#3E4943]">Per-Plate</div>
                            <div className="font-bold">₹{ev.perPlate}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[#3E4943]">Total Quote</div>
                            <div className="font-bold text-[#047857]">
                              ₹{(ev.headcount * ev.perPlate).toLocaleString("en-IN")}
                            </div>
                          </div>
                        </div>

                        {/* Stations tags */}
                        {ev.stations && ev.stations.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {ev.stations.map((st) => (
                              <span key={st} className="text-[10px] px-2 py-0.5 rounded-md bg-[#EFF4FF] text-[#005D42] font-medium border border-[#DCE9FF]">
                                {st}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1.5 border-t border-[#BDC9C1]/40">
                          <button
                            type="button"
                            onClick={() => setSelectedProposalEvent(ev)}
                            className="px-2.5 py-1 rounded-lg border border-[#047857] text-[#047857] hover:bg-[#047857]/10 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            Proposal PDF
                          </button>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#7D4200] font-semibold">
                              Paid: {ev.depositPaidPct}%
                            </span>
                            <button
                              type="button"
                              onClick={() => advanceStage(ev.id)}
                              className="px-2.5 py-1 rounded-lg bg-[#047857] hover:bg-[#005D42] text-white text-xs font-semibold cursor-pointer flex items-center gap-0.5"
                            >
                              <span>Advance</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 4 cols: Interactive Per-Plate Quote Engineer */}
          <aside className="xl:col-span-4 rounded-2xl border border-[#BDC9C1]/80 bg-white p-5 space-y-4 h-fit">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#047857]">
                Dynamic BEO Quote Engineer
              </span>
              <h2 className="text-lg font-bold text-[#0B1C30]">Per-Plate Quote Calculator</h2>
            </div>

            <form onSubmit={handleCreateEventQuote} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#3E4943] mb-1">Banquet / Event Name</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Enter gala or wedding title..."
                  className="w-full px-3 py-2 rounded-xl border border-[#BDC9C1] bg-[#F8F9FF]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#3E4943] mb-1">Client Organization</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Corporate host or family name..."
                  className="w-full px-3 py-2 rounded-xl border border-[#BDC9C1] bg-[#F8F9FF]"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Guest Headcount</span>
                  <span className="text-[#047857] font-bold">{guestCount} Pax</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={800}
                  step={20}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[#047857]"
                />
              </div>

              <div className="space-y-2 pt-1">
                <div className="font-semibold text-[#3E4943]">Live Action Stations (+Per-Plate)</div>
                {[
                  { label: "Dry-Aged Live Carving (+₹450/pl)", checked: addLiveCarving, toggle: () => setAddLiveCarving(!addLiveCarving) },
                  { label: "Handcrafted Dim Sum Counter (+₹320/pl)", checked: addDimSum, toggle: () => setAddDimSum(!addDimSum) },
                  { label: "Botanical Mocktail & Shrub Bar (+₹280/pl)", checked: addBotanical, toggle: () => setAddBotanical(!addBotanical) },
                ].map((opt) => (
                  <label key={opt.label} className="flex items-center gap-2 p-2 rounded-xl bg-[#F8F9FF] border border-[#DCE9FF] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={opt.checked}
                      onChange={opt.toggle}
                      className="accent-[#047857]"
                    />
                    <span className="font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-[#97F5CC]/40 border border-[#047857]/30 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#00513A]">Per-Plate: ₹{calculatedPerPlate}</div>
                  <div className="font-bold text-sm text-[#0B1C30]">Total BEO Valuation</div>
                </div>
                <div className="text-lg font-extrabold text-[#047857]">
                  ₹{(guestCount * calculatedPerPlate).toLocaleString("en-IN")}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#047857] hover:bg-[#005D42] text-white font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Create New Event Quote
              </button>
            </form>
          </aside>
        </div>
      )}

      {/* VIEW 2: PER-PLATE MENU COSTING */}
      {tab === "costing" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-bold text-[#0B1C30]">Per-Plate Margin & Raw Cost Breakdown</h1>
          <div className="rounded-2xl border border-[#BDC9C1]/70 bg-white divide-y divide-[#EFF4FF] text-xs">
            {[
              { course: "Signature Truffle & Roasted Heritage Mains", foodCost: 420, sellPrice: 1650 },
              { course: "Dry-Aged Carving & Live Copper Robata", foodCost: 135, sellPrice: 450 },
              { course: "Handcrafted Artisan Dim Sum & Bao Steamer", foodCost: 85, sellPrice: 320 },
              { course: "Botanical Elixirs & Zero-Proof Mixology Bar", foodCost: 60, sellPrice: 280 },
            ].map((row) => {
              const margin = Math.round(((row.sellPrice - row.foodCost) / row.sellPrice) * 100);
              return (
                <div key={row.course} className="p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="font-bold text-sm text-[#0B1C30]">{row.course}</div>
                  <div className="flex items-center gap-5 font-mono">
                    <span>Ingredient Cost: ₹{row.foodCost}</span>
                    <span>Sell: ₹{row.sellPrice}/pl</span>
                    <span className="px-2.5 py-0.5 rounded bg-[#97F5CC] text-[#002115] font-bold">
                      {margin}% Margin
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: EQUIPMENT & CREW LOADOUT */}
      {tab === "loadout" && (
        <div className="flex-1 p-4 md:p-6 max-w-4xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-bold text-[#0B1C30]">Banquet Gear & Service Crew Manifest</h1>
          <div className="space-y-3">
            {state.gear.map((g) => (
              <div key={g.id} className="rounded-2xl border border-[#BDC9C1]/70 bg-white p-4 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-sm text-[#0B1C30]">{g.item}</div>
                  <div className="text-[#3E4943]">{g.category} · {g.qty}</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleGearPacked(g.id)}
                  className={`px-3.5 py-1.5 rounded-lg font-bold cursor-pointer ${
                    g.packed ? "bg-[#047857] text-white" : "bg-[#FFDCC3] text-[#6E3900]"
                  }`}
                >
                  {g.packed ? "Loaded on Truck ✓" : "Mark Packed"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: MILESTONE INVOICES */}
      {tab === "invoices" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-bold text-[#0B1C30]">Contract Deposit & Final Settlement Schedule</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.events.map((ev) => {
              const total = ev.headcount * ev.perPlate;
              const collected = Math.round((total * ev.depositPaidPct) / 100);
              return (
                <div key={ev.id} className="rounded-2xl border border-[#BDC9C1]/70 bg-white p-5 space-y-3 text-xs">
                  <div className="font-bold text-sm text-[#0B1C30]">{ev.title}</div>
                  <div className="text-[#3E4943]">{ev.refNo} · {ev.client}</div>
                  <div className="font-mono space-y-1">
                    <div>Contracted: ₹{total.toLocaleString("en-IN")}</div>
                    <div className="text-[#047857] font-bold">Collected ({ev.depositPaidPct}%): ₹{collected.toLocaleString("en-IN")}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => recordMilestonePayment(ev.id)}
                    disabled={ev.depositPaidPct >= 100}
                    className="w-full py-2 rounded-xl bg-[#047857] disabled:bg-[#BDC9C1] text-white font-bold cursor-pointer"
                  >
                    {ev.depositPaidPct >= 100 ? "100% Settled ✓" : "Record +25% Milestone"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Client-Ready Proposal & Contract Document Modal */}
      {selectedProposalEvent && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-3 sm:p-5 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:fixed print:inset-0">
          <div className="w-full max-w-3xl rounded-2xl border border-[#CBD5E1] bg-[#FCFBF7] text-[#1E293B] p-6 sm:p-8 space-y-6 shadow-2xl my-auto max-h-[90vh] overflow-y-auto print:max-h-none print:shadow-none print:border-none print:p-0">
            {/* Modal Controls Bar */}
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 print:hidden">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#047857] text-white flex items-center justify-center font-bold text-xs">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0B1C30]">Client Banquet Proposal & Contract</h3>
                  <p className="text-[11px] text-[#005D42] font-semibold">
                    Document Ref: {selectedProposalEvent.refNo} · Stage: {selectedProposalEvent.stage}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-[#047857] hover:bg-[#005D42] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Export PDF
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProposalEvent(null)}
                  className="p-1.5 rounded-lg border border-[#CBD5E1] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Document Body */}
            <div className="space-y-6 font-sans">
              {/* Official Letterhead */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-[#047857] pb-5">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-[#047857]">
                    Bespoke Culinary Productions & Luxury Hospitality
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#0B1C30]">
                    BANQUETFLOW CATERING GROUP
                  </h2>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    FSSAI Lic. #10022011000841 · ISO 22000 Food Safety Accredited
                  </p>
                </div>
                <div className="text-right text-xs font-mono bg-white p-3 rounded-lg border border-[#E2E8F0] shadow-xs">
                  <div className="font-bold text-[#047857] text-sm">{selectedProposalEvent.refNo}</div>
                  <div className="text-[#64748B]">Issued: Nov 12, 2026</div>
                  <div className="text-[#64748B]">Valid: 14 Business Days</div>
                </div>
              </div>

              {/* Event & Client Specification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-[#E2E8F0] text-xs">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">Client & Organization</span>
                  <div className="font-bold text-sm text-[#0B1C30]">{selectedProposalEvent.client}</div>
                  <div className="text-[#475569]">VIP Corporate Events & Galas Desk</div>
                  <div className="text-[#475569]">Billing Contact: accounts@{selectedProposalEvent.client.toLowerCase().replace(/[^a-z]/g, "")}.com</div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">Event & Logistics Details</span>
                  <div className="font-bold text-sm text-[#0B1C30]">{selectedProposalEvent.title}</div>
                  <div className="flex items-center gap-1.5 text-[#475569]">
                    <MapPin className="w-3.5 h-3.5 text-[#047857]" />
                    <span>Venue: {selectedProposalEvent.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#475569]">
                    <Calendar className="w-3.5 h-3.5 text-[#047857]" />
                    <span>Date: {selectedProposalEvent.eventDate}, 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold text-[#047857]">
                    <Users className="w-3.5 h-3.5" />
                    <span>Guaranteed Covers: {selectedProposalEvent.headcount} Guests</span>
                  </div>
                </div>
              </div>

              {/* Curated Gastronomy Architecture */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#047857] flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  Curated Gastronomy & Station Architecture
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-[#E2E8F0] bg-white space-y-1.5">
                    <span className="font-bold text-[#0B1C30] block">Course 01 — Passed Canapés & Amuse</span>
                    <p className="text-[11px] text-[#475569]">
                      White Truffle Arancini, Cured Scottish Salmon Blinis with Royal Ossetra, and Smoked Burrata Spoons with Fig Balsamic.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-[#E2E8F0] bg-white space-y-1.5">
                    <span className="font-bold text-[#0B1C30] block">Course 02 — Plated Signature Entrées</span>
                    <p className="text-[11px] text-[#475569]">
                      Herb-Crusted Wagyu Tenderloin with Morel Red Wine Reduction, accompanied by Wild Chilean Sea Bass with Saffron Velouté.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-[#047857]/40 bg-[#97F5CC]/15 space-y-1.5 md:col-span-2">
                    <span className="font-bold text-[#002115] block">Specialty Live Interactive Stations (Included)</span>
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {selectedProposalEvent.stations.map((st) => (
                        <span key={st} className="px-2.5 py-1 rounded-md bg-white border border-[#047857]/30 text-[#005D42] font-semibold text-xs shadow-2xs">
                          ✦ {st}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Commercial Schedule Table */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#047857]">
                  Commercial Schedule & Financial Breakdown
                </h4>
                <div className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold uppercase text-[#64748B]">
                      <tr>
                        <th className="p-3">Service Line Item</th>
                        <th className="p-3 text-center">Quantity</th>
                        <th className="p-3 text-right">Unit Rate</th>
                        <th className="p-3 text-right">Line Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      <tr>
                        <td className="p-3 font-semibold text-[#0B1C30]">
                          Executive Banquet Cover (Hors d'oeuvres + Plated Dinner)
                        </td>
                        <td className="p-3 text-center font-mono">{selectedProposalEvent.headcount} Pax</td>
                        <td className="p-3 text-right font-mono">₹1,650</td>
                        <td className="p-3 text-right font-mono font-bold">
                          ₹{(selectedProposalEvent.headcount * 1650).toLocaleString("en-IN")}
                        </td>
                      </tr>
                      {selectedProposalEvent.perPlate > 1650 && (
                        <tr>
                          <td className="p-3 font-semibold text-[#0B1C30]">
                            Live Chef Stations Package ({selectedProposalEvent.stations.join(" & ")})
                          </td>
                          <td className="p-3 text-center font-mono">{selectedProposalEvent.headcount} Pax</td>
                          <td className="p-3 text-right font-mono">₹{selectedProposalEvent.perPlate - 1650}</td>
                          <td className="p-3 text-right font-mono font-bold">
                            ₹{(selectedProposalEvent.headcount * (selectedProposalEvent.perPlate - 1650)).toLocaleString("en-IN")}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="p-3 text-[#475569]">
                          Uniformed Service Brigade (1:12 Butler Ratio + Maitre d')
                        </td>
                        <td className="p-3 text-center font-mono">Inclusive</td>
                        <td className="p-3 text-right font-mono">Inclusive</td>
                        <td className="p-3 text-right font-mono text-[#047857] font-semibold">Included</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-[#475569]">
                          Fine Bone China, Silverware & Linen Tableware Manifest
                        </td>
                        <td className="p-3 text-center font-mono">{selectedProposalEvent.headcount} Sets</td>
                        <td className="p-3 text-right font-mono">Inclusive</td>
                        <td className="p-3 text-right font-mono text-[#047857] font-semibold">Included</td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-[#F8FAFC] border-t border-[#E2E8F0] font-mono">
                      <tr>
                        <td colSpan={3} className="p-2.5 text-right font-bold text-[#475569]">Subtotal:</td>
                        <td className="p-2.5 text-right font-bold text-[#0B1C30]">
                          ₹{(selectedProposalEvent.headcount * selectedProposalEvent.perPlate).toLocaleString("en-IN")}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="p-2.5 text-right text-[#64748B]">GST & Catering Surcharge (18%):</td>
                        <td className="p-2.5 text-right text-[#64748B]">
                          ₹{Math.round(selectedProposalEvent.headcount * selectedProposalEvent.perPlate * 0.18).toLocaleString("en-IN")}
                        </td>
                      </tr>
                      <tr className="border-t-2 border-[#047857] bg-[#97F5CC]/20 text-sm">
                        <td colSpan={3} className="p-3 text-right font-black text-[#002115]">Total Contract Value:</td>
                        <td className="p-3 text-right font-black text-[#047857]">
                          ₹{Math.round(selectedProposalEvent.headcount * selectedProposalEvent.perPlate * 1.18).toLocaleString("en-IN")}
                        </td>
                      </tr>
                      <tr className="text-xs bg-white">
                        <td colSpan={3} className="p-2.5 text-right font-semibold text-[#7D4200]">
                          Deposit Recorded ({selectedProposalEvent.depositPaidPct}%):
                        </td>
                        <td className="p-2.5 text-right font-bold text-[#7D4200]">
                          ₹{Math.round(selectedProposalEvent.headcount * selectedProposalEvent.perPlate * 1.18 * (selectedProposalEvent.depositPaidPct / 100)).toLocaleString("en-IN")}
                        </td>
                      </tr>
                      <tr className="text-xs bg-white">
                        <td colSpan={3} className="p-2.5 text-right font-semibold text-[#005D42]">
                          Balance Due on Service:
                        </td>
                        <td className="p-2.5 text-right font-bold text-[#005D42]">
                          ₹{Math.round(selectedProposalEvent.headcount * selectedProposalEvent.perPlate * 1.18 * ((100 - selectedProposalEvent.depositPaidPct) / 100)).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Legal Terms & Conditions */}
              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-2 text-[11px] text-[#475569]">
                <div className="font-bold text-xs text-[#0B1C30] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#047857]" />
                  Standard B2B Catering Terms & Headcount Policy
                </div>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Headcount Guarantee:</strong> Final locked attendance numbers must be provided no later than 72 hours prior to execution. Billing reflects guaranteed minimum or actual attendance, whichever is greater.</li>
                  <li><strong>Dietary Compliance:</strong> Special allergies, vegan, kosher, and halal preparations require 48-hour advance manifest lock.</li>
                  <li><strong>Cancellation Policy:</strong> Cancellations &gt;14 days prior forfeit 25% deposit. Cancellations within 72 hours are subject to 100% contracted food fees.</li>
                </ul>
              </div>

              {/* Signoff Signatures */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E2E8F0]">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-bold text-[#64748B]">Prepared For BanquetFlow</span>
                  <div className="h-10 border-b border-[#94A3B8] flex items-end font-serif italic text-sm text-[#047857]">
                    Chef Julian Montgomery
                  </div>
                  <p className="text-[10px] text-[#64748B]">Executive Culinary Director · BanquetFlow Group</p>
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-bold text-[#64748B]">Client Acceptance Signoff</span>
                  <div className="h-10 border-b border-[#94A3B8] flex items-end font-serif italic text-sm text-[#0B1C30]">
                    Authorized Signature Verified
                  </div>
                  <p className="text-[10px] text-[#64748B]">{selectedProposalEvent.client} · Event Liaison</p>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E8F0] pt-4 print:hidden">
              <span className="text-xs text-[#64748B]">
                Proposal Status: <strong className="text-[#047857]">{selectedProposalEvent.stage}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProposalEvent(null)}
                  className="px-4 py-2 rounded-xl border border-[#CBD5E1] text-xs font-semibold hover:bg-[#F1F5F9] cursor-pointer"
                >
                  Close Preview
                </button>
                <button
                  type="button"
                  onClick={() => {
                    advanceStage(selectedProposalEvent.id);
                    notify(`Approved and advanced proposal ${selectedProposalEvent.refNo}!`);
                    setSelectedProposalEvent(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#047857] hover:bg-[#005D42] text-white text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve & Advance Milestone
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CustomizationModal demo={toDemoModel(product)} isOpen={customOpen} onClose={() => setCustomOpen(false)} />
    </div>
  );
}
