"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  Scissors,
  Layers,
  Crown,
  Tag,
  ArrowRightLeft,
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Minus,
  Trash2,
  Search,
  Printer,
  ShoppingBag,
  Heart,
  User,
  Truck,
  Building2,
  ShieldCheck,
  Calendar,
  DollarSign,
  ChevronRight,
  X,
  FileCheck,
  SlidersHorizontal,
} from "lucide-react";
import { toDemoModel, type DemoItem } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

interface GarmentVariant {
  color: string;
  colorHex: string;
  sizes: Record<string, number>; // "XS": 2, "S": 6, "M": 0, "L": 4, "XL": 1
}

interface FashionProduct {
  id: string;
  sku: string;
  name: string;
  fabric: string;
  category: "Outerwear & Coats" | "Tailored Suiting" | "Silk & Knitwear" | "Dresses & Gowns" | "Tops & Shirts";
  collection: "Resort 2026" | "Autumn Cashmere" | "Minimalist Tailoring";
  price: number;
  costPrice: number;
  badge?: "CURATOR PICK" | "RESORT EXCLUSIVE" | "ARCHIVE";
  imageUrl: string;
  variants: GarmentVariant[];
  millSupplier: string;
}

interface FittingBagItem {
  productId: string;
  color: string;
  size: string;
  quantity: number;
  alterations?: string;
}

interface ClientProfile {
  id: string;
  name: string;
  tier: "BLACK TIER VIP" | "PLATINUM ATELIER" | "GOLD COUTURE";
  lifetimeSpend: number;
  stylingNotes: string;
  measurements: {
    bust: string;
    waist: string;
    inseam: string;
    shoe: string;
  };
  preferredStylist: string;
}

interface FashionSupplier {
  id: string;
  name: string;
  region: string;
  specialty: string;
  activeOrders: number;
  qualityRating: string;
  leadTimeWeeks: number;
}

interface FashionState {
  currentCollection: "Resort 2026" | "Autumn Cashmere" | "Minimalist Tailoring";
  activeCategory: string;
  activeClient: ClientProfile;
  bag: FittingBagItem[];
  products: FashionProduct[];
  tailoringNotes: string;
  includeCedarBag: boolean;
  eligibleExchange: boolean;
  orderHistory: {
    orderNo: string;
    clientName: string;
    itemsCount: number;
    total: number;
    status: "Delivered" | "In Alteration" | "Exchange Processed";
    date: string;
  }[];
  suppliers: FashionSupplier[];
}

