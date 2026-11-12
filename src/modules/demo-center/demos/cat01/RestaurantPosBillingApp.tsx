"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Banknote,
  CheckCircle2,
  CreditCard,
  Minus,
  PauseCircle,
  Plus,
  Printer,
  QrCode,
  ReceiptText,
  RotateCcw,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import type { DemoProductDefinition } from "../../types";
import { toDemoModel } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";
import {
  KWICKBILL_POS_SEED,
  calcPosReceiptTotals,
  type PosMenuTile,
  type PosOpenOrder,
  type RestaurantPosState,
} from "./restaurantPosBillingData";

type PosScreenMode = "register" | "holds" | "xz-report";

export function RestaurantPosBillingApp({ product }: { product: DemoProductDefinition }) {
  const initialSeed = useMemo<RestaurantPosState>(() => {
    const raw = product.initialData as Partial<RestaurantPosState> | undefined;
    if (raw && Array.isArray(raw.menu) && Array.isArray(raw.openChecks)) {
      return raw as RestaurantPosState;
    }
    return KWICKBILL_POS_SEED;
  }, [product.initialData]);

  const { state, setState, resetState } = useDemoState<RestaurantPosState>(product.slug, initialSeed);

  const [mode, setMode] = useState<PosScreenMode>("register");
  const [catFilter, setCatFilter] = useState<"All" | PosMenuTile["category"]>("All");
  const [vegFilter, setVegFilter] = useState<"All" | "Veg" | "Non-Veg">("All");
  const [search, setSearch] = useState("");
  const [splitWays, setSplitWays] = useState<1 | 2 | 3>(1);
  const [selectedQuickNote, setSelectedQuickNote] = useState("Less Spicy");
  const [customOpen, setCustomOpen] = useState(false);
  const [newCheckModal, setNewCheckModal] = useState(false);
  const [newCheckLabel, setNewCheckLabel] = useState("");
  const [newCheckError, setNewCheckError] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const activeCheck = useMemo(
    () => state.openChecks.find((c) => c.id === state.activeCheckId) || state.openChecks[0],
    [state.openChecks, state.activeCheckId]
  );

  const totals = useMemo(() => calcPosReceiptTotals(activeCheck), [activeCheck]);

  const filteredMenu = useMemo(() => {
    return state.menu.filter((m) => {
      if (catFilter !== "All" && m.category !== catFilter) return false;
      if (vegFilter === "Veg" && !m.veg) return false;
      if (vegFilter === "Non-Veg" && m.veg) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return m.name.toLowerCase().includes(q) || m.code.toLowerCase().includes(q);
      }
      return true;
    });
  }, [state.menu, catFilter, vegFilter, search]);

  const shiftStats = useMemo(() => {
    const gross = state.settledReceipts.reduce((s, r) => s + r.total, 0);
    const gst = state.settledReceipts.reduce((s, r) => s + r.gstAmount, 0);
    const cash = state.settledReceipts.filter((r) => r.tender === "Cash").reduce((s, r) => s + r.total, 0);
    const upi = state.settledReceipts.filter((r) => r.tender === "UPI").reduce((s, r) => s + r.total, 0);
    const card = state.settledReceipts.filter((r) => r.tender === "Card" || r.tender === "Split").reduce((s, r) => s + r.total, 0);
    return { gross, gst, cash, upi, card, drawerTotal: state.openingFloat + cash };
  }, [state.settledReceipts, state.openingFloat]);

  const handleAddTile = (tile: PosMenuTile) => {
    if (!activeCheck) {
      notify("Create a table check first.");
      return;
    }
    setState((prev) => ({
      ...prev,
      openChecks: prev.openChecks.map((c) => {
        if (c.id !== activeCheck.id) return c;
        const existing = c.items.find((it) => it.itemId === tile.id);
        return {
          ...c,
          items: existing
            ? c.items.map((it) => (it.itemId === tile.id ? { ...it, qty: it.qty + 1 } : it))
            : [...c.items, { itemId: tile.id, name: tile.name, price: tile.price, qty: 1 }],
        };
      }),
    }));
  };

  const handleQtyDelta = (itemId: string, delta: number) => {
    if (!activeCheck) return;
    setState((prev) => ({
      ...prev,
      openChecks: prev.openChecks.map((c) => {
        if (c.id !== activeCheck.id) return c;
        return {
          ...c,
          items: c.items
            .map((it) => (it.itemId === itemId ? { ...it, qty: it.qty + delta } : it))
            .filter((it) => it.qty > 0),
        };
      }),
    }));
  };

  const handleApplyQuickNote = () => {
    if (!activeCheck || activeCheck.items.length === 0) return;
    const lastIdx = activeCheck.items.length - 1;
    setState((prev) => ({
      ...prev,
      openChecks: prev.openChecks.map((c) => {
        if (c.id !== activeCheck.id) return c;
        return {
          ...c,
          items: c.items.map((it, idx) =>
            idx === lastIdx ? { ...it, modifier: selectedQuickNote } : it
          ),
        };
      }),
    }));
    notify(`Tagged "${selectedQuickNote}" on last item.`);
  };

  const handleSettle = (tender: "UPI" | "Card" | "Cash") => {
    if (!activeCheck || activeCheck.items.length === 0) {
      notify("Add at least 1 item before settlement.");
      return;
    }
    const receipt = {
      id: `rcp-${Date.now()}`,
      invoiceNo: `INV-${Math.floor(8850 + Math.random() * 900)}`,
      tableLabel: activeCheck.label,
      tender: splitWays > 1 ? ("Split" as const) : tender,
      total: totals.total,
      gstAmount: totals.gst,
      settledAt: new Date().toTimeString().slice(0, 5),
    };
    setState((prev) => {
      const remaining = prev.openChecks.filter((c) => c.id !== activeCheck.id);
      return {
        ...prev,
        openChecks: remaining,
        activeCheckId: remaining[0]?.id || "",
        settledReceipts: [receipt, ...prev.settledReceipts],
      };
    });
    setSplitWays(1);
    notify(`Settled ${receipt.invoiceNo} (₹${totals.total.toLocaleString("en-IN")}) via ${tender}`);
  };

  const handleCreateCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const label = newCheckLabel.trim();
    if (!label) {
      setNewCheckError("Enter table or counter name (e.g. Table T-09).");
      return;
    }
    const created: PosOpenOrder = {
      id: `pos-${Date.now()}`,
      label,
      channel: "Dine-In",
      guestCount: 2,
      course: "Course 1",
      discountPct: 0,
      serviceChargePct: 5,
      held: false,
      items: [],
    };
    setState((prev) => ({
      ...prev,
      openChecks: [created, ...prev.openChecks],
      activeCheckId: created.id,
    }));
    setNewCheckLabel("");
    setNewCheckError("");
    setNewCheckModal(false);
    setMode("register");
    notify(`Opened ticket for ${label}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-[#131B2E] flex flex-col font-sans">
      {/* Top Daylight Register Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#DCE1F0] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href={`/demos/${product.categorySlug}/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#434655] hover:text-[#131B2E] border border-[#DCE1F0] rounded-lg px-2.5 py-1.5 bg-[#F2F3FF]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-[#2563EB]">
                KwickBill Touch POS
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#2563EB] text-white">
                POS V2.4
              </span>
            </div>
            <p className="text-[11px] text-[#434655]">
              {state.shiftCode} • Cashier: {state.cashierName}
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "register", label: "Register POS" },
            { id: "holds", label: `Hold Checks (${state.openChecks.filter((c) => c.held).length})` },
            { id: "xz-report", label: "Shift X/Z Close" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id as PosScreenMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                mode === tab.id
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-[#F2F3FF] text-[#434655] hover:text-[#131B2E]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setNewCheckModal(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> New Ticket
          </button>
          <button
            type="button"
            onClick={() => {
              resetState();
              notify("POS Register reset to opening shift state.");
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#DCE1F0] bg-white hover:bg-[#F2F3FF] text-xs font-medium text-[#434655] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            type="button"
            onClick={() => setCustomOpen(true)}
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#DBE1FF] text-[#003EA8] text-xs font-semibold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Customize
          </button>
        </div>
      </header>

      {/* REGISTER POS MODE */}
      {mode === "register" && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
          {/* Left Touch Menu Grid */}
          <div className="lg:col-span-7 xl:col-span-8 p-4 md:p-5 space-y-4">
            {/* Search & Veg Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-[#737686] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tap to search dish name or SKU code..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#DCE1F0] text-xs focus:outline-none focus:border-[#2563EB]"
                />
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-[#DCE1F0] rounded-xl p-1">
                {(["All", "Veg", "Non-Veg"] as const).map((vf) => (
                  <button
                    key={vf}
                    type="button"
                    onClick={() => setVegFilter(vf)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                      vegFilter === vf ? "bg-[#131B2E] text-white" : "text-[#434655]"
                    }`}
                  >
                    {vf}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {(["All", "Signature Plates", "Woodfired Pizza", "Dim Sum", "Craft Mocktails", "Desserts"] as const).map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCatFilter(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition ${
                      catFilter === cat
                        ? "bg-[#2563EB] text-white shadow-xs"
                        : "bg-white border border-[#DCE1F0] text-[#434655] hover:border-[#2563EB]"
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            {/* Tactile Oversized Item Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
              {filteredMenu.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleAddTile(item)}
                  className="rounded-2xl bg-white border border-[#DCE1F0] hover:border-[#2563EB] p-4 flex flex-col justify-between gap-3 cursor-pointer shadow-xs transition active:scale-[0.99]"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          item.veg ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${item.veg ? "bg-emerald-600" : "bg-rose-600"}`}
                        />
                        {item.code}
                      </span>
                      <span className="text-[11px] text-[#737686]">{item.category}</span>
                    </div>
                    <h3 className="font-bold text-sm text-[#131B2E]">{item.name}</h3>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#F2F3FF]">
                    <span className="font-bold text-base text-[#131B2E]">₹{item.price}</span>
                    <span className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Quick Note Strip */}
            <div className="rounded-xl bg-white border border-[#DCE1F0] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-[#434655] text-[11px] uppercase tracking-wider">Quick Note:</span>
                {["Less Spicy", "Gluten-Free", "Extra Ice", "Rush KOT"].map((note) => (
                  <button
                    key={note}
                    type="button"
                    onClick={() => setSelectedQuickNote(note)}
                    className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer ${
                      selectedQuickNote === note
                        ? "bg-[#2563EB]/10 border-[#2563EB] text-[#003EA8] font-semibold"
                        : "bg-[#F2F3FF] border-transparent text-[#434655]"
                    }`}
                  >
                    {note}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleApplyQuickNote}
                className="text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
              >
                Attach to last line →
              </button>
            </div>
          </div>

          {/* Right Paper-Tape Live Receipt Panel */}
          <aside className="lg:col-span-5 xl:col-span-4 bg-white border-t lg:border-t-0 lg:border-l border-[#DCE1F0] p-4 md:p-5 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#131B2E]">
                  Active Ticket: {activeCheck?.label || "None"}
                </span>
                <span className="text-[11px] text-[#737686]">
                  {activeCheck ? `${activeCheck.channel} • ${activeCheck.course}` : ""}
                </span>
              </div>
              {/* Ticket Selector & Hold */}
              <div className="flex items-center justify-between gap-2">
                <select
                  value={activeCheck?.id || ""}
                  onChange={(e) => setState((prev) => ({ ...prev, activeCheckId: e.target.value }))}
                  className="flex-1 px-3 py-2 rounded-xl bg-[#F2F3FF] border border-[#DCE1F0] font-bold text-xs text-[#131B2E]"
                >
                  {state.openChecks.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label} • {c.channel} ({c.items.reduce((s, i) => s + i.qty, 0)} items)
                    </option>
                  ))}
                </select>
                {activeCheck && (
                  <button
                    type="button"
                    onClick={() => {
                      setState((prev) => ({
                        ...prev,
                        openChecks: prev.openChecks.map((c) =>
                          c.id === activeCheck.id ? { ...c, held: !c.held } : c
                        ),
                      }));
                      notify(activeCheck.held ? "Check resumed to active register." : "Check placed on Hold.");
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold cursor-pointer"
                  >
                    <PauseCircle className="w-3.5 h-3.5" />
                    {activeCheck.held ? "Held" : "Hold"}
                  </button>
                )}
              </div>

              {/* Line Items List */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {!activeCheck || activeCheck.items.length === 0 ? (
                  <div className="py-10 text-center text-xs text-[#737686] border border-dashed border-[#DCE1F0] rounded-xl">
                    Tap menu tiles on the left to build check.
                  </div>
                ) : (
                  activeCheck.items.map((line) => (
                    <div
                      key={line.itemId}
                      className="rounded-xl border border-[#DCE1F0] p-3 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-xs truncate">{line.name}</p>
                        <p className="text-[11px] text-[#737686]">
                          ₹{line.price} each {line.modifier ? `• ${line.modifier}` : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleQtyDelta(line.itemId, -1)}
                          className="w-7 h-7 rounded-lg bg-[#F2F3FF] flex items-center justify-center cursor-pointer"
                          aria-label="Decrease qty"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-bold text-xs">{line.qty}</span>
                        <button
                          type="button"
                          onClick={() => handleQtyDelta(line.itemId, 1)}
                          className="w-7 h-7 rounded-lg bg-[#F2F3FF] flex items-center justify-center cursor-pointer"
                          aria-label="Increase qty"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <span className="w-14 text-right font-bold text-xs">
                          ₹{(line.price * line.qty).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Tax, Split & Settlement Footer */}
            <div className="border-t border-[#DCE1F0] pt-3 space-y-3">
              {/* Split Check & Discount */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-semibold text-[#434655]">SPLIT:</span>
                  {([1, 2, 3] as const).map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setSplitWays(w)}
                      className={`px-2 py-1 rounded border text-[11px] font-semibold cursor-pointer ${
                        splitWays === w
                          ? "bg-[#2563EB] border-[#2563EB] text-white"
                          : "bg-white border-[#DCE1F0] text-[#434655]"
                      }`}
                    >
                      {w === 1 ? "No Split" : `${w}x (₹${Math.ceil(totals.total / w)})`}
                    </button>
                  ))}
                </div>
                {activeCheck && (
                  <button
                    type="button"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        openChecks: prev.openChecks.map((c) =>
                          c.id === activeCheck.id ? { ...c, discountPct: c.discountPct === 10 ? 0 : 10 } : c
                        ),
                      }))
                    }
                    className={`px-2 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                      activeCheck.discountPct > 0
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-[#F2F3FF] text-[#434655]"
                    }`}
                  >
                    {activeCheck.discountPct > 0 ? "10% VIP Applied" : "+ 10% Disc"}
                  </button>
                )}
              </div>

              <div className="space-y-1 text-xs text-[#434655] bg-[#FAF8FF] p-3 rounded-xl border border-[#DCE1F0]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totals.subtotal.toLocaleString("en-IN")}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({activeCheck?.discountPct}%)</span>
                    <span>-₹{totals.discount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>CGST/SGST (5%)</span>
                  <span>₹{totals.gst.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Charge ({activeCheck?.serviceChargePct || 0}%)</span>
                  <span>₹{totals.serviceCharge.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#DCE1F0] text-[#131B2E]">
                  <span className="font-bold">TOTAL AMOUNT DUE</span>
                  <span className="text-2xl font-extrabold">₹{totals.total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleSettle("UPI")}
                  className="py-2.5 rounded-xl bg-[#006C4A] hover:bg-[#059669] text-white text-xs font-bold flex flex-col items-center gap-1 cursor-pointer"
                >
                  <QrCode className="w-4 h-4" /> Pay UPI
                </button>
                <button
                  type="button"
                  onClick={() => handleSettle("Card")}
                  className="py-2.5 rounded-xl bg-[#006C4A] hover:bg-[#059669] text-white text-xs font-bold flex flex-col items-center gap-1 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" /> Card POS
                </button>
                <button
                  type="button"
                  onClick={() => handleSettle("Cash")}
                  className="py-2.5 rounded-xl bg-[#006C4A] hover:bg-[#059669] text-white text-xs font-bold flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Banknote className="w-4 h-4" /> Cash
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => notify("Sent simulated KOT slip to kitchen printer.")}
                  className="py-1.5 rounded-lg border border-[#DCE1F0] text-xs font-semibold text-[#434655] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> Print KOT
                </button>
                <button
                  type="button"
                  onClick={() => notify("Generated sandbox e-bill receipt preview.")}
                  className="py-1.5 rounded-lg border border-[#DCE1F0] text-xs font-semibold text-[#434655] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ReceiptText className="w-3.5 h-3.5" /> E-Bill SMS
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* HELD CHECKS MODE */}
      {mode === "holds" && (
        <div className="p-6 max-w-5xl mx-auto w-full space-y-4">
          <h1 className="text-lg font-bold">Held & Open Table Checks</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.openChecks.map((chk) => {
              const t = calcPosReceiptTotals(chk);
              return (
                <div key={chk.id} className="rounded-2xl bg-white border border-[#DCE1F0] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{chk.label}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        chk.held ? "bg-amber-100 text-amber-800" : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {chk.held ? "ON HOLD" : "ACTIVE"}
                    </span>
                  </div>
                  <p className="text-xs text-[#434655]">
                    {chk.channel} • {chk.items.reduce((s, i) => s + i.qty, 0)} items • Total ₹{t.total}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setState((prev) => ({
                        ...prev,
                        activeCheckId: chk.id,
                        openChecks: prev.openChecks.map((c) => (c.id === chk.id ? { ...c, held: false } : c)),
                      }));
                      setMode("register");
                    }}
                    className="w-full py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold cursor-pointer"
                  >
                    Recall to Register
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SHIFT X/Z CLOSE REPORT */}
      {mode === "xz-report" && (
        <div className="p-6 max-w-5xl mx-auto w-full space-y-5">
          <div>
            <h1 className="text-lg font-bold">Shift X/Z Reconciliation Report</h1>
            <p className="text-xs text-[#434655]">
              Live register drawer audit computed from settled checks in this session.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-white border border-[#DCE1F0] p-4">
              <p className="text-xs text-[#434655]">Shift Gross Settled</p>
              <p className="text-2xl font-extrabold mt-1">₹{shiftStats.gross.toLocaleString("en-IN")}</p>
            </div>
            <div className="rounded-2xl bg-white border border-[#DCE1F0] p-4">
              <p className="text-xs text-[#434655]">Cash Drawer Expected</p>
              <p className="text-2xl font-extrabold mt-1 text-[#059669]">
                ₹{shiftStats.drawerTotal.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-[#DCE1F0] p-4">
              <p className="text-xs text-[#434655]">UPI & QR Total</p>
              <p className="text-2xl font-extrabold mt-1 text-[#2563EB]">
                ₹{shiftStats.upi.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-[#DCE1F0] p-4">
              <p className="text-xs text-[#434655]">Card Settlements</p>
              <p className="text-2xl font-extrabold mt-1">₹{shiftStats.card.toLocaleString("en-IN")}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-[#DCE1F0] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F2F3FF] border-b border-[#DCE1F0] text-[#434655]">
                <tr>
                  <th className="px-4 py-3">Invoice</th>
                  <th className="px-4 py-3">Table / Counter</th>
                  <th className="px-4 py-3">Tender</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE1F0]">
                {state.settledReceipts.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3 font-bold">{r.invoiceNo}</td>
                    <td className="px-4 py-3">{r.tableLabel}</td>
                    <td className="px-4 py-3 font-semibold text-[#006C4A]">{r.tender}</td>
                    <td className="px-4 py-3 text-[#434655]">{r.settledAt}</td>
                    <td className="px-4 py-3 text-right font-bold">₹{r.total.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* New Ticket Modal */}
      {newCheckModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateCheck} className="w-full max-w-sm rounded-2xl bg-white p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base">Open New Register Check</h3>
              <button type="button" onClick={() => setNewCheckModal(false)} className="text-[#737686] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            {newCheckError && <p className="text-xs text-rose-700 bg-rose-50 p-2 rounded">{newCheckError}</p>}
            <div>
              <label className="block text-xs font-semibold text-[#434655] mb-1">Table or Counter Label</label>
              <input
                type="text"
                value={newCheckLabel}
                onChange={(e) => setNewCheckLabel(e.target.value)}
                placeholder="e.g. Table T-09"
                className="w-full px-3 py-2 rounded-xl border border-[#DCE1F0] text-xs"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setNewCheckModal(false)}
                className="px-3 py-1.5 rounded-lg border border-[#DCE1F0] text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-semibold cursor-pointer">
                Open Check
              </button>
            </div>
          </form>
        </div>
      )}

      <CustomizationModal demo={toDemoModel(product)} isOpen={customOpen} onClose={() => setCustomOpen(false)} />

      {toast && (
        <div className="fixed bottom-4 right-4 z-50 px-4 py-2.5 rounded-xl bg-[#131B2E] text-white text-xs font-medium shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#68DBA9]" />
          {toast}
        </div>
      )}
    </div>
  );
}
