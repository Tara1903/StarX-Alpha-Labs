"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Armchair,
  Maximize2,
  Layers,
  Truck,
  Building2,
  FileText,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Minus,
  Trash2,
  Search,
  RotateCcw,
  Sliders,
  DollarSign,
  Compass,
  Palette,
  ShieldCheck,
  PackageCheck,
  X,
  Printer,
  ChevronRight,
  Info,
} from "lucide-react";
import { toDemoModel, type DemoItem } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

interface FurniturePiece {
  id: string;
  sku: string;
  name: string;
  category: "Living Room" | "Dining Sanctuary" | "Executive Study" | "Master Bedroom";
  designer: string;
  dimensions: {
    w: number;
    d: number;
    h: number;
    seatHeight?: number;
    unit: "cm";
  };
  materials: {
    woodOptions: string[];
    upholsteryOptions: string[];
  };
  price: number;
  costPrice: number;
  leadTime: string;
  stockDC: number;
  showroomDisplay: boolean;
  imageUrl: string;
}

interface QuotationLineItem {
  furnitureId: string;
  selectedWood: string;
  selectedUpholstery: string;
  roomAllocation: string;
  quantity: number;
  unitPrice: number;
}

interface DeliverySchedule {
  bookingId: string;
  projectTitle: string;
  clientAddress: string;
  scheduledDate: string;
  timeSlot: string;
  teamLead: string;
  accessNotes: string;
  status: "Confirmed" | "En Route" | "Assembled & Inspected";
}

interface FurnitureSupplier {
  id: string;
  workshop: string;
  location: string;
  specialty: string;
  woodCertifications: string;
  currentWorkload: string;
  activeOrders: number;
}

interface FurnitureState {
  currentShowroom: string;
  activeSpace: string;
  selectedWoodMap: Record<string, string>;
  selectedUpholsteryMap: Record<string, string>;
  projectFolio: {
    title: string;
    architect: string;
    clientName: string;
    clientEmail: string;
    tradeDiscountPct: number;
    whiteGloveSelected: boolean;
    whiteGloveFee: number;
  };
  quotationItems: QuotationLineItem[];
  products: FurniturePiece[];
  schedules: DeliverySchedule[];
  suppliers: FurnitureSupplier[];
  quotationHistory: {
    quoteNo: string;
    client: string;
    total: number;
    depositPaid: number;
    date: string;
    status: "Draft" | "Deposit Received" | "In Production";
  }[];
}

