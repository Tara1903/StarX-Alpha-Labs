"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Store,
  Layers,
  ShoppingCart,
  Barcode,
  ArrowRightLeft,
  DollarSign,
  TrendingUp,
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Minus,
  Trash2,
  Search,
  Printer,
  CreditCard,
  QrCode,
  Coins,
  Split,
  PauseCircle,
  FileText,
  UserCheck,
  Building2,
  Clock,
  ShieldCheck,
  X,
  Volume2,
  VolumeX,
  ArrowUpRight,
} from "lucide-react";
import { toDemoModel, type DemoItem } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

interface StoreLocation {
  id: string;
  name: string;
  code: string;
  city: string;
  address: string;
  activeRegister: string;
  manager: string;
  status: "online" | "syncing" | "offline";
  todaySales: number;
  billsCleared: number;
}

interface PosProduct {
  id: string;
  sku: string;
  barcode: string;
  hsn: string;
  name: string;
  category: string;
  price: number;
  costPrice: number;
  taxRate: number; // e.g. 5, 12, 18
  imageUrl: string;
  stockByStore: Record<string, number>; // storeId -> quantity
  lowStockThreshold: number;
}

interface CartItem {
  productId: string;
  quantity: number;
  customDiscountPct?: number;
}

interface CompletedReceipt {
  receiptNo: string;
  timestamp: string;
  storeName: string;
  cashier: string;
  customerName: string;
  items: { name: string; sku: string; qty: number; unitPrice: number; total: number; taxRate: number }[];
  subtotal: number;
  discount: number;
  taxable: number;
  cgst: number;
  sgst: number;
  roundOff: number;
  grandTotal: number;
  paymentMethod: "Cash" | "Card" | "UPI" | "Split";
  tendered?: number;
  changeDue?: number;
}

interface StockTransfer {
  id: string;
  transferNo: string;
  fromStoreId: string;
  toStoreId: string;
  sku: string;
  productName: string;
  qty: number;
  status: "In Transit" | "Received" | "Pending Approval";
  dispatchedAt: string;
  dispatchedBy: string;
}

interface ShiftRecord {
  id: string;
  shiftNo: string;
  storeId: string;
  cashier: string;
  startedAt: string;
  openingFloat: number;
  cashSales: number;
  cardSales: number;
  upiSales: number;
  totalCollected: number;
  expectedInDrawer: number;
  actualCounted: number;
  status: "Open" | "Closed" | "Audited";
}

interface PosState {
  currentStoreId: string;
  activeShiftNo: string;
  cashierName: string;
  stores: StoreLocation[];
  products: PosProduct[];
  cart: CartItem[];
  heldCarts: { id: string; label: string; cart: CartItem[]; createdAt: string }[];
  activeCustomer: {
    name: string;
    phone: string;
    tier: string;
    points: number;
  };
  discountCode: string;
  discountPct: number;
  receiptHistory: CompletedReceipt[];
  transfers: StockTransfer[];
  shifts: ShiftRecord[];
}

