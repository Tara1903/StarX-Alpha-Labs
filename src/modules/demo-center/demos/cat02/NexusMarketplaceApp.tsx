"use client";

import React, { useState, useMemo } from "react";
import { DemoProductDefinition } from "../../types";
import { useDemoState } from "../../state/useDemoState";

interface Vendor {
  id: string;
  name: string;
  handle: string;
  badge: string;
  rating: number;
  location: string;
  category: string;
  ordersCompleted: number;
  dispatchRate: string;
  tags: string[];
  description: string;
  status: "verified" | "pending_kyc" | "bond_deposited";
  verifiedDate: string;
}

interface ProductItem {
  id: string;
  vendorId: string;
  vendorName: string;
  title: string;
  category: string;
  price: number;
  originCountry: string;
  inStock: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
}

interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface Dispute {
  id: string;
  orderId: string;
  vendorName: string;
  buyerName: string;
  amount: number;
  reason: string;
  status: "Evidence Pending" | "Under Review" | "Resolved - Refunded" | "Resolved - Released";
  deadline: string;
}

interface MarketplaceState {
  vendors: Vendor[];
  products: ProductItem[];
  cart: CartItem[];
  commissionRate: number; // e.g. 0.12 (12%)
  vendorPayoutBalance: number;
  escrowLockedBuffer: number;
  disputes: Dispute[];
  payoutHistory: { id: string; date: string; amount: number; method: string; status: string }[];
  approvedVendors: string[];
}

const INITIAL_VENDORS: Vendor[] = [
  {
    id: "VX-109",
    name: "Nordic Audio Atelier",
    handle: "nordic-audio",
    badge: "Top Merchant",
    rating: 4.98,
    location: "Stockholm, Sweden",
    category: "Audio Craft",
    ordersCompleted: 1420,
    dispatchRate: "100%",
    tags: ["Tier-1", "Escrow Protected", "Instant Payout Tier A"],
    description: "Artisan acoustic transducers, open-back planar drivers, and precision-turned Swedish birch acoustic housings.",
    status: "verified",
    verifiedDate: "2024-03-12",
  },
  {
    id: "VX-204",
    name: "Atelier Horlogerie Genève",
    handle: "geneve-horlogerie",
    badge: "Master Artisan",
    rating: 4.96,
    location: "Geneva, Switzerland",
    category: "Precision Horology",
    ordersCompleted: 890,
    dispatchRate: "99.4%",
    tags: ["Swiss Chamber Certified", "Escrow Protected", "High Value Vault Clearance"],
    description: "Hand-finished mechanical complications, column-wheel chronographs, and certified chronometer assemblies.",
    status: "verified",
    verifiedDate: "2023-11-05",
  },
  {
    id: "VX-442",
    name: "Apex Switchcraft",
    handle: "apex-switch",
    badge: "Custom Lab",
    rating: 4.94,
    location: "Austin, TX, USA",
    category: "Mechanical Keyboards",
    ordersCompleted: 2150,
    dispatchRate: "99.8%",
    tags: ["CNC Precision", "Fast Dispatch"],
    description: "Solid brass CNC machined keycaps, custom lubed tactile switches, and acoustic gasket mounts.",
    status: "verified",
    verifiedDate: "2024-01-20",
  },
  {
    id: "VX-812",
    name: "Tannery No. 4",
    handle: "tannery-4",
    badge: "Heritage Guild",
    rating: 4.95,
    location: "Florence, Italy",
    category: "Leather & Bags",
    ordersCompleted: 1120,
    dispatchRate: "100%",
    tags: ["Vegetable Tanned", "Hand-Stitched"],
    description: "Full-grain Tuscan bridle leather desk mats, folio cases, and watch rolls crafted by multi-generational artisans.",
    status: "verified",
    verifiedDate: "2023-08-14",
  },
];

