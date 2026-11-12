"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Apple,
  Milk,
  Croissant,
  Scale,
  Barcode,
  Clock,
  AlertTriangle,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Plus,
  Minus,
  Trash2,
  Search,
  ShoppingCart,
  QrCode,
  CreditCard,
  Coins,
  ShieldCheck,
  TrendingUp,
  Building2,
  RefreshCw,
  Printer,
  X,
  Sparkles,
  Tag,
  Leaf,
} from "lucide-react";
import { toDemoModel, type DemoItem } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

interface GroceryProduct {
  id: string;
  sku: string;
  plu?: string;
  name: string;
  category: "Fresh Farm Produce" | "Dairy & Chilled" | "Artisan Bakery" | "Pantry Essentials";
  pricingType: "weight" | "unit"; // weight: per kg; unit: per pack/bottle
  price: number; // per kg or per unit
  originalPrice?: number;
  costPrice: number;
  stockQty: number; // kg or units
  stockUnit: "kg" | "units" | "bottles" | "loaves";
  expiryDaysRemaining: number;
  batchCode: string;
  markdownPercent?: number;
  isOrganic?: boolean;
  tempZone?: string; // e.g. "Chilled 3.8°C"
  imageUrl: string;
}

interface CartItem {
  productId: string;
  quantity: number; // units or kg
  weighedWeightKg?: number; // actual tare-adjusted scale reading
  discountMarkdownApplied?: number;
}

interface PerishableBatch {
  batchId: string;
  sku: string;
  productName: string;
  currentStock: number;
  daysRemaining: number;
  markdownActive: boolean;
  actionRequired: "Apply 20% Markdown" | "Dispatch to Food Bank" | "Optimal Freshness";
}

interface GrocerySupplier {
  id: string;
  name: string;
  category: string;
  contact: string;
  leadTimeHours: number;
  onTimeDeliveryPct: string;
  activeOrders: number;
}

interface GroceryState {
  currentLane: string;
  cashierName: string;
  scaleTareWeightKg: number;
  currentScaleGrossKg: number;
  activeCategory: string;
  organicOnly: boolean;
  loyaltyMember: {
    name: string;
    membershipId: string;
    pointsBalance: number;
    pointsDollarValue: number;
    appliedReward: boolean;
  };
  cart: CartItem[];
  products: GroceryProduct[];
  batches: PerishableBatch[];
  suppliers: GrocerySupplier[];
  salesVelocity: {
    totalRevenue: number;
    billsCleared: number;
    freshShrinkageRate: string;
  };
}

