"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { DemoProductDefinition } from "../types";
import { toDemoModel } from "../registry";
import { useDemoState } from "../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Search,
  Plus,
  Trash2,
  Send,
  Calendar,
  Layers,
  Activity,
  CreditCard,
  User,
  Users,
  Settings,
  Clock,
  MapPin,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Play,
  FileText,
  Copy,
  Terminal,
  Code2,
  Package,
  Sliders,
  DollarSign,
  Briefcase,
  Building2,
  Filter,
} from "lucide-react";

interface DemoRuntimeDispatcherProps {
  product: DemoProductDefinition;
}

export function DemoRuntimeDispatcher({ product }: DemoRuntimeDispatcherProps) {
  const { state, setState, resetState, hasReset } = useDemoState(
    product.slug,
    product.initialData
  );

  const [activeWorkflowId, setActiveWorkflowId] = useState<string>(
    product.workflows[0]?.id || "wf1"
  );
  const [activeRole, setActiveRole] = useState<"admin" | "staff" | "customer">("admin");
  const [deviceViewport, setDeviceViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [customizationModalOpen, setCustomizationModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const demoModelCompat = useMemo(() => toDemoModel(product), [product]);

  const brand = product.brand;

  // Render archetype-specific interactive views
  const renderArchetypeBody = () => {
    switch (product.archetype) {
      case "pos-terminal":
        return renderPosTerminal();
      case "ordering-kiosk":
        return renderOrderingKiosk();
      case "ecommerce-storefront":
        return renderEcommerceStorefront();
      case "booking-calendar":
        return renderBookingCalendar();
      case "clinic-operations":
        return renderClinicOperations();
      case "diagnostic-lab":
        return renderDiagnosticLab();
      case "property-discovery":
        return renderPropertyDiscovery();
      case "fleet-dispatch":
        return renderFleetDispatch();
      case "warehouse-wms":
        return renderWarehouseWms();
      case "kanban-workflow":
        return renderKanbanWorkflow();
      case "crm-pipeline":
        return renderCrmPipeline();
      case "lms-learning":
        return renderLmsLearning();
      case "manufacturing-console":
        return renderManufacturingConsole();
      case "quality-inspection":
        return renderQualityInspection();
      case "developer-portal":
        return renderDeveloperPortal();
      case "node-automation":
        return renderNodeAutomation();
      case "analytics-canvas":
        return renderAnalyticsCanvas();
      case "community-feed":
        return renderCommunityFeed();
      default:
        return renderPosTerminal();
    }
  };

  // 1. POS TERMINAL
  const renderPosTerminal = () => {
    const tables: any[] = Array.isArray(state?.tables) ? state.tables : [];
    const activeOrder = state?.activeOrder || { tableId: "T-01", items: [] };
    const orderItems: any[] = Array.isArray(activeOrder?.items) ? activeOrder.items : [];
    const menu: any[] = Array.isArray(state?.menu) ? state.menu : [];
    const kitchenTickets: any[] = Array.isArray(state?.kitchenTickets) ? state.kitchenTickets : [];

    const handleSelectTable = (tableId: string) => {
      setState((prev: any) => ({
        ...prev,
        activeOrder: {
          ...(prev?.activeOrder || {}),
          tableId,
          items: Array.isArray(prev?.activeOrder?.items) ? prev.activeOrder.items : [],
        },
      }));
      showToast(`Selected Table ${tableId}`);
    };

    const handleAddMenuItem = (item: any) => {
      setState((prev: any) => {
        const curOrder = prev?.activeOrder || { tableId: "T-01", items: [] };
        const curItems = Array.isArray(curOrder.items) ? curOrder.items : [];
        const existing = curItems.find((i: any) => i.id === item.id);
        let updatedItems = [];
        if (existing) {
          updatedItems = curItems.map((i: any) =>
            i.id === item.id ? { ...i, qty: (i.qty || 1) + 1 } : i
          );
        } else {
          updatedItems = [...curItems, { ...item, qty: 1 }];
        }
        return {
          ...prev,
          activeOrder: {
            ...curOrder,
            items: updatedItems,
          },
        };
      });
      showToast(`Added ${item.name} to ticket`);
    };

    const handleFireKitchen = () => {
      if (orderItems.length === 0) return;
      const newKot = {
        id: `KOT-${Math.floor(100 + Math.random() * 900)}`,
        table: activeOrder.tableId || "T-01",
        station: "Grill & Hot Station",
        items: orderItems.map((i: any) => `${i.qty || 1}x ${i.name}`).join(", "),
        status: "cooking",
        elapsed: "Just now",
      };
      setState((prev: any) => ({
        ...prev,
        kitchenTickets: [newKot, ...(Array.isArray(prev?.kitchenTickets) ? prev.kitchenTickets : [])],
      }));
      showToast(`Fired order for Table ${activeOrder.tableId || "T-01"} to Kitchen Display!`);
    };

    const orderTotal = orderItems.reduce(
      (sum: number, i: any) => sum + (i.price || 0) * (i.qty || 1),
      0
    );


    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Floorplan */}
        <div className="lg:col-span-5 bg-neutral-900/60 p-5 rounded-xl border border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-200 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-500" />
              Dining Floorplan & Tables
            </h3>
            <span className="text-xs text-neutral-400">Click table to manage ticket</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {tables.map((tbl: any) => {
              const isSelected = activeOrder.tableId === tbl.id;
              const statusColor =
                tbl.status === "occupied"
                  ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
                  : tbl.status === "billing"
                  ? "bg-purple-500/10 border-purple-500/40 text-purple-400"
                  : tbl.status === "reserved"
                  ? "bg-blue-500/10 border-blue-500/40 text-blue-400"
                  : "bg-emerald-500/10 border-emerald-500/40 text-emerald-400";
              return (
                <button
                  key={tbl.id}
                  onClick={() => handleSelectTable(tbl.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected ? "ring-2 ring-amber-500 shadow-lg" : ""
                  } ${statusColor}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-neutral-100">{tbl.id}</span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-black/40">
                      {tbl.status}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-2">
                    {tbl.section} • {tbl.seats} Seats
                  </div>
                  {tbl.total > 0 && (
                    <div className="text-xs font-semibold text-neutral-200 mt-1">
                      ₹{tbl.total.toLocaleString()}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Live Kitchen Tickets */}
          <div className="mt-6 pt-5 border-t border-neutral-800">
            <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-400 mb-3 flex items-center justify-between">
              <span>Live KOT Station Queue ({kitchenTickets.length})</span>
              <span className="text-amber-400">● Live Feed</span>
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {kitchenTickets.map((kot: any) => (
                <div
                  key={kot.id}
                  className="p-2.5 rounded-lg bg-black/40 border border-neutral-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-mono text-amber-400 font-bold">{kot.id}</span>
                    <span className="text-neutral-400 ml-2">({kot.table})</span>
                    <p className="text-neutral-200 mt-0.5 font-medium">{kot.items}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300">
                      {kot.status}
                    </span>
                    <p className="text-[10px] text-neutral-500 mt-1">{kot.elapsed}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Catalog */}
        <div className="lg:col-span-4 bg-neutral-900/60 p-5 rounded-xl border border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-200 flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-500" />
              Menu & Modifiers
            </h3>
            <span className="text-xs text-neutral-400">{menu.length} items</span>
          </div>
          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {menu.map((item: any) => (
              <div
                key={item.id}
                className="p-3 rounded-lg bg-neutral-800/40 border border-neutral-700/50 flex items-center justify-between hover:border-neutral-600 transition"
              >
                <div>
                  <h4 className="font-medium text-sm text-neutral-100">{item.name}</h4>
                  <p className="text-xs text-neutral-400">
                    {item.category} • Prep: {item.prepTime}
                  </p>
                  <p className="text-xs font-semibold text-amber-400 mt-1">
                    ₹{item.price?.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleAddMenuItem(item)}
                  className="p-2 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition flex items-center gap-1 text-xs font-medium"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Active Ticket & Bill Split */}
        <div className="lg:col-span-3 bg-neutral-900/60 p-5 rounded-xl border border-neutral-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
              <div>
                <h3 className="font-semibold text-neutral-100">Ticket: {activeOrder.tableId}</h3>
                <span className="text-xs text-neutral-400">Guest Order Sheet</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400">
                Active
              </span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
              {orderItems.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 text-xs">
                  No items on ticket yet. Click "Add" on any menu item.
                </div>
              ) : (
                orderItems.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-1.5 border-b border-neutral-800/50"
                  >
                    <div>
                      <span className="font-medium text-neutral-200">
                        {item.qty}x {item.name}
                      </span>
                      {item.notes && <p className="text-[10px] text-neutral-400">{item.notes}</p>}
                    </div>
                    <span className="font-mono text-neutral-300">
                      ₹{((item.price || 0) * (item.qty || 1)).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span>Subtotal</span>
              <span>₹{orderTotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span>Taxes & GST (5%)</span>
              <span>₹{Math.round(orderTotal * 0.05).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between font-bold text-sm text-neutral-100 mb-4 pt-2 border-t border-neutral-800">
              <span>Total Bill</span>
              <span className="text-amber-400 font-mono">
                ₹{Math.round(orderTotal * 1.05).toLocaleString()}
              </span>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleFireKitchen}
                disabled={orderItems.length === 0}
                className="w-full py-2.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-medium text-xs transition flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                Fire to Kitchen (KOT)
              </button>
              <button
                onClick={() => {
                  showToast("Simulated check split across 2 guests (₹" + Math.round((orderTotal * 1.05) / 2) + " each)");
                }}
                disabled={orderItems.length === 0}
                className="w-full py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-neutral-300 text-xs transition"
              >
                Split Check by Seats
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  };

  // 2. ORDERING KIOSK
  const renderOrderingKiosk = () => {
    const items = state.menu || state.tiers || state.buses || [];
    const cart = state.kioskCart || [];

    const handleAddToCart = (it: any) => {
      setState((prev: any) => ({
        ...prev,
        kioskCart: [...(prev.kioskCart || []), { ...it, id: Math.random().toString(), qty: 1 }],
      }));
      showToast(`Added ${it.name || it.title || it.operator} to order`);
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-neutral-900/60 p-6 rounded-xl border border-neutral-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-neutral-100">Touch to Select Items</h3>
              <p className="text-xs text-neutral-400">Large-format touchscreen ordering layout</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-semibold">
              Kiosk #04 Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((it: any, idx: number) => (
              <button
                key={idx}
                onClick={() => handleAddToCart(it)}
                className="p-4 rounded-xl bg-neutral-800/50 border border-neutral-700/60 hover:border-amber-500/60 hover:bg-neutral-800 text-left transition flex flex-col justify-between h-44 group"
              >
                <div>
                  <h4 className="font-bold text-neutral-100 group-hover:text-amber-400 transition text-sm">
                    {it.name || it.title || it.operator || it.boxType}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {it.category || it.duration || it.fare || it.price}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-neutral-700/40">
                  <span className="font-mono font-bold text-sm text-neutral-200">
                    {typeof it.price === "number" ? `₹${it.price}` : it.price || it.fare || "Select"}
                  </span>
                  <span className="px-2 py-1 rounded bg-amber-500 text-black text-xs font-bold">
                    + Add
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-neutral-900/60 p-6 rounded-xl border border-neutral-800 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-neutral-100 pb-3 border-b border-neutral-800 flex items-center justify-between">
              <span>Your Tray ({cart.length})</span>
              <button
                onClick={() => setState((p: any) => ({ ...p, kioskCart: [] }))}
                className="text-xs text-red-400 hover:underline"
              >
                Clear
              </button>
            </h3>

            <div className="space-y-3 mt-4 max-h-72 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-neutral-500 text-xs">
                  Your tray is empty. Tap any card on the left to start.
                </div>
              ) : (
                cart.map((c: any, i: number) => (
                  <div key={i} className="p-3 rounded-lg bg-black/40 border border-neutral-800 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-semibold text-neutral-200">{c.name || c.title || c.operator}</p>
                      <p className="text-neutral-400">{c.price || c.fare}</p>
                    </div>
                    <span className="font-mono text-amber-400">1x</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800">
            <button
              onClick={() => {
                showToast("Order Placed! Token #A-42 issued. Please collect at counter.");
                setState((p: any) => ({ ...p, kioskCart: [] }));
              }}
              disabled={cart.length === 0}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black font-bold text-sm transition"
            >
              Confirm & Print Token
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 3. ECOMMERCE STOREFRONT
  const renderEcommerceStorefront = () => {
    const products = state.products || state.materials || state.equipment || state.sneakers || [];
    const [selectedCategory, setSelectedCategory] = useState("all");

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-400" />
            <span className="text-xs font-medium text-neutral-300">Catalog Filter:</span>
            {["all", "featured", "in-stock"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-black font-bold"
                    : "bg-neutral-800 text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="text-xs text-neutral-400">Displaying {products.length} products</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p: any, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="h-32 rounded-lg bg-black/40 border border-neutral-800 flex items-center justify-center text-neutral-600 mb-3">
                  <Package className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-sm text-neutral-100">{p.name || p.title || p.description}</h4>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{p.brand || p.location || p.type || "In Stock"}</p>
              </div>
              <div className="pt-3 mt-3 border-t border-neutral-800 flex items-center justify-between">
                <span className="font-bold text-sm text-amber-400 font-mono">
                  {p.price || p.rateMonthly || p.priceMonthly || "₹1,499"}
                </span>
                <button
                  onClick={() => showToast(`Added ${p.name || p.title || "item"} to shopping bag`)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 4. BOOKING CALENDAR
  const renderBookingCalendar = () => {
    const slots = state.slots || state.rooms || state.halls || state.sites || [];
    const appointments = state.appointments || state.dprRecords || state.leaveRequests || [];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-neutral-900/60 p-5 rounded-xl border border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              Schedule & Availability Slots
            </h3>
            <span className="text-xs text-neutral-400">Today & Upcoming</span>
          </div>

          <div className="space-y-3">
            {slots.map((s: any, i: number) => (
              <div
                key={i}
                className="p-3.5 rounded-lg bg-black/40 border border-neutral-800 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-semibold text-sm text-neutral-200">{s.name || s.type || s.no}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {s.amenities ? s.amenities.join(", ") : s.location || s.status}
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400">
                    {s.status || "Available"}
                  </span>
                  <button
                    onClick={() => showToast(`Selected booking slot for ${s.name || s.no}`)}
                    className="block mt-2 px-3 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-medium"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-neutral-900/60 p-5 rounded-xl border border-neutral-800">
          <h3 className="font-semibold text-neutral-100 mb-4 pb-3 border-b border-neutral-800">
            Confirmed Calendar Entries ({appointments.length})
          </h3>
          <div className="space-y-3">
            {appointments.map((a: any, i: number) => (
              <div key={i} className="p-3 rounded-lg bg-neutral-800/40 border border-neutral-700/50 text-xs">
                <div className="flex justify-between font-medium text-neutral-200">
                  <span>{a.guest || a.employee || a.customer || a.site || "Confirmed Booking"}</span>
                  <span className="text-amber-400">{a.departure || a.dates || a.date}</span>
                </div>
                <p className="text-neutral-400 mt-1">{a.type || a.status || a.delayedWork}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 5. CLINIC OPERATIONS
  const renderClinicOperations = () => {
    const queue = state.queue || state.patients || [];
    const vitals = state.vitals || { bp: "120/80", pulse: "74 bpm", spo2: "98%" };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-neutral-900/60 p-5 rounded-xl border border-neutral-800">
          <h3 className="font-semibold text-neutral-100 mb-3 flex items-center justify-between">
            <span>Patient Consultation Queue</span>
            <span className="text-xs text-amber-400 font-mono">● 4 Waiting</span>
          </h3>
          <div className="space-y-2">
            {[
              { id: "PT-104", name: "Ramesh Sharma", age: 52, reason: "Routine Hypertension Check", status: "In Consultation" },
              { id: "PT-105", name: "Sunita Deshmukh", age: 34, reason: "Post-op Followup", status: "Waiting" },
              { id: "PT-106", name: "Aarav Mehta", age: 8, reason: "Seasonal Allergies", status: "Waiting" },
            ].map((pt) => (
              <div key={pt.id} className="p-3 rounded-lg bg-black/40 border border-neutral-800 text-xs flex justify-between items-center">
                <div>
                  <p className="font-bold text-neutral-200">{pt.name} ({pt.age}y)</p>
                  <p className="text-neutral-400">{pt.reason}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-teal-500/20 text-teal-300 font-mono">
                  {pt.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 bg-neutral-900/60 p-5 rounded-xl border border-neutral-800">
          <h3 className="font-semibold text-neutral-100 mb-3">Electronic Medical Record & Rx Pad</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-black/40 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 block uppercase">Blood Pressure</span>
              <span className="text-sm font-bold text-teal-400 font-mono">{vitals.bp}</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 block uppercase">Heart Rate</span>
              <span className="text-sm font-bold text-teal-400 font-mono">{vitals.pulse}</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 block uppercase">Oxygen SpO2</span>
              <span className="text-sm font-bold text-teal-400 font-mono">{vitals.spo2}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-neutral-800 mb-4 text-xs">
            <p className="font-semibold text-neutral-200 mb-1">Prescription Formulation:</p>
            <p className="text-neutral-400">• Tab. Telmisartan 40mg — 1 OD Morning after food (30 Days)</p>
            <p className="text-neutral-400">• Tab. Amlodipine 5mg — 1 OD Night (30 Days)</p>
          </div>

          <button
            onClick={() => showToast("Prescription signed and issued to patient portal!")}
            className="w-full py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs transition"
          >
            Sign & Issue Digital Rx
          </button>
        </div>
      </div>
    );
  };

  // 6. DIAGNOSTIC LAB
  const renderDiagnosticLab = () => {
    return (
      <div className="bg-neutral-900/60 p-6 rounded-xl border border-neutral-800">
        <h3 className="font-semibold text-neutral-100 mb-4 flex items-center justify-between">
          <span>Specimen Accessioning & Analyzer Pipeline</span>
          <span className="text-xs font-mono text-cyan-400">Roche Cobas 6000 Sync Online</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400">
                <th className="pb-2 font-mono">Sample Barcode</th>
                <th className="pb-2">Test Profile</th>
                <th className="pb-2">Specimen Type</th>
                <th className="pb-2">Analyzer Stage</th>
                <th className="pb-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {[
                { barcode: "BC-90841", test: "Complete Blood Count (CBC) + ESR", type: "Whole Blood (EDTA)", stage: "Centrifuge Complete", status: "Ready for Release" },
                { barcode: "BC-90842", test: "Lipid Profile & HbA1c", type: "Serum / Fluoride", stage: "Running Assay", status: "In Process" },
                { barcode: "BC-90843", test: "Thyroid Stimulating Hormone (TSH)", type: "Serum Gel", stage: "Pipetting", status: "In Process" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-neutral-800/20">
                  <td className="py-3 font-mono font-bold text-cyan-400">{row.barcode}</td>
                  <td className="py-3 font-medium text-neutral-200">{row.test}</td>
                  <td className="py-3 text-neutral-400">{row.type}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono text-[10px]">
                      {row.stage}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => showToast(`Released validated report for ${row.barcode}`)}
                      className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium text-[11px]"
                    >
                      Authorize
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 7. PROPERTY DISCOVERY
  const renderPropertyDiscovery = () => {
    const listings = state.listings || state.packages || state.experiences || [];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-neutral-900/60 p-5 rounded-xl border border-neutral-800 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-neutral-100 mb-2">Simulated Interactive Map</h3>
            <p className="text-xs text-neutral-400 mb-4">Location pin clustering across metro sectors</p>
            <div className="h-64 rounded-xl bg-neutral-950 border border-neutral-800 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="text-center z-10">
                <MapPin className="w-8 h-8 text-amber-500 mx-auto mb-2 animate-bounce" />
                <span className="text-xs font-mono text-neutral-300">Prime Locations Indexed</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-800 flex justify-between text-xs text-neutral-400">
            <span>Filter by Price Range</span>
            <span className="text-amber-400 font-medium">₹85L — ₹3.5 Cr</span>
          </div>
        </div>

        <div className="lg:col-span-7 bg-neutral-900/60 p-5 rounded-xl border border-neutral-800">
          <h3 className="font-semibold text-neutral-100 mb-4">Available Units & Showcases</h3>
          <div className="space-y-3">
            {listings.map((item: any, i: number) => (
              <div key={i} className="p-4 rounded-xl bg-black/40 border border-neutral-800 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-neutral-200 text-sm">{item.name || item.title}</h4>
                  <p className="text-neutral-400 mt-1">{item.duration || item.location || item.type}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-sm text-amber-400 block">{item.price}</span>
                  <button
                    onClick={() => showToast(`Booked site visit consultation for ${item.title || item.name}`)}
                    className="mt-2 px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs"
                  >
                    Book Visit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 8. FLEET DISPATCH
  const renderFleetDispatch = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-neutral-900/60 p-5 rounded-xl border border-neutral-800">
          <h3 className="font-semibold text-neutral-100 mb-4 flex items-center justify-between">
            <span>Fleet GPS Telemetry & Active Delivery Routes</span>
            <span className="text-xs font-mono text-emerald-400">● 14 Vehicles Active</span>
          </h3>
          <div className="space-y-3">
            {[
              { id: "TRUCK-01", driver: "Gurpreet S.", route: "Bhiwandi Hub → Pune Depot", speed: "68 km/h", status: "On Route", eta: "1h 45m" },
              { id: "TRUCK-02", driver: "Mohan K.", route: "Manesar → Jaipur Industrial", speed: "72 km/h", status: "On Route", eta: "2h 10m" },
              { id: "VAN-04", driver: "Altaf R.", route: "Whitefield Cluster Delivery", speed: "24 km/h", status: "14/18 Drops Complete", eta: "45 min" },
            ].map((v) => (
              <div key={v.id} className="p-3.5 rounded-lg bg-black/40 border border-neutral-800 flex justify-between items-center text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400">{v.id}</span>
                    <span className="text-neutral-300 font-medium">({v.driver})</span>
                  </div>
                  <p className="text-neutral-400 mt-1">{v.route}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-emerald-400">{v.speed}</span>
                  <p className="text-[10px] text-neutral-500 mt-0.5">ETA: {v.eta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-neutral-900/60 p-5 rounded-xl border border-neutral-800">
          <h3 className="font-semibold text-neutral-100 mb-4 pb-2 border-b border-neutral-800">
            Dispatch Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => showToast("Emergency SOS broadcast triggered to vehicle fleet!")}
              className="w-full py-2.5 rounded-lg bg-red-600/20 border border-red-500/40 text-red-300 font-medium text-xs hover:bg-red-600/30 transition"
            >
              Broadcast Fleet Alert
            </button>
            <button
              onClick={() => showToast("Optimized multi-drop route recalculation complete!")}
              className="w-full py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs transition"
            >
              Optimize Active Routes
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 9. WAREHOUSE WMS
  const renderWarehouseWms = () => {
    return (
      <div className="bg-neutral-900/60 p-6 rounded-xl border border-neutral-800">
        <h3 className="font-semibold text-neutral-100 mb-4 flex items-center justify-between">
          <span>Multi-Bin Aisle & Wave Pick Allocation</span>
          <span className="text-xs text-neutral-400 font-mono">Facility: North Hub Tier-1</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { bin: "Aisle 04 — Rack B — Bin 12", sku: "SKU-BEARING-608ZZ", qty: 2400, lot: "LOT-2026-X8", status: "Optimal" },
            { bin: "Aisle 06 — Rack A — Bin 04", sku: "SKU-MOTOR-SERVO-400W", qty: 42, lot: "LOT-MTR-99", status: "Low Stock" },
            { bin: "Aisle 01 — Rack D — Bin 08", sku: "SKU-PNEUMATIC-VALVE-24V", qty: 380, lot: "LOT-VALVE-04", status: "Optimal" },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-black/40 border border-neutral-800 text-xs">
              <span className="font-mono text-[10px] text-amber-500 block uppercase mb-1">{item.bin}</span>
              <p className="font-bold text-neutral-200 text-sm">{item.sku}</p>
              <div className="mt-3 pt-3 border-t border-neutral-800/80 flex justify-between items-center">
                <span className="text-neutral-400">Qty: {item.qty} units</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                  item.status === "Low Stock" ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 10. KANBAN WORKFLOW
  const renderKanbanWorkflow = () => {
    const tasks: any[] = state.tasks || [
      { id: "T-1", title: "Review architectural blueprint revisions", stage: "In Progress", priority: "High" },
      { id: "T-2", title: "Conduct contractor quality snag walk", stage: "Backlog", priority: "Medium" },
      { id: "T-3", title: "Sign off supplier delivery milestone", stage: "Done", priority: "High" },
    ];

    const moveTask = (task: any, nextStage: string) => {
      setState((prev: any) => ({
        ...prev,
        tasks: (prev.tasks || tasks).map((t: any) =>
          t.id === task.id ? { ...t, stage: nextStage } : t
        ),
      }));
      showToast(`Moved "${task.title}" to ${nextStage}`);
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {["Backlog", "In Progress", "Done"].map((column) => {
          const colTasks = tasks.filter((t) => t.stage === column);
          return (
            <div key={column} className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-800">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-300">
                  {column} ({colTasks.length})
                </h4>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              </div>
              <div className="space-y-3 min-h-[220px]">
                {colTasks.map((t) => (
                  <div key={t.id} className="p-3.5 rounded-lg bg-black/40 border border-neutral-800 text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-[10px] text-neutral-500">{t.id}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300">
                        {t.priority}
                      </span>
                    </div>
                    <p className="font-medium text-neutral-200">{t.title}</p>
                    <div className="mt-3 pt-2 border-t border-neutral-800/60 flex justify-end gap-1">
                      {column !== "Done" && (
                        <button
                          onClick={() => moveTask(t, column === "Backlog" ? "In Progress" : "Done")}
                          className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px]"
                        >
                          Advance →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // 11. CRM PIPELINE
  const renderCrmPipeline = () => {
    const deals = state.deals || state.matters || state.activeTickets || [];

    return (
      <div className="bg-neutral-900/60 p-6 rounded-xl border border-neutral-800">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-neutral-100">Enterprise Opportunity Pipeline</h3>
            <p className="text-xs text-neutral-400">Multi-stage deal probability & contact records</p>
          </div>
          <span className="font-mono text-sm font-bold text-emerald-400">
            Pipeline: {state.pipelineTotal || "₹48.5L"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {deals.map((deal: any, idx: number) => (
            <div key={idx} className="p-4 rounded-xl bg-black/40 border border-neutral-800 text-xs flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300">
                  {deal.stage || deal.priority}
                </span>
                <h4 className="font-bold text-neutral-100 text-sm mt-2">{deal.account || deal.client || deal.title}</h4>
                <p className="text-neutral-400 mt-1">{deal.nextAction || deal.lead || deal.issue}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-between items-center">
                <span className="font-mono font-bold text-neutral-200">{deal.value || deal.sumInsured || deal.amount || "₹1,80,000"}</span>
                <button
                  onClick={() => showToast(`Updated deal stage for ${deal.account || deal.client || "Deal"}`)}
                  className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium"
                >
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 12. LMS LEARNING
  const renderLmsLearning = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-neutral-900/60 p-5 rounded-xl border border-neutral-800">
          <div className="h-64 rounded-xl bg-black/60 border border-neutral-800 flex items-center justify-center relative overflow-hidden mb-4">
            <Play className="w-12 h-12 text-indigo-400" />
            <span className="absolute bottom-3 left-4 text-xs font-mono text-neutral-300">
              Module 4.2: Architectural Boundary Isolation & Zero-Downtime Migration
            </span>
          </div>
          <h3 className="font-bold text-neutral-100 text-base">Advanced Enterprise Cloud Engineering</h3>
          <p className="text-xs text-neutral-400 mt-1">Instructor: Principal Architect • 42 mins remaining in module</p>
        </div>

        <div className="lg:col-span-4 bg-neutral-900/60 p-5 rounded-xl border border-neutral-800">
          <h4 className="font-semibold text-neutral-200 text-xs uppercase font-mono mb-3">Course Curriculum</h4>
          <div className="space-y-2">
            {[
              { title: "1.1 Distributed Transactions & Saga Pattern", completed: true },
              { title: "1.2 Idempotent Webhook Signature Verification", completed: true },
              { title: "2.1 Real-Time WebSocket Telemetry Streaming", completed: false, current: true },
              { title: "2.2 Zero-Trust Security Policies & RLS", completed: false },
            ].map((mod, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                  mod.current
                    ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-200 font-semibold"
                    : "bg-black/30 border-neutral-800 text-neutral-400"
                }`}
              >
                <span>{mod.title}</span>
                {mod.completed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 13. MANUFACTURING CONSOLE
  const renderManufacturingConsole = () => {
    const lines = state.lines || state.workOrders || state.smtLines || [];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-center">
            <span className="text-[10px] text-neutral-500 uppercase font-mono block">Plant OEE</span>
            <span className="text-xl font-bold font-mono text-cyan-400">84.2%</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-center">
            <span className="text-[10px] text-neutral-500 uppercase font-mono block">Availability</span>
            <span className="text-xl font-bold font-mono text-emerald-400">92.4%</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-center">
            <span className="text-[10px] text-neutral-500 uppercase font-mono block">Performance</span>
            <span className="text-xl font-bold font-mono text-amber-400">93.1%</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-center">
            <span className="text-[10px] text-neutral-500 uppercase font-mono block">Quality Yield</span>
            <span className="text-xl font-bold font-mono text-purple-400">98.0%</span>
          </div>
        </div>

        <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800">
          <h3 className="font-semibold text-neutral-100 mb-4">Shopfloor Line Telemetry</h3>
          <div className="space-y-3">
            {lines.map((line: any, idx: number) => (
              <div key={idx} className="p-4 rounded-lg bg-black/40 border border-neutral-800 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-neutral-200">{line.name || line.partName || line.job}</h4>
                  <p className="text-neutral-400 mt-0.5">{line.workCenter || line.cphCurrent || line.shift}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-cyan-400 font-bold">{line.oee || line.uptime || "Operational"}</span>
                  <button
                    onClick={() => showToast(`Logged micro-stoppage check for ${line.name || "Line"}`)}
                    className="block mt-1 text-[11px] text-amber-400 hover:underline"
                  >
                    Log Check
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 14. QUALITY INSPECTION
  const renderQualityInspection = () => {
    return (
      <div className="bg-neutral-900/60 p-6 rounded-xl border border-neutral-800">
        <h3 className="font-semibold text-neutral-100 mb-4">First-Article Dimensional Tolerance Snag Sheet</h3>
        <div className="space-y-3">
          {[
            { param: "Bore Inner Diameter (mm)", nominal: "24.000", usl: "24.015", lsl: "23.985", actual: "24.004", status: "Pass" },
            { param: "Flange Thickness (mm)", nominal: "8.500", usl: "8.520", lsl: "8.480", actual: "8.512", status: "Pass" },
            { param: "Surface Roughness (Ra µm)", nominal: "0.800", usl: "1.000", lsl: "0.400", actual: "0.740", status: "Pass" },
          ].map((check, i) => (
            <div key={i} className="p-3.5 rounded-lg bg-black/40 border border-neutral-800 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-neutral-200">{check.param}</p>
                <p className="text-neutral-500 font-mono mt-0.5">Tolerance: [{check.lsl} - {check.usl}]</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono font-bold text-neutral-300">Measured: {check.actual}</span>
                <span className="px-2 py-0.5 rounded font-mono bg-emerald-500/20 text-emerald-400 text-xs">
                  {check.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 15. DEVELOPER PORTAL
  const renderDeveloperPortal = () => {
    const [selectedLang, setSelectedLang] = useState<"curl" | "typescript" | "python">("curl");
    const endpoints = state.endpoints || [
      { method: "POST", path: "/v1/orders/create", description: "Generate instantaneous UPI payment intent order" },
      { method: "GET", path: "/v1/orders/{orderId}/status", description: "Fetch real-time settlement and UTR status" },
    ];

    const codeSnippets = {
      curl: `curl -X POST https://api.starx-alpha-labs.com/v1/orders/create \\
  -H "Authorization: Bearer sk_live_demo_9841" \\
  -H "Content-Type: application/json" \\
  -d '{"amount": 250000, "currency": "INR"}'`,
      typescript: `import { StarXClient } from "@starx/sdk";

const client = new StarXClient({ apiKey: "sk_live_demo_9841" });
const order = await client.orders.create({
  amount: 250000,
  currency: "INR",
});
console.log(order.paymentUrl);`,
      python: `import starx

starx.api_key = "sk_live_demo_9841"
order = starx.Order.create(
    amount=250000,
    currency="INR"
)
print(order.payment_url)`,
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-neutral-900/60 p-5 rounded-xl border border-neutral-800">
          <h3 className="font-semibold text-neutral-100 mb-4 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            REST API Endpoints
          </h3>
          <div className="space-y-2">
            {endpoints.map((ep: any, i: number) => (
              <div key={i} className="p-3 rounded-lg bg-black/40 border border-neutral-800 text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-1.5 py-0.5 rounded font-mono font-bold text-[10px] ${
                    ep.method === "POST" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"
                  }`}>
                    {ep.method}
                  </span>
                  <span className="font-mono text-neutral-200">{ep.path}</span>
                </div>
                <p className="text-neutral-400 mt-1">{ep.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 bg-neutral-900/60 p-5 rounded-xl border border-neutral-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-neutral-800">
              <span className="text-xs font-semibold text-neutral-200">Interactive Request Runner</span>
              <div className="flex items-center gap-1">
                {(["curl", "typescript", "python"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono capitalize transition ${
                      selectedLang === lang
                        ? "bg-emerald-500 text-black font-bold"
                        : "bg-neutral-800 text-neutral-400 hover:text-neutral-200"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <pre className="p-4 rounded-lg bg-black border border-neutral-800 text-xs font-mono text-emerald-400 overflow-x-auto">
              {codeSnippets[selectedLang]}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-800">
            <button
              onClick={() => showToast("Simulated 200 OK Response: { status: 'created', orderId: 'ord_98412' }")}
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs transition"
            >
              Send Simulated Request
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 16. NODE AUTOMATION
  const renderNodeAutomation = () => {
    return (
      <div className="bg-neutral-900/60 p-6 rounded-xl border border-neutral-800">
        <h3 className="font-semibold text-neutral-100 mb-4 flex items-center justify-between">
          <span>Visual Workflow Trigger-to-Action Canvas</span>
          <button
            onClick={() => showToast("Simulating workflow execution step-by-step...")}
            className="px-3 py-1.5 rounded-lg bg-orange-500 text-black font-bold text-xs hover:bg-orange-400 transition"
          >
            ▶ Run Test Execution
          </button>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {[
            { step: "Trigger", title: "Inbound Webhook Received", desc: "Typeform Submission" },
            { step: "Condition", title: "Deal Size > ₹10,00,000", desc: "Logic Filter" },
            { step: "Action", title: "Notify VIP Slack Channel", desc: "#executive-deals" },
            { step: "Action", title: "Assign Senior AE in CRM", desc: "Auto Task Created" },
          ].map((n, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-black/50 border border-neutral-800 text-xs relative">
              <span className="text-[10px] font-mono font-bold text-orange-400 uppercase">{n.step}</span>
              <h4 className="font-bold text-neutral-200 mt-1">{n.title}</h4>
              <p className="text-neutral-500 mt-1">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 17. ANALYTICS CANVAS
  const renderAnalyticsCanvas = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase font-mono">Current ARR</span>
            <span className="text-xl font-bold font-mono text-neutral-100 block mt-1">$2.84M</span>
            <span className="text-xs text-emerald-400 font-medium">↑ +18.4% YoY</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase font-mono">Current MRR</span>
            <span className="text-xl font-bold font-mono text-neutral-100 block mt-1">$236.8K</span>
            <span className="text-xs text-emerald-400 font-medium">↑ +8.4% MoM</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase font-mono">Net Retention (NRR)</span>
            <span className="text-xl font-bold font-mono text-blue-400 block mt-1">118.2%</span>
            <span className="text-xs text-neutral-400">Expansion Driven</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase font-mono">Gross Margin</span>
            <span className="text-xl font-bold font-mono text-emerald-400 block mt-1">82.4%</span>
            <span className="text-xs text-neutral-400">Cloud COGS Optimized</span>
          </div>
        </div>

        <div className="bg-neutral-900/60 p-6 rounded-xl border border-neutral-800">
          <h3 className="font-semibold text-neutral-100 mb-4">Cohort Retention Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400">
                  <th className="pb-2">Cohort</th>
                  <th className="pb-2">Month 0</th>
                  <th className="pb-2">Month 1</th>
                  <th className="pb-2">Month 3</th>
                  <th className="pb-2">Month 6</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {[
                  { cohort: "Jan 2026", m0: "100%", m1: "92%", m3: "88%", m6: "84%" },
                  { cohort: "Apr 2026", m0: "100%", m1: "94%", m3: "90%", m6: "86%" },
                  { cohort: "Jul 2026", m0: "100%", m1: "95%", m3: "91%", m6: "88%" },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="py-2.5 font-bold text-neutral-200">{row.cohort}</td>
                    <td className="py-2.5 text-blue-400">{row.m0}</td>
                    <td className="py-2.5 text-blue-400">{row.m1}</td>
                    <td className="py-2.5 text-blue-400">{row.m3}</td>
                    <td className="py-2.5 text-blue-400">{row.m6}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // 18. COMMUNITY FEED
  const renderCommunityFeed = () => {
    return (
      <div className="bg-neutral-900/60 p-6 rounded-xl border border-neutral-800">
        <h3 className="font-semibold text-neutral-100 mb-4 flex items-center justify-between">
          <span>Community Topic Threads & Discussions</span>
          <button
            onClick={() => showToast("Created new simulated community discussion post!")}
            className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs"
          >
            + Start Discussion
          </button>
        </h3>
        <div className="space-y-3">
          {[
            { channel: "#showcase", author: "Devendra Patel", title: "Built a real-time multiplayer whiteboard using StarX WebSockets", replies: 28, likes: 64 },
            { channel: "#help", author: "Swati Deshmukh", title: "Best practice for handling idempotent signed webhooks in Next.js 16?", replies: 12, likes: 19 },
          ].map((th, i) => (
            <div key={i} className="p-4 rounded-xl bg-black/40 border border-neutral-800 flex justify-between items-center text-xs">
              <div>
                <span className="font-mono text-[10px] text-violet-400 font-bold">{th.channel}</span>
                <h4 className="font-semibold text-neutral-200 text-sm mt-1">{th.title}</h4>
                <p className="text-neutral-500 mt-1">Posted by {th.author}</p>
              </div>
              <div className="text-right text-neutral-400">
                <span>{th.replies} replies</span> • <span>{th.likes} likes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* Top Universal Navbar */}
      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/demos/${product.categorySlug}/${product.slug}`}
              className="flex items-center gap-2 text-xs text-neutral-400 hover:text-neutral-200 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Demo Info</span>
            </Link>
            <div className="h-4 w-px bg-neutral-800" />
            <div>
              <h1 className="font-bold text-sm sm:text-base text-neutral-100 flex items-center gap-2">
                <span>{product.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                  #{product.id}
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Viewport switch */}
            <div className="hidden sm:flex items-center rounded-lg bg-neutral-900 border border-neutral-800 p-0.5">
              <button
                onClick={() => setDeviceViewport("desktop")}
                className={`p-1.5 rounded ${deviceViewport === "desktop" ? "bg-neutral-800 text-white" : "text-neutral-400"}`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeviceViewport("tablet")}
                className={`p-1.5 rounded ${deviceViewport === "tablet" ? "bg-neutral-800 text-white" : "text-neutral-400"}`}
                title="Tablet View"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeviceViewport("mobile")}
                className={`p-1.5 rounded ${deviceViewport === "mobile" ? "bg-neutral-800 text-white" : "text-neutral-400"}`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Reset */}
            <button
              onClick={resetState}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs transition"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${hasReset ? "animate-spin text-amber-400" : ""}`} />
              <span>Reset State</span>
            </button>

            {/* Consult Modal */}
            <button
              onClick={() => setCustomizationModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Deploy Solution</span>
            </button>
          </div>
        </div>

        {/* Workflow & Role Sub-Bar */}
        <div className="bg-neutral-900/60 border-t border-neutral-850 px-4 sm:px-6 lg:px-8 py-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            {/* Workflows */}
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                Workflows:
              </span>
              {product.workflows.map((wf) => (
                <button
                  key={wf.id}
                  onClick={() => {
                    setActiveWorkflowId(wf.id);
                    showToast(`Activated: ${wf.title}`);
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition ${
                    activeWorkflowId === wf.id
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-neutral-800/60 text-neutral-400 hover:text-neutral-200 border border-transparent"
                  }`}
                >
                  {wf.title}
                </button>
              ))}
            </div>

            {/* Role switch */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-400 text-[11px]">Role:</span>
              {(["admin", "staff", "customer"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setActiveRole(r);
                    showToast(`Switched perspective to ${r.toUpperCase()}`);
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono capitalize transition ${
                    activeRole === r
                      ? "bg-neutral-200 text-black font-bold"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto transition-all duration-300 ${
            deviceViewport === "mobile"
              ? "max-w-md border-x-4 border-neutral-800 rounded-3xl p-4 bg-neutral-950 shadow-2xl"
              : deviceViewport === "tablet"
              ? "max-w-3xl border-x-4 border-neutral-800 rounded-2xl p-6 bg-neutral-950 shadow-2xl"
              : "max-w-7xl"
          }`}
        >
          {/* Active Workflow Guidance Card */}
          <div className="mb-6 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
                Active Scenario • {product.categoryName} • Archetype: {product.archetype}
              </span>
              <h2 className="text-sm font-semibold text-neutral-100">
                {product.workflows.find((w) => w.id === activeWorkflowId)?.title}
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                {product.workflows.find((w) => w.id === activeWorkflowId)?.description}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-black/40 border border-neutral-800 text-[11px] font-mono text-neutral-400">
              State Isolated
            </span>
          </div>

          {/* Archetype Renderer */}
          {renderArchetypeBody()}
        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-neutral-900 border border-amber-500/50 text-white text-xs font-medium shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Customization Modal */}
      <CustomizationModal
        demo={demoModelCompat}
        isOpen={customizationModalOpen}
        onClose={() => setCustomizationModalOpen(false)}
      />
    </div>
  );
}