const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: "PRD-01",
    vendorId: "VX-109",
    vendorName: "Nordic Audio Atelier",
    title: "Sørensen Reference Planar Headphones",
    category: "Audio Craft",
    price: 240.0,
    originCountry: "SE",
    inStock: 18,
    rating: 4.98,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    description: "Ultra-thin nanometer diaphragm planar magnetic driver tuned to Harman curve target with genuine oiled birch chambers.",
  },
  {
    id: "PRD-02",
    vendorId: "VX-442",
    vendorName: "Apex Switchcraft",
    title: "Solid Brass Custom Artisan Keycap Set",
    category: "Mechanical Keyboards",
    price: 89.0,
    originCountry: "US",
    inStock: 34,
    rating: 4.94,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    description: "Heavy solid brass machined keycaps with mirror-polished bevels and PVD titanium nitride coating for acoustic depth.",
  },
  {
    id: "PRD-03",
    vendorId: "VX-812",
    vendorName: "Tannery No. 4",
    title: "Full-Grain Bridle Leather Desk Pad",
    category: "Leather & Bags",
    price: 89.0,
    originCountry: "UK",
    inStock: 25,
    rating: 4.96,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
    description: "English bridle leather desk blotter treated with natural beeswax and tallow, self-healing surface with burnished edges.",
  },
  {
    id: "PRD-04",
    vendorId: "VX-204",
    vendorName: "Atelier Horlogerie Genève",
    title: "Mechanical Chronograph Diver (Calibre 38)",
    category: "Precision Horology",
    price: 1150.0,
    originCountry: "CH",
    inStock: 6,
    rating: 4.99,
    reviewsCount: 31,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description: "Column wheel automatic chronograph regulated to COSC standards within 316L satin brushed surgical case with ceramic bezel.",
  },
];

const INITIAL_STATE: MarketplaceState = {
  vendors: INITIAL_VENDORS,
  products: INITIAL_PRODUCTS,
  cart: [
    { product: INITIAL_PRODUCTS[0], quantity: 1 },
    { product: INITIAL_PRODUCTS[1], quantity: 1 },
    { product: INITIAL_PRODUCTS[2], quantity: 1 },
  ],
  commissionRate: 0.12, // 12%
  vendorPayoutBalance: 14290.0,
  escrowLockedBuffer: 4120.0,
  disputes: [
    {
      id: "DIS-4091",
      orderId: "ORD-9902",
      vendorName: "Artisan Soundworks",
      buyerName: "Marcus Vance",
      amount: 185.0,
      reason: "In-transit carrier delivery delay claim filed by buyer",
      status: "Evidence Pending",
      deadline: "18h remaining to supply BOL",
    },
  ],
  payoutHistory: [
    { id: "PAY-901", date: "2025-05-01", amount: 12450.0, method: "ACH JPMorgan Chase", status: "Completed" },
    { id: "PAY-872", date: "2025-04-15", amount: 9800.0, method: "ACH JPMorgan Chase", status: "Completed" },
  ],
  approvedVendors: [],
};

