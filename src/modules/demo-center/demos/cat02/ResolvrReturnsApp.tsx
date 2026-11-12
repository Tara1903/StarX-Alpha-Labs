"use client";

import React, { useState, useMemo } from "react";
import { useDemoState } from "../../state/useDemoState";

// Invariant locale formatting helper
const fmtNum = (n: number | string) => Number(n || 0).toLocaleString("en-US");

interface RmaItem {
  id: string;
  rmaId: string;
  orderRef: string;
  customerName: string;
  customerTier: "VIP" | "GOLD" | "STD";
  itemTitle: string;
  sku: string;
  colorOrVariant: string;
  reason: "Defective Audio" | "Fit / Too Small" | "Late Delivery" | "Changed Mind" | "Wrong Variant" | "Defective Power";
  status: "Pending Review" | "Inspecting" | "Exchange Pending" | "Label Generated" | "Refunded" | "Approved";
  price: number;
  statement: string;
  firmwareVerified: boolean;
  restockGrade: "Grade A" | "Grade B" | "Grade C";
  refundType: "original" | "credit";
  carrierTracking?: string;
  refundedAmount?: number;
}

interface OrderRecord {
  orderId: string;
  date: string;
  customer: string;
  itemsSummary: string;
  totalAmount: number;
  paymentStatus: "Paid / Captured" | "Authorized" | "Partially Refunded";
  fulfillmentStatus: "Delivered" | "In Transit" | "Processing" | "Return In Progress";
  carrier: string;
  trackingNumber: string;
}

interface ExchangeRecord {
  exchangeId: string;
  originalRma: string;
  customer: string;
  originalItem: string;
  replacementItem: string;
  status: "Dispatch Queued" | "Shipped" | "Completed";
  costDelta: number;
  tracking: string;
}

interface CommunicationLog {
  id: string;
  timestamp: string;
  recipient: string;
  channel: "Email" | "SMS" | "Portal Notification";
  subject: string;
  preview: string;
}

const INITIAL_RMAS: RmaItem[] = [
  {
    id: "rma-1",
    rmaId: "RMA-9402",
    orderRef: "#ORD-88219",
    customerName: "Elena Rostova",
    customerTier: "VIP",
    itemTitle: "AeroPulse ANC Wireless Headphones",
    sku: "AP-ANC-01",
    colorOrVariant: "Midnight Black",
    reason: "Defective Audio",
    status: "Pending Review",
    price: 179.99,
    statement: "The right ear cup makes a persistent crackling sound at volume > 60% after 2 days of usage. Original box and cable included.",
    firmwareVerified: true,
    restockGrade: "Grade B",
    refundType: "credit",
  },
  {
    id: "rma-2",
    rmaId: "RMA-9401",
    orderRef: "#ORD-88194",
    customerName: "David Chen",
    customerTier: "STD",
    itemTitle: "Titanium Chrono Watch v2",
    sku: "TC-44-SLV",
    colorOrVariant: "44mm Steel Mesh",
    reason: "Fit / Too Small",
    status: "Inspecting",
    price: 245.0,
    statement: "Band is slightly too tight on wrist. Looking to exchange for 46mm link bracelet or store credit.",
    firmwareVerified: false,
    restockGrade: "Grade A",
    refundType: "original",
  },
  {
    id: "rma-3",
    rmaId: "RMA-9398",
    orderRef: "#ORD-88180",
    customerName: "Sarah Jenkins",
    customerTier: "GOLD",
    itemTitle: "ErgoFlex Lumbar Desk Chair",
    sku: "EF-CH-GRY",
    colorOrVariant: "Full Assembly Mesh",
    reason: "Late Delivery",
    status: "Exchange Pending",
    price: 420.0,
    statement: "Arrived past scheduled client move-in date. Need expedited replacement caster kit.",
    firmwareVerified: false,
    restockGrade: "Grade A",
    refundType: "credit",
  },
  {
    id: "rma-4",
    rmaId: "RMA-9395",
    orderRef: "#ORD-88162",
    customerName: "Marcus Sterling",
    customerTier: "STD",
    itemTitle: "UltraWide 34\" Curved OLED",
    sku: "MO-34-CRV",
    colorOrVariant: "175Hz Display",
    reason: "Changed Mind",
    status: "Label Generated",
    price: 799.0,
    statement: "Desk workspace smaller than anticipated. Box unopened with factory seal intact.",
    firmwareVerified: true,
    restockGrade: "Grade A",
    refundType: "original",
    carrierTracking: "1Z-992-884-UPS",
  },
  {
    id: "rma-5",
    rmaId: "RMA-9391",
    orderRef: "#ORD-88155",
    customerName: "Amira Patel",
    customerTier: "VIP",
    itemTitle: "ProStudio Soundbar & Wireless Sub",
    sku: "SB-PRO-51",
    colorOrVariant: "Dolby Atmos Black",
    reason: "Defective Power",
    status: "Pending Review",
    price: 349.5,
    statement: "Subwoofer fails to pair after firmware update 2.1.4. LED indicator pulses red.",
    firmwareVerified: true,
    restockGrade: "Grade B",
    refundType: "credit",
  },
  {
    id: "rma-6",
    rmaId: "RMA-9388",
    orderRef: "#ORD-88132",
    customerName: "Liam O'Connor",
    customerTier: "GOLD",
    itemTitle: "Mach-1 Mechanical Keyboard",
    sku: "KB-M1-BRN",
    colorOrVariant: "Hot-Swap Brown",
    reason: "Wrong Variant",
    status: "Refunded",
    price: 135.0,
    statement: "Received blue clicky switches instead of silent brown. Returned in original sleeve.",
    firmwareVerified: false,
    restockGrade: "Grade A",
    refundType: "original",
    refundedAmount: 135.0,
  },
];

