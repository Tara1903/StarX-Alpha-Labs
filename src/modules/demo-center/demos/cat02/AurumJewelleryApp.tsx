"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Gem,
  Sparkles,
  ShieldCheck,
  Scale,
  Award,
  FileText,
  Clock,
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Minus,
  Trash2,
  Search,
  Printer,
  X,
  CreditCard,
  Building2,
  ChevronRight,
  Lock,
  Compass,
  FileCheck2,
  ExternalLink,
  Wrench,
  Percent,
} from "lucide-react";
import { toDemoModel, type DemoItem } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

interface JewelleryPiece {
  id: string;
  sku: string;
  name: string;
  category: "Solitaire Rings" | "Heritage Collars" | "Tennis Bracelets" | "Emerald Cut" | "Timepieces";
  vaultLocation: string;
  metalPurity: "18K Yellow Gold 750" | "22K BIS Hallmark 916" | "950 Platinum" | "18K White Gold 750";
  grossWeightGrams: number;
  netGoldWeightGrams: number;
  diamondCarat: number;
  diamondColor: string;
  diamondClarity: string;
  diamondCut: string;
  accentGemDetails: string;
  makingChargesUsd: number;
  gemstoneValueUsd: number;
  giaCertNo: string;
  originMine: string;
  imageUrl: string;
}

interface SalonFolioItem {
  pieceId: string;
  ringSize?: string;
  customEngraving?: string;
  quantity: number;
}

interface RepairTicket {
  ticketNo: string;
  clientName: string;
  pieceDescription: string;
  serviceRequested: "Prong Re-tipping" | "Ring Resizing" | "Rhodium Bath & Polishing" | "Stone Resetting";
  assignedMasterGoldsmith: string;
  intakeWeightGrams: number;
  estimatedReturn: string;
  status: "In Atelier" | "Under Microscope Inspection" | "Ready in Salon Vault";
}

interface JewelleryState {
  currentBoutique: string;
  spotRates: {
    gold24kPerGram: number; // e.g. 74.80
    gold18kPerGram: number; // e.g. 56.10
    gold22kPerGram: number; // e.g. 68.55
    platinum950PerGram: number; // e.g. 32.40
  };
  clientPatron: {
    name: string;
    folioId: string;
    tier: string;
    residence: string;
    fingerSize: string;
    laserInscription: string;
    assignedGemologist: string;
    vatExemptDiplomatic: boolean;
  };
  folioItems: SalonFolioItem[];
  pieces: JewelleryPiece[];
  repairs: RepairTicket[];
  quotationHistory: {
    quoteNo: string;
    patronName: string;
    totalUsd: number;
    goldWeightTotal: number;
    date: string;
    status: "Rate Locked (48h)" | "Invoiced" | "Vault Transferred";
  }[];
}

