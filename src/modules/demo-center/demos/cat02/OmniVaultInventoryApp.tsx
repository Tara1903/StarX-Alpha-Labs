"use client";

import React, { useState, useMemo } from "react";
import { useDemoState } from "../../state/useDemoState";

// Invariant locale formatting helper to prevent SSR/CSR hydration mismatch
const fmtNum = (n: number | string) => Number(n || 0).toLocaleString("en-US");

interface SkuItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  binLocation: string; // e.g. A04-B12-T3
  aisle: string;
  onHand: number;
  allocated: number;
  reorderPoint: number;
  unitCost: number;
  status: "In Stock" | "Reorder Needed" | "Critical Stock" | "Discrepancy";
  hazardRating: string;
  lastCountDate: string;
}

interface InboundShipment {
  id: string;
  manifestNumber: string;
  origin: string;
  destinationDock: string;
  status: "Arrived / In Inspection" | "Docked" | "Quarantined" | "Completed";
  carrier: string;
  expectedUnits: number;
  scannedUnits: number;
  items: Array<{
    sku: string;
    name: string;
    expected: number;
    received: number;
    variance: number;
  }>;
}

interface StockTransfer {
  transferId: string;
  originWarehouse: string;
  destWarehouse: string;
  sku: string;
  productName: string;
  quantity: number;
  status: "In-Transit" | "Pending Dispatch" | "Received";
  carrierEta: string;
}

interface AuditLogEntry {
  id: string;
  timestamp: string;
  sku: string;
  action: string;
  changeQty: string;
  reason: string;
  user: string;
  bin: string;
}

const INITIAL_SKUS: SkuItem[] = [
  {
    id: "sku-1",
    sku: "OV-SKU-8492-X",
    name: "Industrial Grade Servo Motor 48V",
    category: "Industrial Drive Units",
    binLocation: "A04-B12-T3",
    aisle: "A",
    onHand: 1420,
    allocated: 120,
    reorderPoint: 400,
    unitCost: 142.5,
    status: "In Stock",
    hazardRating: "Class 1 Non-Hazardous",
    lastCountDate: "2026-10-18",
  },
  {
    id: "sku-2",
    sku: "OV-SKU-1029-A",
    name: "Titanium Hex Fastener M8x40 (Box 500)",
    category: "Fasteners & Hardware",
    binLocation: "B02-A08-T1",
    aisle: "B",
    onHand: 85,
    allocated: 75,
    reorderPoint: 200,
    unitCost: 28.4,
    status: "Reorder Needed",
    hazardRating: "Class 0 Standard",
    lastCountDate: "2026-10-22",
  },
  {
    id: "sku-3",
    sku: "OV-SKU-4910-K",
    name: "Cobalt Alloy Hydraulic Pump",
    category: "Hydraulic Assemblies",
    binLocation: "C01-C03-T4",
    aisle: "C",
    onHand: 340,
    allocated: 40,
    reorderPoint: 150,
    unitCost: 310.0,
    status: "Discrepancy",
    hazardRating: "Class 2 Pressurized Fluid",
    lastCountDate: "2026-11-02",
  },
  {
    id: "sku-4",
    sku: "OV-SKU-3194-M",
    name: "Thermal Sensor Array v2.4 (Ceramic)",
    category: "Thermal & Sensor Modules",
    binLocation: "A02-B05-T2",
    aisle: "A",
    onHand: 18,
    allocated: 14,
    reorderPoint: 100,
    unitCost: 89.0,
    status: "Critical Stock",
    hazardRating: "ESD Sensitive",
    lastCountDate: "2026-10-29",
  },
  {
    id: "sku-5",
    sku: "OV-SKU-7721-L",
    name: "High-Torque Drive Belt 1200mm",
    category: "Industrial Drive Units",
    binLocation: "D07-A01-T5",
    aisle: "D",
    onHand: 650,
    allocated: 60,
    reorderPoint: 250,
    unitCost: 44.2,
    status: "In Stock",
    hazardRating: "Standard",
    lastCountDate: "2026-10-15",
  },
  {
    id: "sku-6",
    sku: "OV-SKU-5502-R",
    name: "Lithium Storage Battery Module 5kWh",
    category: "Energy Storage Cells",
    binLocation: "C04-B02-T1",
    aisle: "C",
    onHand: 420,
    allocated: 80,
    reorderPoint: 100,
    unitCost: 850.0,
    status: "In Stock",
    hazardRating: "Class 9 Lithium Hazardous",
    lastCountDate: "2026-11-05",
  },
  {
    id: "sku-7",
    sku: "OV-SKU-9912-P",
    name: "Proximity Laser Scanner Sensor IP67",
    category: "Thermal & Sensor Modules",
    binLocation: "B05-C02-T3",
    aisle: "B",
    onHand: 190,
    allocated: 20,
    reorderPoint: 80,
    unitCost: 195.0,
    status: "In Stock",
    hazardRating: "Laser Class 2",
    lastCountDate: "2026-10-30",
  },
];