const HARVEST_SEED: GroceryState = {
  currentLane: "Lane #03 Express Checkout",
  cashierName: "Elena Rostova (#1042)",
  scaleTareWeightKg: 0.05,
  currentScaleGrossKg: 1.5,
  activeCategory: "All Categories",
  organicOnly: false,
  loyaltyMember: {
    name: "Marcus Vance",
    membershipId: "#HC-8849",
    pointsBalance: 1420,
    pointsDollarValue: 5.0,
    appliedReward: true,
  },
  cart: [
    { productId: "gp-3", quantity: 1, weighedWeightKg: 1.45 },
    { productId: "gp-2", quantity: 2, discountMarkdownApplied: 1.0 },
    { productId: "gp-1", quantity: 1, weighedWeightKg: 0.85 },
    { productId: "gp-4", quantity: 1 },
    { productId: "gp-6", quantity: 1, discountMarkdownApplied: 1.65 },
  ],
  products: [
    {
      id: "gp-1",
      sku: "PRD-4046",
      plu: "PLU #4046",
      name: "Organic Hass Avocados",
      category: "Fresh Farm Produce",
      pricingType: "weight",
      price: 4.8,
      costPrice: 2.1,
      stockQty: 84,
      stockUnit: "kg",
      expiryDaysRemaining: 5,
      batchCode: "PRD-882",
      isOrganic: true,
      imageUrl: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "gp-2",
      sku: "DRY-90214",
      name: "Artisan Greek Whole Yogurt 500g",
      category: "Dairy & Chilled",
      pricingType: "unit",
      price: 3.99,
      originalPrice: 4.99,
      costPrice: 1.8,
      stockQty: 14,
      stockUnit: "units",
      expiryDaysRemaining: 2,
      batchCode: "EXP-48H",
      markdownPercent: 20,
      tempZone: "Chilled 3.8°C",
      imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "gp-3",
      sku: "PRD-4173",
      plu: "PLU #4173",
      name: "Crisp Honeycrisp Apples",
      category: "Fresh Farm Produce",
      pricingType: "weight",
      price: 3.2,
      costPrice: 1.4,
      stockQty: 120,
      stockUnit: "kg",
      expiryDaysRemaining: 9,
      batchCode: "EXP-72H",
      imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "gp-4",
      sku: "DRY-18442",
      name: "Cold Pressed Farm Milk 1L",
      category: "Dairy & Chilled",
      pricingType: "unit",
      price: 3.45,
      costPrice: 1.9,
      stockQty: 32,
      stockUnit: "bottles",
      expiryDaysRemaining: 8,
      batchCode: "EXP-8D",
      tempZone: "Chilled 3.8°C",
      imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "gp-5",
      sku: "PRD-4664",
      plu: "PLU #4664",
      name: "Organic Roma Vine Tomatoes",
      category: "Fresh Farm Produce",
      pricingType: "weight",
      price: 2.9,
      costPrice: 1.1,
      stockQty: 68,
      stockUnit: "kg",
      expiryDaysRemaining: 4,
      batchCode: "PRD-890",
      isOrganic: true,
      imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "gp-6",
      sku: "BAK-3120",
      plu: "PLU #3120",
      name: "Sourdough Boule Loaf",
      category: "Artisan Bakery",
      pricingType: "unit",
      price: 3.85,
      originalPrice: 5.5,
      costPrice: 1.2,
      stockQty: 18,
      stockUnit: "loaves",
      expiryDaysRemaining: 1,
      batchCode: "BAK-24H",
      markdownPercent: 30,
      imageUrl: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=400&auto=format&fit=crop&q=80",
    },
  ],
  batches: [
    {
      batchId: "EXP-48H",
      sku: "DRY-90214",
      productName: "Artisan Greek Whole Yogurt 500g",
      currentStock: 14,
      daysRemaining: 2,
      markdownActive: true,
      actionRequired: "Apply 20% Markdown",
    },
    {
      batchId: "BAK-24H",
      sku: "BAK-3120",
      productName: "Sourdough Boule Loaf",
      currentStock: 18,
      daysRemaining: 1,
      markdownActive: true,
      actionRequired: "Apply 20% Markdown",
    },
    {
      batchId: "PRD-890",
      sku: "PRD-4664",
      productName: "Organic Roma Vine Tomatoes",
      currentStock: 68,
      daysRemaining: 4,
      markdownActive: false,
      actionRequired: "Optimal Freshness",
    },
  ],
  suppliers: [
    {
      id: "gs-1",
      name: "Hudson Valley Organic Co-op",
      category: "Farm Fresh Produce",
      contact: "+1 845-555-0199",
      leadTimeHours: 12,
      onTimeDeliveryPct: "99.4%",
      activeOrders: 3,
    },
    {
      id: "gs-2",
      name: "Greenfield Pastures Dairy",
      category: "Grass-Fed Dairy & Yogurt",
      contact: "+1 802-555-0144",
      leadTimeHours: 18,
      onTimeDeliveryPct: "98.9%",
      activeOrders: 2,
    },
    {
      id: "gs-3",
      name: "Stoneground Hearth Bakers",
      category: "Artisan Sourdough & Breads",
      contact: "+1 718-555-0812",
      leadTimeHours: 6,
      onTimeDeliveryPct: "100%",
      activeOrders: 1,
    },
  ],
  salesVelocity: {
    totalRevenue: 2840.5,
    billsCleared: 168,
    freshShrinkageRate: "1.2%",
  },
};

