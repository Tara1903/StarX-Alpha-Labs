"use client";

import React, { useState, useMemo } from "react";
import { DemoProductDefinition } from "../../types";
import { useDemoState } from "../../state/useDemoState";
import {
  ShoppingBag,
  Heart,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Package,
  Layers,
  Sparkles,
  ArrowRight,
  X,
  CreditCard,
  DollarSign,
  TrendingUp,
  Tag,
  ExternalLink,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface ProductItem {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  category: "Headphones" | "Spatial Audio" | "Acoustics" | "Accessories";
  priceUsd: number;
  originalPriceUsd?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  variants: Array<{ name: string; hex: string }>;
  specs: {
    drivers: string;
    battery: string;
    dac: string;
    soundstage: string;
  };
  mainImage: string;
  galleryImages: string[];
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  variant: string;
  unitPriceUsd: number;
  quantity: number;
  image: string;
}

interface OrderRecord {
  orderNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  itemsSummary: string;
  totalUsd: number;
  status: "Pending Processing" | "Dispatched" | "In Transit" | "Delivered";
  trackingCarrier: string;
}

interface PromoCode {
  code: string;
  discountPercentage: number;
  description: string;
}

interface AuraStorefrontState {
  merchantMode: boolean;
  activeCollection: string;
  searchFilter: string;
  featuredProductId: string;
  selectedVariant: string;
  activeGalleryIndex: number;
  wishlistIds: string[];
  cart: CartItem[];
  appliedPromo: string;
  products: ProductItem[];
  orders: OrderRecord[];
  promos: PromoCode[];
}

const STOREFRONT_SEED: AuraStorefrontState = {
  merchantMode: false,
  activeCollection: "Headphones",
  searchFilter: "",
  featuredProductId: "aura-studio-pro",
  selectedVariant: "Midnight Titanium",
  activeGalleryIndex: 0,
  wishlistIds: ["aura-soundbase-1"],
  cart: [
    {
      id: "cart-1",
      productId: "aura-wave-anc",
      name: "Aura Wave Wireless ANC",
      variant: "Matte Polar",
      unitPriceUsd: 189.0,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "cart-2",
      productId: "aura-desk-stand",
      name: "Aura Magnetic Desktop Stand",
      variant: "Brushed Titanium",
      unitPriceUsd: 60.0,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
    },
  ],
  appliedPromo: "LAUNCH20",
  promos: [
    { code: "LAUNCH20", discountPercentage: 20, description: "Launch Campaign 20% Off Storewide" },
    { code: "STUDIO10", discountPercentage: 10, description: "Audio Engineer Guild 10% Off" },
  ],
  products: [
    {
      id: "aura-studio-pro",
      sku: "AUR-STP-01",
      name: "Aura Studio Master Pro",
      subtitle: "Pure acoustic fidelity calibrated for master audio engineers and discerning audiophiles.",
      category: "Headphones",
      priceUsd: 349.0,
      originalPriceUsd: 420.0,
      rating: 4.9,
      reviewsCount: 842,
      stock: 142,
      variants: [
        { name: "Midnight Titanium", hex: "#1E293B" },
        { name: "Matte Polar", hex: "#E2E8F0" },
        { name: "Cognac Leather", hex: "#9A3412" },
      ],
      specs: {
        drivers: "50mm Beryllium Planar Magnetic",
        battery: "68hr Ultra Playback (15m=9hr)",
        dac: "Lossless 384kHz / 32-bit Ultra-Low Latency",
        soundstage: "Acoustic Chamber Spatial Calibration",
      },
      mainImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
      ],
    },
    {
      id: "aura-wave-anc",
      sku: "AUR-WAV-02",
      name: "Aura Wave Wireless ANC",
      subtitle: "Adaptive active noise cancellation with ultra-light carbon-fiber composite headband.",
      category: "Headphones",
      priceUsd: 189.0,
      originalPriceUsd: 229.0,
      rating: 4.8,
      reviewsCount: 512,
      stock: 84,
      variants: [
        { name: "Matte Polar", hex: "#E2E8F0" },
        { name: "Deep Charcoal", hex: "#334155" },
      ],
      specs: {
        drivers: "40mm Titanium Composite Dome",
        battery: "45hr ANC Active Playback",
        dac: "Hi-Res LDAC / aptX HD Wireless",
        soundstage: "Dynamic Ear-Canal Pressure Relieving",
      },
      mainImage: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
      galleryImages: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80"],
    },
    {
      id: "aura-soundbase-1",
      sku: "AUR-DAC-11",
      name: "Aura Soundbase One",
      subtitle: "Dual ESS Sabre Pro DAC architecture with balanced 4.4mm and XLR audio outputs.",
      category: "Acoustics",
      priceUsd: 199.0,
      rating: 4.9,
      reviewsCount: 312,
      stock: 46,
      variants: [{ name: "Anodized Black", hex: "#0F172A" }],
      specs: {
        drivers: "Dual ESS 9038Q2M SABRE DAC",
        battery: "Mains Powered / Clean Linear Supply",
        dac: "PCM 768kHz / DSD512 Native",
        soundstage: "Pure Class-A Discrete Amp Topology",
      },
      mainImage: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&auto=format&fit=crop&q=80",
      galleryImages: ["https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&auto=format&fit=crop&q=80"],
    },
    {
      id: "aura-purewool-cable",
      sku: "AUR-CBL-04",
      name: "PureWool Braided Cable",
      subtitle: "4.4mm balanced oxygen-free monocrystalline copper with artisanal Nordic wool sleeve.",
      category: "Accessories",
      priceUsd: 79.0,
      rating: 5.0,
      reviewsCount: 184,
      stock: 210,
      variants: [{ name: "Nordic Oatmeal", hex: "#D6D3D1" }],
      specs: {
        drivers: "8-Core 6N OCC Monocrystalline",
        battery: "Passive Cable",
        dac: "Gold-Plated 4.4mm Pentaconn",
        soundstage: "Zero Microphonics Cloth Weave",
      },
      mainImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80",
      galleryImages: ["https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80"],
    },
  ],
  orders: [
    {
      orderNumber: "ORD-AUR-9941",
      date: "Today, 11:24 AM",
      customerName: "Julian Vance",
      customerEmail: "julian.vance@studioharmonics.io",
      shippingAddress: "42 Bleeker St, Suite 402, New York, NY",
      itemsSummary: "Aura Studio Master Pro (Midnight Titanium) x1",
      totalUsd: 279.2,
      status: "Dispatched",
      trackingCarrier: "FedEx Priority Express #9928104812",
    },
    {
      orderNumber: "ORD-AUR-9938",
      date: "Today, 09:15 AM",
      customerName: "Elena Rostova",
      customerEmail: "elena@acoustics-lab.se",
      shippingAddress: "Birger Jarlsgatan 18, Stockholm, Sweden",
      itemsSummary: "Aura Soundbase One x1, PureWool Cable x1",
      totalUsd: 278.0,
      status: "In Transit",
      trackingCarrier: "DHL Global Air #4491028391",
    },
  ],
};

