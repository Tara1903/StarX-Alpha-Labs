"use client";

import React, { useState, useMemo } from "react";
import { DemoProductDefinition } from "../../types";
import { useDemoState } from "../../state/useDemoState";

interface BoutiqueProduct {
  id: string;
  sku: string;
  title: string;
  category: "Runway Selections" | "Ready-to-Wear" | "Leather Goods" | "The Atelier";
  collection: string;
  price: number;
  availableSizes: string[];
  colors: { name: string; hex: string }[];
  image: string;
  gallery: string[];
  fabrication: string;
  care: string;
  inStock: number;
  featured: boolean;
}

interface BagItem {
  product: BoutiqueProduct;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  customHemming?: boolean;
}

interface CustomerOrder {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: "In Atelier Preparation" | "White-Glove Dispatched" | "Delivered";
  salonViewing?: boolean;
}

interface BoutiqueState {
  products: BoutiqueProduct[];
  bag: BagItem[];
  wishlist: string[];
  orders: CustomerOrder[];
  activeCollection: string;
  activeTab?: "editorial" | "collections" | "bag" | "concierge" | "merchandising";
}

const INITIAL_PRODUCTS: BoutiqueProduct[] = [
  {
    id: "ME-BLZ-01",
    sku: "ME-W25-01",
    title: "Double-Breasted Wool-Silk Blazer",
    category: "Runway Selections",
    collection: "Spring/Summer 2025",
    price: 1250,
    availableSizes: ["FR 34", "FR 36", "FR 38", "FR 40", "FR 42"],
    colors: [
      { name: "Noir Ébène", hex: "#141414" },
      { name: "Ivoire Chaud", hex: "#F3EDE2" },
      { name: "Terre Cuite", hex: "#9E5838" },
    ],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80",
    ],
    fabrication: "100% Virgin Super 140s Wool with Hand-Stitched Silk Duchess Satin Lining",
    care: "Specialist Couture Dry Clean Only",
    inStock: 8,
    featured: true,
  },
  {
    id: "ME-SKT-02",
    sku: "ME-W25-02",
    title: "Plissé Pleated Midi Skirt",
    category: "Runway Selections",
    collection: "Spring/Summer 2025",
    price: 590,
    availableSizes: ["FR 34", "FR 36", "FR 38", "FR 40"],
    colors: [
      { name: "Terre Cuite", hex: "#9E5838" },
      { name: "Noir Ébène", hex: "#141414" },
      { name: "Sauge Poudrée", hex: "#8A9A86" },
    ],
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=700&q=80",
    ],
    fabrication: "Permanent French Sunray Accordion Pleat in Fluid Crepe de Chine",
    care: "Atelier Hand Steam & Preservation Box Included",
    inStock: 14,
    featured: true,
  },
  {
    id: "ME-BAG-03",
    sku: "ME-L25-03",
    title: "L'Écrin Structured Leather Tote",
    category: "Leather Goods",
    collection: "Permanent Essentials",
    price: 1480,
    availableSizes: ["Medium 32cm", "Grand 38cm"],
    colors: [
      { name: "Caramel Fauve", hex: "#A76B3E" },
      { name: "Noir Onyx", hex: "#111111" },
    ],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80",
    ],
    fabrication: "French Box Calfskin with Hand-Burnished Waxed Edges & Solid Brass Hardware",
    care: "Annual Complimentary Leather Conditioning at Maison Épure Salons",
    inStock: 5,
    featured: true,
  },
  {
    id: "ME-TRS-04",
    sku: "ME-W25-04",
    title: "High-Waisted Tailored Wool Trousers",
    category: "Ready-to-Wear",
    collection: "Spring/Summer 2025",
    price: 680,
    availableSizes: ["FR 34", "FR 36", "FR 38", "FR 40", "FR 42"],
    colors: [
      { name: "Ivoire Chaud", hex: "#F3EDE2" },
      { name: "Noir Ébène", hex: "#141414" },
    ],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80",
    ],
    fabrication: "Bespoke Worsted Wool Flannel with Horn Buttons & Deep Pleated Silhouette",
    care: "Professional Dry Clean Only",
    inStock: 11,
    featured: false,
  },
];

