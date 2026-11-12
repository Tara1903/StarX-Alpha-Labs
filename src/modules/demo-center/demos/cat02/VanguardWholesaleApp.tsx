"use client";

import React, { useState, useMemo } from "react";
import { DemoProductDefinition } from "../../types";
import { useDemoState } from "../../state/useDemoState";

interface WholesaleProduct {
  id: string;
  sku: string;
  upc: string;
  title: string;
  category: string;
  specs: string;
  masterPack: string;
  inStockPallets: number;
  inStockUnits: number;
  hubLocation: string;
  tierPrices: {
    tier1: { min: number; max: number; price: number };
    tier2: { min: number; max: number; price: number };
    tier3: { min: number; price: number };
  };
  moq: number;
  selectedQty: number;
}

interface FreightWaybill {
  bolNumber: string;
  carrier: string;
  pallets: number;
  weightLbs: number;
  status: "In Transit" | "Dock Loaded" | "Delivered";
  origin: string;
  destination: string;
  eta: string;
}

interface Quotation {
  quoteId: string;
  client: string;
  createdDate: string;
  expiryDate: string;
  totalUnits: number;
  totalAmount: number;
  status: "Active Price Lock" | "Expired" | "Converted to PO";
}

interface WholesaleState {
  accountCreditLimit: number; // $250,000
  accountCreditUsed: number;  // $67,550
  activeAccount: string;
  products: WholesaleProduct[];
  quotations: Quotation[];
  waybills: FreightWaybill[];
  submittedOrders: {
    poNumber: string;
    date: string;
    itemsCount: number;
    unitsCount: number;
    totalAmount: number;
    status: string;
  }[];
  activeTab?: string;
}

const INITIAL_PRODUCTS: WholesaleProduct[] = [
  {
    id: "WP-01",
    sku: "VG-FAST-9024",
    upc: "088491024519",
    title: "High Tensile Grade 8 Hex Bolts (3/4\" x 4\")",
    category: "Fasteners",
    specs: "Yellow Zinc Chromate • Box 100",
    masterPack: "24 bxs/ctn • 48 ctn/pallet",
    inStockPallets: 18,
    inStockUnits: 4320,
    hubLocation: "Central Hub (Gary, IN)",
    tierPrices: {
      tier1: { min: 1, max: 49, price: 48.5 },
      tier2: { min: 50, max: 249, price: 41.2 },
      tier3: { min: 250, price: 34.8 },
    },
    moq: 50,
    selectedQty: 120,
  },
  {
    id: "WP-02",
    sku: "VG-HVAC-3100",
    upc: "088491031002",
    title: "Commercial Air Handler Filter Pack (24\"x24\"x2\") MERV 13",
    category: "HVAC Fittings",
    specs: "Pleated Antimicrobial • Case 12",
    masterPack: "12 units/ctn • 30 ctn/pallet",
    inStockPallets: 24,
    inStockUnits: 8640,
    hubLocation: "Chicago DC #2",
    tierPrices: {
      tier1: { min: 1, max: 79, price: 74.0 },
      tier2: { min: 80, max: 299, price: 66.5 },
      tier3: { min: 300, price: 58.2 },
    },
    moq: 80,
    selectedQty: 360,
  },
  {
    id: "WP-03",
    sku: "VG-TOOL-4820",
    upc: "088491048208",
    title: "Industrial Magnetic Base Drill Press (1200W, 2\" Capacity)",
    category: "Heavy Hand Tools",
    specs: "Hard Shell Case • Heavy Duty",
    masterPack: "1 unit/crate • 8 crates/pallet",
    inStockPallets: 4,
    inStockUnits: 32,
    hubLocation: "East Coast Hub",
    tierPrices: {
      tier1: { min: 1, max: 5, price: 498.0 },
      tier2: { min: 6, max: 19, price: 445.0 },
      tier3: { min: 20, price: 398.0 },
    },
    moq: 2,
    selectedQty: 4,
  },
  {
    id: "WP-04",
    sku: "VG-ELEC-1192",
    upc: "088491011924",
    title: "12-Gauge Copper Armored MC Cable (250ft Spool)",
    category: "Electrical Conduit",
    specs: "Aluminum Armor • UL Listed",
    masterPack: "4 spools/ctn • 16 ctn/pallet",
    inStockPallets: 35,
    inStockUnits: 2240,
    hubLocation: "Indianapolis Regional",
    tierPrices: {
      tier1: { min: 1, max: 19, price: 185.0 },
      tier2: { min: 20, max: 99, price: 162.0 },
      tier3: { min: 100, price: 144.5 },
    },
    moq: 10,
    selectedQty: 0,
  },
  {
    id: "WP-05",
    sku: "VG-PNEU-5541",
    upc: "088491055411",
    title: "Heavy Industrial Pneumatic Framing Nailer 21-Degree",
    category: "Pneumatics",
    specs: "Magnesium Housing • 70-120 PSI",
    masterPack: "6 units/ctn • 24 ctn/pallet",
    inStockPallets: 12,
    inStockUnits: 1728,
    hubLocation: "Central Hub (Gary, IN)",
    tierPrices: {
      tier1: { min: 1, max: 11, price: 210.0 },
      tier2: { min: 12, max: 47, price: 182.0 },
      tier3: { min: 48, price: 159.0 },
    },
    moq: 6,
    selectedQty: 0,
  },
];

