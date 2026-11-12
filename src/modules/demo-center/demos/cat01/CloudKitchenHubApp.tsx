"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Bike,
  CheckCircle2,
  Clock,
  Flame,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  ShieldAlert,
  Sparkles,
  Store,
  X,
} from "lucide-react";
import type { DemoProductDefinition } from "../../types";
import { toDemoModel } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

type VirtualBrand = "FireWok Express" | "Bombay Biryani Box" | "Naked Burger Co" | "Midnight Pasta Lab";
type AggregatorChannel = "Swiggy" | "Zomato" | "Direct Web";
type TicketStage = "Prep" | "Expedite" | "Packed" | "Dispatched";

interface CloudTicketItem {
  id: string;
  name: string;
  station: "Wok" | "Tandoor" | "Grill" | "Pasta";
  mod?: string;
  done: boolean;
}

interface CloudTicket {
  id: string;
  orderNo: string;
  brand: VirtualBrand;
  channel: AggregatorChannel;
  stage: TicketStage;
  slaMinutesLeft: number;
  grossAmount: number;
  commissionPct: number;
  riderName: string;
  bay: string;
  otp: string;
  allergyNote?: string;
  items: CloudTicketItem[];
}

interface BrandMenuSyncItem {
  id: string;
  brand: VirtualBrand;
  dishName: string;
  price: number;
  swiggyLive: boolean;
  zomatoLive: boolean;
  directLive: boolean;
}

interface CloudKitchenState {
  hubName: string;
  tickets: CloudTicket[];
  menuSync: BrandMenuSyncItem[];
}

const GHOSTGRID_SEED: CloudKitchenState = {
  hubName: "GhostGrid Central Pod #4",
  tickets: [
    {
      id: "gk-1",
      orderNo: "#SW-8942",
      brand: "FireWok Express",
      channel: "Swiggy",
      stage: "Prep",
      slaMinutesLeft: -3,
      grossAmount: 840,
      commissionPct: 22,
      riderName: "Arun K.",
      bay: "Bay 2",
      otp: "4912",
      allergyNote: "ALLERGY: Strictly No Peanuts • Clean Wok #3",
      items: [
        { id: "gki-1", name: "Sichuan Dragon Noodles", station: "Wok", mod: "Level 4 Spicy", done: true },
        { id: "gki-2", name: "Crispy Chilli Paneer Dumplings", station: "Wok", done: false },
        { id: "gki-3", name: "Lemongrass Thai Iced Tea", station: "Wok", done: false },
      ],
    },
    {
      id: "gk-2",
      orderNo: "#ZM-3108",
      brand: "Bombay Biryani Box",
      channel: "Zomato",
      stage: "Prep",
      slaMinutesLeft: 2,
      grossAmount: 1120,
      commissionPct: 24,
      riderName: "Farhan S.",
      bay: "Bay 1",
      otp: "7740",
      items: [
        { id: "gki-4", name: "Dum Gosht Handi Biryani", station: "Tandoor", mod: "Extra Burani Raita", done: true },
        { id: "gki-5", name: "Murgh Malai Tikka Roll", station: "Tandoor", done: false },
        { id: "gki-6", name: "Zafrani Phirni Clay Pot", station: "Tandoor", done: false },
      ],
    },
    {
      id: "gk-3",
      orderNo: "#GG-0194",
      brand: "Naked Burger Co",
      channel: "Direct Web",
      stage: "Expedite",
      slaMinutesLeft: 9,
      grossAmount: 960,
      commissionPct: 0,
      riderName: "In-House Fleet",
      bay: "Bay 4",
      otp: "2088",
      items: [
        { id: "gki-7", name: "2× Double Smashed Truffle Beast", station: "Grill", mod: "Brioche", done: false },
        { id: "gki-8", name: "Animal Style Loaded Fries", station: "Grill", done: false },
      ],
    },
    {
      id: "gk-4",
      orderNo: "#SW-8812",
      brand: "Midnight Pasta Lab",
      channel: "Swiggy",
      stage: "Packed",
      slaMinutesLeft: 12,
      grossAmount: 780,
      commissionPct: 22,
      riderName: "Pradeep M.",
      bay: "Bay 3",
      otp: "6351",
      items: [
        { id: "gki-9", name: "Wild Mushroom Fettuccine", station: "Pasta", done: true },
        { id: "gki-10", name: "Garlic Herb Ciabatta", station: "Pasta", done: true },
      ],
    },
  ],
  menuSync: [
    { id: "ms-1", brand: "FireWok Express", dishName: "Sichuan Dragon Noodles", price: 360, swiggyLive: true, zomatoLive: true, directLive: true },
    { id: "ms-2", brand: "FireWok Express", dishName: "Charred Edamame Bao", price: 290, swiggyLive: false, zomatoLive: true, directLive: true },
    { id: "ms-3", brand: "Bombay Biryani Box", dishName: "Dum Gosht Handi Biryani", price: 540, swiggyLive: true, zomatoLive: true, directLive: true },
    { id: "ms-4", brand: "Naked Burger Co", dishName: "Double Smashed Truffle Beast", price: 460, swiggyLive: true, zomatoLive: false, directLive: true },
    { id: "ms-5", brand: "Midnight Pasta Lab", dishName: "Wild Mushroom Fettuccine", price: 480, swiggyLive: true, zomatoLive: true, directLive: true },
  ],
};

