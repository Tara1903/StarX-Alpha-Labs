"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Compass,
  Layers,
  Package,
  Plus,
  QrCode,
  RotateCcw,
  Scan,
  ShieldAlert,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Thermometer,
  Truck,
  X,
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

const SENSOR_DATA: Record<
  "chiller-b" | "freeze-a" | "dock-3",
  Record<"24h" | "7d" | "30d", { label: string; temp: number; alert?: boolean }[]>
> = {
  "chiller-b": {
    "24h": [
      { label: "00:00", temp: 1.9 },
      { label: "02:00", temp: 2.0 },
      { label: "04:00", temp: 1.8 },
      { label: "06:00", temp: 2.1 },
      { label: "08:00", temp: 2.4 },
      { label: "10:00", temp: 2.6 },
      { label: "12:00", temp: 2.3 },
      { label: "14:00", temp: 2.5 },
      { label: "16:00", temp: 2.2 },
      { label: "18:00", temp: 2.1 },
      { label: "20:00", temp: 2.0 },
      { label: "Now", temp: 2.1 },
    ],
    "7d": [
      { label: "Mon", temp: 2.0 },
      { label: "Tue", temp: 2.2 },
      { label: "Wed", temp: 2.1 },
      { label: "Thu", temp: 2.3 },
      { label: "Fri", temp: 2.1 },
      { label: "Sat", temp: 2.4 },
      { label: "Sun", temp: 2.1 },
    ],
    "30d": [
      { label: "Wk 1", temp: 2.1 },
      { label: "Wk 2", temp: 2.2 },
      { label: "Wk 3", temp: 2.0 },
      { label: "Wk 4", temp: 2.1 },
    ],
  },
  "freeze-a": {
    "24h": [
      { label: "00:00", temp: -22.5 },
      { label: "02:00", temp: -22.3 },
      { label: "04:00", temp: -22.7 },
      { label: "06:00", temp: -22.1 },
      { label: "08:00", temp: -21.8 },
      { label: "10:00", temp: -21.4 },
      { label: "12:00", temp: -21.9 },
      { label: "14:00", temp: -22.2 },
      { label: "16:00", temp: -22.4 },
      { label: "18:00", temp: -22.1 },
      { label: "20:00", temp: -22.5 },
      { label: "Now", temp: -22.3 },
    ],
    "7d": [
      { label: "Mon", temp: -22.1 },
      { label: "Tue", temp: -22.4 },
      { label: "Wed", temp: -22.0 },
      { label: "Thu", temp: -22.3 },
      { label: "Fri", temp: -22.2 },
      { label: "Sat", temp: -21.9 },
      { label: "Sun", temp: -22.3 },
    ],
    "30d": [
      { label: "Wk 1", temp: -22.2 },
      { label: "Wk 2", temp: -22.1 },
      { label: "Wk 3", temp: -22.3 },
      { label: "Wk 4", temp: -22.3 },
    ],
  },
  "dock-3": {
    "24h": [
      { label: "00:00", temp: 3.8 },
      { label: "02:00", temp: 3.9 },
      { label: "04:00", temp: 4.1, alert: true },
      { label: "06:00", temp: 4.5, alert: true },
      { label: "08:00", temp: 6.2, alert: true },
      { label: "10:00", temp: 7.8, alert: true },
      { label: "12:00", temp: 8.5, alert: true },
      { label: "14:00", temp: 8.9, alert: true },
      { label: "16:00", temp: 8.6, alert: true },
      { label: "18:00", temp: 8.4, alert: true },
      { label: "20:00", temp: 8.3, alert: true },
      { label: "Now", temp: 8.2, alert: true },
    ],
    "7d": [
      { label: "Mon", temp: 3.5 },
      { label: "Tue", temp: 3.8 },
      { label: "Wed", temp: 4.2, alert: true },
      { label: "Thu", temp: 5.1, alert: true },
      { label: "Fri", temp: 6.8, alert: true },
      { label: "Sat", temp: 7.9, alert: true },
      { label: "Sun", temp: 8.2, alert: true },
    ],
    "30d": [
      { label: "Wk 1", temp: 3.6 },
      { label: "Wk 2", temp: 3.9 },
      { label: "Wk 3", temp: 5.4, alert: true },
      { label: "Wk 4", temp: 8.2, alert: true },
    ],
  },
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

  // Temperature Timeline & Sensor Telemetry State
  const [tempRange, setTempRange] = useState<"24h" | "7d" | "30d">("24h");
  const [selectedSensorZone, setSelectedSensorZone] = useState<"chiller-b" | "freeze-a" | "dock-3">("chiller-b");
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // Barcode / QR Scanner Simulator
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannedLotId, setScannedLotId] = useState<string>("lot-wgy");

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
            onClick={() => setScannerOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#004D68] hover:bg-[#003824] text-[#8ED5FF] border border-[#38BDF8]/40 text-xs font-bold cursor-pointer transition shadow-sm"
          >
            <Scan className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="hidden sm:inline">Scan Lot Barcode</span>
            <span className="sm:hidden">Scan</span>
          </button>
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

            {/* Cold Storage Facility Identity & Zone HUD */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { zone: "Zone A: Blast Freeze", temp: "-22.3°C", target: "-24°C", status: "Optimal", color: "text-[#56E5A9] border-[#003824] bg-[#003824]/20" },
                { zone: "Zone B: Walk-In Chiller", temp: "+2.1°C", target: "+2.0°C", status: "Optimal", color: "text-[#56E5A9] border-[#003824] bg-[#003824]/20" },
                { zone: "Zone C: Protein Aging", temp: "+1.8°C", target: "+2.0°C", status: "Optimal", color: "text-[#56E5A9] border-[#003824] bg-[#003824]/20" },
                { zone: "Dock Bay 3: Intake", temp: "+8.2°C", target: "+4.0°C", status: "Breach Hold", color: "text-[#FFDAD6] border-[#93000A] bg-[#93000A]/30" },
              ].map((z) => (
                <div key={z.zone} className={`p-2.5 rounded-xl border ${z.color} flex flex-col justify-between`}>
                  <div className="text-[10px] font-mono text-[#BDC8D1] truncate">{z.zone}</div>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-base font-extrabold font-mono text-white">{z.temp}</span>
                    <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded bg-black/40">
                      {z.status}
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-[#87929A] mt-0.5">Target: {z.target}</div>
                </div>
              ))}
            </div>

            {/* Interactive Zone Temperature Monitoring Timeline Component */}
            <div className="rounded-2xl border border-[#3E484F] bg-[#191F2F] p-4 space-y-3.5 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#242A3A] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center">
                    <Thermometer className="w-4 h-4 text-[#38BDF8]" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      Cold Storage Temperature Telemetry
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#003824] text-[#56E5A9] border border-[#003824]">
                        NIST Live
                      </span>
                    </h2>
                    <p className="text-[11px] font-mono text-[#BDC8D1]">
                      Real-time HACCP Cold-Chain Graph · Probe Pings Every 60s
                    </p>
                  </div>
                </div>

                {/* Range Toggle */}
                <div className="flex items-center gap-1 bg-[#0D1322] border border-[#3E484F] rounded-lg p-0.5 text-xs font-mono">
                  {(["24h", "7d", "30d"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setTempRange(r);
                        setHoveredPointIndex(null);
                      }}
                      className={`px-2 py-1 rounded-md text-[11px] font-bold cursor-pointer transition ${
                        tempRange === r ? "bg-[#38BDF8] text-[#001E2C]" : "text-[#BDC8D1] hover:text-white"
                      }`}
                    >
                      {r.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zone Filter Chips */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex gap-1.5">
                  {[
                    { id: "chiller-b" as const, label: "Zone B (Walk-In Chiller · +2.1°C)" },
                    { id: "freeze-a" as const, label: "Zone A (Blast Freeze · -22.3°C)" },
                    { id: "dock-3" as const, label: "Dock Bay 3 (Intake · +8.2°C Alert)" },
                  ].map((z) => (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => {
                        setSelectedSensorZone(z.id);
                        setHoveredPointIndex(null);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer border transition ${
                        selectedSensorZone === z.id
                          ? "bg-[#38BDF8]/20 border-[#38BDF8] text-[#8ED5FF]"
                          : "bg-[#0D1322] border-[#3E484F] text-[#BDC8D1] hover:text-white"
                      }`}
                    >
                      {z.label}
                    </button>
                  ))}
                </div>

                <span className="text-[10px] font-mono text-[#87929A] italic">
                  *Simulated IoT telemetry
                </span>
              </div>

              {/* SVG Dynamic Timeline Graph */}
              {(() => {
                const currentData = SENSOR_DATA[selectedSensorZone][tempRange];
                const isFreeze = selectedSensorZone === "freeze-a";
                const isDock = selectedSensorZone === "dock-3";
                const minScale = isFreeze ? -26 : 0;
                const maxScale = isFreeze ? -18 : 10;
                const safeLow = isFreeze ? -24 : 1.0;
                const safeHigh = isFreeze ? -18 : 4.0;
                const alertLimit = isFreeze ? -19 : 4.0;

                const chartWidth = 520;
                const chartHeight = 110;
                const padLeft = 45;
                const padRight = 15;
                const padTop = 15;
                const usableWidth = chartWidth - padLeft - padRight;

                const points = currentData.map((d, i) => {
                  const x = padLeft + (i / Math.max(1, currentData.length - 1)) * usableWidth;
                  const clamped = Math.max(minScale, Math.min(maxScale, d.temp));
                  const y = padTop + (1 - (clamped - minScale) / (maxScale - minScale)) * chartHeight;
                  return { ...d, x, y };
                });

                const polylineStr = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

                const safeYTop = padTop + (1 - (safeHigh - minScale) / (maxScale - minScale)) * chartHeight;
                const safeYBottom = padTop + (1 - (safeLow - minScale) / (maxScale - minScale)) * chartHeight;
                const safeBandHeight = Math.abs(safeYBottom - safeYTop);

                const alertY = padTop + (1 - (alertLimit - minScale) / (maxScale - minScale)) * chartHeight;

                const activePoint = hoveredPointIndex !== null ? points[hoveredPointIndex] : points[points.length - 1];

                return (
                  <div className="relative bg-[#0D1322] border border-[#242A3A] rounded-xl p-3">
                    <svg
                      viewBox={`0 0 ${chartWidth} 160`}
                      className="w-full h-44 overflow-visible select-none"
                    >
                      <defs>
                        <linearGradient id="coldGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={isDock ? "#FF5449" : "#38BDF8"} stopOpacity="0.35" />
                          <stop offset="100%" stopColor={isDock ? "#FF5449" : "#38BDF8"} stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Safe Operating Range Shaded Band */}
                      <rect
                        x={padLeft}
                        y={Math.min(safeYTop, safeYBottom)}
                        width={usableWidth}
                        height={safeBandHeight}
                        fill="rgba(86, 229, 169, 0.08)"
                        stroke="rgba(86, 229, 169, 0.25)"
                        strokeDasharray="3 3"
                      />
                      <text
                        x={padLeft + 8}
                        y={Math.min(safeYTop, safeYBottom) + 12}
                        fill="#56E5A9"
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                        opacity="0.85"
                      >
                        Safe Envelope ({safeLow}°C to {safeHigh}°C)
                      </text>

                      {/* Critical Threshold Line */}
                      <line
                        x1={padLeft}
                        y1={alertY}
                        x2={padLeft + usableWidth}
                        y2={alertY}
                        stroke="#FF5449"
                        strokeDasharray="4 4"
                        strokeWidth="1.5"
                      />
                      <text
                        x={padLeft + usableWidth - 5}
                        y={alertY - 4}
                        fill="#FF5449"
                        fontSize="9"
                        fontFamily="monospace"
                        textAnchor="end"
                        fontWeight="bold"
                      >
                        Max Threshold ({alertLimit}°C)
                      </text>

                      {/* Y-Axis Grid & Labels */}
                      <text x={padLeft - 6} y={padTop + 4} fill="#87929A" fontSize="9" fontFamily="monospace" textAnchor="end">
                        {maxScale}°C
                      </text>
                      <text x={padLeft - 6} y={padTop + chartHeight / 2 + 4} fill="#87929A" fontSize="9" fontFamily="monospace" textAnchor="end">
                        {((maxScale + minScale) / 2).toFixed(0)}°C
                      </text>
                      <text x={padLeft - 6} y={padTop + chartHeight + 4} fill="#87929A" fontSize="9" fontFamily="monospace" textAnchor="end">
                        {minScale}°C
                      </text>

                      {/* Area Fill Under Polyline */}
                      <polygon
                        points={`${padLeft},${padTop + chartHeight} ${polylineStr} ${padLeft + usableWidth},${padTop + chartHeight}`}
                        fill="url(#coldGrad)"
                      />

                      {/* Polyline Path */}
                      <polyline
                        points={polylineStr}
                        fill="none"
                        stroke={isDock ? "#FF5449" : "#38BDF8"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Interactive Data Points */}
                      {points.map((pt, idx) => (
                        <g key={pt.label} className="cursor-pointer" onClick={() => setHoveredPointIndex(idx)}>
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={hoveredPointIndex === idx ? "5.5" : "3.5"}
                            fill={pt.alert ? "#FF5449" : "#38BDF8"}
                            stroke="#0D1322"
                            strokeWidth="2"
                            className="transition-all"
                          />
                          {/* X-axis time label */}
                          <text
                            x={pt.x}
                            y={padTop + chartHeight + 18}
                            fill="#87929A"
                            fontSize="8.5"
                            fontFamily="monospace"
                            textAnchor="middle"
                          >
                            {pt.label}
                          </text>
                        </g>
                      ))}
                    </svg>

                    {/* Active Point Live Telemetry Pill */}
                    {activePoint && (
                      <div className="mt-2 pt-2 border-t border-[#242A3A] flex flex-wrap items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-[#BDC8D1]">Timestamp: <strong className="text-white">{activePoint.label}</strong></span>
                          <span className="text-[#BDC8D1]">
                            Reading:{" "}
                            <strong className={activePoint.alert ? "text-[#FF5449] font-bold" : "text-[#56E5A9] font-bold"}>
                              {activePoint.temp > 0 ? `+${activePoint.temp}` : activePoint.temp}°C
                            </strong>
                          </span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            activePoint.alert ? "bg-[#93000A] text-[#FFDAD6]" : "bg-[#003824] text-[#56E5A9]"
                          }`}
                        >
                          {activePoint.alert ? "HACCP TEMP BREACH" : "COMPLIANT PASS"}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Hardware Probe Metadata Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#87929A] pt-1">
                <span>Hardware: PT100 Dual-Resistive Sensor (Calibrated NIST-Traceable)</span>
                <span>Gateway: LORAWAN-EU868 · 99.8% RSSI Signal</span>
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

      {/* Barcode & QR Lot Scanner Simulator Modal */}
      {scannerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-[#3E484F] bg-[#151B2B] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#242A3A] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center">
                  <Scan className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Cold-Chain Barcode & QR Lot Scanner</h3>
                  <p className="text-[11px] font-mono text-[#56E5A9]">HACCP Digital Custody Passport</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setScannerOpen(false)}
                className="text-[#BDC8D1] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated Viewfinder */}
            <div className="relative h-44 rounded-xl border border-[#38BDF8]/40 bg-[#0A0E1A] overflow-hidden flex flex-col items-center justify-center p-4">
              {/* Corner Reticle Markers */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#38BDF8]" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#38BDF8]" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#38BDF8]" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#38BDF8]" />

              {/* Animated Laser Scan Bar */}
              <div className="absolute inset-x-8 h-0.5 bg-[#38BDF8] shadow-[0_0_12px_#38BDF8] animate-pulse" />

              <QrCode className="w-14 h-14 text-[#38BDF8]/70 mb-2" />
              <span className="text-xs font-mono text-[#8ED5FF] font-semibold">
                SCANNER ARMED: 2D DATAMATRIX / GS1-128
              </span>
              <span className="text-[10px] font-mono text-[#87929A] mt-1">
                Align reefer crate barcode within reticle
              </span>
            </div>

            {/* Quick Lot Select for Simulation */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#BDC8D1]">
                Simulate Scan of Cold-Chain Lot:
              </label>
              <select
                value={scannedLotId}
                onChange={(e) => setScannedLotId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0D1322] border border-[#3E484F] text-xs font-mono text-white focus:outline-none focus:border-[#38BDF8]"
              >
                {state.batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.lotCode} — {b.skuName} ({b.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Scanned Lot Passport Details */}
            {(() => {
              const lot = state.batches.find((b) => b.id === scannedLotId) || state.batches[0];
              if (!lot) return null;
              return (
                <div className="p-4 rounded-xl bg-[#0D1322] border border-[#242A3A] space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8ED5FF] font-bold text-sm">{lot.lotCode}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        lot.status === "Quarantine Breach"
                          ? "bg-[#93000A] text-[#FFDAD6]"
                          : lot.status === "Urgent Push"
                          ? "bg-[#6E3900] text-[#FFDCC3]"
                          : "bg-[#003824] text-[#56E5A9]"
                      }`}
                    >
                      {lot.status}
                    </span>
                  </div>
                  <div className="text-white font-sans font-semibold text-sm">{lot.skuName}</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#BDC8D1] pt-1 border-t border-[#242A3A]">
                    <div>Supplier: <strong className="text-white">{lot.supplier}</strong></div>
                    <div>Location: <strong className="text-white">{lot.zoneTemp}</strong></div>
                    <div>Available Qty: <strong className="text-white">{lot.availQty} {lot.unit}</strong></div>
                    <div>FEFO Expiry: <strong className="text-[#FFB4AB]">{lot.hoursToExpiry}h Remaining</strong></div>
                  </div>
                </div>
              );
            })()}

            <div className="flex justify-end gap-2 pt-2 border-t border-[#242A3A]">
              <button
                type="button"
                onClick={() => setScannerOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#3E484F] text-xs text-[#BDC8D1] hover:text-white cursor-pointer"
              >
                Close Scanner
              </button>
              <button
                type="button"
                onClick={() => {
                  setState((prev) => ({ ...prev, selectedLotId: scannedLotId }));
                  notify(`Inspected scanned lot ${scannedLotId}`);
                  setScannerOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#38BDF8] hover:bg-[#8ED5FF] text-[#001E2C] text-xs font-extrabold cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                Select & View Lot Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      <CustomizationModal demo={toDemoModel(product)} isOpen={customOpen} onClose={() => setCustomOpen(false)} />
    </div>
  );
}