const NORDIC_SEED: FurnitureState = {
  currentShowroom: "Stockholm Flagship Atelier • Birger Jarlsgatan 14",
  activeSpace: "All Spaces",
  selectedWoodMap: {
    "furn-1": "Smoked Solid Oak",
    "furn-2": "Natural White Oak",
    "furn-3": "Raw Roman Travertine",
    "furn-4": "Walnut & Brass",
  },
  selectedUpholsteryMap: {
    "furn-1": "Sand Wool Bouclé",
    "furn-2": "Cognac Aniline Leather",
    "furn-3": "Honed Matte Stone",
    "furn-4": "Charcoal Mohair Velvet",
  },
  projectFolio: {
    title: "Villa Djursholm Residence",
    architect: "Lind & Partners Arkitektur",
    clientName: "Astrid & Henrik Bergman",
    clientEmail: "astrid.bergman@djursholm.se",
    tradeDiscountPct: 15,
    whiteGloveSelected: true,
    whiteGloveFee: 450,
  },
  quotationItems: [
    {
      furnitureId: "furn-1",
      selectedWood: "Smoked Solid Oak",
      selectedUpholstery: "Sand Wool Bouclé",
      roomAllocation: "Main Salon",
      quantity: 1,
      unitPrice: 3850,
    },
    {
      furnitureId: "furn-3",
      selectedWood: "Raw Roman Travertine",
      selectedUpholstery: "Honed Matte Stone",
      roomAllocation: "Main Salon Fireside",
      quantity: 1,
      unitPrice: 2150,
    },
  ],
  products: [
    {
      id: "furn-1",
      sku: "ARM-LND-01",
      name: "The Lund Sculptural Lounge Chair",
      category: "Living Room",
      designer: "Jesper Nygård (2025)",
      dimensions: { w: 92, d: 88, h: 78, seatHeight: 42, unit: "cm" },
      materials: {
        woodOptions: ["Smoked Solid Oak", "Natural White Oak", "Black Ash"],
        upholsteryOptions: ["Sand Wool Bouclé", "Cognac Aniline Leather", "Moss Green Velvet"],
      },
      price: 3850,
      costPrice: 1650,
      leadTime: "In Stock (Central DC)",
      stockDC: 4,
      showroomDisplay: true,
      imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "furn-2",
      sku: "TBL-OSL-04",
      name: "Oslo Architectural Extension Table",
      category: "Dining Sanctuary",
      designer: "Studio Kvist",
      dimensions: { w: 260, d: 110, h: 74, unit: "cm" },
      materials: {
        woodOptions: ["Natural White Oak", "Smoked Solid Oak", "Danish Teak"],
        upholsteryOptions: ["Solid Board", "Softened Chamfer Edge"],
      },
      price: 5400,
      costPrice: 2400,
      leadTime: "Bespoke Millwork (4-6 wks)",
      stockDC: 2,
      showroomDisplay: true,
      imageUrl: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "furn-3",
      sku: "STN-TRV-09",
      name: "Tivoli Monolithic Plinth Table",
      category: "Living Room",
      designer: "Atelier Nordic",
      dimensions: { w: 110, d: 70, h: 36, unit: "cm" },
      materials: {
        woodOptions: ["Raw Roman Travertine", "Nero Marquina Marble", "Gotland Limestone"],
        upholsteryOptions: ["Honed Matte Stone", "Brushed Open Pore"],
      },
      price: 2150,
      costPrice: 920,
      leadTime: "In Stock (Central DC)",
      stockDC: 6,
      showroomDisplay: true,
      imageUrl: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "furn-4",
      sku: "DSK-STU-12",
      name: "Stenhammar Executive Floating Desk",
      category: "Executive Study",
      designer: "Elinor Sundström",
      dimensions: { w: 180, d: 85, h: 75, unit: "cm" },
      materials: {
        woodOptions: ["Walnut & Brass", "Smoked Solid Oak", "Nordic Birch"],
        upholsteryOptions: ["Charcoal Mohair Velvet", "Saddle Leather Writing Inlay"],
      },
      price: 4650,
      costPrice: 1980,
      leadTime: "Bespoke Millwork (3-4 wks)",
      stockDC: 1,
      showroomDisplay: false,
      imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop&q=80",
    },
  ],
  schedules: [
    {
      bookingId: "DLV-2026-401",
      projectTitle: "Villa Djursholm Residence",
      clientAddress: "Strandvägen 44, Djursholm",
      scheduledDate: "Nov 18, 2026",
      timeSlot: "10:00 - 13:00 (Slot A)",
      teamLead: "Sven & Marcus (Team Alpha)",
      accessNotes: "Double entry glass door; wide ground floor terrace access. Felt floor protectors mandatory.",
      status: "Confirmed",
    },
    {
      bookingId: "DLV-2026-398",
      projectTitle: "Östermalm Penthouse",
      clientAddress: "Grev Turegatan 18, Stockholm",
      scheduledDate: "Nov 15, 2026",
      timeSlot: "14:00 - 17:00",
      teamLead: "Lars & Erik",
      accessNotes: "Service elevator clearance: 220cm diagonal. Hoist not required.",
      status: "Confirmed",
    },
  ],
  suppliers: [
    {
      id: "ws-1",
      workshop: "Småland Møbelfabrik AB",
      location: "Värnamo, Sweden",
      specialty: "FSC Certified Nordic Oak Joinery & Steam Bending",
      woodCertifications: "PEFC / FSC-C01428",
      currentWorkload: "78% Capacity",
      activeOrders: 4,
    },
    {
      id: "ws-2",
      workshop: "Kvadrat Upholstery Guild",
      location: "Ebeltoft, Denmark",
      specialty: "High-Rub Virgin Wool Bouclé & Mohair Weaves",
      woodCertifications: "OEKO-TEX Standard 100",
      currentWorkload: "65% Capacity",
      activeOrders: 2,
    },
  ],
  quotationHistory: [
    {
      quoteNo: "QT-2026-092",
      client: "Astrid & Henrik Bergman",
      total: 6000,
      depositPaid: 3000,
      date: "Today, 11:30",
      status: "Deposit Received",
    },
    {
      quoteNo: "QT-2026-088",
      client: "Arch. Jonas Lind",
      total: 12400,
      depositPaid: 0,
      date: "Nov 10",
      status: "Draft",
    },
  ],
};

