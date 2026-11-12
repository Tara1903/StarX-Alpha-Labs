"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Cpu,
  Smartphone,
  Laptop,
  Headphones,
  HardDrive,
  ShieldCheck,
  Wrench,
  QrCode,
  Barcode,
  Search,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sliders,
  DollarSign,
  TrendingUp,
  Building2,
  ChevronRight,
  Printer,
  X,
  CreditCard,
  Zap,
  ArrowRightLeft,
} from "lucide-react";
import { toDemoModel, type DemoItem } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

interface TechProduct {
  id: string;
  sku: string;
  brand: string;
  model: string;
  category: "Smartphones" | "Laptops" | "Audio" | "Workstations";
  price: number;
  originalPrice?: number;
  costPrice: number;
  specs: {
    soc: string;
    ramStorage: string;
    display: string;
    batteryOptics: string;
  };
  availableImeis: string[];
  vaultBin: string;
  warrantyType: "VoltCare Eligible" | "AppleCare+ Ready" | "ProSupport 3Yr";
  imageUrl: string;
}

interface StagedTechItem {
  productId: string;
  assignedImei: string;
  voltCareExtended: boolean;
  unitPrice: number;
  warrantyPrice: number;
}

interface RmaTicket {
  id: string;
  ticketNo: string;
  customerName: string;
  deviceModel: string;
  imei: string;
  issueDescription: string;
  stage: "Diagnostics" | "Parts Awaiting" | "Bench Testing" | "Ready for Pickup";
  technician: string;
  repairCost: number;
  createdAt: string;
}

interface ElectronicsState {
  currentBranch: string;
  activeCategory: string;
  selectedBrand: string;
  products: TechProduct[];
  stagedItems: StagedTechItem[];
  customer: {
    name: string;
    phone: string;
    gstin: string;
  };
  tradeIn: {
    enabled: boolean;
    device: string;
    grade: "Grade A" | "Grade B" | "Grade C";
    creditValue: number;
  };
  rmaTickets: RmaTicket[];
  warrantyRegistry: {
    id: string;
    imei: string;
    customerName: string;
    productName: string;
    plan: string;
    expiryDate: string;
    status: "Active" | "Claim in Progress" | "Expired";
  }[];
  salesOrders: {
    orderNo: string;
    date: string;
    customerName: string;
    total: number;
    itemsSummary: string;
    imeiManifest: string[];
  }[];
}