const AURUM_SEED: JewelleryState = {
  currentBoutique: "Place Vendôme Atelier • Geneva High Vault",
  spotRates: {
    gold24kPerGram: 74.8,
    gold18kPerGram: 56.1,
    gold22kPerGram: 68.55,
    platinum950PerGram: 32.4,
  },
  clientPatron: {
    name: "Madame Eleanor Vance-Rothschild",
    folioId: "#HNW-9921",
    tier: "Tier I Private Patron",
    residence: "Cologny, Geneva",
    fingerSize: "EU 52 / US 6.0",
    laserInscription: "Aeternum & Fidelis 1999-2024",
    assignedGemologist: "Henri de Saint-Germain",
    vatExemptDiplomatic: true,
  },
  folioItems: [{ pieceId: "jewel-1", ringSize: "EU 52", customEngraving: "Aeternum & Fidelis", quantity: 1 }],
  repairs: [
    {
      ticketNo: "REP-VR-108",
      clientName: "Countess Marina Zamoyska",
      pieceDescription: "Art Deco Emerald & Diamond Brooch (circa 1928)",
      serviceRequested: "Prong Re-tipping",
      assignedMasterGoldsmith: "Jean-Philippe Moreau",
      intakeWeightGrams: 28.4,
      estimatedReturn: "Nov 16, 2026",
      status: "In Atelier",
    },
    {
      ticketNo: "REP-VR-104",
      clientName: "Baroness Von Thyssen",
      pieceDescription: "Platinum Solitaire Ring (3.10 ct)",
      serviceRequested: "Ring Resizing",
      assignedMasterGoldsmith: "Henri de Saint-Germain",
      intakeWeightGrams: 8.2,
      estimatedReturn: "Nov 14, 2026",
      status: "Ready in Salon Vault",
    },
  ],
  quotationHistory: [
    {
      quoteNo: "QT-AUR-8841",
      patronName: "Madame Eleanor Vance-Rothschild",
      totalUsd: 25616.69,
      goldWeightTotal: 6.84,
      date: "Today, 14:00",
      status: "Rate Locked (48h)",
    },
  ],
  pieces: [
    {
      id: "jewel-1",
      sku: "AC-HJ-8841",
      name: "The Celestial Empress Solitaire Ring",
      category: "Solitaire Rings",
      vaultLocation: "Geneva Vault Shelf 04-A",
      metalPurity: "18K Yellow Gold 750",
      grossWeightGrams: 7.25,
      netGoldWeightGrams: 6.84,
      diamondCarat: 2.4,
      diamondColor: "D-Flawless",
      diamondClarity: "VVS1",
      diamondCut: "Triple Ex (Hearts & Arrows)",
      accentGemDetails: "0.45 ctw Kashmir Blue Sapphire Pavé Gallery",
      makingChargesUsd: 1450,
      gemstoneValueUsd: 25920, // Diamond + Sapphires
      giaCertNo: "GIA #2488190342",
      originMine: "Diavik, Northwest Territories (Single Provenance)",
      imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "jewel-2",
      sku: "AC-HN-1049",
      name: "Sovereign Royal 22K Heritage Collar",
      category: "Heritage Collars",
      vaultLocation: "Mayfair Safe Room #2",
      metalPurity: "22K BIS Hallmark 916",
      grossWeightGrams: 51.4,
      netGoldWeightGrams: 48.2,
      diamondCarat: 0.8,
      diamondColor: "F",
      diamondClarity: "VS1",
      diamondCut: "Brilliant Polki",
      accentGemDetails: "Natural Colombian Emerald Cabochon 2.15 ct",
      makingChargesUsd: 2650,
      gemstoneValueUsd: 12500,
      giaCertNo: "IGI #5920141",
      originMine: "Muzo, Colombia",
      imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "jewel-3",
      sku: "AC-TB-4290",
      name: "Vendôme Flawless Tennis Bracelet",
      category: "Tennis Bracelets",
      vaultLocation: "Place Vendôme Safe 11",
      metalPurity: "18K White Gold 750",
      grossWeightGrams: 16.8,
      netGoldWeightGrams: 15.1,
      diamondCarat: 8.5,
      diamondColor: "D-E",
      diamondClarity: "VVS2",
      diamondCut: "Ideal Round Brilliant (48 Stones)",
      accentGemDetails: "Concealed Double-Safety Box Clasp",
      makingChargesUsd: 1800,
      gemstoneValueUsd: 16550,
      giaCertNo: "GIA #88129031",
      originMine: "Argyle, Western Australia",
      imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "jewel-4",
      sku: "AC-ER-9912",
      name: "Imperial Colombian Emerald Ring",
      category: "Emerald Cut",
      vaultLocation: "Geneva Vault Shelf 02-B",
      metalPurity: "950 Platinum",
      grossWeightGrams: 9.4,
      netGoldWeightGrams: 8.7,
      diamondCarat: 0.9,
      diamondColor: "E",
      diamondClarity: "VVS1",
      diamondCut: "Trapezoid Side Stones",
      accentGemDetails: "3.85 ct Single-Crystal Muzo Emerald (Minor Cedar Oil)",
      makingChargesUsd: 2200,
      gemstoneValueUsd: 36400,
      giaCertNo: "SSEF #108422",
      originMine: "Muzo Valley, Colombia",
      imageUrl: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&auto=format&fit=crop&q=80",
    },
  ],
};

