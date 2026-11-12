"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Package,
  Plus,
  RotateCcw,
  Snowflake,
  Sparkles,
  Truck,
} from "lucide-react";
import type { DemoProductDefinition } from "../../types";
import { toDemoModel } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

type TabId = "fifo" | "indents" | "grn" | "variance";

interface ColdBatchLot {
  id: string;
  lotCode: string;
  skuName: string;
  supplier: string;
  zoneTemp: string;
  hoursToExpiry: number;
  availQty: number;
  unit: string;
  status: "Urgent Push" | "FEFO Priority" | "Compliant" | "Quarantine Breach";
}

interface OutletIndent {
  id: string;
  indentNo: string;
  outletName: string;
  requestedItem: string;
  qtyKg: number;
  dispatchWindow: string;
  approved: boolean;
}

interface VarianceEntry {
  id: string;
  skuName: string;
  theoreticalKg: number;
  physicalCountKg: number;
  unitCost: number;
}

interface SupplyState {
  hubName: string;
  selectedLotId: string;
  batches: ColdBatchLot[];
  indents: OutletIndent[];
  variances: VarianceEntry[];
}

const PANTRY_LEDGER_SEED: SupplyState = {
  hubName: "PantryLedger Supply Chain DC-04",
  selectedLotId: "lot-wgy",
  batches: [
    {
      id: "lot-wgy",
      lotCode: "LOT-2026-WGY-0891",
      skuName: "Chilled A5 Striploin Cuts (Vacuum)",
      supplier: "Nippon Prime Cold",
      zoneTemp: "Chiller B-04 · +2.1°C",
      hoursToExpiry: 19,
      availQty: 142.5,
      unit: "kg",
      status: "Urgent Push",
    },
    {
      id: "lot-dry",
      lotCode: "LOT-2026-DRY-3310",
      skuName: "Normandy Heavy Cream 35% FAT (12x1L)",
      supplier: "Dairy Guild Imports",
      zoneTemp: "Chiller A-02 · +3.4°C",
      hoursToExpiry: 36,
      availQty: 64,
      unit: "cases",
      status: "FEFO Priority",
    },
    {
      id: "lot-sea",
      lotCode: "LOT-2026-SEA-1104",
      skuName: "Sashimi-Grade Bluefin Akami Block",
      supplier: "Tsukiji Ocean Cold",
      zoneTemp: "Blast Freeze A-01 · -22.3°C",
      hoursToExpiry: 336,
      availQty: 210,
      unit: "kg",
      status: "Compliant",
    },
    {
      id: "lot-egg",
      lotCode: "LOT-2026-BV-9011",
      skuName: "Pasteurized Liquid Egg Whites (10kg)",
      supplier: "Valley Farms Pte",
      zoneTemp: "Dock Bay 3 · +8.2°C [BREACH]",
      hoursToExpiry: 14,
      availQty: 30,
      unit: "units",
      status: "Quarantine Breach",
    },
  ],
  indents: [
    { id: "ind-1", indentNo: "#IND-8841", outletName: "Downtown Flagship Grill", requestedItem: "Chilled A5 Striploin Cuts", qtyKg: 35, dispatchWindow: "Tonight 17:00 · Reefer Van #04", approved: false },
    { id: "ind-2", indentNo: "#IND-8849", outletName: "Marina Waterfront Bistro", requestedItem: "Normandy Heavy Cream Cases", qtyKg: 25, dispatchWindow: "Tomorrow 10:00", approved: true },
    { id: "ind-3", indentNo: "#IND-8855", outletName: "Orchard Sushi Counter", requestedItem: "Sashimi-Grade Bluefin Akami", qtyKg: 18, dispatchWindow: "Tonight 18:30", approved: false },
  ],
  variances: [
    { id: "vr-1", skuName: "Chilled A5 Striploin Cuts", theoreticalKg: 145.0, physicalCountKg: 142.5, unitCost: 3400 },
    { id: "vr-2", skuName: "Normandy Heavy Cream 35%", theoreticalKg: 64.0, physicalCountKg: 64.0, unitCost: 1850 },
    { id: "vr-3", skuName: "Fresh Umbria Black Truffles", theoreticalKg: 8.8, physicalCountKg: 8.4, unitCost: 14500 },
  ],
};