const PULSETILL_SEED: PosState = {
  currentStoreId: "store-mumbai",
  activeShiftNo: "SHIFT-04",
  cashierName: "Rahul Verma (POS #02)",
  stores: [
    {
      id: "store-mumbai",
      name: "Flagship Mumbai (Inorbit Malad)",
      code: "BOM-01",
      city: "Mumbai",
      address: "G-14 Inorbit Mall, Malad West, Mumbai 400064",
      activeRegister: "Register #02 (Main)",
      manager: "Sunita Deshmukh",
      status: "online",
      todaySales: 248920,
      billsCleared: 142,
    },
    {
      id: "store-delhi",
      name: "Delhi Select Citywalk",
      code: "DEL-02",
      city: "New Delhi",
      address: "A-3 Saket District Centre, New Delhi 110017",
      activeRegister: "Register #01 (Express)",
      manager: "Aman Chawla",
      status: "online",
      todaySales: 184500,
      billsCleared: 98,
    },
    {
      id: "store-bengaluru",
      name: "Bengaluru Indiranagar 100ft",
      code: "BLR-03",
      city: "Bengaluru",
      address: "889 100 Feet Rd, HAL 2nd Stage, Bengaluru 560038",
      activeRegister: "Register #01",
      manager: "Kavita Reddy",
      status: "online",
      todaySales: 212400,
      billsCleared: 116,
    },
    {
      id: "store-pune",
      name: "Pune Phoenix Marketcity",
      code: "PUN-04",
      city: "Pune",
      address: "S-22 Viman Nagar, Pune 411014",
      activeRegister: "Register #01",
      manager: "Rohan Kulkarni",
      status: "online",
      todaySales: 96800,
      billsCleared: 54,
    },
  ],
  products: [
    {
      id: "p1",
      sku: "BEV-8821",
      barcode: "890100122301",
      hsn: "2202",
      name: "Arabica Cold Brew 330ml",
      category: "Beverages",
      price: 220,
      costPrice: 85,
      taxRate: 18,
      imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&auto=format&fit=crop&q=80",
      stockByStore: {
        "store-mumbai": 24,
        "store-delhi": 12,
        "store-bengaluru": 45,
        "store-pune": 18,
      },
      lowStockThreshold: 10,
    },
    {
      id: "p2",
      sku: "BAK-1049",
      barcode: "890100122302",
      hsn: "1905",
      name: "Artisan Sourdough Loaf",
      category: "Bakery & Deli",
      price: 180,
      costPrice: 65,
      taxRate: 5,
      imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80",
      stockByStore: {
        "store-mumbai": 4,
        "store-delhi": 15,
        "store-bengaluru": 8,
        "store-pune": 3,
      },
      lowStockThreshold: 6,
    },
    {
      id: "p3",
      sku: "BAK-4412",
      barcode: "890100122303",
      hsn: "1905",
      name: "Belgian Dark Chocolate Cookie",
      category: "Bakery & Deli",
      price: 95,
      costPrice: 32,
      taxRate: 5,
      imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&auto=format&fit=crop&q=80",
      stockByStore: {
        "store-mumbai": 48,
        "store-delhi": 30,
        "store-bengaluru": 22,
        "store-pune": 14,
      },
      lowStockThreshold: 12,
    },
    {
      id: "p4",
      sku: "BEV-9902",
      barcode: "890100122304",
      hsn: "0901",
      name: "Single Origin Espresso Beans 250g",
      category: "Beverages",
      price: 450,
      costPrice: 190,
      taxRate: 5,
      imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&auto=format&fit=crop&q=80",
      stockByStore: {
        "store-mumbai": 16,
        "store-delhi": 20,
        "store-bengaluru": 32,
        "store-pune": 9,
      },
      lowStockThreshold: 8,
    },
    {
      id: "p5",
      sku: "BEV-3310",
      barcode: "890100122305",
      hsn: "2202",
      name: "Organic Oat Milk Barista 1L",
      category: "Beverages",
      price: 290,
      costPrice: 140,
      taxRate: 12,
      imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&auto=format&fit=crop&q=80",
      stockByStore: {
        "store-mumbai": 38,
        "store-delhi": 18,
        "store-bengaluru": 40,
        "store-pune": 15,
      },
      lowStockThreshold: 10,
    },
    {
      id: "p6",
      sku: "ACC-5521",
      barcode: "890100122306",
      hsn: "6912",
      name: "Matte Ceramic Travel Mug 450ml",
      category: "Merchandise & Acc",
      price: 650,
      costPrice: 280,
      taxRate: 18,
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80",
      stockByStore: {
        "store-mumbai": 8,
        "store-delhi": 14,
        "store-bengaluru": 19,
        "store-pune": 4,
      },
      lowStockThreshold: 5,
    },
    {
      id: "p7",
      sku: "SNK-2011",
      barcode: "890100122307",
      hsn: "1904",
      name: "Himalayan Pink Salt Granola 350g",
      category: "Snacks",
      price: 320,
      costPrice: 130,
      taxRate: 12,
      imageUrl: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=300&auto=format&fit=crop&q=80",
      stockByStore: {
        "store-mumbai": 19,
        "store-delhi": 25,
        "store-bengaluru": 12,
        "store-pune": 8,
      },
      lowStockThreshold: 8,
    },
    {
      id: "p8",
      sku: "BEV-7714",
      barcode: "890100122308",
      hsn: "2009",
      name: "Cold-Pressed Valencia Orange 300ml",
      category: "Beverages",
      price: 190,
      costPrice: 75,
      taxRate: 12,
      imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&auto=format&fit=crop&q=80",
      stockByStore: {
        "store-mumbai": 2,
        "store-delhi": 8,
        "store-bengaluru": 14,
        "store-pune": 0,
      },
      lowStockThreshold: 5,
    },
  ],
  cart: [
    { productId: "p1", quantity: 2 },
    { productId: "p2", quantity: 1 },
    { productId: "p3", quantity: 2 },
    { productId: "p6", quantity: 1 },
  ],
  heldCarts: [],
  activeCustomer: {
    name: "Vikram Malhotra",
    phone: "+91 98201 45892",
    tier: "GOLD VIP",
    points: 1450,
  },
  discountCode: "GOLD10",
  discountPct: 10,
  receiptHistory: [
    {
      receiptNo: "REC-BOM-9821",
      timestamp: "Today, 14:18",
      storeName: "Flagship Mumbai",
      cashier: "Rahul Verma",
      customerName: "Riya Menon",
      items: [
        { name: "Single Origin Espresso Beans 250g", sku: "BEV-9902", qty: 2, unitPrice: 450, total: 900, taxRate: 5 },
        { name: "Matte Ceramic Travel Mug 450ml", sku: "ACC-5521", qty: 1, unitPrice: 650, total: 650, taxRate: 18 },
      ],
      subtotal: 1550,
      discount: 0,
      taxable: 1550,
      cgst: 81.25,
      sgst: 81.25,
      roundOff: 0.5,
      grandTotal: 1713,
      paymentMethod: "UPI",
    },
    {
      receiptNo: "REC-BOM-9820",
      timestamp: "Today, 13:52",
      storeName: "Flagship Mumbai",
      cashier: "Rahul Verma",
      customerName: "Vikram Kapoor",
      items: [
        { name: "Organic Oat Milk Barista 1L", sku: "BEV-3310", qty: 4, unitPrice: 290, total: 1160, taxRate: 12 },
        { name: "Arabica Cold Brew 330ml", sku: "BEV-8821", qty: 3, unitPrice: 220, total: 660, taxRate: 18 },
      ],
      subtotal: 1820,
      discount: 100,
      taxable: 1720,
      cgst: 124.2,
      sgst: 124.2,
      roundOff: -0.4,
      grandTotal: 1968,
      paymentMethod: "Card",
    },
  ],
  transfers: [
    {
      id: "tr-1",
      transferNo: "TR-2026-081",
      fromStoreId: "store-bengaluru",
      toStoreId: "store-mumbai",
      sku: "BEV-8821",
      productName: "Arabica Cold Brew 330ml",
      qty: 24,
      status: "In Transit",
      dispatchedAt: "Today, 11:30 AM",
      dispatchedBy: "Kavita Reddy",
    },
    {
      id: "tr-2",
      transferNo: "TR-2026-079",
      fromStoreId: "store-delhi",
      toStoreId: "store-pune",
      sku: "BEV-7714",
      productName: "Cold-Pressed Valencia Orange 300ml",
      qty: 12,
      status: "Received",
      dispatchedAt: "Yesterday, 16:00",
      dispatchedBy: "Aman Chawla",
    },
  ],
  shifts: [
    {
      id: "sh-4",
      shiftNo: "SHIFT-04",
      storeId: "store-mumbai",
      cashier: "Rahul Verma",
      startedAt: "Today, 08:00 AM",
      openingFloat: 5000,
      cashSales: 38450,
      cardSales: 94200,
      upiSales: 116270,
      totalCollected: 248920,
      expectedInDrawer: 43450,
      actualCounted: 43450,
      status: "Open",
    },
  ],
};