const INITIAL_ORDERS: OrderRecord[] = [
  {
    orderId: "#ORD-88219",
    date: "2026-11-10",
    customer: "Elena Rostova",
    itemsSummary: "AeroPulse ANC Headphones (Midnight Black)",
    totalAmount: 179.99,
    paymentStatus: "Paid / Captured",
    fulfillmentStatus: "Return In Progress",
    carrier: "UPS Express",
    trackingNumber: "1Z-889-102-441",
  },
  {
    orderId: "#ORD-88194",
    date: "2026-11-09",
    customer: "David Chen",
    itemsSummary: "Titanium Chrono Watch v2",
    totalAmount: 245.0,
    paymentStatus: "Paid / Captured",
    fulfillmentStatus: "Return In Progress",
    carrier: "FedEx Priority",
    trackingNumber: "781-992-004-12",
  },
  {
    orderId: "#ORD-88180",
    date: "2026-11-08",
    customer: "Sarah Jenkins",
    itemsSummary: "ErgoFlex Lumbar Desk Chair",
    totalAmount: 420.0,
    paymentStatus: "Paid / Captured",
    fulfillmentStatus: "Return In Progress",
    carrier: "FreightDirect LTL",
    trackingNumber: "FD-881-9042",
  },
  {
    orderId: "#ORD-88230",
    date: "2026-11-12",
    customer: "Jonathan Blake",
    itemsSummary: "Carbon Aero Road Helmet (L)",
    totalAmount: 189.0,
    paymentStatus: "Paid / Captured",
    fulfillmentStatus: "Delivered",
    carrier: "USPS Priority",
    trackingNumber: "9400-1118-9921",
  },
];

const INITIAL_EXCHANGES: ExchangeRecord[] = [
  {
    exchangeId: "EXC-9904",
    originalRma: "RMA-9398",
    customer: "Sarah Jenkins",
    originalItem: "ErgoFlex Chair (Standard Caster)",
    replacementItem: "ErgoFlex Chair (Hardwood Roller Blade Casters)",
    status: "Dispatch Queued",
    costDelta: 0.0,
    tracking: "1Z-EXC-4491-UPS",
  },
  {
    exchangeId: "EXC-9903",
    originalRma: "RMA-9380",
    customer: "Michael Wong",
    originalItem: "Merino Wool Thermal Zip (Medium)",
    replacementItem: "Merino Wool Thermal Zip (Large)",
    status: "Shipped",
    costDelta: 0.0,
    tracking: "782-990-112-FX",
  },
];

const INITIAL_COMMS: CommunicationLog[] = [
  {
    id: "comm-1",
    timestamp: "2026-11-12 18:40",
    recipient: "Elena Rostova (elena.rostova@vip.io)",
    channel: "Email",
    subject: "ResolvR Support: Return Request RMA-9402 Received",
    preview: "Your return request for AeroPulse ANC Headphones is under active review. Our VIP concierge team is evaluating your diagnostic telemetry.",
  },
  {
    id: "comm-2",
    timestamp: "2026-11-12 17:15",
    recipient: "Marcus Sterling (+1 312-555-0199)",
    channel: "SMS",
    subject: "Prepaid Return QR Code Ready",
    preview: "ResolvR: Your prepaid UPS return label is ready. Scan QR code at any UPS Store or print from link.",
  },
  {
    id: "comm-3",
    timestamp: "2026-11-12 14:02",
    recipient: "Liam O'Connor (liam.oc@outlook.com)",
    channel: "Email",
    subject: "Refund Issued for Order #ORD-88132",
    preview: "Success! We have processed a full refund of $135.00 to your original Mastercard ending in 8802.",
  },
];