const VOLTRIX_SEED: ElectronicsState = {
  currentBranch: "Voltrix Flagship Tech Hub - Bengaluru",
  activeCategory: "All Categories",
  selectedBrand: "All Brands",
  customer: {
    name: "Vikram Sharma",
    phone: "+91 98860 49210",
    gstin: "29AABCU9603R1ZM",
  },
  tradeIn: {
    enabled: true,
    device: "Apple iPhone 13 128GB (Midnight)",
    grade: "Grade A",
    creditValue: 28500,
  },
  stagedItems: [
    {
      productId: "tech-1",
      assignedImei: "359482-08-129301-9",
      voltCareExtended: true,
      unitPrice: 129999,
      warrantyPrice: 8499,
    },
    {
      productId: "tech-3",
      assignedImei: "SN-8840291-J",
      voltCareExtended: false,
      unitPrice: 29990,
      warrantyPrice: 0,
    },
  ],
  products: [
    {
      id: "tech-1",
      sku: "SM-S928B-512",
      brand: "Samsung",
      model: "Galaxy S24 Ultra",
      category: "Smartphones",
      price: 129999,
      originalPrice: 134999,
      costPrice: 94000,
      specs: {
        soc: "Snapdragon 8 Gen 3 (4nm)",
        ramStorage: "12GB LPDDR5X | 512GB UFS 4.0",
        display: "6.8\" 120Hz Dynamic AMOLED 2600nits",
        batteryOptics: "200MP Quad • 5000mAh 45W Fast",
      },
      availableImeis: ["359482-08-129301-9", "359482-08-129302-7", "359482-08-129303-5"],
      vaultBin: "Vault Bin A-12",
      warrantyType: "VoltCare Eligible",
      imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: "tech-2",
      sku: "MU773HN/A",
      brand: "Apple",
      model: "iPhone 15 Pro Max",
      category: "Smartphones",
      price: 156900,
      costPrice: 118000,
      specs: {
        soc: "Apple A17 Pro (3nm 6-Core)",
        ramStorage: "8GB Unified | 256GB NVMe",
        display: "6.7\" Super Retina XDR 120Hz ProMotion",
        batteryOptics: "48MP 5x Tetraprism • USB-C 10Gbps",
      },
      availableImeis: ["352901-11-884912-3", "352901-11-884914-9"],
      vaultBin: "Vault Bin A-04",
      warrantyType: "AppleCare+ Ready",
      imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: "tech-3",
      sku: "SONY-WHXM5-SLV",
      brand: "Sony",
      model: "WH-1000XM5 ANC Headset",
      category: "Audio",
      price: 29990,
      originalPrice: 34990,
      costPrice: 19500,
      specs: {
        soc: "HD QN1 + V1 Dual Co-Processor",
        ramStorage: "Hi-Res LDAC / DSEE Extreme",
        display: "Capacitive Touch Surface",
        batteryOptics: "30 hrs ANC On • 3m Fast Chg (3h)",
      },
      availableImeis: ["SN-8840291-J", "SN-8840292-K"],
      vaultBin: "Rack C-02",
      warrantyType: "VoltCare Eligible",
      imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: "tech-4",
      sku: "XPS-9640-U9",
      brand: "Dell",
      model: "XPS 16 OLED Workstation",
      category: "Workstations",
      price: 284990,
      costPrice: 215000,
      specs: {
        soc: "Intel Core Ultra 9 185H (16-Core)",
        ramStorage: "32GB LPDDR5X | 1TB Gen4 NVMe",
        display: "16.3\" 4K+ 120Hz OLED InfinityEdge",
        batteryOptics: "NVIDIA RTX 4070 8GB • 99.5Whr",
      },
      availableImeis: ["DELL-ST-77X9211", "DELL-ST-77X9212"],
      vaultBin: "Safe Cage #1",
      warrantyType: "ProSupport 3Yr",
      imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: "tech-5",
      sku: "MUW63HN/A",
      brand: "Apple",
      model: "MacBook Pro 16\" M3 Max",
      category: "Laptops",
      price: 349900,
      costPrice: 265000,
      specs: {
        soc: "Apple M3 Max (16-Core CPU, 40-Core GPU)",
        ramStorage: "36GB Unified Memory | 1TB SSD",
        display: "16.2\" Liquid Retina XDR 1600nits",
        batteryOptics: "100Whr Battery • MagSafe 3 140W",
      },
      availableImeis: ["APP-MBP-992144-X"],
      vaultBin: "Vault Bin B-01",
      warrantyType: "AppleCare+ Ready",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: "tech-6",
      sku: "GU605MY-QS",
      brand: "Asus",
      model: "ROG Zephyrus G16 OLED",
      category: "Laptops",
      price: 249990,
      costPrice: 182000,
      specs: {
        soc: "Intel Core Ultra 9 185H NPU AI",
        ramStorage: "32GB LPDDR5X | 2TB PCIe Gen4",
        display: "16\" 2.5K 240Hz OLED ROG Nebula",
        batteryOptics: "NVIDIA RTX 4080 12GB • 90Whr",
      },
      availableImeis: ["ASUS-ROG-90214"],
      vaultBin: "Rack B-08",
      warrantyType: "VoltCare Eligible",
      imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=80",
    },
  ],
  rmaTickets: [
    {
      id: "rma-1",
      ticketNo: "RMA-2026-084",
      customerName: "Rohan Nambiar",
      deviceModel: "Samsung Galaxy S23 Ultra",
      imei: "359124-09-881204-1",
      issueDescription: "Display digitizer dead zone after drop; test ultrasonic fingerprint sensor.",
      stage: "Diagnostics",
      technician: "Arjun V. (Sr. Lead)",
      repairCost: 14500,
      createdAt: "Today, 10:15 AM",
    },
    {
      id: "rma-2",
      ticketNo: "RMA-2026-081",
      customerName: "Karan Johar",
      deviceModel: "MacBook Pro 14\" M2",
      imei: "APP-MBP-812044-A",
      issueDescription: "Battery swelling warning; cycle count 780; replace battery pack.",
      stage: "Parts Awaiting",
      technician: "Megha S.",
      repairCost: 18900,
      createdAt: "Yesterday",
    },
    {
      id: "rma-3",
      ticketNo: "RMA-2026-077",
      customerName: "Sneha Rao",
      deviceModel: "Sony WH-1000XM4",
      imei: "SN-7729104-E",
      issueDescription: "Left earcup ANC hiss at high volume. Transducer calibrated.",
      stage: "Ready for Pickup",
      technician: "Arjun V.",
      repairCost: 3200,
      createdAt: "Nov 10",
    },
  ],
  warrantyRegistry: [
    {
      id: "war-1",
      imei: "359482-08-129301-9",
      customerName: "Vikram Sharma",
      productName: "Samsung Galaxy S24 Ultra",
      plan: "VoltCare Platinum 2-Year (Accidental + Liquid)",
      expiryDate: "Nov 12, 2028",
      status: "Active",
    },
    {
      id: "war-2",
      imei: "DELL-ST-77X9211",
      customerName: "Zeta Analytics Pvt Ltd",
      productName: "Dell XPS 16 OLED",
      plan: "Dell ProSupport Plus 3-Year On-Site",
      expiryDate: "Mar 15, 2029",
      status: "Active",
    },
  ],
  salesOrders: [
    {
      orderNo: "ORD-VTX-9041",
      date: "Today, 12:40",
      customerName: "Ananya Roy",
      total: 156900,
      itemsSummary: "Apple iPhone 15 Pro Max 256GB (Natural Titanium)",
      imeiManifest: ["352901-11-884912-3"],
    },
  ],
};