export function NordicLivingFurnitureApp({ product }: { product: DemoItem }) {
  const model = useMemo(() => toDemoModel(product), [product]);
  const { state, setState, resetState } = useDemoState<FurnitureState>(product.slug, NORDIC_SEED);

  const [activeTab, setActiveTab] = useState<"catalogue" | "swatches" | "quotes" | "delivery" | "warehouse" | "millwork">("catalogue");
  const [searchFilter, setSearchFilter] = useState("");
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isNewPieceModalOpen, setIsNewPieceModalOpen] = useState(false);
  const [quotationExportModal, setQuotationExportModal] = useState(false);

  // New furniture piece form
  const [newPieceForm, setNewPieceForm] = useState({
    sku: "SFA-GOT-08",
    name: "Gotland Low-Slung Modular Sofa",
    category: "Living Room" as const,
    designer: "Studio Kvist",
    width: "280",
    depth: "115",
    height: "68",
    price: "6800",
    wood: "Smoked Solid Oak",
    upholstery: "Sand Wool Bouclé",
  });

  // Filtered pieces
  const spaces = useMemo(() => {
    return ["All Spaces", "Living Room", "Dining Sanctuary", "Executive Study", "Master Bedroom"];
  }, []);

  const filteredProducts = useMemo(() => {
    return state.products.filter((p) => {
      const matchSpace = state.activeSpace === "All Spaces" || p.category === state.activeSpace;
      const q = searchFilter.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.designer.toLowerCase().includes(q);
      return matchSpace && matchSearch;
    });
  }, [state.products, state.activeSpace, searchFilter]);

  // Quotation calculations
  const lineItemsDetailed = useMemo(() => {
    return state.quotationItems.map((item) => {
      const prod = state.products.find((p) => p.id === item.furnitureId);
      const total = item.unitPrice * item.quantity;
      return {
        ...item,
        product: prod,
        lineTotal: total,
      };
    });
  }, [state.quotationItems, state.products]);

  const furnitureSubtotal = useMemo(() => {
    return lineItemsDetailed.reduce((acc, l) => acc + l.lineTotal, 0);
  }, [lineItemsDetailed]);

  const tradeDiscountAmount = Math.round((furnitureSubtotal * state.projectFolio.tradeDiscountPct) / 100);
  const whiteGloveCost = state.projectFolio.whiteGloveSelected ? state.projectFolio.whiteGloveFee : 0;
  const grandTotal = Math.max(0, furnitureSubtotal - tradeDiscountAmount + whiteGloveCost);
  const depositDueToday = Math.round(grandTotal * 0.5);

  // Actions
  const handleAddToQuotation = (furnitureId: string) => {
    const prod = state.products.find((p) => p.id === furnitureId);
    if (!prod) return;

    const wood = state.selectedWoodMap[furnitureId] || prod.materials.woodOptions[0];
    const fabric = state.selectedUpholsteryMap[furnitureId] || prod.materials.upholsteryOptions[0];

    setState((prev) => ({
      ...prev,
      quotationItems: [
        ...prev.quotationItems,
        {
          furnitureId,
          selectedWood: wood,
          selectedUpholstery: fabric,
          roomAllocation: prev.activeSpace === "All Spaces" ? "Main Living Space" : prev.activeSpace,
          quantity: 1,
          unitPrice: prod.price,
        },
      ],
    }));
  };

  const handleRemoveLineItem = (index: number) => {
    setState((prev) => ({
      ...prev,
      quotationItems: prev.quotationItems.filter((_, i) => i !== index),
    }));
  };

  const handleCreatePiece = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPieceForm.name || !newPieceForm.sku) return;
    const priceNum = parseFloat(newPieceForm.price) || 4500;

    const added: FurniturePiece = {
      id: `furn-${Date.now()}`,
      sku: newPieceForm.sku.toUpperCase(),
      name: newPieceForm.name,
      category: newPieceForm.category,
      designer: newPieceForm.designer,
      dimensions: {
        w: parseInt(newPieceForm.width) || 200,
        d: parseInt(newPieceForm.depth) || 90,
        h: parseInt(newPieceForm.height) || 75,
        unit: "cm",
      },
      materials: {
        woodOptions: [newPieceForm.wood, "Natural White Oak"],
        upholsteryOptions: [newPieceForm.upholstery, "Oatmeal Linen"],
      },
      price: priceNum,
      costPrice: Math.round(priceNum * 0.45),
      leadTime: "Bespoke Millwork (4 wks)",
      stockDC: 2,
      showroomDisplay: true,
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80",
    };

    setState((prev) => ({
      ...prev,
      products: [added, ...prev.products],
      quotationItems: [
        ...prev.quotationItems,
        {
          furnitureId: added.id,
          selectedWood: newPieceForm.wood,
          selectedUpholstery: newPieceForm.upholstery,
          roomAllocation: "Main Living Space",
          quantity: 1,
          unitPrice: added.price,
        },
      ],
    }));

    setIsNewPieceModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F3] text-[#292524] flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Plaster Scandinavian Bar */}
      <header className="bg-white border-b border-[#EAE8E2] px-3 sm:px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#141010]">NL</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm sm:text-base font-bold tracking-wide uppercase text-[#141010]">
                  Nordic Living
                </span>
                <span className="text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded bg-[#F0EEE8] text-[#895200] font-semibold border border-[#D1C4C1]">
                  Atelier
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-serif italic">Architectural Furniture & Custom Millwork Suite</p>
            </div>
          </div>

          <div className="h-6 w-px bg-stone-200 hidden sm:block" />

          {/* Showroom & Project Selector Pill */}
          <div className="flex items-center gap-2 bg-[#F0EEE8] border border-stone-200 px-3 py-1.5 rounded-full text-xs">
            <Compass className="w-3.5 h-3.5 text-[#895200]" />
            <span className="font-semibold text-stone-900">{state.currentShowroom}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => resetState()}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={() => setIsCustomizeOpen(true)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#292524] hover:bg-[#141010] text-white font-medium transition-colors shadow-xs"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>
        </div>
      </header>

      {/* Nav Strip */}
      <nav className="bg-white border-b border-[#EAE8E2] px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab("catalogue")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "catalogue"
                ? "bg-stone-900 text-white shadow-xs"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            <Armchair className="w-3.5 h-3.5" />
            <span>Furniture Catalogue & Space Staging</span>
            {lineItemsDetailed.length > 0 && (
              <span className="text-[10px] bg-white text-stone-900 px-1.5 py-0.2 rounded-full font-mono font-bold">
                {lineItemsDetailed.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("swatches")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "swatches"
                ? "bg-stone-900 text-white shadow-xs"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Wood & Material Finishes</span>
          </button>

          <button
            onClick={() => setActiveTab("quotes")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "quotes"
                ? "bg-stone-900 text-white shadow-xs"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Architect Quotations & Deposits</span>
          </button>

          <button
            onClick={() => setActiveTab("delivery")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "delivery"
                ? "bg-stone-900 text-white shadow-xs"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-amber-700" />
            <span>White-Glove Delivery & Assembly</span>
          </button>

          <button
            onClick={() => setActiveTab("warehouse")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "warehouse"
                ? "bg-stone-900 text-white shadow-xs"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Warehouse Reserve vs Floor Display</span>
          </button>

          <button
            onClick={() => setActiveTab("millwork")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "millwork"
                ? "bg-stone-900 text-white shadow-xs"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Cabinetmaker Workshops & POs</span>
          </button>
        </div>

        <button
          onClick={() => setIsNewPieceModalOpen(true)}
          className="text-xs font-semibold bg-[#F0EEE8] text-[#895200] hover:bg-[#EAE8E2] border border-[#D1C4C1] px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Furniture Piece</span>
        </button>
      </nav>

      {/* Main Workspace */}
      <main className="flex-1 p-3 sm:p-4 max-w-[1600px] w-full mx-auto min-w-0">
        {/* TAB 1: FURNITURE CATALOGUE & PROJECT QUOTATION DRAWER */}
        {activeTab === "catalogue" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start min-w-0">
            {/* LEFT 65%: Spacious Architectural Showcase */}
            <div className="lg:col-span-8 space-y-4 min-w-0">
              {/* Space Tabs & Search */}
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {spaces.map((sp) => (
                    <button
                      key={sp}
                      onClick={() => setState((prev) => ({ ...prev, activeSpace: sp }))}
                      className={`text-xs font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                        state.activeSpace === sp
                          ? "bg-stone-900 text-white font-bold"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {sp}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search piece, designer..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="text-xs bg-stone-50 border border-stone-200 rounded-lg pl-8 pr-3 py-1.5 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-900 w-44"
                  />
                </div>
              </div>

              {/* Furniture Cards (Spacious, 2 Cols for High Architectural Impact) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredProducts.map((p) => {
                  const currentWood = state.selectedWoodMap[p.id] || p.materials.woodOptions[0];
                  const currentUpholstery = state.selectedUpholsteryMap[p.id] || p.materials.upholsteryOptions[0];

                  return (
                    <div
                      key={p.id}
                      className="bg-white rounded-2xl border border-stone-200 hover:border-stone-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                    >
                      {/* Image Frame */}
                      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          <span className="font-mono text-[10px] font-bold bg-white/95 text-stone-900 px-2 py-0.5 rounded shadow-xs">
                            {p.sku}
                          </span>
                          <span className="text-[10px] bg-stone-900/80 text-white px-2 py-0.5 rounded backdrop-blur-xs font-mono">
                            {p.dimensions.w}W × {p.dimensions.d}D × {p.dimensions.h}H {p.dimensions.unit}
                          </span>
                        </div>
                      </div>

                      {/* Details & Selectors */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-[#895200] font-bold">
                            {p.designer}
                          </span>
                          <div className="flex justify-between items-baseline mt-1">
                            <h3 className="font-serif text-base font-bold text-stone-900">{p.name}</h3>
                            <strong className="font-serif text-lg font-bold text-stone-900">
                              ${p.price.toLocaleString()}
                            </strong>
                          </div>
                        </div>

                        {/* Wood & Finish Selector */}
                        <div className="space-y-1.5 text-xs">
                          <div>
                            <span className="text-[10px] text-stone-400 uppercase tracking-wider block mb-1">
                              Solid Timber / Plinth:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {p.materials.woodOptions.map((wood) => (
                                <button
                                  key={wood}
                                  onClick={() =>
                                    setState((prev) => ({
                                      ...prev,
                                      selectedWoodMap: { ...prev.selectedWoodMap, [p.id]: wood },
                                    }))
                                  }
                                  className={`px-2 py-1 text-[11px] rounded border transition-colors ${
                                    currentWood === wood
                                      ? "bg-stone-900 text-white border-stone-900 font-bold"
                                      : "bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400"
                                  }`}
                                >
                                  {wood}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] text-stone-400 uppercase tracking-wider block mb-1">
                              Upholstery / Finish:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {p.materials.upholsteryOptions.map((fab) => (
                                <button
                                  key={fab}
                                  onClick={() =>
                                    setState((prev) => ({
                                      ...prev,
                                      selectedUpholsteryMap: { ...prev.selectedUpholsteryMap, [p.id]: fab },
                                    }))
                                  }
                                  className={`px-2 py-1 text-[11px] rounded border transition-colors ${
                                    currentUpholstery === fab
                                      ? "bg-amber-900 text-white border-amber-900 font-bold"
                                      : "bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400"
                                  }`}
                                >
                                  {fab}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Availability Badges & CTA */}
                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                          <span className="text-[11px] text-stone-500 font-mono">
                            {p.leadTime} • {p.stockDC} at DC
                          </span>

                          <button
                            onClick={() => handleAddToQuotation(p.id)}
                            className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-[#895200] text-white font-serif text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Project</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT 35%: Interior Project Quotation & Delivery Planning */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-4 shadow-sm space-y-4 sticky top-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#895200] font-bold">
                    INTERIOR PROJECT SPECIFICATION
                  </span>
                  <h2 className="font-serif text-base font-bold text-stone-900">{state.projectFolio.title}</h2>
                </div>
                <span className="text-[10px] font-mono uppercase bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-bold">
                  Active
                </span>
              </div>

              {/* Architect & Client Dossier */}
              <div className="p-3 bg-[#FBF9F3] rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="flex justify-between font-bold text-stone-900">
                  <span>Client: {state.projectFolio.clientName}</span>
                  <span className="text-[#895200]">Trade: {state.projectFolio.tradeDiscountPct}%</span>
                </div>
                <div className="text-[11px] text-stone-500">
                  Architect: {state.projectFolio.architect}
                </div>
              </div>

              {/* Staged Line Items List */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-stone-500 font-mono">
                  <span>Specified Furniture ({lineItemsDetailed.length})</span>
                  <button
                    onClick={() => setState((prev) => ({ ...prev, quotationItems: [] }))}
                    className="text-[10px] text-red-600 hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {lineItemsDetailed.length === 0 ? (
                    <div className="py-8 text-center text-stone-400 text-xs">
                      <Armchair className="w-6 h-6 mx-auto mb-1 opacity-40" />
                      No furniture pieces staged in project folio
                    </div>
                  ) : (
                    lineItemsDetailed.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl border border-stone-200 bg-stone-50/50 flex items-start justify-between gap-2 text-xs"
                      >
                        <div className="flex-1 pr-1">
                          <h4 className="font-serif font-bold text-stone-900">{item.product?.name}</h4>
                          <span className="text-[10px] text-[#895200] font-medium block">
                            Room: {item.roomAllocation}
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono block">
                            {item.selectedWood} • {item.selectedUpholstery}
                          </span>
                        </div>

                        <div className="text-right shrink-0 min-w-[70px]">
                          <strong className="font-serif font-bold text-stone-900 block">
                            ${item.lineTotal.toLocaleString()}
                          </strong>
                          <button
                            onClick={() => handleRemoveLineItem(idx)}
                            className="text-stone-400 hover:text-red-600 text-[10px] mt-0.5 inline-block"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* White-Glove Installation Option */}
              <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1.5 text-xs">
                <label className="flex items-center justify-between font-bold text-amber-950 cursor-pointer">
                  <span className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      checked={state.projectFolio.whiteGloveSelected}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          projectFolio: { ...prev.projectFolio, whiteGloveSelected: e.target.checked },
                        }))
                      }
                      className="rounded text-amber-800 focus:ring-amber-700"
                    />
                    <Truck className="w-3.5 h-3.5 text-amber-800" />
                    <span>White-Glove Delivery & Room Assembly</span>
                  </span>
                  <span className="font-mono">+${state.projectFolio.whiteGloveFee}</span>
                </label>
                <p className="text-[10px] text-amber-800/80 pl-5">
                  2-man certified technicians, room placement, felt gliders, and complete debris removal.
                </p>
              </div>

              {/* Quotation Pricing Breakdown */}
              <div className="pt-2 border-t border-stone-200 space-y-1 text-xs font-mono">
                <div className="flex justify-between text-stone-500">
                  <span>Furniture List Total</span>
                  <span>${furnitureSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#895200]">
                  <span>Architect Trade Courtesy ({state.projectFolio.tradeDiscountPct}%)</span>
                  <span>-${tradeDiscountAmount.toLocaleString()}</span>
                </div>
                {state.projectFolio.whiteGloveSelected && (
                  <div className="flex justify-between text-stone-500">
                    <span>White-Glove Assembly</span>
                    <span>+${whiteGloveCost}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-serif">
                  <span className="text-sm font-bold text-stone-900">Total Contract Value</span>
                  <span className="text-xl font-bold font-mono text-stone-900">
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-[#895200] font-serif font-bold">
                  <span>50% Production Deposit Due Today</span>
                  <span className="font-mono">${depositDueToday.toLocaleString()}</span>
                </div>
              </div>

              {/* Export CTA */}
              <button
                disabled={lineItemsDetailed.length === 0}
                onClick={() => setQuotationExportModal(true)}
                className={`w-full py-3.5 rounded-xl font-serif font-bold text-xs uppercase tracking-widest text-white transition-all shadow-md ${
                  lineItemsDetailed.length === 0
                    ? "bg-stone-300 cursor-not-allowed"
                    : "bg-[#292524] hover:bg-[#141010] shadow-stone-900/20 active:scale-98"
                }`}
              >
                Generate Quotation & Lock Order
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: WOOD & MATERIAL FINISHES */}
        {activeTab === "swatches" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-stone-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="font-serif text-base font-bold text-stone-900">Nordic Timber & Material Swatch Library</h2>
                <p className="text-xs text-stone-500">FSC certified hardwoods, Martindale rub ratings, and natural oils</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
                <span className="text-xs font-mono font-bold text-[#895200] block">SOLID TIMBER SPECIES</span>
                <h3 className="font-serif text-base font-bold text-stone-900">Smoked Scandinavian White Oak</h3>
                <p className="text-xs text-stone-600">Ammonia-fumed core tannin reaction resulting in deep amber hues without surface stains.</p>
                <div className="pt-2 border-t border-stone-100 text-xs font-mono text-stone-500 flex justify-between">
                  <span>Hardness: Janka 1,360</span>
                  <span>FSC-100%</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
                <span className="text-xs font-mono font-bold text-[#895200] block">HIGH-RUB UPHOLSTERY</span>
                <h3 className="font-serif text-base font-bold text-stone-900">Kvadrat Vidar Wool Bouclé</h3>
                <p className="text-xs text-stone-600">Tight looped tactile yarn created from 94% new virgin Norwegian wool and 6% nylon binder.</p>
                <div className="pt-2 border-t border-stone-100 text-xs font-mono text-stone-500 flex justify-between">
                  <span>Martindale: 100,000 rubs</span>
                  <span>Fire Rating: EN 1021</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
                <span className="text-xs font-mono font-bold text-[#895200] block">ARCHITECTURAL STONE</span>
                <h3 className="font-serif text-base font-bold text-stone-900">Roman Open-Pore Travertine</h3>
                <p className="text-xs text-stone-600">Natural sedimented geothermal limestone with distinctive cellular cavity textures.</p>
                <div className="pt-2 border-t border-stone-100 text-xs font-mono text-stone-500 flex justify-between">
                  <span>Finish: Matte Honed</span>
                  <span>Sealed: Nano-Stain Barrier</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ARCHITECT QUOTATIONS & DEPOSITS */}
        {activeTab === "quotes" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-stone-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="font-serif text-base font-bold text-stone-900">Architect Project Quotations Ledger</h2>
                <p className="text-xs text-stone-500">Track preliminary estimates, 50% millwork deposits, and locked specifications</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-stone-50 text-stone-500 uppercase font-mono tracking-wider border-b border-stone-200">
                    <tr>
                      <th className="py-3 px-4">Quote #</th>
                      <th className="py-3 px-4">Client / Residence</th>
                      <th className="py-3 px-4">Total Contract</th>
                      <th className="py-3 px-4">Deposit Paid</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono">
                    {state.quotationHistory.map((q) => (
                      <tr key={q.quoteNo} className="hover:bg-stone-50">
                        <td className="py-3 px-4 font-bold text-stone-900">{q.quoteNo}</td>
                        <td className="py-3 px-4 font-serif font-bold text-stone-800">{q.client}</td>
                        <td className="py-3 px-4 font-bold text-stone-900">${q.total.toLocaleString()}</td>
                        <td className="py-3 px-4 text-[#895200] font-bold">${q.depositPaid.toLocaleString()}</td>
                        <td className="py-3 px-4 text-stone-500">{q.date}</td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              q.status === "Deposit Received"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-stone-100 text-stone-700"
                            }`}
                          >
                            {q.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: WHITE-GLOVE DELIVERY & ASSEMBLY */}
        {activeTab === "delivery" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-stone-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="font-serif text-base font-bold text-stone-900">White-Glove Delivery & Installation Roster</h2>
                <p className="text-xs text-stone-500">2-man certified interior placement and site clearance verification</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.schedules.map((s) => (
                <div key={s.bookingId} className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3 shadow-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#895200] bg-[#F0EEE8] px-2 py-0.5 rounded">
                        {s.bookingId}
                      </span>
                      <h3 className="font-serif text-base font-bold text-stone-900 mt-1">{s.projectTitle}</h3>
                      <p className="text-xs text-stone-500 font-serif italic">{s.clientAddress}</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      {s.status}
                    </span>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl text-xs font-mono text-stone-600 space-y-1">
                    <div>Scheduled Date: <strong>{s.scheduledDate}</strong> ({s.timeSlot})</div>
                    <div>Team: <strong>{s.teamLead}</strong></div>
                    <div className="text-[11px] text-stone-500 font-sans mt-1">Access Notes: {s.accessNotes}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: WAREHOUSE RESERVE VS FLOOR SAMPLES */}
        {activeTab === "warehouse" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-stone-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="font-serif text-base font-bold text-stone-900">Central Distribution vs Showroom Floor Samples</h2>
                <p className="text-xs text-stone-500">Distinguish boxed brand new inventory from showroom display pieces</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-stone-50 text-stone-500 uppercase font-mono tracking-wider border-b border-stone-200">
                    <tr>
                      <th className="py-3 px-4">Piece SKU</th>
                      <th className="py-3 px-4">Furniture Title</th>
                      <th className="py-3 px-4 text-center">Central DC Reserve</th>
                      <th className="py-3 px-4 text-center">Floor Display Sample</th>
                      <th className="py-3 px-4">Lead Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono">
                    {state.products.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50">
                        <td className="py-3 px-4 font-bold text-stone-900">{p.sku}</td>
                        <td className="py-3 px-4 font-serif font-bold text-stone-800">{p.name}</td>
                        <td className="py-3 px-4 text-center font-bold text-emerald-700">{p.stockDC} units</td>
                        <td className="py-3 px-4 text-center">
                          {p.showroomDisplay ? (
                            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                              Birger Jarlsgatan Floor
                            </span>
                          ) : (
                            <span className="text-[10px] text-stone-400">Order Only</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-stone-500">{p.leadTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: MASTER CABINETMAKERS & MILLWORK */}
        {activeTab === "millwork" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-stone-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="font-serif text-base font-bold text-stone-900">Cabinetmaker Guilds & Millwork Partners</h2>
                <p className="text-xs text-stone-500">Swedish and Danish specialized joinery workshops contracted for bespoke commissions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.suppliers.map((s) => (
                <div key={s.id} className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2.5 shadow-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-base font-bold text-stone-900">{s.workshop}</h3>
                      <span className="text-xs text-stone-500 font-serif italic">{s.location}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-stone-100 text-stone-800 px-2 py-0.5 rounded">
                      {s.currentWorkload}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 font-sans">{s.specialty}</p>

                  <div className="pt-2 border-t border-stone-100 text-xs font-mono text-stone-500 flex justify-between">
                    <span>Timber Cert: {s.woodCertifications}</span>
                    <span>Active POs: {s.activeOrders}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: ADD CUSTOM PIECE */}
      {isNewPieceModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-stone-300 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-4 bg-stone-900 text-white flex justify-between items-center">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider">New Architectural Furniture Piece</h3>
              <button onClick={() => setIsNewPieceModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePiece} className="p-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Furniture Piece Title</label>
                <input
                  type="text"
                  placeholder="e.g. Gotland Low-Slung Modular Sofa"
                  value={newPieceForm.name}
                  onChange={(e) => setNewPieceForm({ ...newPieceForm, name: e.target.value })}
                  className="w-full border border-stone-300 rounded-lg p-2 font-serif font-bold text-stone-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">SKU Code</label>
                  <input
                    type="text"
                    placeholder="SFA-GOT-08"
                    value={newPieceForm.sku}
                    onChange={(e) => setNewPieceForm({ ...newPieceForm, sku: e.target.value })}
                    className="w-full border border-stone-300 rounded-lg p-2 font-mono uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Designer</label>
                  <input
                    type="text"
                    value={newPieceForm.designer}
                    onChange={(e) => setNewPieceForm({ ...newPieceForm, designer: e.target.value })}
                    className="w-full border border-stone-300 rounded-lg p-2 font-serif"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Width (cm)</label>
                  <input
                    type="number"
                    value={newPieceForm.width}
                    onChange={(e) => setNewPieceForm({ ...newPieceForm, width: e.target.value })}
                    className="w-full border border-stone-300 rounded-lg p-2 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Depth (cm)</label>
                  <input
                    type="number"
                    value={newPieceForm.depth}
                    onChange={(e) => setNewPieceForm({ ...newPieceForm, depth: e.target.value })}
                    className="w-full border border-stone-300 rounded-lg p-2 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={newPieceForm.height}
                    onChange={(e) => setNewPieceForm({ ...newPieceForm, height: e.target.value })}
                    className="w-full border border-stone-300 rounded-lg p-2 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Retail Price ($)</label>
                <input
                  type="number"
                  value={newPieceForm.price}
                  onChange={(e) => setNewPieceForm({ ...newPieceForm, price: e.target.value })}
                  className="w-full border border-stone-300 rounded-lg p-2 font-mono font-bold"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewPieceModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg font-serif font-bold text-white bg-stone-900 hover:bg-[#895200] shadow-xs"
                >
                  Save Piece & Stage in Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: QUOTATION EXPORT CONFIRMATION */}
      {quotationExportModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-stone-300 shadow-2xl max-w-sm w-full p-6 text-center space-y-3 font-serif">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Architectural Quotation Issued</h3>
            <p className="text-xs text-stone-500 font-sans leading-relaxed">
              Formal project specification dispatched to {state.projectFolio.architect}. 50% production deposit link
              wired to client Astrid Bergman.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setQuotationExportModal(false)}
                className="w-full py-2 bg-stone-900 text-white text-xs font-serif font-bold rounded-lg hover:bg-stone-800"
              >
                Return to Studio (↵)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customization modal */}
      <CustomizationModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        demo={model}
      />
    </div>
  );
}