export function PantryLedgerWmsApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState } = useDemoState<SupplyState>(
    product.slug,
    PANTRY_LEDGER_SEED
  );
  const [tab, setTab] = useState<TabId>("fifo");
  const [zoneFilter, setZoneFilter] = useState<string>("All Lots");
  const [newSkuName, setNewSkuName] = useState("");
  const [newSupplier, setNewSupplier] = useState("Alpine Cold Storage");
  const [newQty, setNewQty] = useState("85");
  const [toast, setToast] = useState<string | null>(null);
  const [customOpen, setCustomOpen] = useState(false);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((curr) => (curr === msg ? null : curr)), 2600);
  };

  const selectedLot = useMemo(
    () => state.batches.find((b) => b.id === state.selectedLotId) || state.batches[0],
    [state.batches, state.selectedLotId]
  );

  const expiringSoonCount = useMemo(
    () => state.batches.filter((b) => b.hoursToExpiry <= 48).length,
    [state.batches]
  );

  const filteredBatches = useMemo(() => {
    const sorted = [...state.batches].sort((a, b) => a.hoursToExpiry - b.hoursToExpiry);
    if (zoneFilter === "All Lots") return sorted;
    if (zoneFilter === "Expiring <48h") return sorted.filter((b) => b.hoursToExpiry <= 48);
    return sorted.filter((b) => b.status === "Quarantine Breach");
  }, [state.batches, zoneFilter]);

  const handleReceiveBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const sku = newSkuName.trim();
    if (!sku) return;
    const qty = Math.max(5, Number(newQty) || 50);
    const id = `lot-${Date.now()}`;
    const created: ColdBatchLot = {
      id,
      lotCode: `LOT-2026-GRN-${100 + state.batches.length}`,
      skuName: sku,
      supplier: newSupplier.trim() || "Verified Cold Supplier",
      zoneTemp: "Chiller B-02 · +2.4°C",
      hoursToExpiry: 120,
      availQty: qty,
      unit: "kg",
      status: "Compliant",
    };
    setState((prev) => ({
      ...prev,
      selectedLotId: id,
      batches: [created, ...prev.batches],
    }));
    setNewSkuName("");
    notify(`Received GRN batch ${created.lotCode} (${sku}, ${qty} kg) into FIFO pool.`);
  };

  const toggleQuarantine = (lotId: string) => {
    setState((prev) => ({
      ...prev,
      batches: prev.batches.map((b) => {
        if (b.id !== lotId) return b;
        const nextStatus = b.status === "Quarantine Breach" ? "Compliant" : "Quarantine Breach";
        return { ...b, status: nextStatus };
      }),
    }));
    notify("Updated QA cold-chain quarantine state.");
  };

  const approveIndent = (indentId: string) => {
    setState((prev) => ({
      ...prev,
      indents: prev.indents.map((ind) =>
        ind.id === indentId ? { ...ind, approved: true } : ind
      ),
    }));
    notify("Approved commissary indent and generated reefer picklist.");
  };

  return (
    <div className="min-h-screen bg-[#0D1322] text-[#DDE2F8] flex flex-col font-sans">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-[#38BDF8] text-[#001E2C] text-xs font-extrabold shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Top Cold-Chain Header */}
      <header className="border-b border-[#3E484F] bg-[#151B2B] px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/demos/food-hospitality/food-inventory-supply-management"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#3E484F] text-xs text-[#BDC8D1] hover:bg-[#191F2F]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div>
            <div className="font-bold text-sm text-[#8ED5FF]">{state.hubName}</div>
            <div className="text-[11px] font-mono text-[#56E5A9]">
              Cold Chain Nominal · {expiringSoonCount} Lots &lt;48h FEFO Alert
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "fifo", label: `FIFO Batch & Expiry (${state.batches.length})` },
            { id: "indents", label: `Outlet Indents (${state.indents.filter((i) => !i.approved).length})` },
            { id: "grn", label: "Supplier GRN Log" },
            { id: "variance", label: "Variance & Waste Audit" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as TabId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                tab === item.id
                  ? "bg-[#38BDF8] text-[#001E2C]"
                  : "bg-[#191F2F] text-[#DDE2F8] hover:bg-[#242A3A]"
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
              notify("FIFO cold-chain batches and indent ledger reset.");
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#3E484F] bg-[#191F2F] text-xs text-[#DDE2F8] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            type="button"
            onClick={() => setCustomOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#2F3AA3] text-[#E0E0FF] text-xs font-semibold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Customize
          </button>
        </div>
      </header>

      {/* VIEW 1: FIFO BATCH MONITOR + GRN RECEIVE INSPECTOR */}
      {tab === "fifo" && (
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-5 p-4 md:p-6">
          <div className="xl:col-span-7 space-y-4">
            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-xl border border-[#3E484F] bg-[#191F2F] p-3">
                <div className="text-[10px] font-mono uppercase text-[#BDC8D1]">Active Cold Lots</div>
                <div className="text-lg font-extrabold font-mono text-white">{state.batches.length} Lots</div>
              </div>
              <div className="rounded-xl border border-[#3E484F] bg-[#191F2F] p-3">
                <div className="text-[10px] font-mono uppercase text-[#BDC8D1]">Chiller Health</div>
                <div className="text-lg font-extrabold font-mono text-[#56E5A9]">99.8% Nominal</div>
              </div>
              <div className="rounded-xl border border-[#3E484F] bg-[#191F2F] p-3">
                <div className="text-[10px] font-mono uppercase text-[#BDC8D1]">Pending Indents</div>
                <div className="text-lg font-extrabold font-mono text-[#8ED5FF]">
                  {state.indents.filter((i) => !i.approved).length} Outlets
                </div>
              </div>
              <div className="rounded-xl border border-[#3E484F] bg-[#191F2F] p-3">
                <div className="text-[10px] font-mono uppercase text-[#BDC8D1]">Expiry Risk &lt;48h</div>
                <div className="text-lg font-extrabold font-mono text-[#FFB4AB]">{expiringSoonCount} Batches</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <h1 className="text-lg font-bold text-[#8ED5FF]">FEFO (First-Expired, First-Out) Cold Vault Lots</h1>
              <div className="flex gap-1.5 text-xs">
                {["All Lots", "Expiring <48h", "Quarantine Breach"].map((zf) => (
                  <button
                    key={zf}
                    type="button"
                    onClick={() => setZoneFilter(zf)}
                    className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                      zoneFilter === zf
                        ? "bg-[#38BDF8] text-[#001E2C]"
                        : "bg-[#191F2F] text-[#BDC8D1] border border-[#3E484F]"
                    }`}
                  >
                    {zf}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredBatches.map((lot) => {
                const isSelected = lot.id === selectedLot?.id;
                return (
                  <div
                    key={lot.id}
                    onClick={() => setState((prev) => ({ ...prev, selectedLotId: lot.id }))}
                    className={`rounded-2xl border p-4 cursor-pointer transition space-y-2.5 ${
                      isSelected
                        ? "border-[#38BDF8] bg-[#191F2F] ring-1 ring-[#38BDF8]"
                        : "border-[#3E484F] bg-[#191F2F]/80 hover:border-[#87929A]"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-mono text-[#8ED5FF]">{lot.lotCode} · {lot.supplier}</span>
                        <h3 className="font-bold text-sm text-white">{lot.skuName}</h3>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                          lot.status === "Quarantine Breach"
                            ? "bg-[#93000A] text-[#FFDAD6]"
                            : lot.status === "Urgent Push"
                            ? "bg-[#6E3900] text-[#FFDCC3]"
                            : lot.status === "FEFO Priority"
                            ? "bg-[#2F3AA3] text-[#E0E0FF]"
                            : "bg-[#003824] text-[#56E5A9]"
                        }`}
                      >
                        {lot.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#BDC8D1]">
                      <span>{lot.zoneTemp}</span>
                      <span>
                        Stock: <strong className="text-white">{lot.availQty} {lot.unit}</strong> · Expiry: {lot.hoursToExpiry}h left
                      </span>
                      <button
                        type="button"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          toggleQuarantine(lot.id);
                        }}
                        className="px-2.5 py-1 rounded bg-[#242A3A] hover:bg-[#38BDF8] hover:text-[#001E2C] text-white font-semibold cursor-pointer"
                      >
                        {lot.status === "Quarantine Breach" ? "Release Hold" : "Triage Hold"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 5 cols: Receive New Cold-Chain GRN + Outlet Indent Dispatch */}
          <aside className="xl:col-span-5 space-y-4">
            <div className="rounded-2xl border border-[#3E484F] bg-[#191F2F] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#38BDF8]">
                    Inbound Dock Receiving
                  </span>
                  <h2 className="text-base font-bold text-white">+ Receive Cold Batch / GRN</h2>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#003824] text-[#56E5A9] text-[10px] font-mono font-bold">
                  FEFO Tagged
                </span>
              </div>

              <form onSubmit={handleReceiveBatch} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#BDC8D1] mb-1">Ingredient SKU / Lot Description</label>
                  <input
                    type="text"
                    value={newSkuName}
                    onChange={(e) => setNewSkuName(e.target.value)}
                    placeholder="Enter cold-chain ingredient SKU..."
                    className="w-full px-3 py-2 rounded-xl border border-[#3E484F] bg-[#0D1322] text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#BDC8D1] mb-1">Supplier</label>
                    <input
                      type="text"
                      value={newSupplier}
                      onChange={(e) => setNewSupplier(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#3E484F] bg-[#0D1322] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#BDC8D1] mb-1">Verified Weight (kg)</label>
                    <input
                      type="number"
                      min={5}
                      value={newQty}
                      onChange={(e) => setNewQty(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#3E484F] bg-[#0D1322] text-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#8ED5FF] text-[#001E2C] font-extrabold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Log Cold-Chain GRN Batch
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-[#3E484F] bg-[#191F2F] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#8ED5FF]">Pending Outlet Indents</span>
                <span className="text-[11px] font-mono text-[#BDC8D1]">Allocate from Vault</span>
              </div>
              {state.indents.slice(0, 2).map((ind) => (
                <div key={ind.id} className="p-3 rounded-xl bg-[#0D1322] border border-[#242A3A] space-y-2 text-xs">
                  <div className="flex justify-between font-bold">
                    <span className="text-white">{ind.outletName}</span>
                    <span className="font-mono text-[#38BDF8]">{ind.qtyKg} kg</span>
                  </div>
                  <div className="text-[11px] text-[#BDC8D1]">
                    {ind.indentNo} · {ind.requestedItem} · {ind.dispatchWindow}
                  </div>
                  <button
                    type="button"
                    onClick={() => approveIndent(ind.id)}
                    disabled={ind.approved}
                    className={`w-full py-1.5 rounded-lg font-bold cursor-pointer ${
                      ind.approved ? "bg-[#003824] text-[#56E5A9]" : "bg-[#38BDF8] text-[#001E2C]"
                    }`}
                  >
                    {ind.approved ? "Picklist Dispatched ✓" : "Approve & Create Picklist"}
                  </button>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* VIEW 2: OUTLET INDENTS & COMMISSARY TRANSFERS */}
      {tab === "indents" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-bold text-[#8ED5FF]">Multi-Outlet Commissary Indent Queue</h1>
          <div className="space-y-3">
            {state.indents.map((ind) => (
              <div key={ind.id} className="rounded-2xl border border-[#3E484F] bg-[#191F2F] p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-sm text-white">{ind.indentNo} · {ind.outletName}</div>
                  <div className="font-mono text-[#BDC8D1]">
                    {ind.requestedItem} ({ind.qtyKg} kg) · {ind.dispatchWindow}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => approveIndent(ind.id)}
                  disabled={ind.approved}
                  className={`px-4 py-2 rounded-xl font-bold cursor-pointer ${
                    ind.approved ? "bg-[#003824] text-[#56E5A9]" : "bg-[#38BDF8] text-[#001E2C]"
                  }`}
                >
                  {ind.approved ? "Dispatched ✓" : "Approve Transfer"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: SUPPLIER GRN LOG */}
      {tab === "grn" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-bold text-[#8ED5FF]">Verified Supplier Goods Receipt Notes (GRN)</h1>
          <div className="rounded-2xl border border-[#3E484F] bg-[#191F2F] divide-y divide-[#2F3445] text-xs">
            {state.batches.map((b) => (
              <div key={b.id} className="p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-sm text-white">{b.lotCode} · {b.skuName}</div>
                  <div className="font-mono text-[#BDC8D1]">{b.supplier} · {b.zoneTemp}</div>
                </div>
                <span className="font-mono font-bold text-[#56E5A9]">
                  {b.availQty} {b.unit} Logged
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: THEORETICAL VS PHYSICAL VARIANCE */}
      {tab === "variance" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-bold text-[#8ED5FF]">Theoretical POS Depletion vs Cold-Vault Variance</h1>
          <div className="rounded-2xl border border-[#3E484F] bg-[#191F2F] divide-y divide-[#2F3445] text-xs">
            {state.variances.map((v) => {
              const delta = Number((v.physicalCountKg - v.theoreticalKg).toFixed(1));
              const costImpact = Math.round(delta * v.unitCost);
              return (
                <div key={v.id} className="p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-sm text-white">{v.skuName}</div>
                    <div className="font-mono text-[#BDC8D1]">
                      Theoretical: {v.theoreticalKg} kg · Physical Vault Count: {v.physicalCountKg} kg
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className={delta < 0 ? "text-[#FFB4AB] font-bold" : "text-[#56E5A9] font-bold"}>
                      Variance: {delta} kg
                    </div>
                    <div className="text-[#BDC8D1]">Impact: ₹{costImpact.toLocaleString("en-IN")}</div>
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
