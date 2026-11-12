"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChefHat,
  ClipboardList,
  Clock,
  Flame,
  LayoutGrid,
  Menu,
  Package,
  Plus,
  Receipt,
  RotateCcw,
  Search,
  Sparkles,
  Trash2,
  UserCheck,
  Users,
  Utensils,
  X,
} from "lucide-react";
import type { DemoProductDefinition } from "../../types";
import { toDemoModel } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";
import {
  VESPERA_BISTRO_SEED,
  calcCheckFinancials,
  type DiningZone,
  type KitchenStation,
  type TableStateStatus,
  type VesperaBistroState,
  type VesperaCheck,
  type VesperaMenuItem,
} from "./restaurantManagementOsData";

type VesperaView = "floor" | "kot" | "checks" | "menu" | "pantry" | "staff" | "pnl";

const NAV_VIEWS: { id: VesperaView; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "floor", label: "Floor Map", icon: LayoutGrid },
  { id: "kot", label: "Live KOT Kitchen", icon: Flame },
  { id: "checks", label: "Orders & Checks", icon: Receipt },
  { id: "menu", label: "Menu & Costing", icon: BookOpen },
  { id: "pantry", label: "Pantry Stock", icon: Package },
  { id: "staff", label: "Staff Roster", icon: Users },
  { id: "pnl", label: "Shift P&L", icon: BarChart3 },
];