interface DemoReturnsState {
  activeTab: "rma" | "orders" | "workbench" | "exchanges" | "labels" | "comms";
  rmas: RmaItem[];
  orders: OrderRecord[];
  exchanges: ExchangeRecord[];
  comms: CommunicationLog[];
  selectedRmaId: string;
  statusFilter: string;
}

const DEFAULT_STATE: DemoReturnsState = {
  activeTab: "rma",
  rmas: INITIAL_RMAS,
  orders: INITIAL_ORDERS,
  exchanges: INITIAL_EXCHANGES,
  comms: INITIAL_COMMS,
  selectedRmaId: "rma-1",
  statusFilter: "ALL",
};

export function ResolvrReturnsApp({ product }: { product?: any } = {}) {
  const { state, setState, resetState } = useDemoState<DemoReturnsState>(
    "resolvr-order-returns",
    DEFAULT_STATE
  );

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Selected RMA for workbench
  const activeRma = useMemo(() => {
    return state.rmas.find((r) => r.id === state.selectedRmaId) || state.rmas[0];
  }, [state.rmas, state.selectedRmaId]);

  // Restock Fee Calculation based on condition grade
  const restockFeePercent = useMemo(() => {
    if (activeRma.restockGrade === "Grade A") return 0.0;
    if (activeRma.restockGrade === "Grade B") return 0.1; // 10%
    return 0.25; // 25% for salvage/scrap
  }, [activeRma.restockGrade]);

  const originalRefundAmount = useMemo(() => {
    const fee = activeRma.price * restockFeePercent;
    return Math.max(0, activeRma.price - fee);
  }, [activeRma.price, restockFeePercent]);

  const storeCreditAmount = useMemo(() => {
    // Zero deductions + 10% bonus for keeping money in store
    return activeRma.price * 1.1;
  }, [activeRma.price]);

  // Filtered RMAs
  const filteredRmas = useMemo(() => {
    if (state.statusFilter === "ALL") return state.rmas;
    return state.rmas.filter((r) => r.status === state.statusFilter);
  }, [state.rmas, state.statusFilter]);

  // Action: Approve & Send Label
  const handleApproveAndSendLabel = () => {
    const trackingCode = `1Z-${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-UPS`;
    const updatedRmas = state.rmas.map((r) => {
      if (r.id === activeRma.id) {
        return {
          ...r,
          status: "Approved" as const,
          carrierTracking: trackingCode,
        };
      }
      return r;
    });

    const newComm: CommunicationLog = {
      id: `comm-${Date.now()}`,
      timestamp: "Just now",
      recipient: `${activeRma.customerName} (VIP Channel)`,
      channel: "Email",
      subject: `Return Approved: Prepaid Shipping Label for ${activeRma.rmaId}`,
      preview: `Prepaid label generated with tracking ${trackingCode}. Drop off package at any UPS location.`,
    };

    setState((prev) => ({
      ...prev,
      rmas: updatedRmas,
      comms: [newComm, ...prev.comms],
    }));

    showToast(`Approved ${activeRma.rmaId}! Prepaid carrier label generated (${trackingCode}).`);
  };

  // Action: Refund Instantly
  const handleRefundInstantly = () => {
    const amount = activeRma.refundType === "credit" ? storeCreditAmount : originalRefundAmount;
    const methodDesc = activeRma.refundType === "credit" ? "Store Credit (+10% Bonus)" : "Original Visa Card";

    const updatedRmas = state.rmas.map((r) => {
      if (r.id === activeRma.id) {
        return {
          ...r,
          status: "Refunded" as const,
          refundedAmount: amount,
        };
      }
      return r;
    });

    const newComm: CommunicationLog = {
      id: `comm-${Date.now()}`,
      timestamp: "Just now",
      recipient: `${activeRma.customerName}`,
      channel: "Email",
      subject: `Refund Processed for ${activeRma.rmaId} ($${fmtNum(amount)})`,
      preview: `We have successfully credited $${fmtNum(amount)} via ${methodDesc}. Thank you for shopping with us.`,
    };

    setState((prev) => ({
      ...prev,
      rmas: updatedRmas,
      comms: [newComm, ...prev.comms],
    }));

    showToast(`Refund of $${fmtNum(amount)} successfully issued via ${methodDesc}!`);
  };

  // Action: Create Zero Cost Exchange
  const handleCreateExchange = () => {
    const newExchange: ExchangeRecord = {
      exchangeId: `EXC-${Math.floor(1000 + Math.random() * 9000)}`,
      originalRma: activeRma.rmaId,
      customer: activeRma.customerName,
      originalItem: `${activeRma.itemTitle} (${activeRma.colorOrVariant})`,
      replacementItem: `${activeRma.itemTitle} (Replacement Certified)`,
      status: "Dispatch Queued",
      costDelta: 0.0,
      tracking: "1Z-EXC-LIVE-UPS",
    };

    const updatedRmas = state.rmas.map((r) => {
      if (r.id === activeRma.id) {
        return {
          ...r,
          status: "Exchange Pending" as const,
        };
      }
      return r;
    });

    setState((prev) => ({
      ...prev,
      rmas: updatedRmas,
      exchanges: [newExchange, ...prev.exchanges],
    }));

    showToast(`Created Zero-Cost Exchange Order ${newExchange.exchangeId}! Dispatch queued.`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#0B1C30] font-sans selection:bg-indigo-600 selection:text-white flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 bg-[#4F46E5] text-white rounded-xl shadow-2xl border border-indigo-400 text-xs font-semibold flex items-center gap-2 animate-bounce">
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
      <header className="border-b border-[#DCE9FF] bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Node */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center font-black text-white text-base shadow-lg shadow-indigo-500/20">
                R
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base tracking-tight text-[#0B1C30]">ResolvR</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                    OS v4.2
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  WH-East Node 04 • Reverse Logistics Hub
                </div>
              </div>
            </div>

            {/* Omnisearch Bar */}
            <div className="hidden sm:flex items-center gap-2 bg-[#F1F5F9] px-3 py-1.5 rounded-xl border border-slate-200 w-64">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Omni-search RMA, Order, Barcode..."
                className="bg-transparent text-xs text-slate-700 focus:outline-none w-full"
              />
              <span className="text-[9px] font-mono bg-white border border-slate-300 px-1 rounded text-slate-400">
                ⌘K
              </span>
            </div>
          </div>

          {/* Operational Metrics Bar */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[10px] text-slate-500">RETURN RATE</span>
              <span className="text-emerald-600 font-bold">
                4.2% <span className="text-[10px] text-emerald-500 font-normal">↘-0.4%</span>
              </span>
            </div>

            <div className="hidden lg:flex flex-col text-right">
              <span className="text-[10px] text-slate-500">RMA RESOLUTION SLA</span>
              <span className="text-blue-700 font-bold">
                4.8h <span className="text-[10px] text-slate-400 font-normal">(98.4% On-Track)</span>
              </span>
            </div>

            <div className="hidden xl:flex flex-col text-right">
              <span className="text-[10px] text-slate-500">TODAY'S VOLUME</span>
              <span className="text-[#0B1C30] font-bold">
                142 Orders / 12 RMAs
              </span>
            </div>

            {/* Carrier Status */}
            <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Carrier APIs: 100% Online</span>
            </div>

            {/* Quick Button: New Return Request */}
            <button
              onClick={() => {
                showToast("Opened Customer Self-Service Return Portal simulator.");
              }}
              className="px-3 py-1.5 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-500/20 transition-colors flex items-center gap-1.5"
            >
              + New Return Request
            </button>

            {/* Reset State Button */}
            <button
              onClick={() => {
                resetState();
                showToast("Reset ResolvR Order & Returns state to defaults.");
              }}
              title="Reset Demo Data"
              aria-label="Reset Demo Data"
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-black transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-[1600px] mx-auto px-4 flex items-center gap-1 overflow-x-auto border-t border-[#DCE9FF] py-1.5 text-xs font-medium">
          <button
            onClick={() => setState((prev) => ({ ...prev, activeTab: "rma" }))}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              state.activeTab === "rma"
                ? "bg-[#4F46E5] text-white font-bold shadow"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            RMA Return Requests
            <span className="px-1.5 py-0.2 rounded-full bg-indigo-900 text-indigo-100 text-[10px] font-mono">
              {state.rmas.length} Active
            </span>
          </button>

          <button
            onClick={() => setState((prev) => ({ ...prev, activeTab: "orders" }))}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              state.activeTab === "orders"
                ? "bg-[#4F46E5] text-white font-bold shadow"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Unified Order Stream
          </button>

          <button
            onClick={() => setState((prev) => ({ ...prev, activeTab: "workbench" }))}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              state.activeTab === "workbench"
                ? "bg-[#4F46E5] text-white font-bold shadow"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Inspection and Refund Workbench
          </button>

          <button
            onClick={() => setState((prev) => ({ ...prev, activeTab: "exchanges" }))}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              state.activeTab === "exchanges"
                ? "bg-[#4F46E5] text-white font-bold shadow"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Exchange Workflows
            <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold">
              {state.exchanges.length} pending
            </span>
          </button>

          <button
            onClick={() => setState((prev) => ({ ...prev, activeTab: "labels" }))}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              state.activeTab === "labels"
                ? "bg-[#4F46E5] text-white font-bold shadow"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Carrier Return Labels
          </button>

          <button
            onClick={() => setState((prev) => ({ ...prev, activeTab: "comms" }))}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              state.activeTab === "comms"
                ? "bg-[#4F46E5] text-white font-bold shadow"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Customer Communication Timeline
          </button>
        </div>
      </header>

      {/* Main Body Grid */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section (7 Cols on Desktop) */}
        <section className="lg:col-span-7 space-y-6">
          {/* TAB 1: RMA RETURN REQUESTS */}
          {state.activeTab === "rma" && (
            <div className="space-y-4">
              {/* Filter Bar */}
              <div className="bg-white rounded-2xl border border-[#DCE9FF] p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-mono">Status:</span>
                  <select
                    value={state.statusFilter}
                    onChange={(e) => setState((prev) => ({ ...prev, statusFilter: e.target.value }))}
                    className="bg-[#F8F9FF] border border-slate-300 text-xs text-slate-800 rounded-lg px-2.5 py-1 focus:outline-none"
                  >
                    <option value="ALL">All Statuses ({state.rmas.length})</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Inspecting">Inspecting</option>
                    <option value="Approved">Approved</option>
                    <option value="Exchange Pending">Exchange Pending</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      showToast("Batch approved 3 pending RMA claims.");
                    }}
                    className="px-3 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold rounded-lg border border-indigo-200 transition-colors"
                  >
                    ⚡ Bulk Approve (3)
                  </button>
                  <button
                    onClick={() => showToast("Exported RMA queue to CSV format.")}
                    className="px-3 py-1 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg border border-slate-200"
                  >
                    Export CSV
                  </button>
                </div>
              </div>

              {/* RMA Data Table */}
              <div className="bg-white rounded-2xl border border-[#DCE9FF] overflow-hidden shadow-sm">
                <div className="p-4 border-b border-[#DCE9FF] flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#0B1C30]">Active Reverse Logistics & RMA Queue</h3>
                    <p className="text-[11px] text-slate-500">
                      Real-time customer claims, automated diagnosis, and restock routing.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Showing {filteredRmas.length} of {state.rmas.length} records
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                    <thead>
                      <tr className="bg-[#F8F9FF] text-slate-500 border-b border-[#DCE9FF] font-mono text-[11px]">
                        <th className="py-2.5 px-3">RMA ID</th>
                        <th className="py-2.5 px-3">ORDER REF</th>
                        <th className="py-2.5 px-3">CUSTOMER</th>
                        <th className="py-2.5 px-3">ITEM & SKU</th>
                        <th className="py-2.5 px-3">REASON</th>
                        <th className="py-2.5 px-3 text-center">STATUS</th>
                        <th className="py-2.5 px-3 text-center">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {filteredRmas.map((rma) => {
                        const isSelected = rma.id === activeRma.id;

                        return (
                          <tr
                            key={rma.id}
                            className={`hover:bg-[#F1F5F9]/60 transition-colors cursor-pointer ${
                              isSelected ? "bg-indigo-50/70 border-l-4 border-l-[#4F46E5]" : ""
                            }`}
                            onClick={() => setState((prev) => ({ ...prev, selectedRmaId: rma.id }))}
                          >
                            <td className="py-3 px-3 font-mono font-bold text-[#4F46E5]">
                              {rma.rmaId}
                            </td>
                            <td className="py-3 px-3 font-mono text-slate-500">
                              {rma.orderRef}
                            </td>
                            <td className="py-3 px-3">
                              <div className="font-bold text-[#0B1C30] flex items-center gap-1.5">
                                <span>{rma.customerName}</span>
                                <span
                                  className={`px-1 py-0.2 rounded text-[9px] font-mono font-bold ${
                                    rma.customerTier === "VIP"
                                      ? "bg-purple-100 text-purple-800"
                                      : rma.customerTier === "GOLD"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-slate-100 text-slate-600"
                                  }`}
                                >
                                  {rma.customerTier}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="font-semibold text-slate-900">{rma.itemTitle}</div>
                              <div className="text-[10px] text-slate-500 font-mono">
                                SKU: {rma.sku} • {rma.colorOrVariant}
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                  rma.reason.includes("Defective")
                                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                                    : "bg-blue-50 text-blue-700 border border-blue-200"
                                }`}
                              >
                                {rma.reason}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  rma.status === "Approved" || rma.status === "Refunded"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : rma.status === "Pending Review"
                                    ? "bg-amber-50 text-amber-800 border border-amber-200 animate-pulse"
                                    : "bg-slate-100 text-slate-700 border border-slate-200"
                                }`}
                              >
                                {rma.status}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setState((prev) => ({ ...prev, selectedRmaId: rma.id }));
                                }}
                                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-[#4F46E5] font-semibold border border-indigo-200 rounded text-xs transition-colors"
                              >
                                Inspect
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

          {/* TAB 2: UNIFIED ORDER STREAM */}
          {state.activeTab === "orders" && (
            <div className="bg-white rounded-2xl border border-[#DCE9FF] p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#0B1C30]">Unified Order Fulfillment Stream</h3>
                  <p className="text-xs text-slate-500">
                    Cross-channel ecommerce order logs, payment capture verification, and carrier dispatch.
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {state.orders.length} Verified Orders
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                  <thead>
                    <tr className="bg-[#F8F9FF] text-slate-500 border-b border-[#DCE9FF] font-mono text-[11px]">
                      <th className="py-2.5 px-3">ORDER ID</th>
                      <th className="py-2.5 px-3">DATE</th>
                      <th className="py-2.5 px-3">CUSTOMER</th>
                      <th className="py-2.5 px-3">ITEMS</th>
                      <th className="py-2.5 px-3 text-right">TOTAL</th>
                      <th className="py-2.5 px-3 text-center">PAYMENT</th>
                      <th className="py-2.5 px-3 text-center">FULFILLMENT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {state.orders.map((ord) => (
                      <tr key={ord.orderId} className="hover:bg-[#F8F9FF]">
                        <td className="py-3 px-3 font-mono font-bold text-blue-700">{ord.orderId}</td>
                        <td className="py-3 px-3 text-slate-500 font-mono">{ord.date}</td>
                        <td className="py-3 px-3 font-semibold text-slate-800">{ord.customer}</td>
                        <td className="py-3 px-3 text-slate-600">{ord.itemsSummary}</td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-[#0B1C30]">
                          ${fmtNum(ord.totalAmount)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {ord.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              ord.fulfillmentStatus === "Return In Progress"
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : "bg-blue-50 text-blue-800 border border-blue-200"
                            }`}
                          >
                            {ord.fulfillmentStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: WORKBENCH FULL VIEW */}
          {state.activeTab === "workbench" && (
            <div className="bg-white rounded-2xl border border-[#DCE9FF] p-6 space-y-5 shadow-sm">
              <div>
                <h3 className="font-bold text-base text-[#0B1C30]">Returns QA & Diagnostic Workbench</h3>
                <p className="text-xs text-slate-500">
                  Comprehensive testing suite for returned hardware, wireless firmware telemetry, and restock evaluation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-[#4F46E5]">{activeRma.rmaId}</span>
                  <span className="text-xs text-slate-600 font-semibold">{activeRma.itemTitle}</span>
                </div>
                <p className="text-xs text-slate-700 italic bg-white p-3 rounded-lg border border-slate-200">
                  "{activeRma.statement}"
                </p>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">Customer: {activeRma.customerName} ({activeRma.customerTier})</span>
                  <span className="text-emerald-600 font-bold font-mono">
                    Diagnostic Telemetry: {activeRma.firmwareVerified ? "Firmware 2.1.4 Verified" : "Hardware Log Unverified"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EXCHANGE WORKFLOWS */}
          {state.activeTab === "exchanges" && (
            <div className="bg-white rounded-2xl border border-[#DCE9FF] p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#0B1C30]">Zero-Cost Exchange Queue</h3>
                  <p className="text-xs text-slate-500">
                    Automated replacement order generation, cross-shipment authorization, and zero-delta billing.
                  </p>
                </div>
                <button
                  onClick={handleCreateExchange}
                  className="px-3.5 py-1.5 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow"
                >
                  + New Exchange for {activeRma.rmaId}
                </button>
              </div>

              <div className="space-y-3">
                {state.exchanges.map((exc) => (
                  <div key={exc.exchangeId} className="p-4 rounded-xl border border-slate-200 bg-[#F8F9FF] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-sm text-[#4F46E5]">{exc.exchangeId}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                        {exc.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-700">
                      Customer: <span className="font-semibold">{exc.customer}</span> (Linked to {exc.originalRma})
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200 text-slate-600">
                      <div><span className="text-slate-400">Original:</span> {exc.originalItem}</div>
                      <div><span className="text-slate-400">Replacement:</span> <span className="font-bold text-emerald-700">{exc.replacementItem}</span></div>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 pt-1">
                      Tracking: <span className="text-blue-600 font-bold">{exc.tracking}</span> (Zero Billing Delta: $0.00)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CARRIER RETURN LABELS */}
          {state.activeTab === "labels" && (
            <div className="bg-white rounded-2xl border border-[#DCE9FF] p-6 space-y-5 shadow-sm">
              <div>
                <h3 className="font-bold text-base text-[#0B1C30]">Carrier Return Labels & Tracking Telemetry</h3>
                <p className="text-xs text-slate-500">
                  Pre-paid QR codes and barcode manifests for UPS, FedEx, and USPS reverse pickups.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B1C30] text-white space-y-4 shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <div>
                    <div className="text-xs font-mono text-blue-400">PREPAID RETURN SHIPPING LABEL</div>
                    <div className="font-bold text-base mt-0.5">United Parcel Service (UPS Ground Returns)</div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded font-mono text-xs font-bold">
                    PRE-AUTHORIZED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400">FROM (CUSTOMER):</span>
                    <div className="text-slate-100 font-bold mt-1">{activeRma.customerName}</div>
                    <div className="text-slate-400">Order: {activeRma.orderRef}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">TO (RETURN DEPOT):</span>
                    <div className="text-slate-100 font-bold mt-1">ResolvR Returns Hub (East Node 04)</div>
                    <div className="text-slate-400">Dock Bay 12, Chicago IL 60607</div>
                  </div>
                </div>

                <div className="p-3 bg-white text-slate-900 rounded-xl text-center space-y-2">
                  <div className="flex items-center justify-center gap-1.5 h-12 px-6">
                    {[2, 4, 1, 3, 5, 2, 4, 1, 6, 2, 3, 5, 2, 4, 1, 5, 3, 2, 4].map((w, idx) => (
                      <div key={idx} className="bg-slate-900 h-full" style={{ width: `${w * 2}px` }} />
                    ))}
                  </div>
                  <div className="font-mono text-xs font-bold tracking-widest">
                    {activeRma.carrierTracking || "1Z-992-884-UPS-LIVE"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CUSTOMER COMMUNICATION */}
          {state.activeTab === "comms" && (
            <div className="bg-white rounded-2xl border border-[#DCE9FF] p-6 space-y-4 shadow-sm">
              <div>
                <h3 className="font-bold text-base text-[#0B1C30]">Automated Customer Communication Timeline</h3>
                <p className="text-xs text-slate-500">
                  Transactional notifications triggered across the return and refund lifecycle.
                </p>
              </div>

              <div className="space-y-3">
                {state.comms.map((comm) => (
                  <div key={comm.id} className="p-4 rounded-xl border border-slate-200 bg-[#F8F9FF] space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-blue-700">{comm.recipient}</span>
                      <span className="text-slate-400">{comm.timestamp} • {comm.channel}</span>
                    </div>
                    <div className="font-bold text-slate-900 text-xs">{comm.subject}</div>
                    <p className="text-xs text-slate-600">{comm.preview}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Right Section: RMA Decision Workbench (5 Cols on Desktop) */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#DCE9FF] p-5 shadow-sm space-y-5">
            {/* Workbench Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE9FF]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#0B1C30]">RMA Decision Workbench</h3>
                  <span className="px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800">
                    LIVE REVIEW
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Reviewing {activeRma.rmaId} • {activeRma.orderRef} • {activeRma.customerName} ({activeRma.customerTier})
                </p>
              </div>
            </div>

            {/* Diagnostic Proof & Telemetry */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Customer Proof & Telemetry
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Bluetooth Firmware v2.1.4 Verified
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400">CUSTOMER STATEMENT:</span>
                <p className="text-xs text-slate-700 italic mt-0.5 bg-white p-2.5 rounded-lg border border-slate-200">
                  "{activeRma.statement}"
                </p>
              </div>

              {/* Photo Evidence Simulation */}
              <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono">
                <div className="p-2.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 flex flex-col items-center justify-center h-16">
                  <div className="text-slate-400 text-sm">📦</div>
                  <div className="mt-1">Box: Intact Grade A</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 flex flex-col items-center justify-center h-16">
                  <div className="text-slate-400 text-sm">🔍</div>
                  <div className="mt-1">Right Driver: Minor Scuff</div>
                </div>
              </div>
            </div>

            {/* Condition & Restock Grading */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>PHYSICAL CONDITION & RESTOCK GRADING</span>
                <span className="text-slate-400 font-mono text-[10px]">Step 2 of 4</span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { grade: "Grade A", title: "Grade A — Pristine / Resellable as New", feeText: "0% Fee", fee: 0 },
                  { grade: "Grade B", title: "Grade B — Minor Blemish / Open Box", feeText: "10% Restock Fee", fee: 10 },
                  { grade: "Grade C", title: "Grade C — Damaged / Salvage (Parts)", feeText: "25% Scrap Fee", fee: 25 },
                ].map((opt) => (
                  <label
                    key={opt.grade}
                    className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                      activeRma.restockGrade === opt.grade
                        ? "bg-indigo-50/70 border-[#4F46E5] text-[#0B1C30]"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="restockGrade"
                        checked={activeRma.restockGrade === opt.grade}
                        onChange={() => {
                          const updated = state.rmas.map((r) =>
                            r.id === activeRma.id ? { ...r, restockGrade: opt.grade as any } : r
                          );
                          setState((prev) => ({ ...prev, rmas: updated }));
                        }}
                        className="text-[#4F46E5] focus:ring-indigo-500"
                      />
                      <span className="font-medium">{opt.title}</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-slate-500">{opt.feeText}</span>
                  </label>
                ))}
              </div>

              {/* Target Restocking Hub */}
              <div className="pt-2 text-xs">
                <span className="text-[10px] font-mono text-slate-400">TARGET RESTOCKING HUB:</span>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <button className="py-1.5 px-2 rounded-lg text-[10px] font-semibold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700">
                    Main DC Restock
                  </button>
                  <button className="py-1.5 px-2 rounded-lg text-[10px] font-semibold border border-indigo-300 bg-indigo-50 text-[#4F46E5]">
                    Open-Box Outlet
                  </button>
                  <button className="py-1.5 px-2 rounded-lg text-[10px] font-semibold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700">
                    RTV Vendor Liq.
                  </button>
                </div>
              </div>
            </div>

            {/* Refund & Value Simulation Engine */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>REFUND & VALUE SIMULATION ENGINE</span>
                <span className="font-mono text-slate-500">Item: ${fmtNum(activeRma.price)}</span>
              </div>

              {/* Refund Method Option 1: Original Payment */}
              <label
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  activeRma.refundType === "original"
                    ? "bg-white border-[#4F46E5] shadow-sm"
                    : "bg-slate-100 border-slate-200 text-slate-500"
                }`}
              >
                <div className="flex items-center gap-2 text-xs">
                  <input
                    type="radio"
                    name="refundType"
                    checked={activeRma.refundType === "original"}
                    onChange={() => {
                      const updated = state.rmas.map((r) =>
                        r.id === activeRma.id ? { ...r, refundType: "original" as const } : r
                      );
                      setState((prev) => ({ ...prev, rmas: updated }));
                    }}
                    className="text-[#4F46E5]"
                  />
                  <div>
                    <div className="font-bold text-[#0B1C30]">Original Payment Method</div>
                    <div className="text-[10px] text-slate-400">Visa ending •••• 4129 (3-5 business days)</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-slate-900">${fmtNum(originalRefundAmount)}</div>
                  {restockFeePercent > 0 && (
                    <div className="text-[9px] font-mono text-rose-500">
                      -${fmtNum(activeRma.price * restockFeePercent)} fee
                    </div>
                  )}
                </div>
              </label>

              {/* Refund Method Option 2: Instant Store Credit with 10% Bonus */}
              <label
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors relative ${
                  activeRma.refundType === "credit"
                    ? "bg-white border-[#4F46E5] ring-2 ring-indigo-500/20 shadow-sm"
                    : "bg-slate-100 border-slate-200 text-slate-500"
                }`}
              >
                <span className="absolute -top-2 right-3 px-1.5 py-0.2 rounded bg-emerald-600 text-white font-mono text-[9px] font-bold">
                  RECOMMENDED +10% BONUS
                </span>
                <div className="flex items-center gap-2 text-xs">
                  <input
                    type="radio"
                    name="refundType"
                    checked={activeRma.refundType === "credit"}
                    onChange={() => {
                      const updated = state.rmas.map((r) =>
                        r.id === activeRma.id ? { ...r, refundType: "credit" as const } : r
                      );
                      setState((prev) => ({ ...prev, rmas: updated }));
                    }}
                    className="text-[#4F46E5]"
                  />
                  <div>
                    <div className="font-bold text-[#0B1C30] flex items-center gap-1">
                      <span>Instant ResolvR Store Credit</span>
                      <span className="text-amber-500">⚡</span>
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold">
                      Zero deductions • VIP loyalty locked
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-black text-indigo-700 text-sm">
                    ${fmtNum(storeCreditAmount)}
                  </div>
                  <div className="text-[9px] font-mono text-emerald-600 font-bold">
                    +${fmtNum(activeRma.price * 0.1)} free perk
                  </div>
                </div>
              </label>
            </div>

            {/* Resolution Action Buttons */}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleApproveAndSendLabel}
                  className="py-2.5 px-3 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Approve & Send Label
                </button>

                <button
                  onClick={handleRefundInstantly}
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Refund Instantly
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={handleCreateExchange}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  🔄 Convert to Zero-Cost Exchange
                </button>
                <button
                  onClick={() => showToast(`Claim ${activeRma.rmaId} marked as rejected with reason code logged.`)}
                  className="text-rose-600 hover:text-rose-800 font-semibold"
                >
                  ✕ Reject Claim
                </button>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default ResolvrReturnsApp;