export function VoltrixElectronicsApp({ product }: { product: DemoItem }) {
  const model = useMemo(() => toDemoModel(product), [product]);
  const { state, setState, resetState } = useDemoState<ElectronicsState>(product.slug, VOLTRIX_SEED);

  const [activeTab, setActiveTab] = useState<"pos" | "specs" | "serials" | "rma" | "warranty" | "suppliers">("pos");
  const [imeiScanInput, setImeiScanInput] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isAddTechModalOpen, setIsAddTechModalOpen] = useState(false);
  const [isNewRmaModalOpen, setIsNewRmaModalOpen] = useState(false);
  const [receiptCompleteModal, setReceiptCompleteModal] = useState(false);

  // New product form
  const [newTechForm, setNewTechForm] = useState({
    sku: "APL-IP16-PRO",
    brand: "Apple",
    model: "iPhone 16 Pro Desert Titanium",
    category: "Smartphones" as const,
    price: "134900",
    soc: "Apple A18 Pro (3nm)",
    ram: "8GB Unified | 128GB NVMe",
    display: "6.3\" ProMotion 120Hz OLED",
    battery: "48MP Fusion • 3582mAh",
    initialImei: "358810-09-994102-1",
  });

  // Filtered catalogue
  const brands = useMemo(() => {
    const set = new Set<string>();
    state.products.forEach((p) => set.add(p.brand));
    return ["All Brands", ...Array.from(set)];
  }, [state.products]);

  const filteredProducts = useMemo(() => {
    return state.products.filter((p) => {
      const matchBrand = state.selectedBrand === "All Brands" || p.brand === state.selectedBrand;
      const matchCat = state.activeCategory === "All Categories" || p.category === state.activeCategory;
      const q = searchFilter.toLowerCase();
      const matchSearch =
        !q ||
        p.model.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.specs.soc.toLowerCase().includes(q) ||
        p.specs.ramStorage.toLowerCase().includes(q);
      return matchBrand && matchCat && matchSearch;
    });
  }, [state.products, state.selectedBrand, state.activeCategory, searchFilter]);

  // Calculations for staged items
  const hardwareSubtotal = useMemo(() => {
    return state.stagedItems.reduce((acc, it) => acc + it.unitPrice, 0);
  }, [state.stagedItems]);

  const warrantySubtotal = useMemo(() => {
    return state.stagedItems.reduce((acc, it) => acc + (it.voltCareExtended ? it.warrantyPrice : 0), 0);
  }, [state.stagedItems]);

  const tradeInCredit = state.tradeIn.enabled ? state.tradeIn.creditValue : 0;
  const taxableAmount = Math.max(0, hardwareSubtotal + warrantySubtotal - tradeInCredit);
  const gstTax = Math.round((taxableAmount * 18) / 100);
  const grandTotal = taxableAmount + gstTax;

  // Actions
  const handleAssignImei = (productId: string) => {
    const targetProd = state.products.find((p) => p.id === productId);
    if (!targetProd) return;
    const available = targetProd.availableImeis[0] || `SN-MANUAL-${Math.floor(100000 + Math.random() * 900000)}`;

    setState((prev) => ({
      ...prev,
      stagedItems: [
        ...prev.stagedItems,
        {
          productId,
          assignedImei: available,
          voltCareExtended: true,
          unitPrice: targetProd.price,
          warrantyPrice: Math.round(targetProd.price * 0.065),
        },
      ],
    }));
  };

  const handleRemoveStaged = (index: number) => {
    setState((prev) => ({
      ...prev,
      stagedItems: prev.stagedItems.filter((_, i) => i !== index),
    }));
  };

  const toggleVoltCare = (index: number) => {
    setState((prev) => ({
      ...prev,
      stagedItems: prev.stagedItems.map((item, i) =>
        i === index ? { ...item, voltCareExtended: !item.voltCareExtended } : item
      ),
    }));
  };

  const handleCompleteDispatch = () => {
    if (state.stagedItems.length === 0) return;
    const orderNo = `ORD-VTX-${Math.floor(1000 + Math.random() * 9000)}`;
    const manifest = state.stagedItems.map((s) => s.assignedImei);

    setState((prev) => ({
      ...prev,
      salesOrders: [
        {
          orderNo,
          date: "Just now",
          customerName: prev.customer.name,
          total: grandTotal,
          itemsSummary: `${prev.stagedItems.length} Serialized Unit(s)`,
          imeiManifest: manifest,
        },
        ...prev.salesOrders,
      ],
      stagedItems: [],
    }));

    setReceiptCompleteModal(true);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTechForm.model || !newTechForm.sku) return;
    const priceNum = parseFloat(newTechForm.price) || 99990;

    const added: TechProduct = {
      id: `tech-${Date.now()}`,
      sku: newTechForm.sku.toUpperCase(),
      brand: newTechForm.brand,
      model: newTechForm.model,
      category: newTechForm.category,
      price: priceNum,
      costPrice: Math.round(priceNum * 0.72),
      specs: {
        soc: newTechForm.soc,
        ramStorage: newTechForm.ram,
        display: newTechForm.display,
        batteryOptics: newTechForm.battery,
      },
      availableImeis: [newTechForm.initialImei],
      vaultBin: "Vault Cage #2",
      warrantyType: "VoltCare Eligible",
      imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80",
    };

    setState((prev) => ({
      ...prev,
      products: [added, ...prev.products],
    }));

    setIsAddTechModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0F172A] flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Titanium Bar */}
      <header className="bg-[#0B0F19] text-white border-b border-slate-800 px-3 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-sm shadow-sm">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-white uppercase">Voltrix OS</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-blue-950 text-blue-400 border border-blue-800">
                  v4.8-PRO
                </span>
              </div>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          {/* Branch Pill */}
          <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 border border-slate-700/80 px-2.5 py-1 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold">{state.currentBranch}</span>
          </div>
        </div>

        {/* Center: IMEI Quick Scan Input */}
        <div className="w-full sm:flex-1 sm:max-w-md my-0.5 sm:my-0">
          <div className="relative w-full">
            <Barcode className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Scan or Enter 15-digit IMEI / Serial S/N..."
              value={imeiScanInput}
              onChange={(e) => setImeiScanInput(e.target.value)}
              className="w-full bg-[#161D2F] border border-slate-700 text-xs rounded-lg pl-9 pr-14 py-1.5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 font-mono"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
              ↵ Scan
            </span>
          </div>
        </div>

        {/* Right Badges & Controls */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 text-xs bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 font-mono">
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">RMA Bench:</span>
            <strong className="text-amber-400">{state.rmaTickets.length} Pending</strong>
          </div>

          <button
            onClick={() => resetState()}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={() => setIsCustomizeOpen(true)}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-xs"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>
        </div>
      </header>

      {/* Nav Strip */}
      <nav className="bg-white border-b border-slate-200 px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab("pos")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "pos"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Retail POS & Unit Dispatch</span>
            {state.stagedItems.length > 0 && (
              <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded-full font-mono">
                {state.stagedItems.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("specs")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "specs"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Specs Comparison Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab("serials")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "serials"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Barcode className="w-3.5 h-3.5" />
            <span>Serial & IMEI Registry</span>
          </button>

          <button
            onClick={() => setActiveTab("rma")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "rma"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-amber-500" />
            <span>RMA Service Bench</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-mono">
              {state.rmaTickets.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("warranty")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "warranty"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Warranty Ledger</span>
          </button>

          <button
            onClick={() => setActiveTab("suppliers")}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "suppliers"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Suppliers & POs</span>
          </button>
        </div>

        <button
          onClick={() => setIsAddTechModalOpen(true)}
          className="text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Model SKU</span>
        </button>
      </nav>

      {/* Main Workspace */}
      <main className="flex-1 p-3 sm:p-4 max-w-[1600px] w-full mx-auto min-w-0">
        {/* TAB 1: RETAIL POS & HARDWARE LOCK DISPATCH */}
        {activeTab === "pos" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start min-w-0">
            {/* LEFT 65%: Hardware Catalogue & Specs */}
            <div className="lg:col-span-8 space-y-3 min-w-0">
              {/* Brand & Category Filter Bar */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 shadow-xs">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => setState((prev) => ({ ...prev, selectedBrand: b }))}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                        state.selectedBrand === b
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search chipset, RAM, model..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 w-44"
                  />
                </div>
              </div>

              {/* Hardware Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
                {filteredProducts.map((p) => {
                  return (
                    <div
                      key={p.id}
                      className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all p-4 flex flex-col justify-between space-y-3"
                    >
                      {/* Title & Price Header */}
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold">
                              {p.sku}
                            </span>
                            <span className="text-xs font-bold text-blue-600">{p.brand}</span>
                          </div>
                          <h3 className="text-sm font-extrabold text-slate-900 mt-1">{p.model}</h3>
                        </div>

                        <div className="text-right">
                          <strong className="text-base font-black font-mono text-slate-900 block">
                            ₹{p.price.toLocaleString("en-IN")}
                          </strong>
                          {p.originalPrice && (
                            <span className="text-[11px] text-slate-400 line-through font-mono">
                              ₹{p.originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* 4-Box Technical Spec Grid */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <div className="p-1.5 bg-white rounded border border-slate-100">
                          <span className="text-[9px] uppercase text-slate-400 block font-sans font-bold">
                            SOC / PROCESSOR
                          </span>
                          <span className="text-slate-800 font-bold block truncate">{p.specs.soc}</span>
                        </div>
                        <div className="p-1.5 bg-white rounded border border-slate-100">
                          <span className="text-[9px] uppercase text-slate-400 block font-sans font-bold">
                            RAM & STORAGE
                          </span>
                          <span className="text-slate-800 font-bold block truncate">{p.specs.ramStorage}</span>
                        </div>
                        <div className="p-1.5 bg-white rounded border border-slate-100">
                          <span className="text-[9px] uppercase text-slate-400 block font-sans font-bold">
                            DISPLAY ENGINE
                          </span>
                          <span className="text-slate-800 font-bold block truncate">{p.specs.display}</span>
                        </div>
                        <div className="p-1.5 bg-white rounded border border-slate-100">
                          <span className="text-[9px] uppercase text-slate-400 block font-sans font-bold">
                            OPTICS & POWER
                          </span>
                          <span className="text-slate-800 font-bold block truncate">{p.specs.batteryOptics}</span>
                        </div>
                      </div>

                      {/* Serialized Status & CTA */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-slate-600 font-mono font-medium">
                            {p.availableImeis.length} in Vault ({p.vaultBin})
                          </span>
                        </div>

                        <button
                          onClick={() => handleAssignImei(p.id)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Assign & Stage IMEI</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT 35%: POS TENDER & IMEI LOCK PANEL */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4 sticky top-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                    TERMINAL B-02 • POS DISPATCH
                  </span>
                  <h2 className="text-sm font-bold text-slate-900">Session #TX-9042</h2>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold border border-blue-200">
                  Walk-In VIP
                </span>
              </div>

              {/* Customer Profile Strip */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{state.customer.name}</span>
                  <span className="font-mono text-slate-500">{state.customer.phone}</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">GSTIN: {state.customer.gstin}</div>
              </div>

              {/* Staged Line Items with Hardware Serial Lock */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
                  <span>Staged Hardware ({state.stagedItems.length})</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Scanner Ready
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[280px] overflow-y-auto">
                  {state.stagedItems.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-xs">
                      <Smartphone className="w-6 h-6 mx-auto mb-1 opacity-40" />
                      No hardware units staged yet
                    </div>
                  ) : (
                    state.stagedItems.map((item, idx) => {
                      const prod = state.products.find((p) => p.id === item.productId);
                      return (
                        <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-xs font-bold text-slate-900">{prod?.model}</h4>
                              <span className="text-[10px] text-slate-500">{prod?.brand} • {prod?.sku}</span>
                            </div>
                            <div className="text-right">
                              <strong className="text-xs font-mono font-bold text-slate-900">
                                ₹{item.unitPrice.toLocaleString("en-IN")}
                              </strong>
                              <button
                                onClick={() => handleRemoveStaged(idx)}
                                className="text-slate-400 hover:text-red-600 block ml-auto mt-0.5"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Hardware Serial Barcode Box */}
                          <div className="bg-[#0B0F19] text-white p-2 rounded-lg font-mono text-xs flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <Barcode className="w-3.5 h-3.5 text-blue-400" />
                              <span className="text-emerald-400 font-bold">{item.assignedImei}</span>
                            </div>
                            <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                              Locked
                            </span>
                          </div>

                          {/* VoltCare Extended Warranty Toggle */}
                          <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer pt-1">
                            <span className="flex items-center gap-1.5">
                              <input
                                type="checkbox"
                                checked={item.voltCareExtended}
                                onChange={() => toggleVoltCare(idx)}
                                className="rounded text-blue-600 focus:ring-blue-500"
                              />
                              <span className="font-semibold text-blue-900">VoltCare Platinum 2-Year</span>
                            </span>
                            <span className="font-mono text-xs text-slate-600">+₹{item.warrantyPrice.toLocaleString("en-IN")}</span>
                          </label>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Trade-In Estimator Box */}
              <div className="bg-emerald-50/70 border border-emerald-200 p-3 rounded-xl space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 flex items-center gap-1">
                    <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Device Trade-In (VoltExchange)</span>
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                    {state.tradeIn.grade}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>{state.tradeIn.device}</span>
                  <strong className="text-emerald-700 font-mono">-₹{state.tradeIn.creditValue.toLocaleString("en-IN")}</strong>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="pt-2 border-t border-slate-200 space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Hardware Subtotal</span>
                  <span>₹{hardwareSubtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-blue-700">
                  <span>VoltCare Extended Warranty</span>
                  <span>+₹{warrantySubtotal.toLocaleString("en-IN")}</span>
                </div>
                {state.tradeIn.enabled && (
                  <div className="flex justify-between text-emerald-700">
                    <span>VoltExchange Trade-In</span>
                    <span>-₹{tradeInCredit.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>GST Output Tax (18% Integrated IGST)</span>
                  <span>₹{gstTax.toLocaleString("en-IN")}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-sans">
                  <span className="text-sm font-extrabold text-slate-900">Grand Total</span>
                  <span className="text-xl font-black font-mono text-blue-600">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Complete Dispatch CTA */}
              <button
                disabled={state.stagedItems.length === 0}
                onClick={handleCompleteDispatch}
                className={`w-full py-3.5 rounded-xl text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  state.stagedItems.length === 0
                    ? "bg-slate-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20 active:scale-98"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Checkout & Print Serial Manifest</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: TECHNICAL SPECS COMPARISON TABLE */}
        {activeTab === "specs" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="text-base font-bold text-slate-900">Electronics Specification Comparison Table</h2>
                <p className="text-xs text-slate-500">Benchmark SoC compute, memory bus bandwidth, panel nits, and thermal limits</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-mono tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Model & SKU</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Compute SoC</th>
                      <th className="py-3 px-4">Memory Architecture</th>
                      <th className="py-3 px-4">Display Panel</th>
                      <th className="py-3 px-4">Power & Thermal</th>
                      <th className="py-3 px-4 text-right">MSRP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {state.products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4">
                          <strong className="text-slate-900 font-sans block">{p.model}</strong>
                          <span className="text-[11px] text-slate-400">{p.sku} • {p.brand}</span>
                        </td>
                        <td className="py-3 px-4 font-sans">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-800 font-bold">{p.specs.soc}</td>
                        <td className="py-3 px-4 text-slate-700">{p.specs.ramStorage}</td>
                        <td className="py-3 px-4 text-slate-700">{p.specs.display}</td>
                        <td className="py-3 px-4 text-slate-700">{p.specs.batteryOptics}</td>
                        <td className="py-3 px-4 text-right font-bold text-slate-900">
                          ₹{p.price.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SERIAL & IMEI REGISTRY */}
        {activeTab === "serials" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="text-base font-bold text-slate-900">Hardware Serial & IMEI Registry</h2>
                <p className="text-xs text-slate-500">Live vault tracking of serialized hardware units assigned to branch bins</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-mono tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">IMEI / Serial S/N</th>
                      <th className="py-3 px-4">Hardware Model</th>
                      <th className="py-3 px-4">Vault Location</th>
                      <th className="py-3 px-4">Warranty Eligibility</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {state.products.flatMap((p) =>
                      p.availableImeis.map((imei) => (
                        <tr key={imei} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-blue-600">{imei}</td>
                          <td className="py-3 px-4 font-sans">
                            <span className="font-bold text-slate-800">{p.model}</span>
                            <span className="text-slate-400 text-xs ml-2">({p.sku})</span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">{p.vaultBin}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800">
                              {p.warrantyType}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              In Vault
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleAssignImei(p.id)}
                              className="text-xs font-semibold text-blue-600 hover:underline"
                            >
                              Stage for POS →
                            </button>
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

        {/* TAB 4: RMA SERVICE & REPAIR BENCH */}
        {activeTab === "rma" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="text-base font-bold text-slate-900">RMA Repair Bench & Diagnostics</h2>
                <p className="text-xs text-slate-500">Service tickets, parts requisition, and technician bench updates</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {state.rmaTickets.map((t) => (
                <div key={t.id} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {t.ticketNo}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-1">{t.deviceModel}</h3>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.stage === "Ready for Pickup"
                          ? "bg-emerald-100 text-emerald-800"
                          : t.stage === "Diagnostics"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {t.stage}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{t.issueDescription}</p>

                  <div className="p-2.5 bg-slate-50 rounded-lg text-xs font-mono text-slate-500 space-y-1">
                    <div>IMEI: <strong className="text-slate-800">{t.imei}</strong></div>
                    <div>Tech: <strong className="text-slate-800">{t.technician}</strong></div>
                    <div>Estimate: <strong className="text-emerald-700">₹{t.repairCost.toLocaleString("en-IN")}</strong></div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="text-slate-400">{t.customerName}</span>
                    <button
                      onClick={() => {
                        setState((prev) => ({
                          ...prev,
                          rmaTickets: prev.rmaTickets.map((r) =>
                            r.id === t.id ? { ...r, stage: "Ready for Pickup" } : r
                          ),
                        }));
                      }}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Advance Stage →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: WARRANTY LEDGER */}
        {activeTab === "warranty" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="text-base font-bold text-slate-900">Active VoltCare & Manufacturer Warranty Ledger</h2>
                <p className="text-xs text-slate-500">Coverage records linked to registered 15-digit device IMEIs</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-mono tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">IMEI Code</th>
                      <th className="py-3 px-4">Customer Name</th>
                      <th className="py-3 px-4">Device Model</th>
                      <th className="py-3 px-4">Warranty Plan</th>
                      <th className="py-3 px-4">Expiry Date</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {state.warrantyRegistry.map((w) => (
                      <tr key={w.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-blue-600">{w.imei}</td>
                        <td className="py-3 px-4 font-sans text-slate-800 font-medium">{w.customerName}</td>
                        <td className="py-3 px-4 font-sans text-slate-700">{w.productName}</td>
                        <td className="py-3 px-4 font-sans text-emerald-800 font-semibold">{w.plan}</td>
                        <td className="py-3 px-4 text-slate-500">{w.expiryDate}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {w.status}
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

        {/* TAB 6: SUPPLIERS & PURCHASE ORDERS */}
        {activeTab === "suppliers" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-xs">
              <div>
                <h2 className="text-base font-bold text-slate-900">Hardware Suppliers & Distribution Partners</h2>
                <p className="text-xs text-slate-500">Procurement chains, tier-1 distributor authorizations, and inbound POs</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 block font-mono">TIER-1 DISTRIBUTOR</span>
                <h3 className="text-sm font-bold text-slate-900">Ingram Micro India Ltd</h3>
                <p className="text-xs text-slate-600">Authorized Apple & Samsung Direct Allocation Partner</p>
                <div className="pt-2 border-t border-slate-100 text-xs font-mono text-slate-500 flex justify-between">
                  <span>Open POs: 4</span>
                  <span>Lead Time: 48h</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 block font-mono">DIRECT OEM</span>
                <h3 className="text-sm font-bold text-slate-900">Dell Technologies Direct</h3>
                <p className="text-xs text-slate-600">Custom B2B Workstation & Precision Laptop Allocation</p>
                <div className="pt-2 border-t border-slate-100 text-xs font-mono text-slate-500 flex justify-between">
                  <span>Open POs: 2</span>
                  <span>Lead Time: 5 days</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 block font-mono">CONSUMER AUDIO</span>
                <h3 className="text-sm font-bold text-slate-900">Sony India Regional Hub</h3>
                <p className="text-xs text-slate-600">Audiophile LDAC Headphones, Soundbars, and Alpha Optics</p>
                <div className="pt-2 border-t border-slate-100 text-xs font-mono text-slate-500 flex justify-between">
                  <span>Open POs: 1</span>
                  <span>Lead Time: 24h</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: ADD TECH PRODUCT */}
      {isAddTechModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-wider">New Hardware Model Entry</h3>
              <button onClick={() => setIsAddTechModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Hardware Model Name</label>
                <input
                  type="text"
                  placeholder="e.g. iPhone 16 Pro Desert Titanium"
                  value={newTechForm.model}
                  onChange={(e) => setNewTechForm({ ...newTechForm, model: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Brand</label>
                  <input
                    type="text"
                    value={newTechForm.brand}
                    onChange={(e) => setNewTechForm({ ...newTechForm, brand: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">SKU Code</label>
                  <input
                    type="text"
                    placeholder="APL-IP16-PRO"
                    value={newTechForm.sku}
                    onChange={(e) => setNewTechForm({ ...newTechForm, sku: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 font-mono uppercase"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">MSRP Price (₹)</label>
                  <input
                    type="number"
                    value={newTechForm.price}
                    onChange={(e) => setNewTechForm({ ...newTechForm, price: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Initial Vault IMEI</label>
                  <input
                    type="text"
                    placeholder="358810-09-994102-1"
                    value={newTechForm.initialImei}
                    onChange={(e) => setNewTechForm({ ...newTechForm, initialImei: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Compute SoC</label>
                <input
                  type="text"
                  value={newTechForm.soc}
                  onChange={(e) => setNewTechForm({ ...newTechForm, soc: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2 font-mono"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddTechModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xs"
                >
                  Save Hardware Model
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DISPATCH RECEIPT MANIFEST */}
      {receiptCompleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-sm w-full p-6 text-center space-y-3 font-sans">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Serialized Dispatch Complete</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-mono">
              Hardware locks confirmed. Warranty registration certificates dispatched to customer SMS & GST portal.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setReceiptCompleteModal(false)}
                className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800"
              >
                Close & Next Transaction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customization Modal */}
      <CustomizationModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        demo={model}
      />
    </div>
  );
}
