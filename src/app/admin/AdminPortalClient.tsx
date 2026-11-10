"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ALL_DEMOS } from "@/data/demos";
import { DEMO_CATEGORIES } from "@/data/categories";
import { DemoModel } from "@/types/demo";
import { getEnquiries, updateEnquiryStatus, DemoEnquiry } from "@/lib/leadStore";
import { getQuotations, saveQuotation, Quotation } from "@/lib/quotationStore";
import { getClientProjects, advanceProjectStage, ClientProject, ProjectStage, PROJECT_STAGES } from "@/lib/projectStore";
import { getEstimates, updateEstimateStatus, CustomerEstimate } from "@/lib/estimateStore";
import { 
  WEBSITE_PACKAGES, 
  APP_PACKAGES, 
  COMBO_PACKAGES, 
  DEVELOPMENT_ADDONS,
  formatINR,
  DivisionType
} from "@/data/developmentPackages";
import { useTheme } from "@/context/ThemeContext";
import { 
  BarChart3, 
  Layers, 
  Users, 
  FileText, 
  Plus, 
  Search, 
  Download, 
  Upload, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  PhoneCall, 
  Mail, 
  Building, 
  ShieldCheck, 
  Filter, 
  Sparkles, 
  ArrowUpRight,
  ExternalLink,
  DollarSign,
  Palette,
  Calculator,
  Globe,
  Smartphone,
  Tag,
  ArrowRight
} from "lucide-react";

