"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  Flame,
  Monitor,
  Plus,
  RotateCcw,
  Sparkles,
  Timer,
  Zap,
} from "lucide-react";
import type { DemoProductDefinition } from "../../types";
import { toDemoModel } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

type TabId = "kiosk" | "kds" | "tokentv" | "metrics";

interface QsrMenuItem {
  id: string;
  code: string;
  name: string;
  category: "Smash Burgers" | "Crispy Chicken" | "Veg Station" | "Sides";
  station: string;
  prepSec: number;
  singlePrice: number;
  comboAddOn: number;
  comboDesc: string;
}

interface QsrToken {
  id: string;
  tokenNo: string;
  guestLabel: string;
  lane: "Kiosk #03" | "Drive-Thru" | "Counter";
  itemsSummary: string;
  total: number;
  prepSeconds: number;
  status: "Preparing" | "Ready" | "Picked Up";
  isCombo: boolean;
}

interface QsrState {
  brandName: string;
  tokens: QsrToken[];
}

const QSR_MENU: QsrMenuItem[] = [
  { id: "q-1", code: "#SM-01", name: "Double Smash Crunch Burger", category: "Smash Burgers", station: "Grill Station", prepSec: 88, singlePrice: 249, comboAddOn: 90, comboDesc: "Crinkle Fries + Fizzy Cola" },
  { id: "q-2", code: "#CK-04", name: "Fiery Peri-Peri Chicken Tenders", category: "Crispy Chicken", station: "Fryer Bay 3", prepSec: 95, singlePrice: 289, comboAddOn: 90, comboDesc: "Crinkle Fries + Slaw + Drink" },
  { id: "q-3", code: "#VG-02", name: "Crispy Veggie Royale Burger", category: "Veg Station", station: "Dedicated Veg", prepSec: 75, singlePrice: 199, comboAddOn: 90, comboDesc: "Salted Fries + Peach Iced Tea" },
  { id: "q-4", code: "#SM-09", name: "Truffle Melt Double Cheeseburger", category: "Smash Burgers", station: "Grill Station", prepSec: 105, singlePrice: 319, comboAddOn: 90, comboDesc: "Parmesan Fries + Thick Shake" },
];

const SNAP_SERVE_SEED: QsrState = {
  brandName: "SnapServe QSR · Express Lane",
  tokens: [
    {
      id: "tk-404",
      tokenNo: "#404",
      guestLabel: "Counter 2 Pickup",
      lane: "Kiosk #03",
      itemsSummary: "2x Double Smash Combo",
      total: 678,
      prepSeconds: 82,
      status: "Ready",
      isCombo: true,
    },
    {
      id: "tk-405",
      tokenNo: "#405",
      guestLabel: "Drive-Thru Window",
      lane: "Drive-Thru",
      itemsSummary: "Peri-Peri Tender Combo",
      total: 379,
      prepSeconds: 74,
      status: "Ready",
      isCombo: true,
    },
    {
      id: "tk-408",
      tokenNo: "#408",
      guestLabel: "Walk-In Token",
      lane: "Counter",
      itemsSummary: "Truffle Melt Combo",
      total: 409,
      prepSeconds: 65,
      status: "Preparing",
      isCombo: true,
    },
    {
      id: "tk-409",
      tokenNo: "#409",
      guestLabel: "Kiosk Order",
      lane: "Kiosk #03",
      itemsSummary: "Crispy Veggie Royale (Single)",
      total: 199,
      prepSeconds: 42,
      status: "Preparing",
      isCombo: false,
    },
  ],
};

export function SnapServeQsrApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState } = useDemoState<QsrState>(
    product.slug,
    SNAP_SERVE_SEED
  );
  const [tab, setTab] = useState<TabId>("kiosk");
  const [catFilter, setCatFilter] = useState<string>("All Items");
  const [kioskBag, setKioskBag] = useState<{ item: QsrMenuItem; isCombo: boolean }[]>([
    { item: QSR_MENU[0], isCombo: true },
  ]);
  const [pickupName, setPickupName] = useState("");
  const [laneSelect, setLaneSelect] = useState<QsrToken["lane"]>("Kiosk #03");
  const [toast, setToast] = useState<string | null>(null);
  const [customOpen, setCustomOpen] = useState(false);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((curr) => (curr === msg ? null : curr)), 2500);
  };

  const filteredMenu = useMemo(() => {
    if (catFilter === "All Items") return QSR_MENU;
    return QSR_MENU.filter((m) => m.category === catFilter);
  }, [catFilter]);

  const bagTotal = useMemo(
    () => kioskBag.reduce((s, r) => s + r.item.singlePrice + (r.isCombo ? r.item.comboAddOn : 0), 0),
    [kioskBag]
  );

  const preparingTokens = useMemo(
    () => state.tokens.filter((t) => t.status === "Preparing"),
    [state.tokens]
  );
  const readyTokens = useMemo(
    () => state.tokens.filter((t) => t.status === "Ready"),
    [state.tokens]
  );

  const fireKioskOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (kioskBag.length === 0) return;
    const tokenNo = `#${410 + state.tokens.length}`;
    const label = pickupName.trim() || `Kiosk Guest ${tokenNo}`;
    const summary = kioskBag
      .map((b) => `${b.item.name.split(" ")[0]} ${b.isCombo ? "Combo" : "Single"}`)
      .join(", ");
    const created: QsrToken = {
      id: `tk-${Date.now()}`,
      tokenNo,
      guestLabel: label,
      lane: laneSelect,
      itemsSummary: summary,
      total: bagTotal,
      prepSeconds: 85,
      status: "Preparing",
      isCombo: kioskBag.some((b) => b.isCombo),
    };
    setState((prev) => ({
      ...prev,
      tokens: [created, ...prev.tokens],
    }));
    setPickupName("");
    setKioskBag([{ item: QSR_MENU[0], isCombo: true }]);
    notify(`Fired Token ${tokenNo} (${label}) to Grill & Fryer KDS.`);
  };

  const bumpToken = (id: string) => {
    setState((prev) => ({
      ...prev,
      tokens: prev.tokens.map((t) => {
        if (t.id !== id) return t;
        const nextStatus: QsrToken["status"] =
          t.status === "Preparing" ? "Ready" : t.status === "Ready" ? "Picked Up" : "Picked Up";
        return { ...t, status: nextStatus };
      }),
    }));
    notify("KDS token bumped to Ready Board.");
  };

  const avgPrepSec = useMemo(() => {
    if (state.tokens.length === 0) return 90;
    return Math.round(state.tokens.reduce((s, t) => s + t.prepSeconds, 0) / state.tokens.length);
  }, [state.tokens]);

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#1B1B1E] flex flex-col font-sans">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-[#B70011] text-white text-xs font-bold shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Top High-Energy QSR Header */}
      <header className="border-b border-[#E6BDB8] bg-white px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/demos/food-hospitality/qsr-management"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E6BDB8] text-xs text-[#5C403C] hover:bg-[#FFFBEB]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#DC2626] text-white flex items-center justify-center font-extrabold text-xs">
              SS
            </div>
            <div>
              <div className="font-extrabold text-sm text-[#B70011]">{state.brandName}</div>
              <div className="text-[11px] font-semibold text-[#00682B]">
                Terminal #03 Online · {avgPrepSec}s Avg Prep Target (&lt;120s)
              </div>
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "kiosk", label: "Self-Order Kiosk & Upsell" },
            { id: "kds", label: `Speed KDS Counter (${preparingTokens.length})` },
            { id: "tokentv", label: `Ready-Token TV (${readyTokens.length})` },
            { id: "metrics", label: "Combo & Drive-Thru Metrics" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as TabId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                tab === item.id
                  ? "bg-[#DC2626] text-white"
                  : "bg-[#F6F2F7] text-[#1B1B1E] hover:bg-[#FFDAD6]"
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
              notify("QSR kiosk bag and live token board reset.");
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E6BDB8] bg-white text-xs text-[#5C403C] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            type="button"
            onClick={() => setCustomOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FFDCC3] text-[#663500] text-xs font-bold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Customize
          </button>
        </div>
      </header>

      {/* VIEW 1: SELF-ORDER KIOSK + LIVE TOKEN BOARD */}
      {tab === "kiosk" && (
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-5 p-4 md:p-6">
          {/* Left 7 cols: Burger & Crispy Combo Upsell Grid */}
          <div className="xl:col-span-7 space-y-4">
            <div className="flex flex-wrap gap-2">
              {["All Items", "Smash Burgers", "Crispy Chicken", "Veg Station"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCatFilter(c)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer ${
                    catFilter === c
                      ? "bg-[#B70011] text-white"
                      : "bg-white border border-[#E6BDB8] text-[#1B1B1E]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMenu.map((item) => (
                <div key={item.id} className="rounded-2xl border border-[#E6BDB8] bg-white p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="px-2 py-0.5 rounded bg-[#FFDAD6] text-[#93000A]">{item.code}</span>
                    <span className="text-[#00682B]">{item.station} · {item.prepSec}s</span>
                  </div>
                  <h3 className="font-extrabold text-base text-[#1B1B1E]">{item.name}</h3>

                  {/* Signature 1-Tap Combo Upsell Banner */}
                  <div className="rounded-xl border border-[#FE932C] bg-[#FFFBEB] p-3 flex items-center justify-between gap-2">
                    <div className="text-xs">
                      <div className="font-extrabold text-[#904D00]">+ Make It a Combo (+₹{item.comboAddOn})</div>
                      <div className="text-[11px] text-[#5C403C]">{item.comboDesc}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setKioskBag((prev) => [...prev, { item, isCombo: true }]);
                        notify(`Added ${item.name} Combo (+₹${item.comboAddOn}) to bag.`);
                      }}
                      className="shrink-0 px-3 py-1.5 rounded-lg bg-[#904D00] hover:bg-[#6E3900] text-white text-xs font-extrabold cursor-pointer"
                    >
                      + COMBO ₹{item.singlePrice + item.comboAddOn}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-extrabold text-base text-[#1B1B1E]">Single ₹{item.singlePrice}</span>
                    <button
                      type="button"
                      onClick={() => setKioskBag((prev) => [...prev, { item, isCombo: false }])}
                      className="px-3.5 py-1.5 rounded-lg bg-[#DC2626] hover:bg-[#B70011] text-white text-xs font-bold cursor-pointer"
                    >
                      + Add Single
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 cols: Kiosk Express Bag + Live Ready Token Board */}
          <aside className="xl:col-span-5 space-y-4">
            <div className="rounded-2xl border border-[#E6BDB8] bg-white p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-lg text-[#1B1B1E]">Express Kiosk Bag</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFDAD6] text-[#93000A] text-xs font-bold">
                  {kioskBag.length} Items
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                {kioskBag.map((row, idx) => (
                  <div key={idx} className="flex justify-between py-1.5 border-b border-[#F6F2F7]">
                    <span>
                      {row.item.name} {row.isCombo ? "(Combo Meal)" : "(Single)"}
                    </span>
                    <span className="font-bold text-[#B70011]">
                      ₹{row.item.singlePrice + (row.isCombo ? row.item.comboAddOn : 0)}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={fireKioskOrder} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#5C403C] mb-1">Guest Callout / Car Reg</label>
                  <input
                    type="text"
                    value={pickupName}
                    onChange={(e) => setPickupName(e.target.value)}
                    placeholder="Enter guest callout or token name..."
                    className="w-full px-3 py-2 rounded-xl border border-[#E6BDB8] bg-[#FFFBEB]"
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <select
                    value={laneSelect}
                    onChange={(e) => setLaneSelect(e.target.value as QsrToken["lane"])}
                    className="px-3 py-2 rounded-xl border border-[#E6BDB8] bg-[#FFFBEB] font-semibold"
                  >
                    <option value="Kiosk #03">Kiosk #03</option>
                    <option value="Drive-Thru">Drive-Thru</option>
                    <option value="Counter">Counter</option>
                  </select>
                  <div className="text-right">
                    <div className="text-[10px] uppercase text-[#5C403C]">Pay & Issue Token</div>
                    <div className="text-xl font-extrabold text-[#B70011]">₹{bagTotal}</div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#B70011] hover:bg-[#93000B] text-white font-extrabold text-sm cursor-pointer"
                >
                  ⚡ Issue Express Token & Fire KDS
                </button>
              </form>
            </div>

            {/* Live Split Order Token Display Preview */}
            <div className="rounded-2xl border border-[#E6BDB8] bg-white p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-[#1B1B1E]">Live Order Token Display</span>
                <span className="text-[11px] font-bold text-[#00682B]">98.4% On-Time</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-[#FFFBEB] border border-[#FFDCC3] p-2.5 space-y-1.5">
                  <div className="text-[10px] font-extrabold uppercase text-[#904D00]">
                    Preparing ({preparingTokens.length})
                  </div>
                  {preparingTokens.slice(0, 3).map((t) => (
                    <div key={t.id} className="p-2 rounded-lg bg-white border border-[#FFDCC3]">
                      <div className="font-extrabold text-[#B70011]">{t.tokenNo} · {t.guestLabel}</div>
                      <div className="text-[11px] text-[#5C403C] truncate">{t.itemsSummary}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-[#E7FFE4]/70 border border-[#62DF7D] p-2.5 space-y-1.5">
                  <div className="text-[10px] font-extrabold uppercase text-[#00682B]">
                    Ready Now ({readyTokens.length})
                  </div>
                  {readyTokens.slice(0, 3).map((t) => (
                    <div key={t.id} className="p-2 rounded-lg bg-white border border-[#62DF7D]">
                      <div className="font-extrabold text-[#00682B]">{t.tokenNo} · {t.guestLabel}</div>
                      <div className="text-[11px] text-[#5C403C] truncate">{t.lane}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* VIEW 2: SPEED KDS COUNTER */}
      {tab === "kds" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-extrabold text-[#B70011]">Grill & Fryer Speed Bump KDS</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.tokens.filter((t) => t.status !== "Picked Up").map((t) => (
              <div key={t.id} className="rounded-2xl border border-[#E6BDB8] bg-white p-4 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-extrabold text-[#B70011]">{t.tokenNo}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFDCC3] text-[#663500] font-bold">
                    {t.prepSeconds}s · {t.lane}
                  </span>
                </div>
                <div className="font-bold text-sm">{t.guestLabel}</div>
                <p className="text-[#5C403C]">{t.itemsSummary}</p>
                <button
                  type="button"
                  onClick={() => bumpToken(t.id)}
                  className="w-full py-2 rounded-xl bg-[#00682B] text-white font-bold cursor-pointer"
                >
                  {t.status === "Preparing" ? "Bump to Ready Display →" : "Mark Handed Off ✓"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: READY-TOKEN TV BOARD */}
      {tab === "tokentv" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border-2 border-[#FE932C] bg-white p-6 space-y-3">
            <h2 className="text-xl font-extrabold text-[#904D00]">IN KITCHEN / PREPARING</h2>
            {preparingTokens.map((t) => (
              <div key={t.id} className="p-4 rounded-xl bg-[#FFFBEB] flex justify-between items-center">
                <span className="text-2xl font-extrabold text-[#B70011]">{t.tokenNo}</span>
                <span className="text-sm font-bold text-[#5C403C]">{t.guestLabel}</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border-2 border-[#008438] bg-white p-6 space-y-3">
            <h2 className="text-xl font-extrabold text-[#00682B]">PLEASE COLLECT AT COUNTER</h2>
            {readyTokens.map((t) => (
              <div key={t.id} className="p-4 rounded-xl bg-[#E7FFE4] flex justify-between items-center">
                <span className="text-3xl font-extrabold text-[#00682B]">{t.tokenNo}</span>
                <span className="text-sm font-bold text-[#005320]">{t.lane} · {t.guestLabel}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: COMBO & DRIVE-THRU METRICS */}
      {tab === "metrics" && (
        <div className="flex-1 p-4 md:p-6 max-w-4xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-extrabold text-[#B70011]">Speed-of-Service & Combo Upsell Analytics</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="rounded-2xl border border-[#E6BDB8] bg-white p-5">
              <div className="text-[#5C403C]">Peak Rush Throughput</div>
              <div className="text-2xl font-extrabold text-[#B70011] mt-1">88 Orders/Hr</div>
            </div>
            <div className="rounded-2xl border border-[#E6BDB8] bg-white p-5">
              <div className="text-[#5C403C]">Combo Upsell Attach Rate</div>
              <div className="text-2xl font-extrabold text-[#904D00] mt-1">
                {Math.round((state.tokens.filter((t) => t.isCombo).length / Math.max(1, state.tokens.length)) * 100)}%
              </div>
            </div>
            <div className="rounded-2xl border border-[#E6BDB8] bg-white p-5">
              <div className="text-[#5C403C]">Average SOS Prep Time</div>
              <div className="text-2xl font-extrabold text-[#00682B] mt-1">{avgPrepSec}s</div>
            </div>
          </div>
        </div>
      )}

      <CustomizationModal demo={toDemoModel(product)} isOpen={customOpen} onClose={() => setCustomOpen(false)} />
    </div>
  );
}
