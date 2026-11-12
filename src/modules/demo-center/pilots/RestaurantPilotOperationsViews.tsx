"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChefHat,
  Clock,
  Edit3,
  Eye,
  Flame,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  TrendingUp,
  Utensils,
  XCircle,
} from "lucide-react";
import {
  PILOT_FORMAT_CURRENCY,
  getOrderTotals,
  type ComputedPilotMetrics,
  type OrderChannel,
  type OrderStatus,
  type PaymentMethod,
  type PilotCategory,
  type PilotMenuItem,
  type PilotOrder,
  type PilotOrderItem,
  type PilotScreenId,
  type RestaurantPilotState,
} from "./restaurantPilotData";
import {
  PILOT_CARD_CLASS,
  PILOT_INPUT_CLASS,
  PILOT_PRIMARY_BTN_CLASS,
  PILOT_SECONDARY_BTN_CLASS,
  PILOT_SOFT_SURFACE_CLASS,
  PilotModal,
  PilotSectionHeader,
  PilotStatusBadge,
} from "./restaurantPilotUiPrimitives";

export interface PilotViewProps {
  state: RestaurantPilotState;
  metrics: ComputedPilotMetrics;
  onNavigate: (screen: PilotScreenId, contextOrderId?: string) => void;
  onLogActivity: (summary: string, module: "Orders" | "Kitchen" | "Tables" | "Reservations" | "Inventory" | "Settings") => void;
  onUpdateState: (updater: (prev: RestaurantPilotState) => RestaurantPilotState, toast?: string) => void;
}

function nowTimeStamp() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

/* -------------------------------------------------------------------------- */
/* 1. DASHBOARD OVERVIEW                                                      */
/* -------------------------------------------------------------------------- */

