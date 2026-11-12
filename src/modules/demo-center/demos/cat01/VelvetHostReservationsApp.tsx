"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  Crown,
  MessageSquare,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { DemoProductDefinition } from "../../types";
import { toDemoModel } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

type TabId = "timeline" | "waitlist" | "vip" | "deposits";

interface ReservationSlot {
  id: string;
  guestName: string;
  partySize: number;
  zone: "Salon Window" | "Chef Counter" | "Velvet Booths";
  tableCode: string;
  timeSlot: "18:00" | "19:00" | "20:00" | "21:00";
  status: "Confirmed" | "Seated" | "Turn Overtime" | "Completed";
  vipTier: "Standard" | "VIP Tier 1" | "Corp VIP";
  depositAmt: number;
  notes: string;
}

interface WaitlistEntry {
  id: string;
  guestName: string;
  partySize: number;
  quotedMins: number;
  preference: string;
  smsSent: boolean;
  seatedTable: string | null;
}

interface VipGuestProfile {
  id: string;
  guestName: string;
  visits: number;
  favoriteTable: string;
  dietaryTags: string[];
  sommelierNote: string;
}

interface HostStandState {
  venueName: string;
  serviceWindow: string;
  reservations: ReservationSlot[];
  waitlist: WaitlistEntry[];
  vipProfiles: VipGuestProfile[];
}

const VELVET_HOST_SEED: HostStandState = {
  venueName: "VelvetHost Reservations",
  serviceWindow: "Dinner Service · 18:00–23:00",
  reservations: [
    {
      id: "res-1",
      guestName: "Elena Rostova",
      partySize: 2,
      zone: "Salon Window",
      tableCode: "W1",
      timeSlot: "20:00",
      status: "Confirmed",
      vipTier: "VIP Tier 1",
      depositAmt: 3500,
      notes: "Champagne chilled on arrival · Window panoramic",
    },
    {
      id: "res-2",
      guestName: "Laurent Family",
      partySize: 4,
      zone: "Salon Window",
      tableCode: "W3",
      timeSlot: "19:00",
      status: "Seated",
      vipTier: "Standard",
      depositAmt: 4000,
      notes: "6-Course Tasting Menu w/ Caviar add-on",
    },
    {
      id: "res-3",
      guestName: "Venture Exec Group",
      partySize: 4,
      zone: "Chef Counter",
      tableCode: "C5",
      timeSlot: "19:00",
      status: "Seated",
      vipTier: "Corp VIP",
      depositAmt: 8000,
      notes: "Sommelier Grand Cru pairing · Nut allergy (1 guest)",
    },
    {
      id: "res-4",
      guestName: "Dr. Aris Vance",
      partySize: 6,
      zone: "Velvet Booths",
      tableCode: "B2",
      timeSlot: "18:00",
      status: "Turn Overtime",
      vipTier: "VIP Tier 1",
      depositAmt: 5000,
      notes: "Digestifs served · Next party arriving 15m",
    },
  ],
  waitlist: [
    { id: "wl-1", guestName: "Marcus Sterling", partySize: 2, quotedMins: 20, preference: "Salon Window W2", smsSent: false, seatedTable: null },
    { id: "wl-2", guestName: "Camilla & Guest", partySize: 4, quotedMins: 35, preference: "Velvet Booth B2", smsSent: true, seatedTable: null },
    { id: "wl-3", guestName: "Kenji Takahashi", partySize: 2, quotedMins: 40, preference: "Chef Counter C1", smsSent: false, seatedTable: null },
  ],
  vipProfiles: [
    { id: "vip-1", guestName: "Elena Rostova", visits: 19, favoriteTable: "Table W1", dietaryTags: ["Shellfish-Free", "Dom Pérignon"], sommelierNote: "Prefers Blanc de Blancs Extra Brut cooled to 8°C" },
    { id: "vip-2", guestName: "Hon. Clara Dupont", visits: 14, favoriteTable: "Booth B4", dietaryTags: ["No Photography", "Pescatarian"], sommelierNote: "Rare Left Bank Bordeaux verticals · Discreet side entrance" },
    { id: "vip-3", guestName: "Sovereign Asset Grp", visits: 28, favoriteTable: "Table W4", dietaryTags: ["Direct Folio", "HALAL"], sommelierNote: "Zero-proof botanical pairing menu + espresso flight" },
  ],
};

