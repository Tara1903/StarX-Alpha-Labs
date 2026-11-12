"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bike,
  CheckCircle2,
  Clock,
  MapPin,
  Navigation,
  PackageCheck,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Wallet,
} from "lucide-react";
import type { DemoProductDefinition } from "../../types";
import { toDemoModel } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

type TabId = "dispatch" | "storefront" | "geofences" | "payouts";

interface DispatchOrder {
  id: string;
  orderNo: string;
  customerName: string;
  address: string;
  zone: string;
  itemsSummary: string;
  total: number;
  status: "Preparing" | "Awaiting Pickup" | "In Transit" | "Delivered";
  riderName: string | null;
  etaMins: number;
  otp: string;
  commissionSaved: number;
}

interface GeofenceZone {
  id: string;
  name: string;
  radiusKm: number;
  baseFee: number;
  minOrder: number;
  avgEtaMins: number;
  active: boolean;
}

interface RiderPayout {
  id: string;
  riderName: string;
  vehicle: string;
  deliveriesToday: number;
  codCollected: number;
  payoutDue: number;
  settled: boolean;
  zone: string;
}

interface StorefrontDish {
  id: string;
  name: string;
  category: string;
  price: number;
  prepMins: number;
  tag: string;
}

interface DeliveryState {
  brandName: string;
  selectedZone: string;
  orders: DispatchOrder[];
  zones: GeofenceZone[];
  riders: RiderPayout[];
  promoFreeDelivery: boolean;
}

const STOREFRONT_CATALOG: StorefrontDish[] = [
  { id: "sf-1", name: "Double Truffle Smash Burger + Hand-Cut Fries", category: "Burgers", price: 540, prepMins: 12, tag: "Bestseller" },
  { id: "sf-2", name: "Birria Tacos (3 pc) & Roasted Consomé", category: "Mexican", price: 480, prepMins: 14, tag: "Hot" },
  { id: "sf-3", name: "Wood-Fired Burrata Margherita Pizza", category: "Artisan Pizza", price: 690, prepMins: 16, tag: "Chef Choice" },
  { id: "sf-4", name: "Kung Pao Chili Noodles & Crispy Spring Rolls", category: "Wok", price: 450, prepMins: 11, tag: "Fast Prep" },
];

const SWIFT_BITE_SEED: DeliveryState = {
  brandName: "SwiftBite Direct",
  selectedZone: "Metro Zone A",
  promoFreeDelivery: true,
  orders: [
    {
      id: "ord-8921",
      orderNo: "#SB-8921",
      customerName: "Aarav M.",
      address: "442 Market St, Apt 4B",
      zone: "Metro Zone A",
      itemsSummary: "Double Truffle Smash Burger x2, Craft Cola",
      total: 1180,
      status: "In Transit",
      riderName: "Marco B.",
      etaMins: 7,
      otp: "8492",
      commissionSaved: 283,
    },
    {
      id: "ord-8925",
      orderNo: "#SB-8925",
      customerName: "Sneha R.",
      address: "810 Pine Ridge Way, Suite 12",
      zone: "Metro Zone A",
      itemsSummary: "Burrata Margherita x1, Garlic Confit Dip",
      total: 790,
      status: "Awaiting Pickup",
      riderName: null,
      etaMins: 14,
      otp: "3158",
      commissionSaved: 189,
    },
    {
      id: "ord-8927",
      orderNo: "#SB-8927",
      customerName: "Rohan K.",
      address: "1200 Central Ave, Tower 2 Fl 14",
      zone: "Corridor Zone B",
      itemsSummary: "Birria Tacos x3, Horchata Grande x2",
      total: 920,
      status: "Preparing",
      riderName: "Priya K.",
      etaMins: 19,
      otp: "6204",
      commissionSaved: 221,
    },
  ],
  zones: [
    { id: "zn-a", name: "Metro Zone A (Core 3 km)", radiusKm: 3, baseFee: 29, minOrder: 249, avgEtaMins: 18, active: true },
    { id: "zn-b", name: "Corridor Zone B (3–6 km)", radiusKm: 6, baseFee: 49, minOrder: 399, avgEtaMins: 26, active: true },
    { id: "zn-c", name: "Tech Park Zone C (6–9 km)", radiusKm: 9, baseFee: 69, minOrder: 599, avgEtaMins: 34, active: false },
  ],
  riders: [
    { id: "rd-1", riderName: "Marco B.", vehicle: "EV Scooter · KA-01-EV-488", deliveriesToday: 14, codCollected: 1240, payoutDue: 1890, settled: false, zone: "Metro Zone A" },
    { id: "rd-2", riderName: "Priya K.", vehicle: "E-Bike · Fleet #88", deliveriesToday: 11, codCollected: 620, payoutDue: 1485, settled: false, zone: "Metro Zone A" },
    { id: "rd-3", riderName: "Devansh P.", vehicle: "Motorbike · Fleet #112", deliveriesToday: 16, codCollected: 2150, payoutDue: 2240, settled: true, zone: "Corridor Zone B" },
  ],
};

export function FoodDeliveryDispatchApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState } = useDemoState<DeliveryState>(
    product.slug,
    SWIFT_BITE_SEED
  );
  const [tab, setTab] = useState<TabId>("dispatch");
  const [customOpen, setCustomOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [otpInputs, setOtpInputs] = useState<Record<string, string>>({});
  const [quickCustomer, setQuickCustomer] = useState("");
  const [quickAddress, setQuickAddress] = useState("");
  const [quickDishId, setQuickDishId] = useState(STOREFRONT_CATALOG[0].id);
  const [cart, setCart] = useState<Record<string, number>>({ "sf-1": 1 });
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((curr) => (curr === msg ? null : curr)), 2600);
  };

  const totalSaved = useMemo(
    () => state.orders.reduce((acc, o) => acc + o.commissionSaved, 0),
    [state.orders]
  );

  const activeOrders = useMemo(
    () => state.orders.filter((o) => o.status !== "Delivered"),
    [state.orders]
  );

  const dispatchNearestRider = (orderId: string) => {
    const order = state.orders.find((o) => o.id === orderId);
    if (!order) return;
    const assigned = order.riderName || "Priya K.";
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o.id === orderId
          ? { ...o, riderName: assigned, status: "In Transit", etaMins: Math.max(5, o.etaMins - 5) }
          : o
      ),
    }));
    notify(`${order.orderNo} dispatched via ${assigned} · OTP ${order.otp} sent to customer`);
  };

  const completeWithOtp = (orderId: string) => {
    const order = state.orders.find((o) => o.id === orderId);
    if (!order) return;
    const entered = (otpInputs[orderId] || "").trim();
    if (entered && entered !== order.otp) {
      notify(`OTP mismatch for ${order.orderNo}. Expected ${order.otp}.`);
      return;
    }
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o.id === orderId ? { ...o, status: "Delivered", etaMins: 0 } : o
      ),
    }));
    notify(`${order.orderNo} verified with OTP ${order.otp} and marked Delivered.`);
  };

  const handleQuickDirectOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = quickCustomer.trim();
    if (!customer) return;
    const dish = STOREFRONT_CATALOG.find((d) => d.id === quickDishId) || STOREFRONT_CATALOG[0];
    const code = String(1000 + Math.floor(Math.random() * 8999));
    const orderNum = `#SB-${9000 + state.orders.length + 1}`;
    const newOrder: DispatchOrder = {
      id: `ord-${Date.now()}`,
      orderNo: orderNum,
      customerName: customer,
      address: quickAddress.trim() || "18 Parkside Boulevard, Apt 2C",
      zone: state.selectedZone,
      itemsSummary: `${dish.name} x1`,
      total: dish.price,
      status: "Awaiting Pickup",
      riderName: null,
      etaMins: 16,
      otp: code,
      commissionSaved: Math.round(dish.price * 0.24),
    };
    setState((prev) => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
    }));
    setQuickCustomer("");
    setQuickAddress("");
    notify(`Direct order ${orderNum} queued for ${customer} (OTP ${code}).`);
  };

  const placeStorefrontOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = checkoutName.trim() || "Direct Guest";
    const items = Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const d = STOREFRONT_CATALOG.find((item) => item.id === id);
        return d ? { dish: d, qty } : null;
      })
      .filter(Boolean) as { dish: StorefrontDish; qty: number }[];
    if (items.length === 0) return;

    const total = items.reduce((s, item) => s + item.dish.price * item.qty, 0);
    const otp = String(1000 + Math.floor(Math.random() * 8999));
    const orderNo = `#SB-${9010 + state.orders.length}`;
    const summary = items.map((i) => `${i.dish.name.split("+")[0].trim()} x${i.qty}`).join(", ");
    setState((prev) => ({
      ...prev,
      orders: [
        {
          id: `ord-${Date.now()}`,
          orderNo,
          customerName: customer,
          address: checkoutAddress.trim() || "64 Oakwood Residences",
          zone: state.selectedZone,
          itemsSummary: summary,
          total,
          status: "Preparing",
          riderName: null,
          etaMins: 22,
          otp,
          commissionSaved: Math.round(total * 0.24),
        },
        ...prev.orders,
      ],
    }));
    setCheckoutName("");
    setCheckoutAddress("");
    setCart({ "sf-1": 1 });
    setTab("dispatch");
    notify(`Customer storefront order ${orderNo} pushed live to Rider Dispatch.`);
  };

  const toggleZone = (id: string) => {
    setState((prev) => ({
      ...prev,
      zones: prev.zones.map((z) => (z.id === id ? { ...z, active: !z.active } : z)),
    }));
  };

  const settleRider = (id: string) => {
    setState((prev) => ({
      ...prev,
      riders: prev.riders.map((r) => (r.id === id ? { ...r, settled: !r.settled } : r)),
    }));
    notify("Rider payout ledger updated.");
  };

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const dish = STOREFRONT_CATALOG.find((d) => d.id === id);
    return sum + (dish ? dish.price * qty : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-[#131B2E] flex flex-col font-sans">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-[#006A61] text-white text-xs font-semibold shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Top Operations Header */}
      <header className="border-b border-[#E2E8F0] bg-white px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/demos/food-hospitality/food-delivery-management"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-medium text-[#5A4138] hover:bg-[#FAF8FF]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#A33900] text-white flex items-center justify-center">
              <Bike className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-[#131B2E]">
                {state.brandName}
              </div>
              <div className="text-[11px] font-mono text-[#006A61]">
                {state.selectedZone} · Commission-Free Direct Fleet
              </div>
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "dispatch", label: `Live Rider Dispatch (${activeOrders.length})` },
            { id: "storefront", label: "Storefront & Cart" },
            { id: "geofences", label: "Delivery Geofences" },
            { id: "payouts", label: "Payouts & Promo" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as TabId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                tab === item.id
                  ? "bg-[#A33900] text-white"
                  : "bg-[#F2F3FF] text-[#131B2E] hover:bg-[#EAEDFF]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#86F2E4] text-[#005049] text-xs font-mono font-bold">
            ₹{totalSaved.toLocaleString("en-IN")} Fee Saved
          </span>
          <button
            type="button"
            onClick={() => {
              resetState();
              notify("Fleet dispatch and direct storefront reset.");
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-xs text-[#5A4138] hover:bg-[#FAF8FF] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            type="button"
            onClick={() => setCustomOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FFDBCE] text-[#7F2B00] text-xs font-semibold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Customize
          </button>
        </div>
      </header>

      {/* VIEW 1: LIVE RIDER DISPATCH & GEOFENCE TELEMETRY */}
      {tab === "dispatch" && (
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-5 p-4 md:p-6">
          {/* Left 7 cols: Telemetry Map + Active Dispatch Feeds */}
          <div className="xl:col-span-7 space-y-5">
            {/* Telemetry Strip + Visual Geofence Grid */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-[#F2F3FF]">
                  <div className="text-[10px] font-mono uppercase text-[#5A4138]">Active Deliveries</div>
                  <div className="text-lg font-bold font-mono text-[#131B2E]">{activeOrders.length}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FFDBCE]/50">
                  <div className="text-[10px] font-mono uppercase text-[#7F2B00]">Unassigned</div>
                  <div className="text-lg font-bold font-mono text-[#A33900]">
                    {state.orders.filter((o) => !o.riderName && o.status !== "Delivered").length} Orders
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#86F2E4]/50">
                  <div className="text-[10px] font-mono uppercase text-[#005049]">Avg Dispatch ETA</div>
                  <div className="text-lg font-bold font-mono text-[#006A61]">18.4 min</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F2F3FF]">
                  <div className="text-[10px] font-mono uppercase text-[#5A4138]">OTP Compliance</div>
                  <div className="text-lg font-bold font-mono text-[#006A61]">99.2%</div>
                </div>
              </div>

              {/* Clean Interactive Geofence Map Box */}
              <div className="relative rounded-xl border border-[#DAE2FD] bg-[#F2F3FF] p-4 min-h-[175px] flex flex-col justify-between overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#86F2E4] text-[11px] font-mono font-semibold text-[#006A61]">
                    <Navigation className="w-3 h-3" /> Core 3km Hotzone · Direct Kitchen Cluster
                  </span>
                  <div className="flex gap-2 text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-[#006A61] text-white">● Transit: Marco B. (28 km/h)</span>
                    <span className="px-2 py-0.5 rounded bg-[#A33900] text-white">● Idle: Priya K. (300m away)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-3 z-10">
                  {state.zones.map((zn) => (
                    <button
                      key={zn.id}
                      type="button"
                      onClick={() =>
                        setState((prev) => ({ ...prev, selectedZone: zn.name.split(" (")[0] }))
                      }
                      className={`text-left px-3 py-2 rounded-lg border text-xs transition cursor-pointer ${
                        state.selectedZone === zn.name.split(" (")[0]
                          ? "bg-white border-[#006A61] shadow-sm"
                          : "bg-white/70 border-[#DAE2FD] opacity-80"
                      }`}
                    >
                      <div className="font-bold text-[#131B2E]">{zn.name.split(" (")[0]}</div>
                      <div className="text-[11px] font-mono text-[#006A61]">
                        {zn.radiusKm}km · {zn.avgEtaMins}m ETA · ₹{zn.baseFee} fee
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Dispatch Order Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#131B2E]">Active Dispatch Telemetry & OTP Handoff</h2>
                <span className="text-[11px] font-mono text-[#5A4138]">
                  Showing {state.orders.length} Direct Orders
                </span>
              </div>

              {state.orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-4 space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm font-mono text-[#131B2E]">
                          {order.orderNo}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            order.status === "Delivered"
                              ? "bg-[#E2E7FF] text-[#131B2E]"
                              : order.status === "In Transit"
                              ? "bg-[#86F2E4] text-[#005049]"
                              : "bg-[#FFDBCE] text-[#7F2B00]"
                          }`}
                        >
                          {order.status} {order.etaMins > 0 ? `• ETA ${order.etaMins}m` : "• Handed Over"}
                        </span>
                        <span className="text-xs font-semibold text-[#A33900]">
                          {order.customerName}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-[#131B2E] mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#A33900]" />
                        {order.address} ({order.zone})
                      </div>
                      <div className="text-xs text-[#5A4138] mt-0.5">
                        {order.itemsSummary} · ₹{order.total} (Zero-Fee Direct)
                      </div>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl border border-dashed border-[#006A61] bg-[#FAF8FF] text-center">
                      <div className="text-[10px] font-mono uppercase text-[#5A4138]">Customer OTP</div>
                      <div className="text-sm font-mono font-bold text-[#006A61]">[ {order.otp} ]</div>
                    </div>
                  </div>

                  {order.status !== "Delivered" && (
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#F2F3FF]">
                      <div className="text-xs font-mono text-[#5A4138]">
                        {order.riderName ? `Courier: ${order.riderName}` : "Unassigned · Priya K. 300m away"}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {order.status !== "In Transit" && (
                          <button
                            type="button"
                            onClick={() => dispatchNearestRider(order.id)}
                            className="px-3 py-1.5 rounded-lg bg-[#A33900] hover:bg-[#7F2B00] text-white text-xs font-semibold cursor-pointer"
                          >
                            {order.riderName ? `Dispatch ${order.riderName}` : "Assign & Dispatch Rider"}
                          </button>
                        )}
                        <input
                          type="text"
                          maxLength={4}
                          value={otpInputs[order.id] ?? ""}
                          onChange={(e) =>
                            setOtpInputs((prev) => ({ ...prev, [order.id]: e.target.value }))
                          }
                          placeholder={`OTP (${order.otp})`}
                          className="w-24 px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-mono bg-[#FAF8FF]"
                        />
                        <button
                          type="button"
                          onClick={() => completeWithOtp(order.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#006A61] hover:bg-[#005049] text-white text-xs font-semibold cursor-pointer"
                        >
                          Verify & Deliver
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 cols: Quick Direct Order Dispatcher + Zero-Commission Savings */}
          <aside className="xl:col-span-5 space-y-4">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A33900] font-bold">
                    Zero-Commission Intake
                  </span>
                  <h2 className="text-base font-bold text-[#131B2E]">Create Direct Delivery Order</h2>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#86F2E4] text-[#005049] text-[10px] font-mono font-bold">
                  100% Direct
                </span>
              </div>

              <form onSubmit={handleQuickDirectOrder} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#5A4138] mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={quickCustomer}
                    onChange={(e) => setQuickCustomer(e.target.value)}
                    placeholder="Enter direct customer name..."
                    className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] bg-[#FAF8FF] text-[#131B2E]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#5A4138] mb-1">Drop Address</label>
                  <input
                    type="text"
                    value={quickAddress}
                    onChange={(e) => setQuickAddress(e.target.value)}
                    placeholder="Street / Apartment / Floor..."
                    className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] bg-[#FAF8FF] text-[#131B2E]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#5A4138] mb-1">Menu Combo</label>
                  <select
                    value={quickDishId}
                    onChange={(e) => setQuickDishId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] bg-[#FAF8FF] text-[#131B2E]"
                  >
                    {STOREFRONT_CATALOG.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} — ₹{d.price}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#A33900] hover:bg-[#7F2B00] text-white font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Queue Direct Delivery Order
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#131B2E]">Third-Party Fee Avoidance Today</span>
                <span className="text-sm font-mono font-bold text-[#006A61]">+₹{totalSaved} Saved</span>
              </div>
              <p className="text-xs text-[#5A4138]">
                Routing direct orders through your own rider fleet saves 24% marketplace commission per drop with instant 4-digit OTP delivery proof.
              </p>
              <button
                type="button"
                onClick={() => setTab("storefront")}
                className="w-full py-2 rounded-xl border border-[#006A61] text-[#006A61] font-semibold text-xs hover:bg-[#86F2E4]/20 cursor-pointer"
              >
                Open Branded Customer Storefront →
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* VIEW 2: BRANDED DIRECT CUSTOMER STOREFRONT */}
      {tab === "storefront" && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6 max-w-6xl w-full mx-auto">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A33900] font-bold">
                  Direct Web Storefront · No Aggregator Markup
                </span>
                <h1 className="text-xl font-bold text-[#131B2E]">Order Direct in {state.selectedZone}</h1>
              </div>
              {state.promoFreeDelivery && (
                <span className="px-3 py-1 rounded-full bg-[#86F2E4] text-[#005049] text-xs font-bold">
                  FREE Direct Delivery Active
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STOREFRONT_CATALOG.map((dish) => (
                <div key={dish.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-4 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#006A61]">
                      <span>{dish.category}</span>
                      <span>{dish.prepMins} min prep</span>
                    </div>
                    <h3 className="font-bold text-sm text-[#131B2E] mt-1">{dish.name}</h3>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#F2F3FF]">
                    <span className="font-mono font-bold text-sm text-[#A33900]">₹{dish.price}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setCart((prev) => ({ ...prev, [dish.id]: (prev[dish.id] || 0) + 1 }))
                      }
                      className="px-3 py-1.5 rounded-lg bg-[#A33900] text-white text-xs font-semibold cursor-pointer"
                    >
                      + Add ({cart[dish.id] || 0})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5 rounded-2xl border border-[#E2E8F0] bg-white p-5 space-y-4 h-fit">
            <div className="flex items-center gap-2 font-bold text-base">
              <ShoppingBag className="w-4 h-4 text-[#A33900]" /> Direct Bag Checkout
            </div>
            <div className="space-y-2 text-xs">
              {Object.entries(cart)
                .filter(([, q]) => q > 0)
                .map(([id, qty]) => {
                  const dish = STOREFRONT_CATALOG.find((d) => d.id === id);
                  if (!dish) return null;
                  return (
                    <div key={id} className="flex items-center justify-between py-1.5 border-b border-[#F2F3FF]">
                      <span>{dish.name.split("+")[0]} × {qty}</span>
                      <span className="font-mono font-bold">₹{dish.price * qty}</span>
                    </div>
                  );
                })}
            </div>
            <form onSubmit={placeStorefrontOrder} className="space-y-3 text-xs">
              <input
                type="text"
                value={checkoutName}
                onChange={(e) => setCheckoutName(e.target.value)}
                placeholder="Your name..."
                className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] bg-[#FAF8FF]"
              />
              <input
                type="text"
                value={checkoutAddress}
                onChange={(e) => setCheckoutAddress(e.target.value)}
                placeholder="Delivery address..."
                className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] bg-[#FAF8FF]"
              />
              <div className="flex items-center justify-between font-bold text-sm">
                <span>Payable Direct</span>
                <span className="font-mono text-[#A33900]">₹{cartTotal}</span>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#006A61] hover:bg-[#005049] text-white font-bold cursor-pointer"
              >
                Place Direct Order → Send to Dispatch
              </button>
            </form>
          </aside>
        </div>
      )}

      {/* VIEW 3: GEOFENCE DELIVERY ZONES */}
      {tab === "geofences" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="text-xl font-bold text-[#131B2E]">Polygon Delivery Geofences & Minimums</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.zones.map((zn) => (
              <div key={zn.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">{zn.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      zn.active ? "bg-[#86F2E4] text-[#005049]" : "bg-[#F2F3FF] text-[#5A4138]"
                    }`}
                  >
                    {zn.active ? "Open" : "Paused"}
                  </span>
                </div>
                <div className="text-xs font-mono text-[#5A4138] space-y-1">
                  <div>Radius: {zn.radiusKm} km</div>
                  <div>Delivery Fee: ₹{zn.baseFee}</div>
                  <div>Min Cart: ₹{zn.minOrder}</div>
                  <div>Avg ETA: {zn.avgEtaMins} mins</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleZone(zn.id)}
                  className="w-full py-2 rounded-xl border border-[#E2E8F0] text-xs font-semibold hover:bg-[#FAF8FF] cursor-pointer"
                >
                  {zn.active ? "Pause Zone Orders" : "Enable Zone"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: RIDER PAYOUTS & PROMO ENGINE */}
      {tab === "payouts" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#131B2E]">Rider COD Reconciliation & Direct Promo Rules</h1>
              <p className="text-xs text-[#5A4138]">Track per-drop rider payouts and direct storefront fee-waiver incentives.</p>
            </div>
            <button
              type="button"
              onClick={() =>
                setState((prev) => ({ ...prev, promoFreeDelivery: !prev.promoFreeDelivery }))
              }
              className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                state.promoFreeDelivery
                  ? "bg-[#006A61] text-white"
                  : "bg-[#FFDBCE] text-[#7F2B00]"
              }`}
            >
              Free Delivery Above ₹499: {state.promoFreeDelivery ? "ENABLED" : "PAUSED"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.riders.map((r) => (
              <div key={r.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">{r.riderName}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      r.settled ? "bg-[#86F2E4] text-[#005049]" : "bg-[#FFDBCE] text-[#7F2B00]"
                    }`}
                  >
                    {r.settled ? "Settled" : "COD Due"}
                  </span>
                </div>
                <div className="text-xs font-mono text-[#5A4138] space-y-1">
                  <div>{r.vehicle}</div>
                  <div>Drops Today: {r.deliveriesToday}</div>
                  <div>COD Collected: ₹{r.codCollected}</div>
                  <div className="font-bold text-[#131B2E]">Net Payout Due: ₹{r.payoutDue}</div>
                </div>
                <button
                  type="button"
                  onClick={() => settleRider(r.id)}
                  className="w-full py-2 rounded-xl bg-[#A33900] text-white text-xs font-bold cursor-pointer"
                >
                  {r.settled ? "Reopen Shift Ledger" : "Settle Rider Payout"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <CustomizationModal demo={toDemoModel(product)} isOpen={customOpen} onClose={() => setCustomOpen(false)} />
    </div>
  );
}