export function DashboardOverviewView({
  state,
  metrics,
  onNavigate,
}: PilotViewProps) {
  const curr = state.settings.currencySymbol;
  const maxPeriodRev = Math.max(...metrics.servicePeriods.map((p) => p.revenue), 1);

  return (
    <div className="space-y-6">
      <PilotSectionHeader
        eyebrow="Live Floor & Kitchen Telemetry"
        title={`${state.settings.restaurantName} — Executive Overview`}
        subtitle="Real-time dining metrics computed directly from active orders, floor seating, and cellar inventory."
        actions={
          <>
            <button
              type="button"
              onClick={() => onNavigate("orders-management")}
              className={PILOT_PRIMARY_BTN_CLASS}
            >
              <Plus className="w-3.5 h-3.5" />
              New KOT Order
            </button>
            <button
              type="button"
              onClick={() => onNavigate("table-management")}
              className={PILOT_SECONDARY_BTN_CLASS}
            >
              Floor Plan ({metrics.occupiedTables}/{metrics.totalTables})
            </button>
          </>
        }
      />

      {/* Primary KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className={`${PILOT_CARD_CLASS} p-5`}>
          <div className="flex items-center justify-between text-xs text-[#4D4540] mb-2">
            <span>Today&apos;s Gross Revenue</span>
            <span className="p-1.5 rounded-lg bg-orange-50 text-[#C2410C]">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1C1917] font-mono tabular-nums">
            {PILOT_FORMAT_CURRENCY(metrics.grossRevenue, curr)}
          </div>
          <p className="text-xs text-[#15803D] font-medium mt-1.5">
            Net Excl. Tax: {PILOT_FORMAT_CURRENCY(metrics.netRevenueExclTax, curr)}
          </p>
        </div>

        <div className={`${PILOT_CARD_CLASS} p-5`}>
          <div className="flex items-center justify-between text-xs text-[#4D4540] mb-2">
            <span>Today&apos;s Orders</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1C1917] font-mono tabular-nums">
            {state.orders.length - metrics.cancelledOrdersCount}
            <span className="text-sm font-normal text-[#4D4540] ml-2">
              ({metrics.activeOrdersCount} live)
            </span>
          </div>
          <p className="text-xs text-[#4D4540] mt-1.5">
            Served: {metrics.servedOrdersCount} • Cancelled: {metrics.cancelledOrdersCount}
          </p>
        </div>

        <div className={`${PILOT_CARD_CLASS} p-5`}>
          <div className="flex items-center justify-between text-xs text-[#4D4540] mb-2">
            <span>Average Guest Check</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-[#15803D]">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1C1917] font-mono tabular-nums">
            {PILOT_FORMAT_CURRENCY(metrics.averageTicket, curr)}
          </div>
          <p className="text-xs text-[#4D4540] mt-1.5">
            Includes {state.settings.serviceChargePercent}% service &amp; {state.settings.gstRatePercent}% GST
          </p>
        </div>

        <div className={`${PILOT_CARD_CLASS} p-5`}>
          <div className="flex items-center justify-between text-xs text-[#4D4540] mb-2">
            <span>Floor Occupancy &amp; Alerts</span>
            <span className="p-1.5 rounded-lg bg-[#F6F3EE] text-[#1C1917]">
              <Utensils className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1C1917] font-mono tabular-nums">
            {metrics.occupancyPct}%
            <span className="text-sm font-normal text-[#4D4540] ml-2">
              ({metrics.occupiedTables}/{metrics.totalTables} tables)
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("inventory")}
            className="mt-1.5 text-xs font-semibold text-[#C2410C] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            {metrics.lowStockItems.length} Pantry Low-Stock Alerts
          </button>
        </div>
      </div>

      {/* Middle Row: Revenue Overview + Popular Dishes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className={`${PILOT_CARD_CLASS} p-5 lg:col-span-7`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-[#1C1917]">Service Revenue Overview</h3>
              <p className="text-xs text-[#4D4540]">Revenue curve across service shifts (live from orders)</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("sales-analytics")}
              className="text-xs font-semibold text-[#C2410C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Full Analytics <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3.5">
            {metrics.servicePeriods.map((period) => {
              const widthPct = Math.max(6, Math.round((period.revenue / maxPeriodRev) * 100));
              return (
                <div key={period.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#1C1917]">{period.label}</span>
                    <span className="font-mono tabular-nums text-[#4D4540]">
                      {period.orders} orders •{" "}
                      <strong className="text-[#1C1917]">{PILOT_FORMAT_CURRENCY(period.revenue, curr)}</strong>
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-[#F0EDE9] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#C2410C] to-[#EA580C] transition-all duration-500"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${PILOT_CARD_CLASS} p-5 lg:col-span-5`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-[#1C1917]">Popular Dishes</h3>
              <p className="text-xs text-[#4D4540]">Top ordered items today</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("menu-management")}
              className="text-xs font-semibold text-[#C2410C] hover:underline cursor-pointer"
            >
              Manage Menu
            </button>
          </div>
          <div className="space-y-2.5">
            {metrics.popularDishes.slice(0, 5).map((dish, idx) => (
              <div
                key={dish.menuItemId}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#FCF9F4] border border-[#E7E2DA]"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#C2410C] font-bold">#{idx + 1}</span>
                    <p className="text-xs font-semibold text-[#1C1917] truncate">{dish.name}</p>
                  </div>
                  <p className="text-[11px] text-[#4D4540] ml-6">{dish.categoryName}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold font-mono tabular-nums text-[#1C1917]">
                    {PILOT_FORMAT_CURRENCY(dish.revenue, curr)}
                  </p>
                  <p className="text-[11px] text-[#15803D] font-mono tabular-nums">{dish.unitsSold} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Today's Orders + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className={`${PILOT_CARD_CLASS} p-5 lg:col-span-7 overflow-hidden`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[#1C1917]">Today&apos;s Active &amp; Recent Orders</h3>
            <button
              type="button"
              onClick={() => onNavigate("orders-management")}
              className="text-xs font-semibold text-[#C2410C] hover:underline cursor-pointer"
            >
              View All ({state.orders.length})
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E7E2DA] text-[#4D4540]">
                  <th className="pb-2.5 font-semibold">KOT</th>
                  <th className="pb-2.5 font-semibold">Guest / Table</th>
                  <th className="pb-2.5 font-semibold">Status</th>
                  <th className="pb-2.5 font-semibold text-right">Total</th>
                  <th className="pb-2.5 font-semibold text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EDE9]">
                {state.orders.slice(0, 6).map((ord) => {
                  const totals = getOrderTotals(ord, state.settings);
                  return (
                    <tr key={ord.id} className="hover:bg-[#FCF9F4] transition-colors">
                      <td className="py-2.5 font-mono font-semibold text-[#1C1917]">{ord.orderNumber}</td>
                      <td className="py-2.5">
                        <div className="font-medium text-[#1C1917]">{ord.customerName}</div>
                        <div className="text-[11px] text-[#4D4540]">
                          {ord.tableCode} • {ord.channel}
                        </div>
                      </td>
                      <td className="py-2.5">
                        <PilotStatusBadge status={ord.status} />
                      </td>
                      <td className="py-2.5 text-right font-mono tabular-nums font-semibold text-[#1C1917]">
                        {PILOT_FORMAT_CURRENCY(totals.total, curr)}
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => onNavigate("order-details", ord.id)}
                          className="text-[#C2410C] hover:underline font-semibold cursor-pointer"
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${PILOT_CARD_CLASS} p-5 lg:col-span-5`}>
          <h3 className="text-base font-semibold text-[#1C1917] mb-4">Recent Kitchen &amp; Floor Activity</h3>
          <div className="space-y-3">
            {state.activityLog.slice(0, 6).map((entry) => (
              <div key={entry.id} className="flex items-start gap-3 text-xs">
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#F6F3EE] border border-[#E7E2DA] text-[#4D4540] shrink-0">
                  {entry.timestamp}
                </span>
                <div className="min-w-0">
                  <p className="text-[#1C1917] leading-snug">{entry.summary}</p>
                  <p className="text-[11px] text-[#78716C] mt-0.5">
                    {entry.actor} • {entry.module}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. ORDERS MANAGEMENT                                                       */
/* -------------------------------------------------------------------------- */

const ORDER_STATUSES: OrderStatus[] = ["New", "Preparing", "Ready", "Served", "Cancelled"];

export function OrdersManagementView({
  state,
  onNavigate,
  onLogActivity,
  onUpdateState,
}: PilotViewProps) {
  const curr = state.settings.currencySymbol;
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [channelFilter, setChannelFilter] = useState<string>("All");
  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);

  const [formCustomerId, setFormCustomerId] = useState(state.customers[0]?.id || "");
  const [formChannel, setFormChannel] = useState<OrderChannel>("Dine-In");
  const [formTableId, setFormTableId] = useState(state.tables[0]?.id || "");
  const [formPaymentMethod, setFormPaymentMethod] = useState<PaymentMethod>("Card");
  const [formNotes, setFormNotes] = useState("");
  const [formItems, setFormItems] = useState<PilotOrderItem[]>(() =>
    state.menuItems[0]
      ? [{ menuItemId: state.menuItems[0].id, name: state.menuItems[0].name, qty: 1, unitPrice: state.menuItems[0].price }]
      : []
  );

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    return state.orders.filter((o) => {
      if (statusFilter !== "All" && o.status !== statusFilter) return false;
      if (channelFilter !== "All" && o.channel !== channelFilter) return false;
      if (!q) return true;
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.tableCode.toLowerCase().includes(q) ||
        o.items.some((i) => i.name.toLowerCase().includes(q))
      );
    });
  }, [state.orders, search, statusFilter, channelFilter]);

  const openCreateModal = () => {
    const firstAvailDish = state.menuItems.find((m) => m.available) || state.menuItems[0];
    setEditingOrderId(null);
    setFormCustomerId(state.customers[0]?.id || "");
    setFormChannel("Dine-In");
    setFormTableId(state.tables.find((t) => t.status === "Available")?.id || state.tables[0]?.id || "");
    setFormPaymentMethod("Card");
    setFormNotes("");
    setFormItems(
      firstAvailDish
        ? [{ menuItemId: firstAvailDish.id, name: firstAvailDish.name, qty: 1, unitPrice: firstAvailDish.price }]
        : []
    );
    setModalMode("create");
  };

  const openEditModal = (order: PilotOrder) => {
    setEditingOrderId(order.id);
    setFormCustomerId(order.customerId || "");
    setFormChannel(order.channel);
    setFormTableId(order.tableId || "");
    setFormPaymentMethod(order.paymentMethod);
    setFormNotes(order.specialInstructions);
    setFormItems(order.items.map((item) => ({ ...item })));
    setModalMode("edit");
  };

  const handleDishQty = (dish: PilotMenuItem, delta: number) => {
    setFormItems((prev) => {
      const idx = prev.findIndex((i) => i.menuItemId === dish.id);
      if (idx === -1 && delta > 0) {
        return [...prev, { menuItemId: dish.id, name: dish.name, qty: 1, unitPrice: dish.price }];
      }
      if (idx === -1) return prev;
      const nextQty = prev[idx].qty + delta;
      if (nextQty <= 0) {
        return prev.filter((i) => i.menuItemId !== dish.id);
      }
      return prev.map((i, k) => (k === idx ? { ...i, qty: nextQty } : i));
    });
  };

  const handleSaveOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (formItems.length === 0) return;
    const customer = state.customers.find((c) => c.id === formCustomerId);
    const table = formChannel === "Dine-In" ? state.tables.find((t) => t.id === formTableId) : null;
    const stamp = nowTimeStamp();

    if (modalMode === "create") {
      const nextNum = 1043 + state.orders.length;
      const newOrder: PilotOrder = {
        id: `ord-${Date.now()}`,
        orderNumber: `KOT-${nextNum}`,
        customerId: customer?.id || null,
        customerName: customer?.name || "Walk-In Guest",
        tableId: table?.id || null,
        tableCode: table ? table.code : formChannel === "Delivery" ? `DLV-${nextNum % 99}` : `PKP-${nextNum % 99}`,
        channel: formChannel,
        status: "New",
        paymentMethod: formPaymentMethod,
        paymentStatus: "Pending",
        items: formItems,
        specialInstructions: formNotes.trim(),
        assignedStaff: table?.serverName || state.staff[0]?.name || "Kabir Sen",
        createdAt: stamp,
        updatedAt: stamp,
      };
      onUpdateState(
        (prev) => ({
          ...prev,
          orders: [newOrder, ...prev.orders],
          tables: table
            ? prev.tables.map((t) => (t.id === table.id ? { ...t, status: "Occupied", seatedAt: stamp } : t))
            : prev.tables,
        }),
        `Created ${newOrder.orderNumber} for ${newOrder.customerName}`
      );
      onLogActivity(`Created ${newOrder.orderNumber} (${newOrder.tableCode})`, "Orders");
    } else if (modalMode === "edit" && editingOrderId) {
      onUpdateState(
        (prev) => ({
          ...prev,
          orders: prev.orders.map((o) =>
            o.id === editingOrderId
              ? {
                  ...o,
                  customerId: customer?.id || null,
                  customerName: customer?.name || o.customerName,
                  channel: formChannel,
                  tableId: table?.id || null,
                  tableCode: table ? table.code : o.tableCode,
                  paymentMethod: formPaymentMethod,
                  items: formItems,
                  specialInstructions: formNotes.trim(),
                  updatedAt: stamp,
                }
              : o
          ),
        }),
        "Order updated successfully"
      );
      onLogActivity(`Edited order details (${editingOrderId})`, "Orders");
    }
    setModalMode(null);
  };

  const handleStatusChange = (orderId: string, nextStatus: OrderStatus) => {
    const target = state.orders.find((o) => o.id === orderId);
    if (!target) return;
    const stamp = nowTimeStamp();
    onUpdateState(
      (prev) => ({
        ...prev,
        orders: prev.orders.map((o) =>
          o.id === orderId
            ? {
                ...o,
                status: nextStatus,
                paymentStatus: nextStatus === "Served" ? "Paid" : nextStatus === "Cancelled" ? "Refunded" : o.paymentStatus,
                updatedAt: stamp,
              }
            : o
        ),
      }),
      `${target.orderNumber} marked ${nextStatus}`
    );
    onLogActivity(`${target.orderNumber} moved to ${nextStatus}`, "Orders");
  };

  return (
    <div className="space-y-5">
      <PilotSectionHeader
        eyebrow="Kitchen Order Tickets & Service Queue"
        title="Orders Management"
        subtitle="Create multi-course tickets, modify dishes live, advance kitchen stages, or inspect itemized bills."
        actions={
          <button type="button" onClick={openCreateModal} className={PILOT_PRIMARY_BTN_CLASS}>
            <Plus className="w-3.5 h-3.5" /> Create Order
          </button>
        }
      />

      {/* Search & Filters */}
      <div className={`${PILOT_CARD_CLASS} p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between`}>
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search KOT #, guest name, table, or dish..."
            className={`${PILOT_INPUT_CLASS} pl-9`}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(["All", ...ORDER_STATUSES] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                statusFilter === st
                  ? "bg-[#C2410C] text-white border-[#C2410C]"
                  : "bg-[#FCF9F4] text-[#4D4540] border-[#E7E2DA] hover:bg-[#F0EDE9]"
              }`}
            >
              {st}
            </button>
          ))}
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            aria-label="Filter by channel"
            className="px-3 py-1.5 rounded-lg bg-[#FCF9F4] border border-[#E7E2DA] text-xs font-semibold text-[#1C1917]"
          >
            <option value="All">All Channels</option>
            <option value="Dine-In">Dine-In</option>
            <option value="Takeaway">Takeaway</option>
            <option value="Delivery">Delivery</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOrders.map((ord) => {
          const totals = getOrderTotals(ord, state.settings);
          return (
            <div key={ord.id} className={`${PILOT_CARD_CLASS} p-4 sm:p-5 flex flex-col justify-between gap-4`}>
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#F0EDE9]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#1C1917]">{ord.orderNumber}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#F6F3EE] border border-[#E7E2DA] font-mono text-[#4D4540]">
                        {ord.tableCode}
                      </span>
                      <span className="text-[11px] text-[#78716C]">{ord.channel}</span>
                    </div>
                    <p className="text-sm font-semibold text-[#1C1917] mt-1">{ord.customerName}</p>
                    <p className="text-[11px] text-[#4D4540]">
                      Server: {ord.assignedStaff} • Opened {ord.createdAt}
                    </p>
                  </div>
                  <div className="text-right">
                    <PilotStatusBadge status={ord.status} />
                    <div className="text-base font-bold font-mono tabular-nums text-[#1C1917] mt-1.5">
                      {PILOT_FORMAT_CURRENCY(totals.total, curr)}
                    </div>
                  </div>
                </div>

                <ul className="mt-3 space-y-1.5 text-xs">
                  {ord.items.map((item) => (
                    <li key={`${ord.id}-${item.menuItemId}`} className="flex items-center justify-between text-[#4D4540]">
                      <span>
                        <strong className="font-mono text-[#1C1917]">{item.qty}×</strong> {item.name}
                      </span>
                      <span className="font-mono tabular-nums">
                        {PILOT_FORMAT_CURRENCY(item.qty * item.unitPrice, curr)}
                      </span>
                    </li>
                  ))}
                </ul>
                {ord.specialInstructions && (
                  <p className="mt-2.5 text-[11px] italic text-[#C2410C] bg-orange-50/70 px-2.5 py-1.5 rounded-lg border border-orange-200/70">
                    Note: {ord.specialInstructions}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#F0EDE9]">
                <div className="flex items-center gap-1.5">
                  <select
                    value={ord.status}
                    onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                    aria-label={`Change status for ${ord.orderNumber}`}
                    className="px-2.5 py-1.5 rounded-lg bg-[#FCF9F4] border border-[#D8D1C7] text-xs font-semibold text-[#1C1917]"
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {ord.status !== "Cancelled" && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(ord.id, "Cancelled")}
                      className="p-1.5 rounded-lg text-red-700 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                      title="Cancel Order"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEditModal(ord)}
                    className={PILOT_SECONDARY_BTN_CLASS}
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate("order-details", ord.id)}
                    className={PILOT_PRIMARY_BTN_CLASS}
                  >
                    <Eye className="w-3.5 h-3.5" /> Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className={`${PILOT_CARD_CLASS} p-8 text-center md:col-span-2 text-sm text-[#4D4540]`}>
            No orders matched the active search or status filter.
          </div>
        )}
      </div>

      {/* Create / Edit Order Modal */}
      {modalMode && (
        <PilotModal
          title={modalMode === "create" ? "Create New Kitchen Order" : "Edit Kitchen Order"}
          subtitle="Select dishes and link table or delivery guest. Totals recalculate automatically."
          onClose={() => setModalMode(null)}
        >
          <form onSubmit={handleSaveOrder} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Guest Profile</label>
                <select
                  value={formCustomerId}
                  onChange={(e) => setFormCustomerId(e.target.value)}
                  className={PILOT_INPUT_CLASS}
                >
                  <option value="">Walk-In Guest</option>
                  {state.customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.tier})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Channel</label>
                <select
                  value={formChannel}
                  onChange={(e) => setFormChannel(e.target.value as OrderChannel)}
                  className={PILOT_INPUT_CLASS}
                >
                  <option value="Dine-In">Dine-In</option>
                  <option value="Takeaway">Takeaway</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>
              {formChannel === "Dine-In" && (
                <div>
                  <label className="text-xs font-semibold text-[#4D4540] block mb-1">Assign Table</label>
                  <select
                    value={formTableId}
                    onChange={(e) => setFormTableId(e.target.value)}
                    className={PILOT_INPUT_CLASS}
                  >
                    {state.tables.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.code} — {t.section} ({t.capacity} seats, {t.status})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Payment Method</label>
                <select
                  value={formPaymentMethod}
                  onChange={(e) => setFormPaymentMethod(e.target.value as PaymentMethod)}
                  className={PILOT_INPUT_CLASS}
                >
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                  <option value="Split">Split</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-2">
                Select Menu Dishes ({formItems.reduce((s, i) => s + i.qty, 0)} selected)
              </label>
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {state.menuItems
                  .filter((m) => m.available)
                  .map((dish) => {
                    const current = formItems.find((i) => i.menuItemId === dish.id)?.qty || 0;
                    return (
                      <div
                        key={dish.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#FCF9F4] border border-[#E7E2DA] text-xs"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-semibold text-[#1C1917] truncate">{dish.name}</div>
                          <div className="text-[11px] font-mono text-[#4D4540]">
                            {PILOT_FORMAT_CURRENCY(dish.price, curr)} • {dish.dietary}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleDishQty(dish, -1)}
                            className="w-6 h-6 rounded border border-[#D8D1C7] bg-white font-bold text-[#1C1917] cursor-pointer"
                          >
                            −
                          </button>
                          <span className="w-5 text-center font-mono font-bold text-[#1C1917]">{current}</span>
                          <button
                            type="button"
                            onClick={() => handleDishQty(dish, 1)}
                            className="w-6 h-6 rounded bg-[#C2410C] text-white font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Special Kitchen Notes</label>
              <input
                type="text"
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                placeholder="Allergies, plating sequence, wine pairing..."
                className={PILOT_INPUT_CLASS}
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E7E2DA]">
              <div className="text-xs font-mono text-[#1C1917]">
                Estimated Total:{" "}
                <strong>
                  {PILOT_FORMAT_CURRENCY(getOrderTotals({ items: formItems }, state.settings).total, curr)}
                </strong>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setModalMode(null)} className={PILOT_SECONDARY_BTN_CLASS}>
                  Cancel
                </button>
                <button type="submit" disabled={formItems.length === 0} className={PILOT_PRIMARY_BTN_CLASS}>
                  {modalMode === "create" ? "Dispatch KOT" : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </PilotModal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. ORDER DETAILS                                                           */
/* -------------------------------------------------------------------------- */

export function OrderDetailsView({
  state,
  selectedOrderId,
  onSelectOrder,
  onNavigate,
  onLogActivity,
  onUpdateState,
}: PilotViewProps & { selectedOrderId: string; onSelectOrder: (id: string) => void }) {
  const curr = state.settings.currencySymbol;
  const order = state.orders.find((o) => o.id === selectedOrderId) || state.orders[0];
  const [dishToAdd, setDishToAdd] = useState(state.menuItems[0]?.id || "");

  if (!order) {
    return (
      <div className={`${PILOT_CARD_CLASS} p-8 text-center text-sm text-[#4D4540]`}>
        No orders available to inspect. Create an order first.
      </div>
    );
  }

  const totals = getOrderTotals(order, state.settings);

  const adjustItemQty = (menuItemId: string, delta: number) => {
    onUpdateState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) => {
        if (o.id !== order.id) return o;
        const nextItems = o.items
          .map((item) => (item.menuItemId === menuItemId ? { ...item, qty: item.qty + delta } : item))
          .filter((item) => item.qty > 0);
        return { ...o, items: nextItems.length > 0 ? nextItems : o.items, updatedAt: nowTimeStamp() };
      }),
    }));
  };

  const addDishToOrder = () => {
    const dish = state.menuItems.find((m) => m.id === dishToAdd);
    if (!dish) return;
    onUpdateState(
      (prev) => ({
        ...prev,
        orders: prev.orders.map((o) => {
          if (o.id !== order.id) return o;
          const exists = o.items.find((i) => i.menuItemId === dish.id);
          const nextItems = exists
            ? o.items.map((i) => (i.menuItemId === dish.id ? { ...i, qty: i.qty + 1 } : i))
            : [...o.items, { menuItemId: dish.id, name: dish.name, qty: 1, unitPrice: dish.price }];
          return { ...o, items: nextItems, updatedAt: nowTimeStamp() };
        }),
      }),
      `Added ${dish.name} to ${order.orderNumber}`
    );
  };

  const setStatus = (nextStatus: OrderStatus) => {
    onUpdateState(
      (prev) => ({
        ...prev,
        orders: prev.orders.map((o) =>
          o.id === order.id
            ? {
                ...o,
                status: nextStatus,
                paymentStatus: nextStatus === "Served" ? "Paid" : nextStatus === "Cancelled" ? "Refunded" : o.paymentStatus,
                updatedAt: nowTimeStamp(),
              }
            : o
        ),
      }),
      `${order.orderNumber} updated to ${nextStatus}`
    );
    onLogActivity(`${order.orderNumber} status updated to ${nextStatus}`, "Kitchen");
  };

  return (
    <div className="space-y-5">
      <PilotSectionHeader
        eyebrow={`KOT Ticket Inspection • ${order.orderNumber}`}
        title={`Order Details — ${order.customerName}`}
        subtitle={`${order.channel} • Table/Ref: ${order.tableCode} • Assigned: ${order.assignedStaff}`}
        actions={
          <div className="flex items-center gap-2">
            <select
              value={order.id}
              onChange={(e) => onSelectOrder(e.target.value)}
              aria-label="Switch active order"
              className="px-3 py-2 rounded-lg bg-white border border-[#E7E2DA] text-xs font-semibold text-[#1C1917]"
            >
              {state.orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.orderNumber} — {o.customerName} ({o.status})
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => onNavigate("orders-management")}
              className={PILOT_SECONDARY_BTN_CLASS}
            >
              Back to Queue
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className={`${PILOT_CARD_CLASS} p-5 lg:col-span-8 space-y-4`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E7E2DA]">
            <div className="flex items-center gap-2.5">
              <PilotStatusBadge status={order.status} />
              <PilotStatusBadge status={order.paymentStatus} />
              <span className="text-xs font-mono text-[#4D4540]">
                Created {order.createdAt} • Updated {order.updatedAt}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(["New", "Preparing", "Ready", "Served", "Cancelled"] as OrderStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatus(st)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border cursor-pointer transition-colors ${
                    order.status === st
                      ? "bg-[#C2410C] text-white border-[#C2410C]"
                      : "bg-[#FCF9F4] text-[#4D4540] border-[#E7E2DA] hover:bg-[#F0EDE9]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {order.items.map((item) => (
              <div
                key={item.menuItemId}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#FCF9F4] border border-[#E7E2DA]"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1C1917]">{item.name}</p>
                  <p className="text-xs font-mono text-[#4D4540]">
                    Unit: {PILOT_FORMAT_CURRENCY(item.unitPrice, curr)}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => adjustItemQty(item.menuItemId, -1)}
                      className="w-7 h-7 rounded-md bg-white border border-[#D8D1C7] font-bold text-[#1C1917] cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-mono text-sm font-bold text-[#1C1917]">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => adjustItemQty(item.menuItemId, 1)}
                      className="w-7 h-7 rounded-md bg-[#C2410C] text-white font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <div className="w-24 text-right font-mono font-bold text-sm text-[#1C1917]">
                    {PILOT_FORMAT_CURRENCY(item.qty * item.unitPrice, curr)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <select
              value={dishToAdd}
              onChange={(e) => setDishToAdd(e.target.value)}
              className={`${PILOT_INPUT_CLASS} flex-1`}
              aria-label="Select dish to append"
            >
              {state.menuItems.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({PILOT_FORMAT_CURRENCY(m.price, curr)})
                </option>
              ))}
            </select>
            <button type="button" onClick={addDishToOrder} className={PILOT_SECONDARY_BTN_CLASS}>
              <Plus className="w-3.5 h-3.5" /> Add Course to Ticket
            </button>
          </div>
        </div>

        <div className={`${PILOT_CARD_CLASS} p-5 lg:col-span-4 space-y-4`}>
          <h3 className="text-base font-semibold text-[#1C1917] border-b border-[#E7E2DA] pb-2">
            Guest Check &amp; Tax Folio
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-[#4D4540]">
              <span>Culinary Subtotal</span>
              <span className="font-mono tabular-nums text-[#1C1917]">
                {PILOT_FORMAT_CURRENCY(totals.subtotal, curr)}
              </span>
            </div>
            <div className="flex justify-between text-[#4D4540]">
              <span>Service Charge ({state.settings.serviceChargePercent}%)</span>
              <span className="font-mono tabular-nums text-[#1C1917]">
                {PILOT_FORMAT_CURRENCY(totals.serviceCharge, curr)}
              </span>
            </div>
            <div className="flex justify-between text-[#4D4540]">
              <span>GST ({state.settings.gstRatePercent}%)</span>
              <span className="font-mono tabular-nums text-[#1C1917]">
                {PILOT_FORMAT_CURRENCY(totals.tax, curr)}
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t border-[#E7E2DA] text-base font-bold text-[#1C1917]">
              <span>Grand Total</span>
              <span className="font-mono tabular-nums">{PILOT_FORMAT_CURRENCY(totals.total, curr)}</span>
            </div>
          </div>

          <div className={`${PILOT_SOFT_SURFACE_CLASS} p-3.5 text-xs space-y-1`}>
            <p className="font-semibold text-[#1C1917]">Kitchen Instructions</p>
            <p className="text-[#4D4540]">{order.specialInstructions || "No special dietary or pacing notes."}</p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setStatus("Served")}
              className={PILOT_PRIMARY_BTN_CLASS}
            >
              <CheckCircle2 className="w-4 h-4" /> Settle Payment ({order.paymentMethod}) &amp; Serve
            </button>
            {order.status !== "Cancelled" && (
              <button
                type="button"
                onClick={() => setStatus("Cancelled")}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-semibold cursor-pointer"
              >
                <XCircle className="w-4 h-4" /> Void / Cancel KOT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. MENU & PRODUCT MANAGEMENT                                               */
/* -------------------------------------------------------------------------- */

export function MenuManagementView({ state, onUpdateState, onLogActivity }: PilotViewProps) {
  const curr = state.settings.currencySymbol;
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(state.categories[0]?.id || "");
  const [price, setPrice] = useState("950");
  const [costPrice, setCostPrice] = useState("300");
  const [prepMinutes, setPrepMinutes] = useState("14");
  const [dietary, setDietary] = useState<PilotMenuItem["dietary"]>("Signature");
  const [description, setDescription] = useState("");

  const categoryNameMap = useMemo(
    () => new Map(state.categories.map((c) => [c.id, c.name])),
    [state.categories]
  );

  const filteredDishes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return state.menuItems.filter((m) => {
      if (catFilter !== "All" && m.categoryId !== catFilter) return false;
      if (!q) return true;
      return m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q);
    });
  }, [state.menuItems, search, catFilter]);

  const openModal = (dish?: PilotMenuItem) => {
    if (dish) {
      setEditId(dish.id);
      setName(dish.name);
      setCategoryId(dish.categoryId);
      setPrice(String(dish.price));
      setCostPrice(String(dish.costPrice));
      setPrepMinutes(String(dish.prepMinutes));
      setDietary(dish.dietary);
      setDescription(dish.description);
    } else {
      setEditId(null);
      setName("");
      setCategoryId(state.categories[0]?.id || "");
      setPrice("1100");
      setCostPrice("340");
      setPrepMinutes("15");
      setDietary("Signature");
      setDescription("");
    }
    setModalOpen(true);
  };

  const handleSaveDish = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = Math.max(50, Number(price) || 0);
    const numericCost = Math.max(20, Number(costPrice) || 0);
    const numericPrep = Math.max(2, Number(prepMinutes) || 10);
    if (!name.trim()) return;

    if (editId) {
      onUpdateState(
        (prev) => ({
          ...prev,
          menuItems: prev.menuItems.map((m) =>
            m.id === editId
              ? {
                  ...m,
                  name: name.trim(),
                  categoryId,
                  price: numericPrice,
                  costPrice: numericCost,
                  prepMinutes: numericPrep,
                  dietary,
                  description: description.trim(),
                }
              : m
          ),
        }),
        `Updated "${name.trim()}"`
      );
      onLogActivity(`Updated menu dish "${name.trim()}"`, "Kitchen");
    } else {
      const created: PilotMenuItem = {
        id: `dish-${Date.now()}`,
        name: name.trim(),
        categoryId,
        price: numericPrice,
        costPrice: numericCost,
        prepMinutes: numericPrep,
        dietary,
        available: true,
        popular: false,
        description: description.trim() || "Chef curated seasonal specialty.",
        allergens: [],
      };
      onUpdateState(
        (prev) => ({ ...prev, menuItems: [created, ...prev.menuItems] }),
        `Added "${created.name}" to menu`
      );
      onLogActivity(`Added new menu dish "${created.name}"`, "Kitchen");
    }
    setModalOpen(false);
  };

  const toggleAvailability = (dishId: string) => {
    onUpdateState((prev) => ({
      ...prev,
      menuItems: prev.menuItems.map((m) => (m.id === dishId ? { ...m, available: !m.available } : m)),
    }), "Updated dish availability");
  };

  const deleteDish = (dish: PilotMenuItem) => {
    onUpdateState(
      (prev) => ({
        ...prev,
        menuItems: prev.menuItems.filter((m) => m.id !== dish.id),
      }),
      `Removed "${dish.name}" from menu`
    );
    onLogActivity(`Deleted menu dish "${dish.name}"`, "Kitchen");
  };

  return (
    <div className="space-y-5">
      <PilotSectionHeader
        eyebrow="Culinary Catalogue & Pricing"
        title="Menu & Product Management"
        subtitle="Add seasonal creations, tune food-cost margins, toggle 86'd availability live, and organize sections."
        actions={
          <button type="button" onClick={() => openModal()} className={PILOT_PRIMARY_BTN_CLASS}>
            <Plus className="w-3.5 h-3.5" /> Add Dish
          </button>
        }
      />

      <div className={`${PILOT_CARD_CLASS} p-4 flex flex-col sm:flex-row gap-3 justify-between`}>
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes or ingredients..."
            className={`${PILOT_INPUT_CLASS} pl-9`}
          />
        </div>
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          aria-label="Filter menu by category"
          className="px-3 py-2 rounded-lg bg-[#FCF9F4] border border-[#E7E2DA] text-xs font-semibold text-[#1C1917]"
        >
          <option value="All">All Categories ({state.menuItems.length})</option>
          {state.categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDishes.map((dish) => {
          const marginPct = Math.round(((dish.price - dish.costPrice) / Math.max(1, dish.price)) * 100);
          return (
            <div key={dish.id} className={`${PILOT_CARD_CLASS} p-4 sm:p-5 flex flex-col justify-between gap-3`}>
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#F6F3EE] border border-[#E7E2DA] text-[#4D4540]">
                        {categoryNameMap.get(dish.categoryId) || "Specials"}
                      </span>
                      <span className="text-[11px] font-mono text-[#C2410C] font-semibold">{dish.dietary}</span>
                      {dish.popular && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          <Flame className="w-3 h-3" /> Bestseller
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-[#1C1917] mt-2">{dish.name}</h3>
                    <p className="text-xs text-[#4D4540] mt-1">{dish.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-base font-bold font-mono tabular-nums text-[#1C1917]">
                      {PILOT_FORMAT_CURRENCY(dish.price, curr)}
                    </div>
                    <div className="text-[11px] font-mono text-[#15803D]">{marginPct}% margin</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#F0EDE9]">
                <div className="flex items-center gap-2 text-xs text-[#4D4540]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{dish.prepMinutes} mins</span>
                  <button
                    type="button"
                    onClick={() => toggleAvailability(dish.id)}
                    className={`ml-2 px-2.5 py-1 rounded-full text-[11px] font-semibold border cursor-pointer transition-colors ${
                      dish.available
                        ? "bg-emerald-50 text-[#15803D] border-emerald-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {dish.available ? "Available" : "86'd / Out"}
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button type="button" onClick={() => openModal(dish)} className={PILOT_SECONDARY_BTN_CLASS}>
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteDish(dish)}
                    aria-label={`Delete ${dish.name}`}
                    className="p-2 rounded-lg text-red-700 hover:bg-red-50 border border-[#E7E2DA] cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <PilotModal
          title={editId ? "Edit Menu Dish" : "Add Menu Dish"}
          subtitle="Changes immediately propagate to POS & KOT ordering."
          onClose={() => setModalOpen(false)}
        >
          <form onSubmit={handleSaveDish} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Dish Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Wood-Fired Lobster Ravioli"
                className={PILOT_INPUT_CLASS}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Category</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={PILOT_INPUT_CLASS}>
                  {state.categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Dietary Tag</label>
                <select
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value as PilotMenuItem["dietary"])}
                  className={PILOT_INPUT_CLASS}
                >
                  <option value="Signature">Signature</option>
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                  <option value="Vegan">Vegan</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Selling Price ({curr})</label>
                <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className={PILOT_INPUT_CLASS} />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Cost Price ({curr})</label>
                <input type="number" required value={costPrice} onChange={(e) => setCostPrice(e.target.value)} className={PILOT_INPUT_CLASS} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Prep Time (minutes)</label>
              <input type="number" required value={prepMinutes} onChange={(e) => setPrepMinutes(e.target.value)} className={PILOT_INPUT_CLASS} />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Culinary Description</label>
              <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className={PILOT_INPUT_CLASS} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className={PILOT_SECONDARY_BTN_CLASS}>
                Cancel
              </button>
              <button type="submit" className={PILOT_PRIMARY_BTN_CLASS}>
                Save Dish
              </button>
            </div>
          </form>
        </PilotModal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. CATEGORIES MANAGEMENT                                                   */
/* -------------------------------------------------------------------------- */

export function CategoriesManagementView({ state, onUpdateState, onLogActivity }: PilotViewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [station, setStation] = useState<PilotCategory["station"]>("Hot Line");
  const [status, setStatus] = useState<PilotCategory["status"]>("Active");

  const openModal = (cat?: PilotCategory) => {
    if (cat) {
      setEditId(cat.id);
      setName(cat.name);
      setDescription(cat.description);
      setStation(cat.station);
      setStatus(cat.status);
    } else {
      setEditId(null);
      setName("");
      setDescription("");
      setStation("Hot Line");
      setStatus("Active");
    }
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (editId) {
      onUpdateState(
        (prev) => ({
          ...prev,
          categories: prev.categories.map((c) =>
            c.id === editId ? { ...c, name: name.trim(), description: description.trim(), station, status } : c
          ),
        }),
        `Updated category "${name.trim()}"`
      );
      onLogActivity(`Updated category "${name.trim()}"`, "Kitchen");
    } else {
      const created: PilotCategory = {
        id: `cat-${Date.now()}`,
        name: name.trim(),
        description: description.trim() || "Curated kitchen station course",
        displayOrder: state.categories.length + 1,
        status,
        station,
      };
      onUpdateState(
        (prev) => ({ ...prev, categories: [...prev.categories, created] }),
        `Created category "${created.name}"`
      );
      onLogActivity(`Created category "${created.name}"`, "Kitchen");
    }
    setModalOpen(false);
  };

  const deleteCategory = (cat: PilotCategory) => {
    const linkedCount = state.menuItems.filter((m) => m.categoryId === cat.id).length;
    if (linkedCount > 0) {
      onUpdateState((prev) => prev, `Move or delete ${linkedCount} linked dish(es) before removing "${cat.name}"`);
      return;
    }
    onUpdateState(
      (prev) => ({ ...prev, categories: prev.categories.filter((c) => c.id !== cat.id) }),
      `Deleted category "${cat.name}"`
    );
  };

  return (
    <div className="space-y-5">
      <PilotSectionHeader
        eyebrow="Kitchen Station Routing"
        title="Categories Management"
        subtitle="Configure course hierarchy, culinary pass routing, and seasonal visibility."
        actions={
          <button type="button" onClick={() => openModal()} className={PILOT_PRIMARY_BTN_CLASS}>
            <Plus className="w-3.5 h-3.5" /> Add Category
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {state.categories.map((cat) => {
          const itemCount = state.menuItems.filter((m) => m.categoryId === cat.id).length;
          return (
            <div key={cat.id} className={`${PILOT_CARD_CLASS} p-5 flex flex-col justify-between gap-4`}>
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-[#78716C]">Order #{cat.displayOrder}</span>
                  <PilotStatusBadge status={cat.status} />
                </div>
                <h3 className="text-lg font-semibold text-[#1C1917] mt-2">{cat.name}</h3>
                <p className="text-xs text-[#4D4540] mt-1">{cat.description}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#F0EDE9] text-xs">
                <span className="flex items-center gap-1.5 text-[#4D4540] font-medium">
                  <ChefHat className="w-3.5 h-3.5 text-[#C2410C]" /> {cat.station} • {itemCount} dishes
                </span>
                <div className="flex gap-1.5">
                  <button type="button" onClick={() => openModal(cat)} className={PILOT_SECONDARY_BTN_CLASS}>
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteCategory(cat)}
                    aria-label={`Delete ${cat.name}`}
                    className="p-2 rounded-lg text-red-700 hover:bg-red-50 border border-[#E7E2DA] cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <PilotModal
          title={editId ? "Edit Menu Category" : "Create Menu Category"}
          onClose={() => setModalOpen(false)}
        >
          <form onSubmit={handleSave} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Category Title</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={PILOT_INPUT_CLASS} />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Kitchen Station</label>
              <select
                value={station}
                onChange={(e) => setStation(e.target.value as PilotCategory["station"])}
                className={PILOT_INPUT_CLASS}
              >
                <option value="Hot Line">Hot Line</option>
                <option value="Cold Garde">Cold Garde</option>
                <option value="Pastry">Pastry</option>
                <option value="Cellar & Bar">Cellar &amp; Bar</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PilotCategory["status"])}
                className={PILOT_INPUT_CLASS}
              >
                <option value="Active">Active</option>
                <option value="Seasonal">Seasonal</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Description</label>
              <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className={PILOT_INPUT_CLASS} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className={PILOT_SECONDARY_BTN_CLASS}>
                Cancel
              </button>
              <button type="submit" className={PILOT_PRIMARY_BTN_CLASS}>
                Save Category
              </button>
            </div>
          </form>
        </PilotModal>
      )}
    </div>
  );
}