const INITIAL_INBOUND: InboundShipment = {
  id: "inbound-1",
  manifestNumber: "TR-8841-IN",
  origin: "Newark Coastal Hub NJ-2",
  destinationDock: "Chicago Central DC-1 (Dock Bay 4)",
  status: "Arrived / In Inspection",
  carrier: "Penske Freight Logistics",
  expectedUnits: 32,
  scannedUnits: 28,
  items: [
    {
      sku: "OV-SKU-4910-K",
      name: "Cobalt Alloy Hydraulic Pump",
      expected: 10,
      received: 8,
      variance: -2,
    },
    {
      sku: "OV-SKU-8492-X",
      name: "Industrial Grade Servo Motor 48V",
      expected: 22,
      received: 22,
      variance: 0,
    },
  ],
};

const INITIAL_TRANSFERS: StockTransfer[] = [
  {
    transferId: "XFER-9042",
    originWarehouse: "Chicago Central DC-1",
    destWarehouse: "Dallas Crossdock TX-3",
    sku: "OV-SKU-5502-R",
    productName: "Lithium Storage Battery Module 5kWh",
    quantity: 60,
    status: "In-Transit",
    carrierEta: "Tomorrow, 08:30 AM",
  },
  {
    transferId: "XFER-9043",
    originWarehouse: "Newark Coastal Hub NJ-2",
    destWarehouse: "Chicago Central DC-1",
    sku: "OV-SKU-3194-M",
    productName: "Thermal Sensor Array v2.4",
    quantity: 120,
    status: "In-Transit",
    carrierEta: "Today, 04:15 PM",
  },
];

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log-1",
    timestamp: "2026-11-12 18:24:10",
    sku: "OV-SKU-8492-X",
    action: "Goods Receipt Check-In",
    changeQty: "+22 Units",
    reason: "PO Receipt #PO-9048 Dock 4",
    user: "M. Kovacs (Shift Lead)",
    bin: "A04-B12-T3",
  },
  {
    id: "log-2",
    timestamp: "2026-11-12 17:15:02",
    sku: "OV-SKU-1029-A",
    action: "Pick Allocation",
    changeQty: "-30 Units",
    reason: "Outbound Pick Wave #W-419",
    user: "AutoSorter Conveyor #2",
    bin: "B02-A08-T1",
  },
  {
    id: "log-3",
    timestamp: "2026-11-12 15:40:44",
    sku: "OV-SKU-4910-K",
    action: "Variance Flagged",
    changeQty: "-2 Units",
    reason: "Inbound Shortage Quarantine",
    user: "D. Vance (QC Inspector)",
    bin: "C01-C03-T4",
  },
];

interface DemoInventoryState {
  activeWarehouse: string;
  activeTab: "matrix" | "receiving" | "transfers" | "cycleCount" | "replenish" | "audit";
  skus: SkuItem[];
  inbound: InboundShipment;
  transfers: StockTransfer[];
  auditLogs: AuditLogEntry[];
  selectedSkuId: string;
  aisleFilter: string;
  categoryFilter: string;
  scannerSyncActive: boolean;
}

const DEFAULT_STATE: DemoInventoryState = {
  activeWarehouse: "Chicago Central DC-1 (Primary)",
  activeTab: "matrix",
  skus: INITIAL_SKUS,
  inbound: INITIAL_INBOUND,
  transfers: INITIAL_TRANSFERS,
  auditLogs: INITIAL_AUDIT_LOGS,
  selectedSkuId: "sku-3", // Cobalt pump selected initially for inspector
  aisleFilter: "ALL",
  categoryFilter: "ALL",
  scannerSyncActive: true,
};

export function OmniVaultInventoryApp({ product }: { product?: any } = {}) {
  const { state, setState, resetState } = useDemoState<DemoInventoryState>(
    "omnivault-inventory-wms",
    DEFAULT_STATE
  );

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustSkuId, setAdjustSkuId] = useState("sku-3");
  const [adjustDelta, setAdjustDelta] = useState<number>(10);
  const [adjustReason, setAdjustReason] = useState("Cycle Count Discrepancy Correction");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Warehouse selection
  const warehouses = [
    "Chicago Central DC-1 (Primary)",
    "Newark Coastal Hub NJ-2",
    "Dallas Crossdock TX-3",
  ];

  // Selected SKU for right inspector
  const activeSku = useMemo(() => {
    return state.skus.find((s) => s.id === state.selectedSkuId) || state.skus[0];
  }, [state.skus, state.selectedSkuId]);

  // Total valuation calculation
  const totalValuation = useMemo(() => {
    return state.skus.reduce((sum, s) => sum + s.onHand * s.unitCost, 0);
  }, [state.skus]);

  // Low stock count
  const lowStockCount = useMemo(() => {
    return state.skus.filter((s) => s.onHand <= s.reorderPoint).length;
  }, [state.skus]);

  // Filtered SKUs
  const filteredSkus = useMemo(() => {
    return state.skus.filter((s) => {
      const matchAisle = state.aisleFilter === "ALL" || s.aisle === state.aisleFilter;
      const matchCat = state.categoryFilter === "ALL" || s.category === state.categoryFilter;
      return matchAisle && matchCat;
    });
  }, [state.skus, state.aisleFilter, state.categoryFilter]);

  // Handle barcode scan in Active Transfer & Inbound Inspector
  const handleScanBarcode = () => {
    if (state.inbound.scannedUnits < state.inbound.expectedUnits) {
      const newScanned = Math.min(state.inbound.scannedUnits + 2, state.inbound.expectedUnits);
      setState((prev) => ({
        ...prev,
        inbound: {
          ...prev.inbound,
          scannedUnits: newScanned,
        },
      }));
      showToast(`Scanned Barcode: *SKU-4910-K* (+2 Units verified). Progress: ${newScanned}/${state.inbound.expectedUnits}`);
    } else {
      showToast("All inbound units already scanned and verified against manifest.");
    }
  };

  // Handle Commit Goods Receipt
  const handleCommitGoodsReceipt = () => {
    const updatedSkus = state.skus.map((s) => {
      if (s.sku === "OV-SKU-4910-K") {
        return {
          ...s,
          onHand: s.onHand + 8, // add 8 received
          status: "In Stock" as const,
        };
      }
      return s;
    });

    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      sku: "OV-SKU-4910-K",
      action: "Goods Inward Committed",
      changeQty: "+8 Units",
      reason: `Dock Receipt for Manifest ${state.inbound.manifestNumber} with -2 variance logged`,
      user: "Admin (Direct Commit)",
      bin: "C01-C03-T4",
    };

    setState((prev) => ({
      ...prev,
      skus: updatedSkus,
      inbound: {
        ...prev.inbound,
        status: "Completed",
      },
      auditLogs: [newLog, ...prev.auditLogs],
    }));

    showToast("Committed Goods Receipt! Inventory updated and ledger entry recorded.");
  };

  // Flag variance & Quarantine
  const handleQuarantineVariance = () => {
    showToast("Flagged -2 Units Variance. RMA Discrepancy Ticket #DISC-9021 created for supplier.");
  };

  // Handle Manual Stock Adjustment
  const handleExecuteAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    const targetSku = state.skus.find((s) => s.id === adjustSkuId);
    if (!targetSku) return;

    const newOnHand = Math.max(0, targetSku.onHand + adjustDelta);
    const updatedSkus = state.skus.map((s) => {
      if (s.id === adjustSkuId) {
        return {
          ...s,
          onHand: newOnHand,
          status:
            newOnHand <= s.reorderPoint
              ? newOnHand < 30
                ? ("Critical Stock" as const)
                : ("Reorder Needed" as const)
              : ("In Stock" as const),
        };
      }
      return s;
    });

    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      sku: targetSku.sku,
      action: "Manual Stock Adjustment",
      changeQty: `${adjustDelta >= 0 ? "+" : ""}${adjustDelta} Units`,
      reason: adjustReason,
      user: "Admin / Inventory Lead",
      bin: targetSku.binLocation,
    };

    setState((prev) => ({
      ...prev,
      skus: updatedSkus,
      auditLogs: [newLog, ...prev.auditLogs],
    }));

    setShowAdjustModal(false);
    showToast(`Adjusted ${targetSku.sku} by ${adjustDelta >= 0 ? "+" : ""}${adjustDelta} units. New on-hand: ${newOnHand}`);
  };

  // 1-Click Auto Replenish PO
  const handleTriggerReorder = (skuItem: SkuItem) => {
    const replenishmentQty = skuItem.reorderPoint * 2;
    showToast(`Generated Emergency PO for ${replenishmentQty} units of ${skuItem.sku}! PO-2026-X81 dispatched.`);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 bg-blue-600 text-white rounded-xl shadow-2xl border border-blue-400 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {toastMessage}
        </div>
      )}

      {/* Top Application Bar */}
      <header className="border-b border-slate-800 bg-[#0B1326] sticky top-0 z-30 shadow-md">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Facility Switcher */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center font-black text-white text-base shadow-lg shadow-blue-500/20">
                OV
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base tracking-wider text-white">OmniVault</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-900/80 text-blue-300 border border-blue-700/50">
                    CORE v4.12
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Enterprise Multi-Warehouse OS
                </div>
              </div>
            </div>

            {/* Warehouse Selector */}
            <div className="hidden sm:flex items-center gap-1 bg-[#131B2E] p-1.5 rounded-xl border border-slate-700/80">
              <svg className="w-4 h-4 text-blue-400 ml-1.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <select
                value={state.activeWarehouse}
                onChange={(e) => {
                  setState((prev) => ({ ...prev, activeWarehouse: e.target.value }));
                  showToast(`Switched active warehouse context to ${e.target.value}`);
                }}
                className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer pr-2"
              >
                {warehouses.map((w) => (
                  <option key={w} value={w} className="bg-slate-900 text-white">
                    {w}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Real-Time Metrics */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[10px] text-slate-400">STOCK VALUATION</span>
              <span className="text-emerald-400 font-bold text-sm">
                ${fmtNum(totalValuation)}
              </span>
            </div>

            <div className="hidden lg:flex flex-col text-right">
              <span className="text-[10px] text-slate-400">BIN UTILIZATION</span>
              <span className="text-blue-300 font-bold">
                4,820 / 5,000 <span className="text-[10px] text-slate-400">(96.4%)</span>
              </span>
            </div>

            <div className="hidden xl:flex flex-col text-right">
              <span className="text-[10px] text-slate-400">INBOUND SHIPMENTS</span>
              <span className="text-amber-400 font-bold">14 Vessels / Docks</span>
            </div>

            {/* Quick Action Button: Adjust Stock */}
            <button
              onClick={() => setShowAdjustModal(true)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/30 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              + Adjust Stock
            </button>

            {/* Reset State Button */}
            <button
              onClick={() => {
                resetState();
                showToast("Reset OmniVault WMS state to defaults.");
              }}
              title="Reset Demo Data"
              aria-label="Reset Demo Data"
              className="p-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-[1600px] mx-auto px-4 flex items-center gap-1 overflow-x-auto border-t border-slate-800/80 py-1.5 text-xs font-medium">
          <button
            onClick={() => setState((prev) => ({ ...prev, activeTab: "matrix" }))}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              state.activeTab === "matrix"
                ? "bg-blue-600 text-white font-bold shadow"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            Warehouse Stock & Bin Matrix
          </button>

          <button
            onClick={() => setState((prev) => ({ ...prev, activeTab: "receiving" }))}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              state.activeTab === "receiving"
                ? "bg-blue-600 text-white font-bold shadow"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            Goods Inward & Receiving Dock
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono">
              {state.inbound.status === "Completed" ? "0 pending" : "1 active"}
            </span>
          </button>

          <button
            onClick={() => setState((prev) => ({ ...prev, activeTab: "transfers" }))}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              state.activeTab === "transfers"
                ? "bg-blue-600 text-white font-bold shadow"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            Inter-Warehouse Transfers
            <span className="px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono">
              {state.transfers.length} in-transit
            </span>
          </button>

          <button
            onClick={() => setState((prev) => ({ ...prev, activeTab: "cycleCount" }))}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              state.activeTab === "cycleCount"
                ? "bg-blue-600 text-white font-bold shadow"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            Cycle Counting & Adjustments
          </button>

          <button
            onClick={() => setState((prev) => ({ ...prev, activeTab: "replenish" }))}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              state.activeTab === "replenish"
                ? "bg-blue-600 text-white font-bold shadow"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            Low-Stock Replenishment
            {lowStockCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-mono">
                {lowStockCount} alerts
              </span>
            )}
          </button>

          <button
            onClick={() => setState((prev) => ({ ...prev, activeTab: "audit" }))}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              state.activeTab === "audit"
                ? "bg-blue-600 text-white font-bold shadow"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            Audit & Stock Ledger
          </button>
        </div>
      </header>

      {/* Main Body Grid */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left/Center Content Area (8 Cols on Desktop) */}
        <section className="lg:col-span-8 space-y-6">
          {/* TAB 1: WAREHOUSE STOCK & BIN MATRIX */}
          {state.activeTab === "matrix" && (
            <div className="space-y-4">
              {/* Filter and Occupancy Controls */}
              <div className="bg-[#0E1729] rounded-2xl border border-slate-800 p-4 space-y-3 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Aisle filter pill group */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400 font-mono mr-1">Aisle:</span>
                    {["ALL", "A", "B", "C", "D"].map((aisle) => (
                      <button
                        key={aisle}
                        onClick={() => setState((prev) => ({ ...prev, aisleFilter: aisle }))}
                        className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg border transition-colors ${
                          state.aisleFilter === aisle
                            ? "bg-blue-600 text-white border-blue-500 shadow"
                            : "bg-[#131B2E] text-slate-400 border-slate-700 hover:text-white"
                        }`}
                      >
                        {aisle}
                      </button>
                    ))}
                  </div>

                  {/* Category Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">Category:</span>
                    <select
                      value={state.categoryFilter}
                      onChange={(e) => setState((prev) => ({ ...prev, categoryFilter: e.target.value }))}
                      className="bg-[#131B2E] border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1 focus:outline-none"
                    >
                      <option value="ALL">All Categories</option>
                      <option value="Industrial Drive Units">Industrial Drive Units</option>
                      <option value="Fasteners & Hardware">Fasteners & Hardware</option>
                      <option value="Hydraulic Assemblies">Hydraulic Assemblies</option>
                      <option value="Thermal & Sensor Modules">Thermal & Sensor Modules</option>
                      <option value="Energy Storage Cells">Energy Storage Cells</option>
                    </select>
                  </div>
                </div>

                {/* Aisle Occupancy Bar Indicators */}
                <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-mono">
                  <div className="bg-[#131B2E] p-2 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>AISLE A:</span>
                      <span className="text-emerald-400 font-bold">92%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[92%]" />
                    </div>
                  </div>

                  <div className="bg-[#131B2E] p-2 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>AISLE B:</span>
                      <span className="text-blue-400 font-bold">84%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[84%]" />
                    </div>
                  </div>

                  <div className="bg-[#131B2E] p-2 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>AISLE C:</span>
                      <span className="text-amber-400 font-bold">98% (Dense)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[98%]" />
                    </div>
                  </div>

                  <div className="bg-[#131B2E] p-2 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>AISLE D:</span>
                      <span className="text-emerald-400 font-bold">67%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[67%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-[#0E1729] rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-white">
                      Warehouse SKU Master & Physical Bin Allocations
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Live sync with Honeywell scanning terminals and forklift pick guidance.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Showing {filteredSkus.length} of {state.skus.length} SKUs
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-[#131B2E] text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                        <th className="py-2.5 px-3">SKU CODE</th>
                        <th className="py-2.5 px-3">PRODUCT / CATEGORY</th>
                        <th className="py-2.5 px-3">BIN LOCATION</th>
                        <th className="py-2.5 px-3 text-right">ON-HAND</th>
                        <th className="py-2.5 px-3 text-right">AVAIL</th>
                        <th className="py-2.5 px-3 text-right">UNIT COST</th>
                        <th className="py-2.5 px-3 text-right">VALUATION</th>
                        <th className="py-2.5 px-3 text-center">STATUS</th>
                        <th className="py-2.5 px-3 text-center">INSPECT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-sans">
                      {filteredSkus.map((sku) => {
                        const isSelected = sku.id === state.selectedSkuId;
                        const available = Math.max(0, sku.onHand - sku.allocated);
                        const valuation = sku.onHand * sku.unitCost;

                        return (
                          <tr
                            key={sku.id}
                            className={`hover:bg-[#131B2E]/60 transition-colors cursor-pointer ${
                              isSelected ? "bg-blue-950/40 border-l-4 border-l-blue-500" : ""
                            }`}
                            onClick={() => setState((prev) => ({ ...prev, selectedSkuId: sku.id }))}
                          >
                            <td className="py-3 px-3 font-mono font-bold text-blue-400">
                              {sku.sku}
                            </td>
                            <td className="py-3 px-3">
                              <div className="font-bold text-white">{sku.name}</div>
                              <div className="text-[10px] text-slate-400">{sku.category}</div>
                            </td>
                            <td className="py-3 px-3 font-mono text-slate-300">
                              <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px]">
                                {sku.binLocation}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right font-mono font-bold text-slate-100">
                              {fmtNum(sku.onHand)}
                            </td>
                            <td className="py-3 px-3 text-right font-mono text-emerald-400 font-semibold">
                              {fmtNum(available)}
                            </td>
                            <td className="py-3 px-3 text-right font-mono text-slate-300">
                              ${fmtNum(sku.unitCost)}
                            </td>
                            <td className="py-3 px-3 text-right font-mono font-bold text-white">
                              ${fmtNum(valuation)}
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  sku.status === "In Stock"
                                    ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800"
                                    : sku.status === "Discrepancy"
                                    ? "bg-rose-950/80 text-rose-300 border border-rose-800 animate-pulse"
                                    : sku.status === "Critical Stock"
                                    ? "bg-rose-900/80 text-rose-200 border border-rose-700 font-black"
                                    : "bg-amber-950/80 text-amber-300 border border-amber-800"
                                }`}
                              >
                                {sku.status}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setState((prev) => ({ ...prev, selectedSkuId: sku.id }));
                                }}
                                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded text-[11px] font-mono transition-colors"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GOODS INWARD & RECEIVING DOCK */}
          {state.activeTab === "receiving" && (
            <div className="bg-[#0E1729] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">
                    Inbound Dock Receiving & Gate Verification
                  </h3>
                  <p className="text-xs text-slate-400">
                    Live bay telemetry, Bill of Lading (BOL) verification, and automated discrepancy quarantine.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {state.inbound.status}
                </span>
              </div>

              {/* Inbound Manifest Overview Card */}
              <div className="p-4 rounded-xl bg-[#131B2E] border border-slate-700/80 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400">MANIFEST #:</span>
                    <div className="font-bold text-blue-400 text-sm mt-0.5">
                      {state.inbound.manifestNumber}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">ORIGIN WAREHOUSE:</span>
                    <div className="text-slate-200 mt-0.5">{state.inbound.origin}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">ASSIGNED DOCK:</span>
                    <div className="text-emerald-400 font-bold mt-0.5">
                      {state.inbound.destinationDock}
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400 font-mono">
                      BARCODE SCAN RECONCILIATION ({state.inbound.scannedUnits} /{" "}
                      {state.inbound.expectedUnits} UNITS)
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {Math.round((state.inbound.scannedUnits / state.inbound.expectedUnits) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{
                        width: `${Math.round(
                          (state.inbound.scannedUnits / state.inbound.expectedUnits) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Inbound Line Items */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 font-mono">MANIFEST LINE ITEMS:</h4>
                <div className="space-y-2">
                  {state.inbound.items.map((item) => (
                    <div
                      key={item.sku}
                      className="p-3 rounded-xl bg-[#131B2E] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span className="font-mono text-blue-400">{item.sku}</span>
                          <span>•</span>
                          <span>{item.name}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          Expected: {item.expected} Units | Received: {item.received} Units
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {item.variance !== 0 ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800">
                            Variance: {item.variance} Units
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                            100% Match
                          </span>
                        )}

                        <button
                          onClick={handleScanBarcode}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-blue-300 rounded text-xs font-mono border border-slate-700"
                        >
                          Scan Barcode
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={handleQuarantineVariance}
                  className="px-3.5 py-1.5 bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800 rounded-xl text-xs font-bold transition-colors"
                >
                  Flag Variance & Quarantine
                </button>
                <button
                  onClick={handleCommitGoodsReceipt}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition-colors"
                >
                  Commit Goods Receipt (Stock +8)
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: INTER-WAREHOUSE TRANSFERS */}
          {state.activeTab === "transfers" && (
            <div className="bg-[#0E1729] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">
                    Multi-Warehouse Stock Movements & LPN Telemetry
                  </h3>
                  <p className="text-xs text-slate-400">
                    Active freight manifests between regional distribution centers and crossdocks.
                  </p>
                </div>
                <button
                  onClick={() => {
                    showToast("Initiated Inter-DC Transfer Request #XFER-9045. Route allocated.");
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow"
                >
                  + New Stock Transfer
                </button>
              </div>

              <div className="space-y-3">
                {state.transfers.map((xfer) => (
                  <div
                    key={xfer.transferId}
                    className="p-4 rounded-xl bg-[#131B2E] border border-slate-700/80 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-blue-400">
                          {xfer.transferId}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-950 text-blue-300 border border-blue-800">
                          {xfer.status}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-semibold">
                        ETA: {xfer.carrierEta}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300">
                      Product: <span className="font-bold text-white">{xfer.productName}</span> (
                      <span className="font-mono text-blue-300">{xfer.sku}</span>) • Qty:{" "}
                      <span className="font-mono font-bold text-amber-300">{xfer.quantity} Units</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                      <div>
                        <span className="text-slate-500">Origin:</span> {xfer.originWarehouse}
                      </div>
                      <div>
                        <span className="text-slate-500">Destination:</span> {xfer.destWarehouse}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CYCLE COUNTING & ADJUSTMENTS */}
          {state.activeTab === "cycleCount" && (
            <div className="bg-[#0E1729] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">
                    Cycle Count Reconciliation & Variance Resolution
                  </h3>
                  <p className="text-xs text-slate-400">
                    Physical count verification vs system book quantities with reason codes.
                  </p>
                </div>
                <button
                  onClick={() => setShowAdjustModal(true)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl"
                >
                  + Record Count Audit
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                  <thead>
                    <tr className="bg-[#131B2E] text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                      <th className="py-2.5 px-3">SKU</th>
                      <th className="py-2.5 px-3">PRODUCT</th>
                      <th className="py-2.5 px-3">BIN</th>
                      <th className="py-2.5 px-3 text-right">BOOK QTY</th>
                      <th className="py-2.5 px-3 text-right">LAST AUDITED</th>
                      <th className="py-2.5 px-3 text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {state.skus.map((s) => (
                      <tr key={s.id} className="hover:bg-[#131B2E]/60">
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-400">{s.sku}</td>
                        <td className="py-2.5 px-3 font-medium text-white">{s.name}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-300">{s.binLocation}</td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-100">
                          {fmtNum(s.onHand)}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-slate-400">
                          {s.lastCountDate}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => {
                              setAdjustSkuId(s.id);
                              setShowAdjustModal(true);
                            }}
                            className="px-2 py-1 bg-blue-900/40 hover:bg-blue-900/70 text-blue-300 border border-blue-700/60 rounded text-[11px] font-mono"
                          >
                            Reconcile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: LOW-STOCK REPLENISHMENT */}
          {state.activeTab === "replenish" && (
            <div className="bg-[#0E1729] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">
                    Low-Stock Alerts & Automated Purchase Orders
                  </h3>
                  <p className="text-xs text-slate-400">
                    SKUs below safety stock thresholds with 1-click supplier PO dispatch.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  {lowStockCount} Action Required
                </span>
              </div>

              <div className="space-y-3">
                {state.skus
                  .filter((s) => s.onHand <= s.reorderPoint)
                  .map((s) => (
                    <div
                      key={s.id}
                      className="p-4 rounded-xl bg-[#131B2E] border border-rose-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-400 text-sm">{s.sku}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                            {s.status}
                          </span>
                        </div>
                        <div className="font-bold text-white text-xs mt-1">{s.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-1">
                          On-Hand: <span className="text-rose-400 font-bold">{s.onHand}</span> | Reorder
                          Point: {s.reorderPoint} Units | Unit Cost: ${fmtNum(s.unitCost)}
                        </div>
                      </div>

                      <button
                        onClick={() => handleTriggerReorder(s)}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow transition-colors shrink-0"
                      >
                        1-Click PO ({s.reorderPoint * 2} Units)
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 6: AUDIT & STOCK LEDGER */}
          {state.activeTab === "audit" && (
            <div className="bg-[#0E1729] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-sm">
              <div>
                <h3 className="font-bold text-base text-white">
                  Immutable Inventory Transaction & Movement Ledger
                </h3>
                <p className="text-xs text-slate-400">
                  Full traceability of receipts, picks, variance adjustments, and cycle count logs.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#131B2E] text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                      <th className="py-2.5 px-3">TIMESTAMP</th>
                      <th className="py-2.5 px-3">SKU</th>
                      <th className="py-2.5 px-3">ACTION</th>
                      <th className="py-2.5 px-3 text-right">CHANGE</th>
                      <th className="py-2.5 px-3">BIN</th>
                      <th className="py-2.5 px-3">REASON / OPERATOR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {state.auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-[#131B2E]/60">
                        <td className="py-2.5 px-3 font-mono text-slate-400">{log.timestamp}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-400">{log.sku}</td>
                        <td className="py-2.5 px-3 font-semibold text-white">{log.action}</td>
                        <td
                          className={`py-2.5 px-3 text-right font-mono font-bold ${
                            log.changeQty.startsWith("+")
                              ? "text-emerald-400"
                              : log.changeQty.startsWith("-")
                              ? "text-rose-400"
                              : "text-slate-300"
                          }`}
                        >
                          {log.changeQty}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-300">{log.bin}</td>
                        <td className="py-2.5 px-3 text-slate-400">
                          <div>{log.reason}</div>
                          <div className="text-[10px] text-slate-500 font-mono">By: {log.user}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Right Drawer / Inspector (4 Cols on Desktop) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Active Transfer & Inbound Inspector */}
          <div className="bg-[#0E1729] rounded-2xl border border-slate-800 p-5 space-y-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <h3 className="font-bold text-sm text-white">Active Transfer & Inbound Inspector</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                LIVE DOCK
              </span>
            </div>

            <div className="text-xs font-mono text-slate-400">
              Manifest: <span className="text-white font-bold">#TR-8841-IN</span>
            </div>

            {/* Route Box */}
            <div className="p-3 rounded-xl bg-[#131B2E] border border-slate-700/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono text-[10px]">ROUTE:</span>
                <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Arrived / In Inspection
                </span>
              </div>
              <div className="flex items-center justify-between font-medium text-slate-200">
                <span>Newark Coastal Hub NJ-2</span>
                <span className="text-blue-400 font-bold">→</span>
                <span className="text-emerald-300 font-bold">Chicago Central DC-1 (Dock Bay 4)</span>
              </div>
            </div>

            {/* Barcode Verification Simulation */}
            <div className="p-4 rounded-xl bg-[#131B2E] border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Barcode Verification:</span>
                <span className="text-emerald-400 font-bold">
                  {state.inbound.scannedUnits} / {state.inbound.expectedUnits} Units (
                  {Math.round((state.inbound.scannedUnits / state.inbound.expectedUnits) * 100)}%)
                </span>
              </div>

              {/* Barcode Graphic */}
              <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-center">
                <div className="flex items-center justify-center gap-1 h-10 px-4">
                  {[3, 1, 4, 1, 5, 2, 6, 1, 3, 4, 2, 5, 1, 2, 4, 3, 1, 6, 2, 1, 4].map(
                    (w, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-200 h-full"
                        style={{ width: `${w * 1.5}px` }}
                      />
                    )
                  )}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1 tracking-widest">
                  *SKU-4910-K-TR8841*
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded flex-1 truncate">
                  SKU-4910-K-SN98201
                </span>
                <button
                  onClick={handleScanBarcode}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow font-mono transition-colors"
                >
                  Scan Barcode
                </button>
              </div>
            </div>

            {/* Discrepancy Detection Card */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
                  <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Discrepancy Detected
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-900/80 text-rose-200">
                  VARIANCE ALERT
                </span>
              </div>

              <div className="text-xs">
                <span className="text-slate-400">Item: </span>
                <span className="text-white font-bold">Cobalt Alloy Hydraulic Pump</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400">EXPECTED</div>
                  <div className="font-bold text-slate-200 mt-0.5">10 Units</div>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400">RECEIVED</div>
                  <div className="font-bold text-slate-200 mt-0.5">8 Units</div>
                </div>
                <div className="bg-rose-950 p-2 rounded-lg border border-rose-800">
                  <div className="text-[10px] text-rose-300">VARIANCE</div>
                  <div className="font-black text-rose-400 mt-0.5">-2 Units</div>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleQuarantineVariance}
                  className="w-full py-1.5 bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700 rounded-lg text-xs font-bold transition-colors"
                >
                  Flag Variance & Quarantine
                </button>
                <button
                  onClick={handleCommitGoodsReceipt}
                  className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
                >
                  Commit Goods Receipt (Log Discrepancy)
                </button>
              </div>
            </div>

            {/* Quick Bin Allocation Details */}
            <div className="p-3 rounded-xl bg-[#131B2E] border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono text-[10px]">SELECTED SKU INSPECTOR</span>
                <span className="text-blue-400 font-mono text-[10px]">{activeSku.sku}</span>
              </div>
              <div className="font-bold text-white text-xs">{activeSku.name}</div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 pt-1">
                <div>
                  <span className="text-slate-500">Bin:</span> {activeSku.binLocation}
                </div>
                <div>
                  <span className="text-slate-500">Hazard:</span> {activeSku.hazardRating}
                </div>
                <div>
                  <span className="text-slate-500">Unit Cost:</span> ${fmtNum(activeSku.unitCost)}
                </div>
                <div>
                  <span className="text-slate-500">Valuation:</span> $
                  {fmtNum(activeSku.onHand * activeSku.unitCost)}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Adjust Stock Modal */}
      {showAdjustModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1729] rounded-2xl border border-slate-700 w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white">Manual Stock Adjustment</h3>
              <button
                onClick={() => setShowAdjustModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecuteAdjustment} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-mono">TARGET SKU:</label>
                <select
                  value={adjustSkuId}
                  onChange={(e) => setAdjustSkuId(e.target.value)}
                  className="w-full bg-[#131B2E] border border-slate-700 rounded-lg p-2 text-white font-mono"
                >
                  {state.skus.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.sku} — {s.name} (On-hand: {s.onHand})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">
                  QUANTITY ADJUSTMENT (+ / - UNITS):
                </label>
                <input
                  type="number"
                  value={adjustDelta}
                  onChange={(e) => setAdjustDelta(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#131B2E] border border-slate-700 rounded-lg p-2 text-white font-mono font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">ADJUSTMENT REASON CODE:</label>
                <select
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full bg-[#131B2E] border border-slate-700 rounded-lg p-2 text-white"
                >
                  <option value="Cycle Count Discrepancy Correction">
                    Cycle Count Discrepancy Correction
                  </option>
                  <option value="Dock Damage / Quality Quarantine">
                    Dock Damage / Quality Quarantine
                  </option>
                  <option value="Emergency Supplier Direct Drop-In">
                    Emergency Supplier Direct Drop-In
                  </option>
                  <option value="R&D Lab Calibration Sample Withdrawal">
                    R&D Lab Calibration Sample Withdrawal
                  </option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAdjustModal(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow"
                >
                  Apply Stock Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default OmniVaultInventoryApp;