export function RestaurantManagementOsApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState, hasReset } = useDemoState<VesperaBistroState>(
    product.slug,
    VESPERA_BISTRO_SEED
  );

  const [activeView, setActiveView] = useState<VesperaView>("floor");
  const [zoneFilter, setZoneFilter] = useState<"All" | DiningZone>("All");
  const [stationFilter, setStationFilter] = useState<"All" | KitchenStation>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Modals / Drawers state
  const [walkInModalOpen, setWalkInModalOpen] = useState(false);
  const [walkInForm, setWalkInForm] = useState({ tableId: "", guestName: "", partySize: "2", serverName: "Marco V." });
  const [walkInError, setWalkInError] = useState("");

  const [newOrderModalOpen, setNewOrderModalOpen] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({ tableId: "", itemId: "vm-1", qty: "1", note: "" });
  const [newOrderError, setNewOrderError] = useState("");

  const [addDishModalOpen, setAddDishModalOpen] = useState(false);
  const [dishForm, setDishForm] = useState({
    name: "",
    category: "Woodfire Mains" as VesperaMenuItem["category"],
    station: "Grill" as KitchenStation,
    price: "1150",
    recipeCost: "320",
  });
  const [dishError, setDishError] = useState("");

  const [addStaffModalOpen, setAddStaffModalOpen] = useState(false);
  const [staffForm, setStaffForm] = useState({
    name: "",
    role: "Line Server",
    department: "Front of House" as "Front of House" | "Kitchen Brigade" | "Bar & Cellar",
    zoneOrStation: "Atrium Patio",
  });
  const [staffError, setStaffError] = useState("");

  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [settleCheckTarget, setSettleCheckTarget] = useState<VesperaCheck | null>(null);
  const [checkStatusFilter, setCheckStatusFilter] = useState<"All" | VesperaCheck["status"]>("All");

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  // Derived real-time telemetry
  const telemetry = useMemo(() => {
    const activeChecks = state.checks.filter((c) => c.status !== "Settled" && c.status !== "Void");
    const settledChecks = state.checks.filter((c) => c.status === "Settled");
    const occupiedTables = state.tables.filter((t) => t.status !== "Available" && t.status !== "Cleaning");
    const openCovers = occupiedTables.reduce((s, t) => s + (t.partySize || 0), 0);
    const totalSeats = state.tables.reduce((s, t) => s + t.seats, 0);
    const shiftGross = state.checks
      .filter((c) => c.status !== "Void")
      .reduce((acc, c) => acc + calcCheckFinancials(c).total, 0);
    const lowStockItems = state.pantry.filter((p) => p.onHand <= Math.ceil(p.parLevel * 0.35));
    const eightySixCount = state.menuItems.filter((m) => !m.inStock).length;
    return {
      activeChecks,
      settledChecks,
      occupiedTablesCount: occupiedTables.length,
      openCovers,
      totalSeats,
      shiftGross,
      lowStockItems,
      eightySixCount,
      avgCheck: state.checks.length > 0 ? Math.round(shiftGross / Math.max(1, state.checks.length)) : 0,
    };
  }, [state]);

  const filteredTables = useMemo(() => {
    return state.tables.filter((t) => {
      if (zoneFilter !== "All" && t.zone !== zoneFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          t.code.toLowerCase().includes(q) ||
          (t.guestName || "").toLowerCase().includes(q) ||
          (t.serverName || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [state.tables, zoneFilter, searchQuery]);

  const filteredKotChecks = useMemo(() => {
    return telemetry.activeChecks.filter((chk) => {
      if (stationFilter !== "All") {
        const hasStationLine = chk.lines.some((l) => l.station === stationFilter);
        if (!hasStationLine) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          chk.ticketNumber.toLowerCase().includes(q) ||
          chk.tableCode.toLowerCase().includes(q) ||
          chk.guestName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [telemetry.activeChecks, stationFilter, searchQuery]);

  // Actions
  const handleBumpTicket = (checkId: string) => {
    setState((prev) => ({
      ...prev,
      checks: prev.checks.map((c) =>
        c.id === checkId
          ? {
              ...c,
              status: c.status === "Open" ? "Firing" : "Ready",
              courseLabel: c.status === "Open" ? "In Pass" : "Ready for Runner",
              lines: c.lines.map((l) => ({ ...l, bumped: true })),
            }
          : c
      ),
    }));
    notify("KOT bumped forward on kitchen pass.");
  };

  const handleSeatWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    const guest = walkInForm.guestName.trim();
    const party = Number(walkInForm.partySize);
    const chosenTable =
      state.tables.find((t) => t.id === walkInForm.tableId) ||
      state.tables.find((t) => t.status === "Available");

    if (!guest) {
      setWalkInError("Guest or party name is required.");
      return;
    }
    if (!Number.isFinite(party) || party < 1 || party > 16) {
      setWalkInError("Party size must be between 1 and 16.");
      return;
    }
    if (!chosenTable) {
      setWalkInError("No table selected or available.");
      return;
    }

    const newCheckId = `chk-${Date.now().toString().slice(-4)}`;
    const newTicket = `#${Math.floor(1050 + Math.random() * 890)}`;
    const defaultItem = state.menuItems.find((m) => m.inStock) || state.menuItems[0];

    const newCheck: VesperaCheck = {
      id: newCheckId,
      ticketNumber: newTicket,
      tableId: chosenTable.id,
      tableCode: chosenTable.code,
      guestName: guest,
      serverName: walkInForm.serverName,
      status: "Open",
      discountPct: 0,
      createdAt: "Now",
      elapsedLabel: "00:30",
      courseLabel: "Seated • Water & Menus",
      lines: defaultItem
        ? [{ itemId: defaultItem.id, name: defaultItem.name, station: defaultItem.station, qty: 1, unitPrice: defaultItem.price }]
        : [],
    };

    setState((prev) => ({
      ...prev,
      tables: prev.tables.map((t) =>
        t.id === chosenTable.id
          ? {
              ...t,
              status: "Seated",
              guestName: guest,
              partySize: party,
              serverName: walkInForm.serverName,
              elapsedMinutes: 1,
              activeCheckId: newCheckId,
            }
          : t
      ),
      checks: [newCheck, ...prev.checks],
    }));

    setWalkInModalOpen(false);
    setWalkInError("");
    setWalkInForm({ tableId: "", guestName: "", partySize: "2", serverName: "Marco V." });
    notify(`Seated ${guest} (${party}p) at ${chosenTable.code}`);
  };

  const handleCycleTableStatus = (tableId: string, nextStatus: TableStateStatus) => {
    setState((prev) => ({
      ...prev,
      tables: prev.tables.map((t) =>
        t.id === tableId
          ? {
              ...t,
              status: nextStatus,
              ...(nextStatus === "Available" ? { guestName: undefined, partySize: undefined, activeCheckId: undefined, elapsedMinutes: 0 } : {}),
            }
          : t
      ),
    }));
    notify(`Table status updated to ${nextStatus}`);
  };

  const handleAddLineToTable = (e: React.FormEvent) => {
    e.preventDefault();
    const targetTable = state.tables.find((t) => t.id === (newOrderForm.tableId || state.tables[0]?.id));
    const item = state.menuItems.find((m) => m.id === newOrderForm.itemId);
    const qty = Number(newOrderForm.qty);
    if (!targetTable) {
      setNewOrderError("Select a table.");
      return;
    }
    if (!item || !item.inStock) {
      setNewOrderError("Selected dish is 86'd / unavailable.");
      return;
    }
    if (!Number.isFinite(qty) || qty < 1) {
      setNewOrderError("Quantity must be >= 1.");
      return;
    }

    const existingCheck = state.checks.find((c) => c.id === targetTable.activeCheckId && c.status !== "Settled");
    if (existingCheck) {
      setState((prev) => ({
        ...prev,
        checks: prev.checks.map((c) =>
          c.id === existingCheck.id
            ? {
                ...c,
                status: "Firing",
                lines: [
                  ...c.lines,
                  { itemId: item.id, name: item.name, station: item.station, qty, unitPrice: item.price, note: newOrderForm.note || undefined },
                ],
              }
            : c
        ),
      }));
    } else {
      const checkId = `chk-${Date.now().toString().slice(-4)}`;
      const created: VesperaCheck = {
        id: checkId,
        ticketNumber: `#${Math.floor(1100 + Math.random() * 800)}`,
        tableId: targetTable.id,
        tableCode: targetTable.code,
        guestName: targetTable.guestName || `${targetTable.code} Guest`,
        serverName: targetTable.serverName || "Marco V.",
        status: "Firing",
        discountPct: 0,
        createdAt: "Now",
        elapsedLabel: "01:00",
        courseLabel: "Fired to Kitchen",
        lines: [{ itemId: item.id, name: item.name, station: item.station, qty, unitPrice: item.price, note: newOrderForm.note || undefined }],
      };
      setState((prev) => ({
        ...prev,
        tables: prev.tables.map((t) =>
          t.id === targetTable.id ? { ...t, status: "Entrée Fired", activeCheckId: checkId, guestName: t.guestName || "Walk-In", partySize: t.partySize || 2 } : t
        ),
        checks: [created, ...prev.checks],
      }));
    }

    setNewOrderModalOpen(false);
    setNewOrderError("");
    notify(`Fired ${qty}x ${item.name} for ${targetTable.code}`);
  };

  const handleSettleCheck = (check: VesperaCheck, method: "Card" | "UPI" | "Cash") => {
    setState((prev) => ({
      ...prev,
      checks: prev.checks.map((c) =>
        c.id === check.id ? { ...c, status: "Settled", paymentMethod: method, courseLabel: "Settled", elapsedLabel: "Paid" } : c
      ),
      tables: prev.tables.map((t) =>
        t.id === check.tableId ? { ...t, status: "Cleaning", activeCheckId: undefined } : t
      ),
    }));
    setSettleCheckTarget(null);
    notify(`${check.ticketNumber} settled via ${method} — table moved to Cleaning.`);
  };

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(dishForm.price);
    const cost = Number(dishForm.recipeCost);
    if (!dishForm.name.trim()) {
      setDishError("Dish name is required.");
      return;
    }
    if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(cost) || cost < 0) {
      setDishError("Enter valid price and recipe cost.");
      return;
    }
    const newItem: VesperaMenuItem = {
      id: `vm-${Date.now()}`,
      name: dishForm.name.trim(),
      category: dishForm.category,
      station: dishForm.station,
      price,
      recipeCost: cost,
      prepMinutes: 14,
      inStock: true,
      tags: ["Chef Feature"],
    };
    setState((prev) => ({ ...prev, menuItems: [newItem, ...prev.menuItems] }));
    setAddDishModalOpen(false);
    setDishError("");
    setDishForm({ name: "", category: "Woodfire Mains", station: "Grill", price: "1150", recipeCost: "320" });
    notify(`Added "${newItem.name}" to active menu.`);
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffForm.name.trim() || !staffForm.role.trim()) {
      setStaffError("Staff name and role are required.");
      return;
    }
    setState((prev) => ({
      ...prev,
      staff: [
        {
          id: `vs-${Date.now()}`,
          name: staffForm.name.trim(),
          role: staffForm.role.trim(),
          department: staffForm.department,
          zoneOrStation: staffForm.zoneOrStation.trim() || "Floor",
          shift: "18:00 – 00:00",
          onDuty: true,
        },
        ...prev.staff,
      ],
    }));
    setAddStaffModalOpen(false);
    setStaffError("");
    setStaffForm({ name: "", role: "Line Server", department: "Front of House", zoneOrStation: "Atrium Patio" });
    notify("Added team member to dinner roster.");
  };

  const statusTone = (status: TableStateStatus) => {
    switch (status) {
      case "Available":
        return "border-[#4CA771]/40 bg-[#171C21] text-[#7ED99F]";
      case "Seated":
        return "border-[#38BDF8]/40 bg-[#171C21] text-[#93C5FD]";
      case "Entrée Fired":
        return "border-[#D96B43]/50 bg-[#1D1715] text-[#FFB59C]";
      case "Check Dropped":
        return "border-[#E59840]/60 bg-[#211C15] text-[#FFB86D]";
      case "Cleaning":
        return "border-[#252F3A] bg-[#14181D] text-[#9BA3AF]";
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1419] text-[#F5F2EB] flex flex-col font-sans selection:bg-[#D96B43]/30">
      {/* Top Evaluation Utility + Vespera Live Service Bar */}
      <header className="sticky top-0 z-30 border-b border-[#252F3A] bg-[#0A0F14]/95 backdrop-blur-md">
        <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2 rounded border border-[#252F3A] bg-[#171C21] text-[#F5F2EB]"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            <Link
              href={`/demos/${product.categorySlug}/${product.slug}`}
              className="inline-flex items-center gap-1.5 text-xs text-[#9BA3AF] hover:text-[#F5F2EB] border border-[#252F3A] px-2.5 py-1.5 rounded bg-[#171C21]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Link>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#D96B43] text-[#0F1419] font-bold flex items-center justify-center font-mono text-sm">
                V
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold tracking-tight text-sm text-[#F5F2EB]">
                    Vespera Bistro OS
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#4CA771]/15 text-[#7ED99F] border border-[#4CA771]/35">
                    {state.serviceName}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[#9BA3AF]">
                  Covers {telemetry.openCovers}/{telemetry.totalSeats} • Gross ₹{telemetry.shiftGross.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="w-3.5 h-3.5 text-[#9BA3AF] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search table, guest, check..."
                className="pl-8 pr-3 py-1.5 w-52 text-xs rounded bg-[#171C21] border border-[#252F3A] text-[#F5F2EB] placeholder:text-[#6B7280] focus:outline-none focus:border-[#D96B43]"
              />
            </div>

            <button
              type="button"
              onClick={() => setActiveView("menu")}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono border border-[#E59840]/40 bg-[#211A14] text-[#FFB86D]"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              86 List ({telemetry.eightySixCount})
            </button>

            <button
              type="button"
              onClick={() => {
                setWalkInForm((p) => ({
                  ...p,
                  tableId: state.tables.find((t) => t.status === "Available")?.id || state.tables[0]?.id || "",
                }));
                setWalkInModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-[#D96B43] hover:bg-[#E07A5F] text-[#F5F2EB] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Seat Walk-In
            </button>

            <button
              type="button"
              onClick={() => {
                resetState();
                notify("Restored Vespera Bistro seed telemetry.");
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs border border-[#252F3A] bg-[#171C21] hover:bg-[#202934] text-[#9BA3AF] hover:text-[#F5F2EB] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {hasReset ? "Reset" : "Reset"}
            </button>

            <button
              type="button"
              onClick={() => setCustomModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs border border-[#D96B43]/40 bg-[#D96B43]/10 text-[#FFB59C] hover:bg-[#D96B43]/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Customize System
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex relative">
        {/* Left Navigation Rail */}
        <aside
          className={`${
            mobileMenuOpen ? "fixed inset-y-0 left-0 z-40 w-60 bg-[#0A0F14] pt-16 px-3 shadow-2xl" : "hidden lg:flex lg:flex-col lg:w-56"
          } border-r border-[#252F3A] bg-[#0A0F14] p-3 shrink-0 justify-between`}
        >
          <div className="space-y-1">
            {NAV_VIEWS.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-medium transition cursor-pointer ${
                    isActive
                      ? "bg-[#D96B43]/15 text-[#FFB59C] border border-[#D96B43]/45"
                      : "text-[#9BA3AF] hover:bg-[#171C21] hover:text-[#F5F2EB] border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </span>
                  {item.id === "kot" && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#D96B43] text-[#0F1419] font-bold">
                      {telemetry.activeChecks.length}
                    </span>
                  )}
                  {item.id === "pantry" && telemetry.lowStockItems.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-[#E59840]" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 p-3 rounded border border-[#252F3A] bg-[#171C21] text-[11px] space-y-1">
            <div className="flex items-center justify-between text-[#9BA3AF]">
              <span>Service Shift</span>
              <span className="font-mono text-[#7ED99F]">LIVE</span>
            </div>
            <p className="font-medium text-[#F5F2EB]">Elena Vance</p>
            <p className="text-[#9BA3AF]">Sommelier / Floor Lead</p>
          </div>
        </aside>

        {/* Center + Optional Right KOT Rail */}
        <main className="flex-1 min-w-0 p-4 md:p-6">
          {/* VIEW 1: FLOOR MAP + LIVE KOT PASS (Stitch Signature Layout) */}
          {activeView === "floor" && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
              <div className="xl:col-span-8 space-y-5">
                {/* Zone Tabs & Live Metrics Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#171C21] border border-[#252F3A] rounded-lg px-4 py-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(["All", "Main Dining", "Chef's Counter", "Atrium Patio"] as const).map((z) => (
                      <button
                        key={z}
                        type="button"
                        onClick={() => setZoneFilter(z)}
                        className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition ${
                          zoneFilter === z
                            ? "bg-[#D96B43] text-[#F5F2EB]"
                            : "bg-[#0F1419] text-[#9BA3AF] border border-[#252F3A] hover:text-[#F5F2EB]"
                        }`}
                      >
                        {z === "All" ? "All Sections" : z}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-[#7ED99F]">
                      Occupied {telemetry.occupiedTablesCount}/{state.tables.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setNewOrderForm((p) => ({ ...p, tableId: state.tables[0]?.id || "" }));
                        setNewOrderModalOpen(true);
                      }}
                      className="px-2.5 py-1 rounded border border-[#252F3A] bg-[#202934] text-[#F5F2EB] hover:border-[#D96B43] cursor-pointer"
                    >
                      + Fire Course
                    </button>
                  </div>
                </div>

                {/* Grouped Zones Floor Cards */}
                {(["Main Dining", "Chef's Counter", "Atrium Patio"] as DiningZone[])
                  .filter((z) => zoneFilter === "All" || zoneFilter === z)
                  .map((zone) => {
                    const zoneTables = filteredTables.filter((t) => t.zone === zone);
                    if (zoneTables.length === 0) return null;
                    return (
                      <section key={zone} className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-semibold tracking-tight text-[#F5F2EB] flex items-center gap-2">
                            <Utensils className="w-3.5 h-3.5 text-[#D96B43]" />
                            {zone}
                          </h2>
                          <span className="text-[11px] font-mono text-[#9BA3AF]">
                            {zoneTables.filter((t) => t.status !== "Available").length}/{zoneTables.length} active
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {zoneTables.map((table) => {
                            const check = state.checks.find((c) => c.id === table.activeCheckId && c.status !== "Settled");
                            const fin = check ? calcCheckFinancials(check) : null;
                            const isSelected = selectedTableId === table.id;
                            return (
                              <div
                                key={table.id}
                                onClick={() => setSelectedTableId(isSelected ? null : table.id)}
                                className={`rounded-lg border p-3.5 transition cursor-pointer ${statusTone(table.status)} ${
                                  isSelected ? "ring-2 ring-[#D96B43]" : "hover:border-[#374353]"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-mono font-bold text-sm text-[#F5F2EB]">{table.code}</span>
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0F1419]/80 border border-[#252F3A]">
                                    {table.seats} Top
                                  </span>
                                </div>
                                <div className="mt-2">
                                  <p className="text-xs font-semibold text-[#F5F2EB] truncate">
                                    {table.guestName || table.status}
                                  </p>
                                  <p className="text-[11px] text-[#9BA3AF] mt-0.5">
                                    {table.status === "Available"
                                      ? "Ready to seat"
                                      : `${table.partySize || table.seats}p • ${table.serverName || "Host"} • ${table.elapsedMinutes}m`}
                                  </p>
                                </div>
                                <div className="mt-3 pt-2.5 border-t border-[#252F3A]/80 flex items-center justify-between text-[11px] font-mono">
                                  <span>{check ? check.ticketNumber : table.status}</span>
                                  <span className="font-bold text-[#F5F2EB]">
                                    {fin ? `₹${fin.total.toLocaleString("en-IN")}` : "—"}
                                  </span>
                                </div>

                                {isSelected && (
                                  <div
                                    className="mt-3 pt-2.5 border-t border-[#252F3A] flex flex-wrap gap-1.5"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {table.status === "Available" ? (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setWalkInForm((p) => ({ ...p, tableId: table.id }));
                                          setWalkInModalOpen(true);
                                        }}
                                        className="px-2 py-1 rounded bg-[#D96B43] text-[#F5F2EB] text-[10px] font-semibold cursor-pointer"
                                      >
                                        Seat Guest
                                      </button>
                                    ) : (
                                      <>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setNewOrderForm((p) => ({ ...p, tableId: table.id }));
                                            setNewOrderModalOpen(true);
                                          }}
                                          className="px-2 py-1 rounded bg-[#202934] border border-[#374353] text-[#F5F2EB] text-[10px] cursor-pointer"
                                        >
                                          + Dish
                                        </button>
                                        {check && (
                                          <button
                                            type="button"
                                            onClick={() => setSettleCheckTarget(check)}
                                            className="px-2 py-1 rounded bg-[#4CA771] text-[#0F1419] font-semibold text-[10px] cursor-pointer"
                                          >
                                            Settle
                                          </button>
                                        )}
                                        <button
                                          type="button"
                                          onClick={() => handleCycleTableStatus(table.id, "Available")}
                                          className="px-2 py-1 rounded border border-[#252F3A] text-[#9BA3AF] text-[10px] cursor-pointer"
                                        >
                                          Clear
                                        </button>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
              </div>

              {/* Right Dock: Live KOT Pass + Critical 86 Alert */}
              <aside className="xl:col-span-4 space-y-4">
                <div className="rounded-lg border border-[#252F3A] bg-[#171C21] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold flex items-center gap-2">
                      <Flame className="w-4 h-4 text-[#D96B43]" />
                      Live KOT Pass ({filteredKotChecks.length})
                    </h2>
                    <button
                      type="button"
                      onClick={() => setActiveView("kot")}
                      className="text-[11px] font-mono text-[#FFB59C] hover:underline cursor-pointer"
                    >
                      Full KDS →
                    </button>
                  </div>

                  {/* Station Filter Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {(["All", "Grill", "Sauté", "Cold Bar", "Pastry"] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStationFilter(st)}
                        className={`px-2 py-1 rounded text-[11px] font-mono cursor-pointer ${
                          stationFilter === st
                            ? "bg-[#D96B43] text-[#F5F2EB]"
                            : "bg-[#0F1419] text-[#9BA3AF] border border-[#252F3A]"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                    {filteredKotChecks.map((chk) => (
                      <div key={chk.id} className="rounded border border-[#252F3A] bg-[#0F1419] p-3 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-[#F5F2EB]">
                            {chk.ticketNumber} • {chk.tableCode}
                          </span>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#E59840]/15 text-[#FFB86D] border border-[#E59840]/35">
                            {chk.elapsedLabel}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#9BA3AF]">
                          {chk.guestName} • {chk.courseLabel}
                        </p>
                        <ul className="space-y-1 text-xs border-t border-[#252F3A] pt-2">
                          {chk.lines.map((line, i) => (
                            <li key={i} className="flex items-center justify-between gap-2">
                              <span className={line.bumped ? "line-through text-[#6B7280]" : "text-[#F5F2EB]"}>
                                {line.qty}x {line.name}
                              </span>
                              <span className="text-[10px] font-mono text-[#9BA3AF]">{line.station}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={() => handleBumpTicket(chk.id)}
                          className="w-full py-1.5 rounded bg-[#D96B43] hover:bg-[#E07A5F] text-xs font-semibold text-[#F5F2EB] cursor-pointer"
                        >
                          {chk.status === "Open" ? "Fire Ticket" : chk.status === "Firing" ? "Bump to Ready" : "Complete Pass"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Critical Low Stock & 86 Monitor */}
                <div className="rounded-lg border border-[#252F3A] bg-[#171C21] p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9BA3AF]">
                      Critical 86 & Low Stock
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveView("pantry")}
                      className="text-[11px] font-mono text-[#FFB86D] hover:underline cursor-pointer"
                    >
                      Pantry →
                    </button>
                  </div>
                  {telemetry.lowStockItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs px-2.5 py-2 rounded bg-[#0F1419] border border-[#252F3A]"
                    >
                      <span className="text-[#F5F2EB] truncate pr-2">{item.name}</span>
                      <span className="font-mono text-[11px] text-[#FFB86D] shrink-0">
                        {item.onHand}/{item.parLevel} {item.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          )}

          {/* VIEW 2: FULL KOT KITCHEN */}
          {activeView === "kot" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-lg font-semibold">Live KOT Kitchen Pass</h1>
                  <p className="text-xs text-[#9BA3AF]">
                    Track station-level preparation across Grill, Sauté, Cold Bar, and Pastry.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(["All", "Grill", "Sauté", "Cold Bar", "Pastry"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStationFilter(st)}
                      className={`px-3 py-1.5 rounded text-xs font-mono cursor-pointer ${
                        stationFilter === st
                          ? "bg-[#D96B43] text-[#F5F2EB]"
                          : "bg-[#171C21] text-[#9BA3AF] border border-[#252F3A]"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredKotChecks.map((chk) => (
                  <div key={chk.id} className="rounded-lg border border-[#252F3A] bg-[#171C21] p-4 flex flex-col justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-sm">
                          {chk.ticketNumber} • Table {chk.tableCode}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#E59840]/15 text-[#FFB86D] border border-[#E59840]/40">
                          {chk.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#9BA3AF]">
                        Server: {chk.serverName} • Guest: {chk.guestName}
                      </p>
                      <div className="space-y-1.5 pt-2 border-t border-[#252F3A]">
                        {chk.lines.map((l, idx) => (
                          <div key={idx} className="flex justify-between text-xs">
                            <span>
                              {l.qty}× {l.name} {l.note ? `(${l.note})` : ""}
                            </span>
                            <span className="font-mono text-[#9BA3AF]">{l.station}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleBumpTicket(chk.id)}
                      className="w-full py-2 rounded bg-[#D96B43] hover:bg-[#E07A5F] text-xs font-semibold cursor-pointer"
                    >
                      Bump Course Ticket
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 3: ORDERS & CHECKS */}
          {activeView === "checks" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-lg font-semibold">Orders & Guest Checks</h1>
                  <p className="text-xs text-[#9BA3AF]">
                    Manage active checks, fire additional courses, apply settlements, or void cancelled tickets.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {(["All", "Open", "Firing", "Ready", "Settled"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setCheckStatusFilter(st)}
                      className={`px-2.5 py-1.5 rounded text-xs font-mono cursor-pointer ${
                        checkStatusFilter === st
                          ? "bg-[#D96B43] text-[#F5F2EB]"
                          : "bg-[#171C21] border border-[#252F3A] text-[#9BA3AF]"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setNewOrderForm((p) => ({ ...p, tableId: state.tables[0]?.id || "" }));
                      setNewOrderModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded bg-[#D96B43] text-xs font-semibold cursor-pointer inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> New Order
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-[#252F3A] bg-[#171C21] overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#252F3A] text-[#9BA3AF] font-mono bg-[#0A0F14]">
                    <tr>
                      <th className="px-4 py-3">Ticket</th>
                      <th className="px-4 py-3">Table / Guest</th>
                      <th className="px-4 py-3">Server</th>
                      <th className="px-4 py-3">Items</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Total (incl. GST)</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#252F3A]">
                    {state.checks
                      .filter((c) => checkStatusFilter === "All" || c.status === checkStatusFilter)
                      .map((chk) => {
                        const fin = calcCheckFinancials(chk);
                        return (
                          <tr key={chk.id} className="hover:bg-[#202934]/60">
                            <td className="px-4 py-3 font-mono font-bold">{chk.ticketNumber}</td>
                            <td className="px-4 py-3">
                              <span className="font-semibold">{chk.tableCode}</span> — {chk.guestName}
                            </td>
                            <td className="px-4 py-3 text-[#9BA3AF]">{chk.serverName}</td>
                            <td className="px-4 py-3">{chk.lines.reduce((s, l) => s + l.qty, 0)} items</td>
                            <td className="px-4 py-3">
                              <span className="font-mono px-2 py-0.5 rounded bg-[#0F1419] border border-[#252F3A]">
                                {chk.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right font-mono font-bold">
                              ₹{fin.total.toLocaleString("en-IN")}
                            </td>
                            <td className="px-4 py-3 text-right space-x-2">
                              {chk.status !== "Settled" && (
                                <button
                                  type="button"
                                  onClick={() => setSettleCheckTarget(chk)}
                                  className="px-2.5 py-1 rounded bg-[#4CA771] text-[#0F1419] font-semibold cursor-pointer"
                                >
                                  Settle
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  setState((prev) => ({
                                    ...prev,
                                    checks: prev.checks.filter((x) => x.id !== chk.id),
                                  }));
                                  notify(`Removed check ${chk.ticketNumber}`);
                                }}
                                className="p-1 rounded text-[#9BA3AF] hover:text-[#EF4444] cursor-pointer"
                                aria-label="Delete check"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 4: MENU & COSTING */}
          {activeView === "menu" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-lg font-semibold">Menu & Recipe Costing</h1>
                  <p className="text-xs text-[#9BA3AF]">
                    Add culinary items, inspect plate margins, and toggle real-time 86 out-of-stock status.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAddDishModalOpen(true)}
                  className="px-3 py-1.5 rounded bg-[#D96B43] text-xs font-semibold cursor-pointer inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Menu Dish
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {state.menuItems.map((dish) => {
                  const marginPct = Math.round(((dish.price - dish.recipeCost) / Math.max(1, dish.price)) * 100);
                  return (
                    <div
                      key={dish.id}
                      className={`rounded-lg border p-4 space-y-3 ${
                        dish.inStock ? "border-[#252F3A] bg-[#171C21]" : "border-[#EF4444]/40 bg-[#1B1316]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-[#9BA3AF]">
                            {dish.category} • {dish.station}
                          </span>
                          <h3 className="text-sm font-semibold mt-0.5">{dish.name}</h3>
                        </div>
                        <span className="font-mono font-bold text-sm text-[#FFB59C]">
                          ₹{dish.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono text-[#9BA3AF]">
                        <span>Food Cost: ₹{dish.recipeCost}</span>
                        <span className="text-[#7ED99F]">Margin {marginPct}%</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[#252F3A]">
                        <button
                          type="button"
                          onClick={() => {
                            setState((prev) => ({
                              ...prev,
                              menuItems: prev.menuItems.map((m) =>
                                m.id === dish.id ? { ...m, inStock: !m.inStock } : m
                              ),
                            }));
                            notify(dish.inStock ? `${dish.name} marked 86'd.` : `${dish.name} restored in stock.`);
                          }}
                          className={`px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer ${
                            dish.inStock
                              ? "bg-[#4CA771]/15 text-[#7ED99F] border border-[#4CA771]/35"
                              : "bg-[#EF4444]/20 text-[#FCA5A5] border border-[#EF4444]/40"
                          }`}
                        >
                          {dish.inStock ? "In Stock • Click to 86" : "86'd • Restore"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setState((prev) => ({
                              ...prev,
                              menuItems: prev.menuItems.filter((m) => m.id !== dish.id),
                            }));
                            notify(`Deleted ${dish.name}`);
                          }}
                          className="text-[#9BA3AF] hover:text-[#EF4444] cursor-pointer"
                          aria-label="Delete menu dish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 5: PANTRY STOCK */}
          {activeView === "pantry" && (
            <div className="space-y-4">
              <div>
                <h1 className="text-lg font-semibold">Pantry Inventory & Par Controls</h1>
                <p className="text-xs text-[#9BA3AF]">
                  Adjust real-time cold-room stock counts or replenish items below par threshold.
                </p>
              </div>
              <div className="rounded-lg border border-[#252F3A] bg-[#171C21] overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0A0F14] border-b border-[#252F3A] font-mono text-[#9BA3AF]">
                    <tr>
                      <th className="px-4 py-3">Ingredient</th>
                      <th className="px-4 py-3">Supplier</th>
                      <th className="px-4 py-3">On Hand</th>
                      <th className="px-4 py-3">Par Level</th>
                      <th className="px-4 py-3">Unit Cost</th>
                      <th className="px-4 py-3 text-right">Quick Adjust</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#252F3A]">
                    {state.pantry.map((p) => {
                      const low = p.onHand <= Math.ceil(p.parLevel * 0.35);
                      return (
                        <tr key={p.id}>
                          <td className="px-4 py-3 font-medium">
                            {p.name}{" "}
                            {low && (
                              <span className="ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#E59840]/15 text-[#FFB86D]">
                                LOW
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-[#9BA3AF]">{p.supplier}</td>
                          <td className="px-4 py-3 font-mono">
                            {p.onHand} {p.unit}
                          </td>
                          <td className="px-4 py-3 font-mono text-[#9BA3AF]">
                            {p.parLevel} {p.unit}
                          </td>
                          <td className="px-4 py-3 font-mono">₹{p.unitCost}</td>
                          <td className="px-4 py-3 text-right space-x-1.5">
                            <button
                              type="button"
                              onClick={() =>
                                setState((prev) => ({
                                  ...prev,
                                  pantry: prev.pantry.map((x) =>
                                    x.id === p.id ? { ...x, onHand: Math.max(0, x.onHand - 1) } : x
                                  ),
                                }))
                              }
                              className="px-2 py-1 rounded bg-[#0F1419] border border-[#252F3A] font-mono cursor-pointer"
                            >
                              -1
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setState((prev) => ({
                                  ...prev,
                                  pantry: prev.pantry.map((x) =>
                                    x.id === p.id ? { ...x, onHand: x.parLevel } : x
                                  ),
                                }));
                                notify(`Replenished ${p.name} to par (${p.parLevel}).`);
                              }}
                              className="px-2.5 py-1 rounded bg-[#4CA771] text-[#0F1419] font-semibold cursor-pointer"
                            >
                              Restock Par
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 6: STAFF ROSTER */}
          {activeView === "staff" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-lg font-semibold">Service & Brigade Shift Roster</h1>
                  <p className="text-xs text-[#9BA3AF]">
                    Track floor captains, kitchen station chefs, and active shift duty status.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAddStaffModalOpen(true)}
                  className="px-3 py-1.5 rounded bg-[#D96B43] text-xs font-semibold cursor-pointer inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Staff
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {state.staff.map((m) => (
                  <div key={m.id} className="rounded-lg border border-[#252F3A] bg-[#171C21] p-4 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{m.name}</span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            m.onDuty ? "bg-[#4CA771]/15 text-[#7ED99F]" : "bg-[#252F3A] text-[#9BA3AF]"
                          }`}
                        >
                          {m.onDuty ? "ON DUTY" : "OFF SHIFT"}
                        </span>
                      </div>
                      <p className="text-xs text-[#FFB59C] mt-1">{m.role}</p>
                      <p className="text-xs text-[#9BA3AF] mt-1">
                        {m.department} • {m.zoneOrStation} ({m.shift})
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          staff: prev.staff.map((s) => (s.id === m.id ? { ...s, onDuty: !s.onDuty } : s)),
                        }))
                      }
                      className="w-full py-1.5 rounded border border-[#252F3A] bg-[#0F1419] hover:border-[#D96B43] text-xs cursor-pointer"
                    >
                      Toggle Duty Clock
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 7: SHIFT P&L ANALYTICS */}
          {activeView === "pnl" && (
            <div className="space-y-5">
              <div>
                <h1 className="text-lg font-semibold">Live Shift P&L & Velocity Telemetry</h1>
                <p className="text-xs text-[#9BA3AF]">
                  Recalculates dynamically from all live floor covers, open tickets, and settled checks.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-lg border border-[#252F3A] bg-[#171C21] p-4">
                  <p className="text-xs text-[#9BA3AF]">Shift Gross Revenue</p>
                  <p className="text-2xl font-mono font-bold mt-1 text-[#F5F2EB]">
                    ₹{telemetry.shiftGross.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="rounded-lg border border-[#252F3A] bg-[#171C21] p-4">
                  <p className="text-xs text-[#9BA3AF]">Average Check Ticket</p>
                  <p className="text-2xl font-mono font-bold mt-1 text-[#FFB59C]">
                    ₹{telemetry.avgCheck.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="rounded-lg border border-[#252F3A] bg-[#171C21] p-4">
                  <p className="text-xs text-[#9BA3AF]">Active Covers Seated</p>
                  <p className="text-2xl font-mono font-bold mt-1 text-[#7ED99F]">
                    {telemetry.openCovers} / {telemetry.totalSeats}
                  </p>
                </div>
                <div className="rounded-lg border border-[#252F3A] bg-[#171C21] p-4">
                  <p className="text-xs text-[#9BA3AF]">Settled Checks</p>
                  <p className="text-2xl font-mono font-bold mt-1 text-[#F5F2EB]">
                    {telemetry.settledChecks.length} / {state.checks.length}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-[#252F3A] bg-[#171C21] p-5 space-y-3">
                <h2 className="text-sm font-semibold">Station Load Distribution</h2>
                {(["Grill", "Sauté", "Cold Bar", "Pastry"] as KitchenStation[]).map((station) => {
                  const qty = state.checks
                    .flatMap((c) => c.lines)
                    .filter((l) => l.station === station)
                    .reduce((s, l) => s + l.qty, 0);
                  const pct = Math.min(100, Math.round((qty / 16) * 100));
                  return (
                    <div key={station} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span>{station}</span>
                        <span>{qty} plates fired</span>
                      </div>
                      <div className="h-2 rounded bg-[#0F1419] overflow-hidden">
                        <div className="h-full bg-[#D96B43]" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Seat Walk-In Modal */}
      {walkInModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <form
            onSubmit={handleSeatWalkIn}
            className="w-full max-w-md rounded-lg border border-[#374353] bg-[#171C21] p-5 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Seat Walk-In Party</h3>
              <button type="button" onClick={() => setWalkInModalOpen(false)} className="text-[#9BA3AF] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            {walkInError && <p className="text-xs text-[#FCA5A5] bg-[#EF4444]/15 p-2 rounded">{walkInError}</p>}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#9BA3AF] mb-1">Select Table</label>
                <select
                  value={walkInForm.tableId}
                  onChange={(e) => setWalkInForm((p) => ({ ...p, tableId: e.target.value }))}
                  className="w-full px-3 py-2 rounded bg-[#0F1419] border border-[#252F3A] text-[#F5F2EB]"
                >
                  {state.tables.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.code} — {t.zone} ({t.seats} top • {t.status})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#9BA3AF] mb-1">Guest Name</label>
                <input
                  type="text"
                  value={walkInForm.guestName}
                  onChange={(e) => setWalkInForm((p) => ({ ...p, guestName: e.target.value }))}
                  placeholder="e.g. Kapoor Party"
                  className="w-full px-3 py-2 rounded bg-[#0F1419] border border-[#252F3A] text-[#F5F2EB]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#9BA3AF] mb-1">Covers</label>
                  <input
                    type="number"
                    min={1}
                    max={16}
                    value={walkInForm.partySize}
                    onChange={(e) => setWalkInForm((p) => ({ ...p, partySize: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-[#0F1419] border border-[#252F3A] text-[#F5F2EB]"
                  />
                </div>
                <div>
                  <label className="block text-[#9BA3AF] mb-1">Assigned Server</label>
                  <input
                    type="text"
                    value={walkInForm.serverName}
                    onChange={(e) => setWalkInForm((p) => ({ ...p, serverName: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-[#0F1419] border border-[#252F3A] text-[#F5F2EB]"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setWalkInModalOpen(false)}
                className="px-3 py-1.5 rounded border border-[#252F3A] text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#D96B43] text-xs font-semibold cursor-pointer"
              >
                Confirm Seating
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Fire Course / New Order Modal */}
      {newOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddLineToTable}
            className="w-full max-w-md rounded-lg border border-[#374353] bg-[#171C21] p-5 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Fire Dish to Kitchen Pass</h3>
              <button type="button" onClick={() => setNewOrderModalOpen(false)} className="text-[#9BA3AF] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            {newOrderError && <p className="text-xs text-[#FCA5A5] bg-[#EF4444]/15 p-2 rounded">{newOrderError}</p>}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#9BA3AF] mb-1">Table</label>
                <select
                  value={newOrderForm.tableId}
                  onChange={(e) => setNewOrderForm((p) => ({ ...p, tableId: e.target.value }))}
                  className="w-full px-3 py-2 rounded bg-[#0F1419] border border-[#252F3A] text-[#F5F2EB]"
                >
                  {state.tables.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.code} ({t.guestName || t.status})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#9BA3AF] mb-1">Dish</label>
                <select
                  value={newOrderForm.itemId}
                  onChange={(e) => setNewOrderForm((p) => ({ ...p, itemId: e.target.value }))}
                  className="w-full px-3 py-2 rounded bg-[#0F1419] border border-[#252F3A] text-[#F5F2EB]"
                >
                  {state.menuItems.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} — ₹{m.price} {!m.inStock ? "(86'd)" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#9BA3AF] mb-1">Qty</label>
                  <input
                    type="number"
                    min={1}
                    value={newOrderForm.qty}
                    onChange={(e) => setNewOrderForm((p) => ({ ...p, qty: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-[#0F1419] border border-[#252F3A] text-[#F5F2EB]"
                  />
                </div>
                <div>
                  <label className="block text-[#9BA3AF] mb-1">Modifier Note</label>
                  <input
                    type="text"
                    value={newOrderForm.note}
                    onChange={(e) => setNewOrderForm((p) => ({ ...p, note: e.target.value }))}
                    placeholder="No shallot / allergy"
                    className="w-full px-3 py-2 rounded bg-[#0F1419] border border-[#252F3A] text-[#F5F2EB]"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setNewOrderModalOpen(false)} className="px-3 py-1.5 rounded border border-[#252F3A] text-xs cursor-pointer">
                Cancel
              </button>
              <button type="submit" className="px-4 py-1.5 rounded bg-[#D96B43] text-xs font-semibold cursor-pointer">
                Fire KOT
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Settle Check Modal */}
      {settleCheckTarget && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-lg border border-[#374353] bg-[#171C21] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Settle {settleCheckTarget.ticketNumber}</h3>
              <button type="button" onClick={() => setSettleCheckTarget(null)} className="text-[#9BA3AF] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs space-y-1 bg-[#0F1419] p-3 rounded border border-[#252F3A] font-mono">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{calcCheckFinancials(settleCheckTarget).subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[#9BA3AF]">
                <span>GST (5%)</span>
                <span>₹{calcCheckFinancials(settleCheckTarget).gst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#FFB59C] pt-1 border-t border-[#252F3A]">
                <span>Total Due</span>
                <span>₹{calcCheckFinancials(settleCheckTarget).total.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <p className="text-[11px] text-[#9BA3AF]">
              Simulated Sandbox Tender — updates local check ledger & floor table state.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(["UPI", "Card", "Cash"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleSettleCheck(settleCheckTarget, m)}
                  className="py-2 rounded bg-[#4CA771] hover:bg-[#5ec186] text-[#0F1419] text-xs font-bold cursor-pointer"
                >
                  Pay {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Menu Dish Modal */}
      {addDishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <form onSubmit={handleCreateDish} className="w-full max-w-md rounded-lg border border-[#374353] bg-[#171C21] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Add Dish to Vespera Menu</h3>
              <button type="button" onClick={() => setAddDishModalOpen(false)} className="text-[#9BA3AF] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            {dishError && <p className="text-xs text-[#FCA5A5] bg-[#EF4444]/15 p-2 rounded">{dishError}</p>}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#9BA3AF] mb-1">Dish Name</label>
                <input
                  type="text"
                  value={dishForm.name}
                  onChange={(e) => setDishForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Charred Octopus & Romesco"
                  className="w-full px-3 py-2 rounded bg-[#0F1419] border border-[#252F3A] text-[#F5F2EB]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#9BA3AF] mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={dishForm.price}
                    onChange={(e) => setDishForm((p) => ({ ...p, price: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-[#0F1419] border border-[#252F3A] text-[#F5F2EB]"
                  />
                </div>
                <div>
                  <label className="block text-[#9BA3AF] mb-1">Recipe Cost (₹)</label>
                  <input
                    type="number"
                    value={dishForm.recipeCost}
                    onChange={(e) => setDishForm((p) => ({ ...p, recipeCost: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-[#0F1419] border border-[#252F3A] text-[#F5F2EB]"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setAddDishModalOpen(false)} className="px-3 py-1.5 rounded border border-[#252F3A] text-xs cursor-pointer">
                Cancel
              </button>
              <button type="submit" className="px-4 py-1.5 rounded bg-[#D96B43] text-xs font-semibold cursor-pointer">
                Save Dish
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Staff Modal */}
      {addStaffModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <form onSubmit={handleAddStaff} className="w-full max-w-md rounded-lg border border-[#374353] bg-[#171C21] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Add Team Member</h3>
              <button type="button" onClick={() => setAddStaffModalOpen(false)} className="text-[#9BA3AF] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            {staffError && <p className="text-xs text-[#FCA5A5] bg-[#EF4444]/15 p-2 rounded">{staffError}</p>}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#9BA3AF] mb-1">Full Name</label>
                <input
                  type="text"
                  value={staffForm.name}
                  onChange={(e) => setStaffForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Rohan Verma"
                  className="w-full px-3 py-2 rounded bg-[#0F1419] border border-[#252F3A] text-[#F5F2EB]"
                />
              </div>
              <div>
                <label className="block text-[#9BA3AF] mb-1">Role</label>
                <input
                  type="text"
                  value={staffForm.role}
                  onChange={(e) => setStaffForm((p) => ({ ...p, role: e.target.value }))}
                  className="w-full px-3 py-2 rounded bg-[#0F1419] border border-[#252F3A] text-[#F5F2EB]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setAddStaffModalOpen(false)} className="px-3 py-1.5 rounded border border-[#252F3A] text-xs cursor-pointer">
                Cancel
              </button>
              <button type="submit" className="px-4 py-1.5 rounded bg-[#D96B43] text-xs font-semibold cursor-pointer">
                Add to Roster
              </button>
            </div>
          </form>
        </div>
      )}

      <CustomizationModal demo={toDemoModel(product)} isOpen={customModalOpen} onClose={() => setCustomModalOpen(false)} />

      {toast && (
        <div className="fixed bottom-4 right-4 z-50 px-4 py-2.5 rounded-lg border border-[#D96B43]/50 bg-[#171C21] text-xs font-medium text-[#F5F2EB] shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#7ED99F]" />
          {toast}
        </div>
      )}
    </div>
  );
}