export function HarvestMartGroceryApp({ product }: { product: DemoItem }) {
  const model = useMemo(() => toDemoModel(product), [product]);
  const { state, setState, resetState } = useDemoState<GroceryState>(product.slug, HARVEST_SEED);

  const [activeTab, setActiveTab] = useState<"pos" | "perishables" | "scale" | "suppliers" | "velocity">("pos");
  const [barcodeOrPluInput, setBarcodeOrPluInput] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [receiptCompleteModal, setReceiptCompleteModal] = useState(false);

  // New grocery product form
  const [newGroceryForm, setNewGroceryForm] = useState({
    sku: "PRD-4011",
    plu: "PLU #4011",
    name: "Organic Cavendish Bananas",
    category: "Fresh Farm Produce" as const,
    pricingType: "weight" as const,
    price: "1.89",
    stock: "150",
  });

  // Digital Scale reading
  const liveNetWeightKg = useMemo(() => {
    return Number(Math.max(0, state.currentScaleGrossKg - state.scaleTareWeightKg).toFixed(3));
  }, [state.currentScaleGrossKg, state.scaleTareWeightKg]);

  // Filtered catalogue
  const categories = useMemo(() => {
    return [
      "All Categories",
      "Fresh Farm Produce",
      "Dairy & Chilled",
      "Artisan Bakery",
      "Pantry Essentials",
    ];
  }, []);

  const filteredProducts = useMemo(() => {
    return state.products.filter((p) => {
      const matchCat = state.activeCategory === "All Categories" || p.category === state.activeCategory;
      const matchOrganic = !state.organicOnly || p.isOrganic;
      const q = searchFilter.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.plu && p.plu.toLowerCase().includes(q));
      return matchCat && matchOrganic && matchSearch;
    });
  }, [state.products, state.activeCategory, state.organicOnly, searchFilter]);

  // Cart calculations
  const detailedCartLines = useMemo(() => {
    return state.cart
      .map((item) => {
        const prod = state.products.find((p) => p.id === item.productId);
        if (!prod) return null;

        let linePrice = 0;
        let lineWeightOrQty = "";

        if (prod.pricingType === "weight") {
          const weight = item.weighedWeightKg || 1.0;
          linePrice = Number((prod.price * weight).toFixed(2));
          lineWeightOrQty = `${weight} kg @ $${prod.price.toFixed(2)}/kg`;
        } else {
          const effectiveUnitPrice = prod.price;
          linePrice = Number((effectiveUnitPrice * item.quantity).toFixed(2));
          lineWeightOrQty = `${item.quantity} ${prod.stockUnit} @ $${prod.price.toFixed(2)}/ea`;
        }

        return {
          ...item,
          product: prod,
          linePrice,
          lineWeightOrQty,
        };
      })
      .filter(Boolean) as {
      productId: string;
      quantity: number;
      weighedWeightKg?: number;
      discountMarkdownApplied?: number;
      product: GroceryProduct;
      linePrice: number;
      lineWeightOrQty: string;
    }[];
  }, [state.cart, state.products]);

  const subtotalGross = useMemo(() => {
    return Number(detailedCartLines.reduce((acc, l) => acc + l.linePrice, 0).toFixed(2));
  }, [detailedCartLines]);

  const markdownsSaved = useMemo(() => {
    return Number(
      detailedCartLines.reduce((acc, l) => acc + (l.discountMarkdownApplied || 0), 0).toFixed(2)
    );
  }, [detailedCartLines]);

  const loyaltyDeduction = state.loyaltyMember.appliedReward ? state.loyaltyMember.pointsDollarValue : 0;
  const taxableSubtotal = Math.max(0, subtotalGross - markdownsSaved - loyaltyDeduction);
  const taxEst = Number((taxableSubtotal * 0.06).toFixed(2));
  const netPayable = Number((taxableSubtotal + taxEst).toFixed(2));

  // Cart Actions
  const handleWeighAndAdd = (productId: string, customKg?: number) => {
    const weightToUse = customKg || liveNetWeightKg;
    setState((prev) => ({
      ...prev,
      cart: [
        ...prev.cart,
        {
          productId,
          quantity: 1,
          weighedWeightKg: weightToUse,
        },
      ],
    }));
  };

  const handleAddUnitItem = (productId: string) => {
    setState((prev) => {
      const existing = prev.cart.find((c) => c.productId === productId);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map((c) => (c.productId === productId ? { ...c, quantity: c.quantity + 1 } : c)),
        };
      }
      return {
        ...prev,
        cart: [...prev.cart, { productId, quantity: 1 }],
      };
    });
  };

  const handleRemoveCartLine = (index: number) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((_, i) => i !== index),
    }));
  };

  const handleClearCart = () => {
    setState((prev) => ({ ...prev, cart: [] }));
  };

  // Barcode / PLU quick entry
  const handlePluSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeOrPluInput.trim()) return;
    const q = barcodeOrPluInput.trim().toLowerCase();
    const match = state.products.find(
      (p) =>
        p.sku.toLowerCase() === q ||
        (p.plu && p.plu.toLowerCase().includes(q)) ||
        p.name.toLowerCase().includes(q)
    );
    if (match) {
      if (match.pricingType === "weight") {
        handleWeighAndAdd(match.id, liveNetWeightKg);
      } else {
        handleAddUnitItem(match.id);
      }
      setBarcodeOrPluInput("");
    } else {
      alert(`Produce SKU / PLU "${barcodeOrPluInput}" not found.`);
    }
  };

  // Complete checkout
  const handleCompleteSupermarketCheckout = () => {
    if (state.cart.length === 0) return;
    setState((prev) => ({
      ...prev,
      cart: [],
      salesVelocity: {
        ...prev.salesVelocity,
        totalRevenue: prev.salesVelocity.totalRevenue + netPayable,
        billsCleared: prev.salesVelocity.billsCleared + 1,
      },
    }));
    setReceiptCompleteModal(true);
  };

  // Add new grocery product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroceryForm.name || !newGroceryForm.sku) return;
    const priceNum = parseFloat(newGroceryForm.price) || 2.5;
    const stockNum = parseFloat(newGroceryForm.stock) || 50;

    const added: GroceryProduct = {
      id: `gp-${Date.now()}`,
      sku: newGroceryForm.sku.toUpperCase(),
      plu: newGroceryForm.plu.toUpperCase(),
      name: newGroceryForm.name,
      category: newGroceryForm.category,
      pricingType: newGroceryForm.pricingType,
      price: priceNum,
      costPrice: Number((priceNum * 0.45).toFixed(2)),
      stockQty: stockNum,
      stockUnit: newGroceryForm.pricingType === "weight" ? "kg" : "units",
      expiryDaysRemaining: 7,
      batchCode: "BATCH-NEW",
      imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80",
    };

    setState((prev) => ({
      ...prev,
      products: [added, ...prev.products],
      cart: [...prev.cart, { productId: added.id, quantity: 1, weighedWeightKg: 1.0 }],
    }));

    setIsNewProductModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] text-[#0F172A] flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Deep Forest Supermarket Bar */}
      <header className="bg-[#064E3B] text-white border-b border-emerald-900 px-3 py-2 flex flex-wrap items-center justify-between gap-2.5 shadow-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-white text-sm shadow-sm">
              🛒
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-white uppercase">HarvestPOS Pro</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {state.currentLane}
                </span>
              </div>
            </div>
          </div>

          <div className="h-5 w-px bg-emerald-800 hidden sm:block" />

          {/* Live Scale Tare Weight Box */}
          <div className="flex items-center gap-2 bg-[#022C22] border border-emerald-700 px-3 py-1 rounded-lg">
            <Scale className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="font-mono">
              <span className="text-[10px] text-emerald-400 uppercase tracking-wider block">Scale #01 NET</span>
              <strong className="text-sm font-black text-white">{liveNetWeightKg.toFixed(3)} kg</strong>
            </div>
            <div className="flex gap-1 ml-1">
              <button
                onClick={() => setState((prev) => ({ ...prev, currentScaleGrossKg: 0.05 }))}
                title="Zero Scale"
                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-900 text-emerald-300 hover:bg-emerald-800 border border-emerald-700"
              >
                Zero (F7)
              </button>
              <button
                onClick={() => setState((prev) => ({ ...prev, currentScaleGrossKg: 1.45 + prev.scaleTareWeightKg }))}
                title="Simulate 1.450kg produce"
                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-700 text-white hover:bg-emerald-600 font-bold"
              >
                +1.45kg
              </button>
            </div>
          </div>
        </div>

        {/* Center: Barcode / PLU Fast Lookup */}
        <form onSubmit={handlePluSubmit} className="w-full sm:flex-1 sm:max-w-md my-0.5 sm:my-0">
          <div className="relative w-full">
            <Barcode className="w-4 h-4 text-emerald-300 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Scan barcode or enter PLU (e.g. #4046, Avocados)..."
              value={barcodeOrPluInput}
              onChange={(e) => setBarcodeOrPluInput(e.target.value)}
              className="w-full bg-[#022C22] border border-emerald-700 text-xs rounded-lg pl-9 pr-14 py-1.5 text-white placeholder-emerald-400/70 focus:outline-none focus:border-emerald-400 font-mono"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-emerald-900 text-emerald-200 px-1.5 py-0.5 rounded border border-emerald-700">
              ↵ Enter
            </span>
          </div>
        </form>

        {/* Right Badges & Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => resetState()}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-emerald-800 text-emerald-200 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={() => setIsCustomizeOpen(true)}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors shadow-xs"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>
        </div>
      </header>

      {/* Nav Strip */}
      <nav className="bg-white border-b border-emerald-200 px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab("pos")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "pos"
                ? "bg-emerald-700 text-white shadow-xs"
                : "text-slate-700 hover:bg-emerald-50"
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Point of Sale Checkout</span>
            {detailedCartLines.length > 0 && (
              <span className="text-[10px] bg-white text-emerald-800 px-1.5 py-0.2 rounded-full font-mono font-bold">
                {detailedCartLines.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("perishables")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "perishables"
                ? "bg-emerald-700 text-white shadow-xs"
                : "text-slate-700 hover:bg-emerald-50"
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Perishables & Expiry Ledger</span>
            <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.2 rounded-full font-mono font-bold">
              {state.batches.filter((b) => b.daysRemaining <= 2).length} Expiries
            </span>
          </button>

          <button
            onClick={() => setActiveTab("scale")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "scale"
                ? "bg-emerald-700 text-white shadow-xs"
                : "text-slate-700 hover:bg-emerald-50"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Scale & Tare Calibration</span>
          </button>

          <button
            onClick={() => setActiveTab("suppliers")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "suppliers"
                ? "bg-emerald-700 text-white shadow-xs"
                : "text-slate-700 hover:bg-emerald-50"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Farm Suppliers & POs</span>
          </button>

          <button
            onClick={() => setActiveTab("velocity")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "velocity"
                ? "bg-emerald-700 text-white shadow-xs"
                : "text-slate-700 hover:bg-emerald-50"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Daily Category Velocity</span>
          </button>
        </div>

        <button
          onClick={() => setIsNewProductModalOpen(true)}
          className="text-xs font-bold bg-emerald-100 text-emerald-900 hover:bg-emerald-200 border border-emerald-300 px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Produce SKU</span>
        </button>
      </nav>

      {/* Main Workspace */}
      <main className="flex-1 p-3 sm:p-4 max-w-[1600px] w-full mx-auto min-w-0">
        {/* TAB 1: SUPERMARKET POS CHECKOUT & WEIGH STATION */}
        {activeTab === "pos" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start min-w-0">
            {/* LEFT 65%: Produce & Grocery Grid */}
            <div className="lg:col-span-8 space-y-3 min-w-0">
              {/* Category Filter Pills & Organic Toggle */}
              <div className="bg-white p-3 rounded-xl border border-emerald-200 flex flex-wrap items-center justify-between gap-2 shadow-xs">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setState((prev) => ({ ...prev, activeCategory: cat }))}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                        state.activeCategory === cat
                          ? "bg-emerald-800 text-white"
                          : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900 cursor-pointer bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                    <input
                      type="checkbox"
                      checked={state.organicOnly}
                      onChange={(e) => setState((prev) => ({ ...prev, organicOnly: e.target.checked }))}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Organic Only</span>
                  </label>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search produce..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 w-36"
                    />
                  </div>
                </div>
              </div>

              {/* Grocery Product Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {filteredProducts.map((p) => {
                  const isWeight = p.pricingType === "weight";
                  const computedWeighPrice = (p.price * liveNetWeightKg).toFixed(2);

                  return (
                    <div
                      key={p.id}
                      className="bg-white rounded-xl border border-emerald-100 hover:border-emerald-400 hover:shadow-md transition-all p-3.5 flex flex-col justify-between space-y-3"
                    >
                      <div>
                        {/* Top Badges */}
                        <div className="flex justify-between items-start">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {p.plu && (
                              <span className="font-mono text-[10px] font-bold bg-emerald-900 text-emerald-200 px-1.5 py-0.5 rounded">
                                {p.plu}
                              </span>
                            )}
                            <span className="text-[10px] font-mono text-slate-400 font-semibold">{p.sku}</span>
                          </div>

                          {p.markdownPercent ? (
                            <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full shadow-2xs">
                              -{p.markdownPercent}% Markdown
                            </span>
                          ) : p.isOrganic ? (
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                              <Leaf className="w-2.5 h-2.5" /> Organic
                            </span>
                          ) : null}
                        </div>

                        {/* Title & Price */}
                        <h3 className="text-sm font-extrabold text-slate-900 mt-2">{p.name}</h3>

                        <div className="mt-1 flex items-baseline gap-2">
                          <strong className="text-base font-black font-mono text-emerald-800">
                            ${p.price.toFixed(2)}
                          </strong>
                          <span className="text-xs text-slate-500">
                            / {isWeight ? "kg" : p.stockUnit}
                          </span>
                          {p.originalPrice && (
                            <span className="text-xs text-slate-400 line-through font-mono">
                              ${p.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Stock & Expiry indicators */}
                        <div className="mt-2 text-[11px] font-mono text-slate-500 flex justify-between bg-slate-50 p-1.5 rounded border border-slate-100">
                          <span>Stock: {p.stockQty} {p.stockUnit}</span>
                          <span
                            className={
                              p.expiryDaysRemaining <= 2
                                ? "text-red-600 font-bold"
                                : "text-emerald-700"
                            }
                          >
                            Exp: {p.expiryDaysRemaining} Days
                          </span>
                        </div>
                      </div>

                      {/* Action Button: Weigh & Add or Unit Add */}
                      <div className="pt-2 border-t border-slate-100">
                        {isWeight ? (
                          <div className="space-y-1.5">
                            <button
                              onClick={() => handleWeighAndAdd(p.id)}
                              className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                            >
                              <Scale className="w-3.5 h-3.5" />
                              <span>Weigh {liveNetWeightKg.toFixed(3)} kg → ${computedWeighPrice}</span>
                            </button>
                            <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
                              <button
                                onClick={() => handleWeighAndAdd(p.id, 0.5)}
                                className="py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-center font-bold"
                              >
                                +0.50 kg
                              </button>
                              <button
                                onClick={() => handleWeighAndAdd(p.id, 1.0)}
                                className="py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-center font-bold"
                              >
                                +1.00 kg
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddUnitItem(p.id)}
                            className="w-full py-2 rounded-lg bg-slate-900 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Pack (${p.price.toFixed(2)})</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT 35%: RAPID SUPERMARKET CART & TENDER */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-emerald-200 p-4 shadow-sm space-y-4 sticky top-4">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-700 font-bold">
                    EXPRESS CHECKOUT • LANE #03
                  </span>
                  <h2 className="text-sm font-bold text-slate-900">Active Order #HM-9042</h2>
                </div>
                <button onClick={handleClearCart} className="text-xs text-red-600 hover:underline">
                  Clear All
                </button>
              </div>

              {/* HarvestClub Loyalty Member Strip */}
              <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs space-y-1">
                <div className="flex justify-between items-center font-bold text-emerald-950">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{state.loyaltyMember.name}</span>
                  </span>
                  <span className="font-mono text-emerald-700">{state.loyaltyMember.membershipId}</span>
                </div>
                <div className="flex justify-between text-[11px] text-emerald-800">
                  <span>HarvestClub Balance: {state.loyaltyMember.pointsBalance} pts</span>
                  <strong className="text-emerald-900 font-mono">-$5.00 Reward Applied</strong>
                </div>
              </div>

              {/* Line Items List */}
              <div className="space-y-2 max-h-[280px] overflow-y-auto divide-y divide-slate-100">
                {detailedCartLines.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    <ShoppingCart className="w-6 h-6 mx-auto mb-1 opacity-40" />
                    Checkout lane is currently empty
                  </div>
                ) : (
                  detailedCartLines.map((line, idx) => (
                    <div key={idx} className="pt-2 flex justify-between items-start text-xs">
                      <div className="flex-1 pr-2">
                        <h4 className="font-bold text-slate-900">{line.product.name}</h4>
                        <div className="text-[11px] font-mono text-slate-500">{line.lineWeightOrQty}</div>
                        {line.discountMarkdownApplied && (
                          <div className="text-[10px] text-red-600 font-mono">
                            -${line.discountMarkdownApplied.toFixed(2)} Expiry Markdown
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <strong className="font-mono font-bold text-slate-900 block">
                          ${line.linePrice.toFixed(2)}
                        </strong>
                        <button
                          onClick={() => handleRemoveCartLine(idx)}
                          className="text-slate-400 hover:text-red-600 text-[10px] mt-0.5 inline-block"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Financial Summary */}
              <div className="pt-2 border-t border-slate-200 space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Gross ({detailedCartLines.length} items)</span>
                  <span>${subtotalGross.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Perishable Markdowns Saved</span>
                  <span>-${markdownsSaved.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>HarvestClub Member Reward</span>
                  <span>-${loyaltyDeduction.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Estimated Tax & Bag Deposit</span>
                  <span>+${taxEst.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-sans">
                  <span className="text-sm font-extrabold text-slate-900">Net Payable</span>
                  <span className="text-2xl font-black font-mono text-emerald-700">
                    ${netPayable.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Tender Shortcut Grid */}
              <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                <button
                  onClick={handleCompleteSupermarketCheckout}
                  className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold flex items-center justify-between"
                >
                  <span className="flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-emerald-700" /> Cash
                  </span>
                  <span className="text-[10px] text-emerald-600">F1</span>
                </button>
                <button
                  onClick={handleCompleteSupermarketCheckout}
                  className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bold flex items-center justify-between"
                >
                  <span className="flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5 text-blue-700" /> UPI / QR
                  </span>
                  <span className="text-[10px] text-blue-600">F2</span>
                </button>
                <button
                  onClick={handleCompleteSupermarketCheckout}
                  className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold flex items-center justify-between"
                >
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-amber-700" /> Sodexo
                  </span>
                  <span className="text-[10px] text-amber-600">F3</span>
                </button>
                <button
                  onClick={handleCompleteSupermarketCheckout}
                  className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold flex items-center justify-between"
                >
                  <span className="flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5 text-purple-700" /> Card EMV
                  </span>
                  <span className="text-[10px] text-purple-600">F4</span>
                </button>
              </div>

              {/* Complete Checkout CTA */}
              <button
                disabled={detailedCartLines.length === 0}
                onClick={handleCompleteSupermarketCheckout}
                className={`w-full py-3.5 rounded-xl text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  detailedCartLines.length === 0
                    ? "bg-slate-300 cursor-not-allowed"
                    : "bg-[#064E3B] hover:bg-[#047857] shadow-emerald-700/20 active:scale-98"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Sale & Print Slip (Enter ↵)</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PERISHABLES & EXPIRY LEDGER */}
        {activeTab === "perishables" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-emerald-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="text-base font-bold text-slate-900">Perishables & Expiry Batch Tracker</h2>
                <p className="text-xs text-slate-500">Early markdown triggers to prevent fresh produce shrinkage</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-emerald-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-emerald-50/50 text-slate-600 uppercase font-mono tracking-wider border-b border-emerald-100">
                    <tr>
                      <th className="py-3 px-4">Batch Code</th>
                      <th className="py-3 px-4">Product Name</th>
                      <th className="py-3 px-4 text-center">Current Stock</th>
                      <th className="py-3 px-4 text-center">Days Remaining</th>
                      <th className="py-3 px-4">Recommended Action</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {state.batches.map((b) => (
                      <tr key={b.batchId} className="hover:bg-emerald-50/40">
                        <td className="py-3 px-4 font-bold text-emerald-900">{b.batchId}</td>
                        <td className="py-3 px-4 font-sans font-medium text-slate-800">{b.productName}</td>
                        <td className="py-3 px-4 text-center font-bold text-slate-900">{b.currentStock} units</td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              b.daysRemaining <= 2
                                ? "bg-red-100 text-red-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {b.daysRemaining} Days
                          </span>
                        </td>
                        <td className="py-3 px-4 font-sans text-xs">
                          <span className="font-semibold text-slate-700">{b.actionRequired}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setState((prev) => ({
                                ...prev,
                                batches: prev.batches.map((item) =>
                                  item.batchId === b.batchId
                                    ? { ...item, markdownActive: true, actionRequired: "Apply 20% Markdown" }
                                    : item
                                ),
                              }));
                            }}
                            className="text-xs font-bold text-emerald-700 hover:underline"
                          >
                            Trigger 20% Discount →
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

        {/* TAB 3: DIGITAL SCALE CALIBRATION */}
        {activeTab === "scale" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-emerald-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="text-base font-bold text-slate-900">Digital Scale & Tare Calibration</h2>
                <p className="text-xs text-slate-500">NTEP / Legal-for-trade grocery scale interface simulation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-emerald-200 space-y-2">
                <span className="text-xs text-slate-400 block font-mono">GROSS WEIGHT</span>
                <strong className="text-2xl font-black font-mono text-slate-900">
                  {state.currentScaleGrossKg.toFixed(3)} kg
                </strong>
                <p className="text-[11px] text-slate-500">Physical platter reading</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-emerald-200 space-y-2">
                <span className="text-xs text-slate-400 block font-mono">TARE WEIGHT</span>
                <strong className="text-2xl font-black font-mono text-amber-700">
                  {state.scaleTareWeightKg.toFixed(3)} kg
                </strong>
                <p className="text-[11px] text-slate-500">Container / bag offset</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-emerald-200 space-y-2">
                <span className="text-xs text-slate-400 block font-mono">NET BILLED WEIGHT</span>
                <strong className="text-2xl font-black font-mono text-emerald-700">
                  {liveNetWeightKg.toFixed(3)} kg
                </strong>
                <p className="text-[11px] text-slate-500">Transferred to POS ticket</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FARM SUPPLIERS & PURCHASE ORDERS */}
        {activeTab === "suppliers" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-emerald-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="text-base font-bold text-slate-900">Fresh Produce Farms & Dairy Co-ops</h2>
                <p className="text-xs text-slate-500">Farm-to-fork direct supply contracts with daily morning drops</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {state.suppliers.map((s) => (
                <div key={s.id} className="bg-white p-4 rounded-xl border border-emerald-200 space-y-2.5 shadow-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{s.name}</h3>
                      <span className="text-xs text-emerald-700 font-medium">{s.category}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                      {s.onTimeDeliveryPct}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-mono">Dispatch Contact: {s.contact}</p>

                  <div className="pt-2 border-t border-slate-100 flex justify-between text-xs font-mono text-slate-600">
                    <span>Morning Lead Time: {s.leadTimeHours} hrs</span>
                    <span>Active POs: {s.activeOrders}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DAILY CATEGORY SALES VELOCITY */}
        {activeTab === "velocity" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-emerald-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="text-base font-bold text-slate-900">Daily Supermarket Category Velocity</h2>
                <p className="text-xs text-slate-500">Real-time throughput, checkouts, and shrink mitigation metrics</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
              <div className="bg-white p-4 rounded-xl border border-emerald-200">
                <span className="text-xs text-slate-500 block">Today Gross Revenue</span>
                <strong className="text-2xl font-black text-emerald-800 mt-1 block">
                  ${state.salesVelocity.totalRevenue.toFixed(2)}
                </strong>
                <span className="text-[11px] text-slate-400">Across 3 checkout lanes</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-emerald-200">
                <span className="text-xs text-slate-500 block">Customer Checks Cleared</span>
                <strong className="text-2xl font-black text-slate-900 mt-1 block">
                  {state.salesVelocity.billsCleared}
                </strong>
                <span className="text-[11px] text-slate-400">Avg ticket: ${(state.salesVelocity.totalRevenue / state.salesVelocity.billsCleared).toFixed(2)}</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-emerald-200">
                <span className="text-xs text-slate-500 block">Fresh Shrinkage Rate</span>
                <strong className="text-2xl font-black text-emerald-600 mt-1 block">
                  {state.salesVelocity.freshShrinkageRate}
                </strong>
                <span className="text-[11px] text-slate-400">Industry benchmark: 2.8%</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: ADD PRODUCE SKU */}
      {isNewProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-emerald-300 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-4 bg-[#064E3B] text-white flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-wider">New Grocery Produce Item</h3>
              <button onClick={() => setIsNewProductModalOpen(false)} className="text-emerald-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Item Title</label>
                <input
                  type="text"
                  placeholder="Organic Cavendish Bananas"
                  value={newGroceryForm.name}
                  onChange={(e) => setNewGroceryForm({ ...newGroceryForm, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">SKU Code</label>
                  <input
                    type="text"
                    placeholder="PRD-4011"
                    value={newGroceryForm.sku}
                    onChange={(e) => setNewGroceryForm({ ...newGroceryForm, sku: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 font-mono uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">PLU Code</label>
                  <input
                    type="text"
                    placeholder="PLU #4011"
                    value={newGroceryForm.plu}
                    onChange={(e) => setNewGroceryForm({ ...newGroceryForm, plu: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 font-mono uppercase"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newGroceryForm.price}
                    onChange={(e) => setNewGroceryForm({ ...newGroceryForm, price: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pricing Mode</label>
                  <select
                    value={newGroceryForm.pricingType}
                    onChange={(e) =>
                      setNewGroceryForm({ ...newGroceryForm, pricingType: e.target.value as any })
                    }
                    className="w-full border border-slate-300 rounded-lg p-2"
                  >
                    <option value="weight">Per Kilogram (Tare Scale)</option>
                    <option value="unit">Per Unit / Bottle</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewProductModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg font-bold text-white bg-emerald-700 hover:bg-emerald-600 shadow-xs"
                >
                  Save to Harvest Catalogue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: RECEIPT SLIP PREVIEW */}
      {receiptCompleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-emerald-300 shadow-2xl max-w-sm w-full p-6 text-center space-y-3 font-sans">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Grocery Checkout Cleared</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-mono">
              Thermal receipt printed with tare-deducted weights and HarvestClub loyalty reward points credited.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setReceiptCompleteModal(false)}
                className="w-full py-2 bg-emerald-800 text-white text-xs font-bold rounded-lg hover:bg-emerald-700"
              >
                Next Shopper (↵)
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