export function PulseTillMultiStorePosApp({ product }: { product: DemoItem }) {
  const model = useMemo(() => toDemoModel(product), [product]);
  const { state, setState, resetState, hasReset } = useDemoState<PosState>(product.slug, PULSETILL_SEED);

  const [activeTab, setActiveTab] = useState<"pos" | "inventory" | "transfers" | "register" | "reports">("pos");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [barcodeInput, setBarcodeInput] = useState<string>("");
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [audioBeep, setAudioBeep] = useState(true);

  // Modals
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<CompletedReceipt | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedTender, setSelectedTender] = useState<"Cash" | "Card" | "UPI" | "Split">("Cash");
  const [tenderCashAmount, setTenderCashAmount] = useState<string>("2000");
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferForm, setTransferForm] = useState({
    sku: "BEV-8821",
    fromStoreId: "store-mumbai",
    toStoreId: "store-pune",
    qty: 6,
  });
  const [quickAddModal, setQuickAddModal] = useState(false);
  const [newQuickSku, setNewQuickSku] = useState({
    name: "",
    sku: "",
    category: "Beverages",
    price: "150",
    stock: "20",
  });

  const currentStore = useMemo(() => {
    return state.stores.find((s) => s.id === state.currentStoreId) || state.stores[0];
  }, [state.stores, state.currentStoreId]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    state.products.forEach((p) => set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [state.products]);

  const filteredProducts = useMemo(() => {
    return state.products.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.barcode.includes(q);
      return matchCat && matchSearch;
    });
  }, [state.products, selectedCategory, searchQuery]);

  // Cart calculations
  const cartLines = useMemo(() => {
    return state.cart
      .map((item) => {
        const prod = state.products.find((p) => p.id === item.productId);
        if (!prod) return null;
        const lineTotal = prod.price * item.quantity;
        return {
          ...item,
          product: prod,
          lineTotal,
        };
      })
      .filter(Boolean) as { productId: string; quantity: number; product: PosProduct; lineTotal: number }[];
  }, [state.cart, state.products]);

  const subtotal = useMemo(() => cartLines.reduce((acc, l) => acc + l.lineTotal, 0), [cartLines]);
  const discountAmount = useMemo(() => Math.round((subtotal * state.discountPct) / 100), [subtotal, state.discountPct]);
  const taxableAmount = Math.max(0, subtotal - discountAmount);

  // Blended tax calculation (GST breakdown)
  const { cgst, sgst, totalTax } = useMemo(() => {
    let computedTax = 0;
    cartLines.forEach((line) => {
      const ratio = subtotal > 0 ? line.lineTotal / subtotal : 0;
      const lineTaxable = taxableAmount * ratio;
      computedTax += (lineTaxable * line.product.taxRate) / 100;
    });
    const half = Number((computedTax / 2).toFixed(2));
    return {
      cgst: half,
      sgst: half,
      totalTax: Number((half * 2).toFixed(2)),
    };
  }, [cartLines, subtotal, taxableAmount]);

  const rawPayable = taxableAmount + totalTax;
  const roundedPayable = Math.round(rawPayable);
  const roundOff = Number((roundedPayable - rawPayable).toFixed(2));

  // Cart actions
  const addToCart = (productId: string, delta = 1) => {
    setState((prev) => {
      const existing = prev.cart.find((c) => c.productId === productId);
      let newCart: CartItem[];
      if (existing) {
        newCart = prev.cart.map((c) => (c.productId === productId ? { ...c, quantity: Math.max(1, c.quantity + delta) } : c));
      } else {
        newCart = [...prev.cart, { productId, quantity: Math.max(1, delta) }];
      }
      return { ...prev, cart: newCart };
    });
  };

  const removeFromCart = (productId: string) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((c) => c.productId !== productId),
    }));
  };

  const clearCart = () => {
    setState((prev) => ({ ...prev, cart: [] }));
  };

  const holdCurrentCart = () => {
    if (state.cart.length === 0) return;
    const holdId = `HOLD-${Date.now().toString().slice(-4)}`;
    setState((prev) => ({
      ...prev,
      heldCarts: [
        ...prev.heldCarts,
        {
          id: holdId,
          label: `Parked #${holdId} (${prev.cart.length} items)`,
          cart: prev.cart,
          createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
      cart: [],
    }));
  };

  const recallHeldCart = (holdId: string) => {
    const target = state.heldCarts.find((h) => h.id === holdId);
    if (!target) return;
    setState((prev) => ({
      ...prev,
      heldCarts: prev.heldCarts.filter((h) => h.id !== holdId),
      cart: target.cart,
    }));
  };

  // Barcode quick scan lookup
  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;
    const match = state.products.find(
      (p) => p.barcode === barcodeInput.trim() || p.sku.toLowerCase() === barcodeInput.trim().toLowerCase()
    );
    if (match) {
      addToCart(match.id, 1);
      setBarcodeInput("");
    } else {
      alert(`Barcode/SKU "${barcodeInput}" not recognized in catalogue.`);
    }
  };

  // Complete checkout & print receipt
  const completeCheckout = () => {
    if (cartLines.length === 0) return;
    const receiptNo = `REC-${currentStore.code}-${Math.floor(1000 + Math.random() * 9000)}`;
    const tendered = selectedTender === "Cash" ? parseFloat(tenderCashAmount) || roundedPayable : roundedPayable;
    const changeDue = Math.max(0, tendered - roundedPayable);

    const newReceipt: CompletedReceipt = {
      receiptNo,
      timestamp: "Just now",
      storeName: currentStore.name,
      cashier: state.cashierName,
      customerName: state.activeCustomer.name,
      items: cartLines.map((l) => ({
        name: l.product.name,
        sku: l.product.sku,
        qty: l.quantity,
        unitPrice: l.product.price,
        total: l.lineTotal,
        taxRate: l.product.taxRate,
      })),
      subtotal,
      discount: discountAmount,
      taxable: taxableAmount,
      cgst,
      sgst,
      roundOff,
      grandTotal: roundedPayable,
      paymentMethod: selectedTender,
      tendered,
      changeDue,
    };

    // Deduct stock from current store
    setState((prev) => {
      const updatedProducts = prev.products.map((p) => {
        const inCart = prev.cart.find((c) => c.productId === p.id);
        if (!inCart) return p;
        const currentStock = p.stockByStore[prev.currentStoreId] || 0;
        return {
          ...p,
          stockByStore: {
            ...p.stockByStore,
            [prev.currentStoreId]: Math.max(0, currentStock - inCart.quantity),
          },
        };
      });

      const updatedStores = prev.stores.map((s) =>
        s.id === prev.currentStoreId
          ? {
              ...s,
              todaySales: s.todaySales + roundedPayable,
              billsCleared: s.billsCleared + 1,
            }
          : s
      );

      return {
        ...prev,
        products: updatedProducts,
        stores: updatedStores,
        cart: [],
        receiptHistory: [newReceipt, ...prev.receiptHistory],
      };
    });

    setActiveReceipt(newReceipt);
    setIsPaymentModalOpen(false);
    setIsReceiptModalOpen(true);
  };

  // Handle Inter-Store Stock Transfer
  const handleCreateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = state.products.find((p) => p.sku === transferForm.sku);
    if (!prod) return;
    const transferNo = `TR-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newTransfer: StockTransfer = {
      id: `tr-${Date.now()}`,
      transferNo,
      fromStoreId: transferForm.fromStoreId,
      toStoreId: transferForm.toStoreId,
      sku: prod.sku,
      productName: prod.name,
      qty: transferForm.qty,
      status: "In Transit",
      dispatchedAt: "Just now",
      dispatchedBy: state.cashierName,
    };

    setState((prev) => ({
      ...prev,
      transfers: [newTransfer, ...prev.transfers],
    }));

    setIsTransferModalOpen(false);
  };

  // Quick SKU addition
  const handleQuickAddSku = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuickSku.name || !newQuickSku.sku) return;
    const price = parseFloat(newQuickSku.price) || 100;
    const stock = parseInt(newQuickSku.stock) || 10;
    const newProduct: PosProduct = {
      id: `p-${Date.now()}`,
      sku: newQuickSku.sku.toUpperCase(),
      barcode: `89099${Math.floor(1000000 + Math.random() * 9000000)}`,
      hsn: "2202",
      name: newQuickSku.name,
      category: newQuickSku.category,
      price,
      costPrice: Math.round(price * 0.45),
      taxRate: 18,
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=80",
      stockByStore: {
        [state.currentStoreId]: stock,
      },
      lowStockThreshold: 5,
    };

    setState((prev) => ({
      ...prev,
      products: [newProduct, ...prev.products],
      cart: [...prev.cart, { productId: newProduct.id, quantity: 1 }],
    }));

    setQuickAddModal(false);
    setNewQuickSku({ name: "", sku: "", category: "Beverages", price: "150", stock: "20" });
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#111827] flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Bar: Store Switcher, Shift, Audio & POS Tools */}
      <header className="bg-[#0D1522] text-white border-b border-slate-800 px-3 py-2.5 flex flex-wrap items-center justify-between gap-2.5 shadow-md">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#059669] flex items-center justify-center font-black text-white text-sm tracking-tight shadow-sm">
              PT
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white">PulseTill POS</span>
                <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 hidden xs:inline-block">
                  v4.8
                </span>
              </div>
            </div>
          </div>

          {/* Store Switcher Pill */}
          <div className="flex items-center gap-1.5 bg-[#172234] border border-slate-700/80 px-2 py-1 rounded-lg">
            <Store className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <select
              value={state.currentStoreId}
              onChange={(e) => setState((prev) => ({ ...prev, currentStoreId: e.target.value }))}
              className="bg-transparent text-xs font-semibold text-slate-100 focus:outline-none cursor-pointer max-w-[140px] sm:max-w-[200px] truncate"
            >
              {state.stores.map((s) => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              12ms
            </span>
          </div>
        </div>

        {/* Center: Barcode Simulator Bar */}
        <form onSubmit={handleBarcodeSubmit} className="order-3 sm:order-2 w-full sm:flex-1 sm:max-w-md my-0.5 sm:my-0">
          <div className="relative w-full">
            <Barcode className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Scan barcode or SKU (e.g. BEV-8821)..."
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              className="w-full bg-[#172234] border border-slate-700 text-xs rounded-lg pl-9 pr-14 py-1.5 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-mono"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
              ↵ Scan
            </span>
          </div>
        </form>

        {/* Right Tools: Shift, Cashier, Audio, Reset, Customize */}
        <div className="order-2 sm:order-3 flex items-center gap-1.5">
          <div className="hidden xl:flex items-center gap-2 text-xs bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300 font-mono">{state.activeShiftNo}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Drawer: <strong className="text-white">₹38,450</strong></span>
          </div>

          <button
            onClick={() => setAudioBeep(!audioBeep)}
            title="Audio Beeper Toggle"
            className="p-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs"
          >
            {audioBeep ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          <button
            onClick={() => {
              resetState();
            }}
            className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>

          <button
            onClick={() => setIsCustomizeOpen(true)}
            className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors shadow-xs"
          >
            <Sliders className="w-3 h-3" />
            <span>Customize</span>
          </button>
        </div>
      </header>

      {/* Primary Sub-Nav Strip */}
      <nav className="bg-white border-b border-slate-200 px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab("pos")}
            className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "pos"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>POS Checkout</span>
            {cartLines.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === "pos" ? "bg-white text-emerald-700" : "bg-emerald-100 text-emerald-800"}`}>
                {cartLines.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("inventory")}
            className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "inventory"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Multi-Store Inventory</span>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-full font-mono">
              {state.stores.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("transfers")}
            className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "transfers"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Inter-Store Transfers</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-mono">
              {state.transfers.filter((t) => t.status === "In Transit").length} active
            </span>
          </button>

          <button
            onClick={() => setActiveTab("register")}
            className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "register"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Cash Register & Shifts</span>
          </button>

          <button
            onClick={() => setActiveTab("reports")}
            className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "reports"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Consolidated Reports</span>
          </button>
        </div>

        {/* Live Metrics Pill Strip */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Today Sales:</span>
            <strong className="text-slate-900 font-mono">₹{currentStore.todaySales.toLocaleString("en-IN")}</strong>
          </div>
          <div className="w-px h-3.5 bg-slate-300" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Bills Cleared:</span>
            <strong className="text-slate-900 font-mono">{currentStore.billsCleared}</strong>
          </div>
          <div className="w-px h-3.5 bg-slate-300" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Avg Basket:</span>
            <strong className="text-emerald-700 font-mono">
              ₹{Math.round(currentStore.todaySales / Math.max(1, currentStore.billsCleared)).toLocaleString("en-IN")}
            </strong>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-3 sm:p-4 max-w-[1600px] w-full mx-auto min-w-0">
        {/* VIEW 1: POS CHECKOUT TERMINAL */}
        {activeTab === "pos" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start min-w-0">
            {/* LEFT 65%: Category Bar + Product Tile Grid */}
            <div className="lg:col-span-8 flex flex-col gap-3 min-w-0">
              {/* Category selector + search + quick SKU */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 shadow-xs min-w-0">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 max-w-full">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                        selectedCategory === cat
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search title, SKU..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 w-36 sm:w-44"
                    />
                  </div>

                  <button
                    onClick={() => setQuickAddModal(true)}
                    className="flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Quick SKU</span>
                  </button>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredProducts.map((p) => {
                  const localStock = p.stockByStore[state.currentStoreId] || 0;
                  const isLow = localStock <= p.lowStockThreshold && localStock > 0;
                  const isOos = localStock === 0;

                  return (
                    <div
                      key={p.id}
                      className="bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                    >
                      {/* Product image & badges */}
                      <div className="relative h-28 bg-slate-100 overflow-hidden">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md shadow-xs ${
                              isOos
                                ? "bg-red-600/90 text-white"
                                : isLow
                                ? "bg-amber-500/95 text-white"
                                : "bg-emerald-600/90 text-white"
                            }`}
                          >
                            {isOos ? "Out of Stock" : `${localStock} in stock`}
                          </span>
                        </div>
                        <div className="absolute bottom-1 left-2 text-[10px] font-mono text-white/90 drop-shadow-md">
                          HSN {p.hsn} • GST {p.taxRate}%
                        </div>
                      </div>

                      {/* Info & Add button */}
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono text-slate-500 tracking-wider uppercase">{p.sku}</div>
                          <h3 className="text-xs font-bold text-slate-900 line-clamp-2 mt-0.5 leading-snug">{p.name}</h3>
                        </div>

                        <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Retail</span>
                            <strong className="text-sm font-extrabold text-slate-900 font-mono">
                              ₹{p.price.toLocaleString("en-IN")}
                            </strong>
                          </div>

                          <button
                            disabled={isOos}
                            onClick={() => addToCart(p.id, 1)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                              isOos
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs active:scale-95"
                            }`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Parked Carts Tray */}
              {state.heldCarts.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <PauseCircle className="w-4 h-4 text-amber-600" />
                    <div>
                      <span className="text-xs font-bold text-amber-900">
                        {state.heldCarts.length} Parked Bill(s) Available
                      </span>
                      <p className="text-[11px] text-amber-700">Recall a parked cart when the customer returns</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {state.heldCarts.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => recallHeldCart(h.id)}
                        className="text-xs font-bold bg-white text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg hover:bg-amber-100 transition-colors"
                      >
                        Recall {h.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT 35%: ACTIVE POS CART & TENDER PANEL */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden sticky top-4">
              {/* Customer Profile Strip */}
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-300">
                    VM
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">{state.activeCustomer.name}</span>
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200">
                        {state.activeCustomer.tier}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {state.activeCustomer.phone} • {state.activeCustomer.points} pts
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">BILL #{currentStore.code}-8841</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">{currentStore.activeRegister}</span>
                </div>
              </div>

              {/* Cart Item List */}
              <div className="p-3 divide-y divide-slate-100 max-h-[340px] overflow-y-auto">
                {cartLines.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
                    <p className="text-xs font-semibold text-slate-600">POS Cart is Empty</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Scan a barcode or tap products to ring up</p>
                  </div>
                ) : (
                  cartLines.map((line) => (
                    <div key={line.productId} className="py-2.5 flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="text-xs font-bold text-slate-900">{line.product.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {line.product.sku} • HSN {line.product.taxRate}% GST
                        </div>
                        <div className="text-xs font-mono text-slate-600 mt-1">
                          ₹{line.product.price} × {line.quantity}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <strong className="text-xs font-mono font-bold text-slate-900">
                          ₹{line.lineTotal.toLocaleString("en-IN")}
                        </strong>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                          <button
                            onClick={() => addToCart(line.productId, -1)}
                            className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-slate-800">{line.quantity}</span>
                          <button
                            onClick={() => addToCart(line.productId, 1)}
                            className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(line.productId)}
                            className="p-1 text-red-500 hover:bg-red-50 border-l border-slate-200 ml-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Discount Promo Badge */}
              <div className="px-3 py-2 bg-emerald-50/70 border-t border-b border-emerald-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold">{state.discountCode} (Member 10% Off)</span>
                </div>
                <strong className="font-mono text-emerald-700">-₹{discountAmount}</strong>
              </div>

              {/* Cart Financial Summary */}
              <div className="p-3 bg-slate-50/80 space-y-1.5 text-xs border-b border-slate-200 font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({cartLines.length} items)</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Member Discount ({state.discountPct}%)</span>
                  <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxable Amount</span>
                  <span>₹{taxableAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>CGST (Output)</span>
                  <span>₹{cgst.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>SGST (Output)</span>
                  <span>₹{sgst.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Round Off</span>
                  <span>{roundOff >= 0 ? `+₹${roundOff}` : `-₹${Math.abs(roundOff)}`}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-sans">
                  <span className="text-sm font-extrabold text-slate-900">TOTAL PAYABLE</span>
                  <span className="text-xl font-black font-mono text-emerald-600">
                    ₹{roundedPayable.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Quick Actions (Hold / Clear) */}
              <div className="p-2.5 bg-slate-100 flex items-center gap-2 border-b border-slate-200">
                <button
                  disabled={cartLines.length === 0}
                  onClick={holdCurrentCart}
                  className="flex-1 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center gap-1 transition-colors disabled:opacity-50"
                >
                  <PauseCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Hold Bill</span>
                </button>
                <button
                  disabled={cartLines.length === 0}
                  onClick={clearCart}
                  className="flex-1 py-1.5 text-xs font-semibold rounded-lg border border-red-200 bg-white hover:bg-red-50 text-red-600 flex items-center justify-center gap-1 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Void All</span>
                </button>
              </div>

              {/* TENDER LAUNCH BUTTON */}
              <div className="p-3 bg-white">
                <button
                  disabled={cartLines.length === 0}
                  onClick={() => setIsPaymentModalOpen(true)}
                  className={`w-full py-3.5 rounded-xl text-white font-extrabold text-sm flex items-center justify-between px-4 transition-all shadow-md ${
                    cartLines.length === 0
                      ? "bg-slate-300 cursor-not-allowed"
                      : "bg-[#059669] hover:bg-[#047857] active:scale-98 shadow-emerald-500/20"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                    <span>Complete Sale & Print</span>
                  </span>
                  <span className="font-mono text-base">₹{roundedPayable.toLocaleString("en-IN")}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: MULTI-STORE INVENTORY MATRIX */}
        {activeTab === "inventory" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div>
                <h2 className="text-base font-bold text-slate-900">Multi-Location Inventory Matrix</h2>
                <p className="text-xs text-slate-500">Real-time stock across all 4 operational store nodes & hub warehouse</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTransferModalOpen(true)}
                  className="text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>New Stock Transfer</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">SKU / Item</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Retail Price</th>
                      {state.stores.map((s) => (
                        <th key={s.id} className="py-3 px-4 font-mono text-center">
                          {s.code}
                          <span className="block text-[10px] font-normal lowercase text-slate-400">{s.city}</span>
                        </th>
                      ))}
                      <th className="py-3 px-4 text-center">Total Stock</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {state.products.map((p) => {
                      const totalAcrossStores = Object.values(p.stockByStore).reduce((a, b) => a + b, 0);
                      return (
                        <tr key={p.id} className="hover:bg-slate-50/70">
                          <td className="py-3 px-4 font-mono">
                            <span className="font-bold text-slate-900">{p.sku}</span>
                            <span className="block font-sans text-xs text-slate-600">{p.name}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            ₹{p.price.toLocaleString("en-IN")}
                          </td>
                          {state.stores.map((s) => {
                            const count = p.stockByStore[s.id] || 0;
                            const isLow = count <= p.lowStockThreshold && count > 0;
                            const isZero = count === 0;
                            return (
                              <td key={s.id} className="py-3 px-4 text-center font-mono">
                                <span
                                  className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                                    isZero
                                      ? "bg-red-100 text-red-700"
                                      : isLow
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-emerald-50 text-emerald-700"
                                  }`}
                                >
                                  {count}
                                </span>
                              </td>
                            );
                          })}
                          <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">
                            {totalAcrossStores} pcs
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => {
                                setTransferForm((prev) => ({ ...prev, sku: p.sku }));
                                setIsTransferModalOpen(true);
                              }}
                              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                            >
                              Transfer →
                            </button>
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

        {/* VIEW 3: INTER-STORE TRANSFERS */}
        {activeTab === "transfers" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div>
                <h2 className="text-base font-bold text-slate-900">Inter-Store Stock Movement & Transfers</h2>
                <p className="text-xs text-slate-500">Track and dispatch inventory requisitions between retail nodes</p>
              </div>
              <button
                onClick={() => setIsTransferModalOpen(true)}
                className="text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Transfer Order</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">Active In-Transit Units</span>
                <strong className="text-2xl font-extrabold text-amber-600 font-mono mt-1 block">
                  {state.transfers
                    .filter((t) => t.status === "In Transit")
                    .reduce((a, b) => a + b.qty, 0)}{" "}
                  pcs
                </strong>
                <span className="text-[11px] text-slate-400 mt-1 block">Across 2 active delivery routes</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">Completed Today</span>
                <strong className="text-2xl font-extrabold text-emerald-600 font-mono mt-1 block">12 pcs</strong>
                <span className="text-[11px] text-slate-400 mt-1 block">Delhi → Pune route</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">Avg Inter-Store Transit Time</span>
                <strong className="text-2xl font-extrabold text-slate-900 font-mono mt-1 block">18.4 hrs</strong>
                <span className="text-[11px] text-slate-400 mt-1 block">Dedicated store shuttle</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-3 border-b border-slate-200 bg-slate-50 font-bold text-xs text-slate-800">
                Active & Recent Transfers Ledger
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50/50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-4">Transfer #</th>
                      <th className="py-2.5 px-4">SKU & Item</th>
                      <th className="py-2.5 px-4">From Store</th>
                      <th className="py-2.5 px-4">To Destination</th>
                      <th className="py-2.5 px-4 text-center">Qty</th>
                      <th className="py-2.5 px-4">Status</th>
                      <th className="py-2.5 px-4">Dispatched By</th>
                      <th className="py-2.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {state.transfers.map((tr) => {
                      const fromStore = state.stores.find((s) => s.id === tr.fromStoreId);
                      const toStore = state.stores.find((s) => s.id === tr.toStoreId);
                      return (
                        <tr key={tr.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">{tr.transferNo}</td>
                          <td className="py-3 px-4 font-mono">
                            <span className="font-bold text-slate-800">{tr.sku}</span>
                            <span className="block font-sans text-xs text-slate-600">{tr.productName}</span>
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-700">{fromStore?.name || tr.fromStoreId}</td>
                          <td className="py-3 px-4 font-medium text-slate-700">{toStore?.name || tr.toStoreId}</td>
                          <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">{tr.qty} pcs</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                tr.status === "In Transit"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {tr.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500">
                            <div>{tr.dispatchedBy}</div>
                            <div className="text-[10px] text-slate-400">{tr.dispatchedAt}</div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {tr.status === "In Transit" ? (
                              <button
                                onClick={() => {
                                  setState((prev) => ({
                                    ...prev,
                                    transfers: prev.transfers.map((t) =>
                                      t.id === tr.id ? { ...t, status: "Received" } : t
                                    ),
                                  }));
                                }}
                                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200"
                              >
                                Mark Received
                              </button>
                            ) : (
                              <span className="text-[11px] text-slate-400">Archived</span>
                            )}
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

        {/* VIEW 4: CASH REGISTER & SHIFT RECONCILIATION */}
        {activeTab === "register" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div>
                <h2 className="text-base font-bold text-slate-900">Cash Register & Shift Management</h2>
                <p className="text-xs text-slate-500">
                  Daily drawer counts, tender reconciliation, and cash-drop audits for {currentStore.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-300 font-bold">
                  Drawer Status: BALANCED
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">Opening Cash Float</span>
                <strong className="text-xl font-bold font-mono text-slate-900 mt-1 block">₹5,000</strong>
                <span className="text-[11px] text-slate-400">Verified by {state.cashierName}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">Cash Tender in Drawer</span>
                <strong className="text-xl font-bold font-mono text-emerald-700 mt-1 block">₹38,450</strong>
                <span className="text-[11px] text-slate-400">32 cash receipts today</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">Digital Tenders (UPI + Card)</span>
                <strong className="text-xl font-bold font-mono text-blue-700 mt-1 block">₹2,10,470</strong>
                <span className="text-[11px] text-slate-400">110 electronic transactions</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">Discrepancy / Over-Short</span>
                <strong className="text-xl font-bold font-mono text-emerald-600 mt-1 block">₹0.00</strong>
                <span className="text-[11px] text-slate-400">100% matched with POS slips</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Recent Closed Shift Audits
              </h3>
              <div className="divide-y divide-slate-100 text-xs font-mono">
                {state.shifts.map((sh) => (
                  <div key={sh.id} className="py-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-slate-900">{sh.shiftNo}</span>
                      <span className="text-slate-500 ml-2">Cashier: {sh.cashier}</span>
                      <div className="text-[11px] text-slate-400 font-sans mt-0.5">Started at {sh.startedAt}</div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-slate-400 text-[11px] block">Cash Collected</span>
                        <strong className="text-slate-800">₹{sh.cashSales.toLocaleString("en-IN")}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block">Total Shift Revenue</span>
                        <strong className="text-emerald-700">₹{sh.totalCollected.toLocaleString("en-IN")}</strong>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {sh.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: CONSOLIDATED MULTI-LOCATION REPORTING */}
        {activeTab === "reports" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div>
                <h2 className="text-base font-bold text-slate-900">Consolidated Retail Performance</h2>
                <p className="text-xs text-slate-500">Cross-store daily revenue, ticket size, and tender reconciliation</p>
              </div>
              <span className="text-xs font-mono text-slate-500">Live Date: Today, Nov 12</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {state.stores.map((s) => (
                <div key={s.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                      {s.code}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase">Active</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-2">{s.name}</h3>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="text-xs text-slate-500">Today Sales</span>
                    <strong className="text-base font-black font-mono text-slate-900">
                      ₹{s.todaySales.toLocaleString("en-IN")}
                    </strong>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-slate-500">
                    <span>Receipts</span>
                    <span className="font-mono">{s.billsCleared} checks</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Receipt History Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-3 border-b border-slate-200 bg-slate-50 font-bold text-xs text-slate-800 flex justify-between">
                <span>Recent Settle Slips & Tenders</span>
                <span className="text-slate-400 font-normal">{state.receiptHistory.length} cleared bills logged</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50/50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-4">Receipt #</th>
                      <th className="py-2.5 px-4">Time</th>
                      <th className="py-2.5 px-4">Store</th>
                      <th className="py-2.5 px-4">Customer</th>
                      <th className="py-2.5 px-4">Method</th>
                      <th className="py-2.5 px-4 text-right">Grand Total</th>
                      <th className="py-2.5 px-4 text-right">Reprint</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {state.receiptHistory.map((rec) => (
                      <tr key={rec.receiptNo} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-bold text-slate-900">{rec.receiptNo}</td>
                        <td className="py-2.5 px-4 text-slate-500">{rec.timestamp}</td>
                        <td className="py-2.5 px-4 text-slate-700 font-sans">{rec.storeName}</td>
                        <td className="py-2.5 px-4 text-slate-700 font-sans">{rec.customerName}</td>
                        <td className="py-2.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800">
                            {rec.paymentMethod}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                          ₹{rec.grandTotal.toLocaleString("en-IN")}
                        </td>
                        <td className="py-2.5 px-4 text-right">
                          <button
                            onClick={() => {
                              setActiveReceipt(rec);
                              setIsReceiptModalOpen(true);
                            }}
                            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1 justify-end ml-auto"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Slip</span>
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
      </main>

      {/* FOOTER SHORTCUTS STRIP */}
      <footer className="bg-white border-t border-slate-200 px-3 py-2 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-700">Shortcuts:</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[10px]">F2</kbd> Scan</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[10px]">F4</kbd> Hold</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[10px]">F7</kbd> Cash</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[10px]">↵</kbd> Settle</span>
        </div>
        <div className="flex items-center gap-2 truncate max-w-full">
          <span className="truncate">Node: <strong className="text-slate-800">{currentStore.name}</strong></span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
        </div>
      </footer>

      {/* MODAL 1: PAYMENT METHOD / TENDER SELECTION */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Select Payment Tender</h3>
                <p className="text-xs text-slate-400">Total Due: <strong className="text-emerald-400 font-mono">₹{roundedPayable.toLocaleString("en-IN")}</strong></p>
              </div>
              <button onClick={() => setIsPaymentModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Payment Method Selector Grid */}
              <div className="grid grid-cols-2 gap-2">
                {(["Cash", "Card", "UPI", "Split"] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setSelectedTender(method)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      selectedTender === method
                        ? "border-emerald-600 bg-emerald-50/80 text-emerald-950 font-bold shadow-xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    {method === "Cash" && <Coins className="w-5 h-5 text-emerald-600" />}
                    {method === "Card" && <CreditCard className="w-5 h-5 text-blue-600" />}
                    {method === "UPI" && <QrCode className="w-5 h-5 text-purple-600" />}
                    {method === "Split" && <Split className="w-5 h-5 text-amber-600" />}
                    <div>
                      <div className="text-xs font-bold">{method} Tender</div>
                      <div className="text-[10px] text-slate-500">
                        {method === "Cash" ? "Cash drawer count" : method === "UPI" ? "Dynamic BharatQR" : "EDC Terminal"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Cash Tender Calculation */}
              {selectedTender === "Cash" && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-800 block">Cash Tendered by Customer</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={tenderCashAmount}
                      onChange={(e) => setTenderCashAmount(e.target.value)}
                      className="text-base font-mono font-bold bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 w-36 focus:outline-none focus:border-emerald-500"
                    />
                    <div className="flex gap-1">
                      {["500", "1000", "2000"].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setTenderCashAmount(v)}
                          className="px-2 py-1 text-xs font-mono font-bold bg-slate-200 hover:bg-slate-300 rounded text-slate-800"
                        >
                          ₹{v}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs pt-2 border-t border-slate-200">
                    <span className="text-slate-500">Change Due to Customer:</span>
                    <strong className="font-mono text-emerald-700 text-sm">
                      ₹{Math.max(0, (parseFloat(tenderCashAmount) || 0) - roundedPayable).toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>
              )}

              {/* UPI QR Simulation */}
              {selectedTender === "UPI" && (
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center space-y-2">
                  <QrCode className="w-16 h-16 text-purple-700 mx-auto" />
                  <p className="text-xs font-bold text-purple-950">Dynamic UPI / BharatQR Displayed on Customer Screen</p>
                  <p className="text-[11px] text-purple-700 font-mono">Amount: ₹{roundedPayable.toLocaleString("en-IN")}</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={completeCheckout}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Print Bill</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: THERMAL RECEIPT SLIP PREVIEW */}
      {isReceiptModalOpen && activeReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-300 shadow-2xl max-w-sm w-full p-5 space-y-3 font-mono text-xs">
            <div className="text-center border-b border-dashed border-slate-300 pb-3">
              <h2 className="text-sm font-black tracking-tight text-slate-900 uppercase">PULSETILL RETAIL</h2>
              <p className="text-[10px] text-slate-600">{activeReceipt.storeName}</p>
              <p className="text-[10px] text-slate-400">GSTIN: 27AABCP8841Z1ZT</p>
              <p className="text-[10px] text-slate-500 mt-1">Receipt #{activeReceipt.receiptNo} • {activeReceipt.timestamp}</p>
              <p className="text-[10px] text-slate-500">Cashier: {activeReceipt.cashier}</p>
            </div>

            <div className="divide-y divide-dashed divide-slate-200 py-1">
              {activeReceipt.items.map((it, idx) => (
                <div key={idx} className="py-1.5 flex justify-between">
                  <div>
                    <div className="font-bold text-slate-900">{it.name}</div>
                    <div className="text-[10px] text-slate-500">{it.sku} (₹{it.unitPrice} × {it.qty})</div>
                  </div>
                  <strong className="text-slate-900">₹{it.total}</strong>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-slate-300 pt-2 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{activeReceipt.subtotal}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Discount</span>
                <span>-₹{activeReceipt.discount}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>CGST / SGST</span>
                <span>₹{activeReceipt.cgst + activeReceipt.sgst}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-slate-900 pt-1 border-t border-slate-300">
                <span>GRAND TOTAL</span>
                <span>₹{activeReceipt.grandTotal}</span>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                <span>Tender: {activeReceipt.paymentMethod}</span>
                {activeReceipt.tendered && <span>Paid: ₹{activeReceipt.tendered} (Change: ₹{activeReceipt.changeDue})</span>}
              </div>
            </div>

            <div className="border-t border-dashed border-slate-300 pt-3 text-center text-[10px] text-slate-400">
              <p>*** THANK YOU FOR VISITING ***</p>
              <p className="mt-0.5">Please retain this receipt for returns within 14 days.</p>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => setIsReceiptModalOpen(false)}
                className="w-full py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800"
              >
                Close & Next Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: INTER-STORE TRANSFER CREATOR */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold">New Inter-Store Transfer Order</h3>
              </div>
              <button onClick={() => setIsTransferModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTransfer} className="p-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Product to Transfer</label>
                <select
                  value={transferForm.sku}
                  onChange={(e) => setTransferForm({ ...transferForm, sku: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2 font-mono"
                >
                  {state.products.map((p) => (
                    <option key={p.id} value={p.sku}>
                      {p.sku} — {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Source Store</label>
                  <select
                    value={transferForm.fromStoreId}
                    onChange={(e) => setTransferForm({ ...transferForm, fromStoreId: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2"
                  >
                    {state.stores.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.code} ({s.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Destination Store</label>
                  <select
                    value={transferForm.toStoreId}
                    onChange={(e) => setTransferForm({ ...transferForm, toStoreId: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2"
                  >
                    {state.stores.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.code} ({s.city})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Transfer Quantity (Units)</label>
                <input
                  type="number"
                  min="1"
                  value={transferForm.qty}
                  onChange={(e) => setTransferForm({ ...transferForm, qty: parseInt(e.target.value) || 1 })}
                  className="w-full border border-slate-300 rounded-lg p-2 font-mono font-bold"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-500 text-[11px]">
                Inter-store stock will decrement immediately from source upon dispatch and generate courier tracking.
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTransferModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xs"
                >
                  Dispatch Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: QUICK SKU CREATOR */}
      {quickAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold">Quick Catalogue Item Entry</h3>
              </div>
              <button onClick={() => setQuickAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleQuickAddSku} className="p-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Nitro Cold Brew Can"
                  value={newQuickSku.name}
                  onChange={(e) => setNewQuickSku({ ...newQuickSku, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">SKU Code</label>
                  <input
                    type="text"
                    placeholder="BEV-9944"
                    value={newQuickSku.sku}
                    onChange={(e) => setNewQuickSku({ ...newQuickSku, sku: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 font-mono uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newQuickSku.category}
                    onChange={(e) => setNewQuickSku({ ...newQuickSku, category: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2"
                  >
                    <option value="Beverages">Beverages</option>
                    <option value="Bakery & Deli">Bakery & Deli</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Merchandise & Acc">Merchandise & Acc</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Retail Price (₹)</label>
                  <input
                    type="number"
                    value={newQuickSku.price}
                    onChange={(e) => setNewQuickSku({ ...newQuickSku, price: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Initial Stock (Units)</label>
                  <input
                    type="number"
                    value={newQuickSku.stock}
                    onChange={(e) => setNewQuickSku({ ...newQuickSku, stock: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setQuickAddModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xs"
                >
                  Save & Add to POS
                </button>
              </div>
            </form>
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