export function NexusMarketplaceApp({
  product,
  definition,
}: {
  product?: DemoProductDefinition;
  definition?: DemoProductDefinition;
}) {
  const effectiveProduct = product || definition;
  const [activeRole, setActiveRole] = useState<"shopper" | "vendor" | "admin">("shopper");
  const [activeTab, setActiveTab] = useState<
    "storefront" | "cart" | "fulfillment" | "commission" | "disputes"
  >("storefront");
  const [categoryFilter, setCategoryFilter] = useState<string>("All Verified Vendors");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [payoutNotification, setPayoutNotification] = useState<string | null>(null);
  const [newVendorStatus, setNewVendorStatus] = useState<Record<string, string>>({
    "Kromer Optical Labs": "Pending Review",
    "Vanguard Brassworks": "Bond Deposited",
  });

  const { state, setState, resetState } = useDemoState<MarketplaceState>(
    "nexus-multi-vendor-marketplace",
    INITIAL_STATE
  );

  const categories = [
    "All Verified Vendors",
    "Audio Craft",
    "Precision Horology",
    "Leather & Bags",
    "Mechanical Keyboards",
  ];

  // Cart calculations
  const cartSubtotal = useMemo(() => {
    return state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [state.cart]);

  const nexusCommission = useMemo(() => {
    return cartSubtotal * state.commissionRate;
  }, [cartSubtotal, state.commissionRate]);

  const vendorNetPayout = useMemo(() => {
    return cartSubtotal - nexusCommission;
  }, [cartSubtotal, nexusCommission]);

  const uniqueCartVendors = useMemo(() => {
    const map = new Set<string>();
    state.cart.forEach((i) => map.add(i.product.vendorName));
    return map.size;
  }, [state.cart]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return state.products.filter((p) => {
      const matchCat =
        categoryFilter === "All Verified Vendors" || p.category === categoryFilter;
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [state.products, categoryFilter, searchQuery]);

  // Handlers
  const handleAddToCart = (product: ProductItem) => {
    setState((prev) => {
      const existing = prev.cart.find((c) => c.product.id === product.id);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map((c) =>
            c.product.id === product.id ? { ...c, quantity: c.quantity + 1 } : c
          ),
        };
      } else {
        return {
          ...prev,
          cart: [...prev.cart, { product, quantity: 1 }],
        };
      }
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart
        .map((c) => {
          if (c.product.id === productId) {
            const newQ = c.quantity + delta;
            return newQ > 0 ? { ...c, quantity: newQ } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[],
    }));
  };

  const handleAuthorizePayout = () => {
    if (state.vendorPayoutBalance <= 0) return;
    const amount = state.vendorPayoutBalance;
    const newRecord = {
      id: `PAY-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split("T")[0],
      amount: amount,
      method: "ACH JPMorgan Chase (•••• 4821)",
      status: "Processing Settlement",
    };
    setState((prev) => ({
      ...prev,
      vendorPayoutBalance: 0,
      payoutHistory: [newRecord, ...prev.payoutHistory],
    }));
    setPayoutNotification(`Authorized ACH Payout of $${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}!`);
    setTimeout(() => setPayoutNotification(null), 4500);
  };

  const handleApproveVendor = (vendorName: string) => {
    setState((prev) => ({
      ...prev,
      approvedVendors: [...(prev.approvedVendors || []), vendorName],
    }));
    setNewVendorStatus((prev) => ({ ...prev, [vendorName]: "Approved & Active" }));
    setPayoutNotification(`Merchant "${vendorName}" approved and onboarded to Live Catalog!`);
    setTimeout(() => setPayoutNotification(null), 4000);
  };

  const handleResolveDispute = (disputeId: string, action: "refund" | "release") => {
    setState((prev) => ({
      ...prev,
      disputes: prev.disputes.map((d) =>
        d.id === disputeId
          ? {
              ...d,
              status: action === "refund" ? "Resolved - Refunded" : "Resolved - Released",
            }
          : d
      ),
    }));
    setPayoutNotification(`Dispute ${disputeId} marked as ${action === "refund" ? "Refunded to Buyer" : "Released to Vendor"}!`);
    setTimeout(() => setPayoutNotification(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Banner Notice */}
      {payoutNotification && (
        <div className="bg-indigo-600 text-white px-4 py-2.5 text-center text-sm font-medium shadow-md flex items-center justify-center gap-2 animate-fadeIn sticky top-0 z-50">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          {payoutNotification}
        </div>
      )}

      {/* Main Top Header */}
      <header className="border-b border-[#eaedff] bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Logo & Platform Tag */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg tracking-tight text-[#131b2e]">Nexus OS</span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                    Enterprise Infrastructure
                  </span>
                </div>
                <p className="text-[11px] text-[#777587] leading-none mt-0.5">Multi-Vendor Marketplace</p>
              </div>
            </div>

            {/* Role Switcher */}
            <div className="hidden md:flex items-center bg-[#eaedff]/60 p-1 rounded-xl border border-[#dae2fd]">
              <button
                onClick={() => {
                  setActiveRole("shopper");
                  setActiveTab("storefront");
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeRole === "shopper"
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-[#777587] hover:text-[#131b2e]"
                }`}
              >
                Shopper View
              </button>
              <button
                onClick={() => {
                  setActiveRole("vendor");
                  setActiveTab("fulfillment");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeRole === "vendor"
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-[#777587] hover:text-[#131b2e]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Vendor Portal: Artisan Soundworks
              </button>
              <button
                onClick={() => {
                  setActiveRole("admin");
                  setActiveTab("commission");
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeRole === "admin"
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-[#777587] hover:text-[#131b2e]"
                }`}
              >
                Platform Admin Console
              </button>
            </div>

            {/* Right Tools: Currency, Cart Indicator, Status */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1 text-xs font-medium text-[#777587] bg-[#f2f3ff] px-2.5 py-1.5 rounded-lg border border-[#eaedff]">
                <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>USD ($)</span>
              </div>

              {/* Cart Button */}
              <button
                onClick={() => setActiveTab("cart")}
                className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-900 px-3 py-1.5 rounded-xl hover:bg-indigo-100 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <div className="text-left leading-none">
                  <div className="text-xs font-bold">
                    {state.cart.length} items • ${cartSubtotal.toFixed(2)}
                  </div>
                </div>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-600 text-white rounded-md">
                  {uniqueCartVendors} Splits
                </span>
              </button>

              <button
                onClick={resetState}
                title="Reset Demo State"
                className="p-2 text-[#777587] hover:text-indigo-600 hover:bg-[#eaedff]/50 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Ribbon */}
        <div className="border-t border-[#eaedff] bg-[#faf8ff]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 py-2">
            <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setActiveTab("storefront")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === "storefront"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-[#464555] hover:bg-[#eaedff]"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Vendor Storefront Discovery
              </button>

              <button
                onClick={() => setActiveTab("fulfillment")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === "fulfillment"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-[#464555] hover:bg-[#eaedff]"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Fulfillment & Ledger
              </button>

              <button
                onClick={() => setActiveTab("cart")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === "cart"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-[#464555] hover:bg-[#eaedff]"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Unified Cart ({state.cart.length})
              </button>

              <button
                onClick={() => setActiveTab("commission")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === "commission"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-[#464555] hover:bg-[#eaedff]"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Commission Rules ({(state.commissionRate * 100).toFixed(0)}%)
              </button>

              <button
                onClick={() => setActiveTab("disputes")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === "disputes"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-[#464555] hover:bg-[#eaedff]"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Dispute Arbitration ({state.disputes.filter((d) => !d.status.startsWith("Resolved")).length})
              </button>
            </nav>

            {/* Quick Search */}
            <div className="relative w-full sm:w-64">
              <svg className="w-4 h-4 absolute left-3 top-2.5 text-[#777587]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search catalog, SKU, vendor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-1.5 bg-white text-xs border border-[#dae2fd] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-[#777587]"
              />
              <span className="absolute right-2.5 top-2 text-[10px] bg-[#eaedff] text-[#777587] font-mono px-1 rounded">⌘K</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        {/* Banner: Clearing Engine Info */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-900 to-indigo-800 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-700/60 border border-indigo-500/40 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-sm sm:text-base">Nexus Cross-Vendor Clearing Engine Active</h2>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 rounded">
                  ISO 20022 Compliant
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">
                Single transaction, automated split payment routing via Nexus Escrow Engine with individual vendor sub-ledgers.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs bg-indigo-950/60 border border-indigo-600/40 text-indigo-200 px-3 py-1.5 rounded-xl font-mono">
              Live Escrow Buffer: ${state.escrowLockedBuffer.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 2-Column Split Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Workspace Area (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
                    categoryFilter === cat
                      ? "bg-[#131b2e] text-white shadow-sm"
                      : "bg-white text-[#464555] border border-[#eaedff] hover:bg-[#eaedff]/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* TAB 1: Storefront & Vendors */}
            {activeTab === "storefront" && (
              <div className="space-y-6">
                {/* Verified Vendor Spotlight Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {state.vendors.map((vendor) => (
                    <div
                      key={vendor.id}
                      className="bg-white p-4 rounded-2xl border border-[#eaedff] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-sm text-[#131b2e]">{vendor.name}</h3>
                            <svg className="w-3.5 h-3.5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="text-[11px] text-[#777587]">{vendor.location}</p>
                        </div>
                        <div className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg text-xs font-bold border border-emerald-200">
                          {vendor.rating} ★
                        </div>
                      </div>

                      <p className="text-xs text-[#464555] mb-3 line-clamp-2 leading-relaxed">
                        {vendor.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {vendor.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#eaedff] text-indigo-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#f2f3ff] text-[11px] text-[#777587]">
                        <span>{vendor.ordersCompleted.toLocaleString()} Orders</span>
                        <span className="text-emerald-600 font-semibold">{vendor.dispatchRate} On-Time Dispatch</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cross-Vendor Catalog Grid */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-sm text-[#131b2e] flex items-center gap-2">
                      <span>Cross-Vendor Catalog & Active Cart Sync</span>
                      <span className="text-xs font-normal text-[#777587]">
                        (Live Currency Clearing: USD Guaranteed Rate)
                      </span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredProducts.map((product) => {
                      const inCartItem = state.cart.find((c) => c.product.id === product.id);
                      const vendorTake = product.price * (1 - state.commissionRate);

                      return (
                        <div
                          key={product.id}
                          className="bg-white rounded-2xl border border-[#eaedff] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                        >
                          <div className="relative h-44 bg-slate-100 overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            {inCartItem && (
                              <span className="absolute top-2 left-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                                IN CART ({inCartItem.quantity})
                              </span>
                            )}
                            <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                              Ships {product.originCountry}
                            </span>
                          </div>

                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="text-[11px] font-medium text-indigo-600 mb-0.5">
                                {product.vendorName}
                              </div>
                              <h4 className="font-bold text-sm text-[#131b2e] line-clamp-1 mb-1">
                                {product.title}
                              </h4>
                              <p className="text-xs text-[#777587] line-clamp-2 mb-3">
                                {product.description}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-[#f2f3ff] flex items-center justify-between">
                              <div>
                                <div className="text-base font-extrabold text-[#131b2e]">
                                  ${product.price.toFixed(2)}
                                </div>
                                <div className="text-[10px] text-emerald-600 font-medium">
                                  Split: ${vendorTake.toFixed(2)} Net
                                </div>
                              </div>

                              <button
                                onClick={() => handleAddToCart(product)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                                  inCartItem
                                    ? "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
                                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                                }`}
                              >
                                {inCartItem ? (
                                  <>
                                    <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Added ({inCartItem.quantity})
                                  </>
                                ) : (
                                  <>
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add to Cart
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Multi-Vendor Cart Ledger Breakdown Table */}
                <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-sm text-[#131b2e]">Multi-Vendor Cart Ledger Breakdown</h3>
                      <p className="text-xs text-[#777587]">
                        Automated settlement calculation prior to escrow binding.
                      </p>
                    </div>
                    <span className="text-xs font-bold bg-[#eaedff] text-indigo-700 px-2.5 py-1 rounded-lg">
                      Subtotal: ${cartSubtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-[#eaedff] text-[#777587]">
                          <th className="py-2.5 px-3 font-semibold">Vendor / Fulfilment Node</th>
                          <th className="py-2.5 px-3 font-semibold">Item Descriptor</th>
                          <th className="py-2.5 px-3 font-semibold text-right">Gross Price</th>
                          <th className="py-2.5 px-3 font-semibold text-right">Nexus Fee ({(state.commissionRate * 100).toFixed(0)}%)</th>
                          <th className="py-2.5 px-3 font-semibold text-right">Vendor Net Escrow</th>
                          <th className="py-2.5 px-3 font-semibold text-center">Dispatch SLA</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f2f3ff]">
                        {state.cart.map((item, idx) => {
                          const totalItemPrice = item.product.price * item.quantity;
                          const fee = totalItemPrice * state.commissionRate;
                          const net = totalItemPrice - fee;

                          return (
                            <tr key={idx} className="hover:bg-[#faf8ff] transition-colors">
                              <td className="py-3 px-3 font-medium text-[#131b2e] flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                {item.product.vendorName} ({item.product.vendorId})
                              </td>
                              <td className="py-3 px-3 text-[#464555]">
                                {item.product.title} (x{item.quantity})
                              </td>
                              <td className="py-3 px-3 text-right font-bold text-[#131b2e]">
                                ${totalItemPrice.toFixed(2)}
                              </td>
                              <td className="py-3 px-3 text-right text-rose-600 font-medium">
                                -${fee.toFixed(2)}
                              </td>
                              <td className="py-3 px-3 text-right text-emerald-600 font-bold">
                                ${net.toFixed(2)}
                              </td>
                              <td className="py-3 px-3 text-center">
                                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                                  {idx % 2 === 0 ? "24h Express" : "48h Standard"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Unified Cart */}
            {activeTab === "cart" && (
              <div className="bg-white rounded-2xl border border-[#eaedff] p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
                  <div>
                    <h3 className="font-bold text-base text-[#131b2e]">Unified Shopping Cart</h3>
                    <p className="text-xs text-[#777587]">
                      Consolidated checkout with autonomous split payment escrow distribution.
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-200">
                    {uniqueCartVendors} Disjoint Vendors
                  </span>
                </div>

                {state.cart.length === 0 ? (
                  <div className="text-center py-12 text-[#777587]">
                    <svg className="w-12 h-12 mx-auto text-[#dae2fd] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="text-sm font-semibold">Your cart is currently empty</p>
                    <button
                      onClick={() => setActiveTab("storefront")}
                      className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700"
                    >
                      Browse Verified Vendors
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-[#eaedff] bg-[#faf8ff]"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#eaedff]"
                          />
                          <div>
                            <div className="text-[11px] font-semibold text-indigo-600">
                              {item.product.vendorName} • {item.product.originCountry}
                            </div>
                            <h4 className="font-bold text-sm text-[#131b2e]">{item.product.title}</h4>
                            <div className="text-xs font-bold text-indigo-900 mt-0.5">
                              ${item.product.price.toFixed(2)} each
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          <div className="flex items-center border border-[#dae2fd] bg-white rounded-lg">
                            <button
                              onClick={() => handleUpdateQuantity(item.product.id, -1)}
                              className="px-2.5 py-1 text-sm font-bold text-[#777587] hover:text-[#131b2e]"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-xs font-bold text-[#131b2e]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.product.id, 1)}
                              className="px-2.5 py-1 text-sm font-bold text-[#777587] hover:text-[#131b2e]"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-bold text-[#131b2e]">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-[10px] text-emerald-600 font-medium">
                              Split net: ${(item.product.price * item.quantity * (1 - state.commissionRate)).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 space-y-2 text-xs">
                      <div className="flex justify-between text-[#464555]">
                        <span>Subtotal ({state.cart.length} items):</span>
                        <span className="font-bold text-[#131b2e]">${cartSubtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[#464555]">
                        <span>Platform Escrow & Clearing Fee ({(state.commissionRate * 100).toFixed(0)}%):</span>
                        <span className="font-medium text-rose-600">-${nexusCommission.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[#464555]">
                        <span>Vendor Net Escrow Total:</span>
                        <span className="font-bold text-emerald-600">${vendorNetPayout.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-indigo-200 pt-2 flex justify-between text-sm font-extrabold text-indigo-950">
                        <span>Customer Total:</span>
                        <span>${cartSubtotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setPayoutNotification("Order submitted! Funds placed into Nexus Algorithmic Escrow V4.2.");
                        setState((prev) => ({ ...prev, cart: [] }));
                        setTimeout(() => setPayoutNotification(null), 4000);
                      }}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Authorize Escrow Checkout (${cartSubtotal.toFixed(2)})
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Fulfillment & Vendor Portal */}
            {activeTab === "fulfillment" && (
              <div className="bg-white rounded-2xl border border-[#eaedff] p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-bold text-base text-[#131b2e]">Vendor Fulfillment & Settlement Engine</h3>
                  <p className="text-xs text-[#777587]">
                    Merchant ID #VX-8841 • Artisan Soundworks (Nordic Audio Atelier)
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                    <div className="text-[11px] text-[#777587]">Active Orders</div>
                    <div className="text-xl font-extrabold text-[#131b2e] mt-1">14 Orders</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">100% within SLA</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                    <div className="text-[11px] text-[#777587]">Escrow Clearance Rate</div>
                    <div className="text-xl font-extrabold text-indigo-700 mt-1">T+0 Instant</div>
                    <div className="text-[10px] text-[#777587] mt-0.5">Tier-A Master Merchant</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                    <div className="text-[11px] text-[#777587]">Pending Payout Balance</div>
                    <div className="text-xl font-extrabold text-emerald-600 mt-1">
                      ${state.vendorPayoutBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Cleared for ACH</div>
                  </div>
                </div>

                {/* Orders awaiting fulfillment */}
                <div>
                  <h4 className="font-bold text-xs text-[#131b2e] mb-3">Pending Fulfillment Queue</h4>
                  <div className="space-y-2">
                    {[
                      { id: "ORD-9914", item: "Sørensen Reference Planar", destination: "London, UK", status: "Awaiting Label" },
                      { id: "ORD-9915", item: "Custom MMCX Balanced Cable", destination: "Tokyo, JP", status: "Packed & Ready" },
                      { id: "ORD-9916", item: "Planar Replacement Ear Pads", destination: "Zurich, CH", status: "Dispatch Today" },
                    ].map((ord) => (
                      <div
                        key={ord.id}
                        className="flex items-center justify-between p-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] text-xs"
                      >
                        <div>
                          <span className="font-bold text-[#131b2e] mr-2">{ord.id}</span>
                          <span className="text-[#464555]">{ord.item}</span>
                          <span className="text-[10px] text-[#777587] ml-2 font-mono">→ {ord.destination}</span>
                        </div>
                        <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                          {ord.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payout History Ledger */}
                <div>
                  <h4 className="font-bold text-xs text-[#131b2e] mb-3">Historical ACH Settlement Batches</h4>
                  <div className="border border-[#eaedff] rounded-xl overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#f2f3ff] text-[#777587]">
                        <tr>
                          <th className="py-2 px-3">Batch ID</th>
                          <th className="py-2 px-3">Date</th>
                          <th className="py-2 px-3">Destination</th>
                          <th className="py-2 px-3 text-right">Settled Amount</th>
                          <th className="py-2 px-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#eaedff]">
                        {state.payoutHistory.map((h) => (
                          <tr key={h.id} className="hover:bg-[#faf8ff]">
                            <td className="py-2.5 px-3 font-mono text-indigo-700">{h.id}</td>
                            <td className="py-2.5 px-3 text-[#777587]">{h.date}</td>
                            <td className="py-2.5 px-3 text-[#464555]">{h.method}</td>
                            <td className="py-2.5 px-3 text-right font-bold text-emerald-600">
                              ${h.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                                {h.status}
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

            {/* TAB 4: Commission Rules & Admin */}
            {activeTab === "commission" && (
              <div className="bg-white rounded-2xl border border-[#eaedff] p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-bold text-base text-[#131b2e]">Platform Take-Rate & Commission Rules</h3>
                  <p className="text-xs text-[#777587]">
                    Multi-tier escrow split configuration governing automated merchant payout clearing.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-indigo-950">Active Global Take-Rate</div>
                    <div className="text-2xl font-black text-indigo-700">{(state.commissionRate * 100).toFixed(0)}%</div>
                    <p className="text-[11px] text-indigo-800">
                      Auto-deducted from gross cart value at time of customer checkout.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {[0.08, 0.10, 0.12, 0.15].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => {
                          setState((prev) => ({ ...prev, commissionRate: rate }));
                          setPayoutNotification(`Updated platform commission rate to ${(rate * 100).toFixed(0)}%!`);
                          setTimeout(() => setPayoutNotification(null), 3000);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          state.commissionRate === rate
                            ? "bg-indigo-600 text-white shadow"
                            : "bg-white text-indigo-900 border border-indigo-200 hover:bg-indigo-100"
                        }`}
                      >
                        {(rate * 100).toFixed(0)}%
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-xs text-[#131b2e]">Tiered Merchant Incentives</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl border border-[#eaedff] bg-[#faf8ff]">
                      <div className="font-bold text-indigo-700">Standard Tier</div>
                      <div className="text-sm font-extrabold text-[#131b2e] mt-1">15.0% Take</div>
                      <div className="text-[11px] text-[#777587] mt-0.5">Under $25k GMV/mo</div>
                    </div>
                    <div className="p-3 rounded-xl border border-indigo-200 bg-indigo-50/50">
                      <div className="font-bold text-indigo-700">High Volume Guild</div>
                      <div className="text-sm font-extrabold text-[#131b2e] mt-1">12.0% Take (Current)</div>
                      <div className="text-[11px] text-[#777587] mt-0.5">$25k - $100k GMV/mo</div>
                    </div>
                    <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50">
                      <div className="font-bold text-emerald-700">Artisan Enterprise</div>
                      <div className="text-sm font-extrabold text-[#131b2e] mt-1">8.0% Take</div>
                      <div className="text-[11px] text-[#777587] mt-0.5">$100k+ GMV/mo</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Dispute Arbitration */}
            {activeTab === "disputes" && (
              <div className="bg-white rounded-2xl border border-[#eaedff] p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-bold text-base text-[#131b2e]">Dispute Arbitration Center</h3>
                  <p className="text-xs text-[#777587]">
                    Escrow-retained buyer claims requiring proof of delivery or RMA inspection.
                  </p>
                </div>

                <div className="space-y-4">
                  {state.disputes.map((dispute) => (
                    <div
                      key={dispute.id}
                      className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#131b2e]">{dispute.id}</span>
                          <span className="text-xs text-[#777587]">Order {dispute.orderId}</span>
                          <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">
                            {dispute.status}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-rose-600 font-mono">
                          ${dispute.amount.toFixed(2)} Retained
                        </span>
                      </div>

                      <p className="text-xs text-[#464555]">
                        <span className="font-semibold">{dispute.buyerName}:</span> {dispute.reason}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-[#777587] pt-2 border-t border-amber-200">
                        <span>{dispute.deadline}</span>
                        {!dispute.status.startsWith("Resolved") && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleResolveDispute(dispute.id, "refund")}
                              className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700"
                            >
                              Refund Buyer
                            </button>
                            <button
                              onClick={() => handleResolveDispute(dispute.id, "release")}
                              className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700"
                            >
                              Release to Vendor
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Operations Sidebar (Right 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Vendor Operations & Payout Drawer */}
            <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#131b2e] flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Vendor Operations & Payout Drawer
                  </h3>
                  <p className="text-[11px] text-[#777587]">Merchant ID #VX-8841 • Artisan Soundworks</p>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                  Live Payout Node
                </span>
              </div>

              {/* GMV and Revenue stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                  <div className="text-[10px] text-[#777587]">30-Day GMV</div>
                  <div className="text-xs font-extrabold text-[#131b2e] mt-0.5">$84,200</div>
                  <div className="text-[9px] text-emerald-600 font-semibold">+14.2% MoM</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                  <div className="text-[10px] text-[#777587]">Nexus Take</div>
                  <div className="text-xs font-extrabold text-rose-600 mt-0.5">-$10,104</div>
                  <div className="text-[9px] text-[#777587]">Auto-Deducted</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                  <div className="text-[10px] text-[#777587]">Net Revenue</div>
                  <div className="text-xs font-extrabold text-emerald-600 mt-0.5">$74,096</div>
                  <div className="text-[9px] text-[#777587]">Cleared to Date</div>
                </div>
              </div>

              {/* ACH Release Authorized Box */}
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-indigo-900">
                  <span>ACH RELEASE AUTHORIZED</span>
                  <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>

                <div>
                  <div className="text-2xl font-black text-indigo-950">
                    ${state.vendorPayoutBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-[#777587]">Ready for immediate disbursement</div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-indigo-200/60 text-[#464555]">
                  <span>Escrow Locked Buffer:</span>
                  <span className="font-bold text-[#131b2e]">${state.escrowLockedBuffer.toLocaleString()}</span>
                </div>

                <button
                  onClick={handleAuthorizePayout}
                  disabled={state.vendorPayoutBalance <= 0}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                    state.vendorPayoutBalance > 0
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-slate-200 text-[#777587] cursor-not-allowed"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  {state.vendorPayoutBalance > 0
                    ? `Authorize ACH Payout ($${state.vendorPayoutBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })})`
                    : "No Pending Payouts"}
                </button>

                <p className="text-[10px] text-[#777587] text-center">
                  Target Destination: JPMorgan Chase NA •••• 4821 (ACH Routing 021000021)
                </p>
              </div>
            </div>

            {/* Active Dispute Drawer Widget */}
            <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <h4 className="font-bold text-xs text-[#131b2e]">1 Active Dispute Case (#DIS-4091)</h4>
                </div>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                  Evidence Pending
                </span>
              </div>
              <p className="text-xs text-[#464555] leading-relaxed">
                In-transit carrier delay claim filed by buyer on order #ORD-9902. $185.00 automatically retained in arbitration escrow.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#f2f3ff] text-xs">
                <span className="text-[11px] text-[#777587]">Deadline: 18h remaining to supply BOL</span>
                <button
                  onClick={() => setActiveTab("disputes")}
                  className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                >
                  Review in Arbitration Center →
                </button>
              </div>
            </div>

            {/* Vendor Onboarding Queue */}
            <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#131b2e]">Vendor Onboarding Queue</h4>
                  <p className="text-[11px] text-[#777587]">Operator escrow bond verification & origin checks</p>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-600">2 Pending</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#131b2e]">Kromer Optical Labs</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      (state.approvedVendors?.includes("Kromer Optical Labs") || newVendorStatus["Kromer Optical Labs"] === "Approved & Active")
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-emerald-50 text-emerald-700"
                    }`}>
                      {(state.approvedVendors?.includes("Kromer Optical Labs") || newVendorStatus["Kromer Optical Labs"] === "Approved & Active")
                        ? "Approved & Active"
                        : "Pending Review"}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#777587]">
                    Certificate of Origin pending consular stamp (Munich, DE).
                  </p>
                  {!(state.approvedVendors?.includes("Kromer Optical Labs") || newVendorStatus["Kromer Optical Labs"] === "Approved & Active") && (
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleApproveVendor("Kromer Optical Labs")}
                        className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-[11px] font-semibold hover:bg-indigo-700"
                      >
                        Approve Merchant
                      </button>
                      <button
                        onClick={() => setPayoutNotification("Requested consular audit document resubmission from Kromer Optical Labs.")}
                        className="px-2.5 py-1 bg-white border border-[#dae2fd] text-[#464555] rounded-lg text-[11px] font-medium hover:bg-[#eaedff]"
                      >
                        Request Audit
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-3 rounded-xl border border-[#eaedff] bg-[#faf8ff] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#131b2e]">Vanguard Brassworks</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      newVendorStatus["Vanguard Brassworks"] === "Approved & Active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {newVendorStatus["Vanguard Brassworks"]}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#777587]">
                    Escrow Bond Deposited $5,000.00. Ready for Storefront Activation.
                  </p>
                  {newVendorStatus["Vanguard Brassworks"] !== "Approved & Active" && (
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleApproveVendor("Vanguard Brassworks")}
                        className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-[11px] font-semibold hover:bg-indigo-700"
                      >
                        Activate Storefront
                      </button>
                      <button
                        onClick={() => setPayoutNotification("Escrow Bond verified: $5,000.00 secured in smart contract.")}
                        className="px-2.5 py-1 bg-white border border-[#dae2fd] text-[#464555] rounded-lg text-[11px] font-medium hover:bg-[#eaedff]"
                      >
                        View Ledger
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Smart Contract Audit Badge */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#eaedff] flex items-center justify-between text-xs text-[#464555] shadow-sm">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <div className="font-bold text-[#131b2e]">Nexus Algorithmic Escrow V4.2</div>
                  <div className="text-[10px] text-[#777587]">Smart Split Contracts Audited by OpenZeppelin</div>
                </div>
              </div>
              <svg className="w-4 h-4 text-[#777587]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#eaedff] bg-white py-3 text-xs text-[#777587] mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span>Nexus Multi-Vendor Marketplace OS © 2025</span>
            <span>•</span>
            <span>Latency: 14ms (Zurich Edge Relay)</span>
            <span>•</span>
            <span className="text-emerald-600 font-medium">Ledger Status: Synchronized</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPayoutNotification("Audit log export generated.")}
              className="hover:text-indigo-600 flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Audit Logs
            </button>
            <button
              onClick={() => setPayoutNotification("System settings opened.")}
              className="hover:text-indigo-600 flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              System Settings
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default NexusMarketplaceApp;