export function VelvetHostReservationsApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState } = useDemoState<HostStandState>(
    product.slug,
    VELVET_HOST_SEED
  );
  const [tab, setTab] = useState<TabId>("timeline");
  const [partyFilter, setPartyFilter] = useState<string>("All");
  const [guestInput, setGuestInput] = useState("");
  const [partyInput, setPartyInput] = useState("2");
  const [zoneInput, setZoneInput] = useState<ReservationSlot["zone"]>("Salon Window");
  const [slotInput, setSlotInput] = useState<ReservationSlot["timeSlot"]>("20:00");
  const [noteInput, setNoteInput] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [customOpen, setCustomOpen] = useState(false);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((curr) => (curr === msg ? null : curr)), 2600);
  };

  const totalCovers = useMemo(
    () => state.reservations.reduce((s, r) => s + r.partySize, 0) + 74,
    [state.reservations]
  );

  const totalDeposits = useMemo(
    () => state.reservations.reduce((s, r) => s + r.depositAmt, 0),
    [state.reservations]
  );

  const filteredReservations = useMemo(() => {
    if (partyFilter === "All") return state.reservations;
    if (partyFilter === "2p") return state.reservations.filter((r) => r.partySize <= 2);
    if (partyFilter === "4p") return state.reservations.filter((r) => r.partySize >= 3 && r.partySize <= 4);
    return state.reservations.filter((r) => r.partySize >= 5);
  }, [state.reservations, partyFilter]);

  const handleBookReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const guest = guestInput.trim();
    if (!guest) return;
    const size = Math.max(1, Math.min(12, Number(partyInput) || 2));
    const tableCode = zoneInput === "Salon Window" ? "W2" : zoneInput === "Chef Counter" ? "C3" : "B4";
    const created: ReservationSlot = {
      id: `res-${Date.now()}`,
      guestName: guest,
      partySize: size,
      zone: zoneInput,
      tableCode,
      timeSlot: slotInput,
      status: "Confirmed",
      vipTier: size >= 4 ? "VIP Tier 1" : "Standard",
      depositAmt: size * 1000,
      notes: noteInput.trim() || "Host confirmation + pre-authorized seating hold",
    };
    setState((prev) => ({
      ...prev,
      reservations: [created, ...prev.reservations],
    }));
    setGuestInput("");
    setNoteInput("");
    notify(`Reserved ${tableCode} (${zoneInput}) for ${guest} at ${slotInput}.`);
  };

  const advanceReservationStatus = (id: string) => {
    const order: ReservationSlot["status"][] = ["Confirmed", "Seated", "Turn Overtime", "Completed"];
    setState((prev) => ({
      ...prev,
      reservations: prev.reservations.map((r) => {
        if (r.id !== id) return r;
        const idx = order.indexOf(r.status);
        return { ...r, status: order[(idx + 1) % order.length] };
      }),
    }));
  };

  const seatWalkIn = (id: string) => {
    const target = state.waitlist.find((w) => w.id === id);
    if (!target) return;
    setState((prev) => ({
      ...prev,
      waitlist: prev.waitlist.map((w) =>
        w.id === id ? { ...w, seatedTable: w.preference.split(" ").pop() || "W2", smsSent: true } : w
      ),
      reservations: [
        {
          id: `res-wl-${Date.now()}`,
          guestName: target.guestName,
          partySize: target.partySize,
          zone: "Salon Window",
          tableCode: target.preference.split(" ").pop() || "W2",
          timeSlot: "20:00",
          status: "Seated",
          vipTier: "Standard",
          depositAmt: 0,
          notes: `Seated from walk-in waitlist (${target.preference})`,
        },
        ...prev.reservations,
      ],
    }));
    notify(`Seated walk-in ${target.guestName} (${target.partySize}p).`);
  };

  const toggleWalkInSms = (id: string) => {
    setState((prev) => ({
      ...prev,
      waitlist: prev.waitlist.map((w) => (w.id === id ? { ...w, smsSent: true } : w)),
    }));
    notify("SMS table-ready ping sent via host gateway.");
  };

  return (
    <div className="min-h-screen bg-[#16121C] text-[#E8DFEE] flex flex-col font-sans">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-[#D4AF37] text-[#241A00] text-xs font-bold shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Top Host Header */}
      <header className="border-b border-[#4D4635]/60 bg-[#1E1A24] px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/demos/food-hospitality/table-reservation-booking"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#4D4635] text-xs text-[#D0C5AF] hover:bg-[#221E28]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div>
            <div className="font-serif text-base font-bold text-[#F2CA50] tracking-wide">
              {state.venueName}
            </div>
            <div className="text-[11px] text-[#D0C5AF]">{state.serviceWindow}</div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "timeline", label: `Floor Timeline (${state.reservations.length})` },
            { id: "waitlist", label: `Walk-In SMS Queue (${state.waitlist.filter((w) => !w.seatedTable).length})` },
            { id: "vip", label: "VIP Guestbook" },
            { id: "deposits", label: "Deposit Holds" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as TabId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                tab === item.id
                  ? "bg-[#D4AF37] text-[#241A00]"
                  : "bg-[#2D2833] text-[#E8DFEE] hover:bg-[#38333E]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#221E28] border border-[#4D4635] text-xs font-semibold text-[#F2CA50]">
            Covers: {totalCovers} / 112
          </span>
          <button
            type="button"
            onClick={() => {
              resetState();
              notify("Floor timeline and walk-in queue reset.");
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#4D4635] bg-[#221E28] text-xs text-[#E8DFEE] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            type="button"
            onClick={() => setCustomOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#3C2F00] text-[#F2CA50] text-xs font-semibold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Customize
          </button>
        </div>
      </header>

      {/* VIEW 1: TIMELINE MATRIX + QUICK RESERVATION BOOKING */}
      {tab === "timeline" && (
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-5 p-4 md:p-6">
          <div className="xl:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  Real-Time Host Matrix
                </span>
                <h1 className="font-serif text-xl font-bold text-[#E8DFEE]">
                  Salon, Chef Counter & Velvet Booth Reservations
                </h1>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                {["All", "2p", "4p", "6p+"].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setPartyFilter(sz)}
                    className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer ${
                      partyFilter === sz
                        ? "bg-[#D4AF37] text-[#241A00]"
                        : "bg-[#221E28] text-[#D0C5AF] border border-[#4D4635]/60"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredReservations.map((res) => (
                <div
                  key={res.id}
                  className="rounded-2xl border border-[#4D4635]/70 bg-[#221E28] p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-serif text-base font-bold text-[#E8DFEE]">
                          {res.guestName}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#38333E] text-[11px] font-semibold text-[#F2CA50]">
                          {res.tableCode} · {res.partySize}p
                        </span>
                        {res.vipTier !== "Standard" && (
                          <span className="px-2 py-0.5 rounded bg-[#554300] text-[10px] font-bold text-[#FFE088] inline-flex items-center gap-1">
                            <Crown className="w-3 h-3" /> {res.vipTier}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#D0C5AF] mt-1">
                        {res.zone} · Slot {res.timeSlot}
                      </div>
                    </div>

                    <span
                      className={`shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        res.status === "Seated"
                          ? "bg-[#065F46] text-[#A7F3D0]"
                          : res.status === "Turn Overtime"
                          ? "bg-[#93000A] text-[#FFDAD6]"
                          : res.status === "Confirmed"
                          ? "bg-[#554300] text-[#FFE088]"
                          : "bg-[#38333E] text-[#D0C5AF]"
                      }`}
                    >
                      {res.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#D0C5AF]">{res.notes}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#38333E] text-xs">
                    <span className="text-[#F2CA50] font-semibold">
                      Deposit Hold: ₹{res.depositAmt.toLocaleString("en-IN")}
                    </span>
                    <button
                      type="button"
                      onClick={() => advanceReservationStatus(res.id)}
                      className="px-3 py-1 rounded-lg bg-[#38333E] hover:bg-[#4B4756] text-[#E8DFEE] font-semibold cursor-pointer"
                    >
                      Advance Turn Stage →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 4 cols: Book Table + Live Walk-In Queue */}
          <aside className="xl:col-span-4 space-y-4">
            <div className="rounded-2xl border border-[#4D4635]/70 bg-[#221E28] p-5 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  Host Desk Reservation
                </span>
                <h2 className="font-serif text-lg font-bold text-[#E8DFEE]">+ Book Guest Table</h2>
              </div>

              <form onSubmit={handleBookReservation} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#D0C5AF] mb-1">Guest / Party Name</label>
                  <input
                    type="text"
                    value={guestInput}
                    onChange={(e) => setGuestInput(e.target.value)}
                    placeholder="Enter guest name..."
                    className="w-full px-3 py-2 rounded-xl border border-[#4D4635] bg-[#16121C] text-[#E8DFEE]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#D0C5AF] mb-1">Covers</label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={partyInput}
                      onChange={(e) => setPartyInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#4D4635] bg-[#16121C] text-[#E8DFEE]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#D0C5AF] mb-1">Time Slot</label>
                    <select
                      value={slotInput}
                      onChange={(e) => setSlotInput(e.target.value as ReservationSlot["timeSlot"])}
                      className="w-full px-3 py-2 rounded-xl border border-[#4D4635] bg-[#16121C] text-[#E8DFEE]"
                    >
                      <option value="18:00">18:00</option>
                      <option value="19:00">19:00</option>
                      <option value="20:00">20:00</option>
                      <option value="21:00">21:00</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[#D0C5AF] mb-1">Dining Zone</label>
                  <select
                    value={zoneInput}
                    onChange={(e) => setZoneInput(e.target.value as ReservationSlot["zone"])}
                    className="w-full px-3 py-2 rounded-xl border border-[#4D4635] bg-[#16121C] text-[#E8DFEE]"
                  >
                    <option value="Salon Window">Salon Window</option>
                    <option value="Chef Counter">Chef Counter</option>
                    <option value="Velvet Booths">Velvet Booths</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#D0C5AF] mb-1">Occasion / Dietary Note</label>
                  <input
                    type="text"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Anniversary, nut allergy, sommelier..."
                    className="w-full px-3 py-2 rounded-xl border border-[#4D4635] bg-[#16121C] text-[#E8DFEE]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F2CA50] text-[#241A00] font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Confirm Table Booking
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-[#4D4635]/70 bg-[#221E28] p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F2CA50]">Walk-In Stand Queue</span>
                <span className="text-[11px] text-[#D0C5AF]">Avg Quote: 25m</span>
              </div>
              {state.waitlist.slice(0, 2).map((w) => (
                <div key={w.id} className="p-2.5 rounded-xl bg-[#16121C] border border-[#38333E] text-xs space-y-2">
                  <div className="flex justify-between font-semibold">
                    <span>{w.guestName} ({w.partySize}p)</span>
                    <span className="text-[#F2CA50]">{w.seatedTable ? `Seated ${w.seatedTable}` : `${w.quotedMins}m`}</span>
                  </div>
                  {!w.seatedTable && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => seatWalkIn(w.id)}
                        className="flex-1 py-1 rounded bg-[#D4AF37] text-[#241A00] font-bold cursor-pointer"
                      >
                        Seat Table
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleWalkInSms(w.id)}
                        className="px-2.5 py-1 rounded border border-[#4D4635] text-[#D0C5AF] cursor-pointer"
                      >
                        {w.smsSent ? "SMS Sent ✓" : "Notify SMS"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* VIEW 2: FULL WALK-IN & SMS WAITLIST */}
      {tab === "waitlist" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="font-serif text-xl font-bold text-[#E8DFEE]">Live Walk-In & SMS Waitlist</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.waitlist.map((w) => (
              <div key={w.id} className="rounded-2xl border border-[#4D4635]/70 bg-[#221E28] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base font-bold text-[#F2CA50]">{w.guestName}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#38333E]">{w.partySize} Guests</span>
                </div>
                <div className="text-xs text-[#D0C5AF] space-y-1">
                  <div>Preference: {w.preference}</div>
                  <div>Quoted Wait: {w.quotedMins} mins</div>
                  <div>Status: {w.seatedTable ? `Seated at ${w.seatedTable}` : "Waiting in Bar Lounge"}</div>
                </div>
                {!w.seatedTable && (
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => seatWalkIn(w.id)}
                      className="flex-1 py-2 rounded-xl bg-[#D4AF37] text-[#241A00] text-xs font-bold cursor-pointer"
                    >
                      Seat Table
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleWalkInSms(w.id)}
                      className="px-3 py-2 rounded-xl border border-[#4D4635] text-xs cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 inline mr-1" />
                      {w.smsSent ? "Notified" : "SMS"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: VIP GUESTBOOK */}
      {tab === "vip" && (
        <div className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto space-y-4">
          <h1 className="font-serif text-xl font-bold text-[#E8DFEE]">VIP Guestbook & Sommelier Preferences</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.vipProfiles.map((v) => (
              <div key={v.id} className="rounded-2xl border border-[#4D4635]/70 bg-[#221E28] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base font-bold text-[#F2CA50]">{v.guestName}</span>
                  <span className="text-xs text-[#D0C5AF]">{v.visits} Visits</span>
                </div>
                <div className="text-xs text-[#E8DFEE]">Preferred Seat: {v.favoriteTable}</div>
                <div className="flex flex-wrap gap-1.5">
                  {v.dietaryTags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-[#38333E] text-[11px] text-[#FFE088]">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#D0C5AF]">{v.sommelierNote}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: DEPOSIT HOLDS & NO-SHOW PROTECTION */}
      {tab === "deposits" && (
        <div className="flex-1 p-4 md:p-6 max-w-4xl w-full mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-xl font-bold text-[#E8DFEE]">Pre-Authorized Table Deposits</h1>
            <span className="px-3 py-1 rounded-full bg-[#554300] text-[#FFE088] text-xs font-bold">
              Secured Tonight: ₹{totalDeposits.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="rounded-2xl border border-[#4D4635]/70 bg-[#221E28] divide-y divide-[#38333E]">
            {state.reservations.map((r) => (
              <div key={r.id} className="p-4 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-sm text-[#E8DFEE]">{r.guestName} ({r.tableCode})</div>
                  <div className="text-[#D0C5AF]">{r.zone} · {r.timeSlot} · {r.partySize} Covers</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#F2CA50]">₹{r.depositAmt.toLocaleString("en-IN")} Held</div>
                  <div className="text-[11px] text-[#A7F3D0]">0% No-Show Guarantee</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <CustomizationModal demo={toDemoModel(product)} isOpen={customOpen} onClose={() => setCustomOpen(false)} />
    </div>
  );
}