const BRANDS: VirtualBrand[] = [
  "FireWok Express",
  "Bombay Biryani Box",
  "Naked Burger Co",
  "Midnight Pasta Lab",
];

export function CloudKitchenHubApp({ product }: { product: DemoProductDefinition }) {
  const initialSeed = useMemo<CloudKitchenState>(() => {
    const raw = product.initialData as Partial<CloudKitchenState> | undefined;
    if (raw && Array.isArray(raw.tickets) && Array.isArray(raw.menuSync)) {
      return raw as CloudKitchenState;
    }
    return GHOSTGRID_SEED;
  }, [product.initialData]);

  const { state, setState, resetState } = useDemoState<CloudKitchenState>(product.slug, initialSeed);

  const [tab, setTab] = useState<"kds" | "menu-sync" | "payouts">("kds");
  const [brandFilter, setBrandFilter] = useState<"All" | VirtualBrand>("All");
  const [stationFilter, setStationFilter] = useState<"All" | "Wok" | "Tandoor" | "Grill" | "Pasta">("All");
  const [search, setSearch] = useState("");
  const [customOpen, setCustomOpen] = useState(false);
  const [simulateModalOpen, setSimulateModalOpen] = useState(false);
  const [simForm, setSimForm] = useState({
    brand: "FireWok Express" as VirtualBrand,
    channel: "Zomato" as AggregatorChannel,
    dishName: "",
    amount: "640",
  });
  const [simError, setSimError] = useState("");
  const [otpInputByTicket, setOtpInputByTicket] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const activeTickets = useMemo(() => {
    return state.tickets
      .filter((t) => t.stage !== "Dispatched")
      .filter((t) => (brandFilter === "All" ? true : t.brand === brandFilter))
      .filter((t) =>
        stationFilter === "All" ? true : t.items.some((i) => i.station === stationFilter)
      )
      .filter((t) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          t.orderNo.toLowerCase().includes(q) ||
          t.brand.toLowerCase().includes(q) ||
          t.riderName.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.slaMinutesLeft - b.slaMinutesLeft);
  }, [state.tickets, brandFilter, stationFilter, search]);

  const metrics = useMemo(() => {
    const gross = state.tickets.reduce((s, t) => s + t.grossAmount, 0);
    const aggregatorFees = state.tickets.reduce(
      (s, t) => s + Math.round((t.grossAmount * t.commissionPct) / 100),
      0
    );
    const netPayout = gross - aggregatorFees;
    const breached = state.tickets.filter((t) => t.stage !== "Dispatched" && t.slaMinutesLeft < 0).length;
    return { gross, aggregatorFees, netPayout, breached };
  }, [state.tickets]);

  const toggleItemDone = (ticketId: string, itemId: string) => {
    setState((prev) => ({
      ...prev,
      tickets: prev.tickets.map((t) =>
        t.id === ticketId
          ? { ...t, items: t.items.map((it) => (it.id === itemId ? { ...it, done: !it.done } : it)) }
          : t
      ),
    }));
  };

  const bumpStage = (ticket: CloudTicket) => {
    const nextMap: Record<TicketStage, TicketStage> = {
      Prep: "Expedite",
      Expedite: "Packed",
      Packed: "Dispatched",
      Dispatched: "Dispatched",
    };
    const nextStage = nextMap[ticket.stage];
    if (ticket.stage === "Packed") {
      const typed = (otpInputByTicket[ticket.id] || "").trim();
      if (typed && typed !== ticket.otp) {
        notify(`Invalid Rider PIN! Expected ${ticket.otp}.`);
        return;
      }
    }
    setState((prev) => ({
      ...prev,
      tickets: prev.tickets.map((t) => (t.id === ticket.id ? { ...t, stage: nextStage } : t)),
    }));
    notify(`${ticket.orderNo} moved to ${nextStage}`);
  };

  const handleInjectOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const dish = simForm.dishName.trim();
    const amt = Number(simForm.amount);
    if (!dish) {
      setSimError("Enter an incoming dish name.");
      return;
    }
    if (!Number.isFinite(amt) || amt <= 0) {
      setSimError("Enter a valid order amount.");
      return;
    }
    const created: CloudTicket = {
      id: `gk-${Date.now()}`,
      orderNo: `#${simForm.channel === "Swiggy" ? "SW" : simForm.channel === "Zomato" ? "ZM" : "GG"}-${Math.floor(4000 + Math.random() * 5000)}`,
      brand: simForm.brand,
      channel: simForm.channel,
      stage: "Prep",
      slaMinutesLeft: 11,
      grossAmount: amt,
      commissionPct: simForm.channel === "Direct Web" ? 0 : 22,
      riderName: "Assigned Soon",
      bay: "Bay 5",
      otp: String(Math.floor(1000 + Math.random() * 9000)),
      items: [{ id: `gki-${Date.now()}`, name: dish, station: "Wok", done: false }],
    };
    setState((prev) => ({ ...prev, tickets: [created, ...prev.tickets] }));
    setSimForm({ brand: "FireWok Express", channel: "Zomato", dishName: "", amount: "640" });
    setSimError("");
    setSimulateModalOpen(false);
    setTab("kds");
    notify(`Ingested ${created.orderNo} for ${created.brand}`);
  };

  return (
    <div className="min-h-screen bg-[#0F131C] text-[#DFE2EF] flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#262A34] bg-[#0A0E17]/95 backdrop-blur-md px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href={`/demos/${product.categorySlug}/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded bg-[#181B25] border border-[#262A34] text-[#D8C3AD] hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm tracking-wide text-[#F59E0B]">
                GHOSTGRID // KDS
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#4CD7F6]/15 text-[#4CD7F6] border border-[#4CD7F6]/30">
                4 VIRTUAL BRANDS LIVE
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#94A3B8]">
              {state.hubName} • Breached SLAs: {metrics.breached} • Active Queue: {activeTickets.length}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "kds", label: "Live KDS Bump", icon: Flame },
            { id: "menu-sync", label: "Aggregator Menu Sync", icon: RefreshCw },
            { id: "payouts", label: "Brand Payouts", icon: BarChart3 },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id as any)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono cursor-pointer ${
                  tab === item.id
                    ? "bg-[#F59E0B] text-[#0A0E17] font-bold"
                    : "bg-[#181B25] border border-[#262A34] text-[#D8C3AD] hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSimulateModalOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#4CD7F6] text-[#001F26] text-xs font-mono font-bold cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Inject Order
          </button>
          <button
            type="button"
            onClick={() => {
              resetState();
              notify("GhostGrid KDS hub reset.");
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#181B25] border border-[#262A34] text-xs font-mono text-[#D8C3AD] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            type="button"
            onClick={() => setCustomOpen(true)}
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-[#FFC174] text-xs font-mono cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Customize
          </button>
        </div>
      </header>

      {/* LIVE KDS BUMP BOARD */}
      {tab === "kds" && (
        <div className="p-4 md:p-5 space-y-4">
          {/* Virtual Brand Selector & Station Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#181B25] border border-[#262A34] rounded-lg p-3">
            <div className="flex flex-wrap gap-1.5">
              {(["All", ...BRANDS] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBrandFilter(b)}
                  className={`px-3 py-1.5 rounded text-xs font-mono cursor-pointer ${
                    brandFilter === b
                      ? "bg-[#F59E0B] text-[#0A0E17] font-bold"
                      : "bg-[#0F131C] border border-[#262A34] text-[#D8C3AD]"
                  }`}
                >
                  {b === "All" ? `All Brands (${activeTickets.length})` : b}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Order #, rider, brand..."
                  className="pl-8 pr-2.5 py-1.5 w-44 rounded bg-[#0F131C] border border-[#262A34] text-xs font-mono focus:outline-none focus:border-[#F59E0B]"
                />
              </div>
              <div className="flex gap-1">
                {(["All", "Wok", "Tandoor", "Grill", "Pasta"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStationFilter(st)}
                    className={`px-2 py-1 rounded text-[11px] font-mono cursor-pointer ${
                      stationFilter === st
                        ? "bg-[#4CD7F6] text-[#001F26] font-bold"
                        : "bg-[#0F131C] text-[#94A3B8] border border-[#262A34]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Multi-Column KDS Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {activeTickets.map((t) => {
              const isOverdue = t.slaMinutesLeft < 0;
              const isWarning = t.slaMinutesLeft >= 0 && t.slaMinutesLeft <= 4;
              const isPacked = t.stage === "Packed";
              const borderClass = isPacked
                ? "border-[#56E5A9]"
                : isOverdue
                ? "border-[#EF4444]"
                : isWarning
                ? "border-[#F59E0B]"
                : "border-[#4CD7F6]/70";
              return (
                <div
                  key={t.id}
                  className={`rounded-lg border-2 ${borderClass} bg-[#181B25] flex flex-col justify-between overflow-hidden`}
                >
                  <div className="p-3.5 space-y-3">
                    {/* SLA Top Strip */}
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span
                        className={`px-2 py-0.5 rounded font-bold ${
                          isPacked
                            ? "bg-[#56E5A9]/20 text-[#6FFBBE]"
                            : isOverdue
                            ? "bg-[#EF4444]/20 text-[#FFB4AB]"
                            : "bg-[#F59E0B]/20 text-[#FFC174]"
                        }`}
                      >
                        {isPacked ? "PACKED • RIDER BAY" : isOverdue ? "SLA BREACHED" : t.stage.toUpperCase()}
                      </span>
                      <span className="font-bold text-sm">
                        {t.slaMinutesLeft < 0
                          ? `-${Math.abs(t.slaMinutesLeft)}:14`
                          : `0${t.slaMinutesLeft}:45`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#F59E0B] text-[#0A0E17] font-mono font-bold text-xs">
                          {t.channel.toUpperCase()}
                        </span>
                        <span className="font-mono font-bold text-base">{t.orderNo}</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#94A3B8]">{t.bay}</span>
                    </div>

                    <p className="text-xs font-semibold text-[#FFC174]">{t.brand}</p>

                    {t.allergyNote && (
                      <div className="p-2 rounded bg-[#93000A] text-[#FFDAD6] text-[11px] font-mono flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span>{t.allergyNote}</span>
                      </div>
                    )}

                    {/* Checkable Items */}
                    <div className="space-y-1.5 border-t border-[#262A34] pt-2.5">
                      {t.items.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleItemDone(t.id, item.id)}
                          className="w-full text-left flex items-start justify-between gap-2 text-xs p-1.5 rounded hover:bg-[#262A34] cursor-pointer"
                        >
                          <span className={item.done ? "line-through text-[#6B7280]" : "text-[#DFE2EF]"}>
                            [{item.done ? "✓" : " "}] {item.name}
                            {item.mod ? <span className="block text-[10px] text-[#4CD7F6]">• {item.mod}</span> : null}
                          </span>
                          <span className="text-[10px] font-mono text-[#94A3B8] shrink-0">{item.station}</span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#262A34] flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                      <span className="flex items-center gap-1">
                        <Bike className="w-3.5 h-3.5 text-[#4CD7F6]" /> {t.riderName}
                      </span>
                      <span>OTP: {t.otp}</span>
                    </div>

                    {isPacked && (
                      <input
                        type="text"
                        placeholder={`Verify PIN (${t.otp})`}
                        value={otpInputByTicket[t.id] || ""}
                        onChange={(e) =>
                          setOtpInputByTicket((p) => ({ ...p, [t.id]: e.target.value }))
                        }
                        className="w-full px-2.5 py-1.5 rounded bg-[#0F131C] border border-[#56E5A9]/50 text-xs font-mono text-white"
                      />
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => bumpStage(t)}
                    className={`w-full py-2.5 font-mono font-bold text-xs cursor-pointer ${
                      isPacked
                        ? "bg-[#56E5A9] text-[#003824]"
                        : isOverdue
                        ? "bg-[#FFB4AB] text-[#690005]"
                        : "bg-[#F59E0B] text-[#0A0E17]"
                    }`}
                  >
                    {t.stage === "Prep"
                      ? "BUMP TO EXPEDITE →"
                      : t.stage === "Expedite"
                      ? "SEAL BAG & CALL RIDER →"
                      : "CONFIRM RIDER HANDOFF ✓"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AGGREGATOR MENU SYNC */}
      {tab === "menu-sync" && (
        <div className="p-6 max-w-5xl mx-auto w-full space-y-4">
          <div>
            <h1 className="text-lg font-bold font-mono">Multi-Brand Channel Menu Sync</h1>
            <p className="text-xs text-[#94A3B8]">
              Push simulated live storefront availability toggles across Swiggy, Zomato, and Direct Web.
            </p>
          </div>
          <div className="rounded-lg border border-[#262A34] bg-[#181B25] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A0E17] border-b border-[#262A34] font-mono text-[#94A3B8]">
                <tr>
                  <th className="px-4 py-3">Virtual Brand</th>
                  <th className="px-4 py-3">SKU Dish</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3 text-center">Swiggy</th>
                  <th className="px-4 py-3 text-center">Zomato</th>
                  <th className="px-4 py-3 text-center">Direct Web</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262A34]">
                {state.menuSync.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3 font-mono text-[#FFC174]">{row.brand}</td>
                    <td className="px-4 py-3 font-medium">{row.dishName}</td>
                    <td className="px-4 py-3 font-mono">₹{row.price}</td>
                    {(["swiggyLive", "zomatoLive", "directLive"] as const).map((field) => (
                      <td key={field} className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setState((prev) => ({
                              ...prev,
                              menuSync: prev.menuSync.map((m) =>
                                m.id === row.id ? { ...m, [field]: !m[field] } : m
                              ),
                            }));
                            notify(`Synced ${row.dishName} availability.`);
                          }}
                          className={`px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer ${
                            row[field]
                              ? "bg-[#56E5A9]/20 text-[#6FFBBE] border border-[#56E5A9]/40"
                              : "bg-[#93000A]/50 text-[#FFDAD6] border border-[#EF4444]/40"
                          }`}
                        >
                          {row[field] ? "ONLINE" : "PAUSED"}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BRAND PAYOUT ANALYTICS */}
      {tab === "payouts" && (
        <div className="p-6 max-w-5xl mx-auto w-full space-y-5">
          <div>
            <h1 className="text-lg font-bold font-mono">Per-Brand Food Cost vs Aggregator Payouts</h1>
            <p className="text-xs text-[#94A3B8]">
              Calculated dynamically from gross order totals minus aggregator commissions (0% on Direct Web).
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-lg border border-[#262A34] bg-[#181B25] p-4">
              <p className="text-xs font-mono text-[#94A3B8]">Gross Brand Sales</p>
              <p className="text-2xl font-mono font-bold mt-1">₹{metrics.gross.toLocaleString("en-IN")}</p>
            </div>
            <div className="rounded-lg border border-[#262A34] bg-[#181B25] p-4">
              <p className="text-xs font-mono text-[#94A3B8]">Aggregator Commissions</p>
              <p className="text-2xl font-mono font-bold mt-1 text-[#FFB4AB]">
                -₹{metrics.aggregatorFees.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-lg border border-[#262A34] bg-[#181B25] p-4">
              <p className="text-xs font-mono text-[#94A3B8]">Net Kitchen Payout</p>
              <p className="text-2xl font-mono font-bold mt-1 text-[#56E5A9]">
                ₹{metrics.netPayout.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BRANDS.map((brand) => {
              const brandOrders = state.tickets.filter((t) => t.brand === brand);
              const bGross = brandOrders.reduce((s, t) => s + t.grossAmount, 0);
              const bNet = brandOrders.reduce(
                (s, t) => s + Math.round(t.grossAmount * (1 - t.commissionPct / 100)),
                0
              );
              return (
                <div key={brand} className="rounded-lg border border-[#262A34] bg-[#181B25] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-[#FFC174]">{brand}</span>
                    <span className="text-xs font-mono text-[#94A3B8]">{brandOrders.length} orders</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span>Gross: ₹{bGross.toLocaleString("en-IN")}</span>
                    <span className="text-[#56E5A9]">Net: ₹{bNet.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Inject Aggregator Order Modal */}
      {simulateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <form onSubmit={handleInjectOrder} className="w-full max-w-md rounded-lg border border-[#262A34] bg-[#181B25] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono font-bold text-sm">Inject Simulated Channel Order</h3>
              <button type="button" onClick={() => setSimulateModalOpen(false)} className="text-[#94A3B8] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            {simError && <p className="text-xs text-[#FFB4AB] bg-[#93000A] p-2 rounded">{simError}</p>}
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#94A3B8] mb-1">Virtual Brand</label>
                  <select
                    value={simForm.brand}
                    onChange={(e) => setSimForm((p) => ({ ...p, brand: e.target.value as VirtualBrand }))}
                    className="w-full px-3 py-2 rounded bg-[#0F131C] border border-[#262A34]"
                  >
                    {BRANDS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#94A3B8] mb-1">Channel</label>
                  <select
                    value={simForm.channel}
                    onChange={(e) => setSimForm((p) => ({ ...p, channel: e.target.value as AggregatorChannel }))}
                    className="w-full px-3 py-2 rounded bg-[#0F131C] border border-[#262A34]"
                  >
                    <option value="Zomato">Zomato</option>
                    <option value="Swiggy">Swiggy</option>
                    <option value="Direct Web">Direct Web (0% Fee)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[#94A3B8] mb-1">Dish Item</label>
                <input
                  type="text"
                  value={simForm.dishName}
                  onChange={(e) => setSimForm((p) => ({ ...p, dishName: e.target.value }))}
                  placeholder="e.g. Smoked Truffle Ramen Bowl"
                  className="w-full px-3 py-2 rounded bg-[#0F131C] border border-[#262A34]"
                />
              </div>
              <div>
                <label className="block text-[#94A3B8] mb-1">Order Total (₹)</label>
                <input
                  type="number"
                  value={simForm.amount}
                  onChange={(e) => setSimForm((p) => ({ ...p, amount: e.target.value }))}
                  className="w-full px-3 py-2 rounded bg-[#0F131C] border border-[#262A34]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setSimulateModalOpen(false)} className="px-3 py-1.5 rounded border border-[#262A34] text-xs cursor-pointer">
                Cancel
              </button>
              <button type="submit" className="px-4 py-1.5 rounded bg-[#4CD7F6] text-[#001F26] font-mono font-bold text-xs cursor-pointer">
                Push to KDS
              </button>
            </div>
          </form>
        </div>
      )}

      <CustomizationModal demo={toDemoModel(product)} isOpen={customOpen} onClose={() => setCustomOpen(false)} />

      {toast && (
        <div className="fixed bottom-4 right-4 z-50 px-4 py-2.5 rounded-lg border border-[#F59E0B]/50 bg-[#181B25] text-xs font-mono text-white shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#56E5A9]" />
          {toast}
        </div>
      )}
    </div>
  );
}