export function AuraDirectEcommerceApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState } = useDemoState<AuraStorefrontState>(product.slug, STOREFRONT_SEED);

  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [orderConfirmationNumber, setOrderConfirmationNumber] = useState<string | null>(null);

  // New Product form state
  const [newProductForm, setNewProductForm] = useState({
    name: "",
    sku: "",
    category: "Headphones" as const,
    price: "249.00",
    stock: "50",
    subtitle: "Artisanal precision-tuned acoustic transducer.",
  });

  // Active featured product
  const featured = useMemo(() => {
    return state.products.find((p) => p.id === state.featuredProductId) || state.products[0];
  }, [state.products, state.featuredProductId]);

  // Cart calculations
  const rawSubtotal = useMemo(() => {
    return state.cart.reduce((sum, item) => sum + item.unitPriceUsd * item.quantity, 0);
  }, [state.cart]);

  const discountAmount = useMemo(() => {
    const promo = state.promos.find((p) => p.code === state.appliedPromo);
    if (!promo) return 0;
    return (rawSubtotal * promo.discountPercentage) / 100;
  }, [rawSubtotal, state.appliedPromo, state.promos]);

  const finalSubtotal = Math.max(0, rawSubtotal - discountAmount);
  const estimatedTax = finalSubtotal * 0.0625;
  const shippingFee = finalSubtotal > 150 ? 0 : 15.0;
  const grandTotal = finalSubtotal + estimatedTax + shippingFee;

  // Free shipping meter threshold
  const freeShippingThreshold = 200;
  const distanceToFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);
  const shippingProgressPct = Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100));

  // Handlers
  const handleAddToCart = (item: ProductItem, variant: string) => {
    const existingIndex = state.cart.findIndex((c) => c.productId === item.id && c.variant === variant);
    if (existingIndex >= 0) {
      setState((prev) => ({
        ...prev,
        cart: prev.cart.map((c, i) => (i === existingIndex ? { ...c, quantity: c.quantity + 1 } : c)),
      }));
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        productId: item.id,
        name: item.name,
        variant,
        unitPriceUsd: item.priceUsd,
        quantity: 1,
        image: item.mainImage,
      };
      setState((prev) => ({
        ...prev,
        cart: [newItem, ...prev.cart],
      }));
    }
    setIsBagOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart
        .map((c) => {
          if (c.id === cartId) {
            const nextQty = c.quantity + delta;
            return nextQty > 0 ? { ...c, quantity: nextQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[],
    }));
  };

  const handleRemoveFromCart = (cartId: string) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((c) => c.id !== cartId),
    }));
  };

  const handleToggleWishlist = (productId: string) => {
    setState((prev) => ({
      ...prev,
      wishlistIds: prev.wishlistIds.includes(productId)
        ? prev.wishlistIds.filter((id) => id !== productId)
        : [...prev.wishlistIds, productId],
    }));
  };

  const handleExecuteCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.cart.length === 0) return;

    const ordNumber = `ORD-AUR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderRecord = {
      orderNumber: ordNumber,
      date: "Just now",
      customerName: "Verified VIP Guest",
      customerEmail: "guest.patron@aura-direct.com",
      shippingAddress: "740 Park Ave, New York, NY 10021",
      itemsSummary: state.cart.map((c) => `${c.name} (${c.variant}) x${c.quantity}`).join(", "),
      totalUsd: grandTotal,
      status: "Pending Processing",
      trackingCarrier: "FedEx Express Priority #PENDING",
    };

    setState((prev) => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
      cart: [],
    }));

    setIsCheckoutModalOpen(false);
    setIsBagOpen(false);
    setOrderConfirmationNumber(ordNumber);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.sku) return;

    const newProd: ProductItem = {
      id: `prod-${Date.now()}`,
      sku: newProductForm.sku.toUpperCase(),
      name: newProductForm.name,
      subtitle: newProductForm.subtitle,
      category: newProductForm.category,
      priceUsd: parseFloat(newProductForm.price) || 199.0,
      rating: 5.0,
      reviewsCount: 1,
      stock: parseInt(newProductForm.stock, 10) || 50,
      variants: [{ name: "Obsidian Edition", hex: "#0F172A" }],
      specs: {
        drivers: "Artisanal Custom Acoustic Transducer",
        battery: "50hr High-Endurance",
        dac: "Hi-Res Certified 24-bit/192kHz",
        soundstage: "Studio Reference Neutral",
      },
      mainImage: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
      galleryImages: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80"],
    };

    setState((prev) => ({
      ...prev,
      products: [newProd, ...prev.products],
    }));

    setIsAddProductModalOpen(false);
    setNewProductForm({
      name: "",
      sku: "",
      category: "Headphones",
      price: "249.00",
      stock: "50",
      subtitle: "Artisanal precision-tuned acoustic transducer.",
    });
  };

  return (
    <div className="min-h-screen bg-[#111319] text-[#E1E2EA] flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top DTC Header Navigation */}
      <header className="bg-[#0B0E13] border-b border-[#272A30] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40 shadow-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#F2CA50] to-[#E9C349] text-stone-950 flex items-center justify-center font-bold font-mono text-sm shadow-md">
              A
            </div>
            <div>
              <span className="font-extrabold text-base tracking-wider uppercase text-white font-mono">
                AURA DIRECT
              </span>
              <span className="text-[10px] text-stone-400 block font-mono">Nordic Acoustic Flagship</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-stone-300">
            {["New Releases", "Headphones", "Spatial Audio", "Acoustics", "Collections"].map((link) => (
              <button
                key={link}
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    activeCollection: link,
                    merchantMode: false,
                  }))
                }
                className={`hover:text-[#F2CA50] transition-colors ${
                  state.activeCollection === link && !state.merchantMode ? "text-[#F2CA50] font-bold" : ""
                }`}
              >
                {link}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Search bar simulation */}
          <div className="relative hidden sm:block">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search studio acoustics..."
              value={state.searchFilter}
              onChange={(e) => setState((prev) => ({ ...prev, searchFilter: e.target.value }))}
              className="pl-8 pr-3 py-1.5 text-xs rounded-full bg-[#1D2025] border border-[#32353B] text-white focus:outline-none focus:border-[#F2CA50] w-48"
            />
          </div>

          {/* Mode Switcher Pill */}
          <button
            onClick={() => setState((prev) => ({ ...prev, merchantMode: !prev.merchantMode }))}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              state.merchantMode
                ? "bg-[#F2CA50] text-stone-950 border border-[#F2CA50]"
                : "bg-[#1D2025] text-stone-300 hover:text-white border border-[#32353B]"
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>{state.merchantMode ? "Merchant Mode (Active)" : "Switch to Merchant Admin"}</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => handleToggleWishlist(featured.id)}
            className="p-2 rounded-lg bg-[#1D2025] border border-[#32353B] hover:text-[#F2CA50] text-stone-300 relative transition-colors"
            title="Wishlist"
          >
            <Heart
              className={`w-4 h-4 ${
                state.wishlistIds.includes(featured.id) ? "fill-[#F2CA50] text-[#F2CA50]" : ""
              }`}
            />
            {state.wishlistIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F2CA50] text-stone-950 font-mono text-[9px] font-bold flex items-center justify-center">
                {state.wishlistIds.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Trigger */}
          <button
            onClick={() => setIsBagOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F2CA50] hover:bg-[#D4AF37] text-stone-950 font-bold text-xs shadow-md transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="font-mono">
              ${grandTotal.toFixed(2)} • {state.cart.reduce((a, b) => a + b.quantity, 0)} items
            </span>
          </button>

          {/* Reset button */}
          <button
            onClick={() => resetState()}
            className="p-2 rounded-lg border border-[#32353B] text-stone-400 hover:text-white transition-colors"
            title="Reset Store Data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 p-4 sm:p-6 max-w-[1600px] w-full mx-auto min-w-0">
        {/* VIEW 1: CUSTOMER-FACING STOREFRONT */}
        {!state.merchantMode ? (
          <div className="space-y-8 min-w-0">
            {/* Hero Merchandising Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#191C21] rounded-3xl p-6 sm:p-8 border border-[#272A30] shadow-2xl min-w-0">
              {/* Left Column: Product Visuals & Thumbnails */}
              <div className="lg:col-span-6 space-y-4 min-w-0">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-black/40 border border-[#32353B]">
                  <img
                    src={featured.galleryImages[state.activeGalleryIndex] || featured.mainImage}
                    alt={featured.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-[#F2CA50] border border-[#F2CA50]/30 font-bold">
                    REFERENCE STANDARD
                  </div>
                </div>

                {/* Gallery thumbnails */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {featured.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setState((prev) => ({ ...prev, activeGalleryIndex: idx }))}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        state.activeGalleryIndex === idx
                          ? "border-[#F2CA50] ring-2 ring-[#F2CA50]/30"
                          : "border-[#32353B] opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Merchandising Details & Buy Box */}
              <div className="lg:col-span-6 space-y-5 min-w-0">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#F2CA50]">
                    STUDIO SERIES • REFERENCE TIER
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{featured.name}</h1>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">{featured.subtitle}</p>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center text-[#F2CA50]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F2CA50]" />
                    ))}
                  </div>
                  <span className="font-bold text-white">{featured.rating} / 5.0</span>
                  <span className="text-stone-500">({featured.reviewsCount} verified studio reviews)</span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-mono font-bold text-white">${featured.priceUsd.toFixed(2)}</span>
                  {featured.originalPriceUsd && (
                    <span className="text-base font-mono text-stone-500 line-through">
                      ${featured.originalPriceUsd.toFixed(2)}
                    </span>
                  )}
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                    IN STOCK • SHIPS TODAY
                  </span>
                </div>

                {/* Tech Specs Matrix */}
                <div className="grid grid-cols-2 gap-2 bg-[#12141A] p-3 rounded-2xl border border-[#272A30] text-xs">
                  <div>
                    <span className="text-[10px] text-stone-500 block">Acoustic Drivers</span>
                    <strong className="text-stone-200">{featured.specs.drivers}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 block">Battery Life</span>
                    <strong className="text-stone-200">{featured.specs.battery}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 block">DAC Processor</span>
                    <strong className="text-stone-200">{featured.specs.dac}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 block">Spatial Acoustics</span>
                    <strong className="text-stone-200">{featured.specs.soundstage}</strong>
                  </div>
                </div>

                {/* Variant Finish Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-stone-400 block">
                    Finish: <strong className="text-white">{state.selectedVariant}</strong>
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {featured.variants.map((v) => (
                      <button
                        key={v.name}
                        onClick={() => setState((prev) => ({ ...prev, selectedVariant: v.name }))}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          state.selectedVariant === v.name
                            ? "border-[#F2CA50] bg-[#F2CA50]/10 text-white font-bold"
                            : "border-[#32353B] text-stone-400 hover:text-white"
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: v.hex }} />
                        <span>{v.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Bag CTA */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => handleAddToCart(featured, state.selectedVariant)}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#F2CA50] hover:bg-[#D4AF37] text-stone-950 font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag — ${featured.priceUsd.toFixed(2)}</span>
                  </button>
                  <button
                    onClick={() => handleToggleWishlist(featured.id)}
                    className="p-3.5 rounded-xl border border-[#32353B] hover:border-[#F2CA50] text-stone-300 hover:text-[#F2CA50] transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        state.wishlistIds.includes(featured.id) ? "fill-[#F2CA50] text-[#F2CA50]" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Complementary Studio Gear Catalog Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Complementary Studio Gear</h2>
                  <p className="text-xs text-stone-400">Engineered to integrate seamlessly with the Aura ecosystem.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-0">
                {state.products
                  .filter((p) => p.id !== state.featuredProductId)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="bg-[#191C21] rounded-2xl border border-[#272A30] p-4 flex flex-col justify-between space-y-3 hover:border-stone-600 transition-all shadow-md"
                    >
                      <div className="space-y-2">
                        <div className="aspect-16/9 rounded-xl overflow-hidden bg-black/40 border border-[#32353B]">
                          <img src={p.mainImage} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-start justify-between gap-2 pt-1">
                          <div>
                            <span className="text-[10px] font-mono text-[#F2CA50] uppercase">{p.category}</span>
                            <h3 className="font-bold text-sm text-white">{p.name}</h3>
                          </div>
                          <span className="font-mono font-bold text-sm text-stone-200">${p.priceUsd.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-stone-400 line-clamp-2">{p.subtitle}</p>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-[#272A30]">
                        <button
                          onClick={() => handleAddToCart(p, p.variants[0]?.name || "Standard")}
                          className="flex-1 py-2 px-3 rounded-lg bg-[#272A30] hover:bg-[#F2CA50] hover:text-stone-950 text-white font-bold text-xs transition-colors"
                        >
                          + Add to Bag
                        </button>
                        <button
                          onClick={() =>
                            setState((prev) => ({
                              ...prev,
                              featuredProductId: p.id,
                              selectedVariant: p.variants[0]?.name || "Standard",
                              activeGalleryIndex: 0,
                            }))
                          }
                          className="py-2 px-3 rounded-lg border border-[#32353B] text-stone-400 hover:text-white text-xs font-mono"
                        >
                          Inspect
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          /* VIEW 2: MERCHANT OPERATIONS ADMIN PORTAL */
          <div className="space-y-6 min-w-0">
            {/* Top Merchant KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#191C21] p-4 rounded-2xl border border-[#272A30] space-y-1">
                <span className="text-[10px] font-mono text-stone-400 uppercase">Gross Merchandise Value</span>
                <div className="flex items-baseline justify-between">
                  <strong className="text-2xl font-mono text-white">$48,290.00</strong>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +14.2%
                  </span>
                </div>
                <p className="text-[10px] text-stone-500">Live 24h Settlement Gateway</p>
              </div>

              <div className="bg-[#191C21] p-4 rounded-2xl border border-[#272A30] space-y-1">
                <span className="text-[10px] font-mono text-stone-400 uppercase">Order Fulfillment SLA</span>
                <div className="flex items-baseline justify-between">
                  <strong className="text-2xl font-mono text-white">99.8%</strong>
                  <span className="text-xs font-mono text-emerald-400">Normal</span>
                </div>
                <p className="text-[10px] text-stone-500">Same-Day Priority Dispatch</p>
              </div>

              <div className="bg-[#191C21] p-4 rounded-2xl border border-[#272A30] space-y-1">
                <span className="text-[10px] font-mono text-stone-400 uppercase">Cart Conversion Rate</span>
                <div className="flex items-baseline justify-between">
                  <strong className="text-2xl font-mono text-white">4.18%</strong>
                  <span className="text-xs font-mono text-emerald-400">+0.6% vs 7d</span>
                </div>
                <p className="text-[10px] text-stone-500">DTC Express Checkout Funnel</p>
              </div>

              <div className="bg-[#191C21] p-4 rounded-2xl border border-[#272A30] space-y-1">
                <span className="text-[10px] font-mono text-stone-400 uppercase">Customer Lifetime Value</span>
                <div className="flex items-baseline justify-between">
                  <strong className="text-2xl font-mono text-white">$894.20</strong>
                  <span className="text-xs font-mono text-[#F2CA50]">Cohort '25</span>
                </div>
                <p className="text-[10px] text-stone-500">38.4% Repeat Purchase Ratio</p>
              </div>
            </div>

            {/* Merchant Tab Controls */}
            <div className="bg-[#191C21] rounded-2xl border border-[#272A30] p-4 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#272A30] pb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#F2CA50]" />
                  <h3 className="font-bold text-sm text-white">Live DTC Order Fulfillment Pipeline</h3>
                </div>
                <button
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#F2CA50] text-stone-950 font-bold text-xs flex items-center gap-1 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New DTC Product SKU</span>
                </button>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#272A30] text-stone-400 font-mono">
                      <th className="p-2.5">Order #</th>
                      <th className="p-2.5">Date</th>
                      <th className="p-2.5">Customer</th>
                      <th className="p-2.5">Items Summary</th>
                      <th className="p-2.5 text-right">Total</th>
                      <th className="p-2.5 text-right">Fulfillment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#272A30] font-mono">
                    {state.orders.map((o) => (
                      <tr key={o.orderNumber} className="hover:bg-white/5">
                        <td className="p-2.5 font-bold text-[#F2CA50]">{o.orderNumber}</td>
                        <td className="p-2.5 text-stone-400">{o.date}</td>
                        <td className="p-2.5 font-sans font-medium text-white">{o.customerName}</td>
                        <td className="p-2.5 text-stone-300 font-sans">{o.itemsSummary}</td>
                        <td className="p-2.5 text-right font-bold text-white">${o.totalUsd.toFixed(2)}</td>
                        <td className="p-2.5 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              o.status === "Delivered"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : o.status === "Dispatched"
                                ? "bg-blue-500/10 text-blue-400"
                                : "bg-amber-500/10 text-amber-400"
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Merchant Inventory & Promos Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Product Catalog Stock */}
              <div className="bg-[#191C21] p-4 rounded-2xl border border-[#272A30] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-stone-400">Inventory Level Matrix</h4>
                  <span className="text-xs font-mono text-[#F2CA50]">{state.products.length} SKUs Active</span>
                </div>
                <div className="divide-y divide-[#272A30]">
                  {state.products.map((p) => (
                    <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono text-[10px] text-stone-500">{p.sku}</span>
                        <h5 className="font-bold text-white">{p.name}</h5>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-white">{p.stock} units</span>
                        <span className="block text-[10px] text-stone-500">${p.priceUsd.toFixed(2)} / unit</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Promotional Campaigns */}
              <div className="bg-[#191C21] p-4 rounded-2xl border border-[#272A30] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-stone-400">
                    Active Promotional Campaigns
                  </h4>
                  <Tag className="w-3.5 h-3.5 text-[#F2CA50]" />
                </div>
                <div className="space-y-2">
                  {state.promos.map((pr) => (
                    <div
                      key={pr.code}
                      className="p-3 rounded-xl bg-[#12141A] border border-[#272A30] flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-mono font-bold text-[#F2CA50]">{pr.code}</span>
                        <p className="text-stone-400 text-[11px]">{pr.description}</p>
                      </div>
                      <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {pr.discountPercentage}% OFF
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* SLIDE-OVER: SHOPPING BAG DRAWER */}
      {isBagOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end">
          <div className="bg-[#161920] w-full max-w-md h-full border-l border-[#272A30] p-5 flex flex-col justify-between shadow-2xl space-y-4 overflow-y-auto">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-[#272A30] pb-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#F2CA50]" />
                  <h3 className="font-bold text-sm text-white font-mono">Shopping Bag ({state.cart.length})</h3>
                </div>
                <button onClick={() => setIsBagOpen(false)} className="text-stone-400 hover:text-white p-1">
                  ✕
                </button>
              </div>

              {/* Free Express Shipping Meter */}
              <div className="bg-[#111319] p-3 rounded-xl border border-[#272A30] mt-3 space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-400">Next-Day Air Meter</span>
                  <span className="text-[#F2CA50] font-bold">{shippingProgressPct}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-stone-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#F2CA50] to-[#E9C349] transition-all"
                    style={{ width: `${shippingProgressPct}%` }}
                  />
                </div>
                <p className="text-[10px] text-stone-400">
                  {distanceToFreeShipping > 0
                    ? `Add $${distanceToFreeShipping.toFixed(2)} to unlock complimentary overnight delivery.`
                    : "Complimentary Priority Next-Day Air Unlocked!"}
                </p>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-[#272A30] mt-3">
                {state.cart.length === 0 ? (
                  <div className="py-8 text-center text-xs text-stone-500">Your shopping bag is currently empty.</div>
                ) : (
                  state.cart.map((item) => (
                    <div key={item.id} className="py-3 flex gap-3 text-xs items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-black" />
                      <div className="flex-1">
                        <h4 className="font-bold text-white">{item.name}</h4>
                        <span className="text-stone-400 text-[10px] block">{item.variant}</span>
                        <span className="font-mono font-bold text-stone-200">${item.unitPriceUsd.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#1F2229] rounded-lg p-1 border border-[#32353B]">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className="w-5 h-5 rounded hover:bg-stone-700 text-stone-300 flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="font-mono text-xs w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="w-5 h-5 rounded hover:bg-stone-700 text-stone-300 flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-stone-500 hover:text-rose-400 p-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bottom Checkout Actions */}
            <div className="space-y-3 pt-3 border-t border-[#272A30]">
              {/* Promo code badge */}
              {state.appliedPromo && (
                <div className="bg-[#1D2025] p-2 rounded-lg border border-[#32353B] flex justify-between items-center text-xs">
                  <span className="text-emerald-400 font-mono font-bold">PROMO: {state.appliedPromo}</span>
                  <span className="text-emerald-400 font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Subtotal & Taxes */}
              <div className="space-y-1 text-xs font-mono text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${rawSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Est. Tax (6.25%)</span>
                  <span>${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span>{shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-[#272A30]">
                  <span>Total</span>
                  <span className="text-[#F2CA50]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Express Checkout Trigger */}
              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                disabled={state.cart.length === 0}
                className={`w-full py-3 rounded-xl font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
                  state.cart.length === 0
                    ? "bg-stone-800 text-stone-500 cursor-not-allowed"
                    : "bg-[#F2CA50] hover:bg-[#D4AF37] text-stone-950"
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Proceed to Express Checkout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: EXPRESS CHECKOUT SIMULATION */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#191C21] rounded-2xl border border-[#32353B] shadow-2xl max-w-md w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#272A30] pb-2">
              <h3 className="font-bold text-sm text-white">Aura Express Secure Checkout</h3>
              <button onClick={() => setIsCheckoutModalOpen(false)} className="text-stone-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleExecuteCheckout} className="space-y-3">
              <div>
                <label className="font-bold text-stone-300 block mb-1">Full Delivery Name</label>
                <input
                  type="text"
                  defaultValue="Julian Vance"
                  className="w-full bg-[#111319] border border-stone-700 rounded p-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-stone-300 block mb-1">Shipping Destination</label>
                <input
                  type="text"
                  defaultValue="42 Bleeker St, Suite 402, New York, NY"
                  className="w-full bg-[#111319] border border-stone-700 rounded p-2 text-white"
                  required
                />
              </div>

              <div className="p-3 bg-[#111319] rounded-xl border border-stone-800 space-y-2">
                <span className="text-[10px] text-stone-400 font-mono block uppercase">Encrypted Payment Simulation</span>
                <div className="flex items-center justify-between text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#F2CA50]" />
                    <span>Apple Pay / Visa •••• 8841</span>
                  </span>
                  <span className="font-bold font-mono text-emerald-400">Authorized</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-bold text-white pt-2">
                <span>Total Amount Due:</span>
                <span className="text-[#F2CA50] font-mono">${grandTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="px-3 py-1.5 rounded text-stone-400 hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-[#F2CA50] hover:bg-[#D4AF37] text-stone-950 shadow-md"
                >
                  Authorize Order & Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ORDER CONFIRMATION */}
      {orderConfirmationNumber && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#191C21] rounded-2xl border border-[#32353B] shadow-2xl max-w-sm w-full p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white">Order Confirmed!</h3>
            <p className="text-xs text-stone-400">
              Order <strong className="text-[#F2CA50] font-mono">{orderConfirmationNumber}</strong> has been received by
              our Copenhagen fulfillment center.
            </p>
            <p className="text-[11px] text-stone-500">
              Tracking dispatch notification sent to your email. Carrier: FedEx Priority Air.
            </p>
            <button
              onClick={() => setOrderConfirmationNumber(null)}
              className="w-full py-2.5 rounded-xl bg-[#F2CA50] text-stone-950 font-bold text-xs shadow-md"
            >
              Continue Exploring Collection
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD NEW PRODUCT SKU (MERCHANT) */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#191C21] rounded-2xl border border-[#32353B] shadow-2xl max-w-md w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#272A30] pb-2">
              <h3 className="font-bold text-sm text-white">Induct New DTC Audio Product SKU</h3>
              <button onClick={() => setIsAddProductModalOpen(false)} className="text-stone-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="font-bold text-stone-300 block mb-1">Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Aura Studio Reference IEM"
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  className="w-full bg-[#111319] border border-stone-700 rounded p-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-300 block mb-1">SKU Code</label>
                  <input
                    type="text"
                    placeholder="AUR-IEM-99"
                    value={newProductForm.sku}
                    onChange={(e) => setNewProductForm({ ...newProductForm, sku: e.target.value })}
                    className="w-full bg-[#111319] border border-stone-700 rounded p-2 font-mono uppercase text-white"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-300 block mb-1">Category</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value as any })}
                    className="w-full bg-[#111319] border border-stone-700 rounded p-2 text-white"
                  >
                    <option value="Headphones">Headphones</option>
                    <option value="Spatial Audio">Spatial Audio</option>
                    <option value="Acoustics">Acoustics</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-300 block mb-1">Retail Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                    className="w-full bg-[#111319] border border-stone-700 rounded p-2 font-mono text-white"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-300 block mb-1">Initial Stock</label>
                  <input
                    type="number"
                    value={newProductForm.stock}
                    onChange={(e) => setNewProductForm({ ...newProductForm, stock: e.target.value })}
                    className="w-full bg-[#111319] border border-stone-700 rounded p-2 font-mono text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-3 py-1.5 rounded text-stone-400 hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-[#F2CA50] hover:bg-[#D4AF37] text-stone-950 shadow-md"
                >
                  Induct SKU into Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