const INITIAL_STATE: WholesaleState = {
  accountCreditLimit: 250000,
  accountCreditUsed: 67550,
  activeAccount: "Metro Hardware Distributors",
  products: INITIAL_PRODUCTS,
  quotations: [
    {
      quoteId: "QT-7712-B2B",
      client: "Metro Hardware Distributors",
      createdDate: "2025-05-02",
      expiryDate: "2025-05-09",
      totalUnits: 480,
      totalAmount: 22400,
      status: "Active Price Lock",
    },
  ],
  waybills: [
    {
      bolNumber: "BOL-99412-CH",
      carrier: "Old Dominion Freight Line",
      pallets: 8,
      weightLbs: 3840,
      status: "In Transit",
      origin: "Central Hub Gary",
      destination: "Metro DC #4 Dock A",
      eta: "Tomorrow 08:30 AM",
    },
    {
      bolNumber: "BOL-88204-KC",
      carrier: "Estes Express Lines",
      pallets: 14,
      weightLbs: 6120,
      status: "Dock Loaded",
      origin: "Gary Logistics Hub",
      destination: "South Bend Distribution Gate 12",
      eta: "Gate Out Pending",
    },
  ],
  submittedOrders: [
    {
      poNumber: "PO-2024-8839",
      date: "2025-04-28",
      itemsCount: 8,
      unitsCount: 420,
      totalAmount: 31400,
      status: "Dispatched (BOL-99412)",
    },
  ],
  activeTab: "matrix",
};

function fmtNum(n: number): string {
  return Number(n || 0).toLocaleString("en-US");
}

export function VanguardWholesaleApp({
  product,
  definition,
}: {
  product?: DemoProductDefinition;
  definition?: DemoProductDefinition;
}) {
  const [notification, setNotification] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterInStockOnly, setFilterInStockOnly] = useState(true);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "liftgate" | "expedited">(
    "standard"
  );

  const { state, setState, resetState } = useDemoState<WholesaleState>(
    "vanguard-wholesale-distribution",
    INITIAL_STATE
  );

  const activeTab = state.activeTab || "matrix";
  const setActiveTab = (tab: string) => {
    setState((prev) => ({ ...prev, activeTab: tab }));
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Helper to compute item unit price based on active tiered volume
  const getUnitPrice = (p: WholesaleProduct, qty: number) => {
    if (qty <= 0) return p.tierPrices.tier1.price;
    if (qty >= p.tierPrices.tier3.min) return p.tierPrices.tier3.price;
    if (qty >= p.tierPrices.tier2.min) return p.tierPrices.tier2.price;
    return p.tierPrices.tier1.price;
  };

  // Order summary calculations
  const orderSummary = useMemo(() => {
    let lineItemsCount = 0;
    let totalUnits = 0;
    let itemsSubtotal = 0;

    state.products.forEach((p) => {
      if (p.selectedQty > 0) {
        lineItemsCount += 1;
        totalUnits += p.selectedQty;
        const unitPrice = getUnitPrice(p, p.selectedQty);
        itemsSubtotal += unitPrice * p.selectedQty;
      }
    });

    const palletDunnageFee = lineItemsCount > 0 ? 320 : 0;
    const freightFee =
      lineItemsCount > 0 ? (shippingMethod === "liftgate" ? 540 : 420) : 0;
    const totalOrderEstimate = itemsSubtotal + palletDunnageFee + freightFee;

    const availableCredit = state.accountCreditLimit - state.accountCreditUsed;
    const remainingCredit = availableCredit - totalOrderEstimate;

    return {
      lineItemsCount,
      totalUnits,
      itemsSubtotal,
      palletDunnageFee,
      freightFee,
      totalOrderEstimate,
      availableCredit,
      remainingCredit,
    };
  }, [state.products, state.accountCreditLimit, state.accountCreditUsed, shippingMethod]);

  const handleUpdateQty = (productId: string, newQty: number) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === productId ? { ...p, selectedQty: Math.max(0, newQty) } : p
      ),
    }));
  };

  const handleSubmitWholesalePo = () => {
    if (orderSummary.lineItemsCount === 0) {
      showToast("Cannot submit empty purchase order. Add items from matrix.");
      return;
    }

    if (orderSummary.remainingCredit < 0) {
      showToast("Credit limit exceeded! Request credit facility increase or reduce volume.");
      return;
    }

    const newPoNumber = `PO-2024-${Math.floor(8843 + Math.random() * 100)}`;
    const newRecord = {
      poNumber: newPoNumber,
      date: new Date().toISOString().split("T")[0],
      itemsCount: orderSummary.lineItemsCount,
      unitsCount: orderSummary.totalUnits,
      totalAmount: orderSummary.totalOrderEstimate,
      status: "Transmitted via EDI 850 • Net-60 Authorized",
    };

    setState((prev) => ({
      ...prev,
      accountCreditUsed: prev.accountCreditUsed + orderSummary.totalOrderEstimate,
      products: prev.products.map((p) => ({ ...p, selectedQty: 0 })),
      submittedOrders: [newRecord, ...prev.submittedOrders],
    }));

    showToast(`Wholesale ${newPoNumber} submitted! EDI 850 transmitted to Central Warehouse.`);
  };

  const handleRequestPriceLock = () => {
    const quoteId = `QT-${Math.floor(7713 + Math.random() * 100)}-B2B`;
    const newQuote: Quotation = {
      quoteId,
      client: state.activeAccount,
      createdDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      totalUnits: orderSummary.totalUnits || 250,
      totalAmount: orderSummary.totalOrderEstimate || 18450,
      status: "Active Price Lock",
    };

    setState((prev) => ({
      ...prev,
      quotations: [newQuote, ...prev.quotations],
    }));

    showToast(`Formal 7-Day Price Lock generated: ${quoteId}`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#0B1C30] font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Toast Alert */}
      {notification && (
        <div className="bg-[#1E3A8A] text-white px-4 py-2.5 text-center text-xs font-mono tracking-wide shadow-lg flex items-center justify-center gap-2 sticky top-0 z-50 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          {notification}
        </div>
      )}

      {/* Top Enterprise Header */}
      <header className="border-b border-[#DCE9FF] bg-[#0F172A] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3">
            {/* Brand Logo & Platform */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-black text-base tracking-tight">Vanguard Wholesale</h1>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded">
                    ENTERPRISE LOGISTICS &amp; DISTRIBUTION OS
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">B2B Procurement Matrix • Multi-Warehouse Freight Grid</p>
              </div>
            </div>

            {/* Buyer Account Card & Credit Line */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="p-2 px-3 rounded-lg bg-slate-800 border border-slate-700 flex items-center gap-3">
                <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    {state.activeAccount}
                    <span className="px-1.5 py-0.2 text-[9px] bg-blue-900 text-blue-200 rounded font-mono">
                      PLATINUM TIER-1
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-300">
                    Net-60 Facility: ${fmtNum(state.accountCreditLimit)} | Available:{" "}
                    <span className="text-emerald-400 font-bold">
                      ${fmtNum(orderSummary.availableCredit)}
                    </span>
                  </div>
                </div>
              </div>

              {/* EDI Status & Reset State */}
              <div className="hidden sm:flex items-center gap-2">
                <span className="px-2.5 py-1 text-[11px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  EDI 850 Active
                </span>
                <button
                  onClick={resetState}
                  title="Reset Demo State"
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="border-t border-slate-800 bg-[#0A101D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2 py-2">
            <nav className="flex items-center gap-1 overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => setActiveTab("matrix")}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === "matrix" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                Bulk Procurement Matrix
              </button>
              <button
                onClick={() => setActiveTab("quotes")}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === "quotes" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                Formal Quotation Builder ({state.quotations.length})
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === "orders" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                Sales &amp; Purchase Orders ({state.submittedOrders.length})
              </button>
              <button
                onClick={() => setActiveTab("freight")}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === "freight" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                Warehouse Dispatch &amp; Freight ({state.waybills.length})
              </button>
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSubmitWholesalePo}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded shadow transition-colors flex items-center gap-1.5"
              >
                Submit PO (${fmtNum(orderSummary.availableCredit)} Avail)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 space-y-6">
        {/* KPI Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#DCE9FF] shadow-sm">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Catalog Inventory Value
            </div>
            <div className="text-xl font-black text-[#0B1C30] mt-1">$4,892,100.00</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">5 Warehouses Live</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#DCE9FF] shadow-sm">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Avg Fulfillment Velocity
            </div>
            <div className="text-xl font-black text-blue-600 mt-1">2.4 Business Days</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Dock-to-Gate Crossdock</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#DCE9FF] shadow-sm">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Active Tier Volume Rebate
            </div>
            <div className="text-xl font-black text-indigo-600 mt-1">Tier 2 (-15.2% Avg)</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Platinum Customer Discount</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#DCE9FF] shadow-sm">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              LTL Freight Carrier SLA
            </div>
            <div className="text-xl font-black text-emerald-600 mt-1">99.1% On-Time</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Zero Lost Pallets (Q2)</div>
          </div>
        </div>

        {/* 2-Column Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Area: Tabs (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* TAB 1: BULK PROCUREMENT MATRIX */}
            {activeTab === "matrix" && (
              <div className="bg-white rounded-2xl border border-[#DCE9FF] shadow-sm overflow-hidden">
                <div className="p-4 border-b border-[#DCE9FF] flex flex-wrap items-center justify-between gap-3 bg-[#F8FAFC]">
                  <div>
                    <h3 className="font-bold text-sm text-[#0B1C30]">
                      BULK PROCUREMENT MATRIX (STANDARD WHOLESALE PACK RATES)
                    </h3>
                    <p className="text-xs text-slate-500">Live DC Feed: Synced with ERP WMS</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setState((prev) => ({
                          ...prev,
                          products: prev.products.map((p) => ({ ...p, selectedQty: p.moq })),
                        }));
                        showToast("Applied MOQ to all items.");
                      }}
                      className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-300 text-slate-700 rounded hover:bg-slate-50"
                    >
                      Fill MOQ Minimums
                    </button>
                    <button
                      onClick={() => {
                        setState((prev) => ({
                          ...prev,
                          products: prev.products.map((p) => ({ ...p, selectedQty: 0 })),
                        }));
                        showToast("Cleared quantities.");
                      }}
                      className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-300 text-rose-600 rounded hover:bg-rose-50"
                    >
                      Reset Draft
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#EFF4FF] text-slate-600 uppercase text-[10px] font-bold tracking-wider">
                      <tr>
                        <th className="py-3 px-3">SKU &amp; ID</th>
                        <th className="py-3 px-3">Specification</th>
                        <th className="py-3 px-3">Master Pack</th>
                        <th className="py-3 px-3">In-Stock DC Buffers</th>
                        <th className="py-3 px-3 text-center">Tiered Pricing</th>
                        <th className="py-3 px-3 text-center">MOQ</th>
                        <th className="py-3 px-3 text-center">Order Qty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5EEFF]">
                      {state.products.map((p) => {
                        const unitPrice = getUnitPrice(p, p.selectedQty);
                        const isMoqMet = p.selectedQty === 0 || p.selectedQty >= p.moq;

                        return (
                          <tr key={p.id} className="hover:bg-[#F8F9FF] transition-colors">
                            <td className="py-3 px-3 font-mono">
                              <div className="font-bold text-blue-700">{p.sku}</div>
                              <div className="text-[10px] text-slate-400">UPC: {p.upc}</div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="font-semibold text-[#0B1C30] max-w-[180px] leading-tight">
                                {p.title}
                              </div>
                              <div className="text-[10px] text-slate-500 mt-0.5">{p.specs}</div>
                            </td>
                            <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                              {p.masterPack}
                            </td>
                            <td className="py-3 px-3">
                              <div className="font-bold text-emerald-700">
                                {p.inStockPallets} Pallets ({fmtNum(p.inStockUnits)} Units)
                              </div>
                              <div className="text-[10px] text-slate-400">{p.hubLocation}</div>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <div className="flex items-center justify-center gap-1 font-mono text-[11px]">
                                <span className={`px-1.5 py-0.5 rounded border ${
                                  p.selectedQty < p.tierPrices.tier2.min
                                    ? "bg-blue-100 font-bold border-blue-300 text-blue-900"
                                    : "bg-slate-50 text-slate-500 border-slate-200"
                                }`}>
                                  ${p.tierPrices.tier1.price}
                                </span>
                                <span className={`px-1.5 py-0.5 rounded border ${
                                  p.selectedQty >= p.tierPrices.tier2.min && p.selectedQty < p.tierPrices.tier3.min
                                    ? "bg-blue-600 text-white font-bold border-blue-700"
                                    : "bg-slate-50 text-slate-500 border-slate-200"
                                }`}>
                                  ${p.tierPrices.tier2.price}
                                </span>
                                <span className={`px-1.5 py-0.5 rounded border ${
                                  p.selectedQty >= p.tierPrices.tier3.min
                                    ? "bg-emerald-600 text-white font-bold border-emerald-700"
                                    : "bg-slate-50 text-slate-500 border-slate-200"
                                }`}>
                                  ${p.tierPrices.tier3.price}
                                </span>
                              </div>
                              <div className="text-[9px] text-slate-400 mt-1">
                                {p.selectedQty > 0 ? `Active: $${unitPrice.toFixed(2)}/unit` : "Tiers: 1-49 | 50-249 | 250+"}
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                isMoqMet
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-amber-50 text-amber-800 border border-amber-200"
                              }`}>
                                MOQ: {p.moq} {isMoqMet && p.selectedQty > 0 ? "(Met)" : ""}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <div className="flex items-center justify-center border border-slate-300 rounded-lg overflow-hidden bg-white max-w-[110px] mx-auto">
                                <button
                                  onClick={() => handleUpdateQty(p.id, p.selectedQty - 10)}
                                  className="px-2 py-1 text-slate-500 hover:bg-slate-100 font-bold"
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  value={p.selectedQty}
                                  onChange={(e) => handleUpdateQty(p.id, Number(e.target.value) || 0)}
                                  className="w-12 text-center text-xs font-mono font-bold text-[#0B1C30] focus:outline-none"
                                />
                                <button
                                  onClick={() => handleUpdateQty(p.id, p.selectedQty + 10)}
                                  className="px-2 py-1 text-slate-500 hover:bg-slate-100 font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: QUOTATIONS */}
            {activeTab === "quotes" && (
              <div className="bg-white rounded-2xl border border-[#DCE9FF] p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-[#DCE9FF] pb-4">
                  <div>
                    <h3 className="font-bold text-base text-[#0B1C30]">Formal Quotation Builder</h3>
                    <p className="text-xs text-slate-500">
                      Generate 7-day binding wholesale price lock quotes for institutional client procurement.
                    </p>
                  </div>
                  <button
                    onClick={handleRequestPriceLock}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all"
                  >
                    Generate Price Lock Quote
                  </button>
                </div>

                <div className="space-y-3">
                  {state.quotations.map((q) => (
                    <div
                      key={q.quoteId}
                      className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#0B1C30]">{q.quoteId}</span>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] font-bold">
                            {q.status}
                          </span>
                        </div>
                        <p className="text-slate-600 mt-1">
                          Client: <span className="font-semibold">{q.client}</span> • Valid through:{" "}
                          <span className="font-mono text-emerald-700 font-bold">{q.expiryDate}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-mono font-black text-sm text-[#0B1C30]">
                            ${fmtNum(q.totalAmount)}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {q.totalUnits} Units Secured
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            showToast(`Converted quotation ${q.quoteId} into live Purchase Order!`);
                            setState((prev) => ({
                              ...prev,
                              quotations: prev.quotations.map((x) =>
                                x.quoteId === q.quoteId ? { ...x, status: "Converted to PO" } : x
                              ),
                            }));
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
                        >
                          Execute PO
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: SALES & PURCHASE ORDERS */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl border border-[#DCE9FF] p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-bold text-base text-[#0B1C30]">Institutional Purchase Orders</h3>
                  <p className="text-xs text-slate-500">
                    Transmitted EDI 850 orders bound by Net-60 institutional credit terms.
                  </p>
                </div>

                <div className="border border-[#DCE9FF] rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] text-slate-600 font-semibold border-b border-[#DCE9FF]">
                      <tr>
                        <th className="py-2.5 px-3">PO Number</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3 text-center">Items / Units</th>
                        <th className="py-2.5 px-3 text-right">PO Total</th>
                        <th className="py-2.5 px-3 text-center">Fulfillment Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5EEFF]">
                      {state.submittedOrders.map((ord) => (
                        <tr key={ord.poNumber} className="hover:bg-[#F8F9FF]">
                          <td className="py-3 px-3 font-mono font-bold text-blue-700">{ord.poNumber}</td>
                          <td className="py-3 px-3 text-slate-500">{ord.date}</td>
                          <td className="py-3 px-3 text-center font-mono">
                            {ord.itemsCount} lines ({ord.unitsCount} units)
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-black text-[#0B1C30]">
                            ${fmtNum(ord.totalAmount)}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: FREIGHT & WAYBILLS */}
            {activeTab === "freight" && (
              <div className="bg-white rounded-2xl border border-[#DCE9FF] p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-bold text-base text-[#0B1C30]">
                    Active Outbound Freight Waybills (EDI 214 Live Telemetry)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Real-time carrier GPS, bill of lading (BOL) seals, and dock delivery status.
                  </p>
                </div>

                <div className="space-y-4">
                  {state.waybills.map((wb) => (
                    <div
                      key={wb.bolNumber}
                      className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#0B1C30]">{wb.bolNumber}</span>
                          <span className="text-xs text-slate-500">• Carrier: {wb.carrier}</span>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] font-bold">
                            {wb.status}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-semibold text-slate-700">
                          {wb.pallets} Pallets ({fmtNum(wb.weightLbs)} lbs)
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200 text-slate-600">
                        <div>
                          <span className="text-slate-400">Origin:</span> {wb.origin}
                        </div>
                        <div>
                          <span className="text-slate-400">Destination:</span> {wb.destination}
                        </div>
                        <div>
                          <span className="text-slate-400">ETA / Schedule:</span>{" "}
                          <span className="font-bold text-emerald-600">{wb.eta}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Active Procurement Draft Drawer (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-[#DCE9FF] p-5 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE9FF]">
                <div>
                  <h3 className="font-bold text-sm text-[#0B1C30]">PO-2024-8842</h3>
                  <p className="text-[11px] text-slate-500">Net-60 Facility Credit • Draft</p>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                  READY
                </span>
              </div>

              {/* Net-60 Credit Facility Gauge */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>NET-60 CREDIT FACILITY GAUGE</span>
                  <span className="text-emerald-600">APPROVED</span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Approved Facility Limit:</span>
                    <span className="font-mono font-bold text-[#0B1C30]">
                      ${fmtNum(state.accountCreditLimit)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Current Available Credit:</span>
                    <span className="font-mono font-bold text-blue-700">
                      ${fmtNum(orderSummary.availableCredit)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>This Order PO Est:</span>
                    <span className="font-mono font-bold text-rose-600">
                      -${fmtNum(orderSummary.totalOrderEstimate)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-bold pt-1 border-t border-slate-200">
                    <span>Remaining Facility Buffer:</span>
                    <span className="font-mono text-emerald-700 font-black">
                      ${fmtNum(orderSummary.remainingCredit)}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{
                      width: `${Math.max(
                        0,
                        Math.min(100, (orderSummary.remainingCredit / state.accountCreditLimit) * 100)
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Freight & Carrier SLA Method */}
              <div className="space-y-2 text-xs">
                <label className="block font-bold text-slate-700">FREIGHT &amp; CARRIER SLA METHOD</label>
                <div className="p-3 bg-[#F8FAFC] border border-slate-200 rounded-xl space-y-2">
                  <div className="font-semibold text-slate-800">Destination Facility:</div>
                  <div className="text-[11px] text-slate-500">
                    Metro Distribution Ctr #4 (4900 Industrial Pkwy, Gary, IN 46402)
                  </div>

                  <div className="pt-2">
                    <label className="block text-[10px] text-slate-500 font-semibold mb-1">
                      Service Level Agreement (SLA)
                    </label>
                    <select
                      value={shippingMethod}
                      onChange={(e) => setShippingMethod(e.target.value as any)}
                      className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs font-medium focus:outline-none"
                    >
                      <option value="standard">Dock-to-Dock (Standard LTL - $420.00)</option>
                      <option value="liftgate">Liftgate Commercial Delivery ($540.00)</option>
                      <option value="expedited">Expedited Dedicated Hotshot ($980.00)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Valuation Ledger Breakdown */}
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2 text-xs">
                <div className="font-bold text-blue-950 uppercase text-[10px] tracking-wider">
                  Wholesale Valuation Ledger
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Line Items ({orderSummary.lineItemsCount} items / {orderSummary.totalUnits} units):</span>
                  <span className="font-mono font-bold text-[#0B1C30]">
                    ${orderSummary.itemsSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Pallet Crating &amp; Dunnage Fee:</span>
                  <span className="font-mono">${orderSummary.palletDunnageFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>LTL Freight SLA:</span>
                  <span className="font-mono">${orderSummary.freightFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax Exemption (EX-IN-994821):</span>
                  <span className="font-mono text-emerald-700 font-bold">$0.00 (Exempt)</span>
                </div>
                <div className="border-t border-blue-200 pt-2 flex justify-between text-sm font-black text-blue-950">
                  <span>TOTAL WHOLESALE PO:</span>
                  <span className="font-mono font-black">
                    ${orderSummary.totalOrderEstimate.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleSubmitWholesalePo}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Submit Wholesale PO
                </button>

                <button
                  onClick={handleRequestPriceLock}
                  className="w-full py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl transition-all"
                >
                  Request Formal Price Lock (7 Days)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#DCE9FF] bg-white py-3 text-xs text-slate-500 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span>Vanguard Wholesale &amp; Distribution OS © 2025</span>
            <span>•</span>
            <span>EDI 850 / EDI 214 Real-Time Integration</span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">ERP Connection: Active</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => showToast("Exported wholesale price list as CSV/Excel.")}
              className="hover:text-blue-600"
            >
              Export Price List (CSV)
            </button>
            <span>•</span>
            <button
              onClick={() => showToast("Opened WMS warehouse slotting map.")}
              className="hover:text-blue-600"
            >
              WMS Slotting Map
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default VanguardWholesaleApp;