export function AurumJewelleryApp({ product }: { product: DemoItem }) {
  const model = useMemo(() => toDemoModel(product), [product]);
  const { state, setState, resetState } = useDemoState<JewelleryState>(product.slug, AURUM_SEED);

  const [activeTab, setActiveTab] = useState<"showcase" | "certificates" | "bullion" | "repairs" | "patrons">("showcase");
  const [selectedPieceId, setSelectedPieceId] = useState<string>("jewel-1");
  const [searchFilter, setSearchFilter] = useState("");
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isAddPieceModalOpen, setIsAddPieceModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [selectedCertPiece, setSelectedCertPiece] = useState<JewelleryPiece | null>(null);
  const [proFormaIssuedModal, setProFormaIssuedModal] = useState(false);

  // New piece creation form
  const [newPieceForm, setNewPieceForm] = useState({
    sku: "AC-HJ-9901",
    name: "The Royal Nizam Basra Pearl Necklace",
    category: "Heritage Collars" as const,
    metalPurity: "22K BIS Hallmark 916" as const,
    goldGrams: "34.5",
    carat: "1.20",
    gemValue: "18500",
    makingCharges: "1900",
    certNo: "GIA #9021448",
  });

  const inspectedPiece = useMemo(() => {
    return state.pieces.find((p) => p.id === selectedPieceId) || state.pieces[0];
  }, [state.pieces, selectedPieceId]);

  // Dynamic Valuation Formula:
  // Metal Value = Net Gold Weight * Daily Rate for that purity
  // Total Valuation = Metal Value + Making Charges + Gemstone Value
  const computePieceValuation = (piece: JewelleryPiece) => {
    let ratePerGram = state.spotRates.gold18kPerGram;
    if (piece.metalPurity.includes("22K")) ratePerGram = state.spotRates.gold22kPerGram;
    else if (piece.metalPurity.includes("950 Platinum")) ratePerGram = state.spotRates.platinum950PerGram;
    else if (piece.metalPurity.includes("24K")) ratePerGram = state.spotRates.gold24kPerGram;

    const metalValue = Number((piece.netGoldWeightGrams * ratePerGram).toFixed(2));
    const total = Number((metalValue + piece.makingChargesUsd + piece.gemstoneValueUsd).toFixed(2));
    return {
      metalValue,
      ratePerGram,
      total,
    };
  };

  const inspectedValuation = useMemo(() => {
    return computePieceValuation(inspectedPiece);
  }, [inspectedPiece, state.spotRates]);

  // Folio calculations
  const folioDetailedLines = useMemo(() => {
    return state.folioItems.map((item) => {
      const piece = state.pieces.find((p) => p.id === item.pieceId);
      const val = piece ? computePieceValuation(piece) : { total: 0, metalValue: 0 };
      return {
        ...item,
        piece,
        lineTotal: val.total * item.quantity,
      };
    });
  }, [state.folioItems, state.pieces, state.spotRates]);

  const folioSubtotal = useMemo(() => {
    return Number(folioDetailedLines.reduce((acc, l) => acc + l.lineTotal, 0).toFixed(2));
  }, [folioDetailedLines]);

  const diplomaticVatExemption = state.clientPatron.vatExemptDiplomatic
    ? Number((folioSubtotal * 0.077).toFixed(2)) // 7.7% Swiss VAT
    : 0;

  const finalSettlementDue = Number((folioSubtotal - diplomaticVatExemption).toFixed(2));

  // Actions
  const handleAddToFolio = (pieceId: string) => {
    setState((prev) => {
      const exists = prev.folioItems.find((f) => f.pieceId === pieceId);
      if (exists) {
        return {
          ...prev,
          folioItems: prev.folioItems.map((f) => (f.pieceId === pieceId ? { ...f, quantity: f.quantity + 1 } : f)),
        };
      }
      return {
        ...prev,
        folioItems: [
          ...prev.folioItems,
          {
            pieceId,
            ringSize: prev.clientPatron.fingerSize,
            customEngraving: prev.clientPatron.laserInscription,
            quantity: 1,
          },
        ],
      };
    });
  };

  const handleRemoveFolioLine = (index: number) => {
    setState((prev) => ({
      ...prev,
      folioItems: prev.folioItems.filter((_, i) => i !== index),
    }));
  };

  const handleCreatePiece = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPieceForm.name || !newPieceForm.sku) return;
    const goldG = parseFloat(newPieceForm.goldGrams) || 10;
    const caratNum = parseFloat(newPieceForm.carat) || 1.0;
    const gemVal = parseFloat(newPieceForm.gemValue) || 5000;
    const making = parseFloat(newPieceForm.makingCharges) || 1000;

    const added: JewelleryPiece = {
      id: `jewel-${Date.now()}`,
      sku: newPieceForm.sku.toUpperCase(),
      name: newPieceForm.name,
      category: newPieceForm.category,
      vaultLocation: "Geneva Vault Safe 01",
      metalPurity: newPieceForm.metalPurity,
      grossWeightGrams: Number((goldG * 1.08).toFixed(2)),
      netGoldWeightGrams: goldG,
      diamondCarat: caratNum,
      diamondColor: "D",
      diamondClarity: "VVS1",
      diamondCut: "Triple Ex",
      accentGemDetails: "Micro-Pavé Brilliant Halo",
      makingChargesUsd: making,
      gemstoneValueUsd: gemVal,
      giaCertNo: newPieceForm.certNo,
      originMine: "Natural Basra / Kimberley",
      imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80",
    };

    setState((prev) => ({
      ...prev,
      pieces: [added, ...prev.pieces],
      folioItems: [...prev.folioItems, { pieceId: added.id, quantity: 1 }],
    }));

    setIsAddPieceModalOpen(false);
  };

  const handleIssueProForma = () => {
    if (state.folioItems.length === 0) return;
    const quoteNo = `QT-AUR-${Math.floor(1000 + Math.random() * 9000)}`;

    setState((prev) => ({
      ...prev,
      quotationHistory: [
        {
          quoteNo,
          patronName: prev.clientPatron.name,
          totalUsd: finalSettlementDue,
          goldWeightTotal: prev.folioItems.reduce((acc, f) => {
            const pc = prev.pieces.find((p) => p.id === f.pieceId);
            return acc + (pc ? pc.netGoldWeightGrams * f.quantity : 0);
          }, 0),
          date: "Just now",
          status: "Rate Locked (48h)",
        },
        ...prev.quotationHistory,
      ],
      folioItems: [],
    }));

    setProFormaIssuedModal(true);
  };

  return (
    <div className="min-h-screen bg-[#110F0E] text-[#E8E1DF] flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Haute Bullion Market Ticker */}
      <header className="bg-[#0C0A09] text-white border-b border-[#2C2928] px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#D4AF37] to-[#8E711A] flex items-center justify-center font-serif text-sm font-black text-black shadow-xs">
              💎
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm sm:text-base font-extrabold tracking-widest uppercase text-[#F2CA50]">
                  Aurum & Co.
                </span>
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#2A2311] text-[#E9C349] font-bold border border-[#765E16]">
                  Atelier 1892
                </span>
              </div>
              <p className="text-[10px] text-stone-400 font-serif italic">Geneva • Place Vendôme • Mayfair</p>
            </div>
          </div>

          <div className="h-6 w-px bg-stone-800 hidden sm:block" />

          {/* Live Bullion Spot Strip */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 bg-[#1C1918] px-2.5 py-1 rounded border border-stone-800">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E9C349] animate-pulse" />
              <span className="text-stone-400">24K Bullion:</span>
              <strong className="text-[#F2CA50]">${state.spotRates.gold24kPerGram}/g</strong>
            </div>
            <div className="flex items-center gap-1.5 bg-[#1C1918] px-2.5 py-1 rounded border border-stone-800">
              <span className="text-stone-400">18K Au750:</span>
              <strong className="text-stone-200">${state.spotRates.gold18kPerGram}/g</strong>
            </div>
            <div className="flex items-center gap-1.5 bg-[#1C1918] px-2.5 py-1 rounded border border-stone-800">
              <span className="text-stone-400">950 Platinum:</span>
              <strong className="text-cyan-400">${state.spotRates.platinum950PerGram}/g</strong>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => resetState()}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded border border-stone-800 text-stone-400 hover:text-white hover:bg-stone-900 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={() => setIsCustomizeOpen(true)}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:brightness-110 text-stone-950 font-bold transition-all shadow-xs"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>
        </div>
      </header>

      {/* Nav Strip */}
      <nav className="bg-[#181615] border-b border-[#2C2928] px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab("showcase")}
            className={`flex items-center gap-1.5 text-xs font-serif font-bold tracking-wider px-3 py-1.5 rounded transition-colors ${
              activeTab === "showcase"
                ? "bg-[#D4AF37] text-stone-950 font-extrabold shadow-xs"
                : "text-stone-300 hover:bg-stone-900"
            }`}
          >
            <Gem className="w-3.5 h-3.5" />
            <span>Showcase & Live Valuation</span>
          </button>

          <button
            onClick={() => setActiveTab("certificates")}
            className={`flex items-center gap-1.5 text-xs font-serif font-bold tracking-wider px-3 py-1.5 rounded transition-colors ${
              activeTab === "certificates"
                ? "bg-[#D4AF37] text-stone-950 font-extrabold shadow-xs"
                : "text-stone-300 hover:bg-stone-900"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>GIA & IGI Certificate Vault</span>
          </button>

          <button
            onClick={() => setActiveTab("bullion")}
            className={`flex items-center gap-1.5 text-xs font-serif font-bold tracking-wider px-3 py-1.5 rounded transition-colors ${
              activeTab === "bullion"
                ? "bg-[#D4AF37] text-stone-950 font-extrabold shadow-xs"
                : "text-stone-300 hover:bg-stone-900"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Daily Bullion Spot & Wastage</span>
          </button>

          <button
            onClick={() => setActiveTab("repairs")}
            className={`flex items-center gap-1.5 text-xs font-serif font-bold tracking-wider px-3 py-1.5 rounded transition-colors ${
              activeTab === "repairs"
                ? "bg-[#D4AF37] text-stone-950 font-extrabold shadow-xs"
                : "text-stone-300 hover:bg-stone-900"
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            <span>Atelier Repair & Resizing</span>
            <span className="text-[10px] bg-stone-800 text-stone-300 px-1.5 py-0.2 rounded-full font-mono">
              {state.repairs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("patrons")}
            className={`flex items-center gap-1.5 text-xs font-serif font-bold tracking-wider px-3 py-1.5 rounded transition-colors ${
              activeTab === "patrons"
                ? "bg-[#D4AF37] text-stone-950 font-extrabold shadow-xs"
                : "text-stone-300 hover:bg-stone-900"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>HNW Patron Bespoke Folio</span>
          </button>
        </div>

        <button
          onClick={() => setIsAddPieceModalOpen(true)}
          className="text-xs font-serif font-bold bg-[#262117] text-[#F2CA50] hover:bg-[#332B1B] border border-[#765E16] px-3 py-1.5 rounded flex items-center gap-1 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Induct Creation to Vault</span>
        </button>
      </nav>

      {/* Main Workspace */}
      <main className="flex-1 p-3 sm:p-4 max-w-[1600px] w-full mx-auto min-w-0">
        {/* TAB 1: SHOWCASE & LIVE DYNAMIC VALUATION */}
        {activeTab === "showcase" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start min-w-0">
            {/* LEFT 65%: Highlighted Creation & Dynamic Formulation */}
            <div className="lg:col-span-8 space-y-4 min-w-0">
              {/* Highlight Card */}
              <div className="bg-[#1A1817] rounded-2xl border border-[#3A3533] p-5 shadow-xl space-y-4">
                {/* Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2C2928] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase bg-[#2C2928] text-amber-300 px-2 py-0.5 rounded font-bold">
                      ACTIVE PIECE INSPECTION
                    </span>
                    <span className="text-xs font-mono text-stone-400">REF: {inspectedPiece.sku}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                    <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{inspectedPiece.vaultLocation}</span>
                    <button
                      onClick={() => {
                        setSelectedCertPiece(inspectedPiece);
                        setIsCertModalOpen(true);
                      }}
                      className="ml-2 text-[11px] text-[#F2CA50] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>{inspectedPiece.giaCertNo}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h2 className="font-serif text-2xl font-bold tracking-wide text-white">{inspectedPiece.name}</h2>
                  <p className="text-xs text-stone-400 font-serif italic mt-1 leading-relaxed">
                    Hand-sculpted in the Place Vendôme Atelier. Singular high-carat oval brilliant diamond resting on
                    micro-pavé royal blue sapphire hidden gallery.
                  </p>
                </div>

                {/* Purity & 4Cs Matrix Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="bg-[#242120] p-2.5 rounded border border-[#3A3533]">
                    <span className="text-[10px] text-stone-400 block font-serif uppercase">DIAMOND CARAT</span>
                    <strong className="text-base text-white">{inspectedPiece.diamondCarat} ct</strong>
                    <span className="text-[10px] text-stone-400 block mt-0.5">Oval Brilliant</span>
                  </div>
                  <div className="bg-[#242120] p-2.5 rounded border border-[#3A3533]">
                    <span className="text-[10px] text-stone-400 block font-serif uppercase">COLOR & GRADE</span>
                    <strong className="text-base text-[#F2CA50]">{inspectedPiece.diamondColor}</strong>
                    <span className="text-[10px] text-stone-400 block mt-0.5">Purest White (0% Tint)</span>
                  </div>
                  <div className="bg-[#242120] p-2.5 rounded border border-[#3A3533]">
                    <span className="text-[10px] text-stone-400 block font-serif uppercase">CLARITY RATING</span>
                    <strong className="text-base text-white">{inspectedPiece.diamondClarity}</strong>
                    <span className="text-[10px] text-stone-400 block mt-0.5">Micro-Inclusions Only</span>
                  </div>
                  <div className="bg-[#242120] p-2.5 rounded border border-[#3A3533]">
                    <span className="text-[10px] text-stone-400 block font-serif uppercase">CUT SYMMETRY</span>
                    <strong className="text-base text-emerald-400">{inspectedPiece.diamondCut}</strong>
                    <span className="text-[10px] text-stone-400 block mt-0.5">Hearts & Arrows</span>
                  </div>
                </div>

                {/* DYNAMIC FORMULATION LEDGER */}
                <div className="bg-[#12100F] p-4 rounded-xl border border-[#4D4635] space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between items-center text-stone-400 border-b border-[#2C2928] pb-2">
                    <span className="uppercase text-[10px] tracking-wider text-[#F2CA50] font-bold">
                      TRANSPARENT ATELIER VALUATION FORMULATION
                    </span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Live Bullion Synced
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-300">
                    <span>
                      Net Gold Weight ({inspectedPiece.metalPurity}): {inspectedPiece.netGoldWeightGrams}g @ $
                      {inspectedValuation.ratePerGram.toFixed(2)}/g
                    </span>
                    <strong className="text-white">${inspectedValuation.metalValue.toLocaleString()}</strong>
                  </div>

                  <div className="flex justify-between text-stone-300">
                    <span>Artisan Master Setting & Micro-Pavé Hand-Hours (34 hrs Place Vendôme)</span>
                    <strong className="text-white">${inspectedPiece.makingChargesUsd.toLocaleString()}</strong>
                  </div>

                  <div className="flex justify-between text-stone-300">
                    <span>Certified Principal Gemstone & Accent Sapphire Gallery</span>
                    <strong className="text-white">${inspectedPiece.gemstoneValueUsd.toLocaleString()}</strong>
                  </div>

                  <div className="pt-2 border-t border-[#3A3533] flex justify-between items-baseline font-serif">
                    <span className="text-base font-bold text-white">CURRENT TOTAL APPRAISED VALUATION</span>
                    <span className="text-2xl font-black font-mono text-[#F2CA50]">
                      ${inspectedValuation.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <div className="text-xs text-stone-400 font-serif italic">
                    Provenance: {inspectedPiece.originMine} • Swiss Federal Hallmark Stamped
                  </div>

                  <button
                    onClick={() => handleAddToFolio(inspectedPiece.id)}
                    className="px-5 py-2.5 rounded bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:brightness-110 text-stone-950 font-serif font-extrabold text-xs uppercase tracking-widest shadow-md transition-all active:scale-98"
                  >
                    + Add to Private Salon Folio
                  </button>
                </div>
              </div>

              {/* Associated Salon Creations Tray */}
              <div className="space-y-2">
                <span className="text-xs font-serif font-bold tracking-wider text-stone-300 uppercase block">
                  Other Vault Creations on Display
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {state.pieces.map((piece) => {
                    const isSelected = piece.id === selectedPieceId;
                    const val = computePieceValuation(piece);
                    return (
                      <div
                        key={piece.id}
                        onClick={() => setSelectedPieceId(piece.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-[#242120] border-[#D4AF37] shadow-lg"
                            : "bg-[#1A1817] border-[#3A3533] hover:border-stone-500"
                        }`}
                      >
                        <span className="text-[10px] font-mono text-stone-400">{piece.sku}</span>
                        <h4 className="font-serif text-sm font-bold text-white mt-0.5 line-clamp-1">{piece.name}</h4>
                        <div className="mt-2 flex justify-between items-baseline">
                          <span className="text-[10px] font-mono text-[#D4AF37]">{piece.metalPurity}</span>
                          <strong className="text-xs font-mono font-bold text-white">${val.total.toLocaleString()}</strong>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT 35%: HNW SOVEREIGN FOLIO & PRO-FORMA INVOICE */}
            <div className="lg:col-span-4 bg-[#1A1817] rounded-2xl border border-[#3A3533] p-4 shadow-xl space-y-4 sticky top-4">
              <div className="flex items-center justify-between border-b border-[#2C2928] pb-3">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] font-bold">
                    SOVEREIGN FOLIO {state.clientPatron.folioId}
                  </span>
                  <h3 className="font-serif text-sm font-bold text-white">{state.clientPatron.name}</h3>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#2A2311] text-[#E9C349] font-bold border border-[#765E16]">
                  {state.clientPatron.tier}
                </span>
              </div>

              {/* Bespoke Directives */}
              <div className="p-3 bg-[#12100F] rounded-xl border border-stone-800 text-xs font-serif italic text-stone-400 space-y-1">
                <div>Residence: {state.clientPatron.residence}</div>
                <div>Finger Size: <strong className="text-white font-mono not-italic">{state.clientPatron.fingerSize}</strong></div>
                <div>Laser Inscription: <strong className="text-[#D4AF37] font-mono not-italic">"{state.clientPatron.laserInscription}"</strong></div>
                <div>Assigned Gemologist: {state.clientPatron.assignedGemologist}</div>
              </div>

              {/* Folio Items */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-stone-400">
                  <span>Acquisition Pieces ({folioDetailedLines.length})</span>
                  <button
                    onClick={() => setState((prev) => ({ ...prev, folioItems: [] }))}
                    className="text-[10px] text-red-400 hover:underline"
                  >
                    Clear Folio
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {folioDetailedLines.length === 0 ? (
                    <div className="py-8 text-center text-stone-500 text-xs font-serif">
                      <Gem className="w-6 h-6 mx-auto mb-1 opacity-40 text-stone-500" />
                      Folio is currently empty
                    </div>
                  ) : (
                    folioDetailedLines.map((line, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg border border-[#3A3533] bg-[#242120] flex items-start justify-between gap-2 text-xs"
                      >
                        <div className="flex-1 pr-1">
                          <h5 className="font-serif font-bold text-white">{line.piece?.name}</h5>
                          <span className="text-[10px] font-mono text-stone-400 block">
                            {line.piece?.sku} • {line.piece?.metalPurity}
                          </span>
                          {line.ringSize && (
                            <span className="text-[10px] text-[#D4AF37] font-mono block">
                              Fit: {line.ringSize}
                            </span>
                          )}
                        </div>

                        <div className="text-right shrink-0 min-w-[70px]">
                          <strong className="font-mono text-xs font-bold text-white block">
                            ${line.lineTotal.toLocaleString()}
                          </strong>
                          <button
                            onClick={() => handleRemoveFolioLine(idx)}
                            className="text-stone-500 hover:text-red-400 text-[10px] mt-0.5 inline-block"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Financial Summary & Diplomatic VAT Exemption */}
              <div className="pt-2 border-t border-[#2C2928] space-y-1 text-xs font-mono">
                <div className="flex justify-between text-stone-400">
                  <span>Gross Folio Acquisition</span>
                  <span>${folioSubtotal.toLocaleString()}</span>
                </div>
                {state.clientPatron.vatExemptDiplomatic && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Diplomatic Swiss VAT Exemption (7.7%)</span>
                    <span>-${diplomaticVatExemption.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-400">
                  <span>Insured Armored Courier (Brink's Global)</span>
                  <span className="text-emerald-400">Complimentary</span>
                </div>
                <div className="pt-2 border-t border-[#3A3533] flex justify-between items-baseline font-serif">
                  <span className="text-sm font-bold text-white">Final Settlement Due</span>
                  <span className="text-xl font-bold font-mono text-[#F2CA50]">
                    ${finalSettlementDue.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Issue Official Pro-Forma CTA */}
              <button
                disabled={folioDetailedLines.length === 0}
                onClick={handleIssueProForma}
                className={`w-full py-3.5 rounded font-serif font-bold text-xs uppercase tracking-widest text-stone-950 transition-all shadow-md ${
                  folioDetailedLines.length === 0
                    ? "bg-stone-700 cursor-not-allowed text-stone-400"
                    : "bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:brightness-110 active:scale-98"
                }`}
              >
                Issue Official Folio & Pro-Forma Invoice
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: CERTIFICATE VAULT */}
        {activeTab === "certificates" && (
          <div className="space-y-4">
            <div className="bg-[#1A1817] p-4 rounded-xl border border-[#3A3533] flex justify-between items-center shadow-xs">
              <div>
                <h2 className="font-serif text-base font-bold text-white">GIA, IGI & Swiss Federal Assay Digital Vault</h2>
                <p className="text-xs text-stone-400">Immutable diamond dossier certificates and laser inscription verification</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.pieces.map((p) => (
                <div key={p.id} className="bg-[#1A1817] p-5 rounded-2xl border border-[#3A3533] space-y-3 shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-[#D4AF37] bg-[#2A2311] px-2 py-0.5 rounded border border-[#765E16]">
                        {p.giaCertNo}
                      </span>
                      <h3 className="font-serif text-base font-bold text-white mt-1">{p.name}</h3>
                      <p className="text-xs text-stone-400 font-mono">{p.sku} • {p.metalPurity}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">Verified</span>
                  </div>

                  <div className="p-3 bg-[#12100F] rounded-xl text-xs font-mono text-stone-300 space-y-1">
                    <div>Carat Weight: <strong>{p.diamondCarat} ct</strong></div>
                    <div>Color / Clarity: <strong>{p.diamondColor} / {p.diamondClarity}</strong></div>
                    <div>Cut Symmetry: <strong>{p.diamondCut}</strong></div>
                    <div>Origin: <strong>{p.originMine}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BULLION SPOT & MAKING CHARGES */}
        {activeTab === "bullion" && (
          <div className="space-y-4">
            <div className="bg-[#1A1817] p-4 rounded-xl border border-[#3A3533] flex justify-between items-center shadow-xs">
              <div>
                <h2 className="font-serif text-base font-bold text-white">Precious Metal Spot Rates & Wastage Settings</h2>
                <p className="text-xs text-stone-400">London Bullion Market Association (LBMA) synced rates per gram</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono">
              <div className="bg-[#1A1817] p-4 rounded-xl border border-[#3A3533]">
                <span className="text-xs text-stone-400 block font-serif">24K PURE GOLD (999.9)</span>
                <strong className="text-2xl font-bold text-[#F2CA50] mt-1 block">
                  ${state.spotRates.gold24kPerGram}/g
                </strong>
                <span className="text-[11px] text-emerald-400">+0.42% London Fix</span>
              </div>
              <div className="bg-[#1A1817] p-4 rounded-xl border border-[#3A3533]">
                <span className="text-xs text-stone-400 block font-serif">22K HERITAGE (BIS 916)</span>
                <strong className="text-2xl font-bold text-stone-200 mt-1 block">
                  ${state.spotRates.gold22kPerGram}/g
                </strong>
                <span className="text-[11px] text-emerald-400">+0.38%</span>
              </div>
              <div className="bg-[#1A1817] p-4 rounded-xl border border-[#3A3533]">
                <span className="text-xs text-stone-400 block font-serif">18K HAUTE (AU750)</span>
                <strong className="text-2xl font-bold text-stone-200 mt-1 block">
                  ${state.spotRates.gold18kPerGram}/g
                </strong>
                <span className="text-[11px] text-emerald-400">+0.38%</span>
              </div>
              <div className="bg-[#1A1817] p-4 rounded-xl border border-[#3A3533]">
                <span className="text-xs text-stone-400 block font-serif">950 PLATINUM (PT950)</span>
                <strong className="text-2xl font-bold text-cyan-400 mt-1 block">
                  ${state.spotRates.platinum950PerGram}/g
                </strong>
                <span className="text-[11px] text-red-400">-0.15%</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ATELIER REPAIRS & SERVICING */}
        {activeTab === "repairs" && (
          <div className="space-y-4">
            <div className="bg-[#1A1817] p-4 rounded-xl border border-[#3A3533] flex justify-between items-center shadow-xs">
              <div>
                <h2 className="font-serif text-base font-bold text-white">Place Vendôme Repair & Conservation Atelier</h2>
                <p className="text-xs text-stone-400">Micro-laser prong re-tipping, ultrasonic polishing, and ring resizing logs</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.repairs.map((r) => (
                <div key={r.ticketNo} className="bg-[#1A1817] p-5 rounded-2xl border border-[#3A3533] space-y-3 shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-[#2A2311] px-2 py-0.5 rounded">
                        {r.ticketNo}
                      </span>
                      <h3 className="font-serif text-base font-bold text-white mt-1">{r.pieceDescription}</h3>
                      <p className="text-xs text-stone-400 font-serif italic">Client: {r.clientName}</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-[#2C2928] text-amber-300 px-2 py-0.5 rounded">
                      {r.status}
                    </span>
                  </div>

                  <div className="p-3 bg-[#12100F] rounded-xl text-xs font-mono text-stone-300 space-y-1">
                    <div>Service: <strong>{r.serviceRequested}</strong></div>
                    <div>Goldsmith: <strong>{r.assignedMasterGoldsmith}</strong></div>
                    <div>Intake Weight: <strong>{r.intakeWeightGrams} g</strong></div>
                    <div>Due Date: <strong>{r.estimatedReturn}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: HNW PATRON BESPOKE FOLIO */}
        {activeTab === "patrons" && (
          <div className="space-y-4">
            <div className="bg-[#1A1817] p-4 rounded-xl border border-[#3A3533] flex justify-between items-center shadow-xs">
              <div>
                <h2 className="font-serif text-base font-bold text-white">High Net Worth Patron Dossier</h2>
                <p className="text-xs text-stone-400">Ring sizes, milestone anniversary calendars, and bespoke requests</p>
              </div>
            </div>

            <div className="bg-[#1A1817] p-5 rounded-2xl border border-[#3A3533] space-y-3 max-w-2xl">
              <h3 className="font-serif text-lg font-bold text-white">{state.clientPatron.name}</h3>
              <p className="text-xs font-mono text-[#D4AF37]">{state.clientPatron.tier} • {state.clientPatron.folioId}</p>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-stone-300 pt-2 border-t border-[#2C2928]">
                <div>Finger Size: <strong>{state.clientPatron.fingerSize}</strong></div>
                <div>Residence: <strong>{state.clientPatron.residence}</strong></div>
                <div>Diplomatic VAT: <strong>{state.clientPatron.vatExemptDiplomatic ? "Exempt" : "Standard"}</strong></div>
                <div>Lead Gemologist: <strong>{state.clientPatron.assignedGemologist}</strong></div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: ADD CREATION TO VAULT */}
      {isAddPieceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1A1817] rounded-2xl border border-[#4D4635] shadow-2xl max-w-md w-full overflow-hidden text-stone-200">
            <div className="p-4 bg-[#0C0A09] text-white flex justify-between items-center border-b border-[#2C2928]">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#F2CA50]">
                Induct Haute Creation to Vault
              </h3>
              <button onClick={() => setIsAddPieceModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePiece} className="p-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-300 block mb-1">Creation Name</label>
                <input
                  type="text"
                  placeholder="The Royal Nizam Basra Pearl Necklace"
                  value={newPieceForm.name}
                  onChange={(e) => setNewPieceForm({ ...newPieceForm, name: e.target.value })}
                  className="w-full bg-[#12100F] border border-stone-700 rounded p-2 font-serif font-bold text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-300 block mb-1">Ref / SKU</label>
                  <input
                    type="text"
                    placeholder="AC-HJ-9901"
                    value={newPieceForm.sku}
                    onChange={(e) => setNewPieceForm({ ...newPieceForm, sku: e.target.value })}
                    className="w-full bg-[#12100F] border border-stone-700 rounded p-2 font-mono uppercase text-white"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-300 block mb-1">Metal Purity</label>
                  <select
                    value={newPieceForm.metalPurity}
                    onChange={(e) => setNewPieceForm({ ...newPieceForm, metalPurity: e.target.value as any })}
                    className="w-full bg-[#12100F] border border-stone-700 rounded p-2 text-white"
                  >
                    <option value="18K Yellow Gold 750">18K Yellow Gold 750</option>
                    <option value="22K BIS Hallmark 916">22K BIS Hallmark 916</option>
                    <option value="950 Platinum">950 Platinum</option>
                    <option value="18K White Gold 750">18K White Gold 750</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-300 block mb-1">Net Gold Weight (g)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newPieceForm.goldGrams}
                    onChange={(e) => setNewPieceForm({ ...newPieceForm, goldGrams: e.target.value })}
                    className="w-full bg-[#12100F] border border-stone-700 rounded p-2 font-mono text-white"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-300 block mb-1">Diamond / Gem Carat</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newPieceForm.carat}
                    onChange={(e) => setNewPieceForm({ ...newPieceForm, carat: e.target.value })}
                    className="w-full bg-[#12100F] border border-stone-700 rounded p-2 font-mono text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-300 block mb-1">Gemstone Valuation ($)</label>
                  <input
                    type="number"
                    value={newPieceForm.gemValue}
                    onChange={(e) => setNewPieceForm({ ...newPieceForm, gemValue: e.target.value })}
                    className="w-full bg-[#12100F] border border-stone-700 rounded p-2 font-mono text-white"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-300 block mb-1">Making Charges ($)</label>
                  <input
                    type="number"
                    value={newPieceForm.makingCharges}
                    onChange={(e) => setNewPieceForm({ ...newPieceForm, makingCharges: e.target.value })}
                    className="w-full bg-[#12100F] border border-stone-700 rounded p-2 font-mono text-white"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddPieceModalOpen(false)}
                  className="px-3 py-1.5 rounded text-stone-400 hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded font-serif font-bold text-stone-950 bg-[#D4AF37] hover:bg-[#B38F24] shadow-xs"
                >
                  Induct to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PRO-FORMA INVOICE ISSUED */}
      {proFormaIssuedModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1A1817] rounded-2xl border border-[#4D4635] shadow-2xl max-w-sm w-full p-6 text-center space-y-3 font-serif text-stone-200">
            <div className="w-12 h-12 rounded-full bg-[#2A2311] text-[#D4AF37] mx-auto flex items-center justify-center border border-[#765E16]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-white">Pro-Forma Quotation Issued</h3>
            <p className="text-xs text-stone-400 font-sans leading-relaxed">
              Official bullion rate locked for 48 hours. GIA Certificates attached and dispatched to Brink's Global Vault
              escrow.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setProFormaIssuedModal(false)}
                className="w-full py-2 bg-[#D4AF37] text-stone-950 text-xs font-serif font-bold rounded hover:bg-[#B38F24]"
              >
                Return to Salon (↵)
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
