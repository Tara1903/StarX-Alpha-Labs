"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { DemoProductDefinition } from "../../types";
import { useDemoState } from "../../state/useDemoState";
import {
  UtensilsCrossed,
  ChefHat,
  Star,
  Calendar,
  Users,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  DollarSign,
  Info,
  Clock,
  Heart,
  Award,
  Send,
  Eye,
  Settings,
  X,
  RotateCcw,
} from "lucide-react";

// =============================================================================
// DOMAIN MODELS & TYPES
// =============================================================================

export interface ChefProfile {
  id: string;
  name: string;
  headline: string;
  culinaryStyle: string;
  city: string;
  rating: number;
  completedEvents: number;
  perPersonStarting: number;
  minGuests: number;
  maxGuests: number;
  image: string;
  coverImage: string;
  specialtyDishes: string[];
  bio: string;
  sampleMenu: { course: string; title: string; description: string }[];
}

export interface CateringInquiry {
  id: string;
  chefId: string;
  chefName: string;
  clientName: string;
  clientEmail: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  serviceStyle: "Multi-Course Plated" | "Family-Style Feast" | "Luxury Canapé Reception";
  winePairingIncluded: boolean;
  dietaryRestrictions: string[];
  status: "Inquiry Submitted" | "Proposal Under Review" | "Escrow Funded" | "Event Completed";
  estimatedTotal: number;
  escrowStages: { milestone: string; pct: number; amount: number; released: boolean }[];
  clientNotes?: string;
}

export interface MarketplaceState {
  activeView: "planner-marketplace" | "chef-studio";
  selectedCuisineFilter: string;
  selectedCity: string;
  inquiries: CateringInquiry[];
  savedChefs: string[];
}

const SAMPLE_CHEFS: ChefProfile[] = [
  {
    id: "chef-1",
    name: "Chef Jean-Luc Moreau",
    headline: "Former Sous Chef at L'Arpège · Modern French Haute Cuisine",
    culinaryStyle: "French Contemporary",
    city: "Paris & New York",
    rating: 4.98,
    completedEvents: 142,
    perPersonStarting: 185,
    minGuests: 6,
    maxGuests: 24,
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    specialtyDishes: ["Wild Turbot & Saffron Foam", "Smoked Duck Breast in Morels", "Grand Cru Chocolate Tart"],
    bio: "Classical Parisian training paired with biodynamic farm ingredients. Specializes in intimate private dining salons and seasonal tasting menus.",
    sampleMenu: [
      { course: "Amuse", title: "Oyster in Sea Fennel Broth", description: "Marennes oyster with cold-pressed dashi pearls." },
      { course: "Entrée", title: "Hand-Dived Scallop Carpaccio", description: "Thinly sliced Saint-Brieuc scallops with Oscietra caviar." },
      { course: "Plat", title: "Dry-Aged Squab & Fermented Cherries", description: "Slow-roasted breast, leg confit, and red chicory." },
      { course: "Dessert", title: "Fleur de Sel Valrhona Soufflé", description: "Hot molten center with Madagascar bourbon vanilla cream." },
    ],
  },
  {
    id: "chef-2",
    name: "Chef Amara Singh",
    headline: "Master of Royal Awadhi Dum Pukht & Modern Indian Feasts",
    culinaryStyle: "Royal Awadhi & Progressive Indian",
    city: "London & Mumbai",
    rating: 4.95,
    completedEvents: 188,
    perPersonStarting: 140,
    minGuests: 10,
    maxGuests: 60,
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    specialtyDishes: ["24-Hour Dum Handi Biryani", "Galouti Kebab on Sheermal", "Saffron Rabri Millefeuille"],
    bio: "Descendant of royal Lucknowi khansamas. Specializes in ceremonial banquets, slow clay-pot cooking, and fragrant spice architecture.",
    sampleMenu: [
      { course: "Appetizer", title: "Kakori & Galouti Kebab Duo", description: "Smoked melt-in-mouth lamb kebabs over artisanal saffron sheermal." },
      { course: "Mains", title: "Nalli Nihari & Dum Gosht Biryani", description: "Slow-simmered shank with sealed basmati clay pots." },
      { course: "Accompaniments", title: "Burani Raita & Taftan Bread", description: "Garlic tempered yogurt with clay-tandoor flatbread." },
      { course: "Dessert", title: "Shahi Tukda with Gold Vark", description: "Crisp clarified butter brioche soaked in cardamom clotted milk." },
    ],
  },
  {
    id: "chef-3",
    name: "Chef Matteo Rossi",
    headline: "Tuscan Woodfire Specialist & Handcrafted Pasta Artisan",
    culinaryStyle: "Rustic Italian & Tuscan Fire",
    city: "Florence & Los Angeles",
    rating: 4.92,
    completedEvents: 110,
    perPersonStarting: 160,
    minGuests: 8,
    maxGuests: 36,
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=600&q=80",
    coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    specialtyDishes: ["Hand-Rolled Pici al Cinghiale", "Bistecca alla Fiorentina Chianina", "Rosemary Olive Oil Cake"],
    bio: "Chianti valley native delivering table-side pasta rolling, binchotan woodfire carving, and curated estate Chianti Classico pairings.",
    sampleMenu: [
      { course: "Antipasto", title: "Crostini di Fegatini & Burrata", description: "Whipped chicken liver mousse with warm pugliese burrata." },
      { course: "Primo", title: "Pappardelle al Ragù di Cinghiale", description: "Hand-cut 40-egg yolk pasta with 12-hour braised wild boar." },
      { course: "Secondo", title: "Chianina Ribeye Florentine Cut", description: "Grilled over olive wood embers with sea salt and rosemary oil." },
      { course: "Dolce", title: "Traditional Tiramisù al Marsala", description: "Whipped mascarpone with savoiardi soaked in house espresso." },
    ],
  },
];

