"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DemoModel } from "@/types/demo";
import { CustomizationModal } from "@/components/demos/CustomizationModal";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ArrowLeft, 
  RotateCcw, 
  ShieldAlert, 
  Cpu, 
  UserCheck, 
  CheckCircle2, 
  ExternalLink,
  Smartphone,
  Monitor,
  ShoppingCart,
  Send,
  Plus,
  Trash2,
  Calendar,
  CreditCard,
  Bot,
  Activity,
  FileText,
  Search,
  Filter,
  Layers,
  Sparkles,
  DollarSign,
  TrendingUp,
  Clock
} from "lucide-react";

interface LiveDemoSimulatorProps {
  demo: DemoModel;
}

export function LiveDemoSimulator({ demo }: LiveDemoSimulatorProps) {
  const { t } = useLanguage();
  const [activeRole, setActiveRole] = useState<"admin" | "customer" | "staff">("admin");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [customizationOpen, setCustomizationOpen] = useState(false);
  const [resetNotice, setResetNotice] = useState(false);

  // Simulated state for Restaurant/Food
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Signature Paneer Tikka Platter", price: 349, qty: 1 },
    { id: 2, name: "Butter Garlic Naan (2 pcs)", price: 90, qty: 2 }
  ]);
  const [tableBooking, setTableBooking] = useState({ date: "Today, 8:00 PM", guests: "4 Guests", name: "Vikram S." });
  const [kotList, setKotList] = useState([
    { id: "KOT-849", table: "Table 4", items: "1x Paneer Tikka, 2x Naan", status: "Cooking" },
    { id: "KOT-850", table: "Table 7", items: "2x Cold Brew, 1x Cheesecake", status: "Ready" }
  ]);

  // Simulated state for E-Commerce
  const [ecomCart, setEcomCart] = useState([
    { id: "p1", title: "Smart Noise Cancelling Earbuds", price: 2499, qty: 1 },
    { id: "p2", title: "Braided Fast Charge USB-C Cable", price: 499, qty: 2 }
  ]);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  // Simulated state for CRM / ERP
  const [crmDeals, setCrmDeals] = useState([
    { id: "d1", title: "Apex Tech Cloud Migration", value: "₹4,50,000", stage: "Proposal Sent" },
    { id: "d2", title: "Global Logistics Fleet ERP", value: "₹8,20,000", stage: "Qualified" },
    { id: "d3", title: "Zenith Retail POS Rollout", value: "₹2,80,000", stage: "Won" }
  ]);

  // Simulated state for AI Assistant
  const [aiChatMessages, setAiChatMessages] = useState<{ sender: "user" | "ai"; text: string; time: string }[]>([
    { sender: "ai", text: `Hello! I am your StarX AI Assistant for ${demo.name}. How can I assist you with operational insights, customer queries, or automated reports today?`, time: "12:01 PM" }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [tokensUsed, setTokensUsed] = useState(148);

  const triggerReset = () => {
    setCartItems([
      { id: 1, name: "Signature Paneer Tikka Platter", price: 349, qty: 1 },
      { id: 2, name: "Butter Garlic Naan (2 pcs)", price: 90, qty: 2 }
    ]);
    setKotList([
      { id: "KOT-849", table: "Table 4", items: "1x Paneer Tikka, 2x Naan", status: "Cooking" },
      { id: "KOT-850", table: "Table 7", items: "2x Cold Brew, 1x Cheesecake", status: "Ready" }
    ]);
    setOrderStatus(null);
    setAiChatMessages([
      { sender: "ai", text: `Demo data refreshed! Ask anything about ${demo.name}.`, time: "Just now" }
    ]);
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 3000);
  };

  const handleAiSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const userMsg = aiInput;
    setAiChatMessages((prev) => [...prev, { sender: "user", text: userMsg, time: "Just now" }]);
    setAiInput("");
    setTokensUsed((prev) => prev + Math.floor(Math.random() * 60) + 35);

    setTimeout(() => {
      let reply = `[Autonomous Agent]: I have analyzed your request "${userMsg}" against the ${demo.name} database. Action verified, telemetry logged, and response generated with zero latency.`;
      setAiChatMessages((prev) => [...prev, { sender: "ai", text: reply, time: "Just now" }]);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#040A14] text-slate-100 flex flex-col">
      {/* 1. VISIBLE DEMO ENVIRONMENT INDICATOR BANNER */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-black px-4 py-2 font-mono text-xs flex items-center justify-between shadow-md z-50">
        <div className="flex items-center gap-2 font-bold tracking-wide">
          <ShieldAlert className="w-4 h-4 fill-black text-amber-500" />
          <span>DEMO ENVIRONMENT ACTIVE &bull; ISOLATED SANDBOX</span>
          <span className="hidden sm:inline font-normal opacity-90">
            &mdash; Fictional data only. Real production databases are safeguarded.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={triggerReset}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-black text-amber-300 hover:bg-black/80 font-bold transition-all text-[11px]"
            title="Reset sandbox to original sample data"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* 2. TOP SIMULATOR NAVIGATION & ROLE CONTROLS */}
      <header className="bg-[#081324] border-b border-[#163359] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand, Demo Name & Return */}
        <div className="flex items-center gap-3">
          <Link
            href={`/demos/${demo.categorySlug}/${demo.slug}`}
            className="p-2 rounded-xl bg-[#050D1A] text-slate-300 hover:text-white border border-[#143054] transition-all flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit Sandbox</span>
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#73D8FF]">STARX ALPHA LABS</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#102D50] text-[#73D8FF] border border-[#1769AA]/40 font-mono">
                #{demo.id}
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white truncate max-w-[240px] sm:max-w-md">
              {demo.name}
            </h1>
          </div>
        </div>

        {/* Center: Interactive Role Switcher Persona */}
        <div className="flex items-center bg-[#050D1A] p-1 rounded-xl border border-[#143054] text-xs">
          <span className="text-[11px] font-semibold text-slate-400 px-2 hidden md:inline">
            Active Persona:
          </span>
          {[
            { id: "admin", label: "Admin Console" },
            { id: "customer", label: "Customer View" },
            { id: "staff", label: "Staff / Vendor" }
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRole(r.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeRole === r.id
                  ? "bg-[#1769AA] text-white shadow-md shadow-[#1769AA]/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Right: Device Viewport Toggle & Customization Trigger */}
        <div className="flex items-center gap-2">
          {/* Device viewport */}
          <div className="hidden lg:flex items-center bg-[#050D1A] p-1 rounded-xl border border-[#143054]">
            <button
              onClick={() => setDeviceMode("desktop")}
              className={`p-1.5 rounded-lg ${deviceMode === "desktop" ? "bg-[#102D50] text-[#73D8FF]" : "text-slate-400"}`}
              title="Desktop Layout"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode("mobile")}
              className={`p-1.5 rounded-lg ${deviceMode === "mobile" ? "bg-[#102D50] text-[#73D8FF]" : "text-slate-400"}`}
              title="Mobile App Frame"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setCustomizationOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-600/30"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Customize This</span>
          </button>
        </div>
      </header>

      {/* Reset Confirmation Toast */}
      {resetNotice && (
        <div className="bg-emerald-900/90 border border-emerald-500 text-emerald-200 px-4 py-2 text-xs text-center font-medium animate-fadeIn">
          Sample database state has been successfully restored to initial demo seeds.
        </div>
      )}

      {/* 3. SIMULATOR WORKSPACE */}
      <div className="flex-1 p-3 sm:p-6 flex items-center justify-center overflow-auto">
        <div
          className={`transition-all duration-300 w-full ${
            deviceMode === "mobile"
              ? "max-w-sm rounded-[40px] border-4 border-[#1E4373] p-3 bg-[#06101E] shadow-2xl"
              : "max-w-6xl rounded-2xl border border-[#163359] bg-[#071324] shadow-2xl p-4 sm:p-6"
          }`}
        >
          {/* WORKSPACE CONTENT DEPENDING ON CATEGORY & ROLE */}

          {/* SCENARIO A: RESTAURANT & FOOD (#1 - #15) */}
          {demo.categoryNumber === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#143054] pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Restaurant Hub &bull; {activeRole.toUpperCase()} VIEW</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    {activeRole === "admin" && "Live Kitchen Order Tickets (KOT) & POS Billing Telemetry"}
                    {activeRole === "customer" && "Digital Table Ordering, QR Menu & Split Bill Checkout"}
                    {activeRole === "staff" && "Kitchen Display System (KDS) & Delivery Partner Dispatch"}
                  </p>
                </div>
                <div className="text-xs font-mono bg-[#102D50] px-3 py-1 rounded-xl text-[#73D8FF]">
                  Outlet: Downtown StarX Branch #01
                </div>
              </div>

              {/* Customer View */}
              {activeRole === "customer" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Digital Menu */}
                  <div className="md:col-span-2 space-y-3">
                    <div className="font-semibold text-xs text-slate-300 uppercase tracking-wider">
                      Chef Recommended Menu
                    </div>
                    {[
                      { name: "Smoked Butter Chicken Slider", price: 399, cat: "Chef Special" },
                      { name: "Truffle Mushroom Risotto", price: 449, cat: "Italian Main" },
                      { name: "Charcoal Woodfired Pizza", price: 529, cat: "Pizzeria" },
                      { name: "Artisanal Mango Gelato", price: 219, cat: "Dessert" },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#091527] border border-[#143054] flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-white">{item.name}</div>
                          <div className="text-xs text-slate-400 font-mono">₹{item.price} &bull; {item.cat}</div>
                        </div>
                        <button
                          onClick={() => setCartItems([...cartItems, { id: Date.now(), name: item.name, price: item.price, qty: 1 }])}
                          className="px-3 py-1.5 rounded-lg bg-[#1769AA] hover:bg-[#1E7ECA] text-white text-xs font-semibold flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Cart & Table Summary */}
                  <div className="p-4 rounded-xl bg-[#091527] border border-[#143054] space-y-4">
                    <div className="font-semibold text-xs text-slate-300 uppercase tracking-wider flex items-center justify-between">
                      <span>Table Cart ({cartItems.length})</span>
                      <ShoppingCart className="w-4 h-4 text-[#32A9E8]" />
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {cartItems.map((c, i) => (
                        <div key={i} className="text-xs flex items-center justify-between border-b border-[#143054] pb-1.5">
                          <span className="text-slate-200 truncate max-w-[140px]">{c.name}</span>
                          <span className="font-mono text-[#73D8FF]">₹{c.price * c.qty}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#143054] space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>GST (5%):</span>
                        <span>₹{Math.round(cartItems.reduce((acc, c) => acc + c.price * c.qty, 0) * 0.05)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-white">
                        <span>Total Due:</span>
                        <span className="text-[#73D8FF]">
                          ₹{Math.round(cartItems.reduce((acc, c) => acc + c.price * c.qty, 0) * 1.05)}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setKotList([...kotList, { id: `KOT-${Math.floor(100 + Math.random() * 900)}`, table: "Table 12", items: `${cartItems.length} items`, status: "Cooking" }]);
                          setCartItems([]);
                          alert("Order fired to Kitchen Display System (KOT Created)!");
                        }}
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                      >
                        Fire Order to Kitchen
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin & Staff View */}
              {(activeRole === "admin" || activeRole === "staff") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Active KOT Queue */}
                  <div className="p-4 rounded-xl bg-[#091527] border border-[#143054] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-300 uppercase tracking-wider">
                        Live Kitchen Order Tickets (KDS)
                      </span>
                      <span className="text-xs text-emerald-400 font-mono">{kotList.length} Active</span>
                    </div>

                    <div className="space-y-2">
                      {kotList.map((kot, i) => (
                        <div key={i} className="p-3 rounded-lg bg-[#050D1A] border border-[#143054] flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-white">{kot.id} &bull; {kot.table}</div>
                            <div className="text-xs text-slate-300">{kot.items}</div>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            kot.status === "Cooking" ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300"
                          }`}>
                            {kot.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* POS Metrics & Revenue */}
                  <div className="p-4 rounded-xl bg-[#091527] border border-[#143054] space-y-4">
                    <span className="font-semibold text-xs text-slate-300 uppercase tracking-wider block">
                      POS Today&apos;s Settlement
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-[#050D1A] border border-[#143054]">
                        <div className="text-xs text-slate-400">Total Sales</div>
                        <div className="text-lg font-bold text-emerald-400">₹42,850</div>
                      </div>
                      <div className="p-3 rounded-lg bg-[#050D1A] border border-[#143054]">
                        <div className="text-xs text-slate-400">Covers / Orders</div>
                        <div className="text-lg font-bold text-[#73D8FF]">64 Orders</div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 bg-[#050D1A] p-2.5 rounded-lg border border-[#143054]">
                      Cashless split: 78% UPI / QR, 18% Cards, 4% Cash.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SCENARIO B: AI & AUTOMATION (#121 - #135) */}
          {(demo.categoryNumber === 9 || demo.isAiEnabled) && demo.categoryNumber !== 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#143054] pb-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-violet-400" />
                  <div>
                    <h3 className="text-sm font-bold text-white">{demo.name} &bull; AI Agent Playground</h3>
                    <p className="text-[11px] text-slate-400">Autonomous LLM reasoning engine with real-time vector search</p>
                  </div>
                </div>
                <div className="text-xs font-mono text-violet-300 bg-violet-950/60 px-3 py-1 rounded-xl border border-violet-500/30">
                  Tokens: {tokensUsed} &bull; Latency: 240ms
                </div>
              </div>

              {/* Chat Stream */}
              <div className="h-64 sm:h-80 overflow-y-auto space-y-3 p-4 bg-[#050D1A] rounded-2xl border border-[#143054]">
                {aiChatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#1769AA] text-white rounded-br-none"
                          : "bg-[#09182E] text-slate-200 border border-[#193B66] rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 px-1 font-mono">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleAiSend} className="flex gap-2">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder={`Interact with ${demo.name} agent...`}
                  className="flex-1 px-4 py-2.5 bg-[#050D1A] border border-[#163359] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-violet-600/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Execute</span>
                </button>
              </form>
            </div>
          )}

          {/* SCENARIO C: ENTERPRISE CRM / ERP / GENERAL BUSINESS */}
          {demo.categoryNumber !== 1 && demo.categoryNumber !== 9 && !demo.isAiEnabled && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#143054] pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#32A9E8]" />
                    <span>{demo.name} Operations Cockpit</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Live operational telemetry and records management matrix
                  </p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-xl bg-[#102D50] text-[#73D8FF]">
                  Environment: Live Staging
                </span>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-[#091527] border border-[#143054]">
                  <div className="text-xs text-slate-400">Active Records</div>
                  <div className="text-xl font-extrabold text-white">1,248</div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">+12% this month</div>
                </div>
                <div className="p-4 rounded-xl bg-[#091527] border border-[#143054]">
                  <div className="text-xs text-slate-400">Process Health</div>
                  <div className="text-xl font-extrabold text-emerald-400">99.98%</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">Zero anomalies</div>
                </div>
                <div className="p-4 rounded-xl bg-[#091527] border border-[#143054]">
                  <div className="text-xs text-slate-400">Active Sessions</div>
                  <div className="text-xl font-extrabold text-[#73D8FF]">18 Users</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">Role isolated</div>
                </div>
              </div>

              {/* Interactive Records List */}
              <div className="p-4 rounded-xl bg-[#091527] border border-[#143054] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Recent Enterprise Records ({crmDeals.length})
                  </span>
                  <button
                    onClick={() => setCrmDeals([...crmDeals, { id: `d${Date.now()}`, title: "New Enterprise Contract", value: "₹3,50,000", stage: "New Lead" }])}
                    className="px-3 py-1 rounded-lg bg-[#1769AA] text-white text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Create Record</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {crmDeals.map((deal) => (
                    <div key={deal.id} className="p-3 rounded-lg bg-[#050D1A] border border-[#143054] flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{deal.title}</div>
                        <div className="text-slate-400 font-mono">{deal.id} &bull; Value: {deal.value}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-[#102D50] text-[#73D8FF] font-semibold">
                        {deal.stage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. FOOTER CONTROLS & TEST ACCOUNT QUICK COPY */}
      <footer className="bg-[#081324] border-t border-[#163359] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 text-slate-400">
          <span>Active Role Credentials:</span>
          <code className="text-[#73D8FF] bg-[#050D1A] px-2 py-0.5 rounded border border-[#143054]">
            {activeRole}.{demo.id}@starxalphalabs.io
          </code>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/demos/${demo.categorySlug}/${demo.slug}`}
            className="text-slate-300 hover:text-white"
          >
            Specification Page
          </Link>
          <span className="text-slate-600">&bull;</span>
          <Link
            href="/demos"
            className="text-[#32A9E8] hover:underline"
          >
            All 160 Demos
          </Link>
        </div>
      </footer>

      <CustomizationModal
        demo={demo}
        isOpen={customizationOpen}
        onClose={() => setCustomizationOpen(false)}
      />
    </div>
  );
}