export function AdminPortalClient() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "divisions" | "estimates" | "quotations" | "projects" | "crm" | "demos"
  >("overview");

  const { activeThemeId } = useTheme();

  // Demos state (initial 160 demos)
  const [demosList, setDemosList] = useState<DemoModel[]>(ALL_DEMOS);
  const [demoSearch, setDemoSearch] = useState("");
  const [selectedCatFilter, setSelectedCatFilter] = useState("all");

  // CRM state
  const [enquiries, setEnquiries] = useState<DemoEnquiry[]>(() =>
    typeof window !== "undefined" ? getEnquiries() : []
  );
  const [leadStatusFilter, setLeadStatusFilter] = useState("all");

  // Quotations state
  const [quotations, setQuotations] = useState<Quotation[]>(() =>
    typeof window !== "undefined" ? getQuotations() : []
  );

  // Projects state
  const [projects, setProjects] = useState<ClientProject[]>(() =>
    typeof window !== "undefined" ? getClientProjects() : []
  );

  // Estimates state
  const [estimates, setEstimates] = useState<CustomerEstimate[]>(() =>
    typeof window !== "undefined" ? getEstimates() : []
  );

  // Selected Division in Package view
  const [adminDivisionTab, setAdminDivisionTab] = useState<DivisionType>("website");

  // Modals & Forms
  const [editDemoModal, setEditDemoModal] = useState<DemoModel | null>(null);
  const [newQuotationModal, setNewQuotationModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Quotation form state
  const [newQuoteForm, setNewQuoteForm] = useState({
    clientName: "",
    clientBusiness: "",
    clientEmail: "",
    clientPhone: "",
    division: "combo" as DivisionType,
    packageCode: "C2",
    selectedSolution: "Business Combo (10-Page Web + Android & iOS Apps)",
    projectScope: "Full synchronized Next.js web application, Flutter iOS & Android apps with shared Supabase backend.",
    devAmount: 49999,
    hostingAmount: 4999,
    integrationAmount: 4999,
    maintenanceAmount: 2999,
    paymentSchedule: "50% Advance on Kickoff, 30% on Beta Staging, 20% on Live Handover",
    deliveryTimeline: "14–21 Days"
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const reloadData = () => {
    setEnquiries(getEnquiries());
    setQuotations(getQuotations());
    setProjects(getClientProjects());
    setEstimates(getEstimates());
  };

  // Convert Estimate to Quotation
  const handleConvertEstimateToQuote = (est: CustomerEstimate) => {
    saveQuotation({
      clientName: est.clientName,
      clientBusiness: est.clientBusiness,
      clientEmail: est.clientEmail,
      clientPhone: est.clientPhone,
      selectedSolution: `${est.packageCode} — ${est.packageName}`,
      projectScope: `Scope built via Interactive Project Calculator for ${est.division.toUpperCase()} division. Deliverables include base package and ${est.selectedAddons.length} power-up modules.`,
      modules: est.selectedAddons.map((a) => a.name),
      features: ["Source Code Ownership", "Staging Environment Approvals", "30-Day Technical Warranty"],
      items: [
        { id: "i1", category: "Development", title: `Base Package: ${est.packageCode}`, description: est.packageName, amount: est.basePrice },
        { id: "i2", category: "Integrations & APIs", title: `Add-on Modules (${est.selectedAddons.length})`, description: est.selectedAddons.map((a) => a.name).join(", "), amount: est.addonsTotal },
        { id: "i3", category: "Hosting & Cloud", title: "Cloud Infrastructure Setup", description: "Configured managed environment", amount: est.hostingCost },
        { id: "i4", category: "Maintenance & SLA", title: "Hypercare & Maintenance SLA", description: "First period post-launch coverage", amount: est.maintenanceCost }
      ],
      subtotal: est.subtotal,
      taxRate: 0.18,
      taxAmount: est.gstAmount,
      totalAmount: est.grandTotal,
      paymentSchedule: "50% Advance, 30% Staging Approval, 20% Live Handover",
      deliveryTimeline: "10–21 Days",
      termsAndConditions: [
        "Deliverables verified in client staging before production deployment.",
        "Includes source code ownership and technical handover documentation."
      ]
    });

    updateEstimateStatus(est.id, "Quotation Issued");
    reloadData();
    setActiveTab("quotations");
    showToast(`Converted Estimate ${est.estimateNumber} into formal Quotation!`);
  };

  // Filter demos in management table
  const filteredDemos = demosList.filter((d) => {
    const matchesCat = selectedCatFilter === "all" || d.categorySlug === selectedCatFilter;
    const matchesSearch =
      !demoSearch.trim() ||
      d.name.toLowerCase().includes(demoSearch.toLowerCase()) ||
      d.id.toString() === demoSearch.trim();
    return matchesCat && matchesSearch;
  });

  // CSV Export
  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Category", "DevType", "Platform", "Price", "EstTime", "Status", "AI", "Ecommerce"];
    const rows = demosList.map((d) => [
      d.id,
      `"${d.name.replace(/"/g, '""')}"`,
      `"${d.categoryName.replace(/"/g, '""')}"`,
      d.developmentType,
      d.platform,
      `"${d.indicativeStartingPrice}"`,
      `"${d.estimatedDevelopmentTime}"`,
      d.availabilityStatus,
      d.isAiEnabled ? "Yes" : "No",
      d.isEcommerce ? "Yes" : "No"
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `starx_demos_inventory_160.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("160 Demos exported to CSV successfully.");
  };

  // Save edited demo
  const handleSaveDemoEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editDemoModal) return;
    setDemosList((prev) =>
      prev.map((d) => (d.id === editDemoModal.id ? editDemoModal : d))
    );
    showToast(`Updated Demo #${editDemoModal.id} — ${editDemoModal.name}`);
    setEditDemoModal(null);
  };

  // Create Quotation Submit
  const handleCreateQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal =
      newQuoteForm.devAmount +
      newQuoteForm.hostingAmount +
      newQuoteForm.integrationAmount +
      newQuoteForm.maintenanceAmount;
    const taxAmount = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + taxAmount;

    saveQuotation({
      clientName: newQuoteForm.clientName,
      clientBusiness: newQuoteForm.clientBusiness,
      clientEmail: newQuoteForm.clientEmail,
      clientPhone: newQuoteForm.clientPhone,
      selectedSolution: newQuoteForm.selectedSolution,
      projectScope: newQuoteForm.projectScope,
      modules: ["Core System Architecture", "Administrative Console", "API Integrations", "Security Matrix"],
      features: ["Custom Domain & SSL", "High-throughput Database", "Automated Backups", "SLA Monitoring"],
      items: [
        { id: "i1", category: "Development", title: "Core Software & Frontend Engineering", description: "Responsive Next.js application & business logic", amount: newQuoteForm.devAmount },
        { id: "i2", category: "Hosting & Cloud", title: "Enterprise Database & Edge CDN Deployment", description: "Supabase PostgreSQL setup with automated backups", amount: newQuoteForm.hostingAmount },
        { id: "i3", category: "Integrations & APIs", title: "Payment & Third-party Service APIs", description: "Razorpay / Stripe webhooks & transactional messaging", amount: newQuoteForm.integrationAmount },
        { id: "i4", category: "Maintenance & SLA", title: "Annual Hypercare & Security Patches", description: "Priority issue resolution and code maintenance", amount: newQuoteForm.maintenanceAmount }
      ],
      subtotal,
      taxRate: 0.18,
      taxAmount,
      totalAmount,
      paymentSchedule: newQuoteForm.paymentSchedule,
      deliveryTimeline: newQuoteForm.deliveryTimeline,
      termsAndConditions: [
        "Deliverables verified in client staging before production deployment.",
        "Includes source code ownership and technical handover documentation."
      ]
    });

    setNewQuotationModal(false);
    reloadData();
    showToast("Quotation generated & transmitted to Customer Workspace!");
  };

  return (
    <div className="min-h-screen bg-[#030B24] text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Admin Navigation Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#087BFF]/20 text-[#00D9FF] border border-[#00D9FF]/30">
                Central Operations Console
              </span>
              <span className="text-xs text-[#00C98B] font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#00C98B] animate-pulse" />
                Root Authority
              </span>
              <span className="text-xs font-mono text-slate-400">
                Theme: <span className="text-[#00D9FF] uppercase">{activeThemeId}</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              StarX Alpha Labs &bull; Unified Super Admin
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/settings/appearance"
              className="px-4 py-2 rounded-xl bg-[#071638] hover:bg-[#0A1940] text-slate-200 text-xs font-bold border border-[#00D9FF]/30 flex items-center gap-2"
            >
              <Palette className="w-4 h-4 text-[#00D9FF]" />
              <span>Live Theme Studio</span>
            </Link>
            <Link
              href="/demos"
              className="px-4 py-2 rounded-xl bg-[#071638] hover:bg-[#0A1940] text-slate-200 text-xs font-semibold border border-white/10 flex items-center gap-1.5"
            >
              <span>Public Demos</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#00D9FF]" />
            </Link>
          </div>
        </div>

        {/* Global Toast */}
        {toastMessage && (
          <div className="p-3.5 rounded-xl bg-[#00C98B]/20 border border-[#00C98B] text-[#00C98B] text-xs font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
          {[
            { id: "overview", label: "Executive Analytics", icon: BarChart3 },
            { id: "divisions", label: "Divisions & Pricing", icon: Layers },
            { id: "estimates", label: `Calculator Estimates (${estimates.length})`, icon: Calculator },
            { id: "quotations", label: `Quotations Hub (${quotations.length})`, icon: FileText },
            { id: "projects", label: `Active Projects (${projects.length})`, icon: Sparkles },
            { id: "crm", label: `CRM & Leads (${enquiries.length})`, icon: Users },
            { id: "demos", label: `Demo Catalog (${demosList.length})`, icon: Globe }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white shadow-lg shadow-[#087BFF]/30"
                    : "bg-[#071638] text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: EXECUTIVE ANALYTICS */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Demo Models", val: "160 Active", sub: "12 Main Categories", change: "+100% Verified" },
                { label: "Showcase Visitors", val: "16,450", sub: "Last 30 Days", change: "+28.2%" },
                { label: "Pipeline & Estimates", val: `₹${(estimates.reduce((s, e) => s + e.grandTotal, 0) / 100000).toFixed(1)} Lakhs`, sub: `${estimates.length} Calculator Submissions`, change: "Active Demand" },
                { label: "Projects Underway", val: `${projects.length} Active`, sub: "13-Stage Workflow", change: "100% on schedule" }
              ].map((kpi, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#0A1940] border border-white/5 space-y-2">
                  <span className="text-xs text-slate-400 font-medium">{kpi.label}</span>
                  <div className="text-2xl font-extrabold text-white">{kpi.val}</div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{kpi.sub}</span>
                    <span className="text-[#00C98B] font-mono font-semibold">{kpi.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Row */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setNewQuotationModal(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-bold hover:brightness-110 flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Custom Quotation</span>
              </button>
              <Link
                href="/project-calculator"
                className="px-5 py-2.5 rounded-xl bg-[#071638] text-white text-xs font-semibold border border-[#00D9FF]/30 hover:bg-[#0A1940] flex items-center gap-1.5"
              >
                <Calculator className="w-4 h-4 text-[#00D9FF]" />
                <span>Open Project Calculator Tool</span>
              </Link>
              <button
                onClick={handleExportCSV}
                className="px-5 py-2.5 rounded-xl bg-[#071638] text-slate-200 text-xs font-semibold border border-white/10 hover:bg-[#0A1940] flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#00C98B]" />
                <span>Export Complete 160 Demos (CSV)</span>
              </button>
            </div>

            {/* Category Distribution */}
            <div className="p-6 rounded-3xl bg-[#0A1940] border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">160 Enterprise Demo Models by Category</h3>
                <span className="text-xs text-[#00D9FF] font-mono">12 / 12 Categories Fully Active</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {DEMO_CATEGORIES.map((cat) => (
                  <div key={cat.slug} className="p-3.5 rounded-xl bg-[#071638] border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono">Cat #{cat.number}</span>
                      <span className="font-bold text-[#00D9FF]">{cat.count} Models</span>
                    </div>
                    <div className="text-xs font-bold text-white truncate">{cat.name}</div>
                    <div className="w-full h-1.5 rounded-full bg-[#030B24] overflow-hidden">
                      <div
                        className="h-full bg-[#087BFF]"
                        style={{ width: `${(cat.count / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DIVISIONS & PRICING PACKAGES */}
        {activeTab === "divisions" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4 bg-[#071638] p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2">
                {(["website", "app", "combo"] as DivisionType[]).map((div) => (
                  <button
                    key={div}
                    type="button"
                    onClick={() => setAdminDivisionTab(div)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      adminDivisionTab === div
                        ? "bg-[#087BFF] text-white shadow"
                        : "bg-[#0A1940] text-slate-400 hover:text-white"
                    }`}
                  >
                    {div === "website" ? "Division A: Website (W1–W6)" : div === "app" ? "Division B: App (A1–A5)" : "Division C: Combo (C1–C5)"}
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono text-slate-400">
                Official Currency: <span className="text-[#00D9FF] font-bold">INR (₹)</span>
              </div>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(adminDivisionTab === "website" ? WEBSITE_PACKAGES : adminDivisionTab === "app" ? APP_PACKAGES : COMBO_PACKAGES).map((pkg) => (
                <div key={pkg.code} className="p-6 rounded-3xl bg-[#0A1940] border border-white/5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#071638] text-[#00D9FF] border border-[#00D9FF]/30">
                        {pkg.code}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{pkg.timeline}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">{pkg.name}</h4>
                    <p className="text-xs text-[#C8D5EF]">{pkg.tagline}</p>
                    <div className="text-2xl font-extrabold text-white">
                      {formatINR(pkg.startingPrice)}
                    </div>
                    <div className="text-xs text-slate-400">Scope: {pkg.pagesOrScreens}</div>
                    <div className="pt-2 border-t border-white/5 space-y-1 text-xs text-slate-300">
                      {pkg.features.slice(0, 4).map((f) => (
                        <div key={f} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B] shrink-0" />
                          <span className="truncate">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <Link
                      href={`/project-calculator?division=${pkg.division}&package=${pkg.code}`}
                      className="text-xs font-bold text-[#00D9FF] hover:underline flex items-center gap-1"
                    >
                      <span>Configure Quote for Client</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ESTIMATES FROM PROJECT CALCULATOR */}
        {activeTab === "estimates" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Project Calculator Estimator Submissions</h3>
                <p className="text-xs text-[#C8D5EF]">
                  Inbound estimates configured by potential clients on the 7-step interactive calculator.
                </p>
              </div>
              <span className="text-xs font-mono text-[#00D9FF]">{estimates.length} Total Inbound Estimates</span>
            </div>

            <div className="space-y-4">
              {estimates.map((est) => (
                <div key={est.id} className="p-6 rounded-3xl bg-[#0A1940] border border-white/5 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#071638] text-[#00D9FF]">
                          {est.estimateNumber}
                        </span>
                        <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-300">
                          {est.division}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          est.status === "Quotation Issued" ? "bg-[#00C98B]/20 text-[#00C98B]" : "bg-amber-500/20 text-amber-400"
                        }`}>
                          {est.status}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">
                        {est.packageCode} — {est.packageName}
                      </h4>
                      <div className="text-xs text-[#C8D5EF] mt-0.5">
                        Client: <span className="text-white font-semibold">{est.clientName}</span> ({est.clientBusiness}) &bull; {est.clientEmail} &bull; {est.clientPhone}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xl font-extrabold text-white">{formatINR(est.grandTotal)}</div>
                      <span className="text-[10px] font-mono text-slate-400">Total with 18% GST</span>
                    </div>
                  </div>

                  {/* Add-ons line */}
                  {est.selectedAddons && est.selectedAddons.length > 0 && (
                    <div className="p-3 rounded-xl bg-[#071638] text-xs text-[#C8D5EF] flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white">Included Add-ons:</span>
                      {est.selectedAddons.map((a) => (
                        <span key={a.id} className="px-2 py-0.5 rounded bg-[#0A1940] border border-white/5 text-[11px]">
                          {a.name} (+{formatINR(a.price)})
                        </span>
                      ))}
                    </div>
                  )}

                  {est.notes && (
                    <p className="text-xs text-slate-300 italic bg-[#071638]/50 p-2.5 rounded-xl border border-white/5">
                      Client Note: &ldquo;{est.notes}&rdquo;
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-[11px] font-mono text-slate-400">
                      Submitted: {new Date(est.createdAt).toLocaleDateString()}
                    </span>
                    {est.status !== "Quotation Issued" ? (
                      <button
                        type="button"
                        onClick={() => handleConvertEstimateToQuote(est)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-bold text-xs shadow hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Convert to Formal Quotation →</span>
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-[#00C98B] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Quotation Transmitted
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: QUOTATIONS HUB */}
        {activeTab === "quotations" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Commercial Quotations Engine</h3>
                <p className="text-xs text-[#C8D5EF]">
                  Formal milestone scope proposals generated for prospective and existing clients.
                </p>
              </div>
              <button
                onClick={() => setNewQuotationModal(true)}
                className="px-4 py-2 rounded-xl bg-[#087BFF] text-white text-xs font-bold hover:brightness-110 flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Plus className="w-4 h-4" />
                <span>New Quotation</span>
              </button>
            </div>

            <div className="space-y-4">
              {quotations.map((quote) => (
                <div key={quote.id} className="p-6 rounded-3xl bg-[#0A1940] border border-white/5 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#071638] text-[#00D9FF]">
                          {quote.quotationNumber}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          quote.status === "Approved" ? "bg-[#00C98B]/20 text-[#00C98B]" : "bg-amber-500/20 text-amber-400"
                        }`}>
                          {quote.status}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">{quote.selectedSolution}</h4>
                      <div className="text-xs text-[#C8D5EF]">Client: {quote.clientName} &bull; {quote.clientBusiness}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-extrabold text-white">{formatINR(quote.totalAmount)}</div>
                      <span className="text-[10px] font-mono text-slate-400">Timeline: {quote.deliveryTimeline}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300">{quote.projectScope}</p>

                  <div className="p-3 rounded-xl bg-[#071638] flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Payment Milestones: {quote.paymentSchedule}</span>
                    <span className="text-[#00D9FF] font-bold">GST 18% Included</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ACTIVE PROJECTS (13-STAGE WORKFLOW TRACKER) */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">13-Stage Project Workflow Tracker</h3>
                <p className="text-xs text-[#C8D5EF]">
                  Production delivery tracking from initial Requirement Gathering to Active SLA Maintenance.
                </p>
              </div>
              <span className="text-xs font-mono text-[#00D9FF]">13 Standardized Milestone Stages</span>
            </div>

            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.id} className="p-6 rounded-3xl bg-[#0A1940] border border-white/5 space-y-5">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#071638] text-[#00D9FF]">
                          {proj.projectCode}
                        </span>
                        <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-300">
                          {proj.division || "combo"}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00C98B]/20 text-[#00C98B] font-bold">
                          {proj.status}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">{proj.projectName}</h4>
                      <div className="text-xs text-slate-400">Client: {proj.clientName} &bull; {proj.clientBusiness}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs font-mono text-slate-400 block">Current Stage</span>
                        <span className="text-xs font-bold text-[#00D9FF]">{proj.currentStage}</span>
                      </div>

                      <select
                        value={proj.currentStage}
                        onChange={(e) => {
                          advanceProjectStage(proj.id, e.target.value as ProjectStage);
                          reloadData();
                          showToast(`Advanced project ${proj.projectCode} to stage "${e.target.value}"`);
                        }}
                        className="bg-[#071638] border border-white/10 rounded-xl text-xs font-bold text-white px-3 py-2 focus:outline-none"
                      >
                        {PROJECT_STAGES.map((stg) => (
                          <option key={stg} value={stg}>{stg}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                      <span>Delivery Completion</span>
                      <span className="text-[#00D9FF] font-bold">{proj.progressPercent}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-[#071638] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#087BFF] via-[#00D9FF] to-[#00C98B] transition-all duration-300"
                        style={{ width: `${proj.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* 13 Stages Quick Timeline Pills */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                      13-Stage Milestone Chain:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {PROJECT_STAGES.map((stageName, sIdx) => {
                        const currentIdx = PROJECT_STAGES.indexOf(proj.currentStage);
                        const isDone = sIdx < currentIdx;
                        const isCurrent = sIdx === currentIdx;
                        return (
                          <span
                            key={stageName}
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 ${
                              isDone
                                ? "bg-[#00C98B]/20 text-[#00C98B] border border-[#00C98B]/30"
                                : isCurrent
                                ? "bg-[#087BFF]/30 text-[#00D9FF] font-bold border border-[#00D9FF]/50 ring-1 ring-[#00D9FF]/40"
                                : "bg-[#071638] text-slate-500"
                            }`}
                          >
                            <span>{sIdx + 1}.</span>
                            <span>{stageName}</span>
                            {isDone && <span>✓</span>}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CRM & LEADS */}
        {activeTab === "crm" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Client CRM &amp; Lead Management</h3>
                <p className="text-xs text-[#C8D5EF]">
                  Inbound contact enquiries, demo booking requests, and consultation leads.
                </p>
              </div>
              <span className="text-xs font-mono text-[#00D9FF]">{enquiries.length} Inbound Leads</span>
            </div>

            <div className="space-y-3">
              {enquiries.map((lead) => (
                <div key={lead.id} className="p-5 rounded-2xl bg-[#0A1940] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{lead.name}</span>
                      <span className="text-xs text-slate-400">&bull; {lead.businessName}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        lead.status === "New" ? "bg-[#00D9FF]/20 text-[#00D9FF]" : "bg-white/5 text-slate-400"
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300">
                      Email: {lead.email} &bull; Phone: {lead.phone}
                    </div>
                    {lead.selectedDemoName && (
                      <div className="text-xs text-[#00D9FF] font-mono">
                        Interested Demo: {lead.selectedDemoName}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={lead.status}
                      onChange={(e) => {
                        updateEnquiryStatus(lead.id, e.target.value as any);
                        reloadData();
                        showToast(`Lead status updated to ${e.target.value}`);
                      }}
                      className="bg-[#071638] border border-white/10 rounded-xl text-xs font-bold text-white px-3 py-1.5 focus:outline-none"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Converted">Converted</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: DEMO CATALOGUE */}
        {activeTab === "demos" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#071638] p-4 rounded-2xl border border-white/5">
              <div className="flex flex-1 items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={demoSearch}
                    onChange={(e) => setDemoSearch(e.target.value)}
                    placeholder="Search by ID or model name..."
                    className="w-full pl-9 pr-3 py-1.5 bg-[#0A1940] rounded-xl border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00D9FF]"
                  />
                </div>

                <select
                  value={selectedCatFilter}
                  onChange={(e) => setSelectedCatFilter(e.target.value)}
                  className="bg-[#0A1940] border border-white/10 rounded-xl text-xs text-slate-200 px-3 py-2 focus:outline-none"
                >
                  <option value="all">All 12 Categories</option>
                  {DEMO_CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name} ({c.count})
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs font-mono text-slate-400">
                Displaying: <span className="text-[#00D9FF] font-bold">{filteredDemos.length}</span> of 160 Models
              </div>
            </div>

            {/* Demos Table */}
            <div className="rounded-2xl border border-white/5 bg-[#0A1940] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#071638] text-slate-400 font-mono uppercase text-[10px] border-b border-white/5">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">Model Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Starting Price</th>
                      <th className="p-3">Timeline</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredDemos.slice(0, 30).map((d) => (
                      <tr key={d.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 font-mono font-bold text-[#00D9FF]">#{d.id}</td>
                        <td className="p-3 font-bold text-white">{d.name}</td>
                        <td className="p-3 text-slate-300">{d.categoryName}</td>
                        <td className="p-3 font-mono text-[11px] text-slate-400">{d.developmentType}</td>
                        <td className="p-3 font-mono font-bold text-white">{d.indicativeStartingPrice}</td>
                        <td className="p-3 text-slate-400">{d.estimatedDevelopmentTime}</td>
                        <td className="p-3">
                          <button
                            onClick={() => setEditDemoModal(d)}
                            className="p-1.5 rounded-lg bg-[#071638] hover:bg-[#087BFF]/20 text-slate-300 hover:text-[#00D9FF]"
                            title="Edit Demo Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
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

        {/* EDIT DEMO MODAL */}
        {editDemoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-xl bg-[#0A1940] border border-[#00D9FF]/30 rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-bold text-white">
                Edit Demo #{editDemoModal.id}: <span className="text-[#00D9FF]">{editDemoModal.name}</span>
              </h3>
              <form onSubmit={handleSaveDemoEdit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Demo Name</label>
                  <input
                    type="text"
                    value={editDemoModal.name}
                    onChange={(e) => setEditDemoModal({ ...editDemoModal, name: e.target.value })}
                    className="w-full p-2.5 bg-[#071638] border border-white/10 rounded-xl text-white focus:border-[#00D9FF] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Starting Price (INR)</label>
                    <input
                      type="text"
                      value={editDemoModal.indicativeStartingPrice}
                      onChange={(e) => setEditDemoModal({ ...editDemoModal, indicativeStartingPrice: e.target.value })}
                      className="w-full p-2.5 bg-[#071638] border border-white/10 rounded-xl text-white focus:border-[#00D9FF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Est. Development Time</label>
                    <input
                      type="text"
                      value={editDemoModal.estimatedDevelopmentTime}
                      onChange={(e) => setEditDemoModal({ ...editDemoModal, estimatedDevelopmentTime: e.target.value })}
                      className="w-full p-2.5 bg-[#071638] border border-white/10 rounded-xl text-white focus:border-[#00D9FF] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditDemoModal(null)}
                    className="px-4 py-2 bg-[#071638] text-slate-300 rounded-xl hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-bold rounded-xl"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* NEW QUOTATION MODAL */}
        {newQuotationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-xl bg-[#0A1940] border border-[#00D9FF]/30 rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-bold text-white">Create Customized Quotation</h3>
              <form onSubmit={handleCreateQuotation} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Client Full Name *</label>
                    <input
                      required
                      type="text"
                      value={newQuoteForm.clientName}
                      onChange={(e) => setNewQuoteForm({ ...newQuoteForm, clientName: e.target.value })}
                      className="w-full p-2.5 bg-[#071638] border border-white/10 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Business Name *</label>
                    <input
                      required
                      type="text"
                      value={newQuoteForm.clientBusiness}
                      onChange={(e) => setNewQuoteForm({ ...newQuoteForm, clientBusiness: e.target.value })}
                      className="w-full p-2.5 bg-[#071638] border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Email *</label>
                    <input
                      required
                      type="email"
                      value={newQuoteForm.clientEmail}
                      onChange={(e) => setNewQuoteForm({ ...newQuoteForm, clientEmail: e.target.value })}
                      className="w-full p-2.5 bg-[#071638] border border-white/10 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Phone *</label>
                    <input
                      required
                      type="text"
                      value={newQuoteForm.clientPhone}
                      onChange={(e) => setNewQuoteForm({ ...newQuoteForm, clientPhone: e.target.value })}
                      className="w-full p-2.5 bg-[#071638] border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Selected Package / Scope</label>
                  <input
                    type="text"
                    value={newQuoteForm.selectedSolution}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, selectedSolution: e.target.value })}
                    className="w-full p-2.5 bg-[#071638] border border-white/10 rounded-xl text-white"
                  />
                </div>

                {/* Amounts in INR */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Development (₹ INR)</label>
                    <input
                      type="number"
                      value={newQuoteForm.devAmount}
                      onChange={(e) => setNewQuoteForm({ ...newQuoteForm, devAmount: Number(e.target.value) })}
                      className="w-full p-2 bg-[#071638] border border-white/10 rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Cloud / Hosting (₹ INR)</label>
                    <input
                      type="number"
                      value={newQuoteForm.hostingAmount}
                      onChange={(e) => setNewQuoteForm({ ...newQuoteForm, hostingAmount: Number(e.target.value) })}
                      className="w-full p-2 bg-[#071638] border border-white/10 rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Add-ons &amp; APIs (₹ INR)</label>
                    <input
                      type="number"
                      value={newQuoteForm.integrationAmount}
                      onChange={(e) => setNewQuoteForm({ ...newQuoteForm, integrationAmount: Number(e.target.value) })}
                      className="w-full p-2 bg-[#071638] border border-white/10 rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Maintenance SLA (₹ INR)</label>
                    <input
                      type="number"
                      value={newQuoteForm.maintenanceAmount}
                      onChange={(e) => setNewQuoteForm({ ...newQuoteForm, maintenanceAmount: Number(e.target.value) })}
                      className="w-full p-2 bg-[#071638] border border-white/10 rounded-xl text-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setNewQuotationModal(false)}
                    className="px-4 py-2 bg-[#071638] text-slate-400 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-bold rounded-xl"
                  >
                    Generate &amp; Send Quotation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