const INITIAL_STATE: BoutiqueState = {
  products: INITIAL_PRODUCTS,
  bag: [
    {
      product: INITIAL_PRODUCTS[0],
      selectedSize: "FR 38",
      selectedColor: "Noir Ébène",
      quantity: 1,
    },
    {
      product: INITIAL_PRODUCTS[1],
      selectedSize: "FR 36",
      selectedColor: "Terre Cuite",
      quantity: 1,
      customHemming: true,
    },
  ],
  wishlist: ["ME-BAG-03"],
  orders: [
    {
      id: "CMD-8812",
      date: "2025-04-18",
      items: ["Double-Breasted Wool-Silk Blazer (FR 38)"],
      total: 1250,
      status: "Delivered",
      salonViewing: false,
    },
  ],
  activeCollection: "All Collections",
};

export function MaisonEpureBoutiqueApp({
  product,
  definition,
}: {
  product?: DemoProductDefinition;
  definition?: DemoProductDefinition;
}) {
  const { state, setState, resetState } = useDemoState<BoutiqueState>(
    "maison-epure-fashion-boutique",
    INITIAL_STATE
  );

  const activeTab = state.activeTab || "editorial";
  const setActiveTab = (tab: "editorial" | "collections" | "bag" | "concierge" | "merchandising") => {
    setState((prev) => ({ ...prev, activeTab: tab }));
  };
  const [isBagOpen, setIsBagOpen] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<BoutiqueProduct | null>(null);
  const [selectedSizeMap, setSelectedSizeMap] = useState<Record<string, string>>({
    "ME-BLZ-01": "FR 38",
    "ME-SKT-02": "FR 36",
    "ME-BAG-03": "Medium 32cm",
    "ME-TRS-04": "FR 38",
  });
  const [selectedColorMap, setSelectedColorMap] = useState<Record<string, string>>({
    "ME-BLZ-01": "Noir Ébène",
    "ME-SKT-02": "Terre Cuite",
    "ME-BAG-03": "Caramel Fauve",
    "ME-TRS-04": "Ivoire Chaud",
  });
  const [notification, setNotification] = useState<string | null>(null);

  // New product form for Admin Merchandising
  const [newTitle, setNewTitle] = useState("");
  const [newSku, setNewSku] = useState("");
  const [newPrice, setNewPrice] = useState(750);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const bagSubtotal = useMemo(() => {
    return state.bag.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [state.bag]);

  const bagItemCount = useMemo(() => {
    return state.bag.reduce((count, item) => count + item.quantity, 0);
  }, [state.bag]);

  const complimentaryShippingUnlocked = bagSubtotal >= 1000;

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleAddToBag = (p: BoutiqueProduct) => {
    const size = selectedSizeMap[p.id] || p.availableSizes[0];
    const color = selectedColorMap[p.id] || p.colors[0].name;

    setState((prev) => {
      const existing = prev.bag.find(
        (b) => b.product.id === p.id && b.selectedSize === size && b.selectedColor === color
      );
      if (existing) {
        return {
          ...prev,
          bag: prev.bag.map((b) =>
            b === existing ? { ...b, quantity: b.quantity + 1 } : b
          ),
        };
      }
      return {
        ...prev,
        bag: [...prev.bag, { product: p, selectedSize: size, selectedColor: color, quantity: 1 }],
      };
    });
    setIsBagOpen(true);
    showToast(`Added ${p.title} (${size}) to your Shopping Bag.`);
  };

  const handleUpdateBagQty = (index: number, delta: number) => {
    setState((prev) => {
      const updated = prev.bag
        .map((item, idx) => {
          if (idx === index) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as BagItem[];
      return { ...prev, bag: updated };
    });
  };

  const handleToggleWishlist = (productId: string) => {
    setState((prev) => {
      const exists = prev.wishlist.includes(productId);
      const updated = exists
        ? prev.wishlist.filter((id) => id !== productId)
        : [...prev.wishlist, productId];
      showToast(exists ? "Removed from private Wishlist." : "Saved to your Private Wishlist.");
      return { ...prev, wishlist: updated };
    });
  };

  const handleCheckoutSimulation = (salonViewing: boolean = false) => {
    if (state.bag.length === 0) return;
    const orderId = `CMD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: CustomerOrder = {
      id: orderId,
      date: new Date().toISOString().split("T")[0],
      items: state.bag.map((b) => `${b.product.title} (${b.selectedSize})`),
      total: bagSubtotal,
      status: salonViewing ? "In Atelier Preparation" : "White-Glove Dispatched",
      salonViewing,
    };
    setState((prev) => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
      bag: [],
    }));
    showToast(
      salonViewing
        ? `Private Salon Viewing reserved in Paris 1er. Reference: ${orderId}`
        : `Order ${orderId} confirmed with complimentary white-glove courier.`
    );
  };

  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSku.trim()) return;

    const newProd: BoutiqueProduct = {
      id: `ME-CUSTOM-${Date.now().toString().slice(-4)}`,
      sku: newSku.trim(),
      title: newTitle.trim(),
      category: "Runway Selections",
      collection: "Spring/Summer 2025",
      price: Number(newPrice) || 850,
      availableSizes: ["FR 36", "FR 38", "FR 40"],
      colors: [
        { name: "Noir Ébène", hex: "#141414" },
        { name: "Ivoire Chaud", hex: "#F3EDE2" },
      ],
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
      ],
      fabrication: "Hand-finished Couture Tailoring by Maison Épure Atelier",
      care: "Specialist Couture Care",
      inStock: 6,
      featured: true,
    };

    setState((prev) => ({
      ...prev,
      products: [newProd, ...prev.products],
    }));
    setNewTitle("");
    setNewSku("");
    setShowAdminModal(false);
    showToast(`New boutique piece "${newProd.title}" inducted into Spring/Summer 2025 catalogue!`);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1A1C1B] font-sans flex flex-col selection:bg-[#FEDEB2] selection:text-[#1A1C1B]">
      {/* Toast Notification */}
      {notification && (
        <div className="bg-[#141414] text-[#FAF9F7] px-5 py-3 text-center text-xs font-serif tracking-widest uppercase shadow-xl flex items-center justify-center gap-3 sticky top-0 z-50 animate-fadeIn border-b border-[#FEDEB2]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FEDEB2]" />
          {notification}
        </div>
      )}

      {/* Top Banner Ribbon */}
      <div className="bg-[#141414] text-[#FAF9F7] text-[10px] tracking-widest uppercase py-2 px-4 text-center border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline text-neutral-400">Atelier Haute Couture • Paris 1er</span>
          <span className="mx-auto sm:mx-0">
            Complimentary White-Glove Courier Delivery & Private Salon Viewings
          </span>
          <button
            onClick={resetState}
            className="text-[#FEDEB2] hover:underline cursor-pointer hidden sm:inline"
          >
            Reset Atelier State
          </button>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="border-b border-[#E3E2E0] bg-[#FAF9F7]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs tracking-wider uppercase font-medium text-[#444748]">
              <button
                onClick={() => setActiveTab("editorial")}
                className={`transition-colors hover:text-black ${
                  activeTab === "editorial" ? "text-black font-bold border-b border-black pb-1" : ""
                }`}
              >
                Spring/Summer 2025
              </button>
              <button
                onClick={() => setActiveTab("collections")}
                className={`transition-colors hover:text-black ${
                  activeTab === "collections" ? "text-black font-bold border-b border-black pb-1" : ""
                }`}
              >
                Collections
              </button>
              <button
                onClick={() => setActiveTab("concierge")}
                className={`transition-colors hover:text-black ${
                  activeTab === "concierge" ? "text-black font-bold border-b border-black pb-1" : ""
                }`}
              >
                The Atelier & Concierge
              </button>
              <button
                onClick={() => setActiveTab("merchandising")}
                className={`transition-colors hover:text-black ${
                  activeTab === "merchandising" ? "text-black font-bold border-b border-black pb-1" : ""
                }`}
              >
                Merchandising Admin
              </button>
            </nav>

            {/* Brand Logo Centered */}
            <div className="text-center">
              <h1 className="font-serif text-2xl sm:text-3xl tracking-widest uppercase font-bold text-black">
                Maison Épure
              </h1>
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#747878] mt-0.5">
                Paris Haute Couture
              </p>
            </div>

            {/* Right Tools: Wishlist, Shopping Bag, Currency */}
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-xs font-mono text-[#747878]">EUR / USD</span>

              {/* Wishlist Indicator */}
              <button
                onClick={() => showToast(`You have ${state.wishlist.length} curated pieces in your Private Wishlist.`)}
                className="p-2 text-[#444748] hover:text-black relative transition-colors"
                title="Wishlist"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {state.wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#9E5838]" />
                )}
              </button>

              {/* Bag Trigger Button */}
              <button
                onClick={() => setIsBagOpen(!isBagOpen)}
                className="flex items-center gap-2 border border-black/80 px-3.5 py-2 rounded-none bg-black text-[#FAF9F7] hover:bg-neutral-800 transition-all text-xs tracking-widest uppercase font-medium shadow-sm"
              >
                <span>Shopping Bag</span>
                <span className="px-1.5 py-0.2 bg-[#FEDEB2] text-black font-bold text-[10px] rounded-none">
                  {bagItemCount}
                </span>
                <span className="hidden sm:inline font-mono ml-1">${bagSubtotal.toLocaleString()}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout (Editorial + Slide-Over Bag Drawer) */}
      <div className="flex-1 relative flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
        {/* Left Editorial Section (8 cols) */}
        <main className={`flex-1 space-y-12 transition-all duration-300 ${isBagOpen ? "lg:mr-[380px]" : ""}`}>
          {/* Active Tab: Editorial Lookbook */}
          {activeTab === "editorial" && (
            <div className="space-y-12">
              {/* Editorial Hero Campaign Frame */}
              <div className="relative bg-[#EFEEEC] border border-[#E3E2E0] overflow-hidden p-6 sm:p-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 space-y-4">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#747878] font-semibold">
                      Spring/Summer 2025 Campaign • Paris 1er
                    </span>
                    <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-black">
                      L&apos;Ombre et La Lumière
                    </h2>
                    <p className="text-xs sm:text-sm text-[#444748] leading-relaxed max-w-lg font-light">
                      Sculpted precision meeting pure fluidity. Double-faced virgin wool tailoring, hand-pleated silk crepe, and architectural leather crafted in our Parisian atelier.
                    </p>
                    <div className="pt-2 flex items-center gap-4">
                      <button
                        onClick={() => setActiveTab("collections")}
                        className="px-6 py-3 bg-black text-white text-xs tracking-widest uppercase font-medium hover:bg-neutral-800 transition-all"
                      >
                        Explore Runway Lookbook
                      </button>
                      <button
                        onClick={() => {
                          handleCheckoutSimulation(true);
                        }}
                        className="px-5 py-3 border border-black text-black text-xs tracking-widest uppercase font-medium hover:bg-black hover:text-white transition-all"
                      >
                        Reserve Private Salon
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-5 relative">
                    <div className="relative h-96 sm:h-[460px] bg-neutral-200 shadow-xl overflow-hidden border border-white">
                      <img
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
                        alt="Maison Épure Lookbook"
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md p-3 text-white text-[11px] font-serif">
                        <div className="italic">Figure 1: Sculpted Silhouettes in Repose</div>
                        <div className="text-[9px] uppercase tracking-wider text-neutral-300 font-sans mt-0.5">
                          Paris 1er Arrondissement, Printemps 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Runway Selections & New Arrivals Grid */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E3E2E0] pb-4 gap-2">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#747878]">
                      Le Vestiaire du Printemps
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-black">
                      Runway Selections & New Arrivals
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {["All Pieces", "Runway", "Leather Goods"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => showToast(`Filtered catalog to ${filter}`)}
                        className="px-3 py-1 text-[11px] uppercase tracking-wider border border-[#E3E2E0] bg-white text-[#444748] hover:text-black hover:border-black transition-colors"
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {state.products.map((p) => {
                    const currentSize = selectedSizeMap[p.id] || p.availableSizes[0];
                    const currentColor = selectedColorMap[p.id] || p.colors[0].name;
                    const inBag = state.bag.some((b) => b.product.id === p.id);
                    const isWishlisted = state.wishlist.includes(p.id);

                    return (
                      <div
                        key={p.id}
                        className="bg-white border border-[#E3E2E0] p-4 flex flex-col justify-between group hover:shadow-md transition-all"
                      >
                        <div>
                          <div className="relative h-72 bg-neutral-100 overflow-hidden mb-4">
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <button
                              onClick={() => handleToggleWishlist(p.id)}
                              className="absolute top-2.5 right-2.5 p-2 bg-white/80 backdrop-blur-sm rounded-full text-black hover:bg-white transition-all shadow-sm"
                              title="Save to Wishlist"
                            >
                              <svg
                                className={`w-4 h-4 ${isWishlisted ? "fill-[#9E5838] text-[#9E5838]" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            <span className="absolute bottom-2.5 left-2.5 bg-black/70 text-white text-[9px] uppercase tracking-widest px-2 py-0.5">
                              {p.category}
                            </span>
                          </div>

                          <div className="flex items-baseline justify-between mb-1">
                            <div>
                              <h4 className="font-serif text-base text-black group-hover:underline">
                                {p.title}
                              </h4>
                              <span className="font-mono text-[10px] text-[#747878]">{p.sku}</span>
                            </div>
                            <span className="font-mono text-sm font-semibold text-black">
                              ${p.price.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#747878] mb-3 line-clamp-1">
                            {p.fabrication}
                          </p>

                          {/* Color Swatch Selectors */}
                          <div className="mb-3">
                            <div className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 flex justify-between">
                              <span>Color: {currentColor}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {p.colors.map((c) => (
                                <button
                                  key={c.name}
                                  onClick={() =>
                                    setSelectedColorMap((prev) => ({ ...prev, [p.id]: c.name }))
                                  }
                                  style={{ backgroundColor: c.hex }}
                                  className={`w-5 h-5 rounded-full border transition-all ${
                                    currentColor === c.name
                                      ? "ring-2 ring-black ring-offset-1 border-transparent scale-110"
                                      : "border-neutral-300 opacity-80 hover:opacity-100"
                                  }`}
                                  title={c.name}
                                />
                              ))}
                            </div>
                          </div>

                          {/* French Sizing Selectors */}
                          <div className="mb-4">
                            <div className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 flex justify-between">
                              <span>Size</span>
                              <span className="text-[#9E5838] underline cursor-pointer" onClick={() => showToast("Size Consultation: True French Haute Couture sizing. Order regular size.")}>
                                Size Guide
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {p.availableSizes.map((sz) => (
                                <button
                                  key={sz}
                                  onClick={() =>
                                    setSelectedSizeMap((prev) => ({ ...prev, [p.id]: sz }))
                                  }
                                  className={`px-2 py-1 text-[10px] border transition-all ${
                                    currentSize === sz
                                      ? "bg-black text-white border-black"
                                      : "border-[#E3E2E0] bg-white text-[#444748] hover:border-black"
                                  }`}
                                >
                                  {sz}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleAddToBag(p)}
                          className={`w-full py-2.5 text-xs tracking-widest uppercase font-medium transition-all flex items-center justify-center gap-2 ${
                            inBag
                              ? "bg-[#FEDEB2] text-black border border-[#C5A880] hover:bg-[#fedeb2]/80"
                              : "bg-black text-white hover:bg-neutral-800"
                          }`}
                        >
                          {inBag ? "Added to Bag" : "Add to Shopping Bag"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Atelier Tailoring Craftsmanship Feature */}
              <div className="p-8 border border-[#E3E2E0] bg-white grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#747878] font-semibold">
                    L&apos;Artisanat & Le Savoir-Faire
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-black">
                    Quiet Construction & Invisible Artistry
                  </h3>
                  <p className="text-xs text-[#444748] leading-relaxed">
                    Maison Épure strips away transient decoration to concentrate exclusively on the tactile soul of the fabric. Each seam is bound by hand; lapels and hems are pressed with iron and wet canvas to yield an organic roll, and all linings are hand-felled.
                  </p>
                  <div className="flex items-center gap-6 pt-2 text-xs">
                    <div>
                      <div className="font-serif text-xl font-bold text-black">48 hrs</div>
                      <div className="text-[10px] text-[#747878] uppercase">Artisanal Hand Assembly</div>
                    </div>
                    <div>
                      <div className="font-serif text-xl font-bold text-black">100%</div>
                      <div className="text-[10px] text-[#747878] uppercase">Single-Origin Fibers</div>
                    </div>
                  </div>
                </div>

                <div className="h-64 bg-neutral-100 overflow-hidden border border-[#E3E2E0]">
                  <img
                    src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=80"
                    alt="Atelier Craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Active Tab: Collections */}
          {activeTab === "collections" && (
            <div className="space-y-8 bg-white p-6 border border-[#E3E2E0]">
              <div className="border-b border-[#E3E2E0] pb-4">
                <span className="text-[10px] tracking-widest uppercase text-[#747878]">Archives & Horizons</span>
                <h3 className="font-serif text-3xl text-black mt-1">Maison Épure Collections</h3>
                <p className="text-xs text-[#747878] mt-1">
                  Curated seasonal chapters released strictly in numbered atelier editions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Spring/Summer 2025: L'Ombre",
                    pieces: 18,
                    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
                    desc: "Sculptural tailoring in summer-weight virgin wool and washed silk organza.",
                  },
                  {
                    title: "The Permanent Archive",
                    pieces: 12,
                    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
                    desc: "Timeless trench coats, box calfskin leather goods, and cashmere knits.",
                  },
                  {
                    title: "Atelier Soirée Capsule",
                    pieces: 8,
                    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
                    desc: "Evening garments with subtle duchess satin insets and hand-embroidered hems.",
                  },
                ].map((col, idx) => (
                  <div key={idx} className="border border-[#E3E2E0] bg-[#FAF9F7] p-4 space-y-3">
                    <div className="h-52 bg-neutral-200 overflow-hidden">
                      <img src={col.image} alt={col.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-xs font-bold text-black font-serif">{col.title}</div>
                    <p className="text-[11px] text-[#747878] leading-relaxed">{col.desc}</p>
                    <div className="text-[10px] font-mono text-[#9E5838] uppercase">
                      {col.pieces} Numbered Editions
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Tab: Concierge & Customer Orders */}
          {activeTab === "concierge" && (
            <div className="bg-white p-6 border border-[#E3E2E0] space-y-8">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#747878]">Haute Clienteling</span>
                <h3 className="font-serif text-3xl text-black mt-1">Private Client Concierge</h3>
                <p className="text-xs text-[#747878] mt-1">
                  Bespoke appointments, atelier alterations, and private order histories.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 border border-[#E3E2E0] bg-[#FAF9F7] space-y-3">
                  <h4 className="font-serif text-base font-bold text-black">Private Salon Appointment</h4>
                  <p className="text-xs text-[#444748] leading-relaxed">
                    Reserve a private fitting room at 18 Place Vendôme, Paris or 72 Madison Ave, New York with our Master Tailor and head of clienteling.
                  </p>
                  <button
                    onClick={() => handleCheckoutSimulation(true)}
                    className="px-4 py-2 bg-black text-white text-xs tracking-wider uppercase font-medium hover:bg-neutral-800"
                  >
                    Schedule Salon Fitting
                  </button>
                </div>

                <div className="p-5 border border-[#E3E2E0] bg-[#FAF9F7] space-y-3">
                  <h4 className="font-serif text-base font-bold text-black">Complimentary Alteration Protocol</h4>
                  <p className="text-xs text-[#444748] leading-relaxed">
                    Every ready-to-wear garment includes complimentary hem adjustment and sleeve tailoring within 90 days of acquisition.
                  </p>
                  <button
                    onClick={() => showToast("Alteration request opened with Maison Épure Atelier concierge.")}
                    className="px-4 py-2 border border-black text-black text-xs tracking-wider uppercase font-medium hover:bg-black hover:text-white"
                  >
                    Request Alteration Courier
                  </button>
                </div>
              </div>

              {/* Order History */}
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-black">Client Acquisition Ledger</h4>
                <div className="border border-[#E3E2E0] divide-y divide-[#E3E2E0]">
                  {state.orders.map((o) => (
                    <div key={o.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="font-mono font-bold text-black">{o.id} • {o.date}</div>
                        <div className="text-[#444748] mt-0.5">{o.items.join(", ")}</div>
                        {o.salonViewing && (
                          <span className="text-[10px] text-[#9E5838] font-serif italic">
                            Reserved for Private Salon Viewing (Paris 1er)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold">${o.total.toLocaleString()}</span>
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] uppercase tracking-wider font-semibold">
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active Tab: Merchandising Admin */}
          {activeTab === "merchandising" && (
            <div className="bg-white p-6 border border-[#E3E2E0] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E3E2E0] pb-4">
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-[#747878]">Boutique Operations</span>
                  <h3 className="font-serif text-2xl text-black">Merchandising & Inventory Administration</h3>
                  <p className="text-xs text-[#747878] mt-0.5">
                    Manage seasonal runway pieces, stock levels, and couture pricing tiers.
                  </p>
                </div>
                <button
                  onClick={() => setShowAdminModal(true)}
                  className="px-4 py-2.5 bg-black text-white text-xs tracking-wider uppercase font-medium hover:bg-neutral-800 self-start sm:self-auto"
                >
                  Induct New Atelier Piece
                </button>
              </div>

              {/* Product inventory list */}
              <div className="border border-[#E3E2E0] overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F7] border-b border-[#E3E2E0] text-[#747878] uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">SKU</th>
                      <th className="py-2.5 px-3">Piece Title</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3 text-right">Price</th>
                      <th className="py-2.5 px-3 text-center">Atelier Stock</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E3E2E0]">
                    {state.products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF9F7]">
                        <td className="py-3 px-3 font-mono font-bold text-black">{p.sku}</td>
                        <td className="py-3 px-3 font-medium text-black">{p.title}</td>
                        <td className="py-3 px-3 text-[#747878]">{p.category}</td>
                        <td className="py-3 px-3 text-right font-mono font-bold">${p.price.toLocaleString()}</td>
                        <td className="py-3 px-3 text-center font-mono">
                          <span className={`px-2 py-0.5 text-[10px] ${p.inStock < 10 ? "text-amber-800 bg-amber-50" : "text-emerald-800 bg-emerald-50"}`}>
                            {p.inStock} units
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-black text-white font-semibold">
                            Active Runway
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>

        {/* Right Slide-Over Shopping Bag Drawer (Fixed on desktop when open) */}
        {isBagOpen && (
          <aside className="w-full lg:w-[380px] bg-white border border-[#E3E2E0] p-6 shadow-xl flex flex-col justify-between shrink-0 lg:fixed lg:top-24 lg:right-6 lg:bottom-6 lg:overflow-y-auto z-40">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E3E2E0]">
                <div>
                  <h3 className="font-serif text-lg font-bold text-black flex items-center gap-2">
                    <span>Shopping Bag</span>
                    <span className="text-xs font-mono font-normal text-[#747878]">
                      ({bagItemCount} items)
                    </span>
                  </h3>
                  <span className="text-[9px] tracking-widest uppercase text-[#9E5838] font-semibold">
                    Private Salons Tier
                  </span>
                </div>
                <button
                  onClick={() => setIsBagOpen(false)}
                  className="p-1.5 text-[#747878] hover:text-black cursor-pointer"
                  title="Close Bag"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Complimentary White-Glove Courier Delivery Progress */}
              <div className="p-3 bg-[#FAF9F7] border border-[#E3E2E0] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-medium text-black">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Complimentary White-Glove Courier
                  </span>
                  <span className="font-mono font-bold">
                    ${bagSubtotal.toLocaleString()} / $1,000
                  </span>
                </div>
                <div className="w-full h-1 bg-[#E3E2E0] overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-500"
                    style={{ width: `${Math.min(100, (bagSubtotal / 1000) * 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-[#747878]">
                  {complimentaryShippingUnlocked
                    ? "Unlocked: Dedicated courier delivery to your private residence."
                    : `Add $${(1000 - bagSubtotal).toLocaleString()} to unlock complimentary courier delivery.`}
                </p>
              </div>

              {/* Bag Items List */}
              {state.bag.length === 0 ? (
                <div className="text-center py-12 text-[#747878] space-y-2">
                  <p className="font-serif text-sm">Your shopping bag is currently empty.</p>
                  <p className="text-[11px]">Explore the Spring/Summer 2025 lookbook to curate pieces.</p>
                </div>
              ) : (
                <div className="space-y-4 divide-y divide-[#E3E2E0]">
                  {state.bag.map((item, idx) => (
                    <div key={idx} className="pt-4 first:pt-0 space-y-2">
                      <div className="flex gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-16 h-20 object-cover border border-[#E3E2E0] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between">
                            <h4 className="font-serif text-xs font-bold text-black truncate">
                              {item.product.title}
                            </h4>
                            <span className="font-mono text-xs font-bold ml-2">
                              ${(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-[10px] text-[#747878] mt-0.5">
                            Size: <span className="font-semibold text-black">{item.selectedSize}</span> • Color: <span className="font-semibold text-black">{item.selectedColor}</span>
                          </div>
                          <p className="text-[9px] text-[#747878] truncate mt-0.5">
                            {item.product.fabrication}
                          </p>

                          {/* Quantity and Remove */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-[#E3E2E0]">
                              <button
                                onClick={() => handleUpdateBagQty(idx, -1)}
                                className="px-2 py-0.5 text-xs text-[#747878] hover:text-black font-mono"
                              >
                                -
                              </button>
                              <span className="px-2 py-0.5 text-[11px] font-mono font-bold text-black">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateBagQty(idx, 1)}
                                className="px-2 py-0.5 text-xs text-[#747878] hover:text-black font-mono"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => handleUpdateBagQty(idx, -item.quantity)}
                              className="text-[10px] text-[#747878] hover:text-rose-600 uppercase tracking-wider"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Boutique Packaging Callout */}
              <div className="p-3 bg-[#FAF9F7] border border-[#E3E2E0] text-[10px] text-[#444748] space-y-1">
                <div className="font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#9E5838]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Boutique Presentation Included
                </div>
                <p>
                  Delivered in heavy linen keepsake box with embossed archival parchment and cedar moth-protection rings.
                </p>
              </div>
            </div>

            {/* Bag Footer with Totals and Checkout */}
            <div className="pt-6 border-t border-[#E3E2E0] space-y-3 mt-6">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#747878]">
                  <span>Subtotal:</span>
                  <span className="font-mono text-black font-bold">${bagSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#747878]">
                  <span>White-Glove Courier Delivery:</span>
                  <span className="font-mono text-emerald-800 font-bold uppercase text-[10px]">
                    Complimentary
                  </span>
                </div>
                <div className="flex justify-between text-[#747878]">
                  <span>Boutique Signature Packaging:</span>
                  <span className="text-[10px] text-black">Included</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-black pt-2 border-t border-[#E3E2E0]">
                  <span>Estimated Total:</span>
                  <span className="font-mono">${bagSubtotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleCheckoutSimulation(false)}
                  disabled={state.bag.length === 0}
                  className={`w-full py-3 text-xs tracking-widest uppercase font-medium transition-all shadow-md flex items-center justify-center gap-2 ${
                    state.bag.length > 0
                      ? "bg-black text-white hover:bg-neutral-800"
                      : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  VIP Private Client Checkout
                </button>

                <button
                  onClick={() => handleCheckoutSimulation(true)}
                  disabled={state.bag.length === 0}
                  className="w-full py-2.5 border border-black text-black hover:bg-black hover:text-white transition-all text-xs tracking-widest uppercase font-medium"
                >
                  Reserve Private Salon Viewing
                </button>
              </div>

              <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-[#747878] pt-2">
                <span>Insured Courier</span>
                <span>•</span>
                <span>30-Day Global Returns</span>
                <span>•</span>
                <span>Bespoke Monogramming</span>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Admin Merchandising Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-300 w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E3E2E0] pb-3">
              <h4 className="font-serif text-lg font-bold text-black">Induct New Atelier Piece</h4>
              <button
                onClick={() => setShowAdminModal(false)}
                className="text-neutral-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-black mb-1">
                  Piece Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sculpted Silk Organza Trench"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full p-2 border border-[#E3E2E0] bg-[#FAF9F7] text-black focus:outline-none focus:border-black font-serif"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-black mb-1">
                    Atelier SKU
                  </label>
                  <input
                    type="text"
                    placeholder="ME-W25-99"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    required
                    className="w-full p-2 border border-[#E3E2E0] bg-[#FAF9F7] font-mono text-black focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-black mb-1">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    min={100}
                    required
                    className="w-full p-2 border border-[#E3E2E0] bg-[#FAF9F7] font-mono text-black focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="px-4 py-2 border border-[#E3E2E0] text-black uppercase tracking-wider text-[10px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white uppercase tracking-wider text-[10px] font-semibold hover:bg-neutral-800"
                >
                  Save Piece to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Bottom Navigation Strip */}
      <div className="border-t border-[#E3E2E0] bg-[#FAF9F7] py-4 text-xs text-[#747878] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-[11px]">
            <span className="font-serif font-bold text-black">Maison Épure Paris</span>
            <span>•</span>
            <span>18 Place Vendôme, 75001 Paris</span>
            <span>•</span>
            <span>Atelier Clienteling: +33 1 42 68 00 00</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider">
            <button
              onClick={() => setActiveTab("merchandising")}
              className="text-black font-semibold hover:underline"
            >
              Curate Collection & Live Stock
            </button>
            <span>•</span>
            <button
              onClick={() => showToast("Client authentication verified for Private Salon viewing.")}
              className="hover:text-black"
            >
              Client VIP Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaisonEpureBoutiqueApp;
