"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Barcode,
  Boxes,
  CheckCircle2,
  CreditCard,
  Menu,
  Minus,
  PackagePlus,
  Percent,
  Plus,
  Printer,
  ReceiptText,
  RefreshCw,
  RotateCcw,
  Search,
  ShoppingBag,
  Sparkles,
  Store,
  Tag,
  Truck,
  Users,
  X,
} from "lucide-react";
import type { DemoProductDefinition } from "../../types";
import { toDemoModel } from "../../registry";
import { useDemoState } from "../../state/useDemoState";
import { CustomizationModal } from "@/components/demos/CustomizationModal";

type NavSection =
  | "dashboard"
  | "pos"
  | "catalogue"
  | "inventory"
  | "suppliers"
  | "sales-returns"
  | "customers-staff"
  | "discounts-report";

interface ProductVariant {
  id: string;
  label: string;
  barcode: string;
  bin: string;
  stock: number;
  reorderAt: number;
}

interface RetailProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  costPrice: number;
  retailPrice: number;
  taxPct: number;
  supplierId: string;
  variants: ProductVariant[];
}

interface RetailSupplier {
  id: string;
  name: string;
  categoryFocus: string;
  leadDays: number;
  terms: string;
  contact: string;
}

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  productId: string;
  variantId: string;
  qty: number;
  unitCost: number;
  status: "Pending" | "In Transit" | "Received";
  eta: string;
}

interface RetailSale {
  id: string;
  receiptNo: string;
  time: string;
  customerName: string;
  tender: "UPI / QR" | "Card" | "Cash";
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: "Completed" | "Partial Return" | "Returned";
  items: { productId: string; variantId: string; name: string; variantLabel: string; qty: number; unitPrice: number; costPrice: number }[];
}

interface RetailReturn {
  id: string;
  rmaNo: string;
  receiptNo: string;
  itemName: string;
  qty: number;
  refundAmount: number;
  restocked: boolean;
  reason: string;
  createdAt: string;
}

interface RetailCustomer {
  id: string;
  name: string;
  phone: string;
  tier: "Platinum" | "Gold" | "Standard";
  visits: number;
  totalSpend: number;
}

interface RetailStaff {
  id: string;
  name: string;
  role: string;
  register: string;
  shift: "On Shift" | "Break" | "Off";
  salesToday: number;
}

interface DiscountRule {
  id: string;
  code: string;
  title: string;
  type: "percent" | "flat";
  value: number;
  minBasket: number;
  active: boolean;
  redemptions: number;
}

interface MeridianRetailState {
  storeName: string;
  terminalId: string;
  products: RetailProduct[];
  suppliers: RetailSupplier[];
  purchaseOrders: PurchaseOrder[];
  sales: RetailSale[];
  returns: RetailReturn[];
  customers: RetailCustomer[];
  staff: RetailStaff[];
  discounts: DiscountRule[];
}

const MERIDIAN_RETAIL_SEED: MeridianRetailState = {
  storeName: "Flagship Indiranagar",
  terminalId: "Terminal #04",
  suppliers: [
    { id: "sup-1", name: "Arvind Knitwear Mills", categoryFocus: "Tops & Knitwear", leadDays: 4, terms: "Net 30", contact: "orders@arvindmills.in" },
    { id: "sup-2", name: "Deccan Denim Atelier", categoryFocus: "Bottoms & Denim", leadDays: 6, terms: "Net 45", contact: "supply@deccandenim.in" },
    { id: "sup-3", name: "CraftCanvas Goods", categoryFocus: "Accessories & Bags", leadDays: 3, terms: "Net 15", contact: "b2b@craftcanvas.co" },
  ],
  products: [
    {
      id: "rp-1",
      sku: "SKU-APP-8842",
      name: "Supima Cotton Crew Neck",
      category: "Tops & Tees",
      costPrice: 1299,
      retailPrice: 2499,
      taxPct: 12,
      supplierId: "sup-1",
      variants: [
        { id: "rv-1a", label: "Navy / XL", barcode: "890123049102", bin: "A-04-2", stock: 4, reorderAt: 8 },
        { id: "rv-1b", label: "Olive / M", barcode: "890123049103", bin: "A-04-3", stock: 22, reorderAt: 8 },
      ],
    },
    {
      id: "rp-2",
      sku: "SKU-KNT-4019",
      name: "Merino Blend Knit Pullover",
      category: "Knitwear",
      costPrice: 2450,
      retailPrice: 4999,
      taxPct: 12,
      supplierId: "sup-1",
      variants: [
        { id: "rv-2a", label: "Charcoal / M", barcode: "890984321944", bin: "C-12-1", stock: 38, reorderAt: 10 },
        { id: "rv-2b", label: "Oatmeal / L", barcode: "890984321945", bin: "C-12-2", stock: 14, reorderAt: 10 },
      ],
    },
    {
      id: "rp-3",
      sku: "SKU-ACC-1102",
      name: "Structured Canvas Tote",
      category: "Accessories",
      costPrice: 850,
      retailPrice: 1899,
      taxPct: 12,
      supplierId: "sup-3",
      variants: [
        { id: "rv-3a", label: "Tan / OneSize", barcode: "890332190823", bin: "D-01-3", stock: 8, reorderAt: 12 },
      ],
    },
    {
      id: "rp-4",
      sku: "SKU-BTM-7721",
      name: "Tailored Chino Trousers",
      category: "Bottoms",
      costPrice: 1750,
      retailPrice: 3299,
      taxPct: 12,
      supplierId: "sup-2",
      variants: [
        { id: "rv-4a", label: "Olive / 32W", barcode: "890772183901", bin: "B-08-4", stock: 0, reorderAt: 10 },
        { id: "rv-4b", label: "Sand / 34W", barcode: "890772183902", bin: "B-08-5", stock: 19, reorderAt: 10 },
      ],
    },
    {
      id: "rp-5",
      sku: "SKU-FTW-3051",
      name: "Suede Court Sneaker",
      category: "Footwear",
      costPrice: 2900,
      retailPrice: 5499,
      taxPct: 18,
      supplierId: "sup-3",
      variants: [
        { id: "rv-5a", label: "Chalk / UK9", barcode: "890441122009", bin: "F-02-1", stock: 11, reorderAt: 6 },
      ],
    },
  ],
  purchaseOrders: [
    { id: "po-1", poNumber: "PO-2041", supplierId: "sup-3", productId: "rp-3", variantId: "rv-3a", qty: 24, unitCost: 850, status: "In Transit", eta: "Tomorrow 10:00 AM" },
    { id: "po-2", poNumber: "PO-2042", supplierId: "sup-2", productId: "rp-4", variantId: "rv-4a", qty: 30, unitCost: 1750, status: "Pending", eta: "Nov 15" },
  ],
  sales: [
    {
      id: "sl-9821",
      receiptNo: "#REC-9821",
      time: "14:18",
      customerName: "Riya Menon",
      tender: "UPI / QR",
      subtotal: 5798,
      discount: 0,
      tax: 696,
      total: 6494,
      status: "Completed",
      items: [
        { productId: "rp-1", variantId: "rv-1a", name: "Supima Cotton Crew Neck", variantLabel: "Navy / XL", qty: 1, unitPrice: 2499, costPrice: 1299 },
        { productId: "rp-4", variantId: "rv-4b", name: "Tailored Chino Trousers", variantLabel: "Sand / 34W", qty: 1, unitPrice: 3299, costPrice: 1750 },
      ],
    },
    {
      id: "sl-9820",
      receiptNo: "#REC-9820",
      time: "13:52",
      customerName: "Vikram Kapoor",
      tender: "Card",
      subtotal: 4999,
      discount: 500,
      tax: 540,
      total: 5039,
      status: "Completed",
      items: [
        { productId: "rp-2", variantId: "rv-2a", name: "Merino Blend Knit Pullover", variantLabel: "Charcoal / M", qty: 1, unitPrice: 4999, costPrice: 2450 },
      ],
    },
    {
      id: "sl-9819",
      receiptNo: "#REC-9819",
      time: "12:10",
      customerName: "Walk-In Guest",
      tender: "Cash",
      subtotal: 1899,
      discount: 0,
      tax: 228,
      total: 2127,
      status: "Completed",
      items: [
        { productId: "rp-3", variantId: "rv-3a", name: "Structured Canvas Tote", variantLabel: "Tan / OneSize", qty: 1, unitPrice: 1899, costPrice: 850 },
      ],
    },
  ],
  returns: [
    { id: "ret-1", rmaNo: "RMA-409", receiptNo: "#REC-9794", itemName: "Merino Blend Knit Pullover (Oatmeal / L)", qty: 1, refundAmount: 4999, restocked: true, reason: "Size exchange", createdAt: "10:40" },
  ],
  customers: [
    { id: "cu-1", name: "Riya Menon", phone: "+91 98450 22190", tier: "Platinum", visits: 14, totalSpend: 68420 },
    { id: "cu-2", name: "Vikram Kapoor", phone: "+91 99001 44102", tier: "Gold", visits: 7, totalSpend: 31200 },
    { id: "cu-3", name: "Ananya Verma", phone: "+91 97400 88211", tier: "Standard", visits: 3, totalSpend: 9840 },
  ],
  staff: [
    { id: "st-1", name: "Arjun Mehta", role: "Lead Cashier • Floor Ops", register: "Terminal #04", shift: "On Shift", salesToday: 84200 },
    { id: "st-2", name: "Neha Kulkarni", role: "Visual Merchandiser", register: "Floor A/B", shift: "On Shift", salesToday: 42900 },
    { id: "st-3", name: "Kabir Singh", role: "Inventory Lead", register: "Stockroom", shift: "Break", salesToday: 18400 },
  ],
  discounts: [
    { id: "dc-1", code: "WELCOME10", title: "First Visit 10% Off", type: "percent", value: 10, minBasket: 1500, active: true, redemptions: 28 },
    { id: "dc-2", code: "VIP500", title: "Flat ₹500 Loyalty Reward", type: "flat", value: 500, minBasket: 4000, active: true, redemptions: 19 },
    { id: "dc-3", code: "EOSS20", title: "Winter Knitwear 20% Off", type: "percent", value: 20, minBasket: 3000, active: false, redemptions: 64 },
  ],
};

const NAV_ITEMS: { id: NavSection; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "dashboard", label: "Store Dashboard", icon: BarChart3 },
  { id: "pos", label: "POS Quick Sync", icon: Barcode },
  { id: "catalogue", label: "Catalogue & Variants", icon: ShoppingBag },
  { id: "inventory", label: "Inventory & Reorder", icon: Boxes },
  { id: "suppliers", label: "Suppliers & POs", icon: Truck },
  { id: "sales-returns", label: "Sales & Returns", icon: ReceiptText },
  { id: "customers-staff", label: "Customers & Staff", icon: Users },
  { id: "discounts-report", label: "Discounts & Daily Report", icon: Percent },
];

export function MeridianRetailStoreApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState, resetState } = useDemoState<MeridianRetailState>(product.slug, MERIDIAN_RETAIL_SEED);

  const [activeNav, setActiveNav] = useState<NavSection>("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState<"all" | "low" | "oos">("all");
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // POS cart state
  const [cart, setCart] = useState<{ productId: string; variantId: string; qty: number }[]>([
    { productId: "rp-2", variantId: "rv-2a", qty: 1 },
  ]);
  const [promoInput, setPromoInput] = useState("WELCOME10");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("cu-1");
  const [tenderMethod, setTenderMethod] = useState<RetailSale["tender"]>("UPI / QR");

  // Add Product modal/form
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [newProdForm, setNewProdForm] = useState({
    sku: "",
    name: "",
    category: "Tops & Tees",
    costPrice: "1100",
    retailPrice: "2299",
    variantLabel: "Black / M",
    stock: "16",
    reorderAt: "6",
    supplierId: "sup-1",
  });
  const [newProdError, setNewProdError] = useState("");

  // New PO form
  const [poForm, setPoForm] = useState({ productId: "rp-4", variantId: "rv-4a", qty: "20" });

  // Return form
  const [retForm, setRetForm] = useState({ receiptNo: "#REC-9821", reason: "Size mismatch", restock: true });

  // New Promo form
  const [promoForm, setPromoForm] = useState({ code: "", title: "", type: "percent" as "percent" | "flat", value: "15" });

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(state.products.map((p) => p.category)))],
    [state.products]
  );

  const flatVariants = useMemo(() => {
    const rows: {
      product: RetailProduct;
      variant: ProductVariant;
      supplierName: string;
      status: "In Stock" | "Low Stock" | "Out of Stock";
    }[] = [];
    for (const p of state.products) {
      const sup = state.suppliers.find((s) => s.id === p.supplierId)?.name || "Direct Vendor";
      for (const v of p.variants) {
        const status = v.stock <= 0 ? "Out of Stock" : v.stock <= v.reorderAt ? "Low Stock" : "In Stock";
        rows.push({ product: p, variant: v, supplierName: sup, status });
      }
    }
    return rows;
  }, [state.products, state.suppliers]);

  const filteredVariants = useMemo(() => {
    return flatVariants.filter(({ product: p, variant: v, status }) => {
      if (categoryFilter !== "All" && p.category !== categoryFilter) return false;
      if (stockFilter === "low" && status !== "Low Stock") return false;
      if (stockFilter === "oos" && status !== "Out of Stock") return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          v.barcode.includes(q) ||
          v.label.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [flatVariants, categoryFilter, stockFilter, searchQuery]);

  const metrics = useMemo(() => {
    const grossSales = state.sales.reduce((acc, s) => acc + s.total, 0);
    const totalReturns = state.returns.reduce((acc, r) => acc + r.refundAmount, 0);
    const netSales = Math.max(0, grossSales - totalReturns);
    const totalCost = state.sales.reduce(
      (acc, s) => acc + s.items.reduce((sum, item) => sum + item.costPrice * item.qty, 0),
      0
    );
    const subtotalSum = state.sales.reduce((acc, s) => acc + s.subtotal, 0);
    const marginPct = subtotalSum > 0 ? Math.round(((subtotalSum - totalCost) / subtotalSum) * 1000) / 10 : 0;
    const lowStockCount = flatVariants.filter((r) => r.status === "Low Stock").length;
    const oosCount = flatVariants.filter((r) => r.status === "Out of Stock").length;
    const totalUnits = flatVariants.reduce((sum, r) => sum + r.variant.stock, 0);
    return {
      grossSales,
      netSales,
      totalReturns,
      marginPct,
      txCount: state.sales.length,
      lowStockCount,
      oosCount,
      totalUnits,
    };
  }, [state.sales, state.returns, flatVariants]);

  const cartSummary = useMemo(() => {
    const lines = cart
      .map((line) => {
        const prod = state.products.find((p) => p.id === line.productId);
        const variant = prod?.variants.find((v) => v.id === line.variantId);
        if (!prod || !variant) return null;
        return { prod, variant, qty: line.qty, lineTotal: prod.retailPrice * line.qty };
      })
      .filter(Boolean) as { prod: RetailProduct; variant: ProductVariant; qty: number; lineTotal: number }[];
    const subtotal = lines.reduce((acc, l) => acc + l.lineTotal, 0);
    const matchedPromo = state.discounts.find(
      (d) => d.active && d.code.toUpperCase() === promoInput.trim().toUpperCase() && subtotal >= d.minBasket
    );
    const discount = matchedPromo
      ? matchedPromo.type === "percent"
        ? Math.round((subtotal * matchedPromo.value) / 100)
        : matchedPromo.value
      : 0;
    const taxable = Math.max(0, subtotal - discount);
    const tax = Math.round(taxable * 0.12);
    const total = taxable + tax;
    return { lines, subtotal, discount, tax, total, appliedCode: matchedPromo?.code || null };
  }, [cart, state.products, state.discounts, promoInput]);

  const addToCart = (productId: string, variantId: string) => {
    const prod = state.products.find((p) => p.id === productId);
    const variant = prod?.variants.find((v) => v.id === variantId);
    if (!prod || !variant || variant.stock <= 0) {
      notify("Out of stock — create a PO to replenish");
      return;
    }
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.variantId === variantId);
      if (idx >= 0) {
        const nextQty = Math.min(variant.stock, prev[idx].qty + 1);
        return prev.map((item, i) => (i === idx ? { ...item, qty: nextQty } : item));
      }
      return [...prev, { productId, variantId, qty: 1 }];
    });
    notify(`Added ${prod.name} (${variant.label}) to POS cart`);
  };

  const completePosSale = () => {
    if (cartSummary.lines.length === 0) return;
    const customer = state.customers.find((c) => c.id === selectedCustomerId);
    const receiptNo = `#REC-${9822 + state.sales.length}`;
    const newSale: RetailSale = {
      id: `sl-${Date.now()}`,
      receiptNo,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      customerName: customer?.name || "Walk-In Guest",
      tender: tenderMethod,
      subtotal: cartSummary.subtotal,
      discount: cartSummary.discount,
      tax: cartSummary.tax,
      total: cartSummary.total,
      status: "Completed",
      items: cartSummary.lines.map((l) => ({
        productId: l.prod.id,
        variantId: l.variant.id,
        name: l.prod.name,
        variantLabel: l.variant.label,
        qty: l.qty,
        unitPrice: l.prod.retailPrice,
        costPrice: l.prod.costPrice,
      })),
    };

    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) => ({
        ...p,
        variants: p.variants.map((v) => {
          const sold = cartSummary.lines.find((l) => l.variant.id === v.id);
          return sold ? { ...v, stock: Math.max(0, v.stock - sold.qty) } : v;
        }),
      })),
      sales: [newSale, ...prev.sales],
      customers: prev.customers.map((c) =>
        c.id === selectedCustomerId ? { ...c, visits: c.visits + 1, totalSpend: c.totalSpend + cartSummary.total } : c
      ),
      discounts: prev.discounts.map((d) =>
        d.code === cartSummary.appliedCode ? { ...d, redemptions: d.redemptions + 1 } : d
      ),
    }));
    setCart([]);
    notify(`Sale ${receiptNo} settled (${tenderMethod}) — inventory synced`);
  };

  const adjustVariantStock = (productId: string, variantId: string, delta: number) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === productId
          ? {
              ...p,
              variants: p.variants.map((v) =>
                v.id === variantId ? { ...v, stock: Math.max(0, v.stock + delta) } : v
              ),
            }
          : p
      ),
    }));
    notify(delta > 0 ? `Added +${delta} units to bin` : `Adjusted stock (${delta})`);
  };

  const createPurchaseOrder = (productId: string, variantId: string, qty: number) => {
    const prod = state.products.find((p) => p.id === productId);
    if (!prod || qty <= 0) return;
    const poNo = `PO-${2043 + state.purchaseOrders.length}`;
    const po: PurchaseOrder = {
      id: `po-${Date.now()}`,
      poNumber: poNo,
      supplierId: prod.supplierId,
      productId,
      variantId,
      qty,
      unitCost: prod.costPrice,
      status: "Pending",
      eta: "In 4 days",
    };
    setState((prev) => ({ ...prev, purchaseOrders: [po, ...prev.purchaseOrders] }));
    notify(`Issued ${poNo} for ${qty}× ${prod.name}`);
  };

  const receivePurchaseOrder = (poId: string) => {
    const po = state.purchaseOrders.find((p) => p.id === poId);
    if (!po || po.status === "Received") return;
    setState((prev) => ({
      ...prev,
      purchaseOrders: prev.purchaseOrders.map((p) => (p.id === poId ? { ...p, status: "Received" } : p)),
      products: prev.products.map((prod) =>
        prod.id === po.productId
          ? {
              ...prod,
              variants: prod.variants.map((v) =>
                v.id === po.variantId ? { ...v, stock: v.stock + po.qty } : v
              ),
            }
          : prod
      ),
    }));
    notify(`Received ${po.poNumber} (+${po.qty} units added to stock)`);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const sku = newProdForm.sku.trim().toUpperCase();
    const name = newProdForm.name.trim();
    const cost = Number(newProdForm.costPrice);
    const retail = Number(newProdForm.retailPrice);
    const stock = Number(newProdForm.stock);
    const reorder = Number(newProdForm.reorderAt);
    if (!sku || !name || !Number.isFinite(retail) || retail <= 0) {
      setNewProdError("Enter valid SKU, Product Name, and Retail Price.");
      return;
    }
    const newProd: RetailProduct = {
      id: `rp-${Date.now()}`,
      sku,
      name,
      category: newProdForm.category,
      costPrice: Math.max(100, cost || Math.round(retail * 0.55)),
      retailPrice: retail,
      taxPct: 12,
      supplierId: newProdForm.supplierId,
      variants: [
        {
          id: `rv-${Date.now()}`,
          label: newProdForm.variantLabel.trim() || "Standard",
          barcode: `890${String(Date.now()).slice(-9)}`,
          bin: "E-01-1",
          stock: Math.max(0, stock || 10),
          reorderAt: Math.max(1, reorder || 5),
        },
      ],
    };
    setState((prev) => ({ ...prev, products: [newProd, ...prev.products] }));
    setNewProdForm({ sku: "", name: "", category: "Tops & Tees", costPrice: "1100", retailPrice: "2299", variantLabel: "Black / M", stock: "16", reorderAt: "6", supplierId: "sup-1" });
    setNewProdError("");
    setAddProductOpen(false);
    notify(`Created product ${sku} — ${name}`);
  };

  const processReturn = (e: React.FormEvent) => {
    e.preventDefault();
    const sale = state.sales.find((s) => s.receiptNo === retForm.receiptNo);
    if (!sale || !sale.items[0]) return;
    const firstItem = sale.items[0];
    const rma: RetailReturn = {
      id: `ret-${Date.now()}`,
      rmaNo: `RMA-${410 + state.returns.length}`,
      receiptNo: sale.receiptNo,
      itemName: `${firstItem.name} (${firstItem.variantLabel})`,
      qty: 1,
      refundAmount: firstItem.unitPrice,
      restocked: retForm.restock,
      reason: retForm.reason.trim() || "Customer return",
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setState((prev) => ({
      ...prev,
      returns: [rma, ...prev.returns],
      sales: prev.sales.map((s) => (s.id === sale.id ? { ...s, status: "Partial Return" } : s)),
      products: retForm.restock
        ? prev.products.map((p) =>
            p.id === firstItem.productId
              ? {
                  ...p,
                  variants: p.variants.map((v) =>
                    v.id === firstItem.variantId ? { ...v, stock: v.stock + 1 } : v
                  ),
                }
              : p
          )
        : prev.products,
    }));
    notify(`Processed ${rma.rmaNo} (${retForm.restock ? "restocked +1" : "damaged/written off"})`);
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoForm.code.trim().toUpperCase();
    const title = promoForm.title.trim();
    const val = Number(promoForm.value);
    if (!code || !title || !Number.isFinite(val) || val <= 0) return;
    setState((prev) => ({
      ...prev,
      discounts: [
        { id: `dc-${Date.now()}`, code, title, type: promoForm.type, value: val, minBasket: 1000, active: true, redemptions: 0 },
        ...prev.discounts,
      ],
    }));
    setPromoForm({ code: "", title: "", type: "percent", value: "15" });
    notify(`Activated promo code ${code}`);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0B1C30] flex flex-col lg:flex-row font-sans">
      {/* Left Slate Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0F172A] text-slate-200 flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shadow-sm">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white leading-tight">Meridian Retail OS</div>
                <div className="text-[11px] text-slate-400">{state.storeName}</div>
              </div>
            </div>
            <button onClick={() => setMobileNavOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-4 py-2.5 border-b border-slate-800/80 flex items-center justify-between text-[11px] bg-slate-900/60">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {state.terminalId} Open
            </span>
            <span className="font-mono text-slate-400">v4.8</span>
          </div>

          <nav className="p-2.5 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                    active
                      ? "bg-[#2563EB] text-white shadow-sm"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-3 border-t border-slate-800 space-y-2">
          <div className="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px]">
            <div className="font-semibold text-white">Arjun Mehta</div>
            <div className="text-slate-400">Lead Cashier • Register #04</div>
          </div>
          <Link
            href={product.publicRoute || `/demos/${product.categorySlug}/${product.slug}`}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Demo Specs</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Utility Header */}
        <header className="bg-white border-b border-[#E2E8F0] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
              aria-label="Open navigation"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="relative w-56 sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search SKU, barcode, variant..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F8FAFC] border border-slate-200 rounded-lg focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveNav("pos")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Sale</span>
            </button>
            <button
              onClick={() => setAddProductOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
            >
              <PackagePlus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
            <button
              onClick={() => {
                resetState();
                setCart([{ productId: "rp-2", variantId: "rv-2a", qty: 1 }]);
                notify("Restored canonical store state");
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={() => setCustomModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-xs font-semibold text-[#004AC6]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customize</span>
            </button>
          </div>
        </header>

        {toast && (
          <div className="mx-4 sm:mx-6 mt-3 px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toast}</span>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 space-y-5">
          {/* KPI Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-1.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Today Net Sales</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-[#0B1C30]">
                ₹{metrics.netSales.toLocaleString("en-IN")}
              </div>
              <div className="text-xs text-slate-500 flex items-center justify-between">
                <span>{metrics.txCount} completed checks</span>
                <button onClick={() => setActiveNav("sales-returns")} className="text-[#2563EB] font-semibold hover:underline">
                  Sales Ledger
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-1.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Inventory Units</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-[#0B1C30]">{metrics.totalUnits} pcs</div>
              <div className="text-xs text-slate-500 flex items-center justify-between">
                <span>{state.products.length} master SKUs</span>
                <span className="text-emerald-700 font-semibold">POS 100% Synced</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-1.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Stock Alerts</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-amber-700">
                {metrics.lowStockCount + metrics.oosCount} Variants
              </div>
              <div className="text-xs text-slate-500 flex items-center justify-between">
                <span>{metrics.oosCount} out of stock</span>
                <button onClick={() => { setStockFilter("low"); setActiveNav("inventory"); }} className="text-[#2563EB] font-semibold hover:underline">
                  Review Reorder
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-1.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Blended Gross Margin</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-emerald-700">{metrics.marginPct}%</div>
              <div className="text-xs text-slate-500 flex items-center justify-between">
                <span>Returns: ₹{metrics.totalReturns.toLocaleString("en-IN")}</span>
                <button onClick={() => setActiveNav("discounts-report")} className="text-[#2563EB] font-semibold hover:underline">
                  Daily Report
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard + Variant Matrix + POS Quick Sync Sidebar */}
          {(activeNav === "dashboard" || activeNav === "catalogue" || activeNav === "inventory") && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
              <div className="xl:col-span-8 bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
                <div className="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-[#0B1C30]">
                      {activeNav === "catalogue"
                        ? "Product & Variant Catalogue"
                        : activeNav === "inventory"
                        ? "Inventory & Reorder Control"
                        : "Inventory & Variant Stock Matrix"}
                    </h2>
                    <p className="text-xs text-slate-500">Filter by category or stock threshold, ring up POS, or trigger replenishment</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-[#F8FAFC] text-slate-700"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-[11px]">
                      {(["all", "low", "oos"] as const).map((f) => (
                        <button
                          key={f}
                          onClick={() => setStockFilter(f)}
                          className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                            stockFilter === f ? "bg-white text-[#2563EB] shadow-xs" : "text-slate-600"
                          }`}
                        >
                          {f === "all" ? "All" : f === "low" ? "Low Stock" : "Out of Stock"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-[#F8FAFC] text-[11px] uppercase tracking-wider text-slate-500 border-b border-[#E2E8F0]">
                      <tr>
                        <th className="py-2.5 px-4">SKU / Barcode</th>
                        <th className="py-2.5 px-4">Product & Variant</th>
                        <th className="py-2.5 px-4">Category</th>
                        <th className="py-2.5 px-4">Cost / Retail</th>
                        <th className="py-2.5 px-4">Stock</th>
                        <th className="py-2.5 px-4">Status</th>
                        <th className="py-2.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredVariants.map(({ product: p, variant: v, status }) => (
                        <tr key={v.id} className="hover:bg-slate-50/70">
                          <td className="py-3 px-4 font-mono">
                            <div className="font-semibold text-slate-900">{p.sku}</div>
                            <div className="text-[11px] text-slate-400">{v.barcode}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-900">{p.name}</div>
                            <div className="text-[11px] text-slate-500">
                              {v.label} • Bin {v.bin}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono tabular-nums">
                            <div className="text-slate-400">₹{p.costPrice.toLocaleString("en-IN")}</div>
                            <div className="font-bold text-slate-900">₹{p.retailPrice.toLocaleString("en-IN")}</div>
                          </td>
                          <td className="py-3 px-4 font-mono tabular-nums">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => adjustVariantStock(p.id, v.id, -1)}
                                className="w-5 h-5 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-bold w-8 text-center">{v.stock}</span>
                              <button
                                onClick={() => adjustVariantStock(p.id, v.id, 5)}
                                className="w-5 h-5 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                                status === "In Stock"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : status === "Low Stock"
                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                  : "bg-red-50 text-red-700 border border-red-200"
                              }`}
                            >
                              {status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => addToCart(p.id, v.id)}
                              className="px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-[#004AC6] font-semibold text-[11px]"
                            >
                              + POS
                            </button>
                            {status !== "In Stock" && (
                              <button
                                onClick={() => {
                                  createPurchaseOrder(p.id, v.id, 20);
                                  setActiveNav("suppliers");
                                }}
                                className="px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-[11px]"
                              >
                                Reorder +20
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Rail: POS Quick Sync & Recent Feed */}
              <div className="xl:col-span-4 space-y-4">
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                      POS Quick Sync ({cartSummary.lines.length} items)
                    </span>
                    <button onClick={() => setActiveNav("pos")} className="text-[11px] font-semibold text-[#2563EB] hover:underline">
                      Open Register →
                    </button>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-[11px] text-emerald-800">
                    Handheld Scanner #02 Ready • Thermal Printer Online
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {cartSummary.lines.map((l) => (
                      <div key={l.variant.id} className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
                        <div>
                          <div className="font-semibold text-slate-900">{l.prod.name}</div>
                          <div className="text-[11px] text-slate-500">
                            {l.variant.label} × {l.qty}
                          </div>
                        </div>
                        <span className="font-mono font-semibold">₹{l.lineTotal.toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                    {cartSummary.lines.length === 0 && (
                      <p className="text-xs text-slate-400 py-2">Add any variant from the matrix (+ POS) to ring up.</p>
                    )}
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-bold">
                    <span>Total (incl. 12% GST)</span>
                    <span className="font-mono text-[#004AC6]">₹{cartSummary.total.toLocaleString("en-IN")}</span>
                  </div>
                  <button
                    onClick={completePosSale}
                    disabled={cartSummary.lines.length === 0}
                    className="w-full py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold transition-colors"
                  >
                    Settle & Sync Inventory ({tenderMethod})
                  </button>
                </div>

                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-2.5">
                  <div className="text-xs font-bold text-slate-900">Last Register Tenders</div>
                  {state.sales.slice(0, 3).map((s) => (
                    <div key={s.id} className="p-2.5 rounded-lg bg-[#F8FAFC] border border-slate-200 text-xs space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span className="font-mono">{s.receiptNo}</span>
                        <span className="font-mono">₹{s.total.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex justify-between">
                        <span>{s.customerName} • {s.tender}</span>
                        <span>{s.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Dedicated POS Register Tab */}
          {activeNav === "pos" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-7 bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold">POS Quick Checkout & Barcode Scan</h2>
                  <span className="text-xs font-mono text-slate-500">{state.terminalId}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredVariants.map(({ product: p, variant: v }) => (
                    <button
                      key={v.id}
                      onClick={() => addToCart(p.id, v.id)}
                      disabled={v.stock <= 0}
                      className="text-left p-3 rounded-xl border border-slate-200 hover:border-[#2563EB] hover:bg-blue-50/30 disabled:opacity-50 transition-all space-y-1"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-bold text-slate-900">{p.name}</span>
                        <span className="text-xs font-mono font-bold text-[#004AC6]">₹{p.retailPrice}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">{v.label} • Barcode {v.barcode}</div>
                      <div className="text-[11px] font-mono text-slate-600">Available: {v.stock}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-4">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#2563EB]" />
                  Current Register Basket
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Attach Customer</label>
                    <select
                      value={selectedCustomerId}
                      onChange={(e) => setSelectedCustomerId(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      {state.customers.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.tier})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Promo Code</label>
                    <input
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="WELCOME10"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 font-mono uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  {cartSummary.lines.map((l) => (
                    <div key={l.variant.id} className="flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold">{l.prod.name}</div>
                        <div className="text-[11px] text-slate-500">
                          {l.variant.label} × {l.qty}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold">₹{l.lineTotal.toLocaleString("en-IN")}</span>
                        <button
                          onClick={() => setCart((prev) => prev.filter((x) => x.variantId !== l.variant.id))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-200 pt-3 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-mono">₹{cartSummary.subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount {cartSummary.appliedCode ? `(${cartSummary.appliedCode})` : ""}</span>
                    <span className="font-mono">-₹{cartSummary.discount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>GST (12%)</span>
                    <span className="font-mono">₹{cartSummary.tax.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-1 text-slate-900">
                    <span>Grand Total</span>
                    <span className="font-mono text-[#004AC6]">₹{cartSummary.total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {(["UPI / QR", "Card", "Cash"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTenderMethod(t)}
                      className={`py-2 rounded-lg text-xs font-semibold border ${
                        tenderMethod === t
                          ? "bg-blue-50 border-[#2563EB] text-[#004AC6]"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <button
                  onClick={completePosSale}
                  disabled={cartSummary.lines.length === 0}
                  className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Complete Sale & Print Receipt</span>
                </button>
              </div>
            </div>
          )}

          {/* Suppliers & Purchase Orders */}
          {activeNav === "suppliers" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-7 bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-4">
                <h2 className="text-base font-bold">Purchase Orders & Goods Receipt (GRN)</h2>
                <div className="space-y-2.5">
                  {state.purchaseOrders.map((po) => {
                    const prod = state.products.find((p) => p.id === po.productId);
                    const variant = prod?.variants.find((v) => v.id === po.variantId);
                    const sup = state.suppliers.find((s) => s.id === po.supplierId);
                    return (
                      <div key={po.id} className="p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="font-mono font-bold text-slate-900">
                            {po.poNumber} • {prod?.name} ({variant?.label})
                          </div>
                          <div className="text-slate-500">
                            {sup?.name} • {po.qty} units @ ₹{po.unitCost} • ETA: {po.eta}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              po.status === "Received"
                                ? "bg-emerald-50 text-emerald-700"
                                : po.status === "In Transit"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {po.status}
                          </span>
                          {po.status !== "Received" && (
                            <button
                              onClick={() => receivePurchaseOrder(po.id)}
                              className="px-3 py-1 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-semibold"
                            >
                              Receive Goods
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3">
                  <h3 className="text-sm font-bold">Raise Supplier Purchase Order</h3>
                  <div className="space-y-2 text-xs">
                    <select
                      value={poForm.productId}
                      onChange={(e) => {
                        const prod = state.products.find((p) => p.id === e.target.value);
                        setPoForm({ ...poForm, productId: e.target.value, variantId: prod?.variants[0]?.id || "" });
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      {state.products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.sku} — {p.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min={1}
                      value={poForm.qty}
                      onChange={(e) => setPoForm({ ...poForm, qty: e.target.value })}
                      placeholder="Order Quantity"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200"
                    />
                    <button
                      onClick={() => createPurchaseOrder(poForm.productId, poForm.variantId, Number(poForm.qty) || 15)}
                      className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                    >
                      Issue Purchase Order
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-2">
                  <h3 className="text-sm font-bold">Approved Suppliers ({state.suppliers.length})</h3>
                  {state.suppliers.map((s) => (
                    <div key={s.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                      <div className="font-semibold text-slate-900">{s.name}</div>
                      <div className="text-slate-500">
                        {s.categoryFocus} • Lead {s.leadDays}d • {s.terms}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sales & Returns */}
          {activeNav === "sales-returns" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-7 bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3">
                <h2 className="text-base font-bold">Store Sales Ledger ({state.sales.length})</h2>
                <div className="space-y-2">
                  {state.sales.map((s) => (
                    <div key={s.id} className="p-3 rounded-xl border border-slate-200 text-xs flex flex-wrap justify-between items-center gap-2">
                      <div>
                        <div className="font-mono font-bold text-slate-900">
                          {s.receiptNo} • {s.customerName}
                        </div>
                        <div className="text-slate-500">
                          {s.items.map((i) => `${i.qty}× ${i.name} (${i.variantLabel})`).join(", ")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-slate-900">₹{s.total.toLocaleString("en-IN")}</div>
                        <span className="text-[11px] text-slate-500">
                          {s.tender} • {s.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-4">
                <h3 className="text-sm font-bold">Process Return / Refund</h3>
                <form onSubmit={processReturn} className="space-y-2.5 text-xs">
                  <select
                    value={retForm.receiptNo}
                    onChange={(e) => setRetForm({ ...retForm, receiptNo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50"
                  >
                    {state.sales.map((s) => (
                      <option key={s.id} value={s.receiptNo}>
                        {s.receiptNo} — {s.customerName} (₹{s.total})
                      </option>
                    ))}
                  </select>
                  <input
                    value={retForm.reason}
                    onChange={(e) => setRetForm({ ...retForm, reason: e.target.value })}
                    placeholder="Return reason"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                  <label className="flex items-center gap-2 text-slate-700">
                    <input
                      type="checkbox"
                      checked={retForm.restock}
                      onChange={(e) => setRetForm({ ...retForm, restock: e.target.checked })}
                    />
                    <span>Restock returned item back into sellable bin</span>
                  </label>
                  <button type="submit" className="w-full py-2 rounded-lg bg-[#2563EB] text-white font-semibold">
                    Issue RMA & Process Refund
                  </button>
                </form>

                <div className="border-t border-slate-100 pt-3 space-y-2">
                  <div className="text-xs font-bold">Recent RMAs ({state.returns.length})</div>
                  {state.returns.map((r) => (
                    <div key={r.id} className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200 text-xs">
                      <div className="font-mono font-bold">
                        {r.rmaNo} ({r.receiptNo}) — -₹{r.refundAmount.toLocaleString("en-IN")}
                      </div>
                      <div className="text-slate-600">
                        {r.itemName} • {r.reason} • {r.restocked ? "Restocked" : "Written Off"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Customers & Staff */}
          {activeNav === "customers-staff" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3">
                <h2 className="text-base font-bold">Customer Profiles & Loyalty</h2>
                {state.customers.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{c.name}</div>
                      <div className="text-slate-500">
                        {c.phone} • {c.visits} visits
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold">₹{c.totalSpend.toLocaleString("en-IN")}</div>
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#004AC6] font-semibold text-[11px]">
                        {c.tier}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3">
                <h2 className="text-base font-bold">Floor & Cashier Staff Roster</h2>
                {state.staff.map((st) => (
                  <div key={st.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{st.name}</div>
                      <div className="text-slate-500">
                        {st.role} • {st.register}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          staff: prev.staff.map((x) =>
                            x.id === st.id
                              ? { ...x, shift: x.shift === "On Shift" ? "Break" : x.shift === "Break" ? "Off" : "On Shift" }
                              : x
                          ),
                        }))
                      }
                      className={`px-2.5 py-1 rounded-full font-semibold text-[11px] ${
                        st.shift === "On Shift"
                          ? "bg-emerald-50 text-emerald-700"
                          : st.shift === "Break"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {st.shift}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Discounts & Daily Report */}
          {activeNav === "discounts-report" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-6 bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#2563EB]" />
                  Active Store Discounts & Promos
                </h2>
                <div className="space-y-2">
                  {state.discounts.map((d) => (
                    <div key={d.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-mono font-bold text-slate-900">
                          {d.code} — {d.title}
                        </div>
                        <div className="text-slate-500">
                          {d.type === "percent" ? `${d.value}% off` : `₹${d.value} off`} • Min basket ₹{d.minBasket} • {d.redemptions} used
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            discounts: prev.discounts.map((x) => (x.id === d.id ? { ...x, active: !x.active } : x)),
                          }))
                        }
                        className={`px-2.5 py-1 rounded-full font-semibold text-[11px] ${
                          d.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {d.active ? "Active" : "Paused"}
                      </button>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleCreatePromo} className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <input
                    value={promoForm.code}
                    onChange={(e) => setPromoForm({ ...promoForm, code: e.target.value })}
                    placeholder="Promo code (e.g. WEEKEND15)"
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 font-mono uppercase"
                  />
                  <input
                    value={promoForm.title}
                    onChange={(e) => setPromoForm({ ...promoForm, title: e.target.value })}
                    placeholder="Campaign name"
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200"
                  />
                  <button type="submit" className="col-span-2 py-2 rounded-lg bg-slate-900 text-white font-semibold">
                    Create & Activate Promo
                  </button>
                </form>
              </div>

              <div className="lg:col-span-6 bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3">
                <h2 className="text-base font-bold">Daily Store Closeout Report (Z-Summary)</h2>
                <div className="space-y-2 text-xs border rounded-xl p-3 bg-[#F8FAFC]">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Gross Register Sales</span>
                    <span className="font-mono font-bold">₹{metrics.grossSales.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-amber-700">
                    <span>Total Returns / RMAs</span>
                    <span className="font-mono">-₹{metrics.totalReturns.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm border-t border-slate-200 pt-2">
                    <span>Net Daily Store Revenue</span>
                    <span className="font-mono text-[#004AC6]">₹{metrics.netSales.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Blended Gross Margin</span>
                    <span className="font-mono font-bold">{metrics.marginPct}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Product Modal */}
      {addProductOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddProduct}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-5 space-y-3 text-xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Add Store Product & Variant</h3>
              <button type="button" onClick={() => setAddProductOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            {newProdError && (
              <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{newProdError}</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <input
                value={newProdForm.sku}
                onChange={(e) => setNewProdForm({ ...newProdForm, sku: e.target.value })}
                placeholder="SKU (e.g. SKU-ACC-9901)"
                className="px-3 py-2 rounded-lg border border-slate-200 font-mono uppercase"
              />
              <input
                value={newProdForm.category}
                onChange={(e) => setNewProdForm({ ...newProdForm, category: e.target.value })}
                placeholder="Category"
                className="px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
            <input
              value={newProdForm.name}
              onChange={(e) => setNewProdForm({ ...newProdForm, name: e.target.value })}
              placeholder="Product Name"
              className="w-full px-3 py-2 rounded-lg border border-slate-200"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                value={newProdForm.variantLabel}
                onChange={(e) => setNewProdForm({ ...newProdForm, variantLabel: e.target.value })}
                placeholder="Variant (Color / Size)"
                className="px-3 py-2 rounded-lg border border-slate-200"
              />
              <input
                type="number"
                value={newProdForm.retailPrice}
                onChange={(e) => setNewProdForm({ ...newProdForm, retailPrice: e.target.value })}
                placeholder="Retail ₹"
                className="px-3 py-2 rounded-lg border border-slate-200 font-mono"
              />
              <input
                type="number"
                value={newProdForm.stock}
                onChange={(e) => setNewProdForm({ ...newProdForm, stock: e.target.value })}
                placeholder="Initial Stock"
                className="px-3 py-2 rounded-lg border border-slate-200 font-mono"
              />
            </div>
            <button type="submit" className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold">
              Save Product to Store Catalogue
            </button>
          </form>
        </div>
      )}

      <CustomizationModal demo={toDemoModel(product)} isOpen={customModalOpen} onClose={() => setCustomModalOpen(false)} />
    </div>
  );
}
