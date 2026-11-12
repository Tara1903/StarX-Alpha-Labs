"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Edit3,
  Package,
  Plus,
  Search,
  Settings,
  Users,
  XCircle,
} from "lucide-react";
import {
  PILOT_FORMAT_CURRENCY,
  getOrderTotals,
  type PilotCustomer,
  type PilotInventoryItem,
  type PilotReservation,
  type PilotStaffMember,
  type PilotTable,
  type ReservationStatus,
  type TableStatus,
} from "./restaurantPilotData";
import type { PilotViewProps } from "./RestaurantPilotOperationsViews";
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

/* -------------------------------------------------------------------------- */
/* 6. TABLE MANAGEMENT                                                        */
/* -------------------------------------------------------------------------- */

const TABLE_SECTIONS: PilotTable["section"][] = [
  "Main Salon",
  "Chef's Counter",
  "Garden Terrace",
  "Private Cellar",
];

const TABLE_STATUSES: TableStatus[] = ["Available", "Occupied", "Reserved", "Cleaning"];

export function TableManagementView({
  state,
  onNavigate,
  onUpdateState,
  onLogActivity,
}: PilotViewProps) {
  const [sectionFilter, setSectionFilter] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [section, setSection] = useState<PilotTable["section"]>("Main Salon");
  const [capacity, setCapacity] = useState("4");
  const [serverName, setServerName] = useState(state.staff[0]?.name || "Kabir Sen");

  const filteredTables = useMemo(
    () => state.tables.filter((t) => sectionFilter === "All" || t.section === sectionFilter),
    [state.tables, sectionFilter]
  );

  const openModal = (table?: PilotTable) => {
    if (table) {
      setEditId(table.id);
      setCode(table.code);
      setSection(table.section);
      setCapacity(String(table.capacity));
      setServerName(table.serverName);
    } else {
      setEditId(null);
      setCode(`T-${String(state.tables.length + 1).padStart(2, "0")}`);
      setSection("Main Salon");
      setCapacity("4");
      setServerName(state.staff[0]?.name || "Kabir Sen");
    }
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    const cap = Math.max(1, Number(capacity) || 2);
    if (editId) {
      onUpdateState(
        (prev) => ({
          ...prev,
          tables: prev.tables.map((t) =>
            t.id === editId ? { ...t, code: code.trim(), section, capacity: cap, serverName } : t
          ),
        }),
        `Updated table ${code.trim()}`
      );
      onLogActivity(`Modified table ${code.trim()} (${cap} seats)`, "Tables");
    } else {
      const created: PilotTable = {
        id: `tbl-${Date.now()}`,
        code: code.trim(),
        section,
        capacity: cap,
        status: "Available",
        serverName,
        guestCount: 0,
      };
      onUpdateState((prev) => ({ ...prev, tables: [...prev.tables, created] }), `Added table ${created.code}`);
      onLogActivity(`Added new table ${created.code} in ${created.section}`, "Tables");
    }
    setModalOpen(false);
  };

  const updateTableStatus = (table: PilotTable, status: TableStatus) => {
    onUpdateState(
      (prev) => ({
        ...prev,
        tables: prev.tables.map((t) =>
          t.id === table.id
            ? { ...t, status, guestCount: status === "Occupied" ? Math.max(1, t.guestCount || t.capacity) : 0 }
            : t
        ),
      }),
      `Table ${table.code} set to ${status}`
    );
    onLogActivity(`Table ${table.code} marked ${status}`, "Tables");
  };

  return (
    <div className="space-y-5">
      <PilotSectionHeader
        eyebrow="Interactive Floor & Seating Map"
        title="Table Management"
        subtitle="Set cover capacities, rotate table occupancy states, and track assigned captains per zone."
        actions={
          <button type="button" onClick={() => openModal()} className={PILOT_PRIMARY_BTN_CLASS}>
            <Plus className="w-3.5 h-3.5" /> Add Table
          </button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {(["All", ...TABLE_SECTIONS] as const).map((sec) => (
          <button
            key={sec}
            type="button"
            onClick={() => setSectionFilter(sec)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
              sectionFilter === sec
                ? "bg-[#C2410C] text-white border-[#C2410C]"
                : "bg-white text-[#4D4540] border-[#E7E2DA] hover:bg-[#F6F3EE]"
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTables.map((table) => {
          const activeOrder = state.orders.find(
            (o) => o.tableId === table.id && o.status !== "Served" && o.status !== "Cancelled"
          );
          return (
            <div key={table.id} className={`${PILOT_CARD_CLASS} p-4 flex flex-col justify-between gap-3`}>
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-lg font-bold font-mono text-[#1C1917]">{table.code}</span>
                    <p className="text-xs text-[#4D4540]">{table.section}</p>
                  </div>
                  <PilotStatusBadge status={table.status} />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-[#4D4540]">
                  <span>Capacity: <strong className="text-[#1C1917]">{table.capacity} covers</strong></span>
                  <span>{table.serverName}</span>
                </div>

                {activeOrder && (
                  <button
                    type="button"
                    onClick={() => onNavigate("order-details", activeOrder.id)}
                    className="mt-2.5 w-full text-left px-2.5 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-[11px] font-semibold text-[#C2410C] hover:bg-orange-100 cursor-pointer"
                  >
                    Active {activeOrder.orderNumber} • {activeOrder.status}
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#F0EDE9]">
                <select
                  value={table.status}
                  onChange={(e) => updateTableStatus(table, e.target.value as TableStatus)}
                  aria-label={`Occupancy status for ${table.code}`}
                  className="px-2.5 py-1.5 rounded-lg bg-[#FCF9F4] border border-[#D8D1C7] text-xs font-semibold text-[#1C1917] flex-1"
                >
                  {TABLE_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => openModal(table)}
                  aria-label={`Edit ${table.code}`}
                  className={PILOT_SECONDARY_BTN_CLASS}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <PilotModal
          title={editId ? "Edit Table Configuration" : "Create Floor Table"}
          onClose={() => setModalOpen(false)}
        >
          <form onSubmit={handleSave} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Table Code</label>
                <input type="text" required value={code} onChange={(e) => setCode(e.target.value)} className={PILOT_INPUT_CLASS} />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Seat Capacity</label>
                <input type="number" min={1} max={24} required value={capacity} onChange={(e) => setCapacity(e.target.value)} className={PILOT_INPUT_CLASS} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Dining Zone</label>
              <select value={section} onChange={(e) => setSection(e.target.value as PilotTable["section"])} className={PILOT_INPUT_CLASS}>
                {TABLE_SECTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Assigned Captain</label>
              <input type="text" value={serverName} onChange={(e) => setServerName(e.target.value)} className={PILOT_INPUT_CLASS} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className={PILOT_SECONDARY_BTN_CLASS}>
                Cancel
              </button>
              <button type="submit" className={PILOT_PRIMARY_BTN_CLASS}>
                Save Table
              </button>
            </div>
          </form>
        </PilotModal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. RESERVATIONS                                                            */
/* -------------------------------------------------------------------------- */

const RESERVATION_STATUSES: ReservationStatus[] = [
  "Confirmed",
  "Seated",
  "Completed",
  "Cancelled",
  "No-Show",
];

export function ReservationsView({ state, onUpdateState, onLogActivity }: PilotViewProps) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [partySize, setPartySize] = useState("4");
  const [date, setDate] = useState("2026-11-12");
  const [timeSlot, setTimeSlot] = useState("20:30");
  const [tableId, setTableId] = useState(state.tables[0]?.id || "");
  const [occasion, setOccasion] = useState("Dinner");
  const [notes, setNotes] = useState("");

  const filtered = useMemo(
    () => state.reservations.filter((r) => statusFilter === "All" || r.status === statusFilter),
    [state.reservations, statusFilter]
  );

  const openModal = (res?: PilotReservation) => {
    if (res) {
      setEditId(res.id);
      setGuestName(res.guestName);
      setPhone(res.phone);
      setPartySize(String(res.partySize));
      setDate(res.date);
      setTimeSlot(res.timeSlot);
      setTableId(res.tableId || "");
      setOccasion(res.occasion);
      setNotes(res.notes);
    } else {
      setEditId(null);
      setGuestName("");
      setPhone("+91 98200 ");
      setPartySize("4");
      setDate("2026-11-12");
      setTimeSlot("20:45");
      setTableId(state.tables.find((t) => t.status === "Available")?.id || state.tables[0]?.id || "");
      setOccasion("Evening Tasting");
      setNotes("");
    }
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    const tbl = state.tables.find((t) => t.id === tableId);
    const pax = Math.max(1, Number(partySize) || 2);

    if (editId) {
      onUpdateState(
        (prev) => ({
          ...prev,
          reservations: prev.reservations.map((r) =>
            r.id === editId
              ? {
                  ...r,
                  guestName: guestName.trim(),
                  phone: phone.trim(),
                  partySize: pax,
                  date,
                  timeSlot,
                  tableId: tbl?.id || null,
                  tableCode: tbl?.code || "TBD",
                  occasion: occasion.trim(),
                  notes: notes.trim(),
                }
              : r
          ),
        }),
        `Updated reservation for ${guestName.trim()}`
      );
      onLogActivity(`Updated reservation for ${guestName.trim()}`, "Reservations");
    } else {
      const created: PilotReservation = {
        id: `res-${Date.now()}`,
        guestName: guestName.trim(),
        customerId: null,
        phone: phone.trim(),
        partySize: pax,
        date,
        timeSlot,
        tableId: tbl?.id || null,
        tableCode: tbl?.code || "TBD",
        status: "Confirmed",
        occasion: occasion.trim() || "Dinner",
        notes: notes.trim(),
      };
      onUpdateState(
        (prev) => ({
          ...prev,
          reservations: [created, ...prev.reservations],
          tables: tbl
            ? prev.tables.map((t) => (t.id === tbl.id && t.status === "Available" ? { ...t, status: "Reserved" } : t))
            : prev.tables,
        }),
        `Confirmed reservation for ${created.guestName}`
      );
      onLogActivity(`Booked table ${created.tableCode} for ${created.guestName} (${pax} pax)`, "Reservations");
    }
    setModalOpen(false);
  };

  const setStatus = (res: PilotReservation, status: ReservationStatus) => {
    onUpdateState(
      (prev) => ({
        ...prev,
        reservations: prev.reservations.map((r) => (r.id === res.id ? { ...r, status } : r)),
        tables: res.tableId
          ? prev.tables.map((t) => {
              if (t.id !== res.tableId) return t;
              if (status === "Seated") return { ...t, status: "Occupied", guestCount: res.partySize };
              if (status === "Cancelled" || status === "Completed") return { ...t, status: "Available", guestCount: 0 };
              return t;
            })
          : prev.tables,
      }),
      `${res.guestName} reservation marked ${status}`
    );
    onLogActivity(`${res.guestName} reservation set to ${status}`, "Reservations");
  };

  return (
    <div className="space-y-5">
      <PilotSectionHeader
        eyebrow="Guest Book & Table Allocation"
        title="Reservations"
        subtitle="Manage bookings, assign floor tables, seat arriving guests, or handle cancellations."
        actions={
          <button type="button" onClick={() => openModal()} className={PILOT_PRIMARY_BTN_CLASS}>
            <Plus className="w-3.5 h-3.5" /> New Reservation
          </button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {(["All", ...RESERVATION_STATUSES] as const).map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
              statusFilter === st
                ? "bg-[#C2410C] text-white border-[#C2410C]"
                : "bg-white text-[#4D4540] border-[#E7E2DA] hover:bg-[#F6F3EE]"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((res) => (
          <div
            key={res.id}
            className={`${PILOT_CARD_CLASS} p-4 flex flex-col md:flex-row md:items-center justify-between gap-4`}
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#F6F3EE] border border-[#E7E2DA] text-[#1C1917]">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  {res.date} • {res.timeSlot}
                </span>
                <span className="font-mono text-xs font-semibold text-[#C2410C]">Table {res.tableCode}</span>
                <PilotStatusBadge status={res.status} />
              </div>
              <h3 className="text-base font-semibold text-[#1C1917]">
                {res.guestName}{" "}
                <span className="text-xs font-normal text-[#4D4540]">• Party of {res.partySize}</span>
              </h3>
              <p className="text-xs text-[#4D4540]">
                {res.occasion} • {res.phone}
                {res.notes ? ` — ${res.notes}` : ""}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <select
                value={res.status}
                onChange={(e) => setStatus(res, e.target.value as ReservationStatus)}
                aria-label={`Reservation status for ${res.guestName}`}
                className="px-2.5 py-1.5 rounded-lg bg-[#FCF9F4] border border-[#D8D1C7] text-xs font-semibold text-[#1C1917]"
              >
                {RESERVATION_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => openModal(res)} className={PILOT_SECONDARY_BTN_CLASS}>
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
              {res.status !== "Cancelled" && (
                <button
                  type="button"
                  onClick={() => setStatus(res, "Cancelled")}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" /> Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <PilotModal
          title={editId ? "Edit Reservation" : "Book Table Reservation"}
          onClose={() => setModalOpen(false)}
        >
          <form onSubmit={handleSave} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Guest Name</label>
                <input type="text" required value={guestName} onChange={(e) => setGuestName(e.target.value)} className={PILOT_INPUT_CLASS} />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Phone Number</label>
                <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} className={PILOT_INPUT_CLASS} />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Date</label>
                <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className={PILOT_INPUT_CLASS} />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Time Slot</label>
                <input type="text" required value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className={PILOT_INPUT_CLASS} />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Party Size</label>
                <input type="number" min={1} max={20} required value={partySize} onChange={(e) => setPartySize(e.target.value)} className={PILOT_INPUT_CLASS} />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Assign Table</label>
                <select value={tableId} onChange={(e) => setTableId(e.target.value)} className={PILOT_INPUT_CLASS}>
                  {state.tables.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.code} — {t.section} ({t.capacity} seats)
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Occasion</label>
              <input type="text" value={occasion} onChange={(e) => setOccasion(e.target.value)} className={PILOT_INPUT_CLASS} />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Guest Requests</label>
              <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className={PILOT_INPUT_CLASS} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className={PILOT_SECONDARY_BTN_CLASS}>
                Cancel
              </button>
              <button type="submit" className={PILOT_PRIMARY_BTN_CLASS}>
                Save Reservation
              </button>
            </div>
          </form>
        </PilotModal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. CUSTOMER MANAGEMENT                                                     */
/* -------------------------------------------------------------------------- */

export function CustomerManagementView({ state, onNavigate, onUpdateState }: PilotViewProps) {
  const curr = state.settings.currencySymbol;
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>(state.customers[0]?.id || "");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tier, setTier] = useState<PilotCustomer["tier"]>("Regular");
  const [dietaryNotes, setDietaryNotes] = useState("");

  const filteredCustomers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return state.customers.filter(
      (c) => !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q)
    );
  }, [state.customers, search]);

  const activeCustomer = state.customers.find((c) => c.id === selectedId) || state.customers[0];
  const customerOrders = useMemo(
    () =>
      activeCustomer
        ? state.orders.filter((o) => o.customerId === activeCustomer.id || o.customerName === activeCustomer.name)
        : [],
    [state.orders, activeCustomer]
  );

  const openModal = (c?: PilotCustomer) => {
    if (c) {
      setEditId(c.id);
      setName(c.name);
      setEmail(c.email);
      setPhone(c.phone);
      setTier(c.tier);
      setDietaryNotes(c.dietaryNotes);
    } else {
      setEditId(null);
      setName("");
      setEmail("");
      setPhone("+91 ");
      setTier("Regular");
      setDietaryNotes("");
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
          customers: prev.customers.map((c) =>
            c.id === editId
              ? { ...c, name: name.trim(), email: email.trim(), phone: phone.trim(), tier, dietaryNotes: dietaryNotes.trim() }
              : c
          ),
        }),
        `Updated patron ${name.trim()}`
      );
    } else {
      const created: PilotCustomer = {
        id: `cust-${Date.now()}`,
        name: name.trim(),
        email: email.trim() || "guest@maisonember.in",
        phone: phone.trim(),
        tier,
        dietaryNotes: dietaryNotes.trim() || "No documented allergies",
        favoriteDish: state.menuItems[0]?.name || "Chef Signature",
        baseOrdersCount: 0,
        baseLifetimeSpend: 0,
        lastVisit: "Today",
      };
      onUpdateState((prev) => ({ ...prev, customers: [created, ...prev.customers] }), `Added customer ${created.name}`);
      setSelectedId(created.id);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-5">
      <PilotSectionHeader
        eyebrow="Guest Loyalty & Preferences CRM"
        title="Customer Management"
        subtitle="Maintain dietary notes, VIP dining tiers, and inspect itemized order history per guest."
        actions={
          <button type="button" onClick={() => openModal()} className={PILOT_PRIMARY_BTN_CLASS}>
            <Plus className="w-3.5 h-3.5" /> Add Customer
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className={`${PILOT_CARD_CLASS} p-4 lg:col-span-7 space-y-3`}>
          <div className="relative">
            <Search className="w-4 h-4 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guest by name, phone, or email..."
              className={`${PILOT_INPUT_CLASS} pl-9`}
            />
          </div>

          <div className="space-y-2">
            {filteredCustomers.map((c) => {
              const liveOrders = state.orders.filter(
                (o) => (o.customerId === c.id || o.customerName === c.name) && o.status !== "Cancelled"
              );
              const liveSpend = liveOrders.reduce((s, o) => s + getOrderTotals(o, state.settings).total, 0);
              const isSelected = c.id === activeCustomer?.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedId(c.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-[#FCF9F4] border-[#C2410C] shadow-sm"
                      : "bg-white border-[#E7E2DA] hover:bg-[#FCF9F4]"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-[#1C1917]">{c.name}</span>
                      <PilotStatusBadge status={c.tier} />
                    </div>
                    <p className="text-xs text-[#4D4540] truncate mt-0.5">
                      {c.phone} • {c.dietaryNotes}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold font-mono tabular-nums text-[#1C1917]">
                      {PILOT_FORMAT_CURRENCY(c.baseLifetimeSpend + liveSpend, curr)}
                    </div>
                    <div className="text-[11px] text-[#78716C]">
                      {c.baseOrdersCount + liveOrders.length} orders
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${PILOT_CARD_CLASS} p-5 lg:col-span-5 space-y-4`}>
          {activeCustomer ? (
            <>
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#E7E2DA]">
                <div>
                  <PilotStatusBadge status={activeCustomer.tier} />
                  <h3 className="text-lg font-semibold text-[#1C1917] mt-1.5">{activeCustomer.name}</h3>
                  <p className="text-xs text-[#4D4540]">{activeCustomer.email}</p>
                  <p className="text-xs font-mono text-[#4D4540]">{activeCustomer.phone}</p>
                </div>
                <button type="button" onClick={() => openModal(activeCustomer)} className={PILOT_SECONDARY_BTN_CLASS}>
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
              </div>

              <div className={`${PILOT_SOFT_SURFACE_CLASS} p-3 text-xs space-y-1`}>
                <p className="font-semibold text-[#1C1917]">Dietary &amp; Service Preferences</p>
                <p className="text-[#4D4540]">{activeCustomer.dietaryNotes}</p>
                <p className="text-[#15803D] font-medium pt-1">Favorite: {activeCustomer.favoriteDish}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#4D4540] font-semibold mb-2">
                  Current Service Order History ({customerOrders.length})
                </h4>
                <div className="space-y-2">
                  {customerOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-[#FCF9F4] border border-[#E7E2DA] text-xs"
                    >
                      <div>
                        <span className="font-mono font-bold text-[#1C1917]">{ord.orderNumber}</span>
                        <span className="text-[#4D4540] ml-2">{ord.createdAt}</span>
                        <div className="mt-1">
                          <PilotStatusBadge status={ord.status} />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-[#1C1917]">
                          {PILOT_FORMAT_CURRENCY(getOrderTotals(ord, state.settings).total, curr)}
                        </div>
                        <button
                          type="button"
                          onClick={() => onNavigate("order-details", ord.id)}
                          className="text-[11px] font-semibold text-[#C2410C] hover:underline cursor-pointer mt-1"
                        >
                          View KOT
                        </button>
                      </div>
                    </div>
                  ))}
                  {customerOrders.length === 0 && (
                    <p className="text-xs text-[#78716C]">No orders in the active shift queue yet.</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="text-xs text-[#4D4540]">Select a customer profile to inspect details.</p>
          )}
        </div>
      </div>

      {modalOpen && (
        <PilotModal title={editId ? "Edit Customer Profile" : "Add Guest Profile"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSave} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Full Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={PILOT_INPUT_CLASS} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Phone</label>
                <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} className={PILOT_INPUT_CLASS} />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Patron Tier</label>
                <select value={tier} onChange={(e) => setTier(e.target.value as PilotCustomer["tier"])} className={PILOT_INPUT_CLASS}>
                  <option value="VIP Patron">VIP Patron</option>
                  <option value="Regular">Regular</option>
                  <option value="First Visit">First Visit</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={PILOT_INPUT_CLASS} />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Dietary &amp; Seating Notes</label>
              <textarea rows={2} value={dietaryNotes} onChange={(e) => setDietaryNotes(e.target.value)} className={PILOT_INPUT_CLASS} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className={PILOT_SECONDARY_BTN_CLASS}>
                Cancel
              </button>
              <button type="submit" className={PILOT_PRIMARY_BTN_CLASS}>
                Save Profile
              </button>
            </div>
          </form>
        </PilotModal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 9. STAFF MANAGEMENT                                                        */
/* -------------------------------------------------------------------------- */

export function StaffManagementView({ state, onUpdateState }: PilotViewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState<PilotStaffMember["role"]>("Floor Captain");
  const [department, setDepartment] = useState<PilotStaffMember["department"]>("Floor Service");
  const [shift, setShift] = useState<PilotStaffMember["shift"]>("Evening Service");
  const [section, setSection] = useState("Main Salon");

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const created: PilotStaffMember = {
      id: `stf-${Date.now()}`,
      name: name.trim(),
      role,
      department,
      shift,
      status: "On Duty",
      phone: "+91 98200 77880",
      assignedSection: section.trim() || "Main Salon",
    };
    onUpdateState((prev) => ({ ...prev, staff: [created, ...prev.staff] }), `Added ${created.name} to brigade`);
    setName("");
    setModalOpen(false);
  };

  const cycleDuty = (member: PilotStaffMember, nextStatus: PilotStaffMember["status"]) => {
    onUpdateState(
      (prev) => ({
        ...prev,
        staff: prev.staff.map((s) => (s.id === member.id ? { ...s, status: nextStatus } : s)),
      }),
      `${member.name} is now ${nextStatus}`
    );
  };

  return (
    <div className="space-y-5">
      <PilotSectionHeader
        eyebrow="Brigade & Service Roster"
        title="Staff Management"
        subtitle="Coordinate culinary leads, sommeliers, and floor captains across dining shifts."
        actions={
          <button type="button" onClick={() => setModalOpen(true)} className={PILOT_PRIMARY_BTN_CLASS}>
            <Plus className="w-3.5 h-3.5" /> Add Staff Member
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.staff.map((member) => (
          <div key={member.id} className={`${PILOT_CARD_CLASS} p-5 flex flex-col justify-between gap-4`}>
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#F6F3EE] border border-[#E7E2DA] flex items-center justify-center text-[#C2410C] font-bold text-xs">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1C1917]">{member.name}</h3>
                    <p className="text-xs text-[#C2410C] font-medium">{member.role}</p>
                  </div>
                </div>
                <PilotStatusBadge status={member.status} />
              </div>

              <div className="mt-3 text-xs text-[#4D4540] space-y-1">
                <p>Department: <strong className="text-[#1C1917]">{member.department}</strong></p>
                <p>Shift: {member.shift}</p>
                <p>Station: {member.assignedSection}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F0EDE9] flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono text-[#78716C]">{member.phone}</span>
              <select
                value={member.status}
                onChange={(e) => cycleDuty(member, e.target.value as PilotStaffMember["status"])}
                aria-label={`Duty status for ${member.name}`}
                className="px-2.5 py-1 rounded-lg bg-[#FCF9F4] border border-[#D8D1C7] text-xs font-semibold text-[#1C1917]"
              >
                <option value="On Duty">On Duty</option>
                <option value="On Break">On Break</option>
                <option value="Off Duty">Off Duty</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <PilotModal title="Add Brigade Member" onClose={() => setModalOpen(false)}>
          <form onSubmit={handleAddStaff} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Full Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={PILOT_INPUT_CLASS} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value as PilotStaffMember["role"])} className={PILOT_INPUT_CLASS}>
                  <option value="Floor Captain">Floor Captain</option>
                  <option value="Sous Chef">Sous Chef</option>
                  <option value="Senior Sommelier">Senior Sommelier</option>
                  <option value="Mixologist">Mixologist</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Department</label>
                <select value={department} onChange={(e) => setDepartment(e.target.value as PilotStaffMember["department"])} className={PILOT_INPUT_CLASS}>
                  <option value="Floor Service">Floor Service</option>
                  <option value="Culinary">Culinary</option>
                  <option value="Beverage">Beverage</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Shift</label>
                <select value={shift} onChange={(e) => setShift(e.target.value as PilotStaffMember["shift"])} className={PILOT_INPUT_CLASS}>
                  <option value="Evening Service">Evening Service</option>
                  <option value="Morning Prep">Morning Prep</option>
                  <option value="Split Shift">Split Shift</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Assigned Section</label>
                <input type="text" value={section} onChange={(e) => setSection(e.target.value)} className={PILOT_INPUT_CLASS} />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className={PILOT_SECONDARY_BTN_CLASS}>
                Cancel
              </button>
              <button type="submit" className={PILOT_PRIMARY_BTN_CLASS}>
                Add to Roster
              </button>
            </div>
          </form>
        </PilotModal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 10. INVENTORY MANAGEMENT                                                   */
/* -------------------------------------------------------------------------- */

export function InventoryView({ state, metrics, onUpdateState, onLogActivity }: PilotViewProps) {
  const curr = state.settings.currencySymbol;
  const [onlyLowStock, setOnlyLowStock] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState<PilotInventoryItem["category"]>("Produce");
  const [unit, setUnit] = useState("kg");
  const [stock, setStock] = useState("10");
  const [minPar, setMinPar] = useState("5");
  const [unitCost, setUnitCost] = useState("450");

  const multiplier = state.settings.lowStockDefaultMultiplier || 1;
  const visibleItems = useMemo(() => {
    if (!onlyLowStock) return state.inventory;
    return state.inventory.filter((i) => i.stock <= i.minPar * multiplier);
  }, [state.inventory, onlyLowStock, multiplier]);

  const adjustStock = (item: PilotInventoryItem, delta: number) => {
    const nextStock = Math.max(0, Number((item.stock + delta).toFixed(1)));
    onUpdateState(
      (prev) => ({
        ...prev,
        inventory: prev.inventory.map((i) =>
          i.id === item.id ? { ...i, stock: nextStock, lastRestocked: delta > 0 ? "Just now" : i.lastRestocked } : i
        ),
      }),
      `${item.name} stock updated to ${nextStock} ${item.unit}`
    );
    onLogActivity(`${item.name} stock adjusted to ${nextStock} ${item.unit}`, "Inventory");
  };

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) return;
    const created: PilotInventoryItem = {
      id: `inv-${Date.now()}`,
      name: itemName.trim(),
      category,
      unit: unit.trim() || "kg",
      stock: Math.max(0, Number(stock) || 0),
      minPar: Math.max(1, Number(minPar) || 5),
      unitCost: Math.max(10, Number(unitCost) || 100),
      supplier: "Selected Farm Partner",
      lastRestocked: "Just now",
    };
    onUpdateState((prev) => ({ ...prev, inventory: [created, ...prev.inventory] }), `Added ${created.name} to pantry`);
    setItemName("");
    setModalOpen(false);
  };

  return (
    <div className="space-y-5">
      <PilotSectionHeader
        eyebrow="Pantry Par Levels & Procurement"
        title="Inventory Management"
        subtitle="Track perishable ingredients, update stock quantities in real time, and clear par-level alerts."
        actions={
          <button type="button" onClick={() => setModalOpen(true)} className={PILOT_PRIMARY_BTN_CLASS}>
            <Plus className="w-3.5 h-3.5" /> Add Ingredient
          </button>
        }
      />

      {/* Low Stock Alert Strip */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          metrics.lowStockItems.length > 0
            ? "bg-orange-50 border-orange-200 text-[#9A3412]"
            : "bg-emerald-50 border-emerald-200 text-[#15803D]"
        }`}
      >
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
          {metrics.lowStockItems.length > 0 ? (
            <>
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>
                <strong>{metrics.lowStockItems.length} ingredient(s)</strong> are at or below minimum par level:{" "}
                {metrics.lowStockItems.map((i) => i.name).join(", ")}
              </span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>All pantry and cellar stock levels exceed configured par thresholds.</span>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => setOnlyLowStock((v) => !v)}
          className={PILOT_SECONDARY_BTN_CLASS}
        >
          {onlyLowStock ? "Show All Ingredients" : `Filter Low Stock (${metrics.lowStockItems.length})`}
        </button>
      </div>

      <div className={`${PILOT_CARD_CLASS} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FCF9F4] border-b border-[#E7E2DA] text-[#4D4540]">
              <tr>
                <th className="py-3 px-4 font-semibold">Ingredient</th>
                <th className="py-3 px-4 font-semibold">Supplier</th>
                <th className="py-3 px-4 font-semibold">On Hand</th>
                <th className="py-3 px-4 font-semibold">Min Par</th>
                <th className="py-3 px-4 font-semibold">Unit Cost</th>
                <th className="py-3 px-4 font-semibold">Health</th>
                <th className="py-3 px-4 font-semibold text-right">Update Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE9]">
              {visibleItems.map((item) => {
                const isLow = item.stock <= item.minPar * multiplier;
                return (
                  <tr key={item.id} className="hover:bg-[#FCF9F4]">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#1C1917] flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-[#78716C]" />
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#78716C]">{item.category}</div>
                    </td>
                    <td className="py-3 px-4 text-[#4D4540]">{item.supplier}</td>
                    <td className="py-3 px-4 font-mono font-bold text-[#1C1917] tabular-nums">
                      {item.stock} {item.unit}
                    </td>
                    <td className="py-3 px-4 font-mono text-[#4D4540] tabular-nums">
                      {item.minPar} {item.unit}
                    </td>
                    <td className="py-3 px-4 font-mono text-[#4D4540] tabular-nums">
                      {PILOT_FORMAT_CURRENCY(item.unitCost, curr)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          isLow
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-emerald-50 text-[#15803D] border-emerald-200"
                        }`}
                      >
                        {isLow ? "Low Stock" : "Healthy"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => adjustStock(item, -1)}
                          className="w-7 h-7 rounded border border-[#D8D1C7] bg-white font-bold text-[#1C1917] cursor-pointer"
                        >
                          −1
                        </button>
                        <button
                          type="button"
                          onClick={() => adjustStock(item, 5)}
                          className="px-2.5 h-7 rounded bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-[11px] cursor-pointer"
                        >
                          +5 Restock
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

      {modalOpen && (
        <PilotModal title="Register Pantry Ingredient" onClose={() => setModalOpen(false)}>
          <form onSubmit={handleAddIngredient} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Ingredient Name</label>
              <input type="text" required value={itemName} onChange={(e) => setItemName(e.target.value)} className={PILOT_INPUT_CLASS} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value as PilotInventoryItem["category"])} className={PILOT_INPUT_CLASS}>
                  <option value="Produce">Produce</option>
                  <option value="Proteins">Proteins</option>
                  <option value="Dairy & Truffle">Dairy &amp; Truffle</option>
                  <option value="Dry Pantry">Dry Pantry</option>
                  <option value="Cellar">Cellar</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Unit</label>
                <input type="text" required value={unit} onChange={(e) => setUnit(e.target.value)} className={PILOT_INPUT_CLASS} />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Opening Stock</label>
                <input type="number" step="0.5" required value={stock} onChange={(e) => setStock(e.target.value)} className={PILOT_INPUT_CLASS} />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4D4540] block mb-1">Min Par Threshold</label>
                <input type="number" step="0.5" required value={minPar} onChange={(e) => setMinPar(e.target.value)} className={PILOT_INPUT_CLASS} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4D4540] block mb-1">Unit Cost ({curr})</label>
              <input type="number" required value={unitCost} onChange={(e) => setUnitCost(e.target.value)} className={PILOT_INPUT_CLASS} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className={PILOT_SECONDARY_BTN_CLASS}>
                Cancel
              </button>
              <button type="submit" className={PILOT_PRIMARY_BTN_CLASS}>
                Save Ingredient
              </button>
            </div>
          </form>
        </PilotModal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 11. SALES ANALYTICS (100% Live Derived From Pilot State)                   */
/* -------------------------------------------------------------------------- */

export function SalesAnalyticsView({ state, metrics }: PilotViewProps) {
  const curr = state.settings.currencySymbol;
  const maxChannelRev = Math.max(...metrics.revenueByChannel.map((c) => c.revenue), 1);

  return (
    <div className="space-y-6">
      <PilotSectionHeader
        eyebrow="Live Financial & Item Telemetry"
        title="Sales Analytics"
        subtitle="Dynamically calculated from live pilot orders, tax settings, and menu item quantities — updates instantly on every order change."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`${PILOT_CARD_CLASS} p-5`}>
          <p className="text-xs text-[#4D4540]">Gross Revenue (Incl. GST &amp; Service)</p>
          <p className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[#1C1917] mt-1">
            {PILOT_FORMAT_CURRENCY(metrics.grossRevenue, curr)}
          </p>
        </div>
        <div className={`${PILOT_CARD_CLASS} p-5`}>
          <p className="text-xs text-[#4D4540]">Net Culinary Sales (Pre-Tax)</p>
          <p className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[#15803D] mt-1">
            {PILOT_FORMAT_CURRENCY(metrics.netRevenueExclTax, curr)}
          </p>
        </div>
        <div className={`${PILOT_CARD_CLASS} p-5`}>
          <p className="text-xs text-[#4D4540]">Average Order Check</p>
          <p className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[#C2410C] mt-1">
            {PILOT_FORMAT_CURRENCY(metrics.averageTicket, curr)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className={`${PILOT_CARD_CLASS} p-5 space-y-4`}>
          <h3 className="text-base font-semibold text-[#1C1917]">Channel Mix &amp; Order Trends</h3>
          <div className="space-y-3">
            {metrics.revenueByChannel.map((row) => (
              <div key={row.channel} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#1C1917]">
                    {row.channel} ({row.orders} orders)
                  </span>
                  <span className="font-mono tabular-nums font-bold text-[#1C1917]">
                    {PILOT_FORMAT_CURRENCY(row.revenue, curr)}
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-[#F0EDE9] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#C2410C] transition-all duration-300"
                    style={{ width: `${Math.max(5, Math.round((row.revenue / maxChannelRev) * 100))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E7E2DA]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#4D4540] font-semibold mb-2">
              Settlement Breakdown
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {metrics.revenueByPayment.map((pm) => (
                <div key={pm.method} className={`${PILOT_SOFT_SURFACE_CLASS} p-3 text-xs`}>
                  <div className="text-[#4D4540]">{pm.method} ({pm.orders})</div>
                  <div className="font-mono font-bold text-[#1C1917] mt-0.5">
                    {PILOT_FORMAT_CURRENCY(pm.revenue, curr)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${PILOT_CARD_CLASS} p-5 space-y-4`}>
          <h3 className="text-base font-semibold text-[#1C1917]">Category Revenue Contribution</h3>
          <div className="space-y-3">
            {metrics.revenueByCategory.map((cat) => (
              <div key={cat.categoryId} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-[#1C1917]">{cat.categoryName}</span>
                  <span className="font-mono tabular-nums text-[#4D4540]">
                    {cat.sharePct}% • <strong className="text-[#1C1917]">{PILOT_FORMAT_CURRENCY(cat.revenue, curr)}</strong>
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-[#F0EDE9] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#15803D] transition-all duration-300"
                    style={{ width: `${Math.max(4, cat.sharePct)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E7E2DA]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#4D4540] font-semibold mb-2">
              Top Revenue Dishes
            </h4>
            <div className="space-y-1.5 text-xs">
              {metrics.popularDishes.slice(0, 4).map((d) => (
                <div key={d.menuItemId} className="flex justify-between py-1 border-b border-[#F0EDE9] last:border-0">
                  <span className="text-[#1C1917] font-medium truncate pr-2">
                    {d.name} ({d.unitsSold}×)
                  </span>
                  <span className="font-mono font-bold text-[#1C1917] shrink-0">
                    {PILOT_FORMAT_CURRENCY(d.revenue, curr)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 12. RESTAURANT SETTINGS                                                    */
/* -------------------------------------------------------------------------- */

export function RestaurantSettingsView({ state, onUpdateState, onLogActivity }: PilotViewProps) {
  const [form, setForm] = useState(state.settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateState(
      (prev) => ({ ...prev, settings: form }),
      "Restaurant settings saved and tax/alert rules updated"
    );
    onLogActivity("Updated restaurant tax & operational settings", "Settings");
  };

  return (
    <div className="space-y-5">
      <PilotSectionHeader
        eyebrow="Property Identity & Billing Rules"
        title="Restaurant Settings"
        subtitle="Modify property details, GST & service charge percentages, or inventory alert thresholds."
      />

      <form onSubmit={handleSubmit} className={`${PILOT_CARD_CLASS} p-5 sm:p-6 space-y-5 max-w-3xl`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#4D4540] block mb-1">Restaurant Name</label>
            <input
              type="text"
              required
              value={form.restaurantName}
              onChange={(e) => setForm({ ...form, restaurantName: e.target.value })}
              className={PILOT_INPUT_CLASS}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#4D4540] block mb-1">Cuisine Concept</label>
            <input
              type="text"
              value={form.cuisineConcept}
              onChange={(e) => setForm({ ...form, cuisineConcept: e.target.value })}
              className={PILOT_INPUT_CLASS}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#4D4540] block mb-1">Reservation Desk Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={PILOT_INPUT_CLASS}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#4D4540] block mb-1">Operating Hours</label>
            <input
              type="text"
              value={form.openHours}
              onChange={(e) => setForm({ ...form, openHours: e.target.value })}
              className={PILOT_INPUT_CLASS}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#4D4540] block mb-1">Property Address</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className={PILOT_INPUT_CLASS}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#F0EDE9]">
          <div>
            <label className="text-xs font-semibold text-[#4D4540] block mb-1">GST Rate (%)</label>
            <input
              type="number"
              min={0}
              max={28}
              value={form.gstRatePercent}
              onChange={(e) => setForm({ ...form, gstRatePercent: Math.max(0, Number(e.target.value) || 0) })}
              className={PILOT_INPUT_CLASS}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#4D4540] block mb-1">Service Charge (%)</label>
            <input
              type="number"
              min={0}
              max={25}
              value={form.serviceChargePercent}
              onChange={(e) => setForm({ ...form, serviceChargePercent: Math.max(0, Number(e.target.value) || 0) })}
              className={PILOT_INPUT_CLASS}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#4D4540] block mb-1">Low-Stock Par Multiplier</label>
            <input
              type="number"
              step="0.1"
              min={0.5}
              max={3}
              value={form.lowStockDefaultMultiplier}
              onChange={(e) =>
                setForm({ ...form, lowStockDefaultMultiplier: Math.max(0.5, Number(e.target.value) || 1) })
              }
              className={PILOT_INPUT_CLASS}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <label className="flex items-center gap-2 text-xs font-medium text-[#1C1917] cursor-pointer">
            <input
              type="checkbox"
              checked={form.autoPrintKot}
              onChange={(e) => setForm({ ...form, autoPrintKot: e.target.checked })}
              className="accent-[#C2410C]"
            />
            Auto-dispatch KOT to Pass Printer
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-[#1C1917] cursor-pointer">
            <input
              type="checkbox"
              checked={form.acceptingReservations}
              onChange={(e) => setForm({ ...form, acceptingReservations: e.target.checked })}
              className="accent-[#C2410C]"
            />
            Accept Online Table Reservations
          </label>
        </div>

        <div className="flex justify-end pt-3 border-t border-[#E7E2DA]">
          <button type="submit" className={PILOT_PRIMARY_BTN_CLASS}>
            <Settings className="w-3.5 h-3.5" /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
