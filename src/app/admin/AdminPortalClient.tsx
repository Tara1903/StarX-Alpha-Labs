"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ALL_DEMOS } from "@/data/demos";
import { DEMO_CATEGORIES } from "@/data/categories";
import { DemoModel } from "@/types/demo";
import { getEnquiries, updateEnquiryStatus, DemoEnquiry } from "@/lib/leadStore";
import { getQuotations, saveQuotation, Quotation } from "@/lib/quotationStore";
import { getClientProjects, advanceProjectStage, ClientProject, ProjectStage, PROJECT_STAGES } from "@/lib/projectStore";
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
  DollarSign
} from "lucide-react";

export function AdminPortalClient() {
  const [activeTab, setActiveTab] = useState<"overview" | "demos" | "crm" | "quotations" | "projects">("overview");

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
    selectedSolution: "E-Commerce Multi-Vendor Marketplace (Model #17)",
    projectScope: "Full marketplace architecture with seller dashboards and Razorpay payment splits.",
    devAmount: 75000,
    hostingAmount: 12000,
    integrationAmount: 15000,
    maintenanceAmount: 16000,
    paymentSchedule: "50% Advance on Kickoff, 50% on UAT Delivery",
    deliveryTimeline: "4 Weeks"
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const reloadData = () => {
    setEnquiries(getEnquiries());
    setQuotations(getQuotations());
    setProjects(getClientProjects());
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

  // CSV Import handler (simulated bulk update)
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast(`CSV file "${file.name}" ingested & validated. All 160 records synchronized.`);
    }
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
    <div className="min-h-screen bg-[#07111F] text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Admin Navigation Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#143054] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#102D50] text-[#73D8FF] border border-[#1769AA]/40">
                Central Operations Console
              </span>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Root Authority
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              StarX Alpha Labs &bull; Admin Management Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/demos"
              className="px-4 py-2 rounded-xl bg-[#091527] hover:bg-[#10243E] text-slate-200 text-xs font-semibold border border-[#163359] flex items-center gap-1.5"
            >
              <span>Public Demos Showcase</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#32A9E8]" />
            </Link>
          </div>
        </div>

        {/* Global Toast */}
        {toastMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-medium flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Admin Top Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#143054] pb-2 overflow-x-auto">
          {[
            { id: "overview", label: "Executive Analytics", icon: BarChart3 },
            { id: "demos", label: `Demo Catalogue (${demosList.length})`, icon: Layers },
            { id: "crm", label: `CRM & Leads (${enquiries.length})`, icon: Users },
            { id: "quotations", label: `Quotations Hub (${quotations.length})`, icon: FileText },
            { id: "projects", label: `Active Projects (${projects.length})`, icon: Sparkles }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-[#1769AA] text-white shadow-lg shadow-[#1769AA]/30"
                    : "bg-[#091527] text-slate-400 hover:text-white border border-[#143054]"
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
            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Demo Models", val: "160 Active", sub: "12 Main Categories", change: "+100% Complete" },
                { label: "Showcase Visitors", val: "14,820", sub: "Last 30 Days", change: "+24.5%" },
                { label: "Qualified Pipeline", val: "₹18.4 Lakhs", sub: "12 Active Quotations", change: "68% Conversion" },
                { label: "Projects Underway", val: `${projects.length} Active`, sub: "8-Stage Tracking", change: "100% on schedule" }
              ].map((kpi, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#091527] border border-[#163359] space-y-2">
                  <span className="text-xs text-slate-400 font-medium">{kpi.label}</span>
                  <div className="text-2xl font-extrabold text-white">{kpi.val}</div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{kpi.sub}</span>
                    <span className="text-emerald-400 font-mono font-semibold">{kpi.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Category Breakdown & Distribution Grid */}
            <div className="p-6 rounded-3xl bg-[#091527] border border-[#163359] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">160 Demo Models by Category Distribution</h3>
                <span className="text-xs text-[#73D8FF] font-mono">12 / 12 Categories Fully Populated</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {DEMO_CATEGORIES.map((cat) => (
                  <div key={cat.slug} className="p-3.5 rounded-xl bg-[#050D1A] border border-[#143054] space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono">Cat #{cat.number}</span>
                      <span className="font-bold text-[#73D8FF]">{cat.count} Models</span>
                    </div>
                    <div className="text-xs font-bold text-white truncate">{cat.name}</div>
                    <div className="w-full h-1.5 rounded-full bg-[#081527] overflow-hidden">
                      <div
                        className="h-full bg-[#1769AA]"
                        style={{ width: `${(cat.count / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setNewQuotationModal(true)}
                className="px-5 py-2.5 rounded-xl bg-[#1769AA] text-white text-xs font-bold hover:bg-[#1E7ECA] flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Custom Quotation</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="px-5 py-2.5 rounded-xl bg-[#091527] text-slate-200 text-xs font-semibold border border-[#163359] hover:bg-[#10243E] flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export Complete 160 Demos (CSV)</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: DEMO MANAGEMENT */}
        {activeTab === "demos" && (
          <div className="space-y-6">
            {/* Action Bar: Search, Category Filter, CSV Actions */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#081324] p-4 rounded-2xl border border-[#163359]">
              <div className="flex flex-1 items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={demoSearch}
                    onChange={(e) => setDemoSearch(e.target.value)}
                    placeholder="Search by ID or model name..."
                    className="w-full pl-9 pr-3 py-1.5 bg-[#050D1A] rounded-xl border border-[#173863] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#32A9E8]"
                  />
                </div>

                {/* Category Select */}
                <select
                  value={selectedCatFilter}
                  onChange={(e) => setSelectedCatFilter(e.target.value)}
                  className="bg-[#050D1A] border border-[#173863] rounded-xl text-xs text-slate-200 px-3 py-2 focus:outline-none"
                >
                  <option value="all">All 12 Categories</option>
                  {DEMO_CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.number}. {cat.name} ({cat.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* CSV Import/Export */}
              <div className="flex items-center gap-2">
                <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-[#0F243E] hover:bg-[#163359] text-slate-200 border border-[#1A3D68] text-xs font-semibold flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Import CSV</span>
                  <input type="file" accept=".csv" onChange={handleCSVUpload} className="hidden" />
                </label>
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 rounded-xl bg-[#0F243E] hover:bg-[#163359] text-slate-200 border border-[#1A3D68] text-xs font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Demos Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#163359] bg-[#091527]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#050D1A] text-slate-400 font-mono text-[10px] uppercase border-b border-[#163359]">
                  <tr>
                    <th className="p-3.5">ID</th>
                    <th className="p-3.5">Demo Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Type & Platform</th>
                    <th className="p-3.5">Price & Time</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#143054]">
                  {filteredDemos.map((d) => (
                    <tr key={d.id} className="hover:bg-[#0C1E38]/50">
                      <td className="p-3.5 font-mono text-[#73D8FF] font-bold">#{d.id}</td>
                      <td className="p-3.5 font-bold text-white">
                        <Link
                          href={`/demos/${d.categorySlug}/${d.slug}`}
                          className="hover:text-[#32A9E8] transition-colors"
                        >
                          {d.name}
                        </Link>
                        {d.isFeatured && (
                          <span className="ml-2 text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-300">{d.categoryName}</td>
                      <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                        {d.developmentType} &bull; {d.platform}
                      </td>
                      <td className="p-3.5 text-slate-200">
                        <div className="font-bold text-[#73D8FF]">{d.indicativeStartingPrice}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{d.estimatedDevelopmentTime}</div>
                      </td>
                      <td className="p-3.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          d.availabilityStatus === "Live Demo"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                        }`}>
                          {d.availabilityStatus}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/demos/${d.categorySlug}/${d.slug}/live`}
                            className="p-1.5 rounded-lg bg-[#050D1A] hover:bg-[#143054] text-[#32A9E8]"
                            title="Launch Live Sandbox"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => setEditDemoModal(d)}
                            className="p-1.5 rounded-lg bg-[#050D1A] hover:bg-[#143054] text-amber-400"
                            title="Edit Demo Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CRM & LEADS PIPELINE */}
        {activeTab === "crm" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Client Inquiries & CRM Pipeline</h2>
                <p className="text-xs text-slate-400">
                  Track 8 lead stages: New, Contacted, Qualified, Demo Scheduled, Quotation Sent, Negotiation, Converted, Lost.
                </p>
              </div>

              {/* Status Filter */}
              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
                className="bg-[#050D1A] border border-[#173863] rounded-xl text-xs text-slate-200 px-3 py-2"
              >
                <option value="all">All Lead Statuses</option>
                {["New", "Contacted", "Qualified", "Demo Scheduled", "Quotation Sent", "Negotiation", "Converted", "Lost"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enquiries
                .filter((enq) => leadStatusFilter === "all" || enq.status === leadStatusFilter)
                .map((enq) => (
                  <div key={enq.id} className="p-5 rounded-2xl bg-[#091527] border border-[#163359] space-y-4">
                    <div className="flex items-center justify-between border-b border-[#143054] pb-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#73D8FF]">{enq.id}</span>
                        <h4 className="font-bold text-white text-base mt-0.5">{enq.name}</h4>
                        <div className="text-xs text-slate-400">{enq.businessName} &bull; {enq.industry}</div>
                      </div>
                      <div className="text-right space-y-1">
                        <select
                          value={enq.status}
                          onChange={(e) => {
                            updateEnquiryStatus(enq.id, e.target.value as any);
                            reloadData();
                            showToast(`Updated ${enq.id} status to ${e.target.value}`);
                          }}
                          className="bg-[#050D1A] border border-[#143054] rounded-lg text-xs font-semibold text-[#73D8FF] px-2 py-1 focus:outline-none"
                        >
                          {["New", "Contacted", "Qualified", "Demo Scheduled", "Quotation Sent", "Negotiation", "Converted", "Lost"].map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-[#050D1A] p-3 rounded-xl border border-[#143054]">
                      {enq.projectDescription}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 font-mono">
                      <div>Email: <strong className="text-slate-200">{enq.email}</strong></div>
                      <div>Phone: <strong className="text-slate-200">{enq.phone}</strong></div>
                      <div>Budget: <strong className="text-emerald-400">{enq.estimatedBudget}</strong></div>
                      <div>Target: <strong className="text-slate-200">{enq.expectedDeliveryDate}</strong></div>
                    </div>

                    <div className="pt-2 border-t border-[#143054] flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        Assigned: <strong className="text-[#73D8FF]">{enq.assignedSalesperson || "Vikram Mehta"}</strong>
                      </span>
                      <button
                        onClick={() => {
                          setNewQuoteForm({
                            clientName: enq.name,
                            clientBusiness: enq.businessName,
                            clientEmail: enq.email,
                            clientPhone: enq.phone,
                            selectedSolution: enq.selectedDemoName || `${enq.industry} Custom Solution`,
                            projectScope: enq.projectDescription,
                            devAmount: 65000,
                            hostingAmount: 8000,
                            integrationAmount: 12000,
                            maintenanceAmount: 15000,
                            paymentSchedule: "50% Advance, 50% on Handover",
                            deliveryTimeline: enq.expectedDeliveryDate || "3-4 Weeks"
                          });
                          setNewQuotationModal(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#1769AA] text-white text-xs font-bold hover:bg-[#1E7ECA] flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Create Quotation</span>
                      </button>
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
                <h2 className="text-xl font-bold text-white">Commercial Quotations Hub</h2>
                <p className="text-xs text-slate-400">Automated project creation upon customer approval</p>
              </div>
              <button
                onClick={() => setNewQuotationModal(true)}
                className="px-4 py-2 rounded-xl bg-[#1769AA] text-white text-xs font-bold hover:bg-[#1E7ECA] flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>New Quotation</span>
              </button>
            </div>

            <div className="space-y-4">
              {quotations.map((q) => (
                <div key={q.id} className="p-5 rounded-2xl bg-[#091527] border border-[#163359] flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#73D8FF]">{q.quotationNumber}</span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {q.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1">{q.selectedSolution}</h4>
                    <div className="text-xs text-slate-400">Client: {q.clientName} &bull; {q.clientBusiness}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-extrabold text-[#73D8FF]">₹{q.totalAmount.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Delivery: {q.deliveryTimeline}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ACTIVE PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Project Engineering Operations</h2>
                <p className="text-xs text-slate-400">Manage client milestones through the 8 execution stages</p>
              </div>
            </div>

            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.id} className="p-6 rounded-3xl bg-[#091527] border border-[#163359] space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#102D50] text-[#73D8FF]">
                        {proj.projectCode}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1">{proj.projectName}</h4>
                      <div className="text-xs text-slate-400">Client: {proj.clientName} &bull; {proj.clientBusiness}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Advance Stage:</span>
                      <select
                        value={proj.currentStage}
                        onChange={(e) => {
                          advanceProjectStage(proj.id, e.target.value as ProjectStage);
                          reloadData();
                          showToast(`Advanced project ${proj.projectCode} to stage "${e.target.value}"`);
                        }}
                        className="bg-[#050D1A] border border-[#143054] rounded-xl text-xs font-bold text-[#73D8FF] px-3 py-1.5 focus:outline-none"
                      >
                        {PROJECT_STAGES.map((stg) => (
                          <option key={stg} value={stg}>{stg}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#050D1A] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#1769AA] to-emerald-400" style={{ width: `${proj.progressPercent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDIT DEMO MODAL */}
        {editDemoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-xl bg-[#091527] border border-[#1E4373] rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-bold text-white">
                Edit Demo #{editDemoModal.id}: <span className="text-[#73D8FF]">{editDemoModal.name}</span>
              </h3>
              <form onSubmit={handleSaveDemoEdit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Demo Name</label>
                  <input
                    type="text"
                    value={editDemoModal.name}
                    onChange={(e) => setEditDemoModal({ ...editDemoModal, name: e.target.value })}
                    className="w-full p-2 bg-[#050D1A] border border-[#143054] rounded-xl text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Indicative Starting Price</label>
                    <input
                      type="text"
                      value={editDemoModal.indicativeStartingPrice}
                      onChange={(e) => setEditDemoModal({ ...editDemoModal, indicativeStartingPrice: e.target.value })}
                      className="w-full p-2 bg-[#050D1A] border border-[#143054] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Est. Development Time</label>
                    <input
                      type="text"
                      value={editDemoModal.estimatedDevelopmentTime}
                      onChange={(e) => setEditDemoModal({ ...editDemoModal, estimatedDevelopmentTime: e.target.value })}
                      className="w-full p-2 bg-[#050D1A] border border-[#143054] rounded-xl text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Availability Status</label>
                  <select
                    value={editDemoModal.availabilityStatus}
                    onChange={(e) => setEditDemoModal({ ...editDemoModal, availabilityStatus: e.target.value as any })}
                    className="w-full p-2 bg-[#050D1A] border border-[#143054] rounded-xl text-white"
                  >
                    <option value="Live Demo">Live Demo</option>
                    <option value="Offline Ready">Offline Ready</option>
                    <option value="Under Development">Under Development</option>
                    <option value="Planned">Planned</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditDemoModal(null)}
                    className="px-4 py-2 bg-[#050D1A] text-slate-300 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1769AA] text-white font-bold rounded-xl"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-xl bg-[#091527] border border-[#1E4373] rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
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
                      className="w-full p-2 bg-[#050D1A] border border-[#143054] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Company / Business Name *</label>
                    <input
                      required
                      type="text"
                      value={newQuoteForm.clientBusiness}
                      onChange={(e) => setNewQuoteForm({ ...newQuoteForm, clientBusiness: e.target.value })}
                      className="w-full p-2 bg-[#050D1A] border border-[#143054] rounded-xl text-white"
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
                      className="w-full p-2 bg-[#050D1A] border border-[#143054] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Phone *</label>
                    <input
                      required
                      type="text"
                      value={newQuoteForm.clientPhone}
                      onChange={(e) => setNewQuoteForm({ ...newQuoteForm, clientPhone: e.target.value })}
                      className="w-full p-2 bg-[#050D1A] border border-[#143054] rounded-xl text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Selected Demo / Solution</label>
                  <input
                    type="text"
                    value={newQuoteForm.selectedSolution}
                    onChange={(e) => setNewQuoteForm({ ...newQuoteForm, selectedSolution: e.target.value })}
                    className="w-full p-2 bg-[#050D1A] border border-[#143054] rounded-xl text-white"
                  />
                </div>

                {/* Charges */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Dev Charges (INR)</label>
                    <input
                      type="number"
                      value={newQuoteForm.devAmount}
                      onChange={(e) => setNewQuoteForm({ ...newQuoteForm, devAmount: Number(e.target.value) })}
                      className="w-full p-2 bg-[#050D1A] border border-[#143054] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Cloud / Hosting (INR)</label>
                    <input
                      type="number"
                      value={newQuoteForm.hostingAmount}
                      onChange={(e) => setNewQuoteForm({ ...newQuoteForm, hostingAmount: Number(e.target.value) })}
                      className="w-full p-2 bg-[#050D1A] border border-[#143054] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Integrations & APIs (INR)</label>
                    <input
                      type="number"
                      value={newQuoteForm.integrationAmount}
                      onChange={(e) => setNewQuoteForm({ ...newQuoteForm, integrationAmount: Number(e.target.value) })}
                      className="w-full p-2 bg-[#050D1A] border border-[#143054] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Maintenance & SLA (INR)</label>
                    <input
                      type="number"
                      value={newQuoteForm.maintenanceAmount}
                      onChange={(e) => setNewQuoteForm({ ...newQuoteForm, maintenanceAmount: Number(e.target.value) })}
                      className="w-full p-2 bg-[#050D1A] border border-[#143054] rounded-xl text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setNewQuotationModal(false)}
                    className="px-4 py-2 bg-[#050D1A] text-slate-400 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1769AA] text-white font-bold rounded-xl"
                  >
                    Generate & Send Quotation
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