const INITIAL_STATE: MarketplaceState = {
  activeView: "planner-marketplace",
  selectedCuisineFilter: "All",
  selectedCity: "All",
  inquiries: [
    {
      id: "INQ-7721",
      chefId: "chef-1",
      chefName: "Chef Jean-Luc Moreau",
      clientName: "Eleanor Vance",
      clientEmail: "eleanor.vance@demo.internal",
      eventType: "Anniversary Private Dinner",
      eventDate: "2026-11-28",
      guestCount: 12,
      serviceStyle: "Multi-Course Plated",
      winePairingIncluded: true,
      dietaryRestrictions: ["Gluten-Free (1 guest)", "Pescatarian (2 guests)"],
      status: "Escrow Funded",
      estimatedTotal: 2940,
      escrowStages: [
        { milestone: "Tasting & Date Hold", pct: 25, amount: 735, released: true },
        { milestone: "Provisioning & Prep (48h prior)", pct: 50, amount: 1470, released: true },
        { milestone: "Final Post-Event Sign-off", pct: 25, amount: 735, released: false },
      ],
      clientNotes: "Please highlight rare Burgundy pairings with the squab course.",
    },
  ],
  savedChefs: ["chef-1"],
};

export function GourmetTableMarketplaceApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState } = useDemoState<MarketplaceState>(
    product.slug,
    INITIAL_STATE
  );

  const [selectedChefForInquiry, setSelectedChefForInquiry] = useState<ChefProfile | null>(null);
  const [inquiryGuestCount, setInquiryGuestCount] = useState<number>(10);
  const [inquiryServiceStyle, setInquiryServiceStyle] = useState<CateringInquiry["serviceStyle"]>("Multi-Course Plated");
  const [inquiryWineIncluded, setInquiryWineIncluded] = useState<boolean>(true);
  const [inquiryDate, setInquiryDate] = useState<string>("2026-12-14");
  const [inquiryClientName, setInquiryClientName] = useState<string>("Julian Ward");
  const [inquiryNotes, setInquiryNotes] = useState<string>("");
  const [bookingSuccessModal, setBookingSuccessModal] = useState<CateringInquiry | null>(null);

  // Filtered Chefs
  const filteredChefs = useMemo(() => {
    return SAMPLE_CHEFS.filter((chef) => {
      if (state.selectedCuisineFilter !== "All" && !chef.culinaryStyle.includes(state.selectedCuisineFilter)) {
        return false;
      }
      return true;
    });
  }, [state.selectedCuisineFilter]);

  // Dynamic Quote Calculation
  const calculatedQuote = useMemo(() => {
    if (!selectedChefForInquiry) return 0;
    const basePerPerson = selectedChefForInquiry.perPersonStarting;
    const styleMultiplier = inquiryServiceStyle === "Multi-Course Plated" ? 1.0 : inquiryServiceStyle === "Luxury Canapé Reception" ? 0.85 : 0.9;
    const wineCost = inquiryWineIncluded ? 65 : 0;
    const perGuestTotal = (basePerPerson * styleMultiplier) + wineCost;
    return Math.round(perGuestTotal * inquiryGuestCount);
  }, [selectedChefForInquiry, inquiryGuestCount, inquiryServiceStyle, inquiryWineIncluded]);

  // Handle Submit Proposal
  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChefForInquiry) return;

    const total = calculatedQuote;
    const newInq: CateringInquiry = {
      id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      chefId: selectedChefForInquiry.id,
      chefName: selectedChefForInquiry.name,
      clientName: inquiryClientName || "Private Client",
      clientEmail: "client@demo.starx.internal",
      eventType: "Private Celebration Feast",
      eventDate: inquiryDate,
      guestCount: inquiryGuestCount,
      serviceStyle: inquiryServiceStyle,
      winePairingIncluded: inquiryWineIncluded,
      dietaryRestrictions: ["Chef-Coordinated Menu"],
      status: "Escrow Funded",
      estimatedTotal: total,
      escrowStages: [
        { milestone: "Date Lock & Menu Drafting", pct: 25, amount: Math.round(total * 0.25), released: true },
        { milestone: "Commissary Sourcing (48h prior)", pct: 50, amount: Math.round(total * 0.5), released: false },
        { milestone: "Final Post-Event Release", pct: 25, amount: Math.round(total * 0.25), released: false },
      ],
      clientNotes: inquiryNotes,
    };

    setState((prev) => ({
      ...prev,
      inquiries: [newInq, ...prev.inquiries],
    }));

    setSelectedChefForInquiry(null);
    setBookingSuccessModal(newInq);
  };

  return (
    <div className="min-h-screen bg-[#0E070A] text-[#FAF5EE] flex flex-col font-sans selection:bg-[#B33951]/30">
      {/* Top Header & Two-Sided Persona Switcher */}
      <header className="sticky top-0 z-40 bg-[#160B10]/90 backdrop-blur-md border-b border-[#2B141E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/demos/${product.categorySlug}/${product.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4AF37] hover:text-[#FFF8E7] px-3 py-1.5 rounded-lg bg-[#240F18] border border-[#3E1A29]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Blueprint</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#B33951] text-white flex items-center justify-center font-serif text-sm font-bold shadow-md shadow-[#B33951]/30">
                G
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                  Gourmet Table
                </h1>
                <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
                  Model #165 · Private Chef & Catering Marketplace
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher: Customer vs Chef Studio */}
            <div className="flex rounded-xl bg-[#240F18] p-1 border border-[#3E1A29] text-xs font-medium">
              <button
                onClick={() => setState((s) => ({ ...s, activeView: "planner-marketplace" }))}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  state.activeView === "planner-marketplace"
                    ? "bg-[#B33951] text-white font-semibold shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Event Planner View
              </button>
              <button
                onClick={() => setState((s) => ({ ...s, activeView: "chef-studio" }))}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  state.activeView === "chef-studio"
                    ? "bg-[#B33951] text-white font-semibold shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span>Chef Studio ({state.inquiries.length})</span>
              </button>
            </div>

            <button
              onClick={resetState}
              title="Reset Marketplace State"
              className="p-2 rounded-xl bg-[#240F18] border border-[#3E1A29] text-slate-400 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* VIEW 1: CUSTOMER EVENT PLANNER MARKETPLACE */}
      {state.activeView === "planner-marketplace" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
          {/* Marketplace Hero & Discovery Filters */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#240D17] via-[#1A0A11] to-[#12070C] p-6 sm:p-10 border border-[#3A1626] shadow-2xl">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-[0.25em] bg-[#3B1527] px-3 py-1 rounded-full border border-[#D4AF37]/30 inline-block">
                Artisanal Private Dining on Demand
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#FFFBF5] leading-tight">
                Hire World-Class Chefs <br />
                <span className="italic text-[#D4AF37]">for Unforgettable Feasts</span>
              </h2>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                Connect with verified Michelin-trained culinary artists, review interactive course portfolios, customize per-head quotes, and fund through protected milestone escrow.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="pt-6 flex flex-wrap gap-2 text-xs font-mono">
              {["All", "French Contemporary", "Royal Awadhi", "Rustic Italian"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setState((s) => ({ ...s, selectedCuisineFilter: cat }))}
                  className={`px-3.5 py-1.5 rounded-full border transition-all ${
                    state.selectedCuisineFilter === cat
                      ? "bg-[#D4AF37] text-black font-semibold border-[#D4AF37]"
                      : "bg-[#1F0A14] text-slate-300 border-[#3B1527] hover:border-[#D4AF37]/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Chefs Roster Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChefs.map((chef) => (
              <div
                key={chef.id}
                className="rounded-2xl bg-[#160B11] border border-[#2B1420] overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Cover & Avatar Header */}
                  <div className="relative h-44 overflow-hidden bg-[#240F19]">
                    <img
                      src={chef.coverImage}
                      alt={chef.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#160B11] via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/75 backdrop-blur-xs text-[11px] font-mono text-amber-300 flex items-center gap-1 border border-amber-400/30">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{chef.rating}</span>
                      <span className="text-slate-400">({chef.completedEvents})</span>
                    </div>

                    <div className="absolute -bottom-4 left-4 flex items-end gap-3">
                      <img
                        src={chef.image}
                        alt={chef.name}
                        className="w-16 h-16 rounded-full border-2 border-[#D4AF37] object-cover shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="pt-6 p-5 space-y-3">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                        {chef.name}
                      </h3>
                      <p className="text-xs text-[#D4AF37] font-mono mt-0.5">{chef.culinaryStyle}</p>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-2 font-light">
                        {chef.bio}
                      </p>
                    </div>

                    {/* Signature Dishes Tags */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        Signature Highlights:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {chef.specialtyDishes.map((dish) => (
                          <span
                            key={dish}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#240F1A] text-slate-300 border border-[#3E1A2B]"
                          >
                            {dish}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="p-5 border-t border-[#26111D] bg-[#11070D] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">Starting From</span>
                    <span className="text-lg font-serif font-bold text-white">
                      ${chef.perPersonStarting}{" "}
                      <span className="text-xs font-mono font-normal text-slate-400">/ guest</span>
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedChefForInquiry(chef);
                      setInquiryGuestCount(10);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-black font-semibold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1 shadow"
                  >
                    <span>Request Proposal</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* VIEW 2: CHEF STUDIO / VENDOR PORTAL */}
      {state.activeView === "chef-studio" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2E1422]">
            <div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="text-2xl font-serif text-white font-bold">
                  Chef Culinary Studio & Booking Ledger
                </h2>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Managing private bookings, custom tasting proposals, and milestone escrow distributions.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#2A101E] text-[#D4AF37] border border-[#D4AF37]/30 self-start sm:self-auto">
              Simulated Escrow Milestones
            </span>
          </div>

          {/* Inquiries Table / Ledger */}
          <div className="rounded-2xl bg-[#160B12] border border-[#2E1422] overflow-hidden shadow-xl">
            <div className="p-5 border-b border-[#2E1422] flex justify-between items-center">
              <h3 className="text-sm font-serif text-white font-semibold">Active Booking Pipeline</h3>
              <span className="text-xs font-mono text-slate-400">{state.inquiries.length} Requests</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#10070D] text-slate-400 border-b border-[#26111D]">
                  <tr>
                    <th className="py-3 px-4">Inquiry Ref</th>
                    <th className="py-3 px-4">Assigned Chef</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Event Date</th>
                    <th className="py-3 px-4">Guests</th>
                    <th className="py-3 px-4">Total Quote</th>
                    <th className="py-3 px-4">Escrow Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#26111D]">
                  {state.inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-[#200E19] transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-[#D4AF37]">{inq.id}</td>
                      <td className="py-3.5 px-4 text-white font-serif">{inq.chefName}</td>
                      <td className="py-3.5 px-4 text-slate-300">{inq.clientName}</td>
                      <td className="py-3.5 px-4 text-slate-400">{inq.eventDate}</td>
                      <td className="py-3.5 px-4 text-slate-200">{inq.guestCount} Guests</td>
                      <td className="py-3.5 px-4 font-bold text-white">${inq.estimatedTotal.toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {inq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* PROPOSAL & ESCROW CALCULATOR MODAL */}
      {selectedChefForInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#180C13] border border-[#3E1A2C] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#2E1422]">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
                  Request Headcount Quote
                </span>
                <h3 className="text-xl font-serif text-white font-bold">
                  {selectedChefForInquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedChefForInquiry(null)}
                className="p-1.5 rounded-full bg-[#240F1A] text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={inquiryClientName}
                  onChange={(e) => setInquiryClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#10070D] border border-[#2E1422] text-white focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">Event Date</label>
                  <input
                    type="date"
                    value={inquiryDate}
                    onChange={(e) => setInquiryDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#10070D] border border-[#2E1422] text-white focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">
                    Guest Count: <span className="text-[#D4AF37] font-bold">{inquiryGuestCount}</span>
                  </label>
                  <input
                    type="range"
                    min={selectedChefForInquiry.minGuests}
                    max={selectedChefForInquiry.maxGuests}
                    value={inquiryGuestCount}
                    onChange={(e) => setInquiryGuestCount(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Service Format</label>
                <select
                  value={inquiryServiceStyle}
                  onChange={(e) => setInquiryServiceStyle(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#10070D] border border-[#2E1422] text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Multi-Course Plated">Multi-Course Plated (Tasting Format)</option>
                  <option value="Family-Style Feast">Family-Style Shared Feast</option>
                  <option value="Luxury Canapé Reception">Luxury Canapé & Cocktail Reception</option>
                </select>
              </div>

              <label className="flex items-center gap-2 p-3 rounded-xl bg-[#10070D] border border-[#2E1422] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inquiryWineIncluded}
                  onChange={(e) => setInquiryWineIncluded(e.target.checked)}
                  className="accent-[#D4AF37]"
                />
                <span className="text-slate-300">
                  Include Sommelier Wine Pairing (+$65/guest allocation)
                </span>
              </label>

              {/* Dynamic Quote & Escrow Schedule Breakdown */}
              <div className="p-4 rounded-xl bg-[#200D18] border border-[#3E1A2C] space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-white">
                  <span>Estimated Total Proposal:</span>
                  <span className="text-lg text-[#D4AF37] font-serif">${calculatedQuote.toLocaleString()}</span>
                </div>
                <div className="text-[10px] text-slate-400 leading-relaxed">
                  Protected via 3-stage milestone escrow:
                  <ul className="list-disc pl-4 mt-1 space-y-0.5">
                    <li>25% ($ {Math.round(calculatedQuote * 0.25)}) on Chef Date Lock</li>
                    <li>50% ($ {Math.round(calculatedQuote * 0.5)}) on 48h Provisioning</li>
                    <li>25% ($ {Math.round(calculatedQuote * 0.25)}) on Final Post-Event Sign-off</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#D4AF37]/20"
                >
                  Submit Proposal & Reserve Escrow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS CONFIRMATION MODAL */}
      {bookingSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#180C13] border border-[#D4AF37] rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-serif text-white font-bold">
              Proposal Dossier Transmitted!
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              Inquiry <span className="text-[#D4AF37] font-semibold">{bookingSuccessModal.id}</span> for{" "}
              <span className="text-white">{bookingSuccessModal.chefName}</span> has been logged into the Chef Studio pipeline.
            </p>
            <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/30">
              Simulated Milestone Escrow Initiated · Zero Actual Credit Card Charge
            </div>

            <div className="pt-3">
              <button
                onClick={() => setBookingSuccessModal(null)}
                className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-[#E5C158]"
              >
                Close & Explore Marketplace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER AUDIT NOTICE */}
      <footer className="border-t border-[#26111D] bg-[#0A0407] py-6 px-4 text-center text-xs font-mono text-slate-500">
        StarX Forge Marketplace Engine · Model #165 Gourmet Table · Two-Sided Private Chef Platform with Milestone Escrow Simulation.
      </footer>
    </div>
  );
}