const ATELIER_SEED: FashionState = {
  currentCollection: "Resort 2026",
  activeCategory: "All Silhouettes",
  activeClient: {
    id: "vip-1",
    name: "Lady Vivienne Sterling",
    tier: "BLACK TIER VIP",
    lifetimeSpend: 84200,
    stylingNotes: "Prefers floor-grazing trousers, avoids pure synthetics, focuses on warm earth tones and double-faced wools.",
    measurements: {
      bust: "34B",
      waist: "26 in",
      inseam: "33.5 in",
      shoe: "39 IT",
    },
    preferredStylist: "Mme. Laurent",
  },
  bag: [
    {
      productId: "fp-1",
      color: "Terracotta",
      size: "S",
      quantity: 1,
      alterations: "Hem trouser cuff -1.5 inches; taper sleeve seam by 0.5 inches on Trench.",
    },
    {
      productId: "fp-2",
      color: "Ecru",
      size: "S",
      quantity: 1,
      alterations: "None (Ready as-is)",
    },
  ],
  tailoringNotes: "Hem trouser cuff -1.5 inches; taper sleeve seam by 0.5 inches on Trench. Client requests expedited fitting by 18:00.",
  includeCedarBag: true,
  eligibleExchange: true,
  orderHistory: [
    {
      orderNo: "ORD-AM-8840",
      clientName: "Countess Clara Von Berg",
      itemsCount: 3,
      total: 5490,
      status: "In Alteration",
      date: "Today, 11:20",
    },
    {
      orderNo: "ORD-AM-8839",
      clientName: "Camilla Dupré",
      itemsCount: 2,
      total: 3100,
      status: "Delivered",
      date: "Yesterday",
    },
    {
      orderNo: "ORD-AM-8835",
      clientName: "Eleanor Vance",
      itemsCount: 1,
      total: 1650,
      status: "Exchange Processed",
      date: "Nov 09",
    },
  ],
  suppliers: [
    {
      id: "sup-1",
      name: "Loro Piana Mill SpA",
      region: "Quarona, Italy",
      specialty: "Grade-A Mongolian Cashmere & Vicuña",
      activeOrders: 4,
      qualityRating: "99.8%",
      leadTimeWeeks: 6,
    },
    {
      id: "sup-2",
      name: "Tessitura Monti",
      region: "Maserada sul Piave, Italy",
      specialty: "140/2 Egyptian Giza Poplin & Sea Island Cottons",
      activeOrders: 2,
      qualityRating: "99.4%",
      leadTimeWeeks: 4,
    },
    {
      id: "sup-3",
      name: "Kyoto Silk Guild",
      region: "Kyoto, Japan",
      specialty: "100% Mulberry Habotai & Crêpe de Chine",
      activeOrders: 3,
      qualityRating: "100%",
      leadTimeWeeks: 8,
    },
  ],
  products: [
    {
      id: "fp-1",
      sku: "TRN-2026-01",
      name: "The Oversized Trench",
      fabric: "100% GABARDINE COTTON",
      category: "Outerwear & Coats",
      collection: "Resort 2026",
      price: 1850,
      costPrice: 620,
      badge: "CURATOR PICK",
      imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
      millSupplier: "Tessitura Monti",
      variants: [
        {
          color: "Terracotta",
          colorHex: "#A0522D",
          sizes: { XS: 2, S: 6, M: 0, L: 4, XL: 1 },
        },
        {
          color: "Ecru",
          colorHex: "#F5F5DC",
          sizes: { XS: 3, S: 4, M: 5, L: 2, XL: 0 },
        },
        {
          color: "Charcoal",
          colorHex: "#2F4F4F",
          sizes: { XS: 1, S: 3, M: 2, L: 1, XL: 1 },
        },
      ],
    },
    {
      id: "fp-2",
      sku: "KNT-2026-04",
      name: "Cocoon Knit Sweater",
      fabric: "LORO PIANA CASHMERE",
      category: "Silk & Knitwear",
      collection: "Resort 2026",
      price: 1420,
      costPrice: 480,
      badge: "CURATOR PICK",
      imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80",
      millSupplier: "Loro Piana Mill SpA",
      variants: [
        {
          color: "Ecru",
          colorHex: "#FAF0E6",
          sizes: { XS: 5, S: 8, M: 12, L: 3, XL: 0 },
        },
        {
          color: "Terracotta",
          colorHex: "#C86D51",
          sizes: { XS: 2, S: 4, M: 6, L: 1, XL: 0 },
        },
        {
          color: "Sage",
          colorHex: "#8A9A86",
          sizes: { XS: 1, S: 3, M: 4, L: 2, XL: 0 },
        },
      ],
    },
    {
      id: "fp-3",
      sku: "TRS-150-09",
      name: "Pleated Studio Trouser",
      fabric: "SUPER 150S VIRGIN WOOL",
      category: "Tailored Suiting",
      collection: "Minimalist Tailoring",
      price: 980,
      costPrice: 320,
      imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80",
      millSupplier: "Loro Piana Mill SpA",
      variants: [
        {
          color: "Charcoal",
          colorHex: "#36454F",
          sizes: { XS: 1, S: 4, M: 7, L: 2, XL: 3 },
        },
        {
          color: "Camel",
          colorHex: "#C19A6B",
          sizes: { XS: 3, S: 5, M: 4, L: 1, XL: 0 },
        },
      ],
    },
    {
      id: "fp-4",
      sku: "DRS-8801-02",
      name: "Bias-Cut Habotai Dress",
      fabric: "100% MULBERRY SILK",
      category: "Dresses & Gowns",
      collection: "Resort 2026",
      price: 1650,
      costPrice: 540,
      badge: "RESORT EXCLUSIVE",
      imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80",
      millSupplier: "Kyoto Silk Guild",
      variants: [
        {
          color: "Terracotta",
          colorHex: "#B85D3B",
          sizes: { XS: 3, S: 5, M: 4, L: 1, XL: 0 },
        },
        {
          color: "Ivory",
          colorHex: "#FFFFF0",
          sizes: { XS: 2, S: 3, M: 2, L: 0, XL: 0 },
        },
      ],
    },
    {
      id: "fp-5",
      sku: "BLZ-990-03",
      name: "Sculptural Peak Blazer",
      fabric: "WORSTED WOOL & MOHAIR",
      category: "Tailored Suiting",
      collection: "Minimalist Tailoring",
      price: 2200,
      costPrice: 710,
      imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80",
      millSupplier: "Loro Piana Mill SpA",
      variants: [
        {
          color: "Noir",
          colorHex: "#0F0F0F",
          sizes: { XS: 2, S: 3, M: 5, L: 2, XL: 1 },
        },
        {
          color: "Oatmeal",
          colorHex: "#E3DAC9",
          sizes: { XS: 1, S: 2, M: 3, L: 1, XL: 0 },
        },
      ],
    },
    {
      id: "fp-6",
      sku: "SHT-POP-12",
      name: "Raw Edge Poplin Shirt",
      fabric: "CRISP ITALIAN SEA ISLAND COTTON",
      category: "Tops & Shirts",
      collection: "Resort 2026",
      price: 680,
      costPrice: 210,
      imageUrl: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80",
      millSupplier: "Tessitura Monti",
      variants: [
        {
          color: "Optic White",
          colorHex: "#FFFFFF",
          sizes: { XS: 4, S: 9, M: 11, L: 6, XL: 2 },
        },
        {
          color: "Pistachio",
          colorHex: "#93C572",
          sizes: { XS: 2, S: 3, M: 4, L: 2, XL: 1 },
        },
      ],
    },
  ],
};

export function AtelierModeFashionApp({ product }: { product: DemoItem }) {
  const model = useMemo(() => toDemoModel(product), [product]);
  const { state, setState, resetState, hasReset } = useDemoState<FashionState>(product.slug, ATELIER_SEED);

  const [activeTab, setActiveTab] = useState<"catalogue" | "matrix" | "orders" | "clients" | "suppliers">("catalogue");
  const [selectedColorMap, setSelectedColorMap] = useState<Record<string, string>>({
    "fp-1": "Terracotta",
    "fp-2": "Ecru",
    "fp-3": "Charcoal",
    "fp-4": "Terracotta",
    "fp-5": "Noir",
    "fp-6": "Optic White",
  });
  const [selectedSizeMap, setSelectedSizeMap] = useState<Record<string, string>>({
    "fp-1": "S",
    "fp-2": "S",
    "fp-3": "M",
    "fp-4": "S",
    "fp-5": "M",
    "fp-6": "S",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isAddGarmentModalOpen, setIsAddGarmentModalOpen] = useState(false);
  const [newGarment, setNewGarment] = useState({
    sku: "BLZ-2026-X",
    name: "Double-Breasted Silk Tuxedo",
    fabric: "100% DUPIONI SILK",
    category: "Tailored Suiting" as const,
    price: "2450",
    color: "Champagne",
    initialStock: "12",
  });

  const [checkoutCompleteModal, setCheckoutCompleteModal] = useState(false);

  // Filtered catalogue
  const filteredProducts = useMemo(() => {
    return state.products.filter((p) => {
      const matchCat = state.activeCategory === "All Silhouettes" || p.category === state.activeCategory;
      const matchColl = p.collection === state.currentCollection;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q);
      return matchCat && matchColl && matchSearch;
    });
  }, [state.products, state.activeCategory, state.currentCollection, searchQuery]);

  // Bag calculations
  const bagItemsDetailed = useMemo(() => {
    return state.bag.map((b) => {
      const prod = state.products.find((p) => p.id === b.productId);
      return {
        ...b,
        product: prod,
        lineTotal: prod ? prod.price * b.quantity : 0,
      };
    });
  }, [state.bag, state.products]);

  const subtotal = useMemo(() => bagItemsDetailed.reduce((acc, i) => acc + i.lineTotal, 0), [bagItemsDetailed]);
  const vipDiscount = Math.round(subtotal * 0.1); // 10% VIP
  const grandTotal = Math.max(0, subtotal - vipDiscount);

  // Add to Bag
  const handleAddToBag = (productId: string) => {
    const color = selectedColorMap[productId] || "Default";
    const size = selectedSizeMap[productId] || "M";

    setState((prev) => {
      const existing = prev.bag.find((b) => b.productId === productId && b.color === color && b.size === size);
      if (existing) {
        return {
          ...prev,
          bag: prev.bag.map((b) =>
            b.productId === productId && b.color === color && b.size === size
              ? { ...b, quantity: b.quantity + 1 }
              : b
          ),
        };
      }
      return {
        ...prev,
        bag: [
          ...prev.bag,
          {
            productId,
            color,
            size,
            quantity: 1,
            alterations: "Bespoke fitting upon request",
          },
        ],
      };
    });
  };

  const handleRemoveFromBag = (index: number) => {
    setState((prev) => ({
      ...prev,
      bag: prev.bag.filter((_, i) => i !== index),
    }));
  };

  // Complete Folio checkout
  const handleCompleteFolio = () => {
    if (state.bag.length === 0) return;
    const orderNo = `ORD-AM-${Math.floor(1000 + Math.random() * 9000)}`;

    setState((prev) => ({
      ...prev,
      orderHistory: [
        {
          orderNo,
          clientName: prev.activeClient.name,
          itemsCount: prev.bag.length,
          total: grandTotal,
          status: "In Alteration",
          date: "Just now",
        },
        ...prev.orderHistory,
      ],
      bag: [],
    }));

    setCheckoutCompleteModal(true);
  };

  // Create new garment
  const handleCreateGarment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGarment.name || !newGarment.sku) return;
    const priceNum = parseFloat(newGarment.price) || 1200;
    const stockNum = parseInt(newGarment.initialStock) || 10;

    const added: FashionProduct = {
      id: `fp-${Date.now()}`,
      sku: newGarment.sku.toUpperCase(),
      name: newGarment.name,
      fabric: newGarment.fabric,
      category: newGarment.category,
      collection: state.currentCollection,
      price: priceNum,
      costPrice: Math.round(priceNum * 0.35),
      badge: "CURATOR PICK",
      imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
      millSupplier: "Loro Piana Mill SpA",
      variants: [
        {
          color: newGarment.color,
          colorHex: "#D2B48C",
          sizes: { XS: 2, S: 4, M: stockNum, L: 2, XL: 1 },
        },
      ],
    };

    setState((prev) => ({
      ...prev,
      products: [added, ...prev.products],
    }));

    setIsAddGarmentModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1917] flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Haute Header */}
      <header className="bg-white border-b border-[#E7E5E4] px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl font-black tracking-tight text-[#1C1917]">AM</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base font-bold tracking-wide text-[#1C1917] uppercase">
                  Atelier Mode
                </span>
                <span className="text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded bg-[#FAF2EE] text-[#9A3412] font-semibold border border-[#EAC2B3]">
                  Paris Flagship
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-serif italic">Boutique Haute Merchandising & Tailoring Suite</p>
            </div>
          </div>

          <div className="h-6 w-px bg-stone-300 hidden sm:block" />

          {/* Collection Selector Pill */}
          <div className="flex items-center gap-2 bg-[#F5F4F0] border border-stone-200 px-3 py-1.5 rounded-full text-xs">
            <span className="w-2 h-2 rounded-full bg-[#9A3412] animate-pulse" />
            <span className="text-stone-500 text-[11px] uppercase tracking-wider font-semibold">Campaign:</span>
            <select
              value={state.currentCollection}
              onChange={(e) => setState((prev) => ({ ...prev, currentCollection: e.target.value as any }))}
              className="bg-transparent font-serif font-bold text-stone-900 focus:outline-none cursor-pointer"
            >
              <option value="Resort 2026">Resort 2026</option>
              <option value="Autumn Cashmere">Autumn Cashmere</option>
              <option value="Minimalist Tailoring">Minimalist Tailoring</option>
            </select>
          </div>
        </div>

        {/* Global Inventory Health Strip */}
        <div className="hidden xl:flex items-center gap-6 text-xs text-stone-600 font-mono">
          <div>
            <span className="text-stone-400 block text-[10px]">LIVE BOUTIQUE STOCK</span>
            <strong className="text-stone-900 font-bold">1,420 units</strong>
          </div>
          <div className="h-6 w-px bg-stone-200" />
          <div>
            <span className="text-[#9A3412] block text-[10px]">LOW STOCK ALERTS</span>
            <strong className="text-[#9A3412] font-bold">8 sizes depleted</strong>
          </div>
          <div className="h-6 w-px bg-stone-200" />
          <div>
            <span className="text-stone-400 block text-[10px]">ACTIVE SALON</span>
            <strong className="text-stone-900 font-bold">Private Suite #3</strong>
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
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#9A3412] hover:bg-[#781F00] text-white font-medium transition-colors shadow-xs"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>
        </div>
      </header>

      {/* Nav Strip */}
      <nav className="bg-white border-b border-[#E7E5E4] px-4 py-2 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab("catalogue")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "catalogue"
                ? "bg-stone-900 text-white"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Collections & Editorial Lookbook</span>
          </button>

          <button
            onClick={() => setActiveTab("matrix")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "matrix"
                ? "bg-stone-900 text-white"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Size & Color Variant Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "orders"
                ? "bg-stone-900 text-white"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Sales Orders & Exchanges</span>
            <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded-full font-mono">
              {state.orderHistory.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("clients")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "clients"
                ? "bg-stone-900 text-white"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-500" />
            <span>VIP Client Profiles</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-mono">
              14 Active
            </span>
          </button>

          <button
            onClick={() => setActiveTab("suppliers")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "suppliers"
                ? "bg-stone-900 text-white"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Garment Mills & Suppliers</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddGarmentModalOpen(true)}
            className="flex items-center gap-1 text-xs font-semibold bg-[#FAF2EE] text-[#9A3412] hover:bg-[#F2E5E0] border border-[#EAC2B3] px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Garment to Catalogue</span>
          </button>
        </div>
      </nav>

      {/* Main Workspace */}
      <main className="flex-1 p-4 max-w-[1600px] w-full mx-auto min-w-0">
        {/* TAB 1: EDITORIAL LOOKBOOK & BAG DRAWER */}
        {activeTab === "catalogue" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT 65%: Lookbook Showcase */}
            <div className="lg:col-span-8 space-y-4">
              {/* Category Pills + Search */}
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {[
                    "All Silhouettes",
                    "Outerwear & Coats",
                    "Tailored Suiting",
                    "Silk & Knitwear",
                    "Dresses & Gowns",
                    "Tops & Shirts",
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setState((prev) => ({ ...prev, activeCategory: cat }))}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                        state.activeCategory === cat
                          ? "bg-stone-900 text-white"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search garment or fabric..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-xs bg-stone-50 border border-stone-200 rounded-lg pl-8 pr-3 py-1.5 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#9A3412] w-48"
                  />
                </div>
              </div>

              {/* Lookbook Grid (2 Cols on desktop for generous editorial scale) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((p) => {
                  const currentColor = selectedColorMap[p.id] || p.variants[0]?.color;
                  const currentVar = p.variants.find((v) => v.color === currentColor) || p.variants[0];
                  const selectedSize = selectedSizeMap[p.id] || "S";

                  return (
                    <div
                      key={p.id}
                      className="bg-white rounded-2xl border border-stone-200 hover:border-stone-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                    >
                      {/* Editorial Image Card */}
                      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          <span className="font-mono text-[10px] tracking-wider uppercase bg-white/95 text-stone-800 font-bold px-2 py-0.5 rounded shadow-xs">
                            {p.sku}
                          </span>
                          {p.badge && (
                            <span className="text-[9px] tracking-widest uppercase font-serif font-bold bg-[#9A3412] text-white px-2 py-0.5 rounded shadow-xs">
                              {p.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content & Fabric Details */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="text-[10px] tracking-widest uppercase font-mono text-stone-400 font-semibold">
                            {p.fabric}
                          </div>
                          <div className="flex justify-between items-baseline mt-1">
                            <h3 className="font-serif text-base font-bold text-stone-900">{p.name}</h3>
                            <strong className="font-serif text-lg font-bold text-stone-900">
                              ${p.price.toLocaleString()}
                            </strong>
                          </div>
                        </div>

                        {/* Interactive Color Swatches */}
                        <div>
                          <span className="text-[10px] text-stone-400 uppercase tracking-wider block mb-1">
                            Color: <strong className="text-stone-800 font-normal">{currentColor}</strong>
                          </span>
                          <div className="flex items-center gap-1.5">
                            {p.variants.map((v) => (
                              <button
                                key={v.color}
                                onClick={() => setSelectedColorMap((prev) => ({ ...prev, [p.id]: v.color }))}
                                title={v.color}
                                className={`w-5 h-5 rounded-full border transition-all ${
                                  currentColor === v.color
                                    ? "ring-2 ring-[#9A3412] ring-offset-1 scale-110"
                                    : "border-stone-300 hover:scale-105"
                                }`}
                                style={{ backgroundColor: v.colorHex }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Interactive Size Pills with Live Stock */}
                        <div>
                          <span className="text-[10px] text-stone-400 uppercase tracking-wider block mb-1">
                            Size Availability:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(currentVar?.sizes || {}).map(([size, units]) => {
                              const isDepleted = units === 0;
                              const isSelected = selectedSize === size;
                              return (
                                <button
                                  key={size}
                                  disabled={isDepleted}
                                  onClick={() => setSelectedSizeMap((prev) => ({ ...prev, [p.id]: size }))}
                                  className={`px-2 py-1 text-[11px] font-mono rounded border transition-colors ${
                                    isDepleted
                                      ? "bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed line-through"
                                      : isSelected
                                      ? "bg-stone-900 text-white border-stone-900 font-bold"
                                      : "bg-white text-stone-700 border-stone-200 hover:border-stone-400"
                                  }`}
                                >
                                  {size} ({units})
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Add to Bag CTA */}
                        <div className="pt-2 border-t border-stone-100">
                          <button
                            onClick={() => handleAddToBag(p.id)}
                            className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-[#9A3412] text-white font-serif tracking-wide text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Fitting Folio</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT 35%: Private Fitting Folio & Tailoring Drawer */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-4 shadow-sm space-y-4 sticky top-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400">
                    FITTING FOLIO & REGISTER
                  </span>
                  <h2 className="font-serif text-base font-bold text-stone-900">Active Session #AM-8842</h2>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200">
                  Private Suite 3
                </span>
              </div>

              {/* VIP Client Profile Card */}
              <div className="p-3 bg-[#FAF9F6] rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-stone-900">{state.activeClient.name}</h3>
                    <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#9A3412]">
                      {state.activeClient.tier}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-stone-600">
                    Spend: ${state.activeClient.lifetimeSpend.toLocaleString()}
                  </span>
                </div>

                <p className="text-[11px] text-stone-500 italic font-serif leading-relaxed">
                  "{state.activeClient.stylingNotes}"
                </p>

                <div className="grid grid-cols-4 gap-1 text-center font-mono text-[10px] pt-1 border-t border-stone-200">
                  <div className="bg-white p-1 rounded border border-stone-100">
                    <span className="text-stone-400 block">Bust</span>
                    <strong className="text-stone-800">{state.activeClient.measurements.bust}</strong>
                  </div>
                  <div className="bg-white p-1 rounded border border-stone-100">
                    <span className="text-stone-400 block">Waist</span>
                    <strong className="text-stone-800">{state.activeClient.measurements.waist}</strong>
                  </div>
                  <div className="bg-white p-1 rounded border border-stone-100">
                    <span className="text-stone-400 block">Inseam</span>
                    <strong className="text-stone-800">{state.activeClient.measurements.inseam}</strong>
                  </div>
                  <div className="bg-white p-1 rounded border border-stone-100">
                    <span className="text-stone-400 block">Shoe</span>
                    <strong className="text-stone-800">{state.activeClient.measurements.shoe}</strong>
                  </div>
                </div>
              </div>

              {/* Selected Bag Line Items */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-stone-500 font-mono">
                  <span>Fitting Line Items ({state.bag.length})</span>
                  <button
                    onClick={() => setState((prev) => ({ ...prev, bag: [] }))}
                    className="text-[10px] text-red-600 hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {bagItemsDetailed.length === 0 ? (
                    <div className="py-8 text-center text-stone-400 text-xs">
                      <ShoppingBag className="w-6 h-6 mx-auto mb-1 opacity-40" />
                      Folio is currently empty
                    </div>
                  ) : (
                    bagItemsDetailed.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl border border-stone-200 bg-stone-50/50 flex items-start justify-between gap-2"
                      >
                        <div className="flex-1">
                          <h4 className="font-serif text-xs font-bold text-stone-900">{item.product?.name}</h4>
                          <span className="text-[10px] font-mono text-stone-500">
                            {item.color} • Size {item.size} • Qty {item.quantity}
                          </span>
                          {item.alterations && (
                            <div className="text-[10px] text-[#9A3412] mt-0.5 flex items-center gap-1 font-mono">
                              <Scissors className="w-3 h-3 shrink-0" />
                              <span className="truncate">{item.alterations}</span>
                            </div>
                          )}
                        </div>

                        <div className="text-right shrink-0 min-w-[75px]">
                          <strong className="font-serif text-xs font-bold text-stone-900 block">
                            ${item.lineTotal.toLocaleString()}
                          </strong>
                          <button
                            onClick={() => handleRemoveFromBag(idx)}
                            className="text-stone-400 hover:text-red-600 block ml-auto mt-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Tailoring Alteration Box */}
              <div className="space-y-1.5 bg-[#FAF2EE] p-3 rounded-xl border border-[#EAC2B3]">
                <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#781F00]">
                  <Scissors className="w-3.5 h-3.5 text-[#9A3412]" />
                  <span>Master Tailor Instructions (M. Jean-Luc)</span>
                </div>
                <textarea
                  rows={2}
                  value={state.tailoringNotes}
                  onChange={(e) => setState((prev) => ({ ...prev, tailoringNotes: e.target.value }))}
                  className="w-full bg-white border border-[#EAC2B3] rounded-lg p-2 text-xs text-stone-800 focus:outline-none focus:border-[#9A3412]"
                />
              </div>

              {/* Complimentary Couture Amenities Toggles */}
              <div className="space-y-1.5 text-xs text-stone-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.includeCedarBag}
                    onChange={(e) => setState((prev) => ({ ...prev, includeCedarBag: e.target.checked }))}
                    className="rounded text-[#9A3412] focus:ring-[#9A3412]"
                  />
                  <span>Monogrammed Cedar Garment Bag</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.eligibleExchange}
                    onChange={(e) => setState((prev) => ({ ...prev, eligibleExchange: e.target.checked }))}
                    className="rounded text-[#9A3412] focus:ring-[#9A3412]"
                  />
                  <span>Eligible for 30-Day Atelier Exchange & Re-fit Guarantee</span>
                </label>
              </div>

              {/* Pricing breakdown */}
              <div className="pt-3 border-t border-stone-200 space-y-1 text-xs font-mono">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#9A3412]">
                  <span>VIP Private Salon Courtesy (10%)</span>
                  <span>-${vipDiscount.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-serif">
                  <span className="text-sm font-bold text-stone-900">Total Payable</span>
                  <span className="text-xl font-bold text-stone-900 font-mono">${grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Settle Order CTA */}
              <button
                disabled={state.bag.length === 0}
                onClick={handleCompleteFolio}
                className={`w-full py-3 rounded-xl font-serif font-bold text-xs uppercase tracking-widest text-white transition-all shadow-md ${
                  state.bag.length === 0
                    ? "bg-stone-300 cursor-not-allowed"
                    : "bg-[#9A3412] hover:bg-[#781F00] shadow-[#9A3412]/20"
                }`}
              >
                Complete Fitting & Settle Folio
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: SIZE & COLOR VARIANT MATRIX */}
        {activeTab === "matrix" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-stone-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="font-serif text-base font-bold text-stone-900">Comprehensive Garment Variant Matrix</h2>
                <p className="text-xs text-stone-500">Inventory breakdown mapped by Fabric, Colorway, and Size run</p>
              </div>
              <button
                onClick={() => setIsAddGarmentModalOpen(true)}
                className="text-xs font-semibold bg-[#9A3412] text-white px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Garment Entry</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-stone-50 text-stone-500 uppercase font-mono tracking-wider border-b border-stone-200">
                    <tr>
                      <th className="py-3 px-4">Garment & SKU</th>
                      <th className="py-3 px-4">Fabrication</th>
                      <th className="py-3 px-4">Colorway</th>
                      <th className="py-3 px-4 text-center">XS</th>
                      <th className="py-3 px-4 text-center">S</th>
                      <th className="py-3 px-4 text-center">M</th>
                      <th className="py-3 px-4 text-center">L</th>
                      <th className="py-3 px-4 text-center">XL</th>
                      <th className="py-3 px-4 text-right">Retail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono">
                    {state.products.flatMap((p) =>
                      p.variants.map((v, idx) => (
                        <tr key={`${p.id}-${v.color}`} className="hover:bg-stone-50/70">
                          <td className="py-3 px-4">
                            <span className="font-bold text-stone-900 block">{p.name}</span>
                            <span className="text-[11px] text-stone-400">{p.sku}</span>
                          </td>
                          <td className="py-3 px-4 text-stone-600 font-sans text-xs">{p.fabric}</td>
                          <td className="py-3 px-4 flex items-center gap-2 mt-2">
                            <span className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: v.colorHex }} />
                            <span className="text-stone-800">{v.color}</span>
                          </td>
                          {(["XS", "S", "M", "L", "XL"] as const).map((s) => {
                            const val = v.sizes[s] ?? 0;
                            return (
                              <td key={s} className="py-3 px-4 text-center">
                                <span
                                  className={`px-2 py-0.5 rounded font-bold ${
                                    val === 0
                                      ? "bg-red-50 text-red-600"
                                      : val <= 2
                                      ? "bg-amber-50 text-amber-700"
                                      : "bg-stone-100 text-stone-800"
                                  }`}
                                >
                                  {val}
                                </span>
                              </td>
                            );
                          })}
                          <td className="py-3 px-4 text-right font-bold text-stone-900">
                            ${p.price.toLocaleString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SALES ORDERS & EXCHANGES */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-stone-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="font-serif text-base font-bold text-stone-900">Salon Orders & Exchange Management</h2>
                <p className="text-xs text-stone-500">Track client orders, alterations in progress, and return/exchange dispositions</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-stone-50 text-stone-500 uppercase font-mono tracking-wider border-b border-stone-200">
                    <tr>
                      <th className="py-3 px-4">Order #</th>
                      <th className="py-3 px-4">Client Name</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono">
                    {state.orderHistory.map((ord) => (
                      <tr key={ord.orderNo} className="hover:bg-stone-50">
                        <td className="py-3 px-4 font-bold text-stone-900">{ord.orderNo}</td>
                        <td className="py-3 px-4 font-sans font-medium text-stone-800">{ord.clientName}</td>
                        <td className="py-3 px-4 text-stone-600">{ord.itemsCount} garments</td>
                        <td className="py-3 px-4 font-bold text-stone-900">${ord.total.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              ord.status === "Delivered"
                                ? "bg-emerald-100 text-emerald-800"
                                : ord.status === "In Alteration"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stone-400 font-sans">{ord.date}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setState((prev) => ({
                                ...prev,
                                orderHistory: prev.orderHistory.map((o) =>
                                  o.orderNo === ord.orderNo
                                    ? { ...o, status: "Exchange Processed" }
                                    : o
                                ),
                              }));
                            }}
                            className="text-xs text-[#9A3412] hover:underline font-serif"
                          >
                            Process Exchange →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VIP CLIENT PROFILES */}
        {activeTab === "clients" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-stone-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="font-serif text-base font-bold text-stone-900">VIP Private Client Book</h2>
                <p className="text-xs text-stone-500">Couture measurements, stylist logs, and seasonal allocations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">{state.activeClient.name}</h3>
                    <span className="text-xs font-mono font-bold text-[#9A3412] bg-[#FAF2EE] px-2 py-0.5 rounded border border-[#EAC2B3]">
                      {state.activeClient.tier}
                    </span>
                  </div>
                  <strong className="font-mono text-base font-bold text-stone-900">
                    ${state.activeClient.lifetimeSpend.toLocaleString()}
                  </strong>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl text-xs space-y-1.5 font-serif italic text-stone-600">
                  <p>Stylist Assignment: {state.activeClient.preferredStylist}</p>
                  <p>Notes: "{state.activeClient.stylingNotes}"</p>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2 font-mono">
                    Atelier Measurement Card:
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs">
                    <div className="p-2 rounded bg-stone-100">
                      <span className="text-stone-400 block text-[10px]">Bust</span>
                      <strong>{state.activeClient.measurements.bust}</strong>
                    </div>
                    <div className="p-2 rounded bg-stone-100">
                      <span className="text-stone-400 block text-[10px]">Waist</span>
                      <strong>{state.activeClient.measurements.waist}</strong>
                    </div>
                    <div className="p-2 rounded bg-stone-100">
                      <span className="text-stone-400 block text-[10px]">Inseam</span>
                      <strong>{state.activeClient.measurements.inseam}</strong>
                    </div>
                    <div className="p-2 rounded bg-stone-100">
                      <span className="text-stone-400 block text-[10px]">Shoe</span>
                      <strong>{state.activeClient.measurements.shoe}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second VIP */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">Countess Clara Von Berg</h3>
                    <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      PLATINUM ATELIER
                    </span>
                  </div>
                  <strong className="font-mono text-base font-bold text-stone-900">$62,400</strong>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl text-xs space-y-1.5 font-serif italic text-stone-600">
                  <p>Stylist Assignment: M. Jean-Luc</p>
                  <p>Notes: "Prefers sculpted shoulders, heavy silk crepe, and monochrome noir palettes."</p>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2 font-mono">
                    Atelier Measurement Card:
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs">
                    <div className="p-2 rounded bg-stone-100">
                      <span className="text-stone-400 block text-[10px]">Bust</span>
                      <strong>32C</strong>
                    </div>
                    <div className="p-2 rounded bg-stone-100">
                      <span className="text-stone-400 block text-[10px]">Waist</span>
                      <strong>25 in</strong>
                    </div>
                    <div className="p-2 rounded bg-stone-100">
                      <span className="text-stone-400 block text-[10px]">Inseam</span>
                      <strong>34 in</strong>
                    </div>
                    <div className="p-2 rounded bg-stone-100">
                      <span className="text-stone-400 block text-[10px]">Shoe</span>
                      <strong>38.5 IT</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GARMENT MILLS & SUPPLIERS */}
        {activeTab === "suppliers" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-stone-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="font-serif text-base font-bold text-stone-900">Fabric Mills & Ethical Weavers</h2>
                <p className="text-xs text-stone-500">Traceability, procurement lead-times, and certified yarn quality</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {state.suppliers.map((s) => (
                <div key={s.id} className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3 shadow-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-base font-bold text-stone-900">{s.name}</h3>
                      <span className="text-[11px] text-stone-400 font-mono">{s.region}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {s.qualityRating}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600">{s.specialty}</p>

                  <div className="pt-2 border-t border-stone-100 flex justify-between text-xs font-mono text-stone-500">
                    <span>Active Mill POs: {s.activeOrders}</span>
                    <span>Lead Time: {s.leadTimeWeeks} wks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: ADD GARMENT TO CATALOGUE */}
      {isAddGarmentModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-stone-300 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-4 bg-stone-900 text-white flex justify-between items-center">
              <h3 className="font-serif text-sm font-bold tracking-wide uppercase">New Garment Introduction</h3>
              <button onClick={() => setIsAddGarmentModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGarment} className="p-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Garment Silhouette Name</label>
                <input
                  type="text"
                  placeholder="Double-Breasted Silk Tuxedo"
                  value={newGarment.name}
                  onChange={(e) => setNewGarment({ ...newGarment, name: e.target.value })}
                  className="w-full border border-stone-300 rounded-lg p-2 font-serif text-stone-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">SKU Code</label>
                  <input
                    type="text"
                    placeholder="BLZ-2026-X"
                    value={newGarment.sku}
                    onChange={(e) => setNewGarment({ ...newGarment, sku: e.target.value })}
                    className="w-full border border-stone-300 rounded-lg p-2 font-mono uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Fabric Composition</label>
                  <input
                    type="text"
                    value={newGarment.fabric}
                    onChange={(e) => setNewGarment({ ...newGarment, fabric: e.target.value })}
                    className="w-full border border-stone-300 rounded-lg p-2 font-mono uppercase"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Retail Price ($)</label>
                  <input
                    type="number"
                    value={newGarment.price}
                    onChange={(e) => setNewGarment({ ...newGarment, price: e.target.value })}
                    className="w-full border border-stone-300 rounded-lg p-2 font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Primary Colorway</label>
                  <input
                    type="text"
                    value={newGarment.color}
                    onChange={(e) => setNewGarment({ ...newGarment, color: e.target.value })}
                    className="w-full border border-stone-300 rounded-lg p-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Initial Stock (M units)</label>
                <input
                  type="number"
                  value={newGarment.initialStock}
                  onChange={(e) => setNewGarment({ ...newGarment, initialStock: e.target.value })}
                  className="w-full border border-stone-300 rounded-lg p-2 font-mono"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddGarmentModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg font-serif font-bold text-white bg-[#9A3412] hover:bg-[#781F00] shadow-xs"
                >
                  Save Garment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CHECKOUT COMPLETE CONFIRMATION */}
      {checkoutCompleteModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-stone-300 shadow-2xl max-w-sm w-full p-6 text-center space-y-3 font-serif">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Private Fitting Settle Complete</h3>
            <p className="text-xs text-stone-500 font-sans leading-relaxed">
              Garments have been transferred to Master Tailor Jean-Luc for bespoke cuffing. Dispatch will occur in
              monogrammed cedar bags by 18:00.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCheckoutCompleteModal(false)}
                className="w-full py-2 bg-stone-900 text-white text-xs font-serif font-bold rounded-lg hover:bg-stone-800"
              >
                Return to Salon
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
